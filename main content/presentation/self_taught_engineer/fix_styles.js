const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/myfolder/動画生成/技術解説/Remotion/src/projects/self_taught_engineer/scenes/SlideScenes.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix remaining HTML-style inline styles that weren't converted
// Pattern: style="property: value; property: value; ..."
// Replace with: style={{ camelCase: 'value', ... }}

function convertStyleString(styleStr) {
  const props = styleStr.split(';').filter(s => s.trim());
  const pairs = props.map(p => {
    const [key, ...valParts] = p.split(':');
    const k = key.trim();
    const v = valParts.join(':').trim();
    // Convert kebab-case to camelCase
    const camelKey = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return `${camelKey}: '${v}'`;
  });
  return `{{ ${pairs.join(', ')} }}`;
}

// Match style="..." but NOT style={{ (already converted)
const regex = /style="([^"]+)"/g;
let match;
const replacements = [];

while ((match = regex.exec(content)) !== null) {
  const full = match[0];
  const styleStr = match[1];
  const replacement = `style=${convertStyleString(styleStr)}`;
  replacements.push({ from: full, to: replacement });
}

console.log(`Found ${replacements.length} unconverted style attributes`);

for (const r of replacements) {
  content = content.replace(r.from, r.to);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed all inline styles');
