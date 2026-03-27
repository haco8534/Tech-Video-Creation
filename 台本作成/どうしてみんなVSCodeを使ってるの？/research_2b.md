# リサーチチェックポイント：反論・例外・誤解されやすい点

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | VSCodeの公式バイナリはMITライセンスではなく「Microsoft Software License」で配布。テレメトリ（使用状況データ収集）がデフォルトで有効。これに反発してVSCodiumプロジェクトが誕生 | 🟢高 | vscodium.com / ADT Magazine |
| 2 | Electronフレームワークへの批判：各アプリがChromiumを同梱するため、メモリ消費が大きい。VSCodeは数百MBのRAMを消費する場合がある。Sublime Text（ネイティブC++）やVim/Neovimは数十MB | 🟢高 | LogRocket / GitHub Issue#38 / gitconnected |
| 3 | Atomエディタ（GitHub製）は2022年12月15日に開発終了。VSCodeと同じElectronベースだが、パフォーマンス問題（起動遅い、メモリ大）で敗北。2018年のMSによるGitHub買収後、内部競合で淘汰された | 🟢高 | GitHub公式発表 / ghacks.net |
| 4 | Atomこそが先にElectronを生み出したのにVSCodeがそれを使って勝ったという皮肉。MSは同じ技術で圧倒的に優れたパフォーマンス最適化を実現した | 🟢高 | Wikipedia / dev.to比較記事 |
| 5 | Sublime Text（2008年リリース）は2013年後半〜2017年に大きなアップデートが停滞。この「空白期間」がAtomやVSCodeに門戸を開いた | 🟡中 | Hacker News議論 |
| 6 | JetBrains IDE（IntelliJ系）は特定言語（Java, Kotlin, Python等）では依然としてVSCodeより優れた静的解析・リファクタリング・デバッグ機能を持つ。エンタープライズ開発では今もJetBrains優勢の領域がある | 🟢高 | javacodegeeks / plainenglish.io |
| 7 | Vim/Neovimユーザーはモーダル編集の効率性とネイティブパフォーマンスからVSCodeに移行しない層が存在。Neovimは2023年以降、LSPネイティブ対応で独自の進化を続けている | 🟡中 | 各種開発者フォーラム |
| 8 | 新興エディタZed（Atomの元開発者が開発、Rust製ネイティブ）やLapce（Rust製）がVSCodeの対抗馬として登場。Electronの重さを嫌う層が支持 | 🟡中 | xda-developers / Hacker News |
| 9 | 「VSCodeは軽量エディタ」という認識は誤解を含む。純粋なテキストエディタ（Vim, Sublime）と比べると明らかに重い。「1GBのファイルを開く」などのタスクでは致命的に遅い | 🟡中 | Hacker Newsでの開発者議論 |
| 10 | Microsoftのテレメトリに反発するプライバシー重視の開発者がVSCodiumに移行。一部のMS公式拡張機能はVSCodiumでは利用不可 | 🟢高 | vscodium.com / mcuoneclipse.com |
| 11 | 「Microsoftが作ったから流行った」は過度な単純化。2015年当時、MSは開発者コミュニティから不信感を持たれていた（Steve Ballmer時代の「Linuxはcancer」発言が象徴）。サティア・ナデラのオープンソース路線転換が前提条件 | 🟢高 | datacenterknowledge.com / businessinsider.com |

## まとめ・所感

VSCodeは完璧ではなく、以下の対立軸が台本で面白い展開に使える：
1. **「オープンソース」の微妙な二面性** — ソースコードはMITだがバイナリは別ライセンス。Chromium/Chrome方式
2. **Atom vs VSCode** — 同じElectronなのに明暗が分かれた理由はパフォーマンス最適化の差
3. **エディタ vs IDE論争** — VSCodeは「どっちでもない中間」を狙った。これが面白い
4. **Microsoftの信頼回復ストーリー** — 「Linuxはcancer」から「Microsoft ❤️ Linux」への弧
