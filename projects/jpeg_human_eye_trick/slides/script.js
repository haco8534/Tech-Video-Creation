/* =============================================
   JPEG「人間の目を騙す」天才的な仕組み
   Presentation Script
   ============================================= */

(function () {
    'use strict';

    // ===== Scene Navigation =====
    const scenes = document.querySelectorAll('.scene');
    let currentScene = 0;

    function goTo(index) {
        if (index < 0 || index >= scenes.length) return;
        scenes.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        currentScene = index;
    }
    window.goTo = goTo;

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            goTo(currentScene + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(currentScene - 1);
        }
    });

    // ===== Canvas Background Animations =====
    function initParticleCanvas(canvasId, color, count) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
            canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 3 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.3 + 0.1
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            animId = requestAnimationFrame(draw);
        }
        draw();
    }

    initParticleCanvas('canvas-title', 'rgb(91, 76, 219)', 40);
    initParticleCanvas('canvas-emphasis1', 'rgb(91, 76, 219)', 25);
    initParticleCanvas('canvas-emphasis2', 'rgb(0, 201, 167)', 25);
    initParticleCanvas('canvas-emphasis3', 'rgb(255, 107, 107)', 25);
    initParticleCanvas('canvas-emphasis4', 'rgb(91, 76, 219)', 25);
    initParticleCanvas('canvas-ending', 'rgb(91, 76, 219)', 50);

    // ===== Dynamic Content Generation =====

    // Chroma subsampling grids (Scene 10)
    function buildChromaGrid(containerId, cols, rows, baseHue) {
        const container = document.getElementById(containerId);
        if (!container) return;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'chroma-cell';
                const lightness = 40 + Math.random() * 30;
                cell.style.backgroundColor = `hsl(${baseHue}, 60%, ${lightness}%)`;
                container.appendChild(cell);
            }
        }
    }
    buildChromaGrid('chroma-y-grid', 8, 8, 0);      // Y: grayscale-like
    buildChromaGrid('chroma-cb-grid', 4, 4, 220);     // Cb: blue
    buildChromaGrid('chroma-cr-grid', 4, 4, 0);       // Cr: red

    // Make Y grid grayscale
    const yGrid = document.getElementById('chroma-y-grid');
    if (yGrid) {
        yGrid.querySelectorAll('.chroma-cell').forEach(cell => {
            const l = 20 + Math.random() * 60;
            cell.style.backgroundColor = `hsl(0, 0%, ${l}%)`;
        });
    }

    // DCT basis grid (Scene 15)
    function buildDCTGrid() {
        const container = document.getElementById('dct-grid');
        if (!container) return;
        for (let v = 0; v < 8; v++) {
            for (let u = 0; u < 8; u++) {
                const cell = document.createElement('div');
                cell.className = 'dct-basis-cell';
                // Create a canvas for each basis function
                const cvs = document.createElement('canvas');
                cvs.width = 48;
                cvs.height = 48;
                const ctx = cvs.getContext('2d');
                for (let y = 0; y < 8; y++) {
                    for (let x = 0; x < 8; x++) {
                        const val = Math.cos((2 * x + 1) * u * Math.PI / 16) *
                            Math.cos((2 * y + 1) * v * Math.PI / 16);
                        const gray = Math.round(128 + 127 * val);
                        ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
                        ctx.fillRect(x * 6, y * 6, 6, 6);
                    }
                }
                cell.appendChild(cvs);
                container.appendChild(cell);
            }
        }
    }
    buildDCTGrid();

    // Pixel block (Scene 16)
    function buildPixelBlock() {
        const container = document.getElementById('pixel-block');
        if (!container) return;
        const pixelValues = [
            [140, 144, 152, 168, 180, 180, 172, 160],
            [148, 140, 136, 152, 172, 180, 176, 164],
            [160, 148, 132, 132, 156, 176, 180, 172],
            [172, 164, 148, 132, 140, 160, 176, 180],
            [180, 176, 168, 156, 148, 144, 156, 168],
            [176, 180, 180, 172, 164, 152, 144, 148],
            [168, 172, 180, 180, 176, 168, 156, 148],
            [156, 160, 168, 176, 180, 180, 172, 160]
        ];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                cell.className = 'block-cell block-cell--20';
                const v = pixelValues[r][c];
                cell.style.backgroundColor = `rgb(${v},${v},${v})`;
                container.appendChild(cell);
            }
        }
    }
    buildPixelBlock();

    // DCT coefficient block (Scene 16)
    function buildDCTCoeffBlock() {
        const container = document.getElementById('dct-coeff-block');
        if (!container) return;
        const coeffs = [
            [120, 8, -4, 2, 0, 0, 0, 0],
            [6, -3, 2, -1, 0, 0, 0, 0],
            [-4, 2, -1, 0, 0, 0, 0, 0],
            [1, -1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                cell.className = 'block-cell block-cell--20';
                const v = coeffs[r][c];
                const absV = Math.abs(v);
                if (absV > 10) {
                    cell.style.backgroundColor = '#5B4CDB';
                    cell.textContent = v;
                } else if (absV > 0) {
                    const opacity = 0.3 + (absV / 10) * 0.5;
                    cell.style.backgroundColor = `rgba(91,76,219,${opacity})`;
                    cell.textContent = v;
                } else {
                    cell.style.backgroundColor = '#e8e8ee';
                    cell.style.color = '#aaa';
                    cell.textContent = '0';
                }
                container.appendChild(cell);
            }
        }
    }
    buildDCTCoeffBlock();

    // Quantization table (Scene 17)
    function buildQuantTable() {
        const container = document.getElementById('quant-table');
        if (!container) return;
        const qTable = [
            [16, 11, 10, 16, 24, 40, 51, 61],
            [12, 12, 14, 19, 26, 58, 60, 55],
            [14, 13, 16, 24, 40, 57, 69, 56],
            [14, 17, 22, 29, 51, 87, 80, 62],
            [18, 22, 37, 56, 68, 109, 103, 77],
            [24, 35, 55, 64, 81, 104, 113, 92],
            [49, 64, 78, 87, 103, 121, 120, 101],
            [72, 92, 95, 98, 112, 100, 103, 99]
        ];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                cell.className = 'quant-cell';
                const v = qTable[r][c];
                cell.textContent = v;
                // Color based on value: low=teal, high=coral
                const ratio = (v - 10) / (121 - 10);
                const hue = (1 - ratio) * 160; // 160=teal, 0=coral
                cell.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
                container.appendChild(cell);
            }
        }
    }
    buildQuantTable();

    // Zigzag matrix (Scene 19)
    function buildZigzagMatrix() {
        const container = document.getElementById('zigzag-matrix');
        if (!container) return;
        const data = [
            [5, 3, 1, 0, 0, 0, 0, 0],
            [2, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                const v = data[r][c];
                cell.className = 'zigzag-cell ' + (v !== 0 ? 'zigzag-cell--nonzero' : 'zigzag-cell--zero');
                cell.textContent = v;
                cell.style.animationDelay = `${(r + c) * 0.05}s`;
                container.appendChild(cell);
            }
        }
    }
    buildZigzagMatrix();

    // Zigzag result (Scene 19)
    function buildZigzagResult() {
        const container = document.getElementById('zigzag-result');
        if (!container) return;
        const values = [5, 3, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0];
        const remaining = '...';
        let html = '';
        values.forEach((v, i) => {
            if (v === 0) {
                html += `<span class="zero-highlight">0</span>`;
            } else {
                html += `<span>${v}</span>`;
            }
            if (i < values.length - 1) html += ', ';
        });
        html += `, <span class="zero-highlight">0, 0, 0, ...</span>`;
        html += `<br><br><span style="color:var(--accent-coral);font-size:12px">→ 後半はゼロの連続！</span>`;
        container.innerHTML = html;
    }
    buildZigzagResult();

    // ===== Initialize =====
    goTo(0);

})();
