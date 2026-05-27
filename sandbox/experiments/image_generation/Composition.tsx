// [4] Remotion 実装 — image_generation（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 対話字幕は SCRIPT 全行から自動描画。
// 背骨は「1024×1024 のマス目盤面」。装置はそれが姿を変える工程として連なる。

import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SCRIPT, AnimEvent, Speaker } from './scriptData';

// ===== 固定ベース：白テーマ =====
const BG = '#f5f7fa';
const SURFACE = '#ffffff';
const SURFACE_SOFT = '#eef1f6';
const SURFACE_DIM = '#e6ebf2';
const EDGE = '#c4cedd';
const EDGE_SOFT = '#dce1ea';
const GRID = '#eaeef4';
const INK = '#243044';
const SUB_INK = '#5d6b82';
const DIM = '#9aa6b8';
const SHADOW = '#243044';

// ===== アクセント（image_generation の語彙）=====
const SUBJECT = '#6a4fb6';        // 盤面・絵そのもの（ヴァイオレット）
const SUBJECT_DARK = '#4a3686';
const SUBJECT_SOFT = '#ece6f7';
const DIFFUSION = '#c8458b';      // 拡散モデル（ローズ）
const DIFFUSION_DARK = '#933064';
const DIFFUSION_SOFT = '#f7e0ed';
const AUTOREG = '#1e9c7f';        // 自己回帰モデル（エメラルド）
const AUTOREG_DARK = '#136c58';
const AUTOREG_SOFT = '#d8eee7';
const VOID = '#4a5366';           // 砂嵐・困難
const VOID_DARK = '#2e3543';
const VOID_SOFT = '#dde1e8';
const HOPE = '#d99a2b';           // 易しい・学べる・OK
const HOPE_DARK = '#a8721a';
const HOPE_SOFT = '#fbeece';

const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
const SPEAKER_COLOR: Record<Speaker, string> = {
  めたん: '#d6336c',
  ずんだもん: '#2f9e44',
};

// ===== 文字サイズ（固定ベース・下限つき）=====
const FS_TITLE = 86;
const FS_METHOD = 64;
const FS_SUB = 44;
const FS_SPEAKER = 36;
const FS_LABEL = 50;
const FS_NOTE = 42;
const FS_TINY = 34;

// ===== 台本とフレーム =====
const CHAR_FRAMES = 4;
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

// ===== トラック補間機構 =====
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
const sc = (pairs: [number, number][]): Track<Sc> => pairs.map(([f, v]) => ({ f, state: { v } }));
const rv = (track: Track<Sc>, f: number): number => resolveTrack(track, f).v;

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

// 決定論的擬似乱数（盤面のマスごとに固定）
const seedRand = (i: number, j: number, salt: number): number => {
  let h = (i * 374761393) ^ (j * 668265263) ^ (salt * 1274126177);
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 4294967295;
};

// ===== 背景の薄い格子（全画面常駐の質感）=====
const BgGrid: React.FC = () => {
  const lines: React.ReactElement[] = [];
  const step = 40;
  for (let x = -960 + step; x < 960; x += step) {
    lines.push(<line key={'vx' + x} x1={x} y1={-540} x2={x} y2={540} stroke={GRID} strokeWidth={1} opacity={0.6} />);
  }
  for (let y = -540 + step; y < 540; y += step) {
    lines.push(<line key={'hx' + y} x1={-960} y1={y} x2={960} y2={y} stroke={GRID} strokeWidth={1} opacity={0.6} />);
  }
  return <g>{lines}</g>;
};

// ============================================================
// 盤面（マス目）— 背骨。砂嵐度・パッチ埋め率・カーソル位置で姿を変える
// ============================================================
type BoardProps = {
  cx: number;
  cy: number;
  size: number;     // 盤面の外形サイズ（正方形）
  n: number;        // 1辺のマス数
  opacity: number;
  sandStorm: number;     // 0..1
  patchFill: number;     // 0..1（左上から右下へ）
  patchColor?: string;   // パッチが埋まる色（既定 SUBJECT）
  patchSoft?: string;    // パッチが埋まる色（薄め）
  showGrid?: boolean;
  gridStrength?: number; // 罫線の濃さ（0..1）
  edgeStrength?: number; // 外枠の太さ（0..1）
  salt?: number;         // 砂嵐の固定パターン用
  edgeColor?: string;
};

const Board: React.FC<BoardProps> = ({
  cx, cy, size, n, opacity, sandStorm, patchFill,
  patchColor = SUBJECT, patchSoft = SUBJECT_SOFT,
  showGrid = true, gridStrength = 1, edgeStrength = 1, salt = 0,
  edgeColor = EDGE,
}) => {
  if (opacity <= 0.001) return null;
  const cell = size / n;
  const x0 = cx - size / 2;
  const y0 = cy - size / 2;
  const cells: React.ReactElement[] = [];
  const totalCells = n * n;
  const filledCount = Math.floor(patchFill * totalCells);
  if (sandStorm > 0.001 || patchFill > 0.001) {
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const idx = j * n + i;
        const filled = idx < filledCount;
        let fill: string | null = null;
        if (filled) {
          const r = seedRand(i, j, salt + 7);
          fill = hexLerp(patchSoft, patchColor, 0.3 + r * 0.5);
        } else if (sandStorm > 0.001) {
          const r = seedRand(i, j, salt);
          const gray = hexLerp('#ffffff', VOID, 0.15 + r * 0.55);
          fill = hexLerp('#ffffff', gray, sandStorm);
        }
        if (fill) {
          cells.push(
            <rect key={'c' + idx} x={x0 + i * cell} y={y0 + j * cell} width={cell + 0.5} height={cell + 0.5} fill={fill} />,
          );
        }
      }
    }
  }

  const lines: React.ReactElement[] = [];
  if (showGrid && gridStrength > 0.01) {
    const lw = 0.5 + gridStrength * 0.8;
    for (let k = 1; k < n; k++) {
      lines.push(<line key={'gv' + k} x1={x0 + k * cell} y1={y0} x2={x0 + k * cell} y2={y0 + size} stroke={EDGE_SOFT} strokeWidth={lw} opacity={0.55 + gridStrength * 0.35} />);
      lines.push(<line key={'gh' + k} x1={x0} y1={y0 + k * cell} x2={x0 + size} y2={y0 + k * cell} stroke={EDGE_SOFT} strokeWidth={lw} opacity={0.55 + gridStrength * 0.35} />);
    }
  }

  return (
    <g opacity={opacity}>
      <rect x={x0} y={y0} width={size} height={size} rx={6} fill={SURFACE} stroke={edgeColor} strokeWidth={2 + edgeStrength * 2} />
      {cells}
      {lines}
      {/* 四隅マーカー */}
      <circle cx={x0} cy={y0} r={3} fill={edgeColor} />
      <circle cx={x0 + size} cy={y0} r={3} fill={edgeColor} />
      <circle cx={x0} cy={y0 + size} r={3} fill={edgeColor} />
      <circle cx={x0 + size} cy={y0 + size} r={3} fill={edgeColor} />
    </g>
  );
};

// ============================================================
// 猫の線画（SUBJECT 色のシンプルな輪郭）
// ============================================================
const CatLine: React.FC<{ cx: number; cy: number; size: number; opacity: number; color?: string }> = ({
  cx, cy, size, opacity, color = SUBJECT,
}) => {
  if (opacity <= 0.001) return null;
  const s = size / 100;
  const sw = Math.max(3, 4 * s);
  return (
    <g opacity={opacity} transform={`translate(${cx} ${cy}) scale(${s})`}>
      {/* 左耳 */}
      <path d="M -42 -16 L -48 -50 L -22 -30 Z" fill={color} opacity={0.95} />
      {/* 右耳 */}
      <path d="M 42 -16 L 48 -50 L 22 -30 Z" fill={color} opacity={0.95} />
      {/* 顔 */}
      <path
        d="M -44 -16 Q -44 22 0 26 Q 44 22 44 -16 Q 44 -36 0 -36 Q -44 -36 -44 -16 Z"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {/* 目 */}
      <ellipse cx={-16} cy={-10} rx={4.5} ry={6} fill={color} />
      <ellipse cx={16} cy={-10} rx={4.5} ry={6} fill={color} />
      {/* 鼻 */}
      <path d="M -3 4 L 3 4 L 0 9 Z" fill={color} />
      {/* 口 */}
      <path d="M 0 9 Q -6 14 -10 11 M 0 9 Q 6 14 10 11" fill="none" stroke={color} strokeWidth={sw * 0.7} strokeLinecap="round" />
      {/* ひげ */}
      <line x1={-20} y1={2} x2={-44} y2={-2} stroke={color} strokeWidth={sw * 0.5} strokeLinecap="round" />
      <line x1={-20} y1={6} x2={-44} y2={8} stroke={color} strokeWidth={sw * 0.5} strokeLinecap="round" />
      <line x1={20} y1={2} x2={44} y2={-2} stroke={color} strokeWidth={sw * 0.5} strokeLinecap="round" />
      <line x1={20} y1={6} x2={44} y2={8} stroke={color} strokeWidth={sw * 0.5} strokeLinecap="round" />
      {/* 体（座った姿） */}
      <path
        d="M -30 22 Q -38 50 -28 56 L 28 56 Q 38 50 30 22"
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {/* しっぽ */}
      <path d="M 30 40 Q 50 36 48 22" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </g>
  );
};

// ============================================================
// プロンプト枠（序論）
// ============================================================
const PromptFrame: React.FC<{ cx: number; cy: number; opacity: number; show: number }> = ({
  cx, cy, opacity, show,
}) => {
  if (opacity <= 0.001) return null;
  const w = 290;
  const h = 110;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={14} fill={SURFACE} stroke={SUB_INK} strokeWidth={3} />
      {/* ふきだしのしっぽ */}
      <path d={`M ${cx + w / 2 - 28} ${cy + h / 2 - 4} L ${cx + w / 2 + 24} ${cy + h / 2 + 22} L ${cx + w / 2 - 8} ${cy + h / 2 - 4} Z`} fill={SURFACE} stroke={SUB_INK} strokeWidth={3} strokeLinejoin="round" />
      <text x={cx - w / 2 + 20} y={cy - 22} fill={DIM} fontSize={FS_TINY - 4} fontFamily={FONT} fontWeight={600}>
        プロンプト
      </text>
      <text x={cx} y={cy + 18} fill={INK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="middle" opacity={show}>
        「猫の写真」
      </text>
    </g>
  );
};

// ============================================================
// 「？」マーク（VOID 色、大きく）
// ============================================================
const QMark: React.FC<{ cx: number; cy: number; size: number; opacity: number; color?: string }> = ({
  cx, cy, size, opacity, color = VOID,
}) => {
  if (opacity <= 0.001) return null;
  return (
    <text x={cx} y={cy} fill={color} fontSize={size} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central" opacity={opacity}>
      ？
    </text>
  );
};

// ============================================================
// 「✗」マーク（VOID 色、盤面の上にかぶさる）
// ============================================================
const XMark: React.FC<{ cx: number; cy: number; size: number; opacity: number; color?: string }> = ({
  cx, cy, size, opacity, color = VOID,
}) => {
  if (opacity <= 0.001) return null;
  const r = size * 0.42;
  return (
    <g opacity={opacity}>
      <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} stroke={color} strokeWidth={size * 0.12} strokeLinecap="round" />
      <line x1={cx + r} y1={cy - r} x2={cx - r} y2={cy + r} stroke={color} strokeWidth={size * 0.12} strokeLinecap="round" />
    </g>
  );
};

// ============================================================
// 色帯（DIFFUSION/AUTOREG）
// ============================================================
const ColorBand: React.FC<{ cx: number; cy: number; w: number; h: number; color: string; opacity: number }> = ({
  cx, cy, w, h, color, opacity,
}) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2} fill={color} />
    </g>
  );
};

// ============================================================
// 数値帯（盤面の上：数式・補足）
// ============================================================
const NumberBar: React.FC<{ cx: number; cy: number; text: string; opacity: number; fontSize?: number }> = ({
  cx, cy, text, opacity, fontSize = FS_NOTE,
}) => {
  if (opacity <= 0.001) return null;
  const w = Math.max(420, text.length * fontSize * 1.05 + 56);
  const h = fontSize * 1.65;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2} fill={SURFACE} stroke={EDGE} strokeWidth={2} />
      <text x={cx} y={cy} fill={INK} fontSize={fontSize} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
};

// ============================================================
// 方式名カード（ボディ3・ボディ4 冒頭：大きく現れて畳まれる）
// ============================================================
const MethodCard: React.FC<{ cx: number; cy: number; name: string; subtitle: string; color: string; soft: string; opacity: number; scale: number }> = ({
  cx, cy, name, subtitle, color, soft, opacity, scale,
}) => {
  if (opacity <= 0.001) return null;
  const fs = FS_METHOD * scale;
  const fsSub = FS_NOTE * scale;
  const w = Math.max(560, name.length * fs * 1.05 + 80) * scale;
  const h = (fs + fsSub + 56) * scale;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2 + 5} width={w} height={h} rx={20 * scale} fill={SHADOW} opacity={0.08} />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={20 * scale} fill={SURFACE} stroke={color} strokeWidth={3.5 * scale} />
      <rect x={cx - w / 2} y={cy - h / 2} width={10 * scale} height={h} rx={5 * scale} fill={color} />
      <rect x={cx + w / 2 - 10 * scale} y={cy - h / 2} width={10 * scale} height={h} rx={5 * scale} fill={color} />
      <rect x={cx - w / 2 + 16 * scale} y={cy - h / 2} width={w - 32 * scale} height={h * 0.18} fill={soft} />
      <text x={cx} y={cy - fsSub * 0.5} fill={color} fontSize={fs} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">
        {name}
      </text>
      <text x={cx} y={cy + fs * 0.45} fill={SUB_INK} fontSize={fsSub} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central">
        {subtitle}
      </text>
    </g>
  );
};

// ============================================================
// 学習ペア（拡散：完成 ↑↓ 汚れた／自己回帰：完成 ↑↓ パッチ列）
// ============================================================
type LearnPairProps = {
  cx: number;
  cy: number;
  miniSize: number;
  opacity: number;
  topRender: (cx: number, cy: number, size: number) => React.ReactNode;
  bottomRender: (cx: number, cy: number, size: number) => React.ReactNode;
  arrowColor?: string;
};
const LearnPair: React.FC<LearnPairProps> = ({ cx, cy, miniSize, opacity, topRender, bottomRender, arrowColor = HOPE }) => {
  if (opacity <= 0.001) return null;
  const gap = miniSize * 0.4;
  const topY = cy - miniSize / 2 - gap / 2;
  const botY = cy + miniSize / 2 + gap / 2;
  return (
    <g opacity={opacity}>
      <rect x={cx - miniSize * 0.66} y={topY - miniSize * 0.5 - 6} width={miniSize * 1.32} height={miniSize * 2 + gap + 12} rx={12} fill="none" stroke={arrowColor} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
      {topRender(cx, topY, miniSize)}
      {bottomRender(cx, botY, miniSize)}
      {/* 双方向矢印 */}
      <line x1={cx} y1={topY + miniSize / 2 + 6} x2={cx} y2={botY - miniSize / 2 - 6} stroke={arrowColor} strokeWidth={4} />
      <path d={`M ${cx - 8} ${topY + miniSize / 2 + 12} L ${cx} ${topY + miniSize / 2 + 4} L ${cx + 8} ${topY + miniSize / 2 + 12}`} fill="none" stroke={arrowColor} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      <path d={`M ${cx - 8} ${botY - miniSize / 2 - 12} L ${cx} ${botY - miniSize / 2 - 4} L ${cx + 8} ${botY - miniSize / 2 - 12}`} fill="none" stroke={arrowColor} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
};

// ============================================================
// 数珠（小矢印が並んだ連鎖）— ボディ2
// ============================================================
type ChainProps = {
  cx: number;
  cy: number;
  width: number;
  count: number;
  reveal: number;        // 0..1 で左から右へ
  color: string;
  withCheck: number;     // 各小矢印に✓を付ける度合
  opacity: number;
};
const Chain: React.FC<ChainProps> = ({ cx, cy, width, count, reveal, color, withCheck, opacity }) => {
  if (opacity <= 0.001) return null;
  const step = width / count;
  const x0 = cx - width / 2;
  const items: React.ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    const ap = clamp(reveal * count - i + 0.2);
    if (ap <= 0.01) continue;
    const sx = x0 + i * step + step * 0.12;
    const ex = x0 + (i + 1) * step - step * 0.12;
    items.push(
      <g key={'k' + i} opacity={ap}>
        <line x1={sx} y1={cy} x2={ex - step * 0.18} y2={cy} stroke={color} strokeWidth={5} strokeLinecap="round" />
        <path d={`M ${ex - step * 0.32} ${cy - step * 0.13} L ${ex - step * 0.05} ${cy} L ${ex - step * 0.32} ${cy + step * 0.13}`} fill="none" stroke={color} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
        {withCheck > 0.05 && ap > 0.5 && (
          <g opacity={withCheck}>
            <circle cx={(sx + ex) / 2} cy={cy - step * 0.55} r={step * 0.18} fill={HOPE_SOFT} stroke={HOPE} strokeWidth={2} />
            <path d={`M ${(sx + ex) / 2 - step * 0.08} ${cy - step * 0.55} L ${(sx + ex) / 2 - step * 0.02} ${cy - step * 0.5} L ${(sx + ex) / 2 + step * 0.1} ${cy - step * 0.62}`} fill="none" stroke={HOPE_DARK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>,
    );
  }
  return <g opacity={opacity}>{items}</g>;
};

// ============================================================
// 共通点ドット（右側に縦に並ぶ3つの丸＋表題）
// ============================================================
const CommonDot: React.FC<{ cx: number; cy: number; lit: number; label: string; opacity: number }> = ({
  cx, cy, lit, label, opacity,
}) => {
  if (opacity <= 0.001) return null;
  const fill = hexLerp(SURFACE, HOPE_SOFT, clamp(lit));
  const stroke = hexLerp(DIM, HOPE, clamp(lit));
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={28} fill={fill} stroke={stroke} strokeWidth={3 + lit * 2} />
      {lit > 0.4 && (
        <path d={`M ${cx - 11} ${cy} L ${cx - 3} ${cy + 8} L ${cx + 12} ${cy - 9}`} fill="none" stroke={HOPE_DARK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={clamp(lit * 1.6 - 0.4)} />
      )}
      {lit > 0.2 && (
        <text x={cx + 50} y={cy} fill={hexLerp(SUB_INK, HOPE_DARK, clamp(lit))} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="start" dominantBaseline="central" opacity={clamp(lit * 1.5)}>
          {label}
        </text>
      )}
    </g>
  );
};

// ============================================================
// 画面可視性
// ============================================================
const sceneStarts = {
  intro: 0,
  body1: F('scene.body1.in'),
  body2: F('scene.body2.in'),
  body3: F('scene.body3.in'),
  body4: F('scene.body4.in'),
  body5: F('scene.body5.in'),
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
const body4Vis = midVis(sceneStarts.body4, sceneStarts.body5);
const body5Vis = midVis(sceneStarts.body5, sceneStarts.outro);
const outroVis = sc([
  [sceneStarts.outro, 0],
  [sceneStarts.outro + CROSSFADE, 1],
  [TOTAL_FRAMES, 1],
]);

// 主役の盤面の基準
const BOARD_CY = -150;
const BOARD_SIZE_MAIN = 460;
const BOARD_N_MAIN = 12;

// ============================================================
// 画面1 — 序論
// ============================================================
const introIn = sc([
  [10, 0],
  [50, 1],
]);
const introPromptTyped = sc([
  [F('intro.prompt'), 0],
  [F('intro.prompt') + 18, 1],
]);
const introCat = sc([
  [F('intro.prompt') + 22, 0],
  [F('intro.prompt') + 30, 1],
  [F('intro.giveup'), 1],
  [F('intro.giveup') + 30, 0],
]);
const introQ = sc([
  [F('intro.q'), 0],
  [F('intro.q') + 32, 1],
  [F('intro.giveup'), 1],
  [F('intro.giveup') + 40, 0],
]);
const introXFlash = sc([
  [F('intro.giveup'), 0],
  [F('intro.giveup') + 8, 1],
  [F('intro.giveup') + 26, 1],
  [F('intro.giveup') + 44, 0],
]);
const introBands = sc([
  [F('intro.twocolors'), 0],
  [F('intro.twocolors') + 36, 1],
]);
const introTitle = sc([
  [F('intro.title'), 0],
  [F('intro.title') + 40, 1],
]);
const introPromptArrow = sc([
  [F('intro.prompt') + 12, 0],
  [F('intro.prompt') + 26, 1],
  [F('intro.giveup'), 1],
  [F('intro.giveup') + 24, 0],
]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(introIn, f);
  const typed = rv(introPromptTyped, f);
  const cat = rv(introCat, f);
  const q = rv(introQ, f);
  const x = rv(introXFlash, f);
  const bands = rv(introBands, f);
  const titleA = rv(introTitle, f);
  const arrowA = rv(introPromptArrow, f);

  const boardCx = 110;
  const boardCy = BOARD_CY;
  const promptCx = -500;
  const promptCy = boardCy;
  const qCx = boardCx + BOARD_SIZE_MAIN / 2 + 150;
  const qCy = boardCy - BOARD_SIZE_MAIN / 2 - 10;

  return (
    <g opacity={vis}>
      <PromptFrame cx={promptCx} cy={promptCy} opacity={inA} show={typed} />
      {/* プロンプト→盤面の矢印 */}
      {arrowA > 0.02 && (
        <g opacity={arrowA}>
          <line x1={promptCx + 160} y1={promptCy} x2={boardCx - BOARD_SIZE_MAIN / 2 - 16} y2={boardCy} stroke={SUB_INK} strokeWidth={4} strokeLinecap="round" />
          <path d={`M ${boardCx - BOARD_SIZE_MAIN / 2 - 36} ${boardCy - 12} L ${boardCx - BOARD_SIZE_MAIN / 2 - 16} ${boardCy} L ${boardCx - BOARD_SIZE_MAIN / 2 - 36} ${boardCy + 12}`} fill="none" stroke={SUB_INK} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      )}
      <Board cx={boardCx} cy={boardCy} size={BOARD_SIZE_MAIN} n={BOARD_N_MAIN} opacity={inA} sandStorm={0} patchFill={0} salt={11} />
      <CatLine cx={boardCx} cy={boardCy + 8} size={BOARD_SIZE_MAIN * 0.7} opacity={cat * inA} />
      <XMark cx={boardCx} cy={boardCy} size={BOARD_SIZE_MAIN * 0.7} opacity={x} />
      <QMark cx={qCx} cy={qCy} size={170} opacity={q * inA} />

      {/* 色帯（拡散・自己回帰） — 盤面の真下、タイトルとは別の y 帯 */}
      <ColorBand cx={boardCx - 90} cy={boardCy + BOARD_SIZE_MAIN / 2 + 38} w={120} h={22} color={DIFFUSION} opacity={bands * inA} />
      <ColorBand cx={boardCx + 90} cy={boardCy + BOARD_SIZE_MAIN / 2 + 38} w={120} h={22} color={AUTOREG} opacity={bands * inA} />

      {/* タイトル — 色帯の下 */}
      <g opacity={titleA * inA}>
        <text x={0} y={186} fill={SUBJECT_DARK} fontSize={FS_TITLE} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">
          画像生成AI
        </text>
        <line x1={-260} y1={224} x2={260} y2={224} stroke={SUBJECT} strokeWidth={4} />
        <text x={0} y={260} fill={SUB_INK} fontSize={FS_SUB} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central">
          実は、一発で当てるのは諦めている
        </text>
      </g>
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1：一発で当てるという無謀
// ============================================================
const b1In = sc([
  [sceneStarts.body1 + 8, 0],
  [sceneStarts.body1 + CROSSFADE + 18, 1],
]);
const b1Edge = sc([
  [sceneStarts.body1, 0],
  [sceneStarts.body1 + CROSSFADE + 30, 1],
]);
const b1CountBar = sc([
  [F('b1.count'), 0],
  [F('b1.count') + 30, 1],
  [F('b1.sea'), 1],
  [F('b1.sea') + 30, 0],
]);
const b1Rgb = sc([
  [F('b1.rgb'), 0],
  [F('b1.rgb') + 30, 1],
  [F('b1.sea'), 1],
  [F('b1.sea') + 30, 0],
]);
const b1Sea = sc([
  [F('b1.sea'), 0],
  [F('b1.sea') + 120, 1],
]);
const b1Storm = sc([
  [F('b1.sea'), 0],
  [F('b1.sea') + 60, 1],
  [F('b1.point'), 1],
  [F('b1.point') + 40, 0.4],
]);
const b1Point = sc([
  [F('b1.point'), 0],
  [F('b1.point') + 40, 1],
]);
const b1Strike = sc([
  [F('b1.allatonce'), 0],
  [F('b1.allatonce') + 50, 1],
]);
const b1Abandon = sc([
  [F('b1.abandon'), 0],
  [F('b1.abandon') + 32, 1],
]);
const b1SeaDim = sc([
  [F('b1.abandon'), 0],
  [F('b1.abandon') + 50, 1],
]);

const SmallBoard: React.FC<{ cx: number; cy: number; size: number; n: number; sandStorm: number; opacity: number; salt: number; isCat?: boolean }> = ({ cx, cy, size, n, sandStorm, opacity, salt, isCat = false }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <Board cx={cx} cy={cy} size={size} n={n} opacity={1} sandStorm={sandStorm} patchFill={0} salt={salt} showGrid={false} edgeStrength={0} edgeColor={EDGE_SOFT} />
      {isCat && <CatLine cx={cx} cy={cy + 2} size={size * 0.7} opacity={1} />}
    </g>
  );
};

const PossibilitySea: React.FC<{ reveal: number; opacity: number; dim: number }> = ({ reveal, opacity, dim }) => {
  if (opacity <= 0.001) return null;
  // 主盤面の周囲に 24 個の縮小盤面を散らす（重ならない配置）
  const positions: { x: number; y: number; salt: number }[] = [];
  const ring1 = [-820, -680, -540, -400, 400, 540, 680, 820];
  const yTop = -320;
  const yBot = 130;
  ring1.forEach((x, i) => positions.push({ x, y: yTop + (i % 2 === 0 ? -30 : 30), salt: 100 + i }));
  ring1.forEach((x, i) => positions.push({ x, y: yBot + (i % 2 === 0 ? -30 : 30), salt: 200 + i }));
  // 上下の追加列
  [-820, -540, 540, 820].forEach((x, i) => positions.push({ x, y: -440, salt: 300 + i }));
  [-820, -540, 540, 820].forEach((x, i) => positions.push({ x, y: 240, salt: 400 + i }));
  const dimColor = lerp(1, 0.5, dim);
  return (
    <g opacity={opacity}>
      {positions.map((p, i) => {
        const ap = clamp(reveal * positions.length * 1.5 - i * 0.6) * dimColor;
        if (ap <= 0.02) return null;
        return <SmallBoard key={i} cx={p.x} cy={p.y} size={106} n={7} sandStorm={1} opacity={ap} salt={p.salt} />;
      })}
    </g>
  );
};

const RgbStack: React.FC<{ cx: number; cy: number; opacity: number }> = ({ cx, cy, opacity }) => {
  if (opacity <= 0.001) return null;
  const sz = 130;
  return (
    <g opacity={opacity}>
      <rect x={cx - sz / 2} y={cy - sz / 2} width={sz} height={sz} rx={8} fill={SUBJECT_SOFT} stroke={SUBJECT} strokeWidth={3} />
      <text x={cx} y={cy - sz / 2 - 20} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle">1マス</text>
      {/* 3本の色棒 */}
      <rect x={cx + sz / 2 + 24} y={cy - 60} width={150} height={26} rx={4} fill="#e0383b" />
      <rect x={cx + sz / 2 + 24} y={cy - 18} width={150} height={26} rx={4} fill="#2da64a" />
      <rect x={cx + sz / 2 + 24} y={cy + 24} width={150} height={26} rx={4} fill="#2b6dd8" />
      <text x={cx + sz / 2 + 99} y={cy - 47} fill={SURFACE} fontSize={FS_TINY - 6} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">R 256</text>
      <text x={cx + sz / 2 + 99} y={cy - 5} fill={SURFACE} fontSize={FS_TINY - 6} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">G 256</text>
      <text x={cx + sz / 2 + 99} y={cy + 37} fill={SURFACE} fontSize={FS_TINY - 6} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">B 256</text>
      <text x={cx + 90} y={cy + 96} fill={INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle">256³ ≈ 1600万 色</text>
    </g>
  );
};

const StrikeArrow: React.FC<{ targetX: number; targetY: number; progress: number; opacity: number }> = ({ targetX, targetY, progress, opacity }) => {
  if (opacity <= 0.001) return null;
  // 画面外（左上）から targetX, targetY 手前まで飛ぶ
  const startX = -1080;
  const startY = -560;
  const wallOffset = 140;
  const tx = lerp(startX, targetX - wallOffset, clamp(progress * 1.2));
  const ty = lerp(startY, targetY - wallOffset * 0.7, clamp(progress * 1.2));
  return (
    <g opacity={opacity}>
      <line x1={startX} y1={startY} x2={tx} y2={ty} stroke={INK} strokeWidth={10} strokeLinecap="round" />
      <path d={`M ${tx - 24} ${ty - 6} L ${tx + 4} ${ty + 4} L ${tx - 8} ${ty + 22} Z`} fill={INK} />
      {/* 壁 */}
      {progress > 0.6 && (
        <g opacity={clamp(progress * 2 - 1)}>
          <path
            d={`M ${tx + 14} ${ty - 36} L ${tx + 60} ${ty - 16} L ${tx + 38} ${ty + 6} L ${tx + 74} ${ty + 28} L ${tx + 46} ${ty + 50} L ${tx + 78} ${ty + 70}`}
            fill="none"
            stroke={VOID}
            strokeWidth={9}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
};

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1In, f);
  const edge = rv(b1Edge, f);
  const numBar = rv(b1CountBar, f);
  const rgb = rv(b1Rgb, f);
  const seaR = rv(b1Sea, f);
  const storm = rv(b1Storm, f);
  const pt = rv(b1Point, f);
  const strike = rv(b1Strike, f);
  const abandon = rv(b1Abandon, f);
  const seaDim = rv(b1SeaDim, f);

  const boardCx = 0;
  const boardCy = -50;
  const seaOp = inA * (1 - clamp(rgb * 1.2)) * clamp(seaR * 2);

  return (
    <g opacity={vis}>
      {/* 可能性の海（中央盤面の周囲） */}
      <PossibilitySea reveal={seaR} opacity={seaOp} dim={seaDim} />

      {/* 中央の盤面 */}
      <Board cx={boardCx} cy={boardCy} size={BOARD_SIZE_MAIN} n={BOARD_N_MAIN} opacity={inA} sandStorm={storm} patchFill={0} salt={21} gridStrength={lerp(1, 0.5, storm)} edgeStrength={edge} edgeColor={lerp(0, 1, pt) > 0.5 ? SUBJECT : EDGE} />

      {/* 中央に猫が立つ瞬間（point） */}
      <CatLine cx={boardCx} cy={boardCy + 8} size={BOARD_SIZE_MAIN * 0.65} opacity={pt * inA} />

      {/* 数値帯：100万マス */}
      <NumberBar cx={boardCx} cy={boardCy - BOARD_SIZE_MAIN / 2 - 50} text="1024 × 1024 ≈ 100万 マス" opacity={numBar * inA * (1 - rgb)} />

      {/* RGB 拡大表示 */}
      <g transform={`translate(${boardCx + BOARD_SIZE_MAIN / 2 + 80} ${boardCy - 60})`}>
        <RgbStack cx={0} cy={0} opacity={rgb * inA} />
      </g>

      {/* 一発当ての矢印（壁にぶつかる） */}
      <StrikeArrow targetX={boardCx} targetY={boardCy} progress={strike} opacity={inA} />

      {/* 諦め印 */}
      <XMark cx={boardCx} cy={boardCy} size={BOARD_SIZE_MAIN * 0.55} opacity={abandon * inA} />
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2：バラし方、二つ
// ============================================================
const b2In = sc([
  [sceneStarts.body2 + 8, 0],
  [sceneStarts.body2 + CROSSFADE + 18, 1],
]);
const b2Tiny = sc([
  [sceneStarts.body2, 0],
  [sceneStarts.body2 + CROSSFADE + 24, 1],
]);
const b2Split = sc([
  [F('b2.split'), 0],
  [F('b2.split') + 80, 1],
]);
const b2Easy = sc([
  [F('b2.easy'), 0],
  [F('b2.easy') + 40, 1],
]);
const b2Cat = sc([
  [F('b2.cat'), 0],
  [F('b2.cat') + 36, 1],
]);
const b2Learn = sc([
  [F('b2.learnable'), 0],
  [F('b2.learnable') + 50, 1],
]);
const b2Fork = sc([
  [F('b2.fork'), 0],
  [F('b2.fork') + 50, 1],
]);
const b2Diff = sc([
  [F('b2.diffSide'), 0],
  [F('b2.diffSide') + 60, 1],
]);
const b2Auto = sc([
  [F('b2.autoSide'), 0],
  [F('b2.autoSide') + 60, 1],
]);
const b2Preview = sc([
  [F('b2.preview'), 0],
  [F('b2.preview') + 36, 1],
]);

const BigStrike: React.FC<{ cx: number; cy: number; opacity: number; ng: number }> = ({ cx, cy, opacity, ng }) => {
  if (opacity <= 0.001) return null;
  const w = 220;
  return (
    <g opacity={opacity}>
      <line x1={cx - w / 2} y1={cy} x2={cx + w / 2 - 24} y2={cy} stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <path d={`M ${cx + w / 2 - 40} ${cy - 18} L ${cx + w / 2} ${cy} L ${cx + w / 2 - 40} ${cy + 18}`} fill="none" stroke={INK} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
      <XMark cx={cx} cy={cy - 60} size={48} opacity={ng} />
    </g>
  );
};

const FillingMiniBoard: React.FC<{ cx: number; cy: number; size: number; fill: number; opacity: number }> = ({
  cx, cy, size, fill, opacity,
}) => {
  if (opacity <= 0.001) return null;
  return <Board cx={cx} cy={cy} size={size} n={6} opacity={opacity} sandStorm={0} patchFill={fill} salt={31 + Math.floor(cx)} showGrid={false} edgeStrength={0} edgeColor={EDGE_SOFT} />;
};

const FadingMiniBoard: React.FC<{ cx: number; cy: number; size: number; storm: number; opacity: number }> = ({
  cx, cy, size, storm, opacity,
}) => {
  if (opacity <= 0.001) return null;
  return <Board cx={cx} cy={cy} size={size} n={6} opacity={opacity} sandStorm={storm} patchFill={0} salt={51 + Math.floor(cx)} showGrid={false} edgeStrength={0} edgeColor={EDGE_SOFT} />;
};

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2In, f);
  const tiny = rv(b2Tiny, f);
  const splitA = rv(b2Split, f);
  const easyA = rv(b2Easy, f);
  const catA = rv(b2Cat, f);
  const learnA = rv(b2Learn, f);
  const forkA = rv(b2Fork, f);
  const diffA = rv(b2Diff, f);
  const autoA = rv(b2Auto, f);
  const previewA = rv(b2Preview, f);

  // ボディ1のこだま（左下に縮んだ姿）
  const echoX = -780;
  const echoY = 130;
  const echoSz = 120;
  // 大矢印（中央左寄り）
  const bigX = -440;
  const bigY = -150;
  // 数珠（中央〜右）
  const chainCx = 150;
  const chainCy = -150;
  const chainW = 980;
  const chainCount = 10;

  // 分岐後の上半分（DIFFUSION）と下半分（AUTOREG）
  const upY = -250;
  const dnY = -50;
  const splitProgress = clamp(forkA);

  // 分岐後の小盤面列（拡散側／自己回帰側）
  const miniRow = Array.from({ length: 6 });
  const miniW = 110;
  const miniGap = 14;
  const rowW = miniRow.length * miniW + (miniRow.length - 1) * miniGap;
  const rowX0 = chainCx - chainW / 2 + miniW / 2;

  return (
    <g opacity={vis}>
      {/* ボディ1のこだま */}
      <g opacity={tiny * inA * (1 - clamp(previewA * 1.3))}>
        <Board cx={echoX} cy={echoY} size={echoSz} n={6} opacity={1} sandStorm={1} patchFill={0} salt={61} showGrid={false} edgeStrength={0} edgeColor={EDGE_SOFT} />
        <XMark cx={echoX} cy={echoY} size={echoSz * 0.7} opacity={0.85} />
        <text x={echoX} y={echoY + echoSz / 2 + 28} fill={SUB_INK} fontSize={FS_TINY - 4} fontFamily={FONT} fontWeight={700} textAnchor="middle">一発当て</text>
      </g>

      {/* 大矢印（一発当ての象徴） */}
      <g opacity={splitA * inA * (1 - previewA)}>
        <BigStrike cx={bigX} cy={bigY} opacity={1} ng={learnA} />
        {splitA > 0.4 && (
          <text x={bigX} y={bigY - 110} fill={INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle">
            =
          </text>
        )}
      </g>

      {/* 数珠（連鎖） */}
      <g opacity={(1 - previewA) * (1 - splitProgress) * inA}>
        <Chain cx={chainCx} cy={chainCy} width={chainW} count={chainCount} reveal={splitA} color={SUB_INK} withCheck={learnA} opacity={1} />
      </g>

      {/* 数珠の右端の猫 */}
      <g opacity={catA * inA * (1 - splitProgress) * (1 - previewA)}>
        <SmallBoard cx={chainCx + chainW / 2 + 50} cy={chainCy} size={120} n={6} sandStorm={0} opacity={1} salt={71} isCat />
      </g>

      {/* 「易しい」バッジ */}
      {easyA > 0.05 && (
        <g opacity={easyA * inA * (1 - splitProgress) * (1 - previewA)}>
          <rect x={chainCx + 220} y={chainCy - 90} width={150} height={60} rx={30} fill={HOPE_SOFT} stroke={HOPE} strokeWidth={3} />
          <text x={chainCx + 295} y={chainCy - 60} fill={HOPE_DARK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">易しい</text>
        </g>
      )}

      {/* 分岐後の上下二本 */}
      {/* 上半分：拡散側 */}
      <g opacity={forkA * inA * (1 - previewA)}>
        <Chain cx={chainCx} cy={upY} width={chainW} count={chainCount} reveal={1} color={DIFFUSION} withCheck={0} opacity={1} />
        {diffA > 0.05 && (
          <g opacity={diffA}>
            {miniRow.map((_, i) => {
              const cx = rowX0 + i * (miniW + miniGap);
              const storm = 1 - i / (miniRow.length - 1);
              const isCat = i === miniRow.length - 1;
              return (
                <g key={'d' + i}>
                  <FadingMiniBoard cx={cx} cy={upY + 100} size={miniW} storm={storm} opacity={1} />
                  {isCat && <CatLine cx={cx} cy={upY + 100} size={miniW * 0.7} opacity={1} />}
                </g>
              );
            })}
          </g>
        )}
      </g>

      {/* 下半分：自己回帰側 */}
      <g opacity={forkA * inA * (1 - previewA)}>
        <Chain cx={chainCx} cy={dnY} width={chainW} count={chainCount} reveal={1} color={AUTOREG} withCheck={0} opacity={1} />
        {autoA > 0.05 && (
          <g opacity={autoA}>
            {miniRow.map((_, i) => {
              const cx = rowX0 + i * (miniW + miniGap);
              const fillR = (i + 1) / miniRow.length;
              const isCat = i === miniRow.length - 1;
              return (
                <g key={'a' + i}>
                  <FillingMiniBoard cx={cx} cy={dnY + 100} size={miniW} fill={fillR} opacity={1} />
                  {isCat && <CatLine cx={cx} cy={dnY + 100} size={miniW * 0.7} opacity={1} />}
                </g>
              );
            })}
          </g>
        )}
      </g>
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3：拡散モデル
// ============================================================
const b3CardBig = sc([
  [sceneStarts.body3, 0],
  [sceneStarts.body3 + CROSSFADE, 1],
  [F('b3.start'), 1],
  [F('b3.start') + 30, 0],
]);
const b3Step = (which: number): Track<Sc> => {
  // 6個の小盤面の登場タイミング
  const f0 = F('b3.start');
  const f1 = F('b3.subtract');
  const f2 = F('b3.more');
  const f3 = F('b3.more') + 30;
  const f4 = F('b3.count');
  const f5 = F('b3.count') + 30;
  const fs = [f0, f1, f2, f3, f4, f5];
  const ft = fs[which];
  return sc([
    [ft, 0],
    [ft + 40, 1],
  ]);
};
const b3AxisLine = sc([
  [F('b3.count'), 0],
  [F('b3.count') + 50, 1],
]);
const b3Highlight = sc([
  [F('b3.howq'), 0],
  [F('b3.howq') + 14, 1],
  [F('b3.howq') + 50, 1],
  [F('b3.howq') + 70, 0],
]);
const b3Learn = sc([
  [F('b3.learn'), 0],
  [F('b3.learn') + 60, 1],
  [F('b3.identity'), 1],
  [F('b3.identity') + 40, 0],
]);
const b3Pairs = sc([
  [F('b3.pairs'), 0],
  [F('b3.pairs') + 70, 1],
  [F('b3.identity'), 1],
  [F('b3.identity') + 40, 0],
]);
const b3IdentFlash = sc([
  [F('b3.identity') + 36, 0],
  [F('b3.identity') + 52, 1],
  [F('b3.identity') + 90, 1],
  [F('b3.identity') + 120, 0],
]);
const b3Products = sc([
  [F('b3.products'), 0],
  [F('b3.products') + 40, 1],
]);

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const cardBig = rv(b3CardBig, f);
  const steps = [0, 1, 2, 3, 4, 5].map((i) => rv(b3Step(i), f));
  const axis = rv(b3AxisLine, f);
  const hl = rv(b3Highlight, f);
  const learn = rv(b3Learn, f);
  const pairs = rv(b3Pairs, f);
  const ident = rv(b3IdentFlash, f);
  const prod = rv(b3Products, f);

  // 時間軸列の配置
  const rowY = -50;
  const miniSize = 175;
  const gap = 24;
  const total = 6 * miniSize + 5 * gap;
  const x0 = -total / 2 + miniSize / 2;
  const xs = Array.from({ length: 6 }).map((_, i) => x0 + i * (miniSize + gap));
  const storms = [1, 0.83, 0.66, 0.5, 0.33, 0];

  return (
    <g opacity={vis}>
      {/* 大方式名カード（本編冒頭で1度だけ） */}
      <g opacity={cardBig}>
        <MethodCard cx={0} cy={-50} name="拡散モデル" subtitle="時間軸 — ノイズを少しずつ引く" color={DIFFUSION} soft={DIFFUSION_SOFT} opacity={1} scale={1.3} />
      </g>

      {/* 時間軸列 */}
      {xs.map((cx, i) => {
        const ap = steps[i];
        if (ap <= 0.01) return null;
        const isLast = i === 5;
        const stormI = storms[i];
        const flashAdd = ident * 0.4;
        return (
          <g key={'s' + i} opacity={ap}>
            <Board cx={cx} cy={rowY} size={miniSize} n={8} opacity={1} sandStorm={stormI} patchFill={0} salt={101 + i} showGrid={false} edgeStrength={i === 2 ? 0 : 0} edgeColor={hexLerp(EDGE, DIFFUSION, flashAdd + (i === 2 ? hl * 0.7 : 0))} />
            {isLast && <CatLine cx={cx} cy={rowY + 2} size={miniSize * 0.7} opacity={1} />}
            {i === 2 && hl > 0.02 && (
              <rect x={cx - miniSize / 2 - 6} y={rowY - miniSize / 2 - 6} width={miniSize + 12} height={miniSize + 12} rx={10} fill="none" stroke={DIFFUSION} strokeWidth={4 + hl * 4} opacity={hl} />
            )}
            {i < 5 && ap > 0.5 && (
              <g opacity={ap}>
                <line x1={cx + miniSize / 2 + 2} y1={rowY} x2={cx + miniSize / 2 + gap - 4} y2={rowY} stroke={DIFFUSION} strokeWidth={4} strokeLinecap="round" />
                <path d={`M ${cx + miniSize / 2 + gap - 14} ${rowY - 7} L ${cx + miniSize / 2 + gap - 2} ${rowY} L ${cx + miniSize / 2 + gap - 14} ${rowY + 7}`} fill="none" stroke={DIFFUSION} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
              </g>
            )}
          </g>
        );
      })}

      {/* 時間軸線 */}
      {axis > 0.05 && (
        <g opacity={axis}>
          <line x1={xs[0] - miniSize / 2} y1={rowY + miniSize / 2 + 36} x2={xs[5] + miniSize / 2} y2={rowY + miniSize / 2 + 36} stroke={DIFFUSION} strokeWidth={6} strokeLinecap="round" />
          <path d={`M ${xs[5] + miniSize / 2 + 8} ${rowY + miniSize / 2 + 28} L ${xs[5] + miniSize / 2 + 26} ${rowY + miniSize / 2 + 36} L ${xs[5] + miniSize / 2 + 8} ${rowY + miniSize / 2 + 44}`} fill="none" stroke={DIFFUSION} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
          <text x={(xs[0] + xs[5]) / 2} y={rowY + miniSize / 2 + 84} fill={DIFFUSION_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle">
            20 〜 50 ステップで完成
          </text>
        </g>
      )}

      {/* 学習ペア（右端の上） */}
      {learn > 0.05 && (
        <g opacity={learn}>
          <LearnPair
            cx={xs[5]}
            cy={rowY - miniSize / 2 - 220}
            miniSize={120}
            opacity={1}
            topRender={(c, cy, sz) => (
              <g key="top">
                <Board cx={c} cy={cy} size={sz} n={8} opacity={1} sandStorm={0} patchFill={0} salt={201} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
                <CatLine cx={c} cy={cy + 2} size={sz * 0.7} opacity={1} />
              </g>
            )}
            bottomRender={(c, cy, sz) => (
              <g key="bot">
                <Board cx={c} cy={cy} size={sz} n={8} opacity={1} sandStorm={0.5} patchFill={0} salt={202} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
              </g>
            )}
          />
          <text x={xs[5]} y={rowY - miniSize / 2 - 30} fill={HOPE_DARK} fontSize={FS_TINY - 2} fontFamily={FONT} fontWeight={700} textAnchor="middle">
            汚す手順を逆向きに学ぶ
          </text>
        </g>
      )}

      {/* ペアの複製（3組） */}
      {pairs > 0.1 && (
        <g opacity={pairs}>
          {[-2, -1].map((d, idx) => {
            const c = xs[5] + d * 180;
            return (
              <g key={'p' + idx}>
                <LearnPair
                  cx={c}
                  cy={rowY - miniSize / 2 - 220}
                  miniSize={120}
                  opacity={1}
                  topRender={(cc, cy, sz) => (
                    <g key="t">
                      <Board cx={cc} cy={cy} size={sz} n={8} opacity={1} sandStorm={0} patchFill={0.6 + idx * 0.15} salt={210 + idx} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
                    </g>
                  )}
                  bottomRender={(cc, cy, sz) => (
                    <g key="b">
                      <Board cx={cc} cy={cy} size={sz} n={8} opacity={1} sandStorm={0.4 + idx * 0.2} patchFill={0} salt={220 + idx} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
                    </g>
                  )}
                />
              </g>
            );
          })}
        </g>
      )}

      {/* 製品名 */}
      {prod > 0.05 && (
        <g opacity={prod}>
          <text x={0} y={rowY + miniSize / 2 + 144} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle">
            Stable Diffusion / Midjourney / DALL-E
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — ボディ4：自己回帰モデル
// ============================================================
const b4CardBig = sc([
  [sceneStarts.body4, 0],
  [sceneStarts.body4 + CROSSFADE, 1],
  [F('b4.empty'), 1],
  [F('b4.empty') + 30, 0],
]);
const b4Board = sc([
  [F('b4.empty'), 0],
  [F('b4.empty') + 40, 1],
]);
const b4Count = sc([
  [F('b4.count'), 0],
  [F('b4.count') + 40, 1],
]);
const b4FillStart = sc([
  [F('b4.fillStart'), 0],
  [F('b4.fillStart') + 50, 0.05],
]);
const b4Cursor = sc([
  [F('b4.fillStart'), 0],
  [F('b4.fillStart') + 30, 1],
]);
const b4Predict = sc([
  [F('b4.predict'), 0],
  [F('b4.predict') + 40, 1],
]);
const b4Unfurl = sc([
  [F('b4.gpt'), 0],
  [F('b4.gpt') + 60, 1],
]);
const b4Unroll = sc([
  [F('b4.unroll'), 0],
  [F('b4.unroll') + 50, 1],
]);
const b4FillMid = sc([
  [sceneStarts.body4, 0],
  [F('b4.fromAll'), 0.05],
  [F('b4.fromAll') + 60, 0.4],
]);
const b4LearnGroup = sc([
  [F('b4.learn'), 0],
  [F('b4.learn') + 60, 1],
  [F('b4.fullCat'), 1],
  [F('b4.fullCat') + 60, 0],
]);
const b4FillFull = sc([
  [sceneStarts.body4, 0],
  [F('b4.fullCat'), 0],
  [F('b4.fullCat') + 60, 1],
]);
const b4Products = sc([
  [F('b4.products'), 0],
  [F('b4.products') + 40, 1],
]);

// パッチ列の展開図（右側に並ぶ16x16=256個の小マス、ただし簡略表現）
const UnrollStrip: React.FC<{ cx: number; cy: number; w: number; h: number; rows: number; cols: number; fill: number; opacity: number }> = ({
  cx, cy, w, h, rows, cols, fill, opacity,
}) => {
  if (opacity <= 0.001) return null;
  const cell = Math.min(w / cols, h / rows);
  const x0 = cx - (cell * cols) / 2;
  const y0 = cy - (cell * rows) / 2;
  const total = rows * cols;
  const filledCount = Math.floor(fill * total);
  const cells: React.ReactElement[] = [];
  for (let i = 0; i < total; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const filled = i < filledCount;
    const cellOp = filled ? 1 : 0.18;
    const col = filled ? hexLerp(SUBJECT_SOFT, SUBJECT, 0.3 + seedRand(c, r, 33) * 0.5) : SURFACE_SOFT;
    cells.push(
      <rect key={i} x={x0 + c * cell + 0.5} y={y0 + r * cell + 0.5} width={cell - 1} height={cell - 1} fill={col} opacity={cellOp} />,
    );
  }
  return (
    <g opacity={opacity}>
      <rect x={x0 - 4} y={y0 - 4} width={cell * cols + 8} height={cell * rows + 8} rx={6} fill={SURFACE} stroke={AUTOREG} strokeWidth={2} />
      {cells}
    </g>
  );
};

const SceneBody4: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const cardBig = rv(b4CardBig, f);
  const board = rv(b4Board, f);
  const count = rv(b4Count, f);
  const fillStartA = rv(b4FillStart, f);
  const cursor = rv(b4Cursor, f);
  const predict = rv(b4Predict, f);
  const unfurl = rv(b4Unfurl, f);
  const unroll = rv(b4Unroll, f);
  const fillMid = rv(b4FillMid, f);
  const learnG = rv(b4LearnGroup, f);
  const fillFull = rv(b4FillFull, f);
  const products = rv(b4Products, f);

  // 盤面：左寄せ（右に展開図用の余白）
  const boardCx = -380;
  const boardCy = -50;
  const boardSize = 460;
  const n = 16;
  const cell = boardSize / n;

  // パッチ埋め率（段階で増える）
  const totalFill = Math.max(fillStartA, fillMid, fillFull);

  // 展開図
  const stripCx = 350;
  const stripCy = -50;
  const stripW = 540;
  const stripH = 60;

  // 現在カーソル位置（盤面側）
  const cursorIdx = Math.min(n * n - 1, Math.floor(totalFill * n * n));
  const cursorR = Math.floor(cursorIdx / n);
  const cursorC = cursorIdx % n;
  const cursorX = boardCx - boardSize / 2 + cursorC * cell + cell / 2;
  const cursorY = boardCy - boardSize / 2 + cursorR * cell + cell / 2;

  return (
    <g opacity={vis}>
      {/* 大方式名カード（本編冒頭で1度だけ） */}
      <g opacity={cardBig}>
        <MethodCard cx={0} cy={-50} name="自己回帰モデル" subtitle="空間軸 — マスを左上から埋める" color={AUTOREG} soft={AUTOREG_SOFT} opacity={1} scale={1.2} />
      </g>

      {/* 主盤面（パッチ列） */}
      <Board cx={boardCx} cy={boardCy} size={boardSize} n={n} opacity={board} sandStorm={0} patchFill={totalFill} patchColor={SUBJECT} patchSoft={SUBJECT_SOFT} salt={301} edgeStrength={0.4} edgeColor={AUTOREG} />

      {/* 完成猫オーバーレイ */}
      <CatLine cx={boardCx} cy={boardCy + 4} size={boardSize * 0.7} opacity={fillFull * 0.95} />

      {/* 数値帯 */}
      <NumberBar cx={boardCx} cy={boardCy - boardSize / 2 - 40} text="16×16 px / パッチ ／ 64×64 ≈ 4096 パッチ" opacity={count} fontSize={FS_NOTE - 4} />

      {/* カーソル */}
      {cursor > 0.05 && totalFill < 0.95 && (
        <g opacity={cursor}>
          <rect x={cursorX - cell / 2 - 3} y={cursorY - cell / 2 - 3} width={cell + 6} height={cell + 6} rx={3} fill="none" stroke={AUTOREG} strokeWidth={4} />
          <circle cx={cursorX} cy={cursorY} r={cell * 0.18} fill={AUTOREG} />
        </g>
      )}

      {/* 吸い込み矢（埋まった最後 → 次） */}
      {predict > 0.05 && totalFill > 0.01 && totalFill < 0.95 && (
        <g opacity={predict}>
          {(() => {
            const prevIdx = Math.max(0, cursorIdx - 1);
            const pr = Math.floor(prevIdx / n);
            const pc = prevIdx % n;
            const px = boardCx - boardSize / 2 + pc * cell + cell / 2;
            const py = boardCy - boardSize / 2 + pr * cell + cell / 2;
            return (
              <g>
                <path d={`M ${px} ${py} Q ${(px + cursorX) / 2} ${py - 18} ${cursorX} ${cursorY}`} fill="none" stroke={AUTOREG} strokeWidth={3.5} />
                <path d={`M ${cursorX - 8} ${cursorY - 4} L ${cursorX + 1} ${cursorY + 1} L ${cursorX - 6} ${cursorY + 8}`} fill="none" stroke={AUTOREG} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
              </g>
            );
          })()}
        </g>
      )}

      {/* 展開図 */}
      <UnrollStrip cx={stripCx} cy={stripCy} w={stripW} h={stripH} rows={4} cols={32} fill={totalFill} opacity={unfurl} />

      {/* 「= 文章の列」比喩 */}
      {unroll > 0.05 && (
        <g opacity={unroll}>
          <text x={stripCx} y={stripCy + 80} fill={AUTOREG_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle">
            = 文章の列（GPT と同じ機械）
          </text>
        </g>
      )}

      {/* 盤面と展開図をつなぐ「ほどける」矢印 */}
      {unfurl > 0.05 && (
        <g opacity={unfurl}>
          <path d={`M ${boardCx + boardSize / 2 + 12} ${boardCy} Q ${(boardCx + stripCx) / 2} ${boardCy - 80} ${stripCx - stripW / 2 - 12} ${stripCy}`} fill="none" stroke={AUTOREG} strokeWidth={3} strokeDasharray="6 7" />
        </g>
      )}

      {/* 学習ペア */}
      {learnG > 0.05 && (
        <g opacity={learnG}>
          <LearnPair
            cx={stripCx}
            cy={-260}
            miniSize={100}
            opacity={1}
            topRender={(c, cy, sz) => (
              <g key="top">
                <Board cx={c} cy={cy} size={sz} n={12} opacity={1} sandStorm={0} patchFill={1} patchColor={SUBJECT} patchSoft={SUBJECT_SOFT} salt={401} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
                <CatLine cx={c} cy={cy + 2} size={sz * 0.7} opacity={1} />
              </g>
            )}
            bottomRender={(c, cy, sz) => (
              <g key="bot">
                <rect x={c - sz * 0.85} y={cy - sz * 0.2} width={sz * 1.7} height={sz * 0.4} rx={4} fill={SURFACE} stroke={AUTOREG} strokeWidth={2} />
                {Array.from({ length: 18 }).map((_, i) => (
                  <rect key={i} x={c - sz * 0.85 + 4 + i * (sz * 1.7 - 8) / 18} y={cy - sz * 0.15} width={(sz * 1.7 - 8) / 18 - 2} height={sz * 0.3} fill={hexLerp(SUBJECT_SOFT, SUBJECT, 0.3 + seedRand(i, 0, 77) * 0.5)} />
                ))}
              </g>
            )}
          />
          <text x={stripCx} y={-160} fill={HOPE_DARK} fontSize={FS_TINY - 2} fontFamily={FONT} fontWeight={700} textAnchor="middle">
            完成画像 → パッチ列に並べ替える
          </text>
        </g>
      )}

      {/* 製品名 */}
      {products > 0.05 && (
        <g opacity={products}>
          <text x={boardCx} y={boardCy + boardSize / 2 + 50} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle">
            GPT-4o / Gemini 画像生成
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面6 — ボディ5：軸が違うだけ
// ============================================================
const b5In = sc([
  [sceneStarts.body5 + 8, 0],
  [sceneStarts.body5 + CROSSFADE + 18, 1],
]);
const b5Dots = sc([
  [F('b5.dots'), 0],
  [F('b5.dots') + 36, 1],
]);
const b5Dot1 = sc([
  [F('b5.dot1'), 0],
  [F('b5.dot1') + 40, 1],
]);
const b5Dot2 = sc([
  [F('b5.dot2'), 0],
  [F('b5.dot2') + 40, 1],
]);
const b5Dot3 = sc([
  [F('b5.dot3'), 0],
  [F('b5.dot3') + 40, 1],
]);
const b5Shrink = sc([
  [F('b5.axisCalls'), 1],
  [F('b5.axisCalls') + 40, 0.7],
]);
const b5Vert = sc([
  [F('b5.vert'), 0],
  [F('b5.vert') + 50, 1],
]);
const b5Horz = sc([
  [F('b5.horz'), 0],
  [F('b5.horz') + 50, 1],
]);
const b5Mid = sc([
  [F('b5.midpoints'), 0],
  [F('b5.midpoints') + 50, 1],
]);
const b5DiffStrength = sc([
  [F('b5.diffStrength') + 14, 0],
  [F('b5.diffStrength') + 32, 1],
  [F('b5.diffStrength') + 70, 1],
  [F('b5.diffStrength') + 100, 0],
]);
const b5Split = sc([
  [F('b5.split'), 0],
  [F('b5.split') + 40, 1],
]);

const SceneBody5: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b5In, f);
  const dots = rv(b5Dots, f);
  const d1 = rv(b5Dot1, f);
  const d2 = rv(b5Dot2, f);
  const d3 = rv(b5Dot3, f);
  const shrink = rv(b5Shrink, f);
  const vert = rv(b5Vert, f);
  const horz = rv(b5Horz, f);
  const midA = rv(b5Mid, f);
  const diffF = rv(b5DiffStrength, f);
  const split = rv(b5Split, f);

  const originCx = -300;
  const originCy = -80;
  const mainSize = 240 * shrink;
  const axisV = 220;
  const axisH = 360;

  // ドットの位置（右寄り）
  const dotsCx = 360;
  const dotsCyArr = [-240, -100, 40];

  return (
    <g opacity={vis * inA}>
      {/* 主盤面（原点・猫） */}
      <Board cx={originCx} cy={originCy} size={mainSize} n={10} opacity={1} sandStorm={0} patchFill={0} salt={501} edgeStrength={0.3} />
      <CatLine cx={originCx} cy={originCy + 2} size={mainSize * 0.7} opacity={1} />

      {/* 縦軸（DIFFUSION） */}
      {vert > 0.02 && (
        <g opacity={vert}>
          <line x1={originCx} y1={originCy - axisV * vert} x2={originCx} y2={originCy + axisV * vert} stroke={DIFFUSION} strokeWidth={9 + diffF * 4} strokeLinecap="round" />
          <path d={`M ${originCx - 12} ${originCy - axisV + 18} L ${originCx} ${originCy - axisV} L ${originCx + 12} ${originCy - axisV + 18}`} fill="none" stroke={DIFFUSION} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
          {/* 端の小盤面 */}
          <SmallBoard cx={originCx} cy={originCy - axisV - 90} size={130} n={8} sandStorm={1} opacity={vert} salt={511} />
          <text x={originCx} y={originCy - axisV - 170} fill={DIFFUSION_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle">ノイズ多い</text>
        </g>
      )}
      {/* 横軸（AUTOREG） */}
      {horz > 0.02 && (
        <g opacity={horz}>
          <line x1={originCx - axisH * horz} y1={originCy} x2={originCx + axisH * horz} y2={originCy} stroke={AUTOREG} strokeWidth={9} strokeLinecap="round" />
          <path d={`M ${originCx + axisH - 18} ${originCy - 12} L ${originCx + axisH} ${originCy} L ${originCx + axisH - 18} ${originCy + 12}`} fill="none" stroke={AUTOREG} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
          {/* 端の小盤面 */}
          <SmallBoard cx={originCx + axisH + 100} cy={originCy} size={130} n={12} sandStorm={0} opacity={horz} salt={521} />
          <Board cx={originCx + axisH + 100} cy={originCy} size={130} n={12} opacity={horz} sandStorm={0} patchFill={1} patchColor={SUBJECT} patchSoft={SUBJECT_SOFT} salt={521} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
          <CatLine cx={originCx + axisH + 100} cy={originCy + 2} size={130 * 0.7} opacity={horz} />
          <text x={originCx + axisH + 100} y={originCy + 110} fill={AUTOREG_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle">全パッチ埋</text>
          <SmallBoard cx={originCx - axisH - 100} cy={originCy} size={130} n={12} sandStorm={0} opacity={horz} salt={522} />
          <text x={originCx - axisH - 100} y={originCy + 110} fill={AUTOREG_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle">空白</text>
        </g>
      )}
      {/* 中点小盤面（拡散側＝時間軸列縮小／自己回帰側＝パッチ列縮小） */}
      {midA > 0.05 && (
        <g opacity={midA}>
          {/* 縦軸中点：時間軸列の縮小 */}
          {[0, 1, 2].map((i) => (
            <Board key={'mv' + i} cx={originCx + 50 + i * 32} cy={originCy - axisV / 2} size={28} n={4} opacity={1} sandStorm={1 - i * 0.5} patchFill={0} salt={531 + i} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
          ))}
          {/* 横軸中点：パッチ列の縮小 */}
          {[0, 1, 2].map((i) => (
            <Board key={'mh' + i} cx={originCx + axisH / 2 + 50 + i * 32} cy={originCy + 50} size={28} n={4} opacity={1} sandStorm={0} patchFill={(i + 1) / 3} patchColor={SUBJECT} patchSoft={SUBJECT_SOFT} salt={541 + i} showGrid={false} edgeColor={EDGE_SOFT} edgeStrength={0} />
          ))}
        </g>
      )}
      {/* 補助ラベル */}
      {split > 0.05 && (
        <g opacity={split}>
          <text x={originCx + 16} y={originCy + axisV + 36} fill={DIFFUSION_DARK} fontSize={FS_NOTE - 2} fontFamily={FONT} fontWeight={700} textAnchor="start">お絵かき特化</text>
          <text x={originCx + axisH + 100} y={originCy + 156} fill={AUTOREG_DARK} fontSize={FS_NOTE - 2} fontFamily={FONT} fontWeight={700} textAnchor="middle">テキストと混ぜる</text>
        </g>
      )}

      {/* 共通点ドット */}
      <g opacity={dots}>
        {[0, 1, 2].map((i) => (
          <circle key={'b' + i} cx={dotsCx} cy={dotsCyArr[i]} r={28} fill={SURFACE} stroke={DIM} strokeWidth={3} />
        ))}
      </g>
      <CommonDot cx={dotsCx} cy={dotsCyArr[0]} lit={d1} label="易しい一手の連鎖" opacity={dots} />
      <CommonDot cx={dotsCx} cy={dotsCyArr[1]} lit={d2} label="前を見て次を当てる" opacity={dots} />
      <CommonDot cx={dotsCx} cy={dotsCyArr[2]} lit={d3} label="逆方向の学習" opacity={dots} />
    </g>
  );
};

// ============================================================
// 画面7 — 結論
// ============================================================
const outroIn = sc([
  [sceneStarts.outro + 8, 0],
  [sceneStarts.outro + CROSSFADE + 18, 1],
]);
const outroChain = sc([
  [F('outro.chain'), 0],
  [F('outro.chain') + 30, 0.45],
  [F('outro.chain') + 70, 0.45],
  [F('outro.chain') + 110, 0],
]);
const outroAxesFlash = sc([
  [F('outro.axes'), 0],
  [F('outro.axes') + 14, 1],
  [F('outro.axes') + 60, 1],
  [F('outro.axes') + 90, 0],
]);
const outroQ = sc([
  [F('outro.q'), 0],
  [F('outro.q') + 40, 1],
  [F('outro.end'), 1],
  [F('outro.end') + 40, 0],
]);
const outroEnd = sc([
  [F('outro.end'), 0],
  [F('outro.end') + 40, 1],
]);

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(outroIn, f);
  const chainA = rv(outroChain, f);
  const flash = rv(outroAxesFlash, f);
  const q = rv(outroQ, f);
  const end = rv(outroEnd, f);

  const originCx = 0;
  const originCy = -120;
  const mainSize = 280;
  const axisV = 220;
  const axisH = 380;

  return (
    <g opacity={vis * inA}>
      {/* 二軸の十字＋盤面 */}
      <line x1={originCx} y1={originCy - axisV} x2={originCx} y2={originCy + axisV} stroke={DIFFUSION} strokeWidth={9 + flash * 5} strokeLinecap="round" />
      <line x1={originCx - axisH} y1={originCy} x2={originCx + axisH} y2={originCy} stroke={AUTOREG} strokeWidth={9 + flash * 5} strokeLinecap="round" />
      <path d={`M ${originCx - 12} ${originCy - axisV + 18} L ${originCx} ${originCy - axisV} L ${originCx + 12} ${originCy - axisV + 18}`} fill="none" stroke={DIFFUSION} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
      <path d={`M ${originCx + axisH - 18} ${originCy - 12} L ${originCx + axisH} ${originCy} L ${originCx + axisH - 18} ${originCy + 12}`} fill="none" stroke={AUTOREG} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />

      <Board cx={originCx} cy={originCy} size={mainSize} n={10} opacity={1} sandStorm={0} patchFill={0} salt={601} edgeStrength={0.4} />
      <CatLine cx={originCx} cy={originCy + 2} size={mainSize * 0.7} opacity={1} />

      {/* 数珠のこだま */}
      {chainA > 0.02 && (
        <g opacity={chainA}>
          <Chain cx={originCx + 320} cy={originCy + 180} width={520} count={8} reveal={1} color={SUB_INK} withCheck={0} opacity={1} />
        </g>
      )}

      {/* 「？」（序論のこだま） */}
      <QMark cx={originCx + 220} cy={originCy - 160} size={140} opacity={q} />

      {/* 締めの一文 — 字幕帯の上余白に収める（y < 320） */}
      {end > 0.05 && (
        <g opacity={end}>
          <text x={0} y={216} fill={SUBJECT_DARK} fontSize={FS_TITLE - 10} fontFamily={FONT} fontWeight={900} textAnchor="middle" dominantBaseline="central">
            諦め方が、賢い
          </text>
          <line x1={-200} y1={250} x2={200} y2={250} stroke={SUBJECT} strokeWidth={3} />
          <text x={0} y={284} fill={SUB_INK} fontSize={FS_NOTE - 4} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central">
            画面全体の砂嵐を薄めるか／マスを順に埋めるか
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 対話字幕（必須）
// ============================================================
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
  const rows = wrapLine(line.text, 26);
  return (
    <g>
      <rect x={-900} y={326} width={1800} height={210} rx={20} fill={SURFACE} opacity={0.78} />
      <rect x={-900} y={326} width={1800} height={3} fill={EDGE} />
      <g opacity={op}>
        <text x={0} y={372} fill={SPEAKER_COLOR[line.speaker]} fontSize={FS_SPEAKER} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
          {line.speaker}
        </text>
        {rows.map((r, i) => (
          <text key={i} x={0} y={(rows.length === 2 ? 432 : 460) + i * 54} fill={INK} fontSize={FS_SUB} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central">
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

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
        <defs>
          <radialGradient id="img_bgglow" cx="50%" cy="36%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#img_bgglow)" />
        <BgGrid />

        <SceneIntro f={f} vis={rv(introVis, f)} />
        <SceneBody1 f={f} vis={rv(body1Vis, f)} />
        <SceneBody2 f={f} vis={rv(body2Vis, f)} />
        <SceneBody3 f={f} vis={rv(body3Vis, f)} />
        <SceneBody4 f={f} vis={rv(body4Vis, f)} />
        <SceneBody5 f={f} vis={rv(body5Vis, f)} />
        <SceneOutro f={f} vis={rv(outroVis, f)} />

        <Subtitle frame={f} />
      </svg>
    </AbsoluteFill>
  );
};
