# デザインガイド: あなたのパスワードは何秒で破られるか

## カラーパレット

セキュリティテーマに合わせた「信頼のブルー + 警告のレッド」基調

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #2563eb;       /* セキュリティブルー */
    --primary-light: #dbeafe;
    --teal: #059669;          /* 安全グリーン */
    --teal-light: #d1fae5;
    --coral: #dc2626;         /* 危険レッド */
    --coral-light: #fee2e2;
    --amber: #d97706;         /* 警告アンバー */
    --amber-light: #fef3c7;
    --card-bg: #ffffff;
    --border: #d1d5db;
}
```

## タイポグラフィ
- フォント: Zen Maru Gothic (400, 700, 900)
- Hero: 72px / Heading: 36px / Body: 24px / Caption: 22px / Small: 18px

## アイコン計画

### 台本中の技術名・企業名・サービス名

| 名称 | アイコンソース | パス/URL |
|------|--------------|----------|
| NVIDIA (GPU/RTX) | devicon | `icons/nvidia/nvidia-original.svg` (無い場合 theSVG `nvidia`) |
| Linux | devicon | `icons/linux/linux-original.svg` |
| Python | devicon | `icons/python/python-original.svg` |
| Have I Been Pwned | テキストバッジ | — (deviconもtheSVGもなし) |
| LinkedIn | devicon | `icons/linkedin/linkedin-original.svg` |
| Yahoo | Iconify | `simple-icons/yahoo.svg` → mdi確認 |
| LastPass | テキストバッジ | — |
| Apple | devicon | `icons/apple/apple-original.svg` |
| Google | devicon | `icons/google/google-original.svg` |
| NIST | テキストバッジ | — |
| FIDO Alliance | テキストバッジ | — |
| NordPass | テキストバッジ | — |

### SVG図解計画
- 金庫のダイヤル（エントロピー説明用）
- ハッシュ速度ゲージ（MD5 vs bcrypt vs Argon2）
- 漏洩規模の人物アイコングリッド
- パスワード保存フロー（平文→ハッシュ化）
- パスキー公開鍵暗号の鍵ペア図
- 文字種vs文字数の比較ゲージ
- 南京錠メタファー（開いた/閉じた）
