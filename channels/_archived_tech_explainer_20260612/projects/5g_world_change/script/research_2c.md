# Step 2c — 背景・深掘り情報

調査日: 2026-04-08

---

## 1. 5G標準化の歴史（3GPP Release 15〜18）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | Release 15（2018年中頃完了）が5Gの基盤。NSA版は2017年12月、SA版は2018年中頃に策定完了。主にeMBB（高速大容量通信）を規定 | 🟢高 | [3GPP公式](https://www.3gpp.org/technologies/5g-system-overview) |
| 2 | Release 16（2020年）は「産業向け5Gリリース」と呼ばれ、製造・自動化・企業ネットワーク向け機能（URLLC強化、V2X等）を追加 | 🟢高 | [Ericsson Technology Review](https://www.ericsson.com/en/reports-and-papers/ericsson-technology-review/articles/5g-nr-evolution) |
| 3 | Release 17（2022年）は公共安全、非地上系ネットワーク（NTN＝衛星通信）、非公共ネットワーク（NPN）のサポートを導入 | 🟢高 | [3GPP公式](https://www.3gpp.org/technologies/5g-system-overview) |
| 4 | Release 18（5G Advanced）は5G第4の標準で、初めて「5G Advanced」と命名。AI/MLが主要プロジェクトの一つ | 🟢高 | [5G World Pro](https://www.5gworldpro.com/blog/2022/10/03/3gpp-release-15-release-16-release-17-and-release-18/) |

## 2. 5Gのキラーアプリ不在問題

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 5 | 2G〜4Gには世代を象徴するキラーアプリ（音声→SMS→メール→動画）があったが、5Gには未だ合意されたキラーアプリが存在しない | 🟡中 | [Extreme Networks](https://www.extremenetworks.com/resources/blogs/the-5g-quest-for-the-killer-use-case-does-it-exist) |
| 6 | 5Gの応用は遠隔手術、VRライブイベント、IoTなど多分野にまたがるが、いずれも支配的な「決定打」にはなっていない | 🟡中 | [TechTarget](https://www.techtarget.com/searchnetworking/answer/What-are-5Gs-killer-applications) |
| 7 | メタバースやモバイルゲームなどの収益化は、加入者が既にゲーム・コンテンツプロバイダに支払っている料金との競合で制約される（PwC分析） | 🟡中 | [PwC](https://www.pwc.com/us/en/tech-effect/emerging-tech/5g-monetization.html) |
| 8 | 「キラーアプリは1つではなく、多数の独立したドメインからの複合的な価値」という見解が業界で広がりつつある | 🟡中 | [de:hub](https://www.de-hub.de/en/blog/post/looking-for-the-5g-killer-app-here-we-go/) |

## 3. 産業用5G（ローカル5G）の実際の導入事例

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 9 | 夢洲コンテナターミナル（大阪）：横1,450m×縦500mの広大な敷地にローカル5G環境を構築、総務省の実証事業 | 🟡中 | [NTTビジネスソリューションズ](https://www.nttbizsol.jp/knowledge/productivity/202504241600001160.html) |
| 10 | トヨタ自動車：ローカル5GによるMR（複合現実）システムで生産設備の事前検証・遠隔作業支援を実現 | 🟡中 | [NTT東日本](https://business.ntt-east.co.jp/bizdrive/column/dr00120-004.html) |
| 11 | 進和小牧SFiCラボ（三井情報×シスコ×KDDIエンジニアリング）：AGV・AMR自走装置制御、ロボット制御、品質管理にローカル5G活用 | 🟡中 | [三井情報](https://www.mki.co.jp/solution/product/local5g/casestudies.html) |
| 12 | 徳島での地域医療連携：5G等で患者の医療情報をリアルタイム共有、地域医療格差解消を目指す（2025年4月〜2026年3月横展開予定） | 🟡中 | [総務省報告書](https://www.soumu.go.jp/main_content/000969717.pdf) |
| 13 | 農業分野：ローカル5G・自営BWAを活用した自動走行トラクターの遠隔監視制御の実証（担い手不足解消目的） | 🟡中 | [総務省報告書](https://www.soumu.go.jp/main_content/000969717.pdf) |
| 14 | 2025年度以降、ローカル5Gは「導入期」から「普及期」への転換を迎えつつある | 🟡中 | [コーンズテクノロジー](https://cornestech.co.jp/info/column/20250107_41644) |

## 4. 5G SA（スタンドアロン）とNSA（ノンスタンドアロン）の違いと現状

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 15 | NSA：既存の4G LTEコアを利用して5G NR無線を追加する構成。初期展開の大半がこの方式 | 🟢高 | [KORE Wireless](https://www.korewireless.com/blog/what-is-5g-standalone/) |
| 16 | SA：5G専用コアネットワーク（5GC）を使用。ネットワークスライシング等の5G本来の機能が利用可能になる | 🟢高 | [KORE Wireless](https://www.korewireless.com/blog/what-is-5g-standalone/) |
| 17 | 世界の5G SA利用率は2025年Q4で17.6%（前年同期16.2%）。6回に1回の5G速度テストがSAネットワーク上 | 🟢高 | [Opensignal](https://insights.opensignal.com/2026/02/5g-standalone-state-of-play-architecture-deployed-monetisation-pending/dt) |
| 18 | SA中央値ダウンロード速度269.51Mbps、NSA比で52%のプレミアム。ただし地域差が大きい | 🟢高 | [Opensignal](https://insights.opensignal.com/2026/02/5g-standalone-state-of-play-architecture-deployed-monetisation-pending/dt) |
| 19 | 中国が圧倒的リーダー：5G SAシェア80.9%、5G Advanced加入者1,000万人超 | 🟢高 | [Opensignal](https://insights.opensignal.com/2026/02/5g-standalone-state-of-play-architecture-deployed-monetisation-pending/dt) |
| 20 | GCC（湾岸協力会議）が世界最速の5G SA速度を記録：中央値1.13Gbps | 🟢高 | [Opensignal](https://insights.opensignal.com/2026/02/5g-standalone-state-of-play-architecture-deployed-monetisation-pending/dt) |
| 21 | 欧州の5G SAシェアは2024年Q4の1.1%から2025年Q4に2.8%へ倍増。まだ低水準 | 🟢高 | [Opensignal](https://insights.opensignal.com/2026/02/5g-standalone-state-of-play-architecture-deployed-monetisation-pending/dt) |
| 22 | GSA調査：73カ国181事業者が5G SAに投資、47カ国85事業者がライブサービスを開始 | 🟢高 | [GSA via TelecomLead](https://telecomlead.com/5g/global-5g-investment-and-deployment-trends-2025-2026-insights-from-gsa-123755) |
| 23 | 韓国：2026年までに全5G基地局をSAコア装置に接続することを義務化 | 🟡中 | [Light Reading](https://www.lightreading.com/5g/5g-sa-is-expanding-but-outcomes-are-uneven-and-challenges-remain-report) |

## 5. ネットワークスライシングの仕組みと実用化状況

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 24 | ネットワークスライシング市場：2025年61億ドル→2030年675億ドル（CAGR 70%）に急成長見込み | 🟡中 | [ABI Research](https://www.abiresearch.com/blog/5g-network-slicing-market-overview) |
| 25 | 2025年時点で65の商用スライシングサービスがオペレーター・ベンダーから発表済み | 🟡中 | [ABI Research](https://www.abiresearch.com/blog/5g-network-slicing-market-overview) |
| 26 | アジア太平洋が2025年のグローバル収益の91%を占める（うち中国が地域支出の95%超） | 🟡中 | [ABI Research](https://www.abiresearch.com/blog/5g-network-slicing-market-overview) |
| 27 | Verizon・T-Mobileがコンシューマ・公共安全向けにスライシングを商用化済み | 🟡中 | [Ericsson](https://www.ericsson.com/en/reports-and-papers/mobility-report/articles/network-slicing-real-scenarios-tmobile) |
| 28 | 2030年までにエンタープライズがスライシング収益全体の64%を創出する見通し | 🟡中 | [ABI Research](https://www.abiresearch.com/blog/5g-network-slicing-market-overview) |
| 29 | 5G SAとクラウドネイティブツールのテレコネットワークへの統合は「当初の想定以上に困難」 | 🟡中 | [Ericsson](https://www.ericsson.com/en/blog/north-america/2025/bridging-the-gap-for-5g-network-slicing) |

## 6. 過去の通信世代交代でも「期待はずれ」はあったか（3Gの教訓）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 30 | 2000〜2001年、欧州の3Gスペクトラムオークションで通信事業者が合計1,000億ドル超を支出 | 🟢高 | [Oxford University (Klemperer論文)](https://www.nuffield.ox.ac.uk/economics/papers/2002/w5/runauction.pdf) |
| 31 | 英国3Gオークション（2000年4月）は225億ポンド、ドイツ（2000年8月）は300億ポンドを調達 | 🟢高 | [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0014292101002185) |
| 32 | 3Gは不十分な帯域幅で「モバイルインターネット革命」の期待を裏切り、消費者はモバイルネットに追加料金を払う価値を見出さなかった | 🟡中 | [Telecoms.com](https://www.telecoms.com/5g-6g/the-telecoms-industry-needs-to-break-out-of-the-rut-set-by-3g-hype) |
| 33 | テレコムバブル崩壊（2001年）：通信企業が5年間で5,000億ドル超を投資（大半が負債ファイナンス）。通信企業の時価総額は2年で7,000億ドル下落 | 🟢高 | [Wikipedia - Telecoms crash](https://en.wikipedia.org/wiki/Telecoms_crash) |
| 34 | 「技術は失敗しない。予測より時間がかかり、到達したときは当初の想定とは違う形になるだけ」（業界アナリスト） | 🟡中 | [Startup Stash](https://blog.startupstash.com/what-happens-after-the-hype-lessons-from-mobile-internets-long-road-to-success-22d0b15e0625) |
| 35 | 3Gのインフラは最終的に、当初想定とは全く違うもの（スマートフォンアプリ）を動かすことになったが、それでも使われた | 🟡中 | [Startup Stash](https://blog.startupstash.com/what-happens-after-the-hype-lessons-from-mobile-internets-long-road-to-success-22d0b15e0625) |
| 36 | 5G・6Gでも同じハイプサイクルが繰り返されており、業界は3Gの教訓を十分に活かしていないとの指摘 | 🟡中 | [Techdirt](https://www.techdirt.com/2024/06/05/having-learned-nothing-from-the-5g-hype-cycle-the-6g-hype-cycle-begins-in-earnest/) |

## 7. 5Gが実際に変えた生活シーン

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 37 | 5Gは4Gの最大100倍高速、レイテンシ最大10分の1、データ速度最大20Gbps | 🟢高 | [TechTimes](https://www.techtimes.com/articles/313597/20251226/what-5g-wifi-7-really-change-mobile-gaming-cloud-gaming-streaming.htm) |
| 38 | クラウドゲーミング市場：2025年93.2億ドル→2032年1,592.4億ドル（CAGR 50%）。Xbox Game Pass加入者は2025年Q1で3,700万人超、モバイルゲーム利用は前年比89%増 | 🟡中 | [GearBrain](https://www.gearbrain.com/cloud-gaming-how-5g-works-2674362950.html) |
| 39 | 5Gユーザーの満足度38%に対し4Gユーザーは28%（10ポイント差）。ただし5Gの期待超過率は2022年48%→2023年38%に低下 | 🟢高 | [Ericsson ConsumerLab](https://www.ericsson.com/en/reports-and-papers/consumerlab/reports/elevating-5g-with-differentiated-connectivity) |
| 40 | 5Gユーザーの10人に4人が「ベストエフォート型の5G性能をもはや受け入れない」と回答 | 🟢高 | [Ericsson ConsumerLab](https://www.ericsson.com/en/reports-and-papers/consumerlab/reports/elevating-5g-with-differentiated-connectivity) |
| 41 | 3人に1人の消費者が「性能保証付きサービスのために、現在のアプリ支出の10%を振り替える意思がある」 | 🟡中 | [Ericsson ConsumerLab](https://www.ericsson.com/en/reports-and-papers/consumerlab/reports/elevating-5g-with-differentiated-connectivity) |
| 42 | 生成AIユーザーの4人に1人がリアルタイム応答性に対して35%高い料金を払う意思あり | 🟡中 | [Ericsson ConsumerLab](https://www.ericsson.com/en/reports-and-papers/consumerlab/reports/elevating-5g-with-differentiated-connectivity) |
| 43 | ライブ配信分野：5Gの真の価値はアップリンク帯域、超低遅延、エッジコンピュート、高度なQoS機能の組み合わせにある | 🟡中 | [Dacast](https://www.dacast.com/blog/5g-streaming/) |

## 8. 6Gに向けた動向と5Gの位置づけ

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 44 | ITU-Rが6G（IMT-2030）の3段階フレームワークを策定：Stage 1ビジョン定義（2023年6月完了）→Stage 2要件・評価方法（2026年完了予定）→Stage 3仕様策定（2030年完了予定） | 🟢高 | [ITU公式](https://www.itu.int/en/mediacentre/Pages/PR-2023-12-01-IMT-2030-for-6G-mobile-technologies.aspx) |
| 45 | 3GPP Release 20が5G Advancedの最終進化、Release 21が最初の6G仕様（2029〜2030年に利用可能見込み） | 🟢高 | [3GPP公式](https://www.3gpp.org/specifications-technologies/releases/release-20) |
| 46 | 2026年6月までに、3GPPがRelease 21の作業期間を決定し、6G仕様の最初のバージョンの提供日が確定する予定 | 🟢高 | [IEEE ComSoc](https://techblog.comsoc.org/2026/01/02/roles-of-3gpp-and-itu-r-wp-5d-in-the-imt-2030-6g-standards-process/) |
| 47 | 6Gの技術提案のITU提出期限は2029年初頭、最終仕様提出は2030年中頃 | 🟢高 | [Ericsson](https://www.ericsson.com/en/blog/2024/3/6g-standardization-timeline-and-technology-principles) |
| 48 | 「5Gの展開ミスを繰り返さないため、6G開発はキラーアプリを最初から明確にすべき」という教訓が業界で共有されている | 🟡中 | [IQT](https://www.iqt.org/library/the-future-of-wireless-from-5gs-killer-app-to-6gs-sensing-revolution) |

---

## まとめ

### 台本で使える主要ポイント

**1. 5Gは「革命」ではなく「進化」だった**
- 1G〜4Gには明確なキラーアプリ（音声→SMS→メール→動画）があったが、5Gにはそれがない。多数のドメインに分散した価値提供という新しいパターン。
- 消費者の満足度は4G比で10ポイント高いが、「期待超過」の割合は年々低下（48%→38%）。5Gユーザーの4割が「ベストエフォートはもう受け入れない」。

**2. 3Gの教訓 ― 歴史は繰り返す**
- 欧州3Gオークションで1,000億ドル超の投資→テレコムバブル崩壊→時価総額7,000億ドル蒸発。結局3Gのインフラが花開いたのは、当初想定していなかったスマートフォンアプリの時代になってから。
- 「技術は失敗しない。到達に時間がかかり、形が変わるだけ」という教訓は5Gにも当てはまる可能性大。

**3. SA vs NSA ― 5Gの「本気」はまだこれから**
- 世界の5G通信の83%以上がまだNSA（4Gコア流用）。真の5G機能（スライシング等）はSAが前提だが、SA普及率はわずか17.6%。
- 中国（SA率80.9%）とそれ以外の世界の格差が極めて大きい。欧州はまだ2.8%。

**4. ネットワークスライシング ― 最大の目玉はまだ「パイロット段階」**
- 65の商用サービスが発表されているが、収益の91%がアジア太平洋（ほぼ中国）に集中。本格普及は2030年頃の見通し。

**5. ローカル5Gは着実に成果**
- 工場（トヨタMR、夢洲コンテナターミナル）、医療（徳島の地域連携）、農業（自動走行トラクター）など具体的な導入事例が増加。2025年以降「導入期→普及期」に転換中。

**6. 6Gの足音 ― 5Gは「つなぎ」だったのか？**
- 2030年に6G仕様完成予定。5G→5G Advanced→6Gという連続的進化の過程で、5Gは「基盤構築期」として位置づけられる。
- 業界では「6Gでは5Gの失敗を繰り返すな」の声。キラーアプリ不在の教訓を活かせるかが鍵。

### 台本の構成提案
- 導入部で「5Gで世界変わった？ 正直、あんまり実感ない人が多いのでは」→共感から入る
- 3Gの歴史を振り返り「実はこれ、毎回起きてること」→安心感
- SA/NSAの違いで「今の5Gは本来の5Gじゃない」→知的好奇心
- ローカル5Gの具体例で「見えないところでは確実に変化が起きている」→発見
- 6Gへの展望で「5Gの真価はこれから」→前向きな締め
