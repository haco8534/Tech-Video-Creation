import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

// ============================================================
// Palette — 動画形式: indigo container / crimson patent drama
// ============================================================
const PALETTE = {
    ...BASE_COLORS,
    primary: '#4F46E5',
    primaryDeep: '#3730A3',
    primaryGlow: 'rgba(79,70,229,0.28)',
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
    grid: 'rgba(15,23,42,0.06)',
};

const fade = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const riseY = (f: number, from: number, to = from + 18, dist = 16) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const scaleIn = (f: number, from: number, to = from + 14) =>
    interpolate(f, [from, to], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Stage: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: 80, paddingRight: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</div>
);

const FileIcon: React.FC<{
    label: string; color?: string; w?: number; h?: number; sublabel?: string;
}> = ({ label, color = PALETTE.primary, w = 140, h = 170, sublabel }) => (
    <svg width={w} height={h} viewBox="0 0 140 170">
        <path d="M20 10 L95 10 L125 40 L125 160 L20 160 Z" fill={PALETTE.paper}
            stroke={color} strokeWidth={3} />
        <path d="M95 10 L95 40 L125 40" fill="none" stroke={color} strokeWidth={3} />
        <rect x="40" y="70" width="65" height="34" rx="6" fill={color} />
        <text x="72" y="92" textAnchor="middle" fill={PALETTE.paper} fontSize={18} fontWeight={800}>
            {label}
        </text>
        {sublabel && (
            <text x="72" y="130" textAnchor="middle" fill={PALETTE.textDim} fontSize={15}>
                {sublabel}
            </text>
        )}
    </svg>
);

const BoxIcon: React.FC<{
    label: string; sublabel?: string; color?: string; w?: number; h?: number;
}> = ({ label, sublabel, color = PALETTE.primary, w = 220, h = 180 }) => (
    <svg width={w} height={h} viewBox="0 0 220 180">
        <path d="M10 45 L110 20 L210 45 L210 155 L110 180 L10 155 Z"
            fill={PALETTE.paper} stroke={color} strokeWidth={3} />
        <path d="M10 45 L110 70 L210 45" fill="none" stroke={color} strokeWidth={3} />
        <path d="M110 70 L110 180" fill="none" stroke={color} strokeWidth={3} strokeDasharray="6 4" opacity={0.5} />
        <rect x="60" y="88" width="100" height="34" rx="6" fill={color} />
        <text x="110" y="111" textAnchor="middle" fill={PALETTE.paper} fontSize={18} fontWeight={800}>{label}</text>
        {sublabel && <text x="110" y="145" textAnchor="middle" fill={PALETTE.textDim} fontSize={14}>{sublabel}</text>}
    </svg>
);

// ============================================================
// Scene 0 — 拡張子の多さ: フォルダ風UIに動画拡張子が並ぶ
// ============================================================
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => {
    const files = [
        { ext: '.mp4', color: PALETTE.primary, delay: 20 },
        { ext: '.mov', color: PALETTE.violet, delay: 30 },
        { ext: '.mkv', color: PALETTE.teal, delay: 40 },
        { ext: '.webm', color: PALETTE.amber, delay: 50 },
        { ext: '.avi', color: PALETTE.accent, delay: 60 },
    ];
    return (
        <Stage>
            <div style={{
                opacity: fade(f, 0),
                width: 1400, background: PALETTE.paper,
                border: `2px solid ${PALETTE.line}`, borderRadius: 22,
                boxShadow: '0 20px 60px rgba(15,23,42,0.10)',
                overflow: 'hidden',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '14px 24px', borderBottom: `1px solid ${PALETTE.line}`,
                    background: PALETTE.paperDim,
                }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: '#EF4444' }} />
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: '#F59E0B' }} />
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: '#10B981' }} />
                    <div style={{ marginLeft: 24, fontSize: 22, color: PALETTE.textDim, fontFamily: 'monospace' }}>
                        スマホ / 動画フォルダ
                    </div>
                </div>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 24, padding: 48,
                }}>
                    {files.map((file, i) => (
                        <div key={i} style={{
                            opacity: fade(f, file.delay),
                            transform: `translateY(${riseY(f, file.delay, file.delay + 18, 24)}px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}>
                            <FileIcon label={file.ext} color={file.color} w={150} h={180} />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                position: 'absolute', bottom: 270, left: '50%', transform: 'translateX(-50%)',
                opacity: fade(f, 85),
                fontSize: 40, color: PALETTE.text, fontWeight: 700,
            }}>
                全部 動画。なのに、なぜ？
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 1 — 2階建ての予告: 2階建ての家のシルエット
// ============================================================
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
            <div style={{
                opacity: fade(f, 0),
                fontSize: 34, color: PALETTE.textDim, letterSpacing: '0.2em',
            }}>動画ファイルは…</div>

            <svg width={520} height={440} viewBox="0 0 520 440">
                <path d="M30 110 L260 20 L490 110 Z"
                    fill={PALETTE.primaryDeep} opacity={fade(f, 10)} />
                <rect x={70} y={110} width={380} height={140}
                    fill={PALETTE.paper} stroke={PALETTE.primary} strokeWidth={4}
                    opacity={fade(f, 25)} />
                <text x={260} y={175} textAnchor="middle" fontSize={38} fontWeight={800}
                    fill={PALETTE.primary} opacity={fade(f, 35)}>箱</text>
                <text x={260} y={215} textAnchor="middle" fontSize={22}
                    fill={PALETTE.textDim} opacity={fade(f, 45)}>(コンテナ)</text>

                <line x1={70} y1={250} x2={450} y2={250} stroke={PALETTE.ink} strokeWidth={4}
                    opacity={fade(f, 55)} />

                <rect x={70} y={250} width={380} height={140}
                    fill={PALETTE.paper} stroke={PALETTE.accent} strokeWidth={4}
                    opacity={fade(f, 60)} />
                <text x={260} y={315} textAnchor="middle" fontSize={38} fontWeight={800}
                    fill={PALETTE.accent} opacity={fade(f, 70)}>圧縮方式</text>
                <text x={260} y={355} textAnchor="middle" fontSize={22}
                    fill={PALETTE.textDim} opacity={fade(f, 80)}>(コーデック)</text>

                <rect x={0} y={390} width={520} height={10} fill={PALETTE.textDim} opacity={0.4} />
            </svg>

            <div style={{
                opacity: fade(f, 95),
                fontSize: 28, color: PALETTE.text, fontWeight: 600,
            }}>
                上と下で、多様化した理由が違う
            </div>
        </div>
    </Stage>
);

// ============================================================
// Scene 2 — 今日の見取り図: 3つの論点
// ============================================================
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cards = [
        { no: '1', title: '動画ファイルは', big: '2階建て', color: PALETTE.primary, delay: 10 },
        { no: '2', title: '下の階で続く', big: '特許ドラマ', color: PALETTE.accent, delay: 40 },
        { no: '3', title: '性能最強が', big: '勝てない世界', color: PALETTE.teal, delay: 70 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50 }}>
                <div style={{
                    opacity: fade(f, 0),
                    fontSize: 36, color: PALETTE.textDim, letterSpacing: '0.3em',
                }}>
                    今日の見取り図
                </div>
                <div style={{ display: 'flex', gap: 40 }}>
                    {cards.map((c, i) => (
                        <div key={i} style={{
                            opacity: fade(f, c.delay),
                            transform: `translateY(${riseY(f, c.delay, c.delay + 22, 30)}px)`,
                            width: 360, padding: 36, borderRadius: 20,
                            background: PALETTE.paper, border: `3px solid ${c.color}`,
                            display: 'flex', flexDirection: 'column', gap: 14,
                            boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
                        }}>
                            <div style={{
                                fontSize: 24, color: c.color, fontWeight: 800, letterSpacing: '0.15em',
                            }}>STEP {c.no}</div>
                            <div style={{ fontSize: 28, color: PALETTE.textDim }}>{c.title}</div>
                            <div style={{ fontSize: 44, fontWeight: 800, color: c.color }}>{c.big}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 3 — プロパティ画面: Windowsダイアログ風
// ============================================================
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{
            opacity: fade(f, 0), transform: `scale(${scaleIn(f, 0)})`,
            width: 720, background: PALETTE.paper,
            border: `2px solid ${PALETTE.line}`, borderRadius: 14,
            boxShadow: '0 30px 80px rgba(15,23,42,0.20)',
            overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 20px', background: PALETTE.primaryDeep, color: PALETTE.paper,
                fontSize: 20, fontWeight: 600,
            }}>
                <span>video.mp4 のプロパティ</span>
                <span style={{ fontSize: 18 }}>✕</span>
            </div>
            <div style={{
                display: 'flex', gap: 4, padding: '12px 20px 0', background: PALETTE.paperDim,
                borderBottom: `1px solid ${PALETTE.line}`,
            }}>
                {['全般', 'セキュリティ', '詳細'].map((t, i) => (
                    <div key={i} style={{
                        padding: '10px 20px', fontSize: 18,
                        background: i === 2 ? PALETTE.paper : 'transparent',
                        border: i === 2 ? `1px solid ${PALETTE.line}` : 'none',
                        borderBottom: i === 2 ? 'none' : undefined,
                        borderRadius: '6px 6px 0 0',
                        color: i === 2 ? PALETTE.text : PALETTE.textDim,
                        fontWeight: i === 2 ? 700 : 400,
                    }}>{t}</div>
                ))}
            </div>
            <div style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                    { k: 'ファイル名', v: 'video.mp4' },
                    { k: 'コンテナ', v: 'MP4 (ISO BMFF)' },
                    { k: 'フレームレート', v: '30 fps' },
                    { k: 'ビデオコーデック', v: 'H.264', highlight: true },
                    { k: 'オーディオコーデック', v: 'AAC' },
                ].map((row, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 20,
                        opacity: fade(f, 20 + i * 8),
                    }}>
                        <div style={{ width: 220, fontSize: 22, color: PALETTE.textDim }}>{row.k}</div>
                        <div style={{
                            flex: 1, padding: '10px 16px', borderRadius: 8,
                            background: row.highlight ? PALETTE.accentGlow : PALETTE.paperDim,
                            border: row.highlight ? `2px solid ${PALETTE.accent}` : `1px solid ${PALETTE.line}`,
                            fontSize: 26, fontWeight: row.highlight ? 800 : 500,
                            color: row.highlight ? PALETTE.accent : PALETTE.text,
                            fontFamily: 'monospace',
                        }}>{row.v}</div>
                    </div>
                ))}
            </div>
        </div>

        <div style={{
            position: 'absolute', right: 140, top: '50%',
            opacity: fade(f, 80),
            display: 'flex', alignItems: 'center', gap: 16,
        }}>
            <div style={{ fontSize: 54, color: PALETTE.accent }}>←</div>
            <div style={{
                padding: '14px 24px', borderRadius: 14,
                background: PALETTE.accent, color: PALETTE.paper,
                fontSize: 26, fontWeight: 700,
            }}>
                別のコーデック
            </div>
        </div>
    </Stage>
);

// ============================================================
// Scene 4 — 箱と中身: コンテナの中に3つのトラック
// ============================================================
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    const tracks = [
        { label: '映像', sub: 'Video Track', color: PALETTE.primary, delay: 30, icon: '▶' },
        { label: '音声', sub: 'Audio Track', color: PALETTE.amber, delay: 45, icon: '♪' },
        { label: '字幕', sub: 'Subtitle Track', color: PALETTE.teal, delay: 60, icon: 'A' },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
                <div style={{
                    opacity: fade(f, 0), transform: `scale(${scaleIn(f, 0)})`,
                }}>
                    <svg width={320} height={380} viewBox="0 0 320 380">
                        <path d="M20 80 L160 30 L300 80 L300 330 L160 380 L20 330 Z"
                            fill={PALETTE.paper} stroke={PALETTE.primary} strokeWidth={4} />
                        <path d="M20 80 L160 130 L300 80" fill="none" stroke={PALETTE.primary} strokeWidth={4} />
                        <path d="M160 130 L160 380" fill="none" stroke={PALETTE.primary} strokeWidth={4} strokeDasharray="6 4" opacity={0.4} />
                        <rect x="90" y="180" width="140" height="44" rx="8" fill={PALETTE.primary} />
                        <text x="160" y="210" textAnchor="middle" fill={PALETTE.paper} fontSize={24} fontWeight={800}>.mp4</text>
                        <text x="160" y="260" textAnchor="middle" fill={PALETTE.textDim} fontSize={18}>Container</text>
                    </svg>
                </div>

                <div style={{ fontSize: 80, fontWeight: 300, color: PALETTE.textDim, opacity: fade(f, 15) }}>=</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {tracks.map((t, i) => (
                        <div key={i} style={{
                            opacity: fade(f, t.delay),
                            transform: `translateX(${interpolate(f, [t.delay, t.delay + 20], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                            width: 440, height: 90, padding: 20, borderRadius: 16,
                            background: PALETTE.paper, border: `3px solid ${t.color}`,
                            display: 'flex', alignItems: 'center', gap: 22,
                            boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
                        }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: 14,
                                background: t.color, color: PALETTE.paper,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 32, fontWeight: 800,
                            }}>{t.icon}</div>
                            <div>
                                <div style={{ fontSize: 30, fontWeight: 800, color: t.color }}>{t.label}</div>
                                <div style={{ fontSize: 18, color: PALETTE.textDim }}>{t.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 5 — 同じ箱で中身違い: 3つのmp4に違うコーデック
// ============================================================
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    const variants = [
        { codec: 'H.264', color: PALETTE.amber, delay: 15 },
        { codec: 'HEVC', color: PALETTE.violet, delay: 35 },
        { codec: 'AV1', color: PALETTE.teal, delay: 55 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 34, color: PALETTE.textDim }}>
                    すべて <span style={{ fontFamily: 'monospace', color: PALETTE.primary, fontWeight: 700 }}>.mp4</span> だが…
                </div>
                <div style={{ display: 'flex', gap: 48 }}>
                    {variants.map((v, i) => (
                        <div key={i} style={{
                            opacity: fade(f, v.delay),
                            transform: `translateY(${riseY(f, v.delay, v.delay + 20, 30)}px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
                        }}>
                            <svg width={240} height={260} viewBox="0 0 240 260">
                                <path d="M20 60 L120 20 L220 60 L220 220 L120 260 L20 220 Z"
                                    fill={PALETTE.paper} stroke={PALETTE.primary} strokeWidth={3} />
                                <path d="M20 60 L120 100 L220 60" fill="none" stroke={PALETTE.primary} strokeWidth={3} />
                                <rect x="60" y="130" width="120" height="40" rx="8" fill={PALETTE.primary} />
                                <text x="120" y="158" textAnchor="middle" fill={PALETTE.paper} fontSize={22} fontWeight={800}>.mp4</text>
                            </svg>
                            <div style={{ fontSize: 40, color: PALETTE.textDim }}>↓</div>
                            <div style={{
                                padding: '20px 40px', borderRadius: 16,
                                background: v.color, color: PALETTE.paper,
                                fontSize: 44, fontWeight: 800, fontFamily: 'monospace',
                                boxShadow: `0 12px 30px ${v.color}55`,
                            }}>{v.codec}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    opacity: fade(f, 80),
                    fontSize: 30, color: PALETTE.text, fontWeight: 600, marginTop: 10,
                }}>
                    箱は同じ、中身だけが違う
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 6 — 分離の意味: 中身だけ進化させられる設計
// ============================================================
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50 }}>
            <div style={{
                opacity: fade(f, 0),
                fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.2em',
            }}>
                箱を変えずに、中身だけ進化
            </div>

            <svg width={1200} height={360} viewBox="0 0 1200 360">
                {/* Year markers + mp4 boxes */}
                {[
                    { year: '2003', codec: 'H.264', color: PALETTE.amber, x: 100, delay: 10 },
                    { year: '2013', codec: 'HEVC', color: PALETTE.violet, x: 500, delay: 40 },
                    { year: '2018', codec: 'AV1', color: PALETTE.teal, x: 900, delay: 70 },
                ].map((m, i) => (
                    <g key={i} opacity={fade(f, m.delay)}>
                        {/* box */}
                        <path d={`M ${m.x} 100 L ${m.x + 90} 70 L ${m.x + 180} 100 L ${m.x + 180} 220 L ${m.x + 90} 250 L ${m.x} 220 Z`}
                            fill={PALETTE.paper} stroke={PALETTE.primary} strokeWidth={3} />
                        <path d={`M ${m.x} 100 L ${m.x + 90} 130 L ${m.x + 180} 100`}
                            fill="none" stroke={PALETTE.primary} strokeWidth={3} />
                        <text x={m.x + 90} y={170} textAnchor="middle" fontSize={18} fontWeight={800} fill={PALETTE.primary}>.mp4</text>
                        {/* codec chip */}
                        <rect x={m.x + 20} y={190} width={140} height={40} rx={8} fill={m.color} />
                        <text x={m.x + 90} y={216} textAnchor="middle" fontSize={20} fontWeight={800} fill={PALETTE.paper} fontFamily="monospace">{m.codec}</text>
                        {/* year */}
                        <text x={m.x + 90} y={300} textAnchor="middle" fontSize={24} fill={PALETTE.textDim} fontWeight={600}>{m.year}</text>
                    </g>
                ))}
                {/* arrows between */}
                <path d="M 290 160 L 490 160" stroke={PALETTE.textDim} strokeWidth={3}
                    markerEnd="url(#ah1)" opacity={fade(f, 50)} />
                <path d="M 690 160 L 890 160" stroke={PALETTE.textDim} strokeWidth={3}
                    markerEnd="url(#ah1)" opacity={fade(f, 80)} />
                <defs>
                    <marker id="ah1" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto">
                        <polygon points="0 0, 10 5, 0 10" fill={PALETTE.textDim} />
                    </marker>
                </defs>
            </svg>

            <div style={{
                opacity: fade(f, 95),
                fontSize: 28, color: PALETTE.text, fontWeight: 600,
                padding: '14px 28px', borderRadius: 14,
                background: PALETTE.paper, border: `2px solid ${PALETTE.primary}`,
            }}>
                箱は共通。コーデックだけが世代交代していく。
            </div>
        </div>
    </Stage>
);

// ============================================================
// Scene 7 — 箱の種類: 5つのコンテナが横並び
// ============================================================
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => {
    const boxes = [
        { ext: '.mp4', color: PALETTE.primary, delay: 10 },
        { ext: '.mov', color: PALETTE.violet, delay: 22 },
        { ext: '.mkv', color: PALETTE.teal, delay: 34 },
        { ext: '.webm', color: PALETTE.amber, delay: 46 },
        { ext: '.ts', color: PALETTE.accent, delay: 58 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 32, color: PALETTE.textDim, letterSpacing: '0.2em' }}>
                    代表的な箱 ── 5種類
                </div>
                <div style={{ display: 'flex', gap: 30 }}>
                    {boxes.map((b, i) => (
                        <div key={i} style={{
                            opacity: fade(f, b.delay),
                            transform: `translateY(${riseY(f, b.delay, b.delay + 18, 30)}px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                        }}>
                            <BoxIcon label={b.ext} color={b.color} w={200} h={170} />
                        </div>
                    ))}
                </div>
                <div style={{
                    opacity: fade(f, 80),
                    fontSize: 28, color: PALETTE.text, fontWeight: 600,
                }}>
                    それぞれ、用途が違う
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 8 — 用途別の対応
// ============================================================
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const mapping = [
        { ext: '.mov', use: '編集', detail: 'Apple / ProRes', color: PALETTE.violet, delay: 15 },
        { ext: '.mp4', use: '配信', detail: 'ISO 標準 / Web', color: PALETTE.primary, delay: 30 },
        { ext: '.mkv', use: '全部入り', detail: '多音声・多字幕', color: PALETTE.teal, delay: 45 },
        { ext: '.webm', use: 'オープン', detail: 'Google / RF', color: PALETTE.amber, delay: 60 },
        { ext: '.ts', use: '放送', detail: 'DVB / 地デジ', color: PALETTE.accent, delay: 75 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 1500 }}>
                {mapping.map((m, i) => (
                    <div key={i} style={{
                        opacity: fade(f, m.delay),
                        display: 'flex', alignItems: 'center', gap: 28,
                        padding: '16px 28px', borderRadius: 18,
                        background: PALETTE.paper, border: `2px solid ${m.color}`,
                        boxShadow: '0 6px 20px rgba(15,23,42,0.05)',
                    }}>
                        <div style={{
                            width: 160, fontSize: 40, fontWeight: 800, color: m.color,
                            fontFamily: 'monospace',
                        }}>{m.ext}</div>
                        <div style={{ flex: 1, fontSize: 36, fontWeight: 700, color: PALETTE.text }}>{m.use}</div>
                        <div style={{ fontSize: 24, color: PALETTE.textDim, width: 260, textAlign: 'right' }}>
                            {m.detail}
                        </div>
                    </div>
                ))}
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 9 — 棲み分けの論理: 用途別のコンテナを箱図解で強調
// ============================================================
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => {
    const groups = [
        { ext: '.mov', use: '編集', color: PALETTE.violet, delay: 10 },
        { ext: '.mp4', use: '配信', color: PALETTE.primary, delay: 28 },
        { ext: '.ts', use: '放送', color: PALETTE.accent, delay: 46 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                <div style={{ opacity: fade(f, 0), fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.2em' }}>
                    用途が違えば、箱の形も違う
                </div>

                <div style={{ display: 'flex', gap: 60 }}>
                    {groups.map((g, i) => (
                        <div key={i} style={{
                            opacity: fade(f, g.delay),
                            transform: `translateY(${riseY(f, g.delay, g.delay + 20, 30)}px)`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
                        }}>
                            <BoxIcon label={g.ext} color={g.color} w={220} h={190} />
                            <div style={{
                                padding: '12px 28px', borderRadius: 14,
                                background: g.color, color: PALETTE.paper,
                                fontSize: 32, fontWeight: 800,
                            }}>{g.use}</div>
                        </div>
                    ))}
                </div>

                <div style={{
                    opacity: fade(f, 80),
                    fontSize: 28, color: PALETTE.text, fontWeight: 600,
                    padding: '14px 24px', borderRadius: 14,
                    background: PALETTE.paper, border: `2px solid ${PALETTE.primary}`,
                }}>
                    用途の違い = 自然な多様化
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 10 — H.264 の支配
// ============================================================
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
                <div style={{
                    opacity: fade(f, 0),
                    padding: '50px 70px', borderRadius: 28,
                    background: `linear-gradient(135deg, ${PALETTE.warm}, ${PALETTE.amber})`,
                    color: PALETTE.paper,
                    fontSize: 140, fontWeight: 900, fontFamily: 'monospace',
                    letterSpacing: '-0.02em',
                    boxShadow: `0 40px 80px ${PALETTE.amber}55`,
                }}>
                    H.264
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                    {[
                        { big: '79%', label: '開発者が使用', sub: '(2024)', delay: 30 },
                        { big: '98%', label: 'ブラウザ互換', sub: '2024年', delay: 50 },
                        { big: '20+', label: '年の現役', sub: '2003〜', delay: 70 },
                    ].map((s, i) => (
                        <div key={i} style={{
                            opacity: fade(f, s.delay),
                            transform: `translateX(${interpolate(f, [s.delay, s.delay + 20], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                            display: 'flex', alignItems: 'baseline', gap: 24,
                        }}>
                            <div style={{
                                fontSize: 80, fontWeight: 800, color: PALETTE.amber, lineHeight: 1,
                                minWidth: 180,
                            }}>{s.big}</div>
                            <div>
                                <div style={{ fontSize: 30, fontWeight: 700, color: PALETTE.text }}>{s.label}</div>
                                <div style={{ fontSize: 22, color: PALETTE.textDim }}>{s.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 11 — 2010年の宣言
// ============================================================
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
            <div style={{
                opacity: fade(f, 0), transform: `scale(${scaleIn(f, 0)})`,
                width: 440, background: PALETTE.paper,
                border: `3px solid ${PALETTE.ink}`, borderRadius: 22,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(15,23,42,0.20)',
            }}>
                <div style={{
                    padding: '18px 30px', background: PALETTE.accent, color: PALETTE.paper,
                    fontSize: 26, fontWeight: 700, letterSpacing: '0.15em',
                }}>
                    2010 AUG
                </div>
                <div style={{ padding: '40px 30px', textAlign: 'center' }}>
                    <div style={{ fontSize: 220, fontWeight: 800, color: PALETTE.text, lineHeight: 1 }}>
                        26
                    </div>
                    <div style={{ fontSize: 26, color: PALETTE.textDim, marginTop: 18 }}>Thursday</div>
                </div>
            </div>

            <div style={{
                opacity: fade(f, 30),
                maxWidth: 620,
            }}>
                <div style={{
                    padding: '12px 22px', borderRadius: 12,
                    background: PALETTE.primary, color: PALETTE.paper,
                    fontSize: 24, fontWeight: 700, letterSpacing: '0.1em',
                    display: 'inline-block', marginBottom: 18,
                }}>
                    MPEG-LA 発表
                </div>
                <div style={{
                    padding: 36, borderRadius: 20,
                    background: PALETTE.paper,
                    border: `3px solid ${PALETTE.primary}`,
                    boxShadow: '0 20px 50px rgba(79,70,229,0.15)',
                    fontSize: 42, fontWeight: 700, lineHeight: 1.5, color: PALETTE.text,
                }}>
                    インターネット上の<br />
                    <span style={{ color: PALETTE.primary }}>無料動画</span>には<br />
                    <span style={{ color: PALETTE.accent }}>特許料を請求しない</span>
                </div>
                <div style={{
                    opacity: fade(f, 70),
                    marginTop: 18, fontSize: 28, color: PALETTE.text, fontWeight: 600,
                }}>
                    → YouTube もブラウザ動画も、安心して使える
                </div>
            </div>
        </div>
    </Stage>
);

// ============================================================
// Scene 12 — HEVC の分裂
// ============================================================
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => {
    const pools = [
        { name: 'MPEG-LA', dx: -360, delay: 25 },
        { name: 'Access Advance', dx: 0, delay: 40 },
        { name: 'Velos Media', dx: 360, delay: 55 },
    ];
    return (
        <Stage>
            <div style={{ position: 'relative', width: 1400, height: 600 }}>
                <div style={{
                    position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',
                    opacity: fade(f, 0),
                    padding: '24px 48px', borderRadius: 20,
                    background: PALETTE.accent, color: PALETTE.paper,
                    fontSize: 72, fontWeight: 900, fontFamily: 'monospace',
                    boxShadow: `0 20px 60px ${PALETTE.accentGlow}`,
                }}>
                    HEVC
                </div>

                <svg style={{ position: 'absolute', inset: 0 }} width={1400} height={600}>
                    {pools.map((p, i) => {
                        const op = fade(f, p.delay);
                        return (
                            <g key={i} opacity={op}>
                                <path d={`M 700 150 L ${700 + p.dx} 330`}
                                    fill="none" stroke={PALETTE.accent} strokeWidth={3}
                                    strokeDasharray="8 6" />
                            </g>
                        );
                    })}
                </svg>

                <div style={{
                    position: 'absolute', top: 340, left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: 40,
                }}>
                    {pools.map((p, i) => (
                        <div key={i} style={{
                            opacity: fade(f, p.delay + 4),
                            transform: `translateY(${riseY(f, p.delay + 4, p.delay + 22, 20)}px)`,
                            padding: '20px 30px', borderRadius: 14,
                            background: PALETTE.paper, border: `3px solid ${PALETTE.accent}`,
                            fontSize: 26, fontWeight: 700, color: PALETTE.accent,
                            minWidth: 260, textAlign: 'center',
                        }}>{p.name}</div>
                    ))}
                </div>

                <div style={{
                    position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                    opacity: fade(f, 80),
                    padding: '16px 28px', borderRadius: 14,
                    background: PALETTE.ink, color: PALETTE.paper,
                    fontSize: 26, fontWeight: 600,
                    boxShadow: '0 10px 30px rgba(15,23,42,0.25)',
                    whiteSpace: 'nowrap',
                }}>
                    <span style={{ color: PALETTE.warm, fontWeight: 900 }}>約2/3</span> の関連特許は
                    <span style={{ color: PALETTE.warm }}> どのプールにも属さない</span>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 13 — 42日の反撃
// ============================================================
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    const companies = ['Google', 'Netflix', 'Amazon', 'Microsoft', 'Mozilla', 'Cisco', 'Intel'];
    const lineLen = interpolate(f, [20, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 50, alignItems: 'center' }}>
                <svg width={1400} height={180} viewBox="0 0 1400 180">
                    <line x1={100} y1={90} x2={1300} y2={90}
                        stroke={PALETTE.line} strokeWidth={4} />
                    <line x1={100} y1={90} x2={100 + 1200 * lineLen} y2={90}
                        stroke={PALETTE.accent} strokeWidth={6} />
                    <circle cx={100} cy={90} r={14} fill={PALETTE.accent} opacity={fade(f, 0)} />
                    <text x={100} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={PALETTE.text}
                        opacity={fade(f, 5)}>2015/7/21</text>
                    <text x={100} y={140} textAnchor="middle" fontSize={18} fill={PALETTE.textDim}
                        opacity={fade(f, 5)}>Access Advance 料率発表</text>
                    <text x={700} y={65} textAnchor="middle" fontSize={46} fontWeight={900} fill={PALETTE.accent}
                        opacity={fade(f, 45)}>42日</text>
                    <circle cx={1300} cy={90} r={18} fill={PALETTE.teal} opacity={fade(f, 75)} />
                    <text x={1300} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={PALETTE.text}
                        opacity={fade(f, 75)}>2015/9/1</text>
                    <text x={1300} y={140} textAnchor="middle" fontSize={18} fill={PALETTE.teal}
                        opacity={fade(f, 75)} fontWeight={700}>AOMedia 結成</text>
                </svg>

                <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {companies.map((c, i) => (
                        <div key={i} style={{
                            opacity: fade(f, 95 + i * 6),
                            transform: `scale(${scaleIn(f, 95 + i * 6)})`,
                            padding: '16px 28px', borderRadius: 14,
                            background: PALETTE.paper,
                            border: `3px solid ${PALETTE.teal}`,
                            fontSize: 28, fontWeight: 700, color: PALETTE.text,
                            boxShadow: '0 8px 20px rgba(13,148,136,0.15)',
                        }}>{c}</div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 14 — 死産した VVC: 墓石
// ============================================================
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
            <div style={{ opacity: fade(f, 0), transform: `scale(${scaleIn(f, 0, 30)})` }}>
                <svg width={440} height={520} viewBox="0 0 440 520">
                    <ellipse cx={220} cy={490} rx={200} ry={20} fill={PALETTE.line} />
                    <path d="M80 200 Q80 80, 220 80 Q360 80, 360 200 L360 480 L80 480 Z"
                        fill={PALETTE.paperDim} stroke={PALETTE.ink} strokeWidth={4} />
                    <path d="M100 210 Q100 100, 220 100 Q340 100, 340 210 L340 460 L100 460 Z"
                        fill="none" stroke={PALETTE.line} strokeWidth={2} />
                    <text x={220} y={190} textAnchor="middle" fontSize={36} fontWeight={900}
                        fill={PALETTE.ink} letterSpacing={6}>R.I.P.</text>
                    <text x={220} y={290} textAnchor="middle" fontSize={72} fontWeight={900}
                        fill={PALETTE.ink} fontFamily="monospace">VVC</text>
                    <text x={220} y={340} textAnchor="middle" fontSize={28} fill={PALETTE.textDim}>(H.266)</text>
                    <text x={220} y={410} textAnchor="middle" fontSize={22} fill={PALETTE.textDim}>2020 — 2020</text>
                    <text x={220} y={450} textAnchor="middle" fontSize={22} fill={PALETTE.accent}
                        fontWeight={700}>dead on arrival</text>
                </svg>
            </div>

            <div style={{ maxWidth: 580, display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div style={{
                    opacity: fade(f, 30),
                    padding: '14px 24px', borderRadius: 14,
                    background: PALETTE.amber, color: PALETTE.paper,
                    fontSize: 28, fontWeight: 800, letterSpacing: '0.1em',
                    display: 'inline-block', alignSelf: 'flex-start',
                }}>性能は H.264 の 4倍</div>
                <div style={{
                    opacity: fade(f, 55),
                    fontSize: 44, fontWeight: 700, lineHeight: 1.5, color: PALETTE.text,
                }}>
                    でも、ブラウザ対応<br />
                    <span style={{ color: PALETTE.accent, fontSize: 80 }}>事実上ゼロ</span>
                </div>
                <div style={{
                    opacity: fade(f, 85),
                    fontSize: 26, color: PALETTE.textDim, lineHeight: 1.6,
                }}>
                    HEVC の悲劇を業界全員が<br />
                    覚えているから、同じ轍を踏みたくない。
                </div>
            </div>
        </div>
    </Stage>
);

// ============================================================
// Scene 15 — 性能と普及の逆転: グラフ
// ============================================================
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => {
    const codecs = [
        { name: 'H.264', perf: 1.0, adopt: 0.98, color: PALETTE.amber, delay: 10 },
        { name: 'HEVC', perf: 2.0, adopt: 0.40, color: PALETTE.violet, delay: 35 },
        { name: 'AV1', perf: 2.2, adopt: 0.15, color: PALETTE.teal, delay: 55 },
        { name: 'VVC', perf: 4.0, adopt: 0.01, color: PALETTE.accent, delay: 75 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
                <div style={{
                    opacity: fade(f, 0),
                    fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.15em',
                }}>
                    性能の高さ と 普及率 が噛み合わない
                </div>

                <svg width={1200} height={460} viewBox="0 0 1200 460">
                    {/* Y axis labels */}
                    <text x={50} y={40} fontSize={20} fill={PALETTE.textDim}>性能倍率</text>
                    <text x={50} y={440} fontSize={20} fill={PALETTE.textDim}>普及率</text>
                    {/* baseline */}
                    <line x1={140} y1={240} x2={1160} y2={240} stroke={PALETTE.line} strokeWidth={2} />
                    {codecs.map((c, i) => {
                        const x = 240 + i * 240;
                        const perfH = interpolate(f, [c.delay, c.delay + 20], [0, c.perf * 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        const adoptH = interpolate(f, [c.delay + 5, c.delay + 25], [0, c.adopt * 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        return (
                            <g key={i} opacity={fade(f, c.delay)}>
                                {/* perf bar upward */}
                                <rect x={x - 60} y={240 - perfH} width={120} height={perfH}
                                    fill={c.color} opacity={0.85} />
                                <text x={x} y={230 - perfH} textAnchor="middle" fontSize={20} fontWeight={700} fill={c.color}>
                                    ×{c.perf}
                                </text>
                                {/* adopt bar downward */}
                                <rect x={x - 60} y={240} width={120} height={adoptH}
                                    fill={c.color} opacity={0.4} />
                                <text x={x} y={260 + adoptH} textAnchor="middle" fontSize={18} fill={PALETTE.textDim}>
                                    {Math.round(c.adopt * 100)}%
                                </text>
                                {/* label */}
                                <text x={x} y={280} textAnchor="middle" fontSize={22} fontWeight={800} fill={PALETTE.text}
                                    fontFamily="monospace">{c.name}</text>
                            </g>
                        );
                    })}
                </svg>

                <div style={{
                    opacity: fade(f, 100),
                    fontSize: 26, color: PALETTE.text, fontWeight: 600,
                }}>
                    新しいほど性能は高いのに、普及は逆に低い
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 16 — 4つの条件
// ============================================================
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => {
    const conditions = [
        { name: '性能', icon: '⚡', desc: '圧縮効率・画質', color: PALETTE.warm, delay: 10 },
        { name: 'ライセンス', icon: '§', desc: '特許の透明性', color: PALETTE.accent, delay: 30 },
        { name: 'ハードウェア', icon: '▣', desc: '対応チップ普及', color: PALETTE.violet, delay: 50 },
        { name: 'エコシステム', icon: '◉', desc: 'ブラウザ・配信基盤', color: PALETTE.teal, delay: 70 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
                <div style={{
                    opacity: fade(f, 0),
                    fontSize: 34, fontWeight: 700, color: PALETTE.text,
                }}>
                    勝つには、<span style={{ color: PALETTE.primary, fontSize: 56 }}>4つ</span> がそろう必要がある
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                    {conditions.map((c, i) => (
                        <div key={i} style={{
                            opacity: fade(f, c.delay),
                            transform: `translateY(${riseY(f, c.delay, c.delay + 20, 24)}px)`,
                            width: 400, padding: '26px 30px', borderRadius: 18,
                            background: PALETTE.paper, border: `3px solid ${c.color}`,
                            display: 'flex', alignItems: 'center', gap: 22,
                            boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
                        }}>
                            <div style={{
                                width: 70, height: 70, borderRadius: 18,
                                background: c.color, color: PALETTE.paper,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 36, fontWeight: 900,
                            }}>{c.icon}</div>
                            <div>
                                <div style={{ fontSize: 32, fontWeight: 800, color: c.color }}>{c.name}</div>
                                <div style={{ fontSize: 18, color: PALETTE.textDim }}>{c.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    opacity: fade(f, 100),
                    fontSize: 24, color: PALETTE.textDim, fontWeight: 600,
                }}>
                    1つでも欠けると、普及は止まる
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 17 — 性能以外の代償: AV1 エンコード速度バー
// ============================================================
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => {
    const bars = [
        { name: 'H.264', mult: 1, color: PALETTE.amber, delay: 15 },
        { name: 'HEVC', mult: 2, color: PALETTE.violet, delay: 30 },
        { name: 'AV1', mult: 15, color: PALETTE.teal, delay: 50 },
    ];
    const maxMult = 20;
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36, alignItems: 'center', width: 1400 }}>
                <div style={{
                    opacity: fade(f, 0),
                    fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.15em',
                }}>
                    AV1 は性能も良い。でもエンコードが…
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
                    {bars.map((b, i) => {
                        const w = interpolate(f, [b.delay, b.delay + 30], [0, (b.mult / maxMult) * 1200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        return (
                            <div key={i} style={{
                                opacity: fade(f, b.delay),
                                display: 'flex', alignItems: 'center', gap: 22,
                            }}>
                                <div style={{
                                    width: 160, fontSize: 32, fontWeight: 800, color: b.color,
                                    fontFamily: 'monospace', textAlign: 'right',
                                }}>{b.name}</div>
                                <div style={{ position: 'relative', flex: 1, height: 60 }}>
                                    <div style={{
                                        position: 'absolute', left: 0, top: 0,
                                        width: w, height: 60, borderRadius: 8,
                                        background: `linear-gradient(90deg, ${b.color} 0%, ${b.color}cc 100%)`,
                                    }} />
                                    <div style={{
                                        position: 'absolute', left: w + 16, top: 12,
                                        fontSize: 28, fontWeight: 800, color: b.color,
                                        whiteSpace: 'nowrap',
                                    }}>
                                        ×{b.mult === 1 ? '1' : b.mult === 2 ? '2' : '10〜20'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    opacity: fade(f, 90),
                    marginTop: 10, padding: '18px 30px', borderRadius: 16,
                    background: PALETTE.paper, border: `2px solid ${PALETTE.accent}`,
                    fontSize: 26, color: PALETTE.text, fontWeight: 600, textAlign: 'center',
                    maxWidth: 900,
                }}>
                    ライブ配信・ビデオ会議には、まだAV1は使えない
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 18 — 学習された警戒
// ============================================================
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
            {/* HEVC burn mark */}
            <div style={{
                opacity: fade(f, 0),
                width: 380, padding: 36, borderRadius: 22,
                background: PALETTE.paper, border: `3px solid ${PALETTE.accent}`,
                display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center',
                boxShadow: '0 20px 50px rgba(220,38,38,0.12)',
            }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: PALETTE.accent, fontFamily: 'monospace' }}>
                    HEVC
                </div>
                <div style={{
                    padding: '8px 16px', borderRadius: 8,
                    background: PALETTE.accent, color: PALETTE.paper,
                    fontSize: 22, fontWeight: 700,
                }}>特許不透明で火傷</div>
                <div style={{ fontSize: 60 }}>🔥</div>
                <div style={{ fontSize: 20, color: PALETTE.textDim, textAlign: 'center' }}>
                    業界全員が痛い目を見た
                </div>
            </div>

            {/* Arrow */}
            <div style={{
                opacity: fade(f, 30),
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
                <div style={{ fontSize: 26, color: PALETTE.text, fontWeight: 700 }}>学習</div>
                <div style={{ fontSize: 64, color: PALETTE.text }}>→</div>
                <div style={{ fontSize: 22, color: PALETTE.textDim }}>警戒</div>
            </div>

            {/* VVC avoided */}
            <div style={{
                opacity: fade(f, 60),
                width: 380, padding: 36, borderRadius: 22,
                background: PALETTE.paperDim, border: `3px dashed ${PALETTE.ink}`,
                display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center',
            }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: PALETTE.ink, fontFamily: 'monospace' }}>
                    VVC
                </div>
                <div style={{
                    padding: '8px 16px', borderRadius: 8,
                    background: PALETTE.ink, color: PALETTE.paper,
                    fontSize: 22, fontWeight: 700,
                }}>誰も触らない</div>
                <div style={{ fontSize: 60 }}>🛑</div>
                <div style={{ fontSize: 20, color: PALETTE.textDim, textAlign: 'center' }}>
                    性能最強でも回避される
                </div>
            </div>
        </div>

        <div style={{
            position: 'absolute', bottom: 270, left: '50%', transform: 'translateX(-50%)',
            opacity: fade(f, 95),
            fontSize: 28, fontWeight: 700, color: PALETTE.text,
            padding: '14px 30px', borderRadius: 14,
            background: PALETTE.paper, border: `2px solid ${PALETTE.primary}`,
            textAlign: 'center', maxWidth: 900,
        }}>
            前の技術の失敗が、次の技術の運命まで決める
        </div>
    </Stage>
);

// ============================================================
// Scene 19 — デコードチップ
// ============================================================
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => {
    const chips = [
        { x: 90, y: 110, w: 100, h: 70, label: 'CPU', big: false },
        { x: 210, y: 110, w: 80, h: 60, label: 'RAM', big: false },
        { x: 90, y: 200, w: 200, h: 110, label: 'Video Decoder', big: true },
        { x: 90, y: 330, w: 90, h: 60, label: 'ISP', big: false },
        { x: 200, y: 330, w: 90, h: 60, label: 'GPU', big: false },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
                <div style={{ opacity: fade(f, 0) }}>
                    <svg width={380} height={540} viewBox="0 0 380 540">
                        <rect x={30} y={20} width={320} height={500} rx={44}
                            fill={PALETTE.ink} stroke={PALETTE.line} strokeWidth={2} />
                        <rect x={50} y={50} width={280} height={440} rx={16}
                            fill={PALETTE.paperDim} />
                        <rect x={70} y={90} width={240} height={360} rx={8}
                            fill="none" stroke={PALETTE.textDim} strokeWidth={2} strokeDasharray="6 4" opacity={fade(f, 20)} />
                        {chips.map((c, i) => {
                            const cx = c.x + c.w / 2;
                            const cy = c.y + c.h / 2;
                            return (
                                <g key={i} opacity={fade(f, 30 + i * 5)}>
                                    <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={6}
                                        fill={c.big ? PALETTE.accent : PALETTE.primary}
                                        opacity={c.big ? 1 : 0.45} />
                                    <text x={cx} y={cy + 6}
                                        textAnchor="middle" fontSize={c.big ? 20 : 14}
                                        fontWeight={700}
                                        fill={PALETTE.paper}>{c.label}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                <div style={{ maxWidth: 580, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ opacity: fade(f, 40), fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.15em' }}>
                        スマホの内部
                    </div>
                    <div style={{
                        opacity: fade(f, 60),
                        fontSize: 48, fontWeight: 700, lineHeight: 1.4, color: PALETTE.text,
                    }}>
                        動画デコード<br />
                        <span style={{ color: PALETTE.accent }}>専用チップ</span> が要る
                    </div>
                    <div style={{
                        opacity: fade(f, 90),
                        fontSize: 26, color: PALETTE.textDim, lineHeight: 1.6,
                    }}>
                        毎秒30枚、絶え間なく続くから<br />
                        CPU処理では熱くて電池が持たない。
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 20 — 対応率の差
// ============================================================
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => {
    const donuts = [
        { codec: 'H.264', pct: 99, color: PALETTE.amber, delay: 10 },
        { codec: 'HEVC', pct: 95, color: PALETTE.violet, delay: 35 },
        { codec: 'AV1', pct: 9.76, color: PALETTE.teal, delay: 60 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
                <div style={{
                    opacity: fade(f, 0),
                    fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.15em',
                }}>
                    スマホのハード対応率 (2024)
                </div>

                <div style={{ display: 'flex', gap: 80 }}>
                    {donuts.map((d, i) => {
                        const r = 100, circ = 2 * Math.PI * r;
                        const progress = interpolate(f, [d.delay, d.delay + 40], [0, d.pct / 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        return (
                            <div key={i} style={{
                                opacity: fade(f, d.delay),
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
                            }}>
                                <svg width={260} height={260} viewBox="0 0 260 260">
                                    <circle cx={130} cy={130} r={r} fill="none"
                                        stroke={PALETTE.paperDim} strokeWidth={24} />
                                    <circle cx={130} cy={130} r={r} fill="none"
                                        stroke={d.color} strokeWidth={24}
                                        strokeDasharray={`${circ * progress} ${circ}`}
                                        transform="rotate(-90 130 130)"
                                        strokeLinecap="round" />
                                    <text x={130} y={126} textAnchor="middle" fontSize={56} fontWeight={800} fill={d.color}>
                                        {d.pct}%
                                    </text>
                                    <text x={130} y={164} textAnchor="middle" fontSize={20} fill={PALETTE.textDim}>
                                        対応
                                    </text>
                                </svg>
                                <div style={{
                                    padding: '10px 24px', borderRadius: 12,
                                    background: d.color, color: PALETTE.paper,
                                    fontSize: 30, fontWeight: 800, fontFamily: 'monospace',
                                }}>{d.codec}</div>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    opacity: fade(f, 100),
                    fontSize: 26, color: PALETTE.textDim, marginTop: 10,
                }}>
                    iPhone の AV1 対応は 15 Pro 以降 (2023〜)
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 21 — 5年から10年: ハード普及のタイムライン
// ============================================================
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => {
    const lineProg = interpolate(f, [15, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const milestones = [
        { x: 100, y: 160, label: '仕様策定', year: '0年目', color: PALETTE.primary, delay: 10 },
        { x: 400, y: 160, label: '初対応チップ', year: '2〜3年', color: PALETTE.warm, delay: 35 },
        { x: 750, y: 160, label: '主要端末対応', year: '5年', color: PALETTE.violet, delay: 60 },
        { x: 1100, y: 160, label: '全体普及', year: '10年', color: PALETTE.teal, delay: 85 },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
                <div style={{
                    opacity: fade(f, 0),
                    fontSize: 30, color: PALETTE.textDim, letterSpacing: '0.15em',
                }}>
                    新コーデックが世界に行き渡るまで
                </div>

                <svg width={1200} height={360} viewBox="0 0 1200 360">
                    <line x1={100} y1={160} x2={1100} y2={160}
                        stroke={PALETTE.line} strokeWidth={4} />
                    <line x1={100} y1={160} x2={100 + 1000 * lineProg} y2={160}
                        stroke={PALETTE.primary} strokeWidth={6} />
                    {milestones.map((m, i) => (
                        <g key={i} opacity={fade(f, m.delay)}>
                            <circle cx={m.x} cy={m.y} r={16} fill={m.color} />
                            <text x={m.x} y={m.y - 40} textAnchor="middle" fontSize={28} fontWeight={800} fill={m.color}>
                                {m.year}
                            </text>
                            <text x={m.x} y={m.y + 55} textAnchor="middle" fontSize={22} fill={PALETTE.text} fontWeight={600}>
                                {m.label}
                            </text>
                        </g>
                    ))}
                </svg>

                <div style={{
                    opacity: fade(f, 105),
                    fontSize: 30, fontWeight: 700, color: PALETTE.text, textAlign: 'center',
                    padding: '18px 32px', borderRadius: 14,
                    background: PALETTE.paper, border: `2px solid ${PALETTE.primary}`,
                }}>
                    ソフトは一晩で更新できる。動画は、地球の端までチップを待つ世界。
                </div>
            </div>
        </Stage>
    );
};

// ============================================================
// Scene 22 — 答え合わせ: 2階建ての家
// ============================================================
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
            <div style={{
                opacity: fade(f, 0),
                fontSize: 34, color: PALETTE.textDim, letterSpacing: '0.15em',
            }}>
                答え ── 2階建てで考える
            </div>

            <svg width={620} height={520} viewBox="0 0 620 520">
                <path d="M40 130 L310 20 L580 130 Z"
                    fill={PALETTE.primaryDeep} opacity={fade(f, 10)} />
                <rect x={80} y={130} width={460} height={170} fill={PALETTE.paper}
                    stroke={PALETTE.primary} strokeWidth={4} opacity={fade(f, 20)} />
                <text x={310} y={205} textAnchor="middle" fontSize={34} fontWeight={800} fill={PALETTE.primary}
                    opacity={fade(f, 30)}>コンテナ (箱)</text>
                <text x={310} y={250} textAnchor="middle" fontSize={22} fill={PALETTE.textDim}
                    opacity={fade(f, 40)}>用途の違いで棲み分け</text>
                <line x1={80} y1={300} x2={540} y2={300} stroke={PALETTE.ink} strokeWidth={4}
                    opacity={fade(f, 50)} />
                <rect x={80} y={300} width={460} height={170} fill={PALETTE.paper}
                    stroke={PALETTE.accent} strokeWidth={4} opacity={fade(f, 50)} />
                <text x={310} y={375} textAnchor="middle" fontSize={34} fontWeight={800} fill={PALETTE.accent}
                    opacity={fade(f, 60)}>コーデック (圧縮)</text>
                <text x={310} y={420} textAnchor="middle" fontSize={22} fill={PALETTE.textDim}
                    opacity={fade(f, 70)}>特許・企業の思惑が絡む</text>
                <rect x={0} y={470} width={620} height={10} fill={PALETTE.textDim} opacity={0.4} />
            </svg>
        </div>
    </Stage>
);

// ============================================================
// Scene 23 — 2つの理由
// ============================================================
const Scene23: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: 1400 }}>
            <div style={{
                opacity: fade(f, 0),
                display: 'flex', alignItems: 'center', gap: 30,
                padding: '28px 36px', borderRadius: 22,
                background: PALETTE.paper, border: `3px solid ${PALETTE.primary}`,
                boxShadow: '0 10px 30px rgba(79,70,229,0.10)',
            }}>
                <div style={{
                    padding: '14px 22px', borderRadius: 12,
                    background: PALETTE.primary, color: PALETTE.paper,
                    fontSize: 24, fontWeight: 800, letterSpacing: '0.15em', minWidth: 80, textAlign: 'center',
                }}>上</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: PALETTE.text, flex: 1 }}>
                    箱の多様性 = <span style={{ color: PALETTE.primary }}>技術的な必然</span>
                </div>
                <div style={{ fontSize: 22, color: PALETTE.textDim, width: 280, textAlign: 'right' }}>
                    編集・配信・放送・オープン
                </div>
            </div>

            <div style={{
                opacity: fade(f, 40),
                display: 'flex', alignItems: 'center', gap: 30,
                padding: '28px 36px', borderRadius: 22,
                background: PALETTE.paper, border: `3px solid ${PALETTE.accent}`,
                boxShadow: '0 10px 30px rgba(220,38,38,0.10)',
            }}>
                <div style={{
                    padding: '14px 22px', borderRadius: 12,
                    background: PALETTE.accent, color: PALETTE.paper,
                    fontSize: 24, fontWeight: 800, letterSpacing: '0.15em', minWidth: 80, textAlign: 'center',
                }}>下</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: PALETTE.text, flex: 1 }}>
                    コーデックの多様性 = <span style={{ color: PALETTE.accent }}>歴史的な偶然</span>
                </div>
                <div style={{ fontSize: 22, color: PALETTE.textDim, width: 280, textAlign: 'right' }}>
                    特許・企業・業界の警戒
                </div>
            </div>

            <div style={{
                opacity: fade(f, 80),
                padding: '22px 30px', borderRadius: 18,
                background: PALETTE.ink, color: PALETTE.paper,
                fontSize: 28, fontWeight: 600, lineHeight: 1.5, textAlign: 'center',
                marginTop: 6,
            }}>
                必然と偶然が、2階の上と下に棲み分けている
            </div>
        </div>
    </Stage>
);

// ============================================================
// Scene 24 — フォルダを開くとき: 歴史が詰まったフォルダ
// ============================================================
const Scene24: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
            <div style={{ opacity: fade(f, 0), transform: `scale(${scaleIn(f, 0)})` }}>
                <svg width={440} height={320} viewBox="0 0 440 320">
                    <path d="M30 60 L170 60 L210 100 L410 100 L410 290 L30 290 Z"
                        fill={PALETTE.primaryDeep} />
                    <path d="M50 120 L390 120 L420 290 L20 290 Z"
                        fill={PALETTE.primary} />
                    {['.mp4', '.mkv'].map((ext, i) => (
                        <g key={i} opacity={fade(f, 20 + i * 10)}>
                            <rect x={120 + i * 110} y={90 + i * 4} width={90} height={110} rx={6}
                                fill={PALETTE.paper} stroke={PALETTE.ink} strokeWidth={2}
                                transform={`rotate(${i === 0 ? -6 : 4} ${165 + i * 110} 145)`} />
                            <text x={165 + i * 110} y={165} textAnchor="middle" fontSize={20} fontWeight={800}
                                fill={PALETTE.primaryDeep}
                                transform={`rotate(${i === 0 ? -6 : 4} ${165 + i * 110} 145)`}>{ext}</text>
                        </g>
                    ))}
                </svg>
            </div>

            <div style={{
                opacity: fade(f, 50),
                fontSize: 40, fontWeight: 700, color: PALETTE.text,
                textAlign: 'center', lineHeight: 1.5,
            }}>
                この小さなフォルダの中に<br />
                <span style={{ color: PALETTE.primary }}>30年分の政治劇</span>が詰まっている
            </div>

            <div style={{
                opacity: fade(f, 90),
                fontSize: 24, color: PALETTE.textDim, letterSpacing: '0.15em',
            }}>
                30年分、お疲れさまなのだ
            </div>
        </div>
    </Stage>
);

// ============================================================
// Export
// ============================================================
export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5,
    Scene6, Scene7, Scene8, Scene9, Scene10, Scene11,
    Scene12, Scene13, Scene14, Scene15, Scene16, Scene17,
    Scene18, Scene19, Scene20, Scene21, Scene22, Scene23,
    Scene24,
];

export const SCENE_TITLES: string[] = [
    '拡張子の多さ',
    '2階建ての予告',
    '今日の見取り図',
    'プロパティ画面',
    '箱と中身',
    '同じ箱で中身違い',
    '分離の意味',
    '箱の種類',
    '用途別の対応',
    '棲み分けの論理',
    'H.264の支配',
    '2010年の宣言',
    'HEVCの分裂',
    '42日の反撃',
    '死産したVVC',
    '性能と普及の逆転',
    '4つの条件',
    '性能以外の代償',
    '学習された警戒',
    'デコードチップ',
    '対応率の差',
    '5年から10年',
    '答え合わせ',
    '2つの理由',
    'フォルダを開くとき',
];
