# Research 2b: 反論・比較・誤解・限界

テーマ: 「クラウド」ってなんなの？

---

## ファクトテーブル

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | クラウドセキュリティ事故の99%はプロバイダー側ではなくユーザー側の責任（アクセス権の誤設定や保護されていないAPIなど）で発生するとGartnerが予測している。クラウド侵害の31%が設定ミスに起因し、1件あたりの平均被害額は約386万ドルに達する。 | 🟢高 | [Cloudflake - 9 myths about cloud computing](https://www.cloudflake.com/en/2025/02/04/9-myths-about-cloud-computing-what-will-still-be-true-in-2025/), [Fidelis Security](https://fidelissecurity.com/threatgeek/threat-detection-response/cloud-misconfigurations-causing-data-breaches/), [RSA Conference](https://www.rsaconference.com/library/blog/cloud-misconfigurations-still-the-biggest-threat-in-2025) |
| 2 | 安定した負荷のワークロードでは、オンプレミスの方がコスト効率が良い。損益分岐点は約12か月で、4年目以降はオンプレの年間コストが下回る。37signalsはAWSからの移行で年間約130〜150万ドルの節約を実現した。 | 🟢高 | [The New Stack](https://thenewstack.io/cloud-vs-on-prem-comparing-long-term-costs/), [Lenovo Press - TCO 2025](https://lenovopress.lenovo.com/lp2225-on-premise-vs-cloud-generative-ai-total-cost-of-ownership-2025-edition), [Puppet - Cloud Repatriation](https://www.puppet.com/blog/cloud-repatriation) |
| 3 | 2025年10月、AWSのDynamoDB障害がUS-EAST-1リージョンから全世界に波及し、最大15時間にわたり1,000社以上（Slack、Atlassian、Snapchatなど）に影響。同月のAzure障害は推定48〜160億ドルの損害を発生させた。2024年8月〜2025年8月の間に、AWS・Azure・GCPで合計100件以上の障害が発生した。 | 🟢高 | [IncidentHub - Major Cloud Outages 2025](https://blog.incidenthub.cloud/major-cloud-outages-2025), [IBTimes](https://www.ibtimes.com/billions-lost-server-outages-2025-cloud-failures-cost-global-economy-hundreds-billions-3801022), [WePoint](https://www.wepoint.com/en/our-insights/the-aws-and-azure-outages-of-october-2025-analysis-lessons-and-resilience-strategies/) |
| 4 | ベンダーロックインは深刻な問題で、独自API・専用技術への依存によりクラウドプロバイダーの乗り換えが極めて困難になる。データ移行時にはエグレス（送出）料金が発生し、アプリケーションの再設計も必要になるため、実質的に「囲い込み」状態になる。 | 🟢高 | [Cloudflare - What is vendor lock-in?](https://www.cloudflare.com/learning/cloud/what-is-vendor-lock-in/), [Cast AI](https://cast.ai/blog/vendor-lock-in-and-how-to-break-free/), [DRJ](https://drj.com/industry_news/understanding-the-risks-of-cloud-vendor-lock-in/) |
| 5 | 欧州のクラウドインフラ市場の97%が非欧州（主に米国・中国）のプロバイダーに支配されている。米国のCLOUD法はEU域内のデータにも米国当局がアクセスできると定めており、GDPRと直接矛盾する。企業はどちらの法律に従ってももう一方に違反するリスクを負う。 | 🟢高 | [ISACA](https://www.isaca.org/resources/news-and-trends/industry-news/2024/cloud-data-sovereignty-governance-and-risk-implications-of-cross-border-cloud-storage), [Exoscale - CLOUD Act vs GDPR](https://www.exoscale.com/blog/cloudact-vs-gdpr/), [TechClass](https://www.techclass.com/resources/learning-and-development-articles/data-sovereignty-what-it-means-for-european-businesses-in-2025) |
| 6 | 2023年、米国のデータセンターは176TWhの電力を消費し（全米電力消費の4.4%）、約1億500万トンのCO2を排出。2030年には最大1,050TWhまで増加し、全米電力消費の約12%に達する見込み。データセンターは1日に数百万ガロンの水も消費する。 | 🟢高 | [EESI](https://www.eesi.org/articles/view/data-center-energy-needs-are-upending-power-grids-and-threatening-the-climate), [Cornell Chronicle](https://news.cornell.edu/stories/2025/11/roadmap-shows-environmental-impact-ai-data-center-boom), [Carbon Brief](https://www.carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context/) |
| 7 | CIOの86%がパブリッククラウドからプライベートクラウドまたはオンプレミスへワークロードを戻す「クラウドリパトリエーション」を計画。ただし全面撤退を計画しているのは約8%のみで、多くはハイブリッド戦略を採用。GEICOはクラウド移行後にコストが2.5倍に増加し、一部をオンプレに戻した。 | 🟢高 | [BizTech Magazine](https://biztechmagazine.com/article/2025/08/why-some-workloads-are-coming-home-case-cloud-repatriation), [Kyndryl](https://www.kyndryl.com/us/en/about-us/news/2025/06/enterprise-data-repatriation-trend), [HyScaler](https://hyscaler.com/insights/cloud-repatriation-the-strategic-shift-in-it/) |
| 8 | 一般消費者が使う「クラウド」（iCloud、Google Drive等）と企業向け「クラウド」（AWS、Azure等）は根本的に異なるサービス。iCloudは個人向けバックアップ・ファイル保存サービスだが、AWSは数百種類のサービスを提供するインフラプラットフォーム。この混同が「クラウド」という言葉の理解を難しくしている。 | 🟡中 | [Medium - Confused by 'The Cloud'?](https://medium.com/@philgpearson/confused-by-the-cloud-3eb48927ed35), [Quora](https://www.quora.com/What-is-the-difference-between-AWS-and-iCloud) |
| 9 | 2024年、パブリッククラウドを利用する組織の27%がセキュリティインシデントを経験（前年比10%増）。1アカウントあたり平均43件の設定ミスが存在する。クラウド侵害の65%は漏洩した認証情報が起点で、設定ミスのあるシステムが悪用された。 | 🟢高 | [SentinelOne - Cloud Security Statistics](https://www.sentinelone.com/cybersecurity-101/cloud-security/cloud-security-statistics/), [Sprinto](https://sprinto.com/blog/cloud-security-statistics/), [CSA](https://cloudsecurityalliance.org/press-releases/2025/04/29/cloud-security-alliance-issues-top-threats-to-cloud-computing-deep-dive-2025) |
| 10 | 「クラウドは常に安い」は誤解。Accentureの調査ではTCO（総所有コスト）で30〜40%の節約が可能とされるが、管理不十分だと想定外のコスト増になる。サーバー購入＋コロケーションはクラウドインスタンスの10〜30分の1の費用という試算もある。 | 🟡中 | [S-PRO - Cloud vs On Premise Cost](https://s-pro.io/blog/cloud-computing-vs-on-premises-advantages-disadvantages-and-cost-comparison), [DataBank](https://www.databank.com/resources/blogs/on-prem-vs-cloud-cost-comparison-10-cost-factors-you-must-compare-before-deciding/), [Cloudvara](https://cloudvara.com/cloud-vs-on-premise-costs/) |
| 11 | 2025年のデータ侵害の平均被害額は440万ドル。クラウドに保存されたデータは複数の地理的拠点に分散するため、利用者の法的管轄外に置かれる可能性がある。クラウドアカウントが侵害されると、数年分の蓄積データに一瞬でアクセスされるリスクがある。 | 🟢高 | [CISA](https://www.cisa.gov/resources-tools/training/get-most-out-cloud-storage-and-services-while-minimizing-risk), [Coursera](https://www.coursera.org/articles/cloud-data-security), [GeeksforGeeks](https://www.geeksforgeeks.org/blogs/privacy-challenges-in-cloud-computing/) |
| 12 | 「クラウドは誰かのコンピュータに過ぎない」は半分正しく半分間違い。物理サーバー上で動いているのは事実だが、仮想化・冗長化・自動スケーリング・グローバル分散など、単なる「他人のPC」とは根本的に異なる技術基盤がある。ただし「自分のデータが物理的にどこかに存在している」という意識は重要。 | 🟡中 | [NETWAYS](https://nws.netways.de/en/blog/2025/12/31/cloud-busting-10-common-misconceptions-about-the-cloud/), [WWT](https://www.wwt.com/article/five-common-misconceptions-about-the-cloud) |

---

## まとめ

クラウドコンピューティングは万能ではなく、以下の重要な課題・限界がある。

**コスト面**: 「クラウド=常に安い」は大きな誤解。安定した負荷のワークロードでは長期的にオンプレミスの方が安くなるケースが多く、37signalsやGEICOのように実際にクラウドから撤退（リパトリエーション）する企業が増加中。CIOの86%が一部ワークロードの回帰を計画している。

**セキュリティ面**: クラウドプロバイダーのインフラ自体は強固だが、「共有責任モデル」の複雑さにより、ユーザー側の設定ミスが侵害の主因（99%がユーザー責任）。1アカウント平均43件の設定ミスが存在し、2024年には27%の組織がセキュリティインシデントを経験した。

**信頼性**: 2025年だけでも大手3社で100件以上の障害が発生。1つのリージョン障害がグローバルに波及し、数十億ドル規模の経済的損失をもたらすリスクがある。

**法的・主権問題**: 米国CLOUD法とEU GDPRの直接的な矛盾に象徴されるように、クラウドに預けたデータがどの国の法律に従うかは非常に複雑な問題。欧州のクラウド市場の97%が非欧州企業に支配されている現実がある。

**環境負荷**: データセンターの電力消費は急増中で、2030年には米国全体の電力消費の12%に達する見込み。水の消費量も膨大。

**ベンダーロックイン**: 一度特定のクラウドに深く依存すると、独自APIやエグレス料金のために事実上乗り換えが不可能になる。

**一般視聴者への示唆**: 消費者向けクラウド（iCloud等）と企業向けクラウド（AWS等）の混同が「クラウド」の理解を妨げている。「クラウド=誰かのコンピュータ」は部分的に正しいが、その裏には高度な技術基盤がある。ただし、自分のデータが物理的にどこかのサーバーに存在し、その国の法律に従う可能性があるという事実は忘れてはならない。
