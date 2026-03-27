# リサーチチェックポイント：背景・深掘り情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 1995年のWeb: HTMLは静的テキストのみ。動的なインタラクションは不可能。ブラウザは「文書ビューア」だった | 🟢高 | Tim Berners-Lee / Web歴史 |
| 2 | Netscape vs Microsoft「ブラウザ戦争」: MicrosoftがIEをWindows OSにバンドルし無料配布。Netscapeの有料モデルを崩壊させた | 🟢高 | Wikipedia "Browser Wars" / Mozilla歴史 |
| 3 | 1996年、NetscapeがJavaScriptをEcma Internationalに標準化提出。1997年6月にECMA-262第1版として採択（ECMAScript） | 🟢高 | Ecma International / Wikipedia |
| 4 | ES3（1999年12月）: try/catch、正規表現を追加。約10年間JavaScriptの基盤となった安定版 | 🟢高 | ECMA-262 / ExploringJS |
| 5 | ES4の破棄（2008年）→ ES5（2009年12月）: strict mode、JSON.parse/stringify、forEach/map/filter/reduce等を追加。「壊さず進化」路線の確立 | 🟢高 | ECMA-262 / TC39議事録 |
| 6 | ES6/ES2015（2015年6月）: let/const、アロー関数、クラス構文、Promise、モジュール等を追加。JavaScript史上最大のアップデート | 🟢高 | ECMA-262 / TC39 |
| 7 | ES2016以降、TC39は年次リリースに移行。小さな増分更新を毎年リリースする方式。Stage 0〜4の提案プロセスを導入 | 🟢高 | TC39公式 |
| 8 | Google Chrome発表（2008年9月）: V8エンジンのJITコンパイルでJavaScript性能が劇的に向上。「ブラウザ速度競争」を引き起こし、他ベンダーもエンジンを刷新 | 🟢高 | Google Chrome Blog / Wikipedia |
| 9 | Node.jsの登場（2009年）で「JavaScript Everywhere」が実現。フロントエンド＋バックエンドを同一言語で開発可能に | 🟢高 | Wikipedia / Ryan DahlのJSConf講演 |
| 10 | npm（2010年1月）: Ryan DahlのNode.jsと同時期に登場。モジュールの共有・再利用を容易にし爆発的なエコシステム成長を促した | 🟢高 | npm公式 / Wikipedia |
| 11 | React（2013年, Facebook）、Angular（2010年, Google）、Vue.js（2014年, Evan You）: JSフレームワークの百花繚乱がWebアプリ開発を一変 | 🟢高 | 各公式サイト |
| 12 | TypeScript（2012年, Microsoft）: JavaScriptに静的型付けを追加。ES4の夢を別の形で実現。JS互換のスーパーセットとして急速に普及 | 🟢高 | Microsoft公式 / TypeScript GitHub |
| 13 | Netscapeの衰退後、オープンソース化（1998年）→ Mozillaプロジェクト → Firefox誕生。JavaScriptの守護者としてMozillaが標準化を推進 | 🟢高 | Mozilla公式 / Wikipedia |
| 14 | 「Webを壊さない」が生存戦略: 1995年に書かれたJSコードが2025年のブラウザでも動く。30年の後方互換性。これは他のどのプログラミング言語にもない特徴 | 🟡中 | TC39メンバー発言 / 開発者コミュニティ |

## まとめ・所感

JavaScriptの歴史は「ブラウザ戦争」「標準化」「V8革命」「Node.js」の4つのターニングポイントで理解できる。特にES4の失敗とES5/ES6での復活は「破壊的刷新 vs 漸進的進化」の哲学の対立として非常にドラマチック。V8エンジンの登場で「遅くて使い物にならない」スクリプト言語から「ネイティブ並みの速度」に一気に変わった転換点も印象的。「10日で作った言語が30年後も後方互換性を保っている」という事実は、台本の最も強力なメッセージになる。
