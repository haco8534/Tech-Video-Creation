# リサーチチェックポイント：背景・深掘り情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | LZWアルゴリズムはLZ77（1977年）→LZ78（1978年）→LZW（1984年）と発展。Abraham Lempel、Jacob Ziv、Terry Welchの3人の名前に由来。LZ77とLZ78はイスラエルのテクニオン工科大学の研究者、LZWはSperry社のWelchが改良 | 🟢高 | 学術文献 / Wikipedia |
| 2 | LZWの仕組み：データを読みながら辞書を動的に構築し、既知の文字列を短いコードに置換。新しいパターンを辞書に追加し続けることで、繰り返しが多いデータほど効率的に圧縮される | 🟢高 | Terry Welch論文 / Columbia University |
| 3 | Deflate圧縮は1993年にPhil Katzが開発（ZIPフォーマットのために）。LZ77（スライディングウィンドウ方式のパターンマッチング）+ ハフマン符号化の組み合わせ。特許フリーで設計された | 🟢高 | Wikipedia / RFC 1951 |
| 4 | PNGの前処理フィルタリングが革新的：各ピクセル行に対してNone/Sub/Up/Average/Paethの5種のフィルタを適用し、数値の差分を取ることで後段のDeflate圧縮の効率を飛躍的に向上させた | 🟢高 | W3C PNG Specification / libpng.org |
| 5 | 「Burn All GIFs Day」は1999年11月5日、League for Programming Freedom（Richard Stallmanが1989年に設立）が主催。Unisys本社前でGIF画像のプリントアウトを赤ペンで"burn"するパフォーマンスも計画された | 🟢高 | burnallgifs.org / Smithsonian |
| 6 | 米国国防総省が1999年にGIFからPNGへの移行を義務化する計画をまとめた | 🟡中 | burnallgifs.org |
| 7 | AccuWeatherがGIFからPNGへの切り替えを公式に表明し、$380万のライセンス要求に対する抗議として注目された | 🟡中 | Stanford / nextgov.com |
| 8 | GIFの特許失効（米国2003年6月20日）後、多くのフリーソフトウェアがGIFサポートを復活。日本のOpenOffice.orgでもGIF対応が復活 | 🟢高 | Wikipedia |
| 9 | GIF特許騒動はソフトウェア特許制度全体への批判を加速させた。EFF（Electronic Frontier Foundation）やLPF（League for Programming Freedom）が積極的に反対運動を展開 | 🟢高 | MIT / EFF |
| 10 | 2010年代にGIFがSNSで復活。Tumblr、Twitter、FacebookがGIF対応を強化。Giphyが2013年設立、Tenorも同時期に登場。2020年にFacebookがGiphyを4億ドルで買収 | 🟢高 | Smithsonian / Mashable |
| 11 | GIFの「復活」はPNGと競合する形ではなく、「アニメーション」というGIF独自のニッチで起きた。PNGは静止画の世界標準として定着し、GIFはアニメーション・リアクション文化の基盤となった | 🟢高 | 複数メディアの共通認識 |
| 12 | この物語の教訓：技術標準は技術的優劣だけで決まらない。特許・法律・コミュニティの力学・文化的な用途が複合的に影響する。GIF/PNG/JPEGが「共存」している現状自体が、技術の進化は線形ではないことを示す | 🟡中 | 分析的まとめ |

## まとめ・所感

深掘りで見えてきた物語の3つの層：
1. **技術の層**: LZW → Deflate という圧縮アルゴリズムの進化。辞書ベース vs スライディングウィンドウ+ハフマンという技術的な対比は視覚的に説明しやすい
2. **政治の層**: 特許制度 vs オープンスタンダードという根本的な対立。Richard Stallman、League for Programming Freedom、GNUプロジェクトという人物・組織の登場で物語に血が通う
3. **文化の層**: GIFの復活という予想外の結末。PNGは技術的に「勝った」がGIFは文化的に「生き残った」。この両者が共存している現状が最も深い洞察を与える

台本構成への示唆：
- 「LZWの辞書構築」をアナロジーで体験させる → 「Deflateの二段構え」との対比で技術的理解を深める
- 「Burn All GIFs Day」のエピソードは中盤の意外性として使える
- GIFの復活は最終ブロックで「直感の再構築」に使える
