# Research 2b — 対立軸・比較・誤解されやすい点

## 調査テーマ: ネットに一度上げた写真はなぜ完全に消せないのか

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | **Googleの「忘れられる権利」削除承認率は約50%。** 2014年以降、Googleは累計320万件超のリクエストを受理。2022年時点の削除率は約56%だが、コンテンツ種類で大差がある。個人的なセンシティブ情報は97%削除される一方、政治関連情報は約20%しか削除されない。「忘れられる権利」は万能ではなく、公共性が高い情報ほど残される。 | 🟢高 | [Google Transparency Report](https://transparencyreport.google.com/eu-privacy?hl=en) / [Surfshark調査](https://surfshark.com/research/study/right-to-be-forgotten) |
| 2 | **Meta（Facebook/Instagram）はアカウント削除後も最大180日間データを保持する。** YouTubeやDiscordも同様に180日間保持。一方Telegramは1日で削除。さらにMetaは公開投稿からEXIFメタデータを表示上は除去するが、サーバー上にはオリジナル写真と全メタデータを広告・分析目的で保持し続けている。 | 🟢高 | [Security Magazine](https://www.securitymagazine.com/articles/101071-facebook-retains-consumer-data-for-180-days-post-account-deletion) / [Disaster Recovery Journal](https://drj.com/industry_news/social-media-privacy-ranking-facebook-instagram-youtube-keep-your-data-for-180-days-after-youve-deleted-your-account/) |
| 3 | **ストライサンド効果: バーブラ・ストライサンドの写真訴訟で、訴訟前のダウンロード数はわずか6回（うち2回は自身の弁護士）だったが、訴訟後1ヶ月で40万回以上閲覧された。** 同様の事例として、ビヨンセの2013年スーパーボウル「不利な写真」削除要請がBuzzFeedで逆に拡散された件、フランス軍事基地のWikipedia記事を諜報機関が強制削除させたら仏語版Wikipedia最多閲覧記事になった件がある。消そうとする行為自体が注目を集め拡散を加速させるパラドックス。 | 🟢高 | [Wikipedia: Streisand effect](https://en.wikipedia.org/wiki/Streisand_effect) / [Britannica](https://www.britannica.com/topic/Streisand-effect) |
| 4 | **Wayback Machineは2025年10月時点で1兆ページ超・99ペタバイト以上を保存。** 元サイトから削除してもWARC形式で独自サーバーに保存されており、robots.txtで将来のクロールは止められるが、過去のスナップショットは残る。CDNキャッシュもFacebook等で削除後最大30日間URLが生存する。技術的に「完全削除」が困難な理由は、データが複数の独立したシステムに複製されるアーキテクチャにある。 | 🟢高 | [Medium: Wayback Machine解説](https://medium.com/@MuhammedAsfan/%EF%B8%8F-how-the-wayback-machine-really-works-and-why-your-deleted-site-isnt-gone-e43b0ab0ddb8) / [Wikipedia: Wayback Machine](https://en.wikipedia.org/wiki/Wayback_Machine) |
| 5 | **日本の削除請求は明確な統一基準がなく、個別判断に依存。** 最高裁令和4年判決では、逮捕から約8年経過・罰金刑の効力消滅・報道記事削除済み・非公的人物といった条件下でツイート削除が認められた。ただし法律上の判断基準が不明確で、プラットフォームの任意対応に依存する部分が大きい。GDPRのような包括的な「忘れられる権利」は日本には存在しない。 | 🟡中 | [法学館憲法研究所](https://www.jicl.jp/articles/opinion_20220926.html) / [リコネス法律事務所](https://recones-law.com/2025/08/%E3%80%90%E6%B3%95%E5%BE%8B%E8%A7%A3%E8%AA%AC%E3%80%91%E3%83%8D%E3%83%83%E3%83%88%E8%A8%98%E4%BA%8B%E3%81%AF%E5%89%8A%E9%99%A4%E3%81%A7%E3%81%8D%E3%82%8B%EF%BC%9F%E6%9C%80%E9%AB%98%E8%A3%81%E5%88%A4/) |
| 6 | **米国では「忘れられる権利」は憲法上認められない。** 検索エンジンにコンテンツ削除を強制することは、合衆国憲法修正第1条（表現の自由）における「強制的言論」に該当し違憲とされる。一方EUでは2014年CJEU判決で認められており、プライバシー権と表現の自由の優先順位が地域で真逆。公共の利益に関する情報は削除対象外という制限もEU内で適用される。 | 🟢高 | [GW Law Student Briefs](https://studentbriefs.law.gwu.edu/ilpb/2023/02/28/privacy-vs-free-speech-challenges-with-adopting-the-european-unions-right-to-be-forgotten-in-the-united-states/) / [First Amendment Encyclopedia](https://firstamendment.mtsu.edu/article/right-to-be-forgotten/) |
| 7 | **「デジタルタトゥー」概念には過大評価の側面がある。** 実際にはGoogleの削除承認率56%が示すように、特定条件下では削除は機能する。また社会の価値観が変化すれば、かつての「汚点」が無意味化する可能性もある。問題の本質は技術的な不可能性よりも、(a) コピーの連鎖を追跡しきれない点、(b) プラットフォームがデータ保持にビジネス上のインセンティブを持つ点、(c) 法的枠組みが地域ごとにバラバラな点にある。 | 🟡中 | [Medium: Digital Tattoo考察](https://medium.com/@BekkaMaree/what-is-a-digital-tattoo-and-how-paranoid-should-we-be-4511f8a47a9e) / [TED: Juan Enriquez](https://www.ted.com/talks/juan_enriquez_your_online_life_permanent_as_a_tattoo) |
| 8 | **Nikki Catsouras事件: 家族の法的努力にもかかわらず、流出した事故写真は今日までネット上に残存。** 「サーバーからの削除」と「ウェブサイトからの削除」は異なり、データがサーバーに残る限り別のサイトに再掲載できる。完全削除には「すべてのコピーをすべてのサーバーから消す」必要があるが、インターネットの分散アーキテクチャ上、これは事実上不可能。 | 🟢高 | [Sunday Standard](https://www.sundaystandard.info/those-images-you-deleted-from-the-internet-are-still-there-somewhere-2/) / [DMCA.com](https://www.dmca.com/FAQ/How-do-I-get-my-picture-taken-off-the-internet) |

## まとめ

### 「消せない」は半分正しく、半分誇張

「ネットに上げた写真は絶対に消せない」という通説は、技術的事実と過度な一般化が混在している。

**消せる場合もある:**
- GDPRに基づくGoogle削除リクエストは約56%が承認される
- センシティブな個人情報に限れば97%の削除率
- プラットフォームへの直接削除要請は比較的容易に対応される

**消せない構造的理由:**
1. **技術的要因:** CDNキャッシュ、Wayback Machine（1兆ページ超保存）、個人によるスクリーンショット・保存など、データが分散複製される
2. **ビジネス的要因:** Metaのように削除後180日間データ保持し、メタデータを広告目的で利用するプラットフォームの経済的動機
3. **法的要因:** 日本にはGDPR的な包括制度がなく、米国では憲法上「忘れられる権利」自体が否定される。国際的な統一基準が存在しない

### 最大の逆説: ストライサンド効果
消そうとする行為自体が拡散を招くパラドックスは、「消す権利」の実効性に根本的な疑問を投げかける。バーブラ・ストライサンドの事例（6回→40万回）は象徴的。

### 対立軸の整理
- **プライバシー vs 表現の自由:** EU（プライバシー優先）vs 米国（表現の自由優先）で価値観が真逆
- **技術的不可能 vs 制度的不作為:** 本当に消せないのか、それともプラットフォームが消したくないのか。Metaのメタデータ保持は後者の典型
- **個人の忘れられる権利 vs 公共の記録:** 犯罪歴・政治情報は削除率が著しく低く、社会的記憶の保持が優先される
