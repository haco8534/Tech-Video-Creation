import React from 'react';
import { interpolate, Img, staticFile } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

// Palette: 海底ケーブルの深い青 / データの流れる水色 / 人間の温かみ / 遮断の警告
const P = {
    ...BASE_COLORS,
    primary: '#1F6FEB',
    primaryDeep: '#0B3D91',
    primaryGlow: 'rgba(31,111,235,0.28)',
    cyan: '#06B6D4',
    cyanDeep: '#0E7490',
    accent: '#10B981',
    accentDeep: '#047857',
    amber: '#F59E0B',
    amberDeep: '#B45309',
    rose: '#E11D48',
    violet: '#7C3AED',
    gold: '#CA8A04',
    ink: '#0F172A',
    paper: '#FFFFFF',
    muted: '#94A3B8',
    panel: 'rgba(255,255,255,0.92)',
    border: 'rgba(15, 23, 42, 0.10)',
    grid: 'rgba(11, 61, 145, 0.10)',
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
        borderRadius: 22, padding: '24px 32px',
        boxShadow: '0 14px 36px rgba(15, 23, 42, 0.08)',
        ...style,
    }}>{children}</div>
);

// ───────────────────────────────────────────────
// Scene 0: 質問からスタート — 電話先がない
// ───────────────────────────────────────────────
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center', width: 1200 }}>
            <div style={{ fontSize: 40, color: P.muted, letterSpacing: 8, marginBottom: 24, opacity: fade(f, 2) }}>
                今日のテーマ
            </div>
            <div style={{
                fontSize: 88, fontWeight: 900, letterSpacing: 1,
                background: `linear-gradient(135deg, ${P.primaryDeep} 0%, ${P.cyan} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.18, opacity: fade(f, 8),
                transform: `translateY(${rise(f, 8)}px)`,
            }}>
                インターネットを<br />誰が動かしているのか
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 56, opacity: fade(f, 28) }}>
                <svg viewBox="0 0 240 200" width={300} height={250}>
                    <defs>
                        <radialGradient id="phoneGlow0">
                            <stop offset="0%" stopColor={P.primaryGlow} />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                    <circle cx="120" cy="100" r="90" fill="url(#phoneGlow0)" opacity={fade(f, 30)} />
                    {/* 受話器 */}
                    <g transform="translate(120 100)" opacity={fade(f, 32)}>
                        <path d="M -55 -20 L -25 -50 L 25 0 L 55 -30 L 25 -60 Q -10 -95 -45 -60 Z"
                            fill={P.primaryDeep} stroke={P.ink} strokeWidth="2" />
                        <line x1="-25" y1="-50" x2="-45" y2="-60" stroke={P.ink} strokeWidth="2" />
                    </g>
                    {/* ?マーク */}
                    {[
                        { x: 30, y: 30, d: 38 },
                        { x: 200, y: 40, d: 46 },
                        { x: 35, y: 165, d: 54 },
                        { x: 200, y: 160, d: 60 },
                    ].map((q, i) => (
                        <text key={i} x={q.x} y={q.y} fontSize="56" fontWeight="900" fill={P.rose}
                            opacity={fade(f, q.d)}>?</text>
                    ))}
                </svg>
            </div>
            <div style={{ fontSize: 38, color: P.ink, marginTop: 32, opacity: fade(f, 56), fontWeight: 700 }}>
                止めたい時、どこに電話する？
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 1: 今日話すこと — 4つの問い
// ───────────────────────────────────────────────
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { n: '1', title: '誰が作った？', sub: '1969〜', color: P.amber },
        { n: '2', title: '今は誰が管理？', sub: '4つの組織', color: P.primary },
        { n: '3', title: '物理的に？', sub: '海底ケーブル', color: P.cyan },
        { n: '4', title: '止められる？', sub: '国 vs 世界', color: P.rose },
    ];
    return (
        <Stage>
            <div style={{ width: 1300 }}>
                <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 800, color: P.ink, marginBottom: 40, opacity: fade(f, 2) }}>
                    4つの問いで解きほぐす
                </div>
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                    {items.map((it, i) => (
                        <Card key={it.n} style={{
                            width: 280, textAlign: 'center', padding: '32px 20px',
                            transform: `translateY(${rise(f, 8 + i * 8)}px)`,
                            opacity: fade(f, 8 + i * 8),
                            borderTop: `6px solid ${it.color}`,
                        }}>
                            <div style={{
                                width: 78, height: 78, borderRadius: '50%',
                                background: it.color, color: P.paper,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 42, fontWeight: 900, margin: '0 auto 18px',
                            }}>{it.n}</div>
                            <div style={{ fontSize: 30, fontWeight: 800, color: P.ink, marginBottom: 8 }}>{it.title}</div>
                            <div style={{ fontSize: 22, color: P.muted }}>{it.sub}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 2: 1969年UCLA — 初メッセージ "lo"
// ───────────────────────────────────────────────
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1400 }}>
            <div style={{ textAlign: 'center', opacity: fade(f, 2) }}>
                <div style={{ display: 'inline-block', padding: '8px 28px', background: P.amber, color: P.paper, borderRadius: 999, fontSize: 28, fontWeight: 800, letterSpacing: 4 }}>
                    1969年10月29日 22:30
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginTop: 60, position: 'relative' }}>
                {/* UCLA */}
                <div style={{
                    width: 320, opacity: fade(f, 8), transform: `translateY(${rise(f, 8)}px)`,
                    textAlign: 'center',
                }}>
                    <svg viewBox="0 0 220 180" width={220} height={180} style={{ display: 'block', margin: '0 auto' }}>
                        <rect x="30" y="40" width="160" height="110" rx="6" fill={P.primaryDeep} />
                        <rect x="40" y="55" width="140" height="80" rx="3" fill="#0a0a0a" />
                        <text x="110" y="100" fontSize="20" fill={P.accent} textAnchor="middle" fontFamily="monospace">login</text>
                        <rect x="80" y="150" width="60" height="8" fill="#444" />
                        <rect x="60" y="158" width="100" height="6" fill="#222" />
                    </svg>
                    <div style={{ fontSize: 32, fontWeight: 800, color: P.ink, marginTop: 8 }}>UCLA</div>
                    <div style={{ fontSize: 22, color: P.muted }}>カリフォルニア大学</div>
                </div>

                {/* 矢印とメッセージ */}
                <div style={{ flex: 1, position: 'relative', height: 220 }}>
                    <svg viewBox="0 0 600 200" width="100%" height="200" style={{ display: 'block' }}>
                        <line x1="20" y1="100" x2="580" y2="100" stroke={P.primary} strokeWidth="6"
                            strokeDasharray="14 10"
                            strokeDashoffset={interpolate(f, [16, 60], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                            opacity={fade(f, 16)} />
                        <polygon points="565,86 600,100 565,114" fill={P.primary} opacity={fade(f, 28)} />
                        {/* 送信中のパケット */}
                        <g opacity={fade(f, 32)}>
                            <rect x="240" y="40" width="80" height="50" rx="6" fill={P.paper} stroke={P.primaryDeep} strokeWidth="3" />
                            <text x="280" y="74" fontSize="36" fontWeight="900" fill={P.primaryDeep} textAnchor="middle" fontFamily="monospace">l o</text>
                        </g>
                        {/* CRASHアイコン */}
                        <g opacity={fade(f, 60)} transform="translate(440 130)">
                            <polygon points="0,0 16,-30 26,-10 50,-22 36,4 56,2 30,28 18,12 -4,30 8,8 -22,12"
                                fill={P.rose} stroke={P.ink} strokeWidth="2" />
                            <text x="60" y="20" fontSize="22" fontWeight="900" fill={P.rose}>CRASH</text>
                        </g>
                    </svg>
                </div>

                {/* Stanford */}
                <div style={{
                    width: 320, opacity: fade(f, 16), transform: `translateY(${rise(f, 16)}px)`,
                    textAlign: 'center',
                }}>
                    <svg viewBox="0 0 220 180" width={220} height={180} style={{ display: 'block', margin: '0 auto' }}>
                        <rect x="30" y="40" width="160" height="110" rx="6" fill={P.primaryDeep} />
                        <rect x="40" y="55" width="140" height="80" rx="3" fill="#0a0a0a" />
                        <text x="110" y="100" fontSize="22" fill={P.rose} textAnchor="middle" fontFamily="monospace" opacity={fade(f, 60)}>× × ×</text>
                        <rect x="80" y="150" width="60" height="8" fill="#444" />
                        <rect x="60" y="158" width="100" height="6" fill="#222" />
                    </svg>
                    <div style={{ fontSize: 32, fontWeight: 800, color: P.ink, marginTop: 8 }}>Stanford</div>
                    <div style={{ fontSize: 22, color: P.muted }}>研究所</div>
                </div>
            </div>
            <div style={{
                textAlign: 'center', fontSize: 30, color: P.ink, marginTop: 40, opacity: fade(f, 80),
                fontWeight: 700,
            }}>
                インターネットの直接のご先祖、<span style={{ color: P.primary }}>ARPANET</span>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 3: 発注者と実装者 — ARPA → BBN
// ───────────────────────────────────────────────
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1300 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
                <Card style={{
                    width: 360, textAlign: 'center', padding: '40px 32px',
                    opacity: fade(f, 4), transform: `translateY(${rise(f, 4)}px)`,
                    borderTop: `6px solid ${P.amber}`,
                }}>
                    <div style={{ fontSize: 22, color: P.muted, letterSpacing: 4, marginBottom: 8 }}>発注</div>
                    <div style={{ fontSize: 64, fontWeight: 900, color: P.amberDeep }}>ARPA</div>
                    <div style={{ fontSize: 22, color: P.muted, marginTop: 4 }}>(現 DARPA)</div>
                    <div style={{ fontSize: 24, color: P.ink, marginTop: 18, fontWeight: 700 }}>米国国防高等研究計画局</div>
                </Card>
                <div style={{ opacity: fade(f, 16) }}>
                    <svg viewBox="0 0 120 60" width={120} height={60}>
                        <line x1="6" y1="30" x2="100" y2="30" stroke={P.ink} strokeWidth="6" />
                        <polygon points="100,18 118,30 100,42" fill={P.ink} />
                    </svg>
                    <div style={{ textAlign: 'center', fontSize: 22, color: P.muted, marginTop: 6 }}>契約</div>
                </div>
                <Card style={{
                    width: 360, textAlign: 'center', padding: '40px 32px',
                    opacity: fade(f, 22), transform: `translateY(${rise(f, 22)}px)`,
                    borderTop: `6px solid ${P.primary}`,
                }}>
                    <div style={{ fontSize: 22, color: P.muted, letterSpacing: 4, marginBottom: 8 }}>実装</div>
                    <div style={{ fontSize: 64, fontWeight: 900, color: P.primaryDeep }}>BBN</div>
                    <div style={{ fontSize: 22, color: P.muted, marginTop: 4 }}>(ボストン)</div>
                    <div style={{ fontSize: 24, color: P.ink, marginTop: 18, fontWeight: 700 }}>民間コンサル会社</div>
                </Card>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 4: 核戦争説の訂正
// ───────────────────────────────────────────────
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1400 }}>
            <div style={{ display: 'flex', gap: 36, justifyContent: 'center', alignItems: 'stretch' }}>
                <Card style={{
                    width: 540, padding: '28px 32px',
                    opacity: fade(f, 2), transform: `translateY(${rise(f, 2)}px)`,
                    borderTop: `6px solid ${P.muted}`,
                    background: 'rgba(255,255,255,0.6)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                        <span style={{
                            width: 56, height: 56, background: P.muted, color: P.paper, borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 900,
                        }}>×</span>
                        <span style={{ fontSize: 28, fontWeight: 800, color: P.muted, letterSpacing: 2 }}>よく聞く話</span>
                    </div>
                    <div style={{ fontSize: 30, fontWeight: 700, color: P.ink, lineHeight: 1.55 }}>
                        「核攻撃に耐えるため<br />米軍が作った」
                    </div>
                    <div style={{ marginTop: 16, fontSize: 20, color: P.muted, fontStyle: 'italic' }}>
                        ＊Paul Baran（1964・RAND）の<br />　別の論文と混ざって伝わった
                    </div>
                </Card>
                <Card style={{
                    width: 540, padding: '28px 32px',
                    opacity: fade(f, 22), transform: `translateY(${rise(f, 22)}px)`,
                    borderTop: `6px solid ${P.accent}`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                        <span style={{
                            width: 56, height: 56, background: P.accent, color: P.paper, borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 900,
                        }}>○</span>
                        <span style={{ fontSize: 28, fontWeight: 800, color: P.accentDeep, letterSpacing: 2 }}>本当の動機</span>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: P.ink, lineHeight: 1.55 }}>
                        全国に数台しかない<br />大型コンピューターを<br />研究者で共有したい
                    </div>
                    <div style={{ marginTop: 14, fontSize: 20, color: P.muted, fontStyle: 'italic' }}>
                        ＊ARPA長官 Charles Herzfeld 本人の証言
                    </div>
                </Card>
            </div>
            <div style={{
                textAlign: 'center', marginTop: 36, fontSize: 30, color: P.ink, fontWeight: 700,
                opacity: fade(f, 50),
            }}>
                派手な物語より、地味な「資源共有」が出発点
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 5: TCP/IPの発明者
// ───────────────────────────────────────────────
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1300 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 32 }}>
                {[
                    { name: 'Vint Cerf', role: 'TCP/IP 共同設計', color: P.primary, delay: 4 },
                    { name: 'Bob Kahn', role: 'TCP/IP 共同設計', color: P.cyan, delay: 12 },
                ].map((p) => (
                    <Card key={p.name} style={{
                        width: 360, textAlign: 'center', padding: '28px 24px',
                        opacity: fade(f, p.delay), transform: `translateY(${rise(f, p.delay)}px)`,
                        borderTop: `6px solid ${p.color}`,
                    }}>
                        <svg viewBox="0 0 100 100" width={100} height={100} style={{ display: 'block', margin: '0 auto 12px' }}>
                            <circle cx="50" cy="38" r="22" fill={p.color} opacity="0.85" />
                            <path d="M 18 92 Q 50 60 82 92 Z" fill={p.color} opacity="0.85" />
                        </svg>
                        <div style={{ fontSize: 32, fontWeight: 900, color: P.ink }}>{p.name}</div>
                        <div style={{ fontSize: 22, color: P.muted, marginTop: 6 }}>{p.role}</div>
                    </Card>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 0, alignItems: 'center', opacity: fade(f, 26) }}>
                <div style={{ fontSize: 26, color: P.muted, marginRight: 16 }}>1974</div>
                <div style={{ width: 50, height: 4, background: P.primary }} />
                <div style={{ padding: '12px 28px', borderRadius: 12, background: P.primaryDeep, color: P.paper, fontSize: 30, fontWeight: 800, margin: '0 -2px' }}>
                    原型発表
                </div>
                <div style={{ width: 100, height: 4, background: P.primary }} />
                <div style={{ padding: '12px 28px', borderRadius: 12, background: P.primary, color: P.paper, fontSize: 28, fontWeight: 800, opacity: fade(f, 36) }}>
                    1981 RFC 791 / 793
                </div>
                <div style={{ width: 50, height: 4, background: P.primary, opacity: fade(f, 36) }} />
                <div style={{ fontSize: 26, color: P.muted, marginLeft: 16, opacity: fade(f, 36) }}>仕様確定</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 40, fontSize: 32, color: P.ink, fontWeight: 700, opacity: fade(f, 56) }}>
                通称、<span style={{ color: P.primaryDeep }}>「インターネットの父」</span>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 6: WWWは別の発明 — 電気と家電
// ───────────────────────────────────────────────
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1280 }}>
            <div style={{ textAlign: 'center', fontSize: 30, color: P.ink, fontWeight: 700, marginBottom: 28, opacity: fade(f, 2) }}>
                Tim Berners-Lee（1989・CERN）が作ったのは「Web」
            </div>
            {/* 電気と家電 アナロジー */}
            <div style={{ width: 1100, margin: '0 auto' }}>
                {/* 上段: アプリ群 */}
                <div style={{ display: 'flex', gap: 16, justifyContent: 'space-around', marginBottom: 8 }}>
                    {[
                        { name: 'Web', sub: 'WWW', color: P.primary, delay: 12 },
                        { name: 'メール', sub: 'SMTP', color: P.cyan, delay: 20 },
                        { name: 'FTP', sub: 'ファイル転送', color: P.amber, delay: 28 },
                        { name: 'チャット', sub: 'IRC ほか', color: P.violet, delay: 36 },
                    ].map((a) => (
                        <div key={a.name} style={{
                            width: 240, textAlign: 'center', padding: '16px 12px',
                            background: P.paper, border: `3px solid ${a.color}`, borderRadius: 14,
                            opacity: fade(f, a.delay), transform: `translateY(${rise(f, a.delay)}px)`,
                        }}>
                            <div style={{ fontSize: 30, fontWeight: 800, color: P.ink }}>{a.name}</div>
                            <div style={{ fontSize: 18, color: P.muted, marginTop: 4 }}>{a.sub}</div>
                        </div>
                    ))}
                </div>
                {/* 接続線 */}
                <svg viewBox="0 0 1100 50" width={1100} height={50} style={{ display: 'block' }}>
                    {[120, 380, 640, 900].map((x, i) => (
                        <line key={i} x1={x} y1={0} x2={x} y2={48}
                            stroke={P.muted} strokeWidth="3" strokeDasharray="4 4"
                            opacity={fade(f, 44 + i * 2)} />
                    ))}
                </svg>
                {/* 下段: インターネット = インフラ */}
                <div style={{
                    background: `linear-gradient(180deg, ${P.primary} 0%, ${P.primaryDeep} 100%)`,
                    color: P.paper, borderRadius: 16, padding: '36px 48px', textAlign: 'center',
                    opacity: fade(f, 8), transform: `translateY(${rise(f, 8)}px)`,
                    boxShadow: '0 12px 32px rgba(11,61,145,0.25)',
                }}>
                    <div style={{ fontSize: 22, opacity: 0.85, letterSpacing: 6, marginBottom: 4 }}>INFRASTRUCTURE</div>
                    <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: 2 }}>インターネット</div>
                    <div style={{ fontSize: 22, opacity: 0.85, marginTop: 4 }}>通信インフラ（TCP/IP）</div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 24, fontSize: 26, color: P.muted, opacity: fade(f, 56) }}>
                電気（インフラ） vs 家電（アプリ）の関係
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 7: 1995年に政府が手を引いた
// ───────────────────────────────────────────────
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1300 }}>
            <div style={{
                position: 'relative', height: 360, marginBottom: 16,
            }}>
                {/* timeline base */}
                <svg viewBox="0 0 1300 360" width={1300} height={360}>
                    <line x1="60" y1="180" x2="1240" y2="180" stroke={P.muted} strokeWidth="4" opacity={fade(f, 2)} />
                    {[
                        { x: 250, y: -1, label: '1969', sub: 'ARPANET' },
                        { x: 660, y: 1, label: '1995/4/30', sub: 'NSFNET 退役' },
                        { x: 1100, y: -1, label: '現在', sub: '民間 ISP 運用' },
                    ].map((t, i) => (
                        <g key={t.label} opacity={fade(f, 6 + i * 14)}>
                            <circle cx={t.x} cy="180" r="14" fill={i === 1 ? P.rose : P.primary} />
                            <line x1={t.x} y1="180" x2={t.x} y2={180 + t.y * 90} stroke={P.muted} strokeWidth="2" strokeDasharray="6 4" />
                            <text x={t.x} y={t.y > 0 ? 295 : 130} fontSize="32" fontWeight="900"
                                fill={i === 1 ? P.rose : P.primaryDeep} textAnchor="middle">{t.label}</text>
                            <text x={t.x} y={t.y > 0 ? 330 : 100} fontSize="24"
                                fill={P.ink} textAnchor="middle">{t.sub}</text>
                        </g>
                    ))}
                </svg>
                {/* 中央の強調 */}
                <div style={{
                    position: 'absolute', left: 530, top: 18, width: 240,
                    opacity: fade(f, 30), transform: `translateY(${rise(f, 30)}px)`,
                }}>
                    <div style={{
                        background: P.rose, color: P.paper, padding: '14px 20px', borderRadius: 12,
                        textAlign: 'center', fontSize: 26, fontWeight: 900,
                        boxShadow: '0 12px 28px rgba(225,29,72,0.3)',
                    }}>政府、ここで撤退</div>
                </div>
            </div>
            <div style={{
                textAlign: 'center', fontSize: 30, color: P.ink, fontWeight: 700,
                opacity: fade(f, 48),
            }}>
                作ったのはアメリカ政府。<span style={{ color: P.rose }}>でもずっとは持っていなかった。</span>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 8: ICANNの仕事 — 識別子だけ
// ───────────────────────────────────────────────
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1280 }}>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Card style={{
                    width: 480, padding: '28px 32px',
                    opacity: fade(f, 2), transform: `translateY(${rise(f, 2)}px)`,
                    borderTop: `6px solid ${P.accent}`,
                }}>
                    <div style={{ fontSize: 28, color: P.accentDeep, fontWeight: 800, letterSpacing: 4, marginBottom: 14 }}>
                        ○ やる
                    </div>
                    <div style={{ fontSize: 38, fontWeight: 900, color: P.primaryDeep, marginBottom: 18 }}>ICANN</div>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 14, opacity: fade(f, 12) }}>
                        <div style={{ flex: 1, padding: '14px 8px', background: '#EEF6FF', border: `2px solid ${P.primary}`, borderRadius: 10, textAlign: 'center' }}>
                            <div style={{ fontSize: 18, color: P.muted }}>名前</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: P.primaryDeep, fontFamily: 'monospace' }}>youtube.com</div>
                        </div>
                        <div style={{ flex: 1, padding: '14px 8px', background: '#EEF6FF', border: `2px solid ${P.primary}`, borderRadius: 10, textAlign: 'center' }}>
                            <div style={{ fontSize: 18, color: P.muted }}>番号</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: P.primaryDeep, fontFamily: 'monospace' }}>142.250.x.x</div>
                        </div>
                    </div>
                    <div style={{ fontSize: 22, color: P.ink, opacity: fade(f, 18) }}>
                        重複しないよう、世界で1つに調整する役
                    </div>
                </Card>
                <Card style={{
                    width: 480, padding: '28px 32px',
                    opacity: fade(f, 26), transform: `translateY(${rise(f, 26)}px)`,
                    borderTop: `6px solid ${P.muted}`,
                    background: 'rgba(255,255,255,0.6)',
                }}>
                    <div style={{ fontSize: 28, color: P.muted, fontWeight: 800, letterSpacing: 4, marginBottom: 14 }}>
                        × やらない
                    </div>
                    <div style={{ fontSize: 22, color: P.ink, lineHeight: 1.9 }}>
                        {['コンテンツの管理', 'ISPの運営', 'プロトコルの策定', '経路（ルーティング）の制御'].map((it, i) => (
                            <div key={it} style={{
                                display: 'flex', alignItems: 'center', gap: 12, opacity: fade(f, 32 + i * 6),
                            }}>
                                <span style={{ color: P.rose, fontWeight: 900, fontSize: 26 }}>×</span>
                                <span style={{ textDecoration: 'line-through', color: P.muted }}>{it}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            <div style={{ textAlign: 'center', marginTop: 30, fontSize: 26, color: P.ink, opacity: fade(f, 64) }}>
                「インターネットの管理会社」と思われがち。<span style={{ color: P.rose, fontWeight: 700 }}>実は識別子の調整だけ。</span>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 9: IETFの意思決定 — Rough Consensus
// ───────────────────────────────────────────────
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1300 }}>
            {/* 引用 */}
            <div style={{
                background: P.paper, border: `3px solid ${P.primary}`,
                borderRadius: 18, padding: '28px 40px',
                fontSize: 30, color: P.ink, fontWeight: 600, lineHeight: 1.55,
                position: 'relative',
                opacity: fade(f, 2), transform: `translateY(${rise(f, 2)}px)`,
                marginBottom: 32,
            }}>
                <span style={{ position: 'absolute', top: -16, left: 24, background: P.primary, color: P.paper, padding: '4px 14px', borderRadius: 6, fontSize: 18, fontWeight: 800, letterSpacing: 2 }}>
                    David Clark, 1992
                </span>
                <div style={{ fontStyle: 'italic' }}>
                    「我々は<span style={{ background: 'linear-gradient(transparent 60%, #FDE68A 60%)' }}>王も大統領も投票も拒否</span>する。<br />
                    <span style={{ background: 'linear-gradient(transparent 60%, #FDE68A 60%)' }}>ラフコンセンサスと動くコード</span>を信じる」
                </div>
            </div>
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center' }}>
                {[
                    { sym: '×', label: '多数決', color: P.muted, delay: 22 },
                    { sym: '×', label: '会員登録', color: P.muted, delay: 28 },
                    { sym: '×', label: '会費', color: P.muted, delay: 34 },
                    { sym: '○', label: 'ハミング', color: P.accent, delay: 40 },
                    { sym: '○', label: '動くコード', color: P.accent, delay: 46 },
                    { sym: '○', label: 'Tシャツ可', color: P.accent, delay: 52 },
                ].map((it) => (
                    <div key={it.label} style={{
                        width: 165, padding: '18px 8px', background: P.paper,
                        border: `3px solid ${it.color}`, borderRadius: 14, textAlign: 'center',
                        opacity: fade(f, it.delay), transform: `translateY(${rise(f, it.delay)}px)`,
                    }}>
                        <div style={{ fontSize: 38, fontWeight: 900, color: it.color }}>{it.sym}</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: P.ink, marginTop: 4 }}>{it.label}</div>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 24, fontSize: 22, color: P.muted, opacity: fade(f, 64) }}>
                ＊RFC 7282 に正式記述
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 10: RIRの地域分散 — 5つの地域
// ───────────────────────────────────────────────
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1400 }}>
            <div style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, color: P.ink, marginBottom: 32, opacity: fade(f, 2) }}>
                IPアドレスは<span style={{ color: P.primary }}>5つの地域</span>に分けて配布
            </div>
            {/* 簡易世界マップ */}
            <svg viewBox="0 0 1100 380" width={1100} height={380} style={{ display: 'block', margin: '0 auto' }}>
                {/* 大陸の楕円形シルエット（簡略） */}
                <ellipse cx="240" cy="160" rx="140" ry="80" fill={P.primaryGlow} opacity="0.5" />
                <ellipse cx="540" cy="140" rx="120" ry="70" fill={P.primaryGlow} opacity="0.5" />
                <ellipse cx="820" cy="170" rx="160" ry="90" fill={P.primaryGlow} opacity="0.5" />
                <ellipse cx="350" cy="290" rx="110" ry="60" fill={P.primaryGlow} opacity="0.5" />
                <ellipse cx="600" cy="290" rx="90" ry="60" fill={P.primaryGlow} opacity="0.5" />

                {[
                    { x: 240, y: 160, name: 'ARIN', region: '北米', hq: 'アメリカ', delay: 8 },
                    { x: 540, y: 140, name: 'RIPE NCC', region: 'ヨーロッパ', hq: 'オランダ', delay: 16 },
                    { x: 820, y: 170, name: 'APNIC', region: 'アジア太平洋', hq: 'オーストラリア', delay: 24 },
                    { x: 350, y: 290, name: 'LACNIC', region: '中南米', hq: 'ウルグアイ', delay: 32 },
                    { x: 600, y: 290, name: 'AFRINIC', region: 'アフリカ', hq: 'モーリシャス', delay: 40 },
                ].map(r => (
                    <g key={r.name} opacity={fade(f, r.delay)}>
                        <circle cx={r.x} cy={r.y} r="22" fill={P.primary} stroke={P.paper} strokeWidth="4" />
                        <text x={r.x} y={r.y + 7} fontSize="20" fontWeight="900" fill={P.paper} textAnchor="middle">5</text>
                        <rect x={r.x - 90} y={r.y + 32} width="180" height="60" rx="8" fill={P.paper} stroke={P.primary} strokeWidth="2" />
                        <text x={r.x} y={r.y + 56} fontSize="22" fontWeight="900" fill={P.primaryDeep} textAnchor="middle">{r.name}</text>
                        <text x={r.x} y={r.y + 80} fontSize="18" fill={P.muted} textAnchor="middle">{r.region}</text>
                    </g>
                ))}
            </svg>
            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 24, color: P.muted, opacity: fade(f, 56) }}>
                本社の国もバラバラ。世界中の合計5つに分散。
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 11: W3Cとまとめ — 横並びの4組織
// ───────────────────────────────────────────────
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1380 }}>
            <div style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, color: P.ink, marginBottom: 30, opacity: fade(f, 2) }}>
                4つの組織が<span style={{ color: P.primary }}>横並びで分業</span>
            </div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
                {[
                    { name: 'ICANN', task: '識別子\n（名前と番号）', color: P.amber, delay: 8 },
                    { name: 'IETF', task: 'プロトコル\n（通信ルール）', color: P.primary, delay: 14 },
                    { name: 'RIR ×5', task: 'IPアドレスを\n地域ごとに配布', color: P.cyan, delay: 20 },
                    { name: 'W3C', task: 'Webの標準\n（HTML/CSS）', color: P.violet, delay: 26 },
                ].map((o) => (
                    <Card key={o.name} style={{
                        width: 290, textAlign: 'center', padding: '24px 16px',
                        opacity: fade(f, o.delay), transform: `translateY(${rise(f, o.delay)}px)`,
                        borderTop: `6px solid ${o.color}`,
                    }}>
                        <div style={{ fontSize: 36, fontWeight: 900, color: o.color, letterSpacing: 1 }}>{o.name}</div>
                        <div style={{ fontSize: 22, color: P.ink, marginTop: 12, whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                            {o.task}
                        </div>
                    </Card>
                ))}
            </div>
            {/* ピラミッド否定 */}
            <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center', gap: 60, alignItems: 'center', opacity: fade(f, 44) }}>
                <div style={{ textAlign: 'center' }}>
                    <svg viewBox="0 0 120 100" width={120} height={100}>
                        <polygon points="60,10 110,90 10,90" fill="none" stroke={P.muted} strokeWidth="4" />
                        <line x1="20" y1="20" x2="100" y2="20" stroke={P.rose} strokeWidth="6" />
                    </svg>
                    <div style={{ fontSize: 22, color: P.muted, marginTop: 4 }}>× ピラミッド</div>
                </div>
                <div style={{ fontSize: 36, color: P.ink, fontWeight: 800 }}>↓</div>
                <div style={{ textAlign: 'center' }}>
                    <svg viewBox="0 0 200 100" width={200} height={100}>
                        {[20, 60, 100, 140].map(x => (
                            <rect key={x} x={x - 12} y={30} width="24" height="50" rx="3" fill={P.primary} />
                        ))}
                        <line x1="20" y1="55" x2="160" y2="55" stroke={P.primaryDeep} strokeWidth="3" strokeDasharray="6 4" />
                    </svg>
                    <div style={{ fontSize: 22, color: P.primaryDeep, marginTop: 4, fontWeight: 700 }}>○ 横並び</div>
                </div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 12: クラウドの実体 — 99%が海底
// ───────────────────────────────────────────────
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => {
    // ドーナツチャート 99% vs 1%
    const r = 110;
    const c = 2 * Math.PI * r;
    return (
        <Stage>
            <div style={{ width: 1300 }}>
                <div style={{ textAlign: 'center', fontSize: 34, fontWeight: 800, color: P.ink, marginBottom: 24, opacity: fade(f, 2) }}>
                    国際通信の<span style={{ color: P.primaryDeep }}>99%</span>は海の底
                </div>
                <div style={{ display: 'flex', gap: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <svg viewBox="0 0 280 280" width={280} height={280}>
                        <circle cx="140" cy="140" r={r} fill="none" stroke={P.muted} strokeWidth="36" opacity="0.25" />
                        <circle cx="140" cy="140" r={r} fill="none" stroke={P.primaryDeep} strokeWidth="36"
                            strokeDasharray={c} strokeDashoffset={interpolate(f, [10, 50], [c, c * 0.01], { extrapolateRight: 'clamp' })}
                            transform="rotate(-90 140 140)" strokeLinecap="butt" />
                        <text x="140" y="135" fontSize="56" fontWeight="900" fill={P.primaryDeep} textAnchor="middle">99%</text>
                        <text x="140" y="170" fontSize="22" fill={P.muted} textAnchor="middle">海底ケーブル</text>
                    </svg>
                    <div>
                        {[
                            { v: '694本', sub: '世界の海底ケーブル本数', delay: 18 },
                            { v: '150万km', sub: '総延長（地球〜月の約4倍）', delay: 30 },
                            { v: '1%未満', sub: '衛星通信の割合', delay: 42 },
                        ].map((s) => (
                            <div key={s.v} style={{
                                marginBottom: 18, padding: '16px 28px',
                                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 14,
                                minWidth: 460,
                                opacity: fade(f, s.delay), transform: `translateX(${interpolate(f, [s.delay, s.delay + 18], [24, 0], { extrapolateRight: 'clamp' })}px)`,
                            }}>
                                <div style={{ fontSize: 44, fontWeight: 900, color: P.primaryDeep, lineHeight: 1 }}>{s.v}</div>
                                <div style={{ fontSize: 22, color: P.muted, marginTop: 4 }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 14, fontSize: 22, color: P.muted, opacity: fade(f, 56) }}>
                    出典: TeleGeography 2026
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 13: 漁船で切れる
// ───────────────────────────────────────────────
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    const total = 200;
    const fishing = Math.round(total * 0.8);
    return (
        <Stage>
            <div style={{ width: 1300 }}>
                <div style={{ textAlign: 'center', fontSize: 34, fontWeight: 800, color: P.ink, marginBottom: 8, opacity: fade(f, 2) }}>
                    年に <span style={{ color: P.rose }}>150〜200回</span> 切れている
                </div>
                <div style={{ textAlign: 'center', fontSize: 22, color: P.muted, marginBottom: 28, opacity: fade(f, 6) }}>
                    原因の8割が、漁船の錨か底引き網
                </div>
                {/* バーチャート */}
                <div style={{ width: 1100, margin: '0 auto', padding: '24px 40px', background: P.paper, borderRadius: 18, border: `2px solid ${P.border}` }}>
                    {[
                        { label: '漁船の錨・底引き網', pct: 80, color: P.primary, delay: 12 },
                        { label: '自然災害（地震ほか）', pct: 14, color: P.cyan, delay: 24 },
                        { label: 'サメなど海洋生物', pct: 6, color: P.accent, delay: 36 },
                    ].map((b) => (
                        <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, opacity: fade(f, b.delay) }}>
                            <div style={{ width: 320, fontSize: 24, fontWeight: 700, color: P.ink, textAlign: 'right' }}>{b.label}</div>
                            <div style={{ flex: 1, height: 46, background: '#F0F4FA', borderRadius: 6, overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${interpolate(f, [b.delay + 4, b.delay + 24], [0, b.pct], { extrapolateRight: 'clamp' })}%`,
                                    background: `linear-gradient(90deg, ${b.color}, ${b.color}dd)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                                    paddingRight: 16, color: P.paper, fontSize: 22, fontWeight: 800,
                                }}>
                                    {b.pct}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 24, fontSize: 26, color: P.ink, opacity: fade(f, 60), fontWeight: 700 }}>
                    「クラウド」のイメージから一番遠い、<span style={{ color: P.primaryDeep }}>アナログな現実</span>
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 14: Netflixの配信 — Open Connect
// ───────────────────────────────────────────────
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1380 }}>
            <div style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, color: P.ink, marginBottom: 24, opacity: fade(f, 2) }}>
                95%は<span style={{ color: P.primary }}>近所のISP</span>から届いている
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 0, alignItems: 'center' }}>
                {/* 左: Netflix */}
                <div style={{
                    width: 240, opacity: fade(f, 6), transform: `translateY(${rise(f, 6)}px)`,
                    textAlign: 'center',
                }}>
                    <div style={{ background: P.paper, padding: 18, borderRadius: 14, border: `3px solid ${P.rose}` }}>
                        <Img src={staticFile('brand-icons/netflix.svg')} style={{ width: 160, height: 'auto', display: 'block', margin: '0 auto' }} />
                    </div>
                    <div style={{ fontSize: 22, color: P.muted, marginTop: 10 }}>米国本社</div>
                </div>
                {/* 矢印1 */}
                <svg viewBox="0 0 140 60" width={140} height={60} style={{ opacity: fade(f, 14) }}>
                    <line x1="6" y1="30" x2="120" y2="30" stroke={P.primary} strokeWidth="4" strokeDasharray="8 6" />
                    <polygon points="120,18 138,30 120,42" fill={P.primary} />
                    <text x="70" y="22" fontSize="16" fill={P.muted} textAnchor="middle">先回り配信</text>
                </svg>
                {/* 中央: ISPの中の箱 */}
                <div style={{
                    width: 320, opacity: fade(f, 22), transform: `translateY(${rise(f, 22)}px)`,
                    textAlign: 'center',
                }}>
                    <div style={{ background: P.primaryDeep, color: P.paper, padding: '20px 16px', borderRadius: 14 }}>
                        <div style={{ fontSize: 22, opacity: 0.85, letterSpacing: 4 }}>NTT / KDDI など</div>
                        <div style={{ fontSize: 32, fontWeight: 900, marginTop: 6 }}>ISPのビル内</div>
                        <div style={{
                            marginTop: 14, padding: '14px 18px', background: P.rose, borderRadius: 10,
                            fontSize: 26, fontWeight: 800, letterSpacing: 1,
                        }}>
                            <div>📦 Open Connect</div>
                            <div style={{ fontSize: 18, opacity: 0.85 }}>専用キャッシュ箱</div>
                        </div>
                    </div>
                </div>
                {/* 矢印2 */}
                <svg viewBox="0 0 140 60" width={140} height={60} style={{ opacity: fade(f, 32) }}>
                    <line x1="6" y1="30" x2="120" y2="30" stroke={P.accent} strokeWidth="6" />
                    <polygon points="120,16 140,30 120,44" fill={P.accent} />
                    <text x="70" y="22" fontSize="16" fill={P.muted} textAnchor="middle">あなたへ</text>
                </svg>
                {/* 右: 視聴者 */}
                <div style={{
                    width: 200, opacity: fade(f, 38), textAlign: 'center',
                    transform: `translateY(${rise(f, 38)}px)`,
                }}>
                    <svg viewBox="0 0 120 120" width={100} height={100} style={{ display: 'block', margin: '0 auto' }}>
                        <rect x="20" y="30" width="80" height="55" rx="6" fill={P.primaryDeep} />
                        <rect x="26" y="36" width="68" height="42" fill="#0a0a0a" />
                        <rect x="50" y="85" width="20" height="10" fill={P.muted} />
                        <rect x="40" y="95" width="40" height="6" fill={P.muted} />
                    </svg>
                    <div style={{ fontSize: 24, fontWeight: 800, color: P.ink, marginTop: 8 }}>視聴者</div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 32, fontSize: 24, color: P.muted, opacity: fade(f, 50) }}>
                Netflix → ISPへの設置は<span style={{ color: P.accentDeep, fontWeight: 700 }}>無償</span>。世界の95%がこの仕組みで配信。
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 15: 物理層も分散 — ケーブル所有
// ───────────────────────────────────────────────
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1380 }}>
            <div style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, color: P.ink, marginBottom: 24, opacity: fade(f, 2) }}>
                ケーブルもCDNも、<span style={{ color: P.primary }}>多数の会社で分担</span>
            </div>
            <div style={{ display: 'flex', gap: 30, justifyContent: 'center' }}>
                <Card style={{
                    width: 600, padding: '24px 28px',
                    opacity: fade(f, 6), transform: `translateY(${rise(f, 6)}px)`,
                    borderTop: `6px solid ${P.cyan}`,
                }}>
                    <div style={{ fontSize: 24, color: P.cyanDeep, fontWeight: 800, letterSpacing: 4, marginBottom: 12 }}>
                        海底ケーブル所有
                    </div>
                    <div style={{ fontSize: 22, color: P.ink, marginBottom: 12 }}>
                        ＊各国通信会社の<span style={{ fontWeight: 700 }}>共同所有</span>が基本
                    </div>
                    <div style={{
                        background: '#F0FAFF', borderRadius: 12, padding: '16px 20px',
                        opacity: fade(f, 18),
                    }}>
                        <div style={{ fontSize: 20, color: P.muted, marginBottom: 10 }}>近年は巨大IT企業も参入</div>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                            {['google', 'meta', 'microsoft', 'amazon'].map((b, i) => (
                                <div key={b} style={{
                                    background: P.paper, padding: '10px 16px', borderRadius: 10,
                                    border: `2px solid ${P.border}`,
                                    opacity: fade(f, 22 + i * 3),
                                }}>
                                    <Img src={staticFile(`brand-icons/${b}.svg`)} style={{ width: 70, height: 28, objectFit: 'contain', display: 'block' }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ fontSize: 22, color: P.primaryDeep, fontWeight: 800, marginTop: 14, opacity: fade(f, 38) }}>
                            Google だけで世界の<span style={{ fontSize: 32 }}>8.5%</span>に関与
                        </div>
                    </div>
                </Card>
                <Card style={{
                    width: 600, padding: '24px 28px',
                    opacity: fade(f, 28), transform: `translateY(${rise(f, 28)}px)`,
                    borderTop: `6px solid ${P.violet}`,
                }}>
                    <div style={{ fontSize: 24, color: P.violet, fontWeight: 800, letterSpacing: 4, marginBottom: 12 }}>
                        CDN（中継網）
                    </div>
                    <div style={{ fontSize: 22, color: P.ink, marginBottom: 16 }}>
                        コンテンツを世界中に分散配信する仕組み
                    </div>
                    <div style={{ display: 'flex', gap: 16, opacity: fade(f, 40) }}>
                        <div style={{ flex: 1, padding: '20px 16px', background: '#FAF5FF', border: `2px solid ${P.violet}`, borderRadius: 12, textAlign: 'center' }}>
                            <Img src={staticFile('brand-icons/cloudflare.svg')} style={{ width: 130, height: 36, objectFit: 'contain', display: 'block', margin: '0 auto 8px' }} />
                            <div style={{ fontSize: 20, color: P.muted }}>Cloudflare</div>
                        </div>
                        <div style={{ flex: 1, padding: '20px 16px', background: '#FAF5FF', border: `2px solid ${P.violet}`, borderRadius: 12, textAlign: 'center' }}>
                            <Img src={staticFile('brand-icons/akamai.svg')} style={{ width: 130, height: 36, objectFit: 'contain', display: 'block', margin: '0 auto 8px' }} />
                            <div style={{ fontSize: 20, color: P.muted }}>Akamai</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 16, fontSize: 22, color: P.ink, opacity: fade(f, 50) }}>
                        他にも数社で分担。一社独占はない。
                    </div>
                </Card>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 16: 国単位では止まる
// ───────────────────────────────────────────────
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1200, textAlign: 'center' }}>
            <div style={{
                fontSize: 30, color: P.muted, fontWeight: 700, marginBottom: 16,
                opacity: fade(f, 2),
            }}>
                では「インターネットは止められる？」
            </div>
            <div style={{
                fontSize: 76, fontWeight: 900, color: P.ink, lineHeight: 1.25,
                opacity: fade(f, 8), transform: `translateY(${rise(f, 8)}px)`,
            }}>
                国単位なら、<br />
                <span style={{
                    background: `linear-gradient(transparent 60%, ${P.amber}88 60%)`,
                    color: P.rose,
                }}>しょっちゅう止まっている</span>
            </div>
            <div style={{ marginTop: 28, fontSize: 26, color: P.muted, opacity: fade(f, 32) }}>
                自国のISPに命令すれば、<span style={{ color: P.ink, fontWeight: 700 }}>国の中の扉は閉められる</span>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 17: Access Nowの数字
// ───────────────────────────────────────────────
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1380 }}>
            <div style={{ textAlign: 'center', fontSize: 28, color: P.muted, marginBottom: 16, opacity: fade(f, 2), letterSpacing: 4 }}>
                Access Now調べ・2025年
            </div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 30 }}>
                {[
                    { v: '313', sub: '件の遮断', color: P.rose, delay: 8 },
                    { v: '52', sub: 'か国で実施', color: P.amberDeep, delay: 16 },
                    { v: '46億人', sub: '影響を受けた', color: P.primaryDeep, delay: 24 },
                ].map((s) => (
                    <Card key={s.sub} style={{
                        width: 320, textAlign: 'center', padding: '24px 16px',
                        opacity: fade(f, s.delay), transform: `translateY(${rise(f, s.delay)}px)`,
                        borderTop: `6px solid ${s.color}`,
                    }}>
                        <div style={{ fontSize: 80, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.v}</div>
                        <div style={{ fontSize: 24, color: P.muted, marginTop: 8 }}>{s.sub}</div>
                    </Card>
                ))}
            </div>
            <div style={{
                background: P.paper, border: `2px solid ${P.border}`, borderRadius: 16,
                padding: '20px 32px', width: 1100, margin: '0 auto',
                opacity: fade(f, 40),
            }}>
                <div style={{ fontSize: 22, color: P.muted, marginBottom: 12, fontWeight: 700 }}>独自の運用も登場</div>
                <div style={{ display: 'flex', gap: 24, justifyContent: 'space-around' }}>
                    {[
                        { country: '中国', name: 'Great Firewall', delay: 44 },
                        { country: 'ロシア', name: 'RuNet', delay: 50 },
                        { country: 'イラン', name: 'NIN', delay: 56 },
                    ].map((c) => (
                        <div key={c.country} style={{ textAlign: 'center', opacity: fade(f, c.delay) }}>
                            <div style={{ fontSize: 22, color: P.muted }}>{c.country}</div>
                            <div style={{ fontSize: 30, fontWeight: 800, color: P.rose }}>{c.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 18: 世界全体は止められない
// ───────────────────────────────────────────────
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1380 }}>
            <div style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, color: P.ink, marginBottom: 8, opacity: fade(f, 2) }}>
                世界全体を止めるスイッチは
            </div>
            <div style={{ textAlign: 'center', fontSize: 56, fontWeight: 900, color: P.accent, marginBottom: 28, opacity: fade(f, 8) }}>
                存在しない
            </div>
            {/* 4層のレイヤー：分散の理由を縦に並べる */}
            <div style={{ width: 1200, margin: '0 auto' }}>
                {[
                    { layer: '組織', detail: 'ICANN / IETF / RIR / W3C', color: P.amber, delay: 14 },
                    { layer: '物理', detail: '海底ケーブル — 各国・各社の共同所有', color: P.primary, delay: 24 },
                    { layer: '名前解決', detail: 'DNSルートサーバ — 12組織・約2000インスタンス', color: P.cyan, delay: 34 },
                    { layer: '経路', detail: 'BGP — 各ネットワークが自分で経路を決める', color: P.violet, delay: 44 },
                ].map((row) => (
                    <div key={row.layer} style={{
                        display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14,
                        background: P.paper, border: `2px solid ${P.border}`, borderRadius: 12,
                        padding: '14px 20px', borderLeft: `8px solid ${row.color}`,
                        opacity: fade(f, row.delay), transform: `translateX(${interpolate(f, [row.delay, row.delay + 18], [-20, 0], { extrapolateRight: 'clamp' })}px)`,
                    }}>
                        <div style={{
                            width: 130, fontSize: 26, fontWeight: 900, color: row.color,
                        }}>{row.layer}</div>
                        <div style={{ flex: 1, fontSize: 24, color: P.ink }}>{row.detail}</div>
                        <div style={{
                            background: row.color, color: P.paper,
                            padding: '6px 14px', borderRadius: 999, fontSize: 18, fontWeight: 800,
                        }}>分散</div>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 24, fontSize: 26, color: P.muted, opacity: fade(f, 60) }}>
                全体停止の命令を「受け取る主体」が、そもそも存在しない
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 19: 設計思想が先 — End-to-End
// ───────────────────────────────────────────────
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1380 }}>
            <div style={{ textAlign: 'center', fontSize: 28, color: P.muted, marginBottom: 8, opacity: fade(f, 2), letterSpacing: 3 }}>
                Saltzer / Reed / Clark — 1984
            </div>
            <div style={{ textAlign: 'center', fontSize: 38, fontWeight: 900, color: P.primaryDeep, marginBottom: 28, opacity: fade(f, 6) }}>
                End-to-End 原則
            </div>
            {/* 比較：電話 vs インターネット */}
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
                <Card style={{
                    width: 580, padding: '24px 28px',
                    opacity: fade(f, 14), transform: `translateY(${rise(f, 14)}px)`,
                    borderTop: `6px solid ${P.muted}`,
                    background: 'rgba(255,255,255,0.7)',
                }}>
                    <div style={{ fontSize: 22, color: P.muted, fontWeight: 800, letterSpacing: 4, marginBottom: 14 }}>
                        従来の電話網
                    </div>
                    <svg viewBox="0 0 480 130" width={480} height={130} style={{ display: 'block', margin: '0 auto' }}>
                        {/* 電話機（ばか） */}
                        <rect x="20" y="60" width="60" height="40" rx="6" fill={P.muted} />
                        <text x="50" y="125" fontSize="14" fill={P.muted} textAnchor="middle">単純</text>
                        <rect x="400" y="60" width="60" height="40" rx="6" fill={P.muted} />
                        <text x="430" y="125" fontSize="14" fill={P.muted} textAnchor="middle">単純</text>
                        {/* 中央の交換機（賢い） */}
                        <rect x="180" y="20" width="120" height="100" rx="10" fill={P.amber} stroke={P.ink} strokeWidth="3" />
                        <text x="240" y="64" fontSize="20" fontWeight="900" fill={P.paper} textAnchor="middle">交換機</text>
                        <text x="240" y="92" fontSize="16" fill={P.paper} textAnchor="middle">（賢い）</text>
                        <line x1="80" y1="80" x2="180" y2="70" stroke={P.ink} strokeWidth="2" />
                        <line x1="300" y1="70" x2="400" y2="80" stroke={P.ink} strokeWidth="2" />
                    </svg>
                    <div style={{ fontSize: 22, color: P.ink, marginTop: 8, textAlign: 'center' }}>
                        賢さは<span style={{ color: P.amberDeep, fontWeight: 800 }}>真ん中</span>
                    </div>
                </Card>
                <Card style={{
                    width: 580, padding: '24px 28px',
                    opacity: fade(f, 28), transform: `translateY(${rise(f, 28)}px)`,
                    borderTop: `6px solid ${P.accent}`,
                }}>
                    <div style={{ fontSize: 22, color: P.accentDeep, fontWeight: 800, letterSpacing: 4, marginBottom: 14 }}>
                        インターネット
                    </div>
                    <svg viewBox="0 0 480 130" width={480} height={130} style={{ display: 'block', margin: '0 auto' }}>
                        {/* スマホ（賢い） */}
                        <rect x="10" y="40" width="80" height="80" rx="10" fill={P.accent} stroke={P.ink} strokeWidth="3" />
                        <rect x="20" y="50" width="60" height="55" rx="3" fill={P.paper} />
                        <text x="50" y="138" fontSize="14" fill={P.accentDeep} textAnchor="middle" fontWeight="800">賢い</text>
                        {/* サーバー（賢い） */}
                        <rect x="390" y="40" width="80" height="80" rx="6" fill={P.accent} stroke={P.ink} strokeWidth="3" />
                        <line x1="400" y1="60" x2="460" y2="60" stroke={P.paper} strokeWidth="3" />
                        <line x1="400" y1="80" x2="460" y2="80" stroke={P.paper} strokeWidth="3" />
                        <line x1="400" y1="100" x2="460" y2="100" stroke={P.paper} strokeWidth="3" />
                        <text x="430" y="138" fontSize="14" fill={P.accentDeep} textAnchor="middle" fontWeight="800">賢い</text>
                        {/* 中央：土管 */}
                        <rect x="120" y="64" width="240" height="32" rx="4" fill={P.muted} opacity="0.5" />
                        <text x="240" y="86" fontSize="20" fontWeight="800" fill={P.muted} textAnchor="middle">ただの土管</text>
                    </svg>
                    <div style={{ fontSize: 22, color: P.ink, marginTop: 8, textAlign: 'center' }}>
                        賢さは<span style={{ color: P.accentDeep, fontWeight: 800 }}>端末</span>側
                    </div>
                </Card>
            </div>
            <div style={{
                textAlign: 'center', marginTop: 22, fontSize: 24, color: P.muted, opacity: fade(f, 50),
            }}>
                例：暗号化もメッセージアプリもブラウザの鍵も、すべて<span style={{ color: P.ink, fontWeight: 700 }}>端末側</span>で処理
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 20: 最初の問いに戻る
// ───────────────────────────────────────────────
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1280 }}>
            <div style={{ textAlign: 'center', fontSize: 36, fontWeight: 800, color: P.ink, marginBottom: 28, opacity: fade(f, 2) }}>
                改めて — <span style={{ color: P.primaryDeep }}>誰が作ったのか？</span>
            </div>
            <div style={{ width: 1100, margin: '0 auto' }}>
                {[
                    { who: 'Vint Cerf / Bob Kahn', what: 'TCP/IP（通信の文法）', color: P.primary, delay: 8 },
                    { who: 'Tim Berners-Lee', what: 'WWW（Webアプリの土台）', color: P.violet, delay: 16 },
                    { who: 'ARPA', what: '最初の予算', color: P.amber, delay: 24 },
                    { who: 'RFCを書いた数千人', what: '仕様書を積み上げ', color: P.cyan, delay: 32 },
                    { who: 'ISP の現場技術者', what: '日々の運用', color: P.accent, delay: 40 },
                    { who: '海底ケーブル敷設の船員', what: '物理層', color: P.cyanDeep, delay: 48 },
                ].map((r) => (
                    <div key={r.who} style={{
                        display: 'flex', alignItems: 'center', gap: 20, padding: '12px 24px',
                        marginBottom: 8, background: P.paper, border: `2px solid ${P.border}`,
                        borderRadius: 12, borderLeft: `8px solid ${r.color}`,
                        opacity: fade(f, r.delay), transform: `translateX(${interpolate(f, [r.delay, r.delay + 16], [-16, 0], { extrapolateRight: 'clamp' })}px)`,
                    }}>
                        <div style={{ width: 480, fontSize: 26, fontWeight: 800, color: P.ink }}>{r.who}</div>
                        <div style={{ flex: 1, fontSize: 24, color: P.muted }}>{r.what}</div>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 24, fontSize: 28, fontWeight: 800, color: P.primaryDeep, opacity: fade(f, 60) }}>
                誰か一人ではなく、全員で。
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 21: Berners-Leeの懸念
// ───────────────────────────────────────────────
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1280 }}>
            <div style={{
                background: P.paper, border: `3px solid ${P.violet}`, borderRadius: 18,
                padding: '40px 56px', position: 'relative',
                opacity: fade(f, 4), transform: `translateY(${rise(f, 4)}px)`,
            }}>
                <span style={{
                    position: 'absolute', top: -18, left: 32, background: P.violet, color: P.paper,
                    padding: '6px 18px', borderRadius: 8, fontSize: 22, fontWeight: 800, letterSpacing: 2,
                }}>
                    Tim Berners-Lee — 2024年末
                </span>
                <div style={{ fontSize: 36, color: P.ink, fontWeight: 700, lineHeight: 1.6, fontStyle: 'italic' }}>
                    「この10年、ウェブは人類を<span style={{ background: 'linear-gradient(transparent 60%, #FECDD3 60%)' }}>力づけるどころか</span>、<br />
                    <span style={{ background: 'linear-gradient(transparent 60%, #FECDD3 60%)' }}>価値を浸食する側に回った</span>」
                </div>
            </div>
            {/* 設計思想 vs 現実 */}
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 24, opacity: fade(f, 28) }}>
                <div style={{ flex: 1, padding: '16px 24px', background: '#F0F9FF', borderRadius: 12, borderLeft: `6px solid ${P.primary}`, maxWidth: 500 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: P.primaryDeep }}>設計思想</div>
                    <div style={{ fontSize: 24, color: P.ink, marginTop: 4 }}>誰でも許可なく繋いでいい</div>
                </div>
                <div style={{ flex: 1, padding: '16px 24px', background: '#FEF2F2', borderRadius: 12, borderLeft: `6px solid ${P.rose}`, maxWidth: 500 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: P.rose }}>現実の傾向</div>
                    <div style={{ fontSize: 24, color: P.ink, marginTop: 4 }}>数社のサービスへの依存</div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 22, fontSize: 24, color: P.muted, opacity: fade(f, 48) }}>
                作った本人が、警鐘を鳴らしている
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 22: 綱引きは終わらない
// ───────────────────────────────────────────────
const Scene22: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: 1280 }}>
            <div style={{
                background: P.paper, border: `3px solid ${P.primary}`, borderRadius: 18,
                padding: '32px 48px', position: 'relative',
                opacity: fade(f, 2), transform: `translateY(${rise(f, 2)}px)`,
                marginBottom: 32,
            }}>
                <span style={{
                    position: 'absolute', top: -18, left: 32, background: P.primary, color: P.paper,
                    padding: '6px 18px', borderRadius: 8, fontSize: 22, fontWeight: 800, letterSpacing: 2,
                }}>
                    David Clark — 2018
                </span>
                <div style={{ fontSize: 30, color: P.ink, fontWeight: 600, lineHeight: 1.55, fontStyle: 'italic' }}>
                    「利害の<span style={{ color: P.amberDeep, fontWeight: 800 }}>綱引きは必ず起きる</span>。<br />
                    設計者は<span style={{ color: P.primaryDeep, fontWeight: 800 }}>平地を傾けることしかできず</span>、<br />
                    綱引き自体はなくせない」
                </div>
            </div>
            {/* 綱引きの図 */}
            <svg viewBox="0 0 1100 200" width={1100} height={200} style={{ display: 'block', margin: '0 auto', opacity: fade(f, 22) }}>
                {/* 左陣営 */}
                <g>
                    {[0, 1, 2].map(i => (
                        <circle key={i} cx={60 + i * 50} cy={110} r={20 + i * 4} fill={P.primary} opacity={0.5 + i * 0.15} />
                    ))}
                    <text x={150} y={170} fontSize="22" fontWeight="800" fill={P.primaryDeep} textAnchor="middle">分散・自由</text>
                </g>
                {/* 綱 */}
                <line x1={210} y1={110} x2={890} y2={110} stroke={P.amberDeep} strokeWidth="10" strokeLinecap="round" />
                {[330, 460, 600, 730].map((x, i) => (
                    <circle key={i} cx={x} cy={110} r="8" fill={P.amberDeep}
                        opacity={fade(f, 30 + i * 4)} />
                ))}
                {/* 中央フラッグ */}
                <line x1={550} y1={70} x2={550} y2={150} stroke={P.ink} strokeWidth="3" />
                <polygon points="550,70 580,80 550,90" fill={P.rose} opacity={fade(f, 44)} />
                {/* 右陣営 */}
                <g>
                    {[0, 1, 2].map(i => (
                        <circle key={i} cx={1040 - i * 50} cy={110} r={20 + i * 4} fill={P.violet} opacity={0.5 + i * 0.15} />
                    ))}
                    <text x={950} y={170} fontSize="22" fontWeight="800" fill={P.violet} textAnchor="middle">集中・効率</text>
                </g>
            </svg>
            <div style={{ textAlign: 'center', marginTop: 16, fontSize: 26, color: P.ink, fontWeight: 700, opacity: fade(f, 50) }}>
                誰も管理してない設計が残る限り、<span style={{ color: P.primaryDeep }}>綱引きに参加する余地は誰にでもある</span>
            </div>
        </div>
    </Stage>
);

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9,
    Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16, Scene17, Scene18, Scene19,
    Scene20, Scene21, Scene22,
];

export const SCENE_TITLES: string[] = [
    '質問からスタート', '今日話すこと', '1969年のUCLA', '発注者と実装者', '核戦争説の訂正',
    'TCP/IPの発明者', 'WWWは別の発明', '1995年に政府が手を引いた', 'ICANNの仕事', 'IETFの意思決定',
    'RIRの地域分散', 'W3Cとまとめ', 'クラウドの実体', '漁船で切れる', 'Netflixの配信',
    '物理層も分散', '国単位では止まる', 'Access Nowの数字', '世界全体は止められない', '設計思想が先',
    '最初の問いに戻る', 'Berners-Leeの懸念', '綱引きは終わらない',
];
