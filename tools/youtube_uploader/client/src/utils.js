export function toJstIso(date, hour, minute) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return new Date(
    `${y}-${m}-${d}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+09:00`
  ).toISOString();
}

export function formatPublishLabel(publishAt) {
  if (!publishAt) return "即時公開";
  const d = new Date(publishAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target - today) / 86400000);
  const label = diff === 1 ? "明日" : diff === 2 ? "明後日" : "";
  const mo = target.getMonth() + 1;
  const day = target.getDate();
  const dow = ["日", "月", "火", "水", "木", "金", "土"][target.getDay()];
  const dateStr = label ? `${label} (${mo}/${day})` : `${mo}/${day}(${dow})`;
  return `${dateStr} 18:30`;
}

export function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export function num(n) {
  return n == null ? "0" : Number(n).toLocaleString();
}

const CHANNEL_COLORS = {
  tech_explainer: { dot: "#1a73e8", bg: "#e8f0fe", text: "#1a73e8" },
  myth_check:     { dot: "#7b1fa2", bg: "#f3e5f5", text: "#7b1fa2" },
};
const DEFAULT_COLOR = { dot: "#666", bg: "#f5f5f5", text: "#666" };

export function getChannelColor(channelId) {
  return CHANNEL_COLORS[channelId] || DEFAULT_COLOR;
}

export function formatShortDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const m = d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", month: "numeric" });
  const day = d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", day: "numeric" });
  return `${m}/${day}`;
}
