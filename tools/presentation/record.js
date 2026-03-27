/**
 * record.js (v4 - parallel + transition capture)
 * 
 * 複数ブラウザで並列録画し、ffmpegで結合する。
 * シーン遷移のフェードインも含めて録画する。
 * 
 * 使い方: node tools/record.js <project_dir> [workers] [viewport] [zoom]
 *   project_dir: テーマ名 (例: llm_text_generation)
 *   workers:     並列数 (デフォルト: 4)
 *   viewport:    WxH (デフォルト: 1440x810, 16:9)
 *   zoom:        CSS zoom倍率 (デフォルト: 1.3, コンテンツ拡大用)
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { spawn, execFileSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: node record.js <project_dir> [workers] [viewport]');
    process.exit(1);
}

const PRES_ROOT = path.resolve(__dirname, '..');
const PROJECT_DIR = path.resolve(PRES_ROOT, args[0]);
const NUM_WORKERS = parseInt(args[1]) || 4;
const VIEWPORT = args[2] || '1440x810';
const [WIDTH, HEIGHT] = VIEWPORT.split('x').map(Number);
const CSS_ZOOM = parseFloat(args[3]) || 2.0;

const DURATIONS_FILE = path.join(PROJECT_DIR, 'scene_durations.json');
const HTML_FILE = path.join(PROJECT_DIR, 'index.html');
const OUTPUT_FILE = path.join(PROJECT_DIR, 'recording.mp4');
const CHUNKS_DIR = path.join(PROJECT_DIR, 'chunks');

const FPS = 30;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/**
 * Record a chunk of scenes in a single browser instance
 */
async function recordChunk(chunkId, scenes, fileUrl, outputPath) {
    // Use deviceScaleFactor to scale content (must divide 1920 and 1080 evenly)
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
    // Force resize event for any responsive scripts
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));
    await sleep(2000);

    // Start ffmpeg
    const ffmpeg = spawn('ffmpeg', [
        '-y', '-f', 'image2pipe', '-framerate', String(FPS),
        '-i', 'pipe:0',
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '20',
        '-pix_fmt', 'yuv420p', '-r', String(FPS),
        outputPath,
    ], { stdio: ['pipe', 'ignore', 'ignore'] });

    // EPIPE等のstdinエラーは無視
    ffmpeg.stdin.on('error', (e) => {
        if (e.code !== 'EPIPE') console.warn(`  [Worker ${chunkId}] stdin error: ${e.code}`);
    });

    let ffmpegExitCode = null;
    const ffmpegDone = new Promise((resolve, reject) => {
        ffmpeg.on('close', (code) => {
            ffmpegExitCode = code;
            if (code === 0) resolve();
            else {
                console.warn(`  [Worker ${chunkId}] ffmpeg exit ${code}`);
                reject(new Error(`ffmpeg exit ${code}`));
            }
        });
    });


    // CDP screencast
    const cdp = await page.createCDPSession();
    let latestFrameBuffer = null;

    cdp.on('Page.screencastFrame', async (event) => {
        latestFrameBuffer = Buffer.from(event.data, 'base64');
        try { await cdp.send('Page.screencastFrameAck', { sessionId: event.sessionId }); } catch (e) { }
    });

    await cdp.send('Page.startScreencast', {
        format: 'jpeg', quality: 90,
        maxWidth: WIDTH, maxHeight: HEIGHT, everyNthFrame: 1,
    });

    while (!latestFrameBuffer) await sleep(50);

    const frameInterval = 1000 / FPS;
    let frameCount = 0;

    // Navigate to scene BEFORE the first scene to set up state
    // (so first scene transition is captured)
    const firstSceneId = scenes[0].id;
    if (firstSceneId > 0) {
        // Initialize by briefly visiting first scene, then go to prev scene
        await page.evaluate((idx) => window.goTo(idx), firstSceneId);
        await sleep(1500);
        await page.evaluate((idx) => window.goTo(idx), firstSceneId - 1);
        await sleep(1500);
    }

    for (let si = 0; si < scenes.length; si++) {
        const scene = scenes[si];
        // Total frames = scene duration only (transition is within the duration)
        const sceneFrames = Math.ceil(scene.duration * FPS);

        // Navigate to scene - DON'T wait, capture the transition!
        await page.evaluate((idx) => window.goTo(idx), scene.id);

        // Capture all frames (transition animation plays within scene duration)
        for (let f = 0; f < sceneFrames; f++) {
            if (latestFrameBuffer && !ffmpeg.stdin.destroyed) {
                const ok = ffmpeg.stdin.write(latestFrameBuffer);
                if (!ok) await new Promise(r => ffmpeg.stdin.once('drain', r));
                frameCount++;
            }
            await sleep(frameInterval);
        }

        console.log(`  [Worker ${chunkId}] Scene ${scene.id} "${scene.title}": done`);
    }

    try { await cdp.send('Page.stopScreencast'); } catch (e) { }

    // ffmpegにstdinを閉じて終了を通知し、確実に完了するまで待つ
    ffmpeg.stdin.end();
    console.log(`  [Worker ${chunkId}] Waiting for ffmpeg to finish writing...`);
    await Promise.race([
        ffmpegDone,
        new Promise((_, reject) => setTimeout(() => reject(new Error('ffmpeg timeout')), 180000))
    ]).catch(err => console.warn(`  [Worker ${chunkId}] ffmpeg: ${err.message}`));

    // ffmpegが完全に書き込み終わった後にブラウザを閉じる
    try {
        await Promise.race([
            browser.close(),
            new Promise(r => setTimeout(r, 5000))
        ]);
    } catch (e) { }
    try { browser.process()?.kill('SIGKILL'); } catch (e) { }

    console.log(`  [Worker ${chunkId}] Done. Total frames: ${frameCount}`);
    return frameCount;
}

async function main() {
    if (!fs.existsSync(DURATIONS_FILE)) {
        console.error('scene_durations.json not found. Run generate_audio.js first.');
        process.exit(1);
    }

    const durations = JSON.parse(fs.readFileSync(DURATIONS_FILE, 'utf-8'));
    const totalDuration = durations.reduce((a, s) => a + s.duration, 0);
    const fileUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/');

    console.log(`Project: ${PROJECT_DIR}`);
    console.log(`Viewport: ${WIDTH}x${HEIGHT} (zoom: ${CSS_ZOOM})`);
    console.log(`Total duration: ${totalDuration.toFixed(1)}s (${(totalDuration / 60).toFixed(1)}min)`);
    console.log(`Workers: ${NUM_WORKERS}\n`);

    // Clean chunks directory (only delete broken chunks; keep valid ones)
    if (!fs.existsSync(CHUNKS_DIR)) fs.mkdirSync(CHUNKS_DIR, { recursive: true });

    // Split scenes into chunks for parallel recording
    const scenesPerWorker = Math.ceil(durations.length / NUM_WORKERS);
    const chunks = [];
    for (let i = 0; i < NUM_WORKERS; i++) {
        const start = i * scenesPerWorker;
        const end = Math.min(start + scenesPerWorker, durations.length);
        if (start < durations.length) {
            chunks.push(durations.slice(start, end));
        }
    }

    console.log(`Split into ${chunks.length} chunks:`);
    chunks.forEach((c, i) => {
        const dur = c.reduce((a, s) => a + s.duration, 0);
        console.log(`  Chunk ${i}: scenes ${c[0].id}-${c[c.length - 1].id} (${dur.toFixed(1)}s)`);
    });
    console.log('');

    // Record ALL CHUNKS IN PARALLEL for maximum speed
    console.log(`Recording ${chunks.length} chunks in PARALLEL...`);
    const startTime = Date.now();

    const promises = chunks.map(async (scenes, i) => {
        const chunkPath = path.join(CHUNKS_DIR, `chunk_${String(i).padStart(2, '0')}.mkv`);

        // 既存の正常なチャンクはスキップ
        if (fs.existsSync(chunkPath) && fs.statSync(chunkPath).size > 1024 * 1024) {
            try {
                const dur = parseFloat(require('child_process').execFileSync('ffprobe', [
                    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', chunkPath
                ], { encoding: 'utf-8' }).trim());
                if (!isNaN(dur) && dur > 10) {
                    console.log(`  Chunk ${i}: SKIPPED (already valid, ${dur.toFixed(1)}s)`);
                    const totalFrames = Math.round(dur * FPS);
                    return { id: i, frames: totalFrames, path: chunkPath };
                }
            } catch (e) { /* 読めないので再録画 */ }
        }

        console.log(`  --> Recording Chunk ${i} (${scenes.length} scenes) ...`);
        const frames = await recordChunk(i, scenes, fileUrl, chunkPath);
        return { id: i, frames, path: chunkPath };
    });

    const results = (await Promise.all(promises)).sort((a, b) => a.id - b.id);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
    console.log(`\nAll chunks recorded in ${elapsed}s`);

    // Concatenate chunks
    console.log('Concatenating chunks...');
    const concatList = path.join(CHUNKS_DIR, 'concat_list.txt');
    const listContent = results.map(r => `file '${r.path.replace(/\\/g, '/')}'`).join('\n');
    fs.writeFileSync(concatList, listContent, 'utf-8');

    execFileSync('ffmpeg', [
        '-y', '-f', 'concat', '-safe', '0', '-i', concatList,
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '20',
        '-pix_fmt', 'yuv420p', '-r', String(FPS), OUTPUT_FILE,
    ], { stdio: 'inherit' });

    const totalFrames = results.reduce((a, r) => a + r.frames, 0);
    console.log(`\n=== Recording complete! ===`);
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log(`Frames: ${totalFrames} (${(totalFrames / FPS / 60).toFixed(1)}min)`);
    console.log(`Time: ${elapsed}s (${(elapsed / 60).toFixed(1)}min)`);
}

main().catch(console.error);
