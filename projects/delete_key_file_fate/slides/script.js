/* === Delete Key File Fate — Presentation Controller (White Theme) === */
const scenes = document.querySelectorAll('.scene');
let current = 0;

function showScene(idx) {
    if (idx < 0 || idx >= scenes.length) return;
    scenes.forEach((s, i) => { s.classList.toggle('active', i === idx); });
    current = idx;
}

window.goTo = function (idx) { showScene(idx); };

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); showScene(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); showScene(current - 1); }
});

showScene(0);
