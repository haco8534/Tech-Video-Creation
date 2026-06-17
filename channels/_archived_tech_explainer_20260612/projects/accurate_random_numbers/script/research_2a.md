# Research 2a: 基本情報・仕組み・通説

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | LCG（線形合同法）は最も単純なPRNGで、X(n+1) = (A*X(n) + B) mod M の漸化式で生成。状態空間が小さく、高次元で超平面上に点が並ぶ欠陥がある | 🟢高 | Linear congruential generator - Wikipedia |
| 2 | メルセンヌ・ツイスタ（MT19937）は1997年に松本眞・西村拓士が開発。周期2^19937-1、内部状態624個の32bit整数。統計テストに合格するが暗号的には安全でない | 🟢高 | Mersenne Twister - Wikipedia |
| 3 | MT19937は連続624個の出力を観測すると内部状態が完全復元でき、以後の出力がすべて予測可能。SMTソルバーを使えばわずか3出力からの種復元も可能 | 🟢高 | Bishop Fox, NCC Group |
| 4 | xorshift128+はGF(2)上のXOR演算とシフトで動作するPRNG。V8（Chrome/Node.js）のMath.random()は2015年にxorshift128+に切り替えられた。暗号的安全性はない | 🟢高 | V8 Blog, Mozilla Bug 322529 |
| 5 | TRNG（真の乱数生成器）は物理現象をエントロピー源とする。熱雑音、ショットノイズ、放射性崩壊、量子光学など | 🟢高 | Hardware RNG - Wikipedia |
| 6 | CSPRNG（暗号論的PRNG）の2要件: (1) Next-bit test不合格不能 (2) 状態漏洩耐性。代表例はHash_DRBG、HMAC_DRBG、CTR_DRBG | 🟢高 | CSPRNG - Wikipedia, NIST SP 800-90A |
| 7 | Linux /dev/urandom はカーネル4.8以降ChaCha20ベースのCSPRNG。カーネル5.17でSHA-1からBLAKE2sに変更。現代では/dev/randomと実質同等 | 🟢高 | filippo.io, The Register |
| 8 | 乱数品質の主要検定法: NIST SP 800-22（15種統計テスト）、TestU01（SmallCrush/Crush/BigCrush）、Diehard/Dieharder | 🟢高 | NIST, TestU01論文 |
| 9 | CloudflareはSF本社に約100個のラバランプを設置し映像をエントロピー源として使用。元はSGIが1996年に「Lavarand」として発明 | 🟢高 | Cloudflare公式 |
| 10 | 乱数の主要応用分野: 暗号（鍵生成）、モンテカルロ法（数値積分・金融リスク）、ゲーム（ドロップ率・マップ生成）、機械学習（重み初期化・SGD） | 🟢高 | Monte Carlo method - Wikipedia |

## まとめ

乱数生成には3階層がある。PRNG（LCG、MT、xorshift等）は高速だが予測可能。CSPRNGは「次のbit予測不能」「状態漏洩しても過去復元不能」の2要件を満たす。TRNGは物理現象由来で最高の予測不能性だが低速。現実ではTRNGでCSPRNGのシードを生成するハイブリッド方式が主流。身近なMath.random()はxorshift128+で暗号安全性がなく、用途に応じた正しいレベルの乱数生成器を選ぶことが重要。
