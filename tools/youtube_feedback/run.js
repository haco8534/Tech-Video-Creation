/**
 * run.js
 *
 * YouTube フィードバックパイプラインのメインオーケストレーター。
 * コメント取得 → AI分析 → レポート生成 を一括実行する。
 *
 * 使い方: node run.js [--fetch-only] [--analyze-only]
 */
const fs = require('fs');
const path = require('path');
const { fetchAll } = require('./fetch_comments');
const { analyze } = require('./analyze');

const COMMENTS_PATH = path.join(__dirname, 'latest_comments.json');

async function main() {
  const args = process.argv.slice(2);
  const fetchOnly = args.includes('--fetch-only');
  const analyzeOnly = args.includes('--analyze-only');

  console.log('========================================');
  console.log(' YouTube Feedback Pipeline');
  console.log(` ${new Date().toISOString()}`);
  console.log('========================================\n');

  // Step 1: コメント取得
  if (!analyzeOnly) {
    console.log('[1/2] コメント取得中...\n');
    try {
      const data = await fetchAll();
      fs.writeFileSync(COMMENTS_PATH, JSON.stringify(data, null, 2));
      console.log(`\n取得完了: ${data.videos.length}本の動画\n`);

      if (data.videos.length === 0) {
        console.log('対象期間内に動画がありません。終了します。');
        return;
      }
    } catch (err) {
      console.error('コメント取得でエラー:', err.message);
      if (err.message.includes('invalid_grant') || err.message.includes('Token')) {
        console.error('\nトークンが期限切れの可能性があります。`node setup.js` を再実行してください。');
      }
      process.exit(1);
    }
  }

  if (fetchOnly) {
    console.log('--fetch-only: コメント取得のみで終了します。');
    return;
  }

  // Step 2: AI分析 & レポート生成
  if (!fs.existsSync(COMMENTS_PATH)) {
    console.error('latest_comments.json が見つかりません。先にコメントを取得してください。');
    process.exit(1);
  }

  console.log('[2/2] AI分析 & レポート生成中...\n');
  try {
    const reportPath = await analyze(COMMENTS_PATH);
    if (reportPath) {
      console.log('\n========================================');
      console.log(' パイプライン完了');
      console.log(` レポート: ${reportPath}`);
      console.log('========================================');
    }
  } catch (err) {
    console.error('分析でエラー:', err.message);
    process.exit(1);
  }
}

main();
