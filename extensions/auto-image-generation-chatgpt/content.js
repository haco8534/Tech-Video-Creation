/**
 * ChatGPT Image Auto Generator - Content Script
 *
 * 完了検知の考え方:
 *  - 「生成中」の状態を一度観測（sawGenerating）する
 *  - その後、生成中でない状態が STABLE_TICKS 回連続で続いたら完了
 *  - 「生成中」の判定は以下のいずれか1つでも真なら OK:
 *      a) 停止ボタンが DOM に存在する
 *      b) 最新アシスタントメッセージに .result-streaming クラスがある
 *      c) 送信ボタンが disabled または DOM から消えている
 *  - どれか1つでも動くバージョンなら検知できる、という冗長設計
 *
 * セーフティ:
 *  - 新規アシスタントが出現してから一定時間 sawGenerating が立たなくても
 *    完了扱いする（ChatGPT 側の UI 変更で全シグナルが拾えなくても前に進む）
 *  - タイムアウト時でも新規アシスタントがあれば完了扱い
 */

(() => {
    'use strict';

    const SELECTORS = {
        inputField: [
            '#prompt-textarea',
            'div.ProseMirror[contenteditable="true"]',
            'div[contenteditable="true"][data-virtualkeyboard="true"]',
            'textarea[data-testid*="composer"]',
            'form div[contenteditable="true"]',
        ],
        sendButton: [
            'button[data-testid="send-button"]',
            'button[data-testid="composer-submit-button"]',
            'button[data-testid="fruitjuice-send-button"]',
            'button[aria-label="プロンプトを送信する"]',
            'button[aria-label="Send prompt"]',
            'button[aria-label*="送信"]',
            'button[aria-label*="Send"]',
            'form button[type="submit"]',
        ],
        stopButton: [
            'button[data-testid="stop-button"]',
            'button[data-testid="composer-stop-button"]',
            'button[aria-label="ストリーミングの停止"]',
            'button[aria-label="Stop streaming"]',
            'button[aria-label="Stop generating"]',
            'button[aria-label*="停止"]',
            'button[aria-label*="Stop"]',
        ],
        assistantMessage: '[data-message-author-role="assistant"]',
        streamingClass: 'result-streaming',
    };

    let abortController = null;
    let currentItemId = null;

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch (message.type) {
            case 'PROCESS_PROMPT':
                sendResponse({ ok: true });
                handleProcessPrompt(message);
                break;
            case 'STOP':
                handleStop();
                sendResponse({ ok: true });
                break;
            default:
                sendResponse({ ok: false });
        }
        return true;
    });

    chrome.runtime.sendMessage({ type: 'CONTENT_READY' }).catch(() => {});

    async function handleProcessPrompt(message) {
        const { prompt, prefix, itemId, jobId, timeout } = message;

        if (abortController) abortController.abort();
        abortController = new AbortController();
        currentItemId = itemId;

        const fullPrompt = prefix ? `${prefix}\n\n${prompt}` : prompt;

        try {
            const initialCount = document.querySelectorAll(SELECTORS.assistantMessage).length;
            console.log(`[ChatGPTAuto] → ${itemId}: ${prompt.substring(0, 60)}... (initial assistant count: ${initialCount})`);

            await typePrompt(fullPrompt);
            await sleep(300);
            await sendPromptMessage();
            await waitForCompletion(initialCount, timeout || 300000);

            console.log(`[ChatGPTAuto] ✓ ${itemId} completed`);
            chrome.runtime.sendMessage({
                type: 'ITEM_COMPLETED',
                jobId,
                itemId,
            }).catch(() => {});
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log(`[ChatGPTAuto] aborted ${itemId}`);
                return;
            }
            console.error('[ChatGPTAuto] ✗', err);
            chrome.runtime.sendMessage({
                type: 'ITEM_ERROR',
                jobId,
                itemId,
                error: err.message,
            }).catch(() => {});
        } finally {
            if (currentItemId === itemId) {
                currentItemId = null;
                abortController = null;
            }
        }
    }

    function handleStop() {
        if (abortController) abortController.abort();
    }

    // ===== DOM interaction =====

    async function typePrompt(text) {
        const inputEl = findElement(SELECTORS.inputField);
        if (!inputEl) throw new Error('入力欄が見つかりません。ChatGPTのチャット画面を開いてください。');

        const isCE = inputEl.contentEditable === 'true' || inputEl.getAttribute('contenteditable') === 'true';

        if (isCE) {
            inputEl.focus();
            await sleep(80);

            try {
                document.execCommand('selectAll', false, null);
                document.execCommand('delete', false, null);
            } catch {}

            let inserted = false;
            try {
                inserted = document.execCommand('insertText', false, text);
            } catch {}

            if (!inserted) {
                inputEl.innerHTML = '';
                for (const line of text.split('\n')) {
                    const p = document.createElement('p');
                    if (line.length === 0) {
                        p.appendChild(document.createElement('br'));
                    } else {
                        p.textContent = line;
                    }
                    inputEl.appendChild(p);
                }
            }

            dispatchInputEvents(inputEl);
        } else if (inputEl.tagName === 'TEXTAREA' || inputEl.tagName === 'INPUT') {
            inputEl.focus();
            await sleep(80);
            const setter = Object.getOwnPropertyDescriptor(
                window.HTMLTextAreaElement.prototype, 'value'
            )?.set;
            if (setter) setter.call(inputEl, text);
            else inputEl.value = text;
            dispatchInputEvents(inputEl);
        }

        await sleep(250);
    }

    async function sendPromptMessage() {
        for (let i = 0; i < 50; i++) {
            checkAbort();
            const btn = findElement(SELECTORS.sendButton);
            if (btn && !btn.disabled && btn.getAttribute('aria-disabled') !== 'true') {
                btn.click();
                console.log('[ChatGPTAuto] send button clicked');
                return;
            }
            await sleep(200);
        }
        throw new Error('送信ボタンが有効になりません。入力が反映されていない可能性があります。');
    }

    /**
     * 状態スナップショットを取って「生成中か／完了見込みか」を判定する。
     */
    function probeGenerationState(initialCount) {
        const messages = document.querySelectorAll(SELECTORS.assistantMessage);
        const msgCount = messages.length;
        const last = msgCount > 0 ? messages[msgCount - 1] : null;

        // a) 停止ボタンの有無
        const stopBtn = findElement(SELECTORS.stopButton);
        const hasStopBtn = !!stopBtn;

        // b) ストリーミングクラス
        const hasStreamingClass = !!last && (
            last.classList.contains(SELECTORS.streamingClass) ||
            last.querySelector(`.${SELECTORS.streamingClass}`) !== null
        );

        const isGenerating = hasStopBtn || hasStreamingClass;
        const hasNewMessage = msgCount > initialCount;

        return {
            msgCount,
            hasNewMessage,
            hasStopBtn,
            hasStreamingClass,
            isGenerating,
        };
    }

    /**
     * レスポンス完了を待機する。
     *
     *  Phase 1: 生成中を一度観測する（sawGenerating を立てる）
     *  Phase 2: 生成中でない状態が STABLE_TICKS 回連続で続いたら完了
     *
     *  「生成中」シグナル:
     *    a) 停止ボタンが DOM に存在する
     *    b) 最新アシスタントメッセージに .result-streaming クラスがある
     *
     *  注: 送信ボタンは「入力が空だと音声ボタンに差し替えられる」仕様のため
     *      disabled / 非存在を生成中のシグナルにすると完了を誤検知できなくなる。
     *      シグナルとしては使わない。
     *
     *  safety:
     *   - 新規アシスタントが出現してから FALLBACK_MS 経っても sawGenerating が
     *     立たない場合は、アシスタントメッセージの存在と「生成中でない」状態で
     *     完了扱い（ChatGPT 側 UI 変更による全シグナル消失への保険）
     */
    async function waitForCompletion(initialCount, timeout) {
        const POLL_MS = 1500;
        const STABLE_TICKS = 3;
        const FALLBACK_MS = 30000;     // 新規メッセージから 30 秒で sawGenerating 諦める
        const startTime = Date.now();

        let sawGenerating = false;
        let newMessageFirstSeenAt = null;
        let stable = 0;
        let tick = 0;

        while (true) {
            checkAbort();

            if (Date.now() - startTime > timeout) {
                const state = probeGenerationState(initialCount);
                if (state.hasNewMessage) {
                    console.warn('[ChatGPTAuto] timeout but new assistant exists — treating as complete', state);
                    return;
                }
                throw new Error(`タイムアウト（${Math.round(timeout / 1000)}秒）: レスポンスが検出されませんでした`);
            }

            tick++;
            const s = probeGenerationState(initialCount);

            // 新規メッセージの出現時刻を記録
            if (s.hasNewMessage && newMessageFirstSeenAt === null) {
                newMessageFirstSeenAt = Date.now();
            }

            // 生成中を観測
            if (s.isGenerating) {
                sawGenerating = true;
            }

            // ログ（毎 poll）
            if (tick % 2 === 0 || s.isGenerating !== !stable) {
                console.log(`[ChatGPTAuto] tick=${tick} msgs=${s.msgCount} stop=${s.hasStopBtn} stream=${s.hasStreamingClass} gen=${s.isGenerating} sawGen=${sawGenerating} stable=${stable}`);
            }

            // 完了判定
            const notGenerating = !s.isGenerating;
            const messageElapsed = newMessageFirstSeenAt ? (Date.now() - newMessageFirstSeenAt) : 0;

            // フォールバック: 新規メッセージは出てるが sawGenerating が立たない場合
            //  → 全シグナルが拾えてない可能性。FALLBACK_MS 経過で前進。
            const fallbackActive = !sawGenerating && s.hasNewMessage && messageElapsed >= FALLBACK_MS;

            if (notGenerating && (sawGenerating || fallbackActive)) {
                stable++;
                if (stable >= STABLE_TICKS) {
                    console.log(`[ChatGPTAuto] completion stable (${stable}), sawGen=${sawGenerating}, fallback=${fallbackActive}`);
                    return;
                }
            } else {
                stable = 0;
            }

            await sleep(POLL_MS);
        }
    }

    // ===== Helpers =====

    function checkAbort() {
        if (abortController?.signal?.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }
    }

    function findElement(selectorList) {
        if (typeof selectorList === 'string') return document.querySelector(selectorList);
        for (const sel of selectorList) {
            try {
                const el = document.querySelector(sel);
                if (el) return el;
            } catch {}
        }
        return null;
    }

    function dispatchInputEvents(element) {
        const events = [
            new Event('input', { bubbles: true, cancelable: true }),
            new Event('change', { bubbles: true, cancelable: true }),
            new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertText' }),
        ];
        for (const ev of events) {
            try { element.dispatchEvent(ev); } catch {}
        }
    }

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    console.log('[ChatGPTAuto] Content script loaded on', window.location.href);
})();
