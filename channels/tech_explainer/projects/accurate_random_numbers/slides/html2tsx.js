const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, 'index.html');
const outputPath = path.resolve(__dirname, '..', 'remotion', 'scenes', 'SlideScenes.tsx');

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
    // inline style conversions
    j = j.replace(/style="--w:(\d+%)"/g, `style={{ '--w': '$1' } as React.CSSProperties}`);
    j = j.replace(/style="font-size:([^";]+);?"/g, `style={{ fontSize: '$1' }}`);
    j = j.replace(/style="margin-top:\s*([^";]+);?"/g, `style={{ marginTop: '$1' }}`);
    j = j.replace(/style="color:\s*var\(([^)]+)\);?"/g, `style={{ color: 'var($1)' }}`);
    j = j.replace(/style="border-top:([^"]+)"/g, `style={{ borderTop: '$1' }}`);
    j = j.replace(/style="border-color:var\(([^)]+)\)"/g, `style={{ borderColor: 'var($1)' }}`);
    j = j.replace(/style="background:var\(([^)]+)\)"/g, `style={{ background: 'var($1)' }}`);
    j = j.replace(/style="vertical-align:([^"]+)"/g, `style={{ verticalAlign: '$1' }}`);
    // SVG kebab-case to camelCase
    j = j.replace(/stroke-width="/g, 'strokeWidth="');
    j = j.replace(/stroke-dasharray="/g, 'strokeDasharray="');
    j = j.replace(/stroke-dashoffset="/g, 'strokeDashoffset="');
    j = j.replace(/stroke-linecap="/g, 'strokeLinecap="');
    j = j.replace(/text-anchor="/g, 'textAnchor="');
    j = j.replace(/font-weight="/g, 'fontWeight="');
    j = j.replace(/font-size="/g, 'fontSize="');
    j = j.replace(/font-family="/g, 'fontFamily="');
    j = j.replace(/fill-rule="/g, 'fillRule="');
    j = j.replace(/clip-rule="/g, 'clipRule="');
    j = j.replace(/marker-end="/g, 'markerEnd="');
    j = j.replace(/letter-spacing="/g, 'letterSpacing="');
    j = j.replace(/white-space="/g, 'whiteSpace="');
    j = j.replace(/^\s*\n/gm, '');
    return j;
}

// Handle complex inline styles that have multiple properties
function fixComplexStyles(tsx) {
    // style="font-size:28px" -> style={{ fontSize: '28px' }}
    // style="font-size:42px;..." etc
    tsx = tsx.replace(/style="([^"]+)"/g, (match, content) => {
        // Already converted
        if (content.includes('{')) return match;
        const props = content.split(';').filter(p => p.trim());
        if (props.length === 0) return match;
        const jsxProps = props.map(p => {
            const [key, ...vals] = p.split(':');
            const value = vals.join(':').trim();
            const camelKey = key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            return `${camelKey}: '${value}'`;
        }).join(', ');
        return `style={{ ${jsxProps} }}`;
    });
    return tsx;
}

let tsx = `import React from 'react';\nimport { AbsoluteFill } from 'remotion';\nimport './slides.css';\n\n`;

for (const s of scenes) {
    tsx += `export const Scene${s.id}: React.FC = () => (\n    <AbsoluteFill>\n        ${htmlToJsx(s.html)}\n    </AbsoluteFill>\n);\n\n`;
}

tsx += `export const SCENE_COMPONENTS: Record<number, React.FC> = {\n`;
tsx += scenes.map(s => `    ${s.id}: Scene${s.id},`).join('\n');
tsx += `\n};\n\nexport const TOTAL_SCENE_COUNT = ${scenes.length};\n`;

tsx = fixComplexStyles(tsx);

fs.writeFileSync(outputPath, tsx, 'utf-8');
console.log('Generated ' + outputPath + ' (' + scenes.length + ' scenes)');
