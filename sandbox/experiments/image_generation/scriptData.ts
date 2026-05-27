// このファイルは script.md から _gen_script.py で生成。手で編集しない。
// 4段パイプライン [4] Composition.tsx 用のセリフ＋event データ。

export type Speaker = 'めたん' | 'ずんだもん';

export type AnimEvent =
  | 'scene.intro.in'
  | 'intro.prompt'
  | 'intro.q'
  | 'intro.giveup'
  | 'intro.twocolors'
  | 'intro.title'
  | 'scene.body1.in'
  | 'b1.count'
  | 'b1.rgb'
  | 'b1.sea'
  | 'b1.point'
  | 'b1.allatonce'
  | 'b1.abandon'
  | 'scene.body2.in'
  | 'b2.split'
  | 'b2.easy'
  | 'b2.cat'
  | 'b2.learnable'
  | 'b2.fork'
  | 'b2.diffSide'
  | 'b2.autoSide'
  | 'b2.preview'
  | 'scene.body3.in'
  | 'b3.start'
  | 'b3.subtract'
  | 'b3.more'
  | 'b3.count'
  | 'b3.howq'
  | 'b3.learn'
  | 'b3.pairs'
  | 'b3.identity'
  | 'b3.products'
  | 'scene.body4.in'
  | 'b4.empty'
  | 'b4.count'
  | 'b4.fillStart'
  | 'b4.predict'
  | 'b4.gpt'
  | 'b4.unroll'
  | 'b4.fromAll'
  | 'b4.learn'
  | 'b4.fullCat'
  | 'b4.products'
  | 'scene.body5.in'
  | 'b5.dots'
  | 'b5.dot1'
  | 'b5.dot2'
  | 'b5.dot3'
  | 'b5.axisCalls'
  | 'b5.vert'
  | 'b5.horz'
  | 'b5.midpoints'
  | 'b5.diffStrength'
  | 'b5.split'
  | 'scene.outro.in'
  | 'outro.chain'
  | 'outro.axes'
  | 'outro.q'
  | 'outro.end';

export type ScriptLine = { speaker: Speaker; text: string; event?: AnimEvent };

export const SCRIPT: ScriptLine[] = [
  { speaker: 'めたん', text: 'ねえずんだもん。最近よく見る画像生成AI、あれって不思議じゃない？', event: 'scene.intro.in' },
  { speaker: 'ずんだもん', text: '何が不思議なのだ？' },
  { speaker: 'めたん', text: 'プロンプトに「猫の写真」って打つと、本当に猫が出てくるのよ。', event: 'intro.prompt' },
  { speaker: 'ずんだもん', text: 'うんうん、出てくるのだ。' },
  { speaker: 'めたん', text: 'あれって、AIが頭の中で完成図を思い浮かべて、ぱっと描いてる感じかしら？', event: 'intro.q' },
  { speaker: 'ずんだもん', text: '実はね、そこが多くの人が誤解してるところなのだ。' },
  { speaker: 'めたん', text: 'あら、違うの？' },
  { speaker: 'ずんだもん', text: '画像生成AIはね、一発で絵を当てることを、最初から諦めてるのだ。', event: 'intro.giveup' },
  { speaker: 'めたん', text: '諦めてる？それで絵が出てくるの？' },
  { speaker: 'ずんだもん', text: 'むしろ、諦めたからこそ出せるのだ。' },
  { speaker: 'めたん', text: '諦めて、出せるようになる。逆みたいで気になるわ。' },
  { speaker: 'ずんだもん', text: '今日はそこを解きほぐすのだ。' },
  { speaker: 'ずんだもん', text: '主役は二つ。拡散モデルと、自己回帰モデル。', event: 'intro.twocolors' },
  { speaker: 'めたん', text: '聞いたことはあるわ。Stable DiffusionとかGPT-4oとか。' },
  { speaker: 'ずんだもん', text: 'そのへんで使われてる仕組みなのだ。' },
  { speaker: 'ずんだもん', text: '見た目はぜんぜん違うんだけど、骨組みはほとんど同じ。' },
  { speaker: 'めたん', text: '同じなの？それぞれ別物の発明だと思ってたわ。' },
  { speaker: 'ずんだもん', text: '同じ作戦の、軸違いなのだ。' },
  { speaker: 'めたん', text: '軸違い。なんだかパズルみたいね。' },
  { speaker: 'ずんだもん', text: '順番に解いていくのだ。' },
  { speaker: 'ずんだもん', text: 'まずは「一発で当てるのが、なぜ無謀なのか」から。', event: 'intro.title' },
  { speaker: 'ずんだもん', text: '画像って、コンピューターから見ると、ただの数字のマス目なのだ。', event: 'scene.body1.in' },
  { speaker: 'めたん', text: 'マス目ね。' },
  { speaker: 'ずんだもん', text: 'よく見るSNS向けの正方形の絵は、だいたい1024×1024のマス。' },
  { speaker: 'ずんだもん', text: 'マスの数は、約100万個。', event: 'b1.count' },
  { speaker: 'めたん', text: '100万のマスね。' },
  { speaker: 'ずんだもん', text: '1マスは、赤・緑・青の三色を混ぜて表現する。' },
  { speaker: 'ずんだもん', text: 'それぞれ256段階あって、1マスで約1600万通りの色が選べるのだ。', event: 'b1.rgb' },
  { speaker: 'めたん', text: '100万のマスに、それぞれ1600万通り。' },
  { speaker: 'ずんだもん', text: '可能な絵の総数は、もう数字で書く意味がないくらい巨大なのだ。' },
  { speaker: 'めたん', text: '想像つかないわね。' },
  { speaker: 'ずんだもん', text: 'その膨大な可能性のほとんどは、人間が見ても、ただのザーザーの砂嵐に見える絵。', event: 'b1.sea' },
  { speaker: 'めたん', text: 'あら、絵じゃなくて？' },
  { speaker: 'ずんだもん', text: '絵じゃない。完全にランダムな色のマスが並んでるだけ。' },
  { speaker: 'めたん', text: 'そっか、全部の組み合わせの中身は、ほとんど無意味な絵なのね。' },
  { speaker: 'ずんだもん', text: 'その通り。人間が「猫」と認めるパターンは、その大海の中の、ごく小さな点。', event: 'b1.point' },
  { speaker: 'めたん', text: 'ふうん。じゃあ、絵に見える組み合わせを引き当てるのが、難しいってこと？' },
  { speaker: 'ずんだもん', text: '難しい、というか、無謀なのだ。' },
  { speaker: 'ずんだもん', text: '100万マスの色を、全部いっぺんに当てる問題、なのだ。', event: 'b1.allatonce' },
  { speaker: 'めたん', text: 'いっぺんに、全部。たしかに目眩がするわね。' },
  { speaker: 'ずんだもん', text: 'そして、当たったかどうかは、絵が全部完成したあとにしか分からない。' },
  { speaker: 'めたん', text: '途中で「あ、ここ違うな」って気づけないってこと？' },
  { speaker: 'ずんだもん', text: 'そう。1マスずつ確かめる手段がない。最後の絵を見て、初めて当たり外れが分かる。' },
  { speaker: 'めたん', text: 'それは、無謀どころか、最初から勝負になってないわね。' },
  { speaker: 'ずんだもん', text: 'だから、画像生成AIは、この戦い方をまず捨てたのだ。', event: 'b1.abandon' },
  { speaker: 'めたん', text: '捨てて、何をしたの？' },
  { speaker: 'ずんだもん', text: 'そこが次の話なのだ。' },
  { speaker: 'めたん', text: '聞かせて。' },
  { speaker: 'ずんだもん', text: '捨てた代わりに、こう考え直したのだ。', event: 'scene.body2.in' },
  { speaker: 'ずんだもん', text: '「一発で当てる」を、「易しい一手のくり返し」にバラそう、と。', event: 'b2.split' },
  { speaker: 'めたん', text: '易しい一手。' },
  { speaker: 'ずんだもん', text: 'たとえばこう。完成済みの絵に、ほんの少しだけ手を加える、なら易しいのだ。' },
  { speaker: 'めたん', text: 'ふむふむ。' },
  { speaker: 'ずんだもん', text: '「ほとんど完成」を「もう一歩だけ完成に寄せる」のは、全部当てるよりずっと簡単。', event: 'b2.easy' },
  { speaker: 'めたん', text: 'たしかに、一気にゼロから描くより、ちょっとずつ直す方が楽そうね。' },
  { speaker: 'ずんだもん', text: 'そう。じゃあ、最初は「ほとんど完成」じゃなくて、もっと荒れた状態だったらどうする？' },
  { speaker: 'めたん', text: 'それでも、ちょっとずつ完成に近づければ良いってこと？' },
  { speaker: 'ずんだもん', text: 'そう。少しだけ寄せる、を何度も何度もくり返せば、最後には完成にたどり着く。', event: 'b2.cat' },
  { speaker: 'めたん', text: '大きな問いを、小さな問いの列に分けたのね。' },
  { speaker: 'ずんだもん', text: 'その通り。一発当ての無謀を、易しい一手の連鎖に置き換えた。' },
  { speaker: 'めたん', text: 'それなら、各ステップは学べそうな気がするわね。' },
  { speaker: 'ずんだもん', text: 'そこが鍵。一発当ては学べないけど、易しい一手なら学べる。', event: 'b2.learnable' },
  { speaker: 'めたん', text: 'で、その「バラし方」に二通りある、って話だったわよね。' },
  { speaker: 'ずんだもん', text: 'そう。同じ作戦を、別の軸でバラした、二つの仕組みがあるのだ。', event: 'b2.fork' },
  { speaker: 'めたん', text: 'その二つ、ちょっと先に教えてもらえる？' },
  { speaker: 'ずんだもん', text: 'まず一つ目。最初の状態は、画面ぜんぶがザーザーの砂嵐から始まる。' },
  { speaker: 'めたん', text: '完全な砂嵐ね。' },
  { speaker: 'ずんだもん', text: 'そこから、画面全体のザラつきを、少しだけ薄める。', event: 'b2.diffSide' },
  { speaker: 'ずんだもん', text: 'もう少し薄める。さらに薄める。' },
  { speaker: 'めたん', text: '画面全体が、だんだんはっきりしていくのね。' },
  { speaker: 'ずんだもん', text: '最後にはザラつきが消えて、絵が現れる。これが拡散モデル。' },
  { speaker: 'めたん', text: 'もう一つは？' },
  { speaker: 'ずんだもん', text: 'もう一つは、最初の状態が、何も描かれていない、空っぽのキャンバスから始まる。' },
  { speaker: 'めたん', text: '真っ白ね。' },
  { speaker: 'ずんだもん', text: 'そこに、左上のマスから順に、一マスずつ色を置いていく。', event: 'b2.autoSide' },
  { speaker: 'めたん', text: 'マスを一個ずつ、順に埋めていくのね。' },
  { speaker: 'ずんだもん', text: '全部埋まれば、絵が完成する。これが自己回帰モデル。' },
  { speaker: 'めたん', text: 'あら、ぜんぜん違うわね。一方は「画面全体を少しずつ綺麗に」で、もう一方は「マスを順に埋める」。' },
  { speaker: 'ずんだもん', text: '見た目は違うのだ。でも、両方とも、易しい一手の連鎖、という意味では同じ。' },
  { speaker: 'めたん', text: '軸が違うだけ、って言ってたのは、こういうことね。' },
  { speaker: 'ずんだもん', text: 'では、それぞれをじっくり見せていくのだ。', event: 'b2.preview' },
  { speaker: 'めたん', text: 'お願い。' },
  { speaker: 'ずんだもん', text: 'まずは拡散モデル。', event: 'scene.body3.in' },
  { speaker: 'めたん', text: 'お願い。' },
  { speaker: 'ずんだもん', text: '絵を作るときは、画面全体が完全な砂嵐から始まる。', event: 'b3.start' },
  { speaker: 'めたん', text: '色のついた砂粒が、画面いっぱいに敷き詰められてる感じね。' },
  { speaker: 'ずんだもん', text: 'そこから、ノイズをほんの少しだけ引く。', event: 'b3.subtract' },
  { speaker: 'めたん', text: '「ノイズを引く」って、具体的にはどういうこと？' },
  { speaker: 'ずんだもん', text: '各マスの色を、ほんの少しだけ「絵に近そうな色」に寄せる、ということ。' },
  { speaker: 'めたん', text: '絵に近そうな色。' },
  { speaker: 'ずんだもん', text: '完全にランダムだった砂粒が、わずかに偏りを持ち始める。' },
  { speaker: 'めたん', text: 'まだほとんど砂嵐だけど、なんとなく構図のヒントが見えてきた感じ？' },
  { speaker: 'ずんだもん', text: 'そんな感じ。次のステップで、もう少しノイズを引く。' },
  { speaker: 'ずんだもん', text: 'また次のステップで、もう少し引く。', event: 'b3.more' },
  { speaker: 'めたん', text: 'だんだん、絵がはっきりしてくるのね。' },
  { speaker: 'ずんだもん', text: 'それを20回とか50回くり返すと、絵が完成する。', event: 'b3.count' },
  { speaker: 'めたん', text: '待って。各ステップで「ノイズを少し引く」って、AIはどうやって判断してるの？', event: 'b3.howq' },
  { speaker: 'ずんだもん', text: 'いい質問なのだ。秘密は学習のときの仕掛けにある。' },
  { speaker: 'めたん', text: '仕掛け？' },
  { speaker: 'ずんだもん', text: '学習のときは、逆をやるのだ。完成済みの絵に、ノイズを少しずつ足していく。', event: 'b3.learn' },
  { speaker: 'めたん', text: '絵を、わざと汚していくのね。' },
  { speaker: 'ずんだもん', text: 'そう。完成した絵から始まって、ちょっとずつ砂嵐に近づけていく。' },
  { speaker: 'めたん', text: '手順を、生成と反対方向に回すのね。' },
  { speaker: 'ずんだもん', text: 'そう。すると、各段階で、ノイズが少ない絵と、もう少し多い絵の、ペアができる。' },
  { speaker: 'めたん', text: 'ふむふむ。' },
  { speaker: 'ずんだもん', text: 'そのペアを大量に集めて、AIに「多い側を見て、少ない側を当てよ」と訓練する。', event: 'b3.pairs' },
  { speaker: 'めたん', text: 'あら、それなら答えがちゃんとあるわね。' },
  { speaker: 'ずんだもん', text: '一発当ては答えがないけど、こっちは答えがある。' },
  { speaker: 'めたん', text: '教師ありの問題に化けるのね。' },
  { speaker: 'ずんだもん', text: 'そう、これが鍵。AIは「答えのある問題」しか学べない。' },
  { speaker: 'めたん', text: '絵を汚す手順を自分で決めたから、汚す前の答えを知ってる、と。' },
  { speaker: 'ずんだもん', text: 'その通り。だから絵を作るときは、足した手順を逆にたどるだけで良い。' },
  { speaker: 'めたん', text: '純粋な砂嵐から、ちょっとずつ綺麗にしていけば、いつか完成にたどり着くのね。' },
  { speaker: 'ずんだもん', text: 'これが拡散モデルの正体なのだ。', event: 'b3.identity' },
  { speaker: 'めたん', text: 'ところで、なんで「拡散」っていう名前なの？' },
  { speaker: 'ずんだもん', text: '絵にノイズを足していく方の手順を「拡散」と呼ぶのだ。' },
  { speaker: 'ずんだもん', text: '絵が砂嵐に向かって、染料が水の中に広がるみたいに、ぼやけていく様子に似てるから。' },
  { speaker: 'めたん', text: 'あら、ちゃんと意味のある名前ね。' },
  { speaker: 'ずんだもん', text: '生成側の手順は、その逆だから「逆拡散」とも呼ばれるのだ。' },
  { speaker: 'めたん', text: '絵を作る側が「逆」って呼ばれるの、ちょっと面白いわね。' },
  { speaker: 'ずんだもん', text: '学習の都合上、汚す方向が「正方向」と決まってるのだ。' },
  { speaker: 'めたん', text: 'これを使ってるのが、Stable DiffusionとかMidjourneyとかDALL-Eね。', event: 'b3.products' },
  { speaker: 'ずんだもん', text: 'そう。今の世のお絵かきAIの主流は、ほとんどこの仕組みなのだ。' },
  { speaker: 'ずんだもん', text: '次は、自己回帰モデル。', event: 'scene.body4.in' },
  { speaker: 'めたん', text: 'お願い。' },
  { speaker: 'ずんだもん', text: '絵を作るときは、何も描かれていない、空っぽのキャンバスから始まる。', event: 'b4.empty' },
  { speaker: 'めたん', text: '真っ白ね。' },
  { speaker: 'ずんだもん', text: 'そこで、画像を「パッチ」という小さなマスに区切る。' },
  { speaker: 'めたん', text: 'マスの大きさは？' },
  { speaker: 'ずんだもん', text: '仕組みによるけど、例えば16×16ピクセルが1パッチ。' },
  { speaker: 'めたん', text: '1024の絵だと、縦横64個ずつ、合わせて4096個のパッチね。', event: 'b4.count' },
  { speaker: 'ずんだもん', text: 'そう。そのパッチを、左上から順番に、一つずつ埋めていくのだ。', event: 'b4.fillStart' },
  { speaker: 'めたん', text: '1パッチずつ、順に色を決めていくのね。' },
  { speaker: 'ずんだもん', text: 'そう。各ステップで「次のパッチに何が来るか」を予測する。', event: 'b4.predict' },
  { speaker: 'めたん', text: '文章の続きを書くみたいに？' },
  { speaker: 'ずんだもん', text: 'まさにそれなのだ。GPTが文章を作るときと、まったく同じ仕組み。', event: 'b4.gpt' },
  { speaker: 'めたん', text: 'あら、画像なのに文章と同じ機械でいけるの？' },
  { speaker: 'ずんだもん', text: '画像をパッチの「列」に並べ直せば、文字の列とほとんど同じものになる。' },
  { speaker: 'めたん', text: '列にして並べるんだ。' },
  { speaker: 'ずんだもん', text: '行ごとに左から右、それを上から下へつなげれば、ただの「パッチの並び」になる。', event: 'b4.unroll' },
  { speaker: 'めたん', text: 'そうすれば、GPTの仕組みがそのまま使えるってこと？' },
  { speaker: 'ずんだもん', text: 'そう。だから、自己回帰モデルでの画像生成は、テキスト生成と全く同じ機械で動かせるのだ。' },
  { speaker: 'めたん', text: '各ステップは、何を見て、何を予測してるの？' },
  { speaker: 'ずんだもん', text: 'これまで埋めたパッチを全部見て、次の1パッチの中身を当てる。', event: 'b4.fromAll' },
  { speaker: 'めたん', text: 'これも、各ステップは易しい問題ね。' },
  { speaker: 'ずんだもん', text: 'そう。完成全部を一発で当てる問題が、1パッチ当てる問題の列に化ける。' },
  { speaker: 'めたん', text: 'これも、学習はどうやってるの？' },
  { speaker: 'ずんだもん', text: '完成された画像を持ってきて、パッチの列に並べる。', event: 'b4.learn' },
  { speaker: 'ずんだもん', text: 'そして、「途中までを入力に、その次のパッチを答えに」というペアを大量に作る。' },
  { speaker: 'めたん', text: 'これも教師あり問題に化けるのね。' },
  { speaker: 'ずんだもん', text: 'そう。答えのある問題に変身させてから学ばせる、というところは拡散モデルと同じ。' },
  { speaker: 'めたん', text: '途中までを見せて、続きを当てさせる、っていう作り方なのね。' },
  { speaker: 'ずんだもん', text: 'そう。だから絵を作るときは、ペアの作り方をそのまま再現すれば良い。' },
  { speaker: 'めたん', text: '1パッチ出したら、それを入力に加えて、次の1パッチを出す。' },
  { speaker: 'ずんだもん', text: 'それを最後まで繰り返せば、絵が完成する。', event: 'b4.fullCat' },
  { speaker: 'めたん', text: 'ところで、なんで「自己回帰」っていう名前なの？' },
  { speaker: 'ずんだもん', text: '「自分の出力を、次の入力に回し続ける」からなのだ。' },
  { speaker: 'ずんだもん', text: '1パッチ出力したら、それを次の入力に回す。出力が次の入力になる。' },
  { speaker: 'めたん', text: 'ぐるぐる回しながら、絵が立ち上がっていくのね。' },
  { speaker: 'ずんだもん', text: 'これを使ってるのが、GPT-4oや、最近のGoogleのGeminiの画像生成。' },
  { speaker: 'めたん', text: 'あら、ChatGPTのあれも？', event: 'b4.products' },
  { speaker: 'ずんだもん', text: 'そう、ChatGPTで絵を作れる機能の中身が、この仕組み。' },
  { speaker: 'めたん', text: 'テキストと画像が、同じ機械の上で動いてるってことね。' },
  { speaker: 'ずんだもん', text: 'そう、それが自己回帰モデルの大きな強み。' },
  { speaker: 'めたん', text: '拡散モデルとは、ぜんぜん作り方が違うのね。' },
  { speaker: 'ずんだもん', text: 'ここまでで、二つの仕組みを見たのだ。', event: 'scene.body5.in' },
  { speaker: 'めたん', text: 'うん、ぜんぜん違って見えたわ。' },
  { speaker: 'ずんだもん', text: '見え方は違うのだ。でも、骨組みはほとんど同じ。' },
  { speaker: 'めたん', text: '骨組み？' },
  { speaker: 'ずんだもん', text: '三つの共通点があるのだ。一つずつ並べていく。', event: 'b5.dots' },
  { speaker: 'めたん', text: 'はい。' },
  { speaker: 'ずんだもん', text: '一つ目。両方とも、一発当ての無謀を、易しい一手の連鎖にバラした。', event: 'b5.dot1' },
  { speaker: 'めたん', text: 'これは共通ね。' },
  { speaker: 'ずんだもん', text: '二つ目。両方とも、その連鎖を「前の状態を見て、次を当てる」という形に揃えた。', event: 'b5.dot2' },
  { speaker: 'めたん', text: '拡散モデルは「ノイズが多い絵を見て、少ない絵を当てる」。' },
  { speaker: 'めたん', text: '自己回帰モデルは「埋まったパッチを見て、次のパッチを当てる」。' },
  { speaker: 'ずんだもん', text: 'どっちも、すぐ手前を見て、その次を出す形。' },
  { speaker: 'めたん', text: 'たしかに、構造は同じね。' },
  { speaker: 'ずんだもん', text: '三つ目。両方とも、学習のときに「逆方向」を仕込むことで、答えのある問題に化けさせた。', event: 'b5.dot3' },
  { speaker: 'めたん', text: 'あら、これも共通ね。拡散はノイズを足す側、自己回帰はパッチを並べる側。' },
  { speaker: 'ずんだもん', text: '自分で答えを作ったから、自分で学べる。' },
  { speaker: 'めたん', text: '三つも揃ってると、ほとんど同じ仕組みって言いたくなるわね。' },
  { speaker: 'ずんだもん', text: 'そう、骨組みは本当にそっくりなのだ。' },
  { speaker: 'めたん', text: 'じゃあ、違うのはどこ？' },
  { speaker: 'ずんだもん', text: '違うのは、バラし方の軸、ただ一つだけ。', event: 'b5.axisCalls' },
  { speaker: 'めたん', text: '軸。つまり、何にそって分割したか、ってこと？' },
  { speaker: 'ずんだもん', text: 'その通り。' },
  { speaker: 'ずんだもん', text: '拡散モデルは「ノイズの量」を軸にバラした。画面全体のザラつきを段階的に薄める。', event: 'b5.vert' },
  { speaker: 'ずんだもん', text: '自己回帰モデルは「空間の位置」を軸にバラした。マスを順番に埋める。', event: 'b5.horz' },
  { speaker: 'めたん', text: '同じ作戦を、別の方向で切ってるだけね。' },
  { speaker: 'ずんだもん', text: 'そう。同じ作戦を、別の方向で切ったから、出てくる絵の作られ方が違って見えるだけ。', event: 'b5.midpoints' },
  { speaker: 'めたん', text: '見た目が違うから、別物に見えてただけ、ということね。' },
  { speaker: 'ずんだもん', text: 'そう。中身の発想は、ほとんど同じ。' },
  { speaker: 'めたん', text: '軸が違うと、得意なことも変わってくる？' },
  { speaker: 'ずんだもん', text: '少しだけ違ってくる。脇道として触れておくのだ。' },
  { speaker: 'ずんだもん', text: '拡散モデルは、最初から画面全体の構図がぼんやり決まっていく。', event: 'b5.diffStrength' },
  { speaker: 'めたん', text: '全体のバランスを、最初から見ながら作れるのね。' },
  { speaker: 'ずんだもん', text: 'そう。だから「全体構図」が要る絵に強い。' },
  { speaker: 'ずんだもん', text: '自己回帰モデルは、左上のマスを置いたら、以降の全部がそれに引きずられる。' },
  { speaker: 'めたん', text: '最初の一手が、ずっと効いてくるわね。' },
  { speaker: 'ずんだもん', text: 'でも、テキストや音声と全く同じ機械で扱える。これが大きい。' },
  { speaker: 'めたん', text: '「文章を作って、絵を作って、続きの文章を作る」を、一つの機械で？' },
  { speaker: 'ずんだもん', text: 'それが一本のモデルでできる。' },
  { speaker: 'めたん', text: 'どちらが上というより、軸が違うから得手が違うのね。' },
  { speaker: 'ずんだもん', text: 'そう。優劣じゃなくて、得手の方向が違う。' },
  { speaker: 'めたん', text: '軸の選び方は、用途で決まる感じ？' },
  { speaker: 'ずんだもん', text: 'お絵かき特化なら拡散、テキストと混ぜたいなら自己回帰、と棲み分けが進んでる。', event: 'b5.split' },
  { speaker: 'ずんだもん', text: 'ここまで来たら、最初の話に戻れるのだ。', event: 'scene.outro.in' },
  { speaker: 'めたん', text: '最初は「画像生成AIは一発で当てることを諦めてる」って話だったわね。' },
  { speaker: 'ずんだもん', text: '諦めたうえで、易しい一手の連鎖にバラした。', event: 'outro.chain' },
  { speaker: 'ずんだもん', text: 'これが、画像生成AIの本当の発明なのだ。' },
  { speaker: 'めたん', text: '賢いから絵が描けるんじゃなくて、諦め方が賢いのね。' },
  { speaker: 'ずんだもん', text: 'そういうこと。一発当ては不可能でも、易しい一手なら学べる。' },
  { speaker: 'ずんだもん', text: '学べるから、くり返せる。くり返せるから、絵になる。' },
  { speaker: 'めたん', text: '拡散モデルと自己回帰モデルは、その「バラし方」の二つの軸なのね。', event: 'outro.axes' },
  { speaker: 'ずんだもん', text: 'そう。違う仕組みに見えるけど、骨は同じ。違うのは軸だけ。' },
  { speaker: 'めたん', text: 'ノイズの軸か、空間の軸か。' },
  { speaker: 'ずんだもん', text: 'そう。これからAIが描いた絵を見るときは、軸を思い浮かべてみるのだ。', event: 'outro.q' },
  { speaker: 'めたん', text: '「これは画面全体が砂嵐から立ち上がってきた絵かしら」「これはマス目を順に埋めて作った絵かしら」って。' },
  { speaker: 'ずんだもん', text: 'そう。中で何が起きてるか、想像が湧くようになる。' },
  { speaker: 'めたん', text: '表面の魔法じゃなくて、中の骨組みが見えてくるのね。' },
  { speaker: 'ずんだもん', text: 'それが今日のお土産なのだ。', event: 'outro.end' },
  { speaker: 'めたん', text: 'ありがとう、ずんだもん。' },
  { speaker: 'ずんだもん', text: 'またなのだ。' },
];
