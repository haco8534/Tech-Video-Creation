document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.scene');
    let current = 0;

    function showScene(index) {
        scenes.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        current = index;
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (current < scenes.length - 1) showScene(current + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (current > 0) showScene(current - 1);
        }
    });

    showScene(0);
});
