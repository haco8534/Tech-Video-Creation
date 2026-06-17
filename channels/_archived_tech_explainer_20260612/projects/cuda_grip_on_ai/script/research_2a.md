# Research 2a: 基本情報・仕組み・通説

## ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | CUDAは2006年にNVIDIAが発表し、初代CUDA SDK は2007年2月15日にWindows/Linux向けに公開された。最初のCUDA対応GPUはGeForce 8800 GTX（2006年11月発売）。開発の原型はスタンフォード大学のIan Buckが作ったBrookGPU。NVIDIAは2004年にBuckを採用し、John Nickolls（GPUコンピューティング・アーキテクチャ責任者）と共にBrookをCUDAへ発展させた。 | 🟢高 | [CUDA - Wikipedia](https://en.wikipedia.org/wiki/CUDA), [NVIDIA Corporate Timeline](https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/) |
| 2 | NVIDIAはAIアクセラレータ市場で売上ベース約80〜92%のシェアを保持（2024〜2025年）。トレーニング用途では90%超、推論用途では60〜75%。データセンターGPU市場で圧倒的首位。 | 🟡中 | [Carbon Credits: NVIDIA Controls 92%](https://carboncredits.com/nvidia-controls-92-of-the-gpu-market-in-2025-and-reveals-next-gen-ai-supercomputer/), [Silicon Analysts: 87% Peak](https://siliconanalysts.com/analysis/nvidia-ai-accelerator-market-share-2024-2026) |
| 3 | NVIDIAのFY2025（2025年1月期）売上高は1,305億ドル（前年比+114%）。うちデータセンター部門が1,152億ドル（前年比+142%）で全体の約88%を占める。Q4だけでデータセンター売上356億ドル。 | 🟢高 | [NVIDIA FY2025決算プレスリリース](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025), [CNBC: Nvidia sales grow 78%](https://www.cnbc.com/2025/02/26/nvidia-nvda-earnings-report-q4-2025.html) |
| 4 | NVIDIAの時価総額は2023年末の約1.2兆ドルから、2024年末に約3.28兆ドル、2025年7月に一時4兆ドル突破、2026年4月時点で約4.3兆ドル。世界最大の時価総額企業。 | 🟢高 | [CompaniesMarketCap: NVIDIA](https://companiesmarketcap.com/nvidia/marketcap/), [CNBC: Nvidia $4 trillion](https://www.cnbc.com/2025/07/09/nvidia-4-trillion.html) |
| 5 | CUDAエコシステムの主要構成要素: **cuDNN**（畳み込み・Attention等のDNN基本演算を高速化）、**TensorRT**（推論最適化SDK、低レイテンシ・高スループット）、**NCCL**（マルチGPU/マルチノード間の集合通信ライブラリ、AllReduceなど）。これらがPyTorch・TensorFlow・JAX等の主要フレームワークのバックエンドとして機能。 | 🟢高 | [NVIDIA cuDNN公式](https://developer.nvidia.com/cudnn), [NVIDIA CUDA-Xライブラリ公式](https://developer.nvidia.com/cuda/cuda-x-libraries), [NVIDIA NCCLドキュメント](https://docs.nvidia.com/deeplearning/nccl/install-guide/index.html) |
| 6 | PyTorchとTensorFlowはともにGPU計算にCUDAを必要とする。PyTorch 2.7はcuDNN 9.5、TensorFlow 2.13はcuDNN 9.3を要求するなど、バージョン依存が複雑。事実上、主要DLフレームワークはCUDA前提で設計されている。 | 🟢高 | [PyTorch公式](https://pytorch.org/), [PyTorch Forums: CUDA installation](https://discuss.pytorch.org/t/torch-cuda-installation-issues-and-best-practices-when-torch-is-a-dependency/161992) |
| 7 | CUDAの登録開発者数は400万人超（2020年時点で200万人→2年で倍増）。4万以上の組織がCUDAアクセラレーション対応アプリケーションを使用。この巨大な開発者コミュニティ・既存コードベース・ノウハウの蓄積が「スイッチングコスト」を形成し、競合（AMD ROCm等）への移行障壁となっている。 | 🟡中 | [Medium: NVIDIA's CUDA Moat](https://medium.com/@productbrief/nvidias-cuda-moat-how-developer-lock-in-built-a-trillion-dollar-ai-empire-40d2f7f7dca2), [Nasdaq: Nvidia's Broadening Moat](https://www.nasdaq.com/articles/nvidias-broadening-moat-securing-ai-ecosystem) |
| 8 | GPUがAIに適している理由: CPUは数個〜数十個のコアで逐次処理に最適化されるのに対し、GPUは数千個のコアで大規模並列処理を行う。ディープラーニングの中核である行列演算・テンソル計算はGPUの並列アーキテクチャと親和性が高い。GPUでのDNN学習はCPU比で10倍以上高速になるケースがある。また、GPUはトランジスタの大部分を演算ユニットに割り当て（CPUはキャッシュ・制御に多くを割く）、高いメモリ帯域幅を持つ。 | 🟢高 | [IBM: CPU vs. GPU for ML](https://www.ibm.com/think/topics/cpu-vs-gpu-machine-learning), [Intel: CPU vs GPU](https://www.intel.com/content/www/us/en/products/docs/processors/cpu-vs-gpu.html), [DigitalOcean: Parallel Computing GPU vs CPU with CUDA](https://www.digitalocean.com/community/tutorials/parallel-computing-gpu-vs-cpu-with-cuda) |
| 9 | Amazon・Google・Microsoft・Metaの2024年のCAPEX合計は約2,100億ドルに達し、その大部分がNVIDIA GPU購入に充てられている。ハイパースケーラーのAIインフラ投資がNVIDIA/CUDAの支配力を加速。 | 🟡中 | [PatentPC: AI Chip Market Explosion](https://patentpc.com/blog/the-ai-chip-market-explosion-key-stats-on-nvidia-amd-and-intels-ai-dominance) |
| 10 | 推論領域では競合が台頭: Google TPUはコスト効率4.7倍・消費電力67%削減という報告があり、Anthropic・Meta・Midjourney等が推論をTPUに移行。ただしトレーニング領域ではCUDA/NVIDIAの支配は堅固。NVIDIAのシェアは2026年に75%程度へ低下予測されるが、市場全体が2,000億ドル超に拡大するため絶対額は成長継続。 | 🟡中 | [AI News Hub: Nvidia to Google TPU Migration](https://www.ainewshub.org/post/nvidia-vs-google-tpu-2025-cost-comparison), [Silicon Analysts](https://siliconanalysts.com/analysis/nvidia-ai-accelerator-market-share-2024-2026) |
| 11 | NVIDIAのFY2024（2024年1月期）売上高は609億ドル（前年比+126%）。FY2023の約270億ドルから2年で約5倍に急成長。AI需要によるデータセンター売上の爆発が主因。 | 🟢高 | [NVIDIA FY2024決算](https://nvidianews.nvidia.com/_gallery/download_pdf/65d669a33d63329bbf62672a/), [NVIDIA FY2025決算](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025) |

## まとめ

CUDAは2006〜2007年にNVIDIAが投入したGPU汎用計算プラットフォームで、当初は学術用途が中心だったが、ディープラーニング革命（2012年のAlexNet以降）と共にAI開発の事実上の標準基盤となった。

**NVIDIAの支配力の3つの柱:**

1. **ハードウェア独占** -- データセンター向けAIアクセラレータ市場で80〜92%のシェア。FY2025のデータセンター売上は1,152億ドル。
2. **ソフトウェアエコシステム（CUDA）** -- cuDNN・TensorRT・NCCLなどのライブラリ群がPyTorch・TensorFlow・JAXのバックエンドとして不可欠。400万超の開発者が既にCUDAに習熟しており、膨大な既存コード資産がロックインを形成。
3. **ネットワーク効果** -- フレームワーク → ライブラリ → ハードウェア → 開発者の好循環が競合参入を阻む。AMDのROCmやIntelのoneAPIは存在するが、エコシステムの成熟度で大差。

**動画で使える核心メッセージ:**
CUDAは「単なるソフトウェア」ではなく、AI産業全体のインフラレイヤーである。GPUの性能だけでなく、20年かけて築いたエコシステムとコミュニティがNVIDIAの真の競争優位（moat）を形成しており、これが「AIの首根っこを握る」構図の実態である。
