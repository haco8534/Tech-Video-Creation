import { AbsoluteFill, Audio, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadZenMaru } from '@remotion/google-fonts/ZenMaruGothic';
import { SCRIPT, type Speaker } from './scriptData';
import { AUDIO, VOICE_SRC, LINE_STARTS, TOTAL_FRAMES as AUDIO_TOTAL } from './audioData';

// 見出し・字幕の書体は Zen Maru Gothic
const { fontFamily: ZEN_MARU } = loadZenMaru();

// ============================================================
// タイミング — 行開始フレーム・総尺・口パクは音声生成時に確定（audioData.ts）
// ============================================================

const lineStarts = LINE_STARTS;
export const TOTAL_FRAMES = AUDIO_TOTAL;

const eventFrame = (name: string): number => {
    const i = SCRIPT.findIndex((l) => l.event === name);
    if (i < 0) throw new Error(`unknown event: ${name}`);
    return lineStarts[i];
};
const E = eventFrame;

// ============================================================
// トラック補間
// ============================================================

type Keyframe<S> = { f: number; state: S };
type Track<S> = Keyframe<S>[];

const ease = Easing.bezier(0.4, 0, 0.2, 1);

const blendNumeric = <S,>(a: S, b: S, t: number): S => {
    const aR = a as unknown as Record<string, number>;
    const bR = b as unknown as Record<string, number>;
    const out: Record<string, number> = {};
    for (const k in aR) out[k] = aR[k] + (bR[k] - aR[k]) * t;
    return out as unknown as S;
};

const resolve = <S,>(track: Track<S>, f: number): S => {
    if (f <= track[0].f) return track[0].state;
    for (let i = 0; i < track.length - 1; i++) {
        const a = track[i],
            b = track[i + 1];
        if (f >= a.f && f <= b.f) {
            const t = ease((f - a.f) / Math.max(1, b.f - a.f));
            return blendNumeric(a.state, b.state, t);
        }
    }
    return track[track.length - 1].state;
};

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

// ============================================================
// 視覚語彙 — この題材専用
// ============================================================

const BG = '#f5f7fa';
const INK = '#243044';
const MUTED = '#8a94a6';
const CHIP_FILL = '#ffffff';
const CHIP_STROKE = '#c5cedb';
const ACCENT = '#e8590c'; // 予測スロット・候補
const ACCENT_SOFT = '#ffe8d9';
const MAP_C = '#0ca678'; // 地図（圧縮されたパターン）
const MAP_SOFT = '#d3f4ea';
const ARC_PRON = '#4263eb'; // 代名詞の線
const ARC_GRAM = '#f08c00'; // 文法の線
const ARC_TOPIC = '#12b886'; // 話題の線
const RED = '#e03131';
const FONT = '"Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", sans-serif';

// ============================================================
// 画面切替 — scene.X.in イベントで 30f クロスフェード
// ============================================================

const SCENES = ['intro', 'deep', 'tokens', 'attention', 'icl', 'hallucination', 'outro'] as const;
const SCENE_TITLES = [
    '次の言葉を当てるだけ？',
    '「次を当てる」は深い課題',
    '文章はトークンに切られる',
    'Attention —— どこを見るか',
    '例を見せると、ルールに乗る',
    '間違いも、自然になる',
    '地図と、現地',
];
const FADE = 30;

const sceneStart = (i: number): number => (i === 0 ? 0 : E(`scene.${SCENES[i]}.in`));

const sceneVis = (f: number, i: number): number => {
    const s = sceneStart(i);
    const inOp = i === 0 ? 1 : clamp01((f - s) / FADE);
    if (i === SCENES.length - 1) return inOp;
    const n = sceneStart(i + 1);
    return Math.min(inOp, 1 - clamp01((f - n) / FADE));
};

// ============================================================
// 共通装置 — トークンチップ／帯
// ============================================================

const CHIP_H = 88;
const CHIP_FS = 42;
const CHIP_GAP = 12;

const chipW = (t: string, fs: number = CHIP_FS): number =>
    Math.round(t.length * fs * 1.02 + 46);

type ChipProps = {
    x: number; // 左端
    y: number; // 中心
    w: number;
    t: string;
    op?: number;
    sc?: number;
    fill?: string;
    stroke?: string;
    tc?: string;
    fs?: number;
    h?: number;
    dash?: boolean;
    sw?: number;
};

const Chip: React.FC<ChipProps> = ({
    x, y, w, t, op = 1, sc = 1, fill = CHIP_FILL, stroke = CHIP_STROKE,
    tc = INK, fs = CHIP_FS, h = CHIP_H, dash = false, sw = 3,
}) => {
    if (op <= 0.005) return null;
    const cx = x + w / 2;
    return (
        <g opacity={op} transform={`translate(${cx} ${y}) scale(${sc})`}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16}
                fill={fill} stroke={stroke} strokeWidth={sw}
                strokeDasharray={dash ? '10 8' : undefined} />
            <text x={0} y={fs * 0.36} textAnchor="middle" fontSize={fs}
                fontWeight={700} fill={tc}>{t}</text>
        </g>
    );
};

// 帯：texts のうち filled 個（連続値）が見えていて、その先に予測スロットが付く
type StripProps = {
    texts: string[];
    cx: number; // 帯全体の中心 x（filled が全部のときの中心）
    y: number;
    filled: number;
    slotFill?: string; // スロットに入る語
    slotProg?: number; // 0=空 1=確定
    slotPulse?: number; // 0..1 強調リング
    op?: number;
    fs?: number;
};

const stripGeom = (texts: string[], fs: number) => {
    const ws = texts.map((t) => chipW(t, fs));
    const slotW = Math.max(150, fs * 2.6);
    const total = ws.reduce((a, b) => a + b, 0) + ws.length * CHIP_GAP + slotW;
    return { ws, slotW, total };
};

const TokenStrip: React.FC<StripProps> = ({
    texts, cx, y, filled, slotFill, slotProg = 0, slotPulse = 0, op = 1, fs = CHIP_FS,
}) => {
    if (op <= 0.005) return null;
    const { ws, slotW, total } = stripGeom(texts, fs);
    const x0 = cx - total / 2;
    let x = x0;
    const nodes: React.ReactNode[] = [];
    for (let i = 0; i < texts.length; i++) {
        const p = clamp01(filled - i);
        if (p > 0) {
            nodes.push(
                <Chip key={i} x={x} y={y} w={ws[i]} t={texts[i]} fs={fs}
                    op={p} sc={0.7 + 0.3 * p} />,
            );
        }
        x += (ws[i] + CHIP_GAP) * p;
    }
    const slotH = CHIP_H * (fs / CHIP_FS);
    // スロット
    nodes.push(
        <g key="slot">
            <rect x={x} y={y - slotH / 2} width={slotW} height={slotH} rx={16}
                fill={slotProg > 0.5 ? ACCENT_SOFT : '#ffffff'}
                stroke={ACCENT} strokeWidth={3.5}
                strokeDasharray={slotProg >= 1 ? undefined : '10 8'} />
            {slotFill && slotProg > 0 && (
                <text x={x + slotW / 2} y={y + fs * 0.36} textAnchor="middle"
                    fontSize={fs} fontWeight={700} fill={ACCENT}
                    opacity={slotProg}>{slotFill}</text>
            )}
            {slotPulse > 0 && slotPulse < 1 && (
                <rect x={x - 14 * slotPulse} y={y - slotH / 2 - 14 * slotPulse}
                    width={slotW + 28 * slotPulse} height={slotH + 28 * slotPulse}
                    rx={20} fill="none" stroke={ACCENT} strokeWidth={3}
                    opacity={0.7 * (1 - slotPulse)} />
            )}
        </g>,
    );
    return <g opacity={op}>{nodes}</g>;
};

// スロット位置（中心 x, y）を外から知るためのヘルパ
const slotCenter = (texts: string[], cx: number, filled: number, fs: number = CHIP_FS) => {
    const { ws, slotW, total } = stripGeom(texts, fs);
    let x = cx - total / 2;
    for (let i = 0; i < texts.length; i++) x += (ws[i] + CHIP_GAP) * clamp01(filled - i);
    return { x: x + slotW / 2, w: slotW };
};

// 線の描き起こし（dasharray 方式）
const DrawPath: React.FC<{
    d: string; prog: number; stroke: string; sw: number; len: number;
    op?: number; dashed?: boolean;
}> = ({ d, prog, stroke, sw, len, op = 1, dashed = false }) => {
    if (op <= 0.005 || prog <= 0.005) return null;
    return (
        <path d={d} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round"
            opacity={op}
            strokeDasharray={dashed ? `14 12` : `${len}`}
            strokeDashoffset={dashed ? undefined : len * (1 - prog)} />
    );
};

// 見出し — ピンク枠の白ピル（HTML オーバーレイ。縁取り文字は CSS）
const HEADER_ACCENT = '#ff4281';

const Header: React.FC<{ title: string; opacity: number; slide: number }> = ({
    title, opacity, slide,
}) => (
    <div style={{
        position: 'absolute', top: 40, left: 40, zIndex: 10,
        transform: `translateY(${slide}px)`, opacity,
        fontSize: 36, fontWeight: 900, color: '#ffffff',
        WebkitTextStroke: `5px ${HEADER_ACCENT}`, paintOrder: 'stroke fill',
        letterSpacing: 2, fontFamily: ZEN_MARU,
        backgroundColor: '#ffffff', border: `5px solid ${HEADER_ACCENT}`,
        borderRadius: 20, padding: '6px 32px',
        boxShadow: '0 8px 32px rgba(17, 24, 39, 0.18)',
        maxWidth: 'calc(100% - 80px)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    }}>
        {title}
    </div>
);

// ============================================================
// 画面 1: intro — 空きスロット付きの文の帯
// ============================================================

const S1_TEXTS = ['LLMは', '次の', '言葉を', '予測', 'して', 'いる', 'だけ'];
const S1_CX = 0;
const S1_Y = -40;

const s1Filled: Track<{ filled: number }> = [
    { f: 0, state: { filled: 0 } },
    { f: 40, state: { filled: 3 } },
    { f: E('strip.fill') + 30, state: { filled: 3 } },
    { f: E('strip.fill') + 50, state: { filled: 4 } },
    { f: E('strip.chain'), state: { filled: 4 } },
    { f: E('strip.chain') + 80, state: { filled: 7 } },
];

// 候補チップ：op / drop（選ばれた候補がスロットへ降りる）
const s1Cands: Track<{ op: number; drop: number }> = [
    { f: E('strip.fill'), state: { op: 0, drop: 0 } },
    { f: E('strip.fill') + 20, state: { op: 1, drop: 0 } },
    { f: E('strip.fill') + 30, state: { op: 1, drop: 0 } },
    { f: E('strip.fill') + 50, state: { op: 0, drop: 1 } },
];

const s1Q: Track<{ op: number; ring: number }> = [
    { f: E('strip.question'), state: { op: 0, ring: 0 } },
    { f: E('strip.question') + 24, state: { op: 1, ring: 0 } },
    { f: E('strip.question') + 54, state: { op: 1, ring: 1 } },
];

// 候補（語と相対確率の太さ）
const CANDS_1: { t: string; w: number }[] = [
    { t: '予測', w: 1 },
    { t: '生成', w: 0.55 },
    { t: '翻訳', w: 0.3 },
];

const Candidates: React.FC<{
    sx: number; sy: number; op: number; drop: number;
    cands: { t: string; w: number }[]; fs?: number;
}> = ({ sx, sy, op, drop, cands, fs = 38 }) => {
    if (op <= 0.005 && drop <= 0.005) return null;
    const rowY = sy - 150;
    const ws = cands.map((c) => chipW(c.t, fs));
    const total = ws.reduce((a, b) => a + b, 0) + (cands.length - 1) * 14;
    let x = sx - total / 2;
    const nodes: React.ReactNode[] = [];
    for (let i = 0; i < cands.length; i++) {
        const isTop = i === 0;
        const cy = isTop ? rowY + (sy - rowY) * drop : rowY;
        const o = isTop ? Math.max(op, 1 - drop) * (drop >= 1 ? 0 : 1) : op;
        nodes.push(
            <g key={i} opacity={o}>
                <Chip x={x} y={cy} w={ws[i]} t={cands[i].t} fs={fs} h={70}
                    fill={isTop ? ACCENT_SOFT : CHIP_FILL}
                    stroke={isTop ? ACCENT : CHIP_STROKE}
                    tc={isTop ? ACCENT : MUTED} />
                <rect x={x + 8} y={cy + 40} width={(ws[i] - 16) * cands[i].w} height={8}
                    rx={4} fill={isTop ? ACCENT : CHIP_STROKE} />
            </g>,
        );
        x += ws[i] + 14;
    }
    return <>{nodes}</>;
};

const SceneIntro: React.FC<{ f: number }> = ({ f }) => {
    const { filled } = resolve(s1Filled, f);
    const cand = resolve(s1Cands, f);
    const q = resolve(s1Q, f);
    const slot = slotCenter(S1_TEXTS, S1_CX, filled);
    return (
        <>
            <TokenStrip texts={S1_TEXTS} cx={S1_CX} y={S1_Y} filled={filled} />
            <Candidates sx={slot.x} sy={S1_Y} op={cand.op} drop={cand.drop} cands={CANDS_1} />
            {q.op > 0.005 && (
                <g opacity={q.op}>
                    <text x={slot.x} y={S1_Y - 120} textAnchor="middle" fontSize={120}
                        fontWeight={800} fill={ACCENT}>？</text>
                    {q.ring > 0 && q.ring < 1 && (
                        <circle cx={slot.x} cy={S1_Y - 160} r={90 + 60 * q.ring} fill="none"
                            stroke={ACCENT} strokeWidth={4} opacity={0.6 * (1 - q.ring)} />
                    )}
                </g>
            )}
        </>
    );
};

// ============================================================
// 画面 2: deep — 雨の例文 → コードの例文 → 圧縮された地図
// ============================================================

const S2_RAIN = ['今日は', '雨が', '降って', 'いるので', '傘を'];
const S2_CODE = ['この', 'プログラムは', 'ファイルを', '開いた', 'あと', '最後に'];
const S2_FS = 38;
const S2_Y = 20;

// 帯の variant 切替（rain ↔ code）
const s2Mix: Track<{ mix: number; op: number }> = [
    { f: E('scene.deep.in'), state: { mix: 0, op: 0 } },
    { f: E('scene.deep.in') + 30, state: { mix: 0, op: 1 } },
    { f: E('code.in'), state: { mix: 0, op: 1 } },
    { f: E('code.in') + 30, state: { mix: 1, op: 1 } },
];

const s2RainSlot: Track<{ prog: number; candOp: number; drop: number }> = [
    { f: E('rain.fill'), state: { prog: 0, candOp: 0, drop: 0 } },
    { f: E('rain.fill') + 20, state: { prog: 0, candOp: 1, drop: 0 } },
    { f: E('rain.fill') + 34, state: { prog: 0, candOp: 1, drop: 0 } },
    { f: E('rain.fill') + 54, state: { prog: 1, candOp: 0, drop: 1 } },
];

const s2CodeSlot: Track<{ prog: number }> = [
    { f: E('code.in') + 40, state: { prog: 0 } },
    { f: E('code.in') + 64, state: { prog: 1 } },
];

// 意味の結び（雨—傘—外出）
const s2Links: Track<{ prog: number; op: number }> = [
    { f: E('rain.links'), state: { prog: 0, op: 1 } },
    { f: E('rain.links') + 44, state: { prog: 1, op: 1 } },
    { f: E('code.in'), state: { prog: 1, op: 1 } },
    { f: E('code.in') + 22, state: { prog: 1, op: 0 } },
];

// 開いた—閉じる の対応弧
const s2Rule: Track<{ prog: number; op: number }> = [
    { f: E('code.rule'), state: { prog: 0, op: 1 } },
    { f: E('code.rule') + 36, state: { prog: 1, op: 1 } },
    { f: E('map.in'), state: { prog: 1, op: 1 } },
    { f: E('map.in') + 22, state: { prog: 1, op: 0 } },
];

// 文章の流れ（ストリーム）→ 地図
const s2Streams: Track<{ op: number; conv: number }> = [
    { f: E('map.in'), state: { op: 0, conv: 0 } },
    { f: E('map.in') + 26, state: { op: 1, conv: 0 } },
    { f: E('map.in') + 36, state: { op: 1, conv: 0 } },
    { f: E('map.in') + 90, state: { op: 0, conv: 1 } },
];

const s2Map: Track<{ op: number; road: number; pick: number; rise: number; groundOp: number }> = [
    { f: E('map.in') + 40, state: { op: 0, road: 0, pick: 0, rise: 0, groundOp: 0 } },
    { f: E('map.in') + 70, state: { op: 1, road: 0.4, pick: 0, rise: 0, groundOp: 0 } },
    { f: E('map.grow'), state: { op: 1, road: 0.4, pick: 0, rise: 0, groundOp: 0 } },
    { f: E('map.grow') + 50, state: { op: 1, road: 1, pick: 0, rise: 0, groundOp: 0 } },
    { f: E('map.grow') + 60, state: { op: 1, road: 1, pick: 0, rise: 0, groundOp: 0 } },
    { f: E('map.grow') + 90, state: { op: 1, road: 1, pick: 1, rise: 0, groundOp: 0 } },
    { f: E('map.apart'), state: { op: 1, road: 1, pick: 1, rise: 0, groundOp: 0 } },
    { f: E('map.apart') + 40, state: { op: 1, road: 1, pick: 0, rise: 1, groundOp: 1 } },
];

const CANDS_RAIN = [
    { t: '差す', w: 1 },
    { t: '持つ', w: 0.7 },
];

// 地図の路線（地図パネル内ローカル座標、中心原点）
const MAP_ROADS = [
    'M -240 60 L -120 40 L 0 60 L 130 30 L 240 50',
    'M -200 -70 L -90 -30 L 20 -60 L 150 -40',
    'M -120 40 L -90 -30',
    'M 130 30 L 150 -40',
    'M 0 60 L 20 -60',
    'M -240 -20 L -200 -70',
    'M 240 -90 L 150 -40',
];
const MAP_NODES: [number, number][] = [
    [-240, 60], [-120, 40], [0, 60], [130, 30], [240, 50],
    [-200, -70], [-90, -30], [20, -60], [150, -40], [-240, -20], [240, -90],
];

const MapPanel: React.FC<{
    cx: number; cy: number; w: number; h: number; op: number; road: number;
    sc?: number; children?: React.ReactNode;
}> = ({ cx, cy, w, h, op, road, sc = 1, children }) => {
    if (op <= 0.005) return null;
    return (
        <g opacity={op} transform={`translate(${cx} ${cy}) scale(${sc})`}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={22}
                fill="#ffffff" stroke={MAP_C} strokeWidth={3} />
            <rect x={-w / 2 + 10} y={-h / 2 + 10} width={w - 20} height={h - 20} rx={16}
                fill={MAP_SOFT} opacity={0.45} />
            <g transform={`scale(${Math.min(w / 560, h / 220)})`}>
                {MAP_ROADS.map((d, i) => {
                    const p = clamp01(road * MAP_ROADS.length - i);
                    return <DrawPath key={i} d={d} prog={p} stroke={MAP_C} sw={5} len={620} />;
                })}
                {MAP_NODES.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={7} fill={MAP_C}
                        opacity={clamp01(road * MAP_ROADS.length - i * 0.6)} />
                ))}
                {children}
            </g>
        </g>
    );
};

const S2_MAP_CX = 0;
const S2_MAP_CY = -250;

const SceneDeep: React.FC<{ f: number }> = ({ f }) => {
    const { mix, op } = resolve(s2Mix, f);
    const rainSlot = resolve(s2RainSlot, f);
    const codeSlot = resolve(s2CodeSlot, f);
    const links = resolve(s2Links, f);
    const rule = resolve(s2Rule, f);
    const streams = resolve(s2Streams, f);
    const map = resolve(s2Map, f);

    const rainSlotC = slotCenter(S2_RAIN, 0, S2_RAIN.length, S2_FS);
    const codeSlotC = slotCenter(S2_CODE, 0, S2_CODE.length, S2_FS);

    // 雨—傘—外出の結びノード（帯の上）
    const nodeY = -200;
    const nodes: { t: string; x: number }[] = [
        { t: '雨', x: -300 }, { t: '傘', x: 0 }, { t: '外出', x: 300 },
    ];
    // 帯内の「雨が」「傘を」チップ中心 x を概算（rain 帯、全chips表示時）
    const geomR = stripGeom(S2_RAIN, S2_FS);
    let rx = -geomR.total / 2;
    const rainChipCX: number[] = [];
    for (let i = 0; i < S2_RAIN.length; i++) {
        rainChipCX.push(rx + geomR.ws[i] / 2);
        rx += geomR.ws[i] + CHIP_GAP;
    }
    // code 帯の「開いた」チップ中心 x
    const geomC = stripGeom(S2_CODE, S2_FS);
    let cxx = -geomC.total / 2;
    const codeChipCX: number[] = [];
    for (let i = 0; i < S2_CODE.length; i++) {
        codeChipCX.push(cxx + geomC.ws[i] / 2);
        cxx += geomC.ws[i] + CHIP_GAP;
    }

    const mapCY = S2_MAP_CY - 50 * map.rise;

    return (
        <>
            {/* 文章ストリーム → 地図へ収束 */}
            {streams.op > 0.005 || streams.conv > 0.005 ? (
                <g opacity={Math.max(streams.op, 0.001)}>
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                        const side = i % 2 === 0 ? -1 : 1;
                        const sx = side * (820 - (i % 3) * 60);
                        const sy = -360 + (i % 3) * 110;
                        const tx = S2_MAP_CX + (sx - S2_MAP_CX) * (1 - streams.conv);
                        const ty = mapCY + (sy - mapCY) * (1 - streams.conv);
                        return (
                            <g key={i} transform={`translate(${tx} ${ty})`} opacity={1 - streams.conv * 0.9}>
                                {[0, 1, 2].map((j) => (
                                    <rect key={j} x={-70} y={j * 18 - 18} width={140 - j * 30}
                                        height={10} rx={5} fill={MUTED} opacity={0.55} />
                                ))}
                            </g>
                        );
                    })}
                </g>
            ) : null}
            {/* 地図 */}
            <MapPanel cx={S2_MAP_CX} cy={mapCY} w={620} h={260} op={map.op} road={map.road} />
            {/* 地図 → スロットへの選択線 */}
            {map.pick > 0.005 && (
                <DrawPath
                    d={`M ${S2_MAP_CX} ${mapCY + 130} C ${S2_MAP_CX} ${S2_Y - 160}, ${codeSlotC.x} ${S2_Y - 200}, ${codeSlotC.x} ${S2_Y - 50}`}
                    prog={map.pick} stroke={MAP_C} sw={4} len={1000} op={0.8 * map.pick} />
            )}
            {/* 現地（地図が浮いて離れる相手） */}
            {map.groundOp > 0.005 && (
                <g opacity={map.groundOp}>
                    <path d="M -310 -130 Q -180 -168 -40 -142 Q 110 -118 310 -150 L 310 -95 L -310 -95 Z"
                        fill="#e3e8ef" stroke="#b8c2d0" strokeWidth={2.5} />
                    <text x={345} y={-110} fontSize={42} fontWeight={700} fill={MUTED}>現地</text>
                    <text x={345} y={mapCY + 12} fontSize={42} fontWeight={700} fill={MAP_C}>地図</text>
                </g>
            )}
            {/* 意味の結び */}
            {links.op > 0.005 && (
                <g opacity={links.op}>
                    {nodes.map((n, i) => (
                        <g key={n.t} opacity={clamp01(links.prog * 3 - i)}>
                            <circle cx={n.x} cy={nodeY} r={46} fill="#ffffff"
                                stroke={ARC_TOPIC} strokeWidth={3} />
                            <text x={n.x} y={nodeY + 14} textAnchor="middle" fontSize={40}
                                fontWeight={700} fill={INK}>{n.t}</text>
                        </g>
                    ))}
                    <DrawPath d={`M ${nodes[0].x + 46} ${nodeY} L ${nodes[1].x - 46} ${nodeY}`}
                        prog={clamp01(links.prog * 1.5 - 0.5)} stroke={ARC_TOPIC} sw={4} len={260} />
                    <DrawPath d={`M ${nodes[1].x + 46} ${nodeY} L ${nodes[2].x - 46} ${nodeY}`}
                        prog={clamp01(links.prog * 1.5 - 0.5)} stroke={ARC_TOPIC} sw={4} len={260} />
                    <DrawPath
                        d={`M ${rainChipCX[1]} ${S2_Y - CHIP_H / 2} L ${nodes[0].x} ${nodeY + 50}`}
                        prog={links.prog} stroke={ARC_TOPIC} sw={3} len={220} op={0.7} />
                    <DrawPath
                        d={`M ${rainChipCX[4]} ${S2_Y - CHIP_H / 2} L ${nodes[1].x} ${nodeY + 50}`}
                        prog={links.prog} stroke={ARC_TOPIC} sw={3} len={220} op={0.7} />
                </g>
            )}
            {/* 開いた—閉じる の対応弧 */}
            {rule.op > 0.005 && (
                <DrawPath
                    d={`M ${codeChipCX[3]} ${S2_Y - CHIP_H / 2 - 6} C ${codeChipCX[3]} ${S2_Y - 190}, ${codeSlotC.x} ${S2_Y - 190}, ${codeSlotC.x} ${S2_Y - CHIP_H / 2 - 6}`}
                    prog={rule.prog} stroke={ARC_GRAM} sw={5} len={760} op={rule.op} />
            )}
            {/* 帯（rain ↔ code クロスフェード） */}
            <TokenStrip texts={S2_RAIN} cx={0} y={S2_Y} filled={S2_RAIN.length * clamp01(op * 2)}
                fs={S2_FS} op={op * (1 - mix)}
                slotFill="差す" slotProg={rainSlot.prog} />
            <TokenStrip texts={S2_CODE} cx={0} y={S2_Y} filled={S2_CODE.length}
                fs={S2_FS} op={op * mix}
                slotFill="閉じる" slotProg={codeSlot.prog} />
            <g opacity={1 - mix}>
                <Candidates sx={rainSlotC.x} sy={S2_Y} op={rainSlot.candOp}
                    drop={rainSlot.drop} cands={CANDS_RAIN} fs={34} />
            </g>
        </>
    );
};

// ============================================================
// 画面 3: tokens — 切る → 数字 → 意味の空間
// ============================================================

const S3_SENT = '機械学習で形態素を扱う';
const S3_CHUNKS = ['機械学習', 'で', '形態素', 'を', '扱う'];
const S3_FS = 40;
const S3_ROW_Y = -300;
const S3_PLANE = { cx: 0, cy: 60, w: 1040, h: 410 };

const s3Cut: Track<{ op: number; band: number; gap: number; slash: number; dim: number }> = [
    { f: E('scene.tokens.in'), state: { op: 0, band: 1, gap: 0, slash: 0, dim: 1 } },
    { f: E('scene.tokens.in') + 30, state: { op: 1, band: 1, gap: 0, slash: 0, dim: 1 } },
    { f: E('strip.cut'), state: { op: 1, band: 1, gap: 0, slash: 0, dim: 1 } },
    { f: E('strip.cut') + 20, state: { op: 1, band: 1, gap: 0, slash: 1, dim: 1 } },
    { f: E('strip.cut') + 26, state: { op: 1, band: 1, gap: 0, slash: 1, dim: 1 } },
    { f: E('strip.cut') + 52, state: { op: 1, band: 0, gap: 16, slash: 0, dim: 1 } },
    { f: E('pair.near'), state: { op: 1, band: 0, gap: 16, slash: 0, dim: 1 } },
    { f: E('pair.near') + 30, state: { op: 1, band: 0, gap: 16, slash: 0, dim: 0.4 } },
];

const s3Split: Track<{ split: number }> = [
    { f: E('token.size'), state: { split: 0 } },
    { f: E('token.size') + 30, state: { split: 1 } },
];

const s3Bars: Track<{ prog: number; toDot: number }> = [
    { f: E('token.numbers'), state: { prog: 0, toDot: 0 } },
    { f: E('token.numbers') + 50, state: { prog: 1, toDot: 0 } },
    { f: E('pair.near'), state: { prog: 1, toDot: 0 } },
    { f: E('pair.near') + 34, state: { prog: 1, toDot: 1 } },
];

const s3Plane: Track<{ op: number; cluster: number }> = [
    { f: E('pair.near'), state: { op: 0, cluster: 0 } },
    { f: E('pair.near') + 26, state: { op: 1, cluster: 0 } },
    { f: E('space.cluster'), state: { op: 1, cluster: 0 } },
    { f: E('space.cluster') + 50, state: { op: 1, cluster: 1 } },
];

const s3Akarui: Track<{ pop: number; ghost: number }> = [
    { f: E('akarui.blur'), state: { pop: 0, ghost: 0 } },
    { f: E('akarui.blur') + 18, state: { pop: 1, ghost: 0 } },
    { f: E('akarui.blur') + 26, state: { pop: 1, ghost: 0 } },
    { f: E('akarui.blur') + 70, state: { pop: 1, ghost: 1 } },
];

// 点：born = 出現イベント＋遅延、散らばり位置 → 群れ位置
type Dot = { t: string; c: string; x0: number; y0: number; x1: number; y1: number; ev: string; d: number };
const S3_DOTS: Dot[] = [
    { t: '犬', c: ARC_PRON, x0: -180, y0: 30, x1: -210, y1: 0, ev: 'pair.near', d: 24 },
    { t: '猫', c: ARC_PRON, x0: -100, y0: 70, x1: -130, y1: 50, ev: 'pair.near', d: 36 },
    { t: '消費税', c: MUTED, x0: 350, y0: -80, x1: 380, y1: -100, ev: 'pair.far', d: 12 },
    { t: '走る', c: ARC_GRAM, x0: 120, y0: 140, x1: 170, y1: 120, ev: 'space.in', d: 10 },
    { t: '歩く', c: ARC_GRAM, x0: 260, y0: 190, x1: 230, y1: 150, ev: 'space.in', d: 22 },
    { t: '嬉しい', c: '#d6336c', x0: -350, y0: 140, x1: -380, y1: 160, ev: 'space.in', d: 34 },
    { t: '楽しい', c: '#d6336c', x0: -240, y0: 190, x1: -310, y1: 200, ev: 'space.in', d: 46 },
    { t: '雨', c: ARC_TOPIC, x0: -60, y0: -100, x1: -40, y1: -120, ev: 'space.in', d: 58 },
    { t: '傘', c: ARC_TOPIC, x0: 30, y0: -50, x1: 10, y1: -90, ev: 'space.in', d: 70 },
];

const S3_BAR_H = [34, 56, 22, 48, 62, 28, 40, 52];

const SceneTokens: React.FC<{ f: number }> = ({ f }) => {
    const cut = resolve(s3Cut, f);
    const { split } = resolve(s3Split, f);
    const bars = resolve(s3Bars, f);
    const plane = resolve(s3Plane, f);
    const ak = resolve(s3Akarui, f);

    // チャンク行ジオメトリ
    const ws = S3_CHUNKS.map((t) => chipW(t, S3_FS));
    const total = ws.reduce((a, b) => a + b, 0) + (S3_CHUNKS.length - 1) * cut.gap;
    const x0 = -total / 2;
    const chunkX: number[] = [];
    {
        let x = x0;
        for (let i = 0; i < S3_CHUNKS.length; i++) {
            chunkX.push(x);
            x += ws[i] + cut.gap;
        }
    }
    const cx0 = chunkX[0] + ws[0] / 2; // 機械学習チップ中心
    const cx2 = chunkX[2] + ws[2] / 2; // 形態素チップ中心

    // バー → 点
    const barBaseY = S3_ROW_Y + 140;
    const barsCX = cx0;
    const dotTarget = { x: S3_PLANE.cx - 210, y: S3_PLANE.cy + 0 }; // 犬の群れ付近へ

    const planeT = (d: Dot) => {
        const x = d.x0 + (d.x1 - d.x0) * plane.cluster;
        const y = d.y0 + (d.y1 - d.y0) * plane.cluster;
        return { x: S3_PLANE.cx + x, y: S3_PLANE.cy + y };
    };

    return (
        <>
            <g opacity={cut.op}>
                {/* 切れ目のない帯 */}
                {cut.band > 0.005 && (
                    <g opacity={cut.band}>
                        <rect x={-chipW(S3_SENT, S3_FS) / 2} y={S3_ROW_Y - CHIP_H / 2}
                            width={chipW(S3_SENT, S3_FS)} height={CHIP_H} rx={16}
                            fill={CHIP_FILL} stroke={CHIP_STROKE} strokeWidth={3} />
                        <text x={0} y={S3_ROW_Y + S3_FS * 0.36} textAnchor="middle"
                            fontSize={S3_FS} fontWeight={700} fill={INK}>{S3_SENT}</text>
                    </g>
                )}
                {/* 切る線 */}
                {cut.slash > 0.005 && cut.band > 0.5 && (
                    <g opacity={cut.slash}>
                        {chunkX.slice(1).map((x, i) => (
                            <line key={i} x1={x - cut.gap / 2} y1={S3_ROW_Y - 58}
                                x2={x - cut.gap / 2} y2={S3_ROW_Y - 58 + 116 * cut.slash}
                                stroke={ACCENT} strokeWidth={4} />
                        ))}
                    </g>
                )}
                {/* 部品チップ */}
                {cut.band < 0.995 && (
                    <g opacity={(1 - cut.band) * cut.dim}>
                        {S3_CHUNKS.map((t, i) => {
                            if (i === 2 && split > 0.005) {
                                // 形態素 → 形・態・素
                                return (
                                    <g key={i}>
                                        <Chip x={chunkX[i]} y={S3_ROW_Y} w={ws[i]} t={t}
                                            fs={S3_FS} op={1 - split} />
                                        {['形', '態', '素'].map((c, j) => (
                                            <Chip key={c}
                                                x={cx2 + (j - 1) * 66 * split - 28}
                                                y={S3_ROW_Y} w={56} t={c} fs={32} h={60}
                                                op={split} stroke={ACCENT} tc={ACCENT} />
                                        ))}
                                    </g>
                                );
                            }
                            return <Chip key={i} x={chunkX[i]} y={S3_ROW_Y} w={ws[i]} t={t} fs={S3_FS} />;
                        })}
                    </g>
                )}
            </g>
            {/* 数値バー列（機械学習の下） */}
            {bars.prog > 0.005 && bars.toDot < 0.995 && (
                <g opacity={1 - bars.toDot}>
                    <line x1={cx0} y1={S3_ROW_Y + CHIP_H / 2} x2={cx0} y2={barBaseY - 70}
                        stroke={MUTED} strokeWidth={2.5}
                        opacity={clamp01(bars.prog * 3)} />
                    {S3_BAR_H.map((h, i) => {
                        const p = clamp01(bars.prog * S3_BAR_H.length - i);
                        const bx = barsCX - (S3_BAR_H.length * 22) / 2 + i * 22;
                        const sq = 1 - bars.toDot;
                        return (
                            <rect key={i}
                                x={bx + (barsCX - bx) * bars.toDot}
                                y={barBaseY - h * p * sq}
                                width={16 * sq + 2} height={Math.max(2, h * p * sq)}
                                rx={4} fill={ARC_PRON} opacity={0.85} />
                        );
                    })}
                </g>
            )}
            {/* バーが縮んだ点が空間へ飛ぶ */}
            {bars.toDot > 0.005 && bars.toDot < 1 && (
                <circle
                    cx={barsCX + (dotTarget.x - barsCX) * bars.toDot}
                    cy={barBaseY + (dotTarget.y - barBaseY) * bars.toDot}
                    r={11} fill={ARC_PRON} opacity={bars.toDot * 0.9} />
            )}
            {/* 意味の空間 */}
            {plane.op > 0.005 && (
                <g opacity={plane.op}>
                    <rect x={S3_PLANE.cx - S3_PLANE.w / 2} y={S3_PLANE.cy - S3_PLANE.h / 2}
                        width={S3_PLANE.w} height={S3_PLANE.h} rx={24}
                        fill="#ffffff" stroke={CHIP_STROKE} strokeWidth={3} />
                    <line x1={S3_PLANE.cx - S3_PLANE.w / 2 + 30} y1={S3_PLANE.cy}
                        x2={S3_PLANE.cx + S3_PLANE.w / 2 - 30} y2={S3_PLANE.cy}
                        stroke={CHIP_STROKE} strokeWidth={2} opacity={0.6} />
                    <line x1={S3_PLANE.cx} y1={S3_PLANE.cy - S3_PLANE.h / 2 + 26}
                        x2={S3_PLANE.cx} y2={S3_PLANE.cy + S3_PLANE.h / 2 - 26}
                        stroke={CHIP_STROKE} strokeWidth={2} opacity={0.6} />
                    {S3_DOTS.map((d) => {
                        const pop = clamp01((f - (E(d.ev) + d.d)) / 16);
                        if (pop <= 0) return null;
                        const p = planeT(d);
                        return (
                            <g key={d.t} opacity={pop}>
                                <circle cx={p.x} cy={p.y} r={11 * pop} fill={d.c} />
                                <text x={p.x + 20} y={p.y + 14} fontSize={42}
                                    fontWeight={700} fill={d.c}>{d.t}</text>
                            </g>
                        );
                    })}
                    {/* 明るい：にじむ点 */}
                    {ak.pop > 0.005 && (
                        <g>
                            {([[170, -120, '部屋'], [300, 30, '性格'], [-50, 150, '未来']] as
                                [number, number, string][]).map(([dx, dy, lbl], i) => {
                                const g2 = clamp01(ak.ghost * 3 - i);
                                const gx = S3_PLANE.cx + 60 + dx * g2;
                                const gy = S3_PLANE.cy - 30 + dy * g2;
                                if (g2 <= 0) return null;
                                return (
                                    <g key={lbl} opacity={g2 * 0.55}>
                                        <line x1={S3_PLANE.cx + 60} y1={S3_PLANE.cy - 30}
                                            x2={gx} y2={gy} stroke={ACCENT} strokeWidth={2.5}
                                            strokeDasharray="8 8" />
                                        <circle cx={gx} cy={gy} r={9} fill={ACCENT} />
                                        <text x={gx + 16} y={gy + 12} fontSize={42}
                                            fontWeight={700} fill={ACCENT}>{lbl}</text>
                                    </g>
                                );
                            })}
                            <circle cx={S3_PLANE.cx + 60} cy={S3_PLANE.cy - 30}
                                r={11 + 8 * ak.ghost} fill={ACCENT}
                                opacity={ak.pop * (1 - 0.35 * ak.ghost)} />
                            <text x={S3_PLANE.cx + 84} y={S3_PLANE.cy - 16} fontSize={42}
                                fontWeight={700} fill={ACCENT} opacity={ak.pop}>明るい</text>
                        </g>
                    )}
                </g>
            )}
        </>
    );
};

// ============================================================
// 画面 4: attention — トークン同士に引かれる線の束 → 層
// ============================================================

const S4_TOKENS = ['めたんは', 'ケーキを', '買った', '冷蔵庫に', 'それを', '入れた'];
const S4_FS = 38;
const S4_ROW_Y_BASE = 40; // 層が積まれる前
const S4_ROW_Y_BOTTOM = 170; // 層が積まれた後の最下層
const S4_LAYER_DY = 145; // 層の間隔
const S4_LAYER_SC = 0.85;

const s4Row: Track<{ op: number; text: number; y: number }> = [
    { f: E('scene.attention.in'), state: { op: 0, text: 0, y: S4_ROW_Y_BASE } },
    { f: E('scene.attention.in') + 30, state: { op: 1, text: 0, y: S4_ROW_Y_BASE } },
    { f: E('arc.example'), state: { op: 1, text: 0, y: S4_ROW_Y_BASE } },
    { f: E('arc.example') + 24, state: { op: 1, text: 1, y: S4_ROW_Y_BASE } },
    { f: E('layers.in'), state: { op: 1, text: 1, y: S4_ROW_Y_BASE } },
    { f: E('layers.in') + 36, state: { op: 1, text: 1, y: S4_ROW_Y_BOTTOM } },
];

// 弧：it（それ→ケーキ 太）、weights（細い灰色）、kinds（色付きの束）
const s4Arcs: Track<{ it: number; weak: number; kinds: number; op: number }> = [
    { f: E('arc.it'), state: { it: 0, weak: 0, kinds: 0, op: 1 } },
    { f: E('arc.it') + 40, state: { it: 1, weak: 0, kinds: 0, op: 1 } },
    { f: E('arc.weights'), state: { it: 1, weak: 0, kinds: 0, op: 1 } },
    { f: E('arc.weights') + 36, state: { it: 1, weak: 1, kinds: 0, op: 1 } },
    { f: E('arcs.kinds'), state: { it: 1, weak: 1, kinds: 0, op: 1 } },
    { f: E('arcs.kinds') + 70, state: { it: 1, weak: 1, kinds: 1, op: 1 } },
    { f: E('layers.in'), state: { it: 1, weak: 1, kinds: 1, op: 1 } },
    { f: E('layers.in') + 24, state: { it: 1, weak: 1, kinds: 1, op: 0 } },
];

const s4Layers: Track<{ prog: number; tint: number }> = [
    { f: E('layers.in'), state: { prog: 0, tint: 0 } },
    { f: E('layers.in') + 70, state: { prog: 1, tint: 0 } },
    { f: E('layers.rewrite'), state: { prog: 1, tint: 0 } },
    { f: E('layers.rewrite') + 50, state: { prog: 1, tint: 1 } },
];

const s4Geom = (() => {
    const ws = S4_TOKENS.map((t) => chipW(t, S4_FS));
    const total = ws.reduce((a, b) => a + b, 0) + (S4_TOKENS.length - 1) * CHIP_GAP;
    const x0 = -total / 2;
    const cxs: number[] = [];
    let x = x0;
    for (let i = 0; i < S4_TOKENS.length; i++) {
        cxs.push(x + ws[i] / 2);
        x += ws[i] + CHIP_GAP;
    }
    return { ws, total, x0, cxs };
})();

const arcD = (xa: number, xb: number, y: number, peak: number): string =>
    `M ${xa} ${y} C ${xa} ${y - peak}, ${xb} ${y - peak}, ${xb} ${y}`;

// 層内の簡略弧（複写された各層に静的に描く）
const MINI_ARCS: [number, number, string][] = [
    [4, 1, ARC_PRON], [2, 0, ARC_GRAM], [5, 3, ARC_TOPIC],
];

const SceneAttention: React.FC<{ f: number }> = ({ f }) => {
    const row = resolve(s4Row, f);
    const arcs = resolve(s4Arcs, f);
    const layers = resolve(s4Layers, f);
    const { ws, cxs } = s4Geom;
    const topY = (y: number) => y - CHIP_H / 2 - 6;

    // 層の色（下層=白 → 上層=文脈色）
    const layerFill = (li: number): string => {
        if (layers.tint <= 0) return '#ffffff';
        const t = layers.tint * (li / 2);
        return t > 0.5 ? '#e7ebff' : t > 0.25 ? '#f2f4ff' : '#ffffff';
    };

    return (
        <>
            {/* 弧（基底の行の上） */}
            {arcs.op > 0.005 && row.text > 0.5 && (
                <g opacity={arcs.op}>
                    {/* 細い弧（それ→他） */}
                    {[0, 2, 3].map((j, i) => (
                        <DrawPath key={j}
                            d={arcD(cxs[4], cxs[j], topY(row.y), 110 + i * 14)}
                            prog={clamp01(arcs.weak * 3 - i)} stroke={MUTED} sw={2.5}
                            len={1100} op={0.45} />
                    ))}
                    {/* それ→ケーキ 太い弧 */}
                    <DrawPath d={arcD(cxs[4], cxs[1], topY(row.y), 190)}
                        prog={arcs.it} stroke={ARC_PRON} sw={7} len={1100} />
                    {/* 種類の違う線の束 */}
                    <DrawPath d={arcD(cxs[2], cxs[0], topY(row.y), 140)}
                        prog={clamp01(arcs.kinds * 3)} stroke={ARC_GRAM} sw={4} len={900} />
                    <DrawPath d={arcD(cxs[5], cxs[3], topY(row.y), 120)}
                        prog={clamp01(arcs.kinds * 3 - 1)} stroke={ARC_TOPIC} sw={4} len={700} />
                    <DrawPath d={arcD(cxs[5], cxs[4], topY(row.y), 90)}
                        prog={clamp01(arcs.kinds * 3 - 2)} stroke={ARC_PRON} sw={4} len={500} />
                </g>
            )}
            {/* 層（複写） */}
            {layers.prog > 0.005 && (
                <g>
                    {[1, 2].map((li) => {
                        const p = clamp01(layers.prog * 2 - (li - 1));
                        if (p <= 0) return null;
                        const ly = S4_ROW_Y_BOTTOM - S4_LAYER_DY * li * p;
                        return (
                            <g key={li} opacity={p}
                                transform={`translate(0 ${ly}) scale(${S4_LAYER_SC})`}>
                                {S4_TOKENS.map((t, i) => {
                                    const isIt = i === 4 && li === 2;
                                    const fill = isIt && layers.tint > 0
                                        ? `rgba(66,99,235,${0.18 * layers.tint + 0.05})`
                                        : layerFill(li);
                                    return (
                                        <rect key={i} x={cxs[i] - ws[i] / 2} y={-CHIP_H / 2}
                                            width={ws[i]} height={CHIP_H} rx={16}
                                            fill={fill}
                                            stroke={isIt && layers.tint > 0.3 ? ARC_PRON : CHIP_STROKE}
                                            strokeWidth={isIt && layers.tint > 0.3 ? 4 : 3} />
                                    );
                                })}
                                {MINI_ARCS.map(([a, b, c], i) => (
                                    <DrawPath key={i} d={arcD(cxs[a], cxs[b], -CHIP_H / 2, 90)}
                                        prog={p} stroke={c} sw={3.5} len={1100} op={0.7} />
                                ))}
                            </g>
                        );
                    })}
                    {/* 層間の流れ線（下の層の上端 → 上の層の下端） */}
                    {[0, 1].map((li) => {
                        const p = clamp01(layers.prog * 2 - li);
                        if (p <= 0) return null;
                        const lowSc = li === 0 ? 1 : S4_LAYER_SC;
                        const y1 = S4_ROW_Y_BOTTOM - S4_LAYER_DY * li - (CHIP_H / 2) * lowSc;
                        const y2 = S4_ROW_Y_BOTTOM - S4_LAYER_DY * (li + 1) + (CHIP_H / 2) * S4_LAYER_SC;
                        return (
                            <g key={li} opacity={0.4 * p}>
                                {cxs.map((cx, i) => (
                                    <line key={i} x1={cx * lowSc} y1={y1}
                                        x2={cx * S4_LAYER_SC} y2={y2}
                                        stroke={MUTED} strokeWidth={2} />
                                ))}
                            </g>
                        );
                    })}
                </g>
            )}
            {/* トークン行（基底） */}
            <g opacity={row.op}>
                {S4_TOKENS.map((t, i) => (
                    <g key={i}>
                        <rect x={cxs[i] - ws[i] / 2} y={row.y - CHIP_H / 2} width={ws[i]}
                            height={CHIP_H} rx={16} fill={CHIP_FILL}
                            stroke={i === 4 && arcs.it > 0.3 ? ARC_PRON
                                : i === 1 && arcs.it > 0.8 ? ARC_PRON : CHIP_STROKE}
                            strokeWidth={i === 4 || i === 1 ? 4 : 3} />
                        <text x={cxs[i]} y={row.y + S4_FS * 0.36} textAnchor="middle"
                            fontSize={S4_FS} fontWeight={700} fill={INK}
                            opacity={row.text}>{t}</text>
                    </g>
                ))}
            </g>
        </>
    );
};

// ============================================================
// 画面 5: icl — 重みは凍ったまま、文脈の規則が答えを変える
// ============================================================

const S5_Y = 80;
const S5_CHIP_W = 92;
const S5_FS = 46;
const S5_LETTERS = ['A', 'B', 'C', 'D'];
const RULE_C = '#ae3ec9';

const s5In: Track<{ op: number }> = [
    { f: E('scene.icl.in'), state: { op: 0 } },
    { f: E('scene.icl.in') + 30, state: { op: 1 } },
];

const s5Slot: Track<{ prog: number; pulse: number }> = [
    { f: E('icl.answer') + 16, state: { prog: 0, pulse: 0 } },
    { f: E('icl.answer') + 40, state: { prog: 1, pulse: 0 } },
    { f: E('rule.apply') + 30, state: { prog: 1, pulse: 0 } },
    { f: E('rule.apply') + 60, state: { prog: 1, pulse: 1 } },
];

const s5Map: Track<{ op: number; lock: number; glow: number }> = [
    { f: E('weights.in'), state: { op: 0, lock: 0, glow: 0 } },
    { f: E('weights.in') + 30, state: { op: 1, lock: 0, glow: 0 } },
    { f: E('weights.in') + 46, state: { op: 1, lock: 1, glow: 0 } },
    { f: E('weights.frozen'), state: { op: 1, lock: 1, glow: 0 } },
    { f: E('weights.frozen') + 16, state: { op: 1, lock: 2, glow: 0 } },
    { f: E('weights.frozen') + 70, state: { op: 1, lock: 2, glow: 1 } },
];

const s5Rule: Track<{ prog: number; ext: number }> = [
    { f: E('rule.emerge'), state: { prog: 0, ext: 0 } },
    { f: E('rule.emerge') + 46, state: { prog: 1, ext: 0 } },
    { f: E('rule.apply'), state: { prog: 1, ext: 0 } },
    { f: E('rule.apply') + 30, state: { prog: 1, ext: 1 } },
];

const s5Swap: Track<{ mix: number }> = [
    { f: E('context.swap') + 10, state: { mix: 0 } },
    { f: E('context.swap') + 40, state: { mix: 1 } },
];

const s5Steps: Track<{ prog: number }> = [
    { f: E('steps.in'), state: { prog: 0 } },
    { f: E('steps.in') + 50, state: { prog: 1 } },
];

const SceneICL: React.FC<{ f: number }> = ({ f }) => {
    const { op } = resolve(s5In, f);
    const slot = resolve(s5Slot, f);
    const map = resolve(s5Map, f);
    const rule = resolve(s5Rule, f);
    const { mix } = resolve(s5Swap, f);
    const steps = resolve(s5Steps, f);

    // 行ジオメトリ：A 1 B 2 C 3 D ▢
    const n = 7;
    const gap = 16;
    const slotW = 130;
    const total = n * S5_CHIP_W + (n - 1) * gap + gap + slotW;
    const x0 = -total / 2;
    const cellX = (i: number) => x0 + i * (S5_CHIP_W + gap);
    const slotX = cellX(7) + slotW / 2 - S5_CHIP_W / 2 + 40;
    const slotCX = cellX(6) + S5_CHIP_W + gap + slotW / 2;

    const numsA = ['1', '2', '3'];
    const numsB = ['2', '4', '6'];
    const ansA = '4', ansB = '8';
    const valH = (v: number) => -(v * 16 + 26); // 値 → 高さ（行の上）

    const vals = [1 + mix, 2 + 2 * mix, 3 + 3 * mix]; // 1,2,3 → 2,4,6
    const ansV = 4 + 4 * mix;
    const numCX = [1, 3, 5].map((i) => cellX(i) + S5_CHIP_W / 2);

    const rulePts = numCX.map((x, i) => `${x} ${S5_Y - CHIP_H / 2 + valH(vals[i])}`);
    const ruleD = `M ${rulePts[0]} L ${rulePts[1]} L ${rulePts[2]}`;
    const extD = `M ${rulePts[2]} L ${slotCX} ${S5_Y - CHIP_H / 2 + valH(ansV)}`;

    const mapCY = -270;

    return (
        <g opacity={op}>
            {/* 地図（重み）＋錠前 */}
            <MapPanel cx={-330} cy={mapCY} w={520} h={250} op={map.op} road={1} />
            {map.op > 0.005 && (
                <g opacity={map.op}>
                    <g transform={`translate(${-330 + 200} ${mapCY - 80})`} opacity={Math.min(1, map.lock)}>
                        <circle cx={0} cy={0} r={44} fill="#ffffff" stroke={INK} strokeWidth={3.5} />
                        <rect x={-20} y={-6} width={40} height={30} rx={6} fill={INK} />
                        <path d="M -12 -6 V -16 A 12 12 0 0 1 12 -16 V -6" fill="none"
                            stroke={INK} strokeWidth={6} />
                        {map.lock > 1 && map.lock < 2 && (
                            <circle cx={0} cy={0} r={44 + 30 * (map.lock - 1)} fill="none"
                                stroke={INK} strokeWidth={3}
                                opacity={0.6 * (2 - map.lock)} />
                        )}
                    </g>
                </g>
            )}
            {/* 例ペアの順送りハイライト */}
            {map.glow > 0.005 && map.glow < 1 && (
                <g>
                    {[0, 1, 2].map((i) => {
                        const p = clamp01(map.glow * 3 - i);
                        if (p <= 0 || p >= 1) return null;
                        const x = cellX(i * 2) - 8;
                        return (
                            <rect key={i} x={x} y={S5_Y - CHIP_H / 2 - 8}
                                width={S5_CHIP_W * 2 + gap + 16} height={CHIP_H + 16} rx={18}
                                fill="none" stroke={ACCENT} strokeWidth={4}
                                opacity={Math.sin(p * Math.PI)} />
                        );
                    })}
                </g>
            )}
            {/* 規則のゴースト線 */}
            {rule.prog > 0.005 && (
                <g>
                    <DrawPath d={ruleD} prog={rule.prog} stroke={RULE_C} sw={4} len={700}
                        op={0.75} dashed={false} />
                    {numCX.map((x, i) => (
                        <circle key={i} cx={x} cy={S5_Y - CHIP_H / 2 + valH(vals[i])} r={8}
                            fill={RULE_C} opacity={0.75 * clamp01(rule.prog * 3 - i)} />
                    ))}
                    {rule.ext > 0.005 && (
                        <g>
                            <DrawPath d={extD} prog={rule.ext} stroke={RULE_C} sw={4}
                                len={420} op={0.75} />
                            <DrawPath
                                d={`M ${slotCX} ${S5_Y - CHIP_H / 2 + valH(ansV)} L ${slotCX} ${S5_Y - CHIP_H / 2 - 10}`}
                                prog={rule.ext} stroke={RULE_C} sw={4} len={160} op={0.75}
                                dashed />
                        </g>
                    )}
                </g>
            )}
            {/* A 1 B 2 C 3 D の行 */}
            {S5_LETTERS.map((t, i) => (
                <Chip key={t} x={cellX(i * 2)} y={S5_Y} w={S5_CHIP_W} t={t} fs={S5_FS} />
            ))}
            {[0, 1, 2].map((i) => (
                <g key={i}>
                    <Chip x={cellX(i * 2 + 1)} y={S5_Y} w={S5_CHIP_W} t={numsA[i]} fs={S5_FS}
                        fill={ACCENT_SOFT} stroke={ACCENT} tc={ACCENT} op={1 - mix} />
                    <Chip x={cellX(i * 2 + 1)} y={S5_Y} w={S5_CHIP_W} t={numsB[i]} fs={S5_FS}
                        fill={ACCENT_SOFT} stroke={ACCENT} tc={ACCENT} op={mix} />
                </g>
            ))}
            {/* スロット */}
            <g>
                <rect x={slotCX - slotW / 2} y={S5_Y - CHIP_H / 2} width={slotW} height={CHIP_H}
                    rx={16} fill={slot.prog > 0.5 ? ACCENT_SOFT : '#ffffff'}
                    stroke={ACCENT} strokeWidth={3.5}
                    strokeDasharray={slot.prog >= 1 ? undefined : '10 8'} />
                {slot.prog > 0 && (
                    <g opacity={slot.prog}>
                        <text x={slotCX} y={S5_Y + S5_FS * 0.36} textAnchor="middle"
                            fontSize={S5_FS} fontWeight={800} fill={ACCENT}
                            opacity={1 - mix}>{ansA}</text>
                        <text x={slotCX} y={S5_Y + S5_FS * 0.36} textAnchor="middle"
                            fontSize={S5_FS} fontWeight={800} fill={ACCENT}
                            opacity={mix}>{ansB}</text>
                    </g>
                )}
                {slot.pulse > 0 && slot.pulse < 1 && (
                    <rect x={slotCX - slotW / 2 - 14 * slot.pulse}
                        y={S5_Y - CHIP_H / 2 - 14 * slot.pulse}
                        width={slotW + 28 * slot.pulse} height={CHIP_H + 28 * slot.pulse}
                        rx={20} fill="none" stroke={ACCENT} strokeWidth={3}
                        opacity={0.7 * (1 - slot.pulse)} />
                )}
            </g>
            {/* 途中式（中間チップ） */}
            {steps.prog > 0.005 && (
                <g>
                    {['6', '+2', '8'].map((t, i) => {
                        const p = clamp01(steps.prog * 3 - i);
                        if (p <= 0) return null;
                        return (
                            <Chip key={t} x={slotCX - 150 + i * 86} y={S5_Y + 120} w={78} t={t}
                                fs={36} h={62} op={p} sc={0.8 + 0.2 * p}
                                stroke={RULE_C} tc={RULE_C} />
                        );
                    })}
                    <DrawPath
                        d={`M ${slotCX + 16} ${S5_Y + 86} L ${slotCX} ${S5_Y + CHIP_H / 2 + 8}`}
                        prog={clamp01(steps.prog * 3 - 2)} stroke={RULE_C} sw={3} len={120}
                        op={0.7} dashed />
                </g>
            )}
        </g>
    );
};

// ============================================================
// 画面 6: hallucination — 地図の空白を、それっぽく埋める
// ============================================================

const S6_TEXTS = ['この', '論文の', '著者は'];
const S6_FS = 38;
const S6_STRIP_Y = -330;
const S6_MAP = { cx: 0, cy: 0, w: 760, h: 430 };

const s6Strip: Track<{ op: number; slotProg: number; candOp: number; drop: number }> = [
    { f: E('scene.hallucination.in'), state: { op: 0, slotProg: 0, candOp: 0, drop: 0 } },
    { f: E('scene.hallucination.in') + 30, state: { op: 1, slotProg: 0, candOp: 0, drop: 0 } },
    { f: E('strip.smooth'), state: { op: 1, slotProg: 0, candOp: 0, drop: 0 } },
    { f: E('strip.smooth') + 20, state: { op: 1, slotProg: 0, candOp: 1, drop: 0 } },
    { f: E('strip.smooth') + 32, state: { op: 1, slotProg: 0, candOp: 1, drop: 0 } },
    { f: E('strip.smooth') + 54, state: { op: 1, slotProg: 1, candOp: 0, drop: 1 } },
    { f: E('map.front'), state: { op: 1, slotProg: 1, candOp: 0, drop: 1 } },
    { f: E('map.front') + 26, state: { op: 0, slotProg: 1, candOp: 0, drop: 1 } },
];

const s6Map: Track<{ op: number; road: number; fadeRoad: number; kink: number }> = [
    { f: E('map.front'), state: { op: 0, road: 0, fadeRoad: 0, kink: 0 } },
    { f: E('map.front') + 30, state: { op: 1, road: 0.7, fadeRoad: 0, kink: 0 } },
    { f: E('map.front') + 60, state: { op: 1, road: 1, fadeRoad: 0, kink: 0 } },
    { f: E('map.flaws'), state: { op: 1, road: 1, fadeRoad: 0, kink: 0 } },
    { f: E('map.flaws') + 30, state: { op: 1, road: 1, fadeRoad: 1, kink: 0 } },
    { f: E('map.flaws') + 36, state: { op: 1, road: 1, fadeRoad: 1, kink: 0 } },
    { f: E('map.flaws') + 70, state: { op: 1, road: 1, fadeRoad: 1, kink: 1 } },
];

const s6Fog: Track<{ op: number; fill: number }> = [
    { f: E('blank.fill'), state: { op: 0, fill: 0 } },
    { f: E('blank.fill') + 20, state: { op: 1, fill: 0 } },
    { f: E('blank.fill') + 26, state: { op: 1, fill: 0 } },
    { f: E('blank.fill') + 76, state: { op: 1, fill: 1 } },
];

const s6Check: Track<{ drop: number; mis: number; tools: number }> = [
    { f: E('check.in'), state: { drop: 0, mis: 0, tools: 0 } },
    { f: E('check.in') + 40, state: { drop: 1, mis: 0, tools: 0 } },
    { f: E('check.mismatch'), state: { drop: 1, mis: 0, tools: 0 } },
    { f: E('check.mismatch') + 30, state: { drop: 1, mis: 1, tools: 0 } },
    { f: E('check.tools'), state: { drop: 1, mis: 1, tools: 0 } },
    { f: E('check.tools') + 60, state: { drop: 1, mis: 1, tools: 1 } },
];

const s6Drafts: Track<{ prog: number }> = [
    { f: E('draft.value'), state: { prog: 0 } },
    { f: E('draft.value') + 60, state: { prog: 1 } },
];

const CANDS_PAPER = [{ t: '田中', w: 0.8 }];

// 空白に引かれるそれっぽい道／現地の本当の道（グローバル座標）
const FAKE_ROAD = 'M 110 60 L 200 10 L 310 -40';
const TRUE_ROAD = 'M 110 60 L 230 40 L 320 -30';

const SceneHallucination: React.FC<{ f: number }> = ({ f }) => {
    const strip = resolve(s6Strip, f);
    const map = resolve(s6Map, f);
    const fog = resolve(s6Fog, f);
    const chk = resolve(s6Check, f);
    const drafts = resolve(s6Drafts, f);
    const stripSlot = slotCenter(S6_TEXTS, 0, S6_TEXTS.length, S6_FS);

    return (
        <>
            {/* 帯（それっぽく滑らかに埋まる——正しい時と同じ動き） */}
            <TokenStrip texts={S6_TEXTS} cx={0} y={S6_STRIP_Y}
                filled={S6_TEXTS.length * clamp01(strip.op * 2)} fs={S6_FS} op={strip.op}
                slotFill="田中" slotProg={strip.slotProg} />
            <g opacity={strip.op}>
                <Candidates sx={stripSlot.x} sy={S6_STRIP_Y} op={strip.candOp}
                    drop={strip.drop} cands={CANDS_PAPER} fs={34} />
            </g>
            {/* 地図（前面へ） */}
            <MapPanel cx={S6_MAP.cx} cy={S6_MAP.cy} w={S6_MAP.w} h={S6_MAP.h}
                op={map.op} road={map.road} />
            {map.op > 0.005 && (
                <g opacity={map.op}>
                    {/* 古い道：色あせ */}
                    {map.fadeRoad > 0.005 && (
                        <path d="M -271 -95 L -122 -40 L 27 -81" fill="none" stroke={BG}
                            strokeWidth={7} opacity={0.75 * map.fadeRoad} strokeLinecap="round" />
                    )}
                    {/* 誤った向きの道 */}
                    <DrawPath d="M -122 -40 L -60 -150 L 30 -190" prog={map.kink}
                        stroke={MAP_C} sw={5} len={420} />
                    {/* 空白（霧） */}
                    {fog.op > 0.005 && (
                        <g opacity={fog.op}>
                            <ellipse cx={225} cy={0} rx={150} ry={115} fill="#dfe5ec"
                                opacity={0.92} />
                            <DrawPath d={FAKE_ROAD} prog={fog.fill} stroke={MAP_C} sw={5}
                                len={460} />
                        </g>
                    )}
                    {/* 現地の断片が降りてきて重なる */}
                    {chk.drop > 0.005 && (
                        <g opacity={chk.drop} transform={`translate(0 ${-240 * (1 - chk.drop)})`}>
                            <rect x={85} y={-120} width={290} height={210} rx={18}
                                fill="rgba(255,255,255,0.55)" stroke={INK} strokeWidth={3}
                                strokeDasharray="12 10" />
                            <path d={TRUE_ROAD} fill="none" stroke={INK} strokeWidth={5}
                                strokeLinecap="round" />
                            <text x={230} y={-140} textAnchor="middle" fontSize={42}
                                fontWeight={700} fill={INK}>現地</text>
                        </g>
                    )}
                    {/* ズレが赤く浮く */}
                    {chk.mis > 0.005 && (
                        <g opacity={chk.mis}>
                            <path d="M 200 10 L 310 -40" fill="none" stroke={RED}
                                strokeWidth={6} strokeDasharray="14 10" strokeLinecap="round" />
                            <circle cx={200} cy={10} r={16} fill="none" stroke={RED}
                                strokeWidth={4} />
                        </g>
                    )}
                    {/* 下書きの経路（強い下書き係） */}
                    {drafts.prog > 0.005 && (
                        <g>
                            {['M -330 90 L -240 30 L -140 70', 'M -330 -30 L -210 -70 L -90 -30',
                                'M -300 150 Q -190 110 -70 140'].map((d, i) => (
                                <DrawPath key={i} d={d} prog={clamp01(drafts.prog * 3 - i)}
                                    stroke={MAP_C} sw={3.5} len={340} op={0.5} dashed />
                            ))}
                        </g>
                    )}
                </g>
            )}
            {/* 照合の印 */}
            {chk.tools > 0.005 && (
                <g>
                    {['実行', '引用', '照合'].map((t, i) => {
                        const p = clamp01(chk.tools * 3 - i);
                        if (p <= 0) return null;
                        return (
                            <Chip key={t} x={-230 + i * 170} y={290} w={140} t={t} fs={40}
                                h={70} op={p} sc={0.8 + 0.2 * p} fill="#ffffff"
                                stroke={INK} tc={INK} />
                        );
                    })}
                </g>
            )}
        </>
    );
};

// ============================================================
// 画面 7: outro — 全工程が一枚の見取り図に畳まれる
// ============================================================

const S7_TEXTS = ['LLMは', '次の', '言葉を'];
const S7_STRIP_Y = -330;
const S7_PIPE_Y = -120;
const S7_PIPE_X = [-480, -240, 0, 240, 480];
const S7_MAP = { cx: 0, cy: 170, w: 880, h: 250 };

const s7In: Track<{ op: number; slotProg: number }> = [
    { f: E('scene.outro.in'), state: { op: 0, slotProg: 0 } },
    { f: E('scene.outro.in') + 30, state: { op: 1, slotProg: 0 } },
];

const s7Pipe: Track<{ prog: number }> = [
    { f: E('recap.flow'), state: { prog: 0 } },
    { f: E('recap.flow') + 130, state: { prog: 1 } },
];

const s7Map: Track<{ op: number; road: number; zones: number; mark: number; ring: number }> = [
    { f: E('map.final'), state: { op: 0, road: 0, zones: 0, mark: 0, ring: 0 } },
    { f: E('map.final') + 30, state: { op: 1, road: 0.6, zones: 0, mark: 0, ring: 0 } },
    { f: E('map.final') + 60, state: { op: 1, road: 1, zones: 0, mark: 0, ring: 0 } },
    { f: E('map.zones'), state: { op: 1, road: 1, zones: 0, mark: 0, ring: 0 } },
    { f: E('map.zones') + 40, state: { op: 1, road: 1, zones: 1, mark: 0, ring: 0 } },
    { f: E('final.mark'), state: { op: 1, road: 1, zones: 1, mark: 0, ring: 0 } },
    { f: E('final.mark') + 20, state: { op: 1, road: 1, zones: 1, mark: 1, ring: 0 } },
    { f: E('final.mark') + 56, state: { op: 1, road: 1, zones: 1, mark: 1, ring: 1 } },
];

// 工程グリフ：切る／点になる／線を引く／層で練る／埋める
const PipeGlyph: React.FC<{ x: number; y: number; i: number; p: number }> = ({ x, y, i, p }) => {
    if (p <= 0) return null;
    const sc = 0.8 + 0.2 * p;
    return (
        <g opacity={p} transform={`translate(${x} ${y}) scale(${sc})`}>
            <circle cx={0} cy={0} r={74} fill="#ffffff" stroke={CHIP_STROKE} strokeWidth={3} />
            {i === 0 && (
                <g>
                    <rect x={-46} y={-20} width={40} height={40} rx={8} fill="none"
                        stroke={INK} strokeWidth={3.5} />
                    <rect x={6} y={-20} width={40} height={40} rx={8} fill="none"
                        stroke={INK} strokeWidth={3.5} />
                    <line x1={0} y1={-34} x2={0} y2={34} stroke={ACCENT} strokeWidth={4} />
                </g>
            )}
            {i === 1 && (
                <g fill={ARC_PRON}>
                    <circle cx={-22} cy={12} r={9} />
                    <circle cx={-6} cy={-18} r={9} />
                    <circle cx={24} cy={6} r={9} />
                </g>
            )}
            {i === 2 && (
                <g>
                    <circle cx={-28} cy={18} r={8} fill={INK} />
                    <circle cx={28} cy={18} r={8} fill={INK} />
                    <path d="M -28 18 C -28 -26, 28 -26, 28 18" fill="none" stroke={ARC_PRON}
                        strokeWidth={4.5} />
                </g>
            )}
            {i === 3 && (
                <g>
                    {[18, 0, -18].map((dy, j) => (
                        <rect key={j} x={-34} y={dy - 6} width={68} height={13} rx={6}
                            fill={j === 2 ? '#e7ebff' : '#ffffff'} stroke={CHIP_STROKE}
                            strokeWidth={2.5} />
                    ))}
                </g>
            )}
            {i === 4 && (
                <g>
                    <rect x={-34} y={-20} width={68} height={40} rx={8} fill={ACCENT_SOFT}
                        stroke={ACCENT} strokeWidth={3.5} strokeDasharray="8 6" />
                    <text x={0} y={11} textAnchor="middle" fontSize={30} fontWeight={800}
                        fill={ACCENT}>…</text>
                </g>
            )}
        </g>
    );
};

const SceneOutro: React.FC<{ f: number }> = ({ f }) => {
    const intro = resolve(s7In, f);
    const pipe = resolve(s7Pipe, f);
    const map = resolve(s7Map, f);

    return (
        <g opacity={intro.op}>
            {/* 帯が戻ってくる（導入の回収） */}
            <TokenStrip texts={S7_TEXTS} cx={0} y={S7_STRIP_Y}
                filled={S7_TEXTS.length * clamp01(intro.op * 2)} fs={38}
                slotProg={0} />
            {/* 工程の通し */}
            {pipe.prog > 0.005 && (
                <g>
                    {S7_PIPE_X.slice(0, -1).map((x, i) => {
                        const segP = clamp01(pipe.prog * 5 - i - 0.5);
                        return (
                            <DrawPath key={i}
                                d={`M ${x + 78} ${S7_PIPE_Y} L ${S7_PIPE_X[i + 1] - 78} ${S7_PIPE_Y}`}
                                prog={segP} stroke={MUTED} sw={3} len={120} op={0.7} />
                        );
                    })}
                    {S7_PIPE_X.map((x, i) => (
                        <PipeGlyph key={i} x={x} y={S7_PIPE_Y} i={i}
                            p={clamp01(pipe.prog * 5 - i)} />
                    ))}
                </g>
            )}
            {/* 一枚の地図 → 塗り分け */}
            <MapPanel cx={S7_MAP.cx} cy={S7_MAP.cy} w={S7_MAP.w} h={S7_MAP.h}
                op={map.op} road={map.road} />
            {map.zones > 0.005 && (
                <g opacity={map.zones}>
                    <rect x={S7_MAP.cx - S7_MAP.w / 2 + 12} y={S7_MAP.cy - S7_MAP.h / 2 + 12}
                        width={(S7_MAP.w - 24) * 0.52} height={S7_MAP.h - 24} rx={16}
                        fill={MAP_C} opacity={0.16} />
                    <ellipse cx={S7_MAP.cx + S7_MAP.w * 0.27} cy={S7_MAP.cy} rx={S7_MAP.w * 0.2}
                        ry={S7_MAP.h * 0.38} fill="#dfe5ec" opacity={0.92} />
                </g>
            )}
            {map.mark > 0.005 && (
                <g opacity={map.mark}
                    transform={`translate(${S7_MAP.cx + S7_MAP.w * 0.27} ${S7_MAP.cy})`}>
                    <circle cx={0} cy={0} r={34} fill="none" stroke={ACCENT} strokeWidth={5} />
                    <line x1={24} y1={24} x2={48} y2={48} stroke={ACCENT} strokeWidth={6}
                        strokeLinecap="round" />
                    {map.ring > 0 && map.ring < 1 && (
                        <circle cx={0} cy={0} r={40 + 50 * map.ring} fill="none" stroke={ACCENT}
                            strokeWidth={4} opacity={0.7 * (1 - map.ring)} />
                    )}
                </g>
            )}
        </g>
    );
};

// ============================================================
// 仕上げ — 立ち絵（表情巡回＋音声駆動の口パク）と字幕カード
// ============================================================

const VARIANTS = ['default', 'normal2', 'normal3', 'normal4'] as const;
const CHAR_DIR: Record<Speaker, string> = { ずんだもん: 'zundamon', めたん: 'metan' };

// 立ち絵の位置調整はこの 4 つだけで行う（px・実ビューポート基準）
const CHAR_WIDTH = 340; // 立ち絵の幅（両キャラ共通）
const CHAR_SIDE = 10; // 画面左右端からの距離
const ZUNDA_BOTTOM = -60; // ずんだもん（右）の下端オフセット。大きいほど上へ
const METAN_BOTTOM = -130; // めたん（左）の下端オフセット

const lineAt = (f: number): number => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++) if (f >= lineStarts[i]) idx = i;
    return idx;
};
const lastLineOf = (f: number, sp: Speaker): number => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++)
        if (SCRIPT[i].speaker === sp && f >= lineStarts[i]) idx = i;
    return idx;
};
// 口パク — VOICEVOX のモーラ長から焼いた開区間（audioData.ts、行頭基準）を引く
const isMouthOpen = (f: number): boolean => {
    const i = lineAt(f);
    const local = f - lineStarts[i];
    for (const [a, b] of AUDIO[i].open) if (local >= a && local < b) return true;
    return false;
};

const charSrc = (sp: Speaker, f: number, speaking: boolean): string => {
    const v = VARIANTS[lastLineOf(f, sp) % VARIANTS.length];
    const mouth = speaking && isMouthOpen(f) ? 'open' : 'close';
    return `characters/${CHAR_DIR[sp]}/${v}-${mouth}.png`;
};

const Characters: React.FC<{ frame: number }> = ({ frame: f }) => {
    const cur = SCRIPT[lineAt(f)].speaker;
    const base: React.CSSProperties = {
        position: 'absolute', width: CHAR_WIDTH, zIndex: 20,
        filter: 'drop-shadow(0 6px 20px rgba(17,24,39,.18))', pointerEvents: 'none',
    };
    return (
        <>
            <div style={{ ...base, left: CHAR_SIDE, bottom: METAN_BOTTOM, transform: 'scaleX(-1)' }}>
                <Img src={staticFile(charSrc('めたん', f, cur === 'めたん'))} style={{ width: '100%' }} />
            </div>
            <div style={{ ...base, right: CHAR_SIDE, bottom: ZUNDA_BOTTOM }}>
                <Img src={staticFile(charSrc('ずんだもん', f, cur === 'ずんだもん'))} style={{ width: '100%' }} />
            </div>
        </>
    );
};

// 話者色（ずんだもん=緑／めたん=ピンク）
const SPEAKER_C: Record<Speaker, string> = { ずんだもん: '#22c55e', めたん: '#d6336c' };

// 字幕カードの位置・寸法はここだけで調整（px・実ビューポート基準）
const SUB_SIDE = 50; // 画面左右端からカードまで
const SUB_BOTTOM = 26; // 画面下端からカードまで
const SUB_H = 200; // カードの高さ（固定。48px × 2 行がちょうど収まる）

// 立ち絵の足元を受ける床グラデーション（立ち絵・カードの奥）
const Floor: React.FC = () => (
    <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 300, zIndex: 15,
        background: 'linear-gradient(to top, rgba(205, 214, 228, 0.85), rgba(205, 214, 228, 0))',
        pointerEvents: 'none',
    }} />
);

// 字幕カード — 画面と同じ「白いカード」言語。話者は色付き名前タブで示す
const SubtitleCard: React.FC<{ frame: number }> = ({ frame: f }) => {
    const idx = lineAt(f);
    const line = SCRIPT[idx];
    const local = f - lineStarts[idx];
    const opacity = interpolate(local, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const ty = interpolate(local, [0, 15], [6, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const tabSide: React.CSSProperties =
        line.speaker === 'めたん' ? { left: 64 } : { right: 64 };
    return (
        <div style={{
            position: 'absolute', left: SUB_SIDE, right: SUB_SIDE, bottom: SUB_BOTTOM,
            height: SUB_H, zIndex: 25,
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 30, border: '2px solid rgba(36, 48, 68, 0.06)',
            boxShadow: '0 18px 50px rgba(36, 48, 68, 0.16)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 64px', boxSizing: 'border-box',
        }}>
            <div style={{
                position: 'absolute', top: -24, ...tabSide,
                backgroundColor: SPEAKER_C[line.speaker], color: '#ffffff',
                fontFamily: ZEN_MARU, fontSize: 26, fontWeight: 900, letterSpacing: 3,
                padding: '5px 28px', borderRadius: 999,
                boxShadow: '0 6px 18px rgba(36, 48, 68, 0.22)',
            }}>{line.speaker}</div>
            <span style={{
                fontFamily: ZEN_MARU, fontSize: 48, fontWeight: 900, color: '#243044',
                lineHeight: 1.5, textAlign: 'center', whiteSpace: 'pre-wrap',
                opacity, transform: `translateY(${ty}px)`,
            }}>{line.text}</span>
        </div>
    );
};

// ============================================================
// メイン
// ============================================================

const SCENE_COMPONENTS: React.FC<{ f: number }>[] = [
    SceneIntro, SceneDeep, SceneTokens, SceneAttention, SceneICL,
    SceneHallucination, SceneOutro,
];

export const LLM: React.FC = () => {
    const f = useCurrentFrame();
    return (
        <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080"
                style={{ position: 'absolute', inset: 0 }}>
                {SCENE_COMPONENTS.map((C, i) => {
                    const vis = sceneVis(f, i);
                    if (vis <= 0.004) return null;
                    return (
                        <g key={SCENES[i]} opacity={vis}>
                            <C f={f} />
                        </g>
                    );
                })}
            </svg>
            {SCENE_TITLES.map((t, i) => {
                const vis = sceneVis(f, i);
                if (vis <= 0.004) return null;
                const slide = interpolate(f - sceneStart(i), [0, 20], [-12, 0], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return <Header key={SCENES[i]} title={t} opacity={vis} slide={slide} />;
            })}
            <Floor />
            <Characters frame={f} />
            <SubtitleCard frame={f} />
            <Audio src={staticFile(VOICE_SRC)} />
            <Audio src={staticFile('audio/bgm/340_long_BPM80.mp3')} volume={0.03} loop />
        </AbsoluteFill>
    );
};
