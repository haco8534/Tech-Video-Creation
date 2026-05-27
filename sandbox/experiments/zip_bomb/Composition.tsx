import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SCRIPT, type Speaker } from './scriptData';

// =====================================================================
// 固定ベース（白テーマ）
// =====================================================================

const BG = '#f5f7fa';
const SURFACE = '#ffffff';
const INK = '#243044';

// アクセント
const MAIN = '#1a5490';    // 指示書・本体構造（紺）
const EXEC = '#e07b39';    // 実行された中身（オレンジ）
const DEF = '#2f9e44';     // 防御・検査（緑）
const WARN = '#d6336c';    // 警告・上限（マゼンタ）
const GRAY = '#8a96a8';    // 補助

const FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';

const FS_TITLE = 84;
const FS_LABEL = 52;
const FS_NOTE = 44;
const FS_SUBTITLE = 54;
const FS_SPEAKER = 44;
const FS_SCENE_TITLE = 46;

// =====================================================================
// Track 補間機構
// =====================================================================

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
        const a = track[i];
        const b = track[i + 1];
        if (f >= a.f && f <= b.f) {
            const t = ease((f - a.f) / Math.max(1, b.f - a.f));
            return blendNumeric(a.state, b.state, t);
        }
    }
    return track[track.length - 1].state;
};

// =====================================================================
// 台本タイミング
// =====================================================================

const CHAR_FRAMES = 4;
const PAUSE_FRAMES = 6;
const MIN_LINE_FRAMES = 40;
const TAIL_FRAMES = 90;

const lineDurations: number[] = SCRIPT.map(
    (l) => Math.max(MIN_LINE_FRAMES, l.text.length * CHAR_FRAMES) + PAUSE_FRAMES,
);
const lineStarts: number[] = [];
lineDurations.reduce((acc, d, i) => ((lineStarts[i] = acc), acc + d), 0);

const eventFrame = (e: string): number => {
    const i = SCRIPT.findIndex((l) => l.event === e);
    if (i < 0) throw new Error(`event not found: ${e}`);
    return lineStarts[i];
};

const eventFrameOrNull = (e: string): number | null => {
    const i = SCRIPT.findIndex((l) => l.event === e);
    return i < 0 ? null : lineStarts[i];
};

export const TOTAL_FRAMES =
    lineStarts[SCRIPT.length - 1] + lineDurations[SCRIPT.length - 1] + TAIL_FRAMES;

// =====================================================================
// レイアウトプリミティブ
// =====================================================================

type LayoutItem = {
    w: number;
    h: number;
    render: (x: number, y: number) => React.ReactNode;
};

type HStackProps = {
    items: LayoutItem[];
    gap?: number;
    cx?: number;
    cy?: number;
    align?: 'center' | 'top' | 'bottom';
};

const HStack: React.FC<HStackProps> = ({ items, gap = 24, cx = 0, cy = 0, align = 'center' }) => {
    const totalW = items.reduce((a, it) => a + it.w, 0) + gap * Math.max(0, items.length - 1);
    let left = cx - totalW / 2;
    return (
        <g>
            {items.map((it, i) => {
                const x = left + it.w / 2;
                left += it.w + gap;
                let y = cy;
                if (align === 'top') y = cy + it.h / 2;
                else if (align === 'bottom') y = cy - it.h / 2;
                return <React.Fragment key={i}>{it.render(x, y)}</React.Fragment>;
            })}
        </g>
    );
};

type VStackProps = {
    items: LayoutItem[];
    gap?: number;
    cx?: number;
    cy?: number;
};

const VStack: React.FC<VStackProps> = ({ items, gap = 24, cx = 0, cy = 0 }) => {
    const totalH = items.reduce((a, it) => a + it.h, 0) + gap * Math.max(0, items.length - 1);
    let top = cy - totalH / 2;
    return (
        <g>
            {items.map((it, i) => {
                const y = top + it.h / 2;
                top += it.h + gap;
                return <React.Fragment key={i}>{it.render(cx, y)}</React.Fragment>;
            })}
        </g>
    );
};

// HStack の各 item の中心 x を計算（オーバーレイ層から参照するため）
const computeHStackXs = (widths: number[], gap: number, cx: number): number[] => {
    const totalW = widths.reduce((a, w) => a + w, 0) + gap * Math.max(0, widths.length - 1);
    let left = cx - totalW / 2;
    return widths.map((w) => {
        const x = left + w / 2;
        left += w + gap;
        return x;
    });
};

const computeVStackYs = (heights: number[], gap: number, cy: number): number[] => {
    const totalH = heights.reduce((a, h) => a + h, 0) + gap * Math.max(0, heights.length - 1);
    let top = cy - totalH / 2;
    return heights.map((h) => {
        const y = top + h / 2;
        top += h + gap;
        return y;
    });
};

// 文字幅の見積もり（CJK は概ね 1em/字）
const measureLabelWidth = (text: string, fontSize: number) => text.length * fontSize * 1.05;

// =====================================================================
// 部品コンポーネント
// =====================================================================

type LabelCardProps = {
    cx: number;
    cy: number;
    w: number;
    h: number;
    opacity: number;
    label: React.ReactNode;
    accent?: string;
    fontSize?: number;
    bg?: string;
    fontWeight?: number;
};

const LabelCard: React.FC<LabelCardProps> = ({
    cx, cy, w, h, opacity, label, accent = MAIN, fontSize = FS_LABEL, bg = SURFACE, fontWeight = 700,
}) => {
    if (opacity <= 0.001) return null;
    return (
        <g opacity={opacity}>
            <foreignObject x={cx - w / 2} y={cy - h / 2} width={w} height={h}>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                    style={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: bg,
                        border: `3px solid ${accent}`,
                        borderRadius: 16,
                        padding: '0 28px',
                        fontFamily: FONT,
                        fontSize,
                        fontWeight,
                        color: INK,
                        textAlign: 'center',
                        lineHeight: 1.25,
                    }}
                >
                    {label}
                </div>
            </foreignObject>
        </g>
    );
};

const makeLabelCardItem = (props: Omit<LabelCardProps, 'cx' | 'cy'>): LayoutItem => ({
    w: props.w,
    h: props.h,
    render: (x, y) => <LabelCard {...props} cx={x} cy={y} />,
});

type ZipIconProps = {
    cx: number;
    cy: number;
    w: number;
    h: number;
    opacity: number;
    label?: string;
};

const ZipIcon: React.FC<ZipIconProps> = ({ cx, cy, w, h, opacity, label }) => {
    if (opacity <= 0.001) return null;
    const x = cx - w / 2;
    const y = cy - h / 2;
    const foldX = x + w * 0.62;
    return (
        <g opacity={opacity}>
            <rect x={x} y={y} width={w} height={h} rx={10} fill={SURFACE} stroke={MAIN} strokeWidth={3} />
            <path
                d={`M ${foldX} ${y} L ${x + w} ${y + (w - foldX + x)} L ${x + w} ${y}`}
                fill={MAIN}
                opacity={0.15}
            />
            <line x1={foldX} y1={y} x2={x + w} y2={y + (w - foldX + x)} stroke={MAIN} strokeWidth={2} />
            <text
                x={cx}
                y={cy + Math.min(14, h * 0.08)}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={Math.max(20, w * 0.22)}
                fontWeight={700}
                fill={MAIN}
            >
                ZIP
            </text>
            {label && (
                <foreignObject x={x - 40} y={y + h + 6} width={w + 80} height={48}>
                    <div
                        {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontFamily: FONT,
                            fontSize: FS_NOTE,
                            fontWeight: 700,
                            color: INK,
                        }}
                    >
                        {label}
                    </div>
                </foreignObject>
            )}
        </g>
    );
};

type ExecGridProps = {
    cx: number;
    cy: number;
    cols: number;
    rows: number;
    cell: number;
    gap: number;
    count: number;
    opacity: number;
    color?: string;
};

const ExecGrid: React.FC<ExecGridProps> = ({
    cx, cy, cols, rows, cell, gap, count, opacity, color = EXEC,
}) => {
    if (opacity <= 0.001) return null;
    const total = cols * rows;
    const n = Math.max(0, Math.min(total, Math.floor(count)));
    const totalW = cols * cell + (cols - 1) * gap;
    const totalH = rows * cell + (rows - 1) * gap;
    const x0 = cx - totalW / 2;
    const y0 = cy - totalH / 2;
    const cells: React.ReactNode[] = [];
    for (let i = 0; i < n; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        cells.push(
            <rect
                key={i}
                x={x0 + c * (cell + gap)}
                y={y0 + r * (cell + gap)}
                width={cell}
                height={cell}
                rx={cell * 0.18}
                fill={color}
            />,
        );
    }
    return <g opacity={opacity}>{cells}</g>;
};

type ArrowProps = {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    opacity: number;
    color?: string;
    thick?: number;
    dashRatio?: number;     // 0 = 描き起こし開始, 1 = 完全描画
    curveBow?: number;      // 曲線の反り（0 なら直線）
};

const Arrow: React.FC<ArrowProps> = ({
    fromX, fromY, toX, toY, opacity, color = MAIN, thick = 5, dashRatio = 1, curveBow = 0,
}) => {
    if (opacity <= 0.001) return null;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const len = Math.hypot(dx, dy);
    if (len < 1) return null;
    const ux = dx / len;
    const uy = dy / len;
    const headLen = Math.min(22, len * 0.3);
    const headW = Math.min(13, len * 0.2);
    const baseX = toX - ux * headLen;
    const baseY = toY - uy * headLen;
    const px = -uy;
    const py = ux;
    let pathD: string;
    if (curveBow === 0) {
        pathD = `M ${fromX} ${fromY} L ${baseX} ${baseY}`;
    } else {
        const midX = (fromX + baseX) / 2 + px * curveBow;
        const midY = (fromY + baseY) / 2 + py * curveBow;
        pathD = `M ${fromX} ${fromY} Q ${midX} ${midY} ${baseX} ${baseY}`;
    }
    return (
        <g opacity={opacity}>
            <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={thick}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - dashRatio}
            />
            {dashRatio > 0.95 && (
                <polygon
                    points={`${toX},${toY} ${baseX + px * headW},${baseY + py * headW} ${baseX - px * headW},${baseY - py * headW}`}
                    fill={color}
                />
            )}
        </g>
    );
};

type MeterBarProps = {
    cx: number;
    cy: number;
    w: number;
    h: number;
    label: string;
    fill: number;       // 0..1
    opacity: number;
};

const MeterBar: React.FC<MeterBarProps> = ({ cx, cy, w, h, label, fill, opacity }) => {
    if (opacity <= 0.001) return null;
    const x = cx - w / 2;
    const y = cy - h / 2;
    const innerW = (w - 8) * Math.max(0, Math.min(1, fill));
    return (
        <g opacity={opacity}>
            <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="none" stroke={GRAY} strokeWidth={2} />
            <rect x={x + 4} y={y + 4} width={innerW} height={h - 8} rx={(h - 8) / 2} fill={WARN} />
            <foreignObject x={x - 130} y={y - 4} width={120} height={h + 8}>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        fontFamily: FONT,
                        fontSize: 26,
                        fontWeight: 700,
                        color: GRAY,
                    }}
                >
                    {label}
                </div>
            </foreignObject>
        </g>
    );
};

type TargetCardProps = {
    cx: number;
    cy: number;
    w: number;
    h: number;
    opacity: number;
    title: string;
    meterFills: number[];     // 3 本
    meterOpacity: number;
};

const TargetCard: React.FC<TargetCardProps> = ({
    cx, cy, w, h, opacity, title, meterFills, meterOpacity,
}) => {
    if (opacity <= 0.001) return null;
    const x = cx - w / 2;
    const y = cy - h / 2;
    const titleH = 70;
    const metersTop = y + titleH + 18;
    const metersAreaH = h - titleH - 28;
    const meterH = 28;
    const meterW = w - 200;
    const meterGap = (metersAreaH - meterH * 3) / 2;
    const labels = ['DISK', 'MEM', 'CPU'];
    return (
        <g opacity={opacity}>
            <foreignObject x={x} y={y} width={w} height={titleH + 6}>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                    style={{
                        width: '100%',
                        height: titleH,
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: FONT,
                        fontSize: 36,
                        fontWeight: 700,
                        color: INK,
                    }}
                >
                    {title}
                </div>
            </foreignObject>
            <rect
                x={x} y={y} width={w} height={h}
                rx={16}
                fill={SURFACE}
                stroke={GRAY}
                strokeWidth={3}
            />
            <foreignObject x={x} y={y} width={w} height={titleH}>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                    style={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: FONT,
                        fontSize: 36,
                        fontWeight: 700,
                        color: INK,
                    }}
                >
                    {title}
                </div>
            </foreignObject>
            <line x1={x + 24} y1={y + titleH} x2={x + w - 24} y2={y + titleH} stroke={GRAY} strokeWidth={1} opacity={0.5} />
            {[0, 1, 2].map((i) => (
                <MeterBar
                    key={i}
                    cx={cx + 60}
                    cy={metersTop + meterH / 2 + i * (meterH + meterGap)}
                    w={meterW}
                    h={meterH}
                    label={labels[i]}
                    fill={meterFills[i]}
                    opacity={meterOpacity}
                />
            ))}
        </g>
    );
};

type FamilyCardProps = {
    cx: number;
    cy: number;
    w: number;
    h: number;
    opacity: number;
    title: string;
    detail: string;
    pulseRadius: number;
    pulseOpacity: number;
};

const FamilyCard: React.FC<FamilyCardProps> = ({
    cx, cy, w, h, opacity, title, detail, pulseRadius, pulseOpacity,
}) => {
    if (opacity <= 0.001) return null;
    return (
        <g opacity={opacity}>
            {pulseOpacity > 0.001 && (
                <rect
                    x={cx - w / 2 - pulseRadius}
                    y={cy - h / 2 - pulseRadius}
                    width={w + pulseRadius * 2}
                    height={h + pulseRadius * 2}
                    rx={16 + pulseRadius}
                    fill="none"
                    stroke={MAIN}
                    strokeWidth={4}
                    opacity={pulseOpacity}
                />
            )}
            <foreignObject x={cx - w / 2} y={cy - h / 2} width={w} height={h}>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                    style={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: SURFACE,
                        border: `3px solid ${MAIN}`,
                        borderRadius: 16,
                        padding: '20px 28px',
                        fontFamily: FONT,
                        color: INK,
                        textAlign: 'center',
                        gap: 14,
                    }}
                >
                    <div style={{ fontSize: 44, fontWeight: 700 }}>{title}</div>
                    <div style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.4, color: GRAY }}>{detail}</div>
                </div>
            </foreignObject>
        </g>
    );
};

// =====================================================================
// 共通 Track ヘルパ
// =====================================================================

const fadeIn = (e: string, dur = 18): Track<{ v: number }> => {
    const fStart = eventFrame(e);
    return [
        { f: 0, state: { v: 0 } },
        { f: fStart, state: { v: 0 } },
        { f: fStart + dur, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
};

const fadeInOut = (eIn: string, eOut: string, dur = 18): Track<{ v: number }> => {
    const fIn = eventFrame(eIn);
    const fOut = eventFrame(eOut);
    return [
        { f: 0, state: { v: 0 } },
        { f: fIn, state: { v: 0 } },
        { f: fIn + dur, state: { v: 1 } },
        { f: fOut, state: { v: 1 } },
        { f: fOut + dur, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
};

const sceneVis = (eIn: string, eOut: string | null): Track<{ v: number }> => {
    const fIn = eventFrame(eIn);
    if (eOut === null) {
        return [
            { f: 0, state: { v: 0 } },
            { f: fIn, state: { v: 0 } },
            { f: fIn + 30, state: { v: 1 } },
            { f: TOTAL_FRAMES, state: { v: 1 } },
        ];
    }
    const fOut = eventFrame(eOut);
    return [
        { f: 0, state: { v: 0 } },
        { f: fIn, state: { v: 0 } },
        { f: fIn + 30, state: { v: 1 } },
        { f: fOut, state: { v: 1 } },
        { f: fOut + 30, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
};

// パルス Track: 指定 event 群の発火タイミングで 0→1→0 と弾むスカラー
const pulseTrack = (events: string[], dur = 12): Track<{ v: number }> => {
    const out: Keyframe<{ v: number }>[] = [{ f: 0, state: { v: 0 } }];
    for (const e of events) {
        const fE = eventFrameOrNull(e);
        if (fE === null) continue;
        out.push({ f: Math.max(fE - 1, out[out.length - 1].f + 1), state: { v: 0 } });
        out.push({ f: fE + dur / 2, state: { v: 1 } });
        out.push({ f: fE + dur, state: { v: 0 } });
    }
    out.push({ f: TOTAL_FRAMES, state: { v: 0 } });
    return out;
};

// =====================================================================
// 画面可視性 Track
// =====================================================================

const introVisTrack = sceneVis('scene.intro.in', 'scene.body1.in');
const body1VisTrack = sceneVis('scene.body1.in', 'scene.body2.in');
const body2VisTrack = sceneVis('scene.body2.in', 'scene.body3.in');
const body3VisTrack = sceneVis('scene.body3.in', 'scene.outro.in');
const outroVisTrack = sceneVis('scene.outro.in', null);

// =====================================================================
// 序論 Tracks
// =====================================================================

const introZipOpTrack = fadeIn('intro.zip.in', 20);
const introKbOpTrack = fadeIn('intro.zip.in', 30);
const introArrowDashTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('intro.expand');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 30, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const introArrowOpTrack = fadeIn('intro.expand', 14);
const introGridOpTrack = fadeIn('intro.expand', 14);
const introGridCountTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('intro.expand');
    return [
        { f: 0, state: { v: 0 } },
        { f: f + 10, state: { v: 0 } },
        { f: f + 70, state: { v: 240 } },
        { f: TOTAL_FRAMES, state: { v: 240 } },
    ];
})();
const introPbOpTrack = fadeIn('intro.expand', 30);
const introRatioOpTrack = fadeIn('intro.ratio.flash', 16);
const introRatioScaleTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('intro.ratio.flash');
    return [
        { f: 0, state: { v: 1 } },
        { f: f, state: { v: 1 } },
        { f: f + 8, state: { v: 1.15 } },
        { f: f + 24, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const introRatioFadeTrack: Track<{ v: number }> = (() => {
    const f1 = eventFrame('intro.ratio.flash');
    const f2 = eventFrame('intro.compare.in');
    return [
        { f: 0, state: { v: 0 } },
        { f: f1, state: { v: 0 } },
        { f: f1 + 16, state: { v: 1 } },
        { f: f2, state: { v: 1 } },
        { f: f2 + 20, state: { v: 0.35 } },
        { f: TOTAL_FRAMES, state: { v: 0.35 } },
    ];
})();
const introNameOpTrack = fadeIn('intro.name', 14);
const introCompareOpTrack = fadeIn('intro.compare.in', 22);
const introCompareSwapTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('intro.compare.swap');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 20, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const introPulseTrack = pulseTrack([
    'intro.like_hint',
    'intro.exec_burden',
    'intro.gap',
    'intro.malicious',
    'intro.subtle',
    'intro.mean',
    'intro.bridge',
]);

// =====================================================================
// ボディ1 Tracks
// =====================================================================

const body1StringCountTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body1.string.in');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 60, state: { v: 15 } },
        { f: TOTAL_FRAMES, state: { v: 15 } },
    ];
})();
const body1StringOpTrack = fadeIn('body1.string.in', 14);
const body1HighlightTrack = fadeIn('body1.copy.arrow', 14);
const body1CopyArrowDashTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body1.copy.arrow');
    return [
        { f: 0, state: { v: 0 } },
        { f: f + 10, state: { v: 0 } },
        { f: f + 40, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body1CopyArrowOpTrack = fadeIn('body1.copy.arrow', 14);
const body1CopyCardOpTrack = fadeIn('body1.copy.arrow', 22);
const body1Lz77OpTrack = fadeIn('body1.lz77.card', 18);
const body1DeflateOpTrack = fadeIn('body1.deflate.card', 18);
const body1LimitOpTrack = fadeIn('body1.limit.card', 18);
const body1LimitScaleTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body1.limit.card');
    return [
        { f: 0, state: { v: 1 } },
        { f: f, state: { v: 1 } },
        { f: f + 10, state: { v: 1.12 } },
        { f: f + 28, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body1PulseTrack = pulseTrack([
    'body1.naive', 'body1.no_repeat', 'body1.self_ref',
    'body1.huffman_a', 'body1.huffman_freq', 'body1.huffman_digit',
    'body1.window', 'body1.window_box', 'body1.window_ok',
    'body1.aaaa', 'body1.zeros_q', 'body1.zeros_naive',
    'body1.lz77_wins', 'body1.repeat_wins', 'body1.zeros_billion',
    'body1.maxlen', 'body1.chunk', 'body1.ceiling_hit', 'body1.bridge_body2',
]);

// =====================================================================
// ボディ2 Tracks
// =====================================================================

const body2LeftHeadOpTrack = fadeIn('scene.body2.in', 22);
const body2RecExpandCountTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body2.recursive.expand');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 50, state: { v: 8 } },
        { f: TOTAL_FRAMES, state: { v: 8 } },
    ];
})();
const body2RecExpandOpTrack = fadeIn('body2.recursive.expand', 14);
const body2RecDotsOpTrack = fadeIn('body2.recursive.dots', 18);
const body2RecGridCountTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body2.recursive.dots');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 50, state: { v: 48 } },
        { f: TOTAL_FRAMES, state: { v: 48 } },
    ];
})();
const body2RecResultOpTrack = fadeIn('body2.recursive.result', 18);
const body2RecDefendedOpTrack = fadeIn('body2.recursive.defended', 18);
const body2SingleHeadOpTrack = fadeIn('body2.single.head', 18);
const body2SingleBodyOpTrack = fadeIn('body2.single.arrows', 14);
const body2SingleIndexOpTrack = fadeIn('body2.single.arrows', 22);
const body2SingleArrowDashTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body2.single.arrows');
    return [
        { f: 0, state: { v: 0 } },
        { f: f + 16, state: { v: 0 } },
        { f: f + 70, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body2SinglePulseTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body2.single.arrows') + 60;
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 12, state: { v: 1 } },
        { f: f + 30, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
})();
const body2SingleResultOpTrack = fadeIn('body2.single.result', 18);
const body2SingleBypassOpTrack = fadeIn('body2.single.bypass', 18);
const body2SingleBypassScaleTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body2.single.bypass');
    return [
        { f: 0, state: { v: 1 } },
        { f: f, state: { v: 1 } },
        { f: f + 10, state: { v: 1.1 } },
        { f: f + 26, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body2PulseTrack = pulseTrack([
    'body2.double_q', 'body2.double_no', 'body2.random_no', 'body2.how_q',
    'body2.recursive_head',
    'body2.power', 'body2.million', 'body2.giga',
    'body2.same_entity', 'body2.fit', 'body2.depth_limit',
    'body2.into_single', 'body2.single_intro',
    'body2.local_header', 'body2.dual_index', 'body2.trust_index', 'body2.floppy', 'body2.flip',
    'body2.no_recursion', 'body2.terminator', 'body2.cutmarks',
    'body2.compare_q', 'body2.tool_table', 'body2.spec_gap',
]);

// =====================================================================
// ボディ3 Tracks
// =====================================================================

const body3Target1OpTrack = fadeIn('body3.targets.in', 18);
const body3Target2OpTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body3.targets.in') + 18;
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body3Target3OpTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body3.targets.in') + 36;
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body3MeterFillTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body3.meters.fill');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 60, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body3MeterOpTrack = fadeIn('body3.targets.in', 18);
const body3Def1OpTrack = fadeIn('body3.defense.size', 16);
const body3Def2OpTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body3.defense.size') + 24;
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body3Def3OpTrack = fadeIn('body3.defense.ratio', 18);
const body3Def3ScaleTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('body3.defense.ratio');
    return [
        { f: 0, state: { v: 1 } },
        { f: f, state: { v: 1 } },
        { f: f + 10, state: { v: 1.08 } },
        { f: f + 26, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const body3Def4OpTrack = fadeIn('body3.defense.stream', 18);
const body3PulseTrack = pulseTrack([
    'body3.user_safe', 'body3.memory_first', 'body3.dos',
    'body3.target_av', 'body3.target_api', 'body3.irony',
    'body3.serious_self_burn', 'body3.dilemma', 'body3.fork',
    'body3.size_limit_hint', 'body3.time_limit_hint',
    'body3.ratio_thresh', 'body3.ratio_meter',
    'body3.stream_metaphor', 'body3.dont_overdo', 'body3.history', 'body3.alive',
]);

// =====================================================================
// 結論 Tracks
// =====================================================================

const outroCoreOpTrack = fadeIn('scene.outro.in', 22);
const outroFamily1OpTrack = fadeIn('outro.family.lol', 18);
const outroFamily2OpTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('outro.family.lol') + 22;
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 18, state: { v: 1 } },
        { f: TOTAL_FRAMES, state: { v: 1 } },
    ];
})();
const outroFamily3OpTrack = fadeIn('outro.family.redos', 18);
const outroPulseRadiusTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('outro.family.pulse');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 14, state: { v: 30 } },
        { f: f + 34, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
})();
const outroPulseOpTrack: Track<{ v: number }> = (() => {
    const f = eventFrame('outro.family.pulse');
    return [
        { f: 0, state: { v: 0 } },
        { f: f, state: { v: 0 } },
        { f: f + 8, state: { v: 0.7 } },
        { f: f + 30, state: { v: 0 } },
        { f: TOTAL_FRAMES, state: { v: 0 } },
    ];
})();
const outroSolutionOpTrack = fadeIn('outro.solution', 22);
const outroPulseTrack = pulseTrack([
    'outro.kindness', 'outro.kindness_weapon',
    'outro.lol_def', 'outro.lol_nest',
    'outro.callback', 'outro.self_burn', 'outro.final', 'outro.everywhere',
]);

// =====================================================================
// 字幕 / シーンタイトル
// =====================================================================

const SPEAKER_COLOR: Record<Speaker, string> = {
    'めたん': '#d6336c',
    'ずんだもん': '#2f9e44',
};

const Subtitle: React.FC<{ frame: number }> = ({ frame }) => {
    let idx = 0;
    for (let i = 0; i < SCRIPT.length; i++) {
        if (frame >= lineStarts[i]) idx = i;
    }
    const line = SCRIPT[idx];
    const op = Math.min(1, (frame - lineStarts[idx]) / 8);
    return (
        <foreignObject x={-960} y={320} width={1920} height={220}>
            <div
                {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                style={{
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    padding: '24px 80px',
                    opacity: op,
                    fontFamily: FONT,
                    color: INK,
                    background: 'rgba(255,255,255,0.88)',
                    borderTop: `2px solid ${GRAY}`,
                }}
            >
                <div
                    style={{
                        fontSize: FS_SPEAKER,
                        fontWeight: 700,
                        color: SPEAKER_COLOR[line.speaker],
                        marginBottom: 4,
                    }}
                >
                    {line.speaker}
                </div>
                <div style={{ fontSize: FS_SUBTITLE, fontWeight: 700, lineHeight: 1.35 }}>
                    {line.text}
                </div>
            </div>
        </foreignObject>
    );
};

const SCENE_TITLES: { startEvent: string; title: string }[] = [
    { startEvent: 'scene.intro.in', title: '42 KB が 4.5 PB に化ける' },
    { startEvent: 'scene.body1.in', title: '圧縮の正体——コピー指示を埋めこむ' },
    { startEvent: 'scene.body2.in', title: '一段の壁と、ふたつの突破口' },
    { startEvent: 'scene.body3.in', title: '律儀さが、引き金になる' },
    { startEvent: 'scene.outro.in', title: '同じ家族の攻撃' },
];

const sceneTitleByFrame = (f: number): string => {
    let title = SCENE_TITLES[0].title;
    for (const s of SCENE_TITLES) {
        if (f >= eventFrame(s.startEvent)) title = s.title;
    }
    return title;
};

const SceneTitle: React.FC<{ frame: number }> = ({ frame }) => {
    const title = sceneTitleByFrame(frame);
    return (
        <foreignObject x={-960} y={-540} width={1920} height={100}>
            <div
                {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                style={{
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    padding: '24px 80px',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: FONT,
                    color: GRAY,
                    fontSize: FS_SCENE_TITLE,
                    fontWeight: 700,
                }}
            >
                {title}
            </div>
        </foreignObject>
    );
};

// =====================================================================
// 序論シーン
// =====================================================================

const IntroScene: React.FC<{ f: number }> = ({ f }) => {
    const zipOp = resolve(introZipOpTrack, f).v;
    const kbOp = resolve(introKbOpTrack, f).v;
    const arrowOp = resolve(introArrowOpTrack, f).v;
    const arrowDash = resolve(introArrowDashTrack, f).v;
    const gridOp = resolve(introGridOpTrack, f).v;
    const gridCount = resolve(introGridCountTrack, f).v;
    const pbOp = resolve(introPbOpTrack, f).v;
    const ratioOp = resolve(introRatioOpTrack, f).v;
    const ratioScale = resolve(introRatioScaleTrack, f).v;
    const ratioFade = resolve(introRatioFadeTrack, f).v;
    const nameOp = resolve(introNameOpTrack, f).v;
    const compareOp = resolve(introCompareOpTrack, f).v;
    const compareSwap = resolve(introCompareSwapTrack, f).v;
    const pulse = resolve(introPulseTrack, f).v;
    const pulseScale = 1 + pulse * 0.02;

    const stageCy = -150;
    const zipW = 140;
    const zipH = 180;
    const gridCols = 20;
    const gridRows = 12;
    const gridCell = 22;
    const gridGap = 4;
    const gridW = gridCols * gridCell + (gridCols - 1) * gridGap;
    const gridH = gridRows * gridCell + (gridRows - 1) * gridGap;

    const leftItemW = Math.max(zipW, 240);
    const arrowItemW = 240;
    const rightItemW = gridW;
    const stageGap = 80;
    const stageXs = computeHStackXs([leftItemW, arrowItemW, rightItemW], stageGap, 0);

    return (
        <g transform={`scale(${pulseScale})`}>
            {/* ステージ HStack */}
            <ZipIcon
                cx={stageXs[0]}
                cy={stageCy - 50}
                w={zipW}
                h={zipH}
                opacity={zipOp}
                label="42 KB"
            />
            {/* zip ラベルは ZipIcon 内蔵。kbOp は同期しているので zipOp と同じ扱い */}
            {/* 名札 */}
            <foreignObject x={stageXs[0] - 110} y={stageCy - 50 - zipH / 2 - 56} width={220} height={50}>
                <div
                    {...{ xmlns: 'http://www.w3.org/1999/xhtml' } as any}
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: FONT,
                        fontSize: 32,
                        fontWeight: 700,
                        color: WARN,
                        opacity: nameOp,
                    }}
                >
                    42.zip
                </div>
            </foreignObject>
            <Arrow
                fromX={stageXs[0] + zipW / 2 + 16}
                fromY={stageCy - 50}
                toX={stageXs[2] - gridW / 2 - 16}
                toY={stageCy - 50}
                opacity={arrowOp}
                color={MAIN}
                thick={7}
                dashRatio={arrowDash}
            />
            <ExecGrid
                cx={stageXs[2]}
                cy={stageCy - 50}
                cols={gridCols}
                rows={gridRows}
                cell={gridCell}
                gap={gridGap}
                count={gridCount}
                opacity={gridOp}
                color={EXEC}
            />
            <LabelCard
                cx={stageXs[2]}
                cy={stageCy - 50 + gridH / 2 + 56}
                w={260}
                h={70}
                opacity={pbOp}
                label="4.5 PB"
                accent={EXEC}
                fontSize={FS_LABEL}
            />
            {/* 比較バー領域に被らないよう 1000 億倍カードはステージ右下〜中央寄りに配置 */}
            <g transform={`scale(${ratioScale})`}>
                <LabelCard
                    cx={0}
                    cy={120}
                    w={420}
                    h={100}
                    opacity={ratioOp * ratioFade}
                    label="1000 億倍"
                    accent={WARN}
                    fontSize={68}
                />
            </g>
            {/* 比較バー */}
            <g opacity={compareOp}>
                <HStack
                    cx={0}
                    cy={210}
                    gap={60}
                    items={[
                        makeLabelCardItem({
                            w: 540, h: 110, opacity: 1,
                            label: (
                                <span>
                                    <span style={{ display: 'block', opacity: 1 - compareSwap }}>
                                        指示書: 軽い
                                    </span>
                                    <span style={{ display: 'block', position: 'absolute', opacity: compareSwap }}>
                                        紙に「1 億回書け」
                                    </span>
                                </span>
                            ),
                            accent: MAIN,
                            fontSize: 44,
                        }),
                        makeLabelCardItem({
                            w: 540, h: 110, opacity: 1,
                            label: '実行: 重い',
                            accent: EXEC,
                            fontSize: 44,
                        }),
                    ]}
                />
            </g>
        </g>
    );
};

// =====================================================================
// ボディ1 シーン
// =====================================================================

const Body1Scene: React.FC<{ f: number }> = ({ f }) => {
    const stringOp = resolve(body1StringOpTrack, f).v;
    const stringCount = resolve(body1StringCountTrack, f).v;
    const highlight = resolve(body1HighlightTrack, f).v;
    const copyArrowOp = resolve(body1CopyArrowOpTrack, f).v;
    const copyArrowDash = resolve(body1CopyArrowDashTrack, f).v;
    const copyCardOp = resolve(body1CopyCardOpTrack, f).v;
    const lz77Op = resolve(body1Lz77OpTrack, f).v;
    const deflateOp = resolve(body1DeflateOpTrack, f).v;
    const limitOp = resolve(body1LimitOpTrack, f).v;
    const limitScale = resolve(body1LimitScaleTrack, f).v;
    const pulse = resolve(body1PulseTrack, f).v;
    const pulseScale = 1 + pulse * 0.015;

    const chars = 'ABCABCABCABCABC';
    const tileW = 70;
    const tileH = 90;
    const tileGap = 8;
    const stringCy = -260;
    const stringXs = computeHStackXs(Array(15).fill(tileW), tileGap, 0);
    const visTiles = Math.floor(stringCount);

    const copyCardCy = -100;
    const lowerCy = 230;
    const cardW = 460;
    const cardH = 120;
    const lowerXs = computeHStackXs([cardW, cardW, cardW], 60, 0);

    return (
        <g transform={`scale(${pulseScale})`}>
            {/* 文字列タイル列 */}
            <g opacity={stringOp}>
                {stringXs.map((x, i) => {
                    if (i >= visTiles) return null;
                    const isHead = i < 3;
                    const isCopy = i >= 3;
                    const headEmphasis = isHead ? 1 : 0;
                    const copyEmphasis = isCopy ? 1 : 0;
                    const fill = SURFACE;
                    const stroke = isHead && highlight > 0.3 ? MAIN : (isCopy && highlight > 0.3 ? EXEC : GRAY);
                    const strokeW = (headEmphasis * highlight + copyEmphasis * highlight) > 0.3 ? 4 : 2;
                    return (
                        <g key={i}>
                            <rect
                                x={x - tileW / 2}
                                y={stringCy - tileH / 2}
                                width={tileW}
                                height={tileH}
                                rx={10}
                                fill={fill}
                                stroke={stroke}
                                strokeWidth={strokeW}
                            />
                            <text
                                x={x}
                                y={stringCy + 18}
                                textAnchor="middle"
                                fontFamily={FONT}
                                fontSize={52}
                                fontWeight={700}
                                fill={INK}
                            >
                                {chars[i]}
                            </text>
                        </g>
                    );
                })}
            </g>
            {/* オーバーレイ: コピー矢印（後半 12 字 → 先頭 ABC） */}
            <Arrow
                fromX={(stringXs[3] + stringXs[14]) / 2}
                fromY={stringCy - tileH / 2 - 18}
                toX={stringXs[1]}
                toY={stringCy - tileH / 2 - 18}
                opacity={copyArrowOp}
                color={EXEC}
                thick={6}
                dashRatio={copyArrowDash}
                curveBow={-90}
            />
            {/* コピー指示カード */}
            <LabelCard
                cx={0}
                cy={copyCardCy}
                w={780}
                h={100}
                opacity={copyCardOp}
                label="「3 文字前にもどって 3 文字、4 回コピー」"
                accent={EXEC}
                fontSize={42}
            />
            {/* 下段 3 カード */}
            <g transform={`scale(${limitScale})`} style={{ transformOrigin: `${lowerXs[2]}px ${lowerCy}px` }}>
                <LabelCard
                    cx={lowerXs[2]}
                    cy={lowerCy}
                    w={cardW}
                    h={cardH}
                    opacity={limitOp}
                    label="1段あたり 最大 1032 倍"
                    accent={WARN}
                    fontSize={38}
                />
            </g>
            <LabelCard
                cx={lowerXs[0]}
                cy={lowerCy}
                w={cardW}
                h={cardH}
                opacity={lz77Op}
                label="LZ77 (1977)"
                accent={MAIN}
                fontSize={42}
            />
            <LabelCard
                cx={lowerXs[1]}
                cy={lowerCy}
                w={cardW}
                h={cardH}
                opacity={deflateOp}
                label="DEFLATE = LZ77 + ハフマン符号"
                accent={MAIN}
                fontSize={36}
            />
        </g>
    );
};

// =====================================================================
// ボディ2 シーン
// =====================================================================

const Body2Scene: React.FC<{ f: number }> = ({ f }) => {
    const leftHeadOp = resolve(body2LeftHeadOpTrack, f).v;
    const recExpandOp = resolve(body2RecExpandOpTrack, f).v;
    const recExpandCount = resolve(body2RecExpandCountTrack, f).v;
    const recDotsOp = resolve(body2RecDotsOpTrack, f).v;
    const recGridCount = resolve(body2RecGridCountTrack, f).v;
    const recResultOp = resolve(body2RecResultOpTrack, f).v;
    const recDefendedOp = resolve(body2RecDefendedOpTrack, f).v;
    const singleHeadOp = resolve(body2SingleHeadOpTrack, f).v;
    const singleBodyOp = resolve(body2SingleBodyOpTrack, f).v;
    const singleIndexOp = resolve(body2SingleIndexOpTrack, f).v;
    const singleArrowDash = resolve(body2SingleArrowDashTrack, f).v;
    const singlePulse = resolve(body2SinglePulseTrack, f).v;
    const singleResultOp = resolve(body2SingleResultOpTrack, f).v;
    const singleBypassOp = resolve(body2SingleBypassOpTrack, f).v;
    const singleBypassScale = resolve(body2SingleBypassScaleTrack, f).v;
    const pulse = resolve(body2PulseTrack, f).v;
    const pulseScale = 1 + pulse * 0.012;

    const colCx = [-440, 440];
    const headCy = -340;
    const cardW = 540;
    const headH = 90;
    const treeRootCy = -200;
    const recTreeRootZipW = 80;
    const recTreeRootZipH = 100;
    const recRowCy = -90;
    const recRowZipW = 50;
    const recRowZipH = 65;
    const recRowGap = 12;
    const recRowXs = computeHStackXs(Array(8).fill(recRowZipW), recRowGap, colCx[0]);
    const recDotsCy = -10;
    const recGridCy = 90;
    const recResultCy = 200;
    const recDefendedCy = 290;

    const singleBodyCy = -190;
    const singleBodyZipW = 200;
    const singleBodyZipH = 240;
    const singleIndexCy = 30;
    const singleIndexCardW = 380;
    const singleIndexCardH = 56;
    const singleIndexGap = 10;
    const singleIndexYs = computeVStackYs(
        Array(4).fill(singleIndexCardH),
        singleIndexGap,
        singleIndexCy,
    );
    const singleResultCy = 210;
    const singleBypassCy = 300;

    const collisionX = colCx[1];
    const collisionY = singleBodyCy + 70;

    return (
        <g transform={`scale(${pulseScale})`}>
            {/* 左カラム: 再帰展開型 */}
            <LabelCard
                cx={colCx[0]} cy={headCy} w={cardW} h={headH}
                opacity={leftHeadOp}
                label="再帰展開型 / 1996"
                accent={MAIN}
                fontSize={42}
            />
            {/* ルート zip 1 個 */}
            <ZipIcon
                cx={colCx[0]} cy={treeRootCy}
                w={recTreeRootZipW} h={recTreeRootZipH}
                opacity={recExpandOp}
            />
            {/* 子 8 個 */}
            <g opacity={recExpandOp}>
                {recRowXs.map((x, i) => {
                    if (i >= Math.floor(recExpandCount)) return null;
                    return (
                        <ZipIcon
                            key={i}
                            cx={x} cy={recRowCy}
                            w={recRowZipW} h={recRowZipH}
                            opacity={1}
                        />
                    );
                })}
            </g>
            {/* 5 段省略カード */}
            <LabelCard
                cx={colCx[0]} cy={recDotsCy}
                w={cardW} h={56}
                opacity={recDotsOp}
                label="× 5 段 = 約 100 万個"
                accent={MAIN}
                fontSize={34}
            />
            {/* 底のグリッド */}
            <ExecGrid
                cx={colCx[0]} cy={recGridCy}
                cols={12} rows={4} cell={14} gap={3}
                count={recGridCount}
                opacity={recDotsOp}
                color={EXEC}
            />
            {/* 結果ラベル */}
            <LabelCard
                cx={colCx[0]} cy={recResultCy}
                w={cardW} h={80}
                opacity={recResultOp}
                label="→ 4.5 PB"
                accent={EXEC}
                fontSize={44}
            />
            {/* 対策タグ */}
            <LabelCard
                cx={colCx[0]} cy={recDefendedCy}
                w={cardW} h={70}
                opacity={recDefendedOp}
                label="深さ上限で 防御済"
                accent={DEF}
                fontSize={34}
            />

            {/* 右カラム: 単発型 */}
            <LabelCard
                cx={colCx[1]} cy={headCy} w={cardW} h={headH}
                opacity={singleHeadOp}
                label="単発型 / Fifield 2019"
                accent={MAIN}
                fontSize={42}
            />
            {/* 本文 zip */}
            <ZipIcon
                cx={colCx[1]} cy={singleBodyCy}
                w={singleBodyZipW} h={singleBodyZipH}
                opacity={singleBodyOp}
            />
            {/* 目次 4 行 */}
            <g opacity={singleIndexOp}>
                {singleIndexYs.map((y, i) => (
                    <LabelCard
                        key={i}
                        cx={colCx[1]} cy={y}
                        w={singleIndexCardW} h={singleIndexCardH}
                        opacity={1}
                        label={`ファイル ${String.fromCharCode(65 + i)}`}
                        accent={GRAY}
                        fontSize={30}
                    />
                ))}
            </g>
            {/* オーバーレイ: 4 本の参照矢印が同じ位置へ収束 */}
            {singleIndexYs.map((y, i) => {
                const delayOffset = i * 7;
                const dash = Math.max(0, Math.min(1, (singleArrowDash * 70 - delayOffset) / (70 - 21)));
                return (
                    <Arrow
                        key={i}
                        fromX={colCx[1] - singleIndexCardW / 2 - 6}
                        fromY={y}
                        toX={collisionX - singleBodyZipW / 2 + 30}
                        toY={collisionY}
                        opacity={singleIndexOp}
                        color={WARN}
                        thick={4}
                        dashRatio={dash}
                        curveBow={-30 + i * 8}
                    />
                );
            })}
            {/* 衝突点の光輪 */}
            {singlePulse > 0.001 && (
                <circle
                    cx={collisionX - singleBodyZipW / 2 + 30}
                    cy={collisionY}
                    r={20 + singlePulse * 60}
                    fill="none"
                    stroke={WARN}
                    strokeWidth={4}
                    opacity={singlePulse * 0.8}
                />
            )}
            {/* 結果ラベル */}
            <LabelCard
                cx={colCx[1]} cy={singleResultCy}
                w={cardW} h={80}
                opacity={singleResultOp}
                label="10 MB → 281 TB"
                accent={EXEC}
                fontSize={42}
            />
            {/* 対策すり抜けタグ */}
            <g transform={`scale(${singleBypassScale})`} style={{ transformOrigin: `${colCx[1]}px ${singleBypassCy}px` }}>
                <LabelCard
                    cx={colCx[1]} cy={singleBypassCy}
                    w={cardW} h={70}
                    opacity={singleBypassOp}
                    label="深さ 1 で 対策をすり抜け"
                    accent={WARN}
                    fontSize={34}
                />
            </g>
        </g>
    );
};

// =====================================================================
// ボディ3 シーン
// =====================================================================

const Body3Scene: React.FC<{ f: number }> = ({ f }) => {
    const t1Op = resolve(body3Target1OpTrack, f).v;
    const t2Op = resolve(body3Target2OpTrack, f).v;
    const t3Op = resolve(body3Target3OpTrack, f).v;
    const meterFill = resolve(body3MeterFillTrack, f).v;
    const meterOp = resolve(body3MeterOpTrack, f).v;
    const def1Op = resolve(body3Def1OpTrack, f).v;
    const def2Op = resolve(body3Def2OpTrack, f).v;
    const def3Op = resolve(body3Def3OpTrack, f).v;
    const def3Scale = resolve(body3Def3ScaleTrack, f).v;
    const def4Op = resolve(body3Def4OpTrack, f).v;
    const pulse = resolve(body3PulseTrack, f).v;
    const pulseScale = 1 + pulse * 0.012;

    const cardW = 380;
    const cardH = 280;
    const targetsCy = -260;
    const targetXs = computeHStackXs([cardW, cardW, cardW], 60, 0);

    const defenseW = 1100;
    const defenseH = 62;
    const defenseGap = 12;
    const defenseYs = computeVStackYs(Array(4).fill(defenseH), defenseGap, 110);

    return (
        <g transform={`scale(${pulseScale})`}>
            <TargetCard
                cx={targetXs[0]} cy={targetsCy}
                w={cardW} h={cardH}
                opacity={t1Op}
                title="アンチウイルス"
                meterFills={[meterFill, meterFill, meterFill]}
                meterOpacity={meterOp}
            />
            <TargetCard
                cx={targetXs[1]} cy={targetsCy}
                w={cardW} h={cardH}
                opacity={t2Op}
                title="メールゲートウェイ"
                meterFills={[meterFill, meterFill, meterFill]}
                meterOpacity={meterOp}
            />
            <TargetCard
                cx={targetXs[2]} cy={targetsCy}
                w={cardW} h={cardH}
                opacity={t3Op}
                title="アップロード API"
                meterFills={[meterFill, meterFill, meterFill]}
                meterOpacity={meterOp}
            />
            <LabelCard
                cx={0} cy={defenseYs[0]}
                w={defenseW} h={defenseH}
                opacity={def1Op}
                label="サイズ上限（例: 100 MB） / 時間上限（例: 30 秒）"
                accent={DEF}
                fontSize={32}
            />
            <LabelCard
                cx={0} cy={defenseYs[1]}
                w={defenseW} h={defenseH}
                opacity={def2Op}
                label="深さ上限（再帰展開型対策）"
                accent={DEF}
                fontSize={32}
            />
            <g transform={`scale(${def3Scale})`} style={{ transformOrigin: `${0}px ${defenseYs[2]}px` }}>
                <LabelCard
                    cx={0} cy={defenseYs[2]}
                    w={defenseW} h={defenseH}
                    opacity={def3Op}
                    label="圧縮率しきい値（1000 倍超で隔離）"
                    accent={DEF}
                    fontSize={32}
                />
            </g>
            <LabelCard
                cx={0} cy={defenseYs[3]}
                w={defenseW} h={defenseH}
                opacity={def4Op}
                label="ストリーミング検査（展開しながら逐次判定）"
                accent={DEF}
                fontSize={32}
            />
        </g>
    );
};

// =====================================================================
// 結論シーン
// =====================================================================

const OutroScene: React.FC<{ f: number }> = ({ f }) => {
    const coreOp = resolve(outroCoreOpTrack, f).v;
    const f1Op = resolve(outroFamily1OpTrack, f).v;
    const f2Op = resolve(outroFamily2OpTrack, f).v;
    const f3Op = resolve(outroFamily3OpTrack, f).v;
    const pulseR = resolve(outroPulseRadiusTrack, f).v;
    const pulseOp = resolve(outroPulseOpTrack, f).v;
    const solutionOp = resolve(outroSolutionOpTrack, f).v;
    const pulse = resolve(outroPulseTrack, f).v;
    const pulseScale = 1 + pulse * 0.012;

    const coreCy = -310;
    const coreInstW = 360;
    const coreInstH = 100;
    const coreArrowW = 200;
    const coreGridCols = 12;
    const coreGridRows = 6;
    const coreGridCell = 18;
    const coreGridGap = 3;
    const coreGridW = coreGridCols * coreGridCell + (coreGridCols - 1) * coreGridGap;
    const coreXs = computeHStackXs([coreInstW, coreArrowW, coreGridW], 60, 0);

    const familyCy = -80;
    const familyW = 480;
    const familyH = 200;
    const familyXs = computeHStackXs([familyW, familyW, familyW], 50, 0);

    const solutionCy = 180;

    return (
        <g transform={`scale(${pulseScale})`}>
            {/* 非対称の核 */}
            <g opacity={coreOp}>
                <LabelCard
                    cx={coreXs[0]} cy={coreCy}
                    w={coreInstW} h={coreInstH}
                    opacity={1}
                    label="指示書: 軽い"
                    accent={MAIN}
                    fontSize={40}
                />
                <Arrow
                    fromX={coreXs[0] + coreInstW / 2 + 12}
                    fromY={coreCy}
                    toX={coreXs[2] - coreGridW / 2 - 12}
                    toY={coreCy}
                    opacity={1}
                    color={MAIN}
                    thick={6}
                    dashRatio={1}
                />
                <ExecGrid
                    cx={coreXs[2]} cy={coreCy}
                    cols={coreGridCols} rows={coreGridRows}
                    cell={coreGridCell} gap={coreGridGap}
                    count={coreGridCols * coreGridRows}
                    opacity={1}
                    color={EXEC}
                />
            </g>
            {/* 家族カード 3 枚 */}
            <FamilyCard
                cx={familyXs[0]} cy={familyCy}
                w={familyW} h={familyH}
                opacity={f1Op}
                title="zip 爆弾"
                detail="42 KB → 4.5 PB"
                pulseRadius={pulseR}
                pulseOpacity={pulseOp}
            />
            <FamilyCard
                cx={familyXs[1]} cy={familyCy}
                w={familyW} h={familyH}
                opacity={f2Op}
                title="Billion Laughs"
                detail="数 KB → 10 億回展開"
                pulseRadius={pulseR}
                pulseOpacity={pulseOp}
            />
            <FamilyCard
                cx={familyXs[2]} cy={familyCy}
                w={familyW} h={familyH}
                opacity={f3Op}
                title="ReDoS"
                detail="短い正規表現 → 天文学的計算"
                pulseRadius={pulseR}
                pulseOpacity={pulseOp}
            />
            {/* 結語帯 */}
            <LabelCard
                cx={0} cy={solutionCy}
                w={1500} h={120}
                opacity={solutionOp}
                label="対処: 指示書を最後まで実行しない（上限 / 打ち切り）"
                accent={DEF}
                fontSize={44}
            />
        </g>
    );
};

// =====================================================================
// メイン
// =====================================================================

export const ZipBomb: React.FC = () => {
    const f = useCurrentFrame();

    const introVis = resolve(introVisTrack, f).v;
    const body1Vis = resolve(body1VisTrack, f).v;
    const body2Vis = resolve(body2VisTrack, f).v;
    const body3Vis = resolve(body3VisTrack, f).v;
    const outroVis = resolve(outroVisTrack, f).v;

    return (
        <AbsoluteFill style={{ backgroundColor: BG }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
                <g opacity={introVis}>
                    <IntroScene f={f} />
                </g>
                <g opacity={body1Vis}>
                    <Body1Scene f={f} />
                </g>
                <g opacity={body2Vis}>
                    <Body2Scene f={f} />
                </g>
                <g opacity={body3Vis}>
                    <Body3Scene f={f} />
                </g>
                <g opacity={outroVis}>
                    <OutroScene f={f} />
                </g>
                <SceneTitle frame={f} />
                <Subtitle frame={f} />
            </svg>
        </AbsoluteFill>
    );
};
