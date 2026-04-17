# デザインガイド — QRコードはなぜあの模様で読み取れるのか

## カラーパレット

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #1e40af | QRコードの技術的精密さ。ファインダーパターン関連 |
| --primary-light | #dbeafe | 薄青背景 |
| --teal | #0d9488 | 成功・復元・正常動作 |
| --teal-light | #ccfbf1 | 薄緑背景 |
| --coral | #dc2626 | エラー・破損・汚れ |
| --coral-light | #fee2e2 | 薄赤背景 |
| --amber | #d97706 | 歴史・ハイライト・警告 |
| --amber-light | #fef3c7 | 薄黄背景 |

## アイコン計画

| 台本中の固有名詞 | アイコンソース | URL |
|----------------|-------------|-----|
| Alipay | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/alipay.svg?color=%231677FF&width=72&height=72` |
| WeChat Pay | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/wechat.svg?color=%2307C160&width=72&height=72` |
| NASA | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/nasa.svg?color=%23E03C31&width=72&height=72` |
| ISO | テキストバッジ | N/A |
| IEEE | テキストバッジ | N/A |
| デンソーウェーブ | テキストバッジ | N/A |
| トヨタ | Iconify (simple-icons) | `https://api.iconify.design/simple-icons/toyota.svg?color=%23EB0A1E&width=72&height=72` |

## SVG図解計画

全24シーン中、16シーン以上にカスタムSVG図解を含める。
QRコードの構造・仕組みがテーマの核心であり、SVG図解が説明そのものになる。

## 人物写真

- 原昌宏（QRコード開発者）: Wikipedia APIで取得を試みる
