---
description: YouTubeサムネ設計ワークフロー。3案比較から勝ち筋1本に絞り、画像生成AIには文字なし主役ビジュアルだけを作らせる。
version: 3.0-compact
---

# YouTubeサムネ設計ワークフロー compact

## 目的

動画タイトルから、CTRを狙えるサムネ案を作る。  
ただし、画像生成AIに完成サムネを作らせない。

画像生成AIに作らせるのは **文字なしの主役ビジュアル素材** だけ。  
日本語文字・最終レイアウト・可読性調整は後工程で行う。

---

## 最重要ルール

1. サムネは絵ではなく、一覧で視聴者を止める装置。
2. 1枚1メッセージ。
3. 説明図ではなく、画面内で起きている「事件」を見せる。
4. 小画面で見える要素は最大3つ。
5. 文字は原則、画像生成に入れない。後乗せする。
6. 3案出すが、最終的に1案だけ採用する。
7. 主役ビジュアルは画面の50〜70%を占める。
8. 事件部分は画面の25〜40%を占める。
9. 汎用アイコンの羅列は禁止。
10. 人物・顔・キャラ・3D・ネオン・グロー・AIっぽい装飾は禁止。

---

## 入力

```yaml
title: "動画タイトル"
audience: "想定視聴者。省略可"
channel_tone: "チャンネルの雰囲気。省略可"
avoid: "避けたい表現。省略可"
```

---

## Step 1: クリック理由の核を抽出

```yaml
surface_question: "タイトル上の表の問い"
hidden_tension: "視聴者が感じる違和感"
unknown_core: "視聴者がまだ知らない核心"
click_reason: "この動画をクリックする理由"
```

---

## Step 2: CTR戦略案を3つ作る

感情トリガーを変えて3案出す。

使う角度:

- 危機 / 損失
- 意外 / 逆説
- 対比 / 比較
- 暴露 / 裏側
- 解決 / 納得

各案の形式:

```yaml
angle: ""
core_hook: "0.5秒で止まる理由"
single_claim: "サムネが1枚で言うこと"
what_must_be_seen: "文字なしでも見えるべきもの"
risk: "弱くなる原因"
```

---

## Step 3: 採点して1案に絞る

各案を5点満点で採点する。

```yaml
scores:
  stop_power: 0
  instant_readability: 0
  emotional_strength: 0
  title_complement: 0
  visual_transformability: 0
  anti_cliche: 0
total: 0
```

最終的に1案だけ採用する。  
3案すべてをYAML化しない。

---

## Step 4: 採用案を物理的な異常に変換

抽象的な主張を、画面内の物理現象に置き換える。

```yaml
abstract_message: ""
physical_metaphor: ""
visual_event: ""
dominant_visual: ""
secondary_subject: ""
```

良い方向:

- 1つの物体に異常が起きている
- 壊れる / めくれる / 吸い込む / 漏れる / 千切れる / 重く沈む
- 見た瞬間に「何が起きてる？」と思う

悪い方向:

- アイコンを並べる
- 矢印で説明する
- 教材図にする
- 抽象概念をそのまま描く

---

## Step 5: 小画面テスト

160×90pxで残す要素を最大3つに絞る。

```yaml
small_view_test:
  must_remain_visible:
    - ""
    - ""
    - ""
  discard:
    - ""
  max_visible_elements: 3
```

ここで潰れる要素は、生成前に削る。

---

## Step 6: 文字戦略

画像生成には原則として文字を入れない。

```yaml
text_overlay:
  generate_text_in_image: false
  thumbnail_text: "0〜7字推奨"
  role: "論点の明確化 / 対比ラベル / 違和感の増幅"
  placement: ""
  color: ""
  note: "Figma/Canva/Photoshop等で後乗せ"
```

例:

- 支払い中
- 0円じゃない
- 裏側
- 消せない
- 本物？
- なぜ残る
- 変換中

---

## Step 7: 最終YAMLを1つだけ出力

```yaml
title: ""
audience: ""

selected_strategy:
  angle: ""
  core_hook: ""
  single_claim: ""
  selected_reason: ""

thumbnail_concept:
  abstract_message: ""
  physical_metaphor: ""
  visual_event: ""
  dominant_visual: ""
  secondary_subject: ""

small_view_test:
  must_remain_visible:
    - ""
    - ""
    - ""
  discard:
    - ""
  max_visible_elements: 3

composition:
  aspect_ratio: "16:9"
  layout: ""
  focal_order:
    1: ""
    2: ""
    3: ""
  dominance_ratio:
    main_subject: "50〜70%"
    event_area: "25〜40%"
  text_safe_area: ""

text_overlay:
  generate_text_in_image: false
  thumbnail_text: ""
  role: ""
  placement: ""
  color: ""

image_generation_prompt:
  prompt: |
    Create a YouTube thumbnail background visual, not a finished poster.
    Do not render any Japanese text, captions, titles, labels, logos, or UI text.
    Leave a clean empty area for text overlay.

    Aspect ratio: 16:9.

    Core message:
    ...

    Main visual:
    ...

    Visual event:
    ...

    Composition:
    ...
    The main subject should occupy about 50-70% of the frame.
    The event/failure point should be the strongest focal point.
    Keep visible elements limited to three or fewer at small thumbnail size.

    Style:
    ...

    Palette:
    ...

    Important:
    This must work at 160x90 pixels.
    The viewer should understand the core visual event before reading any text.
    No people, no faces, no characters.
    No neon glow, no bloom, no glossy 3D, no soft 3D, no clay render, no floating decorative icons.
    No busy background.
  negative_prompt: |
    people, faces, characters, anime, mascot, glossy 3D, soft 3D, clay render,
    neon glow, bloom, purple-cyan-pink gradient, floating icons, busy background,
    generic infographic, too many small objects, Japanese text, captions, labels

style:
  palette: ""
  style_direction: ""
  anti_ai_ingredients:
    - "紙・印刷・インク・実物素材の質感を少し入れる"
    - "完全すぎないズレやラフさを少し入れる"
  avoid:
    - "3D"
    - "ネオン"
    - "グロー"
    - "人物"
    - "顔"
    - "情報過多"

hypothesis: ""
failure_risks:
  - ""
  - ""
  - ""
```

---

## 最終チェック

```yaml
check:
  - "1枚1メッセージか"
  - "主役は1つか"
  - "事件が画面の中心か"
  - "事件が小さすぎないか"
  - "小画面で見える要素は3つ以内か"
  - "画像生成に日本語文字を任せていないか"
  - "タイトルの丸写しになっていないか"
  - "教材図・汎用アイコン図になっていないか"
  - "AIっぽい3D/ネオン/グローを避けているか"
```

---

## 出力ルール

- 結果は **応答の中に直接出力する** こと。
- **ファイルへの書き出し（Write / Edit / Bash 経由のリダイレクト等）は行わない**。
- **YAMLは1タイトルにつき1つだけ**。各YAMLは ```yaml ... ``` のコードフェンスで囲む。
- N個のタイトルを処理した場合、最終的に N 個のYAMLが出力される。
- Step 1〜6 の検討過程は応答に含めてよいが、最終的な Step 7 のYAMLが各タイトル1つずつ揃っていること。
