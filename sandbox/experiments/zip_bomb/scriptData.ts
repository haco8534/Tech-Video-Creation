// このファイルは script.md から _gen_script.py で生成。手で編集しない。
// 4段パイプライン [4] Composition.tsx 用のセリフ＋event データ。

export type Speaker = 'めたん' | 'ずんだもん';

export type AnimEvent =
  | 'scene.intro.in'
  | 'intro.reveal'
  | 'intro.scale'
  | 'intro.crush'
  | 'intro.name'
  | 'intro.weight'
  | 'scene.body1.in'
  | 'b1.collapse'
  | 'b1.instr'
  | 'b1.backref'
  | 'b1.lz77'
  | 'b1.monotone'
  | 'scene.body2.in'
  | 'b2.ceiling'
  | 'b2.small'
  | 'b2.nest'
  | 'b2.zip42'
  | 'b2.tail'
  | 'b2.detect'
  | 'scene.body3.in'
  | 'b3.toc'
  | 'b3.normal'
  | 'b3.overlap'
  | 'b3.expand'
  | 'b3.evade'
  | 'b3.power'
  | 'scene.outro.in'
  | 'outro.recap'
  | 'outro.burn'
  | 'outro.virus'
  | 'outro.host'
  | 'outro.loopback'
  | 'outro.end';

export type ScriptLine = { speaker: Speaker; text: string; event?: AnimEvent };

export const SCRIPT: ScriptLine[] = [
  { speaker: 'めたん', text: 'ねえずんだもん。これ、たった42キロバイトの小さなファイルなの。', event: 'scene.intro.in' },
  { speaker: 'ずんだもん', text: 'ああ、それ、開けちゃだめなやつなのだ。ひらいた瞬間、4.5ペタバイトに化けるのだ。', event: 'intro.reveal' },
  { speaker: 'めたん', text: 'ペタバイト？' },
  { speaker: 'ずんだもん', text: 'ペタは、ギガの百万倍なのだ。スマホ数百万台ぶんが、その小さな一個から膨らむのだ。', event: 'intro.scale' },
  { speaker: 'めたん', text: 'そんなの、入りきらないでしょう。' },
  { speaker: 'ずんだもん', text: '入らないのだ。だから開けたパソコンは、ディスクを食いつぶして潰れるのだ。', event: 'intro.crush' },
  { speaker: 'めたん', text: 'たった42キロから？' },
  { speaker: 'ずんだもん', text: 'そう、たった42キロからなのだ。これがzip爆弾、ぶっ壊れた縮め方の産物なのだ。', event: 'intro.name' },
  { speaker: 'めたん', text: 'zip爆弾。' },
  { speaker: 'ずんだもん', text: 'ふしぎなのは、爆弾そのものは、指一本ぶんも重くないってことなのだ。', event: 'intro.weight' },
  { speaker: 'ずんだもん', text: '重い思いをするのは、開けた側だけなのだ。作るのは軽くて、開けるほうが重い。' },
  { speaker: 'めたん', text: '軽いものが、開けた相手だけを潰すの……？' },
  { speaker: 'ずんだもん', text: 'そこが今日のキモなのだ。なぜそんなことが起きるのか、ほどいていくのだ。' },
  { speaker: 'ずんだもん', text: 'まず、ふつうのファイルがどうやって小さくなるか、見るのだ。圧縮ってやつなのだ。', event: 'scene.body1.in' },
  { speaker: 'めたん', text: 'ぎゅっと縮める、あれよね。' },
  { speaker: 'ずんだもん', text: '縮めるっていうより、書き直すのだ。「あ」が千個ならんだ紙を、思いうかべてほしいのだ。' },
  { speaker: 'めたん', text: '「あ」が千個。' },
  { speaker: 'ずんだもん', text: 'そのまま書けば千文字なのだ。でも「あ、を千回」と書けば、たった数文字で済むのだ。', event: 'b1.collapse' },
  { speaker: 'めたん', text: 'あっ、すごく短くなった。' },
  { speaker: 'ずんだもん', text: 'これが圧縮の正体なのだ。中身そのものじゃなく、書き方の指示だけを残すのだ。' },
  { speaker: 'めたん', text: 'じゃあ、圧縮ファイルの中身って……。' },
  { speaker: 'ずんだもん', text: 'データじゃなく、指示書なのだ。「ここを見て、これだけ繰り返せ」という命令の束なのだ。', event: 'b1.instr' },
  { speaker: 'めたん', text: 'でも、繰り返す元のデータは、どこかに持ってるんでしょう？' },
  { speaker: 'ずんだもん', text: 'ほんの少しでいいのだ。「直前の並びを、また千回」と指させば、元はひと並びで足りるのだ。', event: 'b1.backref' },
  { speaker: 'ずんだもん', text: 'この「前を指して繰り返せ」の仕掛けを、LZ77と呼ぶのだ。zipの心臓、DEFLATEの土台なのだ。', event: 'b1.lz77' },
  { speaker: 'めたん', text: 'エルゼットなんとか。' },
  { speaker: 'ずんだもん', text: 'だから繰り返しだらけの紙ほど、指示は短くなる。中身が単調なほど、爆弾は軽くなるのだ。', event: 'b1.monotone' },
  { speaker: 'ずんだもん', text: 'ところが、指示書ひとつには、ちゃんと天井があるのだ。', event: 'scene.body2.in' },
  { speaker: 'めたん', text: '天井？' },
  { speaker: 'ずんだもん', text: 'DEFLATEの指示書は、どうあがいても、千三十二倍までしか膨らませられないのだ。', event: 'b2.ceiling' },
  { speaker: 'めたん', text: '千三十二倍。けっこう大きいじゃない。' },
  { speaker: 'ずんだもん', text: '42キロを千倍しても、43メガちょっとなのだ。今どきのディスクは、それじゃ潰れないのだ。', event: 'b2.small' },
  { speaker: 'めたん', text: 'あれ、爆弾にならないわね。' },
  { speaker: 'ずんだもん', text: 'そこで昔の人が考えたのが、指示書のなかに、また指示書を入れることなのだ。', event: 'b2.nest' },
  { speaker: 'めたん', text: '指示書のなかに、指示書。' },
  { speaker: 'ずんだもん', text: '開けたら、また圧縮ファイル。それを開けたら、また圧縮ファイル。これを五段、重ねるのだ。' },
  { speaker: 'ずんだもん', text: '一段で十六個ずつ増やすと、五段で何倍になると思うのだ。百倍か、百万倍か。' },
  { speaker: 'めたん', text: '……百万倍の、ほう？' },
  { speaker: 'ずんだもん', text: 'そう、ざっと百万倍なのだ。これが有名な42.zip、42キロが4.5ペタに化ける正体なのだ。', event: 'b2.zip42' },
  { speaker: 'めたん', text: 'さっきの4.5ペタって、これだったの？' },
  { speaker: 'ずんだもん', text: 'そうなのだ。でも入れ子には、尻尾があるのだ。開けても開けても、また圧縮ファイルが出てくる。', event: 'b2.tail' },
  { speaker: 'めたん', text: 'それ、見たらバレちゃわない？' },
  { speaker: 'ずんだもん', text: 'バレるのだ。「また圧縮ファイルが出たら、もう開かない」。検査する側は、そう身構えたのだ。', event: 'b2.detect' },
  { speaker: 'ずんだもん', text: '入れ子の爆弾は、こうして見破られた。爆弾は、一段に戻るしかなくなったのだ。' },
  { speaker: 'ずんだもん', text: 'ここからが新しい爆弾なのだ。2019年に、フィフィールドって人が示したやり方なのだ。', event: 'scene.body3.in' },
  { speaker: 'めたん', text: '入れ子を、使わずに？' },
  { speaker: 'ずんだもん', text: '使わないのだ。一段のまま、巨大にするのだ。カギは、zipの目次なのだ。' },
  { speaker: 'めたん', text: '目次。' },
  { speaker: 'ずんだもん', text: 'zipは、中身の一覧表を持っているのだ。「一個目はここ、二個目はここ」と、場所を指す目次なのだ。', event: 'b3.toc' },
  { speaker: 'めたん', text: '本の目次と、おなじね。' },
  { speaker: 'ずんだもん', text: 'そこなのだ。ふつうは、目次の項目それぞれが、別々の中身を指すのだ。', event: 'b3.normal' },
  { speaker: 'ずんだもん', text: 'フィフィールドは、目次の項目を、ぜんぶ同じひとかたまりに向けたのだ。', event: 'b3.overlap' },
  { speaker: 'めたん', text: 'ぜんぶ、おなじ場所を指すの……？' },
  { speaker: 'めたん', text: 'でも、おなじ中身を何度も数えるなんて、ずるじゃない。' },
  { speaker: 'ずんだもん', text: '数える側は、それを別々の中身だと思いこんで、律儀に全部展開してしまうのだ。' },
  { speaker: 'ずんだもん', text: 'ひとかたまりの圧縮データを、千個の項目で指す。一個ぶんの重さが、そのまま千倍に展開されるのだ。', event: 'b3.expand' },
  { speaker: 'めたん', text: '層は、一枚のままなの？' },
  { speaker: 'ずんだもん', text: '一枚のままなのだ。だから「また圧縮ファイルが出る」尻尾が無い。検査の身構えを、すり抜けるのだ。', event: 'b3.evade' },
  { speaker: 'ずんだもん', text: 'この一段の爆弾は、46メガで4.5ペタを生むのだ。入れ子とおなじ威力を、隠れたまま出すのだ。', event: 'b3.power' },
  { speaker: 'めたん', text: 'おなじ4.5ペタを、見つからずに。' },
  { speaker: 'ずんだもん', text: 'もう一度、爆弾の正体を見るのだ。', event: 'scene.outro.in' },
  { speaker: 'ずんだもん', text: '中身は、ほとんど無い。あるのは、これを繰り返せという、短い指示だけなのだ。', event: 'outro.recap' },
  { speaker: 'めたん', text: 'それだけ。' },
  { speaker: 'ずんだもん', text: '書くのは一瞬なのだ。なのに開けた側は、その指示を最後まで律儀に実行して、自分の資源を焼くのだ。', event: 'outro.burn' },
  { speaker: 'めたん', text: 'えっ、ちゃんと開けたほうが？' },
  { speaker: 'ずんだもん', text: 'そうなのだ。爆弾は、自分では何もしない。ただ、相手の律儀さを、武器にするだけなのだ。' },
  { speaker: 'ずんだもん', text: 'これ、生きものの世界にもあるのだ。ウイルスは、自分だけでは増えないのだ。', event: 'outro.virus' },
  { speaker: 'めたん', text: 'ウイルス？' },
  { speaker: 'ずんだもん', text: 'ウイルスは、増え方を書いた指示書を、細胞に持ちこむだけなのだ。あとは細胞が、律儀に読んで増やすのだ。', event: 'outro.host' },
  { speaker: 'めたん', text: '指示書を実行する側が、自分で増やしちゃうのね。' },
  { speaker: 'ずんだもん', text: 'ばか正直に指示を実行するもの。その真面目さが、そのまま弱点になるのだ。', event: 'outro.loopback' },
  { speaker: 'ずんだもん', text: 'いちばん軽いものが、いちばん重い結果を生む。zip爆弾は、たった数十キロの、そんなお話だったのだ。', event: 'outro.end' },
  { speaker: 'めたん', text: '……いちばん、軽いのにね。' },
];
