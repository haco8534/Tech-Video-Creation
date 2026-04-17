# リサーチ2a: 基本情報・仕組み・通説

## ファクト表

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | コンテナとコーデックは別概念。コンテナ（MP4, MKV等）は映像・音声・字幕・メタデータを格納する「箱」、コーデック（H.264, AV1等）はデータを圧縮・伸張するアルゴリズム。同じコンテナに異なるコーデックを格納できる | 🟢高 | Pixflow, OTTVerse |
| 2 | 無圧縮1080p/30fps動画は1秒あたり約187MB（1920×1080×24bit×30fps÷8）。1分で約11GB | 🟢高 | Frame.io, Stanford Video Calculator |
| 3 | 動画圧縮の3本柱: (1)フレーム間予測（P/Bフレーム）で時間方向の冗長性除去、(2)DCT（離散コサイン変換）で空間周波数領域に変換、(3)量子化で人間の目に感知しにくい高周波成分を間引く | 🟢高 | ScienceDirect, EE Times |
| 4 | H.264（AVC）は2003年にITUとISO/IECの共同チーム（JVT）が策定。MPEG-2比で約50%のビットレート削減。2026年現在もデプロイ率84%で最も普及 | 🟡中 | Streaming Media Blog 2026, Pixflow |
| 5 | H.265（HEVC）はH.264比で約50%の圧縮効率向上だが、3つの特許プール（MPEG LA, HEVC Advance, Velos Media）による複雑なライセンス体系が普及の障壁。ストリーミングでの採用は約32% | 🟡中 | Streaming Media, CDNetworks |
| 6 | AV1はAlliance for Open Media（2015年設立、Amazon/Cisco/Google/Intel/Microsoft/Mozilla/Netflix）が開発。2018年リリース。H.265比で30〜50%の圧縮効率向上、ロイヤリティフリー | 🟢高 | Alliance for Open Media Wikipedia |
| 7 | 2026年コーデック市場: H.264が44.87%で首位。AV1は17%だが40%の事業者が2026年中の導入を計画 | 🟡中 | Streaming Media Blog 2026 |
| 8 | AVI（1992年、Microsoft）→MOV（Apple）→MP4（2001年、ISO）→MKV（2002年、オープンソース）→FLV（2003年、Adobe）→WebM（2010年、Google）と各社がコンテナを生み出した | 🟢高 | Wikipedia各項目 |
| 9 | MPEG（1988年設立）とITU-T側のVCEGが共同でH.264/H.265/H.266を策定。GoogleはVP8/VP9をオープンソースで開発し、AV1はVP10+Thor+Daalaの統合 | 🟢高 | Wikipedia MPEG, AOMedia |
| 10 | MKVは映像・音声・字幕トラックを無制限に格納可能なオープンソースコンテナ。WebMはMKVのサブセット（Opus/Vorbis限定のWeb向け軽量版） | 🟢高 | Swarmify, Wikipedia |
| 11 | AV1の1080pエンコードでは1,500kbpsでH.265の2,250kbps相当の画質。ブロックサイズはAV1が最大128x128px（H.265は64x64、H.264は16x16） | 🟡中 | FastPix, Ant Media |

## まとめ

動画形式の多さはコンテナとコーデックの分離設計により独立に増殖する構造、各企業・団体が自社エコシステムに最適化した形式を競合的に生み出した歴史、そして圧縮効率向上と特許問題回避の二軸で駆動されるコーデック進化の結果である。
