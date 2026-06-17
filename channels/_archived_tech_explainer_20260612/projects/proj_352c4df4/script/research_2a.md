# Research 2a — 基本情報・仕組み・通説

## ネットに一度上げた写真はなぜ完全に消せないのか

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | CDN（コンテンツ配信ネットワーク）は、オリジンサーバーのコンテンツを世界中のエッジサーバーに自動複製する。TTL（Time To Live）で一定期間キャッシュが保持され、Perma-Cache機能を使えばエッジストレージに恒久的にコピーが残る。つまり画像を1回アップするだけで、地理的に分散した複数拠点にコピーが生成される。 | 🟢高 | [Cloudflare - What is caching?](https://www.cloudflare.com/learning/cdn/what-is-caching/)、[Bunny CDN Perma-Cache](https://bunny.net/cdn/perma-cache/) |
| 2 | Facebookは2,400億枚以上の写真を保存しており、毎日3億5,000万枚の新規写真がアップロードされている。月に7ペタバイトのストレージ機器を追加導入している。コールドストレージ用データセンター（1棟で1エクサバイト規模）を米国・スウェーデン等に複数展開し、Reed-Solomon誤り訂正符号による冗長化でデータ消失を防いでいる。 | 🟢高 | [Meta Engineering - Cold Storage](https://engineering.fb.com/2015/05/04/core-infra/under-the-hood-facebook-s-cold-storage-system/)、[Data Center Knowledge](https://www.datacenterknowledge.com/data-storage/facebook-builds-exabyte-data-centers-for-cold-storage) |
| 3 | Internet Archive（Wayback Machine）は2025年10月時点で1兆ページ以上をアーカイブしており、ユニークデータ量は99ペタバイト、バックアップ含め212ペタバイト超に達する。1日あたり150テラバイトのデータを新規保存しており、誰でもウェブページのスナップショットを閲覧可能。 | 🟢高 | [Wayback Machine - Wikipedia](https://en.wikipedia.org/wiki/Wayback_Machine)、[PC Gamer - TIL the Wayback Machine](https://www.pcgamer.com/hardware/til-the-wayback-machine-saves-150-000-gigabytes-of-webpages-every-day-and-lives-in-a-church-in-san-francisco/) |
| 4 | Googleは2024年2月にウェブキャッシュサービスを廃止、Bingも2024年12月に追随した。ただし廃止前は、低トラフィックのページで30〜60日間キャッシュが残存し、頻繁に更新されるサイト（Wikipediaなど）は1日に複数回クロール・再インデックスされていた。キャッシュ廃止後もインデックス自体は残り、検索結果から完全に消えるには別途削除申請が必要。 | 🟢高 | [Search Engine Land - Cached pages in SEO](https://searchengineland.com/guide/cached-pages)、[Search engine cache - Wikipedia](https://en.wikipedia.org/wiki/Search_engine_cache) |
| 5 | GDPR第17条「忘れられる権利（right to erasure）」は、個人が組織に対して自分の個人データの削除を要求できる権利を定めている。2014年5月のGoogle Spain対Costeja González判決（CJEU）が先駆けとなった。ただし表現の自由・法的義務・公益目的など6つの例外があり、絶対的な権利ではない。組織は請求から1か月以内に対応する義務がある。 | 🟢高 | [GDPR.eu - Right to be forgotten](https://gdpr.eu/right-to-be-forgotten/)、[Art. 17 GDPR](https://gdpr-info.eu/art-17-gdpr/)、[European Commission](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/dealing-citizens/do-we-always-have-delete-personal-data-if-person-asks_en) |
| 6 | Googleは2014年5月〜2024年1月の間に約610万ページ分のリンク削除リクエストを受理した。2022年だけで15万5千件超の「忘れられる権利」請求があり、Facebook（12万9千URL）、X/Twitter（7万2千URL）、YouTube（5万3千URL）が削除対象の上位プラットフォームだった。 | 🟢高 | [Google Transparency Report](https://transparencyreport.google.com/eu-privacy?hl=en)、[Surfshark Research](https://surfshark.com/research/study/right-to-be-forgotten)、[ExpressVPN Blog](https://www.expressvpn.com/blog/3-2-million-right-to-be-forgotten-requests-since-2014/) |
| 7 | 「デジタルタトゥー」とは、ネット上に公開された書き込み・写真・個人情報が一度拡散すると完全に削除が不可能であることを入れ墨に例えた比喩表現。日本では警察庁統計で令和5年にSNSに起因する犯罪の被害児童数が1,488人に上る。軽い気持ちの投稿が数時間で全国に拡散し、進路・就職・企業イメージに甚大な影響を与えるケースが報告されている。 | 🟡中 | [デジタルタトゥー - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%BF%E3%83%88%E3%82%A5%E3%83%BC)、[ALSOK - デジタルタトゥーとは](https://www.alsok.co.jp/person/recommend/2179/)、[elplanning.co.jp](https://www.elplanning.co.jp/column/sns_trouble_measures/digital-tattoo/) |
| 8 | SNSプラットフォームは画像をデータベースとは別のストレージ（S3等のオブジェクトストレージ）に保存し、データベースにはパスとメタデータのみ格納する。アップロード時に画像は圧縮・リサイズされ、複数サイズのサムネイルが自動生成される。ユーザーが「削除」しても、バックアップ・CDNキャッシュ・ログに一定期間残る可能性がある。 | 🟡中 | [Treehouse Community](https://teamtreehouse.com/community/what-is-considered-the-best-practice-for-storing-images-in-a-database-how-do-twitter-and-instagram-store-images)、[Meta Engineering - Tectonic](https://engineering.fb.com/2021/06/21/data-infrastructure/tectonic-file-system/) |
| 9 | スクリーンショット・Webスクレイピング・サードパーティ製リポストアプリにより、元の投稿者が削除しても第三者の端末やサーバーにコピーが残る。InstagramやXでリポスト機能をオフにしても、スクリーンショットの取得自体はプラットフォーム側で技術的に防止できない。スクレイピングbotは自動的にSNSを巡回し、画像・テキストを大量収集する。 | 🟢高 | [Anura - Web Scraping Social Media](https://www.anura.io/blog/understanding-how-web-scraping-impacts-social-media-privacy)、[Scrapfly - Social Media Scraping 2026](https://scrapfly.io/blog/posts/social-media-scraping) |
| 10 | Metaのコールドストレージデータセンターは、電力冗長設備（UPS・発電機）を持たず、ソフトウェアレベルの冗長化（レプリケーション）のみで耐障害性を確保している。最新のユタ州Eagle Mountainデータセンターは3〜12エクサバイト規模と推定される。2025年時点でPetaBoxラック1台あたり1.4PBを格納可能（2004年の100TB/ラックから14倍に成長）。 | 🟢高 | [Data Center Knowledge - Cold Storage](https://www.datacenterknowledge.com/archives/2015/05/08/cold-storage-the-facebook-data-centers-that-back-up-the-backup)、[Internet Archive Petabox](https://archive.org/web/petabox) |

## まとめ

インターネットに一度アップロードされた写真が「完全に消せない」理由は、単一の技術的要因ではなく、複数の仕組みが重層的に作用している。

**1. インフラレベルの複製**: CDNは画像を世界中のエッジサーバーに自動複製し、データセンターではReed-Solomon符号等による冗長化が施される。Metaだけでも2,400億枚の写真をエクサバイト規模で保存しており、削除命令が全レプリカに即時反映されることは技術的に困難である。

**2. 第三者によるアーカイブ・キャッシュ**: Internet Archiveは1兆ページ・99PBを保有し、1日150TBの新規データを取り込み続けている。検索エンジンのキャッシュ（2024年に主要サービスは廃止）やWebスクレイピングbotも、元サイトとは独立にデータのコピーを保持する。

**3. ヒューマンファクター**: スクリーンショット、リポスト、ダウンロードなど、ユーザー自身の行動によるコピーは技術的に防止不可能。一度拡散した情報は「デジタルタトゥー」として半永久的に残存する。

**4. 法的手段の限界**: GDPR「忘れられる権利」は強力だが、表現の自由等の例外規定があり、かつEU域外への実効性は限定的。Googleへの削除請求は10年間で610万ページに上るが、検索結果からの非表示にすぎず、元データ自体の消去を保証するものではない。
