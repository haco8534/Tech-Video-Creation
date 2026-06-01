// [4] Remotion 実装 — LLMの仕組み（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 背骨は「意味の地図」と、その上に置かれた「語の点」。点は内側に意味を持たず、
// 周りとの位置関係だけを持つ。各画面は、この一点が「置かれ→文脈で動き→次の語を産む」
// 過程を別の仕組みで起こして見せる工程として連なる。

import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing, Img, staticFile } from 'remotion';
import { SCRIPT, AnimEvent, Speaker } from './scriptData';

// ===== 固定ベース：白テーマ =====
const BG = '#f5f7fa';
const SURFACE = '#ffffff';
const SURFACE_SOFT = '#eef1f6';
const EDGE = '#c4cedd';
const INK = '#243044';
const SUB_INK = '#5d6b82';
const DIM = '#9aa6b8';
const SHADOW = '#243044';

// ===== アクセント（LLM の語彙）=====
const INDIGO = '#3b5bdb'; // 語の点・トークン（基本の単位）
const INDIGO_DARK = '#2942b8';
const INDIGO_SOFT = '#e3e8fc';
const TEAL = '#0c8599'; // 文脈の引き・注目（周りを見る力）
const TEAL_DARK = '#0b7285';
const TEAL_SOFT = '#c5f6fa';
const AMBER = '#e8973a'; // 文脈を吸って研がれた一点・確定
const AMBER_DARK = '#b86a16';
const AMBER_SOFT = '#fbe6cf';
const GREEN = '#2f9e44'; // 選ばれた次の語・当たり
const GREEN_SOFT = '#d8f3dd';
const RED = '#e03131'; // 外れ・でたらめ・記号操作
const RED_SOFT = '#fbe0e0';

const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
const SPEAKER_COLOR: Record<Speaker, string> = {
  めたん: '#d6336c',
  ずんだもん: '#2f9e44',
};

// ===== 文字サイズ（固定ベース・下限つき）=====
const FS_SUB = 42;
const FS_SPEAKER = 31;
const FS_SCENE = 30;
const FS_LABEL = 34;
const FS_NOTE = 28;
const FS_TINY = 25;
const FS_BIG = 76;
const FS_WORD = 30; // 語の点・チップの文字

// ===== 台本とフレーム =====
const CHAR_FRAMES = 4.2;
const PAUSE_FRAMES = 6;
const MIN_LINE_FRAMES = 40;
const TAIL_FRAMES = 90;
const CROSSFADE = 30;

const lineDurations = SCRIPT.map(
  (l) => Math.round(Math.max(MIN_LINE_FRAMES, l.text.length * CHAR_FRAMES)) + PAUSE_FRAMES,
);
const lineStarts: number[] = [];
lineDurations.reduce((acc, d, i) => ((lineStarts[i] = acc), acc + d), 0);

export const TOTAL_FRAMES =
  lineStarts[SCRIPT.length - 1] + lineDurations[SCRIPT.length - 1] + TAIL_FRAMES;

const eventFrame = (e: AnimEvent): number => {
  const i = SCRIPT.findIndex((l) => l.event === e);
  if (i < 0) throw new Error('event not found: ' + e);
  return lineStarts[i];
};
const F = eventFrame;

// ===== トラック補間機構（04_remotion.md §2）=====
type Keyframe<S> = { f: number; state: S };
type Track<S> = Keyframe<S>[];

const ease = Easing.bezier(0.4, 0, 0.2, 1);

const resolveTrack = (track: Track<{ v: number }>, f: number): number => {
  if (track.length === 0) throw new Error('empty track');
  if (f <= track[0].f) return track[0].state.v;
  for (let i = 0; i < track.length - 1; i++) {
    const a = track[i];
    const b = track[i + 1];
    if (f >= a.f && f <= b.f) {
      const t = ease((f - a.f) / Math.max(1, b.f - a.f));
      return a.state.v + (b.state.v - a.state.v) * t;
    }
  }
  return track[track.length - 1].state.v;
};

const sc = (pairs: [number, number][]): Track<{ v: number }> =>
  pairs.map(([f, v]) => ({ f, state: { v } }));
const rv = (track: Track<{ v: number }>, f: number): number => resolveTrack(track, f);
// event で立ち上がり、dur で 0→1（簡略版）
const ap = (e: AnimEvent, dur: number): Track<{ v: number }> => sc([[F(e), 0], [F(e) + dur, 1]]);

// ===== 数値ヘルパ =====
const clamp = (x: number, lo = 0, hi = 1): number => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const hex2 = (n: number): string =>
  ('0' + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
const hexLerp = (a: string, b: string, t: number): string => {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return '#' + hex2(lerp(pa[0], pb[0], t)) + hex2(lerp(pa[1], pb[1], t)) + hex2(lerp(pa[2], pb[2], t));
};

// ===== 舞台の基準 =====
const MAIN_CY = -40;

const TXT = (
  x: number,
  y: number,
  t: string,
  col: string,
  size: number,
  w = 700,
  anchor: 'start' | 'middle' | 'end' = 'middle',
) => (
  <text x={x} y={y} fill={col} fontSize={size} fontFamily={FONT} fontWeight={w} textAnchor={anchor} dominantBaseline="central">
    {t}
  </text>
);

// 角丸チップ（語・候補・センテンスの一語に共通）
const Chip: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  text: string;
  fill: string;
  stroke: string;
  textCol: string;
  fs?: number;
  opacity?: number;
  sw?: number;
  fontW?: number;
}> = ({ cx, cy, w, h, text, fill, stroke, textCol, fs = FS_WORD, opacity = 1, sw = 3, fontW = 700 }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={Math.min(14, h / 2)} fill={fill} stroke={stroke} strokeWidth={sw} />
      {TXT(cx, cy, text, textCol, fs, fontW)}
    </g>
  );
};
const chipW = (text: string, fs = FS_WORD, pad = 30): number => text.length * fs * 0.62 + pad;

// ============================================================
// 背骨1：意味の地図（淡い座標面。語が置かれる舞台）
// ============================================================
const MeaningMap: React.FC<{ cx: number; cy: number; w: number; h: number; opacity: number }> = ({
  cx,
  cy,
  w,
  h,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const ox = cx - w / 2;
  const oy = cy - h / 2;
  const cols = 9;
  const rows = 5;
  return (
    <g opacity={opacity}>
      <rect x={ox} y={oy} width={w} height={h} rx={22} fill={SURFACE} stroke={EDGE} strokeWidth={3} />
      {/* 淡い格子（座標面） */}
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <line key={'v' + i} x1={ox + (w / cols) * (i + 1)} y1={oy + 14} x2={ox + (w / cols) * (i + 1)} y2={oy + h - 14} stroke={SURFACE_SOFT} strokeWidth={2} />
      ))}
      {Array.from({ length: rows - 1 }).map((_, i) => (
        <line key={'h' + i} x1={ox + 14} y1={oy + (h / rows) * (i + 1)} x2={ox + w - 14} y2={oy + (h / rows) * (i + 1)} stroke={SURFACE_SOFT} strokeWidth={2} />
      ))}
      {TXT(ox + 16, oy + 24, '意味の地図', DIM, FS_TINY, 700, 'start')}
    </g>
  );
};

// ============================================================
// 背骨2：語の点（ラベル付きの点＝トークン。内側に意味を持たない）
// ============================================================
const WordPoint: React.FC<{
  x: number;
  y: number;
  label?: string;
  color?: string;
  fill?: string;
  r?: number;
  opacity: number;
  labelDy?: number;
  glow?: number; // 0..1 強調の光
  blur?: number; // 0..1 ぼやけ（薄い大円を重ねる）
  mark?: 0 | 1 | -1; // +1 緑✓ / -1 赤✗
}> = ({ x, y, label, color = INDIGO, fill = SURFACE, r = 13, opacity, labelDy = -30, glow = 0, blur = 0, mark = 0 }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      {blur > 0.02 && [3, 2, 1].map((k) => (
        <circle key={k} cx={x} cy={y} r={r + k * 9 * blur} fill={color} opacity={0.12 * blur} />
      ))}
      {glow > 0.02 && <circle cx={x} cy={y} r={r + 12} fill={color} opacity={0.22 * glow} />}
      <circle cx={x} cy={y} r={r} fill={fill} stroke={color} strokeWidth={4} />
      {mark === 0 && <circle cx={x} cy={y} r={r * 0.42} fill={color} />}
      {mark === 1 && (
        <path d={'M ' + (x - r * 0.5) + ' ' + y + ' L ' + (x - r * 0.05) + ' ' + (y + r * 0.45) + ' L ' + (x + r * 0.55) + ' ' + (y - r * 0.5)} fill="none" stroke={GREEN} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      )}
      {mark === -1 && (
        <g stroke={RED} strokeWidth={4} strokeLinecap="round">
          <line x1={x - r * 0.5} y1={y - r * 0.5} x2={x + r * 0.5} y2={y + r * 0.5} />
          <line x1={x + r * 0.5} y1={y - r * 0.5} x2={x - r * 0.5} y2={y + r * 0.5} />
        </g>
      )}
      {label && (
        <g>
          <rect x={x - chipW(label) / 2} y={y + labelDy - 19} width={chipW(label)} height={38} rx={10} fill={SURFACE} stroke={color} strokeWidth={2.5} opacity={0.96} />
          {TXT(x, y + labelDy, label, color, FS_WORD, 700)}
        </g>
      )}
    </g>
  );
};

// 矢印（始点→終点、頭つき）
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; width?: number; opacity: number; dash?: string }> = ({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 5,
  opacity,
  dash,
}) => {
  if (opacity <= 0.001) return null;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 16;
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      <path
        d={
          'M ' + x2 + ' ' + y2 +
          ' L ' + (x2 - hl * Math.cos(ang - 0.42)) + ' ' + (y2 - hl * Math.sin(ang - 0.42)) +
          ' M ' + x2 + ' ' + y2 +
          ' L ' + (x2 - hl * Math.cos(ang + 0.42)) + ' ' + (y2 - hl * Math.sin(ang + 0.42))
        }
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
};

// ============================================================
// 画面可視性（04_remotion.md §6）
// ============================================================
const sceneStarts = {
  intro: 0,
  body1: F('scene.body1.in'),
  body2: F('scene.body2.in'),
  body3: F('scene.body3.in'),
  outro: F('scene.outro.in'),
};

const introVis = sc([
  [0, 1],
  [sceneStarts.body1, 1],
  [sceneStarts.body1 + CROSSFADE, 0],
  [TOTAL_FRAMES, 0],
]);
const midVis = (sN: number, sNext: number): Track<{ v: number }> =>
  sc([
    [sN, 0],
    [sN + CROSSFADE, 1],
    [sNext, 1],
    [sNext + CROSSFADE, 0],
    [TOTAL_FRAMES, 0],
  ]);
const body1Vis = midVis(sceneStarts.body1, sceneStarts.body2);
const body2Vis = midVis(sceneStarts.body2, sceneStarts.body3);
const body3Vis = midVis(sceneStarts.body3, sceneStarts.outro);
const outroVis = sc([
  [sceneStarts.outro, 0],
  [sceneStarts.outro + CROSSFADE, 1],
  [TOTAL_FRAMES, 1],
]);

// ============================================================
// 画面1 — 序論「次の語だけ・中身は場所」
// ============================================================
const i_in = sc([[8, 0], [40, 1]]);
const i_pick = ap('intro.pick', 30);
const i_rep = ap('intro.repeat', 50);
const i_open = sc([[F('intro.empty'), 0], [F('intro.empty') + 44, 1]]);
const i_place = ap('intro.place', 50);
// 候補は story で出て pick 後に消える
const i_cand = sc([
  [F('intro.story'), 0],
  [F('intro.story') + 26, 1],
  [F('intro.pick') + 30, 1],
  [F('intro.pick') + 56, 0],
]);

const STORY = ['むかしむかし、', 'あるところに、'];
const APPEND1 = 'おじいさんと';
const APPEND2 = ['すんで', 'いました'];
const CANDS = ['おじいさんと', 'うさぎが', '城が'];

const SentenceBuild: React.FC<{ cy: number; pick: number; rep: number; opacity: number; blank: boolean }> = ({ cy, pick, rep, opacity, blank }) => {
  // 表示する語の並び（pick/rep で増える）
  const toks: { t: string; col: string; fill: string }[] = STORY.map((t) => ({ t, col: INK, fill: SURFACE }));
  if (pick > 0.5) toks.push({ t: APPEND1, col: GREEN, fill: GREEN_SOFT });
  if (rep > 0.4) APPEND2.forEach((t) => toks.push({ t, col: INK, fill: SURFACE }));
  const ws = toks.map((tk) => chipW(tk.t, 32, 30));
  const blankW = 92;
  const gap = 12;
  const total = ws.reduce((a, b) => a + b + gap, 0) + (blank ? blankW + gap : 0);
  let x = -total / 2;
  return (
    <g opacity={opacity}>
      {toks.map((tk, i) => {
        const cx = x + ws[i] / 2;
        x += ws[i] + gap;
        return <Chip key={i} cx={cx} cy={cy} w={ws[i]} h={54} text={tk.t} fill={tk.fill} stroke={tk.col === GREEN ? GREEN : EDGE} textCol={tk.col} fs={32} />;
      })}
      {blank && (
        <g>
          <rect x={x} y={cy - 27} width={blankW} height={54} rx={10} fill={SURFACE_SOFT} stroke={INDIGO} strokeWidth={3} strokeDasharray="7 7" />
          {TXT(x + blankW / 2, cy, '？', INDIGO, 34, 800)}
        </g>
      )}
    </g>
  );
};

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(i_in, f);
  const pick = rv(i_pick, f);
  const rep = rv(i_rep, f);
  const cand = rv(i_cand, f);
  const open = rv(i_open, f);
  const place = rv(i_place, f);

  const sentY = MAIN_CY - 150;
  // open 期：語「おじいさんと」を中央へ持ち上げ、中を開く
  const boxY = MAIN_CY + 70;

  return (
    <g opacity={vis}>
      {/* 文＋点滅空欄（画面終端まで生存） */}
      <SentenceBuild cy={sentY} pick={pick} rep={rep} opacity={inA * (1 - open * 0.55)} blank={open < 0.5} />

      {/* 候補語（story→pick） */}
      {cand > 0.02 && (
        <g opacity={cand}>
          {CANDS.map((c, i) => {
            const cw = chipW(c, FS_WORD, 26);
            const cx = -160 + i * 170;
            const flying = i === 0 ? pick : 0;
            const cy = lerp(sentY + 92, sentY, flying);
            return <Chip key={i} cx={cx} cy={cy} w={cw} h={46} text={c} fill={i === 0 ? GREEN_SOFT : SURFACE} stroke={i === 0 ? GREEN : EDGE} textCol={i === 0 ? GREEN : SUB_INK} fs={FS_TINY} opacity={i === 0 ? 1 : 0.85} />;
          })}
        </g>
      )}

      {/* empty/place：語の中を開くと意味は空・あるのは場所だけ */}
      {open > 0.02 && (
        <g opacity={open}>
          {/* 開かれた語 */}
          <Chip cx={-220} cy={boxY} w={chipW(APPEND1, 32, 34)} h={56} text={APPEND1} fill={SURFACE} stroke={INDIGO} textCol={INK} fs={32} />
          <Arrow x1={-220 + chipW(APPEND1, 32, 34) / 2} y1={boxY} x2={-40} y2={boxY} color={SUB_INK} width={4} opacity={1} />
          {/* 「意味」の枠＝空（取り消し線） */}
          <g opacity={1 - place * 0.85}>
            <rect x={20} y={boxY - 46} width={250} height={92} rx={12} fill={SURFACE} stroke={RED} strokeWidth={3} strokeDasharray="8 7" />
            {TXT(145, boxY - 22, '意味', RED, FS_NOTE, 800)}
            <line x1={48} y1={boxY + 12} x2={242} y2={boxY + 12} stroke={RED} strokeWidth={4} />
            {TXT(145, boxY + 22, '（空）', RED, FS_TINY, 700)}
          </g>
        </g>
      )}

      {/* place：残るのは地図上の一点（背骨の種） */}
      {place > 0.05 && (
        <g opacity={place}>
          <WordPoint x={420} y={boxY} label="場所" color={INDIGO} opacity={1} glow={place} labelDy={-34} />
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「言葉を地図に置く」
// ============================================================
const b1_in = sc([[sceneStarts.body1 + 8, 0], [sceneStarts.body1 + CROSSFADE + 16, 1]]);
const b1_number = ap('b1.number', 44);
const b1_map = ap('b1.map', 60); // 数直線→地図モーフ
const b1_embed = ap('b1.embed', 40);
const b1_vector = ap('b1.vector', 46);
const b1_queen = ap('b1.queen', 40);
// 上帯は dims → neighbors → firth の順送り（一つずつ入れ替え）
const b1_dims = sc([[F('b1.dims'), 0], [F('b1.dims') + 40, 1], [F('b1.neighbors'), 1], [F('b1.neighbors') + 30, 0]]);
const b1_neigh = sc([[F('b1.neighbors'), 0], [F('b1.neighbors') + 40, 1], [F('b1.firth'), 1], [F('b1.firth') + 30, 0]]);
const b1_firth = ap('b1.firth', 44);
const b1_train = ap('b1.train', 46);
const b1_settle = sc([[F('b1.train'), 0], [F('b1.train') + 90, 1]]); // 穴埋め反復で点が締まる
// 王族オーバーレイは vector 説明が終わるまで（queen の後の解説 line も覆う）
const b1_royal = sc([
  [F('b1.vector'), 0],
  [F('b1.vector') + 30, 1],
  [F('b1.queen') + 480, 1],
  [F('b1.queen') + 540, 0],
]);

const NUM_Y = MAIN_CY + 40;
// 地図上の語（loose=散らばり / tight=クラスタ）
type MW = { t: string; lx: number; ly: number; tx: number; ty: number; cl: 'fruit' | 'gov' };
const B1_WORDS: MW[] = [
  { t: 'りんご', lx: -300, ly: MAIN_CY - 90, tx: -300, ty: MAIN_CY - 70, cl: 'fruit' },
  { t: 'みかん', lx: -150, ly: MAIN_CY + 30, tx: -210, ty: MAIN_CY - 10, cl: 'fruit' },
  { t: '政府', lx: 300, ly: MAIN_CY - 40, tx: 320, ty: MAIN_CY + 80, cl: 'gov' },
  { t: 'バナナ', lx: -390, ly: MAIN_CY + 80, tx: -250, ty: MAIN_CY + 60, cl: 'fruit' },
  { t: '法律', lx: 180, ly: MAIN_CY + 100, tx: 400, ty: MAIN_CY + 10, cl: 'gov' },
];
// neighbors：りんご／政府 の周りに灯る衛星語（外向きに置いて中央の混雑を避ける）
const SAT_APPLE = [{ t: '食べる', x: -470, y: MAIN_CY - 120 }, { t: '甘い', x: -480, y: MAIN_CY - 40 }, { t: '皮をむく', x: -360, y: MAIN_CY - 160 }];
const SAT_GOV = [{ t: '国会', x: 470, y: MAIN_CY - 110 }, { t: '税', x: 490, y: MAIN_CY - 30 }, { t: '法案', x: 380, y: MAIN_CY - 150 }];

// 上帯（dims/firth で使う一行バナー）
const TopBanner: React.FC<{ text: string; sub?: string; opacity: number; fill: string; stroke: string; col: string }> = ({ text, sub, opacity, fill, stroke, col }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-560} y={MAIN_CY - 268} width={1120} height={58} rx={14} fill={fill} stroke={stroke} strokeWidth={3} />
      {TXT(sub ? -520 : 0, MAIN_CY - 239, text, col, FS_NOTE, 800, sub ? 'start' : 'middle')}
      {sub && TXT(520, MAIN_CY - 239, sub, SUB_INK, FS_TINY, 700, 'end')}
    </g>
  );
};

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1_in, f);
  const number = rv(b1_number, f);
  const mapP = rv(b1_map, f);
  const embed = rv(b1_embed, f);
  const vector = rv(b1_vector, f);
  const queen = rv(b1_queen, f);
  const dims = rv(b1_dims, f);
  const neigh = rv(b1_neigh, f);
  const firth = rv(b1_firth, f);
  const train = rv(b1_train, f);
  const settle = rv(b1_settle, f);
  const royal = rv(b1_royal, f);

  // 王族の座標（男→女の向きが、王様→女王でも同じだけ効く）
  const RX0 = -170, RX1 = 130, RYU = MAIN_CY - 70, RYD = MAIN_CY + 110;
  const king = { x: RX0, y: RYU };
  const man = { x: RX0, y: RYD };
  const woman = { x: RX1, y: RYD };
  const queenP = { x: RX1, y: RYU };
  const tipX = lerp(king.x, queenP.x, queen);
  const clusterAlpha = inA * (1 - royal * 0.82); // 王族表示中はクラスタ点を薄める
  const apple = B1_WORDS[0];
  const gov = B1_WORDS[2];
  const ax = lerp(apple.lx, apple.tx, settle), ay = lerp(apple.ly, apple.ty, settle);
  const gx = lerp(gov.lx, gov.tx, settle), gy = lerp(gov.ly, gov.ty, settle);

  return (
    <g opacity={vis}>
      {/* 数直線（→ 地図へモーフ。透明度で受け渡し） */}
      <g opacity={inA * (1 - mapP)}>
        <line x1={-440} y1={NUM_Y} x2={440} y2={NUM_Y} stroke={SUB_INK} strokeWidth={4} />
        {[1, 2, 3].map((n) => {
          const x = -360 + (n - 1) * 240;
          return (
            <g key={n}>
              <line x1={x} y1={NUM_Y - 10} x2={x} y2={NUM_Y + 10} stroke={SUB_INK} strokeWidth={4} />
              {TXT(x, NUM_Y + 38, String(n), SUB_INK, FS_NOTE, 700)}
            </g>
          );
        })}
        {TXT(-360, NUM_Y - 40, 'りんご', INK, FS_WORD, 700)}
        {TXT(-120, NUM_Y - 40, 'みかん', INK, FS_WORD, 700)}
        {TXT(120, NUM_Y - 40, '政府', INK, FS_WORD, 700)}
        {TXT(-440, NUM_Y - 70, '番号を振る', DIM, FS_NOTE, 700, 'start')}
        {number > 0.05 && (
          <g opacity={number}>
            {TXT(0, NUM_Y + 96, '1 + 2 = 3 →「政府」', SUB_INK, FS_NOTE, 700)}
            {TXT(250, NUM_Y + 96, '✗', RED, FS_LABEL, 800)}
          </g>
        )}
      </g>

      {/* 意味の地図（mapP で開く・画面終端まで生存） */}
      <MeaningMap cx={0} cy={MAIN_CY} w={1180} h={460} opacity={mapP} />

      {/* 地図上の語の点（loose→tight に締まる） */}
      {B1_WORDS.map((wd, i) => {
        const px = lerp(wd.lx, wd.tx, settle);
        const py = lerp(wd.ly, wd.ty, settle);
        const op = clamp(mapP * 1.2 - i * 0.06) * clusterAlpha;
        return <WordPoint key={i} x={px} y={py} label={wd.t} color={INDIGO} opacity={op} glow={settle * 0.5} />;
      })}

      {/* neighbors：周りの語の衛星（似た周り＝近い） */}
      {neigh > 0.02 && (
        <g opacity={neigh * clusterAlpha}>
          {SAT_APPLE.map((s, i) => (
            <g key={'a' + i}>
              <line x1={ax} y1={ay} x2={s.x} y2={s.y} stroke={INDIGO} strokeWidth={2} opacity={0.4} />
              {TXT(s.x, s.y, s.t, SUB_INK, FS_TINY, 700)}
            </g>
          ))}
          {SAT_GOV.map((s, i) => (
            <g key={'g' + i}>
              <line x1={gx} y1={gy} x2={s.x} y2={s.y} stroke={INDIGO} strokeWidth={2} opacity={0.4} />
              {TXT(s.x, s.y, s.t, SUB_INK, FS_TINY, 700)}
            </g>
          ))}
        </g>
      )}

      {/* embed ラベル（vector で退場） */}
      {embed > 0.05 && vector < 0.6 && (
        <TopBanner text="埋め込み / 分散表現" opacity={embed * (1 - vector * 1.6)} fill={INDIGO_SOFT} stroke={INDIGO} col={INDIGO_DARK} />
      )}

      {/* vector→queen：王−男＋女＝女王（向きに意味が乗る） */}
      {royal > 0.03 && (
        <g opacity={royal}>
          <Arrow x1={man.x} y1={man.y} x2={woman.x} y2={woman.y} color={TEAL} width={5} opacity={1} />
          {TXT((man.x + woman.x) / 2, man.y + 36, '男 → 女 の向き', TEAL_DARK, FS_TINY, 700)}
          <Arrow x1={king.x} y1={king.y} x2={tipX} y2={king.y} color={AMBER} width={6} opacity={1} />
          <WordPoint x={man.x} y={man.y} label="男" color={SUB_INK} opacity={1} labelDy={32} />
          <WordPoint x={woman.x} y={woman.y} label="女" color={SUB_INK} opacity={1} labelDy={32} />
          <WordPoint x={king.x} y={king.y} label="王様" color={INDIGO} opacity={1} />
          <WordPoint x={queenP.x} y={queenP.y} label="女王" color={queen > 0.6 ? GREEN : DIM} opacity={1} glow={queen} mark={queen > 0.6 ? 1 : 0} />
          {queen > 0.5 && TXT(0, MAIN_CY - 239, '計算で「女王」に着く', AMBER_DARK, FS_NOTE, 800)}
        </g>
      )}

      {/* dims：物差し＝次元（上帯） */}
      {dims > 0.02 && <TopBanner text="甘さ・大きさ・高級さ … 物差しの数だけ、次元がある" opacity={dims} fill={SURFACE} stroke={EDGE} col={INK} />}

      {/* firth：つきあう仲間で決まる（上帯） */}
      {firth > 0.02 && <TopBanner text="「言葉は、つきあう仲間を見ればわかる」" sub="Firth, 1957" opacity={firth} fill={INDIGO_SOFT} stroke={INDIGO} col={INDIGO_DARK} />}

      {/* train：穴埋め＝外れ赤×→寄せ→当たり緑（下帯・settle がここで起こる） */}
      {train > 0.05 && (
        <g opacity={train}>
          <rect x={-470} y={MAIN_CY + 168} width={640} height={66} rx={12} fill={SURFACE} stroke={EDGE} strokeWidth={3} />
          {TXT(-150, MAIN_CY + 201, '…あるところに、おじいさんと', INK, FS_NOTE, 700)}
          <rect x={140} y={MAIN_CY + 177} width={56} height={48} rx={9} fill={settle > 0.5 ? GREEN_SOFT : RED_SOFT} stroke={settle > 0.5 ? GREEN : RED} strokeWidth={3} strokeDasharray="6 6" />
          {TXT(168, MAIN_CY + 201, settle > 0.5 ? '✓' : '?', settle > 0.5 ? GREEN : RED, FS_NOTE, 800)}
          {TXT(330, MAIN_CY + 201, '穴埋め', SUB_INK, FS_TINY, 700)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2「文脈で研ぎ澄ます」
// ============================================================
const b2_in = sc([[sceneStarts.body2 + 8, 0], [sceneStarts.body2 + CROSSFADE + 16, 1]]);
const b2_cold = sc([
  [sceneStarts.body2, 1],
  [F('b2.pronoun'), 1],
  [F('b2.pronoun') + 36, 0],
]);
const b2_pron = ap('b2.pronoun', 44);
const b2_look = ap('b2.lookaround', 40);
const b2_move = ap('b2.move', 50);
const b2_attn = ap('b2.attention', 40);
// pronoun 一式は quiz が立つ前に畳む
const b2_pronEnd = sc([
  [F('b2.attention'), 1],
  [F('b2.quiz'), 1],
  [F('b2.quiz') + 34, 0],
]);
const b2_quiz = ap('b2.quiz', 46);
const b2_quizPull = sc([[F('b2.quiz') + 30, 0], [F('b2.quiz') + 90, 1]]);
const b2_quizEnd = sc([
  [F('b2.focus'), 1],
  [F('b2.focus') + 30, 0],
]);
const b2_focus = ap('b2.focus', 46);
const b2_sharp = sc([[F('b2.focus') + 24, 0], [F('b2.focus') + 90, 1]]);
const b2_focusEnd = sc([[F('b2.general'), 1], [F('b2.general') + 30, 0]]);
const b2_gen = ap('b2.general', 50);

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2_in, f);
  const cold = rv(b2_cold, f);
  const pron = rv(b2_pron, f) * rv(b2_pronEnd, f);
  const look = rv(b2_look, f);
  const move = rv(b2_move, f);
  const attn = rv(b2_attn, f);
  const quiz = rv(b2_quiz, f) * rv(b2_quizEnd, f);
  const quizPull = rv(b2_quizPull, f);
  const focus = rv(b2_focus, f) * rv(b2_focusEnd, f);
  const sharp = rv(b2_sharp, f);
  const gen = rv(b2_gen, f);

  // 「それ」の点：宙ぶらりん→魚の側へ
  const fish = { x: 250, y: MAIN_CY - 30 };
  const cat = { x: -260, y: MAIN_CY + 90 };
  const eaten = { x: -20, y: MAIN_CY + 140 };
  const itStart = { x: 30, y: MAIN_CY - 110 };
  const itX = lerp(itStart.x, fish.x - 70, move);
  const itY = lerp(itStart.y, fish.y, move);

  return (
    <g opacity={vis}>
      <MeaningMap cx={0} cy={MAIN_CY} w={1180} h={460} opacity={inA} />

      {/* 冷たい：一点きり（水寄り・人寄りの影が重なる） */}
      {cold > 0.02 && (
        <g opacity={cold}>
          <WordPoint x={-60} y={MAIN_CY - 10} label="冷たい" color={INDIGO} opacity={1} blur={0.8} />
          {TXT(-260, MAIN_CY - 10, '水？', DIM, FS_NOTE, 700)}
          {TXT(170, MAIN_CY + 20, '人？', DIM, FS_NOTE, 700)}
        </g>
      )}

      {/* 文「猫が魚を食べた。それは…」 */}
      {pron > 0.02 && (
        <g opacity={pron}>
          {TXT(0, MAIN_CY - 200, '猫が魚を食べた。それは新鮮だった。', INK, FS_NOTE, 800)}
          <WordPoint x={cat.x} y={cat.y} label="猫" color={SUB_INK} opacity={1} labelDy={30} />
          <WordPoint x={fish.x} y={fish.y} label="魚" color={SUB_INK} opacity={1} />
          <WordPoint x={eaten.x} y={eaten.y} label="食べた" color={SUB_INK} opacity={0.85} labelDy={30} />

          {/* lookaround：それ→全部の語へ「関係ある？」 */}
          {look > 0.02 && move < 0.98 &&
            [cat, fish, eaten].map((nb, i) => {
              const thick = i === 1 ? lerp(3, 11, move) : lerp(3, 0.5, move);
              const opl = i === 1 ? 1 : 1 - move;
              return <line key={i} x1={itX} y1={itY} x2={nb.x} y2={nb.y} stroke={i === 1 && move > 0.3 ? TEAL : TEAL} strokeWidth={thick} opacity={(look) * 0.8 * opl} strokeLinecap="round" />;
            })}
          {look > 0.3 && move < 0.5 && TXT(itStart.x, itStart.y - 56, '関係ある？', TEAL_DARK, FS_TINY, 700)}

          {/* それ の点（魚の側へ動く） */}
          <WordPoint x={itX} y={itY} label="それ" color={move > 0.5 ? TEAL_DARK : DIM} opacity={1} glow={move} />
        </g>
      )}

      {/* attention ラベル（quiz が立つ前に退場） */}
      {attn > 0.05 && rv(b2_quiz, f) < 0.6 && (
        <g opacity={attn * clamp(1 - rv(b2_quiz, f) * 1.7)}>
          <rect x={-230} y={MAIN_CY + 188} width={460} height={56} rx={12} fill={TEAL_SOFT} stroke={TEAL} strokeWidth={3} />
          {TXT(0, MAIN_CY + 216, 'Attention / Transformer', TEAL_DARK, FS_NOTE, 800)}
        </g>
      )}

      {/* quiz：明るい が、部屋極／性格極の間で性格側へ */}
      {quiz > 0.02 && (
        <g opacity={quiz}>
          <WordPoint x={-360} y={MAIN_CY + 30} label="部屋（光）" color={DIM} opacity={1} labelDy={34} r={11} />
          <WordPoint x={360} y={MAIN_CY + 30} label="性格" color={TEAL} opacity={1} labelDy={34} r={11} />
          <WordPoint x={lerp(0, 250, quizPull)} y={MAIN_CY + 30} label="明るい" color={quizPull > 0.6 ? AMBER : INDIGO} opacity={1} glow={quizPull} mark={quizPull > 0.7 ? 1 : 0} />
          {TXT(0, MAIN_CY - 150, '「彼の話は、いつも明るい」', INK, FS_NOTE, 800)}
        </g>
      )}

      {/* focus：ぼやけ→ピント（重ねるほど鋭く） */}
      {focus > 0.02 && (
        <g opacity={focus}>
          <WordPoint x={0} y={MAIN_CY + 10} label="意味" color={AMBER} opacity={1} blur={1 - sharp} glow={sharp} r={15} />
          {sharp > 0.4 && TXT(0, MAIN_CY + 120, '× 何十回', AMBER_DARK, FS_NOTE, 700)}
        </g>
      )}

      {/* general：初見の文の点も、既知を混ぜてどこかに置ける */}
      {gen > 0.02 && (
        <g opacity={gen}>
          <WordPoint x={-280} y={MAIN_CY - 40} label="既知" color={INDIGO} opacity={0.7} />
          <WordPoint x={-120} y={MAIN_CY + 80} label="既知" color={INDIGO} opacity={0.7} />
          <WordPoint x={lerp(0, -180, clamp(gen * 1.4 - 0.2))} y={lerp(MAIN_CY - 180, MAIN_CY + 10, clamp(gen * 1.4 - 0.2))} label="初見の文" color={GREEN} opacity={1} glow={gen} />
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3「次の一語を引いて、また引く」
// ============================================================
const b3_in = sc([[sceneStarts.body3 + 8, 0], [sceneStarts.body3 + CROSSFADE + 16, 1]]);
const b3_dist = ap('b3.dist', 46);
const b3_pick = ap('b3.pick', 36);
const b3_temp = ap('b3.temp', 40);
const b3_tempMove = sc([[F('b3.temp') + 24, 0], [F('b3.temp') + 80, 1]]);
const b3_tempEnd = sc([[F('b3.halluc'), 1], [F('b3.halluc') + 30, 0]]);
const b3_halluc = ap('b3.halluc', 44);
const b3_hallEnd = sc([[F('b3.append'), 1], [F('b3.append') + 30, 0]]);
const b3_append = ap('b3.append', 40);
const b3_loop = ap('b3.loop', 46);
const b3_noplan = ap('b3.noplan', 50);

// 候補（ラーメンの続き）：高さ＝確率
const RAMEN = [
  { t: '食べた', p: 60 },
  { t: 'すすった', p: 10 },
  { t: '作った', p: 5 },
  { t: '書いた', p: 1 },
];

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3_in, f);
  const dist = rv(b3_dist, f);
  const pick = rv(b3_pick, f);
  const temp = rv(b3_temp, f) * rv(b3_tempEnd, f);
  const tempMove = rv(b3_tempMove, f);
  const halluc = rv(b3_halluc, f) * rv(b3_hallEnd, f);
  const append = rv(b3_append, f);
  const loop = rv(b3_loop, f);
  const noplan = rv(b3_noplan, f);

  const sentY = MAIN_CY - 200;
  const baseY = MAIN_CY + 170; // バーの底
  const ptX = -560; // 最後の点（アンバー）
  const barX0 = -360;
  const barGap = 150;
  const maxH = 240;
  // temp で山の形：tempMove 0=尖る(既定) → 1=平ら
  const flat = temp > 0.02 ? tempMove : 0;

  // 文（append でお尻に「食べた」が付く）
  const baseToks = ['私は', 'ラーメンを'];
  const built = noplan > 0.02; // noplan は別装置

  return (
    <g opacity={vis}>
      {/* 文＋空欄（画面終端まで生存） */}
      <g opacity={inA}>
        {(() => {
          const toks = [...baseToks];
          const ws = toks.map((t) => chipW(t, 32, 30));
          const addW = chipW('食べた', 32, 30);
          const blankW = 92;
          const gap = 12;
          const total = ws.reduce((a, b) => a + b + gap, 0) + (append > 0.5 ? addW + gap : blankW + gap);
          let x = -total / 2;
          const els: React.ReactNode[] = [];
          toks.forEach((t, i) => {
            const cx = x + ws[i] / 2;
            x += ws[i] + gap;
            els.push(<Chip key={'t' + i} cx={cx} cy={sentY} w={ws[i]} h={54} text={t} fill={SURFACE} stroke={EDGE} textCol={INK} fs={32} />);
          });
          if (append > 0.5) {
            const cx = x + addW / 2;
            els.push(<Chip key="add" cx={cx} cy={lerp(baseY - 60, sentY, clamp(append * 1.3 - 0.3))} w={addW} h={54} text="食べた" fill={GREEN_SOFT} stroke={GREEN} textCol={GREEN} fs={32} />);
          } else {
            els.push(
              <g key="bl">
                <rect x={x} y={sentY - 27} width={blankW} height={54} rx={10} fill={SURFACE_SOFT} stroke={INDIGO} strokeWidth={3} strokeDasharray="7 7" />
                {TXT(x + blankW / 2, sentY, '？', INDIGO, 34, 800)}
              </g>,
            );
          }
          return els;
        })()}
      </g>

      {/* 最後の点（文脈を吸ったアンバー）→ 山が立つ */}
      {!built && (
        <>
          <WordPoint x={ptX} y={MAIN_CY + 40} label="最後の点" color={AMBER} opacity={inA} glow={0.6} r={15} />
          {dist > 0.02 && <Arrow x1={ptX + 30} y1={MAIN_CY + 40} x2={barX0 - 60} y2={MAIN_CY + 40} color={AMBER} width={4} opacity={dist} />}

          {/* 確率の山（縦バー） */}
          {dist > 0.02 &&
            RAMEN.map((c, i) => {
              const peak = c.p / 60; // 既定（尖る）
              const flatv = 0.35 + 0.12 * (3 - i); // 平らにしたとき
              const hh = maxH * lerp(peak, flatv, flat) * clamp(dist * 1.3 - i * 0.12);
              if (hh <= 1) return null;
              const cx = barX0 + i * barGap;
              const isPick = i === 0;
              const chosen = isPick && pick > 0.4 && halluc < 0.3;
              const hallPick = i === 3 && halluc > 0.4; // でたらめに低確率を自信満々で
              const col = chosen ? GREEN : hallPick ? RED : INDIGO;
              const soft = chosen ? GREEN_SOFT : hallPick ? RED_SOFT : INDIGO_SOFT;
              return (
                <g key={i}>
                  <rect x={cx - 52} y={baseY - hh} width={104} height={hh} rx={8} fill={soft} stroke={col} strokeWidth={3} />
                  {TXT(cx, baseY - hh - 26, c.p + '%', col, FS_NOTE, 800)}
                  {TXT(cx, baseY + 30, c.t, col === INDIGO ? SUB_INK : col, FS_TINY, 700)}
                  {chosen && TXT(cx, baseY - hh - 64, '選ばれた', GREEN, FS_TINY, 800)}
                  {hallPick && TXT(cx, baseY - hh - 64, 'ハルシネーション', RED, FS_TINY, 800)}
                </g>
              );
            })}
          <line x1={barX0 - 80} y1={baseY} x2={barX0 + 3 * barGap + 80} y2={baseY} stroke={EDGE} strokeWidth={3} />

          {/* temp：ゆらぎのつまみ */}
          {temp > 0.02 && halluc < 0.3 && (
            <g opacity={temp}>
              <rect x={300} y={MAIN_CY - 120} width={300} height={64} rx={14} fill={SURFACE} stroke={EDGE} strokeWidth={3} />
              <line x1={330} y1={MAIN_CY - 88} x2={570} y2={MAIN_CY - 88} stroke={DIM} strokeWidth={5} strokeLinecap="round" />
              <circle cx={lerp(345, 555, tempMove)} cy={MAIN_CY - 88} r={14} fill={AMBER} stroke={AMBER_DARK} strokeWidth={3} />
              {TXT(450, MAIN_CY - 150, 'ゆらぎ（温度）のつまみ', SUB_INK, FS_TINY, 700)}
              {TXT(330, MAIN_CY - 44, '正確', SUB_INK, FS_TINY, 700)}
              {TXT(570, MAIN_CY - 44, '自由', SUB_INK, FS_TINY, 700)}
            </g>
          )}

          {/* loop：出力が入力へ戻る輪 */}
          {loop > 0.05 && (
            <g opacity={loop}>
              <path d={'M ' + (barX0) + ' ' + (baseY + 80) + ' q -320 90 -560 -10'} fill="none" stroke={TEAL} strokeWidth={5} strokeLinecap="round" />
              <path d={'M ' + (ptX - 4) + ' ' + (baseY + 64) + ' l -8 8 l 14 8'} fill="none" stroke={TEAL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              {TXT(-280, baseY + 110, '自己回帰：出力をまた入力へ', TEAL_DARK, FS_NOTE, 800)}
            </g>
          )}
        </>
      )}

      {/* noplan：設計図なしに、語のブロックで建物が建つ */}
      {built && (
        <g opacity={noplan}>
          {Array.from({ length: 6 }).map((_, i) => {
            const ap2 = clamp(noplan * 8 - i);
            if (ap2 <= 0.01) return null;
            const bw = 148 - (i % 3) * 8;
            const bh = 46;
            const by = MAIN_CY + 170 - i * (bh + 5);
            return (
              <g key={i} opacity={ap2}>
                <rect x={-bw / 2 + ((i % 2) - 0.5) * 16} y={by - bh} width={bw} height={bh} rx={8} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={3} />
              </g>
            );
          })}
          {TXT(330, MAIN_CY + 20, '設計図なし', INK, FS_LABEL, 800)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — 結論「場所と距離だけ・中国語の部屋」
// ============================================================
const o_in = sc([[sceneStarts.outro + 8, 0], [sceneStarts.outro + CROSSFADE + 16, 1]]);
const o_empty = ap('outro.empty', 44);
const o_room = ap('outro.room', 56);
const o_symbol = ap('outro.symbol', 48);
const o_roomEnd = sc([[F('outro.human'), 1], [F('outro.human') + 40, 0]]); // 部屋は比較が始まる前に畳む
const o_human = ap('outro.human', 50);
const o_mirror = ap('outro.mirror', 50);
const o_end = ap('outro.end', 56);

// 小さな意味の地図（人／LLM の中身が同じ材料だと見せる比較用）
const MiniMap: React.FC<{ cx: number; cy: number; opacity: number; label: string; col: string }> = ({ cx, cy, opacity, label, col }) => {
  if (opacity <= 0.001) return null;
  const w = 220, h = 150;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={14} fill={SURFACE} stroke={col} strokeWidth={4} />
      <line x1={cx - 46} y1={cy - 14} x2={cx + 40} y2={cy + 30} stroke={DIM} strokeWidth={2.5} strokeDasharray="5 5" />
      <WordPoint x={cx - 46} y={cy - 14} color={INDIGO} opacity={1} r={9} />
      <WordPoint x={cx + 40} y={cy + 30} color={INDIGO} opacity={1} r={9} />
      <WordPoint x={cx + 18} y={cy - 40} color={INDIGO} opacity={1} r={9} />
      {TXT(cx, cy + h / 2 + 30, label, col, FS_NOTE, 800)}
    </g>
  );
};

// 中国語の部屋
const ChineseRoom: React.FC<{ cx: number; cy: number; opacity: number; symbol: number }> = ({ cx, cy, opacity, symbol }) => {
  if (opacity <= 0.001) return null;
  const w = 360, h = 260;
  const inX = lerp(cx - w / 2 - 90, cx - 60, clamp(symbol * 1.6));
  const outX = lerp(cx + 60, cx + w / 2 + 90, clamp(symbol * 1.6 - 0.6));
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={16} fill={SURFACE} stroke={SUB_INK} strokeWidth={4} />
      {TXT(cx, cy - h / 2 - 28, '中国語の部屋', INK, FS_NOTE, 800)}
      {/* 中の人 */}
      <circle cx={cx - 50} cy={cy - 10} r={26} fill={SURFACE_SOFT} stroke={SUB_INK} strokeWidth={3} />
      <path d={'M ' + (cx - 84) + ' ' + (cy + 70) + ' q 34 -54 68 0'} fill={SURFACE_SOFT} stroke={SUB_INK} strokeWidth={3} />
      {/* マニュアル */}
      <rect x={cx + 14} y={cy - 30} width={86} height={104} rx={8} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={3} />
      {TXT(cx + 57, cy + 22, '規則表', INDIGO_DARK, FS_TINY, 700)}
      {/* 記号 in / out */}
      {symbol > 0.02 && (
        <g opacity={symbol}>
          <Chip cx={inX} cy={cy + 105} w={66} h={50} text="入" fill={SURFACE} stroke={SUB_INK} textCol={INK} fs={FS_NOTE} />
          <Chip cx={outX} cy={cy + 105} w={66} h={50} text="出" fill={RED_SOFT} stroke={RED} textCol={RED} fs={FS_NOTE} />
        </g>
      )}
    </g>
  );
};

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(o_in, f);
  const empty = rv(o_empty, f);
  const room = rv(o_room, f);
  const symbol = rv(o_symbol, f);
  const roomEnd = rv(o_roomEnd, f);
  const human = rv(o_human, f);
  const mirror = rv(o_mirror, f);
  const end = rv(o_end, f);

  const mapAlive = inA * clamp(1 - room * 1.4); // 部屋が立つと地図は退場

  return (
    <g opacity={vis}>
      {/* 地図と点（→ 部屋へ役を譲る） */}
      {mapAlive > 0.01 && (
        <g opacity={mapAlive}>
          <MeaningMap cx={0} cy={MAIN_CY} w={1100} h={420} opacity={1} />
          <WordPoint x={-220} y={MAIN_CY - 30} label="りんご" color={INDIGO} opacity={1} />
          <WordPoint x={60} y={MAIN_CY + 60} label="みかん" color={INDIGO} opacity={1} />
          <WordPoint x={320} y={MAIN_CY - 50} label="政府" color={INDIGO} opacity={1} />
          {empty > 0.05 && (
            <g opacity={empty}>
              <line x1={-220} y1={MAIN_CY - 30} x2={60} y2={MAIN_CY + 60} stroke={DIM} strokeWidth={3} strokeDasharray="7 7" />
              {TXT(-80, MAIN_CY + 30, '距離', DIM, FS_TINY, 700)}
            </g>
          )}
        </g>
      )}

      {/* 中国語の部屋（記号操作＝理解に見える）。比較が始まる前に畳む */}
      {room > 0.02 && roomEnd > 0.02 && (
        <g opacity={room * roomEnd}>
          <ChineseRoom cx={0} cy={MAIN_CY} opacity={1} symbol={symbol} />
        </g>
      )}

      {/* 人 ↔ LLM の並置：使う材料は同じ */}
      {human > 0.02 && (
        <>
          <MiniMap cx={300} cy={MAIN_CY - 10} opacity={human} label="人" col={GREEN} />
          {mirror > 0.04 && <MiniMap cx={-300} cy={MAIN_CY - 10} opacity={mirror} label="LLM" col={INDIGO} />}
          {mirror > 0.2 && (
            <g opacity={clamp(mirror * 1.4 - 0.2)}>
              {TXT(0, MAIN_CY - 10, '=', INK, 64, 800)}
              {TXT(0, MAIN_CY - 230, '同じ材料', INK, FS_LABEL, 800)}
            </g>
          )}
        </>
      )}

      {/* end：理解と計算の境目が薄れる */}
      {end > 0.05 && (
        <g opacity={end}>
          <rect x={-470} y={MAIN_CY + 188} width={940} height={66} rx={14} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={3} />
          {TXT(0, MAIN_CY + 221, '「理解」と「計算」の境目が、薄れていく', INDIGO_DARK, FS_NOTE, 800)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// セクションタイトル（画面跨ぎ・左上）
// ============================================================
const SCENE_TITLES: { start: number; text: string }[] = [
  { start: sceneStarts.intro, text: '序論' },
  { start: sceneStarts.body1, text: '01 言葉を、地図の上に置く' },
  { start: sceneStarts.body2, text: '02 文脈で、意味を研ぎ澄ます' },
  { start: sceneStarts.body3, text: '03 次の一語を引いて、また引く' },
  { start: sceneStarts.outro, text: '結論' },
];

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-918} y={-504} width={10} height={36} rx={5} fill={INDIGO} />
      <text x={-890} y={-485} fill={SUB_INK} fontSize={FS_SCENE} fontFamily={FONT} fontWeight={700} textAnchor="start" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
};

// ===== 対話字幕（折返し）=====
const wrapLine = (text: string, single: number): string[] => {
  if (text.length <= single) return [text];
  const mid = Math.floor(text.length / 2);
  let cut = mid;
  for (let d = 0; d < mid; d++) {
    if (text[mid + d] === '、' || text[mid + d] === '。') {
      cut = mid + d + 1;
      break;
    }
    if (text[mid - d] === '、' || text[mid - d] === '。') {
      cut = mid - d + 1;
      break;
    }
  }
  return [text.slice(0, cut), text.slice(cut)];
};

const lineAt = (frame: number): number => {
  let idx = 0;
  for (let i = 0; i < SCRIPT.length; i++) if (frame >= lineStarts[i]) idx = i;
  return idx;
};

// ============================================================
// 立ち絵（05_finishing.md・HTML オーバーレイ）
//   配置値・画像セットは FigureLayout.tsx を正典に移植
// ============================================================
const VARIANTS = ['default', 'normal2', 'normal3', 'normal4'] as const;
const CHAR_DIR: Record<Speaker, string> = { ずんだもん: 'zundamon', めたん: 'metan' };
const FLAP = 5; // モック口パク：開 FLAP / 閉 FLAP（後で音声駆動 isMouthOpen に差替）

const lastLineOf = (frame: number, sp: Speaker): number => {
  let idx = 0;
  for (let i = 0; i < SCRIPT.length; i++)
    if (SCRIPT[i].speaker === sp && frame >= lineStarts[i]) idx = i;
  return idx;
};
const isMouthOpen = (frame: number): boolean =>
  Math.floor((frame - lineStarts[lineAt(frame)]) / FLAP) % 2 === 0;

const charSrc = (sp: Speaker, frame: number, speaking: boolean): string => {
  const v = VARIANTS[lastLineOf(frame, sp) % VARIANTS.length];
  const mouth = speaking && isMouthOpen(frame) ? 'open' : 'close';
  return `characters/${CHAR_DIR[sp]}/${v}-${mouth}.png`;
};

const Characters: React.FC<{ frame: number }> = ({ frame }) => {
  const cur = SCRIPT[lineAt(frame)].speaker;
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 340,
    zIndex: 30,
    filter: 'drop-shadow(0 6px 20px rgba(36,48,68,0.18))',
    pointerEvents: 'none',
  };
  return (
    <>
      <div style={{ ...base, left: 10, bottom: -130, transform: 'scaleX(-1)' }}>
        <Img src={staticFile(charSrc('めたん', frame, cur === 'めたん'))} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div style={{ ...base, right: 10, bottom: -60 }}>
        <Img src={staticFile(charSrc('ずんだもん', frame, cur === 'ずんだもん'))} style={{ width: '100%', height: 'auto' }} />
      </div>
    </>
  );
};

// ===== 対話字幕（HTML 帯・最前面・必須）=====
const SubtitleBand: React.FC<{ frame: number }> = ({ frame }) => {
  const idx = lineAt(frame);
  const line = SCRIPT[idx];
  const op = clamp((frame - lineStarts[idx]) / 8);
  const rows = wrapLine(line.text, 25);
  return (
    <div
      style={{
        position: 'absolute',
        top: 866,
        left: 68,
        width: 1784,
        height: 280,
        backgroundColor: 'rgba(255,255,255,0.72)',
        borderTop: `3px solid ${EDGE}`,
        borderRadius: '20px 20px 0 0',
        zIndex: 25,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 214,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: op,
          fontFamily: FONT,
        }}
      >
        <div style={{ fontSize: FS_SPEAKER, fontWeight: 800, color: SPEAKER_COLOR[line.speaker] }}>{line.speaker}</div>
        {rows.map((r, i) => (
          <div key={i} style={{ fontSize: FS_SUB, fontWeight: 600, color: INK, lineHeight: 1.1 }}>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// メイン
// ============================================================
export const LLM: React.FC = () => {
  const f = useCurrentFrame();

  let titleIdx = 0;
  for (let i = 0; i < SCENE_TITLES.length; i++) {
    if (f >= SCENE_TITLES[i].start) titleIdx = i;
  }
  const titleOpacity = clamp((f - SCENE_TITLES[titleIdx].start) / 16);

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
        <defs>
          <radialGradient id="llm_bgglow" cx="50%" cy="34%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#llm_bgglow)" />

        <SceneIntro f={f} vis={rv(introVis, f)} />
        <SceneBody1 f={f} vis={rv(body1Vis, f)} />
        <SceneBody2 f={f} vis={rv(body2Vis, f)} />
        <SceneBody3 f={f} vis={rv(body3Vis, f)} />
        <SceneOutro f={f} vis={rv(outroVis, f)} />

        <SceneTitle text={SCENE_TITLES[titleIdx].text} opacity={titleOpacity} />
      </svg>

      <Characters frame={f} />
      <SubtitleBand frame={f} />
    </AbsoluteFill>
  );
};
