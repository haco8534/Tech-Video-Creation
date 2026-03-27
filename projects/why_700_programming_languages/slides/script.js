// Simple scene navigation
document.addEventListener('keydown', (e) => {
    const scenes = document.querySelectorAll('.scene');
    let current = [...scenes].findIndex(s => s.classList.contains('active'));
    if (current === -1) current = 0;
    if (e.key === 'ArrowRight' || e.key === ' ') {
        scenes[current]?.classList.remove('active');
        scenes[Math.min(current + 1, scenes.length - 1)]?.classList.add('active');
    } else if (e.key === 'ArrowLeft') {
        scenes[current]?.classList.remove('active');
        scenes[Math.max(current - 1, 0)]?.classList.add('active');
    }
});
// Auto-activate first scene
document.querySelector('.scene')?.classList.add('active');
