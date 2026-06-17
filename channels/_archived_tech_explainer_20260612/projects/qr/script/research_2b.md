# Research 2b: 対立軸・比較・誤解

## 1. QRコード vs バーコード（1D vs 2D）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 1Dバーコードは水平方向のみにデータを格納（線の太さと間隔）。QRコードは縦横2次元でデータを格納するため、同じ面積で数十〜数百倍の情報量を持つ | 🟢高 | [GS1 US](https://www.gs1us.org/upcs-barcodes-prefixes/1d-vs-2d-barcodes) |
| 2 | 1Dバーコードはレーザースキャナで読取可能だが、QRコード等の2Dコードはカメラベースのイメージャでしか読み取れない | 🟢高 | [Lowry Solutions](https://lowrysolutions.com/blog/what-is-the-difference-between-1d-and-2d-barcode-scanning/) |
| 3 | 1Dバーコードは正しい角度でスキャンする必要があるが、QRコードは360度どの方向からでも読み取り可能（ファインダーパターンのおかげ） | 🟢高 | [QR Code Generator](https://www.qr-code-generator.com/blog/qr-codes-vs-barcodes/) |
| 4 | 1Dバーコードの容量は約20〜25文字程度。QRコードは最大7,089数字/4,296英数字/2,953バイトを格納可能 | 🟢高 | [Scandit](https://www.scandit.com/resources/guides/types-of-barcodes-choosing-the-right-barcode/) |
| 5 | 2Dバーコードにはエラー訂正機能があり、コードの一部が破損・汚損しても読み取れる。1Dバーコードにはこの機能がない | 🟢高 | [GS1 US](https://www.gs1us.org/upcs-barcodes-prefixes/1d-vs-2d-barcodes) |

## 2. QRコード vs 他の2Dコード（Data Matrix, Aztec, PDF417）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 6 | Data Matrixは最大2,335英数字を格納。QRコードより容量は少ないが、極めて小さいサイズに印刷可能で、工業用部品マーキング（DPM）に最適 | 🟢高 | [Choto.co](https://blog.choto.co/data-matrix-vs-pdf417-vs-aztec-vs-qr-codes/) |
| 7 | PDF417は「積層型」2Dバーコード（マトリクス型ではない）。1.1KB以上のデータを格納可能で、指紋・写真等の大容量データに対応。運転免許証・身分証で多用 | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/insights/qr-vs-pdf-417-vs-datamatrix/) |
| 8 | Aztec Codeは周囲にクワイエットゾーン（余白）が不要。狭いスペースに印刷でき、解像度が低くてもデコード可能。航空券・鉄道チケットで多用 | 🟢高 | [Choto.co](https://blog.choto.co/data-matrix-vs-pdf417-vs-aztec-vs-qr-codes/) |
| 9 | QRコードだけがファインダーパターン（3隅の大きな四角）を持ち、高速な位置検出と360度読取を実現。他のコードはそれぞれ異なる位置検出方式を採用 | 🟢高 | [TEC-IT](https://www.tec-it.com/en/support/knowbase/barcode-overview/2d-barcodes/Default.aspx) |
| 10 | 用途の棲み分け: QRコード=消費者向け（決済・マーケ）、Data Matrix=工業用小型部品、PDF417=政府・ID、Aztec=モバイルチケット | 🟢高 | [Choto.co](https://blog.choto.co/data-matrix-vs-pdf417-vs-aztec-vs-qr-codes/) |

## 3. QRコードのセキュリティリスク・脆弱性

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 11 | 「クイッシング（Quishing）」= QRコード+フィッシングの造語。悪意あるURLをQRコードに埋め込み、スキャンしたユーザーを偽サイトに誘導する攻撃手法 | 🟢高 | [Keepnet Labs](https://keepnetlabs.com/blog/qr-code-phishing-trends-in-depth-analysis-of-rising-quishing-statistics) |
| 12 | 2025年にQRフィッシング攻撃は5倍に増加。ZenSecが2025年だけで170万個の悪意あるQRコードを検出 | 🟢高 | [Keepnet Labs](https://keepnetlabs.com/blog/qr-code-phishing-trends-in-depth-analysis-of-rising-quishing-statistics) |
| 13 | QRコードのURLは人間の目に見えないため、従来のテキストベースのメールフィルターをすり抜ける。これがクイッシングが効果的な理由 | 🟢高 | [Acronis](https://www.acronis.com/en/blog/posts/qr-code-phishing-evasive-threats-2026/) |
| 14 | KnowBe4とNordVPNの調査で、ユーザーの73%がリンク先を確認せずにQRコードをスキャンしている | 🟡中 | [Uniqode](https://www.uniqode.com/blog/qr-code-security/secure-qr-codes-against-phishing-and-quishing-attacks) |
| 15 | 物理的な上貼り攻撃: 正規のQRコードの上に悪意あるQRコードのステッカーを貼る手法。駐車場のメーター、レストランのメニュー等で実例あり | 🟢高 | [CNBC](https://www.cnbc.com/2025/07/27/cybersecurity-scams-quishing-qr-code-consumer-risks-hackers.html) |
| 16 | 北朝鮮のKimsukyグループが悪意あるQRコードをスピアフィッシングメールに埋め込む手法をFBIが警告（2026年1月） | 🟢高 | [The Hacker News](https://thehackernews.com/2026/01/fbi-warns-north-korean-hackers-using.html) |

## 4. 誤解されやすい点（俗説 vs 事実）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 17 | 俗説「QRコードは暗号化されている」→ 事実: 標準QRコードのデータは暗号化されていない。誰でもスキャンすれば中身を読める。暗号化機能を持つのはSQRC等の特殊な派生のみ | 🟢高 | [Qryptal](https://www.qryptal.com/blog/blog_top_4_myths_about_qr_code_security/) |
| 18 | 俗説「QRコードをスキャンするとウイルスに感染する」→ 事実: QRコード自体にマルウェアを埋め込むことは不可能。危険なのはQRコードが指すリンク先であって、コードそのものではない | 🟢高 | [Supercode](https://www.supercode.com/blog/11-common-myths-about-qr-codes) |
| 19 | 俗説「QRコードはカメラやGPSを勝手に起動する」→ 事実: QRコードにはデバイスのハードウェアにアクセスする能力はない。URLを開くかアクションをトリガーするだけで、OSの許可なくカメラ等にアクセスすることは不可能 | 🟢高 | [Supercode](https://www.supercode.com/blog/11-common-myths-about-qr-codes) |
| 20 | 俗説「QRコードはハッキングされる（書き換えられる）」→ 事実: 生成済みの静的QRコードのデータを遠隔で書き換えることは技術的に不可能。リスクは物理的な上貼りのみ | 🟢高 | [Supercode](https://www.supercode.com/blog/11-common-myths-about-qr-codes) |
| 21 | 俗説「画像認識がQRコードを置き換える」→ 事実: 画像認識は文字の曖昧性やコスト面で課題が多い。EUのデジタル製品パスポート規制ではQRコードが義務化されており、むしろ公的需要は拡大中 | 🟡中 | [Supercode](https://www.supercode.com/blog/11-common-myths-about-qr-codes) |
| 22 | 俗説「QRコードはもう誰もスキャンしない・一時的な流行」→ 事実: 米国だけで9,950万人、世界で22億人がQRコードを利用。市場は年率17%で成長し、2030年に286.4億ドル規模へ | 🟢高 | [Supercode](https://www.supercode.com/blog/11-common-myths-about-qr-codes) |
| 23 | 俗説「QRコードよりNFCの方が効率的」→ 事実: NFCは専用ハードウェアと近接距離が必要。QRコードはカメラさえあれば動作し、印刷コストゼロ、距離も取れる | 🟢高 | [Supercode](https://www.supercode.com/blog/11-common-myths-about-qr-codes) |

## 5. QRコードの限界・弱点

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 24 | 最小サイズ制限: 実用的な最小サイズは約2cm x 2cm。それ以下ではモジュールが小さすぎてカメラが解像できない | 🟢高 | [QR Code Generator](https://www.qr-code-generator.com/blog/minimum-qr-code-size/) |
| 25 | スキャン距離の目安: QRコードの辺の長さの約10倍が読取可能距離。2cmのQRコードなら約20cmの距離まで | 🟢高 | [Scanova](https://scanova.io/blog/qr-code-max-size/) |
| 26 | データ量が増えるほどモジュール数が増加し、コードが複雑化→ より大きな印刷サイズが必要になるトレードオフ | 🟢高 | [QR Code Kit](https://qrcodekit.com/guides/best-practices-for-qr-code-legibility/) |
| 27 | デザインQRコード（色変更・ロゴ埋め込み）は認識率が低下する。前景色は背景より40%以上暗くする必要がある。色の反転（白地に黒→黒地に白）は読取不能になるケースが多い | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/insights/10-common-reasons-preventing-qr-code-recognition/) |
| 28 | 環境依存の読取問題: 強い日光下でのグレア、低照度環境、曲面への印刷、金属面の反射はすべて読取率を大幅に低下させる | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/use-cases/why-qr-code-scanning-fails-real-world-solutions/) |
| 29 | QRコードの最大バージョンはVersion 40（177x177モジュール）。これが格納容量の物理的上限を規定する | 🟢高 | [Wikipedia - QR code](https://en.wikipedia.org/wiki/QR_code) |

## 6. 特許フリーの功罪

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 30 | デンソーウェーブはQRコードの特許権を保有しているが、開発当初から「特許権を行使しない」方針を宣言。JIS/ISO規格に準拠する限り誰でも無料で使用可能 | 🟢高 | [DENSO WAVE公式](https://www.qrcode.com/en/patent.html) |
| 31 | 功: 特許フリーにより爆発的に普及。イギリスで90%、中国で88%、フランス・ドイツで70%以上の国民が使用経験あり | 🟢高 | [Barkoder](https://barkoder.com/blog/the-story-of-the-qr-code-from-factory-floors-to-global-connectivity) |
| 32 | 功: 開発者が想定しなかった用途（モバイル決済、コロナ接触追跡、デジタルチケット等）が自然発生的に生まれた | 🟢高 | [DENSO公式](https://www.denso.com/global/en/business/innovation/qrcode/) |
| 33 | 罪: 誰でも自由に生成できるため、悪意あるQRコードの作成も容易。品質管理や認証メカニズムが規格に含まれていない | 🟡中 | [Acronis](https://www.acronis.com/en/blog/posts/qr-code-phishing-evasive-threats-2026/) |
| 34 | デンソーウェーブは特許収入の代わりに、「QRコードはデンソーウェーブの登録商標」の表記を求める戦略を採用。ブランド認知で利益を回収 | 🟢高 | [DENSO公式](https://www.denso.com/global/en/driven-base/career-life/qr_engineer-1/) |

## 7. 派生技術（Micro QR, iQR, SQRC, rMQR）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 35 | Micro QRコード: ファインダーパターンが1つだけ（通常は3つ）。最大バージョンM4で17x17モジュール、最大35数字を格納。極小スペース向け | 🟢高 | [DENSO WAVE公式](https://www.qrcode.com/en/codes/microqr.html) |
| 36 | iQRコード（2011年）: 正方形・長方形両方に対応。同じ情報量をQRコードの30%少ないスペースで格納可能。ただしISO標準化されておらず、デンソーウェーブ専用製品でしか生成・読取不可 | 🟡中 | [Wikipedia - QR code](https://en.wikipedia.org/wiki/QR_code) |
| 37 | SQRC（セキュリティ機能付きQR）: 公開データ層と暗号化された秘密データ層の二層構造。通常のリーダーでは公開層のみ読取、専用リーダーで秘密層もアクセス可能 | 🟢高 | [Triton Store](https://tritonstore.com.au/types-of-qr-codes/) |
| 38 | rMQR（長方形マイクロQR）: 2022年にISO/IEC 23941として標準化。長方形で狭いスペースに最適。32バージョン、最大219英数字/361数字を格納 | 🟢高 | [DENSO WAVE公式](https://www.qrcode.com/en/codes/rmqr.html) |

## 8. 「QRコードが読めない」ケースの原因分析

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 39 | 原因1: ブレ・低解像度 — カメラの手ブレや低解像度でモジュールの境界が不明瞭になる | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/insights/10-common-reasons-preventing-qr-code-recognition/) |
| 40 | 原因2: サイズ不足 — QRコードが小さすぎてカメラのナイキスト限界を下回り、モジュールを解像できない | 🟢高 | [MDPI Sensors](https://www.mdpi.com/1424-8220/22/19/7230) |
| 41 | 原因3: 物理的破損 — 汚れ・擦れ・折れ・水濡れ。Reed-Solomonエラー訂正の許容範囲（最大H:30%）を超える破損は回復不能 | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/insights/10-common-reasons-preventing-qr-code-recognition/) |
| 42 | 原因4: コントラスト不足 — 前景と背景の色差が不十分だとモジュール境界を検出できない。最低40%の明度差が必要 | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/insights/10-common-reasons-preventing-qr-code-recognition/) |
| 43 | 原因5: クワイエットゾーンの欠如 — QRコードの周囲に最低4モジュール分の余白が必要。デザインで余白を削ると読取不能になる | 🟢高 | [QR Code Generator](https://www.qr-code-generator.com/blog/qr-code-scanning-problems-and-solutions/) |
| 44 | 原因6: 色の反転 — 標準は暗色モジュール+明色背景。反転すると多くのリーダーが認識不能（GrayscaleTransformationModesで対応可能なリーダーもある） | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/insights/10-common-reasons-preventing-qr-code-recognition/) |
| 45 | 原因7: 環境要因 — グレア（光の反射）、影、極端な照明条件。適応的二値化処理が必要 | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/use-cases/why-qr-code-scanning-fails-real-world-solutions/) |
| 46 | 原因8: 曲面・歪み — 円筒形の面への印刷やシワのある紙は幾何学的歪みを生じ、ファインダーパターンの検出を阻害する | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/use-cases/why-qr-code-scanning-fails-real-world-solutions/) |
| 47 | 原因9: 高密度化 — データ量が多いVersion 40近いコードはモジュールが極小化し、印刷精度・カメラ解像度の両方に高い要求が発生 | 🟢高 | [Dynamsoft](https://www.dynamsoft.com/blog/insights/10-common-reasons-preventing-qr-code-recognition/) |

## まとめ

- **1D vs 2D の本質的違い**: 1Dバーコードは「線」、QRコードは「面」でデータを表現。これにより容量は数十倍、エラー訂正・全方向読取という質的な進化を実現した
- **2Dコード間の棲み分け**: QRコードは消費者向けの汎用性で圧倒的だが、極小部品にはData Matrix、大容量IDにはPDF417、余白不要のチケットにはAztecと、それぞれ最適な領域がある
- **最大の誤解「QRコード=暗号」**: QRコードは単なるデータの符号化であり、暗号化ではない。中身は誰でも読める。セキュリティはQRコード自体ではなく、リンク先と利用文脈に依存する
- **セキュリティの脅威は技術ではなく人間**: クイッシングの本質はソーシャルエンジニアリング。QRコードの技術的な脆弱性ではなく、「人間がURLを確認せずにスキャンする」行動が攻撃を成立させている
- **特許フリーは両刃の剣**: 爆発的普及の最大の功労者だが、品質管理・認証機構の不在という副作用も生んだ
- **「読めない」の原因は複合的**: 単一原因ではなく、サイズ・コントラスト・破損・環境光・デザイン加工の複合要因が多い。エラー訂正レベルHでも30%までしか回復できない
- **派生技術の普及障壁**: iQRやSQRCはデンソーウェーブの専用エコシステムに閉じており、標準QRコードほどの普及は難しい。rMQRはISO標準化済みで今後の普及が期待される
