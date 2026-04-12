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
    --fs-body: 24px;    --fs-caption: 22px;    --fs-small: 18px;
}
```

---

## 🔧 技術ロゴ: devicon（メイン）+ theSVG（サブ）

技術・言語・ツール・企業のロゴは **`<img>` タグ** で配置する。インラインSVGでロゴを手書き再現することは**完全禁止**。

### アイコンソースの優先順位

1. **devicon CDN**（メイン） — プログラミング言語・開発ツール・フレームワークに強い
2. **Iconify API**（サブ） — devicon に無いブランドやゲーム等を補完（`mdi`, `simple-icons`, `game-icons` 等の集約API）
3. **theSVG**（サブ） — 上記に無いブランド（暗号通貨、企業サービス等）を補完
4. **テキストバッジ** — どこにも無い場合の最終手段

> 🚨 **必ずdeviconを先に確認し、存在しない場合のみIconify/theSVGを使う。** 同一プロジェクト内でソースが混在しても問題ない（どちらも `<img>` タグなのでCSS制御は共通）。

### 🚨 ワードマーク vs アイコンの確認（必須）

`simple-icons` のアイコンはブランドの**ワードマーク（横長のテキストロゴ）**であることが多い（例: `simple-icons/minecraft` はMinecraftの文字ロゴ）。ワードマークはカード内やスライド上で非常に小さく見える。

**必ず以下の手順でアイコンの形状を確認すること:**
1. Iconify APIのURLに `?color=%23000&width=72&height=72` を付けてブラウザでプレビュー
2. ワードマーク（横長文字）の場合 → `mdi` プレフィックスの同名アイコンを探す（例: `mdi/minecraft` はクリーパー顔の正方形アイコン）
3. `mdi` にも無い場合 → テキストバッジで代替

| ❌ ワードマーク（横長・小さく見える） | ✅ アイコン（正方形・大きく見える） |
|--------------------------------------|--------------------------------------|
| `simple-icons/minecraft` | `mdi/minecraft` |
| `simple-icons/playstation` | `mdi/playstation` |

### CDN URL形式

```
# devicon（メイン）
https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-original.svg

# Iconify API（サブ） — 色・サイズをURLパラメータで指定可能
https://api.iconify.design/{prefix}/{name}.svg?color=%23{hex}&width={px}&height={px}
# 例: https://api.iconify.design/mdi/minecraft.svg?color=%23059669&width=72&height=72

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
| **特定の技術名・企業名が登場したとき** | devicon → theSVG → テキストバッジの順で`<img>`または`<image>`を**必ず**表示 | 「Dockerとは」→ devicon、「Ethereumとは」→ theSVG |
| **複数技術を列挙・比較するとき** | すべてのロゴを**並べて**表示（ソース混在OK） | Python(devicon), Ethereum(theSVG)を一列に |
| **歴史・変遷を語るとき** | 各時代のキーテクノロジーのロゴを配置 | 各ロゴ入りfc-nodeカード |
| **SVG図解内で企業名に言及するとき** | SVG内で `<image href="...">` を使う | Meta収益のSVG内にFacebookロゴ |
| **抽象的議論のとき** | 無理にアイコンを入れない | テキスト中心でOK |

> 🚨 **定量ルール: 台本に登場する固有名詞（技術名・企業名・サービス名）のうち、deviconまたはtheSVGにアイコンが存在するものは全シーンを通じて少なくとも1回は `<img>` または `<image>` で表示すること。**テキストのみで済ませてはならない。
> SVG `<svg>` 内で企業ロゴを配置する場合は `<image href="URL" x="..." y="..." width="..." height="..."/>` を使う（`<img>` はSVG内では無効）。

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

## 🎨 概念図解: カスタムインラインSVG（最重要）

> 🚨 **カードとテキストだけの「パワポ的」スライドは禁止。** データや概念を扱うシーンでは、テーマに合ったカスタムSVG図解を積極的に使い、視覚的な面白みを出すこと。CSSクラスベースのパターン（カード・リスト等）はSVG図解を補完する役割であり、全シーンの主役にしてはならない。

### SVG図解を使うべきシーン

| シーン内容 | SVG図解の例 |
|-----------|-----------|
| 仕組み・構造の説明 | 人体+センサー配置、脳の部位、回路図、メモリ構造 |
| データ・統計 | ゲージ式メーター、人物アイコングリッド、比率バー |
| 時系列・プロセス | SVGタイムライン軸+ノード、フロー矢印 |
| 因果関係・ネットワーク | ハブ&スポーク放射図、原因→結果の矢印 |
| 比較・対照 | 波形の並置、左右スプリットの状態比較 |
| 事件・ストーリー | シルエット+経過矢印+結果ボックス |

### SVGサイズ制約（Remotion互換・必須）

Remotionでは `.content` が **880×420px**（scale 2x）で描画される。SVGはこの中に scene-title や body-text と**縦方向に共存**するため、高さ制約に特に注意すること:

| 項目 | 制約 |
|------|------|
| **幅** | 最大 **780px**（`viewBox` の幅。CSSで `max-width:100%` が適用されるため880pxに自動縮小） |
| **高さ** | 最大 **240px**（scene-title + body-text と共存する場合）、**300px**（SVGのみの場合） |
| **フォントサイズ** | 最小 **18px**（2x scaleで36px相当。スマホ視聴で読める下限） |
| **ラベル数** | 1つのSVG内のテキスト要素は控えめに。図解がメイン、テキストはラベル |

> 🚨 **はみ出し防止**: Remotion用slides.cssに `.content svg { max-width: 100%; height: auto; max-height: 260px; }` を必ず設定すること。HTMLで `width="780"` `height="300"` としても、この制約で自動縮小される。
> viewBoxの**縦横比**が重要: `viewBox="0 0 780 300"` は 780:300 ≒ 2.6:1 の比率で描画される。高さを抑えたい場合は viewBox の height を小さくすること（例: `viewBox="0 0 780 220"`）。

### SVG図解の技法

- 形状 : USBコネクタ、3Dパースのサイコロ（`<polygon>`で3面描画）など
- 人体・臓器・脳: `<ellipse>`, `<path>` でシルエット + `<line stroke-dasharray>` でセンサー接続
- 波形・ノイズ: `<path>` + `stroke-linecap="round"` で不規則な振幅の信号波形
- 散布図: `<circle>` を30個以上配置し、均一分布 vs 偏った分布を左右対比
- 密度対比: 同じ領域に大量のドット vs 数個のドットで「空間の縮小」を表現
- メタファー: 南京錠（`<path>`でシャックル + `<rect>`で本体）、カメラレンズ（同心円）
- 群衆: 下記「人物アイコン」テンプレートを格子配置、色分けで分類
- チップ断面: `<rect>` + ピン（`<line>`）でCPUダイを表現、内部ブロックは控えめに
- ゲージ: 重ねた `<rect>` で充填率を表現（bar-fillのSVG版）
- ハブ&スポーク: 中央ノードから `<line>` で放射状に接続

### 🚨 人物アイコンのテンプレート（必須）

SVG内で「人」「ユーザー」を表現する場合、以下の**頭+肩シルエット**テンプレートを使う。`<circle>` 1個だけのドットや、`<circle>` + `<path d="M.. Q.. ..">` の雑な棒人間は**禁止**。

```html
<!-- 単体の人物アイコン（中サイズ） -->
<circle cx="CX" cy="CY" r="14" fill="COLOR"/>
<path d="M{CX-20} {CY+18} C{CX-20} {CY+5} {CX+20} {CY+5} {CX+20} {CY+18} L{CX+20} {CY+28} Q{CX} {CY+36} {CX-20} {CY+28} Z" fill="COLOR"/>

<!-- 小型の人物アイコン（群衆用） -->
<g fill="COLOR"><circle cx="CX" cy="CY" r="10"/><path d="M{CX-15} {CY+18} C{CX-15} {CY+9} {CX+15} {CY+9} {CX+15} {CY+18} L{CX+15} {CY+26} Q{CX} {CY+32} {CX-15} {CY+26} Z"/></g>
```

**CX, CY, COLOR** を差し替えて使う。肩部分の `path` は頭の `circle` に合わせて上下位置を調整する。

| 用途 | 頭の半径 | 使用例 |
|------|---------|--------|
| メインの人物（図解の主役） | r=14〜18 | RTBの「あなた」、データの値段の人物 |
| 群衆・統計の人数表現 | r=8〜10 | プライバシーパラドックスの81%、監視資本主義の人物群 |
| 背景の装飾 | r=6〜8 | ハブ&スポーク中央の小さな人物 |

### 🚨 手描き禁止: 外部SVG素材を使うべきもの

国旗・企業ロゴ・複雑なシンボルはインラインSVGで再現しない。`<img>` タグで外部リソースを使う:

| 対象 | ソース | 形式 |
|------|--------|------|
| **国旗** | `https://flagicons.lipis.dev/flags/4x3/{code}.svg` | `<img>` |
| **技術ロゴ** | devicon CDN / theSVG | `<img>` |
| **企業ロゴ** | theSVG | `<img>` |

```html
<!-- 国旗の例 -->
<img src="https://flagicons.lipis.dev/flags/4x3/us.svg">
<img src="https://flagicons.lipis.dev/flags/4x3/jp.svg">
```

> カスタムSVGで描くのは「概念図解」（構造・関係・データの可視化）のみ。既存の記号・ロゴ・国旗の再現には外部素材を使う。

---

## 📸 人物写真の自動取得（Wikipedia API）

台本に登場する**実在の人物**（科学者・開発者・経営者など）は、SVGシルエットではなく**Wikipedia の実写サムネイル画像**を使う。人物の顔写真があるとスライドの説得力と視覚的な引きが格段に上がる。

### 取得方法

**Wikipedia REST API** でサムネイル画像URLを自動取得し、ローカルにダウンロードする:

```bash
# 1. Wikipedia REST APIで画像URLを取得
curl -s "https://en.wikipedia.org/api/rest_v1/page/summary/{Wikipedia_article_title}" \
  | python -c "import sys,json; d=json.load(sys.stdin); print(d.get('thumbnail',{}).get('source','NO_IMAGE'))"

# 2. ローカルにダウンロード
curl -s -L -o "slides/images/{name}.jpg" "{thumbnail_url}"
```

**Wikipedia記事タイトルの探し方:**
- 英語名がそのまま記事タイトルになることが多い（例: `Ken_Perlin`, `John_von_Neumann`, `Markus_Persson`）
- 日本語版にしかない人物は `https://ja.wikipedia.org/api/rest_v1/page/summary/{title}` を使う
- `NO_IMAGE` が返ったらその人物の写真は取得不可 → SVGシルエットにフォールバック

### 対象の判断基準

| 対象 | 例 | 取得する？ |
|------|-----|-----------|
| 台本で名前付きで登場する実在人物 | フォン・ノイマン、ケン・パーリン、Notch | ✅ 必ず取得を試みる |
| 台本で名前は出ないが文脈上重要な人物 | — | ❌ 不要 |
| 架空のキャラクター | ずんだもん、めたん | ❌ 不要 |
| 企業・組織 | Google, Minecraft@Home | ❌ ロゴで対応 |

### HTMLでの配置

人物写真は **`.photo-text-row`** レイアウトで、写真とテキスト/図解を横並びにする:

```html
<div class="photo-text-row">
    <figure class="photo-frame">
        <img src="images/{name}.jpg" alt="人物名">
    </figure>
    <div class="photo-text-side">
        <!-- 引用ブロック、SVG図解、テキストなど -->
    </div>
</div>
```

### 必須CSS（style.css に追加）

```css
/* Photo + text layout */
.photo-text-row {
    display: flex;
    align-items: center;
    gap: 32px;
    width: 100%;
    justify-content: center;
}

.photo-frame {
    flex-shrink: 0;
    width: 220px;
    height: 280px;
    border-radius: var(--radius);
    overflow: hidden;
    border: 3px solid var(--border);
    background: var(--card-bg);
}

.photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.photo-frame figcaption {
    display: none;
}

.photo-text-side {
    flex: 1;
    max-width: 700px;
}
```

### Remotion用 slides.css オーバーライド

```css
/* Photo layout for Remotion (960x440 scaled 2x) */
.photo-text-row { gap: 12px; }
.photo-frame { width: 110px; height: 140px; border-width: 2px; }
.photo-text-side { max-width: 500px; }
```

### 画像ファイルの配置

```
projects/{project_id}/slides/
├── images/           ← 人物写真を格納
│   ├── ken_perlin.jpg
│   └── von_neumann.gif
├── index.html
├── style.css
└── script.js
```

### Remotionでの画像参照

Remotionではローカル画像の相対パスは解決できない。**必ず `staticFile()` を使う**こと:

1. 画像を `engine/public/images/` にコピーする
2. TSX内で `import { staticFile } from "remotion"` を追加
3. `<img src="images/foo.jpg">` → `<img src={staticFile("images/foo.jpg")}/>` に変換

```tsx
import { staticFile } from "remotion";
// ...
<img src={staticFile("images/ken_perlin.jpg")} alt="ケン・パーリン" />
```

> 🚨 `src="images/..."` のままだとRemotionで表示されず代替テキストになる。TSX変換時にローカル画像パスを `staticFile()` でラップすること。

### 生成手順への組み込み

Step 1（構造設計）の段階で:
1. 台本から実在の人物名を抽出する
2. Wikipedia REST APIで各人物のサムネイル画像URLを取得
3. `slides/images/` にダウンロード
4. 取得できなかった人物はSVGシルエット（従来の頭+肩テンプレート）にフォールバック

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

### 🚨 PowerPoint症候群の禁止
CSSクラスパターン（カード・リスト・引用等）だけで全シーンを構成すると単調になる。以下を守ること:
- **全20シーン中、少なくとも8シーン以上にカスタムインラインSVG図解を含める**
- 同じパターン（例: `arch-card` × 3枚）を3シーン以上連続させない
- SVG図解とCSSパターンを1シーン内で組み合わせるのも有効（例: SVG + `.source`）

**🚨 汎用フローチャートの禁止（最重要）:**
`rect + text + arrow` を並べただけの汎用的なフローチャートはPowerPointと変わらない。SVG図解は**テーマ固有の視覚表現**でなければならない。

| ❌ 汎用フロー（禁止） | ✅ テーマ固有の図解 |
|----------------------|-------------------|
| `[入力A] → [処理] → [出力B]` の箱と矢印 | 3Dパースのサイコロ、CPUのピン付きダイ図 |
| `[Before] → [After]` の2つの箱 | 大量のドット→数個に激減する視覚的対比 |
| `[ステップ1] → [ステップ2] → [ステップ3]` | 南京錠が開くメタファー、波形ノイズ図 |
| 3つの箱を横に並べた比較 | 散布図の均一分布 vs 帯状集中の対比 |

**🚨 情報密度のルール:**
- リストやカードで要素を並べるシーンに、下部にサブテキストで要約を繰り返さない（音声が担う）
- 1シーンの主張は1つ。図解が伝えるメッセージ＝シーンタイトルで十分
- 「注釈rect」「警告バー」を図解の下に追加しない。図解自体で伝わるように描く

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

### 🚨 Remotionスケーリングとサイズ設計（重要）

HTMLは **1920×1080px** で設計するが、Remotionでは **960×440px を 2x スケール** で描画する。つまり `.content` の実効サイズは **880×420px** しかない。HTML設計時の1540pxの要素は Remotion上では約880pxに縮小される。

**このスケーリングの影響を必ず考慮すること:**

| HTML設計時 | Remotion実効 | 注意点 |
|-----------|-------------|--------|
| `.content` 1540px幅 | 880px幅 | SVGの `width="780"` は自動縮小されるが高さ比率は維持 |
| font-size: 36px | 実質36pxのまま（2xで72px表示） | 問題なし |
| SVG height="300" | `max-height:260px` で制約 | scene-title + SVG + body-text の合計が420pxを超えないこと |
| `.logo-img` height:72px | 72px（2xで144px表示） | HTML設計では大きく見えるがRemotionでは適切 |
| `.card` padding:32px | 2xで64px表示 | Remotion上では大きすぎる。Remotion用CSSでは12〜16pxに縮小が必要 |

> 🚨 **Remotion用 `slides.css` ではプロジェクト固有セクションで以下を必ずオーバーライドすること:**
> ```css
> .content { gap: 6px; }
> .content svg { max-width: 100%; height: auto; max-height: 260px; }
> .scene-title { margin-bottom: 6px; }
> ```
> カード・引用・バッジ・リスト等の padding / font-size / gap は HTML設計時の **約50〜60%** に縮小する。

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
- [ ] **`<img src=` または `<image href=` が1つ以上あるか（ロゴ・アイコンの使用確認）**
- [ ] **台本に登場する企業名・サービス名・技術名のアイコンがdeviconまたはtheSVGで配置されているか**
- [ ] **SVG内の人物表現が「頭+肩シルエット」テンプレートに従っているか（`<circle>`1個のドットや雑な棒人間は禁止）**
- [ ] **SVGの `height` が scene-title + body-text との合計で420px（Remotion実効値）を超えないか（目安: SVG heightは240px以下）**
- [ ] **外部アイコンがワードマーク（横長文字）ではなく正方形アイコンか（`simple-icons` はワードマークが多い → `mdi` で代替を検討）**
- [ ] **Iconify APIのURLが実在するか（ブラウザまたは `curl` で200応答を確認）**
- [ ] **台本に登場する実在の人物の写真をWikipedia APIで取得し `slides/images/` に配置したか（取得不可の場合はSVGシルエットにフォールバック）**
