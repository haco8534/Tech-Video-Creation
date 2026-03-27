# リサーチチェックポイント：背景・深掘り情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | chroot（1979年、Unix V7）はファイルシステムレベルの分離のみで、カーネル分離やリソース管理機能はなかった。「chrootジェイル」の名で呼ばれた | 🟢高 | Linux Foundation / Wikipedia |
| 2 | FreeBSD Jails（2000年、Poul-Henning Kamp開発）はchrootの限界を超え、独自のファイルシステム、IPアドレス、ホスト名、プロセス空間を持つ仮想環境を実現 | 🟢高 | Wikipedia / freebsdfoundation.org |
| 3 | Solaris Zones（2004年、Sun Microsystems）は同一カーネルを共有する軽量仮想化。各Zoneが独立サーバーとして動作 | 🟢高 | Wikipedia / Fujitsu |
| 4 | LXC（2008年）はLinuxカーネルのcgroups（2006年にGoogle開発）とnamespaces機能を組み合わせた初の完全なLinuxコンテナマネージャー | 🟢高 | Wikipedia / Linux Foundation |
| 5 | Linux namespaceは6種類（PID, NET, MNT, IPC, UTS, User）でプロセスの「見えるもの」を分離し、cgroupsはCPU・メモリ・I/Oなど「使えるリソース」を制限する。この2つがコンテナの基盤 | 🟢高 | Linux Foundation / Docker公式 |
| 6 | 「It works on my machine（俺のマシンでは動く）」問題は、ソフトウェア開発者を何十年も苦しめた。開発環境と本番環境のOS・ライブラリバージョン・設定の差異が原因 | 🟢高 | The New Stack / Medium |
| 7 | WindowsのDLL Hell（1990年代）は依存性地獄の代表例。異なるアプリが共有DLLを互換性のないバージョンで上書きし、他のアプリが壊れる問題 | 🟢高 | Wikipedia / Microsoft |
| 8 | Dockerの登場（2013年）とKubernetesの登場（2014年、Google開発→2015年CNCF寄贈）は時期的に連続しており、Docker→Kubernetesというクラウドネイティブの連鎖を生んだ | 🟢高 | Kubernetes.io / CNCF |
| 9 | Solomon Hykesは7歳でコーディングを始め、10代でパリのインターネットカフェのサーバーを管理していた | 🟡中 | contrary.com |
| 10 | PyCon 2013でのDocker発表はライトニングトーク（5分間）に過ぎなかったが、聴衆の反応が予想を超えて熱狂的だったため、オープンソース公開を前倒しした | 🟡中 | xurrent.com |
| 11 | DevOpsムーブメントが2010年代前半に加速しており、Dockerの登場はCI/CD、Infrastructure as Codeの流れと完全に合致した | 🟡中 | datacenterknowledge.com |
| 12 | Docker Inc.は2019年にMirantisへエンタープライズ部門を売却し、3500万ドルの新規資金調達でDocker Desktop・Docker Hubに再注力。企業としては「一度死んで復活した」 | 🟢高 | Docker公式ブログ / GlobeNewsWire |
| 13 | DockerがLXCに加えた本質的な違いは「システムコンテナ」→「アプリケーションコンテナ」への発想転換。1コンテナ=1プロセスという思想がマイクロサービスの基盤となった | 🟢高 | Docker公式 / purestorage.com |

## まとめ・所感

Dockerの真の革新は技術レイヤーではなく「抽象化レイヤー」にある。chroot→Jails→Zones→LXCと着実に進化したコンテナ技術の上に、Docker（特に3つの道具：Dockerfile、Docker Hub、レイヤードイメージ）が「誰でも使えるUI」を被せた。これはiPhoneがスマートフォンを発明したのではなく、既存技術を「使いやすく統合した」のと似た構造。

また「技術の大成功」と「企業の大成功」は別物だという教訓（Docker Inc.の苦闘→Mirantis売却→復活）も、台本の終盤のひねりとして面白い。技術を作った企業が、その技術を「制御」できなくなるパラドックス。
