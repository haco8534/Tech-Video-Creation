# Research — 統合キーファクト表（「クラウド」ってなんなの？）

> 1a/1b/1c の重複排除・信頼度再評価・主因副因切り分けを済ませた版。  
> 本動画で「使う可能性のあるファクト」だけを優先度順に残した。

## 主因・副因の切り分け（主題の因果）

**主題: なぜ「クラウド」はここまで広まったのか／なのに大企業が撤退するのはなぜか**

- **主因**: 仮想化 × 広帯域ネット × 従量課金＋API化 の組み合わせで「必要な時だけ必要な分」を初期投資ゼロで実現できた（NIST 5特性）
- **副因**: 2006年 Amazon EC2 が"社内インフラの完全Web API化"という形で商用化の扉を開けた（歴史的事故でもあり必然でもある）
- **副因**: 「クラウド」という抽象名が詳細を隠す売り文句として機能し、ビジネス側の意思決定を容易にした（1996年 Compaq 発、マーケ由来）
- **"撤退"の主因**: 一定規模以上・予測可能な定常負荷では OpEx 積み上げがオンプレ CapEx を上回る。送信（egress）料金などロックイン要素も重なる

## 統合ファクト表（動画採用候補のみ）

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 1 | NIST SP 800-145（2011）がクラウドの公式定義を確立：**5特性**（オンデマンド・セルフサービス／広帯域ネット／リソースプーリング／高速弾力性／計測課金）＋**3サービスモデル**（IaaS・PaaS・SaaS）＋**4展開モデル**（パブリック／プライベート／ハイブリッド／コミュニティ） | 🟢 | [NIST SP 800-145](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-145.pdf) | "クラウド＝インターネット越しのサーバー"は定義的に不十分 |
| 2 | 1961年、John McCarthy が MIT 創立100周年講演で「computing may someday be organized as a public utility」と予言。加入者が使った分だけ払うモデルも言及 | 🟢 | [MIT Technology Review "The Cloud Imperative"](https://www.technologyreview.com/2011/10/03/190237/the-cloud-imperative/) | "最新技術"ではなく60年越しの予言が実現した形 |
| 3 | 「cloud computing」の語の最古の文書化は **1996年11月 Compaq 社内資料**「Internet Solutions Division Strategy for Cloud Computing」。George Favaloro と Sean O'Sullivan が関与。つまり技術用語ではなくマーケティング語として誕生 | 🟢 | [MIT Technology Review "Who Coined 'Cloud Computing'?"](https://www.technologyreview.com/2011/10/31/257406/who-coined-cloud-computing/) | 言葉の出自が"売り方"である点が本動画の伏線 |
| 4 | 「雲」のメタファーはそれ以前から：ネットワーク図で"担当外のインターネット部分"を雲形で曖昧に描く慣習が1970〜80年代からあった。General Magic の Telescript（1994）で分散コンピューティングのシンボルとして使われた例も | 🟡 | [History of cloud computing — Wikipedia](https://en.wikipedia.org/wiki/History_of_cloud_computing) | "詳細を隠す抽象化の哲学"が名前に宿っている |
| 5 | Amazon EC2 は 2006年8月24日ベータ公開。原案は 2003年末 Chris Pinkham と Benjamin Black の社内ペーパー。実装は南アフリカ・ケープタウンのチーム。出発点は"Amazon社内インフラの完全標準化・自動化・Webサービス化" | 🟢 | [AWS公式](https://aws.amazon.com/about-aws/whats-new/2006/08/24/announcing-amazon-elastic-compute-cloud-amazon-ec2---beta/) / [TechCrunch](https://techcrunch.com/2021/08/28/how-amazon-ec2-grew-from-a-notion-into-a-foundational-element-of-cloud-computing/) | EC = Elastic Compute。"社内用を外販した"のが起点 |
| 6 | Gartner予測：世界のパブリッククラウド支出は **2025年に7,234億ドル（約108兆円）**、前年比21.5%増（2024年は5,957億ドル） | 🟡 | [Gartner Press Release 2024-11-19](https://www.gartner.com/en/newsroom/press-releases/2024-11-19-gartner-forecasts-worldwide-public-cloud-end-user-spending-to-total-723-billion-dollars-in-2025) | 動画の市場規模フックに最適 |
| 7 | Synergy Research：2025年Q3時点でAWS 29%／Azure 20%／Google Cloud 13%、**ビッグ3合計63%**の寡占構造 | 🟡 | [Synergy Research Group](https://www.srgresearch.com/articles/cloud-market-share-trends-big-three-together-hold-63-while-oracle-and-the-neoclouds-inch-higher) | "皆さんのサービスは結局この3社のどれか" |
| 8 | 日本のパブリッククラウド市場は2024年に **4兆1,423億円**（前年比26.1%増）、2025年は約4.4兆円規模 | 🟡 | [総務省 令和7年版 情報通信白書](https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/r07/html/nd218200.html) | 日本市場の規模感を伝える |
| 9 | Netflix は 2008年のDB障害を契機にAWS移行開始。**2016年1月に自社データセンターを完全停止**。現在は1万超のEC2インスタンスで数億人のストリーミングを支える | 🟡 | [AWS Netflix Case Study](https://aws.amazon.com/solutions/case-studies/innovators/netflix/) | "視聴者が既にクラウドを使っている"代表例 |
| 10 | Spotify は 2016年に Google Cloud へ全面移行。1,200サービス・2万件/日のバッチジョブを移管 | 🟡 | [DEV.to Cloud Migration Strategies](https://dev.to/citrux-digital/cloud-migration-strategies-success-stories-of-netflix-and-spotify-118h) | 日常で使うアプリの裏側 |
| 11 | Salesforce は 1999年3月8日設立。最初からSaaS として業務アプリを月額課金・ブラウザ配信。「No Software」キャンペーンで先駆け | 🟢 | [Salesforce History](https://www.salesforceben.com/salesforce-history/) | SaaS 商業化の原点 |
| 12 | 2025年Q2 クラウドインフラ支出は約 990億ドル（前年比+25%、+200億ドル）。生成AI特化サービスは 140〜180%成長 | 🟡 | [Statista/Synergy](https://www.statista.com/chart/18819/worldwide-market-share-of-leading-cloud-infrastructure-service-providers/) | AI需要が加速装置 |
| 13 | Flexera 2025 State of the Cloud：大企業・SMB ワークロードの **半数以上**が既にパブリッククラウド。組織の33%が年1,200万ドル超のクラウド支出 | 🟡 | [Flexera 2025 report](https://www.flexera.com/blog/finops/the-latest-cloud-computing-trends-flexera-2025-state-of-the-cloud-report/) | 759社調査 |
| 14 | **37signals (Basecamp/HEY)** は 2022年10月に DHH がクラウド離脱を宣言。Dell サーバーに約70万ドルを投資し、クラウド年間支出 約320万ドル→約130万ドルに。**5年で1,000万ドル超の節約見込み** | 🟢 | [DHH "Why we're leaving the cloud"](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0) / [DHH "Our cloud-exit savings..."](https://world.hey.com/dhh/our-cloud-exit-savings-will-now-top-ten-million-over-five-years-c7d9b5bd) | 最強の"離脱事例" |
| 15 | Dropbox は 2013年〜"Magic Pocket"プロジェクトで AWS S3 から自社DCへ移行。2015年10月に90%ユーザーデータを自社移管完了。IPO前SEC資料で **運用コスト7,500万ドル削減**判明 | 🟢 | [TechCrunch "Why Dropbox decided to drop AWS"](https://techcrunch.com/2017/09/15/why-dropbox-decided-to-drop-aws-and-build-its-own-infrastructure-and-network/) | 500PB規模でのクラウド離脱 |
| 16 | a16z "The Cost of Cloud, a Trillion Dollar Paradox"（2021, Sarah Wang & Martin Casado）：「スタート時にクラウドを使わないのは狂気、**大規模化して居残るのも狂気**」。上場SaaS 50社でクラウド費用が株式時価総額の**約50%相当**を削ると試算 | 🟢 | [a16z](https://a16z.com/the-cost-of-cloud-a-trillion-dollar-paradox/) | "どこで効くか"の境界論 |
| 17 | AWS の送信（egress）料金 0.09ドル/GB〜（DigitalOcean 0.01ドル/GB の約9倍）。独禁法調査の対象になり、**2024年以降 "完全離脱時のみ" egress 無料化** | 🟡 | [Cloudflare "AWS's Egregious Egress"](https://blog.cloudflare.com/aws-egregious-egress/) | "入るのは簡単、出るのは高い"構造 |
| 18 | IDC 2024：80%の組織が1年以内に何らかのクラウドワークロード撤収を計画。**Barclays CIO Survey 2024末で86%のCIOが一部 repatriation 意向（過去最高）** | 🟢 | [CIO.com "Why cloud repatriation is back"](https://www.cio.com/article/4061031/why-cloud-repatriation-is-back-on-the-cio-agenda.html) | "揺り戻し"の数字 |
| 19 | IEA：2024年のデータセンター世界電力消費は **約415TWh（世界電力の約1%）**。2030年には 945TWh へ倍増見込み。米国は2024年 183TWh（米電力の4%超） | 🟢 | [IEA Data centres & networks](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks) | "雲"の物理実体 |
| 20 | ハイパースケール DC は1サイト10エーカー（約4万m²、東京ドーム約0.9個分）以上。消費電力 1サイトあたり 20〜100MW、最大級は 650MW（中規模発電所1基分）。1GW クラスも計画中 | 🟢 | [C&C Technology Group](https://cc-techgroup.com/how-much-power-does-a-hyperscale-data-center-use/) | 巨大重工業のスケール |
| 21 | **米バージニア州アシュバーン**（ラウドン郡）は世界最大のDC集積地。「Data Center Alley」と呼ばれ、**世界のウェブトラフィックの約70%が通過**すると言われる | 🟡 | [Governing "The Data Center Capital..."](https://www.governing.com/infrastructure/the-data-center-capital-of-the-world-is-in-virginia) | "視聴者の雲"の物理住所 |
| 22 | 世界の**海底ケーブル総延長は約148万km（地球37周分）**、570本運用・81本計画中。大陸間通信の 97〜98% を担う | 🟢 | [TeleGeography Submarine Cable Map 2025](https://submarine-cable-map-2025.telegeography.com/) | "雲"は物理ケーブルの束 |
| 23 | 「There is no cloud — it's just someone else's computer」は2010年代半ばに広まったミーム（FSFのステッカー等が出自の一つ） | 🟡 | [Lindsay Hill "Cloud: Not Just Someone Else's Computer"](https://lkhill.com/cloud-not-just-computer/) | 決め台詞として使える |
| 24 | Shadow IT（非公認SaaS）は大企業IT支出の30〜40%、SaaSライセンスの約50%が未使用、48%のエンタープライズアプリが管理者不在 | 🟡 | [Shadow IT Statistics](https://www.quandarycg.com/shadow-it-statistics/) | "クラウドで管理がシンプルに"は幻想 |
| 25 | Uberは自社DCから Google Cloud / Oracle 併用へ移行しつつ、「**Uber Metal**」独自オンプレ基盤も運用。理由は「at scale, price/performance が自前で並ぶ」 | 🟡 | [ComputerWeekly "Uber backs hybrid cloud"](https://www.computerweekly.com/news/252452059/Uber-backs-hybrid-cloud-as-route-to-business-and-geographical-expansion) | スケール閾値で経済性が逆転 |

## キーインサイト

### 動画で一番強い反直感ファクト（えっポイント）
1. **「クラウド」は技術用語ではなく、1996年 Compaq のマーケティング資料が初出**。概念自体は1961年 MIT 講演にすでにある。"最新"でも"新技術"でもない
2. **37signals は自社DCへ戻して5年で1,000万ドル節約／Dropbox は7,500万ドル削減**。クラウドは規模と負荷次第で安くも高くもなる
3. **世界のデータセンター は 2024年に 415TWh（世界電力の約1%）**、1サイトが最大650MW（発電所1基分）。"雲"の裏側は重工業
4. **AWS 送信料金は競合の約9倍**で独禁法調査対象の"データ人質"構造
5. **世界のウェブトラフィックの約70%が米バージニア州アシュバーン1都市を通過**。雲の物理住所は具体的な場所

### NISTの公式定義（動画で骨組みとして使える）
- **5特性**: セルフサービス／広帯域網／リソースプーリング／高速弾力性（Elasticity）／計測課金
- **3サービスモデル**: IaaS（自作ピザ）／PaaS（冷凍ピザを焼く）／SaaS（デリバリーピザ）
- **4展開モデル**: パブリック／プライベート／ハイブリッド／コミュニティ

### 使えるアナロジー
- **電気（ユーティリティ）**: McCarthy 本人の比喩。発電所=DC／送電線=光ファイバ／コンセント=API／メーター=従量課金
- **水道**: "必要な時にひねれば必要な分だけ出る"＝Elasticity
- **ピザ3段階**: IaaS/PaaS/SaaS の例え
- **銀行預金**: タンス貯金＝ローカルHDD／銀行＝クラウドストレージ

### 視聴者が既に使っているクラウド（自分事化）
Gmail／Googleドライブ／iCloud／Netflix／LINE／Instagram／Spotify／ChatGPT

### 動画を"清潔すぎる物語"にしないための注意
- 「クラウド便利！」だけで締めない／「オンプレに戻せ！」でも締めない
- **どんな負荷／どんな規模だと効くか**という**条件論**に落とすのが誠実
- 万能解ではなく"使い分け"がコアメッセージになりうる

## 完了条件チェック

- ✅ 🟢 12件（基準8件以上）
- ✅ 🟡 13件（基準5件以上）
- ✅ 3方向カバー（1a 主流／1b 反証／1c 歴史）
- ✅ 通説への異議 7件（基準3件以上）
