# リサーチチェックポイント：基本情報・仕組み・通説

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | USBは1994年にIntelのAjay Bhattが提案し、1996年にUSB 1.0として商用リリースされた | 🟢高 | Wikipedia, SparkFun, Britannica |
| 2 | USBの開発にはCompaq, DEC, IBM, Intel, Microsoft, NEC, Nortelの7社が参加 | 🟢高 | Wikipedia USB history |
| 3 | USB以前のPCには、シリアル(RS-232,9pin/25pin)、パラレル(25pin)、PS/2(6pin)、SCSI、ゲームポート、VGA等、機器ごとに異なるコネクタが必要だった | 🟢高 | SlashGear, EE Times, Wikipedia |
| 4 | USBの「Universal」は「あらゆるデバイスを1つの規格で接続」を目指したもの。Ajay Bhattの娘がプリンタ接続に苦労したことが開発動機の一つ | 🟡中 | SparkFun, SmarterMSP, TME |
| 5 | Type-AとType-Bの区別は「ホスト（PC）側」と「デバイス（周辺機器）側」を明確に分けるための設計。誤接続で電源が衝突するのを防ぐ | 🟢高 | USB-IF仕様書, Wikipedia, SparkFun |
| 6 | Mini-USBはUSB 2.0時代（2000年頃）に小型デバイス（デジカメ、MP3プレーヤー等）向けに登場。5ピン構成 | 🟢高 | Wikipedia USB connector |
| 7 | Micro-USBは2007年に登場し、Mini-USBより薄型。耐久性10,000回（Mini-USBは5,000回、初期は1,000回）。摩耗をケーブル側に移す設計 | 🟢高 | Wikipedia, Stack Exchange, LogoTech |
| 8 | USB-Cは2014年に登場。24ピン、リバーシブル設計。最大240W給電（USB PD 3.1）、最大80Gbps（USB4 v2） | 🟢高 | USB-IF公式, Wikipedia |
| 9 | USB-Cの24ピンにはVBUS, GND, SuperSpeed TX/RX×4ペア, USB2.0 D+/D-×2, CC1/CC2（向き検知・PD交渉）, SBU1/SBU2（Alternate Mode）が含まれる | 🟢高 | AllAboutCircuits, Cambrionix, SparkFun |
| 10 | IntelはUSBの特許を保有するが、ロイヤリティフリーで公開した。これが爆発的普及の要因 | 🟢高 | Wikipedia, ZipItClean |
| 11 | USB 1.0: 1.5/12Mbps → USB 2.0: 480Mbps → USB 3.0: 5Gbps → USB 3.2: 20Gbps → USB4: 40/80Gbps の速度進化 | 🟢高 | USB-IF公式, Wikipedia |

## まとめ・所感

USBの基本設計思想は「カオスな接続環境を1つの規格で統一する」こと。Type-AとType-Bの区別は「安全のため」という明確な技術的理由がある。コネクタ形状の増加は「デバイスの小型化（Mini→Micro）」「速度向上に伴うピン数増加」「リバーシブル化（USB-C）」という段階的な技術進化の結果。特にMicro-USBの「摩耗をケーブル側に移す」設計は、台本で使えるビジュアル要素。
