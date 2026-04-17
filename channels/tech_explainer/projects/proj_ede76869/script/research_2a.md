# リサーチ: インターネットは誰が作って誰が管理しているのか

調査日: 2026-04-10
検索回数: 9回

---

## ファクト表

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | ARPANETは1966年にボブ・テイラーがJ.C.R.リックライダーのアイデアを基に立ち上げ、ラリー・ロバーツがプログラムマネージャーに就任。1969年10月29日、UCLAとスタンフォード研究所間で最初の通信が行われた | 🟢高 | [ARPANET - Wikipedia](https://en.wikipedia.org/wiki/ARPANET), [Internet Society - Brief History of the Internet](https://www.internetsociety.org/internet/history-internet/brief-history-internet/) |
| 2 | ヴィントン・サーフ（スタンフォード大）とボブ・カーン（DARPA）が1974年にTCP（Transmission Control Program）を共同設計。仕様はRFC 675として公開された。1983年1月1日にARPANETがTCP/IPへ正式移行（「Flag Day」） | 🟢高 | [ETHW - TCP Milestone](https://ethw.org/Milestones:Transmission_Control_Protocol_(TCP)_Enables_the_Internet,_1974), [NIHF - Vinton Cerf](https://www.invent.org/inductees/vinton-g-cerf) |
| 3 | TCP/IPの設計思想は「エンドツーエンド原則」に基づく。ネットワーク内部に状態を持たず、知性はエッジ（端末）に置く。RFC 1958で「ネットワークの仕事はデータグラムをできるだけ効率的かつ柔軟に伝送すること。それ以外はすべて端（フリンジ）で行うべき」と明文化 | 🟢高 | [RFC 1958 - Architectural Principles of the Internet](https://www.rfc-editor.org/rfc/rfc1958.html) |
| 4 | ICANN（1998年設立）はドメイン名・IPアドレス・プロトコルパラメータの技術的調整を担当。IANA機能（DNSルートゾーン管理、IPアドレスプール管理等）を運営。IETF（1986年設立）は技術標準を策定。ISOC（1992年設立）はIETFに組織的・財政的支援を提供。RIR（5つの地域インターネットレジストリ）がIPアドレスを地域ごとに割り当てる | 🟢高 | [APNIC - I* Organizations](https://www.apnic.net/community/ecosystem/iorgs/), [Internet Society - Internet Governance](https://www.internetsociety.org/resources/policybriefs/2025/internet-governance/) |
| 5 | RFC（Request for Comments）による標準化プロセス: まずInternet-Draft（I-D）を誰でも提出可能 → IETFワーキンググループで査読・議論 → Proposed Standard → Internet Standardへ段階的に昇格。「ラフコンセンサスとランニングコード」が基本原則 | 🟢高 | [IETF - RFCs](https://www.ietf.org/process/rfcs/), [RFC 2026 - The Internet Standards Process](https://datatracker.ietf.org/doc/html/rfc2026) |
| 6 | DNSルートサーバーは13の名前識別子（A〜M）を持ち、12の独立した組織が運用。物理的には1,700以上のインスタンスが130カ国以上に分散配置。IPエニーキャストにより最寄りのサーバーに自動ルーティングされる | 🟢高 | [IANA - Root Servers](https://www.iana.org/domains/root/servers), [Root Server Technical Operations Association](https://root-servers.org/) |
| 7 | BGP（Border Gateway Protocol）はAS（自律システム）間の経路交換プロトコル。パスベクトル型で、TCPポート179を使用。各ASはASN（自律システム番号）で識別される。eBGP（AS間）とiBGP（AS内）の2種類がある。インターネット全体のルーティングを支える「インターネットの郵便局」 | 🟢高 | [Cloudflare - What is BGP?](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/), [AWS - What is BGP?](https://aws.amazon.com/what-is/border-gateway-protocol/) |
| 8 | ISPは3層構造: Tier 1（Lumen, NTT, Telia等）はグローバルバックボーンを所有し、相互に無料ピアリング（settlement-free peering）。Tier 2は地域/国レベルで一部ピアリング＋一部トランジット購入。Tier 3はラストマイル提供者で、上位ISPからトランジットを購入して消費者にサービス | 🟢高 | [Wikipedia - Tier 1 Network](https://en.wikipedia.org/wiki/Tier_1_network), [ThousandEyes - ISP Tiers](https://www.thousandeyes.com/learning/techtorials/isp-tiers) |
| 9 | 2025年時点で海底ケーブルは約570本が稼働中、総延長150万km以上。さらに81本以上が計画中。全世界のインターネットトラフィックの99%が海底ケーブルを経由。Google（約33本）、Meta（約15本）、Microsoft（5本）、Amazon（4本）などテック大手がケーブルの約50%を所有・共有 | 🟡中 | [TeleGeography - Submarine Cable FAQs](https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions), [The Register - Hyperscalers Submarine Cables](https://www.theregister.com/2024/09/25/aspi_hyperscaler_cables/) |
| 10 | Metaが「Project Waterworth」を発表（2025年2月）。全長5万km、5大陸を結ぶ世界最長の海底ケーブルで、投資額は約100億ドル。AI需要の増大がハイパースケーラーの海底インフラ投資を加速させている | 🟡中 | [CNBC - Underwater Cables AI Buildout](https://www.cnbc.com/2025/11/08/big-tech-ai-underwater-cables.html), [DIGITIMES - Meta Google Amazon Submarine Cables](https://www.digitimes.com/news/a20250318PD206/cables-google-meta-amazon-data.html) |
| 11 | 2025年10月時点で世界のインターネット利用者数は約60.4億人（世界人口の73.2%）。年間約2.94億人増加（前年比+5.1%）。2026年中に世界人口の75%がオンラインになる見通し | 🟡中 | [DataReportal - Digital 2025 Global Overview](https://datareportal.com/reports/digital-2025-global-overview-report), [Statista - Digital Population Worldwide](https://www.statista.com/statistics/617136/digital-population-worldwide/) |
| 12 | モバイル端末が全Webトラフィックの約64%を生成（2025年）。世界のスマートフォン台数は74億台。1日あたりの平均オンライン時間は6時間38分。動画・音声・ソフトウェアがインターネットトラフィックの82%を占める | 🟡中 | [DataReportal - Global Digital Overview](https://datareportal.com/global-digital-overview), [ElectroIQ - Internet Statistics 2026](https://electroiq.com/stats/internet-statistics/) |
| 13 | インターネットには「単一の管理者」が存在しない。IAB（Internet Architecture Board）がICANN、RIR、ISOCなどと連携しつつ技術的・構造的助言を行う。各組織が分散的に役割を分担する「マルチステークホルダーモデル」で運営されている | 🟢高 | [European Parliament - Internet Governance](https://www.europarl.europa.eu/RegData/etudes/BRIE/2024/766272/EPRS_BRI(2024)766272_EN.pdf), [Internet Society - Internet Governance](https://www.internetsociety.org/resources/policybriefs/2025/internet-governance/) |

---

## まとめ

1. **起源**: インターネットは1969年のARPANETに端を発し、ヴィントン・サーフとボブ・カーンが1974年に設計したTCP/IPが「共通言語」となった。1983年の正式移行により現在のインターネットの基盤が確立された。
2. **設計思想**: 「エンドツーエンド原則」により、ネットワークはシンプルにデータを運ぶだけ、知性は端末側に置くという分散型アーキテクチャが採用された。これが爆発的なイノベーションを可能にした。
3. **管理体制**: インターネットを一元管理する組織は存在しない。ICANN（名前・番号）、IETF（技術標準/RFC）、ISOC（普及・財政支援）、RIR（IPアドレス配分）などが「マルチステークホルダーモデル」で分散的に運営している。
4. **物理インフラ**: 海底ケーブル570本以上（総延長150万km超）が国際通信の99%を担い、近年はGoogle・Meta等のテック大手が巨額投資で直接所有する比率が急増している。
5. **現在の規模**: 世界の利用者は60億人超（人口の73%）、1日平均6時間半オンライン。BGPとDNSルートサーバーという2つの仕組みが、この巨大ネットワークの経路制御と名前解決を支えている。
