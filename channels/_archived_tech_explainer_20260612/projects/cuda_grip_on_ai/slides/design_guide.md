# デザインガイド: CUDAが握るAIの首根っこ

## カラーパレット

NVIDIAグリーンを基調に、競合を暖色系で対比。

| トークン | 値 | 用途 |
|---------|-----|------|
| `--primary` | `#76B900` | NVIDIAグリーン。主役・CUDAエコシステム |
| `--primary-light` | `#e8f5d0` | プライマリ背景 |
| `--teal` | `#0891b2` | 技術的な説明・GPUアーキテクチャ |
| `--teal-light` | `#cffafe` | ティール背景 |
| `--coral` | `#dc2626` | AMD・競合・課題 |
| `--coral-light` | `#fee2e2` | コーラル背景 |
| `--amber` | `#d97706` | 強調・数値ハイライト |
| `--amber-light` | `#fef3c7` | アンバー背景 |

## タイポグラフィ

- フォント: Zen Maru Gothic
- ヒーロー: 72px / 見出し: 36px / 本文: 24px / キャプション: 20px

## アイコン計画

### devicon CDN
| 技術名 | devicon名 | パス |
|--------|----------|------|
| NVIDIA | nvidia | `icons/nvidia/nvidia-original.svg` |
| Python | python | `icons/python/python-original.svg` |
| PyTorch | pytorch | `icons/pytorch/pytorch-original.svg` |
| TensorFlow | tensorflow | `icons/tensorflow/tensorflow-original.svg` |
| C/C++ | cplusplus | `icons/cplusplus/cplusplus-original.svg` |

### Iconify API
| 技術名 | prefix/name | 用途 |
|--------|------------|------|
| AMD | simple-icons/amd | MI300X比較 |
| Google | simple-icons/google | TPU |
| Amazon/AWS | simple-icons/amazonaws | Trainium |
| Meta | simple-icons/meta | ハイパースケーラー |
| Microsoft | simple-icons/microsoft | ハイパースケーラー |
| Apple | simple-icons/apple | Apple Silicon/MLX |
| Intel | simple-icons/intel | 競合 |
| OpenAI | simple-icons/openai | Triton |
| CUDA | mdi/gpu | CUDA汎用 |
| GPU/チップ | mdi/chip | GPU汎用 |
| 行列 | mdi/grid | 行列演算 |
| ロック | mdi/lock | ロックイン |

## シーン構成（18シーン）

| # | パターン | タイトル | 主要アイコン |
|---|---------|---------|-------------|
| 0 | タイトルカード | オープニング | nvidia, mdi/gpu |
| 1 | 数値インパクト | AIチップの支配者 | nvidia |
| 2 | アナロジー | 天才と大人数 | (人物SVG) |
| 3 | SVG図解 | CPUとGPUの構造 | mdi/chip |
| 4 | テキスト強調 | 行列演算の海 | mdi/grid |
| 5 | フロー図 | BrookからCUDAへ | nvidia |
| 6 | テキスト強調 | Jensenの決断 | nvidia |
| 7 | 数値インパクト | AlexNetの衝撃 | nvidia |
| 8 | フロー図 | 好循環の爆発 | pytorch, tensorflow, nvidia |
| 9 | 比較対照 | スペック比較の罠 | nvidia, amd |
| 10 | アナロジー | 言語という堀 | (テキストベース) |
| 11 | SVG図解 | 乗算的コスト | mdi/lock |
| 12 | テキスト強調 | 産業インフラ | nvidia |
| 13 | 比較対照 | 自社チップの反撃 | google, amazonaws, meta |
| 14 | フロー図 | 抽象化という武器 | openai, nvidia, amd |
| 15 | テキスト強調 | 推論という突破口 | apple |
| 16 | まとめカード | 3つの首根っこ | nvidia |
| 17 | テキスト強調 | エンディング | nvidia |
