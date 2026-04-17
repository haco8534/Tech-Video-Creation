# デザインガイド: 5Gで世界は変わった？

## カラーパレット

5G / 通信テクノロジーをイメージした、ブルー基調の配色。

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #2563eb;        /* 5Gブルー */
    --primary-light: #dbeafe;
    --teal: #0891b2;           /* 通信・ネットワーク */
    --teal-light: #cffafe;
    --coral: #dc2626;          /* 警告・課題 */
    --coral-light: #fee2e2;
    --amber: #d97706;          /* 注意・ハイライト */
    --amber-light: #fef3c7;
    --card-bg: #ffffff;
    --border: #d1d5db;
    --radius: 12px;
    --radius-sm: 6px;
    --fs-hero: 72px;
    --fs-heading: 36px;
    --fs-body: 24px;
    --fs-caption: 22px;
    --fs-small: 18px;
}
```

## タイポグラフィ

```css
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap');
```

## 技術ロゴ (devicon)

台本中に登場する技術名とdevicon対応:

| 技術名 | devicon名 | 用途 |
|--------|-----------|------|
| ※このテーマは特定のプログラミング言語・ツールよりも通信規格の概念が中心のため、deviconロゴの使用は限定的 | - | - |

→ deviconよりもカスタムSVG図解が主体のプロジェクト。電波・基地局・ネットワーク構造の図解を重視する。

## SVG図解の方針

- 電波の到達距離を視覚化（Sub-6 vs ミリ波の放射パターン）
- 基地局タワーのシルエット + 電波同心円
- 高速道路の車線分けアナロジー（ネットワークスライシング）
- 世代ごとの通信速度を棒グラフ的に表現
- スマホ画面に「5G」表示のモチーフ
