# リサーチチェックポイント：基本情報・仕組み・通説

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | パスワードはハッシュ関数（一方向性関数）で変換されてからデータベースに保存される。ログイン時は入力パスワードを再ハッシュして保存値と比較する | 🟢高 | Auth0公式ドキュメント, OWASP |
| 2 | ハッシュ関数は任意長の入力を固定長の出力（ハッシュ値）に変換する。同じ入力→常に同じハッシュ値。入力が1文字変わるとハッシュ値は完全に変化（アバランシェ効果） | 🟢高 | 暗号学テキスト全般, Wikipedia |
| 3 | ソルト（Salt）= 各パスワードに付加されるランダムな一意の文字列。これにより同じパスワードでも異なるハッシュ値が生成される | 🟢高 | OWASP Password Storage Cheat Sheet |
| 4 | ストレッチング = ハッシュ計算を何千〜何万回繰り返すことで、1回の検証にわざと時間をかけ、総当たり攻撃のコストを大幅に引き上げる技術 | 🟢高 | OWASP, NIST SP 800-63B |
| 5 | 推奨ハッシュアルゴリズム: Argon2id（2015年PHC優勝）, bcrypt（1999年, Blowfish基盤）, scrypt（2009年, メモリハード）。MD5/SHA-1はパスワード保存には非推奨 | 🟢高 | OWASP, PHC公式 |
| 6 | Argon2はルクセンブルク大学のAlex Biryukov, Daniel Dinu, Dmitry Khovratovichが設計。2015年Password Hashing Competitionで24候補から選出 | 🟢高 | PHC公式, GitHub, Wikipedia |
| 7 | OWASPのArgon2id推奨最小構成: メモリ19MiB, イテレーション2回, 並列度1 | 🟢高 | OWASP Password Storage Cheat Sheet |
| 8 | bcryptの仕組み: Blowfish暗号基盤、ワークファクター（コストファクター）で計算量を調整可能、ソルト自動生成、72バイト入力制限、メモリ使用量約4KB | 🟢高 | JumpCloud, 各種技術文献 |
| 9 | Unix初期（1974年, 6th Edition）にRobert Morris Sr.がcrypt(3)関数を開発。パスワードを鍵としてDESで暗号化→一方向ハッシュとして保存。最初のパスワードハッシュシステム | 🟢高 | Wikipedia, TrustedSec, UCF論文 |
| 10 | 1979年のUnix 7th Editionで12ビットのソルトが導入された。Morris & ThompsonがPassword Security: A Case Historyを発表 | 🟢高 | Morris & Thompson (1979), Wikipedia |

## まとめ・所感

パスワード保存の基本的な仕組み（ハッシュ→ソルト→ストレッチング）は十分に文献で裏付けられている。1974年のUnix crypt関数から2015年のArgon2まで、約40年にわたるパスワード保護の進化の歴史が追える。視聴者の「パスワードはそのまま保存されている」という誤解を覆すのに最適なファクトが揃っている。
