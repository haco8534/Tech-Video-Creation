import { createClaudeWs } from "../api";

/**
 * 全プロジェクト共有のWebSocketシングルトン
 * ClaudeChat / RenderControl など複数コンポーネントが同一キーでリスナー登録可能
 */
let sharedWs = null;
let sharedWsReady = null;
const projectListeners = new Map(); // key -> Set<callback>

export function getSharedWs() {
  if (sharedWs && sharedWs.readyState === WebSocket.OPEN) {
    return Promise.resolve(sharedWs);
  }
  if (sharedWsReady) return sharedWsReady;

  sharedWsReady = new Promise((resolve) => {
    const socket = createClaudeWs();
    socket.onopen = () => {
      sharedWs = socket;
      sharedWsReady = null;
      resolve(socket);
    };
    socket.onmessage = (e) => {
      let msg;
      try { msg = JSON.parse(e.data); } catch { return; }
      const key = msg.projectKey;
      if (key) {
        const set = projectListeners.get(key);
        if (set) {
          for (const cb of set) cb(msg);
        }
      }
    };
    socket.onclose = () => {
      sharedWs = null;
      sharedWsReady = null;
    };
    socket.onerror = () => {
      sharedWs = null;
      sharedWsReady = null;
    };
  });
  return sharedWsReady;
}

export function addProjectListener(key, callback) {
  if (!projectListeners.has(key)) projectListeners.set(key, new Set());
  projectListeners.get(key).add(callback);
}

export function removeProjectListener(key, callback) {
  const set = projectListeners.get(key);
  if (set) {
    set.delete(callback);
    if (set.size === 0) projectListeners.delete(key);
  }
}
