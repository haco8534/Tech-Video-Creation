import { useState, useEffect, useRef } from "react";
import { getSharedWs, addProjectListener, removeProjectListener } from "../lib/sharedWs";
import { SendIcon, StopIcon, TerminalIcon } from "../icons";

export default function ClaudeChat({ channelId, projectId, autoStart, onAutoStartDone }) {
  const key = `${channelId}/${projectId}`;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // subscribe/unsubscribe
  useEffect(() => {
    setMessages([]);
    setRunning(false);

    const handler = (msg) => {
      switch (msg.type) {
        case "status":
          setRunning(msg.running);
          break;
        case "session-start":
          setRunning(true);
          addMsg({ role: "system", text: "Claude Code 実行開始..." });
          break;
        case "claude-event": {
          const data = msg.data;
          if (data.type === "system" && data.subtype === "init") {
            addMsg({ role: "system", text: `接続完了` });
          }
          if (data.type === "assistant" && data.message?.content) {
            for (const block of data.message.content) {
              if (block.type === "text" && block.text) {
                addMsg({ role: "assistant", text: block.text });
              }
              if (block.type === "tool_use") {
                addMsg({ role: "tool-use", toolName: block.name, toolInput: block.input });
              }
            }
          }
          if (data.type === "user" && data.message?.content) {
            for (const block of data.message.content) {
              if (block.type === "tool_result") {
                const content = typeof block.content === "string"
                  ? block.content : JSON.stringify(block.content, null, 2);
                addMsg({ role: "tool-result", content });
              }
            }
          }
          if (data.type === "result") {
            setRunning(false);
          }
          break;
        }
        case "user-message":
          addMsg({ role: "user", text: msg.text });
          break;
        case "claude-text":
          addMsg({ role: "raw", text: msg.text });
          break;
        case "claude-error":
          addMsg({ role: "error", text: msg.text });
          break;
        case "interrupted":
          addMsg({ role: "system", text: "割り込み: 新しい指示で再開します..." });
          break;
        case "session-end":
          setRunning(false);
          addMsg({ role: "system", text: "ターン完了" });
          break;
        case "error":
          addMsg({ role: "error", text: msg.message });
          setRunning(false);
          break;
      }
    };

    addProjectListener(key, handler);

    // subscribe
    getSharedWs().then((ws) => {
      ws.send(JSON.stringify({ action: "subscribe", channelId, projectId }));
    });

    return () => {
      removeProjectListener(key, handler);
      getSharedWs().then((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ action: "unsubscribe", channelId, projectId }));
        }
      }).catch(() => {});
    };
  }, [key]);

  // 自動開始
  useEffect(() => {
    if (!autoStart) return;
    onAutoStartDone?.();
    const title = autoStart.title || projectId;
    const note = autoStart.note;
    const message = note
      ? `テーマ「${title}」で動画を作成してください。\n\n補足メモ: ${note}\n\nワークフローに従って最初のステップから実行してください。`
      : `テーマ「${title}」で動画を作成してください。ワークフローに従って最初のステップから実行してください。`;

    getSharedWs().then((ws) => {
      ws.send(JSON.stringify({
        action: "start-production",
        channelId,
        projectId,
        message,
      }));
    });
  }, [autoStart]);

  function addMsg(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  async function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");

    const ws = await getSharedWs();
    ws.send(JSON.stringify({
      action: running ? "send-message" : (messages.some((m) => m.role === "assistant") ? "send-message" : "start-production"),
      channelId,
      projectId,
      message: text,
    }));

    inputRef.current?.focus();
  }

  async function handleStop() {
    const ws = await getSharedWs();
    ws.send(JSON.stringify({ action: "kill", channelId, projectId }));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <TerminalIcon />
        <span>Claude Code</span>
        {running && <span className="chat-status connected">実行中</span>}
        {running && (
          <button className="btn btn-sm btn-danger" onClick={handleStop}>
            <StopIcon /> 停止
          </button>
        )}
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            メッセージを入力するとClaude Codeセッションが開始します
          </div>
        )}
        {messages.map((msg, i) => (
          <ChatMsg key={i} message={msg} />
        ))}
        {running && (
          <div className="chat-typing">
            <span className="upload-spinner" /> Claude実行中...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          ref={inputRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={running ? "割り込み指示を入力可能 (Enter で送信)" : "メッセージを入力... (Enter で送信)"}
          rows={2}
        />
        <button
          className="btn btn-primary chat-send-btn"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

function ChatMsg({ message }) {
  const { role } = message;

  if (role === "user") {
    return (
      <div className="chat-msg chat-msg-user">
        <div className="chat-msg-bubble user">{message.text}</div>
      </div>
    );
  }

  if (role === "assistant") {
    return (
      <div className="chat-msg chat-msg-assistant">
        <div className="chat-msg-bubble assistant">
          <pre className="chat-msg-text">{message.text}</pre>
        </div>
      </div>
    );
  }

  if (role === "tool-use") {
    const inputStr = typeof message.toolInput === "string"
      ? message.toolInput
      : JSON.stringify(message.toolInput, null, 2);
    return (
      <div className="chat-msg chat-msg-tool">
        <div className="chat-tool-block">
          <div className="chat-tool-header">
            <span className="chat-tool-icon">&#9654;</span>
            <span className="chat-tool-name">{message.toolName}</span>
          </div>
          <pre className="chat-tool-input">{inputStr}</pre>
        </div>
      </div>
    );
  }

  if (role === "tool-result") {
    return (
      <div className="chat-msg chat-msg-tool-result">
        <details className="chat-tool-result-details">
          <summary className="chat-tool-result-summary">結果を表示</summary>
          <pre className="chat-tool-result-content">{message.content}</pre>
        </details>
      </div>
    );
  }

  if (role === "system") {
    return (
      <div className="chat-msg chat-msg-system">
        <span className="chat-system-text">{message.text}</span>
      </div>
    );
  }

  if (role === "error") {
    return (
      <div className="chat-msg chat-msg-error">
        <pre className="chat-error-text">{message.text}</pre>
      </div>
    );
  }

  return (
    <div className="chat-msg chat-msg-raw">
      <pre className="chat-msg-text">{message.text}</pre>
    </div>
  );
}
