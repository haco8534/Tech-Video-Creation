import express from "express";
import { scanChannels } from "../lib/scanner.js";
import { getAllSchedules } from "../lib/schedule.js";
import { hasCredentials, isAuthenticated, authenticate } from "../lib/youtube.js";

const router = express.Router();

// チャンネル・プロジェクト一覧
router.get("/channels", (req, res) => {
  const channels = scanChannels();
  const schedules = getAllSchedules();

  for (const ch of channels) {
    ch.auth = {
      hasCredentials: hasCredentials(),
      isAuthenticated: isAuthenticated(ch.id),
    };
    for (const proj of ch.projects) {
      const sched = schedules[`${ch.id}/${proj.id}`];
      proj.schedule = sched || null;
    }
  }

  res.json({ channels });
});

// YouTube認証
router.post("/auth", async (req, res) => {
  const { channelId } = req.body;
  if (!channelId) return res.status(400).json({ error: "channelId が必要です" });
  try {
    await authenticate(channelId);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 動画アップロード
router.post("/upload", async (req, res) => {
  const { scanChannels: scan, getProjectDeliverables } = await import("../lib/scanner.js");
  const { uploadVideo } = await import("../lib/youtube.js");
  const { markUploaded } = await import("../lib/schedule.js");

  const { channelId, projectId, publishAt, customTitle, customDescription } = req.body;
  const deliverables = getProjectDeliverables(channelId, projectId);

  if (!deliverables.videoPath) {
    return res.status(400).json({ error: "動画ファイルが見つかりません" });
  }

  // 過去の publishAt は YouTube API が拒否するためバリデーション
  if (publishAt && new Date(publishAt) <= new Date()) {
    return res.status(400).json({ error: "公開予約日時は未来の日時を指定してください" });
  }

  let title = customTitle || deliverables.meta?.title || projectId;
  let description = customDescription || "";
  let tags = [];

  if (!customDescription && deliverables.description) {
    const lines = deliverables.description.split("\n");
    description = lines.filter((l) => !l.startsWith("# ")).join("\n").trim();
  }

  if (deliverables.description) {
    const lines = deliverables.description.split("\n");
    const kwIdx = lines.findIndex((l) => l.startsWith("## キーワード"));
    if (kwIdx >= 0 && lines[kwIdx + 1]) {
      tags = lines[kwIdx + 1].split(",").map((t) => t.trim()).filter(Boolean);
    }
  }

  try {
    const result = await uploadVideo({
      channelId,
      title, description, tags,
      videoPath: deliverables.videoPath,
      thumbnailPath: deliverables.thumbnailPath,
      publishAt: publishAt || undefined,
    });

    markUploaded(channelId, projectId, result.videoId);
    res.json(result);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
