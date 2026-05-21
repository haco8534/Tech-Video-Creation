// [4] Remotion 実装 — transformer（オブジェクト中心ステージ・ホワイトテーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から生成）。
// 対話字幕は SCRIPT 全行から自動描画（04_remotion.md §7）。
// 図解は「専用装置」で組む：意味指紋を背骨に、語カードを加工していく工程を見せる。
// 座標・サイズ・キーフレーム数値はこのファイル内で直書き（design_spec には無い）。

import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SCRIPT, AnimEvent, Speaker } from './scriptData';

// ===== 世界観の語彙（design_overall 1.世界観・ホワイトテーマ）=====
const BG = '#f5f7fa';
const CAP_FILL = '#ffffff';
const CAP_EDGE = '#9fb1c9';
const CAP_TEXT = '#243044';
const Q_COLOR = '#0f9b94';
const K_COLOR = '#7a4fd0';
const V_COLOR = '#3f9d57';
const ATTN = '#e08a1e';
const DIM = '#aab2bf';
const DRESSED_FILL = '#fdf0dc';
const DRESSED_EDGE = '#e0a850';
const INK = '#243044';
const SUB_INK = '#5a6b82';
const PANEL_FILL = '#eef1f5';
const PANEL_EDGE = '#d3dae3';
const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
const SPEAKER_COLOR: Record<Speaker, string> = {
  めたん: '#d6336c',
  ずんだもん: '#2f9e44',
};

// ===== 台本とフレーム（04_remotion.md §3）=====
const CHAR_FRAMES = 4;
const PAUSE_FRAMES = 6;
const MIN_LINE_FRAMES = 40;
const TAIL_FRAMES = 90;
const CROSSFADE = 30;

const lineDurations = SCRIPT.map(
  (l) => Math.max(MIN_LINE_FRAMES, l.text.length * CHAR_FRAMES) + PAUSE_FRAMES,
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

const clamp = (x: number, lo = 0, hi = 1): number => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const sinwave = (f: number, sp: number): number => 0.5 + 0.5 * Math.sin(f * sp);

// #rrggbb を返す（入れ子 hexLerp(hexLerp(...), ...) を成立させるため出力も hex）
const hex2 = (n: number): string =>
  ('0' + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
const hexLerp = (a: string, b: string, t: number): string => {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return '#' + hex2(lerp(pa[0], pb[0], t)) + hex2(lerp(pa[1], pb[1], t)) + hex2(lerp(pa[2], pb[2], t));
};

// ===== 意味指紋（背骨）=====
// 語の「意味の数値」。FP_N 本のバーで表す。
const FP_N = 6;
const fpSeed = (seed: number): number[] => {
  const o: number[] = [];
  for (let i = 0; i < FP_N; i++) {
    const s = Math.sin(seed * 12.9898 + i * 4.137) * 43758.5453;
    o.push(0.26 + 0.66 * (s - Math.floor(s)));
  }
  return o;
};
const fpLerp = (a: number[], b: number[], t: number): number[] =>
  a.map((v, i) => v + (b[i] - v) * t);
const fpMix = (fps: number[][], ws: number[]): number[] => {
  let tot = 0;
  for (let p = 0; p < ws.length; p++) tot += ws[p];
  tot = Math.max(0.0001, tot);
  const o: number[] = [];
  for (let i = 0; i < FP_N; i++) {
    let s = 0;
    for (let p = 0; p < fps.length; p++) s += fps[p][i] * ws[p];
    o.push(s / tot);
  }
  return o;
};
// 段が深まると凹凸が大きなまとまりへ（隣どうし平滑化）
const fpSmooth = (a: number[], t: number): number[] => {
  const sm: number[] = [];
  for (let i = 0; i < FP_N; i++) {
    const l = a[Math.max(0, i - 1)];
    const r = a[Math.min(FP_N - 1, i + 1)];
    sm.push((l + a[i] * 2 + r) / 4);
  }
  return fpLerp(a, sm, t);
};

// ===== 注目グリッドの重み =====
const gridW = (seed: number, n: number): number[][] => {
  const m: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      const s = Math.sin((i + 1) * (seed + 1.7) + (j + 1) * 2.91) * 43758.5453;
      row.push(0.08 + 0.9 * (s - Math.floor(s)));
    }
    m.push(row);
  }
  return m;
};

// ===== 画面可視性（04_remotion.md §6）=====
const sceneStarts = {
  intro: 0,
  body1: F('scene.body1.in'),
  body2: F('scene.body2.in'),
  body3: F('scene.body3.in'),
  body4: F('scene.body4.in'),
  outro: F('scene.outro.in'),
};

const sceneVisTrack = (sN: number, sNext: number): Track<Sc> =>
  sc([
    [sN, 0],
    [sN + CROSSFADE, 1],
    [sNext, 1],
    [sNext + CROSSFADE, 0],
  ]);

const introVis = sceneVisTrack(0, sceneStarts.body1);
const body1Vis = sceneVisTrack(sceneStarts.body1, sceneStarts.body2);
const body2Vis = sceneVisTrack(sceneStarts.body2, sceneStarts.body3);
const body3Vis = sceneVisTrack(sceneStarts.body3, sceneStarts.body4);
const body4Vis = sceneVisTrack(sceneStarts.body4, sceneStarts.outro);
const outroVis = sceneVisTrack(sceneStarts.outro, TOTAL_FRAMES + 999);

// ============================================================
// 装置：意味指紋
// ============================================================
const Fingerprint: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  vals: number[];
  opacity: number;
  color?: string;
  faint?: number;
  scale?: number;
}> = ({ cx, cy, w, h, vals, opacity, color = V_COLOR, faint = 0, scale = 1 }) => {
  if (opacity <= 0.001) return null;
  const ww = w * scale;
  const hh = h * scale;
  const slot = ww / FP_N;
  const bw = slot * 0.58;
  const col = hexLerp(color, DIM, clamp(faint));
  const base = cy + hh / 2;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - ww / 2 - 7 * scale}
        y={base - hh - 9 * scale}
        width={ww + 14 * scale}
        height={hh + 16 * scale}
        rx={9 * scale}
        fill="#eef1f5"
        stroke="#d8dee6"
        strokeWidth={1.4}
      />
      {vals.map((v, i) => {
        const bh = Math.max(4 * scale, clamp(v) * hh);
        const x = cx - ww / 2 + slot * i + (slot - bw) / 2;
        return (
          <rect
            key={i}
            x={x}
            y={base - bh}
            width={bw}
            height={bh}
            rx={Math.min(bw / 2, 3.5)}
            fill={col}
          />
        );
      })}
    </g>
  );
};

// ============================================================
// 装置：語カード（＋意味指紋）
// ============================================================
const WordCard: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  opacity: number;
  text: string;
  fontSize?: number;
  scale?: number;
  glow?: number;
  dim?: number;
  dress?: number;
  fp?: number[] | null;
  fpFaint?: number;
}> = ({
  cx,
  cy,
  w,
  h,
  opacity,
  text,
  fontSize = 44,
  scale = 1,
  glow = 0,
  dim = 0,
  dress = 0,
  fp = null,
  fpFaint = 0,
}) => {
  if (opacity <= 0.001) return null;
  const fill = hexLerp(hexLerp(CAP_FILL, DRESSED_FILL, dress), '#e7eaef', dim);
  const edge = hexLerp(hexLerp(CAP_EDGE, DRESSED_EDGE, dress), DIM, dim);
  const txt = hexLerp(CAP_TEXT, '#9aa3b2', dim * 0.85);
  const ww = w * scale;
  const hh = h * scale;
  const wordY = fp ? cy - hh * 0.04 : cy;
  return (
    <g opacity={opacity}>
      {glow > 0.01 && (
        <rect
          x={cx - ww / 2 - 12}
          y={cy - hh / 2 - 12}
          width={ww + 24}
          height={hh + 24}
          rx={(hh + 24) / 2}
          fill="none"
          stroke={ATTN}
          strokeWidth={3.5}
          opacity={glow * 0.85}
        />
      )}
      <rect
        x={cx - ww / 2}
        y={cy - hh / 2 + 6}
        width={ww}
        height={hh}
        rx={hh / 2}
        fill="#1f2a3a"
        opacity={0.1}
      />
      <rect
        x={cx - ww / 2}
        y={cy - hh / 2}
        width={ww}
        height={hh}
        rx={hh / 2}
        fill={fill}
        stroke={edge}
        strokeWidth={2.5}
      />
      <text
        x={cx}
        y={wordY}
        fill={txt}
        fontSize={fontSize * scale}
        fontFamily={FONT}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {text}
      </text>
      {fp && (
        <Fingerprint
          cx={cx}
          cy={cy + hh / 2 + 30 * scale}
          w={ww * 0.84}
          h={32}
          vals={fp}
          opacity={1}
          faint={fpFaint}
          scale={scale}
        />
      )}
    </g>
  );
};

// ============================================================
// 装置：注目線
// ============================================================
const AttentionLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strength: number;
  opacity: number;
  color?: string;
  lift?: number;
}> = ({ x1, y1, x2, y2, strength, opacity, color = ATTN, lift = 0.34 }) => {
  if (opacity <= 0.001 || strength <= 0.003) return null;
  const mx = (x1 + x2) / 2;
  const arc = Math.min(Math.abs(x2 - x1) * lift, 230);
  const my = (y1 + y2) / 2 - arc - 28;
  const d = 'M ' + x1 + ' ' + y1 + ' Q ' + mx + ' ' + my + ' ' + x2 + ' ' + y2;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.4 + strength * 8}
      strokeLinecap="round"
      opacity={opacity * (0.3 + strength * 0.7)}
    />
  );
};

// ============================================================
// 装置：Q/K グリフ（ソケットとプラグ）
// ============================================================
const QGlyph: React.FC<{ cx: number; cy: number; opacity: number; glow?: number }> = ({
  cx,
  cy,
  opacity,
  glow = 0,
}) => {
  if (opacity <= 0.001) return null;
  const w = 56;
  const h = 36;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={9}
        fill="#e1f1f0"
        stroke={Q_COLOR}
        strokeWidth={2.5}
      />
      {/* 受け口（ソケット）：左辺のくぼみ */}
      <circle cx={cx - w / 2} cy={cy} r={11} fill={BG} stroke={Q_COLOR} strokeWidth={2.5} />
      <text
        x={cx + 6}
        y={cy}
        fill={Q_COLOR}
        fontSize={20}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        Q
      </text>
      {glow > 0.01 && (
        <circle
          cx={cx - w / 2}
          cy={cy}
          r={16}
          fill="none"
          stroke={ATTN}
          strokeWidth={3}
          opacity={glow}
        />
      )}
    </g>
  );
};

const KGlyph: React.FC<{ cx: number; cy: number; opacity: number; glow?: number }> = ({
  cx,
  cy,
  opacity,
  glow = 0,
}) => {
  if (opacity <= 0.001) return null;
  const w = 56;
  const h = 36;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={9}
        fill="#ede4fb"
        stroke={K_COLOR}
        strokeWidth={2.5}
      />
      {/* 差し込み（プラグ）：右辺の出っぱり */}
      <circle cx={cx + w / 2} cy={cy} r={10} fill={K_COLOR} />
      <text
        x={cx - 5}
        y={cy}
        fill={K_COLOR}
        fontSize={20}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        K
      </text>
      {glow > 0.01 && (
        <circle
          cx={cx + w / 2}
          cy={cy}
          r={16}
          fill="none"
          stroke={ATTN}
          strokeWidth={3}
          opacity={glow}
        />
      )}
    </g>
  );
};

// 照合：プラグ（K）がソケット（Q）に差し込まれる。fit=噛み合い。
const MatchPair: React.FC<{ cx: number; cy: number; fit: number; opacity: number }> = ({
  cx,
  cy,
  fit,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const gap = lerp(58, 0, clamp(fit));
  return (
    <g opacity={opacity}>
      <KGlyph cx={cx - 40 - gap} cy={cy} opacity={1} glow={fit} />
      <QGlyph cx={cx + 40 + gap} cy={cy} opacity={1} glow={fit} />
      {fit > 0.55 && (
        <text
          x={cx}
          y={cy - 38}
          fill={ATTN}
          fontSize={22}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(fit * 2 - 1.1)}
        >
          噛み合う
        </text>
      )}
    </g>
  );
};

// ============================================================
// 装置：注目配分バー（全長一定の帯を相手ごとに分割）
// ============================================================
const AttnBudgetBar: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  opacity: number;
  weights: number[];
  labels: string[];
}> = ({ cx, cy, w, h, opacity, weights, labels }) => {
  if (opacity <= 0.001) return null;
  let tot = 0;
  for (let i = 0; i < weights.length; i++) tot += weights[i];
  tot = Math.max(0.0001, tot);
  let acc = 0;
  const segs: React.ReactNode[] = [];
  for (let i = 0; i < weights.length; i++) {
    const frac = weights[i] / tot;
    const sw = frac * w;
    const x = cx - w / 2 + acc;
    const strong = clamp(frac * 3.4);
    segs.push(
      <g key={i}>
        <rect
          x={x + 2}
          y={cy - h / 2}
          width={Math.max(0, sw - 4)}
          height={h}
          rx={6}
          fill={hexLerp('#f0d7b0', ATTN, strong)}
        />
        <text
          x={x + sw / 2}
          y={cy + h / 2 + 24}
          fill={SUB_INK}
          fontSize={21}
          fontFamily={FONT}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {labels[i]}
        </text>
      </g>,
    );
    acc += sw;
  }
  return (
    <g opacity={opacity}>
      <rect
        x={cx - w / 2 - 5}
        y={cy - h / 2 - 5}
        width={w + 10}
        height={h + 10}
        rx={9}
        fill="none"
        stroke={PANEL_EDGE}
        strokeWidth={2}
      />
      {segs}
      <text
        x={cx - w / 2 - 18}
        y={cy}
        fill={SUB_INK}
        fontSize={20}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="end"
        dominantBaseline="central"
      >
        注目
      </text>
    </g>
  );
};

// ============================================================
// 装置：注目グリッド（N×N、セルの濃さ＝注目）
// ============================================================
const AttnGrid: React.FC<{
  cx: number;
  cy: number;
  cell: number;
  n: number;
  weights: number[][];
  opacity: number;
  color?: string;
  reveal?: number;
  highlight?: [number, number] | null;
}> = ({ cx, cy, cell, n, weights, opacity, color = ATTN, reveal = 1, highlight = null }) => {
  if (opacity <= 0.001) return null;
  const span = cell * n;
  const ox = cx - span / 2;
  const oy = cy - span / 2;
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const rprog = clamp(reveal * n * 1.4 - i);
      const w = weights[i][j] * rprog;
      const isHi = highlight && highlight[0] === i && highlight[1] === j;
      cells.push(
        <rect
          key={i + '_' + j}
          x={ox + j * cell + 2}
          y={oy + i * cell + 2}
          width={cell - 4}
          height={cell - 4}
          rx={5}
          fill={hexLerp('#ffffff', color, clamp(w))}
          stroke={isHi ? ATTN : '#e2e7ee'}
          strokeWidth={isHi ? 3.5 : 1}
        />,
      );
    }
  }
  return (
    <g opacity={opacity}>
      <rect
        x={ox - 8}
        y={oy - 8}
        width={span + 16}
        height={span + 16}
        rx={12}
        fill="#ffffff"
        stroke={PANEL_EDGE}
        strokeWidth={2}
      />
      {cells}
    </g>
  );
};

// ============================================================
// 装置：意味空間（2D 面と意味の点）
// ============================================================
const MeaningSpace: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  opacity: number;
  spread: number;
  frame: number;
  scale?: number;
}> = ({ cx, cy, w, h, opacity, spread, frame, scale = 1 }) => {
  if (opacity <= 0.001) return null;
  const ww = w * scale;
  const hh = h * scale;
  const rx = ww * 0.27;
  const ry = hh * 0.26;
  const regions = [
    { t: 'めがね', x: -rx, y: -ry },
    { t: 'いす', x: rx, y: -ry },
    { t: '電話', x: -rx, y: ry },
    { t: '保険', x: rx, y: ry },
  ];
  const target = regions[2];
  const sp = clamp(spread);
  const dotX = cx + lerp(target.x, 0, sp);
  const dotY = cy + lerp(target.y, 0, sp);
  return (
    <g opacity={opacity}>
      <rect
        x={cx - ww / 2}
        y={cy - hh / 2}
        width={ww}
        height={hh}
        rx={16}
        fill="#ffffff"
        stroke={PANEL_EDGE}
        strokeWidth={2}
      />
      {[-1, 0, 1].map((g) => (
        <g key={'g' + g}>
          <line
            x1={cx + (g * ww) / 3}
            y1={cy - hh / 2 + 10}
            x2={cx + (g * ww) / 3}
            y2={cy + hh / 2 - 10}
            stroke="#eef1f5"
            strokeWidth={1.5}
          />
          <line
            x1={cx - ww / 2 + 10}
            y1={cy + (g * hh) / 3}
            x2={cx + ww / 2 - 10}
            y2={cy + (g * hh) / 3}
            stroke="#eef1f5"
            strokeWidth={1.5}
          />
        </g>
      ))}
      {regions.map((r, i) => (
        <g key={i}>
          <circle cx={cx + r.x} cy={cy + r.y} r={36 * scale} fill={ATTN} opacity={0.07} />
          <text
            x={cx + r.x}
            y={cy + r.y - 40 * scale}
            fill={i === 2 && sp < 0.5 ? ATTN : '#aeb8c6'}
            fontSize={24 * scale}
            fontFamily={FONT}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {r.t}
          </text>
        </g>
      ))}
      {/* ぼやけ：候補領域に明滅するゴースト点 */}
      {sp > 0.02 &&
        regions.map((r, i) => {
          const flick = 0.35 + 0.65 * sinwave(frame, 0.19 + i * 0.05);
          return (
            <circle
              key={'gh' + i}
              cx={cx + r.x}
              cy={cy + r.y}
              r={lerp(9, 22, sp) * scale}
              fill={ATTN}
              opacity={sp * flick * 0.5}
            />
          );
        })}
      {/* 定まった鋭い点 */}
      <circle
        cx={dotX}
        cy={dotY}
        r={lerp(11, 26, sp) * scale}
        fill={ATTN}
        opacity={lerp(1, 0.18, sp)}
      />
      <circle cx={dotX} cy={dotY} r={5.5 * scale} fill="#ffffff" opacity={lerp(1, 0, sp)} />
    </g>
  );
};

// ============================================================
// 装置：次語確率バー（候補語と確からしさ）
// ============================================================
const NextWordBars: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  reveal: number;
  items: { word: string; p: number }[];
  scale?: number;
}> = ({ cx, cy, opacity, reveal, items, scale = 1 }) => {
  if (opacity <= 0.001) return null;
  const rowH = 50 * scale;
  const barMax = 230 * scale;
  const labelW = 150 * scale;
  return (
    <g opacity={opacity}>
      {items.map((it, i) => {
        const prog = clamp(reveal * items.length * 1.3 - i);
        const top = i === 0;
        const bw = it.p * barMax * prog;
        const y = cy + (i - (items.length - 1) / 2) * rowH;
        return (
          <g key={i} opacity={clamp(prog * 2)}>
            <text
              x={cx - labelW / 2 - 12}
              y={y}
              fill={top ? ATTN : SUB_INK}
              fontSize={24 * scale}
              fontFamily={FONT}
              fontWeight={top ? 800 : 600}
              textAnchor="end"
              dominantBaseline="central"
            >
              {it.word}
            </text>
            <rect
              x={cx - labelW / 2}
              y={y - 12 * scale}
              width={barMax}
              height={24 * scale}
              rx={7}
              fill="#e7ebf1"
            />
            <rect
              x={cx - labelW / 2}
              y={y - 12 * scale}
              width={Math.max(0, bw)}
              height={24 * scale}
              rx={7}
              fill={top ? ATTN : hexLerp(V_COLOR, '#cfd6df', 0.45)}
            />
          </g>
        );
      })}
    </g>
  );
};

// ============================================================
// 装置：位置の波（位置ごとに違う波形）
// ============================================================
const PosWave: React.FC<{
  cx: number;
  cy: number;
  w: number;
  idx: number;
  opacity: number;
}> = ({ cx, cy, w, idx, opacity }) => {
  if (opacity <= 0.001) return null;
  const pts: string[] = [];
  const seg = 22;
  for (let i = 0; i <= seg; i++) {
    const x = cx - w / 2 + (w * i) / seg;
    const ph = (i / seg) * Math.PI * 2 * (1 + idx * 0.7) + idx * 1.3;
    const y = cy + Math.sin(ph) * 11;
    pts.push((i === 0 ? 'M ' : 'L ') + x + ' ' + y);
  }
  return (
    <g opacity={opacity}>
      <path d={pts.join(' ')} fill="none" stroke={K_COLOR} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
};

// ============================================================
// 装置：統合コア
// ============================================================
const Core: React.FC<{ cx: number; cy: number; r: number; opacity: number; pulse: number }> = ({
  cx,
  cy,
  r,
  opacity,
  pulse,
}) => {
  if (opacity <= 0.001 || r <= 0.5) return null;
  const gid = 'coreg_' + Math.round(cx) + '_' + Math.round(cy) + '_' + Math.round(r);
  const rr = r * (1 + 0.05 * pulse);
  return (
    <g opacity={opacity}>
      <defs>
        <radialGradient id={gid}>
          <stop offset="0%" stopColor="#fff6e4" />
          <stop offset="50%" stopColor={ATTN} />
          <stop offset="100%" stopColor={Q_COLOR} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={rr * 1.42} fill={ATTN} opacity={0.14 + 0.1 * pulse} />
      <circle cx={cx} cy={cy} r={rr} fill={'url(#' + gid + ')'} />
      <text
        x={cx}
        y={cy}
        fill="#ffffff"
        fontSize={r * 0.2}
        fontFamily={FONT}
        fontWeight={800}
        textAnchor="middle"
        dominantBaseline="central"
      >
        Transformer
      </text>
    </g>
  );
};

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-918} y={-502} width={9} height={34} rx={4} fill={ATTN} />
      <text
        x={-892}
        y={-484}
        fill={SUB_INK}
        fontSize={28}
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
  const rows = wrapLine(line.text, 24);
  return (
    <g>
      <rect x={-892} y={328} width={1784} height={6} rx={3} fill="#dde3ea" />
      <g opacity={op}>
        <text
          x={0}
          y={368}
          fill={SPEAKER_COLOR[line.speaker]}
          fontSize={28}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {line.speaker}
        </text>
        {rows.map((r, i) => (
          <text
            key={i}
            x={0}
            y={(rows.length === 2 ? 416 : 438) + i * 54}
            fill={INK}
            fontSize={39}
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
// 画面1 — 序論
// ============================================================
const introForm = sc([
  [20, 0],
  [F('intro.predict'), 1],
]);
const introPredict = sc([
  [F('intro.predict'), 0],
  [F('intro.predict') + 40, 1],
]);
const introUses = sc([
  [F('intro.uses'), 0],
  [F('intro.uses') + 36, 1],
]);
const introMerge = sc([
  [F('intro.merge'), 0],
  [F('intro.merge') + 48, 1],
]);
const introQuestion = sc([
  [F('intro.question'), 0],
  [F('intro.question') + 32, 1],
]);

const INTRO_NEXT_ITEMS = [
  { word: 'ございます', p: 0.86 },
  { word: 'です', p: 0.48 },
  { word: '！', p: 0.24 },
];
const USE_LABELS = ['予測変換', '翻訳', 'ChatGPT'];
const USE_SPREAD: [number, number][] = [
  [-560, -150],
  [560, -150],
  [0, 250],
];

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const form = rv(introForm, f);
  const predict = rv(introPredict, f);
  const uses = rv(introUses, f);
  const merge = rv(introMerge, f);
  const quest = rv(introQuestion, f);
  const pulse = clamp(merge) * (0.5 + 0.5 * Math.sin(f * 0.12));
  const sentence = ['きょうは', 'いい', 'てんき'];
  const capX = [-470, -250, -50];
  return (
    <g opacity={vis}>
      {/* 短文をつくる語カード */}
      {sentence.map((t, i) => (
        <WordCard
          key={i}
          cx={capX[i]}
          cy={-258}
          w={210}
          h={94}
          opacity={clamp(form * 3 - i)}
          text={t}
          fontSize={38}
        />
      ))}
      {/* 「？」カード＋次語確率バー */}
      <WordCard
        cx={170}
        cy={-258}
        w={150}
        h={94}
        opacity={predict}
        text="？"
        fontSize={50}
        glow={predict * (1 - merge)}
      />
      <NextWordBars
        cx={170}
        cy={-90}
        opacity={predict * (1 - merge)}
        reveal={predict}
        items={INTRO_NEXT_ITEMS}
        scale={0.92}
      />
      {/* 3つの用途パネル（同じ装置で動く）→ 統合コアへ融合 */}
      {USE_LABELS.map((t, i) => {
        const sp = USE_SPREAD[i];
        const px = lerp(sp[0], 0, merge);
        const py = lerp(sp[1], 70, merge);
        const psc = lerp(1, 0.28, merge);
        return (
          <g key={t} opacity={uses * (1 - clamp(merge * 1.15))}>
            <rect
              x={px - 150 * psc}
              y={py - 86 * psc}
              width={300 * psc}
              height={172 * psc}
              rx={16}
              fill="#ffffff"
              stroke={PANEL_EDGE}
              strokeWidth={2.5}
            />
            <text
              x={px}
              y={py - 56 * psc}
              fill={Q_COLOR}
              fontSize={26 * psc}
              fontFamily={FONT}
              fontWeight={700}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {t}
            </text>
            {[0, 1, 2].map((b) => (
              <rect
                key={b}
                x={px - 92 * psc}
                y={py + (-14 + b * 30) * psc}
                width={lerp(40, 150, [0.95, 0.55, 0.3][b]) * psc}
                height={16 * psc}
                rx={5}
                fill={b === 0 ? ATTN : '#cdd5df'}
              />
            ))}
          </g>
        );
      })}
      <Core cx={0} cy={70} r={130 * clamp(merge)} opacity={merge} pulse={pulse} />
      <text
        x={0}
        y={-118}
        fill={SUB_INK}
        fontSize={26}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        opacity={merge}
      >
        2017
      </text>
      <text
        x={0}
        y={252}
        fill={ATTN}
        fontSize={40}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        opacity={quest}
      >
        機械はどうやって文章を読んでいるのか
      </text>
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「ことばの意味は、まわりが決める」
// ============================================================
const B1_CANDS = [fpSeed(3), fpSeed(7), fpSeed(11), fpSeed(15)];
const B1_NEUTRAL = fpSeed(21);

const b1In = sc([
  [sceneStarts.body1 + 8, 0],
  [sceneStarts.body1 + CROSSFADE + 16, 1],
]);
const b1Waver = sc([
  [F('kakeru.waver'), 0],
  [F('kakeru.waver') + 34, 1],
]);
const b1Ctx = sc([
  [F('kakeru.context'), 0],
  [F('kakeru.context') + 34, 1],
]);
const b1Resolve = sc([
  [F('kakeru.resolve'), 0],
  [F('kakeru.resolve') + 44, 1],
]);
const b1Order = sc([
  [F('order.flip'), 0],
  [F('order.flip') + 30, 1],
  [F('oldmachine.dict'), 1],
  [F('oldmachine.dict') + 26, 0],
]);
const b1Flip = sc([
  [F('order.flip') + 36, 0],
  [F('order.flip') + 104, 1],
]);
const b1Dict = sc([
  [F('oldmachine.dict'), 0],
  [F('oldmachine.dict') + 38, 1],
]);

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1In, f);
  const waver = rv(b1Waver, f);
  const ctx = rv(b1Ctx, f);
  const resolve = rv(b1Resolve, f);
  const order = rv(b1Order, f);
  const flip = rv(b1Flip, f);
  const dict = rv(b1Dict, f);

  // 「かける」の意味指紋：揺れ → 定まる → 辞書で固定（灰）
  const cyc = ((f * 0.05) % 4 + 4) % 4;
  const ci = Math.floor(cyc);
  const wav = fpLerp(B1_CANDS[ci], B1_CANDS[(ci + 1) % 4], cyc - ci);
  const wavering = fpLerp(B1_NEUTRAL, wav, waver * (1 - resolve));
  const kakeFp = fpLerp(wavering, B1_CANDS[2], resolve);

  const kakeX = lerp(-330, -250, ctx);
  const spread = clamp(waver * (1 - resolve) + (1 - waver) * 0.12);

  return (
    <g opacity={vis}>
      {/* 意味空間 */}
      <g opacity={inA}>
        <MeaningSpace cx={336} cy={-150} w={604} h={392} opacity={1} spread={spread} frame={f} />
      </g>
      {/* 文脈カード */}
      <WordCard
        cx={-566}
        cy={-150}
        w={196}
        h={100}
        opacity={ctx}
        text="電話"
        fontSize={44}
        fp={fpSeed(11)}
      />
      <WordCard
        cx={-408}
        cy={-150}
        w={112}
        h={100}
        opacity={ctx}
        text="を"
        fontSize={38}
        fp={fpSeed(33)}
      />
      {/* 主役「かける」カード＋意味指紋 */}
      <WordCard
        cx={kakeX}
        cy={-150}
        w={236}
        h={104}
        opacity={inA}
        text="かける"
        fontSize={48}
        fp={kakeFp}
        fpFaint={dict}
        dim={dict * 0.8}
        glow={resolve * (1 - dict) * 0.7}
      />
      {/* 辞書（昔の機械：文脈と無関係に固定指紋を貼る）*/}
      {dict > 0.02 && (
        <g opacity={dict}>
          <rect x={kakeX - 130} y={92} width={260} height={104} rx={12} fill="#e7eaef" stroke={DIM} strokeWidth={2.5} />
          <text
            x={kakeX}
            y={124}
            fill={SUB_INK}
            fontSize={24}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            辞書：かける＝①
          </text>
          <Fingerprint cx={kakeX} cy={170} w={188} h={26} vals={fpSeed(21)} opacity={1} faint={1} />
          <line
            x1={kakeX}
            y1={40}
            x2={kakeX}
            y2={-30}
            stroke={DIM}
            strokeWidth={2.5}
            strokeDasharray="5 5"
          />
        </g>
      )}
      {/* 語順デモ：同じ語・矢印の向きで関係が逆転 */}
      {order > 0.02 &&
        (() => {
          const dx = [-690, -510, -330];
          const dw = ['ねこ', 'いぬ', '追う'];
          const a1 = flip < 0.5 ? -690 : -510;
          const a2 = flip < 0.5 ? -510 : -690;
          const dir = a2 > a1 ? 1 : -1;
          return (
            <g opacity={order}>
              {dw.map((t, i) => (
                <WordCard
                  key={i}
                  cx={dx[i]}
                  cy={196}
                  w={150}
                  h={66}
                  opacity={1}
                  text={t}
                  fontSize={32}
                />
              ))}
              <path
                d={
                  'M ' +
                  (a1 + dir * 80) +
                  ' 156 Q ' +
                  (a1 + a2) / 2 +
                  ' 110 ' +
                  (a2 - dir * 80) +
                  ' 156'
                }
                fill="none"
                stroke={ATTN}
                strokeWidth={4.5}
              />
              <polygon
                points={
                  (a2 - dir * 80) +
                  ',156 ' +
                  (a2 - dir * 80 - dir * 19) +
                  ',143 ' +
                  (a2 - dir * 80 - dir * 19) +
                  ',169'
                }
                fill={ATTN}
              />
            </g>
          );
        })()}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2「単語どうしが、見つめ合う」（Self-Attention）
// ============================================================
const B2_WORDS = ['友だち', 'に', '電話', 'を', 'かける'];
const B2_X = [-620, -410, -170, 70, 360];
const B2_W = [200, 110, 200, 110, 232];
const B2_Y = 8;
const B2_SEEDS = [31, 33, 11, 35, 21];
const B2_FOCUS = 4;
const B2_REL = [0.34, 0.09, 0.5, 0.07];
const B2_DETARA = [0.27, 0.3, 0.13, 0.3];
const B2_BASE_FP = B2_SEEDS.map((s) => fpSeed(s));
const B2_DRESSED_FP = fpMix(
  [B2_BASE_FP[0], B2_BASE_FP[1], B2_BASE_FP[2], B2_BASE_FP[3], B2_BASE_FP[4]],
  [0.34, 0.09, 0.5, 0.07, 0.5],
);

const b2In = sc([
  [sceneStarts.body2 + 8, 0],
  [sceneStarts.body2 + CROSSFADE + 16, 1],
]);
const b2Ask = sc([
  [F('attn.ask'), 0],
  [F('attn.ask') + 34, 1],
]);
const b2Weight = sc([
  [F('attn.weight'), 0],
  [F('attn.weight') + 40, 1],
]);
const b2Qkv = sc([
  [F('qkv.open'), 0],
  [F('qkv.open') + 34, 1],
]);
const b2Match = sc([
  [F('qk.match'), 0],
  [F('qk.match') + 44, 1],
]);
const b2Value = sc([
  [F('value.sum'), 0],
  [F('value.sum') + 64, 1],
]);
const b2Dress = sc([
  [F('value.sum') + 44, 0],
  [F('focus.dressed') + 40, 1],
]);
const b2All = sc([
  [F('attn.all'), 0],
  [F('attn.all') + 48, 1],
]);
const b2Learn = sc([
  [F('qkv.learn'), 0],
  [F('qkv.learn') + 60, 1],
]);

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2In, f);
  const ask = rv(b2Ask, f);
  const weight = rv(b2Weight, f);
  const qkv = rv(b2Qkv, f);
  const match = rv(b2Match, f);
  const value = rv(b2Value, f);
  const dress = rv(b2Dress, f);
  const all = rv(b2All, f);
  const learn = rv(b2Learn, f);
  const fx = B2_X[B2_FOCUS];

  // 注目線の強さ：均一 → 相性ぶんの差
  const strOf = (i: number): number => lerp(0.32, B2_REL[i], weight);
  // 注目配分バー：でたらめ → 照合で意味どおりに整う
  const budgetWeights = B2_REL.map((r, i) =>
    lerp(B2_DETARA[i], r, clamp(weight * 0.7 + match * 0.3)),
  );
  // 焦点カードの意味指紋：加重和で組み変わる
  const focusFp = fpLerp(B2_BASE_FP[B2_FOCUS], B2_DRESSED_FP, clamp(value));

  return (
    <g opacity={vis}>
      {/* 注目配分バー（全長一定の帯を相手ごとに配分）*/}
      <g opacity={clamp(weight + match)}>
        <AttnBudgetBar
          cx={-110}
          cy={-330}
          w={560}
          h={34}
          opacity={1}
          weights={budgetWeights}
          labels={['友だち', 'に', '電話', 'を']}
        />
      </g>

      {/* 焦点 → 各相手への注目線 */}
      {B2_X.map((x, i) => {
        if (i === B2_FOCUS) return null;
        return (
          <AttentionLine
            key={'a' + i}
            x1={fx}
            y1={B2_Y - 56}
            x2={x}
            y2={B2_Y - 56}
            strength={strOf(i)}
            opacity={ask * (1 - all * 0.55)}
          />
        );
      })}

      {/* 全カード一斉（attn.all）の網 */}
      {all > 0.01 &&
        (() => {
          const mesh: React.ReactNode[] = [];
          for (let i = 0; i < 5; i++) {
            for (let j = i + 1; j < 5; j++) {
              if (i === B2_FOCUS || j === B2_FOCUS) continue;
              mesh.push(
                <AttentionLine
                  key={'m' + i + j}
                  x1={B2_X[i]}
                  y1={B2_Y - 56}
                  x2={B2_X[j]}
                  y2={B2_Y - 56}
                  strength={0.3}
                  opacity={all}
                  lift={0.5}
                />,
              );
            }
          }
          return mesh;
        })()}

      {/* 照合（qk.match）：プラグ K がソケット Q に噛み合う */}
      {match > 0.02 &&
        B2_X.map((x, i) => {
          if (i === B2_FOCUS) return null;
          const fit = B2_REL[i] / 0.5;
          return (
            <g key={'mm' + i} opacity={match * (1 - value * 0.85)}>
              <MatchPair cx={x} cy={B2_Y - 168} fit={fit} opacity={1} />
            </g>
          );
        })}

      {/* 加重和：相手の Value（意味指紋）が焦点へ集まる */}
      {value > 0.01 &&
        value < 0.999 &&
        B2_X.map((x, i) => {
          if (i === B2_FOCUS) return null;
          const prog = clamp(value * 1.4 - i * 0.1);
          if (prog <= 0.02 || prog >= 1) return null;
          const px = lerp(x, fx, prog);
          const py = lerp(B2_Y + 96, B2_Y + 70, prog);
          return (
            <Fingerprint
              key={'vf' + i}
              cx={px}
              cy={py}
              w={120}
              h={24}
              vals={B2_BASE_FP[i]}
              opacity={0.9 * (1 - prog * 0.3)}
              scale={lerp(0.7, 0.4, prog)}
            />
          );
        })}

      {/* 語カード列（焦点は加重和で意味指紋が組み変わる）*/}
      {B2_WORDS.map((t, i) => (
        <WordCard
          key={i}
          cx={B2_X[i]}
          cy={B2_Y}
          w={B2_W[i]}
          h={100}
          opacity={inA}
          text={t}
          fontSize={i === 1 || i === 3 ? 40 : 44}
          fp={i === B2_FOCUS ? focusFp : B2_BASE_FP[i]}
          glow={i === B2_FOCUS ? Math.max(ask * (1 - dress), dress * 0.6) : 0}
          dress={i === B2_FOCUS ? dress : 0}
        />
      ))}

      {/* Q/K グリフ（qkv.open で各カードが顔を開く。qkv.learn で整う）*/}
      {qkv > 0.02 &&
        B2_X.map((x, i) => (
          <g key={'g' + i} opacity={qkv * Math.max(1 - all * 0.7, learn)}>
            <QGlyph cx={x} cy={B2_Y - 100} opacity={1} glow={learn * 0.55} />
            <KGlyph cx={x} cy={B2_Y + 150} opacity={1} glow={learn * 0.55} />
          </g>
        ))}

      {/* 意味空間カムバック：焦点の点が「電話」へ定まる */}
      {dress > 0.02 && (
        <g opacity={dress}>
          <MeaningSpace
            cx={690}
            cy={-150}
            w={300}
            h={216}
            opacity={1}
            spread={1 - dress}
            frame={f}
          />
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3「視点を増やし、積み重ねる」
// ============================================================
const B3_WORDS = ['ねこ', 'が', 'さかな', 'を', '食べた'];
const B3_X = [-560, -340, -90, 150, 430];
const B3_W = [184, 110, 220, 110, 224];
const B3_Y = 178;
const B3_SEEDS = [41, 43, 45, 35, 47];
const B3_FP = B3_SEEDS.map((s) => fpSeed(s));
const B3_SHUF = [2, 4, 0, 3, 1];
const HEAD_COLORS = [ATTN, Q_COLOR, K_COLOR, '#d6336c'];
const B3_GRID0 = gridW(2.0, 5);
const B3_HEAD_GRIDS = [gridW(5.1, 5), gridW(8.3, 5), gridW(12.7, 5), gridW(17.2, 5)];

const b3In = sc([
  [sceneStarts.body3 + 8, 0],
  [sceneStarts.body3 + CROSSFADE + 16, 1],
]);
const b3Split = sc([
  [F('heads.split'), 0],
  [F('heads.split') + 40, 1],
]);
const b3Merge = sc([
  [F('heads.merge'), 0],
  [F('heads.merge') + 40, 1],
]);
const b3Layers = sc([
  [F('layers.stack'), 0],
  [F('layers.stack') + 70, 1],
]);
const b3GridOut = sc([
  [F('layers.stack'), 0],
  [F('layers.stack') + 36, 1],
]);
const b3Shuffle = sc([
  [F('pos.shuffle'), 0],
  [F('pos.shuffle') + 36, 1],
  [F('pos.wave'), 1],
  [F('pos.wave') + 40, 0],
]);
const b3Wave = sc([
  [F('pos.wave'), 0],
  [F('pos.wave') + 40, 1],
]);
const b3GridBack = sc([
  [F('pos.shuffle'), 0],
  [F('pos.shuffle') + 30, 1],
  [F('pos.wave') + 50, 1],
  [F('pos.wave') + 86, 0],
]);

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3In, f);
  const split = rv(b3Split, f);
  const merge = rv(b3Merge, f);
  const layers = rv(b3Layers, f);
  const gridOut = rv(b3GridOut, f);
  const shuffle = rv(b3Shuffle, f);
  const wave = rv(b3Wave, f);
  const gridBack = rv(b3GridBack, f);

  const posX = (i: number): number => lerp(B3_X[i], B3_X[B3_SHUF[i]], shuffle);
  const headOn = split * (1 - merge);
  const mainGridOp = clamp(inA - gridOut) * (1 - headOn) + gridBack * (1 - headOn);

  // 層スタック（段を上がるごとに意味指紋が深まる）
  const layerRows: React.ReactNode[] = [];
  const LAYER_N = 3;
  for (let L = 1; L <= LAYER_N; L++) {
    const appear = clamp(layers * (LAYER_N + 0.4) - (L - 1));
    if (appear <= 0.01) continue;
    const lscale = 1 - L * 0.12;
    const ly = B3_Y - L * 150 * lscale;
    layerRows.push(
      <g key={'L' + L} opacity={appear * (1 - gridBack * 0.92)}>
        {B3_X.map((x, i) => (
          <WordCard
            key={i}
            cx={x * lscale}
            cy={ly}
            w={B3_W[i]}
            h={84}
            opacity={1}
            text={B3_WORDS[i]}
            scale={lscale}
            fontSize={38}
            fp={fpSmooth(B3_FP[i], L / LAYER_N)}
          />
        ))}
      </g>,
    );
  }

  return (
    <g opacity={vis}>
      {/* 注目グリッド（全ペアの注目を一望）*/}
      {mainGridOp > 0.01 && (
        <AttnGrid
          cx={0}
          cy={-150}
          cell={46}
          n={5}
          weights={B3_GRID0}
          opacity={mainGridOp}
          reveal={inA}
        />
      )}
      {/* マルチヘッド：色ごとに違う注目グリッド */}
      {headOn > 0.01 &&
        HEAD_COLORS.map((col, h) => {
          const slot = (h - 1.5) * 300;
          const mx = lerp(slot, 0, merge);
          return (
            <AttnGrid
              key={'hg' + h}
              cx={mx}
              cy={-150}
              cell={lerp(30, 46, merge)}
              n={5}
              weights={B3_HEAD_GRIDS[h]}
              opacity={headOn}
              color={col}
              reveal={1}
            />
          );
        })}
      {/* 層スタック */}
      {layerRows}
      {/* 基底の語カード列（持続）*/}
      {B3_WORDS.map((t, i) => (
        <WordCard
          key={i}
          cx={posX(i)}
          cy={B3_Y}
          w={B3_W[i]}
          h={96}
          opacity={inA}
          text={t}
          fontSize={i === 1 || i === 3 ? 38 : 42}
          fp={B3_FP[i]}
        />
      ))}
      {/* 位置の波（順番の目印）*/}
      {wave > 0.02 &&
        B3_X.map((x, i) => (
          <g key={'pw' + i} opacity={wave}>
            <PosWave cx={posX(i)} cy={B3_Y + 122} w={B3_W[i] * 0.8} idx={i} opacity={1} />
          </g>
        ))}
    </g>
  );
};

// ============================================================
// 画面5 — ボディ4「なぜ Transformer は世界を変えたのか」
// ============================================================
const B4_WORDS = ['ねこ', 'が', 'さかな', 'を', '食べた'];
const B4_X = [-560, -340, -90, 150, 430];
const B4_W = [184, 110, 220, 110, 224];
const B4_FP = [41, 43, 45, 35, 47].map((s) => fpSeed(s));
const B4_LEARN_ITEMS = [
  { word: 'さかな', p: 0.78 },
  { word: 'パン', p: 0.36 },
  { word: 'みず', p: 0.19 },
];

const b4In = sc([
  [sceneStarts.body4 + 8, 0],
  [sceneStarts.body4 + CROSSFADE + 16, 1],
]);
const b4Relay = sc([
  [F('rnn.relay'), 0],
  [F('rnn.relay') + 110, 1],
]);
const b4Parallel = sc([
  [F('tf.parallel'), 0],
  [F('tf.parallel') + 42, 1],
]);
const b4Fade = sc([
  [F('rnn.fade'), 0],
  [F('rnn.fade') + 48, 1],
]);
const b4Direct = sc([
  [F('tf.direct'), 0],
  [F('tf.direct') + 40, 1],
]);
const b4Fold = sc([
  [F('learn.game'), 0],
  [F('learn.game') + 44, 1],
]);
const b4Game = sc([
  [F('learn.game') + 30, 0],
  [F('learn.scale'), 1],
]);
const b4Scale = sc([
  [F('learn.scale'), 0],
  [F('learn.scale') + 80, 1],
]);

const SceneBody4: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b4In, f);
  const relay = rv(b4Relay, f);
  const parallel = rv(b4Parallel, f);
  const fade = rv(b4Fade, f);
  const direct = rv(b4Direct, f);
  const fold = rv(b4Fold, f);
  const game = rv(b4Game, f);
  const scale = rv(b4Scale, f);

  const rnnY = lerp(-292, -60, fold);
  const tfY = lerp(140, 60, fold);
  const rnnOp = inA * (1 - clamp(fold * 1.25));
  const tfOp = inA * (1 - clamp(scale * 1.3));

  // RNN 単一状態トークンの位置
  const relayPos = relay * 4.7;
  const tokenIdx = Math.min(4, Math.floor(relayPos));
  const tokenFrac = clamp(relayPos - tokenIdx);
  const tokenX = lerp(B4_X[tokenIdx], B4_X[Math.min(4, tokenIdx + 1)], tokenFrac);

  // 並列の文群
  const parRows: React.ReactNode[] = [];
  for (let r = 0; r < 4; r++) {
    const appear = clamp(scale * 4.4 - r);
    if (appear <= 0.01) continue;
    const ry = -300 + r * 80;
    parRows.push(
      <g key={'pr' + r} opacity={appear * 0.5}>
        {B4_X.map((x, i) => (
          <WordCard
            key={i}
            cx={x * 0.34 - 470}
            cy={ry}
            w={B4_W[i]}
            h={58}
            opacity={1}
            text={B4_WORDS[i]}
            scale={0.34}
            fontSize={38}
          />
        ))}
      </g>,
    );
  }

  return (
    <g opacity={vis}>
      {/* RNN（上段・逐次・単一状態・バケツリレー）*/}
      {rnnOp > 0.01 && (
        <g opacity={rnnOp}>
          {B4_X.map((x, i) => {
            if (i >= 4) return null;
            return (
              <line
                key={'rl' + i}
                x1={x + B4_W[i] / 2 - 6}
                y1={rnnY}
                x2={B4_X[i + 1] - B4_W[i + 1] / 2 + 6}
                y2={rnnY}
                stroke={DIM}
                strokeWidth={3}
              />
            );
          })}
          {B4_X.map((x, i) => (
            <WordCard
              key={'rn' + i}
              cx={x}
              cy={rnnY}
              w={B4_W[i]}
              h={84}
              opacity={1}
              text={B4_WORDS[i]}
              fontSize={34}
              fp={B4_FP[i]}
              fpFaint={clamp(fade * 1.5 - i * 0.3)}
              glow={tokenIdx === i ? 0.75 : 0}
            />
          ))}
          {/* 単一状態トークン：運ぶ文脈の指紋が、進むほど薄れる */}
          {relay > 0.015 && (
            <g>
              <line
                x1={tokenX}
                y1={rnnY - 58}
                x2={tokenX}
                y2={rnnY - 44}
                stroke={ATTN}
                strokeWidth={2.5}
              />
              <rect
                x={tokenX - 41}
                y={rnnY - 116}
                width={82}
                height={56}
                rx={13}
                fill="#ffffff"
                stroke={ATTN}
                strokeWidth={2.5}
              />
              <Fingerprint
                cx={tokenX}
                cy={rnnY - 74}
                w={58}
                h={26}
                vals={B4_FP[0]}
                opacity={1}
                faint={clamp((relayPos / 4.6) * 0.55 + fade * 0.78)}
              />
            </g>
          )}
        </g>
      )}

      {/* Transformer（下段・並列・全結合）*/}
      {tfOp > 0.01 && (
        <g opacity={tfOp}>
          {B4_X.map((x, i) => {
            if (i >= 4) return null;
            return B4_X.slice(i + 1).map((x2, jj) => {
              const j = i + 1 + jj;
              const isLong = i === 0 && j === 4;
              const str = isLong ? lerp(0.36, 1, direct) : 0.3;
              const op = isLong ? Math.max(parallel, direct) : parallel;
              return (
                <AttentionLine
                  key={'tf' + i + j}
                  x1={x}
                  y1={tfY - 54}
                  x2={x2}
                  y2={tfY - 54}
                  strength={str}
                  opacity={op}
                  lift={0.14 + jj * 0.05}
                />
              );
            });
          })}
          {B4_WORDS.map((t, i) => {
            const hidden = i === 2;
            return (
              <g key={'tn' + i}>
                <WordCard
                  cx={B4_X[i]}
                  cy={tfY}
                  w={B4_W[i]}
                  h={88}
                  opacity={hidden ? 1 - game : 1}
                  text={t}
                  fontSize={38}
                  fp={B4_FP[i]}
                />
                {hidden && game > 0.01 && (
                  <WordCard
                    cx={B4_X[i]}
                    cy={tfY}
                    w={B4_W[i]}
                    h={88}
                    opacity={game}
                    text="？"
                    fontSize={46}
                    glow={game * clamp(2 - game * 2)}
                  />
                )}
              </g>
            );
          })}
          {/* 学習ゲーム：次語確率バーで「？」を当てる */}
          {game > 0.02 && (
            <g opacity={clamp(game * 2.4) * (1 - clamp(scale * 1.4))}>
              <NextWordBars
                cx={B4_X[2]}
                cy={tfY + 168}
                opacity={1}
                reveal={game}
                items={B4_LEARN_ITEMS}
                scale={0.78}
              />
            </g>
          )}
        </g>
      )}

      {/* 並列の学習＋統合コア */}
      {parRows}
      <Core
        cx={0}
        cy={-40}
        r={scale * 168}
        opacity={scale}
        pulse={0.5 + 0.5 * Math.sin(f * 0.13)}
      />
    </g>
  );
};

// ============================================================
// 画面6 — 結論
// ============================================================
const B6_WORDS = ['ねこ', 'が', 'さかな', 'を', '食べた'];
const B6_X = [-560, -340, -90, 150, 430];
const B6_W = [184, 110, 220, 110, 224];
const B6_Y = 70;
const B6_FP = [41, 43, 45, 35, 47].map((s) => fpSeed(s));
const B6_DRESSED = B6_FP.map((fp) => fpSmooth(fp, 0.6));
const B6_NEXT = [
  { word: 'ございます', p: 0.84 },
  { word: 'です', p: 0.44 },
];

const b6In = sc([
  [sceneStarts.outro + 8, 0],
  [sceneStarts.outro + CROSSFADE + 16, 1],
]);
const b6Recap = sc([
  [F('recap.devices'), 0],
  [F('recap.devices') + 96, 1],
]);
const b6Loop = sc([
  [F('outro.loopback'), 0],
  [F('outro.loopback') + 42, 1],
]);
const b6End = sc([
  [F('outro.end'), 0],
  [F('outro.end') + 56, 1],
]);

// 装置の再点灯アイコン
const DeviceIcon: React.FC<{ cx: number; cy: number; opacity: number; kind: number }> = ({
  cx,
  cy,
  opacity,
  kind,
}) => {
  if (opacity <= 0.001) return null;
  const labels = ['意味空間', '注目グリッド', '視点と層', '直結'];
  return (
    <g opacity={opacity}>
      <rect x={cx - 54} y={cy - 54} width={108} height={108} rx={16} fill="#ffffff" stroke={PANEL_EDGE} strokeWidth={2} />
      {kind === 0 && (
        <g>
          <rect x={cx - 34} y={cy - 34} width={68} height={68} rx={8} fill="none" stroke={DIM} strokeWidth={2} />
          <circle cx={cx + 10} cy={cy + 12} r={10} fill={ATTN} />
        </g>
      )}
      {kind === 1 && (
        <g>
          {[0, 1, 2].map((i) =>
            [0, 1, 2].map((j) => (
              <rect
                key={i + '' + j}
                x={cx - 33 + j * 23}
                y={cy - 33 + i * 23}
                width={19}
                height={19}
                rx={4}
                fill={hexLerp('#ffffff', ATTN, ((i + j) % 3) * 0.4 + 0.15)}
                stroke="#e2e7ee"
                strokeWidth={1}
              />
            )),
          )}
        </g>
      )}
      {kind === 2 && (
        <g>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={cx - 30 + i * 5}
              y={cy - 28 + i * 20}
              width={60}
              height={14}
              rx={4}
              fill={HEAD_COLORS[i]}
              opacity={0.85}
            />
          ))}
        </g>
      )}
      {kind === 3 && (
        <g>
          <circle cx={cx - 28} cy={cy} r={9} fill={CAP_EDGE} />
          <circle cx={cx + 28} cy={cy} r={9} fill={CAP_EDGE} />
          <path
            d={'M ' + (cx - 28) + ' ' + cy + ' Q ' + cx + ' ' + (cy - 38) + ' ' + (cx + 28) + ' ' + cy}
            fill="none"
            stroke={ATTN}
            strokeWidth={4.5}
          />
        </g>
      )}
      <text
        x={cx}
        y={cy + 80}
        fill={SUB_INK}
        fontSize={22}
        fontFamily={FONT}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {labels[kind]}
      </text>
    </g>
  );
};

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b6In, f);
  const recap = rv(b6Recap, f);
  const loop = rv(b6Loop, f);
  const end = rv(b6End, f);
  const iconX = [-555, -185, 185, 555];
  const collapse = clamp(end * 1.35);
  return (
    <g opacity={vis}>
      {/* 装置アイコン帯（順に再点灯）*/}
      {iconX.map((x, i) => (
        <DeviceIcon
          key={i}
          cx={lerp(x, 0, end)}
          cy={lerp(-244, -40, end)}
          opacity={clamp(recap * 4.4 - i) * (1 - collapse)}
          kind={i}
        />
      ))}
      {/* 完成した語カード列（文脈を着こんだ意味指紋）*/}
      {B6_WORDS.map((t, i) => {
        if (i >= 4) return null;
        return (
          <AttentionLine
            key={'ol' + i}
            x1={B6_X[i]}
            y1={B6_Y - 54}
            x2={B6_X[i + 1]}
            y2={B6_Y - 54}
            strength={0.34}
            opacity={loop * (1 - end)}
          />
        );
      })}
      {B6_WORDS.map((t, i) => (
        <WordCard
          key={i}
          cx={lerp(B6_X[i], 0, end)}
          cy={lerp(B6_Y, -40, end)}
          w={B6_W[i]}
          h={lerp(96, 56, end)}
          opacity={inA * (1 - collapse)}
          text={t}
          fontSize={lerp(i === 1 || i === 3 ? 38 : 42, 22, end)}
          dress={0.85}
          fp={end > 0.3 ? null : B6_DRESSED[i]}
        />
      ))}
      {/* 「？」カード＋次語確率バー（冒頭への回帰）*/}
      <WordCard
        cx={lerp(680, 0, end)}
        cy={lerp(B6_Y, -40, end)}
        w={lerp(150, 56, end)}
        h={lerp(96, 56, end)}
        opacity={loop * (1 - collapse)}
        text="？"
        fontSize={lerp(48, 22, end)}
        glow={loop * (1 - end)}
      />
      <g opacity={loop * (1 - clamp(end * 1.6))}>
        <NextWordBars
          cx={150}
          cy={B6_Y + 150}
          opacity={1}
          reveal={loop}
          items={B6_NEXT}
          scale={0.74}
        />
      </g>
      <Core cx={0} cy={-40} r={end * 178} opacity={end} pulse={0.5 + 0.5 * Math.sin(f * 0.12)} />
    </g>
  );
};

// ============================================================
// セクションタイトル
// ============================================================
const SCENE_TITLES: { start: number; text: string }[] = [
  { start: sceneStarts.intro, text: '序論' },
  { start: sceneStarts.body1, text: '01 ことばの意味は、まわりが決める' },
  { start: sceneStarts.body2, text: '02 単語どうしが、見つめ合う' },
  { start: sceneStarts.body3, text: '03 視点を増やし、積み重ねる' },
  { start: sceneStarts.body4, text: '04 なぜ世界を変えたのか' },
  { start: sceneStarts.outro, text: '結論' },
];

// ============================================================
// メイン
// ============================================================
export const Transformer: React.FC = () => {
  const f = useCurrentFrame();

  const introV = rv(introVis, f);
  const body1V = rv(body1Vis, f);
  const body2V = rv(body2Vis, f);
  const body3V = rv(body3Vis, f);
  const body4V = rv(body4Vis, f);
  const outroV = rv(outroVis, f);

  let titleIdx = 0;
  for (let i = 0; i < SCENE_TITLES.length; i++) {
    if (f >= SCENE_TITLES[i].start) titleIdx = i;
  }
  const titleOpacity = clamp((f - SCENE_TITLES[titleIdx].start) / 16);

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
        <SceneIntro f={f} vis={introV} />
        <SceneBody1 f={f} vis={body1V} />
        <SceneBody2 f={f} vis={body2V} />
        <SceneBody3 f={f} vis={body3V} />
        <SceneBody4 f={f} vis={body4V} />
        <SceneOutro f={f} vis={outroV} />

        {/* 画面跨ぎで持ち越す UI */}
        <SceneTitle text={SCENE_TITLES[titleIdx].text} opacity={titleOpacity} />
        <Subtitle frame={f} />
      </svg>
    </AbsoluteFill>
  );
};
