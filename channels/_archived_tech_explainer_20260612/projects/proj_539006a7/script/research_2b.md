# Research 2b: 対立軸・比較・誤解されやすい点

テーマ: 「あなたのパスワードは何秒で破られるか」

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | **NIST SP 800-63B Rev.4 (2025年8月発行) が「定期変更」と「複雑性ルール」を明確に非推奨化。** verifier は「パスワードを定期的に変更させてはならない (shall not)」と規定し、大文字・数字・記号の混在強制も禁止。代わりに最低15文字の長さとブリーチ済みパスワードリストとの照合を推奨。 | 🟢高 | [NIST SP 800-63B Rev.4](https://pages.nist.gov/800-63-FAQ/) / [Enzoic解説](https://www.enzoic.com/blog/nist-sp-800-63b-rev4/) / [Dark Reading](https://www.darkreading.com/identity-access-management-security/nist-drops-password-complexity-mandatory-reset-rules) |
| 2 | **xkcd #936「correct horse battery staple」方式の限界。** 理論上44ビットのエントロピーだが、実際のユーザーは3,000語程度の頻出語彙から選ぶため実効エントロピーが大幅に低下。パスワードクラッカーは辞書単語の連結パターンを既に攻撃ルールに組み込んでおり、「4単語 = 実質4文字のパスワード (文字セットが5,000語に拡張されただけ)」という指摘がある。 | 🟡中 | [Pen Test Partners](https://www.pentestpartners.com/security-blog/correcthorsebatterystaple-isnt-a-good-password-heres-why/) / [explain xkcd](https://www.explainxkcd.com/wiki/index.php/936:_Password_Strength) / [Fractional CISO](https://fractionalciso.com/correct-horse-battery-staple-review/) |
| 3 | **LastPass 2022年漏洩事件: 暗号化済みVaultが盗まれ、弱いマスターパスワードは実際に解読された。** 2025年末時点で累計1.5億ドル超の暗号通貨が盗難。旧ユーザーのVaultはPBKDF2のイテレーション回数が低く(5,000回以下)、攻撃者が弱いマスターパスワードを総当たりで突破。パスワードマネージャーは「マスターパスワードの強度」がSingle Point of Failureになるリスクを実証。 | 🟢高 | [Krebs on Security (2025/03)](https://krebsonsecurity.com/2025/03/feds-link-150m-cyberheist-to-2022-lastpass-hacks/) / [Wikipedia](https://en.wikipedia.org/wiki/2022_LastPass_data_breach) / [The Hacker News](https://thehackernews.com/2025/12/lastpass-2022-breach-led-to-years-long.html) |
| 4 | **MFA (多要素認証) はバイパス可能。2024-2025年のBEC事案の79%でMFA導入済み環境が突破された。** 主な手法: (1) SIMスワップ — 携帯番号を乗っ取りSMS OTPを傍受、(2) AiTM (Adversary-in-the-Middle) フィッシング — Evilginx2等のリバースプロキシでセッションCookieごと窃取、(3) MFA疲労攻撃 — 大量のプッシュ通知で承認を誘発。Tycoon 2FAプラットフォームだけで推定8,750万通のフィッシングメールが送信され約96,000人が被害。 | 🟢高 | [FRSecure/Noorstream](https://noorstream.com/2025/09/10/real-world-mfa-bypass-techniques-in-recent-breaches-2024-2025/) / [Cyber Unit](https://cyberunit.com/insights/mfa-bypass-phishing-resistant-authentication-hardware-keys-passkeys/) / [AdminByRequest](https://www.adminbyrequest.com/en/blogs/sim-swapping-and-mfa-bombing-how-attackers-beat-two-factor-authentication) |
| 5 | **SMS認証は公式に非推奨化が進行。** USPTOは2025年にSMS認証を完全廃止、FINRAも追随。FBI・CISAはSMS認証に対する公式警告を発出。NIST SP 800-63-4ではAAL2にフィッシング耐性オプション (パスキー等) の提供を必須化。 | 🟢高 | [Cyber Unit](https://cyberunit.com/insights/mfa-bypass-phishing-resistant-authentication-hardware-keys-passkeys/) / [NIST SP 800-63-4](https://pages.nist.gov/800-63-FAQ/) |
| 6 | **生体認証のバイパス率は想像以上に高い。** 欧州のセキュリティラボがディープフェイクで80%以上の顔認証を突破。別の研究では個人デバイスの顔認証の96%が「写真の印刷」だけで突破可能。2024年にはディープフェイクによるアカウント乗っ取り試行が前年比244%増加。ディープフェイクツールキットは20ドル未満で入手可能。 | 🟡中 | [CyberTech Nexus](https://cybertechnexus.com/2025/09/29/biometric-spoofing-when-your-face-and-fingerprints-arent-safe/) / [Shufti Pro](https://shuftipro.com/blog/biometric-authentication-bypass-2025/) / [ASIS Online](https://www.asisonline.org/security-management-magazine/latest-news/today-in-security/2025/april/bypassing-biometric-screening/) |
| 7 | **パスワード解読時間はハッシュ方式で桁違いに変わる。** RTX 5090×12台の環境で、同じ8文字パスワードでもMD5なら数分、bcrypt (cost=12) なら数週間、Argon2id (128MB) なら数年。RTX 4090はSHA-256を毎秒220億ハッシュ処理できるが、bcrypt (cost=12) では毎秒約200ハッシュ — 約1億倍の差。Hive Systems 2025年版は初めてbcrypt (cost=10) を基準に採用し、MD5前提だった旧版と大きく異なる結果に。 | 🟢高 | [Hive Systems 2025](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) / [Deepak Gupta](https://guptadeepak.com/the-complete-guide-to-password-hashing-argon2-vs-bcrypt-vs-scrypt-vs-pbkdf2-2026/) / [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) |
| 8 | **「よく見るパスワード解読時間表」は前提条件で全く異なる結論になる (批判)。** Hive Systemsの表は「ランダム生成パスワード」「オフライン総当たり」「特定のハッシュ+GPU構成」を前提としており、辞書攻撃・レインボーテーブル・過去の漏洩パスワードの再利用は考慮外。「この表はコンテキスト無しに共有されると誤情報になりうる」との批判がある。 | 🟡中 | [Danny Chung (Medium)](https://danny-chung.medium.com/please-stop-sharing-this-password-chart-514d516ccc96) / [Hive Systems 方法論説明](https://www.hivesystems.com/password-table) |
| 9 | **ソルト付きハッシュでもクラッキングは可能。** ソルトはレインボーテーブル攻撃を無効化するが、総当たり・辞書攻撃には無力。Hashcatはソルトの適用方法さえ分かればソルト付きハッシュを解読可能。実際のブリーチ (Dropbox, MyFitnessPal等) ではbcryptが使われていたが、弱いパスワードは依然として解読された。 | 🟢高 | [freeCodeCamp Hashcat Guide](https://www.freecodecamp.org/news/hacking-with-hashcat-a-practical-guide/) / [Cyberly](https://www.cyberly.org/en/how-do-you-use-hashcat-to-crack-salted-hashes/index.html) / [Hive Systems](https://www.hivesystems.com/blog/are-your-passwords-in-the-green) |
| 10 | **「パスワードは死んだ」論 vs 現実: パスキーは普及期に入ったが、パスワードは消えていない。** FIDO Alliance報告 (2025年11月) で消費者の69%が1つ以上のパスキーを保有 (2年前は39%)。10億人以上がパスキーを有効化。しかし実際のサインインのうちパスキー利用は26%にとどまる。「2026年3月が変曲点」とされるが、レガシーシステムの移行には長期間を要し、パスワードとの併存が続く。 | 🟢高 | [FIDO Alliance Passkey Index 2025](https://fidoalliance.org/passkey-index-2025/) / [Security Boulevard (2026/03)](https://securityboulevard.com/2026/03/passkeys-hit-critical-mass-microsoft-auto-enables-for-millions-87-of-companies-deploy-as-passwords-near-end-of-life/) / [Authsignal](https://www.authsignal.com/blog/articles/passwordless-authentication-in-2025-the-year-passkeys-went-mainstream) |

## まとめ

### 主要な対立軸

1. **「複雑さ」vs「長さ」**: NISTが公式に複雑性ルールを非推奨化。短くて複雑なパスワード (8文字記号混じり) より、長くてシンプルなパスフレーズの方がエントロピーが高い。ただしxkcd方式も辞書攻撃への耐性に限界がある。

2. **「ハッシュ方式」による解読時間の桁違いの差**: パスワード解読時間の表は前提とするハッシュアルゴリズム (MD5 vs bcrypt vs Argon2) で数分〜数年の差が生じる。視聴者が目にする「パスワード解読時間表」は前提条件を確認しないと誤解を招く。

3. **「MFA = 安全」の誤解**: MFAは重要な防御層だが万能ではない。SMS-OTPはSIMスワップやAiTMフィッシングで突破される。FIDO2/パスキーのみがフィッシング耐性を持つ。

4. **「パスワードマネージャー = 万全」の誤解**: LastPass事件が示す通り、マスターパスワードの強度とサービス側の実装 (イテレーション回数等) が脆弱なら暗号化Vault自体が解読される。利点はランダム・ユニークなパスワード生成だが、Single Point of Failureのリスクを理解する必要がある。

5. **「パスワードは死んだ」vs 現実**: パスキーは急速に普及中 (69%が保有) だが、実際のログインの26%に留まる。完全な移行には年単位の時間がかかり、当面パスワードとの併存が続く。

### 動画で使える対比構造

- 「常識」と思われているルール (定期変更・記号必須) → NISTが否定
- よく見る解読時間表 → ハッシュ方式で全く違う結果に
- MFAを入れたから安全 → 79%のBEC事案でMFA突破済み
- パスワードマネージャーで完璧 → LastPassで1.5億ドル盗難
- 指紋・顔認証なら大丈夫 → 20ドルのツールで突破可能
- パスワードはもう不要 → パスキー普及率26% (まだ道半ば)
