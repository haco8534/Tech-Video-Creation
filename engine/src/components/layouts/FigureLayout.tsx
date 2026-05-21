import React, { useMemo } from 'react';
import {
    AbsoluteFill,
    Audio,
    Img,
    Sequence,
    useCurrentFrame,
    staticFile,
    interpolate,
} from 'remotion';
import { Subtitle } from '../ui/Subtitle';

export interface SubtitleEntry {
    startFrame: number;
    durationFrames: number;
    speaker: string;
    text: string;
    speakerColor: string;
    sceneId: number;
    sceneTitle: string;
    audioFile: string | null;
}

export interface SceneProps {
    localFrame: number;
    sceneLength: number;
}

export interface FigureLayoutProps {
    subtitleData: SubtitleEntry[];
    totalFrames: number;
    sceneComponents: React.FC<SceneProps>[];
    sceneTitles: string[];
    isMouthOpen: (audioFile: string, frameInAudio: number) => boolean;
    bgmPath?: string;
    bgmVolume?: number;
    bgmFadeOutFrames?: number;
}

const CHAR_WIDTH = 340;
const CHAR_BOTTOM = -60;
const SUBTITLE_AREA_HEIGHT = 200;
const HEADER_ACCENT = '#ff4281';

const CHARACTER_IMAGES: Record<string, { open: string; close: string }[]> = {
    'ずんだもん': [
        { open: 'characters/zundamon/default-open.png', close: 'characters/zundamon/default-close.png' },
        { open: 'characters/zundamon/normal2-open.png', close: 'characters/zundamon/normal2-close.png' },
        { open: 'characters/zundamon/normal3-open.png', close: 'characters/zundamon/normal3-close.png' },
        { open: 'characters/zundamon/normal4-open.png', close: 'characters/zundamon/normal4-close.png' },
    ],
    'めたん': [
        { open: 'characters/metan/default-open.png', close: 'characters/metan/default-close.png' },
        { open: 'characters/metan/normal2-open.png', close: 'characters/metan/normal2-close.png' },
        { open: 'characters/metan/normal3-open.png', close: 'characters/metan/normal3-close.png' },
        { open: 'characters/metan/normal4-open.png', close: 'characters/metan/normal4-close.png' },
    ],
};

const FRAME_STYLE: React.CSSProperties = {
    background: 'radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F2F5FB 55%, #E8EDF5 100%)',
    color: '#1E2434',
    fontFamily: '"Zen Maru Gothic", "Noto Sans JP", sans-serif',
    overflow: 'hidden',
};

function getImage(
    speaker: string, entryIdx: number, speaking: boolean,
    frame: number, audioFile: string | null, audioStart: number,
    isMouthOpen: FigureLayoutProps['isMouthOpen'],
): string {
    const variants = CHARACTER_IMAGES[speaker] ?? [];
    if (variants.length === 0) return '';
    const v = variants[entryIdx % variants.length];
    if (!speaking || !audioFile) return v.close;
    return isMouthOpen(audioFile, frame - audioStart) ? v.open : v.close;
}

function lastSpeakingIndex(frame: number, speaker: string, data: SubtitleEntry[]): number {
    let idx = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].speaker === speaker && data[i].startFrame <= frame) idx = i;
    }
    return idx;
}

function currentSubtitle(frame: number, data: SubtitleEntry[]): SubtitleEntry | null {
    let result: SubtitleEntry | null = null;
    for (const e of data) {
        if (e.startFrame <= frame) result = e; else break;
    }
    if (result) {
        const endFrame = result.startFrame + result.durationFrames + 9;
        if (frame > endFrame) return null;
    }
    return result;
}

interface SceneRange { sceneId: number; startFrame: number; endFrame: number; }

function computeSceneRanges(data: SubtitleEntry[], totalFrames: number): SceneRange[] {
    const ranges: SceneRange[] = [];
    let curId = -1;
    let start = 0;
    for (const e of data) {
        if (e.sceneId !== curId) {
            if (curId >= 0) ranges.push({ sceneId: curId, startFrame: start, endFrame: e.startFrame - 1 });
            curId = e.sceneId;
            start = e.startFrame;
        }
    }
    if (curId >= 0) ranges.push({ sceneId: curId, startFrame: start, endFrame: totalFrames });
    return ranges;
}

function sceneIdAt(frame: number, ranges: SceneRange[]): number {
    for (const r of ranges) {
        if (frame >= r.startFrame && frame <= r.endFrame) return r.sceneId;
    }
    return 0;
}

const Header: React.FC<{ title: string; frame: number; sceneStart: number }> = ({
    title, frame, sceneStart,
}) => {
    const local = frame - sceneStart;
    const slide = interpolate(local, [0, 20], [-12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const opacity = interpolate(local, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
        <div style={{
            position: 'absolute', top: 40, left: 40, zIndex: 10,
            transform: `translateY(${slide}px)`, opacity,
            fontSize: 36, fontWeight: 900,
            color: '#ffffff',
            WebkitTextStroke: `5px ${HEADER_ACCENT}`,
            paintOrder: 'stroke fill',
            letterSpacing: 2,
            backgroundColor: '#ffffff',
            border: `5px solid ${HEADER_ACCENT}`,
            borderRadius: 20,
            padding: '6px 32px',
            boxShadow: '0 8px 32px rgba(17, 24, 39, 0.18)',
            maxWidth: 'calc(100% - 80px)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
            {title}
        </div>
    );
};

export const FigureLayout: React.FC<FigureLayoutProps> = ({
    subtitleData, totalFrames, sceneComponents, sceneTitles, isMouthOpen,
    bgmPath = 'bgm/Mineral.mp3', bgmVolume = 0.05, bgmFadeOutFrames = 90,
}) => {
    const frame = useCurrentFrame();
    const ranges = useMemo(() => computeSceneRanges(subtitleData, totalFrames), [subtitleData, totalFrames]);
    const sceneId = sceneIdAt(frame, ranges);
    const range = ranges.find(r => r.sceneId === sceneId);
    const sceneStart = range?.startFrame ?? 0;
    const sceneEnd = range?.endFrame ?? totalFrames;

    const entry = currentSubtitle(frame, subtitleData);
    const title = entry?.sceneTitle ?? sceneTitles[sceneId] ?? '';

    const zIdx = lastSpeakingIndex(frame, 'ずんだもん', subtitleData);
    const mIdx = lastSpeakingIndex(frame, 'めたん', subtitleData);
    const zSpeaking = entry?.speaker === 'ずんだもん';
    const mSpeaking = entry?.speaker === 'めたん';
    const zImg = getImage('ずんだもん', zIdx, zSpeaking, frame,
        zSpeaking ? entry?.audioFile ?? null : null, zSpeaking ? entry?.startFrame ?? 0 : 0, isMouthOpen);
    const mImg = getImage('めたん', mIdx, mSpeaking, frame,
        mSpeaking ? entry?.audioFile ?? null : null, mSpeaking ? entry?.startFrame ?? 0 : 0, isMouthOpen);

    const SceneComponent = sceneComponents[sceneId];
    const sceneLen = sceneEnd - sceneStart + 1;
    const localFrame = frame - sceneStart;

    return (
        <AbsoluteFill style={FRAME_STYLE}>
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(17,24,39,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(17,24,39,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 70%)',
            }} />

            <div key={`scene-${sceneId}`} style={{ position: 'absolute', inset: 0 }}>
                {SceneComponent && <SceneComponent localFrame={localFrame} sceneLength={sceneLen} />}
            </div>

            <Header title={title} frame={frame} sceneStart={sceneStart} />

            <div style={{
                position: 'absolute', bottom: CHAR_BOTTOM - 70, left: 10, width: CHAR_WIDTH,
                zIndex: 20,
                filter: 'drop-shadow(0 6px 20px rgba(17,24,39,0.18))',
                pointerEvents: 'none',
                transform: 'scaleX(-1)',
            }}>
                <Img src={staticFile(mImg)} style={{ width: '100%', height: 'auto' }} />
            </div>
            <div style={{
                position: 'absolute', bottom: CHAR_BOTTOM, right: 10, width: CHAR_WIDTH,
                zIndex: 20,
                filter: 'drop-shadow(0 6px 20px rgba(17,24,39,0.18))',
                pointerEvents: 'none',
            }}>
                <Img src={staticFile(zImg)} style={{ width: '100%', height: 'auto' }} />
            </div>

            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: SUBTITLE_AREA_HEIGHT,
                backgroundColor: 'rgba(227, 226, 245, 0.92)',
                zIndex: 25,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                paddingLeft: 48, paddingRight: 48, boxSizing: 'border-box',
            }}>
                {entry && (
                    <Subtitle
                        speaker={entry.speaker}
                        text={entry.text}
                        speakerColor={entry.speakerColor}
                        appearFrame={entry.startFrame}
                    />
                )}
            </div>

            {subtitleData.map((e, i) =>
                e.audioFile ? (
                    <Sequence key={`a-${i}`} from={e.startFrame} durationInFrames={e.durationFrames + 15}>
                        <Audio src={staticFile(e.audioFile)} volume={1} />
                    </Sequence>
                ) : null
            )}

            <Audio src={staticFile(bgmPath)} loop
                volume={(f) => {
                    const fadeStart = totalFrames - bgmFadeOutFrames;
                    if (f >= fadeStart) {
                        return interpolate(f, [fadeStart, totalFrames], [bgmVolume, 0], { extrapolateRight: 'clamp' });
                    }
                    return bgmVolume;
                }}
            />
        </AbsoluteFill>
    );
};
