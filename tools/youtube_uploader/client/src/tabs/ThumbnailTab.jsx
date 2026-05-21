import { useState, useEffect } from "react";
import { fetchThumbnailCandidates, createClaudeWs } from "../api";
import { useToast } from "../components/ToastContext";
import { CheckIcon, ImageIcon, StopIcon, SparklesIcon } from "../icons";

const CHANNEL_ID = "tech_explainer";

// v3 compact: 1タイトル → 1 YAML。各 YAML はネスト構造で、
// `image_generation_prompt.prompt` に英語の完成プロンプトが入る。
// ChatGPT 拡張に渡すのはこの英文プロンプトだけ。
function parseYamlBlocks(text) {
  const blocks = [];
  const fenceMatches = [...text.matchAll(/```ya?ml\s*\n([\s\S]*?)\n```/g)];
  for (const m of fenceMatches) {
    const yaml = m[1];
    const titleMatch = yaml.match(/^title:\s*"?(.+?)"?\s*$/m);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim().replace(/^"|"$/g, "");
    const imagePrompt = extractImagePrompt(yaml);
    blocks.push({ raw: yaml, title, imagePrompt });
  }
  return blocks;
}

// `image_generation_prompt:` 内の `prompt: |` ブロック本文を抽出する
function extractImagePrompt(yaml) {
  const lines = yaml.split("\n");
  let inParent = false;
  let promptIndent = -1;
  let collecting = false;
  const collected = [];

  for (const line of lines) {
    if (!inParent) {
      if (/^image_generation_prompt:\s*$/.test(line)) inParent = true;
      continue;
    }

    if (!collecting) {
      const m = line.match(/^(\s+)prompt:\s*\|\s*$/);
      if (m) {
        promptIndent = m[1].length;
        collecting = true;
        continue;
      }
      // 親ブロックを抜けた（インデント0で別キーが来た）
      if (/^\S/.test(line)) return "";
      continue;
    }

    if (line.trim() === "") {
      collected.push("");
      continue;
    }
    const lineIndent = (line.match(/^(\s*)/) || ["", ""])[1].length;
    if (lineIndent <= promptIndent) break;
    collected.push(line.slice(promptIndent + 2));
  }

  while (collected.length && collected[collected.length - 1] === "") collected.pop();
  return collected.join("\n");
}

function blockKey(b) {
  return b.title;
}

function mergeBlocks(prev, next) {
  const map = new Map(prev.map((b) => [blockKey(b), b]));
  for (const b of next) map.set(blockKey(b), b);
  return Array.from(map.values());
}

export default function ThumbnailTab({ visible = true }) {
  const toast = useToast();
  const [candidates, setCandidates] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [generating, setGenerating] = useState(false);
  const [promptBlocks, setPromptBlocks] = useState([]); // セッション内メモリのみ。ディスクには保存しない
  const [copied, setCopied] = useState(false);
  const [ws, setWs] = useState(null);
  const [generatingTitles, setGeneratingTitles] = useState([]); // 今回の生成リクエスト分のタイトル

  useEffect(() => {
    fetchThumbnailCandidates(CHANNEL_ID)
      .then((data) => setCandidates(data.candidates || []))
      .catch(() => {});
  }, []);

  // 既にプロンプト生成済みのタイトル
  const existingTitles = new Set(promptBlocks.map((b) => b.title));

  // 進捗（今回のリクエスト分、1タイトル=1プロンプト）
  const generatingTitleSet = new Set(generatingTitles);
  const progressDone = promptBlocks.filter(
    (b) => generatingTitleSet.has(b.title) && b.imagePrompt
  ).length;
  const progressTotal = generatingTitles.length;

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

  // --- 区切りの一括コピー用テキスト（ChatGPT拡張に渡す英文プロンプトのみ）
  const bulkYaml = selectedBlocks
    .map((b) => b.imagePrompt)
    .filter(Boolean)
    .join("\n---\n");

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

    // 再生成: 対象タイトルの過去プロンプトを破棄してから始める
    setPromptBlocks((prev) => prev.filter((b) => !titles.includes(b.title)));
    setGenerating(true);
    setGeneratingTitles(titles);
    let accumulated = "";

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
      if (msg.type === "claude-event") {
        const data = msg.data;
        if (data?.type === "assistant" && data.message?.content) {
          for (const block of data.message.content) {
            if (block.type === "text" && block.text) {
              accumulated += block.text;
            }
          }
          const blocks = parseYamlBlocks(accumulated);
          if (blocks.length > 0) {
            setPromptBlocks((prev) => mergeBlocks(prev, blocks));
          }
        }
      } else if (msg.type === "session-end") {
        setGenerating(false);
        socket.close();
        const blocks = parseYamlBlocks(accumulated);
        setPromptBlocks((prev) => mergeBlocks(prev, blocks));
        toast(`プロンプト生成完了 (${blocks.length}件)`, "success");
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
    <div className="thumb-tab" style={visible ? undefined : { display: "none" }}>
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
              <>
                <div className="thumb-progress">
                  <div className="thumb-progress-label">
                    <span className="upload-spinner" />
                    生成中 {progressDone}/{progressTotal}件
                  </div>
                  <div className="thumb-progress-track">
                    <div
                      className="thumb-progress-fill"
                      style={{ width: progressTotal ? `${(progressDone / progressTotal) * 100}%` : "0%" }}
                    />
                  </div>
                </div>
                <button className="btn btn-sm btn-danger" onClick={handleStop}>
                  <StopIcon /> 停止
                </button>
              </>
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
