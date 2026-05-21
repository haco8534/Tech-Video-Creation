import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const PALETTE = {
    ...BASE_COLORS,
    primary: '#2563eb',
    primaryDeep: '#1e3a8a',
    primaryGlow: 'rgba(37, 99, 235, 0.22)',
    accent: '#ef4444',
    warm: '#f97316',
    amber: '#f59e0b',
    success: '#10b981',
    wall: '#94a3b8',
    wallDark: '#475569',
    ink: '#0f172a',
    muted: '#64748b',
    paper: '#f8fafc',
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

// ===== Scene 0: 家のなか不思議 =====
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                {/* 家の間取り（簡易） */}
                <g style={{ opacity: fade(f, 0, 20) }}>
                    <rect x="80" y="60" width="1440" height="500" rx="24"
                        fill="#fff" stroke={PALETTE.wallDark} strokeWidth="6" />
                    {/* リビング / 寝室 / トイレ */}
                    <rect x="80" y="60" width="640" height="500" fill="none"
                        stroke={PALETTE.wallDark} strokeWidth="6" />
                    <line x1="1120" y1="60" x2="1120" y2="560"
                        stroke={PALETTE.wallDark} strokeWidth="6" />
                    <line x1="1120" y1="320" x2="1520" y2="320"
                        stroke={PALETTE.wallDark} strokeWidth="6" />
                </g>
                <text x="400" y="110" fill={PALETTE.muted} fontSize="34" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 15, 35) }}>リビング</text>
                <text x="920" y="110" fill={PALETTE.muted} fontSize="34" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 15, 35) }}>寝室</text>
                <text x="1320" y="110" fill={PALETTE.muted} fontSize="28" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 15, 35) }}>トイレ</text>
                <text x="1320" y="370" fill={PALETTE.muted} fontSize="28" textAnchor="middle" fontWeight="700"
                    style={{ opacity: fade(f, 15, 35) }}>浴室</text>

                {/* ルータ */}
                <g transform="translate(400 320)" style={{ opacity: fade(f, 40, 60) }}>
                    <rect x="-56" y="-32" width="112" height="64" rx="10" fill={PALETTE.ink} />
                    <circle cx="-18" cy="-14" r="5" fill={PALETTE.success} />
                    <rect x="-34" y="32" width="4" height="28" fill={PALETTE.ink} />
                    <rect x="30" y="32" width="4" height="28" fill={PALETTE.ink} />
                    <text x="0" y="96" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="800">ルータ</text>
                </g>

                {/* 電波波紋（減衰） */}
                {[0, 1, 2, 3, 4, 5].map(i => {
                    const delay = 55 + i * 10;
                    const appear = fade(f, delay);
                    const r = 80 + i * 80;
                    const centerX = 400, centerY = 320, wallX = 720;
                    const strokeOpacity = (centerX + r) > wallX ? 0.15 : 0.55;
                    return (
                        <circle key={i} cx={centerX} cy={centerY} r={r}
                            fill="none" stroke={PALETTE.primary} strokeWidth="4"
                            strokeOpacity={strokeOpacity}
                            style={{ opacity: appear }} />
                    );
                })}

                {/* 各部屋の電波強度 */}
                <g transform="translate(920 300)" style={{ opacity: fade(f, 115) }}>
                    <text x="0" y="-30" fill={PALETTE.accent} fontSize="28" textAnchor="middle" fontWeight="700">弱い</text>
                    {[0, 1, 2, 3].map(i => {
                        const active = i < 1;
                        return (
                            <rect key={i} x={-30 + i * 20} y={20 - i * 8}
                                width="14" height={i * 8 + 10}
                                fill={active ? PALETTE.accent : PALETTE.wall}
                                opacity={active ? 1 : 0.25} />
                        );
                    })}
                </g>
                <g transform="translate(1320 420)" style={{ opacity: fade(f, 125) }}>
                    <text x="0" y="-30" fill={PALETTE.accent} fontSize="26" textAnchor="middle" fontWeight="700">もっと弱い</text>
                    {[0, 1, 2, 3].map(i => (
                        <rect key={i} x={-30 + i * 20} y={20 - i * 8}
                            width="14" height={i * 8 + 10}
                            fill={PALETTE.wall} opacity={0.2} />
                    ))}
                </g>

                {/* 吹き出し：視聴者のつぶやき */}
                <g style={{ opacity: fade(f, 140) }}>
                    <rect x="100" y="480" width="1400" height="70" rx="18"
                        fill={PALETTE.amber} opacity="0.15" />
                    <text x="800" y="524" fill={PALETTE.ink} fontSize="32" textAnchor="middle" fontWeight="800">
                        「なんで壁一枚で、こんなに変わるの？」
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 1: 今日の答え =====
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { n: '1', headline: '壁は止めていない', body: '通ってるけど、通るほど痩せる', color: PALETTE.primary },
        { n: '2', headline: '電波は跳ね返る', body: '家の中はまだらな強弱の地形', color: PALETTE.warm },
        { n: '3', headline: '2.4と5は兄弟', body: '壁強さと速さは逆方向の得意技', color: PALETTE.success },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%', maxWidth: 1500 }}>
                <div style={{
                    fontSize: 62, fontWeight: 900, color: PALETTE.ink, textAlign: 'center',
                    opacity: fade(f, 0), transform: `translateY(${rise(f, 0)}px)`,
                }}>今日の答え</div>
                <div style={{ fontSize: 32, color: PALETTE.muted, textAlign: 'center', marginTop: -4, fontWeight: 600,
                    opacity: fade(f, 12) }}>
                    家の中の電波の景色を変える三つの視点
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 18 }}>
                    {items.map((it, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 26,
                            padding: '28px 40px', borderRadius: 20,
                            background: '#fff', border: `3px solid ${it.color}`,
                            opacity: fade(f, 28 + i * 24),
                            transform: `translateX(${interpolate(f, [28 + i * 24, 46 + i * 24], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                            boxShadow: '0 8px 22px rgba(15,23,42,0.08)',
                        }}>
                            <div style={{
                                width: 88, height: 88, borderRadius: 18,
                                background: it.color, color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 52, fontWeight: 900, flexShrink: 0,
                            }}>{it.n}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ fontSize: 44, fontWeight: 900, color: PALETTE.ink }}>{it.headline}</div>
                                <div style={{ fontSize: 28, color: PALETTE.muted, fontWeight: 600 }}>{it.body}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ===== Scene 2: 壁は止めていない =====
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 440" width="100%" height="100%">
                {/* タイトル */}
                <text x="800" y="40" fill={PALETTE.ink} fontSize="44" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    壁は「止める」のではなく「弱くする」
                </text>

                {/* 壁（中央） */}
                <g style={{ opacity: fade(f, 12) }}>
                    <rect x="720" y="120" width="160" height="170" fill={PALETTE.wall} rx="4" />
                    {[0, 1, 2].map(k => (
                        <line key={k} x1="720" y1={160 + k * 45} x2="880" y2={160 + k * 45}
                            stroke={PALETTE.wallDark} strokeWidth="1.2" opacity="0.4" />
                    ))}
                    <text x="800" y="315" fill={PALETTE.wallDark} fontSize="26" textAnchor="middle" fontWeight="800">壁</text>
                </g>

                {/* 入る側：太い矢印 */}
                <g style={{ opacity: fade(f, 22) }}>
                    <path d="M 200 205 L 720 205" stroke={PALETTE.primary} strokeWidth="46"
                        strokeLinecap="round" opacity="0.9" />
                    <text x="440" y="160" fill={PALETTE.primary} fontSize="30" textAnchor="middle" fontWeight="900">強い電波</text>
                </g>

                {/* 出る側：細い矢印 */}
                <g style={{ opacity: fade(f, 55) }}>
                    <path d="M 880 205 L 1400 205" stroke={PALETTE.primary} strokeWidth="12"
                        strokeLinecap="round" opacity="0.55" markerEnd="url(#arrRight)" />
                    <text x="1140" y="160" fill={PALETTE.muted} fontSize="30" textAnchor="middle" fontWeight="900">痩せて出てくる</text>
                </g>

                {/* 壁内部で「細くなっていく」中間表現：太さがテーパ状に細くなる台形 */}
                <g style={{ opacity: fade(f, 38) }}>
                    <path d="M 720 182 L 880 193 L 880 217 L 720 228 Z"
                        fill={PALETTE.primary} opacity="0.6" />
                </g>

                {/* ×「止まる」の消去演出 */}
                <g style={{ opacity: fade(f, 70) }}>
                    <text x="800" y="385" fill={PALETTE.muted} fontSize="26" textAnchor="middle" fontWeight="700" textDecoration="line-through">
                        止まっている
                    </text>
                    <text x="800" y="425" fill={PALETTE.ink} fontSize="34" textAnchor="middle" fontWeight="900">
                        通りながら、エネルギーが減っていく
                    </text>
                </g>

                <defs>
                    <marker id="arrRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" fill={PALETTE.primary} opacity="0.6" />
                    </marker>
                </defs>
            </svg>
        </Stage>
    );
};

// ===== Scene 3: 家の中は迷路（反射・干渉） =====
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                {/* タイトル */}
                <text x="800" y="50" fill={PALETTE.ink} fontSize="42" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    家の中は、電波の鏡の迷路
                </text>

                {/* 部屋の外枠 */}
                <g style={{ opacity: fade(f, 10) }}>
                    <rect x="160" y="120" width="1280" height="400" rx="12"
                        fill="#fff" stroke={PALETTE.wallDark} strokeWidth="5" />
                </g>

                {/* ルータ（左） */}
                <g transform="translate(280 400)" style={{ opacity: fade(f, 20) }}>
                    <rect x="-40" y="-22" width="80" height="44" rx="8" fill={PALETTE.ink} />
                    <text x="0" y="50" fill={PALETTE.ink} fontSize="22" textAnchor="middle" fontWeight="700">ルータ</text>
                </g>
                {/* スマホ（右） */}
                <g transform="translate(1320 240)" style={{ opacity: fade(f, 28) }}>
                    <rect x="-20" y="-32" width="40" height="64" rx="6" fill={PALETTE.ink} />
                    <circle cx="0" cy="22" r="4" fill="#fff" />
                    <text x="0" y="60" fill={PALETTE.ink} fontSize="22" textAnchor="middle" fontWeight="700">スマホ</text>
                </g>

                {/* 複数経路 */}
                {/* 直接波 */}
                <g style={{ opacity: fade(f, 35) }}>
                    <path d="M 280 400 L 1320 240" stroke={PALETTE.primary} strokeWidth="4" fill="none" />
                    <text x="760" y="315" fill={PALETTE.primary} fontSize="22" fontWeight="800" textAnchor="middle">直接波</text>
                </g>
                {/* 天井反射 */}
                <g style={{ opacity: fade(f, 48) }}>
                    <path d="M 280 400 L 760 140 L 1320 240" stroke={PALETTE.warm} strokeWidth="4" fill="none" />
                    <circle cx="760" cy="140" r="8" fill={PALETTE.warm} />
                    <text x="760" y="115" fill={PALETTE.warm} fontSize="22" fontWeight="800" textAnchor="middle">天井で反射</text>
                </g>
                {/* 床反射 */}
                <g style={{ opacity: fade(f, 62) }}>
                    <path d="M 280 400 L 820 500 L 1320 240" stroke={PALETTE.success} strokeWidth="4" fill="none" />
                    <circle cx="820" cy="500" r="8" fill={PALETTE.success} />
                    <text x="820" y="490" fill={PALETTE.success} fontSize="22" fontWeight="800" textAnchor="middle">床で反射</text>
                </g>
                {/* 壁反射 */}
                <g style={{ opacity: fade(f, 76) }}>
                    <path d="M 280 400 L 260 260 L 1280 150 L 1320 240" stroke={PALETTE.accent}
                        strokeWidth="3.5" fill="none" />
                    <text x="320" y="235" fill={PALETTE.accent} fontSize="22" fontWeight="800">壁で反射</text>
                </g>

                {/* 下部メッセージ：重なり合う */}
                <g style={{ opacity: fade(f, 95) }}>
                    <rect x="80" y="558" width="1440" height="52" rx="14"
                        fill={PALETTE.primaryGlow} stroke={PALETTE.primary} strokeWidth="2" />
                    <text x="800" y="593" fill={PALETTE.primaryDeep} fontSize="30" textAnchor="middle" fontWeight="800">
                        重なって強くなる場所と、打ち消しあって弱くなる場所がまだらにできる
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 4: 2.4と5は兄弟（低い声・高い声） =====
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                {/* タイトル */}
                <text x="800" y="46" fill={PALETTE.ink} fontSize="42" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    性格の違う二人の兄弟
                </text>

                {/* 2.4GHz カード（左・低い声・壁に強い） */}
                <g style={{ opacity: fade(f, 15) }}>
                    <rect x="100" y="100" width="680" height="420" rx="22"
                        fill="#fff" stroke={PALETTE.success} strokeWidth="4" />
                    <rect x="100" y="100" width="680" height="72" rx="22"
                        fill={PALETTE.success} />
                    <text x="440" y="150" fill="#fff" fontSize="44" textAnchor="middle" fontWeight="900">
                        2.4GHz
                    </text>
                    {/* サイン波（ゆったり） */}
                    <path d={(() => {
                        const pts = [];
                        for (let x = 0; x <= 560; x += 6) {
                            const y = Math.sin((x / 560) * Math.PI * 2) * 24;
                            pts.push(`${x === 0 ? 'M' : 'L'} ${140 + x} ${240 + y}`);
                        }
                        return pts.join(' ');
                    })()} stroke={PALETTE.success} strokeWidth="5" fill="none" />
                    <text x="440" y="310" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="800">低い声のように</text>
                    <text x="440" y="348" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="800">遠くへ、壁をくぐる</text>
                    <text x="440" y="410" fill={PALETTE.muted} fontSize="24" textAnchor="middle" fontWeight="600">⚠ 混雑しやすい</text>
                    <text x="440" y="445" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="600">（電子レンジ / Bluetooth と同じ帯域）</text>
                </g>

                {/* 5GHz カード（右・高い声・速い） */}
                <g style={{ opacity: fade(f, 40) }}>
                    <rect x="820" y="100" width="680" height="420" rx="22"
                        fill="#fff" stroke={PALETTE.accent} strokeWidth="4" />
                    <rect x="820" y="100" width="680" height="72" rx="22"
                        fill={PALETTE.accent} />
                    <text x="1160" y="150" fill="#fff" fontSize="44" textAnchor="middle" fontWeight="900">
                        5GHz / 6GHz
                    </text>
                    {/* サイン波（細かい） */}
                    <path d={(() => {
                        const pts = [];
                        for (let x = 0; x <= 560; x += 3) {
                            const y = Math.sin((x / 560) * Math.PI * 2 * 4) * 24;
                            pts.push(`${x === 0 ? 'M' : 'L'} ${860 + x} ${240 + y}`);
                        }
                        return pts.join(' ');
                    })()} stroke={PALETTE.accent} strokeWidth="5" fill="none" />
                    <text x="1160" y="310" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="800">高い声のように</text>
                    <text x="1160" y="348" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="800">速いが、壁に弱い</text>
                    <text x="1160" y="410" fill={PALETTE.muted} fontSize="24" textAnchor="middle" fontWeight="600">⚠ 遠くまでは苦手</text>
                    <text x="1160" y="445" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="600">（6GHzはほぼ同じ部屋向き）</text>
                </g>

                {/* 下部メッセージ */}
                <g style={{ opacity: fade(f, 75) }}>
                    <rect x="200" y="548" width="1200" height="60" rx="14"
                        fill={PALETTE.amber} opacity="0.18" />
                    <text x="800" y="588" fill={PALETTE.ink} fontSize="28" textAnchor="middle" fontWeight="800">
                        近くで速さ重視なら5、廊下越しや奥の部屋なら2.4
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 5: 水分吸収説は本当？ =====
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                {/* タイトル（吹き出し風） */}
                <g style={{ opacity: fade(f, 0) }}>
                    <rect x="200" y="50" width="1200" height="80" rx="24"
                        fill="#fff" stroke={PALETTE.muted} strokeWidth="3" />
                    <text x="800" y="100" fill={PALETTE.muted} fontSize="36" textAnchor="middle" fontWeight="700">
                        「Wi-Fiは水分に吸われるから弱い」って本当？
                    </text>
                </g>

                {/* ×印 & 答え */}
                <g style={{ opacity: fade(f, 25) }}>
                    <text x="800" y="210" fill={PALETTE.accent} fontSize="72" textAnchor="middle" fontWeight="900">
                        ほぼ伝説
                    </text>
                </g>

                {/* 左：電子レンジ図 */}
                <g style={{ opacity: fade(f, 45) }} transform="translate(220 280)">
                    <rect x="0" y="0" width="320" height="200" rx="14"
                        fill="#fff" stroke={PALETTE.wallDark} strokeWidth="3" />
                    <rect x="20" y="30" width="220" height="150" rx="6"
                        fill={PALETTE.ink} opacity="0.85" />
                    <rect x="260" y="30" width="48" height="150" fill={PALETTE.wall} />
                    <circle cx="284" cy="60" r="8" fill={PALETTE.accent} />
                    <text x="160" y="240" fill={PALETTE.ink} fontSize="30" textAnchor="middle" fontWeight="800">電子レンジ</text>
                    <text x="160" y="275" fill={PALETTE.accent} fontSize="28" textAnchor="middle" fontWeight="900">2.45GHz</text>
                </g>

                {/* 矢印と説明 */}
                <g style={{ opacity: fade(f, 65) }}>
                    <path d="M 560 360 L 740 360" stroke={PALETTE.muted} strokeWidth="4"
                        markerEnd="url(#arrMid)" />
                </g>

                {/* 右：正しい理由 */}
                <g style={{ opacity: fade(f, 80) }}>
                    <rect x="760" y="280" width="640" height="240" rx="16"
                        fill={PALETTE.primaryGlow} stroke={PALETTE.primary} strokeWidth="3" />
                    <text x="1080" y="330" fill={PALETTE.primaryDeep} fontSize="30" textAnchor="middle" fontWeight="900">
                        実は「そこそこしか吸われない」
                    </text>
                    <text x="1080" y="368" fill={PALETTE.primaryDeep} fontSize="30" textAnchor="middle" fontWeight="900">
                        から選ばれた周波数
                    </text>
                    <text x="1080" y="420" fill={PALETTE.ink} fontSize="24" textAnchor="middle" fontWeight="600">
                        強く吸われると表面しか温まらない
                    </text>
                    <text x="1080" y="452" fill={PALETTE.ink} fontSize="24" textAnchor="middle" fontWeight="600">
                        → 中まで届かせるためスカスカ側を採用
                    </text>
                    <text x="1080" y="495" fill={PALETTE.muted} fontSize="22" textAnchor="middle" fontWeight="600">
                        壁の減衰は、水分だけが犯人ではない
                    </text>
                </g>

                <defs>
                    <marker id="arrMid" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10 z" fill={PALETTE.muted} />
                    </marker>
                </defs>
            </svg>
        </Stage>
    );
};

// ===== Scene 6: ルータどこに置く =====
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    const tips = [
        { icon: '🏠', title: 'できるだけ家の真ん中', sub: '端に置くと反対側で痩せすぎる', color: PALETTE.primary },
        { icon: '📏', title: '床直置きより少し高く', sub: '机や棚の上、目線の高さが目安', color: PALETTE.success },
        { icon: '🚫', title: '金属・水槽の近くは避ける', sub: '金属は反射・水は少し吸う', color: PALETTE.accent },
        { icon: '📡', title: 'それでも届かないなら中継', sub: 'メッシュWi-Fiでリレー式に', color: PALETTE.warm },
    ];
    return (
        <Stage>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 1500 }}>
                <div style={{
                    fontSize: 56, fontWeight: 900, color: PALETTE.ink, textAlign: 'center',
                    opacity: fade(f, 0),
                }}>ルータは、どこに置く？</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 20 }}>
                    {tips.map((t, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 24,
                            padding: '28px 32px', borderRadius: 20,
                            background: '#fff', border: `3px solid ${t.color}`,
                            opacity: fade(f, 18 + i * 22),
                            transform: `translateY(${rise(f, 18 + i * 22, 36 + i * 22, 20)}px)`,
                            boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
                        }}>
                            <div style={{ fontSize: 62, flexShrink: 0 }}>{t.icon}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ fontSize: 34, fontWeight: 900, color: t.color }}>{t.title}</div>
                                <div style={{ fontSize: 24, color: PALETTE.muted, fontWeight: 600 }}>{t.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Stage>
    );
};

// ===== Scene 7: 見えない家の景色（まとめ） =====
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1600 620" width="100%" height="100%">
                {/* 家の輪郭 */}
                <g style={{ opacity: fade(f, 0) }}>
                    <rect x="200" y="120" width="1200" height="340" rx="16"
                        fill="#fff" stroke={PALETTE.wallDark} strokeWidth="5" />
                </g>

                {/* 強弱のまだら（同心円 + ブロブ） */}
                <g style={{ opacity: fade(f, 15) }}>
                    <defs>
                        <radialGradient id="strongZone" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={PALETTE.primary} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={PALETTE.primary} stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="weakZone" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={PALETTE.accent} stopOpacity="0.32" />
                            <stop offset="100%" stopColor={PALETTE.accent} stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="420" cy="290" r="170" fill="url(#strongZone)" />
                    <circle cx="640" cy="210" r="120" fill="url(#strongZone)" />
                    <circle cx="900" cy="370" r="100" fill="url(#weakZone)" />
                    <circle cx="1180" cy="260" r="150" fill="url(#weakZone)" />
                    <circle cx="760" cy="420" r="90" fill="url(#strongZone)" />
                </g>

                {/* ルータ */}
                <g transform="translate(420 290)" style={{ opacity: fade(f, 30) }}>
                    <rect x="-36" y="-20" width="72" height="40" rx="8" fill={PALETTE.ink} />
                    <text x="0" y="52" fill={PALETTE.ink} fontSize="22" textAnchor="middle" fontWeight="700">ルータ</text>
                </g>

                {/* 凡例 */}
                <g style={{ opacity: fade(f, 50) }}>
                    <circle cx="1300" cy="155" r="14" fill={PALETTE.primary} opacity="0.5" />
                    <text x="1325" y="162" fill={PALETTE.ink} fontSize="22" fontWeight="700">強いゾーン</text>
                    <circle cx="1300" cy="195" r="14" fill={PALETTE.accent} opacity="0.4" />
                    <text x="1325" y="202" fill={PALETTE.ink} fontSize="22" fontWeight="700">弱いゾーン</text>
                </g>

                {/* タイトル */}
                <text x="800" y="80" fill={PALETTE.ink} fontSize="42" textAnchor="middle" fontWeight="900"
                    style={{ opacity: fade(f, 0) }}>
                    家の中には、目に見えない電波の景色がある
                </text>

                {/* 下部メッセージ */}
                <g style={{ opacity: fade(f, 75) }}>
                    <rect x="200" y="505" width="1200" height="110" rx="18"
                        fill={PALETTE.amber} opacity="0.15" />
                    <text x="800" y="548" fill={PALETTE.ink} fontSize="32" textAnchor="middle" fontWeight="900">
                        壁で止まっているのではなく、通りながら弱くなっている
                    </text>
                    <text x="800" y="592" fill={PALETTE.ink} fontSize="28" textAnchor="middle" fontWeight="700">
                        そして、家の中で反射して混ざり合っている
                    </text>
                </g>
            </svg>
        </Stage>
    );
};

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7,
];

export const SCENE_TITLES: string[] = [
    '家のなか不思議',
    '今日の答え',
    '壁は止めていない',
    '家の中は迷路',
    '2.4と5は兄弟',
    '水分吸収説',
    'ルータどこに置く',
    '見えない家の景色',
];
