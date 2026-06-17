# Research 2c: 背景・深掘り情報

テーマ: 「あなたのパスワードは何秒で破られるか」

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 1961年、MITのCompatible Time-Sharing System（CTSS）が世界初のパスワードログインシステムを実装。Fernando Corbato教授が開発。複数ユーザーが1台のメインフレームを共有する際、個人ファイルを保護するのが目的だった。パスワードは平文保存で、1962年には早くも最初のパスワード漏洩が発生した。 | 🟢高 | [CyberNews - First computer password](https://cybernews.com/security/first-computer-password/), [Wikipedia - Password](https://en.wikipedia.org/wiki/Password) |
| 2 | 2009年12月、RockYouがSQLインジェクションで3,200万件のパスワードを漏洩。パスワードは平文で保存されていた。最も使われていたパスワードは「123456」。このデータセットは後にパスワードクラッキングの辞書として業界標準となった。 | 🟢高 | [RockYou - Wikipedia](https://en.wikipedia.org/wiki/RockYou), [TechCrunch - RockYou Hack](https://techcrunch.com/2009/12/14/rockyou-hack-security-myspace-facebook-passwords/) |
| 3 | 2012年6月、LinkedInが約1億1,700万件のパスワードハッシュを漏洩。SHA-1をソルトなしで使用していたため、レインボーテーブル攻撃で大量のパスワードが即座に解読された。当初の発表は650万件だったが、2016年に実際は1億1,700万件と判明。 | 🟢高 | [2012 LinkedIn hack - Wikipedia](https://en.wikipedia.org/wiki/2012_LinkedIn_hack), [KrebsOnSecurity](https://krebsonsecurity.com/2016/05/as-scope-of-2012-breach-expands-linkedin-to-again-reset-passwords-for-some-users/) |
| 4 | 2013〜2014年、Yahoo!が史上最大のデータ漏洩を経験。当初10億件と発表されたが、最終的に全30億アカウントが漏洩していたと判明。事件発覚から公表まで約3年を要した。この遅延によりVerizonによる買収価格が3億5,000万ドル減額された。 | 🟢高 | [Yahoo data breaches - Wikipedia](https://en.wikipedia.org/wiki/Yahoo_data_breaches), [MIT Technology Review](https://www.technologyreview.com/2016/12/15/106901/a-history-of-yahoo-hacks/) |
| 5 | 2019年1月、「Collection #1」がダークウェブに出現。7億7,300万件のメールアドレスと2,100万件のユニークパスワードを含む27億のメール/パスワードペア。Collection #2〜#5を合わせると250億件のレコード・845GBに達した。セキュリティ研究者Troy Huntが発見し「Have I Been Pwned」で検索可能にした。 | 🟢高 | [Troy Hunt - Collection #1](https://www.troyhunt.com/the-773-million-record-collection-1-data-reach/), [Collection No. 1 - Wikipedia](https://en.wikipedia.org/wiki/Collection_No._1) |
| 6 | ハッシュ関数の進化: DES crypt（1976年、Unix初期）→ MD5（1991年、高速だが衝突脆弱性）→ SHA-1/SHA-256（1995/2001年、汎用ハッシュ）→ bcrypt（1999年、Blowfishベース、コストファクターで計算量を調整可能）→ scrypt（2009年、Colin Percival設計、メモリハード関数の先駆け）→ Argon2（2015年、Password Hashing Competition優勝、GPU/ASIC耐性を最大化）。OWASPはbcrypt・scrypt・Argon2を推奨。 | 🟢高 | [Psono - Evolution of Password Hashing](https://psono.com/blog/evolution-of-password-hashing), [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) |
| 7 | RTX 4090単体でのHashcatベンチマーク: MD5は毎秒1,641億ハッシュ（164.1 GH/s）、NTLMは毎秒2,885億ハッシュ（288.5 GH/s）。一方bcrypt（コスト10）は毎秒約18.4万ハッシュまで激減する。つまりbcryptはMD5の約89万倍遅い=それだけ攻撃者にとって解読が困難。 | 🟢高 | [Hashcat v6.2.6 benchmark RTX 4090 - GitHub](https://gist.github.com/Chick3nman/32e662a5bb63bc4f51b847bb422222fd), [OnlineHashCrack Benchmarks](https://www.onlinehashcrack.com/tools-benchmark-hashcat-nvidia-rtx-4090.php) |
| 8 | HashcatはGPU最適化のオープンソースパスワードクラッキングツール。300種類以上のハッシュアルゴリズムに対応。John the Ripperは1996年登場のCPUベースツールで、ハッシュ形式の自動検出に強い。両ツールともセキュリティ監査・ペネトレーションテストで広く使用される。 | 🟡中 | [DEV Community - Hashcat vs JtR](https://dev.to/bhavikgoplani/hashcat-vs-john-the-ripper-a-comparative-benchmarking-of-password-cracking-tools-26a4), [JumpCloud - What is Hashcat](https://jumpcloud.com/it-index/what-is-hashcat) |
| 9 | NIST SP 800-63B Rev.4（2024年最終版）の主な変更点: (1) パスワードの定期変更を「SHALL NOT（してはならない）」に格上げ、(2) 大文字・記号混在等の複雑性ルールを非推奨、(3) 最小文字数を15文字に引き上げ（パスワードが唯一の認証手段の場合）、(4) 漏洩パスワードのブロックリストチェックを必須化。元著者のBill Burrは従来の複雑性ルールが逆にセキュリティを低下させたと公式に謝罪した。 | 🟢高 | [NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html), [Enzoic - NIST Rev4](https://www.enzoic.com/blog/nist-sp-800-63b-rev4/) |
| 10 | パスキー（FIDO2/WebAuthn）: 公開鍵暗号ベースでパスワード自体をサーバーに送らない。Apple・Google・Microsoftが全面対応。2025年5月、Microsoftは新規アカウントのデフォルトをパスキーに変更し、パスキー認証が120%増加。Googleは8億以上のアカウントでパスキーを使用中。パスキーのログイン成功率は98%、パスワード+MFAは32%。パスキーはパスワード+MFAの8倍高速。 | 🟢高 | [FIDO Alliance 2025 Report](https://www.descope.com/blog/post/2025-fido-report), [Programming Helper - Passkeys 2026](https://www.programming-helper.com/tech/passkeys-passwordless-authentication-2026-fido-apple-google-microsoft-adoption) |
| 11 | ゼロ知識証明（ZKP）認証: パスワードそのものを送信せずに「パスワードを知っている」事実だけを証明する技術。SRP（Secure Remote Password、1998年、Tom Wu考案）が先駆け。現在はOPAQUEプロトコルがSRPの後継として推奨されており、より強力な形式的安全性証明を持つ。サーバー側にパスワード平文もハッシュも保存不要になる。 | 🟡中 | [SRP - Wikipedia](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol), [Cryptography Engineering - Should you use SRP?](https://blog.cryptographyengineering.com/should-you-use-srp/) |
| 12 | 量子コンピュータの脅威: Groverのアルゴリズム（1996年）により、ブルートフォースの探索空間がO(N)からO(√N)に削減される。例: 100万通りの探索が約1,000回で完了。128bit鍵は実質64bit相当に弱体化。対策としてAES-256の使用が推奨される（量子耐性で128bit相当を維持）。ただし2026年現在、実用的な量子コンピュータはNISQ段階であり、即座の脅威ではない。NISTは2024年にポスト量子暗号標準（ML-KEM, ML-DSA等）を正式発表済み。 | 🟢高 | [Fortinet - Shor's and Grover's Algorithms](https://www.fortinet.com/resources/cyberglossary/shors-grovers-algorithms), [PostQuantum.com - Grover's Algorithm](https://postquantum.com/post-quantum/grovers-algorithm/) |
| 13 | パスワードレス認証市場は2024年の183.6億ドルから2033年に863.5億ドルへ成長見込み。フィリピン中央銀行は2026年6月25日までに銀行・金融機関へFIDO準拠のパスワードレス認証導入を義務化。世界の消費者の75%がパスキーを認知し、使用経験者の38%が「可能な限りパスキーを有効化している」と回答。 | 🟡中 | [Biometric Update - State of Passkeys 2025](https://www.biometricupdate.com/202501/state-of-passkeys-2025-passkeys-move-to-mainstream), [Techpression - Passkeys in 2026](https://techpression.com/ditching-the-password-everything-you-need-to-know-about-passkeys-in-2026/) |

## まとめ

パスワードの歴史は、1961年のMIT CTSSによる平文保存から始まり、60年以上にわたって「攻撃と防御のいたちごっこ」を繰り返してきた。

**漏洩事件の教訓**: RockYou（平文保存）、LinkedIn（ソルトなしSHA-1）、Yahoo（30億件・3年隠蔽）、Collection #1-5（250億件の集積）と、事件のたびにセキュリティのベストプラクティスが更新されてきた。共通する教訓は「平文保存は論外」「ソルトなしハッシュは危険」「漏洩は早期に公表すべき」の3点。

**ハッシュの進化**: MD5の毎秒1,641億回（RTX 4090）に対し、bcryptは毎秒18.4万回と約89万倍の差がある。この「意図的な遅さ」がモダンなパスワードハッシュの本質であり、Argon2はさらにメモリハード性を加えてGPU/ASIC攻撃への耐性を高めた。

**NIST方針の転換**: 「定期変更」「複雑性ルール」は人間の行動を考慮すると逆効果と判明。現在は「長いパスフレーズ」「漏洩チェック」「変更は侵害時のみ」が推奨される。

**パスワードの未来**: パスキー（FIDO2）が急速に普及し、2026年が大規模採用の転換点。量子コンピュータはGroverのアルゴリズムで鍵強度を半減させるが、現時点では理論的脅威にとどまる。ゼロ知識証明（OPAQUE等）やポスト量子暗号も実用化が進んでおり、「パスワードを知っているが送信しない」「パスワード自体が不要」な認証へ向かっている。
