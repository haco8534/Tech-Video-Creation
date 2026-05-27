# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.three", "intro.title", "intro.gather", "intro.shuffle",
    "scene.body1.in", "b1.house", "b1.fill", "b1.crush", "b1.reject",
    "scene.body2.in", "b2.unravel", "b2.color", "b2.flip", "b2.accept",
    "scene.body3.in", "b3.compress", "b3.flip", "b3.coarse", "b3.bloat",
    "scene.body4.in", "b4.discord", "b4.image", "b4.text", "b4.ban",
    "scene.body5.in", "b5.ground", "b5.blocks", "b5.notcloud", "b5.hidden",
    "scene.outro.in", "outro.chain", "outro.travel", "outro.dna", "outro.end",
]
SUB = {
    "scene.intro.in": "変なものを見たの",
    "intro.three": "画像のなかに音声、動画のなかにマイクラ",
    "intro.title": "脱法クラウドストレージ」と呼ぶ",
    "intro.gather": "ぜんぶ突き詰めると",
    "intro.shuffle": "別の姿に着せ替えてやれば",
    "scene.body1.in": "いちばんすなおなやりかた",
    "b1.house": "いくつかの部屋に区切られている",
    "b1.fill": "九ギガぶん、ぎゅっと詰めかえる",
    "b1.crush": "おっきな部屋を別物で塗りつぶす",
    "b1.reject": "アップロードの入口で、はじかれる",
    "scene.body2.in": "そこで発想を変える",
    "b2.unravel": "画面のなかに見える色として描いて",
    "b2.color": "黒・赤・緑・青の四色で",
    "b2.flip": "一秒で六十枚、別の中身が流れる",
    "b2.accept": "やけに砂嵐っぽい動画",
    "scene.body3.in": "関門？",
    "b3.compress": "1 になることもある",
    "b3.flip": "一字化けただけで",
    "b3.coarse": "マスを大きくとると",
    "b3.bloat": "二十倍くらいに膨らむ",
    "scene.body4.in": "ほかのサービスでも、おなじやりかた",
    "b4.discord": "Discord には別の制約",
    "b4.image": "向こうで作りなおされない",
    "b4.text": "ただのテキストに付け替えて",
    "b4.ban": "アカウントごと止められる",
    "scene.body5.in": "マインクラフトの山。あれはどういうやりかた",
    "b5.ground": "土、石、木、いろんな色のブロック",
    "b5.blocks": "立体のマス目を作る",
    "b5.notcloud": "自分の手元で立ててもいい",
    "b5.hidden": "気づかれない通り道」として見ると",
    "scene.outro.in": "おなじ仕掛けが姿を変えていただけ",
    "outro.chain": "mp4 の中身に化けようとして",
    "outro.travel": "変装の中身も変わっていった",
    "outro.dna": "DNA の中に書きこむ",
    "outro.end": "やっぱり、おなじお話",
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
