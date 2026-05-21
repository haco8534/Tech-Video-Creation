# リサーチ 1a: 公式データ・基本定義・代表研究

テーマ: インターネットは誰が作って誰が管理しているのか
視点: 公式文書・一次資料に基づく基本定義、現在の管理主体、物理層、標準化プロセス、数字のファクト

| # | ファクト | 信頼度 | 出典URL | 備考 |
|---|---|---|---|---|
| 1 | ARPANET の最初のホスト間メッセージは 1969年10月29日 22:30 PT、UCLA（Kleinrockラボ、Charley Kline）から SRI（Stanford Research Institute）へ送信された。送ろうとした単語は "login" だったが、"l" と "o" を送信した時点でシステムがクラッシュ。結果として最初のメッセージは "lo" | 🟢 | https://www.darpa.mil/news/features/arpanet | DARPA公式。ICANN公式ブログでも同内容を確認 https://www.icann.org/en/blogs/details/the-first-message-transmission-29-10-2019-en |
| 2 | ARPANET を発注したのは米国国防高等研究計画局（ARPA、現DARPA）。1968年にネットワーク用ルータ（IMP: Interface Message Processor）の開発を BBN Technologies（Bolt Beranek & Newman）に発注し、1969年稼働 | 🟢 | https://www.darpa.mil/news/features/arpanet | DARPA公式史 |
| 3 | TCP の最初の技術仕様は Vint Cerf・Yogen Dalal・Carl Sunshine による RFC 675 "Specification of Internet Transmission Control Program"（1974年12月） | 🟢 | https://datatracker.ietf.org/doc/html/rfc675 | IETF Datatracker一次資料 |
| 4 | Vint Cerf と Bob Kahn は 1974年5月、IEEE Transactions on Communications に "A Protocol for Packet Network Intercommunication" を発表。TCP/IP の原型 | 🟢 | https://www.internetsociety.org/articles/tcpip-25th-anniversary | Internet Society公式記念記事 |
| 5 | IPv4（RFC 791）と TCP（RFC 793）は 1981年9月に公開され、DARPAインターネットプログラム仕様として標準化。編集者は USC/ISI の Jon Postel | 🟢 | https://www.rfc-editor.org/rfc/rfc791 / https://www.rfc-editor.org/rfc/rfc793 | RFC Editor一次資料 |
| 6 | World Wide Web は 1989年3月、CERN 在籍中の Tim Berners-Lee が最初の提案 "Information Management: A Proposal" を執筆。1990年末に最初のブラウザ WorldWideWeb とHTTPサーバが CERN で稼働、1991年8月に Internet newsgroups で公開告知、1993年4月30日に CERN が WWW のソースコードをロイヤリティフリーで公開 | 🟢 | https://home.cern/science/computing/birth-web/short-history-web | CERN公式 |
| 7 | インターネット（通信基盤）と WWW（その上で動く情報共有システム）は別物。WWW はインターネット上で動く一アプリケーション。同じく電子メールや FTP もインターネット上のアプリケーション | 🟢 | https://home.cern/science/computing/birth-web | CERN公式の定義に基づく |
| 8 | ICANN（Internet Corporation for Assigned Names and Numbers）は米国設立の非営利マルチステークホルダー組織。ドメイン名空間・IPアドレス空間のデータベース調整を担当。「インターネットの運用安定、競争促進、世界コミュニティの広範な代表、ボトムアップのコンセンサスベースの方針策定」が公式原則 | 🟢 | https://www.icann.org/resources/pages/welcome-2012-02-25-en | ICANN公式。※ICANNはドメイン名を「所有」せず、レジストラ認定とポリシー調整を行う |
| 9 | IANA機能（Internet Assigned Numbers Authority）は現在 Public Technical Identifiers（PTI、ICANNのアフィリエイト）が運用。3領域を管理: (1) DNS Root zone・.int・.arpa 等のドメイン名、(2) IP/AS番号の世界プール、(3) プロトコルパラメータ番号 | 🟢 | https://www.iana.org/about | IANA公式 |
| 10 | IETF（Internet Engineering Task Force）は RFC を通じてインターネットプロトコルを標準化。運営哲学は David Clark の "We reject kings, presidents and voting. We believe in rough consensus and running code"（王も大統領も投票も拒否。我々はラフコンセンサスと動くコードを信じる） | 🟢 | https://www.ietf.org/about/participate/tao/ | IETF公式 Tao of IETF（RFC 4677、2024年6月に RFC 9592 で retire されたが哲学は継続） |
| 11 | IAB（Internet Architecture Board）は IETF の委員会であり、かつ Internet Society（ISOC）の諮問機関。IETF Chair と IESG Area Directors の承認、インターネット標準プロセスの監督、RFC Editor の任命、IANA プロトコルパラメータレジストリの管理を行う | 🟢 | https://www.ietf.org/about/groups/iab/ | IETF公式。RFC 2850 が憲章 |
| 12 | 地域インターネットレジストリ（RIR）は5つ: AFRINIC（アフリカ、2005設立、モーリシャス）/ APNIC（アジア太平洋、1993、オーストラリア）/ ARIN（米国・カナダ・カリブ一部、1997、米国）/ LACNIC（中南米・カリブ、2002、ウルグアイ）/ RIPE NCC（欧州・中東・中央アジア一部、1992、オランダ）。5者を調整する NRO（Number Resource Organization）は2003年設立 | 🟢 | https://www.nro.net/about/rirs/ | NRO公式 |
| 13 | DNSルートサーバは 13 の文字識別子 A〜M で構成され、運用組織は 12（Verisign が A と J の両方を運用するため）。運用者は Verisign、USC/ISI、Cogent、Univ. of Maryland、NASA、ISC、US DoD (NIC)、US Army、Netnod、RIPE NCC、ICANN、WIDE Project | 🟢 | https://www.iana.org/domains/root/servers | IANA公式リスト |
| 14 | 13 ルートサーバは論理的な識別子であり、実体は Anycast により世界各地に分散した数百〜千数百のインスタンスで運用される（1サーバ=1マシンではない） | 🟢 | https://www.icann.org/root-server-system-en | ICANN公式 |
| 15 | Verisign は A・J ルートに加え、ICANN との Root Zone Maintainer 契約の下でルートゾーンファイル自体のメンテナンスを担当 | 🟢 | https://www.verisign.com/what-we-do/root-zone-maintainer/ | Verisign公式 |
| 16 | W3C（World Wide Web Consortium）は 1994年に Tim Berners-Lee が設立。HTML、CSS、SVG、XML、WAI（アクセシビリティ）等 Web 標準を策定。現在のタグライン "making the web work — for everyone"。ICANN/IETFとは役割分担: ICANN=識別子資源、IETF=プロトコル（TCP/IP・HTTP等の下位層）、W3C=Web上の標準（HTML等） | 🟢 | https://www.w3.org/mission/ | W3C公式 |
| 17 | Tier 1 ISP の定義: 他のTier 1と settlement-free peering（無償相互接続）で全インターネットへ到達でき、IP トランジット料金を払わないネットワーク。Lumen（旧Level 3）、AT&T、Verizon、Cogent、NTT、Deutsche Telekom、Telia/Arelion、Tata、Orange、GTT などが代表例 | 🟡 | https://en.wikipedia.org/wiki/Tier_1_network | Wikipedia（DrPeering の業界定義を基盤。厳密には公式認定組織は存在しない） |
| 18 | IXP（Internet Exchange Point）は複数の ISP・CDN・クラウド・コンテンツ事業者が物理的に接続してトラフィックを交換するデータセンター型施設。世界最大級は DE-CIX（フランクフルト、2025年12月ピーク 18.73 Tbps）、AMS-IX（アムステルダム、2024年1月ピーク 11.92 Tbps）、LINX（ロンドン）、MSK-IX（モスクワ） | 🟡 | https://en.wikipedia.org/wiki/List_of_Internet_exchange_points_by_size | 各IXP公式発表を集約。1次統計はそれぞれの事業者サイト |
| 19 | TeleGeography の 2024 Submarine Cable Map は世界の海底ケーブル 529 システム・ランディングステーション 1,444 を記載。稼働・計画中ケーブル約 574 本、総延長約 140 万km | 🟡 | https://submarine-cable-map-2024.telegeography.com/ | TeleGeography公式マップ（業界標準の一次ソース） |
| 20 | Google は 2024年時点で世界の海底ケーブルの約 8.5%、約 63,605 マイル（約 10.2万km）に所有/共同所有の形で関与、33 ルートに参画。Meta は 16 既存ケーブルの一部所有者、2024年に総額 100億ドル規模の単独所有ケーブル "Waterworth" を計画。Google・Meta・Microsoft・Amazon の合計で 60 以上のケーブルに関与（2024年末時点） | 🟡 | https://broadbandnow.com/report/google-content-providers-submarine-cable-ownership | BroadbandNow調査（TeleGeography データに基づく）。単独数字は各社非公表 |
| 21 | RFC 標準化プロセスの公式文書は BCP 9（RFC 2026 + RFC 6410）。2011年の RFC 6410 以降、成熟度は 3段階から 2段階に簡素化: Proposed Standard → Internet Standard。承認は IESG（Internet Engineering Steering Group）が行う | 🟢 | https://www.rfc-editor.org/rfc/rfc6410.html | RFC Editor一次資料 |
| 22 | RFC は誰でも Internet-Draft として提出できる（IETF 参加に会費不要、オープン参加）。出版判断は RFC Editor および IESG 等のストリームマネージャ。BCP（Best Current Practice）は運用方針を標準化する別サブシリーズ | 🟢 | https://www.ietf.org/process/rfcs/ | IETF公式 |
| 23 | RFC 総数は 2025年時点で約 9,900超（RFC 1 は 1969年 Steve Crocker 執筆 "Host Software"）。年間発行数は 2023年 173本、2024年 175本、2025年 208本（進行中） | 🟢 | https://www.rfc-editor.org/rfcs-per-year/ | RFC Editor一次資料 |
| 24 | IPv4 アドレス空間は 32ビット、理論上約 42億9,496万（2^32 ≈ 4.3 billion）。IANA は 2011年2月3日、最後の /8 ブロックを 5 RIR に配布し枯渇。APNIC は 2011年4月に、ARIN は 2015年9月に自由プール枯渇 | 🟢 | https://www.internetsociety.org/blog/2014/05/goodbye-ipv4-iana-starts-allocating-final-address-blocks/ | Internet Society公式 |
| 25 | ITU "Measuring Digital Development: Facts and Figures 2024" によれば、2024年時点のインターネット利用者は世界 55億人（世界人口の 68%）、オフライン人口 26億人。高所得国 93% vs 低所得国 27%、都市 83% vs 農村 48%、男性 70% vs 女性 65% と格差が存在 | 🟢 | https://www.itu.int/en/mediacentre/Pages/PR-2024-11-27-facts-and-figures.aspx | ITU公式プレスリリース |
| 26 | ISOC（Internet Society）は1992年1月設立の非営利組織。IETF・IAB の活動に組織的基盤を提供し、インターネット標準プロセスは「Internet Society のアクティビティ」として IAB・IESG が管理する建付け | 🟢 | https://www.iab.org/about/history/ | IAB公式沿革 |
| 27 | インターネットには単一の所有者・管理者が存在しない。標準化（IETF/IAB/W3C）、識別子（ICANN/IANA/RIR）、物理接続（各国ISP/IXP/海底ケーブルコンソーシアム）が分業するマルチステークホルダーモデルで運用される | 🟢 | https://www.internetsociety.org/internet/how-it-works/ | ISOC公式解説 |

---

## サマリー

- 総ファクト数: **27件**
- 🟢 高信頼（公式文書・一次資料）: **23件**
- 🟡 中信頼（業界標準ソース・Wikipedia等の裏取り用）: **4件**（Tier 1 ISP一覧、IXPトラフィック統計、海底ケーブル総延長、コンテンツプロバイダのケーブル所有比率）

🟡 の4件はいずれも「公式認定組織が存在しない概念」（Tier 1）や「各社非公表のため業界調査に依存」（ケーブル所有比率）のため、性質上 🟢 化が難しい項目。業界標準データソース（TeleGeography・DrPeering）を明記している。
