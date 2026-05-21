# research_1b.md — 反論・例外・通説への異議（VPN広告が多い理由）

**担当サブステップ**: 1b（批判的視点・通説検証）
**作成日**: 2026-04-22
**凡例**: 🟢=一次情報/主要メディア複数一致、🟡=個人/業界メディア単独だが検証可能、🔴=解釈が分かれる/主張ベース

## ファクト表

| # | ファクト | 信頼度 | 出典URL | 備考 |
|---|---------|--------|---------|------|
| 1 | Tom Scottが2019年に「この動画は███VPNがスポンサーです」という動画を公開し、VPN広告で使われる "military-grade encryption" "hackers can steal your data on public WiFi" 等の典型文句を技術的に誤り・誇大と名指しで批判した。公衆Wi-Fiのパスワード盗聴はSSL/TLSの普及で既に対策済みだと指摘。 | 🟢 | https://www.youtube.com/watch?v=WVDQEoe6ZWY | HN討議 https://news.ycombinator.com/item?id=21378945 でも内容が確認されている。通説への異議①。 |
| 2 | "Military-grade encryption" は軍が定義した規格ではなくマーケティング造語で、実体はAES-256。AES-256はHTTPSや銀行・ブラウザ含め消費者向けにも既に広く使われている「標準」でしかなく、VPN固有の強みではない。 | 🟢 | https://www.techradar.com/vpn/theres-no-such-thing-as-military-grade-encryption | 併読: https://www.howtogeek.com/445096/what-does-military-grade-encryption-mean/ 通説への異議②。 |
| 3 | Sophosの主任研究員Chester Wisniewskiは「HTTPSの普及で公衆Wi-Fi由来の多くのリスクは既に薄れた」「一般消費者にとってVPNは不要で使いづらい」と明言。Consumer Reportsが掲載。 | 🟢 | https://www.consumerreports.org/electronics/digital-security/is-using-public-wifi-still-a-bad-idea-a8476049516/ | 通説への異議③。VPN広告の主要恐怖訴求（公衆Wi-Fi）の前提を崩す。 |
| 4 | 暗号研究者Eric Rescorla（Mozilla CTO, TLS 1.3著者）運営のeducatedguesswork.orgでも「TLS普及後の公衆Wi-Fiの現実的リスクは限定的で、VPNの価値は位置偽装・検閲回避であってセキュリティではない」旨を技術的に分析。 | 🟢 | https://educatedguesswork.org/posts/public-wifi/ | 通説への異議④。学術寄り一次情報。 |
| 5 | Kape Technologies（旧社名Crossrider）はExpressVPN（約$936M, 2021）、CyberGhost（$10M, 2017）、Private Internet Access（$127M, 2019）、ZenMate、Inteogを所有。いずれもVPN広告市場の主要プレイヤー。 | 🟢 | https://cyberinsider.com/kape-technologies-owns-expressvpn-cyberghost-pia-zenmate-vpn-review-sites/ | 併読: https://en.wikipedia.org/wiki/Kape_Technologies |
| 6 | Crossrider時代（~2018年の改名前）は、ブラウザ拡張にコードを注入するSDKとして悪用され、Malwarebytesなどがマルウェア/アドウェア分類していた。Kapeへの改名はこの経緯を薄めるリブランディングと複数メディアが指摘。 | 🟢 | https://en.wikipedia.org/wiki/Kape_Technologies | 併読: https://windscribe.com/blog/what-is-kape-technologies/ |
| 7 | Kapeは2021年にWebselenese（vpnMentor, Wizcaseの親会社）を買収。以降これらの「独立系VPNレビューサイト」のトップ3は全てKape傘下VPN（ExpressVPN, CyberGhost, PIA）に並び替えられた。買収前はNordVPN・Surfsharkが上位にいた。 | 🟢 | https://cyberinsider.com/vpn-review-websites-owned-by-vpns/ | 併読: https://pxlnv.com/linklog/vpn-review-sites/ 通説への異議⑤（「レビューサイトの比較記事は信用できる」）。 |
| 8 | vpnMentor・Wizcaseのページ本文にKape所有である旨の明記はなく、低コントラストの灰色小文字で目立たない位置に開示のみ。利益相反の通常基準（FTC Endorsement Guides）を満たしているかは疑問視されている。 | 🟡 | https://pxlnv.com/linklog/vpn-review-sites/ | 通説への異議⑥。 |
| 9 | PureVPNは「ノーログ」を謳いながら、2017年FBIのサイバーストーカーRyan Lin事件で、IPアドレス・接続時刻のログを提出していたことが法廷文書で発覚。「no-logs」主張が事後検証で覆った代表例。 | 🟢 | https://torrentfreak.com/purevpn-explains-how-it-helped-the-fbi-catch-a-cyberstalker-171016/ | 併読: https://www.vyprvpn.com/blog/post/purevpn-no-log-claims-false |
| 10 | 技術的に「VPNでプライバシーが守られる」は不正確で、通信の可視範囲がISPからVPN事業者に移るだけ。EFFのSurveillance Self-Defenseも、VPN選定の本質は「誰を信用するか」であって暗号技術ではないと明記。 | 🟢 | https://ssd.eff.org/module/choosing-vpn-thats-right-you | 通説への異議⑦。VPN広告が最も強調する「プライバシー保護」の意味の書き換え。 |
| 11 | Wolfgang's Channel（GitHub: notthebee、Linux/自宅サーバ系の技術YouTuber）の動画「Stop using VPNs for privacy.」は、商用VPNの謳い文句を「bait-and-switch」と批判し、VPNはプライバシーツールではなく単なるネットワークツールだと主張。自作VPN(Wireguard)の手順も公開。 | 🟢 | https://www.youtube.com/watch?v=FMScV1Mkaok | 併読: https://notthebe.ee/ |
| 12 | Linus Tech Tipsは一時期VPN案件を停止していたが、2024年5月「Why I'll be Taking VPN Sponsorships Again… and Why I Stopped」で再開を発表。停止理由として「VPN業界の広告の誇大表現」を挙げている点は、当事者による業界批判として示唆的。 | 🟢 | https://linustechtips.com/topic/1571713-why-i%E2%80%99ll-be-taking-vpn-sponsorships-again%E2%80%A6-and-why-i-stopped/ | 併読: https://x.com/LinusTech/status/1795138627095167120 |
| 13 | NordVPN/ExpressVPNのスポンサー読み上げは"Staying safe online is an ever growing difficulty and you could be exploited by hackers..." という同一テンプレートが大量のYouTube動画で使い回され、ネットミーム化（copypasta化）している。YouTuber側が中身を理解せずに読み上げている疑いが強い。 | 🟡 | https://www.twitchquotes.com/copypastas/4394 | 併読: https://copypastatext.com/nordvpn/ 通説への異議⑧（「技術系YouTuberが推してるから安心」）。 |
| 14 | Consumer Reports 2021年の大規模検証では、上位はMullvad, IVPN, Mozilla VPN（バックエンドはMullvad）など**広告予算をほぼ持たない**事業者。逆にTV・YouTubeで大量広告を打つExpressVPN/NordVPN等はプライバシー運用評価で上位に入らなかった。 | 🟢 | https://www.consumerreports.org/electronics-computers/vpn-services/mullvad-ivpn-mozilla-vpn-top-consumer-reports-vpn-testing-a9588707317/ | 通説への異議⑨（「有名＝良い」）。広告量と品質が逆相関気味であることの根拠。 |
| 15 | Mozilla VPN自体もIPアドレスを90日保持する運用で、「プライバシー特化」を標榜する事業者でも完全なゼロログではない。ノーログ主張の実態の検証不能性を示す例。 | 🟡 | https://www.cloudwards.net/mozilla-vpn-review/ | 一次ソースはMozillaのプライバシー通知だが、運用の指摘はレビュー側が提示。 |
| 16 | FTCは2021-2022年にかけてダークパターン（恐怖訴求・強制的勧誘・解約困難設計）の規制を強化し、2022年9月にレポート発行。VPNの「今守らないと危険」型広告はこの規制文脈と整合する典型ケースに当てはまる可能性が指摘されている。 | 🟡 | https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers | 一次資料: https://www.ftc.gov/system/files/ftc_gov/pdf/P214800+Dark+Patterns+Report+9.14.2022+-+FINAL.pdf |
| 17 | IVPN（スイス系の老舗）自身が公式ブログで「world's fastest / military-grade / 100% anonymous」など業界全体の広告表現を名指しで「誤解を招く」と批判。同業他社からの自己批判として希少。 | 🟢 | https://www.ivpn.net/blog/misleading-promises-of-the-worlds-fastest-anonymous-military-grade-vpns/ | 通説への異議⑩。 |

## 通説への異議（最低5件の要件チェック）

本表で明示的に「通説への異議」と記した項目: ①Tom Scott動画（#1）、②military-grade encryption（#2）、③公衆Wi-Fiリスク（#3）、④TLS後の現実的リスク（#4）、⑤レビューサイト独立性（#7）、⑥利益相反開示の不十分さ（#8）、⑦VPN=プライバシー保護の誤り（#10）、⑧有名YouTuber推奨＝安心（#13）、⑨有名VPN＝良質（#14）、⑩業界内部からの自己批判（#17） = **計10件**（要件5件を満たす）。

## 脚本化ヒント（1b担当者メモ）

- 「military-grade encryption = ただのAES-256 = あなたのLINEやAmazonも既に使ってる」というネタは、視聴者の日常実感に接続しやすく、共感×知的好奇心のトーンに合う。
- 「レビューサイトのトップ3が実は同じ会社」はサスペンス的カットで見せやすい。Kape傘下マップを図解化推奨。
- 「VPNを使うとプライバシーが守られる」ではなく「見てる人がISPからVPN会社に切り替わる」と言い換える比喩（大家→別の大家に引っ越すだけ）は理解が容易。
- Tom Scott動画の「本当の広告」は海外では広く知られているが日本では未浸透なので、"ある英国系YouTuberが..."形式で紹介するとフック強。
- #14のConsumer Reports結果（広告しない会社ほど評価が高い逆相関）は、「なぜ広告がやたら多いのか」という本企画のコア疑問への反語的回答として締めに使える。
