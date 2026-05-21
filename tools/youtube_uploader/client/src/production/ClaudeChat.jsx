import { useState, useEffect, useRef } from "react";
import { getSharedWs, addProjectListener, removeProjectListener } from "../lib/sharedWs";
import { SendIcon, StopIcon, TerminalIcon, FileTextIcon } from "../icons";
import {
  fetchPromptTemplates,
  createPromptTemplate,
  updatePromptTemplate,
  deletePromptTemplate,
} from "../api";

export default function ClaudeChat({ channelId, projectId, autoStart, onAutoStartDone }) {
  const key = `${channelId}/${projectId}`;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [tmplOpen, setTmplOpen] = useState(false);
  const [tmplEditing, setTmplEditing] = useState(null); // null | { id?, name, body }
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const tmplRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    if (!tmplOpen) return;
    function onClickOutside(e) {
      if (tmplRef.current && !tmplRef.current.contains(e.target)) {
        setTmplOpen(false);
        setTmplEditing(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [tmplOpen]);

  function loadTemplates() {
    fetchPromptTemplates()
      .then((data) => setTemplates(data.templates || []))
      .catch(() => {});
  }

  function handleInsertTemplate(t) {
    setInput((prev) => (prev ? `${prev}\n${t.body}` : t.body));
    setTmplOpen(false);
    setTmplEditing(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  async function handleSaveTemplate() {
    if (!tmplEditing) return;
    const name = tmplEditing.name.trim();
    const body = tmplEditing.body;
    if (!name || !body.trim()) return;
    try {
      if (tmplEditing.id) {
        await updatePromptTemplate(tmplEditing.id, name, body);
      } else {
        await createPromptTemplate(name, body);
      }
      setTmplEditing(null);
      loadTemplates();
    } catch {}
  }

  async function handleDeleteTemplate(id) {
    if (!confirm("この定型文を削除しますか？")) return;
    try {
      await deletePromptTemplate(id);
      loadTemplates();
    } catch {}
  }

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
      ? `テーマ「${title}」で動画を作成してください。\n\n補足メモ: ${note}\n\nワークフローに従って最初のステップから実行してください。最後まで止まらずに全部実行してください。`
      : `テーマ「${title}」で動画を作成してください。ワークフローに従って最初のステップから実行してください。最後まで止まらずに全部実行してください。`;

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
        <div className="chat-tmpl-wrap" ref={tmplRef}>
          <button
            type="button"
            className="btn btn-sm btn-ghost chat-tmpl-btn"
            onClick={() => { setTmplOpen((v) => !v); setTmplEditing(null); }}
            title="定型文"
          >
            <FileTextIcon />
          </button>
          {tmplOpen && (
            <div className="chat-tmpl-popover">
              {!tmplEditing && (
                <>
                  <div className="chat-tmpl-header">
                    <span>定型文</span>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setTmplEditing({ name: "", body: "" })}
                    >
                      + 新規
                    </button>
                  </div>
                  <div className="chat-tmpl-list">
                    {templates.length === 0 && (
                      <div className="chat-tmpl-empty">定型文がありません</div>
                    )}
                    {templates.map((t) => (
                      <div key={t.id} className="chat-tmpl-item">
                        <button
                          type="button"
                          className="chat-tmpl-item-main"
                          onClick={() => handleInsertTemplate(t)}
                          title="クリックで挿入"
                        >
                          <div className="chat-tmpl-item-name">{t.name}</div>
                          <div className="chat-tmpl-item-preview">{t.body}</div>
                        </button>
                        <div className="chat-tmpl-item-actions">
                          <button
                            type="button"
                            className="chat-tmpl-action"
                            onClick={() => setTmplEditing({ id: t.id, name: t.name, body: t.body })}
                            title="編集"
                          >
                            編集
                          </button>
                          <button
                            type="button"
                            className="chat-tmpl-action chat-tmpl-action-danger"
                            onClick={() => handleDeleteTemplate(t.id)}
                            title="削除"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {tmplEditing && (
                <div className="chat-tmpl-edit">
                  <div className="chat-tmpl-header">
                    <span>{tmplEditing.id ? "編集" : "新規作成"}</span>
                  </div>
                  <input
                    className="chat-tmpl-input"
                    placeholder="名前"
                    value={tmplEditing.name}
                    onChange={(e) => setTmplEditing({ ...tmplEditing, name: e.target.value })}
                    autoFocus
                  />
                  <textarea
                    className="chat-tmpl-textarea"
                    placeholder="定型文の本文"
                    value={tmplEditing.body}
                    onChange={(e) => setTmplEditing({ ...tmplEditing, body: e.target.value })}
                    rows={6}
                  />
                  <div className="chat-tmpl-edit-actions">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleSaveTemplate}
                      disabled={!tmplEditing.name.trim() || !tmplEditing.body.trim()}
                    >
                      保存
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => setTmplEditing(null)}
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
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
