# Research 2a: 基本情報・仕組み・通説

## ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | Stack Overflow 2023: 開発者のmacOS使用率は個人32.57%、業務33%。Windows個人59.72%、業務46.91% | 🟢高 | Stack Overflow Developer Survey 2023 |
| 2 | 一般PC市場のmacOSシェアは約16%だが、開発者では30%超と約2倍の偏り | 🟢高 | Statcounter 2023 + Stack Overflow 2023 |
| 3 | macOSはBSD Unix（Darwin）ベースのPOSIX認定OS。ターミナルからUnixコマンド（ls, rm, cp, grep等）をネイティブ実行可能 | 🟢高 | Apple公式 / IEEE POSIX認定 |
| 4 | macOSの前身はNeXTSTEP。1996年にAppleがNeXTを4億ドルで買収しMac OS Xの基盤に | 🟢高 | Computer History Museum / Apple公式 |
| 5 | NeXTSTEP上でティム・バーナーズ＝リーが世界初のWebブラウザを開発 | 🟢高 | CERN / Computer History Museum |
| 6 | iOS/macOSアプリ開発にはXcodeが必須で、XcodeはMac専用 | 🟢高 | Apple公式 |
| 7 | HomebrewはmacOSの「事実上の標準パッケージマネージャ」。Node.js, Python, Go, Ruby, PostgreSQL等をワンコマンドでインストール | 🟢高 | Homebrew公式 / brew.sh |
| 8 | Apple Silicon（M1/M2/M3）はファンレスでもコンパイル性能が高く、バッテリー駆動時間20時間超。ARM効率のおかげ | 🟢高 | Apple公式ベンチマーク / 各種レビュー |
| 9 | Python, Ruby, Node.js, PHP等の主要言語ランタイムはLinux/macOS上で先に開発・テストされる傾向がある | 🟡中 | 開発者コミュニティ / 各言語公式リポジトリ |
| 10 | Dockerのコンテナ技術はLinuxカーネル機能に依存。macOSではHyperKit/Appleの仮想化を使いほぼネイティブ体験。WindowsではWSL2経由 | 🟢高 | Docker公式ドキュメント |
| 11 | macOSはクリエイティブツール（Sketch, Final Cut Pro等）とUnix環境を両立できる唯一のOS | 🟡中 | 各種開発者アンケート |
| 12 | Silicon Valleyのスタートアップ文化ではMacBookがデファクトスタンダード。カフェでのプログラミング風景の象徴 | 🟡中 | 各種テック系メディア |

## まとめ
macOSが開発者に選ばれる理由は「オシャレだから」だけではなく、Unix環境のネイティブサポート、主要言語ランタイムとの親和性、Homebrewによる開発環境構築の容易さ、Xcode独占によるiOS開発の必須性、M系チップの高性能・省電力という複合要因がある。一般市場シェア16%に対し開発者シェア30%超という偏りが、技術的理由の存在を裏付けている。
