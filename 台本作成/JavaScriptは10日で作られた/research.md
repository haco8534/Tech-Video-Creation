# リサーチ結果：JavaScriptは10日で作られた

- 作成日: 2026-03-16
- テーマ: JavaScriptは10日で作られた
- リサーチ方針: 主流情報・反論・背景の3方向並列リサーチ

---

## 🟢 信頼度「高」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | JavaScriptは1995年5月にNetscapeのブレンダン・アイクによって10日間で開発された | Wikipedia / Brendan Eich証言 | ⭐⭐⭐ |
| 2 | アイクは本来Schemeをブラウザに実装するために採用された。「doing Scheme in the browser」でNetscapeに入社 | Brendan Eich本人ブログ / The New Stack | ⭐⭐⭐ |
| 3 | Netscape経営陣から「Javaに見た目を似せろ」と指示。Java構文 + Schemeの第一級関数 + Selfのプロトタイプ継承という3言語のハイブリッドが生まれた | Wikipedia / ACM Computer History | ⭐⭐⭐ |
| 4 | 言語名は Mocha → LiveScript → JavaScript と変遷。「JavaScript」はSun Microsystemsとの提携によるマーケティング戦略名 | Wikipedia / Auth0 | ⭐⭐⭐ |
| 5 | W3Techs: JavaScriptはクライアントサイドで全Webサイトの98.9%で使用（2025年末時点） | W3Techs統計 | ⭐⭐⭐ |
| 6 | Stack Overflow Developer Survey 2024: 62.3%の開発者が使用。2011年の調査開始以来13年連続1位 | Stack Overflow | ⭐⭐⭐ |
| 7 | npm: 世界最大のソフトウェアレジストリ。130万以上のパッケージ、月間750億ダウンロード | npm / It's FOSS | ⭐⭐⭐ |
| 8 | `typeof null === "object"`: 初期実装でnullとオブジェクトが同じ型タグ(000)を共有したバグ。後方互換性のため未修正 | TC39 / Brendan Eich | ⭐⭐⭐ |
| 9 | 「Don't Break the Web」原則: TC39はJSを追加のみで進化させる。既存コードを壊す変更は禁止 | TC39 / Mozilla | ⭐⭐⭐ |
| 10 | MicrosoftがJScriptとしてリバースエンジニアリング（1996年）→「Best viewed in IE/Netscape」時代の到来 | Wikipedia "Browser Wars" | ⭐⭐ |
| 11 | 1996年、NetscapeがJSをEcma Internationalに提出。1997年6月にECMAScript第1版として標準化 | Ecma International / Wikipedia | ⭐⭐ |
| 12 | ES4は約10年間の開発後、2008年に破棄。「大きすぎる変更はWebを壊す」とMicrosoft・Crockfordが反対 | TC39議事録 / Auth0 | ⭐⭐⭐ |
| 13 | ES5（2009年）: strict mode、JSON.parse等を追加。「壊さず進化」路線の確立 | ECMA-262 | ⭐⭐ |
| 14 | ES6/ES2015（2015年6月）: let/const、アロー関数、クラス、Promise、モジュール。JS史上最大のアップデート | ECMA-262 / TC39 | ⭐⭐ |
| 15 | Google Chrome V8エンジン（2008年）: JITコンパイルでJS速度が劇的向上。Firefox 3.0の2倍、IE 7の50倍高速 | Stack Overflow V8ベンチマーク | ⭐⭐⭐ |
| 16 | Node.js（2009年）: V8エンジンをサーバーサイドに。「JavaScript Everywhere」を実現 | Wikipedia / Ryan DahlのJSConf講演 | ⭐⭐⭐ |
| 17 | Flash: プロプライエタリ、プラグイン必須、脆弱性多発、Apple iOSで拒否され2020年末に完全終了 | Adobe公式 / Steve Jobs | ⭐⭐ |
| 18 | VBScript: IE限定。オープン標準に反するため淘汰 | Microsoft公式 | ⭐⭐ |
| 19 | Google Dart: 他ブラウザが採用拒否。JS置き換えには失敗（Flutterで復活） | Google公式 | ⭐⭐ |
| 20 | 1995年に書かれたJSコードが2025年のブラウザでも動く。30年の後方互換性 | TC39 / 開発者コミュニティ | ⭐⭐⭐ |
| 21 | `==`（緩い等価）の型強制: `0 == false` → true、`"" == 0` → true。予測困難な挙動 | ECMA-262 / MDN | ⭐⭐ |
| 22 | `+` 演算子: `1 + "2"` = `"12"` だが `"5" - 1` = `4`。演算子ごとに型変換ルールが異なる | MDN | ⭐⭐ |
| 23 | SmooshGate事件: Array.prototype.flattenをflatに改名。古いライブラリとの衝突を避けるための「Don't Break the Web」の実例 | TC39 / Huli Blog | ⭐⭐ |

## 🟡 信頼度「中」のキーファクト

| # | ファクト | 出典 | 台本での優先度 |
|---|---------|------|--------------|
| 1 | アイクは意図的にJSを「柔軟で拡張しやすい」設計にした。急造のミスと意図的設計の区別が重要 | Brendan Eichインタビュー | ⭐⭐ |
| 2 | JSの「おかしな挙動」のコレクションは開発者コミュニティのミーム・ネタとして広く共有されている（WAT talk等） | Gary Bernhardtの"WAT" talk | ⭐⭐ |
| 3 | TypeScript（2012年、Microsoft）: JSに静的型付けを追加。ES4の夢を「別の形」で実現 | Microsoft公式 | ⭐⭐ |
| 4 | CoffeeScript: ES6の登場で多くの機能がネイティブJSに吸収され役割を終えた | 技術メディア各種 | ⭐ |

## 🔴 信頼度「低」（台本使用不可）

| # | ファクト | 理由 |
|---|---------|------|
| 1 | 「アイクはJavaScriptを嫌っている」 | 文脈を無視した切り取り。実際は特定の設計決定への後悔を述べたもの |
| 2 | 「JavaScriptは実際には10日以上かかった」 | 信頼性のある反証なし。アイク本人が繰り返し10日間と証言 |

## 📌 台本構成への提言

### コアストーリーライン（推奨）

1. **フック**: 「世界で最も使われている言語が10日で作られた」→ 「それ大丈夫なの？」という疑問
2. **直感構築**: 10日急造のエピソード＋バグ・おかしな挙動のコレクション → 「やっぱり欠陥品じゃん」
3. **直感破壊**: でも待って。98.9%のWebサイトが使い、13年連続開発者使用率1位。「欠陥品なのに天下を取れた」矛盾
4. **再構築**: 10日で作れた理由（アイクの専門性・3言語のハイブリッド）＋「壊さず進化する」設計哲学
5. **パターン統合**: Flash・VBScript・Dartの敗北と、JSの「Don't Break the Web」を対比 → 「技術の勝敗は品質ではなくタイミング×互換性×エコシステム」
6. **まとめ**: 1995年に書いたコードが今でも動く。30年の後方互換性。「完璧じゃないのに壊れない」設計思想の価値

### 特に効果的なファクトの使い方

- **数値インパクト**: 98.9%、13年連続1位、130万パッケージ、V8でIE 7の50倍高速
- **アナロジー候補**: 「壊れないリフォーム」（古い家を壊さずに部屋を増築し続ける）＝ Don't Break the Web
- **思考実験**: 「もしブレンダン・アイクに10日でなく半年あったら、JavaScriptはもっと良い言語になっていたのか？」→ ES4の例が示す「良い言語を目指しすぎた結果の破棄」
- **直感破壊の核**: 「良い言語が勝つのではなく、壊れない言語が生き残る」
