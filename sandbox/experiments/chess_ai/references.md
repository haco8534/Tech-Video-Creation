# 参考文献 — 【視覚的に理解する】チェスAIはどうして世界1位を倒せるのか

- Deep Blue — IBM, https://www.ibm.com/history/deep-blue: 1997年に Deep Blue がガルリ・カスパロフを標準的な対局条件のマッチで破った歴史、200 million positions per second という探索規模、専用評価関数と並列計算の文脈。
- Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm — David Silver et al., 2017, https://arxiv.org/abs/1712.01815: AlphaZero がルール以外の人間知識なしに自己対局で学習し、チェス・将棋・囲碁で超人的性能へ到達した根拠。方策、価値、探索の関係。
- A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play — David Silver et al., Science, 2018, https://www.science.org/doi/10.1126/science.aar6404: AlphaZero の査読版。自己対局、ニューラルネット、MCTS、既存エンジンとの比較。
- Introducing NNUE Evaluation — Stockfish, 2020, https://stockfishchess.org/blog/2020/introducing-nnue-evaluation/: Stockfish が NNUE 評価を導入し、alpha-beta 探索の中でニューラルネット評価を使うようになった根拠。CPUで効率よく差分更新できる説明。
- Stockfish source and documentation — Stockfish Developers, https://stockfishchess.org/ and https://github.com/official-stockfish/Stockfish: 現代の強豪エンジンが探索、枝刈り、置換表、NNUE 評価、分散テストによって継続改善される文脈。
- Leela Chess Zero — LCZero project, https://lczero.org/: AlphaZero に触発されたオープンソースのニューラルネット型チェスエンジン。自己対局で学ぶネットワーク、長期的な局面理解の説明。
- Neural Networks for Chess — Dominik Klein, 2022, https://arxiv.org/abs/2209.01506: AlphaZero、Leela Chess Zero、Stockfish NNUE、minimax、alpha-beta、MCTS、ニューラルネットの技術的つながりを俯瞰する参考資料。
- Programming a Computer for Playing Chess — Claude E. Shannon, 1950, https://vision.unipv.it/IA1/ProgrammingaComputerforPlayingChess.pdf: コンピュータチェスの古典。全探索が不可能なため、探索と評価関数を組み合わせる発想の原点。
