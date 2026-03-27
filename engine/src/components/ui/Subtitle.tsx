import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';

const { fontFamily } = loadFont();


export interface SubtitleProps {
    speaker: string;
    text: string;
    speakerColor?: string;
    appearFrame?: number;
}

export const Subtitle: React.FC<SubtitleProps> = ({
    text,
    speakerColor = '#60a5fa',
    appearFrame = 0,
}) => {
    const frame = useCurrentFrame();
    const localFrame = frame - appearFrame;

    // 滑らかなフェードイン: 15フレーム (0.5秒) + easeOut
    const opacity = interpolate(localFrame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // 微小な上移動で滑らかさを演出
    const translateY = interpolate(localFrame, [0, 15], [6, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
        easing: Easing.out(Easing.cubic),
    });


    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity,
                transform: `translateY(${translateY}px)`,
                fontFamily,
                width: '100%',
            }}
        >
            <span
                style={{
                    fontSize: 52,
                    color: 'white',
                    lineHeight: 1.4,
                    fontWeight: 900,
                    whiteSpace: 'pre-wrap',
                    textAlign: 'center',
                    WebkitTextStroke: `4px ${speakerColor}`,
                    paintOrder: 'stroke fill',
                }}
            >
                {text}
            </span>
        </div>
    );
};
