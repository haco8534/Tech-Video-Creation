# Research 2c: クラウドコンピューティングの歴史・設計思想・深掘り情報

## ファクトテーブル

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 1961年、スタンフォード大学のジョン・マッカーシー教授が「コンピューティングはいつか電話や水道のような公共サービスとして提供されるだろう」と予言した。これがクラウドの概念的起源とされる。1963年にはDARPAがProject MAC（最初のタイムシェアリングシステム）に資金提供した。 | 🟢高 | [History of cloud computing - Wikipedia](https://en.wikipedia.org/wiki/History_of_cloud_computing) |
| 2 | 1962年、J.C.R. リックライダーがBBNで「銀河間コンピュータネットワーク（Intergalactic Computer Network）」の構想をメモにまとめた。世界中のどこからでもコンピューティング資源と情報にアクセスできるという構想で、今日のインターネットとクラウドの原型となった。彼のアイデアは1969年のARPANET開発にも影響を与えた。 | 🟢高 | [Intergalactic Computer Network - Wikipedia](https://en.wikipedia.org/wiki/Intergalactic_Computer_Network), [Internet Hall of Fame](https://www.internethalloffame.org/inductee/jcr-licklider/) |
| 3 | 「クラウド」という名称は、通信技術者がネットワーク図で複雑なネットワークインフラを雲の形で表現していたことに由来する。サーバーアイコンを丸で囲み、複数のサーバー群が重なると雲のように見えた。仮想化サービスの隠喩としての「クラウド」は1994年にGeneral Magicのデビッド・ホフマンが使用したのが起源とされ、1996年にCompaqが将来のコンピューティング事業計画で「Cloud Computing」という用語をより広く使い始めた。 | 🟢高 | [Who Coined 'Cloud Computing'? - MIT Technology Review](https://www.technologyreview.com/2011/10/31/257406/who-coined-cloud-computing/), [Cloud computing - Wikipedia](https://en.wikipedia.org/wiki/Cloud_computing) |
| 4 | 1999年、元Oracle幹部のマーク・ベニオフがSalesforceを創業し、SaaS（Software as a Service）モデルを本格的に商用化した。企業向けソフトウェアをインターネット経由で提供するという革命的なビジネスモデルで、クラウドコンピューティング商業化の先駆けとなった。 | 🟢高 | [Salesforce - Wikipedia](https://en.wikipedia.org/wiki/Salesforce), [The History of Salesforce](https://www.salesforce.com/news/stories/the-history-of-salesforce/) |
| 5 | AWSの誕生は「偶然の産物」とも言われる。2000年代初頭、Amazon社内でプロジェクトごとにDB・コンピュート・ストレージを個別に構築しており、3ヶ月で終わるはずのプロジェクトが、インフラ構築だけで3ヶ月かかっていた。この課題を解決するためにモジュール化した内部ツールが、外部にも売れると気づき、2006年3月にS3（ストレージ）、8月にEC2（コンピュート）をローンチした。Andy Jassy曰く「ここまで大きくなるとは誰も予測していなかった」。 | 🟢高 | [How AWS came to be - TechCrunch](https://techcrunch.com/2016/07/02/andy-jassys-brief-history-of-the-genesis-of-aws/), [Fortune](https://fortune.com/longform/amazon-web-services-ceo-adam-selipsky-cloud-computing/) |
| 6 | クラウドを支える技術は仮想化からコンテナへ進化した。1970年代にIBMがVM/370で仮想化を実現。1999年にVMwareがx86仮想化を商用化。2006年にGoogleがcgroups（プロセスコンテナ）を開発しLinuxカーネルに統合（2007年）。2013年にDockerがコンテナ技術を一般に普及させ、2014〜2015年にGoogleがKubernetesをオープンソース化してコンテナオーケストレーションの事実上の標準となった。 | 🟢高 | [The History of Virtual Machines and Containers](https://vuyisile.com/the-history-of-virtual-machines-and-containers/), [Docker vs VM - K21Academy](https://k21academy.com/kubernetes/docker-vs-virtual-machine/) |
| 7 | 2014年11月13日、AWSがLambdaを発表し、サーバーレスコンピューティング（FaaS: Function as a Service）の時代を切り開いた。開発者はサーバーの管理を一切意識せず、コードをアップロードするだけで実行できる。2016年にはGoogle Cloud Functions、Azure Functionsが追随。抽象化の進化（物理サーバー→仮想マシン→コンテナ→関数）の最新段階である。 | 🟢高 | [AWS Lambda - Wikipedia](https://en.wikipedia.org/wiki/AWS_Lambda), [AWS Lambda turns 10](https://aws.amazon.com/blogs/aws/aws-lambda-turns-ten-the-first-decade-of-serverless-innovation/) |
| 8 | クラウドの経済学は「規模の経済（Economy of Scale）」と「従量課金（Pay-as-you-go）」の2つが核心。大規模データセンターはハードウェア・電力・運用コストを多数の顧客で分散でき、1ユーザーあたりのコストを大幅に下げる。また、従量課金により企業は初期投資なしで必要な分だけリソースを使え、ピーク時の余剰投資（オンプレミスで発生しがち）を回避できる。 | 🟢高 | [Economics of Cloud Computing - GeeksforGeeks](https://www.geeksforgeeks.org/cloud-computing/economics-of-cloud-computing/), [Oracle Cloud Economics](https://www.oracle.com/cloud/cloud-economics-explained/) |
| 9 | エッジコンピューティングは集中型クラウドの次の進化形。ユーザーに近い場所でデータ処理を行い、遅延を削減する。CDN事業者はサーバーレス関数・KVストア・オブジェクトストレージをグローバル分散で提供し始めている。WebAssemblyランタイムはコールドスタートが1ミリ秒未満で、Dockerコンテナや従来のサーバーレスより桁違いに高速である。 | 🟡中 | [Edge vs Cloud Computing - DataCamp](https://www.datacamp.com/blog/edge-vs-cloud-computing), [Akamai Blog](https://www.akamai.com/blog/cloud/unlocking-next-wave-edge-computing-serverless-webassembly) |
| 10 | 日本政府は「クラウド・バイ・デフォルト原則」（2018年策定）に基づき、ガバメントクラウドを推進中。2026年度の対象サービスはAWS、Google Cloud、Azure、Oracle Cloud、そして国産唯一のさくらのクラウドの5つ。2025年度末までに各府省のシステム移行を目指している。ISMAPというセキュリティ評価制度（2020年開始）でクラウド事業者の安全性を認証している。 | 🟢高 | [デジタル庁 ガバメントクラウド](https://www.digital.go.jp/en/policies/gov_cloud), [さくらのクラウド](https://cloud.sakura.ad.jp/column/government-cloud/) |
| 11 | 2026年の専門家予測: クラウド支出は2027年までに1兆ドルを突破する見込み。94%以上の組織が何らかの形でクラウドを利用。マルチクラウド・ハイブリッドクラウドは一時的な移行段階ではなく恒久的な運用モデルとして定着。AIはワークロードではなくクラウド戦略全体の「組織原理」になりつつある。データ主権の懸念からリージョナルクラウドへの「ジオパトリエーション」も進んでいる。 | 🟡中 | [9 Predictions for Cloud in 2026](https://www.dbta.com/Editorial/News-Flashes/9-Predictions-for-Cloud-in-2026-172808.aspx), [TechTarget](https://www.techtarget.com/searchcloudcomputing/feature/AI-will-heavily-influence-cloud-related-decisions) |
| 12 | クラウドの抽象化の歴史は段階的に進んだ: (1) 物理サーバー時代（〜2000年代）、(2) 仮想マシン時代（VMware 1999〜）、(3) IaaS時代（AWS EC2 2006〜）、(4) PaaS時代（Heroku 2007〜、GAE 2008〜）、(5) コンテナ時代（Docker 2013〜）、(6) サーバーレス/FaaS時代（Lambda 2014〜）、(7) エッジ+AIネイティブ時代（2020年代〜）。各段階で開発者が管理する範囲が減り、ビジネスロジックに集中できるようになった。 | 🟡中 | 複数情報の総合（上記各出典より構成） |

## まとめ

クラウドコンピューティングの歴史は、1960年代のタイムシェアリングとリックライダーの「銀河間コンピュータネットワーク」構想に遡る。「クラウド」という名前自体は、ネットワーク図で複雑なインフラを雲形で抽象化していたことに由来する（1994年に用語として登場）。

商業的には、1999年のSalesforceによるSaaS実証、2006年のAWS S3/EC2ローンチが決定的な転換点となった。特にAWSは、Amazon社内のインフラ課題を解決するために作ったツールが外部サービスに発展した「偶然の巨人」である。

技術面では、IBMの仮想化（1970年代）→VMwareのx86仮想化（1999年）→Docker（2013年）→Kubernetes（2014年）→サーバーレス/Lambda（2014年）と、一貫して「抽象化レベルの引き上げ」が進み、開発者が管理すべき範囲は縮小し続けている。

経済面では「規模の経済」と「従量課金」がクラウドの本質的な強みであり、企業にとって初期投資ゼロ・弾力的スケーリングという革命的な変化をもたらした。

日本では政府が「クラウド・バイ・デフォルト原則」を掲げ、ガバメントクラウドへの移行を推進中。国産クラウドとしてはさくらインターネットが唯一認定されている。

今後は、AIネイティブクラウド、エッジコンピューティング、マルチクラウド戦略、データ主権への対応が主要トレンドとなり、クラウド市場は2027年に1兆ドル規模に達すると予測されている。
