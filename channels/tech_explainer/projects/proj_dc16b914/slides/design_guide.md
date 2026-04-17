# デザインガイド: 「クラウド」ってなんなの？

## カラーパレット

クラウド＝空・テクノロジーの印象を、信頼感のある青系で統一。データセンターの物理感をグレー・鉄色系で補強。

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #2563eb;       /* 信頼のブルー（クラウド・テクノロジー） */
    --primary-light: #dbeafe;
    --teal: #0891b2;          /* データセンター・インフラ */
    --teal-light: #cffafe;
    --coral: #dc2626;         /* 警告・障害・コスト逆転 */
    --coral-light: #fee2e2;
    --amber: #d97706;         /* 注意・ヘッジ */
    --amber-light: #fef3c7;
    --card-bg: #ffffff;
    --border: #d1d5db;
}
```

## タイポグラフィ
- フォント: Zen Maru Gothic (400/700/900)
- SVGテキスト: 最小22px、見出し26px、強調32px、大数値48px

## deviconアイコン計画

台本に登場する技術名・企業名・サービス名:

| 名前 | ソース | パス/URL |
|------|--------|----------|
| AWS | devicon | `icons/amazonwebservices/amazonwebservices-original-wordmark.svg` |
| Azure | devicon | `icons/azure/azure-original.svg` |
| Google Cloud | devicon | `icons/googlecloud/googlecloud-original.svg` |
| Docker | devicon | `icons/docker/docker-original.svg` |
| LINE | Iconify | `https://api.iconify.design/simple-icons/line.svg?color=%2306C755&width=48&height=48` |
| Netflix | Iconify | `https://api.iconify.design/simple-icons/netflix.svg?color=%23E50914&width=48&height=48` |
| YouTube | Iconify | `https://api.iconify.design/mdi/youtube.svg?color=%23FF0000&width=48&height=48` |
| Spotify | Iconify | `https://api.iconify.design/mdi/spotify.svg?color=%231DB954&width=48&height=48` |
| Gmail | Iconify | `https://api.iconify.design/mdi/gmail.svg?color=%23EA4335&width=48&height=48` |
| Slack | devicon | `icons/slack/slack-original.svg` |
| Dropbox | devicon | `icons/dropbox/dropbox-original.svg` |
| PayPay | テキストバッジ | (deviconにもIconifyにも無い) |
| Amazon | Iconify | `https://api.iconify.design/mdi/amazon.svg?color=%23FF9900&width=48&height=48` |
| Salesforce | devicon | `icons/salesforce/salesforce-original.svg` |

## 人物写真計画

| 人物名 | Wikipedia記事 | 用途 |
|--------|-------------|------|
| ジョン・マッカーシー | John_McCarthy_(computer_scientist) | Block 5: 1961年の予言 |

## SVG図解計画（8シーン以上）

1. **S4: ネットワーク図の雲** — ネットワーク図でサーバー群が雲形で抽象化される様子
2. **S5: データセンターの実体** — 巨大な建物の中にサーバーラックが並ぶ図
3. **S8: 仮想化の仕組み** — 1台のサーバーがハイパーバイザーで分割される図
4. **S9: IaaS/PaaS/SaaS** — マンションのたとえ（空部屋/家具付き/ホテル）の3段階
5. **S11: コスト逆転のグラフ** — クラウドvsオンプレの時間軸コスト交差図
6. **S12: セキュリティの真実** — 共有責任モデル：プロバイダー領域とユーザー領域の境界
7. **S13: データの所在地** — 世界地図上にデータセンター配置＋法的管轄の矛盾
8. **S14: 1961年の予言** — マッカーシーの写真＋水道蛇口とクラウドの対比
9. **S15: AWS誕生物語** — Amazonの内部課題からAWSが生まれる流れ
10. **S17: 予言と現実の対比** — 1961年の水道予言と2026年のクラウドを左右対比
