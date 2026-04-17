import { useState } from "react";
import { SparklesIcon, StopIcon } from "../icons";

export default function ThemeSeedInput({ onGenerate, onStop, generating }) {
  const [seed, setSeed] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!seed.trim() || generating) return;
    onGenerate(seed.trim());
  }

  return (
    <form className="theme-seed-form" onSubmit={handleSubmit}>
      <textarea
        className="theme-seed-input"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="シードトピックを入力...&#10;例: 「プログラミング言語の歴史」「AIの倫理問題」"
        rows={3}
        disabled={generating}
      />
      <div className="theme-seed-actions">
        {generating ? (
          <button type="button" className="btn btn-sm btn-danger" onClick={onStop}>
            <StopIcon /> 停止
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={!seed.trim()}>
            <SparklesIcon /> テーマ生成
          </button>
        )}
      </div>
    </form>
  );
}
