# Research 2b: 対立軸・比較・誤解されやすい点

## Wi-Fiはなぜ壁を越えると弱くなるのか

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | **5GHzは常に2.4GHzより優れているわけではない**: 2.4GHz帯は波長が長く（約12.5cm）、壁やフロアを5GHz帯（波長約6cm）より効果的に透過する。コンクリート壁の減衰は2.4GHzで約23dB、5GHzで約45dBと倍近い差がある。広い家や壁が多い環境では2.4GHzの方が実用的に優れる場面が多い。 | 🟡 | [iBwave Blog - Attenuation Across Materials](https://blog.ibwave.com/a-closer-look-at-attenuation-across-materials-the-2-4ghz-5ghz-bands/), [Intel - 2.4 vs 5GHz](https://www.intel.com/content/www/us/en/products/docs/wireless/2-4-vs-5ghz.html) |
| 2 | **「高性能ルーターなら壁は関係ない」は誤解**: FCCの規制により、2.4GHz/5GHz帯の民生用ルーターのEIRP上限は36dBm（約4W）。10年前の高性能ルーターも最新ルーターも送信電力の上限は同じ。さらにWi-Fiは双方向通信であり、ルーターの出力を上げてもスマホ側の送信電力（通常15mW程度）がボトルネックとなるため、ルーター側だけ強くしても改善しない。 | 🟡 | [Metis.fi - 8 reasons to turn down transmit power](https://metis.fi/en/2017/10/txpower/), [AIR802 - FCC Rules](https://www.air802.com/fcc-rules-and-regulations.html) |
| 3 | **ビームフォーミングは壁を貫通させる技術ではない**: ビームフォーミングは電波を特定のデバイスに向けて集中させる技術だが、物理的な壁の減衰を克服するものではない。MU-MIMOも空間的な分離が必要で、クライアントが数cm動くだけで最適条件が崩れる。Wi-Fi 5のMU-MIMOはダウンリンクのみ対応、Wi-Fi 6でも最大8台の同時接続が上限。 | 🟡 | [Network World - 10 limitations of MU-MIMO](https://www.networkworld.com/article/970406/10-limitations-of-mu-mimo-in-wi-fi.html) |
| 4 | **メッシュWi-Fiはホップごとに帯域が半減する**: デュアルバンドメッシュで無線バックホールを使う場合、ホップ（中継）ごとに帯域幅が約半分に低下する。レイテンシもホップ数に比例して増加。バックホール通信とクライアント通信が同じ帯域を共有するため、Netflix・ビデオ通話・IoT機器すべてが帯域を奪い合う。有線バックホールを使えばこの問題は解消される。 | 🟡 | [Dong Knows Tech - Mesh Wi-Fi 101](https://dongknows.com/mesh-wi-fi-system-explained/), [XDA - Mesh Wi-Fi backhaul problem](https://www.xda-developers.com/mesh-wi-fi-wired-backhaul-problem/) |
| 5 | **Wi-Fi vs 有線LAN: レイテンシに決定的な差がある**: 実測で有線LAN（Cat6）の平均ping 16ms・ジッター7msに対し、Wi-Fiは平均ping 60ms・ジッター20ms。Wi-Fi 6でもレイテンシは約1msが下限で、有線の安定性には及ばない。有線は物理障害物や電波干渉の影響を受けず、300フィート離れても速度が変わらない。 | 🟡 | [How-To Geek - Wi-Fi vs Ethernet](https://www.howtogeek.com/217463/wi-fi-vs.-ethernet-how-much-better-is-a-wired-connection/), [Lightyear.ai - Ethernet vs WiFi Latency](https://lightyear.ai/tips/ethernet-versus-wifi-latency) |
| 6 | **壁の素材で減衰量は桁違いに変わる（見通し内 vs 見通し外）**: 石膏ボード/乾式壁は3~5dBの減衰だが、コンクリート壁は23~55dB、鉄筋コンクリートや金属はほぼ遮断レベル。木材・プラスチック・普通ガラスは低吸収、着色ガラス・レンガ・しっくいは中吸収、金属・鉄筋コンクリート・セラミックスは高吸収に分類される。見通し内（LOS）と見通し外（NLOS）で信号品質は劇的に異なる。 | 🟡 | [Wi-Fi Vitae - Wall Attenuation Measurements](https://wifivitae.com/2021/12/15/wall-attenuation/), [Network Academy - RF in Real World](https://www.networkacademy.io/ccna/wireless/radio-signals-in-real-world-environments) |
| 7 | **2.4GHz帯は電子レンジ・Bluetooth・隣家Wi-Fiの三重苦**: 電子レンジは2.4GHz帯の電磁波を放射し、Wi-Fi速度を最大半分に低下させる。Bluetoothも同じ2.4GHz帯だが周波数ホッピング（毎秒数百回）により影響は限定的。最大の問題は隣家Wi-Fiとのチャネル競合で、2.4GHz帯の重複しないチャネルは1・6・11の3つしかない。集合住宅では数十のネットワークがこの3チャネルを奪い合う。 | 🟡 | [AT&T - WiFi Interference](https://www.att.com/internet/wifi-interference-things-that-block-wifi-signals/), [XDA - Smart home devices channel fighting](https://www.xda-developers.com/your-smart-home-devices-are-all-fighting-for-the-same-wi-fi-channel/), [Wikipedia - 2.4 GHz radio use](https://en.wikipedia.org/wiki/2.4_GHz_radio_use) |
| 8 | **アンテナが多い≠必ず速い**: アンテナ数の増加は理論上カバレッジの死角を減らすが、一般家庭環境ではその差は「完全に無視できるレベル」（LYNwave社の検証）。速度向上はアンテナ数ではなくMIMOの構成（1T2R, 2T2R, 3T3R等）に依存する。SISOから2x2 MIMOで約30%、2x2から4x4で同程度の速度向上だが、線形的には増えない。クライアント側のアンテナ数がボトルネックになることも多い（スマホは通常2本）。 | 🟡 | [LYNwave - Router Antenna Explained](https://lynwave.com/en/technology/the-more-antennas-for-router-the-better), [Waveform - MIMO Antenna Guide](https://www.waveform.com/a/b/guides/mimo-antenna-guide) |
| 9 | **Wi-Fi 6E/7の6GHz帯は壁にさらに弱い**: 6GHz帯は5GHz帯よりも壁透過性が悪い。実測でドライウォール越し30ftの場合、5GHzが-79dBm、6GHzが-74dBm。60ft＋複数壁＋コンクリートエレベーターシャフト越しでは5GHzが-88dBm、6GHzが-93dBm。6GHz帯はルーターと同じ部屋にいるときに最も効果を発揮し、壁越しの利用には不向き。 | 🟡 | [SNBForums - 6GHz concrete wall penetration](https://www.snbforums.com/threads/6ghz-reinforced-concrete-wall-penetration.93180/), [MinewSemi - 2.4GHz vs 5GHz vs 6GHz](https://en.minewsemi.com/blog/24ghz-vs-5ghz-vs-6ghz-wifi-understanding-the-differences-between-wifi-frequency-bands) |
| 10 | **5GHzは壁透過が弱いが反射には強い**: 5GHz帯は壁を透過しにくい一方、壁面での反射性が高い。密閉された一つの部屋内では、反射波が効率的にデバイスに届くため、2.4GHzより好成績を出す場合がある。つまり「5GHzが弱い」は常に正しいわけではなく、環境次第でLOS/NLOSの結果が逆転する。 | 🟡 | [Quora - 5GHz vs 2.4GHz wall penetration physics](https://www.quora.com/While-faster-5-GHz-Wi-Fi-signals-do-not-penetrate-walls-as-effectively-as-2-4-GHz-signals-What-is-the-actual-physical-explanation-for-this) |
| 11 | **Wi-Fiの出力を上げると逆効果になることがある**: 送信電力が高すぎると、隣接チャネルへの干渉が増大し、周囲のデバイスの通信を阻害する。また、クライアントが遠い低品質APに接続し続ける「スティッキークライアント問題」が発生する。複数の低出力APを分散配置する方が、1台の高出力ルーターより優れた結果を出す。 | 🟡 | [Metis.fi - 8 reasons to turn down transmit power](https://metis.fi/en/2017/10/txpower/) |
| 12 | **MU-MIMOのフル活用にはクライアント側に8本のアンテナが必要**: Wi-Fi 6のMU-MIMO機能を最大限に活用するには端末側に8本のアンテナが必要だが、スマートフォンやタブレットにそれだけのアンテナを搭載するのはコスト・スペース的に非現実的。アップリンクMU-MIMOでも最低2本のアンテナが端末側に必要。理論値と実用値のギャップが大きい技術である。 | 🟡 | [Network World - 10 limitations of MU-MIMO](https://www.networkworld.com/article/970406/10-limitations-of-mu-mimo-in-wi-fi.html) |

## まとめ

Wi-Fiの壁越え性能に関しては、以下の重要な対立軸と誤解が存在する:

### 周波数帯の選択は万能ではない
- 5GHz/6GHzは速いが壁に弱く、2.4GHzは壁に強いが干渉に弱い。「とりあえず5GHzにすればOK」は誤り
- 6GHz帯（Wi-Fi 6E/7）は最も壁に弱く、同室内でのみ真価を発揮する

### ハードウェアのスペックに過度な期待は禁物
- ルーターの出力はFCC規制で上限があり、高級機でも電波出力は変わらない
- Wi-Fiは双方向通信のため、クライアント側（スマホ等）の送信能力がボトルネットになる
- アンテナ数・MIMO・ビームフォーミングは壁の物理的減衰を克服する技術ではない
- MU-MIMOは理論値と実際の性能差が大きく、端末側のアンテナ数が制約となる

### メッシュWi-Fiは銀の弾丸ではない
- 無線バックホールではホップごとに帯域が半減し、レイテンシも増加する
- 有線バックホールを使わない限り、根本的な解決にはならない

### 壁の素材が決定的要因
- 石膏ボード（3~5dB）とコンクリート（23~55dB）では減衰量に10倍以上の差
- 日本の鉄筋コンクリートマンションは特にWi-Fiに不利な環境

### 有線LANは依然として最強の選択肢
- レイテンシ・安定性・ジッターすべてで有線LANがWi-Fiに圧勝
- ゲーミング・ビデオ会議・大容量転送には有線が依然推奨される
