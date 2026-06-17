/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import path from "path";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Tailwind + パスエイリアス設定
Config.overrideWebpackConfig((currentConfig) => {
  const projectPath = path.resolve(process.cwd(), '..');
  const componentsPath = path.resolve(process.cwd(), 'src', 'components');
  const withTailwind = enableTailwind(currentConfig);
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...(withTailwind.resolve?.alias || {}),
        '@components': componentsPath,
        '@project': projectPath,
      },
      modules: [
        ...(withTailwind.resolve?.modules || []),
        path.resolve(process.cwd(), 'node_modules'),
        'node_modules',
      ],
    },
  };
});

// シーン切替時のカクつき防止: フレームを直列レンダリング
// 並列(concurrency>1)だとReactのmount/unmount境界フレームで
// DOM描画完了前にスクリーンショットが撮られてカクつく
Config.setConcurrency(1);
