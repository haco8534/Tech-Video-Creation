# リサーチチェックポイント：反論・例外・誤解されやすい点

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 「Dockerがコンテナ技術を発明した」は誤解。chroot(1979年)→FreeBSD Jails(2000年)→Solaris Zones(2004年)→LXC(2008年)と、コンテナ技術は30年以上の歴史がある | 🟢高 | Linux Foundation / aquasec.com / Wikipedia |
| 2 | 「Dockerは軽い仮想マシン」は不正確。VMはハイパーバイザー上にゲストOS全体を載せる「ハードウェアレベル仮想化」、DockerはホストOSのカーネルを共有する「OSレベル仮想化」で根本が異なる | 🟢高 | AWS / Docker公式 / Qiita |
| 3 | DockerデーモンはrootでAPIを公開しており、ソケット（/var/run/docker.sock）へのアクセス漏洩でホスト全体が危険にさらされるセキュリティリスクがある | 🟢高 | Docker公式 Security Guide / tigera.io |
| 4 | カーネル共有のため、カーネル脆弱性がすべてのコンテナに波及する。VMのハイパーバイザー分離より弱い | 🟢高 | Docker公式 / tigera.io |
| 5 | コンテナは本質的にエフェメラル（一時的）で、コンテナ削除でデータが消える。ステートフルなアプリ（DB等）には追加のボリューム管理が必要 | 🟢高 | 各種技術記事 |
| 6 | Docker SwarmはKubernetesとのオーケストレーション競争に敗北。2019年にDocker Inc.はエンタープライズ部門をMirantisに売却 | 🟢高 | siliconangle.com / computerweekly.com / Docker公式 |
| 7 | Docker Inc.は2017年に10億ドル超のユニコーン評価を受け、2.7億ドル超の資金調達をしたが、オープンソースの人気をビジネス収益に変換できなかった | 🟢高 | Business Insider / cloudnativenow.com |
| 8 | LinuxコンテナはホストOSと同じカーネルを共有するため、WindowsコンテナをLinux上で、またはその逆は直接実行できない（WSL2等の互換層が必要） | 🟢高 | channelfutures.com / Docker公式 |
| 9 | デフォルトのブリッジネットワーキングでNAT経由のルーティングが発生し、低レイテンシ・高スループットが要求されるアプリには不向き | 🟡中 | baeldung.com / stackoverflow |
| 10 | Docker HubのコンテナイメージにGPGの署名検証がなかった時代があり、悪意あるイメージの混入リスクがあった | 🟡中 | chainguard.dev / aikido.dev |

## まとめ・所感

Dockerの限界は「カーネル共有」というアーキテクチャに根ざしている。VMの「完全分離」とDockerの「軽量だが共有」はトレードオフの関係で、どちらが優れているかではなく用途による。また、Docker Inc.の企業としての苦闘は「技術が流行ること」と「企業として成功すること」が全く別の話であるという教訓を含んでおり、これは台本の「直感の破壊」ポイントとして非常に有効。
