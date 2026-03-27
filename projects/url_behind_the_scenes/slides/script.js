/* === URL Behind the Scenes — Presentation Controller === */
const scenes = document.querySelectorAll('.scene');
let current = 0;

function showScene(idx) {
    if (idx < 0 || idx >= scenes.length) return;
    scenes.forEach((s, i) => { s.classList.toggle('active', i === idx); });
    current = idx;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = ((idx + 1) / scenes.length * 100) + '%';
}

window.goTo = function (idx) { showScene(idx); };

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); showScene(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); showScene(current - 1); }
});

showScene(0);
