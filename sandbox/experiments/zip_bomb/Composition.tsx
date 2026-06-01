// [4] Remotion 実装 — zip_bomb（オブジェクト中心ステージ・白テーマ）
// design_spec.md の event とライフサイクル契約をコードへ翻訳したもの。
// セリフ＋event データは scriptData.ts（script.md から _gen_script.py で生成）。
// 背骨は「小さな指示カード」と、それが吐き出す「展開バー」の非対称。
// 各画面は、このカード→バーの膨張を別の仕組みで起こして見せる工程として連なる。

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

// ===== アクセント（zip 爆弾の語彙）=====
const INDIGO = '#3b5bdb'; // 指示・圧縮・カード（軽い・攻める側）
const INDIGO_DARK = '#2942b8';
const INDIGO_SOFT = '#e3e8fc';
const AMBER = '#e8973a'; // 展開しはじめ（重くなる）
const AMBER_SOFT = '#fbe6cf';
const RED = '#e03131'; // 巨大に展開・焼く（いちばん重い）
const RED_SOFT = '#fbe0e0';
const OKC = '#37b24d'; // すり抜けた（緑✓）
const OKC_SOFT = '#d8f3dd';

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
const FS_BIG = 78;

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
// 展開バーの熱（重さ）：0=インディゴ → 0.5=アンバー → 1=レッド
const heatColor = (h: number): string => {
  const c = clamp(h);
  return c < 0.5 ? hexLerp(INDIGO, AMBER, c * 2) : hexLerp(AMBER, RED, (c - 0.5) * 2);
};

// ===== 舞台の基準 =====
const ROAD_LIMIT = 940; // 画面右の溢れ縁
const TXT = (x: number, y: number, t: string, col: string, size: number, w = 700, anchor: 'start' | 'middle' | 'end' = 'middle') => (
  <text x={x} y={y} fill={col} fontSize={size} fontFamily={FONT} fontWeight={w} textAnchor={anchor} dominantBaseline="central">
    {t}
  </text>
);

// ============================================================
// 背骨1：指示カード（小さく軽い。圧縮ファイル＝指示書）
// ============================================================
const InstrCard: React.FC<{
  cx: number;
  cy: number;
  scale: number;
  opacity: number;
  lines?: number;
  glow?: number;
}> = ({ cx, cy, scale, opacity, lines = 3, glow = 0 }) => {
  if (opacity <= 0.001) return null;
  const w = 150 * scale;
  const h = 188 * scale;
  const ox = cx - w / 2;
  const oy = cy - h / 2;
  const edge = hexLerp(INDIGO, '#7048e8', clamp(glow));
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={oy + h + 10 * scale} rx={w * 0.5} ry={10 * scale} fill={SHADOW} opacity={0.1} />
      <rect x={ox} y={oy} width={w} height={h} rx={14 * scale} fill={INDIGO_SOFT} stroke={edge} strokeWidth={4 * scale} />
      <rect x={ox} y={oy} width={w} height={34 * scale} rx={14 * scale} fill={edge} />
      <circle cx={ox + 18 * scale} cy={oy + 17 * scale} r={6 * scale} fill={SURFACE} opacity={0.85} />
      {/* 中身＝短い指示行 */}
      {Array.from({ length: lines }).map((_, i) => (
        <rect
          key={i}
          x={ox + 18 * scale}
          y={oy + 54 * scale + i * 30 * scale}
          width={(w - 36 * scale) * (i % 2 === 0 ? 1 : 0.62)}
          height={11 * scale}
          rx={5 * scale}
          fill={INDIGO}
          opacity={0.55}
        />
      ))}
    </g>
  );
};

// ============================================================
// 背骨2：展開バー（カードから右へ伸びる。展開後のデータ＝重い）
//   fullLen が ROAD_LIMIT を超えると画面外へ溢れる（torn edge）
// ============================================================
const ExpandBar: React.FC<{
  x0: number;
  cy: number;
  fullLen: number;
  h: number;
  heat: number;
  opacity: number;
}> = ({ x0, cy, fullLen, h, heat, opacity }) => {
  if (opacity <= 0.001 || fullLen <= 1) return null;
  const overflow = x0 + fullLen > ROAD_LIMIT;
  const visLen = overflow ? ROAD_LIMIT - x0 : fullLen;
  const col = heatColor(heat);
  const soft = heat < 0.5 ? INDIGO_SOFT : heat < 0.85 ? AMBER_SOFT : RED_SOFT;
  const ticks = Math.min(40, Math.floor(visLen / 26));
  return (
    <g opacity={opacity}>
      <rect x={x0} y={cy - h / 2} width={visLen} height={h} rx={6} fill={soft} stroke={col} strokeWidth={3} />
      {/* 反復のきざみ（中身が単調に詰まっている） */}
      {Array.from({ length: ticks }).map((_, i) => (
        <line key={i} x1={x0 + 14 + i * 26} y1={cy - h / 2 + 6} x2={x0 + 14 + i * 26} y2={cy + h / 2 - 6} stroke={col} strokeWidth={2} opacity={0.4} />
      ))}
      {overflow && (
        <g>
          {/* 破れた右端＝画面外へ続く */}
          <path
            d={
              'M ' + ROAD_LIMIT + ' ' + (cy - h / 2) +
              ' l -14 ' + h * 0.22 + ' l 14 ' + h * 0.22 + ' l -14 ' + h * 0.22 + ' l 14 ' + h * 0.22 +
              ' L ' + ROAD_LIMIT + ' ' + (cy + h / 2)
            }
            fill={BG}
            stroke={col}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          {[0, 1, 2].map((i) => (
            <path key={i} d={'M ' + (ROAD_LIMIT - 6 + i * 18) + ' ' + (cy - 12) + ' l 14 12 l -14 12'} fill="none" stroke={col} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.8 - i * 0.22} />
          ))}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 検査レンズ（虫めがね）。verdict: 0=判定前 / +1=✓すり抜け / -1=✗止めた
// ============================================================
const Lens: React.FC<{ cx: number; cy: number; scale: number; opacity: number; verdict: number }> = ({
  cx,
  cy,
  scale,
  opacity,
  verdict,
}) => {
  if (opacity <= 0.001) return null;
  const r = 52 * scale;
  const col = verdict > 0.5 ? OKC : verdict < -0.5 ? RED : SUB_INK;
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill={SURFACE} opacity={0.35} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth={7 * scale} />
      <rect
        x={cx + r * 0.62}
        y={cy + r * 0.62}
        width={42 * scale}
        height={15 * scale}
        rx={7 * scale}
        fill={col}
        transform={'rotate(45 ' + (cx + r * 0.62) + ' ' + (cy + r * 0.62) + ')'}
      />
      {verdict > 0.5 && (
        <path d={'M ' + (cx - r * 0.42) + ' ' + cy + ' L ' + (cx - r * 0.06) + ' ' + (cy + r * 0.36) + ' L ' + (cx + r * 0.48) + ' ' + (cy - r * 0.34)} fill="none" stroke={OKC} strokeWidth={8 * scale} strokeLinecap="round" strokeLinejoin="round" />
      )}
      {verdict < -0.5 && (
        <g stroke={RED} strokeWidth={8 * scale} strokeLinecap="round">
          <line x1={cx - r * 0.4} y1={cy - r * 0.4} x2={cx + r * 0.4} y2={cy + r * 0.4} />
          <line x1={cx + r * 0.4} y1={cy - r * 0.4} x2={cx - r * 0.4} y2={cy + r * 0.4} />
        </g>
      )}
    </g>
  );
};

// ============================================================
// ディスク円盤（開いた側の資源。crush 0=無事 / 1=潰れて赤）
// ============================================================
const DiskStack: React.FC<{ cx: number; cy: number; scale: number; opacity: number; crush: number }> = ({
  cx,
  cy,
  scale,
  opacity,
  crush,
}) => {
  if (opacity <= 0.001) return null;
  const rx = 70 * scale;
  const sq = 1 - crush * 0.6;
  const ry = 18 * scale * sq;
  const gap = 34 * scale * sq;
  const col = hexLerp(SUB_INK, RED, clamp(crush));
  const fill = hexLerp(SURFACE_SOFT, RED_SOFT, clamp(crush));
  return (
    <g opacity={opacity} transform={'rotate(' + crush * 6 + ' ' + cx + ' ' + cy + ')'}>
      {[0, 1, 2].map((i) => {
        const dy = (i - 1) * gap;
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy + dy + gap} rx={rx} ry={ry} fill={fill} stroke={col} strokeWidth={3} />
            <rect x={cx - rx} y={cy + dy} width={rx * 2} height={gap} fill={fill} stroke={col} strokeWidth={3} />
          </g>
        );
      })}
      <ellipse cx={cx} cy={cy - gap} rx={rx} ry={ry} fill={hexLerp(SURFACE, RED_SOFT, clamp(crush))} stroke={col} strokeWidth={3} />
      {crush > 0.4 && TXT(cx, cy - gap, '✗', RED, 40 * scale, 800)}
    </g>
  );
};

// ============================================================
// 天秤（軽い指示／重い展開の非対称）。tilt -1..+1（＋でバー側が下がる）
// ============================================================
const Balance: React.FC<{ cx: number; cy: number; scale: number; opacity: number; tilt: number }> = ({
  cx,
  cy,
  scale,
  opacity,
  tilt,
}) => {
  if (opacity <= 0.001) return null;
  const arm = 150 * scale;
  const drop = tilt * 40 * scale;
  const lx = cx - arm;
  const rx = cx + arm;
  const ly = cy + drop;
  const ry = cy - drop;
  return (
    <g opacity={opacity}>
      <line x1={cx} y1={cy} x2={cx} y2={cy + 70 * scale} stroke={SUB_INK} strokeWidth={6 * scale} />
      <path d={'M ' + (cx - 34 * scale) + ' ' + (cy + 70 * scale) + ' L ' + (cx + 34 * scale) + ' ' + (cy + 70 * scale)} stroke={SUB_INK} strokeWidth={6 * scale} strokeLinecap="round" />
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={SUB_INK} strokeWidth={6 * scale} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={9 * scale} fill={SUB_INK} />
      {/* 軽い側（指示・カード） */}
      <line x1={lx} y1={ly} x2={lx} y2={ly + 26 * scale} stroke={DIM} strokeWidth={3 * scale} />
      <path d={'M ' + (lx - 30 * scale) + ' ' + (ly + 26 * scale) + ' A 30 16 0 0 0 ' + (lx + 30 * scale) + ' ' + (ly + 26 * scale)} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={3 * scale} />
      {/* 重い側（展開バー） */}
      <line x1={rx} y1={ry} x2={rx} y2={ry + 26 * scale} stroke={DIM} strokeWidth={3 * scale} />
      <path d={'M ' + (rx - 34 * scale) + ' ' + (ry + 26 * scale) + ' A 34 18 0 0 0 ' + (rx + 34 * scale) + ' ' + (ry + 26 * scale)} fill={RED_SOFT} stroke={RED} strokeWidth={3 * scale} />
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

const MAIN_CY = -40; // 主役の図の中心 y（字幕帯 326 の上）

// ============================================================
// 画面1 — 序論「軽い指示・重い展開」
// ============================================================
const i_in = sc([[8, 0], [44, 1]]);
const i_bar = sc([
  [F('intro.reveal'), 0],
  [F('intro.reveal') + 70, 1900],
]);
const i_heat = sc([
  [F('intro.reveal'), 0],
  [F('intro.reveal') + 70, 1],
]);
const i_scale = sc([[F('intro.scale'), 0], [F('intro.scale') + 40, 1]]);
const i_crush = sc([
  [F('intro.crush'), 0],
  [F('intro.crush') + 56, 1],
  [F('intro.weight'), 1],
  [F('intro.weight') + 40, 0],
]);
const i_name = sc([[F('intro.name'), 0], [F('intro.name') + 42, 1]]);
const i_weight = sc([[F('intro.weight'), 0], [F('intro.weight') + 50, 1]]);

const CARD_X = -640;
const BAR_X0 = -540;

const SceneIntro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(i_in, f);
  const barLen = rv(i_bar, f);
  const heat = rv(i_heat, f);
  const scaleN = rv(i_scale, f);
  const crush = rv(i_crush, f);
  const name = rv(i_name, f);
  const weight = rv(i_weight, f);

  return (
    <g opacity={vis}>
      {/* 展開バー（重い） */}
      <ExpandBar x0={BAR_X0} cy={MAIN_CY} fullLen={barLen} h={120} heat={heat} opacity={inA} />

      {/* 数値の叩き */}
      {scaleN > 0.02 && (
        <g opacity={scaleN}>
          {TXT(120, MAIN_CY - 116, '4.5 PB', RED, FS_BIG, 800)}
          {TXT(120, MAIN_CY - 56, '= GB × 100万', SUB_INK, FS_NOTE, 700)}
        </g>
      )}

      {/* 開いた側のディスク（潰れる） */}
      <DiskStack cx={812} cy={MAIN_CY + 6} scale={1} opacity={inA * clamp(crush * 2.4)} crush={crush} />

      {/* 指示カード（軽い・終始小さい） */}
      <InstrCard cx={CARD_X} cy={MAIN_CY} scale={0.86} opacity={inA} lines={3} glow={name} />
      {TXT(CARD_X, MAIN_CY + 116, '42 KB', INDIGO_DARK, FS_NOTE, 700)}
      {name > 0.05 && (
        <g opacity={name}>
          {TXT(CARD_X, MAIN_CY - 116, 'zip爆弾', INDIGO_DARK, FS_LABEL, 800)}
        </g>
      )}

      {/* 軽い／重いの天秤 */}
      {weight > 0.02 && (
        <g opacity={weight}>
          <Balance cx={0} cy={206} scale={0.86} opacity={1} tilt={weight} />
          {TXT(-150, 300, '軽い', INDIGO_DARK, FS_NOTE, 700)}
          {TXT(150, 300, '重い', RED, FS_NOTE, 700)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面2 — ボディ1「圧縮＝指示書」
// ============================================================
const b1_in = sc([[sceneStarts.body1 + 8, 0], [sceneStarts.body1 + CROSSFADE + 18, 1]]);
const b1_collapse = sc([
  [F('b1.collapse'), 0],
  [F('b1.collapse') + 60, 1],
]);
const b1_instr = sc([[F('b1.instr'), 0], [F('b1.instr') + 42, 1]]);
const b1_backref = sc([[F('b1.backref'), 0], [F('b1.backref') + 54, 1]]);
const b1_lz77 = sc([[F('b1.lz77'), 0], [F('b1.lz77') + 42, 1]]);
const b1_mono = sc([[F('b1.monotone'), 0], [F('b1.monotone') + 48, 1]]);

const SceneBody1: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b1_in, f);
  const collapse = rv(b1_collapse, f);
  const instr = rv(b1_instr, f);
  const backref = rv(b1_backref, f);
  const lz77 = rv(b1_lz77, f);
  const mono = rv(b1_mono, f);

  // 長いバー（「あ」×1000）→ 畳まれて小さな指示カードへ
  const longLen = lerp(1480, 150, collapse);
  const barX0 = -740;
  const cardCx = barX0 + 75;

  return (
    <g opacity={vis}>
      {/* 畳まれる前の長いバー（中身そのもの） */}
      <g opacity={inA * (1 - collapse)}>
        <rect x={barX0} y={MAIN_CY - 56} width={longLen} height={112} rx={8} fill={SURFACE} stroke={EDGE} strokeWidth={3} />
        {Array.from({ length: 26 }).map((_, i) => (
          <text key={i} x={barX0 + 30 + i * 55} y={MAIN_CY} fill={hexLerp(SUB_INK, INDIGO, mono)} fontSize={40} fontFamily={FONT} fontWeight={700} textAnchor="middle" dominantBaseline="central" opacity={clamp(1 - collapse * 1.4)}>
            あ
          </text>
        ))}
        {TXT(barX0 + longLen / 2, MAIN_CY - 92, '「あ」が千個ならぶ', SUB_INK, FS_NOTE, 700)}
      </g>

      {/* 畳まれた後の指示カード＋「×千」 */}
      {collapse > 0.05 && (
        <g opacity={collapse}>
          <InstrCard cx={cardCx} cy={MAIN_CY} scale={0.78} opacity={1} lines={2} glow={instr} />
          {/* 後方参照の弧（自分の直前へ戻って繰り返す） */}
          {backref > 0.02 && (
            <g opacity={backref}>
              <rect x={cardCx - 30} y={MAIN_CY + 18} width={32} height={32} rx={6} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={3} />
              <path d={'M ' + (cardCx + 90) + ' ' + (MAIN_CY + 34) + ' q 120 -90 0 -130 q -120 -40 -100 60'} fill="none" stroke={INDIGO} strokeWidth={5} strokeLinecap="round" />
              <path d={'M ' + (cardCx - 18) + ' ' + (MAIN_CY - 30) + ' l 8 -22 l 18 14'} fill="none" stroke={INDIGO} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              {TXT(cardCx + 120, MAIN_CY + 96, '元はひと並びだけ', INDIGO_DARK, FS_TINY, 700)}
            </g>
          )}
          {TXT(cardCx, MAIN_CY - 124, '× 千', INDIGO_DARK, FS_LABEL, 800)}
          {instr > 0.1 && TXT(cardCx, MAIN_CY + 126, '指示書', INDIGO_DARK, FS_NOTE, 700)}
        </g>
      )}

      {/* LZ77 / DEFLATE ラベル */}
      {lz77 > 0.05 && (
        <g opacity={lz77}>
          <rect x={120} y={MAIN_CY - 40} width={520} height={80} rx={14} fill={SURFACE} stroke={INDIGO} strokeWidth={3} />
          {TXT(380, MAIN_CY, 'LZ77 / DEFLATE', INDIGO_DARK, FS_LABEL, 800)}
          {TXT(380, MAIN_CY + 80, '「前を指して繰り返せ」', SUB_INK, FS_NOTE, 700)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面3 — ボディ2「一枚では爆弾になれない／入れ子と検知」
// ============================================================
const b2_in = sc([[sceneStarts.body2 + 8, 0], [sceneStarts.body2 + CROSSFADE + 18, 1]]);
const b2_ceil = sc([[F('b2.ceiling'), 0], [F('b2.ceiling') + 50, 1]]);
const b2_small = sc([[F('b2.small'), 0], [F('b2.small') + 42, 1]]);
const b2_single = sc([
  [sceneStarts.body2, 1],
  [F('b2.nest'), 1],
  [F('b2.nest') + 44, 0],
]);
const b2_nest = sc([[F('b2.nest'), 0], [F('b2.nest') + 60, 1]]);
const b2_zip42 = sc([[F('b2.zip42'), 0], [F('b2.zip42') + 50, 1]]);
const b2_tail = sc([[F('b2.tail'), 0], [F('b2.tail') + 56, 1]]);
const b2_detect = sc([[F('b2.detect'), 0], [F('b2.detect') + 50, 1]]);

const SceneBody2: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b2_in, f);
  const ceil = rv(b2_ceil, f);
  const small = rv(b2_small, f);
  const single = rv(b2_single, f);
  const nest = rv(b2_nest, f);
  const zip42 = rv(b2_zip42, f);
  const tail = rv(b2_tail, f);
  const detect = rv(b2_detect, f);

  // 一枚の指示：バーが ×1032 の定規で頭打ち
  const ceilX = -120;
  const barLen = lerp(70, ceilX - (-740), clamp(ceil * 1.1));
  const N = 5; // 入れ子段数

  return (
    <g opacity={vis}>
      {/* 一枚の指示書（天井つき） */}
      <g opacity={inA * single}>
        <InstrCard cx={-700} cy={MAIN_CY} scale={0.64} opacity={1} lines={2} />
        <ExpandBar x0={-630} cy={MAIN_CY} fullLen={barLen} h={92} heat={0.15} opacity={1} />
        {/* ×1032 の定規（壁） */}
        {ceil > 0.05 && (
          <g opacity={ceil}>
            <line x1={ceilX} y1={MAIN_CY - 96} x2={ceilX} y2={MAIN_CY + 96} stroke={SUB_INK} strokeWidth={5} strokeDasharray="10 9" />
            {TXT(ceilX, MAIN_CY - 128, '× 1032 が天井', SUB_INK, FS_NOTE, 800)}
          </g>
        )}
        {small > 0.05 && TXT(ceilX + 230, MAIN_CY, '42 KB → 43 MB', AMBER, FS_LABEL, 800)}
        {small > 0.3 && TXT(ceilX + 230, MAIN_CY + 70, 'これでは潰れない', SUB_INK, FS_NOTE, 700)}
      </g>

      {/* 入れ子（指示書のなかに指示書 ×5段） */}
      {nest > 0.02 && (
        <g opacity={nest}>
          {Array.from({ length: N }).map((_, i) => {
            const s = 1 - i * 0.17;
            const ap = clamp(nest * (N + 1) - i);
            if (ap <= 0.01) return null;
            return <InstrCard key={i} cx={-470 + i * 6} cy={MAIN_CY} scale={0.96 * s} opacity={ap} lines={2} />;
          })}
          {TXT(-470, MAIN_CY - 168, '指示書のなかに、指示書', INDIGO_DARK, FS_NOTE, 700)}
          {zip42 > 0.05 && (
            <g opacity={zip42}>
              {TXT(330, MAIN_CY - 64, '× 16 を 5段', SUB_INK, FS_NOTE, 700)}
              {TXT(330, MAIN_CY + 2, '≈ 100万倍', INDIGO_DARK, FS_LABEL, 800)}
              {TXT(330, MAIN_CY + 78, '42.zip = 4.5 PB', RED, FS_LABEL, 800)}
            </g>
          )}
        </g>
      )}

      {/* 尻尾（開けるたび、また圧縮ファイル） */}
      {tail > 0.02 && (
        <g opacity={tail}>
          {[0, 1, 2, 3].map((i) => {
            const ap = clamp(tail * 5 - i - 0.4);
            if (ap <= 0.01) return null;
            const x = -560 + i * 150;
            return (
              <g key={i} opacity={ap}>
                <rect x={x - 40} y={MAIN_CY + 150} width={80} height={64} rx={8} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={3} />
                {i < 3 && <path d={'M ' + (x + 48) + ' ' + (MAIN_CY + 182) + ' l 46 0'} stroke={SUB_INK} strokeWidth={4} strokeLinecap="round" markerEnd="" />}
                {i < 3 && <path d={'M ' + (x + 86) + ' ' + (MAIN_CY + 174) + ' l 10 8 l -10 8'} fill="none" stroke={SUB_INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
              </g>
            );
          })}
          {TXT(-260, MAIN_CY + 250, '開けても、また圧縮ファイル', SUB_INK, FS_NOTE, 700)}
        </g>
      )}

      {/* 検査が尻尾を捉えて止める（赤✗） */}
      <Lens cx={520} cy={MAIN_CY + 182} scale={1} opacity={detect} verdict={-detect} />
      {detect > 0.4 && TXT(520, MAIN_CY + 270, 'この尻尾で見破られる', RED, FS_NOTE, 800)}
    </g>
  );
};

// ============================================================
// 画面4 — ボディ3「重ねずに重ねる（overlapping）」
// ============================================================
const b3_in = sc([[sceneStarts.body3 + 8, 0], [sceneStarts.body3 + CROSSFADE + 18, 1]]);
const b3_toc = sc([[F('b3.toc'), 0], [F('b3.toc') + 50, 1]]);
const b3_normal = sc([[F('b3.normal'), 0], [F('b3.normal') + 48, 1]]);
const b3_overlap = sc([[F('b3.overlap'), 0], [F('b3.overlap') + 60, 1]]);
const b3_expand = sc([[F('b3.expand'), 0], [F('b3.expand') + 64, 1900]]);
const b3_expandHeat = sc([[F('b3.expand'), 0], [F('b3.expand') + 64, 1]]);
const b3_evade = sc([[F('b3.evade'), 0], [F('b3.evade') + 50, 1]]);
const b3_power = sc([[F('b3.power'), 0], [F('b3.power') + 48, 1]]);

const TOC_N = 6;
const SceneBody3: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(b3_in, f);
  const toc = rv(b3_toc, f);
  const normal = rv(b3_normal, f);
  const overlap = rv(b3_overlap, f);
  const expandLen = rv(b3_expand, f);
  const expandHeat = rv(b3_expandHeat, f);
  const evade = rv(b3_evade, f);
  const power = rv(b3_power, f);

  const tocY = MAIN_CY - 150;
  const dataY = MAIN_CY + 110;
  const itemX = (i: number) => -560 + i * 180;
  const oneTargetX = 0;

  return (
    <g opacity={vis}>
      {/* 目次の項目列 */}
      {Array.from({ length: TOC_N }).map((_, i) => {
        const ap = clamp(inA * (TOC_N + 1) - i);
        if (ap <= 0.01) return null;
        return (
          <g key={i} opacity={ap}>
            <rect x={itemX(i) - 64} y={tocY - 26} width={128} height={52} rx={9} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={3} />
            {TXT(itemX(i), tocY, '項目' + (i + 1), INDIGO_DARK, FS_TINY, 700)}
          </g>
        );
      })}
      {TXT(-700, tocY, '目次', SUB_INK, FS_NOTE, 800, 'end')}

      {/* 指し矢印（散→束） */}
      {toc > 0.02 &&
        Array.from({ length: TOC_N }).map((_, i) => {
          // normal=別々の塊 / overlap=ひとつの塊へ束ねる
          const sepX = itemX(i);
          const tx = lerp(sepX, oneTargetX, clamp(overlap));
          const ap = clamp(toc * (TOC_N + 1) - i) * (1 - 0.5 * evade);
          const col = overlap > 0.3 ? hexLerp(SUB_INK, INDIGO, overlap) : SUB_INK;
          return (
            <line key={i} x1={sepX} y1={tocY + 28} x2={tx} y2={dataY - 46} stroke={col} strokeWidth={3.5} opacity={ap * 0.85} />
          );
        })}

      {/* データ領域：normal=散らばる塊 / overlap=ひとかたまり */}
      {Array.from({ length: TOC_N }).map((_, i) => {
        const sepX = itemX(i);
        const tx = lerp(sepX, oneTargetX, clamp(overlap));
        const ap = clamp(toc * (TOC_N + 1) - i);
        // overlap が進むと重なって1個に見える
        const op = ap * (1 - clamp(overlap * 1.3 - 0.3) * (i === Math.floor(TOC_N / 2) ? 0 : 1));
        if (op <= 0.01) return null;
        return (
          <rect key={i} x={tx - 52} y={dataY - 40} width={104} height={80} rx={10} fill={AMBER_SOFT} stroke={AMBER} strokeWidth={3} opacity={op} />
        );
      })}
      {normal > 0.05 && overlap < 0.3 && TXT(0, dataY + 92, 'ふつう：別々の中身を指す', SUB_INK, FS_NOTE, 700)}
      {overlap > 0.4 && expandLen < 50 && TXT(0, dataY + 92, '全項目が、同じひとかたまりを指す', INDIGO_DARK, FS_NOTE, 800)}

      {/* 一塊が ×千 に展開（背骨のバー再登場） */}
      {expandLen > 5 && (
        <g>
          <ExpandBar x0={-540} cy={dataY} fullLen={expandLen} h={92} heat={expandHeat} opacity={1} />
          {TXT(-440, dataY - 86, '一個ぶんが ×千', RED, FS_NOTE, 800)}
        </g>
      )}

      {/* 検査をすり抜ける（緑✓・層は一枚） */}
      <Lens cx={640} cy={MAIN_CY - 150} scale={0.92} opacity={evade} verdict={evade} />
      {evade > 0.4 && (
        <g opacity={evade}>
          {TXT(640, MAIN_CY - 250, '層は一枚＝尻尾なし', OKC, FS_NOTE, 800)}
          {TXT(640, MAIN_CY - 210, 'すり抜ける', OKC, FS_NOTE, 700)}
        </g>
      )}

      {power > 0.05 && (
        <g opacity={power}>
          {TXT(560, dataY + 60, '46 MB → 4.5 PB', RED, FS_LABEL, 800)}
          {TXT(560, dataY + 116, '一段のまま・同じ威力', SUB_INK, FS_NOTE, 700)}
        </g>
      )}
    </g>
  );
};

// ============================================================
// 画面5 — 結論「軽さが武器・ウイルスへ」
// ============================================================
const o_in = sc([[sceneStarts.outro + 8, 0], [sceneStarts.outro + CROSSFADE + 18, 1]]);
const o_recap = sc([[F('outro.recap'), 0], [F('outro.recap') + 50, 1]]);
const o_burn = sc([
  [F('outro.burn'), 0],
  [F('outro.burn') + 56, 1],
  [F('outro.virus'), 1],
  [F('outro.virus') + 40, 0],
]);
const o_virus = sc([[F('outro.virus'), 0], [F('outro.virus') + 60, 1]]);
const o_host = sc([[F('outro.host'), 0], [F('outro.host') + 70, 1]]);
const o_loop = sc([
  [F('outro.loopback'), 0],
  [F('outro.loopback') + 50, 1],
  [F('outro.end'), 1],
  [F('outro.end') + 40, 0],
]);
const o_end = sc([[F('outro.end'), 0], [F('outro.end') + 64, 1]]);

const Virus: React.FC<{ cx: number; cy: number; scale: number; opacity: number }> = ({ cx, cy, scale, opacity }) => {
  if (opacity <= 0.001) return null;
  const r = 46 * scale;
  const pts = Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return cx + r * Math.cos(a) + ',' + (cy + r * Math.sin(a));
    })
    .join(' ');
  return (
    <g opacity={opacity}>
      <polygon points={pts} fill={INDIGO_SOFT} stroke={INDIGO} strokeWidth={4 * scale} />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const x1 = cx + r * Math.cos(a);
        const y1 = cy + r * Math.sin(a);
        const x2 = cx + (r + 16 * scale) * Math.cos(a);
        const y2 = cy + (r + 16 * scale) * Math.sin(a);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INDIGO} strokeWidth={3 * scale} />
            <circle cx={x2} cy={y2} r={5 * scale} fill={INDIGO} />
          </g>
        );
      })}
    </g>
  );
};

const SceneOutro: React.FC<{ f: number; vis: number }> = ({ f, vis }) => {
  if (vis <= 0.001) return null;
  const inA = rv(o_in, f);
  const recap = rv(o_recap, f);
  const burn = rv(o_burn, f);
  const virus = rv(o_virus, f);
  const host = rv(o_host, f);
  const loop = rv(o_loop, f);
  const end = rv(o_end, f);

  // recap/burn 期はカード中心、virus 期はカプシド＋細胞、end 期は天秤
  // end が立ち上がると、前局面の装置（ウイルス・細胞・弱点文）は退場する
  const endFade = clamp(end * 2.4); // 前局面は end の前半で素早く退場
  const endShow = clamp(end * 1.9 - 0.75); // 天秤は退場後に登場（同時表示を避ける）
  const cardCx = lerp(0, -440, clamp(virus * 1.2));
  const cellCx = 360;

  return (
    <g opacity={vis}>
      {/* 指示カード（→ カプシドへモーフ） */}
      <InstrCard cx={cardCx} cy={MAIN_CY} scale={lerp(0.92, 0.62, clamp(virus))} opacity={inA * (1 - clamp(virus * 1.4 - 0.4))} lines={recap > 0.4 ? 1 : 3} glow={0} />
      {recap > 0.3 && virus < 0.2 && TXT(0, MAIN_CY + 150, '中身は、短い指示だけ', INDIGO_DARK, FS_NOTE, 700)}

      {/* burn：指示が資源を焼く */}
      {burn > 0.02 && (
        <g opacity={burn}>
          <path d={'M ' + 90 + ' ' + MAIN_CY + ' l 180 0'} stroke={RED} strokeWidth={6} strokeLinecap="round" strokeDasharray="10 10" />
          <path d={'M ' + 262 + ' ' + (MAIN_CY - 10) + ' l 16 10 l -16 10'} fill="none" stroke={RED} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <DiskStack cx={420} cy={MAIN_CY + 4} scale={0.92} opacity={1} crush={burn} />
          {TXT(420, MAIN_CY + 116, '開いた側の資源を焼く', RED, FS_NOTE, 700)}
        </g>
      )}

      {/* virus：カプシド＋細胞、host で律儀に量産 */}
      {virus > 0.05 && endFade < 0.98 && (
        <g opacity={virus * (1 - endFade)}>
          <Virus cx={cardCx} cy={MAIN_CY} scale={0.92} opacity={1} />
          {TXT(cardCx, MAIN_CY + 116, 'ウイルス（指示書）', INDIGO_DARK, FS_NOTE, 700)}
          {/* 細胞 */}
          <circle cx={cellCx} cy={MAIN_CY} r={170} fill={OKC_SOFT} stroke={OKC} strokeWidth={4} opacity={0.9} />
          <circle cx={cellCx} cy={MAIN_CY} r={150} fill="none" stroke={OKC} strokeWidth={2} strokeDasharray="6 8" opacity={0.6} />
          {TXT(cellCx, MAIN_CY + 210, '細胞（律儀に実行する側）', SUB_INK, FS_NOTE, 700)}
          {/* 量産されるコピー */}
          {host > 0.02 &&
            [0, 1, 2, 3].map((i) => {
              const ap = clamp(host * 5 - i - 0.4);
              if (ap <= 0.01) return null;
              const a = (Math.PI / 2) * i - Math.PI / 4;
              return <Virus key={i} cx={cellCx + 78 * Math.cos(a)} cy={MAIN_CY + 78 * Math.sin(a)} scale={0.5} opacity={ap} />;
            })}
        </g>
      )}

      {/* loopback：律儀さが弱点 */}
      {loop > 0.05 && virus > 0.3 && endFade < 0.98 && (
        <g opacity={loop * (1 - endFade)}>
          {TXT(0, 250, '律儀に実行する側の真面目さが、そのまま弱点になる', INK, FS_NOTE, 800)}
        </g>
      )}

      {/* end：軽い／重いの極端な天秤＋締め */}
      {endShow > 0.02 && (
        <g opacity={endShow}>
          <Balance cx={0} cy={MAIN_CY - 30} scale={1.08} opacity={1} tilt={1} />
          {TXT(-200, MAIN_CY + 110, '軽い指示', INDIGO_DARK, FS_NOTE, 700)}
          {TXT(220, MAIN_CY - 80, '重い結果', RED, FS_NOTE, 700)}
          {TXT(0, 232, 'いちばん軽いものが、いちばん重い結果を生む', INDIGO_DARK, FS_LABEL, 800)}
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
  { start: sceneStarts.body1, text: '01 圧縮は、データでなく指示書' },
  { start: sceneStarts.body2, text: '02 一枚の指示書では、爆弾になれない' },
  { start: sceneStarts.body3, text: '03 重ねずに、重ねる' },
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

// 現在の行（字幕・口パク・表情で共有）
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

// その話者の最新行 index（表情差分の巡回キー）
const lastLineOf = (frame: number, sp: Speaker): number => {
  let idx = 0;
  for (let i = 0; i < SCRIPT.length; i++)
    if (SCRIPT[i].speaker === sp && frame >= lineStarts[i]) idx = i;
  return idx;
};
// モック口パク：セリフ区間中だけ一定間隔で開閉
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
    zIndex: 30, // 字幕帯(zIndex 25)より前面
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

// ===== 対話字幕（04_remotion.md §7・必須・HTML 帯／最前面）=====
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
        <div style={{ fontSize: FS_SPEAKER, fontWeight: 800, color: SPEAKER_COLOR[line.speaker] }}>
          {line.speaker}
        </div>
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
