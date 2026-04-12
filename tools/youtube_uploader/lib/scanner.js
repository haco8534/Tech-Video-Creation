import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const CHANNELS_DIR = path.join(ROOT, "channels");

const VIDEO_EXTS = new Set([".mp4", ".webm", ".mkv"]);
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function readJson(filePath) {
  let text = fs.readFileSync(filePath, "utf-8");
  // BOM除去 (Windows環境でClaude Codeが付与する場合がある)
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  return JSON.parse(text);
}

function findFileByExt(dir, extSet) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  const match = files.find((f) => extSet.has(path.extname(f).toLowerCase()));
  return match ? path.join(dir, match) : null;
}

function readDescription(dir) {
  const descPath = path.join(dir, "概要欄.md");
  if (!fs.existsSync(descPath)) return null;
  return fs.readFileSync(descPath, "utf-8");
}

export function scanChannels() {
  if (!fs.existsSync(CHANNELS_DIR)) return [];

  const channels = [];

  for (const channelId of fs.readdirSync(CHANNELS_DIR)) {
    const channelDir = path.join(CHANNELS_DIR, channelId);
    const channelJsonPath = path.join(channelDir, "channel.json");
    if (!fs.existsSync(channelJsonPath)) continue;

    const channelMeta = JSON.parse(
      fs.readFileSync(channelJsonPath, "utf-8")
    );
    const projectsDir = path.join(channelDir, "projects");
    if (!fs.existsSync(projectsDir)) continue;

    const projects = [];

    // アクティブプロジェクトとアーカイブ済みプロジェクトの両方を走査
    const scanDirs = [
      { dir: projectsDir, archived: false },
    ];
    const archivedDir = path.join(projectsDir, "_archived");
    if (fs.existsSync(archivedDir)) {
      scanDirs.push({ dir: archivedDir, archived: true });
    }

    for (const { dir, archived } of scanDirs) {
      for (const projectId of fs.readdirSync(dir)) {
        if (projectId.startsWith("_")) continue;
        const projectDir = path.join(dir, projectId);
        const metaPath = path.join(projectDir, "meta.json");
        if (!fs.existsSync(metaPath)) continue;

        const meta = readJson(metaPath);
        const delivDir = path.join(projectDir, "deliverables");

        const videoPath = findFileByExt(delivDir, VIDEO_EXTS);
        const thumbPath = findFileByExt(delivDir, IMAGE_EXTS);
        const description = readDescription(delivDir);

        projects.push({
          id: meta.id,
          title: meta.title,
          status: meta.status,
          channelId,
          archived,
          hasVideo: !!videoPath,
          videoPath,
          hasThumbnail: !!thumbPath,
          thumbnailPath: thumbPath,
          hasDescription: !!description,
          description,
        });
      }
    }

    channels.push({
      id: channelMeta.id,
      name: channelMeta.name,
      projects,
    });
  }

  return channels;
}

export function getProjectDeliverables(channelId, projectId) {
  // アクティブ → アーカイブの順で探索
  const projectCandidates = [
    path.join(CHANNELS_DIR, channelId, "projects", projectId),
    path.join(CHANNELS_DIR, channelId, "projects", "_archived", projectId),
  ];
  const projectDir = projectCandidates.find((d) => fs.existsSync(d)) || projectCandidates[0];
  const delivDir = path.join(projectDir, "deliverables");

  // meta.json からタイトルを取得
  let meta = null;
  const metaPath = path.join(projectDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    meta = readJson(metaPath);
  }

  return {
    videoPath: findFileByExt(delivDir, VIDEO_EXTS),
    thumbnailPath: findFileByExt(delivDir, IMAGE_EXTS),
    description: readDescription(delivDir),
    meta,
  };
}
