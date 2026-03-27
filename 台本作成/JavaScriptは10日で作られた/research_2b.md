# リサーチチェックポイント：反論・例外・誤解されやすい点

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | `typeof null` は `"object"` を返すバグ。初期実装で値の型タグにnullがオブジェクトと同じ000を使ったことが原因。後方互換性のため修正不可 | 🟢高 | Brendan Eich本人の確認 / GitHub TC39 |
| 2 | `NaN === NaN` は `false` を返す（IEEE 754浮動小数点数仕様に準拠した仕様上の挙動だが、直感に反する） | 🟢高 | IEEE 754仕様 / MDN |
| 3 | `==`（緩い等価）演算子は型強制を行い、`0 == false` が `true`、`"" == 0` が `true` など予測困難な結果になる | 🟢高 | MDN / ECMA-262仕様 |
| 4 | `+` 演算子のオーバーロード: `1 + "2"` は `"12"`（文字列結合）になるが、`"5" - 1` は `4`（数値演算）になる | 🟢高 | MDN / 各種技術解説 |
| 5 | `with` 文はブレンダン・アイク自身が「間違いだった」と認めている。ES5のstrict modeで禁止された | 🟢高 | Brendan Eich発言 / ECMA-262 |
| 6 | ECMAScript 4は約10年の開発期間を経て2008年に破棄。MicrosoftのDouglas Crockford（Yahoo!）らが「大きすぎる変更」「Webを壊す」と反対 | 🟢高 | TC39議事録 / Auth0 "The Real Story Behind ECMAScript 4" |
| 7 | JavaScriptの名前はJavaと無関係。Javaの人気に便乗するマーケティング戦略で命名。これが「JavaとJavaScriptは関係がある」という最大の誤解を生んだ | 🟢高 | Wikipedia / Brendan Eich証言 |
| 8 | Flash/ActionScript: プロプライエタリ、プラグイン必須、セキュリティ脆弱性、Apple iOSでの不対応が致命的で2020年末に完全終了 | 🟢高 | Adobe公式 / Steve Jobs "Thoughts on Flash" |
| 9 | VBScript: IEのみ対応というプロプライエタリ性が致命的。Microsoftも最終的にサポートを廃止 | 🟢高 | Microsoft公式ドキュメント |
| 10 | Google Dart: 他ブラウザベンダーが採用を拒否。WebでのJS置き換えには失敗したがFlutterで復活 | 🟡中 | Google公式ブログ / 開発者コミュニティの議論 |
| 11 | CoffeeScript: ES6で多くの機能（アロー関数、クラス、テンプレートリテラル等）がネイティブJSに吸収され役割を終えた | 🟡中 | 各種技術メディア |
| 12 | 「10日で作ったから欠陥品」は不正確。アイクはScheme/Self/Javaの専門家で、意図的に柔軟で拡張しやすい設計にした | 🟡中 | Brendan Eichインタビュー / The New Stack |
| 13 | ブラウザ戦争でMicrosoftがJScriptとしてリバースエンジニアリング（1996年）。JSとJScriptの互換性問題がWeb開発を混乱させた | 🟢高 | Wikipedia "Browser Wars" / Mozilla歴史 |
| 14 | 「Don't Break the Web」原則: TC39はJSを「追加のみの言語」として進化させる。既存コードを壊す変更は禁止。SmooshGate事件でflattenがflatに改名 | 🟢高 | TC39 / Mozilla公式 |

## まとめ・所感

JavaScriptの「おかしな挙動」は10日で作った急造の結果ではなく、当時の技術的制約と「壊さない」という後の設計哲学の組み合わせで生まれた。typeof nullバグは典型的な「急造のミス」だが、それが30年後の今でも修正できないのは「Don't Break the Web」原則の証拠でもある。ES4の失敗は「良い言語を作ること」と「既存のWebを守ること」の衝突を象徴する重要なエピソード。Flash/VBScript/Dartの敗北は「プロプライエタリ vs オープン」と「ブラウザネイティブの力」を見せる対比材料として有効。
