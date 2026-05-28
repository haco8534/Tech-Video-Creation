// [4] Remotion 実装 — zip_bomb（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 対話字幕は SCRIPT 全行から自動描画（04_remotion.md §7）。
// 背骨は「指示書（軽い）↔ 実行された体積（重い）」の対比。各画面はこれを加工する。
// 画面に重ねる文字は 数値／固有名詞／1 語ラベル のみ（04_remotion.md 画面内テキストの規律）。

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

// ===== アクセント（zip 爆弾の語彙）=====
const LIGHT = '#2f8fb3'; // 指示書・圧縮・やさしさ（軽い／親切）ティール
const LIGHT_DARK = '#1f6a86';
const LIGHT_SOFT = '#e2eff5';
const HEAVY = '#d9543c'; // 実行された体積・脅威（重い）コーラル
const HEAVY_DARK = '#b23a25';
const HEAVY_SOFT = '#f7ddd6';
const METER = '#d99a2b'; // 数値・倍率・天井 アンバー
const METER_DARK = '#a8721a';
const METER_SOFT = '#fbeece';
const GUARD = '#3f9d57'; // 防御・打ち切り グリーン
const GUARD_SOFT = '#dcefe0';

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
const FS_LABEL = 34;
const FS_NUM = 46;
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

// ===== 共通テキスト =====
const T: React.FC<{
  x: number;
  y: number;
  s: number;
  fill: string;
  w?: number;
  opacity?: number;
  anchor?: 'start' | 'middle' | 'end';
  children: React.ReactNode;
}> = ({ x, y, s, fill, w = 700, opacity = 1, anchor = 'middle', children }) => (
  <text
    x={x}
    y={y}
    fill={fill}
    fontSize={s}
    fontFamily={FONT}
    fontWeight={w}
    textAnchor={anchor}
    dominantBaseline="central"
    opacity={opacity}
  >
    {children}
  </text>
);

// ===== 舞台の基準 =====
const STAGE_CY = -40;

// ============================================================
// 背骨の装置1：指示書カード（圧縮ファイル＝軽い）
// ============================================================
const InstructionCard: React.FC<{
  cx: number;
  cy: number;
  w: number;
  opacity: number;
  color: string;
  soft: string;
  label?: string;
  caption?: string;
  lift?: number;
}> = ({ cx, cy, w, opacity, color, soft, label, caption, lift = 0 }) => {
  if (opacity <= 0.001) return null;
  const h = w * 1.22;
  const y = cy - lift;
  const ox = cx - w / 2;
  const oy = y - h / 2;
  const fold = w * 0.26;
  const d =
    'M ' + ox + ' ' + oy +
    ' L ' + (ox + w - fold) + ' ' + oy +
    ' L ' + (ox + w) + ' ' + (oy + fold) +
    ' L ' + (ox + w) + ' ' + (oy + h) +
    ' L ' + ox + ' ' + (oy + h) + ' Z';
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={cy + h / 2 + 16} rx={w * 0.42} ry={9} fill={SHADOW} opacity={0.08 + lift * 0.0006} />
      <path d={d} fill={soft} stroke={color} strokeWidth={3.5} strokeLinejoin="round" />
      <path
        d={'M ' + (ox + w - fold) + ' ' + oy + ' L ' + (ox + w - fold) + ' ' + (oy + fold) + ' L ' + (ox + w) + ' ' + (oy + fold)}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {/* 指示の行（中身を直接持たない＝細い行）*/}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={ox + w * 0.16}
          y1={oy + h * 0.5 + i * 18}
          x2={ox + w * (i === 2 ? 0.6 : 0.82)}
          y2={oy + h * 0.5 + i * 18}
          stroke={color}
          strokeWidth={3}
          opacity={0.5}
        />
      ))}
      {label && <T x={cx} y={oy + h * 0.3} s={FS_LABEL} fill={color} w={800}>{label}</T>}
      {caption && <T x={cx} y={oy + h + 30} s={FS_NOTE} fill={SUB_INK} w={700}>{caption}</T>}
    </g>
  );
};

// ============================================================
// 背骨の装置2：実行された体積（律儀に展開した結果＝重い）
// grow 0..1 で下から積み上がる
// ============================================================
const COLS = 9;
const ROWS = 7;
const CELL = 30;
const GAP = 4;
const GRID_W = COLS * CELL + (COLS - 1) * GAP;
const GRID_H = ROWS * CELL + (ROWS - 1) * GAP;

const VolumeBlocks: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  grow: number;
  fill: string;
  edge: string;
}> = ({ cx, cy, opacity, grow, fill, edge }) => {
  if (opacity <= 0.001) return null;
  const total = COLS * ROWS;
  const shown = grow * total;
  const x0 = cx - GRID_W / 2;
  const y0 = cy - GRID_H / 2;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const order = (ROWS - 1 - r) * COLS + c; // 下段から埋まる
      const a = clamp(shown - order);
      if (a <= 0.01) continue;
      cells.push(
        <rect
          key={r * COLS + c}
          x={x0 + c * (CELL + GAP)}
          y={y0 + r * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx={4}
          fill={fill}
          stroke={edge}
          strokeWidth={2}
          opacity={a}
        />,
      );
    }
  }
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={y0 + GRID_H + 16} rx={GRID_W * 0.52} ry={12} fill={SHADOW} opacity={0.12 * grow} />
      {cells}
    </g>
  );
};

// ============================================================
// 展開の矢印（指示書 → 体積）
// ============================================================
const ExpandArrow: React.FC<{
  x1: number;
  x2: number;
  y: number;
  opacity: number;
  color: string;
  draw: number;
  flip?: boolean;
}> = ({ x1, x2, y, opacity, color, draw, flip = false }) => {
  if (opacity <= 0.001 || draw <= 0.001) return null;
  const sx = flip ? x2 : x1;
  const ex = flip ? x1 : x2;
  const tip = lerp(sx, ex, draw);
  const dir = Math.sign(ex - sx) || 1;
  return (
    <g opacity={opacity}>
      <line x1={sx} y1={y} x2={tip} y2={y} stroke={color} strokeWidth={7} strokeLinecap="round" />
      {draw > 0.6 && (
        <path
          d={'M ' + (tip - dir * 22) + ' ' + (y - 13) + ' L ' + tip + ' ' + y + ' L ' + (tip - dir * 22) + ' ' + (y + 13)}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
};

// ============================================================
// 倍率ゲージ（縦・天井つき）
// ============================================================
const RatioGauge: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  fill: number; // 0..1（天井に対する到達度）
  ceilLabel: string;
  capped: number; // 0..1 天井ラインの強調
}> = ({ cx, cy, opacity, fill, ceilLabel, capped }) => {
  if (opacity <= 0.001) return null;
  const h = 320;
  const w = 92;
  const top = cy - h / 2;
  const inner = h - 16;
  const fillH = clamp(fill) * inner;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={top} width={w} height={h} rx={14} fill={SURFACE} stroke={EDGE} strokeWidth={2.5} />
      <rect
        x={cx - w / 2 + 8}
        y={top + 8 + (inner - fillH)}
        width={w - 16}
        height={fillH}
        rx={8}
        fill={METER_SOFT}
        stroke={METER}
        strokeWidth={2}
      />
      {/* 天井ライン */}
      <line
        x1={cx - w / 2 - 18}
        y1={top + 12}
        x2={cx + w / 2 + 18}
        y2={top + 12}
        stroke={hexLerp(METER, HEAVY, clamp(capped))}
        strokeWidth={5}
        strokeDasharray={capped > 0.5 ? '0' : '8 8'}
      />
      <T x={cx} y={top - 24} s={FS_NUM} fill={hexLerp(METER_DARK, HEAVY_DARK, clamp(capped))} w={900}>
        {ceilLabel}
      </T>
    </g>
  );
};

// ============================================================
// 文字タイル（文字列・ゼロ列）
// ============================================================
const CharTile: React.FC<{ cx: number; cy: number; s: number; opacity: number; ch: string; on: boolean }> = ({
  cx,
  cy,
  s,
  opacity,
  ch,
  on,
}) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - s / 2}
        y={cy - s / 2}
        width={s}
        height={s}
        rx={7}
        fill={on ? LIGHT_SOFT : SURFACE}
        stroke={on ? LIGHT : EDGE}
        strokeWidth={2.5}
      />
      <T x={cx} y={cy} s={s * 0.5} fill={on ? LIGHT_DARK : SUB_INK} w={800}>
        {ch}
      </T>
    </g>
  );
};

// ============================================================
// 画面可視性（04_remotion.md §6）
// ============================================================
const sceneStarts = {
  intro: 0,
  comp: F('scene.comp.in'),
  recur: F('scene.recur.in'),
  single: F('scene.single.in'),
  trigger: F('scene.trigger.in'),
  outro: F('scene.outro.in'),
};

const introVis = sc([
  [0, 1],
  [sceneStarts.comp, 1],
  [sceneStarts.comp + CROSSFADE, 0],
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
const compVis = midVis(sceneStarts.comp, sceneStarts.recur);
const recurVis = midVis(sceneStarts.recur, sceneStarts.single);
const singleVis = midVis(sceneStarts.single, sceneStarts.trigger);
const triggerVis = midVis(sceneStarts.trigger, sceneStarts.outro);
const outroVis = sc([
  [sceneStarts.outro, 0],
  [sceneStarts.outro + CROSSFADE, 1],
  [TOTAL_FRAMES, 1],
]);

const fadeIn = (start: number): Track<Sc> => sc([[start + 8, 0], [start + CROSSFADE + 16, 1]]);

// ============================================================
// 画面1 — 序論「軽い指示書／重い実行」
// ============================================================
const I_CARD = { cx: -468, cy: STAGE_CY, w: 168 };
const I_BLK = { cx: 322, cy: STAGE_CY };
const I_ARROW_Y = STAGE_CY;
const I_ARROW_X1 = I_CARD.cx + I_CARD.w / 2 + 14;
const I_ARROW_X2 = I_BLK.cx - GRID_W / 2 - 14;

const introIn = fadeIn(0);
const introExpand = sc([[F('intro.expand'), 0], [F('intro.expand') + 70, 1]]);
const introGrow = sc([
  [F('intro.expand') + 12, 0],
  [F('intro.expand') + 92, 1],
  [F('intro.paper'), 1],
  [F('intro.paper') + 10, 0.6],
  [F('intro.paper') + 80, 1],
  [TOTAL_FRAMES, 1],
]);
const introSize = sc([[F('intro.size'), 0], [F('intro.size') + 34, 1]]);
const introRatio = sc([[F('intro.ratio'), 0], [F('intro.ratio') + 44, 1]]);
const introName = sc([[F('intro.name'), 0], [F('intro.name') + 40, 1]]);
const introLift = sc([
  [F('intro.asym'), 0],
  [F('intro.asym') + 50, 26],
  [TOTAL_FRAMES, 26],
]);
const introPaper = sc([[F('intro.paper'), 0], [F('intro.paper') + 40, 1]]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(introIn, f);
  const draw = rv(introExpand, f);
  const grow = rv(introGrow, f);
  const size = rv(introSize, f);
  const ratio = rv(introRatio, f);
  const name = rv(introName, f);
  const lift = rv(introLift, f);
  const paper = rv(introPaper, f);

  return (
    <g opacity={vis}>
      <ExpandArrow x1={I_ARROW_X1} x2={I_ARROW_X2} y={I_ARROW_Y} opacity={inA} color={DIM} draw={draw} />
      <InstructionCard
        cx={I_CARD.cx}
        cy={I_CARD.cy}
        w={I_CARD.w}
        opacity={inA}
        color={LIGHT}
        soft={LIGHT_SOFT}
        label={size > 0.5 ? '42 KB' : undefined}
        caption={name > 0.5 ? '42.zip' : undefined}
        lift={lift}
      />
      <VolumeBlocks cx={I_BLK.cx} cy={I_BLK.cy} opacity={inA * clamp(draw * 2)} grow={grow} fill={HEAVY_SOFT} edge={HEAVY} />

      {/* 倍率の数値（叩き直し）*/}
      {ratio > 0.05 && (
        <g opacity={ratio}>
          <T x={I_BLK.cx} y={I_BLK.cy - GRID_H / 2 - 64} s={FS_NUM} fill={HEAVY_DARK} w={900}>4.5 PB</T>
          <T x={I_BLK.cx} y={I_BLK.cy - GRID_H / 2 - 24} s={FS_NOTE} fill={SUB_INK} w={700}>1000 億倍</T>
        </g>
      )}

      {/* 紙に1億回書け の言い換え（指示は軽い）*/}
      {paper > 0.05 && (
        <T x={I_CARD.cx} y={I_CARD.cy - lift - I_CARD.w * 0.72} s={FS_NOTE} fill={LIGHT_DARK} opacity={paper} w={800}>
          ×1 億
        </T>
      )}
    </g>
  );
};

// ============================================================
// 画面2 — 圧縮の正体「コピー指示への畳み込み」と「1段の天井」
// ============================================================
const C_STR_Y = -250;
const C_STR_S = 56;
const C_CARD = { cx: -330, cy: 70, w: 200 };
const C_GAUGE = { cx: 540, cy: 30 };
const ABC = 'ABCABCABCABCABC'.split('');

const compIn = fadeIn(sceneStarts.comp);
const compStr = sc([[F('comp.string'), 0], [F('comp.string') + 48, 1]]);
const compFold = sc([[F('comp.fold'), 0], [F('comp.fold') + 64, 1]]);
const compName = sc([[F('comp.lz77'), 0], [F('comp.lz77') + 36, 1]]);
const compDeflate = sc([[F('comp.deflate'), 0], [F('comp.deflate') + 36, 1]]);
const compZeros = sc([[F('comp.zeros'), 0], [F('comp.zeros') + 50, 1]]);
const compGauge = sc([[F('comp.ceiling'), 0], [F('comp.ceiling') + 56, 1]]);
const compFillGauge = sc([
  [F('comp.ceiling') + 10, 0],
  [F('comp.ceiling') + 80, 1],
  [TOTAL_FRAMES, 1],
]);
const compWall = sc([[F('comp.wall'), 0], [F('comp.wall') + 46, 1]]);

const SceneComp: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(compIn, f);
  const str = rv(compStr, f);
  const fold = rv(compFold, f);
  const nm = rv(compName, f);
  const defl = rv(compDeflate, f);
  const zeros = rv(compZeros, f);
  const gauge = rv(compGauge, f);
  const gfill = rv(compFillGauge, f);
  const wall = rv(compWall, f);

  const isZero = zeros > 0.5;
  const chars = isZero ? Array.from({ length: ABC.length }, () => '0') : ABC;
  const totalW = (ABC.length - 1) * (C_STR_S + 8);
  // 畳み込み：先頭3文字を残し、残りはカードへ吸い込まれる
  const keep = 3;

  return (
    <g opacity={vis}>
      {/* 文字列の帯（先頭以外は畳まれて退く）*/}
      {chars.map((ch, i) => {
        const x = -totalW / 2 + i * (C_STR_S + 8);
        const folded = i >= keep ? fold : 0;
        const op = str * (1 - folded) * (isZero ? 1 : 1);
        const yy = C_STR_Y + folded * 80;
        return (
          <CharTile key={i} cx={lerp(x, C_CARD.cx, folded)} cy={lerp(C_STR_Y, yy, 0)} s={C_STR_S} opacity={op} ch={ch} on />
        );
      })}
      {str > 0.5 && fold < 0.5 && (
        <T x={0} y={C_STR_Y - 64} s={FS_NOTE} fill={SUB_INK} opacity={str * (1 - fold)}>
          {isZero ? '0 が 10 億' : '15 文字'}
        </T>
      )}

      {/* コピー指示カード（戻り矢印つき）*/}
      <g opacity={clamp(fold * 1.2)}>
        <InstructionCard
          cx={C_CARD.cx}
          cy={C_CARD.cy}
          w={C_CARD.w}
          opacity={clamp(fold * 1.2)}
          color={LIGHT}
          soft={LIGHT_SOFT}
          label={defl > 0.5 ? 'DEFLATE' : nm > 0.5 ? 'LZ77' : undefined}
        />
        {/* 戻ってコピー の弧 */}
        <path
          d={'M ' + (C_CARD.cx + 40) + ' ' + (C_CARD.cy - C_CARD.w * 0.5) + ' Q ' + (C_CARD.cx + 150) + ' ' + (C_CARD.cy - C_CARD.w * 0.5 - 70) + ' ' + (C_CARD.cx - 30) + ' ' + (C_CARD.cy - C_CARD.w * 0.5)}
          fill="none"
          stroke={LIGHT_DARK}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d={'M ' + (C_CARD.cx - 10) + ' ' + (C_CARD.cy - C_CARD.w * 0.5 - 16) + ' L ' + (C_CARD.cx - 30) + ' ' + (C_CARD.cy - C_CARD.w * 0.5) + ' L ' + (C_CARD.cx - 8) + ' ' + (C_CARD.cy - C_CARD.w * 0.5 + 12)}
          fill="none"
          stroke={LIGHT_DARK}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 倍率ゲージ：1段の天井 1032× */}
      <RatioGauge cx={C_GAUGE.cx} cy={C_GAUGE.cy} opacity={gauge} fill={gfill} ceilLabel="1032×" capped={wall} />
      {wall > 0.3 && (
        <T x={C_GAUGE.cx} y={C_GAUGE.cy + 200} s={FS_NOTE} fill={HEAVY_DARK} opacity={wall} w={800}>
          1 段の壁
        </T>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — 再帰型と、その封じ
// ============================================================
const recurIn = fadeIn(sceneStarts.recur);
const recurDouble = sc([[F('recur.double'), 0], [F('recur.double') + 50, 1]]);
const recurDoubleOut = sc([
  [F('recur.random'), 1],
  [F('recur.random') + 46, 0],
]);
const recurNest = sc([[F('recur.nest'), 0], [F('recur.nest') + 60, 1]]);
const recurStack = sc([[F('recur.stack'), 0], [F('recur.stack') + 80, 1]]);
const recurPeta = sc([[F('recur.peta'), 0], [F('recur.peta') + 50, 1]]);
const recurDepth = sc([[F('recur.depth'), 0], [F('recur.depth') + 50, 1]]);
const recurObsolete = sc([[F('recur.obsolete'), 0], [F('recur.obsolete') + 56, 1]]);

// 入れ子ツリー：3 段の分岐（×16 ラベルで表す）
const TREE_TOP = -330;
const TREE_LV = [
  { y: TREE_TOP, xs: [0] },
  { y: TREE_TOP + 130, xs: [-300, 0, 300] },
  { y: TREE_TOP + 260, xs: [-420, -300, -180, -120, 0, 120, 180, 300, 420] },
];

const SceneRecur: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(recurIn, f);
  const dbl = rv(recurDouble, f) * rv(recurDoubleOut, f);
  const nest = rv(recurNest, f);
  const stack = rv(recurStack, f);
  const peta = rv(recurPeta, f);
  const depth = rv(recurDepth, f);
  const obs = rv(recurObsolete, f);

  const levelOn = (lv: number): number => {
    if (lv === 0) return clamp(nest * 2);
    if (lv === 1) return clamp(nest * 1.4 - 0.2);
    return clamp(stack * 1.2);
  };
  const cutY = TREE_TOP + 195;

  return (
    <g opacity={vis}>
      {/* 二重圧縮の殻（重ねても効かない）*/}
      {dbl > 0.02 && (
        <g opacity={dbl}>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={-150 + i * 14}
              y={STAGE_CY - 110 + i * 14}
              width={300 - i * 28}
              height={220 - i * 28}
              rx={14}
              fill={i === 2 ? SURFACE : 'none'}
              stroke={DIM}
              strokeWidth={3}
            />
          ))}
        </g>
      )}

      {/* 入れ子ツリー */}
      {nest > 0.02 && (
        <g>
          {/* 枝 */}
          {TREE_LV[1].xs.map((x, i) => (
            <line
              key={'b1' + i}
              x1={TREE_LV[0].xs[0]}
              y1={TREE_LV[0].y + 34}
              x2={x}
              y2={TREE_LV[1].y - 34}
              stroke={LIGHT}
              strokeWidth={3}
              opacity={levelOn(1) * 0.7}
            />
          ))}
          {TREE_LV[2].xs.map((x, i) => {
            const parent = TREE_LV[1].xs[Math.floor(i / 3)];
            return (
              <line
                key={'b2' + i}
                x1={parent}
                y1={TREE_LV[1].y + 28}
                x2={x}
                y2={TREE_LV[2].y - 28}
                stroke={hexLerp(LIGHT, DIM, obs)}
                strokeWidth={2.5}
                opacity={levelOn(2) * 0.6}
              />
            );
          })}
          {/* ノード */}
          {TREE_LV.map((lv, li) =>
            lv.xs.map((x, i) => {
              const on = levelOn(li);
              if (on <= 0.02) return null;
              const greyed = li === 2 && obs > 0.3 ? obs : 0;
              const r = li === 0 ? 34 : li === 1 ? 26 : 18;
              return (
                <g key={'n' + li + '_' + i} opacity={on}>
                  <rect
                    x={x - r}
                    y={lv.y - r}
                    width={r * 2}
                    height={r * 2}
                    rx={6}
                    fill={hexLerp(LIGHT_SOFT, SURFACE_SOFT, greyed)}
                    stroke={hexLerp(LIGHT, DIM, greyed)}
                    strokeWidth={3}
                  />
                </g>
              );
            }),
          )}
          {/* ×16 ラベル */}
          {nest > 0.5 && (
            <T x={360} y={TREE_LV[1].y - 60} s={FS_LABEL} fill={LIGHT_DARK} opacity={clamp(nest * 2 - 0.6)} w={900}>
              ×16
            </T>
          )}
          {stack > 0.4 && (
            <T x={520} y={TREE_LV[2].y} s={FS_NOTE} fill={LIGHT_DARK} opacity={clamp(stack * 1.6 - 0.4)}>
              5 段
            </T>
          )}
        </g>
      )}

      {/* 深さ打ち切り線＋封じ */}
      {depth > 0.02 && (
        <g opacity={depth}>
          <line x1={-560} y1={cutY} x2={560} y2={cutY} stroke={HEAVY} strokeWidth={5} strokeDasharray="14 10" />
          <T x={-560} y={cutY - 30} s={FS_NOTE} fill={HEAVY_DARK} anchor="start">展開深さの上限</T>
          {obs > 0.05 && (
            <rect x={-600} y={cutY} width={1200} height={TREE_TOP + 320 - cutY} fill={SURFACE} opacity={0.55 * obs} />
          )}
        </g>
      )}

      {/* 結果の数値 */}
      {peta > 0.05 && (
        <g opacity={peta}>
          <T x={0} y={250} s={FS_NUM} fill={HEAVY_DARK} w={900}>≈ 100 万個 × 1000 倍 = 4.5 PB</T>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面4 — 単発型（目次の細工）
// ============================================================
const singleIn = fadeIn(sceneStarts.single);
const singleFifield = sc([[F('single.fifield'), 0], [F('single.fifield') + 36, 1]]);
const singleStruct = sc([[F('single.struct'), 0], [F('single.struct') + 60, 1]]);
const singleTail = sc([[F('single.tail'), 0], [F('single.tail') + 50, 1]]);
const singlePoint = sc([[F('single.point'), 0], [F('single.point') + 64, 1]]);
const singleMulti = sc([[F('single.multi'), 0], [F('single.multi') + 90, 1]]);
const singleTera = sc([[F('single.tera'), 0], [F('single.tera') + 50, 1]]);
const singleDepth = sc([[F('single.depth1'), 0], [F('single.depth1') + 50, 1]]);

const ZIP_Y = -300;
const ZIP_X0 = -760;
const ZIP_X1 = 760;
const DIR_X = 520; // 巻末目次
const DATA = { cx: -60, cy: 60 }; // 単一の実体
const STACK_X = 540; // 書き出されたファイル
const ENTRY_X = -560;

const SceneSingle: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(singleIn, f);
  const fif = rv(singleFifield, f);
  const struct = rv(singleStruct, f);
  const tail = rv(singleTail, f);
  const point = rv(singlePoint, f);
  const multi = rv(singleMulti, f);
  const tera = rv(singleTera, f);
  const depth = rv(singleDepth, f);

  const entries = [0, 1, 2, 3];
  const eY = (i: number) => -110 + i * 96;

  return (
    <g opacity={vis}>
      {/* zip の帯（本文＋巻末目次）*/}
      <g opacity={inA}>
        <rect x={ZIP_X0} y={ZIP_Y - 34} width={ZIP_X1 - ZIP_X0} height={68} rx={12} fill={SURFACE} stroke={EDGE} strokeWidth={2.5} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={ZIP_X0 + 30 + i * 240} y={ZIP_Y - 22} width={210} height={44} rx={8} fill={LIGHT_SOFT} stroke={LIGHT} strokeWidth={2} />
        ))}
        <T x={ZIP_X0 + 360} y={ZIP_Y + 64} s={FS_NOTE} fill={SUB_INK}>本文</T>
        {/* 巻末目次 */}
        <rect
          x={DIR_X - 10}
          y={ZIP_Y - 34}
          width={ZIP_X1 - DIR_X - 20}
          height={68}
          rx={12}
          fill={hexLerp(SURFACE, METER_SOFT, clamp(struct))}
          stroke={hexLerp(EDGE, METER, clamp(struct))}
          strokeWidth={3}
        />
        <T x={(DIR_X + ZIP_X1) / 2 - 15} y={ZIP_Y} s={FS_NOTE} fill={struct > 0.4 ? METER_DARK : SUB_INK} w={800}>目次</T>
        {struct > 0.4 && <T x={(DIR_X + ZIP_X1) / 2 - 15} y={ZIP_Y + 64} s={FS_TINY} fill={SUB_INK} opacity={struct}>セントラルディレクトリ</T>}
      </g>

      {fif > 0.1 && <T x={0} y={ZIP_Y - 78} s={FS_NOTE} fill={LIGHT_DARK} opacity={fif} w={800}>Fifield, 2019</T>}

      {/* 巻末を読む視線 */}
      {tail > 0.05 && (
        <path
          d={'M ' + 0 + ' ' + (ZIP_Y + 90) + ' Q ' + 400 + ' ' + (ZIP_Y + 60) + ' ' + ((DIR_X + ZIP_X1) / 2 - 15) + ' ' + (ZIP_Y + 40)}
          fill="none"
          stroke={METER}
          strokeWidth={3.5}
          strokeDasharray="8 8"
          opacity={tail}
        />
      )}

      {/* 目次エントリ群（すべて同じ実体を指す）*/}
      {point > 0.02 &&
        entries.map((i) => {
          const ap = clamp(point * 5 - i - 0.2);
          if (ap <= 0.02) return null;
          return (
            <g key={i} opacity={ap}>
              <rect x={ENTRY_X - 70} y={eY(i) - 28} width={140} height={56} rx={8} fill={METER_SOFT} stroke={METER} strokeWidth={2.5} />
              <T x={ENTRY_X} y={eY(i)} s={FS_NOTE} fill={METER_DARK} w={700}>{'#' + (i + 1)}</T>
              <line x1={ENTRY_X + 74} y1={eY(i)} x2={DATA.cx - 78} y2={DATA.cy} stroke={METER} strokeWidth={3} opacity={0.8} />
            </g>
          );
        })}

      {/* 単一の実体 */}
      {point > 0.05 && (
        <g opacity={clamp(point * 1.4)}>
          <rect x={DATA.cx - 76} y={DATA.cy - 60} width={152} height={120} rx={12} fill={LIGHT_SOFT} stroke={LIGHT} strokeWidth={3.5} />
          <T x={DATA.cx} y={DATA.cy} s={FS_NOTE} fill={LIGHT_DARK} w={800}>1 実体</T>
        </g>
      )}

      {/* 書き出されたファイルの山 */}
      {multi > 0.02 && (
        <VolumeBlocks cx={STACK_X} cy={DATA.cy} opacity={clamp(multi * 1.4)} grow={multi} fill={HEAVY_SOFT} edge={HEAVY} />
      )}
      {point > 0.2 && <line x1={DATA.cx + 78} y1={DATA.cy} x2={STACK_X - GRID_W / 2 - 8} y2={DATA.cy} stroke={HEAVY} strokeWidth={5} strokeLinecap="round" opacity={clamp(multi * 1.5)} />}

      {/* 数値 */}
      {tera > 0.05 && (
        <T x={STACK_X} y={DATA.cy - GRID_H / 2 - 36} s={FS_NUM} fill={HEAVY_DARK} opacity={tera} w={900}>10 MB → 281 TB</T>
      )}

      {/* 深さ1で素通り */}
      {depth > 0.05 && (
        <g opacity={depth}>
          <line x1={-150} y1={250} x2={150} y2={250} stroke={DIM} strokeWidth={5} strokeDasharray="14 10" />
          <T x={0} y={210} s={FS_NOTE} fill={SUB_INK}>深さ 1</T>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — 律儀さが、引き金
// ============================================================
const triggerIn = fadeIn(sceneStarts.trigger);
const triggerHuman = sc([[F('trigger.human'), 0], [F('trigger.human') + 44, 1]]);
const triggerHumanOut = sc([[F('trigger.auto'), 1], [F('trigger.auto') + 44, 0]]);
const triggerAuto = sc([[F('trigger.auto'), 0], [F('trigger.auto') + 70, 1]]);
const triggerRes = sc([[F('trigger.resource'), 0], [F('trigger.resource') + 60, 1]]);
const triggerResFill = sc([
  [F('trigger.resource') + 10, 0],
  [F('trigger.dos'), 1],
  [TOTAL_FRAMES, 1],
]);
const triggerDos = sc([[F('trigger.dos'), 0], [F('trigger.dos') + 50, 1]]);
const triggerWho = sc([[F('trigger.who'), 0], [F('trigger.who') + 70, 1]]);
const triggerIrony = sc([[F('trigger.irony'), 0], [F('trigger.irony') + 50, 1]]);
const triggerCut = sc([[F('trigger.cut'), 0], [F('trigger.cut') + 56, 1]]);
const triggerLimit = sc([[F('trigger.limit'), 0], [F('trigger.limit') + 46, 1]]);
const triggerRatio = sc([[F('trigger.ratio'), 0], [F('trigger.ratio') + 50, 1]]);

const GEAR = { cx: -120, cy: STAGE_CY };
const RES_X = 560;
const RES_LABELS = ['ディスク', 'メモリ', 'CPU'];
const WHO_LABELS = ['アンチウイルス', 'メールGW', 'アップロード検査'];

const Gear: React.FC<{ cx: number; cy: number; r: number; opacity: number; color: string; soft: string }> = ({
  cx,
  cy,
  r,
  opacity,
  color,
  soft,
}) => {
  if (opacity <= 0.001) return null;
  const teeth = 10;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = ((i + 0.5) / teeth) * Math.PI * 2;
    pts.push((cx + Math.cos(a0) * (r + 12)).toFixed(1) + ',' + (cy + Math.sin(a0) * (r + 12)).toFixed(1));
    pts.push((cx + Math.cos(a1) * r).toFixed(1) + ',' + (cy + Math.sin(a1) * r).toFixed(1));
  }
  return (
    <g opacity={opacity}>
      <polygon points={pts.join(' ')} fill={soft} stroke={color} strokeWidth={3.5} />
      <circle cx={cx} cy={cy} r={r * 0.5} fill={SURFACE} stroke={color} strokeWidth={3} />
    </g>
  );
};

const SceneTrigger: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(triggerIn, f);
  const human = rv(triggerHuman, f) * rv(triggerHumanOut, f);
  const auto = rv(triggerAuto, f);
  const res = rv(triggerRes, f);
  const resFill = rv(triggerResFill, f);
  const dos = rv(triggerDos, f);
  const who = rv(triggerWho, f);
  const irony = rv(triggerIrony, f);
  const cut = rv(triggerCut, f);
  const limit = rv(triggerLimit, f);
  const ratio = rv(triggerRatio, f);

  const gearColor = hexLerp(LIGHT, HEAVY, clamp(Math.max(irony, dos)));
  const gearSoft = hexLerp(LIGHT_SOFT, HEAVY_SOFT, clamp(Math.max(irony, dos)));

  return (
    <g opacity={vis}>
      {/* 人間の手（深刻にならない側・薄く退く）*/}
      {human > 0.02 && (
        <g opacity={human}>
          <rect x={-160} y={STAGE_CY - 60} width={120} height={120} rx={12} fill={SURFACE} stroke={DIM} strokeWidth={3} />
        </g>
      )}

      {/* 検査機（歯車）＋呑み込む指示書 */}
      <Gear cx={GEAR.cx} cy={GEAR.cy} r={70} opacity={inA} color={gearColor} soft={gearSoft} />
      <T x={GEAR.cx} y={GEAR.cy} s={FS_NOTE} fill={gearColor} w={800} opacity={inA}>検査</T>

      {/* 律儀に展開された体積（歯車から膨らむ）*/}
      {auto > 0.02 && (
        <VolumeBlocks cx={GEAR.cx + 360} cy={GEAR.cy} opacity={clamp(auto * 1.4)} grow={clamp(auto)} fill={HEAVY_SOFT} edge={HEAVY} />
      )}
      {auto > 0.1 && (
        <line x1={GEAR.cx + 78} y1={GEAR.cy} x2={GEAR.cx + 360 - GRID_W / 2 - 8} y2={GEAR.cy} stroke={HEAVY} strokeWidth={5} strokeLinecap="round" opacity={clamp(auto * 1.6)} />
      )}

      {/* 資源バー（ディスク・メモリ・CPU）*/}
      {res > 0.02 && (
        <g opacity={clamp(res * 1.3) * (1 - clamp(cut * 1.2 - 0.4))}>
          {RES_LABELS.map((lb, i) => {
            const by = -150 + i * 95;
            const lvl = clamp(resFill * (1 + i * 0.1));
            return (
              <g key={i}>
                <T x={RES_X - 150} y={by} s={FS_TINY} fill={SUB_INK} anchor="end">{lb}</T>
                <rect x={RES_X - 130} y={by - 18} width={260} height={36} rx={8} fill={SURFACE} stroke={EDGE} strokeWidth={2} />
                <rect x={RES_X - 126} y={by - 14} width={252 * lvl} height={28} rx={6} fill={hexLerp(METER, HEAVY, lvl)} />
              </g>
            );
          })}
        </g>
      )}

      {/* サービス停止 */}
      {dos > 0.1 && (
        <T x={GEAR.cx} y={GEAR.cy + 130} s={FS_NOTE} fill={HEAVY_DARK} opacity={dos} w={800}>停止</T>
      )}

      {/* 検査する側の役割（順に灯る）*/}
      {who > 0.02 &&
        WHO_LABELS.map((lb, i) => {
          const ap = clamp(who * 4 - i - 0.2);
          if (ap <= 0.02) return null;
          const wx = -680 + i * 0;
          const wy = -150 + i * 80;
          return (
            <g key={i} opacity={ap * (1 - clamp(cut * 1.4 - 0.5))}>
              <rect x={wx - 10} y={wy - 28} width={250} height={56} rx={10} fill={LIGHT_SOFT} stroke={LIGHT} strokeWidth={2.5} />
              <T x={wx + 115} y={wy} s={FS_TINY} fill={LIGHT_DARK} w={700}>{lb}</T>
              <line x1={wx + 240} y1={wy} x2={GEAR.cx - 80} y2={GEAR.cy} stroke={LIGHT} strokeWidth={2} strokeDasharray="6 7" opacity={0.5} />
            </g>
          );
        })}

      {/* 防御：打ち切り線＋上限 */}
      {cut > 0.05 && (
        <g opacity={cut}>
          <line x1={GEAR.cx + 200} y1={GEAR.cy - 200} x2={GEAR.cx + 200} y2={GEAR.cy + 200} stroke={GUARD} strokeWidth={7} strokeLinecap="round" />
          {limit > 0.1 && <T x={GEAR.cx + 200} y={GEAR.cy - 240} s={FS_NOTE} fill={GUARD} opacity={limit} w={800}>サイズ・時間・深さの上限</T>}
        </g>
      )}

      {/* 圧縮率メーター（振り切れ＝隔離）*/}
      {ratio > 0.05 && (
        <g opacity={ratio}>
          <T x={-680} y={250} s={FS_NOTE} fill={GUARD} anchor="start" w={800}>圧縮率 &gt; 1000× → 隔離</T>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面6 — 結論（やさしさ→武器の反転、同じ家族）
// ============================================================
const outroIn = fadeIn(sceneStarts.outro);
const outroKind = sc([[F('outro.kindness'), 0], [F('outro.kindness') + 50, 1]]);
const outroWeapon = sc([[F('outro.weapon'), 0], [F('outro.weapon') + 60, 1]]);
const outroFamily = sc([[F('outro.family'), 0], [F('outro.family') + 50, 1]]);
const outroRedos = sc([[F('outro.redos'), 0], [F('outro.redos') + 50, 1]]);
const outroCommon = sc([[F('outro.common'), 0], [F('outro.common') + 56, 1]]);

const O_CARD = { cx: -430, cy: -110, w: 158 };
const O_BLK = { cx: 320, cy: -110 };
const FAM = [
  { x: -480, name: 'zip 爆弾' },
  { x: 0, name: 'Billion Laughs' },
  { x: 480, name: 'ReDoS' },
];
const FAM_Y = 230;

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(outroIn, f);
  const kind = rv(outroKind, f);
  const weapon = rv(outroWeapon, f);
  const family = rv(outroFamily, f);
  const redos = rv(outroRedos, f);
  const common = rv(outroCommon, f);

  const famOn = (i: number): number => {
    if (i === 0) return clamp(family * 1.6);
    if (i === 1) return clamp(family * 1.4 - 0.2);
    return clamp(redos * 1.4);
  };

  return (
    <g opacity={vis}>
      {/* 背骨の対比（カード↔塊）の回帰 */}
      <ExpandArrow
        x1={O_CARD.cx + O_CARD.w / 2 + 14}
        x2={O_BLK.cx - GRID_W / 2 - 14}
        y={O_CARD.cy}
        opacity={inA}
        color={weapon > 0.4 ? HEAVY : DIM}
        draw={1}
        flip={weapon > 0.4}
      />
      <InstructionCard
        cx={O_CARD.cx}
        cy={O_CARD.cy}
        w={O_CARD.w}
        opacity={inA}
        color={LIGHT}
        soft={LIGHT_SOFT}
        caption={kind > 0.4 ? 'やさしさ' : undefined}
      />
      <VolumeBlocks cx={O_BLK.cx} cy={O_BLK.cy} opacity={inA} grow={1} fill={HEAVY_SOFT} edge={HEAVY} />
      {weapon > 0.3 && (
        <T x={O_BLK.cx} y={O_BLK.cy + GRID_H / 2 + 36} s={FS_NOTE} fill={HEAVY_DARK} opacity={weapon} w={800}>武器</T>
      )}

      {/* 同じ非対称の家族 */}
      {family > 0.02 &&
        FAM.map((fm, i) => {
          const ap = famOn(i);
          if (ap <= 0.02) return null;
          return (
            <g key={i} opacity={ap}>
              <rect x={fm.x - 150} y={FAM_Y - 44} width={300} height={88} rx={14} fill={SURFACE} stroke={i === 0 ? HEAVY : EDGE} strokeWidth={i === 0 ? 3.5 : 2.5} />
              {/* 軽い指示→重い実行 の小アイコン */}
              <rect x={fm.x - 116} y={FAM_Y - 16} width={22} height={32} rx={3} fill={LIGHT_SOFT} stroke={LIGHT} strokeWidth={2} />
              <path d={'M ' + (fm.x - 86) + ' ' + FAM_Y + ' L ' + (fm.x - 58) + ' ' + FAM_Y} stroke={DIM} strokeWidth={3} strokeLinecap="round" />
              {[0, 1, 2, 3].map((k) => (
                <rect key={k} x={fm.x - 52 + (k % 2) * 18} y={FAM_Y - 16 + Math.floor(k / 2) * 18} width={15} height={15} rx={2} fill={HEAVY_SOFT} stroke={HEAVY} strokeWidth={1.5} />
              ))}
              <T x={fm.x + 50} y={FAM_Y} s={FS_TINY} fill={INK} w={700}>{fm.name}</T>
              {/* 共通の防御＝打ち切り線 */}
              {common > 0.05 && (
                <line x1={fm.x - 150} y1={FAM_Y + 60} x2={fm.x + 150} y2={FAM_Y + 60} stroke={GUARD} strokeWidth={5} strokeLinecap="round" opacity={clamp(common * 1.4 - i * 0.15)} />
              )}
            </g>
          );
        })}
    </g>
  );
};

// ============================================================
// セクションタイトル（画面跨ぎ・左上）
// ============================================================
const SCENE_TITLES: { start: number; text: string }[] = [
  { start: sceneStarts.intro, text: '序論' },
  { start: sceneStarts.comp, text: '01 圧縮の正体' },
  { start: sceneStarts.recur, text: '02 再帰型と、その封じ' },
  { start: sceneStarts.single, text: '03 単発型' },
  { start: sceneStarts.trigger, text: '04 律儀さが、引き金' },
  { start: sceneStarts.outro, text: '結論' },
];

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-918} y={-504} width={10} height={36} rx={5} fill={LIGHT} />
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
          <radialGradient id="zb_bgglow" cx="50%" cy="34%" r="82%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#zb_bgglow)" />

        <SceneIntro f={f} vis={rv(introVis, f)} />
        <SceneComp f={f} vis={rv(compVis, f)} />
        <SceneRecur f={f} vis={rv(recurVis, f)} />
        <SceneSingle f={f} vis={rv(singleVis, f)} />
        <SceneTrigger f={f} vis={rv(triggerVis, f)} />
        <SceneOutro f={f} vis={rv(outroVis, f)} />

        <SceneTitle text={SCENE_TITLES[titleIdx].text} opacity={titleOpacity} />
        <Subtitle frame={f} />
      </svg>
    </AbsoluteFill>
  );
};
