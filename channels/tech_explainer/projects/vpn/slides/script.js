// Scene navigation
const scenes = document.querySelectorAll('.scene');
let currentScene = 0;

function showScene(index) {
    scenes.forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });
    currentScene = index;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentScene < scenes.length - 1) showScene(currentScene + 1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentScene > 0) showScene(currentScene - 1);
    }
});

showScene(0);
