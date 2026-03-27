document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.scene');
    let current = 0;
    const total = scenes.length;

    function showScene(idx) {
        scenes.forEach((s, i) => {
            s.classList.toggle('active', i === idx);
        });
        document.getElementById('scene-counter').textContent = `${idx + 1} / ${total}`;
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            current = Math.min(current + 1, total - 1);
            showScene(current);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            current = Math.max(current - 1, 0);
            showScene(current);
        }
    });

    // Sidebar
    const sidebar = document.getElementById('sidebar');
    scenes.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.className = 'sidebar-btn';
        btn.textContent = s.dataset.title || `Scene ${i}`;
        btn.addEventListener('click', () => {
            current = i;
            showScene(current);
            document.querySelectorAll('.sidebar-btn').forEach((b, j) => {
                b.classList.toggle('active', j === i);
            });
        });
        sidebar.appendChild(btn);
    });

    showScene(0);
});
