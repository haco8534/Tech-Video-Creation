# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.resolve", "intro.carve", "intro.empty", "intro.nodraw", "intro.name",
    "scene.body1.in", "b1.sprinkle", "b1.repeat", "b1.static", "b1.ours", "b1.ask", "b1.nolabel", "b1.grade", "b1.free",
    "scene.body2.in", "b2.guess", "b2.blur", "b2.many", "b2.step", "b2.fog", "b2.chain", "b2.name", "b2.steps",
    "scene.body3.in", "b3.norand", "b3.roll", "b3.newimg", "b3.prompt", "b3.bend", "b3.memo", "b3.scale", "b3.byte", "b3.gist", "b3.gen",
    "scene.outro.in", "outro.empty", "outro.onepower", "outro.rise", "outro.marble", "outro.invert", "outro.choose", "outro.end",
]
SUB = {
    "scene.intro.in": "ぜんぶ砂嵐から作られた",
    "intro.resolve": "砂嵐がだんだん猫に化けて",
    "intro.carve": "砂の中から猫を彫り出す",
    "intro.empty": "砂嵐の中には、何も無い",
    "intro.nodraw": "絵の描き方なんて一度も",
    "intro.name": "これが拡散モデル",
    "scene.body1.in": "きれいな一枚の絵を用意",
    "b1.sprinkle": "ガウスノイズっていう",
    "b1.repeat": "これを何百回も",
    "b1.static": "この壊す手順を拡散過程",
    "b1.ours": "ぼくたち自身なのだ",
    "b1.ask": "さっき足した点はどれだ",
    "b1.nolabel": "ラベルは一切いらない",
    "b1.grade": "その場で丸つけできる",
    "b1.free": "練習問題と答えが、タダで",
    "scene.body2.in": "一気にきれいな絵へ戻せば",
    "b2.guess": "くっきり出ると思うか",
    "b2.blur": "もやっとした塊が出る",
    "b2.many": "ぜんぶの平均を出す",
    "b2.step": "ほんの一歩だけノイズを取る",
    "b2.fog": "濃い霧の中で道を探す",
    "b2.chain": "一歩ごとに絵はくっきり",
    "b2.name": "これが逆拡散、サンプリング",
    "b2.steps": "もとは千ステップ",
    "scene.body3.in": "まっさらな新しい砂嵐を用意",
    "b3.norand": "元になった一枚なんて",
    "b3.roll": "坂を下るように転がる",
    "b3.newimg": "見たことのない新しい絵",
    "b3.prompt": "プロンプトをささやく",
    "b3.bend": "坂の傾きを、言葉で曲げる",
    "b3.memo": "そのまま出してるんじゃない",
    "b3.scale": "50億枚なのだ",
    "b3.byte": "1バイトも残らない",
    "b3.gist": "猫っぽさ」「毛の流れ",
    "b3.gen": "コピーじゃなく、生成",
    "scene.outro.in": "最初の気持ち悪さに",
    "outro.empty": "彫り出したんじゃない",
    "outro.onepower": "ちょっとだけマシにする",
    "outro.rise": "見たことのない絵が立ち上がる",
    "outro.marble": "大理石の中に像が眠って",
    "outro.invert": "像なんて眠ってない",
    "outro.choose": "より像らしいほう」を選ぶ",
    "outro.end": "千の小さな選択が",
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
