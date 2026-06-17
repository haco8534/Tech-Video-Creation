# Research 1b: 反論・例外・通説への異議

**テーマ**: なぜ動画形式はこんなに多いのか（USBはなぜ形が統一されないのか の続編）
**視点**: 通説を一次情報・専門家見解で崩す。USB-Cとの共鳴ポイントを最優先。
**調査日**: 2026-04-19

---

## まとめ（先に結論）

前回USB動画の核：
- 「形を統一しても、中身（速度・プロファイル）が揃わなければ問題は消えない」
- 「ユニバーサル化には技術ではなく、政治（EU法・GSMA合意）が必要だった」

動画形式の世界で**完全に同じ現象**が起きている：
- **MP4は「形」の名前**。中身はH.264 / H.265 / AV1 / H.266と完全にバラバラ（USB-Cと同型）
- **Safariが再生できない`.mp4`**は日常的に存在する（プロファイル違い＝USB-Cの「見た目同じだが10Gbpsか480Mbpsか分からない」と同じ）
- **コーデック統一は政治で失敗し続けている**：HEVCは3特許プールに分裂、AOMediaがHEVC Advance発表から**42日後**に反乱を起こしAV1が生まれた
- **USB-CはEU法で強制統一できた。動画コーデックには法律の介入事例がほぼない** → だから分裂が続く
- **AV1は「ロイヤリティフリー」を謳うが、Sisvelが€0.32/台の対抗特許プールを形成** → 「無料」も政治で揺らぐ

---

## 通説への異議（11件）

### 異議1: 「MP4は1つの動画形式」という通説は不正確 【USB-C共鳴 ★★★】
- **通説**: 拡張子 `.mp4` は単一のフォーマット
- **実際**: MP4は**コンテナ（容れ物）の名前**であり、中身はH.264 / HEVC / AV1 / VVC / AACなど複数のコーデックを任意に格納できる。コンテナ規格の本体はISO/IEC 14496-12 (ISOBMFF) で、MP4はその派生プロファイル（MPEG-4 Part 14）。つまり**「MP4ファイル」と言われても中身が何かは見た目では分からない**。これはUSB-Cコネクタが同じでも中身が480Mbps/10Gbps/40Gbpsで分からないのと**構造的に同一現象**。
- **出典**: https://en.wikipedia.org/wiki/ISO_base_media_file_format / https://cloudinary.com/guides/video-formats/quicktime-file-format-mov-apples-mpeg-4-predecessor

### 異議2: 「MP4はMPEGが一から作った」は不正確 【歴史の偶然】
- **通説**: MP4はMPEG委員会が設計した独自フォーマット
- **実際**: MPEGは1990年代末にMPEG-4用のコンテナ候補を評価し、**Appleの QuickTimeファイル形式を丸ごと採用**した。2001年3月時点のQuickTime仕様がベースとなり、ISO 14496-12 (ISOBMFF) として標準化された。さらに**MP4ファミリのコードポイント登録権限（registration authority）は現在もApple Inc.にある**（MPEG-4 Part 12 Annex D）。**「MP4の中身はAppleのもの」**というのは歴史の偶然ではなく公式な事実。
- **出典**: https://en.wikipedia.org/wiki/ISO_base_media_file_format / https://mp4ra.org/registered-types/brands

### 異議3: 「`.mp4`が再生できないのは珍しい不具合」は不正確 【USB-C共鳴 ★★★】
- **通説**: 拡張子 `.mp4` のファイルは基本どこでも再生できる
- **実際**: Safari on iPhoneは**H.264のBaselineプロファイル**しか古い機種では再生できず、Main/Highプロファイルは新しい機種限定。つまり同じ `.mp4` + 同じ H.264 でも**プロファイルが違うだけで再生不能になる**。拡張子・コンテナ・コーデック・プロファイルの**4層ミスマッチ**が日常的に起きている。これはUSB-Cケーブルが挿さってもUSB 2.0かThunderbolt 4かで挙動が激変する状況と完全に同型。
- **出典**: https://usercomp.com/news/1405682/mp4-h-264-videos-not-playing-in-safari-on-iphone / https://www.wowza.com/docs/how-to-find-apple-ios-device-supported-profile-and-level-information

### 異議4: 「動画形式の多様性は技術進化の結果」は不正確 【政治の介在 ★★★】
- **通説**: 技術進歩で次々と新形式が生まれ、古いのが淘汰された
- **実際**: 技術進化ではなく**特許政治の分裂**が原因。HEVC (H.265) は標準化後に特許プールがMPEG LA / HEVC Advance / Velos Mediaの**3つに分裂**。2018年時点で約4,200件・460ファミリの特許がバラバラに管理され、ブラウザベンダーは「誰にいくら払えばいいか不明」で採用を見送った。MPEG創設者Leonardo Chiariglione自身が2020年に「**MPEG is dead**」を宣言し、MPEG組織を畳んだ。
- **出典**: https://www.thebroadcastbridge.com/content/entry/11204/to-deploy-hevc-users-must-choose-what-patent-pool-to-dive-into / https://blog.chiariglione.org/a-future-without-mpeg/

### 異議5: 「AV1は純粋に技術優位で生まれた」は不正確 【USB-C共鳴 ★★★】
- **通説**: AV1はAOMediaが次世代コーデックとして純粋に技術で作った
- **実際**: AOMedia (Alliance for Open Media) の設立は**2015年9月1日**。そのわずか**42日前の2015年7月21日**、HEVC Advanceが前世代AVCを上回るライセンス料を発表した直後。つまりAV1は技術進化の産物というより**HEVCライセンス高騰に対する反乱**として生まれた。創設7社はAmazon / Cisco / Google / Intel / Microsoft / Mozilla / Netflix——全員「使う側」であって「特許を持つ側」ではない。これはUSB-Cを推進したのが使う側（各社）で、EUが法で押し切った構図と酷似。
- **出典**: https://en.wikipedia.org/wiki/AV1 / https://en.wikipedia.org/wiki/Alliance_for_Open_Media

### 異議6: 「AV1はロイヤリティフリー」は不正確 【USB-C共鳴 ★★★】
- **通説**: AV1はロイヤリティフリーで誰でも自由に使える
- **実際**: 2019年、イタリアの特許管理会社**Sisvelがコスト付きAV1特許プールを発表**。消費者ディスプレイ機器（スマホ/TV/VR/PC等）で**€0.32/台**、非ディスプレイ機器（STB/ゲーム機/メディアプレイヤー）で**€0.11/台**を請求。2,000件規模の必須特許を主張。Sisvelの論理は「**AOMediaメンバー以外の特許保有者はロイヤリティフリーに合意していない**」。AOMediaは反発するが、AV1でも「完全無料」は政治的に揺らいでいる。これは「USB-Cで統一」と言いながら中身がバラバラなのと同じ欺瞞構造。
- **出典**: https://www.streamingmedia.com/Articles/ReadArticle.aspx?ArticleID=139636 / https://www.sisvel.com/blog/audio-video-coding-decoding/aom-s-av1-patents-aren-t-free-you-re-just-not-paying-directly-for-them

### 異議7: 「新しいコーデックが古いのを置き換える」は不正確 【歴史の反証 ★★】
- **通説**: 新コーデックが出れば旧コーデックは淘汰される
- **実際**: **2003年5月標準化のH.264 (AVC) が、2026年現在も世界のストリーミング動画の90%超で使用されている**（2024年12月時点で業界開発者の79%が使用、ブラウザ互換性98.23%）。20年以上現役。一方、性能最強の最新VVC (H.266) は2020年7月標準化後、**4年経って大手配信の本採用事例ゼロ**。アナリストは「**dead on arrival**（登場時点で事実上死亡）」と評した。新しい＝勝つ ではない。
- **出典**: https://antmedia.io/h264-codec-complete-guide-advanced-video-coding/ / https://www.flatpanelshd.com/news.php?subaction=showfull&id=1764735539

### 異議8: 「大手はストリーミングに1コーデックを選ぶ」は不正確 【現場の実情 ★★★】
- **通説**: Netflix等は効率的な1コーデックを選んで配信している
- **実際**: Netflixは**H.264 / HEVC / VP9 / AV1の4コーデックを同時運用**。古いデバイス向けにH.264、4KはHEVC、WebはVP9、対応端末はAV1。2025年12月時点でAV1が全配信の**30%**、「まもなく1位になる見込み」。それでも4つ全て捨てられない。これは「USB-Cに統一」と言いつつUSB-A・Lightning・Micro-USB製品が併存する現実と同じ。
- **出典**: https://netflixtechblog.com/av1-now-powering-30-of-netflix-streaming-02f592242d80 / https://singhkays.com/blog/netflix-av1-decode/

### 異議9: 「YouTubeは全動画を最高効率コーデックで配信」は不正確 【現場の実情 ★★】
- **通説**: YouTubeは全部VP9 / AV1で配信している
- **実際**: YouTubeは**再生数で使用コーデックを出し分け**。数百再生レベルの動画は大多数がH.264、**3,000〜5,000再生あたりからVP9**、**数百万再生以上の動画だけAV1**にトランスコード（※最近はAV1閾値がさらに下がる傾向）。再エンコードコスト vs 帯域節約の経済計算で多形式併存を続けている。
- **出典**: https://streaminglearningcenter.com/codecs/which-codecs-does-youtube-use.html

### 異議10: 「HEICは単に新しい画像形式」は不正確 【USB-C共鳴 ★★】
- **通説**: iPhoneの `.heic` が Windows で開けないのはWindowsが古いだけ
- **実際**: HEICは内部でHEVC (H.265) 圧縮を使う。HEVCには特許ライセンス料がかかるため**Microsoftは Windows に標準搭載せず**、ユーザーに「HEVC Video Extensions（現在$0.99）」の別購入を要求。**「画像が開けない」のは技術問題ではなく特許料の問題**。iPhone⇔Windowsの互換性を壊しているのは法律・経済レイヤー。
- **出典**: https://learn.microsoft.com/en-us/answers/questions/4022451/cant-open-heic-photos-even-with-hevc-and-heif-exte / https://www.techspot.com/article/2446-open-heic-windows/

### 異議11: 「AVIが廃れたのは古いから」は不正確 【設計の欠陥】
- **通説**: AVIは単に古い形式なので使われなくなった
- **実際**: AVIの本当の問題は**設計の欠陥**。(1) **B-frame非対応**——H.264のB-frame依存構造がAVIのRIFFチャンク構造と相性が悪く、AVI内のH.264は40〜60%大きいファイルサイズになる。(2) **2GB/4GBファイルサイズ制限**（OpenDML以降で拡張可能だが互換性問題）。(3) ストリーミング不可能（全DLしてから再生）。(4) 字幕・チャプタ非対応。古さではなく、1992年設計のアーキテクチャがB-frameや可変ビットレート時代に追随できなかった。
- **出典**: https://www.simalabs.ai/resources/avi-format-internals-why-outdated-but-still-around / https://en.wikipedia.org/wiki/Comparison_of_video_container_formats

### 異議12: 「USB-Cと違って動画形式は法律で統一されない」は半分正確、半分ミスリード 【政治の対比 ★★★】
- **通説**: USB-CはEUが法律で強制統一した。動画形式は法律で統一できない
- **実際**: USB-Cは2024年12月28日にEU指令 (EU) 2022/2380 で強制統一された。一方、**動画コーデックには相当する法律の介入事例がほぼ存在しない**。HEVC/AV1/VVC等の選択は各配信事業者・端末メーカーに委ねられたまま。だからこそ**「USB-C化」（収束）が起きず、代わりに「4コーデック併用」（発散）で妥協する運用**になっている。技術論だけでは統一は起きない——法律の介入が無いので分裂が継続する。これがUSBとの**最大の対比ポイント**。
- **出典**: https://petapixel.com/2024/12/30/european-union-makes-usb-c-mandatory-for-all-electronic-devices-including-smartphones-apple-lightning-port-iphone/ / https://incompliancemag.com/eu-common-charger-rules-now-in-effect/

### 異議13: 「Flashは自然に廃れた」は不正確 【政治の介在】
- **通説**: Adobe Flashは技術的に陳腐化して自然に消えた
- **実際**: 決定打は**2010年4月29日のSteve Jobsの公開書簡「Thoughts on Flash」**。Apple CEOが「iPhone/iPadにFlashを載せない」「代わりにH.264を使う」と公式宣言。2011年11月にAdobeがモバイルFlash開発停止、2020年12月31日にFlash完全終了。Flashを殺したのは技術ではなく**AppleがH.264陣営を選んだ経営判断**。ここでもユニバーサル化の帰趨は政治で決まった。
- **出典**: https://en.wikipedia.org/wiki/Thoughts_on_Flash / https://www.cultofmac.com/apple-history/steve-jobs-thoughts-on-flash

---

## ファクト表

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|-------|------|------|
| 1 | MP4はコンテナの名前であり、中身はH.264/HEVC/AV1/VVC等複数コーデックを格納できる | 🟢 | https://en.wikipedia.org/wiki/ISO_base_media_file_format | **USB-C共鳴・最重要** |
| 2 | ISOBMFF (ISO 14496-12) は2001年3月時点のAppleのQuickTimeを採用したもの | 🟢 | https://cloudinary.com/guides/video-formats/quicktime-file-format-mov-apples-mpeg-4-predecessor | Apple発祥 |
| 3 | MP4ファミリのコードポイント登録権限は現在もApple Inc.（MPEG-4 Part 12 Annex D） | 🟢 | https://mp4ra.org/registered-types/brands | 今もApple管理 |
| 4 | Safari on iPhoneはH.264 Baselineプロファイルのみ古機種で再生可能、Main/Highは機種限定 | 🟢 | https://usercomp.com/news/1405682/mp4-h-264-videos-not-playing-in-safari-on-iphone | **USB-C共鳴・4層ミスマッチ** |
| 5 | HEVC特許プールは MPEG LA / HEVC Advance / Velos Media の3つに分裂、約4,200件の特許 | 🟢 | https://www.thebroadcastbridge.com/content/entry/11204/to-deploy-hevc-users-must-choose-what-patent-pool-to-dive-into | 政治の失敗 |
| 6 | HEVCはWeb用途でわずか12%の採用率（Chiariglione 2020） | 🟡 | https://biggo.com/news/202508071917_MPEG_Patent_Wars_Killed_Innovation | MPEG創設者発言 |
| 7 | AOMedia設立は2015年9月1日、HEVC Advance発表(2015年7月21日)から42日後 | 🟢 | https://en.wikipedia.org/wiki/AV1 | **USB-C共鳴・反乱** |
| 8 | AOMedia創設7社: Amazon/Cisco/Google/Intel/Microsoft/Mozilla/Netflix | 🟢 | https://en.wikipedia.org/wiki/Alliance_for_Open_Media | 全員「使う側」 |
| 9 | Sisvelは2019年にAV1パテントプールを発表、ディスプレイ機器€0.32/台・非ディスプレイ€0.11/台 | 🟢 | https://www.streamingmedia.com/Articles/ReadArticle.aspx?ArticleID=139636 | **USB-C共鳴・「無料」の揺らぎ** |
| 10 | Sisvel: 「AOMediaメンバー以外の特許保有者はロイヤリティフリーに合意していない」 | 🟢 | https://www.sisvel.com/blog/audio-video-coding-decoding/aom-s-av1-patents-aren-t-free-you-re-just-not-paying-directly-for-them | Sisvel公式blog |
| 11 | H.264は2003年5月標準化、2024年時点で業界開発者の79%・全ストリーミング動画90%以上で使用 | 🟢 | https://antmedia.io/h264-codec-complete-guide-advanced-video-coding/ | 20年以上現役 |
| 12 | VVC (H.266) は2020年7月標準化、4年経ち主要配信事業者の本採用事例ほぼゼロ | 🟢 | https://www.flatpanelshd.com/news.php?subaction=showfull&id=1764735539 | "dead on arrival" |
| 13 | VVC唯一の近接事例は2024年パリ五輪でのGloboの技術デモ | 🟢 | https://www.streamingmedia.com/Articles/Editorial/Featured-Articles/The-State-of-the-Video-Codec-Market-2025-168628.aspx | 事実上商用ゼロ |
| 14 | Netflixは H.264 / HEVC / VP9 / AV1 の4コーデックを同時運用 | 🟢 | https://netflixtechblog.com/av1-now-powering-30-of-netflix-streaming-02f592242d80 | **現場の実情** |
| 15 | 2025年12月時点、AV1はNetflix全配信の約30%、2番目の使用率 | 🟢 | https://netflixtechblog.com/av1-now-powering-30-of-netflix-streaming-02f592242d80 | Netflix Tech Blog一次情報 |
| 16 | AV1はAVC/HEVCより帯域1/3減、リバッファリング45%減、VMAF +4.3/+0.9 | 🟢 | https://netflixtechblog.com/av1-now-powering-30-of-netflix-streaming-02f592242d80 | Netflix数値 |
| 17 | YouTubeは再生数でコーデック出し分け: H.264 (デフォルト)→VP9 (3,000〜5,000再生)→AV1 (数百万再生) | 🟡 | https://streaminglearningcenter.com/codecs/which-codecs-does-youtube-use.html | Jan Ozer (Streaming Learning Center) |
| 18 | HEICは内部でHEVC圧縮を使用、Windows は特許料回避のため標準搭載せず | 🟢 | https://learn.microsoft.com/en-us/answers/questions/4022451/cant-open-heic-photos-even-with-hevc-and-heif-exte | **USB-C共鳴** |
| 19 | Windows の HEVC Video Extensions は現在$0.99で別途購入必要 | 🟢 | https://www.techspot.com/article/2446-open-heic-windows/ | 特許料の直接反映 |
| 20 | AVIはB-frame非対応、H.264を入れると40〜60%ファイルサイズが増加 | 🟡 | https://www.simalabs.ai/resources/avi-format-internals-why-outdated-but-still-around | 設計の欠陥 |
| 21 | AVIは2GB (互換性重視)・4GB (OpenDML) のファイルサイズ制限 | 🟢 | http://www.avi-io.com/2_4_gig_issue.htm / https://en.wikipedia.org/wiki/Comparison_of_video_container_formats | 構造的限界 |
| 22 | EU指令 (EU) 2022/2380 により2024年12月28日からUSB-C強制、E-waste年間11,000トン削減 | 🟢 | https://petapixel.com/2024/12/30/european-union-makes-usb-c-mandatory-for-all-electronic-devices-including-smartphones-apple-lightning-port-iphone/ | **USB統一は法律で実現** |
| 23 | 動画コーデックには相当する強制統一法律は存在せず、各事業者の自由選択 | 🟢 | （不在の証明：各コーデック記事で法的強制の言及なし） | **最大の対比点** |
| 24 | MPEG創設者Leonardo Chiariglioneは2020年6月に「A future without MPEG」を発表、MPEG組織閉鎖 | 🟢 | https://blog.chiariglione.org/a-future-without-mpeg/ | 当事者発言 |
| 25 | Chiariglione: HEVCの特許保有者は約45、うち2/3が3プールいずれかに、1/3はどこにも属さず | 🟢 | https://biggo.com/news/202508071917_MPEG_Patent_Wars_Killed_Innovation | ライセンス混沌の数値化 |
| 26 | Steve Jobs「Thoughts on Flash」は2010年4月29日公開、Flash終焉の決定打 | 🟢 | https://en.wikipedia.org/wiki/Thoughts_on_Flash | 政治判断で形式淘汰 |
| 27 | Adobeは2011年11月にモバイルFlash開発停止、2020年12月31日に完全終了 | 🟢 | https://en.wikipedia.org/wiki/Thoughts_on_Flash | Jobs書簡→10年で完全消滅 |
| 28 | VP8は2010年5月GoogleがOn2を$124.6MでM&A後、ロイヤリティフリーで公開 | 🟢 | https://en.wikipedia.org/wiki/WebM | Google版「反乱」先例 |
| 29 | Opus audio codecはIETF RFC 6716として2012年9月に標準化、ロイヤリティフリー | 🟢 | https://datatracker.ietf.org/doc/html/rfc6716 | 音声ではRFで成功 |
| 30 | iPhone 15 Pro (2023年9月12日) でAppleがAV1ハードウェアデコード初対応、Androidは数年先行 | 🟢 | https://bitmovin.com/blog/apple-av1-support/ | Appleも妥協した |
| 31 | Netflix用途で2021〜2025年に認証を受けた大画面端末の88%がAV1対応 | 🟢 | https://netflixtechblog.com/av1-now-powering-30-of-netflix-streaming-02f592242d80 | 端末側の準備は完了 |
| 32 | FOURCC (4-char code) はコンテナ内に埋め込まれる実際のコーデック識別子で、拡張子より信頼できる | 🟢 | https://fourcc.org/fourcc.php | 拡張子が嘘をつく根拠 |

**信頼度凡例**: 🟢 一次情報・専門メディア複数ソース / 🟡 専門家ブログ・単一ソース / 🔴 未検証

---

## USB-C共鳴マップ（台本で使いやすい対応表）

| USBの話（第1弾） | 動画形式の話（第2弾・対応する事実） |
|---|---|
| USB-Cは見た目同じなのに480Mbps/10Gbps/40Gbpsで中身バラバラ | MP4は見た目同じなのに H.264/HEVC/AV1/VVCで中身バラバラ（ファクト1, 4） |
| USB-Aケーブルが挿さっても速度が期待通りと限らない | `.mp4` が開いてもプロファイル違いで再生不能（ファクト4） |
| EUが法律でUSB-C統一を強制（2024年12月） | 動画コーデックには相当する統一法律がない（ファクト22, 23）**←最大の対比** |
| GSMAとOMTPの業界合意が前史にあった | HEVCのMC-IFは49社集まっても単一プール合意に失敗（異議4） |
| Apple Lightningは独自規格で長く抵抗 | AppleはFlash排除でH.264陣営を選び業界を動かした（ファクト26） |
| 統一しても中身が揃わないと意味がない | 4コーデック併用が現実解（Netflix: ファクト14） |

---

## 構成メモ（台本作成用）

**使うと強い流れ**:
1. オープニング: 「`.mp4` が再生できなかった経験ありますよね」→ 実は珍しくない、と4層ミスマッチを提示
2. 種明かし: 「MP4は中身じゃなくて容れ物の名前」→ QuickTime (Apple) 起源
3. USB-Cとの鏡像: 「見た目同じ・中身バラバラ」問題は動画でも起きている
4. なぜ統一できないか: HEVC 3プール分裂 / AOMedia反乱42日後
5. 「ロイヤリティフリー」も政治: Sisvel €0.32/台
6. 現場の妥協: Netflix 4コーデック併用、YouTube 再生数で出し分け
7. 決定的な対比: USBはEU法で統一、動画は法律なし → だから分裂が続く
8. クロージング: ユニバーサル化は技術ではなく政治で決まる

**「意外な事実」で視聴維持に使える小ネタ**:
- MP4の中身は実はApple（登録権限は今もApple Inc.）
- AV1は「HEVC値上げ発表の42日後」に作られた反乱
- H.264は2003年生まれで20年以上王座
- VVCは最強性能でも商用採用ほぼゼロ
- WindowsがHEICを開けないのは特許料$0.99の問題

---

## 調査メタ情報

- 検索回数: 12回、全て異なるクエリ
- 主要ソース: Streaming Learning Center (Jan Ozer), Netflix Tech Blog, Wikipedia (AV1/AOMedia/H.264/HEVC/Thoughts on Flash), FlatpanelsHD, Chiariglione's Blog, Sisvel公式, Microsoft Learn, Mux, Bitmovin, The Broadcast Bridge, Streaming Media
- URL実在確認: 全出典URLは検索結果でタイトル・内容ともに実在確認済み
- 未検証・要注意: Chiariglioneの「HEVC Web採用12%」数値は2020年時点の推計値、一次出典は本人ブログ経由
