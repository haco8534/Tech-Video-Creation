# Research 2a: 基本情報・仕組み・通説

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | Wi-Fiの電波は電磁波の一種で、2.4GHz帯（波長約12.5cm）、5GHz帯（波長約6cm）、6GHz帯（波長約5cm）の周波数帯を使用する。波長が短いほど直進性が強く、障害物による減衰を受けやすい。 | 🟢 | [Intel - 2.4 GHz vs. 5 GHz vs. 6 GHz](https://www.intel.com/content/www/us/en/products/docs/wireless/2-4-vs-5ghz.html) |
| 2 | 電波の減衰メカニズムは主に5つ: (1) 自由空間損失（逆二乗則による拡散）、(2) 反射（金属・コンクリート等の大きな面で発生）、(3) 吸収（素材内部でエネルギーが熱に変換）、(4) 回折（壁の角や端で波が曲がる）、(5) 散乱（波長程度の凹凸面で乱反射）。 | 🟢 | [Wikipedia - Multipath propagation](https://en.wikipedia.org/wiki/Multipath_propagation); [Control Engineering - Wireless propagation fundamentals](https://www.controleng.com/wireless-propagation-fundamentals/) |
| 3 | フリスの伝達公式: FSPL(dB) = 20 log₁₀(d) + 20 log₁₀(f) + 20 log₁₀(4π/c)。距離が2倍になると電力は6dB（約1/4）減衰する（逆二乗則）。周波数が2倍になっても同様に6dB増加する。実用形: FSPL(dB) = 20 log₁₀(d_km) + 20 log₁₀(f_GHz) + 92.45。 | 🟢 | [Wikipedia - Free-space path loss](https://en.wikipedia.org/wiki/Free-space_path_loss); [Physics LibreTexts - Friis Transmission Equation](https://phys.libretexts.org/Courses/Kettering_University/Electricity_and_Magnetism_with_Applications_to_Amateur_Radio_and_Wireless_Technology/22:_Generation_and_Detection_of_Electromagnetic_Waves/22.11:_Friis_Transmission_Equation) |
| 4 | 素材別の5GHz帯における減衰量（NIST実測データ）: 合板/石膏ボード ≈ 0 dB、ガラス ≈ 0.07 dB、木材 ≈ 3.3 dB、レンガ ≈ 15.3 dB、コンクリート102mm ≈ 26 dB、レンガ+コンクリート ≈ 39.9 dB、鉄筋コンクリート ≈ 53.8 dB、コンクリート203mm ≈ 55.2 dB。 | 🟢 | [Eye Networks - WiFi signal loss by material（NIST研究データ）](https://eyenetworks.no/en/wifi-signal-loss-by-material/) |
| 5 | 2.4GHz帯と5GHz帯の素材別減衰量比較（iBwave実測）: 重量コンクリート 2.4GHz=22.8dB / 5GHz=44.8dB（差22dB）、石灰レンガ 2.4GHz=4.3dB / 5GHz=7.8dB、石膏ボード間仕切り 2.4GHz=5.4dB / 5GHz=10.1dB、チップボード 2.4GHz=0.5dB / 5GHz=0.8dB。高周波ほど減衰が大きい。 | 🟡 | [iBwave Blog - Attenuation Across Materials](https://blog.ibwave.com/a-closer-look-at-attenuation-across-materials-the-2-4ghz-5ghz-bands/) |
| 6 | マルチパス伝搬: 送信された電波は壁・天井・床・家具で反射し、複数の経路で受信アンテナに到達する。経路ごとに遅延・位相・振幅が異なるため、建設的干渉（信号増強）と破壊的干渉（フェージング）の両方が発生する。802.11n以降のMIMO技術はこのマルチパスを逆に利用して通信速度を向上させている。 | 🟢 | [Wikipedia - Multipath propagation](https://en.wikipedia.org/wiki/Multipath_propagation); [Electronics Notes - Multipath Radio Propagation](https://www.electronics-notes.com/articles/antennas-propagation/propagation-overview/multipath-propagation.php) |
| 7 | 日本の電波法における無線LAN出力制限: 2.4GHz帯は空中線電力0.58W以下（10mW/MHz密度制限あり）。5GHz帯は帯域幅により異なり、20MHz幅で10mW/MHz、40MHz幅で5mW/MHz、80MHz幅で2.5mW/MHz、160MHz幅で1.25mW/MHz（総電力は概ね200mW = 23dBm相当）。6GHz帯は低出力型（LPI）25mW以下と標準出力型（SP）200mW以下の2区分。 | 🟢 | [総務省 電波利用ポータル - 小電力データ通信システム](https://www.tele.soumu.go.jp/j/adm/system/ml/wlan/index.htm); [Wikipedia - 小電力データ通信システム](https://ja.wikipedia.org/wiki/%E5%B0%8F%E9%9B%BB%E5%8A%9B%E3%83%87%E3%83%BC%E3%82%BF%E9%80%9A%E4%BF%A1%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0) |
| 8 | IEEE 802.11ax（Wi-Fi 6/6E）は2.4/5/6GHz帯に対応し、OFDMA・1024-QAM・TWT等の技術を導入。IEEE 802.11be（Wi-Fi 7）は2.4/5/6GHz帯で最大320MHz幅チャネル・4096-QAM・マルチリンクオペレーションに対応し、理論最大速度46Gbps。いずれも壁透過性自体は改善せず、物理層の効率向上が主な改善点。 | 🟢 | [Wikipedia - Wi-Fi 7 (IEEE 802.11be-2024)](https://en.wikipedia.org/wiki/Wi-Fi_7); [Wikipedia - Wi-Fi 6](https://en.wikipedia.org/wiki/Wi-Fi_6) |
| 9 | 水は2.4GHz帯の電波を非常に強く吸収する。これは水分子の双極子回転が2.4GHz付近の周波数で共鳴的にエネルギーを吸収するためである（電子レンジと同じ原理）。そのため、水槽・人体（約60%が水）・湿った壁なども電波減衰の原因となる。 | 🟡 | [SignalBoosters - Materials that Block WiFi Signals](https://www.signalboosters.com/blog/materials-that-block-wifi-signals/); [Keenetic - Wi-Fi signal attenuation coefficients](https://help.keenetic.com/hc/en-us/articles/213968869-Wi-Fi-signal-attenuation-coefficients-when-passing-through-different-materials) |
| 10 | Low-Eガラス（低放射ガラス、断熱ペアガラス）は金属酸化物コーティングにより通常ガラス（≈0dB）と比べて約29dBもの追加減衰を引き起こす。近年の省エネ住宅で多用されるため、窓越しのWi-Fi伝搬が以前より困難になっている。 | 🟡 | [iBwave Blog - Attenuation Across Materials](https://blog.ibwave.com/a-closer-look-at-attenuation-across-materials-the-2-4ghz-5ghz-bands/) |
| 11 | 自由空間での2.4GHzと5GHzの損失差は約6.4dB（20 log₁₀(5/2.4) ≈ 6.4dB）。つまり障害物がなくても5GHz帯は2.4GHz帯より約6dB多く減衰する。これに壁の素材依存の周波数特性が加わり、コンクリート壁では合計差が20dB以上に達する。 | 🟢 | [Wikipedia - Free-space path loss](https://en.wikipedia.org/wiki/Free-space_path_loss) の公式から計算; [iBwave Blog](https://blog.ibwave.com/a-closer-look-at-attenuation-across-materials-the-2-4ghz-5ghz-bands/) |
| 12 | 5GHz帯の日本での利用制限: 5.2GHz帯（W52: ch36-48）と5.3GHz帯（W53: ch52-64）は屋内使用限定。5.6GHz帯（W56: ch100-144）はDFS（動的周波数選択）を条件に屋外使用可能。気象レーダーとの干渉回避のためDFS機能が義務付けられている。 | 🟢 | [総務省 電波利用ポータル](https://www.tele.soumu.go.jp/j/adm/system/ml/wlan/index.htm) |

## まとめ

Wi-Fi電波が壁を越えると弱くなる現象は、主に以下の物理メカニズムの複合作用である:

1. **自由空間損失（逆二乗則）**: 距離の2乗に反比例して電力が減衰する基本法則。壁の有無に関わらず発生する。
2. **素材による吸収**: 壁の素材がエネルギーを吸収する。コンクリートや鉄筋は特に大きな減衰（20-55dB）を引き起こす。木材や石膏ボードは比較的透過しやすい（0-5dB）。
3. **反射**: 金属面やコンクリートで電波が反射され、透過分が減少する。鉄筋コンクリートは反射と吸収の両方で大きく減衰させる。
4. **周波数依存性**: 高周波（5GHz/6GHz）は低周波（2.4GHz）より壁透過時の減衰が大きい。コンクリート壁では2.4GHz=23dB vs 5GHz=45dBと約2倍の差がある。
5. **マルチパスとフェージング**: 複数経路の干渉により信号が不安定になる。ただし現代のMIMO技術はこれを逆に活用する。
6. **水分の影響**: 壁の含水率や人体の水分も2.4GHz帯を中心に追加減衰を引き起こす。

動画台本においては、「壁の素材と厚さ」「周波数帯の選択」「距離」の3要素が実際の体感に大きく影響するという構造で整理すると分かりやすい。特にコンクリート vs 木造住宅、2.4GHz vs 5GHzの具体的な数値差は視聴者にインパクトのあるファクトとなる。
