import React from 'react';
import { FigureLayout } from '@components/layouts/FigureLayout';
import { SUBTITLE_DATA, TOTAL_FRAMES } from './subtitleData';
import { isMouthOpen } from './lipSyncData';
import { SCENE_COMPONENTS, SCENE_TITLES } from './scenes/SlideScenes';

export const VideoWithSlides: React.FC = () => (
    <FigureLayout
        subtitleData={SUBTITLE_DATA}
        totalFrames={TOTAL_FRAMES}
        sceneComponents={SCENE_COMPONENTS}
        sceneTitles={SCENE_TITLES}
        isMouthOpen={isMouthOpen}
    />
);

export { TOTAL_FRAMES };
