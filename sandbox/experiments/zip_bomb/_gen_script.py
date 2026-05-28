# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成（4段パイプライン [4] Composition.tsx 用）。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.size", "intro.expand", "intro.ratio", "intro.name", "intro.asym", "intro.paper",
    "scene.comp.in", "comp.string", "comp.fold", "comp.lz77", "comp.deflate", "comp.zeros", "comp.ceiling", "comp.wall",
    "scene.recur.in", "recur.double", "recur.random", "recur.nest", "recur.stack", "recur.peta", "recur.depth", "recur.obsolete",
    "scene.single.in", "single.oneshot", "single.fifield", "single.struct", "single.tail", "single.point", "single.multi", "single.tera", "single.depth1",
    "scene.trigger.in", "trigger.human", "trigger.auto", "trigger.resource", "trigger.dos", "trigger.who", "trigger.irony", "trigger.cut", "trigger.limit", "trigger.ratio",
    "scene.outro.in", "outro.kindness", "outro.weapon", "outro.family", "outro.redos", "outro.common", "outro.end",
]
SUB = {
    "scene.intro.in": "画面にファイルがひとつ",
    "intro.size": "たったの 42 キロバイト",
    "intro.expand": "中身を全部展開すると",
    "intro.ratio": "圧縮率にすると",
    "intro.name": "「42.zip」と呼ばれる",
    "intro.asym": "計算の非対称なのだ",
    "intro.paper": "同じ文字を 1 億回書け",
    "scene.comp.in": "正確に説明できる人は案外少ない",
    "comp.string": "ABCABCABC",
    "comp.fold": "3 文字前にもどって",
    "comp.lz77": "LZ77 という呼び名",
    "comp.deflate": "内部で使っている DEFLATE",
    "comp.zeros": "ゼロが 10 億バイト並んだ",
    "comp.ceiling": "おおよそ 1032 倍",
    "comp.wall": "1 段ではせいぜい 1000 倍",
    "scene.recur.in": "どうやって作るのか",
    "recur.double": "二重圧縮、三重圧縮",
    "recur.random": "見た目はランダムに近い",
    "recur.nest": "16 個の同じ zip",
    "recur.stack": "これを 5 段重ねる",
    "recur.peta": "ほぼ 4.5 ペタ",
    "recur.depth": "再帰的に展開する深さ",
    "recur.obsolete": "現代の主流の対策にはもう引っかからない",
    "scene.single.in": "もう一つの設計",
    "single.oneshot": "1 回展開しただけで",
    "single.fifield": "David Fifield",
    "single.struct": "セントラルディレクトリ",
    "single.tail": "巻末の目次のほうを優先",
    "single.point": "ぜんぶ同じ位置を指す",
    "single.multi": "何度も何度も書き出して",
    "single.tera": "10 メガバイトのファイルから",
    "single.depth1": "深さの上限を 1 にしても",
    "scene.trigger.in": "いちばん困るのは誰",
    "trigger.human": "ディスク容量が足りません",
    "trigger.auto": "自動的に中身を全部展開する側",
    "trigger.resource": "どれが先に音を上げるか",
    "trigger.dos": "サービスを止める攻撃",
    "trigger.who": "アンチウイルスソフト",
    "trigger.irony": "その防ごうとする動作で自滅",
    "trigger.cut": "展開を最後までやりきらない",
    "trigger.limit": "最大展開サイズ",
    "trigger.ratio": "圧縮率そのものを警戒の合図",
    "scene.outro.in": "もう一度、最初の数字",
    "outro.kindness": "送る側の気遣いの技術",
    "outro.weapon": "狙う武器に化けた",
    "outro.family": "Billion Laughs",
    "outro.redos": "ReDoS という攻撃",
    "outro.common": "指示書を最後まで実行しない",
    "outro.end": "律儀さを武器に変える攻撃",
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
scene_ev = len([e for e in EVENTS if e.startswith("scene.")])
print("セリフ行数:", len(script))
print("総文字数:", total)
print("event 全%d (scene %d / 内容 %d)= 全行の %.1f%%" % (len(EVENTS), scene_ev, content_ev, content_ev / len(script) * 100))
for cf in (4, 4.5, 5):
    fr = sum(max(40, int(len(tx) * cf)) + 6 for _, tx, _ in script) + 90
    print("CHAR_FRAMES=%s -> %d frames / %.1f min" % (cf, fr, fr / 30 / 60))
print("OK scriptData.ts 生成")
