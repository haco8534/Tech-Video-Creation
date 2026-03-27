# リサーチチェックポイント：背景・深掘り情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | テキストエディタの歴史：TECO（1962年）→ ed（1969年）→ vi（1976年）→ Emacs（1976年Richard Stallman）→ Vim（1991年Bram Moolenaar）。50年以上の「エディタ戦争」の歴史がある | 🟢高 | Wikipedia各記事 / grio.com / medium.com |
| 2 | IDE概念の起源：Dartmouth BASIC（1964年）が最初のIDEとされる。Borland Turbo Pascal（1983年）がエディタ+コンパイラ統合の先駆。Visual Basic（1991年）がGUIビルダー統合 | 🟢高 | study.com / Google Developer |
| 3 | 「エディタ vs IDE」の本質的な違い：エディタは「テキスト編集の速さ」を追求し軽量。IDEは「開発作業の統合」を追求し重厚。VSCodeは意図的にこの中間を狙った | 🟡中 | medium.com各記事 / oreateai.com |
| 4 | Sublime Text（Jon Skinner, 2007年構想、2008年リリース）はC++/Pythonで書かれネイティブパフォーマンスを実現。プラグインシステムで拡張可能だが有料（$99） | 🟢高 | Wikipedia / quora.com |
| 5 | 2015年のStack Overflowサーベイ：Notepad++が1位、Sublime Textが2位（25.2%）。VSCodeは存在すらしていなかった | 🟢高 | Stack Overflow Developer Survey 2015 |
| 6 | サティア・ナデラのCEO就任（2014年）がMicrosoftのオープンソース路線転換の転機。「Microsoft loves Linux」宣言。.NET CoreのオープンソースリリースもVSCode以前に始まった | 🟢高 | businessinsider.com / Microsoft公式 |
| 7 | 2018年MicrosoftがGitHubを75億ドルで買収。開発者コミュニティから不安の声も出たが、Nadellaは「開発者の自由とオープンネスを守る」と宣言。結果的にGitHubの独立性は維持された | 🟢高 | Microsoft公式ブログ / Forbes |
| 8 | VSCodeのRemote Development（2019年発表）：SSH、コンテナ、WSLでリモート環境を透過的に操作可能。「ローカルのUIを使ってリモートのファイルシステムで作業」というクライアント-サーバー分離アーキテクチャ | 🟢高 | Microsoft公式ドキュメント |
| 9 | GitHub Codespaces（2020年〜）：ブラウザからアクセスできるクラウド開発環境で、中身はVSCode。devcontainer.jsonで環境を定義 | 🟢高 | GitHub公式 |
| 10 | Atomの「すべてが拡張機能」モデル vs VSCodeの「標準機能+オプション拡張」モデル。Atomは柔軟だが複雑で遅い、VSCodeは「80%のユースケースは標準で、残り20%を拡張で」 | 🟡中 | Hacker News議論 / dev.to |
| 11 | VSCode内部のマルチプロセスアーキテクチャ：メインプロセス（UI）、拡張ホスト（別プロセス）、Language Server（さらに別プロセス）の3層。拡張がクラッシュしてもエディタ本体は落ちない | 🟢高 | skywork.ai / Microsoft公式 |
| 12 | エディタの進化を「プラットフォーム化」として捉える視点：VSCodeは単なるエディタではなく、拡張APIとMarketplaceを通じた「開発者ツールのプラットフォーム」。App Storeモデルのエディタ版 | 🟡中 | 各種技術分析記事 |

## まとめ・所感

台本で活用すべき重要ポイント：
1. **エディタ50年史のタイムライン** — vi/Emacs → Sublime → Atom → VSCode という「覇権の移り変わり」が面白い
2. **Erich Gammaの系譜** — GoF（設計パターンの教科書）→ Eclipse（Java IDE）→ VSCode。この人は「拡張可能なソフトウェア」を作り続けている
3. **プラットフォーム戦略の勝利** — VSCodeはエディタではなくプラットフォーム。LSPでM+N問題を解決し、Marketplaceでネットワーク効果を発揮
4. **Microsoftのイメージ転換** — 「Linuxはcancer」→「Microsoft ❤️ Linux」→ GitHub買収。この文脈抜きにVSCodeの成功は語れない
