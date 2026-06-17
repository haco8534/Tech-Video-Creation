# Research 2a: QRコード基本情報・仕組み・通説

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | QRコードは1994年にデンソーウェーブ（当時はデンソーの一事業部）の原昌宏がわずか2人のチームで開発した。「Quick Response」の略で、高速読み取りをコンセプトに設計された。 | 🟢高 | [デンソーウェーブ公式](https://www.qrcode.com/history/)、[特許庁](https://www.jpo.go.jp/news/koho/innovation/01_qrcode.html) |
| 2 | QRコードの3隅に配置される位置検出パターン（ファインダパターン）は、白黒の比率が1:1:3:1:1になっている。この比率は、原たちがチラシ・雑誌・段ボールなど膨大な印刷物を調査し、「印刷物の中で最も使われていない比率」として発見したもの。 | 🟢高 | [デンソーウェーブ公式](https://www.denso-wave.com/ja/technology/vol1.html)、[QRcode.com](https://www.qrcode.com/history/) |
| 3 | 位置検出パターンは7x7モジュールの入れ子構造（外側黒7x7、中間白5x5、内側黒3x3）で、どの方向からスキャンしても1:1:3:1:1の比率が検出される。これにより360度どの角度からでも読み取りが可能。 | 🟢高 | [Wikipedia (en)](https://en.wikipedia.org/wiki/QR_code)、[Scanova](https://scanova.io/blog/qr-code-structure/) |
| 4 | QRコードの基本構成要素は、位置検出パターン（3隅）、アライメントパターン（歪み補正用）、タイミングパターン（セル座標特定用の白黒交互パターン）、フォーマット情報（誤り訂正レベル・マスク番号）、バージョン情報、データ領域、静寂ゾーン（周囲の余白）からなる。 | 🟢高 | [キーエンス](https://www.keyence.co.jp/ss/products/autoid/codereader/basic2d_qr.jsp)、[QR WORLD](https://qr.c-cloud.co.jp/articles/knowledge/structure) |
| 5 | 静寂ゾーン（Quiet Zone）はISO 18004規格では最低4モジュール幅が必要。QRコードと周囲のデザインを区別し、ファインダパターンの検出精度を確保する役割がある。 | 🟢高 | [the-qrcode-generator.com](https://www.the-qrcode-generator.com/blog/qr-code-quiet-zone)、[ISO/IEC 18004仕様] |
| 6 | エンコーディングモードは4種類：数字モード（0-9、10ビット/3桁）、英数字モード（45文字、11ビット/2文字）、8ビットバイトモード（ISO 8859-1）、漢字モード（Shift JIS、13ビット/1文字）。これらを混合して使うことも可能。 | 🟢高 | [QRcode.com](https://www.qrcode.com/about/version.html)、[Wikipedia](https://ja.wikipedia.org/wiki/QR%E3%82%B3%E3%83%BC%E3%83%89) |
| 7 | QRコードのバージョンは1から40まであり、バージョン1は21x21セル、以降バージョンが1つ上がるごとに縦横4セルずつ増加し、バージョン40は177x177セル（=31,329セル）となる。 | 🟢高 | [QRcode.com](https://www.qrcode.com/about/version.html)、[キーエンス](https://www.keyence.co.jp/ss/products/autoid/codereader/basic2d-qr-types.jsp) |
| 8 | バージョン40（誤り訂正レベルL）の最大データ容量は、数字7,089文字、英数字4,296文字、バイナリ2,953バイト、漢字1,817文字。 | 🟢高 | [QRcode.com](https://www.qrcode.com/about/version.html)、[tech-jp.com](https://www.tech-jp.com/QRCode/Capacity.html) |
| 9 | 誤り訂正はリード・ソロモン符号を採用しており、4段階のレベルがある：L（約7%復元可能）、M（約15%）、Q（約25%）、H（約30%）。レベルが高いほど復元能力が上がるが、データ容量は減少する。 | 🟢高 | [QRcode.com (DENSO WAVE)](https://www.qrcode.com/en/about/error_correction.html)、[ISO/IEC 18004] |
| 10 | 誤り訂正レベルMが最も多く選択されている。工場など汚損しやすい環境ではQ/Hレベル、クリーンな環境で大容量データを扱う場合はLレベルが推奨される。 | 🟢高 | [QR Code Fusion](https://www.qrcodefusion.com/codes/qr/reed-solomon)、[GoCreateQR](https://www.gocreateqr.com/blog/qr-code-error-correction-guide) |
| 11 | QRコードの読み取りプロセスは：(1) カメラで画像取得 → (2) 画像二値化 → (3) ファインダパターンの1:1:3:1:1比率を検索して位置検出 → (4) 傾き・歪み補正 → (5) タイミングパターンでセル座標を特定 → (6) フォーマット情報の読み取り → (7) データ領域の復号 → (8) 誤り訂正。検出は0.03秒未満で完了することもある。 | 🟢高 | [Wikipedia (en)](https://en.wikipedia.org/wiki/QR_code)、[Scanova](https://scanova.io/blog/qr-code-structure/) |
| 12 | QRコードは英数字100文字以下のデータであれば、わずか32ミリ秒で読み取ることができる。名前の通り「Quick Response」を実現している。 | 🟢高 | [QRコードお役立ち情報](https://b.qrqrq.com/2019/05/29/qrcode-interview/)、[AIMEX](https://www.aimex.co.jp/column/10510/) |
| 13 | 1次元バーコード（JANコード等）は最大約20桁の数字しか格納できないが、QRコードは数字で最大7,089桁と約350倍の情報量を持つ。また、バーコードはレーザーを一方向にスキャンするため方向が制限されるが、QRコードは360度どこからでも読み取り可能。 | 🟢高 | [高山印刷](https://qr.takayama-dp.com/column/qrcode-or-barcode/)、[QR WORLD](https://qr.c-cloud.co.jp/articles/knowledge/diffs-codes) |
| 14 | QRコードの規格化の歴史：1997年10月 AIM International規格 → 1998年3月 JEIDA規格 → 1999年1月 JIS X 0510 → 2000年6月 ISO/IEC 18004として国際標準化。デンソーウェーブは特許権を行使しないことを宣言し、仕様をオープンにした。 | 🟢高 | [QRcode.com 規格化](https://www.qrcode.com/about/standards.html)、[特許庁](https://www.jpo.go.jp/news/koho/innovation/01_qrcode.html) |
| 15 | 2025年時点で世界で22億人以上がQRコードを日常的にスキャンしており、全スマートフォンユーザーの約29%に相当する。QRコードスキャン数は前年比57%増加。 | 🟡中 | [QR Code Chimp](https://www.qrcodechimp.com/qr-code-statistics/)、[Wave Connect](https://wavecnct.com/blogs/news/qr-code-statistics) |
| 16 | QRコード決済の市場規模は2025年に5.4兆ドルに達し、2029年には8兆ドルを超える見込み。アジア太平洋地域が全体の60%以上を占める。 | 🟡中 | [coinlaw.io](https://coinlaw.io/qr-code-payments-statistics/)、[QR Code Chimp](https://www.qrcodechimp.com/qr-code-statistics/) |
| 17 | 米国では2026年に約1億260万人のスマートフォンユーザーがQRコードをスキャンすると予測されており、アメリカ人の約3人に1人に相当する。 | 🟡中 | [QR Code Tiger](https://www.qrcode-tiger.com/qr-code-statistics-2022-q1)、[Krofile](https://krofile.com/blog/qr-code-statistics/) |
| 18 | QRコードのグローバル市場規模は2025年に130.4億ドルと評価され、2030年までに331.4億ドルに達する見込み（年平均成長率20.5%）。マーケターの90%以上がキャンペーンにQRコードを使用している。 | 🟡中 | [Air Apps](https://airapps.co/blog/qr-code-statistics-2026)、[electroiq](https://electroiq.com/stats/qr-code-statistics/) |
| 19 | QRコードの開発動機は、デンソーの工場でバーコードを10個ほど並べて読み取る非効率な作業への不満だった。現場作業員から「疲れる」「もっと多くの情報を盛り込めるコードを作って欲しい」という要望が出たことがきっかけ。 | 🟢高 | [デンソーウェーブ](https://www.denso-wave.com/ja/technology/vol1.html)、[B-angle](https://www.b-angle.bandogrp.com/media/development-story-of-qr-code/) |
| 20 | 誤り訂正レベルHでは最大30%のコードが破損しても復元できるため、QRコードの中央にロゴを配置するデザインQRコードが可能になっている。これはリード・ソロモン符号の冗長性を意図的に利用したもの。 | 🟢高 | [QR Designer](https://qrdesigner.com/blog/qr-code-error-correction-explained-why-its-a-genius-feature)、[FileFusion](https://www.filefusion.app/insights/articles/qr-code-anatomy-structure-error-correction) |

## まとめ

- QRコードは1994年にデンソーウェーブの原昌宏がわずか2人で開発。工場のバーコード管理の非効率さが開発動機。
- 最大の技術的特徴は3隅のファインダパターン（1:1:3:1:1比率）で、「印刷物に最も出現しない比率」を膨大な調査で特定したもの。これにより360度高速読み取りを実現。
- バージョン1（21x21セル）からバージョン40（177x177セル）まであり、最大で数字7,089桁を格納可能。1次元バーコードの約350倍の情報量。
- リード・ソロモン符号による4段階の誤り訂正（L:7%、M:15%、Q:25%、H:30%）により、汚損・破損に強い。Hレベルの冗長性を利用してロゴ入りデザインQRコードも可能。
- 2000年にISO/IEC 18004として国際標準化。デンソーウェーブは特許権を行使しないと宣言し、オープンな普及を促進。
- 2025年時点で世界22億人以上が利用、QR決済市場は5.4兆ドル規模。日本発の技術がグローバルインフラとなっている。
