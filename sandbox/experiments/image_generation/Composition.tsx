import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import { SCRIPT, type Speaker } from './scriptData';
import { AUDIO, LINE_STARTS, TOTAL_FRAMES as AUDIO_TOTAL_FRAMES, VOICE_SRC } from './audioData';

const { fontFamily } = loadFont();
export const TOTAL_FRAMES = AUDIO_TOTAL_FRAMES;

// ---------- 色の語彙 ----------
// 紙＝白い面とインク。意味色は4つだけ：
// ミント＝言葉が指す目的地、グレー＝ノイズ（未確定の色の可能性）、
// アンバー＝自分で足したから答えを知っているもの、レッド/ブルー＝束ねる属性。
const BG = '#f4f6fa';
const INK = '#243044';
const SUB = '#7b8aa0';
const MINT = '#0fa57d';
const MINT_SOFT = 'rgba(15,165,125,0.16)';
const NOISE = '#9aa6b8';
const AMBER = '#f59e0b';
const RED = '#e54848';
const BLUE = '#3b82f6';
const CARD_LINE = 'rgba(36,48,68,0.10)';

// ---------- event → frame ----------
const EVENT_FRAME: Record<string, number> = {};
SCRIPT.forEach((l, i) => {
    if (l.event) EVENT_FRAME[l.event] = LINE_STARTS[i];
});
const ev = (name: string): number => {
    const f = EVENT_FRAME[name];
    if (f === undefined) throw new Error(`unknown event: ${name}`);
    return f;
};

// ---------- トラック補間 ----------
const ease = Easing.bezier(0.4, 0, 0.2, 1);

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
        const a = track[i], b = track[i + 1];
        if (f >= a.f && f <= b.f) {
            const t = ease((f - a.f) / Math.max(1, b.f - a.f));
            return blendNumeric(a.state, b.state, t);
        }
    }
    return track[track.length - 1].state;
};

// 一発の進行（0→1）。登場・描き起こし用
const prog = (f: number, start: number, dur: number): number =>
    ease(Math.min(1, Math.max(0, (f - start) / Math.max(1, dur))));

// 決定論の擬似乱数（Math.random はレンダ毎にズレるので使わない）
const rnd = (i: number, salt = 0): number => {
    const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
    return x - Math.floor(x);
};

// ---------- プリミティブ ----------

// 白い紙カード
const Paper: React.FC<{
    x: number; y: number; w: number; h: number; o?: number; rx?: number; fill?: string;
}> = ({ x, y, w, h, o = 1, rx = 18, fill = '#ffffff' }) => (
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={rx}
        fill={fill} stroke={CARD_LINE} strokeWidth={2} opacity={o} filter="url(#soft)" />
);

// プロンプト札（ミントの耳付き白カード）
const PromptCard: React.FC<{
    x: number; y: number; s?: number; o?: number; text: string; w?: number;
}> = ({ x, y, s = 1, o = 1, text, w = 460 }) => (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
        <rect x={-w / 2} y={-52} width={w} height={104} rx={20}
            fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
        <rect x={-w / 2 + 16} y={-30} width={10} height={60} rx={5} fill={MINT} />
        <text x={-w / 2 + 48} y={13} fontSize={36} fontWeight={700} fill={INK}>{text}</text>
    </g>
);

// 目的地マーカー（ミントのピン）。ring=0..1 で着地の波紋を一度だけ出す
const Pin: React.FC<{ x: number; y: number; s?: number; o?: number; ring?: number }> = ({
    x, y, s = 1, o = 1, ring = 0,
}) => (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
        {ring > 0 && ring < 1 && (
            <circle cx={0} cy={0} r={14 + ring * 46} fill="none" stroke={MINT}
                strokeWidth={3} opacity={(1 - ring) * 0.8} />
        )}
        <path d="M 0 0 C -22 -26 -26 -40 -26 -52 A 26 26 0 1 1 26 -52 C 26 -40 22 -26 0 0 Z"
            fill={MINT} />
        <circle cx={0} cy={-52} r={10} fill="#fff" />
    </g>
);

// ノイズ雲（グレーの粒群）。spread=1 が標準散布
const NoiseBall: React.FC<{
    cx: number; cy: number; r: number; n?: number; o?: number; seed?: number; spread?: number;
}> = ({ cx, cy, r, n = 60, o = 1, seed = 1, spread = 1 }) => (
    <g opacity={o}>
        {Array.from({ length: n }, (_, i) => {
            const a = rnd(i, seed) * Math.PI * 2;
            const d = r * Math.sqrt(rnd(i, seed + 7)) * spread;
            const pr = 3.5 + rnd(i, seed + 13) * 4;
            const dark = rnd(i, seed + 19) > 0.75;
            return (
                <circle key={i} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d * 0.82}
                    r={pr} fill={dark ? '#7d8aa0' : NOISE} opacity={0.5 + rnd(i, seed + 23) * 0.5} />
            );
        })}
    </g>
);

// 潜在作業台（少しパースの付いた白い面）
const Workbench: React.FC<{
    x: number; y: number; w: number; h: number; o?: number;
}> = ({ x, y, w, h, o = 1 }) => {
    const sk = w * 0.09; // 上辺を少し狭めて面に見せる
    return (
        <g opacity={o}>
            <path d={`M ${x - w / 2 + sk} ${y - h / 2} L ${x + w / 2 - sk} ${y - h / 2}
                L ${x + w / 2} ${y + h / 2} L ${x - w / 2} ${y + h / 2} Z`}
                fill="#ffffff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
            {[0.25, 0.5, 0.75].map((t) => (
                <line key={t}
                    x1={x - w / 2 + sk + (w - 2 * sk) * t - (sk * (t - 0.5) * -2) * 0}
                    y1={y - h / 2}
                    x2={x - w / 2 + w * t}
                    y2={y + h / 2}
                    stroke="rgba(36,48,68,0.05)" strokeWidth={2} />
            ))}
            <line x1={x - w / 2 + sk / 2} y1={y} x2={x + w / 2 - sk / 2} y2={y}
                stroke="rgba(36,48,68,0.05)" strokeWidth={2} />
        </g>
    );
};

// 生成画像タイル：簡略化した「赤い靴を履いた猫」。noise=1 で砂嵐、0 で完成
const CatTile: React.FC<{
    x: number; y: number; s?: number; o?: number; noise?: number; seed?: number;
    detail?: number; // 1=ひげ等の細部あり 0=細部が崩れた状態
}> = ({ x, y, s = 1, o = 1, noise = 0, seed = 3, detail = 1 }) => {
    const W = 240, H = 240;
    const catO = 1 - noise * 0.92;
    return (
        <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
            <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={16}
                fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
            {/* 背景（空と床） */}
            <rect x={-W / 2 + 10} y={-H / 2 + 10} width={W - 20} height={H * 0.58}
                rx={10} fill="#e8f1fb" opacity={catO} />
            <rect x={-W / 2 + 10} y={-H / 2 + 10 + H * 0.58} width={W - 20} height={H - 20 - H * 0.58}
                rx={10} fill="#f3ede2" opacity={catO} />
            {/* 猫 */}
            <g opacity={catO}>
                <ellipse cx={0} cy={34} rx={46} ry={52} fill="#8d99ab" />
                <circle cx={0} cy={-32} r={38} fill="#9aa5b6" />
                <path d="M -34 -52 L -26 -86 L -8 -60 Z" fill="#9aa5b6" />
                <path d="M 34 -52 L 26 -86 L 8 -60 Z" fill="#9aa5b6" />
                <circle cx={-14} cy={-36} r={4.5} fill={INK} />
                <circle cx={14} cy={-36} r={4.5} fill={INK} />
                <path d="M -6 -24 Q 0 -18 6 -24" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
                {/* ひげ＝細部。detail が下がると崩れる */}
                <g opacity={detail} stroke={INK} strokeWidth={2.5} strokeLinecap="round">
                    <line x1={-24} y1={-28} x2={-46} y2={-32} />
                    <line x1={-24} y1={-22} x2={-46} y2={-20} />
                    <line x1={24} y1={-28} x2={46} y2={-32} />
                    <line x1={24} y1={-22} x2={46} y2={-20} />
                </g>
                <g opacity={1 - detail}>
                    <line x1={-26} y1={-28} x2={-40} y2={-14} stroke={RED} strokeWidth={2.5} />
                    <line x1={26} y1={-26} x2={38} y2={-38} stroke={RED} strokeWidth={2.5} />
                </g>
                {/* 赤い靴 */}
                <ellipse cx={-22} cy={92} rx={22} ry={12} fill={RED} />
                <ellipse cx={22} cy={92} rx={22} ry={12} fill={RED} />
            </g>
            {/* ノイズ被せ */}
            {noise > 0.02 && (
                <g opacity={noise}>
                    <rect x={-W / 2 + 6} y={-H / 2 + 6} width={W - 12} height={H - 12} rx={12}
                        fill="#eef1f6" opacity={0.7} />
                    {Array.from({ length: 70 }, (_, i) => (
                        <circle key={i}
                            cx={-W / 2 + 14 + rnd(i, seed) * (W - 28)}
                            cy={-H / 2 + 14 + rnd(i, seed + 5) * (H - 28)}
                            r={3 + rnd(i, seed + 9) * 4}
                            fill={rnd(i, seed + 11) > 0.7 ? '#7d8aa0' : NOISE}
                            opacity={0.5 + rnd(i, seed + 15) * 0.5} />
                    ))}
                </g>
            )}
        </g>
    );
};

// 生成画像タイル（掴み）：簡略化した「白い猫・宇宙服・ラーメン屋」。それっぽい絵＝結果像
const HookTile: React.FC<{
    x: number; y: number; s?: number; o?: number; noise?: number; seed?: number;
}> = ({ x, y, s = 1, o = 1, noise = 0, seed = 2 }) => {
    const W = 240, H = 240;
    const c = 1 - noise * 0.92; // 中身の不透明度（ノイズで溶ける）
    return (
        <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
            <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={16}
                fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
            {/* 背景：ラーメン屋（暖色の壁＋木のカウンター＋のれん＋赤提灯） */}
            <g opacity={c}>
                <rect x={-110} y={-110} width={220} height={132} rx={10} fill="#e7c3a6" />
                <rect x={-110} y={22} width={220} height={88} rx={10} fill="#d6ae80" />
                <rect x={-110} y={-110} width={220} height={26} fill="#c4564a" />
                {[-72, -26, 20, 66].map((lx, i) => (
                    <line key={i} x1={lx} y1={-110} x2={lx} y2={-84} stroke="#fff" strokeWidth={3} opacity={0.7} />
                ))}
                <g>
                    <ellipse cx={76} cy={-48} rx={21} ry={27} fill="#d8453a" />
                    <rect x={67} y={-77} width={18} height={6} rx={3} fill="#7a2b22" />
                    <rect x={67} y={-26} width={18} height={6} rx={3} fill="#7a2b22" />
                    {[-9, 0, 9].map((rx, i) => (
                        <line key={i} x1={76 + rx} y1={-71} x2={76 + rx} y2={-26} stroke="#a8362c" strokeWidth={2} />
                    ))}
                </g>
            </g>
            {/* 白い猫 */}
            <g opacity={c}>
                <ellipse cx={0} cy={40} rx={42} ry={48} fill="#fbfaf7" stroke="#d8cfbe" strokeWidth={2} />
                <path d="M -30 -52 L -22 -84 L -6 -58 Z" fill="#fbfaf7" stroke="#d8cfbe" strokeWidth={2} />
                <path d="M 30 -52 L 22 -84 L 6 -58 Z" fill="#fbfaf7" stroke="#d8cfbe" strokeWidth={2} />
                <circle cx={0} cy={-30} r={34} fill="#fdfdfb" stroke="#d8cfbe" strokeWidth={2} />
                <circle cx={-12} cy={-32} r={4.5} fill={INK} />
                <circle cx={12} cy={-32} r={4.5} fill={INK} />
                <path d="M -5 -22 Q 0 -17 5 -22" stroke={INK} strokeWidth={2.5} fill="none" strokeLinecap="round" />
                <g stroke="#c7bda9" strokeWidth={2} strokeLinecap="round">
                    <line x1={-20} y1={-24} x2={-40} y2={-28} />
                    <line x1={20} y1={-24} x2={40} y2={-28} />
                </g>
            </g>
            {/* 宇宙服：首リング＋ヘルメットのドーム＋アンテナ */}
            <g opacity={c}>
                <rect x={-30} y={2} width={60} height={16} rx={8} fill="#cdd8e6" stroke="#aebccd" strokeWidth={2} />
                <circle cx={0} cy={-34} r={48} fill="rgba(210,230,245,0.22)" stroke="#bcd0e0" strokeWidth={2.5} />
                <path d="M -28 -58 A 48 48 0 0 1 6 -80" fill="none" stroke="#ffffff" strokeWidth={5} strokeLinecap="round" opacity={0.7} />
                <line x1={30} y1={-70} x2={40} y2={-86} stroke="#aebccd" strokeWidth={3} strokeLinecap="round" />
                <circle cx={41} cy={-88} r={4} fill="#d8453a" />
            </g>
            {/* ラーメン丼（前）＋湯気 */}
            <g opacity={c}>
                <path d="M -34 92 A 34 16 0 0 0 34 92 Z" fill="#d8453a" />
                <ellipse cx={0} cy={92} rx={34} ry={9} fill="#f1e4cf" />
                <path d="M -22 90 q 10 -6 20 0 q 10 6 20 0" fill="none" stroke="#e6c178" strokeWidth={3} />
                <path d="M -8 78 q 6 -8 0 -16" fill="none" stroke="#cbb89a" strokeWidth={2.5} opacity={0.7} />
                <path d="M 10 78 q 6 -8 0 -16" fill="none" stroke="#cbb89a" strokeWidth={2.5} opacity={0.7} />
            </g>
            {/* ノイズ被せ */}
            {noise > 0.02 && (
                <g opacity={noise}>
                    <rect x={-W / 2 + 6} y={-H / 2 + 6} width={W - 12} height={H - 12} rx={12}
                        fill="#eef1f6" opacity={0.7} />
                    {Array.from({ length: 70 }, (_, i) => (
                        <circle key={i}
                            cx={-W / 2 + 14 + rnd(i, seed) * (W - 28)}
                            cy={-H / 2 + 14 + rnd(i, seed + 5) * (H - 28)}
                            r={3 + rnd(i, seed + 9) * 4}
                            fill={rnd(i, seed + 11) > 0.7 ? '#7d8aa0' : NOISE}
                            opacity={0.5 + rnd(i, seed + 15) * 0.5} />
                    ))}
                </g>
            )}
        </g>
    );
};

// 矢印（根元から伸びる）。t=描画進行、bend=ミント誘導の曲がり（度）
const Arrow: React.FC<{
    x1: number; y1: number; x2: number; y2: number; t?: number; o?: number;
    color?: string; w?: number; bend?: number;
}> = ({ x1, y1, x2, y2, t = 1, o = 1, color = INK, w = 5, bend = 0 }) => {
    if (t <= 0.01) return null;
    const ang = Math.atan2(y2 - y1, x2 - x1) + (bend * Math.PI) / 180;
    const len = Math.hypot(x2 - x1, y2 - y1) * t;
    const ex = x1 + Math.cos(ang) * len;
    const eyy = y1 + Math.sin(ang) * len;
    const hs = Math.min(16, len * 0.4);
    return (
        <g opacity={o}>
            <line x1={x1} y1={y1} x2={ex} y2={eyy} stroke={color} strokeWidth={w} strokeLinecap="round" />
            {t > 0.55 && (
                <path d={`M ${ex} ${eyy} L ${ex - hs * Math.cos(ang - 0.45)} ${eyy - hs * Math.sin(ang - 0.45)}
                    M ${ex} ${eyy} L ${ex - hs * Math.cos(ang + 0.45)} ${eyy - hs * Math.sin(ang + 0.45)}`}
                    stroke={color} strokeWidth={w} strokeLinecap="round" fill="none" />
            )}
        </g>
    );
};

// 1語タグ（白ピル）
const Tag: React.FC<{
    x: number; y: number; text: string; o?: number; color?: string; s?: number; fontSize?: number;
}> = ({ x, y, text, o = 1, color = INK, s = 1, fontSize = 30 }) => {
    const w = text.length * fontSize * 0.62 + 44;
    return (
        <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
            <rect x={-w / 2} y={-27} width={w} height={54} rx={27}
                fill="#fff" stroke={color === INK ? CARD_LINE : color} strokeWidth={2.5} filter="url(#soft)" />
            <text x={0} y={fontSize * 0.36} fontSize={fontSize} fontWeight={800} fill={color} textAnchor="middle">{text}</text>
        </g>
    );
};

// 役割ボックス（エンコーダ／デコーダ／モデル）
const RoleBox: React.FC<{
    x: number; y: number; w: number; h: number; label: string; o?: number; flip?: boolean;
}> = ({ x, y, w, h, label, o = 1, flip = false }) => {
    const t = flip ? 0.28 : 0; // flip=デコーダ（狭→広）
    const u = flip ? 0 : 0.28;
    return (
        <g opacity={o}>
            <path d={`M ${x - w / 2} ${y - h / 2 + h * t} L ${x + w / 2} ${y - h / 2 + h * u}
                L ${x + w / 2} ${y + h / 2 - h * u} L ${x - w / 2} ${y + h / 2 - h * t} Z`}
                fill="#fff" stroke={INK} strokeWidth={3} filter="url(#soft)" />
            <text x={x} y={y + 11} fontSize={30} fontWeight={800} fill={INK} textAnchor="middle">{label}</text>
        </g>
    );
};

// ---------- 画面 1: intro ----------
// 文字だけのプロンプトが、絵師の手ではなく目的地マーカーとノイズ雲を動かす装置として現れる
const SceneIntro: React.FC<{ f: number; o: number }> = ({ f, o }) => {
    const s1 = ev('scene.intro.in');
    const gap = ev('intro.text_image.gap');
    const artist = ev('intro.artist.cross');
    const dest = ev('intro.destination.noise');
    const q = ev('intro.question');

    const CARD = { x: -430, y: -150 };
    const FRAME = { x: 430, y: -100, w: 300, h: 300 };

    const cardIn = prog(f, s1 + 6, 26);
    const frameIn = prog(f, s1 + 22, 26);
    const gapIn = prog(f, gap, 34);
    const artistIn = prog(f, artist + 6, 20);
    const crossIn = prog(f, artist + 34, 16);
    const artistOut = 1 - prog(f, artist + 150, 20);
    const markerIn = prog(f, dest + 4, 28);
    const lineT = prog(f, dest + 30, 40);
    const hookToNoise = prog(f, dest + 2, 30); // それっぽい絵 → ノイズへほどける
    const zoom = prog(f, q + 4, 44); // 問いの状態：マーカーと雲が中央へ

    const others = 1 - zoom * 0.7;
    // マーカー：カードの上 → 中央左へ
    const mx = CARD.x + (-170 - CARD.x) * zoom;
    const my = CARD.y - 84 + (-40 - (CARD.y - 84)) * zoom;
    // ノイズ雲：枠の中 → 中央右へ拡大
    const nx = FRAME.x + (190 - FRAME.x) * zoom;
    const ny = FRAME.y + (-40 - FRAME.y) * zoom;
    const nr = 100 + 60 * zoom;

    const promptChars = '白い猫、宇宙服、ラーメン屋'.split('');
    const PALETTE = ['#cfe3f7', '#f7e3cf', '#e3f7d8', '#f7d8e3', '#e3d8f7', '#d8f0f7'];

    return (
        <g opacity={o}>
            {/* 画像枠と、その中に生成された「それっぽい絵」 */}
            <g opacity={frameIn * others * (1 - zoom)}>
                <HookTile x={FRAME.x} y={FRAME.y} s={1.18} noise={hookToNoise} seed={2} />
            </g>
            {/* 像がほどけたノイズ雲（問いで中央へ移り拡大） */}
            <NoiseBall cx={nx} cy={ny} r={nr} n={70} seed={2} o={frameIn * zoom} />
            {/* プロンプト札 */}
            <g opacity={others}>
                <PromptCard x={CARD.x} y={CARD.y} o={cardIn} text="白い猫、宇宙服、ラーメン屋" w={500} />
            </g>
            {/* 断絶：文字の並び vs 色の点の並び */}
            <g opacity={gapIn * others}>
                <path d="M 0 -300 L -14 -240 L 14 -180 L -14 -120 L 14 -60 L -14 0 L 14 60 L 0 120"
                    fill="none" stroke={SUB} strokeWidth={4} strokeDasharray="14 10" />
                {promptChars.map((c, i) => (
                    <g key={i} transform={`translate(${CARD.x - 270 + i * 45},${60})`}
                        opacity={prog(f, gap + 8 + i * 2, 14)}>
                        <rect x={-19} y={-24} width={38} height={48} rx={8}
                            fill="#fff" stroke={CARD_LINE} strokeWidth={2} />
                        <text x={0} y={11} fontSize={28} fontWeight={700} fill={INK} textAnchor="middle">{c}</text>
                    </g>
                ))}
                {Array.from({ length: 30 }, (_, i) => {
                    const col = i % 6, row = Math.floor(i / 6);
                    return (
                        <rect key={i} x={FRAME.x - 132 + col * 45} y={70 + row * 45 - 24}
                            width={40} height={40} rx={4}
                            fill={PALETTE[Math.floor(rnd(i, 31) * PALETTE.length)]}
                            opacity={prog(f, gap + 10 + i * 1.2, 12)} />
                    );
                })}
            </g>
            {/* 絵師の幻 → バツ */}
            {artistOut > 0.01 && (
                <g transform="translate(0,-330)" opacity={artistIn * artistOut * others}>
                    <circle cx={0} cy={-34} r={26} fill="none" stroke={SUB} strokeWidth={4} />
                    <path d="M -30 40 Q 0 -6 30 40" fill="none" stroke={SUB} strokeWidth={4} />
                    <line x1={26} y1={6} x2={58} y2={-30} stroke={SUB} strokeWidth={4} strokeLinecap="round" />
                    <line x1={52} y1={-36} x2={64} y2={-24} stroke={SUB} strokeWidth={7} strokeLinecap="round" />
                    <g opacity={crossIn}>
                        <line x1={-54} y1={-70} x2={54 * crossIn * 2 - 54} y2={crossIn * 2 * 124 - 70}
                            stroke={RED} strokeWidth={7} strokeLinecap="round" opacity={0.8} />
                        <line x1={54} y1={-70} x2={54 - 108 * crossIn} y2={-70 + 124 * crossIn}
                            stroke={RED} strokeWidth={7} strokeLinecap="round" opacity={0.8} />
                    </g>
                </g>
            )}
            {/* 目的地マーカーと誘導線 */}
            {markerIn > 0.01 && (
                <>
                    <Pin x={mx} y={my} s={(0.7 + 0.5 * zoom) * markerIn} o={markerIn} ring={prog(f, dest + 8, 50)} />
                    <line x1={mx + 30} y1={my - 30} x2={mx + 30 + (nx - nr * 0.7 - mx - 30) * lineT}
                        y2={my - 30 + (ny - my + 30) * lineT}
                        stroke={MINT} strokeWidth={4} strokeDasharray="12 10" opacity={markerIn * 0.9} />
                </>
            )}
        </g>
    );
};

// ---------- 画面 2: prompt_map ----------
// 文章と画像が同じ地図に置かれ、プロンプトは「このへんの絵へ向かう」座標として効く
const SceneMap: React.FC<{ f: number; o: number }> = ({ f, o }) => {
    const s2 = ev('scene.prompt_map.in');
    const pairs = ev('map.pairs.in');
    const align = ev('map.align');
    const nearfar = ev('map.near_far');
    const destm = ev('map.destination');
    const bias = ev('map.bias');
    const towork = ev('map.to_workspace');

    const MAP = { cx: 0, cy: -50, w: 1040, h: 500 };
    const p2m = prog(f, s2 + 40, 50);       // 命令書 → 地図
    const paperIn = prog(f, s2 + 6, 24);
    const shrink = prog(f, towork + 10, 50); // 地図が縮み作業台がせり上がる

    // 紙のサイズ → 地図のサイズへ
    const pw = 380 + (MAP.w - 380) * p2m;
    const ph = 460 + (MAP.h - 460) * p2m;

    // ペア（画像チップ＋説明文チップ）：上の列 → 地図上の点へ
    const PAIRS = [
        { img: { x: -420, y: -420 }, txt: { x: -180, y: -420 }, dotI: { x: -250, y: -170 }, dotT: { x: -212, y: -148 }, label: 'a cat on a sofa', kind: 'cat' },
        { img: { x: 160, y: -420 }, txt: { x: 410, y: -420 }, dotI: { x: 210, y: 30 }, dotT: { x: 252, y: 54 }, label: 'ramen in a bowl', kind: 'ramen' },
    ] as const;
    const alignT = prog(f, align + 6, 44);

    // 近い・遠い：黒猫ペアが寄る／消防車が離れる
    const nfT = prog(f, nearfar + 6, 40);
    const fireX = -60 + (440 - -60) * nfT;
    const fireY = -60 + (130 - -60) * nfT;

    const pinIn = prog(f, destm + 10, 30);
    const biasIn = prog(f, bias + 6, 30);
    const PIN = { x: 40, y: -90 };

    const mapScale = 1 - 0.22 * shrink;
    const mapDy = -70 * shrink;

    return (
        <g opacity={o}>
            <g transform={`translate(0,${mapDy}) scale(${mapScale})`}>
                {/* 命令書の紙 ⇄ 地図面 */}
                <g opacity={paperIn}>
                    <rect x={MAP.cx - pw / 2} y={MAP.cy - ph / 2} width={pw} height={ph} rx={20}
                        fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
                    {/* 命令書の箇条線（地図化で消える） */}
                    <g opacity={(1 - p2m) * paperIn}>
                        {[0, 1, 2, 3, 4].map((i) => (
                            <g key={i}>
                                <circle cx={MAP.cx - 130} cy={MAP.cy - 150 + i * 70} r={7} fill={SUB} />
                                <line x1={MAP.cx - 100} y1={MAP.cy - 150 + i * 70}
                                    x2={MAP.cx + 140 - (i % 2) * 50} y2={MAP.cy - 150 + i * 70}
                                    stroke={SUB} strokeWidth={6} strokeLinecap="round" opacity={0.55} />
                            </g>
                        ))}
                    </g>
                    {/* 地図のグリッドと等高線 */}
                    <g opacity={p2m}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <line key={`v${i}`} x1={MAP.cx - MAP.w / 2 + (MAP.w / 6) * i} y1={MAP.cy - MAP.h / 2 + 8}
                                x2={MAP.cx - MAP.w / 2 + (MAP.w / 6) * i} y2={MAP.cy + MAP.h / 2 - 8}
                                stroke="rgba(36,48,68,0.06)" strokeWidth={2} />
                        ))}
                        {[1, 2].map((i) => (
                            <line key={`h${i}`} x1={MAP.cx - MAP.w / 2 + 8} y1={MAP.cy - MAP.h / 2 + (MAP.h / 3) * i}
                                x2={MAP.cx + MAP.w / 2 - 8} y2={MAP.cy - MAP.h / 2 + (MAP.h / 3) * i}
                                stroke="rgba(36,48,68,0.06)" strokeWidth={2} />
                        ))}
                        <path d={`M ${MAP.cx - 380} ${MAP.cy + 60} Q ${MAP.cx - 250} ${MAP.cy - 60} ${MAP.cx - 90} ${MAP.cy - 20}
                            T ${MAP.cx + 240} ${MAP.cy - 90}`}
                            fill="none" stroke={MINT_SOFT} strokeWidth={5} />
                        <path d={`M ${MAP.cx - 300} ${MAP.cy + 170} Q ${MAP.cx - 80} ${MAP.cy + 90} ${MAP.cx + 160} ${MAP.cy + 150}`}
                            fill="none" stroke={MINT_SOFT} strokeWidth={5} />
                    </g>
                </g>
                {/* 画像・説明文ペア → 地図上の点 */}
                {PAIRS.map((p, pi) => {
                    const inT = prog(f, pairs + 8 + pi * 14, 24);
                    const ix = p.img.x + (p.dotI.x - p.img.x) * alignT;
                    const iy = p.img.y + (p.dotI.y - p.img.y) * alignT;
                    const tx = p.txt.x + (p.dotT.x - p.txt.x) * alignT;
                    const ty = p.txt.y + (p.dotT.y - p.txt.y) * alignT;
                    const chip = 1 - alignT;
                    return (
                        <g key={pi} opacity={inT}>
                            {/* 画像チップ → 塗り点 */}
                            <g transform={`translate(${ix},${iy})`}>
                                <g opacity={chip}>
                                    <rect x={-62} y={-52} width={124} height={104} rx={14}
                                        fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
                                    {p.kind === 'cat' ? (
                                        <g>
                                            <circle cx={0} cy={2} r={26} fill="#9aa5b6" />
                                            <path d="M -22 -14 L -18 -36 L -6 -20 Z" fill="#9aa5b6" />
                                            <path d="M 22 -14 L 18 -36 L 6 -20 Z" fill="#9aa5b6" />
                                            <circle cx={-9} cy={0} r={3} fill={INK} />
                                            <circle cx={9} cy={0} r={3} fill={INK} />
                                        </g>
                                    ) : (
                                        <g>
                                            <path d="M -30 6 A 30 30 0 0 0 30 6 Z" fill="#e8b06a" />
                                            <ellipse cx={0} cy={4} rx={30} ry={7} fill="#f3ede2" />
                                            <line x1={10} y1={-26} x2={22} y2={2} stroke={SUB} strokeWidth={4} strokeLinecap="round" />
                                            <line x1={20} y1={-28} x2={30} y2={0} stroke={SUB} strokeWidth={4} strokeLinecap="round" />
                                        </g>
                                    )}
                                </g>
                                <circle cx={0} cy={0} r={11} fill={INK} opacity={alignT} />
                            </g>
                            {/* 説明文チップ → 輪の点 */}
                            <g transform={`translate(${tx},${ty})`}>
                                <g opacity={chip}>
                                    <rect x={-110} y={-32} width={220} height={64} rx={14}
                                        fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
                                    <text x={0} y={8} fontSize={26} fontWeight={700} fill={SUB} textAnchor="middle">{p.label}</text>
                                </g>
                                <circle cx={0} cy={0} r={10} fill="none" stroke={MINT} strokeWidth={5} opacity={alignT} />
                            </g>
                            {/* 対のしるし */}
                            <line x1={ix} y1={iy} x2={tx} y2={ty} stroke={SUB} strokeWidth={3}
                                strokeDasharray="6 7" opacity={chip > 0.5 ? inT * 0.7 : alignT * 0.7} />
                        </g>
                    );
                })}
                {/* 近くへ・遠くへ */}
                <g opacity={prog(f, nearfar, 20)}>
                    <g transform={`translate(${-330 + 60 * nfT},${-60 - 60 * nfT})`}>
                        <circle cx={0} cy={0} r={11} fill={INK} />
                        <text x={-24} y={-22} fontSize={30} fontWeight={800} fill={INK} textAnchor="end">黒猫</text>
                    </g>
                    <g transform={`translate(${-200 - 60 * nfT},${-30 - 84 * nfT})`}>
                        <circle cx={0} cy={0} r={10} fill="none" stroke={MINT} strokeWidth={5} />
                    </g>
                    <g transform={`translate(${fireX},${fireY})`}>
                        <circle cx={0} cy={0} r={11} fill={SUB} />
                        <text x={0} y={42} fontSize={30} fontWeight={800} fill={SUB} textAnchor="middle">消防車</text>
                    </g>
                </g>
                {/* プロンプト札 → 目的地マーカー */}
                {pinIn > 0.01 && (
                    <g>
                        <circle cx={PIN.x} cy={PIN.y} r={64 * pinIn} fill={MINT_SOFT} />
                        <Pin x={PIN.x} y={PIN.y + 30} s={pinIn} o={pinIn} ring={prog(f, destm + 24, 50)} />
                    </g>
                )}
                {/* 学習データの傾向＝偏り雲 */}
                <g opacity={biasIn * 0.9}>
                    <ellipse cx={PIN.x + 60} cy={PIN.y - 14} rx={190} ry={120} fill={NOISE} opacity={0.14} />
                    {Array.from({ length: 26 }, (_, i) => (
                        <circle key={i}
                            cx={PIN.x + 60 + (rnd(i, 41) - 0.35) * 320}
                            cy={PIN.y - 14 + (rnd(i, 43) - 0.5) * 200}
                            r={4 + rnd(i, 47) * 3} fill={NOISE} opacity={0.5} />
                    ))}
                </g>
            </g>
            {/* 下からせり上がる潜在作業台（次画面の主役の予告） */}
            {shrink > 0.01 && (
                <Workbench x={0} y={420 - 160 * shrink} w={560} h={200} o={shrink} />
            )}
        </g>
    );
};

// ---------- 画面 3: latent ----------
// 巨大なピクセル面は圧縮され、潜在作業台で作った形が最後に見える画像へ戻る
const SceneLatent: React.FC<{ f: number; o: number }> = ({ f, o }) => {
    const s3 = ev('scene.latent.in');
    const toobig = ev('latent.too_big');
    const compress = ev('latent.compress');
    const encode = ev('latent.encode');
    const decode = ev('latent.decode');
    const tradeoff = ev('latent.tradeoff');
    const nocolor = ev('latent.no_coloring');

    const PALETTE = ['#cfe3f7', '#f7e3cf', '#e3f7d8', '#f7d8e3', '#e3d8f7', '#d8f0f7'];
    const BENCH = { x: 0, y: 60, w: 520, h: 230 };

    const gridIn = prog(f, s3 + 6, 36);
    const denseIn = prog(f, toobig + 6, 36);
    const comp = prog(f, compress + 10, 56);     // 格子 → 作業台へ畳む
    const encT = prog(f, encode + 10, 50);       // エンコード流れ
    const decT = prog(f, decode + 10, 50);       // デコード流れ
    // 軽量化トレードオフ：縮みすぎ → 崩れ → 戻す
    const benchSq = resolve<{ s: number; broke: number }>([
        { f: tradeoff, state: { s: 1, broke: 0 } },
        { f: tradeoff + 40, state: { s: 0.55, broke: 0 } },
        { f: tradeoff + 70, state: { s: 0.55, broke: 1 } },
        { f: tradeoff + 150, state: { s: 0.55, broke: 1 } },
        { f: tradeoff + 190, state: { s: 1, broke: 0 } },
    ], f);
    const clear = prog(f, nocolor + 10, 36);     // 装置の退場
    const cloudIn = prog(f, nocolor + 30, 30);

    // 巨大格子（12×6）。圧縮で作業台の位置へ縮む
    const gw = 1180, gh = 620, cols = 12, rows = 6;
    const gridScale = 1 - (1 - BENCH.w / gw) * comp;
    const gridY = -120 + (BENCH.y - -120) * comp;
    const gridO = gridIn * (1 - comp);

    const sideO = Math.min(encT > 0 ? 1 : 0, prog(f, encode + 4, 24)) * (1 - clear);
    const decO = prog(f, decode + 4, 24) * (1 - clear);

    // エンコードの運び玉（タイル → 箱 → 台）
    const carry = (t: number, from: { x: number; y: number }, mid: { x: number; y: number }, to: { x: number; y: number }) => {
        if (t <= 0 || t >= 1) return null;
        const seg = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
        const a = t < 0.5 ? from : mid;
        const b = t < 0.5 ? mid : to;
        return { x: a.x + (b.x - a.x) * seg, y: a.y + (b.y - a.y) * seg - Math.sin(seg * Math.PI) * 40 };
    };
    const TILE_L = { x: -620, y: -80 };
    const ENC = { x: -330, y: -60 };
    const DEC = { x: 330, y: -60 };
    const TILE_R = { x: 620, y: -80 };
    const encBall = carry(encT, TILE_L, ENC, { x: BENCH.x, y: BENCH.y - 30 });
    const decBall = carry(decT, { x: BENCH.x, y: BENCH.y - 30 }, DEC, TILE_R);

    return (
        <g opacity={o}>
            {/* 巨大ピクセル格子 */}
            {gridO > 0.01 && (
                <g transform={`translate(0,${gridY}) scale(${gridScale})`} opacity={gridO}>
                    {Array.from({ length: cols * rows }, (_, i) => {
                        const c = i % cols, r = Math.floor(i / cols);
                        return (
                            <rect key={i}
                                x={-gw / 2 + c * (gw / cols) + 3} y={-gh / 2 + r * (gh / rows) + 3}
                                width={gw / cols - 6} height={gh / rows - 6} rx={6}
                                fill={PALETTE[Math.floor(rnd(i, 53) * PALETTE.length)]}
                                opacity={prog(f, s3 + 6 + (i % 17) * 2, 16)} />
                        );
                    })}
                    {/* 増殖＝倍密度の層 */}
                    <g opacity={denseIn}>
                        {Array.from({ length: cols * rows * 4 }, (_, i) => {
                            const c = i % (cols * 2), r = Math.floor(i / (cols * 2));
                            return (
                                <rect key={i}
                                    x={-gw / 2 + c * (gw / cols / 2) + 2} y={-gh / 2 + r * (gh / rows / 2) + 2}
                                    width={gw / cols / 2 - 4} height={gh / rows / 2 - 4} rx={3}
                                    fill={PALETTE[Math.floor(rnd(i, 59) * PALETTE.length)]}
                                    opacity={prog(f, toobig + 6 + (i % 23), 14) * 0.95} />
                            );
                        })}
                    </g>
                </g>
            )}
            {/* 点数の物量（数値のみ） */}
            <g opacity={denseIn * (1 - comp)}>
                <text x={320} y={-440} fontSize={48} fontWeight={900} fill={INK} textAnchor="middle">1024 × 1024 = 100万+ 点</text>
            </g>
            {/* 潜在作業台 */}
            {comp > 0.3 && (
                <g transform={`translate(${BENCH.x},${BENCH.y}) scale(${benchSq.s})`} opacity={prog(f, compress + 30, 30)}>
                    <Workbench x={0} y={0} w={BENCH.w} h={BENCH.h} />
                    {/* 台上の潜在表現＝粗い形（エンコードで現れる） */}
                    <g opacity={Math.max(comp > 0.9 ? 0.35 : 0, encT > 0.55 ? 1 : 0.35) * (1 - clear * 0.0)}>
                        {Array.from({ length: 12 }, (_, i) => {
                            const c = i % 4, r = Math.floor(i / 4);
                            const broke = benchSq.broke;
                            return (
                                <rect key={i}
                                    x={-110 + c * 56 + (rnd(i, 61) - 0.5) * 20 * broke}
                                    y={-66 + r * 48 + (rnd(i, 67) - 0.5) * 20 * broke}
                                    width={44} height={36} rx={8}
                                    fill={i % 3 === 0 ? '#b8c6d9' : '#cdd8e6'}
                                    opacity={0.9 - broke * 0.3} />
                            );
                        })}
                    </g>
                </g>
            )}
            {/* エンコーダ側 */}
            <g opacity={sideO}>
                <CatTile x={TILE_L.x} y={TILE_L.y} s={0.9} />
                <RoleBox x={ENC.x} y={ENC.y} w={170} h={170} label="エンコーダ" />
                <Arrow x1={TILE_L.x + 130} y1={TILE_L.y} x2={ENC.x - 100} y2={ENC.y} t={prog(f, encode + 6, 20)} color={SUB} />
                <Arrow x1={ENC.x + 100} y1={ENC.y} x2={BENCH.x - 200} y2={BENCH.y - 60} t={prog(f, encode + 26, 20)} color={SUB} />
            </g>
            {encBall && <circle cx={encBall.x} cy={encBall.y} r={16} fill={MINT} opacity={0.9} />}
            {/* デコーダ側 */}
            <g opacity={decO}>
                <RoleBox x={DEC.x} y={DEC.y} w={170} h={170} label="デコーダ" flip />
                <CatTile x={TILE_R.x} y={TILE_R.y} s={0.9} o={prog(f, decode + 40, 24)}
                    noise={(1 - decT) * 0.4} detail={1 - benchSq.broke} />
                <Arrow x1={BENCH.x + 200} y1={BENCH.y - 60} x2={DEC.x - 100} y2={DEC.y} t={prog(f, decode + 6, 20)} color={SUB} />
                <Arrow x1={DEC.x + 100} y1={DEC.y} x2={TILE_R.x - 130} y2={TILE_R.y} t={prog(f, decode + 26, 20)} color={SUB} />
            </g>
            {decBall && <circle cx={decBall.x} cy={decBall.y} r={16} fill={MINT} opacity={0.9} />}
            {/* 細部の崩れ（タイル右の赤しるしは CatTile.detail が出す） */}
            {/* 最後：作業台とノイズ雲だけが残る */}
            <NoiseBall cx={0} cy={BENCH.y - 90} r={86} n={50} seed={4} o={cloudIn} />
        </g>
    );
};

// ---------- 画面 4: denoise ----------
// 砂嵐は一発で絵にならず、言葉の方向を見ながら小さな修正を何度も重ねて像になる
const SceneDenoise: React.FC<{ f: number; o: number }> = ({ f, o }) => {
    const s4 = ev('scene.denoise.in');
    const fwd = ev('denoise.forward');
    const ans = ev('denoise.answer');
    const step = ev('denoise.step_power');
    const nobig = ev('denoise.no_big_jump');
    const chain = ev('denoise.chain');
    const guide = ev('denoise.prompt_guidance');
    const nextp = ev('denoise.next_problem');

    // 中央の主役：作業台の上のノイズ雲（＝ノイズまみれの潜在タイル）
    const main = resolve<{ noise: number; dim: number; s: number; y: number }>([
        { f: s4, state: { noise: 1, dim: 0, s: 1.35, y: -100 } },
        { f: s4 + 30, state: { noise: 1, dim: 1, s: 1.35, y: -100 } },
        { f: fwd, state: { noise: 1, dim: 0.35, s: 1.35, y: -100 } },          // 学習の説明中は脇役
        { f: step - 20, state: { noise: 1, dim: 0.35, s: 1.35, y: -100 } },
        { f: step, state: { noise: 1, dim: 1, s: 1.35, y: -100 } },
        { f: step + 60, state: { noise: 0.85, dim: 1, s: 1.35, y: -100 } },    // 一層だけ取れる
        { f: chain, state: { noise: 0.85, dim: 1, s: 1.35, y: -100 } },
        { f: chain + 40, state: { noise: 0.66, dim: 1, s: 1.35, y: -100 } },
        { f: chain + 80, state: { noise: 0.48, dim: 1, s: 1.35, y: -100 } },
        { f: chain + 120, state: { noise: 0.32, dim: 1, s: 1.35, y: -100 } },
        { f: guide, state: { noise: 0.32, dim: 1, s: 1.35, y: -100 } },
        { f: guide + 90, state: { noise: 0.06, dim: 1, s: 1.35, y: -100 } },   // 言葉を見ながら仕上がる
        { f: nextp, state: { noise: 0.06, dim: 1, s: 1.35, y: -100 } },
        { f: nextp + 40, state: { noise: 0.06, dim: 0.3, s: 1.0, y: -140 } },  // 退いて次の問題へ
    ], f);
    const mainIn = prog(f, s4 + 6, 30);

    // 学習：きれいな画像 → 段階的に砂嵐（上の帯）
    const STAGES = [0, 0.4, 0.75, 1];
    const stageX = (i: number) => -560 + i * 250;
    const ROW_Y = -300;
    const fwdRowO = prog(f, fwd + 4, 24) * (1 - prog(f, step + 140, 30));
    const ansT = prog(f, ans + 8, 30);

    // 一発はぼやける（中段の脇見せ）
    const bigT = prog(f, nobig + 8, 36);
    const bigOut = 1 - prog(f, chain - 14, 14);

    // 小さな矢印の列（作業台の下）
    const N_ARROWS = 5;
    const guideT = prog(f, guide + 20, 36);

    const pcIn = prog(f, guide + 4, 26);
    const PC = { x: -610, y: -330 };

    const chipsIn = prog(f, nextp + 20, 30);

    return (
        <g opacity={o}>
            <Workbench x={0} y={160} w={1060} h={210} o={mainIn} />
            {/* 学習の帯：わざと壊す */}
            <g opacity={fwdRowO}>
                {STAGES.map((nz, i) => (
                    <g key={i}>
                        <CatTile x={stageX(i)} y={ROW_Y} s={0.58} noise={nz} seed={5 + i}
                            o={prog(f, fwd + 8 + i * 16, 20)} />
                        {i > 0 && (
                            <Arrow x1={stageX(i - 1) + 80} y1={ROW_Y} x2={stageX(i) - 80} y2={ROW_Y}
                                t={prog(f, fwd + 16 + i * 16, 16)} color={SUB} w={4} />
                        )}
                        {/* 降る粒（足すノイズ）。ans 以降はアンバー＝答えを知っている粒 */}
                        {i > 0 && f > fwd + 8 + i * 16 && f < step && (
                            <g>
                                {Array.from({ length: 6 }, (_, k) => {
                                    const t0 = fwd + 14 + i * 16 + k * 4;
                                    const tt = prog(f, t0, 26);
                                    if (tt <= 0 || tt >= 1) return null;
                                    return (
                                        <circle key={k}
                                            cx={stageX(i) - 40 + rnd(k, 70 + i) * 80}
                                            cy={ROW_Y - 130 + tt * 100}
                                            r={5} fill={ansT > 0.3 ? AMBER : NOISE} opacity={1 - tt * 0.4} />
                                    );
                                })}
                            </g>
                        )}
                    </g>
                ))}
                {/* 答え札：足した粒だけ分離してアンバーに光る */}
                <g transform={`translate(${stageX(2)},${ROW_Y - 150 - ansT * 40})`} opacity={ansT}>
                    <rect x={-78} y={-34} width={156} height={68} rx={14}
                        fill="#fff" stroke={AMBER} strokeWidth={3} filter="url(#soft)" />
                    {Array.from({ length: 7 }, (_, k) => (
                        <circle key={k} cx={-54 + k * 18} cy={(rnd(k, 77) - 0.5) * 26} r={6} fill={AMBER} />
                    ))}
                </g>
            </g>
            {/* モデル箱：一層だけノイズを取る */}
            <g opacity={prog(f, step + 4, 24) * (1 - prog(f, chain + 130, 30))}>
                <RoleBox x={470} y={-130} w={180} h={120} label="モデル" />
                <Arrow x1={250} y1={-160} x2={380} y2={-150} t={prog(f, step + 20, 18)} color={SUB} w={4} />
                <Arrow x1={380} y1={-100} x2={260} y2={-80} t={prog(f, step + 40, 18)} color={MINT} w={4} />
            </g>
            {/* 一発で当てようとする大矢印 → ぼやけた平均 */}
            {bigOut > 0.01 && bigT > 0.01 && (
                <g opacity={bigT * bigOut}>
                    <Arrow x1={-180} y1={120} x2={520} y2={300} t={bigT} color={SUB} w={9} />
                    <g transform="translate(640,330) scale(0.55)" opacity={bigT}>
                        <rect x={-120} y={-120} width={240} height={240} rx={16}
                            fill="#dde3ec" stroke={CARD_LINE} strokeWidth={2} />
                        <ellipse cx={0} cy={0} rx={70} ry={80} fill="#c2cbd9" filter="url(#blurry)" />
                    </g>
                    <line x1={560} y1={250} x2={720} y2={410} stroke={RED} strokeWidth={7} strokeLinecap="round" opacity={bigT > 0.8 ? 1 : 0} />
                    <line x1={720} y1={250} x2={560} y2={410} stroke={RED} strokeWidth={7} strokeLinecap="round" opacity={bigT > 0.8 ? 1 : 0} />
                </g>
            )}
            {/* 主役のノイズ雲（潜在タイル） */}
            <g opacity={mainIn * (0.35 + 0.65 * main.dim)}>
                <CatTile x={0} y={main.y} s={main.s} noise={main.noise} seed={9} />
            </g>
            {/* 小さな矢印の連なり：少しずつマシへ。言葉が来ると向きが曲がる */}
            {f > chain && (
                <g opacity={prog(f, chain + 6, 20) * (1 - chipsIn * 0.7)}>
                    {Array.from({ length: N_ARROWS }, (_, i) => (
                        <Arrow key={i}
                            x1={-330 + i * 140} y1={210} x2={-330 + i * 140 + 92} y2={210}
                            t={prog(f, chain + 10 + i * 22, 18)}
                            color={guideT > 0.2 ? MINT : INK} w={5}
                            bend={-10 * guideT} />
                    ))}
                </g>
            )}
            {/* プロンプト札と目的地マーカーが戻り、毎歩を導く */}
            <g opacity={pcIn * (1 - chipsIn * 0.7)}>
                <PromptCard x={PC.x} y={PC.y} s={0.82} text="赤い靴を履いた猫" w={430} />
                <Pin x={PC.x + 250} y={PC.y + 10} s={0.8} o={pcIn} ring={prog(f, guide + 20, 50)} />
                <line x1={PC.x + 250} y1={PC.y + 20} x2={PC.x + 250 + (-300 - (PC.x + 250)) * guideT}
                    y2={PC.y + 20 + (195 - (PC.y + 20)) * guideT}
                    stroke={MINT} strokeWidth={4} strokeDasharray="12 10" opacity={0.8} />
            </g>
            {/* 次の問題：属性の札だけが前面に残る */}
            <g opacity={chipsIn}>
                <g transform={`translate(-130,${40 - chipsIn * 20})`}>
                    <rect x={-60} y={-60} width={120} height={120} rx={18} fill={RED} filter="url(#soft)" />
                </g>
                <g transform={`translate(130,${40 - chipsIn * 20})`}>
                    <circle cx={0} cy={0} r={62} fill={BLUE} filter="url(#soft)" />
                </g>
                <Tag x={-130} y={150} text="赤い？" o={chipsIn} color={RED} />
                <Tag x={130} y={150} text="青い？" o={chipsIn} color={BLUE} />
            </g>
        </g>
    );
};

// ---------- 画面 5: binding ----------
// 単語を知っていても、対象・属性・位置を正しい相手へ結びつけ損ねると絵が崩れる
const SceneBinding: React.FC<{ f: number; o: number }> = ({ f, o }) => {
    const s5 = ev('scene.binding.in');
    const tags = ev('binding.tags');
    const xattn = ev('binding.cross_attention');
    const focus = ev('binding.local_focus');
    const swap = ev('binding.swap_fail');
    const fingers = ev('binding.text_fingers');
    const answer = ev('binding.answer');
    const tip = ev('binding.prompt_tip');

    // 冒頭：左右の犬猫と、入れ替わる位置札
    const introO = prog(f, s5 + 6, 24) * (1 - prog(f, xattn - 20, 20));
    const swapT = resolve<{ t: number }>([
        { f: s5 + 30, state: { t: 0 } },     // 札が逆に付いている
        { f: s5 + 80, state: { t: 0 } },
        { f: s5 + 110, state: { t: 1 } },    // 入れ替わって正しい位置へ
    ], f).t;

    // 中心：作りかけの画像タイルと単語タグ
    const TILE = { x: 0, y: -90, s: 1.3 };
    const tileIn = prog(f, xattn + 4, 28);
    const tagRowIn = prog(f, tags + 6, 26);
    const jp2en = prog(f, xattn + 20, 26); // 日本語タグ → 英語タグ
    const TAGX = [-260, 0, 260];
    const TAG_Y = -355;

    // 領域アンカー（タイルのローカル座標 → 画面座標）
    const at = (lx: number, ly: number) => ({ x: TILE.x + lx * TILE.s, y: TILE.y + ly * TILE.s });
    const EAR = at(0, -78);
    const FEET = at(0, 92);
    const BGR = at(-86, -86);
    const REGIONS = [
        { p: EAR, tag: 1 },  // 耳 → cat
        { p: FEET, tag: 0 }, // 足元 → red shoes
        { p: BGR, tag: 2 },  // 背景 → ramen shop
    ];
    const linesT = prog(f, xattn + 40, 36);
    // 順番に光る（一度ずつ）
    const glow = (i: number) => {
        const t = prog(f, focus + 10 + i * 50, 40);
        return t > 0 && t < 1 ? Math.sin(t * Math.PI) : 0;
    };

    // 失敗例：色札が誤った対象へ飛ぶ
    const swapIn = prog(f, swap + 6, 24) * (1 - prog(f, tip - 16, 16));
    const flyT = prog(f, swap + 30, 36);
    const CUBE = { x: -440, y: 150 };
    const SPH = { x: -200, y: 150 };

    // 看板文字と手：細部だけ赤く崩れる
    const signIn = prog(f, fingers + 6, 24) * (1 - prog(f, answer - 16, 16));
    const shake = (() => {
        const t = prog(f, fingers + 26, 30);
        return t > 0 && t < 1 ? Math.sin(t * Math.PI * 4) * (1 - t) * 3 : 0;
    })();

    // 二択 → 後者にチェック
    const ansIn = prog(f, answer + 6, 24) * (1 - prog(f, tip - 16, 16));
    const checkT = prog(f, answer + 50, 24);

    // 工夫：タグが対象の近くへ整理され、線がほどける
    const tipT = prog(f, tip + 10, 44);
    const tagPos = (i: number) => {
        // 整理後の位置：red shoes→足元横 / cat→頭横 / ramen shop→背景角
        const organized = [
            { x: FEET.x + 250, y: FEET.y },
            { x: EAR.x + 260, y: EAR.y - 20 },
            { x: BGR.x - 240, y: BGR.y - 30 },
        ][i];
        return {
            x: TAGX[i] + (organized.x - TAGX[i]) * tipT,
            y: TAG_Y + (organized.y - TAG_Y) * tipT,
        };
    };
    const TAG_DEFS = [
        { jp: '赤い', en: 'red shoes', color: RED },
        { jp: '猫', en: 'cat', color: INK },
        { jp: '靴', en: 'ramen shop', color: SUB },
    ];

    return (
        <g opacity={o}>
            {/* 冒頭の犬猫と位置札 */}
            {introO > 0.01 && (
                <g opacity={introO}>
                    {/* 猫（左） */}
                    <g transform="translate(-350,-40)">
                        <circle cx={0} cy={10} r={70} fill="#9aa5b6" />
                        <path d="M -56 -30 L -44 -86 L -16 -44 Z" fill="#9aa5b6" />
                        <path d="M 56 -30 L 44 -86 L 16 -44 Z" fill="#9aa5b6" />
                        <circle cx={-22} cy={0} r={6} fill={INK} />
                        <circle cx={22} cy={0} r={6} fill={INK} />
                    </g>
                    {/* 犬（右） */}
                    <g transform="translate(350,-40)">
                        <circle cx={0} cy={10} r={70} fill="#c9b291" />
                        <path d="M -62 -36 Q -78 18 -50 30 L -40 -30 Z" fill="#b89f7d" />
                        <path d="M 62 -36 Q 78 18 50 30 L 40 -30 Z" fill="#b89f7d" />
                        <circle cx={-22} cy={0} r={6} fill={INK} />
                        <circle cx={22} cy={0} r={6} fill={INK} />
                        <ellipse cx={0} cy={26} rx={12} ry={9} fill={INK} />
                    </g>
                    {/* 入れ替わる名札（最初は逆） */}
                    <Tag x={-350 + 700 * (1 - swapT)} y={-210} text="猫" color={INK} />
                    <Tag x={350 - 700 * (1 - swapT)} y={-210} text="犬" color={INK} />
                </g>
            )}
            {/* 作りかけの画像タイル */}
            <CatTile x={TILE.x} y={TILE.y} s={TILE.s} o={tileIn} noise={0.18} />
            {/* 単語タグの列（日本語 → 英語へ差し替わる） */}
            {TAG_DEFS.map((td, i) => {
                const p = tagPos(i);
                return (
                    <g key={i}>
                        <Tag x={p.x} y={p.y} text={td.jp} color={td.color}
                            o={tagRowIn * (1 - jp2en)} />
                        <Tag x={p.x} y={p.y} text={td.en} color={td.color}
                            o={tagRowIn * jp2en * (glow(i) > 0.1 ? 1 : 0.92)} />
                        {/* 束ねる線：タグ → 領域 */}
                        {jp2en > 0.5 && (
                            <line x1={p.x} y1={p.y + 28}
                                x2={p.x + (REGIONS.find((r) => r.tag === i)!.p.x - p.x) * linesT}
                                y2={p.y + 28 + (REGIONS.find((r) => r.tag === i)!.p.y - p.y - 28) * linesT}
                                stroke={td.color} strokeWidth={3}
                                strokeDasharray={tipT > 0.5 ? 'none' : '8 8'}
                                opacity={0.35 + glow(i) * 0.65} />
                        )}
                    </g>
                );
            })}
            {/* 領域の輪（順に光る） */}
            {REGIONS.map((r, i) => (
                <circle key={i} cx={r.p.x} cy={r.p.y} r={34 + glow(r.tag) * 8}
                    fill="none" stroke={MINT} strokeWidth={4}
                    opacity={linesT * (0.25 + glow(r.tag) * 0.75)} />
            ))}
            {/* 束ね損ねの失敗例 */}
            {swapIn > 0.01 && (
                <g opacity={swapIn}>
                    <rect x={CUBE.x - 48} y={CUBE.y - 48} width={96} height={96} rx={12}
                        fill={flyT > 0.6 ? BLUE : '#dfe5ee'} stroke={CARD_LINE} strokeWidth={2} />
                    <circle cx={SPH.x} cy={SPH.y} r={50}
                        fill={flyT > 0.6 ? RED : '#dfe5ee'} stroke={CARD_LINE} strokeWidth={2} />
                    {/* 色札が交差して誤着 */}
                    {flyT > 0 && flyT < 1 && (
                        <g>
                            <circle cx={CUBE.x + (SPH.x - CUBE.x) * flyT} cy={CUBE.y - 120 + 120 * flyT} r={16} fill={RED} />
                            <circle cx={SPH.x + (CUBE.x - SPH.x) * flyT} cy={SPH.y - 120 + 120 * flyT} r={16} fill={BLUE} />
                        </g>
                    )}
                    <g opacity={flyT > 0.8 ? 1 : 0}>
                        <line x1={CUBE.x - 150} y1={CUBE.y - 90} x2={CUBE.x - 110} y2={CUBE.y - 50} stroke={RED} strokeWidth={6} strokeLinecap="round" />
                        <line x1={CUBE.x - 110} y1={CUBE.y - 90} x2={CUBE.x - 150} y2={CUBE.y - 50} stroke={RED} strokeWidth={6} strokeLinecap="round" />
                    </g>
                </g>
            )}
            {/* 看板文字と手：細部が赤く崩れる */}
            {signIn > 0.01 && (
                <g transform={`translate(420,160) rotate(${shake})`} opacity={signIn}>
                    <rect x={-170} y={-70} width={340} height={140} rx={14}
                        fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
                    {/* 看板の字画（いくつかだけズレて赤い） */}
                    <g strokeWidth={6} strokeLinecap="round" fill="none">
                        <path d="M -130 -28 H -70 M -100 -28 V 30" stroke={INK} />
                        <path d="M -40 -30 V 28 M -40 0 H 6" stroke={INK} />
                        <path d="M 36 -26 H 96 M 44 4 L 102 14" stroke={RED} transform="rotate(8 66 -6)" />
                        <path d="M 120 -24 L 148 30" stroke={RED} transform="rotate(-12 134 4)" />
                    </g>
                    {/* 手：指が一本多い */}
                    <g transform="translate(0,108)">
                        <ellipse cx={0} cy={18} rx={52} ry={30} fill="#f0d9c0" />
                        {[-36, -18, 0, 18, 36].map((dx, i) => (
                            <rect key={i} x={dx - 7} y={-26} width={14} height={42} rx={7} fill="#f0d9c0" />
                        ))}
                        <rect x={48} y={-20} width={14} height={38} rx={7} fill={RED} opacity={0.85} />
                    </g>
                </g>
            )}
            {/* 二択：知らない？ 束ね損ねる？ */}
            {ansIn > 0.01 && (
                <g opacity={ansIn}>
                    <g opacity={1 - checkT * 0.65}>
                        <Paper x={-470} y={-300} w={300} h={110} />
                        <text x={-470} y={-288} fontSize={34} fontWeight={800} fill={INK} textAnchor="middle">知らない</text>
                    </g>
                    <Paper x={-470} y={-150} w={300} h={110} />
                    <text x={-490} y={-138} fontSize={34} fontWeight={800} fill={INK} textAnchor="middle">束ね損ね</text>
                    <path d={`M -370 -160 l ${14 * checkT} ${16 * checkT} l ${26 * checkT} ${-34 * checkT}`}
                        fill="none" stroke={MINT} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
                </g>
            )}
        </g>
    );
};

// ---------- 画面 6: editing ----------
// 一枚の画像を会話で直す流れへ変わり、欲しい箇所だけを制御する道具になる
const SceneEditing: React.FC<{ f: number; o: number }> = ({ f, o }) => {
    const s6 = ev('scene.editing.in');
    const chat = ev('editing.chat');
    const ctx = ev('editing.context');
    const mask = ev('editing.mask_area');
    const ctrl = ev('editing.control');
    const limits = ev('editing.limits');
    const verify = ev('editing.verify');

    const TILE = { x: 40, y: -60, s: 1.25 };
    const tileIn = prog(f, s6 + 4, 26);

    // 単発ガチャ：サイコロと外れカード
    const diceO = prog(f, s6 + 4, 24) * (1 - prog(f, ctrl + 6, 26));
    const missT = (i: number) => prog(f, s6 + 40 + i * 26, 44);

    // 会話チップ → 文脈束
    const chatIn = prog(f, chat + 6, 26);
    const ctxT = prog(f, ctx + 10, 40);
    const ITEMS = [
        { y0: -300 }, { y0: -150 }, { y0: 0 },
    ];
    const itemY = (i: number) => ITEMS[i].y0 + (-160 + i * 92 - ITEMS[i].y0) * ctxT;
    const ITEM_X = -480;

    // 背景だけ昼へ：マスクとピン
    const maskT = prog(f, mask + 10, 44);
    const hatchO = (() => {
        const t = prog(f, mask + 4, 70);
        return t > 0 && t < 1 ? Math.sin(t * Math.PI) : 0;
    })();

    // 制御：つまみパネル
    const ctrlIn = prog(f, ctrl + 10, 28);
    const knobT = prog(f, ctrl + 40, 30);
    const PANEL = { x: 520, y: -160 };

    // 制約チェックと確認印
    const limIn = prog(f, limits + 8, 26);
    const verIn = prog(f, verify + 8, 26);

    // タイル背景の昼夜（夜＝暗い被せが剥がれる）
    const bgTop = { x: TILE.x - 110 * TILE.s, y: TILE.y - 110 * TILE.s, w: 220 * TILE.s, h: 220 * TILE.s * 0.58 };

    return (
        <g opacity={o}>
            {/* サイコロ（単発ガチャ） */}
            {diceO > 0.01 && (
                <g transform="translate(-440,-80)" opacity={diceO}>
                    <rect x={-62} y={-62} width={124} height={124} rx={22}
                        fill="#fff" stroke={INK} strokeWidth={3.5} filter="url(#soft)" />
                    {[[-26, -26], [26, -26], [0, 0], [-26, 26], [26, 26]].map(([dx, dy], i) => (
                        <circle key={i} cx={dx} cy={dy} r={9} fill={INK} />
                    ))}
                </g>
            )}
            {/* 外れカードが横へ流れる */}
            {[0, 1].map((i) => {
                const t = missT(i);
                if (t <= 0 || t >= 1) return null;
                return (
                    <g key={i} opacity={(1 - t) * 0.7}>
                        <CatTile x={TILE.x + 60 + t * 480} y={TILE.y - 20 + i * 40} s={0.6}
                            noise={0.45 + i * 0.2} seed={20 + i} />
                    </g>
                );
            })}
            {/* 編集対象の画像カード */}
            <CatTile x={TILE.x} y={TILE.y} s={TILE.s} o={tileIn} noise={0} />
            {/* 夜の被せ：マスク修正で背景だけ昼になる */}
            <rect x={bgTop.x + 10} y={bgTop.y + 10} width={bgTop.w - 20} height={bgTop.h}
                rx={12} fill="#3c4a63" opacity={tileIn * 0.55 * (1 - maskT)} />
            {/* マスクの斜線（修正の間だけ） */}
            {hatchO > 0.01 && (
                <g opacity={hatchO}>
                    {Array.from({ length: 8 }, (_, i) => (
                        <line key={i}
                            x1={bgTop.x + 14 + i * 36} y1={bgTop.y + 8}
                            x2={bgTop.x - 14 + i * 36} y2={bgTop.y + bgTop.h + 8}
                            stroke={MINT} strokeWidth={4} opacity={0.7} />
                    ))}
                    <rect x={bgTop.x + 8} y={bgTop.y + 8} width={bgTop.w - 16} height={bgTop.h}
                        rx={12} fill="none" stroke={MINT} strokeWidth={4} strokeDasharray="10 8" />
                </g>
            )}
            {/* キャラ固定ピン */}
            <Pin x={TILE.x} y={TILE.y - 58} s={0.55} o={maskT} ring={prog(f, mask + 30, 50)} />
            {/* 会話で直す：吹き出し・参照画像・修正指示 → 一つの文脈束 */}
            <g opacity={chatIn}>
                {/* 吹き出し */}
                <g transform={`translate(${ITEM_X},${itemY(0)})`}>
                    <rect x={-110} y={-44} width={220} height={88} rx={20}
                        fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
                    <path d={`M 96 30 L 130 58 L 86 44 Z`} fill="#fff" stroke={CARD_LINE} strokeWidth={2} />
                    <line x1={-80} y1={-12} x2={70} y2={-12} stroke={SUB} strokeWidth={7} strokeLinecap="round" opacity={0.6} />
                    <line x1={-80} y1={14} x2={20} y2={14} stroke={SUB} strokeWidth={7} strokeLinecap="round" opacity={0.6} />
                </g>
                {/* 参照画像チップ */}
                <g transform={`translate(${ITEM_X},${itemY(1)})`} opacity={prog(f, ctx + 4, 20)}>
                    <rect x={-64} y={-44} width={128} height={88} rx={14}
                        fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
                    <circle cx={-22} cy={-8} r={13} fill="#e8b06a" />
                    <path d="M -48 28 L -14 -2 L 12 22 L 30 8 L 52 28 Z" fill="#9aa5b6" />
                </g>
                {/* 修正指示チップ（鉛筆） */}
                <g transform={`translate(${ITEM_X},${itemY(2)})`} opacity={prog(f, ctx + 14, 20)}>
                    <rect x={-64} y={-40} width={128} height={80} rx={14}
                        fill="#fff" stroke={CARD_LINE} strokeWidth={2} filter="url(#soft)" />
                    <path d="M -28 22 L 18 -24 L 32 -10 L -14 36 L -32 40 Z" fill={AMBER} stroke={INK} strokeWidth={2} />
                </g>
                {/* 束ねる枠 */}
                <rect x={ITEM_X - 140} y={-160 - 70} width={280} height={92 * 2 + 150}
                    rx={26} fill="none" stroke={MINT} strokeWidth={4}
                    strokeDasharray="14 10" opacity={ctxT} />
                <Arrow x1={ITEM_X + 150} y1={-60} x2={TILE.x - 170} y2={TILE.y + 10}
                    t={prog(f, ctx + 40, 24)} color={MINT} w={4} />
            </g>
            {/* 制御パネル：サイコロの代わりにつまみ */}
            <g opacity={ctrlIn}>
                <Paper x={PANEL.x} y={PANEL.y} w={300} h={220} />
                <Pin x={PANEL.x} y={PANEL.y - 36} s={0.6} o={ctrlIn} />
                {[0, 1].map((i) => (
                    <g key={i}>
                        <line x1={PANEL.x - 110} y1={PANEL.y + 30 + i * 52} x2={PANEL.x + 110} y2={PANEL.y + 30 + i * 52}
                            stroke={CARD_LINE} strokeWidth={8} strokeLinecap="round" />
                        <circle cx={PANEL.x - 60 + (i === 0 ? knobT * 120 : 40)} cy={PANEL.y + 30 + i * 52}
                            r={16} fill={MINT} />
                    </g>
                ))}
                <Arrow x1={PANEL.x - 150} y1={PANEL.y + 40} x2={TILE.x + 170} y2={TILE.y - 20}
                    t={ctrlIn} color={MINT} w={4} />
            </g>
            {/* 制約チェック（いくつかは警告のまま） */}
            <g opacity={limIn}>
                {[0, 1, 2].map((i) => {
                    const warn = i > 0;
                    const x = -200 + i * 200;
                    return (
                        <g key={i} transform={`translate(${x},-400)`} opacity={prog(f, limits + 8 + i * 12, 18)}>
                            <rect x={-80} y={-40} width={160} height={80} rx={16}
                                fill="#fff" stroke={warn ? AMBER : MINT} strokeWidth={3.5} filter="url(#soft)" />
                            {warn ? (
                                <g stroke={AMBER} strokeWidth={7} strokeLinecap="round">
                                    <line x1={0} y1={-20} x2={0} y2={8} />
                                    <circle cx={0} cy={24} r={4.5} fill={AMBER} stroke="none" />
                                </g>
                            ) : (
                                <path d="M -18 0 L -4 14 L 20 -16" fill="none" stroke={MINT} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </g>
                    );
                })}
            </g>
            {/* 出典・確認印（見た目と別レイヤーで照合） */}
            <g opacity={verIn}>
                <Paper x={520} y={120} w={250} h={160} />
                <line x1={460} y1={84} x2={580} y2={84} stroke={SUB} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
                <line x1={460} y1={112} x2={560} y2={112} stroke={SUB} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
                <circle cx={560} cy={160} r={30} fill="none" stroke={MINT} strokeWidth={5} />
                <path d="M 546 160 L 556 170 L 576 146" fill="none" stroke={MINT} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
                <line x1={TILE.x + 180} y1={TILE.y + 60} x2={395} y2={110}
                    stroke={SUB} strokeWidth={3.5} strokeDasharray="10 9" opacity={verIn} />
            </g>
        </g>
    );
};

// ---------- 画面 7: outro ----------
// 地図、潜在作業台、小さな修正を一つに重ね、自然な見た目と現実の正しさを分けて終える
const SceneOutro: React.FC<{ f: number; o: number }> = ({ f, o }) => {
    const s7 = ev('scene.outro.in');
    const rmap = ev('outro.recap_map');
    const rwork = ev('outro.recap_workspace');
    const rsteps = ev('outro.recap_steps');
    const rbind = ev('outro.binding');
    const rsplit = ev('outro.truth_split');
    const rfinal = ev('outro.final');

    const MAPP = { x: -560, y: -160, w: 340, h: 260 };
    const BENCH = { x: 0, y: 120, w: 430, h: 170 };
    const TILE = { x: 560, y: -120, s: 1.0 };

    const introIn = prog(f, s7 + 6, 28);
    // 最初の違和感に戻る：掴みの「それっぽい絵」が戻り、作業場が立つ前に退場
    const hookBook = prog(f, s7 + 6, 26) * (1 - prog(f, rwork - 4, 24));
    // プロンプト札：中央上 → 地図上のマーカーへ
    const cardT = prog(f, rmap + 10, 44);
    const mapIn = prog(f, rmap + 4, 30);
    const benchIn = prog(f, rwork + 8, 30);
    // ノイズ雲：作業場で立ち上がり → 作業台 → 画像へ畳まれる
    const cloud = resolve<{ x: number; y: number; r: number; fade: number }>([
        { f: s7, state: { x: 120, y: -110, r: 96, fade: 0 } },
        { f: rwork, state: { x: 120, y: -110, r: 96, fade: 0 } },
        { f: rwork + 24, state: { x: 120, y: -120, r: 96, fade: 1 } },
        { f: rwork + 54, state: { x: BENCH.x, y: BENCH.y - 70, r: 80, fade: 1 } },
        { f: rsteps + 20, state: { x: BENCH.x, y: BENCH.y - 70, r: 80, fade: 1 } },
        { f: rsteps + 70, state: { x: TILE.x, y: TILE.y, r: 50, fade: 0 } },
    ], f);
    const stepsT = prog(f, rsteps + 14, 40);
    const tileNoise = 1 - prog(f, rsteps + 40, 50);
    const tileIn = prog(f, rsteps + 30, 30);

    const bindIn = prog(f, rbind + 10, 30);
    const at = (lx: number, ly: number) => ({ x: TILE.x + lx * TILE.s, y: TILE.y + ly * TILE.s });
    const BIND_TAGS = [
        { text: '赤', color: RED, tx: TILE.x - 230, ty: TILE.y + 90, p: at(-22, 92) },
        { text: '靴', color: INK, tx: TILE.x - 230, ty: TILE.y + 170, p: at(22, 92) },
        { text: '猫', color: INK, tx: TILE.x - 230, ty: TILE.y + 10, p: at(0, -32) },
    ];

    // 見た目の面と正しさの面
    const splitT = prog(f, rsplit + 12, 40);
    const finalT = prog(f, rfinal + 10, 44);

    return (
        <g opacity={o}>
            {/* プロンプト札（中央上） → 地図の目的地 */}
            <g opacity={introIn}>
                <PromptCard
                    x={0 + (MAPP.x - 0) * cardT}
                    y={-400 + (MAPP.y - 40 - -400) * cardT}
                    s={1 - 0.55 * cardT}
                    o={1 - cardT}
                    text="白い猫、宇宙服、ラーメン屋" w={500} />
            </g>
            {/* 地図 */}
            <g opacity={mapIn}>
                <Paper x={MAPP.x} y={MAPP.y} w={MAPP.w} h={MAPP.h} rx={20} />
                <path d={`M ${MAPP.x - 130} ${MAPP.y + 60} Q ${MAPP.x - 40} ${MAPP.y - 40} ${MAPP.x + 80} ${MAPP.y - 10}`}
                    fill="none" stroke={MINT_SOFT} strokeWidth={5} />
                <line x1={MAPP.x - MAPP.w / 2 + 14} y1={MAPP.y} x2={MAPP.x + MAPP.w / 2 - 14} y2={MAPP.y}
                    stroke="rgba(36,48,68,0.06)" strokeWidth={2} />
                <line x1={MAPP.x} y1={MAPP.y - MAPP.h / 2 + 14} x2={MAPP.x} y2={MAPP.y + MAPP.h / 2 - 14}
                    stroke="rgba(36,48,68,0.06)" strokeWidth={2} />
                <Pin x={MAPP.x + 30} y={MAPP.y + 10} s={0.75 * cardT} o={cardT}
                    ring={prog(f, rmap + 44, 50)} />
            </g>
            {/* 掴みの結果像が戻る（最初の違和感） */}
            {hookBook > 0.01 && <HookTile x={120} y={-110} s={1.0} o={hookBook} seed={2} />}
            {/* 潜在作業台 */}
            <Workbench x={BENCH.x} y={BENCH.y} w={BENCH.w} h={BENCH.h} o={benchIn} />
            {/* ノイズ雲 */}
            {cloud.fade > 0.01 && (
                <NoiseBall cx={cloud.x} cy={cloud.y} r={cloud.r} n={56} seed={6} o={cloud.fade * introIn} />
            )}
            {/* 小さな修正の列：作業台 → 画像へ */}
            {stepsT > 0.01 && (
                <g>
                    {[0, 1, 2].map((i) => (
                        <Arrow key={i}
                            x1={BENCH.x + 120 + i * 110} y1={BENCH.y - 60 - i * 50}
                            x2={BENCH.x + 200 + i * 110} y2={BENCH.y - 95 - i * 50}
                            t={prog(f, rsteps + 14 + i * 16, 18)} color={MINT} w={5} />
                    ))}
                </g>
            )}
            {/* 完成画像（見た目の面と正しさの面に割れる） */}
            {tileIn > 0.01 && (
                <g>
                    {/* 正しさの面（奥・輪郭だけ） */}
                    <g transform={`translate(${TILE.x + 36 * splitT},${TILE.y + 30 * splitT})`}
                        opacity={splitT * (1 - finalT * 0.5)}>
                        <rect x={-120} y={-120} width={240} height={240} rx={16}
                            fill="#eef1f6" stroke={SUB} strokeWidth={3} strokeDasharray="12 9" />
                        <text x={0} y={16} fontSize={44} fontWeight={900} fill={SUB} textAnchor="middle">?</text>
                        <Tag x={0} y={160} text="正しさ" color={SUB} fontSize={28} />
                    </g>
                    {/* 見た目の面（手前） */}
                    <g transform={`translate(${-36 * splitT},${-26 * splitT})`}>
                        <CatTile x={TILE.x} y={TILE.y} s={TILE.s} o={tileIn} noise={tileNoise} seed={11} />
                        {splitT > 0.2 && <Tag x={TILE.x} y={TILE.y - 170} text="見た目" color={INK} o={splitT} fontSize={28} />}
                    </g>
                </g>
            )}
            {/* 赤・靴・猫が正しい部位へ結ばれる */}
            {bindIn > 0.01 && splitT < 0.5 && (
                <g opacity={bindIn * (1 - splitT * 2)}>
                    {BIND_TAGS.map((b, i) => (
                        <g key={i}>
                            <Tag x={b.tx} y={b.ty} text={b.text} color={b.color} s={0.85}
                                o={prog(f, rbind + 10 + i * 14, 18)} />
                            <line x1={b.tx + 40} y1={b.ty}
                                x2={b.tx + 40 + (b.p.x - b.tx - 40) * prog(f, rbind + 24 + i * 14, 20)}
                                y2={b.ty + (b.p.y - b.ty) * prog(f, rbind + 24 + i * 14, 20)}
                                stroke={b.color} strokeWidth={3} opacity={0.8} />
                        </g>
                    ))}
                </g>
            )}
            {/* 締め：目的地 → 作業台 → 画像が一直線に重なる */}
            {finalT > 0.01 && (
                <g opacity={finalT}>
                    <path d={`M ${MAPP.x + 30} ${MAPP.y + 30} Q ${BENCH.x - 100} ${BENCH.y - 90} ${BENCH.x} ${BENCH.y - 40}
                        Q ${BENCH.x + 160} ${BENCH.y + 10} ${TILE.x - 36 * splitT - 60} ${TILE.y - 26 * splitT + 60}`}
                        fill="none" stroke={MINT} strokeWidth={5}
                        strokeDasharray="1100"
                        strokeDashoffset={1100 * (1 - finalT)} />
                </g>
            )}
        </g>
    );
};

// ---------- 画面切替・見出し ----------
const SCENES = [
    { key: 'intro', title: '文章から、なぜ絵が出るのか' },
    { key: 'prompt_map', title: 'プロンプトは命令書ではなく目的地' },
    { key: 'latent', title: '絵は最初からピクセルで描かない' },
    { key: 'denoise', title: '砂嵐を一歩ずつ絵らしいほうへ' },
    { key: 'binding', title: '言葉は効くが、くっつけ方で失敗する' },
    { key: 'editing', title: '単発ガチャから編集の道具へ' },
    { key: 'outro', title: '地図と作業場と小さな修正' },
] as const;

const XFADE = 18;
const sceneVis = (i: number, f: number): number => {
    const vin = i === 0 ? 1 : prog(f, ev(`scene.${SCENES[i].key}.in`), XFADE);
    const vout = i === SCENES.length - 1 ? 0 : prog(f, ev(`scene.${SCENES[i + 1].key}.in`), XFADE);
    return vin * (1 - vout);
};

// ---------- 仕上げ：見出し・床・立ち絵・字幕（HTML オーバーレイ） ----------

const Header: React.FC<{ frame: number }> = ({ frame }) => (
    <>
        {SCENES.map((s, i) => {
            const o = sceneVis(i, frame);
            if (o <= 0.01) return null;
            return (
                <div key={s.key} style={{
                    position: 'absolute', left: 40, top: 34, zIndex: 10, opacity: o * 0.8,
                    background: 'rgba(255,255,255,0.78)', border: '4px solid #ff4281', borderRadius: 16,
                    padding: '8px 22px', fontFamily,
                }}>
                    <span style={{
                        fontSize: 32, fontWeight: 900, color: '#fff',
                        WebkitTextStroke: '4px #ff4281', paintOrder: 'stroke fill',
                    } as React.CSSProperties}>{s.title}</span>
                </div>
            );
        })}
    </>
);

const Floor: React.FC = () => (
    <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 300, zIndex: 15,
        background: 'linear-gradient(to top, rgba(205,214,228,0.85), rgba(205,214,228,0))',
        pointerEvents: 'none',
    }} />
);

// いまの行（字幕・口パク・表情の共通計算）
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

const VARIANTS = ['default', 'normal2', 'normal3', 'normal4'] as const;
const CHAR_DIR: Record<Speaker, string> = { ずんだもん: 'zundamon', めたん: 'metan' };

const charSrc = (sp: Speaker, f: number, speaking: boolean): string => {
    const v = VARIANTS[lastLineOf(f, sp) % VARIANTS.length];
    const mouth = speaking && isMouthOpen(f) ? 'open' : 'close';
    return `characters/${CHAR_DIR[sp]}/${v}-${mouth}.png`;
};

const Characters: React.FC<{ frame: number }> = ({ frame: f }) => {
    const cur = SCRIPT[lineAt(f)].speaker;
    const base: React.CSSProperties = {
        position: 'absolute', width: 340, zIndex: 20,
        filter: 'drop-shadow(0 6px 20px rgba(17,24,39,.18))', pointerEvents: 'none',
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

const SPEAKER_COLOR: Record<Speaker, string> = { ずんだもん: '#22c55e', めたん: '#d6336c' };

const SubtitleCard: React.FC<{ frame: number }> = ({ frame }) => {
    const i = lineAt(frame);
    const line = SCRIPT[i];
    return (
        <div style={{
            position: 'absolute', left: 50, right: 50, bottom: 26, height: 200, zIndex: 25,
            background: 'rgba(255,255,255,0.96)', borderRadius: 30,
            border: '2px solid rgba(36,48,68,0.06)',
            boxShadow: '0 18px 50px rgba(36,48,68,0.16)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 90px', fontFamily,
        }}>
            <div style={{
                position: 'absolute', top: -24,
                ...(line.speaker === 'めたん' ? { left: 64 } : { right: 64 }),
                background: SPEAKER_COLOR[line.speaker], color: '#fff',
                fontSize: 26, fontWeight: 900, padding: '8px 28px', borderRadius: 999,
            }}>{line.speaker}</div>
            <div style={{
                fontSize: 48, fontWeight: 900, color: INK, textAlign: 'center', lineHeight: 1.42,
            }}>{line.text}</div>
        </div>
    );
};

// ---------- メイン ----------
export const ImageGeneration: React.FC = () => {
    const f = useCurrentFrame();
    return (
        <AbsoluteFill style={{ backgroundColor: BG }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080"
                style={{ position: 'absolute', fontFamily }}>
                <defs>
                    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#243044" floodOpacity="0.10" />
                    </filter>
                    <filter id="blurry">
                        <feGaussianBlur stdDeviation="9" />
                    </filter>
                </defs>
                {sceneVis(0, f) > 0.01 && <SceneIntro f={f} o={sceneVis(0, f)} />}
                {sceneVis(1, f) > 0.01 && <SceneMap f={f} o={sceneVis(1, f)} />}
                {sceneVis(2, f) > 0.01 && <SceneLatent f={f} o={sceneVis(2, f)} />}
                {sceneVis(3, f) > 0.01 && <SceneDenoise f={f} o={sceneVis(3, f)} />}
                {sceneVis(4, f) > 0.01 && <SceneBinding f={f} o={sceneVis(4, f)} />}
                {sceneVis(5, f) > 0.01 && <SceneEditing f={f} o={sceneVis(5, f)} />}
                {sceneVis(6, f) > 0.01 && <SceneOutro f={f} o={sceneVis(6, f)} />}
            </svg>
            <Header frame={f} />
            <Floor />
            <Characters frame={f} />
            <SubtitleCard frame={f} />
            <Audio src={staticFile(VOICE_SRC)} />
            <Audio src={staticFile('audio/bgm/340_long_BPM80.mp3')} volume={0.03} loop />
        </AbsoluteFill>
    );
};
