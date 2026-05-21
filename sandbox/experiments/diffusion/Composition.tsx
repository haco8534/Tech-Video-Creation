// [4] Remotion 実装 — diffusion（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 対話字幕は SCRIPT 全行から自動描画（04_remotion.md §7）。
// 背骨はキャンバス（ノイズ量0〜1）。装置はそのノイズ量を上げ下げする工程として連なる。
// 白テーマ・文字サイズ下限は固定ベース。座標・キーフレーム数値はこのファイル内で直書き。

import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SCRIPT, AnimEvent, Speaker } from './scriptData';

// ===== 固定ベース：白テーマ =====
const BG = '#f5f7fa';
const SURFACE = '#ffffff';
const SURFACE_SOFT = '#eef1f6';
const EDGE = '#c4cedd';
const EDGE_SOFT = '#dce1ea';
const INK = '#243044';
const SUB_INK = '#5d6b82';
const DIM = '#9aa6b8';
const SHADOW = '#243044';

// ===== アクセント（拡散モデルの語彙）=====
const MACHINE = '#1aa39a'; // ノイズ予測器（ティール）
const MACHINE_DARK = '#0f7c75';
const MACHINE_SOFT = '#e2f3f1';
const PROMPT = '#e0901e'; // プロンプト・方位磁針（アンバー）
const PROMPT_INK = '#9a6614';
const PROMPT_SOFT = '#fbedce';
const ERRC = '#d9543c'; // ずれ（コーラル）
const OKC = '#3f9d57';

const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
const SPEAKER_COLOR: Record<Speaker, string> = {
  めたん: '#d6336c',
  ずんだもん: '#2f9e44',
};

// ===== 文字サイズ（固定ベース・下限つき）=====
const FS_TITLE = 60;
const FS_SUB = 42;
const FS_SPEAKER = 31;
const FS_SCENE = 30;
const FS_LABEL = 33;
const FS_NOTE = 28;
const FS_TINY = 27;

// ===== 台本とフレーム =====
const CHAR_FRAMES = 4.5;
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

const blendNumeric = <S,>(a: S, b: S, t: number): S => {
  const aR = a as unknown as Record<string, number>;
  const bR = b as unknown as Record<string, number>;
  const out: Record<string, number> = {};
  for (const k in aR) out[k] = aR[k] + (bR[k] - aR[k]) * t;
  return out as unknown as S;
};

const resolveTrack = <S,>(track: Track<S>, f: number): S => {
  if (track.length === 0) throw new Error('empty track');
  if (f <= track[0].f) return track[0].state;
  for (let i = 0; i < track.length - 1; i++) {
    const a = track[i];
    const b = track[i + 1];
    if (f >= a.f && f <= b.f) {
      const t = ease((f - a.f) / Math.max(1, b.f - a.f));
      return blendNumeric(a.state, b.state, t);
    }
  }
  return track[track.length - 1].state;
};

type Sc = { v: number };
const sc = (pairs: [number, number][]): Track<Sc> =>
  pairs.map(([f, v]) => ({ f, state: { v } }));
const rv = (track: Track<Sc>, f: number): number => resolveTrack(track, f).v;

// ===== 数値ヘルパ =====
const clamp = (x: number, lo = 0, hi = 1): number => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const smooth = (t: number): number => {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
};
const hex2 = (n: number): string =>
  ('0' + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
const hexLerp = (a: string, b: string, t: number): string => {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return '#' + hex2(lerp(pa[0], pb[0], t)) + hex2(lerp(pa[1], pb[1], t)) + hex2(lerp(pa[2], pb[2], t));
};

// ============================================================
// 背骨：キャンバス（絵の場）
// ドット絵の色と砂あらしの粒を、ノイズ量0〜1で連続的に溶け合わせる。
// ============================================================
const GRID = 12;

const PAL: Record<string, string> = {
  '.': '#a9d2e6', // 空
  o: '#e8943a', // ねこ毛
  k: '#3a2a22', // 輪郭・目
  p: '#e87f93', // 鼻・ピンク
  w: '#f6ead0', // クリーム白
  g: '#6fc06a', // 葉
  d: '#3f7a3c', // 茎・土
  r: '#d2674a', // 屋根
  n: '#d9c9a8', // 壁
  m: '#8a93a8', // 岩
  M: '#5c6478', // 岩の陰
  S: '#f4f7fb', // 雪
  G: '#bfe6ee', // ヘルメットのガラス
  s: '#e6ebf2', // 宇宙服
  y: '#f2c84b', // 黄
  f: '#f0c9a0', // 肌
  h: '#5a4632', // 髪・扉
  P: '#f3f0e9', // 紙
};

const PICTURES: Record<string, string[]> = {
  cat: [
    '..k......k..',
    '.kok....kok.',
    '.kooooooook.',
    '.kooooooook.',
    '.kokoookook.',
    '.kooooooook.',
    '.koooppoook.',
    '.koowwwwook.',
    '.kooooooook.',
    '.kooooooook.',
    '.kkooooookk.',
    '..kk....kk..',
  ],
  catSpace: [
    '...GGGGGG...',
    '..GGGGGGGG..',
    '.GGGGGGGGGG.',
    '.GGkooookGG.',
    '.GGokkokoGG.',
    '.GGooppooGG.',
    '.GGoowwooGG.',
    '.GGGGGGGGGG.',
    '...ssssss...',
    '..ssyyyyss..',
    '..ssssssss..',
    '..ss....ss..',
  ],
  house: [
    '.....kk.....',
    '....krrk....',
    '...krrrrk...',
    '..krrrrrrk..',
    '.krrrrrrrrk.',
    'krrrrrrrrrrk',
    '.knnnnnnnnk.',
    '.knwwnnwwnk.',
    '.knwwnnwwnk.',
    '.knnnhhnnnk.',
    '.knnnhhnnnk.',
    '.kkkkkkkkkk.',
  ],
  flower: [
    '....pppp....',
    '..pppppppp..',
    '.ppppyypppp.',
    '.pppyyyyppp.',
    '.ppppyypppp.',
    '..pppppppp..',
    '....pppp....',
    '.....dd.....',
    '...g.dd.g...',
    '..gggddggg..',
    '.....dd.....',
    '....dddd....',
  ],
  mountain: [
    '............',
    '.....SS.....',
    '....SSSS....',
    '...SSmmSS...',
    '...mmSSmm...',
    '..mmmmmmmm..',
    '..mmmMMmmm..',
    '.mmmmmmmmmm.',
    '.mmMmmmmMmm.',
    'mmmmmmmmmmmm',
    'mmMmmmmmMmmm',
    'mmmmmmmmmmmm',
  ],
  face: [
    '...hhhhhh...',
    '..hhhhhhhh..',
    '.hhffffffhh.',
    '.hffffffffh.',
    '.ffkffffkff.',
    '.ffffffffff.',
    '.fffffwffff.',
    '.ffffffffff.',
    '.fffppppfff.',
    '.ffffffffff.',
    '..ffffffff..',
    '...ffffff...',
  ],
  paper: [
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
    'PPPPPPPPPPPP',
  ],
};

// 砂あらしの粒：(seed,i,j) で決まるグレー。決定的なので同じ seed なら同じ砂あらし。
const noiseAt = (seed: number, i: number, j: number): string => {
  const s = Math.sin((i + 1) * 12.9898 + (j + 1) * 78.233 + seed * 37.71) * 43758.5453;
  const r = s - Math.floor(s);
  const b = 0.12 + 0.82 * r;
  return '#' + hex2(255 * b) + hex2(255 * b) + hex2(255 * Math.min(1, b * 1.05));
};
// タイルごとの溶け出しのばらつき（一斉でなく有機的に崩す）
const tileJit = (seed: number, i: number, j: number): number => {
  const s = Math.sin((i + 3) * 4.137 + (j + 7) * 9.71 + seed * 1.33) * 1234.567;
  return s - Math.floor(s);
};

const Canvas: React.FC<{
  cx: number;
  cy: number;
  size: number;
  noise: number; // 0=鮮明な絵 / 1=完全な砂あらし
  picId: string;
  opacity: number;
  seed?: number;
  picIdB?: string;
  picMix?: number;
  frameless?: boolean;
}> = ({ cx, cy, size, noise, picId, opacity, seed = 1, picIdB, picMix = 0, frameless = false }) => {
  if (opacity <= 0.001) return null;
  const tile = size / GRID;
  const ox = cx - size / 2;
  const oy = cy - size / 2;
  const picA = PICTURES[picId] || PICTURES.paper;
  const picB = picIdB ? PICTURES[picIdB] || picA : picA;
  const mix = clamp(picMix);
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const ca = PAL[picA[i][j]] || '#000000';
      const cb = PAL[picB[i][j]] || '#000000';
      const pc = mix > 0.001 ? hexLerp(ca, cb, mix) : ca;
      const nc = noiseAt(seed, i, j);
      const eff = clamp(noise + (tileJit(seed, i, j) - 0.5) * 0.13);
      cells.push(
        <rect
          key={i * GRID + j}
          x={ox + j * tile}
          y={oy + i * tile}
          width={tile + 0.7}
          height={tile + 0.7}
          fill={hexLerp(pc, nc, eff)}
        />,
      );
    }
  }
  return (
    <g opacity={opacity}>
      {!frameless && (
        <>
          <rect x={ox - 13} y={oy - 7} width={size + 26} height={size + 26} rx={16} fill={SHADOW} opacity={0.12} />
          <rect
            x={ox - 13}
            y={oy - 13}
            width={size + 26}
            height={size + 26}
            rx={16}
            fill={SURFACE}
            stroke={EDGE}
            strokeWidth={2.5}
          />
        </>
      )}
      {cells}
      <rect x={ox} y={oy} width={size} height={size} fill="none" stroke={EDGE} strokeWidth={1.5} />
    </g>
  );
};

// 砂あらし片（純ノイズの小札）。記録ノイズ片・予測ノイズ片に使う。
const NoiseChip: React.FC<{
  cx: number;
  cy: number;
  size: number;
  seed: number;
  opacity: number;
  edge?: string;
  label?: string;
}> = ({ cx, cy, size, seed, opacity, edge = EDGE, label }) => {
  if (opacity <= 0.001) return null;
  const N = 7;
  const tile = size / N;
  const ox = cx - size / 2;
  const oy = cy - size / 2;
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      cells.push(
        <rect
          key={i * N + j}
          x={ox + j * tile}
          y={oy + i * tile}
          width={tile + 0.6}
          height={tile + 0.6}
          fill={noiseAt(seed, i, j)}
        />,
      );
    }
  }
  const labelColor = edge === MACHINE ? MACHINE_DARK : edge === PROMPT ? PROMPT_INK : SUB_INK;
  return (
    <g opacity={opacity}>
      <rect
        x={ox - 6}
        y={oy - 6}
        width={size + 12}
        height={size + 12}
        rx={8}
        fill={SURFACE}
        stroke={edge}
        strokeWidth={2.5}
      />
      {cells}
      {label && (
        <text
          x={cx}
          y={oy + size + 28}
          fill={labelColor}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
};

// ============================================================
// 装置：虫めがね（砂あらしの奥を覗く。粒しか映らない）
// ============================================================
const Magnifier: React.FC<{ cx: number; cy: number; opacity: number }> = ({ cx, cy, opacity }) => {
  if (opacity <= 0.001) return null;
  const r = 92;
  const cid = 'maglens_' + Math.round(cx) + '_' + Math.round(cy);
  const grains: React.ReactNode[] = [];
  const gn = 5;
  const gs = (r * 2) / gn;
  for (let i = 0; i < gn; i++) {
    for (let j = 0; j < gn; j++) {
      grains.push(
        <rect
          key={i * gn + j}
          x={cx - r + j * gs}
          y={cy - r + i * gs}
          width={gs + 0.8}
          height={gs + 0.8}
          fill={noiseAt(7, i, j)}
        />,
      );
    }
  }
  return (
    <g opacity={opacity}>
      <defs>
        <clipPath id={cid}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <g clipPath={'url(#' + cid + ')'}>{grains}</g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth={8} />
      <line
        x1={cx + r * 0.72}
        y1={cy + r * 0.72}
        x2={cx + r * 1.5}
        y2={cy + r * 1.5}
        stroke={INK}
        strokeWidth={16}
        strokeLinecap="round"
      />
    </g>
  );
};

// ============================================================
// 装置：ノイズ予測器（機械）。tune 0→1 で内部の指標バーが整い、技が定着。
// ============================================================
const Predictor: React.FC<{
  cx: number;
  cy: number;
  scale: number;
  opacity: number;
  tune: number;
  active: number;
}> = ({ cx, cy, scale, opacity, tune, active }) => {
  if (opacity <= 0.001) return null;
  const w = 188 * scale;
  const h = 150 * scale;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - w / 2 - 10}
        y={cy - h / 2 - 10}
        width={w + 20}
        height={h + 20}
        rx={18}
        fill={MACHINE}
        opacity={0.1 + 0.16 * active + 0.1 * tune}
      />
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={14}
        fill={MACHINE_SOFT}
        stroke={MACHINE}
        strokeWidth={3}
      />
      <circle cx={cx - w / 2} cy={cy} r={15 * scale} fill={SURFACE} stroke={MACHINE} strokeWidth={3} />
      <circle cx={cx - w / 2} cy={cy} r={7 * scale} fill={MACHINE} opacity={0.45 + 0.55 * active} />
      <rect
        x={cx + w / 2 - 2}
        y={cy - 13 * scale}
        width={20 * scale}
        height={26 * scale}
        rx={5}
        fill={MACHINE_SOFT}
        stroke={MACHINE}
        strokeWidth={3}
      />
      {[0, 1, 2, 3].map((b) => {
        const raw = 0.32 + 0.62 * (0.5 + 0.5 * Math.sin(b * 31.7));
        const lv = lerp(raw, 0.62, tune);
        return (
          <rect
            key={b}
            x={cx - w / 2 + (16 + b * 38) * scale}
            y={cy + h / 2 - 16 * scale - lv * 78 * scale}
            width={24 * scale}
            height={lv * 78 * scale}
            rx={4}
            fill={hexLerp('#a8ddd8', MACHINE_DARK, 0.25 + 0.75 * tune)}
          />
        );
      })}
      <text
        x={cx}
        y={cy - h / 2 - 26}
        fill={MACHINE_DARK}
        fontSize={FS_LABEL}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        ノイズ予測器
      </text>
    </g>
  );
};

// ============================================================
// 装置：引き算記号
// ============================================================
const MinusSign: React.FC<{ cx: number; cy: number; opacity: number }> = ({ cx, cy, opacity }) => {
  if (opacity <= 0.001) return null;
  const r = 30;
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill={SURFACE} stroke={MACHINE} strokeWidth={3} />
      <rect x={cx - r * 0.52} y={cy - 4} width={r * 1.04} height={8} rx={4} fill={MACHINE} />
    </g>
  );
};

// ============================================================
// 装置：ずれメーター（予測と正解のずれ＝誤差。学習で縮む）
// ============================================================
const ErrorMeter: React.FC<{ cx: number; cy: number; w: number; err: number; opacity: number }> = ({
  cx,
  cy,
  w,
  err,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const e = clamp(err);
  const nx = cx - w / 2 + e * w;
  return (
    <g opacity={opacity}>
      <text
        x={cx - w / 2 - 20}
        y={cy}
        fill={SUB_INK}
        fontSize={FS_LABEL}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="end"
        dominantBaseline="central"
      >
        ずれ
      </text>
      <rect x={cx - w / 2} y={cy - 10} width={w} height={20} rx={10} fill={SURFACE_SOFT} stroke={EDGE} strokeWidth={1.5} />
      <rect x={cx - w / 2} y={cy - 10} width={Math.max(0, e * w)} height={20} rx={10} fill={hexLerp(OKC, ERRC, e)} />
      <line x1={nx} y1={cy - 26} x2={nx} y2={cy + 26} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <polygon
        points={nx + ',' + (cy - 30) + ' ' + (nx - 11) + ',' + (cy - 48) + ' ' + (nx + 11) + ',' + (cy - 48)}
        fill={hexLerp(OKC, ERRC, e)}
      />
    </g>
  );
};

// ============================================================
// 装置：方位磁針（プロンプト＝引く向きを決める道具）
// ============================================================
const Compass: React.FC<{
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  angle: number;
  lock: number;
}> = ({ cx, cy, r, opacity, angle, lock }) => {
  if (opacity <= 0.001) return null;
  const rad = (angle * Math.PI) / 180;
  const nx = cx + Math.cos(rad) * r * 0.78;
  const ny = cy + Math.sin(rad) * r * 0.78;
  const tx = cx - Math.cos(rad) * r * 0.4;
  const ty = cy - Math.sin(rad) * r * 0.4;
  const px = -Math.sin(rad);
  const py = Math.cos(rad);
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r + 9} fill={PROMPT} opacity={0.08 + 0.2 * lock} />
      <circle cx={cx} cy={cy} r={r} fill={SURFACE} stroke={PROMPT} strokeWidth={3} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const ar = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx + Math.cos(ar) * r * 0.86}
            y1={cy + Math.sin(ar) * r * 0.86}
            x2={cx + Math.cos(ar) * r * 0.98}
            y2={cy + Math.sin(ar) * r * 0.98}
            stroke={DIM}
            strokeWidth={2.5}
          />
        );
      })}
      <polygon
        points={
          nx + ',' + ny + ' ' +
          (tx + px * 12) + ',' + (ty + py * 12) + ' ' +
          (tx - px * 12) + ',' + (ty - py * 12)
        }
        fill={hexLerp('#c79433', PROMPT, 0.3 + 0.7 * lock)}
      />
      <circle cx={cx} cy={cy} r={10} fill={PROMPT} />
    </g>
  );
};

// ============================================================
// 装置：強度つまみ（プロンプトの効き目を弱↔強で調節）
// ============================================================
const StrengthDial: React.FC<{ cx: number; cy: number; w: number; pos: number; opacity: number }> = ({
  cx,
  cy,
  w,
  pos,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const kx = cx - w / 2 + clamp(pos) * w;
  return (
    <g opacity={opacity}>
      <text
        x={cx - w / 2 - 22}
        y={cy}
        fill={SUB_INK}
        fontSize={FS_LABEL}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="end"
        dominantBaseline="central"
      >
        弱
      </text>
      <text
        x={cx + w / 2 + 22}
        y={cy}
        fill={PROMPT_INK}
        fontSize={FS_LABEL}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="start"
        dominantBaseline="central"
      >
        強
      </text>
      <rect x={cx - w / 2} y={cy - 7} width={w} height={14} rx={7} fill={SURFACE_SOFT} stroke={EDGE} strokeWidth={1.5} />
      <rect x={cx - w / 2} y={cy - 7} width={Math.max(0, clamp(pos) * w)} height={14} rx={7} fill={PROMPT} opacity={0.75} />
      <circle cx={kx} cy={cy} r={21} fill={PROMPT} stroke="#8a6310" strokeWidth={2.5} />
      <circle cx={kx} cy={cy} r={8} fill="#8a6310" opacity={0.45} />
    </g>
  );
};

// ============================================================
// 装置：紙への描き足し（人の描き方＝足し算）
// ============================================================
const PaperStrokes: React.FC<{ cx: number; cy: number; s: number; draw: number; opacity: number }> = ({
  cx,
  cy,
  s,
  draw,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const strokes = [
    'M ' + (cx - 0.4 * s) + ' ' + (cy - 0.04 * s) + ' L ' + cx + ' ' + (cy - 0.38 * s) + ' L ' + (cx + 0.4 * s) + ' ' + (cy - 0.04 * s),
    'M ' + (cx - 0.32 * s) + ' ' + (cy - 0.04 * s) + ' L ' + (cx - 0.32 * s) + ' ' + (cy + 0.36 * s),
    'M ' + (cx + 0.32 * s) + ' ' + (cy - 0.04 * s) + ' L ' + (cx + 0.32 * s) + ' ' + (cy + 0.36 * s),
    'M ' + (cx - 0.32 * s) + ' ' + (cy + 0.36 * s) + ' L ' + (cx + 0.32 * s) + ' ' + (cy + 0.36 * s),
    'M ' + (cx - 0.1 * s) + ' ' + (cy + 0.36 * s) + ' L ' + (cx - 0.1 * s) + ' ' + (cy + 0.1 * s) + ' L ' + (cx + 0.1 * s) + ' ' + (cy + 0.1 * s) + ' L ' + (cx + 0.1 * s) + ' ' + (cy + 0.36 * s),
  ];
  const N = strokes.length;
  return (
    <g opacity={opacity}>
      {strokes.map((d, i) => {
        const lp = clamp(draw * N - i);
        if (lp <= 0.001) return null;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={INK}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - lp}
          />
        );
      })}
    </g>
  );
};

// ============================================================
// 装置：工程アイコン（結論の振り返り）
// ============================================================
const STAGE_ICONS = ['壊す', '練習', 'のぼる', '方位磁針'];
const StageIcon: React.FC<{ cx: number; cy: number; kind: number; opacity: number }> = ({
  cx,
  cy,
  kind,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - 62} y={cy - 51} width={124} height={112} rx={16} fill={SHADOW} opacity={0.1} />
      <rect x={cx - 62} y={cy - 56} width={124} height={112} rx={16} fill={SURFACE} stroke={EDGE} strokeWidth={2} />
      {kind === 0 && (
        <g>
          {[0, 1, 2, 3].map((i) =>
            [0, 1, 2, 3].map((j) => (
              <rect
                key={i + '_' + j}
                x={cx - 38 + j * 20}
                y={cy - 36 + i * 20}
                width={18}
                height={18}
                rx={3}
                fill={hexLerp('#e8943a', noiseAt(2, i, j), ((i + j) % 4) / 3.2 + 0.1)}
              />
            )),
          )}
        </g>
      )}
      {kind === 1 && (
        <g>
          <rect x={cx - 33} y={cy - 28} width={66} height={54} rx={9} fill={MACHINE_SOFT} stroke={MACHINE} strokeWidth={2.5} />
          {[0, 1, 2].map((b) => (
            <rect key={b} x={cx - 22 + b * 17} y={cy + 14 - (9 + b * 9)} width={11} height={9 + b * 9} rx={2} fill={MACHINE} />
          ))}
        </g>
      )}
      {kind === 2 && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={cx - 36 + i * 19} y={cy + 26 - (13 + i * 13)} width={15} height={13 + i * 13} rx={3} fill={DIM} />
          ))}
          <path d={'M ' + (cx - 30) + ' ' + (cy + 20) + ' L ' + (cx + 32) + ' ' + (cy - 32)} fill="none" stroke={PROMPT} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      {kind === 3 && (
        <g>
          <circle cx={cx} cy={cy} r={33} fill={PROMPT_SOFT} stroke={PROMPT} strokeWidth={2.5} />
          <polygon points={cx + 21 + ',' + (cy - 15) + ' ' + (cx - 15) + ',' + (cy + 8) + ' ' + (cx - 5) + ',' + (cy + 18)} fill={PROMPT} />
          <circle cx={cx} cy={cy} r={6} fill={PROMPT} />
        </g>
      )}
      <text
        x={cx}
        y={cy + 88}
        fill={SUB_INK}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {STAGE_ICONS[kind]}
      </text>
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
  body4: F('scene.body4.in'),
  outro: F('scene.outro.in'),
};

const introVis = sc([
  [0, 1],
  [sceneStarts.body1, 1],
  [sceneStarts.body1 + CROSSFADE, 0],
  [TOTAL_FRAMES, 0],
]);
const midVis = (sN: number, sNext: number): Track<Sc> =>
  sc([
    [sN, 0],
    [sN + CROSSFADE, 1],
    [sNext, 1],
    [sNext + CROSSFADE, 0],
    [TOTAL_FRAMES, 0],
  ]);
const body1Vis = midVis(sceneStarts.body1, sceneStarts.body2);
const body2Vis = midVis(sceneStarts.body2, sceneStarts.body3);
const body3Vis = midVis(sceneStarts.body3, sceneStarts.body4);
const body4Vis = midVis(sceneStarts.body4, sceneStarts.outro);
const outroVis = sc([
  [sceneStarts.outro, 0],
  [sceneStarts.outro + CROSSFADE, 1],
  [TOTAL_FRAMES, 1],
]);

// ============================================================
// 画面1 — 序論
// ============================================================
const introNoise = sc([
  [0, 0],
  [F('intro.subtract'), 0],
  [F('intro.subtract') + 56, 1],
  [F('intro.reveal'), 1],
  [F('intro.reveal') + 96, 0.06],
  [F('intro.mystery'), 0.06],
  [F('intro.mystery') + 54, 1],
  [F('intro.name'), 1],
  [F('intro.name') + 64, 0.5],
  [TOTAL_FRAMES, 0.5],
]);
const introDraw = sc([
  [70, 0],
  [F('intro.subtract') - 24, 1],
]);
const introStrokeFade = sc([
  [F('intro.subtract'), 1],
  [F('intro.subtract') + 38, 0],
]);
const introMag = sc([
  [F('intro.mystery') + 10, 0],
  [F('intro.mystery') + 50, 1],
  [F('intro.name'), 1],
  [F('intro.name') + 30, 0],
]);
const introTitle = sc([
  [F('intro.name') + 8, 0],
  [F('intro.name') + 50, 1],
]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const cx = 0;
  const cy = -78;
  const size = 420;
  const noise = rv(introNoise, f);
  const strokes = rv(introDraw, f) * rv(introStrokeFade, f);
  const mag = rv(introMag, f);
  const title = rv(introTitle, f);
  const usePaper = f < F('intro.subtract') + 56;
  return (
    <g opacity={vis}>
      <Canvas cx={cx} cy={cy} size={size} noise={noise} picId={usePaper ? 'paper' : 'cat'} opacity={1} seed={3} />
      <PaperStrokes cx={cx} cy={cy} s={size} draw={rv(introDraw, f)} opacity={strokes} />
      <Magnifier cx={cx + 92} cy={cy + 66} opacity={mag} />
      <g opacity={title}>
        <text
          x={cx}
          y={cy + size / 2 + 84}
          fill={PROMPT_INK}
          fontSize={FS_TITLE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
        >
          拡散モデル
        </text>
        <text
          x={cx}
          y={cy + size / 2 + 138}
          fill={SUB_INK}
          fontSize={FS_SCENE}
          fontFamily={FONT}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
        >
          ── AIはどうやって絵を描いているのか
        </text>
      </g>
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「絵を、わざと壊す」
// ============================================================
const B1_STEPS = 7;
const b1In = sc([
  [sceneStarts.body1 + 8, 0],
  [sceneStarts.body1 + CROSSFADE + 16, 1],
]);
const b1Noise = sc([
  [sceneStarts.body1, 0],
  [F('b1.sprinkle'), 0],
  [F('b1.sprinkle') + 34, 0.14],
  [F('b1.repeat'), 0.14],
  [F('b1.full'), 1],
  [TOTAL_FRAMES, 1],
]);
const b1Stair = sc([
  [F('b1.sprinkle'), 0],
  [F('b1.sprinkle') + 30, 1 / B1_STEPS],
  [F('b1.repeat'), 1 / B1_STEPS],
  [F('b1.full'), 1],
  [TOTAL_FRAMES, 1],
]);
const b1Small = sc([
  [F('b1.small'), 0],
  [F('b1.small') + 40, 1],
  [F('b1.record'), 1],
  [F('b1.record') + 28, 0],
]);
const b1Record = sc([
  [F('b1.record'), 0],
  [F('b1.record') + 54, 1],
]);
const b1StepX = (i: number): number => -690 + i * 230;
const b1StepY = (i: number): number => 96 + i * 13;

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1In, f);
  const noise = rv(b1Noise, f);
  const stair = rv(b1Stair, f);
  const small = rv(b1Small, f);
  const record = rv(b1Record, f);
  const cx = 0;
  const cy = -198;
  const size = 318;
  const pair = 3;
  return (
    <g opacity={vis}>
      <Canvas cx={cx} cy={cy} size={size} noise={noise} picId="cat" opacity={inA} seed={3} />
      <text
        x={cx}
        y={cy - size / 2 - 40}
        fill={SUB_INK}
        fontSize={FS_LABEL}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        opacity={inA * clamp(stair * 4)}
      >
        ノイズ階段（壊す）
      </text>
      {Array.from({ length: B1_STEPS }).map((_, i) => {
        const rprog = clamp(stair * B1_STEPS - i);
        if (rprog <= 0.01) return null;
        const stepNoise = 0.14 + (i / (B1_STEPS - 1)) * 0.86;
        const hi = small * clamp(2 - Math.abs(i - pair - 0.5) * 1.7);
        const lift = hi * 24;
        return (
          <g key={i}>
            <NoiseChip
              cx={b1StepX(i)}
              cy={b1StepY(i) - 96 - lift}
              size={44}
              seed={40 + i}
              opacity={record * rprog}
              edge={DIM}
            />
            <Canvas
              cx={b1StepX(i)}
              cy={b1StepY(i) - lift}
              size={114 + hi * 16}
              noise={stepNoise}
              picId="cat"
              opacity={rprog * inA}
              seed={3}
            />
            <text
              x={b1StepX(i)}
              y={b1StepY(i) + 82}
              fill={hi > 0.3 ? PROMPT_INK : SUB_INK}
              fontSize={FS_TINY}
              fontFamily={FONT}
              fontWeight={700}
              textAnchor="middle"
              dominantBaseline="central"
              opacity={rprog}
            >
              {i + 1}
            </text>
          </g>
        );
      })}
      {small > 0.02 && (
        <path
          d={
            'M ' + (b1StepX(pair) - 64) + ' ' + (b1StepY(pair) + 100 - 24) +
            ' Q ' + (b1StepX(pair) + 115) + ' ' + (b1StepY(pair) + 150) +
            ' ' + (b1StepX(pair + 1) + 64) + ' ' + (b1StepY(pair + 1) + 100 - 24)
          }
          fill="none"
          stroke={PROMPT}
          strokeWidth={3.5}
          opacity={small}
        />
      )}
      {small > 0.04 && (
        <text
          x={(b1StepX(pair) + b1StepX(pair + 1)) / 2}
          y={b1StepY(pair) + 168}
          fill={PROMPT_INK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={small}
        >
          一段の差は、ごく小さい
        </text>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2「ノイズを、言い当てる練習」
// ============================================================
const B2_STAIR = 6;
const B2_LOOP_PICS = ['cat', 'mountain', 'face', 'house', 'flower'];
const b2In = sc([
  [sceneStarts.body2 + 8, 0],
  [sceneStarts.body2 + CROSSFADE + 16, 1],
]);
const b2Pick = sc([
  [F('b2.pick'), 0],
  [F('b2.pick') + 44, 1],
]);
const b2Guess = sc([
  [F('b2.guess'), 0],
  [F('b2.guess') + 44, 1],
]);
const b2Check = sc([
  [F('b2.check'), 0],
  [F('b2.check') + 44, 1],
]);
const b2Fix = sc([
  [F('b2.fix'), 0],
  [F('b2.fix') + 40, 1],
]);
const b2Loop = sc([
  [F('b2.loop'), 0],
  [F('b2.skill'), 1],
]);
const b2Skill = sc([
  [F('b2.skill'), 0],
  [F('b2.skill') + 54, 1],
]);
const b2Err = sc([
  [F('b2.check'), 0],
  [F('b2.check') + 36, 0.74],
  [F('b2.fix'), 0.74],
  [F('b2.fix') + 34, 0.58],
  [F('b2.loop'), 0.58],
  [F('b2.skill'), 0.07],
  [TOTAL_FRAMES, 0.07],
]);
const b2Tune = sc([
  [sceneStarts.body2, 0.1],
  [F('b2.fix'), 0.1],
  [F('b2.fix') + 34, 0.32],
  [F('b2.loop'), 0.32],
  [F('b2.skill'), 1],
  [TOTAL_FRAMES, 1],
]);
const b2StairX = (i: number): number => -560 + i * 224;

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2In, f);
  const pick = rv(b2Pick, f);
  const guess = rv(b2Guess, f);
  const check = rv(b2Check, f);
  const fix = rv(b2Fix, f);
  const loop = rv(b2Loop, f);
  const skill = rv(b2Skill, f);
  const err = rv(b2Err, f);
  const tune = rv(b2Tune, f);

  const pickIdx = 3;
  const qx = lerp(b2StairX(pickIdx), -384, pick);
  const qy = lerp(-388, -44, pick);
  const qsize = lerp(92, 264, pick);

  const cyc = loop * 5;
  const ci = Math.floor(cyc);
  const cfrac = cyc - ci;
  const loopPic = loop > 0.001 ? B2_LOOP_PICS[ci % B2_LOOP_PICS.length] : 'cat';
  const qPic = loop > 0.02 ? loopPic : 'cat';
  const qSeed = loop > 0.02 ? 50 + (ci % 9) : 3;
  const loopBlink = loop > 0.001 ? 0.4 + 0.6 * smooth(cfrac * 5) : 1;
  const machineActive = Math.max(guess * (1 - check), loop);
  const counter = Math.floor(Math.pow(clamp(loop), 1.7) * 3960000);

  return (
    <g opacity={vis}>
      {/* 出題のもとのノイズ階段 */}
      <text
        x={-602}
        y={-456}
        fill={SUB_INK}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="start"
        dominantBaseline="central"
        opacity={inA * (1 - pick * 0.6)}
      >
        ノイズ階段
      </text>
      {Array.from({ length: B2_STAIR }).map((_, i) => {
        const dimd = pick * (i === pickIdx ? 0.2 : 0.55);
        return (
          <Canvas
            key={i}
            cx={b2StairX(i)}
            cy={-388}
            size={92}
            noise={0.12 + (i / (B2_STAIR - 1)) * 0.84}
            picId="cat"
            opacity={inA * (1 - dimd)}
            seed={3}
          />
        );
      })}

      {/* 反復カウンタ */}
      {loop > 0.01 && (
        <g opacity={clamp(loop * 3)}>
          <text
            x={qx}
            y={qy - qsize / 2 - 116}
            fill={PROMPT_INK}
            fontSize={50}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {counter.toLocaleString('en-US')}
          </text>
          <text
            x={qx}
            y={qy - qsize / 2 - 74}
            fill={SUB_INK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
          >
            回 出題・答え合わせ
          </text>
        </g>
      )}

      {/* 出題キャンバス */}
      <Canvas cx={qx} cy={qy} size={qsize} noise={0.5} picId={qPic} opacity={inA * pick * loopBlink} seed={qSeed} />
      <text
        x={qx}
        y={qy + qsize / 2 + 38}
        fill={SUB_INK}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        opacity={pick * (1 - loop)}
      >
        出題：乗っているノイズは？
      </text>

      {/* ノイズ予測器 */}
      <Predictor cx={86} cy={-58} scale={0.9} opacity={inA} tune={tune} active={machineActive} />

      {/* 予測器 → 予測ノイズ片の出力線 */}
      {guess > 0.02 && (
        <line
          x1={86 + 92}
          y1={-58}
          x2={322}
          y2={-150}
          stroke={MACHINE}
          strokeWidth={3}
          strokeDasharray="6 6"
          opacity={guess * (1 - check * 0.35)}
        />
      )}

      {/* 予測ノイズ片（機械の答え）と記録ノイズ片（正解）*/}
      <NoiseChip cx={372} cy={-150} size={92} seed={61 + (loop > 0.02 ? ci : 0)} opacity={inA * guess} edge={MACHINE} label="機械の答え" />
      <NoiseChip cx={372} cy={44} size={92} seed={61 + (loop > 0.02 ? ci : 0)} opacity={inA * check} edge={PROMPT} label="記録された正解" />

      {/* ずれメーター */}
      <ErrorMeter cx={362} cy={188} w={326} err={err} opacity={inA * check} />

      {/* 修正の表示 */}
      {fix > 0.02 && fix < 0.999 && (
        <text
          x={86}
          y={86}
          fill={MACHINE_DARK}
          fontSize={FS_LABEL}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(2 - fix * 2)}
        >
          ↻ すこし修正
        </text>
      )}

      {/* 技が定着 */}
      {skill > 0.02 && (
        <g opacity={skill}>
          <rect x={86 - 168} y={142} width={336} height={56} rx={28} fill={MACHINE_SOFT} stroke={MACHINE} strokeWidth={3} />
          <text
            x={86}
            y={171}
            fill={MACHINE_DARK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ✓ ノイズ予測の技
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3「壊れ方を、逆からたどる」
// ============================================================
const B3_STEPS = 7;
const B3_VARIETY: { seed: number; pic: string }[] = [
  { seed: 71, pic: 'cat' },
  { seed: 84, pic: 'flower' },
  { seed: 92, pic: 'house' },
];
const b3In = sc([
  [sceneStarts.body3 + 8, 0],
  [sceneStarts.body3 + CROSSFADE + 16, 1],
]);
const b3Noise = sc([
  [sceneStarts.body3, 1],
  [F('b3.subtract'), 1],
  [F('b3.subtract') + 52, 0.82],
  [F('b3.climb'), 0.82],
  [F('b3.top'), 0.05],
  [F('b3.fresh'), 0.05],
  [F('b3.fresh') + 26, 1],
  [F('b3.emerge'), 1],
  [F('b3.emerge') + 150, 0.05],
  [F('b3.learned'), 0.05],
  [TOTAL_FRAMES, 0.05],
]);
const b3Climb = sc([
  [F('b3.subtract'), 0],
  [F('b3.subtract') + 52, 1 / B3_STEPS],
  [F('b3.climb'), 1 / B3_STEPS],
  [F('b3.top'), 1],
  [F('b3.fresh'), 1],
  [F('b3.fresh') + 26, 0],
  [F('b3.emerge'), 0],
  [F('b3.emerge') + 150, 1],
  [TOTAL_FRAMES, 1],
]);
const b3Subtract = sc([
  [F('b3.subtract'), 0],
  [F('b3.subtract') + 44, 1],
  [F('b3.climb'), 1],
  [F('b3.climb') + 30, 0],
]);
const b3Learned = sc([
  [F('b3.learned'), 0],
  [F('b3.learned') + 56, 1],
  [F('b3.variety'), 1],
  [F('b3.variety') + 44, 0],
]);
const b3Variety = sc([
  [F('b3.variety'), 0],
  [F('b3.variety') + 64, 1],
]);
const b3StepX = (i: number): number => -560 + i * 186;

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3In, f);
  const noise = rv(b3Noise, f);
  const climb = rv(b3Climb, f);
  const subtract = rv(b3Subtract, f);
  const learned = rv(b3Learned, f);
  const variety = rv(b3Variety, f);

  const cx = -244;
  const cy = -134;
  const size = 312;
  const fresh = f >= F('b3.fresh') + 13;
  const mainPic = fresh ? 'flower' : 'cat';
  const mainSeed = fresh ? 84 : 3;
  const mainOp = inA * (1 - variety);
  const predActive = Math.max(subtract, climb < 1 ? climb * 0.4 : 0);

  return (
    <g opacity={vis}>
      {/* 学習で見た写真の淡い記憶 */}
      {learned > 0.01 &&
        [0, 1, 2, 3, 4].map((i) => {
          const ang = i * 1.7 + 0.6;
          return (
            <Canvas
              key={'mem' + i}
              cx={cx + Math.cos(ang) * 250 + (i - 2) * 26}
              cy={cy + Math.sin(ang) * 168}
              size={86}
              noise={0.04}
              picId={['mountain', 'face', 'house', 'flower', 'cat'][i]}
              opacity={learned * 0.28}
              seed={10 + i}
            />
          );
        })}

      {/* 主役のキャンバス */}
      <Canvas cx={cx} cy={cy} size={size} noise={noise} picId={mainPic} opacity={mainOp} seed={mainSeed} />

      {/* ノイズ予測器（前画面の技を持ち越し・小型）*/}
      <Predictor cx={cx + 372} cy={cy - 6} scale={0.62} opacity={mainOp} tune={1} active={predActive} />

      {/* 予測ノイズ片＋引き算記号 */}
      {subtract > 0.02 && (
        <g opacity={subtract * mainOp}>
          <NoiseChip cx={cx + 372} cy={cy + 142} size={70} seed={61} opacity={1} edge={MACHINE} />
          <MinusSign cx={cx + 182} cy={cy + 142} opacity={1} />
          <text
            x={cx}
            y={cy + 144}
            fill={MACHINE_DARK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            一段きれいに
          </text>
        </g>
      )}

      {/* のぼり階段 */}
      {climb > 0.005 && (
        <text
          x={-606}
          y={120}
          fill={SUB_INK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="start"
          dominantBaseline="central"
          opacity={mainOp}
        >
          のぼり階段（砂あらし → 絵）
        </text>
      )}
      {climb > 0.005 &&
        Array.from({ length: B3_STEPS }).map((_, i) => {
          const rprog = clamp(climb * B3_STEPS - i);
          if (rprog <= 0.01) return null;
          const stepNoise = 1 - (i / (B3_STEPS - 1)) * 0.95;
          return (
            <Canvas
              key={i}
              cx={b3StepX(i)}
              cy={196}
              size={100}
              noise={stepNoise}
              picId={mainPic}
              opacity={rprog * mainOp}
              seed={mainSeed}
            />
          );
        })}

      {/* 出発の砂あらしを変えた数組 */}
      {variety > 0.02 &&
        B3_VARIETY.map((vrt, i) => {
          const vx = -540 + i * 540;
          const ap = clamp(variety * 3.4 - i);
          if (ap <= 0.01) return null;
          return (
            <g key={'v' + i} opacity={ap}>
              <Canvas cx={vx} cy={-156} size={188} noise={1} picId={vrt.pic} opacity={1} seed={vrt.seed} />
              <text x={vx} y={6} fill={SUB_INK} fontSize={44} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                ↓
              </text>
              <Canvas cx={vx} cy={166} size={188} noise={0.04} picId={vrt.pic} opacity={1} seed={vrt.seed} />
            </g>
          );
        })}
    </g>
  );
};

// ============================================================
// 画面5 — ボディ4「言葉で、行き先を決める」
// ============================================================
const B4_STEPS = 7;
const b4In = sc([
  [sceneStarts.body4 + 8, 0],
  [sceneStarts.body4 + CROSSFADE + 16, 1],
]);
const b4Noise = sc([
  [sceneStarts.body4, 1],
  [F('b4.steer'), 1],
  [F('b4.steer') + 60, 0.74],
  [F('b4.dial'), 0.74],
  [F('b4.result'), 0.05],
  [TOTAL_FRAMES, 0.05],
]);
const b4Climb = sc([
  [F('b4.steer'), 0],
  [F('b4.steer') + 60, 1 / B4_STEPS],
  [F('b4.dial'), 1 / B4_STEPS],
  [F('b4.result'), 1],
  [TOTAL_FRAMES, 1],
]);
const b4Random = sc([
  [F('b4.random'), 0],
  [F('b4.random') + 46, 1],
  [F('b4.steer'), 1],
  [F('b4.steer') + 44, 0],
]);
const b4Prompt = sc([
  [F('b4.prompt'), 0],
  [F('b4.prompt') + 40, 1],
  [F('b4.compass'), 1],
  [F('b4.compass') + 28, 0],
]);
const b4Compass = sc([
  [F('b4.compass'), 0],
  [F('b4.compass') + 42, 1],
]);
const b4Steer = sc([
  [F('b4.steer'), 0],
  [F('b4.steer') + 52, 1],
]);
const b4Dial = sc([
  [F('b4.dial'), 0],
  [F('b4.dial') + 40, 1],
]);
const b4DialPos = sc([
  [F('b4.dial') + 40, 0.5],
  [F('b4.dial') + 96, 0.1],
  [F('b4.dial') + 162, 0.92],
  [F('b4.dial') + 226, 0.58],
  [TOTAL_FRAMES, 0.58],
]);
const b4Result = sc([
  [F('b4.result'), 0],
  [F('b4.result') + 52, 1],
]);
const b4StepX = (i: number): number => -560 + i * 186;

const SceneBody4: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b4In, f);
  const noise = rv(b4Noise, f);
  const climb = rv(b4Climb, f);
  const random = rv(b4Random, f);
  const prompt = rv(b4Prompt, f);
  const compass = rv(b4Compass, f);
  const steer = rv(b4Steer, f);
  const dial = rv(b4Dial, f);
  const dialPos = rv(b4DialPos, f);
  const result = rv(b4Result, f);

  const cx = -286;
  const cy = -116;
  const size = 298;
  const lock = dial > 0.02 ? dialPos : 0.5;
  const forks = [
    { pic: 'mountain', dy: -132, seed: 21 },
    { pic: 'catSpace', dy: 0, seed: 5 },
    { pic: 'flower', dy: 132, seed: 23 },
  ];

  return (
    <g opacity={vis}>
      {/* 主役のキャンバス */}
      <Canvas cx={cx} cy={cy} size={size} noise={noise} picId="catSpace" opacity={inA} seed={5} />

      {/* 分かれ道（誘導が無いと到達先が定まらない）*/}
      {random > 0.02 &&
        forks.map((fk, i) => {
          const tx = cx + 452;
          const ty = cy + fk.dy;
          const bundle = steer;
          const fy = lerp(ty, cy, i === 1 ? 0 : bundle);
          const fade = i === 1 ? 1 : 1 - bundle * 0.92;
          return (
            <g key={'fk' + i} opacity={random * fade}>
              <path
                d={
                  'M ' + (cx + size / 2) + ' ' + cy +
                  ' Q ' + (cx + 286) + ' ' + (cy + fk.dy * 0.5) +
                  ' ' + (tx - 96) + ' ' + fy
                }
                fill="none"
                stroke={i === 1 ? PROMPT : SUB_INK}
                strokeWidth={i === 1 ? 4.5 : 2.5}
                strokeDasharray={i === 1 ? 'none' : '7 7'}
                opacity={i === 1 ? 0.35 + 0.65 * bundle : 0.7}
              />
              <Canvas cx={tx} cy={fy} size={92} noise={0.06} picId={fk.pic} opacity={1} seed={fk.seed} />
            </g>
          );
        })}

      {/* プロンプト文字列 → 方位磁針 */}
      {prompt > 0.02 && (
        <g opacity={prompt}>
          <rect x={86} y={-374} width={566} height={72} rx={14} fill={PROMPT_SOFT} stroke={PROMPT} strokeWidth={2.5} />
          <text
            x={369}
            y={-338}
            fill={PROMPT_INK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            プロンプト「宇宙服を着たねこ」
          </text>
        </g>
      )}
      {compass > 0.02 && (
        <g>
          <Compass cx={398} cy={-188} r={106} opacity={compass} angle={-33} lock={lock} />
          <text
            x={398}
            y={-58}
            fill={PROMPT_INK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
            opacity={compass}
          >
            方位磁針＝宇宙服のねこの方角
          </text>
        </g>
      )}

      {/* のぼり階段 */}
      {climb > 0.005 &&
        Array.from({ length: B4_STEPS }).map((_, i) => {
          const rprog = clamp(climb * B4_STEPS - i);
          if (rprog <= 0.01) return null;
          const stepNoise = 1 - (i / (B4_STEPS - 1)) * 0.95;
          return (
            <Canvas
              key={i}
              cx={b4StepX(i)}
              cy={206}
              size={100}
              noise={stepNoise}
              picId="catSpace"
              opacity={rprog * inA}
              seed={5}
            />
          );
        })}

      {/* 強度つまみ */}
      {dial > 0.02 && (
        <g opacity={dial}>
          <StrengthDial cx={398} cy={56} w={284} pos={dialPos} opacity={1} />
          <text
            x={398}
            y={106}
            fill={SUB_INK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {dialPos < 0.32 ? '弱：自由だが注文から外れ気味' : dialPos > 0.74 ? '強：注文どおりだが硬い' : 'ほどよく'}
          </text>
        </g>
      )}

      {/* 完成 */}
      {result > 0.02 && (
        <text
          x={cx}
          y={cy + size / 2 + 46}
          fill={PROMPT_INK}
          fontSize={FS_LABEL}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={result}
        >
          注文どおりの絵
        </text>
      )}
      {steer > 0.02 && random < 0.05 && climb < 0.99 && (
        <text
          x={cx}
          y={cy - size / 2 - 38}
          fill={PROMPT_INK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={steer * (1 - result)}
        >
          一段ごとに方位磁針で舵を切る
        </text>
      )}
    </g>
  );
};

// ============================================================
// 画面6 — 結論
// ============================================================
const b6In = sc([
  [sceneStarts.outro + 8, 0],
  [sceneStarts.outro + CROSSFADE + 16, 1],
]);
const b6Recap = sc([
  [F('outro.recap'), 0],
  [F('outro.recap') + 360, 1],
]);
const b6Noise = sc([
  [sceneStarts.outro, 0],
  [F('outro.recap'), 0],
  [F('outro.recap') + 96, 1],
  [F('outro.recap') + 210, 1],
  [F('outro.recap') + 330, 0.05],
  [F('outro.loopback'), 0.05],
  [F('outro.loopback') + 52, 1],
  [F('outro.end'), 1],
  [F('outro.end') + 96, 0.05],
  [TOTAL_FRAMES, 0.05],
]);
const b6Loop = sc([
  [F('outro.loopback') + 6, 0],
  [F('outro.loopback') + 46, 1],
  [F('outro.end'), 1],
  [F('outro.end') + 28, 0],
]);
const b6End = sc([
  [F('outro.end'), 0],
  [F('outro.end') + 64, 1],
]);

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b6In, f);
  const recap = rv(b6Recap, f);
  const noise = rv(b6Noise, f);
  const loop = rv(b6Loop, f);
  const end = rv(b6End, f);
  const cx = 0;
  const cy = 44;
  const size = 320;
  const iconX = [-480, -160, 160, 480];
  const recapPic = f < F('outro.recap') + 250 ? 'cat' : 'catSpace';
  return (
    <g opacity={vis}>
      {iconX.map((x, i) => (
        <StageIcon key={i} cx={x} cy={-296} kind={i} opacity={inA * clamp(recap * 5 - i - 0.2)} />
      ))}
      <Canvas cx={cx} cy={cy} size={size} noise={noise} picId={recapPic} opacity={inA} seed={5} />
      <Magnifier cx={cx + 90} cy={cy + 62} opacity={loop} />
      {end > 0.02 && (
        <path
          d={'M ' + (cx - 348) + ' ' + (cy + 244) + ' Q ' + (cx - 116) + ' ' + (cy + 118) + ' ' + cx + ' ' + cy}
          fill="none"
          stroke={PROMPT}
          strokeWidth={6}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - end}
          opacity={0.9}
        />
      )}
      {end > 0.4 && (
        <text
          x={cx}
          y={cy + size / 2 + 60}
          fill={PROMPT_INK}
          fontSize={FS_TITLE - 18}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(end * 1.6 - 0.6)}
        >
          霧から見つけ出す
        </text>
      )}
    </g>
  );
};

// ============================================================
// セクションタイトル（画面跨ぎ・左上）
// ============================================================
const SCENE_TITLES: { start: number; text: string }[] = [
  { start: sceneStarts.intro, text: '序論' },
  { start: sceneStarts.body1, text: '01 絵を、わざと壊す' },
  { start: sceneStarts.body2, text: '02 ノイズを、言い当てる練習' },
  { start: sceneStarts.body3, text: '03 壊れ方を、逆からたどる' },
  { start: sceneStarts.body4, text: '04 言葉で、行き先を決める' },
  { start: sceneStarts.outro, text: '結論' },
];

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-918} y={-504} width={10} height={36} rx={5} fill={PROMPT} />
      <text
        x={-890}
        y={-485}
        fill={SUB_INK}
        fontSize={FS_SCENE}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="start"
        dominantBaseline="central"
      >
        {text}
      </text>
    </g>
  );
};

// ===== 対話字幕（04_remotion.md §7・必須）=====
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

const Subtitle: React.FC<{ frame: number }> = ({ frame }) => {
  let idx = 0;
  for (let i = 0; i < SCRIPT.length; i++) if (frame >= lineStarts[i]) idx = i;
  const line = SCRIPT[idx];
  const op = clamp((frame - lineStarts[idx]) / 8);
  const rows = wrapLine(line.text, 25);
  return (
    <g>
      <rect x={-892} y={326} width={1784} height={280} rx={20} fill={SURFACE} opacity={0.72} />
      <rect x={-892} y={326} width={1784} height={3} fill={EDGE} />
      <g opacity={op}>
        <text
          x={0}
          y={378}
          fill={SPEAKER_COLOR[line.speaker]}
          fontSize={FS_SPEAKER}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {line.speaker}
        </text>
        {rows.map((r, i) => (
          <text
            key={i}
            x={0}
            y={(rows.length === 2 ? 434 : 456) + i * 56}
            fill={INK}
            fontSize={FS_SUB}
            fontFamily={FONT}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {r}
          </text>
        ))}
      </g>
    </g>
  );
};

// ============================================================
// メイン
// ============================================================
export const Diffusion: React.FC = () => {
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
          <radialGradient id="bgglow" cx="50%" cy="36%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#bgglow)" />

        <SceneIntro f={f} vis={rv(introVis, f)} />
        <SceneBody1 f={f} vis={rv(body1Vis, f)} />
        <SceneBody2 f={f} vis={rv(body2Vis, f)} />
        <SceneBody3 f={f} vis={rv(body3Vis, f)} />
        <SceneBody4 f={f} vis={rv(body4Vis, f)} />
        <SceneOutro f={f} vis={rv(outroVis, f)} />

        <SceneTitle text={SCENE_TITLES[titleIdx].text} opacity={titleOpacity} />
        <Subtitle frame={f} />
      </svg>
    </AbsoluteFill>
  );
};
