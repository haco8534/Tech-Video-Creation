import { useState } from "react";
import {
  CommentIcon, ClockIcon, RefreshIcon, CheckIcon, AlertIcon,
  EyeIcon, HeartIcon,
} from "../icons";
import { useToast } from "./ToastContext";
import { refreshComments } from "../api";
import { formatDate, num } from "../utils";

export default function CommentsView({ comments, onCommentsUpdate }) {
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const videos = comments.videos || [];
  const fetchedAt = comments.fetchedAt ? formatDate(comments.fetchedAt) : "未取得";

  async function handleRefresh() {
    setRefreshing(true);
    toast("コメント取得中...", "success");
    try {
      const data = await refreshComments();
      onCommentsUpdate(data);
      toast("コメント取得完了", "success");
    } catch (e) {
      toast(`エラー: ${e.message}`, "error");
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <>
      <div className="comments-header">
        <h2><CommentIcon /> コメント</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="comments-meta"><ClockIcon /> 最終取得: {fetchedAt}</span>
          <button className="btn btn-sm btn-ghost" onClick={handleRefresh} disabled={refreshing}>
            <RefreshIcon /> 再取得
          </button>
        </div>
      </div>

      {videos.length === 0 && (
        <p style={{ color: "var(--text-3)", padding: 20 }}>コメントデータがありません</p>
      )}

      {videos.map((v) => (
        <VideoComments key={v.videoId} video={v} />
      ))}
    </>
  );
}

function VideoComments({ video: v }) {
  const [collapsed, setCollapsed] = useState(false);
  const s = v.stats || {};

  return (
    <div className="video-comments-group">
      <div className="video-comments-title" onClick={() => setCollapsed(!collapsed)}>
        <h3>{v.title}</h3>
        <div className="video-stats">
          <span><EyeIcon /> {num(s.viewCount)}</span>
          <span><HeartIcon /> {num(s.likeCount)}</span>
          <span><CommentIcon /> {num(s.commentCount)}</span>
        </div>
      </div>
      {!collapsed && (
        <div className="comments-list">
          {(v.comments || []).map((c, i) => (
            <CommentItem key={i} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentItem({ comment: c }) {
  return (
    <div className="comment-item">
      <div className="comment-author">
        {c.author}
        {c.likeCount > 0 && <span className="likes"><HeartIcon /> {c.likeCount}</span>}
      </div>
      <div className="comment-text">{c.text}</div>
      {c.replies?.length > 0 && (
        <div className="comment-replies">
          {c.replies.map((r, i) => (
            <div key={i} className="comment-item">
              <div className="comment-author">
                {r.author}
                {r.likeCount > 0 && <span className="likes"><HeartIcon /> {r.likeCount}</span>}
              </div>
              <div className="comment-text">{r.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
