import React from 'react';
import { interpolate, Img, staticFile } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const PALETTE = {
    ...BASE_COLORS,
    primary: '#3E6FD9',
    primaryDeep: '#1F3E8A',
    primaryGlow: 'rgba(62, 111, 217, 0.22)',
    accent: '#D4A23B',
    accentDeep: '#8C6B1E',
    warm: '#E35C42',
    amber: '#F5B800',
    emerald: '#0FA968',
    purple: '#6D4AFF',
    purpleDeep: '#3D258F',
    teal: '#1EBFBF',
    ink: '#1E2434',
    inkSoft: '#2B3349',
    sub: '#5B6478',
    dim: '#98A0B3',
    paper: '#FBFAF6',
    card: '#FFFFFF',
    cardBorder: 'rgba(30,36,52,0.1)',
};

const fade = (f: number, from: number, to = from + 16) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const rise = (f: number, from: number, to = from + 18, dist = 18) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const pop = (f: number, from: number, to = from + 14) =>
    interpolate(f, [from, to], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const draw = (f: number, from: number, to = from + 22) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// =============== Background primitives ===============
const Blobs: React.FC<{ palette: string[] }> = ({ palette }) => (
    <svg viewBox="0 0 1920 1080" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', filter: 'blur(60px)', opacity: 0.45,
    }}>
        <circle cx={300} cy={250} r={260} fill={palette[0]} />
        <circle cx={1620} cy={200} r={220} fill={palette[1] ?? palette[0]} />
        <circle cx={1700} cy={780} r={300} fill={palette[2] ?? palette[1] ?? palette[0]} />
    </svg>
);

const DiagonalBand: React.FC<{ color: string; opacity?: number; rotate?: number; top?: number }> =
    ({ color, opacity = 0.08, rotate = -8, top = 280 }) => (
    <div style={{
        position: 'absolute', left: -200, right: -200, top,
        height: 240, background: color, opacity,
        transform: `rotate(${rotate}deg)`, pointerEvents: 'none',
    }} />
);

const Stage: React.FC<React.PropsWithChildren<{
    style?: React.CSSProperties; bgPalette?: string[]; bandColor?: string; bandTop?: number;
}>> = ({ children, style, bgPalette, bandColor, bandTop }) => (
    <>
        {bgPalette && <Blobs palette={bgPalette} />}
        {bandColor && <DiagonalBand color={bandColor} top={bandTop ?? 340} />}
        <div style={{
            position: 'absolute', inset: 0,
            paddingTop: 150, paddingBottom: 260, paddingLeft: 80, paddingRight: 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            ...style,
        }}>{children}</div>
    </>
);

// =============== Reusable inline SVG illustrations ===============
const TunnelIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = '#3E6FD9' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
            <radialGradient id="tunnelG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={color} stopOpacity="0.05" />
                <stop offset="100%" stopColor={color} stopOpacity="0.4" />
            </radialGradient>
        </defs>
        <ellipse cx={50} cy={50} rx={42} ry={32} fill="none" stroke={color} strokeWidth={4} />
        <ellipse cx={50} cy={50} rx={32} ry={24} fill="none" stroke={color} strokeWidth={3} opacity={0.7} />
        <ellipse cx={50} cy={50} rx={22} ry={16} fill="none" stroke={color} strokeWidth={2.5} opacity={0.5} />
        <ellipse cx={50} cy={50} rx={12} ry={9} fill="url(#tunnelG)" stroke={color} strokeWidth={2} opacity={0.4} />
    </svg>
);

const ShieldIcon: React.FC<{ size?: number; color?: string; cracked?: boolean }> = ({ size = 100, color = '#1F3E8A', cracked }) => (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1}>
        <path d="M 50 5 L 90 20 L 90 55 Q 90 90 50 105 Q 10 90 10 55 L 10 20 Z"
            fill={color} opacity={0.92} />
        <path d="M 50 5 L 90 20 L 90 55 Q 90 90 50 105 Q 10 90 10 55 L 10 20 Z"
            fill="none" stroke="#fff" strokeWidth={3} opacity={0.4} />
        {cracked ? (
            <path d="M 40 30 L 55 55 L 35 70 L 60 90" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
        ) : (
            <path d="M 35 55 L 47 67 L 68 42" stroke="#fff" strokeWidth={5} fill="none"
                strokeLinecap="round" strokeLinejoin="round" />
        )}
    </svg>
);

const CoinStack: React.FC<{ size?: number; color?: string; count?: number }> = ({ size = 100, color = '#D4A23B', count = 5 }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
        {Array.from({ length: count }).map((_, i) => {
            const y = 80 - i * 12;
            return (
                <g key={i}>
                    <ellipse cx={50} cy={y + 6} rx={30} ry={6} fill={color} opacity={0.95} />
                    <rect x={20} y={y - 6} width={60} height={12} fill={color} />
                </g>
            );
        })}
        <ellipse cx={50} cy={80 - count * 12} rx={30} ry={6} fill="#fff" opacity={0.3} />
    </svg>
);

const CrownIcon: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = '#6D4AFF' }) => (
    <svg viewBox="0 0 120 80" width={size} height={size * 0.667}>
        <path d="M 10 70 L 15 25 L 35 50 L 60 15 L 85 50 L 105 25 L 110 70 Z"
            fill={color} stroke={color} strokeWidth={2} strokeLinejoin="round" />
        <rect x={10} y={70} width={100} height={8} fill={color} />
        <circle cx={15} cy={25} r={6} fill={color} />
        <circle cx={60} cy={15} r={7} fill={color} />
        <circle cx={105} cy={25} r={6} fill={color} />
        <circle cx={35} cy={62} r={4} fill="#fff" opacity={0.7} />
        <circle cx={60} cy={62} r={4} fill="#fff" opacity={0.7} />
        <circle cx={85} cy={62} r={4} fill="#fff" opacity={0.7} />
    </svg>
);

const TrophyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = '#D4A23B' }) => (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1}>
        <path d="M 30 15 L 70 15 L 68 55 Q 68 75 50 78 Q 32 75 32 55 Z" fill={color} />
        <path d="M 30 25 L 15 25 Q 10 25 10 32 Q 10 50 30 50" fill="none" stroke={color} strokeWidth={5} />
        <path d="M 70 25 L 85 25 Q 90 25 90 32 Q 90 50 70 50" fill="none" stroke={color} strokeWidth={5} />
        <rect x={42} y={75} width={16} height={12} fill={color} />
        <rect x={28} y={87} width={44} height={10} rx={2} fill={color} />
        <text x={50} y={50} fontSize={18} fontWeight={900} textAnchor="middle" fill="#fff">★</text>
    </svg>
);

const WifiWaves: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = '#E35C42' }) => (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8}>
        <path d="M 5 50 Q 50 5 95 50" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" />
        <path d="M 18 58 Q 50 25 82 58" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
        <path d="M 30 65 Q 50 45 70 65" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
        <circle cx={50} cy={72} r={6} fill={color} />
    </svg>
);

const MagnifierIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = '#3E6FD9' }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx={42} cy={42} r={28} fill="none" stroke={color} strokeWidth={7} />
        <circle cx={42} cy={42} r={22} fill={color} opacity={0.12} />
        <line x1={64} y1={64} x2={88} y2={88} stroke={color} strokeWidth={9} strokeLinecap="round" />
        <circle cx={36} cy={36} r={6} fill="#fff" opacity={0.6} />
    </svg>
);

const MaskIcon: React.FC<{ size?: number; color?: string }> = ({ size = 100, color = '#E35C42' }) => (
    <svg viewBox="0 0 120 80" width={size} height={size * 0.667}>
        <path d="M 10 30 Q 60 10 110 30 Q 110 60 90 65 Q 70 50 60 50 Q 50 50 30 65 Q 10 60 10 30 Z"
            fill={color} />
        <ellipse cx={36} cy={40} rx={10} ry={6} fill="#fff" />
        <ellipse cx={84} cy={40} rx={10} ry={6} fill="#fff" />
        <circle cx={36} cy={40} r={3} fill={PALETTE.ink} />
        <circle cx={84} cy={40} r={3} fill={PALETTE.ink} />
    </svg>
);

const ChainLink: React.FC<{ size?: number; color?: string }> = ({ size = 60, color = '#6D4AFF' }) => (
    <svg viewBox="0 0 60 30" width={size} height={size * 0.5}>
        <rect x={3} y={6} width={20} height={18} rx={9} fill="none" stroke={color} strokeWidth={4} />
        <rect x={37} y={6} width={20} height={18} rx={9} fill="none" stroke={color} strokeWidth={4} />
        <line x1={20} y1={15} x2={40} y2={15} stroke={color} strokeWidth={4} />
    </svg>
);

const AdSticker: React.FC<{ x: number; y: number; rotate: number; opacity: number }> = ({ x, y, rotate, opacity }) => (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} style={{ opacity }}>
        <rect x={-50} y={-22} width={100} height={44} rx={6} fill={PALETTE.warm}
            stroke="#fff" strokeWidth={3} />
        <text x={0} y={6} fontSize={20} fontWeight={900} textAnchor="middle" fill="#fff" letterSpacing={2}>
            VPN AD
        </text>
    </g>
);

// =============== Reusable typographic primitives ===============
const Eyebrow: React.FC<{ children: React.ReactNode; color?: string; opacity?: number }> = ({ children, color = PALETTE.sub, opacity = 1 }) => (
    <div style={{
        fontSize: 24, fontWeight: 800, color, letterSpacing: 4,
        textTransform: 'uppercase', opacity,
    }}>{children}</div>
);

const Headline: React.FC<{ children: React.ReactNode; color?: string; size?: number; align?: React.CSSProperties['textAlign'] }> =
    ({ children, color = PALETTE.ink, size = 50, align = 'left' }) => (
    <div style={{
        fontSize: size, fontWeight: 900, color, lineHeight: 1.25, textAlign: align,
    }}>{children}</div>
);

// =============== Scene 0: 広告が多すぎる ===============
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => {
    const tiles = [
        { ch: 'ゲーム実況', dx: -380, dy: -180, rot: -4 },
        { ch: '歴史解説', dx: 0, dy: -200, rot: 2 },
        { ch: '技術系Vlog', dx: 380, dy: -180, rot: 5 },
        { ch: 'ニュース', dx: -380, dy: 60, rot: 3 },
        { ch: '料理', dx: 0, dy: 60, rot: -3 },
        { ch: '旅行記', dx: 380, dy: 60, rot: 4 },
    ];
    return (
        <Stage bgPalette={['#FFE3DC', '#FFEBC2', '#FFE3DC']}>
            <div style={{ position: 'relative', width: 1200, height: 540 }}>
                {tiles.map((t, i) => {
                    const ap = fade(f, 6 + i * 5, 6 + i * 5 + 12);
                    return (
                        <div key={i} style={{
                            position: 'absolute', left: '50%', top: '50%',
                            width: 320, height: 200, marginLeft: -160, marginTop: -100,
                            transform: `translate(${t.dx}px, ${t.dy}px) rotate(${t.rot}deg) scale(${pop(f, 6 + i * 5)})`,
                            opacity: ap,
                            background: '#fff', borderRadius: 14,
                            boxShadow: '0 18px 40px rgba(17,24,39,0.18)',
                            display: 'flex', flexDirection: 'column', overflow: 'hidden',
                        }}>
                            <div style={{ flex: 1, background: `linear-gradient(135deg, #2B3349, #1E2434)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div style={{ color: '#fff', fontSize: 30, fontWeight: 900, opacity: 0.45 }}>▶</div>
                                {/* Sponsorship tag — neutral PR badge */}
                                <div style={{
                                    position: 'absolute', bottom: 8, right: 8,
                                    background: 'rgba(255,255,255,0.92)', color: PALETTE.ink,
                                    padding: '4px 10px', fontSize: 14, fontWeight: 800,
                                    borderRadius: 4, letterSpacing: 1,
                                    opacity: fade(f, 22 + i * 5, 22 + i * 5 + 10),
                                }}>PR</div>
                            </div>
                            <div style={{ padding: '10px 14px', fontSize: 22, fontWeight: 800, color: PALETTE.ink }}>
                                {t.ch}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Stage>
    );
};

// =============== Scene 1: 今日の問い ===============
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#E0EAFF', '#DDF4FF', '#E6E1FF']}>
        <div style={{ width: '100%', textAlign: 'center', position: 'relative' }}>
            <div style={{
                opacity: fade(f, 6),
                fontSize: 72, fontWeight: 900, color: PALETTE.ink, lineHeight: 1.2,
            }}>
                <span style={{ fontSize: 90, color: PALETTE.warm, fontWeight: 900 }}>なぜ</span>こんなに<br />
                VPN広告ばかり？
            </div>
            <div style={{
                marginTop: 36, opacity: fade(f, 32),
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
                fontSize: 30, fontWeight: 800, color: PALETTE.sub,
            }}>
                <span style={{ width: 60, height: 2, background: PALETTE.dim }} />
                結論
                <span style={{ width: 60, height: 2, background: PALETTE.dim }} />
            </div>
            <div style={{
                marginTop: 20,
                opacity: fade(f, 50), transform: `scale(${pop(f, 50, 70)})`,
                display: 'inline-block', padding: '24px 52px', background: PALETTE.primaryDeep,
                color: '#fff', borderRadius: 22,
                boxShadow: '0 20px 60px rgba(31,62,138,0.45)',
                fontSize: 42, fontWeight: 900, lineHeight: 1.4,
            }}>
                広告する側の<span style={{ color: PALETTE.amber }}>経済</span>と<br />
                異常に相性が良い商品
            </div>
        </div>
    </Stage>
);

// =============== Scene 2: 4つの論点 ===============
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const topics = [
        { n: 1, t: 'お金の流れ①', s: 'サブスクの構造', color: PALETTE.amber },
        { n: 2, t: 'お金の流れ②', s: 'YouTubeとの相性', color: PALETTE.warm },
        { n: 3, t: '業界構造', s: '実は数社しかない', color: PALETTE.purple },
        { n: 4, t: '広告の言葉', s: 'なぜみんな同じ？', color: PALETTE.primary },
    ];
    return (
        <Stage bgPalette={['#FFF1D6', '#E8E0FF', '#D6EAFF']}>
            <div style={{ width: '100%' }}>
                <Eyebrow opacity={fade(f, 4)}>今日の見取り図</Eyebrow>
                <Headline color={PALETTE.ink} size={56} align="left">
                    <span style={{ opacity: fade(f, 8) }}>4つの</span>
                    <span style={{ color: PALETTE.primaryDeep, opacity: fade(f, 14) }}>仕組み</span>
                </Headline>
                <div style={{
                    marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18,
                }}>
                    {topics.map((t, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 20, padding: '24px 18px',
                            position: 'relative', overflow: 'hidden',
                            opacity: fade(f, 22 + i * 8, 22 + i * 8 + 14),
                            transform: `translateY(${rise(f, 22 + i * 8, 22 + i * 8 + 14, 24)}px)`,
                            boxShadow: '0 18px 40px rgba(17,24,39,0.1)',
                        }}>
                            <div style={{
                                position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: t.color,
                            }} />
                            <div style={{
                                fontSize: 80, fontWeight: 900, color: t.color, lineHeight: 1, letterSpacing: -4,
                            }}>{t.n}</div>
                            <div style={{ height: 12 }} />
                            <div style={{ fontSize: 24, fontWeight: 900, color: PALETTE.ink }}>{t.t}</div>
                            <div style={{ fontSize: 18, color: PALETTE.sub, marginTop: 6, fontWeight: 700 }}>{t.s}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 3: 順路を示す ===============
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => {
    const steps = [
        { s: 'お金', color: PALETTE.amber, x: 200 },
        { s: '会社', color: PALETTE.purple, x: 580 },
        { s: '言葉', color: PALETTE.warm, x: 960 },
        { s: '品質', color: PALETTE.emerald, x: 1340 },
    ];
    return (
        <Stage bgPalette={['#FFF1D6', '#E8E0FF', '#FFE3DC']}>
            <div style={{ width: '100%' }}>
                <Eyebrow opacity={fade(f, 4)}>順路</Eyebrow>
                <div style={{
                    fontSize: 38, fontWeight: 900, color: PALETTE.ink, marginTop: 8, marginBottom: 24,
                    opacity: fade(f, 8),
                }}>
                    なんとなく知ってる <span style={{ color: PALETTE.dim }}>→</span> 仕組みで理解する
                </div>
                <svg viewBox="0 0 1600 380" style={{ width: '100%', height: 'auto' }}>
                    {/* trail */}
                    <path d="M 200 240 Q 580 100 960 240 T 1340 240"
                        stroke={PALETTE.dim} strokeWidth={6} strokeDasharray="14 10" fill="none"
                        style={{ opacity: fade(f, 14), strokeDashoffset: interpolate(f, [14, 60], [400, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }} />
                    {steps.map((st, i) => {
                        const cy = i % 2 === 0 ? 240 : 180;
                        return (
                            <g key={i} style={{
                                opacity: fade(f, 18 + i * 12, 18 + i * 12 + 14),
                                transform: `translate(0, ${rise(f, 18 + i * 12, 18 + i * 12 + 14, 20)}px)`,
                            }}>
                                <circle cx={st.x} cy={cy} r={70} fill={st.color} />
                                <circle cx={st.x} cy={cy} r={70} fill="none" stroke="#fff" strokeWidth={6} />
                                <text x={st.x} y={cy + 14} fontSize={36} fontWeight={900} fill="#fff" textAnchor="middle">{st.s}</text>
                                <text x={st.x} y={cy - 90} fontSize={28} fontWeight={900} fill={st.color} textAnchor="middle">
                                    Step {i + 1}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </Stage>
    );
};

// =============== Scene 4: VPNは継続課金 ===============
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    const months = Array.from({ length: 24 }, (_, i) => i);
    return (
        <Stage bgPalette={['#FFF1D6', '#FFE8C4', '#FFE3DC']}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
                    <Eyebrow opacity={fade(f, 4)}>サブスク構造</Eyebrow>
                    <div style={{ fontSize: 32, fontWeight: 900, color: PALETTE.ink, opacity: fade(f, 8) }}>
                        2〜3年払い続けやすい
                    </div>
                </div>
                <svg viewBox="0 0 1600 360" style={{ width: '100%', height: 'auto' }}>
                    <line x1={60} y1={300} x2={1540} y2={300} stroke={PALETTE.dim} strokeWidth={3} />
                    {months.map((m, i) => {
                        const x = 80 + i * 60;
                        const h = 50 + i * 7;
                        const ap = fade(f, 14 + i * 2, 14 + i * 2 + 8);
                        return (
                            <g key={i} style={{ opacity: ap }}>
                                <rect x={x - 22} y={300 - h} width={44} height={h}
                                    fill={i < 12 ? PALETTE.amber : PALETTE.accentDeep} rx={4} />
                                {m % 6 === 0 && (
                                    <text x={x} y={332} fontSize={20} fontWeight={700}
                                        textAnchor="middle" fill={PALETTE.sub}>
                                        {m === 0 ? '契約' : `${m}m`}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                    {/* LTV arrow */}
                    <g style={{ opacity: fade(f, 64) }}>
                        <path d="M 90 80 L 1500 80" stroke={PALETTE.warm} strokeWidth={6} markerEnd="url(#arr4)" />
                        <text x={780} y={60} fontSize={36} fontWeight={900} textAnchor="middle" fill={PALETTE.warm}>
                            高 LTV（長く払い続ける商品）
                        </text>
                    </g>
                    <defs>
                        <marker id="arr4" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                            <path d="M 0 0 L 12 7 L 0 14 z" fill={PALETTE.warm} />
                        </marker>
                    </defs>
                </svg>
            </div>
        </Stage>
    );
};

// =============== Scene 5: 紹介報酬の異常値 ===============
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    const rows = [
        { label: '1ヶ月プラン', pct: 100, note: '新規成約', color: PALETTE.amber, from: 8, big: true },
        { label: '1〜2年プラン', pct: 40, note: '新規成約', color: PALETTE.primary, from: 28 },
        { label: '更新時', pct: 30, note: '継続で永続', color: PALETTE.teal, from: 48 },
    ];
    return (
        <Stage bgPalette={['#FFF1D6', '#FFEBC2', '#D6EAFF']}>
            <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>
                <Eyebrow opacity={fade(f, 2)}>NordVPN公式アフィリエイト条件</Eyebrow>
                <Headline color={PALETTE.ink} size={42} align="left">
                    <span style={{ opacity: fade(f, 6) }}>紹介報酬の </span>
                    <span style={{ color: PALETTE.primaryDeep, opacity: fade(f, 12) }}>還元率</span>
                </Headline>
                <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {rows.map((r, i) => (
                        <div key={i} style={{
                            display: 'grid', gridTemplateColumns: '230px 1fr 140px', gap: 16,
                            alignItems: 'center',
                            opacity: fade(f, r.from, r.from + 14),
                            transform: `translateX(${interpolate(f, [r.from, r.from + 14], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                        }}>
                            <div style={{ fontSize: 24, fontWeight: 800, color: PALETTE.ink, textAlign: 'right' }}>
                                {r.label}
                            </div>
                            <div style={{
                                height: r.big ? 64 : 46, background: '#fff', borderRadius: 10, position: 'relative', overflow: 'hidden',
                                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.08)',
                            }}>
                                <div style={{
                                    width: `${r.pct}%`, height: '100%', background: `linear-gradient(90deg, ${r.color} 0%, ${r.color}cc 100%)`,
                                    transform: `scaleX(${interpolate(f, [r.from + 4, r.from + 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                                    transformOrigin: 'left',
                                    borderRadius: 10,
                                }} />
                                {r.big && (
                                    <div style={{
                                        position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                                        color: PALETTE.ink, fontSize: 18, fontWeight: 800,
                                        opacity: fade(f, r.from + 18),
                                    }}>初月分まるごと</div>
                                )}
                            </div>
                            <div style={{ fontSize: r.big ? 44 : 36, fontWeight: 900, color: r.color, lineHeight: 1, textAlign: 'right' }}>
                                {r.pct}%
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 16, fontSize: 22, fontWeight: 800, color: PALETTE.primaryDeep, textAlign: 'center',
                    opacity: fade(f, 72),
                }}>
                    更新時も継続して入る、サブスク型の設計
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 6: ExpressVPNの固定額 ===============
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    const plans = [
        { plan: '1ヶ月', usd: 13, jpy: '約2,000円' },
        { plan: '6ヶ月', usd: 22, jpy: '約3,300円' },
        { plan: '12ヶ月', usd: 36, jpy: '約5,400円', highlight: true },
    ];
    return (
        <Stage bgPalette={['#E8E0FF', '#FFEBC2', '#E8E0FF']}>
            <div style={{ width: '100%' }}>
                <Eyebrow opacity={fade(f, 2)}>ExpressVPN：1成約の固定報酬</Eyebrow>
                <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, alignItems: 'end' }}>
                    {plans.map((p, i) => (
                        <div key={i} style={{
                            background: p.highlight ? PALETTE.primaryDeep : '#fff',
                            color: p.highlight ? '#fff' : PALETTE.ink,
                            border: p.highlight ? `4px solid ${PALETTE.amber}` : `2px solid ${PALETTE.cardBorder}`,
                            borderRadius: 22, padding: p.highlight ? '40px 20px' : '30px 20px', textAlign: 'center',
                            opacity: fade(f, 14 + i * 10, 14 + i * 10 + 16),
                            transform: `translateY(${rise(f, 14 + i * 10, 14 + i * 10 + 16, 26)}px)`,
                            boxShadow: p.highlight ? '0 24px 60px rgba(31,62,138,0.5)' : '0 10px 28px rgba(17,24,39,0.08)',
                            position: 'relative',
                        }}>
                            {p.highlight && (
                                <div style={{
                                    position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)',
                                    background: PALETTE.amber, color: PALETTE.ink,
                                    fontSize: 18, fontWeight: 900, padding: '6px 18px', borderRadius: 999,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)', letterSpacing: 2,
                                }}>HOT</div>
                            )}
                            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, opacity: 0.85 }}>{p.plan}</div>
                            <div style={{
                                fontSize: p.highlight ? 110 : 80, fontWeight: 900,
                                color: p.highlight ? PALETTE.amber : PALETTE.primary, lineHeight: 1, letterSpacing: -4,
                            }}>
                                ${p.usd}
                            </div>
                            <div style={{ fontSize: 22, marginTop: 14, opacity: 0.85 }}>{p.jpy}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 26, fontSize: 26, fontWeight: 800, color: PALETTE.ink, textAlign: 'center',
                    opacity: fade(f, 56),
                }}>
                    1件で <span style={{ color: PALETTE.warm, fontSize: 36 }}>5,000円超</span> ＝ 副収入として割がいい
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 7: 他ジャンルとの比較 ===============
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#FFF1D6', '#FFE3DC', '#FFEBC2']}>
        <div style={{ width: '100%' }}>
            <Eyebrow opacity={fade(f, 2)}>同じ5,400円を稼ぐには？</Eyebrow>
            <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {/* VPN side */}
                <div style={{
                    background: '#fff', borderRadius: 24, padding: 32,
                    border: `4px solid ${PALETTE.warm}`,
                    opacity: fade(f, 10), transform: `translateX(${interpolate(f, [10, 26], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    boxShadow: '0 18px 50px rgba(227,92,66,0.25)',
                }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: PALETTE.warm }}>VPN（ExpressVPN）</div>
                    <div style={{
                        fontSize: 140, fontWeight: 900, color: PALETTE.warm, lineHeight: 1, marginTop: 8, letterSpacing: -6,
                    }}>1<span style={{ fontSize: 60 }}>件</span></div>
                    <div style={{ fontSize: 24, color: PALETTE.sub, marginTop: 8 }}>1成約 ≒ 5,400円</div>
                </div>
                {/* Amazon side */}
                <div style={{
                    background: '#fff', borderRadius: 24, padding: 32,
                    border: `2px solid ${PALETTE.cardBorder}`,
                    opacity: fade(f, 30), transform: `translateX(${interpolate(f, [30, 46], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    boxShadow: '0 14px 36px rgba(17,24,39,0.1)',
                }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: PALETTE.sub }}>Amazonアソシエイト（書籍3%）</div>
                    <div style={{
                        fontSize: 96, fontWeight: 900, color: PALETTE.dim, lineHeight: 1, marginTop: 8, letterSpacing: -3,
                    }}>10<span style={{ fontSize: 50 }}>万円超</span></div>
                    <div style={{ fontSize: 24, color: PALETTE.sub, marginTop: 8 }}>を売る必要がある</div>
                </div>
            </div>
            <div style={{
                marginTop: 32, fontSize: 32, fontWeight: 900, color: PALETTE.primaryDeep, textAlign: 'center',
                opacity: fade(f, 64),
            }}>
                少ない成約で <span style={{ color: PALETTE.warm }}>しっかり稼げる</span> 案件
            </div>
        </div>
    </Stage>
);

// =============== Scene 8: 広告媒体の比較 ===============
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const bars = [
        { label: 'クリック率', baseL: '表示広告', spL: 'YouTube', ratio: '3〜5倍', from: 14 },
        { label: '購入率', baseL: '表示広告', spL: 'YouTube', ratio: '2〜4倍', from: 44 },
    ];
    return (
        <Stage bgPalette={['#FFE3DC', '#FFEBC2', '#FFE3DC']}>
            <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <Img src={staticFile('brand-icons/youtube.svg')} style={{ width: 80, height: 'auto', opacity: fade(f, 4) }} />
                    <div>
                        <Eyebrow opacity={fade(f, 4)}>YouTubeスポンサー読み上げ</Eyebrow>
                        <Headline color={PALETTE.ink} size={36}>
                            表示広告との<span style={{ color: PALETTE.primaryDeep }}> 反応率の差</span>
                        </Headline>
                    </div>
                </div>
                <div style={{ marginTop: 22 }}>
                    {bars.map((b, i) => (
                        <div key={i} style={{ marginBottom: 18, opacity: fade(f, b.from, b.from + 14) }}>
                            <div style={{ fontSize: 22, fontWeight: 800, color: PALETTE.ink, marginBottom: 6 }}>
                                {b.label}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ fontSize: 18, color: PALETTE.sub, width: 100 }}>{b.baseL}</div>
                                <div style={{ flex: 1, height: 28, background: '#fff', borderRadius: 8, boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.08)' }}>
                                    <div style={{ width: '20%', height: '100%', background: PALETTE.dim, borderRadius: 8 }} />
                                </div>
                                <div style={{ width: 70, fontSize: 20, color: PALETTE.sub, fontWeight: 700 }}>1×</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                                <div style={{ fontSize: 18, color: PALETTE.warm, width: 100, fontWeight: 900 }}>{b.spL}</div>
                                <div style={{ flex: 1, height: 44, background: '#fff', borderRadius: 8, boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.08)' }}>
                                    <div style={{
                                        width: '100%', height: '100%', background: `linear-gradient(90deg, ${PALETTE.warm}, ${PALETTE.amber})`, borderRadius: 8,
                                        transform: `scaleX(${interpolate(f, [b.from + 4, b.from + 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                                        transformOrigin: 'left',
                                    }} />
                                </div>
                                <div style={{ width: 110, fontSize: 30, fontWeight: 900, color: PALETTE.warm, textAlign: 'right' }}>
                                    {b.ratio}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 9: 信頼のお裾分け ===============
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#D6EAFF', '#E8E0FF', '#D6EAFF']}>
        <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>
            <Eyebrow opacity={fade(f, 2)}>信頼のお裾分け</Eyebrow>
            <Headline color={PALETTE.ink} size={36}>
                <span style={{ opacity: fade(f, 8) }}>チャンネルが積んだ</span>
                <span style={{ color: PALETTE.primaryDeep, opacity: fade(f, 14) }}> 信頼</span>
                <span style={{ opacity: fade(f, 14) }}>が、商品に流れる</span>
            </Headline>
            <svg viewBox="0 0 1100 280" style={{ width: '100%', height: 'auto', marginTop: 16 }}>
                <defs>
                    <marker id="arr9" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                        <path d="M 0 0 L 12 7 L 0 14 z" fill={PALETTE.primary} />
                    </marker>
                    <linearGradient id="trust9" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={PALETTE.primary} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={PALETTE.primary} stopOpacity="1" />
                    </linearGradient>
                </defs>
                {/* Three nodes — all primary blue, neutral */}
                {[
                    { x: 150, label: 'YouTuber', sub: '積み上げた信頼', from: 6 },
                    { x: 550, label: '視聴者', sub: '「ぼくも使ってる」', from: 26 },
                    { x: 950, label: 'VPN会社', sub: 'お裾分け', from: 50 },
                ].map((n, i) => (
                    <g key={i} style={{ opacity: fade(f, n.from, n.from + 14) }}>
                        <circle cx={n.x} cy={140} r={100} fill="#fff" stroke={PALETTE.primary} strokeWidth={5} />
                        <text x={n.x} y={132} fontSize={30} fontWeight={900} textAnchor="middle" fill={PALETTE.primaryDeep}>{n.label}</text>
                        <text x={n.x} y={170} fontSize={18} fontWeight={700} textAnchor="middle" fill={PALETTE.sub}>{n.sub}</text>
                    </g>
                ))}
                {/* Flowing arrows */}
                <line x1={260} y1={140} x2={440} y2={140} stroke="url(#trust9)" strokeWidth={8} markerEnd="url(#arr9)"
                    style={{ opacity: fade(f, 38) }} />
                <line x1={660} y1={140} x2={840} y2={140} stroke="url(#trust9)" strokeWidth={8} markerEnd="url(#arr9)"
                    style={{ opacity: fade(f, 60) }} />
                <text x={350} y={115} fontSize={20} fontWeight={800} textAnchor="middle" fill={PALETTE.primary}
                    style={{ opacity: fade(f, 44) }}>信頼</text>
                <text x={750} y={115} fontSize={20} fontWeight={800} textAnchor="middle" fill={PALETTE.primary}
                    style={{ opacity: fade(f, 66) }}>そのまま流用</text>
            </svg>
        </div>
    </Stage>
);

// =============== Scene 10: ExpressVPNの流入 ===============
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => {
    const pct = 84;
    const deg = interpolate(f, [10, 50], [0, 360 * pct / 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage bgPalette={['#FFE3DC', '#FFEBC2', '#FFE3DC']}>
            <div style={{ width: '100%', display: 'flex', gap: 50, alignItems: 'center', justifyContent: 'center' }}>
                {/* Donut with rays */}
                <div style={{ position: 'relative', width: 420, height: 420 }}>
                    <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: -50, opacity: fade(f, 50) }}>
                        {Array.from({ length: 16 }).map((_, i) => {
                            const a = (i / 16) * Math.PI * 2;
                            return (
                                <line key={i}
                                    x1={50 + Math.cos(a) * 52} y1={50 + Math.sin(a) * 52}
                                    x2={50 + Math.cos(a) * 60} y2={50 + Math.sin(a) * 60}
                                    stroke={PALETTE.warm} strokeWidth={1.5} opacity={0.6} />
                            );
                        })}
                    </svg>
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: `conic-gradient(${PALETTE.warm} 0deg, ${PALETTE.warm} ${deg}deg, #ECEEF3 ${deg}deg 360deg)`,
                    }} />
                    <div style={{
                        position: 'absolute', inset: 50, borderRadius: '50%', background: '#fff',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'inset 0 4px 16px rgba(0,0,0,0.06)',
                    }}>
                        <Img src={staticFile('brand-icons/youtube.svg')} style={{ width: 90, height: 'auto', opacity: fade(f, 8) }} />
                        <div style={{ fontSize: 100, fontWeight: 900, color: PALETTE.warm, lineHeight: 1, marginTop: 4, letterSpacing: -4 }}>
                            84%
                        </div>
                        <div style={{ fontSize: 22, color: PALETTE.sub, fontWeight: 800 }}>YouTube経由</div>
                    </div>
                </div>
                <div style={{ opacity: fade(f, 56), transform: `translateX(${rise(f, 56, 74, 24)}px)`, maxWidth: 480 }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: PALETTE.sub }}>ExpressVPN公式サイトへの</div>
                    <div style={{ fontSize: 56, fontWeight: 900, color: PALETTE.ink, lineHeight: 1.15, marginTop: 8 }}>
                        流入の<br /><span style={{ color: PALETTE.warm }}>8割以上</span>
                    </div>
                    <div style={{ fontSize: 18, color: PALETTE.sub, marginTop: 16 }}>
                        Similarweb計測 / ThoughtLeaders調査
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 11: 視聴者の体感 ===============
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    const dots = Array.from({ length: 230 });
    return (
        <Stage bgPalette={['#E0EAFF', '#D6EAFF', '#E0EAFF']}>
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
                {/* Big number */}
                <div style={{ textAlign: 'right' }}>
                    <Eyebrow opacity={fade(f, 4)}>Surfshark のみ</Eyebrow>
                    <div style={{
                        fontSize: 240, fontWeight: 900, color: PALETTE.primaryDeep, lineHeight: 1,
                        opacity: fade(f, 18), transform: `scale(${pop(f, 18, 40)})`, letterSpacing: -10,
                    }}>2,300+</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: PALETTE.ink, marginTop: 8, opacity: fade(f, 44) }}>
                        本のスポンサー動画
                    </div>
                    <div style={{ fontSize: 18, color: PALETTE.sub, marginTop: 8, opacity: fade(f, 56) }}>
                        2019年〜 Surfshark公式発表
                    </div>
                </div>
                {/* Dot grid representing each video */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 4,
                    padding: 16, background: '#fff', borderRadius: 16,
                    boxShadow: '0 12px 32px rgba(17,24,39,0.1)',
                    opacity: fade(f, 30),
                }}>
                    {dots.map((_, i) => (
                        <div key={i} style={{
                            width: 14, height: 14, borderRadius: 3,
                            background: PALETTE.primary, opacity: fade(f, 30 + (i * 0.15), 30 + (i * 0.15) + 2),
                        }} />
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 12: 競合に見える人たち ===============
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#D6EAFF', '#FFE3DC', '#E8E0FF']}>
        <div style={{ width: '100%' }}>
            <Eyebrow opacity={fade(f, 4)}>ところで</Eyebrow>
            <Headline color={PALETTE.ink} size={48}>
                <span style={{ opacity: fade(f, 8) }}>NordVPN と ExpressVPN は </span>
                <span style={{ color: PALETTE.warm, opacity: fade(f, 14) }}>別の会社</span>
                <span style={{ opacity: fade(f, 14) }}>、ですよね？</span>
            </Headline>
            <div style={{
                marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 100px 1fr', gap: 24, alignItems: 'center',
            }}>
                {[
                    { name: 'NordVPN', logo: 'brand-icons/nordvpn.svg', color: '#4687FF', from: 22 },
                ].map((b, i) => (
                    <div key={i} style={{
                        background: '#fff', borderRadius: 22, padding: '32px 20px', textAlign: 'center',
                        border: `4px solid ${b.color}`,
                        opacity: fade(f, b.from, b.from + 14),
                        transform: `translateX(${interpolate(f, [b.from, b.from + 14], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                        boxShadow: '0 16px 40px rgba(70,135,255,0.25)',
                    }}>
                        <Img src={staticFile(b.logo)} style={{ width: 130, height: 130 }} />
                        <div style={{ fontSize: 44, fontWeight: 900, color: b.color, marginTop: 8 }}>{b.name}</div>
                    </div>
                ))}
                <div style={{
                    fontSize: 80, fontWeight: 900, color: PALETTE.ink, textAlign: 'center',
                    opacity: fade(f, 38),
                }}>?</div>
                {[
                    { name: 'ExpressVPN', logo: 'brand-icons/expressvpn.svg', color: '#DA3940', from: 50 },
                ].map((b, i) => (
                    <div key={i} style={{
                        background: '#fff', borderRadius: 22, padding: '32px 20px', textAlign: 'center',
                        border: `4px solid ${b.color}`,
                        opacity: fade(f, b.from, b.from + 14),
                        transform: `translateX(${interpolate(f, [b.from, b.from + 14], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                        boxShadow: '0 16px 40px rgba(218,57,64,0.25)',
                    }}>
                        <Img src={staticFile(b.logo)} style={{ width: 130, height: 130 }} />
                        <div style={{ fontSize: 44, fontWeight: 900, color: b.color, marginTop: 8 }}>{b.name}</div>
                    </div>
                ))}
            </div>
            <div style={{
                marginTop: 28, fontSize: 26, color: PALETTE.sub, textAlign: 'center', fontWeight: 700,
                opacity: fade(f, 70),
            }}>
                運営会社の名前は確かに違う。でも……
            </div>
        </div>
    </Stage>
);

// =============== Scene 13: Kape傘下のブランド ===============
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    type Brand = { name: string; deal: string; year: number; logo?: string; initial?: string; color: string };
    const brands: Brand[] = [
        { name: 'ExpressVPN', deal: '$9.3億', year: 2021, logo: 'brand-icons/expressvpn.svg', color: '#DA3940' },
        { name: 'CyberGhost', deal: '€910万', year: 2017, initial: 'CG', color: '#FFB400' },
        { name: 'PIA', deal: '$1.27億', year: 2019, logo: 'brand-icons/privateinternetaccess.svg', color: '#5DDF5A' },
        { name: 'ZenMate', deal: '€480万', year: 2018, initial: 'ZM', color: '#FF7A00' },
    ];
    return (
        <Stage bgPalette={['#D6EAFF', '#E0EAFF', '#D6EAFF']}>
            <div style={{ width: '100%' }}>
                {/* Parent company box */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: fade(f, 4) }}>
                    <div style={{
                        fontSize: 16, fontWeight: 800, color: PALETTE.sub, letterSpacing: 4, marginBottom: 6,
                    }}>親会社</div>
                    <div style={{
                        padding: '14px 36px', background: '#fff', color: PALETTE.primaryDeep,
                        border: `4px solid ${PALETTE.primaryDeep}`,
                        borderRadius: 16, fontSize: 38, fontWeight: 900, letterSpacing: 1,
                        boxShadow: '0 12px 28px rgba(31,62,138,0.18)',
                    }}>
                        Kape Technologies
                    </div>
                </div>
                {/* Connection lines */}
                <svg viewBox="0 0 1600 80" style={{ width: '100%', height: 60 }}>
                    {[180, 580, 1020, 1420].map((x, i) => (
                        <line key={i} x1={800} y1={0} x2={x} y2={70}
                            stroke={PALETTE.primaryDeep} strokeWidth={2} opacity={fade(f, 22 + i * 4) * 0.5} />
                    ))}
                </svg>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: -10 }}>
                    {brands.map((b, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center',
                            borderTop: `6px solid ${b.color}`,
                            opacity: fade(f, 28 + i * 8, 28 + i * 8 + 14),
                            transform: `translateY(${rise(f, 28 + i * 8, 28 + i * 8 + 14, 16)}px)`,
                            boxShadow: '0 12px 28px rgba(17,24,39,0.1)',
                        }}>
                            <div style={{
                                width: 70, height: 70, margin: '0 auto 10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: '#F4F6FA', borderRadius: 14,
                            }}>
                                {b.logo ? (
                                    <Img src={staticFile(b.logo)} style={{ width: 50, height: 50 }} />
                                ) : (
                                    <div style={{ fontSize: 28, fontWeight: 900, color: b.color }}>{b.initial}</div>
                                )}
                            </div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: PALETTE.ink }}>{b.name}</div>
                            <div style={{ fontSize: 16, color: PALETTE.sub, marginTop: 4 }}>{b.year}</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: b.color, marginTop: 4 }}>{b.deal}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 14: Kapeの前歴 ===============
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#FFE3DC', '#E8E0FF', '#FFE3DC']}>
        <div style={{ width: '100%' }}>
            <Eyebrow opacity={fade(f, 2)}>Kapeの前歴</Eyebrow>
            <svg viewBox="0 0 1600 480" style={{ width: '100%', height: 'auto' }}>
                <line x1={150} y1={280} x2={1450} y2={280}
                    stroke={PALETTE.dim} strokeWidth={4} strokeDasharray="10 8"
                    style={{ opacity: fade(f, 4) }} />
                {/* Past: Crossrider */}
                <g style={{ opacity: fade(f, 14) }}>
                    <circle cx={400} cy={280} r={100} fill={PALETTE.dim} />
                    <text x={400} y={272} fontSize={28} fontWeight={900} textAnchor="middle" fill="#fff">
                        Crossrider
                    </text>
                    <text x={400} y={306} fontSize={20} fontWeight={700} textAnchor="middle" fill="#fff">
                        〜2018
                    </text>
                    <text x={400} y={140} fontSize={26} fontWeight={800} textAnchor="middle" fill={PALETTE.inkSoft}>
                        ブラウザ拡張SDK事業
                    </text>
                    <text x={400} y={170} fontSize={20} fontWeight={700} textAnchor="middle" fill={PALETTE.sub}>
                        セキュリティ各社が問題視した経緯あり
                    </text>
                </g>
                {/* Rebrand label */}
                <g style={{ opacity: fade(f, 38) }} transform="translate(800 250)">
                    <rect x={-110} y={-30} width={220} height={60} rx={12}
                        fill="#fff" stroke={PALETTE.primaryDeep} strokeWidth={3} />
                    <text x={0} y={6} fontSize={24} fontWeight={900} textAnchor="middle" fill={PALETTE.primaryDeep}>
                        2018年 社名変更
                    </text>
                    <text x={0} y={70} fontSize={20} fontWeight={700} textAnchor="middle" fill={PALETTE.sub}>
                        事業ピボットを公表
                    </text>
                </g>
                {/* Arrow */}
                <g style={{ opacity: fade(f, 44) }}>
                    <path d="M 510 280 L 700 280" stroke={PALETTE.ink} strokeWidth={4} fill="none" />
                    <path d="M 900 280 L 1100 280" stroke={PALETTE.ink} strokeWidth={4} fill="none" />
                    <polygon points="1090,272 1110,280 1090,288" fill={PALETTE.ink} />
                </g>
                {/* Future: Kape */}
                <g style={{ opacity: fade(f, 60) }}>
                    <circle cx={1200} cy={280} r={100} fill={PALETTE.primaryDeep} />
                    <text x={1200} y={272} fontSize={28} fontWeight={900} textAnchor="middle" fill="#fff">
                        Kape
                    </text>
                    <text x={1200} y={306} fontSize={20} fontWeight={700} textAnchor="middle" fill="#fff">
                        2018〜
                    </text>
                    <text x={1200} y={140} fontSize={26} fontWeight={800} textAnchor="middle" fill={PALETTE.primaryDeep}>
                        プライバシーVPNを買収
                    </text>
                    <text x={1200} y={170} fontSize={20} fontWeight={700} textAnchor="middle" fill={PALETTE.sub}>
                        ExpressVPN等を順次取得
                    </text>
                </g>
                {/* Neutral context note */}
                <text x={800} y={440} fontSize={22} fontWeight={700} textAnchor="middle" fill={PALETTE.sub}
                    style={{ opacity: fade(f, 76) }}>
                    出自を踏まえて評価する見方も根強い
                </text>
            </svg>
        </div>
    </Stage>
);

// =============== Scene 15: Nord傘下のブランド ===============
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#D6EAFF', '#E0EAFF', '#D6EAFF']}>
        <div style={{ width: '100%' }}>
            {/* Parent company box */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: fade(f, 4) }}>
                <div style={{
                    fontSize: 16, fontWeight: 800, color: PALETTE.sub, letterSpacing: 4, marginBottom: 6,
                }}>親会社</div>
                <div style={{
                    padding: '14px 36px', background: '#fff', color: PALETTE.primaryDeep,
                    border: `4px solid ${PALETTE.primaryDeep}`,
                    borderRadius: 16, fontSize: 38, fontWeight: 900, letterSpacing: 1,
                    boxShadow: '0 12px 28px rgba(31,62,138,0.18)',
                }}>
                    Nord Security
                </div>
            </div>
            <svg viewBox="0 0 1600 80" style={{ width: '100%', height: 60 }}>
                {[440, 1160].map((x, i) => (
                    <line key={i} x1={800} y1={0} x2={x} y2={70}
                        stroke={PALETTE.primaryDeep} strokeWidth={2} opacity={fade(f, 22 + i * 4) * 0.5} />
                ))}
            </svg>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30, marginTop: -8 }}>
                {[
                    { name: 'NordVPN', note: '本体（リトアニア発・2012）', color: '#4687FF', logo: 'brand-icons/nordvpn.svg', from: 28 },
                    { name: 'Surfshark', note: '2022年2月 経営統合', color: '#1EBFBF', logo: 'brand-icons/surfshark.svg', from: 44 },
                ].map((b, i) => (
                    <div key={i} style={{
                        background: '#fff', borderRadius: 22, padding: '24px 20px', textAlign: 'center',
                        borderTop: `8px solid ${b.color}`,
                        opacity: fade(f, b.from, b.from + 14),
                        transform: `translateY(${rise(f, b.from, b.from + 14, 20)}px)`,
                        boxShadow: '0 14px 36px rgba(17,24,39,0.1)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                    }}>
                        <Img src={staticFile(b.logo)} style={{ width: 110, height: 110 }} />
                        <div style={{ fontSize: 42, fontWeight: 900, color: b.color, lineHeight: 1 }}>{b.name}</div>
                        <div style={{ fontSize: 20, color: PALETTE.sub }}>{b.note}</div>
                    </div>
                ))}
            </div>
            <div style={{
                marginTop: 24, fontSize: 26, fontWeight: 800, color: PALETTE.ink, textAlign: 'center',
                opacity: fade(f, 64),
            }}>
                ブランドは別、<span style={{ color: PALETTE.warm }}>親会社は同じ</span>
            </div>
        </div>
    </Stage>
);

// =============== Scene 16: 見かけの多様性 ===============
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => {
    const top = [
        { name: 'NordVPN', logo: 'brand-icons/nordvpn.svg', side: 'right' },
        { name: 'ExpressVPN', logo: 'brand-icons/expressvpn.svg', side: 'left' },
        { name: 'Surfshark', logo: 'brand-icons/surfshark.svg', side: 'right' },
        { name: 'CyberGhost', initial: 'CG', side: 'left' },
        { name: 'PIA', logo: 'brand-icons/privateinternetaccess.svg', side: 'left' },
        { name: 'ZenMate', initial: 'ZM', side: 'left' },
    ];
    return (
        <Stage bgPalette={['#E8E0FF', '#D6EAFF', '#E8E0FF']}>
            <div style={{ width: '100%' }}>
                <Eyebrow opacity={fade(f, 4)}>表に見えるブランド</Eyebrow>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginTop: 10 }}>
                    {top.map((t, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 12, padding: 10,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                            opacity: fade(f, 8 + i * 4, 8 + i * 4 + 10),
                            boxShadow: '0 8px 18px rgba(17,24,39,0.08)',
                        }}>
                            <div style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {t.logo ? (
                                    <Img src={staticFile(t.logo)} style={{ width: 40, height: 40 }} />
                                ) : (
                                    <div style={{ fontSize: 18, fontWeight: 900, color: PALETTE.purple }}>{t.initial}</div>
                                )}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: PALETTE.ink }}>{t.name}</div>
                        </div>
                    ))}
                </div>
                {/* Funnel lines */}
                <svg viewBox="0 0 1600 100" style={{ width: '100%', height: 90, marginTop: 4 }}>
                    {top.map((t, i) => {
                        const x = 130 + i * 270;
                        const tx = t.side === 'left' ? 460 : 1140;
                        return (
                            <path key={i} d={`M ${x} 0 Q ${(x + tx) / 2} 60 ${tx} 90`}
                                stroke={t.side === 'left' ? PALETTE.purpleDeep : PALETTE.primaryDeep}
                                strokeWidth={3} fill="none" strokeDasharray="6 6"
                                style={{ opacity: fade(f, 36 + i * 3) }} />
                        );
                    })}
                </svg>
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 6,
                    opacity: fade(f, 56),
                }}>
                    {[
                        { name: 'Kape Technologies', color: PALETTE.primary },
                        { name: 'Nord Security', color: PALETTE.primaryDeep },
                    ].map((emp, i) => (
                        <div key={i} style={{
                            background: '#fff', color: emp.color,
                            padding: '20px 24px', borderRadius: 18, textAlign: 'center',
                            border: `4px solid ${emp.color}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                            boxShadow: `0 12px 28px ${emp.color}28`,
                        }}>
                            <div style={{
                                fontSize: 14, fontWeight: 800, color: PALETTE.sub, letterSpacing: 2,
                            }}>親会社</div>
                            <span style={{ fontSize: 30, fontWeight: 900 }}>{emp.name}</span>
                        </div>
                    ))}
                </div>
                <div style={{
                    fontSize: 26, fontWeight: 800, color: PALETTE.ink, textAlign: 'center', marginTop: 18,
                    opacity: fade(f, 76),
                }}>
                    多くの主要ブランドが、2社のグループに集約
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 17: 空港のハッカー ===============
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#FFE3DC', '#FFEBC2', '#FFE3DC']}>
        <div style={{ width: '100%' }}>
            <Eyebrow opacity={fade(f, 4)}>毎回出てくる広告台本</Eyebrow>
            {/* Speech bubble with airport scene */}
            <div style={{
                position: 'relative', marginTop: 14,
                background: '#fff', border: `4px dashed ${PALETTE.warm}`, borderRadius: 28,
                padding: '32px 44px',
                opacity: fade(f, 14),
                boxShadow: '0 16px 40px rgba(227,92,66,0.18)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    {/* Mini airport icon */}
                    <svg viewBox="0 0 100 100" width={120} height={120}>
                        <rect x={10} y={70} width={80} height={20} fill={PALETTE.dim} />
                        <path d="M 50 20 L 90 70 L 10 70 Z" fill={PALETTE.warm} />
                        <circle cx={50} cy={50} r={4} fill="#fff" />
                        <WifiWaves />
                    </svg>
                    <div>
                        <div style={{ fontSize: 32, fontWeight: 800, color: PALETTE.ink, lineHeight: 1.5 }}>
                            「空港の <span style={{ color: PALETTE.warm, fontWeight: 900 }}>Wi-Fi</span> で
                            <span style={{ color: PALETTE.warm, fontWeight: 900 }}>ハッカー</span> に狙われています」
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: PALETTE.ink, marginTop: 8 }}>
                            「だからこそ <span style={{ color: PALETTE.primaryDeep, fontWeight: 900 }}>VPN</span> で身を守りましょう」
                        </div>
                    </div>
                </div>
            </div>
            {/* Channel ditto */}
            <div style={{
                marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
            }}>
                {['Aチャンネル', 'Bチャンネル', 'Cチャンネル', 'Dチャンネル'].map((c, i) => (
                    <div key={i} style={{
                        background: '#fff', borderRadius: 12, padding: '14px 12px', textAlign: 'center',
                        borderLeft: `6px solid ${PALETTE.warm}`,
                        opacity: fade(f, 46 + i * 5, 46 + i * 5 + 10),
                        transform: `translateY(${rise(f, 46 + i * 5, 46 + i * 5 + 10, 12)}px)`,
                        boxShadow: '0 6px 16px rgba(17,24,39,0.06)',
                    }}>
                        <div style={{ fontSize: 18, color: PALETTE.sub, marginBottom: 4, fontWeight: 700 }}>{c}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: PALETTE.warm }}>同じセリフ</div>
                    </div>
                ))}
            </div>
        </div>
    </Stage>
);

// =============== Scene 18: 軍事レベルの中身 ===============
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#D6EAFF', '#E0EAFF', '#D6EAFF']}>
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: fade(f, 4) }}>
                <div style={{
                    fontSize: 32, fontWeight: 900, color: PALETTE.warm, padding: '6px 16px',
                    border: `3px dashed ${PALETTE.warm}`, borderRadius: 12, transform: 'rotate(-3deg)',
                }}>
                    「軍事レベルの暗号化」
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: PALETTE.sub }}>↓ 中身は</div>
            </div>
            {/* Big shield */}
            <div style={{
                marginTop: 18, display: 'flex', alignItems: 'center', gap: 32, justifyContent: 'center',
                opacity: fade(f, 26),
            }}>
                <div style={{ transform: `scale(${pop(f, 26, 46)})` }}>
                    <ShieldIcon size={140} color={PALETTE.primaryDeep} />
                </div>
                <div style={{
                    background: PALETTE.primaryDeep, color: '#fff', padding: '24px 36px',
                    borderRadius: 22, textAlign: 'center',
                    boxShadow: '0 18px 50px rgba(31,62,138,0.4)',
                }}>
                    <div style={{ fontSize: 100, fontWeight: 900, color: PALETTE.amber, lineHeight: 1, letterSpacing: -3 }}>
                        AES-256
                    </div>
                    <div style={{ fontSize: 22, marginTop: 4, opacity: 0.85, fontWeight: 700 }}>
                        標準的な暗号方式
                    </div>
                </div>
            </div>
            <div style={{
                marginTop: 18, fontSize: 26, fontWeight: 800, color: PALETTE.ink, textAlign: 'center',
                opacity: fade(f, 60),
            }}>
                ↓ 同じ暗号方式を使ってるサービス
            </div>
            <div style={{
                marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
            }}>
                {[
                    { kind: 'img', src: 'brand-icons/line.svg', w: 130, label: 'LINE' },
                    { kind: 'img', src: 'brand-icons/amazon.svg', w: 200, label: 'Amazon' },
                    { kind: 'text', emoji: '🏦', label: '銀行サイト' },
                ].map((it, i) => (
                    <div key={i} style={{
                        background: '#fff', borderRadius: 16, padding: '14px 12px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        minHeight: 110,
                        opacity: fade(f, 70 + i * 5, 70 + i * 5 + 12),
                        transform: `translateY(${rise(f, 70 + i * 5, 70 + i * 5 + 12, 14)}px)`,
                        boxShadow: '0 8px 22px rgba(17,24,39,0.1)',
                    }}>
                        {it.kind === 'img' ? (
                            <Img src={staticFile(it.src!)} style={{ width: it.w, height: 'auto', maxHeight: 56 }} />
                        ) : (
                            <div style={{ fontSize: 50, lineHeight: 1 }}>{it.emoji}</div>
                        )}
                        <div style={{ fontSize: 22, fontWeight: 800, color: PALETTE.ink, marginTop: 8 }}>
                            {it.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Stage>
);

// =============== Scene 19: 公衆Wi-Fiの現在 ===============
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#FFE3DC', '#E8F8E8', '#D6EAFF']}>
        <div style={{ width: '100%' }}>
            <Eyebrow opacity={fade(f, 2)}>公衆Wi-Fiの脅威、今は？</Eyebrow>
            <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                {/* Past panel */}
                <div style={{
                    background: '#fff', borderRadius: 22, padding: 26, position: 'relative',
                    borderLeft: `8px solid ${PALETTE.warm}`,
                    opacity: fade(f, 4), transform: `translateX(${interpolate(f, [4, 22], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    boxShadow: '0 14px 36px rgba(227,92,66,0.18)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                        <ShieldIcon size={70} color={PALETTE.warm} cracked />
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: PALETTE.sub, letterSpacing: 2 }}>
                                〜2010年代前半
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: PALETTE.warm }}>
                                盗聴リスク高
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: 22, color: PALETTE.ink, lineHeight: 1.6, fontWeight: 700 }}>
                        HTTPS非対応サイト多数<br />
                        → VPNの恐怖訴求が成立
                    </div>
                </div>
                {/* Present panel */}
                <div style={{
                    background: '#fff', borderRadius: 22, padding: 26, position: 'relative',
                    borderLeft: `8px solid ${PALETTE.emerald}`,
                    opacity: fade(f, 28), transform: `translateX(${interpolate(f, [28, 46], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    boxShadow: '0 14px 36px rgba(15,169,104,0.2)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                        <ShieldIcon size={70} color={PALETTE.emerald} />
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: PALETTE.sub, letterSpacing: 2 }}>
                                現在
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: PALETTE.emerald }}>
                                リスク大幅減
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: 22, color: PALETTE.ink, lineHeight: 1.6, fontWeight: 700 }}>
                        HTTPSが事実上の標準<br />
                        → 偽AP等、一部手口は残存
                    </div>
                </div>
            </div>
            <div style={{
                marginTop: 22, padding: '18px 24px', background: '#fff', borderRadius: 14,
                border: `2px dashed ${PALETTE.dim}`,
                opacity: fade(f, 60), textAlign: 'center',
            }}>
                <div style={{ fontSize: 18, color: PALETTE.sub, marginBottom: 4, fontWeight: 700 }}>
                    大手セキュリティ企業の研究者
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: PALETTE.ink }}>
                    「HTTPSが普及した今、公衆Wi-Fiのリスクは昔ほどではない」
                </div>
            </div>
        </div>
    </Stage>
);

// =============== Scene 20: テンプレ化の合理性 ===============
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => {
    const parties = [
        { name: 'VPN会社', gain: '仕上がりを計算できる', color: PALETTE.primary, dx: -460, from: 6 },
        { name: 'YouTuber', gain: '毎回書き直さずに済む', color: PALETTE.amber, dx: 0, from: 22 },
        { name: '視聴者', gain: '15秒で自分ごと化', color: PALETTE.warm, dx: 460, from: 38 },
    ];
    return (
        <Stage bgPalette={['#FFE3DC', '#FFEBC2', '#D6EAFF']}>
            <div style={{ width: '100%', position: 'relative' }}>
                <Eyebrow opacity={fade(f, 2)}>テンプレ化の合理性</Eyebrow>
                <Headline color={PALETTE.ink} size={42}>
                    全員の都合が <span style={{ color: PALETTE.primaryDeep }}>同じ方向</span> に揃う
                </Headline>
                {/* 3 sources converging */}
                <div style={{ position: 'relative', height: 380, marginTop: 30 }}>
                    {parties.map((p, i) => (
                        <div key={i} style={{
                            position: 'absolute', left: '50%', top: 30,
                            width: 280, marginLeft: -140,
                            transform: `translateX(${p.dx}px) translateY(${rise(f, p.from, p.from + 14, 24)}px)`,
                            opacity: fade(f, p.from, p.from + 14),
                            background: '#fff', borderRadius: 18, padding: '18px 16px', textAlign: 'center',
                            borderTop: `8px solid ${p.color}`,
                            boxShadow: '0 12px 30px rgba(17,24,39,0.12)',
                        }}>
                            <div style={{ fontSize: 28, fontWeight: 900, color: p.color }}>{p.name}</div>
                            <div style={{ fontSize: 20, color: PALETTE.ink, fontWeight: 800, lineHeight: 1.5, marginTop: 6 }}>
                                {p.gain}
                            </div>
                        </div>
                    ))}
                    {/* Convergence arrows */}
                    <svg viewBox="0 0 1200 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                        {[160, 600, 1040].map((x, i) => (
                            <path key={i} d={`M ${x} 200 Q ${(x + 600) / 2} 280 600 340`}
                                stroke={parties[i].color} strokeWidth={4} strokeDasharray="6 6" fill="none"
                                style={{ opacity: fade(f, 56 + i * 3) }} />
                        ))}
                        <g style={{ opacity: fade(f, 70) }}>
                            <rect x={460} y={320} width={280} height={50} rx={25} fill={PALETTE.primaryDeep} />
                            <text x={600} y={353} fontSize={26} fontWeight={900} textAnchor="middle" fill="#fff">
                                同じ型で再生産
                            </text>
                        </g>
                    </svg>
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 21: 反転の問いかけ ===============
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#E8E0FF', '#FFEBC2', '#FFE3DC']}>
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Eyebrow opacity={fade(f, 4)}>ここで大きな問い</Eyebrow>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40,
                marginTop: 30,
            }}>
                <div style={{
                    opacity: fade(f, 14), transform: `translateX(${interpolate(f, [14, 32], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    fontSize: 60, fontWeight: 900, color: PALETTE.ink, lineHeight: 1.2,
                }}>
                    広告で見るVPN
                </div>
                <div style={{
                    fontSize: 100, fontWeight: 900, color: PALETTE.warm,
                    opacity: fade(f, 32), transform: `scale(${pop(f, 32, 50)})`,
                }}>
                    ＝？
                </div>
                <div style={{
                    opacity: fade(f, 50), transform: `translateX(${interpolate(f, [50, 68], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    fontSize: 60, fontWeight: 900, color: PALETTE.ink, lineHeight: 1.2,
                }}>
                    良いVPN
                </div>
            </div>
            <div style={{
                marginTop: 50,
                display: 'inline-flex', alignItems: 'center', gap: 14, padding: '16px 32px',
                background: '#fff', color: PALETTE.primaryDeep,
                border: `3px solid ${PALETTE.primaryDeep}`,
                borderRadius: 999, fontSize: 28, fontWeight: 800,
                opacity: fade(f, 64), transform: `translateY(${rise(f, 64, 82, 16)}px)`,
                boxShadow: '0 10px 28px rgba(31,62,138,0.18)',
            }}>
                ここから少し角度を変えて
            </div>
        </div>
    </Stage>
);

// =============== Scene 22: 評価上位の3社 ===============
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => {
    type Top = { name: string; country: string; note: string;
        logo?: string; initial?: string; brandColor: string; medal: string };
    const top3: Top[] = [
        { name: 'Mullvad', country: 'Sweden', note: '広告を出さない',
          logo: 'brand-icons/mullvad.svg', brandColor: '#44475A', medal: '#FFD700' },
        { name: 'IVPN', country: 'Gibraltar', note: '老舗・小規模',
          initial: 'IVPN', brandColor: '#0066CC', medal: '#C0C0C0' },
        { name: 'Mozilla VPN', country: 'USA', note: 'Mullvadベース',
          logo: 'brand-icons/mozilla.svg', brandColor: '#000000', medal: '#CD7F32' },
    ];
    const heights = [220, 180, 160];
    return (
        <Stage bgPalette={['#FFF1D6', '#FFE8C4', '#FFF1D6']}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <TrophyIcon size={70} color={PALETTE.amber} />
                    <div>
                        <Eyebrow opacity={fade(f, 4)}>Consumer Reports（米）検証</Eyebrow>
                        <Headline color={PALETTE.ink} size={36}>
                            プライバシー評価 <span style={{ color: PALETTE.amber }}>上位3社</span>
                        </Headline>
                    </div>
                </div>
                {/* Podium */}
                <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, alignItems: 'end' }}>
                    {top3.map((t, i) => (
                        <div key={i} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            opacity: fade(f, 18 + i * 10, 18 + i * 10 + 16),
                            transform: `translateY(${rise(f, 18 + i * 10, 18 + i * 10 + 16, 24)}px)`,
                        }}>
                            <div style={{
                                background: '#fff', borderRadius: 18, padding: '20px 14px', textAlign: 'center',
                                width: '100%', boxShadow: '0 14px 36px rgba(17,24,39,0.12)',
                                border: `3px solid ${t.medal}`,
                            }}>
                                <div style={{
                                    width: 52, height: 52, margin: '0 auto 8px',
                                    background: t.medal, color: '#fff',
                                    fontSize: 28, fontWeight: 900, borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: `0 4px 12px ${t.medal}88`,
                                }}>{i + 1}</div>
                                <div style={{
                                    width: 100, height: 100, margin: '0 auto 8px',
                                    background: '#F4F6FA', borderRadius: 18,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {t.logo ? (
                                        <Img src={staticFile(t.logo)} style={{ width: 70, height: 70 }} />
                                    ) : (
                                        <div style={{ fontSize: 30, fontWeight: 900, color: t.brandColor }}>{t.initial}</div>
                                    )}
                                </div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: PALETTE.ink, lineHeight: 1.1 }}>{t.name}</div>
                                <div style={{ fontSize: 16, color: PALETTE.sub, marginTop: 2 }}>{t.country}</div>
                                <div style={{ height: 1, background: PALETTE.cardBorder, margin: '10px 12px' }} />
                                <div style={{ fontSize: 18, fontWeight: 800, color: PALETTE.primary }}>{t.note}</div>
                            </div>
                            <div style={{
                                width: '100%', height: heights[i], background: t.medal,
                                marginTop: -2, borderTopLeftRadius: 6, borderTopRightRadius: 6,
                                opacity: 0.85,
                            }} />
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 14, fontSize: 24, fontWeight: 800, color: PALETTE.warm, textAlign: 'center',
                    opacity: fade(f, 60),
                }}>
                    どこも聞いたことない会社
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 23: 広告と評価のズレ ===============
const Scene23: React.FC<SceneProps> = ({ localFrame: f }) => {
    const points = [
        { x: 85, y: 60, label: 'NordVPN', from: 10 },
        { x: 82, y: 65, label: 'ExpressVPN', from: 16 },
        { x: 75, y: 70, label: 'Surfshark', from: 22 },
        { x: 20, y: 15, label: 'Mullvad', from: 32 },
        { x: 15, y: 20, label: 'IVPN', from: 38 },
        { x: 25, y: 25, label: 'Mozilla VPN', from: 44 },
    ];
    return (
        <Stage bgPalette={['#E0EAFF', '#D6EAFF', '#E0EAFF']}>
            <div style={{ width: '100%' }}>
                <Eyebrow opacity={fade(f, 2)}>広告の量 × 評価</Eyebrow>
                <Headline color={PALETTE.ink} size={36}>
                    広告で目立つ層と評価上位層は <span style={{ color: PALETTE.primaryDeep }}>必ずしも一致しない</span>
                </Headline>
                <svg viewBox="0 0 1400 460" style={{ width: '100%', height: 'auto', marginTop: 12 }}>
                    <line x1={100} y1={460} x2={1350} y2={460} stroke={PALETTE.ink} strokeWidth={3} />
                    <line x1={100} y1={20} x2={100} y2={460} stroke={PALETTE.ink} strokeWidth={3} />
                    <text x={720} y={500} fontSize={22} fontWeight={800} textAnchor="middle" fill={PALETTE.ink}>
                        広告の多さ →
                    </text>
                    <text x={50} y={250} fontSize={22} fontWeight={800}
                        textAnchor="middle" fill={PALETTE.ink} transform="rotate(-90 50 250)">
                        評価 ↑
                    </text>
                    {points.map((p, i) => (
                        <g key={i} style={{ opacity: fade(f, p.from, p.from + 10) }}>
                            <circle cx={100 + (p.x / 100) * 1250} cy={460 - (p.y / 100) * 420}
                                r={18} fill={PALETTE.primary} stroke="#fff" strokeWidth={4} />
                            <text x={100 + (p.x / 100) * 1250 + 26} y={460 - (p.y / 100) * 420 + 8}
                                fontSize={22} fontWeight={800} fill={PALETTE.ink}>
                                {p.label}
                            </text>
                        </g>
                    ))}
                </svg>
                <div style={{
                    fontSize: 22, fontWeight: 700, color: PALETTE.sub, textAlign: 'center', marginTop: 8,
                    opacity: fade(f, 56),
                }}>
                    両者は別の力学で動いている、と捉える方が自然
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 24: レビューサイトの所有関係 ===============
const Scene24: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#D6EAFF', '#E0EAFF', '#D6EAFF']}>
        <div style={{ width: '100%' }}>
            <Eyebrow opacity={fade(f, 2)}>レビューサイトの所有関係</Eyebrow>
            <svg viewBox="0 0 1600 480" style={{ width: '100%', height: 'auto', marginTop: 8 }}>
                <defs>
                    <marker id="arr24" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                        <path d="M 0 0 L 12 7 L 0 14 z" fill={PALETTE.primaryDeep} />
                    </marker>
                </defs>
                {/* Top: Kape (parent) */}
                <g style={{ opacity: fade(f, 6) }}>
                    <rect x={580} y={20} width={440} height={100} rx={18}
                        fill="#fff" stroke={PALETTE.primaryDeep} strokeWidth={4} />
                    <text x={800} y={56} fontSize={18} fontWeight={800} textAnchor="middle" fill={PALETTE.sub} letterSpacing={3}>
                        親会社
                    </text>
                    <text x={800} y={94} fontSize={34} fontWeight={900} textAnchor="middle" fill={PALETTE.primaryDeep}>
                        Kape Technologies
                    </text>
                </g>
                {/* Reviewer sites */}
                <g style={{ opacity: fade(f, 22) }}>
                    <rect x={120} y={200} width={280} height={100} rx={16}
                        fill="#fff" stroke={PALETTE.primary} strokeWidth={3} />
                    <text x={260} y={240} fontSize={16} fontWeight={800} textAnchor="middle" fill={PALETTE.sub}>
                        レビューサイト
                    </text>
                    <text x={260} y={278} fontSize={28} fontWeight={900} textAnchor="middle" fill={PALETTE.ink}>
                        vpnMentor
                    </text>
                    <rect x={450} y={200} width={280} height={100} rx={16}
                        fill="#fff" stroke={PALETTE.primary} strokeWidth={3} />
                    <text x={590} y={240} fontSize={16} fontWeight={800} textAnchor="middle" fill={PALETTE.sub}>
                        レビューサイト
                    </text>
                    <text x={590} y={278} fontSize={28} fontWeight={900} textAnchor="middle" fill={PALETTE.ink}>
                        Wizcase
                    </text>
                </g>
                {/* Lines from parent to reviewers */}
                <g style={{ opacity: fade(f, 36) * 0.6 }}>
                    <line x1={650} y1={120} x2={300} y2={195} stroke={PALETTE.primaryDeep} strokeWidth={2} />
                    <line x1={750} y1={120} x2={580} y2={195} stroke={PALETTE.primaryDeep} strokeWidth={2} />
                </g>
                {/* Ranking output */}
                <g style={{ opacity: fade(f, 50) }}>
                    <rect x={830} y={200} width={650} height={100} rx={16}
                        fill="#fff" stroke={PALETTE.primary} strokeWidth={3} />
                    <text x={1155} y={236} fontSize={18} fontWeight={800} textAnchor="middle" fill={PALETTE.sub}>
                        ベストVPNランキング記事
                    </text>
                    <text x={1155} y={278} fontSize={26} fontWeight={900} textAnchor="middle" fill={PALETTE.ink}>
                        1位: ExpressVPN / 2位: CyberGhost
                    </text>
                </g>
                {/* Neutral connection arrow */}
                <g style={{ opacity: fade(f, 64) * 0.7 }}>
                    <path d="M 730 250 L 820 250" stroke={PALETTE.primaryDeep} strokeWidth={3} markerEnd="url(#arr24)" />
                </g>
                {/* Neutral observation note */}
                <g style={{ opacity: fade(f, 78) }}>
                    <text x={800} y={400} fontSize={22} fontWeight={800} fill={PALETTE.ink} textAnchor="middle">
                        評価する側も、評価される側も、同じグループに属するケースがある
                    </text>
                    <text x={800} y={432} fontSize={18} fontWeight={700} fill={PALETTE.sub} textAnchor="middle">
                        利益相反の可能性は読み手が知っておきたい論点
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// =============== Scene 25: 見分けるヒント ===============
const Scene25: React.FC<SceneProps> = ({ localFrame: f }) => {
    const steps = [
        { n: 1, t: '運営会社を確認', s: 'まず誰が作ってるか' },
        { n: 2, t: 'フッターを辿る', s: '小さな「運営」リンク' },
        { n: 3, t: '英語名で検索', s: '親会社は海外名義が多い' },
    ];
    return (
        <Stage bgPalette={['#D6EAFF', '#E0EAFF', '#D6EAFF']}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <MagnifierIcon size={70} color={PALETTE.primary} />
                    <Headline color={PALETTE.ink} size={42}>
                        ランキング記事を <span style={{ color: PALETTE.primary }}>もう一歩</span> 確かめる3ステップ
                    </Headline>
                </div>
                <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
                    {steps.map((s, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 22, padding: '24px 20px',
                            position: 'relative',
                            borderLeft: `8px solid ${PALETTE.primary}`,
                            opacity: fade(f, 14 + i * 12, 14 + i * 12 + 16),
                            transform: `translateY(${rise(f, 14 + i * 12, 14 + i * 12 + 16)}px)`,
                            boxShadow: '0 14px 36px rgba(62,111,217,0.18)',
                        }}>
                            <div style={{
                                width: 60, height: 60, borderRadius: '50%',
                                background: PALETTE.primary, color: '#fff',
                                fontSize: 32, fontWeight: 900, lineHeight: '60px', textAlign: 'center',
                                marginBottom: 14,
                            }}>{s.n}</div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: PALETTE.ink, lineHeight: 1.3 }}>
                                {s.t}
                            </div>
                            <div style={{ fontSize: 18, color: PALETTE.sub, fontWeight: 700, marginTop: 6 }}>{s.s}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 26, fontSize: 26, fontWeight: 800, color: PALETTE.sub, textAlign: 'center',
                    opacity: fade(f, 60),
                }}>
                    評価そのものに加えて、<span style={{ color: PALETTE.primary }}>運営の所有関係</span>も視野に
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 26: 4つの理由を回収 ===============
const Scene26: React.FC<SceneProps> = ({ localFrame: f }) => {
    const parts = [
        { t: 'サブスク継続', color: PALETTE.amber },
        { t: 'YouTube相性', color: PALETTE.warm },
        { t: '2社の帝国', color: PALETTE.purple },
        { t: 'テンプレ化', color: PALETTE.emerald },
    ];
    return (
        <Stage bgPalette={['#D6EAFF', '#E0EAFF', '#FFEBC2']}>
            <div style={{ width: '100%' }}>
                <Eyebrow opacity={fade(f, 4)}>VPN広告が多い理由</Eyebrow>
                <Headline color={PALETTE.ink} size={42}>
                    <span style={{ color: PALETTE.primaryDeep }}>4つの構造</span> の組み合わせ
                </Headline>
                <div style={{
                    marginTop: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap',
                }}>
                    {parts.map((p, i) => (
                        <React.Fragment key={i}>
                            <div style={{
                                background: p.color, color: '#fff', padding: '20px 24px', borderRadius: 16,
                                fontSize: 26, fontWeight: 900,
                                opacity: fade(f, 14 + i * 8, 14 + i * 8 + 14),
                                transform: `translateY(${rise(f, 14 + i * 8, 14 + i * 8 + 14)}px)`,
                                boxShadow: `0 14px 30px ${p.color}55`,
                            }}>
                                {p.t}
                            </div>
                            {i < parts.length - 1 && (
                                <div style={{
                                    fontSize: 48, fontWeight: 900, color: PALETTE.ink,
                                    opacity: fade(f, 22 + i * 8),
                                }}>×</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div style={{
                    marginTop: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
                    opacity: fade(f, 56),
                }}>
                    <div style={{ fontSize: 60, fontWeight: 900, color: PALETTE.ink }}>＝</div>
                    <div style={{
                        padding: '20px 36px', background: PALETTE.primaryDeep, color: '#fff',
                        borderRadius: 18, fontSize: 32, fontWeight: 900,
                        boxShadow: '0 18px 40px rgba(31,62,138,0.4)',
                    }}>
                        危機の大きさより、経済の仕組みが理由
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 27: VPNの用途 ===============
const Scene27: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cases = [
        { title: '海外で日本の番組', emoji: '✈️', note: 'TVer / ABEMA / 地上波配信', color: PALETTE.primary },
        { title: '中国で普段のネット', emoji: '🌏', note: '金盾を越える実用ツール', color: PALETTE.warm },
        { title: '地域別価格差', emoji: '💳', note: 'サブスク価格の違い', color: PALETTE.amber },
    ];
    return (
        <Stage bgPalette={['#D6EAFF', '#FFEBC2', '#FFE3DC']}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <TunnelIcon size={70} color={PALETTE.primary} />
                    <Headline color={PALETTE.ink} size={42}>
                        用途が合えば、VPNは<span style={{ color: PALETTE.primary }}>便利</span>
                    </Headline>
                </div>
                <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
                    {cases.map((c, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 22, padding: '28px 20px', textAlign: 'center',
                            borderTop: `8px solid ${c.color}`,
                            opacity: fade(f, 14 + i * 10, 14 + i * 10 + 16),
                            transform: `translateY(${rise(f, 14 + i * 10, 14 + i * 10 + 16)}px)`,
                            boxShadow: '0 14px 36px rgba(17,24,39,0.1)',
                        }}>
                            <div style={{ fontSize: 64, marginBottom: 10 }}>{c.emoji}</div>
                            <div style={{ fontSize: 26, fontWeight: 900, color: c.color, marginBottom: 8 }}>
                                {c.title}
                            </div>
                            <div style={{ fontSize: 18, color: PALETTE.sub, fontWeight: 700, lineHeight: 1.4 }}>{c.note}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 26, fontSize: 24, fontWeight: 800, color: PALETTE.sub, textAlign: 'center',
                    opacity: fade(f, 60),
                }}>
                    でも「プライバシー完全防御の魔法」ではない
                </div>
            </div>
        </Stage>
    );
};

// =============== Scene 28: 次の広告を見たとき ===============
const Scene28: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage bgPalette={['#E0EAFF', '#FFEBC2', '#E8E0FF']}>
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Eyebrow opacity={fade(f, 4)}>今日の持ち帰り</Eyebrow>
            <div style={{
                marginTop: 24,
                fontSize: 60, fontWeight: 900, color: PALETTE.ink, lineHeight: 1.4,
                opacity: fade(f, 14),
            }}>
                広告の<span style={{ color: PALETTE.warm }}>「量」</span>ではなく
            </div>
            <div style={{
                marginTop: 4,
                fontSize: 84, fontWeight: 900, color: PALETTE.primaryDeep, lineHeight: 1.3,
                opacity: fade(f, 30), transform: `scale(${pop(f, 30, 50)})`,
                letterSpacing: -2,
            }}>
                「流れ」を見る
            </div>
            <div style={{
                marginTop: 36, padding: 20,
                background: '#fff', borderLeft: `6px solid ${PALETTE.primary}`, borderRadius: 12,
                fontSize: 22, color: PALETTE.ink, fontWeight: 700, maxWidth: 900, margin: '36px auto 0',
                opacity: fade(f, 56), lineHeight: 1.6, textAlign: 'left',
            }}>
                同じ構造は、語学アプリ・マッチングアプリ・<br />
                ゲーム課金など、他のサブスク商品にもある
            </div>
        </div>
    </Stage>
);

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9,
    Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16, Scene17, Scene18, Scene19,
    Scene20, Scene21, Scene22, Scene23, Scene24, Scene25, Scene26, Scene27, Scene28,
];

export const SCENE_TITLES: string[] = [
    '広告が多すぎる', '今日の問い', '4つの論点', '順路を示す',
    'VPNは継続課金', '紹介報酬の異常値', 'ExpressVPNの固定額', '他ジャンルとの比較',
    '広告媒体の比較', '信頼のお裾分け', 'ExpressVPNの流入', '視聴者の体感',
    '競合に見える人たち', 'Kape傘下のブランド', 'Kapeの前歴', 'Nord傘下のブランド',
    '見かけの多様性', '空港のハッカー', '軍事レベルの中身', '公衆Wi-Fiの現在',
    'テンプレ化の合理性', '反転の問いかけ', '評価上位の3社', '広告と評価のズレ',
    'レビューサイトの所有関係', '記事を確かめる手順', '4つの理由を回収', 'VPNの用途',
    '次の広告を見たとき',
];
