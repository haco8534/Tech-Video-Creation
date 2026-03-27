# デザインガイド: ChatGPTにコードを書かせるのはプログラミングか？

## カラーパレット
- Primary: #6366f1 （インディゴ — テクノロジー・知性のイメージ）
- Secondary: #f59e0b （アンバー — 電卓・警告・注目）
- Accent: #10b981 （エメラルド — 歴史・成長）
- Background: #f8f9fc （ベース背景 — 白系）
- Card: rgba(255,255,255,0.75) （カード背景）
- Text: #1a1d23 （本文テキスト）
- Muted: #1a1d23 （グレー禁止。メインテキストと同色）

## タイポグラフィ（CSS変数）
- --fs-hero: 72px （数値インパクト用）
- --fs-heading: 42px （スライド見出し）
- --fs-body: 28px （本文）
- --fs-caption: 20px （補足・ラベル）
- --fs-small: 16px （最小テキスト）

## セーフエリア制約（CSS論理値 — 表示時は×2）
- シーンサイズ（CSS上）: 960px × 440px + `transform: scale(2)` → 表示: 1920×880
- 字幕エリア: MathLayout固定 200px → 880 + 200 = 1080px

## SVGアイコン計画
- 【ブランドアイコン】: ChatGPT/OpenAI → Simple Icons
- 【汎用アイコン】: 
  - 電卓（calculator）→ Lucide Icons
  - 梯子/階段（ladder/stairs）→ Lucide Icons 
  - コード（code）→ Lucide Icons
  - 脳/思考（brain）→ Lucide Icons
  - チェック/バツ（check, x）→ Lucide Icons
  - 矢印（arrow-right, arrow-up）→ Lucide Icons
  - グラフ/棒グラフ（bar-chart）→ Lucide Icons
  - 歴史/時計（clock, history）→ Lucide Icons
- 全アイコンはインラインSVGとしてHTMLに直接埋め込む（外部ファイル参照不可）
