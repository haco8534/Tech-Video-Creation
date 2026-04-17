# リサーチ2c: 背景・深掘り情報

## ファクト表

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | MPEG-1は1992年承認。VCD向け、VHS相当画質。MPEG-2は1995年公開、DVD・デジタルTV放送の標準 | 🟢高 | Wikipedia MPEG-1/MPEG-2 |
| 2 | H.264は2003年標準化から20年以上経った2026年現在もオンライン動画の約80%がH.264エンコード | 🟢高 | Vcodex, free-codecs.com |
| 3 | AVI（1992年11月）はVideo for Windowsの一部としてリリース。RIFF形式ベース。ファイルサイズ上限2GB、字幕・複数音声非対応、ストリーミング不適合 | 🟢高 | Wikipedia AVI, Library of Congress |
| 4 | MKV（Matroska）は2002年12月発表。MCFからのフォークで、EBML採用を巡る意見対立を契機にSteve Lhommeが創設。名前はロシアのマトリョーシカ人形に由来。LGPL/BSDライセンス | 🟢高 | Wikipedia Matroska, matroska.org |
| 5 | WebMは2010年5月にGoogle I/Oで発表。On2買収（約1.246億ドル）でVP8をBSDオープンソース化。MatroskaベースのWeb向けプロファイル | 🟢高 | Wikipedia WebM/VP8 |
| 6 | H.264ライセンス: MPEG LA経由で1デバイス$0.20（年間上限$975万）。2026年以降、Via LAが新規ストリーミング料金を年間$10万→最大$450万に引き上げ | 🟡中 | Tom's Hardware, Streaming Media |
| 7 | H.265ライセンス3プール合計: MPEG LA $0.20/台（上限$2,500万）、Access Advance最大$2.03/台、Velos Media $1.00超（非公開）。合計H.264の約10倍 | 🟡中 | Wikipedia HEVC, Streaming Learning Center |
| 8 | AOMedia 2015年9月設立、7社創設。H.265の高額・不透明ライセンスへの対抗としてAV1を2018年リリース | 🟢高 | AOMedia公式プレスリリース |
| 9 | Netflix: 2025年末時点でAV1が全ストリーミングの約30%。AVC比で帯域1/3削減、VMAF 4.3pt向上、バッファリング中断45%削減 | 🟢高 | Netflix TechBlog |
| 10 | YouTube: VP9を主力使用、AV1ライブストリーミング対応（Enhanced RTMP）展開中。古いデバイスはH.264フォールバック | 🟡中 | Tom's Hardware, Ant Media |
| 11 | ProRes（Apple 2007年〜）/DNxHR（Avid）: イントラフレーム圧縮の中間コーデック。編集時のスクラブ高速。配信用コーデックとは設計目的が根本的に異なる | 🟡中 | Pixflow, Wikipedia ProRes |
| 12 | 日本の地デジ（ISDB-T）: フルセグはMPEG-2、ワンセグ（320x240）はH.264を採用。帯域制約が異なるコーデック選択の実例 | 🟢高 | 総務省資料 |
| 13 | VVC/H.266は2020年7月最終化。HEVC比で約50%ビットレート削減可能だが、ブラウザ対応・HLSサポートが限定的で大規模展開は数年先 | 🟡中 | Wikipedia VVC, FlatpanelsHD |
| 14 | VP9は2013年6月リリース。VP8比で高解像度圧縮効率50%向上。ロイヤリティフリー維持。AV1の前身 | 🟢高 | Wikipedia VP9 |

## まとめ

動画形式の歴史は「技術進化」「ビジネスモデル対立」「用途多様化」の3軸が30年以上にわたって積み重なった産業史。H.265の特許プール分裂がAV1連合を生み、AVIの限界がMKVのオープンソース回答を生んだ。ProRes/DNxHRのような編集専用コーデックの併存は、用途ごとに最適解が異なることの証明。
