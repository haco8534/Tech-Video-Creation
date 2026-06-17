import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const PALETTE = {
    ...BASE_COLORS,
    primary: '#0EA5E9',
    primaryDeep: '#0369A1',
    primaryGlow: 'rgba(14,165,233,0.28)',
    accent: '#F59E0B',
    warm: '#DC2626',
    amber: '#FBBF24',
    mint: '#10B981',
    plum: '#7C3AED',
    rose: '#EC4899',
    ink: '#0F172A',
    paper: '#F8FAFC',
    line: '#CBD5E1',
    dim: '#94A3B8',
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

const Label: React.FC<{
    x: number; y: number; text: string; size?: number; color?: string;
    align?: 'start' | 'middle' | 'end'; weight?: number;
}> = ({ x, y, text, size = 28, color = PALETTE.ink, align = 'middle', weight = 700 }) => (
    <text x={x} y={y} fontSize={size} fill={color} textAnchor={align} fontWeight={weight}
        fontFamily="'Noto Sans JP', sans-serif">{text}</text>
);

// ===== Scene 0: 無料なのに儲かる謎 =====
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => {
    const apps = Array.from({ length: 30 });
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 16)}>
                    <Label x={750} y={70} text="無料アプリの「本当の値段」" size={52} color={PALETTE.ink} />
                    <Label x={750} y={118} text="ほぼ全部無料。でも会社は潰れない。なぜ？" size={30} color={PALETTE.textDim} weight={500} />
                </g>
                {/* アプリアイコングリッド（6×5） */}
                <g transform="translate(120, 180)">
                    {apps.map((_, i) => {
                        const col = i % 6;
                        const row = Math.floor(i / 6);
                        const isFree = i !== 14;
                        const delay = 20 + i * 2;
                        const color = isFree ? PALETTE.primary : PALETTE.warm;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 8)}
                                transform={`translate(${col * 90} ${row * 90})`}>
                                <rect width={72} height={72} rx={16} fill={color} opacity={0.88} />
                                <text x={36} y={46} fontSize={22} fill="#fff" textAnchor="middle" fontWeight={800}>
                                    {isFree ? '無料' : '¥'}
                                </text>
                            </g>
                        );
                    })}
                </g>
                <g opacity={fade(f, 100, 120)}>
                    <Label x={1130} y={230} text="約 98%" size={78} color={PALETTE.primary} weight={900} />
                    <Label x={1130} y={270} text="アプリストアに並ぶアプリ" size={24} color={PALETTE.textDim} weight={500} />
                    <Label x={1130} y={300} text="が 無料配布" size={24} color={PALETTE.textDim} weight={500} />
                </g>
                <g opacity={fade(f, 150, 170)}>
                    <line x1={760} y1={500} x2={1130} y2={500} stroke={PALETTE.line} strokeWidth={2} strokeDasharray="6,4" />
                    <Label x={750} y={560} text="業界のお金の9割以上が、無料アプリから" size={32} color={PALETTE.ink} weight={800} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 1: 今日の見取り図 =====
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { n: '1', title: '何を払ってるか', sub: '対価の中身' },
        { n: '2', title: 'どう回収してるか', sub: '会社側の仕組み' },
        { n: '3', title: '標語を疑う', sub: '「あなたが商品」は本当？' },
        { n: '4', title: 'どう付き合うか', sub: '選ぶ側に回る' },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="今日の見取り図" size={54} color={PALETTE.ink} />
                </g>
                {items.map((it, i) => {
                    const y = 140 + i * 115;
                    const delay = 22 + i * 18;
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 14)}
                            transform={`translate(0 ${riseY(f, delay, delay + 14, 14)})`}>
                            <rect x={180} y={y} width={1140} height={95} rx={18} fill="#fff"
                                stroke={PALETTE.line} strokeWidth={2.5} />
                            <circle cx={250} cy={y + 47} r={38} fill={PALETTE.primary} />
                            <text x={250} y={y + 60} fontSize={42} fill="#fff" fontWeight={900} textAnchor="middle"
                                fontFamily="'Noto Sans JP', sans-serif">{it.n}</text>
                            <Label x={320} y={y + 46} text={it.title} size={38} align="start" weight={900} />
                            <Label x={320} y={y + 82} text={it.sub} size={26} color={PALETTE.textDim} align="start" weight={600} />
                        </g>
                    );
                })}
            </svg>
        </Stage>
    );
};

// ===== Scene 2: 3つの見えない対価 =====
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const cards = [
        { icon: '⏱', title: '時間', sub: '画面を見てる時間' },
        { icon: '📊', title: 'データ', sub: 'どこで何をしたか' },
        { icon: '🎯', title: '集中力', sub: '頭の切り替えコスト' },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="お金以外で払っているもの" size={52} color={PALETTE.ink} />
                </g>
                {cards.map((c, i) => {
                    const x = 130 + i * 420;
                    const delay = 24 + i * 20;
                    const colors = [PALETTE.primary, PALETTE.amber, PALETTE.rose];
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 14)}
                            transform={`translate(0 ${riseY(f, delay, delay + 14, 18)})`}>
                            <rect x={x} y={130} width={380} height={380} rx={24} fill="#fff"
                                stroke={colors[i]} strokeWidth={5} />
                            <rect x={x} y={130} width={380} height={70} rx={24} fill={colors[i]} />
                            <rect x={x} y={170} width={380} height={30} fill={colors[i]} />
                            <text x={x + 190} y={180} fontSize={36} fill="#fff" textAnchor="middle" fontWeight={900}
                                fontFamily="'Noto Sans JP', sans-serif">対価 {i + 1}</text>
                            <text x={x + 190} y={310} fontSize={110} textAnchor="middle">{c.icon}</text>
                            <Label x={x + 190} y={390} text={c.title} size={52} weight={900} color={colors[i]} />
                            <Label x={x + 190} y={450} text={c.sub} size={26} color={PALETTE.ink} weight={700} />
                        </g>
                    );
                })}
                <g opacity={fade(f, 110, 130)}>
                    <Label x={750} y={585} text="「無料」は、お金の話だけをしている" size={34} color={PALETTE.ink} weight={800} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 3: 1日4時間半 =====
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => {
    const bars = [
        { label: 'SNS', pct: 35, color: PALETTE.rose },
        { label: '動画系', pct: 33, color: PALETTE.primary },
        { label: 'その他のアプリ', pct: 32, color: PALETTE.line },
    ];
    const maxW = 780;
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={55} text="1日のスマホ時間、世界平均" size={50} color={PALETTE.ink} />
                </g>
                {/* 大きな数字 */}
                <g opacity={fade(f, 18, 34)}>
                    <Label x={750} y={170} text="4時間 37分" size={120} color={PALETTE.primary} weight={900} />
                    <Label x={750} y={215} text="(2024年, 世界平均)" size={28} color={PALETTE.textDim} weight={600} />
                </g>
                {/* 内訳 */}
                <g opacity={fade(f, 44, 58)}>
                    <Label x={750} y={285} text="時間の内訳" size={32} color={PALETTE.ink} weight={800} />
                </g>
                {/* 横棒 */}
                {bars.map((b, i) => {
                    const y = 320 + i * 70;
                    const delay = 58 + i * 16;
                    const barW = interpolate(f, [delay, delay + 20], [0, (b.pct / 35) * maxW],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 14)}>
                            <Label x={300} y={y + 32} text={b.label} size={28} weight={800} align="end" />
                            <rect x={320} y={y + 10} width={maxW} height={44} rx={8} fill={PALETTE.paper} />
                            <rect x={320} y={y + 10} width={barW} height={44} rx={8} fill={b.color} />
                            <Label x={320 + (b.pct / 35) * maxW + 20} y={y + 40}
                                text={`${b.pct}%`} size={30} color={b.color} weight={900} align="start" />
                        </g>
                    );
                })}
                {/* 下部メッセージ */}
                <g opacity={fade(f, 130, 150)}>
                    <rect x={120} y={540} width={1260} height={80} rx={18} fill="#FEF3C7" stroke={PALETTE.amber} strokeWidth={3} />
                    <Label x={750} y={592} text="3分の2が SNS＋動画。少数のアプリに集中" size={34} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 4: 注意の奪い合い =====
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="希少なのは、情報ではなく「注意」" size={50} color={PALETTE.ink} />
                </g>
                {/* 左: 情報の山 */}
                <g opacity={fade(f, 18, 34)} transform="translate(140 150)">
                    <rect width={500} height={360} rx={20} fill={PALETTE.paper} stroke={PALETTE.primary} strokeWidth={3} />
                    <Label x={250} y={40} text="情報の量" size={30} color={PALETTE.primary} weight={900} />
                    {Array.from({ length: 24 }).map((_, i) => {
                        const col = i % 6;
                        const row = Math.floor(i / 6);
                        const delay = 26 + i * 3;
                        return (
                            <rect key={i} x={70 + col * 60} y={70 + row * 52} width={48} height={40} rx={8}
                                fill={PALETTE.primary} opacity={fade(f, delay, delay + 6) * 0.75} />
                        );
                    })}
                    <Label x={250} y={340} text="無限に増え続ける" size={26} color={PALETTE.ink} weight={700} />
                </g>
                {/* 中央: 矢印 */}
                <g opacity={fade(f, 80, 96)}>
                    <path d="M 660 330 L 800 330" stroke={PALETTE.ink} strokeWidth={5} fill="none" />
                    <path d="M 788 318 L 810 330 L 788 342 Z" fill={PALETTE.ink} />
                    <Label x={730} y={300} text="でも" size={28} color={PALETTE.textDim} weight={800} />
                </g>
                {/* 右: こちらの注意 */}
                <g opacity={fade(f, 100, 116)} transform="translate(830 150)">
                    <rect width={530} height={360} rx={20} fill="#FEE2E2" stroke={PALETTE.warm} strokeWidth={3} />
                    <Label x={265} y={40} text="見られる量" size={30} color={PALETTE.warm} weight={900} />
                    <text x={265} y={200} fontSize={120} textAnchor="middle">👀</text>
                    <Label x={265} y={270} text="1日は24時間" size={36} color={PALETTE.warm} weight={900} />
                    <Label x={265} y={320} text="増やせない" size={28} color={PALETTE.ink} weight={700} />
                </g>
                <g opacity={fade(f, 140, 160)}>
                    <rect x={300} y={540} width={900} height={80} rx={16} fill={PALETTE.ink} />
                    <Label x={750} y={592} text="希少な資源は、奪い合いになる" size={36} color="#fff" weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 5: 稼ぎ方は4つ =====
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => {
    const types = [
        { icon: '📺', title: '広告', sub: 'アプリ内に広告を出す', color: PALETTE.primary },
        { icon: '💎', title: 'アプリ内課金', sub: 'ガチャ・月額会員', color: PALETTE.amber },
        { icon: '📦', title: 'データ販売', sub: '行動の記録を売る', color: PALETTE.rose },
        { icon: '🤝', title: '取引手数料', sub: '売買・送金の数%', color: PALETTE.mint },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="会社はどう稼ぐか：4つの型" size={52} color={PALETTE.ink} />
                </g>
                {types.map((t, i) => {
                    const col = i % 2;
                    const row = Math.floor(i / 2);
                    const x = 140 + col * 620;
                    const y = 140 + row * 230;
                    const delay = 20 + i * 16;
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 14)}
                            transform={`translate(0 ${riseY(f, delay, delay + 14, 12)})`}>
                            <rect x={x} y={y} width={580} height={200} rx={22} fill="#fff"
                                stroke={t.color} strokeWidth={4} />
                            <text x={x + 90} y={y + 130} fontSize={96} textAnchor="middle">{t.icon}</text>
                            <Label x={x + 200} y={y + 80} text={t.title} size={42} align="start" weight={900} color={t.color} />
                            <Label x={x + 200} y={y + 140} text={t.sub} size={28} align="start" color={PALETTE.ink} weight={700} />
                        </g>
                    );
                })}
            </svg>
        </Stage>
    );
};

// ===== Scene 6: 広告の中で何が起きる =====
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => {
    const bidders = [
        { name: '広告主A', price: '¥12', x: 150, win: false },
        { name: '広告主B', price: '¥28', x: 500, win: true },
        { name: '広告主C', price: '¥15', x: 850, win: false },
        { name: '広告主D', price: '¥9', x: 1200, win: false },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="広告枠が出るまでの0.1秒" size={54} color={PALETTE.ink} />
                </g>
                {/* あなた（データソース） */}
                <g opacity={fade(f, 18, 30)}>
                    <rect x={560} y={130} width={380} height={110} rx={16} fill={PALETTE.ink} />
                    <Label x={750} y={175} text="あなたの情報" size={32} color="#fff" weight={900} />
                    <Label x={750} y={215} text="年齢・場所・検索履歴" size={24} color={PALETTE.paper} weight={600} />
                </g>
                {/* 広告主の列 */}
                {bidders.map((b, i) => {
                    const delay = 36 + i * 10;
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 10)}>
                            <path d={`M 750 240 Q 750 320 ${b.x + 75} 370`}
                                stroke={PALETTE.warm} strokeWidth={2.5} fill="none" strokeDasharray="4,3"
                                opacity={fade(f, delay + 6, delay + 14) * 0.7} />
                            <rect x={b.x - 20} y={370} width={190} height={120} rx={14}
                                fill={b.win ? '#FEF3C7' : '#fff'}
                                stroke={b.win ? PALETTE.amber : PALETTE.line}
                                strokeWidth={b.win ? 5 : 2} />
                            <Label x={b.x + 75} y={412} text={b.name} size={24} weight={800} />
                            <Label x={b.x + 75} y={465} text={b.price}
                                size={b.win ? 44 : 36}
                                color={b.win ? PALETTE.warm : PALETTE.ink}
                                weight={900} />
                            {b.win && <Label x={b.x + 75} y={357} text="★ 落札" size={22} color={PALETTE.warm} weight={900} />}
                        </g>
                    );
                })}
                {/* ポイント */}
                <g opacity={fade(f, 110, 130)}>
                    <rect x={100} y={515} width={1300} height={100} rx={16} fill="#FEF2F2" stroke={PALETTE.warm} strokeWidth={3} />
                    <Label x={750} y={570} text="落札1社だけじゃない。「値段を付けた全社」に情報が配られる" size={32} color={PALETTE.warm} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 7: アプリに潜む小さな部品 =====
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => {
    const sdks = ['広告', '分析', '地図', '決済', '通知', '動画', '認証', '位置'];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="アプリの中に、他社の部品がぎっしり" size={48} color={PALETTE.ink} />
                </g>
                {/* 中央：アプリ本体 */}
                <g opacity={fade(f, 18, 32)}>
                    <rect x={590} y={275} width={320} height={160} rx={24} fill={PALETTE.primary} />
                    <Label x={750} y={345} text="アプリ" size={52} color="#fff" weight={900} />
                    <Label x={750} y={390} text="1つの画面" size={24} color={PALETTE.paper} weight={600} />
                </g>
                {/* 周囲のSDK部品を8個に削減、大きく */}
                {sdks.map((s, i) => {
                    const angle = (i / sdks.length) * 2 * Math.PI - Math.PI / 2;
                    const rx = 340, ry = 220;
                    const x = 750 + rx * Math.cos(angle);
                    const y = 355 + ry * Math.sin(angle);
                    const delay = 40 + i * 10;
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 10)}>
                            <line x1={750 + 170 * Math.cos(angle)} y1={355 + 100 * Math.sin(angle)}
                                x2={x} y2={y} stroke={PALETTE.amber} strokeWidth={2.5} strokeDasharray="4,3" />
                            <circle cx={x} cy={y} r={55} fill="#fff" stroke={PALETTE.amber} strokeWidth={4} />
                            <text x={x} y={y + 10} fontSize={26} textAnchor="middle" fontWeight={800} fill={PALETTE.ink}
                                fontFamily="'Noto Sans JP', sans-serif">{s}</text>
                        </g>
                    );
                })}
                {/* 下部ポイント */}
                <g opacity={fade(f, 130, 150)}>
                    <rect x={140} y={540} width={1220} height={80} rx={16} fill="#F3E8FF" stroke={PALETTE.plum} strokeWidth={3} />
                    <Label x={750} y={593} text="1つのアプリに10〜30個。送り先は全部違う会社" size={32} color={PALETTE.plum} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 8: 1人分のプロフィール =====
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => {
    const fields = [
        '年収', '家族構成', '買う商品',
        '通う店', 'よく行く場所', '健康の関心',
        '政治傾向', '趣味', '就寝時刻',
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="1人分のプロフィールは、これだけ細かい" size={48} color={PALETTE.ink} />
                </g>
                {/* 左: 人アイコン */}
                <g opacity={fade(f, 18, 32)}>
                    <circle cx={240} cy={310} r={80} fill={PALETTE.primary} />
                    <circle cx={240} cy={282} r={28} fill="#fff" />
                    <rect x={202} y={310} width={76} height={56} rx={28} fill="#fff" />
                    <Label x={240} y={430} text="あなた1人分" size={32} weight={900} />
                </g>
                {/* 中央：矢印 */}
                <g opacity={fade(f, 36, 50)}>
                    <path d="M 350 310 L 460 310" stroke={PALETTE.ink} strokeWidth={5} fill="none" />
                    <path d="M 450 298 L 472 310 L 450 322 Z" fill={PALETTE.ink} />
                </g>
                {/* 右: 9項目を大きく + …まだ続く */}
                <g transform="translate(500 155)">
                    {fields.map((fld, i) => {
                        const col = i % 3;
                        const row = Math.floor(i / 3);
                        const delay = 52 + i * 6;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 10)}
                                transform={`translate(${col * 320} ${row * 90})`}>
                                <rect width={300} height={72} rx={14} fill={PALETTE.paper} stroke={PALETTE.amber} strokeWidth={2.5} />
                                <text x={150} y={48} fontSize={28} textAnchor="middle" fontWeight={800} fill={PALETTE.ink}
                                    fontFamily="'Noto Sans JP', sans-serif">{fld}</text>
                            </g>
                        );
                    })}
                    {/* …まだ続く */}
                    <g opacity={fade(f, 120, 136)} transform={`translate(0 ${3 * 90})`}>
                        <rect width={940} height={48} rx={10} fill="#fff" />
                        <text x={470} y={33} fontSize={26} textAnchor="middle" fontWeight={700} fill={PALETTE.textDim}
                            fontFamily="'Noto Sans JP', sans-serif">…まだ1,000項目以上続く</text>
                    </g>
                </g>
                {/* 下部 */}
                <g opacity={fade(f, 150, 170)}>
                    <rect x={140} y={545} width={1220} height={80} rx={16} fill="#FFFBEB" stroke={PALETTE.amber} strokeWidth={3} />
                    <Label x={750} y={598} text="1人あたり 1,500 〜 10,000+ 項目" size={36} color={PALETTE.warm} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 9: 標語の意味と限界 =====
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={55} text="データを「売る」vs 権利を「貸す」" size={50} color={PALETTE.ink} />
                </g>
                {/* 左: イメージ */}
                <g opacity={fade(f, 18, 32)}>
                    <rect x={80} y={125} width={640} height={360} rx={20} fill="#FEE2E2" stroke={PALETTE.warm} strokeWidth={4} />
                    <Label x={400} y={175} text="❌ イメージ" size={30} color={PALETTE.warm} weight={900} />
                    <Label x={400} y={220} text="データそのものを売る" size={34} weight={900} />
                    <rect x={140} y={275} width={180} height={90} rx={14} fill={PALETTE.primary} />
                    <Label x={230} y={328} text="SNS会社" size={28} color="#fff" weight={900} />
                    <path d="M 335 320 L 475 320" stroke={PALETTE.warm} strokeWidth={5} fill="none" />
                    <path d="M 463 308 L 485 320 L 463 332 Z" fill={PALETTE.warm} />
                    <rect x={340} y={380} width={140} height={44} rx={10} fill="#fff" stroke={PALETTE.warm} strokeWidth={2.5} />
                    <Label x={410} y={410} text="📊 データ" size={22} weight={900} color={PALETTE.warm} />
                    <rect x={490} y={275} width={180} height={90} rx={14} fill={PALETTE.amber} />
                    <Label x={580} y={328} text="広告主" size={28} color="#fff" weight={900} />
                </g>
                {/* 右: 実態 */}
                <g opacity={fade(f, 60, 76)}>
                    <rect x={780} y={125} width={640} height={360} rx={20} fill="#ECFDF5" stroke={PALETTE.mint} strokeWidth={4} />
                    <Label x={1100} y={175} text="✅ 実態" size={30} color={PALETTE.mint} weight={900} />
                    <Label x={1100} y={220} text="「見せる権利」だけ貸す" size={34} weight={900} />
                    <rect x={840} y={275} width={180} height={90} rx={14} fill={PALETTE.primary} />
                    <Label x={930} y={328} text="SNS会社" size={28} color="#fff" weight={900} />
                    <g opacity={fade(f, 82, 96)}>
                        <rect x={840} y={380} width={180} height={44} rx={10} fill="#fff" stroke={PALETTE.primary} strokeWidth={2.5} strokeDasharray="5,3" />
                        <Label x={930} y={410} text="🔒 データは社内" size={22} weight={900} color={PALETTE.primary} />
                    </g>
                    <path d="M 1035 320 L 1175 320" stroke={PALETTE.mint} strokeWidth={5} fill="none" />
                    <path d="M 1163 308 L 1185 320 L 1163 332 Z" fill={PALETTE.mint} />
                    <text x={1105} y={302} fontSize={20} textAnchor="middle" fontWeight={900} fill={PALETTE.mint}
                        fontFamily="'Noto Sans JP', sans-serif">見せる権利</text>
                    <rect x={1190} y={275} width={180} height={90} rx={14} fill={PALETTE.amber} />
                    <Label x={1280} y={328} text="広告主" size={28} color="#fff" weight={900} />
                </g>
                <g opacity={fade(f, 110, 130)}>
                    <Label x={750} y={570} text="大手SNS・検索はこの型。単純な「売買」ではない" size={30} color={PALETTE.ink} weight={800} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 10: 売らない無料もある =====
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => {
    const reps = [
        { icon: '📚', title: 'ウィキペディア', sub: '広告なし・寄付だけ', color: PALETTE.primary },
        { icon: '💬', title: 'シグナル', sub: '暗号化メッセ・寄付運営', color: PALETTE.mint },
        { icon: '🤝', title: 'フリマ・送金', sub: '取引手数料で稼ぐ', color: PALETTE.amber },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="「あなたが商品」じゃない無料もある" size={48} color={PALETTE.ink} />
                </g>
                {reps.map((r, i) => {
                    const x = 140 + i * 410;
                    const delay = 20 + i * 22;
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 14)}
                            transform={`translate(0 ${riseY(f, delay, delay + 14, 14)})`}>
                            <rect x={x} y={150} width={360} height={370} rx={22} fill="#fff"
                                stroke={r.color} strokeWidth={5} />
                            <text x={x + 180} y={280} fontSize={120} textAnchor="middle">{r.icon}</text>
                            <Label x={x + 180} y={370} text={r.title} size={36} color={r.color} weight={900} />
                            <Label x={x + 180} y={420} text={r.sub} size={24} color={PALETTE.ink} weight={700} />
                            <rect x={x + 60} y={460} width={240} height={40} rx={10} fill={PALETTE.paper} />
                            <Label x={x + 180} y={488} text="広告型じゃない" size={22} color={r.color} weight={800} />
                        </g>
                    );
                })}
                <g opacity={fade(f, 110, 130)}>
                    <rect x={180} y={555} width={1140} height={70} rx={16} fill={PALETTE.ink} />
                    <Label x={750} y={600} text="無料アプリは1つの型じゃない" size={32} color="#fff" weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 11: 売買より配布に近い =====
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="売買 vs 配布：イメージとのズレ" size={50} color={PALETTE.ink} />
                </g>
                {/* 左: 1対1 */}
                <g opacity={fade(f, 18, 34)}>
                    <rect x={60} y={130} width={680} height={360} rx={20} fill={PALETTE.paper} stroke={PALETTE.line} strokeWidth={3} />
                    <Label x={400} y={180} text="❌ イメージ：1対1" size={32} color={PALETTE.textDim} weight={900} />
                    <circle cx={200} cy={330} r={60} fill={PALETTE.primary} />
                    <Label x={200} y={420} text="あなた" size={28} weight={800} />
                    <path d="M 275 330 L 505 330" stroke={PALETTE.ink} strokeWidth={5} fill="none" />
                    <path d="M 493 318 L 515 330 L 493 342 Z" fill={PALETTE.ink} />
                    <rect x={530} y={285} width={170} height={100} rx={16} fill={PALETTE.amber} />
                    <Label x={615} y={345} text="1社" size={40} color="#fff" weight={900} />
                </g>
                {/* 右: 1対N (配布) */}
                <g opacity={fade(f, 60, 76)}>
                    <rect x={770} y={130} width={680} height={360} rx={20} fill="#FEF2F2" stroke={PALETTE.warm} strokeWidth={3} />
                    <Label x={1110} y={180} text="✅ 実態：1対多で配布" size={32} color={PALETTE.warm} weight={900} />
                    <circle cx={870} cy={330} r={60} fill={PALETTE.primary} />
                    <Label x={870} y={420} text="あなた" size={28} weight={800} />
                </g>
                {/* 右: 4社に分岐（削減・拡大） */}
                {Array.from({ length: 4 }).map((_, i) => {
                    const y = 240 + i * 60;
                    const delay = 82 + i * 10;
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 10)}>
                            <path d={`M 935 330 Q 1050 330 1170 ${y + 23}`}
                                stroke={PALETTE.warm} strokeWidth={3} fill="none" strokeDasharray="5,3" />
                            <rect x={1170} y={y} width={230} height={46} rx={10}
                                fill="#fff" stroke={PALETTE.warm} strokeWidth={2.5} />
                            <Label x={1285} y={y + 32} text={`広告主 ${String.fromCharCode(65 + i)}`} size={24} weight={800} />
                        </g>
                    );
                })}
                <g opacity={fade(f, 140, 160)}>
                    <rect x={160} y={540} width={1180} height={80} rx={16} fill="#FEF2F2" stroke={PALETTE.warm} strokeWidth={3} />
                    <Label x={750} y={592} text="同時に何十社に「配られて」いる" size={36} color={PALETTE.warm} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 12: テレビの時代も同じ型 =====
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => {
    const rows = [
        { label: '規模', tv: '同時間に同じCM', mobile: '1人ずつ違う広告が何百回' },
        { label: '解像度', tv: '年齢・性別くらい', mobile: '場所・購買・友人関係' },
        { label: '双方向性', tv: '見るだけ', mobile: 'タップや滞在秒を測る' },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={55} text="テレビ時代と、今のスマホの違い" size={50} color={PALETTE.ink} />
                </g>
                {/* 比較テーブルに集中、大きく */}
                <g transform="translate(80 120)">
                    <g opacity={fade(f, 18, 32)}>
                        <rect x={0} y={0} width={260} height={70} fill={PALETTE.ink} rx={10} />
                        <Label x={130} y={48} text="違い" size={30} color="#fff" weight={900} />
                        <rect x={270} y={0} width={510} height={70} fill={PALETTE.line} rx={10} />
                        <Label x={525} y={48} text="ラジオ・テレビ" size={30} weight={900} />
                        <rect x={790} y={0} width={550} height={70} fill={PALETTE.primary} rx={10} />
                        <Label x={1065} y={48} text="スマホ" size={32} color="#fff" weight={900} />
                    </g>
                    {rows.map((r, i) => {
                        const y = 90 + i * 118;
                        const delay = 38 + i * 18;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 14)}>
                                <rect x={0} y={y} width={260} height={100} fill="#fff" stroke={PALETTE.line} strokeWidth={2} rx={8} />
                                <Label x={130} y={y + 62} text={r.label} size={32} weight={900} />
                                <rect x={270} y={y} width={510} height={100} fill="#F8FAFC" stroke={PALETTE.line} strokeWidth={2} rx={8} />
                                <Label x={525} y={y + 62} text={r.tv} size={26} weight={700} color={PALETTE.textDim} />
                                <rect x={790} y={y} width={550} height={100} fill="#EFF6FF" stroke={PALETTE.primary} strokeWidth={3} rx={8} />
                                <Label x={1065} y={y + 62} text={r.mobile} size={26} weight={800} color={PALETTE.primaryDeep} />
                            </g>
                        );
                    })}
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 13: 手放せない工夫 =====
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="アプリは「離させない」設計をしている" size={48} color={PALETTE.ink} />
                </g>
                {/* 左: スロットマシン */}
                <g opacity={fade(f, 18, 34)}>
                    <rect x={100} y={150} width={600} height={380} rx={24} fill={PALETTE.ink} />
                    <Label x={400} y={205} text="スロットマシン" size={34} color={PALETTE.amber} weight={900} />
                    {[0, 1, 2].map((n) => (
                        <g key={n}>
                            <rect x={150 + n * 170} y={245} width={140} height={170} rx={12} fill="#fff" />
                            <text x={220 + n * 170} y={345} fontSize={80} textAnchor="middle">
                                {n === 1 ? '7' : n === 0 ? '🍒' : '?'}
                            </text>
                        </g>
                    ))}
                    <Label x={400} y={465} text="「何が出るか、わからない」" size={28} color="#fff" weight={800} />
                    <Label x={400} y={505} text="→ つい何回も引いてしまう" size={26} color={PALETTE.amber} weight={900} />
                </g>
                {/* 中央矢印 */}
                <g opacity={fade(f, 70, 86)}>
                    <path d="M 720 330 L 840 330" stroke={PALETTE.warm} strokeWidth={5} fill="none" />
                    <path d="M 828 318 L 850 330 L 828 342 Z" fill={PALETTE.warm} />
                    <Label x={780} y={300} text="同じ仕組み" size={24} color={PALETTE.warm} weight={900} />
                </g>
                {/* 右: 通知バッジ（大きく） */}
                <g opacity={fade(f, 86, 102)}>
                    <rect x={870} y={150} width={530} height={380} rx={24} fill={PALETTE.paper} stroke={PALETTE.line} strokeWidth={3} />
                    <Label x={1135} y={205} text="赤い通知バッジ" size={34} color={PALETTE.warm} weight={900} />
                    {/* スマホ風アイコン */}
                    <rect x={1040} y={235} width={190} height={240} rx={28} fill="#fff" stroke={PALETTE.ink} strokeWidth={4} />
                    <text x={1135} y={382} fontSize={100} textAnchor="middle">📱</text>
                    {/* 通知バッジ（大きく） */}
                    <circle cx={1220} cy={255} r={42} fill={PALETTE.warm} />
                    <text x={1220} y={270} fontSize={38} fill="#fff" fontWeight={900} textAnchor="middle"
                        fontFamily="'Noto Sans JP', sans-serif">9</text>
                    <Label x={1135} y={510} text="気になって、つい開く" size={26} color={PALETTE.warm} weight={900} />
                </g>
                <g opacity={fade(f, 110, 130)}>
                    <Label x={750} y={610} text="偶然できた動きじゃない。意図的な設計" size={30} color={PALETTE.ink} weight={800} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 14: でも大半は飽きられる =====
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => {
    const users = Array.from({ length: 100 });
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="9割以上は、30日以内に使われなくなる" size={46} color={PALETTE.ink} />
                </g>
                {/* 100人グリッド（10x10, 拡大） */}
                <g transform="translate(160 150)">
                    {users.map((_, i) => {
                        const col = i % 10;
                        const row = Math.floor(i / 10);
                        const stays = i < 9;
                        const delay = 22 + i * 1.2;
                        return (
                            <g key={i} opacity={fade(f, delay, delay + 6)}
                                transform={`translate(${col * 46} ${row * 38})`}>
                                <circle cx={18} cy={18} r={16}
                                    fill={stays ? PALETTE.mint : PALETTE.line} />
                            </g>
                        );
                    })}
                </g>
                <g opacity={fade(f, 150, 166)}>
                    <rect x={780} y={150} width={560} height={140} rx={18} fill="#ECFDF5" stroke={PALETTE.mint} strokeWidth={4} />
                    <Label x={1060} y={205} text="残る 🟢" size={34} color={PALETTE.mint} weight={900} />
                    <Label x={1060} y={265} text="9%前後" size={52} color={PALETTE.mint} weight={900} />
                    <rect x={780} y={320} width={560} height={140} rx={18} fill={PALETTE.paper} stroke={PALETTE.line} strokeWidth={3} />
                    <Label x={1060} y={375} text="離脱 ⚪" size={34} color={PALETTE.textDim} weight={900} />
                    <Label x={1060} y={435} text="90%超" size={52} color={PALETTE.ink} weight={900} />
                </g>
                <g opacity={fade(f, 180, 200)}>
                    <rect x={150} y={550} width={1200} height={70} rx={14} fill={PALETTE.paper} stroke={PALETTE.primary} strokeWidth={2} />
                    <Label x={750} y={595} text="残るのは、友達や家族が乗ってるアプリ" size={30} color={PALETTE.primaryDeep} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 15: 3つのチェック =====
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => {
    const checks = [
        { n: '1', key: '型', q: 'どの型で稼いでる？', sub: '広告 / 課金 / データ / 手数料', color: PALETTE.primary },
        { n: '2', key: '対価', q: '自分は何を払ってる？', sub: '時間 / データ / 集中', color: PALETTE.amber },
        { n: '3', key: '仕掛け', q: '手放しにくい工夫は？', sub: '通知バッジ / 下引きなど', color: PALETTE.rose },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={60} text="使う前に3つチェック" size={54} color={PALETTE.ink} />
                </g>
                {checks.map((c, i) => {
                    const x = 90 + i * 445;
                    const delay = 20 + i * 22;
                    return (
                        <g key={i} opacity={fade(f, delay, delay + 14)}
                            transform={`translate(0 ${riseY(f, delay, delay + 14, 16)})`}>
                            <rect x={x} y={130} width={420} height={400} rx={24} fill="#fff"
                                stroke={c.color} strokeWidth={5} />
                            <circle cx={x + 75} cy={210} r={44} fill={c.color} />
                            <text x={x + 75} y={227} fontSize={48} fill="#fff" fontWeight={900} textAnchor="middle"
                                fontFamily="'Noto Sans JP', sans-serif">{c.n}</text>
                            <Label x={x + 140} y={225} text={c.key} size={44} weight={900} color={c.color} align="start" />
                            <line x1={x + 40} y1={278} x2={x + 380} y2={278} stroke={c.color} strokeWidth={2.5} />
                            <Label x={x + 210} y={345} text={c.q} size={30} weight={900} />
                            <Label x={x + 210} y={400} text={c.sub} size={23} color={PALETTE.ink} weight={700} />
                            <rect x={x + 40} y={445} width={340} height={52} rx={10} fill={PALETTE.paper} stroke={c.color} strokeWidth={2} />
                            <Label x={x + 210} y={480} text="自覚 → 選択" size={26} weight={900} color={c.color} />
                        </g>
                    );
                })}
                <g opacity={fade(f, 100, 120)}>
                    <Label x={750} y={595} text="分けて見れば、払い方は選べる" size={34} color={PALETTE.ink} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 16: 見ている時間も対価 =====
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => {
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={70} text="この動画を見てる時間も、立派な対価" size={44} color={PALETTE.ink} />
                </g>
                {/* 左: 時計・対価 */}
                <g opacity={fade(f, 18, 34)}>
                    <circle cx={300} cy={340} r={110} fill="#fff" stroke={PALETTE.primary} strokeWidth={6} />
                    <text x={300} y={360} fontSize={80} textAnchor="middle">⏱</text>
                    <Label x={300} y={485} text="あなたの時間" size={24} color={PALETTE.primary} weight={800} />
                </g>
                {/* 矢印 */}
                <g opacity={fade(f, 40, 56)}>
                    <path d="M 430 340 L 550 340" stroke={PALETTE.ink} strokeWidth={4} fill="none" />
                    <path d="M 540 330 L 560 340 L 540 350 Z" fill={PALETTE.ink} />
                </g>
                {/* 視聴イメージ */}
                <g opacity={fade(f, 56, 76)}>
                    <rect x={580} y={230} width={500} height={270} rx={18} fill={PALETTE.ink} />
                    <rect x={596} y={246} width={468} height={238} rx={6} fill={PALETTE.paper} />
                    <circle cx={830} cy={365} r={44} fill={PALETTE.primary} />
                    <path d="M 816 347 L 852 365 L 816 383 Z" fill="#fff" />
                </g>
                {/* 矢印 */}
                <g opacity={fade(f, 80, 96)}>
                    <path d="M 1100 340 L 1220 340" stroke={PALETTE.ink} strokeWidth={4} fill="none" />
                    <path d="M 1210 330 L 1230 340 L 1210 350 Z" fill={PALETTE.ink} />
                </g>
                {/* 右：持ち帰り */}
                <g opacity={fade(f, 96, 116)}>
                    <rect x={1240} y={240} width={200} height={200} rx={20} fill="#ECFDF5" stroke={PALETTE.mint} strokeWidth={4} />
                    <text x={1340} y={345} fontSize={72} textAnchor="middle">🎁</text>
                    <Label x={1340} y={395} text="持ち帰り" size={22} color={PALETTE.mint} weight={900} />
                </g>
                {/* 下部メッセージ */}
                <g opacity={fade(f, 130, 150)}>
                    <rect x={300} y={540} width={900} height={80} rx={16} fill="#ECFDF5" stroke={PALETTE.mint} strokeWidth={3} />
                    <Label x={750} y={590} text="払った分だけ、何かを持ち帰ってほしい" size={28} color={PALETTE.mint} weight={900} />
                </g>
            </svg>
        </Stage>
    );
};

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8,
    Scene9, Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16,
];

export const SCENE_TITLES: string[] = [
    '無料なのに儲かる謎',
    '今日の見取り図',
    '3つの見えない対価',
    '1日4時間半',
    '注意の奪い合い',
    '稼ぎ方は4つ',
    '広告の中で何が起きる',
    'アプリに潜む小さな部品',
    '1人分のプロフィール',
    '標語の意味と限界',
    '売らない無料もある',
    '売買より配布に近い',
    'テレビの時代も同じ型',
    '手放せない工夫',
    'でも大半は飽きられる',
    '3つのチェック',
    '見ている時間も対価',
];
