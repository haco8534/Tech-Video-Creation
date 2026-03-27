const fs = require('fs');
// 使い方: PROJECT_ID環境変数 or 引数で指定
const PROJECT_ID = process.argv[2] || 'why_700_programming_languages';
const htmlPaths = `projects/${PROJECT_ID}/slides/index.html`;
const outPath = `projects/${PROJECT_ID}/remotion/scenes/SlideScenes.tsx`;

let html = fs.readFileSync(htmlPaths, 'utf8');

let outTsx = `import React from 'react';
import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import './slides.css';

loadFont();

`;

const scenes = [];
const parts = html.split(/<!-- ===== Scene \d+: .*? ===== -->/);

parts.forEach((part) => {
    if(!part.includes('class="scene')) return;
    
    let jsx = part.trim();
    jsx = jsx.replace(/<script src="script\.js"><\/script>\s*<\/body>\s*<\/html>/, '');
    jsx = jsx.trim();
    
    jsx = jsx.replace(/class=/g, 'className=');
    jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
        const styles = p1.split(';').filter(s => s.trim() !== '');
        const styleObj = {};
        styles.forEach(s => {
            const [k, v] = s.split(':').map(str => str.trim());
            if (!k || !v) return;
            let camelK = k;
            if(!k.startsWith('--')) {
                camelK = k.replace(/-([a-z])/g, g => g[1].toUpperCase());
            }
            if (v.includes('var(')) {
                styleObj[camelK] = v; // Will be string
            } else {
                styleObj[camelK] = v;
            }
        });
        // We need to output valid JSON but without quotes on keys if possible, or just JSON.stringify it.
        // Wait, for CSS variables like --w, React accepts them only if type is React.CSSProperties, so we cast it.
        let hasCssVar = Object.keys(styleObj).some(k => k.startsWith('--'));
        let jsonStr = JSON.stringify(styleObj);
        if (hasCssVar) {
            return `style={${jsonStr} as React.CSSProperties}`;
        }
        return `style={${jsonStr}}`;
    });
    
    // Fix SVG properties
    jsx = jsx.replace(/ stroke-width=/g, ' strokeWidth=');
    jsx = jsx.replace(/ fill-opacity=/g, ' fillOpacity=');
    jsx = jsx.replace(/ stroke-dasharray=/g, ' strokeDasharray=');
    jsx = jsx.replace(/ stroke-linejoin=/g, ' strokeLinejoin=');
    jsx = jsx.replace(/ stroke-linecap=/g, ' strokeLinecap=');
    
    // Self-close tags
    jsx = jsx.replace(/<br>/g, '<br />');
    jsx = jsx.replace(/<hr>/g, '<hr />');
    // For path, we need <path ... /> instead of <path ...></path> or <path ...> if it's missing close
    // HTML in my example has <path d="..." /> if it was written so, wait.
    // In index.html, did I use <path d="..." /> ? Let's check view_file.
    // `<path d="M16 18l6-6-6-6"/>` <--- already self-closed!
    // What about img? No images.
    
    // Ensure all opening tags match closing tags -> it's valid HTML, should map perfectly.
    
    outTsx += `export const Scene${scenes.length}: React.FC = () => (\n    <AbsoluteFill>\n        ${jsx}\n    </AbsoluteFill>\n);\n\n`;
    scenes.push(`Scene${scenes.length}`);
});

outTsx += `export const SCENE_COMPONENTS: Record<number, React.FC> = {\n`;
scenes.forEach((s, i) => {
    outTsx += `    ${i}: ${s},\n`;
});
outTsx += `};\n\n`;
outTsx += `export const TOTAL_SCENE_COUNT = ${scenes.length};\n`;

fs.writeFileSync(outPath, outTsx);
console.log('Converted ' + scenes.length + ' scenes.');
