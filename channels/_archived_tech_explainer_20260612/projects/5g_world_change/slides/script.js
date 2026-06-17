document.addEventListener("DOMContentLoaded", () => {
  const scenes = document.querySelectorAll('.scene');
  let current = 0;
  function show(n) {
    scenes.forEach((s, i) => s.classList.toggle('active', i === n));
    current = n;
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') show(Math.min(current + 1, scenes.length - 1));
    if (e.key === 'ArrowLeft') show(Math.max(current - 1, 0));
  });
  show(0);
});
