# Research 2b: 対立軸・比較・誤解されやすい点

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | PS3 ECDSA署名破り(2010): SonyがECDSA署名のナンスkを固定値として使い回し、fail0verflowが秘密鍵を完全復元。George Hotzが公開 | 🟢高 | Schneier on Security, 27C3発表 |
| 2 | Dual_EC_DRBG(2007-2014): NSAが標準化を主導した疑似乱数生成器にバックドア。RSA社はNSAから$10Mを受け取りデフォルト採用。2014年NIST撤回 | 🟢高 | Wikipedia, Cloudflare技術解説 |
| 3 | Debian OpenSSL脆弱性CVE-2008-0166(2006-2008): パッチでシードがPIDのみに依存、鍵空間が32,767通りに縮小。2年間気付かれず | 🟢高 | Debian DSA-1571 |
| 4 | Android Bitcoin ウォレット盗難(2013): SecureRandom欠陥でECDSAナンス再利用、55.82 BTC盗難 | 🟢高 | bitcoin.org公式アラート |
| 5 | ロシアのスロットマシン予測ハック(2010年代): Novomatic社PRNGをリバースエンジニアリング、24回のスピン録画から次の当たりを予測 | 🟢高 | Schneier on Security |
| 6 | RANDU(1960-70年代): IBMのLCG、Knuthに「truly horrible」と評された。3次元プロットで15枚の平行平面にしか点が落ちない。1999年まで一部使用 | 🟢高 | Wikipedia - RANDU |
| 7 | モンテカルロ法の隠れた誤差: LCGでメタノール分子体積が正しい値より約24%大、Isingモデルのウルフ・アルゴリズムで不正確な結果 | 🟢高 | Phys. Rev. Lett. 69, 3382 |
| 8 | 疑似乱数 vs 真性乱数 vs CSPRNG: PRNGはシードで予測可能、CSPRNGは状態漏洩に耐性、TRNGは物理由来だが低速。ハイブリッドが主流 | 🟢高 | Wikipedia - CSPRNG |
| 9 | 量子乱数生成器の限界: サイドチャネル攻撃に脆弱、速度が数十Mbpsに制限、「全テスト合格しても完全性証明は原理的に不可能」 | 🟡中 | Nature Scientific Reports |
| 10 | 2012年Lenstra et al.研究: インターネット上TLS証明書の0.2%が脆弱な乱数で生成、素因数を共有し秘密鍵復元可能 | 🟢高 | "Ron was wrong, Whit is right" |

## まとめ

乱数品質不足はPS3秘密鍵漏洩、Bitcoinウォレット盗難、Debian鍵空間32,767通り縮小、カジノ予測など実際に甚大な被害を生んでいる。RANDUのように統計テストに通りながら致命的構造欠陥を持つ生成器や、Dual_EC_DRBGのような国家レベルバックドアも存在した。量子乱数も実装上の限界があり万能ではない。
