# デザインガイド: 充電ケーブルはなぜすぐ壊れるのか

## カラーパレット
- **Primary**: `#ea580c` (warm orange - 電気・エネルギー)
- **Primary-light**: `#fff7ed`
- **Teal**: `#0891b2` (cyan - USB・技術)
- **Teal-light**: `#cffafe`
- **Coral**: `#dc2626` (red - 危険・断線・発熱)
- **Coral-light**: `#fee2e2`
- **Amber**: `#d97706` (gold - 警告・注意)
- **Amber-light**: `#fef3c7`

## タイポグラフィ
- Zen Maru Gothic (400, 700, 900)
- Hero: 72px / Heading: 36px / Body: 24px / Caption: 22px / Small: 18px

## アイコン計画

| 技術名/企業名 | ソース | URL/パス |
|-------------|--------|----------|
| Apple | devicon | `icons/apple/apple-original.svg` |
| USB | Iconify (mdi) | `api.iconify.design/mdi/usb.svg?color=%230891b2&width=72&height=72` |
| Samsung | Iconify (simple-icons) | `api.iconify.design/simple-icons/samsung.svg?color=%231428a0&width=72&height=72` |
| Amazon | Iconify (simple-icons) | `api.iconify.design/simple-icons/amazon.svg?color=%23ff9900&width=72&height=72` |
| Qualcomm | Iconify (simple-icons) | `api.iconify.design/simple-icons/qualcomm.svg?color=%233253dc&width=72&height=72` |
| EU | Flag icon | `flagicons.lipis.dev/flags/4x3/eu.svg` |
| Lightning | テキストバッジ | — |
| USB-C | テキストバッジ | — |
| Anker | テキストバッジ | — |
| OPPO/VOOC | テキストバッジ | — |

## SVG図解計画
- Scene 2: ケーブル断面図（同心円レイヤー: 外被→シールド→絶縁→銅導体）
- Scene 3: USB-Cコネクタのピン配列（24ピン）
- Scene 4: クリップが曲がり→折れるプロセス
- Scene 5: 結晶構造の変形（整列→ズレ→亀裂）
- Scene 6: コネクタ根元への応力集中（力の矢印）
- Scene 9: ストレインリリーフの構造図
- Scene 11: ケーブル断面の発熱表現
- Scene 12: 有線vs無線の温度比較
