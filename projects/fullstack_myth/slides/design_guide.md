# デザインガイド: 「フルスタック」は本当に存在するのか？

## カラーパレット

テーマカラー: **テックブルー＋ティール** — フルスタックの多層レイヤー・技術の広がりを表現

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #2563eb;        /* ブルー — メインアクセント（テック感） */
    --primary-light: #dbeafe;
    --teal: #0d9488;           /* ティール — 肯定的な視点 */
    --teal-light: #ccfbf1;
    --coral: #dc2626;          /* レッド — 否定的な視点・警告 */
    --coral-light: #fee2e2;
    --amber: #d97706;          /* アンバー — データ・統計 */
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

- フォント: Zen Maru Gothic (400, 700, 900)
- 見出し: 900 weight, --fs-heading
- 本文: 700 weight, --fs-body
- キャプション: 400 weight, --fs-caption

## devicon アイコン計画

| 技術名 | devicon name | 使用シーン |
|--------|-------------|-----------|
| React | `react` | 現代のスタック、Abramov |
| Vue.js | `vuejs` | 現代のスタック |
| Angular | `angular` | 現代のスタック |
| Svelte | `svelte` | 現代のスタック |
| Node.js | `nodejs` | 現代のスタック |
| Python | `python` | 現代のスタック |
| Go | `go` | 現代のスタック |
| Rust | `rust` | 現代のスタック |
| Docker | `docker` | 現代のスタック |
| Kubernetes | `kubernetes` | 現代のスタック、Abramov |
| TypeScript | `typescript` | Abramov |
| HTML5 | `html5` | 2010年のスタック |
| CSS3 | `css3` | 2010年のスタック |
| JavaScript | `javascript` | 2010年のスタック |
| PHP | `php` | 2010年のスタック |
| MySQL | `mysql` | 2010年のスタック |
| Linux | `linux` | 2010年のスタック |
| Amazon Web Services | `amazonwebservices` | 現代のスタック |
| PostgreSQL | `postgresql` | 現代のスタック |
| MongoDB | `mongodb` | 現代のスタック |
| Ruby on Rails | `rails` | DHH |
| Google | `google` | 大企業の選択 |
| GitHub | `github` | AIツール |
| Facebook | `facebook` | 起源（Carlos Bueno） |

## ビジュアルパターン対応

| シーン | パターン | 主要要素 |
|--------|---------|---------|
| オープニング | タイトルカード | タイトル + 技術ロゴcloud |
| 2010年のスタック | 横並びカード | HTML/CSS/JS/PHP/MySQL 5技術 |
| 現代のスタック | 段階的リスト | レイヤー別技術一覧 |
| Abramovの告白 | テキスト強調 | 引用 + React logo |
| 器用貧乏の罠 | 比較対照 | ジェネラリスト vs スペシャリスト |
| DHHの哲学 | テキスト強調 | 引用 + Rails logo |
| スタートアップの現実 | 数値インパクト | 60% 大数字 |
| 30.7%の真実 | 数値インパクト | 30.7% + バーチャート |
| 大企業の選択 | 横並びカード | Google + Spotify 2社比較 |
| T字型とπ字型 | フロー図 | スキル形状の図解 |
| AIが変える風景 | テキスト強調 | AIツール + メッセージ |
| フルスタックの再定義 | 比較対照 | 幻想 vs 現実 |
| エンディング | テキスト強調 | メッセージ |
