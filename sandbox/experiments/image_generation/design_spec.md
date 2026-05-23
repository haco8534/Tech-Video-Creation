# 03_画像生成AI — design spec

## 1. event 一覧と割り当て

| event | 紐付くセリフ（画面・話者・抜粋） | 発火する挙動 |
|---|---|---|
| `scene.intro.in` | 序論・めたん「ねえずんだもん」 | 序論画面のフェードイン開始 |
| `canvas.intro.in` | 序論・めたん「プロンプトに「猫の写真」って打つと」 | Canvas が中央に描き起こされる |
| `cat.intro.in` | 序論・めたん「ぱっと描いてる感じかしら」 | Cat（リネアート）が Canvas 内に一筆で描き起こされる |
| `title.intro.in` | 序論・ずんだもん「画像生成AIはね、一発で絵を当てる」 | 大見出し「画像生成AI」が Canvas 上にフェードイン |
| `subcards.intro.in` | 序論・ずんだもん「主役は二つ。拡散モデルと、自己回帰モデル」 | サブカード 2 枚が Canvas の下に左右対称で滑り出る |
| `labels.intro.in` | 序論・めたん「聞いたことはあるわ。Stable Diffusion」 | 左サブカードに「拡散モデル」(DIFFUSION)、右に「自己回帰モデル」(AUTOREG) のラベルがフェードイン |
| `sublink.intro.in` | 序論・ずんだもん「同じ作戦の、軸違いなのだ」 | サブカード間を結ぶ薄い水平線が引かれる |
| `scene.body1.in` | ボディ1・ずんだもん「画像って、コンピューターから見ると」 | ボディ1 画面のフェードイン。序論の全要素が一掃 |
| `grid.body1.in` | ボディ1・ずんだもん「マスの数は、約100万個」 | Canvas 内に薄い格子（仮の PatchGrid）が一斉に出る |
| `cells.body1.color` | ボディ1・ずんだもん「1マスで約1600万通り」 | 格子の左上の数マスが順次違う色で点灯 |
| `noise.body1.fill` | ボディ1・めたん「想像つかないわね」 | 格子と色付きマスが消え、Canvas 内側が NoiseField（純粋砂嵐）で埋まる |
| `haze.body1.in` | ボディ1・ずんだもん「ザーザーの砂嵐に見える絵」 | CombinationsHaze が Canvas の外側へ広がり始める |
| `dot.body1.in` | ボディ1・ずんだもん「ごく小さな点」 | CombinationsHaze の中央に SUBJECT 色の点が一つ現れる |
| `tone.body1.down` | ボディ1・ずんだもん「無謀なのだ」 | Canvas と CombinationsHaze 全体がトーンダウン |
| `scene.body2.in` | ボディ2・ずんだもん「捨てた代わりに、こう考え直したのだ」 | ボディ2 画面のフェードイン。ボディ1 の全要素が一掃 |
| `beads.body2.in` | ボディ2・ずんだもん「易しい一手のくり返し」 | StepBeads（4 個）が中央に空の状態で順次フェードイン |
| `beads.body2.light` | ボディ2・ずんだもん「少しだけ寄せる、を何度も」 | StepBeads が左から順に SUBJECT 色で点灯 |
| `beads.body2.full` | ボディ2・ずんだもん「一発当ての無謀を、易しい一手の連鎖に置き換えた」 | 4 個全部が点灯し、ひと呼吸止まる |
| `dual.body2.in` | ボディ2・ずんだもん「二つの仕組みがあるのだ」 | StepBeads が上方に縮みながら退き、2 枚の Canvas が左右対称に滑り出る |
| `noise.body2.fill` | ボディ2・ずんだもん「ぜんぶがザーザーの砂嵐から始まる」 | 左 Canvas 内側が NoiseField で埋まる |
| `noise.body2.thin` | ボディ2・ずんだもん「ザラつきを、少しだけ薄める」 | 左 Canvas の NoiseField が少しだけ薄まり、Cat の気配が見える状態に連続変形 |
| `label.body2.diff` | ボディ2・ずんだもん「これが拡散モデル」 | 左 Canvas の下に「拡散モデル」(DIFFUSION) ラベルがフェードイン |
| `grid.body2.in` | ボディ2・ずんだもん「空っぽのキャンバスから始まる」 | 右 Canvas 内側に PatchGrid の罫線が薄くフェードイン |
| `cells.body2.fill` | ボディ2・ずんだもん「左上のマスから順に、一マスずつ色を置いていく」 | 右 Canvas の左上のマス 2 個が AUTOREG 色で順に埋まる |
| `label.body2.auto` | ボディ2・ずんだもん「これが自己回帰モデル」 | 右 Canvas の下に「自己回帰モデル」(AUTOREG) ラベルがフェードイン |
| `scene.body3.in` | ボディ3・ずんだもん「まずは拡散モデル」 | ボディ3 画面のフェードイン。ボディ2 の全要素が一掃 |
| `canvas.body3.in` | ボディ3・ずんだもん「画面全体が完全な砂嵐から始まる」 | 単体 Canvas が中央に現れ、内側が NoiseField で完全に埋まる。空 StepBeads（8 個）が下に並ぶ |
| `step.body3.s1` | ボディ3・ずんだもん「ノイズをほんの少しだけ引く」 | StepBeads 1 個目が DIFFUSION 色で点灯、NoiseField がわずかに薄まる |
| `step.body3.s2` | ボディ3・ずんだもん「次のステップで、もう少しノイズを引く」 | StepBeads 2 個目が点灯、NoiseField がもう少し薄まる |
| `step.body3.s3to5` | ボディ3・ずんだもん「それを20回とか50回くり返す」 | StepBeads 3〜5 個目が連続点灯、NoiseField がはっきり薄くなり Cat 輪郭がうっすら見える |
| `learn.body3.shift` | ボディ3・ずんだもん「学習のときは、逆をやるのだ」 | Canvas が右側へ縮んで寄り、左側に空きスペースができる |
| `learn.body3.chain` | ボディ3・ずんだもん「ノイズを少しずつ足していく」 | 左の空きに小 Cat → ノイズ足された 3 つの小キャンバスが順次フェードイン |
| `learn.body3.pair` | ボディ3・ずんだもん「ペアを大量に集めて」 | 小キャンバスの隣ペア同士が薄い矢印（DIFFUSION 色）で結ばれる |
| `learn.body3.flip` | ボディ3・ずんだもん「教師ありの問題に化ける」 | ペアの矢印の向きが左→右から右→左へ反転し、色も INK→DIFFUSION に変わる |
| `learn.body3.out` | ボディ3・ずんだもん「足した手順を逆にたどるだけで良い」 | 学習側の小キャンバス群がフェードアウトし、右側の Canvas が中央へ戻る |
| `step.body3.s6to8` | ボディ3・ずんだもん「ピュアな砂嵐から、ちょっとずつ綺麗にしていけば」 | StepBeads 6〜8 個目が連続点灯、NoiseField が完全に消え Cat が完全な姿で立つ |
| `axislabel.body3.in` | ボディ3・ずんだもん「これが拡散モデルの正体なのだ」 | Canvas 下、StepBeads 下に AxisLabel「ノイズの量」(DIFFUSION) がフェードイン |
| `scene.body4.in` | ボディ4・ずんだもん「次は、自己回帰モデル」 | ボディ4 画面のフェードイン。ボディ3 の全要素が一掃 |
| `canvas.body4.in` | ボディ4・ずんだもん「絵を作るときは、何も描かれていない、空っぽのキャンバスから始まる」 | 単体 Canvas が中央に現れる。内側は空。空 StepBeads（8 個）が下に並ぶ |
| `grid.body4.in` | ボディ4・ずんだもん「パッチという小さなマスに区切る」 | Canvas 内に PatchGrid 罫線が左から右へ描き起こされる |
| `cells.body4.first` | ボディ4・ずんだもん「左上から順番に、一つずつ埋めていく」 | 左上のマス 1 つが AUTOREG 色で埋まる。StepBeads 1 個目点灯 |
| `learn.body4.shift` | ボディ4・めたん「文章の続きを書くみたいに？」 | Canvas が右側へ縮んで寄り、左側に空きスペースができる |
| `learn.body4.tokens` | ボディ4・ずんだもん「GPTが文章を作るときと、まったく同じ仕組み」 | 左の空きにテキスト風トークン箱が左から右へ順に並ぶ |
| `learn.body4.row` | ボディ4・ずんだもん「画像をパッチの「列」に並べ直せば」 | トークン箱の下に、パッチ列が同じ並びで現れる |
| `learn.body4.frame` | ボディ4・ずんだもん「同じ機械でいける」 | トークン箱とパッチ列を囲む共通枠が出る |
| `learn.body4.out` | ボディ4・ずんだもん「これまで埋めたパッチを全部見て」 | 左の説明スペースがフェードアウトし、Canvas が中央へ戻る |
| `cells.body4.mid1` | ボディ4・ずんだもん「1パッチ当てる問題の列に化ける」 | StepBeads 2〜4 個目が連続点灯、Canvas 内左上から 5〜10 マスが追加で埋まる |
| `pair.body4.in` | ボディ4・ずんだもん「ペアを大量に作る」 | Canvas の右端に小ペアキャンバスが一瞬寄り添い、すぐ消える |
| `cells.body4.mid2` | ボディ4・ずんだもん「答えのある問題に変身させてから学ばせる」 | StepBeads 5〜6 個目点灯、マス埋めが半分まで進み Cat 輪郭の下半分が見える |
| `cells.body4.full` | ボディ4・ずんだもん「最後まで繰り返せば、絵が完成する」 | StepBeads 7〜8 個目点灯、マス埋め完了。Cat が AUTOREG 色のマスで現れる |
| `axislabel.body4.in` | ボディ4・ずんだもん「それが自己回帰モデルの大きな強み」 | Canvas 下、StepBeads 下に AxisLabel「空間の位置」(AUTOREG) がフェードイン |
| `scene.body5.in` | ボディ5・ずんだもん「ここまでで、二つの仕組みを見たのだ」 | ボディ5 画面のフェードイン。ボディ4 の全要素が一掃 |
| `dual.body5.in` | ボディ5・ずんだもん「骨組みはほとんど同じ」 | 2 枚 Canvas が左右対称に滑り出て、最終状態（NoiseField 残し Cat ／ マス埋め Cat）が同時に現れる。上に小ラベル |
| `commons.body5.s1` | ボディ5・ずんだもん「三つの共通点があるのだ」 | 中央に共通点 1 行目「① 易しい一手の連鎖」がフェードイン |
| `commons.body5.s2` | ボディ5・ずんだもん「『前の状態を見て、次を当てる』という形に揃えた」 | 2 行目「② 前を見て、次を当てる」がフェードイン |
| `commons.body5.s3` | ボディ5・ずんだもん「学習のときに「逆方向」を仕込むことで」 | 3 行目「③ 逆方向で教師あり」がフェードイン |
| `axis.body5.center` | ボディ5・ずんだもん「違うのは、バラし方の軸、ただ一つだけ」 | 共通点リストがフェードアウト、中央に大きな文字「軸が違うだけ」がフェードイン |
| `axislabel.body5.diff` | ボディ5・ずんだもん「拡散モデルは「ノイズの量」を軸にバラした」 | 左 Canvas 下に AxisLabel「ノイズの量」(DIFFUSION) がフェードイン |
| `axislabel.body5.auto` | ボディ5・ずんだもん「自己回帰モデルは「空間の位置」を軸にバラした」 | 右 Canvas 下に AxisLabel「空間の位置」(AUTOREG) がフェードイン |
| `pulse.body5.frames` | ボディ5・ずんだもん「中身の発想は、ほとんど同じ」 | 両 Canvas の枠線が一瞬太くなって戻る（同じ正体の合図） |
| `extras.body5.in` | ボディ5・ずんだもん「お絵かき特化なら拡散、テキストと混ぜたいなら自己回帰」 | 左 Canvas 下に小注記「全体構図」(DIFFUSION薄)、右に「他モーダル統一」(AUTOREG薄) がほぼ同時にフェードイン |
| `scene.outro.in` | 結論・ずんだもん「ここまで来たら、最初の話に戻れるのだ」 | 結論画面のフェードイン。ボディ5 の全要素が一掃。Canvas が中央に再登場 |
| `cat.outro.in` | 結論・ずんだもん「諦めたうえで、易しい一手の連鎖にバラした」 | Canvas 内に Cat が一筆で描き起こされる（序論と同じ動き） |
| `title.outro.in` | 結論・ずんだもん「画像生成AIの本当の発明なのだ」 | Canvas 上に大見出し「諦め方が賢い」がフェードイン |
| `subcards.outro.in` | 結論・めたん「拡散モデルと自己回帰モデルは、その「バラし方」の二つの軸なのね」 | サブカード 2 枚が Canvas の下に左右対称で滑り出る |
| `labels.outro.in` | 結論・めたん「ノイズの軸か、空間の軸か」 | 左サブカードに「ノイズの軸」(DIFFUSION)、右に「空間の軸」(AUTOREG) のラベルがフェードイン |
| `links.outro.in` | 結論・めたん「中で何が起きてるか、想像が湧くようになる」 | サブカードと Canvas を結ぶ薄い線が 3 本、INK 色で引かれる |
| `tone.outro.down` | 結論・ずんだもん「またなのだ」 | 全要素がほんの少しトーンダウンし、画面が静かに収束 |

合計 event 数：68（うち画面切替 7、内容 event 61）。内容 event 61 / 全セリフ 224 ≒ 27%。連鎖の段階刻みを多用するため、目安 5〜15% より高めだが、各段階を視覚で順次刻む構成上の必然。

## 2. ライフサイクル契約

| オブジェクト | 所属画面 | 誕生 | 死 | 出生元 | 退場先 |
|---|---|---|---|---|---|
| Canvas（序論） | 序論 | `canvas.intro.in` | 画面退場（`scene.body1.in`） | 画面入場 | 画面退場 |
| Cat（序論） | 序論 | `cat.intro.in` | 画面退場 | Canvas の中で描き起こし | 画面退場 |
| Title「画像生成AI」 | 序論 | `title.intro.in` | 画面退場 | Canvas の上にフェードイン | 画面退場 |
| サブカード左右（序論） | 序論 | `subcards.intro.in` | 画面退場 | Canvas の下から左右に滑り出る | 画面退場 |
| 拡散ラベル（序論） | 序論 | `labels.intro.in` | 画面退場 | 左サブカード内にフェードイン | 画面退場 |
| 自己回帰ラベル（序論） | 序論 | `labels.intro.in` | 画面退場 | 右サブカード内にフェードイン | 画面退場 |
| サブカード間の線 | 序論 | `sublink.intro.in` | 画面退場 | サブカード間にフェードイン | 画面退場 |
| Canvas（ボディ1） | ボディ1 | 画面入場 | 画面退場 | 画面入場 | 画面退場 |
| SceneTitle ボディ1 | ボディ1〜5 各画面 | 画面入場 | 画面退場 | 画面入場（タイトル帯にフェードイン） | 画面退場 |
| 仮 PatchGrid（ボディ1） | ボディ1 | `grid.body1.in` | `noise.body1.fill` で消える | Canvas 内側 | NoiseField への連続変形で消滅 |
| 色付きマス（ボディ1） | ボディ1 | `cells.body1.color` | `noise.body1.fill` で消える | 仮 PatchGrid のマスから | NoiseField への連続変形で消滅 |
| NoiseField（ボディ1） | ボディ1 | `noise.body1.fill` | 画面退場 | Canvas 内側、仮 PatchGrid からの連続変形 | 画面退場 |
| CombinationsHaze | ボディ1 | `haze.body1.in` | 画面退場 | Canvas の外側から左右に広がる | 画面退場 |
| SUBJECT 点（ボディ1） | ボディ1 | `dot.body1.in` | 画面退場 | CombinationsHaze の中央位置 | 画面退場 |
| StepBeads（ボディ2） | ボディ2 | `beads.body2.in` | `dual.body2.in` で退く（縮んで上方退場、画面退場と同じタイミングで消滅） | 画面中央 | 画面上方へ縮んで退場 |
| Canvas 左右（ボディ2） | ボディ2 | `dual.body2.in` | 画面退場 | StepBeads の下から左右対称に滑り出る | 画面退場 |
| NoiseField 左（ボディ2） | ボディ2 | `noise.body2.fill` | 画面退場 | 左 Canvas 内側 | 画面退場 |
| Cat 気配（ボディ2、左 Canvas） | ボディ2 | `noise.body2.thin` | 画面退場 | NoiseField の薄まりからの連続変形 | 画面退場 |
| 拡散ラベル（ボディ2） | ボディ2 | `label.body2.diff` | 画面退場 | 左 Canvas の下にフェードイン | 画面退場 |
| PatchGrid（ボディ2、右 Canvas） | ボディ2 | `grid.body2.in` | 画面退場 | 右 Canvas 内側 | 画面退場 |
| 埋まりマス（ボディ2、右 Canvas） | ボディ2 | `cells.body2.fill` | 画面退場 | PatchGrid の左上マス | 画面退場 |
| 自己回帰ラベル（ボディ2） | ボディ2 | `label.body2.auto` | 画面退場 | 右 Canvas の下にフェードイン | 画面退場 |
| Canvas（ボディ3） | ボディ3 | `canvas.body3.in` | 画面退場 | 画面中央 | 画面退場 |
| StepBeads（ボディ3、8 個） | ボディ3 | `canvas.body3.in`（空状態で配置） | 画面退場 | Canvas の下 | 画面退場 |
| NoiseField（ボディ3） | ボディ3 | `canvas.body3.in`（完全砂嵐で出発） | `step.body3.s6to8` で完全消失 | Canvas 内側 | 連続変形で消失 |
| Cat（ボディ3） | ボディ3 | `step.body3.s6to8`（最終ステップで完成） | 画面退場 | NoiseField の薄まりからの連続変形 | 画面退場 |
| 学習側小 Cat 完成絵 | ボディ3 | `learn.body3.chain` | `learn.body3.out` | 左の空きスペース | フェードアウト |
| 学習側ノイズ付き小キャンバス群（3 つ） | ボディ3 | `learn.body3.chain` | `learn.body3.out` | 小 Cat の右隣に順次フェードイン | フェードアウト |
| 学習側ペア矢印 | ボディ3 | `learn.body3.pair` | `learn.body3.out` | 隣り合う小キャンバスの間 | フェードアウト |
| AxisLabel「ノイズの量」（ボディ3） | ボディ3 | `axislabel.body3.in` | 画面退場 | StepBeads の下にフェードイン | 画面退場 |
| Canvas（ボディ4） | ボディ4 | `canvas.body4.in` | 画面退場 | 画面中央 | 画面退場 |
| StepBeads（ボディ4、8 個） | ボディ4 | `canvas.body4.in`（空状態で配置） | 画面退場 | Canvas の下 | 画面退場 |
| PatchGrid 罫線（ボディ4） | ボディ4 | `grid.body4.in` | 画面退場 | Canvas 内側、左から右へ描き起こし | 画面退場 |
| 埋まりマス群（ボディ4、Cat 形成） | ボディ4 | `cells.body4.first` から `cells.body4.full` にかけて段階的に増える | 画面退場 | PatchGrid のマスから順次 | 画面退場 |
| 学習側トークン箱列 | ボディ4 | `learn.body4.tokens` | `learn.body4.out` | 左の空きスペース | フェードアウト |
| 学習側パッチ列 | ボディ4 | `learn.body4.row` | `learn.body4.out` | トークン箱の下 | フェードアウト |
| 学習側共通枠 | ボディ4 | `learn.body4.frame` | `learn.body4.out` | トークン箱とパッチ列を囲む | フェードアウト |
| 小ペアキャンバス | ボディ4 | `pair.body4.in` | 直後にフェードアウト（一拍だけ） | Canvas の右端に寄り添う | フェードアウト |
| AxisLabel「空間の位置」（ボディ4） | ボディ4 | `axislabel.body4.in` | 画面退場 | StepBeads の下にフェードイン | 画面退場 |
| Canvas 左右（ボディ5） | ボディ5 | `dual.body5.in` | 画面退場 | 画面中央から左右対称に滑り出る | 画面退場 |
| 拡散モデル小ラベル（ボディ5、上） | ボディ5 | `dual.body5.in` | 画面退場 | 左 Canvas の上 | 画面退場 |
| 自己回帰モデル小ラベル（ボディ5、上） | ボディ5 | `dual.body5.in` | 画面退場 | 右 Canvas の上 | 画面退場 |
| 左 Canvas 中身（NoiseField 残し Cat） | ボディ5 | `dual.body5.in` | 画面退場 | 左 Canvas 内側 | 画面退場 |
| 右 Canvas 中身（マス埋め Cat） | ボディ5 | `dual.body5.in` | 画面退場 | 右 Canvas 内側 | 画面退場 |
| 共通点リスト 1〜3 | ボディ5 | `commons.body5.s1〜s3` | `axis.body5.center` で一斉に消える | 中央スペースに順次フェードイン | フェードアウト |
| 中央大文字「軸が違うだけ」 | ボディ5 | `axis.body5.center` | 画面退場 | 中央スペースに、共通点リストと入れ替わりでフェードイン | 画面退場 |
| AxisLabel「ノイズの量」（ボディ5） | ボディ5 | `axislabel.body5.diff` | 画面退場 | 左 Canvas 下にフェードイン | 画面退場 |
| AxisLabel「空間の位置」（ボディ5） | ボディ5 | `axislabel.body5.auto` | 画面退場 | 右 Canvas 下にフェードイン | 画面退場 |
| 小注記「全体構図」 | ボディ5 | `extras.body5.in` | 画面退場 | 左 Canvas 下、AxisLabel の下にフェードイン | 画面退場 |
| 小注記「他モーダル統一」 | ボディ5 | `extras.body5.in` | 画面退場 | 右 Canvas 下、AxisLabel の下にフェードイン | 画面退場 |
| Canvas（結論） | 結論 | `scene.outro.in` | 画面終了（動画終端） | 画面入場 | 動画終端 |
| Cat（結論） | 結論 | `cat.outro.in` | 動画終端 | Canvas 内で描き起こし | 動画終端 |
| Title「諦め方が賢い」 | 結論 | `title.outro.in` | 動画終端 | Canvas 上にフェードイン | 動画終端 |
| サブカード左右（結論） | 結論 | `subcards.outro.in` | 動画終端 | Canvas の下に左右対称に滑り出る | 動画終端 |
| 「ノイズの軸」ラベル | 結論 | `labels.outro.in` | 動画終端 | 左サブカード内にフェードイン | 動画終端 |
| 「空間の軸」ラベル | 結論 | `labels.outro.in` | 動画終端 | 右サブカード内にフェードイン | 動画終端 |
| サブカード ↔ Canvas 接続線（3 本） | 結論 | `links.outro.in` | 動画終端 | サブカード端から Canvas へ | 動画終端 |

## 3. オブジェクト別 挙動メモ

### Canvas（背骨）

各画面で 1 枚または 2 枚立つ。

- ボディ3／4 では `learn.X.shift` で右側へ縮んで寄り（位置 x が右方向へ、scale が 0.85 程度に）、`learn.X.out` で中央位置・元サイズへ戻る。これは「学習場面」と「生成場面」を画面内で切り替える唯一の手段（カット切り替えはしない）
- ボディ5 では `dual.body5.in` で左右対称位置に同時配置。中身（NoiseField 残し Cat ／ マス埋め Cat）は配置と同時に最終状態として現れる（途中の生成過程は再演しない、最終状態の対比のみ）

### NoiseField（拡散モデル軸）

- ボディ1：`noise.body1.fill` で純粋砂嵐として出現し、画面退場まで純粋砂嵐を保つ
- ボディ2：`noise.body2.fill` で左 Canvas に純粋砂嵐として出現 → `noise.body2.thin` で「少し薄まった」状態へ連続変形 → 画面退場まで保持
- ボディ3：`canvas.body3.in` で純粋砂嵐 → `step.body3.s1` 〜 `step.body3.s6to8` にかけて段階的に密度が下がる（純粋 → 7/8 → 6/8 → ... → 0）。「密度」は描画する点の数と各点の透明度の組み合わせで表現
- ボディ5：`dual.body5.in` で「ほぼ消えた状態」で出現（左 Canvas、Cat の背後にうっすら残る程度）。再変化しない

### 埋まりマス群（自己回帰モデル軸、Cat 形状）

- ボディ4：`cells.body4.first` で左上 1 マス → `cells.body4.mid1` で 5〜10 マス → `cells.body4.mid2` で全体の半分 → `cells.body4.full` で全マス完成 へ、段階的に増える。マスの埋まり順は「左上から右下へ、行ごとに左→右、行を上→下」で固定。Cat の形状はマスの集合として完成
- ボディ5：`dual.body5.in` で「全マス完成済み」で出現（右 Canvas、Cat 形状）。再変化しない

### StepBeads

- ボディ2：4 個。`beads.body2.in` で空状態出現 → `beads.body2.light` で 1 個ずつ SUBJECT 色へ点灯 → `beads.body2.full` で全 4 個点灯 → `dual.body5.in` で縮んで上方退場（と同時に画面退場）
- ボディ3：8 個。`canvas.body3.in` で空状態出現 → `step.body3.s1`〜`s6to8` で段階的に DIFFUSION 色で点灯
- ボディ4：8 個。`canvas.body4.in` で空状態出現 → `cells.body4.first`〜`cells.body4.full` で段階的に AUTOREG 色で点灯

### 学習場面の補助群（ボディ3 / ボディ4）

- ボディ3：小 Cat → ノイズ付き 3 小キャンバス → ペア矢印（順方向）→ ペア矢印（逆方向）の流れ。すべて `learn.body3.out` で一括フェードアウト
- ボディ4：トークン箱列 → パッチ列 → 共通枠 の積み重ね。すべて `learn.body4.out` で一括フェードアウト

### 共通点リストと中央大文字（ボディ5）

- 共通点リスト 1〜3 は `commons.body5.s1`〜`s3` で順次フェードイン → `axis.body5.center` で一斉フェードアウト
- 中央大文字「軸が違うだけ」は `axis.body5.center` で、共通点リストの消失と入れ替わりでフェードイン → 画面退場まで保持

### サブカードとラベル（序論 / 結論）

- 序論：`subcards.intro.in` でカード本体が滑り出る → `labels.intro.in` で 2 つのラベルが同時フェードイン → `sublink.intro.in` でカード間の線が引かれる
- 結論：`subcards.outro.in` でカード本体が滑り出る → `labels.outro.in` で 2 つのラベルが同時フェードイン → `links.outro.in` で 3 本の接続線が引かれる

## 4. 採否判断

- [x] design_overall の各画面の「動き」がすべて event に分解されている
- [x] 各 event が `script.md` の実在するセリフに紐付いている
- [x] 画面切替 event（`scene.X.in`）が各画面の先頭セリフに付いている
- [x] 内容 event の量（61/224 ≒ 27%）は構成上の必然（連鎖の段階刻み）として妥当
- [x] 全オブジェクトにライフサイクル契約（誕生・死・出生元・退場先）がある
- [x] 出生元・退場先がすべて既存オブジェクトか画面入退場（「画面外から湧く」はゼロ）
- [x] 座標値・フレーム数値を書き込んでいない
