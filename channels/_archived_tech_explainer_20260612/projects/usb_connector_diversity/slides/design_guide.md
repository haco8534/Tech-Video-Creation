# デザインガイド: USBはなぜ形が統一されないのか

## コンセプト
USBのテーマとして、接続・統一を象徴するグリーン〜ティールをプライマリに、各コネクタ世代を色で区別する。USB規格の「進化」「接続」「統一」を視覚的に表現するクリーンなライトテーマ。

## カラーパレット
- Primary: #0891b2 （ティール — 接続・技術を象徴）
- Primary-light: #e0f7fa
- Secondary: #06b6d4 （シアン — USBの洗練さ）
- Background: #f8f9fc （白系ベース）
- Card: rgba(255,255,255,0.8) （カード背景）
- Text: #1a1d23 （本文テキスト）
- Muted: #1a1d23 （⚠️ グレー禁止。メインテキストと同色）
- Coral: #ef4444 （問題・危険・旧規格の問題点）
- Coral-light: #fee2e2
- Amber: #f59e0b （注目・転換ポイント）
- Amber-light: #fef3c7
- Purple: #7c3aed （USB-C・革新・最新技術）
- Purple-light: #ede9fe
- Emerald: #10b981 （成功・解決・安全設計）
- Emerald-light: #d1fae5

## タイポグラフィ（CSS変数）
- --fs-hero: 72px （数値インパクト用）
- --fs-heading: 42px （スライド見出し）
- --fs-body: 28px （本文）
- --fs-caption: 20px （補足・ラベル）
- --fs-small: 16px （最小テキスト）

## セーフエリア制約（CSS論理値 — 表示時は×2）
- シーンサイズ（CSS上）: 960px × 440px + `transform: scale(2)` → 表示: 1920×880（字幕エリア200px分を除いた領域）
- 字幕エリア: MathLayout固定 200px → 880 + 200 = 1080px

## SVGアイコン計画
テーマに登場する技術・ブランドのアイコン：
- 【ブランドアイコン】: USB — USB-IFの三叉アイコンをインラインSVGで描画
- 【汎用アイコン】: コネクタ断面図、ピン配置図、電流矢印、リサイクルアイコン → すべてインラインSVGで作成
- 全アイコンはインラインSVGとしてHTMLに直接埋め込む（外部ファイル参照不可）
