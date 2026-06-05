# LLMの仕組み — manim 実装

`experiments/llm` の台本・design_overall・design_spec を入力に、実装段だけを Remotion ではなく **manim**（Community v0.20）で組んだもの。図のみ・無音。色言語と画面構成は `experiments/llm/design_overall.md` / `design_spec.md` に従う。

成果物：[llm_manim_full.mp4](llm_manim_full.mp4)（5画面・約1分46秒・854×480）

## 構成

`llm_video.py` に画面1つ＝1 Scene。画面内は連続変形（`Transform`）、画面の切り替わりだけがリセット点。

| Scene | 画面 | 中心の図 |
|---|---|---|
| `S1Intro`  | 序論     | 伸びる文 → 開くと中身は地図上の一点 |
| `S2Body1`  | 言葉を地図に置く | 数直線→2次元地図、男→女ベクトルの平行移動で女王へ、穴埋めでクラスタ収束 |
| `S3Body2`  | 文脈で研ぎ澄ます | 「それ」が全語へ問い合わせ→魚へ収束（Attention）、ぼやけ→ピント |
| `S4Body3`  | 次の一語を引く | 確率の山・温度つまみ・幻覚・自己回帰の輪・設計図なしの建物 |
| `S5Outro`  | 結論     | 場所と距離だけ → 中国語の部屋 ↔ 人間の地図 |

## レンダ

```sh
# 各画面（低画質プレビュー）
.venv/Scripts/python.exe -m manim -ql --disable_caching llm_video.py S1Intro S2Body1 S3Body2 S4Body3 S5Outro
# 結合
cd media/videos/llm_video/480p15
ffmpeg -y -f concat -safe 0 -i concat.txt -c:v libx264 -pix_fmt yuv420p -r 15 ../../../../llm_manim_full.mp4
```

`-ql`=480p15、`-qm`=720p30、`-qh`=1080p60。本番は `-qh`。

## 環境

- venv：`.venv`（Python 3.11、manim 0.20.1）
- 日本語：`Text(..., font="Yu Gothic")`。LaTeX 不使用（`Tex`/`MathTex` を避け、`Text`＋幾何プリミティブのみ）。
- 背景：白（`config.background_color`）。
