// 確認用スナップショット: node _snapshot.mjs <frame> [frame...]
// 出力: _snapshots/f<frame>.png
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const engine = path.resolve(here, '../../engine');
const require = createRequire(path.join(engine, 'package.json'));
const { bundle } = require('@remotion/bundler');
const { renderStill, selectComposition } = require('@remotion/renderer');
const { enableTailwind } = require('@remotion/tailwind-v4');

// remotion.config.ts と同じエイリアス設定（Node API には config が効かない）
const webpackOverride = (currentConfig) => {
    const withTailwind = enableTailwind(currentConfig);
    return {
        ...withTailwind,
        resolve: {
            ...withTailwind.resolve,
            alias: {
                ...(withTailwind.resolve?.alias || {}),
                '@components': path.join(engine, 'src', 'components'),
                '@project': path.resolve(engine, '..'),
            },
            modules: [
                ...(withTailwind.resolve?.modules || []),
                path.join(engine, 'node_modules'),
                'node_modules',
            ],
        },
    };
};
const outDir = path.join(here, '_snapshots');
mkdirSync(outDir, { recursive: true });

const frames = process.argv.slice(2).map(Number);
if (frames.length === 0) {
    console.error('usage: node _snapshot.mjs <frame> [frame...]');
    process.exit(1);
}

const serveUrl = await bundle({
    entryPoint: path.join(engine, 'src/index.ts'),
    publicDir: path.join(engine, 'public'),
    webpackOverride,
});

const composition = await selectComposition({ serveUrl, id: 'cookie' });

for (const frame of frames) {
    const out = path.join(outDir, `f${String(frame).padStart(5, '0')}.png`);
    await renderStill({ serveUrl, composition, frame, output: out });
    console.log(`f=${frame} -> ${out}`);
}
process.exit(0);
