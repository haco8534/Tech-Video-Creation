# Research 2a: 基本情報・仕組み・通説

## 検索クエリログ
1. `algorithm formal definition computer science mathematics`
2. `Al-Khwarizmi algorithm etymology origin history`
3. `Knuth five properties of algorithm finiteness definiteness input output effectiveness`
4. `common algorithms time complexity examples sorting searching shortest path`
5. `algorithms in daily life PageRank recommendation system GPS routing examples`
6. `Big O notation explanation why important concrete numerical example comparison`
7. `Euclid algorithm greatest common divisor Sieve of Eratosthenes ancient algorithms before computers history`
8. `Dijkstra algorithm time complexity O(V+E log V) shortest path graph`
9. `Turing machine algorithm definition Church-Turing thesis computability`

## ファクト一覧

### A. 定義・語源

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | アルゴリズムの正式定義：「有限個の数学的に厳密な命令の列であり、特定の問題クラスを解くか計算を実行するために用いられるもの」 | 🟢 | [Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Algorithm) |
| 2 | チューリングによる形式的定義（1936年）：アルゴリズムとは「完全に仕様化されたチューリングマシン、または同等の形式体系で実装できる手続き」である | 🟢 | [Church-Turing thesis - Wikipedia](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis) / [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/church-turing/) |
| 3 | チャーチ=チューリングのテーゼ：「すべての効果的計算はチューリングマシンで実行可能」という主張。チャーチとチューリングが1930年代半ばに独立に提唱した | 🟢 | [Church-Turing thesis - Wikipedia](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis) |
| 4 | 「algorithm」の語源は9世紀ペルシアの数学者ムハンマド・イブン・ムーサー・アル=フワーリズミー（780-850 CE）の名前に由来する。「フワーリズミー」は中央アジアのホラズム地方出身を意味する | 🟢 | [Al-Khwarizmi - Wikipedia](https://en.wikipedia.org/wiki/Al-Khwarizmi) / [Britannica](https://www.britannica.com/biography/al-Khwarizmi) |
| 5 | アル=フワーリズミーの著作が12世紀にラテン語に翻訳された際、タイトルは『Algoritmi de numero Indorum』（インドの数に関するアル=フワーリズミー）となり、ラテン語名「Algoritmi」が「algorithm」の直接の起源となった | 🟢 | [NASA - How Algorithm Got Its Name](https://science.nasa.gov/earth/earth-observatory/how-algorithm-got-its-name-91544/) |
| 6 | アル=フワーリズミーは「algebra（代数）」の語源にもなった著書『キターブ・アル=ジャブル・ワル=ムカーバラ』の著者でもある。四則演算や分数計算の体系的手順を初めて詳細に記述した | 🟢 | [Britannica - al-Khwarizmi](https://www.britannica.com/biography/al-Khwarizmi) |
| 7 | Merriam-Websterによる辞書的定義：「問題を解くための、または計算を実行するための手順もしくは一連のステップ。特にコンピュータに用いられる」 | 🟢 | [Merriam-Webster](https://www.merriam-webster.com/dictionary/algorithm) |

### B. Knuthの5条件

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 8 | ドナルド・クヌース（Knuth）は『The Art of Computer Programming』でアルゴリズムの5つの基本性質を定義した | 🟢 | [InformIT - TAOCP 1.1 Algorithms](https://www.informit.com/articles/article.aspx?p=2221792) |
| 9 | **(1) 有限性（Finiteness）**：アルゴリズムは有限回のステップで必ず終了しなければならない | 🟢 | 同上 |
| 10 | **(2) 明確性（Definiteness）**：各ステップは厳密かつ曖昧さなく定義されなければならない | 🟢 | 同上 |
| 11 | **(3) 入力（Input）**：0個以上の入力を受け取る。指定された集合から取られる量 | 🟢 | 同上 |
| 12 | **(4) 出力（Output）**：1個以上の出力を生成する。入力に対して特定の関係を持つ量 | 🟢 | 同上 |
| 13 | **(5) 有効性（Effectiveness）**：すべての操作が十分に基本的であり、原理的には人間が紙と鉛筆を使って正確かつ有限時間内に実行可能でなければならない | 🟢 | 同上 |
| 14 | 有限性を満たさない手続きは「計算方法（computational method）」と呼ばれ、アルゴリズムとは区別される。例：円周率の無限計算は計算方法であってアルゴリズムではない | 🟢 | 同上 |

### C. 代表的なアルゴリズムと計算量

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 15 | **マージソート**：最悪計算量 O(n log n)。安定ソート。分割統治法の代表例 | 🟢 | [Sorting algorithm - Wikipedia](https://en.wikipedia.org/wiki/Sorting_algorithm) |
| 16 | **クイックソート**：平均計算量 O(n log n)、最悪 O(n^2)。実用上最も高速なソートの一つ | 🟢 | [GeeksforGeeks - Time Complexities](https://www.geeksforgeeks.org/dsa/time-complexities-of-all-sorting-algorithms/) |
| 17 | **バブルソート**：最悪計算量 O(n^2)。教育目的では有名だが実用には非効率 | 🟢 | 同上 |
| 18 | **二分探索**：計算量 O(log n)。ソート済み配列に対して探索範囲を半分ずつ絞り込む | 🟢 | [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) |
| 19 | **線形探索**：計算量 O(n)。最悪の場合すべての要素を確認する必要がある | 🟢 | 同上 |
| 20 | **ダイクストラ法**：重み付きグラフの最短経路を求める。二分ヒープ使用時 O((V+E) log V)、フィボナッチヒープ使用時 O(E + V log V) | 🟢 | [Dijkstra's algorithm - Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) |
| 21 | ダイクストラ法は1956年にエドガー・ダイクストラが考案し、1959年に発表。負の重みを持つ辺では使用不可 | 🟢 | 同上 |

### D. 計算量（O記法）の概念

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 22 | O記法（ビッグオー記法）は、入力サイズの増大に伴い実行時間やメモリ使用量がどのように増加するかを分類するための数学的記法 | 🟢 | [Big O notation - Wikipedia](https://en.wikipedia.org/wiki/Big_O_notation) |
| 23 | 具体的な数値例：100万件のデータをソートする場合、クイックソート O(n log n) は約2,000万ステップ、バブルソート O(n^2) は約1兆（10^12）ステップを要する。50,000倍の差 | 🟡 | [freeCodeCamp - Big O Notation](https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/) |
| 24 | 主要な計算量クラスの成長速度順：O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!) | 🟢 | [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) |
| 25 | O記法が重要な理由：ハードウェアの性能差を超えて、アルゴリズムの本質的な効率を客観的に比較できる。デスクトップPCのクイックソートがスーパーコンピュータのバブルソートに勝つ場合がある | 🟡 | [freeCodeCamp - Big O Notation](https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/) |

### E. 日常生活のアルゴリズム

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 26 | **Google検索のPageRank**：Webをグラフとして捉え、各ページをノード、リンクをエッジとしてページの重要度をランク付けする。リンクの数と質に基づく | 🟢 | [PageRank - Wikipedia](https://en.wikipedia.org/wiki/PageRank) |
| 27 | **SNSレコメンド**：Netflix、Amazon、Spotifyはグラフアルゴリズムを用いてユーザーの行動パターンを分析し、類似の嗜好に基づいてコンテンツを推薦する | 🟡 | [Jobaaj Learnings - Graph Algorithms](https://www.jobaajlearnings.com/blog/solving-real-world-problems-with-graph-algorithms) |
| 28 | TwitterはPersonalized PageRankを使って「おすすめユーザー」を提示している | 🟡 | 同上 |
| 29 | **GPS経路探索**：Google Mapsはダイクストラ法などのグラフアルゴリズムを使い、交通状況・道路閉鎖・事故を考慮して最速ルートを計算する | 🟡 | 同上 |
| 30 | UPSはグラフベースの経路最適化アルゴリズムで燃料コストと配達時間を最小化している | 🟡 | 同上 |

### F. コンピュータ以前のアルゴリズム

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 31 | **ユークリッドの互除法**：紀元前300年頃、ユークリッドが『原論』に記述。2つの数の最大公約数を求める。今日でも使われる最古のアルゴリズムとされる | 🟢 | [Sieve of Eratosthenes - Wikipedia](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) / [AlgoCademy](https://algocademy.com/blog/the-archaeologist-coder-unearthing-the-ancient-origins-of-modern-algorithms/) |
| 32 | **エラトステネスの篩**：紀元前276-194年頃、エラトステネスが考案。任意の上限までの素数をすべて見つけるアルゴリズム。2の倍数、3の倍数…と順に合成数を除外していく | 🟢 | [Sieve of Eratosthenes - Wikipedia](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) |
| 33 | アルゴリズムの歴史はさらに古く、紀元前1600年頃のバビロニアにまで遡る。楔形文字の粘土板に因数分解や平方根を求める手順が記録されていた | 🟢 | [CACM - Algorithms Have Been Around for 4,000 Years](https://cacm.acm.org/blogcacm/algorithms-have-been-around-for-4000-years/) |
| 34 | アルゴリズムはコンピュータの発明よりも数千年前から存在していた。コンピュータはアルゴリズムを高速に実行するための機械であり、アルゴリズムそのものはコンピュータとは独立した概念 | 🟡 | [Enjoy Algorithms - History](https://www.enjoyalgorithms.com/blog/history-of-algorithms/) |

## まとめ

1. **アルゴリズムは4000年以上の歴史を持つ**：バビロニアの粘土板（BC1600年頃）からユークリッドの互除法（BC300年頃）まで、コンピュータより遥かに古い概念である。語源は9世紀のペルシア数学者アル=フワーリズミーに由来する。

2. **Knuthの5条件が本質を示す**：有限性・明確性・入力・出力・有効性の5つが「アルゴリズムとは何か」を厳密に規定する。特に「紙と鉛筆で人間が実行可能」という有効性の条件が、アルゴリズムを単なる手続きと区別する鍵となる。

3. **計算量（O記法）が真の実力差を決める**：100万件のソートでクイックソート（約2000万ステップ）とバブルソート（約1兆ステップ）では5万倍の差が生まれる。ハードウェアの性能差を凌駕するほどの差であり、「どのアルゴリズムを選ぶか」が決定的に重要である。

4. **日常はアルゴリズムに囲まれている**：Google検索（PageRank）、Netflix・Spotifyのレコメンド、GPSナビ（ダイクストラ法）など、現代生活の根幹をアルゴリズムが支えている。

5. **形式的にはチューリングマシンで定義される**：チャーチ=チューリングのテーゼにより、「アルゴリズムで計算可能」と「チューリングマシンで計算可能」は同値とされている。これが計算可能性理論の基盤である。
