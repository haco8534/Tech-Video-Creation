import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SCRIPT, AnimEvent, Speaker } from './scriptData';

// ───────────────────────────────────────────
// 0. 定数（design_overall の世界観語彙から）
// ───────────────────────────────────────────

const BG = '#f5f7fa';
const SURFACE = '#ffffff';
const INK = '#243044';
const INK_SOFT = '#aab5c2';
const SUBJECT = '#d9543c';
const DIFFUSION = '#2f8fb3';
const AUTOREG = '#d99a2b';
const VOID = '#7c8aa0';

const SPEAKER_COLOR: Record<Speaker, string> = {
    'めたん': '#d6336c',
    'ずんだもん': '#2f9e44',
};

const FS_TITLE = 92;
const FS_SECTION = 64;
const FS_LABEL = 48;
const FS_AXIS = 50;
const FS_NOTE = 36;
const FS_SUBTITLE = 54;
const FS_SPEAKER = 42;
const FS_LIST = 52;
const FS_CENTER = 86;
const FS_TOKEN = 42;
const FS_CAPTION = 44;

const CHAR_FRAMES = 6;
const PAUSE_FRAMES = 16;
const MIN_LINE_FRAMES = 70;
const TAIL_FRAMES = 120;
const CROSSFADE = 30;

// ───────────────────────────────────────────
// 1. Track 補間
// ───────────────────────────────────────────

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
    if (track.length === 0) throw new Error('empty track');
    if (f <= track[0].f) return track[0].state;
    for (let i = 0; i < track.length - 1; i++) {
        const a = track[i], b = track[i + 1];
        if (f >= a.f && f <= b.f) {
            const t = ease((f - a.f) / Math.max(1, b.f - a.f));
            return blendNumeric(a.state, b.state, t);
        }
    }
    return track[track.length - 1].state;
};

// ───────────────────────────────────────────
// 2. 台本のフレーム化
// ───────────────────────────────────────────

const lineDurations = SCRIPT.map(
    l => Math.max(MIN_LINE_FRAMES, l.text.length * CHAR_FRAMES) + PAUSE_FRAMES,
);
const lineStarts: number[] = [];
lineDurations.reduce((acc, d, i) => ((lineStarts[i] = acc), acc + d), 0);

const eventFrame = (e: AnimEvent): number => {
    const i = SCRIPT.findIndex(l => l.event === e);
    if (i < 0) throw new Error(`event not found: ${e}`);
    return lineStarts[i];
};

export const TOTAL_FRAMES =
    lineStarts[SCRIPT.length - 1] + lineDurations[SCRIPT.length - 1] + TAIL_FRAMES;

// ───────────────────────────────────────────
// 3. ヘルパ
// ───────────────────────────────────────────

const parseHex = (h: string) => ({
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
});

const mixColor = (a: string, b: string, t: number): string => {
    const pa = parseHex(a), pb = parseHex(b);
    const r = Math.round(pa.r + (pb.r - pa.r) * t);
    const g = Math.round(pa.g + (pb.g - pa.g) * t);
    const bv = Math.round(pa.b + (pb.b - pa.b) * t);
    return `rgb(${r},${g},${bv})`;
};

// 字幕の改行
const wrapLine = (text: string, perLine: number): string[] => {
    if (text.length <= perLine) return [text];
    let cut = -1;
    for (let i = Math.min(perLine, text.length - 1); i >= perLine - 12 && i > 0; i--) {
        if (text[i] === '、' || text[i] === '。') { cut = i + 1; break; }
    }
    if (cut < 0) cut = perLine;
    return [text.slice(0, cut), text.slice(cut)];
};

// ───────────────────────────────────────────
// 4. 図のプリミティブ
// ───────────────────────────────────────────

type FrameProps = {
    x: number; y: number; size: number; opacity: number;
    emphasis?: number;  // 0..1, 枠線の太さの強調
    clipId: string;
    children?: React.ReactNode;
};

const CanvasFrame: React.FC<FrameProps> = ({ x, y, size, opacity, emphasis = 0, clipId, children }) => {
    if (opacity <= 0.001) return null;
    const half = size / 2;
    const stroke = 3 + emphasis * 4;
    return (
        <g opacity={opacity} transform={`translate(${x},${y})`}>
            <defs>
                <clipPath id={clipId}>
                    <rect x={-half} y={-half} width={size} height={size} rx={24} ry={24} />
                </clipPath>
            </defs>
            <rect x={-half} y={-half} width={size} height={size} rx={24} ry={24}
                  fill={SURFACE} stroke={INK} strokeWidth={stroke} />
            <g clipPath={`url(#${clipId})`}>
                {children}
            </g>
        </g>
    );
};

// Cat（コーラル色のリネアート、stroke の dash で描き起こし）
type CatProps = {
    cx: number; cy: number; size: number;
    opacity: number; draw: number;  // 0..1
    color?: string;
};

const Cat: React.FC<CatProps> = ({ cx, cy, size, opacity, draw, color = SUBJECT }) => {
    if (opacity <= 0.001) return null;
    const s = size / 300;
    const totalLen = 2200;
    const visible = Math.max(0, Math.min(1, draw));
    const offset = totalLen * (1 - visible);
    // 描き起こしの進みと連動して目もフェードイン
    const eyeOp = Math.max(0, Math.min(1, (visible - 0.85) / 0.15));
    return (
        <g opacity={opacity} transform={`translate(${cx},${cy}) scale(${s})`}>
            <g fill="none" stroke={color} strokeWidth={5}
               strokeLinecap="round" strokeLinejoin="round"
               strokeDasharray={totalLen} strokeDashoffset={offset}>
                {/* 頭と胴の一筆 */}
                <path d="M -50,-30 C -75,-40 -75,-100 0,-100 C 75,-100 75,-40 50,-30 C 80,-20 90,30 70,75 C 30,90 -30,90 -70,75 C -90,30 -80,-20 -50,-30 Z" />
                {/* 左耳 */}
                <path d="M -50,-90 L -65,-130 L -25,-95" />
                {/* 右耳 */}
                <path d="M 50,-90 L 65,-130 L 25,-95" />
                {/* しっぽ */}
                <path d="M 70,15 C 130,5 140,-50 90,-65" />
                {/* 口 */}
                <path d="M -8,-55 Q 0,-48 8,-55" />
            </g>
            <g opacity={eyeOp} fill={color}>
                <circle cx={-22} cy={-72} r={5} />
                <circle cx={22} cy={-72} r={5} />
            </g>
        </g>
    );
};

// NoiseField — 砂嵐
const NOISE_DOTS = (() => {
    const out: { nx: number; ny: number; sz: number; shade: number; threshold: number }[] = [];
    let seed = 13579;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (let i = 0; i < 700; i++) {
        out.push({
            nx: rnd() * 2 - 1,
            ny: rnd() * 2 - 1,
            sz: 5 + rnd() * 6,
            shade: rnd(),
            threshold: rnd(),
        });
    }
    return out;
})();

type NoiseProps = { cx: number; cy: number; size: number; opacity: number; density: number };
const NoiseField: React.FC<NoiseProps> = ({ cx, cy, size, opacity, density }) => {
    if (opacity <= 0.001 || density <= 0.001) return null;
    const half = size / 2 - 6;
    const dots = NOISE_DOTS.filter(d => d.threshold < density).map((d, i) => {
        const px = d.nx * half;
        const py = d.ny * half;
        const color = mixColor(VOID, DIFFUSION, d.shade * 0.35);
        const op = 0.35 + density * 0.5;
        return (
            <rect key={i}
                  x={px - d.sz / 2} y={py - d.sz / 2}
                  width={d.sz} height={d.sz}
                  fill={color} opacity={op} />
        );
    });
    return <g opacity={opacity} transform={`translate(${cx},${cy})`}>{dots}</g>;
};

// PatchGrid — マス目（罫線 + 埋まりマス）
const CAT_MASK: number[] = [
    // row 0: . . X . . X . .
    2, 5,
    // row 1: . X X X X X X .
    9, 10, 11, 12, 13, 14,
    // row 2: . X X X X X X .
    17, 18, 19, 20, 21, 22,
    // row 3: X X X X X X X X
    24, 25, 26, 27, 28, 29, 30, 31,
    // row 4: X X X X X X X X
    32, 33, 34, 35, 36, 37, 38, 39,
    // row 5: X X X X X X X X
    40, 41, 42, 43, 44, 45, 46, 47,
    // row 6: . X X X X X X X
    49, 50, 51, 52, 53, 54, 55,
    // row 7: . X . X . X X .
    57, 59, 61, 62,
];
const CAT_MASK_MAX = CAT_MASK.length;

type PatchGridProps = {
    cx: number; cy: number; size: number;
    opacity: number; gridOpacity: number;
    fillCount: number;  // 0..CAT_MASK_MAX
    color: string;
    cols?: number;
};
const PatchGrid: React.FC<PatchGridProps> = ({ cx, cy, size, opacity, gridOpacity, fillCount, color, cols = 8 }) => {
    if (opacity <= 0.001) return null;
    const cell = size / cols;
    const half = size / 2;
    const lines: React.ReactNode[] = [];
    if (gridOpacity > 0.001) {
        for (let i = 0; i <= cols; i++) {
            lines.push(<line key={`h${i}`}
                x1={-half} y1={-half + i * cell} x2={half} y2={-half + i * cell}
                stroke={INK_SOFT} strokeWidth={1.5} opacity={gridOpacity} />);
            lines.push(<line key={`v${i}`}
                x1={-half + i * cell} y1={-half} x2={-half + i * cell} y2={half}
                stroke={INK_SOFT} strokeWidth={1.5} opacity={gridOpacity} />);
        }
    }
    const n = Math.floor(Math.max(0, Math.min(CAT_MASK_MAX, fillCount)));
    const filled: React.ReactNode[] = [];
    for (let k = 0; k < n; k++) {
        const idx = CAT_MASK[k];
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        filled.push(
            <rect key={`f${k}`}
                  x={-half + c * cell + 2} y={-half + r * cell + 2}
                  width={cell - 4} height={cell - 4}
                  fill={color} rx={3} />
        );
    }
    return (
        <g opacity={opacity} transform={`translate(${cx},${cy})`}>
            {lines}
            {filled}
        </g>
    );
};

// StepBeads — 一列の点
type StepBeadsProps = {
    cx: number; cy: number; count: number; spacing: number;
    lit: number;  // 何個まで点いたか（小数も可）
    color: string; opacity: number;
};
const StepBeads: React.FC<StepBeadsProps> = ({ cx, cy, count, spacing, lit, color, opacity }) => {
    if (opacity <= 0.001) return null;
    const startX = -((count - 1) * spacing) / 2;
    return (
        <g opacity={opacity} transform={`translate(${cx},${cy})`}>
            {Array.from({ length: count }).map((_, i) => {
                const litness = Math.max(0, Math.min(1, lit - i));
                const fill = mixColor(INK_SOFT, color, litness);
                return <circle key={i} cx={startX + i * spacing} cy={0} r={11} fill={fill} opacity={0.45 + litness * 0.55} />;
            })}
        </g>
    );
};

// CombinationsHaze — Canvas の外側に広がる砂粒の雲
const HAZE_DOTS = (() => {
    const out: { x: number; y: number; sz: number }[] = [];
    let seed = 24680;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (let i = 0; i < 350; i++) {
        // 楕円的にばらまく。中央が薄いように rejection sample
        const ang = rnd() * Math.PI * 2;
        const radNorm = 0.4 + rnd() * 0.6;
        const x = Math.cos(ang) * radNorm * 850;
        const y = Math.sin(ang) * radNorm * 420;
        out.push({ x, y, sz: 4 + rnd() * 5 });
    }
    return out;
})();

type HazeProps = { opacity: number };
const CombinationsHaze: React.FC<HazeProps> = ({ opacity }) => {
    if (opacity <= 0.001) return null;
    return (
        <g opacity={opacity}>
            {HAZE_DOTS.map((d, i) => (
                <rect key={i} x={d.x - d.sz / 2} y={d.y - d.sz / 2}
                      width={d.sz} height={d.sz} fill={VOID} opacity={0.55} />
            ))}
        </g>
    );
};

// SubCard — 序論・結論で使う小カード
type SubCardProps = {
    cx: number; cy: number; w: number; h: number;
    opacity: number; label?: string; labelColor?: string;
    labelOpacity?: number;
};
const SubCard: React.FC<SubCardProps> = ({ cx, cy, w, h, opacity, label, labelColor, labelOpacity = 1 }) => {
    if (opacity <= 0.001) return null;
    return (
        <g opacity={opacity} transform={`translate(${cx},${cy})`}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18}
                  fill={SURFACE} stroke={INK} strokeWidth={2.5} />
            {label && (
                <text x={0} y={14} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LABEL} fontWeight="bold"
                      fill={labelColor ?? INK} opacity={labelOpacity}>
                    {label}
                </text>
            )}
        </g>
    );
};

// AxisLabel — Canvas 下の軸名プレート
type AxisLabelProps = {
    cx: number; cy: number; w: number; h: number;
    label: string; color: string; opacity: number;
};
const AxisLabel: React.FC<AxisLabelProps> = ({ cx, cy, w, h, label, color, opacity }) => {
    if (opacity <= 0.001) return null;
    return (
        <g opacity={opacity} transform={`translate(${cx},${cy})`}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={color} />
            <text x={0} y={h / 2 - 18} textAnchor="middle"
                  fontFamily="sans-serif" fontSize={FS_AXIS} fontWeight="bold" fill={SURFACE}>
                {label}
            </text>
        </g>
    );
};

// SectionTitle
type SectionTitleProps = { title: string; opacity: number };
const SectionTitle: React.FC<SectionTitleProps> = ({ title, opacity }) => {
    if (opacity <= 0.001) return null;
    const w = Math.max(300, title.length * FS_SECTION * 0.6);
    return (
        <g opacity={opacity}>
            <text x={0} y={-410} textAnchor="middle"
                  fontFamily="sans-serif" fontSize={FS_SECTION} fontWeight="bold" fill={INK}>
                {title}
            </text>
            <line x1={-w * 0.3} y1={-380} x2={w * 0.3} y2={-380}
                  stroke={INK} strokeWidth={2} />
        </g>
    );
};

// Subtitle（字幕、全画面に常駐）
type SubtitleProps = { frame: number };
const Subtitle: React.FC<SubtitleProps> = ({ frame }) => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++) if (frame >= lineStarts[i]) idx = i;
    const line = SCRIPT[idx];
    const fadeIn = Math.min(1, (frame - lineStarts[idx]) / 8);
    const rows = wrapLine(line.text, 30);
    return (
        <g opacity={fadeIn}>
            {/* 字幕帯の薄い背景 */}
            <rect x={-960} y={350} width={1920} height={200} fill={SURFACE} opacity={0.85} />
            <line x1={-960} y1={350} x2={960} y2={350} stroke={INK_SOFT} strokeWidth={1} opacity={0.5} />
            <text x={-880} y={410}
                  fontFamily="sans-serif" fontSize={FS_SPEAKER} fontWeight="bold"
                  fill={SPEAKER_COLOR[line.speaker]}>
                {line.speaker}
            </text>
            {rows.map((row, i) => (
                <text key={i} x={-740} y={410 + i * 64}
                      fontFamily="sans-serif" fontSize={FS_SUBTITLE} fill={INK}>
                    {row}
                </text>
            ))}
        </g>
    );
};

// ───────────────────────────────────────────
// 5. シーン可視性 Track
// ───────────────────────────────────────────

const sceneVis = (start: number, end: number, isFirst = false, isLast = false): Track<{ v: number }> => {
    const fadeInStart = isFirst ? 0 : start;
    const fadeInEnd = isFirst ? 0 : Math.min(end, start + CROSSFADE);
    const fadeOutStart = isLast ? TOTAL_FRAMES : end;
    const fadeOutEnd = isLast ? TOTAL_FRAMES : Math.min(TOTAL_FRAMES, end + CROSSFADE);
    return [
        { f: 0, state: { v: isFirst ? 1 : 0 } },
        { f: fadeInStart, state: { v: isFirst ? 1 : 0 } },
        { f: fadeInEnd, state: { v: 1 } },
        { f: fadeOutStart, state: { v: 1 } },
        { f: fadeOutEnd, state: { v: isLast ? 1 : 0 } },
        { f: TOTAL_FRAMES, state: { v: isLast ? 1 : 0 } },
    ];
};

// ───────────────────────────────────────────
// 6. メイン
// ───────────────────────────────────────────

export const ImageGeneration: React.FC = () => {
    const f = useCurrentFrame();

    // シーン start/end フレーム
    const introStart = 0;
    const body1Start = eventFrame('scene.body1.in');
    const body2Start = eventFrame('scene.body2.in');
    const body3Start = eventFrame('scene.body3.in');
    const body4Start = eventFrame('scene.body4.in');
    const body5Start = eventFrame('scene.body5.in');
    const outroStart = eventFrame('scene.outro.in');

    const introVis = resolve(sceneVis(introStart, body1Start, true, false), f).v;
    const body1Vis = resolve(sceneVis(body1Start, body2Start, false, false), f).v;
    const body2Vis = resolve(sceneVis(body2Start, body3Start, false, false), f).v;
    const body3Vis = resolve(sceneVis(body3Start, body4Start, false, false), f).v;
    const body4Vis = resolve(sceneVis(body4Start, body5Start, false, false), f).v;
    const body5Vis = resolve(sceneVis(body5Start, outroStart, false, false), f).v;
    const outroVis = resolve(sceneVis(outroStart, TOTAL_FRAMES, false, true), f).v;

    return (
        <AbsoluteFill style={{ backgroundColor: BG }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080" xmlns="http://www.w3.org/2000/svg">
                <g opacity={introVis}><IntroScene f={f} /></g>
                <g opacity={body1Vis}><Body1Scene f={f} /></g>
                <g opacity={body2Vis}><Body2Scene f={f} /></g>
                <g opacity={body3Vis}><Body3Scene f={f} /></g>
                <g opacity={body4Vis}><Body4Scene f={f} /></g>
                <g opacity={body5Vis}><Body5Scene f={f} /></g>
                <g opacity={outroVis}><OutroScene f={f} /></g>
                <Subtitle frame={f} />
            </svg>
        </AbsoluteFill>
    );
};

// ───────────────────────────────────────────
// 7. 序論
// ───────────────────────────────────────────

const IntroScene: React.FC<{ f: number }> = ({ f }) => {
    // Canvas: canvas.intro.in で描き起こし。位置 (0, -50)、サイズ 480。
    const canvasOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: eventFrame('canvas.intro.in'), state: { v: 0 } },
        { f: eventFrame('canvas.intro.in') + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    // Cat draw
    const catDrawTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: eventFrame('cat.intro.in'), state: { v: 0 } },
        { f: eventFrame('cat.intro.in') + 60, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    // Canvas 強調（cat 完成瞬間に一拍）
    const catDone = eventFrame('cat.intro.in') + 60;
    const empTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: catDone, state: { v: 0 } },
        { f: catDone + 8, state: { v: 1 } },
        { f: catDone + 24, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
    // Title「画像生成AI」
    const titleOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: eventFrame('title.intro.in'), state: { v: 0 } },
        { f: eventFrame('title.intro.in') + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    // サブカードと位置（スライド入場）
    const subStart = eventFrame('subcards.intro.in');
    const subCardOpTrack: Track<{ v: number; x: number }> = [
        { f: 0, state: { v: 0, x: 0 } },
        { f: subStart, state: { v: 0, x: 0 } },
        { f: subStart + 24, state: { v: 1, x: 340 } },
        { f: TOTAL_FRAMES, state: { v: 1, x: 340 } },
    ];
    // ラベル
    const labelOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: eventFrame('labels.intro.in'), state: { v: 0 } },
        { f: eventFrame('labels.intro.in') + 14, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    // サブカード間の線
    const linkOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: eventFrame('sublink.intro.in'), state: { v: 0 } },
        { f: eventFrame('sublink.intro.in') + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    const canvasOp = resolve(canvasOpTrack, f).v;
    const catDraw = resolve(catDrawTrack, f).v;
    const emp = resolve(empTrack, f).v;
    const titleOp = resolve(titleOpTrack, f).v;
    const sub = resolve(subCardOpTrack, f);
    const labelOp = resolve(labelOpTrack, f).v;
    const linkOp = resolve(linkOpTrack, f).v;

    return (
        <g>
            {/* タイトル */}
            <g opacity={titleOp}>
                <text x={0} y={-360} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_TITLE} fontWeight="bold" fill={INK}>
                    画像生成AI
                </text>
            </g>
            {/* メイン Canvas */}
            <CanvasFrame x={0} y={-30} size={480} opacity={canvasOp} emphasis={emp} clipId="intro-canvas">
                <Cat cx={0} cy={20} size={420} opacity={canvasOp} draw={catDraw} />
            </CanvasFrame>
            {/* サブカード間の線 */}
            <g opacity={linkOp}>
                <line x1={-sub.x + 130} y1={250} x2={sub.x - 130} y2={250}
                      stroke={INK_SOFT} strokeWidth={2} strokeDasharray="6 6" />
            </g>
            {/* 左サブカード（拡散モデル） */}
            <SubCard cx={-sub.x} cy={250} w={300} h={120}
                     opacity={sub.v}
                     label="拡散モデル"
                     labelColor={DIFFUSION}
                     labelOpacity={labelOp} />
            {/* 右サブカード（自己回帰モデル） */}
            <SubCard cx={sub.x} cy={250} w={300} h={120}
                     opacity={sub.v}
                     label="自己回帰モデル"
                     labelColor={AUTOREG}
                     labelOpacity={labelOp} />
        </g>
    );
};

// ───────────────────────────────────────────
// 8. ボディ1 — 一発で当てるという無謀
// ───────────────────────────────────────────

const Body1Scene: React.FC<{ f: number }> = ({ f }) => {
    const start = eventFrame('scene.body1.in');
    const titleTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: start, state: { v: 0 } },
        { f: start + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // Canvas は scene 開始から常時表示
    const canvasOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: start, state: { v: 0 } },
        { f: start + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // 仮 PatchGrid（grid.body1.in → noise.body1.fill で消える）
    const gridStart = eventFrame('grid.body1.in');
    const gridEnd = eventFrame('noise.body1.fill');
    const gridOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: gridStart, state: { v: 0 } },
        { f: gridStart + 16, state: { v: 1 } },
        { f: gridEnd, state: { v: 1 } },
        { f: gridEnd + 12, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];

    // 色付きマス（cells.body1.color → noise.body1.fill で消える）
    const colorStart = eventFrame('cells.body1.color');
    const colorCountTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: colorStart, state: { v: 0 } },
        { f: colorStart + 36, state: { v: 6 } },
        { f: gridEnd, state: { v: 6 } },
        { f: gridEnd + 12, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];

    // NoiseField（noise.body1.fill から純粋砂嵐）
    const noiseOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: gridEnd, state: { v: 0 } },
        { f: gridEnd + 16, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // CombinationsHaze
    const hazeStart = eventFrame('haze.body1.in');
    const hazeOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: hazeStart, state: { v: 0 } },
        { f: hazeStart + 30, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // SUBJECT 点
    const dotStart = eventFrame('dot.body1.in');
    const dotOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: dotStart, state: { v: 0 } },
        { f: dotStart + 14, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // トーンダウン
    const tdStart = eventFrame('tone.body1.down');
    const toneTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 1 } },
        { f: tdStart, state: { v: 1 } },
        { f: tdStart + 20, state: { v: 0.75 } },
        { f: TOTAL_FRAMES, state: { v: 0.75 } },
    ];

    const titleOp = resolve(titleTrack, f).v;
    const canvasOp = resolve(canvasOpTrack, f).v;
    const gridOp = resolve(gridOpTrack, f).v;
    const colorN = resolve(colorCountTrack, f).v;
    const noiseOp = resolve(noiseOpTrack, f).v;
    const hazeOp = resolve(hazeOpTrack, f).v;
    const dotOp = resolve(dotOpTrack, f).v;
    const tone = resolve(toneTrack, f).v;

    const colorPalette = [SUBJECT, DIFFUSION, AUTOREG, INK_SOFT, '#9aa6b4', '#c47a5e'];
    const colorCells = Array.from({ length: Math.floor(colorN) }).map((_, i) => {
        const idx = i;  // top row, cells 0..5
        const cell = 480 / 8;
        const half = 480 / 2;
        const r = 0;
        const c = idx % 8;
        return (
            <rect key={i}
                  x={-half + c * cell + 2}
                  y={-half + r * cell + 2}
                  width={cell - 4} height={cell - 4}
                  fill={colorPalette[i % colorPalette.length]} rx={3} />
        );
    });

    return (
        <g opacity={tone}>
            <SectionTitle title="一発で当てるという無謀" opacity={titleOp} />
            {/* 背景的に Haze（Canvas の後ろ） */}
            <g><CombinationsHaze opacity={hazeOp} /></g>
            {/* SUBJECT 点（Haze の中央、Canvas の上） */}
            <g opacity={dotOp}>
                <circle cx={0} cy={-30} r={9} fill={SUBJECT} />
                <circle cx={0} cy={-30} r={18} fill="none" stroke={SUBJECT} strokeWidth={1.5} opacity={0.5} />
            </g>
            {/* Canvas */}
            <CanvasFrame x={0} y={-30} size={480} opacity={canvasOp} clipId="body1-canvas">
                {/* 仮 PatchGrid（罫線） */}
                <g opacity={gridOp} transform="translate(0,0)">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <line x1={-240} y1={-240 + i * 60} x2={240} y2={-240 + i * 60}
                                  stroke={INK_SOFT} strokeWidth={1.2} opacity={0.7} />
                            <line x1={-240 + i * 60} y1={-240} x2={-240 + i * 60} y2={240}
                                  stroke={INK_SOFT} strokeWidth={1.2} opacity={0.7} />
                        </React.Fragment>
                    ))}
                    {colorCells}
                </g>
                {/* NoiseField */}
                <NoiseField cx={0} cy={0} size={480} opacity={noiseOp} density={1} />
            </CanvasFrame>
        </g>
    );
};

// ───────────────────────────────────────────
// 9. ボディ2 — バラし方、二つ
// ───────────────────────────────────────────

const Body2Scene: React.FC<{ f: number }> = ({ f }) => {
    const start = eventFrame('scene.body2.in');
    const titleTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: start, state: { v: 0 } },
        { f: start + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // StepBeads（4 個）
    const beadsStart = eventFrame('beads.body2.in');
    const beadsLightStart = eventFrame('beads.body2.light');
    const beadsFull = eventFrame('beads.body2.full');
    const dualIn = eventFrame('dual.body2.in');

    const beadsOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: beadsStart, state: { v: 0 } },
        { f: beadsStart + 30, state: { v: 1 } },
        { f: dualIn, state: { v: 1 } },
        { f: dualIn + 24, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
    const beadsLitTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: beadsLightStart, state: { v: 0 } },
        { f: beadsFull, state: { v: 4 } },
        { f: TOTAL_FRAMES, state: { v: 4 } },
    ];

    // 2 Canvases（左右に滑り出る）
    const dualOpTrack: Track<{ v: number; xL: number; xR: number }> = [
        { f: 0, state: { v: 0, xL: 0, xR: 0 } },
        { f: dualIn, state: { v: 0, xL: 0, xR: 0 } },
        { f: dualIn + 28, state: { v: 1, xL: -310, xR: 310 } },
        { f: TOTAL_FRAMES, state: { v: 1, xL: -310, xR: 310 } },
    ];

    // 左 Canvas: NoiseField fill → thin
    const noiseFillStart = eventFrame('noise.body2.fill');
    const noiseThinStart = eventFrame('noise.body2.thin');
    const leftNoiseTrack: Track<{ v: number; d: number }> = [
        { f: 0, state: { v: 0, d: 1 } },
        { f: noiseFillStart, state: { v: 0, d: 1 } },
        { f: noiseFillStart + 18, state: { v: 1, d: 1 } },
        { f: noiseThinStart, state: { v: 1, d: 1 } },
        { f: noiseThinStart + 30, state: { v: 1, d: 0.55 } },
        { f: TOTAL_FRAMES, state: { v: 1, d: 0.55 } },
    ];
    const leftCatTrack: Track<{ d: number }> = [
        { f: 0, state: { d: 0 } },
        { f: noiseThinStart, state: { d: 0 } },
        { f: noiseThinStart + 30, state: { d: 0.35 } },
        { f: TOTAL_FRAMES, state: { d: 0.35 } },
    ];
    const leftLabelTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: eventFrame('label.body2.diff'), state: { v: 0 } },
        { f: eventFrame('label.body2.diff') + 16, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // 右 Canvas: PatchGrid + 埋まりマス
    const rightGridStart = eventFrame('grid.body2.in');
    const rightCellStart = eventFrame('cells.body2.fill');
    const rightGridTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: rightGridStart, state: { v: 0 } },
        { f: rightGridStart + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    const rightFillTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: rightCellStart, state: { v: 0 } },
        { f: rightCellStart + 30, state: { v: 2 } },
        { f: TOTAL_FRAMES, state: { v: 2 } },
    ];
    const rightLabelTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: eventFrame('label.body2.auto'), state: { v: 0 } },
        { f: eventFrame('label.body2.auto') + 16, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    const titleOp = resolve(titleTrack, f).v;
    const beadsOp = resolve(beadsOpTrack, f).v;
    const beadsLit = resolve(beadsLitTrack, f).v;
    const dual = resolve(dualOpTrack, f);
    const leftN = resolve(leftNoiseTrack, f);
    const leftCat = resolve(leftCatTrack, f);
    const leftLabel = resolve(leftLabelTrack, f).v;
    const rightG = resolve(rightGridTrack, f).v;
    const rightF = resolve(rightFillTrack, f).v;
    const rightLabel = resolve(rightLabelTrack, f).v;

    const dualSize = 360;

    return (
        <g>
            <SectionTitle title="バラし方、二つ" opacity={titleOp} />
            <StepBeads cx={0} cy={-220} count={4} spacing={92} lit={beadsLit} color={SUBJECT} opacity={beadsOp} />
            {/* 左 Canvas（拡散モデル） */}
            <CanvasFrame x={dual.xL} y={20} size={dualSize} opacity={dual.v} clipId="body2-left">
                <NoiseField cx={0} cy={0} size={dualSize} opacity={leftN.v} density={leftN.d} />
                <Cat cx={0} cy={30} size={300} opacity={leftCat.d * 0.6} draw={leftCat.d} />
            </CanvasFrame>
            <g opacity={dual.v * leftLabel}>
                <rect x={dual.xL - 150} y={210} width={300} height={56} rx={28}
                      fill={DIFFUSION} />
                <text x={dual.xL} y={248} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LABEL - 6} fontWeight="bold" fill={SURFACE}>
                    拡散モデル
                </text>
            </g>
            {/* 右 Canvas（自己回帰モデル） */}
            <CanvasFrame x={dual.xR} y={20} size={dualSize} opacity={dual.v} clipId="body2-right">
                <PatchGrid cx={0} cy={0} size={dualSize} opacity={1} gridOpacity={rightG} fillCount={rightF} color={AUTOREG} />
            </CanvasFrame>
            <g opacity={dual.v * rightLabel}>
                <rect x={dual.xR - 200} y={210} width={400} height={56} rx={28}
                      fill={AUTOREG} />
                <text x={dual.xR} y={248} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LABEL - 6} fontWeight="bold" fill={SURFACE}>
                    自己回帰モデル
                </text>
            </g>
        </g>
    );
};

// ───────────────────────────────────────────
// 10. ボディ3 — 拡散モデル
// ───────────────────────────────────────────

const Body3Scene: React.FC<{ f: number }> = ({ f }) => {
    const start = eventFrame('scene.body3.in');
    const canvasIn = eventFrame('canvas.body3.in');
    const s1 = eventFrame('step.body3.s1');
    const s2 = eventFrame('step.body3.s2');
    const s3to5 = eventFrame('step.body3.s3to5');
    const learnShift = eventFrame('learn.body3.shift');
    const learnChain = eventFrame('learn.body3.chain');
    const learnPair = eventFrame('learn.body3.pair');
    const learnFlip = eventFrame('learn.body3.flip');
    const learnOut = eventFrame('learn.body3.out');
    const s6to8 = eventFrame('step.body3.s6to8');
    const axisIn = eventFrame('axislabel.body3.in');

    const titleTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: start, state: { v: 0 } },
        { f: start + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // Canvas 位置と大きさ（学習時に右へ縮む）
    const canvasPosTrack: Track<{ x: number; s: number; v: number }> = [
        { f: 0, state: { x: 0, s: 540, v: 0 } },
        { f: canvasIn, state: { x: 0, s: 540, v: 0 } },
        { f: canvasIn + 24, state: { x: 0, s: 540, v: 1 } },
        { f: learnShift, state: { x: 0, s: 540, v: 1 } },
        { f: learnShift + 36, state: { x: 280, s: 380, v: 1 } },
        { f: learnOut, state: { x: 280, s: 380, v: 1 } },
        { f: learnOut + 30, state: { x: 0, s: 540, v: 1 } },
        { f: TOTAL_FRAMES, state: { x: 0, s: 540, v: 1 } },
    ];

    // NoiseField density（段階的に減らす）
    const noiseDensTrack: Track<{ d: number }> = [
        { f: 0, state: { d: 1 } },
        { f: canvasIn, state: { d: 1 } },
        { f: s1, state: { d: 0.95 } },
        { f: s2, state: { d: 0.85 } },
        { f: s3to5, state: { d: 0.7 } },
        { f: s3to5 + 90, state: { d: 0.5 } },
        { f: learnShift, state: { d: 0.5 } },
        { f: learnOut, state: { d: 0.5 } },
        { f: s6to8, state: { d: 0.35 } },
        { f: s6to8 + 90, state: { d: 0.05 } },
        { f: axisIn, state: { d: 0.05 } },
        { f: TOTAL_FRAMES, state: { d: 0.05 } },
    ];

    // Cat draw = 1 - density-ish（最終で完全描画）
    const catTrack: Track<{ d: number }> = [
        { f: 0, state: { d: 0 } },
        { f: s3to5, state: { d: 0 } },
        { f: s3to5 + 90, state: { d: 0.25 } },
        { f: learnOut, state: { d: 0.25 } },
        { f: s6to8, state: { d: 0.5 } },
        { f: s6to8 + 90, state: { d: 1 } },
        { f: TOTAL_FRAMES, state: { d: 1 } },
    ];

    // StepBeads（8 個、DIFFUSION 色）
    const beadsLitTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: canvasIn, state: { v: 0 } },
        { f: s1, state: { v: 1 } },
        { f: s2, state: { v: 2 } },
        { f: s3to5, state: { v: 3 } },
        { f: s3to5 + 90, state: { v: 5 } },
        { f: s6to8, state: { v: 5 } },
        { f: s6to8 + 90, state: { v: 8 } },
        { f: TOTAL_FRAMES, state: { v: 8 } },
    ];

    // 学習サブ群
    const learnVisTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: learnChain, state: { v: 0 } },
        { f: learnChain + 30, state: { v: 1 } },
        { f: learnOut, state: { v: 1 } },
        { f: learnOut + 24, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
    // チェーン中の小キャンバスの登場順
    const chainNumTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: learnChain, state: { v: 1 } },  // 小Catは即出る
        { f: learnChain + 60, state: { v: 4 } },  // 4 つ（小Cat + 3 ノイズ付き）
        { f: TOTAL_FRAMES, state: { v: 4 } },
    ];
    // ペア矢印 opacity
    const pairOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: learnPair, state: { v: 0 } },
        { f: learnPair + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    // 矢印反転（0 = 順方向、1 = 逆方向）
    const flipTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: learnFlip, state: { v: 0 } },
        { f: learnFlip + 30, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // AxisLabel
    const axisOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: axisIn, state: { v: 0 } },
        { f: axisIn + 20, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    const titleOp = resolve(titleTrack, f).v;
    const cv = resolve(canvasPosTrack, f);
    const nd = resolve(noiseDensTrack, f).d;
    const cat = resolve(catTrack, f).d;
    const beadsLit = resolve(beadsLitTrack, f).v;
    const learnV = resolve(learnVisTrack, f).v;
    const chainN = resolve(chainNumTrack, f).v;
    const pairOp = resolve(pairOpTrack, f).v;
    const flip = resolve(flipTrack, f).v;
    const axisOp = resolve(axisOpTrack, f).v;

    const catSize = cv.s * 0.78;

    return (
        <g>
            <SectionTitle title="拡散モデル" opacity={titleOp} />

            {/* 学習場面（Canvas の左側に登場） */}
            <Body3LearnGroup
                opacity={learnV}
                chainN={chainN}
                pairOp={pairOp}
                flip={flip}
            />

            {/* メイン Canvas */}
            <CanvasFrame x={cv.x} y={-30} size={cv.s} opacity={cv.v} clipId="body3-canvas">
                <NoiseField cx={0} cy={0} size={cv.s} opacity={1} density={nd} />
                <Cat cx={0} cy={20} size={catSize * 0.85} opacity={cat} draw={cat} />
            </CanvasFrame>

            {/* StepBeads（Canvas の下） */}
            <StepBeads cx={cv.x} cy={-30 + cv.s / 2 + 36} count={8}
                       spacing={cv.s / 9} lit={beadsLit}
                       color={DIFFUSION} opacity={cv.v} />

            {/* AxisLabel */}
            <AxisLabel cx={0} cy={300} w={360} h={70}
                       label="ノイズの量" color={DIFFUSION} opacity={axisOp} />
        </g>
    );
};

// 学習場面の補助群（ボディ3）
const Body3LearnGroup: React.FC<{ opacity: number; chainN: number; pairOp: number; flip: number }> = ({ opacity, chainN, pairOp, flip }) => {
    if (opacity <= 0.001) return null;
    // 配置：x = -560, -400, -240, -80（4枚）、y = -30、サイズ 130
    const xs = [-560, -400, -240, -80];
    const y = -30;
    const sz = 130;
    const visible = Math.floor(Math.max(0, Math.min(4, chainN)));
    return (
        <g opacity={opacity}>
            <text x={-320} y={-220} textAnchor="middle"
                  fontFamily="sans-serif" fontSize={FS_CAPTION} fontWeight="bold" fill={INK}>
                学習：逆向きの手順
            </text>
            {/* 4 小キャンバス */}
            {xs.map((x, i) => {
                if (i >= visible) return null;
                return (
                    <g key={i} transform={`translate(${x},${y})`}>
                        <rect x={-sz / 2} y={-sz / 2} width={sz} height={sz} rx={10}
                              fill={SURFACE} stroke={INK} strokeWidth={2} />
                        {/* i=0: Cat 完成。i=1,2,3: ノイズ徐々に多い */}
                        {i === 0 ? (
                            <g clipPath={`url(#body3-learn-clip-${i})`}>
                                <defs>
                                    <clipPath id={`body3-learn-clip-${i}`}>
                                        <rect x={-sz / 2} y={-sz / 2} width={sz} height={sz} rx={10} />
                                    </clipPath>
                                </defs>
                                <Cat cx={0} cy={10} size={sz * 0.85} opacity={1} draw={1} />
                            </g>
                        ) : (
                            <g clipPath={`url(#body3-learn-clip-${i})`}>
                                <defs>
                                    <clipPath id={`body3-learn-clip-${i}`}>
                                        <rect x={-sz / 2} y={-sz / 2} width={sz} height={sz} rx={10} />
                                    </clipPath>
                                </defs>
                                <Cat cx={0} cy={10} size={sz * 0.85} opacity={1 - i * 0.3} draw={1 - i * 0.3} />
                                <NoiseField cx={0} cy={0} size={sz} opacity={1} density={i * 0.32} />
                            </g>
                        )}
                    </g>
                );
            })}
            {/* ペア矢印（3 本）。flip=0 で左→右（順方向、INK）、flip=1 で右→左（DIFFUSION） */}
            <g opacity={pairOp}>
                {[0, 1, 2].map(i => {
                    const x1raw = xs[i] + sz / 2 + 4;
                    const x2raw = xs[i + 1] - sz / 2 - 4;
                    // 反転：終点と始点を入れ替え
                    const x1 = x1raw + (x2raw - x1raw) * flip;
                    const x2 = x2raw + (x1raw - x2raw) * flip;
                    const color = mixColor(INK_SOFT, DIFFUSION, flip);
                    const head = 10;
                    const ah = 6;
                    return (
                        <g key={i}>
                            <line x1={x1} y1={y} x2={x2} y2={y}
                                  stroke={color} strokeWidth={2.5} />
                            {/* 矢じり */}
                            <polygon points={`${x2},${y} ${x2 - (x2 > x1 ? head : -head)},${y - ah} ${x2 - (x2 > x1 ? head : -head)},${y + ah}`} fill={color} />
                        </g>
                    );
                })}
            </g>
        </g>
    );
};

// ───────────────────────────────────────────
// 11. ボディ4 — 自己回帰モデル
// ───────────────────────────────────────────

const Body4Scene: React.FC<{ f: number }> = ({ f }) => {
    const start = eventFrame('scene.body4.in');
    const canvasIn = eventFrame('canvas.body4.in');
    const gridIn = eventFrame('grid.body4.in');
    const first = eventFrame('cells.body4.first');
    const learnShift = eventFrame('learn.body4.shift');
    const tokens = eventFrame('learn.body4.tokens');
    const row = eventFrame('learn.body4.row');
    const frame = eventFrame('learn.body4.frame');
    const learnOut = eventFrame('learn.body4.out');
    const mid1 = eventFrame('cells.body4.mid1');
    const pairIn = eventFrame('pair.body4.in');
    const mid2 = eventFrame('cells.body4.mid2');
    const full = eventFrame('cells.body4.full');
    const axisIn = eventFrame('axislabel.body4.in');

    const titleTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: start, state: { v: 0 } },
        { f: start + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // Canvas 位置と大きさ
    const canvasPosTrack: Track<{ x: number; s: number; v: number }> = [
        { f: 0, state: { x: 0, s: 540, v: 0 } },
        { f: canvasIn, state: { x: 0, s: 540, v: 0 } },
        { f: canvasIn + 24, state: { x: 0, s: 540, v: 1 } },
        { f: learnShift, state: { x: 0, s: 540, v: 1 } },
        { f: learnShift + 36, state: { x: 280, s: 380, v: 1 } },
        { f: learnOut, state: { x: 280, s: 380, v: 1 } },
        { f: learnOut + 30, state: { x: 0, s: 540, v: 1 } },
        { f: TOTAL_FRAMES, state: { x: 0, s: 540, v: 1 } },
    ];

    // PatchGrid 罫線 opacity（gridIn で描き起こし）
    const gridOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: gridIn, state: { v: 0 } },
        { f: gridIn + 36, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // 埋まりマス数（CAT_MASK_MAX = 49 まで）
    const fillTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: first, state: { v: 0 } },
        { f: first + 24, state: { v: 1 } },
        { f: learnShift, state: { v: 1 } },
        { f: learnOut, state: { v: 1 } },
        { f: mid1, state: { v: 1 } },
        { f: mid1 + 60, state: { v: 9 } },
        { f: mid2, state: { v: 9 } },
        { f: mid2 + 90, state: { v: 25 } },
        { f: full, state: { v: 25 } },
        { f: full + 120, state: { v: CAT_MASK_MAX } },
        { f: TOTAL_FRAMES, state: { v: CAT_MASK_MAX } },
    ];

    // StepBeads
    const beadsLitTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: first, state: { v: 1 } },
        { f: mid1, state: { v: 1 } },
        { f: mid1 + 60, state: { v: 4 } },
        { f: mid2, state: { v: 4 } },
        { f: mid2 + 90, state: { v: 6 } },
        { f: full, state: { v: 6 } },
        { f: full + 120, state: { v: 8 } },
        { f: TOTAL_FRAMES, state: { v: 8 } },
    ];

    // 学習サブ群
    const learnVisTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: tokens, state: { v: 0 } },
        { f: tokens + 24, state: { v: 1 } },
        { f: learnOut, state: { v: 1 } },
        { f: learnOut + 24, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
    const tokensTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: tokens, state: { v: 0 } },
        { f: tokens + 60, state: { v: 4 } },
        { f: TOTAL_FRAMES, state: { v: 4 } },
    ];
    const rowTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: row, state: { v: 0 } },
        { f: row + 50, state: { v: 4 } },
        { f: TOTAL_FRAMES, state: { v: 4 } },
    ];
    const frameOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: frame, state: { v: 0 } },
        { f: frame + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    // pair.body4.in は一拍の小ペア（出てすぐ消える）
    const pairFlashTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: pairIn, state: { v: 0 } },
        { f: pairIn + 12, state: { v: 1 } },
        { f: pairIn + 50, state: { v: 1 } },
        { f: pairIn + 70, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];

    const axisOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: axisIn, state: { v: 0 } },
        { f: axisIn + 20, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    const titleOp = resolve(titleTrack, f).v;
    const cv = resolve(canvasPosTrack, f);
    const gridOp = resolve(gridOpTrack, f).v;
    const fill = resolve(fillTrack, f).v;
    const beadsLit = resolve(beadsLitTrack, f).v;
    const learnV = resolve(learnVisTrack, f).v;
    const tokN = resolve(tokensTrack, f).v;
    const rowN = resolve(rowTrack, f).v;
    const frameOp = resolve(frameOpTrack, f).v;
    const pairFlash = resolve(pairFlashTrack, f).v;
    const axisOp = resolve(axisOpTrack, f).v;

    return (
        <g>
            <SectionTitle title="自己回帰モデル" opacity={titleOp} />
            <Body4LearnGroup opacity={learnV} tokN={tokN} rowN={rowN} frameOp={frameOp} />
            {/* メイン Canvas */}
            <CanvasFrame x={cv.x} y={-30} size={cv.s} opacity={cv.v} clipId="body4-canvas">
                <PatchGrid cx={0} cy={0} size={cv.s} opacity={1} gridOpacity={gridOp} fillCount={fill} color={AUTOREG} />
            </CanvasFrame>
            {/* 小ペアキャンバス（一拍） */}
            <g opacity={pairFlash} transform={`translate(${cv.x + cv.s / 2 + 80}, -120)`}>
                <rect x={-50} y={-40} width={100} height={80} rx={6}
                      fill={SURFACE} stroke={INK} strokeWidth={2} />
                <text x={0} y={6} textAnchor="middle" fontFamily="sans-serif"
                      fontSize={28} fontWeight="bold" fill={INK}>?</text>
                <text x={0} y={-66} textAnchor="middle" fontFamily="sans-serif"
                      fontSize={26} fill={INK}>次のマス</text>
            </g>
            <StepBeads cx={cv.x} cy={-30 + cv.s / 2 + 36} count={8}
                       spacing={cv.s / 9} lit={beadsLit}
                       color={AUTOREG} opacity={cv.v} />
            <AxisLabel cx={0} cy={300} w={360} h={70}
                       label="空間の位置" color={AUTOREG} opacity={axisOp} />
        </g>
    );
};

// 学習場面（ボディ4）— トークン箱 + パッチ列 + 共通枠
const Body4LearnGroup: React.FC<{ opacity: number; tokN: number; rowN: number; frameOp: number }> = ({ opacity, tokN, rowN, frameOp }) => {
    if (opacity <= 0.001) return null;
    const xs = [-540, -400, -260, -120];
    const tokY = -100;
    const patchY = 40;
    const visTok = Math.floor(Math.max(0, Math.min(4, tokN)));
    const visRow = Math.floor(Math.max(0, Math.min(4, rowN)));
    const tokens = ['猫', 'の', '写', '真'];
    return (
        <g opacity={opacity}>
            <text x={-330} y={-220} textAnchor="middle"
                  fontFamily="sans-serif" fontSize={FS_CAPTION} fontWeight="bold" fill={INK}>
                同じ機械：テキストとパッチ
            </text>
            {/* 共通枠 */}
            <rect x={-580} y={-160} width={500} height={250} rx={12}
                  fill="none" stroke={INK} strokeWidth={2}
                  strokeDasharray="6 6" opacity={frameOp} />
            {/* トークン箱 */}
            {xs.map((x, i) => {
                if (i >= visTok) return null;
                return (
                    <g key={i} transform={`translate(${x},${tokY})`}>
                        <rect x={-46} y={-40} width={92} height={80} rx={8}
                              fill={SURFACE} stroke={INK} strokeWidth={2} />
                        <text x={0} y={16} textAnchor="middle"
                              fontFamily="sans-serif" fontSize={FS_TOKEN} fontWeight="bold" fill={INK}>
                            {tokens[i]}
                        </text>
                    </g>
                );
            })}
            {/* パッチ列 */}
            {xs.map((x, i) => {
                if (i >= visRow) return null;
                return (
                    <g key={i} transform={`translate(${x},${patchY})`}>
                        <rect x={-40} y={-40} width={80} height={80} rx={6}
                              fill={AUTOREG} stroke={INK} strokeWidth={1.5} opacity={0.85} />
                    </g>
                );
            })}
            {/* 上下を結ぶ薄い縦線（trio 揃ったらだけ） */}
            <g opacity={frameOp * 0.6}>
                {xs.map((x, i) => {
                    if (i >= Math.min(visTok, visRow)) return null;
                    return <line key={i} x1={x} y1={tokY + 42} x2={x} y2={patchY - 42}
                                 stroke={INK_SOFT} strokeWidth={1} strokeDasharray="3 3" />;
                })}
            </g>
        </g>
    );
};

// ───────────────────────────────────────────
// 12. ボディ5 — 並べてみると、軸が違うだけ
// ───────────────────────────────────────────

const Body5Scene: React.FC<{ f: number }> = ({ f }) => {
    const start = eventFrame('scene.body5.in');
    const dualIn = eventFrame('dual.body5.in');
    const c1 = eventFrame('commons.body5.s1');
    const c2 = eventFrame('commons.body5.s2');
    const c3 = eventFrame('commons.body5.s3');
    const axisC = eventFrame('axis.body5.center');
    const axisD = eventFrame('axislabel.body5.diff');
    const axisA = eventFrame('axislabel.body5.auto');
    const pulse = eventFrame('pulse.body5.frames');
    const extras = eventFrame('extras.body5.in');

    const titleTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: start, state: { v: 0 } },
        { f: start + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    const dualTrack: Track<{ v: number; xL: number; xR: number; emp: number }> = [
        { f: 0, state: { v: 0, xL: 0, xR: 0, emp: 0 } },
        { f: dualIn, state: { v: 0, xL: 0, xR: 0, emp: 0 } },
        { f: dualIn + 30, state: { v: 1, xL: -330, xR: 330, emp: 0 } },
        { f: pulse, state: { v: 1, xL: -330, xR: 330, emp: 0 } },
        { f: pulse + 12, state: { v: 1, xL: -330, xR: 330, emp: 1 } },
        { f: pulse + 30, state: { v: 1, xL: -330, xR: 330, emp: 0 } },
        { f: TOTAL_FRAMES, state: { v: 1, xL: -330, xR: 330, emp: 0 } },
    ];

    const commonsTrack: Track<{ v: number; s1: number; s2: number; s3: number }> = [
        { f: 0, state: { v: 0, s1: 0, s2: 0, s3: 0 } },
        { f: c1, state: { v: 0, s1: 0, s2: 0, s3: 0 } },
        { f: c1 + 20, state: { v: 1, s1: 1, s2: 0, s3: 0 } },
        { f: c2, state: { v: 1, s1: 1, s2: 0, s3: 0 } },
        { f: c2 + 20, state: { v: 1, s1: 1, s2: 1, s3: 0 } },
        { f: c3, state: { v: 1, s1: 1, s2: 1, s3: 0 } },
        { f: c3 + 20, state: { v: 1, s1: 1, s2: 1, s3: 1 } },
        { f: axisC, state: { v: 1, s1: 1, s2: 1, s3: 1 } },
        { f: axisC + 24, state: { v: 0, s1: 0, s2: 0, s3: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0, s1: 0, s2: 0, s3: 0 } },
    ];

    const centerTextTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: axisC, state: { v: 0 } },
        { f: axisC + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    const axisDTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: axisD, state: { v: 0 } },
        { f: axisD + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    const axisATrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: axisA, state: { v: 0 } },
        { f: axisA + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    const extrasTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: extras, state: { v: 0 } },
        { f: extras + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];

    const titleOp = resolve(titleTrack, f).v;
    const dual = resolve(dualTrack, f);
    const com = resolve(commonsTrack, f);
    const center = resolve(centerTextTrack, f).v;
    const aD = resolve(axisDTrack, f).v;
    const aA = resolve(axisATrack, f).v;
    const ex = resolve(extrasTrack, f).v;

    const sz = 420;
    // 中央スペースは axisC で輝度ダウン
    const sideDim = 1 - center * 0.25;

    return (
        <g>
            <SectionTitle title="並べてみると、軸が違うだけ" opacity={titleOp} />
            {/* 上の小ラベル */}
            <g opacity={dual.v}>
                <text x={dual.xL} y={-260} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LABEL - 4} fontWeight="bold" fill={DIFFUSION}>
                    拡散モデル
                </text>
                <text x={dual.xR} y={-260} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LABEL - 4} fontWeight="bold" fill={AUTOREG}>
                    自己回帰モデル
                </text>
            </g>
            {/* 左 Canvas（拡散モデルの最終状態） */}
            <g opacity={sideDim}>
                <CanvasFrame x={dual.xL} y={-30} size={sz} opacity={dual.v} emphasis={dual.emp} clipId="body5-left">
                    <NoiseField cx={0} cy={0} size={sz} opacity={1} density={0.15} />
                    <Cat cx={0} cy={20} size={sz * 0.7} opacity={1} draw={1} />
                </CanvasFrame>
            </g>
            {/* 右 Canvas（自己回帰モデルの最終状態） */}
            <g opacity={sideDim}>
                <CanvasFrame x={dual.xR} y={-30} size={sz} opacity={dual.v} emphasis={dual.emp} clipId="body5-right">
                    <PatchGrid cx={0} cy={0} size={sz} opacity={1} gridOpacity={0.6} fillCount={CAT_MASK_MAX} color={AUTOREG} />
                </CanvasFrame>
            </g>
            {/* 中央：共通点リスト */}
            <g opacity={com.v} transform="translate(0,-70)">
                <text x={0} y={0} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LIST} fontWeight="bold"
                      fill={INK} opacity={com.s1}>
                    ① 易しい一手の連鎖
                </text>
                <text x={0} y={66} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LIST} fontWeight="bold"
                      fill={INK} opacity={com.s2}>
                    ② 前を見て、次を当てる
                </text>
                <text x={0} y={132} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_LIST} fontWeight="bold"
                      fill={INK} opacity={com.s3}>
                    ③ 逆方向で教師あり
                </text>
            </g>
            {/* 中央：軸が違うだけ */}
            <g opacity={center}>
                <text x={0} y={20} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_CENTER} fontWeight="bold" fill={INK}>
                    軸が違うだけ
                </text>
            </g>
            {/* AxisLabel 左 */}
            <AxisLabel cx={dual.xL} cy={210} w={320} h={68}
                       label="ノイズの量" color={DIFFUSION} opacity={aD} />
            {/* AxisLabel 右 */}
            <AxisLabel cx={dual.xR} cy={210} w={320} h={68}
                       label="空間の位置" color={AUTOREG} opacity={aA} />
            {/* 小注記 */}
            <g opacity={ex}>
                <text x={dual.xL} y={280} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_NOTE} fill={DIFFUSION} opacity={0.85}>
                    全体構図に強い
                </text>
                <text x={dual.xR} y={280} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_NOTE} fill={AUTOREG} opacity={0.85}>
                    他モーダルと統一
                </text>
            </g>
        </g>
    );
};

// ───────────────────────────────────────────
// 13. 結論
// ───────────────────────────────────────────

const OutroScene: React.FC<{ f: number }> = ({ f }) => {
    const start = eventFrame('scene.outro.in');
    const catIn = eventFrame('cat.outro.in');
    const titleIn = eventFrame('title.outro.in');
    const subIn = eventFrame('subcards.outro.in');
    const labelIn = eventFrame('labels.outro.in');
    const linksIn = eventFrame('links.outro.in');
    const toneIn = eventFrame('tone.outro.down');

    const canvasOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: start, state: { v: 0 } },
        { f: start + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    const catDrawTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: catIn, state: { v: 0 } },
        { f: catIn + 60, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    const catDone = catIn + 60;
    const empTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: catDone, state: { v: 0 } },
        { f: catDone + 8, state: { v: 1 } },
        { f: catDone + 24, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
    const titleOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: titleIn, state: { v: 0 } },
        { f: titleIn + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    const subTrack: Track<{ v: number; x: number }> = [
        { f: 0, state: { v: 0, x: 0 } },
        { f: subIn, state: { v: 0, x: 0 } },
        { f: subIn + 24, state: { v: 1, x: 340 } },
        { f: TOTAL_FRAMES, state: { v: 1, x: 340 } },
    ];
    const labelOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: labelIn, state: { v: 0 } },
        { f: labelIn + 14, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
    const linksOpTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 0 } },
        { f: linksIn, state: { v: 0 } },
        { f: linksIn + 20, state: { v: 0.6 } },
        { f: TOTAL_FRAMES, state: { v: 0.6 } },
    ];
    const toneTrack: Track<{ v: number }> = [
        { f: 0, state: { v: 1 } },
        { f: toneIn, state: { v: 1 } },
        { f: toneIn + 30, state: { v: 0.85 } },
        { f: TOTAL_FRAMES, state: { v: 0.85 } },
    ];

    const canvasOp = resolve(canvasOpTrack, f).v;
    const catDraw = resolve(catDrawTrack, f).v;
    const emp = resolve(empTrack, f).v;
    const titleOp = resolve(titleOpTrack, f).v;
    const sub = resolve(subTrack, f);
    const labelOp = resolve(labelOpTrack, f).v;
    const linksOp = resolve(linksOpTrack, f).v;
    const tone = resolve(toneTrack, f).v;

    return (
        <g opacity={tone}>
            {/* タイトル */}
            <g opacity={titleOp}>
                <text x={0} y={-360} textAnchor="middle"
                      fontFamily="sans-serif" fontSize={FS_TITLE} fontWeight="bold" fill={INK}>
                    諦め方が賢い
                </text>
            </g>
            {/* Canvas + Cat */}
            <CanvasFrame x={0} y={-30} size={480} opacity={canvasOp} emphasis={emp} clipId="outro-canvas">
                <Cat cx={0} cy={20} size={420} opacity={canvasOp} draw={catDraw} />
            </CanvasFrame>
            {/* サブカードと Canvas を結ぶ線 */}
            <g opacity={linksOp}>
                <line x1={-sub.x + 130} y1={250} x2={-140} y2={150}
                      stroke={INK_SOFT} strokeWidth={2} />
                <line x1={sub.x - 130} y1={250} x2={140} y2={150}
                      stroke={INK_SOFT} strokeWidth={2} />
                <line x1={-sub.x + 130} y1={250} x2={sub.x - 130} y2={250}
                      stroke={INK_SOFT} strokeWidth={2} strokeDasharray="6 6" />
            </g>
            {/* 左サブカード */}
            <SubCard cx={-sub.x} cy={250} w={300} h={120}
                     opacity={sub.v} label="ノイズの軸"
                     labelColor={DIFFUSION} labelOpacity={labelOp} />
            {/* 右サブカード */}
            <SubCard cx={sub.x} cy={250} w={300} h={120}
                     opacity={sub.v} label="空間の軸"
                     labelColor={AUTOREG} labelOpacity={labelOp} />
        </g>
    );
};
