# Research 2a: クラウドコンピューティングの基礎情報・仕組み・一般的見解

## ファクトテーブル

| # | ファクト | 信頼度 | ソース |
|---|---------|--------|--------|
| 1 | NISTによるクラウドコンピューティングの公式定義（SP 800-145, 2011年）：「ネットワーク経由で共有された構成可能なコンピューティングリソース（ネットワーク、サーバー、ストレージ、アプリケーション、サービス）のプールに、ユビキタスで便利なオンデマンドアクセスを可能にするモデル。最小限の管理労力またはサービスプロバイダーとのやり取りで、迅速にプロビジョニングおよびリリースできる」 | 🟢 | [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final) |
| 2 | NISTが定義するクラウドの5つの基本特性：(1) オンデマンド・セルフサービス（自動的にリソースを確保可能）、(2) 幅広いネットワークアクセス（スマホ・PC等どこからでもアクセス）、(3) リソースプーリング（複数ユーザーで物理リソースを共有するマルチテナントモデル）、(4) 迅速な弾力性（需要に応じて即座にスケールアップ/ダウン）、(5) 計測されたサービス（使った分だけ課金） | 🟢 | [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final) |
| 3 | 世界のクラウドコンピューティング市場規模は2024年に約7,360億〜8,535億ドル。2025年には約9,130億〜9,437億ドルに成長。年平均成長率（CAGR）は12〜21%で、2030年には約2.3兆ドル規模に達する見込み | 🟡 | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/cloud-computing-market-size/global), [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/cloud-computing-market-234.html), [Fortune Business Insights](https://www.fortunebusinessinsights.com/cloud-computing-market-102697) |
| 4 | クラウドインフラ市場のシェア（2025年Q3時点）：AWS 29%、Microsoft Azure 20%、Google Cloud 13%。3社合計で市場の約63%を占有。2025年Q3にはクラウドインフラへの四半期支出が初めて1,000億ドルを超え、1,069億ドルに到達（前年比28%増） | 🟢 | [Cargoson Cloud Market Share](https://www.cargoson.com/en/blog/global-cloud-infrastructure-market-share-aws-azure-google), [Statista](https://www.statista.com/chart/18819/worldwide-market-share-of-leading-cloud-infrastructure-service-providers/) |
| 5 | クラウドの仕組み：物理的なデータセンターに設置されたサーバー上で、ハイパーバイザー（仮想マシンモニター）が仮想化層を作り、1台の物理サーバー上に複数の仮想マシン（VM）を動作させる。さらにコンテナ技術（Docker等）ではOSカーネルを共有しつつプロセスを分離し、VMより軽量・高速に起動できる。この仮想化技術がクラウドの基盤 | 🟢 | [AWS - What is Virtualization](https://aws.amazon.com/what-is/virtualization/), [IBM - What is Virtualization](https://www.ibm.com/think/topics/virtualization) |
| 6 | 3つのサービスモデル：**IaaS**（Infrastructure as a Service）= サーバー・ストレージ・ネットワークなどインフラを提供（例：AWS EC2, Azure VM）。**PaaS**（Platform as a Service）= 開発・実行環境ごと提供、インフラ管理不要（例：Google App Engine, Heroku）。**SaaS**（Software as a Service）= アプリケーションそのものを提供（例：Gmail, Dropbox, Microsoft 365）。SaaSが市場の53.6%で最大シェア | 🟢 | [Google Cloud](https://cloud.google.com/learn/paas-vs-iaas-vs-saas), [IBM](https://www.ibm.com/think/topics/iaas-paas-saas), [Microsoft Azure](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-are-iaas-paas-and-saas) |
| 7 | 3つのデプロイメントモデル：**パブリッククラウド**＝第三者が運営する共有環境、従量課金でスケーラブル。**プライベートクラウド**＝単一組織専用の環境、セキュリティ・コンプライアンスに強いが拡張コスト高。**ハイブリッドクラウド**＝両方を組み合わせ、機密データはオンプレ、変動負荷はパブリックで処理（クラウドバースティング） | 🟢 | [Microsoft Azure](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-are-private-public-hybrid-clouds), [IBM](https://www.ibm.com/think/topics/public-cloud-vs-private-cloud-vs-hybrid-cloud) |
| 8 | 日常生活でのクラウド依存度：Netflix（AWS上で動画配信）、YouTube（Google Cloud）、Gmail、LINE、銀行アプリ（残高照会・送金・不正検知すべてクラウドサーバー経由）、Spotify（音楽ストリーミング）、Dropbox（ファイル同期）、Slack・Teams（ビジネスチャット）など、スマホで使うほとんどのサービスがクラウド上で動作 | 🟢 | [BMInfotrade](https://bminfotrade.com/blog/cloud-computing/top-10-everyday-cloud-computing-applications-you-use-without-realizing), [Koofr Blog](https://koofr.eu/blog/posts/uses-of-cloud-computing-in-everyday-life) |
| 9 | 世界最大のデータセンター：中国テレコム内モンゴル情報パーク（約99.4万m²、150MW）。Switch社シタデルキャンパス（ネバダ州、約66.9万m²、650MW、世界最大のコロケーション施設）。米国には5,427のデータセンターがあり、世界全体の約45%を占める | 🟢 | [Brightlio](https://brightlio.com/largest-data-centers-in-the-world/), [GBC Engineers](https://gbc-engineers.com/news/largest-data-center-in-the-world) |
| 10 | 世界のデータセンターの電力消費量は2024年に415テラワット時（TWh）で、世界全体の電力需要の約1.5%に相当。バージニア北部は世界最大のデータセンター市場で、約4,000MWの容量を持つ | 🟢 | [Brightlio Data Center Stats](https://brightlio.com/data-center-stats/), [SolarTech Online](https://solartechonline.com/blog/how-much-electricity-data-center-use-guide/) |
| 11 | クラウド市場でのAI関連サービスの急成長：GenAI専用クラウドサービスは2025年Q2に前年比160%成長。Google CloudはAI・データ分析に強みを持ち、シェアを着実に拡大中（過去最高の13%に到達） | 🟡 | [Tomasz Tunguz](https://tomtunguz.com/cloud-market-share-shift-2025/), [Programming Helper Tech](https://www.programming-helper.com/tech/cloud-computing-market-share-2026-aws-azure-google-cloud-analysis) |
| 12 | クラウドの本質を一言で：「自分のパソコンやサーバーの代わりに、インターネットの向こう側にある誰かのコンピューターを借りて使うこと」。ユーザーは物理的なハードウェアを所有・管理する必要がなく、使った分だけ料金を払う（電気・水道のような従量制ユーティリティモデル） | 🟢 | [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final) |

## サマリー

クラウドコンピューティングとは、NISTの定義に基づけば「ネットワーク経由で共有コンピューティングリソースにオンデマンドでアクセスできるモデル」であり、5つの基本特性（オンデマンド・セルフサービス、幅広いネットワークアクセス、リソースプーリング、迅速な弾力性、計測されたサービス）で特徴づけられる。

技術的には、物理的なデータセンターに設置されたサーバー群を仮想化技術（ハイパーバイザー、コンテナ）で抽象化し、複数のユーザーが効率的にリソースを共有する仕組み。サービスモデルはIaaS/PaaS/SaaSの3層に分かれ、SaaSが市場の過半数を占める。

市場規模は2024年時点で約7,000〜8,500億ドル、年20%前後の成長率で拡大中。AWS（29%）、Azure（20%）、Google Cloud（13%）の3社で約63%のシェアを持つ。2025年Q3には四半期支出が初めて1,000億ドルを超えた。

私たちの日常生活はすでにクラウドに深く依存しており、Netflix、YouTube、Gmail、LINE、銀行アプリなど、スマートフォンで使うサービスのほぼすべてがクラウド上で動いている。その裏側では、世界中に分散する巨大データセンター（最大級は99万m²超）が年間415TWhの電力を消費して稼働している。これは世界全体の電力消費の約1.5%にあたる。

動画で特に強調すべきポイント：
- 「クラウドは雲の中ではなく、実際には地上の巨大な建物の中にある」という物理的リアリティ
- 普段使っているサービスのほぼすべてがクラウド依存である事実（身近さ）
- 仮想化技術による「1台のサーバーを複数人で分け合う」仕組みの分かりやすさ
- 電気・水道と同じ従量制モデルという比喩の有効性
