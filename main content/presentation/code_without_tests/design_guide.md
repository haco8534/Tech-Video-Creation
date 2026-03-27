# デザインガイド: 「テストを書かないコードはゴミ」ってまじ？

## カラーパレット
- Primary: #e53e3e （レッド — テスト失敗・警告・緊急性）
- Secondary: #38a169 （グリーン — テスト成功・安全性）
- Accent: #805ad5 （パープル — 知性・コードの品質）
- Background: #faf5f5 （ベース背景 — わずかに暖かみ）
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

## テーマカラーの狙い
- レッド（Primary）で「テスト失敗」「危険」「緊急」
- グリーン（Secondary）で「テスト成功」「安全」
- パープル（Accent）で「知識」「研究」「品質」
- レッド×グリーンのテスト成功・失敗の対比が動画全体のトーンを決定

## SVGアイコン計画
- 【汎用アイコン】:
  - バグ/虫（bug）→ Lucide Icons
  - シールド/盾（shield）→ Lucide Icons
  - 警告（alert-triangle）→ Lucide Icons
  - チェック（check-circle）→ Lucide Icons
  - バツ（x-circle）→ Lucide Icons
  - コードブラケット（code）→ Lucide Icons
  - テスト/フラスコ（flask/beaker）→ Lucide Icons
  - グラフ/棒グラフ（bar-chart）→ Lucide Icons
  - 矢印（arrow-right, arrow-down）→ Lucide Icons
  - 時計/時間（clock）→ Lucide Icons
  - ドル/お金（dollar-sign）→ Lucide Icons
  - 飛行機（plane）→ Lucide Icons (CrowdStrike)
  - ジェンガ/積み木（layers）→ Lucide Icons
- 全アイコンはインラインSVGとしてHTMLに直接埋め込む（外部ファイル参照不可）
