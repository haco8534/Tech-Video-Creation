# Research 1b — 反論・例外・通説への異議

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 1 | 37signals（Basecamp/HEY運営）は2022年10月、DHH（David Heinemeier Hansson）が「Why We're Leaving the Cloud」を公開しクラウド離脱を宣言。2022年のクラウド支出は年間約320万ドル（約3,201,564ドル） | 🟢 | [Why we're leaving the cloud - DHH](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0) | 2022年、Basecampのクラウド離脱宣言。動画の中心事例 |
| 2 | 37signalsはDellサーバーへ約70万ドルを投資してオンプレ移行。2024年時点でクラウド請求が年間約320万ドル→約130万ドルに。最終的に5年で総額1,000万ドル超の節約見込みと修正 | 🟢 | [Our cloud-exit savings will now top ten million over five years - DHH](https://world.hey.com/dhh/our-cloud-exit-savings-will-now-top-ten-million-over-five-years-c7d9b5bd) | 当初は5年で700万ドル見込み、実績上振れ |
| 3 | 37signalsは2025年、Pure Storageに150万ドルで18PB分のストレージを購入。従来AWS比で年間約130万ドルの運用コスト削減 | 🟢 | [37signals on-prem migration to save millions - The Register](https://www.theregister.com/2025/05/09/37signals_cloud_repatriation_storage_savings/) | ストレージ部分だけでも大幅削減 |
| 4 | a16z（Andreessen Horowitz）のSarah Wang・Martin Casadoによる"The Cost of Cloud, a Trillion Dollar Paradox"（2021）は「スタート時はクラウドを使わないと狂気だが、大規模化して居残ると狂気」と結論。上場SaaS 50社の試算でクラウド費用が株式時価総額の約50%相当を削っていると指摘 | 🟢 | [The Cost of Cloud, a Trillion Dollar Paradox - a16z](https://a16z.com/the-cost-of-cloud-a-trillion-dollar-paradox/) | 数千億ドル規模のコストパラドックス。VC視点からの一次レポート |
| 5 | Dropboxは2013年から"Magic Pocket"プロジェクトでAWS S3から自社DCへ移行。2015年10月までに90%のユーザーデータを自社移行完了。IPO直前のSEC提出書類で運用コスト7,500万ドル削減が判明 | 🟢 | [Why Dropbox decided to drop AWS - TechCrunch](https://techcrunch.com/2017/09/15/why-dropbox-decided-to-drop-aws-and-build-its-own-infrastructure-and-network/) | 500PBスケールでのクラウド離脱成功事例 |
| 6 | 「クラウド」の概念は1961年、ジョン・マッカーシー（AI研究の父）がMIT100周年講演で「computing may someday be organized as a public utility」と予言済み。1960年代のタイムシェアリング（IBM・GEが提供）は現代クラウドのSaaSモデルとほぼ同型 | 🟢 | [John McCarthy - Wikipedia](https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)) | 「クラウド＝新しい技術」は誤解。概念は60年前から存在 |
| 7 | 「Cloud Computing」という語句の最古の文書化は1996年11月14日付けCompaq社内資料「Internet Solutions Division Strategy for Cloud Computing」。発案はCompaqのGeorge FavaloroとSean O'Sullivan。つまり「クラウド」はそもそもマーケティング用語として生まれた | 🟢 | [Who Coined 'Cloud Computing'? - MIT Technology Review](https://www.technologyreview.com/2011/10/31/257406/who-coined-cloud-computing/) | 技術用語ではなくビジネス用語として誕生 |
| 8 | NIST SP 800-145（2011）が定義する「クラウド」の5つの本質特性は①オンデマンド・セルフサービス、②広帯域ネットワークアクセス、③リソースプーリング、④高速な伸縮性、⑤計測可能なサービス。つまり「インターネット越しのサーバー」だけでは定義的にクラウドではない | 🟢 | [The NIST Definition of Cloud Computing (SP 800-145)](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-145.pdf) | 学術・公的定義と、マーケ「クラウド」の乖離 |
| 9 | IEAによると2024年のデータセンター世界電力消費は約415TWh（世界電力の約1%強、CO2の0.5%）。2030年には945TWhへ倍増見込み。米国では2024年に183TWh（米電力の4%超）消費 | 🟢 | [Data centres & networks - IEA](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks) | 「雲」のイメージと真逆：巨大な物理電力消費 |
| 10 | 1MWのデータセンターは冷却だけで年間最大約2,550万リットルの水を消費（約30万人の1日分）。大型施設は日量500万ガロン（約1,900万リットル）超。2030年までに世界のDC水使用量が3倍になる予測も | 🟡 | [Cloud's hidden cost: Data centre water consumption - CloudComputing-News](https://www.cloudcomputing-news.net/news/data-centre-water-consumption-crisis/) | 水資源逼迫地域での社会問題化 |
| 11 | AWSの送信（egress）料金は0.09ドル/GBから。DigitalOcean（0.01ドル/GB）等の競合より約9倍高い。これがベンダーロックインの主要メカニズムと指摘され、規制当局の調査対象に。2024年以降AWSは「AWSから完全離脱する場合」に限りegress無料化 | 🟡 | [AWS's Egregious Egress - Cloudflare Blog](https://blog.cloudflare.com/aws-egregious-egress/) | egress料金は独禁法調査対象 |
| 12 | IDC 2024年調査：約80%の組織が今後12ヶ月で何らかのクラウドワークロード撤収を計画。Barclays CIO Survey（2024末）では86%のCIOが「パブリッククラウドから一部をプライベート/オンプレへ戻す」意向、過去最高。2024年に59%の組織がクラウド予算超過 | 🟢 | [Why cloud repatriation is back on the CIO agenda - CIO](https://www.cio.com/article/4061031/why-cloud-repatriation-is-back-on-the-cio-agenda.html) | 大規模な「揺り戻し」 |
| 13 | Shadow IT（非公認SaaS）は大企業IT支出の30〜40%を占めると推計。SaaSライセンスの約50%が未使用のまま放置。48%のエンタープライズアプリが管理者不在。IT職員の83%が非公認ツールを業務利用 | 🟡 | [45+ Shadow IT Statistics for 2024 - QuandaryCG](https://www.quandarycg.com/shadow-it-statistics/) | 「クラウド便利」の裏側：管理崩壊コスト |
| 14 | Uberはかつて90%以上を自社DC運用。現在はGCP/Oracleを使いつつ「Uber Metal」と呼ぶ独自オンプレ基盤も併用。理由は「at scale, Uber can achieve price/performance that rivals cloud」＝大規模では自前の方が安い | 🟡 | [Uber backs hybrid cloud - ComputerWeekly](https://www.computerweekly.com/news/252452059/Uber-backs-hybrid-cloud-as-route-to-business-and-geographical-expansion) | スケール閾値でクラウド経済性が逆転 |
| 15 | DHH論旨：クラウドは①超小規模・低トラフィック、②極端に変動の激しい負荷——の両端でのみ真価を発揮。安定成長の中規模企業ではコスト上不利。HEY（メールサービス）だけでDB/検索に年50万ドル超を支払っていた | 🟢 | [Why we're leaving the cloud - DHH](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0) | 「どこで効くか／効かないか」の条件提示 |
| 16 | AWSの営業利益率は約30%（ハイパースケーラー全般）。a16zレポートはこの高マージンが顧客側コストに転嫁されていると指摘 | 🟡 | [The Cost of Cloud, a Trillion Dollar Paradox - a16z](https://a16z.com/the-cost-of-cloud-a-trillion-dollar-paradox/) | 「安い」どころか、他社の利益を肩代わり |

## 通説 vs 一次情報（核心論点）

- **通説①「クラウドは常に安い」** → **一次情報**: a16zは上場SaaS 50社でクラウド費用が株式時価総額の約50%相当を削ると試算。37signalsは自社運用に戻して5年で1,000万ドル超節約。Dropboxは7,500万ドル削減。中〜大規模で予測可能な負荷ではオンプレの方が安い、が正確な答え。

- **通説②「クラウドは最新の革新的テクノロジー」** → **一次情報**: 1961年にMITでジョン・マッカーシーが「コンピューティングは公共インフラになる」と予言済み。1960年代のタイムシェアリング（IBM・GEが商用提供）は現代SaaSとほぼ同型モデル。技術ではなく「ブロードバンド＋仮想化＋課金モデル」の再包装。

- **通説③「クラウドはどこかの魔法の場所」** → **一次情報**: 実態は誰かの物理データセンター。世界で年間415TWh（2024）の電力を食い、1施設が日量数百万リットルの冷却水を消費する巨大重工業。「雲」の名前とは正反対の物理実体。

- **通説④「クラウド＝インターネット越しのサーバー全般」** → **一次情報**: NIST SP 800-145は5つの必須特性（セルフサービス／広帯域網／リソースプール／高速弾性／計測課金）を規定。これを満たさない「ただのVPS」や「ただのホスティング」は定義上クラウドではない。マーケティングはこの定義を無視して濫用。

- **通説⑤「クラウドに乗せれば自動で柔軟・自由になる」** → **一次情報**: AWSの送信料金0.09ドル/GB（DigitalOceanの約9倍）は独禁法調査対象のロックイン機構。データを出すのが高すぎて事実上出られない。2024年の圧力でAWSは「完全離脱時のみ」egress無料化した（＝普段は高い）。

- **通説⑥「みんなクラウドに行っている片道切符」** → **一次情報**: IDC 2024では80%の組織が1年以内に何らかのワークロード撤収を計画。Barclays CIO Survey 2024末では86%のCIOがパブリック→プライベート/オンプレへの回帰意向。Dropbox・37signals・Basecamp・Uber（自社Metal併用）など大型事例が多数。

- **通説⑦「クラウドを使えばIT管理がシンプルに」** → **一次情報**: Shadow IT／SaaSスプロールが大企業IT支出の30〜40%を占め、48%のアプリが「担当者不在」。DHHも「組織規模で運用チームは縮小できなかった」と明言。管理対象が"サーバー"から"契約と権限"に移っただけで、複雑度は下がっていない。

## キーインサイト

### 「クラウド」という言葉自体のマーケティング性
- 用語の最古の文書化が1996年のCompaq社内戦略資料であり、技術論文ではなくビジネス戦略として生まれた
- 概念自体は60年前のマッカーシー（1961）・1960年代タイムシェアリングからほぼ変わらない
- つまり「クラウド」は新技術の名前ではなく、"コンピューティングを公共料金モデルで売る"という"販売形態"の総称
- NISTの厳密定義と、マーケで使われる雑な「クラウド」の間にギャップが常にある

### クラウドが機能する条件／しない条件
- **機能する**: 小規模・低トラフィック（複雑度回避）／負荷変動が極端（10台か100台か分からない）／立ち上げ期スタートアップ（CAPEX回避）／一時的な計算需要（ML実験など）
- **機能しない**: 中〜大規模で予測可能な定常負荷／ストレージ大量保持（egress料金がボディブロー）／レイテンシ・パフォーマンスが差別化要素（Dropbox型）／規制上データを自国内に置く必要（2026 Nutanix調査で57%）

### 動画で「えっ」を生む反直感ファクト（3件以上）
1. **「クラウド」は技術用語ではなく、1996年Compaqのマーケティング資料が初出の"商売の言葉"**。しかも概念は1961年のMIT講演にすでにある。つまり"最新技術"でもなんでもない
2. **37signals（Basecamp）は自社DCへ戻すことで5年で1,000万ドル節約**。Dropboxは7,500万ドル削減。「クラウドは安い」は規模と負荷次第で完全に逆転する
3. **世界のデータセンターは2024年に年間415TWh電力消費（世界の約1%）、1施設が日量最大1,900万リットルの水を冷却に使う**。"雲"の裏側は重工業で、「クラウド＝エコで軽い」はイメージ操作
4. **AWSの送信料金は競合の約9倍で、それが事実上の"データ人質"として独禁法調査対象に**。完全離脱時のみ無料化されるという条件付き譲歩
5. **86%のCIOが2024年末時点で「一部をパブリッククラウドから戻したい」と回答（Barclays調査の過去最高値）**。片道切符どころか、大きな揺り戻しが進行中

### 動画構成への示唆
- 「クラウドってすごい！便利！」の後に、「じゃあなぜ大企業がわざわざ離脱しているのか？」と反転させる構造が強い
- DHH／Dropboxの実名事例はインパクト大（数字が具体的）
- 「雲」の名前から入り、その裏の物理実体（電力・水・巨大建屋）を見せる"ネーミングの欺瞞"切り口は視覚的に効く
- NIST定義を出すと「そもそもクラウドって何？」の再定義ができ、"言葉の曖昧さ"の伏線回収になる
