# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（処理用、生成後に削除）
import io, sys

EVENTS = [
    "scene.intro.in","intro.predict","intro.uses","intro.merge","intro.question",
    "scene.body1.in","kakeru.waver","kakeru.context","kakeru.resolve","order.flip","oldmachine.dict",
    "scene.body2.in","attn.ask","attn.weight","qkv.open","qk.match","value.sum","focus.dressed","attn.all","qkv.learn",
    "scene.body3.in","heads.split","heads.merge","layers.stack","pos.shuffle","pos.wave",
    "scene.body4.in","rnn.relay","tf.parallel","rnn.fade","tf.direct","learn.game","learn.scale",
    "scene.outro.in","recap.devices","outro.loopback","outro.end",
]
SUB = {
    "scene.intro.in": "スマホで文字を打っている",
    "intro.predict": "「ございます」が候補に出てくる",
    "intro.uses": "外国語をなめらかに訳す自動翻訳",
    "intro.merge": "ちゃんと名前があるのだ",
    "intro.question": "絵で一歩ずつ追いかけて",
    "scene.body1.in": "ひとつだけ取り出してみるのだ",
    "kakeru.waver": "「めがねをかける」",
    "kakeru.context": "決めているのは「めがね」や「電話」",
    "kakeru.resolve": "「電話を」と来た時点で",
    "order.flip": "「ねこが いぬを 追う」",
    "oldmachine.dict": "あてがっていたのだ",
    "scene.body2.in": "心臓部なのだ。名前は Self-Attention",
    "attn.ask": "きみは、ぼくの意味に関係ある",
    "attn.weight": "ほとんど注目しないのだ",
    "qkv.open": "質問、鍵、中身、の三役",
    "qk.match": "ぴたっと噛み合うほど",
    "value.sum": "持っている中身そのものを、注目の強さ",
    "focus.dressed": "電話の文脈を着こんだ",
    "attn.all": "一回ぶんの仕事なのだ",
    "qkv.learn": "まるででたらめなのだ",
    "scene.body3.in": "「関係がある」と言っても",
    "heads.split": "Multi-Head Attention",
    "heads.merge": "その線を全部かさね合わせて",
    "layers.stack": "Self-Attention の層を、何段も積み重ねる",
    "pos.shuffle": "すっぽり抜け落ちるのだ",
    "pos.wave": "位置エンコーディングと呼ぶ",
    "scene.body4.in": "Transformer の前にも",
    "rnn.relay": "「前から一語ずつ」",
    "tf.parallel": "順番待ちが、そもそも、無いのだ",
    "rnn.fade": "うすれて、消えかけてしまうのだ",
    "tf.direct": "ひとっとびで、結べるのだ",
    "learn.game": "文章の途中の言葉をかくして",
    "learn.scale": "現実的な時間で、終わらせられる",
    "scene.outro.in": "ここまでを、絵といっしょに",
    "recap.devices": "ことばの意味は、まわりが決める",
    "outro.loopback": "はじめのお話に、戻ってきますわね",
    "outro.end": "機械が言葉を「見わたす」しくみ",
}

lines = []
with io.open("script.md", encoding="utf-8") as fh:
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
    pipe = "  | " if i == 0 else "  | "
    out.append("%s'%s'%s" % (pipe, e, sep))
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

with io.open("scriptData.ts", "w", encoding="utf-8", newline="\n") as fh:
    fh.write("\n".join(out))

total = sum(len(tx) for _, tx, _ in script)
content_ev = len([e for e in EVENTS if not e.startswith("scene.")])
print("セリフ行数:", len(script))
print("総文字数:", total)
print("event 全%d (scene 6 / 内容 %d)= 全行の %.1f%%" % (len(EVENTS), content_ev, content_ev/len(script)*100))
for cf in (3, 4):
    fr = sum(max(40, len(tx)*cf)+6 for _, tx, _ in script) + 90
    print("CHAR_FRAMES=%d -> %d frames / %.1f min" % (cf, fr, fr/30/60))
print("OK scriptData.ts 生成")
