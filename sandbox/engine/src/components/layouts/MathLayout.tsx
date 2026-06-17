import React from 'react';
import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';

const { fontFamily } = loadFont();

const SUBTITLE_AREA_HEIGHT = 200;

export const MathLayout: React.FC<{
    title?: string;
    children: React.ReactNode;
    subtitle?: React.ReactNode;
    videoMode?: boolean;
}> = ({ title, children, subtitle, videoMode = false }) => {
    return (
        <AbsoluteFill style={{
            backgroundColor: '#0f0f0f',
            fontFamily,
        }}>

            {/* メインコンテンツエリア */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: subtitle !== undefined ? SUBTITLE_AREA_HEIGHT : 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: videoMode ? 0 : '40px 60px',
                        boxSizing: 'border-box',
                        color: '#e8e8e8',
                        overflow: videoMode ? 'hidden' : 'visible',
                        borderRadius: videoMode ? 0 : 12,
                    }}
                >
                    {children}
                </div>

                {/* シーンタイトル — 左上に大きく */}
                {title && (
                    <div style={{
                        position: 'absolute',
                        top: 40,
                        left: 40,
                        fontSize: 36,
                        fontWeight: 900,
                        color: '#ffffff',
                        WebkitTextStroke: '5px #ff4281',
                        paintOrder: 'stroke fill',
                        fontFamily,
                        letterSpacing: 2,
                        zIndex: 10,
                        backgroundColor: '#ffffff',
                        border: '5px solid #ff4281',
                        borderRadius: 20,
                        padding: '6px 32px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        maxWidth: 'calc(100% - 80px)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {title}
                    </div>
                )}
            </div>

            {/* 字幕エリア — 高さ200px、黒で少し透過 */}
            {subtitle !== undefined && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: SUBTITLE_AREA_HEIGHT,
                        backgroundColor: 'rgba(227, 226, 245, 0.92)',
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 48,
                        paddingRight: 48,
                        boxSizing: 'border-box',
                    }}
                >
                    {subtitle}
                </div>
            )}

        </AbsoluteFill>
    );
};
