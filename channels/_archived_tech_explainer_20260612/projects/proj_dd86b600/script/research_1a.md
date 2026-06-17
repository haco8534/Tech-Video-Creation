# research_1a.md — 主流・肯定情報

「再起動したら直る」がなぜ効くのかの、一般的・公式な説明。

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---|---|---|---|
| A1 | 再起動は RAM に保持された全プロセスの状態を破棄し、揮発性メモリを初期化する。RAM はそもそも電源で保持される揮発性メモリなので、電源を落とせば保持内容は失われる | 🟢 | [Wikipedia: Memory leak](https://en.wikipedia.org/wiki/Memory_leak) | 物理的な性質の話 |
| A2 | メモリリークは「プログラムが確保したメモリを使い終わっても解放しない」現象。プロセスが終了すれば OS がまとめて回収する。再起動は全プロセスを終了させるので、すべてのリークがリセットされる | 🟢 | [Wikipedia: メモリリーク](https://ja.wikipedia.org/wiki/%E3%83%A1%E3%83%A2%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%AF) / [e-Words](https://e-words.jp/w/%E3%83%A1%E3%83%A2%E3%83%AA%E3%83%BC%E3%82%AF.html) | |
| A3 | 再起動はファイルハンドル・DB接続・ソケットなどの OS リソースを強制的に返却する。個別プログラムが release し忘れても、プロセス終了時に OS が回収する | 🟢 | [78IT](https://www.78it.com/memory-leak/) | |
| A4 | メモリフラグメンテーション（断片化）は、メモリの確保・解放の繰り返しで未使用領域が飛び飛びになり、連続した大きな空き領域を確保できなくなる現象。長時間稼働で進む。CPU キャッシュ効率も落ちる | 🟢 | [Wikipedia: フラグメンテーション](https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%A9%E3%82%B0%E3%83%A1%E3%83%B3%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3) / [Qiita kernel](https://qiita.com/Kernel_OGSun/items/05f6a0de88aa29e0a212) | 再起動で連続領域が戻る |
| A5 | デッドロック（お互いロックを待ち合って止まる）は、そのインスタンスのスレッド状態に依存する。プロセスを作り直せば、ロックも待ちキューも全部まっさらになる | 🟢 | [Wikipedia: Race condition](https://en.wikipedia.org/wiki/Race_condition) / [Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/developer/visualstudio/visual-basic/language-compilers/race-conditions-deadlocks) | |
| A6 | レースコンディションによる不具合は**非決定的**。同じ入力でも実行タイミングが少しずれれば発生しない。再起動すれば再発確率が下がり「直ったように見える」ことが多い | 🟢 | [Wikipedia: Race condition](https://en.wikipedia.org/wiki/Race_condition) | |
| A7 | キャッシュ汚染・古い設定の残留・破損した一時ファイルなども、再起動時にクリアされるか再読込される。ドライバや OS カーネルの状態もまっさらから再初期化される | 🟢 | [directive.com](https://www.directive.com/blog/how-restarting-your-computer-magically-fixes-everything.html?tmpl=component&print=1&format=print) / [alwaysbeyond.com](https://www.alwaysbeyond.com/blog/why-rebooting-your-windows-computer-boosts-performance-and-security) | |
| A8 | Kubernetes の liveness probe は「コンテナが生きているか」を定期的に確認し、失敗が閾値を超えると **kubelet が自動でコンテナを再起動**する。大規模マイクロサービスでデッドロックやハング状態を自己修復する標準手段 | 🟢 | [Kubernetes 公式ドキュメント](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) | 「再起動で直す」が運用の前提 |
| A9 | OS やブラウザのアップデート適用時に再起動を要求するのは、稼働中のプロセスがファイルをロックしていたり、古いバイナリをメモリに展開したままだったりするため。再起動で確実に新版を読み込ませる | 🟡 | [alwaysbeyond.com](https://www.alwaysbeyond.com/blog/why-rebooting-your-windows-computer-boosts-performance-and-security) | |
| A10 | 再起動は**無料で、早くて、副作用が予測しやすい**復旧手段。根本原因を突き止めるコストとの比較で、「まず再起動」が合理的な第一選択になる場面は多い（特に非再現バグに対して） | 🟡 | [Pine CC blog](https://marketing.pinecc.com/blog/why-does-restarting-your-computer-fix-a-variety-of-issues) | IT サポート定番の理由 |
