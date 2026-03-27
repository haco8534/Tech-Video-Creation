# Design Guide: プログラマMac好きすぎない？

## テーマ
Mac vs Windows vs Linux のOS選択論。技術・歴史・文化を複合的に解説。

## カラーパレット

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #0071e3;       /* Appleブルー */
    --primary-light: #e3f0ff;
    --teal: #14b8a6;          /* Linux/Unix系 */
    --teal-light: #ccfbf1;
    --coral: #ef4444;         /* Windows系 */
    --coral-light: #fee2e2;
    --amber: #f59e0b;         /* 歴史・NeXT */
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
- フォント: Zen Maru Gothic (400/700/900)
- 見出し: 700〜900
- 本文: 400〜700

## SVGアイコン計画
| アイコン | 用途 | ソース |
|---------|------|--------|
| Apple ロゴ | Mac関連シーン | Simple Icons |
| Windows ロゴ | Windows関連 | Simple Icons |
| Linux ペンギン | Linux関連 | Simple Icons |
| Terminal | ターミナル説明 | Lucide |
| Server | サーバー説明 | Lucide |
| Smartphone | iPhone関連 | Lucide |
| Package | Homebrew | Lucide |
| Network | ネットワーク効果 | Lucide |
| GitBranch | Unix系統図 | Lucide |
| History | 歴史タイムライン | Lucide |

## レイアウト方針
- ライトテーマ（白系背景）
- フラットデザイン、グラデーション禁止
- 非対称レイアウトを積極的に使用
- 図解中心（50%以上がカスタムSVG図解）
