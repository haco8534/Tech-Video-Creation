const scenes = document.querySelectorAll('.scene');
let current = 0;
function show(i) {
    scenes.forEach(s => s.classList.remove('active'));
    if (scenes[i]) scenes[i].classList.add('active');
}
show(0);
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { current = Math.min(current + 1, scenes.length - 1); show(current); }
    if (e.key === 'ArrowLeft') { current = Math.max(current - 1, 0); show(current); }
});
