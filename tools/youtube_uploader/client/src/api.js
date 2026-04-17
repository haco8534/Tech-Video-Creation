// === REST API ===

async function api(url, opts) {
  const res = await fetch(url, opts);
  return res.json();
}

function postJson(url, body) {
  return api(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Channels
export function fetchChannels() {
  return api("/api/channels");
}

export function authenticate(channelId) {
  return postJson("/api/auth", { channelId });
}

// Upload
export function uploadVideo({ channelId, projectId, publishAt, customTitle, customDescription }) {
  return postJson("/api/upload", {
    channelId, projectId, publishAt,
    customTitle: customTitle || undefined,
    customDescription: customDescription || undefined,
  });
}

// Projects
export function fetchWorkflowStatus(channelId, projectId) {
  return api(`/api/projects/${channelId}/${projectId}/status`);
}

export function deleteProject(channelId, projectId) {
  return api(`/api/projects/${channelId}/${projectId}`, { method: "DELETE" });
}

export function deleteRender(channelId, projectId) {
  return api(`/api/projects/${channelId}/${projectId}/render`, { method: "DELETE" });
}

export function deleteThumbnail(channelId, projectId) {
  return api(`/api/projects/${channelId}/${projectId}/thumbnail`, { method: "DELETE" });
}

// Themes
export function registerThemes(channelId, themes) {
  return postJson("/api/themes/register", { channelId, themes });
}

export function fetchThemeWorkflow(channelId) {
  return api(`/api/themes/workflow/${channelId}`);
}

// Calendar
export function fetchCalendar() {
  return api("/api/calendar");
}

export function updateSchedule(channelId, projectId, publishAt) {
  return postJson("/api/calendar/schedule", { channelId, projectId, publishAt });
}

export function bulkUploadScheduled() {
  return postJson("/api/calendar/bulk-upload", {});
}

// Remotion
export function startRemotionStudio() {
  return postJson("/api/remotion/studio/start", {});
}

export function getRemotionStudioStatus() {
  return api("/api/remotion/studio/status");
}

// Thumbnails
export function fetchThumbnailCandidates(channelId) {
  return api(`/api/thumbnails/candidates?channelId=${channelId}`);
}

export function importThumbnails(formData) {
  return fetch("/api/thumbnails/import", { method: "POST", body: formData }).then((r) => r.json());
}

export function fetchThumbnailPrompts() {
  return api("/api/thumbnails/prompts");
}

// Sessions
export function fetchActiveSessions() {
  return api("/api/sessions/active");
}

// === WebSocket ===

export function createClaudeWs() {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  return new WebSocket(`${protocol}//${location.host}/ws/claude`);
}

export function createRenderWs() {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  return new WebSocket(`${protocol}//${location.host}/ws/render`);
}
