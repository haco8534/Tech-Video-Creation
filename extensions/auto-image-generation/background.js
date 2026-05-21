/**
 * Gemini Image Auto Generator - Background (Service Worker)
 *
 * 状態管理はすべて chrome.storage.local に置く。
 * MV3 の Service Worker はアイドル時に終了してモジュール変数が失われるため、
 * 揮発する変数を真実の源にすると「キューが空」と誤認して早期完了扱いになる。
 * alarm ベースの次アイテムスケジューリングで Worker 停止にも耐える。
 */

const KEYS = {
    state: 'processingState',
    queue: 'queue',
};
const ALARM_DISPATCH = 'dispatchNext';

// ===== Storage =====
async function getState() {
    const d = await chrome.storage.local.get(KEYS.state);
    return d[KEYS.state] || { status: 'idle' };
}
async function setState(state) {
    state.lastActivityAt = Date.now();
    await chrome.storage.local.set({ [KEYS.state]: state });
}
async function getQueue() {
    const d = await chrome.storage.local.get(KEYS.queue);
    return d[KEYS.queue] || [];
}
async function setQueue(queue) {
    await chrome.storage.local.set({ [KEYS.queue]: queue });
}

// ===== Badge =====
async function updateBadge(state, queue) {
    if (state.status === 'running') {
        const remaining = queue.filter(i => i.status === 'pending' || i.status === 'active').length;
        chrome.action.setBadgeText({ text: String(remaining) });
        chrome.action.setBadgeBackgroundColor({ color: '#8b5cf6' });
    } else if (state.status === 'completed') {
        chrome.action.setBadgeText({ text: '✓' });
        chrome.action.setBadgeBackgroundColor({ color: '#22c55e' });
    } else if (state.status === 'error') {
        chrome.action.setBadgeText({ text: '!' });
        chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
    } else {
        chrome.action.setBadgeText({ text: '' });
    }
}

// ===== Start =====
async function handleStart(message) {
    const queue = await getQueue();

    // 前回中断された active を pending に戻す
    queue.forEach(i => { if (i.status === 'active') i.status = 'pending'; });

    const pending = queue.filter(i => i.status === 'pending');
    if (pending.length === 0) return;

    const state = {
        status: 'running',
        jobId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        tabId: message.tabId,
        settings: message.settings || { timeout: 300, delay: 3, prefix: '' },
        totalCount: pending.length,
        completedCount: 0,
        errorCount: 0,
        activeItemId: null,
        startedAt: Date.now(),
    };

    await chrome.alarms.clear(ALARM_DISPATCH);
    await setQueue(queue);
    await setState(state);
    await updateBadge(state, queue);

    await dispatchNext();
}

// ===== Dispatch next pending item =====
async function dispatchNext() {
    const state = await getState();
    if (state.status !== 'running') return;

    const queue = await getQueue();
    const next = queue.find(i => i.status === 'pending');

    if (!next) {
        // 全件処理済み
        const finalState = { ...state, status: 'completed', activeItemId: null };
        await setState(finalState);
        await updateBadge(finalState, queue);
        return;
    }

    // タブの生存確認
    try {
        const tab = await chrome.tabs.get(state.tabId);
        if (!tab.url || !tab.url.includes('gemini.google.com')) {
            await fail(state, 'Geminiタブがページから離れました');
            return;
        }
    } catch {
        await fail(state, 'Geminiのタブが閉じられました');
        return;
    }

    // active マーク
    next.status = 'active';
    await setQueue(queue);
    const activeState = { ...state, activeItemId: next.id };
    await setState(activeState);
    await updateBadge(activeState, queue);

    // Content script に送信
    try {
        await chrome.tabs.sendMessage(state.tabId, {
            type: 'PROCESS_PROMPT',
            jobId: state.jobId,
            itemId: next.id,
            prompt: next.text,
            prefix: state.settings.prefix || '',
            timeout: (state.settings.timeout || 300) * 1000,
        });
    } catch (err) {
        console.error('[bg] content script unreachable:', err);
        // pending に戻してエラー終了
        next.status = 'pending';
        await setQueue(queue);
        await fail(state, 'Content Scriptに接続できません。Geminiページをリロードして再試行してください。');
    }
}

async function fail(prevState, errorMessage) {
    await chrome.alarms.clear(ALARM_DISPATCH);
    const state = { ...prevState, status: 'error', errorMessage, activeItemId: null };
    await setState(state);
    const queue = await getQueue();
    await updateBadge(state, queue);
    chrome.runtime.sendMessage({ type: 'PROCESSING_ERROR', error: errorMessage }).catch(() => {});
}

// ===== Item completed (from content script) =====
async function handleItemCompleted(msg) {
    const state = await getState();
    // jobId が一致しない古いメッセージは無視（Worker 再起動直後の stale event 対策）
    if (state.status !== 'running' || msg.jobId !== state.jobId) {
        console.log('[bg] ignore stale ITEM_COMPLETED', { msgJob: msg.jobId, stateJob: state.jobId, status: state.status });
        return;
    }
    const queue = await getQueue();
    const item = queue.find(i => i.id === msg.itemId);
    if (!item || item.status !== 'active') {
        console.log('[bg] ITEM_COMPLETED for non-active item', msg.itemId, item?.status);
        return;
    }

    item.status = 'completed';
    await setQueue(queue);
    const newState = { ...state, completedCount: state.completedCount + 1, activeItemId: null };
    await setState(newState);
    await updateBadge(newState, queue);

    scheduleNext(newState);
}

async function handleItemError(msg) {
    const state = await getState();
    if (state.status !== 'running' || msg.jobId !== state.jobId) return;

    const queue = await getQueue();
    const item = queue.find(i => i.id === msg.itemId);
    if (!item || item.status !== 'active') return;

    item.status = 'error';
    item.error = msg.error || 'unknown error';
    await setQueue(queue);
    const newState = { ...state, errorCount: state.errorCount + 1, activeItemId: null };
    await setState(newState);
    await updateBadge(newState, queue);

    scheduleNext(newState);
}

function scheduleNext(state) {
    const delaySec = Math.max(0.5, state.settings?.delay ?? 3);
    // chrome.alarms の最小粒度は 30秒以上を推奨だが短時間でも動作する。
    // Worker がスリープしても起こしてくれるので setTimeout より堅牢。
    chrome.alarms.create(ALARM_DISPATCH, { when: Date.now() + delaySec * 1000 });
}

// ===== Stop =====
async function handleStop() {
    const state = await getState();
    const tabId = state.tabId;

    await chrome.alarms.clear(ALARM_DISPATCH);

    const queue = await getQueue();
    queue.forEach(i => { if (i.status === 'active') i.status = 'pending'; });
    await setQueue(queue);

    const stopped = { ...state, status: 'idle', activeItemId: null };
    await setState(stopped);
    await updateBadge(stopped, queue);

    if (tabId) {
        chrome.tabs.sendMessage(tabId, { type: 'STOP' }).catch(() => {});
    }
}

// ===== Message router =====
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    (async () => {
        try {
            switch (msg.type) {
                case 'START_PROCESSING':
                    await handleStart(msg);
                    sendResponse({ ok: true });
                    break;
                case 'STOP_PROCESSING':
                    await handleStop();
                    sendResponse({ ok: true });
                    break;
                case 'GET_STATUS':
                    sendResponse(await getState());
                    break;
                case 'ITEM_COMPLETED':
                    await handleItemCompleted(msg);
                    sendResponse({ ok: true });
                    break;
                case 'ITEM_ERROR':
                    await handleItemError(msg);
                    sendResponse({ ok: true });
                    break;
                case 'CONTENT_READY':
                    sendResponse({ ok: true });
                    break;
                default:
                    sendResponse({ ok: false, error: 'unknown message type' });
            }
        } catch (err) {
            console.error('[bg] handler error:', err);
            try { sendResponse({ ok: false, error: err.message }); } catch {}
        }
    })();
    return true; // 非同期レスポンス
});

// ===== Alarm: 次アイテムのディスパッチ =====
chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARM_DISPATCH) {
        await dispatchNext();
    }
});

// ===== Watchdog: Worker 起動時に running 状態が取り残されていたら回復 =====
(async () => {
    try {
        const state = await getState();
        if (state.status === 'running') {
            const alarms = await chrome.alarms.getAll();
            const hasDispatch = alarms.some(a => a.name === ALARM_DISPATCH);
            // active なアイテムが content script で生きていない可能性を考慮して
            // 一定時間以上音沙汰がなければディスパッチを促す
            const staleMs = Date.now() - (state.lastActivityAt || 0);
            if (!hasDispatch && !state.activeItemId) {
                console.log('[bg] recover: no active item, dispatching next');
                await dispatchNext();
            } else if (!hasDispatch && staleMs > 15 * 60 * 1000) {
                console.log('[bg] recover: stale for', staleMs, 'ms, re-dispatch');
                const queue = await getQueue();
                queue.forEach(i => { if (i.status === 'active') i.status = 'pending'; });
                await setQueue(queue);
                await setState({ ...state, activeItemId: null });
                await dispatchNext();
            }
        }
    } catch (err) {
        console.error('[bg] watchdog error:', err);
    }
})();

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: '' });
    console.log('Gemini Image Auto Generator installed.');
});
