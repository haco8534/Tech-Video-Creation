import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const CHANNELS_DIR = path.join(ROOT, "channels");
const ENGINE_DIR = path.join(ROOT, "engine");
const SCHEDULE_PATH = path.join(import.meta.dirname, "..", "schedule.json");

const STEPS = [
  { key: "theme", label: "テーマ" },
  { key: "script", label: "台本" },
  { key: "audio", label: "音声" },
  { key: "slides", label: "スライド" },
  { key: "subtitle", label: "字幕" },
  { key: "root", label: "Root登録" },
  { key: "render", label: "レンダリング" },
  { key: "deliverables", label: "成果物" },
  { key: "upload", label: "アップロード" },
];

function hasFilesWithExt(dir, exts) {
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).some((f) => exts.includes(path.extname(f).toLowerCase()));
}

function projectDir(channelId, projectId) {
  const active = path.join(CHANNELS_DIR, channelId, "projects", projectId);
  if (fs.existsSync(active)) return active;
  const archived = path.join(CHANNELS_DIR, channelId, "projects", "_archived", projectId);
  if (fs.existsSync(archived)) return archived;
  return active;
}

export function getWorkflowStatus(channelId, projectId) {
  const dir = projectDir(channelId, projectId);
  const completed = new Array(9).fill(false);

  // 1. テーマ: meta.json exists
  completed[0] = fs.existsSync(path.join(dir, "meta.json"));

  // 2. 台本: script/script.md exists
  completed[1] = fs.existsSync(path.join(dir, "script", "script.md"));

  // 3. 音声: audio/*.wav exists
  completed[2] = hasFilesWithExt(path.join(dir, "audio"), [".wav", ".mp3"]);

  // 4. スライド: remotion/scenes/SlideScenes.tsx exists
  completed[3] = fs.existsSync(path.join(dir, "remotion", "scenes", "SlideScenes.tsx"));

  // 5. 字幕: remotion/subtitleData.ts exists
  completed[4] = fs.existsSync(path.join(dir, "remotion", "subtitleData.ts"));

  // 6. Root登録: engine/src/Root.tsx contains import for this project
  try {
    const rootTsx = fs.readFileSync(path.join(ENGINE_DIR, "src", "Root.tsx"), "utf-8");
    completed[5] = rootTsx.includes(`/${projectId}/remotion/VideoWithSlides`);
  } catch {
    completed[5] = false;
  }

  // 7. レンダリング: deliverables/*.mp4 exists
  completed[6] = hasFilesWithExt(path.join(dir, "deliverables"), [".mp4"]);

  // 8. 成果物: deliverables/概要欄.md exists
  completed[7] = fs.existsSync(path.join(dir, "deliverables", "概要欄.md"));

  // 9. アップロード: schedule.json has videoId
  try {
    const schedule = JSON.parse(fs.readFileSync(SCHEDULE_PATH, "utf-8"));
    const entry = schedule[`${channelId}/${projectId}`];
    completed[8] = !!(entry && entry.videoId);
  } catch {
    completed[8] = false;
  }

  // Current step = first incomplete step
  const currentStep = completed.indexOf(false);

  return {
    steps: STEPS.map((s, i) => ({ ...s, completed: completed[i] })),
    currentStep: currentStep === -1 ? 9 : currentStep,
    totalSteps: 9,
  };
}

export { STEPS };
