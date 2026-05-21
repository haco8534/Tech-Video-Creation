# Research 1b: 反論・例外・通説への異議

調査視点: 通説への反証・例外・限界、通説と一次情報のズレ、因果が歴史的偶然だった例、言語仕様とエコシステムの混同、学術語と一般語の意味ズレ

信頼度凡例:
- 🟢 一次情報・公式ドキュメント・標準仕様（MDN・W3C・RFC・公式ベンダードキュメント）
- 🟡 信頼できる二次情報（著名ブログ、技術メディア、専門家解説）
- 🔴 個人ブログ・コミュニティQ&A・出典不明

---

## 通説への異議（11件）

| #  | 通説 | 実際は | 信頼度 | 出典 | 備考 |
|----|------|--------|--------|------|------|
| 1  | キャッシュを消すと動作が軽くなる | 直後は再ダウンロードが発生して**むしろ遅くなる**。キャッシュは「速くするための仕組み」であって、消去後しばらくはネットワーク帯域とCPUを余分に消費する。HowToGeekは「速く閲覧したいならキャッシュを消すのをやめろ」と明言 | 🟡 | [Want to Browse Faster? Stop Clearing Your Browser Cache - HowToGeek](https://www.howtogeek.com/184272/want-to-browse-faster-stop-clearing-your-browser-cache/) / [Myths: Does Deleting the Cache Actually Speed Up Your PC?](https://www.howtogeek.com/166285/myths-does-deleting-the-cache-actually-speed-up-your-pc/) | 動画の核となる逆説 |
| 2  | キャッシュ＝一時ファイル（すぐ消える） | Cache APIやIndexedDBは**quota-managed = ベストエフォートで、ディスクが圧迫されない限り消えない**。さらに `navigator.storage.persist()` で「永続化」を宣言できる領域もあり、ユーザーが明示的に消去するまで残る | 🟢 | [Storage quotas and eviction criteria - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) / [Persistent storage - web.dev](https://web.dev/articles/persistent-storage) | 「キャッシュ＝temp」イメージは誤り |
| 3  | ブラウザの「閲覧データ削除」を押せば全部きれいになる | Service WorkerのCache StorageやIndexedDBは、**通常の「閲覧履歴削除」では消えないことがある**（FirefoxのForgetボタンも長くこの問題を抱えていた）。サイトを完全リセットしたいなら `Clear-Site-Data` ヘッダや `chrome://settings/content/all` での個別サイト消去が必要 | 🟢 | [Bugzilla 1252998: "Forget" button does not clear Service Workers or their caches](https://bugzilla.mozilla.org/show_bug.cgi?id=1252998) / [Service Worker API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) | UIと実態のズレ |
| 4  | 「キャッシュ消去」で勝手にログアウトしない | Chromeの「閲覧履歴データの削除」で**「Cookieとサイトデータ」を選ぶとログイン状態が消える**。Cookies and other site dataにはLocal Storage / Service Worker dataも含まれる。一方パスワードは別カテゴリで残る。ユーザーは「キャッシュを消した＝ログアウトされた」と因果を取り違える | 🟢 | [Delete browsing data in Chrome - Google Support](https://support.google.com/chrome/answer/2392709) | UI設計が混乱を生む |
| 5  | iPhoneにも「キャッシュクリア」機能があるはず | iOSは**OSとしてのキャッシュクリアUIを公式に提供していない**。Library/Cachesは各アプリのサンドボックス内にあり構造もアプリ依存。OSにできるのは「全消し or 放置」の2択のみで、空き容量が足りなくなれば自動で消す設計。だからユーザー操作が要らない（建前） | 🟡 | [Michael Tsai - Clearing iOS App Data](https://mjtsai.com/blog/2026/01/05/clearing-ios-app-data/) / [Apple Developer Forums: Clear App Cache](https://developer.apple.com/forums/thread/697475) | 設計思想の違い |
| 6  | Androidの「キャッシュ削除」と「データ削除」は明確に分かれている | 仕様上は分かれているが、**OEMで挙動とラベルが揺れる**。SamsungはOne UI 2026時点でも「Clear data」、純正Androidは「Clear storage」、MIUI/HyperOSはSecurityアプリで自動掃除を仕込める。さらにアプリがキャッシュサイズの自主制限を守らずに10GB超えるバグも報告されている | 🟡 | [Stremio Bug #755: cache size not respected, ends up using ~10GB](https://github.com/Stremio/stremio-bugs/issues/755) / [Clear Data vs Clear Cache - DroidGuy](https://thedroidguy.com/difference-clear-cache-clear-data-81306) | 仕様とエコシステムの混同 |
| 7  | キャッシュを消せば必ず最新版が表示される | 実際には**ブラウザDisk Cache→Memory Cache→Service Worker→CDNエッジ→上流プロキシ→オリジン**と多層キャッシュが存在。ブラウザ側を消してもCDNエッジに古いものが残れば「最新が来ない」状態になる。Cloudflareでもエッジロケーションごとに更新タイミングが違うため「100%即時無効化は理論的に不可能」 | 🟡 | [CDN Edge Cache Invalidation - PicTomo](https://pic-tomo.com/en/blog/cdn-edge-cache-invalidation) / [I Spent 8 Hours Fighting Cloudflare Cache - Markaicode](https://markaicode.com/troubleshooting-cloudflare-cdn-cache-invalidation-problems/) | 多層構造の見えづらさ |
| 8  | キャッシュとCookieを消せばトラッキングから逃れられる | Canvas/フォント/WebGLによる**ブラウザフィンガープリントはキャッシュもCookieも使わない**ため、消去・シークレットモード・VPNでも変わらない。再訪時に同じ指紋を再生成して照合される。プライバシー保護目的でキャッシュを消すのは半分しか効いていない | 🟡 | [Canvas Fingerprinting - Multilogin](https://multilogin.com/blog/the-great-myth-of-canvas-fingerprinting/) / [Font Fingerprinting - DEV Community](https://dev.to/firekey_browser/font-fingerprinting-the-invisible-browser-tracker-that-reveals-your-system-2a6g) | プライバシー神話の限界 |
| 9  | 「キャッシュ」と聞いて誰もが同じものを想像している | 学術・ハードウェア領域では**CPUのL1/L2/L3キャッシュ**（コア内のSRAM、ナノ秒オーダー）を指す。一般ユーザーが言う「キャッシュ」はブラウザのHTTPキャッシュやアプリのLibrary/Caches。同じ単語で**ハードウェアキャッシュ・OSページキャッシュ・HTTPキャッシュ・アプリキャッシュ・CDNキャッシュ・DNSキャッシュ**を全部呼ぶため会話が噛み合わない | 🟢 | [CPU cache - Wikipedia](https://en.wikipedia.org/wiki/CPU_cache) / [HowToGeek L1/L2/L3](https://www.howtogeek.com/891526/l1-vs-l2-vs-l3-cache/) | 学術語と一般語のズレの典型 |
| 10 | Ctrl+Shift+R（ハードリフレッシュ）すれば全部キャッシュが効かなくなる | ハードリフレッシュは**主にブラウザ側のHTTPキャッシュをバイパス**するだけ。Service Workerが間に立てばその応答が返るし、CDNエッジに古いものがあれば古いまま、bfcache（back/forward cache）はそもそもメモリ上のページスナップショットなのでHTTPキャッシュとは別経路 | 🟢 | [bfcache - web.dev](https://web.dev/articles/bfcache) / [bfcache Glossary - MDN](https://developer.mozilla.org/en-US/docs/Glossary/bfcache) | 「ハードリフレッシュ最強」神話 |
| 11 | 「キャッシュを消したのに直らない不具合」は再起動すれば直る | 真因が**キャッシュ層ではなく別レイヤー**であるケースが多い。例: DNSキャッシュ（OSとブラウザで別々に保持される）、Vary ヘッダ不整合で別バリアントが返り続ける、stale-while-revalidate中で古い応答が再利用される、Service Worker Registrationが残存している、など。「キャッシュ問題」と言う前に層を特定すべき | 🟢 | [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html) / [DNS cache: browser maintains separately from OS - OneWebCare](https://onewebcare.com/blog/how-to-clear-dns-cache-windows-mac-browser/) | 因果取り違えの典型 |

---

## ファクト

| #  | ファクト | 信頼度 | 出典 | 備考 |
|----|----------|--------|------|------|
| F1 | "cache"の語源は1797年フランス系カナダ罠猟師のスラング「貯蔵物の隠し場所」、フランス語 *cacher*（隠す）由来。1830年代に「隠された貯蔵物」一般へ意味拡張、20世紀後半に計算機科学へ転用 | 🟢 | [Etymonline: cache](https://www.etymonline.com/word/cache) / [OED cache, n.¹](https://www.oed.com/dictionary/cache_n1) | 「隠して置いておく場所」が原義。プライバシーUIで「消す」対象になっているのは皮肉 |
| F2 | Chromeのストレージ最大上限はデバイス全ディスクの最大80%。これを超えるとオリジン単位LRUで一括退避（Cache API/IndexedDB両方まとめて消える） | 🟢 | [Storage quotas and eviction criteria - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria) | キャッシュは「思ったより大量に居座れる」 |
| F3 | `navigator.storage.persist()` で永続化されたストレージは、**ディスクが満杯になっても自動退避されない**。ユーザーがサイト設定から消すまで残る | 🟢 | [Persistent storage - web.dev](https://web.dev/articles/persistent-storage) | 「キャッシュ＝消える前提」が崩れる典型 |
| F4 | RFC 9111: `Vary` ヘッダ付きの応答は、リクエストヘッダが完全一致しないと再利用してはならない。が同RFCは「過去仕様との互換のため、Vary不一致でもrevalidate成功すれば再利用してよい」と例外を許容 | 🟢 | [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html) | 「言語仕様 vs ブラウザ実装」の現実 |
| F5 | RFC 5861 / RFC 9111: `stale-while-revalidate` は期限切れの古い応答を返しつつ裏で更新を取りにいく。**意図的に古いものを見せる仕組み**であり「最新が出ない」原因の正体になりうる | 🟢 | [RFC 5861](https://datatracker.ietf.org/doc/html/rfc5861) / [stale-while-revalidate - web.dev](https://web.dev/articles/stale-while-revalidate) | 仕様で許された「古さ」 |
| F6 | Chromeのキャッシュは2層構造: メモリキャッシュ（プロセス内、ブラウザ終了で消える）+ ディスクキャッシュ（永続）。同セッション内のリロードはメモリ優先。`chrome://net-internals/#httpCache` で実態確認可能 | 🟢 | [Disk Cache - chromium.org](https://www.chromium.org/developers/design-documents/network-stack/disk-cache/) | 「メモリキャッシュからの読込」表記の正体 |
| F7 | bfcache (back/forward cache) は**JavaScriptヒープを含むページ全体のメモリスナップショット**。HTTPキャッシュとは独立した別経路。「戻る」ボタンが瞬時なのはこれ | 🟢 | [Back/forward cache - web.dev](https://web.dev/articles/bfcache) / [bfcache Glossary - MDN](https://developer.mozilla.org/en-US/docs/Glossary/bfcache) | キャッシュという語が指す対象がさらに増える |
| F8 | DNSキャッシュは**OSとブラウザで別々**に保持される。`ipconfig /flushdns` を打ってもChromeの内部DNSキャッシュは別途 `chrome://net-internals/#dns` から消す必要がある | 🟢 | [Chrome net-internals dns flush guide - OneWebCare](https://onewebcare.com/blog/how-to-clear-dns-cache-windows-mac-browser/) | 「キャッシュ層は1つではない」具体例 |
| F9 | iOSでは各アプリのキャッシュは `Library/Caches` 配下のサンドボックスに置かれ、**OS側に空き容量が必要になった時に自動でパージされる**設計。ユーザー向けの統一UIを意図的に作っていない | 🟡 | [Apple Developer Forums: Clear App Cache](https://developer.apple.com/forums/thread/697475) / [Michael Tsai blog](https://mjtsai.com/blog/2026/01/05/clearing-ios-app-data/) | OSの設計哲学差。Androidとの対称軸 |
| F10 | Android標準では `Clear cache` と `Clear storage`（旧 Clear data）を区別。だが**SamsungのOne UIは2026時点でも「Clear data」表記**、Xiaomi/HyperOSはSecurityアプリで自動清掃。OEMでUIラベルも経路も挙動も統一されていない | 🟡 | [Clear Data vs Clear Cache - DroidGuy](https://thedroidguy.com/difference-clear-cache-clear-data-81306) | 仕様とエコシステムの分離 |
| F11 | キャンバス・フォント・WebGLフィンガープリントはCookieやキャッシュに依存しない。GPU/ドライバ/OS/ブラウザ/フォントセットの組合せから毎回再計算され、**シークレットモード・VPN・キャッシュ消去でも同じ指紋が出る** | 🟡 | [Canvas Fingerprinting - Multilogin](https://multilogin.com/blog/the-great-myth-of-canvas-fingerprinting/) / [Font Fingerprinting - DEV](https://dev.to/firekey_browser/font-fingerprinting-the-invisible-browser-tracker-that-reveals-your-system-2a6g) | プライバシー有効性の限界 |
| F12 | Stremioで報告されたバグ: アプリが指定した2GBキャッシュ上限を**実装上守らず10GB近く膨張**、Samsung Tab A8で内部ストレージを食い潰す。「Androidのキャッシュは自動管理されている」前提が破綻する例 | 🟡 | [Stremio Bug #755](https://github.com/Stremio/stremio-bugs/issues/755) | アプリ側実装の自由度の闇 |
| F13 | Web標準の `Clear-Site-Data` ヘッダは `cache` `cookies` `storage` `executionContexts` を別々に指定できる。**HTTPキャッシュとIndexedDB等のストレージは別概念として明示的に分離**されている | 🟢 | [Bugzilla 1252998 (Clear-Site-Data言及)](https://bugzilla.mozilla.org/show_bug.cgi?id=1252998) | 仕様が「キャッシュ」と「ストレージ」を別物扱いしている事実 |
| F14 | CPUキャッシュ: L1は各コア専有・RAMの最大100倍速、L2は各コア専有でL1より大きく低速、L3は全コア共有でRAMの2倍程度の速度。**ユーザーが「キャッシュ消す」操作の対象には一切含まれない** | 🟡 | [L1/L2/L3 Cache - HowToGeek](https://www.howtogeek.com/891526/l1-vs-l2-vs-l3-cache/) / [CPU cache - Wikipedia](https://en.wikipedia.org/wiki/CPU_cache) | 学術語と一般語の決定的差 |

---

## 補足メモ

### 動画的に効きそうな逆説（=ツカミ候補）

1. **「キャッシュを消す」=「速くするための仕組みを破壊する」**: 一番直感に反する事実。掴みに最強。HowToGeek系記事が同じ論調で繰り返し検証している。
2. **iPhoneに「キャッシュクリア」がない理由**: 「Appleが不親切なのではなく、OSの設計思想として『隠せ』」。AndroidのOEMバラバラ問題と対比すると面白い。
3. **同じ「キャッシュ」という語で6種類くらいの別物が呼ばれている**: CPU L1/L2/L3、OSページキャッシュ、HTTPキャッシュ、Service Worker Cache、CDNエッジキャッシュ、DNSキャッシュ、bfcache。これらは消去手段も寿命も粒度も全然違う。
4. **「キャッシュを消したのにログアウトされた」事件の正体**: 実は消したのはCookieとサイトデータで、HTTPキャッシュではなかった。Chrome UIの「Cookieとその他のサイトデータ」が混線の元凶。
5. **プライバシー目的のキャッシュ消去は半分しか効かない**: フィンガープリントは消えない。

### 動画で扱う際の注意（中立トーン）

- 「Apple/Google/OEMが不親切」と煽らない。設計思想の違いとして提示。
- 「ユーザーが無知」とも言わない。UIラベルが混線を誘発している構造の問題。
- 「キャッシュ消すな」と断言せず「目的によって意味が変わる」という整理に。

### 因果が歴史的偶然だった例

- **"cache"が「隠し場所」由来**: フランス系カナダ罠猟師の隠し穴が、200年後にメモリ階層の用語に転用された。ハードウェア由来の語ではないのに、技術用語として完全に定着。
- **iOSに「キャッシュクリア」がない**: 初代iPhoneがマルチタスクすら持たず容量も小さかった頃、「ユーザーにストレージを意識させない」設計が選ばれた。ハードが大容量化した今もUIの非対称が残る。
- **Androidの「Clear data」表記がOEMで残る**: 純正は「Clear storage」に改名済みだがSamsungが追従していない。ユーザー教育のされ方が地域・機種で分岐。

### 言語仕様とエコシステムの混同例

- 仕様上「Cache APIとHTTP Cacheは別物」だが、ブラウザの「閲覧データ削除」UIはこれを混ぜて見せる。
- 仕様上「Clear-Site-Data: cache」はHTTPキャッシュのみだが、ユーザーの想像する「キャッシュ消去」はCookieもログイン状態も含むメンタルモデル。
- Vary/stale-while-revalidateはRFC上明確に定義されているが、ユーザーから見ると「消したのに古いまま」という症状にしか見えない。
