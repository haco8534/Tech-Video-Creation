import React, { useMemo } from 'react';
import {
    AbsoluteFill,
    Audio,
    Img,
    useCurrentFrame,
    staticFile,
    interpolate,
} from 'remotion';
import { MathLayout } from '../../components/layouts/MathLayout';
import { Subtitle } from '../../components/ui/Subtitle';
import { SUBTITLE_DATA, TOTAL_FRAMES, SubtitleEntry } from './subtitleData';
import { SCENE_COMPONENTS } from './scenes/SlideScenes';

// ============================================================
// BGM設定
// ============================================================
const BGM_VOLUME = 0.05;
const BGM_FADE_OUT_FRAMES = 90;

// ============================================================
// キャラクター設定
// ============================================================
const CHARACTER_WIDTH = 360;
const CHARACTER_BOTTOM = -60;

const CHARACTER_IMAGES: Record<string, string[]> = {
    'ずんだもん': [
        'characters/zundamon/normal2.png',
        'characters/zundamon/normal3.png',
        'characters/zundamon/normal4.png',
    ],
    'めたん': [
        'characters/metan/normal2.png',
        'characters/metan/normal3.png',
        'characters/metan/normal4.png',
    ],
};

function getImageForSpeaker(speaker: string, entryIndex: number): string {
    const variants = CHARACTER_IMAGES[speaker] ?? [];
    if (variants.length === 0) return '';
    return variants[entryIndex % variants.length];
}

// ============================================================
// 各キャラの「最後に話したセリフのインデックス」
// ============================================================
function getLastSpeakingIndex(
    frame: number,
    speaker: string,
    data: SubtitleEntry[],
): number {
    let lastIdx = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].speaker === speaker && data[i].startFrame <= frame) {
            lastIdx = i;
        }
    }
    return lastIdx;
}

// ============================================================
// 字幕取得
// ============================================================
function getCurrentSubtitle(frame: number, data: SubtitleEntry[]): SubtitleEntry | null {
    let result: SubtitleEntry | null = null;
    for (const entry of data) {
        if (entry.startFrame <= frame) { result = entry; } else { break; }
    }
    if (result) {
        const endFrame = result.startFrame + result.durationFrames + 9;
        if (frame > endFrame) return null;
    }
    return result;
}

// ============================================================
// シーンのフレーム範囲を事前計算
// ============================================================
interface SceneRange {
    sceneId: number;
    startFrame: number;
    endFrame: number;
}

function computeSceneRanges(data: SubtitleEntry[]): SceneRange[] {
    const ranges: SceneRange[] = [];
    let currentSceneId = -1;
    let sceneStart = 0;

    for (const entry of data) {
        if (entry.sceneId !== currentSceneId) {
            if (currentSceneId >= 0) {
                ranges.push({
                    sceneId: currentSceneId,
                    startFrame: sceneStart,
                    endFrame: entry.startFrame - 1,
                });
            }
            currentSceneId = entry.sceneId;
            sceneStart = entry.startFrame;
        }
    }
    // 最後のシーン
    if (currentSceneId >= 0) {
        ranges.push({
            sceneId: currentSceneId,
            startFrame: sceneStart,
            endFrame: TOTAL_FRAMES,
        });
    }
    return ranges;
}

function getCurrentSceneId(frame: number, ranges: SceneRange[]): number {
    for (const range of ranges) {
        if (frame >= range.startFrame && frame <= range.endFrame) {
            return range.sceneId;
        }
    }
    return 0;
}


// ============================================================
// メインコンポーネント
// ============================================================
export const VideoWithSlides: React.FC = () => {
    const frame = useCurrentFrame();

    // シーン範囲の事前計算（memo化）
    const sceneRanges = useMemo(() => computeSceneRanges(SUBTITLE_DATA), []);

    // 現在のシーンID
    const currentSceneId = getCurrentSceneId(frame, sceneRanges);



    // 字幕
    const currentEntry = getCurrentSubtitle(frame, SUBTITLE_DATA);
    const headerTitle = currentEntry?.sceneTitle ?? '';

    // キャラクター表情
    const zundamonIdx = getLastSpeakingIndex(frame, 'ずんだもん', SUBTITLE_DATA);
    const metanIdx = getLastSpeakingIndex(frame, 'めたん', SUBTITLE_DATA);
    const zundamonImage = getImageForSpeaker('ずんだもん', zundamonIdx);
    const metanImage = getImageForSpeaker('めたん', metanIdx);

    // シーンコンポーネント
    const CurrentSceneComponent = SCENE_COMPONENTS[currentSceneId];

    return (
        <AbsoluteFill>

            {/* ===== キャラクター立ち絵 ===== */}

            {/* めたん — 左側（左右反転） */}
            <div style={{
                position: 'absolute',
                bottom: CHARACTER_BOTTOM,
                left: 10,
                width: CHARACTER_WIDTH,
                zIndex: 20,
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.25))',
                pointerEvents: 'none',
                transform: 'scaleX(-1)',
            }}>
                <Img src={staticFile(metanImage)}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' as const }} />
            </div>

            {/* ずんだもん — 右側 */}
            <div style={{
                position: 'absolute',
                bottom: CHARACTER_BOTTOM,
                right: 10,
                width: CHARACTER_WIDTH,
                zIndex: 20,
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.25))',
                pointerEvents: 'none',
            }}>
                <Img src={staticFile(zundamonImage)}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' as const }} />
            </div>

            {/* ===== スライド描画 ===== */}
            <MathLayout title={headerTitle} videoMode
                subtitle={currentEntry ? (
                    <Subtitle speaker={currentEntry.speaker} text={currentEntry.text}
                        speakerColor={currentEntry.speakerColor} appearFrame={currentEntry.startFrame} />
                ) : <></>}
            >
                {/* key でシーン切替時にReact再マウント → CSS stagger animation がリトリガー */}
                <div key={`scene-${currentSceneId}`} style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                }}>
                    {CurrentSceneComponent && <CurrentSceneComponent />}
                </div>
            </MathLayout>

            {/* ===== ナレーション音声 ===== */}
            <Audio
                src={staticFile('audio/why_vscode_narration.wav')}
                volume={1}
            />

            {/* ===== BGM ===== */}
            <Audio
                src={staticFile('bgm/Mineral.mp3')}
                loop
                volume={(f) => {
                    const fadeOutStart = TOTAL_FRAMES - BGM_FADE_OUT_FRAMES;
                    if (f >= fadeOutStart) {
                        return interpolate(f, [fadeOutStart, TOTAL_FRAMES], [BGM_VOLUME, 0], { extrapolateRight: 'clamp' });
                    }
                    return BGM_VOLUME;
                }}
            />
        </AbsoluteFill>
    );
};

export { TOTAL_FRAMES };
