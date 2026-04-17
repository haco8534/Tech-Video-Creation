# VPNリサーチ総括

> 動画テーマ：「VPNの広告ってなんでこんなに多いの？」
> 調査日：2026-04-15
> 詳細は各ファイル参照：[research_2a.md](research_2a.md) / [research_2b.md](research_2b.md) / [research_2c.md](research_2c.md)

---

## 動画の核心ロジック（3行まとめ）

1. **VPNはSaaSの中でもLTVが高く・粗利が太い事業**なので、インフルエンサーに高いアフィリエイト報酬を払っても採算が取れる
2. **恐怖×わかりやすい価値提案（"Wi-Fiが危ない"）** がインフルエンサー発信と相性がよく、30秒のスポンサー読みで伝えやすい
3. **VPNが実際に守れる範囲は広告より狭い**。HTTPS普及でリスクは下がっており、ブラウザフィンガープリントやCookieは防げない

---

## エリアA：基本情報とビジネスモデル（主要ファクト抜粋）

- **市場規模**：2023年時点で約500億ドル、2030年に約1,377億ドルへ（ResearchAndMarkets/BusinessWire） 🟢高
- **ユーザー数**：2024年時点で世界15億人。インターネットユーザーの23.1%（4人に1人）が使用 🟢高
- **業界寡占化**：NordVPN・Surfshark・Atlas VPNがNord Securityに。ExpressVPN・PIA・CyberGhostがKape Technologies傘下 🟢高
- **合併**：NordとSurfsharkは2022年2月合併。持株会社「Cyberspace」（オランダ）設立 🟢高
- **アフィリエイト報酬**：NordVPNは1ヶ月プランの売上100%・年間プランの40%・更新時30%というリカーリング型 🟢高
- **利益構造**：スケールすれば粗利益率70〜90%超。限界費用ゼロのSaaSモデルが広告費を投下しやすい体質を作る 🟡中

---

## エリアB：誇張・誤解・論争（主要ファクト抜粋）

- **NordVPN英国行政指導（2019年）**：「公衆Wi-Fiは危険」というTV広告がASAに根拠なしと判断され行政指導 🟢高
- **Consumer Reportsテスト（2021年）**：テストした16本中12本（75%）が誇張またはミスリーディングなクレームをしていた 🟢高
- **守れないもの（列挙）**：フィッシング・マルウェア・Cookieトラッキング・ブラウザフィンガープリント・ログイン済みアカウントの特定 🟢高
- **HTTPS普及率**：上位10万サイトの92.6%がHTTPS対応（2026年時点）。公衆Wi-Fiの盗聴リスクは大幅に低下済み 🟢高
- **ログスキャンダル**：IPVanish（2016年・DHS）、PureVPN（2017年・FBI）がそれぞれno-logポリシーに反してログを提供 🟢高
- **Hola VPN事件（2015年）**：無料VPN最大手が5,000万ユーザーの帯域幅をボットネットとして販売 🟢高
- **無料VPNの38%にマルウェア**：2016年CSIRO研究（Android VPNアプリ283本の調査） 🟢高

---

## エリアC：歴史・背景・代替ツール（主要ファクト抜粋）

- **VPNの起源（1996年）**：PPTPをMicrosoftが策定。企業の安全なリモートアクセス用ツールとして登場 🟢高
- **進化の流れ**：PPTP(1996)→L2TP(1999)→OpenVPN(2001)→WireGuard(2019)。WireGuardはわずか4,000行で現代の標準 🟢高
- **スノーデン事件（2013年）**：NSAの大規模監視が発覚し、プライバシーへの世界的関心が爆発的に拡大。VPN需要が急増 🟢高
- **中国グレートファイアウォール**：Google・YouTube等をブロック。2017年に無許可VPN違法化。規制強化のたびにVPN需要が増す 🟢高
- **GDPR（2018年施行）**：EU発のプライバシー規制が世界に波及。プライバシー意識の底上げがVPN市場を後押し 🟢高
- **代替ツール**：iCloud Private Relay（Safari限定・Apple生態系内）、Cloudflare WARP（速度重視・匿名性は限定的）、Tor（高匿名性だが低速） 🟢高

---

## 動画構成へのアイデアメモ

### 面白い切り口

| テーマ | 要点 |
|---|---|
| 「なぜVPNはこんなに広告できるのか」 | アフィリエイト100%報酬の仕組み＋高LTV＋低限界費用の三重奏 |
| 「NordVPNの親会社を知ってる？」 | 一見バラバラなVPNブランドが実は少数の持株会社に集まっている業界の秘密 |
| 「VPNが守れないもの」 | HTTPS普及・フィンガープリント・Cookieを図解。「完全な保護ではない」事実を中立的に伝える |
| 「公衆Wi-Fiは本当に危ない？」 | ASAのNordVPN行政指導を起点に、現代の「HTTPSが守ってくれる世界」を説明 |
| 「ログを渡されたVPN」 | IPVanish・PureVPN事件でno-logポリシーの実態を問う |
| 「Hola VPNのゾッとする話」 | 無料VPNのビジネスモデルの暗部。ユーザーがボットネットの一部になっていた |

### 注意点（動画制作時）

- 「VPNは全部詐欺」とは言わない方向で。有用なケース（中国・ロシアからのアクセス、P2P利用時など）は正直に認める
- 数字は市場調査会社によって大きく異なるため「数百億ドル規模」程度の言い方が安全
- スキャンダルを紹介する際は、その後の改善（NordVPNの第三者監査導入など）も添える
- iCloud Private Relay・Cloudflare WARPの紹介は「VPNの代替になるか」という問いかけとして機能させる

---

## 参照ソース一覧

### エリアA
- [BusinessWire - ResearchAndMarkets VPN市場レポート2024](https://www.businesswire.com/news/home/20240822995794/en/)
- [Statista - 国別VPN利用率](https://www.statista.com/statistics/1382869/use-of-virtual-private-networks-vpn-by-country/)
- [Cloudwards - NordVPN/Surfshark合併解説](https://www.cloudwards.net/nordvpn-and-surfshark-merger/)
- [Tom's Guide - Kape TechnologiesによるExpressVPN買収](https://www.tomsguide.com/news/kape-technologies-buys-expressvpn-for-almost-dollar1-billion)
- [Creator Hero - NordVPNアフィリエイトプログラム詳細](https://www.creator-hero.com/blog/nordvpn-affiliate-program-in-depth-review-pros-and-cons)
- [Creator Hero - Surfsharkアフィリエイトプログラム詳細](https://www.creator-hero.com/blog/surfshark-affiliate-program-in-depth-review-pros-and-cons)
- [WireGuard公式](https://www.wireguard.com/)
- [Palo Alto Networks - VPNプロトコル比較](https://www.paloaltonetworks.com/cyberpedia/wireguard-vs-openvpn)

### エリアB
- [The Register - NordVPN ASA行政指導（2019年）](https://www.theregister.com/2019/05/01/nordvpn_tv_ad_rapped_advertising_standards_authority/)
- [Consumer Reports - VPNテスト（誇張クレーム）](https://www.consumerreports.org/vpn-services/vpn-testing-poor-privacy-security-hyperbolic-claims-a1103787639/)
- [W3Techs - HTTPS普及率統計](https://w3techs.com/technologies/details/sc-letsencrypt)
- [Let's Encrypt Stats](https://letsencrypt.org/stats/)
- [CyberInsider - IPVanishログ提供事件](https://cyberinsider.com/ipvanish-provides-logs-to-authorities/)
- [CyberInsider - PureVPNログ提供事件](https://cyberinsider.com/vpn-logs-lies/)
- [TechRadar - NordVPNサーバー侵害](https://www.techradar.com/news/whats-the-truth-about-the-nordvpn-breach-heres-what-we-now-know)
- [PCWorld - Hola VPNボットネット事件](https://www.pcworld.com/article/427726/ultra-popular-hola-vpn-extension-sold-your-bandwidth-for-use-in-a-botnet-attack.html)
- [CSIRO論文 - Android VPNアプリ調査（2016年）](https://research.csiro.au/isp/wp-content/uploads/sites/106/2016/08/paper-1.pdf)
- [Engadget - YouTuberのVPN販売とセキュリティ問題](https://www.engadget.com/youtube-influencer-selling-vpns-security-problems-153046206.html)
- [ACM DL - Security Knight in Shining Armor (CHI 2025)](https://dl.acm.org/doi/10.1145/3706598.3713980)

### エリアC
- [ExpressVPN - VPN歴史](https://www.expressvpn.com/blog/vpn-history/)
- [WireGuard Wikipedia](https://en.wikipedia.org/wiki/WireGuard)
- [EFF - スノーデン10年後（2023年）](https://www.eff.org/deeplinks/2023/05/10-years-after-snowden-some-things-are-better-some-were-still-fighting)
- [Pew Research Center - スノーデン後のプライバシー意識](https://www.pewresearch.org/short-reads/2016/09/21/the-state-of-privacy-in-america/)
- [Great Firewall Wikipedia](https://en.wikipedia.org/wiki/Great_Firewall)
- [USENIX Security 2023 - GFWの暗号化トラフィック検知](https://gfw.report/publications/usenixsecurity23/en/)
- [VOA News - 中国VPN使用倍増](https://www.voanews.com/a/china-s-vpn-usage-nearly-doubles-amid-internet-censorship/7488465.html)
- [GDPR Wikipedia](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)
- [Beebom - iCloud Private Relay vs VPN](https://beebom.com/what-is-apple-icloud-private-relay/)
- [Cloudflare Blog - iCloud Private Relay解説](https://blog.cloudflare.com/icloud-private-relay/)
