const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ID = process.argv[2] || 'usb_connector_diversity';
const AUDIO_DIR = path.join('public', 'audio', PROJECT_ID);
const OUTPUT_PATH = path.join('..', 'projects', PROJECT_ID, 'remotion', 'lipSyncData.ts');
const FPS = 30;
const THRESHOLD = 0.02;

const files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.wav')).sort();
console.log(`Processing ${files.length} audio files...`);

const rawData = {};
let processed = 0;

for (const file of files) {
    const filePath = path.join(AUDIO_DIR, file);
    const audioKey = `audio/${PROJECT_ID}/${file}`;
    
    try {
        // Get duration
        const probeOut = execSync(
            `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`,
            { encoding: 'utf8' }
        ).trim();
        const duration = parseFloat(probeOut);
        const totalFrames = Math.ceil(duration * FPS);
        
        // Extract raw PCM and compute RMS per frame
        const pcmBuf = execSync(
            `ffmpeg -v error -i "${filePath}" -f s16le -ac 1 -ar ${FPS * 1600} -`,
            { maxBuffer: 100 * 1024 * 1024 }
        );
        
        const samplesPerFrame = 1600;
        let bits = '';
        
        for (let f = 0; f < totalFrames; f++) {
            const start = f * samplesPerFrame * 2;
            const end = Math.min(start + samplesPerFrame * 2, pcmBuf.length);
            let sumSq = 0;
            let count = 0;
            
            for (let i = start; i < end - 1; i += 2) {
                const sample = pcmBuf.readInt16LE(i) / 32768;
                sumSq += sample * sample;
                count++;
            }
            
            const rms = count > 0 ? Math.sqrt(sumSq / count) : 0;
            bits += rms > THRESHOLD ? '1' : '0';
        }
        
        rawData[audioKey] = bits;
        processed++;
        if (processed % 20 === 0) console.log(`  ${processed}/${files.length}...`);
    } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
        rawData[audioKey] = '0'.repeat(30);
    }
}

// Generate TypeScript
let ts = `// Auto-generated lip sync data (volume-based, like YMM4)\n`;
ts += `// true = mouth open, false = mouth closed, per frame (30fps)\n\n`;
ts += `const RAW: Record<string, string> = {\n`;
for (const [key, bits] of Object.entries(rawData)) {
    ts += `    "${key}": "${bits}",\n`;
}
ts += `};\n\n`;
ts += `export function isMouthOpen(audioFile: string, frameInAudio: number): boolean {\n`;
ts += `    const data = RAW[audioFile];\n`;
ts += `    if (!data || frameInAudio < 0 || frameInAudio >= data.length) return false;\n`;
ts += `    return data[frameInAudio] === '1';\n`;
ts += `}\n`;

fs.writeFileSync(OUTPUT_PATH, ts, 'utf8');
console.log(`\n✅ Generated ${OUTPUT_PATH} (${processed} files)`);
