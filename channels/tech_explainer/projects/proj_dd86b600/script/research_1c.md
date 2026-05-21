# research_1c.md — 背景・設計思想・歴史

なぜ現代のソフトウェアは「再起動が効く」ように作られているのか。

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| C1 | **Crash-Only Software**（Candea & Fox, Stanford, HotOS IX 2003）: プログラムを止める唯一の方法は「クラッシュ」、再開する唯一の方法は「リカバリ」とする設計パラダイム。shutdown と startup の2経路を1経路にする | 🟢 | [Crash-Only Software 論文](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/candea/candea.pdf) / [Wikipedia](https://en.wikipedia.org/wiki/Crash-only_software) | 「再起動で直る」を前提に設計する発想転換 |
| C2 | 著者らの主張: 多くのソフトウェアは**正常終了するよりクラッシュして復旧するほうが速い**。shutdown 経路はバグを埋め込みやすく、リカバリ経路は普段使われないので腐る。クラッシュ＝recovery を常時訓練する設計のほうが結果的に信頼性が高い | 🟢 | [Crash-Only Software 論文](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/candea/candea.pdf) | |
| C3 | **Microreboot**（Candea ら, OSDI 2004）: システム全体ではなく、**細粒度のコンポーネント単位で再起動**する技術。同じ障害を1桁速く復旧し、失われる仕事量も1桁少ない。インターネットサービスに適用 | 🟢 | [Microreboot 論文](https://www.usenix.org/legacy/events/osdi04/tech/full_papers/candea/candea.pdf) / [Wikipedia](https://en.wikipedia.org/wiki/Microreboot) | 「再起動」を粒度でコントロールする進化 |
| C4 | **Erlang / OTP の "Let It Crash"**: プロセスが異常に遭遇したら自分で直そうとせず、まずクラッシュさせる。Supervision Tree の親プロセスが、あらかじめ決めた戦略で子プロセスを再起動する | 🟢 | [Joe Armstrong PhD thesis 2003](https://erlang.org/download/armstrong_thesis_2003.pdf) / [DEV Community](https://dev.to/adolfont/the-let-it-crash-error-handling-strategy-of-erlang-by-joe-armstrong-25hf) | Erlang が WhatsApp / WeChat のバックボーンを支える設計思想 |
| C5 | "Let It Crash" の本質は「障害を隠す」のではなく「**障害を封じ込めて他に波及させない**」。エラー処理コードが本体のロジックを汚染するのを避け、監視プロセスが独立に判断する | 🟢 | [Joe Armstrong thesis](https://erlang.org/download/armstrong_thesis_2003.pdf) / [Verraes blog](https://verraes.net/2014/12/erlang-let-it-crash/) | |
| C6 | **Software Rejuvenation**（Trivedi, Duke）: 動いているソフトを**クラッシュする前に**意図的に再起動してクリーンな状態に戻す予防保全。時間ベースと予測ベースがある。電話交換機、航空管制、J2EE サーバーで実装例 | 🟢 | [Trivedi: Software Aging and Rejuvenation (Wiley)](https://onlinelibrary.wiley.com/doi/full/10.1002/9780470050118.ecse394) | 再起動を運用スケジュールに組み込む |
| C7 | Kubernetes の自己修復（self-healing）は、liveness probe 失敗→コンテナ kill→再起動 というループを**標準挙動として内蔵**している。大規模クラウド時代に「再起動文化」が運用インフラに組み込まれた | 🟢 | [Kubernetes 公式](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) | |
| C8 | **The IT Crowd**（英 Channel 4, 2006〜）のロイの決め台詞 "Have you tried turning it off and on again?" が「IT サポートの代名詞」として世界的に定着した。笑いのネタとして成立するほど、この経験が普遍的に共有されている | 🟢 | [Wikipedia: The IT Crowd](https://en.wikipedia.org/wiki/The_IT_Crowd) | 文化的共通言語 |
| C9 | Heisenbug という呼称（1985 年 Jim Gray）自体が、「観測すると消える＝再起動で直ることが多い」バグの存在を業界が早くから認識していた証拠。対語の Bohrbug は「決定論的で再現可能なバグ」 | 🟢 | [Jim Gray TR 85.7](https://courses.cs.duke.edu/spring11/cps210/papers/Gray_computers_stop.pdf) | |
| C10 | 「停止前提の設計」は FAA / 原発制御のような安全系では採らない。冗長化・ホットスタンバイ・フォーマル検証に投資する。一方、Web サービス・ゲーム・消費者 OS は「クラッシュ＋速く戻す」で割り切っている。**何を前提に作るかは領域で非対称** | 🟡 | [NetApp](https://www.netapp.com/ja/blog/what-is-a-mission-critical-system/) / [日経 xTECH](https://xtech.nikkei.com/atcl/nxt/column/18/00166/062600128/) | |
