# Research 2c: 背景・深掘り情報

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | RAND社『A Million Random Digits』(1955年): 電子ルーレットで生成した100万個の乱数を書籍化。冷戦期の核兵器シミュレーション需要が背景 | 🟢高 | RAND Corporation |
| 2 | フォン・ノイマンの平方中項法(1946年): 最初期のPRNG。「疑似乱数を生成する者はもちろん罪の状態にある」の名言。周期が短く特定値に収束する欠陥 | 🟢高 | von Neumann (1951), Knuth TAOCP Vol.2 |
| 3 | シャノンの情報理論(1948年)とエントロピー概念: H = -Σ p(x) log₂ p(x)で情報の不確実性を定量化。One-Time Padの安全性証明は鍵が真の乱数列であることが前提 | 🟢高 | Shannon (1948, 1949) |
| 4 | Linux /dev/random vs /dev/urandom論争: カーネル5.6(2020年)でrandomのブロッキング動作を実質廃止。Bernstein、Ptacek等が「urandomで十分安全」と主張し受容された | 🟢高 | Linux Kernel 5.6, Thomas Ptacek (2014) |
| 5 | Intel RDRAND命令(2012年〜): CPU内蔵TRNG、熱ノイズ利用。スノーデン文書後にバックドア疑惑。FreeBSD・Linuxとも単独依存を廃止し他ソースとXOR混合に変更 | 🟢高 | Intel DRNG Guide, Snowden documents |
| 6 | Cloudflare LavaRand: SF本社に約100個のラバランプ、ロンドンでは二重振り子（カオス運動）、シンガポールでは放射性崩壊を使用。インターネットトラフィック約20%を処理 | 🟢高 | Cloudflare Blog (2017) |
| 7 | 量子乱数生成器の商用化: ID Quantique(2001年〜)が先駆者、EAL4+認証。2022年Samsung Galaxy Quantum 3がスマホ初のQRNGチップ搭載 | 🟢高 | ID Quantique, Samsung |
| 8 | ブロックチェーンVRF: Silvio Micali（チューリング賞）がVRF考案。Chainlink VRF v2がスマートコントラクトに検証可能乱数提供。EthereumはRANDAO+VDFで提案者選出 | 🟢高 | Micali et al. (1999), Chainlink Docs |
| 9 | モンテカルロ法: マンハッタン計画でウラムとフォン・ノイマンが考案、中性子拡散計算に使用。現代では金融工学・気象予測・創薬・機械学習で不可欠 | 🟢高 | Metropolis & Ulam (1949) |
| 10 | 決定論vs真のランダム性: 量子力学コペンハーゲン解釈では測定結果は本質的に非決定論的。2022年ノーベル物理学賞（ベルの不等式実験）が量子的ランダムネスの実在を支持 | 🟢高 | Bell (1964), Nobel Prize 2022 |
| 11 | ゲーミング産業の乱数規制: GLI・eCOGRA等の第三者認証。日本のパチンコ・パチスロも風営法により乱数生成装置の仕様規制 | 🟡中 | GLI Standard GLI-19 |

## まとめ

乱数の歴史はRAND社の物理乱数表からフォン・ノイマンの疑似乱数、Linuxカーネルの論争を経て量子乱数・ブロックチェーンVRFへと進化。哲学的には「真のランダム」の存在が量子力学の解釈問題と結びつき、2022年ノーベル物理学賞が非決定性の実在を支持。日常ではHTTPS通信からゲーム抽選まで乱数の質が安全性と公正性を支えている。
