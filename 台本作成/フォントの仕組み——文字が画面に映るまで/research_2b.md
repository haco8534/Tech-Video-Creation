# リサーチチェックポイント：反論・例外・誤解されやすい点

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 「フォントファイルは文字画像の集合体」は広く持たれている誤解。実際には数学的座標データ（ベジェ曲線の制御点）の集合 | 🟢高 | Wikipedia, medium.com (How Fonts Work) |
| 2 | 「TrueTypeとOpenTypeは単なるバージョン違い」は誤解。OpenTypeはTrueType輪郭もPostScript(CFF)輪郭も格納できる「ラッパー」フォーマット | 🟢高 | Microsoft OpenType spec, Adobe Typekit blog |
| 3 | Windows/macOS/LinuxでフォントレンダリングのHTH哲学が根本的に異なる。Windows(DirectWrite)はピクセルグリッドへの整列を優先（シャープ）、macOS(Core Text)は原型忠実を優先（滑らか・やや太め）、Linux(FreeType)は設定次第で両方可能 | 🟢高 | uxdesign.cc, Smashing Magazine, FreeType docs |
| 4 | ClearType（サブピクセルレンダリング）はRGBサブピクセルの配列に依存するため、ディスプレイを縦にすると逆効果になる。OLEDの不規則なサブピクセル配列でも問題が起きる | 🟢高 | Microsoft docs, Wikipedia |
| 5 | macOSはRetina以降サブピクセルレンダリングを廃止（2018年、macOS Mojave）。高解像度では不要と判断。だが非Retinaディスプレイでは文字がかすれて見える副作用 | 🟢高 | Apple Support, Ars Technica |
| 6 | ヒンティングは「フォントの形を意図的にゆがめる」技術。元のデザインの忠実さを犠牲にして可読性を優先する妥協 | 🟢高 | truetype-typography.com, Glyphs docs |
| 7 | 高DPIディスプレイでもアンチエイリアスは完全に不要にはならない。非常に小さいテキストやセリフの細部では依然として効果がある | 🟡中 | StackOverflow, Hacker News discussions |
| 8 | TrueTypeのヒンティングVM（仮想マシン）はチューリング完全で、理論的にはプログラムを実行できるレベルの複雑さ。セキュリティリスクにもなりうる（実際に脆弱性が過去に発見されている） | 🟢高 | Microsoft Security Advisory, Google Project Zero |
| 9 | カーニングを行わないとWAやToのような文字ペアの間隔が不自然に広く見える。これは人間の視覚認知の特性（物理的な等間隔≠視覚的な等間隔）に起因 | 🟢高 | fontfabric.com, Adobe Typography |
| 10 | フォントのリガチャは装飾目的だけでなく、プログラミングフォント（Fira Code等）では「!=」→「≠」のように機能的にも使われている | 🟡中 | GitHub (FiraCode), programming font communities |

## まとめ・所感

- OS間のレンダリング差は「シャープさ vs 忠実さ」というトレードオフで説明できる。図解向き
- サブピクセルレンダリングの限界（OLED、縦画面）は意外性がある
- ヒンティングがチューリング完全VMという事実は「フォントの中にプログラムが入っている」ネタとして面白い
- macOSのサブピクセル廃止は「高解像度時代にレンダリング技術がどう変わるか」の好例
