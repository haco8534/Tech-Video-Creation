# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.story", "intro.pick", "intro.repeat", "intro.empty", "intro.place",
    "scene.body1.in", "b1.number", "b1.map", "b1.embed", "b1.vector", "b1.queen", "b1.dims", "b1.neighbors", "b1.firth", "b1.train",
    "scene.body2.in", "b2.pronoun", "b2.lookaround", "b2.move", "b2.attention", "b2.quiz", "b2.focus", "b2.general",
    "scene.body3.in", "b3.dist", "b3.pick", "b3.temp", "b3.halluc", "b3.append", "b3.loop", "b3.noplan",
    "scene.outro.in", "outro.empty", "outro.room", "outro.symbol", "outro.human", "outro.mirror", "outro.end",
]
SUB = {
    "scene.intro.in": "なんで賢いの",
    "intro.story": "って聞かれたら",
    "intro.pick": "おじいさんと」？",
    "intro.repeat": "一番ありそうな一語",
    "intro.empty": "意味なんて一個も",
    "intro.place": "言葉の置かれた場所",
    "scene.body1.in": "数字しか扱え",
    "b1.number": "みかん2番",
    "b1.map": "点として置く",
    "b1.embed": "分散表現",
    "b1.vector": "「男」のぶんだけ",
    "b1.queen": "ぴたっと着く",
    "b1.dims": "測る物差し",
    "b1.neighbors": "一緒に出てくる",
    "b1.firth": "つきあう仲間を見れば",
    "b1.train": "最後を隠して",
    "scene.body2.in": "同じ点なのだ",
    "b2.pronoun": "猫が魚を食べた",
    "b2.lookaround": "関係ある？",
    "b2.move": "「魚」の側へ",
    "b2.attention": "注意機構",
    "b2.quiz": "性格の明るさ",
    "b2.focus": "点がぼやけてる",
    "b2.general": "丸暗記じゃない",
    "scene.body3.in": "確率をふる",
    "b3.dist": "60パーセント",
    "b3.pick": "一個だけ選ぶ",
    "b3.temp": "つまみで変えられる",
    "b3.halluc": "それっぽい」の区別",
    "b3.append": "文のお尻に",
    "b3.loop": "自己回帰",
    "b3.noplan": "建物が建つ",
    "scene.outro.in": "LLMの中身を見る",
    "outro.empty": "場所と距離だけ",
    "outro.room": "こんな話をした",
    "outro.symbol": "規則どおり記号を返す",
    "outro.human": "周りでどう使われてる",
    "outro.mirror": "おどろくほど同じ",
    "outro.end": "問い返してくる",
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
zun = sum(len(tx) for sp, tx, _ in script if sp == "ずんだもん")
met = sum(len(tx) for sp, tx, _ in script if sp == "めたん")
print("セリフ行数:", len(script))
print("総文字数:", total)
print("ずんだもん:めたん 文字数比 = %.2f : 1" % (zun / max(1, met)))
print("event 全%d (scene 5 / 内容 %d)= 全行の %.1f%%" % (len(EVENTS), content_ev, content_ev / len(script) * 100))
for cf in (4, 4.5, 5):
    fr = sum(max(40, int(len(tx) * cf)) + 6 for _, tx, _ in script) + 90
    print("CHAR_FRAMES=%s -> %d frames / %.1f min" % (cf, fr, fr / 30 / 60))
print("OK scriptData.ts 生成")
