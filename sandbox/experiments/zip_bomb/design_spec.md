# zip_bomb — design spec

## 1. event 一覧と割り当て

発生順。画面切替 event は各画面の先頭セリフに、内容 event は描く動きが起こる前後のセリフに紐付ける。

| event | 紐付くセリフ（画面・話者・抜粋で特定） | 発火する挙動 |
|---|---|---|
| `scene.intro.in` | 序論・めたん「ねえずんだもん、これ見て」 | 序論の画面がフェードイン |
| `intro.zip.in` | 序論・ずんだもん「サイズはたったの 42 キロバイト」 | 中央 HStack の左セルに `zip_icon` と「42 KB」ラベルが出る |
| `intro.expand` | 序論・ずんだもん「4500 兆バイトなのだ」 | 右セルに `arrow_ref` 描き起こし → `exec_grid(20×12)` が count 0→240 まで膨張、下に「4.5 PB」ラベル |
| `intro.ratio.flash` | 序論・ずんだもん「圧縮率にすると、およそ 1000 億倍」 | 「1000 億倍」のマゼンタ縁カードが下中央に出て、1拍スケール 1.0→1.15→1.0 |
| `intro.name` | 序論・ずんだもん「有名な zip 爆弾なのだ」 | `zip_icon` の上に「42.zip」名札 |
| `intro.compare.in` | 序論・ずんだもん「指示書は軽い、実行は重い」 | 「1000 億倍」が一段薄くなり、比較バー HStack（指示書／実行の 2 カード）が下から滑り上がる |
| `intro.compare.swap` | 序論・ずんだもん「同じ文字を 1 億回書け」 | 比較バーの「指示書」側の文言が「同じ文字を 1 億回書け」へ mix 連続変形 |
| `scene.body1.in` | ボディ1・ずんだもん「圧縮って、何をすることか」 | ボディ1 画面に切替 |
| `body1.string.in` | ボディ1・ずんだもん「ABCABCABCABCABC」 | 15 文字タイル列が左から count 駆動で出現 |
| `body1.copy.arrow` | ボディ1・ずんだもん「3 文字前にもどって 3 文字ぶんコピー」 | 先頭 3 タイル紺強調、後半 12 タイルにオレンジ縁、曲線 `arrow_ref` が後半→先頭へ描き起こし、コピー指示カードフェードイン |
| `body1.lz77.card` | ボディ1・めたん「LZ77 という呼び名」 | 下段左に「LZ77 (1977)」カードが滑り込む |
| `body1.deflate.card` | ボディ1・ずんだもん「ハフマン符号」 | 下段中央に「DEFLATE = LZ77 + ハフマン」カード追加 |
| `body1.limit.card` | ボディ1・ずんだもん「理論上、DEFLATE 1 段あたりの圧縮率の上限」 | 下段右に「1段あたり 最大 1032 倍」のマゼンタ縁カード、1拍スケール強調 |
| `scene.body2.in` | ボディ2・ずんだもん「ここで、設計が二つに分かれる」 | ボディ2 画面に切替 |
| `body2.recursive.expand` | ボディ2・ずんだもん「1 個の zip の中にたとえば 16 個」 | 左カラムに `zip_icon` 1 個、その下に 8 個の HStack が count 駆動で展開 |
| `body2.recursive.dots` | ボディ2・ずんだもん「これを 5 段重ねるのだ」 | 「× 5 段 = 約 100 万個」カード追加、底に `exec_grid(8×6)` |
| `body2.recursive.result` | ボディ2・ずんだもん「ほぼ 4.5 ペタバイト」 | 左カラム下部に結果ラベル「→ 4.5 PB」（オレンジ縁）フェードイン |
| `body2.recursive.defended` | ボディ2・ずんだもん「再帰的に展開する深さ」 | 左カラム末尾に「深さ上限で防御済」（緑縁）追加 |
| `body2.single.head` | ボディ2・ずんだもん「David Fifield」 | 右カラム見出し「単発型 / Fifield 2019」が現れる |
| `body2.single.arrows` | ボディ2・ずんだもん「ぜんぶ同じ位置を指す」 | 右カラムに本文 `zip_icon` と目次 4 行、4 本の `arrow_ref` が同じ点に時間差で収束描き起こし、最後の 1 本でマゼンタ光輪 |
| `body2.single.result` | ボディ2・ずんだもん「281 テラバイト」 | 結果ラベル「10 MB → 281 TB」（オレンジ縁） |
| `body2.single.bypass` | ボディ2・ずんだもん「深さの上限を 1 にしても、無傷で通り抜ける」 | 「深さ 1 で対策をすり抜け」（マゼンタ縁）が出て一拍スケール強調 |
| `scene.body3.in` | ボディ3・ずんだもん「zip 爆弾を受け取って、いちばん困るのは誰」 | ボディ3 画面に切替 |
| `body3.targets.in` | ボディ3・ずんだもん「自動的に中身を全部展開する側」 | 上段 HStack に 3 つの `target_card` が左から順にフェードイン、メーターは空 |
| `body3.meters.fill` | ボディ3・ずんだもん「CPU も食われる」 | 全 9 本のメーターが同時に 0→1 へ伸長、満タンでマゼンタ |
| `body3.defense.size` | ボディ3・ずんだもん「最大展開サイズ」 | 下段 VStack に「サイズ上限」「時間上限」の 2 枚（緑縁）が縦に積み上がる |
| `body3.defense.ratio` | ボディ3・ずんだもん「圧縮率そのものを警戒の合図」 | 3 枚目「圧縮率しきい値」（緑縁）追加、1拍強調 |
| `body3.defense.stream` | ボディ3・ずんだもん「展開しながら同時に検査」 | 4 枚目「ストリーミング検査」（緑縁）追加 |
| `scene.outro.in` | 結論・ずんだもん「もう一度、最初の数字に戻る」 | 結論画面に切替、上段に「非対称の核」（指示書 → 実行）が再登場 |
| `outro.family.lol` | 結論・ずんだもん「Billion Laughs」 | 中段に 1 枚目「zip 爆弾」と 2 枚目「Billion Laughs」family_card がフェードイン |
| `outro.family.redos` | 結論・ずんだもん「ReDoS という攻撃」 | 3 枚目「ReDoS」family_card が右に追加 |
| `outro.family.pulse` | 結論・ずんだもん「ぜんぶ、同じ家族の攻撃」 | 3 枚の家族カードに同期した紺の光輪パルスが 1 拍 |
| `outro.solution` | 結論・ずんだもん「指示書を最後まで実行しない」 | 下段に結語帯（緑縁、太め）フェードイン |

## 2. ライフサイクル契約

| オブジェクト | 所属画面 | 所属レイアウト | 誕生 | 死 | 出生元 | 退場先 |
|---|---|---|---|---|---|---|
| `intro_zip_icon` | 序論 | 画面の中央 HStack の左セル（指示書側 VStack 上段） | `intro.zip.in` | 画面退場 | 画面入場 | 画面退場 |
| `intro_kb_label` | 序論 | 同 左セル VStack 下段 | `intro.zip.in` + 短ディレイ | 画面退場 | `intro_zip_icon` の直下 | 画面退場 |
| `intro_arrow` | 序論 | 中央 HStack の中セル | `intro.expand` | 画面退場 | 左セル右端 → 右セル左端の派生計算 | 画面退場 |
| `intro_grid` | 序論 | 中央 HStack の右セル（実行側 VStack 上段）。count 駆動 | `intro.expand` | 画面退場 | 右セル中央 | 画面退場 |
| `intro_pb_label` | 序論 | 同 右セル VStack 下段 | `intro.expand` + 短ディレイ | 画面退場 | `intro_grid` の直下 | 画面退場 |
| `intro_ratio_card` | 序論 | 中央 HStack の直下、VStack 単独セル | `intro.ratio.flash` | `intro.compare.in` で減衰 | 中央 HStack の中軸上 | 比較バーの後ろへ |
| `intro_name_label` | 序論 | オーバーレイ層（`intro_zip_icon` の頭上） | `intro.name` | 画面退場 | `intro_zip_icon` 上端 | 画面退場 |
| `intro_compare_bar` | 序論 | 画面最下層 HStack 2 セル | `intro.compare.in` | 画面退場 | 画面下端から滑り上がり | 画面退場 |
| `body1_string_tiles` | ボディ1 | 上段 HStack of 15 文字タイル（count 駆動） | `body1.string.in` | 画面退場 | HStack 左端から | 画面退場 |
| `body1_copy_arrow` | ボディ1 | オーバーレイ層 | `body1.copy.arrow` | 画面退場 | 後半 12 文字タイル → 先頭 3 文字タイル | 画面退場 |
| `body1_copy_card` | ボディ1 | ストリング段 VStack 下端 | `body1.copy.arrow` | 画面退場 | コピー矢印終点近傍 | 画面退場 |
| `body1_lz77_card` | ボディ1 | 下段 HStack 左セル | `body1.lz77.card` | 画面退場 | HStack 左セル | 画面退場 |
| `body1_deflate_card` | ボディ1 | 下段 HStack 中セル | `body1.deflate.card` | 画面退場 | HStack 中セル | 画面退場 |
| `body1_limit_card` | ボディ1 | 下段 HStack 右セル | `body1.limit.card` | 画面退場 | HStack 右セル | 画面退場 |
| `body2_recursive_head` | ボディ2 | 上段 HStack 左カラム VStack の最上段 | `scene.body2.in` | 画面退場 | 左カラム上端 | 画面退場 |
| `body2_recursive_tree` | ボディ2 | 左カラム VStack 2 段目 | `body2.recursive.expand` | 画面退場 | 左カラム中央 | 画面退場 |
| `body2_recursive_dots` | ボディ2 | 左カラム VStack 3 段目 | `body2.recursive.dots` | 画面退場 | 左カラム中央 | 画面退場 |
| `body2_recursive_grid` | ボディ2 | 左カラム VStack 4 段目 | `body2.recursive.dots` | 画面退場 | 左カラム下寄り | 画面退場 |
| `body2_recursive_result` | ボディ2 | 左カラム VStack 5 段目 | `body2.recursive.result` | 画面退場 | 左カラム下寄り | 画面退場 |
| `body2_recursive_defended` | ボディ2 | 左カラム VStack 6 段目 | `body2.recursive.defended` | 画面退場 | 左カラム下端 | 画面退場 |
| `body2_single_head` | ボディ2 | 上段 HStack 右カラム VStack の最上段 | `body2.single.head` | 画面退場 | 右カラム上端 | 画面退場 |
| `body2_single_body` | ボディ2 | 右カラム VStack 2 段目 | `body2.single.arrows` | 画面退場 | 右カラム中央 | 画面退場 |
| `body2_single_index` | ボディ2 | 右カラム VStack 3 段目（4 行の細身カード） | `body2.single.arrows` | 画面退場 | 右カラム本文の直下 | 画面退場 |
| `body2_single_arrows` | ボディ2 | オーバーレイ層 | `body2.single.arrows` | 画面退場 | 目次の各行 → 本文の同じ一点 | 画面退場 |
| `body2_single_result` | ボディ2 | 右カラム VStack 5 段目 | `body2.single.result` | 画面退場 | 右カラム下寄り | 画面退場 |
| `body2_single_bypass` | ボディ2 | 右カラム VStack 6 段目 | `body2.single.bypass` | 画面退場 | 右カラム下端 | 画面退場 |
| `body3_targets` | ボディ3 | 上段 HStack の 3 セル | `body3.targets.in` | 画面退場 | 画面上半分 HStack の各セル | 画面退場 |
| `body3_meters` | ボディ3 | 各 `target_card` の内部（VStack 3 行） | `body3.targets.in` | 画面退場 | カード内 | 画面退場 |
| `body3_defenses` | ボディ3 | 下段 VStack（4 行） | `body3.defense.size` 〜 `body3.defense.stream` で 1 枚ずつ追加 | 画面退場 | 画面下半分 VStack | 画面退場 |
| `outro_core` | 結論 | 上段 HStack（指示書 → 矢印 → 実行グリッド） | `scene.outro.in` | 画面退場 | 画面上段 | 画面退場 |
| `outro_family` | 結論 | 中段 HStack の 3 セル | `outro.family.lol`（左 2 枚）〜 `outro.family.redos`（右 1 枚） | 画面退場 | 画面中段 HStack | 画面退場 |
| `outro_solution` | 結論 | 下段 VStack 単独セル | `outro.solution` | 画面退場 | 画面下段 | 画面退場 |

## 3. オブジェクト別 挙動メモ

### `intro_grid`（序論の実行タイルグリッド）
`intro.expand` で count 0 から 240 まで一気に増殖（60f 程度）。それ以降は 240 で保持。画面退場でフェードアウト。

### `intro_compare_bar`
`intro.compare.in` で画面下端から VStack 内の所定セルへ滑り上がる（opacity と y のオフセット 2 軸 Track）。`intro.compare.swap` で「指示書」側カードのラベル文字列を mix で連続変形（旧ラベル opacity 1→0 と新ラベル opacity 0→1 をクロスフェード）。

### `body1_copy_arrow`
`body1.copy.arrow` で曲線を `stroke-dasharray` 描き起こし（dashOffset を Track で 0→full に駆動）。30f 程度。

### `body2_single_arrows`
4 本の矢印を時間差で 1 本ずつ描き起こす。各矢印の dashOffset Track を 7f ずつずらす。最後の 1 本が刺さる瞬間にマゼンタ光輪（radius と opacity の 2 軸 Track で 1 拍）。

### `body3_meters`
9 本のメーターが `body3.meters.fill` で同期して 0→1 に伸びる（60f）。色は塗りの mix で「補助グレー」→「マゼンタ」へクロスフェード。

### `outro_family`
`outro.family.pulse` で 3 枚の `family_card` 同期して光輪パルス（radius 0→大→0、opacity 0→0.6→0、1 拍）。

## 4. 採否判断

- [x] design_overall の各画面の「動き」がすべて event に分解されている
- [x] 各 event が `script.md` の実在するセリフに紐付いている
- [x] 画面切替 event（`scene.X.in`）が各画面の先頭セリフに付いている（intro/body1/body2/body3/outro の 5 つ）
- [x] 内容 event は 28 個。全セリフのおよそ 25% 程度
- [x] event が一切付かないセリフが連続 4 行以上続く区間は無い（無音ストレッチ上限 3）
- [x] 全オブジェクトにライフサイクル契約（所属レイアウト・誕生・死・出生元・退場先）がある
- [x] 所属レイアウトは design_overall で定義された構造名か「オーバーレイ層」のいずれか
- [x] 出生元・退場先がすべて既存オブジェクトかレイアウトセルか画面入退場
- [x] 座標値・フレーム数値を書き込んでいない
