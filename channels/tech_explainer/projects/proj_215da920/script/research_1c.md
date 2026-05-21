# research_1c.md — 歴史・背景・設計思想（視点1c）

本レポートは「プリンターだけいつも機嫌が悪い理由」というテーマに対し、**歴史的偶然・技術的制約・商業戦略**の文脈から素材を整理したもの。結論仮説：**今日のプリンター体験の不快さは単なる不出来ではなく、70年代の印字機構・80年代の言語戦争・90年代のドライバーモデル・2000年代のインク商法・2010年代のドライバーレス化・2020年代のDRM紛争が地層のように積み重なった結果である。**

---

## 調査クエリ履歴

1. `history of printer technology 1970s dot matrix daisy wheel line printer evolution`
2. `Adobe PostScript 1984 Apple LaserWriter DTP desktop publishing revolution history`
3. `HP PCL vs PostScript history Windows GDI print architecture differences`
4. `Windows print architecture history v4 driver Universal Print evolution`
5. `CUPS Common Unix Printing System Easy Software 1999 Apple acquisition 2007 history Michael Sweet`
6. `AirPrint 2010 iPad launch Apple driverless printing history IPP Everywhere Mopria standardization`
7. `printer ink razor and blades business model Gillette HP ink profit margin history`
8. `Lexmark Static Control 2004 Supreme Court case printer cartridge DMCA chip`
9. `PrintNightmare 2021 CVE Windows Print Spooler vulnerability history impact`
10. `Canon Bubble Jet 1979 HP ThinkJet 1984 inkjet printer history invention`
11. `Xerox 9700 1977 first commercial laser printer Gary Starkweather history`
12. `Marco Arment printer frustration Cory Doctorow Louis Rossmann HP firmware printer hate`
13. `HP Instant Ink subscription DRM printer firmware update block third party cartridges lawsuit history`
14. `Japanese convenience store printing Seven-Eleven netprint Lawson history multifunction printer MFP Ricoh Konica`
15. `Consumer Reports printer reliability 2023 2024 why printers fail iFixit Kyle Wiens quote`
16. `printer ink cost per gallon vintage champagne crude oil comparison Consumer Reports analysis`
17. `printer driver Windows why incompatible upgrade GDI XP Vista history Microsoft`
18. `"Fumbling the Future" Xerox PARC laser printer commercialization Starkweather story`

---

## 時系列年表（プリンターを巡る地層）

### 第1層：印字機構の発明期（1960s–1970s）
- **1969**: Xerox 社の Gary Starkweather がレーザープリンターのアイデアを発案（Webster, NY でファックス速度改善の研究から）。
- **1969–1972**: デイジーホイール印刷が発明・商用化（タイプライター品質を求めた答え）。
- **1971**: Starkweather が Xerox PARC で最初の動作するレーザープリンター試作機を完成（9ヶ月以下、2/3秒で2300万ビット）。
- **1977**: **Xerox 9700** 登場。世界初の商用レーザープリンター。300dpi、毎秒2ページ、両面印刷。→ デジタル印刷産業（現 1200億ドル規模）の起点。
- **1978**: Epson TX-80/TP-80（8ピン）発表。主に Commodore PET 向け。
- **1979**: **Canon がバブルジェット方式を発明**（ヒーターでインク液泡を作る drop-on-demand）。同年、Epson MX-80（9ピン）で家庭用ドットマトリクスが爆発的普及。

### 第2層：言語戦争と DTP 革命（1980s）
- **1982–1984**: John Warnock, Charles Geschke ら Adobe 社員が **PostScript** を開発。
- **1983春**: Steve Jobs が Adobe を訪問、Macintosh 用に PostScript の採用を決断。1983年12月に契約締結。
- **1984**: **HP LaserJet（初代）** 発売。PCL（Printer Command Language）搭載。PCL 1 は同年 HP ThinkJet で登場（パーソナル熱インクジェット）。
- **1984**: **HP ThinkJet** 登場。個人向け熱インクジェット市場を開拓、インクカートリッジ方式を一般化。
- **1985.01.23**: **Apple LaserWriter** 発表。世界初の PostScript プリンター、DTP 革命の起爆剤。
- **1985.07**: Aldus PageMaker 登場。LaserWriter + Mac + PageMaker の三位一体で DTP 産業が生まれる。
- **1985**: Canon BJ-80（初のバブルジェット商用機）発売。

### 第3層：OSの中のプリンター（1990s–2000s）
- **1990s**: Microsoft が Windows **GDI** ベースの印刷モデルを確立。アプリ → GDI → プリンタドライバ → スプーラ。
- **1997**: Michael R Sweet が Easy Software Products で **CUPS** の開発を開始。
- **1999.05.14**: CUPS 初のベータ版リリース。
- **2000**: Windows 2000 で **V3 ドライバーモデル** 導入（以後12年間主流）。
- **2002.03**: Apple が Mac OS X 10.2 Jaguar に CUPS を標準採用。
- **2002.12.30**: Lexmark が Static Control Components を提訴（互換チップめぐる DMCA 訴訟）。
- **2004.10.26**: **Lexmark v. Static Control Components 判決**（第6巡回区）。「カートリッジ認証の回避は DMCA 違反ではない」と判示。互換インク側の象徴的勝利。
- **2004**: HP PCL 6 Enhanced 登場（Windows GDI との親和性を最大化した設計）。
- **2007.02**: Apple が CUPS 開発者 Michael Sweet を雇用し、ソースコードを買収。
- **2007**: Windows Vista で Desktop Window Manager 導入、GDI がハードウェア加速対象から外れる（＝プリンタードライバーの前提も変化）。

### 第4層：ドライバーレスの夢（2010s）
- **2010.09.01**: Steve Jobs が **AirPrint** を発表（iOS 4.2、11月リリース）。発売時対応プリンターは HP Photosmart Plus e-All-in-One シリーズ12機種のみ。
- **2010**: iPad 発売時、OS にドライバーの仕組みがないため「ドライバーレス印刷」が事実上必須に。AirPrint は Bonjour + IPP を組み合わせた設計。
- **2013**: **IPP Everywhere** が公開（PWG による業界横断のドライバーレス印刷標準）。
- **2013**: Mopria Alliance 設立（Android/Windows 向けドライバーレス標準）。
- **2012年頃**: Windows 8 / Windows Server 2012 で **V4 ドライバーモデル** 導入。アーキテクチャ非依存、UWP 対応、JavaScript 拡張。
- **2013**: Consumer Reports 調査、米国の小売インクは1オンス $13–$75、ガロン換算 $1,664–$9,600。**ドンペリニヨンの約10倍、原油・香水の約10倍**。
- **2016**: HP が「Dynamic Security」ファームウェア機能を導入。非純正インクをブロック。

### 第5層：信頼の崩壊と再構築（2020s）
- **2019**: HP が Dynamic Security 訴訟で 150万ドルの和解。一部機種で将来使わないと約束。
- **2020.11 頃**: HP が約束を反故にする形で新たなファームウェアを送信開始。
- **2020.12**: 新たな集団訴訟提起。
- **2021.06.29**: **PrintNightmare (CVE-2021-1675 / CVE-2021-34527)** 公開。Windows Print Spooler の `RpcAddPrinterDriver` が誰でも任意 DLL を SYSTEM 権限で読み込ませられる設計欠陥。**ドメインコントローラーを含む全 Windows** に影響。
- **2021.07**: CISA が緊急警告、Microsoft が緊急パッチ配信。
- **2022–2023**: HP が再度 Dynamic Security を用いた第三者インクブロックを展開。Instant Ink サブスク価格引き上げ。
- **2024.01**: HP、第三者インク使用者に対するブリック問題で再度集団訴訟。
- **2025.02**: Cory Doctorow らの世論圧力で HP が一部譲歩（「小さな dis-enshittification」と揶揄）。
- **2026年1月中旬**: Microsoft が Windows Update での **レガシー V3/V4 ドライバー自動配信を停止**。IPP Class Driver がデフォルトに。**「プリンタードライバー」という概念そのものの終わりの始まり**。

---

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|--------|-------|-----|-----|
| 1 | Xerox 9700 (1977) が世界初の商用レーザープリンター。Gary Starkweather が PARC で1971年に試作、商用化までに6年 | 🟢 | Xerox 公式 Newsroom、IEEE ETHW、Wikipedia | 初号機は発売直後に100万枚印刷される大ヒット |
| 2 | Canon が1979年にバブルジェット方式（drop-on-demand 熱インクジェット）を発明、1985年に BJ-80 で商用化 | 🟢 | Canon Global 公式、PrintWiki | HP はこの技術を独自の熱インクジェットで1984年に先行商用化（ThinkJet） |
| 3 | HP LaserJet と Apple LaserWriter は同じ Canon LBP-CX エンジンを使用、Adobe PostScript の有無だけが違った（LaserJet は PCL、LaserWriter は PostScript） | 🟡 | 業界常識、PrintWiki・prepressure.com 記載 | ※「同じエンジン」部分は一次確認が望ましいが広く知られる事実 |
| 4 | PostScript は John Warnock ら Adobe が1982–1984年に開発、Steve Jobs が1983年春に Mac 向けに導入を決定、1985年1月 Apple LaserWriter として結実 | 🟢 | Adobe Computer History Museum 資料、Museum Victoria、prepressure.com | DTP 革命（PageMaker 1985.07）の起点 |
| 5 | PCL は1984年 HP ThinkJet で登場、HP が「シンプルで高速」な代替言語として設計。PCL 6 Enhanced (2000年代) は Windows GDI の描画モデルに一致させる設計 | 🟢 | Wikipedia PCL、OKI ドキュメント、Novatech | 「Windows で速い」は PCL、「美しい」は PostScript の古典的対立 |
| 6 | CUPS は Michael R Sweet が1997年開発開始、1999.05.14 初のβ、2002年 Apple が Mac OS X 10.2 に採用、2007.02 Apple が開発者ごと買収 | 🟢 | Wikipedia、OpenPrinting 公式、MacRumors | 2019年12月に Sweet は Apple を離れる。macOS/Linux/BSD で事実上の標準 |
| 7 | AirPrint は2010.09.01 に Steve Jobs が発表、同年11月リリース。当初対応は HP Photosmart Plus e-All-in-One の12機種のみ。Bonjour + IPP の組み合わせ設計 | 🟢 | Apple 公式、Wikipedia、9to5Mac | iPad 時代のドライバーレス標準が他社 OS にも波及 |
| 8 | IPP Everywhere は2013年公開、Mopria Alliance は同年設立。**現在販売されているプリンターの98%以上が IPP をサポート** | 🟢 | PWG 公式 FAQ、Wikipedia Internet Printing Protocol | 「ドライバーレス」は国際標準として確立済み |
| 9 | V3 ドライバーモデルは Windows 2000 導入、V4 は Windows 8 / Server 2012 導入、**2026年1月中旬から Microsoft は新規 V3/V4 ドライバーの Windows Update 配信を停止**、IPP Class Driver へ移行 | 🟢 | Microsoft Learn、Windows News | プリンタードライバーの終焉が公式化 |
| 10 | 米 Consumer Reports 調査 (2013) で小売インクは 1オンス $13–$75、ガロン換算 $1,664–$9,600。**ドンペリニヨン（約$1,200/ガロン）の10倍、原油の数百倍** | 🟢 | Consumer Reports、HowStuffWorks、Business Insider | HP 消費者部門の利益の最大70%がインクから（razor-and-blades 戦略） |
| 11 | Gillette モデル自体は Gillette 本人ではなく競合が発明（Gillette 特許切れ後の1920年代）。プリンター業界は1980年代に意図的にこの戦略を導入 | 🟡 | Wikipedia "Razor and blades model" | 「古典商法の正統な後継者」として語れる |
| 12 | **Lexmark v. Static Control (2004, 第6巡回区)**: カートリッジ認証チップの回避は DMCA 違反ではないと判示。互換インク業界の法的根拠になった | 🟢 | Wikipedia、FindLaw、EFF ケースアーカイブ | 2014年 Supreme Court はランハム法（虚偽広告）基準で Static Control の立場を全会一致で支持 |
| 13 | **PrintNightmare (2021.06.29)**: `RpcAddPrinterDriver` の設計欠陥で一般ユーザーが任意 DLL を SYSTEM 権限実行可能。ドメコンを含む全 Windows 影響。CVSS 7.8 | 🟢 | CISA、NVD、Wikipedia、Unit42 | Print Spooler の設計は Windows NT 時代からほぼ不変＝歴史が刺さった瞬間 |
| 14 | HP Dynamic Security (2016〜) は第三者カートリッジをファームウェアで能動的にブロック。2019年に150万ドル和解、2020年・2022年・2024年に再提訴。**2025.02 Cory Doctorow 主導の世論で一部譲歩** | 🟢 | ClassAction.org、Techdirt、Pluralistic (Doctorow) | 「ファーム更新で動かなくなった」の正体 |
| 15 | Consumer Reports (2024): **レーザープリンターはインクジェットより信頼性が高い**、Brother が総合トップ、Epson/Lexmark は避けるべきブランド扱い。調査対象は2016–2024年購入の約7万台 | 🟢 | Consumer Reports、BGR | 体感「プリンターが壊れやすい」の多くはインクジェット固有問題 |
| 16 | Kyle Wiens (iFixit CEO): インクジェットのスマートチップは「閾値で使用不可になる」設計、Canon・HP の一部はヘッド一体型で実質ヘッド故障＝本体廃棄。**修理不能の設計**を右派修理権運動の主要事例として繰り返し指摘 | 🟢 | iFixit、Craftsmanship Magazine、Planned Obsolescence Wikipedia | 「設計された寿命」の典型事例 |
| 17 | 日本のコンビニ印刷：セブンイレブンは富士フイルム系「かんたん netprint」、ローソン・ファミマ・ミニストップは SHARP 系「PrintSmash / ネットワークプリント」の2陣営 | 🟢 | Tokyo Weekender、TokyoCheapo、Network Print 公式 | 「家でうまく刷れなくてもコンビニは刷れる」は**ドライバーレス化（IPP + クラウド）の恩恵**そのもの |
| 18 | "Fumbling the Future" (Smith & Alexander, 1988): Xerox PARC は PC・GUI・イーサネットを発明しながら商品化に失敗した中で、**レーザープリンターだけは商品化に成功**し、Xerox は今でもこれで年$90億を稼ぐ | 🟢 | Google Books、複数書評 | 「プリンターが今も Xerox の屋台骨」という史実 |

---

## 日常体験への接続メモ

### 「AirPrint で繋がるのに Windows から繋がらない」
→ **歴史的事情**: AirPrint (2010) は IPP + Bonjour のオープン標準ベースで、OS 側がプリンタを抽象化する設計。一方 Windows は2000年からの V3 ドライバーモデルを2020年代まで延命し、メーカーごとに違う巨大ドライバパッケージを OS にねじ込む文化だった。IPP Class Driver がデフォルトになるのは2026年からで、つまり **Windows は15年遅れで AirPrint に追いついている途中**。

### 「互換インクを入れたら動かない」
→ **訴訟史と FW 設計の交点**: 2004年 Lexmark 判決で「チップ回避は DMCA 違反ではない」と確定し、互換インク業界が合法化された。HP はこれを商法ではなく**ファームウェア更新**という技術で対抗する道を選んだ（2016 Dynamic Security）。つまりユーザーが「純正を買わされている」のは法ではなく**ソフトウェアアップデート経由の契約外変更**によるもので、2025年に世論で部分譲歩した経緯がある。

### 「Windows Update 後にプリンタが動かなくなった」
→ **アーキテクチャの地層**: V3 (2000)→V4 (2012)→IPP Class Driver (2026) と3回のモデル変遷。メーカーが古いモデル用 V3 ドライバを新アーキテクチャに対応させない＝「直す価値なし」と判断した結果動かなくなる。**Windows 11 は XP 時代のドライバを仕組み上受け付けない**。

### 「コンビニでは普通に刷れる」
→ **標準化の勝利**: netprint/PrintSmash はクラウドから IPP/独自プロトコルで業務用 MFP を直接叩く設計。家庭用プリンタの「自分の PC にドライバをインストールする」モデルを完全に回避しているため、端末側の OS バージョンに縛られない。

### 「写真印刷は Epson/Canon が強い」
→ **技術出自**: 1979年 Canon のバブルジェット発明に端を発する**家庭用インクジェット系譜**は日本2社が先行。対して**レーザー系譜**（HP / Xerox / Brother）はオフィス文書向けに進化。**「家のプリンターが遅いのに写真が綺麗」は1979年の技術選択の帰結**。

### 「PrintNightmare で会社の PC が全部アップデートされた」
→ **NT時代の設計が刺さった**: Print Spooler サービスは Windows NT 以来ほぼ不変で、ドライバをロードする仕組みが「SYSTEM 権限で任意 DLL」だった。2021年にこの26年前の設計がリモートコード実行に転用可能と判明した。**プリンター周りは OS の最も古い地層**という事実の象徴。

---

## 視聴者が持ちそうな素朴な疑問とその歴史的答え

### Q1: なぜプリンターは OS が新しくなるとすぐ動かなくなるの？
**A**: 1990年代から Windows はプリンターを「ドライバーを OS にインストールする」方式で扱ってきた。OS 側のプリント・アーキテクチャは2000年 V3→2012年 V4→2026年 IPP Class Driver と断絶的に変わり、メーカーが古い機種用に新ドライバを書き直さない（＝不採算な）ため、OS 更新で動かなくなる。AirPrint/IPP のようにプリンタ側に標準を持たせれば OS は関係なくなるが、**その標準化は2013年の IPP Everywhere まで待たねばならなかった**。

### Q2: なぜインクはあんなに高いの？
**A**: 1900年代初頭の King C. Gillette 以降のビジネスモデル「razor-and-blades」を、HP が1990年代に印刷事業に本格導入した結果。現在 HP 消費者部門の**利益の最大70%がインク**から来ており、本体を安く売ってインクで回収する構造。結果、**小売インクは1ガロンあたり $1,664–$9,600**（ドンペリの10倍）。

### Q3: なぜ「互換インクだと動かない」なんて仕様があるの？
**A**: 2004年の Lexmark v. Static Control 判決で「カートリッジ認証の回避は DMCA 違反ではない」と確定し、互換インクは**合法**。しかしメーカーは**ファームウェア更新**で後付けにブロックする戦略に切り替えた（HP Dynamic Security, 2016〜）。これは販売時の仕様にはない変更で、集団訴訟が複数進行中。

### Q4: iPhone から印刷するのはスムーズなのに、なぜ PC からはトラブルが多いの？
**A**: Apple は iPad 発売 (2010) に合わせて AirPrint を作り、**OS にドライバを入れない方針**を最初から採った。一方 Windows は NT (1993) から続くスプーラ＋ドライバの仕組みを25年以上引きずり、2026年にようやく IPP 標準へ本格移行する。**アーキテクチャの発想年代が15年違う**。

### Q5: なぜプリンターは「機嫌が悪い」ものの代名詞なの？
**A**: プリンターは物理機構（紙送り・ヘッド・熱・インク）＋旧式 OS レイヤ（スプーラ・V3ドライバ）＋商業制約（DRM・FW更新）の**3層すべての歴史的負債**を抱える唯一のデバイス。Xerox PARC 由来のレーザー系譜、Canon/HP 由来のインクジェット系譜、Adobe 由来の PostScript、HP 由来の PCL、Apple 由来の CUPS/AirPrint、Microsoft 由来の GDI/V3/V4 ──**単一製品カテゴリに6つの技術系譜が合流**しており、どこかが必ず古い。機嫌が悪いのではなく、**70年代〜2020年代までの化石が全部中に入っている**。

### Q6: 昔のプリンターと何が違うの？
**A**: 1985年の Apple LaserWriter は本体内に PostScript インタプリタと専用 CPU を持ち、**PC からは PostScript 文字列を送るだけでよかった**（プリンタ側で完結）。1990年代以降の Windows 中心の世界は **ホスト側で描画して bitmap を送る**（GDI）方式に寄せたため、プリンタは CPU を省けたがドライバが OS 依存になった。2010年代の AirPrint/IPP は**再び「プリンタ側で完結させる」古典的発想への回帰**で、つまり業界は40年かけて一周している。

### Q7: コンビニのプリンタは強そうなのになぜ家のは弱いの？
**A**: コンビニの MFP は業務機（Ricoh / Konica Minolta / Fuji Xerox 等）で保守契約付き、ドライバーレス (クラウド経由) 前提で運用される。家庭用インクジェットは razor-and-blades で利益を取る設計のため**本体の設計寿命が意図的に短い**（iFixit 指摘）。同じ「プリンタ」という言葉で呼ばれているが、**商業モデルがまったく違う別製品**。

---

## 「歴史的偶然の積み重ね」を示すキーポイント

1. **技術的偶然**: Canon バブルジェット1979、Starkweather レーザー1971、Warnock PostScript 1984 ── それぞれ別会社の別人による別発明が、**1985年の Apple LaserWriter で一点に合流**したのは歴史的偶然。
2. **商業戦略の累積**: Gillette モデル (1900s) → HP ThinkJet (1984, カートリッジ方式普及) → HP Instant Ink (2010s, サブスク化) → Dynamic Security (2016, DRM化) という**100年かけた利益取り戦略**。
3. **OS アーキテクチャの地層**: NT時代 Print Spooler → Windows 2000 V3 → Windows 8 V4 → 2026 IPP Class Driver。**26年ぶりに設計を刷新中**で、PrintNightmare はその間の負債の象徴。
4. **標準化の周回遅れ**: IPP (1999 策定) → AirPrint (2010 で実用化) → IPP Everywhere (2013) → Windows デフォルト化 (2026) という**27年かけた標準の浸透**。
5. **訴訟と世論の反作用**: Lexmark (2004) → HP Dynamic Security 訴訟 (2019, 2021, 2024) → Doctorow 世論圧力 (2025) という**20年続く「ユーザーの反撃」の歴史**。

---

## 参考ソース（主要なもの）

- Xerox 公式 Newsroom「40-year anniversary of the Xerox 9700」
- IEEE Engineering and Technology History Wiki「Development of the Commercial Laser Printer, 1971-1977」
- Canon Global 公式「Canon celebrates 30th anniversary of Bubble Jet」
- Wikipedia: Dot matrix printing / Daisy wheel printing / PostScript / Printer Command Language / CUPS / AirPrint / Internet Printing Protocol / PrintNightmare / Razor and blades model / Lexmark International, Inc. v. Static Control Components, Inc.
- Museums Victoria「Desktop Publishing 1985-1991: The Apple Computer Story」
- prepressure.com「The history of Adobe PostScript」
- Microsoft Learn「V4 Printer Driver」「GDI Printer Drivers」「Print and Document Services Architecture」
- OpenPrinting「Driverless Printing Standards」
- Apple Support / 9to5Mac「How the iPhone forced the entire printing industry to adopt AirPrint」
- CISA Alert「PrintNightmare, Critical Windows Print Spooler Vulnerability」
- NVD CVE-2021-34527
- EFF「Lexmark v. Static Control Case Archive」
- Consumer Reports「The High Cost of Wasted Printer Ink」「Most and Least Reliable Printer Brands」
- Cory Doctorow, Pluralistic (2025.02.22, 2025.03.05)
- Kyle Wiens / iFixit: Planned Obsolescence、Right to Repair 関連
- Smith & Alexander「Fumbling the Future: How Xerox Invented, Then Ignored, the First Personal Computer」(1988)
- Tokyo Weekender「The Magical World of Japanese Printers」
- Network Print 公式 (SHARP), netprint 公式 (富士フイルム)
- ClassAction.org / Techdirt / Milberg「HP Dynamic Security 関連訴訟」
