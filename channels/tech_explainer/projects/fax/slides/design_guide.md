# デザインガイド: なぜ日本だけFAXが生き残っているのか

## カラーパレット

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #1d4ed8 | メインカラー（通信・ドキュメント系ブルー） |
| --primary-light | #dbeafe | 背景・ハイライト |
| --teal | #0891b2 | サブアクセント（統計・データ） |
| --teal-light | #cffafe | |
| --coral | #dc2626 | 警告・強調（日本の赤） |
| --coral-light | #fee2e2 | |
| --amber | #d97706 | 年代・歴史系 |
| --amber-light | #fef3c7 | |

## タイポグラフィ
- フォント: Zen Maru Gothic (400/700/900)
- ヒーロー: 72px / 見出し: 36px / 本文: 24px / キャプション: 22px

## アイコン計画

| 固有名詞 | ソース | URL/方法 |
|---------|--------|----------|
| Slack | devicon | `icons/slack/slack-original.svg` |
| 日本国旗 | flagicons | `flags/4x3/jp.svg` |
| アメリカ国旗 | flagicons | `flags/4x3/us.svg` |
| ドイツ国旗 | flagicons | `flags/4x3/de.svg` |
| NTT | テキストバッジ | — |
| CNN | テキストバッジ | — |
| HIPAA | テキストバッジ | — |
| FAX | カスタムSVG | FAX機シルエット |

## SVG図解計画（8シーン以上）

| シーン | 図解内容 |
|--------|---------|
| Scene 0 | FAX機シルエットSVG |
| Scene 1 | 紙の山＋計上漏れビジュアル |
| Scene 4 | アルファベット26文字 vs 漢字数千文字の密度対比 |
| Scene 5 | ゲージメーター 57% |
| Scene 6 | ネットワーク外部性の接続グラフ |
| Scene 10 | 世代別FAX保有率バーチャート |
| Scene 12 | 日米独比較バーチャート＋国旗 |
| Scene 14 | 家庭保有率 vs 業務利用率スプリット |
| Scene 16 | 合理性の罠：個人合理→全体非合理の循環図 |
| Scene 18 | ゲージメーター 85% |
