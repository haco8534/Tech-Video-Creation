# リサーチチェックポイント：基本情報・仕組み・通説

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | VSCodeは2015年4月29日、Microsoft Buildカンファレンスで初公開された。オープンソース版（Code – OSS）は2015年11月18日にリリース | 🟢高 | Wikipedia / Microsoft公式 |
| 2 | 2025年Stack Overflow Developer Surveyで75.9%の開発者がVSCodeを使用。4年連続1位 | 🟢高 | Stack Overflow Developer Survey 2025 |
| 3 | 2024年時点でVSCodeのMAU（月間アクティブユーザー）はVisual Studioと合わせて5000万人に到達（2025年5月Microsoft発表） | 🟢高 | Microsoft公式発表（thurrott.com） |
| 4 | VSCode Extension Marketplaceには約60,000の拡張機能があり、約45,000のパブリッシャーが提供。累計インストール数は33億回 | 🟢高 | koi.ai / daily.dev (2023年統計) |
| 5 | 2023年の1年間でMarketplaceの拡張機能数は25%増加。平均的な開発者は40個の拡張機能をインストール | 🟡中 | koi.ai 集計 |
| 6 | VSCodeの生みの親はErich Gamma。ソフトウェア工学の名著「デザインパターン」（GoF本）の著者の1人であり、EclipseのJava開発ツール（JDT）のリードアーキテクトだった人物 | 🟢高 | Wikipedia / GoTo Conference講演 |
| 7 | Erich Gammaは2011年にMicrosoftに入社し、「Monaco」というWebベースの軽量コードエディタプロジェクトを開始。これがVSCodeの前身 | 🟢高 | The Register / Wikipedia |
| 8 | VSCodeはElectronフレームワーク上で構築されている。ElectronはもともとAtomエディタのために開発された「Atom Shell」が前身 | 🟢高 | Wikipedia |
| 9 | Language Server Protocol（LSP）はVSCodeチームが開発し標準化。「M言語 × Nエディタ = M×N個の実装」問題を「M+N」に削減する設計 | 🟢高 | Microsoft公式ドキュメント / LSP仕様書 |
| 10 | LSPのアーキテクチャ：Language Client（VSCode拡張）とLanguage Server（別プロセス）がJSON-RPC 2.0で通信。サーバーは任意の言語で実装可能 | 🟢高 | Microsoft LSP公式ドキュメント |
| 11 | VSCodeの起動速度はElectronアプリとしては異例に速い。Microsoftのバンドラー最適化・vanilla JSの活用等、極端な高速化施策が行われている | 🟡中 | palette.dev / Hacker News議論 |
| 12 | VSCodeは無料（MIT License for Code-OSS）。JetBrains IDEのUltimate版は年間$599〜の有料サブスクリプション | 🟢高 | Microsoft / JetBrains公式 |
| 13 | 2016年のStack Overflow Surveyでは記述7%だったVSCodeが、2018年には35%で1位に。わずか3年で首位に立った | 🟢高 | Stack Overflow Developer Survey / Wikipedia |
| 14 | VSCodeのRemote Development機能（SSH、コンテナ、WSL対応）とGitHub Codespacesにより、クラウドベースの開発環境として発展 | 🟢高 | Microsoft公式ドキュメント |

## まとめ・所感

VSCodeの成功要因として最も重要なのは以下の3点：
1. **LSPの発明と標準化** — エディタと言語サポートを分離する画期的な設計で、拡張エコシステムの爆発的成長を可能にした
2. **「エディタとIDEの中間」というポジショニング** — Sublimeのような軽快さとIDEのような機能を両立
3. **無料 × オープンソース × クロスプラットフォーム** — 参入障壁をゼロにした

Erich Gammaの経歴（GoF + Eclipse → Monaco → VSCode）は物語として非常に面白い。設計思想の系譜がある。
