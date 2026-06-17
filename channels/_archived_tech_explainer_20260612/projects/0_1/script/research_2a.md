# リサーチ2a: 基本情報・仕組み・通説

## テーマ: 0と1だけでなぜ動画や音楽が再生できるのか

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | A/D変換は「標本化（サンプリング）→ 量子化 → 符号化」の3段階で行われる。標本化で時間軸を離散化し、量子化で振幅を有限段階に丸め、符号化で0/1のビット列に変換する | 🟢高 | [Monolithic Power Systems - ADC基本概念](https://www.monolithicpower.com/jp/learning/mpscholar/analog-to-digital-converters/introduction-to-adcs/fundamental-concepts)、[情報試験対策室 - 標本化・量子化](https://joho-taisaku.com/sampling/) |
| 2 | ナイキスト-シャノンの標本化定理: 元の信号に含まれる最大周波数の2倍を超えるサンプリング周波数で標本化すれば、元の連続信号を完全に復元できる。このサンプリング周波数の半分を「ナイキスト周波数」と呼ぶ | 🟢高 | [Wikipedia - 標本化定理](https://ja.wikipedia.org/wiki/%E6%A8%99%E6%9C%AC%E5%8C%96%E5%AE%9A%E7%90%86)、[e-Words - 標本化定理](https://e-words.jp/w/%E6%A8%99%E6%9C%AC%E5%8C%96%E5%AE%9A%E7%90%86.html) |
| 3 | CD音質はPCM方式で、サンプリング周波数44.1kHz・量子化ビット数16bitで記録される。毎秒44,100回の測定を行い、各サンプルを65,536段階（2^16）で表現する。ダイナミックレンジは約96dB | 🟢高 | [e-Words - PCM](https://e-words.jp/w/PCM.html)、[東京大学 HWB - デジタル・アナログの変換と音声の符号化](https://hwb.ecc.u-tokyo.ac.jp/wp/information-2/coding/multimedia/sound/) |
| 4 | CDのサンプリング周波数44.1kHzは、標本化定理に基づき人間の可聴域上限（約20kHz）の2倍以上に設定されている。ナイキスト周波数は約22.05kHzとなり、可聴域全体をカバーする | 🟢高 | [マルツセレクト - オーディオに使用される周波数](https://www.marutsu.co.jp/select/list/detail.php?id=187)、[インターフェイス株式会社 - 音声のデジタル化方式](https://itf.co.jp/tech/usb-audio/how-to-convert) |
| 5 | 2進数は「0」と「1」の2種類の数字のみを使い、桁上がりで任意の大きさの数を表現する。nビットで2^n通りの値を表現可能（8bit=256通り、16bit=65,536通り、24bit=16,777,216通り）。コンピュータでは電気信号のON/OFFに対応させることで物理的に実装される | 🟢高 | [東京エレクトロン nanotec museum - 2進数とは](https://www.tel.co.jp/museum/exhibition/principle/binary-number.html)、[Wikipedia - 二進法](https://ja.wikipedia.org/wiki/%E4%BA%8C%E9%80%B2%E6%B3%95) |
| 6 | デジタル画像はピクセル（画素）の2次元配列で構成される。各ピクセルはRGB（赤・緑・青）3チャンネルの色情報を持ち、一般的に各チャンネル8bit（256階調）、合計24bit（約1,677万色）で1色を表現する | 🟢高 | [Wikipedia - 色深度](https://ja.wikipedia.org/wiki/%E8%89%B2%E6%B7%B1%E5%BA%A6)、[数理超入門部 - デジタル画像の構造](https://algorithm.joho.info/image-processing/digital-imaging/) |
| 7 | デジタル動画は静止画（フレーム）の連続再生で実現される。フレーム間圧縮では、基準フレーム（Iフレーム）に対して変化した部分だけを記録する予測フレーム（Pフレーム）・双方向予測フレーム（Bフレーム）を使い、時間的冗長性を除去して大幅に圧縮する | 🟢高 | [AWS ブログ - 動画圧縮の裏側で使われる仕組み](https://aws.amazon.com/jp/blogs/news/jpmne-back-to-basic-what-mechanisms-are-used-behind-the-scenes-in-video-compression/)、[Wikipedia - フレーム間予測](https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E9%96%93%E4%BA%88%E6%B8%AC) |
| 8 | 人間の可聴域は約20Hz〜20,000Hz。ただし加齢により高周波の聴力から低下し、大半の成人の上限は約15,000Hz。最も感度が高いのは3,000Hz付近 | 🟢高 | [Wikipedia - 聴覚](https://ja.wikipedia.org/wiki/%E8%81%B4%E8%A6%9A)、[日本建設業連合会 - 可聴周波数帯域](https://www.nikkenren.com/kenchiku/sound/pdf/glossary/ka-0200.pdf) |
| 9 | 人間の視覚の時間分解能は平均約65Hz。映画は24fps、テレビ放送は30fps（NTSC）/25fps（PAL）、ゲームは60〜120fpsが一般的。ただし眼球の認識はフレーム方式ではなく、無意識レベルではより高い変化も感知できる | 🟡中 | [オレ的ゲーム速報 - 人間の視覚fps](http://jin115.com/archives/52361616.html)、[CyberLink - フレームレート解説](https://jp.cyberlink.com/blog/video-effects/2082/how-to-set-frame-rate) |
| 10 | MP3はMPEG-1 Audio Layer IIIの略で、心理音響モデルに基づく非可逆圧縮。マスキング効果（大きな音の近くの小さな音が聞こえにくくなる現象）を利用し、人間に聞こえない成分を削除することで元の約1/10にデータ圧縮できる | 🟢高 | [Wikipedia - 音声圧縮](https://ja.wikipedia.org/wiki/%E9%9F%B3%E5%A3%B0%E5%9C%A7%E7%B8%AE)、[white croquis - デジタルオーディオの仕組み](https://align-centre.hatenablog.com/entry/2014/04/28/222154) |
| 11 | JPEGは画像を8x8ピクセルのブロックに分割し、離散コサイン変換（DCT）で空間周波数成分に変換後、人間の目が鈍感な高周波成分を削減して圧縮する。人間の視覚は「明るさの変化に敏感・色の変化に鈍感」「低周波に敏感・高周波に鈍感」という特性を利用 | 🟢高 | [大阪大学 - DCTとJPEG](http://www.image.med.osaka-u.ac.jp/member/yoshi/ics_lecture/multi_media/handout_2011/multi_media05-dct_jpeg_handout.pdf)、[算数・数学大全 - 画像圧縮の数学的原理](https://math-pedia.com/archives/jpeg-compression-mathematics.html) |
| 12 | H.264（2003年勧告）はMPEG-2の2倍以上の圧縮効率を実現。H.265/HEVC（2013年承認）はさらにH.264の2倍の圧縮率を達成。H.265はブロックサイズを変化の大小に応じて可変にすることで効率を向上させた | 🟢高 | [Wikipedia - H.264](https://ja.wikipedia.org/wiki/H.264)、[e-con Systems - H.264 vs H.265](https://www.e-consystems.com/blog/camera/ja/technologies/comprehensive-study-h-264-vs-h-265-compression-in-embedded-vision/) |
| 13 | PCM（パルス符号変調）は1937年に英国の技術者アレック・リーブス（Alec Reeves）が発明。1938年にフランスで特許取得、1942年に米国特許取得。当時の真空管技術では実用化困難で、トランジスタの発明後1950年代に商用化。1965年にフランクリン研究所からスチュアート・バランタイン賞を受賞 | 🟢高 | [ETHW - Pulse Code Modulation](https://ethw.org/Pulse_Code_Modulation)、[IEEE-USA InSight - PCM 75 Years](https://insight.ieeeusa.org/articles/your-engineering-heritage-pulse-code-modulation-it-all-started-75-years-ago-with-alec-reeves/) |
| 14 | PCMは第二次世界大戦中、連合国の秘密通信システム「SIGSALY」で軍事利用された。ルーズベルト大統領とチャーチル首相の秘話通信に使用され、これがデジタル通信の最初期の実用例の一つとなった | 🟢高 | [historictech - Alec Reeves, PCM and the Birth of Digital Communication](https://historictech.com/alec-reeves-pcm-and-the-birth-of-digital-communication/)、[Wikipedia - Pulse-code modulation](https://en.wikipedia.org/wiki/Pulse-code_modulation) |
| 15 | 電話音声は帯域4kHz以下に制限されており、標本化定理に従い8kHzでサンプリングすれば十分に復元できる。PCMの最初の広範な商用利用は長距離電話回線の多重化であり、アナログ伝送より多くの音声回線を高品質で1本の電話線に収容可能にした | 🟢高 | [e-Words - PCM](https://e-words.jp/w/PCM.html)、[IPSJ情報処理カタログ - AD変換](https://ipsj-catalog.jp/glossary/parlance/06.html) |

## まとめ

0と1だけで動画や音楽が再生できる根本原理は、以下の3つの柱に集約される。

**第1の柱: アナログからデジタルへの変換理論**
ナイキスト-シャノンの標本化定理（1949年に理論化）により、連続的なアナログ信号は「最大周波数の2倍以上のレートでサンプリング」すれば情報を失わず離散化できることが数学的に証明された。これにより、音や光といった連続的な自然現象を、有限個の数値の列として完全に記録・復元する理論的基盤が確立された。

**第2の柱: 2進数による普遍的な数値表現**
0と1の2状態は、電気のON/OFFという最もシンプルな物理状態に対応する。ビット数を増やすことで任意の大きさの数を表現でき（nビットで2^n通り）、音の振幅も色の強さもすべて数値として表現可能になる。CD音質では16bit=65,536段階、フルカラー画像では24bit=約1,677万色というように、人間の知覚を十分に超える精度でアナログ量をデジタル数値に置き換えている。

**第3の柱: 人間の知覚限界を活用した圧縮技術**
MP3は「マスキング効果」（大きな音の近くの小さな音が聞こえない）、JPEGは「高周波の色変化に鈍感」、H.264/H.265は「フレーム間の微小変化を知覚しにくい」という人間の感覚特性を利用して、知覚的に不要な情報を削除する。これにより膨大なデジタルデータを実用的なサイズに圧縮し、ストリーミング配信やスマートフォン再生を可能にしている。

歴史的には、1937年のアレック・リーブスによるPCM発明が出発点であり、トランジスタの発明（1947年）を経て1950年代に商用化、1982年のCD登場で一般消費者にデジタルオーディオが普及し、1990年代以降のMP3・JPEG・MPEGの登場でマルチメディアのデジタル化が完成した。
