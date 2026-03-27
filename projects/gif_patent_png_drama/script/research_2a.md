# リサーチチェックポイント：主流・基本情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | GIFは1987年6月15日にCompuServeのSteve Wilhiteが率いるチームが開発。遅いダイアルアップ回線でカラー画像を効率的に転送するための形式だった | 🟢高 | Wikipedia / CompuServe公式記録 |
| 2 | GIFはLZW（Lempel-Ziv-Welch）可逆圧縮アルゴリズムを採用。LZWは辞書ベースの圧縮方式で、繰り返しパターンを短いコードに置換する | 🟢高 | 米国特許 4,558,302 |
| 3 | LZW特許は1983年6月20日にTerry Welchが出願、1985年12月10日にSperry社（後のUnisys）に付与された（米国特許番号4,558,302） | 🟢高 | 米国特許庁 / Library of Congress |
| 4 | CompuServeのエンジニアはGIF開発時に、LZWが特許で保護されていることを知らなかった。当時LZWは学術文献で広く紹介されており公有技術と誤解されていた | 🟢高 | Stanford / LibreTexts |
| 5 | 1993年にGIFのアルゴリズムがLZW特許に抵触していることが発覚。1994年末、UnisysとCompuServeがライセンス契約を締結し、ソフトウェア開発者にロイヤリティ支払いを要求する方針を発表 | 🟢高 | MIT / marketplace.org |
| 6 | PNGは1995年1月4日にThomas Boutellがcomp.graphicsニュースグループで提案。最初のドラフト名は「PBF（Portable Bitmap Format）」 | 🟢高 | libpng.org / Linux Journal |
| 7 | PNGの名称はDraft 5で採用。公式には「Portable Network Graphics」だが、再帰的バクロニム「PNG is Not GIF」としても知られる | 🟢高 | libpng.org / Wikipedia |
| 8 | PNGの仕様は提案からわずか約2ヶ月でDraft 9としてフリーズ。1995年3月初旬に仕様凍結 | 🟢高 | libpng.org |
| 9 | CompuServe自身が1995年2月7日にPNGをGIFの後継として公式に支持を表明した | 🟢高 | libpng.org / Linux Journal |
| 10 | W3Cが1996年10月1日にPNG仕様をリリース。ISO/IEC 15948として国際標準化 | 🟢高 | W3C |
| 11 | PNGはDeflate圧縮（LZ77 + ハフマン符号化の組み合わせ）を採用。特許フリー。画像専用の前処理フィルタリング（Sub, Up, Average, Paeth）を追加し、同等コンテンツでGIFより10-50%高い圧縮率を実現 | 🟢高 | libpng.org / W3C |
| 12 | PNGの技術的優位：24ビットフルカラー対応（GIFは256色）、8ビットアルファチャンネル（GIFは1色のみ透過）、Adam7インターレース、ガンマ補正サポート | 🟢高 | W3C / libpng.org |

## まとめ・所感

GIF → LZW特許発覚 → PNG誕生という一連の流れは、技術的な事実として非常に明確に文書化されている。特に注目すべき点：
- CompuServeがLZW特許の存在を知らなかったという点が、この物語の悲喜劇的な出発点
- PNGの開発速度（提案から仕様凍結まで約2ヶ月）は驚異的で、インターネットコミュニティの集合知の力を示す
- CompuServe自身がPNGを支持した点は、GIFの生みの親が自分の子どもの「後継者」を認めたというドラマ
- PNGの名前自体（PNG is Not GIF）が怒りの結晶であり、物語の象徴として使える
