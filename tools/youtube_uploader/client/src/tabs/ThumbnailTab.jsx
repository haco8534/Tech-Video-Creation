import { useState, useEffect, useRef } from "react";
import { fetchChannels, fetchThumbnailCandidates, fetchThumbnailPrompts, createClaudeWs } from "../api";
import { useToast } from "../components/ToastContext";
import { CheckIcon, ImageIcon, StopIcon, SparklesIcon } from "../icons";

const CHANNEL_ID = "tech_explainer";

export default function ThumbnailTab() {
  const toast = useToast();
  const [candidates, setCandidates] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [generating, setGenerating] = useState(false);
  const [promptBlocks, setPromptBlocks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [ws, setWs] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const candData = await fetchThumbnailCandidates(CHANNEL_ID);
      setCandidates(candData.candidates || []);
    } catch {}
    try {
      const promptData = await fetchThumbnailPrompts();
      setPromptBlocks(promptData.blocks || []);
    } catch {}
  }

  // 既にプロンプト生成済みのタイトル
  const existingTitles = new Set(promptBlocks.map((b) => b.title));

  // サムネなしのプロジェクト
  const noThumb = candidates.filter((c) => !c.hasThumbnail);

  function toggleSelect(projectId) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
  }

  function selectAll() {
    setSelectedIds(new Set(noThumb.map((c) => c.projectId)));
  }

  // 選択プロジェクトのタイトル一覧
  const selectedTitles = new Set(
    candidates.filter((c) => selectedIds.has(c.projectId)).map((c) => c.title)
  );

  // 選択プロジェクトに対応する既存プロンプトブロック
  const selectedBlocks = promptBlocks.filter((b) => selectedTitles.has(b.title));

  // --- 区切りの一括コピー用テキスト
  const bulkYaml = selectedBlocks.map((b) => b.raw).join("\n---\n");

  async function handleCopy() {
    if (!bulkYaml) {
      toast("コピーするプロンプトがありません", "error");
      return;
    }
    await navigator.clipboard.writeText(bulkYaml);
    setCopied(true);
    toast(`${selectedBlocks.length}件のプロンプトをコピーしました`, "success");
    setTimeout(() => setCopied(false), 2000);
  }

  function handleGenerate() {
    const titles = candidates
      .filter((c) => selectedIds.has(c.projectId))
      .map((c) => c.title);
    if (titles.length === 0) return;

    setGenerating(true);

    const socket = createClaudeWs();
    setWs(socket);

    socket.onopen = () => {
      socket.send(JSON.stringify({
        action: "start-thumbnail-prompt",
        titles,
      }));
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "session-end") {
        setGenerating(false);
        socket.close();
        // 生成完了後にプロンプトを再読込
        fetchThumbnailPrompts().then((data) => setPromptBlocks(data.blocks || []));
        toast("プロンプト生成完了", "success");
      } else if (msg.type === "claude-error") {
        toast("生成エラー", "error");
      }
    };

    socket.onerror = () => {
      toast("WebSocket接続エラー", "error");
      setGenerating(false);
    };
  }

  function handleStop() {
    if (ws) {
      ws.close();
      setGenerating(false);
    }
  }

  return (
    <div className="thumb-tab">
      <div className="thumb-tab-header">
        <h2>サムネイル画像プロンプト</h2>
        <p className="thumb-tab-desc">
          プロジェクトを選択 → プロンプトをコピー → Chrome拡張で一括生成
        </p>
      </div>

      <div className="thumb-tab-body">
        {/* 左: プロジェクト選択 */}
        <div className="thumb-select-panel">
          <div className="thumb-panel-header">
            <span className="thumb-panel-title">プロジェクト選択</span>
            {noThumb.length > 0 && (
              <button className="btn btn-xs btn-ghost" onClick={selectAll}>
                サムネなしを全選択
              </button>
            )}
          </div>

          <div className="thumb-project-list">
            {candidates.map((c) => {
              const hasPrompt = existingTitles.has(c.title);
              return (
                <label
                  key={c.projectId}
                  className={`thumb-project-row ${selectedIds.has(c.projectId) ? "selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(c.projectId)}
                    onChange={() => toggleSelect(c.projectId)}
                    disabled={generating}
                  />
                  <div className="thumb-project-info">
                    <span className="thumb-project-title">{c.title}</span>
                    <div className="thumb-project-tags">
                      {c.hasThumbnail ? (
                        <span className="thumb-tag has"><ImageIcon width="11" height="11" /> サムネあり</span>
                      ) : (
                        <span className="thumb-tag missing">サムネなし</span>
                      )}
                      {hasPrompt && (
                        <span className="thumb-tag prompt"><CheckIcon width="11" height="11" /> プロンプト済</span>
                      )}
                    </div>
                  </div>
                </label>
              );
            })}
            {candidates.length === 0 && (
              <div className="ti-empty">プロジェクトがありません</div>
            )}
          </div>

          <div className="thumb-generate-bar">
            {generating ? (
              <button className="btn btn-sm btn-danger" onClick={handleStop}>
                <StopIcon /> 停止
              </button>
            ) : (
              <button
                className="btn btn-sm btn-ghost"
                disabled={selectedIds.size === 0}
                onClick={handleGenerate}
              >
                <SparklesIcon /> 未生成分のプロンプトを生成
              </button>
            )}
          </div>
        </div>

        {/* 右: プロンプト一覧 */}
        <div className="thumb-result-panel">
          {selectedIds.size > 0 && selectedBlocks.length > 0 ? (
            <>
              <div className="thumb-panel-header">
                <span className="thumb-panel-title">
                  プロンプト ({selectedBlocks.length}件)
                </span>
                <button className="btn btn-sm btn-primary" onClick={handleCopy}>
                  {copied ? <><CheckIcon /> コピー済み</> : `全${selectedBlocks.length}件をコピー`}
                </button>
              </div>

              <div className="thumb-yaml-preview">
                <pre>{bulkYaml}</pre>
              </div>
            </>
          ) : selectedIds.size > 0 ? (
            <div className="thumb-result-empty">
              <ImageIcon width="32" height="32" />
              <p>選択したプロジェクトにプロンプトがありません</p>
              <p className="thumb-result-empty-sub">「未生成分のプロンプトを生成」で作成してください</p>
            </div>
          ) : (
            <div className="thumb-result-empty">
              <ImageIcon width="32" height="32" />
              <p>プロジェクトを選択してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
