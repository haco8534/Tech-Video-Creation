# research：統合キーファクト一覧

調査日: 2026-04-25
コアテーマ: Bluetoothはなぜすぐ不安定になるのか

---

## 一次情報・確実度の高いファクト（🟢）

| # | ファクト | 出典 |
|---|---------|------|
| 1 | Bluetoothは2.4 GHz ISM帯（2400-2483.5 MHz）を使用 | Core Spec |
| 2 | 1998年Bluetooth SIG設立（Ericsson, IBM, Intel, Nokia, Toshiba） | Bluetooth SIG |
| 3 | 名称由来：10世紀デンマーク王Harald Bluetooth Gormsson | Bluetooth SIG History |
| 4 | Classic は79本×1MHz幅、毎秒1600回ホッピング | Core Spec |
| 5 | 2003年Bluetooth 1.2でAFH（Adaptive Frequency Hopping）追加 | Core Spec v1.2 |
| 6 | 2010年Bluetooth 4.0でBLE導入。Classicとは別物理層 | Core Spec v4.0 |
| 7 | 出力クラス: Class 1（100mW, ~100m）, Class 2（2.5mW, ~10m）, Class 3（1mW, ~1m） | Core Spec |
| 8 | 2.4GHz帯はWi-Fi, 電子レンジ, USB 3.0輻射, ZigBee等と共有 | ITU-R, Intel White Paper |
| 9 | USB 3.0は2.5-2.6 GHz帯にRFノイズ輻射する | Intel "USB 3.0 Radio Frequency Interference" |
| 10 | 人体は誘電損失により2.4 GHz帯電波を吸収 | 各種電波伝搬研究 |
| 11 | 1999年Bluetooth 1.0発表時、Wi-Fi 802.11bはまだ普及前 | 業界記録 |
| 12 | Core Spec v5.4は3000ページ超 | Bluetooth SIG |
| 13 | プロファイル数は30以上、独立に進化 | Bluetooth SIG |
| 14 | 2020年Bluetooth 5.2でLE Audio、LC3コーデック追加。Classic Audioと併存 | Core Spec v5.2 |
| 15 | Classic（BR/EDR）とLEは物理層が異なり、Dual-modeチップで両対応 | Core Spec |

---

## 通説と一次情報のズレ（🟢🟡）

| # | 通説 | 実態 |
|---|------|------|
| 16 | 「2.4GHzはBluetoothの選択ミス」 | 当時のグローバル共通ISM帯としては唯一の現実解 |
| 17 | 「Bluetoothは欠陥規格」 | 1998年時点では合理的設計。Wi-Fi爆発と利用形態変化が後から起きた |
| 18 | 「電子レンジ周波数は水分子の共鳴」 | 誤解。誘電損失による加熱で、共鳴周波数ではない |
| 19 | 「最新コーデックで安定する」 | コーデックは音質に作用、リンク安定性とは独立 |
| 20 | 「Bluetoothなら何でも繋がる」 | プロファイル一致が必要。ClassicとLEは別物 |

---

## 主因・副因の切り分け

**主因: 物理層・無線環境の問題**
- 2.4 GHz共有帯域の混雑（Wi-Fi/電子レンジ/他Bluetooth/USB3.0輻射）
- 人体吸収（特にTWSイヤホンとスマホの位置関係）
- 小型アンテナの物理的限界（イヤホンアンテナ数mm）

**副因: プロトコル設計**
- 接続指向プロトコル（一定時間応答なしで切断）
- プロファイル切替（A2DP↔HFP）による品質変動
- ペアリング状態管理（スタックの実装ばらつき）

**根本背景: 歴史的負債**
- 1999年設計→25年で継ぎ足し進化
- Classic/BLE/LE Audio/Mesh 併存
- 仕様書3000ページ超の複雑性

---

## 動画コアメッセージ

> Bluetoothの不安定さは「技術の失敗」ではなく、25年前の設計が現代の無線環境と利用形態に追いついていない**構造問題**である。物理層の制約・人体・小さなアンテナ・25年分の地層、これらが重なって「すぐ不安定になる」現象を作っている。
