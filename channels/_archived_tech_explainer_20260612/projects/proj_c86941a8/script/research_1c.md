# Research 1c: 歴史的経緯・設計思想・日常接続

テーマ: 「キャッシュを消す」って結局何を消しているのか
視点: 語源・歴史的経緯・設計思想・専門家コンセンサス・日常生活への接続アナロジー

---

## 歴史（年表）

### 言葉の起源
- **18世紀（1660年代頃〜）**: フランス系カナダの罠猟師（trappers）の俗語で「隠し場所」を意味する `cache` が登場。語源はフランス語の動詞 `cacher`（隠す）。さらに遡るとVulgar Latin の `coacticare`（蓄える、集める）→ Latin `cogere`（駆り集める＝ com-「共に」+ agere「動かす」）。
- **1797年**: 英語 noun として "cache"（hiding place）が初めて文献に登場。
- **1830年代**: 「隠し場所に蓄えられたモノそのもの」という意味へ拡張。

### コンピュータ用語としての誕生
- **1965年4月**: 英ケンブリッジ大学の Maurice Wilkes が論文 *"Slave Memories and Dynamic Storage Allocation"* を IEEE Transactions on Electronic Computers, Vol.EC-14, pp.270–271 に発表。CPU と主記憶の間に置く「高速の小さな記憶」を **slave memory（奴隷記憶）** と命名。これが現代キャッシュの理論的祖型。
- **1967年**: IBM 内部で開発された System/360 Model 85 用の「高速バッファ」について論文が IBM Systems Journal に投稿される。設計者の一人 Gibson は当初 "muffer" という造語を使い、論文では "high-speed buffer" と書かれていた。Editor-in-Chief の **Lyle R. Johnson** が thesaurus を引いて、より語感の良い `cache` を提案。
- **1968年1月**: IBM が System/360 Model 85 を発表（出荷は1969年12月）。世界初の商用キャッシュ搭載機。容量は 16KB、IBM は "high-speed buffer storage" と呼んだ。
- **1968年**: John S. Liptay 著 *"Structural Aspects of the System/360 Model 85: II The Cache"* が IBM Systems Journal Vol.7 No.1 に掲載。タイトルに初めて `cache` が登場。
- **1968年**: 同年、Peter Denning が *Communications of the ACM* に Working Set モデル論文を発表（ACM Best Paper Award）。「プログラムは任意の短い時間で全メモリのごく一部しか使わない」＝ **locality of reference（参照の局所性）** を理論化。これがキャッシュが効く根本理由になる。

### Web キャッシュの標準化
- **1991年**: Tim Berners-Lee による初期 HTTP（0.9）で `Pragma` ヘッダが文書化されるが、ディレクティブは `no-cache` のみ。
- **1996年5月**: HTTP/1.0 が **RFC 1945** として公開（著者: Tim Berners-Lee, Roy Fielding, Henrik Frystyk Nielsen）。Web キャッシュが初めて標準化され、`Pragma: no-cache` が唯一の制御手段に。
- **1999年6月**: HTTP/1.1（**RFC 2616**）公開。`Cache-Control` ヘッダが導入され、`max-age`、`no-store`、`must-revalidate` 等の細かい制御が可能に。`Pragma` は obsolete 扱いへ。
- **1998年8月20日**: MIT 発のスタートアップ **Akamai Technologies** が法人化。consistent hashing をベースに「ユーザに近いエッジサーバでキャッシュする」CDN モデルを商用化。
- **2007年**: Steve Souders（当時 Yahoo! Chief Performance）が *"High Performance Web Sites: Essential Knowledge for Front-End Engineers"* を出版。「ページ表示時間の80%はフロントエンド」を示し、`Expires` ヘッダ追加・AJAX キャッシュ可能化など 14 ルールを提示。Web 高速化におけるキャッシュ中心主義を確立。

### モダン化
- **2014年〜**: W3C / WHATWG で **Service Worker** 仕様化。Cache Storage API により、HTTP キャッシュとは別レイヤで JavaScript からプログラマブルにレスポンスをキャッシュ可能に。Progressive Web App のオフライン動作の基礎。
- **2022年6月**: HTTP/1.1 のキャッシュ仕様が **RFC 9111** に再整理され公開（現行）。

### スマホアプリのキャッシュ管理
- **Android**: `Context.getCacheDir()` が返すアプリ専用キャッシュ領域。OS は内部ストレージ逼迫時に**自動で削除する権利を持つ**（ただし開発者は自力管理が推奨）。設定 > ストレージ から「キャッシュを消去」が公式に可能。
- **iOS**: 各アプリを密閉ユニットとして扱う設計思想のため、システム横断の「キャッシュ削除」ボタンは存在しない。代わりに「App をオフロード」（本体を消してデータ・設定は残す）が推奨。

---

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| 1 | "cache" の語源はフランス語 `cacher`（隠す）→ Vulgar Latin `coacticare`（蓄える）→ Latin `cogere`（駆り集める）。英語 noun 初出は1797年、「隠し場所」の意味 | 🟢 | etymonline.com / cache | 動画冒頭の「実は『隠す』が語源」フックに最適 |
| 2 | Maurice Wilkes が1965年4月に論文 "Slave Memories and Dynamic Storage Allocation" を IEEE Trans. on Electronic Computers Vol.EC-14, pp.270-271 で発表。CPU キャッシュの理論的祖型 | 🟢 | IEEE Xplore / Cambridge アーカイブ PDF | 当初は "slave memory" と呼ばれていた歴史的事実 |
| 3 | 1967年、IBM Systems Journal の編集長 Lyle R. Johnson が thesaurus を引いて "high-speed buffer" → "cache" の改名を提案。これが計算機用語としての "cache" 誕生の瞬間 | 🟢 | retrocomputing 系記事・複数の技術史記事で一致 | 「もし提案が通らなければ "muffer を消す" になっていた」というネタにできる |
| 4 | IBM System/360 Model 85（1968年1月発表 / 1969年12月出荷）が世界初の商用キャッシュ搭載機。容量16KB、IBM 自身は "high-speed buffer storage" と呼称 | 🟢 | Wikipedia: IBM System/360 Model 85 | 商業ベースで作られたのは約30台のみ（不況のため） |
| 5 | 1968年、Peter Denning が Working Set モデル論文を Communications of the ACM に発表し、ACM Best Paper Award 受賞。「参照の局所性」の理論的根拠を確立 | 🟢 | denninginstitute.com | キャッシュが効く理由 = 「人もプログラムも、よく使うものは偏っている」 |
| 6 | HTTP/1.0（RFC 1945, 1996年5月公開, Tim Berners-Lee 他）で `Pragma: no-cache` が初めて標準化された Web キャッシュ制御 | 🟢 | rfc-editor.org / RFC 1945 | 「キャッシュを消す」UI 文化の源流の一つ |
| 7 | HTTP/1.1（RFC 2616, 1999年6月公開）で `Cache-Control` が導入され、`max-age` 等の細かい制御が可能に。`Pragma` は obsolete 扱いへ | 🟢 | MDN Web Docs / RFC 2616 | なぜ「Cache-Control」が必要だったか＝粒度不足の解決 |
| 8 | Phil Karlton（Netscape のエンジニア、SSL の主要設計者の一人）の格言「There are only two hard things in Computer Science: cache invalidation and naming things」。Tim Bray のブログが1996-7年頃にネット上での初出 | 🟢 | martinfowler.com/bliki/TwoHardThings.html | 「キャッシュを消すタイミング」がそれ自体プログラマ最大級の難問という権威付け |
| 9 | Steve Souders "High Performance Web Sites"（O'Reilly, 2007年）で「ページ表示時間の80%はフロントエンド」を実証。14ルール中、`Expires` ヘッダ追加・AJAX キャッシュ可能化など複数がキャッシュ関連 | 🟢 | O'Reilly / stevesouders.com | Web パフォーマンスにおけるキャッシュ中心主義の確立 |
| 10 | Akamai Technologies は1998年8月20日法人化。MIT 発の consistent hashing 研究をベースに、世界初の商用 CDN を構築。「キャッシュを地理的に分散させる」発想 | 🟢 | Wikipedia: Akamai Technologies | キャッシュ＝CPU の中だけの話ではないことを示す |
| 11 | Android では `Context.getCacheDir()` が返す領域は OS が低ストレージ時に自動削除可能と公式ドキュメントで明示。「いつ消えても文句を言うな」と設計されている | 🟢 | developer.android.com | スマホで「キャッシュ削除」が設定項目として存在する設計上の根拠 |
| 12 | iOS は各アプリを密閉ユニットとして扱うため、システム横断の「キャッシュ削除」ボタンを意図的に提供しない。代わりに「App をオフロード」がある | 🟡 | Quora / Capterra 等の解説記事で広く言及 | iOS / Android の設計思想の違いとしてネタになる |
| 13 | Service Worker / Cache Storage API は HTTP キャッシュとは別レイヤで、JavaScript からプログラマブルに制御可能。PWA のオフライン動作の基礎 | 🟢 | MDN / web.dev | 「キャッシュにも複数階層がある」を伝えられる |
| 14 | RFC 9111（2022年6月）が現行の HTTP キャッシュ仕様。RFC 7234 を置き換え | 🟢 | rfc-editor.org/rfc/rfc9111 | 「今もキャッシュの仕様は更新され続けている」 |
| 15 | 現代の CPU キャッシュは L1 / L2 / L3 の階層構造。L1 は数 KB・数ナノ秒、メインメモリは数百サイクル。この速度差を埋めるためにキャッシュが存在 | 🟢 | uvm.edu CS2210 講義資料 / Cornell CS3410 | 「なぜキャッシュが要るか」の根本理由 |
| 16 | 「muffer」という造語が IBM 内部で短期間使われていた（Gibson 命名）→ 論文では "high-speed buffer" → 編集者提案で "cache" に決着 | 🟡 | retrocomputing系記事・Jean-Loup Baer 講演スライド | 用語決定の偶然性を示すエピソード |
| 17 | Phil Karlton 自身は Netscape で SSL や Navigator の主要設計に関与。彼の格言は1970年頃 Carnegie Mellon 在籍時にすでに使われていた可能性が証言されている | 🟡 | karlton.org / Hacker News 議論 | 名言の権威付け補強 |
| 18 | Facebook 2010年のキャッシュスタンピード事件で複数時間のサービス停止。GitHub もキャッシュ層障害でリクエスト失敗が広範囲に拡大した実例あり | 🟡 | designgurus.substack.com / 各種ポストモーテム解説 | 「キャッシュは便利だが危険」の実例 |
| 19 | Fastly CDN 2021年6月の障害は、ある顧客の設定変更が引き金で世界中の主要サイトが同時ダウン。CDN キャッシュ層の脆弱性を露呈 | 🟢 | 各種ニュース・障害解説で広く報道 | 規模の大きさをスマホ世代に響かせられる |
| 20 | Pragma ヘッダはもともと HTTP の「非標準拡張機構」として設計されており、設計上の脆さが obsolete 化の理由のひとつ | 🟡 | http.dev / veggiespam.com | なぜ Cache-Control が必要だったかの補強 |

---

## 日常生活への接続アナロジー候補

### A. 図書館の館内貸出と書庫
- 巨大な書庫（メインストレージ）に全ての本がある。よく借りられる本は閲覧コーナーの開架書架（キャッシュ）に置く。
- 閲覧コーナーの本が古いまま放置されると、書庫で改訂版が出ているのに気づかない＝**stale cache**。
- **「キャッシュを消す」＝閲覧コーナーの本を一旦書庫に戻して、次のリクエスト時に最新版を取りに行かせる**。

### B. 冷蔵庫と倉庫（食料品スーパー）
- スーパー（origin server）に行けば全部揃うが時間がかかる。冷蔵庫（キャッシュ）には毎日使う牛乳を置く。
- 牛乳が腐っているのに気づかず使うと事故＝stale cache。
- 冷蔵庫を一掃する＝キャッシュ削除。次にコーヒーを淹れる時はスーパーに走る必要がある（最初の1回だけ遅い）。

### C. 机の上の付箋と書類棚
- 全ての書類は書類棚（メインメモリ）に保管。よく参照する電話番号やメモは机の上の付箋（CPU キャッシュ）に貼る。
- 付箋は数枚しか貼れない（容量制約）。新しいメモが来たら古い付箋を剥がす（**cache eviction = LRU**）。

### D. 銀行 ATM の残高表示と実際の口座
- ATM 画面の残高（キャッシュ）と銀行サーバ上の本当の残高（origin）にラグがある。振込直後にもう片方の ATM で見ると古い数字＝stale cache。
- システムが「最新を見ます」とサーバ問い合わせするのが **revalidation**。

### E. 料理人の手元の調味料と保管庫
- 厨房の手元（L1 キャッシュ）に塩・胡椒。少し離れた棚（L2）に醤油・酢。地下の保管庫（メインメモリ）に米袋。
- 手元のスペースは狭い（容量小・速度速い）が、必要な時に保管庫まで走るのは時間がかかる。

### F. 職人の作業台と工具棚
- よく使う工具は作業台に並べる。たまにしか使わないものは工具棚から取りに行く。
- 作業台が散らかってきたら一旦全部棚に戻す＝キャッシュ削除。

### G. スマホの「最近使ったアプリ」一覧
- 一度起動したアプリのプロセスをメモリに残しておくと2回目の起動が速い（スマホ OS の RAM キャッシュ）。
- 「最近使ったアプリを消す」操作は実質キャッシュクリアに近い動作。

### H. 暗記カード（フラッシュカード）と教科書
- 教科書全部を毎回読み直すのは無理。よく出る語は単語カード（キャッシュ）にして手元で繰り返す。
- 試験範囲が変わったらカードを作り直す＝キャッシュ無効化。

**動画での推奨**: A（図書館）と B（冷蔵庫）が最も普遍的でビジュアル化しやすい。「キャッシュ削除」の説明には B が直感的（冷蔵庫を空にする＝次の買い物が必要だが、食材は全部スーパーに残っている、と伝えると「データが消えるわけじゃない」誤解を解ける）。

---

## 専門家コンセンサス・名言

### 1. Phil Karlton（Netscape）— 1990年代
> "There are only two hard things in Computer Science: cache invalidation and naming things."
> （コンピュータサイエンスで本当に難しい問題は二つしかない。キャッシュの無効化と、名前を付けることだ）

→ **業界で最も引用される格言の一つ**。「キャッシュをいつ消すか」は構造的に難しい問題、というプロの共通認識を示す。Martin Fowler が bliki で正典化。

### 2. Maurice Wilkes（1965年論文より）
> "a fast core store of, say, 32,000 words as a slave to a slower core store of, say, one million words in such a way that in practice the effective access time is nearer that of the fast store than that of the slow store."
> （高速な3.2万語の記憶を、低速な100万語の記憶の「奴隷」として使い、実効アクセス時間を高速側に近づける）

→ 現代キャッシュ設計の原点となる一文。「速い小さい記憶」と「遅い大きい記憶」を組み合わせる、という単純で強力な発想。

### 3. Peter Denning（1968 / Working Set）
> "Locality is not specific to programs. It appears in file systems, databases, networks, and human behavior. It is a principle of nature."
> （局所性はプログラムに固有のものではない。ファイルシステム、データベース、ネットワーク、そして人間の行動にも現れる。自然の原理である）

→ キャッシュが効く理由が「自然法則」レベルだと位置付ける重要な視点。日常アナロジーに繋げやすい。

### 4. Steve Souders（"High Performance Web Sites" 2007）
> "80–90% of the end-user response time is spent on the frontend."
> （エンドユーザーの体感時間の80-90%はフロントエンド側で消費される）

→ Web パフォーマンスにおけるキャッシュ重視の根拠。「キャッシュを賢く使うかどうか」がユーザ体験に直結する。

### 5. 専門家コンセンサスとしての「キャッシュは便利だが危険」
- 共通の認識として、キャッシュは「**速度を10倍100倍にする魔法の薬。ただし、誤った薬を飲むと副作用で悩む**」と語られる。
- 副作用の代表例:
  - **Stale data（古いデータ）**: 更新されたはずの情報が反映されない（B/Eコマースの在庫表示など）
  - **Cache stampede**: キャッシュが一斉に切れて origin に負荷が殺到（Facebook 2010年事件）
  - **Cache poisoning**: 攻撃者が悪意あるレスポンスをキャッシュさせる脆弱性
  - **メモリ圧迫**: アプリが過剰にキャッシュを抱えて OS から強制終了される

→ だからこそ「**ユーザが手動でキャッシュを消せる**」UI が初心者向けに設計されている、という設計思想に繋がる。本来は開発者向けの debug 機能だったものが、ブラウザでは Ctrl+Shift+Delete として一般化。

### 6. 設計思想としてのトレードオフ
- メモリ階層は「容量と速度の根本的トレードオフ」の上に成立。SRAM（速いが高価でかさばる）と DRAM（遅いが安く大量）を組み合わせる必要性。
- 「キャッシュ」とは速度差を埋めるための**緩衝装置**であり、**全てのレイヤに偏在する設計パターン**（CPU、OS、DB、HTTP、CDN、アプリ、ブラウザ、DNS……）。

---

## 動画への接続メモ

- **冒頭フック候補**: 「キャッシュって、もともとフランス語で『隠す』って意味なんです。猟師が森に獲物を隠した『隠し場所』が語源」→ いきなり技術用語ではなく言葉の出自から入ると掴める。
- **歴史パートのコア**: 1965年 Wilkes「奴隷記憶」→ 1967年 IBM 編集者が thesaurus 引いて改名 → "もし改名されてなかったら、今頃みんな『マファーを消す』って言ってたかも"
- **日常アナロジー**: 冷蔵庫を中心に据えるとスマホ世代に刺さる。「冷蔵庫を空にしても、食材はスーパーにちゃんとある」＝キャッシュ削除しても本データは消えない、という誤解を先回りで解消できる。
- **権威付けには Phil Karlton 格言**: 「プロでも一番難しい問題」と言われている、と引用すると「だから手動で消せるボタンがあるのか」の納得感が出る。

