import { useEffect, useRef } from "react";

export default function ThemeChat({ messages, generating }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="theme-chat">
      <div className="theme-chat-header">
        <span className="theme-chat-label">Claude出力</span>
        {generating && <span className="upload-spinner" />}
      </div>
      <div className="theme-chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`theme-chat-msg ${msg.role}`}>
            <pre>{msg.text}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
