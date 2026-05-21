# Research 1b: 反論・例外・通説への異議

## 概要

「充電ケーブルはすぐ壊れる」というテーマに対して、世間で語られる通説（Apple陰謀論・安物論・USB-C万能論・ユーザー無責任論）の多くは、エンジニアリング上のトレードオフや物理的制約を無視していることが分かった。以下、通説と一次情報のズレを11件整理する。

---

## 反論テーブル

| # | 通説 | 反証・異議 | 信頼度 | 出典 | 備考 |
|---|------|-----------|--------|------|------|
| 1 | 「Appleはわざと壊れやすく作っている（計画的陳腐化）」 | Appleは2021年に"Cable with Variable Stiffness"特許を出願し、断線しにくいケーブルを研究している。意図的に壊したい企業が耐久改良特許を出すのは矛盾。Hackaday解説者も「毎回再設計するより一度設計して売り続けた方が利益が大きい。計画的陳腐化は工学的に非合理」と主張。 | 高 | [Apple patent application (Engadget)](https://www.engadget.com/apple-patent-application-frayed-cables-154641511.html), [Hackaday - Planned Obsolescence Isn't A Thing](https://hackaday.com/2018/09/24/planned-obsolescence-isnt-a-thing-but-its-your-fault/) | 脆弱性は「意図」ではなく「薄型・軽量・安価の同時達成」というトレードオフの結果 |
| 2 | 「安物ケーブルだから壊れる」 | 断線の主原因は"ストレインリリーフ（歪み緩和構造）での応力集中"という物理現象であり、高価なMFi認証Apple純正ケーブルでも同じプラグ根本で破断する。Appleは2013年以降、純正Lightningケーブル被覆不良で集団訴訟を起こされ、2013年にはMacBook ACアダプタ断線訴訟で最大$79の返金和解。純正でも構造的に避けられない。 | 高 | [Class Action - Apple Lightning](https://topclassactions.com/lawsuit-settlements/lawsuit-news/class-action-lawsuit-says-apple-lightning-connector-is-defective/), [Apple MagSafe settlement (Macworld)](https://www.macworld.com/article/215161/apple_settles_magsafe_lawsuit_offers_replacements.html) | 価格と壊れる場所は独立。価格で変わるのは「到達する破断サイクル数」だけ |
| 3 | 「USB-Cなら頑丈」 | USB-Cも端子ピンの折損・曲がりが頻発。Dell公式KBが「USB-Cケーブルのピン損傷で充電・映像不可」を公式に問題認定。USB-IF仕様上の抜き差し寿命は10,000回だが、これは「コネクタの摩耗」の話で、ケーブル根本の屈曲疲労は別問題。USB-Cも同じ箇所（プラグ根元）で断線する。 | 高 | [Dell USB-C Cable Damage KB](https://www.dell.com/support/kbdoc/en-us/000216384/damaged-usb-type-c-cable-causes-laptops-to-not-charge-and-no-video-with-monitors), [USB Type-C Spec R2.0 (USB-IF)](https://www.usb.org/sites/default/files/USB%20Type-C%20Spec%20R2.0%20-%20August%202019.pdf) | 「USB-C=寿命10,000回」は端子の話で、ケーブル本体の疲労寿命とは別軸 |
| 4 | 「ユーザーの使い方が悪いから壊れる（自己責任論）」 | 実験データでは90°屈曲は線形引張の8〜10倍のダメージを銅線に与える。プラグ部が剛体である以上、どう優しく扱っても根元には応力集中が起きる。つまり「構造上避けられない破壊」が相当割合を占め、100%ユーザー責任ではない。 | 中〜高 | [bwoohk - Why charging cables break](https://www.bwoohk.com/blog/why-is-my-charging-cable-breaking-so-easily.html), [Gore - Cable Stress in High-Flex Apps](https://www.gore.com/resources/tech-note-understanding-cable-stress-and-failure-high-flex-applications) | 構造要因とユーザー要因は"掛け算"。完全に構造だけ/ユーザーだけのどちらでもない |
| 5 | 「銅は金属だから疲労しないはず」 | 銅線は屈曲サイクルで加工硬化→脆化→破断する（低サイクル疲労）。Gore技術ノートによれば、屈曲ごとに銅内部で転位が蓄積し硬くなり、やがて微小クラックが成長して破断。屈曲半径を小さくするほど指数関数的に寿命が縮む。"金属は疲労しない"は一般語の誤解で、学術的には明確に"金属疲労(metal fatigue)"という現象が定義されている。 | 高 | [Gore Tech Note](https://www.gore.com/resources/tech-note-understanding-cable-stress-and-failure-high-flex-applications), [OSTI - Fatigue Behavior of Thin Cu Foils](https://www.osti.gov/servlets/purl/1142814) | 学術語(fatigue)と一般語(疲れ)の意味ズレ。金属は確かに疲労する |
| 6 | 「Magsafeに戻せば解決するのに、Appleは意地でやらない」 | EU共通充電器指令（2022/2380）により、EU内で販売するスマホは2024年末以降USB-C必須。AppleはiPhone 15でUSB-Cを採用したがEU法の制約でMac型MagSafe物理端子には戻せない。代わりにQi2互換のワイヤレスMagSafe（磁石＋Qi）に注力中。「やらない」のではなく「やれない」。 | 高 | [AppleInsider - No iPhone 18 Mac-like MagSafe](https://appleinsider.com/articles/26/02/19/no-iphone-18-wont-have-mac-like-magsafe-charging), [MagSafe Wikipedia](https://en.wikipedia.org/wiki/MagSafe_(wireless_charger)) | 因果は「企業の怠慢」ではなく「歴史的規制の偶然」 |
| 7 | 「編組ナイロンケーブルが普及すれば問題解決するのに」 | 実際には編組ケーブルはPVCの2〜3倍の屈曲回数（15,000サイクル vs 5,000）をクリアするが、(a) 製造コスト2〜3倍、(b) ねじれが残りやすい、(c) 通電スペックには関係ない＝Appleが箱に入れるインセンティブが弱い。"普及しきらない"のは技術不足ではなく経済トレードオフ。 | 中〜高 | [IETCHARGER - PVC vs TPE vs Braid](https://www.ietcharger.com/what-kind-of-data-cable-material-is-the-most-durable-pvc-tpe-or-braid/), [Life Cables - Braided vs TPE](https://lifecables.com/braided-nylon-vs-tpe-durability/) | iPhone 15/Macbook純正は実は編組になっている（静かな改良） |
| 8 | 「分解修理できないのはApple/メーカーの嫌がらせ」 | 充電ポートを分解できない最大の理由はIP68防水シール。開封すると接着シールが破れ、再シールしないと防水性能が失われる。小型化（薄くする）と防水性と修理性は互いに矛盾する三項対立（トリレンマ）。「修理不可能性」は意地悪ではなく物理制約の副産物。 | 高 | [Apple Support - Splash resistance](https://support.apple.com/en-us/108039), [Apple Community - After repair still waterproof?](https://discussions.apple.com/thread/254693922) | 防水・小型・修理性は同時に最適化できない |
| 9 | 「家電のACコードは何十年も壊れないのに、充電ケーブルが壊れるのはおかしい」 | 家電コードは(a) 導体が太い（14〜16AWGなど、充電ケーブルの28-30AWGの数倍）、(b) 壁コンセントに固定され屈曲回数が極端に少ない、(c) 抜き差し頻度が低い。一方スマホケーブルは1日2〜5回抜き差し＋使用中屈曲で、年間2,000〜5,000屈曲サイクルに到達する。使用プロファイルが根本的に違うので比較にならない。 | 高 | [Anker - Why cables fail](https://www.anker.com/blogs/chargers/why-some-charging-cables-fail-early-and-how-to-pick-a-durable-one), [ecoflow - Charging cable speed factors](https://www.ecoflow.com/us/blog/charging-cable-speed-factors) | 同じ"電線技術"でも"用途プロファイル"が違えば寿命は桁違いに変わる |
| 10 | 「ケーブルプロテクター（バネやテープ）巻けば永久に壊れない」 | プロテクターは応力集中点を"数mm外側にずらす"だけで、根本解決にはならない。プロテクター端が新たな応力集中点になる現象が知られる。Appleの可変剛性ケーブル特許が示すように、理想は「段階的に硬さを変える」連続構造で、後付けの硬質ブーツは二次的応力集中を生む可能性がある。 | 中 | [Fictiv - Cable Strain-Relief Design Tips](https://www.fictiv.com/articles/strain-relief-design-tips-for-durability-and-aesthetic-appeal), [Apple patent (AppleInsider)](https://appleinsider.com/articles/21/02/04/apple-may-have-a-solution-for-fraying-lightning-cables) | "応力集中点は移動できるが消せない"。ライフハックは延命止まり |
| 11 | 「Genius Bar で無料交換してくれるから実質タダ」 | Apple公式ポリシー上、フライング（被覆剥がれ）は"誤使用"扱いが原則で保証対象外。ただし"安全上の危険性あり"と判断された場合のみ裁量で交換可。店員依存で再現性がなく、"タダ"と言える確率は低い。通説は都市伝説レベル。 | 中 | [Apple Community - fraying cables](https://discussions.apple.com/thread/7881192), [iDownloadBlog - Free frayed cable replacement](https://www.idownloadblog.com/2014/07/25/how-to-get-your-frayed-lightning-cable-replaced-for-free/) | "裁量で替えてくれることもある"≠"必ず無料"。公式の保証ではない |

---

## 重要な構造的知見

### A. 通説の多くは"目に見えない因果"を"分かりやすい悪者"に置き換えている
- 「Appleが悪い」「中国製が悪い」と言いやすいが、実態は**物性・規制・トレードオフの多変数最適化**。
- "悪意"は説明として甘美だが、**物理法則と市場制約**のほうがよほど強い説明力を持つ。

### B. 「壊れる場所」は物理法則で決まり、価格で変わるのはサイクル数だけ
- プラグ根本に応力集中するのは**片持ち梁の曲げモーメント**がそこで最大になるため。
- 高価なケーブルは"破断までの回数"を2〜6倍に延ばせるが、"壊れる場所"を変えることはできない。

### C. USB-C普及で問題は半分しか解決しない
- USB-IF 10,000サイクルは**コネクタの抜き差し**についての規格。
- ケーブル本体の屈曲疲労は**別の物理問題**で、USB-Cでも同じく起こる。
- EU共通充電器指令（2022/2380）は"互換性"問題は解決したが"耐久性"は向上させない。

### D. "計画的陳腐化"は陰謀論的説明より、"経済的インセンティブの弱さ"で十分説明できる
- Appleが壊れにくいケーブルを標準で入れないのは、(a) 薄さ・軽さ優先の市場ニーズ、(b) 同梱コスト最小化、(c) 保証交換率が許容範囲、といった合理的判断の複合。
- つまり「陰謀」ではなく「**最適化対象に耐久性が入っていない**」だけ。

---

## カウンター反論の中でも特に動画で使えるファクト Top 3

1. **「高価なケーブルでも同じ場所で折れる」**（通説を1発で壊せる直感反証）
2. **「USB-Cの10,000サイクルはコネクタ寿命で、ケーブル疲労とは別の話」**（言語仕様とエコシステムの混同）
3. **「MagSafeに戻せないのはEU法のせい」**（因果が歴史的偶然だった例）

---

## 信頼度の凡例
- **高**: 公式仕様書・一次特許・大手メーカー公式KB・学術論文・集団訴訟公的記録
- **中〜高**: 業界メーカーの技術ノート・複数メディア一致情報
- **中**: 解説記事・フォーラム合意・個別ユーザー報告
