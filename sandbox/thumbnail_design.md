# サムネイルデザイン方針

このプロジェクトのサムネイルは、技術解説チャンネルとしての知的さを保ちながら、YouTubeでクリックされる強い視認性とキャラクター主役感を両立させる。

最重要の制作前提は次の通り。

- サムネイル作成には `gpt image2` を使う。
- タイトル文字、ラベル文字、記号、装飾、背景はすべて画像生成時に作る。
- 文字をあとからローカル編集で追加しない。
- あとから合成するのはキャラクター画像だけ。
- 画像生成時点ではキャラクターを入れず、キャラクター配置用の余白を確保する。

## 基本方針

- 方向性は「知的」「キャラ主役」「YouTube感強め」。
- かわいい教材ポスターではなく、AIや仕組みへの知的な疑問を強く見せるサムネイルにする。
- 背景と文字は一枚の完成背景として生成し、ローカル処理では文字やUIを追加しない。
- キャラクターは最後に右側へ大きく合成し、白フチで背景から分離する。
- 最終的にスマホの小さい表示でも、主語と疑問が一瞬で読めることを優先する。

## レイアウト

- 16:9、YouTubeサムネイル用。
- 左側から中央に、生成済みの大きなタイトル文字を置く。
- 右側 35-45% はキャラクター合成用に空ける。
- 右側のキャラクター余白には、重要な文字を置かない。
- 背景生成時点で、キャラクターや人物は入れない。
- キャラクターは後からローカルで合成する。
- キャラクターは顔と上半身が大きく見えるように配置する。

## 文字の扱い

文字は必ず画像生成で作る。あとからテキストレイヤー、Pillow、Photoshop、編集ソフトなどで追加しない。

良い文字の条件:

- 短い。
- 大きい。
- 2行以内を基本にする。
- 疑問や引っかかりがある。
- 技術テーマの核心が伝わる。
- 日本語として自然で読みやすい。

避ける文字:

- 長い説明文。
- 3行以上の細かい文章。
- 小さい補足テキスト。
- 生成時に崩れやすい複雑な日本語を大量に入れる。
- 読めなくても成立しない細かいUI文字。

## デザイン方向

現在の優先方向は「知的リアクション型・AIミステリーサムネ」。

- 明るすぎる教材感より、少し深い知的な雰囲気を優先する。
- ただし暗くしすぎず、YouTubeサムネとして強いコントラストを出す。
- キャラクターが主役に見えるよう、背景はキャラクターの表情を引き立てる。
- 仕組みを説明する図解より、「なぜそう見えるのか」という疑問を視覚化する。

## 色合い

推奨:

- ダークネイビー。
- 深い青緑。
- ブルーパープル。
- クリームホワイト。
- シアンの発光アクセント。
- 黄色の疑問符や注目アクセント。
- 赤は小さな強調に限定する。

避ける:

- 全体がミントやパステルだけの軽い配色。
- 赤ラベル頼みの既視感が強い構成。
- 警告感が強すぎる赤黒デザイン。
- かわいすぎる幼児教材風。
- 3DネオンAIキューブ、発光する脳、実写風サーバールーム。

## フォント感

生成時に狙う文字の雰囲気:

- 太い日本語ゴシック。
- 少しだけ丸みがある。
- 丸ゴシックに寄せすぎない。
- 白フチまたは濃い影でスマホ表示でも読める。
- 知的で強いが、硬すぎない。

避ける:

- 細いフォント。
- 手書き風すぎる文字。
- 子ども向けの丸文字。
- 装飾が多すぎて読みにくい文字。

## 背景の要素

使いやすい要素:

- 予測スロット。
- トークンの帯。
- 確率バー。
- 単語ノード。
- うっすらした分析ボード。
- 光る疑問符。
- シアンの接続線。
- 奥行きのある抽象的なAI空間。

避ける要素:

- キャラクター、人物、手、顔。
- 読ませる必要がある細かい英字やコード。
- 写実的なAI研究室。
- 情報量が多すぎる図解。
- 背景だけで主役になりすぎる派手な装飾。

## 生成プロンプト雛形

背景と文字をまとめて生成する。キャラクターだけは入れない。

```text
Use case: ads-marketing
Asset type: YouTube thumbnail, 16:9 landscape, 1280x720 final use
Model: gpt image2

Primary request:
Create a finished Japanese YouTube thumbnail background with all title text already rendered in the image. Do not leave text to be added later. No character, no person, no mascot. Reserve the right 40-45% of the canvas for a large character overlay added later.

Exact visible Japanese text, render cleanly and verbatim, and do not include any other readable text:
Small hook text: <短いフック>
Main huge title: <メインタイトル>

Design direction:
Intellectual, character-led, strong YouTube thumbnail impact, AI mystery atmosphere. Mature but clickable Japanese tech explainer style.

Composition:
Put all important text on the left and center-left. Keep the right 40-45% open for a large character overlay. Add a subtle AI prediction visual such as a glowing prediction slot, token strip, probability bars, word nodes, and cyan connection lines. The text must be the dominant visual element on the left.

Typography:
Extra-bold Japanese gothic, slightly rounded but not childish. High readability on mobile. Cream white or bright white letters, clean outline, dark navy shadow. Avoid thin fonts and overly cute rounded fonts.

Color palette:
Dark navy, deep blue-green, blue-purple, cream white, cyan glow, warm yellow accents, very small red accent only if useful.

Mood:
Intellectual curiosity, "why does this work?", mysterious but not scary, polished Japanese educational YouTube thumbnail.

Constraints:
No character, no person, no mascot, no logo, no watermark. Do not add any readable text other than the specified Japanese text. Avoid pastel mint-only design, red-label-dominant design, cute classroom poster style, 3D neon cube, glowing brain, photorealistic server room, and crowded small diagrams.
```

## キャラクター合成

キャラクター合成はローカルで行う。画像生成ではキャラクターを作らせない。

- 透過PNGのキャラクターを使う。
- 右側 35-45% に大きく配置する。
- 顔と上半身を優先して見せる。
- 白フチを付ける。
- 必要なら薄いラベンダーやシアンの外側フチを少し入れる。
- 影は薄く、背景から浮く程度にする。
- 合成時に文字は追加しない。

## 基準画像

キャラクターの大きさと白フチの参考:

`experiments/ai_black_box/thumbnail/thumbnail_ai_black_box_zundamon_chest_v3.png`

参考にする点:

- 右側のキャラクターが大きく、視線を作っている。
- 白フチで背景から分離している。
- 文字が短く、強い。

ただし、今後は背景・文字・色合いをゼロから再設計し、ミント中心の柔らかい教材風に固定しない。
