import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const P = {
    ...BASE_COLORS,
    primary: '#0EA5E9',
    primaryDeep: '#0369A1',
    primarySoft: '#E0F2FE',
    accent: '#F59E0B',
    accentDeep: '#B45309',
    accentSoft: '#FEF3C7',
    rose: '#E11D48',
    roseDeep: '#9F1239',
    roseSoft: '#FEE2E2',
    emerald: '#059669',
    emeraldDeep: '#065F46',
    emeraldSoft: '#D1FAE5',
    violet: '#7C3AED',
    violetDeep: '#5B21B6',
    violetSoft: '#EDE9FE',
    gold: '#CA8A04',
    ink: '#0F172A',
    paper: '#FFFFFF',
    muted: '#94A3B8',
    panel: 'rgba(255,255,255,0.94)',
    border: 'rgba(15, 23, 42, 0.10)',
};

const fade = (f: number, from: number, to = from + 16) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const rise = (f: number, from: number, to = from + 16, dist = 18) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const pulse = (f: number, period: number) =>
    0.5 + 0.5 * Math.sin((f / period) * Math.PI * 2);

const Stage: React.FC<React.PropsWithChildren<{ align?: string }>> = ({ children, align = 'center' }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: 80, paddingRight: 80,
        display: 'flex', alignItems: align as any, justifyContent: 'center',
    }}>{children}</div>
);

// ─── アイコン群 ──────────────────────────────

const RestartIcon: React.FC<{ size: number; color?: string }> = ({ size, color = P.emerald }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
        <path d="M 20 50 A 30 30 0 1 1 50 80" stroke={color} strokeWidth="9" fill="none" strokeLinecap="round" />
        <polygon points="48,78 42,86 54,86" fill={color} />
        <line x1="20" y1="50" x2="20" y2="32" stroke={color} strokeWidth="9" strokeLinecap="round" />
        <line x1="20" y1="32" x2="36" y2="32" stroke={color} strokeWidth="9" strokeLinecap="round" />
    </svg>
);

// スマホ本体 (共通)
const Smartphone: React.FC<{ x: number; y: number; w: number; children?: React.ReactNode; screenBg?: string }> = ({ x, y, w, children, screenBg = P.primarySoft }) => {
    const h = w * 1.95;
    return (
        <g transform={`translate(${x} ${y})`}>
            <rect x={0} y={0} width={w} height={h} rx={w * 0.15} fill={P.ink} />
            <rect x={w * 0.06} y={w * 0.1} width={w * 0.88} height={h - w * 0.2} rx={w * 0.03} fill={screenBg} />
            <rect x={w * 0.36} y={w * 0.06} width={w * 0.28} height={w * 0.05} rx={w * 0.025} fill={P.ink} />
            {children}
        </g>
    );
};

// ───────────────────────────────────────────────
// Scene 0: 朝の通知が来ない → 再起動で一気に届く
// ───────────────────────────────────────────────
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => {
    const restartAt = 100;
    const restarted = f > restartAt;
    const notifShown = restarted ? Math.min(5, Math.floor((f - restartAt) / 7)) : 0;
    return (
        <Stage>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div style={{ fontSize: 40, color: P.muted, fontWeight: 800, letterSpacing: 3, opacity: fade(f, 2) }}>
                    朝の「通知が来ない」問題
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14, opacity: fade(f, 10) }}>
                    <svg viewBox="0 0 600 500" width="560" height="460">
                        <Smartphone x={180} y={20} w={240} screenBg={restarted ? P.primarySoft : '#1F2937'}>
                            {!restarted ? (
                                <g>
                                    <text x={120} y={230} textAnchor="middle" fill="#64748B" fontSize="28" fontWeight="800">…</text>
                                    <text x={120} y={270} textAnchor="middle" fill="#94A3B8" fontSize="20" fontWeight="700">通知なし</text>
                                </g>
                            ) : (
                                <g>
                                    {[0, 1, 2, 3, 4].map(i => (
                                        <g key={i} opacity={notifShown > i ? 1 : 0}>
                                            <rect x={20} y={60 + i * 60} width={200} height={48} rx={10} fill={P.paper} stroke={P.primary} strokeWidth="2" />
                                            <circle cx={40} cy={84 + i * 60} r="10" fill={[P.emerald, P.primary, P.rose, P.accent, P.violet][i]} />
                                            <rect x={60} y={76 + i * 60} width={140} height="7" rx={3} fill={P.muted} opacity="0.6" />
                                            <rect x={60} y={90 + i * 60} width={110} height="6" rx={3} fill={P.muted} opacity="0.4" />
                                        </g>
                                    ))}
                                </g>
                            )}
                        </Smartphone>
                        {!restarted && (
                            <g opacity={fade(f, 40)}>
                                <circle cx={490} cy={160} r="32" fill="none" stroke={P.emerald} strokeWidth="5" strokeDasharray="8 4" opacity={0.35 + 0.65 * Math.abs(Math.sin(f / 8))} />
                                <text x={490} y={220} textAnchor="middle" fill={P.emerald} fontSize="24" fontWeight="900">電源長押し</text>
                            </g>
                        )}
                        {restarted && (
                            <g opacity={fade(f, restartAt)} transform="translate(470, 140)">
                                <RestartIcon size={70} color={P.emerald} />
                            </g>
                        )}
                    </svg>
                </div>
                <div style={{
                    marginTop: 4, fontSize: 36, fontWeight: 900,
                    color: restarted ? P.emeraldDeep : P.ink,
                    opacity: fade(f, restarted ? restartAt + 5 : 60),
                }}>
                    {restarted ? '✓ 通知が一気に届いた' : '再起動すると…'}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 1: 身の回りの再起動
// ───────────────────────────────────────────────
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        {
            label: 'Wi-Fi', sub: 'ルーター差し直し', color: P.primary,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <circle cx="70" cy="100" r="8" fill={P.primary} />
                    <path d="M 44 86 Q 70 60 96 86" stroke={P.primary} strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M 30 76 Q 70 36 110 76" stroke={P.primary} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.75" />
                    <path d="M 18 66 Q 70 14 122 66" stroke={P.primary} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
                </svg>
            ),
        },
        {
            label: 'ゲーム機', sub: '電源入れ直し', color: P.violet,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <rect x="22" y="56" width="96" height="48" rx="10" fill={P.violet} />
                    <circle cx="42" cy="80" r="10" fill={P.paper} />
                    <circle cx="98" cy="80" r="10" fill={P.paper} />
                    <rect x="64" y="74" width="12" height="12" rx="2" fill={P.paper} />
                </svg>
            ),
        },
        {
            label: 'カーナビ', sub: 'エンジン入れ直し', color: P.accent,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <rect x="18" y="34" width="104" height="72" rx="8" fill={P.ink} />
                    <rect x="26" y="42" width="88" height="56" rx="4" fill={P.accentSoft} />
                    <path d="M 70 52 L 70 98 M 46 82 L 70 52 L 94 82" stroke={P.accentDeep} strokeWidth="3" fill="none" />
                    <circle cx="70" cy="82" r="5" fill={P.rose} />
                </svg>
            ),
        },
        {
            label: 'アプリ', sub: '完全終了→再起動', color: P.emerald,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <rect x="30" y="30" width="80" height="80" rx="16" fill={P.emerald} />
                    <circle cx="70" cy="70" r="18" fill={P.paper} />
                    <circle cx="70" cy="70" r="8" fill={P.emerald} />
                </svg>
            ),
        },
    ];
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 900, marginBottom: 28, color: P.ink, opacity: fade(f, 2) }}>
                    身の回り、再起動だらけ
                </div>
                <div style={{ display: 'flex', gap: 28, justifyContent: 'center' }}>
                    {items.map((it, i) => (
                        <div key={it.label} style={{
                            width: 228,
                            opacity: fade(f, 10 + i * 10),
                            transform: `translateY(${rise(f, 10 + i * 10)}px)`,
                        }}>
                            <div style={{
                                background: P.paper, border: `4px solid ${it.color}`, borderRadius: 22,
                                padding: '22px 12px', textAlign: 'center',
                                boxShadow: `0 14px 32px ${it.color}22`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>{it.svg}</div>
                                <div style={{ fontSize: 30, fontWeight: 900, color: it.color, marginTop: 6 }}>{it.label}</div>
                                <div style={{ fontSize: 20, color: P.muted, marginTop: 4, fontWeight: 700 }}>{it.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 36, textAlign: 'center', fontSize: 32, fontWeight: 800, color: P.violetDeep,
                    opacity: fade(f, 58),
                }}>
                    「困ったら電源入れ直す」は、一番よく使う魔法
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 2: 今日の問い — 見取り図
// ───────────────────────────────────────────────
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const steps = [
        { n: 1, title: '仕組み', sub: '中で何が起きてる', color: P.primary },
        { n: 2, title: '限界', sub: '直らない問題もある', color: P.accent },
        { n: 3, title: '発想', sub: '再起動前提の設計', color: P.violet },
        { n: 4, title: '逆', sub: '止められない機械', color: P.rose },
    ];
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 46, fontWeight: 900, marginBottom: 24, color: P.ink, opacity: fade(f, 2) }}>
                    なぜ直るの？ <span style={{ color: P.primaryDeep }}>4つの順</span> で解き明かす
                </div>
                <div style={{ position: 'relative', padding: '40px 60px 0 60px' }}>
                    <svg viewBox="0 0 1600 20" width="100%" height="20" style={{ position: 'absolute', top: 122, left: 0 }}>
                        <line x1="40" y1="10" x2="1560" y2="10" stroke={P.muted} strokeWidth="6" strokeDasharray="16 10" opacity="0.5" />
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {steps.map((s, i) => (
                            <div key={s.n} style={{
                                width: 280, textAlign: 'center',
                                opacity: fade(f, 8 + i * 10), transform: `translateY(${rise(f, 8 + i * 10)}px)`,
                            }}>
                                <div style={{
                                    width: 110, height: 110, margin: '0 auto',
                                    borderRadius: '50%', background: P.paper,
                                    border: `8px solid ${s.color}`, boxShadow: `0 10px 28px ${s.color}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 52, fontWeight: 900, color: s.color,
                                }}>{s.n}</div>
                                <div style={{ fontSize: 40, fontWeight: 900, color: P.ink, marginTop: 16, lineHeight: 1.1 }}>{s.title}</div>
                                <div style={{ fontSize: 22, color: P.muted, marginTop: 6 }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 3: 消える記憶と消えない記憶 — スマホの写真vs作業中
// ───────────────────────────────────────────────
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 900, marginBottom: 36, color: P.ink, opacity: fade(f, 2) }}>
                機械の記憶は、<span style={{ color: P.primaryDeep }}>2種類</span>
            </div>
            <div style={{ display: 'flex', gap: 70, justifyContent: 'center', alignItems: 'flex-start' }}>
                {/* 消えない側: スマホの写真 */}
                <div style={{ textAlign: 'center', width: 450, opacity: fade(f, 10) }}>
                    <div style={{ fontSize: 30, color: P.accentDeep, fontWeight: 900, letterSpacing: 2 }}>電源切っても残る</div>
                    <div style={{ fontSize: 42, fontWeight: 900, color: P.accentDeep, marginTop: 4 }}>写真・保存ファイル</div>
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                        <svg viewBox="0 0 420 240" width="420" height="240">
                            {[0, 1, 2].map(row => [0, 1, 2].map(col => (
                                <g key={`${row}-${col}`}>
                                    <rect x={30 + col * 130} y={20 + row * 70} width={110} height={60} rx="6"
                                        fill={P.paper} stroke={P.accent} strokeWidth="3" />
                                    <rect x={38 + col * 130} y={28 + row * 70} width={94} height={36} rx="3"
                                        fill={[P.primary, P.emerald, P.rose, P.violet, P.accent, P.primary, P.emerald, P.rose, P.primary][row * 3 + col]} opacity="0.6" />
                                </g>
                            )))}
                        </svg>
                    </div>
                    <div style={{ fontSize: 26, color: P.emerald, marginTop: 10, fontWeight: 800 }}>✓ ずっと残る</div>
                </div>
                {/* 消える側: 作業中のメモ */}
                <div style={{ textAlign: 'center', width: 450, opacity: fade(f, 30) }}>
                    <div style={{ fontSize: 30, color: P.primaryDeep, fontWeight: 900, letterSpacing: 2 }}>電源切ると消える</div>
                    <div style={{ fontSize: 42, fontWeight: 900, color: P.primaryDeep, marginTop: 4 }}>作業中の状態</div>
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                        <svg viewBox="0 0 420 240" width="420" height="240">
                            {/* ノートパッド */}
                            <rect x="40" y="20" width="340" height="200" rx="10" fill={P.paper} stroke={P.primary} strokeWidth="4" />
                            <rect x="40" y="20" width="340" height="36" rx="10" fill={P.primary} />
                            <text x="210" y="46" textAnchor="middle" fill="white" fontSize="22" fontWeight="800">入力中...</text>
                            {[80, 108, 136, 164, 192].map(y => (
                                <line key={y} x1="60" y1={y} x2="360" y2={y} stroke={P.border} strokeWidth="1.5" strokeDasharray="4 3" />
                            ))}
                            <text x="70" y="98" fill={P.ink} fontSize="20" fontFamily="Courier New" fontWeight="700">
                                こんにちは、
                            </text>
                            <text x="70" y="126" fill={P.ink} fontSize="20" fontFamily="Courier New" fontWeight="700">
                                今日は晴れで_
                            </text>
                        </svg>
                    </div>
                    <div style={{ fontSize: 26, color: P.rose, marginTop: 10, fontWeight: 800 }}>⚡ 切ると消える</div>
                </div>
            </div>
            <div style={{
                marginTop: 24, textAlign: 'center', fontSize: 30, color: P.muted, fontWeight: 800,
                opacity: fade(f, 56),
            }}>
                今日の話は、ほぼ全部 <span style={{ color: P.primaryDeep }}>「消える方」</span> で起きてること
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 4: 作業用のメモ帳 — 中央に大きなメモ帳、書き込みが増える
// ───────────────────────────────────────────────
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    const writingCount = Math.min(12, Math.floor(f / 8));
    const writings = [
        { x: 40, y: 60, text: '写真データ', color: P.primary },
        { x: 260, y: 60, text: 'メッセージ下書き', color: P.emerald },
        { x: 40, y: 110, text: 'タップ位置', color: P.violet },
        { x: 260, y: 110, text: 'アプリ間通信', color: P.accent },
        { x: 40, y: 160, text: 'ダウンロード進捗', color: P.rose },
        { x: 260, y: 160, text: '位置情報', color: P.primary },
        { x: 40, y: 210, text: '一時ファイル', color: P.emerald },
        { x: 260, y: 210, text: 'BGM再生位置', color: P.violet },
        { x: 40, y: 260, text: '通知キュー', color: P.accent },
        { x: 260, y: 260, text: 'セッション', color: P.rose },
        { x: 40, y: 310, text: '暗号鍵', color: P.primary },
        { x: 260, y: 310, text: 'キャッシュ', color: P.emerald },
    ];
    return (
        <Stage>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div style={{ fontSize: 44, fontWeight: 900, marginBottom: 10, color: P.ink, opacity: fade(f, 2) }}>
                    機械の中の「作業用メモ帳」
                </div>
                <div style={{ fontSize: 24, color: P.muted, fontWeight: 700, marginBottom: 16, opacity: fade(f, 8) }}>
                    動いてる間、いろんなアプリが書き込んでいく
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 560 400" width="560" height="400">
                        {/* メモ帳 */}
                        <rect x="10" y="10" width="540" height="380" rx="12" fill={P.paper} stroke={P.primary} strokeWidth="4" />
                        <rect x="10" y="10" width="540" height="36" rx="12" fill={P.primary} />
                        <text x="280" y="36" textAnchor="middle" fill="white" fontSize="22" fontWeight="800">作業中のメモ帳</text>
                        {/* リング穴 */}
                        {[80, 160, 240, 320].map(y => (
                            <circle key={y} cx="30" cy={y} r="5" fill={P.border} />
                        ))}
                        {/* 書き込み */}
                        {writings.slice(0, writingCount).map((w, i) => (
                            <g key={i} opacity={fade(f, 12 + i * 8, 12 + i * 8 + 6)}>
                                <rect x={w.x + 40} y={w.y + 10} width={200} height={32} rx="6"
                                    fill={w.color} opacity="0.85" />
                                <text x={w.x + 140} y={w.y + 32} textAnchor="middle" fill="white" fontSize="18" fontWeight="800">
                                    {w.text}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 5: 書き散らしていく — 3パターン
// ───────────────────────────────────────────────
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        {
            title: '返し忘れで埋まる', sub: '借りた付箋がたまる', color: P.rose, delay: 8,
            svg: (
                <svg viewBox="0 0 240 180" width="220" height="170">
                    <rect x="10" y="10" width="220" height="160" rx="8" fill={P.paper} stroke={P.rose} strokeWidth="3" />
                    {[[20, 22], [55, 30], [92, 24], [130, 28], [168, 22], [20, 66], [60, 72], [100, 64], [140, 70], [180, 68], [30, 110], [78, 114], [130, 108], [180, 112]].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width={34} height={28} rx="2" fill={P.rose} opacity="0.75" transform={`rotate(${(i * 37) % 20 - 10} ${x + 17} ${y + 14})`} />
                    ))}
                </svg>
            ),
        },
        {
            title: '空きが飛び飛び', sub: '書く場所が散らばる', color: P.accent, delay: 36,
            svg: (
                <svg viewBox="0 0 240 180" width="220" height="170">
                    <rect x="10" y="10" width="220" height="160" rx="8" fill={P.paper} stroke={P.accent} strokeWidth="3" />
                    {[0, 2, 3, 5, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 28, 29, 31, 32].map(i => {
                        const col = i % 7, row = Math.floor(i / 7);
                        return <rect key={i} x={24 + col * 28} y={24 + row * 32} width={22} height={24} rx="2" fill={P.accent} opacity="0.7" />;
                    })}
                </svg>
            ),
        },
        {
            title: 'お互い譲り合い', sub: '二人で永遠に止まる', color: P.violet, delay: 64,
            svg: (
                <svg viewBox="0 0 240 180" width="220" height="170">
                    <rect x="10" y="10" width="220" height="160" rx="8" fill={P.paper} stroke={P.violet} strokeWidth="3" />
                    <circle cx={80} cy={90} r={28} fill={P.primary} opacity="0.75" />
                    <circle cx={160} cy={90} r={28} fill={P.accent} opacity="0.75" />
                    <text x={80} y={96} textAnchor="middle" fill="white" fontSize="16" fontWeight="800">A</text>
                    <text x={160} y={96} textAnchor="middle" fill="white" fontSize="16" fontWeight="800">B</text>
                    <path d="M 108 90 L 132 90" stroke={P.violet} strokeWidth="4" strokeDasharray="6 4" />
                    <text x={120} y={132} textAnchor="middle" fill={P.violetDeep} fontSize="14" fontWeight="800">お先にどうぞ</text>
                </svg>
            ),
        },
    ];
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 900, marginBottom: 24, color: P.ink, opacity: fade(f, 2) }}>
                    使い続けると、こんな散らかりが起きる
                </div>
                <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
                    {items.map(it => (
                        <div key={it.title} style={{
                            width: 300, textAlign: 'center',
                            opacity: fade(f, it.delay), transform: `translateY(${rise(f, it.delay)}px)`,
                        }}>
                            <div style={{
                                background: P.paper, border: `4px solid ${it.color}`, borderRadius: 20,
                                padding: '18px 10px 22px', boxShadow: `0 14px 32px ${it.color}22`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>{it.svg}</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: it.color, marginTop: 10, lineHeight: 1.2 }}>{it.title}</div>
                                <div style={{ fontSize: 20, color: P.muted, marginTop: 6, fontWeight: 700 }}>{it.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 6: まっさらに差し替える — Before/After
// ───────────────────────────────────────────────
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cleared = f > 130;
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 46, fontWeight: 900, marginBottom: 28, color: P.ink, opacity: fade(f, 2) }}>
                    再起動 = <span style={{ color: P.emeraldDeep }}>新しい紙に差し替え</span>
                </div>
                <div style={{ display: 'flex', gap: 50, justifyContent: 'center', alignItems: 'center' }}>
                    {/* Before */}
                    <div style={{ textAlign: 'center', opacity: fade(f, 10) }}>
                        <div style={{ fontSize: 28, color: cleared ? P.muted : P.rose, fontWeight: 900, marginBottom: 8 }}>散らかったメモ帳</div>
                        <svg viewBox="0 0 380 320" width="380" height="320" style={{ opacity: cleared ? 0.2 : 1 }}>
                            <rect x="10" y="10" width="360" height="300" rx="12" fill={P.paper} stroke={P.rose} strokeWidth="4" />
                            {Array.from({ length: 28 }).map((_, i) => {
                                const col = i % 4, row = Math.floor(i / 4);
                                return <rect key={i} x={30 + col * 82} y={30 + row * 40} width={64} height={30} rx="3"
                                    fill={P.rose} opacity={0.3 + 0.5 * (i % 3) / 2} transform={`rotate(${(i * 13) % 20 - 10} ${62 + col * 82} ${45 + row * 40})`} />;
                            })}
                        </svg>
                    </div>
                    {/* Arrow */}
                    <div style={{ textAlign: 'center', opacity: fade(f, 100) }}>
                        <div style={{ fontSize: 52, color: P.emerald, fontWeight: 900 }}>→</div>
                        <div style={{
                            marginTop: 10, fontSize: 24, padding: '12px 22px',
                            background: P.emeraldSoft, border: `3px solid ${P.emerald}`, borderRadius: 16,
                            color: P.emeraldDeep, fontWeight: 900,
                        }}>電源 OFF / ON</div>
                    </div>
                    {/* After */}
                    <div style={{ textAlign: 'center', opacity: fade(f, cleared ? 130 : 10), transform: `scale(${cleared ? 1 : 0.96})` }}>
                        <div style={{ fontSize: 28, color: cleared ? P.emerald : P.muted, fontWeight: 900, marginBottom: 8 }}>まっさらのメモ帳</div>
                        <svg viewBox="0 0 380 320" width="380" height="320">
                            <rect x="10" y="10" width="360" height="300" rx="12" fill={P.paper} stroke={P.emerald} strokeWidth="4" />
                            {cleared && (
                                <text x="190" y="180" textAnchor="middle" fill={P.emeraldDeep} fontSize="110" fontWeight="900" opacity={fade(f, 140)}>
                                    ✓
                                </text>
                            )}
                        </svg>
                    </div>
                </div>
                <div style={{
                    marginTop: 18, textAlign: 'center', fontSize: 28, color: P.muted, fontWeight: 800,
                    opacity: fade(f, 160),
                }}>
                    返し忘れも、譲り合いも、飛び飛びも、全部消える
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 7: 身近な症状のおさらい
// ───────────────────────────────────────────────
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        {
            title: 'ゲーム機がカクつく', sub: '散らかった状態', color: P.violet, delay: 8,
            icon: '🎮',
        },
        {
            title: 'アプリが固まる', sub: '譲り合いで止まった', color: P.rose, delay: 28,
            icon: '⏳',
        },
        {
            title: '通知が来ない', sub: '裏方がおかしな状態', color: P.primary, delay: 48,
            icon: '🔔',
        },
    ];
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 900, marginBottom: 34, color: P.ink, opacity: fade(f, 2) }}>
                    身近な症状、全部これで説明できる
                </div>
                <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
                    {items.map(it => (
                        <div key={it.title} style={{
                            width: 320, textAlign: 'center',
                            opacity: fade(f, it.delay), transform: `translateY(${rise(f, it.delay)}px)`,
                        }}>
                            <div style={{
                                background: P.paper, border: `4px solid ${it.color}`, borderRadius: 22,
                                padding: '28px 20px', boxShadow: `0 14px 32px ${it.color}22`,
                            }}>
                                <div style={{ fontSize: 72 }}>{it.icon}</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: it.color, marginTop: 10, lineHeight: 1.3 }}>{it.title}</div>
                                <div style={{ fontSize: 20, color: P.muted, marginTop: 8, fontWeight: 700 }}>{it.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 34, textAlign: 'center', fontSize: 28, color: P.emeraldDeep, fontWeight: 800,
                    opacity: fade(f, 70),
                }}>
                    長く使ったら一度再起動、が理にかなっている
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 8: 素朴な疑問 — 橋渡し
// ───────────────────────────────────────────────
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, color: P.muted, fontWeight: 800, letterSpacing: 3, opacity: fade(f, 2) }}>
                ここで素朴な疑問
            </div>
            <div style={{
                marginTop: 32, fontSize: 72, fontWeight: 900, lineHeight: 1.3, color: P.ink,
                opacity: fade(f, 12), transform: `translateY(${rise(f, 12)}px)`,
            }}>
                「じゃあ<span style={{ color: P.primaryDeep }}>何でも</span>、<br />再起動で直るの？」
            </div>
            <div style={{
                marginTop: 40, fontSize: 34, color: P.accentDeep, fontWeight: 900,
                opacity: fade(f, 38),
            }}>
                実は、2種類のバグがある
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 9: 2種類のバグ
// ───────────────────────────────────────────────
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: 70, justifyContent: 'center', alignItems: 'stretch' }}>
                <div style={{
                    width: 500, textAlign: 'center',
                    opacity: fade(f, 6), transform: `translateY(${rise(f, 6)}px)`,
                    background: `linear-gradient(135deg, ${P.emeraldSoft} 0%, ${P.paper} 100%)`,
                    border: `5px solid ${P.emerald}`, borderRadius: 24, padding: '30px 20px',
                }}>
                    <div style={{ fontSize: 32, color: P.emerald, fontWeight: 900, letterSpacing: 2 }}>タイプ①</div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: P.emeraldDeep, marginTop: 12, lineHeight: 1.3 }}>
                        出たり<br />出なかったり
                    </div>
                    <div style={{ marginTop: 18, fontSize: 20, color: P.muted, fontWeight: 700, lineHeight: 1.5 }}>
                        ゲームで一回だけ変な<br />ことが起きたけど、次で<br />再現しない、みたいな
                    </div>
                    <div style={{
                        marginTop: 18, padding: '12px 18px', background: P.paper,
                        border: `3px solid ${P.emerald}`, borderRadius: 14,
                        fontSize: 22, color: P.emeraldDeep, fontWeight: 900,
                    }}>
                        ✓ 再起動で消える
                    </div>
                </div>
                <div style={{
                    width: 500, textAlign: 'center',
                    opacity: fade(f, 30), transform: `translateY(${rise(f, 30)}px)`,
                    background: `linear-gradient(135deg, ${P.roseSoft} 0%, ${P.paper} 100%)`,
                    border: `5px solid ${P.rose}`, borderRadius: 24, padding: '30px 20px',
                }}>
                    <div style={{ fontSize: 32, color: P.rose, fontWeight: 900, letterSpacing: 2 }}>タイプ②</div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: P.roseDeep, marginTop: 12, lineHeight: 1.3 }}>
                        必ず同じ場所で<br />同じように
                    </div>
                    <div style={{ marginTop: 18, fontSize: 20, color: P.muted, fontWeight: 700, lineHeight: 1.5 }}>
                        このボタンを押すと<br />毎回落ちる、この手順で<br />必ずエラー、みたいな
                    </div>
                    <div style={{
                        marginTop: 18, padding: '12px 18px', background: P.paper,
                        border: `3px solid ${P.rose}`, borderRadius: 14,
                        fontSize: 22, color: P.roseDeep, fontWeight: 900,
                    }}>
                        ✗ 再起動では直らない
                    </div>
                </div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 10: 驚きの比率 — 131対1
// ───────────────────────────────────────────────
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => {
    const total = 132;
    const heisenShown = Math.floor(interpolate(f, [16, 96], [0, 131], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 30, color: P.muted, opacity: fade(f, 2), letterSpacing: 3, fontWeight: 700 }}>
                    ある会社の、現場調査
                </div>
                <div style={{ textAlign: 'center', fontSize: 46, fontWeight: 900, color: P.ink, marginTop: 10, opacity: fade(f, 8) }}>
                    132 件のトラブルを調べたら…
                </div>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 1200 300" width="1200" height="300">
                        {Array.from({ length: total }).map((_, i) => {
                            const col = i % 22, row = Math.floor(i / 22);
                            const x = 40 + col * 52;
                            const y = 30 + row * 44;
                            const isBohr = i === 0;
                            const visible = isBohr ? f > 110 : i < heisenShown;
                            const color = isBohr ? P.rose : P.emerald;
                            return (
                                <rect key={i} x={x} y={y} width={42} height={34} rx="4"
                                    fill={color} opacity={visible ? 0.88 : 0.1}
                                    stroke={isBohr && visible ? P.roseDeep : 'none'} strokeWidth={isBohr ? 3 : 0} />
                            );
                        })}
                        {f > 120 && (
                            <g opacity={fade(f, 120)}>
                                <circle cx="61" cy="47" r="38" fill="none" stroke={P.rose} strokeWidth="4" strokeDasharray="8 6" />
                                <line x1="100" y1="47" x2="240" y2="47" stroke={P.rose} strokeWidth="3" />
                                <text x="260" y="53" fill={P.roseDeep} fontSize="24" fontWeight="900">たった1件</text>
                            </g>
                        )}
                    </svg>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 90, marginTop: 8 }}>
                    <div style={{ textAlign: 'center', opacity: fade(f, 58) }}>
                        <div style={{ fontSize: 28, color: P.emerald, fontWeight: 800 }}>■ 出たり出なかったり</div>
                        <div style={{ fontSize: 58, fontWeight: 900, color: P.emeraldDeep, lineHeight: 1 }}>131</div>
                    </div>
                    <div style={{ textAlign: 'center', opacity: fade(f, 120) }}>
                        <div style={{ fontSize: 28, color: P.rose, fontWeight: 800 }}>■ 必ず同じ場所で</div>
                        <div style={{ fontSize: 58, fontWeight: 900, color: P.roseDeep, lineHeight: 1 }}>1</div>
                    </div>
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 11: 再起動で直らないものたち
// ───────────────────────────────────────────────
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { title: '焼き付いたバグ', sub: '必ず同じ場所で壊れる', color: P.rose, icon: '🐛', delay: 8 },
        { title: '部品の壊れ', sub: 'ハード劣化・熱暴走', color: P.accent, icon: '🔧', delay: 30 },
        { title: 'データの壊れ', sub: '保存済みが不整合', color: P.violet, icon: '💾', delay: 52 },
    ];
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 900, marginBottom: 30, color: P.ink, opacity: fade(f, 2) }}>
                    再起動では <span style={{ color: P.roseDeep }}>直らない</span> もの
                </div>
                <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
                    {items.map(it => (
                        <div key={it.title} style={{
                            width: 320, textAlign: 'center',
                            opacity: fade(f, it.delay), transform: `translateY(${rise(f, it.delay)}px)`,
                        }}>
                            <div style={{
                                background: P.paper, border: `4px solid ${it.color}`, borderRadius: 22,
                                padding: '28px 16px', boxShadow: `0 14px 32px ${it.color}22`,
                            }}>
                                <div style={{ fontSize: 72 }}>{it.icon}</div>
                                <div style={{ fontSize: 30, fontWeight: 900, color: it.color, marginTop: 8 }}>{it.title}</div>
                                <div style={{ fontSize: 22, color: P.muted, marginTop: 6, fontWeight: 700 }}>{it.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 32, textAlign: 'center', fontSize: 30, color: P.muted, fontWeight: 800,
                    opacity: fade(f, 76),
                }}>
                    境目は <span style={{ color: P.primaryDeep }}>消える記憶</span> か、<span style={{ color: P.accentDeep }}>消えない場所</span> か
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 12: 視点の転換
// ───────────────────────────────────────────────
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 38, color: P.muted, fontWeight: 800, letterSpacing: 3, opacity: fade(f, 2) }}>
                ここからが、今日の核心
            </div>
            <div style={{
                marginTop: 38, fontSize: 66, fontWeight: 900, lineHeight: 1.35, color: P.ink,
                opacity: fade(f, 14), transform: `translateY(${rise(f, 14)}px)`,
            }}>
                スマホもアプリも<br />
                クラウドも<span style={{ color: P.violetDeep }}>実は</span>、<br />
                <span style={{ color: P.primaryDeep }}>「再起動で直る前提」</span><br />で作られている
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 13: 非常階段の話
// ───────────────────────────────────────────────
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 900, marginBottom: 24, color: P.ink, opacity: fade(f, 2) }}>
                非常階段のたとえ話
            </div>
            <div style={{ display: 'flex', gap: 50, justifyContent: 'center', alignItems: 'flex-start' }}>
                {/* 普段使わない非常階段 */}
                <div style={{ textAlign: 'center', width: 440, opacity: fade(f, 10) }}>
                    <svg viewBox="0 0 440 280" width="440" height="280">
                        <rect x="40" y="20" width="360" height="240" rx="12" fill={P.paper} stroke={P.rose} strokeWidth="4" />
                        <rect x="60" y="40" width="320" height="180" fill={P.roseSoft} />
                        {/* Stairs */}
                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <rect key={i} x={80 + i * 40} y={200 - i * 28} width={40} height={8} fill={P.roseDeep} opacity="0.7" />
                        ))}
                        {/* Blocked door */}
                        <rect x="280" y="60" width="80" height="140" fill={P.rose} opacity="0.3" />
                        <text x="320" y="135" textAnchor="middle" fill={P.roseDeep} fontSize="40">🚫</text>
                        <text x="220" y="260" textAnchor="middle" fill={P.roseDeep} fontSize="18" fontWeight="800">ドアが開かない</text>
                    </svg>
                    <div style={{ fontSize: 30, fontWeight: 900, color: P.rose, marginTop: 8 }}>普段使わない道</div>
                    <div style={{ fontSize: 22, color: P.muted, fontWeight: 700, marginTop: 4 }}>いざ火事で動かない</div>
                </div>
                {/* 毎日通る道 */}
                <div style={{ textAlign: 'center', width: 440, opacity: fade(f, 34) }}>
                    <svg viewBox="0 0 440 280" width="440" height="280">
                        <rect x="40" y="20" width="360" height="240" rx="12" fill={P.paper} stroke={P.emerald} strokeWidth="4" />
                        <rect x="60" y="40" width="320" height="180" fill={P.emeraldSoft} />
                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <rect key={i} x={80 + i * 40} y={200 - i * 28} width={40} height={8} fill={P.emeraldDeep} opacity="0.8" />
                        ))}
                        {/* People walking */}
                        <text x="100" y="210" fontSize="22">🚶</text>
                        <text x="200" y="180" fontSize="22">🚶</text>
                        <text x="280" y="150" fontSize="22">🚶</text>
                        <text x="220" y="260" textAnchor="middle" fill={P.emeraldDeep} fontSize="18" fontWeight="800">毎日誰かが通る</text>
                    </svg>
                    <div style={{ fontSize: 30, fontWeight: 900, color: P.emerald, marginTop: 8 }}>毎日通る道</div>
                    <div style={{ fontSize: 22, color: P.muted, fontWeight: 700, marginTop: 4 }}>壊れてもすぐ気づく</div>
                </div>
            </div>
            <div style={{
                textAlign: 'center', marginTop: 12, fontSize: 28, color: P.violetDeep, fontWeight: 800,
                opacity: fade(f, 80),
            }}>
                「クラッシュからの復旧」を普段使いの道にしてしまう
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 14: ブレーカーで封じ込める
// ───────────────────────────────────────────────
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => {
    const shortAt = 80;
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 900, marginBottom: 20, color: P.ink, opacity: fade(f, 2) }}>
                    家のブレーカー方式
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 900 380" width="900" height="380">
                        {/* 家 */}
                        <rect x="40" y="80" width="820" height="280" rx="14" fill={P.paper} stroke={P.ink} strokeWidth="4" />
                        {/* 屋根ライン */}
                        <line x1="40" y1="140" x2="860" y2="140" stroke={P.ink} strokeWidth="3" />
                        <text x="450" y="122" textAnchor="middle" fill={P.ink} fontSize="24" fontWeight="900">アプリ全体</text>
                        {/* 4つの部屋 = パーツ */}
                        {[0, 1, 2, 3].map(i => {
                            const x = 70 + i * 200;
                            const failed = f > shortAt && i === 2;
                            const restoredAt = 140;
                            const restored = f > restoredAt && i === 2;
                            const color = failed && !restored ? P.rose : P.emerald;
                            return (
                                <g key={i}>
                                    <rect x={x} y={170} width={170} height={170} rx="10"
                                        fill={color} opacity={failed && !restored ? 0.4 : 0.8} stroke={color} strokeWidth="3" />
                                    <text x={x + 85} y={255} textAnchor="middle" fill="white" fontSize="22" fontWeight="900">
                                        {failed && !restored ? '⚡×' : restored ? '↻' : `パーツ${i + 1}`}
                                    </text>
                                    <text x={x + 85} y={285} textAnchor="middle" fill="white" fontSize="18" fontWeight="700" opacity="0.9">
                                        {failed && !restored ? 'ショート' : restored ? '再起動中' : '動作中'}
                                    </text>
                                </g>
                            );
                        })}
                        {/* Breaker label */}
                        {f > shortAt && f < 200 && (
                            <g opacity={fade(f, shortAt)}>
                                <rect x="60" y="30" width="260" height="40" rx="8" fill={P.accent} />
                                <text x="190" y="58" textAnchor="middle" fill="white" fontSize="20" fontWeight="900">このパーツだけ再起動</text>
                            </g>
                        )}
                    </svg>
                </div>
                <div style={{
                    textAlign: 'center', fontSize: 26, color: P.muted, fontWeight: 800,
                    opacity: fade(f, 170),
                }}>
                    壊れた1パーツだけ立て直し、全体は動き続ける
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 15: 実は毎日触ってる
// ───────────────────────────────────────────────
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 900, marginBottom: 30, color: P.ink, opacity: fade(f, 2) }}>
                実は、毎日この仕組みに触れてる
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg viewBox="0 0 1000 340" width="1000" height="340">
                    {/* User */}
                    <g opacity={fade(f, 8)}>
                        <circle cx="100" cy="170" r="50" fill={P.primary} />
                        <text x="100" y="180" textAnchor="middle" fill="white" fontSize="40">👤</text>
                        <text x="100" y="240" textAnchor="middle" fill={P.ink} fontSize="22" fontWeight="800">あなた</text>
                    </g>
                    {/* Arrow */}
                    <g opacity={fade(f, 16)}>
                        <line x1="160" y1="170" x2="380" y2="170" stroke={P.muted} strokeWidth="4" strokeDasharray="10 6" />
                        <polygon points="380,170 368,162 368,178" fill={P.muted} />
                        <text x="270" y="150" textAnchor="middle" fill={P.muted} fontSize="20" fontWeight="700">メッセージ送信</text>
                    </g>
                    {/* Cloud / parts */}
                    <g opacity={fade(f, 24)}>
                        <rect x="420" y="60" width="540" height="220" rx="24" fill={P.violetSoft} stroke={P.violet} strokeWidth="4" />
                        <text x="690" y="96" textAnchor="middle" fill={P.violetDeep} fontSize="22" fontWeight="900">向こう側（クラウド）</text>
                    </g>
                    {/* Small parts crashing + restarting */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                        const col = i % 4, row = Math.floor(i / 4);
                        const x = 470 + col * 110;
                        const y = 130 + row * 70;
                        // 各パーツが周期的にクラッシュ→復活
                        const phase = (f + i * 18) % 60;
                        const isCrashed = phase < 18;
                        const color = isCrashed ? P.rose : P.emerald;
                        return (
                            <g key={i} opacity={fade(f, 40 + i * 3)}>
                                <rect x={x} y={y} width={80} height={50} rx="8"
                                    fill={color} opacity={isCrashed ? 0.5 : 0.85} stroke={color} strokeWidth="2" />
                                <text x={x + 40} y={y + 32} textAnchor="middle" fill="white" fontSize="18" fontWeight="900">
                                    {isCrashed ? '💥' : '✓'}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
            <div style={{
                marginTop: 10, textAlign: 'center', fontSize: 28, color: P.violetDeep, fontWeight: 800,
                opacity: fade(f, 90),
            }}>
                裏で小さなクラッシュと再起動が<br />休みなく繰り返されている
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 16: 飛行機に潜むバグ
// ───────────────────────────────────────────────
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => {
    const MAX = 0x7FFFFFFF;
    const counterProgress = Math.min(1, Math.max(0, (f - 40) / 80));
    const counter = Math.floor(counterProgress * MAX);
    const counterHex = '0x' + counter.toString(16).toUpperCase().padStart(8, '0');
    const overflow = f > 130;
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 30, color: P.muted, opacity: fade(f, 2), letterSpacing: 3, fontWeight: 700 }}>
                    ある大型旅客機で、数年前に発覚
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, opacity: fade(f, 10) }}>
                    <svg viewBox="0 0 1000 160" width="1000" height="160">
                        <path d="M 120 80 L 640 72 L 820 82 L 800 92 L 640 98 L 180 98 Z" fill={P.primary} />
                        <polygon points="380,72 440,20 478,20 450,72" fill={P.primaryDeep} />
                        <polygon points="380,98 440,148 478,148 450,98" fill={P.primaryDeep} />
                        <polygon points="780,75 840,46 864,52 840,86" fill={P.primaryDeep} />
                        {[220, 260, 300, 340, 500, 540, 580, 620].map(x => (
                            <rect key={x} x={x} y="80" width="18" height="10" rx="3" fill={P.paper} opacity="0.8" />
                        ))}
                    </svg>
                </div>
                <div style={{
                    marginTop: 18, textAlign: 'center', fontSize: 28, fontWeight: 800, color: P.ink,
                    opacity: fade(f, 28),
                }}>
                    発電機の「見張り番」の中に、時を数えるカウンター
                </div>
                <div style={{
                    marginTop: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16,
                    opacity: fade(f, 40),
                }}>
                    <div style={{ fontSize: 26, color: P.muted, fontWeight: 800 }}>カウンター:</div>
                    <div style={{
                        padding: '12px 24px', background: overflow ? P.rose : P.accent,
                        color: 'white', borderRadius: 12,
                        fontFamily: '"Courier New", monospace', fontSize: 40, fontWeight: 900, letterSpacing: 2,
                        minWidth: 300, textAlign: 'center',
                    }}>
                        {overflow ? 'あふれた!' : counterHex}
                    </div>
                </div>
                <div style={{
                    marginTop: 16, display: 'flex', justifyContent: 'center',
                    opacity: fade(f, 40),
                }}>
                    <svg viewBox="0 0 1000 50" width="900" height="50">
                        <rect x="10" y="14" width="980" height="22" rx="11" fill="#F1F5F9" stroke={P.border} strokeWidth="2" />
                        <rect x="10" y="14" width={980 * counterProgress} height="22" rx="11"
                            fill={overflow ? P.rose : P.accent} />
                        <line x1="990" y1="8" x2="990" y2="42" stroke={P.rose} strokeWidth="3" strokeDasharray="4 3" />
                    </svg>
                </div>
                <div style={{
                    marginTop: 12, textAlign: 'center', fontSize: 36, fontWeight: 900, color: P.rose,
                    opacity: fade(f, 140),
                }}>
                    248日使い続けると、上限を超える
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 17: 全発電機が同時に
// ───────────────────────────────────────────────
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => {
    const panicAt = 80;
    const panicked = f > panicAt;
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 36, fontWeight: 900, marginBottom: 16, color: P.ink, opacity: fade(f, 2) }}>
                    発電機は4台。見張り番も4人。
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 30, marginTop: 24 }}>
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} style={{
                            opacity: fade(f, 10 + i * 4),
                            textAlign: 'center',
                        }}>
                            <svg viewBox="0 0 180 220" width="180" height="220">
                                {/* 発電機 */}
                                <rect x="30" y="70" width="120" height="140" rx="12"
                                    fill={panicked ? P.rose : P.emerald} opacity={panicked ? 0.5 : 0.85}
                                    stroke={panicked ? P.rose : P.emerald} strokeWidth="3" />
                                <text x="90" y="130" textAnchor="middle" fill="white" fontSize="32" fontWeight="900">
                                    {panicked ? '⚡✖' : '⚡'}
                                </text>
                                <text x="90" y="170" textAnchor="middle" fill="white" fontSize="16" fontWeight="800">
                                    {panicked ? 'エラー' : '発電中'}
                                </text>
                                {/* 見張り番 */}
                                <circle cx="90" cy="40" r="30" fill={panicked ? P.roseDeep : P.accent} />
                                <text x="90" y="50" textAnchor="middle" fill="white" fontSize="22">
                                    {panicked ? '😱' : '👁'}
                                </text>
                            </svg>
                            <div style={{ fontSize: 22, color: P.muted, fontWeight: 800, marginTop: -6 }}>発電機 {i + 1}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginTop: 16, textAlign: 'center', fontSize: 36, fontWeight: 900,
                    color: panicked ? P.rose : P.ink,
                    opacity: fade(f, panicked ? panicAt : 60),
                }}>
                    {panicked ? '✗ 4人が同時にパニック → 機体の電気が全部落ちる' : '個別に見張れば安心…のはずが'}
                </div>
                <div style={{
                    marginTop: 18, textAlign: 'center', fontSize: 28, color: P.violetDeep, fontWeight: 800,
                    opacity: fade(f, 140),
                }}>
                    対策: 120日ごとに必ず電源を入れ直すルール
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 18: 止められない機械たち
// ───────────────────────────────────────────────
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        {
            label: '生命維持装置', sub: '止めたら命に関わる', color: P.emerald,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <rect x="18" y="38" width="104" height="70" rx="10" fill={P.paper} stroke={P.emerald} strokeWidth="4" />
                    <polyline points="24,76 44,76 52,50 62,100 72,62 82,90 92,76 118,76"
                        stroke={P.emerald} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            label: 'フライト制御', sub: '飛行中は絶対止まれない', color: P.primary,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <path d="M 30 74 L 90 66 L 122 74 L 118 82 L 90 86 L 40 86 Z" fill={P.primary} />
                    <polygon points="58,66 68,30 80,30 72,66" fill={P.primaryDeep} />
                    <polygon points="58,86 68,118 80,118 72,86" fill={P.primaryDeep} />
                </svg>
            ),
        },
        {
            label: '発電所制御', sub: '社会インフラが止まる', color: P.rose,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <circle cx="70" cy="70" r="12" fill={P.rose} />
                    {[0, 120, 240].map(a => (
                        <g key={a} transform={`rotate(${a} 70 70)`}>
                            <ellipse cx="70" cy="40" rx="22" ry="10" fill={P.rose} opacity="0.7" />
                        </g>
                    ))}
                </svg>
            ),
        },
        {
            label: '緊急通報', sub: '救命に直結', color: P.accent,
            svg: (
                <svg viewBox="0 0 140 140" width="110" height="110">
                    <path d="M 38 38 Q 46 30 58 38 L 76 62 L 66 72 Q 76 90 94 100 L 104 90 L 126 108 Q 116 122 100 118 Q 60 108 32 70 Q 26 50 38 38 Z"
                        fill={P.accent} />
                </svg>
            ),
        },
    ];
    return (
        <Stage>
            <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: 42, fontWeight: 900, marginBottom: 28, color: P.ink, opacity: fade(f, 2) }}>
                    そもそも、止められない機械たち
                </div>
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                    {items.map((it, i) => (
                        <div key={it.label} style={{
                            width: 230, opacity: fade(f, 10 + i * 8), transform: `translateY(${rise(f, 10 + i * 8)}px)`,
                        }}>
                            <div style={{
                                background: P.paper, border: `4px solid ${it.color}`, borderRadius: 22,
                                padding: '22px 12px', textAlign: 'center',
                                boxShadow: `0 14px 32px ${it.color}22`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>{it.svg}</div>
                                <div style={{ fontSize: 26, fontWeight: 900, color: it.color, marginTop: 6 }}>{it.label}</div>
                                <div style={{ fontSize: 20, color: P.muted, marginTop: 4, fontWeight: 700 }}>{it.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    textAlign: 'center', fontSize: 26, color: P.muted, fontWeight: 800, marginTop: 26,
                    opacity: fade(f, 54),
                }}>
                    予備を何台も用意 / 瞬間切り替え で信頼性を作る
                </div>
            </div>
        </Stage>
    );
};

// ───────────────────────────────────────────────
// Scene 19: 使い分けの世界
// ───────────────────────────────────────────────
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 44, fontWeight: 900, marginBottom: 32, color: P.ink, opacity: fade(f, 2) }}>
                機械の世界の、2つの流派
            </div>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
                <div style={{
                    width: 540, opacity: fade(f, 10), transform: `translateY(${rise(f, 10)}px)`,
                    background: `linear-gradient(135deg, ${P.primarySoft} 0%, ${P.paper} 100%)`,
                    border: `5px solid ${P.primary}`, borderRadius: 28, padding: '28px 24px',
                }}>
                    <div style={{ textAlign: 'center', fontSize: 34, color: P.primaryDeep, fontWeight: 900, marginBottom: 4 }}>
                        壊れたら早く戻す
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 22, color: P.muted, marginBottom: 18, fontWeight: 700 }}>
                        ほとんどの身近な機械
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                        {['スマホアプリ', 'ウェブサービス', 'ゲーム', 'SNS', 'メッセージ'].map((it, i) => (
                            <div key={it} style={{
                                padding: '10px 18px', background: P.paper, border: `2.5px solid ${P.primary}`,
                                borderRadius: 999, fontSize: 22, color: P.primaryDeep, fontWeight: 800,
                                opacity: fade(f, 20 + i * 5),
                            }}>{it}</div>
                        ))}
                    </div>
                </div>
                <div style={{
                    width: 540, opacity: fade(f, 50), transform: `translateY(${rise(f, 50)}px)`,
                    background: `linear-gradient(135deg, ${P.roseSoft} 0%, ${P.paper} 100%)`,
                    border: `5px solid ${P.rose}`, borderRadius: 28, padding: '28px 24px',
                }}>
                    <div style={{ textAlign: 'center', fontSize: 34, color: P.roseDeep, fontWeight: 900, marginBottom: 4 }}>
                        そもそも壊さない
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 22, color: P.muted, marginBottom: 18, fontWeight: 700 }}>
                        命・社会に関わる機械
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                        {['医療機器', 'フライト制御', '発電所', '緊急通報', '金融基幹'].map((it, i) => (
                            <div key={it} style={{
                                padding: '10px 18px', background: P.paper, border: `2.5px solid ${P.rose}`,
                                borderRadius: 999, fontSize: 22, color: P.roseDeep, fontWeight: 800,
                                opacity: fade(f, 60 + i * 5),
                            }}>{it}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{
                textAlign: 'center', marginTop: 22, fontSize: 26, color: P.muted, fontWeight: 800,
                opacity: fade(f, 100),
            }}>
                優劣ではなく、止まった時の被害の大きさで選ぶ
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 20: 今日の軸
// ───────────────────────────────────────────────
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 46, fontWeight: 900, marginBottom: 26, color: P.ink, opacity: fade(f, 2) }}>
                今日の <span style={{ color: P.primaryDeep }}>軸</span>
            </div>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
                <div style={{
                    width: 520, textAlign: 'center',
                    opacity: fade(f, 10), transform: `translateY(${rise(f, 10)}px)`,
                    background: `linear-gradient(135deg, ${P.emeraldSoft} 0%, ${P.paper} 100%)`,
                    border: `5px solid ${P.emerald}`, borderRadius: 28, padding: '28px 24px',
                }}>
                    <div style={{ fontSize: 32, color: P.emerald, fontWeight: 900 }}>✓ 再起動で直る</div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: P.emeraldDeep, marginTop: 14, lineHeight: 1.3 }}>
                        作業中の<br />書き散らしたメモ帳
                    </div>
                </div>
                <div style={{
                    width: 520, textAlign: 'center',
                    opacity: fade(f, 34), transform: `translateY(${rise(f, 34)}px)`,
                    background: `linear-gradient(135deg, ${P.roseSoft} 0%, ${P.paper} 100%)`,
                    border: `5px solid ${P.rose}`, borderRadius: 28, padding: '28px 24px',
                }}>
                    <div style={{ fontSize: 32, color: P.rose, fontWeight: 900 }}>✗ 直らない</div>
                    <div style={{ fontSize: 30, fontWeight: 900, color: P.roseDeep, marginTop: 14, lineHeight: 1.4 }}>
                        焼き付いたバグ<br />部品の壊れ<br />保存済みデータの壊れ
                    </div>
                </div>
            </div>
            <div style={{
                marginTop: 28, textAlign: 'center', fontSize: 32, color: P.violetDeep, fontWeight: 900,
                opacity: fade(f, 70),
            }}>
                消える記憶か、消えない場所か
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Scene 21: 明日からのボタン
// ───────────────────────────────────────────────
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%', textAlign: 'center' }}>
            <div style={{
                fontSize: 44, fontWeight: 900, color: P.ink, lineHeight: 1.3,
                opacity: fade(f, 2), transform: `translateY(${rise(f, 2)}px)`,
            }}>
                次に再起動を押すとき
            </div>
            <div style={{
                marginTop: 24, display: 'flex', justifyContent: 'center', gap: 50, alignItems: 'flex-start',
            }}>
                <div style={{
                    width: 400, background: P.paper, borderLeft: `10px solid ${P.emerald}`,
                    border: `3px solid ${P.border}`, borderRadius: 14, padding: '20px 24px',
                    opacity: fade(f, 16),
                }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: P.emerald, textAlign: 'center' }}>
                        再発しない
                    </div>
                    <div style={{ fontSize: 22, color: P.ink, textAlign: 'center', marginTop: 10, lineHeight: 1.5, fontWeight: 700 }}>
                        書き散らしだったね<br />で済ませてOK
                    </div>
                </div>
                <div style={{
                    width: 400, background: P.paper, borderLeft: `10px solid ${P.rose}`,
                    border: `3px solid ${P.border}`, borderRadius: 14, padding: '20px 24px',
                    opacity: fade(f, 42),
                }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: P.rose, textAlign: 'center' }}>
                        何度も繰り返す
                    </div>
                    <div style={{ fontSize: 22, color: P.ink, textAlign: 'center', marginTop: 10, lineHeight: 1.5, fontWeight: 700 }}>
                        焼き付いたバグか<br />部品の壊れのサイン
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 36, display: 'flex', gap: 36, justifyContent: 'center', alignItems: 'center', opacity: fade(f, 74) }}>
                <div style={{ transform: `scale(${1 + 0.08 * pulse(f, 90)})` }}>
                    <RestartIcon size={110} color={P.emerald} />
                </div>
                <div style={{ fontSize: 36, color: P.muted, fontWeight: 800, lineHeight: 1.4, textAlign: 'left' }}>
                    ボタンを押す指が、<br />
                    <span style={{ color: P.emeraldDeep }}>ちょっと誇らしい</span>
                </div>
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// レースコンディション — 2つのドアを同時に押す比喩
// ───────────────────────────────────────────────
const SceneRaceCondition: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 30, color: P.muted, opacity: fade(f, 2), letterSpacing: 3, fontWeight: 700 }}>
                Heisenbug の代表例
            </div>
            <div style={{ textAlign: 'center', fontSize: 54, fontWeight: 900, marginTop: 8, color: P.ink, opacity: fade(f, 10) }}>
                レースコンディション
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <svg viewBox="0 0 1000 260" width="1000" height="260">
                    {/* Door */}
                    <rect x="440" y="40" width="120" height="180" rx="8" fill={P.paper} stroke={P.ink} strokeWidth="4" />
                    <circle cx="540" cy="130" r="5" fill={P.ink} />
                    <text x="500" y="250" textAnchor="middle" fill={P.ink} fontSize="20" fontWeight="800">共有の資源</text>
                    {/* Person A */}
                    <g opacity={fade(f, 18)}>
                        <circle cx="280" cy="120" r="40" fill={P.primary} />
                        <text x="280" y="132" textAnchor="middle" fill="white" fontSize="36" fontWeight="900">A</text>
                        <line x1="320" y1="120" x2="420" y2="130" stroke={P.primary} strokeWidth="5" strokeLinecap="round" />
                        <polygon points="420,130 410,120 410,140" fill={P.primary} />
                    </g>
                    {/* Person B */}
                    <g opacity={fade(f, 28)}>
                        <circle cx="720" cy="120" r="40" fill={P.accent} />
                        <text x="720" y="132" textAnchor="middle" fill="white" fontSize="36" fontWeight="900">B</text>
                        <line x1="680" y1="120" x2="580" y2="130" stroke={P.accent} strokeWidth="5" strokeLinecap="round" />
                        <polygon points="580,130 590,120 590,140" fill={P.accent} />
                    </g>
                    {/* Collision sparks */}
                    {f > 50 && (
                        <g opacity={fade(f, 50)}>
                            <text x="500" y="100" textAnchor="middle" fill={P.rose} fontSize="36" fontWeight="900">💥</text>
                            <text x="500" y="30" textAnchor="middle" fill={P.rose} fontSize="24" fontWeight="900">同時発火 → バグ発症</text>
                        </g>
                    )}
                </svg>
            </div>
            <div style={{
                marginTop: 10, textAlign: 'center', fontSize: 28, color: P.muted, fontWeight: 800,
                opacity: fade(f, 80),
            }}>
                コンマ何秒のタイミングずれで、出たり出なかったり
            </div>
            <div style={{
                marginTop: 8, textAlign: 'center', fontSize: 26, color: P.emeraldDeep, fontWeight: 800,
                opacity: fade(f, 100),
            }}>
                次に試すと順番が変わって、再発しない
            </div>
        </div>
    </Stage>
);

// ───────────────────────────────────────────────
// Microreboot — 全体 vs 部分の再起動
// ───────────────────────────────────────────────
const SceneMicroreboot: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: 30, color: P.muted, opacity: fade(f, 2), letterSpacing: 3, fontWeight: 700 }}>
                Candea et al. · OSDI 2004
            </div>
            <div style={{ textAlign: 'center', fontSize: 62, fontWeight: 900, color: P.violetDeep, marginTop: 8, opacity: fade(f, 10) }}>
                Microreboot
            </div>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 32 }}>
                <div style={{ width: 480, opacity: fade(f, 22) }}>
                    <div style={{ fontSize: 28, color: P.rose, fontWeight: 900, textAlign: 'center', marginBottom: 12 }}>
                        ✗ システム全体を再起動
                    </div>
                    <svg viewBox="0 0 480 160" width="100%">
                        <rect x="20" y="20" width="440" height="120" rx="20" fill={P.roseSoft} stroke={P.rose} strokeWidth="4" />
                        {[0, 1, 2, 3].map(i => (
                            <rect key={i} x={50 + i * 105} y={50} width={90} height={60} rx="10"
                                fill={P.rose} opacity="0.4" />
                        ))}
                        <text x="240" y="88" textAnchor="middle" fill={P.roseDeep} fontSize="32" fontWeight="900">🔄 全停止</text>
                    </svg>
                    <div style={{ fontSize: 22, color: P.muted, textAlign: 'center', marginTop: 10, fontWeight: 700 }}>
                        大きな損失・長い復旧時間
                    </div>
                </div>
                <div style={{ width: 480, opacity: fade(f, 52) }}>
                    <div style={{ fontSize: 28, color: P.emerald, fontWeight: 900, textAlign: 'center', marginBottom: 12 }}>
                        ✓ 壊れたパーツだけ
                    </div>
                    <svg viewBox="0 0 480 160" width="100%">
                        <rect x="20" y="20" width="440" height="120" rx="20" fill={P.emeraldSoft} stroke={P.emerald} strokeWidth="4" />
                        {[0, 1, 2, 3].map(i => (
                            <rect key={i} x={50 + i * 105} y={50} width={90} height={60} rx="10"
                                fill={i === 1 ? P.rose : P.emerald} opacity={i === 1 ? 0.55 : 0.85}
                                stroke={i === 1 ? P.rose : P.emerald} strokeWidth="3" />
                        ))}
                        <text x={200} y={40} textAnchor="middle" fill={P.rose} fontSize="24" fontWeight="900">↻ ここだけ</text>
                    </svg>
                    <div style={{ fontSize: 22, color: P.emeraldDeep, textAlign: 'center', marginTop: 10, fontWeight: 800 }}>
                        復旧時間・損失とも桁違いに削減
                    </div>
                </div>
            </div>
            <div style={{
                marginTop: 14, textAlign: 'center', fontSize: 24, color: P.muted, fontWeight: 700,
                opacity: fade(f, 80),
            }}>
                洗濯機の「脱水だけ止める、洗いは続ける」発想
            </div>
        </div>
    </Stage>
);

// 新構成 24 シーン
export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0,                // 0: 朝の通知が来ない
    Scene1,                // 1: 身の回りの再起動
    Scene2,                // 2: 今日の問い
    Scene3,                // 3: 揮発と不揮発
    Scene4,                // 4: 作業用のメモ帳
    Scene5,                // 5: 3つの散らかり
    Scene6,                // 6: プロセス終了で回収
    Scene7,                // 7: 身近な症状の答え合わせ
    Scene8,                // 8: 2種類のバグに名前がある
    Scene9,                // 9: ハイゼンバグとボーアバグ
    Scene10,               // 10: 132件の衝撃
    SceneRaceCondition,    // 11: レースコンディション [新規]
    Scene11,               // 12: 直らない側の正体
    Scene12,               // 13: 視点の転換
    Scene13,               // 14: Crash-Only Software（非常階段）
    Scene14,               // 15: Let It Crash と Supervisor Tree（ブレーカー）
    SceneMicroreboot,      // 16: Microreboot [新規]
    Scene15,               // 17: Kubernetes の自己修復（実は毎日触ってる）
    Scene16,               // 18: 飛行機に潜むバグ
    Scene17,               // 19: 4基同時のパニック
    Scene18,               // 20: セーフティクリティカル
    Scene19,               // 21: 2つの流派
    Scene20,               // 22: 今日の軸
    Scene21,               // 23: 明日からのボタン
];

export const SCENE_TITLES: string[] = [
    '朝の通知が来ない', '身の回りの再起動', '今日の問い',
    '揮発と不揮発', '作業用のメモ帳', '3つの散らかり', 'プロセス終了で回収', '身近な症状の答え合わせ',
    '2種類のバグに名前がある', 'ハイゼンバグとボーアバグ', '132件の衝撃', 'レースコンディション',
    '直らない側の正体', '視点の転換', 'Crash-Only Software', 'Let It Crash と Supervisor Tree',
    'Microreboot', 'Kubernetes の自己修復', '飛行機に潜むバグ', '4基同時のパニック',
    'セーフティクリティカル', '2つの流派', '今日の軸', '明日からのボタン',
];
