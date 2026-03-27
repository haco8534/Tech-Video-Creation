/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// シーン切替時のカクつき防止: フレームを直列レンダリング
// 並列(concurrency>1)だとReactのmount/unmount境界フレームで
// DOM描画完了前にスクリーンショットが撮られてカクつく
Config.setConcurrency(1);
