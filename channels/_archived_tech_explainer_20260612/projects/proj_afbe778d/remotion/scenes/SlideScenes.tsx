import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

// ============================================================================
// Palette: machine-blue × human-amber × accent
// 青＝機械・論理、琥珀＝人間・理解、ローズ＝問題、エメラルド＝整理成功、紫＝思考
// ============================================================================
const P = {
    ...BASE_COLORS,
    primary: '#2563EB',
    primaryDeep: '#1E3A8A',
    primaryGlow: 'rgba(37, 99, 235, 0.22)',
    accent: '#F59E0B',         // human/understanding amber
    accentDeep: '#B45309',
    warm: '#F97316',
    rose: '#EF4444',
    emerald: '#10B981',
    violet: '#8B5CF6',
    ink: '#0F172A',
    paper: '#FFFFFF',
    muted: '#94A3B8',
    gridLine: 'rgba(30, 58, 138, 0.10)',
};

// ============================================================================
// Helpers
// ============================================================================
const fade = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const riseY = (f: number, from: number, to = from + 18, dist = 16) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const scaleIn = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Stage: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: 80, paddingRight: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
        {children}
    </div>
);

const GridBg: React.FC<{ opacity?: number }> = ({ opacity = 0.6 }) => (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity }}>
        <defs>
            <pattern id="grid-bg-prog" width={60} height={60} patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={P.gridLine} strokeWidth={1} />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bg-prog)" />
    </svg>
);

// ============================================================================
// Scene 0: 素朴な疑問（オープニング）
// ============================================================================
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
                fontSize: 36, color: P.textDim, marginBottom: 28,
                opacity: fade(f, 0, 14),
                transform: `translateY(${riseY(f, 0, 14)}px)`,
            }}>
                プログラマって、
            </div>
            <div style={{
                fontSize: 118, fontWeight: 900, color: P.primaryDeep, lineHeight: 1.25,
                opacity: fade(f, 15, 34),
                transform: `translateY(${riseY(f, 15, 34, 24)}px)`,
            }}>
                結局<span style={{ color: P.accent }}>何してる</span>の？
            </div>
            <div style={{
                marginTop: 50, fontSize: 42, color: P.textDim, fontWeight: 700,
                opacity: fade(f, 60, 80),
            }}>
                ──3つの素朴なイメージを、ひっくり返す
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 1: 3つの違和感
// ============================================================================
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cards = [
        { n: 1, label: 'コードを書く', sub: 'は、主役じゃない' },
        { n: 2, label: '書いた順に', sub: '実行されていない' },
        { n: 3, label: '最初のプログラマ', sub: 'は、文字を打っていない' },
    ];
    return (
        <Stage>
            <GridBg />
            <div style={{ display: 'flex', gap: 36 }}>
                {cards.map((c, i) => (
                    <div key={i} style={{
                        width: 410, padding: '48px 36px',
                        background: P.paper,
                        border: `3px solid ${P.primaryDeep}`,
                        borderRadius: 24,
                        boxShadow: '0 14px 36px rgba(30, 58, 138, 0.15)',
                        textAlign: 'center',
                        opacity: fade(f, 10 + i * 20),
                        transform: `translateY(${riseY(f, 10 + i * 20, 10 + i * 20 + 18, 30)}px)`,
                    }}>
                        <div style={{
                            width: 88, height: 88, borderRadius: '50%',
                            background: P.accent, color: P.paper,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 54, fontWeight: 900,
                            margin: '0 auto 24px',
                        }}>{c.n}</div>
                        <div style={{ fontSize: 36, fontWeight: 800, color: P.primaryDeep, lineHeight: 1.3 }}>
                            {c.label}
                        </div>
                        <div style={{ fontSize: 30, color: P.text, marginTop: 16, fontWeight: 700 }}>
                            {c.sub}
                        </div>
                    </div>
                ))}
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 2: 見取り図（Roadmap）
// ============================================================================
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const stops = ['プログラマの1日', 'CPUの中', '歴史の始まり', '本当の定義'];
    return (
        <Stage>
            <GridBg />
            <div style={{ position: 'relative', width: 1400, height: 300 }}>
                {/* Path */}
                <svg width={1400} height={180} style={{ position: 'absolute', top: 60, left: 0 }}>
                    <path
                        d="M 80 90 Q 400 20 720 90 T 1320 90"
                        fill="none"
                        stroke={P.primary}
                        strokeWidth={5}
                        strokeDasharray="12 8"
                        strokeLinecap="round"
                        style={{ opacity: fade(f, 5) }}
                    />
                </svg>
                {stops.map((s, i) => {
                    const x = 80 + (i * (1240 / 3));
                    const yOff = i % 2 === 0 ? 50 : 120;
                    return (
                        <div key={i} style={{
                            position: 'absolute',
                            left: x - 150, top: yOff,
                            width: 300,
                            textAlign: 'center',
                            opacity: fade(f, 14 + i * 14),
                            transform: `translateY(${riseY(f, 14 + i * 14, 14 + i * 14 + 18, 16)}px)`,
                        }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: '50%',
                                background: P.accent, color: P.paper,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 32, fontWeight: 900,
                                margin: '0 auto 12px',
                                border: `4px solid ${P.paper}`,
                                boxShadow: `0 0 0 4px ${P.primary}`,
                            }}>{i + 1}</div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: P.primaryDeep }}>{s}</div>
                        </div>
                    );
                })}
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 3: 1日の中身（Donut breakdown）
// ============================================================================
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => {
    // Donut: 書く 15% / デバッグ 40% / 読む 25% / 会議・ツール等 20%
    const segs = [
        { label: 'コードを書く', pct: 15, color: P.accent, off: 0 },
        { label: 'デバッグ（直す）', pct: 40, color: P.rose, off: 15 },
        { label: '読む', pct: 25, color: P.primary, off: 55 },
        { label: '会議・ツール・他', pct: 20, color: P.violet, off: 80 },
    ];
    const CX = 300, CY = 300, R = 230, STROKE = 90;
    const C = 2 * Math.PI * R;
    const progress = interpolate(f, [10, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
                <svg width={600} height={600}>
                    <circle cx={CX} cy={CY} r={R} fill="none" stroke="#E5E7EB" strokeWidth={STROKE} />
                    {segs.map((s, i) => {
                        const dash = (s.pct / 100) * C * progress;
                        const dashArray = `${dash} ${C}`;
                        const dashOffset = -((s.off / 100) * C);
                        return (
                            <circle
                                key={i}
                                cx={CX} cy={CY} r={R}
                                fill="none"
                                stroke={s.color}
                                strokeWidth={STROKE}
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                transform={`rotate(-90 ${CX} ${CY})`}
                                strokeLinecap="butt"
                            />
                        );
                    })}
                    <text x={CX} y={CY - 20} textAnchor="middle" fontSize={48} fontWeight={900} fill={P.ink}>
                        1日の
                    </text>
                    <text x={CX} y={CY + 40} textAnchor="middle" fontSize={48} fontWeight={900} fill={P.ink}>
                        中身
                    </text>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                    {segs.map((s, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 20,
                            opacity: fade(f, 55 + i * 10),
                            transform: `translateY(${riseY(f, 55 + i * 10)}px)`,
                        }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color }} />
                            <div>
                                <div style={{ fontSize: 36, fontWeight: 800, color: P.ink }}>{s.label}</div>
                                <div style={{ fontSize: 30, fontWeight: 900, color: s.color }}>{s.pct}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 4: もう一つの主役（読む vs 書く 10:1）
// ============================================================================
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    const writeBarW = 80;
    const readBarW = interpolate(f, [20, 60], [80, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <div style={{ width: 1400 }}>
                <div style={{
                    fontSize: 54, fontWeight: 900, color: P.primaryDeep, textAlign: 'center', marginBottom: 70,
                    opacity: fade(f, 0),
                }}>
                    書く時間の<span style={{ color: P.accent }}>10倍</span>、読んでいる
                </div>

                {/* Write bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 40, opacity: fade(f, 10) }}>
                    <div style={{ width: 240, textAlign: 'right', fontSize: 44, fontWeight: 800, color: P.ink }}>書く</div>
                    <div style={{
                        width: writeBarW, height: 80,
                        background: P.primary, borderRadius: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: P.paper, fontSize: 32, fontWeight: 900,
                    }}>1</div>
                </div>

                {/* Read bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 40, opacity: fade(f, 15) }}>
                    <div style={{ width: 240, textAlign: 'right', fontSize: 44, fontWeight: 800, color: P.ink }}>読む</div>
                    <div style={{
                        width: readBarW, height: 80,
                        background: `linear-gradient(90deg, ${P.accent} 0%, ${P.warm} 100%)`,
                        borderRadius: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 24,
                        color: P.paper, fontSize: 32, fontWeight: 900,
                        boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)',
                    }}>10</div>
                </div>

                <div style={{ textAlign: 'center', marginTop: 60, fontSize: 34, color: P.textDim, fontWeight: 700, opacity: fade(f, 70) }}>
                    「書く前に、必ず読む」
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 5: タイピング以外（Non-typing activities）
// ============================================================================
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    const acts = ['会議', '検索', 'ツール操作', 'ドキュメント書き', '環境の準備', '考える'];
    return (
        <Stage>
            <div style={{ width: 1400 }}>
                <div style={{ fontSize: 50, fontWeight: 900, color: P.primaryDeep, textAlign: 'center', marginBottom: 56, opacity: fade(f, 0) }}>
                    キーボードを叩かない時間
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
                    {acts.map((a, i) => (
                        <div key={i} style={{
                            height: 130,
                            background: P.paper,
                            border: `3px solid ${P.violet}`,
                            borderRadius: 20,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 40, fontWeight: 800, color: P.ink,
                            opacity: fade(f, 8 + i * 8),
                            transform: `translateY(${riseY(f, 8 + i * 8, 8 + i * 8 + 18, 18)}px) scale(${scaleIn(f, 8 + i * 8)})`,
                            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.12)',
                        }}>
                            {a}
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 6: コードの順番（out-of-order）
// ============================================================================
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    const written = ['A', 'B', 'C', 'D'];
    const executed = ['B', 'A', 'D', 'C'];
    const cellStyle = (extra: React.CSSProperties = {}) => ({
        width: 130, height: 130, borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 70, fontWeight: 900, color: P.paper,
        ...extra,
    } as React.CSSProperties);
    return (
        <Stage>
            <div style={{ width: 1400 }}>
                {/* Written order */}
                <div style={{ marginBottom: 60, opacity: fade(f, 0) }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: P.ink, marginBottom: 22 }}>書いた順</div>
                    <div style={{ display: 'flex', gap: 28 }}>
                        {written.map((c, i) => (
                            <div key={i} style={cellStyle({ background: P.primary })}>{c}</div>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <div style={{ textAlign: 'center', fontSize: 44, color: P.rose, marginBottom: 30, opacity: fade(f, 20) }}>↓ CPU の中では</div>

                {/* Executed order */}
                <div style={{ opacity: fade(f, 30) }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: P.ink, marginBottom: 22 }}>実行された順</div>
                    <div style={{ display: 'flex', gap: 28 }}>
                        {executed.map((c, i) => (
                            <div key={i} style={cellStyle({
                                background: c === 'A' || c === 'C' ? P.accent : P.warm,
                                opacity: fade(f, 30 + i * 6),
                                transform: `translateY(${riseY(f, 30 + i * 6)}px)`,
                            })}>{c}</div>
                        ))}
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 7: 先回りの仕組み（Speculative execution）
// ============================================================================
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg width={1300} height={620} viewBox="0 0 1300 620">
            {/* Diamond decision */}
            <g opacity={fade(f, 0)}>
                <polygon points="650,40 830,170 650,300 470,170" fill={P.paper} stroke={P.primaryDeep} strokeWidth={4} />
                <text x={650} y={160} textAnchor="middle" fontSize={34} fontWeight={800} fill={P.ink}>もしA？</text>
                <text x={650} y={210} textAnchor="middle" fontSize={26} fill={P.textDim}>（まだ判定前）</text>
            </g>
            {/* Branch A (guess, speculative) */}
            <g opacity={fade(f, 15)}>
                <line x1={470} y1={230} x2={280} y2={400} stroke={P.accent} strokeWidth={5} strokeDasharray="10 6" />
                <rect x={120} y={400} width={320} height={140} rx={24} fill={P.accent} />
                <text x={280} y={460} textAnchor="middle" fontSize={34} fontWeight={800} fill={P.paper}>A のほう</text>
                <text x={280} y={510} textAnchor="middle" fontSize={26} fill={P.paper}>（推測で先に実行）</text>
            </g>
            {/* Branch B (not executed) */}
            <g opacity={fade(f, 35)}>
                <line x1={830} y1={230} x2={1020} y2={400} stroke={P.muted} strokeWidth={3} />
                <rect x={860} y={400} width={320} height={140} rx={24} fill="#E5E7EB" stroke={P.muted} strokeWidth={2} />
                <text x={1020} y={460} textAnchor="middle" fontSize={34} fontWeight={800} fill={P.textDim}>B のほう</text>
                <text x={1020} y={510} textAnchor="middle" fontSize={26} fill={P.textDim}>（待機）</text>
            </g>
            {/* Caption */}
            <g opacity={fade(f, 55)}>
                <text x={650} y={590} textAnchor="middle" fontSize={32} fontWeight={800} fill={P.rose}>
                    外れたら、こっそり巻き戻す
                </text>
            </g>
        </svg>
    </Stage>
);

// ============================================================================
// Scene 8: 順番の幻想（Illusion of order）
// ============================================================================
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 50, fontWeight: 900, color: P.primaryDeep, marginBottom: 60, opacity: fade(f, 0) }}>
                結果さえ合えば、順番は気にされない
            </div>
            <div style={{ display: 'flex', gap: 60, justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ opacity: fade(f, 10) }}>
                    <div style={{ fontSize: 28, color: P.textDim, marginBottom: 16 }}>書いた順</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {['A', 'B', 'C', 'D'].map((c, i) => (
                            <div key={i} style={{
                                width: 160, height: 60,
                                background: P.primary, color: P.paper,
                                borderRadius: 12,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 32, fontWeight: 800,
                            }}>{c}</div>
                        ))}
                    </div>
                </div>
                <div style={{ fontSize: 64, color: P.muted, opacity: fade(f, 20) }}>→</div>
                <div style={{ opacity: fade(f, 25) }}>
                    <div style={{ fontSize: 28, color: P.textDim, marginBottom: 16 }}>実機の中</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {['B', 'D', 'A', 'C'].map((c, i) => (
                            <div key={i} style={{
                                width: 160, height: 60,
                                background: P.warm, color: P.paper,
                                borderRadius: 12,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 32, fontWeight: 800,
                            }}>{c}</div>
                        ))}
                    </div>
                </div>
                <div style={{ fontSize: 64, color: P.muted, opacity: fade(f, 35) }}>=</div>
                <div style={{ opacity: fade(f, 40) }}>
                    <div style={{ fontSize: 28, color: P.textDim, marginBottom: 16 }}>最終結果</div>
                    <div style={{
                        width: 200, height: 260,
                        background: P.emerald, color: P.paper,
                        borderRadius: 20,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 80, fontWeight: 900,
                        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                    }}>✓</div>
                </div>
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 9: 最初のプログラマ（ENIAC 6 women）
// ============================================================================
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, fontWeight: 700, color: P.textDim, marginBottom: 14, opacity: fade(f, 0) }}>
                1945年 — 世界初の汎用電子計算機
            </div>
            <div style={{ fontSize: 96, fontWeight: 900, color: P.primaryDeep, marginBottom: 50, opacity: fade(f, 10) }}>
                ENIAC
            </div>
            <div style={{
                display: 'flex', gap: 24, justifyContent: 'center',
                opacity: fade(f, 26),
            }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{
                        width: 110, height: 110, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${P.accent}, ${P.warm})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: P.paper, fontSize: 52, fontWeight: 900,
                        boxShadow: '0 8px 20px rgba(245, 158, 11, 0.35)',
                        opacity: fade(f, 26 + i * 5),
                        transform: `scale(${scaleIn(f, 26 + i * 5)})`,
                    }}>♀</div>
                ))}
            </div>
            <div style={{
                marginTop: 40, fontSize: 44, fontWeight: 800, color: P.ink,
                opacity: fade(f, 65),
            }}>
                最初のプログラマは、<span style={{ color: P.accent }}>6人の女性</span>
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 10: 物理配線（Physical wiring）
// ============================================================================
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg width={1400} height={620} viewBox="0 0 1400 620">
            {/* Machine panel */}
            <rect x={100} y={60} width={1200} height={420} rx={28} fill={P.paper} stroke={P.primaryDeep} strokeWidth={5} opacity={fade(f, 0)} />

            {/* Switch rows (top) */}
            {Array.from({ length: 14 }).map((_, i) => {
                const x = 180 + i * 75;
                return (
                    <g key={`sw-${i}`} opacity={fade(f, 10 + i * 2)}>
                        <circle cx={x} cy={120} r={18} fill={i % 3 === 0 ? P.accent : P.muted} stroke={P.ink} strokeWidth={3} />
                        <line x1={x} y1={120} x2={x + (i % 2 ? -8 : 8)} y2={102} stroke={P.ink} strokeWidth={3} strokeLinecap="round" />
                    </g>
                );
            })}
            {/* Switch rows (middle) */}
            {Array.from({ length: 14 }).map((_, i) => {
                const x = 180 + i * 75;
                return (
                    <g key={`sw2-${i}`} opacity={fade(f, 15 + i * 2)}>
                        <circle cx={x} cy={180} r={18} fill={i % 2 === 0 ? P.accent : P.muted} stroke={P.ink} strokeWidth={3} />
                    </g>
                );
            })}

            {/* Cable patch */}
            {Array.from({ length: 8 }).map((_, i) => {
                const sx = 220 + i * 150;
                const ex = 280 + ((i + 3) % 8) * 150;
                const cy = 380 + (i % 3) * 30;
                return (
                    <path
                        key={`cable-${i}`}
                        d={`M ${sx} 260 C ${sx} ${cy}, ${ex} ${cy}, ${ex} 260`}
                        fill="none"
                        stroke={['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'][i % 5]}
                        strokeWidth={7}
                        strokeLinecap="round"
                        opacity={fade(f, 30 + i * 4)}
                    />
                );
            })}
            {/* Cable sockets */}
            {Array.from({ length: 8 }).map((_, i) => {
                const x = 220 + i * 150;
                return <circle key={`so-${i}`} cx={x} cy={260} r={14} fill={P.ink} opacity={fade(f, 5)} />;
            })}

            {/* Caption */}
            <text x={700} y={555} textAnchor="middle" fontSize={42} fontWeight={900} fill={P.primaryDeep} opacity={fade(f, 60)}>
                キーボードは、無い
            </text>
        </svg>
    </Stage>
);

// ============================================================================
// Scene 11: 記号の層（Layer stack: binary → assembly → FORTRAN）
// ============================================================================
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    const layers = [
        { label: '機械語', sample: '10110001 01000101', color: P.ink, bg: '#E5E7EB', textColor: P.ink },
        { label: 'アセンブリ', sample: 'ADD  R1, R2', color: P.primary, bg: P.primaryGlow, textColor: P.primaryDeep },
        { label: 'FORTRAN', sample: 'X = Y + Z', color: P.accent, bg: '#FEF3C7', textColor: P.accentDeep },
    ];
    return (
        <Stage>
            <div style={{ width: 1200 }}>
                <div style={{ fontSize: 34, color: P.textDim, textAlign: 'center', marginBottom: 30, opacity: fade(f, 0) }}>
                    機械の上に、人間が読める層が乗っていく
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {layers.slice().reverse().map((l, i) => {
                        const appearAt = 10 + i * 20;
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 30,
                                padding: '34px 40px',
                                background: l.bg,
                                border: `4px solid ${l.color}`,
                                borderRadius: 18,
                                opacity: fade(f, appearAt),
                                transform: `translateX(${interpolate(f, [appearAt, appearAt + 18], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                            }}>
                                <div style={{ width: 220, fontSize: 38, fontWeight: 900, color: l.color }}>{l.label}</div>
                                <div style={{
                                    flex: 1,
                                    fontFamily: '"Courier New", monospace',
                                    fontSize: 46, fontWeight: 700,
                                    color: l.textColor,
                                    letterSpacing: 2,
                                }}>
                                    {l.sample}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: 28, fontSize: 32, color: P.textDim, opacity: fade(f, 70) }}>
                    ↑ 人間に近い  |  ↓ 機械に近い
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 12: 見方の反転（Reversed perspective）
// ============================================================================
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1400, textAlign: 'center' }}>
            <div style={{ fontSize: 40, color: P.textDim, marginBottom: 60, opacity: fade(f, 0) }}>
                プログラミングの歴史は
            </div>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 50, marginBottom: 50,
                opacity: fade(f, 12),
            }}>
                <div style={{
                    padding: '36px 50px', background: P.primary, color: P.paper,
                    borderRadius: 24, fontSize: 46, fontWeight: 900, minWidth: 280,
                }}>機械寄り</div>
                <svg width={200} height={80}>
                    <defs>
                        <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                            <polygon points="0 0, 10 5, 0 10" fill={P.accent} />
                        </marker>
                    </defs>
                    <line x1={10} y1={40} x2={180} y2={40} stroke={P.accent} strokeWidth={8} markerEnd="url(#arr)" />
                </svg>
                <div style={{
                    padding: '36px 50px', background: P.accent, color: P.paper,
                    borderRadius: 24, fontSize: 46, fontWeight: 900, minWidth: 280,
                }}>人間寄り</div>
            </div>
            <div style={{ fontSize: 32, color: P.textDim, opacity: fade(f, 30) }}>
                配線 → 機械語 → アセンブリ → 高水準言語
            </div>
            <div style={{
                marginTop: 60, fontSize: 42, fontWeight: 800, color: P.primaryDeep,
                opacity: fade(f, 55),
            }}>
                「言語」という呼び方は、伊達じゃない
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 13: 同じ年の分岐（LISP / COBOL / ALGOL）
// ============================================================================
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    const entries = [
        { year: '1958', name: 'LISP', color: P.violet },
        { year: '1959', name: 'COBOL', color: P.emerald },
        { year: '1960', name: 'ALGOL', color: P.primary },
    ];
    return (
        <Stage>
            <div style={{ width: 1400, position: 'relative' }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: P.primaryDeep, textAlign: 'center', marginBottom: 60, opacity: fade(f, 0) }}>
                    たった3年で、3つの立場
                </div>
                {/* Timeline */}
                <div style={{ position: 'relative', height: 340 }}>
                    <div style={{
                        position: 'absolute', top: 60, left: 100, right: 100, height: 6,
                        background: `linear-gradient(90deg, ${P.primaryDeep}, ${P.accent})`,
                        borderRadius: 3, opacity: fade(f, 6),
                    }} />
                    {entries.map((e, i) => {
                        const x = 100 + i * 600;
                        return (
                            <div key={i} style={{
                                position: 'absolute', left: x - 180, top: 0, width: 360,
                                textAlign: 'center',
                                opacity: fade(f, 14 + i * 14),
                                transform: `translateY(${riseY(f, 14 + i * 14, 14 + i * 14 + 18, 20)}px)`,
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    background: e.color, margin: '40px auto 24px',
                                    border: `6px solid ${P.paper}`,
                                    boxShadow: `0 0 0 4px ${e.color}`,
                                }} />
                                <div style={{ fontSize: 32, color: P.textDim, fontWeight: 700 }}>{e.year}</div>
                                <div style={{ fontSize: 64, fontWeight: 900, color: e.color, letterSpacing: 2 }}>{e.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 14: 三つの立場
// ============================================================================
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cards = [
        { name: 'LISP', domain: '記号を操作', sub: '研究のため', color: P.violet },
        { name: 'COBOL', domain: '事務処理', sub: '会社のため', color: P.emerald },
        { name: 'ALGOL', domain: '数学的手順', sub: '美しく表現', color: P.primary },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', gap: 32 }}>
                {cards.map((c, i) => (
                    <div key={i} style={{
                        width: 400, padding: '44px 32px',
                        background: P.paper,
                        borderTop: `10px solid ${c.color}`,
                        borderRadius: 20,
                        boxShadow: '0 16px 40px rgba(30, 58, 138, 0.12)',
                        textAlign: 'center',
                        opacity: fade(f, 8 + i * 16),
                        transform: `translateY(${riseY(f, 8 + i * 16, 8 + i * 16 + 18, 24)}px)`,
                    }}>
                        <div style={{ fontSize: 60, fontWeight: 900, color: c.color, letterSpacing: 2, marginBottom: 26 }}>
                            {c.name}
                        </div>
                        <div style={{ fontSize: 38, fontWeight: 800, color: P.ink, marginBottom: 14 }}>
                            {c.domain}
                        </div>
                        <div style={{ fontSize: 30, color: P.textDim, fontWeight: 700 }}>
                            {c.sub}
                        </div>
                    </div>
                ))}
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 15: 命令じゃない言語（SQL）
// ============================================================================
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1300 }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: P.primaryDeep, textAlign: 'center', marginBottom: 40, opacity: fade(f, 0) }}>
                手順を書かない言語もある
            </div>
            {/* SQL code block */}
            <div style={{
                background: '#0F172A', color: '#E2E8F0',
                padding: '40px 50px',
                borderRadius: 20,
                fontFamily: '"Courier New", monospace',
                fontSize: 46,
                lineHeight: 1.4,
                border: `3px solid ${P.primary}`,
                opacity: fade(f, 10),
                transform: `scale(${scaleIn(f, 10)})`,
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.35)',
            }}>
                <span style={{ color: '#FBBF24' }}>SELECT</span> * <span style={{ color: '#FBBF24' }}>FROM</span> users<br />
                <span style={{ color: '#FBBF24' }}>WHERE</span> id <span style={{ color: '#F472B6' }}>&lt;=</span> <span style={{ color: '#34D399' }}>100</span>;
            </div>
            {/* Side-by-side interpretation */}
            <div style={{ display: 'flex', gap: 30, marginTop: 50, opacity: fade(f, 40) }}>
                <div style={{
                    flex: 1, padding: 28, background: P.paper, border: `3px solid ${P.accent}`, borderRadius: 18,
                }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: P.accent, marginBottom: 12 }}>WHAT（何を）</div>
                    <div style={{ fontSize: 30, color: P.ink }}>IDが100以下のユーザー全部</div>
                </div>
                <div style={{
                    flex: 1, padding: 28, background: '#F3F4F6', border: `3px dashed ${P.muted}`, borderRadius: 18,
                }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: P.muted, marginBottom: 12 }}>HOW（どう取るか）</div>
                    <div style={{ fontSize: 30, color: P.muted }}>DB側にお任せ</div>
                </div>
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 16: 裏の主役（Hidden protagonist reveal）
// ============================================================================
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, color: P.textDim, marginBottom: 30, opacity: fade(f, 0) }}>
                じゃあ、本当は——
            </div>
            <div style={{
                fontSize: 46, color: P.muted, marginBottom: 36, textDecoration: 'line-through',
                opacity: fade(f, 10),
            }}>
                機械への命令を書く活動
            </div>
            <div style={{ fontSize: 64, color: P.accent, fontWeight: 900, marginBottom: 20, opacity: fade(f, 30) }}>
                ではなく
            </div>
            <div style={{
                fontSize: 110, fontWeight: 900, color: P.primaryDeep, lineHeight: 1.25,
                opacity: fade(f, 45),
                transform: `translateY(${riseY(f, 45, 66, 24)}px)`,
            }}>
                複雑さを、<span style={{ color: P.accent }}>整理する</span>営み
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 17: 人間に向けた文書（Knuth quote）
// ============================================================================
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1400, textAlign: 'center' }}>
            <div style={{ fontSize: 32, color: P.textDim, marginBottom: 16, opacity: fade(f, 0) }}>
                1974年・チューリング賞受賞講演
            </div>
            <div style={{
                background: P.paper,
                border: `4px solid ${P.primaryDeep}`,
                borderRadius: 24,
                padding: '50px 60px',
                textAlign: 'left',
                position: 'relative',
                opacity: fade(f, 10),
                transform: `scale(${scaleIn(f, 10)})`,
                boxShadow: '0 16px 40px rgba(30, 58, 138, 0.15)',
            }}>
                <div style={{
                    position: 'absolute', left: 20, top: -4,
                    fontSize: 130, color: P.accent, fontWeight: 900,
                    lineHeight: 1,
                }}>"</div>
                <div style={{ fontSize: 46, fontWeight: 700, color: P.ink, lineHeight: 1.5, paddingLeft: 60 }}>
                    プログラミングとは、コンピュータに何をさせたいかを、
                    <br />
                    <span style={{ color: P.accent }}>別の人間に伝える</span>技芸である。
                </div>
            </div>
            {/* Arrow: code -> human */}
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: fade(f, 60) }}>
                <div style={{
                    padding: '18px 34px', background: P.ink, color: '#FBBF24',
                    fontFamily: '"Courier New", monospace',
                    fontSize: 30, borderRadius: 12,
                }}>
                    {'{ code }'}
                </div>
                <div style={{ fontSize: 44, color: P.accent }}>→</div>
                <div style={{
                    padding: '18px 34px', background: P.accent, color: P.paper,
                    fontSize: 30, fontWeight: 900, borderRadius: 12,
                }}>
                    人間の読み手
                </div>
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 18: 読むために書く（SICP + ratio）
// ============================================================================
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1350, textAlign: 'center' }}>
            <div style={{ fontSize: 30, color: P.textDim, marginBottom: 14, opacity: fade(f, 0) }}>
                MIT 教科書『SICP』序文
            </div>
            <div style={{
                background: P.paper,
                border: `4px solid ${P.accent}`,
                borderRadius: 24,
                padding: '40px 50px',
                opacity: fade(f, 8),
                transform: `scale(${scaleIn(f, 8)})`,
                boxShadow: '0 16px 40px rgba(245, 158, 11, 0.18)',
            }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: P.ink, lineHeight: 1.45 }}>
                    プログラムは<span style={{ color: P.accent }}>人が読むために</span>書かねばならず、
                    <br />
                    機械が実行するのはあくまで副次的である。
                </div>
            </div>
            {/* Ratio callback */}
            <div style={{
                marginTop: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30,
                opacity: fade(f, 50),
            }}>
                <div style={{ fontSize: 34, color: P.textDim }}>だから：</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: P.ink }}>書く</div>
                <div style={{ fontSize: 34, color: P.muted }}>:</div>
                <div style={{ fontSize: 54, fontWeight: 900, color: P.accent }}>読む</div>
                <div style={{ fontSize: 34, color: P.muted }}>=</div>
                <div style={{
                    fontSize: 44, fontWeight: 900, color: P.paper,
                    background: P.accent, padding: '8px 30px', borderRadius: 14,
                }}>1 : 10</div>
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 19: 複雑さを整理する（Chaos → organized）
// ============================================================================
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = ['お金', '時間', '例外', '矛盾'];
    // progress: 0 = chaos, 1 = organized
    const p = interpolate(f, [15, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const chaosPos = [
        { x: 180, y: 260, rot: -18 },
        { x: 780, y: 70, rot: 22 },
        { x: 1050, y: 340, rot: -10 },
        { x: 420, y: 410, rot: 15 },
    ];
    const orderPos = [
        { x: 180, y: 200, rot: 0 },
        { x: 510, y: 200, rot: 0 },
        { x: 840, y: 200, rot: 0 },
        { x: 1170, y: 200, rot: 0 },
    ];
    return (
        <Stage>
            <div style={{ width: 1400, height: 520, position: 'relative' }}>
                <div style={{
                    position: 'absolute', top: 10, left: 0, right: 0, textAlign: 'center',
                    fontSize: 40, fontWeight: 900, color: P.primaryDeep,
                    opacity: fade(f, 0),
                }}>
                    頭の中で、複雑さを整理する
                </div>
                {items.map((it, i) => {
                    const cp = chaosPos[i];
                    const op = orderPos[i];
                    const x = cp.x + (op.x - cp.x) * p;
                    const y = cp.y + (op.y - cp.y) * p;
                    const rot = cp.rot + (op.rot - cp.rot) * p;
                    return (
                        <div key={i} style={{
                            position: 'absolute', left: x, top: y,
                            width: 220, height: 130,
                            background: [P.rose, P.primary, P.violet, P.warm][i],
                            color: P.paper,
                            borderRadius: 18,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 42, fontWeight: 900,
                            transform: `rotate(${rot}deg)`,
                            boxShadow: '0 10px 26px rgba(15, 23, 42, 0.2)',
                            transition: 'none',
                        }}>{it}</div>
                    );
                })}
                {/* Before / after label */}
                <div style={{ position: 'absolute', left: 0, bottom: 10, fontSize: 28, color: P.textDim, opacity: fade(f, 5) }}>
                    {p < 0.5 ? '── 生の複雑さ' : '── 整理された部品'}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 20: 頭の中の理論（Iceberg: code tip, theory underneath）
// ============================================================================
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg width={1300} height={620} viewBox="0 0 1300 620">
            {/* Water line */}
            <line x1={0} y1={220} x2={1300} y2={220} stroke={P.primary} strokeWidth={2} strokeDasharray="10 6" opacity={fade(f, 0)} />
            <text x={30} y={210} fontSize={28} fill={P.primary} opacity={fade(f, 0)}>水面</text>

            {/* Tip: code */}
            <g opacity={fade(f, 10)}>
                <polygon points="520,220 650,80 780,220" fill={P.accent} stroke={P.accentDeep} strokeWidth={4} />
                <text x={650} y={170} textAnchor="middle" fontSize={38} fontWeight={900} fill={P.paper}>コード</text>
            </g>

            {/* Body: theory */}
            <g opacity={fade(f, 32)}>
                <polygon points="300,220 1000,220 880,580 420,580" fill={P.primary} stroke={P.primaryDeep} strokeWidth={4} />
                <text x={650} y={380} textAnchor="middle" fontSize={70} fontWeight={900} fill={P.paper}>頭の中の理論</text>
                <text x={650} y={450} textAnchor="middle" fontSize={32} fill={P.paper}>「この問題はこう考えれば動く」</text>
            </g>

            {/* Caption */}
            <text x={650} y={610} textAnchor="middle" fontSize={32} fill={P.textDim} fontWeight={700} opacity={fade(f, 65)}>
                Peter Naur 1985：「プログラムの本体は、プログラマの頭の中にある」
            </text>
        </svg>
    </Stage>
);

// ============================================================================
// Scene 21: レシピの限界（Recipe card with "塩少々" breaking）
// ============================================================================
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1350 }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: P.primaryDeep, textAlign: 'center', marginBottom: 40, opacity: fade(f, 0) }}>
                レシピとプログラムの、大きな違い
            </div>
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center' }}>
                {/* Recipe card */}
                <div style={{
                    width: 520, padding: '36px 40px',
                    background: '#FEFCE8',
                    border: `4px solid ${P.accent}`,
                    borderRadius: 18,
                    opacity: fade(f, 8),
                    transform: `translateY(${riseY(f, 8)}px)`,
                }}>
                    <div style={{ fontSize: 32, color: P.accentDeep, fontWeight: 800, marginBottom: 20 }}>📝 レシピ</div>
                    <div style={{ fontSize: 32, color: P.ink, lineHeight: 1.7 }}>
                        1. 玉ねぎをみじん切り<br />
                        2. 油で炒める<br />
                        3. <span style={{
                            background: P.rose, color: P.paper,
                            padding: '4px 14px', borderRadius: 8, fontWeight: 900,
                        }}>塩 少々</span><br />
                        4. 焦げない程度に煮る
                    </div>
                </div>
                <div style={{ fontSize: 72, color: P.rose, opacity: fade(f, 30) }}>×</div>
                {/* Machine reaction */}
                <div style={{
                    width: 420, padding: '36px 40px',
                    background: '#0F172A',
                    color: '#FEE2E2',
                    borderRadius: 18,
                    fontFamily: '"Courier New", monospace',
                    opacity: fade(f, 40),
                }}>
                    <div style={{ fontSize: 30, color: '#F87171', marginBottom: 14 }}>ERROR</div>
                    <div style={{ fontSize: 26, lineHeight: 1.55 }}>
                        undefined:<br />「塩 少々」<br />意味不明
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 36, fontSize: 34, color: P.textDim, fontWeight: 700, opacity: fade(f, 60) }}>
                プログラムは、隙間を1ミリも許さない
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 22: 整理の仕事（Writer-like work）
// ============================================================================
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1400, textAlign: 'center' }}>
            <div style={{ fontSize: 42, color: P.textDim, marginBottom: 36, opacity: fade(f, 0) }}>
                プログラマは、結局
            </div>
            <div style={{
                fontSize: 76, fontWeight: 900, color: P.primaryDeep, lineHeight: 1.35,
                opacity: fade(f, 12),
            }}>
                複雑な問題を<span style={{ color: P.accent }}>整理して</span>、
                <br />
                他人に<span style={{ color: P.accent }}>読める形で</span>書き残す
            </div>
            {/* Icon row */}
            <div style={{
                marginTop: 56, display: 'flex', justifyContent: 'center', gap: 80,
                opacity: fade(f, 45),
            }}>
                {['問題', '→', '整理', '→', '書き残す'].map((t, i) => (
                    <div key={i} style={{
                        fontSize: i % 2 === 0 ? 38 : 44,
                        fontWeight: i % 2 === 0 ? 900 : 700,
                        color: i % 2 === 0 ? P.ink : P.muted,
                    }}>{t}</div>
                ))}
            </div>
            <div style={{ marginTop: 44, fontSize: 36, color: P.textDim, fontWeight: 700, opacity: fade(f, 70) }}>
                「他人」には、未来の自分も含む
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Scene 23: 本質と偶発（Essential vs Accidental complexity）
// ============================================================================
const Scene23: React.FC<SceneProps> = ({ localFrame: f }) => {
    // Accidental shrinks over time; Essential stays
    const accH = interpolate(f, [20, 70], [380, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const essH = 380;
    return (
        <Stage>
            <div style={{ width: 1300, textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 900, color: P.primaryDeep, marginBottom: 10, opacity: fade(f, 0) }}>
                    複雑さには、2種類ある
                </div>
                <div style={{ fontSize: 28, color: P.textDim, marginBottom: 50, opacity: fade(f, 0) }}>
                    Fred Brooks 1986 「銀の弾丸はない」
                </div>
                <div style={{ display: 'flex', gap: 80, alignItems: 'flex-end', justifyContent: 'center', height: 460 }}>
                    {/* Accidental bar */}
                    <div style={{ width: 280, opacity: fade(f, 8), textAlign: 'center' }}>
                        <div style={{
                            width: '100%', height: accH,
                            background: `linear-gradient(180deg, ${P.muted}, #CBD5E1)`,
                            borderRadius: '20px 20px 0 0',
                            transition: 'none',
                        }} />
                        <div style={{ fontSize: 34, fontWeight: 900, color: P.muted, marginTop: 20 }}>偶発的</div>
                        <div style={{ fontSize: 24, color: P.textDim, marginTop: 6 }}>道具で減る</div>
                    </div>
                    {/* Essential bar */}
                    <div style={{ width: 280, opacity: fade(f, 18), textAlign: 'center' }}>
                        <div style={{
                            width: '100%', height: essH,
                            background: `linear-gradient(180deg, ${P.primary}, ${P.primaryDeep})`,
                            borderRadius: '20px 20px 0 0',
                            boxShadow: '0 14px 30px rgba(30, 58, 138, 0.3)',
                        }} />
                        <div style={{ fontSize: 34, fontWeight: 900, color: P.primaryDeep, marginTop: 20 }}>本質的</div>
                        <div style={{ fontSize: 24, color: P.textDim, marginTop: 6 }}>減らない</div>
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 24: AIの影響（Human moves earlier in pipeline）
// ============================================================================
const Scene24: React.FC<SceneProps> = ({ localFrame: f }) => {
    const steps = [
        { label: '何を作るか決める', human: true },
        { label: '問題を整理する', human: true },
        { label: 'コードを書く', human: false },
        { label: '細部を詰める', human: false },
    ];
    return (
        <Stage>
            <div style={{ width: 1400 }}>
                <div style={{ fontSize: 42, fontWeight: 900, color: P.primaryDeep, textAlign: 'center', marginBottom: 50, opacity: fade(f, 0) }}>
                    AI時代、人間の仕事は<span style={{ color: P.accent }}>前の方</span>へ
                </div>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
                    {steps.map((s, i) => (
                        <React.Fragment key={i}>
                            <div style={{
                                flex: 1, padding: '30px 20px',
                                background: s.human ? P.accent : '#E5E7EB',
                                color: s.human ? P.paper : P.textDim,
                                border: s.human ? `4px solid ${P.accentDeep}` : `3px dashed ${P.muted}`,
                                borderRadius: 18,
                                textAlign: 'center',
                                fontSize: 30, fontWeight: 800,
                                opacity: fade(f, 10 + i * 10),
                                transform: `scale(${scaleIn(f, 10 + i * 10)})`,
                                boxShadow: s.human ? '0 10px 26px rgba(245, 158, 11, 0.3)' : 'none',
                            }}>
                                {s.label}
                                <div style={{ fontSize: 24, marginTop: 10, fontWeight: 700 }}>
                                    {s.human ? '👤 人間' : '🤖 AI 支援'}
                                </div>
                            </div>
                            {i < steps.length - 1 && (
                                <div style={{ display: 'flex', alignItems: 'center', fontSize: 40, color: P.muted }}>→</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div style={{ marginTop: 50, fontSize: 34, color: P.textDim, fontWeight: 700, textAlign: 'center', opacity: fade(f, 60) }}>
                    「整理する」は、ずっと前から主戦場
                </div>
            </div>
        </Stage>
    );
};

// ============================================================================
// Scene 25: もう一度問い（Final answer to the opening question）
// ============================================================================
const Scene25: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ textAlign: 'center' }}>
            <div style={{
                fontSize: 54, color: P.textDim, marginBottom: 40, fontWeight: 700,
                opacity: fade(f, 0),
            }}>
                プログラマって、結局何してるの？
            </div>
            <div style={{ fontSize: 40, color: P.accent, marginBottom: 40, opacity: fade(f, 20) }}>
                ──答えは
            </div>
            <div style={{
                fontSize: 82, fontWeight: 900, color: P.primaryDeep, lineHeight: 1.3,
                opacity: fade(f, 40),
                transform: `translateY(${riseY(f, 40, 60, 24)}px)`,
            }}>
                複雑さを<span style={{ color: P.accent }}>整理して</span>、
                <br />
                他人に<span style={{ color: P.accent }}>読める形で</span>書き残す
            </div>
            <div style={{
                marginTop: 50, fontSize: 34, color: P.textDim, fontWeight: 700,
                opacity: fade(f, 80),
            }}>
                キーボードの向こうで、ずっと続いてきた仕事
            </div>
        </div>
    </Stage>
);

// ============================================================================
// Exports
// ============================================================================
export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9,
    Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16, Scene17, Scene18, Scene19,
    Scene20, Scene21, Scene22, Scene23, Scene24, Scene25,
];

export const SCENE_TITLES: string[] = [
    '素朴な疑問', '3つの違和感', '見取り図', '1日の中身', 'もう一つの主役', 'タイピング以外',
    'コードの順番', '先回りの仕組み', '順番の幻想', '最初のプログラマ', '物理配線', '記号の層',
    '見方の反転', '同じ年の分岐', '三つの立場', '命令じゃない言語', '裏の主役', '人間に向けた文書',
    '読むために書く', '複雑さを整理する', '頭の中の理論', 'レシピの限界', '整理の仕事',
    '本質と偶発', 'AIの影響', 'もう一度問い',
];
