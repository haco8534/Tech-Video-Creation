import express from "express";
import { scanChannels } from "../lib/scanner.js";
import { getAllSchedules, setSchedule } from "../lib/schedule.js";
import { getWorkflowStatus } from "../lib/workflow.js";

const router = express.Router();

// カレンダー用データ取得
router.get("/", (req, res) => {
  const channels = scanChannels();
  const schedules = getAllSchedules();
  const events = [];

  for (const ch of channels) {
    for (const proj of ch.projects) {
      const sched = schedules[`${ch.id}/${proj.id}`];
      const workflow = getWorkflowStatus(ch.id, proj.id);

      let type = "inProgress";
      let date = null;

      if (sched?.videoId) {
        type = "uploaded";
        date = sched.publishAt || sched.uploadedAt;
      } else if (sched?.publishAt) {
        type = "scheduled";
        date = sched.publishAt;
      } else if (proj.hasVideo) {
        type = "ready";
      }

      events.push({
        channelId: ch.id,
        channelName: ch.name,
        projectId: proj.id,
        title: proj.title,
        type,
        date,
        currentStep: workflow.currentStep,
        totalSteps: workflow.totalSteps,
        hasVideo: proj.hasVideo,
        hasThumbnail: proj.hasThumbnail,
      });
    }
  }

  res.json({ events });
});

// スケジュール更新
router.post("/schedule", (req, res) => {
  const { channelId, projectId, publishAt } = req.body;
  if (!channelId || !projectId) {
    return res.status(400).json({ error: "channelId, projectId が必要です" });
  }
  const entry = setSchedule(channelId, projectId, { publishAt });
  res.json({ ok: true, entry });
});

// スケジュール済み & 未投稿のプロジェクトを一括アップロード
router.post("/bulk-upload", async (req, res) => {
  try {
    const { uploadVideo } = await import("../lib/youtube.js");
    const { markUploaded } = await import("../lib/schedule.js");
    const { getProjectDeliverables } = await import("../lib/scanner.js");

    const channels = scanChannels();
    const schedules = getAllSchedules();

    // publishAt あり & videoId なし & 動画+サムネ揃い のものを抽出
    const targets = [];
    for (const ch of channels) {
      for (const proj of ch.projects) {
        const sched = schedules[`${ch.id}/${proj.id}`];
        if (!sched?.publishAt || sched.videoId) continue;
        if (!proj.hasVideo || !proj.hasThumbnail) continue;
        // publishAt が過去ならスキップ（YouTube API が拒否する）
        if (new Date(sched.publishAt) <= new Date()) continue;
        targets.push({ channelId: ch.id, projectId: proj.id, publishAt: sched.publishAt, title: proj.title });
      }
    }

    if (targets.length === 0) {
      return res.json({ ok: true, results: [], message: "投稿対象がありません" });
    }

    const results = [];
    for (const t of targets) {
      try {
        const deliverables = getProjectDeliverables(t.channelId, t.projectId);
        if (!deliverables.videoPath) throw new Error("動画ファイルが見つかりません");

        let title = deliverables.meta?.title || t.projectId;
        let description = "";
        let tags = [];

        if (deliverables.description) {
          const lines = deliverables.description.split("\n");
          description = lines.filter((l) => !l.startsWith("# ")).join("\n").trim();
          const kwIdx = lines.findIndex((l) => l.startsWith("## キーワード"));
          if (kwIdx >= 0 && lines[kwIdx + 1]) {
            tags = lines[kwIdx + 1].split(",").map((s) => s.trim()).filter(Boolean);
          }
        }

        const result = await uploadVideo({
          channelId: t.channelId,
          title, description, tags,
          videoPath: deliverables.videoPath,
          thumbnailPath: deliverables.thumbnailPath,
          publishAt: t.publishAt,
        });

        markUploaded(t.channelId, t.projectId, result.videoId);
        results.push({ channelId: t.channelId, projectId: t.projectId, title, success: true, videoId: result.videoId });
        console.log(`[bulk-upload] ${t.channelId}/${t.projectId}: OK (${result.videoId})`);
      } catch (err) {
        results.push({ channelId: t.channelId, projectId: t.projectId, title: t.title, success: false, error: err.message });
        console.error(`[bulk-upload] ${t.channelId}/${t.projectId}: FAIL - ${err.message}`);
      }
  }

    res.json({ ok: true, results });
  } catch (err) {
    console.error("[bulk-upload] fatal:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
