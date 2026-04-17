# デザインガイド: なぜ動画形式はこんなに多いのか

## カラーパレット

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #2563eb | メインカラー（動画・メディア系の信頼感ある青） |
| --primary-light | #dbeafe | プライマリの背景 |
| --teal | #0d9488 | コンテナ関連・オープンソース |
| --teal-light | #ccfbf1 | ティールの背景 |
| --coral | #ef4444 | 問題・特許・コスト |
| --coral-light | #fee2e2 | コーラルの背景 |
| --amber | #d97706 | 圧縮・数値ハイライト |
| --amber-light | #fef3c7 | アンバーの背景 |

## タイポグラフィ
- フォント: Zen Maru Gothic (400/700/900)
- Hero: 72px / Heading: 36px / Body: 24px / Caption: 20px / Small: 16px

## アイコン計画

### 台本中の技術名・企業名・サービス名

| 名前 | アイコンソース | パス/URL |
|------|--------------|----------|
| YouTube | devicon | `icons/youtube/youtube-original.svg` |
| Google | devicon | `icons/google/google-original.svg` |
| Netflix | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/netflix.svg?color=%23E50914&width=48&height=48` |
| Amazon | devicon | `icons/amazonwebservices/amazonwebservices-original-wordmark.svg` |
| Microsoft | Iconify (mdi) | `https://api.iconify.design/mdi/microsoft.svg?color=%230078D4&width=48&height=48` |
| Mozilla | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/mozilla.svg?color=%23000000&width=48&height=48` |
| Intel | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/intel.svg?color=%230071C5&width=48&height=48` |
| Cisco | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/cisco.svg?color=%231BA0D7&width=48&height=48` |
| Apple | devicon | `icons/apple/apple-original.svg` |

### テキストバッジ（アイコンなし）
- H.264, H.265, AV1, MPEG-2, VP9 → コーデック名はテキストバッジで表示
- AVI, MP4, MKV, WebM, MOV → コンテナ名はテキストバッジで表示
- MPEG LA, HEVC Advance, Velos Media, AOMedia → 団体名はテキストバッジ
- ProRes, DNxHR → 編集用コーデック名はテキストバッジ
