import express from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const router = express.Router();
const ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const CHANNELS_DIR = path.join(ROOT, "channels");

function generateProjectId(title) {
  // ASCII英数字部分からスラッグを作成
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  // スラッグが空（日本語のみのタイトルなど）の場合はランダムIDを付与
  if (!slug) {
    return `proj_${crypto.randomUUID().slice(0, 8)}`;
  }
  return slug;
}

// テーマ登録: 選択されたテーマをプロジェクトとして作成
router.post("/register", (req, res) => {
  const { channelId, themes } = req.body;
  if (!channelId || !themes || !Array.isArray(themes)) {
    return res.status(400).json({ error: "channelId と themes[] が必要です" });
  }

  const created = [];
  const usedIds = new Set();
  for (const theme of themes) {
    let projectId = theme.id || generateProjectId(theme.title);
    // 同一バッチ内でのID重複を回避
    while (usedIds.has(projectId)) {
      projectId = `${projectId}_${crypto.randomUUID().slice(0, 4)}`;
    }
    usedIds.add(projectId);

    const projectDir = path.join(CHANNELS_DIR, channelId, "projects", projectId);

    // 既存チェック
    if (fs.existsSync(projectDir)) {
      created.push({ id: projectId, title: theme.title, existed: true });
      continue;
    }

    // ディレクトリ作成
    const dirs = ["script", "slides", "audio", "remotion/scenes", "deliverables"];
    for (const d of dirs) {
      fs.mkdirSync(path.join(projectDir, d), { recursive: true });
    }

    // meta.json作成
    const meta = {
      id: projectId,
      title: theme.title,
      status: "theme",
    };
    if (theme.note) meta.note = theme.note;
    fs.writeFileSync(path.join(projectDir, "meta.json"), JSON.stringify(meta, null, 2));

    // theme.json にテーマ詳細保存
    fs.writeFileSync(path.join(projectDir, "theme.json"), JSON.stringify(theme, null, 2));

    created.push({ id: projectId, title: theme.title, existed: false });
  }

  res.json({ created });
});

// ワークフローファイル読み込み
router.get("/workflow/:channelId", (req, res) => {
  const { channelId } = req.params;
  const workflowPath = path.join(CHANNELS_DIR, channelId, "workflows", "theme_research.md");
  if (!fs.existsSync(workflowPath)) {
    return res.status(404).json({ error: "テーマリサーチワークフローが見つかりません" });
  }
  const content = fs.readFileSync(workflowPath, "utf-8");
  res.json({ content });
});

export default router;
