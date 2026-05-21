# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.subtract", "intro.reveal", "intro.mystery", "intro.name",
    "scene.body1.in", "b1.sprinkle", "b1.repeat", "b1.full", "b1.small", "b1.record",
    "scene.body2.in", "b2.pick", "b2.guess", "b2.check", "b2.fix", "b2.loop", "b2.skill",
    "scene.body3.in", "b3.subtract", "b3.climb", "b3.top", "b3.fresh", "b3.emerge",
    "b3.learned", "b3.variety",
    "scene.body4.in", "b4.random", "b4.prompt", "b4.compass", "b4.steer", "b4.dial", "b4.result",
    "scene.outro.in", "outro.recap", "outro.loopback", "outro.end",
]
SUB = {
    "scene.intro.in": "言葉を打ちこむだけで",
    "intro.subtract": "足すんじゃなく、引いていく",
    "intro.reveal": "霧が晴れて、奥の景色が見えてくる",
    "intro.mystery": "絵なんて入ってない",
    "intro.name": "拡散モデル、というのだ",
    "scene.body1.in": "きれいな写真が一枚ある",
    "b1.sprinkle": "ほんの少しだけ、ノイズを振りかける",
    "b1.repeat": "もう一回、振りかけるのだ",
    "b1.full": "ねこの形が残ってない",
    "b1.small": "「ほんの少し」を、何十回も重ねた",
    "b1.record": "一段ずつ控えておくのだ",
    "scene.body2.in": "機械に出すのは、こういう問題",
    "b2.pick": "半分くらい壊れた、ねこを取り出す",
    "b2.guess": "足されたノイズは、たぶん、これ",
    "b2.check": "ならべて見くらべるのだ",
    "b2.fix": "機械の中身を、ほんの少し調整する",
    "b2.loop": "別の段を選び、別の写真を選ぶ",
    "b2.skill": "たった一つの技を、身につけた",
    "scene.body3.in": "ノイズ当てが、絵を描く力になる",
    "b3.subtract": "当てたノイズを引くのだ",
    "b3.climb": "一段ずつ、階段をのぼっていく",
    "b3.top": "ノイズはすっかり消えて",
    "b3.fresh": "まっさらででたらめな砂あらし",
    "b3.emerge": "見たこともない絵が、ぼうっと浮かび上がって",
    "b3.learned": "「ノイズの少ない絵は、こういう手ざわり」",
    "b3.variety": "出発の砂あらしが変われば",
    "scene.body4.in": "こまったこと、って",
    "b4.random": "何が出るかは、砂あらしまかせ",
    "b4.prompt": "プロンプトを、使うのだ",
    "b4.compass": "宇宙服のねこの方角」と指す、矢印",
    "b4.steer": "宇宙服のねこのほうへ舵を切る",
    "b4.dial": "効き目を強くも弱くもできる",
    "b4.result": "注文どおりの絵を引き出す",
    "scene.outro.in": "ここまでを、絵といっしょに",
    "outro.recap": "はじまりは、一枚のきれいな写真",
    "outro.loopback": "「砂あらしの奥に、絵は隠れているのか」",
    "outro.end": "「霧から見つけ出す」しくみ",
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

# event 割り当て
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

# scriptData.ts 出力
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
print("event 全%d (scene 6 / 内容 %d)= 全行の %.1f%%" % (len(EVENTS), content_ev, content_ev / len(script) * 100))
for cf in (4, 4.5, 5):
    fr = sum(max(40, int(len(tx) * cf)) + 6 for _, tx, _ in script) + 90
    print("CHAR_FRAMES=%s -> %d frames / %.1f min" % (cf, fr, fr / 30 / 60))
print("OK scriptData.ts 生成")
