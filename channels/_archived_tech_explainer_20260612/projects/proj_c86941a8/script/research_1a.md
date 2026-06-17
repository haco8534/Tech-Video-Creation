# Research 1a: 主流・肯定情報

視点: 公式データ・基本定義・代表研究・なぜ広く使われているか（主流・肯定情報）

## 主要ファクト

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| 1 | キャッシュ（cache）とは「プロセッサがメインメモリからデータが渡される際に最初に到達する記憶階層の最上位レベル」と定義される。Hennessy & Patterson『Computer Architecture: A Quantitative Approach』の標準的定義 | 🟢 | Hennessy & Patterson, *Computer Architecture: A Quantitative Approach* (Appendix B / Chapter 2) — University of Maryland 講義資料 https://www.cs.umd.edu/~meesh/411/CA-online/chapter/basics-of-cache-memory/index.html | 「最初の階層」という位置付けが重要。CPUキャッシュの古典的定義 |
| 2 | メモリ階層は「ユーザーが望む無制限に高速なメモリへの経済的解」として設計される。プロセッサに近いほど小さく・速く・高価、遠いほど大きく・遅く・安価 | 🟢 | Hennessy & Patterson 解説（Medium 抜粋）https://medium.com/@prajun_t/appendix-b-review-of-memory-hierarchy-c497196739c4 | 階層化の根本動機 |
| 3 | キャッシュが機能する根拠は「参照の局所性（locality of reference）」。**時間的局所性**（一度参照したデータは近い将来再参照されやすい）と**空間的局所性**（参照したデータの近傍データも参照されやすい）の2種類 | 🟢 | Wikipedia「Locality of reference」 https://en.wikipedia.org/wiki/Locality_of_reference / CMU 15-740 講義 https://www.cs.cmu.edu/afs/cs/academic/class/15740-f18/www/lectures/03-04-memory-hierarchy.pdf | 「なぜキャッシュが効くのか」を説明する基礎理論 |
| 4 | HTTPキャッシュの現行仕様は **RFC 9111 (HTTP Caching, June 2022)**。RFC 7234 を廃止 (obsoletes)。`Cache-Control` ヘッダで挙動を指示する | 🟢 | IETF RFC 9111 https://www.rfc-editor.org/rfc/rfc9111.html | ブラウザ・CDN・プロキシ全部に適用される共通仕様 |
| 5 | RFC 9111 はキャッシュを2種類に分類：**private cache**（ブラウザ内、単一ユーザー向け）と **shared cache**（プロキシ・CDN、複数ユーザーで共有） | 🟢 | RFC 9111 § 3 / MDN Cache-Control https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control | 「ブラウザのキャッシュを消す」が消すのは private cache のみ |
| 6 | Chrome の「閲覧データを削除」で消える対象：Cookies and other site data（HTML5 Application Cache、Web Storage、Web SQL Database、Indexed Database を含む）／Cached images and files／Download history（リストのみ、実ファイルは残る）／Media licenses／Handlers | 🟢 | Google Chrome ヘルプ https://support.google.com/chrome/answer/2392709 / Chrome Extensions API: chrome.browsingData https://developer.chrome.com/docs/extensions/reference/api/browsingData | 「キャッシュを消す」が実は複数ストアにまたがる証拠 |
| 7 | Firefox の Clear Data ダイアログでは「Cookies and site data」と「Temporary cached files and pages（Cached Web Content）」が独立した項目として分かれている | 🟢 | Mozilla Support https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox | Cookieとキャッシュは別物として扱われる |
| 8 | Service Worker の **Cache Storage API** は HTTP リクエスト/レスポンスのペアを格納するための専用ストア。`localStorage` は同期APIで Service Worker から使えないため別物 | 🟢 | MDN Using Service Workers https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers / web.dev Offline data https://web.dev/learn/pwa/offline-data | ブラウザ内に複数のキャッシュ層が並列に存在することの公式な裏付け |
| 9 | **IndexedDB** は構造化データ用の非同期ストア。Cache API は URL 単位のリソース用、IndexedDB はキー検索可能なデータ用と用途が分離されている | 🟢 | MDN / web.dev Offline data https://web.dev/learn/pwa/offline-data | 「キャッシュ」という言葉が指す範囲が API ごとに違う |
| 10 | Android の `Context.getCacheDir()` はアプリ専用のキャッシュディレクトリ（内部ストレージ、`/data/data/<package>/cache/` 相当）への絶対パスを返す。**ストレージ容量が逼迫すると OS が自動削除する**ことが公式に明記されている | 🟢 | Android Developers https://developer.android.com/training/data-storage/app-specific | スマホの「キャッシュを消去」の実体 |
| 11 | iOS の `NSCachesDirectory`（Swift: `FileManager.SearchPathDirectory.cachesDirectory`）は再生成可能な一時ファイル置き場。**iCloud バックアップ対象外**で、低ストレージ時に OS が自動削除する可能性がある。設定アプリの「使用容量」にも計上されない | 🟡 | Apple File System Programming Guide https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/AccessingFilesandDirectories/AccessingFilesandDirectories.html / Hacking with Swift 解説 https://www.hackingwithswift.com/example-code/system/how-to-cache-data-using-nscache | iOSは「アプリ削除→再インストール」が事実上のキャッシュクリア手段 |
| 12 | Linux の **page cache** は読み込んだファイルの内容をRAMに保持して再アクセスを高速化する仕組み。`/proc/sys/vm/drop_caches` に 1 を書き込むと pagecache、2 で dentries+inodes、3 で全部を解放できる（カーネル 2.6.16+） | 🟢 | Linux Kernel Documentation https://docs.kernel.org/admin-guide/sysctl/vm.html / linux-mm.org Wiki https://linux-mm.org/Drop_Caches | OS レベルキャッシュの代表例 |
| 13 | Linux カーネル公式ドキュメントは drop_caches について「**非破壊的操作で dirty オブジェクトは解放しない**」「キャッシュ成長を制御する手段ではない」「テスト・デバッグ以外での使用は推奨しない」と明記 | 🟢 | Linux Kernel Documentation https://docs.kernel.org/admin-guide/sysctl/vm.html | 「キャッシュ削除＝高速化」という俗説への公式な反論材料 |
| 14 | DNS リゾルバキャッシュは TTL（Time To Live）で各レコードの有効秒数を保持。Windows は `ipconfig /flushdns`、Linux (systemd-resolved) は `sudo resolvectl flush-caches` でクリアする | 🟡 | Microsoft Learn / showdns.net https://showdns.net/guides/how-to-flush-dns-cache | OSレベルで独立したキャッシュ層が存在する例 |
| 15 | ローカルでDNSキャッシュをフラッシュしても、ISPの再帰リゾルバや 8.8.8.8 等の上流リゾルバは独自のキャッシュを保持するため、即座にレコードが更新されるとは限らない | 🟡 | DNS解説 https://blog.hubspot.com/website/flush-dns | 「キャッシュは複数階層に重なって存在する」事実 |
| 16 | 現代 CPU の L1 キャッシュヒット率は **Intel・AMD ともに 95% 以上**が一般的 | 🟡 | informatecdigital 解説 https://informatecdigital.com/en/CPU-cache-latency-and-how-it-affects-performance/ | キャッシュが「効いている」ことの定量的指標 |
| 17 | CPUキャッシュのレイテンシは L1 約 1〜4 サイクル、L2 約 3〜15 サイクル、L3 約 20〜40 サイクル、DRAM は 100+ サイクル。階層が一段下がるごとに桁違いに遅くなる | 🟡 | CPU cache latency 解説 https://informatecdigital.com/en/CPU-cache-latency-and-how-it-affects-performance/ / Mike Anderson https://medium.com/@mike.anderson007/the-cache-clash-l1-l2-and-l3-in-cpus-2a21d61a0c6b | キャッシュが必要な理由＝この速度差を埋めるため |
| 18 | キャッシュ性能は **Hit time（ヒット時アクセス時間）／Miss rate（ミス率）／Miss penalty（ミス時ペナルティ）** の3指標で評価する（Hennessy & Patterson 標準フレームワーク） | 🟢 | University of Maryland 講義（H&P解説）https://www.cs.umd.edu/~meesh/411/CA-online/chapter/basics-of-cache-memory/index.html | 「キャッシュ性能」の教科書的定義 |
| 19 | ブラウザにおけるキャッシュ系ストアは少なくとも以下が並存：HTTP cache（RFC 9111）／Cache Storage API（Service Worker）／IndexedDB／localStorage・sessionStorage（Web Storage）／Cookies／Web SQL（廃止予定）／Application Cache（廃止済） | 🟢 | MDN各種 + Chrome browsingData API https://developer.chrome.com/docs/extensions/reference/api/browsingData | 「ブラウザキャッシュ」が単一実体ではないことの根拠 |
| 20 | Android の cacheDir はアプリ削除時に消える。設定アプリの「ストレージ→アプリ→キャッシュを消去」はこの cacheDir（および externalCacheDir）の中身を一括削除する操作 | 🟡 | CommonsWare Jetpack book https://commonsware.com/Jetpack/pages/chap-files-001.html / Android公式 https://developer.android.com/training/data-storage/app-specific | スマホUIの「キャッシュ削除」が裏で何をしているかの実体 |

## 補足メモ

### キャッシュ階層の見取り図（動画用に有効な構造化）

「キャッシュを消す」と一言で言っても、実は次の少なくとも5つの階層がある：

1. **CPU キャッシュ（L1/L2/L3）** — ハードウェア管理。ユーザーが消すことはできない（電源OFFで揮発）
2. **OS のメモリキャッシュ** — Linux page cache、Windows のスタンバイメモリ、macOS の inactive memory。OSが自動管理、強制解放は drop_caches 等
3. **OS のディスクキャッシュ／システムキャッシュ** — DNSキャッシュ、フォントキャッシュ、サムネイルキャッシュ、アイコンキャッシュなど
4. **アプリ内キャッシュ** — Android の cacheDir、iOS の Caches ディレクトリ。設定アプリから個別削除可能
5. **ブラウザ内の複数ストア** — HTTP cache / Cache Storage / IndexedDB / localStorage / Cookies。「閲覧履歴を削除」は実はこれらの組み合わせを消している

### 動画の核心になりそうなポイント

- 「キャッシュ＝重い・古い・消すと速くなる」という民間信仰に対し、**Linuxカーネル公式ドキュメントは「drop_caches の濫用は I/O と CPU を浪費するので推奨しない」と明言**している（ファクト#13）。これは反転点として強い
- Chromeの「キャッシュを削除」UIは、実は **HTTP cache 以外に Web Storage、IndexedDB、Web SQL、Application Cache** までまとめて消している。「キャッシュ」という単語の指す範囲がOSベンダ・ブラウザベンダごとに違う
- iOSにそもそも「キャッシュを消去」ボタンが基本ない理由は、**NSCachesDirectory が低ストレージ時にOSが勝手に消す設計**だから（手動操作を前提にしていない）
- L1ヒット率95%以上、L1=数サイクル vs DRAM=100+サイクルという数値（ファクト#16-17）は、「なぜここまでキャッシュ階層が必要か」の説得力ある定量根拠

### 信頼度カウント
- 🟢 高（公式ドキュメント・RFC・教科書・MDN・OS公式）: **12件**（#1,2,3,4,5,6,7,8,9,10,12,13,18,19）→ 14件 ※要件は最低5件、達成
- 🟡 中（信頼メディア・専門家解説）: **6件**（#11,14,15,16,17,20）→ 6件 ※要件は最低3件、達成
