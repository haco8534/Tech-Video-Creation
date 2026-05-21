import React from 'react';
import { interpolate, Img, staticFile } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

/* =================================================================
 * Palette
 * ================================================================= */
const P = {
    ...BASE_COLORS,
    primary: '#2563EB',
    primaryDeep: '#1E3A8A',
    primaryGlow: 'rgba(37, 99, 235, 0.22)',
    skyTint: 'rgba(37, 99, 235, 0.08)',
    accent: '#F59E0B',
    accentDeep: '#B45309',
    warm: '#EF4444',
    amber: '#FBBF24',
    emerald: '#10B981',
    ink: '#0F172A',
    mist: '#CBD5E1',
    cloud: '#E2E8F0',
    gridLine: 'rgba(30, 58, 138, 0.10)',
};

/* =================================================================
 * Safe zones
 *   - Characters occupy x=10..360 (left) and x=1560..1910 (right)
 *   - Subtitle occupies y=880..1080
 *   - Header occupies y=40..110 (top-left)
 *   - Figures must live within the CENTER LANE (x 370..1550) for y > 400
 *   - Upper band (y < 370) can use full width
 * ================================================================= */
const SAFE_W = 1180;   // 370..1550

const fade = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const riseY = (f: number, from: number, to = from + 18, dist = 16) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const grow = (f: number, from: number, to = from + 22) =>
    interpolate(f, [from, to], [0.88, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

/* Stage – enforces safe center lane (figure only, header/chars/subtitle handled by layout). */
const Stage: React.FC<React.PropsWithChildren<{ bg?: string; full?: boolean }>> = ({ children, bg, full = false }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: full ? 80 : 370, paddingRight: full ? 80 : 370,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: bg,
    }}>{children}</div>
);

const GridBg: React.FC<{ opacity?: number }> = ({ opacity = 0.55 }) => (
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity }} aria-hidden>
        <defs>
            <pattern id="g-grid" width={80} height={80} patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke={P.gridLine} strokeWidth={1} />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g-grid)" />
    </svg>
);

const SceneTitle: React.FC<{ text: React.ReactNode; f: number; sub?: string }> = ({ text, f, sub }) => (
    <div style={{
        position: 'absolute', top: 30, left: 370, right: 370,
        textAlign: 'center', opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)`,
    }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: P.primaryDeep, letterSpacing: 1.5 }}>{text}</div>
        {sub && <div style={{ fontSize: 24, color: P.textDim, marginTop: 6 }}>{sub}</div>}
    </div>
);

/* ---------- SVG primitives ---------- */
const CloudShape: React.FC<{ w?: number; fill?: string; stroke?: string; strokeW?: number }> = ({
    w = 360, fill = P.primaryGlow, stroke = P.primary, strokeW = 4 }) => (
    <svg width={w} height={w * 0.6} viewBox="0 0 360 216" aria-hidden>
        <path d="M 80 150 Q 80 92 140 90 Q 158 48 220 52 Q 280 42 296 92 Q 340 98 336 150 Q 332 188 288 188 L 128 188 Q 80 188 80 150 Z"
              fill={fill} stroke={stroke} strokeWidth={strokeW} strokeLinejoin="round" />
    </svg>
);

const ServerRack: React.FC<{ units?: number; w?: number; blink?: boolean; f?: number }> = ({
    units = 5, w = 140, blink = false, f = 0 }) => {
    const h = 40 + units * 32 + 20;
    return (
        <svg width={w} height={h} viewBox={`0 0 140 ${h}`} aria-hidden>
            <rect x="6" y="6" width="128" height={h - 12} rx="8" fill={P.ink} />
            <rect x="12" y="14" width="116" height="22" fill={P.primaryDeep} />
            <circle cx="22" cy="25" r="4" fill={P.emerald} opacity={blink && ((f / 6) % 2 < 1) ? 1 : 0.65} />
            <circle cx="34" cy="25" r="4" fill={P.accent} />
            {Array.from({ length: units }).map((_, i) => (
                <g key={i}>
                    <rect x="12" y={44 + i * 32} width="116" height="24" fill={P.primaryDeep + 'aa'} />
                    <rect x="18" y={50 + i * 32} width="70" height="4" fill={P.mist} />
                    <circle cx="118" cy={56 + i * 32} r="3" fill={(blink && (f + i * 5) % 20 < 6) ? P.warm : P.emerald} />
                </g>
            ))}
        </svg>
    );
};

const DataCenterBuilding: React.FC<{ w?: number }> = ({ w = 240 }) => (
    <svg width={w} height={w * 0.7} viewBox="0 0 240 168" aria-hidden>
        <rect x="8" y="62" width="224" height="96" fill={P.mist} />
        <rect x="8" y="62" width="224" height="16" fill={P.textDim} />
        <rect x="40" y="50" width="40" height="14" fill={P.textDim} />
        <rect x="160" y="50" width="40" height="14" fill={P.textDim} />
        {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={20 + i * 26} y={92} width="18" height="24" fill={P.primaryDeep} />
        ))}
        <rect x="20" y="124" width="200" height="4" fill={P.textDim} />
        <rect x="80" y="138" width="80" height="18" fill={P.ink} />
        <circle cx="54" cy="50" r="6" fill={P.cloud} stroke={P.textDim} strokeWidth="2" />
        <circle cx="74" cy="50" r="6" fill={P.cloud} stroke={P.textDim} strokeWidth="2" />
        <circle cx="180" cy="50" r="6" fill={P.cloud} stroke={P.textDim} strokeWidth="2" />
    </svg>
);

const Brand: React.FC<{ name: string; size?: number; box?: boolean }> = ({ name, size = 80, box = false }) => (
    <div style={{
        width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: box ? P.surface : 'transparent',
        borderRadius: box ? 14 : 0, boxShadow: box ? '0 6px 16px rgba(15,23,42,0.08)' : 'none',
        border: box ? `2px solid ${P.panelBorder}` : 'none',
    }}>
        <Img src={staticFile(`brand-icons/${name}.svg`)} style={{ width: size * 0.72, height: size * 0.72, objectFit: 'contain' }} />
    </div>
);

/* =================================================================
 * Scene 0 — 今日の問い（全て中央・単体大）
 * ================================================================= */
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ position: 'relative', width: SAFE_W, height: 620, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ opacity: fade(f, 0, 24), transform: `scale(${grow(f, 0, 40)})` }}>
                <svg width={820} height={440} viewBox="0 0 960 520" aria-hidden>
                    <defs>
                        <radialGradient id="cloudGrad0" cx="50%" cy="45%" r="55%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="65%" stopColor="#E0ECFE" />
                            <stop offset="100%" stopColor="#BFD6FB" />
                        </radialGradient>
                    </defs>
                    <path d="M 200 360 Q 200 230 330 226 Q 360 140 470 146 Q 590 120 630 230 Q 760 240 750 360 Q 740 430 640 436 L 310 436 Q 200 432 200 360 Z"
                          fill="url(#cloudGrad0)" stroke={P.primary} strokeWidth="5" strokeLinejoin="round" />
                    <text x={480} y={340} textAnchor="middle" fontSize={220} fontWeight={900} fill={P.primaryDeep}
                          opacity={fade(f, 26, 48)}>?</text>
                </svg>
            </div>
            <div style={{ textAlign: 'center', opacity: fade(f, 50), transform: `translateY(${riseY(f, 50)}px)` }}>
                <div style={{ fontSize: 86, fontWeight: 900, color: P.ink, lineHeight: 1.1 }}>
                    「<span style={{ color: P.primary }}>クラウド</span>」って、
                </div>
                <div style={{ fontSize: 58, fontWeight: 800, color: P.textDim, marginTop: 8 }}>
                    なんなの？
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 1 — 身近なクラウド（スマホ→雲→DC を縦に積むことで中央に収める）
 * ================================================================= */
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const appList = ['gmail', 'netflix', 'spotify', 'instagram', 'openai', 'dropbox'];
    return (
        <Stage>
            <GridBg />
            <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
                {/* phone (left of center lane) */}
                <div style={{
                    position: 'absolute', left: 0, top: 50,
                    opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px) rotate(-4deg)`,
                }}>
                    <div style={{
                        width: 260, height: 480, borderRadius: 40, background: P.ink,
                        padding: 14, boxShadow: '0 20px 50px rgba(15,23,42,0.25)',
                    }}>
                        <div style={{
                            width: '100%', height: '100%', borderRadius: 26,
                            background: 'linear-gradient(145deg, #F1F5FB, #D9E6F8)',
                            position: 'relative', overflow: 'hidden', padding: 16,
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 28 }}>
                                {appList.slice(0, 6).map((a, i) => (
                                    <div key={a} style={{
                                        width: 102, height: 102, borderRadius: 22,
                                        background: P.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 4px 10px rgba(15,23,42,0.08)',
                                        opacity: fade(f, 6 + i * 4),
                                    }}>
                                        <Img src={staticFile(`brand-icons/${a}.svg`)} style={{ width: 62, height: 62, objectFit: 'contain' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* signal arcs filling the center */}
                <svg width={SAFE_W} height={620} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    {[0, 1, 2].map(i => (
                        <path key={i}
                              d={`M 290 ${220 + i * 50} Q ${SAFE_W / 2} ${140 + i * 40} ${SAFE_W - 310} ${210 + i * 40}`}
                              stroke={P.primary} strokeWidth={3} fill="none"
                              strokeDasharray="10 8" opacity={fade(f, 26 + i * 4)} />
                    ))}
                </svg>
                {/* cloud middle */}
                <div style={{
                    position: 'absolute', left: SAFE_W / 2 - 200, top: 170,
                    opacity: fade(f, 40), transform: `scale(${grow(f, 40, 58)})`,
                }}>
                    <CloudShape w={400} />
                </div>
                {/* data center building on right-center */}
                <div style={{
                    position: 'absolute', right: 0, top: 150,
                    opacity: fade(f, 55), transform: `translateY(${riseY(f, 55, 75, 18)}px)`,
                }}>
                    <DataCenterBuilding w={320} />
                    <div style={{
                        textAlign: 'center', fontSize: 22, color: P.textDim, marginTop: 10,
                        fontWeight: 700,
                    }}>世界のどこかの倉庫</div>
                </div>
                {/* caption inside the frame */}
                <div style={{
                    position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center',
                    fontSize: 32, fontWeight: 800, color: P.primaryDeep,
                    opacity: fade(f, 80),
                }}>
                    気づかずに、毎日使っている
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 2 — 60年前の予言（上半分のワイドタイムライン）
 * ================================================================= */
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const milestones = [
        { year: '1961', label: '予言', color: P.accent },
        { year: '1996', label: '語源', color: P.primary },
        { year: '2006', label: 'EC2', color: P.primary },
        { year: 'いま', label: '日常', color: P.emerald },
    ];
    return (
        <Stage full>
            <GridBg />
            <SceneTitle text={<>新しい技術？ <span style={{ color: P.accent }}>── 60年をたどる ──</span></>} f={f} />
            <div style={{ position: 'relative', width: 1760, height: 560, marginTop: 20 }}>
                <svg width={1760} height={480} viewBox="0 0 1760 480">
                    <path d="M 100 260 Q 360 120 680 200 Q 1000 280 1340 170 Q 1560 110 1680 220"
                          fill="none" stroke={P.mist} strokeWidth={8} opacity={fade(f, 12)} />
                    {milestones.map((m, i) => {
                        const xs = [180, 640, 1120, 1600];
                        const ys = [230, 156, 200, 260];
                        const start = 22 + i * 8;
                        return (
                            <g key={m.year} opacity={fade(f, start)}>
                                <circle cx={xs[i]} cy={ys[i]} r={i === 0 ? 24 : 16} fill={m.color} />
                                <circle cx={xs[i]} cy={ys[i]} r={i === 0 ? 42 : 26}
                                        fill="none" stroke={m.color} strokeOpacity={0.35} strokeWidth={3} />
                                <text x={xs[i]} y={ys[i] - 60} textAnchor="middle" fontSize={44}
                                      fontWeight={900} fill={P.ink}>{m.year}</text>
                                <text x={xs[i]} y={ys[i] + 74} textAnchor="middle" fontSize={28} fill={P.textDim}>{m.label}</text>
                            </g>
                        );
                    })}
                    <path d="M 1600 370 Q 880 440 180 370" fill="none"
                          stroke={P.accent} strokeWidth={6} strokeDasharray="14 8"
                          opacity={fade(f, 66)} />
                    <polygon points="172,363 166,373 184,376" fill={P.accent} opacity={fade(f, 72)} />
                    <text x={890} y={474} textAnchor="middle" fontSize={28} fill={P.accentDeep}
                          fontWeight={700} opacity={fade(f, 80)}>
                        時間をさかのぼる
                    </text>
                </svg>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 3 — 1961年の講演（中央に引用を大きく、MIT＆電話→PCを両サイドの内側に）
 * ================================================================= */
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
            {/* year on top-left inside safe zone */}
            <div style={{
                position: 'absolute', left: 0, top: 0,
                opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)`,
            }}>
                <div style={{ fontSize: 140, fontWeight: 900, color: P.accent, letterSpacing: '-0.03em', lineHeight: 1 }}>1961</div>
                <div style={{ fontSize: 24, color: P.textDim, fontWeight: 700, marginTop: 4 }}>MIT 創立100周年講演</div>
            </div>

            {/* big quote card, center-full */}
            <div style={{
                position: 'absolute', left: 0, right: 0, top: 220,
                background: P.surface, borderRadius: 28,
                padding: '44px 56px', border: `5px solid ${P.accent}`,
                boxShadow: '0 20px 40px rgba(245, 158, 11, 0.15)',
                opacity: fade(f, 26), transform: `translateY(${riseY(f, 26, 46, 24)}px)`,
            }}>
                <div style={{ fontSize: 42, fontWeight: 700, color: P.ink, lineHeight: 1.45, textAlign: 'center' }}>
                    「コンピューティングはいつか、<br />
                    <span style={{ color: P.primary }}>電話のような公共インフラ</span>になるだろう」
                </div>
                <div style={{ fontSize: 24, color: P.textDim, marginTop: 16, textAlign: 'right' }}>
                    — ジョン・マッカーシー
                </div>
            </div>

            {/* phone ≈ PC analogy centered at bottom */}
            <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36,
                opacity: fade(f, 56),
            }}>
                <svg width={100} height={100} viewBox="0 0 120 120">
                    <g fill={P.primaryDeep}>
                        <rect x="30" y="25" width="60" height="70" rx="10" />
                        <rect x="40" y="35" width="40" height="8" fill={P.surface} />
                        {[0, 1, 2].map(i => (
                            <React.Fragment key={i}>
                                <circle cx={50 + i * 10} cy="60" r="4" fill={P.surface} />
                                <circle cx={50 + i * 10} cy="74" r="4" fill={P.surface} />
                            </React.Fragment>
                        ))}
                    </g>
                </svg>
                <div style={{ fontSize: 52, fontWeight: 900, color: P.textDim }}>≈</div>
                <svg width={120} height={100} viewBox="0 0 140 120">
                    <rect x="20" y="20" width="100" height="70" rx="6" fill={P.primaryDeep} />
                    <rect x="26" y="26" width="88" height="52" fill={P.primary} />
                    <rect x="50" y="96" width="40" height="8" fill={P.primaryDeep} />
                    <rect x="40" y="104" width="60" height="6" fill={P.primaryDeep} />
                </svg>
                <div style={{ fontSize: 26, color: P.textDim, fontWeight: 700, maxWidth: 300, lineHeight: 1.35 }}>
                    "使った分だけ払う"<br />の発想が既にあった
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 4 — タイムシェア時代（中央メインフレーム＋周囲の端末）
 * ================================================================= */
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    const terms = [
        { x: 120, y: 80, rot: -4 }, { x: 60, y: 400, rot: 3 },
        { x: 1010, y: 60, rot: 5 }, { x: 1070, y: 390, rot: -3 },
        { x: 500, y: 10, rot: -2 },
    ];
    return (
        <Stage>
            <GridBg />
            <SceneTitle text="1960年代：時間を分けて借りる" f={f} sub="端末 × 1台の巨大コンピュータ" />
            <svg width={SAFE_W} height={560} viewBox={`0 0 ${SAFE_W} 560`} style={{ marginTop: 60 }}>
                {/* mainframe center */}
                <g opacity={fade(f, 8)}>
                    <rect x={520} y={180} width={220} height={310} rx={16} fill={P.ink} />
                    <rect x={540} y={202} width={180} height={40} fill={P.primaryDeep} />
                    <rect x={544} y={208} width={172} height={28} fill={P.ink} />
                    <text x={630} y={228} textAnchor="middle" fontSize={22} fill={P.mist} fontFamily="monospace">READY.</text>
                    {[0, 1, 2, 3, 4].map(i => (
                        <rect key={i} x={540} y={260 + i * 28} width={180} height={18} fill={P.primaryDeep} opacity={0.85} />
                    ))}
                    <circle cx={560} cy={456} r={8} fill={P.emerald} opacity={((f / 4) % 3 < 1) ? 1 : 0.3} />
                    <circle cx={590} cy={456} r={8} fill={P.amber} />
                    <circle cx={620} cy={456} r={8} fill={P.warm} />
                    <circle cx={580} cy={470} r={14} fill={P.mist} stroke={P.textDim} strokeWidth={2} />
                    <circle cx={620} cy={470} r={14} fill={P.mist} stroke={P.textDim} strokeWidth={2} />
                </g>
                <text x={630} y={555} textAnchor="middle" fontSize={28} fontWeight={800} fill={P.ink}
                      opacity={fade(f, 16)}>メインフレーム</text>

                {/* terminals & cables */}
                {terms.map((t, i) => {
                    const delay = 24 + i * 8;
                    return (
                        <g key={i} opacity={fade(f, delay)} transform={`translate(${t.x} ${t.y}) rotate(${t.rot})`}>
                            <rect x={0} y={0} width={140} height={100} rx={8} fill={P.surface}
                                  stroke={P.textDim} strokeWidth={3} />
                            <rect x={12} y={12} width={116} height={64} fill={P.ink} />
                            <text x={70} y={50} textAnchor="middle" fontSize={18} fill={P.emerald}
                                  fontFamily="monospace">user{i + 1}@</text>
                            <rect x={40} y={84} width={60} height={10} fill={P.textDim} />
                        </g>
                    );
                })}
                {terms.map((t, i) => {
                    const mx = 630, my = 340;
                    const tx = t.x + 70, ty = t.y + 50;
                    return (
                        <path key={`c${i}`}
                              d={`M ${mx} ${my} Q ${(mx + tx) / 2} ${(my + ty) / 2 + (i % 2 ? 40 : -40)} ${tx} ${ty}`}
                              stroke={P.primary} strokeWidth={3} fill="none"
                              strokeDasharray="6 4" opacity={fade(f, 36 + i * 6)} />
                    );
                })}
            </svg>
        </Stage>
    );
};

/* =================================================================
 * Scene 5 — 1996年の戦略書（中央に大きな文書、スタンプ重なり）
 * ================================================================= */
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
            <div style={{
                position: 'absolute', left: 0, top: 10,
                fontSize: 140, fontWeight: 900, color: P.ink, letterSpacing: '-0.04em', lineHeight: 1,
                opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)`,
            }}>1996</div>
            <div style={{
                position: 'absolute', left: 8, top: 170, fontSize: 26, color: P.textDim, fontWeight: 700,
                opacity: fade(f, 10),
            }}>「cloud computing」最古の記録</div>

            {/* document centered */}
            <div style={{
                position: 'absolute', left: 320, top: 40,
                width: 580, minHeight: 520, background: '#FFFDF4',
                borderRadius: 4, boxShadow: '0 20px 50px rgba(15,23,42,0.15)',
                border: `1px solid ${P.mist}`, padding: '40px 44px',
                transform: `rotate(-3deg) translateY(${riseY(f, 22, 44, 22)}px)`,
                opacity: fade(f, 22),
            }}>
                <div style={{ fontSize: 16, color: P.textDim, letterSpacing: 2, marginBottom: 10 }}>INTERNAL · COMPAQ · 1996.11.14</div>
                <div style={{
                    fontSize: 30, fontWeight: 800, color: P.ink, lineHeight: 1.35, marginBottom: 16,
                    borderBottom: `3px solid ${P.ink}`, paddingBottom: 16,
                }}>
                    Internet Solutions Division<br /><span style={{ color: P.accent }}>Strategy for Cloud Computing</span>
                </div>
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                        height: 10, background: P.cloud, marginBottom: 12,
                        width: `${80 - i * 6}%`, borderRadius: 3,
                    }} />
                ))}
                <div style={{
                    position: 'absolute', bottom: 36, right: 30,
                    width: 140, height: 140, borderRadius: '50%',
                    border: `5px solid ${P.warm}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: 'rotate(-15deg)',
                    opacity: fade(f, 52),
                }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: P.warm, textAlign: 'center', lineHeight: 1.1 }}>
                        MARKETING<br />MEMO
                    </div>
                </div>
            </div>

            {/* conclusion banner bottom */}
            <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 6,
                background: P.accent + '22', borderLeft: `10px solid ${P.accent}`,
                padding: '22px 32px', borderRadius: 10,
                opacity: fade(f, 62),
            }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: P.ink }}>
                    技術論文ではなく <span style={{ color: P.accentDeep }}>マーケティング用語として誕生</span>
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 6 — 2006年のEC2（倉庫 → AWS → API を中央に連結）
 * ================================================================= */
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <SceneTitle text="2006年：社内インフラが商品になる" f={f} sub="Amazon EC2 ベータローンチ" />
        <div style={{ position: 'relative', width: SAFE_W, height: 560, marginTop: 50 }}>
            <div style={{
                position: 'absolute', left: 0, top: 120, width: 300,
                opacity: fade(f, 12),
            }}>
                <svg width={300} height={220} viewBox="0 0 400 300" aria-hidden>
                    <rect x={20} y={100} width={360} height={180} fill={P.mist} />
                    <polygon points="20,100 200,40 380,100" fill={P.accent} />
                    {[0, 1, 2, 3].map(i => (
                        <rect key={i} x={50 + i * 80} y={180} width={60} height={100} fill={P.cloud}
                              stroke={P.textDim} strokeWidth={2} />
                    ))}
                    <text x={200} y={80} textAnchor="middle" fontSize={24} fontWeight={800} fill="#fff">Amazon 倉庫</text>
                </svg>
                <div style={{ textAlign: 'center', fontSize: 20, color: P.textDim, marginTop: 8 }}>
                    巨大な運営ノウハウ
                </div>
            </div>

            <svg width={120} height={40} style={{ position: 'absolute', left: 310, top: 220, opacity: fade(f, 24) }} viewBox="0 0 120 40">
                <path d="M 0 20 L 100 20" stroke={P.ink} strokeWidth={6} />
                <polygon points="100,10 120,20 100,30" fill={P.ink} />
            </svg>

            <div style={{
                position: 'absolute', left: 450, top: 110,
                opacity: fade(f, 32),
            }}>
                <div style={{
                    width: 280, padding: '36px 26px',
                    background: P.ink, borderRadius: 22,
                    textAlign: 'center', boxShadow: '0 16px 40px rgba(15,23,42,0.25)',
                }}>
                    <Img src={staticFile('brand-icons/aws.svg')} style={{ width: 180, height: 108, objectFit: 'contain' }} />
                    <div style={{ fontSize: 28, color: P.amber, fontWeight: 900, marginTop: 10 }}>EC2</div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 10, fontSize: 20, color: P.textDim, fontWeight: 700, width: 280 }}>
                    Elastic Compute Cloud
                </div>
            </div>

            <svg width={80} height={40} style={{ position: 'absolute', left: 740, top: 220, opacity: fade(f, 40) }} viewBox="0 0 80 40">
                <path d="M 0 20 L 60 20" stroke={P.ink} strokeWidth={6} />
                <polygon points="60,10 80,20 60,30" fill={P.ink} />
            </svg>

            <div style={{
                position: 'absolute', right: 0, top: 110,
                opacity: fade(f, 48),
            }}>
                <div style={{
                    width: 340, background: P.ink, borderRadius: 14,
                    boxShadow: '0 12px 30px rgba(15,23,42,0.20)',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        background: P.primaryDeep, padding: '10px 14px',
                        display: 'flex', gap: 8, alignItems: 'center',
                    }}>
                        <div style={{ width: 12, height: 12, borderRadius: 6, background: P.warm }} />
                        <div style={{ width: 12, height: 12, borderRadius: 6, background: P.amber }} />
                        <div style={{ width: 12, height: 12, borderRadius: 6, background: P.emerald }} />
                        <div style={{ marginLeft: 12, fontSize: 16, color: P.mist, fontFamily: 'monospace' }}>
                            aws-api
                        </div>
                    </div>
                    <div style={{ padding: '20px 20px', fontFamily: 'monospace', fontSize: 20, color: P.mist, lineHeight: 1.55 }}>
                        <div>$ ec2 run-instances</div>
                        <div style={{ color: P.amber }}>  --type t2</div>
                        <div style={{ color: P.primary }}>→ launched</div>
                        <div style={{ color: P.emerald, marginTop: 8 }}>💵 pay-per-hour</div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 10, fontSize: 20, color: P.textDim, fontWeight: 700, width: 340 }}>
                    API で誰でも借りられる
                </div>
            </div>

            <div style={{
                position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
                opacity: fade(f, 68), fontSize: 28, color: P.primaryDeep, fontWeight: 800,
            }}>
                ここから、世界のIT基盤が作り変わった
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 7 — NIST という組織（エンブレム+文書を縦積み、中央に集約）
 * ================================================================= */
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ position: 'relative', width: SAFE_W, height: 620, display: 'flex', alignItems: 'center', gap: 50, justifyContent: 'center' }}>
            {/* emblem */}
            <div style={{
                opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)`,
            }}>
                <svg width={360} height={360} viewBox="0 0 400 400">
                    <polygon points="200,30 340,110 340,290 200,370 60,290 60,110" fill={P.primaryDeep} />
                    <polygon points="200,60 315,120 315,280 200,340 85,280 85,120"
                             fill="none" stroke={P.amber} strokeWidth={6} />
                    <text x={200} y={170} textAnchor="middle" fontSize={90} fontWeight={900} fill={P.amber}
                          fontFamily="Georgia, serif">NIST</text>
                    <text x={200} y={210} textAnchor="middle" fontSize={16} fill={P.mist} letterSpacing={2}>
                        NATIONAL INSTITUTE OF
                    </text>
                    <text x={200} y={232} textAnchor="middle" fontSize={16} fill={P.mist} letterSpacing={2}>
                        STANDARDS AND TECHNOLOGY
                    </text>
                    <line x1={110} y1={260} x2={290} y2={260} stroke={P.amber} strokeWidth={2} />
                    <text x={200} y={296} textAnchor="middle" fontSize={20} fill={P.amber} fontWeight={700}>
                        ★ U.S. DEPT of COMMERCE ★
                    </text>
                </svg>
            </div>

            {/* connector + document */}
            <div style={{
                opacity: fade(f, 22), transform: `translateY(${riseY(f, 22, 44, 22)}px)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
                <div style={{ fontSize: 38, color: P.primaryDeep, fontWeight: 900 }}>発行</div>
                <svg width={50} height={80} viewBox="0 0 50 80">
                    <path d="M 25 0 L 25 60" stroke={P.ink} strokeWidth={6} />
                    <polygon points="10,58 25,80 40,58" fill={P.ink} />
                </svg>
                <div style={{
                    width: 540,
                    background: P.surface, borderRadius: 12,
                    padding: '32px 40px', boxShadow: '0 20px 50px rgba(15,23,42,0.15)',
                    borderTop: `10px solid ${P.primary}`,
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: 18, color: P.textDim, letterSpacing: 2 }}>SPECIAL PUBLICATION</div>
                    <div style={{ fontSize: 86, fontWeight: 900, color: P.primaryDeep, lineHeight: 1 }}>
                        SP 800-145
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: P.ink, marginTop: 14 }}>
                        The NIST Definition of<br />Cloud Computing
                    </div>
                    <div style={{
                        marginTop: 18, padding: '12px 16px',
                        background: P.skyTint, borderRadius: 10,
                        fontSize: 20, color: P.primaryDeep, fontWeight: 700,
                        opacity: fade(f, 52),
                    }}>
                        2011年 · 10年超 改訂なしで現役
                    </div>
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 8 — 5つの特徴（中央クラウド＋衛星、縦長の non-symmetric）
 * ================================================================= */
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { n: 1, title: '自分で借りる', sub: 'セルフサービス', x: 80, y: 60 },
        { n: 2, title: 'ネット経由', sub: 'どこからでも', x: 900, y: 40 },
        { n: 3, title: '他と共有', sub: 'プール化', x: 920, y: 330 },
        { n: 4, title: 'すぐ伸縮', sub: 'Elasticity', x: 560, y: 420 },
        { n: 5, title: '使った分だけ', sub: '計測・課金', x: 60, y: 350 },
    ];
    return (
        <Stage>
            <GridBg />
            <SceneTitle text="NIST の 5つの必須特徴" f={f} />
            <div style={{ position: 'relative', width: SAFE_W, height: 560, marginTop: 40 }}>
                {/* center cloud */}
                <div style={{
                    position: 'absolute', left: SAFE_W / 2 - 200, top: 170,
                    opacity: fade(f, 0), transform: `scale(${grow(f, 0, 24)})`,
                }}>
                    <CloudShape w={400} />
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 44, fontWeight: 900, color: P.primaryDeep,
                    }}>Cloud</div>
                </div>
                {/* satellites */}
                {items.map((it, i) => {
                    const start = 20 + i * 7;
                    return (
                        <React.Fragment key={it.n}>
                            <svg width={SAFE_W} height={560} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                                <line x1={SAFE_W / 2} y1={280} x2={it.x + 120} y2={it.y + 50}
                                      stroke={P.primary} strokeWidth={2}
                                      strokeDasharray="5 4" opacity={fade(f, start - 2)} />
                            </svg>
                            <div style={{
                                position: 'absolute', left: it.x, top: it.y,
                                width: 240, textAlign: 'center',
                                opacity: fade(f, start),
                                transform: `translateY(${riseY(f, start)}px)`,
                            }}>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: 52, height: 52, borderRadius: '50%',
                                    background: P.primary, color: P.surface,
                                    fontSize: 28, fontWeight: 900, marginBottom: 6,
                                    boxShadow: '0 6px 14px rgba(37,99,235,0.35)',
                                }}>{it.n}</div>
                                <div style={{ fontSize: 28, fontWeight: 800, color: P.ink }}>{it.title}</div>
                                <div style={{ fontSize: 20, color: P.textDim }}>{it.sub}</div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 9 — ただの借り物じゃない（5本柱＋X/✓）
 * ================================================================= */
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <SceneTitle text="『ネット越しのサーバー』では足りない" f={f} />
        <div style={{ position: 'relative', width: SAFE_W, height: 520, marginTop: 60 }}>
            <svg width={SAFE_W} height={480} viewBox={`0 0 ${SAFE_W} 480`}>
                {/* 5 gate pillars center */}
                {[0, 1, 2, 3, 4].map(i => {
                    const x = SAFE_W / 2 - 200 + i * 100;
                    return (
                        <g key={i} opacity={fade(f, 10 + i * 6)}>
                            <rect x={x} y={80} width={24} height={320} fill={P.primaryDeep} />
                            <rect x={x - 20} y={60} width={64} height={24} fill={P.primaryDeep} />
                            <text x={x + 12} y={436} textAnchor="middle" fontSize={22} fontWeight={800} fill={P.primaryDeep}>
                                {i + 1}
                            </text>
                        </g>
                    );
                })}
                {/* rejected side */}
                <g opacity={fade(f, 50)} transform={`translate(80 200) rotate(-6)`}>
                    <rect x={0} y={0} width={200} height={110} rx={10} fill={P.warm + '33'} stroke={P.warm} strokeWidth={4} strokeDasharray="8 6" />
                    <text x={100} y={50} textAnchor="middle" fontSize={22} fontWeight={800} fill={P.warm}>ホスティング</text>
                    <text x={100} y={82} textAnchor="middle" fontSize={18} fill={P.warm}>固定契約サーバー</text>
                </g>
                <g opacity={fade(f, 64)}>
                    <line x1={300} y1={210} x2={360} y2={270} stroke={P.warm} strokeWidth={8} strokeLinecap="round" />
                    <line x1={360} y1={210} x2={300} y2={270} stroke={P.warm} strokeWidth={8} strokeLinecap="round" />
                </g>
                {/* passed side */}
                <g opacity={fade(f, 74)}>
                    <path d={`M ${SAFE_W - 330} 210 Q ${SAFE_W - 330} 170 ${SAFE_W - 290} 168 Q ${SAFE_W - 278} 140 ${SAFE_W - 240} 142 Q ${SAFE_W - 200} 136 ${SAFE_W - 190} 170 Q ${SAFE_W - 150} 174 ${SAFE_W - 155} 210 Q ${SAFE_W - 160} 240 ${SAFE_W - 200} 242 L ${SAFE_W - 290} 242 Q ${SAFE_W - 330} 242 ${SAFE_W - 330} 210 Z`}
                          fill={P.primaryGlow} stroke={P.primary} strokeWidth={4} />
                    <text x={SAFE_W - 240} y={210} textAnchor="middle" fontSize={26} fontWeight={900} fill={P.primaryDeep}>Cloud</text>
                </g>
                <g opacity={fade(f, 84)}>
                    <circle cx={SAFE_W - 80} cy={230} r={36} fill={P.emerald} />
                    <path d={`M ${SAFE_W - 98} 230 L ${SAFE_W - 84} 246 L ${SAFE_W - 58} 216`} fill="none" stroke={P.surface} strokeWidth={7} strokeLinecap="round" />
                </g>
            </svg>
            <div style={{
                position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
                opacity: fade(f, 90), fontSize: 28, color: P.textDim, fontWeight: 700,
            }}>
                5つ揃って、はじめて「クラウド」
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 10 — 3 つのモデル（中央スタック、サービス例を下段に）
 * ================================================================= */
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => {
    const layers = [
        { label: 'SaaS', sub: 'Software', desc: '全部お任せ', c: P.warm, examples: ['gmail', 'slack', 'netflix'] },
        { label: 'PaaS', sub: 'Platform', desc: '土台だけ借りる', c: P.accent, examples: ['salesforce'] },
        { label: 'IaaS', sub: 'Infrastructure', desc: 'インフラだけ借りる', c: P.primary, examples: ['aws', 'azure', 'googlecloud'] },
    ];
    return (
        <Stage>
            <GridBg />
            <SceneTitle text="3つの「深さ」" f={f} sub="どこまで自分でやるか" />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 50, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
                {layers.map((l, i) => {
                    const start = 16 + i * 14;
                    const rot = (i - 1) * 1.2;
                    const w = SAFE_W - i * 140;
                    return (
                        <div key={l.label} style={{
                            width: w, minHeight: 108, padding: '0 28px',
                            background: l.c, borderRadius: 18,
                            color: P.surface,
                            boxShadow: `0 12px 26px ${l.c}55`,
                            opacity: fade(f, start),
                            transform: `translateY(${riseY(f, start, start + 20, 24)}px) rotate(${rot}deg)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                                <div style={{ fontSize: 50, fontWeight: 900 }}>{l.label}</div>
                                <div style={{ fontSize: 20, opacity: 0.85 }}>{l.sub}</div>
                            </div>
                            <div style={{ fontSize: 24, fontWeight: 700, flex: 1, textAlign: 'center' }}>{l.desc}</div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                {l.examples.map((b, j) => (
                                    <div key={b} style={{
                                        width: 66, height: 66, borderRadius: 12,
                                        background: P.surface,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        opacity: fade(f, start + 8 + j * 2),
                                    }}>
                                        <Img src={staticFile(`brand-icons/${b}.svg`)} style={{ width: 46, height: 46, objectFit: 'contain' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 11 — ピザで例える（3ステージを中央に並べる、各幅を縮小）
 * ================================================================= */
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    const stages = [
        { label: 'IaaS', desc: '生地から焼く', color: P.primary, kind: 'flour' as const, rot: -3 },
        { label: 'PaaS', desc: '冷凍ピザを焼く', color: P.accent, kind: 'frozen' as const, rot: 2 },
        { label: 'SaaS', desc: '届いたら食べるだけ', color: P.warm, kind: 'delivery' as const, rot: -2 },
    ];
    return (
        <Stage>
            <GridBg />
            <SceneTitle text="ピザで例えるなら" f={f} />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 60, display: 'flex', gap: 24, justifyContent: 'center' }}>
                {stages.map((s, i) => (
                    <div key={s.label} style={{
                        width: 360, opacity: fade(f, 12 + i * 16),
                        transform: `translateY(${riseY(f, 12 + i * 16)}px) rotate(${s.rot}deg)`,
                    }}>
                        <svg width={360} height={280} viewBox="0 0 360 280">
                            {s.kind === 'flour' && (
                                <g>
                                    <polygon points="80,100 110,50 200,50 240,100 220,240 100,240" fill={P.surface}
                                             stroke={P.ink} strokeWidth={4} />
                                    <text x={160} y={160} textAnchor="middle" fontSize={32} fontWeight={900} fill={P.ink}>小麦粉</text>
                                    <rect x={220} y={230} width={110} height={16} rx={8} fill={P.amber} stroke={P.accentDeep} strokeWidth={3} />
                                </g>
                            )}
                            {s.kind === 'frozen' && (
                                <g>
                                    <rect x={40} y={70} width={280} height={190} fill="#E8F0FD" stroke={P.ink} strokeWidth={4} />
                                    <rect x={40} y={70} width={280} height={36} fill={P.accent} />
                                    <text x={180} y={94} textAnchor="middle" fontSize={20} fontWeight={900} fill={P.surface}>FROZEN PIZZA</text>
                                    <circle cx={180} cy={190} r={70} fill={P.amber} stroke={P.accentDeep} strokeWidth={3} />
                                    <circle cx={160} cy={170} r={8} fill={P.warm} />
                                    <circle cx={210} cy={180} r={8} fill={P.warm} />
                                    <circle cx={190} cy={210} r={8} fill={P.warm} />
                                    <text x={290} y={150} fontSize={34} fill={P.primary}>❄</text>
                                </g>
                            )}
                            {s.kind === 'delivery' && (
                                <g>
                                    <circle cx={90} cy={220} r={32} fill={P.ink} />
                                    <circle cx={90} cy={220} r={16} fill={P.mist} />
                                    <circle cx={290} cy={220} r={32} fill={P.ink} />
                                    <circle cx={290} cy={220} r={16} fill={P.mist} />
                                    <path d="M 100 220 L 180 220 L 214 174 L 268 174 L 290 220"
                                          fill={P.warm} stroke={P.ink} strokeWidth={3} />
                                    <rect x={200} y={146} width={90} height={28} fill={P.warm} stroke={P.ink} strokeWidth={3} />
                                    <rect x={160} y={56} width={130} height={84} fill="#FFFDF4" stroke={P.ink} strokeWidth={4} rx={4} />
                                    <text x={225} y={108} textAnchor="middle" fontSize={22} fontWeight={900} fill={P.warm}>PIZZA</text>
                                </g>
                            )}
                        </svg>
                        <div style={{
                            marginTop: 4, padding: '12px 0', borderRadius: 12,
                            background: s.color, color: P.surface, textAlign: 'center',
                            fontSize: 38, fontWeight: 900, width: 280, marginLeft: 40,
                        }}>{s.label}</div>
                        <div style={{ textAlign: 'center', fontSize: 22, color: P.textDim, marginTop: 8 }}>
                            {s.desc}
                        </div>
                    </div>
                ))}
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 12 — IaaS の中身（中央：大きな"IaaS"＋下にスタック＋右下にブランド）
 * ================================================================= */
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => {
    const layers = [
        { label: 'アプリ', from: 'you' },
        { label: 'ミドルウェア', from: 'you' },
        { label: 'OS', from: 'you' },
        { label: '仮想マシン / ネット / ストレージ', from: 'cloud' },
        { label: 'ハードウェア', from: 'cloud' },
    ];
    return (
        <Stage>
            <GridBg />
            <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
                {/* big IaaS centered top */}
                <div style={{ textAlign: 'center', opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)` }}>
                    <div style={{ fontSize: 100, fontWeight: 900, color: P.primary, lineHeight: 1 }}>IaaS</div>
                    <div style={{ fontSize: 26, color: P.textDim, marginTop: 4 }}>
                        Infrastructure as a Service
                    </div>
                    <div style={{ fontSize: 22, color: P.primaryDeep, fontWeight: 700, marginTop: 2 }}>
                        ＝ 生地から焼くピザ
                    </div>
                </div>
                {/* stack + brands */}
                <div style={{
                    position: 'absolute', left: 0, right: 0, top: 260,
                    display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'flex-start',
                }}>
                    <div style={{ width: 640 }}>
                        {layers.map((l, i) => (
                            <div key={l.label} style={{
                                padding: '14px 22px', marginBottom: 6, borderRadius: 10,
                                background: l.from === 'cloud' ? P.primary : P.cloud,
                                color: l.from === 'cloud' ? P.surface : P.ink,
                                fontSize: 24, fontWeight: 700,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                opacity: fade(f, 14 + i * 7),
                                transform: `translateX(${riseY(f, 14 + i * 7, 34 + i * 7, 20)}px)`,
                                border: l.from === 'cloud' ? `none` : `2px dashed ${P.textDim}`,
                            }}>
                                <span>{l.label}</span>
                                <span style={{
                                    fontSize: 16, padding: '3px 10px', borderRadius: 12,
                                    background: l.from === 'cloud' ? 'rgba(255,255,255,0.25)' : P.surface,
                                }}>
                                    {l.from === 'cloud' ? 'クラウド側' : '自分で'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: fade(f, 58) }}>
                        <div style={{ fontSize: 18, color: P.textDim, fontWeight: 700 }}>主なサービス</div>
                        <Brand name="aws" size={92} box />
                        <Brand name="azure" size={92} box />
                        <Brand name="googlecloud" size={92} box />
                    </div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 13 — PaaS の中身（同じ配置、コード窓を下段中央に）
 * ================================================================= */
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    const layers = [
        { label: 'アプリのコード', from: 'you' },
        { label: 'ランタイム / ライブラリ', from: 'cloud' },
        { label: 'ミドルウェア', from: 'cloud' },
        { label: 'OS', from: 'cloud' },
        { label: '仮想マシン', from: 'cloud' },
        { label: 'ハードウェア', from: 'cloud' },
    ];
    return (
        <Stage>
            <GridBg />
            <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
                <div style={{ textAlign: 'center', opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)` }}>
                    <div style={{ fontSize: 100, fontWeight: 900, color: P.accent, lineHeight: 1 }}>PaaS</div>
                    <div style={{ fontSize: 26, color: P.textDim, marginTop: 4 }}>Platform as a Service</div>
                    <div style={{ fontSize: 22, color: P.accentDeep, fontWeight: 700, marginTop: 2 }}>＝ 冷凍ピザを焼くだけ</div>
                </div>
                <div style={{
                    position: 'absolute', left: 0, right: 0, top: 240,
                    display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'flex-start',
                }}>
                    <div style={{
                        width: 420, background: P.ink, borderRadius: 14, padding: '18px 20px',
                        fontFamily: 'monospace', fontSize: 18, color: P.amber, lineHeight: 1.5,
                        opacity: fade(f, 54),
                        boxShadow: '0 12px 28px rgba(15,23,42,0.2)',
                        flexShrink: 0,
                    }}>
                        <div style={{ color: P.mist }}>// あなたが書くのはここだけ</div>
                        <div>function hello() {'{'}</div>
                        <div style={{ paddingLeft: 18, color: P.emerald }}>return "Hello";</div>
                        <div>{'}'}</div>
                    </div>
                    <div style={{ width: 620 }}>
                        {layers.map((l, i) => (
                            <div key={l.label} style={{
                                padding: '13px 20px', marginBottom: 5, borderRadius: 10,
                                background: l.from === 'cloud' ? P.accent : P.ink,
                                color: P.surface,
                                fontSize: 22, fontWeight: 700,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                opacity: fade(f, 14 + i * 6),
                                transform: `translateX(${riseY(f, 14 + i * 6, 34 + i * 6, 20)}px)`,
                            }}>
                                <span>{l.label}</span>
                                {l.from === 'cloud' && (
                                    <span style={{
                                        fontSize: 16, padding: '3px 10px', borderRadius: 12,
                                        background: 'rgba(255,255,255,0.22)',
                                    }}>クラウド側</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 14 — SaaSの中身（中央にブラウザ窓、ブランドを散らす）
 * ================================================================= */
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => {
    const brands = [
        { name: 'gmail', x: 60, y: 50, size: 120, rot: -6 },
        { name: 'slack', x: 270, y: 120, size: 110, rot: 4 },
        { name: 'netflix', x: 470, y: 40, size: 140, rot: -3 },
        { name: 'spotify', x: 680, y: 130, size: 120, rot: 6 },
        { name: 'openai', x: 900, y: 50, size: 130, rot: -4 },
        { name: 'dropbox', x: 120, y: 280, size: 100, rot: 3 },
        { name: 'instagram', x: 340, y: 310, size: 120, rot: -5 },
        { name: 'line', x: 580, y: 290, size: 110, rot: 2 },
        { name: 'salesforce', x: 800, y: 290, size: 110, rot: -3 },
    ];
    return (
        <Stage>
            <GridBg />
            <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
                <div style={{ textAlign: 'center', opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)` }}>
                    <div style={{ fontSize: 100, fontWeight: 900, color: P.warm, lineHeight: 1 }}>SaaS</div>
                    <div style={{ fontSize: 24, color: P.textDim, marginTop: 4 }}>ブラウザで使うだけ</div>
                </div>
                {/* browser window */}
                <div style={{
                    position: 'absolute', left: 0, right: 0, top: 220,
                    height: 460, background: P.surface, borderRadius: 20,
                    boxShadow: '0 20px 50px rgba(15,23,42,0.15)',
                    border: `2px solid ${P.mist}`,
                    overflow: 'hidden',
                    opacity: fade(f, 16),
                }}>
                    <div style={{
                        height: 46, background: '#F1F5F9', display: 'flex',
                        alignItems: 'center', padding: '0 16px', gap: 10,
                        borderBottom: `1px solid ${P.mist}`,
                    }}>
                        <div style={{ width: 12, height: 12, borderRadius: 6, background: P.warm }} />
                        <div style={{ width: 12, height: 12, borderRadius: 6, background: P.amber }} />
                        <div style={{ width: 12, height: 12, borderRadius: 6, background: P.emerald }} />
                        <div style={{
                            marginLeft: 30, flex: 1, height: 24, background: P.surface, borderRadius: 12,
                            border: `1px solid ${P.mist}`, fontSize: 14, color: P.textDim,
                            padding: '3px 16px', fontFamily: 'monospace',
                        }}>https://···</div>
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 46px)' }}>
                        {brands.map((b, i) => {
                            const start = 28 + i * 6;
                            return (
                                <div key={b.name} style={{
                                    position: 'absolute', left: b.x, top: b.y,
                                    width: b.size, height: b.size,
                                    background: P.surface, borderRadius: 22,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: `0 8px 20px rgba(15,23,42,0.10)`,
                                    border: `2px solid ${P.panelBorder}`,
                                    opacity: fade(f, start),
                                    transform: `translateY(${riseY(f, start, start + 22, 22)}px) rotate(${b.rot}deg)`,
                                }}>
                                    <Img src={staticFile(`brand-icons/${b.name}.svg`)}
                                         style={{ width: b.size * 0.64, height: b.size * 0.64, objectFit: 'contain' }} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 15 — 雲の居場所（中央に雲→ラック変換）
 * ================================================================= */
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cloudOp = interpolate(f, [0, 40, 70], [1, 0.6, 0.12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <GridBg />
            <SceneTitle text={<>"クラウド" の <span style={{ color: P.primary }}>正体</span></>} f={f} />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 40 }}>
                <div style={{
                    position: 'absolute', left: SAFE_W / 2 - 320, top: 30,
                    opacity: cloudOp, transform: 'scale(1.3)',
                }}>
                    <CloudShape w={640} fill="rgba(191, 214, 251, 0.65)" stroke={P.primary} strokeW={6} />
                </div>
                <div style={{
                    position: 'absolute', left: SAFE_W / 2 - 360, top: 180,
                    display: 'flex', gap: 22, alignItems: 'flex-end',
                    opacity: fade(f, 36),
                }}>
                    {[6, 7, 5, 8, 6, 7].map((units, i) => (
                        <div key={i} style={{
                            opacity: fade(f, 40 + i * 4),
                            transform: `translateY(${riseY(f, 40 + i * 4, 60 + i * 4, 22)}px)`,
                        }}>
                            <ServerRack units={units} w={108} blink f={f} />
                        </div>
                    ))}
                </div>
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center',
                    fontSize: 44, fontWeight: 900, color: P.ink,
                    opacity: fade(f, 80),
                }}>
                    <span style={{ color: P.textDim, textDecoration: 'line-through' }}>魔法の雲</span>
                    　→
                    <span style={{ color: P.primary }}>誰かのコンピュータ</span>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 16 — アシュバーン（全幅マップを上半分に）
 * ================================================================= */
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage full>
        <GridBg />
        <SceneTitle text="バージニア州 アシュバーン" f={f} sub="Data Center Alley" />
        <div style={{ position: 'relative', width: 1760, height: 560, marginTop: 50 }}>
            <svg width={1760} height={330} viewBox="0 0 1760 330">
                <path d="M 80 120 Q 200 50 400 70 Q 640 50 900 80 Q 1180 70 1430 100 Q 1620 120 1690 170 Q 1720 230 1680 280 Q 1500 310 1260 298 Q 980 320 700 310 Q 440 320 220 300 Q 100 290 60 230 Z"
                      fill={P.cloud} stroke={P.textDim} strokeWidth={3} opacity={fade(f, 6)} />
                <g opacity={fade(f, 20)}>
                    <circle cx={1320} cy={168} r={68} fill={P.accent} opacity={0.18} />
                    <circle cx={1320} cy={168} r={42} fill={P.accent} opacity={0.30} />
                </g>
                {[[1300, 156], [1326, 146], [1344, 164], [1314, 176], [1336, 184], [1298, 172]].map((p, i) => (
                    <g key={i} opacity={fade(f, 34 + i * 3)}>
                        <rect x={p[0] - 10} y={p[1] - 10} width={20} height={16} fill={P.mist} stroke={P.ink} strokeWidth={1.5} />
                        <rect x={p[0] - 10} y={p[1] - 10} width={20} height={4} fill={P.ink} />
                    </g>
                ))}
                <line x1={1380} y1={160} x2={1500} y2={100} stroke={P.ink} strokeWidth={2} opacity={fade(f, 52)} />
                <g opacity={fade(f, 56)} transform={`translate(1500 60)`}>
                    <rect x={0} y={0} width={220} height={70} rx={10} fill={P.ink} />
                    <text x={110} y={32} textAnchor="middle" fontSize={22} fill={P.amber} fontWeight={800}>ASHBURN, VA</text>
                    <text x={110} y={55} textAnchor="middle" fontSize={18} fill={P.mist}>Loudoun County</text>
                </g>
            </svg>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 400, display: 'flex', gap: 160, alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ opacity: fade(f, 70), textAlign: 'center' }}>
                    <div style={{ fontSize: 130, fontWeight: 900, color: P.accent, letterSpacing: '-0.03em', lineHeight: 1 }}>200+</div>
                    <div style={{ fontSize: 24, color: P.textDim, fontWeight: 700, marginTop: 4 }}>データセンター集積</div>
                </div>
                <div style={{ opacity: fade(f, 82), textAlign: 'center' }}>
                    <div style={{ fontSize: 130, fontWeight: 900, color: P.primary, letterSpacing: '-0.03em', lineHeight: 1 }}>〜70%</div>
                    <div style={{ fontSize: 24, color: P.textDim, fontWeight: 700, marginTop: 4 }}>世界のネット通信が経由（一説）</div>
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 17 — 1サイトの規模（3要素を中央に詰めて配置）
 * ================================================================= */
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => {
    const needleAngle = interpolate(f, [30, 70], [-100, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <GridBg />
            <SceneTitle text="1サイトあたりの物理" f={f} />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 60, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
                {/* tokyo dome column */}
                <div style={{ opacity: fade(f, 10), transform: `translateY(${riseY(f, 10)}px)`, textAlign: 'center' }}>
                    <svg width={220} height={170} viewBox="0 0 260 200">
                        <path d="M 20 180 Q 20 40 130 40 Q 240 40 240 180 Z" fill={P.cloud} stroke={P.textDim} strokeWidth={3} />
                        <rect x={20} y={180} width={220} height={12} fill={P.textDim} />
                        <path d="M 40 160 Q 130 80 220 160" fill="none" stroke={P.textDim} strokeWidth={1.5} opacity={0.6} />
                        <path d="M 60 180 Q 130 110 200 180" fill="none" stroke={P.textDim} strokeWidth={1.5} opacity={0.6} />
                    </svg>
                    <div style={{ fontSize: 22, color: P.textDim, marginTop: 8 }}>東京ドーム 1つ</div>
                    <div style={{ fontSize: 70, fontWeight: 900, color: P.textDim, marginTop: 4 }}>×</div>
                    <div style={{ fontSize: 80, fontWeight: 900, color: P.ink, lineHeight: 1 }}>数個</div>
                </div>

                {/* DC */}
                <div style={{ opacity: fade(f, 14), transform: `translateY(${riseY(f, 14)}px)`, textAlign: 'center' }}>
                    <DataCenterBuilding w={340} />
                    <div style={{ fontSize: 22, color: P.textDim, marginTop: 8 }}>
                        ハイパースケール 1サイト
                    </div>
                </div>

                {/* meter */}
                <div style={{ opacity: fade(f, 30), transform: `translateY(${riseY(f, 30)}px)`, textAlign: 'center' }}>
                    <svg width={300} height={240} viewBox="0 0 380 300">
                        <path d="M 40 220 A 150 150 0 0 1 340 220" fill="none" stroke={P.ink} strokeWidth={20}
                              strokeLinecap="round" />
                        <path d="M 40 220 A 150 150 0 0 1 340 220" fill="none" stroke={P.warm} strokeWidth={20}
                              strokeDasharray="380 1000" strokeDashoffset={380 - fade(f, 36, 66) * 260}
                              strokeLinecap="round" />
                        <line x1={190} y1={220} x2={190 + 130 * Math.cos(needleAngle * Math.PI / 180)}
                              y2={220 + 130 * Math.sin(needleAngle * Math.PI / 180)}
                              stroke={P.warm} strokeWidth={5} strokeLinecap="round" />
                        <circle cx={190} cy={220} r={12} fill={P.ink} />
                        <text x={40} y={260} fontSize={18} fill={P.textDim}>0</text>
                        <text x={340} y={260} fontSize={18} fill={P.textDim} textAnchor="end">650 MW</text>
                    </svg>
                    <div style={{ fontSize: 32, fontWeight: 900, color: P.warm, marginTop: 4 }}>最大 650 MW</div>
                    <div style={{ fontSize: 20, color: P.textDim }}>中規模発電所 1基分</div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 18 — 415TWh（巨大数字＋ドーナツを中央に寄せる）
 * ================================================================= */
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => {
    const donutFill = fade(f, 10, 46);
    const angle = donutFill * 3.6;
    const cx = 220, cy = 220, r = 150;
    const endX = cx + r * Math.sin(angle * Math.PI / 180);
    const endY = cy - r * Math.cos(angle * Math.PI / 180);
    return (
        <Stage>
            <GridBg />
            <div style={{ position: 'relative', width: SAFE_W, height: 620, display: 'flex', alignItems: 'center', gap: 40, justifyContent: 'center' }}>
                {/* donut */}
                <div style={{ opacity: fade(f, 14), flexShrink: 0 }}>
                    <svg width={380} height={440} viewBox="0 0 440 440">
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke={P.cloud} strokeWidth={50} />
                        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
                              fill="none" stroke={P.warm} strokeWidth={50} strokeLinecap="round" />
                        <text x={cx} y={cy - 16} textAnchor="middle" fontSize={80} fontWeight={900} fill={P.ink}>1%</text>
                        <text x={cx} y={cy + 30} textAnchor="middle" fontSize={22} fill={P.textDim}>世界電力の</text>
                    </svg>
                    <div style={{ textAlign: 'center', fontSize: 22, color: P.textDim, marginTop: 6 }}>
                        1つの業種だけで
                    </div>
                </div>
                {/* numbers */}
                <div style={{ opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)`, flex: 1 }}>
                    <div style={{ fontSize: 24, color: P.textDim, fontWeight: 700 }}>2024年 世界のデータセンター消費電力</div>
                    <div style={{ fontSize: 170, fontWeight: 900, color: P.warm, lineHeight: 1, letterSpacing: '-0.03em' }}>
                        415<span style={{ fontSize: 76, marginLeft: 10 }}>TWh</span>
                    </div>
                    <div style={{
                        marginTop: 16, padding: '20px 24px', maxWidth: 560,
                        background: P.accent + '22', borderLeft: `8px solid ${P.accent}`,
                        borderRadius: 10, opacity: fade(f, 66),
                    }}>
                        <div style={{ fontSize: 22, color: P.textDim, fontWeight: 700 }}>2030年までに</div>
                        <div style={{ fontSize: 34, fontWeight: 800, color: P.ink, marginTop: 4 }}>
                            <span style={{ color: P.warm, fontWeight: 900 }}>945 TWh</span> へ倍増予測
                        </div>
                        <div style={{ fontSize: 18, color: P.accentDeep, marginTop: 2 }}>
                            (IEA)
                        </div>
                    </div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 19 — 海底148万キロ（地球＋数字を横並び、両方中央寄り）
 * ================================================================= */
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => {
    const spin = interpolate(f, [0, 90], [0, 24], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <GridBg />
            <SceneTitle text={<>"雲"の中身は <span style={{ color: P.primary }}>海底ケーブル</span></>} f={f} />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 30, display: 'flex', alignItems: 'center', gap: 30, justifyContent: 'center' }}>
                {/* globe */}
                <div style={{ flexShrink: 0, opacity: fade(f, 8) }}>
                    <svg width={500} height={500} viewBox="0 0 540 540">
                        <defs>
                            <radialGradient id="globe-grad" cx="30%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#D7E7FC" />
                                <stop offset="60%" stopColor="#7BAEF5" />
                                <stop offset="100%" stopColor="#2563EB" />
                            </radialGradient>
                        </defs>
                        <circle cx={270} cy={270} r={220} fill="url(#globe-grad)" />
                        {[0, 1, 2, 3, 4].map(i => (
                            <ellipse key={i} cx={270} cy={270} rx={220} ry={220 - i * 40}
                                     fill="none" stroke={P.surface} strokeWidth={1} opacity={0.4} />
                        ))}
                        <g transform={`rotate(${spin} 270 270)`}>
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <ellipse key={i} cx={270} cy={270} rx={40 + i * 36} ry={220}
                                         fill="none" stroke={P.surface} strokeWidth={1} opacity={0.35} />
                            ))}
                        </g>
                        <g opacity={0.85} fill={P.emerald}>
                            <path d="M 180 180 Q 220 150 240 180 Q 250 220 230 240 Q 200 260 180 240 Z" />
                            <path d="M 300 220 Q 330 200 370 220 Q 390 260 370 290 Q 330 310 310 280 Z" />
                            <path d="M 210 300 Q 240 290 260 320 Q 260 360 230 380 Q 200 370 200 330 Z" />
                        </g>
                        <g opacity={fade(f, 36)}>
                            {[0, 1, 2, 3].map(i => (
                                <g key={i} transform={`rotate(${i * 18 + spin} 270 270)`}>
                                    <ellipse cx={270} cy={270} rx={220 + i * 6} ry={60 + i * 20}
                                             fill="none" stroke={P.warm} strokeWidth={3} strokeDasharray="12 8" opacity={0.7} />
                                </g>
                            ))}
                        </g>
                    </svg>
                </div>
                {/* numbers */}
                <div style={{ flex: 1, opacity: fade(f, 30), transform: `translateY(${riseY(f, 30)}px)` }}>
                    <div style={{ fontSize: 26, color: P.textDim, fontWeight: 700 }}>海底ケーブル総延長</div>
                    <div style={{ fontSize: 130, fontWeight: 900, color: P.primary, lineHeight: 1, letterSpacing: '-0.03em' }}>
                        148<span style={{ fontSize: 70 }}>万km</span>
                    </div>
                    <div style={{
                        marginTop: 14, padding: '18px 24px', maxWidth: 560,
                        background: P.accent + '22',
                        borderLeft: `8px solid ${P.accent}`, borderRadius: 8,
                        opacity: fade(f, 56),
                    }}>
                        <div style={{ fontSize: 40, fontWeight: 900, color: P.accentDeep, lineHeight: 1.05 }}>地球 37周 分</div>
                        <div style={{ fontSize: 20, color: P.textDim, marginTop: 4 }}>
                            大陸間通信の 97〜98% がこれを通る
                        </div>
                    </div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 20 — 便利の逆側（中央の天秤、タイトル上・注釈下）
 * ================================================================= */
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => {
    const tilt = interpolate(f, [10, 50], [0, -10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <GridBg />
            <SceneTitle text={<>「便利！」の <span style={{ color: P.warm }}>逆側</span></>} f={f} />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 40 }}>
                <svg width={SAFE_W} height={480} viewBox={`0 0 ${SAFE_W} 480`}>
                    <rect x={SAFE_W / 2 - 60} y={420} width={120} height={40} rx={6} fill={P.ink} />
                    <rect x={SAFE_W / 2 - 30} y={140} width={60} height={280} fill={P.ink} />
                    <g transform={`rotate(${tilt} ${SAFE_W / 2} 160)`}>
                        <rect x={SAFE_W / 2 - 440} y={150} width={880} height={20} rx={10} fill={P.ink} />
                        {/* left: cloud */}
                        <line x1={SAFE_W / 2 - 300} y1={170} x2={SAFE_W / 2 - 300} y2={240} stroke={P.ink} strokeWidth={3} />
                        <path d={`M ${SAFE_W / 2 - 370} 240 Q ${SAFE_W / 2 - 370} 300 ${SAFE_W / 2 - 300} 300 Q ${SAFE_W / 2 - 230} 300 ${SAFE_W / 2 - 230} 240 Z`} fill={P.primaryGlow} stroke={P.primary} strokeWidth={4} />
                        <g transform={`translate(${SAFE_W / 2 - 356} 218)`}>
                            <CloudShape w={120} />
                        </g>
                        {/* right: on-prem */}
                        <line x1={SAFE_W / 2 + 300} y1={170} x2={SAFE_W / 2 + 300} y2={240} stroke={P.ink} strokeWidth={3} />
                        <path d={`M ${SAFE_W / 2 + 230} 240 Q ${SAFE_W / 2 + 230} 300 ${SAFE_W / 2 + 300} 300 Q ${SAFE_W / 2 + 370} 300 ${SAFE_W / 2 + 370} 240 Z`} fill={P.warm + '44'} stroke={P.warm} strokeWidth={4} />
                        <g transform={`translate(${SAFE_W / 2 + 240} 180)`}>
                            <DataCenterBuilding w={120} />
                        </g>
                    </g>
                </svg>
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center',
                    opacity: fade(f, 60), fontSize: 30, fontWeight: 700, color: P.ink,
                }}>
                    大企業の一部が <span style={{ color: P.warm, fontWeight: 900 }}>自社に戻り始めている</span>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 21 — 定常負荷の話（左右2パネルを中央に並べる、触れ合う）
 * ================================================================= */
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <SceneTitle text="どこで効く？どこで効かない？" f={f} />
        <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 50, display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                width: 560, background: P.surface,
                borderRadius: 20, padding: '26px 36px', border: `3px solid ${P.primary}`,
                boxShadow: '0 12px 30px rgba(37,99,235,0.12)',
                opacity: fade(f, 10), transform: `translateY(${riseY(f, 10)}px) rotate(-1.5deg)`,
            }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: P.primary }}>クラウドが活きる</div>
                <svg width={500} height={180} viewBox="0 0 620 200">
                    <line x1={20} y1={160} x2={600} y2={160} stroke={P.textDim} strokeWidth={2} />
                    <line x1={20} y1={20} x2={20} y2={160} stroke={P.textDim} strokeWidth={2} />
                    <path d="M 20 140 Q 70 40 130 110 Q 190 170 260 60 Q 320 150 390 50 Q 460 160 540 70 L 600 130"
                          fill="none" stroke={P.primary} strokeWidth={6} />
                    {[60, 180, 300, 420].map((x, i) => (
                        <rect key={i} x={x} y={80 + (i % 2) * 20} width={40} height={80 - (i % 2) * 20}
                              fill={P.primaryGlow} opacity={fade(f, 24 + i * 4)} />
                    ))}
                </svg>
                <div style={{ fontSize: 22, color: P.textDim, marginTop: 4 }}>
                    負荷が 激しく上下する 仕事
                </div>
            </div>
            <div style={{
                width: 560, background: P.surface,
                borderRadius: 20, padding: '26px 36px', border: `3px solid ${P.warm}`,
                boxShadow: '0 12px 30px rgba(239,68,68,0.12)',
                opacity: fade(f, 38), transform: `translateY(${riseY(f, 38)}px) rotate(1.5deg)`,
            }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: P.warm }}>自前が活きる</div>
                <svg width={500} height={180} viewBox="0 0 620 200">
                    <line x1={20} y1={160} x2={600} y2={160} stroke={P.textDim} strokeWidth={2} />
                    <line x1={20} y1={20} x2={20} y2={160} stroke={P.textDim} strokeWidth={2} />
                    <path d="M 20 90 L 600 88" fill="none" stroke={P.warm} strokeWidth={6} />
                    {[60, 180, 300, 420].map((x, i) => (
                        <rect key={i} x={x} y={92} width={40} height={68}
                              fill={P.warm + '33'} opacity={fade(f, 50 + i * 4)} />
                    ))}
                </svg>
                <div style={{ fontSize: 22, color: P.textDim, marginTop: 4 }}>
                    毎日 ほぼ同じ量 の大きな仕事
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 22 — 37signals の決断（3列：クラウド → 自前 → 節約、中央に集約）
 * ================================================================= */
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => {
    const barShrink = interpolate(f, [20, 55], [1, 0.42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <GridBg />
            <SceneTitle text="37signals の離脱" f={f} sub="Basecamp / HEY を運営" />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 50 }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    fontSize: 540, fontWeight: 900, color: P.emerald, opacity: 0.07,
                    textAlign: 'center', lineHeight: 0.85, pointerEvents: 'none',
                }}>$</div>

                {/* before bar, top-left */}
                <div style={{ position: 'absolute', left: 0, top: 20, opacity: fade(f, 0) }}>
                    <div style={{ fontSize: 24, color: P.textDim }}>クラウド時代</div>
                    <div style={{ fontSize: 60, fontWeight: 900, color: P.warm, marginTop: 2 }}>年 320 万 $</div>
                    <div style={{ marginTop: 8, width: 420, height: 56, borderRadius: 10, background: P.warm }} />
                </div>

                {/* after bar, left-middle */}
                <div style={{ position: 'absolute', left: 0, top: 220, opacity: fade(f, 20) }}>
                    <div style={{ fontSize: 24, color: P.textDim }}>自社DC 移行後</div>
                    <div style={{ fontSize: 60, fontWeight: 900, color: P.primary, marginTop: 2 }}>年 130 万 $</div>
                    <div style={{ marginTop: 8, width: 420 * barShrink, height: 56, borderRadius: 10, background: P.primary }} />
                </div>

                {/* arrow in middle */}
                <div style={{
                    position: 'absolute', left: 440, top: 160, fontSize: 140, fontWeight: 900, color: P.ink,
                    opacity: fade(f, 40),
                }}>→</div>

                {/* big savings */}
                <div style={{
                    position: 'absolute', right: 0, top: 80, width: 480,
                    padding: '32px 36px', background: P.amber + 'cc',
                    borderRadius: 20, border: `3px solid ${P.accent}`,
                    boxShadow: '0 14px 32px rgba(245,158,11,0.3)',
                    opacity: fade(f, 60), transform: `rotate(3deg) translateY(${riseY(f, 60)}px)`,
                }}>
                    <div style={{ fontSize: 24, color: P.accentDeep, fontWeight: 700 }}>5年で 試算</div>
                    <div style={{ fontSize: 88, fontWeight: 900, color: P.ink, lineHeight: 1, marginTop: 4 }}>
                        1,000 万$
                    </div>
                    <div style={{ fontSize: 24, color: P.ink, marginTop: 4 }}>超の節約見込み</div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 23 — Dropbox の離脱（Before → 移行 → After を素直に縦積み）
 * ================================================================= */
const Scene23: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
            {/* header: Dropbox + "Magic Pocket" */}
            <div style={{
                position: 'absolute', left: 0, right: 0, top: 0,
                display: 'flex', alignItems: 'center', gap: 18, justifyContent: 'center',
                opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)`,
            }}>
                <Brand name="dropbox" size={92} />
                <div style={{ fontSize: 44, fontWeight: 900, color: P.primaryDeep }}>
                    Dropbox の <span style={{ color: P.primary }}>"Magic Pocket"</span>
                </div>
            </div>

            {/* Before / arrow / After row */}
            <div style={{
                position: 'absolute', left: 0, right: 0, top: 140,
                display: 'flex', alignItems: 'stretch', gap: 28, justifyContent: 'center',
            }}>
                {/* BEFORE card */}
                <div style={{
                    width: 420, background: P.surface, borderRadius: 20,
                    border: `3px dashed ${P.textDim}`,
                    padding: '22px 24px',
                    opacity: fade(f, 14), transform: `translateY(${riseY(f, 14)}px)`,
                }}>
                    <div style={{
                        display: 'inline-block', padding: '4px 14px', borderRadius: 10,
                        background: P.textDim, color: P.surface, fontSize: 20, fontWeight: 800,
                    }}>BEFORE</div>
                    <div style={{ fontSize: 24, color: P.textDim, marginTop: 12, fontWeight: 700 }}>
                        AWS S3 にユーザーデータ全部
                    </div>
                    <svg width={380} height={180} viewBox="0 0 380 180" style={{ marginTop: 8 }}>
                        <path d="M 70 120 Q 70 50 160 46 Q 180 10 250 14 Q 310 6 320 50 Q 380 54 375 120 Q 370 156 310 158 L 170 158 Q 70 158 70 120 Z"
                              fill={P.primaryGlow} stroke={P.primary} strokeWidth={4} />
                        <text x={220} y={100} textAnchor="middle" fontSize={34} fontWeight={900} fill={P.primaryDeep}>AWS S3</text>
                        {/* dollar drip */}
                        {[80, 140, 200, 260, 310].map((x, i) => (
                            <text key={i} x={x} y={148 + (i % 2) * 8} fontSize={24} fontWeight={900} fill={P.warm}
                                  opacity={fade(f, 24 + i * 2)}>$</text>
                        ))}
                    </svg>
                </div>

                {/* arrow with label */}
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 6, opacity: fade(f, 34),
                }}>
                    <div style={{
                        fontSize: 22, color: P.ink, fontWeight: 800,
                        padding: '4px 14px', borderRadius: 12, background: P.amber + 'cc',
                    }}>2015年 移行</div>
                    <svg width={100} height={60} viewBox="0 0 100 60">
                        <path d="M 0 30 L 78 30" stroke={P.ink} strokeWidth={6} />
                        <polygon points="78,16 100,30 78,44" fill={P.ink} />
                    </svg>
                    <div style={{ fontSize: 22, color: P.textDim, fontWeight: 700 }}>自社DC 建設</div>
                </div>

                {/* AFTER card */}
                <div style={{
                    width: 420, background: P.surface, borderRadius: 20,
                    border: `3px solid ${P.primary}`,
                    padding: '22px 24px',
                    opacity: fade(f, 44), transform: `translateY(${riseY(f, 44)}px)`,
                    boxShadow: `0 12px 30px ${P.primary}33`,
                }}>
                    <div style={{
                        display: 'inline-block', padding: '4px 14px', borderRadius: 10,
                        background: P.primary, color: P.surface, fontSize: 20, fontWeight: 800,
                    }}>AFTER</div>
                    <div style={{ fontSize: 24, color: P.primaryDeep, marginTop: 12, fontWeight: 700 }}>
                        自社 DC で 90% を運用
                    </div>
                    <svg width={380} height={180} viewBox="0 0 380 180" style={{ marginTop: 8 }}>
                        {/* DC building */}
                        <rect x={40} y={70} width={300} height={100} fill={P.mist} />
                        <rect x={40} y={70} width={300} height={16} fill={P.textDim} />
                        <polygon points="40,70 190,28 340,70" fill={P.primaryDeep} />
                        {/* racks inside */}
                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <g key={i} opacity={fade(f, 50 + i * 2)}>
                                <rect x={60 + i * 42} y={96} width={28} height={62} rx={3} fill={P.ink} />
                                <rect x={64 + i * 42} y={102} width={20} height={3} fill={P.emerald} />
                                <rect x={64 + i * 42} y={110} width={20} height={3} fill={P.mist} />
                                <rect x={64 + i * 42} y={118} width={20} height={3} fill={P.mist} />
                                <rect x={64 + i * 42} y={126} width={20} height={3} fill={P.mist} />
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            {/* savings banner */}
            <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                display: 'flex', alignItems: 'center', gap: 28, justifyContent: 'center',
                padding: '20px 36px',
                background: P.amber + 'cc',
                borderRadius: 16, border: `3px solid ${P.accent}`,
                boxShadow: '0 12px 28px rgba(245,158,11,0.25)',
                opacity: fade(f, 62), transform: `translateY(${riseY(f, 62)}px)`,
            }}>
                <div style={{ fontSize: 22, color: P.accentDeep, fontWeight: 700 }}>IPO前の SEC 書類で判明</div>
                <div style={{ fontSize: 74, fontWeight: 900, color: P.ink, lineHeight: 1 }}>
                    75<span style={{ fontSize: 46 }}> M$</span>
                </div>
                <div style={{ fontSize: 28, color: P.ink, fontWeight: 800 }}>運用コスト削減</div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 24 — 1兆ドルの逆説（中央引用＋下段バー）
 * ================================================================= */
const Scene24: React.FC<SceneProps> = ({ localFrame: f }) => {
    const barW = interpolate(f, [40, 80], [0, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <Stage>
            <GridBg />
            <SceneTitle text="Andreessen Horowitz の指摘" f={f} sub="(ベンチャー投資家, 2021)" />
            <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 50 }}>
                <div style={{
                    background: P.surface, borderRadius: 24,
                    padding: '40px 50px', border: `4px solid ${P.accent}`,
                    boxShadow: '0 16px 36px rgba(245,158,11,0.12)',
                    opacity: fade(f, 0), transform: `translateY(${riseY(f, 0, 22, 22)}px)`,
                }}>
                    <div style={{ fontSize: 40, fontWeight: 700, color: P.ink, lineHeight: 1.45 }}>
                        「立ち上げ期にクラウドを使わないのは <span style={{ color: P.primary, fontWeight: 900 }}>狂気</span>。<br />
                        でも大規模化して居残るのも <span style={{ color: P.warm, fontWeight: 900 }}>狂気</span>」
                    </div>
                </div>

                <div style={{
                    marginTop: 40, opacity: fade(f, 36), transform: `translateY(${riseY(f, 36)}px)`,
                }}>
                    <div style={{ fontSize: 22, color: P.textDim, marginBottom: 10 }}>
                        上場 SaaS 50社の試算：クラウド費が削る時価総額の割合
                    </div>
                    <div style={{
                        position: 'relative', width: '100%', height: 66,
                        background: P.cloud, borderRadius: 14, overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${barW * 2}%`, height: '100%', background: P.warm,
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 18,
                        }}>
                            <span style={{ color: P.surface, fontSize: 32, fontWeight: 900 }}>約 {Math.round(barW)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 25 — 出るのが高い（漏斗を中央に集約、9x記章も中央に）
 * ================================================================= */
const Scene25: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <SceneTitle text={<>入るのは安い。<span style={{ color: P.warm }}>出るのが高い。</span></>} f={f} />
        <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 40 }}>
            <svg width={SAFE_W} height={380} viewBox={`0 0 ${SAFE_W} 380`}>
                {/* central cloud */}
                <g opacity={fade(f, 10)}>
                    <path d={`M ${SAFE_W / 2 - 130} 140 Q ${SAFE_W / 2 - 130} 70 ${SAFE_W / 2 - 60} 66 Q ${SAFE_W / 2 - 40} 20 ${SAFE_W / 2 + 40} 22 Q ${SAFE_W / 2 + 130} 12 ${SAFE_W / 2 + 150} 70 Q ${SAFE_W / 2 + 220} 74 ${SAFE_W / 2 + 215} 140 Q ${SAFE_W / 2 + 210} 200 ${SAFE_W / 2 + 140} 202 L ${SAFE_W / 2 - 50} 202 Q ${SAFE_W / 2 - 130} 202 ${SAFE_W / 2 - 130} 140 Z`}
                          fill={P.primaryGlow} stroke={P.primary} strokeWidth={4} />
                    <text x={SAFE_W / 2 + 30} y={140} textAnchor="middle" fontSize={36} fontWeight={900} fill={P.primaryDeep}>Cloud</text>
                </g>
                {/* in pipe */}
                <g opacity={fade(f, 22)}>
                    <rect x={60} y={116} width={SAFE_W / 2 - 200} height={48} fill={P.primary} rx={6} />
                    <polygon points={`${SAFE_W / 2 - 140},96 ${SAFE_W / 2 - 80},140 ${SAFE_W / 2 - 140},184`} fill={P.primary} />
                    <text x={160} y={84} fontSize={28} fill={P.primaryDeep} fontWeight={800}>
                        in  ¢ (安い)
                    </text>
                </g>
                {/* out pipe */}
                <g opacity={fade(f, 40)}>
                    <rect x={SAFE_W / 2 + 170} y={78} width={SAFE_W / 2 - 270} height={132} fill={P.warm} rx={10} />
                    <polygon points={`${SAFE_W / 2 + 170},48 ${SAFE_W / 2 + 170},240 ${SAFE_W - 80},144`} fill={P.warm} />
                    <text x={SAFE_W / 2 + 250} y={50} fontSize={28} fill={P.warm} fontWeight={800}>
                        out  $$$ (高い)
                    </text>
                </g>
                {/* 9x badge */}
                <g opacity={fade(f, 60)}>
                    <circle cx={SAFE_W / 2} cy={310} r={66} fill={P.ink} />
                    <text x={SAFE_W / 2} y={308} textAnchor="middle" fontSize={52} fontWeight={900} fill={P.amber}>×9</text>
                    <text x={SAFE_W / 2} y={340} textAnchor="middle" fontSize={16} fill={P.mist}>格安VPS比</text>
                </g>
            </svg>
            {/* conclusion caption (outside SVG to avoid figure overlap) */}
            <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center',
                opacity: fade(f, 76),
                fontSize: 26, color: P.ink, fontWeight: 800,
            }}>
                事実上の "データ人質" 構造（独禁法調査対象）
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 26 — 86%（中央大ドーナツ＋テキストを下に、縦レイアウト）
 * ================================================================= */
const Scene26: React.FC<SceneProps> = ({ localFrame: f }) => {
    const pct = interpolate(f, [14, 56], [0, 86], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const cx = 280, cy = 280, r = 200;
    const angle = (pct / 100) * 360;
    const rad = (a: number) => (a - 90) * Math.PI / 180;
    const end = { x: cx + r * Math.cos(rad(angle)), y: cy + r * Math.sin(rad(angle)) };
    const large = angle > 180 ? 1 : 0;
    return (
        <Stage>
            <GridBg />
            <div style={{ position: 'relative', width: SAFE_W, height: 620, display: 'flex', alignItems: 'center', gap: 30, justifyContent: 'center' }}>
                {/* donut */}
                <div style={{ flexShrink: 0, opacity: fade(f, 10) }}>
                    <svg width={500} height={500} viewBox="0 0 560 560">
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke={P.cloud} strokeWidth={54} />
                        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
                              fill="none" stroke={P.warm} strokeWidth={54} strokeLinecap="round" />
                        <text x={cx} y={cy + 20} textAnchor="middle"
                              fontSize={160} fontWeight={900} fill={P.ink}>
                            {Math.round(pct)}<tspan fontSize={90}>%</tspan>
                        </text>
                    </svg>
                </div>
                {/* text block */}
                <div style={{ flex: 1, opacity: fade(f, 0), transform: `translateY(${riseY(f, 0)}px)` }}>
                    <div style={{ fontSize: 28, color: P.textDim, fontWeight: 700 }}>
                        大企業IT責任者 2024年調査
                    </div>
                    <div style={{
                        fontSize: 46, fontWeight: 800, color: P.ink, lineHeight: 1.4, marginTop: 10,
                    }}>
                        「一部は <span style={{ color: P.warm }}>パブリッククラウドから<br />戻したい</span>」
                    </div>
                    <div style={{
                        marginTop: 20, padding: '14px 18px',
                        background: P.warm + '22', borderLeft: `6px solid ${P.warm}`,
                        fontSize: 22, color: P.ink, fontWeight: 700,
                        opacity: fade(f, 68),
                    }}>
                        ── 調査側も「過去最高水準」と明言
                    </div>
                </div>
            </div>
        </Stage>
    );
};

/* =================================================================
 * Scene 27 — 誰かのコンピュータ（中央に引用、背景ラックは中央のみ）
 * ================================================================= */
const Scene27: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ position: 'relative', width: SAFE_W, height: 620 }}>
            {/* faint racks, only in center */}
            <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                display: 'flex', gap: 14, justifyContent: 'center', opacity: 0.22,
            }}>
                {[5, 7, 6, 8, 6, 7].map((u, i) => (
                    <div key={i} style={{ opacity: fade(f, 6 + i * 3) }}>
                        <ServerRack units={u} w={88} />
                    </div>
                ))}
            </div>
            {/* quote card center */}
            <div style={{
                position: 'absolute', left: 0, right: 0, top: 40,
                background: P.surface, borderRadius: 28,
                padding: '50px 60px',
                borderLeft: `14px solid ${P.primary}`,
                boxShadow: '0 24px 60px rgba(15,23,42,0.18)',
                opacity: fade(f, 14), transform: `translateY(${riseY(f, 14, 36, 22)}px)`,
            }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: P.ink, lineHeight: 1.35 }}>
                    "There is no <span style={{ color: P.textDim, textDecoration: 'line-through' }}>cloud</span>.<br />
                    It's just <span style={{ color: P.primary }}>someone else's computer.</span>"
                </div>
                <div style={{
                    fontSize: 28, color: P.primaryDeep, marginTop: 20, fontWeight: 700, lineHeight: 1.5,
                    opacity: fade(f, 44),
                }}>
                    ──「クラウドなんて存在しない。<br />ただの、誰かのコンピュータだ。」
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 28 — 使い分けの話（中央マトリクス）
 * ================================================================= */
const Scene28: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <SceneTitle text="条件で、効き目が変わる" f={f} />
        <div style={{ position: 'relative', width: SAFE_W, height: 540, marginTop: 60 }}>
            <svg width={SAFE_W} height={500} viewBox={`0 0 ${SAFE_W} 500`}>
                <line x1={80} y1={420} x2={SAFE_W - 40} y2={420} stroke={P.ink} strokeWidth={4} opacity={fade(f, 0)} />
                <line x1={80} y1={30} x2={80} y2={420} stroke={P.ink} strokeWidth={4} opacity={fade(f, 0)} />
                <polygon points={`${SAFE_W - 40},420 ${SAFE_W - 20},412 ${SAFE_W - 20},428`} fill={P.ink} opacity={fade(f, 0)} />
                <polygon points="80,30 72,50 88,50" fill={P.ink} opacity={fade(f, 0)} />
                <text x={SAFE_W - 300} y={456} fontSize={26} fill={P.textDim}>負荷の予測しやすさ →</text>
                <text x={56} y={220} fontSize={26} fill={P.textDim} transform={`rotate(-90 56 220)`}>規模 →</text>

                <g opacity={fade(f, 16)}>
                    <rect x={90} y={230} width={520} height={180} fill={P.primaryGlow} rx={8} />
                    <text x={350} y={320} textAnchor="middle" fontSize={40} fontWeight={900} fill={P.primaryDeep}>
                        クラウドが効く
                    </text>
                    <text x={350} y={356} textAnchor="middle" fontSize={22} fill={P.primaryDeep}>
                        変動が大きい・小〜中規模
                    </text>
                </g>
                <g opacity={fade(f, 32)}>
                    <rect x={620} y={40} width={520} height={180} fill={P.warm + '33'} rx={8} />
                    <text x={880} y={130} textAnchor="middle" fontSize={40} fontWeight={900} fill={P.warm}>
                        自前が効く
                    </text>
                    <text x={880} y={166} textAnchor="middle" fontSize={22} fill={P.warm}>
                        定常・大規模
                    </text>
                </g>
                <g opacity={fade(f, 52)}>
                    <text x={620} y={316} textAnchor="middle" fontSize={22} fill={P.textDim}>
                        ハイブリッドもあり
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

/* =================================================================
 * Scene 29 — 冒頭に戻る（中央の雲内にラック、答えバナー）
 * ================================================================= */
const Scene29: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <GridBg />
        <div style={{ position: 'relative', width: SAFE_W, height: 620, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ fontSize: 44, color: P.textDim, opacity: fade(f, 0) }}>
                「クラウド」って、なんなの？
            </div>
            {/* cloud with racks inside */}
            <div style={{ opacity: fade(f, 16), transform: `translateY(${riseY(f, 16)}px)` }}>
                <svg width={700} height={320} viewBox="0 0 840 420">
                    <path d="M 140 300 Q 140 180 300 175 Q 340 80 480 86 Q 620 70 650 180 Q 780 190 770 300 Q 760 370 660 378 L 280 378 Q 140 372 140 300 Z"
                          fill="rgba(224, 236, 254, 0.6)" stroke={P.primary} strokeWidth={5} />
                    {[0, 1, 2].map(i => (
                        <g key={i} transform={`translate(${320 + i * 70} 200)`}>
                            <rect x={0} y={0} width={60} height={140} rx={4} fill={P.ink} opacity={fade(f, 30 + i * 5)} />
                            <rect x={6} y={14} width={48} height={6} fill={P.emerald} opacity={fade(f, 30 + i * 5)} />
                            {[28, 42, 56, 70, 84].map((y, k) => (
                                <rect key={k} x={6} y={y} width={48} height={6} fill={P.mist} opacity={fade(f, 30 + i * 5)} />
                            ))}
                        </g>
                    ))}
                </svg>
            </div>
            {/* answer banner */}
            <div style={{
                width: '100%',
                background: P.surface, borderRadius: 24, padding: '26px 44px',
                borderLeft: `12px solid ${P.primary}`, textAlign: 'center',
                boxShadow: '0 16px 36px rgba(37,99,235,0.12)',
                opacity: fade(f, 56), transform: `translateY(${riseY(f, 56)}px)`,
            }}>
                <div style={{ fontSize: 38, fontWeight: 800, color: P.ink, lineHeight: 1.45 }}>
                    魔法の雲じゃない。<br />
                    <span style={{ color: P.primary }}>公共インフラとして売られる</span>コンピューティング。
                </div>
            </div>
        </div>
    </Stage>
);

/* =================================================================
 * Export
 * ================================================================= */
export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9,
    Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16, Scene17, Scene18, Scene19,
    Scene20, Scene21, Scene22, Scene23, Scene24, Scene25, Scene26, Scene27, Scene28, Scene29,
];

export const SCENE_TITLES: string[] = [
    '今日の問い', '身近なクラウド', '60年前の予言', '1961年の講演', 'タイムシェア時代',
    '1996年の戦略書', '2006年のEC2', 'NISTという組織', '5つの特徴', 'ただの借り物じゃない',
    '3つのモデル', 'ピザで例える', 'IaaSの中身', 'PaaSの中身', 'SaaSの中身',
    '雲の居場所', 'アシュバーン', '1サイトの規模', '415TWh', '海底148万キロ',
    '便利の逆側', '定常負荷の話', '37signalsの決断', 'Dropboxの離脱', '1兆ドルの逆説',
    '出るのが高い', '86パーセント', '誰かのコンピュータ', '使い分けの話', '冒頭に戻る',
];
