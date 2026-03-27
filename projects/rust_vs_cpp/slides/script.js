// script.js — スライドショー制御（Remotionでは不使用）

const scenes = document.querySelectorAll('.scene');
let current = 0;

function showScene(idx) {
    scenes.forEach((s, i) => {
        if (i === idx) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
    current = idx;
}

// キーボード操作
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        showScene(Math.min(current + 1, scenes.length - 1));
    } else if (e.key === 'ArrowLeft') {
        showScene(Math.max(current - 1, 0));
    }
});

// 初期表示
showScene(0);
