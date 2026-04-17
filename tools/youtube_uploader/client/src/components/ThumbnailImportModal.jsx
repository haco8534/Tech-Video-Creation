import { useState, useEffect, useRef, useCallback } from "react";
import { CheckIcon, ImageIcon } from "../icons";
import { fetchThumbnailCandidates, importThumbnails } from "../api";
import { useToast } from "./ToastContext";

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ThumbnailImportModal({ channelId, onClose, onComplete }) {
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]); // { id, file, preview, assignedTo: null | projectId }
  const [candidates, setCandidates] = useState([]); // projects
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState(null);
  const [dragOverZone, setDragOverZone] = useState(false);
  const [dragOverProject, setDragOverProject] = useState(null);
  const [draggingFileId, setDraggingFileId] = useState(null);
  const [selectingFileId, setSelectingFileId] = useState(null);

  useEffect(() => {
    fetchThumbnailCandidates(channelId || "__all__").then((data) => {
      setCandidates(data.candidates || []);
    });
  }, [channelId]);

  const addFiles = useCallback((newFiles) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    const imageFiles = Array.from(newFiles).filter((f) =>
      allowed.some((ext) => f.name.toLowerCase().endsWith(ext))
    );
    const entries = imageFiles.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      preview: URL.createObjectURL(f),
      assignedTo: null,
    }));
    setFiles((prev) => [...prev, ...entries]);
  }, []);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
  }, []);

  function handleDrop(e) {
    e.preventDefault();
    setDragOverZone(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOverZone(true);
  }

  function assign(fileId, projectId) {
    setFiles((prev) => prev.map((f) => {
      // Unassign any other file from this project
      if (f.assignedTo === projectId && f.id !== fileId) return { ...f, assignedTo: null };
      if (f.id === fileId) return { ...f, assignedTo: projectId };
      return f;
    }));
    setSelectingFileId(null);
  }

  function unassign(fileId) {
    setFiles((prev) => prev.map((f) => f.id === fileId ? { ...f, assignedTo: null } : f));
  }

  function removeFile(fileId) {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === fileId);
      if (f) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== fileId);
    });
  }

  // Drag from image grid to project
  function handleImageDragStart(e, fileId) {
    setDraggingFileId(fileId);
    e.dataTransfer.setData("text/plain", fileId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleProjectDrop(e, projectId) {
    e.preventDefault();
    e.stopPropagation();
    setDragOverProject(null);
    const fileId = e.dataTransfer.getData("text/plain");
    if (fileId && files.some((f) => f.id === fileId)) {
      assign(fileId, projectId);
    }
    setDraggingFileId(null);
  }

  function handleProjectDragOver(e, projectId) {
    e.preventDefault();
    e.stopPropagation();
    setDragOverProject(projectId);
  }

  const assigned = files.filter((f) => f.assignedTo);
  const unassigned = files.filter((f) => !f.assignedTo);
  const assignedCount = assigned.length;

  async function handleImport() {
    if (assignedCount === 0) return;
    setImporting(true);
    const fd = new FormData();
    const assignments = {};
    for (const f of assigned) {
      fd.append("images", f.file, f.file.name);
      const proj = candidates.find((c) => c.projectId === f.assignedTo);
      if (proj) {
        assignments[f.file.name] = { channelId: proj.channelId, projectId: proj.projectId };
      }
    }
    fd.append("assignments", JSON.stringify(assignments));

    try {
      const data = await importThumbnails(fd);
      setResults(data.results);
      const ok = data.results.filter((r) => r.success).length;
      const fail = data.results.filter((r) => !r.success).length;
      if (fail > 0) {
        toast(`${ok}件成功、${fail}件失敗`, "error");
      } else {
        toast(`${ok}件のサムネイルを取り込みました`, "success");
      }
    } catch (err) {
      toast(`エラー: ${err.message}`, "error");
    } finally {
      setImporting(false);
    }
  }

  // Projects grouped: assigned first, then without thumbnail, then with thumbnail
  const projectsWithAssignment = candidates.map((c) => {
    const assignedFile = files.find((f) => f.assignedTo === c.projectId);
    return { ...c, assignedFile };
  });

  if (results) {
    return (
      <div className="ti-overlay" onClick={onClose}>
        <div className="ti-modal ti-modal-sm" onClick={(e) => e.stopPropagation()}>
          <div className="ti-header">
            <h2>取り込み完了</h2>
          </div>
          <div className="ti-results">
            {results.map((r, i) => (
              <div key={i} className={`ti-result-row ${r.success ? "success" : "fail"}`}>
                <span className="ti-result-icon">{r.success ? <CheckIcon /> : "!"}</span>
                <span className="ti-result-name">{r.projectId}</span>
                {r.success && (
                  <span className="ti-result-size">
                    {formatSize(r.originalSize)} → {formatSize(r.newSize)}
                  </span>
                )}
                {!r.success && <span className="ti-result-error">{r.error}</span>}
              </div>
            ))}
          </div>
          <div className="ti-footer">
            <button className="btn btn-primary" onClick={() => { onComplete(); onClose(); }}>
              閉じる
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ti-overlay" onClick={onClose}>
      <div className="ti-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ti-header">
          <h2>サムネイル一括取り込み</h2>
          <button className="ti-close" onClick={onClose}>&times;</button>
        </div>

        {/* ドロップゾーン */}
        <div
          className={`ti-dropzone ${dragOverZone ? "active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragOverZone(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon width="28" height="28" />
          <p>画像をドラッグ＆ドロップ、またはクリックして選択</p>
          <span className="ti-dropzone-hint">JPG / PNG / WebP</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            multiple
            hidden
            onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
          />
        </div>

        {/* メイン: 2カラム */}
        <div className="ti-body">
          {/* 左: 未割り当て画像 */}
          <div className="ti-col-images">
            <div className="ti-col-title">画像 ({files.length})</div>
            {unassigned.length === 0 && files.length === 0 && (
              <div className="ti-empty">画像をドロップしてください</div>
            )}
            {unassigned.length === 0 && files.length > 0 && (
              <div className="ti-empty">全て割り当て済み</div>
            )}
            <div className="ti-image-grid">
              {unassigned.map((f) => (
                <div
                  key={f.id}
                  className={`ti-image-card ${selectingFileId === f.id ? "selecting" : ""}`}
                  draggable
                  onDragStart={(e) => handleImageDragStart(e, f.id)}
                  onDragEnd={() => setDraggingFileId(null)}
                >
                  <img src={f.preview} alt={f.file.name} />
                  <div className="ti-image-info">
                    <span className="ti-image-name" title={f.file.name}>
                      {f.file.name.length > 18 ? f.file.name.slice(0, 15) + "..." : f.file.name}
                    </span>
                    <span className="ti-image-size">{formatSize(f.file.size)}</span>
                  </div>
                  <div className="ti-image-actions">
                    <button
                      className="btn btn-xs btn-ghost"
                      title="プロジェクトに割り当て"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectingFileId(selectingFileId === f.id ? null : f.id);
                      }}
                    >
                      割り当て
                    </button>
                    <button className="btn btn-xs btn-ghost ti-remove" onClick={() => removeFile(f.id)} title="削除">
                      &times;
                    </button>
                  </div>
                  {/* クリック割り当て: プロジェクト選択ドロップダウン */}
                  {selectingFileId === f.id && (
                    <div className="ti-assign-dropdown">
                      {projectsWithAssignment
                        .filter((p) => !p.assignedFile)
                        .map((p) => (
                          <button key={p.projectId} className="ti-assign-option" onClick={() => assign(f.id, p.projectId)}>
                            {p.hasThumbnail && <span className="ti-has-thumb" title="既存サムネあり">●</span>}
                            {p.title}
                          </button>
                        ))}
                      {projectsWithAssignment.filter((p) => !p.assignedFile).length === 0 && (
                        <div className="ti-assign-empty">割り当て可能なプロジェクトがありません</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 右: プロジェクト一覧 */}
          <div className="ti-col-projects">
            <div className="ti-col-title">プロジェクト ({candidates.length})</div>
            <div className="ti-project-list">
              {projectsWithAssignment.map((p) => (
                <div
                  key={p.projectId}
                  className={`ti-project-row ${dragOverProject === p.projectId ? "drag-over" : ""} ${p.assignedFile ? "assigned" : ""}`}
                  onDrop={(e) => handleProjectDrop(e, p.projectId)}
                  onDragOver={(e) => handleProjectDragOver(e, p.projectId)}
                  onDragLeave={() => setDragOverProject(null)}
                >
                  <div className="ti-project-thumb">
                    {p.assignedFile ? (
                      <img src={p.assignedFile.preview} alt="" />
                    ) : p.hasThumbnail ? (
                      <img src={`/api/file?path=${encodeURIComponent(p.thumbnailPath)}`} alt="" className="ti-existing" />
                    ) : (
                      <div className="ti-project-thumb-empty"><ImageIcon /></div>
                    )}
                  </div>
                  <div className="ti-project-info">
                    <div className="ti-project-title">{p.title}</div>
                    {p.hasThumbnail && !p.assignedFile && (
                      <span className="ti-project-badge existing">サムネあり</span>
                    )}
                    {p.assignedFile && (
                      <span className="ti-project-badge new">新規割り当て</span>
                    )}
                    {!p.hasThumbnail && !p.assignedFile && (
                      <span className="ti-project-badge missing">サムネなし</span>
                    )}
                  </div>
                  {p.assignedFile && (
                    <button
                      className="btn btn-xs btn-ghost ti-remove"
                      onClick={() => unassign(p.assignedFile.id)}
                      title="割り当て解除"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              {candidates.length === 0 && (
                <div className="ti-empty">プロジェクトがありません</div>
              )}
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="ti-footer">
          <button className="btn btn-ghost" onClick={onClose}>キャンセル</button>
          <button
            className="btn btn-primary"
            disabled={assignedCount === 0 || importing}
            onClick={handleImport}
          >
            {importing ? (
              <><span className="upload-spinner" /> 取り込み中...</>
            ) : (
              `${assignedCount}件を取り込む`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
