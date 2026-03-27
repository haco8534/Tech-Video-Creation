// Docker Popularity - Scene Controller
// Keyboard navigation for presentation preview

(function() {
    const scenes = document.querySelectorAll('.scene');
    let currentScene = 0;

    function showScene(index) {
        scenes.forEach((scene, i) => {
            scene.style.display = i === index ? 'flex' : 'none';
        });
    }

    // Initialize: show first scene only
    showScene(0);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            if (currentScene < scenes.length - 1) {
                currentScene++;
                showScene(currentScene);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentScene > 0) {
                currentScene--;
                showScene(currentScene);
            }
        } else if (e.key === 'Home') {
            e.preventDefault();
            currentScene = 0;
            showScene(currentScene);
        } else if (e.key === 'End') {
            e.preventDefault();
            currentScene = scenes.length - 1;
            showScene(currentScene);
        }
    });

    console.log(`Presentation loaded: ${scenes.length} scenes`);
})();
