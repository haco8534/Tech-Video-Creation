import { useState } from "react";
import { registerThemes, createClaudeWs } from "../api";
import ThemeSeedInput from "../theme/ThemeSeedInput";
import ThemeChat from "../theme/ThemeChat";
import ThemeCardGrid from "../theme/ThemeCardGrid";
import { useToast } from "../components/ToastContext";

const CHANNEL_ID = "tech_explainer";

export default function ThemeTab({ onNavigateToProduction }) {
  const toast = useToast();
  const [generating, setGenerating] = useState(false);
  const [streamMessages, setStreamMessages] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [registering, setRegistering] = useState(false);
  const [registeredThemes, setRegisteredThemes] = useState([]);
  const [ws, setWs] = useState(null);

  function handleGenerate(seed) {
    setGenerating(true);
    setStreamMessages([]);
    setThemes([]);
    setSelectedIds(new Set());
    setRegisteredThemes([]);

    const socket = createClaudeWs();
    setWs(socket);

    socket.onopen = () => {
      socket.send(JSON.stringify({
        action: "start-theme",
        channelId: CHANNEL_ID,
        seed,
      }));
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      if (msg.type === "claude-text") {
        setStreamMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "assistant-stream") {
            return [...prev.slice(0, -1), { ...last, text: last.text + msg.text }];
          }
          return [...prev, { role: "assistant-stream", text: msg.text }];
        });
        tryParseThemes(msg.text);
      } else if (msg.type === "claude-error") {
        setStreamMessages((prev) => [...prev, { role: "error", text: msg.text }]);
      } else if (msg.type === "session-end") {
        setGenerating(false);
        // 全テキストを結合してテーマ抽出を試みる
        setStreamMessages((prev) => {
          const allText = prev.filter((m) => m.role === "assistant-stream").map((m) => m.text).join("");
          tryParseThemes(allText);
          return prev.map((m) => m.role === "assistant-stream" ? { ...m, role: "assistant" } : m);
        });
        socket.close();
      }
    };

    socket.onerror = () => {
      toast("WebSocket接続エラー", "error");
      setGenerating(false);
    };
  }

  function tryParseThemes(text) {
    const match = text.match(/\[[\s\S]*?\{[\s\S]*?"title"[\s\S]*?\}[\s\S]*?\]/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setThemes(parsed);
        }
      } catch {
        // Not valid JSON yet
      }
    }
  }

  function handleToggleSelect(index) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  async function handleRegister() {
    const selected = [...selectedIds].map((i) => themes[i]);
    if (selected.length === 0) return;

    setRegistering(true);
    try {
      const result = await registerThemes(CHANNEL_ID, selected);
      setRegisteredThemes(result.created || []);
      const newCount = (result.created || []).filter((t) => !t.existed).length;
      const existedCount = (result.created || []).filter((t) => t.existed).length;
      if (newCount > 0) toast(`${newCount}件のテーマを登録しました`, "success");
      if (existedCount > 0) toast(`${existedCount}件は既に存在します`, "warn");
    } catch (err) {
      toast(`エラー: ${err.message}`, "error");
    } finally {
      setRegistering(false);
    }
  }

  function handleStop() {
    if (ws) {
      ws.close();
      setGenerating(false);
    }
  }

  return (
    <div className="theme-tab">
      <div className="theme-tab-header">
        <h2>テーマ作成・登録</h2>
      </div>

      <ThemeSeedInput
        onGenerate={handleGenerate}
        onStop={handleStop}
        generating={generating}
      />

      {streamMessages.length > 0 && (
        <ThemeChat messages={streamMessages} generating={generating} />
      )}

      {themes.length > 0 && (
        <ThemeCardGrid
          themes={themes}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onRegister={handleRegister}
          registering={registering}
          registeredThemes={registeredThemes}
          onNavigateToProduction={(theme) => {
            const rt = registeredThemes.find((r) => r.title === theme.title);
            if (rt) onNavigateToProduction(CHANNEL_ID, rt.id);
          }}
        />
      )}
    </div>
  );
}
