"""scriptData.ts を生成する。

script.md の対話行を抽出し、design_spec.md の event 一覧に従って event を割り当てる。
event は本文中の一意な部分文字列で機械的に紐付ける。
"""

from __future__ import annotations

import re
from pathlib import Path

HERE = Path(__file__).parent
SCRIPT_MD = HERE / "script.md"
OUT_TS = HERE / "scriptData.ts"

LINE_RE = re.compile(r"^(めたん|ずんだもん)：(.+)$")

# (本文中の一意な部分文字列, event 名)。出現順に並べる
EVENT_MAP: list[tuple[str, str]] = [
    # 序論
    ("ねえずんだもん、これ見て", "scene.intro.in"),
    ("サイズはたったの 42 キロバイト", "intro.zip.in"),
    ("4500 兆バイトなのだ", "intro.expand"),
    ("圧縮率にすると、およそ 1000 億倍", "intro.ratio.flash"),
    ("有名な zip 爆弾なのだ", "intro.name"),
    ("「ように見える」って、引っかかる", "intro.like_hint"),
    ("指示書は軽い、実行は重い", "intro.compare.in"),
    ("同じ文字を 1 億回書け", "intro.compare.swap"),
    ("律儀に実行する人は 1 億回手を動かす", "intro.exec_burden"),
    ("この差を極限まで開いた", "intro.gap"),
    ("律儀に開けた側だけがしずかに自滅", "intro.malicious"),
    ("派手じゃない、ねちっこい攻撃", "intro.subtle"),
    ("意地悪な仕掛け", "intro.mean"),
    ("圧縮」っていう言葉の中身", "intro.bridge"),
    # ボディ1
    ("圧縮って、何をすることか", "scene.body1.in"),
    ("よく出る文字に短い番号を振る", "body1.naive"),
    ("前に出てきたものを、もう一度書かない", "body1.no_repeat"),
    ("ABCABCABCABCABC", "body1.string.in"),
    ("3 文字前にもどって 3 文字ぶんコピー", "body1.copy.arrow"),
    ("過去の自分を指さす", "body1.self_ref"),
    ("LZ77 という呼び名", "body1.lz77.card"),
    ("ハフマン符号", "body1.deflate.card"),
    ("a がいちばん出るなら、a に短いビットってこと", "body1.huffman_a"),
    ("頻度が 50 倍くらい違う", "body1.huffman_freq"),
    ("数字まで縮めちゃう", "body1.huffman_digit"),
    ("最大 32 キロバイト", "body1.window"),
    ("32 キロバイトの「スライド窓", "body1.window_box"),
    ("窓のサイズは制約", "body1.window_ok"),
    ("「AAAAA……」を 100 個", "body1.aaaa"),
    ("A しか出てこないんだから", "body1.zeros_q"),
    ("12 バイトちょっと", "body1.zeros_naive"),
    ("10 倍以上 開くのだ", "body1.lz77_wins"),
    ("繰り返しが多いほどよく縮む", "body1.repeat_wins"),
    ("ゼロが 10 億バイト並んだファイル", "body1.zeros_billion"),
    ("258 文字までしか指定できない", "body1.maxlen"),
    ("258 ずつにブツ切り", "body1.chunk"),
    ("理論上、DEFLATE 1 段あたりの圧縮率の上限", "body1.limit.card"),
    ("これがけっこう大事な数", "body1.ceiling_hit"),
    ("もうひと工夫——というか、ふた工夫", "body1.bridge_body2"),
    # ボディ2
    ("圧縮したものをまた圧縮する", "body2.double_q"),
    ("zip の中に zip を入れて、二重圧縮", "body2.double_no"),
    ("ランダムは参照型でも縮まない", "body2.random_no"),
    ("42.zip はどう作っているの", "body2.how_q"),
    ("ここで、設計が二つに分かれる", "scene.body2.in"),
    ("再帰展開型は", "body2.recursive_head"),
    ("1 個の zip の中にたとえば 16 個", "body2.recursive.expand"),
    ("これを 5 段重ねるのだ", "body2.recursive.dots"),
    ("16 の 5 乗", "body2.power"),
    ("100 万個ちょっと", "body2.million"),
    ("4 ギガバイト", "body2.giga"),
    ("ほぼ 4.5 ペタバイト", "body2.recursive.result"),
    ("同じ実体", "body2.same_entity"),
    ("当時の対策の隙間にきれいに刺さった", "body2.fit"),
    ("再帰的に展開する深さ", "body2.recursive.defended"),
    ("3 段までしか中をのぞかない", "body2.depth_limit"),
    ("もう一つの設計", "body2.into_single"),
    ("1 回展開しただけで、いきなりとんでもないサイズ", "body2.single_intro"),
    ("David Fifield", "body2.single.head"),
    ("ローカルヘッダ", "body2.local_header"),
    ("本文の小見出しと、巻末の索引", "body2.dual_index"),
    ("巻末の目次のほうを優先して読む", "body2.trust_index"),
    ("フロッピーディスクをまたいで分割", "body2.floppy"),
    ("巻末を信じる」癖を逆手", "body2.flip"),
    ("ぜんぶ同じ位置を指す", "body2.single.arrows"),
    ("複数のファイルとして使い回せるよう特殊な切れ目", "body2.cutmarks"),
    ("再帰してないのに量だけ膨らむ", "body2.no_recursion"),
    ("どこかで「ここでファイル終わり", "body2.terminator"),
    ("281 テラバイト", "body2.single.result"),
    ("深さの上限を 1 にしても、無傷で通り抜ける", "body2.single.bypass"),
    ("攻撃する立場からするとどっちが「便利」", "body2.compare_q"),
    ("Fifield の論文には世の中の主要な展開ツール", "body2.tool_table"),
    ("仕様の解釈の隙間がそのまま攻撃面", "body2.spec_gap"),
    # ボディ3
    ("zip 爆弾を受け取って、いちばん困るのは誰", "scene.body3.in"),
    ("今の OS や展開ソフトはたいてい途中で", "body3.user_safe"),
    ("自動的に中身を全部展開する側", "body3.targets.in"),
    ("いったんメモリの上に中身を広げてから", "body3.memory_first"),
    ("CPU も食われる", "body3.meters.fill"),
    ("サービスを止める攻撃に分類", "body3.dos"),
    ("アンチウイルスソフト", "body3.target_av"),
    ("ファイルアップロード機能のあるウェブサービス", "body3.target_api"),
    ("攻撃を防ごうとする側がまさにその防ごうとする動作で自滅", "body3.irony"),
    ("「ちゃんと仕事してる検査」のところで起きる", "body3.serious_self_burn"),
    ("本物のマルウェアまで通り抜けてしまう", "body3.dilemma"),
    ("二択を迫られる", "body3.fork"),
    ("100 メガバイトまで読んだ時点", "body3.size_limit_hint"),
    ("時間が 30 秒を超えたら", "body3.time_limit_hint"),
    ("最大展開サイズ", "body3.defense.size"),
    ("圧縮率そのものを警戒の合図", "body3.defense.ratio"),
    ("100 倍を超えてたら警告", "body3.ratio_thresh"),
    ("物差しが振り切れる地点", "body3.ratio_meter"),
    ("展開しながら同時に検査", "body3.defense.stream"),
    ("流しそうめんみたいに", "body3.stream_metaphor"),
    ("ちゃんとしすぎない", "body3.dont_overdo"),
    ("1996 年には、当時のアンチウイルスへの実演", "body3.history"),
    ("30 年経った今も形を変えて生き残っている", "body3.alive"),
    # 結論
    ("もう一度、最初の数字に戻る", "scene.outro.in"),
    ("送る側の気遣いの技術", "outro.kindness"),
    ("やさしさ」の仕組みが受け取る側", "outro.kindness_weapon"),
    ("Billion Laughs ", "outro.family.lol"),
    ("合言葉」を定義する機能", "outro.lol_def"),
    ("これを 9 段", "outro.lol_nest"),
    ("ReDoS という攻撃", "outro.family.redos"),
    ("ぜんぶ、同じ家族の攻撃", "outro.family.pulse"),
    ("指示書を最後まで実行しない", "outro.solution"),
    ("「ように見える」の意味、分かるのだ", "outro.callback"),
    ("律儀に最後まで展開しようとした、防御側の手", "outro.self_burn"),
    ("律儀さを武器に変える攻撃", "outro.final"),
    ("無数の場面がある", "outro.everywhere"),
]


def find_event(text: str, used: set[str]) -> str | None:
    for needle, event in EVENT_MAP:
        if event in used:
            continue
        if needle in text:
            return event
    return None


def main() -> None:
    raw = SCRIPT_MD.read_text(encoding="utf-8")
    lines: list[tuple[str, str]] = []
    for line in raw.splitlines():
        m = LINE_RE.match(line.strip())
        if m:
            lines.append((m.group(1), m.group(2).strip()))

    used: set[str] = set()
    annotated: list[tuple[str, str, str | None]] = []
    for speaker, text in lines:
        e = find_event(text, used)
        if e is not None:
            used.add(e)
        annotated.append((speaker, text, e))

    expected = {e for _, e in EVENT_MAP}
    missing = expected - used
    if missing:
        raise SystemExit(f"event 未割り当て: {sorted(missing)}")

    all_events = [e for _, e in EVENT_MAP]
    union = " | ".join(f"'{e}'" for e in all_events)

    out: list[str] = []
    out.append("// 自動生成（手で編集しない）。_gen_script.py から再生成する。")
    out.append("")
    out.append("export type Speaker = 'めたん' | 'ずんだもん';")
    out.append("")
    out.append("export type AnimEvent =")
    out.append(f"    {union};")
    out.append("")
    out.append("export type ScriptLine = { speaker: Speaker; text: string; event?: AnimEvent };")
    out.append("")
    out.append("export const SCRIPT: ScriptLine[] = [")
    for speaker, text, event in annotated:
        text_esc = text.replace("\\", "\\\\").replace("'", "\\'")
        if event:
            out.append(f"    {{ speaker: '{speaker}', text: '{text_esc}', event: '{event}' }},")
        else:
            out.append(f"    {{ speaker: '{speaker}', text: '{text_esc}' }},")
    out.append("];")
    out.append("")
    OUT_TS.write_text("\n".join(out), encoding="utf-8")
    print(f"wrote {OUT_TS}: {len(annotated)} lines, {len(used)} events")


if __name__ == "__main__":
    main()
