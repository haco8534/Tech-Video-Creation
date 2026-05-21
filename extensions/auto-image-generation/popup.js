/**
 * Gemini Image Auto Generator - Popup
 *
 * storage.local が唯一の真実の源。
 *  - キューの追加/削除/クリアは storage.local.queue に直接書く
 *  - 処理進捗は storage.local.processingState に Background が書き込む
 *  - Popup は storage.onChanged で受動的に再描画するため、
 *    Popup が閉じている間の進捗も閉じ直せば即座に反映される
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
  statusCount: document.getElementById('statusCount'),
  progressSection: document.getElementById('progressSection'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  timeoutInput: document.getElementById('timeoutInput'),
  delayInput: document.getElementById('delayInput'),
  prefixInput: document.getElementById('prefixInput'),
  lineCount: document.getElementById('lineCount'),
  tabText: document.getElementById('tabText'),
  tabCsv: document.getElementById('tabCsv'),
  panelText: document.getElementById('panelText'),
  panelCsv: document.getElementById('panelCsv'),
  dropZone: document.getElementById('dropZone'),
  csvFileInput: document.getElementById('csvFileInput'),
  csvColumnSelect: document.getElementById('csvColumnSelect'),
  csvHasHeader: document.getElementById('csvHasHeader'),
  csvPreview: document.getElementById('csvPreview'),
  csvPreviewList: document.getElementById('csvPreviewList'),
  csvPreviewCount: document.getElementById('csvPreviewCount'),
  csvImportBtn: document.getElementById('csvImportBtn'),
};

// ===== Reactive state（storage のキャッシュ） =====
let queue = [];
let state = { status: 'idle' };
let csvParsedData = [];

// ===== Init =====
document.addEventListener('DOMContentLoaded', async () => {
  await refreshFromStorage();
  await loadSettings();
  updateLineCount();
  bindEvents();
  renderQueue();
  updateUI();
});

// storage が変わったら再描画（バックグラウンド処理の進捗も popup 再オープンで即同期される）
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
  el.tabText.addEventListener('click', () => switchTab('text'));
  el.tabCsv.addEventListener('click', () => switchTab('csv'));
  el.dropZone.addEventListener('click', () => el.csvFileInput.click());
  el.csvFileInput.addEventListener('change', handleFileSelect);
  el.dropZone.addEventListener('dragover', handleDragOver);
  el.dropZone.addEventListener('dragleave', handleDragLeave);
  el.dropZone.addEventListener('drop', handleDrop);
  el.csvImportBtn.addEventListener('click', handleCsvImport);
  el.csvColumnSelect.addEventListener('change', () => { if (csvParsedData.length) renderCsvPreview(); });
  el.csvHasHeader.addEventListener('change', () => { if (csvParsedData.length) renderCsvPreview(); });
  el.promptInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') handleAddPrompts();
  });

  // バックグラウンドからの致命エラー通知（storage 経由で state.errorMessage にも入る）
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'PROCESSING_ERROR') {
      setStatus('error', msg.error || 'エラーが発生しました');
    }
  });
}

// ===== Tab =====
function switchTab(tab) {
  el.tabText.classList.toggle('active', tab === 'text');
  el.tabCsv.classList.toggle('active', tab === 'csv');
  el.panelText.classList.toggle('active', tab === 'text');
  el.panelCsv.classList.toggle('active', tab === 'csv');
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
  updateLineCount();
}

/**
 * テキストを複数プロンプトに分割。
 *  - どこかの行が "---" のみなら区切りモード（複数行プロンプト対応）
 *  - そうでなければ 1行 = 1プロンプト
 * CRLF / CR も正しく扱う。
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
  el.lineCount.textContent = hasDelimiter ? `${prompts.length}件（---区切り）` : `${prompts.length}行`;
}

// ===== CSV =====
function handleDragOver(e) { e.preventDefault(); el.dropZone.classList.add('drag-over'); }
function handleDragLeave(e) { e.preventDefault(); el.dropZone.classList.remove('drag-over'); }
function handleDrop(e) {
  e.preventDefault();
  el.dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
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
    renderCsvPreview();
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

function renderCsvPreview() {
  if (csvParsedData.length === 0) { el.csvPreview.style.display = 'none'; return; }
  const hasHeader = el.csvHasHeader.checked;
  const colIndex = el.csvColumnSelect.value;
  let dataRows = hasHeader ? csvParsedData.slice(1) : csvParsedData;

  let targetCol = parseInt(colIndex);
  if (colIndex === 'auto') {
    if (dataRows.length > 0) {
      const colCount = Math.max(...dataRows.map(r => r.length));
      let maxAvgLen = 0;
      targetCol = 0;
      for (let c = 0; c < colCount; c++) {
        const avgLen = dataRows.reduce((sum, row) => sum + (row[c]?.length || 0), 0) / dataRows.length;
        if (avgLen > maxAvgLen) { maxAvgLen = avgLen; targetCol = c; }
      }
    } else targetCol = 0;
  }

  const prompts = dataRows.map(row => row[targetCol]?.trim()).filter(p => p && p.length > 0);
  el.csvPreview.style.display = 'flex';
  el.csvPreviewCount.textContent = `${prompts.length}件`;

  const previewItems = prompts.slice(0, 20);
  el.csvPreviewList.innerHTML = previewItems.map((p, i) => `
    <div class="csv-preview-item">
      <span class="csv-preview-item-num">${i + 1}.</span>
      <span class="csv-preview-item-text" title="${escapeHtml(p)}">${escapeHtml(p)}</span>
    </div>
  `).join('');
  if (prompts.length > 20) {
    el.csvPreviewList.innerHTML += `
      <div class="csv-preview-item">
        <span class="csv-preview-item-text" style="color: var(--text-muted);">... 他 ${prompts.length - 20}件</span>
      </div>
    `;
  }
  el.csvImportBtn._prompts = prompts;
}

async function handleCsvImport() {
  const prompts = el.csvImportBtn._prompts;
  if (!prompts || prompts.length === 0) return;
  const newItems = prompts.map(p => ({ id: generateId(), text: p, status: 'pending' }));
  queue = [...queue, ...newItems];
  csvParsedData = [];
  el.csvPreview.style.display = 'none';
  el.csvFileInput.value = '';
  await saveQueue();
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
  const tabs = await chrome.tabs.query({ url: 'https://gemini.google.com/*' });
  if (tabs.length === 0) {
    setStatus('error', 'Geminiのタブが見つかりません');
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
    container.innerHTML = `
      <div class="queue-empty">
        <div class="empty-icon">📋</div>
        <p>プロンプトが登録されていません</p>
      </div>`;
    el.queueCount.textContent = '0件';
    return;
  }

  el.queueCount.textContent = `${queue.length}件`;

  queue.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `queue-item ${item.status}`;
    const icon = item.status === 'active' ? '⏳'
      : item.status === 'completed' ? '✅'
      : item.status === 'error' ? '❌'
      : '';
    const canDelete = item.status !== 'active';
    div.innerHTML = `
      <span class="queue-item-number">${index + 1}.</span>
      <span class="queue-item-text">${escapeHtml(item.text)}</span>
      ${icon ? `<span class="queue-item-status">${icon}</span>` : ''}
      ${canDelete ? `<button class="queue-item-delete" data-id="${item.id}" title="削除">✕</button>` : ''}
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
  el.startBtn.style.display = isRunning ? 'none' : 'flex';
  el.stopBtn.style.display = isRunning ? 'flex' : 'none';
  el.clearBtn.disabled = isRunning;
  el.addBtn.disabled = isRunning;
  el.promptInput.disabled = isRunning;

  const total = state.totalCount || 0;
  const completed = state.completedCount || 0;
  const errors = state.errorCount || 0;
  const processed = completed + errors;
  // 「何番目を処理中か」= 既処理数 + 1（ただし total を超えない）
  const currentN = isRunning && total > 0 ? Math.min(processed + 1, total) : processed;

  const indicator = el.statusIndicator;
  indicator.className = 'status-indicator';

  switch (state.status) {
    case 'idle':
      indicator.classList.add('idle');
      setStatus('idle', '待機中');
      break;
    case 'running':
      indicator.classList.add('running');
      setStatus('running', `処理中... (${currentN}/${total})`);
      break;
    case 'completed':
      indicator.classList.add('completed');
      setStatus('completed',
        errors > 0
          ? `完了 ✓${completed}件 / ✗${errors}件`
          : `完了！ ${completed}件処理`
      );
      break;
    case 'error':
      indicator.classList.add('error');
      setStatus('error', state.errorMessage || 'エラーが発生しました');
      break;
  }

  if (state.status === 'running' || state.status === 'completed') {
    el.progressSection.style.display = 'flex';
    const pct = total > 0 ? (processed / total) * 100 : 0;
    el.progressFill.style.width = `${pct}%`;
    el.progressText.textContent = `${processed} / ${total}`;
  } else {
    el.progressSection.style.display = 'none';
  }
}

function setStatus(type, text) {
  el.statusText.textContent = text;
  el.statusIndicator.className = `status-indicator ${type}`;
}

// ===== Settings =====
const DEFAULT_PREFIX = `以下のYAML仕様に基づいてYouTube動画のサムネイル画像を1枚生成してください。サムネイルであり、イラスト作品ではありません。

フィールドの意味:
- title: 動画タイトル。画像内には描画しない（参考情報）
- angle / core_hook / single_claim: 訴求の意図。絵の一貫した主張を作るための指針
- visual_event: 画面内で"起きている事件"。これを絵の中心に据える
- main_subject: 一番大きく目立たせる主役オブジェクト（主題は1つ）
- secondary_subject: 補助要素。主役を邪魔しない。"none" なら入れない
- composition: 画角・主役位置・余白・視線誘導
- thumbnail_text: 画像内に実際に描画するテキスト。色・配置指定も従う。"none" なら文字を入れない
- palette: 使う色（HEXコード2〜4色）。指定色以外は基本使わない
- style_direction: 絵柄・質感の方向性（主役ではなく補助）
- anti_ai_ingredients: 人間感・素材感を出すために必ず混入する要素
- negative_prompt: 絶対に入れてはいけない要素

重要:
- 1枚1メッセージ。視覚階層の頂点は常に1つ
- "事件"を見せる絵にする。整いすぎた説明図や対称的な完璧構図は弱い
- AI感を徹底排除: 3Dクレイ/ソフト3D/ぷっくり立体/ネオングロー/ブルーム/浮遊アイコン/パープル×シアン×ピンクのグラデは禁止
- 人物・顔・キャラは使わない。物理的状況で好奇心を作る
- モバイル表示（160×90px）でも主役が読めること`;

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
