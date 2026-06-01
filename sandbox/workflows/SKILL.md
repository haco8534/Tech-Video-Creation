---
name: object_centric_video
description: オブジェクト中心ステージ思想の解説動画を、台本 → 全体デザイン → スペック → Remotion 実装の4段で組むマスターワークフロー
---

# オブジェクト中心動画 — マスター

題材を1本の解説動画にする 5 段パイプライン。

```
script.md → design_overall.md → design_spec.md → Composition.tsx → 仕上げ
```

- [1] **script.md** — 対話と論理区切り（→ `01_script.md`）
- [2] **design_overall.md** — 背骨と各画面の絵の眼目（一文）だけ（→ `02_design_overall.md`）
- [3] **design_spec.md** — event をセリフに紐付ける（→ `03_design_spec.md`）
- [4] **Composition.tsx** — Remotion 実装（→ `04_remotion.md`）
- [5] **仕上げ** — 出来た `Composition.tsx` にキャラと画像遷移を足す（→ `05_finishing.md`）

各段の成果物はユーザーに見せて合意してから次段へ。前段が固まる前に次段を書かない。

絵が説明そのもの——図は仕組みを動いて見せ、概念にラベルを貼る飾りにしない。全段の土台は `00_philosophy.md`。

確認は `preview` / still snapshot を優先（mp4 レンダは重い）。

参考実装：`sandbox/experiments/public_key_crypto/`
