# Research 1c — 歴史的経緯・設計思想・日常接続

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| 1 | 1961年、MIT創立100周年記念講演でJohn McCarthyが「Computing may someday be organized as a public utility just as the telephone system is a public utility（コンピューティングはいつか電話のような公共ユーティリティとして組織化されるだろう）」と発言。加入者は使った分だけ払えばよいとも述べた | 🟢 | [MIT Technology Review "The Cloud Imperative"](https://www.technologyreview.com/2011/10/03/190237/the-cloud-imperative/) / [computinginthecloud.wordpress.com (McCarthy 原文引用)](https://computinginthecloud.wordpress.com/2008/09/25/utility-cloud-computingflashback-to-1961-prof-john-mccarthy/) | ユーティリティコンピューティングの予言。McCarthyはAIの名付け親でもある |
| 2 | 「cloud computing」という言葉自体の最古の文書記録は、1996年11月のCompaq社内文書「Internet Solutions Division Strategy for Cloud Computing」および1997年5月のNetCentricによる商標出願 | 🟢 | [MIT Technology Review "Who Coined 'Cloud Computing'?"](https://www.technologyreview.com/2011/10/31/257406/who-coined-cloud-computing/) | CompaqのGeorge FavaloroとNetCentricのSean O'Sullivanが関わる |
| 3 | 「雲」のメタファー自体は、1994年にAndy Hertzfeld（Macintosh開発者の1人）がGeneral MagicのTelescriptで分散コンピューティングを示す記号として使ったのが初期例。さらに遡るとネットワーク図でインターネット部分を雲形で描く慣習に由来 | 🟡 | [History of cloud computing — Wikipedia](https://en.wikipedia.org/wiki/History_of_cloud_computing) | 「詳細を抽象化した実体」としての雲 |
| 4 | Amazon EC2は2006年8月25日にベータ版としてローンチ。2008年10月23日に正式サービス化（betaラベル撤去） | 🟢 | [AWS公式 "Announcing Amazon Elastic Compute Cloud (Amazon EC2) - beta"](https://aws.amazon.com/about-aws/whats-new/2006/08/24/announcing-amazon-elastic-compute-cloud-amazon-ec2---beta/) / [AWS Blog "Happy 15th Birthday Amazon EC2"](https://aws.amazon.com/blogs/aws/happy-15th-birthday-amazon-ec2/) | 「EC」は Elastic Compute |
| 5 | EC2の原案は2003年後半にChris PinkhamとBenjamin Blackの社内ペーパーで提案。実装は南アフリカ・ケープタウンのチーム（Pinkham, Willem van Biljon, Christopher Brown）が主導 | 🟢 | [TechCrunch "How Amazon EC2 grew..."](https://techcrunch.com/2021/08/28/how-amazon-ec2-grew-from-a-notion-into-a-foundational-element-of-cloud-computing/) / [Quartz Africa](https://qz.com/africa/1969651/the-south-african-origins-of-andy-jassys-amazon-web-services) | 「Amazon社内インフラの完全標準化・自動化・Web サービス化」が出発点 |
| 6 | Salesforceは1999年3月8日、Marc Benioffらにより設立。最初からSaaS（Software-as-a-Service）モデルで業務アプリを提供することを目的に作られた最初の企業の1つ | 🟢 | [Salesforce History — Salesforce Ben](https://www.salesforceben.com/salesforce-history/) / [Wikipedia: Salesforce](https://en.wikipedia.org/wiki/Salesforce) | 「No Software」キャンペーンで有名 |
| 7 | NIST SP 800-145（2011年確定）がクラウドコンピューティングの公式定義を確立。5つの本質的特性は (1) オンデマンドのセルフサービス (2) 広範なネットワークアクセス (3) リソースプーリング (4) 高速なエラスティシティ (5) 計測されたサービス（従量課金） | 🟢 | [NIST SP 800-145 PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-145.pdf) | 仮想化・API・従量課金の組み合わせが正式に要件化された |
| 8 | Netflixは2008年のDB障害を契機にAWSへの移行を決断。2009年から移行開始し、2016年1月に完全移行完了。AWSで1万以上のEC2インスタンスを弾力的にスケールさせ、数億人のストリーミングを支える | 🟡 | [AWS Netflix Case Study](https://aws.amazon.com/solutions/case-studies/innovators/netflix/) / [Matillion blog](https://www.matillion.com/blog/why-did-netflix-migrate-to-the-aws-cloud) | 「視聴者が既にクラウドを使っている」代表例 |
| 9 | 世界の海底ケーブル総延長は2025年初頭で約148万km（地球約37周分）。570本が運用中、81本が計画中。大陸間インターネット通信の97〜98%を担う | 🟢 | [TeleGeography Submarine Cable Map 2025](https://submarine-cable-map-2025.telegeography.com/) / [TeleGeography Blog 2025](https://blog.telegeography.com/building-tomorrows-internet-an-update-on-new-cable-investment) | 「雲」の正体は物理的な光ケーブル |
| 10 | ハイパースケールデータセンターは10エーカー（約4万m²、東京ドーム約0.9個分）以上が目安。Googleの初期ハイパースケール施設は約1.3百万sq-ft（約12万m²、東京ドーム約2.6個分）。消費電力は1サイトあたり20〜100MW、最大級は650MWを超える（中規模発電所1基分） | 🟢 | [C&C Technology Group "How Much Power Does a Hyperscale Data Center Use?"](https://cc-techgroup.com/how-much-power-does-a-hyperscale-data-center-use/) / [Data Center Knowledge 2025](https://www.datacenterknowledge.com/hyperscalers/did-hyperscalers-solve-the-power-problem-in-2025-or-rethink-it-) | 東京ドーム建築面積46,755m²で換算 |
| 11 | 米バージニア州アシュバーン（ラウドン郡）は世界最大のデータセンター集積地で「Data Center Alley」と呼ばれ、世界のウェブトラフィックの約70%が通過すると言われる。北バージニアのデータセンター容量はダブリン・ロンドン・フランクフルト・アムステルダム・シンガポール・シドニーの合計を上回る | 🟡 | [Governing.com "The Data Center Capital..."](https://www.governing.com/infrastructure/the-data-center-capital-of-the-world-is-in-virginia) / [UPSTACK "Why is Ashburn known as Data Center Alley"](https://upstack.com/blog/why-is-ashburn-known-as-data-center-alley/) | 「視聴者の雲」の物理的所在の代表例 |
| 12 | アイルランド・ダブリンは欧州の主要クラウド拠点。約123施設、総電力1,658MW。Googleの Grange Castle 2 は60MW/約30,000m² | 🟡 | [Baxtel Dublin Data Center Market](https://baxtel.com/data-center/dublin) | 税制・法人所在地の理由でMeta/Google/Microsoftが集中 |
| 13 | 「There is no cloud — it's just someone else's computer」は、クラウドの本質を言い表すミーム。2016年2月のDavid Whittakerのツイート等で拡散 | 🟡 | [LinkedIn "Is the cloud really just someone else's computer?"](https://www.linkedin.com/pulse/cloud-really-just-someone-elses-computer-marcelo-oliveira) / [Lindsay Hill "Cloud: Not Just Someone Else's Computer"](https://lkhill.com/cloud-not-just-computer/) | 視聴者への「脱・神秘化」メッセージに使える |
| 14 | Spotifyは2016年にGoogle Cloudへ全面移行。1,200サービス・2万件/日のバッチジョブを自社DCから移した | 🟡 | [DEV.to "Cloud Migration Strategies - Netflix and Spotify"](https://dev.to/citrux-digital/cloud-migration-strategies-success-stories-of-netflix-and-spotify-118h) | 「日常のSpotifyも雲」 |

## タイムライン

- **1961**: John McCarthy が MIT 創立100周年で「コンピューティングは電話のようなユーティリティになる」と予言。同時期にタイムシェアリング（Project MAC など）が登場
- **1960s〜1970s**: メインフレーム + 端末（ダム端末）でのタイムシェアリングが普及。その後PCの登場で「中央集権コンピューティング」はいったん退潮
- **1994**: Andy Hertzfeld が General Magic の Telescript で分散コンピューティングを「雲」のメタファーで表現（最初期の用例の1つ）
- **1996〜1997**: Compaq社内文書と NetCentric 商標出願に「cloud computing」の語が登場
- **1999**: Salesforce 設立。SaaS（業務アプリをブラウザから月額課金で使う）を本格商業化
- **2002**: Amazon Web Services のブランド下で最初のWebサービス群が提供開始
- **2006年8月**: Amazon EC2 ベータローンチ。「仮想サーバを分単位で借りてAPIで立ち上げ、使った分だけ払う」が世界で初めて実用化。同年 Google も "Google Apps for Your Domain"（現 Google Workspace の源流）を発表
- **2008〜2010**: Microsoft Azure (2010年正式)、Google App Engine (2008年) が参入。NetflixがAWS移行を開始（2009年）
- **2011年9月**: NIST SP 800-145 がクラウドの公式定義を確定（5特性・3サービスモデル・4展開モデル）
- **2016**: Netflix がAWS全面移行完了、Spotify が Google Cloud に移行。「There is no cloud, it's just someone else's computer」ミームが広がる
- **2020年代**: ハイパースケーラー（AWS, Azure, Google Cloud）が世界のIT基盤に。生成AI需要で電力問題が表面化。北バージニア・ダブリン・シンガポールなどに巨大DCが集中
- **現在（2026）**: Synergy Research によればハイパースケーラーが世界のDC容量の4割超を占め、2030年までに6割到達見込み。海底ケーブルは約148万km

## 日常接続アナロジー候補

- **電気（ユーティリティ）**: 発電所＝データセンター、送電線＝インターネット/海底ケーブル、コンセント＝API/ブラウザ、電気料金メーター＝従量課金。McCarthy自身が使った比喩で歴史的にも正統
- **水道**: 浄水場＝データセンター、水道管＝光ファイバ、蛇口＝アプリ。「必要な時にひねればちょうど必要な分だけ出る」エラスティシティの説明に最適
- **銀行（お金を預ける）**: 自分のタンス貯金＝ローカルHDD、銀行＝クラウドストレージ、ATM＝どの端末からでもアクセスできるブロードネットワークアクセス。信用と可用性の話に使える
- **シェアリングエコノミー（AirbnbやUber）**: 1台の高性能車を皆で時間借り＝仮想化によるリソースプーリング、空いたら他人が使う＝マルチテナント
- **レンタカー vs マイカー**: 所有（オンプレ）と利用（クラウド）の比較、短時間だけ高級車に乗れる＝スケーラビリティ
- **コインランドリー**: 洗濯機を所有しなくても洗濯できる＝計算資源の所有から利用への転換

## キーインサイト

### 視聴者が既に日常で使っているクラウドサービス例
1. **Gmail / Googleドライブ / Googleフォト**: メール・書類・写真がGoogleのデータセンター（世界中）に保管
2. **iCloud**: iPhoneの写真やバックアップはApple（の一部はAWS/Google Cloud）のDCに
3. **Netflix**: 動画ストリーミングの裏側はAWS上で動く。Netflix自身は1台もストリーミングサーバを持っていない
4. **Instagram / LINE**: SNS投稿はクラウドに保存され、世界中から配信
5. **Spotify**: Google Cloud上で動く
6. **ChatGPT / 生成AI**: Microsoft Azure等のクラウド上の巨大GPUクラスタ
→ 「クラウド使ってますか？」と聞かれると「いや〜」と答える人も、実は毎日使っている、という導入に使える

### 「雲」という命名で面白い話
- ネットワーク図で、自分の担当外のインターネット部分を「雲形の絵」で曖昧に描く慣習が1970〜80年代からあり、そこから「詳細を気にしなくていい向こう側」=「cloud」に
- 語の初出者は謎のまま。1996年のCompaq内部メモと1997年のNetCentric商標出願が現存する最古の記録。MIT Tech Reviewが2011年に歴史を調査して「誰が最初か特定困難」と結論
- 人類史上、「抽象化の哲学」がそのまま商品名になった珍しい例。語源自体が「詳細を隠すという設計思想」を体現している
- John McCarthy は1961年の時点で、言葉こそ「utility」だったが、今のクラウドの経済モデルを正確に予言していた——その50年後にEC2で実現

### データセンターの物理的な規模感でインパクトがあるもの
- **東京ドーム換算**: ハイパースケール1サイトは建築面積で東京ドーム1〜3個分、大規模キャンパスになると10個分を超える
- **電力**: 最大級1サイトで650MW＝約65万世帯分の電力。生成AI需要で1GW（100万kW、原発1基分）級のDCも計画中
- **地理的集中**: バージニア州アシュバーンには200超のDCが集結し、**世界のウェブトラフィックの約70%**がここを経由すると言われる。視聴者がNetflixを見るとき、物理的にはバージニアの倉庫群から光が届いている可能性が高い
- **海底ケーブル**: 雲＝ワイヤレス、というイメージとは裏腹に、大陸間通信の97〜98%は物理的な海底ケーブル経由。総延長148万kmは地球37周分
- **1つの比喩**: 「君のスマホに映っている猫動画は、実は地球の反対側の倉庫から光ファイバを通って5,000km旅してきた光の粒」
