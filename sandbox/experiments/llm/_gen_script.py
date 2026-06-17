# script.md -> scriptData.ts 生成
# event は design_spec.md の対応セリフへ、本文の部分一致で付与する
import io
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent

# event名 -> セリフ本文の一意な部分文字列（design_spec.md と対応）
EVENT_MAP = [
    ("scene.intro.in", "LLMってさ、よく「次の言葉を予測してるだけ」"),
    ("strip.fill", "でもそれでコードを書いたり"),
    ("strip.chain", "その説明は間違いではないけど、薄すぎる"),
    ("strip.question", "なぜ、文章の続きを当てる練習をしているだけで"),
    ("scene.deep.in", "まず、「次の言葉を当てる」を軽く見ないほうがいい"),
    ("rain.fill", "次は「持つ」とか「差す」が自然"),
    ("rain.links", "「雨」「傘」「外出」が関係している"),
    ("code.in", "「このプログラムはファイルを開いたあと、最後に」と来たら"),
    ("code.rule", "開いたものを閉じることが多い"),
    ("map.in", "文章の背後にあるパターンを内部に作るしかない"),
    ("map.grow", "「こういう文脈ならこう続く」という圧縮された地図"),
    ("map.apart", "地図は便利だけど、地図と現地は違う"),
    ("scene.tokens.in", "LLMは、文章をそのまま読んでいるわけではない"),
    ("strip.cut", "最初に、文章を小さな部品へ切る"),
    ("token.size", "よく出るかたまりは大きめに、珍しいかたまりは小さめに"),
    ("token.numbers", "コンピュータが扱える数字の並びに変換される"),
    ("pair.near", "たとえば「犬」と「猫」は意味が近い"),
    ("pair.far", "一方で「犬」と「消費税」は遠い"),
    ("space.in", "言葉を数字の空間に置くのだ"),
    ("space.cluster", "似た意味の点は近くに集まり"),
    ("akarui.blur", "「明るい」という言葉は、部屋にも性格にも未来にも使える"),
    ("scene.attention.in", "ここで「Attention」という言葉を導入する"),
    ("arc.example", "「めたんはケーキを買った。冷蔵庫にそれを入れた」とする"),
    ("arc.it", "「それ」はケーキを指している"),
    ("arc.weights", "前の「ケーキ」に強く注意を向ける必要がある"),
    ("arcs.kinds", "代名詞を見る線、文法を見る線"),
    ("layers.in", "何層も処理する仕組みを、Transformerと呼ぶ"),
    ("layers.rewrite", "役割や文脈を含んだ表現へ変わっていく"),
    ("scene.icl.in", "例をいくつか見せると急に合わせてくる"),
    ("icl.answer", "「Dは？」と聞くと、4と答えやすい"),
    ("weights.in", "モデルの中身を更新していないこと"),
    ("weights.frozen", "モデルの重みは変わっていない"),
    ("rule.emerge", "「今はこういうルールの話だな」と推定して"),
    ("rule.apply", "文脈を読んで、モードを切り替えてる感じね"),
    ("context.swap", "どんな文脈に置くかで、引き出される力が変わる"),
    ("steps.in", "文脈の中に中間状態を置くと"),
    ("scene.hallucination.in", "ここでハルシネーションの話ね"),
    ("strip.smooth", "かなり自然な文章で、かなりそれっぽく間違う"),
    ("map.front", "真実だけをきれいに保存した辞書ではない"),
    ("map.flaws", "地図に載っている道が古かったり"),
    ("blank.fill", "地図の空白をそれっぽく補うのが得意"),
    ("check.in", "現実と合っているかを確かめる力"),
    ("check.mismatch", "文章をうまくする係と、現実チェック係は別に置け"),
    ("check.tools", "コードなら実行する"),
    ("draft.value", "見取り図を描き、仮説を出し"),
    ("scene.outro.in", "最初の違和感は"),
    ("recap.flow", "LLMは文章をトークンに切り、数字の空間に置き"),
    ("map.final", "文章から作った世界の地図なのだ"),
    ("map.zones", "地図が古い場所や空白の場所では"),
    ("final.mark", "どこから現地確認が必要かを見分ける"),
]

LINE_RE = re.compile(r"^(ずんだもん|めたん)：(.+)$")


def main() -> None:
    src = (HERE / "script.md").read_text(encoding="utf-8")
    lines = []
    for raw in src.splitlines():
        m = LINE_RE.match(raw.strip())
        if m:
            lines.append({"speaker": m.group(1), "text": m.group(2)})

    used = set()
    for name, key in EVENT_MAP:
        hits = [i for i, l in enumerate(lines) if key in l["text"]]
        if len(hits) != 1:
            sys.exit(f"event {name}: key '{key}' matched {len(hits)} lines {hits}")
        i = hits[0]
        if i in used:
            sys.exit(f"event {name}: line {i} already has an event")
        used.add(i)
        lines[i]["event"] = name

    out = io.StringIO()
    out.write("// _gen_script.py が script.md から生成。手で編集しない。\n")
    out.write("export type Speaker = 'めたん' | 'ずんだもん';\n")
    out.write(
        "export type ScriptLine = { speaker: Speaker; text: string; event?: string };\n\n"
    )
    out.write("export const SCRIPT: ScriptLine[] = [\n")
    for l in lines:
        ev = f", event: '{l['event']}'" if "event" in l else ""
        text = l["text"].replace("\\", "\\\\").replace("'", "\\'")
        out.write(f"    {{ speaker: '{l['speaker']}', text: '{text}'{ev} }},\n")
    out.write("];\n")
    (HERE / "scriptData.ts").write_text(out.getvalue(), encoding="utf-8")

    total_chars = sum(len(l["text"]) for l in lines)
    print(f"lines={len(lines)} events={len(used)} chars={total_chars}")


if __name__ == "__main__":
    main()
