/**
 * Gemini Image Auto Generator - Content Script
 * Gemini Web 上でプロンプトを入力・送信し、生成完了を検知する。
 */

(() => {
    'use strict';

    const SELECTORS = {
        inputField: [
            'rich-textarea .ql-editor[contenteditable="true"]',
            '.ql-editor[contenteditable="true"]',
            'div.ql-editor.textarea',
            '.initial-input-area-container > textarea',
        ],
        sendButton: [
            'button[aria-label="メッセージを送信"]',
            'button[aria-label="Send message"]',
            'button.send-button',
            '.send-button-container button',
        ],
        responseBlock: 'model-response',
        markdownContent: '.markdown.markdown-main-panel',
        responseFooter: '.response-footer',
        avatarSpinner: '.avatar_spinner_animation',
    };

    let abortController = null;
    let currentItemId = null;

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch (message.type) {
            case 'PROCESS_PROMPT':
                // 即座に ack を返し、本処理は非同期で走らせる（完了は ITEM_COMPLETED で通知）
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

        // 前の処理が残っていたら中断（高速な再開や再ロード対策）
        if (abortController) abortController.abort();
        abortController = new AbortController();
        currentItemId = itemId;

        const fullPrompt = prefix ? `${prefix}\n\n${prompt}` : prompt;

        try {
            const initialCount = document.querySelectorAll(SELECTORS.responseBlock).length;
            console.log(`[GeminiAuto] → ${itemId}: ${prompt.substring(0, 60)}... (initial model-response count: ${initialCount})`);

            await typePrompt(fullPrompt);
            await sleep(300);
            await sendPromptMessage();
            await waitForCompletion(initialCount, timeout || 300000);

            console.log(`[GeminiAuto] ✓ ${itemId} completed`);
            chrome.runtime.sendMessage({
                type: 'ITEM_COMPLETED',
                jobId,
                itemId,
            }).catch(() => {});
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log(`[GeminiAuto] aborted ${itemId}`);
                return;
            }
            console.error('[GeminiAuto] ✗', err);
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
        if (!inputEl) throw new Error('入力欄が見つかりません。Geminiのチャット画面を開いてください。');

        const isCE = inputEl.contentEditable === 'true' || inputEl.getAttribute('contenteditable') === 'true';

        if (isCE) {
            inputEl.focus();
            await sleep(80);
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

        await sleep(200);
    }

    async function sendPromptMessage() {
        // 送信ボタンが有効化されるまで最大10秒待機
        for (let i = 0; i < 50; i++) {
            checkAbort();
            const btn = findElement(SELECTORS.sendButton);
            if (btn && !btn.disabled && btn.getAttribute('aria-disabled') !== 'true') {
                btn.click();
                console.log('[GeminiAuto] send button clicked');
                return;
            }
            await sleep(200);
        }
        throw new Error('送信ボタンが有効になりません。入力が反映されていない可能性があります。');
    }

    /**
     * レスポンス完了を待機する。
     *
     * 完了条件（以下がすべて満たされ、かつ STABLE_TICKS 回連続で成立すること）:
     *  1) 新規 model-response が出現している
     *  2) 最新 model-response の .markdown の aria-busy が "true" ではない
     *  3) .response-footer に "complete" クラスが付いている
     *  4) アバタースピナーが可視でない
     *
     * 注意点:
     *  - aria-busy が最初から false のままだと「送信前の古い状態」と誤検知するリスクがあるため、
     *    新規レスポンス出現後一定時間は "busy=true を一度見る" までは完了判定を保留する。
     *  - タイムアウト時でも新規レスポンスが存在すれば完了扱い（保守的に進める）。
     */
    async function waitForCompletion(initialCount, timeout) {
        const POLL_MS = 1500;
        const STABLE_TICKS = 3;             // 3回連続 = 約4.5秒の安定が必要
        const MAX_WAIT_FOR_BUSY_MS = 45000; // レスポンス出現から busy=true を待つ最大時間
        const startTime = Date.now();

        let sawAriaBusyTrue = false;
        let newResponseFirstSeenAt = null;
        let stable = 0;

        while (true) {
            checkAbort();

            if (Date.now() - startTime > timeout) {
                const cur = document.querySelectorAll(SELECTORS.responseBlock).length;
                if (cur > initialCount) {
                    console.warn('[GeminiAuto] timeout but new response exists — treating as complete');
                    return;
                }
                throw new Error(`タイムアウト（${Math.round(timeout / 1000)}秒）: レスポンスが検出されませんでした`);
            }

            const responses = document.querySelectorAll(SELECTORS.responseBlock);
            const count = responses.length;

            if (count <= initialCount) {
                stable = 0;
                await sleep(POLL_MS);
                continue;
            }

            if (newResponseFirstSeenAt === null) {
                newResponseFirstSeenAt = Date.now();
            }

            const last = responses[count - 1];

            const markdown = last.querySelector(SELECTORS.markdownContent);
            const ariaBusy = markdown?.getAttribute('aria-busy');
            if (ariaBusy === 'true') sawAriaBusyTrue = true;

            const footer = last.querySelector(SELECTORS.responseFooter);
            const footerComplete = !!footer && footer.classList.contains('complete');

            const spinners = last.querySelectorAll(SELECTORS.avatarSpinner);
            let spinnerVisible = false;
            for (const s of spinners) {
                const style = window.getComputedStyle(s);
                if (style.visibility === 'visible' && style.opacity !== '0') {
                    spinnerVisible = true;
                    break;
                }
            }

            const busyOff = ariaBusy !== 'true';
            const conditionsMet = busyOff && footerComplete && !spinnerVisible;

            // aria-busy=true を一度も見ていないうちに完了条件が揃っていても、
            // 最初期の「まだ何も起きていない」状態の可能性があるため暫く待つ
            const waitingForBusyConfirmation =
                !sawAriaBusyTrue &&
                (Date.now() - newResponseFirstSeenAt) < MAX_WAIT_FOR_BUSY_MS;

            if (conditionsMet && !waitingForBusyConfirmation) {
                stable++;
                if (stable >= STABLE_TICKS) {
                    console.log(`[GeminiAuto] completion stable (${stable}), sawBusy=${sawAriaBusyTrue}`);
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

    console.log('[GeminiAuto] Content script loaded on', window.location.href);
})();
