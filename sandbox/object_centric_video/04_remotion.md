# [4] Remotion 実装（Composition.tsx）

パイプライン最終段。前段の `design_spec.md` を入力に、`Composition.tsx` を書く。`script.md` のセリフ本文と `design_overall.md` の世界観語彙・レイアウト構造もここで合流する。**仕組み**を規律し、design_spec で決まった設計を Remotion のコードに翻訳する。

## design_spec → コードの対応

| 前段の成果物 | tsx での姿 |
|---|---|
| script.md の対話 + design_spec の event 割り当て | `SCRIPT: ScriptLine[]`（各セリフに `event?`） |
| design_spec の event 一覧 | `eventFrame(e)` で Track のキーフレーム位置に変換 |
| design_spec のライフサイクル契約 | 各オブジェクトの opacity Track ＋ 画面可視性ゲート |
| design_spec の所属レイアウト | レイアウトプリミティブ（HStack/VStack/Grid）の入れ子で実体化 |
| design_overall の世界観語彙（色・形・動き） | ファイル冒頭の定数 ＋ SVG 幾何要素 / `<foreignObject>` HTML の描き方 |
| design_overall の図カタログ（描画区分） | 各図のコンポーネント実装（HTML格納器 = `<foreignObject>`、SVG幾何要素 = `<g>`、合成 = 両者の入れ子） |
| script.md の全セリフ本文 | **対話字幕**（§7）— 全行を画面下部に自動表示 |

**座標は design_spec に無い。** オブジェクトの位置は、所属レイアウト（design_overall で定義した VStack/HStack/Grid の入れ子）が決める。各レイアウトプリミティブが子のサイズから配置を派生計算する。個別オブジェクトの大きさ・キーフレーム数値は preview を見ながら現物合わせで埋める。

## 0. 前提（仕組み側、譲れない4行）

1. **State は数値プロパティのみ**。文字列・enum・bool は使わない。variant 切替は `0..1` の `mix` 値で表現し、コンポーネント内部でクロスフェードする
2. **保持したい区間は両端にキーフレームを置く**。さもないと前後と勝手に補間される
3. **`{phase === 'X' && ...}` は使わない**。可視性は opacity で、位置・サイズは Track で連続変化させる
4. **派生計算でオブジェクトを繋ぐ**。矢印の端点・追従座標などは、繋ぐ相手の現在状態から毎フレーム計算する

**画面境界**は唯一の例外。画面が切り替わる瞬間は、前画面の全オブジェクトを一斉に opacity 0 へ落とし、新画面のオブジェクトを一斉に opacity 1 へ上げる「画面リセット」を行う。原則 1〜4 は画面内で守る。

## 1. プロジェクトの土台

- 1920×1080、30 fps（`Root.tsx` の Composition 設定に合わせる）
- `<svg width={1920} height={1080} viewBox="-960 -540 1920 1080">` で**中心原点座標系**。y は下向き正
- HTML を埋め込むのは `<foreignObject>` 経由。`<foreignObject>` も SVG の座標系の中に置かれるので、画面全体の座標系は SVG のままで統一できる

ファイル冒頭の構成：

```tsx
import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SCRIPT, AnimEvent } from './scriptData';  // §3 参照

// 固定ベース：白テーマ
const BG = '#f5f7fa';
const SURFACE = '#ffffff';
const INK = '#243044';
// アクセント（題材ごと：design_overall の 1.世界観 から）
const ACCENT = '#e08a1e';

// 文字サイズ定数（下記「白テーマと文字サイズ」）
const FS_TITLE = 84;
const FS_LABEL = 52;
const FS_NOTE = 44;
const FS_SYMBOL = 32;

const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';

export const TOTAL_FRAMES = /* §3 で算出 */;
```

### 白テーマと文字サイズ（固定ベース）

| 用途 | サイズ（px） |
|---|---|
| 大見出し・タイトル | 76〜92 |
| 対話字幕 本文 | 52〜58 |
| 図の装置名・主要ラベル | 48〜58 |
| 図中の注記・補足 | 42〜48 |
| 字幕の話者名・セクションタイトル | 40〜46 |
| 記号としての文字（連番・添字、読ませない） | 〜34 |

**読ませる文字の下限は 42px。** これ未満は記号としての文字にのみ許す。フォントサイズ定数（`FS_TITLE` `FS_LABEL` `FS_NOTE` `FS_SYMBOL`）をファイル冒頭に置き、各 `<text>` / HTML の `fontSize` で使う。SVG `<g transform={`scale(...)`}>` で縮小する装置でも、内部のテキストは固定値で持ち、scale の影響から外す。

## 2. トラック補間機構（コピペで使う）

```tsx
type Keyframe<S> = { f: number; state: S };
type Track<S> = Keyframe<S>[];

const ease = Easing.bezier(0.4, 0, 0.2, 1);

const blendNumeric = <S,>(a: S, b: S, t: number): S => {
    const aR = a as unknown as Record<string, number>;
    const bR = b as unknown as Record<string, number>;
    const out: Record<string, number> = {};
    for (const k in aR) out[k] = aR[k] + (bR[k] - aR[k]) * t;
    return out as unknown as S;
};

const resolve = <S,>(track: Track<S>, f: number): S => {
    if (track.length === 0) throw new Error('empty track');
    if (f <= track[0].f) return track[0].state;
    for (let i = 0; i < track.length - 1; i++) {
        const a = track[i], b = track[i + 1];
        if (f >= a.f && f <= b.f) {
            const t = ease((f - a.f) / Math.max(1, b.f - a.f));
            return blendNumeric(a.state, b.state, t);
        }
    }
    return track[track.length - 1].state;
};
```

`ease` 曲線（bezier の値）は題材によって変えてよい。

## 3. 台本とフレーム

`script.md` の全セリフを `SCRIPT[]` にし、design_spec の event 割り当て表どおりに `event?` を付ける。**`script.md` から `scriptData.ts` を生成**し、Composition.tsx は import する。生成は小さなスクリプト（例：`_gen_script.py`）で行い、event 名は「セリフ本文の一意な部分文字列」で機械的に割り当てる。

```ts
// scriptData.ts（script.md から生成、手で編集しない）
export type Speaker = 'めたん' | 'ずんだもん';
export type AnimEvent =
    | 'scene.intro.in' | 'title.in' /* … design_spec の event 一覧 */;
export type ScriptLine = { speaker: Speaker; text: string; event?: AnimEvent };
export const SCRIPT: ScriptLine[] = [
    { speaker: 'めたん',   text: '…', event: 'scene.intro.in' },
];
```

### フレーム計算

```tsx
const CHAR_FRAMES = 4;
const PAUSE_FRAMES = 6;
const MIN_LINE_FRAMES = 40;
const TAIL_FRAMES = 90;

const lineDurations = SCRIPT.map(
    l => Math.max(MIN_LINE_FRAMES, l.text.length * CHAR_FRAMES) + PAUSE_FRAMES,
);
const lineStarts: number[] = [];
lineDurations.reduce((acc, d, i) => ((lineStarts[i] = acc), acc + d), 0);

const eventFrame = (e: AnimEvent): number => {
    const i = SCRIPT.findIndex(l => l.event === e);
    if (i < 0) throw new Error(`event not found: ${e}`);
    return lineStarts[i];
};

export const TOTAL_FRAMES =
    lineStarts[SCRIPT.length - 1] + lineDurations[SCRIPT.length - 1] + TAIL_FRAMES;
```

実音声を付ける場合は §8 のとおり `lineDurations` を実測値に差し替える（Track の組み立てロジックは不変）。

## 4. State 型の設計ルール

### 4.1 数値プロパティのみ

```tsx
type SomeState = { x: number; y: number; size: number; opacity: number; mix: number };
```

variant は **0..1 の mix 値**で持ち、内部で2種類を重ねて opacity でクロスフェードする：

```tsx
<RenderA opacity={mix} />
<RenderB opacity={1 - mix} />
```

### 4.2 カウント駆動

`count: number` を Track で 1→N に上げ、内部で `Math.floor(count)` 個だけ描画：

```tsx
const n = Math.floor(count);
{Array.from({ length: n }).map((_, i) => <Item key={i} index={i} />)}
```

### 4.3 保持区間は必ず両端

```tsx
{ f: eventFrame('x.in'),  state: { ..., v: 64 } },
{ f: eventFrame('x.out'), state: { ..., v: 64 } },
```

両端で同じ値を打つ。片側しか書かないと前後と補間されて意図しない値になる。

## 5. オブジェクトを組む3つの道具

design_overall の図カタログで指定された描画区分（`HTML格納器` / `SVG幾何要素` / `合成`）に従い、3つの道具を使い分ける。**文字を箱に詰めるパーツは原則 `<foreignObject>`、複数オブジェクトの配置は原則レイアウトプリミティブ**——個別座標を `x={…} y={…}` で直書きする箇所を画面トップレベルから減らす。

### 5.1 SVG 幾何要素

文字を含まない図、または記号としての文字のみの図。`rect` `circle` `path` `line` `polygon` `linearGradient` `radialGradient` を直接組み合わせる：

```tsx
type ArrowState = { fromX: number; fromY: number; toX: number; toY: number; opacity: number; thickness: number };

const Arrow: React.FC<ArrowState> = ({ fromX, fromY, toX, toY, opacity, thickness }) => {
    if (opacity <= 0.001) return null;
    return (
        <g opacity={opacity}>
            <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke={INK} strokeWidth={thickness} />
            {/* 矢印頭の三角 ... */}
        </g>
    );
};
```

`linearGradient` の `id` には座標やサイズを混ぜてユニーク化（同じ id が複数 SVG にあると衝突する）。

### 5.2 `<foreignObject>` で HTML を埋め込む（文字格納器）

カード・ラベル・本文ブロックなど、**文字を箱に詰める**部分。`<foreignObject>` 内の HTML+CSS が文字の折返し・中央寄せ・自動サイジングを担う：

```tsx
type CardState = { x: number; y: number; w: number; h: number; opacity: number };
type CardProps = CardState & { label: string };

const LabelCard: React.FC<CardProps> = ({ x, y, w, h, opacity, label }) => {
    if (opacity <= 0.001) return null;
    return (
        <g opacity={opacity}>
            <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: SURFACE,
                        border: `2px solid ${INK}`,
                        borderRadius: 16,
                        padding: '0 28px',
                        fontFamily: FONT,
                        fontSize: FS_LABEL,
                        fontWeight: 700,
                        color: INK,
                        textAlign: 'center',
                        lineHeight: 1.3,
                    }}
                >
                    {label}
                </div>
            </foreignObject>
        </g>
    );
};
```

**ポイント**：

- `<foreignObject>` の `width`/`height` は明示。中の `<div>` は `width:100%; height:100%` で追従し、`display: flex` で中央寄せ
- `box-sizing: border-box` ＋ `padding` で文字と枠の余白が安定する
- 文字幅の見積もりが多少甘くても、CSS が自動で折り返してくれるため **SVG `<text>` のハード overflow（フォントが箱外に描かれる）は起きない**
- `transform`・`opacity` は **外側の `<g>` で掛ける**（`<foreignObject>` 自体への transform は Chromium で挙動が安定しないことがある）
- React は `<foreignObject>` 直下の `<div>` を HTML として正しく描画する。`xmlns` の明示は通常不要

### 5.3 レイアウトプリミティブ（HStack / VStack / Grid）

複数のオブジェクトを並べるときは、**絶対座標を書かずに構造で配置する**。子の自然サイズから親が座標を派生計算する。

子要素は次の形で表現する：

```tsx
type LayoutItem = {
    w: number;
    h: number;
    render: (x: number, y: number) => React.ReactNode;  // 親が決めた中心 (x, y) を受け取って描く
};
```

各リーフは「ファクトリ関数」で自然サイズと描画関数を一緒に返す。

#### HStack

```tsx
type HStackProps = {
    items: LayoutItem[];
    gap?: number;
    cx?: number;  // 全体の中心 x
    cy?: number;  // 各 item の中心 y
};

const HStack: React.FC<HStackProps> = ({ items, gap = 24, cx = 0, cy = 0 }) => {
    const totalW = items.reduce((a, it) => a + it.w, 0) + gap * Math.max(0, items.length - 1);
    let left = cx - totalW / 2;
    return (
        <g>
            {items.map((it, i) => {
                const x = left + it.w / 2;
                left += it.w + gap;
                return <React.Fragment key={i}>{it.render(x, cy)}</React.Fragment>;
            })}
        </g>
    );
};
```

#### VStack

```tsx
type VStackProps = {
    items: LayoutItem[];
    gap?: number;
    cx?: number;
    cy?: number;
};

const VStack: React.FC<VStackProps> = ({ items, gap = 24, cx = 0, cy = 0 }) => {
    const totalH = items.reduce((a, it) => a + it.h, 0) + gap * Math.max(0, items.length - 1);
    let top = cy - totalH / 2;
    return (
        <g>
            {items.map((it, i) => {
                const y = top + it.h / 2;
                top += it.h + gap;
                return <React.Fragment key={i}>{it.render(cx, y)}</React.Fragment>;
            })}
        </g>
    );
};
```

#### Grid

```tsx
type GridProps = {
    items: LayoutItem[];
    cols: number;
    gapX?: number;
    gapY?: number;
    cx?: number;
    cy?: number;
};

const Grid: React.FC<GridProps> = ({ items, cols, gapX = 24, gapY = 24, cx = 0, cy = 0 }) => {
    const rows = Math.ceil(items.length / cols);
    const colW = Array.from({ length: cols }, (_, c) =>
        Math.max(...items.filter((_, i) => i % cols === c).map(it => it.w), 0),
    );
    const rowH = Array.from({ length: rows }, (_, r) =>
        Math.max(...items.slice(r * cols, (r + 1) * cols).map(it => it.h), 0),
    );
    const sum = (arr: number[], n: number) => arr.slice(0, n).reduce((a, b) => a + b, 0);
    const totalW = sum(colW, cols) + gapX * (cols - 1);
    const totalH = sum(rowH, rows) + gapY * (rows - 1);
    return (
        <g>
            {items.map((it, i) => {
                const r = Math.floor(i / cols), c = i % cols;
                const x = cx - totalW / 2 + sum(colW, c) + gapX * c + colW[c] / 2;
                const y = cy - totalH / 2 + sum(rowH, r) + gapY * r + rowH[r] / 2;
                return <React.Fragment key={i}>{it.render(x, y)}</React.Fragment>;
            })}
        </g>
    );
};
```

#### 使用例

```tsx
const makeChip = (props: { label: string; opacity: number }): LayoutItem => {
    const w = measureLabelWidth(props.label, FS_LABEL) + 56;
    const h = FS_LABEL * 1.6 + 32;
    return {
        w, h,
        render: (x, y) => <LabelCard x={x} y={y} w={w} h={h} opacity={props.opacity} label={props.label} />,
    };
};

<HStack
    items={[
        makeChip({ label: '42 KB', opacity: chipOp }),
        makeArrowItem({ opacity: arrowOp }),
        makeMassGrid({ count: gridCount, opacity: gridOp }),
    ]}
    gap={80}
    cy={-40}
/>
```

**自然サイズの計算**：

- 文字を含む箱：`measureLabelWidth(label, fontSize) + paddingX * 2`
- 文字を含まない図：固定値（題材ごとの設計値）
- 文字の見込みが揺れる場合は**やや大きめ**に見積もる。`<foreignObject>` 内の HTML が中央寄せして余白として吸収するため、過大は気にならないが、過小は箱内で折り返しが発生して縦に伸びる

```tsx
const measureLabelWidth = (text: string, fontSize: number) => text.length * fontSize * 1.05;
```

CJK は概ね 1em/字（半角混じりはやや短い）。1.05 は微余裕。

### 5.4 派生計算で繋ぐ（レイアウトを跨ぐ矢印）

レイアウトプリミティブで配置した子要素の **間を繋ぐオブジェクト**（カードを跨ぐ矢印など）は、レイアウトの中ではなく**オーバーレイ層**に書く。位置は子の現在位置から派生計算する。

実用的には、子の最終位置を外で再利用できるようにレイアウト計算を関数化しておく：

```tsx
// HStack の各 item の中心 x を返す関数（同じロジックを抽出）
const computeHStackXs = (items: { w: number }[], gap: number, cx: number): number[] => {
    const totalW = items.reduce((a, it) => a + it.w, 0) + gap * (items.length - 1);
    let left = cx - totalW / 2;
    return items.map(it => {
        const x = left + it.w / 2;
        left += it.w + gap;
        return x;
    });
};

const sizes = [{ w: chipW }, { w: arrowW }, { w: gridW }];
const [chipX, arrowX, gridX] = computeHStackXs(sizes, 80, 0);

<HStack items={[...]} gap={80} cy={-40} />
<Arrow fromX={chipX + chipW / 2} fromY={-40} toX={gridX - gridW / 2} toY={-40} opacity={arrowOp} />
```

オーバーレイ層は画面トップレベルで「最後に描く」（z 上）。多用しない——主役オブジェクトは全部いずれかのレイアウト構造の中に置くのが原則。

### 5.5 文字幅とはみ出し

文字を含む箱は **§5.2 の `<foreignObject>` を使う**。理由：

- CSS が自動で折返し・中央寄せをする
- 自然幅の見積もり（`measureLabelWidth`）が多少ズレても、HTML は破綻せず適切に振る舞う
- SVG `<text>` のような「ハード overflow」が起きない

**SVG `<text>` を使う場面**（限定）：

- 図中の単独テキスト（箱を持たない装置名・ラベル）。1行で済み、折返しがないことが確実なもの
- 図の中の「記号としての文字」（連番・添字、フォントサイズ 〜34px）

**箱の中に文字を入れる構成は、たとえ短い1語でも `<foreignObject>` に倒す**——「短いから大丈夫」と思った瞬間に、表記揺れや仕様変更で文字数が増えて破綻する。

## 6. 画面切替の実装

各画面（design_spec のセクション）は「その画面に属するオブジェクト群を opacity でゲートする1つのスカラー Track」で表現する。

```tsx
type SceneVis = { v: number };
const CROSSFADE = 30;

const introVisTrack: Track<SceneVis> = [
    { f: 0,                                        state: { v: 1 } },
    { f: eventFrame('scene.body1.in'),             state: { v: 1 } },
    { f: eventFrame('scene.body1.in') + CROSSFADE, state: { v: 0 } },
    { f: TOTAL_FRAMES,                             state: { v: 0 } },
];
```

メインで各画面のレイアウト構造全体を `<g opacity={sceneVis}>` でラップする。**`<foreignObject>` を含む子も、外側の `<g opacity>` が効く**ので、画面ごとの一斉フェードは1か所で済む。

暗転を挟みたい場合は背景色の `<rect>` を間に opacity 0→1→0 で重ねる。

**画面跨ぎで持ち越すもの**は対話字幕（§7）とセクションタイトルくらい。

## 7. 対話字幕（必須）

`script.md` の全セリフを、画面下部に話者名つきで尺に同期して表示する。**これが台本を視聴者に届ける主経路**。字幕は design_spec の event とは無関係に、`SCRIPT` 全行から自動で出る。

文字の折返し・行送り・話者色の塗り分けがあるため、字幕は **`<foreignObject>` の HTML+CSS で組む**（SVG `<text>` の手動折返しが要らない）：

```tsx
const SUBTITLE_AREA = { x: -960, y: 320, w: 1920, h: 220 };  // 画面下部の帯
const SPEAKER_COLOR: Record<Speaker, string> = {
    'めたん':   '#d6336c',
    'ずんだもん': '#2f9e44',
};

const Subtitle: React.FC<{ frame: number }> = ({ frame }) => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++) if (frame >= lineStarts[i]) idx = i;
    const line = SCRIPT[idx];
    const op = Math.min(1, (frame - lineStarts[idx]) / 8);
    const { x, y, w, h } = SUBTITLE_AREA;
    return (
        <foreignObject x={x} y={y} width={w} height={h}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    padding: '24px 80px',
                    opacity: op,
                    fontFamily: FONT,
                    color: INK,
                    background: 'rgba(255,255,255,0.85)',
                }}
            >
                <div style={{ fontSize: 44, fontWeight: 700, color: SPEAKER_COLOR[line.speaker], marginBottom: 8 }}>
                    {line.speaker}
                </div>
                <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.4 }}>
                    {line.text}
                </div>
            </div>
        </foreignObject>
    );
};
```

- 画面下部の帯は固定矩形（design_overall がそのぶんの余白を確保している）
- 話者名は話者色、本文は読みやすい色。スマホ視聴前提で大きめ
- 行頭で軽くフェードイン
- CSS の自然折返しに任せる——`wrapLine` のような手動分割は要らない

## 8. 音声（任意レイヤー）

ボイスオーバー音声を用意できる場合のみ。VOICEVOX 等でセリフを読み上げ、音声を載せる。

- 各セリフの実測 duration（フレーム数）の配列を作り、§3 の `lineDurations` をそれに**差し替える**。`lineStarts` `eventFrame` `TOTAL_FRAMES` も Track 群も、計算式は一切変えなくてよい
- 音声は1本のミックス済みトラックなら `<Audio src={…} />`、セリフ別ファイルなら各セリフ開始フレームに `<Sequence from={lineStarts[i]}>` で配置
- 音声が無い段階でも、文字数推定の `lineDurations` で動画は完成する（仮ナレーション尺）

## 9. メイン関数の骨格

```tsx
export const Video: React.FC = () => {
    const f = useCurrentFrame();

    const introVis = resolve(introVisTrack, f).v;
    const body1Vis = resolve(body1VisTrack, f).v;

    // 序論：HStack[Chip, Arrow, MassGrid]
    const chipOp    = resolve(chipOpTrack,    f).v;
    const arrowOp   = resolve(arrowOpTrack,   f).v;
    const gridCount = resolve(gridCountTrack, f).v;
    const gridOp    = resolve(gridOpTrack,    f).v;

    return (
        <AbsoluteFill style={{ backgroundColor: BG }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
                {/* 序論画面 */}
                <g opacity={introVis}>
                    <HStack
                        items={[
                            makeChip({ label: '42 KB', opacity: chipOp }),
                            makeArrowItem({ opacity: arrowOp }),
                            makeMassGrid({ count: gridCount, opacity: gridOp }),
                        ]}
                        gap={80}
                        cy={-40}
                    />
                </g>

                {/* ボディ1画面 */}
                <g opacity={body1Vis}>{/* … */}</g>

                {/* 画面グループ外：全画面持ち越し */}
                <SceneTitle frame={f} />
                <Subtitle frame={f} />
            </svg>
        </AbsoluteFill>
    );
};
```

`{phase === ...}` の条件分岐は使わず、すべて Track + opacity で表現する。画面もスカラー Track で opacity をゲートするだけ。レイアウト構造（HStack/VStack/Grid）はトップレベルから組み始める。

## 10. Root.tsx への登録

```tsx
import { Composition } from 'remotion';
import { Video, TOTAL_FRAMES } from '@sandbox/experiments/{題材}/Composition';

<Composition
    id="sandbox-{題材}"
    component={Video}
    durationInFrames={TOTAL_FRAMES}
    fps={30} width={1920} height={1080}
/>
```

`TOTAL_FRAMES` を export して `durationInFrames` に渡す。パスエイリアス（`@sandbox` `@channels` `@components`）は `tsconfig.json` 設定済み。

## 11. 確認とプレビュー

レンダ（mp4）は重いので、まず `preview` / Studio や still snapshot で確認する（→ `feedback_render_preview_preference`）。**タイプチェック → preview/snapshot で通し見 → 必要ならレンダ**の順。座標・サイズはこの段階で現物合わせ調整する。

`<foreignObject>` 周りの留意点：

- Chromium（Remotion の描画エンジン）で素直に描画される。ただし `transform` を直接 `<foreignObject>` に当てると挙動が安定しないので、外側の `<g transform>` で掛ける
- HTML 内のフォントは `font-family` をフルパスで指定（OS によって fallback が変わる）。SVG `<text>` で使っているフォントと揃える

## 12. 採否判断（実装後）

- [ ] 画面内でカット切り替えゼロで物語が進むか（オブジェクト境界で pop していないか）
- [ ] 画面境界で前画面の全フェードアウト → 新画面のフェードインが起きているか
- [ ] State は数値のみで保たれているか（文字列 enum を入れていないか）
- [ ] 保持区間の両端にキーフレームがあるか（意図しない補間が起きていないか）
- [ ] 矢印など補助オブジェクトの座標は派生計算になっているか
- [ ] `{phase === ...}` の条件分岐が紛れ込んでいないか
- [ ] **対話字幕が全セリフぶん、尺に同期して出ているか**（台本が動画に現れているか）
- [ ] 図解の中に説明文を書き込んでいないか（概念はオブジェクトの動きで示しているか）
- [ ] 背景・面が白テーマ（固定ベース）になっているか
- [ ] 読ませる文字が下限 42px 以上か（小さくてよいのは記号としての文字のみ。scale で縮小しない）
- [ ] **文字を箱に詰めるパーツが `<foreignObject>` で実装されているか**（SVG `<text>` 直書きの箱が紛れていないか）
- [ ] **複数オブジェクトの配置がレイアウトプリミティブ（HStack/VStack/Grid）で組まれているか**（個別座標を画面トップレベルで `x={…} y={…}` 直書きしていないか）
- [ ] オーバーレイ層の要素が1〜2点に収まっているか（多用していないか）
- [ ] 各図が占有ゾーン内に収まり、図どうしが意図せず重ならないか
- [ ] ループし続ける動きが無いか（常駐背景モーション・浮遊・振動・明滅・脈動）。動きはイベント駆動の一度きりで、終わったら止まるか（→ `00_philosophy.md` 7）
- [ ] design_overall の世界観語彙が実装に反映されているか
- [ ] design_spec の event と所属レイアウトがすべての Track キーフレーム位置・配置構造と対応しているか

## 参考実装

題材ごとの実装例は `sandbox/experiments/{題材}/` を参照。コピーするのは仕組み——4段の進め方、Track 補間、画面切替、対話字幕、scriptData 生成、レイアウトプリミティブ、`<foreignObject>` の使い方——であって、色・形ではない。毎回の design_spec / design_overall に合わせて実装する。
