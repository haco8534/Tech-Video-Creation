# Research 1a: 主流・基本定義

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| 1 | プログラミングとは「プログラミング言語を用いて、人間が読み書きしやすい形式のプログラム（ソースコード）を記述していくコーディング作業」を中心として、設計・テスト・デバッグを含む一連の知的作業を指す | 🟢 | IT用語辞典 e-Words「プログラミングとは」 https://e-words.jp/w/プログラミング.html | 日本語圏で最も引用される標準的定義。業界辞書ベース。 |
| 2 | チューリングマシンは1936年にアラン・チューリングが考案した数学的モデルで、「形式的な記号操作の組み合わせ・繰り返しで構成されるすべての計算を実行できる最も単純化されたコンピュータのモデル」。現代のあらゆるプログラミング言語は理論的にこのモデルと等価（チューリング完全）である | 🟢 | Wikipedia / e-Words / 高校数学の美しい物語 https://ja.wikipedia.org/wiki/チューリングマシン | 「プログラミングとは何か」の理論的下限。1940年代に実機ができる10年前に理論は完成していた。 |
| 3 | CPUは電源投入から停止まで、Fetch（命令取得）→ Decode（命令解読）→ Execute（実行）の3段階サイクルを永遠に繰り返し続ける。このサイクルはフォン・ノイマンが提唱した | 🟢 | Baeldung on Computer Science / CMU講義資料 https://www.baeldung.com/cs/fetch-execute-cycle / https://www.cs.cmu.edu/~tcortina/15110f11/Unit08PtB.pdf | 「プログラムが動く」の最もミクロな実体。プログラム＝このサイクルに食わせる命令列。 |
| 4 | 最終的にコードは「高級言語 → アセンブリ → 機械語（2進数）→ 論理ゲート → トランジスタのON/OFF（電気信号）」という抽象化の階層を経て実行される。トランジスタは半導体スイッチであり、デジタル回路ではON/OFFの2状態で1/0を表現する | 🟢 | Wikipedia (Machine code) / OpenStax Intro to Computer Science / ACM論文 "Nand to Tetris" https://en.wikipedia.org/wiki/Machine_code / https://cacm.acm.org/research/nand-to-tetris-building-a-modern-computer-system-from-first-principles/ | 「プログラミング＝電気の流れを設計している」というミクロ視点の核。 |
| 5 | Linuxカーネルのソースコードは2025年1月時点で約4,006万行に到達。2015年の約2,000万行から10年で倍増。2か月ごとに約40万行ずつ増加している | 🟢 | LinuxToday / Tom's Hardware / commandlinux.com統計 https://www.linuxtoday.com/blog/linux-kernel-source-code-surpasses-40-million-lines-january-2025-update/ | コード量の直感的スケール。カーネル6.14 rc1基準。 |
| 6 | Linuxカーネルの60%はデバイスドライバ、コアカーネル（メモリ管理・プロセススケジューラ）はわずか5%である | 🟢 | commandlinux.com / Tom's Hardware | 「OSの中身＝ほぼ周辺機器対応」という意外な事実。 |
| 7 | 高級車には約1億行のソフトウェアコードが搭載されている。これはF-35戦闘機の推定800万〜2,500万行を大きく上回る | 🟢 | IEEE Spectrum "This Car Runs on Code" / Cybellum https://spectrum.ieee.org/this-car-runs-on-code | 車＞戦闘機、という直感反転ファクト。 |
| 8 | 全世界のソフトウェア開発者数は2026年時点で約2,870万人。国別シェアは米国18.33%、インド12.61%、ドイツ6.72%、英国5.37%。2030年には4,500万人に達すると予測される | 🟢 | JetBrains Developer Ecosystem / Evans Data Corporation / Statista https://www.jetbrains.com/lp/devecosystem-data-playground/ | 「プログラマは人類のうち約0.36%」というスケール感。 |
| 9 | 存在するプログラミング言語は累計8,000〜9,000種類以上（The Historical Encyclopedia of Programming Languagesは8,945種をリスト化）だが、業界で広く使われるのは50〜100種類程度 | 🟢 | TestGorilla / TIOBE Index / Wikipedia "List of programming languages" | 言語は雑草のように生まれては消える。 |
| 10 | Donald Knuth（『The Art of Computer Programming』著者、1974年チューリング賞）の定義：「Programming is the art of telling another human being what one wants the computer to do.（プログラミングとは、コンピュータに何をさせたいかを別の人間に伝える技芸である）」 | 🟢 | Knuth "Computer Programming as an Art" (1974 Turing Award Lecture) https://paulgraham.com/knuth.html | 「機械に伝える」ではなく「人間に伝える」と定義した転換点。 |
| 11 | Harold Abelson & Gerald Jay Sussman『Structure and Interpretation of Computer Programs』(1984) 序文：「Programs must be written for people to read, and only incidentally for machines to execute.（プログラムは人が読むために書かれねばならず、機械が実行するのはあくまで副次的である）」 | 🟢 | SICP Preface (MIT Press, 1984) | MIT初代CS教科書。プログラミングの本質を「人間の思考の表現」と位置付けた。 |
| 12 | Edsger Dijkstra（1972年チューリング賞）の定義：「Computer science is no more about computers than astronomy is about telescopes.（コンピュータサイエンスがコンピュータの学問であるのは、天文学が望遠鏡の学問であるのと同程度だ）」「The art of programming is the art of organizing complexity.（プログラミングとは複雑さを整理する技芸である）」 | 🟢 | Dijkstra アーカイブ（UT Austin）/ Wikiquote https://en.wikiquote.org/wiki/Edsger_W._Dijkstra | 「プログラミング＝複雑性の統御」という定義。 |
| 13 | Knuth：「Science is what we understand well enough to explain to a computer. Art is everything else we do.（科学とはコンピュータに説明できるほど理解できたもの。芸術とはそれ以外のすべてだ）」 | 🟡 | Knuth講演・著作集（AZ Quotes集約） | 「プログラミングに落とし込めた瞬間＝科学化した瞬間」という定義の裏返し。 |
| 14 | フォン・ノイマン・アーキテクチャの核心は「プログラム内蔵方式（stored-program）」：命令とデータを同じメモリに置き、CPUが順次読み出す。これにより「書き換え可能な汎用機械」が成立した | 🟢 | Dive Into Systems (5.2) / ScienceDirect https://diveintosystems.org/book/C5-Arch/von.html | ハードを触らずに挙動を変えられる＝「ソフトウェア」という概念の誕生。 |
| 15 | Linuxカーネル6.18には2025年に過去最多の2,134人の開発者が貢献し、1,780以上の組織が関与した。企業別ではIntelがトップ、Googleが2位 | 🟡 | commandlinux.com / Linux Kernel Development Report | 「プログラミング＝現代最大の共同知的プロジェクト」の実例。 |
| 16 | Dijkstra：「Program testing can be a very effective way to show the presence of bugs, but it is hopelessly inadequate for showing their absence.（テストはバグの存在を示すには有効だが、バグがないことを示すには絶望的に不十分）」 | 🟢 | Dijkstra "Notes on Structured Programming" (1972) | デバッグという行為の本質的限界を定式化した一句。 |

## シンセシス（主流の見方まとめ）

主流の定義を重ね合わせると、プログラミングとは「チューリングマシンという数学的抽象を土台に、フォン・ノイマン型アーキテクチャの上でFetch-Decode-Executeという単純作業を高速反復させる機械へ、人間の意図を翻訳する営み」である。しかし業界のパイオニアたち（Knuth、Dijkstra、Abelson & Sussman）はそろって「プログラミングの本質は機械への命令ではなく、人間への思考の伝達である」と定義し直している――コードは最終的に電気信号まで落ちるが、その上層では「複雑性を整理し、他人（未来の自分を含む）に読ませる文書」として書かれるべきものだ。スケール感としては、全世界約2,870万人のプログラマが8,000超の言語の中から約100種を使い、Linuxカーネル4,000万行・高級車1億行という規模の知的構築物を生み出している。つまりプログラミングは「電気のスイッチングの設計」と「人間同士の知的コミュニケーション」という両極を同時に引き受ける、人類史上類のない二重性を持った行為である。
