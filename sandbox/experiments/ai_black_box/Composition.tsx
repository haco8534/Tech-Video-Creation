// AIのブラックボックスを開けてみる — design_spec.md の event を実装する
// 構成: シーンSVG(背景+図) → 見出しHTML → 床 → 立ち絵 → 字幕カード
import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import { SCRIPT, type Speaker } from './scriptData';
import { AUDIO, LINE_STARTS, TOTAL_FRAMES, VOICE_SRC } from './audioData';

const { fontFamily } = loadFont();

export { TOTAL_FRAMES };

// ---------------- palette ----------------
const BG = '#f6f8fc';
const INK = '#243044';
const C_IN = '#3b7dd8'; // 入力・データ
const C_W = '#7c5cff'; // 重み・回路
const C_LOSS = '#e05252'; // 損失・誤り
const C_OUT = '#f09f1f'; // 出力・候補
const C_OK = '#2f9e63'; // 検証・人間側
const C_BOX = '#1b2230'; // 黒い箱
const DIM = 'rgba(36,48,68,0.35)';

// ---------------- bgm ----------------
const BGM_SRC = 'audio/bgm/340_long_BPM80.mp3'; // 既定 BGM（全題材共通）。staticFile 相対
const BGM_VOLUME = 0.03; // ナレーションの下に薄く敷く控えめな音量

// ---------------- timing helpers ----------------
const ease = Easing.bezier(0.4, 0, 0.2, 1);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
/** start から dur フレームかけて 0→1（イージング済み） */
const ramp = (f: number, start: number, dur = 18): number => ease(clamp01((f - start) / dur));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Keyframe<S> = { f: number; state: S };
type Track<S> = Keyframe<S>[];
const blendNumeric = <S,>(a: S, b: S, t: number): S => {
    const aR = a as unknown as Record<string, number>;
    const bR = b as unknown as Record<string, number>;
    const out: Record<string, number> = {};
    for (const k in aR) out[k] = aR[k] + (bR[k] - aR[k]) * t;
    return out as unknown as S;
};
const resolve = <S,>(track: Track<S>, f: number): S => {
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

// 決定論的な擬似乱数（揺らぎ配置用）
const rnd = (i: number): number => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
};

// ---------------- event frames ----------------
const EVENT_FRAME: Record<string, number> = {};
SCRIPT.forEach((l, i) => {
    if (l.event) EVENT_FRAME[l.event] = LINE_STARTS[i];
});
const evf = (name: string): number => {
    const v = EVENT_FRAME[name];
    if (v === undefined) throw new Error(`unknown event: ${name}`);
    return v;
};

// hex 色の線形補間
const mixColor = (a: string, b: string, t: number): string => {
    const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
    const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
    const c = pa.map((v, i) => Math.round(lerp(v, pb[i], clamp01(t))));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
};
/** 入力→重み→出力の 3 段グラデーション */
const flowColor = (t: number): string => (t < 0.5 ? mixColor(C_IN, C_W, t * 2) : mixColor(C_W, C_OUT, (t - 0.5) * 2));

// ---------------- 共有小物 ----------------
/** 役割ラベル 1 語のピル */
const RoleTag: React.FC<{ x: number; y: number; label: string; color?: string; o?: number; fs?: number }> = ({
    x,
    y,
    label,
    color = INK,
    o = 1,
    fs = 30,
}) => {
    const w = label.length * fs * 1.08 + fs * 1.4;
    const h = fs * 1.8;
    return (
        <g opacity={o}>
            <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill="#fff" stroke={color} strokeWidth={3} />
            <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={900} fill={color}>
                {label}
            </text>
        </g>
    );
};

/** モダリティの小アイコン（文章・画像・コード・音声）。0,0 中心 ~90px */
const IconGlyph: React.FC<{ kind: 'text' | 'image' | 'code' | 'sound' }> = ({ kind }) => {
    if (kind === 'text')
        return (
            <g>
                <rect x={-32} y={-42} width={64} height={84} rx={8} fill="#fff" stroke={INK} strokeWidth={4} />
                {[-20, -4, 12, 28].map((y, i) => (
                    <line key={i} x1={-20} y1={y} x2={i === 3 ? 2 : 20} y2={y} stroke={C_IN} strokeWidth={5} strokeLinecap="round" />
                ))}
            </g>
        );
    if (kind === 'image')
        return (
            <g>
                <rect x={-42} y={-32} width={84} height={64} rx={8} fill="#fff" stroke={INK} strokeWidth={4} />
                <circle cx={18} cy={-12} r={8} fill={C_OUT} />
                <path d="M -34 22 L -10 -8 L 8 12 L 20 0 L 34 22 Z" fill={C_OK} opacity={0.85} />
            </g>
        );
    if (kind === 'code')
        return (
            <g>
                <rect x={-42} y={-30} width={84} height={60} rx={8} fill={INK} />
                <text x={0} y={10} textAnchor="middle" fontSize={30} fontWeight={900} fill="#9fe8c0" fontFamily="monospace">
                    {'</>'}
                </text>
            </g>
        );
    return (
        <g>
            <path d="M -30 -14 L -12 -14 L 8 -32 L 8 32 L -12 14 L -30 14 Z" fill={INK} />
            <path d="M 18 -14 Q 30 0 18 14" fill="none" stroke={C_IN} strokeWidth={5} strokeLinecap="round" />
            <path d="M 26 -24 Q 44 0 26 24" fill="none" stroke={C_IN} strokeWidth={5} strokeLinecap="round" />
        </g>
    );
};

// ---------------- scenes ----------------
type SceneProps = { f: number; vis: number };

const SCENES = [
    { key: 'intro', ev: 'scene.intro.in', title: 'AIのブラックボックスを開ける' },
    { key: 'map', ev: 'scene.map.in', title: 'AIという言葉の地図' },
    { key: 'weights', ev: 'scene.weights.in', title: '中身は重みの回路' },
    { key: 'training', ev: 'scene.training.in', title: '学習 — つまみを少しずつ回す' },
    { key: 'inference', ev: 'scene.inference.in', title: '推論 — 入力が何層も翻訳される' },
    { key: 'scale', ev: 'scene.scale.in', title: '高性能化の四本柱' },
    { key: 'limits', ev: 'scene.limits.in', title: '完全な闇ではない' },
    { key: 'outro', ev: 'scene.outro.in', title: 'まとめ' },
] as const;

/** scene i の不透明度（前後 12f でクロスフェード） */
const sceneVis = (i: number, f: number): number => {
    const tIn = evf(SCENES[i].ev);
    const vIn = i === 0 ? 1 : ramp(f, tIn, 12);
    const vOut = i === SCENES.length - 1 ? 0 : ramp(f, evf(SCENES[i + 1].ev), 12);
    return vIn * (1 - vOut);
};

const SceneIntro: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.intro.in');
    const tOrb = evf('icons.orbit');
    const tDoc = evf('doctor.false');
    const tSearch = evf('search.false');
    const tOpen = evf('box.open');
    const tPin = evf('question.pin');

    const B = { cx: 0, cy: -100, w: 420, h: 310 }; // 黒い箱
    const bx = B.cx - B.w / 2;
    const by = B.cy - B.h / 2;

    const boxIn = ramp(f, t0, 20);
    const open = ramp(f, tOpen, 35);

    // 周囲のモダリティアイコン → 箱へ吸い込まれる
    const ICONS: { x: number; y: number; kind: 'text' | 'image' | 'code' | 'sound' }[] = [
        { x: -430, y: -330, kind: 'text' },
        { x: 430, y: -330, kind: 'image' },
        { x: -430, y: 110, kind: 'code' },
        { x: 430, y: 110, kind: 'sound' },
    ];

    // 偽の中身（博士・検索窓）の表示窓
    const docO = ramp(f, tDoc, 15) * (1 - ramp(f, Math.min(tDoc + 110, tSearch - 15), 15));
    const docStrike = ramp(f, tDoc + 35, 18);
    const seaO = ramp(f, tSearch, 15) * (1 - ramp(f, Math.min(tSearch + 110, tOpen - 15), 15));
    const seaStrike = ramp(f, tSearch + 35, 18);

    // 「？」は吸い込み後に灯り、開扉で消える
    const qmO = ramp(f, tOrb + 35, 20) * (1 - open);

    // 開いた中の簡略工場：数字粒 → 層 → 出力ゲート
    const slabs = [-80, 0, 80]; // 箱内の層 x
    const flow = (i: number) => ramp(f, tOpen + 30 + i * 10, 70);

    // 問いのピン
    const pinIn = ramp(f, tPin, 26);
    const pinY = lerp(by - 280, by - 120, pinIn);

    return (
        <g opacity={vis}>
            {/* アイコン */}
            {ICONS.map((ic, i) => {
                const pop = ramp(f, t0 + 8 + i * 7, 16);
                const m = ramp(f, tOrb + i * 6, 28); // 吸い込み移動
                const o = pop * (1 - ramp(f, tOrb + i * 6 + 12, 18));
                if (o <= 0.01) return null;
                const x = lerp(ic.x, B.cx, m);
                const y = lerp(ic.y, B.cy, m);
                const s = lerp(0.8 + 0.2 * pop, 0.25, m);
                return (
                    <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
                        <IconGlyph kind={ic.kind} />
                    </g>
                );
            })}

            {/* 箱の内部（開扉で見える簡略工場） */}
            <g opacity={boxIn}>
                <rect x={bx} y={by} width={B.w} height={B.h} rx={26} fill="#2a3550" />
                <g opacity={open}>
                    {slabs.map((sx, i) => (
                        <rect key={i} x={sx - 18} y={B.cy - 95} width={36} height={190} rx={10} fill="#3d4a6b" stroke={C_W} strokeWidth={2.5} />
                    ))}
                    <rect x={bx + B.w - 46} y={B.cy - 45} width={22} height={90} rx={8} fill={C_OUT} />
                    {/* 数字粒の通過（青 → 紫 → 橙） */}
                    {[0, 1, 2].map((i) => {
                        const p = flow(i);
                        if (p <= 0.01 || p >= 0.99) return null;
                        const x = lerp(bx + 36, bx + B.w - 56, p);
                        const y = B.cy + (i - 1) * 44;
                        return (
                            <g key={i}>
                                <circle cx={x} cy={y} r={11} fill={C_IN} opacity={Math.max(0, 1 - p * 2.2)} />
                                <circle cx={x} cy={y} r={11} fill={C_W} opacity={Math.max(0, 1 - Math.abs(p - 0.5) * 2.6)} />
                                <circle cx={x} cy={y} r={11} fill={C_OUT} opacity={Math.max(0, (p - 0.55) * 2.2)} />
                            </g>
                        );
                    })}
                </g>
            </g>

            {/* 前面の扉（左右へ開いてフェード） */}
            <g opacity={1 - open}>
                <g transform={`translate(${-open * 260} 0)`}>
                    <path d={`M ${bx + 26} ${by} H ${B.cx} V ${by + B.h} H ${bx + 26} Q ${bx} ${by + B.h} ${bx} ${by + B.h - 26} V ${by + 26} Q ${bx} ${by} ${bx + 26} ${by} Z`} fill={C_BOX} />
                </g>
                <g transform={`translate(${open * 260} 0)`}>
                    <path d={`M ${B.cx} ${by} H ${bx + B.w - 26} Q ${bx + B.w} ${by} ${bx + B.w} ${by + 26} V ${by + B.h - 26} Q ${bx + B.w} ${by + B.h} ${bx + B.w - 26} ${by + B.h} H ${B.cx} Z`} fill={C_BOX} />
                </g>
                <text x={B.cx} y={B.cy + 38} textAnchor="middle" fontSize={110} fontWeight={900} fill="#fff" opacity={boxIn * (1 - open) * (1 - docO) * (1 - seaO)}>
                    AI
                </text>
                <text x={bx + B.w - 64} y={by + 70} textAnchor="middle" fontSize={56} fontWeight={900} fill={C_OUT} opacity={qmO}>
                    ？
                </text>

                {/* 偽の中身 1: 小さい博士 */}
                <g opacity={docO} transform={`translate(${B.cx} ${B.cy})`}>
                    <circle cx={0} cy={-46} r={26} fill="#e8ecf5" />
                    <path d="M -34 56 Q -34 4 0 4 Q 34 4 34 56 Z" fill="#e8ecf5" />
                    <rect x={-30} y={-86} width={60} height={10} fill="#e8ecf5" />
                    <rect x={-12} y={-100} width={24} height={16} fill="#e8ecf5" />
                    <circle cx={-10} cy={-48} r={8} fill="none" stroke={INK} strokeWidth={3} />
                    <circle cx={10} cy={-48} r={8} fill="none" stroke={INK} strokeWidth={3} />
                    <line x1={-2} y1={-48} x2={2} y2={-48} stroke={INK} strokeWidth={3} />
                    <line x1={-78} y1={64} x2={lerp(-78, 78, docStrike)} y2={lerp(64, -84, docStrike)} stroke={C_LOSS} strokeWidth={10} strokeLinecap="round" opacity={docStrike > 0 ? 1 : 0} />
                </g>

                {/* 偽の中身 2: 検索窓 */}
                <g opacity={seaO} transform={`translate(${B.cx} ${B.cy})`}>
                    <rect x={-130} y={-26} width={260} height={52} rx={26} fill="#e8ecf5" />
                    <circle cx={86} cy={0} r={14} fill="none" stroke={INK} strokeWidth={5} />
                    <line x1={96} y1={10} x2={110} y2={24} stroke={INK} strokeWidth={5} strokeLinecap="round" />
                    <line x1={-108} y1={0} x2={20} y2={0} stroke={DIM} strokeWidth={6} strokeLinecap="round" />
                    <line x1={-150} y1={52} x2={lerp(-150, 150, seaStrike)} y2={lerp(52, -52, seaStrike)} stroke={C_LOSS} strokeWidth={10} strokeLinecap="round" opacity={seaStrike > 0 ? 1 : 0} />
                </g>
            </g>

            {/* 問いのピン */}
            <g opacity={pinIn} transform={`translate(0 ${pinY})`}>
                <path d="M 0 86 L -16 52 L 16 52 Z" fill={C_LOSS} />
                <circle cx={0} cy={0} r={54} fill="#fff" stroke={C_LOSS} strokeWidth={6} />
                <text x={0} y={22} textAnchor="middle" fontSize={62} fontWeight={900} fill={C_LOSS}>
                    ？
                </text>
            </g>
        </g>
    );
};

const SceneMap: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.map.in');
    const tBr = evf('map.branches');
    const tGpt = evf('map.chatgpt.apart');
    const tZoom = evf('deep.zoom');
    const tFrame = evf('scope.frame');
    const tMod = evf('modalities.in');

    // AI 全体地図（入れ子: AI ⊃ 機械学習 ⊃ 深層学習 ⊃ 生成AI）
    const M = { cx: 0, cy: -90, r: 310 };
    const ML = { cx: 95, cy: -30, r: 165 };
    const DL = { cx: 115, cy: 5, r: 105 };
    const GEN = { cx: 138, cy: 28, r: 50 };
    const BUBBLES = [
        { x: -170, y: -230, r: 66, label: '探索' },
        { x: -225, y: -50, r: 62, label: 'ルール' },
        { x: -140, y: 120, r: 66, label: '確率推定' },
    ];

    const mapIn = ramp(f, t0, 22);

    // 深層学習へのカメラズーム
    const cam = resolve(
        [
            { f: tZoom, state: { tx: 0, ty: 0, sc: 1 } },
            { f: tZoom + 45, state: { tx: -264.5, ty: -71.5, sc: 2.3 } },
        ],
        f,
    );

    // ChatGPT 誤解オーバーレイ：AI 全域 → 生成AI の小円へ縮む
    const gMove = ramp(f, tGpt + 10, 50);
    const gO = ramp(f, tGpt, 14) * (1 - ramp(f, tGpt + 95, 25));
    const gx = lerp(M.cx, GEN.cx, gMove);
    const gy = lerp(M.cy, GEN.cy, gMove);
    const gr = lerp(M.r, GEN.r - 6, gMove);

    const coreO = ramp(f, tZoom + 25, 25); // 大規模NNコア
    const frO = ramp(f, tFrame, 22); // スコープ枠
    const frS = lerp(1.18, 1, frO);

    const MODS: { x: number; y: number; kind: 'text' | 'image' | 'sound'; tag: string; ex: number; ey: number }[] = [
        { x: -560, y: -250, kind: 'text', tag: '大規模言語モデル', ex: -215, ey: -112 },
        { x: 560, y: -250, kind: 'image', tag: '拡散モデル', ex: 215, ey: -112 },
        { x: -560, y: 110, kind: 'sound', tag: '音声モデル', ex: -215, ey: 15 },
    ];

    return (
        <g opacity={vis}>
            <g transform={`translate(${cam.tx} ${cam.ty}) scale(${cam.sc})`}>
                {/* AI の大きな円 */}
                <g opacity={mapIn}>
                    <circle cx={M.cx} cy={M.cy} r={M.r} fill="#eef2fb" stroke={INK} strokeWidth={5} />
                    <text x={M.cx} y={M.cy - M.r + 56} textAnchor="middle" fontSize={48} fontWeight={900} fill={INK}>
                        AI
                    </text>
                </g>
                {/* 独立系の領域 */}
                {BUBBLES.map((b, i) => {
                    const o = ramp(f, tBr + i * 10, 16);
                    return (
                        <g key={b.label} opacity={o * mapIn} transform={`translate(${b.x} ${b.y}) scale(${lerp(0.7, 1, o)})`}>
                            <circle r={b.r} fill="#fff" stroke={C_IN} strokeWidth={4} />
                            <text y={10} textAnchor="middle" fontSize={28} fontWeight={900} fill={INK}>
                                {b.label}
                            </text>
                        </g>
                    );
                })}
                {/* 入れ子の系統 */}
                {[
                    { c: ML, label: '機械学習', ly: ML.cy - ML.r + 36, d: 30 },
                    { c: DL, label: '深層学習', ly: DL.cy - DL.r + 32, d: 40 },
                    { c: GEN, label: '生成AI', ly: GEN.cy + 8, d: 50 },
                ].map((n, i) => {
                    const o = ramp(f, tBr + n.d, 16) * (i === 2 ? 1 - coreO * 0.85 : 1); // 生成AI 円はコア強調で退く
                    return (
                        <g key={n.label} opacity={o * mapIn}>
                            <circle cx={n.c.cx} cy={n.c.cy} r={n.c.r} fill={i === 2 ? '#f3efff' : '#fff'} stroke={C_W} strokeWidth={4} opacity={0.92} />
                            <text x={n.c.cx} y={n.ly} textAnchor="middle" fontSize={i === 0 ? 26 : 24} fontWeight={900} fill={i === 2 ? C_W : INK}>
                                {n.label}
                            </text>
                        </g>
                    );
                })}
                {/* ChatGPT は AI 全体ではなく生成AI の一点 */}
                <g opacity={gO}>
                    <circle cx={gx} cy={gy} r={gr} fill="rgba(214,51,108,0.14)" stroke="#d6336c" strokeWidth={4} strokeDasharray="14 10" />
                    <text x={gx} y={gy - gr - 12} textAnchor="middle" fontSize={lerp(34, 20, gMove)} fontWeight={900} fill="#d6336c">
                        ChatGPT
                    </text>
                </g>
                {/* ズーム後に見える中核回路 */}
                <g opacity={coreO}>
                    <rect x={DL.cx - 75} y={DL.cy - 27} width={150} height={84} rx={10} fill="#2a3550" />
                    {[-40, 0, 40].map((dx, i) => (
                        <rect key={i} x={DL.cx + dx - 9} y={DL.cy - 15} width={18} height={60} rx={5} fill="#3d4a6b" stroke={C_W} strokeWidth={1.5} />
                    ))}
                    <text x={DL.cx} y={DL.cy + 86} textAnchor="middle" fontSize={17} fontWeight={900} fill={INK}>
                        大規模ニューラルネット
                    </text>
                </g>
            </g>

            {/* 今回のスコープ枠（画面座標） */}
            <g opacity={frO} transform={`translate(0 -37) scale(${frS})`}>
                <rect x={-215} y={-125} width={430} height={250} rx={26} fill="none" stroke={C_OUT} strokeWidth={10} />
            </g>

            {/* モダリティの小窓 → 中核へ */}
            {MODS.map((mw, i) => {
                const o = ramp(f, tMod + i * 12, 18);
                if (o <= 0.01) return null;
                const le = ramp(f, tMod + i * 12 + 10, 22);
                return (
                    <g key={mw.tag} opacity={o}>
                        <line x1={mw.x} y1={mw.y} x2={lerp(mw.x, mw.ex, le)} y2={lerp(mw.y, mw.ey, le)} stroke={DIM} strokeWidth={5} strokeDasharray="2 12" strokeLinecap="round" />
                        <rect x={mw.x - 85} y={mw.y - 70} width={170} height={140} rx={18} fill="#fff" stroke={INK} strokeWidth={4} />
                        <g transform={`translate(${mw.x} ${mw.y - 14})`}>
                            <IconGlyph kind={mw.kind} />
                        </g>
                        <text x={mw.x} y={mw.y + 48} textAnchor="middle" fontSize={22} fontWeight={900} fill={INK}>
                            {mw.tag}
                        </text>
                    </g>
                );
            })}
        </g>
    );
};

/** 重みつまみ（白円＋針）。angle は度 */
const Knob: React.FC<{ x: number; y: number; angle: number; r?: number; o?: number; hot?: number }> = ({ x, y, angle, r = 14, o = 1, hot = 0 }) => (
    <g opacity={o} transform={`translate(${x} ${y})`}>
        {hot > 0.01 && <circle r={r + 9} fill="none" stroke={C_OUT} strokeWidth={4} opacity={hot} />}
        <circle r={r} fill="#fff" stroke={C_W} strokeWidth={3.5} />
        <line x1={0} y1={0} x2={r * 0.72 * Math.cos((angle * Math.PI) / 180)} y2={r * 0.72 * Math.sin((angle * Math.PI) / 180)} stroke={C_W} strokeWidth={3.5} strokeLinecap="round" />
    </g>
);

// 画面3,4で共有する回路ジオメトリ
const W_SLABS = [-420, -140, 140, 420]; // 層 x
const W_ROWS = [-130, -45, 45, 130]; // 接続線 y（cy 基準）
const W_CY = -90;
const W_KNOBS: { x: number; y: number }[] = [];
for (let g = 0; g < 3; g++)
    for (let r = 0; r < 4; r++)
        for (let s = 0; s < 2; s++)
            W_KNOBS.push({ x: (W_SLABS[g] + W_SLABS[g + 1]) / 2 + (s === 0 ? -55 : 55), y: W_CY + W_ROWS[r] });

const SceneWeights: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.weights.in');
    const tFade = evf('rules.fade');
    const tKnob = evf('knobs.in');
    const tFlow = evf('signal.flow');
    const tDist = evf('knobs.distributed');
    const tMaze = evf('transparent.maze');

    const fade = ramp(f, tFade, 25); // ルール棚 → 回路
    const mazeIn = ramp(f, tMaze, 30);
    const circuitO = fade * lerp(1, 0.5, mazeIn);

    // 信号の波（左→右を一度だけ走る）
    const wave = ramp(f, tFlow + 8, 85);
    const wx = lerp(-560, 560, wave);
    const glow = (x: number) => Math.max(0, 1 - Math.abs(wx - x) / 180) * (wave > 0.01 && wave < 0.99 ? 1 : 0);

    // 「猫の耳」ラベルの分散
    const chip = { x: 0, y: -330 };
    const target = W_KNOBS[13]; // 中央ギャップのつまみ
    const move = ramp(f, tDist + 8, 30);
    const burst = ramp(f, tDist + 42, 35);
    const chipO = ramp(f, tDist, 12) * (1 - ramp(f, tDist + 46, 14));
    const SPREAD = [2, 5, 9, 16, 18, 21, 1, 22]; // 飛散先つまみ index

    const NUMS = ['0.73', '-1.20', '0.08', '2.41', '-0.66', '1.05', '-0.34', '0.97', '-2.18', '0.51'];

    return (
        <g opacity={vis}>
            {/* 回路（ルール棚の背後から現れる） */}
            <g opacity={circuitO}>
                {W_SLABS.map((sx, i) => (
                    <rect key={i} x={sx - 40} y={W_CY - 180} width={80} height={360} rx={16} fill="#2a3550" stroke={C_W} strokeWidth={2} opacity={0.95} />
                ))}
                {W_ROWS.map((ry, r) =>
                    [0, 1, 2].map((g) => {
                        const x1 = W_SLABS[g] + 40;
                        const x2 = W_SLABS[g + 1] - 40;
                        const xm = (x1 + x2) / 2;
                        return (
                            <g key={`${r}-${g}`}>
                                <line x1={x1} y1={W_CY + ry} x2={x2} y2={W_CY + ry} stroke={DIM} strokeWidth={3} />
                                <line x1={x1} y1={W_CY + ry} x2={x2} y2={W_CY + ry} stroke={C_W} strokeWidth={7} strokeLinecap="round" opacity={glow(xm)} />
                            </g>
                        );
                    }),
                )}
                {/* つまみ */}
                {W_KNOBS.map((k, i) => {
                    const o = ramp(f, tKnob + i * 3, 14);
                    const hot = SPREAD.includes(i) ? burst * (1 - ramp(f, tDist + 110, 20)) : 0;
                    return <Knob key={i} x={k.x} y={k.y} angle={rnd(i) * 360} o={o} hot={hot} />;
                })}
                {/* 信号粒（青 → 紫 → 橙） */}
                {[0, 1, 2].map((i) => {
                    const p = ramp(f, tFlow + 8 + i * 9, 85);
                    if (p <= 0.01 || p >= 0.99) return null;
                    const x = lerp(-560, 560, p);
                    const y = W_CY + W_ROWS[i + (i === 2 ? 1 : 0)];
                    const rr = 10 + 4 * Math.sin(p * Math.PI); // つまみを通るたび太さが変わる
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r={rr} fill={C_IN} opacity={Math.max(0, 1 - p * 2.2)} />
                            <circle cx={x} cy={y} r={rr} fill={C_W} opacity={Math.max(0, 1 - Math.abs(p - 0.5) * 2.6)} />
                            <circle cx={x} cy={y} r={rr} fill={C_OUT} opacity={Math.max(0, (p - 0.55) * 2.2)} />
                        </g>
                    );
                })}
            </g>

            {/* ルールカードの棚（最初に見え、薄れて消える） */}
            <g opacity={(1 - fade * 0.9) * (1 - ramp(f, tKnob, 20)) * ramp(f, t0, 15)}>
                <RoleTag x={0} y={-330} label="ルール表" o={ramp(f, t0 + 10, 15) * (1 - fade)} />
                {Array.from({ length: 18 }).map((_, i) => {
                    const col = i % 6;
                    const row = Math.floor(i / 6);
                    const x = -425 + col * 170;
                    const y = -210 + row * 115;
                    const o = ramp(f, t0 + 12 + i * 4, 12);
                    return (
                        <g key={i} opacity={o} transform={`scale(${lerp(1, 0.96, fade)})`}>
                            <rect x={x} y={y} width={150} height={92} rx={10} fill="#fff" stroke={INK} strokeWidth={3} />
                            {[24, 46, 68].map((dy, j) => (
                                <line key={j} x1={x + 16} y1={y + dy} x2={x + (j === 2 ? 86 : 134)} y2={y + dy} stroke={DIM} strokeWidth={5} strokeLinecap="round" />
                            ))}
                        </g>
                    );
                })}
            </g>

            {/* 意味ラベルは 1 つのつまみに貼れず、多数へ分散する */}
            <g>
                <RoleTag x={lerp(chip.x, target.x, move)} y={lerp(chip.y, target.y - 40, move)} label="猫の耳" color="#d6336c" o={chipO} />
                {SPREAD.map((ki, j) => {
                    const k = W_KNOBS[ki];
                    const p = ramp(f, tDist + 42 + j * 3, 30);
                    if (burst <= 0.01 || p >= 0.99) return null;
                    return <circle key={j} cx={lerp(target.x, k.x, p)} cy={lerp(target.y - 40, k.y, p)} r={7} fill="#d6336c" opacity={burst * (1 - p * 0.7)} />;
                })}
            </g>

            {/* 透明な迷宮：数字は見えるが意味の線は絡まる */}
            <g opacity={mazeIn}>
                {[
                    'M -540 -250 C -300 -60, -120 -320, 80 -140 S 380 -260, 560 -60',
                    'M -560 30 C -340 -180, -60 60, 180 -200 S 420 40, 560 -180',
                    'M -520 90 C -260 220, 40 -40, 260 140 S 460 200, 570 60',
                    'M -560 -120 C -380 80, -100 -240, 140 20 S 400 -120, 560 120',
                ].map((d, i) => (
                    <path key={i} d={d} fill="none" stroke={C_W} strokeWidth={3} opacity={0.4} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(f, tMaze + 10 + i * 8, 50)} />
                ))}
                {NUMS.map((n, i) => (
                    <text key={i} x={-520 + rnd(i + 40) * 1040} y={W_CY - 200 + rnd(i + 80) * 400} fontSize={26} fontWeight={700} fill={INK} opacity={0.55 * ramp(f, tMaze + 14 + i * 4, 14)}>
                        {n}
                    </text>
                ))}
            </g>
        </g>
    );
};

const SceneTraining: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.training.in');
    const tLoss = evf('loss.meter');
    const tLoop = evf('loop.start');
    const tAdj = evf('knobs.adjust');
    const tTask = evf('tasks.swap');
    const tChoice = evf('pattern.choice');
    const tTerr = evf('terrain.in');
    const tFreeze = evf('train.freeze');

    // 左：コンパクトな回路 / 右：的
    const CY = -110;
    const SLABS = [-560, -400, -240];
    const GAPS = [-480, -320];
    const ROWS = [-80, 0, 80];
    const TGT = { x: 320, y: CY };
    const METER = { x: 545, top: -250, h: 245 };

    const cirIn = ramp(f, t0, 20);

    // 1 発目（外れる）→ 調整 → 2 発目（近づく）
    const p1 = ramp(f, t0 + 35, 55);
    const land1 = { x: 470, y: -28 };
    const p2 = ramp(f, tAdj + 30, 55);
    const land2 = { x: 372, y: -78 };
    const shot = (p: number, land: { x: number; y: number }) => ({
        x: lerp(-200, land.x, p),
        y: lerp(CY, land.y, p) - 230 * Math.sin(Math.PI * p),
    });
    const s1 = shot(p1, land1);
    const s2 = shot(p2, land2);
    const adj = ramp(f, tAdj, 25); // つまみ回転

    // 損失メーター（外れ具合）。調整・地形降下とともに下がる
    const terrB = ramp(f, tTerr + 20, 75); // 地形の降下
    const meterIn = ramp(f, tLoss, 22);
    const meterV = (0.82 - 0.35 * ramp(f, tAdj + 80, 25) - 0.32 * terrB) * meterIn;
    const meterO = meterIn * (1 - ramp(f, tFreeze, 20));

    // 逆向きの学習信号
    const loopDraw = ramp(f, tLoop + 5, 40);
    const loopO = ramp(f, tLoop, 12) * (1 - ramp(f, tFreeze, 20));

    // 的のタスク札（次の言葉 → ノイズ→画像）
    const cardIn = ramp(f, tTask, 16);
    const cardMix = ramp(f, tTask + 75, 22);
    const tgtO = cirIn * (1 - ramp(f, tTerr, 20)); // 的と札は地形が出たら退く

    // 二択（丸暗記 / パターン圧縮）
    const chIn = ramp(f, tChoice, 18);
    const chO = chIn * (1 - ramp(f, tTerr, 16));
    const chCross = ramp(f, tChoice + 50, 20); // 丸暗記に×
    const chLink = ramp(f, tChoice + 70, 25); // 圧縮 → 回路の接続線

    // 高次元地形と降下する点
    const TP = [
        [-140, -160],
        [-40, -40],
        [40, -120],
        [140, 20],
        [240, -60],
        [340, 70],
        [440, 30],
        [520, 105],
    ] as const;
    const terrIn = ramp(f, tTerr, 25);
    const seg = terrB * (TP.length - 1);
    const si = Math.min(TP.length - 2, Math.floor(seg));
    const st = seg - si;
    const ballX = lerp(TP[si][0], TP[si + 1][0], st);
    const ballY = lerp(TP[si][1], TP[si + 1][1], st) - 16;
    const terrPath = `M ${TP.map((p) => p.join(' ')).join(' L ')}`;

    const lockIn = ramp(f, tFreeze + 10, 20);

    return (
        <g opacity={vis}>
            {/* 回路 */}
            <g opacity={cirIn * lerp(1, 0.45, terrIn)}>
                {SLABS.map((sx, i) => (
                    <rect key={i} x={sx - 30} y={CY - 130} width={60} height={260} rx={12} fill="#2a3550" stroke={C_W} strokeWidth={2} />
                ))}
                {GAPS.map((gx, g) =>
                    ROWS.map((ry, r) => (
                        <line key={`${g}-${r}`} x1={gx - 50} y1={CY + ry} x2={gx + 50} y2={CY + ry} stroke={DIM} strokeWidth={3} />
                    )),
                )}
                {GAPS.map((gx, g) =>
                    ROWS.map((ry, r) => {
                        const i = g * 3 + r;
                        // 乱れた角度から、調整で少し回る
                        const angle = rnd(i + 7) * 360 + adj * (40 + rnd(i + 3) * 50);
                        return <Knob key={`${g}-${r}`} x={gx} y={CY + ry} angle={angle} o={cirIn} hot={adj * (1 - ramp(f, tAdj + 60, 20))} />;
                    }),
                )}
            </g>

            {/* 的と着弾 */}
            <g opacity={tgtO}>
                {[92, 62, 32].map((r, i) => (
                    <circle key={i} cx={TGT.x} cy={TGT.y} r={r} fill={i === 2 ? '#fde8e8' : '#fff'} stroke={i === 2 ? C_LOSS : DIM} strokeWidth={3.5} />
                ))}
                {p1 > 0.01 && p1 < 1 && <circle cx={s1.x} cy={s1.y} r={11} fill={C_OUT} />}
                {p1 >= 0.98 && p2 < 0.5 && (
                    <g stroke={C_LOSS} strokeWidth={7} strokeLinecap="round" opacity={1 - ramp(f, tAdj + 55, 15)}>
                        <line x1={land1.x - 16} y1={land1.y - 16} x2={land1.x + 16} y2={land1.y + 16} />
                        <line x1={land1.x - 16} y1={land1.y + 16} x2={land1.x + 16} y2={land1.y - 16} />
                    </g>
                )}
                {p2 > 0.01 && p2 < 1 && <circle cx={s2.x} cy={s2.y} r={11} fill={C_OUT} />}
                {p2 >= 0.98 && <circle cx={land2.x} cy={land2.y} r={14} fill="none" stroke={C_OK} strokeWidth={6} />}
                {/* タスク札 */}
                <g opacity={cardIn * tgtO}>
                    <rect x={TGT.x - 130} y={-330} width={260} height={64} rx={14} fill="#fff" stroke={INK} strokeWidth={3.5} />
                    <text x={TGT.x} y={-287} textAnchor="middle" fontSize={30} fontWeight={900} fill={INK} opacity={1 - cardMix}>
                        次の言葉
                    </text>
                    <text x={TGT.x} y={-287} textAnchor="middle" fontSize={30} fontWeight={900} fill={INK} opacity={cardMix}>
                        ノイズ→画像
                    </text>
                </g>
            </g>

            {/* 損失メーター */}
            <g opacity={meterO}>
                <rect x={METER.x - 26} y={METER.top} width={52} height={METER.h} rx={12} fill="#fff" stroke={INK} strokeWidth={3.5} />
                <rect x={METER.x - 18} y={METER.top + 8 + (METER.h - 16) * (1 - meterV)} width={36} height={(METER.h - 16) * meterV} rx={8} fill={C_LOSS} />
                <RoleTag x={METER.x} y={METER.top + METER.h + 44} label="損失" color={C_LOSS} fs={26} />
            </g>

            {/* 逆向きの学習信号（メーター → 回路） */}
            <g opacity={loopO}>
                <path d="M 545 -270 C 420 -400, -100 -400, -320 -270" fill="none" stroke={C_LOSS} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - loopDraw} opacity={0.85} />
                {loopDraw >= 0.97 && <path d="M -320 -270 l 26 -18 l -6 30 Z" fill={C_LOSS} />}
            </g>

            {/* 二択：丸暗記 / パターン圧縮 */}
            <g opacity={chO}>
                <g opacity={lerp(1, 0.35, chCross)}>
                    <rect x={-450} y={95} width={340} height={120} rx={18} fill="#fff" stroke={INK} strokeWidth={3.5} />
                    {[0, 1, 2].map((i) => (
                        <rect key={i} x={-420 + i * 8} y={125 - i * 8} width={90} height={60} rx={8} fill="#eef2fb" stroke={DIM} strokeWidth={2.5} />
                    ))}
                    <text x={-230} y={165} textAnchor="middle" fontSize={32} fontWeight={900} fill={INK}>
                        丸暗記
                    </text>
                    <g stroke={C_LOSS} strokeWidth={8} strokeLinecap="round" opacity={chCross}>
                        <line x1={-440} y1={105} x2={-120} y2={205} />
                        <line x1={-440} y1={205} x2={-120} y2={105} />
                    </g>
                </g>
                <g>
                    <rect x={110} y={95} width={340} height={120} rx={18} fill="#fff" stroke={C_OK} strokeWidth={4} />
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <circle key={i} cx={140 + rnd(i + 11) * 80} cy={115 + rnd(i + 23) * 80} r={5} fill={C_IN} opacity={0.8} />
                    ))}
                    <path d="M 135 185 Q 180 115 235 150" fill="none" stroke={C_OK} strokeWidth={5} />
                    <text x={330} y={165} textAnchor="middle" fontSize={32} fontWeight={900} fill={INK}>
                        パターン圧縮
                    </text>
                    <line x1={150} y1={95} x2={lerp(150, -240, chLink)} y2={lerp(95, CY + 130, chLink)} stroke={C_OK} strokeWidth={5} strokeDasharray="4 10" strokeLinecap="round" opacity={chLink > 0 ? 1 : 0} />
                </g>
            </g>

            {/* 高次元地形：高い間違いから低い間違いへ降りる */}
            <g opacity={terrIn}>
                <path d={terrPath} fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(f, tTerr + 5, 35)} />
                <circle cx={ballX} cy={ballY} r={15} fill={C_LOSS} opacity={ramp(f, tTerr + 18, 10)} />
            </g>

            {/* 学習停止 → 重みに錠前 */}
            <g opacity={lockIn} transform={`translate(-400 ${CY}) scale(${lerp(1.4, 1, lockIn)})`}>
                <path d="M -22 -8 v -14 a 22 22 0 0 1 44 0 v 14" fill="none" stroke={C_OUT} strokeWidth={9} strokeLinecap="round" />
                <rect x={-34} y={-8} width={68} height={54} rx={10} fill={C_OUT} />
                <circle cx={0} cy={16} r={8} fill="#fff" />
            </g>
        </g>
    );
};

const SceneInference: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.inference.in');
    const tCut = evf('token.cut');
    const tVec = evf('vector.in');
    const tLay = evf('layers.pass');
    const tArc = evf('attention.arc');
    const tEx = evf('attention.example');
    const tStack = evf('transformer.stack');
    const tDist = evf('output.dist');

    const TOKS = ['彼女', 'は', '本', 'を', '買った', '。', 'それ', 'を', '机', 'に'];
    const TOK_Y = -300;
    const widths = TOKS.map((t) => t.length * 32 + 28);
    const cut = ramp(f, tCut, 25);
    const gap = lerp(2, 16, cut);
    const total = widths.reduce((a, b) => a + b, 0) + gap * (TOKS.length - 1);
    const centers: number[] = [];
    {
        let acc = -total / 2;
        for (const w of widths) {
            centers.push(acc + w / 2);
            acc += w + gap;
        }
    }

    const sentIn = ramp(f, t0 + 5, 20);
    const vecIn = ramp(f, tVec, 22);

    // ベクトル列が層を降りていく
    const pass = ramp(f, tLay + 10, 80);
    const rowY = lerp(-238, 196, pass);
    const BANDS = [-60, 40, 140];

    // Attention の弧（index from→to, 太さ）
    const ARCS: [number, number, number][] = [
        [6, 2, 9],
        [4, 0, 5],
        [8, 6, 4],
        [5, 4, 3],
        [9, 8, 3],
        [3, 2, 4],
    ];
    const exHl = ramp(f, tEx + 8, 20); // それ→本 を強調

    const stackIn = ramp(f, tStack, 25);
    const distIn = ramp(f, tDist, 20);
    const CANDS: [string, number][] = [
        ['置いた', 0.62],
        ['載せた', 0.21],
        ['開いた', 0.09],
    ];

    return (
        <g opacity={vis}>
            {/* 入力文（切られる前） */}
            <text x={0} y={TOK_Y + 12} textAnchor="middle" fontSize={44} fontWeight={900} fill={INK} opacity={sentIn * (1 - cut)}>
                {TOKS.join('')}
            </text>

            {/* トークンチップ */}
            {TOKS.map((t, i) => {
                const o = cut * ramp(f, tCut + i * 3, 10);
                const hl = (i === 2 || i === 6) ? exHl : 0;
                return (
                    <g key={i} opacity={o}>
                        <rect x={centers[i] - widths[i] / 2} y={TOK_Y - 26} width={widths[i]} height={52} rx={10} fill={hl > 0.01 ? mixColor('#ffffff', '#fbe3ec', hl) : '#fff'} stroke={hl > 0.01 ? mixColor('#9aa7bd', '#d6336c', hl) : '#9aa7bd'} strokeWidth={3 + hl * 1.5} />
                        <text x={centers[i]} y={TOK_Y + 11} textAnchor="middle" fontSize={30} fontWeight={900} fill={INK}>
                            {t}
                        </text>
                    </g>
                );
            })}

            {/* Attention の弧（チップの上に張る見えない線） */}
            {ARCS.map(([a, b, w], j) => {
                const draw = ramp(f, tArc + j * 7, 24);
                if (draw <= 0.01) return null;
                const x1 = centers[a];
                const x2 = centers[b];
                const apex = TOK_Y - 36 - Math.abs(x1 - x2) * 0.22;
                const isEx = a === 6 && b === 2;
                const o = draw * (isEx ? 1 : lerp(0.6, 0.15, exHl));
                return (
                    <path
                        key={j}
                        d={`M ${x1} ${TOK_Y - 30} Q ${(x1 + x2) / 2} ${apex} ${x2} ${TOK_Y - 30}`}
                        fill="none"
                        stroke={isEx ? mixColor(C_W, '#d6336c', exHl) : C_W}
                        strokeWidth={(w + (isEx ? exHl * 5 : 0)) * 0.9}
                        strokeLinecap="round"
                        opacity={o}
                        pathLength={1}
                        strokeDasharray={1}
                        strokeDashoffset={1 - draw}
                    />
                );
            })}

            {/* 変換の層（Transformer で積み上がる） */}
            {BANDS.map((by, i) => (
                <g key={i} opacity={ramp(f, tLay + i * 10, 20)}>
                    {[2, 1].map((k) => (
                        <rect key={k} x={-520 + k * 8} y={by - 35 - k * 13} width={1040} height={70} rx={14} fill="#2a3550" opacity={stackIn * (k === 1 ? 0.35 : 0.18)} />
                    ))}
                    <rect x={-520} y={by - 35} width={1040} height={70} rx={14} fill="#2a3550" stroke={C_W} strokeWidth={2.5} />
                </g>
            ))}
            <text x={548} y={BANDS[0] - 40} fontSize={30} fontWeight={900} fill={INK} opacity={stackIn}>
                ×12
            </text>

            {/* ベクトル列（チップから生まれ、層を通って色を変える） */}
            {vecIn > 0.01 &&
                TOKS.map((_, i) => {
                    const o = vecIn * ramp(f, tVec + i * 3, 12);
                    if (o <= 0.01) return null;
                    const col = flowColor(pass);
                    return (
                        <g key={i} opacity={o} transform={`translate(${centers[i]} ${rowY})`}>
                            {[0, 1, 2, 3].map((j) => {
                                const bw = 12 + rnd(i * 4 + j) * 24;
                                return <rect key={j} x={-bw / 2} y={j * 14} width={bw} height={9} rx={4.5} fill={col} />;
                            })}
                        </g>
                    );
                })}

            {/* 出力分布：候補に確率を付ける */}
            <g opacity={distIn}>
                <path d="M 535 140 C 640 120, 680 -40, 700 -150" fill="none" stroke={DIM} strokeWidth={5} strokeDasharray="2 12" strokeLinecap="round" opacity={distIn} />
                {CANDS.map(([w, p], i) => {
                    const o = ramp(f, tDist + 12 + i * 10, 16);
                    const bar = ramp(f, tDist + 26 + i * 10, 25);
                    const y = -350 + i * 92;
                    const top = i === 0;
                    const ring = top ? ramp(f, tDist + 70, 20) : 0;
                    return (
                        <g key={w} opacity={o}>
                            <rect x={618} y={y} width={210} height={56} rx={12} fill="#fff" stroke={top ? mixColor('#9aa7bd', C_OUT, ring) : '#9aa7bd'} strokeWidth={3 + ring * 2.5} />
                            <text x={723} y={y + 39} textAnchor="middle" fontSize={30} fontWeight={900} fill={INK}>
                                {w}
                            </text>
                            <rect x={618} y={y + 62} width={210 * p * bar} height={12} rx={6} fill={C_OUT} />
                            <text x={838} y={y + 42} fontSize={26} fontWeight={900} fill={INK} opacity={bar}>
                                {Math.round(p * 100)}%
                            </text>
                        </g>
                    );
                })}
            </g>
        </g>
    );
};

const SceneScale: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.scale.in');
    const tArch = evf('pillar.arch');
    const tData = evf('pillar.data');
    const tQual = evf('data.quality');
    const tComp = evf('pillar.compute');
    const tBal = evf('balance.scale');
    const tAlign = evf('pillar.align');
    const tGrow = evf('factory.grow');

    const FLOOR = 220;
    const F = { cx: 0, cy: -290, w: 560, h: 170 }; // 変換工場
    const grow = ramp(f, tGrow, 35);
    const fScale = lerp(1, 1.28, grow);

    const PILLARS = [
        { x: -450, label: '構造', ev: tArch },
        { x: -150, label: 'データ', ev: tData },
        { x: 150, label: '計算', ev: tComp },
        { x: 450, label: '合わせ込み', ev: tAlign },
    ];
    const P_W = 132;
    const P_TOP = -150;

    const fadeIn = ramp(f, t0, 20);
    const balIn = ramp(f, tBal, 20) * (1 - ramp(f, tAlign, 15));
    const balV = ramp(f, tBal + 15, 50); // 3 スライダー連動

    // データ粒の流入（品質フィルタ通過）
    const FUNNEL = { x: -380, y: -90 };
    const qual = ramp(f, tQual, 20) * (1 - ramp(f, tComp, 20)); // 流入が終われば退場

    return (
        <g opacity={vis}>
            {/* 床と空きスロット */}
            <g opacity={fadeIn}>
                <line x1={-620} y1={FLOOR} x2={620} y2={FLOOR} stroke={DIM} strokeWidth={4} />
                {PILLARS.map((p) => (
                    <rect key={p.x} x={p.x - P_W / 2} y={FLOOR - 42} width={P_W} height={42} rx={8} fill="none" stroke={DIM} strokeWidth={3} strokeDasharray="10 8" opacity={1 - ramp(f, p.ev, 20)} />
                ))}
            </g>

            {/* 四本の支柱 */}
            {PILLARS.map((p, i) => {
                const rise = ramp(f, p.ev + 5, 30);
                if (rise <= 0.01) return null;
                const h = (FLOOR - P_TOP) * rise;
                const top = FLOOR - h;
                const deco = ramp(f, p.ev + 35, 25);
                return (
                    <g key={p.label}>
                        <rect x={p.x - P_W / 2} y={top} width={P_W} height={h} rx={12} fill="#fff" stroke={INK} strokeWidth={4} />
                        {/* 面の装飾＝その柱の意味 */}
                        {i === 0 && (
                            <g opacity={deco}>
                                {[0, 1, 2].map((j) => (
                                    <path key={j} d={`M ${p.x - 44} ${top + 90 + j * 80} Q ${p.x} ${top + 50 + j * 80} ${p.x + 44} ${top + 90 + j * 80}`} fill="none" stroke={C_W} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(f, p.ev + 35 + j * 8, 20)} />
                                ))}
                            </g>
                        )}
                        {i === 1 && (
                            <g opacity={deco}>
                                {[0, 1, 2, 3, 4, 5].map((j) => (
                                    <circle key={j} cx={p.x - 30 + (j % 2) * 60} cy={top + 80 + Math.floor(j / 2) * 80} r={11} fill={[C_IN, C_OK, C_OUT][j % 3]} opacity={0.85} />
                                ))}
                            </g>
                        )}
                        {i === 2 && (
                            <g>
                                {Array.from({ length: 15 }).map((_, j) => (
                                    <rect key={j} x={p.x - 48 + (j % 3) * 34} y={top + 60 + Math.floor(j / 3) * 56} width={26} height={26} rx={5} fill={C_OUT} opacity={deco * ramp(f, p.ev + 35 + j * 3, 10) * 0.9} stroke={INK} strokeWidth={1.5} />
                                ))}
                            </g>
                        )}
                        {i === 3 && (
                            <g opacity={deco}>
                                <circle cx={p.x} cy={top + 80} r={20} fill="none" stroke={C_OK} strokeWidth={5} />
                                <path d={`M ${p.x - 30} ${top + 150} Q ${p.x} ${top + 110} ${p.x + 30} ${top + 150}`} fill="none" stroke={C_OK} strokeWidth={5} />
                                {[0, 1].map((j) => {
                                    const mv = ramp(f, p.ev + 45 + j * 14, 35);
                                    if (mv <= 0.01 || mv >= 0.99) return null;
                                    return (
                                        <g key={j} transform={`translate(${lerp(p.x, F.cx + 250, mv)} ${lerp(top + 200, F.cy, mv)})`} opacity={1 - mv * 0.4}>
                                            <path d="M -12 0 L -4 9 L 14 -9" fill="none" stroke={C_OK} strokeWidth={6} strokeLinecap="round" />
                                        </g>
                                    );
                                })}
                            </g>
                        )}
                        <RoleTag x={p.x} y={top + 28} label={p.label} fs={24} o={ramp(f, p.ev + 25, 15)} />
                    </g>
                );
            })}

            {/* データ粒の流入と品質フィルタ */}
            <g>
                {qual > 0.01 && (
                    <path d={`M ${FUNNEL.x - 56} ${FUNNEL.y - 40} L ${FUNNEL.x + 56} ${FUNNEL.y - 40} L ${FUNNEL.x + 18} ${FUNNEL.y + 26} L ${FUNNEL.x - 18} ${FUNNEL.y + 26} Z`} fill="none" stroke={INK} strokeWidth={4} opacity={qual} />
                )}
                {Array.from({ length: 9 }).map((_, j) => {
                    const p = ramp(f, tData + 25 + j * 9, 60);
                    if (p <= 0.01 || p >= 0.99) return null;
                    const bad = qual > 0.3 && j % 3 === 2;
                    const half = Math.min(1, p * 2);
                    const x1 = lerp(-660, FUNNEL.x, half);
                    const y1 = lerp(120, FUNNEL.y, half);
                    const x = p < 0.5 ? x1 : bad ? lerp(FUNNEL.x, FUNNEL.x - 30, (p - 0.5) * 2) : lerp(FUNNEL.x, F.cx - 240, (p - 0.5) * 2);
                    const y = p < 0.5 ? y1 : bad ? lerp(FUNNEL.y, FUNNEL.y + 170, (p - 0.5) * 2) : lerp(FUNNEL.y, F.cy, (p - 0.5) * 2);
                    const o = bad && p > 0.5 ? 1 - (p - 0.5) * 2 : 1;
                    return j % 2 === 0 ? (
                        <circle key={j} cx={x} cy={y} r={9} fill={[C_IN, C_OK, C_OUT][j % 3]} opacity={o * 0.9} />
                    ) : (
                        <rect key={j} x={x - 8} y={y - 8} width={16} height={16} rx={4} fill={[C_IN, C_OK, C_OUT][j % 3]} opacity={o * 0.9} />
                    );
                })}
            </g>

            {/* 変換工場（支柱に支えられて大きくなる） */}
            <g transform={`translate(${F.cx} ${F.cy}) scale(${fScale})`} opacity={fadeIn}>
                <rect x={-F.w / 2} y={-F.h / 2} width={F.w} height={F.h} rx={20} fill="#2a3550" stroke={C_W} strokeWidth={3} />
                {[-90, 0, 90].map((dx, i) => (
                    <rect key={i} x={dx - 20} y={-F.h / 2 + 26} width={40} height={F.h - 52} rx={9} fill="#3d4a6b" stroke={C_W} strokeWidth={2} />
                ))}
                <path d={`M ${-F.w / 2 - 70} 0 H ${-F.w / 2 - 14}`} stroke={C_IN} strokeWidth={7} strokeLinecap="round" />
                <path d={`M ${-F.w / 2 - 26} -10 L ${-F.w / 2 - 12} 0 L ${-F.w / 2 - 26} 10`} fill="none" stroke={C_IN} strokeWidth={7} strokeLinecap="round" />
                <rect x={F.w / 2 - 14} y={-34} width={16} height={68} rx={7} fill={C_OUT} />
                {/* 出口が増える */}
                {(['text', 'image', 'sound'] as const).map((k, i) => {
                    const o = ramp(f, tGrow + 25 + i * 10, 16);
                    return (
                        <g key={k} opacity={o} transform={`translate(${F.w / 2 + 64} ${-118 + i * 80}) scale(0.62)`}>
                            <circle r={52} fill="#fff" stroke={INK} strokeWidth={5} />
                            <IconGlyph kind={k} />
                        </g>
                    );
                })}
            </g>

            {/* 規模のバランス（モデル・データ・計算 → 性能） */}
            <g opacity={balIn}>
                <rect x={-330} y={-90} width={660} height={185} rx={20} fill="rgba(255,255,255,0.97)" stroke={INK} strokeWidth={4} />
                {(['モデル', 'データ', '計算'] as const).map((lb, i) => {
                    const y = -52 + i * 50;
                    return (
                        <g key={lb}>
                            <text x={-300} y={y + 9} fontSize={26} fontWeight={900} fill={INK}>
                                {lb}
                            </text>
                            <rect x={-180} y={y - 8} width={330} height={16} rx={8} fill="#e7ebf4" />
                            <rect x={-180} y={y - 8} width={330 * lerp(0.18, 0.95, balV)} height={16} rx={8} fill={C_IN} />
                        </g>
                    );
                })}
                <text x={216} y={-44} fontSize={24} fontWeight={900} fill={INK}>
                    性能
                </text>
                <rect x={206} y={-30} width={34} height={108} rx={9} fill="#e7ebf4" />
                <rect x={206} y={-30 + 108 * (1 - lerp(0.15, 0.92, balV))} width={34} height={108 * lerp(0.15, 0.92, balV)} rx={9} fill={C_OK} />
                <path d={`M 286 60 L 286 ${lerp(60, -36, balV)}`} stroke={C_OK} strokeWidth={6} strokeLinecap="round" />
                <path d={`M 272 ${lerp(74, -22, balV)} L 286 ${lerp(60, -36, balV)} L 300 ${lerp(74, -22, balV)}`} fill="none" stroke={C_OK} strokeWidth={6} strokeLinecap="round" />
            </g>
        </g>
    );
};

const SceneLimits: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.limits.in');
    const tProbe = evf('probes.in');
    const tLight = evf('partial.light');
    const tMaze = evf('maze.remains');
    const tSplit = evf('split.two');
    const tVer = evf('verify.line');
    const tHum = evf('factory.human');

    const F = { cx: 0, cy: -80, w: 880, h: 400 }; // 透明化した工場
    const fadeIn = ramp(f, t0, 20);
    const shadowIn = ramp(f, t0 + 15, 25); // 一部に黒が戻る
    const probesO = ramp(f, tProbe, 20) * (1 - ramp(f, tSplit, 18));
    const light = ramp(f, tLight, 25);
    const mazeO = ramp(f, tMaze, 25);
    const split = ramp(f, tSplit, 30);
    const ver = ramp(f, tVer + 5, 30);
    const hum = ramp(f, tHum, 22);

    const cam = { tx: lerp(0, -320, split), ty: lerp(0, 16, split), sc: lerp(1, 0.78, split) };

    // 検証ラインの画面座標（縮小後の工場右端 → 現実側）
    const vy = F.cy * cam.sc + cam.ty;
    const vx1 = cam.tx + (F.w / 2) * cam.sc;

    return (
        <g opacity={vis}>
            <g transform={`translate(${cam.tx} ${cam.ty}) scale(${cam.sc})`}>
                {/* 工場の枠とゴースト回路 */}
                <g opacity={fadeIn}>
                    <rect x={F.cx - F.w / 2} y={F.cy - F.h / 2} width={F.w} height={F.h} rx={26} fill="rgba(42,53,80,0.10)" stroke={INK} strokeWidth={4} />
                    {[-260, 0, 260].map((dx, i) => (
                        <rect key={i} x={F.cx + dx - 34} y={F.cy - 140} width={68} height={280} rx={13} fill="#3d4a6b" opacity={0.45} stroke={C_W} strokeWidth={2} />
                    ))}
                    {[
                        `M ${F.cx - 400} ${F.cy - 100} C ${F.cx - 200} ${F.cy + 80}, ${F.cx - 60} ${F.cy - 160}, ${F.cx + 120} ${F.cy + 40}`,
                        `M ${F.cx - 380} ${F.cy + 110} C ${F.cx - 160} ${F.cy - 60}, ${F.cx + 60} ${F.cy + 140}, ${F.cx + 300} ${F.cy - 80}`,
                    ].map((d, i) => (
                        <path key={i} d={d} fill="none" stroke={C_W} strokeWidth={3} opacity={0.35} />
                    ))}
                </g>

                {/* 観測できない影の領域（右側） */}
                <g opacity={shadowIn}>
                    <rect x={F.cx + 70} y={F.cy - F.h / 2 + 10} width={F.w / 2 - 90} height={F.h - 20} rx={20} fill={C_BOX} opacity={0.82} />
                    {/* 影の中に残る迷宮 */}
                    <g opacity={mazeO}>
                        {[
                            `M ${F.cx + 100} ${F.cy - 130} C ${F.cx + 200} ${F.cy + 30}, ${F.cx + 240} ${F.cy - 150}, ${F.cx + 360} ${F.cy + 10}`,
                            `M ${F.cx + 110} ${F.cy + 120} C ${F.cx + 220} ${F.cy - 40}, ${F.cx + 300} ${F.cy + 150}, ${F.cx + 390} ${F.cy - 60}`,
                            `M ${F.cx + 150} ${F.cy - 40} C ${F.cx + 230} ${F.cy + 110}, ${F.cx + 320} ${F.cy - 120}, ${F.cx + 400} ${F.cy + 100}`,
                        ].map((d, i) => (
                            <path key={i} d={d} fill="none" stroke="#8d9bd8" strokeWidth={2.5} opacity={0.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(f, tMaze + 8 + i * 10, 35)} />
                        ))}
                    </g>
                </g>

                {/* 観測の道具：プローブ・ヒートマップ・虫眼鏡 */}
                <g opacity={probesO}>
                    {[-330, -200, -70].map((px, i) => (
                        <line key={i} x1={px} y1={F.cy - 290} x2={px} y2={F.cy - 130 + i * 40} stroke={C_OK} strokeWidth={4} strokeDasharray="10 8" opacity={ramp(f, tProbe + i * 8, 16)} />
                    ))}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const cx = -390 + (i % 4) * 78;
                        const cy = F.cy + 10 + Math.floor(i / 4) * 64;
                        return <rect key={i} x={cx} y={cy} width={66} height={52} rx={7} fill={mixColor('#f5d6c0', '#e05252', rnd(i + 31))} opacity={0.75 * ramp(f, tProbe + 20 + i * 3, 12)} />;
                    })}
                    <g transform={`translate(-120 ${F.cy - 210})`} opacity={ramp(f, tProbe + 30, 16)}>
                        <circle r={42} fill="rgba(255,255,255,0.35)" stroke={INK} strokeWidth={6} />
                        <line x1={30} y1={30} x2={62} y2={62} stroke={INK} strokeWidth={9} strokeLinecap="round" />
                    </g>
                </g>

                {/* 一部は明るく観測できる */}
                <rect x={F.cx - F.w / 2 + 12} y={F.cy - F.h / 2 + 12} width={F.w / 2 - 40} height={F.h - 24} rx={18} fill="#fff" opacity={0.3 * light} />
            </g>

            {/* 内部計算と現実判断を分ける */}
            <g opacity={split}>
                <line x1={150} y1={lerp(-80, -360, split)} x2={150} y2={lerp(-80, 230, split)} stroke={INK} strokeWidth={6} />
                <RoleTag x={-320} y={-380} label="内部計算" o={split} />
                <RoleTag x={520} y={-380} label="現実判断" color={C_OK} o={split} />
                {/* 現実側：事実・責任・時間 */}
                <g opacity={split}>
                    <g transform="translate(430 -200)">
                        <rect x={-32} y={-42} width={64} height={84} rx={8} fill="#fff" stroke={INK} strokeWidth={4} />
                        {[-18, 0].map((y, i) => (
                            <line key={i} x1={-18} y1={y} x2={18} y2={y} stroke={DIM} strokeWidth={5} strokeLinecap="round" />
                        ))}
                        <path d="M -14 22 L -4 32 L 18 10" fill="none" stroke={C_OK} strokeWidth={6} strokeLinecap="round" />
                    </g>
                    <g transform="translate(620 -200)">
                        <line x1={0} y1={-38} x2={0} y2={30} stroke={INK} strokeWidth={5} />
                        <line x1={-38} y1={-26} x2={38} y2={-26} stroke={INK} strokeWidth={5} />
                        <path d="M -38 -26 l -14 30 a 16 16 0 0 0 28 0 Z" fill="#fff" stroke={INK} strokeWidth={4} />
                        <path d="M 38 -26 l -14 30 a 16 16 0 0 0 28 0 Z" fill="#fff" stroke={INK} strokeWidth={4} />
                        <rect x={-22} y={30} width={44} height={10} rx={5} fill={INK} />
                    </g>
                    <g transform="translate(430 -40)">
                        <circle r={38} fill="#fff" stroke={INK} strokeWidth={5} />
                        <line x1={0} y1={0} x2={0} y2={-24} stroke={INK} strokeWidth={5} strokeLinecap="round" />
                        <line x1={0} y1={0} x2={16} y2={10} stroke={INK} strokeWidth={5} strokeLinecap="round" />
                    </g>
                </g>
            </g>

            {/* 出力から現実側への検証ライン */}
            <g opacity={ramp(f, tVer, 12)}>
                <line x1={vx1} y1={vy} x2={lerp(vx1, 560, ver)} y2={vy} stroke={C_OK} strokeWidth={9} strokeLinecap="round" />
                <g transform={`translate(150 ${vy})`} opacity={ramp(f, tVer + 25, 16)}>
                    <rect x={-30} y={-30} width={60} height={60} rx={12} transform="rotate(45)" fill="#fff" stroke={C_OK} strokeWidth={5} />
                    <path d="M -14 0 L -4 11 L 18 -12" fill="none" stroke={C_OK} strokeWidth={7} strokeLinecap="round" />
                </g>
            </g>

            {/* 人間の操作盤 */}
            <g opacity={hum} transform={`translate(0 ${lerp(26, 0, hum)})`}>
                <rect x={-580} y={110} width={210} height={92} rx={14} fill="#fff" stroke={INK} strokeWidth={4} />
                <Knob x={-530} y={156} angle={210} r={16} />
                <Knob x={-470} y={156} angle={330} r={16} />
                <rect x={-426} y={132} width={14} height={48} rx={7} fill="#e7ebf4" stroke={INK} strokeWidth={2.5} />
                <rect x={-430} y={142} width={22} height={12} rx={5} fill={C_OK} />
                <g transform="translate(-320 150)">
                    <circle cy={-26} r={17} fill={INK} />
                    <path d="M -26 38 Q -26 0 0 0 Q 26 0 26 38 Z" fill={INK} />
                </g>
            </g>
        </g>
    );
};

const SceneOutro: React.FC<SceneProps> = ({ f, vis }) => {
    const t0 = evf('scene.outro.in');
    const tFlow = evf('recap.flow');
    const tScale = evf('recap.scale');
    const tLabel = evf('box.label');
    const tBound = evf('final.boundary');

    const B = { cx: 0, cy: -130, w: 460, h: 300 }; // 半透明になった黒い箱
    const bx = B.cx - B.w / 2;
    const by = B.cy - B.h / 2;
    const boxIn = ramp(f, t0, 25);

    // 入力 → 数字 → 層 → 出力 の一筆
    const p = ramp(f, tFlow + 10, 75);
    const FX1 = bx - 130;
    const FX2 = bx + B.w + 90;
    const px = lerp(FX1, FX2, p);

    // ラベル貼り替え（魔法 → 学習された変換回路）。旧が消えてから新を出す
    const strike = ramp(f, tLabel + 12, 16);
    const oldOut = ramp(f, tLabel + 42, 16);
    const swap = ramp(f, tLabel + 62, 18);
    const labelIn = ramp(f, tLabel, 14);

    // 境界線つきの地図
    const bIn = ramp(f, tBound, 22);
    const bLine = ramp(f, tBound + 20, 28);

    const PILLS = ['構造', 'データ', '計算', '合わせ込み'];

    return (
        <g opacity={vis}>
            {/* 箱の中身（透けて見える簡略工場） */}
            <g opacity={boxIn}>
                {[-80, 0, 80].map((dx, i) => (
                    <rect key={i} x={B.cx + dx - 17} y={B.cy - 85} width={34} height={170} rx={9} fill="#3d4a6b" stroke={C_W} strokeWidth={2} />
                ))}
                <rect x={bx + B.w - 40} y={B.cy - 40} width={20} height={80} rx={8} fill={C_OUT} />
            </g>

            {/* 半透明の箱 */}
            <rect x={bx} y={by} width={B.w} height={B.h} rx={26} fill={C_BOX} opacity={0.45 * boxIn} stroke={C_BOX} strokeWidth={4} />
            <text x={B.cx} y={by + 58} textAnchor="middle" fontSize={52} fontWeight={900} fill="#fff" opacity={0.85 * boxIn}>
                AI
            </text>

            {/* 一筆の再生（青 → 紫 → 橙）。出力へ吸収されたら消える */}
            <g opacity={ramp(f, tFlow, 12) * (1 - ramp(f, tFlow + 95, 25))}>
                <line x1={FX1} y1={B.cy} x2={Math.max(FX1, px)} y2={B.cy} stroke={flowColor(p)} strokeWidth={7} strokeLinecap="round" opacity={0.85} />
                {p > 0.01 && p < 0.99 && <circle cx={px} cy={B.cy} r={13} fill={flowColor(p)} />}
            </g>

            {/* 箱の表面ラベル：魔法 → 学習された変換回路 */}
            <g opacity={labelIn}>
                <rect x={B.cx - 190} y={B.cy + 56} width={380} height={62} rx={14} fill="#fff" stroke={INK} strokeWidth={3.5} />
                <g opacity={1 - oldOut}>
                    <text x={B.cx} y={B.cy + 99} textAnchor="middle" fontSize={34} fontWeight={900} fill={INK}>
                        魔法
                    </text>
                    <line x1={B.cx - 56} y1={B.cy + 87} x2={lerp(B.cx - 56, B.cx + 56, strike)} y2={B.cy + 87} stroke={C_LOSS} strokeWidth={7} strokeLinecap="round" opacity={strike > 0 ? 1 : 0} />
                </g>
                <text x={B.cx} y={B.cy + 99} textAnchor="middle" fontSize={32} fontWeight={900} fill={C_W} opacity={swap}>
                    学習された変換回路
                </text>
            </g>

            {/* 四本柱の再点灯 */}
            {PILLS.map((lb, i) => {
                const o = ramp(f, tScale + i * 10, 16);
                const x = -255 + i * 170;
                return (
                    <g key={lb} opacity={o}>
                        <rect x={x - 62} y={92} width={124} height={66} rx={11} fill="#fff" stroke={INK} strokeWidth={3.5} />
                        <text x={x} y={134} textAnchor="middle" fontSize={lb.length > 3 ? 21 : 25} fontWeight={900} fill={INK}>
                            {lb}
                        </text>
                    </g>
                );
            })}

            {/* 信頼と検証の境界線 */}
            <g opacity={bIn}>
                <rect x={-520} y={200} width={580} height={80} rx={16} fill="rgba(47,158,99,0.12)" stroke={C_OK} strokeWidth={3.5} />
                <rect x={60} y={200} width={460} height={80} rx={16} fill="rgba(240,159,31,0.14)" stroke={C_OUT} strokeWidth={3.5} />
                <text x={-230} y={251} textAnchor="middle" fontSize={28} fontWeight={900} fill={C_OK}>
                    使える領域
                </text>
                <text x={290} y={251} textAnchor="middle" fontSize={28} fontWeight={900} fill={'#b87410'}>
                    検証が必要な領域
                </text>
                <line x1={60} y1={lerp(240, 188, bLine)} x2={60} y2={lerp(240, 292, bLine)} stroke={INK} strokeWidth={7} strokeLinecap="round" />
            </g>
        </g>
    );
};

const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    SceneIntro,
    SceneMap,
    SceneWeights,
    SceneTraining,
    SceneInference,
    SceneScale,
    SceneLimits,
    SceneOutro,
];

// ---------------- HTML overlays（05_finishing.md 正典） ----------------
const Header: React.FC<{ frame: number }> = ({ frame: f }) => {
    return (
        <div style={{ position: 'absolute', left: 50, top: 40, zIndex: 10 }}>
            {SCENES.map((s, i) => {
                const o = sceneVis(i, f);
                if (o <= 0.01) return null;
                return (
                    <div
                        key={s.key}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            opacity: o,
                            whiteSpace: 'nowrap',
                            background: '#fff',
                            border: '5px solid #ff4281',
                            borderRadius: 20,
                            padding: '8px 30px',
                            fontFamily,
                            fontSize: 42,
                            fontWeight: 900,
                            color: '#fff',
                            WebkitTextStroke: '5px #ff4281',
                            paintOrder: 'stroke fill',
                        }}
                    >
                        {s.title}
                    </div>
                );
            })}
        </div>
    );
};

const Floor: React.FC = () => (
    <div
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 300,
            zIndex: 15,
            background: 'linear-gradient(to top, rgba(205,214,228,0.85), rgba(205,214,228,0))',
            pointerEvents: 'none',
        }}
    />
);

// ---------------- 立ち絵 + 口パク ----------------
const VARIANTS = ['default', 'normal2', 'normal3', 'normal4'] as const;
const CHAR_DIR: Record<Speaker, string> = { ずんだもん: 'zundamon', めたん: 'metan' };
const SPEAKER_COLOR: Record<Speaker, string> = { ずんだもん: '#22c55e', めたん: '#d6336c' };

const lineAt = (f: number): number => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++) if (f >= LINE_STARTS[i]) idx = i;
    return idx;
};
const lastLineOf = (f: number, sp: Speaker): number => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++)
        if (SCRIPT[i].speaker === sp && f >= LINE_STARTS[i]) idx = i;
    return idx;
};
const isMouthOpen = (f: number): boolean => {
    const i = lineAt(f);
    const local = f - LINE_STARTS[i];
    return AUDIO[i].open.some(([a, b]) => local >= a && local < b);
};
const charSrc = (sp: Speaker, f: number, speaking: boolean): string => {
    const v = VARIANTS[lastLineOf(f, sp) % VARIANTS.length];
    const mouth = speaking && isMouthOpen(f) ? 'open' : 'close';
    return `characters/${CHAR_DIR[sp]}/${v}-${mouth}.png`;
};

const Characters: React.FC<{ frame: number }> = ({ frame: f }) => {
    const cur = SCRIPT[lineAt(f)].speaker;
    const base: React.CSSProperties = {
        position: 'absolute',
        width: 340,
        zIndex: 20,
        filter: 'drop-shadow(0 6px 20px rgba(17,24,39,.18))',
        pointerEvents: 'none',
    };
    return (
        <>
            <div style={{ ...base, left: 10, bottom: -130, transform: 'scaleX(-1)' }}>
                <Img src={staticFile(charSrc('めたん', f, cur === 'めたん'))} style={{ width: '100%' }} />
            </div>
            <div style={{ ...base, right: 10, bottom: -60 }}>
                <Img src={staticFile(charSrc('ずんだもん', f, cur === 'ずんだもん'))} style={{ width: '100%' }} />
            </div>
        </>
    );
};

const SubtitleCard: React.FC<{ frame: number }> = ({ frame: f }) => {
    const i = lineAt(f);
    const line = SCRIPT[i];
    const sp = line.speaker;
    return (
        <div
            style={{
                position: 'absolute',
                left: 50,
                right: 50,
                bottom: 26,
                height: 200,
                zIndex: 25,
                background: 'rgba(255,255,255,0.96)',
                border: '2px solid rgba(36,48,68,0.06)',
                borderRadius: 30,
                boxShadow: '0 18px 50px rgba(36,48,68,0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 90px',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: -24,
                    ...(sp === 'めたん' ? { left: 64 } : { right: 64 }),
                    background: SPEAKER_COLOR[sp],
                    color: '#fff',
                    fontFamily,
                    fontSize: 26,
                    fontWeight: 900,
                    padding: '6px 26px',
                    borderRadius: 999,
                }}
            >
                {sp}
            </div>
            <div
                style={{
                    fontFamily,
                    fontSize: 48,
                    fontWeight: 900,
                    color: INK,
                    textAlign: 'center',
                    lineHeight: 1.45,
                }}
            >
                {line.text}
            </div>
        </div>
    );
};

// ---------------- main ----------------
export const AiBlackBox: React.FC = () => {
    const f = useCurrentFrame();
    return (
        <AbsoluteFill style={{ backgroundColor: BG, fontFamily }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080" style={{ position: 'absolute' }}>
                {SCENE_COMPONENTS.map((C, i) => {
                    const v = sceneVis(i, f);
                    if (v <= 0.01) return null;
                    return <C key={SCENES[i].key} f={f} vis={v} />;
                })}
            </svg>
            <Header frame={f} />
            <Floor />
            <Characters frame={f} />
            <SubtitleCard frame={f} />
            <Audio src={staticFile(VOICE_SRC)} />
            <Audio src={staticFile(BGM_SRC)} volume={BGM_VOLUME} loop />
        </AbsoluteFill>
    );
};
