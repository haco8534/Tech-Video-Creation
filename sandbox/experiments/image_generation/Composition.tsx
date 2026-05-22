// [4] Remotion 実装 — image_generation（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 対話字幕は SCRIPT 全行から自動描画（04_remotion.md §7）。
// 背骨は「一枚のキャンバス」。絵の空間という広いフィールドの中の、極薄の糸へ歩いて当てる。
// 白テーマ・文字サイズは固定ベース。座標・キーフレーム数値はこのファイル内で直書き。

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

// ===== アクセント（画像生成の語彙・5系統）=====
const DIFF = '#2f86c5'; // 拡散モデル（ティール〜青）
const DIFF_DARK = '#235f88';
const DIFF_SOFT = '#e2eef7';
const AUTO = '#e08a1e'; // 自己回帰モデル（アンバー）
const AUTO_DARK = '#a5630f';
const AUTO_SOFT = '#fbeacc';
const MEAN = '#3f9d57'; // 意味のある絵・糸・地形（グリーン）
const MEAN_DARK = '#2c7a40';
const MEAN_SOFT = '#dcefe0';
const CHAOS = '#9aa6b8'; // 砂嵐・無意味（グレー）
const CHAOS_SOFT = '#e7eaf0';
const PROMPT = '#7c5cd0'; // 言葉・プロンプト（バイオレット）
const PROMPT_DARK = '#573aa6';
const PROMPT_SOFT = '#ece6fa';
const DANGER = '#d9543c'; // まちがい
const DANGER_SOFT = '#f7ddd6';

const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
const SPEAKER_COLOR: Record<Speaker, string> = {
  めたん: '#d6336c',
  ずんだもん: '#2f9e44',
};

// ===== 文字サイズ（固定ベース）=====
const FS_TITLE = 84;
const FS_SUB = 52;
const FS_LABEL = 50;
const FS_NOTE = 44;
const FS_SCENE = 42;
const FS_SPEAKER = 40;
const FS_SYMBOL = 30;

// ===== 台本とフレーム =====
const CHAR_FRAMES = 4.3;
const PAUSE_FRAMES = 6;
const MIN_LINE_FRAMES = 46;
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

const resolveScalar = (track: Track<number>, f: number): number => {
  if (track.length === 0) throw new Error('empty track');
  if (f <= track[0].f) return track[0].state;
  for (let i = 0; i < track.length - 1; i++) {
    const a = track[i];
    const b = track[i + 1];
    if (f >= a.f && f <= b.f) {
      const t = ease((f - a.f) / Math.max(1, b.f - a.f));
      return a.state + (b.state - a.state) * t;
    }
  }
  return track[track.length - 1].state;
};

const sc = (pairs: [number, number][]): Track<number> =>
  pairs.map(([f, v]) => ({ f, state: v }));
const rv = (track: Track<number>, f: number): number => resolveScalar(track, f);

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
  const u = clamp(t);
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return '#' + hex2(lerp(pa[0], pb[0], u)) + hex2(lerp(pa[1], pb[1], u)) + hex2(lerp(pa[2], pb[2], u));
};
const rnd = (n: number): number => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const noiseColor = (i: number, seed: number): string => {
  const v = 44 + rnd(i * 1.37 + seed * 91.7) * 190;
  const b = Math.min(255, v + rnd(i * 2.11 + seed * 3.3) * 16);
  return '#' + hex2(v) + hex2(v) + hex2(b);
};
const hslHex = (h: number, s: number, l: number): string => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0, g = 0, b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = l - c / 2;
  return '#' + hex2((r + m) * 255) + hex2((g + m) * 255) + hex2((b + m) * 255);
};
const codebookColor = (i: number): string => hslHex(i * 47 + 18, 0.46, 0.71);

// ===== 意味のある絵の糸（多様体）=====
const TH: { x: number; y: number }[] = [
  { x: -700, y: 64 },
  { x: -244, y: -120 },
  { x: 250, y: 132 },
  { x: 700, y: -54 },
];
const threadPt = (t: number, cx: number, cy: number, s: number): { x: number; y: number } => {
  const u = 1 - t;
  const x =
    u * u * u * TH[0].x + 3 * u * u * t * TH[1].x + 3 * u * t * t * TH[2].x + t * t * t * TH[3].x;
  const y =
    u * u * u * TH[0].y + 3 * u * u * t * TH[1].y + 3 * u * t * t * TH[2].y + t * t * t * TH[3].y;
  return { x: cx + x * s, y: cy + y * s };
};
const threadPath = (cx: number, cy: number, s: number): string =>
  'M ' + (cx + TH[0].x * s) + ' ' + (cy + TH[0].y * s) +
  ' C ' + (cx + TH[1].x * s) + ' ' + (cy + TH[1].y * s) +
  ' ' + (cx + TH[2].x * s) + ' ' + (cy + TH[2].y * s) +
  ' ' + (cx + TH[3].x * s) + ' ' + (cy + TH[3].y * s);

// ============================================================
// 宇宙服を着た猫（図の中の人物っぽい SVG・遊びの担い手）
// mood: -1 困り / 0 きょとん / 1 得意・満足。tone: 0 暖色 / 1 寒色。
// ============================================================
const Cat: React.FC<{
  cx: number;
  cy: number;
  s: number;
  opacity: number;
  mood: number;
  tone: number;
  blur: number;
}> = ({ cx, cy, s, opacity, mood, tone, blur }) => {
  if (opacity <= 0.001) return null;
  const fur = hexLerp('#f0d4a2', '#cfd9e3', clamp(tone));
  const furDark = hexLerp('#d9b178', '#a9b5c5', clamp(tone));
  const m = clamp(mood, -1, 1);
  const hy = cy - 16 * s;
  const eyeY = hy - 2 * s;
  const eyeDx = 17 * s;
  const browY = hy - 19 * s;
  const mthY = hy + 24 * s;
  return (
    <g opacity={opacity} style={blur > 0.01 ? { filter: 'blur(' + blur * 7 + 'px)' } : undefined}>
      {/* ヘルメットのガラス（背面）*/}
      <circle cx={cx} cy={hy} r={62 * s} fill="#eaf3fb" />
      {/* 宇宙服の胴 */}
      <path
        d={
          'M ' + (cx - 44 * s) + ' ' + (cy + 84 * s) +
          ' Q ' + (cx - 50 * s) + ' ' + (cy + 30 * s) + ' ' + (cx - 30 * s) + ' ' + (cy + 24 * s) +
          ' L ' + (cx + 30 * s) + ' ' + (cy + 24 * s) +
          ' Q ' + (cx + 50 * s) + ' ' + (cy + 30 * s) + ' ' + (cx + 44 * s) + ' ' + (cy + 84 * s) +
          ' Z'
        }
        fill={SURFACE}
        stroke={EDGE}
        strokeWidth={3.4 * s}
      />
      <circle cx={cx + 22 * s} cy={cy + 50 * s} r={7 * s} fill={DIFF} opacity={0.85} />
      {/* 耳 */}
      <path
        d={'M ' + (cx - 34 * s) + ' ' + (hy - 28 * s) + ' L ' + (cx - 12 * s) + ' ' + (hy - 44 * s) +
          ' L ' + (cx - 8 * s) + ' ' + (hy - 18 * s) + ' Z'}
        fill={fur}
        stroke={furDark}
        strokeWidth={3 * s}
      />
      <path
        d={'M ' + (cx + 34 * s) + ' ' + (hy - 28 * s) + ' L ' + (cx + 12 * s) + ' ' + (hy - 44 * s) +
          ' L ' + (cx + 8 * s) + ' ' + (hy - 18 * s) + ' Z'}
        fill={fur}
        stroke={furDark}
        strokeWidth={3 * s}
      />
      {/* 頭 */}
      <circle cx={cx} cy={hy} r={42 * s} fill={fur} stroke={furDark} strokeWidth={3.2 * s} />
      {/* 眉（mood で角度）*/}
      <line
        x1={cx - eyeDx - 9 * s}
        y1={browY + m * 5 * s}
        x2={cx - eyeDx + 8 * s}
        y2={browY - m * 4 * s}
        stroke={furDark}
        strokeWidth={3.6 * s}
        strokeLinecap="round"
      />
      <line
        x1={cx + eyeDx + 9 * s}
        y1={browY + m * 5 * s}
        x2={cx + eyeDx - 8 * s}
        y2={browY - m * 4 * s}
        stroke={furDark}
        strokeWidth={3.6 * s}
        strokeLinecap="round"
      />
      {/* 目 */}
      <ellipse cx={cx - eyeDx} cy={eyeY} rx={6.4 * s} ry={7.4 * s} fill={INK} />
      <ellipse cx={cx + eyeDx} cy={eyeY} rx={6.4 * s} ry={7.4 * s} fill={INK} />
      <circle cx={cx - eyeDx - 2 * s} cy={eyeY - 2.6 * s} r={2.2 * s} fill={SURFACE} />
      <circle cx={cx + eyeDx - 2 * s} cy={eyeY - 2.6 * s} r={2.2 * s} fill={SURFACE} />
      {/* 鼻 */}
      <path
        d={'M ' + (cx - 5 * s) + ' ' + (hy + 9 * s) + ' L ' + (cx + 5 * s) + ' ' + (hy + 9 * s) +
          ' L ' + cx + ' ' + (hy + 15 * s) + ' Z'}
        fill={hexLerp('#d98a8a', '#c98f8f', clamp(tone))}
      />
      {/* 口（mood で曲率）*/}
      <path
        d={'M ' + (cx - 14 * s) + ' ' + mthY + ' Q ' + cx + ' ' + (mthY + m * 12 * s) + ' ' +
          (cx + 14 * s) + ' ' + mthY}
        fill="none"
        stroke={INK}
        strokeWidth={3.2 * s}
        strokeLinecap="round"
      />
      {/* ひげ */}
      <line x1={cx - 18 * s} y1={hy + 12 * s} x2={cx - 40 * s} y2={hy + 8 * s} stroke={furDark} strokeWidth={2 * s} strokeLinecap="round" />
      <line x1={cx - 18 * s} y1={hy + 17 * s} x2={cx - 40 * s} y2={hy + 19 * s} stroke={furDark} strokeWidth={2 * s} strokeLinecap="round" />
      <line x1={cx + 18 * s} y1={hy + 12 * s} x2={cx + 40 * s} y2={hy + 8 * s} stroke={furDark} strokeWidth={2 * s} strokeLinecap="round" />
      <line x1={cx + 18 * s} y1={hy + 17 * s} x2={cx + 40 * s} y2={hy + 19 * s} stroke={furDark} strokeWidth={2 * s} strokeLinecap="round" />
      {/* ヘルメットの輪（前面）*/}
      <circle cx={cx} cy={hy} r={62 * s} fill="none" stroke="#9fc4e0" strokeWidth={5 * s} />
      <path
        d={'M ' + (cx - 40 * s) + ' ' + (hy - 40 * s) + ' Q ' + (cx - 52 * s) + ' ' + (hy - 8 * s) +
          ' ' + (cx - 36 * s) + ' ' + (hy + 30 * s)}
        fill="none"
        stroke={SURFACE}
        strokeWidth={6 * s}
        strokeLinecap="round"
        opacity={0.8}
      />
    </g>
  );
};

// ============================================================
// 砂嵐レイヤー（でたらめな数＝乱雑な色セル・静的）
// ============================================================
const NoiseLayer: React.FC<{
  cx: number;
  cy: number;
  size: number;
  n: number;
  seed: number;
  opacity: number;
}> = ({ cx, cy, size, n, seed, opacity }) => {
  if (opacity <= 0.001) return null;
  const cell = size / n;
  const ox = cx - size / 2;
  const oy = cy - size / 2;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const i = r * n + c;
      cells.push(
        <rect
          key={i}
          x={ox + c * cell}
          y={oy + r * cell}
          width={cell + 0.6}
          height={cell + 0.6}
          fill={noiseColor(i, seed)}
        />,
      );
    }
  }
  return <g opacity={opacity}>{cells}</g>;
};

// ============================================================
// 格子線（絵＝マス目に詰まった数）
// ============================================================
const GridLines: React.FC<{
  cx: number;
  cy: number;
  size: number;
  n: number;
  opacity: number;
  color: string;
}> = ({ cx, cy, size, n, opacity, color }) => {
  if (opacity <= 0.001) return null;
  const ox = cx - size / 2;
  const oy = cy - size / 2;
  const lines: React.ReactNode[] = [];
  for (let i = 1; i < n; i++) {
    const p = (i / n) * size;
    lines.push(<line key={'v' + i} x1={ox + p} y1={oy} x2={ox + p} y2={oy + size} stroke={color} strokeWidth={1.4} />);
    lines.push(<line key={'h' + i} x1={ox} y1={oy + p} x2={ox + size} y2={oy + p} stroke={color} strokeWidth={1.4} />);
  }
  return <g opacity={opacity}>{lines}</g>;
};

// ============================================================
// キャンバス（背骨）：枠＋猫＋格子＋砂嵐
// noise 砂嵐の濃さ / grid 格子線 / blur ぼけ / reveal 上からの結像
// ============================================================
const Canvas: React.FC<{
  cx: number;
  cy: number;
  size: number;
  opacity: number;
  noise: number;
  grid: number;
  blur: number;
  reveal: number;
  mood: number;
  tone: number;
  seed: number;
  n: number;
}> = ({ cx, cy, size, opacity, noise, grid, blur, reveal, mood, tone, seed, n }) => {
  if (opacity <= 0.001) return null;
  const half = size / 2;
  const cid = 'cv' + Math.round(cx) + '_' + Math.round(cy);
  const rev = clamp(reveal);
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={cy + half + 16} rx={half * 0.92} ry={14} fill={SHADOW} opacity={0.1} />
      <rect x={cx - half} y={cy - half} width={size} height={size} rx={16} fill={SURFACE} />
      <clipPath id={cid}>
        <rect x={cx - half} y={cy - half} width={size} height={size} rx={16} />
      </clipPath>
      <g clipPath={'url(#' + cid + ')'}>
        <Cat cx={cx} cy={cy} s={size / 250} opacity={1} mood={mood} tone={tone} blur={blur} />
        {rev < 0.999 && (
          <rect
            x={cx - half}
            y={cy - half + rev * size}
            width={size}
            height={size * (1 - rev) + 2}
            fill={SURFACE}
          />
        )}
        <NoiseLayer cx={cx} cy={cy} size={size} n={n} seed={seed} opacity={noise} />
        <GridLines cx={cx} cy={cy} size={size} n={n} opacity={grid} color={hexLerp(EDGE, INK, 0.15)} />
      </g>
      <rect
        x={cx - half}
        y={cy - half}
        width={size}
        height={size}
        rx={16}
        fill="none"
        stroke={hexLerp(EDGE, INK, 0.2)}
        strokeWidth={3}
      />
    </g>
  );
};

// ============================================================
// プロンプトタグ（注文の言葉）
// ============================================================
const PromptTag: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  scale: number;
  text: string;
}> = ({ cx, cy, opacity, scale, text }) => {
  if (opacity <= 0.001) return null;
  const w = 470 * scale;
  const h = 84 * scale;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2} fill={PROMPT_SOFT} stroke={PROMPT} strokeWidth={3} />
      <circle cx={cx - w / 2 + h / 2} cy={cy} r={13 * scale} fill={PROMPT} />
      <text
        x={cx + 14 * scale}
        y={cy}
        fill={PROMPT_DARK}
        fontSize={FS_NOTE * scale}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {text}
      </text>
    </g>
  );
};

// ============================================================
// 矢印
// ============================================================
const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  opacity: number;
  width: number;
  grow: number;
}> = ({ x1, y1, x2, y2, color, opacity, width, grow }) => {
  if (opacity <= 0.001) return null;
  const g = clamp(grow);
  const ex = lerp(x1, x2, g);
  const ey = lerp(y1, y2, g);
  const ang = Math.atan2(ey - y1, ex - x1);
  const hl = width * 3.4;
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <path
        d={
          'M ' + ex + ' ' + ey +
          ' L ' + (ex - hl * Math.cos(ang - 0.4)) + ' ' + (ey - hl * Math.sin(ang - 0.4)) +
          ' M ' + ex + ' ' + ey +
          ' L ' + (ex - hl * Math.cos(ang + 0.4)) + ' ' + (ey - hl * Math.sin(ang + 0.4))
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
// 処理装置（ノイズを見ぬく装置・次の一語を当てる装置）
// ============================================================
const Device: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  opacity: number;
  color: string;
  soft: string;
  label: string;
}> = ({ cx, cy, w, h, opacity, color, soft, label }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={cy + h / 2 + 14} rx={w * 0.5} ry={12} fill={SHADOW} opacity={0.1} />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={18} fill={soft} stroke={color} strokeWidth={3.4} />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={20} rx={10} fill={color} opacity={0.5} />
      <circle cx={cx} cy={cy - 2} r={h * 0.24} fill="none" stroke={color} strokeWidth={5} />
      <circle cx={cx} cy={cy - 2} r={h * 0.1} fill={color} />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const a = (k / 6) * Math.PI * 2;
        const r1 = h * 0.24;
        const r2 = h * 0.32;
        return (
          <line
            key={k}
            x1={cx + Math.cos(a) * r1}
            y1={cy - 2 + Math.sin(a) * r1}
            x2={cx + Math.cos(a) * r2}
            y2={cy - 2 + Math.sin(a) * r2}
            stroke={color}
            strokeWidth={5}
            strokeLinecap="round"
          />
        );
      })}
      <text
        x={cx}
        y={cy + h / 2 - 22}
        fill={color}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {label}
      </text>
    </g>
  );
};

// ============================================================
// バッジ（注記タグ）
// ============================================================
const Badge: React.FC<{
  cx: number;
  cy: number;
  w: number;
  opacity: number;
  color: string;
  soft: string;
  text: string;
}> = ({ cx, cy, w, opacity, color, soft, text }) => {
  if (opacity <= 0.001) return null;
  const h = 60;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={14} fill={soft} stroke={color} strokeWidth={2.6} />
      <text
        x={cx}
        y={cy}
        fill={color}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {text}
      </text>
    </g>
  );
};

// ============================================================
// 絵の空間（ぜんぶの絵が住む広大な場所）
// ============================================================
const SpaceField: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  opacity: number;
}> = ({ cx, cy, w, h, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={26} fill={CHAOS_SOFT} stroke={EDGE_SOFT} strokeWidth={2.4} />
    </g>
  );
};

// ============================================================
// 画面可視性（04_remotion.md §6）
// ============================================================
const sStart = {
  intro: 0,
  body1: F('scene.body1.in'),
  body2: F('scene.body2.in'),
  body3: F('scene.body3.in'),
  body4: F('scene.body4.in'),
  outro: F('scene.outro.in'),
};

const introVis = sc([
  [0, 1],
  [sStart.body1, 1],
  [sStart.body1 + CROSSFADE, 0],
  [TOTAL_FRAMES, 0],
]);
const midVis = (a: number, b: number): Track<number> =>
  sc([
    [a, 0],
    [a + CROSSFADE, 1],
    [b, 1],
    [b + CROSSFADE, 0],
    [TOTAL_FRAMES, 0],
  ]);
const body1Vis = midVis(sStart.body1, sStart.body2);
const body2Vis = midVis(sStart.body2, sStart.body3);
const body3Vis = midVis(sStart.body3, sStart.body4);
const body4Vis = midVis(sStart.body4, sStart.outro);
const outroVis = sc([
  [sStart.outro, 0],
  [sStart.outro + CROSSFADE, 1],
  [TOTAL_FRAMES, 1],
]);

// ============================================================
// 画面1 — 序論「見たことのない一枚」
// ============================================================
const i_prompt = sc([
  [F('intro.prompt'), 0],
  [F('intro.prompt') + 40, 1],
]);
const i_arrow = sc([
  [F('intro.prompt') + 20, 0],
  [F('intro.prompt') + 56, 1],
]);
const i_canvas = sc([
  [F('intro.prompt') + 34, 0],
  [F('intro.prompt') + 96, 1],
]);
const i_blur = sc([
  [F('intro.prompt') + 34, 1],
  [F('intro.prompt') + 110, 0],
]);
const i_variant = sc([
  [F('intro.variant'), 0],
  [F('intro.variant') + 50, 1],
]);
const i_cutout = sc([
  [F('intro.notcollage'), 0],
  [F('intro.notcollage') + 34, 1],
  [F('intro.notcollage') + 70, 1],
  [F('intro.notcollage') + 104, 0],
]);
const i_newborn = sc([
  [F('intro.newborn'), 0],
  [F('intro.newborn') + 44, 1],
]);
const i_mood = sc([
  [F('intro.prompt') + 96, 0.1],
  [F('intro.newborn'), 0.1],
  [F('intro.newborn') + 40, 0.05],
  [TOTAL_FRAMES, 0.05],
]);
const i_title = sc([
  [F('intro.title'), 0],
  [F('intro.title') + 52, 1],
]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const prompt = rv(i_prompt, f);
  const arrow = rv(i_arrow, f);
  const canvas = rv(i_canvas, f);
  const blur = rv(i_blur, f);
  const variant = rv(i_variant, f);
  const cutout = rv(i_cutout, f);
  const newborn = rv(i_newborn, f);
  const mood = rv(i_mood, f);
  const title = rv(i_title, f);
  const cvY = -36;

  return (
    <g opacity={vis}>
      <PromptTag cx={0} cy={-392} opacity={prompt} scale={1} text="宇宙服を着た猫" />
      <Arrow x1={0} y1={-344} x2={0} y2={-238} color={PROMPT} opacity={arrow} width={6} grow={arrow} />

      {/* 生成画（バージョン1）*/}
      <Canvas
        cx={0}
        cy={cvY}
        size={312}
        opacity={canvas * (1 - variant)}
        noise={0}
        grid={0}
        blur={blur}
        reveal={1}
        mood={mood}
        tone={0}
        seed={1}
        n={12}
      />
      {/* 生成画（バージョン2・毎回ちがう一枚）*/}
      <Canvas
        cx={0}
        cy={cvY}
        size={312}
        opacity={canvas * variant}
        noise={0}
        grid={0}
        blur={0}
        reveal={1}
        mood={0.35}
        tone={0.8}
        seed={5}
        n={12}
      />

      {/* 切り貼り却下 */}
      {cutout > 0.02 && (
        <g opacity={cutout}>
          {[-1, 1].map((d) => (
            <g key={d}>
              <rect
                x={d * 252 - 56}
                y={cvY - 50}
                width={112}
                height={100}
                rx={8}
                fill={SURFACE}
                stroke={EDGE}
                strokeWidth={3}
              />
              <line x1={d * 252 - 40} y1={cvY - 30} x2={d * 252 + 40} y2={cvY + 36} stroke={DANGER} strokeWidth={6} strokeLinecap="round" />
              <line x1={d * 252 + 40} y1={cvY - 30} x2={d * 252 - 40} y2={cvY + 36} stroke={DANGER} strokeWidth={6} strokeLinecap="round" />
            </g>
          ))}
          <text x={0} y={cvY + 232} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            切り貼りでも、検索でもない
          </text>
        </g>
      )}

      {/* 新しく生まれた印 */}
      {newborn > 0.04 && (
        <g opacity={newborn}>
          <text x={0} y={cvY - 210} fill={MEAN_DARK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            世界のどこにも無かった一枚
          </text>
        </g>
      )}

      {/* タイトル */}
      <g opacity={title}>
        <text x={0} y={196} fill={INK} fontSize={FS_TITLE} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">
          画像生成AI
        </text>
        <text x={0} y={262} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
          ── 見たことのない絵は、どこから来るのか
        </text>
      </g>
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「絵は数の格子」
// ============================================================
const FIELD1_CY = 132;
const b1_canvasIn = sc([
  [sStart.body1 + 8, 0],
  [sStart.body1 + CROSSFADE + 16, 1],
]);
const b1_grid = sc([
  [F('b1.pixels'), 0],
  [F('b1.pixels') + 46, 1],
  [F('b1.space'), 1],
  [F('b1.space') + 30, 0],
]);
const b1_noise = sc([
  [F('b1.random'), 0],
  [F('b1.random') + 52, 1],
  [F('b1.space'), 1],
  [F('b1.space') + 30, 1],
]);
const b1_shrink = sc([
  [F('b1.space'), 0],
  [F('b1.space') + 60, 1],
]);
const b1_field = sc([
  [F('b1.space'), 0],
  [F('b1.space') + 50, 1],
]);
const b1_thread = sc([
  [F('b1.thread'), 0],
  [F('b1.thread') + 70, 1],
]);
const b1_samples = sc([
  [F('b1.thread') + 40, 0],
  [F('b1.thread') + 96, 1],
]);
const b1_walk = sc([
  [F('b1.walk'), 0.12],
  [F('b1.walk') + 70, 0.46],
  [F('b1.walkoff'), 0.46],
  [F('b1.walkoff') + 64, 0.46],
]);
const b1_walkoff = sc([
  [F('b1.walkoff'), 0],
  [F('b1.walkoff') + 64, 1],
]);
const b1_oneshot = sc([
  [F('b1.oneshot'), 0],
  [F('b1.oneshot') + 44, 1],
]);
const b1_blur = sc([
  [F('b1.oneshot') + 30, 1],
  [F('b1.chain') + 30, 1],
  [F('b1.chain') + 150, 0.06],
]);
const b1_chain = sc([
  [F('b1.chain'), 0],
  [F('b1.chain') + 150, 1],
]);
const b1_oneshotMood = sc([
  [F('b1.oneshot') + 30, -0.75],
  [F('b1.chain') + 60, -0.75],
  [F('b1.chain') + 150, 0.85],
]);

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const cIn = rv(b1_canvasIn, f);
  const grid = rv(b1_grid, f);
  const noise = rv(b1_noise, f);
  const shrink = rv(b1_shrink, f);
  const field = rv(b1_field, f);
  const thread = rv(b1_thread, f);
  const samples = rv(b1_samples, f);
  const walkT = rv(b1_walk, f);
  const walkoff = rv(b1_walkoff, f);
  const oneshot = rv(b1_oneshot, f);
  const blur = rv(b1_blur, f);
  const chain = rv(b1_chain, f);
  const osMood = rv(b1_oneshotMood, f);

  // 背骨キャンバス：上の実演 → 縮小して空間の一点へ
  const demoSize = lerp(300, 70, shrink);
  const demoX = lerp(0, threadPt(0.5, 0, FIELD1_CY, 1).x, shrink);
  const demoY = lerp(-280, threadPt(0.5, 0, FIELD1_CY, 1).y, shrink);

  // 糸を歩く点
  const wt = walkT;
  const onThread = threadPt(wt, 0, FIELD1_CY, 1);
  const offY = onThread.y - walkoff * 150;
  const walkerX = onThread.x + walkoff * 90;
  const walkerY = offY;

  // 一手の鎖
  const chainN = 7;
  const chainStart = { x: -470, y: -130 };
  const chainEnd = threadPt(0.66, 0, FIELD1_CY, 1);

  return (
    <g opacity={vis}>
      {/* 上の実演：背骨キャンバス */}
      <Canvas
        cx={demoX}
        cy={demoY}
        size={demoSize}
        opacity={cIn}
        noise={noise}
        grid={grid}
        blur={0}
        reveal={1}
        mood={0.1}
        tone={0}
        seed={2}
        n={12}
      />
      {grid > 0.3 && shrink < 0.2 && (
        <text x={0} y={-280 + 200} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={grid * (1 - shrink)}>
          マスひとつに、色の数がひとつ
        </text>
      )}

      {/* 絵の空間 */}
      <SpaceField cx={0} cy={FIELD1_CY} w={1660} h={388} opacity={field} />
      {field > 0.4 && (
        <text x={-760} y={FIELD1_CY - 232} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="start" dominantBaseline="central" opacity={field}>
          ぜんぶの絵が住む、広大な空間
        </text>
      )}

      {/* 意味のある絵の糸 */}
      {thread > 0.01 && (
        <g opacity={thread}>
          <path d={threadPath(0, FIELD1_CY, 1)} fill="none" stroke={MEAN_SOFT} strokeWidth={34} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - thread} />
          <path d={threadPath(0, FIELD1_CY, 1)} fill="none" stroke={MEAN} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - thread} />
          {thread > 0.7 && (
            <text x={threadPt(0.5, 0, FIELD1_CY, 1).x} y={FIELD1_CY + 158} fill={MEAN_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central" opacity={clamp(thread * 3 - 2)}>
              意味のある絵だけが通る、細い糸
            </text>
          )}
        </g>
      )}

      {/* 糸の上のサンプル絵 */}
      {samples > 0.02 &&
        [0.14, 0.32, 0.82].map((t, k) => {
          const p = threadPt(t, 0, FIELD1_CY, 1);
          const ap = clamp(samples * 3 - k * 0.5);
          if (ap <= 0.02) return null;
          return (
            <Canvas
              key={k}
              cx={p.x}
              cy={p.y}
              size={66}
              opacity={ap}
              noise={0}
              grid={0}
              blur={0}
              reveal={1}
              mood={0.2}
              tone={k * 0.4}
              seed={10 + k}
              n={6}
            />
          );
        })}

      {/* 糸を歩く点 */}
      {(walkT > 0.13 || walkoff > 0.01) && f < F('b1.oneshot') && (
        <g>
          <circle cx={walkerX} cy={walkerY} r={20} fill="none" stroke={walkoff > 0.4 ? CHAOS : MEAN} strokeWidth={5} />
          <circle cx={walkerX} cy={walkerY} r={7} fill={walkoff > 0.4 ? CHAOS : MEAN} />
          {walkoff > 0.5 && (
            <Canvas cx={walkerX} cy={walkerY - 96} size={64} opacity={clamp(walkoff * 2 - 1)} noise={1} grid={0} blur={0} reveal={1} mood={0} tone={0} seed={33} n={6} />
          )}
        </g>
      )}

      {/* 一発出力：もやもや猫 */}
      {oneshot > 0.02 && (
        <g opacity={oneshot}>
          <Canvas
            cx={chainStart.x}
            cy={chainStart.y}
            size={250}
            opacity={1}
            noise={0}
            grid={0}
            blur={blur * 0.9}
            reveal={1}
            mood={osMood}
            tone={0}
            seed={4}
            n={12}
          />
          <text x={chainStart.x} y={chainStart.y - 156} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            一発で全部 → ぼやける
          </text>
        </g>
      )}

      {/* やさしい一手の鎖 */}
      {chain > 0.01 &&
        Array.from({ length: chainN }).map((_, k) => {
          const t = (k + 1) / chainN;
          const ap = clamp(chain * (chainN + 1) - k);
          if (ap <= 0.02) return null;
          const px = lerp(chainStart.x + 130, chainEnd.x, t);
          const py = lerp(chainStart.y + 40, chainEnd.y, t);
          return (
            <g key={k} opacity={ap}>
              <circle cx={px} cy={py} r={15} fill={SURFACE} stroke={DIFF} strokeWidth={4} />
              <circle cx={px} cy={py} r={5} fill={DIFF} />
            </g>
          );
        })}
      {chain > 0.85 && (
        <text x={chainEnd.x + 30} y={chainEnd.y - 76} fill={INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central" opacity={clamp(chain * 6 - 5)}>
          やさしい一手の鎖で、糸へ歩く
        </text>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2「拡散モデル」
// ============================================================
const AXIS_Y = -366;
const AXIS_X0 = -742;
const AXIS_X1 = 742;
const b2_axis = sc([
  [F('b2.axis'), 0],
  [F('b2.axis') + 60, 1],
]);
const b2_train = sc([
  [F('b2.train'), 0],
  [F('b2.train') + 110, 1],
  [F('b2.generate'), 1],
  [F('b2.generate') + 36, 0],
]);
const b2_device = sc([
  [F('b2.predict'), 0],
  [F('b2.predict') + 44, 1],
]);
const b2_predict = sc([
  [F('b2.predict') + 20, 0],
  [F('b2.predict') + 90, 1],
  [F('b2.generate'), 1],
  [F('b2.generate') + 30, 0],
]);
const b2_gen = sc([
  [F('b2.generate'), 0],
  [F('b2.emerge') + 60, 1],
]);
const b2_genIn = sc([
  [F('b2.generate'), 0],
  [F('b2.generate') + 34, 1],
]);
const b2_emergeMood = sc([
  [F('b2.generate'), 0],
  [F('b2.emerge'), 0],
  [F('b2.emerge') + 70, 0.7],
  [TOTAL_FRAMES, 0.7],
]);
const b2_prompt = sc([
  [F('b2.prompt'), 0],
  [F('b2.prompt') + 46, 1],
]);
const b2_vary = sc([
  [F('b2.vary'), 0],
  [F('b2.vary') + 60, 1],
]);

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const axis = rv(b2_axis, f);
  const train = rv(b2_train, f);
  const device = rv(b2_device, f);
  const predict = rv(b2_predict, f);
  const gen = rv(b2_gen, f);
  const genIn = rv(b2_genIn, f);
  const mood = rv(b2_emergeMood, f);
  const prompt = rv(b2_prompt, f);
  const vary = rv(b2_vary, f);

  const trainCY = -206;
  const genCY = -150;
  const genX = lerp(AXIS_X0 + 70, AXIS_X1 - 70, gen);
  const genNoise = clamp(1 - gen * 1.08);

  return (
    <g opacity={vis}>
      {/* ノイズの濃さの軸 */}
      {axis > 0.01 && (
        <g opacity={axis}>
          <line x1={AXIS_X0} y1={AXIS_Y} x2={AXIS_X1} y2={AXIS_Y} stroke={DIM} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - axis} />
          <text x={AXIS_X0 + 8} y={AXIS_Y - 36} fill={CHAOS} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="start" dominantBaseline="central">
            濃い砂嵐
          </text>
          <text x={AXIS_X1 - 8} y={AXIS_Y - 36} fill={MEAN_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="end" dominantBaseline="central">
            くっきりした絵
          </text>
        </g>
      )}

      {/* 訓練の列（forward：写真が砂嵐へ）*/}
      {train > 0.02 &&
        Array.from({ length: 6 }).map((_, k) => {
          const ap = clamp(train * 7 - k);
          if (ap <= 0.02) return null;
          const x = 560 - k * 224;
          const nz = k / 5;
          return (
            <g key={k} opacity={ap}>
              <Canvas cx={x} cy={trainCY} size={150} opacity={1} noise={nz} grid={0} blur={nz * 0.4} reveal={1} mood={0.15} tone={0} seed={20} n={8} />
              {k < 5 && <Arrow x1={x - 78} y1={trainCY} x2={x - 146} y2={trainCY} color={DIM} opacity={1} width={4} grow={1} />}
            </g>
          );
        })}
      {train > 0.5 && (
        <text x={0} y={trainCY + 118} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={clamp(train * 2 - 1)}>
          訓練：写真を一段ずつノイズで壊す
        </text>
      )}

      {/* ノイズを見ぬく装置 */}
      <Device cx={0} cy={150} w={320} h={158} opacity={device} color={DIFF} soft={DIFF_SOFT} label="ノイズを見ぬく" />

      {/* 答え合わせ（足したノイズ＝正解）*/}
      {predict > 0.05 && (
        <g opacity={predict}>
          <Canvas cx={-360} cy={150} size={132} opacity={1} noise={0.8} grid={0} blur={0.3} reveal={1} mood={0.1} tone={0} seed={21} n={8} />
          <Arrow x1={-286} y1={150} x2={-168} y2={150} color={DIFF} opacity={1} width={5} grow={1} />
          <Arrow x1={168} y1={150} x2={286} y2={150} color={DIFF} opacity={1} width={5} grow={1} />
          <NoiseLayer cx={360} cy={150} size={110} n={8} seed={22} opacity={1} />
          <rect x={360 - 55} y={150 - 55} width={110} height={110} rx={10} fill="none" stroke={CHAOS} strokeWidth={3} />
          <Badge cx={360} cy={252} w={300} opacity={clamp(predict * 2 - 1)} color={MEAN_DARK} soft={MEAN_SOFT} text="足したノイズ＝正解" />
        </g>
      )}

      {/* 生成：砂嵐から一手ずつ右へ */}
      {gen > 0.001 && (
        <g opacity={genIn}>
          {/* 軸上の進捗マーク */}
          {Array.from({ length: 9 }).map((_, k) => {
            const t = (k + 0.5) / 9;
            const done = gen > t ? 1 : 0.18;
            return <circle key={k} cx={lerp(AXIS_X0 + 70, AXIS_X1 - 70, t)} cy={AXIS_Y} r={9} fill={DIFF} opacity={done} />;
          })}
          <Canvas
            cx={genX}
            cy={genCY}
            size={184}
            opacity={1}
            noise={genNoise}
            grid={0}
            blur={genNoise * 0.6}
            reveal={1}
            mood={mood}
            tone={0}
            seed={7}
            n={12}
          />
          <Arrow x1={genX} y1={150 - 84} x2={genX} y2={genCY + 100} color={DIFF} opacity={clamp(gen * 6) * (1 - clamp(gen * 4 - 3))} width={5} grow={1} />
          {gen > 0.45 && gen < 0.98 && (
            <text x={genX} y={genCY - 116} fill={DIFF_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={clamp(gen * 4 - 1.8)}>
              一手ごとに、霧が晴れていく
            </text>
          )}
        </g>
      )}

      {/* プロンプトで舵を切る */}
      {prompt > 0.02 && (
        <g opacity={prompt}>
          <PromptTag cx={0} cy={284} opacity={1} scale={0.84} text="宇宙服を着た猫" />
          <Arrow x1={0} y1={284 - 36} x2={0} y2={150 + 84} color={PROMPT} opacity={1} width={5} grow={prompt} />
        </g>
      )}

      {/* 毎回ちがう絵：別の出発砂嵐 → 別の猫 */}
      {vary > 0.04 && (
        <g opacity={vary}>
          {[-1, 1].map((d, k) => (
            <g key={k}>
              <Canvas cx={d * 250} cy={270} size={78} opacity={1} noise={1} grid={0} blur={0} reveal={1} mood={0} tone={0} seed={40 + k} n={7} />
              <Arrow x1={d * 250 + d * 50} y1={270} x2={d * 250 + d * 116} y2={270} color={DIM} opacity={1} width={3.4} grow={1} />
              <Canvas cx={d * 250 + d * 166} cy={270} size={78} opacity={1} noise={0} grid={0} blur={0} reveal={1} mood={0.4} tone={k * 0.8} seed={42 + k} n={7} />
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3「自己回帰モデル」
// ============================================================
const ROW3_Y = 214;
const ROW3_X0 = -806;
const N_IMG_TOK = 22;
const N_PROMPT_TOK = 4;
const CANVAS3_X = -296;
const CANVAS3_Y = -86;
const b3_text = sc([
  [F('b3.text'), 0],
  [F('b3.text') + 120, 1],
]);
const b3_patches = sc([
  [F('b3.patches'), 0],
  [F('b3.patches') + 48, 1],
]);
const b3_codebook = sc([
  [F('b3.codebook'), 0],
  [F('b3.codebook') + 50, 1],
]);
const b3_tokenize = sc([
  [F('b3.tokenize'), 0],
  [F('b3.tokenize') + 80, 1],
]);
const b3_merge = sc([
  [F('b3.merge'), 0],
  [F('b3.merge') + 50, 1],
]);
const b3_write = sc([
  [F('b3.write'), 0],
  [F('b3.write') + 360, 1],
]);
// キャンバスの結像：tokenize まで猫を表示 → merge で消し → write で上から再結像
const b3_canvasReveal = sc([
  [F('b3.tokenize'), 1],
  [F('b3.merge'), 1],
  [F('b3.merge') + 46, 0],
  [F('b3.write'), 0],
  [F('b3.write') + 350, 1],
]);
const b3_canvasMood = sc([
  [F('b3.write') + 160, 0.15],
  [F('b3.write') + 230, -0.5],
  [F('b3.write') + 320, -0.5],
  [F('b3.write') + 372, 0.85],
]);

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const text = rv(b3_text, f);
  const patches = rv(b3_patches, f);
  const codebook = rv(b3_codebook, f);
  const tokenize = rv(b3_tokenize, f);
  const merge = rv(b3_merge, f);
  const write = rv(b3_write, f);
  const cReveal = rv(b3_canvasReveal, f);
  const cMood = rv(b3_canvasMood, f);

  const tile = 56;
  const gap = 6;
  const tokN = Math.floor(text * 7 + 0.001);

  // 書き込みの進捗
  const writtenImg = Math.floor(write * N_IMG_TOK + 0.001);

  return (
    <g opacity={vis}>
      {/* 上段：ChatGPT の文章書き（次の一語）*/}
      <Device cx={-690} cy={-372} w={210} h={108} opacity={text > 0.02 ? 1 : 0} color={AUTO} soft={AUTO_SOFT} label="次の一語" />
      {text > 0.02 &&
        Array.from({ length: 7 }).map((_, k) => {
          if (k >= tokN) return null;
          const ap = clamp(text * 7 - k);
          const x = -520 + k * (tile + gap);
          return (
            <g key={k} opacity={ap}>
              <rect x={x - tile / 2} y={-372 - tile / 2} width={tile} height={tile} rx={8} fill={SURFACE} stroke={AUTO} strokeWidth={2.6} />
              <circle cx={x} cy={-372} r={9} fill={AUTO} />
            </g>
          );
        })}
      {text > 0.5 && (
        <text x={120} y={-300} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={clamp(text * 2 - 1)}>
          文章は、次の一語を当て続けて書く
        </text>
      )}

      {/* 中段：絵キャンバス＋かけら */}
      <Canvas
        cx={CANVAS3_X}
        cy={CANVAS3_Y}
        size={300}
        opacity={1}
        noise={0}
        grid={0}
        blur={0}
        reveal={cReveal}
        mood={cMood}
        tone={0}
        seed={3}
        n={12}
      />
      {/* かけらの格子（5×5）*/}
      <GridLines cx={CANVAS3_X} cy={CANVAS3_Y} size={300} n={5} opacity={patches} color={AUTO_DARK} />
      {patches > 0.4 && f < F('b3.merge') && (
        <text x={CANVAS3_X} y={CANVAS3_Y + 196} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={clamp(patches * 2 - 1)}>
          絵を、かけらに刻む
        </text>
      )}

      {/* 絵の単語帳（コードブック）*/}
      {codebook > 0.02 && (
        <g opacity={codebook}>
          <rect x={420 - 230} y={CANVAS3_Y - 150} width={460} height={300} rx={16} fill={SURFACE} stroke={EDGE} strokeWidth={2.6} />
          <text x={420} y={CANVAS3_Y - 184} fill={AUTO_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            絵の単語帳
          </text>
          {Array.from({ length: 24 }).map((_, k) => {
            const r = Math.floor(k / 6);
            const c = k % 6;
            const ap = clamp(codebook * 26 - k);
            return (
              <rect
                key={k}
                x={420 - 198 + c * 67}
                y={CANVAS3_Y - 116 + r * 67}
                width={56}
                height={56}
                rx={8}
                fill={codebookColor(k)}
                opacity={ap}
              />
            );
          })}
          {/* 置きかえの結び線 */}
          {tokenize > 0.05 &&
            [6, 12, 18].map((k, j) => (
              <line
                key={j}
                x1={CANVAS3_X + 110}
                y1={CANVAS3_Y - 80 + j * 70}
                x2={420 - 198 + (k % 6) * 67 + 28}
                y2={CANVAS3_Y - 116 + Math.floor(k / 6) * 67 + 28}
                stroke={AUTO}
                strokeWidth={3}
                strokeDasharray="6 7"
                opacity={tokenize * 0.7}
              />
            ))}
        </g>
      )}

      {/* 下段：絵のトークン列 */}
      {tokenize > 0.05 && (
        <g>
          {Array.from({ length: N_IMG_TOK }).map((_, k) => {
            const ap = clamp(tokenize * (N_IMG_TOK + 4) - k);
            if (ap <= 0.02) return null;
            const x = ROW3_X0 + (N_PROMPT_TOK + k) * (tile + gap) + tile / 2;
            const written = k < writtenImg;
            return (
              <g key={k} opacity={ap}>
                <rect
                  x={x - tile / 2}
                  y={ROW3_Y - tile / 2}
                  width={tile}
                  height={tile}
                  rx={8}
                  fill={written || f < F('b3.write') ? codebookColor(k * 2 + 3) : SURFACE_SOFT}
                  stroke={written ? AUTO : EDGE}
                  strokeWidth={written ? 3.2 : 2}
                />
              </g>
            );
          })}
          {/* プロンプトのトークン */}
          {merge > 0.04 &&
            Array.from({ length: N_PROMPT_TOK }).map((_, k) => {
              const ap = clamp(merge * (N_PROMPT_TOK + 2) - k);
              const x = ROW3_X0 + k * (tile + gap) + tile / 2;
              return (
                <rect
                  key={'p' + k}
                  x={x - tile / 2}
                  y={ROW3_Y - tile / 2}
                  width={tile}
                  height={tile}
                  rx={8}
                  fill={PROMPT_SOFT}
                  stroke={PROMPT}
                  strokeWidth={3}
                  opacity={ap}
                />
              );
            })}
          {merge > 0.3 && (
            <PromptTag cx={ROW3_X0 + 130} cy={ROW3_Y - 92} opacity={clamp(merge * 2 - 0.6)} scale={0.66} text="宇宙服を着た猫" />
          )}
          {tokenize > 0.6 && f < F('b3.merge') && (
            <text x={0} y={ROW3_Y + 78} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={clamp(tokenize * 3 - 2)}>
              絵が、トークンの列になった
            </text>
          )}
          {/* 書き込みヘッド */}
          {write > 0.001 && write < 0.999 && (
            <g>
              {(() => {
                const hx = ROW3_X0 + (N_PROMPT_TOK + writtenImg) * (tile + gap) + tile / 2;
                return (
                  <>
                    <Arrow x1={hx} y1={ROW3_Y - 76} x2={hx} y2={ROW3_Y - tile / 2 - 6} color={AUTO} opacity={1} width={5} grow={1} />
                    <circle cx={hx} cy={ROW3_Y - 92} r={11} fill={AUTO} />
                  </>
                );
              })()}
            </g>
          )}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — ボディ4「ふたつを並べる」
// ============================================================
const RAIL_Y = -286;
const b4_railIn = sc([
  [sStart.body4 + 8, 0],
  [sStart.body4 + CROSSFADE + 20, 1],
]);
const b4_common = sc([
  [F('b4.common'), 0],
  [F('b4.common') + 56, 1],
]);
const b4_learn = sc([
  [F('b4.learn'), 0],
  [F('b4.learn') + 64, 1],
]);
const b4_diff = sc([
  [F('b4.diff'), 0],
  [F('b4.diff') + 90, 1],
]);
const b4_meritD = sc([
  [F('b4.meritD'), 0],
  [F('b4.meritD') + 50, 1],
]);
const b4_meritA = sc([
  [F('b4.meritA'), 0],
  [F('b4.meritA') + 50, 1],
]);
const b4_weak = sc([
  [F('b4.weak'), 0],
  [F('b4.weak') + 60, 1],
]);
const b4_merge = sc([
  [F('b4.merge'), 0],
  [F('b4.merge') + 60, 1],
]);

const SceneBody4: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const railIn = rv(b4_railIn, f);
  const common = rv(b4_common, f);
  const learn = rv(b4_learn, f);
  const diff = rv(b4_diff, f);
  const meritD = rv(b4_meritD, f);
  const meritA = rv(b4_meritA, f);
  const weak = rv(b4_weak, f);
  const merge = rv(b4_merge, f);

  const railN = 5;
  const comSize = 116;

  return (
    <g opacity={vis}>
      {/* モデル名 */}
      <g opacity={railIn}>
        <text x={-466} y={-430} fill={DIFF_DARK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">
          拡散モデル
        </text>
        <text x={466} y={-430} fill={AUTO_DARK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">
          自己回帰モデル
        </text>
      </g>

      {/* 左：拡散の鎖（全体が一度に砂嵐→絵）*/}
      {Array.from({ length: railN }).map((_, k) => {
        const x = -832 + k * 174;
        const t = k / (railN - 1);
        const nz = lerp(1 - t * 0.12, clamp(1 - t * 1.05), smooth(diff));
        const isErr = weak > 0.4 && k >= 1;
        return (
          <g key={'d' + k} opacity={railIn}>
            <Canvas
              cx={x}
              cy={RAIL_Y}
              size={comSize}
              opacity={1}
              noise={nz}
              grid={0}
              blur={nz * 0.4}
              reveal={1}
              mood={0.2}
              tone={0}
              seed={50 + k}
              n={7}
            />
            {k < railN - 1 && <Arrow x1={x + 62} y1={RAIL_Y} x2={x + 112} y2={RAIL_Y} color={DIFF} opacity={railIn} width={3.6} grow={1} />}
            {isErr && k === 2 && (
              <rect x={x - comSize / 2} y={RAIL_Y - comSize / 2} width={comSize} height={comSize} rx={10} fill="none" stroke={DANGER} strokeWidth={4} opacity={clamp(weak * 2 - 0.8) * (1 - clamp(weak * 2 - 1.4))} />
            )}
          </g>
        );
      })}

      {/* 右：自己回帰の鎖（一部分ずつ確定）*/}
      {Array.from({ length: railN }).map((_, k) => {
        const x = 168 + k * 174;
        const t = k / (railN - 1);
        const fill = lerp(0.12 + t * 0.06, clamp(t * 1.05), smooth(diff));
        const isErr = weak > 0.4 && k >= 2;
        return (
          <g key={'a' + k} opacity={railIn}>
            <Canvas
              cx={x}
              cy={RAIL_Y}
              size={comSize}
              opacity={1}
              noise={0}
              grid={0}
              blur={0}
              reveal={fill}
              mood={0.2}
              tone={0.55}
              seed={60 + k}
              n={7}
            />
            {k < railN - 1 && <Arrow x1={x + 62} y1={RAIL_Y} x2={x + 112} y2={RAIL_Y} color={AUTO} opacity={railIn} width={3.6} grow={1} />}
            {isErr && (
              <rect x={x - comSize / 2} y={RAIL_Y - comSize / 2} width={comSize} height={comSize} rx={10} fill="none" stroke={DANGER} strokeWidth={4} opacity={clamp(weak * 2 - 0.8)} />
            )}
          </g>
        );
      })}

      {/* 一発却下（共通点）*/}
      {common > 0.05 && common < 0.999 && (
        <g opacity={common * (1 - clamp(common * 2 - 1.4))}>
          {[-500, 500].map((x, k) => (
            <g key={k}>
              <Arrow x1={x - 70} y1={RAIL_Y - 132} x2={x + 70} y2={RAIL_Y - 132} color={DIM} opacity={1} width={5} grow={1} />
              <line x1={x - 24} y1={RAIL_Y - 158} x2={x + 24} y2={RAIL_Y - 106} stroke={DANGER} strokeWidth={7} strokeLinecap="round" />
              <line x1={x + 24} y1={RAIL_Y - 158} x2={x - 24} y2={RAIL_Y - 106} stroke={DANGER} strokeWidth={7} strokeLinecap="round" />
            </g>
          ))}
        </g>
      )}
      {common > 0.4 && (
        <text x={0} y={RAIL_Y + 116} fill={INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central" opacity={clamp(common * 2 - 1)}>
          共通：一発をあきらめ、やさしい一手の鎖に
        </text>
      )}

      {/* 中央：共通の的（絵の空間と糸）＋学習 */}
      {learn > 0.02 && (
        <g opacity={learn}>
          <SpaceField cx={0} cy={-26} w={900} h={224} opacity={1} />
          <path d={threadPath(0, -26, 0.62)} fill="none" stroke={MEAN_SOFT} strokeWidth={26} strokeLinecap="round" />
          <path d={threadPath(0, -26, 0.62)} fill="none" stroke={MEAN} strokeWidth={5} strokeLinecap="round" />
          <text x={0} y={62} fill={MEAN_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            学ぶのは、個々の絵でなく、糸の地形
          </text>
          {/* 学習データのペアが両鎖から流れこむ */}
          {[-1, 1].map((d, k) => (
            <Arrow key={k} x1={d * 400} y1={RAIL_Y + 70} x2={d * 150} y2={-70} color={d < 0 ? DIFF : AUTO} opacity={clamp(learn * 2 - 0.6)} width={4} grow={1} />
          ))}
        </g>
      )}

      {/* ちがい・得意 */}
      {diff > 0.4 && (
        <g opacity={clamp(diff * 2 - 1)}>
          <text x={-466} y={RAIL_Y + 184} fill={DIFF_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            全体を一度に磨く
          </text>
          <text x={466} y={RAIL_Y + 184} fill={AUTO_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            一部分ずつ確定
          </text>
        </g>
      )}

      {/* 拡散産・自己回帰産の猫＋得意バッジ */}
      {meritD > 0.04 && (
        <g opacity={meritD}>
          <Cat cx={-720} cy={150} s={0.78} opacity={1} mood={0.42 + merge * 0.36} tone={0} blur={0} />
          <Badge cx={-430} cy={150} w={420} opacity={1} color={DIFF_DARK} soft={DIFF_SOFT} text="質感・全体のまとまり" />
        </g>
      )}
      {meritA > 0.04 && (
        <g opacity={meritA}>
          <Cat cx={720} cy={150} s={0.78} opacity={1} mood={0.42 + merge * 0.36} tone={0.55} blur={0} />
          <Badge cx={430} cy={150} w={420} opacity={1} color={AUTO_DARK} soft={AUTO_SOFT} text="指示の理解・対話で修正" />
        </g>
      )}

      {/* 弱み */}
      {weak > 0.05 && (
        <g opacity={weak}>
          <text x={-466} y={244} fill={DIFF_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            途中のいびつさを直せる
          </text>
          <text x={466} y={244} fill={DANGER} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            先のまちがいが後へ響く
          </text>
        </g>
      )}

      {/* 溶ける境目 */}
      {merge > 0.05 && (
        <g opacity={merge}>
          <rect x={-150} y={RAIL_Y - 70} width={300} height={140} rx={16} fill={hexLerp(DIFF_SOFT, AUTO_SOFT, 0.5)} opacity={0.6} />
          <text x={0} y={RAIL_Y} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            いいとこ取り
          </text>
          <text x={0} y={300} fill={INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central" opacity={clamp(merge * 2 - 1)}>
            芯の二択：ノイズの濃さか、描いた量か
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面6 — 結論「狙った一点を当てる」
// ============================================================
const FIELD_O_CY = 76;
const RECAP_LABELS = ['絵は数の格子', '砂浜の一粒', '拡散モデル', '自己回帰モデル'];
const o_recap = sc([
  [F('outro.recap'), 0],
  [F('outro.recap') + 200, 1],
]);
const o_field = sc([
  [F('outro.recap') + 60, 0],
  [F('outro.recap') + 130, 1],
]);
const o_converge = sc([
  [F('outro.converge'), 0],
  [F('outro.converge') + 110, 1],
]);
const o_callback = sc([
  [F('outro.callback'), 0],
  [F('outro.callback') + 70, 1],
]);
const o_end = sc([
  [F('outro.end'), 0],
  [F('outro.end') + 70, 1],
]);

const RecapIcon: React.FC<{ cx: number; cy: number; kind: number; opacity: number }> = ({
  cx,
  cy,
  kind,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - 96} y={cy - 64} width={192} height={128} rx={16} fill={SURFACE} stroke={EDGE} strokeWidth={2.4} />
      {kind === 0 && <GridLines cx={cx} cy={cy - 8} size={92} n={5} opacity={1} color={DIM} />}
      {kind === 0 && <rect x={cx - 46} y={cy - 54} width={92} height={92} rx={6} fill="none" stroke={INK} strokeWidth={2.4} />}
      {kind === 1 && (
        <g>
          <rect x={cx - 46} y={cy - 50} width={92} height={84} rx={8} fill={CHAOS_SOFT} />
          <circle cx={cx} cy={cy - 8} r={9} fill={MEAN} />
        </g>
      )}
      {kind === 2 && <Cat cx={cx} cy={cy + 2} s={0.42} opacity={1} mood={0.4} tone={0} blur={0} />}
      {kind === 2 && <circle cx={cx} cy={cy - 6} r={50} fill="none" stroke={DIFF} strokeWidth={3} opacity={0.5} />}
      {kind === 3 && <Cat cx={cx} cy={cy + 2} s={0.42} opacity={1} mood={0.4} tone={0.55} blur={0} />}
      {kind === 3 && <rect x={cx - 46} y={cy - 6} width={92} height={40} fill={SURFACE} opacity={0.55} />}
      <text x={cx} y={cy + 92} fill={SUB_INK} fontSize={FS_SYMBOL} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
        {RECAP_LABELS[kind]}
      </text>
    </g>
  );
};

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const recap = rv(o_recap, f);
  const field = rv(o_field, f);
  const converge = rv(o_converge, f);
  const callback = rv(o_callback, f);
  const end = rv(o_end, f);

  const catPt = threadPt(0.62, 0, FIELD_O_CY, 1);

  return (
    <g opacity={vis}>
      {/* 振り返りアイコン */}
      {[0, 1, 2, 3].map((k) => (
        <RecapIcon key={k} cx={-558 + k * 372} cy={-396} kind={k} opacity={clamp(recap * 4.6 - k - 0.15)} />
      ))}

      {/* 絵の空間と糸 */}
      <SpaceField cx={0} cy={FIELD_O_CY} w={1680} h={430} opacity={field} />
      {field > 0.2 && (
        <g opacity={field}>
          <path d={threadPath(0, FIELD_O_CY, 1)} fill="none" stroke={MEAN_SOFT} strokeWidth={34} strokeLinecap="round" />
          <path d={threadPath(0, FIELD_O_CY, 1)} fill="none" stroke={MEAN} strokeWidth={6} strokeLinecap="round" />
        </g>
      )}

      {/* まだ灯らない一点たち */}
      {field > 0.4 &&
        [0.12, 0.3, 0.46, 0.78, 0.92].map((t, k) => {
          const p = threadPt(t, 0, FIELD_O_CY, 1);
          const lit = end > 0.2 ? 0.22 : 0.22;
          return <circle key={k} cx={p.x} cy={p.y} r={11} fill={MEAN} opacity={field * lit} />;
        })}

      {/* 二つの鎖が収束 */}
      {converge > 0.02 && (
        <g opacity={converge}>
          {Array.from({ length: 5 }).map((_, k) => {
            const t = (k + 1) / 5;
            const ap = clamp(converge * 6 - k);
            const lx = lerp(-840, catPt.x, t);
            const ly = lerp(-150, catPt.y, t);
            const rx = lerp(840, catPt.x, t);
            const ry = lerp(-150, catPt.y, t);
            return (
              <g key={k}>
                <circle cx={lx} cy={ly} r={12} fill={DIFF} opacity={ap} />
                <circle cx={rx} cy={ry} r={12} fill={AUTO} opacity={ap} />
              </g>
            );
          })}
          <text x={-840} y={-208} fill={DIFF_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            拡散モデル
          </text>
          <text x={840} y={-208} fill={AUTO_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            自己回帰モデル
          </text>
        </g>
      )}

      {/* 回帰した生成画 */}
      {callback > 0.02 && (
        <g>
          <circle cx={catPt.x} cy={catPt.y} r={lerp(16, 40, callback)} fill={MEAN} opacity={0.3} />
          <Canvas
            cx={catPt.x}
            cy={catPt.y - 30}
            size={lerp(40, 250, smooth(callback))}
            opacity={callback}
            noise={0}
            grid={0}
            blur={0}
            reveal={1}
            mood={0.85}
            tone={0}
            seed={1}
            n={12}
          />
        </g>
      )}

      {/* 締めの一文 */}
      {end > 0.05 && (
        <g opacity={clamp(end * 1.4)}>
          <text x={0} y={300} fill={INK} fontSize={FS_TITLE - 14} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">
            学んだ地形で、狙った一点を当てる
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// セクションタイトル（画面跨ぎ・左上）
// ============================================================
const SCENE_TITLES: { start: number; text: string }[] = [
  { start: sStart.intro, text: '序論' },
  { start: sStart.body1, text: '01 絵は数の格子' },
  { start: sStart.body2, text: '02 拡散モデル' },
  { start: sStart.body3, text: '03 自己回帰モデル' },
  { start: sStart.body4, text: '04 ふたつを並べる' },
  { start: sStart.outro, text: '結論' },
];

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-922} y={-506} width={11} height={38} rx={5} fill={INK} />
      <text
        x={-892}
        y={-486}
        fill={SUB_INK}
        fontSize={FS_SCENE}
        fontFamily={FONT}
        fontWeight={800}
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
  const rows = wrapLine(line.text, 24);
  return (
    <g>
      <rect x={-892} y={330} width={1784} height={276} rx={20} fill={SURFACE} opacity={0.82} />
      <rect x={-892} y={330} width={1784} height={3} fill={EDGE} />
      <g opacity={op}>
        <text
          x={0}
          y={384}
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
            y={(rows.length === 2 ? 446 : 470) + i * 64}
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
export const ImageGeneration: React.FC = () => {
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
          <radialGradient id="ig_bgglow" cx="50%" cy="34%" r="82%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#ig_bgglow)" />

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
