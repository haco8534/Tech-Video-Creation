# デザインガイド: インターネットは誰が作って誰が管理しているのか

## カラーパレット

| トークン | 値 | 用途 |
|---------|-----|------|
| `--primary` | `#2563eb` (ブルー) | ネットワーク接続・プロトコル・主要組織 |
| `--primary-light` | `#dbeafe` | 背景ハイライト |
| `--teal` | `#0891b2` (シアン) | 海底ケーブル・インフラ・成功事例 |
| `--teal-light` | `#cffafe` | |
| `--coral` | `#dc2626` (レッド) | 障害・脆弱性・検閲 |
| `--coral-light` | `#fee2e2` | |
| `--amber` | `#d97706` (アンバー) | 年代バッジ・警告・注目ポイント |
| `--amber-light` | `#fef3c7` | |

## アイコン計画

### devicon CDN
| 技術名 | devicon name | 使用シーン |
|--------|-------------|-----------|
| Google | `google` | 海底ケーブル所有 |
| Cloudflare | `cloudflare` | 中央集権化の現実 |
| AWS | `amazonwebservices` | クラウド集中 |
| Azure | `azure` | クラウド集中 |
| Linux | `linux` | インフラ |
| Facebook | `facebook` | Meta/海底ケーブル |

### Iconify API
| 名前 | URL | 使用シーン |
|------|-----|-----------|
| YouTube | `mdi/youtube.svg?color=%23FF0000&width=72&height=72` | BGPハイジャック事件 |
| GCP | `mdi/google-cloud.svg?color=%234285F4&width=72&height=72` | クラウド集中 |
| X/Twitter | `mdi/twitter.svg?color=%231DA1F2&width=72&height=72` | Cloudflare障害 |

### テキストバッジ（アイコン非存在）
| 名前 | 使用シーン |
|------|-----------|
| ARPANET | 核戦争神話の真実 |
| TCP/IP | パケットの説明 |
| ICANN | ドメイン管理 |
| IETF | 技術標準 |
| RFC | 標準化プロセス |
| BGP | 経路制御 |
| DNS | ドメインシステム |
| ISP | 階層構造 |
| WIDE | 日本のインターネット |

## 人物写真（Wikipedia API）
| 人物 | ファイル名 | フォールバック |
|------|-----------|--------------|
| ヴィントン・サーフ | `vint_cerf.jpg` | SVGシルエット |
| ボブ・カーン | `bob_kahn.jpg` | SVGシルエット |
| ポール・バラン | `paul_baran.jpg` | SVGシルエット |
| 村井純 | `jun_murai.jpg` | SVGシルエット |

## タイポグラフィ
- フォント: Zen Maru Gothic (400, 700, 900)
- ライトテーマ（白系背景）
- テキストカラー: `#1a1d23`（グレー禁止）
