# デザインガイド: web3って何だったの？

## カラーパレット

Web3のテーマカラーはブロックチェーン・暗号通貨を連想させるインディゴ/パープル系をベースに、崩壊と教訓を表現するコーラル、成功事例を表現するティールを使用。

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #6366f1;        /* インディゴ — Web3/ブロックチェーン */
    --primary-light: #e0e7ff;
    --teal: #0d9488;           /* ティール — 成功・生存 */
    --teal-light: #ccfbf1;
    --coral: #ef4444;          /* コーラル — 崩壊・警告 */
    --coral-light: #fee2e2;
    --amber: #d97706;          /* アンバー — 投資・金融 */
    --amber-light: #fef3c7;
    --card-bg: #ffffff;
    --border: #d1d5db;
    --radius: 12px;
    --radius-sm: 6px;
    --fs-hero: 72px;
    --fs-heading: 36px;
    --fs-body: 24px;
    --fs-caption: 18px;
    --fs-small: 14px;
}
```

## タイポグラフィ

- メインフォント: Zen Maru Gothic (400/700/900)

## devicon アイコン計画

台本に登場する技術・企業とdevicon対応:

| 技術名 | devicon name | 用途 |
|--------|-------------|------|
| Ethereum | `ethereum/ethereum-original` | Web3基盤 |
| Bitcoin | `bitcoin/bitcoin-original` (deviconにない場合テキストバッジ) | 暗号通貨 |
| Google | `google/google-original` | Web2企業 |
| Amazon | `amazonwebservices/amazonwebservices-original-wordmark` | Web2企業 |
| Facebook/Meta | `facebook/facebook-original` | Web2→メタバース |

注: Web3固有のプロジェクト（DeFi, NFT, DAO等）はdeviconに存在しないため、テキストバッジやカスタムSVGで対応する。
