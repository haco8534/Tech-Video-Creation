import { CheckIcon, FilmIcon } from "../icons";

export default function ThemeCardGrid({
  themes, selectedIds, onToggleSelect,
  onRegister, registering, registeredThemes,
  onNavigateToProduction,
}) {
  const hasRegistered = registeredThemes.length > 0;

  return (
    <div className="theme-cards-section">
      <div className="theme-cards-header">
        <h3>テーマ候補 ({themes.length}件)</h3>
        {!hasRegistered && selectedIds.size > 0 && (
          <button
            className="btn btn-primary"
            onClick={onRegister}
            disabled={registering}
          >
            {registering ? (
              <><span className="upload-spinner" /> 登録中...</>
            ) : (
              <>{selectedIds.size}件を登録</>
            )}
          </button>
        )}
      </div>

      <div className="theme-card-grid">
        {themes.map((theme, i) => {
          const isSelected = selectedIds.has(i);
          const registered = registeredThemes.find((r) => r.title === theme.title);

          return (
            <div
              key={i}
              className={`theme-card ${isSelected ? "selected" : ""} ${registered ? "registered" : ""}`}
              onClick={() => !hasRegistered && onToggleSelect(i)}
            >
              <div className="theme-card-top">
                {!hasRegistered && (
                  <div className={`theme-card-check ${isSelected ? "checked" : ""}`}>
                    {isSelected && <CheckIcon />}
                  </div>
                )}
                {registered && (
                  <span className="theme-card-badge">
                    <CheckIcon /> 登録済み
                  </span>
                )}
                {theme.score != null && (
                  <span className="theme-card-score">{theme.score}点</span>
                )}
              </div>
              <h4 className="theme-card-title">{theme.title}</h4>
              <p className="theme-card-desc">{theme.description}</p>
              {registered && (
                <button
                  className="btn btn-sm btn-primary theme-card-goto"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToProduction(theme);
                  }}
                >
                  <FilmIcon /> 動画作成へ
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
