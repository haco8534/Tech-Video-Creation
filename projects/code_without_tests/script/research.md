# リサーチ: 「テストを書かないコードはゴミ」ってまじ？

## 1. 元ネタ：Michael Feathers『Working Effectively with Legacy Code』(2004)

- 原文定義: "To me, legacy code is simply code without tests."（テスト＝自動テスト）
- Feathersの主張: コードの**古さ**は関係ない。書いた翌日でもテストがなければレガシー
- 書籍の目的: テストのないコードベースに「後付けでテストを入れる」実践的手法の解説
- **Seam（シーム）**の概念: コードを変更せずにテスト可能にするための「接ぎ目」

## 2. テストがないと何が起きるか（実例・データ）

### バグ修正コストの指数関数的増大
- IBM Systems Sciences Institute研究 + NIST報告:
  - 設計段階での修正コスト = 1x
  - コーディング段階 = 6.5x
  - テスト段階 = 15x
  - 運用段階 = **100x**
- Capersの研究でも同様の傾向が確認

### Knight Capital事件（2012年8月1日）
- 高頻度取引システムの**デプロイ失敗**
- 古いコードが8台中1台のサーバーに残っていた
- **45分間で4億4千万ドル（約550億円）の損失**
- テストと段階的デプロイの欠如が直接原因
- 会社は翌日に事実上破綻

### Therac-25事件（1985-1987年）
- 放射線治療装置のソフトウェアバグ
- レースコンディション（競合状態）が原因で**致死量の放射線を照射**
- 6件の事故、うち3名が死亡
- ソフトウェアテストの不備が直接的な原因
- 安全工学とソフトウェアテストの歴史的転換点

### CrowdStrike事件（2024年7月19日）
- セキュリティソフトのアップデートでブルースクリーン
- **全世界850万台のWindows PCが同時にクラッシュ**
- 航空便4,000便以上が欠航
- 病院、銀行、テレビ局が機能停止
- テンプレートテスト（Content Validator）がバグを見逃した
- 推定損失額: **数十億ドル規模**

## 3. テスト至上主義の反論

### DHH「TDD is Dead. Long Live Testing.」(2014)
- David Heinemeier Hansson（Ruby on Rails作者）
- 批判対象: TDD（テスト駆動開発）の**教条主義**
- 問題: テストのためにコードの設計を歪める「テスト誘発設計ダメージ（test-induced design damage）」
- 過度なモック化 → テストが本番環境の挙動を反映しなくなる
- DHHは「テストそのものを否定していない」→ テストファーストを強制する文化を批判

### Kent Beck・Martin Fowlerとの三者討論「Is TDD Dead?」(2014)
- Beck (TDD提唱者): 「TDDは自分が良いコードを書くための道具。万人に押し付けるものではない」
- Fowler: 「テストの価値はコスト対効果で判断すべき」
- 結論: **テスト手法はコンテキスト依存。教条主義は害**

### カバレッジ100%の罠
- Google社内研究: カバレッジ60-80%で費用対効果が最大化。100%追求は収穫逓減
- Mutation Testing研究: カバレッジ100%でもミューテーションスコアが50%以下のケースあり
  - 「コードを通過するだけ」vs「正しい値を検証する」の違い
- 「Incidental Coverage（偶発的カバレッジ）」問題: テストは通るが何も検証していない

## 4. AI時代のテスト生成

### GitHub Copilotによるテスト自動生成
- 2023年の研究: AI生成テストのカバレッジは高いが、**mutation scoreは低い**
- アサーション（値の検証）がないか不十分な「スモークテスト」を量産しがち
- 「カバレッジ数値は偉い人に喜ばれるが中身はハリボテ」問題

### ミューテーションテスト（突然変異テスト）
- コードに意図的にバグ（変異体）を注入し、テストが検出できるか測定
- 「テストの品質」を客観的に評価する手法
- Stryker (JS), PITest (Java), mutmut (Python) などのツール

## 5. 「何のためにテストを書くか」 — 核心メッセージ

### テストの3つの価値
1. **安全ネット（Safety Net）**: リファクタリング・変更時の回帰検出
2. **生きたドキュメント（Living Documentation）**: 仕様書としてのテスト。実行可能なので絶対に古くならない
3. **設計フィードバック**: テストしにくいコード = 設計が悪い、というシグナル

### 「安全に変更する権利」（The Right to Change Safely）
- Feathersの核心メッセージ
- テストは「動くことの証明」ではなく「変更しても壊れないことの保証」
- ソフトウェアは**変更されるもの**（Software = "soft" + "ware"）
- 変更できないソフトウェアは「ハードウェア」と同じ

### テスティングトロフィー（Kent C. Dodds）
- Testing Pyramid（単体→結合→E2E）の再解釈
- 統合テスト（Integration Tests）を最も厚くすべき、という提案
- 「ユーザーの使い方に近いテスト」が最もコスパが良い

## 6. 参考文献・ソース
- Feathers, M. (2004). *Working Effectively with Legacy Code*. Prentice Hall.
- NIST (2002). "Planning Report 02-3: The Economic Impacts of Inadequate Infrastructure for Software Testing"
- SEC Report on Knight Capital (2013)
- DHH (2014). "TDD is Dead. Long Live Testing." (blog post)
- Beck, K., Fowler, M., DHH (2014). "Is TDD Dead?" (video series)
- Ivankovic et al. (2019). "Code Coverage at Google" (ESEC/FSE)
- Nancy Leveson (1995). "Medical Devices: The Therac-25" (IEEE supplement)
- CrowdStrike Incident Report (2024)
