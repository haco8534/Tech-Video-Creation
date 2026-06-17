# Research 2b: 対立軸・比較・誤解されやすい点

## ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | NVIDIAはAI GPU市場で推定80〜92%のシェアを保持（2025年）。データセンター収益はFY2026 Q3で$51.2B（前年比+66%）、全社収益の90%を占める | 🟢高 | [CarbonCredits](https://carboncredits.com/nvidia-controls-92-of-the-gpu-market-in-2025-and-reveals-next-gen-ai-supercomputer/), [PatentPC](https://patentpc.com/blog/the-ai-chip-market-explosion-key-stats-on-nvidia-amd-and-intels-ai-dominance) |
| 2 | CUDAの本質は「プログラミング言語」ではなく、cuDNN・cuBLAS・NCCL・TensorRT・Nsightなど19年間蓄積された巨大プラットフォーム。Javaエコシステムや「OSに近い存在」と表現される | 🟡中 | [Modular Blog: What exactly is CUDA?](https://www.modular.com/blog/democratizing-compute-part-2-what-exactly-is-cuda), [NVIDIA Developer Blog](https://developer.nvidia.com/blog/cuda-refresher-the-gpu-computing-ecosystem/) |
| 3 | CUDAエコシステムは400万人以上の開発者、3,000以上のGPUアクセラレーテッドアプリ、40,000社以上の企業を抱える。スイッチングコストは「加算的ではなく乗算的に積み上がる」ため、ハードウェア性能で20%勝っても実用上は20%の不利になる | 🟡中 | [Introl: NVIDIA's Unassailable Position](https://introl.com/blog/nvidia-dominance-cuda-moat-competition-analysis-2025), [Sundeep Teki](https://www.sundeepteki.org/blog/nvidias-ai-moat-in-2025-a-deep-dive) |
| 4 | CUDAロックインは「数千の小さな技術的決定」に蓄積される：カーネルフュージョン、NCCLに最適化された分散訓練パス、CUDA固有のCI/CDパイプラインなど。コードの中に埋め込まれた最適化の長い尾が移行を阻む | 🟡中 | [Edge AI and Vision Alliance](https://www.edge-ai-vision.com/2025/10/breaking-free-from-the-cuda-lock-in/), [LinkedIn: Breaking the CUDA Lock-In](https://www.linkedin.com/pulse/breaking-cuda-lock-in-full-ecosystem-analysis-ai-fred-ingham-39mve) |
| 5 | AMD MI300XはHBM3メモリ192GB（H100の2.4倍）、帯域幅5.3TB/s（H100 SXMの1.6倍）、FP16で1.31 PFLOPSとスペック上は優位。しかし訓練スループットはソフトウェア（ROCm）の未成熟さにより依然H100/H200に劣る | 🟡中 | [SemiAnalysis](https://newsletter.semianalysis.com/p/mi300x-vs-h100-vs-h200-benchmark-part-1-training), [Tom's Hardware](https://www.tomshardware.com/pc-components/gpus/amd-mi300x-performance-compared-with-nvidia-h100) |
| 6 | ROCm 7.2（2026年）でコンシューマRadeon GPU（RDNA 4）を公式サポート。PyTorchもROCmを標準インストールオプションとして提供開始。CUDAとの性能差は10〜30%に縮小したが、エコシステムの差は依然大きい | 🟡中 | [ThunderCompute](https://www.thundercompute.com/blog/rocm-vs-cuda-gpu-computing), [AIMultiple](https://aimultiple.com/cuda-vs-rocm) |
| 7 | Intel Ponte Vecchioは事実上サンセット。IntelはGaudi 3でコスト効率路線に転換し、AI訓練市場の「特定エンタープライズセグメントで8〜9%」を目標とする。NVIDIAと正面対決しない方針を表明 | 🟡中 | [VideoCardz](https://videocardz.com/newz/intel-starts-sunsetting-process-for-ponte-vecchio-gpu-focuses-on-gaudi-2-3-and-falcon-shores), [SemiWiki](https://semiwiki.com/forum/threads/intel-says-it-won%E2%80%99t-compete-with-nvidia-in-ai-market-shifts-focus-towards-bringing-cost-effective-ai-solutions-with-gaudi-3.21257/) |
| 8 | OpenCL・SYCLはAI領域で「CUDA代替として失敗」と評価される。llama.cppのSYCLバックエンドはIntel GPUをサポートするが、性能はCUDAの40〜60%にとどまる（2026年） | 🟡中 | [Modular Blog: What about OpenCL](https://www.modular.com/blog/democratizing-ai-compute-part-5-what-about-cuda-c-alternatives), [droid4x](https://droid4x.com/cuda-vs-alternatives-for-local-llms/) |
| 9 | Google TPU v6e（Trillium）はNVIDIA GPUと比べ性能あたりコスト4.7倍、電力消費60〜65%削減。Anthropicは2025年11月にGoogle史上最大のTPU契約を締結（2026年に数十万基、2027年に100万基へ拡大）。MetaもTPU大規模導入を協議中 | 🟢高 | [Google Cloud Blog](https://cloud.google.com/blog/products/compute/trillium-sixth-generation-tpu-is-in-preview), [Introl](https://introl.com/blog/google-tpu-v6e-vs-gpu-4x-better-ai-performance-per-dollar-guide) |
| 10 | AWS Trainium2はH100比で約25%のコストで同等性能を主張。Trainium3（2025年12月発表）は3nmチップで2.52 PFLOPSのFP8演算、144GB HBM3e、訓練コスト50%削減を謳う | 🟡中 | [Silicon Canals](https://siliconcanals.com/j-amazon-just-gave-companies-a-reason-to-ditch-nvidia-its-called-trainium3-and-its-cheaper-than-you-think/), [Introl](https://introl.com/blog/aws-trainium-inferentia-silicon-ecosystem-guide-2025) |
| 11 | カスタムチップ（Google TPU・AWS Trainium・Meta MTIA等）のAIチップ市場シェアは2024年37% → 2025年40% → 2028年予測45%と拡大傾向。特に推論ワークロードで脱NVIDIA移行が進む | 🟡中 | [Rwazi Blog](https://blog.rwazi.com/nvidias-ai-chip-monopoly-is-cracking-amid-rising-competitors-in-2025/), [CNBC](https://www.cnbc.com/2025/11/21/nvidia-gpus-google-tpus-aws-trainium-comparing-the-top-ai-chips.html) |
| 12 | OpenAI Triton（MLIR基盤）はPythonで高効率GPUカーネルを記述可能。AMD ROCm 7.0にも統合され、AMD GPU向けコード生成が可能に。vLLM・Mamba・DeepSpeedなど主要フレームワークが採用。CUDAに依存しない抽象化レイヤーとして成長中 | 🟡中 | [GitHub triton-lang](https://github.com/triton-lang/triton), [NVIDIA Developer Blog](https://developer.nvidia.com/blog/openai-triton-on-nvidia-blackwell-boosts-ai-performance-and-programmability/) |
| 13 | Modular社のMojo（Chris Lattner開発）はPythonの構文でNVIDIA・AMD両GPUに対応し、CPythonの10〜100倍の速度を実現。MLIR基盤でハードウェア非依存を目指す。コミュニティ5万人以上、オープンソースコード75万行以上 | 🟡中 | [Modular](https://www.modular.com/mojo), [Software Engineering Daily](https://softwareengineeringdaily.com/2025/05/22/mojo-and-building-a-cuda-replacement-with-chris-lattner/) |
| 14 | Apple MLXはWWDC 2025で3つの専用セッションを設け、Apple Silicon上のLLM推論の標準フレームワークとして位置付け。Ollama（2026年3月）がApple Silicon上のエンジンをMLXに切り替え。ただしFP16訓練の加速は20〜30%にとどまり、大規模訓練はNVIDIAに大差で劣る | 🟡中 | [Apple Developer](https://developer.apple.com/videos/play/wwdc2025/315/), [yage.ai](https://yage.ai/share/mlx-apple-silicon-en-20260331.html) |
| 15 | 2025年調査で1,000人のITリーダーの88.8%が「単一クラウドプロバイダーがスタック全体を支配すべきでない」と回答。45%が「ベンダーロックインがより良いツールの採用を妨げた」と報告 | 🟡中 | [CUDO Compute](https://www.cudocompute.com/blog/why-ai-teams-need-cloud-infrastructure-without-vendor-lock-ins) |
| 16 | NVIDIAの「CUDAの壁」が崩れない真の理由：競合の問題は「ハードウェア性能」ではなく「エコシステム全体のスイッチングコスト」。カーネル書き換え、cuDNN→MIOpen移行、開発者の再教育、Nsightツール放棄、深夜2時に問題を解決するコミュニティ知識の喪失 ── これらが乗算的に積み上がる | 🟡中 | [Introl](https://introl.com/blog/nvidia-dominance-cuda-moat-competition-analysis-2025), [ChipStrat](https://www.chipstrat.com/p/can-amd-bridge-nvidias-software-moat) |
| 17 | Jensen HuangはAIインフラに「2020年代末までに$3〜4T（兆ドル）」が費やされると見積もる。CUDAによるベンダーロックインがAIサプライチェーン全体でプレミアム価格を維持する構造を形成 | 🟡中 | [Built In](https://builtin.com/articles/nvidias-cuda-future-ai-infrastructure) |

## まとめ

### 対立構造の全体像

CUDAをめぐる競争は「チップ性能の戦い」ではなく「エコシステムの戦い」である。AMD MI300Xはスペック上でH100を凌駕するが、ROCmの未成熟さが足を引っ張る。Intel Ponte Vecchioは早々にサンセットし、Gaudiはニッチ路線に転換。OpenCL/SYCLはAI時代に適応できなかった。

### 風穴を開けつつある勢力

最も実質的な脅威はハイパースケーラーの自社チップ（Google TPU、AWS Trainium、Meta MTIA）で、特に推論ワークロードで「NVIDIAの50〜70%のコスト」を実現し始めている。ソフトウェア面では、OpenAI Triton（MLIR基盤）とModular Mojo がCUDAに依存しない抽象化レイヤーとして成長中。

### 崩れない理由

それでもCUDAが支配的な理由は「19年間の蓄積」にある。400万人の開発者、数千のライブラリ、深夜のデバッグで頼れるStack Overflowの回答 ── これらのスイッチングコストは「乗算的に」積み上がるため、ハードウェアで20%勝ってもエコシステム全体では不利になる。

### 動画で活かせる対比軸

1. **スペック vs エコシステム**: MI300Xの「数字上の勝利」とROCmの「実用上の敗北」
2. **オープン vs プロプライエタリ**: OpenCL/SYCLの理想とCUDAの現実
3. **汎用 vs 専用**: NVIDIA GPU（何でもできる）vs TPU/Trainium（特化型で安い）
4. **CUDAの誤解**: 「ただの言語」ではなく「19年かけて築いたOS級プラットフォーム」
5. **ロックインの構造**: 技術的決定が数千箇所に埋め込まれ、移行コストが指数的に増大する仕組み
