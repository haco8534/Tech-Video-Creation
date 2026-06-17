# デザインガイド: 0と1だけでなぜ動画や音楽が再生できるのか

## カラーパレット

デジタル信号（正確・クリーン・青系）とアナログ信号（温かみ・珊瑚系）の対比をテーマカラーで表現。

| トークン | 値 | 用途 |
|----------|-----|------|
| `--primary` | `#2563eb` (ロイヤルブルー) | デジタル・2進数・CDなど精密技術 |
| `--primary-light` | `#dbeafe` | 背景・バッジ |
| `--teal` | `#06b6d4` (シアン) | データストリーム・信号・波形 |
| `--teal-light` | `#cffafe` | 背景 |
| `--coral` | `#ef4444` (コーラル) | アナログ信号・警告・誤解の指摘 |
| `--coral-light` | `#fee2e2` | 背景 |
| `--amber` | `#f59e0b` (アンバー) | 強調・圧縮・人間の知覚 |
| `--amber-light` | `#fef3c7` | 背景 |

## アイコン計画

| 台本中の名称 | アイコンソース | パス |
|-------------|--------------|------|
| YouTube | Iconify (mdi) | `https://api.iconify.design/mdi/youtube.svg?color=%23FF0000&width=48&height=48` |
| QRコード | Iconify (mdi) | `https://api.iconify.design/mdi/qrcode.svg?color=%232563eb&width=48&height=48` |
| CD/ディスク | Iconify (mdi) | `https://api.iconify.design/mdi/disc.svg?color=%232563eb&width=48&height=48` |
| スマホ | Iconify (mdi) | `https://api.iconify.design/mdi/cellphone.svg?color=%232563eb&width=48&height=48` |
| 音楽/MP3 | Iconify (mdi) | `https://api.iconify.design/mdi/music-note.svg?color=%2306b6d4&width=48&height=48` |
| 画像/JPEG | Iconify (mdi) | `https://api.iconify.design/mdi/image.svg?color=%2306b6d4&width=48&height=48` |
| 動画/H.264 | Iconify (mdi) | `https://api.iconify.design/mdi/video.svg?color=%2306b6d4&width=48&height=48` |
| Suica/電車 | Iconify (mdi) | `https://api.iconify.design/mdi/train.svg?color=%2306b6d4&width=48&height=48` |
| FLAC/ロスレス | Iconify (mdi) | `https://api.iconify.design/mdi/file-music.svg?color=%23059669&width=48&height=48` |

## タイポグラフィ

- フォント: Zen Maru Gothic (400, 700, 900)
- `--fs-hero: 72px` / `--fs-heading: 36px` / `--fs-body: 24px` / `--fs-caption: 22px`
