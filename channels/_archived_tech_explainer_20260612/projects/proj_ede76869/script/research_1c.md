# research_1c — インターネットは誰が作って誰が管理しているのか

視点1c: 歴史的経緯・設計思想・専門家コンセンサス・日常生活への接続

初心者視聴者が「なぜインターネットは今の形なのか」を腑に落とすための背景ファクト集。
設計思想の原典、民営化の歴史、専門家の警鐘、そして日常の具体（URLを打つ・Netflix視聴・Wi-Fi）と地続きにできる接点を優先した。

---

## ファクト表

| # | ファクト／思想 | 信頼度 | 出典 | 日常接続の切り口 |
|---|---|---|---|---|
| 1 | **End-to-end原則 (1984)** — Saltzer, Reed, Clark の論文 "End-to-End Arguments in System Design" (ACM TOCS, Vol.2 No.4, pp.277-288, 1984) で定式化。ネットワークの中身は単純にして、賢さ（信頼性チェック、暗号化、再送制御など）は端末側で実装せよ、という設計原則。この1本が「土管は馬鹿で、端末が賢い」現在の形を決めた | 高（一次論文） | [Saltzer-Reed-Clark 原論文 (MIT)](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf) / [ACM TOCS](https://dl.acm.org/doi/10.1145/357401.357402) | 「電話は交換機が偉くて端末（黒電話）はバカ。インターネットは逆で、回線は只の土管、賢さは全部スマホ側。だからアプリが勝手に増やせる」 |
| 2 | **Postel's Law / 堅牢性原則** — Jon Postel が RFC 760/761 (1980) および RFC 793 (1981, TCP) で明文化：「送るときは保守的に、受け取るときは寛容に (Be conservative in what you do, be liberal in what you accept)」。互換性を担保し、実装のバラつきを吸収する | 高（一次RFC） | [Wikipedia: Robustness principle](https://en.wikipedia.org/wiki/Robustness_principle) / [ACM Queue: Robustness Principle Reconsidered](https://queue.acm.org/detail.cfm?id=1999945) | 「古いブラウザでもなんとなく表示される／壊れかけのHTMLでも何か出る、あの『なんかつながる感』の正体」 |
| 3 | **Hourglass model（砂時計モデル／narrow waist）** — 上（アプリ）は無限、下（物理層）も無限、その真ん中のくびれにIPが1つだけ。Jon Postel が1970年代末にTCPからIPを分離した際に描いた絵が起源。RFC 3234 (2002) でも言及。IPが動けば上下どちらで新技術が出ても全部つながる | 高（RFC記載・学術合意） | [Wikipedia: Hourglass model](https://en.wikipedia.org/wiki/Hourglass_model) / [Systems Approach: How the Hourglass Won](https://systemsapproach.org/2024/08/19/how-the-hourglass-won/) | 「5G・Wi-Fi・光ファイバ・海底ケーブル、全部下側の違い。LINE・YouTube・Zoom、全部上側の違い。真ん中の"IP"ひとつだけで全部つながる」 |
| 4 | **"Rough consensus and running code"** — David Clark が1992年7月、第24回IETF会合（Cambridge, MA）の基調講演"A Cloudy Crystal Ball: Visions of the Future"で言った一次引用: "We reject: kings, presidents, and voting. We believe in: rough consensus and running code." IETFの意思決定哲学の根幹 | 高（一次スライド現存） | [David Clark 1992 IETF原スライド (MIT CSAIL)](https://groups.csail.mit.edu/ana/People/DDC/future_ietf_92.pdf) / [IEEE Annals of Computing History](https://ieeexplore.ieee.org/document/1677461) | 「法律や多数決じゃなく『だいたい合意＋動くコード』で決まる。だから政府や王様が作ったわけじゃない」 |
| 5 | **ARPANET → NSFNET → 商用化** — ARPANET (1969開始) → NSFNET (1985-1995, 米国科学財団が学術バックボーンとして運営) → **1995年4月30日** にNSFNETバックボーンが退役し、完全に民間ISP (MCI, Sprint, PSINet, ANS 等) に移行。1989に初の商用ISP、1991にNSFが商用利用制限を撤廃。アクセス制限は2年で全廃 | 高（NSF公式） | [NSF: Birth of the Commercial Internet](https://www.nsf.gov/impacts/internet) / [Wikipedia: NSFNET](https://en.wikipedia.org/wiki/National_Science_Foundation_Network) / [Merit Network: Retiring NSFNET](https://www.merit.edu/wp-content/uploads/2024/10/Merit-Network_Retiring-the-NSFNET-Backbone-Service_-Chronicling-the-End-of-an-Era.pdf) | 「インターネットは国が作った→民間に払い下げされた、という歴史。1995年に政府が手を引いたのが境目」 |
| 6 | **Permissionless innovation** — Vint Cerf が"インターネット最大の資産"と繰り返し主張する設計思想。「誰の許可も得ずに新しいプロトコルやサービスを立ち上げて接続できる」性質。Cerfの言葉："if you follow the following rules you can build your own piece of internet and connect to it, and it should work" | 高（本人インタビュー） | [Elon University: Vint Cerf Keynote](https://www.elon.edu/u/imagining/event-coverage/igf-usa/igf-2017/vint-cerf-keynote/) / [Internet Society: Permissionless Innovation](https://www.internetsociety.org/wp-content/uploads/2017/08/huizer-permissionless-innovation-1.pdf) | 「LINE も TikTok も ChatGPT も、総務省やGoogleに申請せずに誰かが勝手に立ち上げて世界に繋いだもの」 |
| 7 | **David Clark "Designing an Internet" (MIT Press, 2018)** — 60年代からの設計者が書いた到達点。"Tussle is inevitable"（利害の綱引きは必ず起きる／設計者は平地を傾けることしかできず、綱引き自体はなくせない）と"minimalism"（余計な機能を入れないほど長生きする）が2本柱。現代の集中化や規制論争を技術設計の延長として分析 | 高（MIT Press学術書） | [MIT Press: Designing an Internet](https://direct.mit.edu/books/book/4216/Designing-an-Internet) / [Internet Governance Project レビュー](https://www.internetgovernance.org/2018/12/05/clarks-designing-an-internet-a-review/) | 「GAFA集中 vs 分散、政府規制 vs 自由、この綱引きは設計段階で予見されてた」 |
| 8 | **Tim Berners-Lee 2024年公開書簡** — Web発明者が「この10年、ウェブは人類を力づけるどころか価値を浸食する側に回った」と明言。プラットフォーム集中とAI革命を名指し。"a sort of wave... maybe backlash against the polarising social media"（分断を煽るSNSへの反発が来る年）を2025年に期待 | 高（本人書簡／Euronews取材） | [Euronews: Tim Berners-Lee hopes for 2025](https://www.euronews.com/next/2024/12/26/world-wide-web-creator-sir-tim-berners-lees-hopes-for-2025-data-rights-and-a-social-media-) / [Solid Project](https://solid.mit.edu/) | 「作った本人が『今のウェブは失敗してる』と言っている。Instagramに疲れてるあなたの感覚は正しい」 |
| 9 | **Jonathan Zittrain "generativity"** — 「誰でも無許可で作って追加できる」性質 (generativity) が爆発的イノベーションの源だが、同時に悪用（マルウェア、詐欺）を招き、安全を求める消費者がiPhone的な"tethered appliance"（囲い込み端末）に逃げる。するとインターネットは死ぬ、というジレンマ（2008年著書） | 高（Harvard教授／主要文献） | [Zittrain: The Future of the Internet](https://futureoftheinternet.org/) / [Harvard DASH](https://dash.harvard.edu/entities/publication/73120378-938a-6bd4-e053-0100007fdf3b) | 「App Storeの審査は便利で安全。でもその便利さと引き換えに『誰でも勝手に作れた時代』は終わりつつある」 |
| 10 | **DNSの13ルートサーバと解決フロー** — URLを打つと①ブラウザ／OSキャッシュ → ②リカーシブリゾルバ (ISPやGoogle 8.8.8.8) → ③13台のルートサーバ (A〜M、実体はAnycastで世界数百拠点に複製) → ④TLDサーバ (.jp, .com) → ⑤権威サーバ、と辿る。通常20〜120ms | 高（Cloudflare公式・業界標準） | [Cloudflare: What is DNS](https://www.cloudflare.com/learning/dns/what-is-dns/) / [Cloudflare: DNS server types](https://www.cloudflare.com/learning/dns/dns-server-types/) | 「youtube.com と打った瞬間、5段階の中継を0.05秒でやって帰ってくる。誰も統括してないのに毎回動く」 |
| 11 | **海底ケーブルが国際通信の約99%** — TeleGeography 2026年版マップで世界 **694本**の海底ケーブル、総延長 **150万km超**、陸揚げ局1,893ヶ所。衛星は1%未満。年150〜200件の損傷、8割は漁船の錨や底引き網 | 高（業界標準TeleGeography） | [TeleGeography Submarine Cable Map 2026](https://submarine-cable-map-2026.telegeography.com/) / [TeleGeography 2023 Mythbusting: 99% claim](https://resources.telegeography.com/2023-mythbusting-part-3) | 「『雲（クラウド）』に保存してるNetflixの映画、実体は太平洋の海底に横たわるガラス繊維を光が走ってる。宇宙じゃなく海の底」 |
| 12 | **Netflix Open Connect** — 世界トラフィックの **約95%** をISP内に物理設置した専用キャッシュ装置 (OCA) で配信。ISPには無償提供。米Netflixデータセンターから日本まで映像が飛んでくるのではなく、近所のISP機器に予めコピーされている | 高（Netflix公式） | [Netflix Open Connect 公式](https://openconnect.netflix.com/en/) / [About Netflix: How Netflix Works With ISPs](http://about.netflix.com/en/news/how-netflix-works-with-isps-around-the-globe-to-deliver-a-great-viewing-experience) | 「あなたが観てる『イカゲーム』、韓国や米国から毎回ストリーミングされてない。NTTやKDDIのビルの中にNetflixが置いた箱から出てる」 |
| 13 | **CDN大手の規模感** — Akamai: CDN市場シェア約30〜40%で首位、300超のPoP。Cloudflare: 全ウェブサイトの **20.4%** を保護、ネットワーク容量405 Tbps (2025)。世界のウェブは実質この数社のエッジを通る | 中〜高（業界調査） | [CloudOptimo: CDN Comparison 2025](https://www.cloudoptimo.com/blog/cloudfront-vs-cloudflare-vs-akamai-choosing-the-right-cdn-in-2025/) / [BlazingCDN: CDN dominance 2025](https://blog.blazingcdn.com/en-us/who-dominates-cdn-in-2025-top-providers-ranked-by-traffic-reach) | 「ニュースサイトもECも、本体サーバにはほぼアクセスしてない。Cloudflareが間に立って答えてる。『誰も管理してない』の裏でCloudflareが半分答えてる」 |
| 14 | **Wi-Fi / 4G / 5G はインターネットではない** — これらは「インターネットへの最後の1kmのアクセス方法 (access network)」。IPが真ん中にあるおかげで、下がWi-Fiでも5Gでも光ファイバでも同じように繋がる。Hourglassの下半分に当たる | 高（標準的技術理解） | [Wikipedia: Hourglass model](https://en.wikipedia.org/wiki/Hourglass_model) / [IETF: Evolution of Layered Protocol Stacks](https://www.ietf.org/ietf-ftp/slides/slides-itatws-the-evolution-of-layered-protocol-stacks-leads-to-an-hourglass-shaped-architecture-00.pdf) | 「『家のWi-Fi』と『スマホの5G』は別のインターネットじゃない。同じインターネットへの違う玄関」 |
| 15 | **ブラウザ戦争 (1995-98)** — 1995年8月9日Netscape IPO上場、同月Microsoft IE 1.0をWindows 95 Plus Packに同梱。Netscape Navigator は1996年に約80%シェア。IE 3.0 (1996年8月) 以降Windowsバンドル戦略で逆転。Webの実装言語（HTML/CSS/JS）の方言と互換性問題はここで生まれた | 高（Wikipedia／業界史） | [Wikipedia: Browser wars](https://en.wikipedia.org/wiki/Browser_wars) / [History of the Web: Browser Wars](https://thehistoryoftheweb.com/browser-wars/) | 「今ブラウザでサイトが崩れることがあるのは、90年代後半にNetscapeとIEが喧嘩して独自仕様を増やした残滓」 |
| 16 | **国単位の遮断は何度も起きているが、グローバル遮断は一度もない** — Access Now記録で2024年 **304件・54カ国**、2025年 **313件・52カ国** の遮断が実行された。2025年は全世界46.2億人（人口の半数超）が何らかの遮断の影響下。一方で「世界全体を止める」事象は設計上も政治的にも発生していない | 高（Access Now年次レポート） | [Access Now: Shutdowns 2025](https://www.accessnow.org/internet-shutdowns-2025/) / [Internet Society Pulse](https://pulse.internetsociety.org/en/shutdowns/) | 「中国・イラン・ミャンマーは国内を止められる。でも『世界のインターネット』の電源スイッチはどこにも無い」 |
| 17 | **IETFのカルチャー** — Jon Postel は常にサンダル・ひげ・長髪。"really open participation"と"getting something that works implemented, rather than just having an academic design"が文化の中核。ドレスコードなし、プレナリで議長がハミング（humming）で合意を取る手法がRFC 7282 (2014) に公式文書化 | 高（Internet Society／RFC） | [Internet Society: Ten Year Tribute to Jon Postel](https://www.internetsociety.org/grants-and-awards/postel-service-award/ten-year-tribute-jon-postel/) / [RFC 7282: On Consensus and Humming](https://datatracker.ietf.org/doc/html/rfc7282) | 「ISO/国連みたいなスーツの会議室で決められたんじゃない。Tシャツ・サンダル・挙手じゃなく唸り声で合意する学会から生まれた」 |
| 18 | **層構造 (Layered architecture)** — 物理層/データリンク/ネットワーク(IP)/トランスポート(TCP, UDP)/アプリ(HTTP等)の階層。各層は下の詳細を知らずに働ける。OSI 7層モデル (1979頃Aschenbrenner提唱) とTCP/IP 4層が並存。この分離のおかげで「銅線→光ファイバ→無線」の置換がアプリを壊さず進められた | 高（標準的技術教育） | [IETF: draft-rosenberg-internet-waist-hourglass](https://www.ietf.org/archive/id/draft-rosenberg-internet-waist-hourglass-00.html) / [Berkeley CS262 lecture](https://people.eecs.berkeley.edu/~kubitron/cs262/lectures/lec02-E2E-SystemR.pdf) | 「電話線→光→Wi-Fi→5G、下が次々置き換わってもLINEは動き続けた。層が分かれてるから」 |

---

## 補足メモ（台本に使えそうな物語素材）

### 物語素材A: 「誰が作ったか」の答えの構造
- **標準は分散**: IETF, W3C, ICANN, IEEE, ITU それぞれ別の国際NPO/非政府組織
- **実装は多様**: Linux, Windows, macOS, iOS, Android のTCP/IPスタック、それぞれ別チーム
- **運用は独立**: 世界数万のISP、数百のIX (Internet Exchange)、数千のCDN PoPが独立経営
- **誰も全体を握っていないが、全員がIPとBGPとDNSという"薄い共通ルール"に従っている**

### 物語素材B: 「URLを打つ→画面に出る」の1秒間にある協業
1. ブラウザがURLをパース
2. DNSで名前→IP（13ルートサーバ経由、実体はAnycast）
3. TCP 3ウェイハンドシェイク
4. TLS暗号化ハンドシェイク
5. HTTPリクエスト送信
6. CDN (Cloudflare/Akamai/Netflix OCA) が応答
7. ISP→バックボーン→海底ケーブル→ISP→Wi-Fi
→ これだけの組織（少なくとも5社以上）が"誰の指揮もなく"連携する。この連携を可能にしているのがファクト1〜4（End-to-End, Postel, Hourglass, Rough consensus）

### 物語素材C: 「止められるか」思考実験
- 物理層: 海底ケーブル全切断は1年以上・数百億ドル規模の作戦、かつ衛星経路が残る
- 論理層: ルートDNSを改ざんしても、世界中のキャッシュとAnycastコピー（13名目／実体数百）のため伝播に時間、かつ13運営者は米・欧・日本の別組織
- 政治層: 国単位の遮断は頻発（ファクト16）だが、国境を越えた強制停止権限を持つ主体が存在しない

### ハッとする「日常接続」トップ3（台本のフックに）
1. **「Netflixは宇宙じゃなく海の底から来る」**（ファクト11+12） — クラウドというイメージを物理に引き戻す一撃
2. **「ブラウザにURLを打つと、0.05秒で5社が無言で連携する」**（ファクト10+物語素材B） — 誰も管理していないのに毎回動く不思議さ
3. **「作った本人（Berners-Lee）が『今のウェブは失敗してる』と言っている」**（ファクト8） — SNS疲れの視聴者の肌感覚を専門家が裏書き

---
