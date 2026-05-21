# 1a. 主流・公式情報（アルゴリズム）

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|-------|------|-----|
| 1 | Donald Knuth は『The Art of Computer Programming』で、アルゴリズムが満たすべき5つの性質として **Finiteness（有限性）・Definiteness（明確性）・Input・Output・Effectiveness（実行可能性）** を挙げた | 🟢 | Knuth, TAOCP Vol.1 §1.1; bouraspage.com; informit.com | 1968年初版以来CS教育の標準 |
| 2 | Finiteness: アルゴリズムは有限ステップで必ず停止しなければならない | 🟢 | 同上 | 無限ループはアルゴリズムではない |
| 3 | Definiteness: 各ステップは曖昧さなく厳密に定義されていなければならない | 🟢 | 同上 | 「適度に」「美味しそうに」といった人間解釈依存はNG |
| 4 | アルゴリズムという言葉は9世紀ペルシャの数学者 Muhammad ibn Musa al-Khwarizmi の名前に由来 | 🟢 | Wikipedia; Britannica; NASA Science | 12世紀にラテン語訳 "Algoritmi de numero Indorum" で西洋に入った |
| 5 | 同じ al-Khwarizmi の著作 "Al-Jabr" が "algebra（代数）" の語源。つまり代数とアルゴリズムは兄弟 | 🟢 | Britannica; University of Melbourne | |
| 6 | Euclid の互除法（GCD計算）は紀元前300年ごろの『原論』第7巻で記述された、現存最古の非自明アルゴリズム | 🟢 | Wikipedia "Euclidean algorithm"; Britannica | 今も現役で暗号などに使われる |
| 7 | Church–Turing thesis: 「機械的に計算できる関数」は「Turing machine で計算できる関数」と一致する、という主張 | 🟢 | Stanford Encyclopedia of Philosophy; Wikipedia | 定理ではなく thesis（主張）。形式定義と直観定義の橋渡し |
| 8 | 計算量（time complexity）は入力サイズが増えたときの実行時間の「伸び方」を表す指標。Big O 記法で書く | 🟢 | freeCodeCamp; DataCamp; Wikipedia | O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ) |
| 9 | 同じ問題（例: ソート）に対して複数のアルゴリズムが存在する（bubble/quick/merge など）。どれも正しい答えを出すが速度と性質が異なる | 🟢 | VisuAlgo; w3schools | アルゴリズム＝唯一解ではない |
| 10 | Computational Thinking の4要素: Decomposition（分解）／Pattern Recognition（パターン認識）／Abstraction（抽象化）／Algorithmic Thinking（アルゴリズム的思考） | 🟢 | Jeannette Wing; openstax; learning.com | アルゴリズムは思考法の一部 |
| 11 | Binary search は事前にソート済みである必要があり、O(log n) で検索できる。電話帳を半分ずつ絞る発想 | 🟢 | w3schools; Khan Academy | 前提条件の存在がアルゴリズム設計の肝 |
| 12 | Knuth の言う Effectiveness: ステップが紙と鉛筆で人間が実行できるほど基本的であること | 🟢 | Knuth TAOCP; plato.stanford.edu | 「神のお告げを聞く」はアルゴリズムではない |
| 13 | Input はゼロ個以上（引数なしアルゴリズムも存在）、Output は1個以上 | 🟢 | Knuth TAOCP | 純粋な副作用だけを目的とするものは厳密にはアルゴリズムではない立場 |
| 14 | アルゴリズムはプログラミング言語から独立した抽象的概念。Python でも Java でも同じアルゴリズムを実装できる | 🟢 | Wikipedia; upgrad.com; Scaler | 言語依存はコード（実装）の話 |

## 所感

- 「5つの性質」は1968年以来ほぼ固定。ただし現代のML・確率的アルゴリズムとの整合は別途検討が必要（→ 1b）
- al-Khwarizmi から来ているという語源は、調べるまで多くの人が知らない**知的好奇心フック**として機能する
- 互除法が紀元前300年から現役という事実は「アルゴリズムは古い・時を超える」というメッセージの強力な武器
