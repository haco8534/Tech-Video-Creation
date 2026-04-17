import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const TYPE_COLORS = {
  uploaded: { bg: "#ecfdf5", border: "#86efac", text: "#15803d" },
  scheduled: { bg: "#eff4ff", border: "#93c5fd", text: "#1d4ed8" },
  ready: { bg: "#fefce8", border: "#fde047", text: "#a16207" },
  inProgress: { bg: "#fff7ed", border: "#fdba74", text: "#c2410c" },
};

function getChannelColor(channelId) {
  const colors = [
    { bg: "#eff4ff", text: "#1d4ed8", dot: "#3b82f6" },
    { bg: "#fdf2f8", text: "#be185d", dot: "#ec4899" },
    { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
  ];
  const hash = [...channelId].reduce((a, c) => a + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export default function CalendarGrid({
  year, month, events,
  onPrevMonth, onNextMonth,
  onEventClick, onScheduleUpdate,
}) {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const totalDays = lastDay.getDate();

  // Build day cells
  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push({ day: null, key: `empty-${i}` });
  }
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    const dayEvents = events.filter((e) => e.date && e.date.startsWith(dateStr));
    cells.push({ day: d, dateStr, isToday, events: dayEvents, key: dateStr });
  }

  function handleDrop(e, dateStr) {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      onScheduleUpdate(data.channelId, data.projectId, dateStr + "T09:30:00.000Z");
    } catch {}
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className="cal-container">
      <div className="cal-header">
        <button className="btn btn-sm btn-ghost" onClick={onPrevMonth}><ChevronLeftIcon /></button>
        <h2 className="cal-title">{year}年 {MONTHS[month]}</h2>
        <button className="btn btn-sm btn-ghost" onClick={onNextMonth}><ChevronRightIcon /></button>
      </div>

      <div className="cal-weekdays">
        {WEEKDAYS.map((w) => (
          <div key={w} className="cal-weekday">{w}</div>
        ))}
      </div>

      <div className="cal-grid">
        {cells.map((cell) => (
          <div
            key={cell.key}
            className={`cal-cell ${cell.day ? "" : "cal-cell-empty"} ${cell.isToday ? "cal-cell-today" : ""}`}
            onDrop={(e) => cell.day && handleDrop(e, cell.dateStr)}
            onDragOver={cell.day ? handleDragOver : undefined}
          >
            {cell.day && (
              <>
                <span className="cal-day">{cell.day}</span>
                <div className="cal-events">
                  {cell.events?.map((ev) => {
                    const colors = TYPE_COLORS[ev.type] || TYPE_COLORS.inProgress;
                    return (
                      <div
                        key={`${ev.channelId}/${ev.projectId}`}
                        className="cal-event"
                        style={{ background: colors.bg, borderLeft: `3px solid ${colors.border}`, color: colors.text }}
                        onClick={() => onEventClick(ev)}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", JSON.stringify({
                            channelId: ev.channelId, projectId: ev.projectId,
                          }));
                        }}
                        title={`${ev.title} (${ev.channelName})`}
                      >
                        <span className="cal-event-dot" style={{ background: getChannelColor(ev.channelId).dot }} />
                        <span className="cal-event-title">{ev.title}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Unscheduled projects */}
      <div className="cal-unscheduled">
        <h3>未スケジュール</h3>
        <div className="cal-unscheduled-list">
          {events.filter((e) => !e.date && e.type !== "uploaded" && e.hasVideo && e.hasThumbnail).map((ev) => {
            const chColor = getChannelColor(ev.channelId);
            return (
              <div
                key={`${ev.channelId}/${ev.projectId}`}
                className="cal-unscheduled-item"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", JSON.stringify({
                    channelId: ev.channelId, projectId: ev.projectId,
                  }));
                }}
                onClick={() => onEventClick(ev)}
              >
                <span className="cal-event-dot" style={{ background: chColor.dot }} />
                <span>{ev.title || ev.projectId}</span>
                <span className="cal-step-badge">{ev.currentStep}/{ev.totalSteps}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
