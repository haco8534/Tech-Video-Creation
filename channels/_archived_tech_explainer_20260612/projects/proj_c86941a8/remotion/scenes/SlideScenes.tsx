import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

// Palette: 深いインディゴ=キャッシュの「奥」, ティール=効率/速度, アンバー=注意, ローズ=神話否定, エメラルド=正しい使い方
const P = {
    ...BASE_COLORS,
    primary: '#3730A3',
    primaryDeep: '#1E1B4B',
    primaryGlow: 'rgba(55, 48, 163, 0.22)',
    accent: '#0EA5A0',
    accentDeep: '#0F766E',
    warm: '#F59E0B',
    warmDeep: '#B45309',
    rose: '#E11D48',
    emerald: '#059669',
    ink: '#0F172A',
    paper: '#FFFFFF',
    muted: '#94A3B8',
    panel: 'rgba(255,255,255,0.92)',
    border: 'rgba(15, 23, 42, 0.10)',
    grid: 'rgba(55, 48, 163, 0.10)',
};

const fade = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const rise = (f: number, from: number, to = from + 18, dist = 18) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Stage: React.FC<React.PropsWithChildren<{ align?: string }>> = ({ children, align = 'center' }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: 80, paddingRight: 80,
        display: 'flex', alignItems: align as any, justifyContent: 'center',
    }}>{children}</div>
);

const Card: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
    <div style={{
        background: P.panel, border: `2px solid ${P.border}`,
        borderRadius: 24, padding: '28px 36px',
        boxShadow: '0 18px 44px rgba(15, 23, 42, 0.08)',
        ...style,
    }}>{children}</div>
);

// ───────────────────────────────────────────────
// Scene 0: 押してるあのボタン
// ───────────────────────────────────────────────
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <div style={{
                fontSize: 52, color: P.muted, letterSpacing: 8,
                opacity: fade(f, 4), transform: `translateY(${rise(f, 4)}px)`,
            }}>みんなが押す、あのボタン</div>
            <div style={{
                width: 760, padding: '64px 56px',
                background: P.paper, border: `2px solid ${P.border}`,
                borderRadius: 28, boxShadow: '0 24px 60px rgba(15,23,42,0.12)',
                display: 'flex', flexDirection: 'column', gap: 24,
                opacity: fade(f, 18), transform: `translateY(${rise(f, 18)}px)`,
            }}>
                <div style={{ fontSize: 38, color: P.muted }}>ストレージ</div>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '18px 0', borderBottom: `1px solid ${P.border}`,
                }}>
                    <span style={{ fontSize: 44, color: P.ink }}>キャッシュされたデータ</span>
                    <span style={{ fontSize: 36, color: P.muted }}>1.4 GB</span>
                </div>
                <div style={{
                    marginTop: 8, alignSelf: 'center',
                    padding: '24px 64px',
                    background: `linear-gradient(135deg, ${P.rose}, #BE123C)`,
                    color: P.paper, fontSize: 50, fontWeight: 800, letterSpacing: 4,
                    borderRadius: 18,
                    boxShadow: `0 12px 32px ${P.primaryGlow}`,
                    opacity: fade(f, 36), transform: `scale(${interpolate(f, [36, 56], [0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                }}>キャッシュを消去</div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 1: 何を消した？
// ───────────────────────────────────────────────
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
            <div style={{
                fontSize: 80, fontWeight: 900, color: P.primaryDeep,
                opacity: fade(f, 4),
                transform: `translateY(${rise(f, 4)}px)`,
                letterSpacing: 2,
            }}>そのボタン、何を消したか</div>
            <div style={{
                fontSize: 88, fontWeight: 900,
                background: `linear-gradient(135deg, ${P.primary} 0%, ${P.rose} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                opacity: fade(f, 24),
                transform: `translateY(${rise(f, 24)}px)`,
            }}>説明できますか？</div>
            <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
                {['?', '?', '?'].map((q, i) => (
                    <div key={i} style={{
                        width: 110, height: 110, borderRadius: '50%',
                        background: P.paper, border: `4px solid ${P.primary}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 64, fontWeight: 900, color: P.primary,
                        opacity: fade(f, 44 + i * 6),
                        transform: `translateY(${rise(f, 44 + i * 6, 64 + i * 6, 14)}px)`,
                        boxShadow: `0 8px 20px ${P.primaryGlow}`,
                    }}>{q}</div>
                ))}
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 2: 今日の道筋
// ───────────────────────────────────────────────
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { n: '01', t: '言葉の語源' },
        { n: '02', t: 'なぜ存在するか' },
        { n: '03', t: 'ボタンの裏側' },
        { n: '04', t: '本当に速くなるか' },
        { n: '05', t: 'スマホ事情' },
    ];
    return (
        <Stage align="center">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: 1100 }}>
                <div style={{
                    fontSize: 44, color: P.muted, letterSpacing: 6,
                    opacity: fade(f, 4),
                }}>今日の道筋</div>
                {items.map((it, i) => (
                    <div key={it.n} style={{
                        display: 'flex', alignItems: 'center', gap: 28,
                        padding: '20px 32px',
                        background: P.paper, border: `2px solid ${P.border}`,
                        borderRadius: 18,
                        opacity: fade(f, 14 + i * 8),
                        transform: `translateX(${interpolate(f, [14 + i * 8, 32 + i * 8], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                    }}>
                        <div style={{
                            fontSize: 44, fontWeight: 900, color: P.accent,
                            width: 80,
                        }}>{it.n}</div>
                        <div style={{ fontSize: 50, fontWeight: 700, color: P.ink }}>{it.t}</div>
                    </div>
                ))}
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 3: 実はフランス語
// ───────────────────────────────────────────────
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <div style={{
                fontSize: 44, color: P.muted, letterSpacing: 6,
                opacity: fade(f, 4),
            }}>cache の出自</div>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 36,
                opacity: fade(f, 18),
            }}>
                <div style={{
                    padding: '32px 56px',
                    background: P.paper, border: `3px solid ${P.primary}`, borderRadius: 24,
                    fontSize: 88, fontWeight: 900, color: P.primaryDeep,
                    fontFamily: '"Times New Roman", serif',
                    letterSpacing: 4,
                }}>cacher</div>
                <div style={{ fontSize: 48, color: P.muted }}>仏</div>
            </div>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 18,
                opacity: fade(f, 38),
            }}>
                <div style={{ fontSize: 48, color: P.accent, fontWeight: 700, letterSpacing: 8 }}>カシェ</div>
                <div style={{ fontSize: 36, color: P.muted }}>＝</div>
                <div style={{ fontSize: 56, color: P.ink, fontWeight: 800 }}>「隠す」</div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 4: 隠し場所が語源
// ───────────────────────────────────────────────
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
            <div style={{
                fontSize: 42, color: P.muted, letterSpacing: 4,
                opacity: fade(f, 4),
            }}>1797年・カナダの罠猟師</div>
            <svg width={780} height={320} style={{ opacity: fade(f, 16) }}>
                {/* 地面 */}
                <rect x={0} y={240} width={780} height={80} fill="#A78BFA" opacity={0.12} />
                {/* 木 */}
                <g opacity={fade(f, 16)}>
                    <rect x={120} y={120} width={20} height={120} fill="#92400E" />
                    <circle cx={130} cy={100} r={50} fill="#16A34A" opacity={0.85} />
                </g>
                <g opacity={fade(f, 22)}>
                    <rect x={620} y={140} width={20} height={100} fill="#92400E" />
                    <circle cx={630} cy={120} r={42} fill="#16A34A" opacity={0.85} />
                </g>
                {/* 隠し穴 */}
                <g opacity={fade(f, 32)}>
                    <ellipse cx={390} cy={250} rx={140} ry={36} fill={P.ink} opacity={0.35} />
                    <rect x={330} y={200} width={120} height={50} rx={8} fill={P.warm} stroke={P.warmDeep} strokeWidth={3} />
                    <text x={390} y={235} textAnchor="middle" fill={P.paper} fontSize={28} fontWeight={800}>隠し場所</text>
                </g>
                {/* 矢印 */}
                <g opacity={fade(f, 50)}>
                    <line x1={390} y1={130} x2={390} y2={185} stroke={P.primary} strokeWidth={3} markerEnd="url(#arrhide)" />
                    <text x={390} y={110} textAnchor="middle" fill={P.primaryDeep} fontSize={32} fontWeight={700}>cache</text>
                </g>
                <defs>
                    <marker id="arrhide" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill={P.primary} />
                    </marker>
                </defs>
            </svg>
            <div style={{
                fontSize: 36, color: P.ink, opacity: fade(f, 60),
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 16,
                padding: '14px 28px',
            }}>「よく使うものを手近に隠しておく」</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 5: 1965年の命名
// ───────────────────────────────────────────────
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: 1100 }}>
            <div style={{
                display: 'flex', gap: 24, alignItems: 'center',
                opacity: fade(f, 4), transform: `translateY(${rise(f, 4)}px)`,
            }}>
                <div style={{
                    fontSize: 100, fontWeight: 900, color: P.primaryDeep, letterSpacing: 2,
                }}>1965</div>
                <div style={{ fontSize: 36, color: P.muted }}>年・春</div>
            </div>
            <Card style={{ width: '100%', opacity: fade(f, 22), transform: `translateY(${rise(f, 22)}px)` }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontSize: 36, color: P.muted }}>論文</div>
                    <div style={{ fontSize: 44, fontWeight: 700, color: P.ink, fontStyle: 'italic' }}>
                        Slave Memories and Dynamic Storage Allocation
                    </div>
                    <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
                        <span style={{ fontSize: 34, color: P.accent, fontWeight: 700 }}>Maurice Wilkes</span>
                        <span style={{ fontSize: 30, color: P.muted }}>・ ケンブリッジ大学</span>
                    </div>
                </div>
            </Card>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 18, marginTop: 12,
                opacity: fade(f, 50),
            }}>
                <span style={{ fontSize: 38, color: P.muted }}>当時の呼び名</span>
                <span style={{
                    fontSize: 56, fontWeight: 800, color: P.rose,
                    fontFamily: '"Times New Roman", serif',
                }}>slave memory</span>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 6: 編集者の一言
// ───────────────────────────────────────────────
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
            <div style={{
                fontSize: 38, color: P.muted, opacity: fade(f, 4),
            }}>1967年・IBM Systems Journal</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                <div style={{
                    padding: '24px 36px', borderRadius: 18,
                    background: P.paper, border: `3px solid ${P.muted}`,
                    fontSize: 44, fontWeight: 700, color: P.muted,
                    textDecoration: 'line-through',
                    fontFamily: '"Times New Roman", serif',
                    opacity: fade(f, 16),
                }}>high-speed buffer</div>
                <div style={{
                    fontSize: 60, color: P.warm,
                    opacity: fade(f, 32),
                }}>→</div>
                <div style={{
                    padding: '28px 48px', borderRadius: 18,
                    background: `linear-gradient(135deg, ${P.primary}, ${P.primaryDeep})`,
                    fontSize: 64, fontWeight: 900, color: P.paper,
                    fontFamily: '"Times New Roman", serif',
                    letterSpacing: 3,
                    boxShadow: `0 14px 32px ${P.primaryGlow}`,
                    opacity: fade(f, 40),
                    transform: `scale(${interpolate(f, [40, 60], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                }}>cache</div>
            </div>
            <div style={{
                marginTop: 18, fontSize: 32, color: P.ink,
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                padding: '14px 28px',
                opacity: fade(f, 60),
            }}>編集者 Lyle R. Johnson が辞書を引いて改名提案</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 7: 冷蔵庫とスーパー
// ───────────────────────────────────────────────
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>イメージは冷蔵庫</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {/* 冷蔵庫 */}
                <div style={{
                    width: 320, padding: 28, borderRadius: 20,
                    background: P.paper, border: `3px solid ${P.accent}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                    opacity: fade(f, 16), transform: `translateX(${interpolate(f, [16, 36], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                }}>
                    <svg width={100} height={140} viewBox="0 0 100 140">
                        <rect x={10} y={10} width={80} height={120} rx={8} fill={P.paper} stroke={P.accent} strokeWidth={4} />
                        <line x1={10} y1={50} x2={90} y2={50} stroke={P.accent} strokeWidth={3} />
                        <circle cx={20} cy={30} r={3} fill={P.accent} />
                        <circle cx={20} cy={70} r={3} fill={P.accent} />
                    </svg>
                    <div style={{ fontSize: 38, fontWeight: 800, color: P.accentDeep }}>冷蔵庫</div>
                    <div style={{ fontSize: 26, color: P.muted, textAlign: 'center', lineHeight: 1.4 }}>少ないけど<br />近い・速い</div>
                </div>
                <div style={{
                    fontSize: 56, color: P.muted, opacity: fade(f, 36),
                }}>↔</div>
                {/* スーパー */}
                <div style={{
                    width: 320, padding: 28, borderRadius: 20,
                    background: P.paper, border: `3px solid ${P.muted}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                    opacity: fade(f, 26), transform: `translateX(${interpolate(f, [26, 46], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                }}>
                    <svg width={140} height={140} viewBox="0 0 140 140">
                        <rect x={10} y={50} width={120} height={80} fill={P.paper} stroke={P.muted} strokeWidth={4} />
                        <polygon points="10,50 70,10 130,50" fill={P.warm} stroke={P.warmDeep} strokeWidth={3} />
                        <rect x={55} y={85} width={30} height={45} fill={P.muted} opacity={0.5} />
                    </svg>
                    <div style={{ fontSize: 38, fontWeight: 800, color: P.ink }}>スーパー</div>
                    <div style={{ fontSize: 26, color: P.muted, textAlign: 'center', lineHeight: 1.4 }}>全部あるけど<br />遠い・遅い</div>
                </div>
            </div>
            <div style={{
                fontSize: 30, color: P.ink, marginTop: 12,
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                padding: '14px 28px',
                opacity: fade(f, 56),
            }}>毎日使う牛乳は冷蔵庫に置く＝キャッシュの発想</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 8: 速度差の正体
// ───────────────────────────────────────────────
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cpuW = interpolate(f, [16, 40], [0, 40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const memW = interpolate(f, [30, 60], [0, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: 1100 }}>
                <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>キャッシュとメインメモリの速度差</div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 32, marginTop: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 240, fontSize: 36, fontWeight: 700, color: P.primaryDeep, textAlign: 'right' }}>CPU L1キャッシュ</div>
                        <div style={{ height: 50, width: cpuW, background: P.accent, borderRadius: 8, opacity: fade(f, 16) }} />
                        <div style={{ fontSize: 30, color: P.accentDeep, opacity: fade(f, 28) }}>1サイクル</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 240, fontSize: 36, fontWeight: 700, color: P.muted, textAlign: 'right' }}>メインメモリ</div>
                        <div style={{
                            height: 50, width: memW,
                            background: `linear-gradient(90deg, ${P.muted} 0%, ${P.rose} 100%)`,
                            borderRadius: 8, opacity: fade(f, 30),
                        }} />
                        <div style={{ fontSize: 30, color: P.rose, fontWeight: 800, opacity: fade(f, 50) }}>100+サイクル</div>
                    </div>
                </div>
                <div style={{
                    marginTop: 24, fontSize: 38, color: P.ink, fontWeight: 700,
                    opacity: fade(f, 64),
                }}>
                    およそ <span style={{ color: P.rose, fontSize: 56 }}>100倍</span> の速度差
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 9: 手元と保管庫
// ───────────────────────────────────────────────
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: 1100 }}>
            <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>もう一つの言い方：作業台と工具棚</div>
            <svg width={1000} height={380} style={{ opacity: fade(f, 14) }}>
                {/* 作業台 */}
                <rect x={50} y={250} width={420} height={100} fill={P.warm} opacity={0.25} stroke={P.warmDeep} strokeWidth={3} rx={8} />
                <text x={260} y={310} textAnchor="middle" fill={P.warmDeep} fontSize={32} fontWeight={800}>作業台</text>
                {/* 工具 (作業台の上) */}
                <g opacity={fade(f, 24)}>
                    <rect x={100} y={210} width={50} height={40} fill={P.accent} rx={4} />
                    <rect x={170} y={200} width={40} height={50} fill={P.primary} rx={4} />
                    <circle cx={260} cy={225} r={22} fill={P.rose} />
                    <rect x={310} y={200} width={50} height={50} fill={P.emerald} rx={6} />
                </g>
                <text x={260} y={180} textAnchor="middle" fill={P.ink} fontSize={28} opacity={fade(f, 30)}>よく使う工具</text>

                {/* 工具棚 */}
                <rect x={550} y={70} width={400} height={280} fill={P.paper} stroke={P.muted} strokeWidth={3} rx={6} />
                <line x1={550} y1={140} x2={950} y2={140} stroke={P.muted} strokeWidth={2} />
                <line x1={550} y1={210} x2={950} y2={210} stroke={P.muted} strokeWidth={2} />
                <line x1={550} y1={280} x2={950} y2={280} stroke={P.muted} strokeWidth={2} />
                <text x={750} y={50} textAnchor="middle" fill={P.muted} fontSize={28}>地下の工具棚</text>
                <g opacity={fade(f, 36)}>
                    {[0, 1, 2, 3].map(i => [0, 1, 2, 3, 4].map(j => (
                        <rect key={`${i}-${j}`} x={570 + j * 76} y={90 + i * 70} width={40} height={36} fill={P.muted} opacity={0.4} rx={3} />
                    )))}
                </g>

                {/* 矢印 */}
                <g opacity={fade(f, 52)}>
                    <line x1={500} y1={170} x2={550} y2={170} stroke={P.ink} strokeWidth={3} markerEnd="url(#arr9)" />
                    <text x={525} y={155} textAnchor="middle" fill={P.ink} fontSize={20}>取りに行く</text>
                </g>
                <defs>
                    <marker id="arr9" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill={P.ink} />
                    </marker>
                </defs>
            </svg>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 10: ヒット率95%
// ───────────────────────────────────────────────
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => {
    const r = 130;
    const c = 2 * Math.PI * r;
    const ratio = interpolate(f, [16, 60], [0, 0.95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
                <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>CPU L1 のキャッシュヒット率</div>
                <div style={{ position: 'relative', width: 320, height: 320, opacity: fade(f, 12) }}>
                    <svg width={320} height={320} style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx={160} cy={160} r={r} fill="none" stroke={P.border} strokeWidth={28} />
                        <circle cx={160} cy={160} r={r} fill="none" stroke={P.accent} strokeWidth={28}
                            strokeDasharray={`${c * ratio} ${c * (1 - ratio)}`} strokeLinecap="round" />
                    </svg>
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <div style={{ fontSize: 88, fontWeight: 900, color: P.accentDeep }}>
                            {Math.round(ratio * 100)}%
                        </div>
                        <div style={{ fontSize: 26, color: P.muted }}>+</div>
                    </div>
                </div>
                <div style={{
                    fontSize: 36, color: P.ink, opacity: fade(f, 64),
                    background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                    padding: '14px 28px',
                }}>10回中9回以上は遠くまで行かなくて済む</div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 11: 実は分身している
// ───────────────────────────────────────────────
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { label: 'CPU L1/L2/L3', color: P.primary },
        { label: 'OS ページキャッシュ', color: P.accent },
        { label: 'DNSキャッシュ', color: P.warm },
        { label: 'HTTPキャッシュ', color: P.emerald },
        { label: 'Service Worker', color: P.rose },
        { label: 'CDN エッジ', color: P.primaryDeep },
        { label: 'bfcache（戻る用）', color: P.accentDeep },
        { label: 'アプリ Caches', color: P.warmDeep },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, width: 1180 }}>
                <div style={{
                    fontSize: 50, fontWeight: 800, color: P.primaryDeep, opacity: fade(f, 4), letterSpacing: 2,
                }}>「キャッシュ」と呼ばれる別物たち</div>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '100%', marginTop: 16,
                }}>
                    {items.map((it, i) => (
                        <div key={it.label} style={{
                            padding: '20px 18px', borderRadius: 14,
                            background: P.paper, border: `3px solid ${it.color}`,
                            fontSize: 28, fontWeight: 700, color: it.color,
                            textAlign: 'center', minHeight: 90,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            opacity: fade(f, 14 + i * 7),
                            transform: `translateY(${rise(f, 14 + i * 7, 30 + i * 7, 14)}px)`,
                        }}>{it.label}</div>
                    ))}
                </div>
                <div style={{
                    marginTop: 16, fontSize: 32, color: P.muted,
                    opacity: fade(f, 80),
                }}>同じ名前で呼ばれる、別物の8階層</div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 12: ブラウザの中身
// ───────────────────────────────────────────────
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => {
    const stores = ['HTTP cache', 'Cache Storage', 'IndexedDB', 'localStorage', 'Cookie'];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: 1100 }}>
                <div style={{ fontSize: 42, color: P.muted, letterSpacing: 4, opacity: fade(f, 4) }}>ブラウザの中だけでも</div>
                <div style={{
                    width: '100%', padding: 28, borderRadius: 24,
                    background: P.paper, border: `3px solid ${P.primary}`,
                    boxShadow: `0 18px 44px ${P.primaryGlow}`,
                    opacity: fade(f, 14),
                }}>
                    <div style={{ fontSize: 32, color: P.primaryDeep, fontWeight: 800, marginBottom: 18 }}>Browser</div>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        {stores.map((s, i) => (
                            <div key={s} style={{
                                padding: '14px 24px', borderRadius: 12,
                                background: P.primary, color: P.paper,
                                fontSize: 26, fontWeight: 700,
                                opacity: fade(f, 24 + i * 8),
                                transform: `translateY(${rise(f, 24 + i * 8, 40 + i * 8, 12)}px)`,
                            }}>{s}</div>
                        ))}
                    </div>
                </div>
                <div style={{
                    marginTop: 12, fontSize: 32, color: P.ink,
                    background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                    padding: '14px 28px',
                    opacity: fade(f, 70),
                }}>仕様上は「キャッシュ」と「ストレージ」は別物</div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 13: Cookieも巻き込む
// ───────────────────────────────────────────────
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { label: 'Cookie', main: true },
        { label: 'Local Storage', main: false },
        { label: 'Session Storage', main: false },
        { label: 'IndexedDB', main: false },
        { label: 'Service Worker data', main: false },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, width: 1100 }}>
                <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>Chrome「Cookieとその他のサイトデータ」</div>
                <div style={{
                    width: '100%', padding: 28, borderRadius: 18,
                    background: P.paper, border: `2px solid ${P.border}`,
                    opacity: fade(f, 14),
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {items.map((it, i) => (
                            <div key={it.label} style={{
                                display: 'flex', alignItems: 'center', gap: 18,
                                padding: '14px 8px', borderBottom: i < items.length - 1 ? `1px dashed ${P.border}` : 'none',
                                opacity: fade(f, 22 + i * 8),
                            }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 6,
                                    background: P.rose, color: P.paper,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 26, fontWeight: 900,
                                }}>✓</div>
                                <div style={{ fontSize: 32, color: it.main ? P.primaryDeep : P.muted, fontWeight: it.main ? 800 : 600 }}>
                                    {it.label}
                                </div>
                                {!it.main && (
                                    <div style={{ marginLeft: 'auto', fontSize: 22, color: P.warmDeep, fontWeight: 700 }}>
                                        ← 一緒に消える
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{
                    marginTop: 8, fontSize: 28, color: P.ink, opacity: fade(f, 70),
                }}>
                    だから「キャッシュ消したらログアウト」が起きる
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 14: DNSは別々
// ───────────────────────────────────────────────
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>DNS キャッシュは2つ並列</div>
            <div style={{ display: 'flex', gap: 36 }}>
                {[
                    { label: 'OS', sub: 'システム全体', cmd: 'ipconfig /flushdns' },
                    { label: 'Chrome', sub: 'ブラウザ内独自', cmd: 'chrome://net-internals/#dns' },
                ].map((b, i) => (
                    <div key={b.label} style={{
                        width: 380, padding: '28px 24px', borderRadius: 22,
                        background: P.paper, border: `3px solid ${i === 0 ? P.accent : P.primary}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                        opacity: fade(f, 14 + i * 12),
                        transform: `translateY(${rise(f, 14 + i * 12)}px)`,
                    }}>
                        <div style={{ fontSize: 44, fontWeight: 900, color: i === 0 ? P.accentDeep : P.primaryDeep }}>
                            {b.label}
                        </div>
                        <div style={{ fontSize: 26, color: P.muted }}>{b.sub}</div>
                        <div style={{
                            marginTop: 8, padding: '12px 18px',
                            background: P.ink, color: P.paper,
                            fontFamily: 'Menlo, Monaco, monospace', fontSize: 18, borderRadius: 8,
                        }}>{b.cmd}</div>
                        <div style={{ fontSize: 24, color: P.muted, marginTop: 6 }}>独立した DNS cache</div>
                    </div>
                ))}
            </div>
            <div style={{
                marginTop: 12, fontSize: 30, color: P.ink, opacity: fade(f, 60),
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                padding: '14px 28px',
            }}>片方を消しても、もう片方は残る</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 15: CDNも仲間
// ───────────────────────────────────────────────
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => {
    const dots = [
        { x: 200, y: 150 }, { x: 350, y: 110 }, { x: 480, y: 180 },
        { x: 600, y: 130 }, { x: 720, y: 200 }, { x: 250, y: 240 },
        { x: 540, y: 250 }, { x: 680, y: 100 }, { x: 800, y: 170 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
                <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>世界中の中継地に分散コピー</div>
                <svg width={920} height={340} style={{ opacity: fade(f, 14) }}>
                    {/* 簡易世界マップ */}
                    <rect x={0} y={0} width={920} height={340} fill={P.primary} opacity={0.06} rx={16} />
                    {[
                        'M 120 130 q 60 -30 130 -10 l 40 30 l -20 50 l -50 30 l -80 -10 z',
                        'M 320 100 q 80 -10 160 30 q 30 50 -20 90 q -100 20 -150 -10 z',
                        'M 540 90 q 100 -20 200 30 q 40 80 -30 120 q -120 20 -180 -30 z',
                    ].map((d, i) => (
                        <path key={i} d={d} fill={P.primaryDeep} opacity={0.18} />
                    ))}
                    {dots.map((p, i) => (
                        <g key={i} opacity={fade(f, 22 + i * 4)}>
                            <circle cx={p.x} cy={p.y} r={16} fill={P.warm} stroke={P.warmDeep} strokeWidth={3} />
                            <circle cx={p.x} cy={p.y} r={26} fill="none" stroke={P.warm} strokeWidth={2} opacity={0.4} />
                        </g>
                    ))}
                </svg>
                <div style={{
                    display: 'flex', gap: 20,
                    opacity: fade(f, 60),
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: P.warm, border: `2px solid ${P.warmDeep}` }} />
                        <span style={{ fontSize: 28, color: P.ink }}>CDN エッジ</span>
                    </div>
                    <div style={{ fontSize: 26, color: P.muted }}>＝ ユーザーから手の届かないキャッシュ</div>
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 16: 消したのに残る訳
// ───────────────────────────────────────────────
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, width: 1100 }}>
            <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>HTTP仕様 stale-while-revalidate</div>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 18, marginTop: 16,
                opacity: fade(f, 14),
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        padding: '20px 28px', borderRadius: 14,
                        background: P.paper, border: `3px solid ${P.muted}`,
                        fontSize: 30, fontWeight: 700, color: P.muted,
                    }}>古いキャッシュ</div>
                    <div style={{ fontSize: 22, color: P.muted }}>1. すぐ表示</div>
                </div>
                <div style={{ fontSize: 50, color: P.warm, opacity: fade(f, 28) }}>→</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        padding: '20px 28px', borderRadius: 14,
                        background: P.paper, border: `3px solid ${P.primary}`,
                        fontSize: 30, fontWeight: 700, color: P.primaryDeep,
                        opacity: fade(f, 22),
                    }}>ユーザー画面</div>
                </div>
                <div style={{ fontSize: 50, color: P.muted, opacity: fade(f, 38) }}>＋</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        padding: '20px 28px', borderRadius: 14,
                        background: P.accent, color: P.paper,
                        fontSize: 30, fontWeight: 700,
                        opacity: fade(f, 38),
                    }}>裏で最新を取得</div>
                    <div style={{ fontSize: 22, color: P.muted }}>2. こっそり差し替え</div>
                </div>
            </div>
            <div style={{
                marginTop: 24, fontSize: 32, color: P.ink, opacity: fade(f, 60),
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                padding: '14px 28px',
            }}>「最新が出ない」のはバグではなく仕様どおり</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 17: 消すと速い神話
// ───────────────────────────────────────────────
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>「キャッシュを消すと速くなる」</div>
            <div style={{ position: 'relative', opacity: fade(f, 18) }}>
                <div style={{
                    fontSize: 90, fontWeight: 900, color: P.primaryDeep, padding: '28px 64px',
                    background: P.paper, border: `3px solid ${P.border}`, borderRadius: 22,
                    boxShadow: '0 18px 44px rgba(15,23,42,0.10)',
                }}>速くなる</div>
                <svg width={460} height={140} style={{
                    position: 'absolute', top: -10, left: -40,
                    opacity: fade(f, 38),
                }}>
                    <line x1={20} y1={30} x2={440} y2={120} stroke={P.rose} strokeWidth={14} strokeLinecap="round" />
                    <line x1={20} y1={120} x2={440} y2={30} stroke={P.rose} strokeWidth={14} strokeLinecap="round" />
                </svg>
            </div>
            <div style={{
                marginTop: 28, fontSize: 44, color: P.rose, fontWeight: 800,
                opacity: fade(f, 56),
            }}>結論：半分は神話</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 18: 再ダウンロードの罠
// ───────────────────────────────────────────────
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => {
    const progress = interpolate(f, [16, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: 1000 }}>
                <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>キャッシュ消去直後のサイト訪問</div>
                <div style={{
                    width: '100%', padding: 26, borderRadius: 16,
                    background: P.paper, border: `2px solid ${P.border}`,
                    opacity: fade(f, 14),
                }}>
                    <div style={{ fontSize: 28, color: P.ink, marginBottom: 18 }}>画像・動画・CSS・スクリプト...全部ダウンロードし直し</div>
                    <div style={{
                        height: 36, background: P.border, borderRadius: 18, overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${progress * 100}%`, height: '100%',
                            background: `linear-gradient(90deg, ${P.warm}, ${P.rose})`,
                            transition: 'width 0.1s',
                        }} />
                    </div>
                    <div style={{
                        marginTop: 12, display: 'flex', justifyContent: 'space-between',
                        fontSize: 22, color: P.muted,
                    }}>
                        <span>0 KB</span>
                        <span style={{ color: P.warmDeep, fontWeight: 700 }}>{Math.round(progress * 100)}%</span>
                        <span>あなたが「軽くしたい」と思っていた帯域</span>
                    </div>
                </div>
                <div style={{
                    fontSize: 36, color: P.ink, opacity: fade(f, 80),
                    background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                    padding: '14px 28px',
                }}>消した直後はむしろ遅くなる</div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 19: カーネルの警告
// ───────────────────────────────────────────────
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, width: 1100 }}>
            <div style={{ fontSize: 36, color: P.muted, opacity: fade(f, 4) }}>Linux Kernel Documentation: vm.drop_caches</div>
            <div style={{
                position: 'relative', width: '100%',
                padding: '36px 48px', borderRadius: 22,
                background: P.paper, border: `3px solid ${P.warm}`,
                boxShadow: `0 18px 44px rgba(245, 158, 11, 0.18)`,
                opacity: fade(f, 14),
            }}>
                <div style={{
                    position: 'absolute', top: -28, left: 32,
                    fontSize: 96, color: P.warm, fontFamily: 'Georgia, serif',
                    lineHeight: 1,
                }}>“</div>
                <div style={{ fontSize: 38, color: P.ink, lineHeight: 1.6, marginTop: 14 }}>
                    not recommended for use in production<br />
                    <span style={{ color: P.warmDeep, fontWeight: 700 }}>except for testing and debugging</span>
                </div>
            </div>
            <div style={{
                fontSize: 32, color: P.ink, opacity: fade(f, 50),
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                padding: '14px 28px',
            }}>作った本人たちが「むやみに消すな」と書いている</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 20: それでもボタンはある
// ───────────────────────────────────────────────
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>ボタンが残った経緯</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 18 }}>
                <div style={{
                    width: 320, padding: 26, borderRadius: 18,
                    background: P.paper, border: `3px solid ${P.muted}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                    opacity: fade(f, 12),
                }}>
                    <div style={{ fontSize: 28, color: P.muted }}>もともと</div>
                    <div style={{ fontSize: 36, fontWeight: 800, color: P.ink }}>開発者の<br />デバッグ用</div>
                    <div style={{
                        fontSize: 18, color: P.muted, fontFamily: 'Menlo, monospace',
                        background: P.bg, padding: '8px 12px', borderRadius: 6,
                    }}>古い表示の強制リセット</div>
                </div>
                <div style={{ fontSize: 60, color: P.warm, opacity: fade(f, 30) }}>→</div>
                <div style={{
                    width: 320, padding: 26, borderRadius: 18,
                    background: P.primary, color: P.paper,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                    opacity: fade(f, 36),
                    transform: `scale(${interpolate(f, [36, 56], [0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                    boxShadow: `0 14px 32px ${P.primaryGlow}`,
                }}>
                    <div style={{ fontSize: 28, opacity: 0.85 }}>いまは</div>
                    <div style={{ fontSize: 36, fontWeight: 800 }}>一般UIの<br />ボタン</div>
                    <div style={{ fontSize: 18, opacity: 0.85 }}>サポート窓口の定型案内</div>
                </div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 21: 指紋は消えない
// ───────────────────────────────────────────────
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>キャッシュ消去 ＋ Cookie消去 ＋ VPN</div>
            <svg width={260} height={300} style={{ opacity: fade(f, 14) }}>
                {/* 指紋 */}
                <g fill="none" stroke={P.primaryDeep} strokeWidth={5} strokeLinecap="round">
                    <path d="M 130 50 Q 70 70 70 150 Q 70 230 130 260" />
                    <path d="M 130 70 Q 90 90 90 150 Q 90 220 130 240" />
                    <path d="M 130 90 Q 110 110 110 150 Q 110 210 130 220" />
                    <path d="M 130 110 Q 125 130 125 150 Q 125 200 130 210" />
                    <path d="M 130 50 Q 190 70 190 150 Q 190 230 130 260" />
                    <path d="M 130 70 Q 170 90 170 150 Q 170 220 130 240" />
                    <path d="M 130 90 Q 150 110 150 150 Q 150 210 130 220" />
                </g>
            </svg>
            <div style={{
                fontSize: 38, color: P.rose, fontWeight: 800,
                opacity: fade(f, 36),
            }}>同じ指紋が出てくる</div>
            <div style={{
                fontSize: 26, color: P.muted, opacity: fade(f, 50),
                maxWidth: 720, textAlign: 'center', lineHeight: 1.6,
            }}>
                GPU・フォント・ブラウザ構成から毎回再計算される識別情報<br />
                キャッシュやCookieとは別ルート
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 22: iOSに無い理由
// ───────────────────────────────────────────────
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>iPhone「ストレージ」画面（イメージ）</div>
            <div style={{
                width: 540, padding: 28, borderRadius: 22,
                background: P.paper, border: `2px solid ${P.border}`,
                boxShadow: '0 18px 44px rgba(15,23,42,0.10)',
                opacity: fade(f, 14),
            }}>
                {[
                    { l: 'App のオフロード', has: true },
                    { l: 'Appを削除', has: true },
                    { l: 'キャッシュを削除', has: false },
                ].map((it, i) => (
                    <div key={it.l} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '18px 6px', borderBottom: i < 2 ? `1px solid ${P.border}` : 'none',
                        opacity: fade(f, 22 + i * 12),
                    }}>
                        <span style={{ fontSize: 32, color: it.has ? P.ink : P.muted, textDecoration: it.has ? 'none' : 'line-through' }}>
                            {it.l}
                        </span>
                        {it.has ? (
                            <span style={{ fontSize: 32, color: P.muted }}>{'>'}</span>
                        ) : (
                            <span style={{
                                fontSize: 22, color: P.rose, fontWeight: 700,
                                padding: '4px 10px', border: `2px solid ${P.rose}`, borderRadius: 8,
                            }}>存在しない</span>
                        )}
                    </div>
                ))}
            </div>
            <div style={{
                marginTop: 12, fontSize: 30, color: P.ink, opacity: fade(f, 64),
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                padding: '14px 28px',
            }}>OSが空き容量に応じて自動で消す建て付け</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 23: 隠す派と見せる派
// ───────────────────────────────────────────────
const Scene23: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>OSの哲学の違い</div>
            <div style={{ display: 'flex', gap: 28, marginTop: 12 }}>
                {[
                    { os: 'iOS', tag: '隠す派', color: P.primary, dark: P.primaryDeep, text: 'ユーザーに意識させない' },
                    { os: 'Android', tag: '見せる派', color: P.accent, dark: P.accentDeep, text: 'アプリごとにサイズ表示・消去ボタン' },
                ].map((b, i) => (
                    <div key={b.os} style={{
                        width: 380, padding: '32px 28px', borderRadius: 22,
                        background: P.paper, border: `3px solid ${b.color}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                        opacity: fade(f, 14 + i * 12),
                        transform: `translateY(${rise(f, 14 + i * 12)}px)`,
                    }}>
                        <div style={{ fontSize: 56, fontWeight: 900, color: b.dark }}>{b.os}</div>
                        <div style={{
                            fontSize: 32, fontWeight: 800, color: P.paper,
                            background: b.color, padding: '8px 24px', borderRadius: 999,
                        }}>{b.tag}</div>
                        <div style={{ fontSize: 26, color: P.ink, textAlign: 'center', lineHeight: 1.5, marginTop: 8 }}>
                            {b.text}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ fontSize: 28, color: P.muted, marginTop: 8, opacity: fade(f, 50) }}>
                どちらが正解という話ではなく、別の価値観
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 24: OEMで揺れる事情
// ───────────────────────────────────────────────
const Scene24: React.FC<SceneProps> = ({ localFrame: f }) => {
    const rows = [
        { vendor: '純正 Android', label: 'Clear storage' },
        { vendor: 'Samsung One UI', label: 'Clear data' },
        { vendor: 'Xiaomi HyperOS', label: 'Security app で自動清掃' },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, width: 1100 }}>
                <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4) }}>同じ Android でもラベルが揃わない</div>
                <div style={{
                    width: '100%', padding: 24, borderRadius: 18,
                    background: P.paper, border: `2px solid ${P.border}`,
                    opacity: fade(f, 14),
                }}>
                    {rows.map((r, i) => (
                        <div key={r.vendor} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '20px 12px', borderBottom: i < rows.length - 1 ? `1px solid ${P.border}` : 'none',
                            opacity: fade(f, 22 + i * 10),
                        }}>
                            <span style={{ fontSize: 32, color: P.ink, fontWeight: 700 }}>{r.vendor}</span>
                            <span style={{
                                fontSize: 26, color: P.warmDeep, fontWeight: 700,
                                background: P.bg, padding: '8px 18px', borderRadius: 8,
                                fontFamily: 'Menlo, monospace',
                            }}>{r.label}</span>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 8, fontSize: 30, color: P.ink, opacity: fade(f, 60),
                    background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                    padding: '14px 28px',
                }}>仕様・実装・表示の三つが揃っていない</div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 25: 正体を一枚に
// ───────────────────────────────────────────────
const Scene25: React.FC<SceneProps> = ({ localFrame: f }) => {
    const layers = [
        { l: 'CPU L1/L2/L3', c: P.primary, w: 1100 },
        { l: 'OS ページキャッシュ', c: P.primaryDeep, w: 1000 },
        { l: 'DNS（OS / ブラウザ別）', c: P.accent, w: 920 },
        { l: 'HTTP キャッシュ', c: P.accentDeep, w: 840 },
        { l: 'Service Worker / bfcache', c: P.warm, w: 760 },
        { l: 'CDN エッジ', c: P.warmDeep, w: 680 },
        { l: 'アプリ Caches', c: P.rose, w: 600 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: 1180 }}>
                <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>「キャッシュ」の正体</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    {layers.map((it, i) => (
                        <div key={it.l} style={{
                            width: it.w, padding: '14px 24px', borderRadius: 10,
                            background: it.c, color: P.paper,
                            fontSize: 28, fontWeight: 700, textAlign: 'center',
                            opacity: fade(f, 12 + i * 7),
                            transform: `translateY(${rise(f, 12 + i * 7, 28 + i * 7, 12)}px)`,
                        }}>{it.l}</div>
                    ))}
                </div>
                <div style={{
                    marginTop: 14, fontSize: 28, color: P.ink, opacity: fade(f, 70),
                    background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                    padding: '12px 24px',
                }}>ボタン1つは、このどれか1〜2層を消しているだけ</div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 26: プロでも最難問
// ───────────────────────────────────────────────
const Scene26: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: 1100 }}>
            <div style={{ fontSize: 36, color: P.muted, opacity: fade(f, 4) }}>Phil Karlton（Netscape）の格言</div>
            <div style={{
                position: 'relative', width: '100%',
                padding: '40px 56px', borderRadius: 26,
                background: P.paper, border: `3px solid ${P.primary}`,
                boxShadow: `0 18px 44px ${P.primaryGlow}`,
                opacity: fade(f, 14),
            }}>
                <div style={{
                    position: 'absolute', top: -32, left: 32,
                    fontSize: 110, color: P.primary, fontFamily: 'Georgia, serif', lineHeight: 1,
                }}>“</div>
                <div style={{ fontSize: 36, color: P.ink, lineHeight: 1.6, marginTop: 14, fontStyle: 'italic' }}>
                    There are only two hard things in Computer Science:<br />
                    <span style={{ color: P.primaryDeep, fontWeight: 800, fontStyle: 'normal' }}>cache invalidation</span> and <span style={{ color: P.primaryDeep, fontWeight: 800, fontStyle: 'normal' }}>naming things</span>.
                </div>
            </div>
            <div style={{
                fontSize: 32, color: P.ink, opacity: fade(f, 50),
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                padding: '14px 28px', marginTop: 6,
            }}>「いつ消すか」がプロでも最難問だと言われている</div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 27: 目的で使い分ける
// ───────────────────────────────────────────────
const Scene27: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { goal: 'ストレージ容量', action: '気にせず消してOK', color: P.emerald, ok: true },
        { goal: '特定サイトが最新にならない', action: 'そのサイトだけ消す', color: P.accent, ok: true },
        { goal: '動作が重い', action: 'まずは再起動', color: P.warm, ok: true },
        { goal: 'なんとなく不安', action: '効きにくい', color: P.rose, ok: false },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: 1180 }}>
                <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 4), letterSpacing: 4 }}>目的別の使い分け</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', marginTop: 8 }}>
                    {items.map((it, i) => (
                        <div key={it.goal} style={{
                            display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24,
                            padding: '20px 32px', borderRadius: 16,
                            background: P.paper, border: `2px solid ${it.color}`,
                            opacity: fade(f, 14 + i * 9),
                            transform: `translateX(${interpolate(f, [14 + i * 9, 32 + i * 9], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                        }}>
                            <div style={{ fontSize: 32, color: P.ink, fontWeight: 700 }}>{it.goal}</div>
                            <div style={{ fontSize: 36, color: it.color }}>→</div>
                            <div style={{ fontSize: 32, color: it.color, fontWeight: 800 }}>
                                {!it.ok && <span style={{ marginRight: 8 }}>×</span>}{it.action}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 28: また次の動画で
// ───────────────────────────────────────────────
const Scene28: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
            <div style={{
                fontSize: 70, fontWeight: 900, color: P.primaryDeep, letterSpacing: 4,
                opacity: fade(f, 4), transform: `translateY(${rise(f, 4)}px)`,
            }}>ご視聴ありがとうございました</div>
            <div style={{
                fontSize: 38, color: P.muted, opacity: fade(f, 24),
            }}>画面の裏が、少しだけ見えるようになる回でした</div>
            <div style={{
                marginTop: 24,
                padding: '18px 36px', borderRadius: 18,
                background: `linear-gradient(135deg, ${P.primary}, ${P.accent})`,
                color: P.paper, fontSize: 36, fontWeight: 800, letterSpacing: 4,
                boxShadow: `0 14px 32px ${P.primaryGlow}`,
                opacity: fade(f, 40),
            }}>また次の動画で</div>
        </div>
    </Stage>
);

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9,
    Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16, Scene17, Scene18, Scene19,
    Scene20, Scene21, Scene22, Scene23, Scene24, Scene25, Scene26, Scene27, Scene28,
];

export const SCENE_TITLES: string[] = [
    '押してるあのボタン', '何を消した？', '今日の道筋', '実はフランス語', '隠し場所が語源',
    '1965年の命名', '編集者の一言', '冷蔵庫とスーパー', '速度差の正体', '手元と保管庫',
    'ヒット率95%', '実は分身している', 'ブラウザの中身', 'Cookieも巻き込む', 'DNSは別々',
    'CDNも仲間', '消したのに残る訳', '消すと速い神話', '再ダウンロードの罠', 'カーネルの警告',
    'それでもボタンはある', '指紋は消えない', 'iOSに無い理由', '隠す派と見せる派', 'OEMで揺れる事情',
    '正体を一枚に', 'プロでも最難問', '目的で使い分ける', 'また次の動画で',
];
