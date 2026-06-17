const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../slides/index.html');
const outputPath = path.resolve(__dirname, '../remotion/scenes/SlideScenes.tsx');

const html = fs.readFileSync(htmlPath, 'utf-8');
const sceneRegex = /<!-- ===== Scene (\d+):.*?=====\s*-->\s*([\s\S]*?)(?=<!-- ===== Scene \d+:|<script|$)/g;
const scenes = [];
let match;
while ((match = sceneRegex.exec(html)) !== null) {
    scenes.push({ id: parseInt(match[1]), html: match[2].trim() });
}
console.log('Found ' + scenes.length + ' scenes');

function htmlToJsx(h) {
    let j = h;
    j = j.replace(/<canvas[^>]*><\/canvas>/g, '');
    j = j.replace(/<!--\s*(.*?)\s*-->/g, '{/* $1 */}');
    j = j.replace(/\bclass="/g, 'className="');
    j = j.replace(/<br\s*>/g, '<br />');
    j = j.replace(/<br\/>/g, '<br />');
    j = j.replace(/<img([^>]*)(?<!\/)>/g, '<img$1 />');
    j = j.replace(/&rarr;/g, '→');
    j = j.replace(/&larr;/g, '←');
    j = j.replace(/&darr;/g, '↓');
    j = j.replace(/&uarr;/g, '↑');
    j = j.replace(/&times;/g, '×');
    j = j.replace(/&#10084;/g, '❤');
    j = j.replace(/&amp;/g, '&');
    j = j.replace(/style="--w:(\d+%)"/g, "style={{ '--w': '$1' } as React.CSSProperties}");
    j = j.replace(/style="margin-top:\s*([^";]+);?"/g, "style={{ marginTop: '$1' }}");
    j = j.replace(/style="color:\s*var\(([^)]+)\);?"/g, "style={{ color: 'var($1)' }}");
    j = j.replace(/stroke-width="/g, 'strokeWidth="');
    j = j.replace(/stroke-dasharray="/g, 'strokeDasharray="');
    j = j.replace(/stroke-dashoffset="/g, 'strokeDashoffset="');
    j = j.replace(/stroke-linecap="/g, 'strokeLinecap="');
    j = j.replace(/text-anchor="/g, 'textAnchor="');
    j = j.replace(/font-weight="/g, 'fontWeight="');
    j = j.replace(/font-size="/g, 'fontSize="');
    j = j.replace(/fill-rule="/g, 'fillRule="');
    j = j.replace(/clip-rule="/g, 'clipRule="');
    j = j.replace(/text-decoration="/g, 'textDecoration="');
    j = j.replace(/stop-color="/g, 'stopColor="');
    j = j.replace(/marker-end="/g, 'markerEnd="');
    j = j.replace(/^\s*\n/gm, '');
    return j;
}

let tsx = `import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

`;

for (const s of scenes) {
    tsx += `export const Scene${s.id}: React.FC = () => (
    <AbsoluteFill>
        ${htmlToJsx(s.html)}
    </AbsoluteFill>
);

`;
}

tsx += `export const SCENE_COMPONENTS: Record<number, React.FC> = {
${scenes.map(s => '    ' + s.id + ': Scene' + s.id + ',').join('\n')}
};

export const TOTAL_SCENE_COUNT = ${scenes.length};
`;

fs.writeFileSync(outputPath, tsx, 'utf-8');
console.log('Generated ' + outputPath + ' (' + scenes.length + ' scenes)');
