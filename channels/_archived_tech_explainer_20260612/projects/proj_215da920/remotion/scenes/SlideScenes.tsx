import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

// ================== THEME ==================

const PALETTE = {
    ...BASE_COLORS,
    primary: '#3D4B78',
    primaryDeep: '#1F2847',
    primaryGlow: 'rgba(89, 109, 168, 0.28)',
    accent: '#E8527F',       // Magenta
    warm: '#F4B24C',         // Yellow
    amber: '#F08A4B',
    cyan: '#3BAFDA',         // Cyan
    ink: '#1A1F2E',
    paper: '#FDF8EE',
    muted: '#9AA5B8',
    deepMuted: '#485069',
    ok: '#3FA377',
    danger: '#C4364B',
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

// Shared SVG: プリンター本体
const Printer: React.FC<{ x: number; y: number; s?: number; mood?: 'sad' | 'ok' | 'plain' }> = ({ x, y, s = 1, mood = 'plain' }) => {
    const w = 220 * s, h = 170 * s;
    return (
        <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
            <rect x={0} y={40 * s} width={w} height={70 * s} rx={10 * s} fill={PALETTE.primary} />
            <rect x={10 * s} y={50 * s} width={w - 20 * s} height={14 * s} rx={4 * s} fill={PALETTE.primaryDeep} />
            <rect x={20 * s} y={0} width={w - 40 * s} height={50 * s} rx={6 * s} fill={PALETTE.paper} stroke={PALETTE.deepMuted} strokeWidth={1.5} />
            <rect x={30 * s} y={10 * s} width={w - 60 * s} height={6 * s} fill={PALETTE.muted} />
            <rect x={30 * s} y={22 * s} width={(w - 60 * s) * 0.7} height={4 * s} fill={PALETTE.muted} />
            <rect x={30 * s} y={32 * s} width={(w - 60 * s) * 0.55} height={4 * s} fill={PALETTE.muted} />
            <rect x={25 * s} y={110 * s} width={w - 50 * s} height={20 * s} rx={3 * s} fill={PALETTE.ink} opacity={0.4} />
            <rect x={0} y={130 * s} width={w} height={40 * s} rx={10 * s} fill={PALETTE.primaryDeep} />
            {/* status light */}
            <circle cx={w - 30 * s} cy={150 * s} r={6 * s}
                fill={mood === 'sad' ? PALETTE.danger : mood === 'ok' ? PALETTE.ok : PALETTE.amber} />
            {mood === 'sad' && (
                <g transform={`translate(${w / 2 - 40 * s} ${80 * s})`}>
                    <circle cx={15 * s} cy={0} r={4 * s} fill={PALETTE.ink} />
                    <circle cx={65 * s} cy={0} r={4 * s} fill={PALETTE.ink} />
                    <path d={`M${10 * s} ${20 * s} Q ${40 * s} ${8 * s} ${70 * s} ${20 * s}`} stroke={PALETTE.ink} strokeWidth={3} fill="none" />
                </g>
            )}
            {mood === 'ok' && (
                <g transform={`translate(${w / 2 - 40 * s} ${75 * s})`}>
                    <circle cx={15 * s} cy={0} r={4 * s} fill={PALETTE.ink} />
                    <circle cx={65 * s} cy={0} r={4 * s} fill={PALETTE.ink} />
                    <path d={`M${10 * s} ${15 * s} Q ${40 * s} ${30 * s} ${70 * s} ${15 * s}`} stroke={PALETTE.ink} strokeWidth={3} fill="none" />
                </g>
            )}
        </g>
    );
};

// ================== SCENE 0: 謎のイライラ ==================
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center', maxWidth: 1400 }}>
            <svg width={360} height={280} viewBox="0 0 360 280" style={{ opacity: fade(f, 10, 40), transform: `translateY(${riseY(f, 10, 40, 24)}px)` }}>
                <defs>
                    <radialGradient id="glow0">
                        <stop offset="0%" stopColor={PALETTE.primaryGlow} />
                        <stop offset="100%" stopColor="rgba(89,109,168,0)" />
                    </radialGradient>
                </defs>
                <ellipse cx={180} cy={240} rx={170} ry={22} fill="url(#glow0)" />
                <Printer x={180} y={140} s={1.2} mood="sad" />
                {/* floating frustration marks */}
                <g opacity={fade(f, 50, 75)}>
                    <text x={70} y={90} fontSize={48} fill={PALETTE.accent} fontWeight={800}>?</text>
                    <text x={280} y={70} fontSize={56} fill={PALETTE.amber} fontWeight={800}>!</text>
                    <text x={300} y={170} fontSize={42} fill={PALETTE.danger} fontWeight={800}>!?</text>
                </g>
            </svg>
            <div style={{ opacity: fade(f, 45, 75), transform: `translateY(${riseY(f, 45, 75)}px)`, fontSize: 78, fontWeight: 900, color: PALETTE.primaryDeep, letterSpacing: 2, marginTop: 10, lineHeight: 1.15 }}>
                プリンターだけいつも<br />機嫌が悪い理由
            </div>
            <div style={{ opacity: fade(f, 80, 115), fontSize: 34, color: PALETTE.deepMuted, marginTop: 30, letterSpacing: 1 }}>
                スマホもテレビも動くのに——
            </div>
        </div>
    </Stage>
);

// ================== SCENE 1: 擬人化される家電 ==================
const ApplianceCard: React.FC<{ icon: React.ReactNode; label: string; mood: 'ok' | 'sad'; delay: number; f: number }> = ({ icon, label, mood, delay, f }) => (
    <div style={{
        opacity: fade(f, delay, delay + 18),
        transform: `translateY(${riseY(f, delay, delay + 18)}px)`,
        background: PALETTE.surface, border: `2px solid ${mood === 'sad' ? PALETTE.danger : PALETTE.panelBorder}`,
        borderRadius: 22, padding: '28px 22px 22px', width: 220,
        boxShadow: '0 10px 28px rgba(31,40,71,0.10)',
        textAlign: 'center',
    }}>
        <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: PALETTE.primaryDeep, marginTop: 4 }}>{label}</div>
        <div style={{ fontSize: 46, marginTop: 6 }}>{mood === 'sad' ? '😟' : '😊'}</div>
    </div>
);

const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 40 }}>
                「機嫌悪い」と言われる家電、どれ？
            </div>
            <div style={{ display: 'flex', gap: 26, justifyContent: 'center', maxWidth: 1200, margin: '0 auto' }}>
                <ApplianceCard f={f} delay={24} mood="ok" label="冷蔵庫"
                    icon={<svg width={110} height={120} viewBox="0 0 110 120"><rect x={15} y={5} width={80} height={110} rx={8} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} /><line x1={15} y1={48} x2={95} y2={48} stroke={PALETTE.primary} strokeWidth={3} /><rect x={82} y={20} width={5} height={18} fill={PALETTE.primary} /><rect x={82} y={60} width={5} height={24} fill={PALETTE.primary} /></svg>} />
                <ApplianceCard f={f} delay={40} mood="ok" label="洗濯機"
                    icon={<svg width={110} height={120} viewBox="0 0 110 120"><rect x={10} y={5} width={90} height={110} rx={8} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} /><circle cx={55} cy={65} r={30} fill={PALETTE.cyan} opacity={0.18} stroke={PALETTE.primary} strokeWidth={3} /><circle cx={55} cy={65} r={18} fill="none" stroke={PALETTE.primary} strokeWidth={2} /><circle cx={30} cy={25} r={4} fill={PALETTE.primary} /><circle cx={45} cy={25} r={4} fill={PALETTE.primary} /></svg>} />
                <ApplianceCard f={f} delay={56} mood="ok" label="エアコン"
                    icon={<svg width={120} height={120} viewBox="0 0 120 120"><rect x={8} y={30} width={104} height={48} rx={8} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} /><line x1={18} y1={48} x2={102} y2={48} stroke={PALETTE.primary} strokeWidth={2} /><line x1={18} y1={58} x2={102} y2={58} stroke={PALETTE.primary} strokeWidth={2} /><line x1={18} y1={68} x2={102} y2={68} stroke={PALETTE.primary} strokeWidth={2} /><path d="M40 90 Q50 105 60 90" stroke={PALETTE.cyan} strokeWidth={3} fill="none" /><path d="M70 90 Q80 105 90 90" stroke={PALETTE.cyan} strokeWidth={3} fill="none" /></svg>} />
                <ApplianceCard f={f} delay={72} mood="ok" label="テレビ"
                    icon={<svg width={120} height={120} viewBox="0 0 120 120"><rect x={8} y={15} width={104} height={72} rx={6} fill={PALETTE.ink} /><rect x={14} y={21} width={92} height={60} rx={3} fill={PALETTE.cyan} opacity={0.28} /><rect x={50} y={92} width={20} height={14} fill={PALETTE.primary} /></svg>} />
            </div>
            <div style={{ marginTop: 36, opacity: fade(f, 95, 120) }}>
                <svg width={280} height={180} viewBox="0 0 280 180" style={{ display: 'block', margin: '0 auto' }}>
                    <rect x={0} y={0} width={280} height={180} rx={22} fill={PALETTE.danger} opacity={0.08} />
                    <g transform="translate(30 20)">
                        <Printer x={110} y={80} s={1.0} mood="sad" />
                    </g>
                    <text x={140} y={170} fontSize={24} fill={PALETTE.danger} fontWeight={800} textAnchor="middle">今日はダメみたい…</text>
                </svg>
            </div>
        </div>
    </Stage>
);

// ================== SCENE 2: 今日の見取り図 ==================
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const R = 180;
    return (
        <Stage>
            <div style={{ textAlign: 'center' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 20 }}>
                    3つの要因が重なっている
                </div>
                <svg width={900} height={560} viewBox="0 0 900 560">
                    {/* Three overlapping circles (Venn) */}
                    <circle cx={320} cy={230} r={R} fill={PALETTE.primary} opacity={fade(f, 30, 60) * 0.35} />
                    <circle cx={580} cy={230} r={R} fill={PALETTE.accent} opacity={fade(f, 50, 80) * 0.35} />
                    <circle cx={450} cy={400} r={R} fill={PALETTE.warm} opacity={fade(f, 70, 100) * 0.35} />
                    {/* Labels */}
                    <g opacity={fade(f, 110, 140)}>
                        <text x={250} y={120} fontSize={32} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">① 技術の難しさ</text>
                        <text x={230} y={155} fontSize={22} fill={PALETTE.deepMuted} textAnchor="middle">翻訳・物理・OS・ネット</text>
                    </g>
                    <g opacity={fade(f, 130, 160)}>
                        <text x={660} y={120} fontSize={32} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">② 商売の歪み</text>
                        <text x={680} y={155} fontSize={22} fill={PALETTE.deepMuted} textAnchor="middle">razor-and-blades/DRM</text>
                    </g>
                    <g opacity={fade(f, 150, 180)}>
                        <text x={450} y={515} fontSize={32} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">③ 使用頻度の低さ</text>
                        <text x={450} y={545} fontSize={22} fill={PALETTE.deepMuted} textAnchor="middle">月1利用 + 認知バイアス</text>
                    </g>
                    {/* Center label */}
                    <g opacity={fade(f, 180, 210)}>
                        <circle cx={450} cy={300} r={82} fill={PALETTE.surface} stroke={PALETTE.primaryDeep} strokeWidth={4} />
                        <text x={450} y={292} fontSize={26} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">機嫌悪い</text>
                        <text x={450} y={322} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">の正体</text>
                    </g>
                </svg>
            </div>
        </Stage>
    );
};

// ================== SCENE 3: 画面と印刷 ==================
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 30 }}>
                画面と印刷は、別ルート
            </div>
            <svg width={1200} height={480} viewBox="0 0 1200 480">
                {/* LEFT: screen path */}
                <g opacity={fade(f, 30, 60)}>
                    <rect x={40} y={40} width={140} height={90} rx={10} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} />
                    <text x={110} y={90} fontSize={20} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">アプリ</text>
                    <path d="M185 85 L 235 85" stroke={PALETTE.primary} strokeWidth={3} markerEnd="url(#a1)" />
                    <defs><marker id="a1" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={PALETTE.primary} /></marker></defs>
                </g>
                <g opacity={fade(f, 46, 76)}>
                    <rect x={240} y={20} width={280} height={180} rx={14} fill={PALETTE.ink} />
                    <rect x={252} y={32} width={256} height={140} rx={6} fill={PALETTE.cyan} opacity={0.32} />
                    <rect x={340} y={178} width={80} height={24} fill={PALETTE.primary} />
                    <text x={380} y={220} fontSize={22} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">画面</text>
                    <text x={380} y={248} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">ピクセルを直接描画</text>
                </g>
                <g opacity={fade(f, 64, 94)}>
                    <rect x={90} y={270} width={420} height={80} rx={14} fill={PALETTE.ok} opacity={0.14} stroke={PALETTE.ok} strokeWidth={2} />
                    <text x={300} y={320} fontSize={26} fontWeight={800} fill={PALETTE.ok} textAnchor="middle">そのまま表示して完了</text>
                </g>
                {/* vertical divider */}
                <line x1={600} y1={10} x2={600} y2={460} stroke={PALETTE.muted} strokeWidth={2} strokeDasharray="6 8" opacity={fade(f, 10, 40)} />
                {/* RIGHT: print path */}
                <g opacity={fade(f, 90, 120)}>
                    <rect x={660} y={40} width={140} height={90} rx={10} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} />
                    <text x={730} y={90} fontSize={20} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">アプリ</text>
                    <path d="M805 85 L 855 85" stroke={PALETTE.accent} strokeWidth={3} markerEnd="url(#a2)" />
                    <defs><marker id="a2" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={PALETTE.accent} /></marker></defs>
                </g>
                <g opacity={fade(f, 106, 136)}>
                    <rect x={860} y={40} width={180} height={90} rx={10} fill={PALETTE.accent} opacity={0.15} stroke={PALETTE.accent} strokeWidth={3} />
                    <text x={950} y={78} fontSize={22} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">翻訳</text>
                    <text x={950} y={106} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">PDLに変換</text>
                    <path d="M1045 85 L 1095 85" stroke={PALETTE.accent} strokeWidth={3} markerEnd="url(#a2)" />
                </g>
                <g opacity={fade(f, 124, 154)}>
                    <g transform="translate(1045 50)"><Printer x={60} y={45} s={0.6} mood="plain" /></g>
                </g>
                <g opacity={fade(f, 140, 170)}>
                    <rect x={720} y={270} width={420} height={80} rx={14} fill={PALETTE.amber} opacity={0.14} stroke={PALETTE.amber} strokeWidth={2} />
                    <text x={930} y={320} fontSize={26} fontWeight={800} fill={PALETTE.amber} textAnchor="middle">一段、翻訳が挟まる</text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 4: 翻訳が要る（PDLの正体） ==================
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 24 }}>
                プリンターに送るのは「命令書」
            </div>
            <svg width={1100} height={420} viewBox="0 0 1100 420">
                {/* flow boxes */}
                <g opacity={fade(f, 28, 58)}>
                    <rect x={40} y={160} width={180} height={100} rx={14} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} />
                    <text x={130} y={205} fontSize={26} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">アプリの絵</text>
                    <text x={130} y={238} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">ピクセル／ベクター</text>
                </g>
                <g opacity={fade(f, 50, 80)}>
                    <path d="M230 210 L 335 210" stroke={PALETTE.accent} strokeWidth={3} markerEnd="url(#a4)" />
                    <defs><marker id="a4" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={PALETTE.accent} /></marker></defs>
                </g>
                <g opacity={fade(f, 60, 90)}>
                    <rect x={345} y={150} width={260} height={120} rx={16} fill={PALETTE.accent} opacity={0.12} stroke={PALETTE.accent} strokeWidth={3} />
                    <text x={475} y={195} fontSize={28} fontWeight={900} fill={PALETTE.accent} textAnchor="middle">PDL に翻訳</text>
                    <text x={475} y={228} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">Page Description</text>
                    <text x={475} y={252} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">Language</text>
                </g>
                <g opacity={fade(f, 78, 108)}>
                    <path d="M615 210 L 720 210" stroke={PALETTE.accent} strokeWidth={3} markerEnd="url(#a4)" />
                </g>
                <g opacity={fade(f, 94, 124)}>
                    <g transform="translate(670 140)"><Printer x={80} y={70} s={0.75} mood="plain" /></g>
                </g>
                {/* sample command lines */}
                <g opacity={fade(f, 120, 150)}>
                    <rect x={330} y={300} width={440} height={100} rx={10} fill={PALETTE.ink} opacity={0.92} />
                    <text x={350} y={332} fontSize={20} fill={PALETTE.paper} fontFamily="monospace">movetoX 100 Y 200</text>
                    <text x={350} y={358} fontSize={20} fill={PALETTE.paper} fontFamily="monospace">show "Hello" font 14</text>
                    <text x={350} y={384} fontSize={20} fill={PALETTE.paper} fontFamily="monospace">lineto X 300 Y 200</text>
                </g>
                <g opacity={fade(f, 140, 170)}>
                    <text x={770} y={370} fontSize={20} fill={PALETTE.accent} fontWeight={700}>← こういう命令書</text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 5: 五つの言語 ==================
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    const langs = [
        { year: '1980', name: 'PCL', vendor: 'HP', col: PALETTE.cyan },
        { year: '1984', name: 'PostScript', vendor: 'Adobe', col: PALETTE.accent },
        { year: '1993', name: 'PDF', vendor: 'Adobe', col: PALETTE.warm },
        { year: '2006', name: 'XPS', vendor: 'Microsoft', col: PALETTE.primary },
        { year: '2013', name: 'IPP Everywhere', vendor: 'PWG', col: PALETTE.ok },
    ];
    return (
        <Stage>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 30 }}>
                    40年で5つ併存している
                </div>
                <svg width={1200} height={460} viewBox="0 0 1200 460">
                    <line x1={80} y1={330} x2={1120} y2={330} stroke={PALETTE.muted} strokeWidth={3} opacity={fade(f, 10, 40)} />
                    {langs.map((l, i) => {
                        const x = 120 + i * 230;
                        const delay = 30 + i * 18;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 20)} transform={`translate(0 ${riseY(f, delay, delay + 20, 12)})`}>
                                <circle cx={x} cy={330} r={12} fill={l.col} />
                                <rect x={x - 90} y={180} width={180} height={120} rx={12} fill={PALETTE.surface} stroke={l.col} strokeWidth={3} />
                                <text x={x} y={215} fontSize={20} fontWeight={700} fill={l.col} textAnchor="middle">{l.year}</text>
                                <text x={x} y={254} fontSize={l.name.length > 6 ? 20 : 28} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">{l.name}</text>
                                <text x={x} y={285} fontSize={17} fill={PALETTE.deepMuted} textAnchor="middle">{l.vendor}</text>
                                <text x={x} y={385} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">▲</text>
                            </g>
                        );
                    })}
                </svg>
                <div style={{ opacity: fade(f, 140, 170), fontSize: 26, color: PALETTE.accent, fontWeight: 800, marginTop: -8 }}>
                    どれも、まだ現役
                </div>
            </div>
        </Stage>
    );
};

// ================== SCENE 6: 中身を開ける ==================
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    const layers = [
        { label: 'OS・ドライバー層', sub: 'Spooler / V3 / V4', col: PALETTE.primary },
        { label: 'ネットワーク層', sub: 'IPP / mDNS', col: PALETTE.cyan },
        { label: '機構・物理層', sub: 'ノズル / 紙搬送', col: PALETTE.amber },
        { label: '化学・光学層', sub: 'インク / 定着熱', col: PALETTE.accent },
    ];
    return (
        <Stage>
            <div style={{ textAlign: 'center' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 20 }}>
                    プリンター1台に積まれた4層
                </div>
                <svg width={1050} height={500} viewBox="0 0 1050 500">
                    {/* printer casing */}
                    <rect x={60} y={30} width={930} height={440} rx={24} fill={PALETTE.surface} stroke={PALETTE.primaryDeep} strokeWidth={3} opacity={fade(f, 10, 40)} />
                    {layers.map((l, i) => {
                        const y = 70 + i * 95;
                        const delay = 30 + i * 16;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 20)}>
                                <rect x={100} y={y} width={850} height={75} rx={12} fill={l.col} opacity={0.15} stroke={l.col} strokeWidth={2} />
                                <circle cx={145} cy={y + 37} r={22} fill={l.col} />
                                <text x={145} y={y + 45} fontSize={22} fontWeight={900} fill={PALETTE.surface} textAnchor="middle">{i + 1}</text>
                                <text x={190} y={y + 34} fontSize={26} fontWeight={800} fill={PALETTE.primaryDeep}>{l.label}</text>
                                <text x={190} y={y + 60} fontSize={20} fill={PALETTE.deepMuted}>{l.sub}</text>
                            </g>
                        );
                    })}
                </svg>
                <div style={{ opacity: fade(f, 130, 160), fontSize: 24, color: PALETTE.accent, fontWeight: 800, marginTop: 10 }}>
                    どれか1層でも崩れると止まる
                </div>
            </div>
        </Stage>
    );
};

// ================== SCENE 7: μmのノズル ==================
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 42, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 22 }}>
                穴の直径 10マイクロメートル
            </div>
            <svg width={1100} height={470} viewBox="0 0 1100 470">
                {/* size comparison */}
                <g opacity={fade(f, 20, 50)}>
                    <text x={180} y={40} fontSize={22} fontWeight={700} fill={PALETTE.deepMuted} textAnchor="middle">髪の毛</text>
                    <text x={180} y={68} fontSize={28} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">≒ 70μm</text>
                    <circle cx={180} cy={160} r={64} fill={PALETTE.warm} opacity={0.4} stroke={PALETTE.warm} strokeWidth={3} />
                    <circle cx={180} cy={160} r={12} fill={PALETTE.accent} />
                    <text x={180} y={260} fontSize={17} fill={PALETTE.deepMuted} textAnchor="middle">太さ比較</text>
                </g>
                <g opacity={fade(f, 50, 80)}>
                    <text x={450} y={40} fontSize={22} fontWeight={700} fill={PALETTE.deepMuted} textAnchor="middle">ノズル</text>
                    <text x={450} y={68} fontSize={28} fontWeight={900} fill={PALETTE.accent} textAnchor="middle">≒ 10μm</text>
                    <circle cx={450} cy={160} r={10} fill={PALETTE.accent} stroke={PALETTE.accent} strokeWidth={3} />
                    <line x1={470} y1={160} x2={550} y2={160} stroke={PALETTE.muted} strokeWidth={1} strokeDasharray="4 4" />
                    <text x={560} y={165} fontSize={20} fill={PALETTE.deepMuted}>100分の1ミリ</text>
                </g>
                {/* drying sequence */}
                <g opacity={fade(f, 90, 120)}>
                    <text x={550} y={310} fontSize={26} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">何もせず置いておくと…</text>
                </g>
                <g opacity={fade(f, 110, 140)}>
                    <rect x={120} y={340} width={200} height={100} rx={10} fill={PALETTE.cyan} opacity={0.12} stroke={PALETTE.cyan} strokeWidth={2} />
                    <text x={220} y={378} fontSize={19} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">溶媒が蒸発</text>
                    <text x={220} y={408} fontSize={17} fill={PALETTE.deepMuted} textAnchor="middle">↑↑↑ じわじわ</text>
                </g>
                <g opacity={fade(f, 125, 155)}>
                    <text x={345} y={395} fontSize={24} fill={PALETTE.muted}>→</text>
                </g>
                <g opacity={fade(f, 140, 170)}>
                    <rect x={380} y={340} width={200} height={100} rx={10} fill={PALETTE.amber} opacity={0.14} stroke={PALETTE.amber} strokeWidth={2} />
                    <text x={480} y={378} fontSize={19} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">顔料が固化</text>
                    <text x={480} y={408} fontSize={17} fill={PALETTE.deepMuted} textAnchor="middle">乾いて固まる</text>
                </g>
                <g opacity={fade(f, 160, 190)}>
                    <text x={605} y={395} fontSize={24} fill={PALETTE.muted}>→</text>
                </g>
                <g opacity={fade(f, 175, 205)}>
                    <rect x={640} y={340} width={220} height={100} rx={10} fill={PALETTE.danger} opacity={0.14} stroke={PALETTE.danger} strokeWidth={2} />
                    <text x={750} y={378} fontSize={19} fontWeight={800} fill={PALETTE.danger} textAnchor="middle">詰まる</text>
                    <text x={750} y={408} fontSize={17} fill={PALETTE.deepMuted} textAnchor="middle">4〜6週間で開始</text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 8: 学部の実験室（電子写真6ステップ） ==================
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const steps = [
        { n: '①', label: '帯電', sub: '-900V', col: PALETTE.primary },
        { n: '②', label: '露光', sub: 'レーザー', col: PALETTE.accent },
        { n: '③', label: '現像', sub: '摩擦帯電', col: PALETTE.warm },
        { n: '④', label: '転写', sub: 'コロナ放電', col: PALETTE.cyan },
        { n: '⑤', label: '定着', sub: '200℃', col: PALETTE.danger },
        { n: '⑥', label: 'クリーニング', sub: '機械動作', col: PALETTE.ok },
    ];
    return (
        <Stage>
            <div style={{ textAlign: 'center' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 14 }}>
                    レーザーの中は、6工程が同時進行
                </div>
                <div style={{ opacity: fade(f, 18, 40), fontSize: 22, color: PALETTE.deepMuted, marginBottom: 28 }}>
                    電子写真方式 (EP)
                </div>
                <svg width={1200} height={420} viewBox="0 0 1200 420">
                    {steps.map((s, i) => {
                        const x = 110 + i * 180;
                        const delay = 30 + i * 12;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 18)} transform={`translate(0 ${riseY(f, delay, delay + 18, 14)})`}>
                                <circle cx={x} cy={150} r={60} fill={s.col} opacity={0.15} stroke={s.col} strokeWidth={3} />
                                <text x={x} y={140} fontSize={32} fontWeight={900} fill={s.col} textAnchor="middle">{s.n}</text>
                                <text x={x} y={175} fontSize={20} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">{s.label}</text>
                                <text x={x} y={258} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">{s.sub}</text>
                                {i < steps.length - 1 && (
                                    <text x={x + 90} y={158} fontSize={28} fill={PALETTE.muted} textAnchor="middle">→</text>
                                )}
                            </g>
                        );
                    })}
                    <g opacity={fade(f, 140, 170)}>
                        <rect x={120} y={320} width={970} height={70} rx={16} fill={PALETTE.primaryGlow} stroke={PALETTE.primary} strokeWidth={2} />
                        <text x={605} y={365} fontSize={24} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">
                            光学・高電圧・摩擦帯電・放電・熱・機械 — 全部別の物理
                        </text>
                    </g>
                </svg>
            </div>
        </Stage>
    );
};

// ================== SCENE 9: 湿度と紙 ==================
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 24 }}>
                紙は、湿度で挙動が変わる
            </div>
            <svg width={1100} height={460} viewBox="0 0 1100 460">
                {/* humidity axis */}
                <g opacity={fade(f, 10, 40)}>
                    <line x1={80} y1={300} x2={1020} y2={300} stroke={PALETTE.deepMuted} strokeWidth={3} />
                    <text x={80} y={335} fontSize={18} fill={PALETTE.deepMuted}>10%</text>
                    <text x={540} y={335} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">45%</text>
                    <text x={1020} y={335} fontSize={18} fill={PALETTE.deepMuted} textAnchor="end">90%</text>
                    <text x={540} y={375} fontSize={22} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">湿度</text>
                </g>
                {/* sweet spot */}
                <g opacity={fade(f, 30, 60)}>
                    <rect x={430} y={240} width={220} height={60} fill={PALETTE.ok} opacity={0.25} />
                    <text x={540} y={225} fontSize={20} fontWeight={800} fill={PALETTE.ok} textAnchor="middle">35〜55%で最適</text>
                </g>
                {/* low humidity: static */}
                <g opacity={fade(f, 55, 85)}>
                    <rect x={110} y={60} width={250} height={160} rx={14} fill={PALETTE.surface} stroke={PALETTE.amber} strokeWidth={3} />
                    <text x={235} y={100} fontSize={22} fontWeight={800} fill={PALETTE.amber} textAnchor="middle">低湿度</text>
                    <text x={235} y={138} fontSize={26} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">静電気で</text>
                    <text x={235} y={170} fontSize={26} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">張り付く</text>
                    <text x={235} y={200} fontSize={28} fill={PALETTE.amber} textAnchor="middle">⚡</text>
                </g>
                {/* high humidity: curl */}
                <g opacity={fade(f, 75, 105)}>
                    <rect x={720} y={60} width={250} height={160} rx={14} fill={PALETTE.surface} stroke={PALETTE.cyan} strokeWidth={3} />
                    <text x={845} y={100} fontSize={22} fontWeight={800} fill={PALETTE.cyan} textAnchor="middle">高湿度</text>
                    <text x={845} y={138} fontSize={26} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">膨らんで</text>
                    <text x={845} y={170} fontSize={26} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">カール</text>
                    <text x={845} y={200} fontSize={28} fill={PALETTE.cyan} textAnchor="middle">💧</text>
                </g>
                <g opacity={fade(f, 105, 135)}>
                    <text x={540} y={420} fontSize={24} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">
                        紙搬送は、摩擦係数が湿度に左右される
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 10: OS更新で壊れる ==================
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 24 }}>
                次の疑問、これ。
            </div>
            <svg width={1100} height={440} viewBox="0 0 1100 440">
                {/* Windows logo-like */}
                <g opacity={fade(f, 25, 55)}>
                    <rect x={120} y={80} width={200} height={180} rx={12} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} />
                    <rect x={150} y={110} width={60} height={60} fill={PALETTE.cyan} />
                    <rect x={220} y={110} width={60} height={60} fill={PALETTE.amber} />
                    <rect x={150} y={180} width={60} height={60} fill={PALETTE.ok} />
                    <rect x={220} y={180} width={60} height={60} fill={PALETTE.accent} />
                    <text x={220} y={290} fontSize={22} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">Windows</text>
                    <text x={220} y={320} fontSize={20} fill={PALETTE.deepMuted} textAnchor="middle">アップデート</text>
                </g>
                <g opacity={fade(f, 48, 78)}>
                    <path d="M350 170 L 530 170" stroke={PALETTE.danger} strokeWidth={5} markerEnd="url(#a10)" />
                    <defs><marker id="a10" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={PALETTE.danger} /></marker></defs>
                    <text x={440} y={150} fontSize={22} fontWeight={800} fill={PALETTE.danger} textAnchor="middle">その後</text>
                </g>
                <g opacity={fade(f, 68, 98)}>
                    <g transform="translate(550 100)"><Printer x={120} y={85} s={1.1} mood="sad" /></g>
                </g>
                <g opacity={fade(f, 90, 120)}>
                    <rect x={770} y={150} width={270} height={80} rx={14} fill={PALETTE.danger} opacity={0.15} stroke={PALETTE.danger} strokeWidth={3} />
                    <text x={905} y={195} fontSize={26} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">動かない</text>
                </g>
                <g opacity={fade(f, 120, 150)}>
                    <text x={540} y={380} fontSize={28} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">なぜ？</text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 11: NT時代の亡霊 ==================
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    const events = [
        { year: 1993, label: 'Windows NT', sub: 'Spooler設計', col: PALETTE.ink },
        { year: 2000, label: 'V3 ドライバー', sub: 'Windows 2000', col: PALETTE.primary },
        { year: 2012, label: 'V4 ドライバー', sub: 'Windows 8', col: PALETTE.cyan },
        { year: 2026, label: 'IPP Class', sub: 'ようやく標準', col: PALETTE.ok },
    ];
    return (
        <Stage>
            <div style={{ textAlign: 'center' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 26 }}>
                    Print Spooler は30年前の設計
                </div>
                <svg width={1200} height={440} viewBox="0 0 1200 440">
                    {/* axis */}
                    <line x1={80} y1={290} x2={1120} y2={290} stroke={PALETTE.deepMuted} strokeWidth={3} opacity={fade(f, 10, 40)} />
                    {events.map((e, i) => {
                        const x = 140 + i * 310;
                        const delay = 30 + i * 18;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 20)}>
                                <circle cx={x} cy={290} r={14} fill={e.col} />
                                <line x1={x} y1={290} x2={x} y2={225} stroke={e.col} strokeWidth={3} />
                                <rect x={x - 120} y={130} width={240} height={100} rx={12} fill={PALETTE.surface} stroke={e.col} strokeWidth={3} />
                                <text x={x} y={165} fontSize={22} fontWeight={800} fill={e.col} textAnchor="middle">{e.year}</text>
                                <text x={x} y={199} fontSize={22} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">{e.label}</text>
                                <text x={x} y={222} fontSize={17} fill={PALETTE.deepMuted} textAnchor="middle">{e.sub}</text>
                            </g>
                        );
                    })}
                    {/* spanning arc */}
                    <g opacity={fade(f, 120, 150)}>
                        <path d="M140 340 Q 620 395 1060 340" stroke={PALETTE.accent} strokeWidth={3} fill="none" strokeDasharray="6 4" />
                        <text x={620} y={420} fontSize={26} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">
                            33年間、骨格ほぼ変わらず
                        </text>
                    </g>
                </svg>
            </div>
        </Stage>
    );
};

// ================== SCENE 12: プリントナイトメア ==================
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 20 }}>
                2021年 — PrintNightmare
            </div>
            <svg width={1100} height={460} viewBox="0 0 1100 460">
                {/* CVE card */}
                <g opacity={fade(f, 22, 52)}>
                    <rect x={370} y={30} width={360} height={78} rx={12} fill={PALETTE.danger} opacity={0.12} stroke={PALETTE.danger} strokeWidth={3} />
                    <text x={550} y={68} fontSize={22} fontWeight={700} fill={PALETTE.danger} textAnchor="middle">CVE-2021-34527</text>
                    <text x={550} y={94} fontSize={16} fill={PALETTE.deepMuted} textAnchor="middle">Windows Print Spooler</text>
                </g>
                {/* Flow */}
                <g opacity={fade(f, 50, 80)}>
                    <rect x={60} y={170} width={220} height={110} rx={14} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} />
                    <text x={170} y={215} fontSize={24} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">一般ユーザー</text>
                    <text x={170} y={250} fontSize={46}  textAnchor="middle">👤</text>
                </g>
                <g opacity={fade(f, 68, 98)}>
                    <path d="M290 225 L 370 225" stroke={PALETTE.accent} strokeWidth={3} markerEnd="url(#a12)" />
                    <defs><marker id="a12" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={PALETTE.accent} /></marker></defs>
                </g>
                <g opacity={fade(f, 80, 110)}>
                    <rect x={380} y={170} width={320} height={110} rx={14} fill={PALETTE.accent} opacity={0.12} stroke={PALETTE.accent} strokeWidth={3} />
                    <text x={540} y={208} fontSize={22} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">任意のドライバー追加</text>
                    <text x={540} y={246} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">RpcAddPrinterDriver</text>
                    <text x={540} y={270} fontSize={16} fill={PALETTE.deepMuted} textAnchor="middle">(設計の欠陥)</text>
                </g>
                <g opacity={fade(f, 100, 130)}>
                    <path d="M710 225 L 790 225" stroke={PALETTE.danger} strokeWidth={3} markerEnd="url(#a12-2)" />
                    <defs><marker id="a12-2" markerWidth={10} markerHeight={10} refX={8} refY={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={PALETTE.danger} /></marker></defs>
                </g>
                <g opacity={fade(f, 112, 142)}>
                    <rect x={800} y={170} width={240} height={110} rx={14} fill={PALETTE.danger} opacity={0.14} stroke={PALETTE.danger} strokeWidth={3} />
                    <text x={920} y={208} fontSize={22} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">管理者権限で</text>
                    <text x={920} y={240} fontSize={22} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">任意実行</text>
                    <text x={920} y={266} fontSize={16} fill={PALETTE.deepMuted} textAnchor="middle">(SYSTEM権限)</text>
                </g>
                <g opacity={fade(f, 140, 170)}>
                    <text x={540} y={380} fontSize={26} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">
                        1993年の仕様が、28年後に刺さった
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 13: Wi-Fiに居るのに ==================
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 22 }}>
                同じWi-Fiでも、見えない日
            </div>
            <svg width={1100} height={460} viewBox="0 0 1100 460">
                {/* room 1 */}
                <g opacity={fade(f, 20, 50)}>
                    <rect x={80} y={80} width={400} height={300} rx={16} fill={PALETTE.cyan} opacity={0.08} stroke={PALETTE.cyan} strokeWidth={3} />
                    <text x={280} y={115} fontSize={22} fontWeight={800} fill={PALETTE.cyan} textAnchor="middle">部屋A（ルーター1）</text>
                    {/* router */}
                    <rect x={140} y={170} width={80} height={50} rx={8} fill={PALETTE.primary} />
                    <text x={180} y={200} fontSize={16} fontWeight={700} fill={PALETTE.surface} textAnchor="middle">🌐</text>
                    <text x={180} y={240} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">ルーター</text>
                    {/* PC */}
                    <rect x={320} y={280} width={100} height={70} rx={8} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={2} />
                    <text x={370} y={320} fontSize={14} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">💻 PC</text>
                    {/* mDNS ring */}
                    <circle cx={280} cy={230} r={140} fill="none" stroke={PALETTE.cyan} strokeWidth={2} strokeDasharray="4 4" opacity={0.5} />
                </g>
                {/* room 2 */}
                <g opacity={fade(f, 55, 85)}>
                    <rect x={620} y={80} width={400} height={300} rx={16} fill={PALETTE.amber} opacity={0.08} stroke={PALETTE.amber} strokeWidth={3} />
                    <text x={820} y={115} fontSize={22} fontWeight={800} fill={PALETTE.amber} textAnchor="middle">部屋B（ルーター2）</text>
                    <rect x={680} y={170} width={80} height={50} rx={8} fill={PALETTE.primary} />
                    <text x={720} y={200} fontSize={16} fontWeight={700} fill={PALETTE.surface} textAnchor="middle">🌐</text>
                    <text x={720} y={240} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">別ルーター</text>
                    <g transform="translate(820 260)"><Printer x={80} y={60} s={0.7} mood="plain" /></g>
                    <circle cx={820} cy={230} r={140} fill="none" stroke={PALETTE.amber} strokeWidth={2} strokeDasharray="4 4" opacity={0.5} />
                </g>
                {/* X mark between */}
                <g opacity={fade(f, 90, 120)}>
                    <path d="M495 230 L 605 230" stroke={PALETTE.danger} strokeWidth={5} strokeDasharray="10 6" />
                    <text x={550} y={205} fontSize={34} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">✕</text>
                </g>
                <g opacity={fade(f, 115, 145)}>
                    <text x={550} y={425} fontSize={24} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">
                        mDNSは「同じLAN内」しか届かない
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 14: AirPrintは先行 ==================
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 22 }}>
                Apple と Windows — 15年の差
            </div>
            <svg width={1180} height={480} viewBox="0 0 1180 480">
                {/* Apple timeline */}
                <g opacity={fade(f, 20, 50)}>
                    <rect x={40} y={80} width={1100} height={130} rx={18} fill={PALETTE.ok} opacity={0.10} stroke={PALETTE.ok} strokeWidth={2} />
                    <text x={80} y={115} fontSize={26} fontWeight={800} fill={PALETTE.ok}>Apple の道</text>
                    <line x1={120} y1={170} x2={1080} y2={170} stroke={PALETTE.ok} strokeWidth={3} />
                </g>
                <g opacity={fade(f, 38, 68)}>
                    <circle cx={180} cy={170} r={12} fill={PALETTE.ok} />
                    <text x={180} y={200} fontSize={18} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">2010</text>
                    <text x={180} y={148} fontSize={16} fontWeight={800} fill={PALETTE.ok} textAnchor="middle">AirPrint</text>
                </g>
                <g opacity={fade(f, 50, 80)}>
                    <circle cx={470} cy={170} r={10} fill={PALETTE.ok} />
                    <text x={470} y={200} fontSize={18} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">IPP Everywhere</text>
                    <text x={470} y={148} fontSize={16} fill={PALETTE.ok} textAnchor="middle">業界全体に波及</text>
                </g>
                <g opacity={fade(f, 62, 92)}>
                    <text x={900} y={180} fontSize={18} fontWeight={800} fill={PALETTE.ok} textAnchor="middle">→ ドライバーレス常態化</text>
                </g>
                {/* Windows timeline */}
                <g opacity={fade(f, 76, 106)}>
                    <rect x={40} y={250} width={1100} height={150} rx={18} fill={PALETTE.danger} opacity={0.08} stroke={PALETTE.danger} strokeWidth={2} />
                    <text x={80} y={285} fontSize={26} fontWeight={800} fill={PALETTE.danger}>Windows の道</text>
                    <line x1={120} y1={348} x2={1080} y2={348} stroke={PALETTE.danger} strokeWidth={3} />
                </g>
                <g opacity={fade(f, 88, 118)}>
                    <circle cx={180} cy={348} r={10} fill={PALETTE.danger} />
                    <text x={180} y={378} fontSize={18} fill={PALETTE.primaryDeep} textAnchor="middle">2000</text>
                    <text x={180} y={330} fontSize={16} fill={PALETTE.danger} textAnchor="middle">V3</text>
                </g>
                <g opacity={fade(f, 100, 130)}>
                    <circle cx={440} cy={348} r={10} fill={PALETTE.danger} />
                    <text x={440} y={378} fontSize={18} fill={PALETTE.primaryDeep} textAnchor="middle">2012</text>
                    <text x={440} y={330} fontSize={16} fill={PALETTE.danger} textAnchor="middle">V4</text>
                </g>
                <g opacity={fade(f, 118, 148)}>
                    <circle cx={1010} cy={348} r={14} fill={PALETTE.ok} />
                    <text x={1010} y={378} fontSize={18} fontWeight={700} fill={PALETTE.primaryDeep} textAnchor="middle">2026</text>
                    <text x={1010} y={330} fontSize={17} fontWeight={800} fill={PALETTE.ok} textAnchor="middle">IPP Class</text>
                </g>
                <g opacity={fade(f, 135, 165)}>
                    <text x={590} y={455} fontSize={28} fontWeight={900} fill={PALETTE.accent} textAnchor="middle">
                        Windowsは15年遅れでドライバーレスへ
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 15: もう一つの顔 ==================
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 30 }}>
                「機嫌悪さ」にはもう1つの顔
            </div>
            <svg width={1100} height={440} viewBox="0 0 1100 440">
                {/* face 1 */}
                <g opacity={fade(f, 28, 58)}>
                    <rect x={60} y={70} width={460} height={300} rx={22} fill={PALETTE.primary} opacity={0.10} stroke={PALETTE.primary} strokeWidth={3} />
                    <circle cx={290} cy={175} r={60} fill={PALETTE.primary} opacity={0.18} />
                    <text x={290} y={190} fontSize={52} textAnchor="middle">⚙️</text>
                    <text x={290} y={280} fontSize={30} fontWeight={900} fill={PALETTE.primary} textAnchor="middle">技術の難しさ</text>
                    <text x={290} y={315} fontSize={19} fill={PALETTE.deepMuted} textAnchor="middle">PDL・物理・OS層</text>
                    <text x={290} y={343} fontSize={19} fill={PALETTE.deepMuted} textAnchor="middle">(ここまでの話)</text>
                </g>
                {/* & */}
                <g opacity={fade(f, 55, 85)}>
                    <text x={550} y={225} fontSize={48} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">＋</text>
                </g>
                {/* face 2 */}
                <g opacity={fade(f, 70, 100)}>
                    <rect x={580} y={70} width={460} height={300} rx={22} fill={PALETTE.accent} opacity={0.10} stroke={PALETTE.accent} strokeWidth={3} />
                    <circle cx={810} cy={175} r={60} fill={PALETTE.accent} opacity={0.18} />
                    <text x={810} y={190} fontSize={52} textAnchor="middle">💰</text>
                    <text x={810} y={280} fontSize={30} fontWeight={900} fill={PALETTE.accent} textAnchor="middle">商売の歪み</text>
                    <text x={810} y={315} fontSize={19} fill={PALETTE.deepMuted} textAnchor="middle">razor-and-blades</text>
                    <text x={810} y={343} fontSize={19} fill={PALETTE.deepMuted} textAnchor="middle">DRM / 寿命設計</text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 16: 100年前の商法 ==================
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 42, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 22 }}>
                本体 安い / インク 高い
            </div>
            <svg width={1150} height={470} viewBox="0 0 1150 470">
                {/* body */}
                <g opacity={fade(f, 25, 55)}>
                    <rect x={90} y={80} width={350} height={180} rx={18} fill={PALETTE.surface} stroke={PALETTE.primary} strokeWidth={3} />
                    <g transform="translate(180 90)"><Printer x={90} y={75} s={0.85} mood="plain" /></g>
                    <text x={265} y={295} fontSize={24} fontWeight={800} fill={PALETTE.primary} textAnchor="middle">プリンター本体</text>
                    <text x={265} y={335} fontSize={38} fontWeight={900} fill={PALETTE.ok} textAnchor="middle">1万円前後</text>
                </g>
                <g opacity={fade(f, 45, 75)}>
                    <text x={540} y={220} fontSize={50} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">vs</text>
                </g>
                {/* ink */}
                <g opacity={fade(f, 62, 92)}>
                    <rect x={620} y={80} width={420} height={180} rx={18} fill={PALETTE.surface} stroke={PALETTE.accent} strokeWidth={3} />
                    <g transform="translate(680 120)">
                        <rect x={0} y={20} width={44} height={70} rx={4} fill={PALETTE.cyan} />
                        <rect x={50} y={20} width={44} height={70} rx={4} fill={PALETTE.accent} />
                        <rect x={100} y={20} width={44} height={70} rx={4} fill={PALETTE.warm} />
                        <rect x={150} y={20} width={44} height={70} rx={4} fill={PALETTE.ink} />
                    </g>
                    <text x={830} y={295} fontSize={22} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">小売インク（ガロン換算）</text>
                    <text x={830} y={335} fontSize={38} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">$1,664 〜 $9,600</text>
                </g>
                {/* comparison bar */}
                <g opacity={fade(f, 110, 140)}>
                    <rect x={150} y={400} width={150} height={30} fill={PALETTE.ok} />
                    <text x={225} y={422} fontSize={16} fontWeight={700} fill={PALETTE.surface} textAnchor="middle">ドンペリ $1,200</text>
                    <rect x={300} y={400} width={700} height={30} fill={PALETTE.danger} />
                    <text x={650} y={422} fontSize={16} fontWeight={700} fill={PALETTE.surface} textAnchor="middle">インク (最高 $9,600) — 約10倍</text>
                </g>
                <g opacity={fade(f, 130, 160)}>
                    <text x={580} y={390} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">
                        (Consumer Reports 2013)
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 17: ファームで締め出す ==================
const Scene17: React.FC<SceneProps> = ({ localFrame: f }) => {
    const evs = [
        { year: '2004', label: '互換インク合法化', sub: 'Lexmark判決', col: PALETTE.ok },
        { year: '2016', label: 'Dynamic Security', sub: 'FWで後付けブロック', col: PALETTE.danger },
        { year: '2019', label: '$150万で和解', sub: '集団訴訟 (HP)', col: PALETTE.amber },
        { year: '2024', label: '新たな訴訟', sub: 'Dynamic Security再展開', col: PALETTE.accent },
    ];
    return (
        <Stage>
            <div style={{ textAlign: 'center' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 42, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 20 }}>
                    互換インクは合法。でも動かない。
                </div>
                <svg width={1200} height={460} viewBox="0 0 1200 460">
                    <line x1={80} y1={230} x2={1120} y2={230} stroke={PALETTE.deepMuted} strokeWidth={3} opacity={fade(f, 10, 40)} />
                    {evs.map((e, i) => {
                        const x = 180 + i * 280;
                        const delay = 28 + i * 20;
                        const above = i % 2 === 0;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 20)}>
                                <circle cx={x} cy={230} r={14} fill={e.col} />
                                <line x1={x} y1={230} x2={x} y2={above ? 120 : 340} stroke={e.col} strokeWidth={3} />
                                <rect x={x - 120} y={above ? 30 : 350} width={240} height={90} rx={12} fill={PALETTE.surface} stroke={e.col} strokeWidth={3} />
                                <text x={x} y={(above ? 30 : 350) + 30} fontSize={20} fontWeight={800} fill={e.col} textAnchor="middle">{e.year}</text>
                                <text x={x} y={(above ? 30 : 350) + 60} fontSize={22} fontWeight={900} fill={PALETTE.primaryDeep} textAnchor="middle">{e.label}</text>
                                <text x={x} y={(above ? 30 : 350) + 82} fontSize={16} fill={PALETTE.deepMuted} textAnchor="middle">{e.sub}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </Stage>
    );
};

// ================== SCENE 18: 寿命が設計される ==================
const Scene18: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 22 }}>
                廃インクパッド — 隠れた寿命スイッチ
            </div>
            <svg width={1050} height={460} viewBox="0 0 1050 460">
                {/* printer cross-section */}
                <g opacity={fade(f, 20, 50)}>
                    <rect x={120} y={80} width={440} height={280} rx={20} fill={PALETTE.surface} stroke={PALETTE.primaryDeep} strokeWidth={3} />
                    {/* nozzle area top */}
                    <rect x={150} y={110} width={380} height={50} rx={6} fill={PALETTE.primaryGlow} />
                    <text x={340} y={142} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">印字部</text>
                    {/* pad */}
                    <rect x={150} y={250} width={380} height={80} rx={6} fill={PALETTE.accent} opacity={0.3} stroke={PALETTE.accent} strokeWidth={2} />
                    <text x={340} y={295} fontSize={22} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">廃インクパッド</text>
                    {/* drips */}
                    <circle cx={200} cy={200} r={6} fill={PALETTE.cyan} />
                    <circle cx={280} cy={215} r={5} fill={PALETTE.accent} />
                    <circle cx={360} cy={205} r={6} fill={PALETTE.warm} />
                    <circle cx={440} cy={220} r={5} fill={PALETTE.ink} />
                </g>
                {/* counter */}
                <g opacity={fade(f, 60, 90)}>
                    <rect x={620} y={90} width={360} height={110} rx={14} fill={PALETTE.surface} stroke={PALETTE.amber} strokeWidth={3} />
                    <text x={800} y={128} fontSize={22} fontWeight={800} fill={PALETTE.amber} textAnchor="middle">FWカウンター</text>
                    <rect x={650} y={150} width={300} height={24} rx={4} fill={PALETTE.muted} opacity={0.2} />
                    <rect x={650} y={150} width={260} height={24} rx={4} fill={PALETTE.danger} />
                    <text x={800} y={190} fontSize={18} fill={PALETTE.deepMuted} textAnchor="middle">86% — もうすぐ満杯</text>
                </g>
                {/* brick */}
                <g opacity={fade(f, 100, 130)}>
                    <rect x={620} y={230} width={360} height={130} rx={14} fill={PALETTE.danger} opacity={0.14} stroke={PALETTE.danger} strokeWidth={3} />
                    <text x={800} y={275} fontSize={26} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">プリンター全体</text>
                    <text x={800} y={315} fontSize={26} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">動作停止</text>
                    <text x={800} y={348} fontSize={16} fill={PALETTE.deepMuted} textAnchor="middle">通称: kill chip</text>
                </g>
                <g opacity={fade(f, 130, 160)}>
                    <text x={525} y={430} fontSize={22} fontWeight={800} fill={PALETTE.primaryDeep} textAnchor="middle">
                        満杯の日 = 寿命の日（設計）
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 19: 実は長寿な機種 ==================
const Scene19: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cards = [
        { icon: '🏢', title: 'レーザー', sub: '総じて信頼性 高', col: PALETTE.primary },
        { icon: '🏆', title: 'Brother', sub: '17年稼働の報告', col: PALETTE.ok },
        { icon: '🏪', title: 'コンビニMFP', sub: '毎日普通に動く', col: PALETTE.accent },
        { icon: '💼', title: '業務用MFP', sub: 'MPS保守・長寿', col: PALETTE.warm },
    ];
    return (
        <Stage>
            <div style={{ textAlign: 'center' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 28 }}>
                    でも、壊れないプリンターもある
                </div>
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center', maxWidth: 1200, margin: '0 auto' }}>
                    {cards.map((c, i) => {
                        const delay = 22 + i * 18;
                        return (
                            <div key={i} style={{
                                opacity: fade(f, delay, delay + 20),
                                transform: `translateY(${riseY(f, delay, delay + 20)}px)`,
                                background: PALETTE.surface, border: `3px solid ${c.col}`,
                                borderRadius: 22, padding: '28px 20px', width: 230,
                                boxShadow: '0 12px 32px rgba(31,40,71,0.10)',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 74 }}>{c.icon}</div>
                                <div style={{ fontSize: 30, fontWeight: 900, color: c.col, marginTop: 6 }}>{c.title}</div>
                                <div style={{ fontSize: 20, color: PALETTE.deepMuted, marginTop: 10 }}>{c.sub}</div>
                            </div>
                        );
                    })}
                </div>
                <div style={{ opacity: fade(f, 110, 140), fontSize: 24, color: PALETTE.accent, fontWeight: 800, marginTop: 34 }}>
                    「プリンター不調」はインクジェット＋家庭用に偏っている
                </div>
            </div>
        </Stage>
    );
};

// ================== SCENE 20: 記憶のクセ（peak-end rule） ==================
const Scene20: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: fade(f, 6, 26), fontSize: 42, fontWeight: 800, color: PALETTE.primaryDeep, marginBottom: 10 }}>
                記憶は「最悪の一回」で固定される
            </div>
            <div style={{ opacity: fade(f, 14, 36), fontSize: 22, color: PALETTE.deepMuted, marginBottom: 18 }}>
                peak-end rule (Kahneman & Fredrickson, 1993)
            </div>
            <svg width={1050} height={420} viewBox="0 0 1050 420">
                {/* axis */}
                <line x1={80} y1={310} x2={980} y2={310} stroke={PALETTE.deepMuted} strokeWidth={2} opacity={fade(f, 10, 40)} />
                <line x1={80} y1={60} x2={80} y2={310} stroke={PALETTE.deepMuted} strokeWidth={2} opacity={fade(f, 10, 40)} />
                <text x={530} y={365} fontSize={20} fill={PALETTE.deepMuted} textAnchor="middle">印刷体験の時系列 →</text>
                <text x={50} y={185} fontSize={20} fill={PALETTE.deepMuted} textAnchor="middle" transform="rotate(-90 50 185)">ストレス</text>
                {/* flat normal line with a peak and end spike */}
                <g opacity={fade(f, 40, 80)}>
                    <path d="M90 270 L 230 270 L 290 265 L 330 250 L 400 250 L 440 255 L 520 60 L 600 255 L 700 255 L 800 265 L 880 270 L 900 180 L 960 180"
                        stroke={PALETTE.primary} strokeWidth={4} fill="none" />
                </g>
                {/* peak marker */}
                <g opacity={fade(f, 80, 110)}>
                    <circle cx={520} cy={60} r={13} fill={PALETTE.danger} />
                    <text x={520} y={40} fontSize={20} fontWeight={800} fill={PALETTE.danger} textAnchor="middle">ピーク</text>
                    <text x={520} y={18} fontSize={16} fill={PALETTE.deepMuted} textAnchor="middle">(紙詰まり日)</text>
                </g>
                {/* end marker */}
                <g opacity={fade(f, 110, 140)}>
                    <circle cx={925} cy={180} r={13} fill={PALETTE.amber} />
                    <text x={925} y={160} fontSize={20} fontWeight={800} fill={PALETTE.amber} textAnchor="middle">エンド</text>
                    <text x={925} y={138} fontSize={16} fill={PALETTE.deepMuted} textAnchor="middle">(直近のイライラ)</text>
                </g>
                {/* memory box */}
                <g opacity={fade(f, 140, 170)}>
                    <rect x={240} y={330} width={580} height={60} rx={12} fill={PALETTE.accent} opacity={0.12} stroke={PALETTE.accent} strokeWidth={2} />
                    <text x={530} y={370} fontSize={24} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">
                        この2つが「プリンター全体の印象」
                    </text>
                </g>
            </svg>
        </div>
    </Stage>
);

// ================== SCENE 21: 冒頭への答え ==================
const Scene21: React.FC<SceneProps> = ({ localFrame: f }) => {
    const R = 150;
    return (
        <Stage>
            <div style={{ textAlign: 'center' }}>
                <div style={{ opacity: fade(f, 6, 26), fontSize: 44, fontWeight: 900, color: PALETTE.primaryDeep, marginBottom: 20 }}>
                    機嫌悪さは、三つの交差点
                </div>
                <svg width={900} height={510} viewBox="0 0 900 510">
                    {/* Venn diagram re-echo */}
                    <circle cx={300} cy={200} r={R} fill={PALETTE.primary} opacity={fade(f, 26, 56) * 0.38} />
                    <circle cx={560} cy={200} r={R} fill={PALETTE.accent} opacity={fade(f, 44, 74) * 0.38} />
                    <circle cx={430} cy={360} r={R} fill={PALETTE.warm} opacity={fade(f, 62, 92) * 0.38} />
                    <g opacity={fade(f, 80, 110)}>
                        <text x={200} y={110} fontSize={24} fontWeight={800} fill={PALETTE.primary} textAnchor="middle">70年代からの</text>
                        <text x={200} y={140} fontSize={24} fontWeight={800} fill={PALETTE.primary} textAnchor="middle">技術地層</text>
                    </g>
                    <g opacity={fade(f, 98, 128)}>
                        <text x={660} y={110} fontSize={24} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">100年前の</text>
                        <text x={660} y={140} fontSize={24} fontWeight={800} fill={PALETTE.accent} textAnchor="middle">商法</text>
                    </g>
                    <g opacity={fade(f, 116, 146)}>
                        <text x={430} y={470} fontSize={24} fontWeight={800} fill={PALETTE.amber} textAnchor="middle">月1しか使わない</text>
                        <text x={430} y={500} fontSize={24} fontWeight={800} fill={PALETTE.amber} textAnchor="middle">生活</text>
                    </g>
                    {/* Center */}
                    <g opacity={fade(f, 140, 170)}>
                        <circle cx={430} cy={260} r={76} fill={PALETTE.surface} stroke={PALETTE.primaryDeep} strokeWidth={4} />
                        <text x={430} y={255} fontSize={21} fontWeight={900} fill={PALETTE.danger} textAnchor="middle">機嫌悪い</text>
                        <text x={430} y={285} fontSize={17} fill={PALETTE.deepMuted} textAnchor="middle">(性格じゃなかった)</text>
                    </g>
                </svg>
            </div>
        </Stage>
    );
};

// ================== EXPORTS ==================

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6,
    Scene7, Scene8, Scene9, Scene10, Scene11, Scene12, Scene13,
    Scene14, Scene15, Scene16, Scene17, Scene18, Scene19, Scene20, Scene21,
];

export const SCENE_TITLES: string[] = [
    '謎のイライラ', '擬人化される家電', '今日の見取り図', '画面と印刷',
    '翻訳が要る', '五つの言語', '中身を開ける', 'μmのノズル',
    '学部の実験室', '湿度と紙', 'OS更新で壊れる', 'NT時代の亡霊',
    'プリントナイトメア', 'Wi-Fiに居るのに', 'AirPrintは先行', 'もう一つの顔',
    '100年前の商法', 'ファームで締め出す', '寿命が設計される', '実は長寿な機種',
    '記憶のクセ', '冒頭への答え',
];
