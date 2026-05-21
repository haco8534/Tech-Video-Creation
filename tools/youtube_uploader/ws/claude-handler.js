import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const CHANNELS_DIR = path.join(ROOT, "channels");
const ENGINE_DIR = path.join(ROOT, "engine");
const CLAUDE_BIN = process.env.CLAUDE_BIN || "C:/Users/81804/.local/bin/claude.exe";

/**
 * プロジェクトごとのClaude実行状態を管理
 * key: "channelId/projectId"
 * value: { process, running, history[], subscribers: Set<ws> }
 */
const projectSessions = new Map();

/**
 * プロジェクトごとのレンダリング状態を管理
 * key: "channelId/projectId"
 * value: { process, progress }
 */
const activeRenders = new Map();

/**
 * レンダリングキュー（実行待ち）
 * { channelId, projectId }[]
 */
const renderQueue = [];
const MAX_CONCURRENT_RENDERS = 1;

function projectKey(channelId, projectId) {
  return `${channelId}/${projectId}`;
}

function stripAnsi(str) {
  return str
    .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "")
    .replace(/\x1b\][^\x07]*\x07/g, "")
    .replace(/\r/g, "\n");
}

function parseRenderProgress(text) {
  const clean = stripAnsi(text);
  // "X/Y frames (Z%)" or "X/Y frames (Z.Z%)"
  let m = clean.match(/(\d+)\s*\/\s*(\d+)\s+frames?\s*\(\s*(\d+(?:\.\d+)?)\s*%/i);
  if (m) return { current: +m[1], total: +m[2], percent: Math.round(+m[3]) };
  // "(X/Y) ... Z%"
  m = clean.match(/\((\d+)\s*\/\s*(\d+)\)[^%]*?(\d+(?:\.\d+)?)\s*%/);
  if (m) return { current: +m[1], total: +m[2], percent: Math.round(+m[3]) };
  // "(X/Y)" with computed percent as fallback
  m = clean.match(/\((\d+)\s*\/\s*(\d+)\)/);
  if (m) {
    const current = +m[1], total = +m[2];
    return { current, total, percent: total ? Math.round(current * 100 / total) : 0 };
  }
  // Just "Z%"
  m = clean.match(/(\d+(?:\.\d+)?)\s*%/);
  if (m) return { percent: Math.round(+m[1]) };
  return null;
}

function extractLastLogLine(text) {
  const clean = stripAnsi(text).trim();
  if (!clean) return null;
  const lines = clean.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.length ? lines[lines.length - 1] : null;
}

function getSession(channelId, projectId) {
  return projectSessions.get(projectKey(channelId, projectId));
}

function ensureSession(key) {
  let session = projectSessions.get(key);
  if (!session) {
    session = { process: null, running: false, history: [], subscribers: new Set(), sessionId: null };
    projectSessions.set(key, session);
  }
  return session;
}

function broadcast(key, msg) {
  const session = projectSessions.get(key);
  if (!session) return;
  const data = JSON.stringify(msg);
  session.history.push(msg);
  for (const ws of session.subscribers) {
    if (ws.readyState === 1) ws.send(data);
  }
}

/** レンダリングイベントもbroadcastで配信（履歴には進捗を溜めない） */
function broadcastLive(key, msg) {
  const session = projectSessions.get(key);
  if (!session) return;
  const data = JSON.stringify(msg);
  for (const ws of session.subscribers) {
    if (ws.readyState === 1) ws.send(data);
  }
}

function buildArgs(extra) {
  return [
    "--print",
    "--verbose",
    "--output-format", "stream-json",
    "--dangerously-skip-permissions",
    ...extra,
  ];
}

/**
 * Claudeプロセスを起動（プロジェクト単位）
 */
function launchForProject(channelId, projectId, prompt, opts = {}) {
  const key = projectKey(channelId, projectId);
  const workflowPath = path.join(CHANNELS_DIR, channelId, "workflows", "create-video-full.md");
  const projectDir = path.join(CHANNELS_DIR, channelId, "projects", projectId);

  const extra = [];

  if (opts.resumeSessionId) {
    // resume時はセッションに既にシステムプロンプトとコンテキストが入っているため、
    // --system-prompt-file / --append-system-prompt は渡さない（衝突防止）
    extra.push("--resume", opts.resumeSessionId);
  } else {
    // 新規セッション: システムプロンプトとプロジェクトコンテキストを設定
    extra.push("--system-prompt-file", workflowPath, "--add-dir", projectDir);

    try {
      const metaPath = path.join(projectDir, "meta.json");
      if (fs.existsSync(metaPath)) {
        let metaText = fs.readFileSync(metaPath, "utf-8");
        if (metaText.charCodeAt(0) === 0xfeff) metaText = metaText.slice(1);
        const meta = JSON.parse(metaText);
        const projectContext = `現在のプロジェクト: ID=${meta.id}, タイトル=${meta.title}, ステータス=${meta.status}, ディレクトリ=${projectDir}, チャンネル=${channelId}。このプロジェクトの動画制作を担当しています。ユーザーの指示に従いワークフローの該当ステップを実行してください。`;
        extra.push("--append-system-prompt", projectContext);
      }
    } catch {}
  }

  extra.push("-p", prompt);

  const args = buildArgs(extra);
  console.log(`[claude] ${key} launch: ${prompt.slice(0, 80)}...`);

  const proc = spawn(CLAUDE_BIN, args, {
    cwd: ROOT,
    stdio: ["pipe", "pipe", "pipe"],
    shell: false,
  });

  const session = ensureSession(key);
  session.process = proc;
  session.running = true;

  broadcast(key, { type: "session-start", projectKey: key });

  let buffer = "";
  proc.stdout.on("data", (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        // init イベントからセッションIDを取得して保存
        if (parsed.type === "system" && parsed.subtype === "init" && parsed.session_id) {
          session.sessionId = parsed.session_id;
          console.log(`[claude] ${key} session_id: ${parsed.session_id}`);
        }
        broadcast(key, { type: "claude-event", projectKey: key, data: parsed });
      } catch {
        broadcast(key, { type: "claude-text", projectKey: key, text: line });
      }
    }
  });

  proc.stderr.on("data", (chunk) => {
    const text = chunk.toString();
    if (text.includes("Warning:")) return;
    broadcast(key, { type: "claude-error", projectKey: key, text });
  });

  proc.on("close", (code) => {
    console.log(`[claude] ${key} ended (code: ${code})`);
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer);
        broadcast(key, { type: "claude-event", projectKey: key, data: parsed });
      } catch {
        broadcast(key, { type: "claude-text", projectKey: key, text: buffer });
      }
    }
    session.running = false;
    broadcast(key, { type: "session-end", projectKey: key, code });

    if (session.pendingMessage) {
      const msg = session.pendingMessage;
      const sid = session.sessionId;
      session.pendingMessage = null;
      launchForProject(channelId, projectId, msg, sid ? { resumeSessionId: sid } : {});
    }
  });
}

// =========================================================
// レンダリング（共有WS経由）
// =========================================================

function startRenderForProject(channelId, projectId) {
  const key = projectKey(channelId, projectId);

  if (activeRenders.has(key)) {
    // 同一プロジェクトの重複レンダリングは無視
    return;
  }

  // 同時レンダリング数チェック → キューに追加
  if (activeRenders.size >= MAX_CONCURRENT_RENDERS) {
    if (!renderQueue.some((q) => q.key === key)) {
      renderQueue.push({ key, channelId, projectId });
      ensureSession(key);
      broadcastLive(key, { type: "render-queued", projectKey: key, position: renderQueue.length });
      console.log(`[render] ${key} queued (position: ${renderQueue.length})`);
    }
    return;
  }

  executeRender(channelId, projectId, key);
}

function executeRender(channelId, projectId, key) {
  const compositionId = projectId.replace(/_/g, "-") + "-slides";
  const outputPath = path.join(ENGINE_DIR, "output", `${compositionId}.mp4`);

  const args = ["npx", "remotion", "render", compositionId, outputPath, "--codec", "h264"];

  const proc = spawn(args[0], args.slice(1), {
    cwd: ENGINE_DIR,
    stdio: ["pipe", "pipe", "pipe"],
    shell: true,
  });

  activeRenders.set(key, { process: proc, progress: null, channelId, projectId });
  ensureSession(key);

  broadcastLive(key, { type: "render-start", projectKey: key, compositionId });
  console.log(`[render] ${key} start: ${compositionId}`);

  function handleOutput(chunk) {
    const text = chunk.toString();
    const progress = parseRenderProgress(text);
    if (progress) {
      const render = activeRenders.get(key);
      if (render) render.progress = progress;
      broadcastLive(key, { type: "render-progress", projectKey: key, ...progress });
    }
    const lastLine = extractLastLogLine(text);
    if (lastLine) {
      broadcastLive(key, { type: "render-log", projectKey: key, text: lastLine });
    }
  }

  proc.stdout.on("data", handleOutput);
  proc.stderr.on("data", handleOutput);

  proc.on("close", (code) => {
    const success = code === 0 && fs.existsSync(outputPath);

    if (success) {
      const delivDir = path.join(CHANNELS_DIR, channelId, "projects", projectId, "deliverables");
      fs.mkdirSync(delivDir, { recursive: true });
      const delivPath = path.join(delivDir, `${projectId}.mp4`);
      fs.copyFileSync(outputPath, delivPath);
    }

    console.log(`[render] ${key} done (code: ${code}, success: ${success})`);
    broadcastLive(key, { type: "render-complete", projectKey: key, success, code });
    activeRenders.delete(key);

    // キューから次を実行
    processRenderQueue();
  });
}

function processRenderQueue() {
  while (renderQueue.length > 0 && activeRenders.size < MAX_CONCURRENT_RENDERS) {
    const next = renderQueue.shift();
    // キューに入っている間にキャンセルされた場合はスキップ
    if (!activeRenders.has(next.key)) {
      executeRender(next.channelId, next.projectId, next.key);
    }
  }
  // キュー内の残りに順番を通知
  renderQueue.forEach((item, i) => {
    broadcastLive(item.key, { type: "render-queued", projectKey: item.key, position: i + 1 });
  });
}

function cancelRender(channelId, projectId) {
  const key = projectKey(channelId, projectId);

  // キューから除去
  const qIdx = renderQueue.findIndex((q) => q.key === key);
  if (qIdx >= 0) {
    renderQueue.splice(qIdx, 1);
    broadcastLive(key, { type: "render-cancelled", projectKey: key });
    return;
  }

  // 実行中のレンダリングを停止
  const render = activeRenders.get(key);
  if (render) {
    render.process.kill();
    activeRenders.delete(key);
    broadcastLive(key, { type: "render-cancelled", projectKey: key });
    processRenderQueue();
  }
}

// =========================================================
// テーマ生成 / サムネイルプロンプト生成
// =========================================================

function launchTheme(ws, channelId, seed) {
  const workflowPath = path.join(CHANNELS_DIR, channelId, "workflows", "theme_research.md");
  const prompt = `以下のシードトピックについてテーマ案を生成してください。\n\nシードトピック: ${seed}\n\nワークフロー定義に従って実行し、最終的なテーマ候補を以下のJSON形式で出力してください:\n[{ "title": "...", "description": "...", "score": 数値 }]`;

  const args = buildArgs([
    "--system-prompt-file", workflowPath,
    "-p", prompt,
  ]);

  const proc = spawn(CLAUDE_BIN, args, {
    cwd: ROOT,
    stdio: ["pipe", "pipe", "pipe"],
    shell: false,
  });

  const send = (msg) => {
    if (ws.readyState === 1) ws.send(JSON.stringify(msg));
  };

  send({ type: "session-start", projectKey: "theme" });

  let buffer = "";
  proc.stdout.on("data", (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        send({ type: "claude-event", projectKey: "theme", data: JSON.parse(line) });
      } catch {
        send({ type: "claude-text", projectKey: "theme", text: line });
      }
    }
  });

  proc.stderr.on("data", (chunk) => {
    const text = chunk.toString();
    if (!text.includes("Warning:")) send({ type: "claude-error", projectKey: "theme", text });
  });

  proc.on("close", (code) => {
    if (buffer.trim()) {
      try {
        send({ type: "claude-event", projectKey: "theme", data: JSON.parse(buffer) });
      } catch {
        send({ type: "claude-text", projectKey: "theme", text: buffer });
      }
    }
    send({ type: "session-end", projectKey: "theme", code });
  });
}

function launchThumbnailPrompt(ws, titles) {
  const workflowPath = path.join(ROOT, "thumbnail", "_agents", "workflows", "thumbnail_prompts.md");
  const titlesText = titles.map((t) => `- 「${t}」`).join("\n");
  const prompt = `以下の動画タイトルそれぞれについて、ワークフローに従ってサムネ設計を行い、Step 7の最終YAMLを1タイトルにつき1つ出力してください。\n\n${titlesText}`;

  const args = buildArgs([
    "--system-prompt-file", workflowPath,
    "-p", prompt,
  ]);

  const proc = spawn(CLAUDE_BIN, args, {
    cwd: ROOT,
    stdio: ["pipe", "pipe", "pipe"],
    shell: false,
  });

  const send = (msg) => {
    if (ws.readyState === 1) ws.send(JSON.stringify(msg));
  };

  send({ type: "session-start", projectKey: "thumbnail-prompt" });

  let buffer = "";
  proc.stdout.on("data", (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        send({ type: "claude-event", projectKey: "thumbnail-prompt", data: JSON.parse(line) });
      } catch {
        send({ type: "claude-text", projectKey: "thumbnail-prompt", text: line });
      }
    }
  });

  proc.stderr.on("data", (chunk) => {
    const text = chunk.toString();
    if (!text.includes("Warning:")) send({ type: "claude-error", projectKey: "thumbnail-prompt", text });
  });

  proc.on("close", (code) => {
    if (buffer.trim()) {
      try {
        send({ type: "claude-event", projectKey: "thumbnail-prompt", data: JSON.parse(buffer) });
      } catch {
        send({ type: "claude-text", projectKey: "thumbnail-prompt", text: buffer });
      }
    }
    send({ type: "session-end", projectKey: "thumbnail-prompt", code });
  });

  return proc;
}

// =========================================================
// WebSocketハンドラ
// =========================================================

export function handleClaudeWs(ws) {
  const subscriptions = new Set();

  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw);

      switch (msg.action) {
        case "start-theme":
          launchTheme(ws, msg.channelId, msg.seed);
          break;

        case "start-thumbnail-prompt":
          launchThumbnailPrompt(ws, msg.titles);
          break;

        case "subscribe": {
          const key = projectKey(msg.channelId, msg.projectId);
          subscriptions.add(key);
          const session = ensureSession(key);
          session.subscribers.add(ws);

          // 過去の履歴を送信
          for (const histMsg of session.history) {
            ws.send(JSON.stringify(histMsg));
          }

          // Claude ステータス
          ws.send(JSON.stringify({
            type: "status",
            projectKey: key,
            running: session.running,
            historyLength: session.history.length,
          }));

          // レンダリングステータス
          const render = activeRenders.get(key);
          const queued = renderQueue.find((q) => q.key === key);
          ws.send(JSON.stringify({
            type: "render-status",
            projectKey: key,
            rendering: !!render,
            queued: !!queued,
            queuePosition: queued ? renderQueue.indexOf(queued) + 1 : 0,
            progress: render?.progress || null,
          }));
          break;
        }

        case "unsubscribe": {
          const key = projectKey(msg.channelId, msg.projectId);
          subscriptions.delete(key);
          const session = projectSessions.get(key);
          if (session) session.subscribers.delete(ws);
          break;
        }

        case "start-production": {
          const key = projectKey(msg.channelId, msg.projectId);
          const session = getSession(msg.channelId, msg.projectId);

          ensureSession(key);
          broadcast(key, { type: "user-message", projectKey: key, text: msg.message });

          if (session?.running) {
            console.log(`[claude] ${key} interrupt with new message`);
            session.process.kill();
            session.running = false;
            broadcast(key, { type: "interrupted", projectKey: key });
            session.pendingMessage = msg.message;
          } else {
            launchForProject(msg.channelId, msg.projectId, msg.message);
          }
          break;
        }

        case "send-message": {
          const key = projectKey(msg.channelId, msg.projectId);
          const session = getSession(msg.channelId, msg.projectId);

          broadcast(key, { type: "user-message", projectKey: key, text: msg.message });

          if (session?.running) {
            console.log(`[claude] ${key} interrupt: ${msg.message.slice(0, 50)}`);
            session.process.kill();
            session.pendingMessage = msg.message;
          } else {
            const sid = session?.sessionId;
            launchForProject(msg.channelId, msg.projectId, msg.message, sid ? { resumeSessionId: sid } : {});
          }
          break;
        }

        case "kill": {
          const session = getSession(msg.channelId, msg.projectId);
          if (session?.process) {
            session.pendingMessage = null;
            session.process.kill();
          }
          break;
        }

        // --- レンダリング ---
        case "start-render":
          startRenderForProject(msg.channelId, msg.projectId);
          break;

        case "cancel-render":
          cancelRender(msg.channelId, msg.projectId);
          break;
      }
    } catch (err) {
      ws.send(JSON.stringify({ type: "error", message: err.message }));
    }
  });

  ws.on("close", () => {
    // 購読解除（プロセスは止めない — Claude/レンダリング両方とも続行）
    for (const key of subscriptions) {
      const session = projectSessions.get(key);
      if (session) session.subscribers.delete(ws);
    }
  });
}

// =========================================================
// セッション状態API用エクスポート
// =========================================================

export function getActiveSessions() {
  const sessions = {};
  for (const [key, session] of projectSessions) {
    if (session.running || session.history.length > 0) {
      sessions[key] = {
        claudeRunning: session.running,
        claudeDone: !session.running && session.history.length > 0,
      };
    }
  }
  for (const [key, render] of activeRenders) {
    if (!sessions[key]) sessions[key] = {};
    sessions[key].rendering = true;
    sessions[key].renderProgress = render.progress;
  }
  for (let i = 0; i < renderQueue.length; i++) {
    const item = renderQueue[i];
    if (!sessions[item.key]) sessions[item.key] = {};
    sessions[item.key].renderQueued = true;
    sessions[item.key].renderQueuePosition = i + 1;
  }
  return sessions;
}
