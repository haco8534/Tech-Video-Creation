import React from 'react';
import {
    AbsoluteFill,
    Audio,
    Img,
    OffthreadVideo,
    useCurrentFrame,
    staticFile,
    interpolate,
} from 'remotion';
import { MathLayout } from '../../components/layouts/MathLayout';
import { Subtitle } from '../../components/ui/Subtitle';
import { SUBTITLE_DATA, TOTAL_FRAMES, SubtitleEntry } from './subtitleData';

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
// 各キャラの「最後に話したセリフのインデックス」を事前計算
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
// メインコンポーネント
// ============================================================
export const VideoWithSubtitles: React.FC = () => {
    const frame = useCurrentFrame();
    const currentEntry = getCurrentSubtitle(frame, SUBTITLE_DATA);
    const headerTitle = currentEntry?.sceneTitle ?? '';

    // 各キャラの表情 — そのキャラが喋っている時だけ変化、聞き側は固定
    const zundamonIdx = getLastSpeakingIndex(frame, 'ずんだもん', SUBTITLE_DATA);
    const metanIdx = getLastSpeakingIndex(frame, 'めたん', SUBTITLE_DATA);
    const zundamonImage = getImageForSpeaker('ずんだもん', zundamonIdx);
    const metanImage = getImageForSpeaker('めたん', metanIdx);

    return (
        <AbsoluteFill>

            {/* ===== キャラクター立ち絵（常に表示、アニメーションなし） ===== */}

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

            {/* ===== レイアウト + 動画 + 字幕 ===== */}
            {/* subtitle に常に空の <></> を渡して字幕エリアを維持し、レイアウト変動を防ぐ */}
            <MathLayout title={headerTitle} videoMode
                subtitle={currentEntry ? (
                    <Subtitle speaker={currentEntry.speaker} text={currentEntry.text}
                        speakerColor={currentEntry.speakerColor} appearFrame={currentEntry.startFrame} />
                ) : <></>}
            >
                <OffthreadVideo
                    src={staticFile('videos/why_vscode.mp4')}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
            </MathLayout>

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
