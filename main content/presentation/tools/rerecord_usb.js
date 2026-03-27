/**
 * re-record USB connector history
 * White theme + Zoom 2 (viewport 960x540, DSF 2 → 1920x1080 output)
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const PROJ = path.resolve(__dirname, '../usb_connector_history');
const FPS = 30;
const CSS_ZOOM = 2;
const OUT_W = 1920, OUT_H = 1080;
const VP_W = OUT_W / CSS_ZOOM;  // 960
const VP_H = OUT_H / CSS_ZOOM;  // 540

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
    const dur = JSON.parse(fs.readFileSync(path.join(PROJ, 'scene_durations.json'), 'utf-8'));
    const url = 'file:///' + path.join(PROJ, 'index.html').replace(/\\/g, '/');
    const FRAMES = path.join(PROJ, 'frames');

    if (fs.existsSync(FRAMES)) fs.rmSync(FRAMES, { recursive: true });
    fs.mkdirSync(FRAMES, { recursive: true });

    console.log(`Viewport: ${VP_W}x${VP_H} (DSF: ${CSS_ZOOM}) → Output: ${OUT_W}x${OUT_H}`);

    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    await p.setViewport({ width: VP_W, height: VP_H, deviceScaleFactor: CSS_ZOOM });
    await p.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);

    const scenes = await p.evaluate(() => document.querySelectorAll('.scene').length);
    console.log('Scenes found:', scenes);

    const testSS = await p.screenshot({ type: 'jpeg', quality: 95 });
    console.log('First screenshot:', testSS.length, 'bytes');

    let fc = 0;
    const t0 = Date.now();

    for (const sc of dur) {
        const nf = Math.ceil(sc.duration * FPS);
        await p.evaluate(i => window.goTo(i), sc.id);
        await sleep(150);
        const ss = await p.screenshot({ type: 'jpeg', quality: 95 });

        for (let f = 0; f < nf; f++) {
            fs.writeFileSync(path.join(FRAMES, 'frame_' + String(fc).padStart(6, '0') + '.jpg'), ss);
            fc++;
        }

        const el = ((Date.now() - t0) / 1000).toFixed(0);
        console.log(`  Scene ${sc.id} "${sc.title}": ${nf}f (total: ${fc}, ${el}s)`);
    }

    console.log('\nTotal frames:', fc);
    await b.close();

    console.log('Creating video...');
    const out = path.join(PROJ, 'recording.mp4');
    execFileSync('ffmpeg', [
        '-y', '-framerate', String(FPS),
        '-i', path.join(FRAMES, 'frame_%06d.jpg'),
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '20',
        '-pix_fmt', 'yuv420p', '-r', String(FPS), out,
    ], { stdio: 'inherit' });

    console.log('\n=== Done! ===');
    console.log('Size:', (fs.statSync(out).size / 1024 / 1024).toFixed(2), 'MB');
    fs.rmSync(FRAMES, { recursive: true });

    // Merge audio
    console.log('\nMerging audio...');
    require('./merge_audio.js');
}

main().catch(e => { console.error('ERR:', e.message); process.exit(1); });
