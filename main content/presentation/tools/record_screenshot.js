/**
 * record_screenshot.js
 * 
 * スクリーンショットベースの録画（image2pipe問題回避版）
 * 
 * 使い方: node tools/record_screenshot.js <project_dir> [viewport] [zoom]
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: node record_screenshot.js <project_dir> [viewport] [zoom]');
    process.exit(1);
}

const PRES_ROOT = path.resolve(__dirname, '..');
const PROJECT_DIR = path.resolve(PRES_ROOT, args[0]);
const VIEWPORT = args[1] || '1440x810';
const [WIDTH, HEIGHT] = VIEWPORT.split('x').map(Number);
const CSS_ZOOM = parseFloat(args[2]) || 2.0;

const DURATIONS_FILE = path.join(PROJECT_DIR, 'scene_durations.json');
const HTML_FILE = path.join(PROJECT_DIR, 'index.html');
const OUTPUT_FILE = path.join(PROJECT_DIR, 'recording.mp4');
const FRAMES_DIR = path.join(PROJECT_DIR, 'frames');

const FPS = 30;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
    if (!fs.existsSync(DURATIONS_FILE)) {
        console.error('scene_durations.json not found.');
        process.exit(1);
    }

    const durations = JSON.parse(fs.readFileSync(DURATIONS_FILE, 'utf-8'));
    const totalDuration = durations.reduce((a, s) => a + s.duration, 0);
    const fileUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/');

    console.log(`Project: ${PROJECT_DIR}`);
    console.log(`Viewport: ${WIDTH}x${HEIGHT} (zoom: ${CSS_ZOOM})`);
    console.log(`Total duration: ${totalDuration.toFixed(1)}s (${(totalDuration / 60).toFixed(1)}min)`);

    // Create frames directory
    if (fs.existsSync(FRAMES_DIR)) {
        fs.rmSync(FRAMES_DIR, { recursive: true });
    }
    fs.mkdirSync(FRAMES_DIR, { recursive: true });

    const vpW = Math.round(WIDTH / CSS_ZOOM);
    const vpH = Math.round(HEIGHT / CSS_ZOOM);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: [`--window-size=${WIDTH},${HEIGHT}`, '--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: vpW, height: vpH, deviceScaleFactor: CSS_ZOOM });
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));
    await sleep(2000);

    let frameCount = 0;
    const startTime = Date.now();

    for (let si = 0; si < durations.length; si++) {
        const scene = durations[si];
        const sceneFrames = Math.ceil(scene.duration * FPS);

        // Navigate to scene
        await page.evaluate((idx) => window.goTo(idx), scene.id);
        
        // Wait for CSS transition
        await sleep(100);

        // Take screenshot for this scene (static content = same frame)
        const screenshot = await page.screenshot({ type: 'jpeg', quality: 95 });

        // Write the same frame for the entire scene duration
        for (let f = 0; f < sceneFrames; f++) {
            const framePath = path.join(FRAMES_DIR, `frame_${String(frameCount).padStart(6, '0')}.jpg`);
            fs.writeFileSync(framePath, screenshot);
            frameCount++;
        }

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        console.log(`  Scene ${scene.id} "${scene.title}": ${sceneFrames} frames (total: ${frameCount}, ${elapsed}s)`);
    }

    console.log(`\nTotal frames: ${frameCount}`);

    // Close browser
    try { await browser.close(); } catch (e) { }

    // Use ffmpeg to create video from frames
    console.log('Creating video from frames...');
    const inputPattern = path.join(FRAMES_DIR, 'frame_%06d.jpg');

    try {
        execFileSync('ffmpeg', [
            '-y',
            '-framerate', String(FPS),
            '-i', inputPattern,
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-crf', '20',
            '-pix_fmt', 'yuv420p',
            '-r', String(FPS),
            OUTPUT_FILE,
        ], { stdio: 'inherit' });
    } catch (e) {
        console.error('ffmpeg error:', e.message);
        process.exit(1);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
    console.log(`\n=== Recording complete! ===`);
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log(`Frames: ${frameCount} (${(frameCount / FPS / 60).toFixed(1)}min)`);
    console.log(`Time: ${elapsed}s (${(elapsed / 60).toFixed(1)}min)`);

    // Cleanup frames
    console.log('Cleaning up frames...');
    fs.rmSync(FRAMES_DIR, { recursive: true });
    console.log('Done!');
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
