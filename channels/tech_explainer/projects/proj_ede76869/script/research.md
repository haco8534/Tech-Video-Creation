# research.md — 統合キーファクト

テーマ: インターネットは誰が作って誰が管理しているのか

1a/1b/1c の横断統合。重複排除・信頼度再評価・主因と副因の切り分け済み。台本執筆時の一次参照はここ。

---

## A. 起源（誰が作ったか）

| # | ファクト | 信頼度 | 出典 |
|---|---|---|---|
| A-1 | ARPANET 最初のホスト間通信は 1969年10月29日 UCLA→SRI。"login" と送ろうとしてクラッシュ、結果 "lo" が初メッセージ | 🟢 | DARPA公式 |
| A-2 | 発注は米国 ARPA（現 DARPA）、IMP ルータ実装は BBN Technologies、1968年発注・1969年稼働 | 🟢 | DARPA公式 |
| A-3 | TCP の最初の仕様は Vint Cerf・Yogen Dalal・Carl Sunshine による **RFC 675 (1974年12月)** | 🟢 | IETF Datatracker |
| A-4 | IPv4 (RFC 791) と TCP (RFC 793) は 1981年9月に公開。編集者は USC/ISI の Jon Postel | 🟢 | RFC Editor |
| A-5 | World Wide Web は 1989年3月、CERN の Tim Berners-Lee が最初の提案。1993年4月に CERN がソースコードをロイヤリティフリーで公開 | 🟢 | CERN公式 |
| A-6 | **インターネット（TCP/IP 通信基盤）と WWW（その上で動くアプリ）は別物**。メールや FTP も WWW と並ぶアプリの一つ。Berners-Lee が発明したのは後者 | 🟢 | CERN公式 |
| A-7 | **「ARPANET は核戦争で生き残るために作られた」は誤解**。ARPA 長官(1965-67) Charles Herzfeld 自身が否定。真の動機は「地理的に離れた研究者が少数の大型コンピュータを共有したかった」。核耐性の文脈は Paul Baran (RAND, 1964) の別研究に由来する混同 | 🟢 | Herzfeld 証言・Janet Abbate "Inventing the Internet" |
| A-8 | NSFNET (1985-1995) が学術バックボーンを運営。**1995年4月30日にNSFNETが退役**し、完全に民間ISPへ移行。政府の手を離れたのはこの瞬間 | 🟢 | NSF公式 |

---

## B. 管理（誰が管理しているか）

| # | ファクト | 信頼度 | 出典 |
|---|---|---|---|
| B-1 | **ICANN** はドメイン名空間・IPアドレス空間・プロトコル番号の識別子資源を調整。**コンテンツ、ISP、ルーティング、プロトコル仕様、各国法は管理しない** | 🟢 | ICANN公式 |
| B-2 | IANA 機能は ICANN 傘下の PTI が運用。(1) DNSルートゾーン・.int・.arpa、(2) IP/AS番号プール、(3) プロトコルパラメータの3領域 | 🟢 | IANA公式 |
| B-3 | **IETF** はプロトコルを RFC で標準化。運営哲学は David Clark (1992)「王も大統領も投票も拒否する。ラフコンセンサスと動くコードを信じる」 | 🟢 | IETF公式 Tao / MIT CSAIL 原スライド |
| B-4 | **IETF は多数決ではない**。RFC 7282 (2014) は投票を明確に否定。"humming"（うなり声で空気を読む）で合意を取る | 🟢 | RFC 7282 |
| B-5 | 地域インターネットレジストリ（RIR）は**5つ**: AFRINIC / APNIC / ARIN / LACNIC / RIPE NCC。RIRs を調整する NRO が2003年設立 | 🟢 | NRO公式 |
| B-6 | **DNSルートサーバは「13」（A〜M）** だが、実運用は **12組織**（Verisign が A・J の両方を運用）。Anycast により 2025年12月時点で約 **1,954インスタンス**が世界展開 | 🟢 | IANA公式 / Root Server Technical Ops Assoc. |
| B-7 | ルート運用者は米・欧・日（WIDE Project）・各国の大学・政府機関・商用組織の混成 | 🟢 | IANA公式 |
| B-8 | **W3C** (1994設立、Tim Berners-Lee) は HTML/CSS/XML 等 Web 標準を策定。ICANN/IETF とは役割分担（ICANN=識別子、IETF=下位プロトコル、W3C=Web上の標準） | 🟢 | W3C公式 |
| B-9 | RFC は誰でも Internet-Draft として提出可能。IETF 参加は会費不要・オープン | 🟢 | IETF公式 |
| B-10 | **2016年10月、IANA stewardship transition 完了**。それまで米国商務省 NTIA がルートゾーン変更の認可権を持っていた。同日、グローバルマルチステークホルダーコミュニティへ移管 | 🟢 | NTIA / ICANN 公式 |

---

## C. 物理層（どう繋がっているか）

| # | ファクト | 信頼度 | 出典 |
|---|---|---|---|
| C-1 | **海底ケーブルが国際通信の約99%**。TeleGeography 2026年版で世界 **694本**・総延長 **150万km超**・陸揚げ局 1,893ヶ所。衛星は1%未満 | 🟡 | TeleGeography |
| C-2 | 海底ケーブル損傷は年 150〜200件、**8割は漁船の錨や底引き網** | 🟡 | TeleGeography |
| C-3 | Google は世界の海底ケーブルの約 8.5%に関与、33 ルート。Google・Meta・Microsoft・Amazon 合計で 60以上のケーブルに関与 | 🟡 | BroadbandNow |
| C-4 | **Netflix Open Connect**: 世界トラフィックの約 95% を ISP 内に物理設置した専用キャッシュ装置(OCA)で配信。ISPには無償提供 | 🟢 | Netflix公式 |
| C-5 | IXP（Internet Exchange Point）: 複数の ISP・CDN が物理接続してトラフィック交換。DE-CIX (Frankfurt, 2025年ピーク 18.73 Tbps)、AMS-IX (Amsterdam, 11.92 Tbps) が代表 | 🟡 | 各IXP公式 |
| C-6 | **Tier 1 ISP**: 他の Tier 1 と無償相互接続（settlement-free peering）で全インターネットに到達できるネットワーク。AT&T、Verizon、NTT、Deutsche Telekom など。公式認定組織は存在しない | 🟡 | DrPeering 業界定義 |
| C-7 | Cloudflare は全ウェブサイトの 20.4% を保護、ネットワーク容量 405 Tbps (2025)。Akamai は CDN 市場首位で 300+ PoP | 🟡 | 業界調査 |

---

## D. 設計思想（なぜ今の形か）

| # | ファクト | 信頼度 | 出典 |
|---|---|---|---|
| D-1 | **End-to-end 原則 (1984)** — Saltzer・Reed・Clark 論文。ネットワークは単純に、賢さは端末側に。電話網（中央集権の交換機）との対比 | 🟢 | ACM TOCS原論文 |
| D-2 | **Postel's Law / 堅牢性原則 (RFC 761/793, 1980-81)** — 「送るときは保守的に、受けるときは寛容に」 | 🟢 | RFC 793 |
| D-3 | **Hourglass model (砂時計モデル)** — 上（アプリ）無限・下（物理層）無限・真ん中はIP1つだけ。Wi-Fi でも 5G でも光ファイバでも、LINE でも YouTube でも、IP を通せば全部つながる | 🟢 | RFC 3234 / 学術合意 |
| D-4 | **Permissionless innovation** — Vint Cerf が繰り返す中核思想。「誰の許可も得ずに新しいサービスを立ち上げて接続できる」 | 🟢 | Internet Society |
| D-5 | David Clark "Designing an Internet" (MIT Press, 2018) — "Tussle is inevitable"（利害の綱引きは必ず起きる）。設計者は平地を傾けるだけで、綱引き自体はなくせない | 🟢 | MIT Press |

---

## E. 止められるか（誰がスイッチを持つか）

| # | ファクト | 信頼度 | 出典 |
|---|---|---|---|
| E-1 | **国単位の遮断は頻発**。Access Now の記録で 2025年は 52か国で 313件、影響下の人口は世界の半数超の 46億人 | 🟢 | Access Now #KeepItOn |
| E-2 | ワースト: Myanmar 95件（軍政）、India 65件、Pakistan 20件、Iran 11件 | 🟢 | Access Now |
| E-3 | 中国（Great Firewall）、ロシア（RuNet、2019年主権インターネット法）、イラン（NIN）は国レベルの独自運用を整備 | 🟢 | Atlantic Council / OSW |
| E-4 | **一方、"世界全体のスイッチ" を持つ主体は存在しない**。ルートDNS を改ざんしても 12 組織・約 1,954 インスタンスに分散しており、単一組織の改変では伝播しない | 🟢 | 標準技術理解 |
| E-5 | BGP は中央調整を前提としない分散プロトコル。経路ハイジャックは「誰かが許可したから」ではなく「誰も止めなかったから」起きる | 🟢 | Cloudflare解説 |
| E-6 | Tim Berners-Lee 2024年書簡: 「この10年、ウェブは人類を力づけるどころか価値を浸食する側に回った」。プラットフォーム集中と AI を名指し | 🟢 | 本人書簡 |

---

## 主因 vs 副因の整理

- 「なぜインターネットに管理者がいないか」の**主因**: End-to-end 原則 + Hourglass model という**設計思想**（D-1, D-3）。これが先にあり、組織体制（IETF の rough consensus、ICANN のマルチステークホルダー、RIR の地域分散）は**その必然的帰結として後から組織化された**
- 「なぜ ARPANET が作られたか」の**主因**: 高価な大型コンピュータの資源共有。**核戦争対策は副因どころか動機ですらない**（Herzfeld 明言、A-7）
- 「なぜ TCP/IP が勝ったか」の主因: 「実装が先、仕様は後追認」という文化と ARPANET での既成事実化。OSI の技術的劣位が主因ではない（Russell 2014）

---

## 台本で特に使いたいフック候補

1. 「インターネットを作った人を1人あげてください」→ 答えは「1人じゃない」
2. Berners-Lee は WWW を作った。インターネット（TCP/IP）は別の人（Cerf と Kahn）
3. ICANN は"インターネットの管理会社"じゃない。識別子の調整役
4. IETF は多数決じゃない。唸り声で合意を取る
5. Netflix の映画は「クラウド」じゃなく、近所の ISP のビルから来ている
6. 海底ケーブルは年150〜200回、**漁船の錨**で切れる
7. 2025年は 52 か国・313件のインターネット遮断が起きた。でも「世界全体を止めるスイッチ」はどこにもない
8. 作った本人（Berners-Lee）が「今のウェブは失敗してる」と言っている
