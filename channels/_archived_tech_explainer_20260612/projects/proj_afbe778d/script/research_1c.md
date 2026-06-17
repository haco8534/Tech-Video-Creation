# Research 1c: 歴史・設計思想・日常への接続

テーマ:「プログラミングとは結局何をしているのか」
目的: 視聴者のメンタルモデルを揺さぶる歴史的・哲学的事実を集め、「プログラミング=コードを書くこと」という素朴観を解体する材料にする。

信頼度凡例:
- 🟢 = 複数の一次/準一次資料で裏取り済み(Wikipedia + 専門機関 + 原典PDFなど)
- 🟡 = 広く流通しているが解釈に幅がある / 専門家間で議論あり
- 🔴 = 俗説・帰属が怪しい(要慎重)

---

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| H1 | **1801年、ジョゼフ・マリー・ジャカールが発明した織機は、パンチカード(穴の開いた厚紙)で織るパターンを「プログラム」した。カードを差し替えるだけで織り模様を変えられた。** | 🟢 | Computer History Museum "1801: Punched cards control Jacquard loom" / Wikipedia "Jacquard machine" / Science & Industry Museum Blog | 電子計算機登場の150年前に「命令列を媒体に外部化する」という発想が工業現場で実用化されていた。プログラミング=電子計算機の専売特許ではない。 |
| H2 | **エイダ・ラブレスは1843年、バベッジの解析機関についてメナブレアの論文を翻訳しつつ独自の「Note G」を書き、ベルヌーイ数を計算するアルゴリズムを発表した。世界初の「公刊された」コンピュータプログラムとされる。** | 🟢 | Wikipedia "Note G" / Bodleian Libraries blog / BBC Science Focus / 英Wikipedia "Ada Lovelace" / arXiv 2301.02919 | ラブレスは計算手順の最短化ではなく「機関の能力を例示する」ことを目的に選んだと本人が注記している——つまり最初のプログラムは既に「デモ/説明のためのコード」だった。 |
| H3 | **1890年、ハーマン・ホレリスのパンチカード式集計機が米国国勢調査に採用され、前回8年以上かかった集計を約半分の期間で終えた。彼の会社は後の1924年にIBMとなる。** | 🟢 | IBM History "The punched card tabulator" / Wikipedia "Tabulating machine" / Smithsonian NMAH | プログラミングのルーツの一つは「官僚的事務処理の自動化」にある。計算だけでなく「分類・集計」も最初期の応用。 |
| H4 | **アラン・チューリングは1936年の論文「On Computable Numbers, with an Application to the Entscheidungsproblem」で、万能機械(Turing machine)の概念を導入し、電子計算機が作られる前に「計算できることとは何か」を数学的に定義した。** | 🟢 | Proceedings of the London Mathematical Society / Wikipedia "Turing's proof" / historyofinformation.com | ハードウェアが存在しない時点で、プログラミングの理論的土台(=有限の規則で表せる手順の集合)は完成していた。 |
| H5 | **1945年6月、フォン・ノイマンは「First Draft of a Report on the EDVAC」(101ページ)を配布し、命令とデータを同じメモリに格納する「プログラム内蔵方式(stored-program)」を初めて体系的に提示した。** | 🟢 | Wikipedia "First Draft of a Report on the EDVAC" / Internet Archive / historyofinformation.com | これが現代PC・スマホまで続くvon Neumann型アーキテクチャ。著者帰属は議論あり(Moore School の先行議論あり)。 |
| H6 | **世界初の汎用電子計算機ENIAC(1945年完成)の最初のプログラマーは6人の女性——Jean Jennings Bartik, Betty Snyder Holberton, Kathleen McNulty Antonelli, Frances Bilas Spence, Ruth Lichterman Teitelbaum, Marlyn Wescoff Meltzer——だった。彼女たちは紙に書いた「プログラム」を、配線ケーブルの差し替えと数千のスイッチ操作で機械に物理的に入力した。** | 🟢 | Wikipedia "Jean Bartik" / Smithsonian American Women's History Museum / IEEE ETHW Oral History / CACM "Remembering Jean Bartik" | **最大級の認識転換ポイント**: 「プログラミング=キーボードで文字を打つこと」は後発の姿。初期は物理的な配線作業だった。しかも公の発表会では名前も紹介されなかった。 |
| H7 | **1947年、Kathleen Boothがロンドン大Birkbeck校でARC2向けに最初の「アセンブリ言語」を考案した(論文 "Coding for A.R.C.")。1949年のEDSACにはDavid Wheelerによるアセンブラ("initial orders")が組み込まれていた。** | 🟢 | Wikipedia "Kathleen Booth" / Wikipedia "Assembly language" / The New Stack / MacTutor / The Register obituary | 機械語の数字列に英字ニーモニック(ADDなど)を当てる発想。「人間が読める記号の層」が機械の上に乗った最初の瞬間。 |
| H8 | **1957年4月、IBM 704向けにジョン・バッカスのチームがFORTRAN(FORmula TRANslation)を出荷。初の広く使われた高水準言語で、科学者が自分でコンピュータに式を入力できるようにした。** | 🟢 | IBM History "Fortran" / Britannica / Wikipedia "Fortran" / historyofinformation.com | 当時、コンパイラが人手のアセンブリより遅いコードを吐くと信じられていた→FORTRANはこの偏見を覆した。「高水準」という概念自体の誕生。 |
| H9 | **1958年LISP(John McCarthy, MIT, AI向け)、1959年COBOL(Grace Hopper関与, 業務向け)、1960年ALGOL 60(国際委員会, アルゴリズム記述向け)——わずか3年で「プログラミングとは何か」についての互いに異なるビジョンが同時に結晶化した。** | 🟢 | Wikipedia "History of programming languages" / Wikipedia "Lisp" / Wikipedia "ALGOL" / Brown CS "A History of Computer Programming Languages" | 「プログラミングは一つではなく、パラダイムの集合」という現代の常識はこの多発的誕生が起源。 |
| H10 | **1968年3月、Edsger DijkstraがCACMに "Go To Statement Considered Harmful" を発表(原題は "A Case Against the Goto Statement"、題を変えたのは編集者のNiklaus Wirth)。構造化プログラミング運動の出発点。** | 🟢 | Wikipedia "Considered harmful" / Wikipedia "Structured programming" / CWI storm/teaching Dijkstra68.pdf | 「プログラムは上から下に素直に読めるべき」という今では当然の感覚は、戦った結果として勝ち取られたもの。 |
| H11 | **1970年代、Alan KayらがXerox PARCでSmalltalkを開発。Kayはオブジェクトを「生物の細胞」または「ネットワーク上の小さなコンピュータ」の比喩で考え、メッセージパッシングこそがOOPの本質だと主張した。** | 🟢 | Wikipedia "Alan Kay" / "The Early History of Smalltalk" (Kay自身の記述, worrydream.com) / Wikipedia "Object-oriented programming" | Kay本人は「業界が普及させたOOPは自分のビジョンとは違う」と公言している。OOPの定義自体が揺れている論点。 |
| H12 | **1969-73年、ベル研のKen ThompsonとDennis RitchieがUNIXとC言語を開発。1974年CACM論文で「一つのことをうまくやるプログラムを書け / パイプで組み合わせろ / テキストストリームを共通インターフェースにせよ」というUNIX哲学を明文化した。** | 🟢 | Wikipedia "Unix" / Wikipedia "Ken Thompson" / Wikipedia "Dennis Ritchie" | プログラミング=巨大な一個を作ることではなく、小さな道具を組み合わせること、という設計思想の源流。 |
| H13 | **1983年9月、Richard StallmanがGNUプロジェクトを発表し自由ソフトウェア運動を開始。1991年Linus TorvaldsがLinuxカーネルをリリース、1992年GPLv2を採用してGNU/Linuxが成立した。** | 🟢 | Wikipedia "Richard Stallman" / Wikipedia "GNU Project" / Britannica / Cornell CVW | ソースコードを「誰でも読めて改変できる文化」は自明ではなく、1980-90年代に意図して作られた。Copyleftは著作権法を逆利用した発明。 |
| H14 | **1985年、Peter Naurが論文 "Programming as Theory Building" を発表。「プログラムの本体はソースコードではなく、プログラマの頭の中にある『理論』である」と主張した。** | 🟢 | ScienceDirect 0165607485900328 / gwern.net 1985-naur.pdf / pages.cs.wisc.edu/~remzi/Naur.pdf | コードは理論の(損失ありの)書き起こしにすぎない、という立場。→ なぜ元開発者が抜けるとシステム保守が崩壊するか説明できる。 |
| H15 | **1986年、Fred Brooksが "No Silver Bullet—Essence and Accident in Software Engineering" で、ソフトウェア開発の難しさを「本質的複雑性(essential)」と「偶発的複雑性(accidental)」に分けた。向こう10年で生産性を10倍にする単一技術は存在しない、と予言。** | 🟢 | Wikipedia "No Silver Bullet" / worrydream.com Brooks_1986 / CMS Montana lecture notes | 高水準言語やIDEで偶発的複雑性は減った。残るのは問題そのものが持つ本質的複雑性——これが40年経っても予言が外れない理由。 |

## 設計思想の代表的ポジション

- **🟡 SICP(Abelson & Sussman, 1985/1996)の"procedural epistemology"**: プログラミングは「命令的視点から知識の構造を研究する学問」。数学が「なにが真か」を記述するのに対し、プログラミングは「どうやって」を記述する——知識の記述形式が本質的に違う、という立場。抽象化(手続き抽象・データ抽象)の構築こそが主活動。出典: SICP序文 / Wikipedia "Structure and Interpretation of Computer Programs"。

- **🟡 Dijkstra: 「Computer science is no more about computers than astronomy is about telescopes.」**: 道具(コンピュータ)ではなく「計算という現象」こそが学問対象。厳密に言うと1986年のGeorge Johnson著書が最古出典で、Dijkstra本人の言とは確定していない(🔴帰属)が、思想としてはDijkstraの論調と合致。出典: Quote Investigator 2021/04/02。

- **🟢 Knuth: 「Computer Programming as an Art」(1974 Turing Award Lecture)**: プログラミングは科学であると同時に芸術。美しいコードを読むときの審美的感動は実在する。後に "Literate Programming" (1984) を提唱し、「プログラムはコンピュータより先に人間に向けて書かれるべき文学作品だ」とした。出典: ACM DL 10.1145/1283920.1283929 / Wikipedia "Literate programming"。

- **🟢 Naur (1985): Programming as Theory Building**: コードは成果物ではなく、プログラマの頭の中の「理論」が成果物。新メンバーはコードを読むだけではこの理論を再建できず、既存メンバーと並走する必要がある。→ ドキュメントだけでは引き継げない、という実務的教訓の理論的根拠。

- **🟢 Brooks (1986): Essential vs Accidental Complexity**: 複雑さには本質と偶発がある。言語や道具で偶発は減らせるが、本質(扱う問題ドメインの本物の複雑さ)は減らせない。→「AIが書いてくれれば楽になる」はaccidentalの話であって、essentialは残る。

- **🟢 Alan Kay (1960s-70s): OOPは細胞の比喩**: オブジェクトは「状態と手続きを内側に隠した自律的な細胞」で、外とはメッセージだけでやり取りする。遅延束縛(late-binding)と徹底したカプセル化が本質。Kayは「現在業界で使われているOOPは自分のオリジナル定義とは違う」と明言している(要約出典: worrydream.com "The Early History of Smalltalk")。

- **🟢 UNIX哲学 (Thompson/Ritchie/McIlroy, 1974)**: (1) 一つのことをうまくやれ (2) 協調するプログラムを書け (3) テキストストリームを共通インターフェースに。→「プログラミング=巨大な一枚岩を組む」ではなく「小さな道具の合成」。

- **🟡 パラダイムごとに「プログラミングとは何か」の答えが違う**:
  - 命令型(imperative): 状態を変化させる手順の記述
  - 宣言型/関数型(declarative/functional): 入力から出力への写像の定義
  - 論理型(logic): 事実と規則から導出を行わせる
  - オブジェクト指向(OOP): 相互作用するオブジェクトの振る舞いの設計
  → 「プログラミングとは何か」への単一解は存在せず、答えは選ぶパラダイムに依存する(🟢 Wikipedia "History of programming languages" / Brown CS paper)。

## 日常生活への接続

- **🟢 料理のレシピ ↔ アルゴリズム**: 最も流通している比喩。「材料を切る→炒める→煮込む→盛る」という順序付き手順は、まさに逐次実行の制御フロー。日本語圏では「アルゴリズム=レシピ、プログラム=料理本」の喩えが定着している(出典: 複数の日本語教材・Tech Garden School・DYM CAREER等)。
  - **限界**: レシピは「強火で炒める」程度の曖昧さを許容するが、プログラムはそれを許さない。機械学習に至っては「レシピを書く」発想自体が通用しない(出力だけ指定し、機械が自力でレシピを学ぶ)(出典: Xanda Schofield Cornell blog / Medium geomblog "When an algorithm isn't")。
  - → 動画では「レシピに例えるのは入門としては正しい。でもレシピの隙間を埋めているのは人間の常識で、プログラムは隙間を許さない」と使える。

- **🟢 車の運転ルート指示 ↔ CPU命令**: 「2つ目の信号を右、次のコンビニで左」は条件分岐と逐次処理そのもの。人間向けには「目印」で冗長化するが、CPUは番地(アドレス)で動く。

- **🟡 契約書・法律文 ↔ プログラムの仕様**: 両方とも「起こりうる全ケースを明示し、例外に備える」営み。弁護士がwhat ifを潰すのはデバッガの作業と同型。Lawrence Lessigの「Code is Law」論も近縁。

- **🟡 確定申告書の記入 ↔ 手で実行するプログラム**: フローチャート付き申告手引は「分岐つき逐次アルゴリズムを紙で実行する」体験。ENIAC女性プログラマがやっていたことの民生版。

- **🟢 楽譜 ↔ 手続きの記法**: 時間軸上に「何を」「いつ」「どう」が配置された記譜法。Ada Lovelaceが解析機関について「この機械は音楽も作曲できるはず」と1843年に書いた一節は有名(出典: Ada Lovelace Note A)。

- **🟡 ボードゲームのルールブック ↔ 形式仕様**: 「ターン順・勝利条件・不正手」の列挙は、プログラムの前提条件・事後条件・例外ハンドリングに相当。ルールに隙間があると揉める=未定義動作(UB)。

- **🟢 編み物・織物のパターン ↔ パンチカード**: これは比喩というより史実。ジャカール織機はプログラミングの直接の祖先で、ラブレスは「解析機関は代数的模様をジャカードが花と葉を織るように織るだろう」と書いた(Note A, 1843)。→ 「プログラミングの起源は繊維工業」と言える。

---

## メンタルモデルを揺さぶるTOP5(台本用候補)

1. **「最初のプログラマーは6人の女性で、彼女たちは文字を打たず、物理的にケーブルを差し替えていた」(H6)** — "コードを書く"という行為は歴史的にはむしろ新参者。
2. **「プログラミングの起源は電子計算機ではなく、1801年の織機だった」(H1)** — 布を織るためのパンチカードが、解析機関→ホレリス→IBM→現代へつながる。
3. **「ソースコードはプログラムの本体ではない。本体はプログラマの頭の中の理論である」(Naur 1985)** — なぜ元開発者が消えるとシステムが腐るかの理論的説明。
4. **「プログラミングとは何か、は選ぶパラダイムで答えが違う」(H9 + パラダイム論)** — 単一解を押し付ける入門書は実は政治的な立場を取っている。
5. **「10倍楽になる銀の弾丸は存在しない——問題そのものの本質的複雑性は減らせないから」(Brooks 1986)** — AI時代にこそ効く40年前の予言。
