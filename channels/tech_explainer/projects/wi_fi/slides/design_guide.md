# Design Guide: Wi-Fiはなぜ壁を越えると弱くなるのか

## カラーパレット

| Token | 値 | 用途 |
|-------|-----|------|
| --primary | #2563eb | Wi-Fi・電波・テクノロジー（青） |
| --primary-light | #dbeafe | 薄い青背景 |
| --teal | #0891b2 | 電磁波・波長（シアン） |
| --teal-light | #cffafe | 薄いシアン背景 |
| --coral | #dc2626 | 吸収・減衰・熱（赤） |
| --coral-light | #fee2e2 | 薄い赤背景 |
| --amber | #d97706 | 反射・警告（アンバー） |
| --amber-light | #fef3c7 | 薄いアンバー背景 |

## アイコン計画

### Iconify API（mdiプレフィックス）
台本中にプログラミング言語や開発ツールの固有名詞はほぼないため、deviconではなくIconify APIのmdiアイコンを中心に使用する。

| 技術名/概念 | アイコン | URL |
|------------|---------|-----|
| Wi-Fi | mdi/wifi | `https://api.iconify.design/mdi/wifi.svg?color=%232563eb&width=72&height=72` |
| ルーター | mdi/router-wireless | `https://api.iconify.design/mdi/router-wireless.svg?color=%232563eb&width=72&height=72` |
| スマートフォン | mdi/cellphone | `https://api.iconify.design/mdi/cellphone.svg?color=%231a1d23&width=72&height=72` |
| 電子レンジ | mdi/microwave | `https://api.iconify.design/mdi/microwave.svg?color=%23dc2626&width=72&height=72` |
| 電波強度 | mdi/signal-cellular-3 | `https://api.iconify.design/mdi/signal-cellular-3.svg?color=%232563eb&width=72&height=72` |
| Bluetooth | mdi/bluetooth | `https://api.iconify.design/mdi/bluetooth.svg?color=%232563eb&width=48&height=48` |
| 有線LAN | mdi/ethernet | `https://api.iconify.design/mdi/ethernet.svg?color=%231a1d23&width=48&height=48` |

### テキストバッジ（アイコンなし）
| 名称 | 表示 |
|------|------|
| NIST | テキストバッジ |
| IEEE 802.11 | テキストバッジ |
| ISMバンド | テキストバッジ |
| FCC | テキストバッジ |

## SVG図解計画（24シーン中10シーン以上）

| Scene | パターン | SVG内容 |
|-------|---------|---------|
| 4 (電磁波スペクトル) | SVG図解 | 電磁波スペクトルバー：ラジオ波→マイクロ波→赤外線→可視光→紫外線。Wi-Fi位置にマーカー |
| 6 (プールの波) | SVG図解 | プール+板+さざ波（反射）とうねり（回折）の対比図 |
| 9 (反射) | SVG図解 | 壁に電波が当たり反射する様子。入射角=反射角。透過分も描画 |
| 10 (吸収) | SVG図解 | 壁断面図。電波が内部を通過しエネルギーが減っていく。矢印が細くなる |
| 11 (回折) | SVG図解 | 壁の端で電波が回り込む様子。同心円状の波面 |
| 13 (フレネルゾーン) | SVG図解 | ルーター←楕円体→スマホ。60%ラインと障害物の関係 |
| 15 (水と2.4GHz) | SVG図解 | 水分子の双極子回転+2.4GHz波の吸収イメージ |
| 18 (周波数と波長) | SVG図解 | 2.4GHz（長い波形）vs 5GHz（短い波形）の壁通過比較 |
| 22 (最適配置) | SVG図解 | 家の俯瞰図。ルーター位置と電波の届き方の比較 |
| 14 (壁ギリギリの棚) | SVG図解 | フレネルゾーン+棚が食い込んでいる図 |

## タイポグラフィ
- フォント: Zen Maru Gothic（CSS @import）
- fs-hero: 72px（タイトル）
- fs-heading: 36px（シーンタイトル）
- fs-body: 24px（本文）
- fs-caption: 22px（キャプション）
- SVG内最小: 18px
