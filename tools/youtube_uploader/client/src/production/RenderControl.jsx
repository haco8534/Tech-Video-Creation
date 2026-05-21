import { useState, useEffect, useCallback } from "react";
import { getSharedWs, addProjectListener, removeProjectListener } from "../lib/sharedWs";
import { PlayIcon, StopIcon, UploadIcon, CheckIcon } from "../icons";
import UploadPopover from "../components/UploadPopover";
import { uploadVideo, deleteRender, deleteThumbnail } from "../api";
import { useToast } from "../components/ToastContext";

export default function RenderControl({ channelId, projectId, hasVideo, hasThumbnail, onAssetChange }) {
  const toast = useToast();
  const key = `${channelId}/${projectId}`;
  const [rendering, setRendering] = useState(false);
  const [queued, setQueued] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [progress, setProgress] = useState(null);
  const [lastLog, setLastLog] = useState("");
  const [renderComplete, setRenderComplete] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handler = useCallback((msg) => {
    switch (msg.type) {
      case "render-status":
        setRendering(msg.rendering);
        setQueued(msg.queued);
        setQueuePosition(msg.queuePosition || 0);
        if (msg.progress) setProgress(msg.progress);
        break;
      case "render-start":
        setRendering(true);
        setQueued(false);
        setProgress(null);
        setLastLog("");
        setRenderComplete(false);
        break;
      case "render-queued":
        setQueued(true);
        setQueuePosition(msg.position);
        break;
      case "render-progress":
        setProgress({ current: msg.current, total: msg.total, percent: msg.percent });
        break;
      case "render-log":
        if (msg.text) setLastLog(msg.text);
        break;
      case "render-complete":
        setRendering(false);
        setLastLog("");
        setRenderComplete(msg.success);
        if (msg.success) {
          toast("レンダリング完了", "success");
        } else {
          toast("レンダリング失敗", "error");
        }
        break;
      case "render-cancelled":
        setRendering(false);
        setQueued(false);
        setLastLog("");
        break;
    }
  }, [toast]);

  useEffect(() => {
    addProjectListener(key, handler);
    return () => removeProjectListener(key, handler);
  }, [key, handler]);

  async function handleStartRender() {
    const ws = await getSharedWs();
    ws.send(JSON.stringify({
      action: "start-render",
      channelId,
      projectId,
    }));
  }

  async function handleCancelRender() {
    const ws = await getSharedWs();
    ws.send(JSON.stringify({
      action: "cancel-render",
      channelId,
      projectId,
    }));
  }

  async function handleDeleteRender() {
    if (!confirm("レンダリング済み動画（MP4）を削除しますか？\n\n- deliverables/*.mp4\n- engine/output/{comp}*.mp4\n\n再レンダリングで上書き可能です。")) return;
    try {
      const res = await deleteRender(channelId, projectId);
      if (res.error) throw new Error(res.error);
      toast(`動画を削除しました (${res.removed.length}件)`, "success");
      setRenderComplete(false);
      onAssetChange && onAssetChange();
    } catch (err) {
      toast(`削除エラー: ${err.message}`, "error");
    }
  }

  async function handleDeleteThumbnail() {
    if (!confirm("サムネイル画像を削除しますか？\n\ndeliverables/ 内の全画像ファイル（バックアップ含む）が削除されます。")) return;
    try {
      const res = await deleteThumbnail(channelId, projectId);
      if (res.error) throw new Error(res.error);
      toast(`サムネを削除しました (${res.removed.length}件)`, "success");
      onAssetChange && onAssetChange();
    } catch (err) {
      toast(`削除エラー: ${err.message}`, "error");
    }
  }

  async function handleUpload(publishAt) {
    setUploading(true);
    try {
      const res = await uploadVideo({ channelId, projectId, publishAt });
      if (res.error) throw new Error(res.error);
      toast(`アップロード完了: ${res.videoId}`, "success");
    } catch (err) {
      toast(`エラー: ${err.message}`, "error");
    } finally {
      setUploading(false);
    }
  }

  const isActive = rendering || queued;

  return (
    <div className="render-control">
      <div className="render-header">
        <span>レンダリング & アップロード</span>
      </div>

      <div className="render-body">
        {/* Render section */}
        <div className="render-row">
          {!isActive ? (
            <button className="btn btn-primary" onClick={handleStartRender}>
              <PlayIcon /> レンダリング開始
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleCancelRender}>
              <StopIcon /> キャンセル
            </button>
          )}
        </div>

        {/* Queue info */}
        {queued && (
          <div className="render-progress">
            <span className="render-progress-text">
              キュー待ち (#{queuePosition})
            </span>
          </div>
        )}

        {/* Progress bar */}
        {(rendering || progress) && !queued && (
          <div className="render-progress">
            <div className="render-progress-bar">
              <div
                className="render-progress-fill"
                style={{ width: `${progress?.percent || 0}%` }}
              />
            </div>
            <span className="render-progress-text">
              {progress
                ? `${progress.current ?? "-"}/${progress.total ?? "-"} frames (${progress.percent}%)`
                : "準備中..."
              }
            </span>
            {lastLog && (
              <span className="render-progress-log" title={lastLog}>{lastLog}</span>
            )}
          </div>
        )}

        {renderComplete && (
          <div className="render-done">
            <CheckIcon /> レンダリング完了
          </div>
        )}

        {/* Asset delete section */}
        {(hasVideo || hasThumbnail) && (
          <div className="render-asset-actions">
            {hasVideo && (
              <button
                className="btn btn-sm btn-ghost"
                onClick={handleDeleteRender}
                title="レンダリング済み動画を削除（再レンダリング用）"
              >
                動画を削除
              </button>
            )}
            {hasThumbnail && (
              <button
                className="btn btn-sm btn-ghost"
                onClick={handleDeleteThumbnail}
                title="サムネイル画像を削除（差し替え用）"
              >
                サムネを削除
              </button>
            )}
          </div>
        )}

        {/* Upload section */}
        <div className="render-upload">
          {uploading ? (
            <div className="render-uploading">
              <span className="upload-spinner" /> アップロード中...
            </div>
          ) : (
            <UploadPopover onSelect={handleUpload} />
          )}
        </div>
      </div>
    </div>
  );
}
