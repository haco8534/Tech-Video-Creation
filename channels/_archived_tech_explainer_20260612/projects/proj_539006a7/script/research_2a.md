# Research 2a: 基本情報・仕組み・通説

テーマ: 「あなたのパスワードは何秒で破られるか」

---

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | **パスワードクラッキングの4大手法**: (1) ブルートフォース攻撃 — 全組み合わせを総当たりで試行。ソフトウェアが毎秒数十億の組み合わせを処理可能。(2) 辞書攻撃 — よく使われるパスワードやフレーズのリストを使い、人間の行動パターンを突く。(3) レインボーテーブル攻撃 — ハッシュ値と平文パスワードの対応表を事前計算しておき、盗まれたハッシュを照合して高速解読。ソルト付きハッシュで無効化可能。(4) クレデンシャルスタッフィング — 過去の漏洩で得たID/パスワードのペアを他サービスに流用して試行。パスワードの使い回しを悪用する。 | 🟢高 | [Splunk - Brute Force Attacks](https://www.splunk.com/en_us/blog/learn/brute-force-attacks.html), [Keeper Security - Types of Password Attacks](https://www.keepersecurity.com/blog/2024/01/12/types-of-password-attacks/), [Wikipedia - Rainbow table](https://en.wikipedia.org/wiki/Rainbow_table) |
| 2 | **Hive Systems 2025 パスワード解読時間表** (12 x RTX 5090, bcrypt work factor 10): 8文字・数字のみ → **15分**、8文字・小文字のみ → **3週間**、8文字・大小英字+数字 → **62年**、8文字・大小英字+数字+記号 → **164年**。12文字・大小英字+記号 → **約3,000年**。13文字・複合 → **約560億年**。前年比で解読速度が約20%向上。 | 🟢高 | [Hive Systems 2025 Password Table](https://www.hivesystems.com/blog/are-your-passwords-in-the-green), [heise online - Study](https://www.heise.de/en/news/Study-This-is-how-much-time-it-will-take-to-crack-a-password-in-2025-10373456.html) |
| 3 | **パスワードエントロピーの計算方法**: エントロピー E = log₂(R^L) = L × log₂(R) ビット。R=文字種の数、L=文字数。例: 小文字のみ(R=26) × 8文字 → 約37.6ビット。大小英数記号(R=95) × 12文字 → 約78.8ビット。攻撃者は最大2^Eの試行が必要。安全な目安は**60ビット以上**、推奨は**80ビット以上**。 | 🟢高 | [Wikipedia - Password strength](https://en.wikipedia.org/wiki/Password_strength), [Omnicalculator - Password Entropy](https://www.omnicalculator.com/other/password-entropy), [NordVPN - Password Entropy](https://nordvpn.com/blog/what-is-password-entropy/) |
| 4 | **ハッシュ関数の性能差** (RTX 4090 単体 hashcat v6.2.6 ベンチマーク): MD5 → **164.1 GH/s**、SHA-1 → **50.6 GH/s**、SHA-256 → **22.0 GH/s**、bcrypt(32反復) → **184 kH/s**、scrypt(16384反復) → **7,126 H/s**。MD5はbcryptの約**89万倍**高速 = 攻撃者にとって89万倍破りやすい。bcryptはBlowfish暗号ベースでコストファクター調整可能、Argon2idはメモリハード設計で GPU約1,000 H/s まで低下しGPU攻撃に最も強い。 | 🟢高 | [GitHub - Chick3nman RTX 4090 Benchmark](https://gist.github.com/Chick3nman/32e662a5bb63bc4f51b847bb422222fd), [Stytch - Argon2 vs bcrypt vs scrypt](https://stytch.com/blog/argon2-vs-bcrypt-vs-scrypt/) |
| 5 | **MD5/SHA-256は絶対にパスワード保存に使ってはいけない**: RTX 4090はSHA-256を毎秒**約220億回**ハッシュ計算可能。rockyou.txtの1,400万語全件を**1ミリ秒以下**でテスト完了。現在の推奨はArgon2id（2015年Password Hashing Competition優勝）、既存システムではbcrypt(コストファクター12以上)が依然有効。 | 🟢高 | [dev.to - Why MD5 and SHA Are Outdated](https://dev.to/lovestaco/hashing-passwords-why-md5-and-sha-are-outdated-and-why-you-should-use-scrypt-or-bcrypt-48p2), [Deepak Gupta - Password Hashing Guide 2025](https://guptadeepak.com/the-complete-guide-to-password-hashing-argon2-vs-bcrypt-vs-scrypt-vs-pbkdf2-2026/) |
| 6 | **GPU高速化の現状**: RTX 5090はRTX 4090比で**最大2倍**の解読速度（アルゴリズムによる。WPA2で46%高速）。単体RTX 5090で8桁数字パスワード(bcrypt)を**3時間**で解読。12台構成で15分。AI用ハードウェア(20,000 x A100)を使えば消費者向けGPU比で**18億%以上**の速度向上。4〜10桁の数字PINはほぼ瞬時に解読可能。 | 🟢高 | [Tom's Hardware - RTX 5090 Password Cracking](https://www.tomshardware.com/pc-components/gpus/nvidia-rtx-5090-can-crack-an-8-digit-passcode-in-just-3-hours), [Hive Systems Press Release](https://www.prnewswire.com/news-releases/hive-systems-releases-2025-password-table-reveals-even-faster-cracking-times-as-computing-power-surges-302441212.html) |
| 7 | **パスワード漏洩の規模**: Have I Been Pwnedには**120億件超**の漏洩レコードが蓄積、970以上の漏洩サイトを追跡。2025年2月にはTelegram経由で**230億行**のstealer logデータ（ALIEN TXTBASE）が共有され、20億以上のメールアドレスを含む。同年にはSynthientデータとして**約20億件**のメールアドレスと**13億件**のパスワードが追加。 | 🟢高 | [Have I Been Pwned](https://haveibeenpwned.com/), [Troy Hunt - 2 Billion Email Addresses](https://www.troyhunt.com/2-billion-email-addresses-were-exposed-and-we-indexed-them-all-in-have-i-been-pwned/) |
| 8 | **Verizon DBIR 2025の認証情報統計**: 侵害の初期アクセス手段として窃取された認証情報が**22%**を占める（前年38%→31%に減少するも依然として最大のベクトル）。基本的なWebアプリへの攻撃の**88%**が窃取された認証情報を使用。2024年に**28億件**のパスワードが犯罪フォーラムやダークネットで売買・共有。infostealerマルウェア感染者のパスワードのうち、異なるサービス間でユニークだったのは中央値でわずか**49%**（=半数以上が使い回し）。SSOプロバイダのログ分析では、全認証試行の**19%**がクレデンシャルスタッフィング。 | 🟢高 | [Verizon 2025 DBIR](https://www.verizon.com/business/resources/reports/dbir/), [Descope - DBIR 2025 Credentials](https://www.descope.com/blog/post/dbir-2025), [Flare - Stolen Credentials 2025 DBIR](https://flare.io/learn/resources/blog/stolen-credentials-in-cybercrime-insights-2025-verizon-dbir/) |
| 9 | **よく使われるパスワードランキング(NordPass 2025)**: 世界1位は**「123456」**で、過去7年のうち6年で首位。他にも「12345」「1234567890」「password」などが上位。世界で最もよく使われるパスワードの**78%が1秒未満**で解読可能。2025年のリストでは特殊記号を含むパスワードが32件（前年は6件）に増加したが、依然として脆弱。44カ国の分析で、全世代（Z世代〜サイレント世代）にわたりパスワードの質は一様に低い。 | 🟢高 | [NordPass - Top 200 Most Common Passwords](https://nordpass.com/most-common-passwords-list/), [NordSecurity Press](https://nordsecurity.com/press-area/americans-most-common-password-is-secret-) |
| 10 | **エントロピーの実用的な目安**: 数字のみ4桁(PIN) → 13.3ビット(瞬時に解読)。英小文字8文字 → 37.6ビット(数週間)。英大小+数字+記号8文字 → 52.4ビット(数年)。英大小+数字+記号12文字 → 78.8ビット(数千年)。ランダム英大小+数字+記号16文字 → 105ビット(宇宙の年齢を超える)。パスフレーズ(4単語, 7776語辞書) → 約51.7ビット、6単語 → 約77.5ビット。 | 🟡中 | [Omnicalculator - Password Entropy](https://www.omnicalculator.com/other/password-entropy), [Specops - Understanding Password Entropy](https://specopssoft.com/blog/password-entropy/) |

---

## 補足データ: ハッシュ関数別の処理速度比較 (RTX 4090 単体)

| アルゴリズム | 速度 (H/s) | 用途 | 安全性 |
|---|---|---|---|
| MD5 | 164.1 GH/s | レガシーシステム | ❌ 危険 |
| SHA-1 | 50.6 GH/s | Git等 | ❌ 危険 |
| SHA-256 | 22.0 GH/s | ブロックチェーン等 | ❌ パスワードには不適 |
| NTLM | 288.5 GH/s | Windows認証 | ❌ 危険 |
| bcrypt (cost 5) | 184 kH/s | パスワード保存 | ✅ cost 12以上推奨 |
| scrypt | 7,126 H/s | パスワード保存 | ✅ 安全 |
| Argon2id | ~1,000 H/s | パスワード保存 | ✅ 最も推奨 |

## 補足データ: 文字種別のエントロピー (1文字あたり)

| 文字種 | 文字数 R | 1文字のエントロピー log₂(R) |
|---|---|---|
| 数字のみ | 10 | 3.32 ビット |
| 小文字のみ | 26 | 4.70 ビット |
| 大小英字 | 52 | 5.70 ビット |
| 大小英字+数字 | 62 | 5.95 ビット |
| 大小英字+数字+記号 | 95 | 6.57 ビット |

---

## まとめ

1. **パスワードの長さが最大の防御**: Hive Systems 2025のデータによれば、8文字のパスワードは文字種を増やしても数年〜百数十年で解読されるが、12文字以上にすることで数千年〜数十億年の壁を作れる。文字種より文字数の影響が指数関数的に大きい。

2. **ハッシュ関数の選択が決定的**: MD5/SHA系は毎秒数百億回のハッシュが可能で、事実上パスワード保護として無力。bcrypt(cost 12+)やArgon2idを使うことで、GPU攻撃の速度を10万〜1億分の1に抑制できる。

3. **漏洩規模は天文学的**: HIBPだけで120億件超のレコード、2024年に28億件のパスワードが闇市場に流通。侵害の22%が窃取認証情報を起点としており、パスワードの使い回し（ユニーク率わずか49%）が被害を拡大。

4. **「よくあるパスワード」は即死**: NordPass 2025によれば、最頻出パスワードの78%は1秒未満で解読可能。「123456」が依然として世界1位。

5. **GPU性能の進化が脅威を加速**: RTX 5090は4090比で最大2倍の速度向上。AI用クラスタを使えば消費者向けの数十億倍の処理能力に達し、短いパスワードは実質的に無防備。

6. **動画で使える対比構造**: 「8文字の数字PIN → 15分で解読」vs「12文字の複合パスワード → 3,000年」という圧倒的な差が視聴者にインパクトを与えるキーファクト。エントロピーの概念を「金庫のダイヤルの桁数」に喩えると直感的に伝わる。
