// OAuth re-auth using out-of-band flow (no local server needed)
const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CREDENTIALS_PATH = path.join(__dirname, 'youtube_uploader/credentials.json');
const TOKEN_PATH = path.join(__dirname, 'youtube_uploader/tokens/token.json');

const SCOPES = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.force-ssl'
];

const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8')).web;

// Use redirect_uri=urn:ietf:wg:oauth:2.0:oob alternative: copy-paste flow via localhost
// Actually, let's just use a different port that's definitely free
const PORT = 8891;

const http = require('http');
const { URL } = require('url');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== '/callback') { res.writeHead(404); res.end('Not found'); return; }
  const code = url.searchParams.get('code');
  if (!code) { res.writeHead(400); res.end('No code'); return; }

  const params = new URLSearchParams({
    code,
    client_id: creds.client_id,
    client_secret: creds.client_secret,
    redirect_uri: `http://localhost:${PORT}/callback`,
    grant_type: 'authorization_code'
  });

  const tokenRes = await new Promise((resolve, reject) => {
    const r = https.request({
      hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, (resp) => {
      let d = ''; resp.on('data', c => d += c); resp.on('end', () => resolve(JSON.parse(d)));
    });
    r.on('error', reject);
    r.write(params.toString());
    r.end();
  });

  if (tokenRes.error) {
    res.writeHead(500);
    res.end(`Error: ${tokenRes.error_description}`);
    console.error('Error:', tokenRes);
    server.close();
    return;
  }

  const token = {
    access_token: tokenRes.access_token,
    refresh_token: tokenRes.refresh_token,
    scope: tokenRes.scope,
    token_type: tokenRes.token_type,
    expiry_date: Date.now() + (tokenRes.expires_in * 1000)
  };
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>認証完了！このタブを閉じてOKです。</h1>');
  console.log('\nToken saved! Scopes:', tokenRes.scope);
  server.close();
});

server.listen(PORT, () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
    client_id: creds.client_id,
    redirect_uri: `http://localhost:${PORT}/callback`,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent'
  }).toString();

  console.log('\nブラウザを開いています...');
  const { exec } = require('child_process');
  exec(`start "" "${authUrl}"`);
  console.log(`ポート${PORT}で待機中...`);
});
