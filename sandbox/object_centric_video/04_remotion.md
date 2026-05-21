# [4] Remotion 実装（Composition.tsx）

パイプライン最終段。前段の `design_spec.md` を入力に、`Composition.tsx` を書く。`script.md` のセリフ本文と `design_overall.md` の世界観語彙もここで合流する。**仕組み**を規律し、design_spec で決まった設計を Remotion のコードに翻訳する。

## design_spec → コードの対応

| 前段の成果物 | tsx での姿 |
|---|---|
| script.md の対話 + design_spec の event 割り当て | `SCRIPT: ScriptLine[]`（各セリフに `event?`） |
| design_spec の event 一覧 | `eventFrame(e)` で Track のキーフレーム位置に変換 |
| design_spec のライフサイクル契約 | 各オブジェクトの opacity Track ＋ 画面可視性ゲート |
| design_spec のオブジェクト別 挙動メモ | 各オブジェクトの状態 Track |
| design_overall の世界観語彙（色・形・動き） | ファイル冒頭の定数 ＋ SVG プリミティブの描き方 |
| script.md の全セリフ本文 | **対話字幕**（§7）— 全行を画面下部に自動表示 |

**座標は design_spec に無い。** オブジェクトの位置・サイズ・キーフレームの具体的な数値は、このファイル内に直書きし、preview を見ながら現物合わせで調整する。design_spec が与えるのは「どの event でどの状態へ向かうか」まで。その状態の数値はここで埋める。

## 0. 前提（仕組み側、譲れない4行）

1. **State は数値プロパティのみ**。文字列・enum・bool は使わない。variant 切替は `0..1` の `mix` 値で表現し、コンポーネント内部でクロスフェードする
2. **保持したい区間は両端にキーフレームを置く**。さもないと前後と勝手に補間される
3. **`{phase === 'X' && ...}` は使わない**。可視性は opacity で、位置・サイズは Track で連続変化させる
4. **派生計算でオブジェクトを繋ぐ**。矢印の端点・追従座標などは、繋ぐ相手の現在状態から毎フレーム計算する

**画面境界**は唯一の例外。画面が切り替わる瞬間は、前画面の全オブジェクトを一斉に opacity 0 へ落とし、新画面のオブジェクトを一斉に opacity 1 へ上げる「画面リセット」を行う。原則 1〜4 は画面内で守る。

## 1. プロジェクトの土台

- 1920×1080、30 fps（`Root.tsx` の Composition 設定に合わせる）
- `<svg width={1920} height={1080} viewBox="-960 -540 1920 1080">` で**中心原点座標系**。y は下向き正
- ファイル冒頭の構成：

```tsx
import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SCRIPT, AnimEvent } from './scriptData';  // §3 参照

// 固定ベース：白テーマ（全題材共通・変えない）
const BG = '#f5f7fa';      // 背景
const SURFACE = '#ffffff'; // パネル面
const INK = '#243044';     // 主文字
// アクセント（題材ごと：design_overall の 1.世界観 から）
const ACCENT = '#e08a1e';
// … 文字サイズ定数（下記「白テーマと文字サイズ」）

// 座標・キーフレーム数値はこのファイル内で決める（design_spec には無い）
const TITLE_Y = -120;
// …

export const TOTAL_FRAMES = /* §3 で算出 */;
```

背景・パネル面の白とアクセント色の定数は design_overall に従う。座標・サイズの定数はここで決め、preview で調整する。

### 白テーマと文字サイズ（固定ベース）

背景・パネル面は白で固定する（`02_design_overall.md`「固定ベース」）。`BG` `SURFACE` `INK` は上の例の値を土台にし、アクセント色だけ題材ごとに替える。

文字サイズはスマホ視聴前提で下限を守る。図解内のテキストは下表より小さくしない：

| 用途 | サイズ（px） |
|---|---|
| 対話字幕 本文 | 40〜44 |
| 字幕の話者名／セクションタイトル | 30 前後 |
| 図の装置名・主要ラベル | 32〜34 |
| 図中の最小の注記（段番号など） | 27（**下限。これ未満にしない**） |
| 大見出し・タイトル | 54 以上 |

**`scale` で縮小する装置でも、テキストは縮小しない。** 装置を `scale={0.6}` などで小さく描くとき、内部の文字に `scale` を掛けると下限を割る。文字サイズは固定値（または下限つき）で持ち、`scale` の影響から外す。フォントサイズ定数（例：`FS_LABEL = 33` `FS_NOTE = 28` `FS_TINY = 27`）をファイル冒頭に置き、各 `<text>` で使う。

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

`script.md` の全セリフを `SCRIPT[]` にし、design_spec の event 割り当て表どおりに `event?` を付ける。各セリフの長さは文字数から計算し、event の付いたセリフの開始フレームが Track のキーフレーム位置になる。

### SCRIPT は別ファイル（scriptData.ts）に置く

セリフが数十行を超えると `SCRIPT[]` を tsx に直書きするのは重い。**`script.md` から `scriptData.ts` を生成**し、Composition.tsx は import する。生成は小さなスクリプト（例：`_gen_script.py`）で行い、event 名は「セリフ本文の一意な部分文字列」で機械的に割り当てる——こうすれば script.md とセリフ本文が必ず一致し、event の付け間違いも検出できる。

```ts
// scriptData.ts（script.md から生成、手で編集しない）
export type Speaker = 'めたん' | 'ずんだもん';
export type AnimEvent =
    | 'scene.intro.in' | 'title.in' /* … design_spec の event 一覧をすべて */;
export type ScriptLine = { speaker: Speaker; text: string; event?: AnimEvent };
export const SCRIPT: ScriptLine[] = [
    { speaker: 'めたん',   text: '…', event: 'scene.intro.in' },
    // script.md の全セリフ
];
```

### フレーム計算

```tsx
const CHAR_FRAMES = 4;      // 1文字あたりのフレーム数（題材で調整可）
const PAUSE_FRAMES = 6;     // セリフ末尾の余白
const MIN_LINE_FRAMES = 40; // セリフ長の下限
const TAIL_FRAMES = 90;     // 最終セリフ後の余韻

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
    lineStarts[SCRIPT.length - 1] +
    lineDurations[SCRIPT.length - 1] + TAIL_FRAMES;
```

`CHAR_FRAMES` `PAUSE_FRAMES` `MIN_LINE_FRAMES` は題材ごとに決める。文字数推定はあくまで仮の尺。**実音声を付ける場合は §8 のとおり `lineDurations` を実測値に差し替える**（Track の組み立てロジックは不変）。

## 4. State 型の設計ルール

### 4.1 数値プロパティのみ

```tsx
type SomeState = { x: number; y: number; size: number; opacity: number; mix: number };
```

variant（A↔B の見た目切替）は **0..1 の mix 値**で持ち、コンポーネント内部で2種類を重ねて opacity でクロスフェードする：

```tsx
<RenderA opacity={mix} />
<RenderB opacity={1 - mix} />
```

### 4.2 カウント駆動

「N 個に増やす」は `count: number` を Track で 1→N に上げ、内部で `Math.floor(count)` 個だけ描画：

```tsx
const n = Math.floor(count);
{Array.from({ length: n }).map((_, i) => <Item key={i} index={i} />)}
```

### 4.3 保持区間は必ず両端

```tsx
{ f: eventFrame('x.in'),      state: { ..., v: 64 } },  // 保持区間の入口
{ f: eventFrame('x.out'),     state: { ..., v: 64 } },  // 保持区間の出口
```

両端で同じ値を打つ。片側しか書かないと前後と補間されて意図しない値になる。

## 5. オブジェクトを SVG プリミティブで組む

「絵で語る」リッチな図解は、外部ライブラリではなく **SVG プリミティブの直接組み合わせ**で作る：`rect` `circle` `path` `line` `polygon` `linearGradient` `radialGradient`。題材固有のオブジェクトを毎回スクラッチで描く（パワポ的なカード+テキストの羅列にしない）。

### 5.1 オブジェクトコンポーネントの形

```tsx
const Foo: React.FC<FooState> = ({ x, y, size, opacity, mix }) => {
    if (opacity <= 0.001) return null;       // 不可視なら描かない
    return (
        <g opacity={opacity}>
            <FooVariantA opacity={mix} />
            <FooVariantB opacity={1 - mix} />
        </g>
    );
};
```

props は State 型をそのまま展開。`linearGradient` の `id` には座標やサイズを混ぜてユニーク化（同じ id が複数 SVG にあると衝突する）。

### 5.2 オブジェクト同士を派生計算で繋ぐ

矢印などは from/to 座標を Track で持たず、繋ぐ相手の**現在状態から座標を派生**させる：

```tsx
<Arrow
    fromX={photo.x + photo.size / 2} fromY={photo.y}
    toX={block.x - block.size / 2}   toY={block.y}
    opacity={arrow.v}
/>
```

矢印自身は opacity Track だけ持つ。

## 6. 画面切替の実装

各画面（design_spec のセクション）は「その画面に属するオブジェクト群を opacity でゲートする1つのスカラー Track」で表現する。

```tsx
type SceneVis = { v: number };
const CROSSFADE = 30;  // 画面境界の標準クロスフェード（題材で伸縮可）

const introVisTrack: Track<SceneVis> = [
    { f: 0,                                        state: { v: 1 } },
    { f: eventFrame('scene.body1.in'),             state: { v: 1 } },
    { f: eventFrame('scene.body1.in') + CROSSFADE, state: { v: 0 } },
    { f: TOTAL_FRAMES,                             state: { v: 0 } },
];
```

メインで各画面を `<g opacity={sceneVis}>` でラップする。暗転を挟みたい場合は背景色の `<rect>` を間に opacity 0→1→0 で重ねる。

**画面跨ぎで持ち越すもの**は対話字幕（§7）とセクションタイトルくらい。これらはどの画面グループにも属さず、画面無関係に描く。オブジェクトの持ち越しが多発するなら画面設計を疑い、design_spec へ差し戻す。

## 7. 対話字幕（必須）

`script.md` の全セリフを、画面下部に話者名つきで尺に同期して表示する。**これが台本を視聴者に届ける主経路**——無いと「台本が動画のどこにも出ない」状態になる。字幕は design_spec の event とは無関係に、`SCRIPT` 全行から自動で出る。

```tsx
const SPEAKER_COLOR: Record<Speaker, string> = {
    'めたん':   '#d6336c',
    'ずんだもん': '#2f9e44',
};

// 長い行は句読点で2行に折る（1行 ~30字目安）
const wrapLine = (text: string, perLine: number): string[] => {
    if (text.length <= perLine) return [text];
    let cut = -1;
    for (let i = Math.min(perLine, text.length - 1); i >= perLine - 12 && i > 0; i--) {
        if (text[i] === '、' || text[i] === '。') { cut = i + 1; break; }
    }
    if (cut < 0) cut = perLine;
    return [text.slice(0, cut), text.slice(cut)];
};

const Subtitle: React.FC<{ frame: number }> = ({ frame }) => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++) if (frame >= lineStarts[i]) idx = i;
    const line = SCRIPT[idx];
    const op = Math.min(1, (frame - lineStarts[idx]) / 8);  // 行頭でフェードイン
    const rows = wrapLine(line.text, 30);
    // …話者名（SPEAKER_COLOR[line.speaker]）＋ rows を画面下部に描画
    return <g opacity={op}>{/* text 要素 */}</g>;
};
```

- 画面下部の帯に置く（design_overall がそのぶんの余白を確保している）
- 話者名は話者色、本文は読みやすい色。スマホ視聴前提で大きめ
- 行頭で軽くフェードインさせると切り替わりが滑らか
- これは「絵の代わりの説明文」ではない——話しているセリフ本文そのものなので、通底原則1（図解に説明文を書かない）と衝突しない

## 8. 音声（任意レイヤー）

ボイスオーバー音声を用意できる場合のみ。VOICEVOX 等でセリフを読み上げ、音声を載せる。

- 各セリフの実測 duration（フレーム数）の配列を作り、§3 の `lineDurations` をそれに**差し替える**。`lineStarts` `eventFrame` `TOTAL_FRAMES` も Track 群も、計算式は一切変えなくてよい
- 音声は1本のミックス済みトラックなら `<Audio src={…} />`、セリフ別ファイルなら各セリフ開始フレームに `<Sequence from={lineStarts[i]}>` で配置
- 音声が無い段階でも、文字数推定の `lineDurations` で動画は完成する（仮ナレーション尺）。音声はあとから足せる

## 9. メイン関数の骨格

```tsx
export const Video: React.FC = () => {
    const f = useCurrentFrame();

    const introVis = resolve(introVisTrack, f).v;
    const body1Vis = resolve(body1VisTrack, f).v;
    const title = resolve(titleTrack, f);

    return (
        <AbsoluteFill style={{ backgroundColor: BG_COLOR }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
                <g opacity={introVis}><Title {...title} /></g>
                <g opacity={body1Vis}>{/* … */}</g>
                {/* 画面グループ外：全画面持ち越し */}
                <SceneTitle frame={f} />
                <Subtitle frame={f} />
            </svg>
        </AbsoluteFill>
    );
};
```

`{phase === ...}` の条件分岐は使わず、すべて Track + opacity で表現する。画面もスカラー Track で opacity をゲートするだけ。

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
- [ ] 図中テキストが文字サイズの下限（最小 27px、`scale` で縮小しない）を満たすか
- [ ] ループし続ける動きが無いか（常駐背景モーション・浮遊・振動・明滅・脈動）。動きはイベント駆動の一度きりで、終わったら止まるか（→ `00_philosophy.md` 7）
- [ ] design_overall の世界観語彙が実装に反映されているか
- [ ] design_spec の event とすべての Track キーフレーム位置が対応しているか

## 参考実装

- `sandbox/experiments/transformer/Composition.tsx` — 4段パイプラインで作った完成例。白テーマ、6画面、Track 群フル活用、対話字幕、Self-Attention 図解

見た目の語彙は題材ごとに別物。コピーするのは仕組み（Track 補間・画面切替・対話字幕・scriptData 生成）であって、色・形ではない。毎回の design_spec / design_overall に合わせて実装する。
