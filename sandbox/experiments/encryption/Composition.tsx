import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import { SCRIPT, lineAt, eventFrame, TOTAL_FRAMES as SCRIPT_TOTAL } from './scriptData';

export const TOTAL_FRAMES = SCRIPT_TOTAL;

const { fontFamily } = loadFont('normal', {
    weights: ['700', '900'],
    ignoreTooManyRequestsWarning: true,
});

// ---------------- 色言語(design_spec) ----------------
const BG = '#F5F7FA';
const INK = '#243044';
const PLAIN = '#6B7280';
const PLAIN_EDGE = '#C9D2DE';
const KEYC = '#C99022';
const NONCE = '#3A7CC4';
const MASKC = '#26A6B8';
const TAGC = '#3E9B5F';
const DANGER = '#CC4B3C';
const GREY = '#9AA4B2';
const LANE_BG = '#EBF0F6';
const GLOW = '#E8B14E';

// ---------------- トラック補間 ----------------
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

const mkTrack = <S extends Record<string, number>>(
    base: S,
    steps: Array<[number, Partial<S>]>,
): Track<S> => {
    let cur: S = { ...base };
    const kfs: Track<S> = [];
    for (const [f, patch] of steps) {
        cur = { ...cur, ...patch };
        kfs.push({ f, state: cur });
    }
    return kfs;
};

const E = eventFrame;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// 0..1 の進捗 t を n 個に分配(span ぶん開始をずらす)
const stag = (t: number, i: number, n: number, span = 0.5) => {
    const d = n <= 1 ? 0 : (i / (n - 1)) * span;
    return clamp01((t - d) / (1 - span));
};
const bell = (t: number) => Math.sin(Math.PI * clamp01(t));
const rnd = (n: number) => {
    const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
};
const bitsOf = (seed: number, n: number) =>
    Array.from({ length: n }, (_, i) => (rnd(seed * 977 + i * 131) > 0.5 ? 1 : 0));
const xorBits = (a: number[], b: number[]) => a.map((v, i) => v ^ b[i]);

const textW = (s: string, fs: number) =>
    Array.from(s).reduce((a, ch) => a + (ch.charCodeAt(0) > 0x2000 ? fs : fs * 0.62), 0);

// ---------------- 共有部品 ----------------
const tileX = (cx: number, n: number, i: number, size: number, gap: number) =>
    cx - (n * (size + gap) - gap) / 2 + i * (size + gap) + size / 2;

const BitRow: React.FC<{
    cx: number;
    cy: number;
    bits: number[];
    size?: number;
    gap?: number;
    o?: number;
    appear?: number; // 0..1 ずらし出現
    cipher?: number; // 0..1 平文タイル -> 暗号文タイル
    cipherBits?: number[]; // 暗号文側の値
    flip?: number; // 0..1 全タイル反転
    stripes?: Array<[number, number]>; // 規則性の淡い縞 [開始,終了)
    stripeO?: number;
    rings?: number[];
    ringO?: number;
    ringColor?: string;
    overlay?: Array<{ i: number; ch: string }>; // めくれ(文字タイル)
    overlayT?: number;
    danger?: number[]; // 赤反転タイル
    dangerO?: number;
}> = ({
    cx, cy, bits, size = 34, gap = 5, o = 1, appear = 1, cipher = 0, cipherBits,
    stripes = [], stripeO = 0, rings = [], ringO = 0, ringColor = GLOW,
    overlay = [], overlayT = 0, danger = [], dangerO = 0, flip = 0,
}) => {
    if (o <= 0.001) return null;
    const n = bits.length;
    const flipDip = 1 - 0.3 * bell(flip);
    return (
        <g opacity={o}>
            {stripeO > 0.001 &&
                stripes.map(([a, b], k) => {
                    const x1 = tileX(cx, n, a, size, gap) - size / 2 - 3;
                    const x2 = tileX(cx, n, b - 1, size, gap) + size / 2 + 3;
                    return (
                        <rect key={k} x={x1} y={cy - size / 2 - 7} width={x2 - x1} height={size + 14}
                            rx={10} fill="#D7E4F4" opacity={stripeO * 0.9} />
                    );
                })}
            {bits.map((v, i) => {
                const a = stag(appear, i, n, 0.55);
                if (a <= 0.001) return null;
                const x = tileX(cx, n, i, size, gap);
                const shown = flip > 0.5 ? 1 - v : v;
                const isC = cipher > 0.5;
                const value = isC && cipherBits ? cipherBits[i] : shown;
                const dgr = danger.includes(i) ? dangerO : 0;
                const ov = overlay.find((q) => q.i === i);
                const ovT = ov ? stag(overlayT, overlay.indexOf(ov), overlay.length, 0.5) : 0;
                return (
                    <g key={i} opacity={a} transform={`translate(${x}, ${cy}) scale(${0.7 + 0.3 * a}, ${(0.7 + 0.3 * a) * flipDip})`}>
                        <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={7}
                            fill="#fff" stroke={PLAIN_EDGE} strokeWidth={2} opacity={1 - cipher} />
                        <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={7}
                            fill={INK} opacity={cipher} />
                        {dgr > 0.001 && (
                            <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={7}
                                fill={DANGER} opacity={dgr} />
                        )}
                        <text y={size * 0.22} textAnchor="middle" fontSize={size * 0.58} fontWeight={700}
                            fontFamily={fontFamily}
                            fill={cipher > 0.5 || dgr > 0.5 ? '#fff' : PLAIN}>
                            {dgr > 0.5 ? 1 - value : value}
                        </text>
                        {ovT > 0.001 && ov && (
                            <g opacity={ovT}>
                                <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={7}
                                    fill="#fff" stroke={DANGER} strokeWidth={2.5} />
                                <text y={size * 0.24} textAnchor="middle" fontSize={size * 0.6}
                                    fontWeight={900} fontFamily={fontFamily} fill={INK}>{ov.ch}</text>
                            </g>
                        )}
                    </g>
                );
            })}
            {ringO > 0.001 &&
                rings.map((i) => (
                    <rect key={`r${i}`} x={tileX(cx, n, i, size, gap) - size / 2 - 5}
                        y={cy - size / 2 - 5} width={size + 10} height={size + 10} rx={9}
                        fill="none" stroke={ringColor} strokeWidth={4} opacity={ringO} />
                ))}
        </g>
    );
};

// 鍵ストリーム/マスク(シアンの帯)。anchor から dir 方向へ grow で伸びる
const MaskBand: React.FC<{
    x: number; y: number; w: number; h?: number; grow?: number; dir?: 1 | -1;
    o?: number; seed: number;
}> = ({ x, y, w, h = 26, grow = 1, dir = -1, o = 1, seed }) => {
    if (o <= 0.001 || grow <= 0.001) return null;
    const grown = w * grow;
    const x0 = dir === 1 ? x : x - grown;
    const ticks: React.ReactNode[] = [];
    for (let k = 0; (k + 0.5) * 26 < grown - 8; k++) {
        if (rnd(seed * 7 + k) < 0.42) continue;
        const tx = dir === 1 ? x + (k + 0.5) * 26 : x - (k + 0.5) * 26;
        ticks.push(
            <rect key={k} x={tx - 2.5} y={y - h / 2 + 6} width={5} height={h - 12} rx={2.5}
                fill="#fff" opacity={0.75} />,
        );
    }
    return (
        <g opacity={o}>
            <rect x={x0} y={y - h / 2} width={grown} height={h} rx={h / 2} fill={MASKC} opacity={0.92} />
            {ticks}
        </g>
    );
};

const KEY_BITS = [1, 0, 1, 1, 0, 1];
const KeyBundle: React.FC<{ cx: number; cy: number; o: number; s?: number }> = ({ cx, cy, o, s = 22 }) => {
    if (o <= 0.001) return null;
    const n = KEY_BITS.length;
    return (
        <g opacity={o}>
            <text x={cx - (n * (s + 4) - 4) / 2 - 16} y={cy + s * 0.28} textAnchor="end"
                fontSize={26} fontWeight={900} fontFamily={fontFamily} fill={KEYC}>鍵</text>
            {KEY_BITS.map((v, i) => (
                <g key={i} transform={`translate(${tileX(cx, n, i, s, 4)}, ${cy})`}>
                    <rect x={-s / 2} y={-s / 2} width={s} height={s} rx={5} fill={KEYC} />
                    <text y={s * 0.24} textAnchor="middle" fontSize={s * 0.62} fontWeight={700}
                        fontFamily={fontFamily} fill="#fff">{v}</text>
                </g>
            ))}
        </g>
    );
};

const NonceTag: React.FC<{
    cx: number; cy: number; num: string; o: number; dup?: number; w?: number;
}> = ({ cx, cy, num, o, dup = 0, w = 100 }) => {
    if (o <= 0.001) return null;
    return (
        <g opacity={o}>
            {dup > 0.001 && (
                <rect x={cx - w / 2 + 9} y={cy - 22 + 9} width={w} height={44} rx={10}
                    fill="none" stroke={DANGER} strokeWidth={3.5} opacity={dup} />
            )}
            <rect x={cx - w / 2} y={cy - 22} width={w} height={44} rx={10} fill={NONCE} />
            <text x={cx} y={cy + 9} textAnchor="middle" fontSize={26} fontWeight={900}
                fontFamily={fontFamily} fill="#fff">{num}</text>
            <text x={cx} y={cy - 32} textAnchor="middle" fontSize={19} fontWeight={700}
                fontFamily={fontFamily} fill={NONCE}>nonce</text>
        </g>
    );
};

const Gear: React.FC<{
    cx: number; cy: number; r: number; o: number; rot?: number; label?: string; sub?: string;
    scale?: number;
}> = ({ cx, cy, r, o, rot = 0, label = 'AES', sub, scale = 1 }) => {
    if (o <= 0.001) return null;
    return (
        <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity={o}>
            <g transform={`rotate(${rot})`}>
                {Array.from({ length: 12 }, (_, i) => (
                    <rect key={i} x={-r * 0.11} y={-r - r * 0.16} width={r * 0.22} height={r * 0.3}
                        rx={r * 0.06} fill={INK} transform={`rotate(${i * 30})`} />
                ))}
                <circle r={r} fill="#fff" stroke={INK} strokeWidth={5} />
            </g>
            <circle r={r * 0.62} fill="#EFF3F8" />
            <text y={sub ? -r * 0.02 : r * 0.14} textAnchor="middle" fontSize={r * 0.4}
                fontWeight={900} fontFamily={fontFamily} fill={INK}>{label}</text>
            {sub && (
                <text y={r * 0.36} textAnchor="middle" fontSize={r * 0.22} fontWeight={700}
                    fontFamily={fontFamily} fill={PLAIN}>{sub}</text>
            )}
        </g>
    );
};

const XorMark: React.FC<{ cx: number; cy: number; r?: number; o: number; color?: string }> = ({
    cx, cy, r = 24, o, color = INK,
}) => {
    if (o <= 0.001) return null;
    return (
        <g opacity={o} stroke={color} strokeWidth={4.5} fill="none">
            <circle cx={cx} cy={cy} r={r} />
            <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
            <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
        </g>
    );
};

// とがり上向き六角形の封印片
const hexPts = (r: number) =>
    [
        [0, -r], [0.866 * r, -0.5 * r], [0.866 * r, 0.5 * r],
        [0, r], [-0.866 * r, 0.5 * r], [-0.866 * r, -0.5 * r],
    ].map((p) => p.join(',')).join(' ');
const hexHalf = (r: number, side: 1 | -1) =>
    [[0, -r], [side * 0.866 * r, -0.5 * r], [side * 0.866 * r, 0.5 * r], [0, r]]
        .map((p) => p.join(',')).join(' ');

const TagSeal: React.FC<{ cx: number; cy: number; r?: number; o: number; crack?: number }> = ({
    cx, cy, r = 30, o, crack = 0,
}) => {
    if (o <= 0.001) return null;
    return (
        <g transform={`translate(${cx}, ${cy})`} opacity={o}>
            <g opacity={1 - crack}>
                <polygon points={hexPts(r)} fill={TAGC} />
                <circle r={r * 0.3} fill="none" stroke="#fff" strokeWidth={4} />
            </g>
            {crack > 0.001 && (
                <g opacity={crack}>
                    <polygon points={hexHalf(r, -1)} fill={DANGER}
                        transform={`translate(${-crack * 14}, ${crack * 4}) rotate(${-crack * 16})`} />
                    <polygon points={hexHalf(r, 1)} fill={DANGER}
                        transform={`translate(${crack * 14}, ${-crack * 3}) rotate(${crack * 12})`} />
                </g>
            )}
        </g>
    );
};

// 赤い手(上から押す)。press で下へ押し込む
const RedHand: React.FC<{ x: number; y: number; o: number; press?: number }> = ({ x, y, o, press = 0 }) => {
    if (o <= 0.001) return null;
    return (
        <g transform={`translate(${x}, ${y + press * 26})`} opacity={o} fill={DANGER}>
            <rect x={-28} y={-44} width={56} height={48} rx={20} />
            {[-25, -10, 5, 20].map((fx, i) => (
                <rect key={i} x={fx} y={-6 + (i === 0 || i === 3 ? -4 : 2)} width={12}
                    height={i === 0 || i === 3 ? 30 : 38} rx={6} />
            ))}
        </g>
    );
};

const Eye: React.FC<{ cx: number; cy: number; o: number }> = ({ cx, cy, o }) => {
    if (o <= 0.001) return null;
    return (
        <g opacity={o}>
            <path d={`M ${cx - 46} ${cy} Q ${cx} ${cy - 32} ${cx + 46} ${cy} Q ${cx} ${cy + 32} ${cx - 46} ${cy} Z`}
                fill="#fff" stroke={GREY} strokeWidth={4} />
            <circle cx={cx} cy={cy} r={10} fill={GREY} />
        </g>
    );
};

const Pill: React.FC<{
    cx: number; cy: number; text: string; o: number; color?: string; fs?: number; solid?: boolean;
}> = ({ cx, cy, text, o, color = INK, fs = 24, solid = false }) => {
    if (o <= 0.001) return null;
    const w = textW(text, fs) + fs * 1.4;
    const h = fs * 1.8;
    return (
        <g opacity={o}>
            <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2}
                fill={solid ? color : '#fff'} stroke={color} strokeWidth={3} />
            <text x={cx} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={900}
                fontFamily={fontFamily} fill={solid ? '#fff' : color}>{text}</text>
        </g>
    );
};

const DrawPath: React.FC<{
    d: string; t: number; stroke: string; sw?: number; o?: number; cap?: 'round' | 'butt';
}> = ({ d, t, stroke, sw = 4, o = 1, cap = 'round' }) => {
    if (o <= 0.001 || t <= 0.001) return null;
    return (
        <path d={d} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - t} fill="none"
            stroke={stroke} strokeWidth={sw} strokeLinecap={cap} opacity={o} />
    );
};

// ---------------- 見出し・字幕 ----------------
const Header: React.FC<{ title: string; o: number }> = ({ title, o }) => {
    if (o <= 0.001) return null;
    const w = textW(title, 40) + 76;
    return (
        <g opacity={o}>
            <rect x={-936} y={-518} width={w} height={76} rx={22} fill="#fff"
                stroke="#ff4281" strokeWidth={5} />
            <text x={-936 + w / 2} y={-518 + 52} textAnchor="middle" fontSize={40} fontWeight={900}
                fontFamily={fontFamily} fill="#fff" stroke="#ff4281" strokeWidth={5}
                paintOrder="stroke fill">{title}</text>
        </g>
    );
};

const SubtitleG: React.FC<{ f: number }> = ({ f }) => {
    const idx = lineAt(f);
    const { speaker, text } = SCRIPT[idx];
    const isZ = speaker === 'ずんだもん';
    return (
        <foreignObject x={-910} y={290} width={1820} height={250}>
            <div
                style={{
                    position: 'relative', marginTop: 24, height: 200, borderRadius: 30,
                    border: '2px solid rgba(36,48,68,0.06)', background: 'rgba(255,255,255,0.96)',
                    boxShadow: '0 18px 50px rgba(36,48,68,0.16)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '0 90px',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        position: 'absolute', top: -24, ...(isZ ? { right: 64 } : { left: 64 }),
                        background: isZ ? '#22c55e' : '#d6336c', color: '#fff', fontSize: 26,
                        fontWeight: 900, padding: '8px 28px', borderRadius: 999, fontFamily,
                    }}
                >
                    {speaker}
                </div>
                <div
                    style={{
                        fontSize: 48, fontWeight: 900, color: INK, textAlign: 'center',
                        lineHeight: 1.45, fontFamily,
                    }}
                >
                    {text}
                </div>
            </div>
        </foreignObject>
    );
};

// ================ 画面1 導入/ビットの関係 ================
const OK_BITS = [0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1]; // "OK"
const CIP_A = bitsOf(5, 16);

const S1 = {
    okO: 0, scrO: 0, scrLine: 0, oneM: 0, boxA: 0, bitsA: 0,
    flip: 0, arrT: 0, arrO: 0, keyA: 0, stripeA: 0, nameO: 0,
    ringP: 0, cipA: 0, scatO: 0, gearM: 0, rot: 0, dots1: 0,
    spaceO: 0, layers: 0, dots2: 0, cip2A: 0, fpG: 0,
};
const T1 = mkTrack(S1, [
    [0, {}],
    [26, { okO: 1 }],
    [E('intro.scramble'), {}],
    [E('intro.scramble') + 36, { scrO: 1, scrLine: 1 }],
    [E('intro.general'), {}],
    [E('intro.general') + 34, { oneM: 1, scrLine: 0, boxA: 1 }],
    [E('text.to.bits') + 4, {}],
    [E('text.to.bits') + 44, { okO: 0, bitsA: 1, scrO: 0, scrLine: 0 }],
    [E('naive.flip') + 6, {}],
    [E('naive.flip') + 32, { flip: 1 }],
    [E('naive.flip') + 46, {}],
    [E('naive.flip') + 78, { arrT: 1, arrO: 1 }],
    [E('naive.flip') + 94, {}],
    [E('naive.flip') + 124, { flip: 0 }],
    [E('key.in'), {}],
    [E('key.in') + 18, { arrO: 0 }],
    [E('key.in') + 20, {}],
    [E('key.in') + 48, { keyA: 1 }],
    [E('pattern.show'), {}],
    [E('pattern.show') + 30, { stripeA: 1, nameO: 1 }],
    [E('relation.break'), {}],
    [E('relation.break') + 16, { ringP: 1 }],
    [E('relation.break') + 36, { ringP: 0.65 }],
    [E('relation.break') + 38, {}],
    [E('relation.break') + 74, { cipA: 1, scatO: 1 }],
    [E('aes.wheel'), {}],
    [E('aes.wheel') + 42, { gearM: 1, nameO: 0, scatO: 0, ringP: 0 }],
    [E('aes.wheel') + 46, {}],
    [E('aes.wheel') + 130, { rot: 150, dots1: 1 }],
    [E('aes.space'), {}],
    [E('aes.space') + 26, { spaceO: 1 }],
    [E('aes.rounds'), {}],
    [E('aes.rounds') + 96, { layers: 1, rot: 240 }],
    [E('aes.rounds') + 150, {}],
    [E('aes.rounds') + 180, { spaceO: 0 }],
    [E('same.problem'), {}],
    [E('same.problem') + 88, { dots2: 1, cip2A: 1, rot: 400 }],
    [E('same.problem') + 92, {}],
    [E('same.problem') + 126, { fpG: 1 }],
]);

const Scene1: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T1, f);
    const PX = -520;
    const CX = 520;
    const RY = -90;
    const rowW = 16 * 39 - 5;
    const boxM = s.boxA * (1 - s.gearM);
    return (
        <g>
            {/* 導入:「OK」とぐちゃぐちゃの先出し */}
            {s.okO > 0.001 && (
                <text x={PX} y={RY + 38} textAnchor="middle" fontSize={110} fontWeight={900}
                    fontFamily={fontFamily} fill={INK} opacity={s.okO}>OK</text>
            )}
            {s.scrO > 0.001 && (
                <g opacity={s.scrO}>
                    {([['f8Qz3vXc', -150], ['0bN7qLwS', -30]] as Array<[string, number]>).map(([t, y0], i) => {
                        const y = lerp(y0, RY + (i === 0 ? 0 : 0), s.oneM) + (i === 0 ? 0 : 0);
                        const yy = lerp(y0, RY, s.oneM);
                        const oo = i === 0 ? 1 : 1 - s.oneM;
                        return (
                            <g key={t} opacity={oo}>
                                <rect x={CX - 150} y={yy - 32} width={300} height={64} rx={14} fill={INK} />
                                <text x={CX} y={yy + 10} textAnchor="middle" fontSize={32} fontWeight={700}
                                    fontFamily={fontFamily} fill="#fff" letterSpacing={3}>{t}</text>
                            </g>
                        );
                    })}
                    <DrawPath d={`M ${PX + 110} ${RY - 20} Q 0 ${-220} ${CX - 160} ${lerp(-150, RY, s.oneM)}`}
                        t={s.scrLine} o={s.scrLine} stroke={PLAIN_EDGE} sw={4} />
                    <DrawPath d={`M ${PX + 110} ${RY + 10} Q 0 ${60} ${CX - 160} ${lerp(-30, RY + 8, s.oneM)}`}
                        t={s.scrLine} o={s.scrLine * (1 - s.oneM)} stroke={PLAIN_EDGE} sw={4} />
                </g>
            )}
            {/* 平文ビット列 */}
            <BitRow cx={PX} cy={RY} bits={OK_BITS} size={34} gap={5} appear={s.bitsA}
                stripes={[[0, 4], [8, 12]]} stripeO={s.stripeA}
                rings={[5]} ringO={s.ringP} ringColor={KEYC} flip={s.flip} />
            {s.nameO > 0.001 && (
                <g opacity={s.nameO}>
                    <text x={tileX(PX, 16, 1, 34, 5) + 19} y={RY - 50} textAnchor="middle" fontSize={24}
                        fontWeight={700} fontFamily={fontFamily} fill={PLAIN}>HTTP</text>
                    <text x={tileX(PX, 16, 9, 34, 5) + 19} y={RY - 50} textAnchor="middle" fontSize={24}
                        fontWeight={700} fontFamily={fontFamily} fill={PLAIN}>PNG</text>
                </g>
            )}
            {/* 反転デモ: 同じ規則で戻せる矢印 */}
            {s.arrO > 0.001 && (
                <g opacity={s.arrO}>
                    <DrawPath d={`M ${PX + rowW / 2} ${RY - 44} Q ${PX} ${RY - 150} ${PX - rowW / 2 + 14} ${RY - 50}`}
                        t={s.arrT} stroke={PLAIN} sw={5} />
                    <polygon points={`${PX - rowW / 2 + 6},${RY - 38} ${PX - rowW / 2 + 0},${RY - 64} ${PX - rowW / 2 + 28},${RY - 58}`}
                        fill={PLAIN} opacity={clamp01((s.arrT - 0.85) / 0.15)} />
                </g>
            )}
            {/* 変換機(置換配線の箱) → AES 歯車 */}
            {boxM > 0.001 && (
                <g opacity={boxM}>
                    <rect x={-85} y={RY - 60} width={170} height={120} rx={18} fill="#fff"
                        stroke={INK} strokeWidth={5} />
                    <g stroke={PLAIN} strokeWidth={4} strokeLinecap="round">
                        <line x1={-50} y1={RY - 30} x2={50} y2={RY + 30} />
                        <line x1={-50} y1={RY} x2={50} y2={RY - 30} />
                        <line x1={-50} y1={RY + 30} x2={50} y2={RY} />
                    </g>
                </g>
            )}
            <Gear cx={0} cy={RY} r={78} o={s.gearM} rot={s.rot} label="AES" sub="128 bit" />
            {/* 何段もの置換と混ぜ合わせ(段が順に走る) */}
            {s.layers > 0.001 && (
                <g>
                    {[0, 1, 2].map((i) => {
                        const l = stag(s.layers, i, 3, 0.6);
                        if (l <= 0.001) return null;
                        return (
                            <circle key={i} cx={0} cy={RY} r={lerp(34, 92, l)} fill="none"
                                stroke={INK} strokeWidth={4} opacity={0.6 * bell(l)} />
                        );
                    })}
                </g>
            )}
            {s.spaceO > 0.001 && (
                <text x={-200} y={RY + 174} textAnchor="middle" fontSize={32} fontWeight={700}
                    fontFamily={fontFamily} fill={PLAIN} opacity={s.spaceO}>2¹²⁸ 通り</text>
            )}
            {/* 鍵 */}
            <KeyBundle cx={0} cy={200} o={s.keyA} />
            <DrawPath d={`M 0 172 L 0 ${RY + 64}`} t={s.keyA} o={s.keyA} stroke={KEYC} sw={5} />
            {/* タイルが歯車へ吸い込まれる */}
            {[s.dots1, s.dots2].map((dt, run) =>
                dt > 0.001 && dt < 0.999 ? (
                    <g key={run}>
                        {OK_BITS.map((_, i) => {
                            const l = stag(dt, i, 16, 0.7);
                            if (l <= 0 || l >= 1) return null;
                            const x = lerp(tileX(PX, 16, i, 34, 5), 0, l);
                            return <circle key={i} cx={x} cy={RY} r={6} fill={PLAIN} opacity={bell(l)} />;
                        })}
                    </g>
                ) : null,
            )}
            {/* 暗号文(指紋の問題) */}
            {s.fpG > 0.001 && (
                <rect x={CX - rowW / 2 - 18} y={RY - 36} width={rowW + 36} height={158} rx={16}
                    fill="#F7E8C8" stroke={GLOW} strokeWidth={5} opacity={s.fpG * 0.9} />
            )}
            <BitRow cx={CX} cy={RY} bits={CIP_A} size={34} gap={5} appear={s.cipA} cipher={1}
                cipherBits={CIP_A} rings={[1, 3, 6, 7, 10, 12, 14]} ringO={s.scatO} />
            <BitRow cx={CX} cy={RY + 86} bits={CIP_A} size={34} gap={5} appear={s.cip2A} cipher={1}
                cipherBits={CIP_A} />
            {s.fpG > 0.001 && (
                <text x={CX - rowW / 2 - 44} y={RY + 56} textAnchor="middle" fontSize={44}
                    fontWeight={900} fontFamily={fontFamily} fill={GLOW} opacity={s.fpG}>=</text>
            )}
        </g>
    );
};

// ================ 画面2 nonce と鍵ストリーム ================
const CIP_B = bitsOf(9, 16);

const S2 = {
    stageA: 0, cipA: 0, fpG: 0, tag1A: 0, eyeA: 0, sightT: 0,
    tag2A: 0, c2M: 0, pinO: 0, shipT: 0,
    m1G: 0, m1D: 0, p1: 0, m2G: 0, m2D: 0, p2: 0,
};
const T2 = mkTrack(S2, [
    [E('scene.nonce.in'), {}],
    [E('scene.nonce.in') + 32, { stageA: 1 }],
    [E('scene.nonce.in') + 36, {}],
    [E('scene.nonce.in') + 70, { cipA: 1, fpG: 1 }],
    [E('nonce.public'), {}],
    [E('nonce.public') + 28, { tag1A: 1 }],
    [E('nonce.public') + 30, {}],
    [E('nonce.public') + 60, { eyeA: 1, sightT: 1 }],
    [E('nonce.change'), {}],
    [E('nonce.change') + 26, { tag2A: 1 }],
    [E('nonce.change') + 28, {}],
    [E('nonce.change') + 60, { c2M: 1, fpG: 0 }],
    [E('roles.pin'), {}],
    [E('roles.pin') + 26, { pinO: 1 }],
    [E('nonce.ship'), {}],
    [E('nonce.ship') + 44, { shipT: 1 }],
    [E('mask.make.1'), {}],
    [E('mask.make.1') + 48, { m1G: 1 }],
    [E('xor.apply.1'), {}],
    [E('xor.apply.1') + 32, { m1D: 1 }],
    [E('xor.apply.1') + 46, { p1: 1 }],
    [E('xor.apply.1') + 66, { p1: 0 }],
    [E('mask.make.2'), {}],
    [E('mask.make.2') + 34, { m2G: 1 }],
    [E('mask.make.2') + 38, {}],
    [E('mask.make.2') + 64, { m2D: 1 }],
    [E('mask.make.2') + 78, { p2: 1 }],
    [E('mask.make.2') + 94, { p2: 0 }],
]);

const Scene2: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T2, f);
    const R1 = -205;
    const R2 = -25;
    const PX = -540;
    const CX = 540;
    const rowW = 16 * 35 - 5;
    const genY = -115;
    const mask = (g: number, d: number, y: number, seed: number, pulse: number, cy: number) => (
        <g>
            <MaskBand x={-100} y={y - 42 + d * 42} w={717} grow={g} dir={-1} seed={seed}
                o={g * (1 - d * 0.9)} />
            <XorMark cx={PX - rowW / 2 - 48} cy={cy} o={bell(d)} color={MASKC} />
            {pulse > 0.001 && (
                <rect x={CX - rowW / 2 - 10} y={cy - 24} width={rowW + 20} height={48} rx={10}
                    fill="none" stroke={MASKC} strokeWidth={5} opacity={pulse} />
            )}
        </g>
    );
    return (
        <g>
            {/* 同じ平文 2 本 */}
            <BitRow cx={PX} cy={R1} bits={OK_BITS} size={30} gap={5} appear={s.stageA} />
            <BitRow cx={PX} cy={R2} bits={OK_BITS} size={30} gap={5} appear={s.stageA} />
            {/* 鍵ストリーム生成機 */}
            {s.stageA > 0.001 && (
                <g opacity={s.stageA}>
                    <rect x={-95} y={genY - 55} width={190} height={110} rx={18} fill="#fff"
                        stroke={INK} strokeWidth={5} />
                    <Gear cx={0} cy={genY} r={34} o={1} label="AES" />
                </g>
            )}
            <KeyBundle cx={0} cy={200} o={s.stageA} />
            <DrawPath d={`M 0 172 L 0 ${genY + 58}`} t={s.stageA} o={s.stageA} stroke={KEYC} sw={5} />
            {/* nonce 札と攻撃者の目 */}
            <Eye cx={-680} cy={-350} o={s.eyeA} />
            <DrawPath d={`M -630 -350 L -130 -350`} t={s.sightT} o={s.sightT * 0.6} stroke={GREY} sw={4} />
            <NonceTag cx={-60} cy={-350} num="#1" o={s.tag1A} />
            <NonceTag cx={70} cy={-350} num="#2" o={s.tag2A} />
            <DrawPath d={`M -60 -325 L -16 ${genY - 58}`} t={s.tag1A} o={s.tag1A * 0.8} stroke={NONCE} sw={4} />
            <DrawPath d={`M 70 -325 L 16 ${genY - 58}`} t={s.tag2A} o={s.tag2A * 0.8} stroke={NONCE} sw={4} />
            {/* nonce は暗号文と一緒に送ってよい */}
            {s.shipT > 0.001 && (
                <NonceTag cx={lerp(-60, 620, s.shipT)} cy={-350} num="#1"
                    o={0.9 * clamp01(s.shipT * 4)} />
            )}
            {/* 役割ピン */}
            <Pill cx={0} cy={252} text="秘密" o={s.pinO} color={KEYC} />
            <Pill cx={5} cy={-415} text="公開可・一回" o={s.pinO} color={NONCE} />
            {/* マスクと XOR */}
            {mask(s.m1G, s.m1D, R1, 11, s.p1, R1)}
            {mask(s.m2G, s.m2D, R2, 22, s.p2, R2)}
            {/* 暗号文: nonce が違えば指紋が消える */}
            {s.fpG > 0.001 && (
                <rect x={CX - rowW / 2 - 16} y={R1 - 32} width={rowW + 32} height={R2 - R1 + 64} rx={14}
                    fill="#F7E8C8" stroke={GLOW} strokeWidth={5} opacity={s.fpG * 0.9} />
            )}
            <BitRow cx={CX} cy={R1} bits={CIP_A} size={30} gap={5} appear={s.cipA} cipher={1} cipherBits={CIP_A} />
            <g opacity={1 - s.c2M}>
                <BitRow cx={CX} cy={R2} bits={CIP_A} size={30} gap={5} appear={s.cipA} cipher={1} cipherBits={CIP_A} />
            </g>
            <g opacity={s.c2M}>
                <BitRow cx={CX} cy={R2} bits={CIP_B} size={30} gap={5} appear={s.cipA} cipher={1} cipherBits={CIP_B} />
            </g>
        </g>
    );
};

// ================ 画面3 nonce 再利用の破綻 ================
const P3_1 = [0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0];
const P3_2 = [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1];
const M3 = bitsOf(7, 16);
const C3_1 = xorBits(P3_1, M3);
const C3_2 = xorBits(P3_2, M3);
const D3 = xorBits(P3_1, P3_2);

const S3 = {
    inA: 0, mkA: 0, cipA: 0, tintO: 0, mvT: 0, xorO: 0,
    plainDim: 0, leakA: 0, pillO: 0, peelT: 0, ruleA: 0,
};
const T3 = mkTrack(S3, [
    [E('scene.reuse.in'), {}],
    [E('scene.reuse.in') + 32, { inA: 1 }],
    [E('same.mask'), {}],
    [E('same.mask') + 36, { mkA: 1 }],
    [E('two.ciphers'), {}],
    [E('two.ciphers') + 40, { cipA: 1, tintO: 1, mkA: 0 }],
    [E('cipher.xor'), {}],
    [E('cipher.xor') + 44, { mvT: 1, xorO: 1, plainDim: 1 }],
    [E('mask.cancel'), {}],
    [E('mask.cancel') + 40, { tintO: 0 }],
    [E('relation.leak'), {}],
    [E('relation.leak') + 40, { leakA: 1 }],
    [E('guess.peel'), {}],
    [E('guess.peel') + 22, { pillO: 1 }],
    [E('guess.peel') + 26, {}],
    [E('guess.peel') + 66, { peelT: 1 }],
    [E('rule.lock'), {}],
    [E('rule.lock') + 30, { ruleA: 1 }],
]);

const Scene3: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T3, f);
    const R1 = -250;
    const R2 = -90;
    const PX = -540;
    const rowW = 16 * 35 - 5;
    const genY = -170;
    const c1y = lerp(R1, -60, s.mvT);
    const c2y = lerp(R2, 40, s.mvT);
    const cx = lerp(540, 440, s.mvT);
    const plainO = 1 - s.plainDim * 0.65;
    return (
        <g>
            {/* 生成機 + 複製 nonce */}
            {s.inA > 0.001 && (
                <g opacity={s.inA}>
                    <rect x={-80} y={genY - 45} width={160} height={90} rx={16} fill="#fff"
                        stroke={INK} strokeWidth={5} />
                    <Gear cx={0} cy={genY} r={28} o={1} label="AES" />
                </g>
            )}
            <NonceTag cx={0} cy={-380} num="#7" o={s.inA} dup={s.inA} />
            <DrawPath d={`M 0 -355 L 0 ${genY - 48}`} t={s.inA} o={s.inA * 0.8} stroke={NONCE} sw={4} />
            <KeyBundle cx={-480} cy={200} o={s.inA} />
            {/* 平文 2 本(中身は違う) */}
            <g opacity={plainO}>
                <BitRow cx={PX} cy={R1} bits={P3_1} size={30} gap={5} appear={s.inA} />
                <BitRow cx={PX} cy={R2} bits={P3_2} size={30} gap={5} appear={s.inA} />
            </g>
            {/* まったく同じマスクが 2 本 */}
            <MaskBand x={PX + rowW / 2 + 12} y={R1 - 40} w={rowW + 24} grow={s.mkA} dir={-1} seed={77} o={s.mkA} />
            <MaskBand x={PX + rowW / 2 + 12} y={R2 - 40} w={rowW + 24} grow={s.mkA} dir={-1} seed={77} o={s.mkA} />
            {/* 暗号文 2 本(マスクの気配 = シアンの下線) */}
            {[{ c: C3_1, y: c1y }, { c: C3_2, y: c2y }].map((row, i) => (
                <g key={i}>
                    <BitRow cx={cx} cy={row.y} bits={row.c} size={30} gap={5} appear={s.cipA}
                        cipher={1} cipherBits={row.c}
                        overlay={i === 1 ? [{ i: 8, ch: 'P' }, { i: 9, ch: 'N' }, { i: 10, ch: 'G' }, { i: 11, ch: '…' }] : []}
                        overlayT={i === 1 ? s.peelT : 0} />
                    {s.tintO > 0.001 && (
                        <rect x={cx - rowW / 2} y={row.y + 19} width={rowW} height={7} rx={3.5}
                            fill={MASKC} opacity={s.tintO * s.cipA} />
                    )}
                </g>
            ))}
            <XorMark cx={cx - rowW / 2 - 52} cy={(c1y + c2y) / 2} o={s.xorO} />
            {/* 残るのは平文同士の差分 */}
            {s.xorO > 0.001 && (
                <text x={cx - rowW / 2 - 52} y={108} textAnchor="middle" fontSize={42} fontWeight={900}
                    fontFamily={fontFamily} fill={INK} opacity={s.leakA}>=</text>
            )}
            {s.leakA > 0.001 && (
                <g>
                    {D3.map((v, i) => {
                        const a = stag(s.leakA, i, 16, 0.5);
                        const x = tileX(cx, 16, i, 30, 5);
                        return (
                            <rect key={i} x={x - 15} y={125} width={30} height={30} rx={6}
                                fill={v ? DANGER : '#fff'} stroke={v ? DANGER : PLAIN_EDGE}
                                strokeWidth={2} opacity={a * (v ? 0.95 : 0.8)} />
                        );
                    })}
                </g>
            )}
            <Pill cx={cx - rowW / 2 + 60} cy={c1y - 52} text="推測" o={s.pillO} color={DANGER} />
            {/* ルール板 */}
            {s.ruleA > 0.001 && (
                <g opacity={s.ruleA}>
                    <rect x={-330} y={182} width={660} height={58} rx={16} fill="#fff"
                        stroke={DANGER} strokeWidth={4} />
                    <text x={0} y={222} textAnchor="middle" fontSize={32} fontWeight={900}
                        fontFamily={fontFamily} fill={DANGER}>同じ鍵では nonce 再利用禁止</text>
                </g>
            )}
        </g>
    );
};

// ================ 画面4 モードの役割 ================
const N4 = 48;
const BLOCK_TYPES = [0, 1, 0, 2, 0, 1];
const blockBits = BLOCK_TYPES.map((t) => bitsOf(40 + t, 8));
const ecbBits = BLOCK_TYPES.map((t) => bitsOf(60 + t, 8));

const S4 = {
    ribA: 0, mbO: 0, splitG: 0, tickO: 0, gearA: 0, ecbT: 0, sameG: 0,
    foldT: 0, ctrA: 0, ctrT: 0, stitchT: 0, dropT: 0, cipT: 0,
    modeO: 0, machT: 0, gearS: 1,
};
const T4 = mkTrack(S4, [
    [E('scene.mode.in'), {}],
    [E('scene.mode.in') + 50, { ribA: 1, mbO: 1 }],
    [E('split.blocks'), {}],
    [E('split.blocks') + 36, { splitG: 1, tickO: 1 }],
    [E('ecb.bad'), {}],
    [E('ecb.bad') + 30, { gearA: 1 }],
    [E('ecb.bad') + 34, {}],
    [E('ecb.bad') + 140, { ecbT: 1 }],
    [E('ecb.bad') + 170, {}],
    [E('ecb.bad') + 210, { sameG: 1 }],
    [E('mode.in'), {}],
    [E('mode.in') + 40, { foldT: 1, sameG: 0, tickO: 0 }],
    [E('mode.in') + 44, {}],
    [E('mode.in') + 74, { ctrA: 1 }],
    [E('counter.run'), {}],
    [E('counter.run') + 170, { ctrT: 3 }],
    [E('stream.stitch'), {}],
    [E('stream.stitch') + 40, { stitchT: 1 }],
    [E('stream.stitch') + 44, {}],
    [E('stream.stitch') + 80, { dropT: 1, cipT: 1 }],
    [E('mode.name'), {}],
    [E('mode.name') + 34, { modeO: 1 }],
    [E('strong.part'), {}],
    [E('strong.part') + 56, { machT: 1, gearS: 0.82 }],
]);

const Scene4: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T4, f);
    const RY = -240;
    const OY = 90;
    const size = 24;
    const pitch = 28;
    const x0 = -1170;
    const tilePos = (i: number) => x0 + i * pitch + Math.floor(i / 8) * s.splitG * 18 + size / 2;
    return (
        <g>
            {/* 長いビット列(左へはみ出す) */}
            {s.ribA > 0.001 && (
                <g opacity={1}>
                    {Array.from({ length: N4 }, (_, i) => {
                        const a = stag(s.ribA, i, N4, 0.6);
                        if (a <= 0.001) return null;
                        const b = blockBits[Math.floor(i / 8)][i % 8];
                        const x = tilePos(i);
                        return (
                            <g key={i} opacity={a}>
                                <rect x={x - size / 2} y={RY - size / 2} width={size} height={size} rx={5}
                                    fill="#fff" stroke={PLAIN_EDGE} strokeWidth={2} opacity={1 - s.cipT} />
                                <rect x={x - size / 2} y={RY - size / 2} width={size} height={size} rx={5}
                                    fill={INK} opacity={s.cipT} />
                                <text x={x} y={RY + 6} textAnchor="middle" fontSize={15} fontWeight={700}
                                    fontFamily={fontFamily} fill={s.cipT > 0.5 ? '#fff' : PLAIN}>
                                    {s.cipT > 0.5 ? bitsOf(80, N4)[i] : b}
                                </text>
                            </g>
                        );
                    })}
                    <text x={-820} y={RY - 44} textAnchor="middle" fontSize={28} fontWeight={900}
                        fontFamily={fontFamily} fill={PLAIN} opacity={s.mbO}>1 MB</text>
                </g>
            )}
            {/* 128bit の目盛り */}
            {s.tickO > 0.001 && (
                <g opacity={s.tickO}>
                    <path d={`M ${tilePos(16) - size / 2 - 4} ${RY + 26} L ${tilePos(16) - size / 2 - 4} ${RY + 40}
                        L ${tilePos(23) + size / 2 + 4} ${RY + 40} L ${tilePos(23) + size / 2 + 4} ${RY + 26}`}
                        fill="none" stroke={PLAIN} strokeWidth={3} />
                    <text x={(tilePos(16) + tilePos(23)) / 2} y={RY + 74} textAnchor="middle" fontSize={24}
                        fontWeight={700} fontFamily={fontFamily} fill={PLAIN}>128 bit</text>
                </g>
            )}
            <Gear cx={0} cy={-60} r={46} o={s.gearA} rot={s.ctrT * 90 + s.ecbT * 60} label="AES"
                scale={s.gearS} />
            {/* ECB: ブロック独立変換 → 同じ柄が残る */}
            {s.foldT < 0.999 && s.ecbT > 0.001 && (
                <g opacity={1 - s.foldT} transform={`translate(0, ${s.foldT * 40}) scale(1, ${1 - s.foldT})`}>
                    {BLOCK_TYPES.map((t, b) => {
                        const a = stag(s.ecbT, b, 6, 0.7);
                        if (a <= 0.001) return null;
                        const bx = (tilePos(b * 8) + tilePos(b * 8 + 7)) / 2;
                        const bw = 8 * pitch + 6;
                        const isDup = t === 0;
                        return (
                            <g key={b} opacity={a}>
                                {ecbBits[b].map((v, i) => {
                                    const x = bx - bw / 2 + 8 + i * pitch + size / 2;
                                    return (
                                        <g key={i}>
                                            <rect x={x - size / 2} y={OY - size / 2} width={size} height={size}
                                                rx={5} fill={INK} />
                                            <text x={x} y={OY + 6} textAnchor="middle" fontSize={15}
                                                fontWeight={700} fontFamily={fontFamily} fill="#fff">{v}</text>
                                        </g>
                                    );
                                })}
                                {isDup && s.sameG > 0.001 && (
                                    <rect x={bx - bw / 2} y={OY - size / 2 - 8} width={bw} height={size + 16}
                                        rx={10} fill="none" stroke={GLOW} strokeWidth={5} opacity={s.sameG} />
                                )}
                            </g>
                        );
                    })}
                    {s.sameG > 0.001 && (
                        <g opacity={s.sameG}>
                            <path d={`M ${(tilePos(0) + tilePos(7)) / 2} ${OY - 34} Q ${(tilePos(0) + tilePos(23)) / 2} ${OY - 100} ${(tilePos(16) + tilePos(23)) / 2} ${OY - 34}`}
                                fill="none" stroke={GLOW} strokeWidth={4} />
                            <path d={`M ${(tilePos(16) + tilePos(23)) / 2} ${OY - 34} Q ${(tilePos(16) + tilePos(39)) / 2} ${OY - 100} ${(tilePos(32) + tilePos(39)) / 2} ${OY - 34}`}
                                fill="none" stroke={GLOW} strokeWidth={4} />
                        </g>
                    )}
                </g>
            )}
            {/* CTR: nonce + カウンタ */}
            {s.ctrA > 0.001 && (
                <g opacity={s.ctrA}>
                    <NonceTag cx={-470} cy={-60} num="#9" o={1} w={92} />
                    {[1, 2, 3].map((k) => {
                        const l = clamp01(s.ctrT - (k - 1));
                        const cxk = lerp(-330 + (k - 1) * 12, -52, l);
                        return (
                            <g key={k} opacity={l >= 1 ? 0.25 : 1}>
                                <rect x={cxk - 26} y={-86} width={52} height={44} rx={10} fill="#fff"
                                    stroke={INK} strokeWidth={3.5} />
                                <text x={cxk} y={-54} textAnchor="middle" fontSize={26} fontWeight={900}
                                    fontFamily={fontFamily} fill={INK}>{k}</text>
                            </g>
                        );
                    })}
                    <DrawPath d={`M -424 -60 L -360 -60`} t={s.ctrA} o={0.8} stroke={NONCE} sw={4} />
                </g>
            )}
            {/* マスク片 → 一本の帯 → 平文へ */}
            {[1, 2, 3].map((k) => {
                const born = clamp01(s.ctrT - (k - 1) - 0.55) / 0.45;
                if (born <= 0.001) return null;
                const w0 = 200;
                const xk = lerp(70 + (k - 1) * 220, -560 + (k - 1) * (w0 + 8), s.stitchT);
                const yk = lerp(-60, RY - 40 + s.dropT * 40, s.stitchT);
                return (
                    <MaskBand key={k} x={xk} y={yk} w={w0} grow={clamp01(born)} dir={1}
                        seed={100 + k} o={clamp01(born) * (1 - s.dropT * 0.9)} h={22} />
                );
            })}
            {/* モード札 */}
            {s.modeO > 0.001 && (
                <g opacity={s.modeO}>
                    {['CTR', 'GCM', 'CBC'].map((m, i) => (
                        <Pill key={m} cx={250} cy={-160 + i * 64} text={m} o={stag(s.modeO, i, 3, 0.5)}
                            color={INK} fs={26} />
                    ))}
                </g>
            )}
            {/* 強い歯車は機械の一部 */}
            <DrawPath
                d={`M -560 36 L -560 -200 L 380 -200 L 380 36 Z`}
                t={s.machT} o={s.machT} stroke={INK} sw={5} />
            {s.machT > 0.001 && (
                <text x={-90} y={64} textAnchor="middle" fontSize={26} fontWeight={900}
                    fontFamily={fontFamily} fill={INK} opacity={s.machT}>モード</text>
            )}
        </g>
    );
};

// ================ 画面5 認証タグ ================
const C5 = bitsOf(13, 16);
const P5 = bitsOf(21, 16);

const S5 = {
    cipA: 0, handA: 0, handX: 0, press1: 0, flipR1: 0, decA: 0, glitch1: 0,
    splitT: 0, tag5A: 0, aadA: 0, aadT: 0, vT: 0, snapP: 0, cleanP: 0,
    press2: 0, flipR2: 0, crackT: 0, gateT: 0, brkT: 0,
};
const T5 = mkTrack(S5, [
    [E('scene.tag.in'), {}],
    [E('scene.tag.in') + 32, { cipA: 1 }],
    [E('scene.tag.in') + 40, { handX: 0 }],
    [E('scene.tag.in') + 76, { handA: 1 }],
    [E('bit.flip'), {}],
    [E('bit.flip') + 14, { press1: 1 }],
    [E('bit.flip') + 20, { flipR1: 1 }],
    [E('bit.flip') + 34, { press1: 0 }],
    [E('bit.flip') + 44, {}],
    [E('bit.flip') + 80, { decA: 1 }],
    [E('bit.flip') + 84, {}],
    [E('bit.flip') + 110, { glitch1: 1 }],
    [E('concepts.split'), {}],
    [E('concepts.split') + 40, { splitT: 1 }],
    [E('aead.in'), {}],
    [E('aead.in') + 34, { splitT: 0, flipR1: 0, glitch1: 0 }],
    [E('aead.in') + 38, {}],
    [E('aead.in') + 70, { tag5A: 1 }],
    [E('aad.in'), {}],
    [E('aad.in') + 28, { aadA: 1 }],
    [E('aad.in') + 32, {}],
    [E('aad.in') + 76, { aadT: 1 }],
    [E('verify.ok'), {}],
    [E('verify.ok') + 40, { vT: 1 }],
    [E('verify.ok') + 54, { snapP: 1 }],
    [E('verify.ok') + 72, { snapP: 0, cleanP: 1 }],
    [E('tamper.fail'), {}],
    [E('tamper.fail') + 20, { handX: 1 }],
    [E('tamper.fail') + 34, { press2: 1 }],
    [E('tamper.fail') + 40, { flipR2: 1 }],
    [E('tamper.fail') + 52, { press2: 0 }],
    [E('tamper.fail') + 56, {}],
    [E('tamper.fail') + 86, { crackT: 1 }],
    [E('tamper.fail') + 90, {}],
    [E('tamper.fail') + 116, { gateT: 1, cleanP: 0 }],
    [E('tamper.fail') + 120, {}],
    [E('tamper.fail') + 150, { handA: 0 }],
    [E('rule.aead'), {}],
    [E('rule.aead') + 36, { brkT: 1, crackT: 0, gateT: 0, flipR2: 0, vT: 0 }],
]);

const Scene5: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T5, f);
    const CY = -200;
    const DY = 30;
    const CXr = -160;
    const size = 38;
    const gap = 6;
    const rowW = 16 * (size + gap) - gap;
    const handPx = lerp(tileX(CXr, 16, 9, size, gap), tileX(CXr, 16, 4, size, gap), s.handX);
    const tagX = CXr + rowW / 2 + 52;
    const slotX = 640;
    return (
        <g>
            {/* 機密性/完全性の 2 レーン */}
            {s.splitT > 0.001 && (
                <g opacity={s.splitT}>
                    <rect x={-720} y={CY - 72} width={1260} height={144} rx={20} fill="#E3ECF7" opacity={0.85} />
                    <rect x={-720} y={DY - 72} width={1260} height={144} rx={20} fill="#E5F2E8" opacity={0.85} />
                    <text x={-688} y={CY - 88} fontSize={28} fontWeight={900} fontFamily={fontFamily}
                        fill={NONCE}>機密性</text>
                    <text x={-688} y={DY - 88} fontSize={28} fontWeight={900} fontFamily={fontFamily}
                        fill={TAGC}>完全性</text>
                </g>
            )}
            {/* 暗号文 + 封印タグ */}
            <BitRow cx={CXr} cy={CY} bits={C5} size={size} gap={gap} appear={s.cipA} cipher={1}
                cipherBits={C5} danger={[9]} dangerO={s.flipR1} />
            {/* 2 回目の改ざんは別タイル */}
            {s.flipR2 > 0.001 && (
                <g opacity={s.flipR2}>
                    <rect x={tileX(CXr, 16, 4, size, gap) - size / 2} y={CY - size / 2} width={size}
                        height={size} rx={7} fill={DANGER} />
                    <text x={tileX(CXr, 16, 4, size, gap)} y={CY + size * 0.22} textAnchor="middle"
                        fontSize={size * 0.58} fontWeight={700} fontFamily={fontFamily} fill="#fff">
                        {1 - C5[4]}
                    </text>
                </g>
            )}
            <TagSeal cx={tagX} cy={CY} o={s.tag5A} crack={s.crackT} />
            {/* AAD(ヘッダーはタグ計算にだけ入る) */}
            {s.aadA > 0.001 && (
                <g opacity={s.aadA}>
                    {[0, 1, 0, 1, 1].map((v, i) => (
                        <g key={i}>
                            <rect x={-680 + i * 26 - 10} y={-372} width={20} height={20} rx={4}
                                fill="#fff" stroke={GREY} strokeWidth={2} />
                            <text x={-680 + i * 26} y={-357} textAnchor="middle" fontSize={13}
                                fontWeight={700} fontFamily={fontFamily} fill={GREY}>{v}</text>
                        </g>
                    ))}
                    <text x={-700} y={-330} fontSize={22} fontWeight={900} fontFamily={fontFamily}
                        fill={GREY}>ヘッダー</text>
                </g>
            )}
            <DrawPath d={`M -560 -360 Q ${tagX} -360 ${tagX} ${CY - 38}`} t={s.aadT}
                o={s.aadT * 0.9} stroke={GREY} sw={4} />
            {/* 検証スロット */}
            {s.tag5A > 0.001 && (
                <g>
                    <polygon points={hexPts(34)} fill="none" stroke={TAGC} strokeWidth={4}
                        strokeDasharray="8 7" opacity={0.9}
                        transform={`translate(${slotX}, ${CY})`} />
                    {s.vT > 0.001 && (
                        <TagSeal cx={lerp(tagX, slotX, s.vT)} cy={CY} o={s.vT}
                            crack={s.crackT} />
                    )}
                    {s.snapP > 0.001 && (
                        <circle cx={slotX} cy={CY} r={46} fill="none" stroke={TAGC} strokeWidth={5}
                            opacity={s.snapP} />
                    )}
                </g>
            )}
            {/* 復号側 */}
            <g opacity={1 - s.gateT * 0.7}>
                <BitRow cx={CXr} cy={DY} bits={P5} size={size} gap={gap} appear={s.decA}
                    danger={[9]} dangerO={s.glitch1} />
            </g>
            {s.cleanP > 0.001 && (
                <rect x={CXr - rowW / 2 - 12} y={DY - 28} width={rowW + 24} height={56} rx={12}
                    fill="none" stroke={TAGC} strokeWidth={4} opacity={s.cleanP} />
            )}
            {/* 改ざん時は復号レーンが閉じる */}
            {s.gateT > 0.001 && (
                <g opacity={s.gateT}>
                    <rect x={CXr - rowW / 2 - 20} y={DY - 5} width={(rowW + 40) * s.gateT} height={10}
                        rx={5} fill={DANGER} />
                </g>
            )}
            <RedHand x={handPx} y={CY - 96} o={s.handA} press={Math.max(s.press1, s.press2)} />
            {/* 暗号文 + タグをひとまとまりに */}
            <DrawPath
                d={`M ${CXr - rowW / 2 - 14} ${CY + 44} L ${CXr - rowW / 2 - 14} ${CY + 62} L ${tagX + 40} ${CY + 62} L ${tagX + 40} ${CY + 44}`}
                t={s.brkT} o={s.brkT} stroke={INK} sw={5} />
        </g>
    );
};

// ================ 画面6 鍵の作り分け ================
const KEY_TAGS = [
    { x: -480, label: 'handshake' },
    { x: -160, label: 'application' },
    { x: 160, label: 'client' },
    { x: 480, label: 'server' },
];

const S6 = {
    seedA: 0, treeT: 0, labelO: 0, stageT: 0, litT: 0,
    dmgP: 0, reuseT: 0, slashO: 0, reuseO: 1, cutT: 0,
};
const T6 = mkTrack(S6, [
    [E('scene.keys.in'), {}],
    [E('scene.keys.in') + 34, { seedA: 1 }],
    [E('derive.tree'), {}],
    [E('derive.tree') + 80, { treeT: 1 }],
    [E('traffic.keys'), {}],
    [E('traffic.keys') + 26, { labelO: 1 }],
    [E('tls.stage'), {}],
    [E('tls.stage') + 40, { stageT: 1 }],
    [E('tls.stage') + 44, {}],
    [E('tls.stage') + 120, { litT: 1 }],
    [E('damage.box'), {}],
    [E('damage.box') + 24, { dmgP: 1 }],
    [E('damage.box') + 110, {}],
    [E('damage.box') + 150, { dmgP: 0 }],
    [E('no.reuse'), {}],
    [E('no.reuse') + 40, { reuseT: 1 }],
    [E('no.reuse') + 56, { slashO: 1 }],
    [E('no.reuse') + 130, {}],
    [E('no.reuse') + 170, { reuseO: 0 }],
    [E('relation.cut'), {}],
    [E('relation.cut') + 60, { cutT: 1 }],
]);

const Scene6: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T6, f);
    const seedY = 185;
    const tagY = -60;
    const segY = -290;
    return (
        <g>
            {/* 共有秘密の種 */}
            {s.seedA > 0.001 && (
                <g opacity={s.seedA} transform={`translate(0, ${seedY}) scale(${0.7 + 0.3 * s.seedA})`}>
                    <circle r={46} fill={KEYC} />
                    <text y={9} textAnchor="middle" fontSize={24} fontWeight={900}
                        fontFamily={fontFamily} fill="#fff">秘密</text>
                </g>
            )}
            {/* 鍵導出ツリー */}
            {KEY_TAGS.map((t, i) => {
                const l = stag(s.treeT, i, 4, 0.55);
                const lit = stag(s.litT, i < 2 ? 0 : 1, 2, 0.5);
                const dmg = i === 1 ? s.dmgP : 0;
                return (
                    <g key={t.label}>
                        <DrawPath d={`M 0 ${seedY - 48} C 0 40, ${t.x} 120, ${t.x} ${tagY + 34}`}
                            t={l} o={l} stroke={KEYC} sw={5} />
                        {l > 0.6 && (
                            <g opacity={clamp01((l - 0.6) / 0.4)}>
                                <rect x={t.x - 85} y={tagY - 28} width={170} height={56} rx={14}
                                    fill={KEYC} opacity={1 - dmg} />
                                <rect x={t.x - 85} y={tagY - 28} width={170} height={56} rx={14}
                                    fill={DANGER} opacity={dmg} />
                                {[0, 1, 2].map((k) => (
                                    <rect key={k} x={t.x - 26 + k * 20} y={tagY - 8 - s.labelO * 8}
                                        width={16} height={16} rx={4} fill="#fff" opacity={0.85} />
                                ))}
                                <text x={t.x} y={tagY + 20 - (1 - s.labelO) * 6} textAnchor="middle"
                                    fontSize={20} fontWeight={900} fontFamily={fontFamily} fill="#fff"
                                    opacity={s.labelO}>{t.label}</text>
                            </g>
                        )}
                        {dmg > 0.001 && (
                            <circle cx={t.x} cy={tagY} r={74} fill="none" stroke={DANGER}
                                strokeWidth={4} strokeDasharray="10 8" opacity={dmg} />
                        )}
                        {s.stageT > 0.001 && i < 2 && (
                            <DrawPath d={`M ${t.x} ${tagY - 30} L ${i === 0 ? -440 : 440} ${segY + 48}`}
                                t={s.stageT} o={s.stageT * 0.55} stroke={KEYC} sw={3.5} />
                        )}
                    </g>
                );
            })}
            {/* TLS の段階レーン */}
            {s.stageT > 0.001 && (
                <g opacity={s.stageT}>
                    {[{ x: -870, w: 740, lbl: 'handshake' }, { x: 130, w: 740, lbl: 'application' }].map(
                        (seg, i) => {
                            const lit = stag(s.litT, i, 2, 0.5);
                            return (
                                <g key={seg.lbl}>
                                    <rect x={seg.x} y={segY} width={seg.w} height={96} rx={18}
                                        fill="#fff" stroke={PLAIN_EDGE} strokeWidth={3} />
                                    <rect x={seg.x} y={segY} width={seg.w} height={96} rx={18}
                                        fill={KEYC} opacity={lit * 0.22} />
                                    <text x={seg.x + seg.w / 2} y={segY + 58} textAnchor="middle"
                                        fontSize={28} fontWeight={700} fontFamily={fontFamily}
                                        fill={PLAIN}>{seg.lbl}</text>
                                </g>
                            );
                        },
                    )}
                    <text x={760} y={segY - 24} textAnchor="middle" fontSize={26} fontWeight={900}
                        fontFamily={fontFamily} fill={INK}>TLS 1.3</text>
                </g>
            )}
            {/* 使い回しは切られる */}
            {s.reuseO > 0.001 && s.reuseT > 0.001 && (
                <g opacity={s.reuseO}>
                    <DrawPath d={`M -480 ${tagY - 34} C -400 ${segY + 150}, 200 ${segY + 170}, 420 ${segY + 100}`}
                        t={s.reuseT} o={0.9} stroke={DANGER} sw={5} />
                    <g opacity={s.slashO} stroke={DANGER} strokeWidth={7} strokeLinecap="round">
                        <line x1={-60} y1={segY + 190} x2={20} y2={segY + 110} />
                    </g>
                </g>
            )}
            {/* 枝同士の薄い関係線が切れる */}
            {s.treeT > 0.9 &&
                [0, 1, 2].map((i) => {
                    const a = KEY_TAGS[i].x + 85;
                    const b = KEY_TAGS[i + 1].x - 85;
                    const cut = stag(s.cutT, i, 3, 0.5);
                    const half = (b - a) / 2;
                    return (
                        <g key={i} opacity={0.45 * (1 - cut * 0.6)}>
                            <line x1={a} y1={tagY} x2={a + half * (1 - cut)} y2={tagY}
                                stroke={GREY} strokeWidth={3.5} strokeDasharray="7 6" />
                            <line x1={b - half * (1 - cut)} y1={tagY} x2={b} y2={tagY}
                                stroke={GREY} strokeWidth={3.5} strokeDasharray="7 6" />
                        </g>
                    );
                })}
        </g>
    );
};

// ================ 画面7 漏れる外形 ================
const S7 = {
    bunA: 0, metaA: 0, timeA: 0, shA: 0, trafA: 0, endA: 0, frameT: 0, pulseP: 0,
};
const T7 = mkTrack(S7, [
    [E('scene.limits.in'), {}],
    [E('scene.limits.in') + 36, { bunA: 1 }],
    [E('metadata.show'), {}],
    [E('metadata.show') + 36, { metaA: 1 }],
    [E('metadata.show') + 40, {}],
    [E('metadata.show') + 110, { timeA: 1 }],
    [E('size.shadow'), {}],
    [E('size.shadow') + 56, { shA: 1 }],
    [E('traffic.pattern'), {}],
    [E('traffic.pattern') + 80, { trafA: 1 }],
    [E('endpoint.plain'), {}],
    [E('endpoint.plain') + 56, { endA: 1 }],
    [E('scope.frame'), {}],
    [E('scope.frame') + 50, { frameT: 1 }],
    [E('not.magic'), {}],
    [E('not.magic') + 26, { pulseP: 1 }],
    [E('not.magic') + 60, { pulseP: 0.15 }],
]);

const Scene7: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T7, f);
    const BY = -110;
    const metaGlow = 1 + s.pulseP * 0.8;
    return (
        <g>
            {/* 暗号文束(本文は閉じている) */}
            {s.bunA > 0.001 && (
                <g opacity={s.bunA}>
                    <rect x={-270} y={BY - 100} width={540} height={200} rx={16} fill={INK} />
                    {Array.from({ length: 36 }, (_, i) => {
                        const r = Math.floor(i / 12);
                        const c = i % 12;
                        return (
                            <rect key={i} x={-270 + 22 + c * 42} y={BY - 100 + 26 + r * 56} width={28}
                                height={28} rx={6} fill="#32415C" />
                        );
                    })}
                </g>
            )}
            {/* 外形メタデータ(グレー) */}
            <g opacity={s.metaA * Math.min(1, metaGlow)}>
                <Pill cx={-560} cy={-390} text="宛先" o={s.metaA} color={GREY} solid />
                <DrawPath d={`M -560 -362 L -560 ${BY - 110} L -290 ${BY - 110}`} t={s.metaA}
                    o={0.6} stroke={GREY} sw={3.5} />
            </g>
            {s.timeA > 0.001 && (
                <g opacity={s.timeA * Math.min(1, metaGlow)}>
                    <line x1={330} y1={-390} x2={790} y2={-390} stroke={GREY} strokeWidth={3.5} />
                    {[0, 1, 2].map((i) => {
                        const l = stag(s.timeA, i, 3, 0.6);
                        return (
                            <circle key={i} cx={400 + i * 150} cy={-390} r={10 + 4 * bell(l)}
                                fill={GREY} opacity={l} />
                        );
                    })}
                    <text x={560} y={-430} textAnchor="middle" fontSize={24} fontWeight={900}
                        fontFamily={fontFamily} fill={GREY}>タイミング</text>
                </g>
            )}
            {/* 長さの影 */}
            {s.shA > 0.001 && (
                <g opacity={Math.min(1, s.shA * metaGlow)}>
                    <rect x={-280 - 30 * s.shA} y={132} width={(560 + 60 * s.shA) * s.shA} height={16}
                        rx={8} fill={GREY} opacity={0.75} />
                    <text x={0} y={184} textAnchor="middle" fontSize={24} fontWeight={900}
                        fontFamily={fontFamily} fill={GREY}>長さ</text>
                </g>
            )}
            {/* 行動の影(バースト) */}
            {s.trafA > 0.001 && (
                <g opacity={s.trafA * Math.min(1, metaGlow)}>
                    {[26, 64, 38, 88, 30, 70].map((h, i) => {
                        const l = stag(s.trafA, i, 6, 0.6);
                        return (
                            <rect key={i} x={420 + i * 56} y={-352} width={30} height={h * l} rx={6}
                                fill={GREY} opacity={0.7} />
                        );
                    })}
                </g>
            )}
            {/* 端点は平文 */}
            {s.endA > 0.001 && (
                <g opacity={s.endA}>
                    {[-770, 770].map((x) => (
                        <g key={x}>
                            <rect x={x - 95} y={BY - 70} width={190} height={140} rx={14} fill="#fff"
                                stroke={PLAIN_EDGE} strokeWidth={3} />
                            {Array.from({ length: 6 }, (_, i) => {
                                const r = Math.floor(i / 3);
                                const c = i % 3;
                                return (
                                    <g key={i}>
                                        <rect x={x - 95 + 26 + c * 50} y={BY - 70 + 30 + r * 50} width={30}
                                            height={30} rx={6} fill="#fff" stroke={PLAIN_EDGE} strokeWidth={2} />
                                        <text x={x - 95 + 41 + c * 50} y={BY - 70 + 52 + r * 50}
                                            textAnchor="middle" fontSize={18} fontWeight={700}
                                            fontFamily={fontFamily} fill={PLAIN}>{bitsOf(33, 12)[i + (x > 0 ? 6 : 0)]}</text>
                                    </g>
                                );
                            })}
                        </g>
                    ))}
                    <line x1={-672} y1={BY} x2={-274} y2={BY} stroke={PLAIN_EDGE} strokeWidth={5} />
                    <line x1={274} y1={BY} x2={672} y2={BY} stroke={PLAIN_EDGE} strokeWidth={5} />
                </g>
            )}
            {/* 暗号化が効く区間 */}
            <DrawPath
                d={`M -650 ${BY + 140} L -650 ${BY - 140} L 650 ${BY - 140} L 650 ${BY + 140} Z`}
                t={s.frameT} o={s.frameT * 0.9} stroke={NONCE} sw={4} />
        </g>
    );
};

// ================ 画面8 結論 ================
const P8 = [0, 1, 0, 0, 1, 1, 1, 1];
const C8A = bitsOf(54, 8);
const C8B = bitsOf(59, 8);

const S8 = {
    laneA: 0, plainA: 0, keyA: 0, bandT: 0, cipA: 0,
    nonA: 0, reroll: 0, machT: 0, gearS: 1, tagA: 0, handT: 0,
    scopeT: 0, cutT: 0, thesO: 0, stillT: 0,
};
const T8 = mkTrack(S8, [
    [E('scene.recap.in'), {}],
    [E('scene.recap.in') + 30, { laneA: 1 }],
    [E('recap.transform'), {}],
    [E('recap.transform') + 28, { plainA: 1 }],
    [E('recap.transform') + 32, {}],
    [E('recap.transform') + 56, { keyA: 1 }],
    [E('recap.transform') + 60, {}],
    [E('recap.transform') + 100, { bandT: 1 }],
    [E('recap.transform') + 104, {}],
    [E('recap.transform') + 134, { cipA: 1 }],
    [E('recap.nonce'), {}],
    [E('recap.nonce') + 30, { nonA: 1 }],
    [E('recap.nonce') + 34, {}],
    [E('recap.nonce') + 64, { reroll: 1 }],
    [E('recap.mode'), {}],
    [E('recap.mode') + 44, { machT: 1, gearS: 0.85 }],
    [E('recap.tag'), {}],
    [E('recap.tag') + 30, { tagA: 1 }],
    [E('recap.tag') + 34, {}],
    [E('recap.tag') + 110, { handT: 1 }],
    [E('recap.scope'), {}],
    [E('recap.scope') + 50, { scopeT: 1 }],
    [E('final.cut'), {}],
    [E('final.cut') + 44, { cutT: 1, thesO: 1 }],
    [E('final.still'), {}],
    [E('final.still') + 60, { stillT: 1 }],
]);

const Scene8: React.FC<{ f: number }> = ({ f }) => {
    const s = resolve(T8, f);
    const RY = -80;
    const px = lerp(-560, -260, s.stillT);
    const cx = lerp(520, 430, s.stillT);
    const machO = (1 - s.stillT * 0.85);
    const rowW = 8 * 37 - 5;
    // はじかれる赤い手
    const ht = s.handT;
    const hy = ht < 0.5 ? lerp(-310, -170, ht * 2) : lerp(-170, -330, (ht - 0.5) * 2);
    const ho = ht <= 0.001 || ht >= 0.97 ? 0 : ht > 0.75 ? (1 - ht) / 0.25 : 1;
    return (
        <g>
            {/* レーン(=平文と暗号文の関係線。final.cut で中央が切れる) */}
            {s.laneA > 0.001 && (
                <g opacity={s.laneA * 0.9} stroke={PLAIN_EDGE} strokeWidth={4} strokeLinecap="round">
                    <line x1={-860} y1={RY + 64} x2={-(14 + 200 * s.cutT) * Math.min(1, s.cutT * 30)} y2={RY + 64} />
                    <line x1={(14 + 200 * s.cutT) * Math.min(1, s.cutT * 30)} y1={RY + 64} x2={860} y2={RY + 64} />
                </g>
            )}
            {/* 平文 -> マスク -> 暗号文 の一筆書き */}
            <BitRow cx={px} cy={RY} bits={P8} size={32} gap={5} appear={s.plainA} />
            <g opacity={machO}>
                <KeyBundle cx={-300} cy={200} o={s.keyA} s={18} />
                <DrawPath d={`M -300 174 C -300 60, 0 110, 0 ${RY + 48}`} t={s.keyA} o={s.keyA} stroke={KEYC} sw={4} />
                <Gear cx={0} cy={RY} r={40} o={s.keyA} rot={s.reroll * 120} label="AES" scale={s.gearS} />
                <MaskBand x={-414} y={RY - 40} w={300} grow={s.bandT} dir={-1} seed={31}
                    o={s.bandT * (1 - s.cipA)} h={20} />
                <NonceTag cx={0} cy={-250} num="#4" o={s.nonA} w={88} />
                <DrawPath d={`M 0 -226 L 0 ${RY - 44}`} t={s.nonA} o={s.nonA * 0.8} stroke={NONCE} sw={4} />
                <DrawPath d={`M -140 ${RY + 78} L -140 ${RY - 96} L 140 ${RY - 96} L 140 ${RY + 78} Z`}
                    t={s.machT} o={s.machT} stroke={INK} sw={4.5} />
            </g>
            {/* 暗号文(nonce で姿が変わる) */}
            <g opacity={1 - s.reroll}>
                <BitRow cx={cx} cy={RY} bits={C8A} size={32} gap={5} appear={s.cipA} cipher={1} cipherBits={C8A} />
            </g>
            <g opacity={s.reroll}>
                <BitRow cx={cx} cy={RY} bits={C8B} size={32} gap={5} appear={s.cipA} cipher={1} cipherBits={C8B} />
            </g>
            <g opacity={machO}>
                <TagSeal cx={cx + rowW / 2 + 44} cy={RY} r={24} o={s.tagA} />
                <RedHand x={cx + rowW / 2 + 44} y={hy} o={ho} press={0} />
                {/* 外形の影は外へ残る */}
                {s.scopeT > 0.001 && (
                    <g opacity={s.scopeT * 0.9}>
                        <rect x={cx - 80} y={lerp(RY + 80, -388, s.scopeT)} width={160} height={14} rx={7}
                            fill={GREY} />
                        {[0, 1].map((i) => (
                            <circle key={i} cx={cx + 120 + i * 44} cy={lerp(RY + 80, -384, s.scopeT)} r={9}
                                fill={GREY} />
                        ))}
                    </g>
                )}
            </g>
            {/* 文字 -> ビット列 はつながったまま */}
            {s.stillT > 0.001 && (
                <g opacity={s.stillT}>
                    <text x={-650} y={RY + 36} textAnchor="middle" fontSize={92} fontWeight={900}
                        fontFamily={fontFamily} fill={INK}>OK</text>
                    <line x1={-562} y1={RY} x2={px - rowW / 2 - 16} y2={RY} stroke={PLAIN}
                        strokeWidth={5} />
                </g>
            )}
            {s.thesO > 0.001 && (
                <text x={0} y={188} textAnchor="middle" fontSize={62} fontWeight={900}
                    fontFamily={fontFamily} fill={INK} opacity={s.thesO}>関係を切る</text>
            )}
        </g>
    );
};

// ================ 全体 ================
const SCENES: Array<{ id: string; inEvent: string; title: string; comp: React.FC<{ f: number }> }> = [
    { id: 's1', inEvent: 'scene.bits.in', title: 'ビット列と鍵', comp: Scene1 },
    { id: 's2', inEvent: 'scene.nonce.in', title: 'nonce と鍵ストリーム', comp: Scene2 },
    { id: 's3', inEvent: 'scene.reuse.in', title: 'nonce 再利用の破綻', comp: Scene3 },
    { id: 's4', inEvent: 'scene.mode.in', title: '暗号利用モード', comp: Scene4 },
    { id: 's5', inEvent: 'scene.tag.in', title: '認証タグ', comp: Scene5 },
    { id: 's6', inEvent: 'scene.keys.in', title: '鍵の作り分け', comp: Scene6 },
    { id: 's7', inEvent: 'scene.limits.in', title: '漏れる外形', comp: Scene7 },
    { id: 's8', inEvent: 'scene.recap.in', title: '関係を切る技術', comp: Scene8 },
];
const FADE = 16;
const sceneVis = (k: number, f: number) => {
    const inF = k === 0 ? 0 : E(SCENES[k].inEvent);
    const a = k === 0 ? 1 : clamp01((f - inF) / FADE);
    const b = k === SCENES.length - 1 ? 1 : 1 - clamp01((f - E(SCENES[k + 1].inEvent)) / FADE);
    return Math.min(a, b);
};

export const Encryption: React.FC = () => {
    const f = useCurrentFrame();
    return (
        <AbsoluteFill style={{ backgroundColor: BG, fontFamily }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
                <rect x={-960} y={-540} width={1920} height={1080} fill={BG} />
                <rect x={-960} y={-285} width={1920} height={420} fill={LANE_BG} opacity={0.5} />
                {SCENES.map((sc, k) => {
                    const v = sceneVis(k, f);
                    if (v <= 0.001) return null;
                    const C = sc.comp;
                    return (
                        <g key={sc.id} opacity={v}>
                            <C f={f} />
                            <Header title={sc.title} o={v} />
                        </g>
                    );
                })}
                <SubtitleG f={f} />
            </svg>
        </AbsoluteFill>
    );
};
