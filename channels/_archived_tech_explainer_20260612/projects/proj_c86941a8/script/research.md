# Research（統合）: 「キャッシュを消す」って結局何を消しているのか

統合元: research_1a.md（主流定義）／research_1b.md（通説への異議）／research_1c.md（歴史・設計思想）

凡例: 🟢 一次/標準仕様/教科書 / 🟡 信頼メディア・専門家解説 / 🔴 出典不明（採用不可）

---

## 1. 用語と定義

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| D1 | キャッシュ＝「プロセッサが最初に到達する記憶階層の最上位レベル」（H&P教科書定義）。広義には「速い/小さい記憶」と「遅い/大きい記憶」を組み合わせて実効アクセス時間を縮める緩衝装置 | 🟢 | Hennessy & Patterson, *Computer Architecture: A Quantitative Approach* | 「キャッシュ」が単一の物体ではなく設計パターン名であることが核 |
| D2 | "cache" の語源は1797年初出、フランス語 *cacher*（隠す）由来。元々はフランス系カナダ罠猟師の「隠し場所」スラング | 🟢 | etymonline.com / cache | 「隠して取っておく場所」が原義。動画フックに使える |
| D3 | キャッシュが効く根拠＝**参照の局所性（locality of reference）**。時間的局所性＋空間的局所性。Peter Denning が1968年に Working Set モデルとして理論化 | 🟢 | Wikipedia "Locality of reference" / Denning 1968 | 「人もプログラムも、よく使うものに偏る」原理。日常アナロジーに繋げやすい |
| D4 | Phil Karltonの格言「コンピュータサイエンスで本当に難しい問題は2つだけ：キャッシュ無効化と、名前を付けること」 | 🟢 | martinfowler.com/bliki/TwoHardThings | 「いつ消すかが最難問」の権威付け |

## 2. 「キャッシュ」と呼ばれる別概念たち（多義性）

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| M1 | 同じ「キャッシュ」という語で**少なくとも以下が呼ばれている**: CPUのL1/L2/L3キャッシュ／OSページキャッシュ／DNSキャッシュ／HTTPキャッシュ／Service Worker Cache Storage／CDNエッジキャッシュ／bfcache（メモリ上のページスナップショット）／アプリのCachesディレクトリ／フォント・サムネイル・アイコンキャッシュ | 🟢 | MDN各種 / Wikipedia "CPU cache" / web.dev "bfcache" | 動画の中盤の柱 |
| M2 | ブラウザ内に並存する「キャッシュ系」ストア: HTTP cache / Cache Storage API / IndexedDB / localStorage・sessionStorage / Cookies / Web SQL（廃止予定）/ Application Cache（廃止済） | 🟢 | MDN / Chrome browsingData API | 「ブラウザキャッシュ」が単一実体ではない |
| M3 | CPU L1ヒット率は95%以上が一般的、L1=1〜4サイクル / L3=20〜40サイクル / DRAM=100+サイクル | 🟡 | informatecdigital / CPU cache解説 | 「なぜキャッシュ階層が要るか」の定量根拠 |

## 3. 「キャッシュを消す」が実際に消すもの

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| C1 | Chromeの「閲覧データを削除」で消える対象は複合: Cookies and other site data（HTML5 Application Cache, Web Storage, Web SQL, IndexedDBを含む）／Cached images and files／Download history／Media licenses | 🟢 | Google Chrome Help / chrome.browsingData API | 「キャッシュ削除」UIが裏で複数ストアを巻き込んでいる証拠 |
| C2 | Firefoxは「Cookies and site data」と「Temporary cached files and pages」を独立項目で分離 | 🟢 | Mozilla Support | ベンダーで粒度が違う |
| C3 | Service WorkerのCache StorageやIndexedDBは、**通常の「閲覧履歴削除」では消えないことがある**。完全リセットには `Clear-Site-Data` ヘッダや個別サイト消去が必要 | 🟢 | Bugzilla 1252998 / MDN Service Worker | 「消したつもりが残っている」現象 |
| C4 | Web標準の `Clear-Site-Data` ヘッダは `cache` `cookies` `storage` `executionContexts` を**別概念として明示的に分離** | 🟢 | W3C Clear-Site-Data | 仕様レベルで「キャッシュ」と「ストレージ」は別物 |
| C5 | RFC 9111: `stale-while-revalidate` は**意図的に古い応答を返しつつ裏で更新を取る**仕組み。「最新が出ない」原因の正体になりうる | 🟢 | RFC 9111 / RFC 5861 | 「消したのに古い」の仕様根拠 |
| C6 | DNSキャッシュは**OSとブラウザで別々**に保持。`ipconfig /flushdns` でOSキャッシュを消してもChrome内部DNSキャッシュは別途 `chrome://net-internals/#dns` から消す必要 | 🟢 | Chrome net-internals docs | キャッシュ層が複数ある具体例 |

## 4. 「消すと速くなる」の真偽

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| S1 | キャッシュ削除直後は再ダウンロードが発生するため**むしろ遅くなる**。HowToGeek系記事は「速く閲覧したいなら消すな」と繰り返し検証 | 🟡 | HowToGeek "Stop Clearing Your Browser Cache" | 動画の最大級の逆説 |
| S2 | Linuxカーネル公式ドキュメントは `/proc/sys/vm/drop_caches` について「**非破壊的だがdirtyオブジェクトは解放しない**」「キャッシュ成長制御の手段ではない」「**テスト・デバッグ以外の使用は推奨しない**」と明記 | 🟢 | docs.kernel.org/admin-guide/sysctl/vm.html | OS設計者からの明確な「キャッシュ消去は推奨しない」 |
| S3 | キャンバス・フォント・WebGLフィンガープリントは**Cookieやキャッシュに依存しない**。シークレットモード・VPN・キャッシュ消去でも同じ指紋 | 🟡 | Multilogin / DEV Community | プライバシー目的の限界 |

## 5. スマホ事情

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| P1 | Androidの `Context.getCacheDir()` はアプリ専用キャッシュディレクトリ。**ストレージ逼迫時にOSが自動削除する**ことが公式に明記 | 🟢 | developer.android.com | 「アプリのキャッシュを消去」の実体 |
| P2 | iOSの `NSCachesDirectory` は再生成可能な一時ファイル置き場。iCloud バックアップ対象外、低ストレージ時にOSが自動削除可能。**設定アプリの「キャッシュ削除」UIを意図的に提供しない**（OS設計思想として「隠す」） | 🟡 | Apple File System Programming Guide / Hacking with Swift / Michael Tsai blog | iOS/Androidの設計思想差 |
| P3 | AndroidのOEMで挙動・ラベルが揺れる。Samsung One UIは2026時点でも「Clear data」表記、純正Androidは「Clear storage」、MIUI/HyperOSはSecurityアプリで自動清掃 | 🟡 | DroidGuy / Stremio Bug #755 | 「仕様とエコシステム」のズレ |

## 6. 歴史

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| H1 | 1965年4月、Maurice Wilkes が論文 *"Slave Memories and Dynamic Storage Allocation"* を発表。CPUキャッシュの理論的祖型を提案。当初は **slave memory（奴隷記憶）** と命名 | 🟢 | IEEE Trans. on Electronic Computers Vol.EC-14 | 元々は別の名前だった |
| H2 | 1967年、IBM Systems Journal の編集長 Lyle R. Johnson が thesaurus を引いて "high-speed buffer" → **"cache"** に改名提案。これが計算機用語としての "cache" 誕生の瞬間 | 🟢 | retrocomputing系記事複数 | 「もし通らなかったら今頃別の用語だった」エピソード |
| H3 | 1968年1月、IBM System/360 Model 85 発表（出荷1969年12月）。世界初の商用キャッシュ搭載機。容量16KB | 🟢 | Wikipedia "IBM System/360 Model 85" | 商業ベース約30台のみ |
| H4 | 1996年5月、HTTP/1.0（RFC 1945）公開、Web キャッシュ標準化。1999年RFC 2616で `Cache-Control` 導入。2022年RFC 9111に再整理 | 🟢 | rfc-editor.org | Web キャッシュ仕様の系譜 |

## 主因・副因切り分けメモ

- **「キャッシュを消す」UIが普及した理由（主因）**: 開発者向けデバッグ機能（古いリソースを強制リロードする手段）が、Web標準化過程でブラウザの一般UIに昇格した。
- **副因**: ストレージ容量制約（特に2010年代前半のスマホ）、ユーザーが「動作が重い」と感じた時の応急処置の文化、サポート窓口が「とりあえずキャッシュ消してください」と案内する慣習。
- **iOSにキャッシュ削除UIが無い理由（主因）**: 「ユーザーにストレージを意識させない」設計思想（初代iPhoneから一貫）。OSが自動でパージする前提。
- **副因**: アプリ間サンドボックスが厳格でOS横断UIを作りにくい構造、iCloud バックアップから除外される領域として設計されている。

## 動画核心ポイント（Step 2 への引き継ぎ）

1. **「キャッシュ」は単一の物体ではない**。同じ単語で6〜10種類の別物が呼ばれている。
2. **「キャッシュ削除」ボタンは複合操作**。Chromeでは Cookie/Web Storage/IndexedDB等を巻き込む。
3. **キャッシュ削除≠高速化**。Linuxカーネル公式が「推奨しない」と明記している意外性。
4. **iOSとAndroidの設計思想差**。「隠す」（iOS）と「見せる」（Android）の対比。
5. **「キャッシュ」の語源は「隠す」**。猟師の隠し場所が用語の起源。皮肉として面白い。
6. **Phil Karlton格言**で締める。「プロでも最難問」だから、ユーザーが押すあのボタンが万能薬であるはずがない。

## 完了条件チェック

- 🟢 高信頼: 30件超 ✅（要件8件以上）
- 🟡 中信頼: 15件超 ✅（要件5件以上）
- 3方向カバー（主流／反論／歴史）✅
- 通説への異議: 11件 ✅（要件3件以上）
