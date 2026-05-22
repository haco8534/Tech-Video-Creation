// [4] Remotion 実装 — public_key_crypto（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 対話字幕は SCRIPT 全行から自動描画（04_remotion.md §7）。
// 背骨は「開けた通信路の上を渡る箱」。装置はそれを閉じる／開く工程として連なる。
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

// ===== アクセント（公開鍵暗号の語彙）=====
const PUBLIC = '#2f8fb3'; // 公開鍵・配る錠前（ティール）
const PUBLIC_DARK = '#1f6a86';
const PUBLIC_SOFT = '#e2eff5';
const SECRET = '#d99a2b'; // 秘密鍵・手元に残す鍵・落とし戸（アンバー）
const SECRET_DARK = '#a8721a';
const SECRET_SOFT = '#fbeece';
const DANGER = '#d9543c'; // 盗み見・危険（コーラル）
const DANGER_SOFT = '#f7ddd6';
const OKC = '#3f9d57'; // 安全・確認・署名（グリーン）
const OKC_SOFT = '#dcefe0';
const WOOD = '#ead9bd';
const WOOD_DARK = '#c8ab7e';
const WOOD_EDGE = '#a98c5f';

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

// ===== 舞台の基準座標 =====
const CHANNEL_Y = 44;
const ROAD_X0 = -708;
const ROAD_X1 = 708;
const SENDER_X = -832;
const RECEIVER_X = 832;

// ============================================================
// 背骨の舞台：通信路（送り手と受け手をつなぐ、人目のある通り道）
// ============================================================
const Channel: React.FC<{ opacity: number }> = ({ opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect
        x={ROAD_X0}
        y={CHANNEL_Y - 34}
        width={ROAD_X1 - ROAD_X0}
        height={68}
        rx={34}
        fill={SURFACE_SOFT}
        stroke={EDGE}
        strokeWidth={2.5}
      />
      <line
        x1={ROAD_X0 + 38}
        y1={CHANNEL_Y}
        x2={ROAD_X1 - 38}
        y2={CHANNEL_Y}
        stroke={DIM}
        strokeWidth={3}
        strokeDasharray="15 16"
      />
    </g>
  );
};

// ============================================================
// 送り手・受け手（通信路の両端の人物）
// ============================================================
const Figure: React.FC<{ cx: number; label: string; opacity: number }> = ({
  cx,
  label,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const cy = CHANNEL_Y - 26;
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={cy + 70} rx={50} ry={11} fill={SHADOW} opacity={0.1} />
      <path
        d={
          'M ' + (cx - 40) + ' ' + (cy + 58) +
          ' Q ' + (cx - 33) + ' ' + (cy - 2) + ' ' + cx + ' ' + (cy - 2) +
          ' Q ' + (cx + 33) + ' ' + (cy - 2) + ' ' + (cx + 40) + ' ' + (cy + 58) + ' Z'
        }
        fill={SURFACE}
        stroke={EDGE}
        strokeWidth={3}
      />
      <circle cx={cx} cy={cy - 30} r={27} fill={SURFACE} stroke={EDGE} strokeWidth={3} />
      <text
        x={cx}
        y={cy + 92}
        fill={SUB_INK}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {label}
      </text>
    </g>
  );
};

// ============================================================
// のぞき見る目（通信路の中身は誰にでも見られうる）
// ============================================================
const WatchEye: React.FC<{ cx: number; cy: number; opacity: number; alert: number }> = ({
  cx,
  cy,
  opacity,
  alert,
}) => {
  if (opacity <= 0.001) return null;
  const col = hexLerp(SUB_INK, DANGER, clamp(alert));
  const w = 96;
  const h = 52;
  return (
    <g opacity={opacity}>
      <path
        d={
          'M ' + (cx - w) + ' ' + cy +
          ' Q ' + cx + ' ' + (cy - h) + ' ' + (cx + w) + ' ' + cy +
          ' Q ' + cx + ' ' + (cy + h) + ' ' + (cx - w) + ' ' + cy + ' Z'
        }
        fill={SURFACE}
        stroke={col}
        strokeWidth={5}
      />
      <circle cx={cx} cy={cy} r={30} fill={hexLerp(PUBLIC_SOFT, DANGER_SOFT, clamp(alert))} />
      <circle cx={cx} cy={cy} r={15} fill={col} />
      <circle cx={cx - 5} cy={cy - 5} r={5} fill={SURFACE} opacity={0.85} />
    </g>
  );
};

// ============================================================
// 手紙（箱の中身）
// ============================================================
const Letter: React.FC<{ cx: number; cy: number; w: number; opacity: number; danger: number }> = ({
  cx,
  cy,
  w,
  opacity,
  danger,
}) => {
  if (opacity <= 0.001) return null;
  const h = w * 0.74;
  const col = hexLerp(SUB_INK, DANGER, clamp(danger));
  const fill = hexLerp(SURFACE, DANGER_SOFT, clamp(danger));
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={5} fill={fill} stroke={col} strokeWidth={3} />
      <path
        d={'M ' + (cx - w / 2) + ' ' + (cy - h / 2) + ' L ' + cx + ' ' + cy + ' L ' + (cx + w / 2) + ' ' + (cy - h / 2)}
        fill="none"
        stroke={col}
        strokeWidth={3}
      />
      <line x1={cx - w * 0.28} y1={cy + h * 0.14} x2={cx + w * 0.28} y2={cy + h * 0.14} stroke={col} strokeWidth={3} />
      <line x1={cx - w * 0.28} y1={cy + h * 0.3} x2={cx + w * 0.14} y2={cy + h * 0.3} stroke={col} strokeWidth={3} />
    </g>
  );
};

// ============================================================
// 箱（秘密の中身を収める入れもの）。lid 0=閉 / 1=開。
// ============================================================
const Box: React.FC<{
  cx: number;
  cy: number;
  w: number;
  opacity: number;
  lid: number;
  msgDanger: number;
}> = ({ cx, cy, w, opacity, lid, msgDanger }) => {
  if (opacity <= 0.001) return null;
  const h = w * 0.76;
  const ox = cx - w / 2;
  const oy = cy - h / 2;
  const lidH = h * 0.3;
  const hingeX = ox;
  const hingeY = oy + lidH;
  const ang = -lid * 104;
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={oy + h + 12} rx={w * 0.54} ry={12} fill={SHADOW} opacity={0.1} />
      {/* 本体 */}
      <rect x={ox} y={oy + lidH * 0.4} width={w} height={h - lidH * 0.4} rx={9} fill={WOOD} stroke={WOOD_EDGE} strokeWidth={3.5} />
      <rect x={ox} y={oy + lidH * 0.4} width={w} height={lidH * 0.5} fill={WOOD_DARK} opacity={0.55} />
      <line x1={cx} y1={oy + lidH} x2={cx} y2={oy + h - 6} stroke={WOOD_EDGE} strokeWidth={2.5} opacity={0.6} />
      {/* 中の手紙（ふたが開くと見える）*/}
      <Letter cx={cx} cy={oy + h * 0.52} w={w * 0.52} opacity={clamp(lid * 2)} danger={msgDanger} />
      {/* ふた */}
      <g transform={'rotate(' + ang + ' ' + hingeX + ' ' + hingeY + ')'}>
        <rect x={ox} y={oy} width={w} height={lidH} rx={8} fill={WOOD_DARK} stroke={WOOD_EDGE} strokeWidth={3.5} />
        <rect x={cx - w * 0.12} y={oy + lidH - 9} width={w * 0.24} height={13} rx={3} fill={WOOD_EDGE} />
      </g>
    </g>
  );
};

// ============================================================
// 南京錠（「閉める」操作）。shackle 0=閉 / 1=開。
// ============================================================
const Padlock: React.FC<{
  cx: number;
  cy: number;
  scale: number;
  opacity: number;
  shackle: number;
  color: string;
  soft: string;
}> = ({ cx, cy, scale, opacity, shackle, color, soft }) => {
  if (opacity <= 0.001) return null;
  const w = 96 * scale;
  const h = 80 * scale;
  const bodyTop = cy - h / 2;
  const legDx = w * 0.27;
  const archTop = bodyTop - h * 0.52;
  const sw = 15 * scale;
  const archD =
    'M ' + (cx - legDx) + ' ' + (bodyTop + 4) +
    ' L ' + (cx - legDx) + ' ' + archTop +
    ' A ' + legDx + ' ' + legDx + ' 0 0 1 ' + (cx + legDx) + ' ' + archTop +
    ' L ' + (cx + legDx) + ' ' + (bodyTop + 4);
  const ang = -shackle * 56;
  const kh = cy + h * 0.04;
  return (
    <g opacity={opacity}>
      <g transform={'rotate(' + ang + ' ' + (cx - legDx) + ' ' + bodyTop + ')'}>
        <path d={archD} fill="none" stroke={hexLerp('#9aa6b8', color, 0.55)} strokeWidth={sw} strokeLinecap="round" />
      </g>
      <rect
        x={cx - w / 2}
        y={bodyTop}
        width={w}
        height={h}
        rx={16 * scale}
        fill={soft}
        stroke={color}
        strokeWidth={4 * scale}
      />
      <circle cx={cx} cy={kh} r={10 * scale} fill={color} />
      <path
        d={'M ' + cx + ' ' + kh + ' L ' + (cx - 7 * scale) + ' ' + (kh + 22 * scale) + ' L ' + (cx + 7 * scale) + ' ' + (kh + 22 * scale) + ' Z'}
        fill={color}
      />
    </g>
  );
};

// ============================================================
// 鍵（「開ける」操作。手元に残す秘密鍵）
// ============================================================
const KeyShape: React.FC<{
  cx: number;
  cy: number;
  scale: number;
  opacity: number;
  color: string;
  rot: number;
}> = ({ cx, cy, scale, opacity, color, rot }) => {
  if (opacity <= 0.001) return null;
  const bowR = 20 * scale;
  const shaftLen = 74 * scale;
  return (
    <g opacity={opacity} transform={'rotate(' + rot + ' ' + cx + ' ' + cy + ')'}>
      <circle cx={cx - shaftLen / 2} cy={cy} r={bowR} fill="none" stroke={color} strokeWidth={9 * scale} />
      <rect x={cx - shaftLen / 2 + bowR * 0.6} y={cy - 6 * scale} width={shaftLen} height={12 * scale} rx={3} fill={color} />
      <rect x={cx + shaftLen / 2 - 6 * scale} y={cy + 4 * scale} width={11 * scale} height={20 * scale} rx={2} fill={color} />
      <rect x={cx + shaftLen / 2 - 32 * scale} y={cy + 4 * scale} width={11 * scale} height={14 * scale} rx={2} fill={color} />
    </g>
  );
};

// ============================================================
// 確認バッジ（✓ 安全・署名 / ✗ 破られた）
// ============================================================
const Badge: React.FC<{ cx: number; cy: number; r: number; opacity: number; ok: boolean }> = ({
  cx,
  cy,
  r,
  opacity,
  ok,
}) => {
  if (opacity <= 0.001) return null;
  const col = ok ? OKC : DANGER;
  const soft = ok ? OKC_SOFT : DANGER_SOFT;
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill={soft} stroke={col} strokeWidth={4} />
      {ok ? (
        <path
          d={'M ' + (cx - r * 0.42) + ' ' + cy + ' L ' + (cx - r * 0.08) + ' ' + (cy + r * 0.38) + ' L ' + (cx + r * 0.46) + ' ' + (cy - r * 0.36)}
          fill="none"
          stroke={col}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <g stroke={col} strokeWidth={6} strokeLinecap="round">
          <line x1={cx - r * 0.4} y1={cy - r * 0.4} x2={cx + r * 0.4} y2={cy + r * 0.4} />
          <line x1={cx + r * 0.4} y1={cy - r * 0.4} x2={cx - r * 0.4} y2={cy + r * 0.4} />
        </g>
      )}
    </g>
  );
};

// ============================================================
// 数のタイル（ボディ2：掛け算と素因数分解）
// ============================================================
const NumTile: React.FC<{
  cx: number;
  cy: number;
  size: number;
  opacity: number;
  label: string;
  fill: string;
  stroke: string;
  textColor: string;
}> = ({ cx, cy, size, opacity, label, fill, stroke, textColor }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} rx={14} fill={fill} stroke={stroke} strokeWidth={3} />
      <text
        x={cx}
        y={cy}
        fill={textColor}
        fontSize={size * 0.4}
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
// 工程アイコン（結論の振り返り）
// ============================================================
const STAGE_LABELS = ['人目の道', '錠前と鍵を分ける', '片道の計算', '署名'];
const StageIcon: React.FC<{ cx: number; cy: number; kind: number; opacity: number }> = ({
  cx,
  cy,
  kind,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={cx - 66} y={cy - 50} width={132} height={104} rx={16} fill={SHADOW} opacity={0.1} />
      <rect x={cx - 66} y={cy - 56} width={132} height={104} rx={16} fill={SURFACE} stroke={EDGE} strokeWidth={2} />
      {kind === 0 && (
        <g>
          <line x1={cx - 40} y1={cy + 14} x2={cx + 40} y2={cy + 14} stroke={DIM} strokeWidth={6} strokeDasharray="8 8" />
          <path
            d={'M ' + (cx - 32) + ' ' + (cy - 18) + ' Q ' + cx + ' ' + (cy - 40) + ' ' + (cx + 32) + ' ' + (cy - 18) + ' Q ' + cx + ' ' + (cy + 4) + ' ' + (cx - 32) + ' ' + (cy - 18) + ' Z'}
            fill={SURFACE}
            stroke={DANGER}
            strokeWidth={3.5}
          />
          <circle cx={cx} cy={cy - 18} r={9} fill={DANGER} />
        </g>
      )}
      {kind === 1 && (
        <g>
          <Padlock cx={cx - 26} cy={cy - 6} scale={0.42} opacity={1} shackle={0} color={PUBLIC} soft={PUBLIC_SOFT} />
          <KeyShape cx={cx + 30} cy={cy - 4} scale={0.5} opacity={1} color={SECRET} rot={50} />
        </g>
      )}
      {kind === 2 && (
        <g>
          <line x1={cx - 38} y1={cy - 14} x2={cx + 30} y2={cy - 14} stroke={OKC} strokeWidth={6} strokeLinecap="round" />
          <path d={'M ' + (cx + 22) + ' ' + (cy - 24) + ' L ' + (cx + 40) + ' ' + (cy - 14) + ' L ' + (cx + 22) + ' ' + (cy - 4)} fill="none" stroke={OKC} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <line x1={cx - 38} y1={cy + 20} x2={cx + 30} y2={cy + 20} stroke={DANGER} strokeWidth={6} strokeLinecap="round" strokeDasharray="7 9" />
          <path d={'M ' + (cx - 30) + ' ' + (cy + 10) + ' L ' + (cx - 40) + ' ' + (cy + 20) + ' L ' + (cx - 30) + ' ' + (cy + 30)} fill="none" stroke={DANGER} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {kind === 3 && <Badge cx={cx} cy={cy - 4} r={32} opacity={1} ok />}
      <text
        x={cx}
        y={cy + 80}
        fill={SUB_INK}
        fontSize={FS_TINY}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {STAGE_LABELS[kind]}
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
const body3Vis = midVis(sceneStarts.body3, sceneStarts.outro);
const outroVis = sc([
  [sceneStarts.outro, 0],
  [sceneStarts.outro + CROSSFADE, 1],
  [TOTAL_FRAMES, 1],
]);

const BOX_W = 150;
const BOX_CY = CHANNEL_Y - 78;

// ============================================================
// 画面1 — 序論「人目のある通信路」
// ============================================================
const introIn = sc([
  [8, 0],
  [42, 1],
]);
const introEye = sc([
  [F('intro.channel'), 0],
  [F('intro.channel') + 40, 1],
]);
const introBoxX = sc([
  [0, -360],
  [F('intro.channel'), -360],
  [F('intro.channel') + 78, -40],
  [TOTAL_FRAMES, -40],
]);
const introLid = sc([
  [0, 1],
  [F('intro.naive'), 1],
  [F('intro.naive') + 48, 0],
  [TOTAL_FRAMES, 0],
]);
const introMsgDanger = sc([
  [F('intro.channel') + 8, 0],
  [F('intro.channel') + 50, 1],
  [F('intro.naive'), 1],
  [F('intro.naive') + 30, 0],
  [TOTAL_FRAMES, 0],
]);
const introNaive = sc([
  [F('intro.naive'), 0],
  [F('intro.naive') + 40, 1],
]);
const introLockShackle = sc([
  [F('intro.naive') + 8, 1],
  [F('intro.naive') + 54, 0],
]);
const introKeyTravel = sc([
  [F('intro.keyleak'), 0],
  [F('intro.keyleak') + 74, 1],
]);
const introCaught = sc([
  [F('intro.keyleak') + 40, 0],
  [F('intro.keyleak') + 74, 1],
  [F('intro.name'), 1],
  [F('intro.name') + 44, 0],
]);
const introTitle = sc([
  [F('intro.name') + 12, 0],
  [F('intro.name') + 56, 1],
]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(introIn, f);
  const eye = rv(introEye, f);
  const boxX = rv(introBoxX, f);
  const lid = rv(introLid, f);
  const msgD = rv(introMsgDanger, f);
  const naive = rv(introNaive, f);
  const shackle = rv(introLockShackle, f);
  const keyT = rv(introKeyTravel, f);
  const caught = rv(introCaught, f);
  const title = rv(introTitle, f);

  const keyX = lerp(boxX + 120, RECEIVER_X - 220, keyT);
  const keyAlert = clamp(keyT * 1.7 - 0.5);
  const eyeAlert = Math.max(msgD, caught);

  return (
    <g opacity={vis}>
      <Channel opacity={inA} />
      <Figure cx={SENDER_X} label="送り手" opacity={inA} />
      <Figure cx={RECEIVER_X} label="受け手" opacity={inA} />

      {/* のぞき見る目と視線 */}
      {eye > 0.02 && (caught > 0.02 || msgD > 0.02) && (
        <line
          x1={0}
          y1={-238}
          x2={caught > 0.02 ? keyX : boxX}
          y2={caught > 0.02 ? CHANNEL_Y : BOX_CY}
          stroke={DANGER}
          strokeWidth={3}
          strokeDasharray="7 8"
          opacity={0.5 * Math.max(msgD, caught)}
        />
      )}
      <WatchEye cx={0} cy={-272} opacity={eye} alert={eyeAlert} />

      {/* 主役の箱 */}
      <Box cx={boxX} cy={BOX_CY} w={BOX_W} opacity={inA} lid={lid} msgDanger={msgD} />

      {/* 素朴な錠前（箱の前面で閉じる）*/}
      <Padlock
        cx={boxX}
        cy={BOX_CY + 6}
        scale={0.66}
        opacity={naive}
        shackle={shackle}
        color={SUB_INK}
        soft={SURFACE_SOFT}
      />

      {/* 素朴な鍵（漏れて通信路を進む）*/}
      {naive > 0.02 && (
        <KeyShape
          cx={keyX}
          cy={CHANNEL_Y + (keyT > 0.02 ? 0 : -150)}
          scale={0.62}
          opacity={naive}
          color={hexLerp(SUB_INK, DANGER, keyAlert)}
          rot={keyT > 0.02 ? 8 : 70}
        />
      )}

      {/* 破られた印 */}
      <Badge cx={boxX + 92} cy={BOX_CY - 64} r={34} opacity={caught} ok={false} />
      {caught > 0.05 && (
        <text
          x={boxX}
          y={BOX_CY - 116}
          fill={DANGER}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={caught}
        >
          鍵を見られたら、開けられてしまう
        </text>
      )}

      {/* タイトル */}
      <g opacity={title}>
        <text
          x={0}
          y={194}
          fill={PUBLIC_DARK}
          fontSize={FS_TITLE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
        >
          公開鍵暗号
        </text>
        <text
          x={0}
          y={252}
          fill={SUB_INK}
          fontSize={FS_SCENE}
          fontFamily={FONT}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
        >
          ── なぜ鍵を渡さずに秘密を送れるのか
        </text>
      </g>
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「錠前と鍵を、別々のものにする」
// ============================================================
const B1_PUB = 5;
const b1In = sc([
  [sceneStarts.body1 + 8, 0],
  [sceneStarts.body1 + CROSSFADE + 18, 1],
]);
const b1Demo = sc([
  [sceneStarts.body1, 0],
  [sceneStarts.body1 + CROSSFADE + 18, 1],
  [F('b1.publish'), 1],
  [F('b1.publish') + 44, 0],
]);
const b1Snap = sc([
  [F('b1.snap'), 1],
  [F('b1.snap') + 46, 0],
]);
const b1Key = sc([
  [F('b1.pair'), 0],
  [F('b1.pair') + 44, 1],
]);
const b1KeyHand = sc([
  [F('b1.pair') + 20, 0],
  [F('b1.pair') + 70, 1],
]);
const b1Publish = sc([
  [F('b1.publish'), 0],
  [F('b1.publish') + 96, 1],
]);
const b1BoxIn = sc([
  [F('b1.lock'), 0],
  [F('b1.lock') + 30, 1],
]);
const b1BoxX = sc([
  [F('b1.lock'), SENDER_X + 168],
  [F('b1.lock') + 40, SENDER_X + 168],
  [F('b1.lock') + 168, RECEIVER_X - 196],
  [TOTAL_FRAMES, RECEIVER_X - 196],
]);
const b1BoxLid = sc([
  [F('b1.lock'), 1],
  [F('b1.lock') + 42, 0],
  [F('b1.open'), 0],
  [F('b1.open') + 46, 1],
  [TOTAL_FRAMES, 1],
]);
const b1BoxShackle = sc([
  [F('b1.lock') + 10, 1],
  [F('b1.lock') + 50, 0],
  [F('b1.open'), 0],
  [F('b1.open') + 44, 1],
  [TOTAL_FRAMES, 1],
]);
const b1Open = sc([
  [F('b1.open'), 0],
  [F('b1.open') + 48, 1],
]);

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1In, f);
  const demo = rv(b1Demo, f);
  const snap = rv(b1Snap, f);
  const keyA = rv(b1Key, f);
  const keyHand = rv(b1KeyHand, f);
  const publish = rv(b1Publish, f);
  const boxIn = rv(b1BoxIn, f);
  const boxX = rv(b1BoxX, f);
  const boxLid = rv(b1BoxLid, f);
  const boxShk = rv(b1BoxShackle, f);
  const open = rv(b1Open, f);

  const demoX = -150;
  const demoY = -188;
  const handX = RECEIVER_X - 8;
  const handY = CHANNEL_Y - 188;
  const keyX = lerp(demoX + 150, handX, keyHand);
  const keyY = lerp(demoY, handY, keyHand);

  return (
    <g opacity={vis}>
      <Channel opacity={inA} />
      <Figure cx={SENDER_X} label="送り手" opacity={inA} />
      <Figure cx={RECEIVER_X} label="受け手" opacity={inA} />

      {/* 中央の南京錠（鍵なしで閉まる実演）*/}
      <Padlock
        cx={demoX}
        cy={demoY}
        scale={1.18}
        opacity={demo}
        shackle={rv(b1Snap, f)}
        color={PUBLIC}
        soft={PUBLIC_SOFT}
      />
      {snap < 0.6 && demo > 0.5 && (
        <text
          x={demoX}
          y={demoY - 132}
          fill={SUB_INK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={demo * clamp(2 - snap * 3)}
        >
          押せば、鍵なしで閉まる
        </text>
      )}

      {/* 対の鍵（手元へ収まる＝秘密鍵）*/}
      <KeyShape cx={keyX} cy={keyY} scale={0.78} opacity={Math.max(keyA * (1 - publish), keyHand)} color={SECRET} rot={keyHand > 0.04 ? 64 : 22} />
      {keyHand > 0.5 && (
        <text
          x={handX}
          y={handY + 60}
          fill={SECRET_DARK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={keyHand}
        >
          秘密鍵（手元に残す）
        </text>
      )}

      {/* 配られる公開鍵の群れ */}
      {publish > 0.01 &&
        Array.from({ length: B1_PUB }).map((_, i) => {
          const ap = clamp(publish * (B1_PUB + 1.4) - i);
          if (ap <= 0.01) return null;
          const px = ROAD_X1 - 150 - i * 322;
          return <Padlock key={i} cx={px} cy={CHANNEL_Y} scale={0.5} opacity={ap * 0.96} shackle={1} color={PUBLIC} soft={PUBLIC_SOFT} />;
        })}
      {publish > 0.3 && (
        <text
          x={0}
          y={CHANNEL_Y + 78}
          fill={PUBLIC_DARK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(publish * 2 - 0.6) * (1 - boxIn)}
        >
          公開鍵 ── いくつ配ってもよい
        </text>
      )}

      {/* 送り手が錠前で閉じた箱（通信路を渡る）*/}
      <Box cx={boxX} cy={BOX_CY} w={BOX_W} opacity={boxIn} lid={boxLid} msgDanger={0} />
      <Padlock cx={boxX} cy={BOX_CY + 6} scale={0.6} opacity={boxIn} shackle={boxShk} color={PUBLIC} soft={PUBLIC_SOFT} />

      {/* 受け手の鍵が箱を開ける */}
      {open > 0.02 && (
        <KeyShape cx={boxX + lerp(150, 4, open)} cy={BOX_CY + 6} scale={0.6} opacity={open} color={SECRET} rot={20} />
      )}
      <Badge cx={boxX + 96} cy={BOX_CY - 66} r={32} opacity={open} ok />
      {open > 0.4 && (
        <text
          x={boxX}
          y={BOX_CY - 118}
          fill={OKC}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(open * 1.6 - 0.6)}
        >
          鍵は一度も通信路を通っていない
        </text>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2「閉める計算と、開ける計算」
// ============================================================
const PRIME_X = -474;
const PROD_X = 470;
const b2In = sc([
  [sceneStarts.body2 + 8, 0],
  [sceneStarts.body2 + CROSSFADE + 18, 1],
]);
const b2Shell = sc([
  [sceneStarts.body2, 1],
  [F('b2.inside'), 1],
  [F('b2.inside') + 50, 0],
]);
const b2Board = sc([
  [F('b2.inside') + 16, 0],
  [F('b2.inside') + 60, 1],
]);
const b2Forward = sc([
  [F('b2.forward'), 0],
  [F('b2.forward') + 56, 1],
]);
const b2Backward = sc([
  [F('b2.backward'), 0],
  [F('b2.backward') + 60, 1],
]);
const b2Trapdoor = sc([
  [F('b2.trapdoor'), 0],
  [F('b2.trapdoor') + 58, 1],
]);
const b2Caveat = sc([
  [F('b2.caveat'), 0],
  [F('b2.caveat') + 48, 1],
]);

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2In, f);
  const shell = rv(b2Shell, f);
  const board = rv(b2Board, f);
  const fwd = rv(b2Forward, f);
  const bwd = rv(b2Backward, f);
  const trap = rv(b2Trapdoor, f);
  const caveat = rv(b2Caveat, f);

  const fY = -226;
  const bY = 96;
  const wallX = 150;
  const p1x = lerp(PRIME_X - 70, PRIME_X - 66, fwd);
  const p2x = lerp(PRIME_X + 70, PRIME_X + 66, fwd);

  return (
    <g opacity={vis}>
      {/* 錠前の殻（開いて中身＝計算盤になる）*/}
      <g opacity={shell * inA}>
        <Padlock cx={0} cy={-30} scale={2.5} opacity={1} shackle={0} color={PUBLIC} soft={PUBLIC_SOFT} />
        {shell > 0.6 && (
          <text x={0} y={210} fill={SUB_INK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            錠前の正体は？
          </text>
        )}
      </g>

      <g opacity={board * inA}>
        {/* 計算盤の枠 */}
        <rect x={-862} y={-356} width={1724} height={616} rx={22} fill={SURFACE} stroke={EDGE} strokeWidth={2.5} />

        {/* 二つの素数タイル */}
        <NumTile cx={p1x} cy={-66} size={118} opacity={1} label="61" fill={SECRET_SOFT} stroke={SECRET} textColor={SECRET_DARK} />
        <NumTile cx={p2x} cy={-66} size={118} opacity={1} label="53" fill={SECRET_SOFT} stroke={SECRET} textColor={SECRET_DARK} />
        <text x={PRIME_X} y={-160} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
          ふたつの素数
        </text>

        {/* 積のタイル */}
        <NumTile cx={PROD_X} cy={-66} size={168} opacity={clamp(fwd * 1.4)} label="3233" fill={PUBLIC_SOFT} stroke={PUBLIC} textColor={PUBLIC_DARK} />
        <text x={PROD_X} y={-186} fill={SUB_INK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={clamp(fwd * 1.4)}>
          掛けた答え
        </text>

        {/* 行きの道（閉じる＝やさしい）*/}
        <g opacity={fwd}>
          <line x1={PRIME_X + 100} y1={fY} x2={PROD_X - 130} y2={fY} stroke={OKC} strokeWidth={7} strokeLinecap="round" />
          <path d={'M ' + (PROD_X - 150) + ' ' + (fY - 14) + ' L ' + (PROD_X - 118) + ' ' + fY + ' L ' + (PROD_X - 150) + ' ' + (fY + 14)} fill="none" stroke={OKC} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
          <text x={(PRIME_X + PROD_X) / 2 - 14} y={fY - 40} fill={OKC} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            掛ける ── 行きはやさしい
          </text>
        </g>

        {/* 帰りの道（開ける＝険しい・壁）*/}
        <g opacity={bwd}>
          <text x={(PRIME_X + PROD_X) / 2 + 14} y={bY - 64} fill={DANGER} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            もとに戻す ── 帰りは険しい
          </text>
          {/* 険しい壁 */}
          <path
            d={
              'M ' + (wallX - 26) + ' ' + (bY - 56) +
              ' L ' + (wallX + 8) + ' ' + (bY - 34) +
              ' L ' + (wallX - 18) + ' ' + (bY - 6) +
              ' L ' + (wallX + 14) + ' ' + (bY + 22) +
              ' L ' + (wallX - 20) + ' ' + (bY + 50) +
              ' L ' + (wallX + 10) + ' ' + (bY + 78) +
              ' L ' + (wallX - 26) + ' ' + (bY + 104)
            }
            fill="none"
            stroke={DANGER}
            strokeWidth={9}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* 帰りの矢印（壁の前で詰まる）*/}
          <line x1={PROD_X - 110} y1={bY} x2={wallX + 54} y2={bY} stroke={DANGER} strokeWidth={6} strokeLinecap="round" strokeDasharray="9 11" />
          {/* 総当たりの試しタイル */}
          {[0, 1, 2].map((i) => {
            const tx = wallX - 150 - i * 150;
            const ap = clamp(bwd * 3.6 - i - 0.4);
            if (ap <= 0.01) return null;
            return (
              <g key={i} opacity={ap}>
                <rect x={tx - 52} y={bY - 40} width={104} height={80} rx={10} fill={SURFACE_SOFT} stroke={DIM} strokeWidth={2.5} />
                <text x={tx} y={bY - 6} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
                  ÷ ?
                </text>
                <text x={tx} y={bY + 22} fill={DANGER} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
                  ✗
                </text>
              </g>
            );
          })}
        </g>

        {/* 落とし戸＋近道 */}
        <g opacity={trap}>
          <path
            d={'M ' + (PROD_X - 40) + ' ' + (bY + 70) + ' Q ' + (wallX + 40) + ' ' + 252 + ' ' + (PRIME_X + 120) + ' ' + (bY + 70)}
            fill="none"
            stroke={SECRET}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <path d={'M ' + (PRIME_X + 148) + ' ' + (bY + 56) + ' L ' + (PRIME_X + 112) + ' ' + (bY + 70) + ' L ' + (PRIME_X + 148) + ' ' + (bY + 84)} fill="none" stroke={SECRET} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={wallX - 24} y={bY - 4} width={48} height={62} rx={6} fill={SECRET_SOFT} stroke={SECRET} strokeWidth={3} />
          <circle cx={wallX + 12} cy={bY + 27} r={6} fill={SECRET} />
          <text x={wallX + 36} y={252} fill={SECRET_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            落とし戸＝秘密鍵の近道
          </text>
        </g>

        {/* 「現実的な時間」を示す砂時計 */}
        <g opacity={caveat}>
          <g transform={'translate(' + (wallX + 96) + ' ' + (bY - 86) + ')'}>
            <path d="M -20 -22 L 20 -22 L 4 0 L 20 22 L -20 22 L -4 0 Z" fill={SURFACE} stroke={SUB_INK} strokeWidth={3} />
            <path d="M -12 -16 L 12 -16 L 0 -2 Z" fill={SUB_INK} opacity={0.55} />
          </g>
          <text x={wallX + 96} y={bY - 36} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            現実的な時間では
          </text>
        </g>
      </g>
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3「同じ鍵で、送り主を確かめる」
// ============================================================
const B3_PEOPLE = 3;
const b3In = sc([
  [sceneStarts.body3 + 8, 0],
  [sceneStarts.body3 + CROSSFADE + 18, 1],
]);
const b3Reverse = sc([
  [F('b3.reverse'), 0],
  [F('b3.reverse') + 54, 1],
]);
const b3BoxX = sc([
  [F('b3.reverse'), RECEIVER_X - 196],
  [F('b3.anyopen'), RECEIVER_X - 196],
  [F('b3.anyopen') + 150, SENDER_X + 252],
  [TOTAL_FRAMES, SENDER_X + 252],
]);
const b3BoxLid = sc([
  [sceneStarts.body3, 1],
  [F('b3.reverse'), 1],
  [F('b3.reverse') + 48, 0],
  [F('b3.anyopen') + 60, 0],
  [F('b3.anyopen') + 116, 1],
  [TOTAL_FRAMES, 1],
]);
const b3Anyopen = sc([
  [F('b3.anyopen'), 0],
  [F('b3.anyopen') + 70, 1],
]);
const b3Sign = sc([
  [F('b3.sign'), 0],
  [F('b3.sign') + 56, 1],
]);

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3In, f);
  const reverse = rv(b3Reverse, f);
  const boxX = rv(b3BoxX, f);
  const boxLid = rv(b3BoxLid, f);
  const anyopen = rv(b3Anyopen, f);
  const sign = rv(b3Sign, f);

  const handX = RECEIVER_X - 6;
  const handY = CHANNEL_Y - 196;
  const sealColor = SECRET;

  return (
    <g opacity={vis}>
      <Channel opacity={inA} />
      <Figure cx={SENDER_X} label="受け手" opacity={inA} />

      {/* 受け手の手元の秘密鍵 */}
      <KeyShape
        cx={lerp(handX, boxX + 4, clamp(reverse * 1.3) * (1 - anyopen))}
        cy={lerp(handY, BOX_CY + 6, clamp(reverse * 1.3) * (1 - anyopen))}
        scale={0.78}
        opacity={inA}
        color={SECRET}
        rot={reverse > 0.04 ? 20 : 64}
      />
      <text
        x={handX}
        y={handY + 58}
        fill={SECRET_DARK}
        fontSize={FS_NOTE}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        opacity={inA * (1 - anyopen)}
      >
        秘密鍵で閉じる
      </text>

      {/* 配られた公開鍵を持つ受け取る人々 */}
      {anyopen > 0.02 &&
        Array.from({ length: B3_PEOPLE }).map((_, i) => {
          const ap = clamp(anyopen * 3.4 - i - 0.2);
          if (ap <= 0.01) return null;
          const px = SENDER_X + 256 + i * 6;
          return (
            <g key={i} opacity={ap}>
              <Padlock cx={px - 130 - i * 150} cy={CHANNEL_Y} scale={0.46} opacity={1} shackle={1} color={PUBLIC} soft={PUBLIC_SOFT} />
            </g>
          );
        })}
      {anyopen > 0.3 && (
        <text
          x={SENDER_X + 360}
          y={CHANNEL_Y + 78}
          fill={PUBLIC_DARK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(anyopen * 2 - 0.6)}
        >
          公開鍵を持つ人なら、誰でも開ける
        </text>
      )}

      {/* 主役の箱（秘密鍵で閉じ、公開鍵で開く）*/}
      <Box cx={boxX} cy={BOX_CY} w={BOX_W} opacity={inA} lid={boxLid} msgDanger={0} />
      <Padlock
        cx={boxX}
        cy={BOX_CY + 6}
        scale={0.6}
        opacity={inA * clamp(reverse * 2)}
        shackle={anyopen}
        color={sealColor}
        soft={SECRET_SOFT}
      />

      {/* 署名の印 */}
      <Badge cx={boxX} cy={BOX_CY - 88} r={38} opacity={sign} ok />
      {sign > 0.3 && (
        <g opacity={clamp(sign * 1.5 - 0.5)}>
          <text
            x={boxX}
            y={BOX_CY - 152}
            fill={OKC}
            fontSize={FS_LABEL}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            署名 ── 送り主の印
          </text>
          <line
            x1={boxX + 40}
            y1={BOX_CY - 88}
            x2={handX - 40}
            y2={handY}
            stroke={SECRET}
            strokeWidth={3}
            strokeDasharray="7 8"
          />
          <text
            x={(boxX + handX) / 2}
            y={BOX_CY - 184}
            fill={SECRET_DARK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            閉じられたのは、秘密鍵を持つただ一人
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — 結論「鍵を渡さずに、秘密を送る」
// ============================================================
const b5In = sc([
  [sceneStarts.outro + 8, 0],
  [sceneStarts.outro + CROSSFADE + 18, 1],
]);
const b5Recap = sc([
  [F('outro.recap'), 0],
  [F('outro.recap') + 320, 1],
]);
const b5Loop = sc([
  [F('outro.loopback'), 0],
  [F('outro.loopback') + 50, 1],
  [F('outro.end'), 1],
  [F('outro.end') + 36, 0],
]);
const b5BoxLid = sc([
  [sceneStarts.outro, 1],
  [F('outro.recap') + 60, 0],
  [F('outro.recap') + 230, 0],
  [F('outro.recap') + 300, 1],
  [F('outro.loopback'), 0],
  [F('outro.end'), 0],
  [F('outro.end') + 60, 1],
  [TOTAL_FRAMES, 1],
]);
const b5End = sc([
  [F('outro.end'), 0],
  [F('outro.end') + 64, 1],
]);

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b5In, f);
  const recap = rv(b5Recap, f);
  const loop = rv(b5Loop, f);
  const boxLid = rv(b5BoxLid, f);
  const end = rv(b5End, f);

  const iconX = [-660, -222, 222, 660];
  const boxX = 0;
  const shackleOn = clamp(loop * 2) * (1 - end);

  return (
    <g opacity={vis}>
      {/* 工程アイコンの帯 */}
      {iconX.map((x, i) => (
        <StageIcon key={i} cx={x} cy={-296} kind={i} opacity={inA * clamp(recap * 5 - i - 0.15)} />
      ))}

      <Channel opacity={inA} />
      <Figure cx={SENDER_X} label="送り手" opacity={inA} />
      <Figure cx={RECEIVER_X} label="受け手" opacity={inA} />

      {/* 中央の箱 */}
      <Box cx={boxX} cy={BOX_CY} w={BOX_W} opacity={inA} lid={boxLid} msgDanger={0} />
      <Padlock cx={boxX} cy={BOX_CY + 6} scale={0.6} opacity={inA * shackleOn} shackle={1 - end} color={PUBLIC} soft={PUBLIC_SOFT} />

      {/* 序論の不思議に回帰：のぞき見る目と「？」*/}
      <WatchEye cx={boxX} cy={-150} opacity={loop} alert={0.15} />
      {loop > 0.3 && (
        <text
          x={boxX + 150}
          y={BOX_CY - 30}
          fill={SUB_INK}
          fontSize={FS_TITLE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={loop}
        >
          ？
        </text>
      )}

      {/* 受け手の手元で光る鍵（通信路に跡が無い）*/}
      <KeyShape cx={RECEIVER_X} cy={CHANNEL_Y - 150} scale={0.82} opacity={inA} color={SECRET} rot={60} />
      {end > 0.2 && (
        <text
          x={RECEIVER_X}
          y={CHANNEL_Y - 80}
          fill={SECRET_DARK}
          fontSize={FS_TINY}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(end * 1.6 - 0.4)}
        >
          鍵は渡らなかった
        </text>
      )}

      {/* 締めの一文 */}
      {end > 0.15 && (
        <text
          x={0}
          y={210}
          fill={PUBLIC_DARK}
          fontSize={FS_TITLE - 12}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={clamp(end * 1.5 - 0.2)}
        >
          錠前は配り、鍵は隠す
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
  { start: sceneStarts.body1, text: '01 錠前と鍵を、別々に' },
  { start: sceneStarts.body2, text: '02 閉める計算と、開ける計算' },
  { start: sceneStarts.body3, text: '03 同じ鍵で、送り主を確かめる' },
  { start: sceneStarts.outro, text: '結論' },
];

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-918} y={-504} width={10} height={36} rx={5} fill={PUBLIC} />
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
export const PublicKeyCrypto: React.FC = () => {
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
          <radialGradient id="pkc_bgglow" cx="50%" cy="36%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#pkc_bgglow)" />

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
