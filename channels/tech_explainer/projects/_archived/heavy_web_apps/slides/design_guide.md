# デザインガイド: 最近のwebアプリ重すぎ！

## カラーパレット

「重さ」「肥大化」をテーマカラーで表現。警告の赤系をメインに、軽量化の希望をティール系で。

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #e74c3c;         /* 警告・肥大化の赤 */
    --primary-light: #fde8e8;
    --teal: #0d9488;            /* 軽量化・解決策の緑 */
    --teal-light: #ccfbf1;
    --coral: #f59e0b;           /* 注意・数値のアンバー */
    --coral-light: #fef3c7;
    --amber: #6366f1;           /* テクノロジー・フレームワークのインディゴ */
    --amber-light: #e0e7ff;
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

- Zen Maru Gothic (400, 700, 900)

## deviconアイコン計画

台本に登場する技術名と対応するdevicon:

| 技術名 | devicon名 |
|--------|----------|
| JavaScript | javascript |
| React | react |
| Vue | vuejs |
| Angular | angular |
| Svelte | svelte |
| Node.js | nodejs |
| npm | npm |
| Chrome | chrome |
| HTML | html5 |
| CSS | css3 |
| Next.js | nextjs |

※ HTMX, Astro, Qwik, Slack, Notion, Figma はdeviconに存在しないため、テキストバッジで代替。
