---
description: プロジェクトの整理・アーカイブワークフロー（マルチチャンネル対応）
---
# プロジェクト整理ワークフロー

完成・投稿済みのプロジェクトをアーカイブし、Root.tsxとengineをクリーンアップするワークフローです。
`channels/{channel}/projects/` 配下の全チャンネルに対応しています。

## Step 1: アーカイブ対象の特定

以下の**すべて**を満たすプロジェクトをアーカイブ対象とする:

1. **MP4ファイルの実在確認（必須）**: `channels/{channel}/projects/{project_id}/deliverables/*.mp4` が存在すること
   - `engine/output/*.mp4` にある場合も対象（Step 2で回収する）
   - meta.jsonの `status` だけでは判断しない。実際に動画ファイルが存在するかが基準
2. **YouTube アップロード済み確認（必須）**: `tools/youtube_uploader/schedule.json` を参照し、該当プロジェクトの `uploadedAt` が入っていること
   - `uploadedAt` が null のプロジェクトはアーカイブ対象外（アップロード管理UIから消えてしまうため）
   - schedule.json にエントリがないプロジェクト（アップロード予定なし）は、ユーザーに確認の上アーカイブ可
3. `engine/src/Root.tsx` に登録されているComposition一覧と突合し、対象を確認
4. リストをユーザーに提示して確認を取る

## Step 2: レンダリング済み動画の回収

対象プロジェクトごとに:

1. `engine/output/` 内に該当プロジェクトのMP4ファイルがあるか確認
   - ファイル名パターン: `{composition-id}.mp4`（例: `python-dominance-slides.mp4`）
2. MP4が見つかった場合:
   - `channels/{channel}/projects/{project_id}/deliverables/` ディレクトリを作成（なければ）
   - MP4を `deliverables/` に移動
3. MP4が見つからない場合はスキップし、ユーザーに報告

## Step 3: Root.tsxのクリーンアップ

`engine/src/Root.tsx` から対象プロジェクトのコードを削除:

1. 対象プロジェクトの `import` 文（VideoWithSlidesとTOTAL_FRAMESの両方）を削除
2. 対象プロジェクトの `<Composition />` ブロックを削除
3. TypeScriptコンパイル確認: `cd engine && npx tsc --noEmit`

## Step 4: engine公開アセットの削除

1. `engine/public/audio/{project_id}/` が存在する場合は削除
   - 音声ファイルは `channels/{channel}/projects/{project_id}/audio/` に残っているため安全

## Step 5: プロジェクトのアーカイブ

対象プロジェクトごとに:

1. `channels/{channel}/projects/{project_id}/` を `channels/{channel}/projects/_archived/{project_id}/` に移動
2. `meta.json` の `status` を `archived` に更新

## Step 6: サムネイル未作成プロジェクトの検出とプロンプト生成

アーカイブ処理とは独立して、**全チャンネル・全プロジェクト**を対象にサムネイルの状態をチェックする。

### 6-1: 全プロジェクトの列挙

以下の**4パターン**すべてを走査し、漏れなくプロジェクトを収集する:
- `channels/*/projects/*/` — 各チャンネルのアクティブプロジェクト
- `channels/*/projects/_archived/*/` — 各チャンネルのアーカイブ済みプロジェクト

### 6-2: サムネイル画像の有無を判定

各プロジェクトの `deliverables/` ディレクトリ内に画像ファイル（*.jpg, *.jpeg, *.png, *.webp）が**1つでも存在するか**を確認する。

### 6-3: タイトルの取得

画像が存在しないプロジェクトについて、タイトルを以下の優先順で取得する:
1. `meta.json` の `title` フィールド
2. meta.jsonがない場合: `deliverables/台本.md` や `script/script.md` の先頭見出し
3. いずれもない場合: 「タイトル不明」としてリストに含める

### 6-4: 結果をチャンネル別に一覧表示

サムネ未作成プロジェクトをチャンネル別（アクティブ/アーカイブ区分付き）で一覧表示し、ユーザーに確認を取る。

### 6-5: サムネイルプロンプトの生成

ユーザーが対象を確定したら、`d:\myfolder\動画生成\技術解説\thumbnail\_agents\workflows\thumbnail_prompts.md` ワークフローを実行し、サムネイルプロンプトを生成する。
- インプット: 該当プロジェクトの動画タイトル一覧

## Step 7: 完了報告

以下をユーザーに報告:
- アーカイブしたプロジェクト数とリスト（チャンネル別）
- 回収したMP4ファイルの一覧
- Root.tsxに残っているアクティブなComposition一覧
- 削除した `engine/public/audio/` ディレクトリの一覧
- サムネイル未作成プロジェクトの一覧とプロンプト生成の有無
