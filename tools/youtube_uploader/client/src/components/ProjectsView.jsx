import { useState, useEffect } from "react";
import {
  CheckIcon, UploadIcon, AlertIcon, ExternalIcon, EditIcon, ResetIcon,
  FilmIcon, ImageIcon, FileTextIcon, RefreshIcon, ClockIcon,
} from "../icons";
import { useToast } from "./ToastContext";
import { uploadVideo, resetStatus, fetchChannels, fetchYouTubeVideos, linkVideo } from "../api";
import { formatPublishLabel, getChannelColor, formatShortDate } from "../utils";
import UploadPopover from "./UploadPopover";

export default function ProjectsView({ channels, activeChannel, onDataUpdate, onEditProject }) {
  const toast = useToast();
  const [uploadingIds, setUploadingIds] = useState(new Set());
  const [editOverrides, setEditOverrides] = useState({});
  const [ytVideos, setYtVideos] = useState({});
  const [syncing, setSyncing] = useState(false);
  const [linkingKey, setLinkingKey] = useState(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // 認証済みチャンネルを初回ロード時に自動取得
  useEffect(() => {
    if (initialLoaded || channels.length === 0) return;
    const authedChannels = channels.filter((c) => c.auth?.isAuthenticated);
    if (authedChannels.length === 0) { setInitialLoaded(true); return; }
    setInitialLoaded(true);
    (async () => {
      setSyncing(true);
      const results = {};
      for (const ch of authedChannels) {
        try {
          const res = await fetchYouTubeVideos(ch.id);
          if (!res.error) results[ch.id] = res.videos;
        } catch {}
      }
      setYtVideos(results);
      setSyncing(false);
    })();
  }, [channels, initialLoaded]);

  const allProjects = activeChannel === "__all__"
    ? channels.flatMap((c) => c.projects)
    : channels.find((c) => c.id === activeChannel)?.projects || [];

  const linkedVideoIds = new Set(
    allProjects.filter((p) => p.schedule?.videoId).map((p) => p.schedule.videoId)
  );

  // プロジェクトとYouTube動画のマッピング（videoId → project）
  const videoToProject = {};
  for (const p of allProjects) {
    if (p.schedule?.videoId) videoToProject[p.schedule.videoId] = p;
  }

  function findConflict(project) {
    if (project.schedule?.videoId) return null;
    const chVideos = ytVideos[project.channelId] || [];
    return chVideos.find((v) =>
      v.title === project.title && !linkedVideoIds.has(v.videoId)
    ) || null;
  }

  // YouTube動画一覧（チャンネルフィルター適用、時系列順）
  const filteredYtVideos = (activeChannel === "__all__"
    ? Object.entries(ytVideos).flatMap(([chId, vids]) => vids.map((v) => ({ ...v, channelId: chId })))
    : (ytVideos[activeChannel] || []).map((v) => ({ ...v, channelId: activeChannel }))
  ).sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  // ローカルプロジェクトのステータス別
  const ready = allProjects.filter((p) => !p.schedule?.videoId && p.hasVideo);
  const drafts = allProjects.filter((p) => !p.schedule?.videoId && !p.hasVideo);
  const conflicts = allProjects.filter((p) => findConflict(p));

  function rowKey(p) { return `${p.channelId}/${p.id}`; }

  async function handleSync() {
    setSyncing(true);
    toast("YouTubeから動画一覧を取得中...", "success");
    try {
      const channelIds = activeChannel === "__all__"
        ? channels.filter((c) => c.auth?.isAuthenticated).map((c) => c.id)
        : [activeChannel];
      const results = {};
      for (const chId of channelIds) {
        const res = await fetchYouTubeVideos(chId);
        if (res.error) { toast(`${chId}: ${res.error}`, "error"); continue; }
        results[chId] = res.videos;
      }
      setYtVideos((prev) => ({ ...prev, ...results }));
      const total = Object.values(results).reduce((a, v) => a + v.length, 0);
      toast(`${total}件の動画を取得しました`, "success");
    } catch (e) {
      toast(`エラー: ${e.message}`, "error");
    } finally {
      setSyncing(false);
    }
  }

  async function handleLink(project, videoId) {
    const key = rowKey(project);
    setLinkingKey(key);
    try {
      await linkVideo(project.channelId, project.id, videoId);
      toast(`「${project.title}」をリンクしました`, "success");
      const data = await fetchChannels();
      onDataUpdate(data.channels);
    } catch (e) {
      toast(`エラー: ${e.message}`, "error");
    } finally {
      setLinkingKey(null);
    }
  }

  async function handleUpload(project, publishAt) {
    const key = rowKey(project);
    const label = formatPublishLabel(publishAt);
    if (!confirm(`「${project.title}」を${label}でアップロードしますか？`)) return;
    const overrides = editOverrides[key] || {};
    setUploadingIds((prev) => new Set(prev).add(key));
    try {
      const res = await uploadVideo({
        channelId: project.channelId, projectId: project.id, publishAt,
        customTitle: overrides.title, customDescription: overrides.description,
      });
      if (res.error) throw new Error(res.error);
      toast(`アップロード完了: ${res.videoId}`, "success");
      const data = await fetchChannels();
      onDataUpdate(data.channels);
    } catch (e) {
      toast(`エラー: ${e.message}`, "error");
    } finally {
      setUploadingIds((prev) => { const n = new Set(prev); n.delete(key); return n; });
      setEditOverrides((prev) => { const n = { ...prev }; delete n[key]; return n; });
    }
  }

  async function handleReset(project) {
    if (!confirm(`「${project.title}」の投稿済みステータスをリセットしますか？`)) return;
    await resetStatus(project.channelId, project.id);
    toast("ステータスをリセットしました", "success");
    const data = await fetchChannels();
    onDataUpdate(data.channels);
  }

  function handleEditSave(project, overrides) {
    setEditOverrides((prev) => ({ ...prev, [rowKey(project)]: overrides }));
  }

  return (
    <div className="dashboard">
      {/* サマリーカード */}
      <div className="dash-summary">
        <div className="summary-card">
          <div className="summary-icon published"><CheckIcon /></div>
          <div className="summary-body">
            <div className="summary-value">{filteredYtVideos.length}</div>
            <div className="summary-label">公開済み</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon ready"><UploadIcon /></div>
          <div className="summary-body">
            <div className="summary-value">{ready.length}</div>
            <div className="summary-label">準備完了</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon draft"><FilmIcon /></div>
          <div className="summary-body">
            <div className="summary-value">{drafts.length}</div>
            <div className="summary-label">制作中</div>
          </div>
        </div>
        {conflicts.length > 0 && (
          <div className="summary-card">
            <div className="summary-icon conflict"><AlertIcon /></div>
            <div className="summary-body">
              <div className="summary-value">{conflicts.length}</div>
              <div className="summary-label">要確認</div>
            </div>
          </div>
        )}
      </div>

      {/* 要確認セクション */}
      {conflicts.length > 0 && (
        <DashSection title="要確認" icon={<AlertIcon />} accent="conflict" count={conflicts.length}>
          <div className="dash-list">
            {conflicts.map((p) => (
              <LocalProjectRow
                key={rowKey(p)}
                project={p}
                conflict={findConflict(p)}
                uploading={uploadingIds.has(rowKey(p))}
                linking={linkingKey === rowKey(p)}
                onUpload={handleUpload}
                onReset={handleReset}
                onEdit={(proj) => onEditProject(proj, (o) => handleEditSave(proj, o))}
                onLink={handleLink}
              />
            ))}
          </div>
        </DashSection>
      )}

      {/* 準備完了セクション */}
      {ready.length > 0 && (
        <DashSection title="準備完了" icon={<UploadIcon />} accent="ready" count={ready.length}>
          <div className="dash-list">
            {ready.map((p) => (
              <LocalProjectRow
                key={rowKey(p)}
                project={p}
                conflict={null}
                uploading={uploadingIds.has(rowKey(p))}
                linking={false}
                onUpload={handleUpload}
                onReset={handleReset}
                onEdit={(proj) => onEditProject(proj, (o) => handleEditSave(proj, o))}
                onLink={handleLink}
              />
            ))}
          </div>
        </DashSection>
      )}

      {/* 公開済み動画（YouTube）— メインセクション */}
      <DashSection
        title="公開済み"
        icon={<CheckIcon />}
        accent="published"
        count={filteredYtVideos.length}
        action={
          <button className="btn btn-sm btn-ghost" onClick={handleSync} disabled={syncing}>
            <RefreshIcon /> {syncing ? "同期中..." : "再取得"}
          </button>
        }
      >
        {syncing && filteredYtVideos.length === 0 ? (
          <div className="dash-empty"><span className="upload-spinner" /> YouTubeから取得中...</div>
        ) : filteredYtVideos.length > 0 ? (
          <div className="dash-list">
            {filteredYtVideos.map((v) => {
              const linkedProject = videoToProject[v.videoId];
              return (
                <div key={v.videoId} className="dash-row">
                  <div className="dash-row-thumb">
                    {v.thumbnailUrl
                      ? <img src={v.thumbnailUrl} />
                      : <div className="dash-row-thumb-none"><ImageIcon /></div>
                    }
                  </div>
                  <div className="dash-row-body">
                    <div className="dash-row-title">{v.title}</div>
                    <div className="dash-row-meta">
                      <ChannelBadge channelId={v.channelId} />
                      <span className="dash-row-date"><ClockIcon /> {formatShortDate(v.publishedAt)}</span>
                      {linkedProject && (
                        <span className="dash-row-linked"><CheckIcon /> ローカル紐付け済</span>
                      )}
                    </div>
                  </div>
                  <div className="dash-row-actions">
                    <a href={`https://youtube.com/watch?v=${v.videoId}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost">
                      <ExternalIcon />
                    </a>
                    {linkedProject && (
                      <button className="btn btn-sm btn-danger" onClick={() => handleReset(linkedProject)}>
                        <ResetIcon />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="dash-empty">
            {channels.some((c) => c.auth?.isAuthenticated)
              ? "動画が見つかりませんでした"
              : "チャンネルを認証すると動画一覧が表示されます"}
          </div>
        )}
      </DashSection>

      {/* 制作中セクション */}
      {drafts.length > 0 && (
        <DashSection title="制作中" icon={<FilmIcon />} accent="draft" count={drafts.length}>
          <div className="dash-list">
            {drafts.map((p) => (
              <LocalProjectRow
                key={rowKey(p)}
                project={p}
                conflict={null}
                uploading={false}
                linking={false}
                onUpload={handleUpload}
                onReset={handleReset}
                onEdit={(proj) => onEditProject(proj, (o) => handleEditSave(proj, o))}
                onLink={handleLink}
              />
            ))}
          </div>
        </DashSection>
      )}
    </div>
  );
}

function DashSection({ title, icon, accent, count, action, children }) {
  return (
    <section className="dash-section">
      <div className="dash-section-header">
        <div className="dash-section-title">
          <span className={`dash-section-icon ${accent}`}>{icon}</span>
          <h3>{title}</h3>
          <span className="dash-section-count">{count}</span>
        </div>
        {action && <div className="dash-section-action">{action}</div>}
      </div>
      {children}
    </section>
  );
}

function ChannelBadge({ channelId }) {
  const c = getChannelColor(channelId);
  return (
    <span className="channel-badge" style={{ background: c.bg, color: c.text }}>
      <span className="channel-dot" style={{ background: c.dot }} />
      {channelId}
    </span>
  );
}

function LocalProjectRow({ project: p, conflict, uploading, linking, onUpload, onReset, onEdit, onLink }) {
  const uploaded = !!p.schedule?.videoId;

  let statusBadge;
  if (conflict) {
    statusBadge = <span className="status-pill conflict"><AlertIcon /> 要確認</span>;
  } else if (uploaded) {
    statusBadge = <span className="status-pill published"><CheckIcon /> 公開済み</span>;
  } else if (p.hasVideo) {
    statusBadge = <span className="status-pill ready"><UploadIcon /> 準備完了</span>;
  } else {
    statusBadge = <span className="status-pill draft"><FilmIcon /> 制作中</span>;
  }

  let dateStr = "";
  if (p.schedule?.uploadedAt) {
    dateStr = formatShortDate(p.schedule.uploadedAt);
  } else if (p.schedule?.publishAt) {
    dateStr = formatShortDate(p.schedule.publishAt) + " 予約";
  }

  const assets = [
    p.hasVideo && <FilmIcon key="v" />,
    p.hasThumbnail && <ImageIcon key="t" />,
    p.hasDescription && <FileTextIcon key="d" />,
  ].filter(Boolean);

  let actions;
  if (uploading) {
    actions = <div className="card-uploading"><span className="upload-spinner" /> 投稿中...</div>;
  } else if (linking) {
    actions = <div className="card-uploading"><span className="upload-spinner" /> リンク中...</div>;
  } else if (conflict) {
    actions = (
      <button className="btn btn-sm btn-warning" onClick={() => onLink(p, conflict.videoId)}>
        リンクする
      </button>
    );
  } else if (uploaded) {
    actions = (
      <>
        <a href={`https://youtube.com/watch?v=${p.schedule.videoId}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost">
          <ExternalIcon />
        </a>
        <button className="btn btn-sm btn-danger" onClick={() => onReset(p)}>
          <ResetIcon />
        </button>
      </>
    );
  } else if (p.hasVideo) {
    actions = (
      <>
        <UploadPopover onSelect={(publishAt) => onUpload(p, publishAt)} />
        {p.hasDescription && (
          <button className="btn btn-sm btn-ghost" onClick={() => onEdit(p)}>
            <EditIcon />
          </button>
        )}
      </>
    );
  }

  return (
    <div className={`dash-row ${uploading ? "dash-row-uploading" : ""} ${conflict ? "dash-row-conflict" : ""}`}>
      <div className="dash-row-thumb">
        {p.hasThumbnail
          ? <img src={`/api/file?path=${encodeURIComponent(p.thumbnailPath)}`} loading="lazy" />
          : <div className="dash-row-thumb-none"><ImageIcon /></div>
        }
      </div>
      <div className="dash-row-body">
        <div className="dash-row-title">{p.title}</div>
        <div className="dash-row-meta">
          <ChannelBadge channelId={p.channelId} />
          {dateStr && <span className="dash-row-date"><ClockIcon /> {dateStr}</span>}
          {statusBadge}
        </div>
        <div className="dash-row-assets">{assets}</div>
      </div>
      {actions && <div className="dash-row-actions">{actions}</div>}
    </div>
  );
}
