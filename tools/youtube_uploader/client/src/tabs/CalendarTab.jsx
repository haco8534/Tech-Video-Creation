import { useState, useEffect } from "react";
import { fetchCalendar, updateSchedule, bulkUploadScheduled } from "../api";
import CalendarGrid from "../calendar/CalendarGrid";
import { UploadIcon } from "../icons";
import { useToast } from "../components/ToastContext";

export default function CalendarTab({ onNavigateToProduction }) {
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  function loadEvents() {
    fetchCalendar().then((data) => setEvents(data.events || []));
  }

  useEffect(() => {
    loadEvents();
  }, []);

  // スケジュール済み & 未投稿 の件数
  const pendingCount = events.filter(
    (e) => e.type === "scheduled" && e.hasVideo && e.hasThumbnail && e.date && new Date(e.date) > new Date()
  ).length;

  function handlePrevMonth() {
    setCurrentMonth((prev) => {
      const m = prev.month - 1;
      return m < 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: m };
    });
  }

  function handleNextMonth() {
    setCurrentMonth((prev) => {
      const m = prev.month + 1;
      return m > 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: m };
    });
  }

  async function handleScheduleUpdate(channelId, projectId, date) {
    try {
      await updateSchedule(channelId, projectId, date ? new Date(date).toISOString() : null);
      loadEvents();
      toast("スケジュールを更新しました", "success");
    } catch (err) {
      toast(`エラー: ${err.message}`, "error");
    }
  }

  async function handleBulkUpload() {
    if (!confirm(`スケジュール済みの ${pendingCount} 件をYouTubeに一括投稿します。\n\n各動画はスケジュール日時に公開予約（private → 予定日に自動公開）されます。\n\nよろしいですか？`)) return;
    setUploading(true);
    try {
      const res = await bulkUploadScheduled();
      if (res.error) throw new Error(res.error);
      const ok = res.results.filter((r) => r.success).length;
      const fail = res.results.filter((r) => !r.success).length;
      if (fail > 0) {
        toast(`${ok}件投稿完了、${fail}件失敗`, "warn");
      } else if (ok > 0) {
        toast(`${ok}件の投稿が完了しました`, "success");
      } else {
        toast("投稿対象がありませんでした", "info");
      }
      loadEvents();
    } catch (err) {
      toast(`一括投稿エラー: ${err.message}`, "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="cal-tab">
      <div className="cal-actions">
        <button
          className="btn btn-primary"
          disabled={pendingCount === 0 || uploading}
          onClick={handleBulkUpload}
        >
          <UploadIcon />
          {uploading ? "投稿中..." : `一括投稿 (${pendingCount}件)`}
        </button>
      </div>
      <CalendarGrid
        year={currentMonth.year}
        month={currentMonth.month}
        events={events}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onEventClick={(e) => onNavigateToProduction(e.channelId, e.projectId)}
        onScheduleUpdate={handleScheduleUpdate}
      />
    </div>
  );
}
