# script.md -> scriptData.ts 生成
# event は design_spec.md の対応セリフへ、本文の部分一致で付与する
import io
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent

# event名 -> セリフ本文の一意な部分文字列（design_spec.md と対応）
EVENT_MAP = [
    # 画面 1: intro
    ("scene.intro.in", "AIって、文章も書くし"),
    ("icons.orbit", "中で何が起きてるのか全然わからない"),
    ("doctor.false", "小さい博士でも入ってるのかと思うわ"),
    ("search.false", "じゃあ巨大な検索エンジン"),
    ("box.open", "入力を数字に変えて、何層もの変換を通し"),
    ("question.pin", "いまのように高性能なAIが作れるようになったのか"),
    # 画面 2: map
    ("scene.map.in", "AIという言葉を少しだけ整理する"),
    ("map.branches", "迷路を探索するAI"),
    ("map.chatgpt.apart", "全部ChatGPTの親戚"),
    ("deep.zoom", "今よく話題になる文章生成や画像生成"),
    ("scope.frame", "この動画で開けるブラックボックスは"),
    ("modalities.in", "文章AIなら大規模言語モデル"),
    # 画面 3: weights
    ("scene.weights.in", "巨大なルール表が入っていると思われがち"),
    ("rules.fade", "ルールを人間が一つずつ書いている"),
    ("knobs.in", "重みと呼ばれる数字のつまみが大量に"),
    ("signal.flow", "信号の強さが変わり"),
    ("knobs.distributed", "つまみ一個に"),
    ("transparent.maze", "中身の数字は見られる"),
    # 画面 4: training
    ("scene.training.in", "最初から賢いわけではない"),
    ("loss.meter", "どれくらい外れたかを測る"),
    ("loop.start", "損失が大きいなら"),
    ("knobs.adjust", "どのつまみをどっちに回すと"),
    ("tasks.swap", "文章の続きを予測する練習"),
    ("pattern.choice", "見た例をそのまま保存している"),
    ("terrain.in", "間違いが大きい高い場所から"),
    ("train.freeze", "学習済みの重みを使って答えを出す"),
    # 画面 5: inference
    ("scene.inference.in", "コンピュータの扱える形に変換される"),
    ("token.cut", "まず小さな部品に切られる"),
    ("vector.in", "部品は数字のベクトルに変えられる"),
    ("layers.pass", "数字の列が何層もの変換回路を通る"),
    ("attention.arc", "他のどの部品をどれくらい見るか"),
    ("attention.example", "彼女は本を買った"),
    ("transformer.stack", "Transformerと呼ばれる構造"),
    ("output.dist", "次に出すトークンの候補に確率"),
    # 画面 6: scale
    ("scene.scale.in", "強くなった理由は、一つではない"),
    ("pillar.arch", "まず構造"),
    ("pillar.data", "次にデータ"),
    ("data.quality", "質や重複の処理も重要"),
    ("pillar.compute", "三つ目が計算資源"),
    ("balance.scale", "性能がかなり規則的に伸びる"),
    ("pillar.align", "四つ目が、人間に合わせる工程"),
    ("factory.grow", "この積み重ねが、今のAIを作っている"),
    # 画面 7: limits
    ("scene.limits.in", "でも結局、ブラックボックス"),
    ("probes.in", "中の表現を調べたり"),
    ("partial.light", "部品は見える"),
    ("maze.remains", "いつでも人間にわかる説明へ完全に翻訳"),
    ("split.two", "内部でどう計算しているか"),
    ("verify.line", "どこから検証が必要なのかを見分けること"),
    ("factory.human", "数字の巨大工場はあった"),
    # 画面 8: outro
    ("scene.outro.in", "最初の問いは、"),
    ("recap.flow", "答えは、入力を数字の表現に変え"),
    ("recap.scale", "大規模化しやすい構造"),
    ("box.label", "中身が存在しない箱ではない"),
    ("final.boundary", "箱を信じることではなく"),
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
