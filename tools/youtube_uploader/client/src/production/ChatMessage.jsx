export default function ChatMessage({ message }) {
  const { role, text, toolName, input } = message;

  if (role === "user") {
    return (
      <div className="chat-msg chat-msg-user">
        <div className="chat-msg-bubble user">{text}</div>
      </div>
    );
  }

  if (role === "assistant" || role === "assistant-stream") {
    return (
      <div className="chat-msg chat-msg-assistant">
        <div className="chat-msg-bubble assistant">
          <pre className="chat-msg-text">{text}</pre>
        </div>
      </div>
    );
  }

  if (role === "tool") {
    return (
      <div className="chat-msg chat-msg-tool">
        <details className="chat-tool-details">
          <summary className="chat-tool-summary">
            <span className="chat-tool-name">{toolName}</span>
          </summary>
          <pre className="chat-tool-input">
            {typeof input === "string" ? input : JSON.stringify(input, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  if (role === "system") {
    return (
      <div className="chat-msg chat-msg-system">
        <span className="chat-system-text">{text}</span>
      </div>
    );
  }

  if (role === "error") {
    return (
      <div className="chat-msg chat-msg-error">
        <pre className="chat-error-text">{text}</pre>
      </div>
    );
  }

  // raw
  return (
    <div className="chat-msg chat-msg-raw">
      <pre className="chat-msg-text">{text}</pre>
    </div>
  );
}
