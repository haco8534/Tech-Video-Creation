const fs = require('fs');
const path = require('path');
const PROJ = path.resolve(__dirname, '..');
const d = JSON.parse(fs.readFileSync(path.join(PROJ, 'slides/scene_durations.json'), 'utf8'));
let t = 0;
d.forEach(s => {
    const m = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    console.log(String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + ' [Scene ' + s.id + '] ' + s.title);
    t += s.duration;
});
console.log('\n総尺: ' + Math.floor(t / 60) + '分' + Math.floor(t % 60) + '秒');
