# リサーチ：「フルスタック」は本当に存在するのか？

## 1. 「フルスタックエンジニア」という用語の起源と変遷

### 起源（2008〜2010年）

- **2008年頃**: Webサイト・アプリケーション開発が急成長し、「フルスタック」という概念が生まれ始めた
- **2010年11月**: Facebookのエンジニア **Carlos Bueno** がブログ記事「The Full Stack」を公開。これが「フルスタックプログラマー」という概念を広めた最初期の重要文献
  - Buenoの定義: 「フルスタックプログラマーとは**ジェネラリスト**であり、一人で非自明なアプリケーションを作れる人」
  - 技術の幅広さそのものよりも、**システムの各レイヤーがどう相互作用するかを視覚化できる能力**を重視
  - 特にパフォーマンス最適化において、スタック全体の理解が重要だと主張
  - 出典: https://carlos.bueno.org/2010/11/full-stack.html
- **2010年**: LinkedInのエンジニアリングブログが「理想のエンジニアはバックエンドもフロントエンドもどこでも必要な場所で働ける人」と記述
- **2010年**: Googleで「full-stack developer」の検索が初めて記録された

### 当時の「フルスタック」の意味

2000年代後半〜2010年代初頭の「フルスタック」は以下の技術を意味していた：

- HTML / CSS / JavaScript
- PHP（またはPerl、Python）
- MySQL
- Linux基本操作
- Apache設定

**→ 数年で十分に習得可能な範囲だった**

### 現在（2025年）の「フルスタック」に求められる技術

今日の「スタック」は当時の**保守的に見積もっても100倍の高さ**になっている：

| レイヤー | 主要技術例 |
|---------|----------|
| フロントエンド | React / Vue / Angular / Svelte / Next.js / Nuxt / Astro |
| CSS / UI | Tailwind / CSS Modules / Sass / CSS-in-JS / デザインシステム |
| バックエンド | Node.js / Python / Go / Java / Rust / Ruby |
| API設計 | REST / GraphQL / gRPC / WebSocket |
| データベース | PostgreSQL / MySQL / MongoDB / Redis / DynamoDB |
| ORM / クエリ | Prisma / Drizzle / SQLAlchemy / TypeORM |
| 認証 | OAuth 2.0 / JWT / SAML / Passkeys |
| インフラ / DevOps | Docker / Kubernetes / Terraform / CI/CD |
| クラウド | AWS / GCP / Azure（それぞれ200以上のサービス） |
| セキュリティ | CORS / HTTPS / CSP / OWASP対策 |
| モバイル | React Native / Flutter / Swift / Kotlin |
| テスト | Jest / Playwright / Cypress / 負荷テスト |
| 監視 | Datadog / Grafana / Sentry / ログ基盤 |
| AI / ML連携 | LLM API / RAG / ベクトルDB（2024年〜急速に必須化） |

---

## 2. 「フルスタックは幻想」派の主張

### 2-1. スタックが広すぎて一人では無理

- 「真のフルスタック」＝現代の技術スタック全てをマスターしている人は**存在しない**
- DEV Communityの記事「A Full-Stack Developer Is A Myth」: 「一人が現代ソフトウェアスタックの爆発的な広がりを全てマスターできるという考えは幻想であり、優秀な開発者を燃え尽きさせる不可能な期待」
  - 出典: https://dev.to/adamthedeveloper/a-full-stack-developer-is-a-myth-3bmk
- Andy Shora「The Myth of the Full-stack Developer」: 「ほとんどの"フルスタック"開発者は、全レイヤーで様々なレベルの能力を持つジェネラリストであり、実際には1〜2つの領域に強いだけ」
  - 出典: https://www.andyshora.com/full-stack-developers.html

### 2-2. 「器用貧乏」問題

- 英語の格言: **"Jack of all trades, master of none"**（何でもできるが、何も極めていない）
  - ただし完全な引用は「"A jack of all trades is a master of none, **but oftentimes better than a master of one**"」（何も極めていないが、一つしか極めていない人より優れていることが多い）
  - この後半部分は2000年代に追加されたもので、元の格言（1730年頃）にはなかった
- 日本では「器用貧乏」「何でも屋」として**低く評価されるリスク**がある
  - 転職市場で「専門性がない」と見られる可能性
  - 出典: https://freeconsultant.jp/column/c423/

### 2-3. Dan Abramovの告白

- React共同作者の **Dan Abramov** が2018年に「Things I Don't Know as of 2018」を公開
  - Reactの中心開発者でありながら、以下を「知らない」と告白：
    - Unix/Bashコマンド（基本的なls、cd以外）
    - Docker、Kubernetes
    - Node.jsのデータベース操作
    - Python
    - CSS Grid、Flexbox
    - TypeScript
    - WebSocket、ストリーム
    - GraphQL
    - アセンブリ、C、Rust
    - 関数型プログラミング（Haskell等）
  - メッセージ: 「**知識のギャップを認めつつ、インポスター症候群を感じることもあるが、それでも何年もの努力で培った深い専門性は価値がある**」
  - → フロントエンドの世界的権威ですら「フルスタック」にはほど遠い
  - 出典: https://overreacted.io/things-i-dont-know-as-of-2018/

### 2-4. 日本特有の問題

- 「何でも対応できる人材」として扱われ、**過度な業務負担**を押し付けられがち
- チーム内での役割分担が曖昧になり、労働時間の増加・専門性を深める時間の不足
- 独学の場合、フロントもバックも中途半端になるリスク
  - 出典: https://career.levtech.jp/guide/knowhow/article/91042/

---

## 3. 「フルスタックは価値がある」派の主張

### 3-1. DHHの「One Person Framework」哲学

- Ruby on Rails作者の **DHH（David Heinemeier Hansson）** は、フルスタック開発を強力に支持
- 2022年のRailsWorldで「The One Person Framework」を提唱：
  - 「Rails 7は一人の個人が現代的なアプリケーションを作り、それを基に競争力のあるビジネスを構築できるほど強力なツールキット」
  - 「専門分野の細分化には多くの既得権益がある。専門性はますます狭くなっている」と業界のトレンドを批判
  - **Conceptual Compression（概念の圧縮）**: 開発者が全ての基礎技術を理解しなくても、フレームワークが複雑さを吸収することで一人でも開発可能に
  - Oregon Trail（オレゴン・トレイル）の比喩: 「最新のツールと技術を全て学ぼうとすると、目的地に着く前に力尽きる」
  - 出典: https://world.hey.com/dhh/the-one-person-framework-711e6318

### 3-2. スタートアップにおける現実的必要性

- LinkedInのGlobal Talent Trends Report（2024年）: **スタートアップの60%がフルスタック開発者を最初の技術者採用として選択**（2020年の38%から増加）
- MVP開発において、フロントエンドとバックエンドで別々の人を雇う余裕がない
- 少人数チームでは「全体を見渡せる人」が不可欠

### 3-3. 「全てのエキスパート」ではなく「スタック横断で働ける人」

- 現実的なフルスタックの定義: **全てをマスターしている人ではなく、スタックのどの部分でも仕事ができる人**
- アーキテクチャの意思決定において、システム全体の理解が重要
- 「フロントとバックの境界を越えられる」ことの価値

---

## 4. 業界データ・統計

### 4-1. Stack Overflow Developer Survey（2024年）

開発者の役割別分布（65,000人以上が回答）：

| 役割 | 割合 |
|------|------|
| **フルスタック** | **30.7%**（最多、6年連続1位） |
| バックエンド | 16.7% |
| 学生 | 8.6% |
| フロントエンド | 5.6%（前年6.6%から減少） |
| エンタープライズ | 4.2% |
| モバイル | 3.4% |
| 組み込み | 2.7% |
| マネージャー | 2.1% |
| 学術研究者 | 2.1% |
| データエンジニア | 1.9% |

- 出典: https://survey.stackoverflow.co/2024/developer-profile

**注目ポイント**:
- フルスタックが圧倒的最多で、2位のバックエンドの約2倍
- フロントエンド専門は減少傾向（6.6% → 5.6%）
- 「フルスタックと名乗る人が多い」≠「フルスタックが実在する」という議論もある

### 4-2. 求人トレンド

- LinkedIn（2024年）: フルスタック開発者が**Top 10 Most In-Demand Jobs**に選出
- 求人数は前年比 **35%増加**
- リモートのフルスタック求人は2024年に **43%増加**（Remote.io）
- 米国労働統計局: Web開発者の雇用は2030年までに**13%成長**を予測

### 4-3. 年収比較（米国・2024〜2025年）

| 役割 | 中央値年収 | シニアレベル |
|------|-----------|------------|
| フロントエンド | 〜$110,000 | 〜$150,000 |
| **フルスタック** | **〜$119,000** | **$130,000〜$150,000** |
| バックエンド | 〜$125,000 | 〜$165,000 |

- バックエンド専門家がフロントエンドより**8〜10%高い**
- フルスタックはフロントとバックの間に位置
- ただし**シニアレベルのフルスタック**は、企業が1人で両方できる効率性に対して高く支払う傾向
- トレードオフ: 幅広さの代わりに、プリンシパルレベルへの昇進が遅くなる傾向
- 出典: https://hakia.com/careers/frontend-vs-backend-salary/

---

## 5. 大手テック企業のアプローチ

### Google: ジェネラリスト志向

- 「Software Engineer（SWE）」という**単一の肩書き**を使用（L3〜L11のレベル制）
- 「フロントエンドエンジニア」「バックエンドエンジニア」という細分化された肩書きを基本的に使わない
- L5はSearch、YouTube、Ads、Cloudどこでも同じ意味
- → Googleはエンジニアを**ジェネラリスト**として扱い、チームやプロジェクトに応じて柔軟に配置
- 出典: https://codingrelic.geekhold.com/2018/08/google-software-engineering-levels-and.html

### Netflix: 知識の分散

- 伝統的に全員を「Senior Software Engineer」として扱い、公式な細かいレベル分けを避けていた（近年レベル制を導入）
- エンジニアは意図的に異なる経験レベルの人とペアリングされ、**全員がシステム全体を理解すること**を促進
- 小さな組織構造のため、同等のタイトルでも早い段階から**幅広いクロスファンクショナルな責任**を持つ
- 出典: https://newsletter.pragmaticengineer.com/p/the-scoop-netflixs-historic-introduction

### Meta（Facebook）: レベル制の専門化

- 内部的にE3〜E10の細かいレベル分け
- ジュニアレベルでは「up or out」（4〜5年でSenior E5に達しないと厳しい）
- 比較的**専門的な役割分担**が明確

### Spotify: スクワッドモデル

- 6〜12人の**クロスファンクショナルな自律チーム（Squad）**
- 各スクワッドが「ミニスタートアップ」として機能し、デザイン・テスト・エンジニアリング全ての能力を内包
- **Chapter**（同じ専門分野の集まり）で専門性を維持しつつ、チームとしてはジェネラリスト的に動く
- → 専門性とジェネラリスト性の両立を組織構造で解決
- 出典: https://www.atlassian.com/agile/agile-at-scale/spotify

---

## 6. 中間解：T字型・π字型エンジニア

### T字型スキル（T-shaped）

- **横棒**: 幅広い分野の基礎知識（他分野との協業能力）
- **縦棒**: 1つの専門分野への深い専門性
- 例: バックエンドが専門だが、フロントエンド・インフラ・DBの基礎は理解している
- 出典: https://en.wikipedia.org/wiki/T-shaped_skills

### π字型スキル（Pi-shaped）

- T字型の進化版: **2つの専門分野**に深い知識 + 幅広い基礎
- 例: バックエンド + インフラの両方に深い専門性を持つ
- 現代の市場ではT字型だけでは不十分で、π字型が求められつつある
- 出典: https://www.appunite.com/blog/become-a-pi-shaped-developer

### くし型スキル（Comb-shaped）

- 複数の専門分野に深い知識を持つ、さらなる発展形
- シニアエンジニアやテックリードに期待される形
- 出典: https://paulsyng.com/blog/forget-the-t-shaped-skillset-try-being-a-comb-instead/

### 4つの形の比較

```
I字型: |||   → 1分野の深い専門家（スペシャリスト）
T字型: ┬     → 1分野の専門性 + 幅広い基礎知識
π字型: ┬┬    → 2分野の専門性 + 幅広い基礎知識
くし型: ┬┬┬┬  → 複数分野の専門性 + 幅広い基礎知識
```

---

## 7. AI時代のフルスタック（2025〜2026年の最新動向）

### AIがフルスタック開発を変える

- GitHub Copilot、Cursor、Claude Codeなどの**AIコーディングツール**の普及
- AIが「知らない領域」を補完することで、**一人でカバーできる範囲が拡大**
- 2026年初頭: AI生成コードの割合が**約50%**に到達
- 生産性向上は**20〜30%**（2023年に予測された「10倍」ではなく現実的な数値）
- 出典: https://www.netcorpsoftwaredevelopment.com/blog/ai-generated-code-statistics

### AIが意味すること

- **フルスタック肯定派**: AIが弱い領域を補えるので、一人で全スタックをカバーすることが現実的に
- **フルスタック否定派**: AIが全員の生産性を上げるので、専門家の方がさらに高い価値を出せる
- **現実**: 「何をAIに任せ、何を自分で深く理解すべきか」の判断力こそが重要に

### Web開発のシンプル回帰トレンド

- 2024年: React疲れから**Astro、Eleventy**などシンプルなフレームワークが台頭
- 「ポストReact」時代の到来を指摘する声
- DHHの「Conceptual Compression」思想と合致: フレームワークが複雑さを吸収
- 出典: https://thenewstack.io/web-development-trends-in-2024-a-shift-back-to-simplicity/

---

## 8. 結論：動画で伝えるべきポイント

### 核心メッセージ

「フルスタックは**存在するが、多くの人が想像するものとは違う**」

### 論点の整理

| 視点 | 結論 |
|------|------|
| 「全技術のエキスパート」としてのフルスタック | **存在しない**（Dan Abramovですら無理） |
| 「スタック横断で働ける人」としてのフルスタック | **存在する**し、非常に価値がある |
| スタートアップ / 小規模チーム | フルスタックは**必要不可欠** |
| 大企業 / 大規模プロジェクト | **専門特化**の方が効率的 |
| キャリアとしての最適解 | **T字型 or π字型**（専門性 + 横断力） |
| AI時代の変化 | 一人でカバーできる範囲は拡大するが、**判断力と設計力**が問われる |

### 動画構成の提案

1. **導入**: 「フルスタックエンジニア募集」の求人はどこにでもある。でも本当に存在するの？
2. **歴史**: 2010年のCarlos Buenoの記事から始まった概念。当時はHTML/CSS/PHP/MySQLで十分だった
3. **現在の複雑さ**: 今のスタックは100倍。全部マスターするのは物理的に不可能
4. **Dan Abramovの例**: Reactの作者ですら「知らないことだらけ」
5. **反論**: DHHの「One Person Framework」。フレームワークが複雑さを吸収すればできる
6. **データ**: Stack Overflow調査で30.7%がフルスタックを自称。求人も急増中
7. **大企業の実態**: Googleは「SWE」一本。Spotifyはクロスファンクショナルチーム
8. **解決策**: T字型・π字型スキルという現実的な中間解
9. **AI時代**: ツールが弱い領域を補い、一人の可能性が広がる
10. **結論**: 「フルスタック」を「全知全能」ではなく「スタック横断能力」と再定義しよう

---

## 主要出典

- Carlos Bueno, "The Full Stack, Part I" (2010): https://carlos.bueno.org/2010/11/full-stack.html
- Dan Abramov, "Things I Don't Know as of 2018": https://overreacted.io/things-i-dont-know-as-of-2018/
- DHH, "The One Person Framework" (2022): https://world.hey.com/dhh/the-one-person-framework-711e6318
- Stack Overflow Developer Survey 2024: https://survey.stackoverflow.co/2024/
- Stack Overflow Developer Survey 2025: https://survey.stackoverflow.co/2025/
- DEV Community, "A Full-Stack Developer Is A Myth": https://dev.to/adamthedeveloper/a-full-stack-developer-is-a-myth-3bmk
- The Martec, "The Myth of the Full Stack Developer": https://www.themartec.com/insidelook/full-stack-developer-myth
- Andy Shora, "The Myth of the Full-stack Developer": https://www.andyshora.com/full-stack-developers.html
- Appunite, "Become a Pi-shaped Developer": https://www.appunite.com/blog/become-a-pi-shaped-developer
- Wikipedia, "T-shaped skills": https://en.wikipedia.org/wiki/T-shaped_skills
- Hybrid Hacker, "Specialists vs Generalists vs T-Shaped": https://hybridhacker.email/p/specialists-vs-generalists-vs-t-shaped
- Hakia, "Frontend vs Backend Developer Salary": https://hakia.com/careers/frontend-vs-backend-salary/
- Noble Desktop, "Full Stack Developer Job Outlook": https://www.nobledesktop.com/careers/full-stack-developer/job-outlook
- The New Stack, "Web Development Trends in 2024": https://thenewstack.io/web-development-trends-in-2024-a-shift-back-to-simplicity/
- Pragmatic Engineer, "Netflix's historic introduction of levels": https://newsletter.pragmaticengineer.com/p/the-scoop-netflixs-historic-introduction
- Atlassian, "Spotify Model": https://www.atlassian.com/agile/agile-at-scale/spotify
- CodeZine, "フルスタックエンジニアの市場価値とAI時代の生存戦略": https://codezine.jp/article/detail/22886
- Levtech, "フルスタックエンジニアはやめとけと言われる理由": https://career.levtech.jp/guide/knowhow/article/91042/
