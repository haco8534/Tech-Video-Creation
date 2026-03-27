# デザインガイド: プログラミング言語はなぜ700種類以上ある

## カラーパレット
- Primary: #6366f1 （インディゴ – 知性・技術のイメージ）
- Secondary: #f97316 （オレンジ – 発見・エネルギー）
- Accent: #10b981 （エメラルド – 成長・多様性）
- Background: #f8f9fc （ベース背景）
- Card: rgba(255,255,255,0.82) （カード背景）
- Text: #1a1d23 （本文テキスト）
- Muted: #1a1d23 （サブテキスト – グレー禁止）

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
テーマに登場する技術・ブランドのアイコン:

- 【ブランドアイコン】:
  - Python → Simple Icons
  - JavaScript → Simple Icons
  - Java → Simple Icons
  - C/C++ → Simple Icons
  - Go → Simple Icons
  - Rust → Simple Icons
  - Ruby → Simple Icons
  - Swift → Simple Icons
  - Kotlin → Simple Icons
  - TypeScript → Simple Icons
  - Haskell → Simple Icons

- 【汎用アイコン】:
  - コンピュータ/チップ → Lucide Icons
  - 包丁/料理道具 → Lucide Icons
  - ギア/歯車 → Lucide Icons
  - 矢印/フロー → Lucide Icons
  - コード/ブラケット → Lucide Icons
  - 脳/思考 → Lucide Icons

- 全アイコンはインラインSVGとしてHTMLに直接埋め込む（外部ファイル参照不可）

## デザイン方針
- ライトテーマ必須（ダーク禁止）
- CSS animation / transition / @keyframes 完全禁止
- 1スライド＝1メッセージの原則
- 非対称レイアウトを混ぜて脱AI感を演出
- フラットカラー + ソフトシャドウ（グラデーション背景禁止）
