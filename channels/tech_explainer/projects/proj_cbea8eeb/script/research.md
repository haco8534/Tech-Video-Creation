# Research（統合）: なぜ動画形式はこんなに多いのか
## 〜前作「なぜ画像形式はこんなにたくさんあるのか」の答え合わせ〜

3視点（1a/1b/1c）を重複排除・主副因切り分けして統合したファクト集。
前作「なぜ画像形式はこんなにたくさんあるのか」で出した「トレードオフが根本原因」という答えへの、補強と修正。

---

## 前作との関係（続編の軸）

前作の結論:
- **形式が多いのは物理法則的なトレードオフが根本原因**
- **万能な画像形式は論理的にありえない**

前作に寄せられた批評（動画内で取り扱う視聴者コメント）:
> 「別にトレードオフとかねえよ、万能が無いだけ。色々な機関が色々な年代で色々な思惑で作ったからに過ぎない。
> 内部的には jpegが向いていればjpeg、pngが向いていればpngにするような新しい規格があってもなんら問題が無い。
> 動画が見た目mp4でもコーデックが違うように」

→ この批評の後半「動画が見た目mp4でもコーデックが違う」は、**動画ファイルのコンテナ／コーデック分離の正確な描写**。つまり動画の世界では、批評者が「あればいい」と言っている仕組みが既に実装されている。

動画の世界を覗くと見えてくる修正:
- **形式の多さは「トレードオフ」だけでは説明しきれない**
- **特許プールの断片化・企業同盟・ハードウェア普及率**という「歴史と政治」の層がある
- 画像と動画の根本的な違い: **動画はコンテナ／コーデックを構造的に分離**、画像は圧縮方式＝ファイル形式の一体化

---

## 問いの再構築：2階建てモデル

| 階 | 例 | 多様性の理由 |
|---|---|---|
| **上の階（箱・コンテナ）** | .mp4 / .mov / .mkv / .webm / .ts | **用途の非可換性**（編集／配信／機能全部入り／オープン／放送） |
| **下の階（圧縮方式・コーデック）** | H.264 / HEVC / AV1 / VVC | **特許プール・企業同盟・ハードウェア普及率**（歴史と政治） |

**「.mp4で再生できない」の大半は、下の階のコーデック不一致**。外側（箱）が同じでも中身（圧縮）が異なる現象。

画像形式ではこの階層分離が存在しない（JPEG自体が圧縮方式＝ファイル形式）→ 用途ごとに別形式（WebP/AVIF/JPEG XL）が並列。

---

## 主因・副因の切り分け

### 主因1：コンテナ多様化 — 用途の非可換性（上の階）
| 用途 | 要件 | 最適箱 |
|---|---|---|
| ローカル編集 | 瞬時シーク／frame-accurate | .mov（QuickTime／ProRes） |
| 配信・Web | シーク・ABR・互換性 | .mp4（fMP4/CMAF） |
| 機能全部入り | 多言語字幕・多音声・チャプター | .mkv（Matroska） |
| オープン配信 | ロイヤリティフリー | .webm |
| 放送 | パケット落ち耐性・FEC | MPEG-TS（.ts） |

→ 用途要件が代替不能。**箱の多様性は画像形式の「写真用JPEG／ロゴ用PNG」と同じ用途分化**。画像と同型の自然な多様化で、追加で増える余地は小さい。

### 主因2：コーデック多様化 — 特許プール断片化とエコシステム戦争（下の階）
- **H.264の奇跡**: MPEG-LA 単一プール。2010年8月26日「インターネット無料動画のロイヤリティ請求しない」宣言 → 事実上標準化
- **HEVC の失敗**: MPEG-LA / Access Advance / Velos Media の**3プール**。さらに関連特許の**約2/3がどのプールにも属さない**
- **AOMedia の42日**: HEVC Advance 料率発表（2015/7/21）→ **42日後**の9/1 に AOMedia（Google/Netflix/Amazon/Apple/MS/Meta/Intel/Mozilla/Cisco）結成
- **AV1誕生**（2018/3/28）: ロイヤリティフリーを目指す
- **VVC dead on arrival**: 2020/7/6 最終化、性能4倍だが特許不透明でブラウザ0%対応

→ ここは**用途のトレードオフではなく、純粋にリスクとエコシステムの計算**。HEVCはH.264の上位互換（性能でも機能でも）だが、特許不透明ゆえに普及が止まっている。

### 副因1：Apple QuickTime の先行投資が世界標準の土台
- 1991 QuickTime 1.0 → 2001 ISO提出 → 2004 ISOBMFF → MP4/3GP/HEIF/CMAF 全て派生
- **MP4ファミリーのコードポイント登録機関は今も Apple Inc.**

### 副因2：ハードウェアデコード普及率（動画固有の天井）
- H.264: ほぼ全端末 / HEVC: 95%超 / **AV1: スマホ全体で9.76%**（2024 Q2）
- iPhone AV1対応は **iPhone 15 Pro（2023）以降のみ**
- AV1 ソフトウェアエンコードは H.264 比 10〜20倍遅い
- 画像はCPUで十分速いため、**動画特有の律速要因**

### 副因3：イントラ／インター圧縮の使い分け
- ProRes/DNxHD は **intra-frame** 圧縮（1フレーム完結）→ 瞬時シーク・編集向き
- H.264/HEVC/AV1 は **inter-frame** 圧縮（前フレームとの差分）→ 高効率だが切り出しコスト高い
- 同じ「動画の圧縮」でも、用途で正反対の設計

### 副因4：画像・動画での「ネットワーク効果」の非対称
- 新画像形式の採用判断: 個別ユーザ／個別サービスレベル
- 新コーデックの採用判断: **ハードウェアチップ → OS → ブラウザ → 配信サービス**という長い依存連鎖
- → 動画は画像より世代交代が一段と遅い構造

---

## ファクト表（統合・優先度付き・🟢高／🟡中・★重要）

| # | ファクト | 信頼度 | 優先 | 出典 |
|---|---|---|---|---|
| 1 | **動画ファイルは「拡張子／コンテナ／コーデック／プロファイル」の階層構造**。`video/mp4` だけで中身は決まらず、RFC 6381 の `codecs` パラメータ（例 `avc1.64001E`）で一意化 | 🟢 | ★★★ | https://www.rfc-editor.org/rfc/rfc6381.html |
| 2 | **MP4 内部構造 atom/box は Apple QuickTime 由来**。ISOBMFF は QuickTime を ISO が一般化。MP4ファミリーのコードポイント登録は今も Apple Inc. | 🟢 | ★★★ | https://en.wikipedia.org/wiki/ISO_base_media_file_format |
| 3 | QuickTime 1.0 は1991年12月2日 | 🟢 | ★★ | https://en.wikipedia.org/wiki/QuickTime |
| 4 | AVI は1992年11月10日、Microsoft Video for Windows。RIFF チャンクベース | 🟢 | ★ | https://en.wikipedia.org/wiki/Audio_Video_Interleave |
| 5 | **AVIの構造的欠陥**: (1) B-frame 正式非対応→同品質で MP4 比 1.5〜2倍ビットレート (2) 32bit チャンクで4GB制限 | 🟢 | ★★ | https://www.simalabs.ai/resources/avi-format-internals-why-outdated-but-still-around |
| 6 | **H.264/AVC は 2003年3月**承認。Blu-ray/YouTube/Netflix/地デジ一部/Zoomの事実上標準 | 🟢 | ★★★ | https://en.wikipedia.org/wiki/Advanced_Video_Coding |
| 7 | **2010年8月26日、MPEG LA「インターネット無料動画にはH.264ロイヤリティ請求しない」**発表 → 普及決定打 | 🟢 | ★★★ | https://en.wikipedia.org/wiki/Advanced_Video_Coding |
| 8 | HEVC（H.265）2013年標準化。H.264 比で50%のビットレート削減 | 🟢 | ★★ | https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding |
| 9 | **HEVCの3プール**: MPEG LA（約360ファミリー）/ Access Advance（約14,000件）/ Velos Media（27件）。**関連特許の約2/3はどのプールにも属さない** | 🟢 | ★★★ | https://www.thebroadcastbridge.com/content/entry/11204/to-deploy-hevc-users-must-choose-what-patent-pool-to-dive-into |
| 10 | **AOMedia は2015年9月1日設立**、HEVC Advance 料率発表（7/21）の**42日後**。Amazon/Cisco/Google/Intel/MS/Mozilla/Netflix | 🟢 | ★★★ | https://en.wikipedia.org/wiki/Alliance_for_Open_Media |
| 11 | AV1 1.0 は2018年3月28日。H.264 比で47%（1080p）、VP9 比で28%（4K）のビットレート削減 | 🟢 | ★★ | https://aomedia.org/specifications/av1/ |
| 12 | **「AV1 ロイヤリティフリー」には留保**。Sisvel が VP9 約1,000件、AV1 約2,000件の特許プール、表示機器 €0.32/台 | 🟢 | ★★ | https://www.sisvel.com/insights/vp9-av1-q-and-a/ |
| 13 | **VVC（H.266）は2020年7月6日**最終化。HEVC 比50% 削減も、**2026年時点で主要ブラウザ0%対応**・ハードウェアほぼ皆無で「dead on arrival」 | 🟢 | ★★★ | https://www.flatpanelshd.com/news.php?subaction=showfull&id=1764735539 |
| 14 | Matroska（MKV）2002年12月6日フォーク、名前は「マトリョーシカ」（入れ子人形）。EBML ベース。2024年10月 IETF RFC 9559 正式標準化 | 🟢 | ★ | https://datatracker.ietf.org/doc/rfc9559/ |
| 15 | WebM は2010年5月 Google I/O 発表。VP8+Vorbis+Matroska 派生。Google は On2 を**1.246億ドル**で2010年2月に買収 | 🟢 | ★ | https://en.wikipedia.org/wiki/VP8 |
| 16 | MPEG-TS 188バイト固定長+FEC 設計。日本の地デジ（ISDB-T, MPEG-2 Video）、DVB（35億人）、HLS セグメントで現役 | 🟢 | ★★ | https://en.wikipedia.org/wiki/MPEG_transport_stream |
| 17 | **H.264 は2024年時点で開発者の79%が使用**、ブラウザ互換率98.23%。Avanci/Access Advance の新コンテンツロイヤリティは HEVC/VP9/AV1/VVC に課金するが **H.264 は免除** | 🟢 | ★★★ | https://www.videosdk.live/developer-hub/media-server/what-is-h264 |
| 18 | ProRes/DNxHD は intra-frame 圧縮で瞬時シーク。H.264/HEVC は inter-frame | 🟢 | ★★ | https://blog.frame.io/2017/02/15/choose-the-right-codec/ |
| 19 | AV1 ハードウェアデコード対応スマホは 2024 Q2 で**9.76%**（iPhone は 15 Pro 以降のみ、2023年〜） | 🟢 | ★★★ | https://scientiamobile.com/av1-codec-hardware-decode-adoption/ |
| 20 | AV1 ソフトウェアエンコードは H.264 比 10〜20倍遅い。ライブ配信・会議用途に非現実的 | 🟢 | ★★ | https://visionular.ai/av1-decoding-and-hardware-ecosystem-the-future-of-video-delivery/ |
| 21 | **YouTube のエンコード運用**: 全動画 H.264、**3,500再生超**で VP9、**約3,400万再生超**で AV1 優先 | 🟡 | ★★ | https://streaminglearningcenter.com/codecs/which-codecs-does-youtube-use.html |
| 22 | Netflix AV1 配信比率は2025年末で約30%、per-title encoding（2015年〜）で最適化 | 🟡 | ★ | https://www.flatpanelshd.com/news.php?subaction=showfull&id=1764912460 |
| 23 | Zoom は H.264 SVC（Annex G）、Baseline Profile + B-frame 不使用で極小遅延 | 🟡 | ★ | https://www.sciencedirect.com/topics/computer-science/baseline-profile |
| 24 | **GoogleはJPEG XLをChrome 110（2023年2月）でデフォルトサポート削除**。理由は「十分な関心がない」。同時期Googleが自社主導のAVIFを優先してたことで批判 | 🟢 | ★★★ | https://developer.chrome.com/blog/deprecating-jpeg-xl |
| 25 | **JPEG XLは既存JPEGを劣化なしで再圧縮可能**（可逆ロスレス変換）。サイズは約20%削減。技術評価は高かった | 🟢 | ★★ | https://jpeg.org/jpegxl/ |

---

## 通説 → 一次情報での修正

| # | 通説 | 修正 |
|---|---|---|
| 1 | 動画形式が多いのは技術進化の結果 | 上の階（コンテナ）は用途の非可換性、下の階（コーデック）は**特許政治とエコシステム**。技術は結果 |
| 2 | 新しいコーデックほど高効率で勝つ | VVC は2026年時点で「dead on arrival」。効率ではなく**エコシステム**が決める |
| 3 | 特許料の高さが多様化の原因 | HEVC の問題は**料率ではなく断片化**。「誰にいくら払えば合法か分からない」不確実性 |
| 4 | AV1 は完全ロイヤリティフリー | AOMedia 内部の約束で、Sisvel 2,000件など外部特許からは自由でない |
| 5 | MP4 は1つの形式 | MP4 はコンテナの1ブランド。中身のコーデックは H.264/HEVC/AV1 など多様 |
| 6 | AVI は古いから使われない | 古さではなく B-frame 非対応 + 4GB 制限という設計欠陥 |
| 7 | 形式の多さは全てトレードオフ | **半分はトレードオフ（上の階）、半分は歴史・特許・企業の思惑（下の階）**。前作「画像形式」の答えを動画で更新 |

---

## 前作「画像形式」との共鳴マップ

| 前作の論点 | 動画形式での対応 |
|---|---|
| トレードオフが根本原因 | 半分正しい。コンテナの多様化は用途トレードオフ。しかしコーデックの多様化は特許政治 |
| 万能形式は論理的にありえない | 動画では**コンテナ／コーデック分離**で「万能ラッパー」を実現。中身は差し替え可能 |
| GIF特許問題からPNG誕生 | HEVC特許不透明性からAV1誕生。**42日でAOMedia結成**という業界史的早さ |
| Google削除のJPEG XL事件 | 画像形式でも「技術ではなく政治」が決めた事例。動画のVVC dead on arrivalと同型 |
| 画像形式は多様性は機能 | 動画では**箱を1つに寄せつつ中身は多様という「もう一つの答え」**が成立している |

**動画に加わる要素**: ハードウェアデコード依存（画像には実質的に無い制約）。チップ普及に5〜10年かかるため、世代交代が画像より遅い。

---

## 完了条件チェック

| 条件 | 達成 |
|---|---|
| 🟢 8件以上 | ✅ 20件超 |
| 🟡 5件以上 | ✅ 5件 |
| 3方向カバー | ✅ 主流／反証／歴史・接続 |
| 通説への異議3件以上 | ✅ 7件 |
| 前作視聴者コメントへの応答 | ✅ 動画内Block 5で明示的に答える |

---

## 台本コアメッセージ（Step 2）

> **前作「画像形式」で「トレードオフ」と一言でまとめたのは半分の答え。動画ファイルを覗くと、形式は「箱（コンテナ）」と「圧縮方式（コーデック）」の2階建てで、上の階は用途で棲み分けているが、下の階では特許と企業同盟と業界の警戒が30年のドラマを作っている。視聴者コメントの「色々な年代で色々な思惑で作られただけ」は、下の階に関してかなり当たっている。**

### ブロック構成方針
- Block 1（導入）: 前作コメントの提示 → 今日の見取り図（2階建て・特許ドラマ・答え合わせ）
- Block 2（箱とコーデック）: .mp4プロパティ体験から2階建て構造を発見。前作コメントへの最初の答え
- Block 3（上の階）: コンテナは用途で棲み分け。画像の「写真用／ロゴ用」と同型
- Block 4（下の階）: H.264の奇跡 → HEVC分裂 → AOMedia 42日 → VVC死産。特許ドラマ
- Block 5（答え合わせ）: 前作の「トレードオフ」を半分に留める。もう半分は歴史・政治
- Block 6（ハード天井）: コーデック世代交代の律速要因。画像にはない動画固有の制約
- Block 7（まとめ）: 2階建て図の回収。コメントへの感謝で閉じる
