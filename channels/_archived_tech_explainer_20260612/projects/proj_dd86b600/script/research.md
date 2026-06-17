# research.md — 統合キーファクト

テーマ: なぜ「再起動したら直る」が全てを解決してしまうのか

## 主因・副因の切り分け

「再起動で直る」の**主因は Heisenbug ファミリー**（Jim Gray 1985）。すなわち、レースコンディション・タイミング依存・メモリリーク・断片化・リソース枯渇・キャッシュ汚染・ロック未解放など、プロセスの揮発的な内部状態に依存する不具合。副因として OS／ドライバの状態破損、古い設定の残留もある。

「直らない」主因は Bohrbug（決定論的バグ）・ハードウェア故障・永続化された不整合。両者を分ける軸は「**状態が揮発性メモリにあるか、不揮発ストレージ／物理にあるか**」。

## コアファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---|---|---|
| 1 | RAM は揮発性メモリ。再起動で全プロセスの状態が消える | 🟢 | [Wikipedia: Memory leak](https://en.wikipedia.org/wiki/Memory_leak) |
| 2 | プロセス終了時に OS がメモリ・ファイルハンドル・DB接続・ソケットを一括回収する | 🟢 | [78IT](https://www.78it.com/memory-leak/) |
| 3 | メモリリークは「確保したメモリを解放しない」バグ。再起動で全リセット | 🟢 | [ja.Wikipedia: メモリリーク](https://ja.wikipedia.org/wiki/%E3%83%A1%E3%83%A2%E3%83%AA%E3%83%BC%E3%82%AF) |
| 4 | メモリフラグメンテーションは長時間稼働で進み、連続領域確保を阻害し CPU キャッシュ効率も落とす | 🟢 | [ja.Wikipedia: フラグメンテーション](https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%A9%E3%82%B0%E3%83%A1%E3%83%B3%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3) |
| 5 | レースコンディションは非決定的。同じ入力でもタイミング差で発生／非発生が分かれる | 🟢 | [Wikipedia: Race condition](https://en.wikipedia.org/wiki/Race_condition) |
| 6 | デッドロックはそのプロセスのロック状態に依存。プロセス作り直しでリセット | 🟢 | [Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/developer/visualstudio/visual-basic/language-compilers/race-conditions-deadlocks) |
| 7 | Heisenbug（観測すると消えるバグ）の語は Jim Gray の 1985 年 Tandem 技術報告。調査では障害 132 件中 Bohrbug 1 件、残りは全部 Heisenbug | 🟢 | [Jim Gray TR 85.7](https://courses.cs.duke.edu/spring11/cps210/papers/Gray_computers_stop.pdf) |
| 8 | Bohrbug は決定論的・再現可能。再起動では直らない | 🟢 | [Heisenbug vs Bohrbug 論文](https://www.cs.rutgers.edu/~rmartin/teaching/spring03/cs553/papers01/06.pdf) |
| 9 | 再起動は対症療法。根本原因（バグ本体）は残存する | 🟢 | [78IT](https://www.78it.com/memory-leak/) / [issoh tech](https://www.issoh.co.jp/tech/details/3621/) |
| 10 | ハードウェア故障（HDD劣化、熱暴走、メモリ不良）による再起動ループは再起動で直らない | 🟢 | [デジタルデータリカバリー](https://www.ino-inc.com/data_check/pc/reboot.php) |
| 11 | Boeing 787 Dreamliner の GCU は 32bit 符号付きカウンタが 248 日で整数オーバーフロー。FAA が暫定的に 120 日ごとの電源再投入を義務付けた | 🟢 | [engadget](https://www.engadget.com/2015-05-01-boeing-787-dreamliner-software-bug.html) / [iTnews](https://www.itnews.com.au/news/critical-software-bug-could-down-boeing-787s-mid-flight-403500) |
| 12 | Crash-Only Software（Candea & Fox, Stanford, HotOS IX 2003）: 停止はクラッシュのみ、再開はリカバリのみ、という設計パラダイム | 🟢 | [Crash-Only Software 論文](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/candea/candea.pdf) |
| 13 | Crash-Only の主張: shutdown 経路はバグを埋め込みやすく、リカバリ経路は普段使われないので腐る。常にクラッシュで止める方が信頼性が高い | 🟢 | [同論文](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/candea/candea.pdf) |
| 14 | Microreboot（Candea, OSDI 2004）: コンポーネント単位の細粒度再起動。復旧時間と失われる仕事量を1桁削減 | 🟢 | [Microreboot 論文](https://www.usenix.org/legacy/events/osdi04/tech/full_papers/candea/candea.pdf) |
| 15 | Erlang / OTP の "Let It Crash": 子プロセスは自分で直そうとせずクラッシュし、Supervisor が再起動戦略を持つ。WhatsApp / WeChat のバックボーン | 🟢 | [Joe Armstrong thesis 2003](https://erlang.org/download/armstrong_thesis_2003.pdf) |
| 16 | Let It Crash の本質は「障害を隠す」ではなく「**障害を封じ込め他に波及させない**」 | 🟢 | [Verraes blog](https://verraes.net/2014/12/erlang-let-it-crash/) |
| 17 | Software Rejuvenation（Trivedi, Duke）: 壊れる前に予防的に再起動してクリーン状態に戻す。航空管制・電話交換機で実装 | 🟢 | [Wiley: Trivedi](https://onlinelibrary.wiley.com/doi/full/10.1002/9780470050118.ecse394) |
| 18 | Kubernetes の liveness probe は失敗時にコンテナを自動再起動する。自己修復の標準機能 | 🟢 | [Kubernetes 公式](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) |
| 19 | The IT Crowd（英, 2006）の "Have you tried turning it off and on again?" が IT サポートの代名詞として定着 | 🟢 | [Wikipedia: The IT Crowd](https://en.wikipedia.org/wiki/The_IT_Crowd) |
| 20 | ミッションクリティカル／セーフティクリティカル（航空機フライトコントロール、原発制御、緊急通報、金融基幹、医療機器）では「気軽に再起動」は許されない | 🟢 | [ja.Wikipedia: ミッションクリティカル](https://ja.wikipedia.org/wiki/%E3%83%9F%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%86%E3%82%A3%E3%82%AB%E3%83%AB) |
| 21 | 「絶対止まらないシステム」は原理的に作れない。故障前提で早く戻す設計が主流 | 🟡 | [日経 xTECH](https://xtech.nikkei.com/atcl/nxt/column/18/00166/062600128/) |

## 通説への異議（3件以上）

- **通説**: 再起動で直ったなら解決した  
  **異議**: 🟢 再起動は対症療法。原因となるバグ（メモリリーク・レース条件・リソース枯渇）は残存し、時間経過で再発する（B1, B8, B9）
- **通説**: 再起動が何でも効く万能の第一手  
  **異議**: 🟢 Bohrbug（決定論的バグ）・ハードウェア故障・永続化された不整合には効かない（B2, B5, B10）
- **通説**: 再起動はその場しのぎの雑な対処  
  **異議**: 🟢 Crash-Only Software / Microreboot / Erlang Supervisor / Kubernetes の liveness probe など、**「再起動で直せるように最初から設計する」が現代の設計パラダイムとして確立**している。雑ではなく設計思想（C1〜C7）
- **通説**: 再起動できないシステムの方が優れている  
  **異議**: 🟢 Crash-Only 論文の知見では、shutdown 経路は普段使われず腐りやすく、正常終了するよりクラッシュ＋リカバリのほうが速い場合がある。何を優先するかの領域依存（C2, C10）

## 視聴者の日常経験との接続ポイント

- スマホの挙動がおかしい→再起動で直った経験
- Zoom / Google Meet の音声が急に出なくなって再接続で復帰
- IT サポートに電話したら最初に「一度再起動してください」と言われる（文化ネタ）
- Windows Update 後の再起動要求
- ゲーム機が長時間プレイで重くなる → 再起動で復活
- アプリを完全終了して再起動したら通知が届くようになった
