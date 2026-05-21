import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

// ============================================================
// Palette — QR code: deep-navy x crimson-scan x warm accents
// ============================================================
const PALETTE = {
    ...BASE_COLORS,
    primary: '#1E40AF',
    primaryDeep: '#1E3A8A',
    primaryGlow: 'rgba(30,64,175,0.28)',
    accent: '#DC2626',
    accentGlow: 'rgba(220,38,38,0.30)',
    warm: '#F59E0B',
    amber: '#D97706',
    teal: '#0D9488',
    violet: '#7C3AED',
    ink: '#0F172A',
    paper: '#FFFFFF',
    paperDim: '#F1F5F9',
    line: 'rgba(15,23,42,0.10)',
};

const fade = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const riseY = (f: number, from: number, to = from + 18, dist = 16) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Stage: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: 80, paddingRight: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</div>
);

// Deterministic PRNG for producing QR-like cell patterns
const qrCells = (size: number, seed = 0.37): boolean[] => {
    const out: boolean[] = [];
    let h = seed;
    for (let i = 0; i < size * size; i++) {
        h = (h * 9301 + 49297) % 233280;
        out.push((h / 233280) > 0.5);
    }
    return out;
};

const isFinder = (x: number, y: number, size: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);

// Reusable QR module: finder + body
const QRModule: React.FC<{
    size: number; cellPx: number; seed?: number; ink?: string;
    skipCells?: (x: number, y: number) => boolean;
}> = ({ size, cellPx, seed = 0.37, ink = PALETTE.ink, skipCells }) => {
    const cells = qrCells(size, seed);
    const finders: [number, number][] = [[0, 0], [size - 7, 0], [0, size - 7]];
    return (
        <>
            {cells.map((on, i) => {
                const x = i % size, y = Math.floor(i / size);
                if (isFinder(x, y, size)) return null;
                if (skipCells && skipCells(x, y)) return null;
                if (!on) return null;
                return <rect key={i} x={x * cellPx} y={y * cellPx} width={cellPx - 1} height={cellPx - 1} fill={ink} />;
            })}
            {finders.map(([fx, fy], i) => (
                <g key={`f-${i}`} transform={`translate(${fx * cellPx},${fy * cellPx})`}>
                    <rect width={7 * cellPx} height={7 * cellPx} fill={ink} />
                    <rect x={cellPx} y={cellPx} width={5 * cellPx} height={5 * cellPx} fill={PALETTE.paper} />
                    <rect x={2 * cellPx} y={2 * cellPx} width={3 * cellPx} height={3 * cellPx} fill={ink} />
                </g>
            ))}
        </>
    );
};

// ============================================================
// Scene 0 — QRコードの秘密: 3つの finder が浮かび上がる
// ============================================================
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => {
    const size = 25;
    const cellPx = 16;
    const qrSize = size * cellPx;
    const ringScale = interpolate(f, [40, 90], [2.2, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const ringOp = fade(f, 40, 80);
    const pulseR = interpolate(f % 80, [0, 40, 80], [1, 1.08, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <Stage>
            <div style={{
                opacity: fade(f, 0),
                display: 'flex', alignItems: 'center', gap: 80,
            }}>
                <div style={{
                    padding: 40, background: PALETTE.paper,
                    borderRadius: 28, border: `1px solid ${PALETTE.line}`,
                    boxShadow: '0 20px 60px rgba(15,23,42,0.10)',
                }}>
                    <svg width={qrSize} height={qrSize}>
                        <QRModule size={size} cellPx={cellPx} seed={0.37} />
                        {[[0, 0], [size - 7, 0], [0, size - 7]].map(([fx, fy], i) => {
                            const cx = fx * cellPx + 3.5 * cellPx;
                            const cy = fy * cellPx + 3.5 * cellPx;
                            return (
                                <g key={i}>
                                    <circle cx={cx} cy={cy} r={3.8 * cellPx * ringScale * pulseR}
                                        fill="none" stroke={PALETTE.accent} strokeWidth={4}
                                        opacity={ringOp * 0.9} />
                                    <circle cx={cx} cy={cy} r={3.8 * cellPx * ringScale * pulseR * 1.3}
                                        fill="none" stroke={PALETTE.accent} strokeWidth={2}
                                        opacity={ringOp * 0.3} />
                                </g>
                            );
                        })}
                    </svg>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 440 }}>
                    <div style={{
                        opacity: fade(f, 20), fontSize: 32, letterSpacing: '0.3em',
                        color: PALETTE.accent, fontWeight: 700,
                    }}>
                        3 FINDER PATTERNS
                    </div>
                    <div style={{
                        opacity: fade(f, 40), fontSize: 34, fontWeight: 700, color: PALETTE.text, lineHeight: 1.5,
                    }}>
                        隅の3つの四角。<br />
                        これが<span style={{ color: PALETTE.primary }}>すべての鍵</span>。
                    </div>
                    <div style={{
                        opacity: fade(f, 110),
                        marginTop: 14, padding: '14px 22px', borderRadius: 14,
                        border: `1px solid ${PALETTE.line}`, background: PALETTE.paperDim,
                        fontSize: 26, color: PALETTE.textDim, letterSpacing: '0.08em',
                    }}>
                        QR = Quick Response Code
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 1 — 22億人の日常: 数値強調 + 人物アイコングリッド
// ============================================================
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cols = 24, rows = 10;
    const total = cols * rows;

    return (
        <Stage>
            <div style={{ width: 1600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
                <div style={{
                    opacity: fade(f, 0), fontSize: 30, letterSpacing: '0.3em', color: PALETTE.textDim,
                }}>世界の日常的 QR 利用者</div>

                <div style={{
                    opacity: fade(f, 10), transform: `translateY(${riseY(f, 10)}px)`,
                    display: 'flex', alignItems: 'baseline', gap: 16,
                }}>
                    <div style={{
                        fontSize: 220, fontWeight: 800, color: PALETTE.primary, lineHeight: 1,
                        textShadow: `0 0 32px ${PALETTE.primaryGlow}`,
                    }}>2.2</div>
                    <div style={{ fontSize: 80, fontWeight: 700, color: PALETTE.primary }}>billion+</div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: 10, width: 1200,
                }}>
                    {Array.from({ length: total }).map((_, i) => {
                        const col = i % cols, row = Math.floor(i / cols);
                        const delay = 60 + (col + row) * 1.2;
                        return (
                            <svg key={i} viewBox="0 0 40 46" width="100%"
                                style={{ opacity: fade(f, delay, delay + 10) }}>
                                <circle cx="20" cy="14" r="9" fill={PALETTE.primary} />
                                <path d="M4 46 C4 30, 36 30, 36 46 Z" fill={PALETTE.primary} />
                            </svg>
                        );
                    })}
                </div>

                <div style={{
                    opacity: fade(f, 160),
                    fontSize: 28, color: PALETTE.textDim,
                }}>
                    出典: QR Code Chimp Statistics 2025
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 2 — 3割消えても読める: クリーン vs 30%破損
// ============================================================
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const size = 21, cellPx = 12;
    const qrPx = size * cellPx;
    const damagedCells = (x: number, y: number) => {
        // damage a rectangle in the middle-left
        return x >= 8 && x < 15 && y >= 7 && y < 14;
    };
    const damageFill = interpolate(f, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const Panel: React.FC<{ title: string; color: string; damaged?: boolean; tick?: boolean; appear: number; }> = ({
        title, color, damaged, tick, appear,
    }) => (
        <div style={{
            opacity: fade(f, appear),
            transform: `translateY(${riseY(f, appear)}px)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
            padding: 36,
            background: PALETTE.paper,
            border: `2px solid ${color}`,
            borderRadius: 22,
            boxShadow: `0 0 32px ${color}33`,
        }}>
            <div style={{
                fontSize: 28, letterSpacing: '0.2em', color, fontWeight: 700,
            }}>{title}</div>
            <svg width={qrPx} height={qrPx} style={{ background: PALETTE.paper }}>
                <QRModule size={size} cellPx={cellPx} seed={0.44}
                    skipCells={damaged ? damagedCells : undefined} />
                {damaged && (
                    <rect x={8 * cellPx} y={7 * cellPx}
                        width={7 * cellPx} height={7 * cellPx}
                        fill={PALETTE.accent} opacity={0.55 * damageFill} />
                )}
                {damaged && (
                    <g opacity={damageFill}>
                        <line x1={8 * cellPx} y1={7 * cellPx} x2={15 * cellPx} y2={14 * cellPx}
                            stroke={PALETTE.accent} strokeWidth="3" />
                        <line x1={15 * cellPx} y1={7 * cellPx} x2={8 * cellPx} y2={14 * cellPx}
                            stroke={PALETTE.accent} strokeWidth="3" />
                    </g>
                )}
            </svg>
            <div style={{
                fontSize: 30, color: tick ? PALETTE.teal : PALETTE.text, fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 10,
            }}>
                {tick && <span style={{ fontSize: 32 }}>✓</span>}
                {damaged ? '30% 破損 → 読める' : 'クリーン → 読める'}
            </div>
        </div>
    );

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80 }}>
                <Panel title="ORIGINAL" color={PALETTE.teal} appear={0} tick />
                <div style={{
                    opacity: fade(f, 70),
                    fontSize: 72, color: PALETTE.accent, fontWeight: 300,
                }}>→</div>
                <Panel title="DAMAGED" color={PALETTE.accent} damaged appear={40} tick />
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 3 — バーコードの限界: 1次元の情報量
// ============================================================
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => {
    const barWidths = [3, 1, 2, 1, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 2, 4, 2, 1, 3];
    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50 }}>
                <div style={{
                    opacity: fade(f, 0), fontSize: 32, letterSpacing: '0.25em', color: PALETTE.textDim,
                }}>1D BARCODE</div>

                <div style={{
                    opacity: fade(f, 10),
                    width: 1100, height: 240, padding: 30,
                    background: PALETTE.paper, borderRadius: 16,
                    border: `1px solid ${PALETTE.line}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="1000" height="180" viewBox="0 0 1000 180">
                        {(() => {
                            let x = 0;
                            const elts: React.ReactNode[] = [];
                            const unit = 8;
                            barWidths.forEach((w, i) => {
                                if (i % 2 === 0) {
                                    elts.push(<rect key={i} x={x} y={0} width={w * unit} height={160} fill={PALETTE.ink} />);
                                }
                                x += w * unit;
                            });
                            return elts;
                        })()}
                        <text x="500" y="176" textAnchor="middle" fontSize="22" fill={PALETTE.textDim}
                            letterSpacing="4">4 9 0 1 2 3 4 5 6 7 8 9 0 1</text>
                    </svg>
                </div>

                <div style={{
                    opacity: fade(f, 80),
                    display: 'flex', gap: 60, alignItems: 'center',
                }}>
                    <div style={{
                        padding: '20px 36px', borderRadius: 18,
                        background: `${PALETTE.accent}15`, border: `1px solid ${PALETTE.accent}55`,
                    }}>
                        <div style={{ fontSize: 24, color: PALETTE.textDim, letterSpacing: '0.2em' }}>MAX 容量</div>
                        <div style={{ fontSize: 64, fontWeight: 800, color: PALETTE.accent }}>
                            20<span style={{ fontSize: 30, marginLeft: 8 }}>文字</span>
                        </div>
                    </div>
                    <div style={{ fontSize: 32, color: PALETTE.textDim }}>
                        URL すら入らない
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 4 — 1次元から2次元へ: 容量 ×350
// ============================================================
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    const size1D = 18; // 1 row of 18 cells
    const size2D = 21;
    const cellPx = 14;
    const cells1D = qrCells(size1D * 1, 0.55).slice(0, size1D);
    const cells2D = qrCells(size2D, 0.61);

    return (
        <Stage>
            <div style={{ width: 1600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80 }}>
                {/* 1D */}
                <div style={{
                    opacity: fade(f, 0), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
                }}>
                    <div style={{ fontSize: 28, color: PALETTE.textDim, letterSpacing: '0.2em' }}>1 DIMENSION</div>
                    <div style={{
                        padding: 20, background: PALETTE.paper, borderRadius: 14,
                        border: `1px solid ${PALETTE.line}`,
                    }}>
                        <svg width={size1D * cellPx} height={cellPx}>
                            {cells1D.map((on, i) => on ? (
                                <rect key={i} x={i * cellPx} y={0} width={cellPx - 1} height={cellPx} fill={PALETTE.ink} />
                            ) : null)}
                        </svg>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: PALETTE.text }}>約 20 文字</div>
                </div>

                <div style={{
                    opacity: fade(f, 40),
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                }}>
                    <div style={{ fontSize: 56, color: PALETTE.primary, fontWeight: 300 }}>→</div>
                    <div style={{
                        fontSize: 28, color: PALETTE.primary, fontWeight: 800, letterSpacing: '0.1em',
                    }}>×350</div>
                </div>

                {/* 2D */}
                <div style={{
                    opacity: fade(f, 60), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
                }}>
                    <div style={{ fontSize: 28, color: PALETTE.primary, letterSpacing: '0.2em' }}>2 DIMENSIONS</div>
                    <div style={{
                        padding: 20, background: PALETTE.paper, borderRadius: 14,
                        border: `1px solid ${PALETTE.line}`,
                    }}>
                        <svg width={size2D * cellPx} height={size2D * cellPx}>
                            <QRModule size={size2D} cellPx={cellPx} seed={0.61} />
                        </svg>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: PALETTE.primary }}>最大 7,089 桁</div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 5 — 囲碁からの着想: 碁盤 → QR
// ============================================================
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    const goN = 9;
    const goSize = 400;
    const goSpacing = goSize / (goN - 1);
    // Placement of stones
    const stones: [number, number, 'black' | 'white'][] = [
        [2, 2, 'black'], [4, 2, 'white'], [6, 2, 'black'],
        [3, 3, 'white'], [5, 3, 'black'],
        [2, 4, 'black'], [4, 4, 'white'], [6, 4, 'white'],
        [3, 5, 'black'], [5, 5, 'white'],
        [2, 6, 'white'], [4, 6, 'black'], [6, 6, 'black'],
    ];
    const qrSize = 21, cellPx = 18;

    const morphProgress = interpolate(f, [60, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70 }}>
                <div style={{ opacity: fade(f, 0), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                    <div style={{ fontSize: 28, color: PALETTE.amber, letterSpacing: '0.25em' }}>囲碁</div>
                    <div style={{
                        width: goSize + 60, height: goSize + 60,
                        background: '#E8C78A', borderRadius: 8,
                        padding: 30, position: 'relative',
                    }}>
                        <svg width={goSize} height={goSize}>
                            {Array.from({ length: goN }).map((_, i) => (
                                <line key={`h-${i}`} x1={0} y1={i * goSpacing} x2={goSize} y2={i * goSpacing} stroke="#6B4423" strokeWidth={1.5} />
                            ))}
                            {Array.from({ length: goN }).map((_, i) => (
                                <line key={`v-${i}`} x1={i * goSpacing} y1={0} x2={i * goSpacing} y2={goSize} stroke="#6B4423" strokeWidth={1.5} />
                            ))}
                            {stones.map(([gx, gy, color], i) => (
                                <circle key={i}
                                    cx={gx * goSpacing} cy={gy * goSpacing} r={goSpacing / 2 - 3}
                                    fill={color === 'black' ? '#1a1d23' : '#f7f4ea'}
                                    stroke={color === 'white' ? '#aaa' : 'none'}
                                    strokeWidth={1}
                                    opacity={fade(f, 10 + i * 3)}
                                />
                            ))}
                        </svg>
                    </div>
                </div>

                <div style={{
                    opacity: fade(f, 60),
                    fontSize: 52, color: PALETTE.primary, fontWeight: 300,
                    transform: `translateX(${interpolate(f, [60, 120], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                }}>→</div>

                <div style={{ opacity: morphProgress, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                    <div style={{ fontSize: 28, color: PALETTE.primary, letterSpacing: '0.25em' }}>QR コード</div>
                    <div style={{
                        padding: 22,
                        background: PALETTE.paper, borderRadius: 12,
                        border: `1px solid ${PALETTE.line}`,
                    }}>
                        <svg width={qrSize * cellPx} height={qrSize * cellPx}>
                            <QRModule size={qrSize} cellPx={cellPx} seed={0.71} />
                        </svg>
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 6 — QRコードの全体像: 5パーツのラベル
// ============================================================
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    const size = 25, cellPx = 16;
    const qrPx = size * cellPx;

    const labels: { x: number; y: number; color: string; text: string; px: number; py: number; appear: number; }[] = [
        { x: 3.5 * cellPx, y: 3.5 * cellPx, color: PALETTE.accent, text: 'ファインダー', px: -260, py: -20, appear: 10 },
        { x: 12 * cellPx, y: 12 * cellPx, color: PALETTE.primary, text: 'データ + 誤り訂正', px: qrPx + 40, py: 4 * cellPx, appear: 50 },
        { x: (size - 3.5) * cellPx, y: 6.5 * cellPx, color: PALETTE.teal, text: 'タイミング', px: qrPx + 40, py: -20, appear: 90 },
        { x: 18 * cellPx, y: 18 * cellPx, color: PALETTE.amber, text: 'アライメント', px: qrPx + 40, py: 17 * cellPx, appear: 130 },
    ];

    return (
        <Stage>
            <div style={{ width: 1600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, opacity: fade(f, 0) }}>
                <div style={{
                    padding: 32, background: PALETTE.paper, borderRadius: 20,
                    border: `1px solid ${PALETTE.line}`, position: 'relative',
                }}>
                    <svg width={qrPx} height={qrPx} style={{ display: 'block' }}>
                        <QRModule size={size} cellPx={cellPx} seed={0.82} />
                        {/* timing line highlight */}
                        <rect x={0} y={6 * cellPx} width={qrPx} height={cellPx} fill={PALETTE.teal} opacity={fade(f, 90) * 0.22} />
                        <rect x={6 * cellPx} y={0} width={cellPx} height={qrPx} fill={PALETTE.teal} opacity={fade(f, 90) * 0.22} />
                        {/* alignment pattern (fake) */}
                        <rect x={17 * cellPx} y={17 * cellPx} width={5 * cellPx} height={5 * cellPx}
                            fill="none" stroke={PALETTE.amber} strokeWidth={3} opacity={fade(f, 130)} />
                    </svg>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minWidth: 380 }}>
                    {labels.map((l, i) => (
                        <div key={i} style={{
                            opacity: fade(f, l.appear),
                            transform: `translateY(${riseY(f, l.appear)}px)`,
                            display: 'flex', alignItems: 'center', gap: 16,
                        }}>
                            <div style={{
                                width: 18, height: 18, borderRadius: 4, background: l.color,
                                boxShadow: `0 0 12px ${l.color}88`,
                            }} />
                            <div style={{ fontSize: 28, fontWeight: 700, color: PALETTE.text }}>{l.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 7 — 3つの四角の正体: カメラ視野で検出
// ============================================================
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => {
    const viewW = 1000, viewH = 620;

    return (
        <Stage>
            <div style={{ opacity: fade(f, 0), position: 'relative' }}>
                <svg width={viewW} height={viewH} style={{
                    background: PALETTE.paperDim, borderRadius: 20,
                    border: `1px solid ${PALETTE.line}`,
                }}>
                    {/* noisy background text */}
                    {Array.from({ length: 40 }).map((_, i) => {
                        const rx = (i * 73) % (viewW - 80);
                        const ry = (i * 37) % (viewH - 40);
                        return (
                            <text key={i} x={rx} y={ry + 20} fontSize="24"
                                fill="rgba(15,23,42,0.22)" fontFamily="monospace">
                                {['CAFE MENU', 'QR code', 'scan me', '$ 4.20', 'open', '//'][i % 6]}
                            </text>
                        );
                    })}
                    {/* QR in scene */}
                    <g transform="translate(320,160)">
                        <rect x={-16} y={-16} width={380} height={330} fill={PALETTE.paper} rx={10} />
                        <svg x={0} y={0} width={350} height={300} viewBox="0 0 350 300">
                            <QRModule size={17} cellPx={18} seed={0.33} />
                        </svg>
                    </g>

                    {/* Detection marker - corners converging */}
                    {[[336, 180], [618, 180], [336, 432]].map(([cx, cy], i) => {
                        const appear = 30 + i * 15;
                        const boxScale = interpolate(f, [appear, appear + 30], [2.2, 1],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        const op = fade(f, appear);
                        const s = 70 * boxScale;
                        return (
                            <g key={i} opacity={op}>
                                <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s}
                                    fill="none" stroke={PALETTE.accent} strokeWidth={4} strokeDasharray="12 6" />
                                <circle cx={cx} cy={cy} r="6" fill={PALETTE.accent} />
                            </g>
                        );
                    })}

                    {/* Scan line */}
                    <line x1={70} y1={interpolate(f % 90, [0, 90], [80, 560])}
                        x2={930} y2={interpolate(f % 90, [0, 90], [80, 560])}
                        stroke={PALETTE.accent} strokeWidth={2} opacity={0.5} />

                    <text x="40" y="40" fontSize="28" fontWeight="700" fill={PALETTE.accent} letterSpacing="4">
                        DETECTING...
                    </text>
                </svg>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 8 — 1:1:3:1:1 の発見
// ============================================================
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const unit = 60;
    const parts = [
        { w: 1, fill: PALETTE.ink, label: '1' },
        { w: 1, fill: PALETTE.paper, label: '1', stroke: true },
        { w: 3, fill: PALETTE.ink, label: '3' },
        { w: 1, fill: PALETTE.paper, label: '1', stroke: true },
        { w: 1, fill: PALETTE.ink, label: '1' },
    ];
    let x = 0;

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.2em' }}>
                    FINDER PATTERN — 水平断面
                </div>

                {/* Visual finder pattern with cross-section line */}
                <div style={{ opacity: fade(f, 10), position: 'relative' }}>
                    <svg width="560" height="200" viewBox="0 0 560 200">
                        {/* finder pattern large */}
                        <rect x="100" y="0" width="200" height="200" fill={PALETTE.ink} />
                        <rect x="130" y="30" width="140" height="140" fill={PALETTE.paper} />
                        <rect x="160" y="60" width="80" height="80" fill={PALETTE.ink} />

                        {/* cross-section line */}
                        <line x1="100" y1="100" x2="300" y2="100"
                            stroke={PALETTE.accent} strokeWidth={3} strokeDasharray="8 4"
                            opacity={fade(f, 40)} />

                        {/* Extract row and visualize proportions on the right */}
                        <g transform="translate(360,60)" opacity={fade(f, 70)}>
                            <line x1="-60" y1="40" x2="0" y2="40" stroke={PALETTE.accent} strokeWidth={2} opacity={0.7} />
                            {parts.map((p, i) => {
                                const rect = <rect key={i} x={x} y={0} width={p.w * unit} height={80}
                                    fill={p.fill} stroke={p.stroke ? PALETTE.ink : 'none'} strokeWidth={1} />;
                                x += p.w * unit;
                                return rect;
                            })}
                        </g>
                    </svg>
                </div>

                {/* Ratio display */}
                <div style={{
                    opacity: fade(f, 100), transform: `translateY(${riseY(f, 100)}px)`,
                    display: 'flex', alignItems: 'center', gap: 18,
                }}>
                    {['1', '1', '3', '1', '1'].map((n, i) => (
                        <React.Fragment key={i}>
                            <div style={{
                                width: 90, height: 90, borderRadius: 12,
                                background: i === 2 ? PALETTE.accent : PALETTE.primary,
                                color: PALETTE.paper,
                                fontSize: i === 2 ? 56 : 48, fontWeight: 800,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: i === 2 ? `0 0 24px ${PALETTE.accentGlow}` : `0 0 16px ${PALETTE.primaryGlow}`,
                                transform: i === 2 ? 'scale(1.2)' : 'scale(1)',
                            }}>{n}</div>
                            {i < 4 && <div style={{ fontSize: 36, color: PALETTE.textDim }}>:</div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 9 — 存在しない比率: 印刷物の中で唯一
// ============================================================
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => {
    const samples = [
        { label: 'チラシ', bars: [2, 1, 1, 2, 1, 3] },
        { label: '雑誌', bars: [1, 2, 2, 1, 3, 1] },
        { label: '段ボール', bars: [3, 2, 1, 1, 2, 2] },
        { label: '新聞', bars: [1, 1, 2, 2, 1, 3] },
        { label: '書籍', bars: [2, 2, 1, 3, 1, 1] },
        { label: '広告', bars: [1, 3, 1, 2, 2, 1] },
    ];

    return (
        <Stage>
            <div style={{ width: 1600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, letterSpacing: '0.25em', color: PALETTE.textDim }}>
                    印刷物の徹底調査
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: 1400,
                }}>
                    {samples.map((s, i) => {
                        const appear = 10 + i * 10;
                        return (
                            <div key={i} style={{
                                opacity: fade(f, appear),
                                transform: `translateY(${riseY(f, appear)}px)`,
                                padding: '20px 28px', borderRadius: 14,
                                background: PALETTE.paper, border: `1px solid ${PALETTE.line}`,
                                display: 'flex', flexDirection: 'column', gap: 10,
                            }}>
                                <div style={{ fontSize: 26, color: PALETTE.textDim, letterSpacing: '0.15em' }}>{s.label}</div>
                                <svg width="100%" height="32" viewBox="0 0 400 32">
                                    {(() => {
                                        let x = 0; const u = 14;
                                        return s.bars.map((w, j) => {
                                            const r = <rect key={j} x={x} y={0} width={w * u} height={32}
                                                fill={j % 2 === 0 ? PALETTE.ink : PALETTE.paper}
                                                stroke={j % 2 === 1 ? PALETTE.line : 'none'} />;
                                            x += w * u;
                                            return r;
                                        });
                                    })()}
                                </svg>
                                <div style={{ fontSize: 26, color: PALETTE.accent, fontWeight: 700 }}>
                                    ✗ 1:1:3:1:1 は現れない
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    opacity: fade(f, 110),
                    padding: '20px 44px', borderRadius: 18,
                    background: `${PALETTE.primary}10`, border: `2px solid ${PALETTE.primary}`,
                    fontSize: 32, fontWeight: 800, color: PALETTE.primary,
                    boxShadow: `0 0 32px ${PALETTE.primaryGlow}`,
                }}>
                    → 世界にたった1つの「識別子」
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 10 — 360度読み取り
// ============================================================
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => {
    const angles = [0, 30, 60, 90, 135, 180, 225, 315];
    const size = 15, cellPx = 10;
    const qrPx = size * cellPx;

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, letterSpacing: '0.25em', color: PALETTE.textDim }}>
                    どの向きからでも読める
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30,
                    width: 1200,
                }}>
                    {angles.map((a, i) => {
                        const appear = 10 + i * 8;
                        return (
                            <div key={i} style={{
                                opacity: fade(f, appear),
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                                padding: 20,
                                background: PALETTE.paper, borderRadius: 14,
                                border: `1px solid ${PALETTE.line}`,
                            }}>
                                <div style={{
                                    width: qrPx + 20, height: qrPx + 20,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <svg width={qrPx} height={qrPx} style={{
                                        transform: `rotate(${a}deg)`, transformOrigin: 'center',
                                    }}>
                                        <QRModule size={size} cellPx={cellPx} seed={0.5} />
                                    </svg>
                                </div>
                                <div style={{
                                    fontSize: 26, color: PALETTE.teal, fontWeight: 700,
                                    display: 'flex', alignItems: 'center', gap: 6,
                                }}>
                                    <span>✓</span>{a}°
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 11 — 静寂ゾーン: 4セルの余白
// ============================================================
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    const size = 19, cellPx = 16, quiet = 4;
    const qrPx = size * cellPx;
    const totalPx = qrPx + quiet * 2 * cellPx;

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80, opacity: fade(f, 0) }}>
                <div style={{ position: 'relative' }}>
                    <svg width={totalPx} height={totalPx}>
                        {/* quiet zone overlay */}
                        <rect width={totalPx} height={totalPx} fill={`${PALETTE.accent}10`}
                            opacity={fade(f, 20)} />
                        <g transform={`translate(${quiet * cellPx},${quiet * cellPx})`}>
                            <rect width={qrPx} height={qrPx} fill={PALETTE.paper} />
                            <QRModule size={size} cellPx={cellPx} seed={0.45} />
                        </g>
                        {/* quiet zone border arrow */}
                        <g opacity={fade(f, 40)}>
                            <line x1="0" y1={totalPx / 2} x2={quiet * cellPx} y2={totalPx / 2}
                                stroke={PALETTE.accent} strokeWidth={3} markerEnd="url(#arrow)" />
                            <line x1={totalPx} y1={totalPx / 2} x2={totalPx - quiet * cellPx} y2={totalPx / 2}
                                stroke={PALETTE.accent} strokeWidth={3} />
                        </g>
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M0,0 L10,5 L0,10 Z" fill={PALETTE.accent} />
                            </marker>
                        </defs>
                    </svg>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}>
                    <div style={{
                        opacity: fade(f, 60),
                        fontSize: 28, color: PALETTE.accent, letterSpacing: '0.2em', fontWeight: 700,
                    }}>QUIET ZONE</div>
                    <div style={{
                        opacity: fade(f, 90),
                        fontSize: 32, fontWeight: 700, color: PALETTE.text, lineHeight: 1.5,
                    }}>
                        最低 <span style={{ color: PALETTE.accent, fontSize: 56 }}>4</span> セル分の余白
                    </div>
                    <div style={{
                        opacity: fade(f, 130),
                        padding: '14px 20px', borderRadius: 10,
                        border: `1px solid ${PALETTE.line}`,
                        fontSize: 26, color: PALETTE.textDim,
                    }}>
                        境界をはっきりさせて誤検出を防ぐ
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 12 — もし訂正がなかったら: 工場の油汚れで即アウト
// ============================================================
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => {
    const size = 17, cellPx = 14;
    const qrPx = size * cellPx;
    const splatAppear = fade(f, 40, 80);

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, opacity: fade(f, 0) }}>
                {/* Factory setting illustration */}
                <div style={{
                    position: 'relative',
                    padding: 36, borderRadius: 20,
                    background: PALETTE.paper, border: `1px solid ${PALETTE.line}`,
                }}>
                    <svg width={qrPx} height={qrPx}>
                        <QRModule size={size} cellPx={cellPx} seed={0.28} />
                        {/* oil stains */}
                        <g opacity={splatAppear}>
                            <ellipse cx={qrPx * 0.3} cy={qrPx * 0.4} rx={qrPx * 0.18} ry={qrPx * 0.13}
                                fill="#4B3A1E" opacity={0.8} />
                            <ellipse cx={qrPx * 0.7} cy={qrPx * 0.7} rx={qrPx * 0.14} ry={qrPx * 0.10}
                                fill="#4B3A1E" opacity={0.75} />
                            <ellipse cx={qrPx * 0.55} cy={qrPx * 0.3} rx={qrPx * 0.08} ry={qrPx * 0.06}
                                fill="#4B3A1E" opacity={0.7} />
                        </g>
                    </svg>
                    <div style={{
                        position: 'absolute', top: -14, right: -14,
                        padding: '8px 14px', borderRadius: 8,
                        background: PALETTE.warm, color: PALETTE.paper,
                        fontSize: 26, fontWeight: 700, letterSpacing: '0.15em',
                    }}>FACTORY</div>
                </div>

                <div style={{
                    opacity: fade(f, 90),
                    fontSize: 120, color: PALETTE.accent, fontWeight: 900,
                    textShadow: `0 0 32px ${PALETTE.accentGlow}`,
                }}>
                    ×
                </div>

                <div style={{
                    opacity: fade(f, 110),
                    display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380,
                }}>
                    <div style={{
                        fontSize: 28, color: PALETTE.accent, fontWeight: 800, letterSpacing: '0.2em',
                    }}>READ FAIL</div>
                    <div style={{
                        fontSize: 30, fontWeight: 700, color: PALETTE.text, lineHeight: 1.5,
                    }}>
                        工場の油汚れで<br />一発アウト
                    </div>
                    <div style={{
                        padding: '12px 20px', borderRadius: 10,
                        background: PALETTE.paperDim, fontSize: 26, color: PALETTE.textDim,
                    }}>
                        だから "直す" 仕組みが必須だった
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 13 — リード・ソロモンの直感: 規則を足す
// ============================================================
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    const nums = ['1', '3', '5', '?', '9'];
    const answerAppear = fade(f, 100, 140);

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.25em' }}>
                    規則を付け足すだけで復元できる
                </div>

                <div style={{
                    opacity: fade(f, 10),
                    display: 'flex', alignItems: 'center', gap: 22,
                }}>
                    {nums.map((n, i) => (
                        <React.Fragment key={i}>
                            <div style={{
                                width: 120, height: 120, borderRadius: 16,
                                background: n === '?' ? PALETTE.paperDim : PALETTE.paper,
                                border: n === '?' ? `3px dashed ${PALETTE.accent}` : `1px solid ${PALETTE.line}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative',
                            }}>
                                <div style={{
                                    fontSize: n === '?' ? 56 : 64, fontWeight: 800,
                                    color: n === '?' ? PALETTE.accent : PALETTE.text,
                                }}>
                                    {n === '?' ? (
                                        <>
                                            <span style={{ opacity: 1 - answerAppear, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>?</span>
                                            <span style={{ opacity: answerAppear, color: PALETTE.teal, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>7</span>
                                        </>
                                    ) : n}
                                </div>
                            </div>
                            {i < nums.length - 1 && <div style={{ fontSize: 30, color: PALETTE.textDim }}>,</div>}
                        </React.Fragment>
                    ))}
                </div>

                <div style={{
                    opacity: fade(f, 50),
                    padding: '16px 32px', borderRadius: 14,
                    background: PALETTE.paperDim, border: `1px solid ${PALETTE.line}`,
                    display: 'flex', gap: 16, alignItems: 'baseline',
                }}>
                    <span style={{ fontSize: 26, color: PALETTE.textDim, letterSpacing: '0.15em' }}>規則:</span>
                    <span style={{ fontSize: 28, fontWeight: 700, color: PALETTE.primary }}>2 ずつ増える</span>
                </div>

                <div style={{
                    opacity: fade(f, 140),
                    display: 'flex', alignItems: 'center', gap: 20,
                    fontSize: 32, fontWeight: 700, color: PALETTE.teal,
                }}>
                    <span style={{ fontSize: 42 }}>✓</span>
                    欠けた値を数式で復元
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 14 — CDもQRも同じ技術: リード・ソロモンの3応用
// ============================================================
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { title: 'CD / DVD', sub: '傷ついても音飛びしない', color: PALETTE.primary,
          svg: (
              <svg viewBox="0 0 120 120" width="100" height="100">
                  <circle cx="60" cy="60" r="55" fill="url(#cd-g)" />
                  <circle cx="60" cy="60" r="18" fill={PALETTE.paper} />
                  <circle cx="60" cy="60" r="8" fill={PALETTE.ink} />
                  <defs>
                      <radialGradient id="cd-g" cx="0.5" cy="0.5">
                          <stop offset="0%" stopColor="#C0C4CC" />
                          <stop offset="50%" stopColor="#E8EDF3" />
                          <stop offset="100%" stopColor="#8892A0" />
                      </radialGradient>
                  </defs>
              </svg>
          ) },
        { title: 'VOYAGER', sub: '数十億kmから届く信号', color: PALETTE.amber,
          svg: (
              <svg viewBox="0 0 120 120" width="100" height="100">
                  <circle cx="60" cy="40" r="28" fill="none" stroke={PALETTE.amber} strokeWidth="3" />
                  <rect x="56" y="40" width="8" height="40" fill={PALETTE.amber} />
                  <rect x="30" y="80" width="60" height="18" fill={PALETTE.amber} opacity="0.7" />
                  <path d="M88 40 L108 20" stroke={PALETTE.amber} strokeWidth="2" />
                  <circle cx="108" cy="20" r="5" fill={PALETTE.amber} />
              </svg>
          ) },
        { title: 'QR CODE', sub: '30%欠けても復元', color: PALETTE.accent,
          svg: (
              <svg viewBox="0 0 120 120" width="100" height="100">
                  <g transform="translate(10,10)">
                      <QRModule size={10} cellPx={10} seed={0.33} />
                  </g>
              </svg>
          ) },
    ];

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                <div style={{
                    opacity: fade(f, 0), fontSize: 30, letterSpacing: '0.3em', color: PALETTE.textDim,
                }}>REED–SOLOMON</div>

                <div style={{ display: 'flex', gap: 40, alignItems: 'stretch', justifyContent: 'center' }}>
                    {items.map((it, i) => {
                        const appear = 10 + i * 30;
                        return (
                            <div key={i} style={{
                                opacity: fade(f, appear),
                                transform: `translateY(${riseY(f, appear)}px)`,
                                width: 320, padding: 32,
                                background: PALETTE.paper, borderRadius: 20,
                                border: `2px solid ${it.color}66`,
                                boxShadow: `0 12px 32px ${it.color}22`,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                            }}>
                                {it.svg}
                                <div style={{ fontSize: 28, letterSpacing: '0.25em', color: it.color, fontWeight: 800 }}>
                                    {it.title}
                                </div>
                                <div style={{ fontSize: 24, color: PALETTE.textDim, textAlign: 'center', lineHeight: 1.5 }}>
                                    {it.sub}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    opacity: fade(f, 130),
                    fontSize: 28, color: PALETTE.textDim, letterSpacing: '0.15em',
                }}>
                    宇宙からポケットまで、同じ数学
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 15 — インターリーブ: 分散配置でダメージを軽減
// ============================================================
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => {
    const unit = 44;
    const sequential = ['A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C'];
    const interleaved = ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C'];
    const stainStart = 3, stainEnd = 7;
    const colorOf = (ch: string) => ch === 'A' ? PALETTE.primary : ch === 'B' ? PALETTE.teal : PALETTE.warm;

    const Row: React.FC<{ label: string; cells: string[]; appear: number }> = ({ label, cells, appear }) => (
        <div style={{ opacity: fade(f, appear), display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 230, fontSize: 28, color: PALETTE.textDim, letterSpacing: '0.12em', textAlign: 'right' }}>{label}</div>
            <div style={{ position: 'relative', display: 'flex', gap: 4 }}>
                {cells.map((c, i) => {
                    const damaged = i >= stainStart && i < stainEnd;
                    return (
                        <div key={i} style={{
                            width: unit, height: unit, borderRadius: 6,
                            background: colorOf(c),
                            color: PALETTE.paper, fontWeight: 800, fontSize: 28,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            opacity: damaged ? 0.25 : 1,
                            position: 'relative',
                        }}>
                            {c}
                        </div>
                    );
                })}
                {/* coffee stain overlay */}
                <div style={{
                    position: 'absolute',
                    left: stainStart * (unit + 4) - 6,
                    top: -6,
                    width: (stainEnd - stainStart) * (unit + 4) - 4 + 12,
                    height: unit + 12,
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(75,58,30,0.6), rgba(75,58,30,0.1) 70%)',
                    opacity: fade(f, appear + 20),
                    pointerEvents: 'none',
                }} />
            </div>
        </div>
    );

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.2em' }}>
                    ブロックをバラして配置する
                </div>
                <Row label="逐次配置 →" cells={sequential} appear={10} />
                <div style={{
                    opacity: fade(f, 50),
                    padding: '6px 18px', borderRadius: 8,
                    background: `${PALETTE.accent}15`, color: PALETTE.accent,
                    fontSize: 24, fontWeight: 700,
                }}>
                    ブロック A が全滅 → 復元不能
                </div>
                <Row label="インターリーブ →" cells={interleaved} appear={90} />
                <div style={{
                    opacity: fade(f, 130),
                    padding: '8px 22px', borderRadius: 10,
                    background: `${PALETTE.teal}15`, color: PALETTE.teal, border: `1px solid ${PALETTE.teal}55`,
                    fontSize: 28, fontWeight: 700,
                }}>
                    ✓ 被害が分散 → 全ブロック復元可能
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 16 — デザインQRの仕組み: ロゴ埋め込み + レベルH
// ============================================================
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => {
    const size = 23, cellPx = 16;
    const qrPx = size * cellPx;
    const logoSize = 7 * cellPx;
    const logoX = (size - 7) / 2 * cellPx;
    const skipLogo = (x: number, y: number) =>
        x >= (size - 7) / 2 && x < (size + 7) / 2 && y >= (size - 7) / 2 && y < (size + 7) / 2;

    const levels = [
        { code: 'L', recover: 7, spec: false },
        { code: 'M', recover: 15, spec: false },
        { code: 'Q', recover: 25, spec: false },
        { code: 'H', recover: 30, spec: true },
    ];

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70, opacity: fade(f, 0) }}>
                <div style={{
                    padding: 28, background: PALETTE.paper, borderRadius: 18,
                    border: `1px solid ${PALETTE.line}`, position: 'relative',
                }}>
                    <svg width={qrPx} height={qrPx}>
                        <QRModule size={size} cellPx={cellPx} seed={0.19} skipCells={skipLogo} />
                        {/* Logo placeholder */}
                        <g transform={`translate(${logoX},${logoX})`} opacity={fade(f, 40)}>
                            <rect width={logoSize} height={logoSize} rx={12}
                                fill={PALETTE.primary} />
                            <text x={logoSize / 2} y={logoSize / 2 + 12}
                                textAnchor="middle" fontSize="40" fontWeight="900" fill={PALETTE.paper}>★</text>
                        </g>
                    </svg>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 380 }}>
                    <div style={{
                        opacity: fade(f, 20), fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.2em',
                    }}>誤り訂正レベル</div>
                    {levels.map((l, i) => {
                        const appear = 40 + i * 20;
                        return (
                            <div key={i} style={{
                                opacity: fade(f, appear),
                                display: 'grid', gridTemplateColumns: '80px 1fr 120px',
                                alignItems: 'center', gap: 14,
                            }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: 12,
                                    background: l.spec ? PALETTE.accent : PALETTE.paperDim,
                                    color: l.spec ? PALETTE.paper : PALETTE.text,
                                    fontSize: 34, fontWeight: 800,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: l.spec ? `0 0 16px ${PALETTE.accentGlow}` : 'none',
                                }}>{l.code}</div>
                                <div style={{
                                    height: 18, borderRadius: 9,
                                    background: PALETTE.paperDim, position: 'relative', overflow: 'hidden',
                                }}>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        width: `${(l.recover / 30) * 100}%`,
                                        background: l.spec ? PALETTE.accent : PALETTE.primary,
                                        borderRadius: 9,
                                    }} />
                                </div>
                                <div style={{
                                    fontSize: 28, fontWeight: 700,
                                    color: l.spec ? PALETTE.accent : PALETTE.text, textAlign: 'right',
                                }}>{l.recover}%</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 17 — 読み取りの全体像: 6ステップのフロー
// ============================================================
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => {
    const steps = [
        { n: '1', t: '撮影', s: 'camera' },
        { n: '2', t: '2値化', s: 'binarize' },
        { n: '3', t: 'ファインダー', s: 'find' },
        { n: '4', t: 'タイミング', s: 'grid' },
        { n: '5', t: 'デコード', s: 'decode' },
        { n: '6', t: '出力', s: 'output' },
    ];

    const StepIcon: React.FC<{ kind: string; color: string }> = ({ kind, color }) => {
        const props = { stroke: color, strokeWidth: 2.5, fill: 'none' } as const;
        return (
            <svg width="48" height="48" viewBox="0 0 48 48">
                {kind === 'camera' && (<>
                    <rect x="6" y="14" width="36" height="26" rx="4" {...props} />
                    <circle cx="24" cy="27" r="7" {...props} />
                    <rect x="18" y="10" width="12" height="6" rx="2" {...props} />
                </>)}
                {kind === 'binarize' && (<>
                    <rect x="6" y="6" width="16" height="36" fill={color} />
                    <rect x="26" y="6" width="16" height="36" fill="none" stroke={color} strokeWidth="2.5" />
                </>)}
                {kind === 'find' && (<>
                    <rect x="6" y="6" width="14" height="14" fill={color} />
                    <rect x="28" y="6" width="14" height="14" fill={color} />
                    <rect x="6" y="28" width="14" height="14" fill={color} />
                </>)}
                {kind === 'grid' && (<>
                    <line x1="4" y1="12" x2="44" y2="12" {...props} />
                    <line x1="4" y1="24" x2="44" y2="24" {...props} />
                    <line x1="4" y1="36" x2="44" y2="36" {...props} />
                    <line x1="12" y1="4" x2="12" y2="44" {...props} />
                    <line x1="24" y1="4" x2="24" y2="44" {...props} />
                    <line x1="36" y1="4" x2="36" y2="44" {...props} />
                </>)}
                {kind === 'decode' && (<>
                    <rect x="6" y="10" width="36" height="28" rx="3" {...props} />
                    <text x="24" y="30" fontSize="20" textAnchor="middle" fill={color} fontWeight="700">01</text>
                </>)}
                {kind === 'output' && (<>
                    <path d="M6 24 L34 24" {...props} strokeLinecap="round" />
                    <path d="M28 14 L42 24 L28 34" {...props} strokeLinecap="round" strokeLinejoin="round" />
                </>)}
            </svg>
        );
    };

    return (
        <Stage>
            <div style={{ width: 1600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.2em' }}>
                    READ PIPELINE — 6 STEPS
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {steps.map((s, i) => {
                        const appear = 10 + i * 18;
                        return (
                            <React.Fragment key={i}>
                                <div style={{
                                    opacity: fade(f, appear),
                                    transform: `translateY(${riseY(f, appear)}px)`,
                                    width: 200, padding: '22px 14px',
                                    background: PALETTE.paper, borderRadius: 14,
                                    border: `1px solid ${PALETTE.primary}33`,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                                    boxShadow: `0 4px 18px ${PALETTE.primaryGlow}`,
                                }}>
                                    <div style={{
                                        width: 38, height: 38, borderRadius: '50%',
                                        background: PALETTE.primary, color: PALETTE.paper,
                                        fontSize: 24, fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>{s.n}</div>
                                    <StepIcon kind={s.s} color={PALETTE.primary} />
                                    <div style={{ fontSize: 28, fontWeight: 700, color: PALETTE.text, whiteSpace: 'nowrap' }}>{s.t}</div>
                                </div>
                                {i < steps.length - 1 && (
                                    <div style={{
                                        opacity: fade(f, appear + 10),
                                        fontSize: 32, color: PALETTE.primary, fontWeight: 300,
                                    }}>→</div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <div style={{
                    opacity: fade(f, 140),
                    padding: '14px 30px', borderRadius: 12,
                    background: PALETTE.paperDim, fontSize: 28, color: PALETTE.textDim,
                }}>
                    カメラ画像 → 白黒 → 位置 → 座標 → データ → 文字列
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 18 — 4つのモード: 数字 / 英数字 / バイナリ / 漢字
// ============================================================
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => {
    const modes = [
        { name: '数字', sample: '0-9', bits: 10, per: '3桁', color: PALETTE.primary },
        { name: '英数字', sample: 'A-Z 0-9', bits: 11, per: '2文字', color: PALETTE.teal },
        { name: 'バイナリ', sample: '0x00-0xFF', bits: 8, per: '1バイト', color: PALETTE.amber },
        { name: '漢字', sample: 'Shift_JIS', bits: 13, per: '1文字', color: PALETTE.accent },
    ];

    return (
        <Stage>
            <div style={{ width: 1600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.2em' }}>
                    ENCODING MODES
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: 1480 }}>
                    {modes.map((m, i) => {
                        const appear = 10 + i * 15;
                        return (
                            <div key={i} style={{
                                opacity: fade(f, appear),
                                transform: `translateY(${riseY(f, appear)}px)`,
                                padding: 28,
                                background: PALETTE.paper, borderRadius: 18,
                                border: `2px solid ${m.color}55`,
                                boxShadow: `0 10px 32px ${m.color}22`,
                                display: 'flex', flexDirection: 'column', gap: 14,
                            }}>
                                <div style={{ fontSize: 32, fontWeight: 800, color: m.color }}>{m.name}</div>
                                <div style={{
                                    fontFamily: 'monospace', fontSize: 26,
                                    padding: '8px 14px', borderRadius: 8,
                                    background: PALETTE.paperDim, color: PALETTE.text,
                                }}>{m.sample}</div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                                    <div style={{ fontSize: 56, fontWeight: 800, color: m.color }}>{m.bits}</div>
                                    <div style={{ fontSize: 24, color: PALETTE.textDim }}>bit で</div>
                                </div>
                                <div style={{
                                    padding: '8px 14px', borderRadius: 8,
                                    background: `${m.color}15`, color: m.color, fontSize: 26, fontWeight: 700,
                                    textAlign: 'center',
                                }}>{m.per}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 19 — マスクパターン: 8種から最適を選ぶ
// ============================================================
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => {
    const maskFn = (idx: number) => {
        const fns = [
            (x: number, y: number) => (x + y) % 2 === 0,
            (x: number, y: number) => y % 2 === 0,
            (x: number, y: number) => x % 3 === 0,
            (x: number, y: number) => (x + y) % 3 === 0,
            (x: number, y: number) => (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0,
            (x: number, y: number) => ((x * y) % 2) + ((x * y) % 3) === 0,
            (x: number, y: number) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
            (x: number, y: number) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
        ];
        return fns[idx];
    };
    const N = 10, cellPx = 10;
    const tilePx = N * cellPx;
    const chosen = 3;

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.2em' }}>
                    8種類を試して、白黒バランスが最良のものを選ぶ
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12, width: 1400 }}>
                    {Array.from({ length: 8 }).map((_, i) => {
                        const appear = 10 + i * 8;
                        const isChosen = i === chosen;
                        const fn = maskFn(i);
                        const cells: [number, number][] = [];
                        for (let y = 0; y < N; y++) {
                            for (let x = 0; x < N; x++) {
                                if (fn(x, y)) cells.push([x, y]);
                            }
                        }
                        return (
                            <div key={i} style={{
                                opacity: fade(f, appear),
                                padding: 14,
                                background: PALETTE.paper, borderRadius: 12,
                                border: isChosen ? `3px solid ${PALETTE.accent}` : `1px solid ${PALETTE.line}`,
                                boxShadow: isChosen ? `0 0 24px ${PALETTE.accentGlow}` : 'none',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                            }}>
                                <div style={{ fontSize: 24, color: PALETTE.textDim, letterSpacing: '0.15em' }}>
                                    #{i}
                                </div>
                                <svg width={tilePx} height={tilePx}>
                                    {cells.map(([x, y], j) => (
                                        <rect key={j} x={x * cellPx} y={y * cellPx}
                                            width={cellPx - 1} height={cellPx - 1} fill={PALETTE.ink} />
                                    ))}
                                </svg>
                                {isChosen && (
                                    <div style={{
                                        fontSize: 24, fontWeight: 800, color: PALETTE.accent, letterSpacing: '0.12em',
                                    }}>BEST</div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    opacity: fade(f, 100),
                    fontSize: 28, color: PALETTE.textDim, letterSpacing: '0.1em',
                }}>
                    あの「ランダムに見える模様」は、実は計算された最適解
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 20 — 32ミリ秒の世界
// ============================================================
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <div style={{ width: 1400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.25em' }}>
                    読み取り完了までの時間
                </div>

                <div style={{
                    opacity: fade(f, 10), transform: `translateY(${riseY(f, 10)}px)`,
                    display: 'flex', alignItems: 'baseline', gap: 20,
                }}>
                    <div style={{
                        fontSize: 280, fontWeight: 800, color: PALETTE.primary, lineHeight: 1,
                        textShadow: `0 0 40px ${PALETTE.primaryGlow}`,
                    }}>32</div>
                    <div style={{ fontSize: 110, fontWeight: 700, color: PALETTE.primary }}>ms</div>
                </div>

                <div style={{
                    opacity: fade(f, 90),
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, width: 1000,
                }}>
                    <div style={{
                        padding: '22px 28px', borderRadius: 14,
                        background: PALETTE.paper, border: `1px solid ${PALETTE.line}`,
                        display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
                    }}>
                        <div style={{ fontSize: 24, color: PALETTE.textDim, letterSpacing: '0.15em' }}>まばたき</div>
                        <div style={{ fontSize: 42, fontWeight: 800, color: PALETTE.text }}>100〜400 ms</div>
                    </div>
                    <div style={{
                        padding: '22px 28px', borderRadius: 14,
                        background: `${PALETTE.primary}10`, border: `2px solid ${PALETTE.primary}`,
                        display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
                        boxShadow: `0 0 24px ${PALETTE.primaryGlow}`,
                    }}>
                        <div style={{ fontSize: 24, color: PALETTE.primary, letterSpacing: '0.15em', fontWeight: 700 }}>QR 読み取り</div>
                        <div style={{ fontSize: 42, fontWeight: 800, color: PALETTE.primary }}>32 ms</div>
                    </div>
                </div>

                <div style={{
                    opacity: fade(f, 150),
                    fontSize: 32, color: PALETTE.accent, fontWeight: 800, letterSpacing: '0.15em',
                }}>
                    Quick Response は伊達じゃない
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 21 — オープン戦略: 仕様は公開、装置は特許
// ============================================================
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
                <div style={{
                    opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)`,
                    width: 480, height: 420, padding: 40, borderRadius: 22,
                    background: `${PALETTE.teal}10`, border: `2px solid ${PALETTE.teal}`,
                    display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center',
                    boxShadow: `0 12px 32px ${PALETTE.teal}22`,
                }}>
                    <div style={{
                        fontSize: 28, color: PALETTE.teal, fontWeight: 800, letterSpacing: '0.3em',
                    }}>OPEN</div>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <rect x="30" y="55" width="60" height="50" rx="6" fill="none" stroke={PALETTE.teal} strokeWidth="5" />
                        <path d="M45 55 L45 40 Q45 20 75 25" fill="none" stroke={PALETTE.teal} strokeWidth="5" strokeLinecap="round" />
                        <circle cx="60" cy="78" r="8" fill={PALETTE.teal} />
                        <line x1="60" y1="86" x2="60" y2="95" stroke={PALETTE.teal} strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <div style={{ fontSize: 32, fontWeight: 700, color: PALETTE.text, textAlign: 'center' }}>
                        QRコードの仕様
                    </div>
                    <div style={{
                        padding: '10px 22px', borderRadius: 10,
                        background: PALETTE.teal, color: PALETTE.paper,
                        fontSize: 26, fontWeight: 800, letterSpacing: '0.15em',
                    }}>FREE</div>
                    <div style={{ fontSize: 24, color: PALETTE.textDim, textAlign: 'center' }}>
                        誰でも自由に生成できる
                    </div>
                </div>

                <div style={{
                    opacity: fade(f, 40),
                    fontSize: 32, color: PALETTE.textDim, fontWeight: 700, letterSpacing: '0.2em',
                }}>vs</div>

                <div style={{
                    opacity: fade(f, 60), transform: `translateY(${riseY(f, 60)}px)`,
                    width: 480, height: 420, padding: 40, borderRadius: 22,
                    background: `${PALETTE.accent}10`, border: `2px solid ${PALETTE.accent}`,
                    display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center',
                    boxShadow: `0 12px 32px ${PALETTE.accent}22`,
                }}>
                    <div style={{
                        fontSize: 28, color: PALETTE.accent, fontWeight: 800, letterSpacing: '0.3em',
                    }}>PATENTED</div>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <rect x="30" y="55" width="60" height="50" rx="6" fill="none" stroke={PALETTE.accent} strokeWidth="5" />
                        <path d="M45 55 L45 40 Q45 20 75 20 Q95 20 95 40 L95 55" fill="none" stroke={PALETTE.accent} strokeWidth="5" strokeLinecap="round" />
                        <circle cx="60" cy="78" r="8" fill={PALETTE.accent} />
                    </svg>
                    <div style={{ fontSize: 32, fontWeight: 700, color: PALETTE.text, textAlign: 'center' }}>
                        読み取り装置
                    </div>
                    <div style={{
                        padding: '10px 22px', borderRadius: 10,
                        background: PALETTE.accent, color: PALETTE.paper,
                        fontSize: 26, fontWeight: 800, letterSpacing: '0.15em',
                    }}>PATENT</div>
                    <div style={{ fontSize: 24, color: PALETTE.textDim, textAlign: 'center' }}>
                        ここでデンソーが収益化
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 22 — 普及の3つの波: 2002 / 2010s / 2020
// ============================================================
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => {
    const waves = [
        { year: '2002', title: '日本のケータイ', sub: 'QR リーダー搭載', color: PALETTE.primary, height: 80 },
        { year: '2010s', title: '中国のQR決済', sub: 'Alipay / WeChat Pay', color: PALETTE.warm, height: 140 },
        { year: '2020', title: '世界へ', sub: 'コロナ禍で欧米にも', color: PALETTE.accent, height: 200 },
    ];
    const lineProg = interpolate(f, [20, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.25em' }}>
                    3 WAVES OF ADOPTION
                </div>

                <div style={{ position: 'relative', width: 1400, height: 320 }}>
                    {/* Baseline */}
                    <div style={{
                        position: 'absolute', bottom: 40, left: 80, right: 80,
                        height: 4, background: PALETTE.line, borderRadius: 2,
                    }} />
                    <div style={{
                        position: 'absolute', bottom: 40, left: 80,
                        width: `calc((100% - 160px) * ${lineProg})`,
                        height: 4, background: `linear-gradient(90deg, ${PALETTE.primary}, ${PALETTE.warm}, ${PALETTE.accent})`,
                        borderRadius: 2, boxShadow: `0 0 12px ${PALETTE.accent}66`,
                    }} />

                    {waves.map((w, i) => {
                        const xPct = i / (waves.length - 1);
                        const appear = 30 + i * 45;
                        const barHeight = interpolate(f, [appear + 10, appear + 50], [0, w.height],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                left: `calc(80px + ${xPct} * (100% - 160px))`,
                                bottom: 40, transform: 'translateX(-50%)',
                                width: 280,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                                opacity: fade(f, appear),
                            }}>
                                {/* wave bar */}
                                <div style={{
                                    width: 140, height: barHeight, borderRadius: '70px 70px 18px 18px',
                                    background: `linear-gradient(180deg, ${w.color}dd, ${w.color}77)`,
                                    boxShadow: `0 0 24px ${w.color}55`,
                                    marginBottom: -4,
                                }} />
                                {/* node */}
                                <div style={{
                                    width: 20, height: 20, borderRadius: '50%',
                                    background: w.color, border: '3px solid #F5F7FB',
                                    boxShadow: `0 0 12px ${w.color}aa`,
                                    position: 'absolute', bottom: 32,
                                }} />
                                <div style={{ fontSize: 34, fontWeight: 800, color: w.color, marginTop: 18 }}>{w.year}</div>
                                <div style={{ fontSize: 28, fontWeight: 700, color: PALETTE.text, textAlign: 'center' }}>{w.title}</div>
                                <div style={{ fontSize: 26, color: PALETTE.textDim, textAlign: 'center' }}>{w.sub}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 23 — あの模様の正体: 3層の設計
// ============================================================
const Scene23: React.FC<SceneProps> = ({ localFrame: f }) => {
    const layers = [
        { t: '見つける', en: 'FIND', c: PALETTE.accent, desc: '1:1:3:1:1 のファインダー' },
        { t: '直す', en: 'FIX', c: PALETTE.teal, desc: 'リード・ソロモン + インターリーブ' },
        { t: '読む', en: 'READ', c: PALETTE.primary, desc: '4モード × マスクパターン' },
    ];
    const size = 21, cellPx = 14;
    const qrPx = size * cellPx;

    return (
        <Stage>
            <div style={{ width: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70, opacity: fade(f, 0) }}>
                {/* QR on left */}
                <div style={{
                    padding: 28, background: PALETTE.paper, borderRadius: 18,
                    border: `1px solid ${PALETTE.line}`,
                    boxShadow: `0 20px 60px rgba(15,23,42,0.10)`,
                }}>
                    <svg width={qrPx} height={qrPx}>
                        <QRModule size={size} cellPx={cellPx} seed={0.65} />
                    </svg>
                </div>

                {/* 3 stacked layers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 540 }}>
                    {layers.map((l, i) => {
                        const appear = 20 + i * 30;
                        return (
                            <div key={i} style={{
                                opacity: fade(f, appear),
                                transform: `translateY(${riseY(f, appear)}px)`,
                                padding: '20px 28px', borderRadius: 14,
                                background: PALETTE.paper,
                                border: `2px solid ${l.c}`,
                                boxShadow: `0 6px 24px ${l.c}33`,
                                display: 'flex', alignItems: 'center', gap: 22,
                            }}>
                                <div style={{
                                    width: 70, height: 70, borderRadius: '50%',
                                    background: l.c, color: PALETTE.paper,
                                    fontSize: 24, fontWeight: 800, letterSpacing: '0.1em',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>{l.en}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <div style={{ fontSize: 30, fontWeight: 800, color: l.c }}>{l.t}</div>
                                    <div style={{ fontSize: 24, color: PALETTE.textDim }}>{l.desc}</div>
                                </div>
                            </div>
                        );
                    })}

                    <div style={{
                        opacity: fade(f, 130),
                        marginTop: 12, padding: '14px 22px', borderRadius: 12,
                        background: PALETTE.paperDim, border: `1px solid ${PALETTE.line}`,
                        fontSize: 26, color: PALETTE.textDim, lineHeight: 1.5, textAlign: 'center',
                    }}>
                        1 ドットも無駄のない<span style={{ color: PALETTE.primary, fontWeight: 700 }}>精緻な設計図</span>
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Export
// ============================================================
export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5,
    Scene6, Scene7, Scene8, Scene9, Scene10, Scene11,
    Scene12, Scene13, Scene14, Scene15, Scene16, Scene17,
    Scene18, Scene19, Scene20, Scene21, Scene22, Scene23,
];

export const SCENE_TITLES: string[] = [
    'QRコードの秘密',
    '22億人の日常',
    '3割消えても読める',
    'バーコードの限界',
    '1次元から2次元へ',
    '囲碁からの着想',
    'QRコードの全体像',
    '3つの四角の正体',
    '1:1:3:1:1の発見',
    '存在しない比率',
    '360度読み取り',
    '静寂ゾーン',
    'もし訂正がなかったら',
    'リード・ソロモンの直感',
    'CDもQRも同じ技術',
    'インターリーブ',
    'デザインQRの仕組み',
    '読み取りの全体像',
    '4つのモード',
    'マスクパターン',
    '32ミリ秒の世界',
    'オープン戦略',
    '普及の3つの波',
    'あの模様の正体',
];
