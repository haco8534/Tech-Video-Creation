# [5] 仕上げ — キャラ設置と画像遷移

`04` で出来た `Composition.tsx` を再編集し、立ち絵を置いて喋らせる段。足すのは **キャラ設置**・**画像遷移**（表情差分＋口パク）・**音声**（VOICEVOX ＋ BGM）。

見出し・字幕カード・立ち絵の見た目は、この文書に書いた値が一意に決める——独自に作らない。他のプロジェクトや過去の動画は参照しない。

## レイヤ構成

04 の出力は、背景・図・見出し・字幕までを 1 枚の center-origin SVG に描いている。見出しと字幕は HTML オーバーレイへ出す——立ち絵（HTML `<Img>`）が上に乗るので SVG のままだと覆われ、また見た目（テキストの縁取り・ピル枠）は CSS が正典で SVG では再現できないからだ。

`<AbsoluteFill>` の子を、この順（＝奥から手前）に並べる。

1. **シーン SVG** — 背景・各画面の図だけ（見出し `<g>`・字幕 `<g>` は抜く）
2. **見出し** — HTML（`zIndex 10`、下記）
3. **床グラデーション** — HTML（`zIndex 15`、下記）
4. **立ち絵** — HTML `<Img>` 2 枚（`zIndex 20`）
5. **字幕カード** — HTML（`zIndex 25`、下記）

見出し・床・立ち絵・字幕カードは実ビューポート（1920×1080）の px で置く。SVG 内の center-origin への換算は要らない。`staticFile()` は `engine/public/` を指す（立ち絵 PNG はそこにある）。

## 見出し・字幕カード（正典）

設計思想：チャンネルの画面は「白いカード・インク文字・余白」の紙の世界。字幕もテロップ（ベタ帯＋縁取り文字）ではなく、同じ言語の**白い浮きカード**として置く。話者色はカード上の名前タブだけに載せる。

- **見出し** — 左上のピル。白フィル＋ピンク縁取り文字（`WebkitTextStroke 5px #ff4281` ＋ `paintOrder:'stroke fill'`）、白地・`#ff4281` 枠 `border 5px`・`borderRadius 20`。書体は Zen Maru Gothic（`@remotion/google-fonts/ZenMaruGothic`）。画面切替で各見出しもシーンと同じ opacity でクロスフェードさせる
- **字幕カード** — `left/right 50`・`bottom 26`・**高さ 200 固定**（48px × 2 行がちょうど収まる。行数で伸縮させない）、`borderRadius 30`、`border 2px rgba(36,48,68,0.06)`、`背景 rgba(255,255,255,0.96)`、影 `0 18px 50px rgba(36,48,68,0.16)`。テキストはインク `#243044`・`fontSize 48 / weight 900` Zen Maru・中央寄せ・話者名なし
- **名前タブ** — カード上辺に半分乗るピル（`top:-24`、めたん＝左 64 / ずんだもん＝右 64）。話者色の地に白文字 `26px / 900`。**話者色は正典：ずんだもん `#22c55e` / めたん `#d6336c`**
- **床グラデーション** — 画面下端 300px、`rgba(205,214,228,0.85)` → 透明。立ち絵とカードの奥に敷き、足元を受ける

```tsx
import { AbsoluteFill, useCurrentFrame, Img, staticFile, Easing } from 'remotion';

export const Video: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
        {/* defs / bg / Scene…（見出し <g>・字幕 <g> は抜く） */}
      </svg>
      <Header … />          {/* 画面ごとに opacity でクロスフェード */}
      <Floor />
      <Characters frame={f} />
      <SubtitleCard frame={f} />
    </AbsoluteFill>
  );
};
```

## キャラ設置

値は以下をそのまま使う（再導出しない）。

- 画像：`characters/{zundamon|metan}/{variant}-{open|close}.png`、variant は `default / normal2 / normal3 / normal4`
- ずんだもん＝右下（`right:10`）、めたん＝左下（`left:10` ＋ `transform:scaleX(-1)` で内向き）、幅 `340`、`drop-shadow(0 6px 20px rgba(17,24,39,.18))`、`pointerEvents:none`、立ち絵より字幕カードを手前に

## 画像遷移

毎フレームの表示画像は、独立した 2 つの選択の積で決まる。どちらも「いま喋っている行」と「その行内の経過フレーム」から引く——既存の字幕が行 index を出しているのと同じ計算を流用する。

**1. 表情差分（variant）** — 話者ごとに、**行が変わるときだけ** 切り替える。その話者の最新行 index を `% variant数` で巡回させる。1 セリフの途中では変えない。聞き手側は直近の variant を保持。狙った所で特定の表情を当てたい行があれば、event をキーにした小さな上書きマップを足してよい（既定は巡回）。

**2. 口（open/close）** — VOICEVOX のモーラ長から焼いた開区間（`audioData.ts`、下記「音声」）を引く。母音=開／子音・促音・無音=閉。**現在の話者だけ**開閉し、聞き手と行間（無音）は閉じ。判定は関数 `isMouthOpen` 1 つに閉じ込める。

```tsx
const VARIANTS = ['default', 'normal2', 'normal3', 'normal4'] as const;
const CHAR_DIR: Record<Speaker, string> = { ずんだもん: 'zundamon', めたん: 'metan' };

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
// 口パク：audioData の開区間（行頭基準）を引く
const isMouthOpen = (f: number): boolean => {
  const i = lineAt(f);
  const local = f - lineStarts[i];
  return AUDIO[i].open.some(([a, b]) => local >= a && local < b);
};

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

## 音声（VOICEVOX）

台本ができたら生成スクリプト（題材ごと。参考：`_gen_audio.mjs`）で全行を合成する。Remotion はレンダ時に VOICEVOX を呼べない（決定論・オフライン）ので、音声とタイミングはファイルに焼く。

- 読み上げ速度は **`speedScale 1.2` を既定**にする（VOICEVOX 標準はやや遅い）。同じ値が合成と口パク開区間・行尺の両方に効くので、Composition 側の追従調整は要らない
- 各行 WAV を**行開始フレームの位置に敷き詰めて圧縮 1 本（AAC/.m4a）に統合**し、Composition は `<Audio>` 1 個で鳴らす
- **尺・行開始フレーム・口パク開区間は合成時に確定**して `audioData.ts` に焼く。Composition はそれを読むだけ（尺を二重計算しない）
- **英字は音声テキストだけ仮名へ置換**する（字幕は英字のまま）。読みは台本ごとに変わるので、生成スクリプトは未登録の英字を警告する

## BGM

ナレーションの下に既定 BGM を薄く敷く。声と同じく `<Audio>` をもう 1 個重ねるだけで、図・立ち絵には関与しない。

- ファイルは **`engine/public/audio/bgm/340_long_BPM80.mp3` を既定**（全題材共通）。`staticFile('audio/bgm/340_long_BPM80.mp3')` で読む
- **音量は `volume={0.03}`**——声を邪魔しない控えめな既定値。本編より短ければ `loop` で繰り返す

```tsx
<Audio src={staticFile(VOICE_SRC)} />
<Audio src={staticFile('audio/bgm/340_long_BPM80.mp3')} volume={0.03} loop />
```

## やりがちな失敗

- **立ち絵が字幕を覆う** — 字幕は最前面の HTML カード、立ち絵はその奥。だから字幕を SVG から出す。
- **字幕カードの高さを文に合わせて可変にする** — 行数で伸縮すると画面がガタつく。高さ 200 固定。
- **話者切替で立ち絵を動かす** — 話者強調のスケール・ポップは足さない。話者は名前タブが示す。
- **表情がセリフ途中で変わる** — variant は行（ターン）境界でだけ切替。中で動くとうるさい。
- **両キャラが同時に口パク** — 開閉するのは現在の話者だけ。聞き手の口は閉じ。
- **未登録の英字を黙って合成する** — VOICEVOX は生英字を読み崩す。スクリプトの警告に従い読み替え辞書に足してから出す。
- **音声を行ごとの `<Audio>` で並べる** — クリップが増えるとプレビューが重い。1 本のマスターに統合する。
- **常駐モーションを足す** — 立ち絵のふわふわ浮遊・明滅・脈動は `00_philosophy.md` §7 で禁止。許される周期運動は「喋っている間の口パク」だけ。
- **下部両端でキャラと図が被る** — 下部両端 約 340px は立ち絵の占有域。シーンの図・テキストがそこに入っていないか確認する（下半分の図は中央寄せ）。

## 確認

`preview` / still snapshot で、各話者が喋っている最中の 1 枚ずつを見て、重ね順・表情・口・被りを確認する（mp4 レンダは最後）。
