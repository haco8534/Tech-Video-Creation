// [4] Remotion 実装 — diffusion_image_gen（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 対話字幕は SCRIPT 全行から自動描画（04_remotion.md §7）。
// 背骨は「一枚の絵タイル」。同じ一枚が 絵→砂嵐→絵 と姿を変える。各画面はその加工工程。

import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
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

// ===== アクセント（拡散モデルの語彙）=====
const INDIGO = '#4263eb'; // モデル＝消す側・推測する側
const INDIGO_DARK = '#2c44b8';
const INDIGO_SOFT = '#e3e8fc';
const AMBER = '#e8911c'; // ぼくたちが撒いた答えのノイズ
const AMBER_DARK = '#b06f12';
const AMBER_SOFT = '#fbecd0';
const VIOLET = '#7048e8'; // プロンプトの誘導
const VIOLET_SOFT = '#ece5fb';
const OKC = '#3f9d57'; // ✓
const OKC_SOFT = '#dcefe0';
const DANGER = '#d9543c'; // ✗
const DANGER_SOFT = '#f7ddd6';
const MARBLE = '#dfe3ea';
const MARBLE_DARK = '#c2c9d6';

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
const FS_BIG = 80;

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
type Track = { f: number; v: number }[];

const ease = Easing.bezier(0.4, 0, 0.2, 1);

const resolveTrack = (track: Track, f: number): number => {
  if (track.length === 0) throw new Error('empty track');
  if (f <= track[0].f) return track[0].v;
  for (let i = 0; i < track.length - 1; i++) {
    const a = track[i];
    const b = track[i + 1];
    if (f >= a.f && f <= b.f) {
      const t = ease((f - a.f) / Math.max(1, b.f - a.f));
      return a.v + (b.v - a.v) * t;
    }
  }
  return track[track.length - 1].v;
};

const sc = (pairs: [number, number][]): Track => pairs.map(([f, v]) => ({ f, v }));
const rv = (track: Track, f: number): number => resolveTrack(track, f);

// ===== 数値・色ヘルパ =====
const clamp = (x: number, lo = 0, hi = 1): number => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const hex2 = (n: number): string =>
  ('0' + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
const hexLerp = (a: string, b: string, t: number): string => {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return '#' + hex2(lerp(pa[0], pb[0], t)) + hex2(lerp(pa[1], pb[1], t)) + hex2(lerp(pa[2], pb[2], t));
};

// 決定的ハッシュ（Math.random は使わない＝フレームごとに同じ砂嵐）
const frac = (x: number): number => x - Math.floor(x);
const hashA = (i: number, j: number, seed: number): number =>
  frac(Math.sin(i * 127.1 + j * 311.7 + seed * 74.7) * 43758.5453);
const hashB = (i: number, j: number, seed: number): number =>
  frac(Math.sin(i * 269.5 + j * 183.3 + seed * 41.1) * 24634.6345);

// ===== 背骨：絵タイル（格子。noise 0=絵 / 1=砂嵐）=====
// variant ごとに別の絵（猫）。noiseTint 1 で砂嵐の粒がアンバー（＝撒いた答え）。
const IMG = [
  { bg: '#cfe9f0', fur: '#e8a23c', nose: '#d6336c' }, // 0：最初の猫
  { bg: '#efe4cf', fur: '#8aa6c8', nose: '#c25b3a' }, // 1：別の猫
  { bg: '#e6efd9', fur: '#7bb069', nose: '#c25b3a' }, // 2：候補（別物）
];
const inCircle = (u: number, v: number, cx: number, cy: number, r: number): boolean =>
  (u - cx) * (u - cx) + (v - cy) * (v - cy) < r * r;
const imgColor = (variant: number, u: number, v: number): string => {
  const p = IMG[variant] || IMG[0];
  const ear = inCircle(u, v, 0.33, 0.33, 0.1) || inCircle(u, v, 0.67, 0.33, 0.1);
  const head = inCircle(u, v, 0.5, 0.58, 0.3);
  const eye = inCircle(u, v, 0.4, 0.55, 0.06) || inCircle(u, v, 0.6, 0.55, 0.06);
  const nose = inCircle(u, v, 0.5, 0.66, 0.035);
  if (nose) return p.nose;
  if (eye) return '#243044';
  if (ear || head) return p.fur;
  return p.bg;
};
const noiseCell = (i: number, j: number, seed: number, tint: number): string => {
  const g = hashB(i, j, seed);
  const gray = hexLerp('#7b8494', '#d8dce3', g);
  if (tint <= 0.001) return gray;
  const amber = hexLerp(AMBER_DARK, AMBER_SOFT, g);
  return hexLerp(gray, amber, clamp(tint));
};

const Tile: React.FC<{
  cx: number;
  cy: number;
  size: number;
  opacity: number;
  noise: number;
  seed?: number;
  variant?: number;
  cells?: number;
  noiseTint?: number;
  edge?: string;
}> = ({ cx, cy, size, opacity, noise, seed = 1, variant = 0, cells = 13, noiseTint = 0, edge = INK }) => {
  if (opacity <= 0.001) return null;
  const n = cells;
  const cell = size / n;
  const ox = cx - size / 2;
  const oy = cy - size / 2;
  const rects: React.ReactNode[] = [];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const u = (i + 0.5) / n;
      const v = (j + 0.5) / n;
      const isNoise = noise >= hashA(i, j, seed);
      const col = isNoise ? noiseCell(i, j, seed, noiseTint) : imgColor(variant, u, v);
      rects.push(
        <rect key={i + '-' + j} x={ox + i * cell} y={oy + j * cell} width={cell + 0.7} height={cell + 0.7} fill={col} />,
      );
    }
  }
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={oy + size + 14} rx={size * 0.46} ry={11} fill={SHADOW} opacity={0.08} />
      <rect x={ox} y={oy} width={size} height={size} rx={8} fill={SURFACE} stroke={edge} strokeWidth={4} />
      <g clipPath="none">{rects}</g>
      <rect x={ox} y={oy} width={size} height={size} rx={8} fill="none" stroke={edge} strokeWidth={4} />
    </g>
  );
};

// ===== 共通の小道具 =====
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

const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
  opacity: number;
  dash?: string;
  head?: number;
}> = ({ x1, y1, x2, y2, color, width, opacity, dash, head = 16 }) => {
  if (opacity <= 0.001) return null;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - Math.cos(ang) * 2;
  const hy = y2 - Math.sin(ang) * 2;
  const a1 = ang + 2.6;
  const a2 = ang - 2.6;
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2 - Math.cos(ang) * head * 0.8} y2={y2 - Math.sin(ang) * head * 0.8} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      <path
        d={'M ' + hx + ' ' + hy + ' L ' + (hx + Math.cos(a1) * head) + ' ' + (hy + Math.sin(a1) * head) + ' M ' + hx + ' ' + hy + ' L ' + (hx + Math.cos(a2) * head) + ' ' + (hy + Math.sin(a2) * head)}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
};

const Badge: React.FC<{ cx: number; cy: number; r: number; opacity: number; ok: boolean }> = ({ cx, cy, r, opacity, ok }) => {
  if (opacity <= 0.001) return null;
  const col = ok ? OKC : DANGER;
  const soft = ok ? OKC_SOFT : DANGER_SOFT;
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill={soft} stroke={col} strokeWidth={4} />
      {ok ? (
        <path d={'M ' + (cx - r * 0.42) + ' ' + cy + ' L ' + (cx - r * 0.08) + ' ' + (cy + r * 0.38) + ' L ' + (cx + r * 0.46) + ' ' + (cy - r * 0.36)} fill="none" stroke={col} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <g stroke={col} strokeWidth={6} strokeLinecap="round">
          <line x1={cx - r * 0.4} y1={cy - r * 0.4} x2={cx + r * 0.4} y2={cy + r * 0.4} />
          <line x1={cx + r * 0.4} y1={cy - r * 0.4} x2={cx - r * 0.4} y2={cy + r * 0.4} />
        </g>
      )}
    </g>
  );
};

// プロンプトの吹き出し（「猫」をささやく）
const PromptChip: React.FC<{ cx: number; cy: number; opacity: number; word?: string }> = ({ cx, cy, opacity, word = '猫' }) => {
  if (opacity <= 0.001) return null;
  const w = 150;
  const h = 84;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={18} fill={VIOLET_SOFT} stroke={VIOLET} strokeWidth={3.5} />
      <path d={'M ' + (cx + w / 2 - 26) + ' ' + (cy + h / 2 - 6) + ' l 30 26 l -8 -28 Z'} fill={VIOLET_SOFT} stroke={VIOLET} strokeWidth={3.5} />
      {TXT(cx, cy, '「' + word + '」', VIOLET, FS_LABEL, 800)}
    </g>
  );
};

// 推測する箱（モデル＝ノイズを当てる／取る）
const GuessBox: React.FC<{ cx: number; cy: number; w: number; h: number; opacity: number; think: number }> = ({ cx, cy, w, h, opacity, think }) => {
  if (opacity <= 0.001) return null;
  const edge = hexLerp(INDIGO, '#7048e8', clamp(think));
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={16} fill={INDIGO_SOFT} stroke={edge} strokeWidth={4} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={cx - w * 0.28 + i * w * 0.28} y1={cy - h * 0.26} x2={cx - w * 0.28 + i * w * 0.28} y2={cy + h * 0.26} stroke={edge} strokeWidth={3} opacity={0.35} />
      ))}
      {TXT(cx, cy + h * 0.5 + 26, 'モデル', INDIGO_DARK, FS_NOTE, 700)}
    </g>
  );
};

const Chisel: React.FC<{ cx: number; cy: number; opacity: number; rot: number }> = ({ cx, cy, opacity, rot }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity} transform={'rotate(' + rot + ' ' + cx + ' ' + cy + ')'}>
      <rect x={cx - 12} y={cy - 92} width={24} height={74} rx={6} fill={SUB_INK} />
      <path d={'M ' + (cx - 12) + ' ' + (cy - 18) + ' L ' + (cx + 12) + ' ' + (cy - 18) + ' L ' + cx + ' ' + (cy + 6) + ' Z'} fill={DIM} stroke={SUB_INK} strokeWidth={2} />
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
const midVis = (sN: number, sNext: number): Track =>
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

const MAIN_CY = -40;
const TILE = 384;

// ============================================================
// 画面1 — 序論「砂嵐の中には、何も無い」
// ============================================================
const inTile = sc([
  [8, 0],
  [42, 1],
]);
const introNoise = sc([
  [0, 1],
  [F('intro.resolve'), 1],
  [F('intro.resolve') + 110, 0],
  [TOTAL_FRAMES, 0],
]);
const introPrompt = sc([
  [F('intro.resolve'), 0],
  [F('intro.resolve') + 34, 1],
  [F('intro.nodraw'), 1],
  [F('intro.nodraw') + 40, 0],
]);
const introChisel = sc([
  [F('intro.carve'), 0],
  [F('intro.carve') + 30, 1],
  [F('intro.empty'), 1],
  [F('intro.empty') + 38, 0],
]);
const introX = sc([
  [F('intro.empty') + 10, 0],
  [F('intro.empty') + 44, 1],
  [F('intro.nodraw'), 1],
  [F('intro.nodraw') + 40, 0],
]);
const introNoDraw = sc([
  [F('intro.nodraw'), 0],
  [F('intro.nodraw') + 36, 1],
]);
const introTitle = sc([
  [F('intro.name') + 8, 0],
  [F('intro.name') + 48, 1],
]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(inTile, f);
  const noise = rv(introNoise, f);
  const prompt = rv(introPrompt, f);
  const chisel = rv(introChisel, f);
  const xc = rv(introX, f);
  const nodraw = rv(introNoDraw, f);
  const title = rv(introTitle, f);
  const cx = 60;

  return (
    <g opacity={vis}>
      <PromptChip cx={cx - TILE / 2 - 150} cy={MAIN_CY} opacity={prompt} />
      <Tile cx={cx} cy={MAIN_CY} size={TILE} opacity={inA} noise={noise} seed={1} variant={0} />

      {/* 勘違い：砂の中から彫り出す */}
      <Chisel cx={cx + TILE / 2 - 30} cy={MAIN_CY - TILE / 2 + 40} opacity={chisel} rot={28} />
      {chisel > 0.3 && TXT(cx, MAIN_CY - TILE / 2 - 30, '彫り出す？', SUB_INK, FS_NOTE, 700)}

      {/* 反転：何も隠れていない */}
      <Badge cx={cx + TILE / 2 - 24} cy={MAIN_CY - TILE / 2 + 24} r={40} opacity={xc} ok={false} />
      {xc > 0.4 && TXT(cx, MAIN_CY + TILE / 2 + 44, '中には、何も無い', DANGER, FS_NOTE, 800)}

      {/* 描き方は未習得 */}
      {nodraw > 0.05 && (
        <g opacity={nodraw}>
          <rect x={cx - 168} y={MAIN_CY + TILE / 2 + 76} width={336} height={56} rx={14} fill={SURFACE} stroke={EDGE} strokeWidth={2.5} />
          {TXT(cx - 84, MAIN_CY + TILE / 2 + 104, '描き方', SUB_INK, FS_NOTE, 700)}
          <g stroke={DANGER} strokeWidth={5} strokeLinecap="round">
            <line x1={cx + 56} y1={MAIN_CY + TILE / 2 + 88} x2={cx + 100} y2={MAIN_CY + TILE / 2 + 120} />
            <line x1={cx + 100} y1={MAIN_CY + TILE / 2 + 88} x2={cx + 56} y2={MAIN_CY + TILE / 2 + 120} />
          </g>
          {TXT(cx + 132, MAIN_CY + TILE / 2 + 104, '未習得', DANGER, FS_TINY, 700, 'start')}
        </g>
      )}

      {/* タイトル */}
      <g opacity={title}>
        {TXT(0, 250, '拡散モデル', INDIGO_DARK, FS_TITLE, 800)}
      </g>
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「まず、絵を壊す（答えはこっちが握る）」
// ============================================================
const b1In = sc([
  [sceneStarts.body1 + 8, 0],
  [sceneStarts.body1 + CROSSFADE + 18, 1],
]);
const b1Noise = sc([
  [sceneStarts.body1, 0],
  [F('b1.sprinkle'), 0],
  [F('b1.sprinkle') + 50, 0.22],
  [F('b1.repeat'), 0.22],
  [F('b1.repeat') + 80, 0.62],
  [F('b1.static'), 0.62],
  [F('b1.static') + 70, 1],
  [TOTAL_FRAMES, 1],
]);
const b1Tint = sc([
  [F('b1.sprinkle'), 0],
  [F('b1.sprinkle') + 40, 1],
  [F('b1.free'), 1],
  [F('b1.free') + 30, 0],
]);
const b1Diff = sc([
  [F('b1.static') + 30, 0],
  [F('b1.static') + 70, 1],
  [F('b1.ask'), 1],
  [F('b1.ask') + 40, 0],
]);
const b1Ours = sc([
  [F('b1.ours'), 0],
  [F('b1.ours') + 40, 1],
  [F('b1.ask'), 1],
  [F('b1.ask') + 40, 0],
]);
const b1Box = sc([
  [F('b1.ask'), 0],
  [F('b1.ask') + 40, 1],
  [F('b1.free'), 1],
  [F('b1.free') + 30, 0],
]);
const b1Pred = sc([
  [F('b1.ask') + 30, 0],
  [F('b1.ask') + 80, 1],
]);
const b1NoLabel = sc([
  [F('b1.nolabel'), 0],
  [F('b1.nolabel') + 26, 1],
  [F('b1.nolabel') + 70, 1],
  [F('b1.nolabel') + 100, 0],
]);
const b1Grade = sc([
  [F('b1.grade'), 0],
  [F('b1.grade') + 44, 1],
  [F('b1.free'), 1],
  [F('b1.free') + 30, 0],
]);
const b1Free = sc([
  [F('b1.free'), 0],
  [F('b1.free') + 70, 1],
]);

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1In, f);
  const noise = rv(b1Noise, f);
  const tint = rv(b1Tint, f);
  const diff = rv(b1Diff, f);
  const ours = rv(b1Ours, f);
  const box = rv(b1Box, f);
  const pred = rv(b1Pred, f);
  const nolabel = rv(b1NoLabel, f);
  const grade = rv(b1Grade, f);
  const free = rv(b1Free, f);

  // ask/grade フェーズ：主役タイルを左へ寄せ、推測する箱を右に
  const tileX = lerp(0, -360, clamp(box));
  const tileSize = lerp(TILE, 300, clamp(Math.max(box, free)));
  const boxX = 250;

  return (
    <g opacity={vis}>
      <Tile cx={free > 0.3 ? -540 : tileX} cy={MAIN_CY} size={free > 0.3 ? 150 : tileSize} opacity={inA} noise={noise} seed={2} variant={0} noiseTint={tint} />

      {/* 拡散過程ラベル */}
      {diff > 0.05 && (
        <g opacity={diff}>
          {TXT(0, MAIN_CY + TILE / 2 + 36, '拡散過程 / forward', SUB_INK, FS_LABEL, 800)}
        </g>
      )}

      {/* 撒いたのはこっち＝答えを握る */}
      {ours > 0.05 && (
        <g opacity={ours}>
          <circle cx={tileX - tileSize / 2 - 40} cy={MAIN_CY - 24} r={13} fill={AMBER} />
          {TXT(tileX - tileSize / 2 - 40, MAIN_CY + 18, '答え', AMBER_DARK, FS_NOTE, 800)}
        </g>
      )}

      {/* 問い：足した点はどれ？ → 推測する箱 */}
      <Arrow x1={tileX + tileSize / 2 + 10} y1={MAIN_CY} x2={boxX - 130} y2={MAIN_CY} color={INDIGO} width={6} opacity={box} />
      <GuessBox cx={boxX} cy={MAIN_CY} w={200} h={200} opacity={box} think={pred} />
      {box > 0.3 && pred < 0.5 && TXT(boxX, MAIN_CY - 150, '足した点は？', INDIGO_DARK, FS_NOTE, 800, 'middle') }

      {/* モデルの予測（インディゴの粒）と丸つけ */}
      {pred > 0.05 && (
        <g opacity={pred * (1 - free)}>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return <circle key={i} cx={boxX + 420 + Math.cos(a) * 36} cy={MAIN_CY + Math.sin(a) * 36} r={11} fill={INDIGO} />;
          })}
          <Arrow x1={boxX + 110} y1={MAIN_CY} x2={boxX + 360} y2={MAIN_CY} color={INDIGO} width={6} opacity={pred} />
          {TXT(boxX + 420, MAIN_CY - 92, '予測した点', INDIGO_DARK, FS_TINY, 700)}
        </g>
      )}
      <Badge cx={boxX + 420} cy={MAIN_CY} r={54} opacity={grade} ok />

      {/* 正解ラベルは不要 */}
      {nolabel > 0.05 && (
        <g opacity={nolabel}>
          <rect x={boxX - 80} y={MAIN_CY + 150} width={160} height={56} rx={12} fill={SURFACE} stroke={EDGE} strokeWidth={2.5} />
          {TXT(boxX, MAIN_CY + 178, '「猫」', SUB_INK, FS_NOTE, 700)}
          <g stroke={DANGER} strokeWidth={6} strokeLinecap="round">
            <line x1={boxX - 70} y1={MAIN_CY + 156} x2={boxX + 70} y2={MAIN_CY + 200} />
          </g>
        </g>
      )}

      {/* タダで無限に湧く練習問題と答え */}
      {free > 0.05 && (
        <g opacity={free}>
          {TXT(80, MAIN_CY - 220, '壊すだけで、問いと答えがタダで湧く', SUB_INK, FS_NOTE, 700)}
          {Array.from({ length: 8 }).map((_, i) => {
            const ap = clamp(free * 9 - i - 0.3);
            if (ap <= 0.01) return null;
            const col = i % 4;
            const row = i < 4 ? 0 : 1;
            const px = -250 + (i % 4) * 200;
            const py = MAIN_CY - 60 + row * 180;
            return (
              <g key={i} opacity={ap}>
                <Tile cx={px} cy={py} size={120} opacity={1} noise={0.55 + col * 0.1} seed={10 + i} variant={0} cells={8} noiseTint={1} />
                <Arrow x1={px + 70} y1={py} x2={px + 110} y2={py} color={DIM} width={4} opacity={1} head={10} />
                <Tile cx={px + 150} cy={py} size={80} opacity={1} noise={0} seed={1} variant={0} cells={8} edge={EDGE} />
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2「一発では、戻せない（刻めば解ける）」
// ============================================================
const b2In = sc([
  [sceneStarts.body2 + 8, 0],
  [sceneStarts.body2 + CROSSFADE + 18, 1],
]);
const b2Big = sc([
  [F('b2.guess'), 0],
  [F('b2.guess') + 40, 1],
  [F('b2.step'), 1],
  [F('b2.step') + 34, 0],
]);
const b2Blur = sc([
  [F('b2.blur'), 0],
  [F('b2.blur') + 44, 1],
  [F('b2.step'), 1],
  [F('b2.step') + 34, 0],
]);
const b2Many = sc([
  [F('b2.many'), 0],
  [F('b2.many') + 44, 1],
  [F('b2.step'), 1],
  [F('b2.step') + 34, 0],
]);
const b2Step = sc([
  [F('b2.step'), 0],
  [F('b2.step') + 40, 1],
]);
const b2Fog = sc([
  [F('b2.fog'), 0],
  [F('b2.fog') + 44, 1],
  [F('b2.chain'), 1],
  [F('b2.chain') + 50, 0.35],
  [TOTAL_FRAMES, 0.35],
]);
const b2ChainNoise = sc([
  [F('b2.step'), 1],
  [F('b2.chain'), 0.82],
  [F('b2.chain') + 200, 0.05],
  [TOTAL_FRAMES, 0.05],
]);
const b2Chain = sc([
  [F('b2.chain'), 0],
  [F('b2.chain') + 60, 1],
]);
const b2Name = sc([
  [F('b2.name'), 0],
  [F('b2.name') + 40, 1],
]);
const b2Steps = sc([
  [F('b2.steps'), 0],
  [F('b2.steps') + 40, 1],
]);

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2In, f);
  const big = rv(b2Big, f);
  const blur = rv(b2Blur, f);
  const many = rv(b2Many, f);
  const step = rv(b2Step, f);
  const fog = rv(b2Fog, f);
  const chainNoise = rv(b2ChainNoise, f);
  const chain = rv(b2Chain, f);
  const name = rv(b2Name, f);
  const steps = rv(b2Steps, f);

  const leftX = -440;
  const rightX = 430;
  // 主役タイル：one-shot 期は左の重い砂嵐、step 期は中央でだんだん晴れる
  const tileX = lerp(leftX, -120, clamp(step));
  const tileNoise = step > 0.02 ? chainNoise : 1;

  return (
    <g opacity={vis}>
      {/* 主役の砂嵐タイル */}
      <Tile cx={tileX} cy={MAIN_CY} size={300} opacity={inA} noise={tileNoise} seed={3} variant={0} />

      {/* one-shot：大跳躍 → ぼやけ */}
      {big > 0.02 && (
        <>
          <Arrow x1={leftX + 160} y1={MAIN_CY} x2={rightX - 150} y2={MAIN_CY} color={DANGER} width={9} opacity={big} head={26} />
          {big > 0.4 && TXT((leftX + rightX) / 2, MAIN_CY - 60, '一発で戻す？', DANGER, FS_NOTE, 800)}
        </>
      )}
      {/* 候補が何枚も → 平均 */}
      {many > 0.02 &&
        [0, 1, 2].map((i) => (
          <Tile key={i} cx={rightX - 60 + i * 30} cy={MAIN_CY - 60 + i * 60} size={150} opacity={many * 0.5} noise={0} seed={1} variant={i} cells={8} edge={EDGE} />
        ))}
      {/* ぼやけた塊 */}
      {blur > 0.02 && (
        <g opacity={blur}>
          {[70, 52, 34].map((r, i) => (
            <circle key={i} cx={rightX} cy={MAIN_CY} r={r + 24} fill={IMG[0].fur} opacity={0.22 + i * 0.12} />
          ))}
          <circle cx={rightX} cy={MAIN_CY} r={96} fill="none" stroke={EDGE} strokeWidth={3} strokeDasharray="6 8" />
          {blur > 0.4 && TXT(rightX, MAIN_CY + 132, 'ぼやけた平均', SUB_INK, FS_NOTE, 800)}
        </g>
      )}

      {/* step：小さな一歩の連なり */}
      {chain > 0.02 && (
        <g opacity={chain}>
          {Array.from({ length: 6 }).map((_, i) => {
            const ap = clamp(chain * 7 - i - 0.2);
            if (ap <= 0.01) return null;
            const sx = 120 + i * 110;
            return (
              <g key={i} opacity={ap}>
                <Arrow x1={sx} y1={MAIN_CY} x2={sx + 78} y2={MAIN_CY} color={INDIGO} width={5} opacity={1} head={12} />
              </g>
            );
          })}
        </g>
      )}
      {step > 0.3 && chain < 0.2 && (
        <Arrow x1={tileX + 170} y1={MAIN_CY} x2={tileX + 260} y2={MAIN_CY} color={INDIGO} width={5} opacity={step} head={12} />
      )}
      {step > 0.3 && chain < 0.2 && TXT(tileX + 215, MAIN_CY - 50, 'ほんの一歩', INDIGO_DARK, FS_TINY, 700)}

      {/* 霧 */}
      {fog > 0.02 && (
        <g opacity={fog}>
          <rect x={120} y={MAIN_CY - 150} width={560} height={300} rx={16} fill={DIM} opacity={0.5} />
          <rect x={120 + 200} y={MAIN_CY - 150} width={150} height={300} fill={SURFACE} opacity={0.55} />
          {TXT(400, MAIN_CY + 196, '霧の中、見える一歩だけ進む', SUB_INK, FS_NOTE, 700)}
        </g>
      )}

      {/* 逆拡散ラベル・ステップ数 */}
      {name > 0.05 && TXT(360, MAIN_CY - 150, '逆拡散 / sampling', INDIGO_DARK, FS_LABEL, 800) }
      {steps > 0.05 && (
        <g opacity={steps}>
          {TXT(360, 250, '1000', DIM, FS_BIG, 800, 'end')}
          <Arrow x1={400} y1={250} x2={500} y2={250} color={INK} width={6} opacity={1} head={16} />
          {TXT(620, 250, '数十', INDIGO_DARK, FS_BIG, 800, 'start')}
          {TXT(490, 314, 'ステップ', SUB_INK, FS_NOTE, 700)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3「無から、転がす（コピーではなく生成）」
// ============================================================
const b3In = sc([
  [sceneStarts.body3 + 8, 0],
  [sceneStarts.body3 + CROSSFADE + 18, 1],
]);
const b3Norand = sc([
  [F('b3.norand'), 0],
  [F('b3.norand') + 36, 1],
  [F('b3.scale'), 1],
  [F('b3.scale') + 30, 0],
]);
const b3Slope = sc([
  [F('b3.roll'), 0],
  [F('b3.roll') + 40, 1],
  [F('b3.scale'), 1],
  [F('b3.scale') + 34, 0],
]);
const b3Roll = sc([
  [F('b3.roll'), 0],
  [F('b3.roll') + 30, 0],
  [F('b3.newimg') + 40, 1],
  [F('b3.scale'), 1],
  [F('b3.scale') + 34, 0],
]);
const b3Prompt = sc([
  [F('b3.prompt'), 0],
  [F('b3.prompt') + 34, 1],
  [F('b3.scale'), 1],
  [F('b3.scale') + 30, 0],
]);
const b3Bend = sc([
  [F('b3.bend'), 0],
  [F('b3.bend') + 44, 1],
  [F('b3.scale'), 1],
  [F('b3.scale') + 30, 0],
]);
const b3Memo = sc([
  [F('b3.memo'), 0],
  [F('b3.memo') + 36, 1],
  [F('b3.scale'), 1],
  [F('b3.scale') + 30, 0],
]);
const b3Scale = sc([
  [F('b3.scale'), 0],
  [F('b3.scale') + 50, 1],
  [F('b3.gist'), 1],
  [F('b3.gist') + 40, 0],
]);
const b3Byte = sc([
  [F('b3.byte'), 0],
  [F('b3.byte') + 44, 1],
  [F('b3.gist'), 1],
  [F('b3.gist') + 40, 0],
]);
const b3Gist = sc([
  [F('b3.gist'), 0],
  [F('b3.gist') + 44, 1],
]);
const b3Gen = sc([
  [F('b3.gen'), 0],
  [F('b3.gen') + 50, 1],
]);

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3In, f);
  const norand = rv(b3Norand, f);
  const slope = rv(b3Slope, f);
  const roll = rv(b3Roll, f);
  const prompt = rv(b3Prompt, f);
  const bend = rv(b3Bend, f);
  const memo = rv(b3Memo, f);
  const scale = rv(b3Scale, f);
  const byte = rv(b3Byte, f);
  const gist = rv(b3Gist, f);
  const gen = rv(b3Gen, f);

  // 坂：左上から右下へ。bend で右下端を下げて傾きを強める
  const sx0 = -540;
  const sy0 = MAIN_CY - 150;
  const sx1 = 360;
  const sy1 = MAIN_CY + 150 + bend * 70;
  // タイルは坂に沿って転がり、roll でノイズが晴れる
  const t = clamp(roll);
  const tileX = lerp(sx0 + 90, sx1 - 60, t);
  const tileY = lerp(sy0 - 40, sy1 - 60, t);
  const rollPhase = scale < 0.02;

  return (
    <g opacity={vis}>
      {/* 坂と転がるタイル */}
      {rollPhase && slope > 0.02 && (
        <g opacity={slope}>
          <line x1={sx0} y1={sy0} x2={sx1} y2={sy1} stroke={EDGE} strokeWidth={6} strokeLinecap="round" />
          {TXT(sx1 - 40, sy1 + 40, 'より絵らしいほう', SUB_INK, FS_NOTE, 700, 'end')}
        </g>
      )}
      {rollPhase && (
        <Tile cx={tileX} cy={tileY} size={200} opacity={inA} noise={lerp(1, 0.05, t)} seed={7} variant={1} />
      )}
      {rollPhase && norand > 0.05 && TXT(sx0 + 150, sy0 - 90, '乱数・元は無い', SUB_INK, FS_NOTE, 800)}

      {/* プロンプトが坂を曲げる */}
      {rollPhase && prompt > 0.02 && <PromptChip cx={sx1 - 30} cy={MAIN_CY - 210} opacity={prompt} />}
      {rollPhase && bend > 0.2 && (
        <Arrow x1={sx1 - 30} y1={MAIN_CY - 165} x2={sx1 - 30} y2={sy1 - 40} color={VIOLET} width={5} opacity={clamp(bend * 1.4)} dash="8 9" head={14} />
      )}
      {rollPhase && bend > 0.4 && TXT(sx1 - 40, sy1 + 40, 'より猫らしいほう', VIOLET, FS_NOTE, 800, 'end') }

      {/* 勘違い：保存写真をコピー？ */}
      {rollPhase && memo > 0.05 && (
        <g opacity={memo}>
          <Tile cx={-540} cy={MAIN_CY + 220} size={120} opacity={1} noise={0} seed={1} variant={0} cells={8} edge={EDGE} />
          {TXT(-540, MAIN_CY + 300, 'コピー？', DANGER, FS_NOTE, 800)}
        </g>
      )}

      {/* 50億枚 vs 小さなモデル */}
      {scale > 0.02 && (
        <g opacity={scale}>
          {Array.from({ length: 9 }).map((_, i) => (
            <Tile key={i} cx={-470 + (i % 3) * 16} cy={MAIN_CY - 80 + Math.floor(i / 3) * 16} size={150 - i * 2} opacity={1} noise={0} seed={20 + i} variant={i % 3} cells={7} edge={EDGE} />
          ))}
          {TXT(-440, MAIN_CY + 150, '画像 50億枚', INK, FS_LABEL, 800)}
          <GuessBox cx={300} cy={MAIN_CY - 20} w={150} h={130} opacity={1} think={0} />
          {TXT(300, MAIN_CY + 110, '数 GB', INDIGO_DARK, FS_LABEL, 800)}
          <Arrow x1={-250} y1={MAIN_CY} x2={210} y2={MAIN_CY - 20} color={SUB_INK} width={5} opacity={clamp(scale * 1.4 - 0.4)} head={14} />
        </g>
      )}
      {byte > 0.05 && (
        <g opacity={byte}>
          {TXT(20, MAIN_CY + 230, '1枚あたり 1バイトも残らない', DANGER, FS_LABEL, 800)}
          <Badge cx={300} cy={MAIN_CY - 130} r={40} opacity={byte} ok={false} />
        </g>
      )}

      {/* コツを絞り出す → 生成 */}
      {gist > 0.05 && (
        <g opacity={gist}>
          <GuessBox cx={-260} cy={MAIN_CY} w={170} h={150} opacity={1} think={1} />
          {['猫っぽさ', '毛の流れ'].map((w, i) => {
            const ap = clamp(gist * 2.4 - i - 0.2);
            if (ap <= 0.01) return null;
            return (
              <g key={i} opacity={ap}>
                <rect x={-110} y={MAIN_CY - 70 + i * 80} width={210} height={56} rx={14} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={2.5} />
                {TXT(-5, MAIN_CY - 42 + i * 80, w, INDIGO_DARK, FS_NOTE, 700)}
              </g>
            );
          })}
        </g>
      )}
      {gen > 0.05 && (
        <g opacity={gen}>
          <Arrow x1={150} y1={MAIN_CY} x2={300} y2={MAIN_CY} color={INDIGO} width={6} opacity={gen} head={16} />
          <Tile cx={460} cy={MAIN_CY} size={220} opacity={1} noise={lerp(0.6, 0, gen)} seed={9} variant={1} />
          {TXT(460, MAIN_CY + 150, '生成 ≠ コピー', OKC, FS_LABEL, 800)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — 結論「無から、立ち上げる（大理石の反転）」
// ============================================================
const o5In = sc([
  [sceneStarts.outro + 8, 0],
  [sceneStarts.outro + CROSSFADE + 18, 1],
]);
const oEmpty = sc([
  [F('outro.empty'), 0],
  [F('outro.empty') + 40, 1],
  [F('outro.marble'), 1],
  [F('outro.marble') + 34, 0],
]);
const oPower = sc([
  [F('outro.onepower'), 0],
  [F('outro.onepower') + 44, 1],
  [F('outro.rise'), 1],
  [F('outro.rise') + 40, 0],
]);
const oRise = sc([
  [F('outro.rise'), 0],
  [F('outro.rise') + 60, 1],
  [F('outro.marble'), 1],
  [F('outro.marble') + 34, 0],
]);
const oMarble = sc([
  [F('outro.marble'), 0],
  [F('outro.marble') + 44, 1],
]);
const oStatue = sc([
  [F('outro.marble') + 20, 0],
  [F('outro.marble') + 60, 1],
  [F('outro.invert'), 1],
  [F('outro.invert') + 44, 0],
]);
const oChoose = sc([
  [F('outro.choose'), 0],
  [F('outro.choose') + 50, 1],
]);
const oEnd = sc([
  [F('outro.end'), 0],
  [F('outro.end') + 50, 1],
]);
const oRightNoise = sc([
  [sceneStarts.outro, 0],
  [F('outro.choose'), 0],
  [F('outro.choose') + 80, 0],
  [TOTAL_FRAMES, 0],
]);

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(o5In, f);
  const empty = rv(oEmpty, f);
  const power = rv(oPower, f);
  const rise = rv(oRise, f);
  const marble = rv(oMarble, f);
  const statue = rv(oStatue, f);
  const choose = rv(oChoose, f);
  const end = rv(oEnd, f);

  const leftX = -420;
  const rightX = 420;

  return (
    <g opacity={vis}>
      {/* 右：完成した絵 */}
      <Tile cx={rightX} cy={MAIN_CY} size={300} opacity={inA} noise={0} seed={1} variant={0} />
      {TXT(rightX, MAIN_CY + 188, '絵', INK, FS_NOTE, 800)}

      {/* 左：砂嵐 → 大理石（モーフ）*/}
      {marble < 0.5 ? (
        <Tile cx={leftX} cy={MAIN_CY} size={300} opacity={inA} noise={1} seed={3} variant={0} />
      ) : (
        <g opacity={inA}>
          <rect x={leftX - 150} y={MAIN_CY - 150} width={300} height={300} rx={10} fill={MARBLE} stroke={MARBLE_DARK} strokeWidth={4} />
          <path d={'M ' + (leftX - 110) + ' ' + (MAIN_CY - 90) + ' q 80 40 150 -10'} fill="none" stroke={MARBLE_DARK} strokeWidth={3} opacity={0.6} />
          <path d={'M ' + (leftX - 90) + ' ' + (MAIN_CY + 60) + ' q 100 -30 180 20'} fill="none" stroke={MARBLE_DARK} strokeWidth={3} opacity={0.5} />
          {/* 眠る像の幻 → 反転で消える */}
          <g opacity={statue}>
            <Tile cx={leftX} cy={MAIN_CY} size={210} opacity={0.4} noise={0} seed={1} variant={0} cells={10} edge={MARBLE_DARK} />
          </g>
        </g>
      )}
      {marble > 0.3 && TXT(leftX, MAIN_CY + 188, '大理石', SUB_INK, FS_NOTE, 800)}

      {/* 砂嵐の中は空（何も隠れていない）*/}
      {empty > 0.05 && marble < 0.5 && (
        <g opacity={empty}>
          <Badge cx={leftX} cy={MAIN_CY} r={56} opacity={empty} ok={false} />
          {TXT(leftX, MAIN_CY + 188, '隠れていない', DANGER, FS_NOTE, 800)}
        </g>
      )}

      {/* 反転後：像は眠っていない（幻が消えたあとの空の大理石に✗）*/}
      {marble > 0.5 && statue < 0.4 && f >= F('outro.invert') && (
        <Badge cx={leftX} cy={MAIN_CY} r={50} opacity={clamp(1 - statue * 2.5)} ok={false} />
      )}

      {/* たった一つの力：ちょっとマシにする一歩 */}
      {power > 0.05 && (
        <g opacity={power}>
          <Tile cx={-120} cy={MAIN_CY - 250} size={90} opacity={1} noise={0.7} seed={5} variant={0} cells={7} edge={EDGE} />
          <Arrow x1={-65} y1={MAIN_CY - 250} x2={5} y2={MAIN_CY - 250} color={INDIGO} width={5} opacity={1} head={12} />
          <Tile cx={60} cy={MAIN_CY - 250} size={90} opacity={1} noise={0.5} seed={5} variant={0} cells={7} edge={EDGE} />
          {TXT(220, MAIN_CY - 250, 'ちょっとマシに', INDIGO_DARK, FS_NOTE, 700, 'start')}
        </g>
      )}

      {/* 無から立ち上がる：小さな一歩を何十も */}
      {rise > 0.05 && (
        <g opacity={rise * (1 - marble)}>
          {Array.from({ length: 7 }).map((_, i) => {
            const ap = clamp(rise * 8 - i - 0.2);
            if (ap <= 0.01) return null;
            const px = leftX + 90 + i * 110;
            return <Arrow key={i} x1={px} y1={MAIN_CY} x2={px + 70} y2={MAIN_CY} color={INDIGO} width={4} opacity={ap * 0.7} head={10} />;
          })}
        </g>
      )}

      {/* 削るたびに「より像らしいほう」を選ぶ */}
      {choose > 0.05 && (
        <g opacity={choose}>
          <Chisel cx={leftX + 120} cy={MAIN_CY - 120} opacity={choose} rot={24} />
          {TXT(leftX, MAIN_CY + 240, 'より像らしいほうを選ぶ', VIOLET, FS_NOTE, 800)}
        </g>
      )}

      {/* 締め：完成した絵に ✓（無から立ち上がった）*/}
      {end > 0.1 && <Badge cx={rightX + 128} cy={MAIN_CY - 128} r={42} opacity={clamp(end * 1.4 - 0.4)} ok />}
    </g>
  );
};

// ============================================================
// セクションタイトル（画面跨ぎ・左上）
// ============================================================
const SCENE_TITLES: { start: number; text: string }[] = [
  { start: sceneStarts.intro, text: '序論' },
  { start: sceneStarts.body1, text: '01 まず、絵を壊す' },
  { start: sceneStarts.body2, text: '02 一発では、戻せない' },
  { start: sceneStarts.body3, text: '03 無から、転がす' },
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
        <text x={0} y={378} fill={SPEAKER_COLOR[line.speaker]} fontSize={FS_SPEAKER} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
          {line.speaker}
        </text>
        {rows.map((r, i) => (
          <text key={i} x={0} y={(rows.length === 2 ? 434 : 456) + i * 56} fill={INK} fontSize={FS_SUB} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central">
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
export const ImageGenerationDiffusion: React.FC = () => {
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
          <radialGradient id="dfz_bgglow" cx="50%" cy="36%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#dfz_bgglow)" />

        <SceneIntro f={f} vis={rv(introVis, f)} />
        <SceneBody1 f={f} vis={rv(body1Vis, f)} />
        <SceneBody2 f={f} vis={rv(body2Vis, f)} />
        <SceneBody3 f={f} vis={rv(body3Vis, f)} />
        <SceneOutro f={f} vis={rv(outroVis, f)} />

        <SceneTitle text={SCENE_TITLES[titleIdx].text} opacity={titleOpacity} />
        <Subtitle frame={f} />
      </svg>
    </AbsoluteFill>
  );
};
