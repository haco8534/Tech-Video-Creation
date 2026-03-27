# リサーチチェックポイント：主流・基本情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | JavaScriptは1995年5月にNetscapeのブレンダン・アイクによって10日間で開発された | 🟢高 | Wikipedia / Brendan Eich本人の証言 |
| 2 | 言語名は「Mocha」→「LiveScript」→「JavaScript」と変遷。JavaScriptへの改名はSun Microsystemsとのマーケティング提携による | 🟢高 | Wikipedia / Auth0 "A Brief History of JavaScript" |
| 3 | アイクは本来Scheme言語をブラウザに実装するために採用された。「doing Scheme in the browser」という約束でNetscapeに入社 | 🟢高 | Brendan Eich本人のブログ / The New Stack インタビュー |
| 4 | JavaScriptはJavaの構文 + Schemeの第一級関数 + Selfのプロトタイプベース継承を組み合わせた設計 | 🟢高 | Wikipedia / Brendan Eich ACM論文 |
| 5 | Netscape経営陣から「Javaに見た目を似せろ」という指示があり、アイクの本来の設計意図（関数型言語）と妥協が生まれた | 🟢高 | Brendan Eich本人のブログ / The New Stack |
| 6 | Stack Overflow Developer Survey 2024: JavaScriptは62.3%の開発者が使用する最も人気のある言語（2011年の調査開始以来13年連続1位） | 🟢高 | Stack Overflow Developer Survey 2024 |
| 7 | W3Techs統計: JavaScriptはクライアントサイド言語として全Webサイトの98.9%で使用されている（2025年末時点） | 🟢高 | W3Techs 2025 |
| 8 | npmは世界最大のソフトウェアレジストリで、130万以上のパッケージを保有、月間750億ダウンロード | 🟢高 | npm / It's FOSS |
| 9 | 2009年にRyan DahlがNode.jsを開発。Google ChromeのV8エンジンを使ってサーバーサイドでJavaScriptを実行可能にした | 🟢高 | Wikipedia / Node.js公式 |
| 10 | V8エンジンはJIT（Just-In-Time）コンパイルでJavaScriptをネイティブ機械語に直接コンパイル。2008年のリリース時、Firefox 3.0の約2倍、IE 7の約50倍高速だった | 🟢高 | Stack Overflow V8ベンチマーク比較 2008 / Wikipedia |
| 11 | Netscape Navigator 2.0（1995年12月）がJavaScriptを初実装したブラウザ | 🟢高 | Wikipedia |
| 12 | JavaScriptは「Javaの弟分」としてマーケティングされた。初心者・デザイナー向けの「サイドキック言語」というポジション | 🟡中 | Auth0 / 各種技術メディア |

## まとめ・所感

JavaScriptの誕生はNetscape社の戦略的判断と、ブレンダン・アイクの卓越した技術力の交差点で起きた。「10日で作った」は事実だが、アイクがScheme・Self・Javaの設計思想を熟知したベテランだったからこそ可能だった。台本では「急造の欠陥品」という先入観を最初に構築し、後でそれを覆す展開に使える。また、npm 130万パッケージ・全Web98.9%という数字はインパクトが強い。
