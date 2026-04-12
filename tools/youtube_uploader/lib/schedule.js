import fs from "fs";
import path from "path";

const SCHEDULE_PATH = path.join(import.meta.dirname, "..", "schedule.json");

function load() {
  if (!fs.existsSync(SCHEDULE_PATH)) return {};
  return JSON.parse(fs.readFileSync(SCHEDULE_PATH, "utf-8"));
}

function save(data) {
  fs.writeFileSync(SCHEDULE_PATH, JSON.stringify(data, null, 2));
}

// key: "channelId/projectId"
function makeKey(channelId, projectId) {
  return `${channelId}/${projectId}`;
}

export function getSchedule(channelId, projectId) {
  const data = load();
  return data[makeKey(channelId, projectId)] || null;
}

export function getAllSchedules() {
  return load();
}

export function setSchedule(channelId, projectId, { publishAt, videoId, uploadedAt }) {
  const data = load();
  const key = makeKey(channelId, projectId);
  data[key] = {
    channelId,
    projectId,
    publishAt,
    videoId: videoId || null,
    uploadedAt: uploadedAt || null,
    ...data[key],
    ...(videoId ? { videoId } : {}),
    ...(uploadedAt ? { uploadedAt } : {}),
    ...(publishAt ? { publishAt } : {}),
  };
  save(data);
  return data[key];
}

export function markUploaded(channelId, projectId, videoId) {
  const data = load();
  const key = makeKey(channelId, projectId);
  if (!data[key]) {
    data[key] = { channelId, projectId, publishAt: null };
  }
  data[key].videoId = videoId;
  data[key].uploadedAt = new Date().toISOString();
  save(data);
}

export function removeSchedule(channelId, projectId) {
  const data = load();
  delete data[makeKey(channelId, projectId)];
  save(data);
}
