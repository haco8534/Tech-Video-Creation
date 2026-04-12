# デザインガイド: Pythonの天下はいつまで続くのか

## カラーパレット
- Primary: #306998 （Python公式ブルー）
- Secondary: #FFD43B （Python公式イエロー）
- Accent: #E74C3C （警告・対比用レッド）
- Background: #f8f9fc （ベース背景 — 白系）
- Card: rgba(255,255,255,0.75) （カード背景）
- Text: #1a1d23 （本文テキスト）
- Muted: #1a1d23 （⚠️ グレー禁止。メインテキストと同色）

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

### ブランドアイコン（Devicon CDN）
- CDN URL: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-original.svg`
- 使用するアイコン一覧:
  - `python` — メインテーマ
  - `c` — 速度比較用
  - `rust` — 挑戦者
  - `go` — 挑戦者
  - `java` — 歴史・前王者
  - `cplusplus` — 歴史
  - `javascript` — 比較用
  - `typescript` — 比較用
  - `numpy` — グルー言語説明用（存在確認要）
  - `pytorch` — AI関連
  - `tensorflow` — AI関連

### オープニングスライドのアイコン活用
1. 背景に薄い（opacity:0.15）アイコンクラウド — 各種言語アイコンを敷き詰め
2. タイトルの上にPythonアイコンを大きく配置（s=80）
3. タイトルテキストは `zIndex:1` で前面に

## デザインコンセプト
- テーマカラーはPython公式のブルー×イエローをベースに
- 「王座」「天下」のメタファーに合わせ、ゴールド（#FFD43B）をアクセントに使用
- 挑戦者たちのシーンでは各言語のブランドカラーを使う
- ライトテーマ必須（白系背景）
- アニメーション禁止（即表示）
