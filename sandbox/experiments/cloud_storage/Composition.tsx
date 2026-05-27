// [4] Remotion 実装 — cloud_storage（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 対話字幕は SCRIPT 全行から自動描画（04_remotion.md §7）。
// 背骨は「素材タイルの塊が場所に合わせて変装する」。装置はその変装工程として連なる。
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

// ===== アクセント（脱法クラウドストレージの語彙）=====
const DATA = '#d99a2b'; // 素材＝置きたいデータ（アンバー）
const DATA_DARK = '#a8721a';
const DATA_SOFT = '#fbeece';
const MEDIA = '#2f8fb3'; // 変装の場・建物枠（ティール）
const MEDIA_DARK = '#1f6a86';
const MEDIA_SOFT = '#e2eff5';
const DANGER = '#d9543c'; // 失敗・化ける・規約違反（コーラル）
const DANGER_DARK = '#a83a26';
const DANGER_SOFT = '#f7ddd6';
const OKC = '#3f9d57'; // 成功・置けた・戻ってきた（グリーン）
const OKC_SOFT = '#dcefe0';

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
const FS_BIT = 20;

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
const hex2 = (n: number): string =>
  ('0' + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
const hexLerp = (a: string, b: string, t: number): string => {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return '#' + hex2(lerp(pa[0], pb[0], t)) + hex2(lerp(pa[1], pb[1], t)) + hex2(lerp(pa[2], pb[2], t));
};

// 決定的疑似乱数（同じ index に対して同じ値を返す）
const rand = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ============================================================
// 素材タイル（背骨・全画面）。アンバーの正方形、表面に薄字のビット。
// ============================================================
const DataTile: React.FC<{
  cx: number;
  cy: number;
  size: number;
  opacity: number;
  bitText?: string;
  rot?: number;
}> = ({ cx, cy, size, opacity, bitText, rot = 0 }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity} transform={'rotate(' + rot + ' ' + cx + ' ' + cy + ')'}>
      <rect
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        rx={size * 0.12}
        fill={DATA_SOFT}
        stroke={DATA}
        strokeWidth={Math.max(1.5, size * 0.04)}
      />
      {bitText && size >= 26 && (
        <text
          x={cx}
          y={cy}
          fill={DATA_DARK}
          fontSize={Math.max(11, size * 0.32)}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={0.55}
        >
          {bitText}
        </text>
      )}
    </g>
  );
};

// 塊（複数のタイルが集まったかたまり）。圧縮度 0..1 で散らばり度合い。
const DataLump: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  spread: number; // 0=きっちり集まる / 1=ばらばら
  tileSize?: number;
  showBits?: boolean;
}> = ({ cx, cy, opacity, spread, tileSize = 48, showBits = false }) => {
  if (opacity <= 0.001) return null;
  const tiles: { x: number; y: number; bit: string; rot: number }[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + (rand(i) - 0.5) * 0.6;
    const r = lerp(tileSize * 0.95, tileSize * 3.4, spread) * (0.6 + rand(i + 30) * 0.4);
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r * 0.85;
    tiles.push({
      x: cx + px,
      y: cy + py,
      bit: i % 2 === 0 ? '0' : '1',
      rot: (rand(i + 7) - 0.5) * 30 * spread,
    });
  }
  return (
    <g opacity={opacity}>
      {tiles.map((t, i) => (
        <DataTile
          key={i}
          cx={t.x}
          cy={t.y}
          size={tileSize}
          opacity={1}
          bitText={showBits ? t.bit : undefined}
          rot={t.rot}
        />
      ))}
    </g>
  );
};

// ============================================================
// ビット列の薄字（塊の表面に浮かぶ "0 1 1 0..."）
// ============================================================
const BitStream: React.FC<{ cx: number; cy: number; width: number; opacity: number }> = ({
  cx,
  cy,
  width,
  opacity,
}) => {
  if (opacity <= 0.001) return null;
  const bits = '0 1 1 0 1 0 0 1 0 1 1 0 0 1 1 0';
  return (
    <g opacity={opacity * 0.7}>
      <text
        x={cx}
        y={cy}
        fill={DATA_DARK}
        fontSize={FS_BIT}
        fontFamily={FONT}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="central"
        letterSpacing={3}
      >
        {bits}
      </text>
    </g>
  );
};

// ============================================================
// 三つの異種ファイル絵（序論）
// ============================================================
const MediaIcon: React.FC<{
  cx: number;
  cy: number;
  kind: 'minecraft' | 'image-audio' | 'video-save';
  opacity: number;
  label: string;
}> = ({ cx, cy, kind, opacity, label }) => {
  if (opacity <= 0.001) return null;
  const w = 240;
  const h = 200;
  return (
    <g opacity={opacity}>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={18}
        fill={SURFACE}
        stroke={MEDIA}
        strokeWidth={3}
      />
      {kind === 'minecraft' && (
        <g>
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4].map((col) => {
              const px = cx - 80 + col * 36;
              const py = cy - 56 + row * 28;
              const t = (row * 5 + col) % 4;
              const cols = ['#7a5236', '#8a8d8a', '#5b8a3a', '#a6c2db'];
              return (
                <rect
                  key={row + '-' + col}
                  x={px}
                  y={py}
                  width={32}
                  height={24}
                  fill={cols[t]}
                  stroke={INK}
                  strokeWidth={1}
                  opacity={0.92}
                />
              );
            }),
          )}
          <text
            x={cx}
            y={cy + 76}
            fill={SUB_INK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {label}
          </text>
        </g>
      )}
      {kind === 'image-audio' && (
        <g>
          <rect x={cx - 80} y={cy - 56} width={160} height={108} rx={6} fill={MEDIA_SOFT} stroke={MEDIA} strokeWidth={2.5} />
          <circle cx={cx - 32} cy={cy - 20} r={16} fill="#ffb84a" />
          <path d={'M ' + (cx - 80) + ' ' + (cy + 52) + ' L ' + (cx - 20) + ' ' + (cy - 4) + ' L ' + (cx + 30) + ' ' + (cy + 18) + ' L ' + (cx + 80) + ' ' + (cy - 30)} fill="none" stroke={MEDIA_DARK} strokeWidth={3} />
          <g>
            <circle cx={cx + 36} cy={cy + 30} r={10} fill={DATA} />
            <rect x={cx + 44} y={cy + 4} width={5} height={32} fill={DATA} />
            <rect x={cx + 44} y={cy + 4} width={28} height={5} fill={DATA} />
          </g>
          <text
            x={cx}
            y={cy + 76}
            fill={SUB_INK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {label}
          </text>
        </g>
      )}
      {kind === 'video-save' && (
        <g>
          <rect x={cx - 80} y={cy - 56} width={160} height={108} rx={6} fill="#111418" stroke={MEDIA} strokeWidth={2.5} />
          <path d={'M ' + (cx - 14) + ' ' + (cy - 18) + ' L ' + (cx + 24) + ' ' + cy + ' L ' + (cx - 14) + ' ' + (cy + 18) + ' Z'} fill={MEDIA_SOFT} />
          <rect x={cx - 76} y={cy - 52} width={14} height={10} fill={MEDIA_SOFT} opacity={0.5} />
          <rect x={cx + 62} y={cy + 42} width={14} height={10} fill={MEDIA_SOFT} opacity={0.5} />
          <g transform={'translate(' + (cx + 56) + ' ' + (cy + 8) + ')'}>
            <rect x={-22} y={-14} width={44} height={28} rx={4} fill={DATA_SOFT} stroke={DATA} strokeWidth={2} />
            <text x={0} y={0} fill={DATA_DARK} fontSize={14} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
              SAVE
            </text>
          </g>
          <text
            x={cx}
            y={cy + 76}
            fill={SUB_INK}
            fontSize={FS_TINY}
            fontFamily={FONT}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// mp4 の家（二部屋：頭の小部屋＝目印 / 右のおっきな部屋＝中身）
// ============================================================
const Mp4House: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  fill: number; // 右部屋の塗りつぶし 0..1
  crush: number; // 左部屋の目印の崩れ 0..1
}> = ({ cx, cy, opacity, fill, crush }) => {
  if (opacity <= 0.001) return null;
  const totalW = 680;
  const h = 280;
  const leftW = 68; // 全体の約 1/10
  const rightW = totalW - leftW;
  const ox = cx - totalW / 2;
  const oy = cy - h / 2;
  // 屋根
  const roofY = oy - 36;
  return (
    <g opacity={opacity}>
      <path
        d={
          'M ' + (ox - 8) + ' ' + oy +
          ' L ' + cx + ' ' + roofY +
          ' L ' + (ox + totalW + 8) + ' ' + oy
        }
        fill={MEDIA_SOFT}
        stroke={MEDIA}
        strokeWidth={3}
      />
      {/* 本体（二部屋）*/}
      <rect x={ox} y={oy} width={leftW} height={h} fill={SURFACE} stroke={MEDIA} strokeWidth={3} />
      <rect x={ox + leftW} y={oy} width={rightW} height={h} fill={SURFACE} stroke={MEDIA} strokeWidth={3} />

      {/* 左の小部屋 — 目印 */}
      <text x={ox + leftW / 2} y={oy - 12} fill={MEDIA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle">
        目印
      </text>
      {/* 棒状の目印マーク（崩れ度合いで形が変わる）*/}
      {(() => {
        const cxL = ox + leftW / 2;
        const cyL = cy;
        const wobble = crush * 28;
        const d =
          'M ' + (cxL - 16) + ' ' + (cyL - 60) +
          ' L ' + (cxL - 16 + wobble * 0.4) + ' ' + (cyL - 20) +
          ' L ' + (cxL + 16 - wobble * 0.6) + ' ' + (cyL + 20) +
          ' L ' + (cxL + 16) + ' ' + (cyL + 60);
        return (
          <path
            d={d}
            fill="none"
            stroke={hexLerp(MEDIA_DARK, DANGER, crush)}
            strokeWidth={9}
            strokeLinecap="round"
            opacity={1 - crush * 0.2}
          />
        );
      })()}

      {/* 右のおっきな部屋 — 中身 */}
      <text x={ox + leftW + rightW / 2} y={oy - 12} fill={MEDIA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle">
        中身（全体の九割）
      </text>
      {/* 中身の元の画像（薄く残るが詰めかえで消える）*/}
      <rect
        x={ox + leftW + 18}
        y={oy + 24}
        width={rightW - 36}
        height={h - 48}
        rx={6}
        fill={MEDIA_SOFT}
        opacity={1 - fill}
      />
      {/* 塗りつぶされる素材タイル群（右部屋）*/}
      {fill > 0.02 && (() => {
        const rx0 = ox + leftW + 18;
        const ry0 = oy + 24;
        const rw = rightW - 36;
        const rh = h - 48;
        const cols = 12;
        const rows = 5;
        const tw = rw / cols;
        const th = rh / rows;
        const tiles = [];
        const total = cols * rows;
        const shown = Math.floor(total * fill);
        for (let i = 0; i < shown; i++) {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const tx = rx0 + c * tw + tw / 2;
          const ty = ry0 + r * th + th / 2;
          tiles.push(
            <DataTile
              key={i}
              cx={tx}
              cy={ty}
              size={Math.min(tw, th) * 0.88}
              opacity={1}
              bitText={i % 2 === 0 ? '0' : '1'}
            />,
          );
        }
        return <g>{tiles}</g>;
      })()}
    </g>
  );
};

// ============================================================
// YouTube 受付口（門と判定印）
// ============================================================
const YouTubeGate: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  verdict: 0 | 1 | -1; // -1=不受理 / 1=受理 / 0=未判定
  verdictOpacity: number;
}> = ({ cx, cy, opacity, verdict, verdictOpacity }) => {
  if (opacity <= 0.001) return null;
  const w = 200;
  const h = 260;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={12} fill={SURFACE} stroke={EDGE} strokeWidth={3} />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={48} fill={DANGER} opacity={0.92} />
      <text x={cx} y={cy - h / 2 + 24} fill={SURFACE} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
        YouTube
      </text>
      {/* 門の枠 */}
      <rect x={cx - w / 2 + 22} y={cy - h / 2 + 76} width={w - 44} height={h - 96} fill={SURFACE_SOFT} stroke={EDGE} strokeWidth={2.5} />
      <rect x={cx - 8} y={cy - h / 2 + 76} width={16} height={h - 96} fill={EDGE_SOFT} />
      {/* 判定 */}
      {verdict === -1 && (
        <g opacity={verdictOpacity}>
          <circle cx={cx} cy={cy - h / 2 - 40} r={42} fill={DANGER_SOFT} stroke={DANGER} strokeWidth={5} />
          <line x1={cx - 22} y1={cy - h / 2 - 62} x2={cx + 22} y2={cy - h / 2 - 18} stroke={DANGER} strokeWidth={7} strokeLinecap="round" />
          <line x1={cx + 22} y1={cy - h / 2 - 62} x2={cx - 22} y2={cy - h / 2 - 18} stroke={DANGER} strokeWidth={7} strokeLinecap="round" />
          <text x={cx} y={cy - h / 2 + 138} fill={DANGER} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle">
            不受理
          </text>
        </g>
      )}
      {verdict === 1 && (
        <g opacity={verdictOpacity}>
          <circle cx={cx} cy={cy - h / 2 - 40} r={42} fill={OKC_SOFT} stroke={OKC} strokeWidth={5} />
          <path
            d={'M ' + (cx - 22) + ' ' + (cy - h / 2 - 38) + ' L ' + (cx - 6) + ' ' + (cy - h / 2 - 22) + ' L ' + (cx + 24) + ' ' + (cy - h / 2 - 58)}
            fill="none"
            stroke={OKC}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={cx} y={cy - h / 2 + 138} fill={OKC} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle">
            動画として受理
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 色のマス目（ボディ2・4色／多色）
// ============================================================
const ColorGrid: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
  opacity: number;
  palette: string[]; // 使う色
  reveal: number; // 0..1 ：埋まる進み具合
  flippedCell?: { r: number; c: number }; // 化けたセル
  flipped: number; // 化けの強さ 0..1
}> = ({ cx, cy, w, h, cols, rows, opacity, palette, reveal, flippedCell, flipped }) => {
  if (opacity <= 0.001) return null;
  const tw = w / cols;
  const th = h / rows;
  const total = cols * rows;
  const shown = Math.floor(total * reveal);
  const ox = cx - w / 2;
  const oy = cy - h / 2;
  return (
    <g opacity={opacity}>
      <rect x={ox - 6} y={oy - 6} width={w + 12} height={h + 12} rx={6} fill={SURFACE_SOFT} stroke={MEDIA} strokeWidth={2.5} />
      {Array.from({ length: shown }).map((_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const k = Math.floor(rand(i + 1) * palette.length);
        let fill = palette[k];
        if (flippedCell && flippedCell.r === r && flippedCell.c === c) {
          fill = hexLerp(fill, DANGER, flipped);
        }
        return (
          <rect
            key={i}
            x={ox + c * tw}
            y={oy + r * th}
            width={tw}
            height={th}
            fill={fill}
          />
        );
      })}
    </g>
  );
};

// ============================================================
// ぱらぱら動画の束（マス目を時間方向に重ねた層）
// ============================================================
const FrameStack: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  layers: number; // 表示する層数（0..N）
  palette: string[];
  flipped?: boolean; // 一マス化け
}> = ({ cx, cy, opacity, layers, palette, flipped = false }) => {
  if (opacity <= 0.001) return null;
  const w = 260;
  const h = 160;
  const layerCount = Math.floor(layers);
  const off = 14;
  return (
    <g opacity={opacity}>
      {Array.from({ length: layerCount }).map((_, i) => {
        const idx = layerCount - 1 - i;
        const ox = cx - w / 2 + idx * off;
        const oy = cy - h / 2 - idx * off;
        const alpha = 0.5 + (i / Math.max(1, layerCount - 1)) * 0.5;
        return (
          <g key={idx} opacity={alpha}>
            <rect x={ox} y={oy} width={w} height={h} fill={SURFACE} stroke={MEDIA} strokeWidth={2} />
            {/* 4色のマス目（簡易）*/}
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 10 }).map((_, c) => {
                const seed = idx * 60 + r * 10 + c;
                const k = Math.floor(rand(seed) * palette.length);
                const isFlipped = flipped && idx === 0 && r === 2 && c === 5;
                return (
                  <rect
                    key={r + '-' + c}
                    x={ox + c * (w / 10)}
                    y={oy + r * (h / 6)}
                    width={w / 10}
                    height={h / 6}
                    fill={isFlipped ? DANGER : palette[k]}
                  />
                );
              }),
            )}
          </g>
        );
      })}
    </g>
  );
};

// ============================================================
// YouTube サーバー塔（歯車一つ、一回転して止まる）
// ============================================================
const ServerTower: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  rotation: number; // 0..1 で一回転
}> = ({ cx, cy, opacity, rotation }) => {
  if (opacity <= 0.001) return null;
  const w = 220;
  const h = 360;
  const gearR = 70;
  const gearY = cy;
  const teeth = 12;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={28} fill={SURFACE} stroke={MEDIA} strokeWidth={3} />
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={42} rx={28} fill={MEDIA} opacity={0.92} />
      <text x={cx} y={cy - h / 2 + 22} fill={SURFACE} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
        サーバー圧縮
      </text>
      {/* 歯車 */}
      <g transform={'rotate(' + rotation * 360 + ' ' + cx + ' ' + gearY + ')'}>
        {Array.from({ length: teeth }).map((_, i) => {
          const a = (i / teeth) * Math.PI * 2;
          const x1 = cx + Math.cos(a) * (gearR + 14);
          const y1 = gearY + Math.sin(a) * (gearR + 14);
          const x2 = cx + Math.cos(a) * gearR;
          const y2 = gearY + Math.sin(a) * gearR;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={MEDIA_DARK} strokeWidth={18} strokeLinecap="round" />;
        })}
        <circle cx={cx} cy={gearY} r={gearR} fill={MEDIA_SOFT} stroke={MEDIA_DARK} strokeWidth={5} />
        <circle cx={cx} cy={gearY} r={18} fill={MEDIA_DARK} />
      </g>
    </g>
  );
};

// ============================================================
// 確認バッジ（✓ / ✗）
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
// Discord の窓（二口：画像枠と文字列枠）
// ============================================================
const DiscordWindow: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  imageFill: number; // 0..1
  textFill: number; // 0..1
  ban: number; // 0..1（薄く消えかかる）
}> = ({ cx, cy, opacity, imageFill, textFill, ban }) => {
  if (opacity <= 0.001) return null;
  const w = 760;
  const h = 460;
  const ox = cx - w / 2;
  const oy = cy - h / 2;
  const fadeOut = 1 - ban * 0.5;
  return (
    <g opacity={opacity}>
      <rect x={ox} y={oy} width={w} height={h} rx={20} fill={SURFACE} stroke={MEDIA} strokeWidth={3} />
      <rect x={ox} y={oy} width={w} height={50} rx={20} fill={MEDIA} opacity={0.92} />
      <text x={cx} y={oy + 25} fill={SURFACE} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
        Discord（一回ぶんの大きさに上限）
      </text>
      {/* 左口：画像枠 */}
      <g opacity={fadeOut}>
        <rect x={ox + 24} y={oy + 80} width={w / 2 - 36} height={h - 110} rx={10} fill={SURFACE_SOFT} stroke={EDGE} strokeWidth={2.5} />
        <text x={ox + 24 + (w / 2 - 36) / 2} y={oy + 68} fill={MEDIA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle">
          画像（多色・作りなおされない）
        </text>
        {/* 多色ピクセル */}
        {imageFill > 0.01 && (() => {
          const ix0 = ox + 40;
          const iy0 = oy + 100;
          const iw = w / 2 - 68;
          const ih = h - 134;
          const cols = 24;
          const rows = 14;
          const tw = iw / cols;
          const th = ih / rows;
          const total = cols * rows;
          const shown = Math.floor(total * imageFill);
          const palette = ['#d97560', '#e0a23a', '#3a9b9d', '#5b75c5', '#9b6bb3', '#3c8a4a', '#c34d72', '#d4c050'];
          const cells = [];
          for (let i = 0; i < shown; i++) {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const k = Math.floor(rand(i + 100) * palette.length);
            cells.push(
              <rect
                key={i}
                x={ix0 + c * tw}
                y={iy0 + r * th}
                width={tw}
                height={th}
                fill={palette[k]}
              />,
            );
          }
          return <g>{cells}</g>;
        })()}
      </g>
      {/* 右口：文字列枠 */}
      <g opacity={fadeOut}>
        <rect x={ox + w / 2 + 12} y={oy + 80} width={w / 2 - 36} height={h - 110} rx={10} fill={SURFACE_SOFT} stroke={EDGE} strokeWidth={2.5} />
        <text x={ox + w / 2 + 12 + (w / 2 - 36) / 2} y={oy + 68} fill={MEDIA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle">
          文字列（拡張子を txt に付け替え）
        </text>
        {textFill > 0.01 && (() => {
          const tx0 = ox + w / 2 + 28;
          const ty0 = oy + 100;
          const tw = w / 2 - 68;
          const th = h - 134;
          const rows = 12;
          const lineH = th / rows;
          const lineCount = Math.floor(rows * textFill);
          const glyphs = '◇◆□■▲△◯●※§¶†‡✦✧◊◉⌬⎔⚙⌘';
          const out = [];
          for (let i = 0; i < lineCount; i++) {
            let s = '';
            for (let j = 0; j < 18; j++) {
              s += glyphs[Math.floor(rand(i * 18 + j + 200) * glyphs.length)];
            }
            out.push(
              <text
                key={i}
                x={tx0}
                y={ty0 + i * lineH + lineH * 0.7}
                fill={INK}
                fontSize={Math.min(20, lineH * 0.7)}
                fontFamily={FONT}
                fontWeight={500}
                textAnchor="start"
                letterSpacing={1.5}
              >
                {s}
              </text>,
            );
          }
          return <g>{out}</g>;
        })()}
      </g>
      {/* BAN印 */}
      {ban > 0.02 && (
        <g opacity={ban}>
          <rect x={cx - 110} y={oy - 60} width={220} height={60} rx={10} fill={DANGER_SOFT} stroke={DANGER} strokeWidth={4} />
          <line x1={cx - 84} y1={oy - 30} x2={cx + 84} y2={oy - 30} stroke={DANGER} strokeWidth={6} strokeLinecap="round" />
          <text x={cx} y={oy - 26} fill={DANGER_DARK} fontSize={FS_LABEL} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            規約違反 ── BAN
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// マインクラフトの地面とブロックの山
// ============================================================
const MinecraftGround: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  blockReveal: number; // 0..1：山ができる進み具合
  flagOn: number;
}> = ({ cx, cy, opacity, blockReveal, flagOn }) => {
  if (opacity <= 0.001) return null;
  const groundW = 720;
  const groundH = 60;
  const blockSize = 32;
  // 山の形（ピラミッド気味）
  const layers: { r: number; c: number; col: string }[] = [];
  const palette = ['#7a5236', '#8a8d8a', '#5b8a3a', '#a6c2db', '#6e4d2f', '#bda07a'];
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    const cols = rows - r;
    for (let c = 0; c < cols; c++) {
      const k = Math.floor(rand(r * 30 + c + 500) * palette.length);
      layers.push({ r, c: c - cols / 2 + 0.5, col: palette[k] });
    }
  }
  const total = layers.length;
  const shown = Math.floor(total * blockReveal);

  return (
    <g opacity={opacity}>
      {/* 地面 */}
      <rect x={cx - groundW / 2} y={cy + 60} width={groundW} height={groundH} fill="#5b8a3a" stroke={INK} strokeWidth={2} />
      <rect x={cx - groundW / 2} y={cy + 60} width={groundW} height={14} fill="#74a64f" />
      {/* 格子線 */}
      {Array.from({ length: 15 }).map((_, i) => (
        <line
          key={i}
          x1={cx - groundW / 2 + i * (groundW / 15)}
          y1={cy + 60}
          x2={cx - groundW / 2 + i * (groundW / 15)}
          y2={cy + 60 + groundH}
          stroke={INK}
          strokeWidth={1}
          opacity={0.2}
        />
      ))}
      {/* 山 */}
      {layers.slice(0, shown).map((b, i) => (
        <rect
          key={i}
          x={cx + b.c * blockSize - blockSize / 2}
          y={cy + 60 - (b.r + 1) * blockSize}
          width={blockSize}
          height={blockSize}
          fill={b.col}
          stroke={INK}
          strokeWidth={1}
          opacity={0.95}
        />
      ))}
      {/* 自前サーバーの旗 */}
      {flagOn > 0.02 && (
        <g opacity={flagOn} transform={'translate(' + (cx - groundW / 2 + 50) + ' ' + (cy + 60) + ')'}>
          <rect x={-3} y={-160} width={6} height={160} fill={INK} />
          <path d="M 3 -160 L 90 -148 L 3 -130 Z" fill={DATA} stroke={DATA_DARK} strokeWidth={2} />
          <text x={48} y={-145} fill={DATA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            自前サーバー
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// DNA らせん（結論の右端）
// ============================================================
const DnaHelix: React.FC<{ cx: number; cy: number; opacity: number }> = ({ cx, cy, opacity }) => {
  if (opacity <= 0.001) return null;
  const h = 220;
  const w = 80;
  const steps = 16;
  const items: React.ReactNode[] = [];
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const y = cy - h / 2 + t * h;
    const phase = t * Math.PI * 4;
    const x1 = cx + Math.cos(phase) * (w / 2);
    const x2 = cx - Math.cos(phase) * (w / 2);
    items.push(
      <g key={i}>
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={SUB_INK} strokeWidth={1.5} opacity={0.5} />
        <circle cx={x1} cy={y} r={5} fill={MEDIA} />
        <circle cx={x2} cy={y} r={5} fill={DATA} />
      </g>,
    );
  }
  return (
    <g opacity={opacity}>
      {items}
      <text x={cx} y={cy + h / 2 + 36} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
        DNA ストレージ
      </text>
    </g>
  );
};

// ============================================================
// 連鎖の場（結論の小ステーション）
// ============================================================
const ChainStation: React.FC<{
  cx: number;
  cy: number;
  opacity: number;
  kind: 0 | 1 | 2 | 3 | 4;
  label: string;
  rejected?: boolean;
}> = ({ cx, cy, opacity, kind, label, rejected }) => {
  if (opacity <= 0.001) return null;
  const w = 168;
  const h = 130;
  return (
    <g opacity={opacity}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={14} fill={SURFACE} stroke={EDGE} strokeWidth={2.5} />
      {kind === 0 && (
        <g>
          <rect x={cx - 50} y={cy - 28} width={100} height={50} fill={MEDIA_SOFT} stroke={MEDIA} strokeWidth={2} />
          <line x1={cx - 38} y1={cy - 28} x2={cx - 38} y2={cy + 22} stroke={MEDIA_DARK} strokeWidth={2} />
          {rejected && (
            <g>
              <line x1={cx - 36} y1={cy - 20} x2={cx + 36} y2={cy + 20} stroke={DANGER} strokeWidth={5} strokeLinecap="round" />
              <line x1={cx + 36} y1={cy - 20} x2={cx - 36} y2={cy + 20} stroke={DANGER} strokeWidth={5} strokeLinecap="round" />
            </g>
          )}
        </g>
      )}
      {kind === 1 && (
        <g>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4, 5, 6, 7].map((c) => {
              const cols = ['#1c1c1c', DANGER, OKC, MEDIA];
              const k = Math.floor(rand(r * 8 + c + 800) * 4);
              return (
                <rect
                  key={r + '-' + c}
                  x={cx - 56 + c * 14}
                  y={cy - 30 + r * 14}
                  width={14}
                  height={14}
                  fill={cols[k]}
                />
              );
            }),
          )}
        </g>
      )}
      {kind === 2 && (
        <g>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={cx - 50 - i * 6}
              y={cy - 30 + i * 6}
              width={100}
              height={50}
              fill={MEDIA_SOFT}
              stroke={MEDIA}
              strokeWidth={2}
              opacity={0.6 + i * 0.15}
            />
          ))}
        </g>
      )}
      {kind === 3 && (
        <g>
          <rect x={cx - 50} y={cy - 30} width={48} height={56} fill={DATA_SOFT} stroke={MEDIA} strokeWidth={2} />
          <rect x={cx + 4} y={cy - 30} width={48} height={56} fill={MEDIA_SOFT} stroke={MEDIA} strokeWidth={2} />
          <text x={cx - 26} y={cy - 2} fill={DATA_DARK} fontSize={14} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            画像
          </text>
          <text x={cx + 28} y={cy - 2} fill={MEDIA_DARK} fontSize={14} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            txt
          </text>
        </g>
      )}
      {kind === 4 && (
        <g>
          <rect x={cx - 36} y={cy + 16} width={72} height={10} fill="#74a64f" stroke={INK} strokeWidth={1} />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => {
              if (r + c > 2) return null;
              const cols = ['#7a5236', '#8a8d8a', '#5b8a3a'];
              const k = (r + c) % cols.length;
              return (
                <rect
                  key={r + '-' + c}
                  x={cx - 18 + c * 14}
                  y={cy + 16 - (r + 1) * 14}
                  width={14}
                  height={14}
                  fill={cols[k]}
                  stroke={INK}
                  strokeWidth={1}
                />
              );
            }),
          )}
        </g>
      )}
      <text
        x={cx}
        y={cy + h / 2 + 24}
        fill={SUB_INK}
        fontSize={FS_TINY - 4}
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
// 画面可視性（04_remotion.md §6）
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

// ============================================================
// 画面1 — 序論
// ============================================================
const introBase = sc([
  [8, 0],
  [42, 1],
]);
const introThree = sc([
  [F('intro.three'), 0],
  [F('intro.three') + 70, 1],
]);
const introGather = sc([
  [F('intro.gather'), 0],
  [F('intro.gather') + 70, 1],
]);
const introBitStream = sc([
  [F('intro.gather') + 30, 0],
  [F('intro.gather') + 80, 1],
]);
const introShuffle = sc([
  [F('intro.shuffle'), 0],
  [F('intro.shuffle') + 36, 1],
  [F('intro.shuffle') + 72, 0],
]);
const introTitle = sc([
  [F('intro.title'), 0],
  [F('intro.title') + 60, 1],
]);

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const base = rv(introBase, f);
  const three = rv(introThree, f);
  const gather = rv(introGather, f);
  const bitS = rv(introBitStream, f);
  const shuffle = rv(introShuffle, f);
  const title = rv(introTitle, f);

  // 三つの絵の位置
  const iconPositions: [number, number, 'minecraft' | 'image-audio' | 'video-save', string][] = [
    [-560, -200, 'minecraft', 'マイクラ + 動画34MB'],
    [560, -200, 'image-audio', '画像 + 音声5.93MB'],
    [0, -280, 'video-save', '動画 + セーブ1.63GB'],
  ];

  // 中央の塊（gather以降）
  const lumpSpread = 1 - clamp(gather * 1.4) + shuffle * 0.9;
  const lumpOpacity = clamp(three * 1.2);

  return (
    <g opacity={vis}>
      {/* 三つの絵 */}
      {iconPositions.map(([x, y, kind, label], i) => {
        const ap = clamp(three * 3.2 - i - 0.2) * (1 - gather * 0.4);
        return <MediaIcon key={i} cx={x} cy={y} kind={kind} opacity={ap * base} label={label} />;
      })}

      {/* 三つの絵から中央へ向かう吸い出し線 */}
      {gather > 0.02 && gather < 0.95 && (
        <g opacity={clamp(gather * 2) * (1 - gather * 0.6)}>
          {iconPositions.map(([x, y], i) => (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={0}
              y2={-30}
              stroke={DATA}
              strokeWidth={3}
              strokeDasharray="8 9"
              opacity={0.6}
            />
          ))}
        </g>
      )}

      {/* 中央の素材タイルの塊 */}
      <DataLump cx={0} cy={-30} opacity={lumpOpacity * base} spread={lumpSpread} tileSize={42} showBits={bitS > 0.4} />
      {bitS > 0.4 && <BitStream cx={0} cy={120} width={360} opacity={bitS * (1 - shuffle * 0.7)} />}

      {/* タイトル */}
      <g opacity={title}>
        <text
          x={0}
          y={220}
          fill={MEDIA_DARK}
          fontSize={FS_TITLE}
          fontFamily={FONT}
          fontWeight={800}
          textAnchor="middle"
          dominantBaseline="central"
        >
          脱法クラウドストレージ
        </text>
        <text
          x={0}
          y={278}
          fill={SUB_INK}
          fontSize={FS_SCENE}
          fontFamily={FONT}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
        >
          ── データに、動画のふりをさせる
        </text>
      </g>
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1（mp4 のお部屋に、こっそり詰める）
// ============================================================
const b1In = sc([
  [sceneStarts.body1 + 8, 0],
  [sceneStarts.body1 + CROSSFADE + 18, 1],
]);
const b1HouseT = sc([
  [F('b1.house'), 0],
  [F('b1.house') + 60, 1],
]);
const b1Fill = sc([
  [F('b1.fill'), 0],
  [F('b1.fill') + 80, 1],
]);
const b1Crush = sc([
  [F('b1.crush'), 0],
  [F('b1.crush') + 56, 1],
]);
const b1Reject = sc([
  [F('b1.reject'), 0],
  [F('b1.reject') + 50, 1],
]);

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1In, f);
  const houseT = rv(b1HouseT, f);
  const fill = rv(b1Fill, f);
  const crush = rv(b1Crush, f);
  const reject = rv(b1Reject, f);

  // 素材タイルの塊（左の手元 → 家の右部屋へ）
  const lumpX = lerp(-740, -200, fill);
  const lumpOpacity = (1 - fill) * inA;

  return (
    <g opacity={vis}>
      {/* 左の手元 */}
      <g opacity={lumpOpacity}>
        <DataLump cx={lumpX} cy={-60} opacity={1} spread={0.2} tileSize={36} showBits={true} />
      </g>
      {fill < 0.6 && (
        <text
          x={-740}
          y={120}
          fill={DATA_DARK}
          fontSize={FS_NOTE}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          opacity={lumpOpacity}
        >
          置きたいデータ
        </text>
      )}

      {/* mp4 の家 */}
      <Mp4House cx={120} cy={-60} opacity={houseT * inA} fill={fill} crush={crush} />

      {/* 目印崩れの×印 */}
      {crush > 0.3 && (
        <g opacity={clamp(crush * 1.6 - 0.4)}>
          <Badge cx={-220} cy={-220} r={36} opacity={1} ok={false} />
          <text x={-220} y={-280} fill={DANGER_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            目印が崩れる
          </text>
        </g>
      )}

      {/* YouTube 受付口（不受理）*/}
      <YouTubeGate cx={680} cy={-60} opacity={reject * inA} verdict={-1} verdictOpacity={reject} />
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2（ピクセルの色に、ほどいて並べる）
// ============================================================
const b2In = sc([
  [sceneStarts.body2 + 8, 0],
  [sceneStarts.body2 + CROSSFADE + 18, 1],
]);
const b2Unravel = sc([
  [F('b2.unravel'), 0],
  [F('b2.unravel') + 80, 1],
]);
const b2Color = sc([
  [F('b2.color'), 0],
  [F('b2.color') + 60, 1],
]);
const b2Flip = sc([
  [F('b2.flip'), 0],
  [F('b2.flip') + 80, 1],
]);
const b2Accept = sc([
  [F('b2.accept'), 0],
  [F('b2.accept') + 60, 1],
]);

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2In, f);
  const unravel = rv(b2Unravel, f);
  const color = rv(b2Color, f);
  const flip = rv(b2Flip, f);
  const accept = rv(b2Accept, f);

  // 左の素材タイル（ほぐれ前）
  const lumpOpacity = (1 - unravel) * inA;

  // 色のマス目
  const grid4 = ['#1c1c1c', DANGER, OKC, MEDIA];
  const gridBW = ['#1c1c1c', '#f0f0f0'];
  const palette = color > 0.4 ? grid4 : gridBW;
  const gridOpacity = clamp(unravel * 1.2) * (1 - flip * 0.4) * inA;

  // ぱらぱら動画
  const stackLayers = Math.floor(flip * 6);

  return (
    <g opacity={vis}>
      <DataLump cx={-680} cy={-60} opacity={lumpOpacity} spread={0.2} tileSize={36} showBits={true} />
      {lumpOpacity > 0.3 && (
        <text x={-680} y={120} fill={DATA_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" opacity={lumpOpacity}>
          置きたいデータ
        </text>
      )}

      {/* 色のマス目（中央）*/}
      <ColorGrid
        cx={-90}
        cy={-60}
        w={420}
        h={300}
        cols={16}
        rows={11}
        opacity={gridOpacity}
        palette={palette}
        reveal={clamp(unravel * 1.4)}
        flipped={0}
      />
      {color > 0.3 && gridOpacity > 0.3 && (
        <text x={-90} y={120} fill={MEDIA_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" opacity={clamp(color * 1.4) * gridOpacity}>
          黒・赤・緑・青 ── 一マスに二ビット
        </text>
      )}

      {/* ぱらぱら動画の束（中央〜右）*/}
      <FrameStack cx={290} cy={-60} opacity={clamp(flip * 1.4) * inA * (1 - accept * 0.4)} layers={stackLayers} palette={grid4} />
      {flip > 0.4 && (
        <text x={290} y={120} fill={MEDIA_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={700} textAnchor="middle" opacity={clamp(flip * 1.6 - 0.4) * inA * (1 - accept * 0.4)}>
          ぱらぱら動画（一秒で六十枚）
        </text>
      )}

      {/* YouTube 受付口（受理）*/}
      <YouTubeGate cx={760} cy={-60} opacity={accept * inA} verdict={1} verdictOpacity={accept} />
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3（取り出すときに、欠ける）
// ============================================================
const b3In = sc([
  [sceneStarts.body3 + 8, 0],
  [sceneStarts.body3 + CROSSFADE + 18, 1],
]);
const b3Compress = sc([
  [F('b3.compress'), 0],
  [F('b3.compress') + 80, 1],
]);
const b3FlipT = sc([
  [F('b3.flip'), 0],
  [F('b3.flip') + 80, 1],
]);
const b3Coarse = sc([
  [F('b3.coarse'), 0],
  [F('b3.coarse') + 60, 1],
]);
const b3Bloat = sc([
  [F('b3.bloat'), 0],
  [F('b3.bloat') + 90, 1],
]);

const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3In, f);
  const compress = rv(b3Compress, f);
  const flip = rv(b3FlipT, f);
  const coarse = rv(b3Coarse, f);
  const bloat = rv(b3Bloat, f);

  const grid4 = ['#1c1c1c', DANGER, OKC, MEDIA];

  return (
    <g opacity={vis}>
      {/* 左：入力束 */}
      <FrameStack cx={-620} cy={-100} opacity={inA * (1 - coarse * 0.5)} layers={5} palette={grid4} />
      {coarse > 0.3 && (
        <FrameStack cx={-620} cy={-100} opacity={coarse * inA} layers={3} palette={grid4} />
      )}
      <text x={-620} y={60} fill={MEDIA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" opacity={inA}>
        {coarse > 0.5 ? '粗マス目（化けにくい・量は減る）' : '元の動画の束'}
      </text>

      {/* 中央：サーバー塔 */}
      <ServerTower cx={-130} cy={-100} opacity={inA} rotation={compress} />

      {/* 右：出力束（一マス化け）*/}
      <FrameStack cx={330} cy={-100} opacity={compress * inA} layers={5} palette={grid4} flipped={compress > 0.7} />

      {/* 化けたビット列の拡大 */}
      {flip > 0.2 && (
        <g opacity={flip * inA}>
          <rect x={510} y={-200} width={420} height={200} rx={10} fill={SURFACE} stroke={DANGER} strokeWidth={3} />
          <text x={720} y={-170} fill={DANGER_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            一字化けた
          </text>
          <text x={720} y={-126} fill={INK} fontSize={32} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" letterSpacing={4}>
            0 1 1 0 <tspan fill={DANGER}>1</tspan> 0 0 1
          </text>
          <line x1={616} y1={-122} x2={646} y2={-122} stroke={DANGER} strokeWidth={3} />
          <text x={720} y={-80} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            （0 が 1 になった）
          </text>
        </g>
      )}

      {/* ×20 目盛り */}
      {bloat > 0.05 && (
        <g opacity={bloat * inA}>
          <rect x={-450} y={140} width={20} height={20} fill={DATA_SOFT} stroke={DATA} strokeWidth={2} />
          <text x={-440} y={194} fill={DATA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central">
            素材
          </text>
          <line x1={-420} y1={150} x2={-420 + 400 * bloat} y2={150} stroke={MEDIA} strokeWidth={6} strokeLinecap="round" />
          <text x={-220 + 200 * bloat} y={106} fill={MEDIA_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" dominantBaseline="central">
            動画にすると ── 二十倍
          </text>
          {[1, 5, 10, 15, 20].map((n) => (
            <g key={n} opacity={clamp(bloat * 20 / n - 0.4)}>
              <line x1={-420 + n * 20} y1={140} x2={-420 + n * 20} y2={160} stroke={SUB_INK} strokeWidth={2} />
              <text x={-420 + n * 20} y={186} fill={SUB_INK} fontSize={FS_TINY - 6} fontFamily={FONT} fontWeight={700} textAnchor="middle">
                ×{n}
              </text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — ボディ4（別のサービスに、別のすがたで置く）
// ============================================================
const b4In = sc([
  [sceneStarts.body4 + 8, 0],
  [sceneStarts.body4 + CROSSFADE + 18, 1],
]);
const b4Discord = sc([
  [F('b4.discord'), 0],
  [F('b4.discord') + 60, 1],
]);
const b4Image = sc([
  [F('b4.image'), 0],
  [F('b4.image') + 100, 1],
]);
const b4Text = sc([
  [F('b4.text'), 0],
  [F('b4.text') + 100, 1],
]);
const b4Ban = sc([
  [F('b4.ban'), 0],
  [F('b4.ban') + 60, 1],
]);

const SceneBody4: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b4In, f);
  const dis = rv(b4Discord, f);
  const img = rv(b4Image, f);
  const txt = rv(b4Text, f);
  const ban = rv(b4Ban, f);

  // 左の手元の素材タイル
  const lumpOpacity = inA;

  return (
    <g opacity={vis}>
      <DataLump cx={-770} cy={-60} opacity={lumpOpacity} spread={0.2} tileSize={32} showBits={true} />
      <text x={-770} y={80} fill={DATA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" opacity={inA}>
        置きたいデータ
      </text>

      {/* 上下の分岐線 */}
      {img > 0.02 && (
        <line
          x1={-720}
          y1={-100}
          x2={-280}
          y2={-180}
          stroke={DATA}
          strokeWidth={3}
          strokeDasharray="8 9"
          opacity={img * (1 - ban * 0.5)}
        />
      )}
      {txt > 0.02 && (
        <line
          x1={-720}
          y1={-20}
          x2={-280}
          y2={60}
          stroke={DATA}
          strokeWidth={3}
          strokeDasharray="8 9"
          opacity={txt * (1 - ban * 0.5)}
        />
      )}

      {/* Discord の窓 */}
      <DiscordWindow cx={120} cy={-60} opacity={dis * inA} imageFill={img} textFill={txt} ban={ban} />
    </g>
  );
};

// ============================================================
// 画面6 — ボディ5（マイクラのブロックの山に、変装する）
// ============================================================
const b5In = sc([
  [sceneStarts.body5 + 8, 0],
  [sceneStarts.body5 + CROSSFADE + 18, 1],
]);
const b5Ground = sc([
  [F('b5.ground'), 0],
  [F('b5.ground') + 60, 1],
]);
const b5Blocks = sc([
  [F('b5.blocks'), 0],
  [F('b5.blocks') + 110, 1],
]);
const b5Notcloud = sc([
  [F('b5.notcloud'), 0],
  [F('b5.notcloud') + 60, 1],
]);
const b5Hidden = sc([
  [F('b5.hidden'), 0],
  [F('b5.hidden') + 70, 1],
]);

const SceneBody5: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b5In, f);
  const ground = rv(b5Ground, f);
  const blocks = rv(b5Blocks, f);
  const notc = rv(b5Notcloud, f);
  const hidden = rv(b5Hidden, f);

  const cloudAlpha = (1 - notc) * inA;

  return (
    <g opacity={vis}>
      {/* 上方の「クラウド」絵（薄く消える）*/}
      <g opacity={cloudAlpha * 0.6}>
        <path
          d="M -400 -390 Q -440 -440 -360 -440 Q -340 -460 -300 -450 Q -260 -470 -220 -445 Q -180 -460 -160 -430 Q -120 -430 -120 -400 L -400 -400 Z"
          fill={SURFACE_SOFT}
          stroke={SUB_INK}
          strokeWidth={2.5}
          strokeDasharray={notc > 0.4 ? '6 10' : ''}
        />
        <text x={-260} y={-420} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle">
          クラウド
        </text>
      </g>

      {/* 左：素材タイル */}
      <DataLump cx={-720} cy={-60} opacity={inA * (1 - blocks * 0.4)} spread={0.2} tileSize={30} showBits={true} />
      <text x={-720} y={80} fill={DATA_DARK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle" opacity={inA * (1 - blocks * 0.4)}>
        置きたいデータ
      </text>

      {/* 変換線（タイル→ブロック）*/}
      {blocks > 0.02 && blocks < 0.9 && (
        <g opacity={clamp(blocks * 2) * (1 - blocks * 0.6)}>
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1={-680}
              y1={-60 + (i - 1) * 20}
              x2={-180}
              y2={-30 + i * 24}
              stroke={DATA}
              strokeWidth={2}
              strokeDasharray="6 8"
            />
          ))}
        </g>
      )}

      {/* マイクラの地面と山 */}
      <MinecraftGround cx={140} cy={-90} opacity={ground * inA} blockReveal={blocks} flagOn={notc} />

      {/* 外から見る目 */}
      {hidden > 0.02 && (
        <g opacity={hidden * inA}>
          <ellipse cx={760} cy={-300} rx={80} ry={42} fill={SURFACE} stroke={SUB_INK} strokeWidth={4} />
          <circle cx={760} cy={-300} r={26} fill={MEDIA_SOFT} />
          <circle cx={760} cy={-300} r={12} fill={SUB_INK} />
          <line x1={760} y1={-258} x2={400} y2={-180} stroke={SUB_INK} strokeWidth={2.5} strokeDasharray="6 8" />
          <text x={760} y={-220} fill={SUB_INK} fontSize={FS_TINY} fontFamily={FONT} fontWeight={700} textAnchor="middle">
            ただのブロックの山
          </text>
          <text x={140} y={180} fill={MEDIA_DARK} fontSize={FS_NOTE} fontFamily={FONT} fontWeight={800} textAnchor="middle" opacity={clamp(hidden * 1.4 - 0.2)}>
            気づかれない通り道
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面7 — 結論（場所が変われば、変装も変わる）
// ============================================================
const oIn = sc([
  [sceneStarts.outro + 8, 0],
  [sceneStarts.outro + CROSSFADE + 18, 1],
]);
const oChain = sc([
  [F('outro.chain'), 0],
  [F('outro.chain') + 240, 1],
]);
const oTravel = sc([
  [F('outro.travel'), 0],
  [F('outro.travel') + 280, 1],
]);
const oDna = sc([
  [F('outro.dna'), 0],
  [F('outro.dna') + 80, 1],
]);
const oEnd = sc([
  [F('outro.end'), 0],
  [F('outro.end') + 60, 1],
]);

const STATION_LABELS = ['mp4 ×', '色のマス目', 'ぱらぱら動画', 'Discord（画像/txt）', 'マイクラの山'];

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(oIn, f);
  const chain = rv(oChain, f);
  const travel = rv(oTravel, f);
  const dna = rv(oDna, f);
  const end = rv(oEnd, f);

  const stationXs = [-660, -330, 0, 330, 660];
  const stationY = -180;

  // 旅するタイル位置（連鎖の上を渡る）
  const travelPos = travel * (stationXs.length + 1);
  const tileIdx = Math.floor(travelPos);
  const tileT = travelPos - tileIdx;
  const startX = -820;
  const endX = 820;
  let tileX = startX;
  if (tileIdx >= 1 && tileIdx <= stationXs.length) {
    const fromX = tileIdx === 1 ? startX : stationXs[tileIdx - 2];
    const toX = tileIdx === stationXs.length + 1 ? endX : stationXs[tileIdx - 1];
    tileX = lerp(fromX, toX, tileT);
  } else if (tileIdx > stationXs.length) {
    tileX = endX;
  }

  return (
    <g opacity={vis}>
      {/* 連鎖レーン（薄い帯）*/}
      <rect
        x={-880}
        y={stationY - 100}
        width={1760}
        height={200}
        rx={20}
        fill={SURFACE_SOFT}
        stroke={EDGE_SOFT}
        strokeWidth={2}
        opacity={inA * 0.7}
      />

      {/* 五つのステーション */}
      {stationXs.map((x, i) => (
        <ChainStation
          key={i}
          cx={x}
          cy={stationY}
          opacity={inA * clamp(chain * 6 - i - 0.4)}
          kind={i as 0 | 1 | 2 | 3 | 4}
          label={STATION_LABELS[i]}
          rejected={i === 0}
        />
      ))}

      {/* 旅するタイル */}
      {travel > 0.02 && travel < 0.99 && (
        <DataTile cx={tileX} cy={stationY} size={50} opacity={travel * inA} bitText="0" />
      )}

      {/* DNA らせん（右端、連鎖の延長）*/}
      <DnaHelix cx={870} cy={stationY + 60} opacity={dna * inA} />
      {dna > 0.4 && (
        <DataTile cx={870} cy={stationY + 60} size={30} opacity={clamp(dna * 1.4 - 0.4)} bitText="1" />
      )}

      {/* 締めの一文 */}
      {end > 0.2 && (
        <g opacity={clamp(end * 1.5 - 0.2)}>
          <text
            x={0}
            y={130}
            fill={MEDIA_DARK}
            fontSize={FS_TITLE - 14}
            fontFamily={FONT}
            fontWeight={800}
            textAnchor="middle"
            dominantBaseline="central"
          >
            場所が変われば、変装の中身も変わる
          </text>
          <text
            x={0}
            y={188}
            fill={SUB_INK}
            fontSize={FS_NOTE}
            fontFamily={FONT}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ── おなじ仕掛けの、別の顔
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
  { start: sceneStarts.intro, text: '序論' },
  { start: sceneStarts.body1, text: '01 mp4 のお部屋に、こっそり詰める' },
  { start: sceneStarts.body2, text: '02 ピクセルの色に、ほどいて並べる' },
  { start: sceneStarts.body3, text: '03 取り出すときに、欠ける' },
  { start: sceneStarts.body4, text: '04 別のサービスに、別のすがたで' },
  { start: sceneStarts.body5, text: '05 マイクラのブロックの山に' },
  { start: sceneStarts.outro, text: '結論' },
];

const SceneTitle: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => {
  if (opacity <= 0.001) return null;
  return (
    <g opacity={opacity}>
      <rect x={-918} y={-504} width={10} height={36} rx={5} fill={MEDIA} />
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
export const CloudStorage: React.FC = () => {
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
          <radialGradient id="cs_bgglow" cx="50%" cy="36%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9edf3" />
          </radialGradient>
        </defs>
        <rect x={-960} y={-540} width={1920} height={1080} fill="url(#cs_bgglow)" />

        <SceneIntro f={f} vis={rv(introVis, f)} />
        <SceneBody1 f={f} vis={rv(body1Vis, f)} />
        <SceneBody2 f={f} vis={rv(body2Vis, f)} />
        <SceneBody3 f={f} vis={rv(body3Vis, f)} />
        <SceneBody4 f={f} vis={rv(body4Vis, f)} />
        <SceneBody5 f={f} vis={rv(body5Vis, f)} />
        <SceneOutro f={f} vis={rv(outroVis, f)} />

        <SceneTitle text={SCENE_TITLES[titleIdx].text} opacity={titleOpacity} />
        <Subtitle frame={f} />
      </svg>
    </AbsoluteFill>
  );
};
