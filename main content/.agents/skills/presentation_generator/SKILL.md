---
name: presentation_generator
description: 台本から高品質なWebアニメーション・スライド（HTML/CSS/JS）を生成する（TSX変換→Remotion描画の入力素材）
---

# プレゼンテーション用Webページ生成スキル

台本をもとに、**解説動画のコンテンツ部分として使用できる高品質なWebページ（HTML/CSS/JS）をフルスクラッチで生成**する。生成されたHTML/CSSはPhase Cで自動的にTSXに変換され、Remotion内で直接描画される。

> 🚨 **完全自律実行**: 確認・問い返しなく最後まで自律的に実行する。検証エラーは自分で修正し、完了後に最終報告のみ行う。

## 🎯 目的

- **YouTube解説動画（ずんだもん×めたん対話型）のメインコンテンツスライド**として使用
- 概念の「説明」は音声ナレーションが担う。スライドの役割は**視聴者の理解を視覚的に助けること**

---

## 📏 シーン設計ルール

### シーン分割の粒度
- 会話の展開や説明フェーズが変わるごとにこまめにシーンを切り替える
- オープニング・まとめ等の「会話のみのセクション」にも必ずシーンを作成する

### 🚨 SCENEマーカーとHTMLシーンの1:1対応（絶対ルール）
台本の `<!-- SCENE: ... -->` マーカーとHTMLの `<section>` は**完全に1:1で対応**しなければならない。台本にN個のSCENEマーカーがあれば、HTMLにもちょうどN個。順序も完全一致。独自追加・統合・順序変更はすべて禁止。

### 🚨 HTMLシーンコメント書式（TSX変換に必須）
各シーンは `<!-- ===== Scene N: タイトル ===== -->` コメントで区切る。変換スクリプトがこのコメントを正規表現で検出する。

```html
<!-- ===== Scene 0: オープニング ===== -->
<div class="scene" id="scene-0">
    <div class="content center-layout">...</div>
</div>
```

### 1スライド＝1メッセージの原則
- 許可: 見出し1つ + 本文1〜2行 + 図解1つ
- 禁止: 3つ以上のテキストブロック / 5項目以上の箇条書き / 画面50%以上がテキスト

---

## 🎨 デザインルール

### フォント（必須）
Google Fonts の **Zen Maru Gothic** を必ず使用。`<head>` に以下を追加：
```html
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap" rel="stylesheet">
```

### テーマとトーン
- **ライトテーマ（白系背景）必須**。ダークテーマは完全禁止
- **フラットデザイン**を基本とし、過度な装飾を避ける

### 🚨 脱AI感デザイン原則

| ❌ 禁止 | ✅ 代替 |
|---------|---------|
| 背景グラデーション (`linear-gradient` 等) | 単色ベタ塗り (`#f8f9fa` 等) |
| カード全面グラデーション | 単色背景 + ボーダー |
| 虹色・ネオン系装飾 | 2〜3色の抑制的配色 |
| 全シーン左右対称レイアウト | 非対称・余白の偏り |
| 汎用図形のみの図解 | 実在SVGアイコン + 具体ラベル |
| 全シーン同一レイアウト | シーンごとにレイアウト変化 |
| グレーテキスト (`#6b7280` 等) | `#1a1d23`（メインと同色） |
| 全スライドに補足サブテキスト | `.subtitle-text`, `.footnote`, `.source` は `display:none` |
| 画面左上への章タイトル配置 | Remotion側で自動付与されるため不要 |

### カラートークン設計
`:root` にプロジェクトのテーマに合わせたカラートークンを定義する：

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;  /* ⚠️ グレー禁止 */
    --primary: #4f46e5;       /* テーマに応じて変更 */
    --primary-light: #e0e7ff;
    --teal: #14b8a6;    --teal-light: #ccfbf1;
    --coral: #ef4444;   --coral-light: #fee2e2;
    --amber: #f59e0b;   --amber-light: #fef3c7;
    --card-bg: #ffffff;
    --border: #d1d5db;
    --radius: 12px;     --radius-sm: 6px;
    --fs-hero: 72px;    --fs-heading: 36px;
    --fs-body: 24px;    --fs-caption: 18px;    --fs-small: 14px;
}
```

### SVGアイコン活用（必須・最重要）
テーマに登場する技術・ブランド・概念のアイコンを**インラインSVG**として直接埋め込む。外部画像・絵文字は使用禁止。

#### SVG配置の判断基準（文脈駆動）
「すべてのシーンに機械的に1個入れる」のではなく、**台本の文脈を読み取り、適切な場面で適切なアイコンを適切な数だけ配置**する。

| いつ使うか | どう使うか | 例 |
|-----------|-----------|----|
| **特定の技術・サービス名が登場したとき** | その技術のロゴバッジSVGを**必ず**表示する | 「TypeScriptが登場した」→ TSロゴ、「Dockerとは」→ Dockerロゴ |
| **複数の技術を列挙・比較するとき** | 言及されるすべての技術のロゴを**並べて**表示する | 「言語が700以上ある」→ Python, JS, C, Rust, Go等のロゴを一列に |
| **概念の対比を語るとき** | 対比を視覚化する状態アイコンを配置する | 「安全 vs 危険」→ ✓ vs ⚠ アイコン |
| **歴史・変遷を語るとき** | 各時代のキーテクノロジーのロゴを配置する | 「1995年JS → 2009年Node → 2012年TS」→ 各ロゴ入りカード |
| **単なるメッセージ・引用・抽象的議論のとき** | 無理にアイコンを入れない。テキストだけのシーンも許容 | 「結論：TSはJSを殺し、そして救った」→ テキスト中心でOK |

> 🚨 **最も重要なルール**: 台本に具体的な技術名・サービス名・ツール名が出たら、そのロゴSVGを**絶対に省略しない**。テキストだけで技術名を書くのは「見た目が寂しい」だけでなく「視聴者の理解を助ける機会を逃している」。

#### SVGアイコンの3パターン

**1. 技術ロゴバッジ**（言語・フレームワーク・ツール）
```html
<!-- 角丸四角 + テキスト -->
<svg viewBox="0 0 40 40" width="32" height="32">
  <rect x="4" y="4" width="32" height="32" rx="4" fill="#3178c6"/>
  <text x="20" y="28" text-anchor="middle" fill="#fff" font-size="18" font-weight="900">TS</text>
</svg>

<!-- 円形バッジ -->
<svg viewBox="0 0 40 40" width="32" height="32">
  <circle cx="20" cy="20" r="14" fill="#68a063"/>
  <text x="20" y="25" text-anchor="middle" fill="#fff" font-size="10" font-weight="900">Node</text>
</svg>
```
このパターンで JavaScript, TypeScript, Python, React, Vue, Svelte, Docker, Node.js, C# 等を表現する。各技術のブランドカラーを使うこと。

**2. 状態・警告アイコン**（カード内の印象付け）
```html
<!-- 警告三角 -->
<svg viewBox="0 0 40 40" width="36" height="36">
  <path d="M20 4L36 34H4Z" fill="none" stroke="var(--coral)" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="20" y="28" text-anchor="middle" fill="var(--coral)" font-size="16" font-weight="900">!</text>
</svg>

<!-- 禁止マーク -->
<svg viewBox="0 0 40 40" width="36" height="36">
  <circle cx="20" cy="20" r="15" fill="none" stroke="var(--coral)" stroke-width="2.5"/>
  <line x1="10" y1="10" x2="30" y2="30" stroke="var(--coral)" stroke-width="2.5"/>
</svg>

<!-- チェックマーク -->
<svg viewBox="0 0 40 40" width="36" height="36">
  <circle cx="20" cy="20" r="15" fill="var(--teal)" opacity=".15"/>
  <path d="M12 20l6 6 12-12" stroke="var(--teal)" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>
```

**3. 概念アイコン**（ブラウザ・サーバー・ネットワーク・チャート等）
```html
<!-- ブラウザ -->
<svg viewBox="0 0 36 36" width="30" height="30">
  <rect x="3" y="3" width="30" height="26" rx="3" fill="none" stroke="var(--amber)" stroke-width="2"/>
  <rect x="3" y="3" width="30" height="6" rx="3" fill="var(--amber)" opacity=".3"/>
  <circle cx="7" cy="6" r="1.5" fill="var(--amber)"/>
</svg>

<!-- スター -->
<svg viewBox="0 0 32 32" width="28" height="28">
  <path d="M16 4l3.5 7 7.5 1-5.5 5.3 1.3 7.7L16 21.5 9.2 25l1.3-7.7L5 12l7.5-1z" fill="var(--primary)" opacity=".8"/>
</svg>
```

#### SVG配置のコツ
- `style="display:block; margin:0 auto 4px"` でカード/ノード内の中央上部に配置
- サイズは `width="28"～40"` が最適（小さすぎると見えない、大きすぎると圧迫）
- CSS変数（`var(--primary)` 等）を使ってテーマカラーと統一

### フラット背景パターン（グラデーションの代替）
```css
.bg-dots { background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px); background-size: 24px 24px; }
.bg-grid { background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px); background-size: 40px 40px; }
```

---

## 🧩 ビジュアルパターンカタログ

台本の `<!-- SCENE: ビジュアルパターン | シーン見出し -->` マーカーに対応するパターン。各パターンは `.scene` > `.content` 内に配置する。

| # | パターン名 | 用途 | 主要CSSクラス |
|---|-----------|------|--------------|
| 1 | タイトルカード | セクション見出し・テーマ転換 | `.center-layout`, `.title-large` |
| 2 | テキスト強調 | キーワード・メッセージを大きく表示 | `.big-statement`, `.accent-primary` |
| 3 | 数値インパクト | 大きな数値で印象付け（★SVGアイコン必須） | `.metric-card`, `.metric-value` |
| 4 | 段階的リスト | 3〜4項目のナンバー付きリスト | `.num-list`, `.num-item`, `.num-circle` |
| 5 | 比較対照 | 2概念を左右並べて比較（★各カードにSVGアイコン必須） | `.two-col`, `.arch-card` |
| 6 | 横並びカード | 並列する複数項目 | `.metric-grid`, `.lesson-cards` |
| 7 | 引用カード | 論文・著名人の引用 | `.quote-block`, `.quote-mark`, `.quote-body` |
| 8 | フロー図 | 歴史的変遷・プロセスの流れ（★各ノードにSVGアイコン必須） | `.flow-chain`, `.fc-node`, `.fc-arr` |
| 9 | 比較テーブル | グリッド形式のデータ比較 | `.comp-table`, `.comp-header` |
| 10 | タグクラウド | 複数キーワードをカラフル表示 | `.tag-row`, `.tag` |
| 11 | SVGグラフ | データの視覚化（バー/リング） | `.bar-chart`, `.bar-row`, `.bar-fill` |
| 12 | コードビジュアル | コード・ターミナル表示 | `.code-box`, `.code-head`, `.code-body` |
| 13 | アーキテクチャ図 | 階層/スタック構造 | `.layer-stack`, `.layer-row` |
| 14 | パイプライン | 入力→処理→出力の変換過程 | `.pipe-row`, `.pipe-item`, `.pipe-icon` |
| 15 | ハブフロー | 中心ノードと周辺の関係 | `.hub-flow`, `.hub-node`, `.hub-center` |

> ⚠️ **タイムラインパターンは廃止**。時系列の表現には「フロー図」（`.flow-chain` + `.fc-node`）を使う。各ノードに技術ロゴSVGを配置し、矢印（`.fc-arr`）でつなぐ。
> `.timeline`, `.tl-item`, `.tl-dot` は他プロジェクトからCSSリークが発生するため**使用禁止**。

### テキストは「ラベル・キーワード」のみ
- スライドに「説明文」を書かない。概念の説明は音声が担う
- 文字は大きく、少なく。遠くから見ても一瞬で読めるサイズ
- 絵文字は使用しない

---

## 🎬 アニメーション設計

### staggerIn（唯一の許可されたアニメーション）

シーン切替時に `.content` の直下要素が順番に下からフェードインする。以下のCSSを `style.css` 末尾に**必ず**含める：

```css
.content > * {
    animation: staggerIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.content > *:nth-child(1) { animation-delay: 0s; }
.content > *:nth-child(2) { animation-delay: 0.12s; }
.content > *:nth-child(3) { animation-delay: 0.24s; }
.content > *:nth-child(4) { animation-delay: 0.36s; }
.content > *:nth-child(5) { animation-delay: 0.48s; }
.content > *:nth-child(6) { animation-delay: 0.60s; }
.content > *:nth-child(7) { animation-delay: 0.72s; }
.content > *:nth-child(8) { animation-delay: 0.84s; }

@keyframes staggerIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
```

### アニメーション方針（厳守）

| 区分 | ルール |
|------|--------|
| **必須** | staggerIn（上記CSS） |
| **推奨** | 静的SVG図解、CSSバーチャート（`width: var(--w)`） |
| **完全禁止** | `canvas` 要素（TSX変換で削除される） |
| **完全禁止** | CSS `transition`（Remotionでは動作しない） |
| **完全禁止** | staggerIn以外の `animation` / `@keyframes`（レンダリング時にカクつく） |
| **完全禁止** | `infinite` アニメーション |

> **理由**: Remotionはフレームキャプチャ方式のため、CSS animationのリアルタイムとフレーム時間が同期しない。staggerInだけは0.6秒で完了する一発動作であり、Reactコンポーネントの再マウントでリトリガーされるため問題ない。

---

## 🏗️ 情報密度の確保

### 各シーンの多層情報構造（必須）
すべてのシーンは最低 **3つの情報層** で構成する：
1. **シーンタイトル**: `<h2 class="scene-title">`
2. **メインビジュアル**: カード、SVG図解、比較表等
3. **出典・根拠** (データ引用時): `.source-badge`

### カスタムビジュアルの必須作成
パターンカタログだけでは不十分。各プロジェクトで最低 **8個以上のカスタムSVG図解** をテーマに合わせて新規作成する。

| シーンタイプ | 全体に占める割合 |
|-------------|-----------------|
| パワポ型（パターンカタログベース） | 30〜50% |
| **図解型（カスタムSVG）** | **50〜70%** |

SVG図解の推奨技法：
- 断面図・構成図: `<rect>`, `<polygon>`, `<circle>` + `<text>` ラベル
- 波形描画: `<path>` で曲線を描画
- グリッド・行列: `<line>` でグリッド + `<rect>` でハイライト
- 手書き風: `stroke-dasharray` で破線、大きめ角丸 (`rx="12"`)

---

## ⚠️ CSS設計の注意点（TSX変換対策）

| ルール | 理由 |
|--------|------|
| HTMLで参照するCSSクラスは必ず `style.css` に定義 | 未定義クラスはスタイルなしで表示 |
| `<canvas>` 要素は使用しない | TSX変換で自動削除される |
| `transition` は使用しない | Remotionでは動作しない |
| シーン区切りは `<!-- ===== Scene N: ... ===== -->` 形式 | 変換スクリプトが検出 |
| inline style: `style="--w:76%"` OK | 変換スクリプトが `style={{ '--w': '76%' } as React.CSSProperties}` に変換 |
| inline style: `style="margin-top:1.5rem"` OK | `style={{ marginTop: '1.5rem' }}` に変換 |
| SVG属性: kebab-case (`stroke-width`) OK | 自動でcamelCase (`strokeWidth`) に変換 |
| **`.timeline` クラスは使用禁止** | 他プロジェクトからCSSリークが発生する（border-left等） |

---

## 💻 出力先

```
presentation/{project_id}/
├── index.html    ← TSX変換元
├── style.css     ← Remotionにコピー
└── script.js     ← シーン切替制御（Remotionでは不使用）
```

## ⛔ 禁止事項
- ファイル生成後にブラウザで開いて確認する行為は行わない
- ダークテーマ / ブラックテーマ

## 生成手順

### Step 1: 構造設計（内部処理）
台本全体を読み、ブロック分割・各ブロックのシーン構成・カラーパレットを内部で決定する。

### Step 2: 3ファイル一括生成
`index.html`, `style.css`, `script.js` を一度に全て生成する。

**生成時チェックリスト:**
- [ ] 全シーンに `<!-- ===== Scene N: タイトル ===== -->` コメントがあるか
- [ ] シーン数が台本の SCENE マーカー数と一致するか
- [ ] `.content > *` に staggerIn が適用されるか（CSS末尾にstagger定義があるか）
- [ ] `<canvas>` 要素を使用していないか
- [ ] `transition` を使用していないか
- [ ] staggerIn以外の `@keyframes` を使用していないか
- [ ] Google Fonts（Zen Maru Gothic）を読み込んでいるか
- [ ] `--text-light` が `#1a1d23` になっているか（グレー禁止）
- [ ] `.subtitle-text`, `.footnote`, `.source` が `display:none` か
- [ ] カスタムSVG図解が8個以上含まれているか
- [ ] ライトテーマ（白系背景）であるか
- [ ] **台本に登場する技術名・サービス名に対応するロゴSVGが配置されているか**
- [ ] **複数技術を列挙するシーンで、各技術のロゴが並べて表示されているか**
- [ ] **`.timeline` クラスを使用していないか（CSSリーク防止）**
