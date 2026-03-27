# リサーチ結果：どうしてみんなVSCodeを使ってるの？

- 作成日: 2026-03-12
- テーマ: VSCodeの独占的人気の理由を技術的・戦略的に解説
- リサーチ方針: 主流情報・反論・背景の3方向並列リサーチ

---

## 🟢 信頼度「高」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | 2025年Stack Overflow Developer Surveyで75.9%の開発者がVSCode使用。4年連続1位 | Stack Overflow 2025 | ⭐⭐⭐ |
| 2 | VSCodeは2015年4月29日にMicrosoft Buildで初公開。2015年11月にオープンソース化。2018年にStack Overflow調査で1位（35%） | Wikipedia / SO Survey | ⭐⭐⭐ |
| 3 | 生みの親Erich Gammaは「Gang of Four」デザインパターン本の共著者であり、Eclipse JDTのリードアーキテクト。2011年MS入社、「Monaco」プロジェクトを開始 | The Register / GoTo講演 | ⭐⭐⭐ |
| 4 | Language Server Protocol（LSP）はVSCodeチームが開発。M言語×Nエディタ=M×N実装の問題をM+Nに削減。JSON-RPCで通信、言語サーバーは別プロセスで動作 | Microsoft公式 | ⭐⭐⭐ |
| 5 | Extension Marketplaceに約60,000の拡張機能。累計33億インストール。平均的開発者は40個の拡張機能を使用 | koi.ai / daily.dev | ⭐⭐⭐ |
| 6 | Atom（GitHub製, 2014年〜）は2022年12月に開発終了。同じElectronベースだがパフォーマンスで敗北。MSのGitHub買収（2018年, 75億ドル）後に淘汰 | GitHub公式 / ghacks | ⭐⭐⭐ |
| 7 | ElectronフレームワークはもともとAtomのために開発された「Atom Shell」が起源。VSCodeはAtomの技術基盤を使ってAtomを倒した | Wikipedia | ⭐⭐⭐ |
| 8 | VSCodeは無料。JetBrains Ultimate版は年間$599〜の有料サブスクリプション | 各社公式サイト | ⭐⭐ |
| 9 | 2015年のStack Overflow Survey：Sublime Textが25.2%で2位。VSCodeは存在すらしていなかった | Stack Overflow 2015 | ⭐⭐⭐ |
| 10 | Sublime Textは2013年後半〜2017年に大きなアップデートが停滞。この空白期間がVSCodeに門戸を開いた | Hacker News議論 | ⭐⭐ |
| 11 | VSCodeの公式バイナリはMITライセンスではなく「Microsoft Software License」。テレメトリがデフォルト有効。これに反発しVSCodiumプロジェクトが誕生 | vscodium.com / ADT Mag | ⭐⭐ |
| 12 | サティア・ナデラCEO就任（2014年）で「Microsoft loves Linux」路線へ転換。前任CEO Steve Ballmerは「Linuxはcancer」と発言していた | businessinsider / datacenterknowledge | ⭐⭐⭐ |
| 13 | VSCodeのマルチプロセスアーキテクチャ：メインプロセス（UI）、拡張ホスト（別プロセス）、Language Server（さらに別プロセス）の3層分離。拡張がクラッシュしてもエディタ本体は落ちない | skywork.ai / MS公式 | ⭐⭐ |
| 14 | Remote Development（2019年〜）でSSH/コンテナ/WSL経由のリモート開発。GitHub Codespaces（2020年〜）でブラウザからクラウド開発環境にアクセス | Microsoft公式ドキュメント | ⭐⭐ |
| 15 | テキストエディタの歴史：TECO(1962)→ed(1969)→vi(1976)→Emacs(1976)→Vim(1991)→Sublime(2008)→Atom(2014)→VSCode(2015) | Wikipedia各記事 | ⭐⭐ |
| 16 | 2025年5月、VS+VSCode合計で月間アクティブユーザー5000万人到達 | Microsoft公式発表 | ⭐⭐ |

## 🟡 信頼度「中」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | VSCodeのElectronアプリとしてのパフォーマンス最適化は「極端な外れ値（extreme outlier）」と評される。バンドラー最適化、vanilla JS活用 | palette.dev / Hacker News | ⭐⭐ |
| 2 | 新興エディタZed（Atom元開発者がRustで開発）やLapce（Rust製）がVSCode対抗馬として登場 | xda-developers | ⭐ |
| 3 | Atomの「すべてが拡張機能」モデル vs VSCodeの「標準機能+オプション拡張」モデル。80/20の設計哲学の差 | HN / dev.to | ⭐⭐ |
| 4 | VSCodeは単なるエディタではなく「開発者ツールのプラットフォーム」。App Storeモデルのエディタ版 | 各種技術分析 | ⭐⭐ |

## 🔴 信頼度「低」（台本使用不可）

| # | ファクト | 理由 |
|---|---------|------|
| なし | | リサーチで信頼度低の情報は使用しない方針 |

## 📌 台本構成への提言

### 物語の軸：「エディタ50年戦争の最終章」

1. **導入（Block 1-2）**: 「76%の開発者が使うエディタ」の衝撃的な数字から入り、「でもたった10年前は存在すらしなかった」で驚きを作る。そして「エディタとIDEって何が違うの？」という根本的な問いで前提を構築

2. **本論前半（Block 3）**: 「エディタ対IDE」の歴史を辿りながら、Sublime Textの黄金時代とAtomの挑戦を描く。ここでElectronの誕生と「Webテクノロジーでデスクトップアプリを作る」という思想を紹介

3. **本論中盤（Block 4）** ← 直感の破壊ポイント: LSPの解説。「各言語×各エディタ=膨大な組み合わせ」問題を思考実験で体感させ、LSPが「1つのプロトコルで全部つなぐ」という解決策を見せる。これが「なぜVSCodeだけが勝ったのか」の核心

4. **本論後半（Block 5）**: Microsoftの「信頼回復」ストーリー。「Linuxはcancer」から「Microsoft ❤️ Linux」へ。VSCodeが受け入れられた背景にはナデラのオープンソース路線転換があった。Atom vs VSCodeの皮肉（自分が生んだ技術に倒された）

5. **まとめ（Block 6）**: VSCodeは「エディタ」ではなく「プラットフォーム」だった。冒頭の「なぜみんな使ってるの？」に対する答えは「エディタとIDEの境界を再定義し、LSPでエコシステムを作り、オープンソースでコミュニティを味方につけた」
