import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const ENGINE_DIR = path.join(ROOT, "engine");
const CHANNELS_DIR = path.join(ROOT, "channels");

const activeRenders = new Map();

/**
 * レンダリング開始
 */
export function startRender(ws, { channelId, projectId, compositionId }) {
  if (!compositionId) {
    // project_id からcomposition IDを推測 (snake_case → kebab-case + "-slides")
    compositionId = projectId.replace(/_/g, "-") + "-slides";
  }

  const outputPath = path.join(ENGINE_DIR, "output", `${compositionId}.mp4`);

  const args = [
    "npx", "remotion", "render",
    compositionId,
    outputPath,
    "--codec", "h264",
  ];

  const proc = spawn(args[0], args.slice(1), {
    cwd: ENGINE_DIR,
    stdio: ["pipe", "pipe", "pipe"],
    shell: true,
  });

  const renderId = `${channelId}/${projectId}`;
  activeRenders.set(renderId, { process: proc, ws });

  ws.send(JSON.stringify({ type: "render-start", renderId, compositionId }));

  proc.stdout.on("data", (chunk) => {
    const text = chunk.toString();
    // Parse Remotion progress output: "Rendered 450/9000 frames (5%)"
    const match = text.match(/(\d+)\/(\d+)\s+frames?\s*\((\d+)%\)/);
    if (match) {
      ws.send(JSON.stringify({
        type: "render-progress",
        renderId,
        current: parseInt(match[1]),
        total: parseInt(match[2]),
        percent: parseInt(match[3]),
      }));
    }
    ws.send(JSON.stringify({ type: "render-log", renderId, text }));
  });

  proc.stderr.on("data", (chunk) => {
    const text = chunk.toString();
    // Remotion also outputs progress to stderr
    const match = text.match(/(\d+)\/(\d+)\s+frames?\s*\((\d+)%\)/);
    if (match) {
      ws.send(JSON.stringify({
        type: "render-progress",
        renderId,
        current: parseInt(match[1]),
        total: parseInt(match[2]),
        percent: parseInt(match[3]),
      }));
    }
  });

  proc.on("close", (code) => {
    const success = code === 0 && fs.existsSync(outputPath);

    // レンダリング成功時、動画をプロジェクトの deliverables/ にコピー
    let deliverablePath = null;
    if (success) {
      const delivDir = path.join(CHANNELS_DIR, channelId, "projects", projectId, "deliverables");
      if (!fs.existsSync(delivDir)) {
        fs.mkdirSync(delivDir, { recursive: true });
      }
      deliverablePath = path.join(delivDir, `${projectId}.mp4`);
      fs.copyFileSync(outputPath, deliverablePath);
    }

    ws.send(JSON.stringify({
      type: "render-complete",
      renderId,
      success,
      outputPath: success ? deliverablePath : null,
      code,
    }));
    activeRenders.delete(renderId);
  });
}

/**
 * WebSocketメッセージハンドラ
 */
export function handleRenderWs(ws) {
  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.action === "start-render") {
        startRender(ws, msg);
      } else if (msg.action === "cancel-render") {
        const render = activeRenders.get(msg.renderId);
        if (render) {
          render.process.kill();
          activeRenders.delete(msg.renderId);
          ws.send(JSON.stringify({ type: "render-cancelled", renderId: msg.renderId }));
        }
      }
    } catch (err) {
      ws.send(JSON.stringify({ type: "error", message: err.message }));
    }
  });

  ws.on("close", () => {
    for (const [id, render] of activeRenders) {
      if (render.ws === ws) {
        render.process.kill();
        activeRenders.delete(id);
      }
    }
  });
}
