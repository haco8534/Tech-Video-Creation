# research_1b.md — 反論・例外・通説への異議

「再起動で直る」を万能視すると見落とす論点、通説のズレ。

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| B1 | 再起動は**対症療法**。根本原因（バグそのもの）は残っているので、時間が経てばまた発生する。「直った」と「直してない」は別物 | 🟢 | [78IT](https://www.78it.com/memory-leak/) / [issoh tech](https://www.issoh.co.jp/tech/details/3621/) | どの解説にも必ず添えられる注意 |
| B2 | ハードウェア故障（HDD/SSD 劣化、熱暴走、メモリ不良）による再起動ループは、再起動しても直らない。論理障害だと思っていたら物理障害だったというケースは多い | 🟢 | [デジタルデータリカバリー](https://www.ino-inc.com/data_check/pc/reboot.php) / [バッファロー](https://www.buffalo.jp/recovery/contents/detail42.html) | |
| B3 | Boeing 787 Dreamliner は、GCU（発電制御ユニット）の 32bit 符号付き整数カウンタが **248 日で整数オーバーフロー**し、4基のGCUが同時に failsafe モードに入って交流電源を全喪失するバグが報告された。FAA は暫定的に 120 日ごとの電源再投入を義務付けた | 🟢 | [FAA AD / engadget](https://www.engadget.com/2015-05-01-boeing-787-dreamliner-software-bug.html) / [iTnews](https://www.itnews.com.au/news/critical-software-bug-could-down-boeing-787s-mid-flight-403500) | 再起動が運用対策になった極端例。根本原因は残存 |
| B4 | Heisenbug（観測すると消えるバグ）は Jim Gray の 1985 年 Tandem 技術報告由来の概念。Tandem の調査では、ソフトウェア障害 132 件のうち **Bohrbug（決定的・再現可能）は 1 件で、残りはすべて Heisenbug** だった | 🟢 | [Jim Gray 1985: Why Do Computers Stop](https://courses.cs.duke.edu/spring11/cps210/papers/Gray_computers_stop.pdf) / [Wikipedia: Heisenbug](https://en.wikipedia.org/wiki/Heisenbug) | 「再起動で直る系」が現場障害の大半を占めるという実証 |
| B5 | 再起動は「**Heisenbug の緩和には効くが Bohrbug には効かない**」。決定的に再現するバグは、何度再起動しても同じ入力で同じ場所で失敗する | 🟢 | [Heisenbug vs Bohrbug 論文](https://www.cs.rutgers.edu/~rmartin/teaching/spring03/cs553/papers01/06.pdf) | 「直る直らない」の明確な分類軸 |
| B6 | ミッションクリティカル／セーフティクリティカルなシステム（航空機のフライトコントロール、原発制御、緊急通報、金融基幹、医療機器）は「簡単に再起動する」ことが許されない。停止＝人命・社会損害に直結するため、再起動以外の復旧設計が必要 | 🟢 | [Wikipedia: ミッションクリティカル](https://ja.wikipedia.org/wiki/%E3%83%9F%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%86%E3%82%A3%E3%82%AB%E3%83%AB) / [e-Words](https://e-words.jp/w/%E3%83%9F%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%86%E3%82%A3%E3%82%AB%E3%83%AB.html) | |
| B7 | 「絶対止まらないシステム」は原理的に作れない。故障前提で**早く戻す**設計に思想がシフトしている | 🟡 | [日経 xTECH「絶対止まらないシステムは絶対に作れない」](https://xtech.nikkei.com/atcl/nxt/column/18/00166/062600128/) | 再起動前提設計の思想的根拠 |
| B8 | 再起動で直る現象に満足すると、**長時間稼働特有の劣化原因（メモリリーク、断片化、数値誤差累積、ファイルロック未解放）** が蓄積する現象（Software Aging）を温存する。Trivedi らの研究では、予防的再起動（Rejuvenation）は**根本修正ではなく延命策**と明記 | 🟢 | [Trivedi: Software Aging and Rejuvenation](https://onlinelibrary.wiley.com/doi/full/10.1002/9780470050118.ecse394) | 「再起動で乗り切る」が正規化される危うさ |
| B9 | 再起動で直るが、次の発生タイミングや頻度は予測困難。問題が「いつか再発する」状態で稼働を続けると、重要な場面で落ちるリスクが残る | 🟡 | [Trivedi 論文群](https://www.sciencedirect.com/science/article/abs/pii/S0164121206001750) | |
| B10 | データ破損・ディスク書き込み途中のクラッシュで生じた**永続化された不整合**は、再起動しても消えない。ストレージ上の状態は電源断で保持される | 🟢 | 論理障害の一般解説 [HonNe](https://exidea.co.jp/blog/daily-necessaties/hdd/logical-trouble/) | 揮発 vs 不揮発の区別 |
