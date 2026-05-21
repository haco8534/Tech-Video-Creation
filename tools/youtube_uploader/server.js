import express from "express";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { URL } from "url";

import channelsRouter from "./routes/channels.js";
import projectsRouter from "./routes/projects.js";
import themesRouter from "./routes/themes.js";
import calendarRouter from "./routes/calendar.js";
import thumbnailsRouter from "./routes/thumbnails.js";
import templatesRouter from "./routes/templates.js";
import { handleClaudeWs, getActiveSessions } from "./ws/claude-handler.js";
import { handleRenderWs } from "./ws/render-handler.js";
import { startStudio, getStudioStatus, stopStudio } from "./lib/remotion-runner.js";

const app = express();
const PORT = 3847;
const ROOT = path.resolve(import.meta.dirname, "..", "..");

app.use(express.json());

// ファイル配信（サムネイル・動画プレビュー用）
app.get("/api/file", (req, res) => {
  const filePath = req.query.path;
  if (!filePath || !filePath.startsWith(ROOT)) {
    return res.status(400).json({ error: "Invalid path" });
  }
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.sendFile(filePath);
});

// ルーター
app.use("/api", channelsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/themes", themesRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/thumbnails", thumbnailsRouter);
app.use("/api/templates", templatesRouter);

// セッション状態API
app.get("/api/sessions/active", (req, res) => {
  res.json({ sessions: getActiveSessions() });
});

// Remotion Studio制御
app.post("/api/remotion/studio/start", async (req, res) => {
  try {
    const result = await startStudio();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/remotion/studio/status", async (req, res) => {
  const status = await getStudioStatus();
  res.json(status);
});

app.post("/api/remotion/studio/stop", (req, res) => {
  stopStudio();
  res.json({ ok: true });
});

// 静的ファイル: ビルド済みReact (client/dist) を配信
const clientDist = path.join(import.meta.dirname, "client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// HTTP + WebSocket server
const server = createServer(app);

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

  if (pathname === "/ws/claude" || pathname === "/ws/render") {
    console.log(`[ws] upgrade: ${pathname}`);
    wss.handleUpgrade(request, socket, head, (ws) => {
      console.log(`[ws] connected: ${pathname}`);
      if (pathname === "/ws/claude") {
        handleClaudeWs(ws);
      } else {
        handleRenderWs(ws);
      }
    });
  } else {
    socket.destroy();
  }
});

server.listen(PORT, async () => {
  console.log(`動画プロダクション Dashboard: http://localhost:${PORT}`);

  // Remotion Studio を自動起動
  try {
    const result = await startStudio();
    console.log(`[remotion] ${result.message} (port: ${result.port})`);
  } catch (err) {
    console.error(`[remotion] 起動失敗: ${err.message}`);
  }
});
