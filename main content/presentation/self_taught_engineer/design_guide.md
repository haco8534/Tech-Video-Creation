# Design Guide: 独学エンジニアは本当に通用するのか？

## テーマカラー

「独学」「自走力」「成長」のイメージ → 力強いインディゴ + 成長のグリーン

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #4338ca;         /* インディゴ: 知識・学び */
    --primary-light: #e0e7ff;
    --teal: #059669;            /* エメラルド: 成長・達成 */
    --teal-light: #d1fae5;
    --coral: #dc2626;           /* レッド: 警告・挫折 */
    --coral-light: #fee2e2;
    --amber: #d97706;           /* アンバー: 注意・ヒント */
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

## SVGアイコン計画

### 技術ロゴ（台本に登場するもの）
- Python: #3776ab 円形バッジ「Py」
- JavaScript: #f7df1e 角丸バッジ「JS」
- Go: #00add8 角丸バッジ「Go」
- Rust: #dea584 角丸バッジ「Rs」
- Git/GitHub: #24292e 円形バッジ
- Stack Overflow: #f48024 角丸バッジ「SO」

### 概念アイコン
- 挫折・壁: 警告三角 + ×マーク（coral）
- 成長・達成: チェックマーク + 上昇矢印（teal）
- 学位: 角帽アイコン（primary）
- コード: ブラケット `</>` アイコン（primary）
- ポートフォリオ: ブラウザ + スターアイコン（amber）
- 人材不足: ユーザーグループ + 矢印（coral）
- 自走力: 歯車 + 人型（teal）
- 年収: 上昇グラフアイコン（amber）

## タイポグラフィ
- フォント: Zen Maru Gothic (400, 700, 900)
- タイトル: 72px / 900
- 見出し: 36px / 700
- 本文: 24px / 400
- キャプション: 18px / 400
