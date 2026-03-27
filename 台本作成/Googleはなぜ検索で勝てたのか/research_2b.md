# リサーチチェックポイント：反論・例外・誤解されやすい点

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | PageRankは古いページに有利なバイアスがある。長く存在するページほどリンクを蓄積しやすく、新しいコンテンツが上位に来にくい | 🟢高 | Cornell University研究 / GitHub.io分析 |
| 2 | PageRankは元々キーワードの文脈や意味を理解できない。複雑な自然言語クエリの処理が苦手だった | 🟢高 | Cornell University研究 |
| 3 | PageRankのスコアの透明性（Googleツールバーで公開）がSEO操作を招いた。リンク売買市場の形成、リンクファーム（相互リンクだけのスパムサイト群）が大量発生 | 🟢高 | Ahrefs / Search Engine Journal |
| 4 | Googleは2005年にnofollowタグを導入してリンクスパム対策を開始。2012年のPenguinアップデートでリンクファームを本格的に取り締まり | 🟢高 | Google / Search Engine Journal |
| 5 | Googleは2016年にPageRankスコアの公開を完全廃止。だがPageRankの基本概念（リンクの質と量に基づく評価）は現在も200以上のランキング要素の一つとして機能 | 🟢高 | Google / Ahrefs / SE Ranking |
| 6 | 「PageRankだけでGoogleが勝った」は誤解。実際にはインフラ技術（安価な汎用ハードウェアの活用で障害に強いシステム構築）、速度、UIの総合力が勝因 | 🟡中 | Reddit / Smart Advantage分析 |
| 7 | AltaVista、Excite、Lycosなどの先行検索エンジンはポータル化戦略（ショッピング・メール・ニュースなどの統合）に走り、検索の品質改善にリソースを割かなくなった。AltaVistaはポータル化後にトラフィックが激減し、2001年にはGoogleに抜かれた | 🟢高 | ProductMint / EM360Tech / The History of the Web |
| 8 | AltaVistaは技術的にはGoogleの先輩。1995年にはフルテキストインデックス検索を実現し、1600万ページをインデックスしていた。「その時代のGoogle」と呼ばれた。だが親会社DECの買収劇（Compaq→HP）で戦略の一貫性を失った | 🟢高 | Web Search Workshop / Wikipedia |
| 9 | Yahoo!は人力でウェブサイトをカテゴリ分類するディレクトリ方式だった（1994年設立）。ウェブの爆発的拡大に人力分類が追いつかなくなり、最終的にGoogleの検索技術を採用（2000年） | 🟢高 | Wikipedia / Lion Digital |
| 10 | Googleのアルゴリズム進化: Hummingbird（2013年、セマンティック検索・自然言語処理）→ RankBrain（2015年、初の機械学習導入）→ BERT（2019年、Transformer型NLP、双方向文脈理解）。PageRankから「キーワード→意味→意図」へと進化 | 🟢高 | Moz / Search Engine Journal / SemRush |
| 11 | 検索連動型広告の概念を発明したのはGoogleではなくGoTo.com（Bill Gross, 1998年）。GoogleはOvertureの「入札額だけ」モデルを品質スコアで改良し、特許訴訟で和解金を支払った | 🟡中 | MarkeZine / Wikipedia |

## まとめ・所感

PageRankは素晴らしい発明だが万能ではなかった。「リンクで投票」という仕組みは「投票を買う」行為（リンク売買）を生み出し、Googleは常にこの問題と戦い続けている。これは台本の「直感の構築→破壊→再構築」サイクルに最適：

1. まずPageRankの「投票」アナロジーで直感を構築
2. 「投票を買えばいい」というリンクスパム問題で直感を壊す
3. Googleがどう対応し、PageRankを超えて進化したか（キーワード→意味→意図）で再構築

また、「Googleが勝ったのはPageRankだけではない」という視点は重要。ライバルの自滅（ポータル化・親会社の混乱）、UIの哲学、インフラの革新など、複合的な勝因を示すことで深い理解を提供できる。
