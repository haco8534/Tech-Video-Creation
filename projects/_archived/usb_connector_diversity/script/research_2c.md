# リサーチチェックポイント：背景・深掘り情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 2009年にGSMAとOMTPが、Micro-USBを携帯電話の充電統一規格として採用。14社がEU向けMoUに署名。ITUも承認 | 🟢高 | Wikipedia OMTP, GSMA, The Guardian |
| 2 | EU共通充電器指令(2022/2380): 2024年12月28日からUSB-C充電を義務化（スマホ・タブレット等）。ノートPCは2026年4月28日から | 🟢高 | europa.eu, Granite River Labs |
| 3 | EUの推定では、不要な充電器は年間11,000〜13,000トンの電子廃棄物を生み出している。USB-C統一で消費者は年間約2.5億ユーロ節約 | 🟢高 | europa.eu, Nemko |
| 4 | USB-Cの電源ピンは「データピンより先に接続される」設計。データラインに電力が流れてショートするのを防ぐ安全機構 | 🟢高 | SparkFun USB connector guide |
| 5 | USB-CのCC（Configuration Channel）ピンがケーブルの向きを自動検知し、電源供給能力をネゴシエーションする。これがリバーシブルの技術的基盤 | 🟢高 | AllAboutCircuits, Cambrionix |
| 6 | USB-Cの「Alternate Mode」により、DisplayPort、HDMI、PCIe等のUSB以外のプロトコルも同じコネクタで伝送可能。SBUピンがこれを担う | 🟢高 | SparkFun, Wikipedia USB-C |
| 7 | USB-IFのリネーム方針は「エンジニアが1つの仕様書で全世代を参照できるようにする」のが目的だったが、消費者にとっては混乱の元 | 🟡中 | CNET, Total Phase |
| 8 | USBのホスト・デバイス構造は「Tiered Star Topology」で、最大127台のデバイスを接続可能。USBハブがこの階層構造を実現 | 🟢高 | USB-IF仕様書, Wikipedia |
| 9 | インドや台湾もEUに倣いUSB-C統一の検討を開始。グローバルな統一の流れが加速中 | 🟡中 | Compliance and Risks, Granite River Labs |
| 10 | USB Power Delivery: USB-Cのみ対応。5V/9V/15V/20V/48Vの電圧交渉が可能。最大240W（48V×5A, USB PD 3.1 EPR） | 🟢高 | Acroname, USB-IF公式 |

## まとめ・所感

背景として最も重要なのは「規格統一は技術だけでは達成できない。政治（EU法規制）と業界合意（GSMA/OMTP）の両方が必要だった」という視点。USBの歴史は技術進化だけでなく、業界横断の政治的な標準化闘争の歴史でもある。USB-CのCC/SBUピンの仕組みは技術的に非常に面白く、「なぜリバーシブルにできたのか」の説明に使える。
