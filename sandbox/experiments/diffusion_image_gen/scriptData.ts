// このファイルは script.md から _gen_script.py で生成。手で編集しない。
// 4段パイプライン [4] Composition.tsx 用のセリフ＋event データ。

export type Speaker = 'めたん' | 'ずんだもん';

export type AnimEvent =
  | 'scene.intro.in'
  | 'intro.resolve'
  | 'intro.carve'
  | 'intro.empty'
  | 'intro.nodraw'
  | 'intro.name'
  | 'scene.body1.in'
  | 'b1.sprinkle'
  | 'b1.repeat'
  | 'b1.static'
  | 'b1.ours'
  | 'b1.ask'
  | 'b1.nolabel'
  | 'b1.grade'
  | 'b1.free'
  | 'scene.body2.in'
  | 'b2.guess'
  | 'b2.blur'
  | 'b2.many'
  | 'b2.step'
  | 'b2.fog'
  | 'b2.chain'
  | 'b2.name'
  | 'b2.steps'
  | 'scene.body3.in'
  | 'b3.norand'
  | 'b3.roll'
  | 'b3.newimg'
  | 'b3.prompt'
  | 'b3.bend'
  | 'b3.memo'
  | 'b3.scale'
  | 'b3.byte'
  | 'b3.gist'
  | 'b3.gen'
  | 'scene.outro.in'
  | 'outro.empty'
  | 'outro.onepower'
  | 'outro.rise'
  | 'outro.marble'
  | 'outro.invert'
  | 'outro.choose'
  | 'outro.end';

export type ScriptLine = { speaker: Speaker; text: string; event?: AnimEvent };

export const SCRIPT: ScriptLine[] = [
  { speaker: 'めたん', text: 'ねえずんだもん。この絵、ぜんぶ砂嵐から作られたって本当？', event: 'scene.intro.in' },
  { speaker: 'ずんだもん', text: '本当なのだ。最初はテレビの砂嵐そのもの。ザラザラした点の海なのだ。' },
  { speaker: 'めたん', text: 'そこから、こんなにきれいな絵が？' },
  { speaker: 'ずんだもん', text: 'そう。「猫」とひと言ささやくと、砂嵐がだんだん猫に化けていくのだ。', event: 'intro.resolve' },
  { speaker: 'めたん', text: 'まるで、砂の中から猫を彫り出すみたいね。', event: 'intro.carve' },
  { speaker: 'ずんだもん', text: 'みんなそう思うのだ。砂嵐の中に猫が隠れてて、それを掘り出すんだ、と。' },
  { speaker: 'めたん', text: 'ちがうの？' },
  { speaker: 'ずんだもん', text: 'ちがうのだ。砂嵐の中には、何も無い。猫なんてどこにも隠れてないのだ。', event: 'intro.empty' },
  { speaker: 'めたん', text: 'えっ、無いのに出てくるの？' },
  { speaker: 'ずんだもん', text: '無いのに出てくるのだ。ここが今日いちばん気持ち悪いところなのだ。' },
  { speaker: 'ずんだもん', text: 'しかもこのAI、絵の描き方なんて一度も習ってないのだ。', event: 'intro.nodraw' },
  { speaker: 'めたん', text: '描き方を知らないのに、描けるの？' },
  { speaker: 'ずんだもん', text: '描けるのだ。こいつが習ったのは、絵の「壊し方」だけなのだ。' },
  { speaker: 'めたん', text: '壊し方……？' },
  { speaker: 'ずんだもん', text: '壊すことだけ覚えた者が、その逆をたどって、無から絵を作る。これが拡散モデルなのだ。', event: 'intro.name' },
  { speaker: 'ずんだもん', text: '順を追うのだ。まず、きれいな一枚の絵を用意するのだ。', event: 'scene.body1.in' },
  { speaker: 'めたん', text: 'はい。' },
  { speaker: 'ずんだもん', text: 'そこに、ほんの少しザラつきを振りかける。ガウスノイズっていう、細かい点なのだ。', event: 'b1.sprinkle' },
  { speaker: 'めたん', text: 'ちょっとだけ、ね。' },
  { speaker: 'ずんだもん', text: 'また少し振りかける。また少し。これを何百回もくり返すのだ。', event: 'b1.repeat' },
  { speaker: 'めたん', text: 'だんだん、絵が見えなくなってきた。' },
  { speaker: 'ずんだもん', text: 'だから途中には、ちょっと崩れた絵も、半分砂嵐の絵も、ほぼ砂嵐の絵も、ぜんぶ揃うのだ。' },
  { speaker: 'めたん', text: '崩れ具合が、ばらばら。' },
  { speaker: 'ずんだもん', text: 'その全部を見せて鍛えるのだ。軽い崩れも重い崩れも、どんな段階でも点を当てられるようにね。' },
  { speaker: 'ずんだもん', text: '最後には、もとが何だったか分からない、ただの砂嵐になる。この壊す手順を拡散過程と呼ぶのだ。', event: 'b1.static' },
  { speaker: 'めたん', text: 'わざわざ、壊すの？' },
  { speaker: 'ずんだもん', text: 'ここがミソなのだ。ノイズを振りかけたのは、ぼくたち自身なのだ。', event: 'b1.ours' },
  { speaker: 'めたん', text: '自分で、撒いたのよね。' },
  { speaker: 'ずんだもん', text: 'だから、どの一粒をどこに足したか、ぜんぶ知ってる。答えを、こっちが握ってるのだ。' },
  { speaker: 'ずんだもん', text: 'そこでAIにこう聞くのだ。「このザラついた絵、さっき足した点はどれだ」と。', event: 'b1.ask' },
  { speaker: 'めたん', text: 'これは猫って、教えてあげるの？' },
  { speaker: 'ずんだもん', text: 'それがいらないのだ。猫だの犬だの、ラベルは一切いらない。', event: 'b1.nolabel' },
  { speaker: 'ずんだもん', text: '当たってるか外れてるかは、ぼくが答えを持ってるから、その場で丸つけできるのだ。', event: 'b1.grade' },
  { speaker: 'めたん', text: '足した点を、当てさせるだけ。' },
  { speaker: 'ずんだもん', text: 'そう。壊すだけで、練習問題と答えが、タダで無限に湧く。ちょっと反則みたいな話なのだ。', event: 'b1.free' },
  { speaker: 'めたん', text: 'じゃあ、その砂嵐を一気にきれいな絵へ戻せばいいじゃない。', event: 'scene.body2.in' },
  { speaker: 'ずんだもん', text: 'それができたら苦労しないのだ。試しに、砂嵐から一発で元絵を当てさせてみるのだ。' },
  { speaker: 'ずんだもん', text: 'くっきり出ると思うか、ぼやけると思うか。めたんはどっちだと思うのだ。', event: 'b2.guess' },
  { speaker: 'めたん', text: '……くっきり、出てほしいけど。' },
  { speaker: 'ずんだもん', text: '残念、ぼやけるのだ。猫とも犬ともつかない、もやっとした塊が出るのだ。', event: 'b2.blur' },
  { speaker: 'めたん', text: 'あら、ねむそうな絵。' },
  { speaker: 'ずんだもん', text: '当然なのだ。砂嵐ほど壊れた絵は、元がほぼ何でもありうる。猫も犬も家も、ぜんぶ正解になる。' },
  { speaker: 'めたん', text: '正解が、いっぱい？' },
  { speaker: 'ずんだもん', text: '正解が多すぎて、AIはお手上げ。しかたなく、ぜんぶの平均を出す。だからぼやけるのだ。', event: 'b2.many' },
  { speaker: 'めたん', text: '欲ばると、ぼやけるのね。' },
  { speaker: 'ずんだもん', text: 'そういうことなのだ。一枚に絞れないなら、すぐ近くだけ確実に当てる。それが一歩なのだ。' },
  { speaker: 'ずんだもん', text: 'だから一発はあきらめる。かわりに、ほんの一歩だけノイズを取るのだ。', event: 'b2.step' },
  { speaker: 'めたん', text: '一歩だけ。' },
  { speaker: 'ずんだもん', text: '濃い霧の中で道を探すのと同じなのだ。ゴールは見えない。でも足元の一歩だけは、見える。', event: 'b2.fog' },
  { speaker: 'めたん', text: '見える一歩だけ、ね。' },
  { speaker: 'ずんだもん', text: '少し取ったら、また聞く。少し取ったら、また聞く。一歩ごとに絵はくっきり、問いはやさしくなる。', event: 'b2.chain' },
  { speaker: 'ずんだもん', text: '一発じゃ解けない難問を、千個の楽な問いに割るのだ。これが逆拡散、サンプリングなのだ。', event: 'b2.name' },
  { speaker: 'めたん', text: '千個も？' },
  { speaker: 'ずんだもん', text: 'もとは千ステップ。今は工夫して数十ステップなのだ。それでも刻むこと自体は、変わらないのだ。', event: 'b2.steps' },
  { speaker: 'めたん', text: 'でも戻すって言うけど、元の絵が要るんでしょう？' },
  { speaker: 'ずんだもん', text: 'いらないのだ。ここで、まっさらな新しい砂嵐を用意するのだ。', event: 'scene.body3.in' },
  { speaker: 'ずんだもん', text: 'どんな絵からも作ってない、ただの乱数なのだ。元になった一枚なんて、無い。', event: 'b3.norand' },
  { speaker: 'めたん', text: '元が無い、砂嵐。' },
  { speaker: 'ずんだもん', text: 'そいつに、さっきの「一歩ずつノイズを取る」を、ただ繰り返すのだ。' },
  { speaker: 'めたん', text: '元が無いのに、戻る場所があるの？' },
  { speaker: 'ずんだもん', text: '戻るんじゃない。転がるのだ。一歩ごとに「より絵らしいほう」へ、坂を下るように転がる。', event: 'b3.roll' },
  { speaker: 'めたん', text: '坂を、下るの？' },
  { speaker: 'ずんだもん', text: 'たどり着くのは、見たことのない新しい絵。元が無いから、特定の一枚には戻りようがないのだ。', event: 'b3.newimg' },
  { speaker: 'めたん', text: 'じゃあ、猫って言ったのは？' },
  { speaker: 'ずんだもん', text: 'いい質問なのだ。一歩ごとに、横で「猫」ってプロンプトをささやくのだ。', event: 'b3.prompt' },
  { speaker: 'ずんだもん', text: 'すると毎回の「より絵らしいほう」が、「より猫らしいほう」に寄る。坂の傾きを、言葉で曲げるのだ。', event: 'b3.bend' },
  { speaker: 'めたん', text: '言葉で、坂が曲がるの？' },
  { speaker: 'めたん', text: 'でも、ずるして覚えた猫の写真を、そのまま出してるんじゃない？', event: 'b3.memo' },
  { speaker: 'ずんだもん', text: 'いちばんありがちな勘違いなのだ。でも、できないのだ。学習に使った画像は、バカでかい。50億枚なのだ。', event: 'b3.scale' },
  { speaker: 'めたん', text: 'ごおく。' },
  { speaker: 'ずんだもん', text: 'その50億枚を、数ギガのモデルに詰め込む。一枚あたり、1バイトも残らないのだ。', event: 'b3.byte' },
  { speaker: 'めたん', text: '写真を、しまえないのね？' },
  { speaker: 'ずんだもん', text: 'そうなのだ。だからAIは、個々の写真は覚えられない。覚えるのは「猫っぽさ」「毛の流れ」なのだ。', event: 'b3.gist' },
  { speaker: 'ずんだもん', text: 'そういう一般的なコツだけを絞り出す。そのコツで、新しい砂嵐から毎回ちがう猫を組む。' },
  { speaker: 'ずんだもん', text: 'だからコピーじゃなく、生成なのだ。', event: 'b3.gen' },
  { speaker: 'めたん', text: '覚えてるのは、絵じゃなくてコツなのね？' },
  { speaker: 'ずんだもん', text: 'そうなのだ。正確にはもっと色んな工夫が乗ってる。でも芯は、この一歩ずつだけなのだ。' },
  { speaker: 'ずんだもん', text: '最初の気持ち悪さに、戻るのだ。', event: 'scene.outro.in' },
  { speaker: 'ずんだもん', text: '砂嵐の中に、絵は隠れてなかった。彫り出したんじゃないのだ。', event: 'outro.empty' },
  { speaker: 'めたん', text: 'ほんとに、何も無かったのね。' },
  { speaker: 'ずんだもん', text: 'あったのは、たった一つの力だけ。「ちょっとザラついた絵を、ちょっとだけマシにする」。それだけなのだ。', event: 'outro.onepower' },
  { speaker: 'めたん', text: 'それだけ……？' },
  { speaker: 'ずんだもん', text: 'その小さな一歩を、何十回も重ねる。すると無から、見たことのない絵が立ち上がるのだ。', event: 'outro.rise' },
  { speaker: 'ずんだもん', text: '「大理石の中に像が眠っていて、彫り師は余分を削るだけ」。有名な言葉なのだ。', event: 'outro.marble' },
  { speaker: 'めたん', text: '聞いたこと、あるわ。' },
  { speaker: 'ずんだもん', text: '拡散モデルは、その逆さまなのだ。大理石の中に、像なんて眠ってない。', event: 'outro.invert' },
  { speaker: 'ずんだもん', text: 'ただ、削るたびに「より像らしいほう」を選ぶ。その選択の積み重ねが、像を生むのだ。', event: 'outro.choose' },
  { speaker: 'めたん', text: '眠ってるのを、起こすんじゃなくて？' },
  { speaker: 'ずんだもん', text: '無いものを、一歩ずつ、こっちが決めていくのだ。' },
  { speaker: 'ずんだもん', text: '砂嵐には、最初から何も無い。絵は、千の小さな選択が、無から立ち上げたものなのだ。', event: 'outro.end' },
];
