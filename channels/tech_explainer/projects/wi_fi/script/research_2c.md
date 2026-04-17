# Research 2c: 背景・深掘り情報

## テーマ: Wi-Fiはなぜ壁を越えると弱くなるのか

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | IEEE 802.11は1997年に策定され、2.4GHz帯のISMバンドを使用。ISMバンドは1947年のITU国際電気通信会議で確立され、電子レンジ（マグネトロン）用途として2.45GHzが割り当てられた。FCCが1985年にこの帯域を免許不要の拡散スペクトル通信に開放したことがWi-Fi誕生の土壌となった | 🟢 | [ISM radio band - Wikipedia](https://en.wikipedia.org/wiki/ISM_radio_band) / [IEEE 802.11 - Wikipedia](https://en.wikipedia.org/wiki/IEEE_802.11) |
| 2 | 5GHz帯は1999年のIEEE 802.11aで採用。2.4GHz帯の混雑（電子レンジ・Bluetooth・コードレス電話との干渉）を回避するため選ばれたが、周波数が高いほど壁の透過性が低下するトレードオフがある | 🟢 | [IEEE SA - The Evolution of Wi-Fi Technology and Standards](https://standards.ieee.org/beyond-standards/the-evolution-of-wi-fi-technology-and-standards/) |
| 3 | Wi-Fiの2.4GHzの波長は約12.5cm、5GHzは約6cm。可視光（波長380〜740nm）と同じ電磁波だが、波長が数万倍長いため壁などの固体を回折・透過できる。光が壁を通れずWi-Fiが通れるのは、この波長差による | 🟡 | [How Wi-Fi Works - McCann Tech](https://evanmccann.net/blog/wifi-101/how-wifi-works) / [Intel 2.4 vs 5 vs 6 GHz](https://www.intel.com/content/www/us/en/products/docs/wireless/2-4-vs-5ghz.html) |
| 4 | 建材別の電波減衰量: 石膏ボード（ドライウォール）は1dB未満、木材は5〜12dB、コンクリートは最大55dBの減衰。鉄筋コンクリート（RC造）は鉄筋が電波を反射し、コンクリートが吸収する二重の遮蔽効果を持つ | 🟢 | [Wi-Fi Vitae - Wall Attenuation Measurements](https://wifivitae.com/2021/12/15/wall-attenuation/) / [iBwave - Attenuation Across Materials](https://blog.ibwave.com/a-closer-look-at-attenuation-across-materials-the-2-4ghz-5ghz-bands/) |
| 5 | 日本の住宅構造とWi-Fi環境の関係: 木造住宅はナノレベルの微細な隙間があり電波が通りやすい。一方、タワーマンション等のRC造では各戸がコンクリート壁で囲まれ、隣室・上下階への電波が大幅に減衰する。マンションでは他世帯との電波干渉も問題となる | 🟡 | [NTTドコモ おうちネットプレス - 鉄筋コンクリート造の建物にWi-Fiが届かない理由](https://nttdocomo-ssw.com/nssw/dhkr/ouchinetpress/communication/article532/) |
| 6 | フレネルゾーン: Wi-Fi電波は直線ではなくフットボール型の楕円体で伝搬する。第1フレネルゾーンの60%以上が障害物から解放されていれば信号損失は0.5dB未満だが、60%を下回ると急激に減衰する。「見通し線が通っている」だけでは不十分で、その周囲の空間的余裕も重要 | 🟢 | [Fresnel zone - Wikipedia](https://en.wikipedia.org/wiki/Fresnel_zone) / [Cisco Meraki - The Fresnel Zone](https://meraki.cisco.com/blog/2018/02/the-fresnel-zone/) |
| 7 | 人体は約70%が水分で構成され、2.4GHzの電波を効率的に吸収する（誘電損失により熱に変換）。人体1体での遮蔽効果は数dB。研究では人の移動によりWi-Fiスループットが最大20.4%低下することが計測されている | 🟢 | [PMC - Human body shadowing effect on WSN in 2.4GHz](https://pmc.ncbi.nlm.nih.gov/articles/PMC6211019/) / [MDPI Electronics - Impact of People's Movement on Wi-Fi Link Throughput](https://www.mdpi.com/2079-9292/10/7/856) |
| 8 | 満員電車のような密集環境では、複数の人体が電波を吸収・散乱し、金属車体が多重反射を引き起こす。乗客密度が増加するほど伝搬損失と遅延拡散が増大し、Wi-Fi品質が著しく低下する | 🟡 | [ResearchGate - Wi-Fi Performance Measurements in the Crowded Office Environment](https://www.researchgate.net/publication/224694018_Wi-Fi_Performance_Measurements_in_the_Crowded_Office_Environment_a_Case_Study) / [Scientific.Net - Crowd Density Estimation with Wi-Fi Signal](https://www.scientific.net/AEF.33.33) |
| 9 | 電波暗室の原理: シールドルーム（金属板で6面を囲い電波を反射遮断）の内部に電波吸収体を設置した構造。吸収体はピラミッド型のカーボン含浸ウレタンフォームが主流で、先端から徐々にインピーダンスを変化させ（自由空間377Ω→0Ω）電波エネルギーを熱に変換する。低周波にはフェライトタイル、高周波にはカーボンピラミッドが使い分けられる | 🟢 | [TDK Tech-Mag - Radio wave absorbers and ferrite](https://www.tdk.com/en/tech-mag/ferrite02/011) / [Antenna Test Lab - What is an Anechoic Chamber](https://antennatestlab.com/antenna-education-tutorials/what-is-an-anechoic-chamber) |
| 10 | 5Gミリ波（28GHz/39GHz）は壁透過損失が極めて大きく、オフィスビルの内壁3枚で最大45.1dBの損失。対策としてビームフォーミング（電波を特定方向に集中照射）、スモールセル（小型基地局の高密度配置）、反射波の活用（MIMO）で直接見通し外でもカバーする。Wi-Fiの壁問題をさらに極端にした形 | 🟢 | [Justia Patents - 5G mmWave building penetration](https://patents.justia.com/patent/10784962) / [ResearchGate - Millimeter-Wave Beamforming for 5G](https://www.researchgate.net/publication/260524130_Millimeter-Wave_Beamforming_as_an_Enabling_Technology_for_5G_Cellular_Communications_Theoretical_Feasibility_and_Prototype_Results) |
| 11 | ルーター最適配置の科学的根拠: オムニアンテナは水平方向に強く垂直方向に弱い放射パターンを持つため、高さ1〜2mの設置が推奨。中央配置は全方向への距離を最小化し壁透過回数を減らす。床置きは信号が床に吸収され、家具による遮蔽も増えるためNG | 🟡 | [TP-Link - 6 Tips on Router Placement](https://www.tp-link.com/us/blog/87/6-tips-on-where-to-place-your-wireless-router-for-the-best-signal-coverage/) / [Netgear - Best WiFi Router Location](https://www.netgear.com/hub/wifi/routers/best-wifi-router-location/) |
| 12 | 電磁波の周波数と透過性の関係: 短い波長ほど物質中の分子を励起しやすく、エネルギーが熱として吸収される。2.4GHzは水分子の誘電緩和周波数帯に近く、水を含む物質（人体・生木・湿ったコンクリート）で特に減衰が大きい。これが電子レンジと同じ周波数帯である理由でもある | 🟡 | [Quora - Physical explanation for 5GHz vs 2.4GHz wall penetration](https://www.quora.com/While-faster-5-GHz-Wi-Fi-signals-do-not-penetrate-walls-as-effectively-as-2-4-GHz-signals-What-is-the-actual-physical-explanation-for-this) / [ScienceABC - How WiFi Signals Travel Through Walls](https://www.scienceabc.com/innovation/how-wifi-signals-travel-through-walls.html) |

## まとめ

Wi-Fiが壁を越えると弱くなる現象は、単純な「遮蔽」ではなく複数の物理メカニズムの複合作用である:

1. **反射**: 金属や鉄筋が電波を跳ね返す（シールドルームの原理と同じ）
2. **吸収**: コンクリート・水分・人体が電波エネルギーを熱に変換する（電波暗室の吸収体と同じ原理）
3. **回折損失**: フレネルゾーンの侵害により、障害物に触れなくても近傍を通過するだけで干渉が生じる
4. **周波数依存性**: 高周波ほど透過力が弱い（2.4GHz→5GHz→5Gミリ波の順に壁に弱くなる）

歴史的には、Wi-Fiが2.4GHz帯を使うのは電子レンジ用に確保されたISMバンドの「免許不要」という規制上の理由であり、建物透過に最適だから選ばれたわけではない。日本の住環境がRC造中心に変化したことで、木造時代には問題にならなかった電波減衰が日常的な課題となった。

動画では「Wi-Fiの電波も光も同じ電磁波なのに、なぜ光は壁を通れずWi-Fiは通れるのか？そしてなぜ弱くなるのか？」という導入から、電波暗室という「完全遮断」の極端な例と日常空間を対比させると、視聴者の理解が深まると考えられる。
