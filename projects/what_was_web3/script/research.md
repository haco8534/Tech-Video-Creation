# Web3って何だったの？ — リサーチドキュメント

## 1. Web3の定義と理想：Web1 → Web2 → Web3の変遷

### Webの進化史

| 世代 | 時代 | 特徴 | キーワード |
|------|------|------|-----------|
| **Web1** (1990年代〜2000年代前半) | 静的Web | 読むだけのWeb。HTMLで作られた情報公開ページ | Read-Only |
| **Web2** (2000年代後半〜現在) | プラットフォームの時代 | SNS・UGC（ユーザー生成コンテンツ）。Google、Amazon、Facebook、Appleが支配 | Read-Write、GAFA |
| **Web3** (2014年〜提唱) | 分散型Web | ブロックチェーンによる非中央集権。ユーザーがデータの所有権を持つ | Read-Write-Own |

### Gavin Woodの提唱（2014年）

- **提唱者**: Gavin Wood（Ethereum共同創設者、Polkadot創設者、Parity Technologies創設者）
- **時期**: 2014年4月、ブログ記事「ĐApps: What Web 3.0 Looks Like」で提唱
- **核心的問題意識**: 「現在のWebは少数の民間企業を信頼しすぎている（too much trust）」
- **ビジョン**: インターネットの信頼モデルを根本から変える。少数のテック企業（Amazon、Microsoft等）が支配しない、真に分散化された民主的なインターネット
- **技術的構想**: Ethereum単体ではなく、BitTorrent、分散型ブラウザ、コンセンサス不要の通信ノードなど、次世代インターネットの包括的インフラ

出典: [Gavin Wood "ĐApps: What Web 3.0 Looks Like"](https://gavwood.com/dappsweb3.html)、[CNBC (2022)](https://www.cnbc.com/2022/04/20/what-is-web3-gavin-wood-who-invented-the-word-gives-his-vision.html)、[Nasdaq](https://www.nasdaq.com/articles/what-is-web-3-heres-how-future-polkadot-founder-gavin-wood-explained-it-in-2014)

---

## 2. 技術基盤

### ブロックチェーン
- 分散型台帳技術。全取引履歴をネットワーク参加者全員が保持
- 改ざんが極めて困難（暗号学的ハッシュチェーン）
- Bitcoin（2009年）が最初の実用例、Ethereum（2015年）がスマートコントラクトで拡張

### スマートコントラクト
- ブロックチェーン上で自動実行されるプログラム
- 「コードが法律」（Code is Law）の思想
- 仲介者なしで契約・取引を執行
- Solidityが主要言語（Ethereum）

### DeFi（分散型金融）
- 銀行・証券会社などの仲介機関なしで金融サービスを提供
- レンディング（Aave, Compound）、DEX（Uniswap, SushiSwap）、イールドファーミング
- 暗号貸借が2021年のDeFi最大セグメント（TVL全体の約半分）

### NFT（非代替性トークン）
- ブロックチェーン上の「所有証明書」。デジタルアートやコレクティブルの唯一性を証明
- ERC-721規格（Ethereum）が標準
- OpenSeaが最大のマーケットプレイス

### DAO（分散型自律組織）
- トークン保有者による民主的ガバナンス
- スマートコントラクトで組織運営を自動化
- 従来の株式会社に代わる組織形態として期待された

### dApps（分散型アプリケーション）
- 中央サーバーを持たないアプリケーション
- ブロックチェーン上で動作し、検閲耐性を持つ
- 実際にはInfuraやAlchemy等のAPIプロバイダーに依存（後述の批判参照）

---

## 3. 2020-2022年のブーム

### NFTバブル

| イベント | 金額 | 時期 |
|---------|------|------|
| Beeple "Everydays: The First 5000 Days" Christie's落札 | **$69.3M**（42,329 ETH） | 2021年3月 |
| NFT月間取引量ピーク | **約$170億** | 2022年1月 |
| Bored Ape Yacht Club フロア価格ピーク | 約$400K/体 | 2022年4-5月 |

- Christie'sのBeeple落札はオークションハウス初の暗号通貨決済。2,200万人が最終入札を視聴
- 購入者Vignesh Sundaresan（シンガポール在住プログラマー）は「いつか10億ドルの作品になる」と発言
- Beeple自身はETHを即座にUSDに換金（$53M相当） — Web3推進者でさえフィアット通貨を信頼していた象徴的エピソード

出典: [Bloomberg (2021)](https://www.bloomberg.com/news/articles/2021-03-11/beeple-everydays-nft-sells-at-art-auction-for-60-million-paid-in-ether)、[Decrypt](https://decrypt.co/60971/beeples-nft-artwork-sells-for-60-3-million-in-christies-auction)、[CNN (2026)](https://www.cnn.com/2026/03/17/style/singapore-nft-vignesh-sundaresan-beeple-everydays)

### DeFiのTVL急増

| 時期 | DeFi TVL（Total Value Locked） |
|------|------|
| 2020年初 | 約$10億 |
| 2021年末（ピーク） | **約$3,038億**（$303.8B） |
| 2022年9月 | $963億（ピーク比 -68.3%） |

出典: [Statista - DeFi TVL history 2018-2025](https://www.statista.com/statistics/1272181/defi-tvl-in-multiple-blockchains/)

### メタバース連携
- Decentraland、The Sandboxなどの仮想空間でNFT土地売買が活況
- Facebook → Meta への社名変更（2021年10月）が象徴的
- Meta Reality Labs の投資額:
  - 2020年: $6.6B損失
  - 2021年: $10.2B損失
  - 2022年: $13.7B損失（売上はわずか$2.2B）
  - 2023年: $16.1B損失
  - 2024年: $17.7B損失（過去最高）
  - **累計: 2020年以降$70B超の営業損失**

出典: [CNBC (2023)](https://www.cnbc.com/2023/02/01/meta-lost-13point7-billion-on-reality-labs-in-2022-after-metaverse-pivot.html)、[Fortune (2023)](https://fortune.com/2023/07/27/metaverse-losses-meta-earnings-q2-2023-mark-zuckerberg/)

### 著名VCの投資額

| VC/ファンド | 投資額 | 時期 |
|------------|--------|------|
| a16z crypto Fund IV | **$4.5B** | 2022年5月発表 |
| a16z crypto 累計 | $7.6B | 2022年時点 |
| Web3/暗号通貨VC投資（年間） | **$33B** | 2021年 |
| Web3累計投資（全世界） | **約$94B** | 2021年以降の累計 |

- 2021-2022年のピーク期は毎月$40-70億がWeb3関連に投資された
- a16zはDeFi、NFT、DAO、L1/L2インフラ、ブロックチェーンゲームなどに広く投資

出典: [Blockworks](https://blockworks.co/news/andreessen-horowitz-launches-largest-crypto-fund-ever)、[Entrepreneur](https://www.entrepreneur.com/money-finance/venture-capitalists-are-pouring-money-into-web3-heres-why/433195)、[Crunchbase](https://news.crunchbase.com/web3/venture-funding-bounces-back-q1-2024/)

---

## 4. 批判と問題点

### 4-1. 技術的問題

#### スケーラビリティ
- **Bitcoin**: 約5トランザクション/秒
- **Ethereum (PoW時代)**: 約15トランザクション/秒
- 参考: Visa は約65,000トランザクション/秒が可能
- L2ソリューション（Optimism, Arbitrum, zkSync等）で改善を試みるも、ユーザー体験は複雑化

#### ガス代高騰
- 2021年NFTブーム期、Ethereumの平均ガス代は200 Gwei超
- 単純なNFTミントで**$100以上**のガス代
- DeFiスワップも$100超 → 小口投資家は事実上排除され「クジラ」（大口投資家）専用に
- 「分散化されたインターネットを使うのに手数料$100」という皮肉

#### UXの悪さ
- ウォレット管理（シードフレーズ12-24語の管理）はユーザーに過大な負担
- 送金ミス（アドレス間違い）は取り消し不可能
- トランザクション確認に数分〜数十分
- Web2アプリ（Instagram、LINEなど）と比較して圧倒的に使いにくい

### 4-2. 経済的崩壊

#### Terra/LUNA暴落（2022年5月）
- TerraUSD（UST）はアルゴリズム型ステーブルコイン。LUNAトークンとの裁定取引で$1ペッグを維持する設計
- 3日間でLUNA供給量が**10億 → 6兆**に膨張、価格は**$80 → ほぼゼロ**
- **投資家損失: $400億以上**
- 連鎖倒産: Celsius Network、Three Arrows Capital (3AC)、Voyager Digitalが相次いで破産申請

出典: [Harvard Law (2023)](https://corpgov.law.harvard.edu/2023/05/22/anatomy-of-a-run-the-terra-luna-crash/)、[ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1544612322005359)

#### FTX崩壊（2022年11月）
- 世界第2位の暗号通貨取引所FTXが突如破産
- 顧客資産**$87億**が消失（後に$70億を回収）
- Sam Bankman-Fried（SBF）は顧客資金を流用し有罪判決
- FTX破産の波及で暗号通貨市場から**$2,000億**が消失
- 「分散化」を謳いながら、結局は中央集権的取引所に資産を預けていた矛盾が露呈

#### NFT市場の崩壊
- **dappGambl調査（2023年9月）**: 73,257のNFTコレクションを分析
  - **95%のNFT**（69,795コレクション）の時価総額が**0 ETH**
  - 推定**2,300万人以上**の投資が無価値に
  - NFTの79%が売れ残り（完売したのはわずか21%）
  - CoinMarketCap上位コレクションですら18%がフロア価格ゼロ
- 月間取引量: 2022年1月の約$170億 → 2022年9月には**$4.66億**（**97%減**）
- NFT平均販売価格: 92%下落（2022年5月→7月）

出典: [The Register (2023)](https://www.theregister.com/2023/09/21/95_percent_nfts_worthless/)、[PetaPixel (2023)](https://petapixel.com/2023/09/20/95-of-nfts-are-worthless-report/)

### 4-3. 思想的矛盾：分散化の理想と現実

#### Moxie Marlinspike（Signal創設者）の批判（2022年1月）

Marlinspike は自らWeb3を試し、以下を指摘:

1. **人々はサーバーを運用したがらない**: 分散化の前提が非現実的
2. **結局APIプロバイダーに依存**: OpenSea、Mirror、ZoraなどのdAppsは、**InfuraとAlchemy**という2社のAPIに依存。分散型を謳いながら実質的に中央集権
3. **規制に脆い**: 2022年8月、米国がTornado Cashを制裁 → InfuraとAlchemyが即座にアクセス遮断。「分散型」サービスが政府の一声で停止
4. **VCの支配**: 「信頼不要の計算基盤」をVC出資の民間企業が売っている矛盾

Vitalik Buterinは「現状の批判は正しいが、エコシステムの向かう方向を見ていない」と部分的に認めた。

出典: [Moxie Marlinspike "My first impressions of web3"](https://moxie.org/2022/01/07/web3-first-impressions.html)、[Fortune (2022)](https://fortune.com/2022/01/10/signal-moxie-marlinspike-nft-web3-ethereum-blockchain-vitalik-buterin/)

#### DAOのガバナンス問題
- トークン加重投票 → **プルトクラシー（金権政治）**: 上位10%のトークン保有者が投票権の**76.2%**を支配
- 投票率は**10%未満**が常態化 → 代表性の欠如
- 委任投票（delegation）は新たな中央集権化を生む
- **具体的攻撃事例**:
  - 2023年: Tornado Cash ガバナンスが悪意ある提案でハイジャック
  - 2024年: Compound DAO GoldenBoyz攻撃（$25M相当のCOMPトークン奪取を試行）

出典: [CoinFabrik](https://www.coinfabrik.com/blog/who-really-rules-web3/)、[Medium (2026)](https://lopetaku.medium.com/dao-governance-failures-whales-low-turnout-attacks-d1375c556384)

### 4-4. 環境問題

#### Proof of Work（PoW）のエネルギー消費
- **Bitcoin**: 年間消費電力 約121.36 TWh（フィリピン一国分に匹敵）
- **Ethereum（PoW時代）**: 1トランザクションあたり50kWh
- **Bitcoin**: 1トランザクションあたり**830kWh**

#### Ethereum Merge（2022年9月）
- PoW → PoS（Proof of Stake）への移行完了
- 電力消費を**99.988%削減**（CCRI推定）
- CO2排出: 11,016,000トン → **870トン**（99.992%削減）
- ただしBitcoinは社会的理由によりPoWを維持し続けている

#### NFTの環境コスト
- dappGambl調査: 所有者不明・市場価値ゼロのNFT 195,699コレクションのミントに必要だったエネルギーは**27,789,258 kWh**（約16,243トンCO2相当）

出典: [ethereum.org/energy-consumption](https://ethereum.org/energy-consumption/)、[Frontiers in Blockchain (2023)](https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2023.1151724/full)、[MIT Technology Review (2023)](https://www.technologyreview.com/2023/02/28/1069190/ethereum-moved-to-proof-of-stake-why-cant-bitcoin/)

---

## 5. 2024-2026年の現状

### 暗号通貨市場（2026年3月時点）
- **Bitcoin**: 約$69,500（史上最高値 $126,080 から約45%下落）
- **暗号通貨市場全体**: 約$2.3兆
- **Bitcoin市場占有率**: 約$1.33兆（市場の約58%）
- **Ethereum**: 時価総額 約$2,330億
- 2024年はBitcoin ETF承認などで活況だったが、2025年末にはピークから約30%下落

### 生き残った技術

#### ステーブルコイン — Web3最大の「成功例」
- 2025年の取引量: **$33兆**（前年比72%増）
  - USDC: $18.3兆
  - USDT: $13.3兆
- USDT時価総額: $1,750億（市場シェア約60%）
- USDC時価総額: $734億（市場シェア約25%）
- ステーブルコイン市場全体: **$2,520億**（2025年H1）、2026年に$2兆超の予測
- Visa・MastercardがUSDC決済の試験運用を実施
- 米国GENIUS Act成立、EU MiCA施行 → 規制枠組みが整備
- 「Web3のプロダクトではなく、金融インフラとして」生き残った

出典: [Bloomberg (2026)](https://www.bloomberg.com/news/articles/2026-01-08/stablecoin-transactions-rose-to-record-33-trillion-led-by-usdc)、[TRM Labs (2025)](https://www.trmlabs.com/reports-and-whitepapers/2025-crypto-adoption-and-stablecoin-usage-report)、[The Defiant (2025)](https://thedefiant.io/news/defi/stablecoins-became-crypto-s-first-mainstream-use-case-in-2025)

#### RWA（Real-World Asset）トークナイゼーション
- 2025年時点で約$230億規模
- 不動産、国債、コモディティなどの実物資産をトークン化
- 2030年までに数兆ドル規模の予測

#### DeFi（縮小版）
- TVL: 2025年Q1で約$1,560億 → Q3で$1,610億に回復
- Ethereumが依然として支配的
- GameFi: 2025年Q3に466万日次アクティブウォレット

#### AI × Blockchain
- 2025年: Web3プラットフォーム上で17,000以上のAIエージェントが稼働
- 450万日次アクティブウォレット
- AI関連プロジェクトが$13.9億の資金調達

### 失敗した（または大幅に縮小した）試み

| 分野 | 状況 |
|------|------|
| **NFTアート/コレクティブル** | 市場は95%が無価値。投機対象としてはほぼ死亡。一部のデジタルID用途のみ残存 |
| **メタバース** | Decentraland、Sandboxの取引量は90%以上減少（DappRadar）。Meta は「メタバース」から「AI+MR」にピボット |
| **Play-to-Earn** | Axie Infinityなど、2022年以降ユーザー激減。新興国の「低賃金労働」化が問題に |
| **Web3ソーシャル** | Mastodon以外に目立った成功例なし（Mastodonもブロックチェーン非使用） |
| **DAO（汎用ガバナンス）** | 投票率低迷、プルトクラシー化。実質的に企業組織の置き換えにはならなかった |

### 暗号通貨ユーザー数
- 2025年初頭: 世界で**5.6億人以上**が暗号通貨を保有・利用（世界人口の約6.8%）
- 2030年予測: 15億人超
- 採用率トップ: ナイジェリア（84%）、南アフリカ（66%）、ベトナム（60%）、フィリピン（54%）

出典: [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/web3-market)、[CoinLaw (2026)](https://coinlaw.io/stablecoin-statistics/)

---

## 6. エンジニア視点での教訓

### 教訓1: 技術と投機を混同してはいけない

ブロックチェーン自体は暗号学・分散システムの正当な技術革新。しかしWeb3ブームでは「技術的に何が解決されるか」よりも「トークン価格が上がるか」が全ての原動力になった。

- Beepleが$69Mで売れたNFTの技術的本質は「URLへのポインタをブロックチェーンに記録した」だけ
- 多くのNFTの画像データ自体は中央集権的サーバー（AWS等）にホストされていた
- 「分散型」の看板と「投機的リターン」への期待が混同された

### 教訓2: 解決すべき問題がない技術の末路

Web3の多くのプロダクトは**「解決策を探す技術」（solution looking for a problem）** だった:

- 多くのdAppsは「これをブロックチェーンでやる必要があるか？」に明確に答えられなかった
- データベースで十分な処理を、コストと速度を犠牲にしてブロックチェーンで実装
- 成功例（ステーブルコイン）は「国際送金の高コスト」「銀行口座を持てない人の金融アクセス」という明確な課題を解決していた
- 失敗例（NFTアート、メタバース）は既存の仕組み（著作権管理、オンラインゲーム）で十分だった

### 教訓3: 分散化の本当のコスト

分散化は無料ではない。以下のトレードオフが存在する:

| 得るもの | 失うもの |
|---------|---------|
| 検閲耐性 | パフォーマンス（5-15 TPS vs 65,000 TPS） |
| 仲介者の排除 | UX（シードフレーズ管理、ガス代） |
| 透明性 | プライバシー（全取引が公開） |
| 不変性 | エラー修正の困難さ（送金ミスは取り消せない） |

Marlinspike の指摘は本質的: 「人々はサーバーを自分で運用したがらない」。分散化の理想は、ユーザーの実際の行動と乖離していた。結局、ほとんどのユーザーはCoinbase、Binanceなどの中央集権的取引所を使い、MetaMaskはInfuraに依存し、NFTはOpenSeaで取引された。

### 教訓4: ハイプサイクルの中でエンジニアが取るべき姿勢

- 新技術のブームが来たとき、「この技術は何を解決するか」を冷静に問う
- VCの投資額やメディアの熱狂度は技術の有用性の指標にはならない（2021年に$330億がWeb3に投じられたが、大半は回収されていない）
- 生き残る技術（ステーブルコイン、一部のL2）と消える技術（NFTアート、P2E）を分ける基準は「実際のユーザーの課題を解決しているか」
- 「分散化」「民主化」といった理念は美しいが、具体的なUXとコスト構造を無視しては実現しない

### 教訓5: Web3が残したもの

全てが無駄だったわけではない:

- **ステーブルコイン**: 2025年に$33兆の取引量。金融インフラとして定着
- **スマートコントラクト**: プログラマブルな金融の概念は残った
- **ゼロ知識証明（ZKP）**: プライバシー技術として他分野にも応用
- **トークナイゼーション**: RWA（実物資産）のデジタル化は成長中（$230億規模）
- **The Merge**: PoS移行はエネルギー問題の技術的解決を実証（99.988%削減）

---

## 補足：主要タイムライン

| 時期 | イベント |
|------|---------|
| 2009年 | Bitcoin誕生（Satoshi Nakamoto） |
| 2014年4月 | Gavin Woodが「Web3」を提唱 |
| 2015年 | Ethereum ローンチ |
| 2020年夏 | 「DeFi Summer」— Compound、Uniswap等が急成長 |
| 2021年3月 | Beeple NFT $69.3Mで落札 |
| 2021年10月 | Facebook → Meta に社名変更 |
| 2021年11月 | DeFi TVLが約$3,000億でピーク |
| 2021年 | 暗号通貨VC投資 年間$330億 |
| 2022年1月 | Moxie Marlinspike がWeb3批判記事を公開 |
| 2022年5月 | Terra/LUNA暴落（$400億超消失） |
| 2022年5月 | a16z $45億の暗号通貨ファンド発表 |
| 2022年9月 | Ethereum The Merge（PoS移行完了） |
| 2022年11月 | FTX破産（$87億の顧客資産消失） |
| 2023年9月 | dappGambl調査「NFTの95%が無価値」 |
| 2024年1月 | Bitcoin ETF 米国で承認 |
| 2024年 | Meta がメタバースからAI+MRにピボット |
| 2025年 | ステーブルコイン取引量 $33兆達成。GENIUS Act成立 |
| 2026年3月 | Bitcoin 約$69,500。暗号通貨市場全体 約$2.3兆 |

---

## 出典一覧

### Web3の定義・歴史
- [Gavin Wood - ĐApps: What Web 3.0 Looks Like](https://gavwood.com/dappsweb3.html)
- [CNBC - What is 'Web3'? Gavin Wood gives his vision (2022)](https://www.cnbc.com/2022/04/20/what-is-web3-gavin-wood-who-invented-the-word-gives-his-vision.html)
- [ethereum.org - What is Web3](https://ethereum.org/web3/)
- [Web3 - Wikipedia](https://en.wikipedia.org/wiki/Web3)

### 市場データ・統計
- [Statista - DeFi TVL history 2018-2025](https://www.statista.com/statistics/1272181/defi-tvl-in-multiple-blockchains/)
- [DefiLlama](https://defillama.com/)
- [Mordor Intelligence - Web3 Market Report](https://www.mordorintelligence.com/industry-reports/web3-market)
- [Fortune - Bitcoin Price March 2026](https://fortune.com/article/price-of-bitcoin-03-26-2026/)
- [Bloomberg - Stablecoin Transactions $33T (2026)](https://www.bloomberg.com/news/articles/2026-01-08/stablecoin-transactions-rose-to-record-33-trillion-led-by-usdc)

### 崩壊・失敗事例
- [Harvard Law - Anatomy of a Run: The Terra Luna Crash](https://corpgov.law.harvard.edu/2023/05/22/anatomy-of-a-run-the-terra-luna-crash/)
- [The Register - 95% of NFTs worthless (2023)](https://www.theregister.com/2023/09/21/95_percent_nfts_worthless/)
- [CNBC - Meta Reality Labs losses (2023)](https://www.cnbc.com/2023/02/01/meta-lost-13point7-billion-on-reality-labs-in-2022-after-metaverse-pivot.html)
- [BIS Bulletin No 69 - Crypto shocks and retail losses](https://www.bis.org/publ/bisbull69.pdf)

### 批判・分析
- [Moxie Marlinspike - My first impressions of web3 (2022)](https://moxie.org/2022/01/07/web3-first-impressions.html)
- [CoinFabrik - Who Really Rules Web3? DAO Governance](https://www.coinfabrik.com/blog/who-really-rules-web3/)
- [American Affairs - Web3, the Metaverse, and the Lack of Useful Innovation](https://americanaffairsjournal.org/2022/11/web3-the-metaverse-and-the-lack-of-useful-innovation/)

### 環境問題
- [ethereum.org - Energy Consumption](https://ethereum.org/energy-consumption/)
- [Frontiers in Blockchain - Ethereum Energy Consumption PoW vs PoS (2023)](https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2023.1151724/full)
- [MIT Technology Review - Why can't Bitcoin move to PoS? (2023)](https://www.technologyreview.com/2023/02/28/1069190/ethereum-moved-to-proof-of-stake-why-cant-bitcoin/)

### VC投資
- [Blockworks - a16z $4.5B Crypto Fund](https://blockworks.co/news/andreessen-horowitz-launches-largest-crypto-fund-ever)
- [Crunchbase - Web3 Venture Funding](https://news.crunchbase.com/web3/venture-funding-bounces-back-q1-2024/)

### 2025-2026年の現状
- [TRM Labs - 2025 Crypto Adoption Report](https://www.trmlabs.com/reports-and-whitepapers/2025-crypto-adoption-and-stablecoin-usage-report)
- [The Defiant - Stablecoins First Mainstream Use Case (2025)](https://thedefiant.io/news/defi/stablecoins-became-crypto-s-first-mainstream-use-case-in-2025)
- [CoinLaw - Stablecoin Statistics 2026](https://coinlaw.io/stablecoin-statistics/)
- [Crystal Intelligence - USDT vs USDC Q3 2025](https://crystalintelligence.com/thought-leadership/usdt-maintains-dominance-while-usdc-faces-headwinds/)
