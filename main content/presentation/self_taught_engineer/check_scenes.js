const fs = require('fs');
const path = require('path');

const scriptPath = path.resolve('d:/myfolder/動画生成/技術解説/台本作成/「独学エンジニア」は本当に通用するのか？/script.md');
const htmlPath = path.resolve('d:/myfolder/動画生成/技術解説/main content/presentation/self_taught_engineer/index.html');

const script = fs.readFileSync(scriptPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptScenes = [];
script.split('\n').forEach(l => {
  if (/^\s*```/.test(l) && l.includes('SCENE:')) return;
  const m = l.match(/<!-- SCENE: (.+?) -->/);
  if (m) scriptScenes.push(m[1]);
});

const htmlSceneIds = html.match(/id="scene-\d+"/g) || [];

console.log('台本 SCENE数:', scriptScenes.length);
console.log('HTML scene数:', htmlSceneIds.length);

if (scriptScenes.length !== htmlSceneIds.length) {
  console.log('MISMATCH!');
  process.exit(1);
} else {
  console.log('OK - 一致');
}

if (/<canvas/i.test(html)) console.log('WARNING: canvas detected!');
if (/\.timeline/.test(html)) console.log('WARNING: .timeline detected!');
const css = fs.readFileSync(path.resolve('d:/myfolder/動画生成/技術解説/main content/presentation/self_taught_engineer/style.css'), 'utf8');
if (/transition\s*:/.test(css)) console.log('WARNING: transition in CSS!');
console.log('Checks complete');
