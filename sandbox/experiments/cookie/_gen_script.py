# script.md と _audio_src/line_*.wav から scriptData.ts を生成する。
#   python _gen_script.py
# - 行の尺は WAV の実測値
# - event は design_spec.md の event をスニペット照合で行へ紐付ける
#   （一意マッチ・昇順を検証。ズレたらここで落ちる）
import json
import re
import wave
from pathlib import Path

FPS = 30
LEAD_IN = 20      # 冒頭の無音（フレーム）
GAP = 8           # 行間（フレーム）
TAIL = 90         # 末尾の余韻（フレーム）

ROOT = Path(__file__).parent

# (event名, そのeventが紐付く行を一意に特定するスニペット)
EVENTS = [
    # 画面1: intro
    ("scene.intro.in", "Cookieってさ、サイトに出てくる"),
    ("consent.fold", "Cookieを使う前の確認画面"),
    ("note.appear", "ブラウザに預ける小さなメモ"),
    ("auto.attach.preview", "いつ、どこへ、自動で持っていくか"),
    ("thesis.pin", "保存箱の話ではなく"),
    # 画面2: memory
    ("scene.memory.in", "HTTPはかなり忘れっぽい"),
    ("stateless.reset", "ページを一回取りに行く"),
    ("set_cookie.out", "みたいな札を渡すのだ"),
    ("jar.store", "ブラウザはそれを保存する"),
    ("cookie.return", "勝手に付けて返すのだ"),
    ("locker.id", "本当のログイン状態はサーバー側"),
    ("risk.glow", "本人扱いされる場面がある"),
    # 画面3: attributes
    ("scene.attributes.in", "多くの説明は"),
    ("attrs.orbit", "その後ろにつく属性"),
    ("domain.expand", "どのホストに送るかを広げる"),
    ("domain.warning", "広げすぎると別のサブドメイン"),
    ("path.lane", "URLのどの道筋に送るか"),
    ("path.not_wall", "見た目は境界っぽいけど"),
    ("lifetime.clock", "寿命を決める"),
    ("attrs.conclusion", "で意味が変わるのだ"),
    # 画面4: security
    ("scene.security.in", "セキュリティっぽい属性"),
    ("secure.tunnel", "HTTPSの通信でだけCookieを送る"),
    ("httponly.shutter", "から読みにくくなる"),
    ("split.read_send", "これで全部解決ではない"),
    ("csrf.hint", "盗まれないことと、悪用されないことは違う"),
    ("false.safe", "雑に言ってしまう"),
    # 画面5: samesite
    ("scene.samesite.in", "次は `SameSite` なのだ"),
    ("context.frame", "登録可能ドメインやスキーム"),
    ("csrf.trap", "罠ボタンを押したら"),
    ("strict.block", "`Strict` はかなり絞る"),
    ("lax.allow_nav", "`None` って一番ゆるいのね"),
    ("none.open", "`Secure` が必要なのだ"),
    ("combo.rules", "小さな境界条件の集合"),
    # 画面6: third_party
    ("scene.third_party.in", "よく聞く第三者Cookieは"),
    ("embed.ad", "広告や解析の部品が埋め込まれて"),
    ("same.ad.many", "ニュースサイトにも、ブログにも、通販サイトにも"),
    ("id.travels", "同じCookieを付ける可能性"),
    ("dots.to.line", "別々のサイトを移動しているように見える"),
    ("tracking.not_content", "置かれる場所が増えると行動履歴になる"),
    # 画面7: partitioned
    ("scene.partitioned.in", "ブロックされるって聞くわ"),
    ("policy.not_simple", "と言い切る話ではなくなっている"),
    ("partition.shelves", "Cookieを分割すること"),
    ("chips.attr", "`Partitioned` という属性がある"),
    ("separate.jars", "通販サイトの中にいる時で別の棚"),
    ("tradeoff", "でも横断追跡は弱めたい"),
    ("other.tracking", "指紋採取、サーバー側の突合"),
    # 画面8: session
    ("scene.session.in", "広告よりログインCookieの方が怖そう"),
    ("ticket.appear", "と思わせる札になる"),
    ("stolen.ticket", "パスワードを知らなくても入れる"),
    ("mfa.after", "二段階認証はログイン時を強くする"),
    ("defense.stack", "対策は一つではない"),
    ("prefix.host", "`__Host-` のような名前"),
    ("old.mechanism", "後から安全柵を足してきた歴史"),
    # 画面9: consent
    ("scene.consent.in", "Cookie同意バナーは何なの"),
    ("layer.split", "運用としての同意は別の層"),
    ("necessary.vs.ads", "ログイン維持やカートのように必要なCookie"),
    ("purpose.arrow", "何のために、誰に、どこまで送るか"),
    ("invisible.auto", "ユーザーが意識しにくい"),
    ("tech.return", "リクエストに自動添付する通行札」と見るのだ"),
    # 画面10: outro
    ("scene.outro.in", "最初の問いは"),
    ("recap.flow", "HTTPの忘れっぽさを補うために"),
    ("recap.attrs", "その条件を決めるのが"),
    ("recap.risks", "認証後のなりすましになる"),
    ("final.lens", "中身より先に、どの文脈で"),
]


def parse_script():
    lines = []
    for raw in (ROOT / "script.md").read_text(encoding="utf-8").splitlines():
        m = re.match(r"^(ずんだもん|めたん): (.+)$", raw.strip())
        if m:
            lines.append({"speaker": m.group(1), "text": m.group(2)})
    return lines


def wav_frames(path):
    with wave.open(str(path), "rb") as w:
        sec = w.getnframes() / w.getframerate()
    return max(1, round(sec * FPS))


def main():
    lines = parse_script()
    wavs = sorted((ROOT / "_audio_src").glob("line_*.wav"))
    assert len(lines) == len(wavs), f"行数 {len(lines)} と WAV 数 {len(wavs)} が不一致"

    # event をスニペットで行に紐付け（一意・昇順を検証）
    prev_idx = -1
    for name, snippet in EVENTS:
        hits = [i for i, ln in enumerate(lines) if snippet in ln["text"]]
        assert len(hits) == 1, f"event {name}: スニペット '{snippet}' のマッチが {len(hits)} 件"
        idx = hits[0]
        assert idx > prev_idx or not name.startswith("scene."), \
            f"event {name} が前のeventより前の行 ({idx}) に紐付いた"
        assert "event" not in lines[idx], f"行 {idx} に複数の event"
        lines[idx]["event"] = name
        prev_idx = max(prev_idx, idx)

    durations = [wav_frames(p) for p in wavs]
    starts = []
    f = LEAD_IN
    for d in durations:
        starts.append(f)
        f += d + GAP
    total = f - GAP + TAIL

    out = [
        "// 自動生成: python _gen_script.py（手で編集しない）",
        "export type Speaker = 'ずんだもん' | 'めたん';",
        "export type ScriptLine = { speaker: Speaker; text: string; event?: string };",
        "",
        "export const FPS = 30;",
        f"export const TOTAL_FRAMES = {total};",
        "",
        "export const SCRIPT: ScriptLine[] = [",
    ]
    for ln in lines:
        ev = f", event: {json.dumps(ln['event'], ensure_ascii=False)}" if "event" in ln else ""
        out.append(
            f"    {{ speaker: '{ln['speaker']}', text: {json.dumps(ln['text'], ensure_ascii=False)}{ev} }},"
        )
    out += [
        "];",
        "",
        f"export const LINE_STARTS: number[] = {json.dumps(starts)};",
        f"export const LINE_DURATIONS: number[] = {json.dumps(durations)};",
        "",
        "const EVENT_FRAMES: Record<string, number> = {};",
        "SCRIPT.forEach((ln, i) => {",
        "    if (ln.event) EVENT_FRAMES[ln.event] = LINE_STARTS[i];",
        "});",
        "",
        "export const eventFrame = (name: string): number => {",
        "    const f = EVENT_FRAMES[name];",
        "    if (f === undefined) throw new Error(`unknown event: ${name}`);",
        "    return f;",
        "};",
        "",
    ]
    (ROOT / "scriptData.ts").write_text("\n".join(out), encoding="utf-8")
    print(f"lines={len(lines)} total={total}f ({total / FPS:.1f}s) events={len(EVENTS)}")


if __name__ == "__main__":
    main()
