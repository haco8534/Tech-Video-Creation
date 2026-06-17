import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const YouTubeIcon: React.FC<{ width: number }> = ({ width }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 180" width={width} height={width * (180 / 256)} style={{ display: 'block' }}>
        <path fill="#FF0000" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" />
        <path fill="#FFFFFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
    </svg>
);

// Palette: 青=論理/CS, 琥珀=人間の直感, エメラルド=正しさ, ローズ=誤り, 紫=思想, 金=時を超える
const P = {
    ...BASE_COLORS,
    primary: '#1D4ED8',
    primaryDeep: '#1E3A8A',
    primaryGlow: 'rgba(29, 78, 216, 0.22)',
    accent: '#F59E0B',
    accentDeep: '#B45309',
    warm: '#FB923C',
    rose: '#E11D48',
    emerald: '#059669',
    violet: '#7C3AED',
    gold: '#CA8A04',
    ink: '#0F172A',
    paper: '#FFFFFF',
    muted: '#94A3B8',
    panel: 'rgba(255,255,255,0.92)',
    border: 'rgba(15, 23, 42, 0.10)',
    gridLine: 'rgba(30, 58, 138, 0.10)',
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

const Card: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties; opacity?: number }>> = ({ children, style, opacity = 1 }) => (
    <div style={{
        background: P.panel, border: `2px solid ${P.border}`,
        borderRadius: 24, padding: '32px 40px',
        boxShadow: '0 18px 44px rgba(15, 23, 42, 0.08)',
        opacity,
        ...style,
    }}>{children}</div>
);

// ───────────────────────────────────────────────
// Scene 0: Opening
// ───────────────────────────────────────────────
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center', opacity: fade(f, 4), transform: `translateY(${rise(f, 4, 28, 28)}px)` }}>
            <div style={{ fontSize: 52, color: P.muted, letterSpacing: 10, marginBottom: 28 }}>今日のテーマ</div>
            <div style={{
                fontSize: 108, fontWeight: 900, letterSpacing: 2,
                background: `linear-gradient(135deg, ${P.primary} 0%, ${P.violet} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.15,
            }}>
                アルゴリズムって<br />結局なんなのか
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 28, justifyContent: 'center', opacity: fade(f, 26) }}>
                {['古典', '定義', '誤解', '速さ'].map((t, i) => (
                    <div key={t} style={{
                        padding: '20px 40px', borderRadius: 999,
                        background: P.paper, border: `2px solid ${P.border}`,
                        fontSize: 46, fontWeight: 700, color: P.primaryDeep,
                        opacity: fade(f, 30 + i * 6),
                    }}>{t}</div>
                ))}
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 1: 3つのアルゴリズム
// ───────────────────────────────────────────────
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { era: '2020年代', label: '推薦システム', icon: 'yt', color: P.rose, sub: 'YouTubeのおすすめ' },
        { era: '紀元前 300 年', label: '互除法', icon: 'scroll', color: P.gold, sub: 'Euclidの手順' },
        { era: '入門書にある', label: '並び替え', icon: 'code', color: P.primary, sub: 'sort のアルゴリズム' },
    ];
    return (
        <Stage>
            <div>
                <div style={{ textAlign: 'center', fontSize: 48, fontWeight: 800, color: P.ink, marginBottom: 40, opacity: fade(f, 2) }}>
                    全部「アルゴリズム」と呼ばれている
                </div>
                <div style={{ display: 'flex', gap: 36, alignItems: 'stretch', justifyContent: 'center' }}>
                    {items.map((it, i) => (
                        <Card key={it.label} style={{
                            width: 360, textAlign: 'center',
                            transform: `translateY(${rise(f, 10 + i * 10)}px)`,
                            opacity: fade(f, 10 + i * 10),
                            borderTop: `6px solid ${it.color}`,
                        }}>
                            <div style={{ fontSize: 28, color: P.muted, marginBottom: 14 }}>{it.era}</div>
                            <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {it.icon === 'yt' && <YouTubeIcon width={140} />}
                                {it.icon === 'scroll' && (
                                    <svg viewBox="0 0 140 140" width={140} height={140}>
                                        <rect x="22" y="18" width="96" height="104" rx="6" fill="#F3E8D2" stroke={P.gold} strokeWidth="3" />
                                        {[40, 56, 72, 88, 104].map(y => (
                                            <line key={y} x1="34" y1={y} x2="106" y2={y} stroke={P.accentDeep} strokeWidth="2" opacity="0.6" />
                                        ))}
                                    </svg>
                                )}
                                {it.icon === 'code' && (
                                    <svg viewBox="0 0 160 140" width={160} height={140}>
                                        <rect x="10" y="14" width="140" height="112" rx="10" fill={P.primaryDeep} />
                                        <circle cx="28" cy="30" r="5" fill="#EF4444" />
                                        <circle cx="44" cy="30" r="5" fill="#F59E0B" />
                                        <circle cx="60" cy="30" r="5" fill="#10B981" />
                                        {[52, 66, 80, 94, 108].map((y, j) => (
                                            <rect key={y} x="24" y={y} width={[60, 90, 50, 80, 40][j]} height="6" rx="3" fill={['#60A5FA', '#FCD34D', '#A5F3FC', '#FCA5A5', '#C4B5FD'][j]} />
                                        ))}
                                    </svg>
                                )}
                            </div>
                            <div style={{ fontSize: 38, fontWeight: 800, color: it.color, marginTop: 14 }}>{it.label}</div>
                            <div style={{ fontSize: 26, color: P.muted, marginTop: 8 }}>{it.sub}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 2: 今日の見取り図
// ───────────────────────────────────────────────
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const routes = [
        { n: 1, title: '語源と歴史', sub: '人の名前・紀元前の手順', color: P.gold },
        { n: 2, title: '厳密な定義', sub: 'Knuth の5性質', color: P.primary },
        { n: 3, title: 'よくある誤解', sub: 'レシピ・コード・YouTube', color: P.rose },
        { n: 4, title: '速さの測り方', sub: '計算量という物差し', color: P.emerald },
    ];
    return (
        <Stage>
            <div>
                <div style={{ textAlign: 'center', fontSize: 46, fontWeight: 800, color: P.ink, marginBottom: 44, opacity: fade(f, 2) }}>
                    今日の順路
                </div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
                    {routes.map((r, i) => (
                        <React.Fragment key={r.n}>
                            <Card style={{
                                width: 280, textAlign: 'center', padding: '28px 24px',
                                transform: `translateY(${rise(f, 12 + i * 8)}px)`,
                                opacity: fade(f, 12 + i * 8),
                            }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    background: r.color, color: P.paper,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 42, fontWeight: 900, margin: '0 auto 16px',
                                }}>{r.n}</div>
                                <div style={{ fontSize: 34, fontWeight: 800, color: r.color }}>{r.title}</div>
                                <div style={{ fontSize: 24, color: P.muted, marginTop: 8 }}>{r.sub}</div>
                            </Card>
                            {i < routes.length - 1 && (
                                <div style={{
                                    fontSize: 46, color: P.muted,
                                    opacity: fade(f, 18 + i * 8),
                                }}>›</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 3: 人の名前だった
// ───────────────────────────────────────────────
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 2) }}>語源は、一人の人の名前</div>
            <Card style={{
                padding: '40px 56px', textAlign: 'center',
                borderTop: `6px solid ${P.gold}`,
                transform: `translateY(${rise(f, 10)}px)`, opacity: fade(f, 10),
            }}>
                <div style={{ fontSize: 32, color: P.muted, marginBottom: 16 }}>9世紀 バグダード・知恵の館</div>
                <div style={{ fontSize: 62, fontWeight: 800, color: P.accentDeep, letterSpacing: 1, lineHeight: 1.2 }}>
                    Muhammad ibn Musa<br />al-Khwarizmi
                </div>
                <div style={{ fontSize: 30, color: P.muted, marginTop: 14 }}>c. 780 – c. 850</div>
            </Card>
            <div style={{ fontSize: 58, color: P.primary, opacity: fade(f, 30) }}>↓ 12世紀ラテン訳</div>
            <Card style={{
                padding: '24px 56px', textAlign: 'center',
                transform: `translateY(${rise(f, 36)}px)`, opacity: fade(f, 36),
            }}>
                <div style={{ fontSize: 50, fontWeight: 800, color: P.primaryDeep, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Algoritmi</div>
            </Card>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 4: 代数との兄弟関係
// ───────────────────────────────────────────────
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1200 540" width="100%" height="100%" style={{ maxWidth: 1200 }}>
            <defs>
                <marker id="arrS4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill={P.muted} />
                </marker>
            </defs>
            {/* Root person */}
            <g opacity={fade(f, 2)}>
                <rect x="470" y="40" width="260" height="110" rx="18" fill={P.paper} stroke={P.gold} strokeWidth="3" />
                <text x="600" y="85" fontSize="28" textAnchor="middle" fill={P.accentDeep} fontWeight="700">al-Khwarizmi</text>
                <text x="600" y="120" fontSize="22" textAnchor="middle" fill={P.muted}>9世紀 ペルシャの数学者</text>
            </g>
            {/* Branches */}
            <g opacity={fade(f, 18)}>
                <line x1="600" y1="150" x2="300" y2="290" stroke={P.muted} strokeWidth="2" markerEnd="url(#arrS4)" />
                <line x1="600" y1="150" x2="900" y2="290" stroke={P.muted} strokeWidth="2" markerEnd="url(#arrS4)" />
            </g>
            {/* Left: Al-Jabr → algebra */}
            <g opacity={fade(f, 22)} transform={`translate(0,${rise(f, 22, 40, 14)})`}>
                <rect x="130" y="300" width="340" height="140" rx="18" fill={P.paper} stroke={P.violet} strokeWidth="3" />
                <text x="300" y="340" fontSize="26" textAnchor="middle" fill={P.muted} fontStyle="italic">著作 "Al-Jabr"</text>
                <text x="300" y="395" fontSize="44" textAnchor="middle" fill={P.violet} fontWeight="800">algebra</text>
                <text x="300" y="425" fontSize="22" textAnchor="middle" fill={P.muted}>代数</text>
            </g>
            {/* Right: name → algorithm */}
            <g opacity={fade(f, 30)} transform={`translate(0,${rise(f, 30, 48, 14)})`}>
                <rect x="730" y="300" width="340" height="140" rx="18" fill={P.paper} stroke={P.primary} strokeWidth="3" />
                <text x="900" y="340" fontSize="26" textAnchor="middle" fill={P.muted}>名前のラテン音写</text>
                <text x="900" y="395" fontSize="44" textAnchor="middle" fill={P.primary} fontWeight="800">algorithm</text>
                <text x="900" y="425" fontSize="22" textAnchor="middle" fill={P.muted}>手続き一般</text>
            </g>
            {/* Caption */}
            <text x="600" y="500" fontSize="30" textAnchor="middle" fill={P.ink} fontWeight="700" opacity={fade(f, 44)}>
                代数とアルゴリズムは「兄弟語」
            </text>
        </svg>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 5: 紀元前300年の手順
// ───────────────────────────────────────────────
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 800, color: P.ink, marginBottom: 50, opacity: fade(f, 2) }}>
                記録された最古の非自明なアルゴリズム
            </div>
            <div style={{ position: 'relative', margin: '0 60px', height: 240 }}>
                {/* Timeline line */}
                <div style={{
                    position: 'absolute', left: 0, right: 0, top: 120, height: 6,
                    background: `linear-gradient(90deg, ${P.gold}, ${P.primary})`, borderRadius: 3,
                    opacity: fade(f, 10),
                }} />
                {/* Left label: -300 */}
                <div style={{ position: 'absolute', left: 0, top: 0, width: 260, opacity: fade(f, 16) }}>
                    <div style={{ fontSize: 60, fontWeight: 900, color: P.gold }}>紀元前 300</div>
                    <div style={{ fontSize: 28, color: P.muted, marginTop: 8 }}>Euclid『原論』第7巻</div>
                </div>
                {/* Right label: 2026 */}
                <div style={{ position: 'absolute', right: 0, top: 0, width: 260, textAlign: 'right', opacity: fade(f, 24) }}>
                    <div style={{ fontSize: 60, fontWeight: 900, color: P.primary }}>2026</div>
                    <div style={{ fontSize: 28, color: P.muted, marginTop: 8 }}>今もスマホの中で動作</div>
                </div>
                {/* Dots */}
                <div style={{
                    position: 'absolute', left: 36, top: 105, width: 36, height: 36, borderRadius: '50%',
                    background: P.gold, opacity: fade(f, 12),
                    boxShadow: `0 0 0 8px ${P.gold}33`,
                }} />
                <div style={{
                    position: 'absolute', right: 36, top: 105, width: 36, height: 36, borderRadius: '50%',
                    background: P.primary, opacity: fade(f, 20),
                    boxShadow: `0 0 0 8px ${P.primary}33`,
                }} />
                {/* Middle tick */}
                <div style={{
                    position: 'absolute', left: '50%', top: 180, transform: 'translateX(-50%)',
                    textAlign: 'center', opacity: fade(f, 32),
                }}>
                    <div style={{ fontSize: 46, fontWeight: 800, color: P.emerald }}>2,300 年</div>
                    <div style={{ fontSize: 28, color: P.muted, marginTop: 4 }}>現役の手順</div>
                </div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 6: 互除法は今も現役
// ───────────────────────────────────────────────
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
            {/* Left: 互除法の手順 */}
            <Card style={{
                padding: '32px 40px', minWidth: 420,
                borderTop: `6px solid ${P.gold}`,
                transform: `translateY(${rise(f, 4)}px)`, opacity: fade(f, 4),
            }}>
                <div style={{ fontSize: 32, color: P.muted, marginBottom: 14 }}>Euclid の互除法</div>
                <div style={{ fontSize: 38, fontFamily: 'Georgia, serif', lineHeight: 1.7, color: P.ink }}>
                    <div>56 = 4 × 12 + <span style={{ color: P.rose }}>8</span></div>
                    <div>12 = 1 × 8 + <span style={{ color: P.rose }}>4</span></div>
                    <div>8 = 2 × 4 + <span style={{ color: P.emerald }}>0</span></div>
                </div>
                <div style={{ marginTop: 16, fontSize: 30, color: P.emerald, fontWeight: 700 }}>→ GCD = 4</div>
            </Card>
            <div style={{ fontSize: 66, color: P.muted, opacity: fade(f, 20) }}>→</div>
            {/* Right: RSA padlock */}
            <div style={{ textAlign: 'center', opacity: fade(f, 26), transform: `translateY(${rise(f, 26)}px)` }}>
                <svg viewBox="0 0 160 180" width={140} height={160}>
                    <rect x="30" y="70" width="100" height="90" rx="12" fill={P.primary} />
                    <path d="M50,70 V45 a30,30 0 0 1 60,0 V70" fill="none" stroke={P.primary} strokeWidth="10" />
                    <circle cx="80" cy="115" r="10" fill={P.paper} />
                    <rect x="76" y="115" width="8" height="22" fill={P.paper} />
                </svg>
                <div style={{ fontSize: 42, fontWeight: 800, color: P.primaryDeep, marginTop: 12 }}>RSA 暗号</div>
                <div style={{ fontSize: 26, color: P.muted, marginTop: 6 }}>鍵生成で互除法が動く</div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 7: Knuth登場
// ───────────────────────────────────────────────
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
            {/* Book */}
            <div style={{ opacity: fade(f, 4), transform: `translateY(${rise(f, 4)}px)` }}>
                <svg viewBox="0 0 260 340" width={240} height={320}>
                    <rect x="20" y="10" width="220" height="320" rx="8" fill={P.primaryDeep} />
                    <rect x="26" y="16" width="208" height="308" rx="6" fill="#1e3a8a" opacity="0.55" />
                    <text x="130" y="90" fontSize="18" fill={P.gold} textAnchor="middle" fontWeight="700">The Art of</text>
                    <text x="130" y="118" fontSize="18" fill={P.gold} textAnchor="middle" fontWeight="700">Computer</text>
                    <text x="130" y="146" fontSize="18" fill={P.gold} textAnchor="middle" fontWeight="700">Programming</text>
                    <line x1="50" y1="170" x2="210" y2="170" stroke={P.gold} strokeWidth="2" opacity="0.6" />
                    <text x="130" y="210" fontSize="14" fill="#E5E7EB" textAnchor="middle">VOLUME 1</text>
                    <text x="130" y="280" fontSize="16" fill="#E5E7EB" textAnchor="middle">Donald E. Knuth</text>
                </svg>
            </div>
            <div style={{ opacity: fade(f, 20) }}>
                <div style={{ fontSize: 36, color: P.muted, marginBottom: 12 }}>1968年初版・今なお刊行中</div>
                <div style={{ fontSize: 70, fontWeight: 900, color: P.primaryDeep, lineHeight: 1.2 }}>
                    Donald Knuth
                </div>
                <div style={{ fontSize: 34, color: P.ink, marginTop: 14 }}>
                    CSの重鎮が示した <span style={{ color: P.emerald, fontWeight: 800 }}>5つの性質</span>
                </div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 8: 5つの性質
// ───────────────────────────────────────────────
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { en: 'Finiteness', ja: '有限性', color: P.primary },
        { en: 'Definiteness', ja: '明確性', color: P.violet },
        { en: 'Input', ja: '入力', color: P.emerald },
        { en: 'Output', ja: '出力', color: P.accentDeep },
        { en: 'Effectiveness', ja: '実行可能性', color: P.rose },
    ];
    return (
        <Stage>
            <div>
                <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 800, color: P.ink, marginBottom: 48, opacity: fade(f, 2) }}>
                    アルゴリズムが満たすべき 5 性質
                </div>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
                    {items.map((it, i) => (
                        <Card key={it.en} style={{
                            width: 220, padding: '26px 20px', textAlign: 'center',
                            borderTop: `6px solid ${it.color}`,
                            transform: `translateY(${rise(f, 8 + i * 6)}px)`,
                            opacity: fade(f, 8 + i * 6),
                        }}>
                            <div style={{
                                width: 62, height: 62, borderRadius: '50%',
                                background: it.color, color: P.paper,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 36, fontWeight: 900, margin: '0 auto 14px',
                            }}>{i + 1}</div>
                            <div style={{ fontSize: 26, color: it.color, fontWeight: 700, letterSpacing: 1 }}>{it.en}</div>
                            <div style={{ fontSize: 32, color: P.ink, fontWeight: 800, marginTop: 4 }}>{it.ja}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 9: 有限性
// ───────────────────────────────────────────────
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
            {/* Bad: infinite loop */}
            <Card style={{
                textAlign: 'center', padding: '36px 44px', width: 380,
                borderTop: `6px solid ${P.rose}`,
                transform: `translateY(${rise(f, 4)}px)`, opacity: fade(f, 4),
            }}>
                <div style={{ fontSize: 32, color: P.rose, fontWeight: 700, marginBottom: 20 }}>✕ 無限ループ</div>
                <svg viewBox="0 0 160 160" width={160} height={160} style={{ margin: '0 auto', display: 'block' }}>
                    <path d="M80,40 a40,40 0 1,1 -0.01,0" fill="none" stroke={P.rose} strokeWidth="10" strokeDasharray="10 6">
                        <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="3s" repeatCount="indefinite" />
                    </path>
                </svg>
                <div style={{ fontSize: 28, color: P.muted, marginTop: 14 }}>永遠に止まらない</div>
            </Card>
            <div style={{ fontSize: 44, color: P.muted, opacity: fade(f, 18) }}>vs</div>
            {/* Good: halts */}
            <Card style={{
                textAlign: 'center', padding: '36px 44px', width: 380,
                borderTop: `6px solid ${P.emerald}`,
                transform: `translateY(${rise(f, 22)}px)`, opacity: fade(f, 22),
            }}>
                <div style={{ fontSize: 32, color: P.emerald, fontWeight: 700, marginBottom: 20 }}>✓ 有限ステップで停止</div>
                <svg viewBox="0 0 200 160" width={200} height={160} style={{ margin: '0 auto', display: 'block' }}>
                    {[0, 1, 2, 3, 4].map(i => (
                        <g key={i}>
                            <circle cx={30 + i * 35} cy={80} r="12" fill={i === 4 ? P.emerald : P.primary} />
                            {i < 4 && <line x1={42 + i * 35} y1={80} x2={53 + i * 35} y2={80} stroke={P.muted} strokeWidth="3" markerEnd="" />}
                        </g>
                    ))}
                    <text x={30 + 4 * 35} y="125" textAnchor="middle" fontSize="14" fill={P.emerald} fontWeight="700">STOP</text>
                </svg>
                <div style={{ fontSize: 28, color: P.muted, marginTop: 14 }}>ちゃんと終わる</div>
            </Card>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 10: 明確性
// ───────────────────────────────────────────────
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', gap: 60, alignItems: 'stretch' }}>
            <Card style={{
                width: 420, padding: '34px 36px',
                borderTop: `6px solid ${P.rose}`,
                transform: `translateY(${rise(f, 4)}px)`, opacity: fade(f, 4),
            }}>
                <div style={{ fontSize: 30, color: P.rose, fontWeight: 700, marginBottom: 20 }}>✕ 明確性 落第</div>
                <div style={{ fontSize: 36, color: P.ink, lineHeight: 1.8 }}>
                    <div>・塩を <span style={{ background: '#FEE2E2', padding: '2px 8px', borderRadius: 4, color: P.rose }}>適度に</span></div>
                    <div>・肉を <span style={{ background: '#FEE2E2', padding: '2px 8px', borderRadius: 4, color: P.rose }}>美味しそうな色まで</span></div>
                    <div>・火を <span style={{ background: '#FEE2E2', padding: '2px 8px', borderRadius: 4, color: P.rose }}>弱火で</span></div>
                </div>
                <div style={{ fontSize: 26, color: P.muted, marginTop: 18 }}>人間の判断が必要</div>
            </Card>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 56, color: P.muted, opacity: fade(f, 18) }}>→</div>
            <Card style={{
                width: 420, padding: '34px 36px',
                borderTop: `6px solid ${P.emerald}`,
                transform: `translateY(${rise(f, 22)}px)`, opacity: fade(f, 22),
            }}>
                <div style={{ fontSize: 30, color: P.emerald, fontWeight: 700, marginBottom: 20 }}>✓ 明確性 合格</div>
                <div style={{ fontSize: 36, color: P.ink, lineHeight: 1.8 }}>
                    <div>・塩 <span style={{ background: '#D1FAE5', padding: '2px 8px', borderRadius: 4, color: P.emerald, fontWeight: 700 }}>5g</span></div>
                    <div>・中心温度 <span style={{ background: '#D1FAE5', padding: '2px 8px', borderRadius: 4, color: P.emerald, fontWeight: 700 }}>65℃</span></div>
                    <div>・ <span style={{ background: '#D1FAE5', padding: '2px 8px', borderRadius: 4, color: P.emerald, fontWeight: 700 }}>180W</span> 加熱</div>
                </div>
                <div style={{ fontSize: 26, color: P.muted, marginTop: 18 }}>誰が読んでも同じ結果</div>
            </Card>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 11: 入力と出力（自販機モデル）
// ───────────────────────────────────────────────
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1000 420" width="100%" height="100%" style={{ maxWidth: 1100 }}>
            <defs>
                <marker id="arrS11" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill={P.primary} />
                </marker>
            </defs>
            {/* Input */}
            <g opacity={fade(f, 4)} transform={`translate(${-rise(f, 4, 22, 20)},0)`}>
                <rect x="30" y="150" width="200" height="120" rx="16" fill={P.paper} stroke={P.emerald} strokeWidth="3" />
                <text x="130" y="180" fontSize="22" textAnchor="middle" fill={P.emerald} fontWeight="700">INPUT</text>
                <text x="130" y="220" fontSize="26" textAnchor="middle" fill={P.ink}>お金・ボタン</text>
                <text x="130" y="252" fontSize="22" textAnchor="middle" fill={P.muted}>材料</text>
            </g>
            {/* Arrow 1 */}
            <line x1="240" y1="210" x2="370" y2="210" stroke={P.primary} strokeWidth="4" markerEnd="url(#arrS11)" opacity={fade(f, 16)} />
            {/* Process - vending machine */}
            <g opacity={fade(f, 22)} transform={`translate(0,${-rise(f, 22, 40, 14)})`}>
                <rect x="380" y="110" width="240" height="200" rx="16" fill={P.primaryDeep} />
                <rect x="400" y="130" width="200" height="90" rx="8" fill="#1e3a8a" opacity="0.6" />
                {[0, 1, 2].map(r => [0, 1, 2].map(c => (
                    <rect key={`${r}${c}`} x={410 + c * 60} y={140 + r * 28} width="50" height="22" rx="3" fill="#60A5FA" opacity={0.4 + r * 0.2} />
                )))}
                <rect x="400" y="240" width="200" height="50" rx="6" fill="#334155" />
                <text x="500" y="273" fontSize="20" textAnchor="middle" fill={P.gold} fontWeight="700">ALGORITHM</text>
            </g>
            {/* Arrow 2 */}
            <line x1="630" y1="210" x2="760" y2="210" stroke={P.primary} strokeWidth="4" markerEnd="url(#arrS11)" opacity={fade(f, 32)} />
            {/* Output */}
            <g opacity={fade(f, 36)} transform={`translate(${rise(f, 36, 54, 20)},0)`}>
                <rect x="770" y="150" width="200" height="120" rx="16" fill={P.paper} stroke={P.accentDeep} strokeWidth="3" />
                <text x="870" y="180" fontSize="22" textAnchor="middle" fill={P.accentDeep} fontWeight="700">OUTPUT</text>
                <text x="870" y="220" fontSize="26" textAnchor="middle" fill={P.ink}>飲み物</text>
                <text x="870" y="252" fontSize="22" textAnchor="middle" fill={P.muted}>答え</text>
            </g>
        </svg>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 12: 実行可能性
// ───────────────────────────────────────────────
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
            <Card style={{
                width: 360, textAlign: 'center', padding: '36px 32px',
                borderTop: `6px solid ${P.emerald}`,
                transform: `translateY(${rise(f, 4)}px)`, opacity: fade(f, 4),
            }}>
                <svg viewBox="0 0 140 120" width={140} height={120} style={{ margin: '0 auto' }}>
                    <rect x="20" y="30" width="80" height="70" rx="3" fill="#F8FAFC" stroke={P.muted} strokeWidth="2" />
                    {[45, 58, 71, 84].map(y => <line key={y} x1="30" y1={y} x2="90" y2={y} stroke={P.muted} strokeWidth="1" opacity="0.5" />)}
                    <path d="M100,20 L120,30 L115,52 L95,42 Z" fill={P.gold} />
                </svg>
                <div style={{ fontSize: 32, color: P.emerald, fontWeight: 700, marginTop: 16 }}>✓ 紙と鉛筆</div>
                <div style={{ fontSize: 26, color: P.muted, marginTop: 8 }}>手で再現できる基本性</div>
            </Card>
            <div style={{ fontSize: 48, color: P.muted, opacity: fade(f, 18) }}>vs</div>
            <Card style={{
                width: 360, textAlign: 'center', padding: '36px 32px',
                borderTop: `6px solid ${P.rose}`,
                transform: `translateY(${rise(f, 22)}px)`, opacity: fade(f, 22),
            }}>
                <svg viewBox="0 0 140 120" width={140} height={120} style={{ margin: '0 auto' }}>
                    <circle cx="70" cy="50" r="22" fill={P.accent} opacity="0.4" />
                    <circle cx="70" cy="50" r="14" fill={P.accent} />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
                        const rad = (a * Math.PI) / 180;
                        return <line key={a} x1={70 + Math.cos(rad) * 28} y1={50 + Math.sin(rad) * 28} x2={70 + Math.cos(rad) * 40} y2={50 + Math.sin(rad) * 40} stroke={P.accent} strokeWidth="3" />;
                    })}
                    <text x="70" y="105" fontSize="14" textAnchor="middle" fill={P.rose}>「お告げ」</text>
                </svg>
                <div style={{ fontSize: 32, color: P.rose, fontWeight: 700, marginTop: 16 }}>✕ 神のお告げ</div>
                <div style={{ fontSize: 26, color: P.muted, marginTop: 8 }}>再現できない超能力</div>
            </Card>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 13: 同じ問題、複数の手順
// ───────────────────────────────────────────────
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    const bars = [3, 7, 1, 9, 4, 6, 2, 8, 5];
    const sorts = [
        { name: 'bubble sort', desc: '隣どうし交換', tint: P.primary },
        { name: 'quick sort', desc: '基準で二分', tint: P.violet },
        { name: 'merge sort', desc: '半分にして合流', tint: P.emerald },
    ];
    return (
        <Stage>
            <div>
                <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 800, color: P.ink, marginBottom: 40, opacity: fade(f, 2) }}>
                    同じ問題に、複数のアルゴリズム
                </div>
                <div style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
                    {sorts.map((s, i) => (
                        <Card key={s.name} style={{
                            width: 300, padding: '24px 22px',
                            borderTop: `6px solid ${s.tint}`,
                            transform: `translateY(${rise(f, 10 + i * 10)}px)`,
                            opacity: fade(f, 10 + i * 10),
                        }}>
                            <div style={{ fontSize: 32, color: s.tint, fontWeight: 800, textAlign: 'center', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{s.name}</div>
                            <div style={{ fontSize: 26, color: P.muted, textAlign: 'center', marginTop: 4 }}>{s.desc}</div>
                            <svg viewBox="0 0 260 140" width="100%" height={130} style={{ marginTop: 14 }}>
                                {bars.map((h, j) => (
                                    <rect key={j} x={14 + j * 28} y={140 - h * 13} width="22" height={h * 13} rx="3" fill={s.tint} opacity={0.3 + (j / bars.length) * 0.65} />
                                ))}
                            </svg>
                        </Card>
                    ))}
                </div>
                <div style={{ textAlign: 'center', fontSize: 30, color: P.muted, marginTop: 32, opacity: fade(f, 50) }}>
                    → どれも答えは同じ。速さと向きが違う
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 14: Knuth本人の留保
// ───────────────────────────────────────────────
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <Card style={{
            maxWidth: 900, padding: '48px 60px',
            borderLeft: `8px solid ${P.gold}`,
            transform: `translateY(${rise(f, 4)}px)`, opacity: fade(f, 4),
        }}>
            <div style={{ fontSize: 32, color: P.gold, fontWeight: 700, marginBottom: 14 }}>— Knuth 本人の留保</div>
            <div style={{ fontSize: 50, color: P.ink, fontWeight: 700, lineHeight: 1.5, fontFamily: 'Georgia, serif' }}>
                "my description of an algorithm<br />
                <span style={{ color: P.rose }}>lacks formal rigor</span>."
            </div>
            <div style={{ fontSize: 32, color: P.muted, marginTop: 22, lineHeight: 1.5 }}>
                直観的にはクリアでも、<br />
                「厳密に定義された」の「厳密に」とは何か、<br />
                完全には答えきれていない
            </div>
        </Card>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 15: 3つの誤解
// ───────────────────────────────────────────────
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { q: 'レシピのこと？', color: P.warm, icon: '🍳' },
        { q: 'コードのこと？', color: P.primary, icon: '{ }' },
        { q: 'YouTube のあれ？', color: P.rose, icon: 'yt' },
    ];
    return (
        <Stage>
            <div>
                <div style={{ textAlign: 'center', fontSize: 46, fontWeight: 800, color: P.ink, marginBottom: 44, opacity: fade(f, 2) }}>
                    よくある 3 つの誤解
                </div>
                <div style={{ display: 'flex', gap: 36, justifyContent: 'center' }}>
                    {items.map((it, i) => (
                        <Card key={it.q} style={{
                            width: 320, padding: '36px 30px', textAlign: 'center',
                            borderTop: `6px solid ${it.color}`,
                            transform: `translateY(${rise(f, 12 + i * 12)}px)`,
                            opacity: fade(f, 12 + i * 12),
                        }}>
                            <div style={{ fontSize: 32, color: it.color, fontWeight: 900, marginBottom: 18 }}>誤解 #{i + 1}</div>
                            <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {it.icon === 'yt' ? (
                                    <YouTubeIcon width={90} />
                                ) : (
                                    <div style={{ fontSize: 70 }}>{it.icon}</div>
                                )}
                            </div>
                            <div style={{ fontSize: 32, color: P.ink, fontWeight: 700, marginTop: 12 }}>{it.q}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 16: レシピとの違い
// ───────────────────────────────────────────────
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
            <Card style={{
                width: 420, padding: '32px 32px',
                borderTop: `6px solid ${P.warm}`,
                transform: `translateY(${rise(f, 4)}px)`, opacity: fade(f, 4),
            }}>
                <div style={{ fontSize: 32, color: P.warm, fontWeight: 700, marginBottom: 18 }}>レシピ</div>
                <div style={{ fontSize: 28, color: P.ink, lineHeight: 1.8 }}>
                    <div>• 塩少々</div>
                    <div>• 弱火で</div>
                    <div>• 焦げない程度</div>
                    <div>• 美味しそうになるまで</div>
                </div>
                <div style={{ marginTop: 18, padding: '10px 14px', background: '#FFF7ED', borderRadius: 10, fontSize: 26, color: P.accentDeep }}>
                    読み手の判断に依存
                </div>
            </Card>
            <div style={{ fontSize: 44, color: P.muted, opacity: fade(f, 20) }}>≠</div>
            <Card style={{
                width: 420, padding: '32px 32px',
                borderTop: `6px solid ${P.primary}`,
                transform: `translateY(${rise(f, 24)}px)`, opacity: fade(f, 24),
            }}>
                <div style={{ fontSize: 32, color: P.primary, fontWeight: 700, marginBottom: 18 }}>アルゴリズム</div>
                <div style={{ fontSize: 28, color: P.ink, lineHeight: 1.8, fontFamily: 'Georgia, serif' }}>
                    <div>if x &lt; 100 then ...</div>
                    <div>for i := 1 to n do ...</div>
                    <div>return max(a, b)</div>
                </div>
                <div style={{ marginTop: 18, padding: '10px 14px', background: '#DBEAFE', borderRadius: 10, fontSize: 26, color: P.primaryDeep }}>
                    誰が読んでも同じ結果
                </div>
            </Card>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 17: コードとの違い（1つのアルゴリズム→複数言語）
// ───────────────────────────────────────────────
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => {
    const langs = [
        { name: 'Python', color: '#3776AB', sample: 'def sort(a):' },
        { name: 'Java', color: '#E76F00', sample: 'void sort(int[] a)' },
        { name: 'C++', color: '#659AD2', sample: 'void sort(vector&lt;int&gt;)' },
    ];
    return (
        <Stage>
            <div>
                <Card style={{
                    margin: '0 auto 40px', padding: '22px 40px',
                    maxWidth: 600, textAlign: 'center',
                    borderTop: `6px solid ${P.violet}`,
                    opacity: fade(f, 4),
                }}>
                    <div style={{ fontSize: 30, color: P.muted }}>アルゴリズム（抽象）</div>
                    <div style={{ fontSize: 44, fontWeight: 800, color: P.violet, marginTop: 6 }}>sort: 並び替え手順</div>
                </Card>
                <svg viewBox="0 0 900 60" width="100%" height={60} style={{ marginBottom: 20, opacity: fade(f, 16) }}>
                    <path d="M450,10 L150,55 M450,10 L450,55 M450,10 L750,55" stroke={P.muted} strokeWidth="2" />
                </svg>
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                    {langs.map((l, i) => (
                        <Card key={l.name} style={{
                            width: 280, padding: '22px 24px', textAlign: 'center',
                            borderTop: `6px solid ${l.color}`,
                            transform: `translateY(${rise(f, 22 + i * 8)}px)`,
                            opacity: fade(f, 22 + i * 8),
                        }}>
                            <div style={{ fontSize: 32, fontWeight: 800, color: l.color, marginBottom: 10 }}>{l.name}</div>
                            <div style={{ padding: '14px 16px', background: '#0F172A', borderRadius: 8, color: '#F8FAFC', fontSize: 22, fontFamily: 'Consolas, monospace' }} dangerouslySetInnerHTML={{ __html: l.sample }} />
                            <div style={{ fontSize: 24, color: P.muted, marginTop: 10 }}>実装（コード）</div>
                        </Card>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 18: YouTubeのあれ
// ───────────────────────────────────────────────
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', opacity: fade(f, 4), transform: `translateY(${rise(f, 4, 22, 20)}px)` }}>
                <YouTubeIcon width={280} />
            </div>
            <div style={{ marginTop: 30, fontSize: 42, color: P.muted, opacity: fade(f, 18) }}>いわゆる</div>
            <div style={{
                fontSize: 96, fontWeight: 900, marginTop: 12,
                background: `linear-gradient(135deg, ${P.rose} 0%, ${P.violet} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                opacity: fade(f, 26),
            }}>
                「The Algorithm」
            </div>
            <div style={{ marginTop: 30, fontSize: 36, color: P.ink, opacity: fade(f, 40) }}>
                実態は <span style={{ color: P.rose, fontWeight: 800 }}>機械学習モデル</span>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 19: 古典vs ML
// ───────────────────────────────────────────────
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', gap: 50, alignItems: 'stretch' }}>
            <Card style={{
                width: 420, padding: '28px 32px',
                borderTop: `6px solid ${P.primary}`,
                transform: `translateY(${rise(f, 4)}px)`, opacity: fade(f, 4),
            }}>
                <div style={{ fontSize: 30, color: P.primary, fontWeight: 800, marginBottom: 18 }}>古典アルゴリズム</div>
                <svg viewBox="0 0 360 160" width="100%" height={150}>
                    <rect x="10" y="70" width="90" height="40" rx="8" fill={P.paper} stroke={P.emerald} strokeWidth="2" />
                    <text x="55" y="95" textAnchor="middle" fontSize="16" fill={P.emerald}>入力</text>
                    <line x1="100" y1="90" x2="135" y2="90" stroke={P.muted} strokeWidth="2" />
                    <rect x="135" y="60" width="100" height="60" rx="8" fill={P.primaryDeep} />
                    <text x="185" y="95" textAnchor="middle" fontSize="14" fill={P.gold} fontWeight="700">人間が書いた手順</text>
                    <line x1="235" y1="90" x2="270" y2="90" stroke={P.muted} strokeWidth="2" />
                    <rect x="270" y="70" width="80" height="40" rx="8" fill={P.paper} stroke={P.accentDeep} strokeWidth="2" />
                    <text x="310" y="95" textAnchor="middle" fontSize="16" fill={P.accentDeep}>出力</text>
                </svg>
                <div style={{ fontSize: 24, color: P.muted, marginTop: 8, textAlign: 'center' }}>同じ入力 → 必ず同じ出力</div>
            </Card>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 44, color: P.muted, opacity: fade(f, 18) }}>vs</div>
            <Card style={{
                width: 420, padding: '28px 32px',
                borderTop: `6px solid ${P.rose}`,
                transform: `translateY(${rise(f, 22)}px)`, opacity: fade(f, 22),
            }}>
                <div style={{ fontSize: 30, color: P.rose, fontWeight: 800, marginBottom: 18 }}>機械学習モデル</div>
                <svg viewBox="0 0 360 160" width="100%" height={150}>
                    <rect x="10" y="70" width="90" height="40" rx="8" fill={P.paper} stroke={P.emerald} strokeWidth="2" />
                    <text x="55" y="95" textAnchor="middle" fontSize="16" fill={P.emerald}>入力</text>
                    <line x1="100" y1="90" x2="135" y2="90" stroke={P.muted} strokeWidth="2" />
                    <rect x="135" y="40" width="100" height="100" rx="8" fill={P.rose} opacity="0.85" />
                    <text x="185" y="75" textAnchor="middle" fontSize="14" fill={P.paper} fontWeight="700">過去データ</text>
                    <text x="185" y="95" textAnchor="middle" fontSize="14" fill={P.paper} fontWeight="700">学習済み</text>
                    <text x="185" y="115" textAnchor="middle" fontSize="14" fill={P.paper} fontWeight="700">パラメータ</text>
                    <line x1="235" y1="90" x2="270" y2="90" stroke={P.muted} strokeWidth="2" />
                    <rect x="270" y="70" width="80" height="40" rx="8" fill={P.paper} stroke={P.accentDeep} strokeWidth="2" />
                    <text x="310" y="95" textAnchor="middle" fontSize="16" fill={P.accentDeep}>推定</text>
                </svg>
                <div style={{ fontSize: 24, color: P.muted, marginTop: 8, textAlign: 'center' }}>学習内容で挙動が変わる</div>
            </Card>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 20: 速さの測り方
// ───────────────────────────────────────────────
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div>
            <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 800, color: P.ink, marginBottom: 30, opacity: fade(f, 2) }}>
                速さの物差し = 「入力が増えたとき、時間はどう伸びるか」
            </div>
            <svg viewBox="0 0 900 400" width="100%" height={400}>
                {/* Axes */}
                <line x1="80" y1="350" x2="850" y2="350" stroke={P.ink} strokeWidth="2" />
                <line x1="80" y1="40" x2="80" y2="350" stroke={P.ink} strokeWidth="2" />
                <text x="860" y="355" fontSize="20" fill={P.muted}>n</text>
                <text x="40" y="50" fontSize="20" fill={P.muted}>時間</text>
                {/* O(n²) */}
                <path d="M80,350 Q 300,340 500,200 T 830,50" fill="none" stroke={P.rose} strokeWidth="5" opacity={fade(f, 10)} />
                <text x="780" y="80" fontSize="26" fill={P.rose} fontWeight="800" opacity={fade(f, 10)}>O(n²)</text>
                {/* O(n) */}
                <line x1="80" y1="350" x2="830" y2="150" stroke={P.accent} strokeWidth="5" opacity={fade(f, 22)} />
                <text x="780" y="180" fontSize="26" fill={P.accent} fontWeight="800" opacity={fade(f, 22)}>O(n)</text>
                {/* O(log n) */}
                <path d="M80,350 Q 200,290 500,270 T 830,255" fill="none" stroke={P.emerald} strokeWidth="5" opacity={fade(f, 34)} />
                <text x="780" y="245" fontSize="26" fill={P.emerald} fontWeight="800" opacity={fade(f, 34)}>O(log n)</text>
                {/* O(1) */}
                <line x1="80" y1="320" x2="830" y2="320" stroke={P.primary} strokeWidth="5" strokeDasharray="8 6" opacity={fade(f, 46)} />
                <text x="780" y="310" fontSize="26" fill={P.primary} fontWeight="800" opacity={fade(f, 46)}>O(1)</text>
            </svg>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 21: Big Oの直感（A vs B）
// ───────────────────────────────────────────────
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
            {['A', 'B'].map((label, i) => {
                const color = i === 0 ? P.accent : P.rose;
                const mult = i === 0 ? '2' : '4';
                const notation = i === 0 ? 'O(n)' : 'O(n²)';
                return (
                    <Card key={label} style={{
                        width: 420, padding: '36px 40px', textAlign: 'center',
                        borderTop: `6px solid ${color}`,
                        transform: `translateY(${rise(f, 6 + i * 14)}px)`, opacity: fade(f, 6 + i * 14),
                    }}>
                        <div style={{ fontSize: 32, color: P.muted }}>アルゴリズム</div>
                        <div style={{ fontSize: 80, fontWeight: 900, color: color }}>{label}</div>
                        <div style={{ fontSize: 30, color: P.ink, marginTop: 16, lineHeight: 1.5 }}>
                            データが 100 → 200 で
                        </div>
                        <div style={{ fontSize: 54, fontWeight: 900, color: color, marginTop: 8 }}>
                            {mult} 倍の時間
                        </div>
                        <div style={{ marginTop: 18, padding: '8px 18px', background: '#F1F5F9', borderRadius: 10, display: 'inline-block', fontSize: 34, fontFamily: 'Georgia, serif', color: color, fontWeight: 700 }}>
                            {notation}
                        </div>
                    </Card>
                );
            })}
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 22: 爆発する差
// ───────────────────────────────────────────────
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 38, color: P.muted, opacity: fade(f, 2) }}>データが 100 万個のとき</div>
            <div style={{ display: 'flex', gap: 80, justifyContent: 'center', marginTop: 40, alignItems: 'flex-end' }}>
                <div style={{ opacity: fade(f, 10) }}>
                    <div style={{ fontSize: 32, color: P.accent, fontWeight: 700 }}>A: O(n)</div>
                    <div style={{ fontSize: 88, fontWeight: 900, color: P.accent, marginTop: 10 }}>1,000,000</div>
                    <div style={{ fontSize: 28, color: P.muted, marginTop: 4 }}>ステップ / 一瞬</div>
                </div>
                <div style={{ fontSize: 66, color: P.muted, alignSelf: 'center', opacity: fade(f, 24) }}>vs</div>
                <div style={{ opacity: fade(f, 28) }}>
                    <div style={{ fontSize: 32, color: P.rose, fontWeight: 700 }}>B: O(n²)</div>
                    <div style={{ fontSize: 88, fontWeight: 900, color: P.rose, marginTop: 10 }}>1,000,000,000,000</div>
                    <div style={{ fontSize: 28, color: P.muted, marginTop: 4 }}>ステップ / 何日も</div>
                </div>
            </div>
            <div style={{ marginTop: 42, fontSize: 36, color: P.emerald, fontWeight: 800, opacity: fade(f, 46) }}>
                100 万倍の差
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 23: 二分探索
// ───────────────────────────────────────────────
const Scene23: React.FC<SceneProps> = ({ localFrame: f }) => {
    // Each step shrinks the range in half
    const steps = [
        { l: 0, r: 1000000, label: '1,000,000 語' },
        { l: 500000, r: 1000000, label: '半分に' },
        { l: 750000, r: 1000000, label: 'また半分' },
        { l: 875000, r: 937500, label: 'さらに半分' },
        { l: 910000, r: 920000, label: '...' },
    ];
    return (
        <Stage>
            <div>
                <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 800, color: P.ink, marginBottom: 30, opacity: fade(f, 2) }}>
                    <span style={{ color: P.emerald, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>binary search</span>　半分に絞り続ける
                </div>
                <div style={{ padding: '0 30px' }}>
                    {steps.map((s, i) => {
                        const barW = ((s.r - s.l) / 1000000) * 700;
                        const barX = (s.l / 1000000) * 700;
                        return (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16,
                                opacity: fade(f, 8 + i * 8),
                                transform: `translateX(${-rise(f, 8 + i * 8, 26 + i * 8, 18)}px)`,
                            }}>
                                <div style={{ width: 180, fontSize: 26, color: P.muted, textAlign: 'right' }}>{s.label}</div>
                                <svg viewBox="0 0 720 36" width={720} height={36}>
                                    <rect x="0" y="10" width="700" height="18" rx="4" fill="#E5E7EB" />
                                    <rect x={barX} y="10" width={barW} height="18" rx="4" fill={P.emerald} />
                                </svg>
                            </div>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: 20, fontSize: 36, color: P.emerald, fontWeight: 800, opacity: fade(f, 56) }}>
                    100 万語でも約 20 回で到達
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 24: 身近なアルゴリズム（Dijkstra）
// ───────────────────────────────────────────────
const Scene24: React.FC<SceneProps> = ({ localFrame: f }) => {
    // graph nodes
    const nodes = [
        { id: 'S', x: 120, y: 220, label: 'START' },
        { id: 'A', x: 320, y: 100 },
        { id: 'B', x: 320, y: 340 },
        { id: 'C', x: 540, y: 100 },
        { id: 'D', x: 540, y: 340 },
        { id: 'G', x: 740, y: 220, label: 'GOAL' },
    ];
    return (
        <Stage>
            <div>
                <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 800, color: P.ink, marginBottom: 20, opacity: fade(f, 2) }}>
                    Dijkstra の最短経路アルゴリズム
                </div>
                <div style={{ fontSize: 26, textAlign: 'center', color: P.muted, marginBottom: 18, opacity: fade(f, 6) }}>1956年に喫茶店で20分、今も地図アプリで現役</div>
                <svg viewBox="0 0 900 440" width="100%" height={400}>
                    {/* edges */}
                    {[
                        ['S', 'A'], ['S', 'B'], ['A', 'C'], ['B', 'D'], ['A', 'B'], ['C', 'G'], ['D', 'G'], ['C', 'D'],
                    ].map(([a, b], i) => {
                        const na = nodes.find(n => n.id === a)!;
                        const nb = nodes.find(n => n.id === b)!;
                        // Highlight SA-AC-CG as shortest
                        const isPath = (a === 'S' && b === 'A') || (a === 'A' && b === 'C') || (a === 'C' && b === 'G');
                        return (
                            <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                                stroke={isPath ? P.emerald : P.muted}
                                strokeWidth={isPath ? 6 : 3}
                                opacity={isPath ? fade(f, 28) : fade(f, 12)} />
                        );
                    })}
                    {/* nodes */}
                    {nodes.map((n, i) => (
                        <g key={n.id} opacity={fade(f, 8 + i * 4)}>
                            <circle cx={n.x} cy={n.y} r="28" fill={n.label ? P.primaryDeep : P.paper} stroke={P.primary} strokeWidth="3" />
                            <text x={n.x} y={n.y + 8} fontSize="22" fontWeight="700" textAnchor="middle" fill={n.label ? P.paper : P.primary}>{n.id}</text>
                            {n.label && <text x={n.x} y={n.y - 40} fontSize="20" fontWeight="700" textAnchor="middle" fill={P.primaryDeep}>{n.label}</text>}
                        </g>
                    ))}
                </svg>
                <div style={{ textAlign: 'center', fontSize: 32, color: P.emerald, fontWeight: 800, marginTop: 6, opacity: fade(f, 40) }}>
                    カーナビの裏側で動いている手順
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 25: 正しさが最優先
// ───────────────────────────────────────────────
const Scene25: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 2) }}>優先順位</div>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
                {[
                    { n: 1, label: '正しさ', en: 'correctness', color: P.emerald },
                    { n: 2, label: '速さ', en: 'speed', color: P.accent },
                    { n: 3, label: '実装の便宜', en: 'implementation', color: P.muted },
                ].map((it, i) => (
                    <Card key={it.n} style={{
                        width: 580, display: 'flex', alignItems: 'center', gap: 24,
                        padding: '22px 32px',
                        borderLeft: `8px solid ${it.color}`,
                        transform: `translateX(${-rise(f, 8 + i * 10, 26 + i * 10, 20)}px)`,
                        opacity: fade(f, 8 + i * 10),
                    }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%',
                            background: it.color, color: P.paper,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 42, fontWeight: 900,
                        }}>{it.n}</div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 44, fontWeight: 800, color: it.color }}>{it.label}</div>
                            <div style={{ fontSize: 26, color: P.muted, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{it.en}</div>
                        </div>
                    </Card>
                ))}
            </div>
            <div style={{ marginTop: 24, fontSize: 30, color: P.ink, opacity: fade(f, 48) }}>
                速くて間違ったやつは、そもそもアルゴリズムじゃない
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 26: コアメッセージ
// ───────────────────────────────────────────────
const Scene26: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 42, color: P.muted, opacity: fade(f, 4) }}>アルゴリズムって、結局</div>
            <div style={{
                fontSize: 92, fontWeight: 900, marginTop: 30,
                background: `linear-gradient(135deg, ${P.primary} 0%, ${P.emerald} 50%, ${P.violet} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                opacity: fade(f, 16), transform: `translateY(${rise(f, 16, 36, 20)}px)`,
                lineHeight: 1.3,
            }}>
                問題の解き方の<br />抽象パターン
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 28, justifyContent: 'center', opacity: fade(f, 36) }}>
                {[
                    { l: '≠', sub: 'プログラムのコード' },
                    { l: '≠', sub: 'レシピ' },
                    { l: '≠', sub: 'YouTube のあれ' },
                ].map((x, i) => (
                    <Card key={i} style={{
                        padding: '20px 30px',
                        opacity: fade(f, 38 + i * 6),
                    }}>
                        <div style={{ fontSize: 46, color: P.rose, textAlign: 'center' }}>{x.l}</div>
                        <div style={{ fontSize: 26, color: P.muted, textAlign: 'center', marginTop: 4 }}>{x.sub}</div>
                    </Card>
                ))}
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 27: なぜ時間を超えるか
// ───────────────────────────────────────────────
const Scene27: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: P.ink, opacity: fade(f, 2) }}>
                なぜ、紀元前の手順が今も動くのか
            </div>
            <div style={{ marginTop: 42, display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={{
                    padding: '30px 36px', borderTop: `6px solid ${P.violet}`,
                    opacity: fade(f, 10), transform: `translateY(${rise(f, 10)}px)`,
                }}>
                    <div style={{ fontSize: 30, color: P.muted }}>アルゴリズム =</div>
                    <div style={{ fontSize: 46, fontWeight: 800, color: P.violet, marginTop: 8 }}>言語・ハード非依存</div>
                    <div style={{ fontSize: 26, color: P.muted, marginTop: 8 }}>抽象の手順</div>
                </Card>
                <div style={{ fontSize: 56, color: P.muted, opacity: fade(f, 22) }}>→</div>
                <Card style={{
                    padding: '30px 36px', borderTop: `6px solid ${P.gold}`,
                    opacity: fade(f, 28), transform: `translateY(${rise(f, 28)}px)`,
                }}>
                    <div style={{ fontSize: 30, color: P.muted }}>だから</div>
                    <div style={{ fontSize: 46, fontWeight: 800, color: P.gold, marginTop: 8 }}>道具が変わっても生き残る</div>
                    <div style={{ fontSize: 26, color: P.muted, marginTop: 8 }}>2,300 年現役</div>
                </Card>
            </div>
            <div style={{ marginTop: 40, fontSize: 30, color: P.ink, opacity: fade(f, 44) }}>
                一人の人の名前 / 紀元前の手順 / YouTube のあれ — 全部親戚
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 28: エンディング
// ───────────────────────────────────────────────
const Scene28: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{
                fontSize: 88, fontWeight: 900,
                background: `linear-gradient(135deg, ${P.primary} 0%, ${P.violet} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                opacity: fade(f, 4), transform: `translateY(${rise(f, 4, 24, 20)}px)`,
            }}>
                ご視聴ありがとうございました
            </div>
            <div style={{ marginTop: 40, fontSize: 44, color: P.ink, opacity: fade(f, 26) }}>
                次に「アルゴリズム」を見たら、少し立ち止まってみてください
            </div>
            <div style={{ marginTop: 44, display: 'flex', gap: 20, justifyContent: 'center', opacity: fade(f, 44) }}>
                <Card style={{ padding: '16px 28px', fontSize: 30, color: P.rose, fontWeight: 700 }}>🔔 チャンネル登録</Card>
                <Card style={{ padding: '16px 28px', fontSize: 30, color: P.primary, fontWeight: 700 }}>👍 高評価</Card>
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
    'オープニング', '3つのアルゴリズム', '今日の見取り図',
    '人の名前だった', '代数との兄弟関係', '紀元前300年の手順', '互除法は今も現役',
    'Knuth登場', '5つの性質', '有限性', '明確性', '入力と出力', '実行可能性', '同じ問題 複数の手順', 'Knuth本人の留保',
    '3つの誤解', 'レシピとの違い', 'コードとの違い', 'YouTubeのあれ', 'MLモデルとの違い',
    '速さの測り方', 'Big Oの直感', '爆発する差', '二分探索の発想', '身近なアルゴリズム', '正しさが最優先',
    '回収', 'なぜ時間を超えるか', 'エンディング',
];
