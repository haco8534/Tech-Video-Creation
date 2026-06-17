# script.md -> scriptData.ts 生成
# event は design_spec.md の対応セリフへ、本文の部分一致で付与する
import io
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent

# event名 -> セリフ本文の一意な部分文字列（design_spec.md と対応）
EVENT_MAP = [
    ("scene.intro.in", "最近の画像生成AIって"),
    ("intro.text_image.gap", "文章は文字の並びで"),
    ("intro.artist.cross", "頭の中で構図を考えて"),
    ("intro.destination.noise", "絵がありそうな場所"),
    ("intro.question", "文字しか渡していないのに"),
    ("scene.prompt_map.in", "プロンプトを命令書だと思うと"),
    ("map.pairs.in", "ネットには画像と説明文の組"),
    ("map.align", "同じ地図の上に置く練習"),
    ("map.near_far", "関係ない組は遠くへ置く"),
    ("map.destination", "一行ずつ指示する紙ではなく"),
    ("map.bias", "世界全体の真理ではなく"),
    ("map.to_workspace", "どこで絵を作るのかを見るのだ"),
    ("scene.latent.in", "結局はピクセルの集まり"),
    ("latent.too_big", "1024かける1024"),
    ("latent.compress", "ぎゅっと圧縮した作業場"),
    ("latent.encode", "エンコーダで潜在表現に押し込む"),
    ("latent.decode", "最後にデコーダで"),
    ("latent.tradeoff", "軽くしすぎると"),
    ("latent.no_coloring", "巨大な塗り絵ではなくなる"),
    ("scene.denoise.in", "拡散モデルなのだ"),
    ("denoise.forward", "ノイズを足して壊していく"),
    ("denoise.answer", "答えがわかるからなのだ"),
    ("denoise.step_power", "少しだけノイズを減らす"),
    ("denoise.no_big_jump", "一発で完成絵を決めよう"),
    ("denoise.chain", "ほんの少しだけマシな状態"),
    ("denoise.prompt_guidance", "ただ絵らしいほうではなく"),
    ("denoise.next_problem", "なぜAIはたまに"),
    ("scene.binding.in", "「右に犬、左に猫」"),
    ("binding.tags", "「赤い」「靴」「猫」を知っていても"),
    ("binding.cross_attention", "cross-attentionという仕組み"),
    ("binding.local_focus", "耳のあたりは「cat」"),
    ("binding.swap_fail", "三つの対象、三つの色"),
    ("binding.text_fingers", "なんとなく看板っぽい"),
    ("binding.answer", "かなり多くの場合は後者"),
    ("binding.prompt_tip", "対象ごとに属性を近くに置く"),
    ("scene.editing.in", "昔は一回出して"),
    ("editing.chat", "ここだけ直して"),
    ("editing.context", "まとめて扱いやすくなる"),
    ("editing.mask_area", "意図した箇所だけ変える"),
    ("editing.control", "制御して作る"),
    ("editing.limits", "細かい制約、厳密な図面"),
    ("editing.verify", "医療、法律、証拠"),
    ("scene.outro.in", "最初の違和感に戻る"),
    ("outro.recap_map", "地図上の目的地"),
    ("outro.recap_workspace", "潜在空間という圧縮された作業場"),
    ("outro.recap_steps", "途中で何度も言葉を参照し"),
    ("outro.binding", "正しく束ねられた時"),
    ("outro.truth_split", "見た目が自然だからといって"),
    ("outro.final", "少しずつ畳んでいる"),
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
