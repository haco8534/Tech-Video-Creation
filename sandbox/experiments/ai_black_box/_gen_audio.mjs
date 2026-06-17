// VOICEVOX で全セリフを合成し、1 本のマスター音声（AAC/.m4a）に統合する。
// 個別 WAV は中間生成物（_audio_src/、Remotion は読まない）。Remotion が読むのは voice.m4a 1 本だけ。
// あわせて audioData.ts（行開始フレーム・総尺・口パク開区間）を生成。
// 口パクは audio_query のモーラ長を真実源にする（母音区間=開／子音・促音・無音=閉）。
// 再実行時、既存の個別 WAV はスキップ（VOICEVOX は重い）。audio_query は毎回引く（軽い）。
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { execFileSync } from 'child_process';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const VV = 'http://127.0.0.1:50021';
const FPS = 30;
const SPEED = 1.2; // 読み上げ速度（speedScale）。合成と口パク・行尺の両方に効く
const TAIL = 8; // 行間の息継ぎ（無音フレーム）
const PROJ_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(PROJ_DIR, '..', '..');
const SRC_DIR = join(PROJ_DIR, '_audio_src'); // 個別 WAV（中間生成物）
const PUB_DIR = join(ROOT, 'engine', 'public', 'audio', 'ai_black_box');
const VOICE_SRC = 'audio/ai_black_box/voice.m4a'; // staticFile 相対
const SPEAKER = { ずんだもん: 3, めたん: 2 }; // VOICEVOX 標準ノーマル

// 音声用テキストの読み差し替え（字幕表示は元の英字のまま。ここは音声だけ）。長い語から先に置換
const READ = [
    ['ChatGPT', 'チャットジーピーティー'],
    ['Transformer', 'トランスフォーマー'],
    ['Attention', 'アテンション'],
    ['GPU', 'ジーピーユー'],
    ['AI', 'エーアイ'],
];
const toReading = (t) => READ.reduce((s, [a, b]) => s.split(a).join(b), t);

// scriptData.ts から SCRIPT を素朴にパース（順序保持）
const raw = readFileSync(join(PROJ_DIR, 'scriptData.ts'), 'utf8');
const re = /\{\s*speaker:\s*'([^']*)',\s*text:\s*'([^']*)'(?:,\s*event:\s*'([^']*)')?\s*\}/g;
const lines = [];
let m;
while ((m = re.exec(raw))) lines.push({ speaker: m[1], text: m[2] });
console.log(`parsed ${lines.length} lines`);

// 読み替え後も残る英字＝VOICEVOX が生で受け取り読み崩す語。黙って合成せず警告する
{
    const left = new Map(); // 語 → 出現行
    for (let i = 0; i < lines.length; i++) {
        const tokens = toReading(lines[i].text).match(/[A-Za-z][A-Za-z0-9'-]*/g);
        if (tokens) for (const t of tokens) (left.get(t) || left.set(t, []).get(t)).push(i);
    }
    if (left.size) {
        console.warn('\n⚠ READ 辞書に未登録の英字（VOICEVOX が読み崩す可能性）:');
        for (const [t, idxs] of left) console.warn(`    "${t}"  行 ${idxs.join(', ')}`);
        console.warn('  → _gen_audio.mjs の READ に読みを足して再生成してください（長い語を先に）。\n');
    }
}

mkdirSync(SRC_DIR, { recursive: true });
mkdirSync(PUB_DIR, { recursive: true });

const OPEN_V = new Set(['a', 'i', 'u', 'e', 'o', 'A', 'I', 'U', 'E', 'O', 'N']);

// audio_query から「総尺(秒)」と「口パク開区間(秒)」
const timingFromQuery = (q) => {
    const speed = q.speedScale || 1;
    let t = (q.prePhonemeLength || 0) / speed;
    const open = [];
    for (const ph of q.accent_phrases) {
        for (const mo of ph.moras) {
            t += (mo.consonant_length || 0) / speed; // 子音=閉
            const v = (mo.vowel_length || 0) / speed; // 母音=開
            if (OPEN_V.has(mo.vowel) && v > 0) open.push([t, t + v]);
            t += v;
        }
        if (ph.pause_mora) t += (ph.pause_mora.vowel_length || 0) / speed; // 句間=閉
    }
    t += (q.postPhonemeLength || 0) / speed;
    return { totalSec: t, open };
};

const toFrames = (open) => {
    const fr = open.map(([a, b]) => [Math.round(a * FPS), Math.round(b * FPS)]).filter(([a, b]) => b > a);
    const out = [];
    for (const iv of fr) {
        const last = out[out.length - 1];
        if (last && iv[0] <= last[1]) last[1] = Math.max(last[1], iv[1]);
        else out.push(iv);
    }
    return out;
};

const post = async (url, body) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`${res.status} ${url}\n${await res.text()}`);
    return res;
};

// --- 1) 個別 WAV + 行ごとのタイミングを得る ---
const per = [];
for (let i = 0; i < lines.length; i++) {
    const { speaker, text } = lines[i];
    const id = SPEAKER[speaker];
    if (id === undefined) throw new Error(`unknown speaker: ${speaker}`);
    const idx = String(i).padStart(3, '0');
    const wavPath = join(SRC_DIR, `line_${idx}.wav`);

    const qRes = await post(`${VV}/audio_query?speaker=${id}&text=${encodeURIComponent(toReading(text))}`);
    const q = await qRes.json();
    q.speedScale = SPEED; // 合成・タイミング双方に反映
    const { totalSec, open } = timingFromQuery(q);

    if (!existsSync(wavPath)) {
        const sRes = await post(`${VV}/synthesis?speaker=${id}`, q);
        writeFileSync(wavPath, Buffer.from(await sRes.arrayBuffer()));
    }
    per.push({ wavPath, durationFrames: Math.round(totalSec * FPS), open: toFrames(open) });
    if ((i + 1) % 40 === 0 || i === lines.length - 1) console.log(`  synth ${i + 1}/${lines.length}`);
}

// --- 2) 行開始フレーム・総尺を確定（Composition もこれを読む＝単一の真実源）---
const lineStarts = [];
{
    let acc = 0;
    for (let i = 0; i < per.length; i++) {
        lineStarts.push(acc);
        acc += per[i].durationFrames + TAIL;
    }
}
const totalFrames = lineStarts[per.length - 1] + per[per.length - 1].durationFrames + 30;

// --- 3) WAV を行開始フレームの位置に敷き詰めて 1 本の PCM に統合 ---
const readWav = (path) => {
    const b = readFileSync(path);
    let i = 12, sr = 24000, ch = 1, bits = 16, off = -1, len = 0;
    while (i < b.length - 8) {
        const id = b.toString('ascii', i, i + 4);
        const sz = b.readUInt32LE(i + 4);
        if (id === 'fmt ') { ch = b.readUInt16LE(i + 10); sr = b.readUInt32LE(i + 12); bits = b.readUInt16LE(i + 22); }
        if (id === 'data') { off = i + 8; len = sz; break; }
        i += 8 + sz + (sz % 2);
    }
    return { sr, ch, bits, pcm: b.subarray(off, off + len) };
};

const first = readWav(per[0].wavPath);
const SR = first.sr;
if (first.ch !== 1 || first.bits !== 16) throw new Error(`expected mono 16bit, got ch=${first.ch} bits=${first.bits}`);
const totalSamples = Math.round((totalFrames / FPS) * SR);
const master = Buffer.alloc(totalSamples * 2); // 無音(0)で初期化
for (let i = 0; i < per.length; i++) {
    const { pcm } = readWav(per[i].wavPath);
    const startByte = Math.round((lineStarts[i] / FPS) * SR) * 2;
    const capBytes = Math.round(((per[i].durationFrames + TAIL) / FPS) * SR) * 2; // 次行に被らない範囲
    const n = Math.min(pcm.length, capBytes, master.length - startByte);
    if (n > 0) pcm.copy(master, startByte, 0, n);
}
const masterWav = join(SRC_DIR, 'voice.wav');
const hdr = Buffer.alloc(44);
hdr.write('RIFF', 0); hdr.writeUInt32LE(36 + master.length, 4); hdr.write('WAVE', 8);
hdr.write('fmt ', 12); hdr.writeUInt32LE(16, 16); hdr.writeUInt16LE(1, 20); hdr.writeUInt16LE(1, 22);
hdr.writeUInt32LE(SR, 24); hdr.writeUInt32LE(SR * 2, 28); hdr.writeUInt16LE(2, 32); hdr.writeUInt16LE(16, 34);
hdr.write('data', 36); hdr.writeUInt32LE(master.length, 40);
writeFileSync(masterWav, Buffer.concat([hdr, master]));

// --- 4) AAC(.m4a) に圧縮（音声向け 80kbps モノラル）---
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', masterWav, '-c:a', 'aac', '-b:a', '80k', '-ac', '1', join(PUB_DIR, 'voice.m4a')]);

// --- 5) audioData.ts を書く ---
const AUDIO = per.map((p) => ({ durationFrames: p.durationFrames, open: p.open }));
const body =
    `// 自動生成（_gen_audio.mjs）。手で編集しない。\n` +
    `// 音声は 1 本に統合済み：staticFile(VOICE_SRC)。AUDIO は口パク開区間と行尺のみ。\n` +
    `export type AudioLine = { durationFrames: number; open: [number, number][] };\n` +
    `export const VOICE_SRC = ${JSON.stringify(VOICE_SRC)};\n` +
    `export const AUDIO: AudioLine[] = ${JSON.stringify(AUDIO)};\n` +
    `export const LINE_STARTS: number[] = ${JSON.stringify(lineStarts)};\n` +
    `export const TOTAL_FRAMES = ${totalFrames};\n`;
writeFileSync(join(PROJ_DIR, 'audioData.ts'), body, 'utf8');
console.log(`wrote voice.m4a + audioData.ts (${AUDIO.length} lines, ${(totalFrames / FPS / 60).toFixed(1)} min)`);
