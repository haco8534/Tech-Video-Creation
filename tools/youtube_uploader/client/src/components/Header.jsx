import { useState, useEffect } from "react";
import { CalendarIcon, SparklesIcon, FilmIcon, ImageIcon, SunIcon, MoonIcon } from "../icons";

const TABS = [
  { id: "calendar", label: "カレンダー", icon: <CalendarIcon /> },
  { id: "themes", label: "テーマ作成", icon: <SparklesIcon /> },
  { id: "production", label: "動画作成", icon: <FilmIcon /> },
  { id: "thumbnail", label: "サムネイル", icon: <ImageIcon /> },
];

function getInitialTheme() {
  try {
    const t = localStorage.getItem("theme");
    if (t === "dark" || t === "light") return t;
  } catch (_) {}
  return "light";
}

export default function Header({ activeTab, setActiveTab }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (_) {}
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <header className="header">
      <div className="header-left">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
        <h1>動画プロダクション</h1>
      </div>
      <nav className="header-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`header-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"}
          aria-label="テーマ切替"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>
    </header>
  );
}
