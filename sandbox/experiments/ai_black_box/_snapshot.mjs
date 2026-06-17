// ai_black_box の確認用スチルを一括レンダする使い捨てスクリプト
import path from 'path';
import { dirname } from 'path';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind-v4';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const ENGINE = path.join(ROOT, 'engine');
const webpackOverride = (config) => {
    const withTailwind = enableTailwind(config);
    return {
        ...withTailwind,
        resolve: {
            ...withTailwind.resolve,
            alias: {
                ...(withTailwind.resolve?.alias || {}),
                '@components': path.resolve(ENGINE, 'src', 'components'),
                '@project': ROOT,
            },
            modules: [...(withTailwind.resolve?.modules || []), path.resolve(ENGINE, 'node_modules'), 'node_modules'],
        },
    };
};

const FRAMES = process.argv.slice(2).map(Number);
if (!FRAMES.length)
    FRAMES.push(
        150, 320, 500, 760, 1100, 2550, // intro
        2800, 3450, 3800, 4350, 5520, 5900, // map
        6500, 6900, 7400, 7560, 8000, 8800, // weights
        9550, 10050, 10380, 10900, 11550, 12450, 13500, 14620, // training
        15000, 15330, 15880, 16380, 17200, 17430, 18000, 18700, // inference
        20060, 20800, 21350, 21700, 22000, 22400, 23400, 25180, // scale
        25300, 25500, 25950, 26100, 26700, 28100, 28350, // limits
        28650, 28900, 29450, 30100, 30650, // outro
    );
const OUT = path.join(HERE, '_snapshots');
mkdirSync(OUT, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(ENGINE, 'src', 'index.ts'), webpackOverride });
const composition = await selectComposition({ serveUrl, id: 'ai-black-box' });
for (const f of FRAMES) {
    await renderStill({
        serveUrl, composition, frame: f,
        output: `${OUT}/f${String(f).padStart(5, '0')}.jpeg`,
        imageFormat: 'jpeg', jpegQuality: 80,
    });
    console.log('still', f);
}
