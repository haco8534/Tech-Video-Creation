// Scene navigation
const scenes = document.querySelectorAll('.scene');
let current = 0;

function showScene(idx) {
    scenes.forEach((s, i) => {
        s.classList.toggle('active', i === idx);
    });
    current = idx;
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

// Sidebar
const sidebar = document.createElement('div');
sidebar.style.cssText = 'position:fixed;top:0;right:0;width:200px;height:100vh;background:#fff;border-left:1px solid #d1d5db;overflow-y:auto;z-index:999;font-family:Zen Maru Gothic,sans-serif;padding:8px 0;';
scenes.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.textContent = `${i}: ${s.querySelector('.scene-title,.title-large')?.textContent?.substring(0, 20) || 'Scene ' + i}`;
    btn.style.cssText = 'display:block;width:100%;text-align:left;padding:6px 12px;border:none;background:none;cursor:pointer;font-size:12px;font-family:inherit;';
    btn.addEventListener('click', () => showScene(i));
    sidebar.appendChild(btn);
});
document.body.appendChild(sidebar);
