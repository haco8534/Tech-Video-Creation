import express from "express";
import fs from "fs";
import path from "path";
import { getWorkflowStatus } from "../lib/workflow.js";
import { removeSchedule } from "../lib/schedule.js";

const router = express.Router();
const ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const CHANNELS_DIR = path.join(ROOT, "channels");
const ENGINE_DIR = path.join(ROOT, "engine");

const VIDEO_EXTS = new Set([".mp4", ".webm", ".mkv"]);
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function resolveProjectDir(channelId, projectId) {
  const active = path.join(CHANNELS_DIR, channelId, "projects", projectId);
  if (fs.existsSync(active)) return active;
  const archived = path.join(CHANNELS_DIR, channelId, "projects", "_archived", projectId);
  if (fs.existsSync(archived)) return archived;
  return null;
}

// ワークフローステップ取得
router.get("/:channelId/:projectId/status", (req, res) => {
  const { channelId, projectId } = req.params;
  const status = getWorkflowStatus(channelId, projectId);
  res.json(status);
});

// プロジェクト削除（依存関係も解消）
router.delete("/:channelId/:projectId", (req, res) => {
  const { channelId, projectId } = req.params;
  const projectDir = path.join(CHANNELS_DIR, channelId, "projects", projectId);

  if (!fs.existsSync(projectDir)) {
    return res.status(404).json({ error: "プロジェクトが見つかりません" });
  }

  const cleaned = [];

  // 1. Root.tsx からimportとCompositionを削除
  const rootTsxPath = path.join(ENGINE_DIR, "src", "Root.tsx");
  if (fs.existsSync(rootTsxPath)) {
    let rootContent = fs.readFileSync(rootTsxPath, "utf-8");
    const original = rootContent;

    // import文を削除 (行ベースで安全に処理)
    const lines = rootContent.split("\n");
    const filteredLines = [];
    let skipImport = false;
    for (const line of lines) {
      // このプロジェクトのimport開始を検出
      if (line.match(/^\s*import\s*\{/) && !line.includes("from")) {
        // 複数行importの開始 — 次のfrom行でプロジェクトIDを確認
        skipImport = false; // リセット
      }
      if (skipImport) {
        // import末尾(from行)まで読み飛ばし
        if (line.includes("from")) skipImport = false;
        continue;
      }
      // 複数行import: "import {" で始まる行の後、from行にprojectIdが含まれるか先読み
      if (line.match(/^\s*import\s*\{/) && !line.includes("from")) {
        // 先読み: このimportブロックが対象プロジェクトのものか確認
        const startIdx = lines.indexOf(line, filteredLines.length);
        let isTarget = false;
        for (let j = startIdx + 1; j < lines.length; j++) {
          if (lines[j].includes(`/${projectId}/remotion/VideoWithSlides`)) {
            isTarget = true;
            break;
          }
          if (lines[j].includes("from")) break;
        }
        if (isTarget) {
          skipImport = true;
          continue;
        }
      }
      // 単一行import
      if (line.includes(`/${projectId}/remotion/VideoWithSlides`)) continue;

      filteredLines.push(line);
    }

    // Composition ブロックを削除 (行ベース)
    const compId = projectId.replace(/_/g, "-") + "-slides";
    const finalLines = [];
    let skipComp = false;
    for (const line of filteredLines) {
      if (line.includes("<Composition") && !line.includes("/>")) {
        // 複数行Compositionの開始 — id行を確認
        const startIdx = filteredLines.indexOf(line, finalLines.length);
        let isTarget = false;
        for (let j = startIdx; j < filteredLines.length && j < startIdx + 10; j++) {
          if (filteredLines[j].includes(`id="${compId}"`)) { isTarget = true; break; }
          if (filteredLines[j].includes("/>")) break;
        }
        if (isTarget) { skipComp = true; continue; }
      }
      if (skipComp) {
        if (line.includes("/>")) { skipComp = false; }
        continue;
      }
      finalLines.push(line);
    }

    rootContent = finalLines.join("\n");

    if (rootContent !== original) {
      fs.writeFileSync(rootTsxPath, rootContent);
      cleaned.push("Root.tsx (import + Composition 削除)");
    }
  }

  // 2. engine/public/audio/{projectId} を削除
  const publicAudioDir = path.join(ENGINE_DIR, "public", "audio", projectId);
  if (fs.existsSync(publicAudioDir)) {
    fs.rmSync(publicAudioDir, { recursive: true, force: true });
    cleaned.push(`engine/public/audio/${projectId}`);
  }

  // 3. engine/public/images/{projectId} を削除
  const publicImagesDir = path.join(ENGINE_DIR, "public", "images", projectId);
  if (fs.existsSync(publicImagesDir)) {
    fs.rmSync(publicImagesDir, { recursive: true, force: true });
    cleaned.push(`engine/public/images/${projectId}`);
  }

  // 4. engine/output/ から関連MP4を削除
  const outputDir = path.join(ENGINE_DIR, "output");
  if (fs.existsSync(outputDir)) {
    const compId = projectId.replace(/_/g, "-") + "-slides";
    for (const f of fs.readdirSync(outputDir)) {
      if (f.startsWith(compId) && f.endsWith(".mp4")) {
        fs.unlinkSync(path.join(outputDir, f));
        cleaned.push(`engine/output/${f}`);
      }
    }
  }

  // 5. schedule.json からエントリを削除
  removeSchedule(channelId, projectId);
  cleaned.push("schedule.json エントリ削除");

  // 6. プロジェクトディレクトリを削除
  fs.rmSync(projectDir, { recursive: true, force: true });
  cleaned.push(`${channelId}/projects/${projectId} ディレクトリ削除`);

  console.log(`[delete] ${channelId}/${projectId}: ${cleaned.join(", ")}`);
  res.json({ ok: true, cleaned });
});

// レンダリング成果物（MP4）のみを削除（再レンダリング用途）
router.delete("/:channelId/:projectId/render", (req, res) => {
  const { channelId, projectId } = req.params;
  const projectDir = resolveProjectDir(channelId, projectId);
  if (!projectDir) return res.status(404).json({ error: "プロジェクトが見つかりません" });

  const removed = [];

  // 1. deliverables/*.mp4 を削除
  const delivDir = path.join(projectDir, "deliverables");
  if (fs.existsSync(delivDir)) {
    for (const f of fs.readdirSync(delivDir)) {
      if (VIDEO_EXTS.has(path.extname(f).toLowerCase())) {
        fs.unlinkSync(path.join(delivDir, f));
        removed.push(`deliverables/${f}`);
      }
    }
  }

  // 2. engine/output/{compId}*.mp4 を削除
  const compId = projectId.replace(/_/g, "-") + "-slides";
  const outputDir = path.join(ENGINE_DIR, "output");
  if (fs.existsSync(outputDir)) {
    for (const f of fs.readdirSync(outputDir)) {
      if (f.startsWith(compId) && VIDEO_EXTS.has(path.extname(f).toLowerCase())) {
        fs.unlinkSync(path.join(outputDir, f));
        removed.push(`engine/output/${f}`);
      }
    }
  }

  if (removed.length === 0) {
    return res.status(404).json({ error: "削除対象の動画ファイルがありません" });
  }

  console.log(`[delete:render] ${channelId}/${projectId}: ${removed.join(", ")}`);
  res.json({ ok: true, removed });
});

// サムネイル画像のみを削除（差し替え用途）
router.delete("/:channelId/:projectId/thumbnail", (req, res) => {
  const { channelId, projectId } = req.params;
  const projectDir = resolveProjectDir(channelId, projectId);
  if (!projectDir) return res.status(404).json({ error: "プロジェクトが見つかりません" });

  const delivDir = path.join(projectDir, "deliverables");
  if (!fs.existsSync(delivDir)) {
    return res.status(404).json({ error: "削除対象のサムネイルがありません" });
  }

  const removed = [];
  for (const f of fs.readdirSync(delivDir)) {
    if (IMAGE_EXTS.has(path.extname(f).toLowerCase())) {
      fs.unlinkSync(path.join(delivDir, f));
      removed.push(`deliverables/${f}`);
    }
  }

  if (removed.length === 0) {
    return res.status(404).json({ error: "削除対象のサムネイルがありません" });
  }

  console.log(`[delete:thumbnail] ${channelId}/${projectId}: ${removed.join(", ")}`);
  res.json({ ok: true, removed });
});

export default router;
