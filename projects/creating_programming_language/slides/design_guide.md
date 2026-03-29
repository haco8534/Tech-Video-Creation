# デザインガイド: 新しいプログラミング言語を作るってどうやるの？

## カラーパレット

テーマカラー: **コードエディタ風のインディゴ＋グリーン** — プログラミング・コンパイラのイメージ

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #4f46e5;        /* インディゴ — メインアクセント */
    --primary-light: #e0e7ff;
    --teal: #059669;           /* グリーン — コード・成功 */
    --teal-light: #d1fae5;
    --coral: #dc2626;          /* レッド — エラー・警告 */
    --coral-light: #fee2e2;
    --amber: #d97706;          /* アンバー — 注目・歴史 */
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

台本に登場する技術名と対応するdevicon:

| 技術名 | devicon name | 使用シーン |
|--------|-------------|-----------|
| Python | `python` | 誕生秘話、動的型、GC |
| JavaScript | `javascript` | ハイブリッド、動的型 |
| TypeScript | `typescript` | トランスパイル、漸進的型 |
| Rust | `rust` | 誕生秘話、静的型、所有権 |
| Go | `go` | 誕生秘話、静的型 |
| Ruby | `ruby` | 誕生秘話、動的型 |
| C | `c` | 手動管理、コンパイラ |
| Java | `java` | GC、バイトコード |
| Swift | `swift` | LLVM |
| Julia | `julia` | LLVM |
| Kotlin | `kotlin` | LLVM (Native) |
| LLVM | — (テキストバッジ) | ツール紹介 |
| ANTLR | — (テキストバッジ) | ツール紹介 |

## ビジュアルパターン対応

| シーン | パターン | 主要要素 |
|--------|---------|---------|
| オープニング | タイトルカード | タイトル + icon-cloud |
| 9000以上の言語 | 数値インパクト | 大数字 8,945+ |
| ソースコードの旅 | フロー図 | 5段パイプライン fc-chain |
| 字句解析とは | SVG図解 | トークン分解図 |
| ASTの構造 | SVG図解 | 木構造図 |
| コンパイラとインタプリタ | 比較対照 | 左右比較カード |
| ハイブリッド方式 | 横並びカード | 3方式カード |
| 3つの設計判断 | 横並びカード | 3概念カード |
| 静的型と動的型 | 比較対照 | 左右比較 |
| メモリ管理3方式 | 横並びカード | 3方式カード |
| Pythonの誕生秘話 | テキスト強調 | 年号 + 引用 |
| Ruby・Go誕生 | 横並びカード | 2言語カード |
| Rustとエレベーター | テキスト強調 | エピソード強調 |
| LLVMの威力 | フロー図 | LLVM変換フロー |
| 開発支援ツール | 横並びカード | 3ツールカード |
| 言語づくり3ステップ | 段階的リスト | 3ステップ |
| エンディング | テキスト強調 | メッセージ |
