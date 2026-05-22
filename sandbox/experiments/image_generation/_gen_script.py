# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.prompt", "intro.variant", "intro.notcollage",
    "intro.newborn", "intro.title",
    "scene.body1.in", "b1.pixels", "b1.random", "b1.space", "b1.thread",
    "b1.walk", "b1.walkoff", "b1.oneshot", "b1.chain",
    "scene.body2.in", "b2.axis", "b2.train", "b2.predict", "b2.generate",
    "b2.emerge", "b2.prompt", "b2.vary",
    "scene.body3.in", "b3.text", "b3.patches", "b3.codebook", "b3.tokenize",
    "b3.merge", "b3.write",
    "scene.body4.in", "b4.common", "b4.learn", "b4.diff", "b4.meritD",
    "b4.meritA", "b4.weak", "b4.merge",
    "scene.outro.in", "outro.recap", "outro.converge", "outro.callback",
    "outro.end",
]
SUB = {
    "scene.intro.in": "絵を描いてくれるアプリ",
    "intro.prompt": "と打てば、宇宙服を着た猫が出てくる",
    "intro.variant": "別の猫が出てきた",
    "intro.notcollage": "どこかからの検索でも",
    "intro.newborn": "新しく生まれた一枚",
    "intro.title": "土台の話から",
    "scene.body1.in": "絵そのものの正体",
    "b1.pixels": "ピクセルと呼ぶ",
    "b1.random": "砂嵐だわ",
    "b1.space": "ぜんぶの絵が住む",
    "b1.thread": "細い糸のように",
    "b1.walk": "となりへ一歩ずれる",
    "b1.walkoff": "意味がこわれていく",
    "b1.oneshot": "「猫を描け」と命じて",
    "b1.chain": "画像生成AIの、背骨",
    "scene.body2.in": "ディフュージョンと言う",
    "b2.axis": "「ノイズの濃さ」にとる",
    "b2.train": "完全な砂嵐にしてしまう",
    "b2.predict": "それを見ぬく。それだけ",
    "b2.generate": "覚えた一手をかける",
    "b2.emerge": "霧が晴れていくみたいに",
    "b2.prompt": "プロンプトを、いっしょに",
    "b2.vary": "出発の砂嵐が、毎回ちがう",
    "scene.body3.in": "絵に持ちこむ",
    "b3.text": "ひたすら繰り返す",
    "b3.patches": "小さなマス目のかけらに、刻む",
    "b3.codebook": "「絵の単語帳」を、用意する",
    "b3.tokenize": "長い列に、化ける",
    "b3.merge": "ひとつながりの列にする",
    "b3.write": "左上の角から、順番に",
    "scene.body4.in": "隣に並べて、見くらべる",
    "b4.common": "あきらめている",
    "b4.learn": "糸の地形のほう",
    "b4.diff": "ぼんやり全体から、くっきり全体へ",
    "b4.meritD": "こまかな質感に、強い",
    "b4.meritA": "よく理解できる",
    "b4.weak": "まちがいが、あとへ響く",
    "b4.merge": "芯の二択は、変わらない",
    "scene.outro.in": "はじめの不思議に、戻る",
    "outro.recap": "順に、たどり直す",
    "outro.converge": "まだ誰も立っていない一点",
    "outro.callback": "とほうもない広さから",
    "outro.end": "まだまだ眠っているのね",
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
print("event 全%d (scene 6 / 内容 %d)= 内容は全行の %.1f%%"
      % (len(EVENTS), content_ev, content_ev / len(script) * 100))
for cf in (4.0, 4.3, 4.5):
    fr = sum(max(40, int(round(len(tx) * cf))) + 6 for _, tx, _ in script) + 90
    print("CHAR_FRAMES=%s -> %d frames / %.1f min" % (cf, fr, fr / 30 / 60))
print("OK scriptData.ts 生成")
