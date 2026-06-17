# [4] Remotion 実装（Composition.tsx）

`design_spec.md` を入力に `Composition.tsx` を書く段。

## 仕組み

- 1920×1080, 30fps（`Root.tsx` の Composition 設定に合わせる）
- 画面は 1 枚の SVG `viewBox="-960 -540 1920 1080"` の中央原点座標系
- 各オブジェクトは**数値プロパティだけ**の State を持ち、Track のキーフレーム間で補間する
- variant 切替は `mix: 0..1` でクロスフェード（`{phase === 'X' && ...}` は使わない）
- 保持したい区間は両端にキーフレームを置く（さもないと前後と勝手に補間される）

## トラック補間（雛形）

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

## 台本と event

`script.md` から `scriptData.ts` を生成して import する（生成スクリプトは題材ごとに自由）。

```ts
export type ScriptLine = { speaker: 'めたん' | 'ずんだもん'; text: string; event?: string };
export const SCRIPT: ScriptLine[] = [/* ... */];
```

各セリフの開始フレームは文字数から計算（実音声があれば実測値に差し替える）。`eventFrame(name)` で event 名 → 開始フレーム。`TOTAL_FRAMES` を export して `Root.tsx` の `Composition` の `durationInFrames` に渡す。

## 対話字幕（必須）

全セリフを画面下部に話者色つきで尺に同期して自動表示する。`<foreignObject>` で HTML を埋め込むのが楽（CSS の自然折返しに任せられる）。**これが無いと台本が動画のどこにも現れない。**

## 画面切替

各画面のオブジェクト群を `<g opacity={sceneVis}>` でラップ。`scene.X.in` の event で opacity を 0→1（前画面は 1→0）。

## 座標は眼で合わせない

座標・サイズは**名前付きアンカー定数**に集約する。

```tsx
const SHARED_BOX = { cx: 630, cy: 225, w: 260, h: 110 };
```

矢印の始点・終点、ラベルの位置、隣接オブジェクトの基準点は、すべてアンカーから derive する（`SHARED_BOX.cx`, `SHARED_BOX.cy - SHARED_BOX.h/2` のように書く）。同じ数値を二か所に直書きすると、片方を動かしたとき必ずズレる。

## テキストの帯を先に決める

画面ごとに、y 軸を上から「タイトル帯／主役の図／補足テキスト帯／字幕帯（固定）」に分け、各帯の y レンジを最初に定数で決める。各テキストはそのレンジ内にしか置かない。「レンジに収まらないテキスト」が出たら、そのテキストは不要か、画面を分けるべきかを先に判断する。テキスト同士の重なりは眼で詰めずに、帯の区分で機械的に避ける。

## 画面内テキストの規律

字幕には全セリフが流れている。**画面側にテキストを置きたくなったら、字幕で言っていないか自問する**。書いてよいのは次の 3 種類だけ：

1. **数値**（叩き直しのため）— 「42 KB」「4.5 PB」「1000 億倍」「258」「1032×」
2. **固有名詞** — 「DEFLATE」「LZ77」「Fifield, 2019」「Billion Laughs」
3. **装置の役割ラベル 1 語** — 「指示書」「実行」「単発型」「目次」

書いてはいけないもの：

- **副題・サブテキスト** — 「── 指示書は軽い、実行は重い」のような main を補強する一文
- **補足の説明文** — 「アップロード後に検査」「中身を律儀に検査」のような装置の働きの説明
- **語りの言い換え** — セリフを画面に書き起こすこと。字幕でそのまま流れている

「ラベルがあったほうが親切」と感じても、字幕がその仕事をしている。画面に重ねるテキストは、字幕の重複ではなく、字幕に書けない量（数値・固有名詞・1 語ラベル）に絞る。

## 確認

`preview` / Studio / still snapshot で先に通し見する。mp4 レンダは重いので最後。
