---
description: プロジェクトの整理・アーカイブワークフロー
---
# プロジェクト整理ワークフロー

完成・投稿済みのプロジェクトをアーカイブに移動し、engine/src/Root.tsxをクリーンアップするワークフローです。

## Step 1: プロジェクト状態の確認
1. `projects/` 内の各プロジェクトの `meta.json` を確認し、`status` が `published` または `rendering` のものをリストアップ
2. `engine/src/Root.tsx` に登録されているアクティブなCompositionを確認

## Step 2: プロジェクトのアーカイブ
完成済みプロジェクトについて:
1. `projects/{project_id}/` を `projects/_archived/{project_id}/` に移動
2. `meta.json` の `status` を `archived` に更新
3. `engine/public/audio/{project_id}/` を削除（音声は `projects/_archived/{id}/audio/` に残る）

## Step 3: Root.tsxのクリーンアップ
1. アーカイブしたプロジェクトの `import` 文と `<Composition />` を `engine/src/Root.tsx` から削除
2. TypeScriptコンパイル確認: `cd engine && npx tsc --noEmit`

## Step 4: 完了報告
アーカイブしたプロジェクトの数とリストをユーザーに報告
