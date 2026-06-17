# script.md -> scriptData.ts 生成
# - セリフ行を抽出し、文字数から行尺(フレーム)を見積もる
# - design_spec.md の event を、台本中の一意な部分文字列でセリフ行に紐付ける
# 実音声(VOICEVOX)を焼いたら LINE_FRAMES を実測値に差し替える(05段)。
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
FPS = 30
CHAR_FRAMES = 3.4   # 1文字あたり(speedScale 1.2 想定)
LINE_PAD = 16       # 行間ポーズ
MIN_FRAMES = 56
TAIL_PAD = 150      # 最終行後の静止

# (event名, 台本中の一意なアンカー文字列) — 台本順
EVENTS = [
    # 画面1 導入/ビットの関係
    ("scene.bits.in", "暗号化って、結局なにをやってるの"),
    ("intro.scramble", "暗号化するたびに別のぐちゃぐちゃ"),
    ("intro.general", "平文と鍵を入れて、暗号文を出す変換"),
    ("text.to.bits", "コンピュータの中では、文章も画像も通信も"),
    ("naive.flip", "ビットを全部反転したらどうなる"),
    ("key.in", "だから鍵が必要なのだ"),
    ("pattern.show", "よく出る形があるのだ"),
    ("relation.break", "平文の少しの差が暗号文の広い差に広がる"),
    ("aes.wheel", "鍵で決まる巨大な並べ替えに通すのだ"),
    ("aes.space", "可能性が 2 の 128 乗"),
    ("aes.rounds", "何段もの置換と混ぜ合わせ"),
    ("same.problem", "同じ鍵で同じ 128 ビットを入れたら"),
    # 画面2 nonce と鍵ストリーム
    ("scene.nonce.in", "鍵だけでなく nonce と呼ばれる値"),
    ("nonce.public", "一回限りの番号、くらいに思えばいい"),
    ("nonce.change", "nonce が違えば暗号文が変わる"),
    ("roles.pin", "鍵は秘密、nonce は公開でもいい一回番号"),
    ("nonce.ship", "暗号文と一緒に nonce を送ることは普通にある"),
    ("mask.make.1", "乱数っぽい長い列を作って"),
    ("xor.apply.1", "これを平文に重ねて、ビットごとにひっくり返す"),
    ("mask.make.2", "そこで nonce を変えれば、毎回ちがうマスクになる"),
    # 画面3 nonce 再利用の破綻
    ("scene.reuse.in", "同じ鍵と同じ nonce を使い回すと？"),
    ("same.mask", "同じマスクが出る？"),
    ("two.ciphers", "暗号文1は平文1 XOR マスク"),
    ("cipher.xor", "暗号文1と暗号文2を XOR すると"),
    ("mask.cancel", "え、消えるの？"),
    ("relation.leak", "残るのは、平文1 XOR 平文2"),
    ("guess.peel", "片方の文が少しでも推測できると"),
    ("rule.lock", "再利用禁止」なのだ"),
    # 画面4 モードの役割
    ("scene.mode.in", "1 メガバイトの画像はどうするの"),
    ("split.blocks", "128 ビットずつ切って、順番に"),
    ("ecb.bad", "その素朴案が ECB モードなのだ"),
    ("mode.in", "ブロックをただ独立に変換しないのだ"),
    ("counter.run", "nonce とカウンタを AES に入れて"),
    ("stream.stitch", "AES でマスクを作る使い方もあるのね"),
    ("mode.name", "AES-CBC とか AES-GCM とか"),
    ("strong.part", "どんな機械に組み込むかで安全性が変わる"),
    # 画面5 認証タグ
    ("scene.tag.in", "攻撃者は、読めなくても触れるのだ"),
    ("bit.flip", "暗号文のビットを反転したり"),
    ("concepts.split", "機密性は読まれないこと"),
    ("aead.in", "みたいな AEAD は、暗号文と一緒にタグを出す"),
    ("aad.in", "勝手に変えられると困るヘッダー"),
    ("verify.ok", "タグが合うか確かめるのだ"),
    ("tamper.fail", "合わなかったら？"),
    ("rule.aead", "認証付き暗号として使っていれば"),
    # 画面6 鍵の作り分け
    ("scene.keys.in", "鍵さえバレなければ全部いいんじゃない"),
    ("derive.tree", "そこから鍵導出で、暗号化用、復号用"),
    ("traffic.keys", "同じ秘密から、いろんな鍵を派生させる"),
    ("tls.stage", "TLS 1.3 では"),
    ("damage.box", "被害を閉じ込めるためなのだ"),
    ("no.reuse", "同じものを違う文脈で使い回すのを嫌う"),
    ("relation.cut", "セッション同士、用途同士、過去と未来の関係も"),
    # 画面7 漏れる外形
    ("scene.limits.in", "暗号化の限界を見るのだ"),
    ("metadata.show", "通信の存在、相手、長さ、タイミングまでは"),
    ("size.shadow", "行動の影は見える"),
    ("traffic.pattern", "サイズやタイミングから推測される"),
    ("endpoint.plain", "送る前のスマホ、復号した後のサーバー"),
    ("scope.frame", "そこではもう平文に戻っている"),
    ("not.magic", "魔法の安全シールではないのだ"),
    # 画面8 結論
    ("scene.recap.in", "最初の問いに戻るのだ"),
    ("recap.transform", "鍵で決まる変換や鍵ストリームをぶつけて"),
    ("recap.nonce", "nonce で回ごとの変換を変える"),
    ("recap.mode", "長いデータにはモードが必要で"),
    ("recap.tag", "だから AEAD ではタグで封印する"),
    ("recap.scope", "長さやタイミングや端点までは自動で隠れない"),
    ("final.cut", "本文との関係を切り離す技術なのだ"),
    ("final.still", "関係を断ち切ったビット列だったのね"),
]


def main() -> None:
    src = (HERE / "script.md").read_text(encoding="utf-8")
    lines = []
    for raw in src.splitlines():
        m = re.match(r"^(ずんだもん|めたん)：(.+)$", raw.strip())
        if m:
            lines.append({"speaker": m.group(1), "text": m.group(2)})

    # event をアンカーで行に紐付け(台本順を検証)
    events_by_line: dict[int, str] = {}
    prev_idx = -1
    for name, anchor in EVENTS:
        hits = [i for i, ln in enumerate(lines) if anchor in ln["text"]]
        if len(hits) != 1:
            sys.exit(f"NG: anchor for {name} matched {len(hits)} lines: {anchor}")
        idx = hits[0]
        if idx <= prev_idx:
            sys.exit(f"NG: event {name} (line {idx}) out of order (prev {prev_idx})")
        if idx in events_by_line:
            sys.exit(f"NG: line {idx} has two events")
        events_by_line[idx] = name
        prev_idx = idx

    durations = [
        max(MIN_FRAMES, round(len(ln["text"]) * CHAR_FRAMES) + LINE_PAD) for ln in lines
    ]
    starts = []
    acc = 0
    for d in durations:
        starts.append(acc)
        acc += d
    total = acc + TAIL_PAD

    event_frames = {events_by_line[i]: starts[i] for i in events_by_line}

    out = []
    out.append("// _gen_script.py が script.md から生成。直接編集しない。")
    out.append("export type Speaker = 'ずんだもん' | 'めたん';")
    out.append("export type ScriptLine = { speaker: Speaker; text: string; event?: string };")
    out.append("")
    out.append("export const SCRIPT: ScriptLine[] = [")
    for i, ln in enumerate(lines):
        ev = f", event: {json.dumps(events_by_line[i], ensure_ascii=False)}" if i in events_by_line else ""
        out.append(
            f"    {{ speaker: {json.dumps(ln['speaker'], ensure_ascii=False)}, "
            f"text: {json.dumps(ln['text'], ensure_ascii=False)}{ev} }},"
        )
    out.append("];")
    out.append("")
    out.append(f"export const LINE_FRAMES: number[] = {json.dumps(durations)};")
    out.append(f"export const lineStarts: number[] = {json.dumps(starts)};")
    out.append(f"export const TOTAL_FRAMES = {total};")
    out.append("")
    out.append("export const EVENT_FRAMES: Record<string, number> = {")
    for name, f in event_frames.items():
        out.append(f"    {json.dumps(name)}: {f},")
    out.append("};")
    out.append("")
    out.append("export const eventFrame = (name: string): number => {")
    out.append("    const f = EVENT_FRAMES[name];")
    out.append("    if (f === undefined) throw new Error(`unknown event: ${name}`);")
    out.append("    return f;")
    out.append("};")
    out.append("")
    out.append("export const lineAt = (frame: number): number => {")
    out.append("    let idx = 0;")
    out.append("    for (let i = 0; i < lineStarts.length; i++) if (frame >= lineStarts[i]) idx = i;")
    out.append("    return idx;")
    out.append("};")
    out.append("")

    (HERE / "scriptData.ts").write_text("\n".join(out), encoding="utf-8")
    mins = total / FPS / 60
    print(f"OK: {len(lines)} lines, {len(event_frames)} events, {total} frames (~{mins:.1f} min)")


if __name__ == "__main__":
    main()
