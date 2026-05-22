# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.channel", "intro.naive", "intro.keyleak", "intro.name",
    "scene.body1.in", "b1.snap", "b1.pair", "b1.publish", "b1.lock", "b1.open",
    "scene.body2.in", "b2.inside", "b2.forward", "b2.backward", "b2.trapdoor", "b2.caveat",
    "scene.body3.in", "b3.reverse", "b3.anyopen", "b3.sign",
    "scene.outro.in", "outro.recap", "outro.loopback", "outro.end",
]
SUB = {
    "scene.intro.in": "ネットでお買い物する",
    "intro.channel": "長い通信路が伸びている",
    "intro.naive": "箱に入れて、錠前をかけて",
    "intro.keyleak": "鍵まで見られる",
    "intro.name": "名前があるのだ",
    "scene.body1.in": "思いこみをひとつ外す",
    "b1.snap": "それだけで掛かる錠前",
    "b1.pair": "錠前と鍵をひとそろい用意",
    "b1.publish": "いくつも通信路に流して",
    "b1.lock": "配られた錠前で箱をパチンと閉じて",
    "b1.open": "一度も通信路を通っていない",
    "scene.body2.in": "ひとつ引っかかるの",
    "b2.inside": "錠前の中身は、金属ではなく",
    "b2.forward": "大きな素数をふたつ、掛け合わせる",
    "b2.backward": "元のふたつの数を言い当てて",
    "b2.trapdoor": "帰り道に隠し扉が開く",
    "b2.caveat": "絶対に解けない",
    "scene.body3.in": "もう一芸あるのだ",
    "b3.reverse": "手元の秘密鍵のほうで、箱を閉じて",
    "b3.anyopen": "世界じゅうの誰でも開けられる",
    "b3.sign": "これを署名と呼ぶ",
    "scene.outro.in": "もう一度たどってみる",
    "outro.recap": "はじまりは、人目のある通信路",
    "outro.loopback": "鍵を渡さずに、秘密を送れるのか",
    "outro.end": "配るもの」と「隠すもの」に分けた",
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
print("event 全%d (scene 5 / 内容 %d)= 全行の %.1f%%" % (len(EVENTS), content_ev, content_ev / len(script) * 100))
for cf in (4, 4.5, 5):
    fr = sum(max(40, int(len(tx) * cf)) + 6 for _, tx, _ in script) + 90
    print("CHAR_FRAMES=%s -> %d frames / %.1f min" % (cf, fr, fr / 30 / 60))
print("OK scriptData.ts 生成")
