# YouTube Feedback Pipeline

YouTubeコメントを自動収集し、Claude Code で分析して改善レポートを生成するツール。

## セットアップ

### 1. Google Cloud Console で準備

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクト作成
2. 「YouTube Data API v3」を有効化
3. 「認証情報」→「APIキー」を作成

### 2. 設定ファイル作成

```bash
cd tools/youtube_feedback
cp config.example.json config.json
```

`config.json` を編集:
- `youtube.api_key`: YouTube Data API キー
- `youtube.channel_id`: 自分のチャンネルID（チャンネルURL の `UC...` 部分）

### 3. 依存パッケージインストール

```bash
npm install
```

### 4. Claude Code CLI が使えることを確認

```bash
claude -p "hello"
```

## 使い方

### 一括実行（コメント取得 → 分析 → レポート）

```bash
node run.js
```

### 個別実行

```bash
node fetch_comments.js   # コメント取得のみ
node analyze.js           # 分析のみ（latest_comments.json を使用）
```

### オプション

```bash
node run.js --fetch-only    # コメント取得のみ
node run.js --analyze-only  # 分析のみ
```

## 日次自動実行

`register_scheduled_task.bat` を**管理者権限**で実行すると、Windowsタスクスケジューラに毎朝9:00実行のタスクが登録される。

管理コマンド:
```bash
schtasks /query /tn "YouTubeFeedbackPipeline"    # 確認
schtasks /run /tn "YouTubeFeedbackPipeline"      # 手動実行
schtasks /delete /tn "YouTubeFeedbackPipeline" /f # 削除
```

## 出力

レポートは `reports/YYYY-MM-DD.md` に保存される。

## 設定項目

| 項目 | 説明 | デフォルト |
|------|------|----------|
| `max_videos` | 分析対象の最大動画数 | 5 |
| `max_comments_per_video` | 動画あたりの最大コメント数 | 200 |
| `days_back` | 過去何日分の動画を対象にするか | 7 |
