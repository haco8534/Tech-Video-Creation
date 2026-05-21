# research_1a.md — 主流・肯定情報（視点1a）

テーマ: プリンターだけいつも機嫌が悪い理由
狙い: 「ドライバーが悪い」「インクが高い」の裏にある、プリンター特有の**技術的・構造的な難しさ**を一次情報ベースで解明する。

---

## 調査クエリ履歴

1. `"PrintNightmare CVE-2021-34527 Windows Print Spooler architecture vulnerability"`
2. `"PostScript PCL page description language difference history"`
3. `"Internet Printing Protocol IPP Everywhere IETF RFC 8011 specification"`
4. `"inkjet printer nozzle clogging physics solvent evaporation mechanism"`
5. `"Windows v3 v4 printer driver model XPSDrv architecture Microsoft Learn"`
6. `"laser printer fuser temperature 200C toner fusing process physics"`
7. `"CUPS macOS Linux printing architecture IPP Apple"`
8. `"Windows Universal Print cloud printing architecture driver-less"`
9. `"ICC color profile CMYK RGB conversion printer color management rendering intent"`
10. `"piezo thermal inkjet print head technology difference Canon HP Epson"`
11. `"AirPrint Mopria mDNS Bonjour printer discovery protocol"`
12. `"paper jam causes humidity friction coefficient printer mechanical engineering"`
13. `"print spooler architecture Windows GDI Direct2D pipeline rendering job lifecycle"`
14. `"pigment ink dye ink difference drying mechanism chemistry"`
15. `"electrophotography laser printer process steps charging exposure developing transfer"`
16. `"print spooler history Windows NT legacy why vulnerable kernel design"`

---

## ファクト表

### A. ソフトウェア/OS スタックの複雑性

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 1 | Windowsの印刷パイプラインは「アプリ → GDI(またはWPF) → winspool.drv(クライアント) → spoolsv.exe(サービス) → プリンタードライバー → PDL変換 → プリンター」という多段構成で、各段階でフォーマット変換（EMFスプール → PCL/PostScript等）が入る | 🟢高 | [Microsoft Learn: Print Spooler Architecture](https://learn.microsoft.com/en-us/windows-hardware/drivers/print/print-spooler-architecture) | 「画面描画と別系統」の実態。画面はGDI/Direct2Dで完結するがプリンターは必ずPDLへの変換が入る |
| 2 | Windowsのプリンタードライバーモデルは v3 (2000年代〜) と v4 (Windows 8以降) が併存。v4でも内部的にはXPSDrv (Version 3の派生) のレンダリングアーキテクチャをベースにしており、GPD/PPD/JavaScript拡張/Bidiなど複数機構が共存する | 🟢高 | [Microsoft Learn: V4 Printer Driver](https://learn.microsoft.com/en-us/windows-hardware/drivers/print/v4-printer-driver), [V4 Printer Driver Rendering](https://learn.microsoft.com/en-us/windows-hardware/drivers/print/v4-driver-rendering) | 「新旧が入れ子になってる」典型例 |
| 3 | macOS/iOS/iPadOS と多くのLinux系は CUPS を使用。CUPSスケジューラは IPP over HTTP/1.1 (TCP/UDP 631番) で動作し、AppleがCUPS 1.4 (2008) 以降PPDを非推奨化、IPP EverywhereでドライバーレスのPnP印刷へ移行中 | 🟢高 | [CUPS.org](https://www.cups.org/), [OpenPrinting CUPS](https://openprinting.github.io/cups/) | OSごとに根本スタックが違う証拠。Windows=Spooler+GDI, Apple=CUPS+IPP |
| 4 | Microsoft Universal Print (2020〜) はAzureで動作するマルチテナント印刷サービスで、IPP + Mopria標準ベース。ドライバー不要を標榜し、2024年に "Windows Protected Print" (WPP) 標準化、2027年までに必須化する計画 | 🟢高 | [Microsoft Learn: Discover Universal Print](https://learn.microsoft.com/en-us/universal-print/discover-universal-print) | Windowsもやっと標準プロトコルへ寄せてきた |
| 5 | IPP (Internet Printing Protocol) は RFC 8011 で定義された IETF Internet Standard 92 (STD 92, 2018年成立)。Printer/Jobオブジェクトモデルを持ち、IPP Everywhere (2013) が「ドライバーレス印刷」の基盤。2010年以降販売の約6億台がIPP対応と推定 | 🟢高 | [IETF RFC 8011](https://datatracker.ietf.org/doc/html/rfc8011), [PWG IPP Guide](https://www.pwg.org/ipp/ippguide.html) | IPP Everywhere=「標準プロトコルで繋げばドライバー不要」の思想 |
| 6 | AirPrint は mDNS (multicast DNS, UDP 5353) + DNS-SD で機器発見、IPP over HTTP/HTTPS (631 or 443) で印刷。Mopria は IPP Everywhere + WS-Discovery ベース。mDNSはデフォルトでLAN内のみ。サブネットをまたぐと原則見えない | 🟢高 | [Apple Bonjour Printing Spec](https://developer.apple.com/bonjour/printing-specification/), [PaperCut mDNS Troubleshooting](https://www.papercut.com/help/manuals/mobility-print/troubleshooting/discovery-mdns/) | 「Wi-Fiに居るのに認識されない」はこの仕様由来 |

### B. ページ記述言語 (PDL) の世界

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 7 | PostScript は Adobe が 1984年に策定したデバイス独立型PDL。PCL は HP が 1980年に策定、デバイス依存型でプリンター側ハードに描画処理を任せる設計。この「どちらに描画責任を持たせるか」の思想の違いが今も尾を引く | 🟡中 | [Xerox: PCL vs PS](https://www.support.xerox.com/en-us/article/en/2118053), [Novatech Guide](https://novatech.net/blog/a-full-guide-to-postscript-and-pcl-print-languages) | PDLが複数存在する歴史的事情 |
| 8 | WindowsにはさらにXPS (XML Paper Specification)とXPSDrvがあり、Vista以降GDIの後継として導入されたが現場ではPCL/PostScript/GDI印刷が残存。同一OS内で複数PDLが併存している | 🟢高 | [Microsoft Learn: XPSDrv Printer Drivers](https://learn.microsoft.com/en-us/windows-hardware/drivers/print/xpsdrv-printer-drivers) | 標準統一の試みが未完に終わった例 |

### C. メカニカル/物理/化学の挑戦

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 9 | インクジェットのノズル詰まりは物理的には「ノズル先端での溶媒の先行的蒸発」が主因。ノズル径はμmオーダーで、蒸発が始まると顔料/染料が乾いて固化しインクの通り道をブロックする | 🟢高 | [ACS Ind. Eng. Chem. Res. (2012)](https://pubs.acs.org/doi/abs/10.1021/ie301403g), [Wikipedia: Inkjet printing](https://en.wikipedia.org/wiki/Inkjet_printing) | 「使わないと詰まる」の物理的根拠 |
| 10 | 印字方式には主に2系統。Epson=ピエゾ方式（圧電素子の変形でインクを押し出す、液滴サイズ可変で高画質だがヘッド交換は分解必要）、HP/Canon=サーマル方式（抵抗体で瞬間加熱して気泡でインクを飛ばす、安価で交換可能だが寿命短・液滴サイズ固定気味） | 🟡中 | [ImageXpert: Inkjet History](https://imagexpert.com/the-history-of-and-differences-between-piezo-thermal-and-continuous-inkjet-printing/), [FESPA: Printhead Technologies](https://www.fespa.com/en/news-media/the-ultimate-guide-for-printhead-technologies/) | メーカーごとに物理が違う=ドライバーも違う |
| 11 | レーザープリンターの定着ローラーは 約150〜200℃ に保たれ、熱と圧力でトナー（スチレン系樹脂+カーボンブラック+ワックス）を紙に融着。ローラー表面はテフロンコートで非粘着化 | 🟡中 | [MindMachine: Laser Printer Fusers](https://mindmachine.co.uk/book/print_19_fusers.html) | 「家電なのに200℃」のインパクト |
| 12 | 電子写真方式(EP)のコアは6ステップ: ①帯電(約-900V)→②露光(レーザーで静電潜像形成)→③現像(摩擦帯電したトナーを吸着)→④転写(コロナ放電で紙へ)→⑤定着(熱融着)→⑥クリーニング。1台の中で高電圧・光学・摩擦帯電・熱・機械搬送がすべて協調する必要がある | 🟢高 | [Graphic Design & Print Production Fundamentals (OpenTextBC)](https://opentextbc.ca/graphicdesign/chapter/6-4-electrophotographic-process/), [ResearchGate: EP Process Diagram](https://www.researchgate.net/figure/Six-basic-steps-for-a-typical-electrophotographic-EP-process-charging-exposure_fig1_258247511) | 「機械の中で物理の学部実験が走ってる」レベルの複雑さ |
| 13 | 紙詰まりは湿度35〜55%・温度20〜24℃ の環境で最小化される。紙は吸湿性(hygroscopy)で高湿では膨張・カール→重送、低湿では静電気で張り付き→重送。紙搬送は摩擦ローラーの1枚ずつ拾う機構に依存しており、摩擦係数の変動に脆弱 | 🟡中 | [Cobb Technologies: Humidity & Copiers](https://www.cobbtechnologies.com/blog/how-humidity-affects-printers-and-paper-quality), [Doceo: Paper Jams](https://www.mydoceo.com/blog/fix-printer-paper-jams-troubleshooting-guide/) | 「天気が悪いと詰まる」の物理的根拠 |
| 14 | 顔料インク(pigment)は固体粒子(0.05-0.20μm)の懸濁液で主に蒸発+浸透で乾燥。染料インク(dye)は溶液で粒子<4nm、紙繊維に吸収される。顔料は耐光性・耐水性が高いが乾燥が遅く詰まりやすい、染料はその逆 | 🟡中 | [Canson Infinity: Pigment vs Dye](https://www.canson-infinity.com/en/what-difference-between-pigmented-and-dye-based-inks), [RN Mark: Pigment Ink](https://www.rnmark.com/what-is-pigment-ink-pigment-ink-vs-dye-ink/) | 「写真用と書類用でインクが違う」の化学的根拠 |

### D. カラーマネジメント

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 15 | ICCプロファイルは入出力デバイスの色特性を定義するデータ。RGB→CMYK変換は直接ではなく「RGB → PCS (Profile Connection Space, CIELAB or CIEXYZ) → CMYK」の2段階。Perceptual/Saturation/Relative Colorimetric/Absolute Colorimetric の4つのRendering Intentがあり、色域外の色をどう潰すかの哲学が異なる | 🟢高 | [Wikipedia: ICC profile](https://en.wikipedia.org/wiki/ICC_profile), [ICC公式: Color Management (Craig Revie)](https://www.color.org/craigrevie.pdf) | 「画面の色と出てくる色が違う」の必然性 |

### E. セキュリティ/歴史的負債

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 16 | Windows Print Spooler は Windows NT 4時代からアーキテクチャがほぼ変わっていない最古参のWindowsサービスの一つ。SYSTEM権限で動作し、ネットワーク経由アクセス可能で、カーネルに直接アクセスする | 🟡中 | [Black Hat USA 2020: Legacy Print Spooler (Hadar)](https://i.blackhat.com/USA-20/Thursday/us-20-Hadar-A-Decade-After-Stuxnet-Printer-Vulnerability-Printing-Is-Still-The-Stairway-To-Heaven-wp.pdf), [Windows Internals: PrintDemon](https://windows-internals.com/printdemon-cve-2020-1048/) | 「30年モノのコードが現役」の実例 |
| 17 | PrintNightmare (CVE-2021-34527, 2021年6月公開) は Print Spooler の `AddPrinterDriverEx()` API が権限検証を誤り、一般ユーザーが任意のDLLをSYSTEM権限で実行可能になった脆弱性。Stuxnet (2010) も Print Spooler 経由。初回パッチは不完全で追加修正が必要だった | 🟢高 | [CISA: PrintNightmare Alert](https://www.cisa.gov/news-events/alerts/2021/06/30/printnightmare-critical-windows-print-spooler-vulnerability), [NVD CVE-2021-34527](https://nvd.nist.gov/vuln/detail/cve-2021-34527), [MSRC Guidance](https://www.microsoft.com/en-us/msrc/blog/2021/07/clarified-guidance-for-cve-2021-34527-windows-print-spooler-vulnerability) | 「なぜ印刷機能がRCEに繋がるのか」=アーキテクチャの古さそのものが答え |

---

## 解説の骨子メモ（リサーチから浮かび上がった仮説）

### 本質1: プリンターは「OS/物理/化学/電気/機械/ネット」の全部がカウントダウン式に連動する唯一の家電

画面描画は純粋にソフトウェア内で完結する。対してプリンターは:

- **OSレイヤ**: アプリ → GDI/WPF → Spooler → Driver → PDL (ファクト#1〜#8)
- **ネットワーク層**: IPP/mDNS/WS-Discovery/SNMP (ファクト#5〜#6)
- **物理層**: ノズル詰まり (ファクト#9)、ピエゾ/サーマル (ファクト#10)、定着200℃ (ファクト#11)、摩擦ローラー (ファクト#13)
- **化学層**: 顔料/染料/トナー樹脂 (ファクト#11, #14)
- **電気/光学層**: EP方式の6ステップ (ファクト#12)

この**どれか一つでも崩れると印刷が止まる**のがプリンター特有。他の家電（テレビ、スマホ、冷蔵庫）は責任範囲がもっと狭い。

### 本質2: 「PDL（ページ記述言語）」という画面描画とは独立した第2の描画系がある

視聴者が持ってない知識: 画面はピクセル/ベクターを直接GPUが描くが、プリンターは**PDLという言語に変換**してから解釈実行する。PostScript (Adobe, 1984) と PCL (HP, 1980) の思想対立(ファクト#7)から始まり、XPS (Microsoft, 2006), PDF, IPP Everywhere(ファクト#5) と40年間統一されていない。「同じ印刷なのに規格が5つ併存」がプリンター特有の混沌の原因。

### 本質3: 印刷ドライバーは「Windows NT時代の亡霊」を引きずっている

- Spooler は NT 4 時代からほぼ変わっていない (ファクト#16)
- v3/v4/XPSDrv が入れ子（ファクト#2）
- SYSTEM権限・カーネルアクセス・ネットワーク経由可能の三重苦 → PrintNightmare (ファクト#17) に繋がる

「なぜWindowsアップデートで印刷が壊れるのか」の答え: **アーキテクチャが古すぎて、脆弱性修正が副作用を起こしやすい**。

### 本質4: 物理側も「使わないと劣化する」設計ミス寸前の代物

- インクジェット: ノズル径μm、溶媒が揮発するので使わないと詰まる (ファクト#9)
- レーザー: 200℃の定着ローラー＋高圧帯電＋摩擦帯電トナー＋光学系 (ファクト#11, #12)
- 紙搬送: 湿度で摩擦係数が変わり重送/ジャム (ファクト#13)

つまりプリンターは**「週1回使う前提で作られた、常時稼働には向かない物理機械」**を家電として売っている。

### 本質5: 「ドライバーレス」は理想として存在する（IPP Everywhere, Universal Print）が、過渡期なので逆にややこしい

- IETF STD 92 (RFC 8011) で IPP は標準化済み (ファクト#5)
- Apple は 2008 に PPD 非推奨化 → IPP Everywhere 移行 (ファクト#3)
- Microsoft も 2020 に Universal Print, 2024 に WPP 標準化 (ファクト#4)
- だが**既存の何億台という旧ドライバー資産**との互換性を切れない
- AirPrint/Mopria の違い、mDNSのサブネット制約 (ファクト#6) で「近くにあるのに見えない」が発生

結論: プリンターは「**レガシーと標準化が40年間綱引きしている唯一のパーソナルデバイス**」。

---

### 初学者向けアナロジー候補

- 「プリンター1台の中で、学部2年の物理実験（静電気・熱・光学）と、OSの深層処理（ドライバー・スプーラー）と、ネットワーク（IPP/mDNS）が全部同時に走ってる」
- 「画面＝絵を描く、プリンター＝通訳させてから描かせる。しかも通訳の言語が5種類ある」
- 「他の家電は『動かない＝1箇所壊れた』。プリンターは『動かない＝10箇所のどれか壊れた』」

### 深掘り候補ワード（台本執筆用）

- Page Description Language / PostScript / PCL / XPS / IPP Everywhere
- Print Spooler / spoolsv.exe / winspool.drv / GDI
- v3 driver / v4 driver / XPSDrv
- CUPS / Bonjour / mDNS / AirPrint / Mopria
- PrintNightmare / CVE-2021-34527
- ピエゾ / サーマル / 定着温度 / ノズル詰まり
- 顔料 / 染料 / 電子写真方式（EP）/ トナー
- ICCプロファイル / CMYK / PCS / Rendering Intent
