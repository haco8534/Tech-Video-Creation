# リサーチ結果：Dockerはなぜこんなに流行ったのか

- 作成日: 2026-03-14
- テーマ: Dockerはなぜこんなに流行ったのか
- リサーチ方針: 主流情報・反論・背景の3方向並列リサーチ

---

## 🟢 信頼度「高」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | chroot（1979年、Unix V7）がコンテナの祖。ファイルシステム分離のみ→FreeBSD Jails（2000年）→Solaris Zones（2004年）→cgroups（2006年、Google開発）→LXC（2008年）へと進化 | Linux Foundation / Wikipedia / aquasec.com | ⭐⭐⭐ |
| 2 | DockerはdotCloud（PaaS企業、パリ2008年設立）の内部技術をオープンソース化。2013年3月PyCon USで5分間のライトニングトーク「The future of Linux Containers」として初公開 | Docker公式 / PyCon 2013 / Wikipedia | ⭐⭐⭐ |
| 3 | Dockerコンテナ＝OSレベル仮想化（ホストカーネル共有）。VM＝ハードウェアレベル仮想化（ゲストOS丸ごと搭載）。根本的に異なるアーキテクチャ | AWS / Docker公式 | ⭐⭐⭐ |
| 4 | Linux namespacesは「見えるもの」を分離（PID, NET, MNT, IPC, UTS, User）。cgroupsは「使えるリソース」（CPU, メモリ, I/O）を制限。この2つがコンテナの基盤 | Linux Foundation / Docker公式 | ⭐⭐⭐ |
| 5 | DockerがLXCに加えた核心的イノベーション：(1) Dockerfile（再現可能ビルド定義）、(2) Docker Hub（イメージ共有プラットフォーム）、(3) レイヤードイメージシステム（差分転送による効率化） | Docker公式ドキュメント | ⭐⭐⭐ |
| 6 | LXCは「システムコンテナ」（軽量VM的、OS丸ごと動かす）→Dockerは「アプリケーションコンテナ」（1コンテナ＝1プロセス）へ発想転換。これがマイクロサービスの基盤に | Docker公式 / purestorage.com | ⭐⭐⭐ |
| 7 | コンテナ起動は数秒〜ミリ秒（VMは数分）。サイズはMB単位（VMはGB単位）。パフォーマンスオーバーヘッド5%未満 | AWS / Docker公式 | ⭐⭐ |
| 8 | 「It works on my machine」問題・DLL Hell（1990年代、Windows）・依存性地獄は開発者を何十年も苦しめた。Dockerはアプリと環境をまとめてパッケージングすることで解決 | The New Stack / Wikipedia | ⭐⭐⭐ |
| 9 | セキュリティ面：カーネル共有のためVMより分離性が低い。Dockerデーモンがroot権限で動作、ソケット漏洩リスク | Docker公式Security Guide / tigera.io | ⭐⭐ |
| 10 | Docker Swarm vs Kubernetes戦争：DockerはSwarmでオーケストレーション市場を狙ったが、Google発のKubernetes（2014年発表、2015年CNCF寄贈）に敗北 | Kubernetes.io / CNCF / siliconangle.com | ⭐⭐⭐ |
| 11 | Docker Inc.は2017年にユニコーン評価（10億ドル超）、2.7億ドル超の資金調達。しかしOSSの人気を収益化できず、2019年にエンタープライズ部門をMirantisに売却。3500万ドル調達でDocker Desktop/Hubに再注力 | Business Insider / Docker公式 / GlobeNewsWire | ⭐⭐⭐ |
| 12 | Docker→Kubernetesの流れがクラウドネイティブ革命を生んだ。AWS, GCP, Azureすべてがコンテナに対応 | CNCF / 各クラウドプロバイダー | ⭐⭐ |

## 🟡 信頼度「中」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | Dockerのコンテナ市場シェア約87%、顧客数10万2千以上 | 6sense.com | ⭐⭐ |
| 2 | コンテナ市場規模：2025年61.2億ドル→2031年192.6億ドル (CAGR 21.05%) | Mordor Intelligence | ⭐ |
| 3 | 350万以上のアプリがDockerで開発、370億以上のコンテナイメージがダウンロード | siddhatech.com | ⭐⭐ |
| 4 | Solomon Hykesは7歳でコーディング開始、10代でパリのインターネットカフェのサーバーを管理 | contrary.com | ⭐ |
| 5 | PyCon 2013の聴衆の反応が予想を超えて熱狂的だったため、OSS公開を前倒し | xurrent.com | ⭐⭐ |
| 6 | ベアメタル上でDocker実行はVM比で約50%のパフォーマンス改善 | 各種ベンチマーク | ⭐ |
| 7 | DevOpsムーブメントが2010年代前半に加速しており、DockerはCI/CD・Infrastructure as Codeの流れと合致 | datacenterknowledge.com | ⭐⭐ |
| 8 | 1台のホストで数百のコンテナを実行可能（VMは10〜15台が限度） | 各種比較記事 | ⭐⭐ |

## 🔴 信頼度「低」（台本使用不可）

該当なし

## 📌 台本構成への提言

### 核心ストーリーライン
「Dockerはコンテナ技術を発明していない → 30年間存在した技術を "使えるもの" に変えた → しかし技術の大成功≠企業の大成功」

### 推奨構成フロー

1. **フック**: 「It works on my machine」問題の実感から入る。あなたのPCでは動くのに本番では動かない──この悪夢
2. **前提構築**: VM（仮想マシン）で解決しようとしたが、重すぎた。「引っ越しのたびに家ごと運ぶようなもの」
3. **直感の構築**: Dockerの仕組み（コンテナ＝環境ごとパッケージング）を「引っ越し」アナロジーで段階的に構築。namespaces＝部屋の壁、cgroups＝電気のブレーカー
4. **直感の破壊**: 「でもコンテナ技術はDocker以前から30年あった。chrootは1979年」→なぜ誰も使わなかったのか？
5. **再構築**: Docker独自のイノベーション（Dockerfile / Docker Hub / レイヤードイメージ）が「使えるUI」を被せた。iPhoneの比喩
6. **さらなるひねり**: 「技術の大成功≠企業の大成功」──Docker Inc.のユニコーン→Kubernetes敗北→Mirantis売却→復活の物語
7. **まとめ**: 冒頭の「It works on my machine」問題に戻り、Dockerがどう世界を変えたかを対比

### 3Blue1Brown的設計ポイント
- **核アナロジー**: 「引っ越し」（VM＝家ごと運ぶ vs Docker＝段ボールで荷物だけ運ぶ）
- **思考実験**: 「もしnamespaceがなかったら？プロセスが全部丸見え」「もしcgroupsがなかったら？1つのアプリが資源を全部食い尽くす」
- **段階的洞察**: 80%の理解（Docker＝軽いVM）→破壊（実はカーネル共有で根本的に違う）→再構築
- **パターン統合**: 「Dockerのイノベーション」と「iPhoneのイノベーション」が同じ構造（既存技術の民主化）
