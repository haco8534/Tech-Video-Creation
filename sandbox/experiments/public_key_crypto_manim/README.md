# 公開鍵暗号の仕組み — manim 実装

`experiments/public_key_crypto` の台本・design_overall・design_spec を入力に、実装段だけを Remotion ではなく **manim**（Community v0.20）で組んだもの。図のみ・無音。比喩・色言語・画面構成は `experiments/public_key_crypto/design_overall.md` / `design_spec.md` に従う。

成果物：[pkc_manim_full.mp4](pkc_manim_full.mp4)（5画面・約1分15秒・854×480）

## 背骨

舞台は **人目のある通信路**。白い道が画面を横切り、左に送り手・右に受け手、上から一つの目が見おろす。道の上を渡るのは一つの **箱**（施錠度0＝ふた開・中身見える／1＝錠前で固く閉じる）。錠前・鍵・箱という実体の道具を動かして、箱が人目の道を安全に渡りきるまでを追う。

## 構成

`pkc_video.py` に画面1つ＝1 Scene。画面内は連続変化、画面の切り替わりだけがリセット点。

| Scene | 画面 | 中心の図 |
|---|---|---|
| `S1Intro`  | 序論     | 開いた箱が読まれる→錠前で閉じる→鍵を渡す段で盗まれ破れる（堂々めぐり） |
| `S2Body1`  | 錠前と鍵を分ける | 鍵なしで閉まる南京錠→鍵を手元に残す→錠前は配る→配られた錠前で閉じ、手元の鍵で開く |
| `S3Body2`  | 片道の計算 | 素数の積は行き＝やさしい・戻り＝険しい壁。落とし戸（秘密の数）だけが近道を開く |
| `S4Body3`  | 署名 | 秘密鍵で閉め、配られた錠前で誰でも開く。開けた事実が「ただ一人が閉めた」証し |
| `S5Outro`  | 結論     | 4工程の振り返り→序論の不思議へ回帰→手元の鍵だけで開く |

## 専用オブジェクト

汎用の「ラベル付き箱」は使わず、仕組みを動いて見せる道具を実装：

- `Padlock` — U字のつるが開閉する南京錠。`snap_close()`/`snap_open()` でつるが回る。本体色で公開（ティール）／金属を塗り分け。
- `Key` — 持ち手の輪＋軸＋歯。秘密鍵はアンバー。
- `Box` — ふたが蝶番で立ち上がり、中の手紙が見える。`open_lid()`/`close_lid()`。
- `Eye` — 通信路の上の目。`gaze()` で対象へ視線を引く（危険＝コーラル／公開＝ティール）。
- `make_channel` — 通信路と送り手・受け手の台。

錠前のつる・箱のふたの回転軸は、縮小・移動の後でも正しく回るよう**呼び出し時に現在位置から取る**（`Padlock._pivot()` は左脚の根元、`Box._hinge()` は本体の左上角）。生成時に固定すると、移動後に軸がずれて開閉が破綻する。

## レンダ

```sh
# 各画面（低画質プレビュー）
.venv/Scripts/python.exe -m manim -ql --disable_caching pkc_video.py S1Intro S2Body1 S3Body2 S4Body3 S5Outro
# 結合（concat.txt に5本を順に並べて）
cd media/videos/pkc_video/480p15
ffmpeg -y -f concat -safe 0 -i concat.txt -c:v libx264 -pix_fmt yuv420p -r 15 ../../../../pkc_manim_full.mp4
```

`-ql`=480p15、`-qm`=720p30、`-qh`=1080p60。本番は `-qh`。スモーク確認は `-s`（最終フレームのみ PNG 出力）。

## 環境

- venv：`experiments/llm_manim/.venv` を共用（Python 3.11、manim 0.20.1）。
- 日本語：`Text(..., font="Yu Gothic")`。LaTeX 不使用（`Tex`/`MathTex` を避け、`Text`＋幾何プリミティブのみ）。
- 色：背景 `#F5F7FA`／公開＝ティール `#2F8FB3`／秘密＝アンバー `#D99A2B`／危険＝コーラル `#D9543C`／確認・署名＝グリーン `#3F9D57`。
