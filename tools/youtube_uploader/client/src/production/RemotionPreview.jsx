import { useState, useEffect, useRef } from "react";
import { getRemotionStudioStatus, startRemotionStudio } from "../api";
import { MonitorIcon, RefreshIcon, PlayIcon } from "../icons";

const STUDIO_PORT = 3848;

const LOGICAL_WIDTH = 1400;
const LOGICAL_HEIGHT = 900;

const MaximizeIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const MinimizeIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export default function RemotionPreview({ projectId }) {
  const [studioRunning, setStudioRunning] = useState(false);
  const [starting, setStarting] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    getRemotionStudioStatus().then((s) => setStudioRunning(s.running));
  }, []);

  useEffect(() => {
    if (studioRunning) {
      setIframeKey((k) => k + 1);
    }
  }, [projectId]);

  // wrapper幅 → scale計算
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === 0 || h === 0) return;
      const sx = w / LOGICAL_WIDTH;
      const sy = h / LOGICAL_HEIGHT;
      // 幅に合わせてscale、ただし1を超えない(デスクトップでは等倍)
      setScale(Math.min(1, Math.min(sx, sy) || sx));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [studioRunning, fullscreen]);

  // fullscreen時にbodyスクロールロック
  useEffect(() => {
    if (fullscreen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [fullscreen]);

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
  const studioUrl = `http://${window.location.hostname}:${STUDIO_PORT}/${compositionId}`;

  // scale=1のときはiframeを100%で敷き詰め、縮小時はロジカルサイズ+transformで拡縮
  const scaled = scale < 1;
  const iframeStyle = scaled
    ? {
        width: `${LOGICAL_WIDTH}px`,
        height: `${LOGICAL_HEIGHT}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }
    : {
        width: "100%",
        height: "100%",
      };

  return (
    <div className={`remotion-preview${fullscreen ? " remotion-preview-fullscreen" : ""}`}>
      <div className="remotion-header">
        <MonitorIcon />
        <span>Remotion Studio</span>
        <span className="remotion-comp-id">{compositionId}</span>
        <div className="remotion-actions">
          {studioRunning && (
            <>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setIframeKey((k) => k + 1)}
                title="リロード"
              >
                <RefreshIcon />
              </button>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setFullscreen((v) => !v)}
                title={fullscreen ? "通常表示" : "全画面"}
              >
                {fullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
              </button>
            </>
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

      <div className="remotion-frame-wrapper" ref={wrapperRef}>
        {studioRunning ? (
          <iframe
            key={`${compositionId}-${iframeKey}`}
            className="remotion-iframe"
            src={studioUrl}
            title="Remotion Studio"
            style={iframeStyle}
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
