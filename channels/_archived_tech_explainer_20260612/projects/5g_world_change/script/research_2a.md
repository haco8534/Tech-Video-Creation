# Step 2a: 基本情報・仕組み・通説

## テーマ: 5Gで世界は変わった？

---

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 5Gの3大ユースケースは eMBB（超高速大容量：下り最大20Gbps）、URLLC（高信頼超低遅延：遅延1ms、可用性99.9999%）、mMTC（多数同時接続：1km^2あたり100万デバイス）である。ITU-R勧告M.2083で定義された13項目のIMT-2020性能要件に基づく。 | 🟢高 | [ITU-R M.2083](https://www.itu.int/en/ITU-D/Regional-Presence/ArabStates/Documents/events/2018/RDF/Workshop%20Presentations/Session1/5G-%20IMT2020-presentation-Marco-Carugi-final-reduced.pdf) / [ITU-R M.2410](https://www.itu.int/dms_pub/itu-r/opb/rep/R-REP-M.2410-2017-PDF-E.pdf) |
| 2 | 5G NRの周波数帯はFR1（Sub-6 GHz: 410MHz〜7125MHz、帯域幅最大100MHz）とFR2（mmWave: 24.25GHz〜71GHz、帯域幅最大400MHz/キャリア）の2範囲。日本ではSub-6として3.7GHz/4.5GHz帯、ミリ波として28GHz帯が割当て。Sub-6は広域カバー向き、ミリ波は超高速だが到達距離が短い。 | 🟢高 | [3GPP 38シリーズ仕様](https://en.wikipedia.org/wiki/5G_NR_frequency_bands) / [5G NR Wikipedia](https://en.wikipedia.org/wiki/5G_NR) |
| 3 | IMT-2020公式スペック：ピークデータレート下り20Gbps/上り10Gbps、ユーザー体感速度下り100Mbps/上り50Mbps、遅延ユーザープレーン1ms/制御プレーン20ms、接続密度100万デバイス/km^2、面積トラフィック容量10Mbps/m^2。 | 🟢高 | [ITU-R M.2410-0 (2017)](https://www.itu.int/dms_pub/itu-r/opb/rep/R-REP-M.2410-2017-PDF-E.pdf) / [Wikipedia 5G](https://en.wikipedia.org/wiki/5G) |
| 4 | NSA（Non-Standalone）は4Gコアネットワーク（EPC）上に5G無線を載せる方式。SA（Standalone）は5G専用コアを使い、URLLCやネットワークスライシングなど5G本来の機能をフル活用できる「真の5G」。2024年に3GPP Release 18が確定し、5G-Advancedへの移行が公式に始まった。 | 🟢高 | [3GPP Release 18](https://spectrum.ieee.org/3gpp-release-15-overview) / [ITmedia](https://techtarget.itmedia.co.jp/tt/news/2107/16/news01.html) |
| 5 | 4G LTEとの技術比較：4Gは周波数700MHz〜3.5GHz帯・下り最大150〜200Mbps・遅延約10ms。5Gは3.7GHz〜28GHz帯・下り最大20Gbps（理論値）・遅延1ms。速度は理論上100倍以上、遅延は1/10。5Gは「100倍の容量増加」を設計目標としている。 | 🟢高 | [Wikipedia 5G](https://en.wikipedia.org/wiki/5G) / [Ericsson 5G解説](https://www.ericsson.com/en/5g) |
| 6 | **通信世代の進化史：** 1G（1980年代）=アナログ音声通話、2kbps。2G（1991年〜）=デジタル化・SMS、64kbps。3G（2001年〜）=モバイルインターネット・音楽ストリーミング、2Mbps。4G（2009年〜）=HD動画・オンラインゲーム、100Mbps〜。5G（2019年〜）=IoT・超低遅延、20Gbps理論値。各世代は約10年周期で交代。 | 🟢高 | [CENGN Timeline](https://www.cengn.ca/information-centre/innovation/timeline-from-1g-to-5g-a-brief-history-on-cell-phones/) / [Rohde & Schwarz](https://www.rohde-schwarz.com/tw/about/magazine/brief-history-1g-to-6g/brief-history-1g-to-6g_256390.html) |
| 7 | **各世代の「革命」：** 1G→2Gはアナログ→デジタル化（メールが打てるようになった）。2G→3Gはデータ通信（ガラケーでネットが使えた）。3G→4Gは動画・アプリ（スマホ時代の到来、YouTube/Netflix/Uber等のモバイルサービスが爆発）。4G→5Gは「IoT・産業変革」が謳われたが、消費者向けキラーアプリはまだ見つかっていない。 | 🟡中 | [AT&T TechBuzz](https://techbuzz.att.com/explainers/history-of-the-mobile-phone-from-1g-to-5g/) / [Tridens Technology](https://tridenstechnology.com/generations-of-mobile-networks/) |
| 8 | 日本の5G人口カバー率は2024年度末（2025年3月末）時点で全国98.4%。都道府県別では神奈川県・大阪府が99.9%で最高、島根県が88.4%で最低。全1,741市区町村に5G基地局整備済み。総務省は2030年度末に全国・各都道府県とも99%を目標。 | 🟢高 | [総務省 報道資料（令和6年度末）](https://www.soumu.go.jp/menu_news/s-news/01kiban14_02000731.html) / [総務省PDF](https://www.soumu.go.jp/main_content/001030453.pdf) |
| 9 | 2025年6月末時点で5G契約数は1億1,571万件となり、LTE契約数（1億1,151万件）を初めて逆転した。5G契約は前年同期比+17.9%で急増中。 | 🟢高 | [総務省 電気通信サービスデータ](https://orefolder.jp/2025/09/soumu-share-202506/) |
| 10 | 2025年3月末の5G基地局数は全国30万2,118局。キャリア別ではKDDI（au）11万37局、ソフトバンク10万4,441局、NTTドコモ5万2,532局、楽天モバイル3万5,108局。ドコモの基地局数はau・ソフトバンクの約半分。 | 🟢高 | [ケータイWatch / 総務省調査](https://k-tai.watch.impress.co.jp/docs/news/2077686.html) |
| 11 | 5G SA対応基地局は前年度から約5.1万局増の15万5,721局に達し、5G基地局全体の過半数を超えた。Sub6帯ではKDDIが4万1,596局でリード（ドコモ3万3,543局、ソフトバンク1万2,541局）。 | 🟢高 | [BUSINESS NETWORK / 総務省](https://businessnetwork.jp/article/32446/) |
| 12 | 「なんちゃって5G」（転用5G）とは、4Gの周波数帯（700MHz〜900MHz等）を5G NR方式に転用したもの。端末に「5G」と表示されるが、帯域幅が狭いため速度は4Gとほぼ同等。ソフトバンクが先行し、ドコモも後に追随。FR1で4G再利用する初期デプロイメントでは4G比で15〜50%程度のスループット向上にとどまる。 | 🟢高 | [日経クロステック](https://xtech.nikkei.com/atcl/nxt/column/18/01481/112500003/) / [Wikipedia 5G](https://en.wikipedia.org/wiki/5G) |
| 13 | 5G実測速度（2026年1月・ICT総研 全国調査）：全国729地点の4社平均で下り140.2Mbps。キャリア別トップはau福井県326.4Mbps、ソフトバンク秋田県321.1Mbps。5G受信地点比率は全国平均67.9%（＝測定地点の約3割はまだ4G接続）。レイテンシ最短は神奈川県13.2ms。 | 🟢高 | [ICT総研 2026年1月調査](https://ictr.co.jp/report/20260106.html/) |
| 14 | 山手線5G実測（2025年6月）：駅ホームの4社平均は下り206.5Mbps、駅間は47.4Mbps。auが168.6Mbpsでトップ。理論値20Gbpsに対し実測は約1/100〜1/400に留まる。実測でのレイテンシは約8〜12ms（理論値1msの8〜12倍）、Verizonの初期デプロイメントでは約30ms。 | 🟢高 | [ICT総研 2025年6月調査](https://ictr.co.jp/report/20250618.html/) / [Wikipedia 5G](https://en.wikipedia.org/wiki/5G) |
| 15 | **世界の5G契約数：** 2025年末時点で29億契約（全モバイルの約1/3）。2024年末は23億、2023年末は17億、2022年末は10億。5Gは4G LTEの4倍の速度で普及拡大中（4Gが同時期に5億契約だったのに対し5Gは22.5億）。2027年末に4Gを逆転し支配的技術になる見込み。 | 🟢高 | [Ericsson Mobility Report](https://www.ericsson.com/en/reports-and-papers/mobility-report/dataforecasts/mobile-subscriptions-outlook) / [5G Americas](https://www.5gamericas.org/global-5g-adoption-skyrockets-to-2-25-billion-four-times-faster-than-4g/) |
| 16 | **地域別5G普及率（2025年末）：** 北米79%（最高）、北東アジア61%、西欧・GCC55%。世界全体ではITU報告で人口の51%が5Gカバー圏内。2025年3月時点で354の商用5Gネットワークが世界で運用中（4G LTEは706）。 | 🟢高 | [Ericsson Mobility Report](https://www.ericsson.com/en/reports-and-papers/mobility-report/dataforecasts/mobile-subscriptions-outlook) / [5G Americas](https://www.5gamericas.org/global-5g-adoption-skyrockets-to-2-25-billion-four-times-faster-than-4g/) |
| 17 | **世界の5G設備投資額：** 2020〜2025年の6年間で世界のモバイル事業者は合計1.1兆ドル（約165兆円）のCapexを投じ、うち約80%が5G関連。2023〜2030年には1.5兆ドル（うち90%が5G向け）の追加投資が見込まれる。2025年単年のモバイルCapexは1,800億ドル。 | 🟢高 | [GSMA Intelligence](https://www.gsmaintelligence.com/research/2025-capex-outlook-2020-update-the-1-trillion-investment) / [GSMA Mobile Economy](https://www.gsma.com/solutions-and-impact/connectivity-for-good/public-policy/mobile-policy-handbook/mobile-policy-handbook/connecting-the-world-investing-in-the-future/) |
| 18 | **日本の5G設備投資額：** 2019年の5G周波数割当て時、4キャリアの5年間（2019〜2023年度）投資計画は合計約3兆円（ドコモ・KDDI各1兆円、ソフトバンク5,000億円、楽天2,000〜3,000億円）。2024年度のグループ全体設備投資はNTT 1兆1,143億円、KDDI 6,789億円、ソフトバンク3,218億円、楽天930億円。 | 🟢高 | [iPhone Mania / 総務省](https://iphone-mania.jp/news-244817/) / [総務省 通信市場動向資料](https://www.soumu.go.jp/main_content/001014955.pdf) |
| 19 | **5Gのマーケティングと期待値：** キャリア各社は「4Gの100倍速い」「20Gbps」「遅延1ms」を宣伝。しかしアナリストは「マーケティングがしばしば5Gの能力を過大に喧伝してきた」と指摘。実測のダウンロード速度は中帯域で10〜1,000Mbps、低帯域で5〜250Mbpsと、理論値との乖離が大きい。米国T-Mobileの平均は約186Mbps、韓国が世界最速で約430Mbps（2022年）。 | 🟡中 | [Wikipedia 5G](https://en.wikipedia.org/wiki/5G) / [ScienceDaily](https://www.sciencedaily.com/releases/2018/07/180705110036.htm) |
| 20 | 韓国は5Gカバレッジ100%で世界首位。3社平均ダウンロード速度は939Mbps（7カ国平均の2.8倍以上）。しかし、利用者800人調査で「5Gに満足」はわずか14%。地域差、混雑時の品質低下、高い期待値とのギャップが不満の原因。 | 🟡中 | [dメニューニュース / Ericsson LG調査](https://topics.smt.docomo.ne.jp/article/searchkoreanews/world/searchkoreanews-32640) |
| 21 | 5Gの「約束」だった遠隔手術・自動運転はいまだ実証実験段階。NTTドコモは神戸大学と遠隔ロボット手術支援の実証を実施。2026年1月に横浜市でローカル5G活用の自動運転走行支援実証を開始。いずれも商用化には至っていない。 | 🟢高 | [NTTドコモ R&D](https://www.docomo.ne.jp/corporate/technology/rd/6g/006/) / [NTTドコモビジネス](https://www.ntt.com/about-us/press-releases/news/article/2026/0116.html) |
| 22 | 5Gはビームフォーミング（最大128本アンテナによる指向性送信）やMassive MIMOなどの新技術を採用し、4Gとは根本的に異なるアーキテクチャを持つ。ただし現実にはNSA方式での運用が多く、これらの技術が十分に活用されているとは言いがたい。 | 🟡中 | [各種技術解説記事の総合](https://www.doracoon.net/navi/solutions/solutions-2721/) |
| 23 | **5G商用サービス開始の世界タイムライン：** 2019年4月3日に韓国が世界初の全面商用開始。同月に米Verizonが限定サービス開始。2019年6月にフィリピン。2019年12月にAT&Tがコンシューマー向け開始。2020年3月に日本でドコモ・au・ソフトバンクが商用開始。2020年にT-Mobileが世界初のSAネットワークを全国展開。 | 🟢高 | [Wikipedia 5G](https://en.wikipedia.org/wiki/5G) |
| 24 | **「なぜ5Gに期待が集まったか」の構造的理由：** (1) 3G→4Gの成功体験（iPhone+4GがYouTube/Netflix/Uberなどの巨大産業を生んだ）による「次もきっと」という期待。(2) IoT・産業革命の文脈（Industry 4.0、スマートシティ）と結びつけられた。(3) 米中技術覇権争い（Huawei排除問題）で地政学的に注目度が上がった。(4) キャリアが巨額投資を回収するためにマーケティングを強化した。 | 🟡中 | 複数出典の総合分析 |

---

## まとめ

### 台本で使えるキーポイント

1. **通信世代の「革命パターン」：** 1G=通話、2G=メール、3G=ネット、4G=動画・アプリ。各世代は明確な「生活が変わった瞬間」を持っていた。5Gにはまだそれがない。この対比は動画の冒頭で使える強力なフックになる。

2. **理論値と現実の壮大なギャップ：** 理論上の下り最大20Gbpsに対し、日本の実測平均は約140Mbps（全国）〜200Mbps（山手線ホーム）で、理論値の1%程度。レイテンシも理論値1msに対し実測8〜12ms。「4Gの100倍」というマーケティングは数字のマジック。

3. **カバレッジの数字トリック：** 日本の5G人口カバー率は98.4%と立派だが、ICT総研の実測では5G受信地点は67.9%。「なんちゃって5G」（転用5G）が数字を押し上げている。端末に「5G」と表示されても速度は4G並。

4. **巨額投資の規模感：** 世界で1.1兆ドル（約165兆円）、日本だけでも5年で3兆円以上。この投資に見合うリターンがあったのかが核心的な問い。

5. **普及のスピードは速い、しかし「体感」が伴わない：** 5Gは4Gの4倍速く普及し、2025年末で世界29億契約。しかし韓国の事例が象徴的で、世界最速939Mbpsでも満足度わずか14%。速度だけでは「世界が変わった」感は生まれない。

6. **キラーアプリ不在が根本問題：** 遠隔手術・自動運転・IoTは7年経った今もまだ実証実験段階。4G時代のYouTube/Netflix/Uberに相当するサービスが5Gから生まれていない。これは「技術が悪い」のではなく「需要側の準備ができていない」問題かもしれない。

7. **期待が膨らんだ構造的理由：** 3G→4Gの大成功体験、Industry 4.0との結びつけ、米中覇権争いによる地政学的注目、キャリアの巨額投資回収圧力。これらが合わさって「5Gで世界が変わる」というナラティブが形成された。

8. **「まだ途中」という視点も必要：** SA対応基地局が過半数を超え、5G-Advanced（Release 18）が始まったばかり。真の5G（SA＋ネットワークスライシング＋mMTC）の実力が発揮されるのはこれからという見方もある。判断が早すぎる可能性は台本で公平に扱うべき。
