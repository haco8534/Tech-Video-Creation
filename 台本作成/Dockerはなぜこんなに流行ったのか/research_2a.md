# リサーチチェックポイント：主流・肯定的情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | Dockerは2013年3月、Solomon HykesがPyCon US 2013で「The future of Linux Containers」という5分間のライトニングトークで初公開した | 🟢高 | Docker公式ブログ / PyCon 2013 |
| 2 | DockerはdotCloudというPaaS企業の内部コンテナ技術をオープンソース化したもの。dotCloudは2008年にSolomon Hykes、Sebastien Pahl、Kamel Founadiがパリで共同設立 | 🟢高 | Wikipedia (Docker) / contrary.com |
| 3 | Dockerの成功により、dotCloudは2013年10月に社名をDocker Inc.に変更。PaaSビジネスは2014年にcloudControlに売却 | 🟢高 | Wikipedia (Docker) |
| 4 | Dockerコンテナはホストカーネルを共有するため、仮想マシン比で起動が数秒（VMは数分）、メモリ消費はMB単位（VMはGB単位） | 🟢高 | AWS公式ドキュメント / Docker公式 |
| 5 | Dockerのパフォーマンスオーバーヘッドは5%未満。ベアメタル上でDocker実行はVM比で約50%のパフォーマンス改善 | 🟡中 | 各種ベンチマーク論文 |
| 6 | Docker Hubにはパブリックリポジトリが数百万存在し、35億以上のアプリがDockerで開発され、370億以上のコンテナイメージがダウンロードされた | 🟡中 | siddhatech.com |
| 7 | Dockerのコンテナ市場シェアは約87%、顧客数10万2千以上 | 🟡中 | 6sense.com |
| 8 | Docker（コンテナ技術）の市場規模は2025年に61.2億ドル、2031年までに192.6億ドル（CAGR 21.05%）に成長見込み | 🟡中 | Mordor Intelligence |
| 9 | Dockerfileにより再現可能なビルドが実現。各命令がレイヤーに対応し、変更レイヤーのみを転送・再ビルドすることで効率的なストレージ・高速ビルドを実現 | 🟢高 | Docker公式ドキュメント |
| 10 | Dockerは最初LXCを実行ドライバーとして使用していたが、後に独自のlibcontainer（現runc）を開発 | 🟢高 | Docker公式 / Wikipedia |
| 11 | 1台のホストで数百のコンテナを実行可能（VMは10〜15台が限度） | 🟡中 | 各種比較記事 |
| 12 | LXCが「システムコンテナ」（軽量VM）を志向したのに対し、Dockerは「アプリケーションコンテナ」（1プロセス分離）を提唱し、マイクロサービスアーキテクチャの普及を後押しした | 🟢高 | Docker公式 / Pluralsight |

## まとめ・所感

Dockerの成功の核心は「技術の革新」というより「既存技術の民主化」にある。コンテナ技術自体はchroot(1979年)からLXC(2008年)まで長い歴史があったが、Dockerが加えた3つのイノベーション──Dockerfile（再現可能なビルド定義）、Docker Hub（イメージの共有プラットフォーム）、レイヤード・イメージシステム（効率的な差分転送）──が、専門家でなくても使える形に仕上げた。PyCon 2013のわずか5分のデモで業界を興奮させたエピソードは、台本の導入部（フック）に最適。
