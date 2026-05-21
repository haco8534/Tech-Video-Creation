# sandbox/

新しいビジュアル語彙を本番から隔離して試作する場所。

良いものができたら **スキル化**（`channels/tech_explainer/skills/`）し、
既存ワークフロー（`create-video-full.md` の Phase C3）を新方式に置き換える。

## 構造

```
sandbox/
├── README.md
├── experiments/
│   └── {連番}_{短いテーマ名}/
│       ├── notes.md           ← 設計意図・観察・採否判断
│       ├── Composition.tsx    ← Remotion本体
│       └── ...
└── assets/                    ← 試作用素材（必要時）
```

## 動かし方

`engine/src/Root.tsx` に `sandbox-{連番}-{テーマ}` というIDで一時登録される。

```bash
cd engine
npx remotion preview
# 一覧から sandbox-001-jpeg などを選択
```

## 哲学（本番との差分）

本番チャンネルが抱えていた「AI動画ぽさ」の改善を狙う:

| 項目 | 本番（現状） | sandbox の方針 |
|---|---|---|
| シーン構造 | シーン分割で画面リセット | **オブジェクト中心の連続舞台**（要素が変形・移動・退場で話を進める） |
| 文字量 | スライドにも説明文 | **文字最小**（説明は音声・絵で完結） |
| 配色 | 12色超のパレット | 4色前後の抑制配色 |
| 書体 | Zen Maru Gothic（丸ゴシック） | 明朝体（地理ゆっくり的） |
| 装飾 | カード+グラデ | 紙・地図・教科書感 |

## 試作 → 本番 移行の流れ

1. 試作の `notes.md` に「採用」を記録
2. 共通パターンを `channels/tech_explainer/skills/` のスキル（SKILL.md + 雛形）に抽出
3. 既存ワークフローの該当フェーズを新スキル参照に書き換え
4. 既存プロジェクトはそのまま、新規プロジェクトから新方式で生成
