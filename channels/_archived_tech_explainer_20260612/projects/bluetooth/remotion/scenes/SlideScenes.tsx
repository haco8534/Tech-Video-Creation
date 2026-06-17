import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const PALETTE = {
    ...BASE_COLORS,
    primary: '#1E88E5',         // Bluetooth blue
    primaryDeep: '#0D47A1',
    primaryGlow: 'rgba(30, 136, 229, 0.22)',
    accent: '#EF4444',           // 干渉・問題
    warm: '#F97316',
    amber: '#F59E0B',
    success: '#10B981',
    sky: '#38BDF8',
    indigo: '#6366F1',
    rose: '#EC4899',
    violet: '#8B5CF6',
    teal: '#14B8A6',
    ink: '#0F172A',
    muted: '#64748B',
    paper: '#F8FAFC',
    softBlue: '#DBEAFE',
    softRed: '#FEE2E2',
    softAmber: '#FEF3C7',
    softGreen: '#D1FAE5',
};

const fade = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const rise = (f: number, from: number, to = from + 18, dist = 16) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Stage: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: 80, paddingRight: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</div>
);

// ===== Scene 0: あの音飛び =====
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                {/* タイトル */}
                <text x="800" y="80" fill={PALETTE.ink} fontSize="56" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0, 18) }}>
                    家では平気、でも駅で崩れる
                </text>
                <text x="800" y="130" fill={PALETTE.muted} fontSize="30" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 10, 28) }}>
                    Bluetoothの「不安定さ」あるある
                </text>

                {/* 左: 家の中（安定） */}
                <g style={{ opacity: fade(f, 25, 45), transform: `translateY(${rise(f, 25, 45)}px)` }}>
                    <rect x="80" y="180" width="650" height="380" rx="22"
                        fill={PALETTE.softGreen} stroke={PALETTE.success} strokeWidth="4" />
                    <text x="405" y="232" fill={PALETTE.success} fontSize="34" textAnchor="middle" fontWeight="900">家の中</text>
                    <text x="405" y="270" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700">安定して聴ける</text>

                    {/* スマホ */}
                    <g transform="translate(220 380)">
                        <rect x="-40" y="-70" width="80" height="140" rx="14" fill={PALETTE.ink} />
                        <rect x="-32" y="-60" width="64" height="110" rx="6" fill={PALETTE.sky} />
                    </g>
                    {/* 安定した波 */}
                    {[0, 1, 2].map(i => (
                        <path key={i}
                            d={`M 280 380 Q ${330 + i * 40} ${360 + (i % 2) * 8} ${400 + i * 60} 380`}
                            fill="none" stroke={PALETTE.success} strokeWidth="6" strokeLinecap="round" />
                    ))}
                    {/* イヤホン */}
                    <g transform="translate(580 380)">
                        <ellipse cx="0" cy="0" rx="30" ry="22" fill={PALETTE.paper} stroke={PALETTE.ink} strokeWidth="3" />
                        <circle cx="0" cy="0" r="14" fill={PALETTE.success} />
                    </g>
                    <text x="405" y="510" fill={PALETTE.ink} fontSize="28" textAnchor="middle" fontWeight="800">♪ なめらかに再生</text>
                </g>

                {/* 右: 駅のホーム（崩壊） */}
                <g style={{ opacity: fade(f, 60, 80), transform: `translateY(${rise(f, 60, 80)}px)` }}>
                    <rect x="870" y="180" width="650" height="380" rx="22"
                        fill={PALETTE.softRed} stroke={PALETTE.accent} strokeWidth="4" />
                    <text x="1195" y="232" fill={PALETTE.accent} fontSize="34" textAnchor="middle" fontWeight="900">駅のホーム</text>
                    <text x="1195" y="270" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700">急にブツブツ途切れる</text>

                    {/* スマホ */}
                    <g transform="translate(1010 380)">
                        <rect x="-40" y="-70" width="80" height="140" rx="14" fill={PALETTE.ink} />
                        <rect x="-32" y="-60" width="64" height="110" rx="6" fill={PALETTE.sky} />
                    </g>
                    {/* 切れ切れの波 */}
                    {[0, 1, 2].map(i => (
                        <path key={i}
                            d={`M ${1080 + i * 60} 380 Q ${1095 + i * 60} ${380 - 18} ${1115 + i * 60} 380`}
                            fill="none" stroke={PALETTE.accent} strokeWidth="6" strokeLinecap="round"
                            opacity={fade(f, 80 + i * 6, 88 + i * 6) * (1 - (f % 30) / 60)}
                        />
                    ))}
                    {/* 「途切れ」マーク */}
                    <g transform="translate(1240 360)" style={{ opacity: fade(f, 100) }}>
                        <text x="0" y="0" fill={PALETTE.accent} fontSize="58" fontWeight="900" textAnchor="middle">×</text>
                    </g>
                    {/* イヤホン */}
                    <g transform="translate(1370 380)">
                        <ellipse cx="0" cy="0" rx="30" ry="22" fill={PALETTE.paper} stroke={PALETTE.ink} strokeWidth="3" />
                        <circle cx="0" cy="0" r="14" fill={PALETTE.accent} />
                    </g>
                    <text x="1195" y="510" fill={PALETTE.ink} fontSize="28" textAnchor="middle" fontWeight="800">… ブツッ … シーン …</text>
                </g>

                {/* 矢印（同じ機器なのに） */}
                <g style={{ opacity: fade(f, 110, 128) }}>
                    <text x="800" y="595" fill={PALETTE.muted} fontSize="24" textAnchor="middle" fontWeight="700">
                        同じ機器、同じイヤホン、なのに表情が一変する
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 1: 今日の見取り図 =====
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cards = [
        { title: '混雑した道路', sub: '2.4 GHz共有帯域', icon: 'road', color: PALETTE.warm, soft: PALETTE.softAmber, x: 130 },
        { title: '体は水袋', sub: '電波を吸収する人体', icon: 'body', color: PALETTE.sky, soft: '#E0F2FE', x: 600 },
        { title: '25年の地層', sub: '積み重なった仕様', icon: 'layers', color: PALETTE.violet, soft: '#EDE9FE', x: 1070 },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="70" fill={PALETTE.ink} fontSize="48" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    不安定さの三つの理由
                </text>
                <text x="800" y="115" fill={PALETTE.muted} fontSize="26" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 10) }}>
                    今日はこの三つを順番にほどいていく
                </text>

                {cards.map((c, i) => {
                    const start = 25 + i * 22;
                    return (
                        <g key={i} style={{ opacity: fade(f, start), transform: `translateY(${rise(f, start)}px)` }}>
                            <rect x={c.x} y="170" width="400" height="380" rx="22"
                                fill={c.soft} stroke={c.color} strokeWidth="4" />
                            <circle cx={c.x + 200} cy="260" r="60" fill={c.color} opacity="0.16" />
                            <circle cx={c.x + 200} cy="260" r="40" fill={c.color} opacity="0.3" />
                            <text x={c.x + 200} y="278" fill={c.color} fontSize="40" textAnchor="middle" fontWeight="900">
                                {i + 1}
                            </text>
                            <text x={c.x + 200} y="385" fill={PALETTE.ink} fontSize="34" textAnchor="middle" fontWeight="900">
                                {c.title}
                            </text>
                            <text x={c.x + 200} y="430" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700">
                                {c.sub}
                            </text>
                            {/* アイコン */}
                            {c.icon === 'road' && (
                                <g transform={`translate(${c.x + 200} 490)`}>
                                    <rect x="-90" y="-8" width="180" height="16" fill={c.color} opacity="0.4" rx="3" />
                                    <rect x="-70" y="-3" width="20" height="6" fill={c.color} />
                                    <rect x="-30" y="-3" width="20" height="6" fill={c.color} />
                                    <rect x="10" y="-3" width="20" height="6" fill={c.color} />
                                    <rect x="50" y="-3" width="20" height="6" fill={c.color} />
                                </g>
                            )}
                            {c.icon === 'body' && (
                                <g transform={`translate(${c.x + 200} 480)`}>
                                    <circle cx="0" cy="-12" r="14" fill={c.color} opacity="0.6" />
                                    <path d="M -22 6 Q 0 -8 22 6 L 22 30 Q 0 36 -22 30 Z" fill={c.color} opacity="0.6" />
                                    {/* 水滴 */}
                                    {[-30, 0, 30].map((dx, j) => (
                                        <circle key={j} cx={dx} cy="14" r="3" fill="#3B82F6" opacity="0.8" />
                                    ))}
                                </g>
                            )}
                            {c.icon === 'layers' && (
                                <g transform={`translate(${c.x + 200} 480)`}>
                                    {[0, 1, 2, 3].map(j => (
                                        <rect key={j} x="-70" y={-20 + j * 12} width="140" height="8"
                                            fill={c.color} opacity={0.3 + j * 0.18} rx="2" />
                                    ))}
                                </g>
                            )}
                        </g>
                    );
                })}

                {/* 締めメッセージ */}
                <text x="800" y="600" fill={PALETTE.ink} fontSize="26" textAnchor="middle" fontWeight="800"
                    style={{ opacity: fade(f, 110) }}>
                    運でも欠陥でもなく、構造の問題
                </text>
            </svg>
        </Stage>
    );
};

// ===== Scene 2: 共有の電波道路 (2.4 GHz ISM band) =====
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const devices = [
        { name: 'Wi-Fi', color: PALETTE.indigo, x: 110 },
        { name: 'Bluetooth', color: PALETTE.primary, x: 320 },
        { name: '電子レンジ', color: PALETTE.warm, x: 530 },
        { name: 'ZigBee', color: PALETTE.success, x: 740 },
        { name: 'ベビーモニター', color: PALETTE.rose, x: 950 },
        { name: 'コードレス電話', color: PALETTE.violet, x: 1180 },
        { name: 'USB 3.0', color: PALETTE.accent, x: 1410 },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="60" fill={PALETTE.ink} fontSize="44" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    2.4 GHzは「世界中で共有」される道路
                </text>
                <text x="800" y="100" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 12) }}>
                    免許不要で誰でも使える ISM帯（産業・科学・医療用）
                </text>

                {/* 帯域バー */}
                <g style={{ opacity: fade(f, 25) }}>
                    <rect x="80" y="160" width="1440" height="60" rx="12"
                        fill={PALETTE.softBlue} stroke={PALETTE.primaryDeep} strokeWidth="3" />
                    <text x="100" y="200" fill={PALETTE.primaryDeep} fontSize="22" fontWeight="900">2400 MHz</text>
                    <text x="800" y="200" fill={PALETTE.primaryDeep} fontSize="28" textAnchor="middle" fontWeight="900">
                        2.4 GHz ISM 帯
                    </text>
                    <text x="1500" y="200" fill={PALETTE.primaryDeep} fontSize="22" textAnchor="end" fontWeight="900">2483.5 MHz</text>
                </g>

                {/* デバイスたちの登場（連続fade） */}
                {devices.map((d, i) => {
                    const start = 40 + i * 8;
                    return (
                        <g key={i} style={{ opacity: fade(f, start, start + 10), transform: `translateY(${rise(f, start, start + 10)}px)` }}>
                            <line x1={d.x + 60} y1="280" x2={d.x + 60} y2="220"
                                stroke={d.color} strokeWidth="3" strokeDasharray="4 4" />
                            <rect x={d.x} y="280" width="120" height="68" rx="10"
                                fill="white" stroke={d.color} strokeWidth="3" />
                            <text x={d.x + 60} y="324" fill={d.color} fontSize={d.name.length > 6 ? 18 : 22}
                                textAnchor="middle" fontWeight="900">{d.name}</text>
                        </g>
                    );
                })}

                {/* 衝突マーク（ランダムな点滅） */}
                {[300, 540, 760, 1180].map((cx, i) => {
                    const start = 110 + i * 5;
                    return (
                        <g key={i} style={{ opacity: fade(f, start, start + 12) }}>
                            <text x={cx} y="200" fill={PALETTE.accent} fontSize="44" textAnchor="middle" fontWeight="900">⚡</text>
                        </g>
                    );
                })}

                {/* 下部ハイライト */}
                <g style={{ opacity: fade(f, 145) }}>
                    <rect x="160" y="430" width="1280" height="160" rx="22"
                        fill={PALETTE.softAmber} stroke={PALETTE.amber} strokeWidth="3" />
                    <text x="800" y="476" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="900">
                        意外な犯人 — USB 3.0
                    </text>
                    <text x="800" y="516" fill={PALETTE.ink} fontSize="22" textAnchor="middle" fontWeight="700">
                        高速データ送信のノイズが、ちょうど 2.4 GHz帯にかぶる
                    </text>
                    <text x="800" y="556" fill={PALETTE.muted} fontSize="20" textAnchor="middle" fontWeight="700">
                        Intel公式文書にも明記された干渉源。机のドングルが負ける理由
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 3: 周波数ホッピング =====
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => {
    const lanes = 24;     // 79を簡略化
    const laneW = 1440 / lanes;
    // ホッピングパケット（時刻ごとに別レーン）
    const hopPositions = [3, 11, 7, 17, 5, 14, 9, 20, 2, 12, 18, 6, 15, 22, 8];
    const hopStart = 25;
    const hopInterval = 6;
    const currentHop = Math.floor((f - hopStart) / hopInterval);
    // Wi-Fi占有レーン（AFH説明後）
    const wifiLanes = [4, 5, 6, 13, 14, 15, 21, 22, 23];
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="55" fill={PALETTE.ink} fontSize="42" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    1秒に1600回、レーンを飛び回る
                </text>
                <text x="800" y="95" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 10) }}>
                    周波数ホッピング — 1本に居座らないことで衝突を避ける
                </text>

                {/* 79本のレーン（簡略化して24本表示） */}
                <g style={{ opacity: fade(f, 18) }}>
                    {Array.from({ length: lanes }).map((_, i) => (
                        <rect key={i} x={80 + i * laneW + 2} y="160" width={laneW - 4} height="280"
                            fill={PALETTE.softBlue} stroke={PALETTE.primaryDeep} strokeOpacity="0.3" strokeWidth="1" />
                    ))}
                    <text x="80" y="475" fill={PALETTE.muted} fontSize="20" fontWeight="700">2400</text>
                    <text x="1520" y="475" fill={PALETTE.muted} fontSize="20" textAnchor="end" fontWeight="700">2483.5 MHz</text>
                    <text x="800" y="475" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="800">
                        全79チャンネル（1 MHz幅）
                    </text>
                </g>

                {/* ホッピングパケット軌跡 */}
                {hopPositions.slice(0, Math.max(0, Math.min(currentHop + 1, hopPositions.length))).map((pos, i) => {
                    const localStart = hopStart + i * hopInterval;
                    const op = fade(f, localStart, localStart + 4);
                    const cx = 80 + pos * laneW + laneW / 2;
                    const cy = 200 + (i % 4) * 50;
                    return (
                        <g key={i} style={{ opacity: op * 0.9 }}>
                            <circle cx={cx} cy={cy} r="14" fill={PALETTE.primary} />
                            <circle cx={cx} cy={cy} r="22" fill="none" stroke={PALETTE.primary} strokeWidth="2" opacity="0.4" />
                        </g>
                    );
                })}

                {/* 矢印（飛んでいる動き）— 連続線 */}
                <g style={{ opacity: fade(f, 80) }}>
                    <text x="800" y="420" fill={PALETTE.primary} fontSize="22" textAnchor="middle" fontWeight="900">
                        ぴょん、ぴょん、ぴょん…
                    </text>
                </g>

                {/* AFH 後付け説明 */}
                <g style={{ opacity: fade(f, 130) }}>
                    <rect x="80" y="510" width="1440" height="100" rx="18"
                        fill={PALETTE.softAmber} stroke={PALETTE.amber} strokeWidth="3" />
                    <text x="120" y="552" fill={PALETTE.amber} fontSize="26" fontWeight="900">2003年: AFH</text>
                    <text x="120" y="588" fill={PALETTE.ink} fontSize="22" fontWeight="700">
                        後付けで「Wi-Fi占有レーンを避ける」機能を追加
                    </text>
                    <text x="1480" y="552" fill={PALETTE.muted} fontSize="20" textAnchor="end" fontWeight="700">
                        交通整理係を後から雇った
                    </text>
                </g>

                {/* Wi-Fi占有マーク（AFH説明後に出す） */}
                {wifiLanes.map((idx, i) => (
                    <rect key={i} x={80 + idx * laneW + 2} y="160" width={laneW - 4} height="280"
                        fill={PALETTE.indigo} opacity={fade(f, 145 + i, 152 + i) * 0.25} />
                ))}
                <text x="800" y="135" fill={PALETTE.indigo} fontSize="22" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 158) }}>
                    Wi-Fiが占有する範囲（観測して避ける）
                </text>
            </svg>
        </Stage>
    );
};

// ===== Scene 4: 体は水袋 =====
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="60" fill={PALETTE.ink} fontSize="44" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    人の体は、2.4 GHz電波を吸う「水袋」
                </text>
                <text x="800" y="100" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 10) }}>
                    体の60% = 水分。電子レンジが食べ物を温めるのと同じ原理
                </text>

                {/* 中央：人体シルエット */}
                <g style={{ opacity: fade(f, 25) }}>
                    {/* 頭 */}
                    <circle cx="800" cy="200" r="50" fill={PALETTE.sky} opacity="0.55" stroke={PALETTE.primaryDeep} strokeWidth="3" />
                    {/* 胴体 */}
                    <path d="M 720 260 Q 800 245 880 260 L 920 480 Q 800 500 680 480 Z"
                        fill={PALETTE.sky} opacity="0.55" stroke={PALETTE.primaryDeep} strokeWidth="3" />
                </g>

                {/* 水滴アイコン（体内）*/}
                {[
                    { x: 750, y: 320 }, { x: 820, y: 350 }, { x: 770, y: 400 },
                    { x: 840, y: 420 }, { x: 790, y: 460 }, { x: 720, y: 380 }
                ].map((p, i) => (
                    <g key={i} style={{ opacity: fade(f, 35 + i * 3) }}>
                        <path d={`M ${p.x} ${p.y - 12} Q ${p.x + 9} ${p.y - 4} ${p.x + 9} ${p.y + 4} A 9 9 0 1 1 ${p.x - 9} ${p.y + 4} Q ${p.x - 9} ${p.y - 4} ${p.x} ${p.y - 12} Z`}
                            fill="#1D4ED8" opacity="0.7" />
                    </g>
                ))}

                {/* 60% 表示 */}
                <g style={{ opacity: fade(f, 60) }}>
                    <text x="800" y="365" fill="white" fontSize="64" textAnchor="middle" fontWeight="900"
                        stroke={PALETTE.primaryDeep} strokeWidth="4" paintOrder="stroke">60%</text>
                    <text x="800" y="402" fill={PALETTE.primaryDeep} fontSize="22" textAnchor="middle" fontWeight="900">が水分</text>
                </g>

                {/* 左：ポケットのスマホ */}
                <g style={{ opacity: fade(f, 80) }}>
                    <g transform="translate(620 410)">
                        <rect x="-32" y="-58" width="64" height="116" rx="10" fill={PALETTE.ink} />
                        <rect x="-26" y="-50" width="52" height="92" rx="4" fill={PALETTE.sky} />
                    </g>
                    <text x="620" y="500" fill={PALETTE.ink} fontSize="20" textAnchor="middle" fontWeight="800">右ポケット</text>
                </g>

                {/* 右：イヤホン */}
                <g style={{ opacity: fade(f, 90) }}>
                    <ellipse cx="850" cy="195" rx="22" ry="16" fill={PALETTE.paper} stroke={PALETTE.ink} strokeWidth="3" />
                    <circle cx="850" cy="195" r="9" fill={PALETTE.primary} />
                    <text x="900" y="200" fill={PALETTE.ink} fontSize="20" fontWeight="800">左耳</text>
                </g>

                {/* 信号経路（減衰しながら） */}
                {[0, 1, 2, 3, 4].map(i => {
                    const start = 100 + i * 4;
                    return (
                        <g key={i} style={{ opacity: fade(f, start) * (1 - i * 0.18) }}>
                            <path d="M 620 360 Q 720 250 850 200"
                                fill="none" stroke={PALETTE.primary} strokeWidth={5 - i * 0.6}
                                strokeDasharray="10 6" opacity={1 - i * 0.18}
                            />
                        </g>
                    );
                })}
                <text x="730" y="285" fill={PALETTE.accent} fontSize="22" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 130) }}>
                    胴体を斜めに横切る → 弱る
                </text>

                {/* 右側：電子レンジとの対比 */}
                <g style={{ opacity: fade(f, 155) }}>
                    <rect x="1100" y="200" width="380" height="240" rx="18"
                        fill={PALETTE.softAmber} stroke={PALETTE.amber} strokeWidth="3" />
                    <text x="1290" y="240" fill={PALETTE.amber} fontSize="26" textAnchor="middle" fontWeight="900">
                        電子レンジは 2.45 GHz
                    </text>
                    {/* レンジ筐体 */}
                    <g transform="translate(1290 320)">
                        <rect x="-90" y="-40" width="180" height="80" rx="6" fill={PALETTE.ink} />
                        <rect x="-80" y="-32" width="120" height="64" rx="3" fill={PALETTE.sky} />
                        <circle cx="58" cy="-12" r="4" fill={PALETTE.success} />
                    </g>
                    <text x="1290" y="400" fill={PALETTE.ink} fontSize="20" textAnchor="middle" fontWeight="800">
                        水を効率よく温める周波数
                    </text>
                    <text x="1290" y="425" fill={PALETTE.muted} fontSize="18" textAnchor="middle" fontWeight="700">
                        Bluetoothと「同じ家族」
                    </text>
                </g>

                {/* 下部メッセージ */}
                <g style={{ opacity: fade(f, 175) }}>
                    <rect x="200" y="510" width="1200" height="80" rx="18" fill={PALETTE.softRed} stroke={PALETTE.accent} strokeWidth="3" />
                    <text x="800" y="558" fill={PALETTE.ink} fontSize="26" textAnchor="middle" fontWeight="900">
                        人混みでは「他人の体」までもが関所になる
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 5: 小さなアンテナ =====
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="60" fill={PALETTE.ink} fontSize="44" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    豆粒サイズで電波を扱う宿命
                </text>
                <text x="800" y="100" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 10) }}>
                    TWSイヤホンの中身は、物理的にハンデを抱えている
                </text>

                {/* 左：イヤホン拡大図 */}
                <g style={{ opacity: fade(f, 25) }}>
                    <rect x="80" y="160" width="600" height="380" rx="22"
                        fill={PALETTE.paper} stroke={PALETTE.muted} strokeWidth="3" />
                    <text x="380" y="200" fill={PALETTE.ink} fontSize="26" textAnchor="middle" fontWeight="900">
                        TWSイヤホン断面
                    </text>
                    {/* イヤホン本体 */}
                    <g transform="translate(380 360)">
                        <ellipse cx="0" cy="0" rx="160" ry="120" fill="white" stroke={PALETTE.ink} strokeWidth="4" />
                        {/* 内部部品 */}
                        <rect x="-80" y="-40" width="60" height="80" rx="6" fill={PALETTE.muted} opacity="0.4" />
                        <text x="-50" y="5" fill={PALETTE.ink} fontSize="14" textAnchor="middle" fontWeight="700">バッテリー</text>
                        <circle cx="40" cy="0" r="32" fill={PALETTE.muted} opacity="0.4" />
                        <text x="40" y="5" fill={PALETTE.ink} fontSize="14" textAnchor="middle" fontWeight="700">ドライバー</text>
                        {/* アンテナ */}
                        <g style={{ opacity: fade(f, 50) }}>
                            <line x1="-30" y1="-78" x2="30" y2="-78" stroke={PALETTE.accent} strokeWidth="5" />
                            <text x="0" y="-92" fill={PALETTE.accent} fontSize="18" textAnchor="middle" fontWeight="900">
                                アンテナ
                            </text>
                            <line x1="-30" y1="-66" x2="30" y2="-66" stroke={PALETTE.accent} strokeWidth="2" strokeDasharray="3 2" />
                            <text x="62" y="-71" fill={PALETTE.accent} fontSize="14" fontWeight="800">数mm</text>
                        </g>
                    </g>
                </g>

                {/* 右：波長との対比 */}
                <g style={{ opacity: fade(f, 70) }}>
                    <rect x="730" y="160" width="780" height="380" rx="22"
                        fill={PALETTE.softAmber} stroke={PALETTE.amber} strokeWidth="3" />
                    <text x="1120" y="200" fill={PALETTE.ink} fontSize="26" textAnchor="middle" fontWeight="900">
                        2.4 GHzの波長と、アンテナの理想長
                    </text>

                    {/* 波長スケール */}
                    <g style={{ opacity: fade(f, 85) }}>
                        <text x="780" y="280" fill={PALETTE.muted} fontSize="20" fontWeight="800">理想長:</text>
                        <line x1="780" y1="310" x2="1100" y2="310" stroke={PALETTE.success} strokeWidth="4" />
                        <line x1="780" y1="298" x2="780" y2="322" stroke={PALETTE.success} strokeWidth="4" />
                        <line x1="1100" y1="298" x2="1100" y2="322" stroke={PALETTE.success} strokeWidth="4" />
                        <text x="940" y="345" fill={PALETTE.success} fontSize="22" textAnchor="middle" fontWeight="900">
                            数センチ欲しい
                        </text>
                    </g>

                    <g style={{ opacity: fade(f, 100) }}>
                        <text x="780" y="395" fill={PALETTE.muted} fontSize="20" fontWeight="800">実際:</text>
                        <line x1="780" y1="425" x2="800" y2="425" stroke={PALETTE.accent} strokeWidth="6" />
                        <line x1="780" y1="413" x2="780" y2="437" stroke={PALETTE.accent} strokeWidth="4" />
                        <line x1="800" y1="413" x2="800" y2="437" stroke={PALETTE.accent} strokeWidth="4" />
                        <text x="850" y="430" fill={PALETTE.accent} fontSize="22" fontWeight="900">数mmしかない</text>
                    </g>

                    <text x="1120" y="490" fill={PALETTE.ink} fontSize="22" textAnchor="middle" fontWeight="900"
                        style={{ opacity: fade(f, 115) }}>
                        最初から「無理のあるサイズ」で動かしている
                    </text>
                </g>

                {/* 下部：装着で特性がズレる */}
                <g style={{ opacity: fade(f, 140) }}>
                    <rect x="160" y="556" width="1280" height="40" rx="12" fill={PALETTE.softRed} />
                    <text x="800" y="582" fill={PALETTE.accent} fontSize="22" textAnchor="middle" fontWeight="900">
                        さらに、装着すると皮膚と水分でアンテナ特性がズレる
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 6: 設計上の宿命 =====
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="55" fill={PALETTE.ink} fontSize="44" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    「途切れに弱い」設計
                </text>
                <text x="800" y="95" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 10) }}>
                    Bluetoothは常に接続を保ちながら通信するタイプ
                </text>

                {/* 上段：ハートビート */}
                <g style={{ opacity: fade(f, 25) }}>
                    <text x="100" y="170" fill={PALETTE.ink} fontSize="22" fontWeight="900">心拍のように確認し合う</text>
                    {/* スマホ */}
                    <g transform="translate(180 250)">
                        <rect x="-32" y="-48" width="64" height="96" rx="8" fill={PALETTE.ink} />
                        <rect x="-26" y="-40" width="52" height="76" rx="3" fill={PALETTE.sky} />
                        <text x="0" y="74" fill={PALETTE.ink} fontSize="18" textAnchor="middle" fontWeight="800">スマホ</text>
                    </g>
                    {/* イヤホン */}
                    <g transform="translate(800 250)">
                        <ellipse cx="0" cy="0" rx="32" ry="22" fill={PALETTE.paper} stroke={PALETTE.ink} strokeWidth="3" />
                        <circle cx="0" cy="0" r="14" fill={PALETTE.primary} />
                        <text x="0" y="74" fill={PALETTE.ink} fontSize="18" textAnchor="middle" fontWeight="800">イヤホン</text>
                    </g>
                    {/* 確認パケット ピポピポ */}
                    {[0, 1, 2, 3, 4].map(i => {
                        const start = 40 + i * 10;
                        const isLeft = i % 2 === 0;
                        const x = isLeft ? 220 + i * 100 : 770 - (4 - i) * 100;
                        return (
                            <g key={i} style={{ opacity: fade(f, start, start + 6) }}>
                                <circle cx={x} cy="250" r="8" fill={isLeft ? PALETTE.primary : PALETTE.success} />
                                <text x={x} y="220" fill={PALETTE.muted} fontSize="14" textAnchor="middle" fontWeight="700">
                                    {isLeft ? '居る？' : 'はい'}
                                </text>
                            </g>
                        );
                    })}
                </g>

                {/* タイムアウト */}
                <g style={{ opacity: fade(f, 95) }}>
                    <line x1="100" y1="320" x2="1500" y2="320" stroke={PALETTE.muted} strokeOpacity="0.3" strokeWidth="2" />
                    <text x="100" y="370" fill={PALETTE.accent} fontSize="22" fontWeight="900">返事がない時間が一定を超えると…</text>
                    {/* タイムアウトバー */}
                    <rect x="100" y="395" width="1100" height="32" rx="10" fill={PALETTE.softRed} stroke={PALETTE.accent} strokeWidth="2" />
                    <rect x="100" y="395" width={Math.min(1100, fade(f, 110, 145) * 1100)} height="32" rx="10" fill={PALETTE.accent} opacity="0.7" />
                    <text x="650" y="418" fill="white" fontSize="20" textAnchor="middle" fontWeight="900">スーパービジョン タイムアウト</text>
                    <text x="1240" y="418" fill={PALETTE.accent} fontSize="22" fontWeight="900">→ 切断</text>
                </g>

                {/* 下段：プロファイル切替 */}
                <g style={{ opacity: fade(f, 155) }}>
                    <text x="100" y="475" fill={PALETTE.ink} fontSize="22" fontWeight="900">
                        プロファイル — 用途で「制服を着替える」
                    </text>
                    {/* A2DP */}
                    <rect x="100" y="495" width="320" height="100" rx="14"
                        fill={PALETTE.softGreen} stroke={PALETTE.success} strokeWidth="3" />
                    <text x="260" y="528" fill={PALETTE.success} fontSize="24" textAnchor="middle" fontWeight="900">A2DP</text>
                    <text x="260" y="560" fill={PALETTE.ink} fontSize="20" textAnchor="middle" fontWeight="800">音楽用・高音質</text>
                    <text x="260" y="582" fill={PALETTE.muted} fontSize="16" textAnchor="middle" fontWeight="700">片方向ストリーム</text>

                    {/* 矢印 */}
                    <g transform="translate(490 545)">
                        <path d="M -40 0 L 40 0 M 25 -10 L 40 0 L 25 10" fill="none"
                            stroke={PALETTE.amber} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="0" y="-22" fill={PALETTE.amber} fontSize="18" textAnchor="middle" fontWeight="900">電話着信</text>
                    </g>

                    {/* HFP */}
                    <rect x="560" y="495" width="320" height="100" rx="14"
                        fill={PALETTE.softAmber} stroke={PALETTE.amber} strokeWidth="3" />
                    <text x="720" y="528" fill={PALETTE.amber} fontSize="24" textAnchor="middle" fontWeight="900">HFP</text>
                    <text x="720" y="560" fill={PALETTE.ink} fontSize="20" textAnchor="middle" fontWeight="800">通話用・低音質</text>
                    <text x="720" y="582" fill={PALETTE.muted} fontSize="16" textAnchor="middle" fontWeight="700">双方向・帯域節約</text>

                    {/* 補足 */}
                    <g transform="translate(1180 545)">
                        <text x="0" y="-10" fill={PALETTE.ink} fontSize="22" textAnchor="middle" fontWeight="900">通信が悪いのではなく</text>
                        <text x="0" y="22" fill={PALETTE.accent} fontSize="22" textAnchor="middle" fontWeight="900">規格上そう動く</text>
                    </g>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 7: 25年の地層 =====
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => {
    const milestones = [
        { year: '1999', label: 'Bluetooth 1.0', sub: 'Classic登場（ケーブル代替）', color: PALETTE.primary, y: 200 },
        { year: '2003', label: 'Bluetooth 1.2', sub: 'AFH追加（Wi-Fi対策）', color: PALETTE.amber, y: 260 },
        { year: '2010', label: 'Bluetooth 4.0', sub: 'BLE登場（別物理層）', color: PALETTE.violet, y: 320 },
        { year: '2017', label: 'Bluetooth Mesh', sub: 'メッシュネット対応', color: PALETTE.teal, y: 380 },
        { year: '2020', label: 'Bluetooth 5.2', sub: 'LE Audio・LC3 追加', color: PALETTE.rose, y: 440 },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="60" fill={PALETTE.ink} fontSize="44" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    25年積み重なった「地層」
                </text>
                <text x="800" y="100" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 10) }}>
                    Bluetoothは「ひとつの規格」ではなく、複数の世代の集合体
                </text>

                {/* 左側：タイムライン軸 */}
                <line x1="220" y1="180" x2="220" y2="500" stroke={PALETTE.muted} strokeWidth="3"
                    style={{ opacity: fade(f, 18) }} />

                {milestones.map((m, i) => {
                    const start = 28 + i * 12;
                    return (
                        <g key={i} style={{ opacity: fade(f, start), transform: `translateX(${rise(f, start, start + 16, -20)}px)` }}>
                            <circle cx="220" cy={m.y} r="14" fill={m.color} stroke="white" strokeWidth="4" />
                            <rect x="260" y={m.y - 22} width="700" height="48" rx="10"
                                fill="white" stroke={m.color} strokeWidth="3" />
                            <text x="280" y={m.y + 6} fill={m.color} fontSize="22" fontWeight="900">{m.year}</text>
                            <text x="380" y={m.y + 6} fill={PALETTE.ink} fontSize="22" fontWeight="900">{m.label}</text>
                            <text x="630" y={m.y + 6} fill={PALETTE.muted} fontSize="20" fontWeight="700">— {m.sub}</text>
                        </g>
                    );
                })}

                {/* 右側：仕様書の厚み */}
                <g style={{ opacity: fade(f, 105) }}>
                    <text x="1280" y="170" fill={PALETTE.ink} fontSize="24" textAnchor="middle" fontWeight="900">
                        Core Specification
                    </text>
                    <text x="1280" y="200" fill={PALETTE.muted} fontSize="18" textAnchor="middle" fontWeight="700">
                        2024年時点
                    </text>
                    {/* 本のスタック */}
                    <g transform="translate(1280 360)">
                        {[0, 1, 2, 3, 4, 5, 6].map(j => (
                            <rect key={j} x="-90" y={-30 + j * 20} width="180" height="18"
                                fill={j % 2 === 0 ? PALETTE.primary : PALETTE.primaryDeep}
                                rx="3" />
                        ))}
                        <text x="0" y="160" fill={PALETTE.primaryDeep} fontSize="48" fontWeight="900" textAnchor="middle">
                            3000+
                        </text>
                        <text x="0" y="195" fill={PALETTE.ink} fontSize="22" fontWeight="800" textAnchor="middle">
                            ページ超
                        </text>
                    </g>
                </g>

                {/* 下部：プロファイルの混在 */}
                <g style={{ opacity: fade(f, 130) }}>
                    <rect x="180" y="540" width="1240" height="60" rx="14"
                        fill={PALETTE.softBlue} stroke={PALETTE.primaryDeep} strokeWidth="2" />
                    <text x="800" y="580" fill={PALETTE.primaryDeep} fontSize="22" textAnchor="middle" fontWeight="900">
                        プロファイル30個以上 × メーカーごとの解釈差 → 機種で挙動が変わる
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 8: 三つの理由（まとめ） =====
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const reasons = [
        { num: '①', label: '共有道路の混雑', sub: '2.4 GHz × Wi-Fi × 電子レンジ × USB 3.0', color: PALETTE.warm, soft: PALETTE.softAmber, x: 80 },
        { num: '②', label: '物理的なハンデ', sub: '人体の水分 × 豆粒サイズのアンテナ', color: PALETTE.sky, soft: '#E0F2FE', x: 590 },
        { num: '③', label: '25年分の地層', sub: 'Classic / BLE / LE Audio が併存', color: PALETTE.violet, soft: '#EDE9FE', x: 1100 },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                <text x="800" y="65" fill={PALETTE.ink} fontSize="50" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    Bluetoothの不安定さの正体
                </text>

                {reasons.map((r, i) => {
                    const start = 18 + i * 16;
                    return (
                        <g key={i} style={{ opacity: fade(f, start), transform: `translateY(${rise(f, start)}px)` }}>
                            <rect x={r.x} y="160" width="420" height="280" rx="22"
                                fill={r.soft} stroke={r.color} strokeWidth="4" />
                            <text x={r.x + 210} y="230" fill={r.color} fontSize="60" textAnchor="middle" fontWeight="900">
                                {r.num}
                            </text>
                            <text x={r.x + 210} y="295" fill={PALETTE.ink} fontSize="32" textAnchor="middle" fontWeight="900">
                                {r.label}
                            </text>
                            <text x={r.x + 210} y="345" fill={PALETTE.muted} fontSize="20" textAnchor="middle" fontWeight="700">
                                {r.sub.split(' × ').map((part, j, arr) => (
                                    <tspan key={j} x={r.x + 210} dy={j === 0 ? 0 : 28}>{part}{j < arr.length - 1 ? ' ×' : ''}</tspan>
                                ))}
                            </text>
                        </g>
                    );
                })}

                {/* 締めメッセージ */}
                <g style={{ opacity: fade(f, 80) }}>
                    <rect x="160" y="480" width="1280" height="120" rx="22"
                        fill={PALETTE.softGreen} stroke={PALETTE.success} strokeWidth="3" />
                    <text x="800" y="525" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="900">
                        運でも欠陥でもなく、構造の問題
                    </text>
                    <text x="800" y="572" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="700">
                        1999年に「ケーブルを無くしたい」と願った仕組みが、25年後の今も頑張っている
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8,
];

export const SCENE_TITLES: string[] = [
    'あの音飛び',
    '今日の見取り図',
    '共有の電波道路',
    '周波数ホッピング',
    '体は水袋',
    '小さなアンテナ',
    '設計上の宿命',
    '25年の地層',
    '三つの理由',
];
