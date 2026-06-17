# Research 1b: 反論・例外・通説への異議

テーマ：「プログラミングとは結局何をしているのか」
視点：通説・素朴イメージへのカウンター、例外、「actually, it's not that simple」を支える反証

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| 1 | 開発者がデバッグ・検証に費やす時間は全開発時間の **35〜50%** を占め、複雑システムでは最大75%に達することもある。コスト面ではソフトウェア開発予算の50〜75%がデバッグ・テスト・検証に消費され、年間1000億ドル超の損失とされる。 | 🟢 | [Coralogix – developer activity breakdown](https://coralogix.com/blog/this-is-what-your-developers-are-doing-75-of-the-time-and-this-is-the-cost-you-pay/) / [ACM Queue "The Debugging Mindset"](https://queue.acm.org/detail.cfm?id=3068754/) | 「プログラミング＝新しいコードを書き続けること」という通説を最も直接に崩せる数字。動画のフック候補。 |
| 2 | コードを **書く** 時間と **読む** 時間の比率は **1:10** 以上。プログラマーは新しいコードを書くために、ほとんどの時間を既存コードを読むことに費やしている。出典はRobert C. Martin『Clean Code』（広く業界で引用される観察）。 | 🟡 | [Bayrhammer Klaus – Medium summary of Clean Code claim](https://bayrhammer-klaus.medium.com/you-spend-much-more-time-reading-code-than-writing-code-bc953376fe19) / [Goodreads – Robert C. Martin quote](https://www.goodreads.com/quotes/835238-indeed-the-ratio-of-time-spent-reading-versus-writing-is) | 査読付き実証ではなく観察ベースだが業界標準として定着。"書く仕事"というイメージを覆す定番論拠。🟡 扱いで「厳密な実験ではないが広く支持される経験則」と但し書き可。 |
| 3 | 開発作業時間の **61〜74%** は、コード入力そのものではなく、IDE操作・ファイルナビゲーション・ライブラリ導入・ツール切替など「周辺的な環境操作」に費やされている。 | 🟢 | [Coralogix report (同上)](https://coralogix.com/blog/this-is-what-your-developers-are-doing-75-of-the-time-and-this-is-the-cost-you-pay/) | 「タイプしている時間」はもっとずっと少ない、というファクト2とセットで使うと強い。 |
| 4 | バグ1件の修正には、1行のコードを書く時間の **約30倍** の時間がかかる。 | 🟡 | [AlgoCademy – Why Debugging Takes Longer](https://algocademy.com/blog/why-debugging-takes-longer-than-writing-the-actual-code/) | 具体的数字で直感に訴えやすい。ソースは業界記事で研究原典ではないので🟡。 |
| 5 | プログラミングに高度な数学は **原則として不要**。四則演算ができれば大半の業務は回る。論理的思考は必要だが、数学そのものは必須ではない。ただしゲーム3D・機械学習・暗号など特定分野は例外的に高い数学力を要求する。 | 🟢 | [テックキャンプ – プログラミングに数学の知識は不要？](https://tech-camp.in/note/technology/93274/) / [Geekly – 数学とプログラミングの関係性](https://www.geekly.co.jp/column/cat-technology/1903_054/) | 「プログラマー＝数学の達人」通説に対する国内向け定番論拠。例外として分野を列挙することで正確性を担保。 |
| 6 | 1977年ACMチューリング賞講演でJohn Backus（FORTRAN開発者）は「命令型プログラミングはフォン・ノイマン機械の限界を引きずっており、状態遷移に過度に依存している」と自ら痛烈に批判した。論文タイトル『Can Programming Be Liberated from the von Neumann Style?』。 | 🟢 | [ACM DL – Backus Turing lecture](https://dl.acm.org/doi/10.1145/359576.359579) / [Fermat's Library annotated version](https://fermatslibrary.com/p/15a1da0a) | 「CPUに命令を順番に与える」という通俗的定義を、業界の巨人自身が半世紀前に否定していたという重み。動画の"権威ある反論"として最強クラス。 |
| 7 | SQLは長らく「プログラミング言語か否か」が論争の対象。**標準SQLはチューリング完全ではなかった**が、SQL-99で `WITH RECURSIVE` と手続き拡張（PL/SQLなど）が導入され、現在はチューリング完全な領域を持つ。つまり「プログラミング言語」の境界は技術的にも揺れている。 | 🟢 | [Wikipedia – Turing completeness](https://en.wikipedia.org/wiki/Turing_completeness) / [DataCamp – Is SQL a Programming Language?](https://www.datacamp.com/blog/is-sql-a-programming-language) | 「プログラミング言語」の定義自体が曖昧というメタ論点。HTML・YAMLとの線引きの話題につなげられる。 |
| 8 | 宣言型プログラミング（SQL, Prolog, Haskell）は「HOWではなくWHATを記述する」パラダイム。`SELECT * FROM users WHERE id <= 100` と書いたとき、どうやってデータを取るかはエンジンに完全委譲されている。つまり「機械に手順を教える＝プログラミング」という定義は全パラダイムをカバーしない。 | 🟢 | [Wikipedia – Declarative programming](https://en.wikipedia.org/wiki/Declarative_programming) / [GeeksforGeeks – Imperative vs Declarative](https://www.geeksforgeeks.org/theory-of-computation/difference-between-imperative-and-declarative-programming/) | 「命令」メタファーが全パラダイムを説明しないことの最強の例示。 |
| 9 | 現代のCPUは **書いたコードを書いた順に実行していない**。Out-of-Order Execution（命令を入力データ可用性の順で並べ替え実行）と Speculative Execution（分岐の結果が出る前に投機的に処理を進める）を常用。結果のコミット順だけはプログラム順を保つ"見かけ"を維持しているにすぎない。 | 🟢 | [Wikipedia – Out-of-order execution](https://en.wikipedia.org/wiki/Out-of-order_execution) / [Wikipedia – Speculative execution](https://en.wikipedia.org/wiki/Speculative_execution) | 「コンピュータはコードの通りに動く」素朴イメージを崩す。Spectre/Meltdownの前提としても有名。 |
| 10 | 「コンパイル言語 vs インタープリタ言語」の二分法は現代では破綻している。Pythonは **ソースをバイトコードにコンパイル** → PVMで解釈実行し、CPython 3.13（2024）から実験的JITも導入。つまり「Pythonは機械語に変換されない」も「完全に逐次解釈」も正しくない。 | 🟢 | [Ned Batchelder – Is Python interpreted or compiled? Yes.](https://nedbatchelder.com/blog/201803/is_python_interpreted_or_compiled_yes.html) / [Wikipedia – JIT compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation) | 「ソースコード→機械語」という単純ストーリーの反例。Python採用の普及度の高さから視聴者に刺さりやすい。 |
| 11 | GitHub Copilotのランダム化対照実験では、Copilot使用群はタスク完了が **55.8%高速**（2時間41分 → 1時間11分）。ユーザーが書くコードの平均46%（Javaでは61%）がCopilot生成で、2025年時点で新規コード全体の約41%がAI生成との推計もある。 | 🟢 | [arXiv: The Impact of AI on Developer Productivity (Copilot RCT)](https://arxiv.org/abs/2302.06590) / [GitHub Blog – Copilot research](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) | 「プログラミング＝人間が文字を打つ活動」という定義が2024-2025年時点で実質的に書き換わっている証拠。 |
| 12 | Ada Lovelaceが「世界初のプログラマー」かは歴史学上の論争点。バベッジ自身が解析機関用の初期プログラム群を（大半未公開で）自書しており、Note Gのアルゴリズムもバベッジの寄与があった可能性が高い。ただしLovelaceは **公開された、汎用手続きとして明示されたアルゴリズム** としては最古級という評価は維持されている。 | 🟡 | [CACM – Was Ada Lovelace Actually the First Programmer?](https://cacm.acm.org/blogcacm/was-ada-lovelace-actually-the-first-programmer/) / [Prospect Magazine – Debugging the mythology](https://www.prospectmagazine.co.uk/ideas/technology/38160/debugging-the-mythology-was-ada-lovelace-really-the-first-computer-programmer) | 「プログラミングの起源」ナラティブがそもそも単純化されているという論点。扱いは慎重に（彼女の貢献否定ではなく通俗史観の修正として）。 |
| 13 | 「プログラマー」という職種は粒度が荒すぎ、Webフロントエンド、組込（C/アセンブリ＋リアルタイムOS＋Linux）、データサイエンティスト（統計・Python・SQL中心）、SRE/インフラ（Terraform・YAML・運用自動化）で日常業務もスキルセットも大きく異なる。データサイエンティストは数学・統計を重視、ソフトエンジニアは安定したシステム構築を重視、という明確な乖離がある。 | 🟢 | [Turing College – Data Science vs Software Engineering](https://www.turingcollege.com/blog/data-science-vs-software-engineering) / [Data Science PM – comparison](https://www.datascience-pm.com/data-science-vs-software-engineering/) | 「プログラマーは何をしているか」に一意の答えが出せないメタ事実。動画の"定義が揺れている"セクションの土台。 |
| 14 | 日本のプログラマー業務の実態は、コーディングに加え、**チームミーティング、単体テスト、バグ修正、SE/リーダーへの相談・打合せ**が1日に混在するのが標準。「コードを書くだけの仕事」ではないことが複数の職種紹介媒体で明記されている。 | 🟡 | [マイナビ転職 – プログラマー仕事内容](https://tenshoku.mynavi.jp/knowhow/caripedia/118/) / [レブテック – プログラマー解説](https://career.levtech.jp/guide/knowhow/article/99/) | 国内向けソース。日本語視聴者の直感に即した形で通説を崩せる。🟡 は定量データではなく業界観察レベルのため。 |

## 通説とのズレ（Summary）

1. **「プログラミング＝コードを書くこと」ではない。** 開発時間の35〜50%はデバッグ、コード**読解**と**書く**の比率は10:1以上、さらに作業時間の61〜74%はIDE操作・ナビゲーション等の周辺作業。純粋な"タイピング新規コード"は少数派活動である（ファクト1・2・3）。

2. **「命令を機械に順番に与える」という定義はパラダイムも実装も裏切る。** SQL・Haskell等の宣言型は"WHATだけ書いてHOWは委ねる"設計で、CPU自体もOut-of-Order/Speculative Executionで書かれた順に実行していない（ファクト8・9）。命令メタファーは上下両方で破綻している。

3. **「ソースコード→機械語」ストーリーは単純化のしすぎ。** Pythonはバイトコード経由＋JIT、JavaScriptはV8でJIT、WebAssemblyは中間表現、という現代の実行モデルは、古典的コンパイラ教科書の単純図式に収まらない（ファクト10）。

4. **「プログラマー」は実体が分裂した職名。** 組込・Web・データサイエンティスト・SREで日常業務もスキルセットも別物。「プログラミングとは何か」は職種ごとに答えが違うメタ事実があり、一枚岩の定義は不可能（ファクト13・14）。

5. **AIコーディングアシスタントが"プログラミング"の定義を書き換え中。** 2024-2025年時点で新規コードの約4割がAI生成、Copilot使用でタスク完了55.8%高速化という統計は、「人間が文字を打つ活動」という定義を実質的に無効化しつつある（ファクト11）。

6. **業界のレジェンド自身が通説を否定している。** FORTRAN開発者John Backusは1977年チューリング賞講演で「プログラミングはフォン・ノイマン式の桎梏から解放されるべき」と自己批判的に論じた。素朴な"プログラミング＝機械への指示"像は、少なくとも半世紀前に当事者から疑問視されている（ファクト6）。

7. **数学が必須という通説も、起源神話も要修正。** プログラミング一般は四則演算＋論理思考で足り、数学が真に必須なのはML・3Dグラフィクス・暗号等の一部分野に限られる。Ada Lovelace=世界初のプログラマー説も歴史学者間で論争中で、通説のナラティブは複数箇所で綻んでいる（ファクト5・12）。

---

## 使用可能な「actually, it's not that simple」モーメント候補

- 「プログラミングってコード書くことでしょ？」→ 実際は書く時間はむしろ少数派。デバッグと読解が大半。
- 「プログラマーって数学すごいんでしょ？」→ 分野次第。Webアプリに微分方程式はほぼ要らない。
- 「コンピュータはコードの通りに動くんでしょ？」→ CPUは書いた順で実行していない（OoO/投機実行）。
- 「プログラムってソースコードが機械語に変換されるやつでしょ？」→ Pythonはバイトコード経由、JITもあり、単純なストーリーでは説明不能。
- 「SQLって別にプログラミングじゃないよね？」→ 長年論争で、SQL-99以降はチューリング完全にもなっている。
- 「プログラミングって機械に命令する活動だよね？」→ 宣言型パラダイム（SQL・Prolog・Haskell）は"命令"ではなく"記述"。
- 「Ada Lovelaceが最初のプログラマーだったんでしょ？」→ 歴史家の間では今も論争中。

## ソース一覧（主要URL）

- Coralogix: https://coralogix.com/blog/this-is-what-your-developers-are-doing-75-of-the-time-and-this-is-the-cost-you-pay/
- ACM Queue "The Debugging Mindset": https://queue.acm.org/detail.cfm?id=3068754/
- Robert C. Martin 10:1 ratio (Medium要約): https://bayrhammer-klaus.medium.com/you-spend-much-more-time-reading-code-than-writing-code-bc953376fe19
- AlgoCademy – bug fix takes 30x: https://algocademy.com/blog/why-debugging-takes-longer-than-writing-the-actual-code/
- テックキャンプ – プログラミングに数学は不要？: https://tech-camp.in/note/technology/93274/
- Geekly – 数学とプログラミングの関係性: https://www.geekly.co.jp/column/cat-technology/1903_054/
- Backus Turing Lecture 1977/78 (ACM DL): https://dl.acm.org/doi/10.1145/359576.359579
- Fermat's Library – Backus annotated: https://fermatslibrary.com/p/15a1da0a
- Wikipedia – Turing completeness: https://en.wikipedia.org/wiki/Turing_completeness
- DataCamp – Is SQL a Programming Language?: https://www.datacamp.com/blog/is-sql-a-programming-language
- Wikipedia – Declarative programming: https://en.wikipedia.org/wiki/Declarative_programming
- GeeksforGeeks – Imperative vs Declarative: https://www.geeksforgeeks.org/theory-of-computation/difference-between-imperative-and-declarative-programming/
- Wikipedia – Out-of-order execution: https://en.wikipedia.org/wiki/Out-of-order_execution
- Wikipedia – Speculative execution: https://en.wikipedia.org/wiki/Speculative_execution
- Ned Batchelder – Is Python interpreted or compiled?: https://nedbatchelder.com/blog/201803/is_python_interpreted_or_compiled_yes.html
- Wikipedia – JIT compilation: https://en.wikipedia.org/wiki/Just-in-time_compilation
- arXiv – Impact of AI on Developer Productivity (Copilot RCT): https://arxiv.org/abs/2302.06590
- GitHub Blog – Copilot productivity research: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
- CACM – Was Ada Lovelace Actually the First Programmer?: https://cacm.acm.org/blogcacm/was-ada-lovelace-actually-the-first-programmer/
- Prospect Magazine – Debugging the mythology: https://www.prospectmagazine.co.uk/ideas/technology/38160/debugging-the-mythology-was-ada-lovelace-really-the-first-computer-programmer
- Turing College – Data Science vs Software Engineering: https://www.turingcollege.com/blog/data-science-vs-software-engineering
- マイナビ転職 – プログラマー仕事内容: https://tenshoku.mynavi.jp/knowhow/caripedia/118/
- レブテック – プログラマー解説: https://career.levtech.jp/guide/knowhow/article/99/
