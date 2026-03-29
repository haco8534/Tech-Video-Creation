/**
 * analyze.js
 *
 * Claude Code CLI を使ってYouTubeコメントを分析し、改善レポートを生成する。
 *
 * 使い方: node analyze.js [入力JSONパス]
 * デフォルト入力: latest_comments.json
 * 出力: reports/YYYY-MM-DD.md
 */
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const CONFIG_PATH = path.join(__dirname, 'config.json');

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

/**
 * Claude Code CLI にプロンプトを渡して結果を得る
 */
function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const proc = execFile('claude', ['-p', '--model', 'sonnet', prompt], {
      maxBuffer: 1024 * 1024 * 10,
      timeout: 300_000,
    }, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(`Claude Code エラー: ${err.message}\n${stderr}`));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

/**
 * 動画ごとのコメントを分析
 */
async function analyzeVideo(video) {
  const commentTexts = video.comments
    .map((c) => {
      const likes = c.likeCount > 0 ? ` (👍${c.likeCount})` : '';
      return `- ${c.text}${likes}`;
    })
    .join('\n');

  if (!commentTexts.trim()) {
    return { videoId: video.videoId, title: video.title, analysis: 'コメントなし' };
  }

  const prompt = `あなたはYouTube技術解説チャンネルの品質改善アドバイザーです。
以下の動画に対する視聴者コメントを分析し、改善に役立つフィードバックレポートを作成してください。

## 動画情報
- タイトル: ${video.title}
- 公開日: ${video.publishedAt}
- 視聴回数: ${video.stats.viewCount || '不明'}
- 高評価数: ${video.stats.likeCount || '不明'}

## コメント一覧 (${video.comments.length}件)
${commentTexts}

## 分析してほしい内容

### 1. コメント分類
以下のカテゴリにコメントを分類し、各カテゴリの件数と代表的なコメントを挙げてください:
- **指摘・改善要望** (音声、テンポ、スライド、内容の正確性など)
- **質問** (視聴者が理解できなかった点)
- **称賛** (好評だった点)
- **リクエスト** (次に扱ってほしいテーマなど)
- **その他**

### 2. 重要な指摘トップ3
改善インパクトが大きい指摘を優先度順に3つ挙げ、具体的な改善アクションを提案してください。
高評価数が多いコメントの指摘は重要度が高いと判断してください。

### 3. 好評ポイント
視聴者に好評だった点をまとめ、今後も継続すべきポイントとして記載してください。

### 4. 次回動画への提案
コメントから読み取れるリクエストや、改善を踏まえた次回動画へのアドバイスを簡潔に。

Markdown形式で出力してください。`;

  const analysis = await callClaude(prompt);

  return {
    videoId: video.videoId,
    title: video.title,
    analysis,
  };
}

/**
 * 全動画の分析を統合レポートにまとめる
 */
async function generateSummary(videoAnalyses) {
  const analysesText = videoAnalyses
    .map((va) => `## ${va.title}\n${va.analysis}`)
    .join('\n\n---\n\n');

  const prompt = `あなたはYouTube技術解説チャンネルの品質改善アドバイザーです。
以下は複数動画の個別分析結果です。これらを統合して、チャンネル全体の改善レポートを作成してください。

${analysesText}

## 出力してほしい内容

### チャンネル全体サマリー
- 全体的な視聴者の反応傾向
- 複数動画に共通する指摘パターン

### 優先改善アクション（最大5つ）
チャンネル全体で取り組むべき改善を優先度順に。制作パイプラインのどのフェーズ（台本/スライド/音声/編集）に関係するかも明記。

### 継続すべき強み
視聴者に評価されている点。

### 次回テーマ候補
コメントから抽出されたリクエストやトレンド。

簡潔に、Markdown形式で出力してください。`;

  return await callClaude(prompt);
}

/**
 * メイン
 */
async function analyze(inputPath) {
  const config = loadConfig();
  const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

  if (data.videos.length === 0) {
    console.log('分析対象の動画がありません。');
    return null;
  }

  console.log(`${data.videos.length} 本の動画を分析中...\n`);

  const videoAnalyses = [];
  for (const video of data.videos) {
    console.log(`  分析中: ${video.title} (${video.comments.length}件のコメント)`);
    const result = await analyzeVideo(video);
    videoAnalyses.push(result);
  }

  console.log('\n統合レポートを生成中...');
  const summary = await generateSummary(videoAnalyses);

  const today = new Date().toISOString().split('T')[0];
  const report = `# YouTube フィードバックレポート (${today})

> 取得日時: ${data.fetchedAt}
> 対象動画: ${data.videos.length}本
> 総コメント数: ${data.videos.reduce((sum, v) => sum + v.comments.length, 0)}件

---

# チャンネル全体サマリー

${summary}

---

# 動画別詳細分析

${videoAnalyses.map((va) => `## ${va.title}\n\nhttps://youtube.com/watch?v=${va.videoId}\n\n${va.analysis}`).join('\n\n---\n\n')}
`;

  const reportDir = path.resolve(__dirname, config.settings.report_dir || './reports');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  const reportPath = path.join(reportDir, `${today}.md`);
  fs.writeFileSync(reportPath, report);
  console.log(`\nレポート保存完了: ${reportPath}`);

  return reportPath;
}

if (require.main === module) {
  const inputPath = process.argv[2] || path.join(__dirname, 'latest_comments.json');

  if (!fs.existsSync(inputPath)) {
    console.error(`入力ファイルが見つかりません: ${inputPath}`);
    console.error('先に node fetch_comments.js を実行してください。');
    process.exit(1);
  }

  analyze(inputPath).catch((err) => {
    console.error('エラー:', err.message);
    process.exit(1);
  });
}

module.exports = { analyze };
