document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.scene');
    let current = 0;

    function show(idx) {
        scenes.forEach((s, i) => s.classList.toggle('active', i === idx));
        current = idx;
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); show(Math.min(current + 1, scenes.length - 1)); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(Math.max(current - 1, 0)); }
    });

    show(0);
});
