# リサーチ結果：USBはなぜ形が統一されないのか

- 作成日: 2026-03-24
- テーマ: USBコネクタの形状が統一されない理由
- リサーチ方針: 主流情報・反論・背景の3方向並列リサーチ

---

## 🟢 信頼度「高」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | USB以前のPCにはシリアル(9/25pin)、パラレル(25pin)、PS/2(6pin)、SCSI、ゲームポート等、機器ごとに異なるコネクタが必要だった | SlashGear, EE Times, Wikipedia | ⭐⭐⭐ |
| 2 | USBは1994年にIntelのAjay Bhattが提案。Compaq,DEC,IBM,Intel,Microsoft,NEC,Nortelの7社で開発。1996年にUSB 1.0リリース | Wikipedia, SparkFun, Britannica | ⭐⭐⭐ |
| 3 | IntelはUSBの特許をロイヤリティフリーで公開。これが爆発的普及の要因 | Wikipedia | ⭐⭐ |
| 4 | Type-AとType-Bの区別は「ホスト/デバイス」の役割を明確にし、誤接続による電源衝突を防ぐため | USB-IF仕様書, Wikipedia, SparkFun | ⭐⭐⭐ |
| 5 | Micro-USBは耐久性10,000回（Mini-USBは5,000回）。摩耗をケーブル側に移す設計（leaf-springコネクタを安価なケーブル側に配置） | Wikipedia, Stack Exchange, LogoTech | ⭐⭐⭐ |
| 6 | USB-Cは24ピン、リバーシブル設計。CCピンで向き検知・PD交渉。SBUピンでAlternate Mode（DisplayPort等） | USB-IF, AllAboutCircuits, Cambrionix | ⭐⭐⭐ |
| 7 | USB-Cはコネクタの形状であり、中身はUSB 2.0（480Mbps）からUSB4（80Gbps）まで様々。同じ形なのに性能が全く違う | Android Authority, PCMag, The Next Web | ⭐⭐⭐ |
| 8 | USB 3.0→3.1 Gen1→3.2 Gen1と何度もリネーム。2023年に「USB 5Gbps/10Gbps/20Gbps」の速度表記に簡素化 | CNET, Wikipedia, XDA Developers | ⭐⭐⭐ |
| 9 | EU共通充電器指令: 2024年12月からUSB-C義務化。年間11,000トンの電子廃棄物削減、消費者年間約2.5億ユーロ節約 | europa.eu, Granite River Labs | ⭐⭐⭐ |
| 10 | Apple Lightningは2012年登場（USB-Cの2年前）。MFiライセンス料が延命の一因。EU法により2023年のiPhone 15でUSB-Cに移行 | Wikipedia, Apple Insider | ⭐⭐ |
| 11 | 2009年にGSMA/OMTPがMicro-USBを携帯充電統一規格に採用。14社がMoU署名 | Wikipedia OMTP, GSMA | ⭐⭐ |
| 12 | USB-Cの電源ピンはデータピンより先に接続される設計。ショート防止の安全機構 | SparkFun | ⭐⭐ |
| 13 | USB 1.0: 4ピン, 5V/500mA → USB-C: 24ピン, 最大48V/5A(240W)。1996年の技術でUSB-Cは実現不可能 | USB-IF仕様書 | ⭐⭐⭐ |
| 14 | Thunderbolt 3/4もUSB-Cコネクタを使用。同じ形でも40Gbpsと5Gbpsが混在 | OWC, BenQ | ⭐⭐ |

## 🟡 信頼度「中」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | Ajay Bhattの娘がプリンタ接続に苦労したことが開発動機の一つ | SparkFun, SmarterMSP | ⭐⭐ |
| 2 | USB-IFのリネーム方針は「エンジニアが1つの仕様書で全世代を参照できるように」が目的 | CNET, Total Phase | ⭐⭐ |
| 3 | USB-Cでもメーカー実装次第で映像出力・急速充電の有無が異なる。同一PCの複数ポートで性能が違うことも | Android Authority, PCMag | ⭐⭐ |
| 4 | インド・台湾もEUに倣いUSB-C統一の検討を開始 | Compliance and Risks | ⭐ |

## 🔴 信頼度「低」（台本使用不可）

| # | ファクト | 理由 |
|---|---------|------|
| 1 | 「USBの種類が多いのは企業の陰謀」 | 根拠なし。ロイヤリティフリーの事実と矛盾 |

## 📌 台本構成への提言

1. **冒頭フック**: USB-Aの「3回挿し直す問題」→ 思考実験「USBが存在しない世界」
2. **直感の構築**: Type-A/Bの分離は「安全装置」という納得感のある理由
3. **直感の破壊**: 「USB-Cで統一された！」→「実はUSB-Cこそ最大のカオス」（同じ形で性能バラバラ、規格名リネーム地獄）
4. **再構築**: USB-Cの24ピンが実現した「CCピン・SBU・PD」の技術的ブレイクスルーと、EUの法的強制力の組み合わせで「本当の統一」へ
5. **パターン統合**: 「形の統一」と「中身の統一」は別問題。USBの30年の歴史は「外見と中身を同時に統一する難しさ」の物語
