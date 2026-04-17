import { useState, useEffect } from "react";
import { getRemotionStudioStatus, startRemotionStudio } from "../api";
import { MonitorIcon, RefreshIcon, PlayIcon } from "../icons";

const STUDIO_PORT = 3848;

export default function RemotionPreview({ projectId }) {
  const [studioRunning, setStudioRunning] = useState(false);
  const [starting, setStarting] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    getRemotionStudioStatus().then((s) => setStudioRunning(s.running));
  }, []);

  // projectId が変わったら iframe をリロード
  useEffect(() => {
    if (studioRunning) {
      setIframeKey((k) => k + 1);
    }
  }, [projectId]);

  async function handleStart() {
    setStarting(true);
    try {
      await startRemotionStudio();
      setStudioRunning(true);
    } catch {
      // ignore
    } finally {
      setStarting(false);
    }
  }

  const compositionId = projectId.replace(/_/g, "-") + "-slides";
  const studioUrl = `http://localhost:${STUDIO_PORT}/${compositionId}`;

  return (
    <div className="remotion-preview">
      <div className="remotion-header">
        <MonitorIcon />
        <span>Remotion Studio</span>
        <span className="remotion-comp-id">{compositionId}</span>
        <div className="remotion-actions">
          {studioRunning && (
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setIframeKey((k) => k + 1)}
              title="リロード"
            >
              <RefreshIcon />
            </button>
          )}
          {!studioRunning && (
            <button
              className="btn btn-sm btn-primary"
              onClick={handleStart}
              disabled={starting}
            >
              {starting ? <><span className="upload-spinner" /> 起動中...</> : <><PlayIcon /> Studio起動</>}
            </button>
          )}
        </div>
      </div>

      <div className="remotion-frame-wrapper">
        {studioRunning ? (
          <iframe
            key={`${compositionId}-${iframeKey}`}
            className="remotion-iframe"
            src={studioUrl}
            title="Remotion Studio"
          />
        ) : (
          <div className="remotion-placeholder">
            <MonitorIcon width="32" height="32" />
            <p>Remotion Studioを起動してプレビュー</p>
          </div>
        )}
      </div>
    </div>
  );
}
