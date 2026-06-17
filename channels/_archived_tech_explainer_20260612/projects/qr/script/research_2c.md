# Research 2c: 歴史・設計思想・背景

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | QRコードは1994年、デンソー（現デンソーウェーブ）の原昌宏氏を中心としたわずか2名のチームが開発した。名前は "Quick Response"（高速読み取り）に由来する | 🟢高 | [デンソーウェーブ公式 - QRコードの道のり](https://www.qrcode.com/history/)、[経済産業省 特許庁](https://www.jpo.go.jp/news/koho/innovation/01_qrcode.html) |
| 2 | 開発の動機はバーコードの限界。バーコードは英数字で最大20字程度しか格納できず、漢字・カナへの対応や情報量の増大が求められた。トヨタの自動車部品管理（電子かんばん）で「もっと速く、多くの情報を読み取りたい」という現場の要求が直接のきっかけ | 🟢高 | [デンソーウェーブ公式 - QRコードの道のり](https://www.qrcode.com/history/)、[B-angle](https://www.b-angle.bandogrp.com/media/development-story-of-qr-code/) |
| 3 | 原昌宏氏が昼休みに打っていた囲碁の白黒の石の配置がQRコードの基本設計にインスピレーションを与えた。19×19の盤面に白黒の石を置く囲碁から、二次元グリッドの白黒パターンで情報を格納できるというアイデアを着想 | 🟢高 | [IEEE Spectrum (2020年11月)](https://spectrum.ieee.org/how-a-board-game-and-skyscrapers-inspired-the-development-of-the-qr-code)、[Masahiro Hara - Wikipedia (EN)](https://en.wikipedia.org/wiki/Masahiro_Hara)、[レバテックLAB](https://levtech.jp/media/article/focus/detail_463/) |
| 4 | ファインダーパターン（切り出しシンボル）の黒白比率 1:1:3:1:1 は、膨大な量の印刷物（帳票・チラシ・パッケージなど）を調査し、「最も出現率が低い図形パターン」として発見された。漢字・ハングル・アルファベットなど主要言語の文字にもこの比率はほぼ存在しない。これにより、スキャナが背景の文字や図形とファインダーパターンを誤認することを防止 | 🟢高 | [デンソーウェーブ公式 - QRコードの道のり](https://www.qrcode.com/history/)、[高山印刷 QR構造解説](https://qr.takayama-dp.com/column/qrcode_structure/) |
| 5 | ファインダーパターンは3隅に配置されており、上下左右どの方向からスキャンしても 1:1:3:1:1 の比率が検出される。これにより、QRコードがどの角度に回転していても高速に位置を特定でき、360度方向からの読み取りが可能 | 🟢高 | [QR WORLD - QRコードの仕組み](https://qr.c-cloud.co.jp/articles/knowledge/structure)、[コリス - QRコードの仕組み](https://coliss.com/articles/build-websites/operation/work/how-qr-code-works.html) |
| 6 | 誤り訂正にはリード・ソロモン符号を採用。1960年にアービング・リードとギュスタブ・ソロモン（MIT Lincoln Laboratory）が開発した符号で、CD・DVD・Blu-ray・地上波デジタル放送・USBメモリ・ボイジャーなど宇宙探査機の通信装置と同じ技術。バースト誤り（連続した破損）に強く、物理的な汚れ・傷・印刷不良に対応するQRコードの用途に最適 | 🟢高 | [Reed-Solomon error correction - Wikipedia](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction)、[リード・ソロモン符号 - Wikipedia (JA)](https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%BC%E3%83%89%E3%83%BB%E3%82%BD%E3%83%AD%E3%83%A2%E3%83%B3%E7%AC%A6%E5%8F%B7) |
| 7 | リード・ソロモン符号が実用化されたのは、1969年にベルレカンプとマッセイが効率的な復号アルゴリズム（ベルレカンプ-マッセイ法）を開発してから。QRコードでは1ブロックあたり最大15個の誤りまで訂正する設計とし、複数ブロックをインターリーブ（交互配置）することで局所的な損傷が1ブロックの訂正能力を超えないようにしている | 🟢高 | [Medium - From QR Codes to Voyager](https://medium.com/@rodin.dev/from-qr-codes-to-voyager-how-reed-solomon-codes-work-e249dcfa8474)、[QR Code Error Correction - CS Field Guide](https://www.csfieldguide.org.nz/en/chapters/coding-error-control/qr-codes/) |
| 8 | QRコードの誤り訂正レベルは4段階：L（7%）、M（15%）、Q（25%）、H（30%）。最大30%が破損していても読み取り可能。これはロゴ埋め込み等のデザインQRにも応用されている | 🟢高 | [デンソーウェーブ公式 - 誤り訂正機能](https://www.qrcode.com/about/error_correction.html)、[QR Code Error Correction - Scanova](https://scanova.io/blog/qr-code-error-correction/) |
| 9 | デンソーウェーブは特許を保有しつつ、規格化されたQRコードに対して特許権の権利行使をしないと開発当初から明言。「オープン・クローズ戦略」と呼ばれるビジネスモデル：QRコード仕様はオープン（無償公開）→市場を急拡大、一方でQRコードリーダー（読取装置）の特許はクローズ（自社独占）→リーダー販売で収益化 | 🟢高 | [弁理士法人 維新国際特許事務所](https://www.iipi.jp/ipnews/1788)、[知財タイムズ](https://tokkyo-lab.com/co/qr-business)、[経済産業省 特許庁](https://www.jpo.go.jp/news/koho/innovation/01_qrcode.html) |
| 10 | 「QRコード」は株式会社デンソーウェーブの登録商標。仕様はオープンにしたが商標権は維持し、ブランドの信頼性と品質管理を確保する「特許の放棄と商標の防衛」の両立戦略 | 🟢高 | [PatentRevenue](https://patent-revenue.iprich.jp/uncategorized/3633/)、[デンソーウェーブ公式 - 特許について](https://www.qrcode.com/patent.html) |
| 11 | 規格化の年表：1997年 AIM規格制定、1999年 日本工業規格（JIS X 0510）採用、2000年 ISO国際規格化（ISO/IEC 18004） | 🟢高 | [デンソーウェーブ公式 - QRコードの道のり](https://www.qrcode.com/history/) |
| 12 | 日本での普及史：2002年頃、カメラ付き携帯電話にQRコード読取機能が搭載され一般消費者に広まる。2010年代後半に「○○ペイ」QRコード決済が乱立（PayPay・楽天ペイ・LINE Pay等）、政府のキャッシュレス推進施策も後押し。2020年コロナ禍で非接触ニーズが急増し、飲食店メニュー・イベント受付等で爆発的に普及 | 🟢高 | [日経ビジネス - QRコード決済の行方](https://business.nikkei.com/atcl/plus/00005/092100009/)、[KDDI TIME&SPACE](https://time-space.kddi.com/mobile/20190425/2624.html) |
| 13 | 中国での普及：2011年にAlipayがQRコード決済を開始、2013年にWeChat Payがリリース。2020年時点で中国の決済手段の約85%がQRコード決済。コロナ禍では「健康QRコード」で行動履歴・健康状態をスキャンする仕組みも導入 | 🟢高 | [日経ビジネス](https://business.nikkei.com/atcl/seminar/19/00109/00003/)、[ジェトロ](https://www.jetro.go.jp/biz/areareports/2019/1619a2493a52b0a4.html)、[訪日ラボ](https://honichi.com/news/2020/08/06/scancodepaymentsinchina/) |
| 14 | 欧米での普及：コロナ禍以前は欧米でQRコードの普及は限定的だったが、パンデミック後に急増。2021年6月調査では米国人の45%が過去3ヶ月以内にQRコードを使用（18-29歳では54%）。レストランのフルサービス店の半数がコロナ後にQRコードメニューを導入。欧州ではスマートフォンユーザーの86%以上がQRコードを使用経験あり | 🟢高 | [CNN Business (2021)](https://www.cnn.com/2021/07/28/business/qr-code-restaurant-menus/index.html)、[Fortune (2021)](https://fortune.com/2021/02/06/qr-codes-covid-pandemic-do-people-use-them/)、[QR Code Statistics - UK](https://qrcode.co.uk/blog/qr-code-statistics/) |
| 15 | 受賞歴：2014年 欧州発明家賞「ポピュラー・プライズ」受賞（日本人初）、米国 R&D 100 Awards、日本イノベータ大賞優秀賞、技術経営・イノベーション大賞 内閣総理大臣賞、市村産業賞 本賞、恩賜賞・日本学士院賞 | 🟢高 | [原昌宏 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%8E%9F%E6%98%8C%E5%AE%8F)、[QR WORLD](https://qr.c-cloud.co.jp/articles/knowledge/invent) |
| 16 | 2020年、QRコードがIEEEマイルストーンに認定（贈呈式は2022年9月26日、デンソー本社にて）。世界中の企業の製造・管理業務の改善への寄与と、電子決済など多様なアプリケーションでの利用が評価された | 🟢高 | [デンソーウェーブ - IEEEマイルストーン認定](https://www.denso-wave.com/ja/adcd/info/detail__201007-01.html)、[ケータイ Watch](https://k-tai.watch.impress.co.jp/docs/news/1281704.html)、[Car Watch](https://car.watch.impress.co.jp/docs/news/1281546.html) |
| 17 | 原昌宏氏はQR決済の世界的普及について「決済での使用は想定外だった」と発言。もともと工場の部品管理用に開発された技術が、30年後に世界の金融インフラとなった | 🟡中 | [Science Portal China (JST)](https://spc.jst.go.jp/news/191203/topic_5_01.html) |
| 18 | 2次元バーコードとしてQRコード以外にもPDF-417、MaxiCode、DataMatrix、Aztec Code等が存在するが、すべてリード・ソロモン符号を誤り訂正に採用している。リード・ソロモンは2次元コードの事実上の標準誤り訂正方式 | 🟢高 | [Reed-Solomon - Wikipedia](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction) |

## まとめ

- **開発の原点は「現場の困りごと」**：トヨタの部品管理でバーコードの容量・速度の限界に直面した原昌宏氏が、たった2人で開発に着手。囲碁の白黒の石から二次元コードの着想を得た
- **ファインダーパターンは「存在しない比率」を探す地道な調査から生まれた**：1:1:3:1:1 は膨大な印刷物を調査して「最も使われていない黒白比率」として発見。漢字にもアルファベットにもこの比率は現れないため、誤検出を防げる
- **リード・ソロモン符号の採用は合理的選択**：CD・DVD・宇宙探査機ボイジャーでも使われる実績ある技術。物理的な汚れや傷に強い「バースト誤り訂正」がQRコードの用途（工場・屋外）に適合
- **特許オープン戦略が世界普及の鍵**：QRコード仕様を無償公開（オープン）し市場を拡大、リーダー装置の特許は保持（クローズ）して収益化する巧みな「オープン・クローズ戦略」
- **普及の3つの波**：(1) 2000年代の日本の携帯電話、(2) 2010年代の中国のモバイル決済（Alipay・WeChat Pay）、(3) 2020年のコロナ禍による欧米での非接触ニーズ爆発
- **日本発の技術が世界標準に**：IEEEマイルストーン認定、欧州発明家賞など国際的評価を受け、工場の部品管理ツールから世界の金融インフラへと変貌した
