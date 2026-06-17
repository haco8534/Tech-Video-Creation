// image_generation の確認用スチルを一括レンダする使い捨てスクリプト
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

const FRAMES = [32200, 32500, 33800];
const OUT = path.join(HERE, '_snapshots');
mkdirSync(OUT, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(ENGINE, 'src', 'index.ts'), webpackOverride });
const composition = await selectComposition({ serveUrl, id: 'image-generation' });
for (const f of FRAMES) {
    await renderStill({
        serveUrl, composition, frame: f,
        output: `${OUT}/f${String(f).padStart(5, '0')}.jpeg`,
        imageFormat: 'jpeg', jpegQuality: 80,
    });
    console.log('still', f);
}
