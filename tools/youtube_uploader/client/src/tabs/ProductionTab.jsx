import { useState, useEffect } from "react";
import { fetchChannels, fetchWorkflowStatus, registerThemes, deleteProject, fetchActiveSessions } from "../api";
import WorkflowProgress from "../production/WorkflowProgress";
import ClaudeChat from "../production/ClaudeChat";
import RemotionPreview from "../production/RemotionPreview";
import RenderControl from "../production/RenderControl";
import { useToast } from "../components/ToastContext";
import { FilmIcon, ImageIcon } from "../icons";
import ThumbnailImportModal from "../components/ThumbnailImportModal";

const CHANNEL_ID = "tech_explainer";

const STATUS_COLORS = {
  theme: { bg: "#f5f3ff", border: "#c4b5fd", text: "#7c3aed" },
  scripting: { bg: "#fff7ed", border: "#fdba74", text: "#c2410c" },
  rendering: { bg: "#eff4ff", border: "#93c5fd", text: "#1d4ed8" },
  complete: { bg: "#ecfdf5", border: "#86efac", text: "#15803d" },
  archived: { bg: "#f5f5f5", border: "#d4d4d4", text: "#737373" },
};

export default function ProductionTab({ navigationTarget, onClearNavigation }) {
  const toast = useToast();
  const [channels, setChannels] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [workflow, setWorkflow] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [creating, setCreating] = useState(false);
  const [autoStartProject, setAutoStartProject] = useState(null);
  const [showThumbImport, setShowThumbImport] = useState(false);
  const [activeSessions, setActiveSessions] = useState({});
  const [seenDone, setSeenDone] = useState(new Set()); // チャットを開いて確認済みのプロジェクト

  useEffect(() => {
    loadChannels();
  }, []);

  function loadChannels() {
    fetchChannels().then((data) => {
      setChannels(data.channels || []);
    });
  }

  // セッション状態ポーリング（3秒間隔）
  useEffect(() => {
    function poll() {
      fetchActiveSessions()
        .then((data) => setActiveSessions(data.sessions || {}))
        .catch(() => {});
    }
    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle navigation from other tabs
  useEffect(() => {
    if (navigationTarget) {
      setProjectId(navigationTarget.projectId);
      onClearNavigation();
    }
  }, [navigationTarget]);

  // プロジェクトを開いたら完了チェックを確認済みにする
  useEffect(() => {
    if (projectId) {
      setSeenDone((prev) => new Set(prev).add(`${CHANNEL_ID}/${projectId}`));
    }
  }, [projectId]);

  // Claude が実行開始されたらそのプロジェクトの確認済みをリセット
  useEffect(() => {
    for (const [key, session] of Object.entries(activeSessions)) {
      if (session.claudeRunning) {
        setSeenDone((prev) => {
          if (!prev.has(key)) return prev;
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    }
  }, [activeSessions]);

  // Fetch workflow status with polling
  useEffect(() => {
    if (!projectId) {
      setWorkflow(null);
      return;
    }

    function loadStatus() {
      fetchWorkflowStatus(CHANNEL_ID, projectId).then(setWorkflow).catch(() => {});
    }

    loadStatus();
    const interval = setInterval(loadStatus, 10000);
    return () => clearInterval(interval);
  }, [projectId]);

  const activeChannel = channels.find((c) => c.id === CHANNEL_ID);
  const projects = activeChannel?.projects?.filter((p) => !p.archived && !p.schedule?.uploadedAt) || [];

  async function handleCreateProject(e) {
    e.preventDefault();
    if (!newTitle.trim() || creating) return;
    setCreating(true);
    try {
      const theme = { title: newTitle.trim() };
      if (newNote.trim()) theme.note = newNote.trim();
      const result = await registerThemes(CHANNEL_ID, [theme]);
      const created = result.created?.[0];
      if (created && !created.existed) {
        toast(`「${created.title}」を作成しました`, "success");
        setProjectId(created.id);
        setAutoStartProject({ id: created.id, title: created.title, note: newNote.trim() || null });
        setNewTitle("");
        setNewNote("");
        setShowNewForm(false);
        loadChannels();
      } else if (created?.existed) {
        toast(`「${created.title}」は既に存在します`, "warn");
      }
    } catch (err) {
      toast(`エラー: ${err.message}`, "error");
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteProject(p) {
    const msg = `「${p.title || p.id}」を削除しますか？\n\n以下も同時に削除されます:\n- プロジェクトフォルダ全体\n- Root.tsx の登録\n- engine内の関連ファイル\n- アップロード履歴\n\nこの操作は取り消せません。`;
    if (!confirm(msg)) return;
    try {
      const result = await deleteProject(CHANNEL_ID, p.id);
      if (result.error) throw new Error(result.error);
      toast(`「${p.title || p.id}」を削除しました`, "success");
      if (projectId === p.id) setProjectId("");
      loadChannels();
    } catch (err) {
      toast(`削除エラー: ${err.message}`, "error");
    }
  }

  return (
    <div className="prod-tab">
      <aside className="prod-sidebar">
        <div className="prod-sidebar-header">
          <span className="prod-sidebar-title">プロジェクト</span>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowNewForm(!showNewForm)}
            title="新規プロジェクト"
          >
            +
          </button>
        </div>

        {showNewForm && (
          <form className="prod-new-form" onSubmit={handleCreateProject}>
            <input
              className="prod-new-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="動画タイトルを入力..."
              autoFocus
            />
            <textarea
              className="prod-new-note"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="補足メモ（任意）：方向性、ターゲット層など..."
              rows={2}
            />
            <div className="prod-new-actions">
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={!newTitle.trim() || creating}
              >
                {creating ? <span className="upload-spinner" /> : "作成"}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => { setShowNewForm(false); setNewTitle(""); setNewNote(""); }}
              >
                取消
              </button>
            </div>
          </form>
        )}

        <div className="prod-project-list">
          {projects.map((p) => {
            const colors = STATUS_COLORS[p.status] || STATUS_COLORS.theme;
            const isActive = p.id === projectId;
            const sessionKey = `${CHANNEL_ID}/${p.id}`;
            const session = activeSessions[sessionKey];
            const isClaudeRunning = session?.claudeRunning;
            const isClaudeDone = session?.claudeDone && !isClaudeRunning && !seenDone.has(sessionKey);
            const isRendering = session?.rendering;
            const isRenderQueued = session?.renderQueued;

            return (
              <button
                key={p.id}
                className={`prod-project-item ${isActive ? "active" : ""}`}
                onClick={() => setProjectId(p.id)}
              >
                <div className="prod-project-info">
                  <span className="prod-project-title">{p.title || p.id}</span>
                  <span
                    className="prod-project-status"
                    style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
                  >
                    {p.status || "theme"}
                  </span>
                </div>
                <div className="prod-project-actions">
                  {isClaudeRunning && (
                    <span className="prod-status-indicator claude-running" title="Claude 実行中" />
                  )}
                  {isClaudeDone && (
                    <span className="prod-status-indicator claude-done" title="Claude 完了" />
                  )}
                  {isRendering && (
                    <span
                      className="prod-status-indicator rendering"
                      title={`レンダリング中${session.renderProgress ? ` (${session.renderProgress.percent}%)` : ""}`}
                    />
                  )}
                  {isRenderQueued && (
                    <span className="prod-status-indicator render-queued" title={`レンダリング待ち #${session.renderQueuePosition}`} />
                  )}
                  {p.hasVideo && <span className="prod-asset-dot video" title="動画あり" />}
                  {p.hasThumbnail && <span className="prod-asset-dot thumb" title="サムネあり" />}
                  <button
                    className="prod-delete-btn"
                    title="削除"
                    onClick={(e) => { e.stopPropagation(); handleDeleteProject(p); }}
                  >
                    &times;
                  </button>
                </div>
              </button>
            );
          })}
          {projects.length === 0 && (
            <div className="prod-project-empty">プロジェクトがありません</div>
          )}
        </div>

        <button
          className="btn btn-sm btn-ghost prod-thumb-import-btn"
          onClick={() => setShowThumbImport(true)}
        >
          <ImageIcon /> サムネイル一括取り込み
        </button>
      </aside>

      {showThumbImport && (
        <ThumbnailImportModal
          channelId={CHANNEL_ID}
          onClose={() => setShowThumbImport(false)}
          onComplete={loadChannels}
        />
      )}

      <div className="prod-content">
        {workflow && (
          <div className="prod-topbar">
            <WorkflowProgress workflow={workflow} />
          </div>
        )}

        {!projectId ? (
          <div className="prod-empty">
            <FilmIcon width="40" height="40" />
            <p>左のリストからプロジェクトを選択</p>
            <p className="prod-empty-sub">または「+」で新規作成</p>
          </div>
        ) : (
          <div className="prod-panels">
            <div className="prod-panel-left">
              <ClaudeChat
                channelId={CHANNEL_ID}
                projectId={projectId}
                autoStart={autoStartProject?.id === projectId ? autoStartProject : null}
                onAutoStartDone={() => setAutoStartProject(null)}
              />
            </div>
            <div className="prod-panel-right">
              <RemotionPreview projectId={projectId} />
              <RenderControl
                key={projectId}
                channelId={CHANNEL_ID}
                projectId={projectId}
                hasVideo={projects.find((p) => p.id === projectId)?.hasVideo}
                hasThumbnail={projects.find((p) => p.id === projectId)?.hasThumbnail}
                onAssetChange={loadChannels}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
