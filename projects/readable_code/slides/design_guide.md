# デザインガイド: 「コードは読みやすく書け」は本当に正しいのか？

## カラーパレット

テーマ: 「コードの品質・設計思想」をイメージ。落ち着いたインディゴを基調に、比較対照を際立たせるティール＆コーラル。

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #5b21b6;        /* バイオレット系 — 設計思想・知的探求 */
    --primary-light: #ede9fe;
    --teal: #0d9488;    --teal-light: #ccfbf1;
    --coral: #dc2626;   --coral-light: #fee2e2;
    --amber: #d97706;   --amber-light: #fef3c7;
    --card-bg: #ffffff;
    --border: #d1d5db;
    --radius: 12px;     --radius-sm: 6px;
}
```

## タイポグラフィ

- フォント: Zen Maru Gothic (400, 700, 900)
- ヒーロー: 72px / 見出し: 36px / 本文: 24px / キャプション: 18px / 小: 14px

## deviconアイコン計画

台本に登場する技術名とアイコンのマッピング:

| 技術名 | devicon name | 用途シーン |
|--------|-------------|-----------|
| Python | `python` | 数式コード例、言語比較 |
| Clean Code (書籍) | テキストバッジ | Clean Codeの原則 |
| Linux | `linux` | Linuxカーネル言及 |
| PostgreSQL | `postgresql` | DB内部の例 |
| SQLite | `sqlite` | DB内部の例 |
| NumPy | `numpy` | 科学計算コード例 |
| Java | `java` | 過剰抽象化の例 |
| React | `react` | Dan Abramov言及 |
| Google | `google` | Readability制度 |

## シーン構成 (14シーン)

| Scene | パターン | タイトル |
|-------|---------|---------|
| 0 | タイトルカード | オープニング |
| 1 | テキスト強調 | 有名な格言 |
| 2 | 横並びカード | Clean Codeの原則 |
| 3 | 数値インパクト | 保守コストの現実 |
| 4 | 比較対照 | 読みやすさvs速度 |
| 5 | フロー図 | なぜ遅くなるか |
| 6 | 横並びカード | 速度優先の現場 |
| 7 | アナロジー | 医療カルテのたとえ |
| 8 | 比較対照 | 数式コードの例 |
| 9 | 横並びカード | 速度優先の現場 |
| 10 | フロー図 | 抽象化の迷路 |
| 11 | テキスト強調 | 先人たちの言葉 |
| 12 | 横並びカード | 場面別の指針 |
| 13 | 段階的リスト | 3つの問い |
| 14 | テキスト強調 | エンディング |

※ 台本のシーン数は14
