# 技術解説動画プロジェクト

オブジェクト中心の図解で技術解説動画を作るメインプロジェクト。

台本から Remotion 実装までを `workflows/` の手順で進め、各動画は
`experiments/{topic}/` にまとめる。

## 構造

```text
.
├── README.md
├── engine/                    # Remotion 実行環境
├── experiments/
│   └── {短いテーマ名}/
│       ├── script.md          # 台本
│       ├── references.md      # 参考文献
│       ├── design_overall.md  # 全体デザイン方針
│       ├── design_spec.md     # セリフ単位 event 仕様
│       ├── scriptData.ts      # script.md から生成
│       ├── audioData.ts       # VOICEVOX 合成時に生成
│       └── Composition.tsx    # Remotion 本体
├── reference_videos/          # 台本・構成分析用の参照
└── workflows/                 # 制作ワークフロー
```

## 動かし方

`engine/src/Root.tsx` に Composition を登録して使う。

```bash
cd engine
npm run dev
# 一覧から image-generation などを選択
```

## 哲学（本番との差分）

旧方式が抱えていた「AI動画ぽさ」の改善を狙う:

| 項目 | 旧方式 | このプロジェクトの方針 |
|---|---|---|
| シーン構造 | シーン分割で画面リセット | **オブジェクト中心の連続舞台**（要素が変形・移動・退場で話を進める） |
| 文字量 | スライドにも説明文 | **文字最小**（説明は音声・絵で完結） |
| 配色 | 12色超のパレット | 4色前後の抑制配色 |
| 書体 | Zen Maru Gothic（丸ゴシック） | 明朝体（地理ゆっくり的） |
| 装飾 | カード+グラデ | 紙・地図・教科書感 |

## 制作の流れ

1. `workflows/01_script.md` に従って `script.md` と `references.md` を作る
2. `workflows/02_design_overall.md` に従って背骨と画面リストを決める
3. `workflows/03_design_spec.md` に従って event をセリフへ紐付ける
4. `workflows/04_remotion.md` に従って `Composition.tsx` を実装する
5. `workflows/05_finishing.md` に従って立ち絵・字幕・音声・BGM を仕上げる
