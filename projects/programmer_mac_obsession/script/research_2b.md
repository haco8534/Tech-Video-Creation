# Research 2b: 対立軸・比較・誤解されやすい点

## ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | TECH Street調査2021: 日本のITエンジニアに「自分で選べるなら？」と聞くとWindows 90.1%、Mac 9.9%。日本の企業IT環境はWindows圧倒的 | 🟢高 | TECH Street / ITmedia報道 |
| 2 | WSL2（Windows Subsystem for Linux 2）は完全なLinuxカーネルをWindows上で実行可能。2024年にはWSL設定専用アプリ、Winget連携強化 | 🟢高 | Microsoft公式 / Windows Central |
| 3 | 高性能WindowsデスクトップPC + WSL2は特定のWeb開発タスク・Dockerビルドでは M3 Maxを凌駕するベンチマーク結果もある | 🟡中 | DHH (hey.com) / 各種ベンチマーク |
| 4 | Macの最大の批判: ハードウェアロックイン。macOSはApple製品でしか動作せず、同スペックWindowsマシンの2〜3倍の価格帯 | 🟢高 | 各種価格比較 |
| 5 | Macはハードウェアのカスタマイズ性が低い。RAM/ストレージは購入時に決定、後からのアップグレードは基本不可 | 🟢高 | Apple公式仕様 |
| 6 | Linuxはカスタマイズ自由度最高・完全無料・サーバーとほぼ同一環境。だが商用ソフト（Adobe Suite等）の非対応が弱点 | 🟢高 | 各Linux配布元 / Adobe公式 |
| 7 | .NET/C#/ASP.NET等のMicrosoft技術スタックはWindowsの方が親和性が高い。Visual Studioのフル版もWindows専用（VS for Macは2024年廃止） | 🟢高 | Microsoft公式 |
| 8 | ゲーム開発者にはWindows + DirectXの組み合わせが事実上の標準。Macのゲーム対応は限定的 | 🟢高 | Steam / Unity / Unreal統計 |
| 9 | M1以降のApple SiliconはARMベース。x86前提のレガシーソフトウェアはRosetta 2による変換が必要で一部非互換 | 🟢高 | Apple公式 / 開発者報告 |
| 10 | 「Macが速い」は条件付き。M2 AirとM1 Airの小規模プロジェクトでのビルド時間はほぼ同じ。大規模プロジェクトではPro/Max系チップが必要 | 🟢高 | Ackee.agency ベンチマーク |
| 11 | macOSはクローズドソース。Linuxと違い、OS内部の挙動をユーザーが検査・改変できない | 🟡中 | 各種開発者コミュニティ |
| 12 | WindowsのUpdatesがWSLやDocker環境を壊すという報告が一部開発者から出ている | 🟡中 | Hacker News / Reddit |

## まとめ
Macが万能ではない点は明確。価格・カスタマイズ性・ゲーム開発・Microsoft技術スタック・ARM移行の互換性問題が主要な批判。一方WindowsもWSL2の登場でUnix環境の差は縮まっているが「2つのOS感」が残る。Linuxは技術的最強候補だが商用ソフト対応が壁。「最適なOS」は開発対象によって変わるという結論が妥当。
