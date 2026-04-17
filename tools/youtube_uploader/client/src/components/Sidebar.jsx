import {
  FilmIcon, CommentIcon, GridIcon, FolderIcon, ReadyIcon, CheckIcon,
} from "../icons";

export default function Sidebar({ channels, comments, view, setView, activeChannel, setActiveChannel }) {
  const allProjects = channels.flatMap((c) => c.projects);
  const activeProjects = allProjects.filter((p) => !p.archived);
  const archivedCount = allProjects.filter((p) => p.archived).length;
  const readyCount = activeProjects.filter((p) => p.hasVideo && !p.schedule?.videoId).length;
  const uploadedCount = allProjects.filter((p) => p.schedule?.videoId).length;
  const commentCount = comments.videos?.reduce((a, v) => a + (v.comments?.length || 0), 0) || 0;

  return (
    <nav className="sidebar">
      <div className="sidebar-section"><h2>Menu</h2></div>
      <NavItem
        active={view === "projects"}
        icon={<FilmIcon />}
        label="動画管理"
        count={allProjects.length}
        onClick={() => setView("projects")}
      />
      <NavItem
        active={view === "comments"}
        icon={<CommentIcon />}
        label="コメント"
        count={commentCount}
        onClick={() => setView("comments")}
      />

      <div className="sidebar-section" style={{ marginTop: 28 }}><h2>Channel</h2></div>
      <NavItem
        active={activeChannel === "__all__"}
        icon={<GridIcon />}
        label="すべて"
        count={allProjects.length}
        onClick={() => { setActiveChannel("__all__"); setView("projects"); }}
      />
      {channels.map((ch) => (
        <NavItem
          key={ch.id}
          active={activeChannel === ch.id}
          icon={<FolderIcon />}
          label={ch.name}
          count={ch.projects.length}
          onClick={() => { setActiveChannel(ch.id); setView("projects"); }}
        />
      ))}

      <div className="sidebar-section" style={{ marginTop: 28 }}><h2>Status</h2></div>
      <div className="sidebar-stats">
        <div className="stat-row"><ReadyIcon /> 準備完了 <span className="stat-val">{readyCount}</span></div>
        <div className="stat-row"><CheckIcon /> 投稿済み <span className="stat-val">{uploadedCount}</span></div>
        <div className="stat-row"><FolderIcon /> アーカイブ <span className="stat-val">{archivedCount}</span></div>
      </div>
    </nav>
  );
}

function NavItem({ active, icon, label, count, onClick }) {
  return (
    <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      {icon} {label}
      <span className="count">{count}</span>
    </div>
  );
}
