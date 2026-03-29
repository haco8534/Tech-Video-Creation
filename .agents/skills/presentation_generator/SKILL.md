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

## 📐 画面寸法（必須）

Remotion変換後の最終表示は1920×1080px。HTMLスライドは以下の論理寸法で設計する：

```html
<meta name="viewport" content="width=1920,height=1080">
```

```css
.scene {
    width: 100%; height: 100vh; position: absolute; top: 0; left: 0;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; background: var(--bg); overflow: hidden;
}
.scene.active { opacity: 1; pointer-events: auto; }

.content {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    width: 1540px; max-height: 860px; padding: 20px; z-index: 2; position: relative;
}
.center-layout { text-align: center; }
```

> 🚨 **960×440pxで設計しないこと**。それはRemotion変換後のCSS値であり、HTML設計段階では1540×860pxのコンテンツ領域で設計する。Phase C1でRemotionのslides.cssに `width:960px; height:440px; transform:scale(2)` が適用される。

### 全シーン center-layout 必須

すべてのシーンで `<div class="content center-layout">` を使用する。左寄せレイアウトは禁止。

---

## 📏 シーン設計ルール

### シーン分割の粒度
- 会話の展開や説明フェーズが変わるごとにこまめにシーンを切り替える
- オープニング・まとめ等の「会話のみのセクション」にも必ずシーンを作成する

### 🚨 SCENEマーカーとHTMLシーンの1:1対応（絶対ルール）
台本の `<!-- SCENE: ... -->` マーカーとHTMLの `<div class="scene">` は**完全に1:1で対応**しなければならない。台本にN個のSCENEマーカーがあれば、HTMLにもちょうどN個。順序も完全一致。独自追加・統合・順序変更はすべて禁止。

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

### 🚨 要素数制限（はみ出し防止）

`.content` の直下要素数を **最大5つ** に制限する（staggerIn定義も6つまで）。

| シーンタイプ | .content直下の最大要素数 | 例 |
|-------------|------------------------|---|
| テキスト強調 | 3〜4 | scene-title + big-statement + source-badge |
| メトリクス | 4〜5 | scene-title + metric-grid + bar-chart + source-badge |
| 比較対照 | 3〜4 | scene-title + two-col + caption |
| フロー図 | 3〜4 | scene-title + flow-chain + big-statement |

**カードの並べ方制限:**
- 横並びカード: **最大3枚**（`.three-col`）
- グリッドカード: **最大5枚**（`flex-wrap`で自動折返し、6枚以上は禁止）
- num-list: **最大3項目**

---

## 🎨 デザインルール

### フォント（必須）
CSS冒頭で `@import` する（`<head>` の `<link>` は不要）：
```css
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap');
```

### テーマとトーン
- **ライトテーマ（白系背景）必須**。ダークテーマは完全禁止
- **フラットデザイン**を基本とし、過度な装飾を避ける

### 🚨 データ出典の明記（必須）

数値・統計・調査結果を表示するシーンには、必ず **`.source`** クラスで出典を明記する。出典のないデータは視聴者の信頼を損なうため禁止。

```html
<div class="metric-card">
    <div class="metric-value accent-primary">89%</div>
    <div class="metric-label">利用経験率</div>
</div>
<!-- ↑のようなデータの後に必ず出典を添える -->
<div class="source">出典: State of JS 2024</div>
```

**ルール:**
- 調査名・レポート名・年度を含めること（例: `State of JS 2024`, `GitHub Octoverse 2024`）
- メトリクスカード、バーチャート、数値インパクト等のデータ表示シーンが対象
- 歴史的事実（「1995年にJS誕生」等）には不要
- `.source` は `display:none` にしない（表示する）
- **CSSリーク対策**: 他プロジェクトの `.source { display:none }` が上書きするため、`.content .source { display:block !important; }` で定義すること

### 🚨 脱AI感デザイン原則

| ❌ 禁止 | ✅ 代替 |
|---------|---------|
| 背景グラデーション (`linear-gradient` 等) | 単色ベタ塗り (`#f8f9fa` 等) |
| カード全面グラデーション | 単色背景 + ボーダー |
| 虹色・ネオン系装飾 | 2〜3色の抑制的配色 |
| 全シーン左右対称レイアウト | 非対称・余白の偏り |
| 全シーン同一レイアウト | シーンごとにレイアウト変化 |
| グレーテキスト (`#6b7280` 等) | `#1a1d23`（メインと同色） |
| 全スライドに補足サブテキスト | `.subtitle-text`, `.footnote` は `display:none` |
| 画面左上への章タイトル配置 | Remotion側で自動付与されるため不要 |

### 🚨 inline style 最小化

inline styleは以下の場合**のみ**許可する:
- `style="--w:70%"` — CSSカスタムプロパティの値注入（bar-fill等）
- `style="border-top:4px solid var(--coral)"` — カード個別の装飾バリエーション
- `style="vertical-align:middle"` — アイコン位置調整の1プロパティ

**禁止:**
- `display:flex; gap:24px; align-items:center; ...` のような複数プロパティ → CSSクラスを定義する
- `font-size:16px; font-weight:700` のようなタイポグラフィ → CSSクラスを使う
- `margin-bottom:16px` → CSSクラスまたは既存クラスの margin で対応

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

---

## 🔧 技術ロゴ: devicon（メイン）+ theSVG（サブ）

技術・言語・ツール・企業のロゴは **`<img>` タグ** で配置する。インラインSVGでロゴを手書き再現することは**完全禁止**。

### アイコンソースの優先順位

1. **devicon CDN**（メイン） — プログラミング言語・開発ツール・フレームワークに強い
2. **theSVG**（サブ） — deviconに無いブランド（暗号通貨、企業サービス等）を補完
3. **テキストバッジ** — どちらにも無い場合の最終手段

> 🚨 **必ずdeviconを先に確認し、存在しない場合のみtheSVGを使う。** 同一プロジェクト内でソースが混在しても問題ない（どちらも `<img>` タグなのでCSS制御は共通）。

### CDN URL形式

```
# devicon（メイン）
https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-original.svg

# theSVG（サブ）
https://www.thesvg.org/icons/{slug}/default.svg
```

### 使用例
```html
<!-- devicon: プログラミング言語 -->
<div class="arch-card">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg">
    <div class="card-title">Rust</div>
</div>

<!-- theSVG: deviconに無いブランド -->
<div class="arch-card">
    <img src="https://www.thesvg.org/icons/ethereum/default.svg">
    <div class="card-title">Ethereum</div>
</div>

<!-- テキストバッジ: どちらにも無い場合 -->
<div class="arch-card">
    <div class="text-badge">DeFi</div>
    <div class="card-title">分散型金融</div>
</div>
```

### devicon 主要アイコン名一覧

| カテゴリ | name |
|---------|------|
| 言語 | `python`, `javascript`, `typescript`, `java`, `c`, `cplusplus`, `rust`, `go`, `ruby`, `swift`, `kotlin`, `php`, `csharp` |
| フレームワーク | `react`, `vuejs`, `angular`, `nextjs`, `svelte`, `django`, `flask`, `rails` |
| インフラ | `docker`, `kubernetes`, `nginx`, `amazonwebservices`, `googlecloud`, `azure` |
| OS | `linux`, `windows11`, `apple` |
| ツール | `git`, `github`, `gitlab`, `vscode`, `nodejs`, `npm` |
| DB | `postgresql`, `mysql`, `mongodb`, `redis` |
| その他 | `android`, `unrealengine`, `unity`, `cloudflare`, `embeddedc`, `solidity`, `facebook` |

### theSVG で補完するアイコン例（deviconに無いもの）

| ブランド | slug | 用途例 |
|---------|------|--------|
| Ethereum | `ethereum` | 暗号通貨・ブロックチェーン |
| Bitcoin | `bitcoin` | 暗号通貨 |
| Stripe | `stripe` | 決済 |
| Figma | `figma` | デザインツール |
| Notion | `notion` | ドキュメント |
| Discord | `discord` | コミュニケーション |

> deviconにもtheSVGにも存在しない場合のみ、テキストバッジ `<div class="text-badge">XX</div>` で代替する。SVGで手書き再現しない。

### ロゴ配置の判断基準（文脈駆動）

| いつ使うか | どう使うか | 例 |
|-----------|-----------|----|
| **特定の技術名が登場したとき** | devicon → theSVG → テキストバッジの順で`<img>`を**必ず**表示 | 「Dockerとは」→ devicon、「Ethereumとは」→ theSVG |
| **複数技術を列挙・比較するとき** | すべてのロゴを**並べて**表示（ソース混在OK） | Python(devicon), Ethereum(theSVG)を一列に |
| **歴史・変遷を語るとき** | 各時代のキーテクノロジーのロゴを配置 | 各ロゴ入りfc-nodeカード |
| **抽象的議論のとき** | 無理にアイコンを入れない | テキスト中心でOK |

### CSSでのロゴサイズ制御

ロゴサイズはCSS側で統一管理する（HTMLで毎回width/heightを書かない）:
```css
.arch-card img { display: block; margin: 0 auto 10px; width: 48px; height: 48px; }
.enterprise-card img { display: block; margin: 0 auto 8px; width: 40px; height: 40px; }
.fc-node img { display: block; margin: 0 auto 6px; width: 40px; height: 40px; }
.icon-cloud img { width: 48px; height: 48px; }
.icon-row img { width: 56px; height: 56px; }
```

---

## 🎨 概念図解: カスタムSVG（ロゴ以外）

devicon以外のビジュアル（概念図、構造図、対比図）は**カスタムインラインSVG**で作成する。ただし以下のルールに従う:

### SVGの用途を限定する

| ✅ カスタムSVGが適切 | ❌ deviconを使うべき |
|---------------------|---------------------|
| 所有権システムの構造図 | Rust / C++ のロゴ |
| メモリ参照の概念図 | Python / JavaScript のロゴ |
| 建物・盾などの抽象アイコン | Google / Microsoft のロゴ |
| アーキテクチャ図 | Docker / Linux のロゴ |

### SVG図解の推奨技法
- 断面図・構成図: `<rect>`, `<polygon>`, `<circle>` + `<text>` ラベル
- 波形描画: `<path>` で曲線を描画
- グリッド・行列: `<line>` でグリッド + `<rect>` でハイライト
- 手書き風: `stroke-dasharray` で破線、大きめ角丸 (`rx="12"`)

### フラット背景パターン（グラデーションの代替）
```css
.bg-dots { background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px); background-size: 24px 24px; }
.bg-grid { background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px); background-size: 40px 40px; }
```

---

## 🧩 ビジュアルパターンカタログ

台本の `<!-- SCENE: ビジュアルパターン | シーン見出し -->` マーカーに対応するパターン。各パターンは `.scene` > `.content.center-layout` 内に配置する。

| # | パターン名 | 用途 | 主要CSSクラス |
|---|-----------|------|--------------|
| 1 | タイトルカード | セクション見出し・テーマ転換 | `.center-layout`, `.title-large` |
| 2 | テキスト強調 | キーワード・メッセージを大きく表示 | `.big-statement`, `.accent-primary` |
| 3 | 数値インパクト | 大きな数値で印象付け（★deviconロゴ必須） | `.metric-card`, `.metric-value` |
| 4 | 段階的リスト | 3項目のナンバー付きリスト | `.num-list`, `.num-item`, `.num-circle` |
| 5 | 比較対照 | 2概念を左右並べて比較（★各カードにdeviconロゴ必須） | `.two-col`, `.compare-card` |
| 6 | 横並びカード | 並列する複数項目（最大3枚） | `.three-col`, `.arch-card` |
| 7 | 引用カード | 論文・著名人の引用 | `.quote-block`, `.quote-mark`, `.quote-body` |
| 8 | フロー図 | 歴史的変遷・プロセスの流れ（★各ノードにdeviconロゴ必須） | `.flow-chain`, `.fc-node`, `.fc-arr` |
| 9 | バーチャート | データの視覚化 | `.bar-chart`, `.bar-row`, `.bar-fill` |
| 10 | タグクラウド | 複数キーワードをカラフル表示 | `.tag-row`, `.tag` |
| 11 | コードビジュアル | コード・ターミナル表示 | `.code-box`, `.code-head`, `.code-body` |
| 12 | アーキテクチャ図 | 階層/スタック構造 | `.layer-stack`, `.layer-row` |
| 13 | エンタープライズ | 企業ロゴ+説明の一覧（最大5枚） | `.enterprise-grid`, `.enterprise-card` |

> ⚠️ **タイムラインパターンは廃止**。時系列の表現には「フロー図」（`.flow-chain` + `.fc-node`）を使う。
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

## ⚠️ CSS設計の注意点（TSX変換対策）

| ルール | 理由 |
|--------|------|
| HTMLで参照するCSSクラスは必ず `style.css` に定義 | 未定義クラスはスタイルなしで表示 |
| `<canvas>` 要素は使用しない | TSX変換で自動削除される |
| `transition` は使用しない | Remotionでは動作しない |
| シーン区切りは `<!-- ===== Scene N: ... ===== -->` 形式 | 変換スクリプトが検出 |
| inline style: `style="--w:76%"` OK | 変換スクリプトが `style={{ '--w': '76%' } as React.CSSProperties}` に変換 |
| SVG属性: kebab-case (`stroke-width`) OK | 自動でcamelCase (`strokeWidth`) に変換 |
| **`.timeline` クラスは使用禁止** | 他プロジェクトからCSSリークが発生する（border-left等） |

---

## 💻 出力先

```
projects/{project_id}/slides/
├── index.html    ← TSX変換元
├── style.css     ← Remotionにコピー
└── script.js     ← シーン切替制御（Remotionでは不使用）
```

## ⛔ 禁止事項
- ファイル生成後にブラウザで開いて確認する行為は行わない
- ダークテーマ / ブラックテーマ
- 技術ロゴをインラインSVGで手書き再現すること（devicon CDNを使う）
- `.content` 直下要素を6個以上にすること
- グリッドやカードを6枚以上並べること

## 生成手順

### Step 1: 構造設計（内部処理）
台本全体を読み、ブロック分割・各ブロックのシーン構成・カラーパレットを内部で決定する。
台本に登場する技術名を洗い出し、対応するdeviconアイコン名を確定する。

### Step 2: 3ファイル一括生成
`index.html`, `style.css`, `script.js` を一度に全て生成する。

**生成時チェックリスト:**
- [ ] `<meta name="viewport" content="width=1920,height=1080">` があるか
- [ ] `.scene { width:100%; height:100vh; }` で設計しているか（960×440で設計していないか）
- [ ] `.content { width:1540px; max-height:860px; }` になっているか
- [ ] 全シーンが `<div class="content center-layout">` を使用しているか
- [ ] 全シーンに `<!-- ===== Scene N: タイトル ===== -->` コメントがあるか
- [ ] シーン数が台本の SCENE マーカー数と一致するか
- [ ] `.content > *` に staggerIn が適用されるか（CSS末尾にstagger定義があるか）
- [ ] `.content` 直下要素が各シーン最大5つ以内か
- [ ] `<canvas>` 要素を使用していないか
- [ ] `transition` を使用していないか
- [ ] staggerIn以外の `@keyframes` を使用していないか
- [ ] `--text-light` が `#1a1d23` になっているか（グレー禁止）
- [ ] `.subtitle-text`, `.footnote` が `display:none` か
- [ ] **数値・統計データを表示するシーンに `.source` で出典が明記されているか**
- [ ] ライトテーマ（白系背景）であるか
- [ ] **技術ロゴはすべてdevicon CDNまたはtheSVGの `<img>` タグで配置されているか（インラインSVGで再現していないか）**
- [ ] **カード・グリッドが6枚以上並んでいないか**
- [ ] **inline styleが3プロパティ以上含まれていないか（CSSクラスに分離すべき）**
- [ ] **`.timeline` クラスを使用していないか（CSSリーク防止）**
