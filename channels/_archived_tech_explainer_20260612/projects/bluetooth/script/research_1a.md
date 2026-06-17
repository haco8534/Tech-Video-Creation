# research_1a：主流・肯定情報

## Bluetoothの基本仕様

| # | ファクト | 信頼度 | 出典 | 備考 |
|---|---------|--------|------|------|
| 1 | Bluetoothは2.4 GHzのISM帯（2400〜2483.5 MHz）を使用する | 🟢 | Bluetooth Core Specification | 世界中で共通利用できる無線帯域 |
| 2 | 1998年にEricsson, IBM, Intel, Nokia, Toshibaの5社で Bluetooth SIG 設立 | 🟢 | Bluetooth SIG 公式 | 現在は3万社以上加盟 |
| 3 | 名称の由来は10世紀デンマーク王Harald Bluetooth Gormsson（諸部族を統一した） | 🟢 | Bluetooth SIG History | ロゴはルーン文字HとBの合字 |
| 4 | Bluetooth Classicは79本の1 MHz幅チャンネル、毎秒1600回のFHSS周波数ホッピング | 🟢 | Core Spec v5.x | 衝突回避の中核技術 |
| 5 | Bluetooth 1.2（2003年）でAdaptive Frequency Hopping (AFH)導入 | 🟢 | Core Spec v1.2 | Wi-Fi共存のため後付け |
| 6 | Bluetooth 4.0（2010年）でBluetooth Low Energy (BLE)導入。40本の2 MHz幅チャンネル | 🟢 | Core Spec v4.0 | Classicとは別物理層 |
| 7 | 電波出力クラス: Class 1（100 mW, ~100 m）, Class 2（2.5 mW, ~10 m）, Class 3（1 mW, ~1 m） | 🟢 | Core Spec | 大半のスマホ・イヤホンはClass 2 |
| 8 | 2.4 GHzは電子レンジ、Wi-Fi (b/g/n/ax)、無線LAN、ZigBee、コードレス電話と共有 | 🟢 | ITU-R | ISM帯の宿命 |
| 9 | LE Audio（Bluetooth 5.2, 2020年）でLC3コーデック標準化。Auracastも追加 | 🟢 | Bluetooth SIG | Classic Audio置き換え予定 |
| 10 | Bluetoothプロファイル: A2DP（音楽）, HFP（通話）, AVRCP（操作）, HID（入力）等 | 🟢 | Bluetooth SIG | プロファイル別に仕様策定 |
| 11 | 2.45 GHzは電子レンジが使う周波数（水分子の振動と一致） | 🟢 | FCC, ITU | ISM帯の歴史的経緯 |
| 12 | Bluetooth 5.0（2016）でLE 2M PHY、Long Range（Coded PHY）追加 | 🟢 | Core Spec v5.0 | 速度優先 or 距離優先 |

## Bluetoothの普及

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 13 | 年間Bluetooth対応機器の出荷数は約50億台超（2023年時点） | 🟡 | ABI Research, Bluetooth SIG Market Update |
| 14 | Apple AirPodsの登場（2016年）でTWS（True Wireless Stereo）市場が急拡大 | 🟢 | 業界レポート |
| 15 | Bluetooth対応スマートフォン普及率はほぼ100%（先進国） | 🟢 | 各種市場調査 |

## 不安定さの主要要因（教科書的説明）

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 16 | 2.4 GHz帯の干渉源: Wi-Fi（特に2.4GHz帯）, 電子レンジ, USB 3.0からの輻射, 蛍光灯, ベビーモニター | 🟢 | Intel White Paper "USB 3.0 Radio Frequency Interference" |
| 17 | USB 3.0は2.5〜2.6 GHz帯にノイズ輻射する（Intel公式文書） | 🟢 | Intel公式 |
| 18 | 人体は2.4 GHz帯の電波を強く吸収する（水分含有量が高いため） | 🟢 | ITU-R, 各種電波伝搬研究 |
| 19 | TWSイヤホンのアンテナは数mmサイズで、装着時に体液との結合で特性が変化 | 🟡 | 各種アンテナ設計論文 |
| 20 | Bluetooth Classicは接続指向プロトコル。一定時間応答がないとスーパービジョンタイムアウトで切断 | 🟢 | Core Spec |
