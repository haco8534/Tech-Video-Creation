import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { scanChannels } from "../lib/scanner.js";

const router = express.Router();
const ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const CHANNELS_DIR = path.join(ROOT, "channels");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 30 },
  fileFilter(req, file, cb) {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});

// サムネ未登録プロジェクト一覧
router.get("/candidates", (req, res) => {
  const { channelId } = req.query;
  const channels = scanChannels();

  const candidates = [];
  for (const ch of channels) {
    if (channelId && channelId !== "__all__" && ch.id !== channelId) continue;
    for (const p of ch.projects) {
      if (p.archived) continue;
      candidates.push({
        channelId: ch.id,
        projectId: p.id,
        title: p.title,
        hasThumbnail: p.hasThumbnail,
        thumbnailPath: p.thumbnailPath,
      });
    }
  }
  res.json({ candidates });
});

// 一括取り込み
router.post("/import", upload.array("images", 30), async (req, res) => {
  let assignments;
  try {
    assignments = JSON.parse(req.body.assignments || "{}");
  } catch {
    return res.status(400).json({ error: "Invalid assignments JSON" });
  }

  const results = [];

  for (const file of req.files) {
    const assign = assignments[file.originalname];
    if (!assign) continue;

    const { channelId, projectId } = assign;

    // deliverables ディレクトリを特定 (アクティブ → アーカイブの順)
    const activePath = path.join(CHANNELS_DIR, channelId, "projects", projectId, "deliverables");
    const archivedPath = path.join(CHANNELS_DIR, channelId, "projects", "_archived", projectId, "deliverables");
    const delivDir = fs.existsSync(activePath) ? activePath
      : fs.existsSync(archivedPath) ? archivedPath
      : activePath;

    try {
      // deliverables ディレクトリがなければ作成
      fs.mkdirSync(delivDir, { recursive: true });

      // 既存サムネをバックアップ
      const targetPath = path.join(delivDir, "thumbnail.jpg");
      if (fs.existsSync(targetPath)) {
        const backupName = `thumbnail_backup_${Date.now()}.jpg`;
        fs.renameSync(targetPath, path.join(delivDir, backupName));
      }

      // sharp でリサイズ + JPEG変換
      const originalSize = file.size;
      const buffer = await sharp(file.buffer)
        .resize(1280, 720, { fit: "cover" })
        .jpeg({ quality: 85 })
        .toBuffer();

      fs.writeFileSync(targetPath, buffer);

      results.push({
        projectId,
        channelId,
        success: true,
        originalSize,
        newSize: buffer.length,
      });
    } catch (err) {
      results.push({
        projectId,
        channelId,
        success: false,
        error: err.message,
      });
    }
  }

  res.json({ results });
});

// prompts.txt の読み込み
const PROMPTS_PATH = path.join(ROOT, "thumbnail", "output", "prompts.txt");

router.get("/prompts", (req, res) => {
  if (!fs.existsSync(PROMPTS_PATH)) {
    return res.json({ text: "", blocks: [] });
  }
  const text = fs.readFileSync(PROMPTS_PATH, "utf-8");
  // --- 区切りでブロックに分割
  const blocks = text.split(/^---$/m)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      const fields = {};
      for (const line of block.split("\n")) {
        const m = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
        if (m) fields[m[1]] = m[2];
      }
      return { raw: block, ...fields };
    });
  res.json({ text, blocks });
});

export default router;
