# Research 1a — 主流・肯定情報

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 1 | クラウドコンピューティングの公式定義：「設定可能なコンピューティングリソース（ネットワーク、サーバー、ストレージ、アプリケーション、サービス）の共有プールに対して、ユビキタスで便利かつオンデマンドなネットワークアクセスを可能にするモデルで、最小限の管理労力またはサービスプロバイダとのやり取りで迅速にプロビジョニング・リリースできる」 | 🟢 | [NIST SP 800-145 (csrc.nist.gov)](https://csrc.nist.gov/pubs/sp/800/145/final) | 2011年9月発行、現在も国際的な業界標準定義として使用される |
| 2 | NIST公式のクラウド5つの必須特性：①オンデマンド・セルフサービス、②幅広いネットワークアクセス、③リソースプール化、④迅速な弾力性（Rapid Elasticity）、⑤従量課金測定（Measured Service） | 🟢 | [NIST SP 800-145 PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-145.pdf) | 2011年、5特性+3サービスモデル+4展開モデルの枠組み |
| 3 | NIST公式のクラウド3サービスモデル：IaaS（例：AWS EC2、Azure VM、GCP Compute Engine）／PaaS（例：AWS Elastic Beanstalk、Heroku、Quickbase）／SaaS（例：Gmail、Microsoft 365、Slack） | 🟢 | [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final) | 3モデルはそれぞれ抽象化レベルが異なる |
| 4 | NIST公式のクラウド4展開モデル：パブリック／プライベート／ハイブリッド／コミュニティ | 🟢 | [NIST SP 500-292 Reference Architecture](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication500-292.pdf) | 動画冒頭の分類説明に使える |
| 5 | Gartner予測：世界のパブリッククラウドサービスへのエンドユーザー支出は2025年に7,234億ドル（約108兆円）、前年比21.5%増。2024年は5,957億ドル | 🟡 | [Gartner Press Release 2024-11-19](https://www.gartner.com/en/newsroom/press-releases/2024-11-19-gartner-forecasts-worldwide-public-cloud-end-user-spending-to-total-723-billion-dollars-in-2025) | 全セグメントで二桁成長予測。CIPS（インフラ+プラットフォーム）は24%増で3,000億ドル超 |
| 6 | Synergy Research Group：2025年Q3時点のクラウドインフラ市場シェアはAWS 29%、Microsoft Azure 20%、Google Cloud 13%。ビッグ3合計で63%を占める | 🟡 | [Synergy Research Group](https://www.srgresearch.com/articles/cloud-market-share-trends-big-three-together-hold-63-while-oracle-and-the-neoclouds-inch-higher) | 2025年通期でクラウドインフラサービス売上は初めて4,000億ドル超の見込み |
| 7 | 2025年Q2クラウドインフラ支出は約990億ドル（前年同期比25%増、+200億ドル）。GenAI特化サービスは140〜180%成長 | 🟡 | [Synergy Research / Statista](https://www.statista.com/chart/18819/worldwide-market-share-of-leading-cloud-infrastructure-service-providers/) | AI需要が市場成長を加速 |
| 8 | 2025年Q2の四半期売上：AWS 309億ドル（年換算1,240億ドル）、Microsoft Intelligent Cloud 299億ドル、Google Cloud 136億ドル。成長率はGoogle Cloud 32%、Microsoft 26%、AWS 17% | 🟡 | [Cloudwards - Q2 2025 Cloud Earnings](https://www.cloudwards.net/news/aws-azure-and-google-cloud-lead-q2-2025-cloud-market-earnings/) | 絶対額はAWSが最大、成長率はGoogle Cloudが最速 |
| 9 | Flexera 2025 State of the Cloud Report：エンタープライズおよびSMBワークロードの半数以上が既にパブリッククラウド上で稼働。組織の33%が年間1,200万ドル超のクラウド支出 | 🟡 | [Flexera 2025 State of the Cloud](https://www.flexera.com/blog/finops/the-latest-cloud-computing-trends-flexera-2025-state-of-the-cloud-report/) | 759社のIT担当者調査、2025年3月発表 |
| 10 | Flexera調査：組織の70%がハイブリッドクラウド戦略（最低1つのパブリック+プライベート）を採用。72%がGenAIサービスを利用（2024年の47%から増加） | 🟡 | [Flexera 2025 Press Release](https://www.flexera.com/about-us/press-center/new-flexera-report-finds-84-percent-of-organizations-struggle-to-manage-cloud-spend) | マルチクラウド・AI連動が主流 |
| 11 | 従業員1,000人超の大企業でクラウド採用率94%超。54%が今後12ヶ月以内にパブリッククラウドへのワークロード移行を計画 | 🟡 | [Softjourn Cloud Statistics 2026](https://softjourn.com/insights/cloud-computing-stats) | 大企業ではほぼ全数がクラウドを利用 |
| 12 | AWS沿革：2006年3月14日にAmazon S3（ストレージ）を公開、同年8月にEC2（コンピュート）を公開。これが「クラウドコンピューティング」という業界を事実上立ち上げた | 🟢 | [AWS Our Origins (aws.amazon.com)](https://aws.amazon.com/about-aws/our-origins/) | 動画の歴史パート導入に使える |
| 13 | Netflixは2008年のDB障害を契機にAWS移行を開始し、2016年1月に自社データセンターを完全停止。Aurora移行では75%のパフォーマンス改善と28%のコスト削減を実現 | 🟡 | [Netflix Case Study (aws.amazon.com)](https://aws.amazon.com/solutions/case-studies/netflix-case-study/) | 「物理DCからクラウドへ」の代表例 |
| 14 | 日本のパブリッククラウドサービス市場は2024年に4兆1,423億円（前年比26.1%増）。2025年は約4.4兆円規模に達する見込み | 🟡 | [総務省 令和7年版情報通信白書](https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/r07/html/nd218200.html) | 日本の視聴者への文脈提供に有用 |
| 15 | コスト構造比較：クラウドはOpEx（従量課金・運用費）、オンプレはCapEx（大きな初期投資）。クラウドは可変・短命・急拡大するワークロードで特に有利 | 🟡 | [Spacelift Cloud vs On-Premise Cost 2026](https://spacelift.io/blog/cloud-vs-on-premise-cost) | 「初期投資ゼロで始められる」が最大訴求点 |
| 16 | Gartner予測：2027年までに約90%の組織がハイブリッドクラウド戦略を採用。レガシーワークロードの最適化により平均31%のインフラコスト削減 | 🟡 | [Gartner via CIO Dive](https://www.ciodive.com/news/cloud-spend-growth-forecast-2025-gartner/733401/) | 「クラウド移行で約3割のコスト削減」という訴求数字 |

## キーインサイト

- **「クラウド」には公式定義がある**：NISTが2011年に定めた「5特性・3サービスモデル・4展開モデル」が今も世界標準。動画冒頭で「クラウドってふわっとした言葉じゃなくて実は定義があるんですよ」と入ると知的好奇心を刺激できる。
- **市場規模は桁違い**：2025年で世界7,234億ドル（108兆円）／日本4.4兆円という規模感は、視聴者の「そんなに使われてたの？」という驚きを引き出すフック。成長率も前年比21.5%と、既に巨大なのにまだ二桁成長している点がポイント。
- **3強が市場の6割強を占める寡占構造**：AWS 29%、Azure 20%、Google Cloud 13%（2025年Q3）。「皆さんが使ってるサービスの裏側は、結局この3社のどれか」という切り口が使える。
- **クラウド＝2006年AWS S3から始まった比較的新しい技術**：わずか20年弱で1000億ドル規模の産業になった、IT史上最速級の産業形成。Netflix（2008→2016）のような大企業が自社DCを捨てた事例はストーリーとして強い。
- **IaaS/PaaS/SaaSの違いは「どこまでお任せするか」**：ピザの比喩（生地から作る→冷凍ピザ→デリバリー）で説明可能。SaaS（Gmail・Slack）は誰もが既に使っているので「あなたも実はクラウドユーザーです」と繋げられる。
- **クラウドの強みの本質は「必要な時だけ・必要な分だけ」**：Rapid Elasticityと従量課金の組み合わせ。物理DCだと閑散期も繁忙期も同じだけ払うが、クラウドだと黒金週間（Netflix/PayPal的ユースケース）だけスケールできる。

## 原典から得た具体引用（厳選）

- 「Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction.」— **NIST（米国国立標準技術研究所）、SP 800-145、2011年9月**（クラウドの公式定義。20年近く経った今も改訂なしで使われている）

- 「Worldwide end-user spending on public cloud services is forecast to total $723.4 billion in 2025, up from $595.7 billion in 2024.」— **Gartner Press Release、2024年11月19日**（2025年の世界市場規模予測、前年比21.5%増）

- 「Amazon, Microsoft and Google together accounted for 63% of enterprise spending on cloud infrastructure services in Q3 [2025].」— **Synergy Research Group、2025年**（ビッグ3の市場寡占を示す代表数字）

- 「Over half of enterprise and SMB workloads currently running in public clouds.」— **Flexera 2025 State of the Cloud Report**（2025年3月、759社調査。「もう半分以上がクラウドに乗っている」という到達点）

- 「We chose Amazon Web Services (AWS) as our cloud provider because it provided us with the greatest scale and the broadest set of services and features.」— **Netflix、AWS公式ケーススタディ**（物理DC→クラウド移行の代表的コメント）

- 「日本のパブリッククラウドサービス市場は、2024年に4兆1,423億円（前年比26.1%増）となった。」— **総務省 令和7年版 情報通信白書**（日本市場の公式統計）
