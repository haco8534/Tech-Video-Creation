import fs from "fs";
import path from "path";
import { google } from "googleapis";
import open from "open";
import http from "http";

const CREDENTIALS_PATH = path.join(import.meta.dirname, "..", "credentials.json");
const TOKENS_DIR = path.join(import.meta.dirname, "..", "tokens");

const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube",
];

// tokens/ ディレクトリが無ければ作成
if (!fs.existsSync(TOKENS_DIR)) fs.mkdirSync(TOKENS_DIR, { recursive: true });

function tokenPath(channelId) {
  return path.join(TOKENS_DIR, `${channelId}.json`);
}

// 旧token.jsonからの移行（初回のみ）
function migrateLegacyToken() {
  const legacyPath = path.join(import.meta.dirname, "..", "token.json");
  if (fs.existsSync(legacyPath)) {
    console.log("旧 token.json を検出。手動で tokens/{channelId}.json に移動してください。");
  }
}
migrateLegacyToken();

function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      "credentials.json が見つかりません。Google Cloud Console から OAuth2 クライアントIDをダウンロードして tools/youtube_uploader/credentials.json に配置してください。"
    );
  }
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
}

function createOAuth2Client() {
  const creds = loadCredentials();
  const { client_id, client_secret } = creds.installed || creds.web || {};
  if (!client_id) throw new Error("credentials.json の形式が不正です");
  return new google.auth.OAuth2(client_id, client_secret, "http://localhost:8891/callback");
}

function loadToken(channelId) {
  const p = tokenPath(channelId);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function saveToken(channelId, token) {
  fs.writeFileSync(tokenPath(channelId), JSON.stringify(token, null, 2));
}

export function isAuthenticated(channelId) {
  return fs.existsSync(CREDENTIALS_PATH) && fs.existsSync(tokenPath(channelId));
}

export function hasCredentials() {
  return fs.existsSync(CREDENTIALS_PATH);
}

export async function authenticate(channelId) {
  const client = createOAuth2Client();
  const token = loadToken(channelId);

  if (token) {
    client.setCredentials(token);
    client.on("tokens", (newTokens) => {
      const merged = { ...token, ...newTokens };
      saveToken(channelId, merged);
    });

    // トークンが有効か確認（invalid_grant 対策）
    try {
      await client.getAccessToken();
      return client;
    } catch (err) {
      console.error(`[youtube] ${channelId}: トークン無効 (${err.message})、再認証します...`);
      // 無効なトークンファイルを削除して再認証フローへ
      fs.unlinkSync(tokenPath(channelId));
    }
  }

  // 初回認証: ブラウザでOAuth同意画面を開く
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://localhost:8891");
      const authCode = url.searchParams.get("code");
      if (authCode) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h1>「${channelId}」の認証成功！このタブを閉じてください。</h1>`);
        server.close();
        resolve(authCode);
      } else {
        res.writeHead(400);
        res.end("認証コードが見つかりません");
      }
    });
    server.listen(8891, () => {
      console.log(`認証用サーバー起動 (${channelId}): http://localhost:8891`);
      open(authUrl);
    });
    server.on("error", reject);
  });

  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  saveToken(channelId, tokens);
  return client;
}

export async function listVideos(channelId) {
  const auth = await authenticate(channelId);
  const youtube = google.youtube({ version: "v3", auth });

  const videos = [];
  let pageToken;

  do {
    const res = await youtube.search.list({
      part: "snippet",
      forMine: true,
      type: "video",
      maxResults: 50,
      order: "date",
      pageToken,
    });

    for (const item of res.data.items || []) {
      videos.push({
        videoId: item.id.videoId,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || null,
        channelTitle: item.snippet.channelTitle,
      });
    }

    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return videos;
}

export async function uploadVideo({ channelId, title, description, tags, videoPath, thumbnailPath, publishAt }) {
  const auth = await authenticate(channelId);
  const youtube = google.youtube({ version: "v3", auth });

  // 動画アップロード
  const res = await youtube.videos.insert({
    part: "snippet,status",
    requestBody: {
      snippet: {
        title,
        description,
        tags,
        categoryId: "28", // Science & Technology
        defaultLanguage: "ja",
        defaultAudioLanguage: "ja",
      },
      status: {
        privacyStatus: publishAt ? "private" : "public",
        publishAt: publishAt || undefined,
        selfDeclaredMadeForKids: false,
      },
    },
    media: {
      body: fs.createReadStream(videoPath),
    },
  });

  const videoId = res.data.id;

  // サムネイル設定
  if (thumbnailPath) {
    await youtube.thumbnails.set({
      videoId,
      media: {
        body: fs.createReadStream(thumbnailPath),
      },
    });
  }

  return { videoId, title };
}
