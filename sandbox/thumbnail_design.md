# サムネイルデザイン方針

このプロジェクトのサムネイルは、技術解説チャンネルとしての見やすさを保ちつつ、クリックされるだけの視覚的な強さを持たせる。方向性は「丸ゴシックのゆるふわ技術解説」。硬いIT資料ではなく、明るい教材ポスターに近い。

## 基本トーン

- 丸ゴシック、太字、白フチ、やわらかい影を基本にする
- 図解はかわいく丸める。角ばったUI、鋭い吹き出し、過剰なスピード線は避ける
- 背景は teal / mint / cyan 系を主軸に、赤・黄・紫をアクセントで使う
- インパクトは出すが、煽りすぎない。解説チャンネルとして「わかりそう」「見やすそう」が先に来ること
- キャラクターは大きく置く。サムネの 35-45% 程度を占めてよい

## レイアウト

- 16:9、YouTube サムネ想定
- 左から中央にタイトルを大きく置く
- 右側 35-45% はキャラクター合成用に空ける
- 背景画像生成時点ではキャラクターを入れない
- キャラクターは後から合成し、白いステッカー風アウトラインを付ける
- キャラクターを置く場合は、胸元から上を表示し、顔を大きく見せる
- タイトル文字の一部がキャラクターで少し隠れてもよいが、主要語は読めるようにする

## 文字

文字は短くする。情報を詰めすぎず、サムネ単体では「気になる問い」だけ伝える。

良い例:

- `AIの中身`
- `ブラックボックス`
- `仕組み`
- `なぜ？`
- `実はこう`

避ける例:

- 長い文章
- 3行以上の説明文
- 細い文字
- 小さい補足テキスト
- 生成時に崩れやすい複雑な日本語を大量に入れること

## 背景の要素

使いやすい要素:

- 丸い白い吹き出しパネル
- 赤い丸角ラベル
- 黒い箱、開いた箱、疑問符
- 黄色の曲線矢印
- 小さなコードカード
- ニューラルネット風の丸ノード図
- 回路線、ドット、やわらかいハーフトーン
- 角丸カード、ステッカー風の小物

避ける要素:

- 3D ネオンのAIキューブ
- 光る脳、汎用AIストック画像
- 写実的なサーバールーム
- 鋭いギザギザ吹き出し
- 黒いスピード線の過剰使用
- 危険・警告感が強すぎる赤黒デザイン

## 生成プロンプト雛形

背景だけを生成する。キャラクターは入れない。

```text
Use case: ads-marketing
Asset type: YouTube thumbnail background, 16:9 landscape, 1280x720 final use

Primary request:
Create a Japanese tech explainer thumbnail background for a friendly rounded-gothic / yuru-fuwa channel style. No character.

Exact visible Japanese text, render cleanly and verbatim, and do not include any other readable text:
Top red rounded label: 「<短いラベル>」
Main huge rounded title: 「<メインタイトル>」

Typography:
Bold Japanese rounded gothic, thick and soft, friendly Maru Gothic feeling. Powerful but round letters, soft white sticker stroke, gentle black drop shadow. Avoid sharp square typography.

Scene/backdrop:
Teal and mint tech background with soft rounded halftone dots, rounded white speech-bubble panel behind the main title, cute rounded black mystery box at lower left, warm yellow light, curved yellow arrow, simplified neural network card and code card. Keep the composition clean and friendly.

Composition/framing:
Reserve the right 40% of the canvas as open teal/green textured space for a large character overlay. Do not place important text or objects in the rightmost 40%. Put the top label and main title on the left/center. Make the main title large and visually dominant, with comfortable breathing room.

Style/medium:
Polished Japanese educational YouTube thumbnail, soft comic infographic, rounded sticker design, clean high-contrast poster, approachable and professional.

Color palette:
Deep teal and mint, cream white, warm yellow, soft red, cyan, gentle lavender shadow.

Mood:
Friendly, curious, informative, rounded, not aggressive.

Constraints:
No mascot, no anime character, no person, no 3D neon cube, no glowing brain, no photorealistic stock AI, no sharp jagged speech bubbles, no harsh speed lines, no logo, no watermark, no extra unreadable text.
```

## キャラクター合成

合成はローカルで行う。画像生成でキャラクターまで作らせない。

- 立ち絵は透過PNGを使う
- 胸元から上だけ見せる
- 右側に大きく配置する
- 白い太フチを付ける
- その外側に薄いラベンダーの縁を少し入れる
- 影は薄く、背景から浮く程度にする

推奨アウトライン:

- 白フチ: 太め、くっきり
- 外側のラベンダー: ごく薄く
- ドロップシャドウ: 右下に少し

## 今回の基準画像

`experiments/ai_black_box/thumbnail/thumbnail_ai_black_box_zundamon_chest_v3.png` を基準にする。

良い点:

- 丸ゴシックの雰囲気に合っている
- 背景が明るく、解説チャンネルとして見やすい
- 文字が短く強い
- 右側のキャラが大きく、視線を作っている
- 白フチで背景からキャラが分離している

