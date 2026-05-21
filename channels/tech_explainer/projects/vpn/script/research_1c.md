# research_1c.md — VPN広告がやたら多い理由（背景・深掘り）

担当: サブステップ1c
作成日: 2026-04-22
軸: アフィリ経済圏 / 業界寡占（M&A）/ スポンサー同質性 / 法人起源→消費者化 / 日本事情 / 業界ウォッチャー

---

## ファクト表

| # | ファクト | 信頼度 | 出典URL | 備考 |
|---|---|---|---|---|
| 1 | NordVPNのアフィリは「1ヶ月プラン新規成約100% CPA」＋「全プラン更新の30%リカーリング（永続レベニューシェア）」。Cookie有効期間30日。業界内でも最高水準の還元設計。 | 🟢 | https://nordvpn.com/affiliate/ | LTVが2〜3年続くサブスクなので「1件取って終わり」でなく「継続報酬」になる点が他ジャンルと決定的に違う |
| 2 | ExpressVPNは固定額CPA型：1ヶ月$13 / 6ヶ月$22 / 12ヶ月$36。1成約あたり最大$36は他SaaS系と比べても異例に高い。 | 🟢 | https://www.expressvpn.com/influencers | 固定額は訴求コピーを作りやすく、クリエイター側も「1人で$36」と計算しやすい→配信者が飛びつく要因 |
| 3 | YouTubeクリエイターによるVPNブランド言及は累計123,172件。VPN関連コンテンツの約90%がYouTube動画形態に集中している。 | 🟡 | https://sponsorship.so/top-sponsors/VPN | 「ジャンル飽和」というより「VPN広告＝ほぼYouTube」という構造。他媒体はシェアが小さい |
| 4 | Surfshark単体で2019年8月以降、2,300本超のYouTubeスポンサー動画、4,000超のインテグレーションを実行。Mr.Beast / Kurzgesagt / Philip DeFranco等メガチャンネルを抱え込んでいる。 | 🟢 | https://surfshark.com/youtube-creators | スポンサー枠の「独占契約」ではなくローテで複数VPNが回る→視聴者が「どの動画でもVPN広告」と感じる構造要因 |
| 5 | Kape Technologies（旧Crossrider、元アドウェア・ブラウザSDK企業）のVPN統合：CyberGhost(2017, €9.1M) → ZenMate(2018, €4.8M) → Private Internet Access(2019, 約$127M) → ExpressVPN(2021, $936M)。4大ブランドを単一企業が保有。 | 🟢 | https://en.wikipedia.org/wiki/Kape_Technologies | Kapeは過去にマルウェア配布歴があり、買収後のプライバシーコミュニティの警戒は強い。大株主はイスラエルの実業家Teddy Sagi |
| 6 | Ziff Davis（旧J2 Global）は2019年にStackPath経由でIPVanish / StrongVPN等を取得しNetProtect部門を形成。さらに同社はレビュー媒体のPCMag / Mashableも保有し、自社VPNに「Editor's Choice」を出せる垂直統合が成立している。 | 🟢 | https://vpntesting.com/ownership/ziff-davis/ | 「レビュー媒体と被レビュー商品が同じ親会社」＝SEOランキングとの構造的利益相反。独立系はProton/Mullvad/Windscribeのみ |
| 7 | 主要VPN 11ブランドのうち8ブランドが5つの親会社に集約。業界は「見かけ上多数だが実質寡占」。 | 🟡 | https://www.ipaddressguide.org/the-great-vpn-consolidation-why-your-favorite-privacy-brands-are-disappearing/ | 「違うブランドだから選択肢がある」ように見えて裏は同じ経営。広告予算が重複して積み上がる |
| 8 | IPsecは1995年にIETF IPsec Working Groupが開始。OpenVPNは2001年にJames Yonanが公開、約70,000行のコードでOpenSSL依存。WireGuardは2015〜16年にJason Donenfeldが発表、約4,000行の軽量実装。 | 🟢 | https://en.wikipedia.org/wiki/WireGuard | もともとは企業のリモートアクセス／拠点間通信用プロトコル。「個人が買うもの」ではなかった歴史の裏付け |
| 9 | 現代VPNの起源はPPTP（Microsoft, 1996年頃）、その後IPsec (1995-)、L2TP/IPsec、OpenVPN(2001)、WireGuard(2016)と法人向けに発展。消費者向けパッケージ化が進んだのは2010年代以降。 | 🟢 | https://www.paloaltonetworks.com/cyberpedia/history-of-vpn | 「VPN＝元は企業IT部門のツール」という原点。「広告で買うもの」になったのは歴史的にごく最近 |
| 10 | 2013年6月のSnowden事件（NSA機密文書暴露）を契機に消費者のプライバシー関心が急騰、VPN需要が顕在化。同時期にNetflixの地域制限(ジオブロック)回避需要も拡大し、「プライバシー×ストリーミング解除」という二大訴求軸が固まった。 | 🟢 | https://surfshark.com/blog/vpn-users | 北米Netflix契約者の推定23%がVPNで他地域ライブラリを視聴。プライバシーだけでなく「娯楽ハック」としても普及 |
| 11 | グローバルVPN市場は2023年$50B規模、2030年には$137.7B予測（CAGR 約15-17%）。消費者セグメント単体でも2024年$51.1B、世界VPNユーザー数は約15億人（全インターネットユーザーの約31%）。 | 🟡 | https://www.businesswire.com/news/home/20240822995794/en/ | 巨大市場×高LTVサブスク＝広告予算が青天井。Raid Shadow Legendsのような単発課金型と違い、継続課金で広告費回収可能 |
| 12 | Consumer Reportsの16社VPN監査では「誇大広告」「プライバシー保護の実態と乖離」が広く指摘され、特に「公共Wi-Fiで中間者攻撃」といった典型スクリプトは実際のリスクを誇張しているとされる。ただしevil twin（偽装AP）攻撃自体は実在し、旅行者の約25%が海外公共Wi-Fiで攻撃経験ありとの統計もある。 | 🟢 | https://www.consumerreports.org/vpn-services/vpn-testing-poor-privacy-security-hyperbolic-claims-a1103787639/ | 「完全な嘘ではないが脅威度を盛っている」微妙なライン。空港Wi-Fiシナリオがテンプレ化している構造的理由 |
| 13 | Tom's Guide / TechRadar / Security.org / TheBestVPN など主要「Best VPN」ランキングサイトは購入経由でアフィリ手数料を得ることを明示開示。上位常連のNordVPN / ExpressVPN / Surfsharkがどのサイトでも1-2位を占める傾向。 | 🟢 | https://www.tomsguide.com/best-picks/best-vpn | "Best VPN 2024"的記事の量産とSEO汚染の構造。Google検索上位は実質アフィリ広告 |
| 14 | Consumer Reports Digital Labの独立評価では、プライバシー・セキュリティ上位はMullvad / IVPN / Mozilla VPNの3社。いずれも大手アフィリ経済圏の外、もしくはYouTube広告に出稿していない。 | 🟢 | https://www.consumerreports.org/electronics-computers/vpn-services/mullvad-ivpn-mozilla-vpn-top-consumer-reports-vpn-testing-a9588707317/ | 「広告で見かけるVPN」と「専門家が推すVPN」が真逆の構造。広告量＝品質ではない決定的な証拠 |
| 15 | Techloreは2024年に独自のVPNティアリストを公開し、アフィリを受け取らないコミュニティ駆動のレビューを標榜。Michael Bazzell（元FBIコンピュータ犯罪捜査官）はOpenVPN/WireGuardを自前で建てることを推奨する立場で、商用消費者VPNに懐疑的。 | 🟡 | https://discuss.techlore.tech/t/the-2024-vpn-tier-list-privacy-security-smackdown/6801 | プロ勢／本気のプライバシー層は「消費者VPNではなく自前サーバー or Mullvad等の最小限」という立ち位置 |
| 16 | 中国のグレートファイアウォール（金盾）はYouTube / Google / LINE / X 等を遮断し、日本人駐在員・出張者の間で常設VPNが事実上必須。VPN規制が強化される度に「使えないVPN」が出現するため、最新情報が求められ日本語レビュー記事が量産される。 | 🟡 | https://i-fc.jp/column/china-vpn/ | 中国向け需要は日本語圏での「VPNネット記事」の最大ドライバーの一つ。日本人ユーザーの現実的ユースケース |
| 17 | NordVPNはリトアニア設立（2012年）で日本語UI・日本サーバーを提供するが、日本市場専業VPN（MillenVPN等）に比べ日本語サポート密度は薄い。それでも楽天市場に公式ストアを出店し、日本人向けローカライズは進めている。 | 🟡 | https://en.wikipedia.org/wiki/NordVPN | 「海外発だが日本ユーザーを取りに来ている」大手＝広告出稿先に日本YouTuberを選ぶ合理性がある |
| 18 | VPNが「空港Wi-Fiのハッカー」シナリオを使い続けるのは、視覚的に伝わりやすくスクリプトが短く、全地域の視聴者に「自分ごと」として響くため。実際のリスク（evil twin攻撃、公共Wi-Fiでの情報漏洩）も一定存在するため完全なFUD（不安商法）とは呼びにくく、レギュレーション的にも現実的に使える。 | 🟡 | https://www.mcafee.com/blogs/internet-security/why-public-wi-fi-at-tourist-hotspots-is-a-goldmine-for-hackers/ | 「完全にウソではない／しかし誇張」という広告法務グレー。15秒〜30秒で完結する脚本の制約が同質化を固定化 |

---

## 追加補足メモ（時間があれば動画で触れたい点）

- **なぜRaid Shadow Legendsと並んで"同質化広告"の代表格になったか**: 両者とも「1件あたり高単価CPA」「短尺でテンプレ化しやすい」「ジャンル問わず全視聴者にターゲットが広い」「クリエイター側の納品ハードルが低い（提供素材そのまま）」という4条件を満たす。VPNはここに「サブスクのリカーリング」という追加燃料が乗る。
- **Kapeの前身Crossrider問題**: アドウェア／ブラウザインジェクション配布歴がある会社が、今や「プライバシーVPN」を複数保有している矛盾。プライバシーコミュニティ(reddit r/privacy, Privacy Guides)での警戒が根強い。
- **ExpressVPN元CIO事件(2021)**: Daniel Gerickeが元UAE諜報機関関連で起訴され、Kape買収直前という時期的な重なりがあった（別途ウォッチャー記事参照の価値あり、今回未検証）。
- **日本独自ユースケース**: (a) 海外出張者が日本のTVerやABEMAを見る需要、(b) 中国駐在員の金盾回避、(c) ゲーム地域別価格差利用。広告文脈で日本YouTuberが「海外ドラマ見れる」訴求をしがちな背景。

## 検索クエリ履歴（重複回避確認）

1. VPN affiliate program commission structure NordVPN ExpressVPN high payout
2. Kape Technologies ExpressVPN acquisition history CyberGhost Private Internet Access
3. YouTube VPN sponsorship saturation why so many creators Raid Shadow Legends comparison
4. VPN history IPsec 1995 OpenVPN 2001 WireGuard 2015 corporate remote access origin
5. consumer VPN market growth Snowden Netflix geoblock 2013 2015
6. "best VPN 2024" ranking article SEO affiliate content farm review site problem
7. VPN advertising fear marketing airport public WiFi hacker misleading claims
8. Ziff Davis IPVanish Aura NetProtect VPN conglomerate ownership consolidation
9. NordVPN 日本語 サービス 上陸 年 日本市場 進出
10. VPN recommendation Mozilla Wirecutter Michael Bazzell Techlore privacy community
11. VPN market size 2023 2024 billion consumer segment growth rate statistics
12. 中国 VPN 規制 日本人 越境 視聴 ジオブロック 需要
13. Surfshark YouTube sponsor Japanese content creator 日本 スポンサー

計13クエリ（要件の最低5回＋重複禁止を満たす）
