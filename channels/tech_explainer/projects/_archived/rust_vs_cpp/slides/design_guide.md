# デザインガイド: Rustは本当にC++を置き換えるのか？

## カラーパレット
| トークン | 値 | 用途 |
|---------|------|------|
| --color-primary | #ce4120 | Rustオレンジ（強調・一次色） |
| --color-secondary | #2563eb | C++ブルー |
| --color-accent | #059669 | 成功・安全・ポジティブ |
| --color-danger | #ef4444 | 危険・脆弱性 |
| --color-bg | #f8f9fa | 背景 |
| --color-card | rgba(255,255,255,0.75) | カード背景 |
| --color-text | #1a1d23 | テキスト（グレー禁止） |
| --color-muted | #1a1d23 | サブテキスト（グレー禁止） |

## SVGアイコン計画
- **Rust**: オレンジ角丸四角 + 白 "R"
- **C++**: ブルー角丸四角 + 白 "C++"
- **Google**: カラフル4色円
- **Microsoft**: 4ペイン正方形 #0078d4
- **Linux**: ペンギン風シルエット
- **Cloudflare**: オレンジ四角 + クラウドモチーフ
- **AWS**: オレンジ四角 + "AWS"
- **Discord**: パープル四角 + "DC"
- **GitHub**: ダーク円 + Octocat path
- チェック/警告/禁止: 状態アイコン

## レイアウト方針
- self_taught_engineer のCSS設計体系に準拠
- `.heading`, `.hero-number`, `.caption`, `.body-text` 等の汎用クラスを使用
- `.compare-grid`, `.flow-chain`, `.fc-node`, `.num-list` 等パターンカタログ準拠
- 各シーン `center-layout` ベース
