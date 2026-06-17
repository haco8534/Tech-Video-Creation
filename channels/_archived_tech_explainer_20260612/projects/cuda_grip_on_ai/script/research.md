# Research: 統合キーファクト一覧

テーマ: CUDAが握るAIの首根っこ

## 優先度A（台本で必ず使う）

| # | ファクト | 信頼度 | 出典 | 使用Block |
|---|---------|--------|------|-----------|
| 1 | CUDAは2006年にNVIDIAが発表。GeForce 8800 GTXと同時。原型はスタンフォード大Ian BuckのBrookGPU（2003年）。2004年にBuckをNVIDIAが採用しCUDAへ発展 | 🟢高 | Wikipedia, NVIDIA公式 | Block 3 |
| 2 | Jensen HuangはコンシューマGeForce全機種にCUDA搭載を決断。GPUコスト約50%増。当時NVIDIAの粗利率は35%程度。Huang自身「余裕なんてなかった」と回顧 | 🟢高 | Global Esports News, Yahoo Finance | Block 3 |
| 3 | 2006-2017年にR&Dに約120億ドル投資。ウォール街は「無駄遣い」と批判。6年間は鳴かず飛ばず | 🟡中 | Investing in AI Substack, Yahoo Finance | Block 3 |
| 4 | 2012年AlexNet：GTX 580×2台、CUDAベースのcuda-convnet。ImageNetでTop-5エラー率15.3%、2位に10.8pt差の圧勝 | 🟢高 | IEEE Spectrum, Wikipedia | Block 3 |
| 5 | CUDA開発者400万人超（2020年180万→150%増）。450+大学で教育採用。月39,000人新規登録 | 🟡中 | NVIDIA Blog, SlashData | Block 3, 4 |
| 6 | NVIDIAはAIアクセラレータ市場で80-92%シェア。トレーニングでは90%超 | 🟡中 | CarbonCredits, SiliconAnalysts | Block 1 |
| 7 | FY2025売上1,305億ドル（+114%）。データセンター1,152億ドル（88%）。時価総額4兆ドル超 | 🟢高 | NVIDIA決算, CompaniesMarketCap | Block 1 |
| 8 | CUDAエコシステム: cuDNN（DNN演算）、TensorRT（推論最適化）、NCCL（マルチGPU通信）、cuBLAS、cuFFT等。PyTorch/TensorFlow/JAXのバックエンド | 🟢高 | NVIDIA公式 | Block 3 |
| 9 | AMD MI300X: メモリ192GB（H100の2.4倍）、帯域5.3TB/s（H100の1.6倍）、FP16 1.31 PFLOPS。だがROCmの未成熟で実訓練性能はH100/H200に劣るケースが多い | 🟡中 | SemiAnalysis, Tom's Hardware | Block 4 |
| 10 | スイッチングコストは「加算的ではなく乗算的」：カーネル書換×開発者再教育×ツール移行×検証再構築。深夜のデバッグコミュニティも含む | 🟡中 | Introl, ChipStrat | Block 4 |
| 11 | Google TPU v6e: 推論コスト効率NVIDIA比4.7倍（条件による）。Anthropicが史上最大TPU契約 | 🟢高 | Google Cloud Blog, Introl | Block 5 |
| 12 | OpenAI Triton: MLIR基盤、Python記述、NVIDIA/AMD両対応。vLLM・DeepSpeed等が採用 | 🟡中 | GitHub triton-lang, NVIDIA Blog | Block 5 |

## 優先度B（補足として使用可能）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 13 | GPUはCPU比で行列演算10倍以上高速。AlexNetでは12GPU≒2000CPU | 🟢高 | IBM, Intel |
| 14 | ROCm 7.2でコンシューマRadeon対応。CUDAとの性能差10-30%に縮小 | 🟡中 | ThunderCompute |
| 15 | AWS Trainium2: H100比25%コストで同等性能。Trainium3は3nm、2.52 PFLOPS | 🟡中 | Silicon Canals |
| 16 | カスタムチップのAIチップ市場シェア: 2024年37%→拡大傾向 | 🟡中 | Rwazi Blog |
| 17 | Intel Ponte Vecchioはサンセット。Gaudi 3でニッチ路線に転換 | 🟡中 | VideoCardz |
| 18 | NVIDIAの売上構成変化: ゲーム51%→6%、データセンター25%→88%（2020→FY2025） | 🟢高 | NVIDIA決算 |
| 19 | Modular Mojo: Chris Lattner開発、Python構文でNVIDIA/AMD両対応 | 🟡中 | Modular |
| 20 | ITリーダーの88.8%が「単一ベンダー支配は望ましくない」と回答 | 🟡中 | CUDO Compute |
| 21 | CUDAはAI開発フレームワーク市場シェア約92% | 🟡中 | AMI Next |

## 信頼度集計
- 🟢高: 9件
- 🟡中: 12件
- 🔴低: 0件

## 欠落確認
- 3方向（基本/対立/背景）すべてカバー済み ✓
- 🟢高 8件以上 ✓（9件）
- 🟡中 5件以上 ✓（12件）
