// USB Connector Diversity - Presentation Script
(function() {
    let current = 0;
    const scenes = document.querySelectorAll('.scene');
    if (scenes.length > 0) scenes[0].classList.add('active');

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (current < scenes.length - 1) {
                scenes[current].classList.remove('active');
                current++;
                scenes[current].classList.add('active');
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (current > 0) {
                scenes[current].classList.remove('active');
                current--;
                scenes[current].classList.add('active');
            }
        }
    });
})();
