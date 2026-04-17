document.addEventListener('DOMContentLoaded', () => {
  const scenes = document.querySelectorAll('.scene');
  let current = 0;
  function showScene(idx) {
    scenes.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
    current = idx;
  }
  showScene(0);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      showScene(Math.min(current + 1, scenes.length - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showScene(Math.max(current - 1, 0));
    }
  });
});
