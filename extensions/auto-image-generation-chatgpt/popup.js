/**
 * ChatGPT Image Auto Generator - Popup
 *
 * storage.local が唯一の真実の源。
 *  - キューの追加/削除/クリアは storage.local.queue に直接書く
 *  - 処理進捗は storage.local.processingState に Background が書き込む
 *  - Popup は storage.onChanged で受動的に再描画する
 */

// ===== DOM =====
const el = {
  promptInput: document.getElementById('promptInput'),
  addBtn: document.getElementById('addBtn'),
  startBtn: document.getElementById('startBtn'),
  stopBtn: document.getElementById('stopBtn'),
  clearBtn: document.getElementById('clearBtn'),
  queueList: document.getElementById('queueList'),
  queueCount: document.getElementById('queueCount'),
  statusIndicator: document.getElementById('statusIndicator'),
  statusText: document.getElementById('statusText'),
  progressSection: document.getElementById('progressSection'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  timeoutInput: document.getElementById('timeoutInput'),
  delayInput: document.getElementById('delayInput'),
  prefixInput: document.getElementById('prefixInput'),
  lineCount: document.getElementById('lineCount'),
  fileBtn: document.getElementById('fileBtn'),
  csvFileInput: document.getElementById('csvFileInput'),
  csvInfo: document.getElementById('csvInfo'),
  csvFilename: document.getElementById('csvFilename'),
  csvPreviewCount: document.getElementById('csvPreviewCount'),
  csvColumnSelect: document.getElementById('csvColumnSelect'),
  csvHasHeader: document.getElementById('csvHasHeader'),
};

// ===== Reactive state =====
let queue = [];
let state = { status: 'idle' };
let csvParsedData = [];
let csvFilename = '';

// ===== Init =====
document.addEventListener('DOMContentLoaded', async () => {
  await refreshFromStorage();
  await loadSettings();
  updateLineCount();
  bindEvents();
  renderQueue();
  updateUI();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  let changed = false;
  if (changes.queue) {
    queue = changes.queue.newValue || [];
    changed = true;
  }
  if (changes.processingState) {
    state = changes.processingState.newValue || { status: 'idle' };
    changed = true;
  }
  if (changed) {
    renderQueue();
    updateUI();
  }
});

async function refreshFromStorage() {
  const d = await chrome.storage.local.get(['queue', 'processingState']);
  queue = d.queue || [];
  state = d.processingState || { status: 'idle' };
}

async function saveQueue() {
  await chrome.storage.local.set({ queue });
}

// ===== Events =====
function bindEvents() {
  el.addBtn.addEventListener('click', handleAddPrompts);
  el.startBtn.addEventListener('click', handleStart);
  el.stopBtn.addEventListener('click', handleStop);
  el.clearBtn.addEventListener('click', handleClear);
  el.timeoutInput.addEventListener('change', saveSettings);
  el.delayInput.addEventListener('change', saveSettings);
  el.prefixInput.addEventListener('change', saveSettings);
  el.promptInput.addEventListener('input', updateLineCount);
  el.promptInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') handleAddPrompts();
  });

  // ファイルボタン
  el.fileBtn.addEventListener('click', () => el.csvFileInput.click());
  el.csvFileInput.addEventListener('change', handleFileSelect);

  // textarea へのファイルドロップ
  el.promptInput.addEventListener('dragover', handleDragOver);
  el.promptInput.addEventListener('dragleave', handleDragLeave);
  el.promptInput.addEventListener('drop', handleDrop);

  el.csvColumnSelect.addEventListener('change', () => { if (csvParsedData.length) applyCsvToInput(); });
  el.csvHasHeader.addEventListener('change', () => { if (csvParsedData.length) applyCsvToInput(); });

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'PROCESSING_ERROR') {
      setStatus('error', msg.error || 'エラーが発生しました');
    }
  });
}

// ===== Add prompts =====
async function handleAddPrompts() {
  const text = el.promptInput.value.trim();
  if (!text) return;
  const prompts = parsePrompts(text);
  if (prompts.length === 0) return;

  const newItems = prompts.map(p => ({
    id: generateId(),
    text: p,
    status: 'pending',
  }));
  queue = [...queue, ...newItems];
  await saveQueue();

  el.promptInput.value = '';
  csvParsedData = [];
  csvFilename = '';
  el.csvInfo.hidden = true;
  el.csvFileInput.value = '';
  updateLineCount();
}

/**
 * テキストを複数プロンプトに分割。
 *  - どこかの行が "---" のみなら区切りモード（複数行プロンプト対応）
 *  - そうでなければ 1行 = 1プロンプト
 */
function parsePrompts(text) {
  const normalized = text.replace(/\r\n?/g, '\n');
  const lines = normalized.split('\n');
  const hasDelimiter = lines.some(l => l.trim() === '---');

  if (hasDelimiter) {
    const blocks = [];
    let cur = [];
    for (const line of lines) {
      if (line.trim() === '---') {
        if (cur.length) blocks.push(cur.join('\n').trim());
        cur = [];
      } else {
        cur.push(line);
      }
    }
    if (cur.length) blocks.push(cur.join('\n').trim());
    return blocks.filter(b => b.length > 0);
  }
  return lines.map(l => l.trim()).filter(l => l.length > 0);
}

function updateLineCount() {
  const text = el.promptInput.value.trim();
  if (!text) { el.lineCount.textContent = '0件'; return; }
  const prompts = parsePrompts(text);
  const hasDelimiter = text.replace(/\r\n?/g, '\n').split('\n').some(l => l.trim() === '---');
  el.lineCount.textContent = hasDelimiter ? `${prompts.length}件（--- 区切り）` : `${prompts.length}件`;
}

// ===== File / CSV =====
function handleDragOver(e) {
  if (!e.dataTransfer?.types?.includes('Files')) return;
  e.preventDefault();
  el.promptInput.classList.add('drag-over');
}
function handleDragLeave(e) {
  el.promptInput.classList.remove('drag-over');
}
function handleDrop(e) {
  if (!e.dataTransfer?.files?.length) return;
  e.preventDefault();
  el.promptInput.classList.remove('drag-over');
  processFile(e.dataTransfer.files[0]);
}
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    csvParsedData = parseCSV(text);
    csvFilename = file.name;
    applyCsvToInput();
  };
  reader.readAsText(file, 'UTF-8');
}

function parseCSV(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  for (const line of lines) {
    current = inQuotes ? current + '\n' + line : line;
    const quoteCount = (current.match(/"/g) || []).length;
    inQuotes = quoteCount % 2 !== 0;
    if (!inQuotes) {
      const cols = parseCSVLine(current);
      if (cols.length > 0) rows.push(cols);
      current = '';
    }
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (char === '"') { inQuotes = false; }
      else { current += char; }
    } else {
      if (char === '"') inQuotes = true;
      else if (char === ',' || char === '\t') { result.push(current.trim()); current = ''; }
      else current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * CSV パース結果から列を選択して textarea に流し込む。
 * textarea で最終編集可能な状態にしておく。
 */
function applyCsvToInput() {
  if (csvParsedData.length === 0) return;

  const hasHeader = el.csvHasHeader.checked;
  const colIndex = el.csvColumnSelect.value;
  let dataRows = hasHeader ? csvParsedData.slice(1) : csvParsedData;

  let targetCol;
  if (colIndex === 'auto') {
    // 最も平均文字数が長い列を自動選択
    if (dataRows.length === 0) targetCol = 0;
    else {
      const colCount = Math.max(...dataRows.map(r => r.length));
      let maxAvgLen = 0;
      targetCol = 0;
      for (let c = 0; c < colCount; c++) {
        const avgLen = dataRows.reduce((sum, row) => sum + (row[c]?.length || 0), 0) / dataRows.length;
        if (avgLen > maxAvgLen) { maxAvgLen = avgLen; targetCol = c; }
      }
    }
  } else {
    targetCol = parseInt(colIndex);
  }

  const prompts = dataRows.map(row => row[targetCol]?.trim()).filter(p => p && p.length > 0);

  // textarea に流し込み（ユーザーが確認・編集可能）
  el.promptInput.value = prompts.join('\n');
  updateLineCount();

  // CSV 情報を表示
  el.csvInfo.hidden = false;
  el.csvFilename.textContent = csvFilename || 'CSV';
  el.csvPreviewCount.textContent = `${prompts.length}件`;
}

// ===== Queue management =====
async function handleDeleteItem(id) {
  queue = queue.filter(i => i.id !== id);
  await saveQueue();
}

async function handleClear() {
  if (state.status === 'running') return;
  queue = [];
  await chrome.storage.local.set({ queue });
  await chrome.storage.local.remove('processingState');
  state = { status: 'idle' };
  renderQueue();
  updateUI();
}

// ===== Start / Stop =====
async function handleStart() {
  const hasPending = queue.some(i => i.status === 'pending');
  if (!hasPending) return;
  const tabs = await chrome.tabs.query({
    url: ['https://chatgpt.com/*', 'https://chat.openai.com/*']
  });
  if (tabs.length === 0) {
    setStatus('error', 'ChatGPTのタブが見つかりません');
    return;
  }
  chrome.runtime.sendMessage({
    type: 'START_PROCESSING',
    tabId: tabs[0].id,
    settings: getSettings(),
  });
}

function handleStop() {
  chrome.runtime.sendMessage({ type: 'STOP_PROCESSING' });
}

// ===== Rendering =====
function renderQueue() {
  const container = el.queueList;
  container.innerHTML = '';

  if (queue.length === 0) {
    container.innerHTML = `<div class="queue-empty">プロンプトが登録されていません</div>`;
    el.queueCount.textContent = '0件';
    return;
  }

  el.queueCount.textContent = `${queue.length}件`;

  queue.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `queue-item ${item.status}`;
    const statusLabel = item.status === 'active' ? '処理中'
      : item.status === 'completed' ? '完了'
      : item.status === 'error' ? 'エラー'
      : '';
    const canDelete = item.status !== 'active';
    div.innerHTML = `
      <span class="queue-item-number">${index + 1}</span>
      <span class="queue-item-text">${escapeHtml(item.text)}</span>
      ${statusLabel ? `<span class="queue-item-status">${statusLabel}</span>` : ''}
      ${canDelete ? `<button class="queue-item-delete" data-id="${item.id}" title="削除">×</button>` : ''}
    `;
    container.appendChild(div);
  });

  container.querySelectorAll('.queue-item-delete').forEach(btn => {
    btn.addEventListener('click', (e) => handleDeleteItem(e.currentTarget.dataset.id));
  });
}

function updateUI() {
  const isRunning = state.status === 'running';
  const hasPending = queue.some(i => i.status === 'pending');

  el.startBtn.disabled = !hasPending || isRunning;
  el.startBtn.hidden = isRunning;
  el.stopBtn.hidden = !isRunning;
  el.clearBtn.disabled = isRunning;
  el.addBtn.disabled = isRunning;
  el.promptInput.disabled = isRunning;

  const total = state.totalCount || 0;
  const completed = state.completedCount || 0;
  const errors = state.errorCount || 0;
  const processed = completed + errors;
  const currentN = isRunning && total > 0 ? Math.min(processed + 1, total) : processed;

  const indicator = el.statusIndicator;
  indicator.className = 'status-dot';

  switch (state.status) {
    case 'idle':
      setStatus('idle', '待機中');
      el.progressText.textContent = '';
      break;
    case 'running':
      indicator.classList.add('running');
      setStatus('running', `処理中`);
      el.progressText.textContent = `${currentN} / ${total}`;
      break;
    case 'completed':
      indicator.classList.add('completed');
      setStatus('completed',
        errors > 0 ? `完了 · 成功 ${completed} / 失敗 ${errors}` : `完了 · ${completed}件`
      );
      el.progressText.textContent = '';
      break;
    case 'error':
      indicator.classList.add('error');
      setStatus('error', state.errorMessage || 'エラーが発生しました');
      el.progressText.textContent = '';
      break;
  }

  if (state.status === 'running' || state.status === 'completed') {
    el.progressSection.classList.add('visible');
    const pct = total > 0 ? (processed / total) * 100 : 0;
    el.progressFill.style.width = `${pct}%`;
  } else {
    el.progressSection.classList.remove('visible');
  }
}

function setStatus(type, text) {
  el.statusText.textContent = text;
  el.statusIndicator.className = `status-dot ${type}`;
}

// ===== Settings =====
// 新ワークフロー（v3 compact）では、プロンプト本文に画像生成指示が
// すべて英語で含まれている。プレフィックスは投入文脈の最低限の補足のみ。
// 完成サムネではなく、後で日本語文字を後乗せするための背景ビジュアル素材を作らせる。
const DEFAULT_PREFIX = `これはYouTubeサムネイル用の背景ビジュアル素材を作る依頼です。完成サムネではなく、後工程で日本語テキストを後乗せするための主役ビジュアルだけを生成してください。以下の仕様に従って画像を1枚生成してください。`;

function getSettings() {
  return {
    timeout: parseInt(el.timeoutInput.value) || 300,
    delay: parseInt(el.delayInput.value) || 3,
    prefix: el.prefixInput.value,
  };
}
function saveSettings() { chrome.storage.local.set({ settings: getSettings() }); }
async function loadSettings() {
  const data = await chrome.storage.local.get(['settings']);
  if (data.settings) {
    el.timeoutInput.value = data.settings.timeout || 300;
    el.delayInput.value = data.settings.delay || 3;
    el.prefixInput.value = data.settings.prefix ?? DEFAULT_PREFIX;
  } else {
    el.prefixInput.value = DEFAULT_PREFIX;
  }
}

// ===== Utils =====
function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
