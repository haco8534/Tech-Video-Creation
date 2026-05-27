// [4] Remotion 実装 — zip_bomb（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// 背骨は「紙片（軽い指示）と、それを律儀に実行した実体（嵩のある量）の対」。
// 装置はその対を加工する一連の工程として連なる。

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

// ===== アクセント（zip 爆弾の語彙）=====
const PAPER = '#f5e9c4';        // 紙片（軽い指示）
const PAPER_EDGE = '#b89b4f';
const PAPER_INK = '#7a5e1a';
const EXEC = '#d9543c';         // 実行された量・嵩
const EXEC_SOFT = '#f7ddd6';
const EXEC_DARK = '#a83822';
const TOOL = '#2f8fb3';         // 圧縮の道具感（LZ77・コピー指示）
const TOOL_SOFT = '#d9ebf2';
const TOOL_DARK = '#1f6a86';
const DEFENSE = '#3f9d57';      // 防御・打ち切り・OK
const DEFENSE_SOFT = '#dcefe0';
const WARN = '#d99a2b';         // 警告・異常・攻撃の手口
const WARN_SOFT = '#fbeece';
const WARN_DARK = '#a8721a';

const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
const FONT_MONO = '"JetBrains Mono","Consolas","Menlo",monospace';
const SPEAKER_COLOR: Record<Speaker, string> = {
  めたん: '#d6336c',
  ずんだもん: '#2f9e44',
};

// ===== 文字サイズ（固定ベース）=====
const FS_TITLE = 60;
const FS_BIG = 48;
const FS_SUB = 42;
const FS_SPEAKER = 31;
const FS_SCENE = 30;
const FS_LABEL = 33;
const FS_NOTE = 28;
const FS_TINY = 26;

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
const sc = (pairs: [number, number][]): Track<Sc> =>
  pairs.map(([f, v]) => ({ f, state: { v } }));
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

// ============================================================
// 共通：紙片（小さい白い長方形に短い指示が書かれる）
// ============================================================
type PaperProps = {
  cx: number;
  cy: number;
  w: number;
  h: number;
  opacity: number;
  title?: string;
  body?: React.ReactNode;
  bottomLabel?: string;
};
const Paper: React.FC<PaperProps> = ({ cx, cy, w, h, opacity, title, body, bottomLabel }) => {
  if (opacity <= 0.001) return null;
  const ox = cx - w / 2;
  const oy = cy - h / 2;
  return (
    <g opacity={opacity}>
      <rect x={ox + 6} y={oy + 8} width={w} height={h} rx={8} fill={SHADOW} opacity={0.08} />
      <rect x={ox} y={oy} width={w} height={h} rx={8} fill={PAPER} stroke={PAPER_EDGE} strokeWidth={3} />
      {title && (
        <text
          x={cx}
          y={oy + 32}
          fill={PAPER_INK}
          fontSize={FS_TINY}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {title}
        </text>
      )}
      {body}
      {bottomLabel && (
        <text
          x={cx}
          y={cy + h / 2 + 38}
          fill={SUB_INK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {bottomLabel}
        </text>
      )}
    </g>
  );
};

// ============================================================
// 共通：立方体スタック（律儀に実行された結果の量）
// columns × rows の格子状に積み上がる。
// grow（0..1）に応じて表示する個数が増える。
// ============================================================
type StackProps = {
  baseCx: number;
  baseY: number;        // 一番下の段の y
  blockW: number;
  blockH: number;
  cols: number;
  rows: number;
  grow: number;
  opacity: number;
  color?: string;
  faded?: number;       // 上から何段ぶんを「打ち切られた」灰色にするか（割合 0..1）
};
const CubeStack: React.FC<StackProps> = ({
  baseCx,
  baseY,
  blockW,
  blockH,
  cols,
  rows,
  grow,
  opacity,
  color = EXEC,
  faded = 0,
}) => {
  if (opacity <= 0.001) return null;
  const total = cols * rows;
  const shown = clamp(grow) * total;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (idx >= shown) continue;
      const x = baseCx - (cols * blockW) / 2 + c * blockW;
      const y = baseY - (r + 1) * blockH;
      const isFaded = r >= rows * (1 - faded);
      const fill = isFaded ? DIM : color;
      const stroke = isFaded ? SUB_INK : EXEC_DARK;
      cells.push(
        <rect
          key={idx}
          x={x + 2}
          y={y + 2}
          width={blockW - 4}
          height={blockH - 4}
          rx={2}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.6}
          opacity={isFaded ? 0.55 : 1}
        />,
      );
    }
  }
  return <g opacity={opacity}>{cells}</g>;
};

// ============================================================
// 共通：作業の流れ（紙片 → 実行 への矢印）
// ============================================================
const WorkArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  color?: string;
}> = ({ x1, y1, x2, y2, opacity, color = SUB_INK }) => {
  if (opacity <= 0.001) return null;
  const head = 18;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - head * Math.cos(ang);
  const hy = y2 - head * Math.sin(ang);
  const lx = hx - head * 0.7 * Math.sin(ang);
  const ly = hy + head * 0.7 * Math.cos(ang);
  const rx = hx + head * 0.7 * Math.sin(ang);
  const ry = hy - head * 0.7 * Math.cos(ang);
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={4} strokeLinecap="round" />
      <path
        d={`M ${x2} ${y2} L ${lx} ${ly} L ${rx} ${ry} Z`}
        fill={color}
      />
    </g>
  );
};

// ============================================================
// 共通：zip アイコン（小さなフォルダ風）
// ============================================================
const ZipIcon: React.FC<{ cx: number; cy: number; size: number; opacity: number; tint?: string }> = ({
  cx,
  cy,
  size,
  opacity,
  tint = TOOL_SOFT,
}) => {
  if (opacity <= 0.001) return null;
  const w = size;
  const h = size * 0.78;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={4} fill={tint} stroke={TOOL_DARK} strokeWidth={1.6} />
      <line x1={cx} y1={cy - h / 2} x2={cx} y2={cy + h / 2} stroke={TOOL_DARK} strokeWidth={1.4} />
      <rect x={cx - 4} y={cy - h / 2 + 6} width={8} height={6} fill={TOOL_DARK} />
      <rect x={cx - 4} y={cy - h / 2 + 14} width={8} height={6} fill={TOOL_DARK} />
    </g>
  );
};

// ============================================================
// 共通：実行者（顔のないアイコン + RAM/CPU/Disk 3 本バー）
// ============================================================
const Executor: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  ramFill: number;
  cpuFill: number;
  diskFill: number;
  alarm: number;        // 0..1: 自滅で赤に染まる
}> = ({ cx, cy, opacity, ramFill, cpuFill, diskFill, alarm }) => {
  if (opacity <= 0.001) return null;
  const bodyColor = hexLerp(SUB_INK, EXEC, clamp(alarm));
  const bodyFill = hexLerp(SURFACE, EXEC_SOFT, clamp(alarm));
  const headR = 30;
  const bodyW = 110;
  const bodyH = 110;
  const headCy = cy - 78;
  // 3 本縦バー（胴体の中・縦置き）。胴体内部の右側に並べる。
  const bars = [
    { label: 'R', v: ramFill },
    { label: 'C', v: cpuFill },
    { label: 'D', v: diskFill },
  ];
  const barAreaLeft = cx - bodyW / 2 + 12;
  const barAreaTop = cy - bodyH / 2 + 14;
  const barAreaH = bodyH - 28;
  const barW = 22;
  const barGap = 8;
  return (
    <g opacity={opacity}>
      {/* 頭 */}
      <circle cx={cx} cy={headCy} r={headR} fill={bodyFill} stroke={bodyColor} strokeWidth={3} />
      <text
        x={cx}
        y={headCy}
        fill={bodyColor}
        fontSize={FS_TINY}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        自動展開
      </text>
      {/* 胴体 */}
      <rect
        x={cx - bodyW / 2}
        y={cy - bodyH / 2}
        width={bodyW}
        height={bodyH}
        rx={12}
        fill={bodyFill}
        stroke={bodyColor}
        strokeWidth={3}
      />
      {/* 3 本縦バー（胴体内・左から右）*/}
      {bars.map((b, i) => {
        const v = clamp(b.v);
        const fillColor = v > 0.92 ? EXEC : v > 0.6 ? WARN : DEFENSE;
        const x = barAreaLeft + i * (barW + barGap);
        const filledH = barAreaH * v;
        return (
          <g key={b.label}>
            <rect x={x} y={barAreaTop} width={barW} height={barAreaH} rx={3} fill={SURFACE} stroke={EDGE} strokeWidth={1.2} />
            <rect x={x + 2} y={barAreaTop + barAreaH - filledH + 2} width={barW - 4} height={Math.max(0, filledH - 4)} rx={2} fill={fillColor} />
            <text
              x={x + barW / 2}
              y={barAreaTop + barAreaH + 14}
              fill={SUB_INK}
              fontSize={FS_TINY - 4}
              fontFamily={FONT}
              fontWeight={800}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {b.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// ============================================================
// 共通：砂時計（タイムアウト・現実的時間の補助）
// ============================================================
const Hourglass: React.FC<{ cx: number; cy: number; size: number; opacity: number; color?: string }> = ({
  cx,
  cy,
  size,
  opacity,
  color = SUB_INK,
}) => {
  if (opacity <= 0.001) return null;
  const s = size;
  return (
    <g opacity={opacity}>
      <path
        d={`M ${cx - s} ${cy - s} L ${cx + s} ${cy - s} L ${cx + s * 0.18} ${cy} L ${cx + s} ${cy + s} L ${cx - s} ${cy + s} L ${cx - s * 0.18} ${cy} Z`}
        fill={SURFACE}
        stroke={color}
        strokeWidth={3}
      />
      <path
        d={`M ${cx - s * 0.7} ${cy - s * 0.7} L ${cx + s * 0.7} ${cy - s * 0.7} L ${cx} ${cy - s * 0.05} Z`}
        fill={color}
        opacity={0.5}
      />
    </g>
  );
};

// ============================================================
// 共通：圧縮率メーター
// ============================================================
const Meter: React.FC<{ cx: number; cy: number; r: number; needle: number; opacity: number }> = ({
  cx,
  cy,
  r,
  needle,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const ang = Math.PI * (1 + clamp(needle));
  const tx = cx + r * 0.78 * Math.cos(ang);
  const ty = cy + r * 0.78 * Math.sin(ang);
  return (
    <g opacity={opacity}>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill={SURFACE}
        stroke={EDGE}
        strokeWidth={2.5}
      />
      <path
        d={`M ${cx - r * 0.86} ${cy} A ${r * 0.86} ${r * 0.86} 0 0 1 ${cx + r * 0.86} ${cy}`}
        fill="none"
        stroke={DEFENSE}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={`${r * 0.86 * 1.7} ${r * 4}`}
      />
      <line x1={cx} y1={cy} x2={tx} y2={ty} stroke={EXEC} strokeWidth={5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={6} fill={SUB_INK} />
    </g>
  );
};

// ============================================================
// 共通：小カード（3 種の自動展開者、家族カードなど）
// ============================================================
const MiniCard: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  opacity: number;
  title: string;
  tint?: string;
  body?: React.ReactNode;
}> = ({ cx, cy, w, h, opacity, title, tint = SURFACE, body }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2 + 4} y={cy - h / 2 + 6} width={w} height={h} rx={12} fill={SHADOW} opacity={0.08} />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={12} fill={tint} stroke={EDGE} strokeWidth={2} />
      <text
        x={cx}
        y={cy - h / 2 + 30}
        fill={INK}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {title}
      </text>
      {body}
    </g>
  );
};

// ============================================================
// 画面可視性
// ============================================================
const sceneStarts = {
  intro: 0,
  body1: F('scene.body1.in'),
  body2a: F('scene.body2a.in'),
  body2b: F('scene.body2b.in'),
  body3: F('scene.body3.in'),
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
const body1Vis = midVis(sceneStarts.body1, sceneStarts.body2a);
const body2aVis = midVis(sceneStarts.body2a, sceneStarts.body2b);
const body2bVis = midVis(sceneStarts.body2b, sceneStarts.body3);
const body3Vis = midVis(sceneStarts.body3, sceneStarts.outro);
const outroVis = sc([
  [sceneStarts.outro, 0],
  [sceneStarts.outro + CROSSFADE, 1],
  [TOTAL_FRAMES, 1],
]);

// ============================================================
// 画面1 — 序論「紙片と、その実行」
// ============================================================
// アンカー定数（座標は名前付きで集約。derive 以外の直書き禁止）
const INTRO = {
  PAPER: { cx: -500, cy: -10, w: 360, h: 220 },
  STACK: { baseCx: 350, baseY: 200, blockW: 50, blockH: 50, cols: 10, rows: 9 },
  BIG_TITLE: { cx: 0, cy: -440 },
  RATIO_LABEL: { cx: -50, cy: -240 },
  FLOW_ARROW_OFFSET: 16,
};

const introIn = sc([[8, 0], [42, 1]]);
const introPaper = sc([[0, 0], [40, 1]]);
const introStackGrow = sc([
  [F('intro.expand') - 4, 0],
  [F('intro.expand') + 220, 1],
]);
const introPetaLabel = sc([
  [F('intro.expand') + 60, 0],
  [F('intro.expand') + 130, 1],
]);
const introRatio = sc([
  [F('intro.ratio'), 0],
  [F('intro.ratio') + 40, 1],
]);
const introTitle = sc([
  [F('intro.name'), 0],
  [F('intro.name') + 40, 1],
]);
const introNotMagic = sc([
  [F('intro.notMagic'), 0],
  [F('intro.notMagic') + 40, 1],
]);
const introAsymLabels = sc([
  [F('intro.asym'), 0],
  [F('intro.asym') + 40, 1],
]);
const introPaperBodyMode = sc([
  [0, 0],                                   // 空
  [F('intro.paperEx') - 4, 0],
  [F('intro.paperEx') + 40, 1],             // "同じ文字を 1 億回書け"
]);
const introBalance = sc([
  [F('intro.balance'), 0],
  [F('intro.balance') + 40, 1],
]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(introIn, f) * vis;
  const paper = rv(introPaper, f);
  const grow = rv(introStackGrow, f);
  const petaL = rv(introPetaLabel, f);
  const ratio = rv(introRatio, f);
  const title = rv(introTitle, f);
  const notMagic = rv(introNotMagic, f);
  const asym = rv(introAsymLabels, f);
  const paperMode = rv(introPaperBodyMode, f);
  const balance = rv(introBalance, f);

  const paperRight = INTRO.PAPER.cx + INTRO.PAPER.w / 2;
  const stackLeft = INTRO.STACK.baseCx - (INTRO.STACK.cols * INTRO.STACK.blockW) / 2;
  const stackBaseY = INTRO.STACK.baseY;
  const stackTopY = stackBaseY - INTRO.STACK.rows * INTRO.STACK.blockH;
  const arrowY = INTRO.PAPER.cy;

  // ratio ラベルは紙片とスタックを結ぶ線の上
  const ratioCx = (paperRight + stackLeft) / 2;
  const ratioCy = arrowY - 60;

  // 紙片の内容
  const paperBody = (
    <g>
      {paperMode > 0.01 && (
        <text
          x={INTRO.PAPER.cx}
          y={INTRO.PAPER.cy + 10}
          fill={PAPER_INK}
          fontSize={FS_LABEL}
          fontFamily={FONT_MONO}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={paperMode}
        >
          同じ文字を
        </text>
      )}
      {paperMode > 0.01 && (
        <text
          x={INTRO.PAPER.cx}
          y={INTRO.PAPER.cy + 56}
          fill={PAPER_INK}
          fontSize={FS_LABEL}
          fontFamily={FONT_MONO}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={paperMode}
        >
          1 億回書け
        </text>
      )}
    </g>
  );

  return (
    <g opacity={inA}>
      {/* タイトル帯：zip 爆弾 */}
      <g opacity={title}>
        <text
          x={INTRO.BIG_TITLE.cx}
          y={INTRO.BIG_TITLE.cy}
          fill={INK}
          fontSize={FS_TITLE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
        >
          zip 爆弾
        </text>
        <text
          x={INTRO.BIG_TITLE.cx}
          y={INTRO.BIG_TITLE.cy + 56}
          fill={SUB_INK}
          fontSize={FS_SCENE}
          fontFamily={FONT}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
        >
          ── 指示書は軽い、実行は重い
        </text>
      </g>

      {/* 紙片 */}
      <Paper
        cx={INTRO.PAPER.cx}
        cy={INTRO.PAPER.cy}
        w={INTRO.PAPER.w}
        h={INTRO.PAPER.h}
        opacity={paper}
        title="42.zip（指示書）"
        body={paperBody}
        bottomLabel="42 KB"
      />

      {/* 指示書ラベル（紙片の脇）*/}
      {asym > 0.01 && (
        <text
          x={INTRO.PAPER.cx}
          y={INTRO.PAPER.cy - INTRO.PAPER.h / 2 - 32}
          fill={PAPER_INK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={asym}
        >
          指示書
        </text>
      )}

      {/* 作業の流れ */}
      <WorkArrow
        x1={paperRight + INTRO.FLOW_ARROW_OFFSET}
        y1={arrowY}
        x2={stackLeft - INTRO.FLOW_ARROW_OFFSET}
        y2={arrowY}
        opacity={clamp(grow * 4)}
        color={EXEC_DARK}
      />
      {grow > 0.05 && (
        <text
          x={ratioCx}
          y={arrowY + 36}
          fill={SUB_INK}
          fontSize={FS_TINY}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(grow * 4)}
        >
          律儀に実行
        </text>
      )}

      {/* 立方体スタック */}
      <CubeStack
        baseCx={INTRO.STACK.baseCx}
        baseY={stackBaseY}
        blockW={INTRO.STACK.blockW}
        blockH={INTRO.STACK.blockH}
        cols={INTRO.STACK.cols}
        rows={INTRO.STACK.rows}
        grow={grow}
        opacity={clamp(grow * 8)}
      />
      {/* スタックの上端を超える続きの示唆 */}
      {grow > 0.5 && (
        <line
          x1={INTRO.STACK.baseCx - 80}
          y1={stackTopY - 4}
          x2={INTRO.STACK.baseCx + 80}
          y2={stackTopY - 4}
          stroke={EXEC}
          strokeWidth={3}
          strokeDasharray="6 8"
          opacity={clamp(grow * 2 - 0.5)}
        />
      )}

      {/* PB ラベル（スタックの下）*/}
      {petaL > 0.01 && (
        <g opacity={petaL}>
          <text
            x={INTRO.STACK.baseCx}
            y={stackBaseY + 26}
            fill={EXEC_DARK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            4.5 ペタバイト
          </text>
          <text
            x={INTRO.STACK.baseCx}
            y={stackBaseY + 58}
            fill={SUB_INK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ＝ HDD 4 万 5 千台ぶん
          </text>
        </g>
      )}

      {/* 実行ラベル（スタックの脇）*/}
      {asym > 0.01 && (
        <text
          x={INTRO.STACK.baseCx}
          y={stackTopY - 38}
          fill={EXEC_DARK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={asym}
        >
          実行
        </text>
      )}

      {/* 1000 億倍ラベル（中央上、紙片とスタックを結ぶ）*/}
      {ratio > 0.01 && (
        <g opacity={ratio}>
          <rect
            x={ratioCx - 130}
            y={ratioCy - 28}
            width={260}
            height={56}
            rx={28}
            fill={SURFACE}
            stroke={EXEC}
            strokeWidth={3}
            opacity={1 - notMagic * 0.4}
          />
          <text
            x={ratioCx}
            y={ratioCy + 2}
            fill={EXEC_DARK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            1000 億倍
          </text>
          {/* 取り消し線（notMagic 時）*/}
          {notMagic > 0.05 && (
            <line
              x1={ratioCx - 130}
              y1={ratioCy + 2}
              x2={ratioCx + 130}
              y2={ratioCy + 2}
              stroke={SUB_INK}
              strokeWidth={4}
              opacity={notMagic}
            />
          )}
          {notMagic > 0.4 && (
            <text
              x={ratioCx}
              y={ratioCy + 48}
              fill={SUB_INK}
              fontSize={FS_NOTE}
              fontFamily={FONT}
              fontWeight={700}
              textAnchor="middle"
              dominantBaseline="central"
              opacity={clamp(notMagic * 1.6 - 0.4)}
            >
              「圧縮率の魔法」ではない
            </text>
          )}
        </g>
      )}

      {/* 紙片とスタックの差を強調（balance）*/}
      {balance > 0.05 && (
        <g opacity={balance}>
          <text
            x={INTRO.PAPER.cx}
            y={INTRO.PAPER.cy + INTRO.PAPER.h / 2 + 96}
            fill={SUB_INK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ちっちゃい
          </text>
          <text
            x={INTRO.STACK.baseCx}
            y={INTRO.PAPER.cy + INTRO.PAPER.h / 2 + 96}
            fill={EXEC_DARK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            天文学的
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「圧縮の正体——コピー指示と、1 段の天井」
// ============================================================
const B1 = {
  PAPER: { cx: 0, cy: -110, w: 1300, h: 360 },
  COPY_LABEL_Y: -310,
  TEXT_ROW_Y: -110,           // 紙片中央：ABCABC... の表示行
  ANNOT_Y: -10,                // 紙片下：書き換え後の指示
  WINDOW_Y: -210,             // スライド窓は紙片の上に重なる
  COMPARE: { cx: 0, cy: 90, w: 1200, h: 200 },
  CEIL_Y: -300,
  DEFLATE_BADGE: { cx: 580, cy: 170, w: 280, h: 90 },
};

const ABC = 'ABCABCABCABCABC';

const b1In = sc([
  [sceneStarts.body1, 0],
  [sceneStarts.body1 + CROSSFADE, 1],
]);
const b1CopyHeader = sc([
  [F('b1.copy'), 0],
  [F('b1.copy') + 40, 1],
]);
const b1Example = sc([
  [F('b1.example'), 0],
  [F('b1.example') + 60, 1],
]);
const b1Rewrite = sc([
  [F('b1.rewrite'), 0],
  [F('b1.rewrite') + 70, 1],
]);
const b1Lz77 = sc([
  [F('b1.lz77'), 0],
  [F('b1.lz77') + 40, 1],
]);
const b1Deflate = sc([
  [F('b1.deflate'), 0],
  [F('b1.deflate') + 40, 1],
]);
const b1Huff = sc([
  [F('b1.huff'), 0],
  [F('b1.huff') + 40, 1],
]);
const b1Window = sc([
  [F('b1.window'), 0],
  [F('b1.window') + 80, 1],
  [F('b1.compare'), 1],
  [F('b1.compare') + 40, 0],
]);
// 比較ビュー（b1.compare ~ b1.zeros）
const b1Compare = sc([
  [F('b1.compare'), 0],
  [F('b1.compare') + 40, 1],
  [F('b1.zeros'), 1],
  [F('b1.zeros') + 30, 0],
]);
const b1Gap = sc([
  [F('b1.gap'), 0],
  [F('b1.gap') + 50, 1],
]);
// ゼロ羅列フェーズ：b1.zeros 以降
const b1Zeros = sc([
  [F('b1.zeros'), 0],
  [F('b1.zeros') + 60, 1],
]);
const b1Cap258 = sc([
  [F('b1.cap258'), 0],
  [F('b1.cap258') + 40, 1],
]);
const b1Ceiling = sc([
  [F('b1.ceiling'), 0],
  [F('b1.ceiling') + 40, 1],
]);

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1In, f) * vis;
  const copy = rv(b1CopyHeader, f);
  const example = rv(b1Example, f);
  const rewrite = rv(b1Rewrite, f);
  const lz77 = rv(b1Lz77, f);
  const deflate = rv(b1Deflate, f);
  const huff = rv(b1Huff, f);
  const win = rv(b1Window, f);
  const compare = rv(b1Compare, f);
  const gap = rv(b1Gap, f);
  const zeros = rv(b1Zeros, f);
  const cap = rv(b1Cap258, f);
  const ceiling = rv(b1Ceiling, f);

  // 紙片アンカー
  const paperLeft = B1.PAPER.cx - B1.PAPER.w / 2;
  const paperRight = B1.PAPER.cx + B1.PAPER.w / 2;
  const paperTop = B1.PAPER.cy - B1.PAPER.h / 2;

  // ABC 文字列の各文字位置を derive
  const charW = 64;
  const charsTotal = ABC.length;
  const charsShown = Math.floor(example * (charsTotal + 1));
  const rowCx = B1.PAPER.cx;
  const rowY = B1.TEXT_ROW_Y;
  const rowLeft = rowCx - (charsTotal - 1) * charW / 2;

  // コピー矢印は ABC の 4文字目から最後までを覆う円弧
  // ABC[3..14] を後半「指示」に置き換える
  const arcStartX = rowLeft + 3 * charW;
  const arcEndX = rowLeft + (charsTotal - 0.5) * charW;
  const arcMidY = rowY - 70;

  return (
    <g opacity={inA}>
      {/* コピー指示ヘッダ（紙片の上）*/}
      {copy > 0.01 && (
        <text
          x={B1.PAPER.cx}
          y={B1.COPY_LABEL_Y}
          fill={TOOL_DARK}
          fontSize={FS_LABEL}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={copy * (1 - zeros)}
        >
          コピー指示 ── 前に出てきたものを、もう一度書かない
        </text>
      )}
      {/* ゼロ羅列フェーズの新しいヘッダ */}
      {zeros > 0.05 && (
        <text
          x={B1.PAPER.cx}
          y={B1.COPY_LABEL_Y}
          fill={TOOL_DARK}
          fontSize={FS_LABEL}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={zeros}
        >
          ゼロが 10 億バイト並んだファイル
        </text>
      )}

      {/* 主役の紙片 */}
      <Paper
        cx={B1.PAPER.cx}
        cy={B1.PAPER.cy}
        w={B1.PAPER.w}
        h={B1.PAPER.h}
        opacity={1}
      />

      {/* ABC 文字列（zeros 前のみ）*/}
      {example > 0.01 && zeros < 0.95 && (
        <g opacity={(1 - zeros)}>
          {ABC.split('').map((c, i) => {
            if (i >= charsShown) return null;
            const cx = rowLeft + i * charW;
            const inArc = rewrite > 0.4 && i >= 3;
            return (
              <text
                key={i}
                x={cx}
                y={rowY}
                fill={inArc ? hexLerp(PAPER_INK, DIM, rewrite) : PAPER_INK}
                fontSize={FS_BIG}
                fontFamily={FONT_MONO}
                fontWeight={800}
                textAnchor="middle"
                dominantBaseline="central"
                opacity={inArc ? (1 - rewrite * 0.7) : 1}
              >
                {c}
              </text>
            );
          })}
          {/* コピー矢印（円弧）*/}
          {rewrite > 0.05 && (
            <g opacity={rewrite}>
              <path
                d={`M ${arcStartX} ${rowY - 28} Q ${B1.PAPER.cx + 50} ${arcMidY} ${arcEndX} ${rowY - 28}`}
                fill="none"
                stroke={TOOL}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <path
                d={`M ${arcEndX - 14} ${rowY - 30} L ${arcEndX + 2} ${rowY - 26} L ${arcEndX - 4} ${rowY - 12} Z`}
                fill={TOOL}
              />
              {/* 後半の置き換えテキスト */}
              <text
                x={(arcStartX + arcEndX) / 2}
                y={B1.ANNOT_Y}
                fill={TOOL_DARK}
                fontSize={FS_NOTE}
                fontFamily={FONT_MONO}
                fontWeight={800}
                textAnchor="middle"
                dominantBaseline="central"
              >
                ＝「3 文字前にもどって 3 文字をコピー」を 4 回
              </text>
            </g>
          )}
        </g>
      )}

      {/* ゼロ羅列の表示 */}
      {zeros > 0.05 && (
        <g opacity={zeros}>
          <text
            x={B1.PAPER.cx}
            y={rowY}
            fill={PAPER_INK}
            fontSize={FS_BIG}
            fontFamily={FONT_MONO}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            000000…000000 (10億バイト)
          </text>
          <text
            x={B1.PAPER.cx}
            y={B1.ANNOT_Y}
            fill={TOOL_DARK}
            fontSize={FS_NOTE}
            fontFamily={FONT_MONO}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ＝「0 を 1 個書いて、1 バイト前から 258 文字コピー」× 約 400 万回
          </text>
          {/* 258 打ち止め印 */}
          {cap > 0.05 && (
            <g opacity={cap}>
              {[0, 1, 2, 3, 4].map((i) => {
                const tx = B1.PAPER.cx - 460 + i * 230;
                return (
                  <g key={i}>
                    <rect x={tx - 38} y={B1.ANNOT_Y + 56} width={76} height={36} rx={6} fill={WARN_SOFT} stroke={WARN} strokeWidth={2} />
                    <text
                      x={tx}
                      y={B1.ANNOT_Y + 74}
                      fill={WARN_DARK}
                      fontSize={FS_TINY}
                      fontFamily={FONT}
                      fontWeight={800}
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      258 文字
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </g>
      )}

      {/* LZ77 ラベル（紙片の下）*/}
      {lz77 > 0.01 && (
        <g opacity={lz77 * (1 - zeros)}>
          <rect
            x={paperLeft + 20}
            y={B1.PAPER.cy + B1.PAPER.h / 2 + 18}
            width={210}
            height={50}
            rx={25}
            fill={TOOL_SOFT}
            stroke={TOOL}
            strokeWidth={2.5}
          />
          <text
            x={paperLeft + 125}
            y={B1.PAPER.cy + B1.PAPER.h / 2 + 43}
            fill={TOOL_DARK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            LZ77（1977）
          </text>
        </g>
      )}

      {/* DEFLATE 枠（LZ77 を内包）*/}
      {deflate > 0.01 && (
        <g opacity={deflate * (1 - zeros)}>
          <rect
            x={B1.DEFLATE_BADGE.cx - B1.DEFLATE_BADGE.w / 2}
            y={B1.DEFLATE_BADGE.cy - B1.DEFLATE_BADGE.h / 2}
            width={B1.DEFLATE_BADGE.w}
            height={B1.DEFLATE_BADGE.h}
            rx={14}
            fill={TOOL_SOFT}
            stroke={TOOL}
            strokeWidth={3}
          />
          <text
            x={B1.DEFLATE_BADGE.cx}
            y={B1.DEFLATE_BADGE.cy - 18}
            fill={TOOL_DARK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            DEFLATE
          </text>
          <text
            x={B1.DEFLATE_BADGE.cx}
            y={B1.DEFLATE_BADGE.cy + 18}
            fill={SUB_INK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ＝ LZ77 ＋ ハフマン符号
          </text>
        </g>
      )}

      {/* ハフマン符号タイル（DEFLATE 枠の隣）*/}
      {huff > 0.05 && (
        <g opacity={huff * (1 - zeros)}>
          {[
            { label: 'a (出現↑)', bits: '01', x: B1.DEFLATE_BADGE.cx - 80, color: TOOL },
            { label: 'q (出現↓)', bits: '110011', x: B1.DEFLATE_BADGE.cx + 80, color: WARN },
          ].map((b, i) => (
            <g key={i}>
              <rect x={b.x - 70} y={B1.DEFLATE_BADGE.cy + B1.DEFLATE_BADGE.h / 2 + 18} width={140} height={70} rx={8} fill={SURFACE} stroke={b.color} strokeWidth={2} />
              <text x={b.x} y={B1.DEFLATE_BADGE.cy + B1.DEFLATE_BADGE.h / 2 + 38} fill={INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
                {b.label}
              </text>
              <text x={b.x} y={B1.DEFLATE_BADGE.cy + B1.DEFLATE_BADGE.h / 2 + 70} fill={b.color} fontSize={FS_NOTE} fontFamily={FONT_MONO} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                {b.bits}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* スライド窓（紙片の左上を滑る）*/}
      {win > 0.05 && (
        <g opacity={win}>
          <rect
            x={paperLeft + lerp(20, B1.PAPER.w - 220, win)}
            y={B1.WINDOW_Y - 30}
            width={200}
            height={60}
            rx={6}
            fill="none"
            stroke={TOOL}
            strokeWidth={3}
            strokeDasharray="10 8"
          />
          <text
            x={paperLeft + lerp(20, B1.PAPER.w - 220, win) + 100}
            y={B1.WINDOW_Y - 50}
            fill={TOOL_DARK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            スライド窓 32KB
          </text>
        </g>
      )}

      {/* 比較ビュー（b1.compare ~ b1.zeros）*/}
      {compare > 0.05 && (
        <g opacity={compare}>
          <rect
            x={B1.COMPARE.cx - B1.COMPARE.w / 2}
            y={B1.COMPARE.cy - B1.COMPARE.h / 2}
            width={B1.COMPARE.w}
            height={B1.COMPARE.h}
            rx={12}
            fill={SURFACE}
            stroke={EDGE}
            strokeWidth={2}
          />
          <text
            x={B1.COMPARE.cx}
            y={B1.COMPARE.cy - B1.COMPARE.h / 2 + 28}
            fill={SUB_INK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            「同じ文字 100 個」を圧縮：どっちが小さい？
          </text>
          {/* ハフマン棒（上） */}
          <g>
            <text x={B1.COMPARE.cx - B1.COMPARE.w / 2 + 130} y={B1.COMPARE.cy + 10} fill={WARN_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
              ハフマン単独
            </text>
            <rect x={B1.COMPARE.cx - B1.COMPARE.w / 2 + 220} y={B1.COMPARE.cy - 5} width={lerp(160, 160, 1)} height={30} rx={4} fill={WARN} />
            <text x={B1.COMPARE.cx - B1.COMPARE.w / 2 + 410} y={B1.COMPARE.cy + 10} fill={WARN_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
              13 バイト
            </text>
          </g>
          {/* LZ77 棒（下） */}
          <g>
            <text x={B1.COMPARE.cx - B1.COMPARE.w / 2 + 130} y={B1.COMPARE.cy + 56} fill={TOOL_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
              LZ77（参照型）
            </text>
            <rect x={B1.COMPARE.cx - B1.COMPARE.w / 2 + 220} y={B1.COMPARE.cy + 40} width={lerp(40, 16, gap)} height={30} rx={4} fill={TOOL} />
            <text x={B1.COMPARE.cx - B1.COMPARE.w / 2 + 290} y={B1.COMPARE.cy + 56} fill={TOOL_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
              {gap > 0.5 ? '1〜2 バイト' : '数バイト'}
            </text>
          </g>
          {/* gap ラベル */}
          {gap > 0.3 && (
            <text
              x={B1.COMPARE.cx + B1.COMPARE.w / 2 - 110}
              y={B1.COMPARE.cy + 22}
              fill={TOOL_DARK}
              fontSize={FS_LABEL}
              fontFamily={FONT}
              fontWeight={800}
              textAnchor="middle"
              dominantBaseline="central"
              opacity={gap}
            >
              10×以上
            </text>
          )}
        </g>
      )}

      {/* 1 段の天井ライン */}
      {ceiling > 0.05 && (
        <g opacity={ceiling}>
          <line
            x1={paperLeft - 20}
            y1={B1.CEIL_Y}
            x2={paperRight + 20}
            y2={B1.CEIL_Y}
            stroke={EXEC}
            strokeWidth={4}
            strokeDasharray="14 10"
          />
          <text
            x={B1.PAPER.cx}
            y={B1.CEIL_Y - 32}
            fill={EXEC_DARK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            1 段の天井 ≒ 1032×
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2a「一段の壁を、再帰で掛ける」
// ============================================================
const B2A = {
  NAIVE: { cx: -700, cy: -300, w: 460, h: 200 },
  TREE_ROOT: { cx: -100, cy: -340, levels: 5, branch: 4, dx0: 540, dy: 110 },
  // tree dx0: 最上層の左右の広がり。各層で半減させる。branch=4（16の代用、見た目密度のため4）
  STACK: { baseCx: 620, baseY: 240, blockW: 18, blockH: 18, cols: 14, rows: 18 },
  DEPTH_LIMIT_Y: -380,
};

const b2aIn = sc([
  [sceneStarts.body2a, 0],
  [sceneStarts.body2a + CROSSFADE, 1],
]);
const b2aNaive = sc([
  [sceneStarts.body2a, 0],
  [sceneStarts.body2a + 30, 1],
  [F('b2a.naive') + 50, 1],
  [F('b2a.naive') + 100, 0],
]);
const b2aSplit = sc([
  [F('b2a.split'), 0],
  [F('b2a.split') + 50, 1],
]);
const b2aTree1 = sc([
  [F('b2a.tree'), 0],
  [F('b2a.tree') + 50, 1],
]);
const b2aTreeFull = sc([
  [F('b2a.five'), 0],
  [F('b2a.five') + 110, 1],
]);
const b2aMillion = sc([
  [F('b2a.million'), 0],
  [F('b2a.million') + 40, 1],
]);
const b2aLeafStack = sc([
  [F('b2a.leaf'), 0],
  [F('b2a.leaf') + 100, 0.3],
  [F('b2a.peta') + 120, 1],
]);
const b2aShare = sc([
  [F('b2a.share'), 0],
  [F('b2a.share') + 40, 1],
]);
const b2aDepthLimit = sc([
  [F('b2a.depthLimit'), 0],
  [F('b2a.depthLimit') + 50, 1],
]);
const b2aOutdated = sc([
  [F('b2a.outdated'), 0],
  [F('b2a.outdated') + 60, 1],
]);

const SceneBody2a: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2aIn, f) * vis;
  const naive = rv(b2aNaive, f);
  const split = rv(b2aSplit, f);
  const t1 = rv(b2aTree1, f);
  const tF = rv(b2aTreeFull, f);
  const million = rv(b2aMillion, f);
  const leafStack = rv(b2aLeafStack, f);
  const share = rv(b2aShare, f);
  const depthLimit = rv(b2aDepthLimit, f);
  const outdated = rv(b2aOutdated, f);

  // ツリーノードのアンカー
  const root = { cx: B2A.TREE_ROOT.cx, cy: B2A.TREE_ROOT.cy };
  const dy = B2A.TREE_ROOT.dy;
  const branch = B2A.TREE_ROOT.branch;
  const levels = B2A.TREE_ROOT.levels;

  // 各層のノード位置を生成
  type Node = { x: number; y: number; lvl: number; idx: number };
  const nodes: Node[] = [{ x: root.cx, y: root.cy, lvl: 0, idx: 0 }];
  for (let lvl = 1; lvl < levels; lvl++) {
    const total = Math.pow(branch, lvl);
    const layerW = B2A.TREE_ROOT.dx0 * Math.pow(0.65, lvl - 1);
    const stepX = total > 1 ? layerW / (total - 1) : 0;
    const startX = root.cx - layerW / 2;
    for (let i = 0; i < total; i++) {
      nodes.push({ x: startX + i * stepX, y: root.cy + lvl * dy, lvl, idx: i });
    }
  }

  // 各層の表示制御
  const levelAppear = (lvl: number): number => {
    if (lvl === 0) return clamp(t1 + tF);
    if (lvl === 1) return clamp(t1 * 1.3 + tF);
    // lvl 2..4 は tF で順に
    return clamp(tF * (levels - 1) - (lvl - 2));
  };

  // ツリーノードの色：share 時に最下層の 1 ノードだけハイライト、他は薄く
  const leafCount = Math.pow(branch, levels - 1);

  // depth limit 線：tree 内のレベル 3 のあたり
  const depthY = root.cy + 2.5 * dy;

  return (
    <g opacity={inA}>
      {/* 素朴な誤解ミニ比較（左上）*/}
      {naive > 0.01 && (
        <g opacity={naive}>
          <rect
            x={B2A.NAIVE.cx - B2A.NAIVE.w / 2}
            y={B2A.NAIVE.cy - B2A.NAIVE.h / 2}
            width={B2A.NAIVE.w}
            height={B2A.NAIVE.h}
            rx={12}
            fill={SURFACE}
            stroke={EDGE}
            strokeWidth={2}
          />
          <text x={B2A.NAIVE.cx} y={B2A.NAIVE.cy - 70} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            素朴な誤解：「二重圧縮」
          </text>
          {/* 棒 */}
          <rect x={B2A.NAIVE.cx - 200} y={B2A.NAIVE.cy - 18} width={280} height={26} rx={4} fill={EXEC} />
          <text x={B2A.NAIVE.cx + 130} y={B2A.NAIVE.cy - 5} fill={EXEC_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            元
          </text>
          <rect x={B2A.NAIVE.cx - 200} y={B2A.NAIVE.cy + 30} width={272} height={26} rx={4} fill={EXEC_SOFT} stroke={EXEC} strokeWidth={2} />
          <text x={B2A.NAIVE.cx + 130} y={B2A.NAIVE.cy + 43} fill={EXEC_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            二重圧縮 → ほぼ縮まない
          </text>
        </g>
      )}

      {/* 単発型／再帰型 ラベル（split）*/}
      {split > 0.05 && (
        <g opacity={split}>
          <rect x={-260} y={B2A.TREE_ROOT.cy - 90} width={520} height={56} rx={28} fill={WARN_SOFT} stroke={WARN} strokeWidth={3} />
          <text x={0} y={B2A.TREE_ROOT.cy - 62} fill={WARN_DARK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            再帰展開型 ── 16⁵ ≒ 100 万
          </text>
        </g>
      )}

      {/* ツリー */}
      <g opacity={clamp(t1 + tF)}>
        {/* エッジ（親→子）*/}
        {nodes.map((n) => {
          if (n.lvl === 0) return null;
          const parentLayerCount = Math.pow(branch, n.lvl - 1);
          const parentIdx = Math.floor(n.idx / branch);
          const parent = nodes.find((m) => m.lvl === n.lvl - 1 && m.idx === parentIdx);
          if (!parent) return null;
          const op = levelAppear(n.lvl);
          if (op <= 0.02) return null;
          return (
            <line
              key={`e${n.lvl}-${n.idx}`}
              x1={parent.x}
              y1={parent.y + 14}
              x2={n.x}
              y2={n.y - 12}
              stroke={EDGE}
              strokeWidth={1.4}
              opacity={op * 0.7}
            />
          );
        })}
        {/* ノード */}
        {nodes.map((n) => {
          const op = levelAppear(n.lvl);
          if (op <= 0.02) return null;
          const isBottomLevel = n.lvl === levels - 1;
          const size = n.lvl === 0 ? 56 : n.lvl === 1 ? 36 : n.lvl === 2 ? 22 : n.lvl === 3 ? 14 : 8;
          const isReal = isBottomLevel && n.idx === Math.floor(leafCount / 2);
          const tint = share > 0.3 && isBottomLevel && !isReal ? '#e9eef5' : TOOL_SOFT;
          return (
            <ZipIcon key={`n${n.lvl}-${n.idx}`} cx={n.x} cy={n.y} size={size} opacity={op * (share > 0.3 && isBottomLevel && !isReal ? 0.5 : 1)} tint={tint} />
          );
        })}

        {/* 各層のラベル */}
        {[
          { lvl: 0, label: '1' },
          { lvl: 1, label: '16' },
          { lvl: 2, label: '256' },
          { lvl: 3, label: '4 千' },
          { lvl: 4, label: '6 万' },
        ].map((row) => {
          const op = levelAppear(row.lvl);
          if (op <= 0.05) return null;
          return (
            <text
              key={`lab${row.lvl}`}
              x={root.cx - B2A.TREE_ROOT.dx0 * 0.7}
              y={root.cy + row.lvl * dy}
              fill={SUB_INK}
              fontSize={FS_TINY}
              fontFamily={FONT}
              fontWeight={700}
              textAnchor="end"
              dominantBaseline="central"
              opacity={op}
            >
              {row.label} 個
            </text>
          );
        })}
      </g>

      {/* 100 万個ラベル（最下層の脇）*/}
      {million > 0.05 && (
        <g opacity={million}>
          <text
            x={root.cx}
            y={root.cy + (levels - 1) * dy + 56}
            fill={EXEC_DARK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            16⁵ ≒ 100 万 個
          </text>
        </g>
      )}

      {/* 共有実体ラベル */}
      {share > 0.3 && (
        <text
          x={root.cx}
          y={root.cy + (levels - 1) * dy + 96}
          fill={TOOL_DARK}
          fontSize={FS_TINY}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(share * 1.4 - 0.3)}
        >
          実体は 1 個、残りは「同じものへの参照」
        </text>
      )}

      {/* 立方体スタック（右）*/}
      <CubeStack
        baseCx={B2A.STACK.baseCx}
        baseY={B2A.STACK.baseY}
        blockW={B2A.STACK.blockW}
        blockH={B2A.STACK.blockH}
        cols={B2A.STACK.cols}
        rows={B2A.STACK.rows}
        grow={leafStack}
        opacity={clamp(leafStack * 4)}
      />
      {leafStack > 0.3 && (
        <g opacity={clamp(leafStack * 1.6 - 0.3)}>
          <text
            x={B2A.STACK.baseCx}
            y={B2A.STACK.baseY + 38}
            fill={EXEC_DARK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            4 GB × 100 万 ≒ 4.5 PB
          </text>
        </g>
      )}

      {/* 深さ上限線（depthLimit）*/}
      {depthLimit > 0.05 && (
        <g opacity={depthLimit}>
          <line
            x1={root.cx - B2A.TREE_ROOT.dx0 * 0.65}
            y1={depthY}
            x2={root.cx + B2A.TREE_ROOT.dx0 * 0.65}
            y2={depthY}
            stroke={EXEC}
            strokeWidth={4}
            strokeDasharray="14 10"
          />
          <text
            x={root.cx - B2A.TREE_ROOT.dx0 * 0.65 - 20}
            y={depthY}
            fill={EXEC_DARK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="end"
            dominantBaseline="central"
          >
            深さの上限
          </text>
        </g>
      )}

      {/* 古いと落ちる */}
      {outdated > 0.3 && (
        <text
          x={root.cx}
          y={B2A.DEPTH_LIMIT_Y}
          fill={DIM}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(outdated * 1.5 - 0.3)}
        >
          再帰型は対策ずみ
        </text>
      )}
    </g>
  );
};

// ============================================================
// 画面4 — ボディ2b「一段のままで、目次で水増しする」
// ============================================================
const B2B = {
  ZIP_STRIP: { cx: 0, cy: -250, w: 1480, h: 130 },  // zip 構造の帯
  // 帯の中の 3 区画：左＝ローカル、中央＝本体、右＝目次
  LOCAL_W: 240,
  DIR_W: 320,
  // 本体は残り (w - LOCAL_W - DIR_W)
  ARROW_OUT: { cx: 0, cy: 60 },     // 矢印の出口（本体の中央下）
  STACK: { baseCx: 360, baseY: 250, blockW: 22, blockH: 22, cols: 16, rows: 14 },
  DEPTH_TOP: -440,
  TABLE: { cx: -480, cy: 180, w: 540, h: 220 },
};

const b2bIn = sc([
  [sceneStarts.body2b, 0],
  [sceneStarts.body2b + CROSSFADE, 1],
]);
const b2bOneShot = sc([
  [F('b2b.oneShot'), 0],
  [F('b2b.oneShot') + 40, 1],
]);
const b2bFifield = sc([
  [F('b2b.fifield'), 0],
  [F('b2b.fifield') + 40, 1],
]);
const b2bStruct = sc([
  [F('b2b.struct'), 0],
  [F('b2b.struct') + 50, 1],
]);
const b2bArrow1 = sc([
  [F('b2b.trustDir'), 0],
  [F('b2b.trustDir') + 50, 1],
]);
const b2bArrowsMany = sc([
  [F('b2b.samePos'), 0],
  [F('b2b.samePos') + 80, 1],
]);
const b2bSplits = sc([
  [F('b2b.splits'), 0],
  [F('b2b.splits') + 50, 1],
]);
const b2bTera = sc([
  [F('b2b.tera'), 0],
  [F('b2b.tera') + 100, 1],
]);
const b2bBypass = sc([
  [F('b2b.bypass'), 0],
  [F('b2b.bypass') + 50, 1],
]);
const b2bTools = sc([
  [F('b2b.tools'), 0],
  [F('b2b.tools') + 60, 1],
]);

const SceneBody2b: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2bIn, f) * vis;
  const oneShot = rv(b2bOneShot, f);
  const fifield = rv(b2bFifield, f);
  const struct = rv(b2bStruct, f);
  const arr1 = rv(b2bArrow1, f);
  const arrMany = rv(b2bArrowsMany, f);
  const splits = rv(b2bSplits, f);
  const tera = rv(b2bTera, f);
  const bypass = rv(b2bBypass, f);
  const tools = rv(b2bTools, f);

  const strip = B2B.ZIP_STRIP;
  const stripLeft = strip.cx - strip.w / 2;
  const stripRight = strip.cx + strip.w / 2;
  const stripTop = strip.cy - strip.h / 2;
  const stripBottom = strip.cy + strip.h / 2;
  const localRight = stripLeft + B2B.LOCAL_W;
  const dirLeft = stripRight - B2B.DIR_W;
  const bodyCx = (localRight + dirLeft) / 2;
  const bodyW = dirLeft - localRight;
  // 本体の中の同じ位置（矢印が指す）
  const targetX = bodyCx;
  const targetY = stripBottom + 2;

  // 矢印の本数（arrMany に応じて増える）
  const totalArrows = 26;
  const arrowsShown = Math.floor(clamp(arr1 + arrMany * (totalArrows - 1)) * totalArrows);

  return (
    <g opacity={inA}>
      {/* 単発型ラベル（上）*/}
      <g opacity={inA}>
        <rect x={-220} y={-460} width={440} height={56} rx={28} fill={WARN_SOFT} stroke={WARN} strokeWidth={3} />
        <text x={0} y={-432} fill={WARN_DARK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
          単発型（深さ ＝ 1）
        </text>
      </g>

      {/* 深さ上限線（はるか上にある）*/}
      {bypass > 0.05 && (
        <g opacity={bypass}>
          <line
            x1={stripLeft}
            y1={B2B.DEPTH_TOP - 10}
            x2={stripRight}
            y2={B2B.DEPTH_TOP - 10}
            stroke={DIM}
            strokeWidth={3}
            strokeDasharray="14 10"
          />
          <text
            x={stripRight + 6}
            y={B2B.DEPTH_TOP - 10}
            fill={DIM}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="end"
            dominantBaseline="central"
          >
            深さ上限線（届かない）
          </text>
        </g>
      )}

      {/* Fifield ラベル */}
      {fifield > 0.05 && (
        <text x={stripRight - 30} y={stripTop - 20} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="end" dominantBaseline="central" opacity={fifield}>
          Fifield, 2019
        </text>
      )}
      {oneShot > 0.05 && (
        <text x={stripLeft + 20} y={stripTop - 20} fill={WARN_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="start" dominantBaseline="central" opacity={oneShot}>
          1 回展開で巨大化
        </text>
      )}

      {/* zip 構造の帯 */}
      <g>
        {/* ローカルヘッダ */}
        <rect x={stripLeft} y={stripTop} width={B2B.LOCAL_W} height={strip.h} fill={SURFACE_SOFT} stroke={EDGE} strokeWidth={2.5} />
        <text x={stripLeft + B2B.LOCAL_W / 2} y={strip.cy} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={struct}>
          ローカル
        </text>
        {/* 本体（圧縮データ）*/}
        <rect x={localRight} y={stripTop} width={bodyW} height={strip.h} fill={PAPER} stroke={PAPER_EDGE} strokeWidth={2.5} />
        <text x={bodyCx} y={strip.cy - 22} fill={PAPER_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central" opacity={struct}>
          本体（圧縮データ）
        </text>
        <text x={bodyCx} y={strip.cy + 18} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central" opacity={struct}>
          10 MB
        </text>
        {/* 目次 */}
        <rect x={dirLeft} y={stripTop} width={B2B.DIR_W} height={strip.h} fill={WARN_SOFT} stroke={WARN} strokeWidth={2.5} />
        <text x={dirLeft + B2B.DIR_W / 2} y={strip.cy - 22} fill={WARN_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central" opacity={struct}>
          目次（巻末）
        </text>
        <text x={dirLeft + B2B.DIR_W / 2} y={strip.cy + 18} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central" opacity={struct}>
          ファイル A, B, C, …
        </text>
        {/* 特殊な切れ目（本体の中の縦線）*/}
        {splits > 0.05 &&
          [0.2, 0.4, 0.6, 0.8].map((p, i) => {
            const x = localRight + bodyW * p;
            return (
              <line
                key={i}
                x1={x}
                y1={stripTop + 8}
                x2={x}
                y2={stripBottom - 8}
                stroke={WARN_DARK}
                strokeWidth={2}
                strokeDasharray="3 4"
                opacity={splits}
              />
            );
          })}
      </g>

      {/* 目次の矢印（複数、すべて同じ位置を指す）*/}
      {arrowsShown > 0 && (
        <g>
          {Array.from({ length: arrowsShown }).map((_, i) => {
            // 矢印の起点：目次の中、少しずつ y がずれる
            const startX = dirLeft + 30 + (i % 4) * 24;
            const startY = stripTop + 26 + (i / 4) * 6;
            // 終点：splits で入口を少しずらす
            const endXJitter = splits > 0.05 ? (i % 5 - 2) * (bodyW * 0.06) * splits : 0;
            const endX = targetX + endXJitter;
            const endY = stripBottom - 10;
            const op = clamp(arr1 + arrMany * 2 - (i / totalArrows) * 1.5);
            return (
              <line
                key={i}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={WARN}
                strokeWidth={1.4}
                opacity={op * 0.6}
              />
            );
          })}
        </g>
      )}

      {/* 立方体スタック（矢印の出口から）*/}
      {tera > 0.05 && (
        <g opacity={tera}>
          <WorkArrow
            x1={targetX + 60}
            y1={stripBottom + 14}
            x2={B2B.STACK.baseCx}
            y2={B2B.STACK.baseY - B2B.STACK.rows * B2B.STACK.blockH - 12}
            opacity={clamp(tera * 2)}
            color={EXEC_DARK}
          />
          <CubeStack
            baseCx={B2B.STACK.baseCx}
            baseY={B2B.STACK.baseY}
            blockW={B2B.STACK.blockW}
            blockH={B2B.STACK.blockH}
            cols={B2B.STACK.cols}
            rows={B2B.STACK.rows}
            grow={tera}
            opacity={1}
          />
          <text
            x={B2B.STACK.baseCx}
            y={B2B.STACK.baseY + 38}
            fill={EXEC_DARK}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            10 MB → 281 TB
          </text>
        </g>
      )}

      {/* ツール堅さの小表 */}
      {tools > 0.05 && (
        <g opacity={tools}>
          <rect
            x={B2B.TABLE.cx - B2B.TABLE.w / 2}
            y={B2B.TABLE.cy - B2B.TABLE.h / 2}
            width={B2B.TABLE.w}
            height={B2B.TABLE.h}
            rx={10}
            fill={SURFACE}
            stroke={EDGE}
            strokeWidth={2}
          />
          <text x={B2B.TABLE.cx} y={B2B.TABLE.cy - B2B.TABLE.h / 2 + 26} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            ツールごとの堅さ
          </text>
          {[
            { name: 'ツール A', reaction: 'エラー検出', color: DEFENSE, soft: DEFENSE_SOFT },
            { name: 'ツール B', reaction: '律儀に 281 TB 展開', color: EXEC, soft: EXEC_SOFT },
            { name: 'ツール C', reaction: '途中で停止', color: WARN, soft: WARN_SOFT },
          ].map((r, i) => {
            const y = B2B.TABLE.cy - B2B.TABLE.h / 2 + 60 + i * 50;
            return (
              <g key={i}>
                <text x={B2B.TABLE.cx - B2B.TABLE.w / 2 + 20} y={y} fill={INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="start" dominantBaseline="central">
                  {r.name}
                </text>
                <rect x={B2B.TABLE.cx - 70} y={y - 16} width={300} height={32} rx={6} fill={r.soft} stroke={r.color} strokeWidth={2} />
                <text x={B2B.TABLE.cx + 80} y={y} fill={r.color} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                  {r.reaction}
                </text>
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — ボディ3「律儀さが、引き金になる」
// ============================================================
const B3 = {
  PAPER: { cx: -740, cy: -30, w: 240, h: 200 },
  EXECUTOR: { cx: -260, cy: -50 },        // 実行者の中心
  STACK: { baseCx: -50, baseY: 80, blockW: 14, blockH: 14, cols: 18, rows: 14 },
  CARDS: { cy: -360, w: 280, h: 100, gap: 320 },  // 3 種カード横並び（上）
  DEFENSE_PANEL: { cx: 590, cy: -10, w: 580, h: 480 },
  DEFENSE_TITLE_Y: -210,
};

const b3In = sc([
  [sceneStarts.body3, 0],
  [sceneStarts.body3 + CROSSFADE, 1],
]);
const b3PaperShow = sc([[sceneStarts.body3, 0], [sceneStarts.body3 + 30, 1]]);
const b3ExecShow = sc([[sceneStarts.body3, 0], [sceneStarts.body3 + 30, 1]]);
const b3HumanOk = sc([
  [F('b3.humanOk'), 0],
  [F('b3.humanOk') + 40, 1],
  [F('b3.auto'), 1],
  [F('b3.auto') + 40, 0],
]);
const b3Auto = sc([
  [F('b3.auto'), 0],
  [F('b3.auto') + 40, 1],
]);
const b3Ram = sc([
  [F('b3.ram'), 0.05],
  [F('b3.ram') + 80, 1],
]);
const b3Cpu = sc([
  [F('b3.cpu'), 0.05],
  [F('b3.cpu') + 80, 1],
]);
const b3Disk = sc([
  [F('b3.cpu') + 60, 0.05],
  [F('b3.cpu') + 160, 1],
]);
const b3StackGrow = sc([
  [F('b3.auto') - 10, 0],
  [F('b3.auto') + 300, 1],
]);
const b3Av = sc([
  [F('b3.av'), 0],
  [F('b3.av') + 50, 1],
]);
const b3Mail = sc([
  [F('b3.mail'), 0],
  [F('b3.mail') + 50, 1],
]);
const b3Web = sc([
  [F('b3.web'), 0],
  [F('b3.web') + 50, 1],
]);
const b3Ironic = sc([
  [F('b3.ironic'), 0],
  [F('b3.ironic') + 60, 1],
]);
const b3Lazy = sc([
  [F('b3.lazy'), 0],
  [F('b3.lazy') + 60, 1],
  [F('b3.limitSize'), 1],
  [F('b3.limitSize') + 30, 0],
]);
const b3LimitSize = sc([
  [F('b3.limitSize'), 0],
  [F('b3.limitSize') + 50, 1],
]);
const b3LimitTime = sc([
  [F('b3.limitTime'), 0],
  [F('b3.limitTime') + 50, 1],
]);
const b3Ratio = sc([
  [F('b3.ratioGuard'), 0],
  [F('b3.ratioGuard') + 50, 1],
]);
const b3Stream = sc([
  [F('b3.stream'), 0],
  [F('b3.stream') + 60, 1],
]);

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3In, f) * vis;
  const paperOp = rv(b3PaperShow, f);
  const execOp = rv(b3ExecShow, f);
  const humanOk = rv(b3HumanOk, f);
  const auto = rv(b3Auto, f);
  const ram = rv(b3Ram, f);
  const cpu = rv(b3Cpu, f);
  const disk = rv(b3Disk, f);
  const grow = rv(b3StackGrow, f);
  const av = rv(b3Av, f);
  const mail = rv(b3Mail, f);
  const web = rv(b3Web, f);
  const ironic = rv(b3Ironic, f);
  const lazy = rv(b3Lazy, f);
  const lSize = rv(b3LimitSize, f);
  const lTime = rv(b3LimitTime, f);
  const ratioG = rv(b3Ratio, f);
  const stream = rv(b3Stream, f);

  const alarm = clamp(Math.max(ram, cpu, disk) * 2 - 0.8) * (1 - stream);
  const stackTopY = B3.STACK.baseY - B3.STACK.rows * B3.STACK.blockH;
  // 打ち切り線の y 位置
  const limitLineY = B3.STACK.baseY - B3.STACK.rows * B3.STACK.blockH * 0.6;
  const fadedFrac = lSize > 0.3 ? 0.4 : 0;

  return (
    <g opacity={inA}>
      {/* 紙片（小）*/}
      <Paper
        cx={B3.PAPER.cx}
        cy={B3.PAPER.cy}
        w={B3.PAPER.w}
        h={B3.PAPER.h}
        opacity={paperOp}
        title="zip 爆弾（指示）"
        bottomLabel="42 KB"
        body={
          <text
            x={B3.PAPER.cx}
            y={B3.PAPER.cy + 10}
            fill={PAPER_INK}
            fontSize={FS_TINY}
            fontFamily={FONT_MONO}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            膨らめ
          </text>
        }
      />

      {/* 紙片 → 実行者の作業の流れ */}
      <WorkArrow
        x1={B3.PAPER.cx + B3.PAPER.w / 2 + 12}
        y1={B3.PAPER.cy}
        x2={B3.EXECUTOR.cx - 80}
        y2={B3.EXECUTOR.cy}
        opacity={execOp * (1 - stream)}
        color={SUB_INK}
      />

      {/* 人間アイコン（humanOk のとき横に出る）*/}
      {humanOk > 0.05 && (
        <g opacity={humanOk}>
          <circle cx={B3.PAPER.cx} cy={B3.PAPER.cy - 200} r={24} fill={SURFACE} stroke={DEFENSE} strokeWidth={3} />
          <path
            d={`M ${B3.PAPER.cx - 20} ${B3.PAPER.cy - 140} Q ${B3.PAPER.cx} ${B3.PAPER.cy - 180} ${B3.PAPER.cx + 20} ${B3.PAPER.cy - 140}`}
            fill={SURFACE}
            stroke={DEFENSE}
            strokeWidth={3}
          />
          <text x={B3.PAPER.cx} y={B3.PAPER.cy - 250} fill={DEFENSE} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            人間：気づいて止める
          </text>
        </g>
      )}

      {/* 実行者 */}
      <Executor
        cx={B3.EXECUTOR.cx}
        cy={B3.EXECUTOR.cy}
        opacity={execOp}
        ramFill={ram}
        cpuFill={cpu}
        diskFill={disk}
        alarm={alarm}
      />

      {/* 立方体スタック（実行者の前で積む）*/}
      <CubeStack
        baseCx={B3.STACK.baseCx}
        baseY={B3.STACK.baseY}
        blockW={B3.STACK.blockW}
        blockH={B3.STACK.blockH}
        cols={B3.STACK.cols}
        rows={B3.STACK.rows}
        grow={grow}
        opacity={clamp(grow * 4) * (1 - stream * 0.5)}
        faded={fadedFrac}
      />

      {/* 3 種カード（実行者の上）*/}
      {(av > 0.05 || mail > 0.05 || web > 0.05) && (
        <g>
          {[
            { op: av, title: 'アンチウイルス', sub: '中身を律儀に検査' },
            { op: mail, title: 'メールゲートウェイ', sub: '添付を自動展開' },
            { op: web, title: 'ウェブサービス', sub: 'アップロード後に検査' },
          ].map((c, i) => {
            const cx = B3.EXECUTOR.cx + (i - 1) * B3.CARDS.gap;
            const tint = ironic > 0.3 ? hexLerp(SURFACE, WARN_SOFT, clamp(ironic * 1.5 - 0.3)) : SURFACE;
            return (
              <MiniCard
                key={i}
                cx={cx}
                cy={B3.CARDS.cy}
                w={B3.CARDS.w}
                h={B3.CARDS.h}
                opacity={c.op}
                title={c.title}
                tint={tint}
                body={
                  <text
                    x={cx}
                    y={B3.CARDS.cy + 24}
                    fill={SUB_INK}
                    fontSize={FS_TINY}
                    fontFamily={FONT}
                    fontWeight={600}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {c.sub}
                  </text>
                }
              />
            );
          })}
        </g>
      )}

      {/* マルウェアすり抜けのミニカット（lazy）*/}
      {lazy > 0.05 && (
        <g opacity={lazy}>
          <rect x={B3.EXECUTOR.cx - 220} y={B3.CARDS.cy + 100} width={440} height={56} rx={28} fill={SURFACE} stroke={SUB_INK} strokeWidth={2} />
          <text x={B3.EXECUTOR.cx} y={B3.CARDS.cy + 128} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            「中を見ない」設定 → マルウェアも通る
          </text>
        </g>
      )}

      {/* 防御パネル（右）*/}
      {(lSize > 0.05 || lTime > 0.05 || ratioG > 0.05 || stream > 0.05) && (
        <g>
          <rect
            x={B3.DEFENSE_PANEL.cx - B3.DEFENSE_PANEL.w / 2}
            y={B3.DEFENSE_PANEL.cy - B3.DEFENSE_PANEL.h / 2}
            width={B3.DEFENSE_PANEL.w}
            height={B3.DEFENSE_PANEL.h}
            rx={16}
            fill={DEFENSE_SOFT}
            stroke={DEFENSE}
            strokeWidth={2}
            opacity={clamp(Math.max(lSize, lTime, ratioG, stream) * 1.5)}
          />
          <text x={B3.DEFENSE_PANEL.cx} y={B3.DEFENSE_TITLE_Y} fill={DEFENSE} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central" opacity={clamp(Math.max(lSize, lTime, ratioG, stream) * 1.5)}>
            最後までやらない（4 つの打ち切り）
          </text>

          {/* 4 つの装置を 2×2 グリッドに配置 */}
          {(() => {
            const cx0 = B3.DEFENSE_PANEL.cx - 130;
            const cx1 = B3.DEFENSE_PANEL.cx + 130;
            const cy0 = B3.DEFENSE_PANEL.cy - 80;
            const cy1 = B3.DEFENSE_PANEL.cy + 110;
            return (
              <>
                {/* 上左：最大サイズ */}
                {lSize > 0.05 && (
                  <g opacity={lSize}>
                    <rect x={cx0 - 100} y={cy0 - 70} width={200} height={140} rx={10} fill={SURFACE} stroke={DEFENSE} strokeWidth={2} />
                    {/* スタックを模した小さな塔と打ち切り線 */}
                    <rect x={cx0 - 30} y={cy0 - 10} width={60} height={66} fill={EXEC_SOFT} stroke={EXEC} strokeWidth={1.5} />
                    <rect x={cx0 - 30} y={cy0 - 56} width={60} height={40} fill={DIM} opacity={0.4} />
                    <line x1={cx0 - 56} y1={cy0 - 16} x2={cx0 + 56} y2={cy0 - 16} stroke={EXEC} strokeWidth={3} strokeDasharray="6 6" />
                    <text x={cx0} y={cy0 - 92} fill={DEFENSE} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                      最大サイズ
                    </text>
                  </g>
                )}
                {/* 上右：タイムアウト */}
                {lTime > 0.05 && (
                  <g opacity={lTime}>
                    <rect x={cx1 - 100} y={cy0 - 70} width={200} height={140} rx={10} fill={SURFACE} stroke={DEFENSE} strokeWidth={2} />
                    <Hourglass cx={cx1} cy={cy0 + 10} size={32} opacity={1} color={DEFENSE} />
                    <text x={cx1} y={cy0 - 92} fill={DEFENSE} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                      30 秒で停止
                    </text>
                  </g>
                )}
                {/* 下左：圧縮率メーター */}
                {ratioG > 0.05 && (
                  <g opacity={ratioG}>
                    <rect x={cx0 - 100} y={cy1 - 70} width={200} height={140} rx={10} fill={SURFACE} stroke={DEFENSE} strokeWidth={2} />
                    <Meter cx={cx0} cy={cy1 + 12} r={56} needle={0.92} opacity={1} />
                    <text x={cx0} y={cy1 - 92} fill={DEFENSE} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                      圧縮率 1000× で隔離
                    </text>
                  </g>
                )}
                {/* 下右：ストリーミング */}
                {stream > 0.05 && (
                  <g opacity={stream}>
                    <rect x={cx1 - 100} y={cy1 - 70} width={200} height={140} rx={10} fill={SURFACE} stroke={DEFENSE} strokeWidth={2} />
                    <line x1={cx1 - 86} y1={cy1 + 10} x2={cx1 + 86} y2={cy1 + 10} stroke={DEFENSE} strokeWidth={5} strokeLinecap="round" />
                    {[0, 1, 2, 3].map((i) => (
                      <rect key={i} x={cx1 - 70 + i * 40} y={cy1 - 4} width={20} height={26} rx={3} fill={EXEC} opacity={1 - i * 0.18} />
                    ))}
                    <text x={cx1} y={cy1 - 92} fill={DEFENSE} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                      展開と検査を同時に
                    </text>
                  </g>
                )}
              </>
            );
          })()}
        </g>
      )}

      {/* 打ち切り線（スタックを横切る、lSize 時のみ）*/}
      {lSize > 0.05 && (
        <g opacity={lSize}>
          <line
            x1={B3.STACK.baseCx - 140}
            y1={limitLineY}
            x2={B3.STACK.baseCx + 140}
            y2={limitLineY}
            stroke={EXEC}
            strokeWidth={4}
            strokeDasharray="14 10"
          />
          <text
            x={B3.STACK.baseCx}
            y={limitLineY - 22}
            fill={EXEC_DARK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            100 MB で打ち切り
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面6 — 結論「同じ家族の攻撃」
// ============================================================
const OUTRO = {
  RECAP_PAPER: { cx: -360, cy: -340, w: 240, h: 150 },
  RECAP_STACK: { baseCx: 280, baseY: -250, blockW: 26, blockH: 26, cols: 8, rows: 10 },
  CARDS: { cy: 30, w: 510, h: 280, gap: 540 },     // 3 つの家族カード
  COMMON_DEF: { cy: 250 },
  FINAL_Y: 230,
};

const oIn = sc([
  [sceneStarts.outro, 0],
  [sceneStarts.outro + CROSSFADE, 1],
]);
const oRecapGrow = sc([
  [F('scene.outro.in'), 0],
  [F('outro.recap') + 80, 1],
]);
const oRecapLabel = sc([
  [F('outro.recap'), 0],
  [F('outro.recap') + 40, 1],
]);
const oKindWeapon = sc([
  [F('outro.kindWeapon'), 0],
  [F('outro.kindWeapon') + 60, 1],
]);
const oFamily = sc([
  [F('outro.family'), 0],
  [F('outro.family') + 50, 1],
]);
const oBil = sc([
  [F('outro.bil'), 0],
  [F('outro.bil') + 50, 1],
]);
const oBilNest = sc([
  [F('outro.bilNest'), 0],
  [F('outro.bilNest') + 50, 1],
]);
const oRedos = sc([
  [F('outro.redos'), 0],
  [F('outro.redos') + 50, 1],
]);
const oCommon = sc([
  [F('outro.commonDef'), 0],
  [F('outro.commonDef') + 60, 1],
]);
const oFinal = sc([
  [F('outro.final'), 0],
  [F('outro.final') + 60, 1],
]);
// 最終フェードアウト
const oFadeRest = sc([
  [F('outro.final') + 20, 1],
  [F('outro.final') + 80, 0.2],
]);

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(oIn, f) * vis;
  const recapGrow = rv(oRecapGrow, f);
  const recapLabel = rv(oRecapLabel, f);
  const kindWeapon = rv(oKindWeapon, f);
  const family = rv(oFamily, f);
  const bil = rv(oBil, f);
  const bilNest = rv(oBilNest, f);
  const redos = rv(oRedos, f);
  const common = rv(oCommon, f);
  const final = rv(oFinal, f);
  const fadeRest = rv(oFadeRest, f);

  const stackColor = kindWeapon > 0.3 ? hexLerp(EXEC, WARN, clamp(kindWeapon * 1.5 - 0.3)) : EXEC;

  return (
    <g opacity={inA}>
      {/* 上：序論の対の縮図 */}
      <g opacity={fadeRest}>
        <Paper
          cx={OUTRO.RECAP_PAPER.cx}
          cy={OUTRO.RECAP_PAPER.cy}
          w={OUTRO.RECAP_PAPER.w}
          h={OUTRO.RECAP_PAPER.h}
          opacity={1}
          title="42.zip"
          bottomLabel="42 KB"
        />
        <WorkArrow
          x1={OUTRO.RECAP_PAPER.cx + OUTRO.RECAP_PAPER.w / 2 + 12}
          y1={OUTRO.RECAP_PAPER.cy}
          x2={OUTRO.RECAP_STACK.baseCx - 80}
          y2={OUTRO.RECAP_STACK.baseY - OUTRO.RECAP_STACK.rows * OUTRO.RECAP_STACK.blockH / 2}
          opacity={1}
          color={EXEC_DARK}
        />
        <CubeStack
          baseCx={OUTRO.RECAP_STACK.baseCx}
          baseY={OUTRO.RECAP_STACK.baseY}
          blockW={OUTRO.RECAP_STACK.blockW}
          blockH={OUTRO.RECAP_STACK.blockH}
          cols={OUTRO.RECAP_STACK.cols}
          rows={OUTRO.RECAP_STACK.rows}
          grow={recapGrow}
          opacity={1}
          color={stackColor}
        />
        <text x={OUTRO.RECAP_STACK.baseCx} y={OUTRO.RECAP_STACK.baseY + 26} fill={EXEC_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
          4.5 PB
        </text>

        {/* recap ラベル */}
        {recapLabel > 0.05 && (
          <text
            x={(OUTRO.RECAP_PAPER.cx + OUTRO.RECAP_STACK.baseCx) / 2}
            y={OUTRO.RECAP_PAPER.cy - 110}
            fill={SUB_INK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
            opacity={recapLabel}
          >
            指示書 vs 実行 ── 非対称を最大化
          </text>
        )}
      </g>

      {/* 3 つの家族カード */}
      {family > 0.05 && (
        <g opacity={family * fadeRest}>
          {[
            { offset: -1, title: 'zip 爆弾', sub: 'ファイル圧縮', show: family },
            { offset: 0, title: 'Billion Laughs', sub: 'XML エンティティ展開', show: bil },
            { offset: 1, title: 'ReDoS', sub: '正規表現の暴走', show: redos },
          ].map((c, i) => {
            const cx = c.offset * OUTRO.CARDS.gap;
            return (
              <g key={i} opacity={c.show}>
                <MiniCard
                  cx={cx}
                  cy={OUTRO.CARDS.cy}
                  w={OUTRO.CARDS.w}
                  h={OUTRO.CARDS.h}
                  opacity={1}
                  title={c.title}
                  tint={SURFACE}
                  body={
                    <g>
                      <text x={cx} y={OUTRO.CARDS.cy - 100} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central">
                        {c.sub}
                      </text>
                      {/* ミニチュア：紙片 + 立方体スタック */}
                      <Paper
                        cx={cx - 120}
                        cy={OUTRO.CARDS.cy + 30}
                        w={130}
                        h={90}
                        opacity={1}
                        title={i === 0 ? '指示' : i === 1 ? '<lol>' : 'regex'}
                      />
                      {/* 矢印 */}
                      <WorkArrow
                        x1={cx - 50}
                        y1={OUTRO.CARDS.cy + 30}
                        x2={cx + 30}
                        y2={OUTRO.CARDS.cy + 30}
                        opacity={1}
                        color={EXEC_DARK}
                      />
                      {/* 結果 */}
                      {i === 0 && (
                        <CubeStack
                          baseCx={cx + 110}
                          baseY={OUTRO.CARDS.cy + 80}
                          blockW={11}
                          blockH={11}
                          cols={8}
                          rows={10}
                          grow={1}
                          opacity={1}
                          color={EXEC}
                        />
                      )}
                      {i === 1 && (
                        <g>
                          <text x={cx + 110} y={OUTRO.CARDS.cy + 20} fill={EXEC_DARK} fontSize={FS_NOTE} fontFamily={FONT_MONO} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                            haha × {bilNest > 0.3 ? '10 億' : '10⁹'}
                          </text>
                          <text x={cx + 110} y={OUTRO.CARDS.cy + 58} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={600} textAnchor="middle" dominantBaseline="central" opacity={bilNest}>
                            （9 段の入れ子）
                          </text>
                        </g>
                      )}
                      {i === 2 && (
                        <g>
                          <Hourglass cx={cx + 110} cy={OUTRO.CARDS.cy + 30} size={28} opacity={1} color={EXEC} />
                          <text x={cx + 110} y={OUTRO.CARDS.cy + 80} fill={EXEC_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
                            止まらない
                          </text>
                        </g>
                      )}
                    </g>
                  }
                />
              </g>
            );
          })}
          {/* 「同じ家族」の括弧 */}
          {redos > 0.4 && (
            <g opacity={clamp(redos * 1.5 - 0.4)}>
              <text x={0} y={OUTRO.CARDS.cy - OUTRO.CARDS.h / 2 - 38} fill={SUB_INK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                同じ家族の攻撃
              </text>
            </g>
          )}
        </g>
      )}

      {/* 共通の防御アイコン帯 */}
      {common > 0.05 && (
        <g opacity={common * fadeRest}>
          <text
            x={0}
            y={OUTRO.COMMON_DEF.cy - 20}
            fill={DEFENSE}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            共通の防御 ── 指示書を最後まで実行しない
          </text>
          {/* 3 つの共通防御アイコン */}
          {[
            { offset: -1, label: '最大サイズ' },
            { offset: 0, label: 'タイムアウト' },
            { offset: 1, label: '深さ上限' },
          ].map((d, i) => (
            <g key={i}>
              <rect x={d.offset * 220 - 90} y={OUTRO.COMMON_DEF.cy + 10} width={180} height={50} rx={25} fill={DEFENSE_SOFT} stroke={DEFENSE} strokeWidth={2} />
              <text x={d.offset * 220} y={OUTRO.COMMON_DEF.cy + 36} fill={DEFENSE} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                {d.label}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* 最後の一文 */}
      {final > 0.05 && (
        <g opacity={final}>
          <text
            x={0}
            y={OUTRO.FINAL_Y - 100}
            fill={INK}
            fontSize={FS_TITLE}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            律儀さを武器に変える攻撃
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// セクションタイトル（左上・画面跨ぎ）
// ============================================================
const SCENE_TITLES: { start: number; text: string }[] = [
  { start: sceneStarts.intro, text: '00 紙片と、その実行' },
  { start: sceneStarts.body1, text: '01 圧縮の正体' },
  { start: sceneStarts.body2a, text: '02 一段の壁、再帰で掛ける' },
  { start: sceneStarts.body2b, text: '03 一段のままで、目次で水増し' },
  { start: sceneStarts.body3, text: '04 律儀さが、引き金になる' },
  { start: sceneStarts.outro, text: '05 同じ家族の攻撃' },
];

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-918} y={-504} width={10} height={36} rx={5} fill={EXEC} />
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

// ===== 対話字幕（必須）=====
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
export const ZipBomb: React.FC = () => {
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
          <radialGradient id="zb_bgglow" cx="50%" cy="36%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#zb_bgglow)" />

        <SceneIntro f={f} vis={rv(introVis, f)} />
        <SceneBody1 f={f} vis={rv(body1Vis, f)} />
        <SceneBody2a f={f} vis={rv(body2aVis, f)} />
        <SceneBody2b f={f} vis={rv(body2bVis, f)} />
        <SceneBody3 f={f} vis={rv(body3Vis, f)} />
        <SceneOutro f={f} vis={rv(outroVis, f)} />

        <SceneTitle text={SCENE_TITLES[titleIdx].text} opacity={titleOpacity} />
        <Subtitle frame={f} />
      </svg>
    </AbsoluteFill>
  );
};
