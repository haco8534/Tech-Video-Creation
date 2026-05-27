# -*- coding: utf-8 -*-
# script.md -> scriptData.ts 生成。
# event 名は design_spec.md の event 一覧、SUB はその「紐付くセリフ」の一意な抜粋。
import io, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))

EVENTS = [
    "scene.intro.in", "intro.size", "intro.expand", "intro.ratio", "intro.name",
    "intro.notMagic", "intro.asym", "intro.paperEx", "intro.balance",
    "scene.body1.in", "b1.copy", "b1.example", "b1.rewrite", "b1.lz77",
    "b1.deflate", "b1.huff", "b1.window", "b1.compare", "b1.gap",
    "b1.zeros", "b1.cap258", "b1.ceiling",
    "scene.body2a.in", "b2a.naive", "b2a.split", "b2a.tree", "b2a.five",
    "b2a.million", "b2a.leaf", "b2a.peta", "b2a.share",
    "b2a.depthLimit", "b2a.outdated",
    "scene.body2b.in", "b2b.oneShot", "b2b.fifield", "b2b.struct",
    "b2b.trustDir", "b2b.samePos", "b2b.splits", "b2b.tera",
    "b2b.bypass", "b2b.tools",
    "scene.body3.in", "b3.humanOk", "b3.auto", "b3.ram", "b3.cpu",
    "b3.av", "b3.mail", "b3.web", "b3.ironic", "b3.lazy",
    "b3.limitSize", "b3.limitTime", "b3.ratioGuard", "b3.stream",
    "scene.outro.in", "outro.recap", "outro.kindWeapon", "outro.family",
    "outro.bil", "outro.bilNest", "outro.redos", "outro.commonDef", "outro.final",
]
SUB = {
    "scene.intro.in": "画面にファイルがひとつ",
    "intro.size": "サイズはたったの 42 キロバイト",
    "intro.expand": "中身を全部展開すると、4.5 ペタバイト",
    "intro.ratio": "圧縮率にすると、およそ 1000 億倍",
    "intro.name": "呼ばれる、有名な zip 爆弾",
    "intro.notMagic": "圧縮率の魔法」じゃない",
    "intro.asym": "計算の非対称",
    "intro.paperEx": "同じ文字を 1 億回書け",
    "intro.balance": "指示書はちっちゃい、実行は天文学的",
    "scene.body1.in": "正確に説明できる人は案外少ない",
    "b1.copy": "前に出てきたものを、もう一度書かない",
    "b1.example": "ABCABCABCABCABC",
    "b1.rewrite": "3 文字をもう 4 回くりかえせ",
    "b1.lz77": "1977 年の話",
    "b1.deflate": "DEFLATE っていう圧縮",
    "b1.huff": "「ハフマン符号」を組み合わせた",
    "b1.window": "最大 32 キロバイトまで",
    "b1.compare": "どっちが小さくなると思うのだ",
    "b1.gap": "10 倍以上 開くのだ",
    "b1.zeros": "ゼロが 10 億バイト並んだファイル",
    "b1.cap258": "最大 258 文字までしか",
    "b1.ceiling": "おおよそ 1032 倍",
    "scene.body2a.in": "圧縮したものをまた圧縮する",
    "b2a.naive": "二重圧縮、三重圧縮",
    "b2a.split": "古典的な「再帰展開型」と現代的な「単発型」",
    "b2a.tree": "16 個の同じ zip が入っている",
    "b2a.five": "5 段重ねるのだ",
    "b2a.million": "およそ 100 万個",
    "b2a.leaf": "4 ギガバイトの大きさ",
    "b2a.peta": "ほぼ 4.5 ペタバイト",
    "b2a.share": "ぜんぶ「同じ実体」を指している",
    "b2a.depthLimit": "深さ」に上限",
    "b2a.outdated": "現代の主流の対策にはもう引っかからない",
    "scene.body2b.in": "もう一つの設計が出てくるのだ。単発型",
    "b2b.oneShot": "いきなりとんでもないサイズ",
    "b2b.fifield": "2019 年に David Fifield",
    "b2b.struct": "「セントラルディレクトリ」っていう目次",
    "b2b.trustDir": "巻末の目次のほうを優先",
    "b2b.samePos": "ぜんぶ同じ位置を指す",
    "b2b.splits": "特殊な切れ目を仕込んである",
    "b2b.tera": "10 メガバイトのファイルから 281 テラバイト",
    "b2b.bypass": "深さの上限を 1 にしても、無傷で通り抜ける",
    "b2b.tools": "主要な展開ツールがこの単発型をどう扱うかの一覧表",
    "scene.body3.in": "いちばん困るのは誰だと思う",
    "b3.humanOk": "意外と、それでは深刻にならない",
    "b3.auto": "自動的に中身を全部展開する側",
    "b3.ram": "メモリの上に中身を広げてから",
    "b3.cpu": "10 億回ぶんの書き込み",
    "b3.av": "アンチウイルスソフト",
    "b3.mail": "メールゲートウェイ",
    "b3.web": "ファイルアップロード機能のあるウェブサービス",
    "b3.ironic": "防ごうとする動作で自滅",
    "b3.lazy": "本物のマルウェアまで通り抜けて",
    "b3.limitSize": "最初の 100 メガバイトまで読んだ時点",
    "b3.limitTime": "30 秒を超えたら",
    "b3.ratioGuard": "1000 倍を超えてたらもう中身を見ないで隔離",
    "b3.stream": "展開しながら同時に検査する",
    "scene.outro.in": "もう一度、最初の数字に戻る",
    "outro.recap": "非対称を最大化した",
    "outro.kindWeapon": "受け取る側の几帳面さを狙う武器に化けた",
    "outro.family": "zip だけの話じゃない",
    "outro.bil": "Billion Laughs",
    "outro.bilNest": "これを 9 段",
    "outro.redos": "ReDoS という攻撃",
    "outro.commonDef": "指示書を最後まで実行しない",
    "outro.final": "律儀さを武器に変える攻撃",
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
