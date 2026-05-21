# research_1b: 通説への反証・例外・限界・ありがちな誤解

視点: "インターネットは誰が作って誰が管理しているのか" にまつわる通説と一次情報・学術研究との**ズレ**を整理する。
台本では、視聴者の前提を軽く揺さぶるフックや、深掘り部分のファクトチェック根拠として使う。

---

## ファクト表

| # | 通説 | 実態 | 信頼度 | 出典 |
|---|------|------|--------|------|
| 1 | 「ARPANETは核戦争で生き残るために作られた」 | **これは事実誤認**。ARPA長官(1965-67)Charles Herzfeld自身が「ARPANETは核攻撃に耐えるC2システムを作るために始めたものではない。むしろ国中に数少ない大型研究コンピュータがあり、地理的に離れた研究者がアクセスできない不満から生まれた」と明言。核耐性の文脈はPaul Baran (RAND, 1964)の別研究に由来する混同。 | 高(当事者一次証言) | Internet Society / ARPANET Wikipedia (Herzfeld引用), RAND公式 "Paul Baran and the Origins of the Internet" (2018) |
| 2 | 「Paul BaranのRANDネットワーク構想がARPANETにそのまま繋がった」 | Baranの"On Distributed Communications"(1964)は**核攻撃下の音声通信の生存性**を目的にした研究で、ARPANETとは動機・組織・系譜が別。ARPANET設計者(Larry Roberts)は後年Baranの論文を参照したが、出発点はDonald Davies(英NPL)の"packet switching"概念とLicklider/Taylorの資源共有ビジョン。 | 高 | Britannica "Paul Baran", LivingInternet, Janet Abbate "Inventing the Internet" (MIT Press, 1999) |
| 3 | 「Tim Berners-Leeがインターネットを発明した」 | 発明したのは**World Wide Web (HTTP/HTML/URL)**であり、1989年CERNでの提案。インターネット(TCP/IP基盤)は1983年にARPANETが正式採用、Vint Cerf / Bob Kahnが1974年にTCP仕様を発表済み。Berners-Leeは既存のインターネット上にハイパーテキスト層を乗せた。 | 高 | CERN公式 "The birth of the Web", W3C Berners-Lee略歴, Wikipedia "History of the WWW" |
| 4 | 「ICANNがインターネット全体を管理している」 | ICANNが調整するのは**ドメイン名とIPアドレスの識別子空間**(DNS, IPv4/v6, ASN, ルートゾーン運用)のみ。管理**しない**もの: コンテンツ、ISP、BGPルーティング(各AS管理者)、プロトコル仕様(IETF)、各国法。ICANN公式も「調整はするが強制はしない」と明記。 | 高 | ICANN "What Does ICANN Do?", ICANN公式資料 |
| 5 | 「誰も管理していない/完全に分散」 | 実質的な**鍵**はルートゾーンファイル。2016年10月のIANA stewardship transitionまで、ルートゾーン変更はVerisign(ルート運用者)が**米国商務省NTIAの認可**を受けて実施していた。同日NTIAはVerisignへのCooperative Agreementを改正し認可義務を解除、運用はグローバルマルチステークホルダーコミュニティに移管。つまり「誰も管理していない」は2016年以前は**歴史的に不正確**。 | 高 | NTIA "Q and A on IANA Stewardship Transition", ICANN Stewardship Implementation, Internet Society "IANA Transition" |
| 6 | 「RFCは民主的な多数決で決まる」 | IETFの決定原則はDave Clarkの"rough consensus and running code"。RFC 7282 (2014)は**投票を明確に否定**: 議長は「反対意見は無効だから」と押し切ってはならず技術的判断を示す必要がある。"humming"(うなり声)で空気を読む独特手法もあるが、これは多数決を避けるための装置。つまり「民主的」というより**技術裁量を持つ議長+大口実装者の影響力**が機能する半職人主義。 | 高 | RFC 7282 "On Consensus and Humming in the IETF", Andrew L. Russell "Open Standards and the Digital Age" (Cambridge UP, 2014) |
| 7 | 「IETFは中立的な技術者コミュニティ」 | IETFへの貢献は特定企業に偏る。IPlyticsの1980-2021集計で**Cisco約1,600件**でトップ、近年はHuawei・Cisco・Googleが主要。2024年7月のVancouver会合は**Huaweiがホスト**(参加者onsite 833名)。Andrew Russellの歴史研究は「『open』というキーワードはOSI敗北後にインターネット陣営が取り込んだものであり、IETFは"meritocratic"だが実態は市場と階層の中間」と整理。 | 高 | IETF公式 "IETF Snapshot 2024", Statista (Internet standards submissions), Russell (2014) |
| 8 | 「インターネットはどこの国にも属さない」 | 国家単位の囲い込みが常態化。中国:Golden Shield/Great Firewall(Facebook・Google・Yahooなどブロック)、ロシア:2019年主権インターネット法に基づくRuNetが2026年時点で稼働(BGP経路を国家インフラ経由に誘導、CDN絞り/GitHub断続遮断)、イラン:National Information Network (SHOMA)。物理層(海底ケーブル)も各国の領海通過時は主権下。 | 高 | Atlantic Council "Cyber defense across the ocean floor" (2025), OSW "The Great Russian Firewall" (2025), Henry Jackson Society (2025) |
| 9 | 「政府はインターネットを止められない」 | Access Now #KeepItOnの集計で**2024年は51か国で304件**、**2025年は52か国で313件**のシャットダウンを記録(2023年の283件/39か国から拡大)。2025年経済損失は約**197億ドル**(top10vpn)。最悪はMyanmar 95件(うち76件を軍政)、India 65件、Pakistan 20件、Iran 11件。2016年の計測開始以降、計100か国が経験。 | 高 | Access Now "When repression meets resistance: internet shutdowns in 2025", top10vpn研究, UN News (2026) |
| 10 | 「ドメイン名は早い者勝ちで公平」 | UDRP (1999年ICANN制定) により**著名商標は事後に奪還可能**。WIPOは2023年に約6,200件受理(2022年比+7%)。要件は(1)商標と同一/混同的類似、(2)正当利益なし、(3)悪意の登録・使用。SAPやCalvin Kleinなど著名標章を狙った事例で実際にドメイン移転命令が出ている。つまり「先願主義」は商標権で上書きされる。 | 高 | WIPO "Domain Name Dispute Resolution Statistics", WIPO 2024 Domain Name Report |
| 11 | 「IPv4アドレスは公平に配分された」 | 配分は歴史的に不均衡。MIT・Ford・US軍などの初期"レガシー"ブロックは**RIR制度成立前**の寛大な割当で、North AmericaはASNとIPv4が潤沢に残っていたためARINの枯渇は2015年9月まで遅延(APNICは2011年4月, RIPEは2012年9月, LACNICは2014年6月に枯渇)。 | 高 | Wikipedia "IPv4 address exhaustion", APNIC公式, RIPE NCC "What is IPv4 Run Out?", IEEE-USA white paper |
| 12 | 「IPアドレスは買えない(売買不可)」 | 実態は**2次市場が巨大化**。IPv4 Globalなどが仲介し、2024年にある1社だけで**724件/342万IP/1.54億ドル**の取引を扱った。2024年中頃は約$50/IPまで高騰、2025年は$20台まで下落しリース相場は$0.40-0.50/IP/月。ICANNは調整するが売買自体は止められない。 | 中-高(業界データ) | IPv4 Global / Voldeta / CircleID (2025 IPv4 Price Trends) / IPXO |
| 13 | 「TCP/IPが勝ったのは技術的に優れていたから」 | Andrew L. Russellの歴史研究(Cambridge UP, 2014)とIEEE Spectrum "OSI: The Internet That Wasn't"が示す結論は逆。OSI敗北の主因は**政治・実装コスト・タイミング**。OSIは"先に仕様→後で実装"で国際標準化機構の官僚的プロセスが遅延、一方TCP/IPは"実装が先、仕様は追認"で1983年ARPANETに採用され既成事実化。1990年代以降にインターネット陣営が「open」という語をOSIから奪取した経緯もある。 | 高 | Andrew L. Russell "Open Standards and the Digital Age" (2014), IEEE Spectrum "OSI: The Internet That Wasn't" |
| 14 | 「ルートDNSサーバは1台の万能サーバ」 | 13は**named authority (A-M)** の数であり実機数ではない。**12の独立組織**が運用(Verisignが2つ(A,J)担当)。運用者はVerisign, USC-ISI, Cogent, Univ of Maryland, NASA Ames, ISC, US DoD NIC, US Army, Netnod(瑞), RIPE NCC(欧), ICANN, WIDE Project(日)。Anycastで**2025年12月時点で1,954インスタンス**が世界展開。 | 高 | IANA "Root Servers", Root Server Technical Operations Association, Wikipedia "Root name server" |
| 15 | 「BGPは中央が制御する」 | BGPは仕様上**中央調整を前提としない**分散プロトコル。各Autonomous System (AS)が自身のルーティングポリシーを決め、peering sessionで近隣ASと情報交換するだけ。ASN自体はIANA→RIRが付番するが、経路選択の判断は各AS管理者の局所裁量。故に経路ハイジャックやリーク(YouTube誤アナウンス事件など)は**誰かが許可したから**ではなく**誰も止めなかったから**起きる。 | 高 | AWS "What is BGP?", Cloudflare, Wikipedia "Border Gateway Protocol" / "Autonomous system" |
| 16 | 「海底ケーブルはグローバル公共インフラで国家関与なし」 | 実態は**コンソーシアム所有+ランディングポイントの国家主権下**。領海内ではタッピングは国家主権侵害として管轄権、EEZ・公海では法的地位が曖昧。2013年Snowden暴露でNSAが西側通信事業者経由で直接タップしていたことが判明。米FCCは2025年3月に海底ケーブル着陸ライセンス規則の国家安全保障観点での全面見直しに着手。 | 高 | FCC Fact Sheet (2025-07-17), Atlantic Council (2025), European Parliament EXPO/IDA (2022), TeleGeography |

---

## 通説→実態ズレのハイライト(台本フック候補)

- **「核戦争向けではない」**: Herzfeld当事者発言が存在するのに、日本語圏の解説では今も"核戦争対策"説が残存 → 冒頭の"そう聞いたことありません?"型フックに最適
- **「Berners-Leeは発明してない(インターネットを)」**: 名前は知ってるけど何を発明したかは曖昧、という視聴者の盲点を突ける
- **「誰も管理してない、は2016年以前は嘘」**: NTIA/IANA transitionの具体的日付と構造で説明すると、中立スタンスで"事実"として語れる
- **「RFCは多数決じゃない、humで決める」**: rough consensusの仕組みは雑学としても面白くかつ意外性あり
- **「IPv4は買える・リースできる」**: $9-55/IPの価格レンジは数字として視聴者が驚きやすい

---

## 主要参照源(学術・一次)

- Janet Abbate (1999) *Inventing the Internet*, MIT Press — ARPANET社会史の決定版
- Andrew L. Russell (2014) *Open Standards and the Digital Age*, Cambridge University Press — OSI vs TCP/IPの歴史的再評価
- RFC 7282 (2014) "On Consensus and Humming in the IETF"
- NTIA / ICANN IANA Stewardship Transition 公式ドキュメント (2016)
- Access Now #KeepItOn annual reports (2024, 2025)
- ICANN "What Does ICANN Do?" 公式FAQ
- IANA Root Servers公式, Root Server Technical Operations Association
- Charles Herzfeld (ARPA Director 1965-67) 引用: Internet Society / ARPANET Wikipedia
- TeleGeography Submarine Cable Map(所有者データベース)

---

## 備考: 台本で使う際の注意

- 「核戦争で作った説は嘘」はシンプルに言い切れるが、**"ただしBaran研究は核戦争文脈で、後にARPANET設計者が参照した"**の補足を入れないと今度は別方向に誤解が生じる
- 「ICANNは管理しない」は否定形が多いので、**"ICANNが調整するのはDNS/IP識別子の割当"**と肯定形で言い換えて説明する
- ロシア・中国・イランの事例は[feedback_slide_critique_tone.md]の方針に沿って**中立観察**で扱う(批判調ではなく"こういう運用がある"の提示)
