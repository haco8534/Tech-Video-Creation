// Slide navigation (preview only, not used in Remotion)
document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.scene');
    let current = 0;
    function show(idx) {
        scenes.forEach((s, i) => s.style.display = i === idx ? 'flex' : 'none');
    }
    show(0);
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === ' ') { current = Math.min(current + 1, scenes.length - 1); show(current); }
        if (e.key === 'ArrowLeft') { current = Math.max(current - 1, 0); show(current); }
    });
});
