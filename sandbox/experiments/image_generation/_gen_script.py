# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.prompt", "intro.q", "intro.giveup", "intro.twocolors", "intro.title",
    "scene.body1.in", "b1.count", "b1.rgb", "b1.sea", "b1.point", "b1.allatonce", "b1.abandon",
    "scene.body2.in", "b2.split", "b2.easy", "b2.cat", "b2.learnable", "b2.fork", "b2.diffSide", "b2.autoSide", "b2.preview",
    "scene.body3.in", "b3.start", "b3.subtract", "b3.more", "b3.count", "b3.howq", "b3.learn", "b3.pairs", "b3.identity", "b3.products",
    "scene.body4.in", "b4.empty", "b4.count", "b4.fillStart", "b4.predict", "b4.gpt", "b4.unroll", "b4.fromAll", "b4.learn", "b4.fullCat", "b4.products",
    "scene.body5.in", "b5.dots", "b5.dot1", "b5.dot2", "b5.dot3", "b5.axisCalls", "b5.vert", "b5.horz", "b5.midpoints", "b5.diffStrength", "b5.split",
    "scene.outro.in", "outro.chain", "outro.axes", "outro.q", "outro.end",
]
SUB = {
    "scene.intro.in": "最近よく見る画像生成AI",
    "intro.prompt": "本当に猫が出てくる",
    "intro.q": "頭の中で完成図",
    "intro.giveup": "最初から諦めてる",
    "intro.twocolors": "主役は二つ",
    "intro.title": "なぜ無謀なのか",
    "scene.body1.in": "ただの数字のマス目",
    "b1.count": "約100万個",
    "b1.rgb": "約1600万通りの色",
    "b1.sea": "ザーザーの砂嵐に見える絵",
    "b1.point": "ごく小さな点",
    "b1.allatonce": "全部いっぺんに当てる",
    "b1.abandon": "この戦い方をまず捨てた",
    "scene.body2.in": "こう考え直したのだ",
    "b2.split": "易しい一手のくり返し",
    "b2.easy": "もう一歩だけ完成に寄せる",
    "b2.cat": "最後には完成にたどり着く",
    "b2.learnable": "一発当ては学べないけど",
    "b2.fork": "別の軸でバラした",
    "b2.diffSide": "画面全体のザラつきを、少しだけ薄める",
    "b2.autoSide": "左上のマスから順に",
    "b2.preview": "じっくり見せていくのだ",
    "scene.body3.in": "まずは拡散モデル",
    "b3.start": "画面全体が完全な砂嵐",
    "b3.subtract": "ノイズをほんの少しだけ引く",
    "b3.more": "また次のステップで、もう少し引く",
    "b3.count": "20回とか50回くり返す",
    "b3.howq": "AIはどうやって判断",
    "b3.learn": "完成済みの絵に、ノイズを少しずつ足していく",
    "b3.pairs": "多い側を見て、少ない側を当てよ",
    "b3.identity": "拡散モデルの正体",
    "b3.products": "MidjourneyとかDALL-E",
    "scene.body4.in": "次は、自己回帰モデル",
    "b4.empty": "絵を作るときは、何も描かれていない",
    "b4.count": "4096個のパッチ",
    "b4.fillStart": "左上から順番に、一つずつ埋めて",
    "b4.predict": "次のパッチに何が来るか",
    "b4.gpt": "GPTが文章を作るときと、まったく同じ仕組み",
    "b4.unroll": "ただの「パッチの並び」",
    "b4.fromAll": "全部見て、次の1パッチ",
    "b4.learn": "パッチの列に並べる",
    "b4.fullCat": "最後まで繰り返せば、絵が完成",
    "b4.products": "ChatGPTのあれも",
    "scene.body5.in": "二つの仕組みを見たのだ",
    "b5.dots": "三つの共通点",
    "b5.dot1": "両方とも、一発当ての無謀",
    "b5.dot2": "前の状態を見て、次を当てる",
    "b5.dot3": "答えのある問題に化けさせた",
    "b5.axisCalls": "バラし方の軸、ただ一つだけ",
    "b5.vert": "ノイズの量」を軸",
    "b5.horz": "空間の位置」を軸",
    "b5.midpoints": "別の方向で切ったから",
    "b5.diffStrength": "最初から画面全体の構図",
    "b5.split": "棲み分けが進んでる",
    "scene.outro.in": "最初の話に戻れるのだ",
    "outro.chain": "諦めたうえで、易しい",
    "outro.axes": "二つの軸なのね",
    "outro.q": "軸を思い浮かべて",
    "outro.end": "今日のお土産",
}

lines = []
with io.open(os.path.join(HERE, "script.md"), encoding="utf-8") as fh:
    for raw in fh:
        s = raw.rstrip("\n")
        if not s.strip():
            continue
        if s.lstrip().startswith("#"):
            continue
        if "：" not in s:
            continue
        sp, tx = s.split("：", 1)
        lines.append((sp.strip(), tx.strip()))

assigned = {}
script = []
for idx, (sp, tx) in enumerate(lines):
    ev = None
    for e in EVENTS:
        if SUB[e] in tx:
            if e in assigned:
                sys.exit("event 重複: %s (line %d & %d)" % (e, assigned[e], idx))
            if ev is not None:
                sys.exit("1行に複数 event: line %d (%s, %s)" % (idx, ev, e))
            ev = e
            assigned[e] = idx
    script.append((sp, tx, ev))

missing = [e for e in EVENTS if e not in assigned]
if missing:
    sys.exit("未割り当て event: %s" % missing)

def esc(t):
    return t.replace("\\", "\\\\").replace("'", "\\'")

out = []
out.append("// このファイルは script.md から _gen_script.py で生成。手で編集しない。")
out.append("// 4段パイプライン [4] Composition.tsx 用のセリフ＋event データ。")
out.append("")
out.append("export type Speaker = 'めたん' | 'ずんだもん';")
out.append("")
out.append("export type AnimEvent =")
for i, e in enumerate(EVENTS):
    sep = ";" if i == len(EVENTS) - 1 else ""
    out.append("  | '%s'%s" % (e, sep))
out.append("")
out.append("export type ScriptLine = { speaker: Speaker; text: string; event?: AnimEvent };")
out.append("")
out.append("export const SCRIPT: ScriptLine[] = [")
for sp, tx, ev in script:
    if ev:
        out.append("  { speaker: '%s', text: '%s', event: '%s' }," % (sp, esc(tx), ev))
    else:
        out.append("  { speaker: '%s', text: '%s' }," % (sp, esc(tx)))
out.append("];")
out.append("")

with io.open(os.path.join(HERE, "scriptData.ts"), "w", encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(out))

total = sum(len(tx) for _, tx, _ in script)
content_ev = len([e for e in EVENTS if not e.startswith("scene.")])
print("セリフ行数:", len(script))
print("総文字数:", total)
print("event 全%d (scene 7 / 内容 %d)= 全行の %.1f%%" % (len(EVENTS), content_ev, content_ev / len(script) * 100))
for cf in (4, 4.5, 5):
    fr = sum(max(40, int(len(tx) * cf)) + 6 for _, tx, _ in script) + 90
    print("CHAR_FRAMES=%s -> %d frames / %.1f min" % (cf, fr, fr / 30 / 60))
print("OK scriptData.ts 生成")
