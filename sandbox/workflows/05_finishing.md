# [5] 仕上げ — キャラ設置と画像遷移

`04` で出来た `Composition.tsx` を再編集し、立ち絵を置いて喋らせる段。仕上げには音声・BGM・本番リップシンクなど他にもあるが、この段ではまず **キャラ設置** と **画像遷移**（表情差分の切替＋口パク）だけを足す。

立ち絵の配置値・画像セット・差し替えロジックは、本番ワークフロー `channels/tech_explainer/workflows/create-video-full.md`（Phase C）と、その実体 `engine/src/components/layouts/FigureLayout.tsx` を正典とする。ここで作り直さず、object-centric の単一 SVG 構成へ移植するための差分だけを書く。

## レイヤ構成を本番に揃える

04 の出力は、背景・図・字幕までを 1 枚の center-origin SVG に描いている。立ち絵を HTML `<Img>` オーバーレイで重ねるので、**字幕を SVG から出して HTML 帯にする**——SVG のままだと、上に乗る立ち絵が字幕を覆う。

`<AbsoluteFill>` の子を、この順（＝奥から手前）に並べる。

1. **シーン SVG** — 背景・各画面の図・セクションタイトル（04 のまま。字幕 `<g>` だけ抜く）
2. **立ち絵** — HTML `<Img>` 2 枚
3. **字幕帯** — HTML。白テーマの既存の見た目（話者色・折返し）はそのまま、描画基盤だけ SVG `<text>` → HTML/CSS に移す

立ち絵と字幕帯は実ビューポート（1920×1080）の px で置く。SVG 内の center-origin への換算は要らない。`staticFile()` は `engine/public/` を指す（立ち絵 PNG はそこにある）。

```tsx
import { AbsoluteFill, useCurrentFrame, Img, staticFile, Easing } from 'remotion';

export const ZipBomb: React.FC = () => {
  const f = useCurrentFrame();
  // …既存のタイトル計算…
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
        {/* defs / bg / Scene…/ SceneTitle（字幕 <g> は抜く） */}
      </svg>
      <Characters frame={f} />
      <SubtitleBand frame={f} />
    </AbsoluteFill>
  );
};
```

## キャラ設置

`FigureLayout` の値をそのまま使う（再導出しない）。

- 画像：`characters/{zundamon|metan}/{variant}-{open|close}.png`、variant は `default / normal2 / normal3 / normal4`
- ずんだもん＝右下（`right:10`）、めたん＝左下（`left:10` ＋ `transform:scaleX(-1)` で内向き）、幅 `340`、`drop-shadow(0 6px 20px rgba(17,24,39,.18))`、`pointerEvents:none`、立ち絵より字幕帯を手前に

## 画像遷移

毎フレームの表示画像は、独立した 2 つの選択の積で決まる。どちらも「いま喋っている行」と「その行内の経過フレーム」から引く——既存の字幕が行 index を出しているのと同じ計算を流用する。

**1. 表情差分（variant）** — 話者ごとに、**行が変わるときだけ** 切り替える。`FigureLayout` と同じく、その話者の最新行 index を `% variant数` で巡回させる。1 セリフの途中では変えない。聞き手側は直近の variant を保持。狙った所で特定の表情を当てたい行があれば、event をキーにした小さな上書きマップを足してよい（既定は巡回）。

**2. 口（open/close）** — いまは音声がないのでモック。**現在の話者だけ**、セリフ区間中に一定間隔で開閉する（例：開 5f / 閉 4f）。聞き手と、話者でも行間（無音）は閉じ。音声は後で作るので、開閉判定は関数 `isMouthOpen` 1 つに閉じ込め、後で `engine/scripts/generate-lip-sync.js` が吐く音声駆動版（同名 `isMouthOpen`）に差し替えるだけで済む形にしておく。

```tsx
const VARIANTS = ['default', 'normal2', 'normal3', 'normal4'] as const;
const CHAR_DIR: Record<Speaker, string> = { ずんだもん: 'zundamon', めたん: 'metan' };
const FLAP = 5; // モック：開 FLAP / 閉 FLAP frames

const lineAt = (f: number): number => {            // いまの行（字幕と同じ）
  let idx = 0;
  for (let i = 0; i < SCRIPT.length; i++) if (f >= lineStarts[i]) idx = i;
  return idx;
};
const lastLineOf = (f: number, sp: Speaker): number => {  // 表情の巡回キー
  let idx = 0;
  for (let i = 0; i < SCRIPT.length; i++)
    if (SCRIPT[i].speaker === sp && f >= lineStarts[i]) idx = i;
  return idx;
};
// モック口パク（後で音声駆動 isMouthOpen に差替）
const isMouthOpen = (f: number): boolean =>
  Math.floor((f - lineStarts[lineAt(f)]) / FLAP) % 2 === 0;

const charSrc = (sp: Speaker, f: number, speaking: boolean): string => {
  const v = VARIANTS[lastLineOf(f, sp) % VARIANTS.length];
  const mouth = speaking && isMouthOpen(f) ? 'open' : 'close';
  return `characters/${CHAR_DIR[sp]}/${v}-${mouth}.png`;
};

const Characters: React.FC<{ frame: number }> = ({ frame: f }) => {
  const cur = SCRIPT[lineAt(f)].speaker;
  const base: React.CSSProperties = {
    position: 'absolute', width: 340, zIndex: 20,
    filter: 'drop-shadow(0 6px 20px rgba(17,24,39,.18))', pointerEvents: 'none',
  };
  return (
    <>
      <div style={{ ...base, left: 10, bottom: -130, transform: 'scaleX(-1)' }}>
        <Img src={staticFile(charSrc('めたん', f, cur === 'めたん'))} style={{ width: '100%' }} />
      </div>
      <div style={{ ...base, right: 10, bottom: -60 }}>
        <Img src={staticFile(charSrc('ずんだもん', f, cur === 'ずんだもん'))} style={{ width: '100%' }} />
      </div>
    </>
  );
};
```

## やりがちな失敗

- **立ち絵が字幕を覆う** — 字幕は最前面の HTML 帯、立ち絵はその奥。だから字幕を SVG から出す。
- **表情がセリフ途中で変わる** — variant は行（ターン）境界でだけ切替。中で動くとうるさい。
- **両キャラが同時に口パク** — 開閉するのは現在の話者だけ。聞き手の口は閉じ。
- **モックの口パクを作り込む** — 音声駆動までの仮。それらしく見せようと間隔を調整しない。
- **常駐モーションを足す** — 立ち絵のふわふわ浮遊・明滅・脈動は `00_philosophy.md` §7 で禁止。許される周期運動は「喋っている間の口パク」だけ。
- **下部両端でキャラと図が被る** — 下部両端 約 340px は立ち絵の占有域。シーンの図・テキストがそこに入っていないか確認する（下半分の図は中央寄せ）。

## 確認

`preview` / still snapshot で、各話者が喋っている最中の 1 枚ずつを見て、重ね順・表情・口・被りを確認する（mp4 レンダは最後）。
