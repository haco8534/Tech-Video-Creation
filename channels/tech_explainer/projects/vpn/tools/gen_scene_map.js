const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../../../../..');
const PROJ = path.join(ROOT, 'channels/tech_explainer/projects/vpn');
const src = fs.readFileSync(path.join(PROJ, 'script/script.md'), 'utf8');
const scenes = [];
let cur = null;
src.split('\n').forEach((l) => {
    if (/^\s*```/.test(l) && l.includes('SCENE:')) return;
    const m = l.match(/<!-- SCENE: (.+?) -->/);
    if (m) {
        if (cur) scenes.push(cur);
        cur = { title: m[1].trim(), lines: [] };
        return;
    }
    const d = l.match(/^(ずんだもん|めたん)：(.+)$/);
    if (d && cur) cur.lines.push({ speaker: d[1], text: d[2] });
});
if (cur) scenes.push(cur);
scenes.forEach((s, i) => {
    s.id = i;
    if (s.lines.length === 0) s.hold_sec = 3;
});
const map = {
    voicevox_url: 'http://localhost:50021',
    speakers: { 'ずんだもん': 3, 'めたん': 2 },
    speed_scale: 1.14,
    inter_line_silence: 0.3,
    scene_end_padding: 0.5,
    scenes,
};
fs.writeFileSync(path.join(PROJ, 'slides/scene_map.json'), JSON.stringify(map, null, 2));
console.log(scenes.length + ' scenes, ' + scenes.reduce((a, s) => a + s.lines.length, 0) + ' lines');
