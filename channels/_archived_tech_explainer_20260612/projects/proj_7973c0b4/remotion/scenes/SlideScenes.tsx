import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const PALETTE = {
    ...BASE_COLORS,
    primary: '#3B82F6',
    primaryDeep: '#1E3A8A',
    accent: '#F59E0B',
    warm: '#EF4444',
    amber: '#FBBF24',
    plum: '#7C3AED',
    copper: '#B87333',
    mint: '#10B981',
    ink: '#0F172A',
    paper: '#F8FAFC',
    line: '#CBD5E1',
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

const BrokenCable: React.FC<{ x: number; y: number; scale?: number; frayed?: boolean }>
    = ({ x, y, scale = 1, frayed = true }) => (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <rect x={-180} y={-24} width={100} height={48} rx={7} fill={PALETTE.ink} />
            <rect x={-100} y={-15} width={22} height={30} rx={3} fill="#6B7280" />
            <path d="M-78,-15 Q-64,-19 -48,-17 L-48,17 Q-64,19 -78,15 Z" fill={PALETTE.ink} />
            <rect x={-48} y={-8} width={280} height={16} rx={8} fill="#E5E7EB" stroke="#9CA3AF" strokeWidth={1.2} />
            {frayed && (
                <>
                    <path d="M-42,-8 L-20,-13 L-10,-6 L8,-15 L22,-5 L38,-12" stroke={PALETTE.warm} strokeWidth={2.8} fill="none" strokeLinecap="round" />
                    <path d="M-36,8 L-16,14 L-4,7 L12,15 L26,8 L42,13" stroke={PALETTE.warm} strokeWidth={2.8} fill="none" strokeLinecap="round" />
                    <circle cx={-24} cy={0} r={5} fill={PALETTE.warm} opacity={0.6} />
                </>
            )}
        </g>
    );

// ===== Scene 0: 根元のピロピロ =====
const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 16)} transform={`translate(0 ${-riseY(f, 0, 18, 20)})`}>
                <Label x={750} y={80} text="またアイツが死んだ" size={58} color={PALETTE.ink} />
                <Label x={750} y={128} text="充電ケーブル、根元からピロピロ現象" size={30} color={PALETTE.textDim} weight={500} />
            </g>
            <g opacity={fade(f, 20, 42)}>
                <BrokenCable x={750} y={340} scale={1.7} />
            </g>
            <g opacity={fade(f, 58, 76)}>
                <circle cx={710} cy={340} r={66} fill="none" stroke={PALETTE.warm} strokeWidth={4.5} strokeDasharray="6 6" />
                <Label x={710} y={456} text="いつも、ここから" size={30} color={PALETTE.warm} />
            </g>
            <g opacity={fade(f, 100, 118)}>
                <Label x={750} y={560} text="あなたも、やったことありますよね" size={30} color={PALETTE.primaryDeep} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 1: 家電コードとの対比 =====
const Scene1: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="不思議な事実" size={42} color={PALETTE.ink} />
                <Label x={750} y={110} text="どちらも、同じ「銅の電線」" size={22} color={PALETTE.textDim} weight={500} />
            </g>

            <g opacity={fade(f, 22, 44)}>
                <rect x={140} y={220} width={560} height={220} rx={20} fill={PALETTE.paper} stroke={PALETTE.mint} strokeWidth={2.5} />
                <Label x={420} y={270} text="家電のコード" size={28} color={PALETTE.mint} />
                <g transform="translate(220, 310)">
                    <path d="M0,40 L160,40 L160,80 L260,80 L260,40 L380,40" fill="none" stroke={PALETTE.ink} strokeWidth={8} strokeLinecap="round" />
                    <rect x={-10} y={30} width={30} height={20} rx={3} fill={PALETTE.ink} />
                </g>
                <Label x={420} y={415} text="何十年でも 現役" size={28} color={PALETTE.ink} />
            </g>

            <g opacity={fade(f, 52, 74)}>
                <rect x={800} y={220} width={560} height={220} rx={20} fill="#FEF3C7" stroke={PALETTE.warm} strokeWidth={2.5} />
                <Label x={1080} y={270} text="スマホの充電ケーブル" size={28} color={PALETTE.warm} />
                <g transform="translate(900, 330)">
                    <BrokenCable x={180} y={20} scale={1.1} />
                </g>
                <Label x={1080} y={415} text="1〜2年で だいたい死ぬ" size={28} color={PALETTE.ink} />
            </g>

            <g opacity={fade(f, 88, 108)}>
                <Label x={750} y={570} text="同じ銅線なのに、なぜこんなに違うのか?" size={30} color={PALETTE.primaryDeep} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 2: 今日の旅程 =====
const Scene2: React.FC<SceneProps> = ({ localFrame: f }) => {
    const Step: React.FC<{ n: number; title: string; sub: string; color: string; y: number; from: number }>
        = ({ n, title, sub, color, y, from }) => (
            <g opacity={fade(f, from, from + 14)} transform={`translate(${riseY(f, from, from + 14, 22)} ${y})`}>
                <circle cx={220} cy={44} r={46} fill={color} />
                <text x={220} y={60} fontSize={48} fill="#fff" textAnchor="middle" fontWeight={800}
                    fontFamily="'Noto Sans JP', sans-serif">{n}</text>
                <Label x={300} y={36} text={title} size={32} color={PALETTE.ink} align="start" />
                <Label x={300} y={74} text={sub} size={22} color={PALETTE.textDim} align="start" weight={500} />
            </g>
        );
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={70} text="今日、一緒に見ていくこと" size={42} color={PALETTE.ink} />
                </g>
                <Step n={1} title="なぜ毎回、根元なのか" sub="硬いと柔らかいの境目の話" color={PALETTE.primary} y={140} from={24} />
                <Step n={2} title="中の銅線は 疲れる" sub="針金ハンガーと同じ現象" color={PALETTE.copper} y={250} from={46} />
                <Step n={3} title="わざと先に壊れる側" sub="ちょっと意地悪な設計の話" color={PALETTE.plum} y={360} from={68} />
                <Step n={4} title="高いケーブルで解決?" sub="値段と耐久性のホントの関係" color={PALETTE.accent} y={470} from={90} />
            </svg>
        </Stage>
    );
};

// ===== Scene 3: 鉛筆を押すと =====
const Scene3: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="頭の中で実験、鉛筆を押す" size={42} color={PALETTE.ink} />
                <Label x={750} y={110} text="どこに一番、力がかかる?" size={22} color={PALETTE.textDim} weight={500} />
            </g>

            {/* 握っている手 */}
            <g opacity={fade(f, 22, 40)}>
                <ellipse cx={260} cy={360} rx={80} ry={110} fill="#FDE68A" stroke={PALETTE.ink} strokeWidth={2} />
                <Label x={260} y={490} text="ぎゅっと握る" size={22} color={PALETTE.ink} />
            </g>

            {/* 鉛筆 */}
            <g opacity={fade(f, 38, 58)}>
                <rect x={300} y={350} width={760} height={24} rx={3} fill="#FBBF24" stroke={PALETTE.ink} strokeWidth={2} />
                <polygon points="1060,362 1110,350 1110,374" fill={PALETTE.ink} />
            </g>

            {/* 押す力 */}
            <g opacity={fade(f, 62, 82)}>
                <path d="M1080,290 L1080,340 M1065,325 L1080,340 L1095,325" stroke={PALETTE.primary} strokeWidth={4} fill="none" />
                <Label x={1080} y={270} text="横に押す" size={24} color={PALETTE.primary} />
            </g>

            {/* 折れそうな位置 */}
            <g opacity={fade(f, 90, 112)}>
                <rect x={320} y={338} width={60} height={48} rx={8} fill="none" stroke={PALETTE.warm} strokeWidth={4} strokeDasharray="6 6" />
                <line x1={350} y1={386} x2={350} y2={440} stroke={PALETTE.warm} strokeWidth={3} />
                <Label x={350} y={470} text="ここが折れる" size={26} color={PALETTE.warm} />
            </g>

            <g opacity={fade(f, 120, 140)}>
                <Label x={750} y={580} text="押した先っぽ ではなく、握った側のすぐ横" size={28} color={PALETTE.primaryDeep} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 4: 硬いと柔らかいの境目 =====
const Scene4: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="今日のいちばん大事なこと" size={42} color={PALETTE.ink} />
            </g>

            <g opacity={fade(f, 22, 48)}>
                <rect x={200} y={180} width={1100} height={140} rx={24} fill="#FEF3C7" stroke={PALETTE.accent} strokeWidth={3} />
                <Label x={750} y={235} text="硬いところと 柔らかいところの" size={30} color={PALETTE.ink} />
                <Label x={750} y={285} text="境目に、曲げる力は ぜんぶ集まる" size={36} color={PALETTE.primaryDeep} />
            </g>

            {/* ケーブル断面の例示 */}
            <g opacity={fade(f, 60, 84)}>
                <defs>
                    <linearGradient id="stiff-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={PALETTE.ink} />
                        <stop offset="32%" stopColor={PALETTE.ink} />
                        <stop offset="40%" stopColor={PALETTE.warm} />
                        <stop offset="55%" stopColor={PALETTE.amber} />
                        <stop offset="100%" stopColor={PALETTE.paper} />
                    </linearGradient>
                </defs>
                <rect x={280} y={400} width={940} height={68} rx={12} fill="url(#stiff-grad)" stroke={PALETTE.line} strokeWidth={1.5} />
                <Label x={380} y={390} text="コネクタ" size={20} color={PALETTE.ink} />
                <Label x={380} y={498} text="硬い" size={20} color={PALETTE.ink} weight={500} />
                <Label x={1100} y={390} text="ケーブル本体" size={20} color={PALETTE.ink} />
                <Label x={1100} y={498} text="柔らかい" size={20} color={PALETTE.ink} weight={500} />
            </g>

            {/* 境目にハイライト */}
            <g opacity={fade(f, 92, 114)}>
                <rect x={540} y={392} width={72} height={84} rx={8} fill="none" stroke={PALETTE.warm} strokeWidth={4} strokeDasharray="6 6" />
                <Label x={576} y={554} text={`この境目が、"根元"`} size={26} color={PALETTE.warm} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 5: 黒いブーツの正体 =====
const Scene5: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="あの黒いゴム、なんのため?" size={42} color={PALETTE.ink} />
            </g>

            {/* 大きなコネクタの絵 */}
            <g opacity={fade(f, 20, 44)} transform="translate(200, 250)">
                <rect x={0} y={30} width={220} height={90} rx={8} fill={PALETTE.ink} />
                <rect x={220} y={55} width={40} height={40} rx={4} fill="#9CA3AF" />
                {/* ストレインリリーフ */}
                <path d="M258,55 Q300,40 360,50 L360,100 Q300,110 258,95 Z" fill={PALETTE.ink} opacity={0.7} />
                {/* ケーブル */}
                <rect x={360} y={65} width={720} height={20} rx={10} fill="#E5E7EB" stroke="#9CA3AF" strokeWidth={1.5} />
                <Label x={110} y={160} text="コネクタ" size={20} color={PALETTE.ink} />
                <Label x={310} y={160} text="黒いゴム" size={22} color={PALETTE.warm} />
                <Label x={720} y={50} text="ケーブル本体" size={20} color={PALETTE.ink} />
            </g>

            {/* 応力集中は少しだけ右にシフト */}
            <g opacity={fade(f, 58, 80)} transform="translate(200, 250)">
                <line x1={258} y1={135} x2={258} y2={175} stroke={PALETTE.line} strokeWidth={2} strokeDasharray="3 3" />
                <line x1={370} y1={135} x2={370} y2={175} stroke={PALETTE.warm} strokeWidth={3} />
                <Label x={258} y={200} text="本当はここに集中" size={18} color={PALETTE.textDim} />
                <Label x={370} y={220} text="↓ ほんの数mm外側へずらした" size={18} color={PALETTE.warm} />
            </g>

            <g opacity={fade(f, 92, 118)}>
                <Label x={750} y={530} text={`"集中"は消せない。ずらせるだけ`} size={32} color={PALETTE.primaryDeep} />
                <Label x={750} y={580} text="結局、ケーブルは 近くで壊れる" size={22} color={PALETTE.textDim} weight={500} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 6: 針金ハンガー =====
const Scene6: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="次は、中の銅線の話" size={42} color={PALETTE.ink} />
                <Label x={750} y={110} text="思い浮かべて:針金ハンガー" size={22} color={PALETTE.textDim} weight={500} />
            </g>

            {/* ハンガーの3段階 */}
            <g opacity={fade(f, 20, 40)} transform="translate(140, 240)">
                <path d="M100,180 L180,80 L260,180 L260,200" fill="none" stroke={PALETTE.ink} strokeWidth={5} />
                <path d="M170,75 Q180,65 190,75" fill="none" stroke={PALETTE.ink} strokeWidth={4} />
                <Label x={180} y={280} text="① 少し曲げる" size={22} color={PALETTE.mint} />
                <Label x={180} y={312} text="→ 元に戻る" size={18} color={PALETTE.textDim} weight={500} />
            </g>

            <g opacity={fade(f, 42, 60)} transform="translate(540, 240)">
                <path d="M100,180 L150,60 L230,200 L260,210" fill="none" stroke={PALETTE.accent} strokeWidth={5} />
                <path d="M140,55 Q150,45 160,55" fill="none" stroke={PALETTE.accent} strokeWidth={4} />
                <Label x={180} y={280} text="② 繰り返す" size={22} color={PALETTE.accent} />
                <Label x={180} y={312} text="→ だんだん硬くなる" size={18} color={PALETTE.textDim} weight={500} />
            </g>

            <g opacity={fade(f, 66, 86)} transform="translate(940, 240)">
                <path d="M100,180 L140,80 L165,105" fill="none" stroke={PALETTE.warm} strokeWidth={5} />
                <path d="M130,75 Q140,65 150,75" fill="none" stroke={PALETTE.warm} strokeWidth={4} />
                <path d="M180,118 L260,200 L280,210" fill="none" stroke={PALETTE.warm} strokeWidth={5} />
                <circle cx={173} cy={111} r={8} fill={PALETTE.warm} />
                <Label x={190} y={280} text="③ 3〜4回で" size={22} color={PALETTE.warm} />
                <Label x={190} y={312} text="→ ポキっと折れる" size={18} color={PALETTE.warm} weight={500} />
            </g>

            <g opacity={fade(f, 108, 128)}>
                <Label x={750} y={586} text="1回では壊れないのに、続けるといつか折れる" size={28} color={PALETTE.primaryDeep} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 7: 中で起きていること =====
const Scene7: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="中では何が起きている?" size={42} color={PALETTE.ink} />
            </g>

            {/* 3ステップ */}
            <g opacity={fade(f, 20, 40)} transform="translate(0, 180)">
                <rect x={120} y={0} width={380} height={280} rx={20} fill={PALETTE.paper} stroke={PALETTE.primary} strokeWidth={2.5} />
                <Label x={310} y={56} text="曲げるたびに" size={22} color={PALETTE.primary} />
                {/* 小さなズレ */}
                <g transform="translate(200, 100)">
                    {[0, 1, 2, 3, 4].map(i => (
                        <rect key={i} x={i * 30} y={10} width={22} height={30} rx={2} fill={PALETTE.primary} opacity={0.5} />
                    ))}
                </g>
                <Label x={310} y={200} text="小さなズレが 溜まる" size={26} color={PALETTE.ink} />
                <Label x={310} y={240} text="(目には見えないサイズ)" size={16} color={PALETTE.textDim} weight={500} />
            </g>

            <g opacity={fade(f, 50, 70)} transform="translate(510, 180)">
                <rect x={120} y={0} width={380} height={280} rx={20} fill={PALETTE.paper} stroke={PALETTE.accent} strokeWidth={2.5} />
                <Label x={310} y={56} text="ズレが集まると" size={22} color={PALETTE.accent} />
                {/* ヒビ */}
                <g transform="translate(160, 120)">
                    <rect x={0} y={0} width={300} height={50} rx={6} fill="#FDE68A" stroke={PALETTE.accent} strokeWidth={2} />
                    <path d="M50,0 L70,30 L40,50" fill="none" stroke={PALETTE.warm} strokeWidth={3} />
                    <path d="M180,0 L165,25 L195,50" fill="none" stroke={PALETTE.warm} strokeWidth={3} />
                </g>
                <Label x={310} y={220} text="小さなヒビ になる" size={26} color={PALETTE.ink} />
            </g>

            <g opacity={fade(f, 80, 100)} transform="translate(1020, 180)">
                <rect x={120} y={0} width={380} height={280} rx={20} fill="#FEE2E2" stroke={PALETTE.warm} strokeWidth={2.5} />
                <Label x={310} y={56} text="ヒビが育って" size={22} color={PALETTE.warm} />
                <g transform="translate(160, 120)">
                    <rect x={0} y={0} width={140} height={50} rx={6} fill="#FCA5A5" stroke={PALETTE.warm} strokeWidth={2} />
                    <Label x={155} y={32} text="プツン" size={20} color={PALETTE.warm} />
                    <rect x={170} y={0} width={130} height={50} rx={6} fill="#FCA5A5" stroke={PALETTE.warm} strokeWidth={2} />
                </g>
                <Label x={310} y={220} text="ある日、プツンと切れる" size={26} color={PALETTE.ink} />
            </g>

            <g opacity={fade(f, 108, 128)}>
                <Label x={750} y={600} text={`見た目は普通のまま。中身に"借金"がじわじわ溜まる`} size={26} color={PALETTE.primaryDeep} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 8: 強く曲げる＝寿命激減 =====
const Scene8: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="ちょっと強く曲げると、どんと減る" size={42} color={PALETTE.ink} />
            </g>

            {/* 左: ゆるい輪 */}
            <g opacity={fade(f, 22, 44)}>
                <path d="M180,260 Q320,200 460,260 T740,260" fill="none" stroke={PALETTE.mint} strokeWidth={16} strokeLinecap="round" />
                <Label x={460} y={210} text="ゆる〜く 大きな輪" size={24} color={PALETTE.mint} />
                <Label x={460} y={340} text="→ 何千回でも 余裕" size={28} color={PALETTE.ink} />
            </g>

            {/* 中央: 区切り */}
            <g opacity={fade(f, 46, 60)}>
                <line x1={750} y1={180} x2={750} y2={360} stroke={PALETTE.line} strokeWidth={2} strokeDasharray="4 8" />
            </g>

            {/* 右: 90度 */}
            <g opacity={fade(f, 62, 84)}>
                <path d="M830,260 L1060,260 L1060,320 L1060,360" fill="none" stroke={PALETTE.warm} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={1060} cy={290} r={22} fill={PALETTE.warm} opacity={0.25} />
                <Label x={1060} y={210} text="ぎゅっと 直角にカクン" size={24} color={PALETTE.warm} />
                <Label x={1060} y={400} text="→ 数回で 即死" size={28} color={PALETTE.warm} />
            </g>

            {/* 下部: 視聴者のNG行動 */}
            <g opacity={fade(f, 94, 118)}>
                <rect x={200} y={460} width={1100} height={120} rx={16} fill="#FEF3C7" stroke={PALETTE.accent} strokeWidth={2} />
                <Label x={750} y={498} text="NG行動 (あなたも、やってませんか?)" size={22} color={PALETTE.accent} />
                <Label x={460} y={548} text="ポケットで小さく丸める" size={20} color={PALETTE.ink} />
                <Label x={1040} y={548} text="椅子の脚で折れたまま一晩充電" size={20} color={PALETTE.ink} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 9: どちらを壊すべきか =====
const Scene9: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="いじわるな問いかけ" size={42} color={PALETTE.ink} />
                <Label x={750} y={112} text="どちらかが先に壊れるとしたら?" size={22} color={PALETTE.textDim} weight={500} />
            </g>

            <g opacity={fade(f, 22, 44)}>
                <rect x={150} y={210} width={520} height={240} rx={20} fill={PALETTE.primaryDeep} />
                <Label x={410} y={260} text="スマホ本体" size={24} color="#fff" weight={500} />
                <Label x={410} y={320} text="高い" size={34} color="#fff" />
                <Label x={410} y={360} text="中に大事なデータ" size={20} color="#CBD5E1" weight={500} />
                <Label x={410} y={390} text="防水で開けられない" size={20} color="#CBD5E1" weight={500} />
                <Label x={410} y={420} text="修理も難しい" size={20} color="#CBD5E1" weight={500} />
            </g>

            <g opacity={fade(f, 54, 76)}>
                <rect x={830} y={210} width={520} height={240} rx={20} fill={PALETTE.accent} />
                <Label x={1090} y={260} text="ケーブル" size={24} color="#fff" weight={500} />
                <Label x={1090} y={320} text="安い" size={34} color="#fff" />
                <Label x={1090} y={360} text="コンビニでも買える" size={20} color="#FEF3C7" weight={500} />
                <Label x={1090} y={390} text="差し替えるだけ" size={20} color="#FEF3C7" weight={500} />
                <Label x={1090} y={420} text="データも入っていない" size={20} color="#FEF3C7" weight={500} />
            </g>

            <g opacity={fade(f, 84, 108)}>
                <Label x={750} y={530} text="どちらが壊れたほうが、みんな幸せですか?" size={26} color={PALETTE.ink} />
                <Label x={750} y={578} text="メーカーも、同じ答えにたどり着きましたの" size={24} color={PALETTE.primaryDeep} weight={500} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 10: 消しゴム付き鉛筆 =====
const Scene10: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="先に減る担当、という考え方" size={42} color={PALETTE.ink} />
            </g>

            {/* 消しゴム付き鉛筆 */}
            <g opacity={fade(f, 22, 46)} transform="translate(0, 210)">
                <Label x={750} y={0} text="たとえば、消しゴム付き鉛筆" size={26} color={PALETTE.textDim} />
                {/* 鉛筆本体 */}
                <rect x={280} y={60} width={700} height={60} rx={6} fill={PALETTE.amber} stroke={PALETTE.ink} strokeWidth={2} />
                {/* フェルール (金色) */}
                <rect x={980} y={60} width={60} height={60} fill="#D4AF37" stroke={PALETTE.ink} strokeWidth={2} />
                {/* 消しゴム (ピンク) */}
                <rect x={1040} y={60} width={140} height={60} rx={6} fill="#F9A8D4" stroke={PALETTE.ink} strokeWidth={2} />
                {/* 鉛筆先端 */}
                <polygon points="280,90 220,60 220,120" fill={PALETTE.ink} />
                <Label x={630} y={170} text="本体(鉛筆)" size={22} color={PALETTE.ink} weight={500} />
                <Label x={1110} y={170} text="消しゴム" size={22} color="#D946EF" weight={500} />
            </g>

            <g opacity={fade(f, 58, 80)}>
                <Label x={750} y={450} text={`消しゴムが"先に"ちびていく`} size={28} color={PALETTE.ink} />
                <Label x={750} y={490} text={`悪いのではない。"先に減る担当"として作られている`} size={22} color={PALETTE.primary} weight={500} />
            </g>

            <g opacity={fade(f, 92, 116)}>
                <Label x={750} y={568} text={`充電ケーブルも、本体を守るための"消しゴム役"`} size={28} color={PALETTE.primaryDeep} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 11: 中のバネの位置 =====
const Scene11: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text={`バネの"引っ越し"`} size={42} color={PALETTE.ink} />
                <Label x={750} y={110} text="へたる担当を、本体から ケーブルへ" size={22} color={PALETTE.textDim} weight={500} />
            </g>

            {/* 昔 */}
            <g opacity={fade(f, 22, 44)}>
                <Label x={410} y={200} text="昔" size={28} color={PALETTE.textDim} />
                {/* 本体 */}
                <rect x={200} y={240} width={260} height={110} rx={10} fill={PALETTE.primaryDeep} />
                <rect x={440} y={270} width={50} height={50} rx={4} fill="#fff" />
                {/* バネ (本体側) */}
                <path d="M450,295 L470,290 L480,295 L470,300 Z" fill={PALETTE.warm} />
                <Label x={320} y={320} text="本体" size={20} color="#fff" weight={500} />
                {/* プラグ (バネなし) */}
                <rect x={520} y={270} width={110} height={50} rx={6} fill="#9CA3AF" />
                <rect x={630} y={282} width={26} height={26} fill="#6B7280" />
                <Label x={420} y={404} text="バネは本体の中" size={20} color={PALETTE.warm} />
            </g>

            {/* 矢印 */}
            <g opacity={fade(f, 52, 68)}>
                <path d="M680,300 L820,300 M800,285 L820,300 L800,315" stroke={PALETTE.plum} strokeWidth={4} fill="none" />
                <Label x={750} y={280} text="引っ越し" size={18} color={PALETTE.plum} />
            </g>

            {/* 今 */}
            <g opacity={fade(f, 72, 94)}>
                <Label x={1080} y={200} text="今" size={28} color={PALETTE.primary} />
                {/* 本体 */}
                <rect x={870} y={240} width={260} height={110} rx={10} fill={PALETTE.primaryDeep} />
                <rect x={1110} y={270} width={50} height={50} rx={4} fill="#fff" />
                <Label x={990} y={320} text="本体" size={20} color="#fff" weight={500} />
                {/* プラグ (バネあり) */}
                <rect x={1190} y={270} width={110} height={50} rx={6} fill={PALETTE.accent} />
                <path d="M1200,295 L1220,290 L1230,295 L1220,300 Z" fill={PALETTE.warm} />
                <rect x={1300} y={282} width={26} height={26} fill="#78350F" />
                <Label x={1090} y={404} text="バネは ケーブル側へ" size={20} color={PALETTE.warm} />
            </g>

            <g opacity={fade(f, 100, 124)}>
                <Label x={750} y={538} text={`本体を長生きさせるために、ケーブル側が"身代わり"`} size={28} color={PALETTE.plum} />
                <Label x={750} y={582} text={`陰謀ではなく、"一番合理的な役割分担"ですの`} size={22} color={PALETTE.textDim} weight={500} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 12: 純正でも根元で切れる =====
const Scene12: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="高いケーブルなら解決する?" size={42} color={PALETTE.ink} />
            </g>

            <g opacity={fade(f, 22, 44)}>
                <rect x={150} y={200} width={500} height={250} rx={18} fill={PALETTE.paper} stroke={PALETTE.line} strokeWidth={2} />
                <Label x={400} y={250} text="純正の 高級ケーブル" size={24} color={PALETTE.ink} />
                <BrokenCable x={400} y={340} scale={1.35} />
                <Label x={400} y={420} text="根元が ピロピロ" size={24} color={PALETTE.warm} />
            </g>

            <g opacity={fade(f, 50, 72)}>
                <rect x={850} y={200} width={500} height={250} rx={18} fill={PALETTE.paper} stroke={PALETTE.line} strokeWidth={2} />
                <Label x={1100} y={250} text="ノーブランドの 格安" size={24} color={PALETTE.ink} />
                <BrokenCable x={1100} y={340} scale={1.35} />
                <Label x={1100} y={420} text="根元が ピロピロ" size={24} color={PALETTE.warm} />
            </g>

            <g opacity={fade(f, 78, 96)}>
                <Label x={750} y={330} text="≈" size={82} color={PALETTE.primary} weight={900} />
            </g>

            <g opacity={fade(f, 104, 128)}>
                <Label x={750} y={530} text="物理のルールは、ブランドを見ない" size={30} color={PALETTE.primaryDeep} />
                <Label x={750} y={580} text="値札を見て、応力が手加減してくれることはない" size={22} color={PALETTE.textDim} weight={500} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 13: 変わるのは回数 =====
const Scene13: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="値段で 変わるのは" size={42} color={PALETTE.ink} />
            </g>

            {/* 2つのバー比較 */}
            <g opacity={fade(f, 22, 44)} transform="translate(220, 210)">
                <Label x={0} y={40} text="安いケーブル" size={22} color={PALETTE.textDim} align="start" />
                <rect x={0} y={60} width={280} height={50} rx={8} fill={PALETTE.textDim} />
                <Label x={300} y={95} text="× 少ない回数で 死ぬ" size={20} color={PALETTE.ink} align="start" />
            </g>

            <g opacity={fade(f, 52, 74)} transform="translate(220, 310)">
                <Label x={0} y={40} text="高いケーブル (編組など)" size={22} color={PALETTE.primary} align="start" />
                <rect x={0} y={60} width={880} height={50} rx={8} fill={PALETTE.primary} />
                <Label x={900} y={95} text="× 何倍か 長持ちする" size={20} color={PALETTE.ink} align="start" />
            </g>

            {/* 結論カード */}
            <g opacity={fade(f, 80, 104)}>
                <rect x={280} y={450} width={940} height={100} rx={16} fill="#FEF3C7" stroke={PALETTE.accent} strokeWidth={2} />
                <Label x={750} y={492} text="場所 は変えられない" size={24} color={PALETTE.textDim} />
                <Label x={750} y={532} text="回数 は 変えられる" size={28} color={PALETTE.primaryDeep} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 14: 4つを全部はできない =====
const Scene14: React.FC<SceneProps> = ({ localFrame: f }) => {
    const items = [
        { t: '耐久性', color: PALETTE.warm, from: 22 },
        { t: '薄さ・軽さ', color: PALETTE.primary, from: 42 },
        { t: '安さ', color: PALETTE.accent, from: 62 },
        { t: '汎用性', color: PALETTE.plum, from: 82 },
    ];
    return (
        <Stage>
            <svg viewBox="0 0 1500 640" width="100%" height="100%">
                <g opacity={fade(f, 0, 14)}>
                    <Label x={750} y={70} text="もし、ぜんぶ欲しかったら?" size={42} color={PALETTE.ink} />
                </g>

                {items.map((it, i) => {
                    const col = i % 2;
                    const row = Math.floor(i / 2);
                    const x = 320 + col * 480;
                    const y = 160 + row * 150;
                    return (
                        <g key={i} opacity={fade(f, it.from, it.from + 14)} transform={`translate(${riseY(f, it.from, it.from + 14, 18)} 0)`}>
                            <rect x={x} y={y} width={380} height={110} rx={16} fill={PALETTE.paper} stroke={it.color} strokeWidth={2.5} />
                            <Label x={x + 190} y={y + 68} text={it.t} size={36} color={it.color} />
                        </g>
                    );
                })}

                <g opacity={fade(f, 104, 128)}>
                    <Label x={750} y={520} text="この4つを 全部いっぺんに" size={28} color={PALETTE.textDim} />
                    <Label x={750} y={568} text="最高レベルにすることは できない" size={34} color={PALETTE.warm} />
                </g>
            </svg>
        </Stage>
    );
};

// ===== Scene 15: 選んだ結果 =====
const Scene15: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="いま、私たちが選んでいる答え" size={42} color={PALETTE.ink} />
            </g>

            {/* 取ったもの */}
            <g opacity={fade(f, 22, 46)}>
                <rect x={150} y={200} width={540} height={240} rx={20} fill="#DCFCE7" stroke={PALETTE.mint} strokeWidth={2.5} />
                <Label x={420} y={250} text="取ったもの" size={24} color={PALETTE.mint} />
                <Label x={420} y={310} text="薄さ ・ 軽さ" size={28} color={PALETTE.ink} />
                <Label x={420} y={360} text="安さ" size={28} color={PALETTE.ink} />
                <Label x={420} y={410} text="汎用性" size={28} color={PALETTE.ink} />
            </g>

            {/* 諦めたもの */}
            <g opacity={fade(f, 54, 78)}>
                <rect x={810} y={200} width={540} height={240} rx={20} fill="#FEE2E2" stroke={PALETTE.warm} strokeWidth={2.5} />
                <Label x={1080} y={250} text="諦めたもの" size={24} color={PALETTE.warm} />
                <Label x={1080} y={340} text="耐久性" size={60} color={PALETTE.warm} />
            </g>

            <g opacity={fade(f, 84, 108)}>
                <Label x={750} y={530} text="だから、ぼくらの ケーブルは 1年で死ぬ" size={26} color={PALETTE.ink} />
                <Label x={750} y={580} text="そしてその代わり、コンビニで すぐ買い直せる" size={22} color={PALETTE.primaryDeep} weight={500} />
            </g>
        </svg>
    </Stage>
);

// ===== Scene 16: 選び方の視点 =====
const Scene16: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        <svg viewBox="0 0 1500 640" width="100%" height="100%">
            <g opacity={fade(f, 0, 14)}>
                <Label x={750} y={70} text="次、ケーブルを買うときの 見方" size={42} color={PALETTE.ink} />
            </g>

            {/* before */}
            <g opacity={fade(f, 22, 44)}>
                <rect x={150} y={200} width={520} height={220} rx={18} fill="#FEE2E2" stroke={PALETTE.warm} strokeWidth={2} />
                <Label x={410} y={250} text="これまで" size={22} color={PALETTE.warm} />
                <Label x={410} y={310} text="「安いから壊れた」" size={24} color={PALETTE.ink} weight={500} />
                <Label x={410} y={350} text="「高かったのに壊れた」" size={24} color={PALETTE.ink} weight={500} />
                <Label x={410} y={395} text="→ 値段に一喜一憂" size={18} color={PALETTE.textDim} weight={500} />
            </g>

            {/* after */}
            <g opacity={fade(f, 52, 76)}>
                <rect x={830} y={200} width={520} height={220} rx={18} fill="#DCFCE7" stroke={PALETTE.mint} strokeWidth={2} />
                <Label x={1090} y={250} text="これから" size={22} color={PALETTE.mint} />
                <Label x={1090} y={305} text="どれを取って、" size={24} color={PALETTE.ink} weight={500} />
                <Label x={1090} y={340} text="どれを 諦めた?" size={24} color={PALETTE.ink} weight={500} />
                <Label x={1090} y={395} text="→ 立体的に見える" size={18} color={PALETTE.textDim} weight={500} />
            </g>

            <g opacity={fade(f, 86, 112)}>
                <Label x={750} y={512} text="また 根元がピロピロしても" size={26} color={PALETTE.ink} />
                <Label x={750} y={558} text="「今日もじわじわ、銅線が疲れてるんだな」と見守れる" size={24} color={PALETTE.primaryDeep} weight={500} />
            </g>

            <g opacity={fade(f, 126, 150)}>
                <Label x={750} y={612} text="またね" size={28} color={PALETTE.plum} />
            </g>
        </svg>
    </Stage>
);

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [
    Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8,
    Scene9, Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16,
];

export const SCENE_TITLES: string[] = [
    '根元のピロピロ', '家電コードとの対比', '今日の旅程',
    '鉛筆を押すと', '硬いと柔らかいの境目', '黒いブーツの正体',
    '針金ハンガー', '中で起きていること', '強く曲げる＝寿命激減',
    'どちらを壊すべきか', '消しゴム付き鉛筆', '中のバネの位置',
    '純正でも根元で切れる', '変わるのは回数', '4つは全部できない',
    '選んだ結果', '選び方の視点',
];
