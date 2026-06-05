# LLMの仕組み ── manim 実装（図のみ・無音）
# 設計: design_overall.md / design_spec.md
# 思想: 画面内は連続モーフ（変身させる、作り直さない）。画面の切り替わりだけがリセット点。
from manim import *
import numpy as np

config.background_color = "#FFFFFF"

# ── 色言語（design_overall より）─────────────────────────────
INK    = "#1E293B"  # 文字・基本線
SUB    = "#94A3B8"  # 補助線・控えめな文字
PALE   = "#E5E9F0"  # 淡い座標面
INDIGO = "#4F46E5"  # 語の点（トークン）＝背骨の単位
TEAL   = "#0D9488"  # 文脈の引き / Attention
AMBER  = "#D97706"  # 研ぎ澄まされた一点（熱・確定）
GREEN  = "#16A34A"  # 選ばれた次の語・当たり
RED    = "#DC2626"  # 外れ・でたらめ・記号操作

JP  = "Yu Gothic"
JPB = "Yu Gothic"  # weight=BOLD で太字に

# ── テキストヘルパー ──────────────────────────────────────
def T(text, size=32, color=INK, font=JP, weight=NORMAL):
    return Text(text, font=font, color=color, weight=weight, font_size=size)

def title_band(text, color=INK):
    """画面上部の一行。順送りで入れ替える帯。"""
    return T(text, size=30, color=color).to_edge(UP, buff=0.45)

def chip(text, fill=WHITE, edge=INK, txt=INK, size=30, pad=0.22):
    """語札（角丸の枠＋文字）。文中トークン・候補語に使う。"""
    label = T(text, size=size, color=txt)
    box = RoundedRectangle(
        corner_radius=0.12,
        width=label.width + pad * 2,
        height=label.height + pad * 1.4,
        stroke_color=edge, stroke_width=2.5, fill_color=fill, fill_opacity=1.0,
    )
    g = VGroup(box, label)
    g.box, g.label = box, label
    return g

def word_point(text, color=INDIGO, size=26, dot_r=0.09, dir=UP):
    """語の点＝ラベル付きの点（トークン）。背骨の単位。"""
    dot = Dot(radius=dot_r, color=color)
    label = T(text, size=size, color=color).next_to(dot, dir, buff=0.12)
    g = VGroup(dot, label)
    g.dot, g.label = dot, label
    return g

def faint_plane():
    """意味の地図＝淡い座標面。"""
    plane = NumberPlane(
        x_range=[-7.5, 7.5, 1], y_range=[-4.2, 4.2, 1],
        background_line_style={"stroke_color": PALE, "stroke_width": 1.4, "stroke_opacity": 1.0},
        axis_config={"stroke_color": PALE, "stroke_width": 1.4, "include_ticks": False},
    )
    return plane

def blur_halo(point, color, base_r=0.5, layers=5):
    """ぼやけた点＝同心の半透明円。文脈前の曖昧さを表す。"""
    g = VGroup()
    for i in range(layers):
        r = base_r * (1 - i / (layers + 1))
        g.add(Circle(radius=r, stroke_width=0, fill_color=color,
                      fill_opacity=0.12).move_to(point))
    return g


# ════════════════════════════════════════════════════════════
# 画面1：序論 「次の語だけ・中身は場所」
# ════════════════════════════════════════════════════════════
class S1Intro(Scene):
    def construct(self):
        BUFF = 0.16

        # intro.in : 文＋末尾の空欄
        c0 = chip("むかしむかし、", size=30)
        c1 = chip("あるところに、", size=30)
        blank = DashedVMobject(
            RoundedRectangle(corner_radius=0.12, width=1.7, height=c0.height,
                             stroke_color=SUB, stroke_width=2.5), num_dashes=22)
        row = VGroup(c0, c1, blank).arrange(RIGHT, buff=BUFF).move_to(ORIGIN)
        sentence = VGroup(c0, c1)  # 生きている文（伸びていく実体）
        self.play(LaggedStart(FadeIn(c0, shift=UP * 0.2), FadeIn(c1, shift=UP * 0.2), lag_ratio=0.4), run_time=1.2)
        self.play(Create(blank), run_time=0.5)
        self.play(Indicate(blank, color=INDIGO, scale_factor=1.12), run_time=0.7)
        self.wait(0.3)

        # intro.story : 候補語がふわりと並ぶ
        cands = VGroup(chip("おじいさんと", size=26), chip("王子様が", size=26), chip("雨が", size=26))
        cands.arrange(RIGHT, buff=0.3).next_to(row, UP, buff=1.0)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in cands], lag_ratio=0.25), run_time=1.0)
        self.wait(0.5)

        # intro.pick : 一枚だけ空欄へ降りる
        chosen = cands[0]
        self.play(FadeOut(VGroup(cands[1], cands[2]), shift=UP * 0.2), run_time=0.5)
        self.play(chosen.animate.move_to(blank.get_center()), run_time=0.8)
        self.play(chosen.box.animate.set_stroke(GREEN).set_fill(GREEN, 0.08),
                  chosen.label.animate.set_color(GREEN), FadeOut(blank), run_time=0.6)
        self.wait(0.3)
        self.play(chosen.box.animate.set_stroke(INK).set_fill(WHITE, 1.0),
                  chosen.label.animate.set_color(INK), run_time=0.4)
        sentence.add(chosen)

        # intro.repeat : さらに数語が一語ずつ末尾に足され、文が伸びて再センタリング
        for w, sz in [("おばあさんが", 30), ("住んでいました", 28)]:
            new = chip(w, size=sz)
            target = VGroup(*[m.copy() for m in sentence], new.copy()).arrange(RIGHT, buff=BUFF).move_to(ORIGIN)
            anims = [old.animate.move_to(tgt.get_center()) for old, tgt in zip(sentence, target[:-1])]
            new.move_to(target[-1].get_center())
            anims.append(FadeIn(new, shift=LEFT * 0.4))
            self.play(*anims, run_time=0.8)
            sentence.add(new)
            self.wait(0.2)
        self.wait(0.4)

        # 文を上へ寄せ、注目する1語を選ぶ
        self.play(sentence.animate.scale(0.8).to_edge(UP, buff=0.8), run_time=0.9)
        target_tok = sentence[2]  # 「おじいさんと」
        ring = SurroundingRectangle(target_tok, color=INDIGO, buff=0.05, stroke_width=3)
        self.play(Create(ring), run_time=0.5)

        # intro.empty : 開くと「意味」の枠が空っぽ
        callout = RoundedRectangle(corner_radius=0.15, width=4.8, height=2.3,
                                   stroke_color=INDIGO, stroke_width=3, fill_color=WHITE, fill_opacity=1)
        callout.move_to(DOWN * 0.7)
        head = T("中身は「意味」？", size=24, color=INK).move_to(callout.get_top() + DOWN * 0.4)
        empty = T("空っぽ", size=32, color=SUB).move_to(callout.get_center() + DOWN * 0.15)
        strike = Line(empty.get_left() + LEFT * 0.15, empty.get_right() + RIGHT * 0.15,
                      color=RED, stroke_width=4)
        link = DashedLine(target_tok.get_bottom(), callout.get_top(), color=INDIGO, stroke_width=2)
        self.play(Create(link), FadeIn(callout), run_time=0.6)
        self.play(Write(head), FadeIn(empty), run_time=0.7)
        self.play(Create(strike), run_time=0.5)
        self.wait(0.6)

        # intro.place : 空の枠から、地図上の一点だけが残る
        plane = faint_plane()
        pt = word_point("おじいさんと", color=INDIGO, size=24, dir=UP).move_to(callout.get_center())
        self.play(FadeOut(VGroup(head, empty, strike)), run_time=0.4)
        self.play(
            FadeIn(plane),
            FadeOut(VGroup(sentence, ring, link)),
            ReplacementTransform(callout, pt.dot),
            FadeIn(pt.label, shift=UP * 0.1),
            run_time=1.1,
        )
        caption = T("中身は「意味」ではなく、地図上の場所", size=26, color=INDIGO).to_edge(DOWN, buff=0.7)
        self.play(pt.animate.move_to(ORIGIN), Write(caption), run_time=1.0)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面2：ボディ1 「言葉を地図に置く」
# ════════════════════════════════════════════════════════════
class S2Body1(Scene):
    def construct(self):
        # body1.in : 数直線に りんご・みかん・政府 が番号順
        nl = NumberLine(x_range=[0, 4, 1], length=9, color=INK, stroke_width=3,
                        include_numbers=True, numbers_to_include=[1, 2, 3], font_size=28)
        nl.numbers.set_color(INK)
        nl.move_to(UP * 0.3)
        items = [("りんご", 1), ("みかん", 2), ("政府", 3)]
        nlabels = VGroup()
        for name, n in items:
            d = Dot(nl.n2p(n), radius=0.09, color=INDIGO)
            lb = T(name, size=26, color=INK).next_to(d, UP, buff=0.18)
            vp = VGroup(d, lb)
            vp.dot, vp.label = d, lb
            nlabels.add(vp)
        self.play(Create(nl), run_time=0.9)
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in nlabels], lag_ratio=0.3), run_time=1.1)
        self.wait(0.4)

        # b1.number : 1+2=3 の足し算が「政府」に着き × が付く
        eq = T("りんご(1) ＋ みかん(2) ＝ 政府(3) ？", size=30, color=INK).to_edge(UP, buff=0.6)
        self.play(Write(eq), run_time=1.0)
        a1 = Arrow(nl.n2p(1) + DOWN * 0.5, nl.n2p(3) + DOWN * 0.5, color=SUB, stroke_width=4, buff=0.05)
        self.play(GrowArrow(a1), run_time=0.7)
        cross = Cross(nlabels[2], color=RED, stroke_width=6)
        self.play(Create(cross), run_time=0.6)
        bad = T("番号の足し算に意味はない", size=26, color=RED).next_to(nl, DOWN, buff=0.7)
        self.play(FadeIn(bad), run_time=0.5)
        self.wait(0.7)
        self.play(FadeOut(VGroup(eq, a1, cross, bad)), run_time=0.5)

        # b1.map : 数直線が二次元の地図へ開く
        plane = faint_plane()
        # 語の点の最終配置（似た語は近く・違う語は遠く）
        pos = {
            "りんご": np.array([-3.6, 1.5, 0]),
            "みかん": np.array([-3.0, 0.7, 0]),
            "政府":   np.array([3.4, -1.6, 0]),
        }
        self.play(Transform(nl, plane), run_time=1.0)
        self.play(*[vp.animate.move_to(pos[name]) for vp, (name, _) in zip(nlabels, items)],
                  run_time=1.2)
        self.remove(nl)  # plane に変身済み
        self.add(plane)
        # 点とラベルを取り出して管理
        pts = {}
        for vp, (name, _) in zip(nlabels, items):
            pts[name] = vp
        self.wait(0.3)

        # b1.embed : ラベル
        emb = title_band("意味の地図 ＝ 埋め込み / 分散表現", INDIGO)
        self.play(FadeIn(emb, shift=DOWN * 0.2), run_time=0.7)
        self.wait(0.6)
        self.play(FadeOut(emb), run_time=0.4)

        # b1.vector : 王様 から 男→女 の向きを置く / b1.queen : 女王へぴたり
        gender = np.array([1.4, 0.9, 0])
        man_p   = np.array([-1.2, -1.2, 0])
        woman_p = man_p + gender
        king_p  = np.array([1.3, 1.0, 0])
        queen_p = king_p + gender
        man   = word_point("男",   color=INK, size=26, dir=DOWN).move_to(man_p)
        woman = word_point("女",   color=INK, size=26, dir=UP).move_to(woman_p)
        king  = word_point("王様", color=INDIGO, size=26, dir=UP).move_to(king_p)
        queen = word_point("女王", color=GREEN, size=26, dir=UP).move_to(queen_p)
        queen.set_opacity(0)
        self.play(LaggedStart(FadeIn(man), FadeIn(woman), FadeIn(king), lag_ratio=0.3), run_time=1.0)
        arr_mw = Arrow(man_p, woman_p, color=TEAL, stroke_width=5, buff=0.12)
        lbl_mw = T("男 → 女 の向き", size=24, color=TEAL).next_to(arr_mw, RIGHT, buff=0.15)
        self.play(GrowArrow(arr_mw), FadeIn(lbl_mw), run_time=0.9)
        self.wait(0.4)
        # 同じ向きを王様へ平行移動
        arr_kq = Arrow(king_p, queen_p, color=TEAL, stroke_width=5, buff=0.12)
        self.play(TransformFromCopy(arr_mw, arr_kq), run_time=1.0)
        queen.set_opacity(1)
        self.play(GrowFromCenter(queen.dot), FadeIn(queen.label), run_time=0.6)
        flash = T("計算で「女王」へ", size=26, color=GREEN).to_edge(DOWN, buff=0.6)
        self.play(Flash(queen.dot, color=GREEN, line_length=0.3), Write(flash), run_time=0.8)
        self.wait(0.8)
        self.play(FadeOut(VGroup(arr_mw, lbl_mw, arr_kq, man, woman, flash)), run_time=0.6)

        # b1.dims : 上帯（物差し＝次元）
        b_dims = title_band("物差しが多いほど次元が多い：甘さ・大きさ・高級さ・…", INK)
        self.play(FadeIn(b_dims, shift=DOWN * 0.2), run_time=0.7)
        self.wait(0.7)

        # b1.neighbors : 周りの語の衛星が灯る
        b_nb = title_band("周りに出る語が似た単語どうしを、近くに置く", INK)
        sat_apple = ["甘い", "皮をむく", "果物"]
        sat_gov   = ["選挙", "政策", "国会"]
        def satellites(center_grp, words, color):
            c = center_grp.dot.get_center()
            g = VGroup()
            for i, w in enumerate(words):
                ang = PI / 2 + i * TAU / len(words) + 0.4
                p = c + np.array([np.cos(ang), np.sin(ang), 0]) * 1.05
                sd = Dot(p, radius=0.05, color=color)
                sl = T(w, size=18, color=color)
                sl.move_to(p + np.array([np.cos(ang), np.sin(ang), 0]) * 0.32)
                ln = Line(c, p, color=color, stroke_width=1.5, stroke_opacity=0.5)
                g.add(VGroup(ln, sd, sl))
            return g
        sa = satellites(pts["りんご"], sat_apple, TEAL)
        sg = satellites(pts["政府"], sat_gov, RED)
        self.play(ReplacementTransform(b_dims, b_nb), run_time=0.6)
        self.play(LaggedStart(*[GrowFromCenter(x) for x in sa], lag_ratio=0.15),
                  LaggedStart(*[GrowFromCenter(x) for x in sg], lag_ratio=0.15), run_time=1.4)
        self.wait(0.7)

        # b1.firth : ファースの一文
        b_firth = title_band("「言葉は、つきあう仲間を見ればわかる」 ── ファース 1957", INDIGO)
        self.play(ReplacementTransform(b_nb, b_firth), FadeOut(VGroup(sa, sg)), run_time=0.8)
        self.wait(0.8)
        self.play(FadeOut(b_firth), run_time=0.4)

        # b1.train : 穴埋めで点がクラスタへ締まる
        quiz = chip("むかしむかし、あるところに、＿", size=24, edge=INDIGO).to_edge(UP, buff=0.55)
        self.play(FadeIn(quiz, shift=DOWN * 0.2), run_time=0.6)
        # りんご・みかんを互いに離す向きへ散らし、反復で寄せ直す（交差させない）
        self.play(pts["りんご"].animate.shift(np.array([-0.8, 1.0, 0])),
                  pts["みかん"].animate.shift(np.array([1.0, -1.1, 0])), run_time=0.6)
        mark_pos = quiz.get_bottom() + DOWN * 0.4
        for i in range(3):
            hit = (i == 2)
            m = T("○ 当たり" if hit else "× 外れ", size=26, color=GREEN if hit else RED).move_to(mark_pos)
            self.play(FadeIn(m, shift=DOWN * 0.1), run_time=0.4)
            # 外れ→点を少し寄せ、当たり→締まる
            f = 0.45 if not hit else 0.6
            self.play(
                pts["りんご"].animate.move_to(pts["りんご"].get_center() * (1 - f) + np.array([-3.3, 1.2, 0]) * f),
                pts["みかん"].animate.move_to(pts["みかん"].get_center() * (1 - f) + np.array([-2.7, 0.5, 0]) * f),
                FadeOut(m), run_time=0.6,
            )
        cluster = DashedVMobject(Circle(radius=0.95, color=INDIGO, stroke_width=2.5), num_dashes=28)
        cluster.move_to((pts["りんご"].dot.get_center() + pts["みかん"].dot.get_center()) / 2)
        cap = T("座標は誰も教えない。穴埋めの反復で、ひとりでに決まる", size=24, color=INDIGO).to_edge(DOWN, buff=0.55)
        self.play(Create(cluster), Write(cap), run_time=1.0)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面3：ボディ2 「文脈で意味を研ぎ澄ます」
# ════════════════════════════════════════════════════════════
class S3Body2(Scene):
    def construct(self):
        plane = faint_plane()
        self.add(plane)

        # body2.in : 「冷たい」が一点きり。水寄り・人寄りの影が重なってぼやける
        cold_p = np.array([0, 0.3, 0])
        halo = blur_halo(cold_p, INDIGO, base_r=0.9, layers=6)
        cold = word_point("冷たい", color=INDIGO, size=30, dir=DOWN).move_to(cold_p)
        water = T("水の冷たさ", size=22, color=SUB).move_to(cold_p + np.array([-2.6, 0.9, 0]))
        person = T("人の冷たさ", size=22, color=SUB).move_to(cold_p + np.array([2.6, 0.9, 0]))
        gw = Line(cold_p, water.get_center(), color=SUB, stroke_width=1.5, stroke_opacity=0.4)
        gp = Line(cold_p, person.get_center(), color=SUB, stroke_width=1.5, stroke_opacity=0.4)
        self.play(FadeIn(halo), FadeIn(cold), run_time=0.8)
        self.play(FadeIn(VGroup(gw, gp, water, person)), run_time=0.7)
        cap0 = T("意味が一個きりだと、二つを区別できない", size=24, color=INK).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(cap0), run_time=0.5)
        self.wait(0.8)
        self.play(FadeOut(VGroup(halo, cold, gw, gp, water, person, cap0)), run_time=0.6)

        # b2.pronoun : 「猫が魚を食べた。それは新鮮だった」
        sent_words = ["猫が", "魚を", "食べた。", "それは", "新鮮だった"]
        toks = VGroup(*[chip(w, size=26) for w in sent_words]).arrange(RIGHT, buff=0.16).to_edge(UP, buff=0.7)
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.1) for t in toks], lag_ratio=0.18), run_time=1.2)
        it_tok = toks[3]  # それは
        fish_tok = toks[1]  # 魚を
        cat_tok = toks[0]
        it_p = np.array([0, -0.6, 0])
        it_pt = word_point("それ", color=INDIGO, size=28, dir=DOWN).move_to(it_p)
        it_halo = blur_halo(it_p, INDIGO, base_r=0.7, layers=5)
        self.play(FadeIn(it_halo), TransformFromCopy(it_tok, it_pt), run_time=0.9)
        q = T("魚？ 猫？", size=24, color=SUB).next_to(it_pt, RIGHT, buff=0.4)
        self.play(FadeIn(q), run_time=0.5)
        self.wait(0.5)

        # b2.lookaround : 全部の語へ細い線
        lines = VGroup()
        for t in toks:
            if t is it_tok:
                continue
            lines.add(Line(it_pt.dot.get_center(), t.get_bottom(), color=TEAL,
                           stroke_width=1.6, stroke_opacity=0.55))
        self.play(LaggedStart(*[Create(l) for l in lines], lag_ratio=0.1), FadeOut(q), run_time=1.1)
        ask = T("「きみは、ぼくに関係ある？」と全語に聞いて回る", size=24, color=TEAL).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(ask), run_time=0.5)
        self.wait(0.7)

        # b2.move : 「魚」への線だけ太く、点が魚側へ
        fish_line = Line(it_pt.dot.get_center(), fish_tok.get_bottom(), color=TEAL, stroke_width=6)
        self.play(FadeOut(lines), Create(fish_line), FadeOut(ask), run_time=0.6)
        self.remove(lines)
        fish_anchor = fish_tok.get_bottom() + DOWN * 0.6
        # グループ全体を動かしつつ色を変える（ラベルも一緒に動く・別アニメで競合させない）
        self.play(it_halo.animate.move_to(fish_anchor).scale(0.45),
                  it_pt.animate.move_to(fish_anchor).set_color(AMBER),
                  FadeOut(fish_line), run_time=1.0)
        self.remove(fish_line)

        # b2.attention : ラベル
        att = title_band("見渡して注目する仕掛け ＝ Attention（Transformer の心臓）", TEAL)
        self.play(FadeIn(att, shift=DOWN * 0.2), run_time=0.7)
        self.wait(0.8)
        self.play(FadeOut(att), FadeOut(toks), FadeOut(it_pt), FadeOut(it_halo), run_time=0.6)
        self.remove(att, toks, it_pt, it_halo)

        # b2.quiz : 「明るい」が二極の間→性格側へ
        room_p = np.array([-3.5, 0.5, 0])
        char_p = np.array([3.5, 0.5, 0])
        room = word_point("部屋の明るさ", color=SUB, size=22, dir=UP).move_to(room_p)
        char = word_point("性格の明るさ", color=SUB, size=22, dir=UP).move_to(char_p)
        axis = Line(room_p, char_p, color=SUB, stroke_width=2, stroke_opacity=0.5)
        bright_p = np.array([0, 0.5, 0])
        bright_halo = blur_halo(bright_p, INDIGO, base_r=0.7, layers=5)
        bright = word_point("明るい", color=INDIGO, size=28, dir=DOWN).move_to(bright_p)
        ctx = chip("彼の話は、いつも明るい", size=24, edge=INDIGO).to_edge(UP, buff=0.7)
        self.play(FadeIn(VGroup(axis, room, char)), FadeIn(bright_halo), FadeIn(bright), run_time=0.9)
        self.play(FadeIn(ctx, shift=DOWN * 0.2), run_time=0.6)
        self.wait(0.5)
        # 性格側へ寄り、ピントが合う（halo が締まる）。グループ全体を動かし色も変える
        self.play(
            bright.animate.move_to(char_p + DOWN * 0.9).set_color(AMBER),
            bright_halo.animate.move_to(char_p + DOWN * 0.9).scale(0.3),
            run_time=1.1,
        )

        # b2.focus : 重ねるたび鋭く（ピント）
        cap_focus = T("文脈というピントで、ぼやけた意味が一点に合う", size=24, color=AMBER).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(cap_focus), run_time=0.5)
        for s in (0.55, 0.5):
            self.play(bright_halo.animate.scale(s), run_time=0.45)
        self.wait(0.8)
        self.play(FadeOut(VGroup(axis, room, char, ctx, cap_focus)), run_time=0.5)

        # b2.general : 初見の文も既知の点を混ぜて置ける
        self.play(bright_halo.animate.set_opacity(0), run_time=0.2)
        gen = title_band("初めて見る文も、知ってる語の場所を文脈で混ぜれば置ける（丸暗記じゃない）", INK)
        a = Dot(np.array([-3, -1, 0]), radius=0.08, color=INDIGO)
        b = Dot(np.array([-1, 1.5, 0]), radius=0.08, color=INDIGO)
        mid = Dot((a.get_center() + b.get_center()) / 2, radius=0.1, color=GREEN)
        la = T("既知A", size=20, color=INDIGO).next_to(a, DOWN, buff=0.1)
        lb = T("既知B", size=20, color=INDIGO).next_to(b, UP, buff=0.1)
        lm = T("初見の語", size=20, color=GREEN).next_to(mid, RIGHT, buff=0.15)
        mix = VGroup(Line(a.get_center(), mid.get_center(), color=SUB, stroke_width=1.5),
                     Line(b.get_center(), mid.get_center(), color=SUB, stroke_width=1.5))
        self.play(FadeIn(gen, shift=DOWN * 0.2), run_time=0.6)
        self.play(FadeIn(VGroup(a, b, la, lb)), run_time=0.6)
        self.play(Create(mix), GrowFromCenter(mid), FadeIn(lm), run_time=0.9)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面4：ボディ3 「次の一語を引いて、また引く」
# ════════════════════════════════════════════════════════════
class S4Body3(Scene):
    def construct(self):
        # body3.in : 上に文、下に最後の点（アンバー）から確率の山
        sent = chip("私はラーメンを＿", size=30, edge=INDIGO).to_edge(UP, buff=0.7)
        self.play(FadeIn(sent, shift=DOWN * 0.2), run_time=0.7)
        src = word_point("文脈を吸った最後の点", color=AMBER, size=22, dir=LEFT).move_to(np.array([-4.8, 1.0, 0]))
        self.play(FadeIn(src), run_time=0.6)

        # 確率の山＝縦バー
        cands = [("食べた", 0.60, INK), ("すすった", 0.10, INK), ("作った", 0.05, INK), ("書いた", 0.01, INK)]
        base_y = -2.2
        xs = [-2.2, -0.2, 1.8, 3.8]
        bars = VGroup()
        for (w, p, c), x in zip(cands, xs):
            h = p * 5.5 + 0.05
            bar = Rectangle(width=0.95, height=h, fill_color=INDIGO, fill_opacity=0.85, stroke_width=0)
            bar.move_to([x, base_y + h / 2, 0])
            lab = T(w, size=22, color=INK).next_to(bar, DOWN, buff=0.15)
            pct = T(f"{int(p*100)}%", size=22, color=INDIGO).next_to(bar, UP, buff=0.1)
            grp = VGroup(bar, lab, pct)
            grp.bar, grp.pct = bar, pct
            bars.add(grp)
        axis = Line([-3.2, base_y, 0], [4.6, base_y, 0], color=SUB, stroke_width=2)
        feed = Arrow(src.dot.get_center(), bars[0].bar.get_top() + UP * 0.3, color=AMBER, stroke_width=3, buff=0.2)
        self.play(GrowArrow(feed), Create(axis), run_time=0.7)
        self.play(LaggedStart(*[GrowFromEdge(g.bar, DOWN) for g in bars], lag_ratio=0.12),
                  LaggedStart(*[FadeIn(g[1]) for g in bars], lag_ratio=0.12), run_time=1.2)
        self.play(LaggedStart(*[FadeIn(g.pct) for g in bars], lag_ratio=0.12), run_time=0.8)
        self.wait(0.6)

        # b3.pick : 山にしたがって一本（食べた）が緑に
        self.play(bars[0].bar.animate.set_fill(GREEN), bars[0].pct.animate.set_color(GREEN), run_time=0.6)
        self.play(Flash(bars[0].bar.get_top(), color=GREEN, line_length=0.25), run_time=0.5)
        self.wait(0.5)

        # b3.temp : つまみで山の形が変わる
        knob_line = Line([-2.2, 2.3, 0], [1.0, 2.3, 0], color=SUB, stroke_width=3)
        knob = Dot([-1.6, 2.3, 0], radius=0.13, color=TEAL)
        klab = T("ゆらぎ（温度）", size=20, color=TEAL).next_to(knob_line, LEFT, buff=0.25)
        self.play(FadeIn(VGroup(knob_line, knob, klab)), run_time=0.6)
        # 高温＝平ら
        flat = [0.34, 0.27, 0.22, 0.17]
        self.play(knob.animate.move_to([1.0, 2.3, 0]),
                  *[g.bar.animate.stretch_to_fit_height(p * 5.5 + 0.05).move_to([x, base_y + (p*5.5+0.05)/2, 0])
                    for g, p, x in zip(bars, flat, xs)],
                  run_time=1.0)
        self.play(FadeOut(VGroup(*[g.pct for g in bars])), run_time=0.3)
        ht = T("高い＝自由・創造的　／　低い＝かっちり正確", size=22, color=TEAL).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(ht), run_time=0.5)
        self.wait(0.6)
        # 低温＝尖る
        peak = [0.85, 0.07, 0.05, 0.03]
        self.play(knob.animate.move_to([-2.2, 2.3, 0]),
                  *[g.bar.animate.stretch_to_fit_height(p * 5.5 + 0.05).move_to([x, base_y + (p*5.5+0.05)/2, 0])
                    for g, p, x in zip(bars, peak, xs)],
                  run_time=1.0)
        self.wait(0.5)
        self.play(FadeOut(VGroup(knob_line, knob, klab, ht)), run_time=0.4)

        # b3.halluc : 事実でない語が自信たっぷりに赤で
        self.play(*[g.bar.animate.stretch_to_fit_height(p*5.5+0.05).move_to([x, base_y+(p*5.5+0.05)/2,0])
                    for g,p,x in zip(bars,[0.5,0.28,0.15,0.07],xs)], run_time=0.6)
        # 「書いた」(でたらめ) が高く選ばれる
        self.play(bars[3].bar.animate.stretch_to_fit_height(0.55*5.5).move_to([xs[3], base_y+0.55*5.5/2,0]).set_fill(RED),
                  bars[0].bar.animate.set_fill(INDIGO), run_time=0.8)
        hal = T("「知らない」と「それっぽい」の区別がない＝幻覚（賢さと同じ仕掛け）", size=22, color=RED).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(hal), Flash(bars[3].bar.get_top(), color=RED), run_time=0.7)
        self.wait(0.8)
        # 後段に残す物（bars[0].bar）以外を明示的に消す。重複登録を避ける。
        gone_bars = [bars[1].bar, bars[2].bar, bars[3].bar]
        gone_labels = [bars[i][1] for i in range(4)]
        self.play(
            *[FadeOut(m) for m in (hal, src, feed, axis, *gone_bars, *gone_labels)],
            bars[0].bar.animate.set_fill(GREEN),
            run_time=0.6,
        )
        self.remove(hal, src, feed, axis, *gone_bars, *gone_labels)

        # b3.append : 選ばれた語が文末にくっつく
        chosen = chip("食べた", size=30, edge=GREEN, txt=GREEN).move_to(bars[0].bar.get_center())
        self.play(ReplacementTransform(bars[0].bar, chosen.box), FadeIn(chosen.label), run_time=0.6)
        sent2 = chip("私はラーメンを食べた", size=30, edge=INDIGO).to_edge(UP, buff=0.7)
        self.play(chosen.animate.next_to(sent, RIGHT, buff=0.08), run_time=0.7)
        self.play(FadeOut(sent), FadeOut(chosen), FadeIn(sent2), run_time=0.6)
        self.remove(sent, chosen)
        self.wait(0.3)

        # b3.loop : 自己回帰の輪
        loop = CurvedArrow(sent2.get_right() + RIGHT * 0.1, sent2.get_left() + LEFT * 0.1,
                           angle=-TAU / 3, color=TEAL, stroke_width=4)
        loop.shift(DOWN * 0.05)
        loop_lab = T("自己回帰：出力を、また自分に食わせる", size=22, color=TEAL).next_to(loop, DOWN, buff=0.3)
        self.play(Create(loop), FadeIn(loop_lab), run_time=1.0)
        self.wait(0.7)
        self.play(FadeOut(loop), FadeOut(loop_lab), FadeOut(sent2), run_time=0.5)
        self.remove(loop, loop_lab, sent2)

        # b3.noplan : 設計図なしに語ブロックが積まれて建物に
        blocks_words = ["私は", "ラーメンを", "食べた", "とても", "おいしかった"]
        tower = VGroup()
        bw = 3.0
        for i, w in enumerate(blocks_words):
            b = Rectangle(width=bw, height=0.7, fill_color=INDIGO, fill_opacity=0.16,
                          stroke_color=INDIGO, stroke_width=2)
            t = T(w, size=24, color=INK)
            blk = VGroup(b, t)
            blk.move_to([0, -2.4 + i * 0.74, 0])
            tower.add(blk)
        nolan = title_band("設計図はどこにもない。一語ずつ積むだけで、筋の通った話が建つ", INK)
        self.play(FadeIn(nolan, shift=DOWN * 0.2), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.3) for b in tower], lag_ratio=0.35), run_time=1.8)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面5：結論 「場所と距離だけ・中国語の部屋」
# ════════════════════════════════════════════════════════════
class S5Outro(Scene):
    def construct(self):
        plane = faint_plane()
        self.add(plane)

        # outro.in : 地図と点だけが戻る。中を覗いても意味は無い
        p1 = np.array([-2.2, 0.8, 0])
        p2 = np.array([1.5, -0.6, 0])
        w1 = word_point("りんご", color=INDIGO, size=26, dir=UP).move_to(p1)
        w2 = word_point("政府", color=INDIGO, size=26, dir=UP).move_to(p2)
        self.play(FadeIn(w1), FadeIn(w2), run_time=0.7)

        # outro.empty : 点と点の間に距離だけ。意味は一文字も無い
        dist = DoubleArrow(p1, p2, color=SUB, stroke_width=3, buff=0.2)
        dist_lab = T("距離だけ", size=22, color=SUB).move_to((p1 + p2) / 2 + UP * 0.4)
        self.play(GrowFromCenter(dist), FadeIn(dist_lab), run_time=0.8)
        no_mean = T("在るのは場所と距離だけ。「意味」は一文字も無い", size=24, color=INK).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(no_mean), run_time=0.6)
        self.wait(0.8)
        self.play(FadeOut(VGroup(dist, dist_lab, no_mean, w1, w2)), run_time=0.5)

        # outro.room : 地図が「中国語の部屋」へモーフ
        room = RoundedRectangle(corner_radius=0.15, width=4.2, height=3.0,
                                stroke_color=INK, stroke_width=3, fill_color=WHITE, fill_opacity=1)
        room.move_to(LEFT * 1.8)
        room_lab = T("中国語の部屋", size=24, color=INK).next_to(room, UP, buff=0.2)
        # 中の人（簡素な棒人間）
        head = Circle(radius=0.22, color=INK, stroke_width=3).move_to(room.get_center() + UP * 0.3 + LEFT * 0.6)
        body = Line(head.get_bottom(), head.get_bottom() + DOWN * 0.5, color=INK, stroke_width=3)
        person = VGroup(head, body)
        # 分厚いマニュアル
        manual = VGroup(
            Rectangle(width=0.9, height=1.1, fill_color=AMBER, fill_opacity=0.18, stroke_color=AMBER, stroke_width=2),
            *[Line(LEFT * 0.3, RIGHT * 0.3, color=AMBER, stroke_width=1.5).shift(UP * (0.3 - i * 0.18)) for i in range(4)],
        ).move_to(room.get_center() + RIGHT * 0.9 + DOWN * 0.1)
        man_lab = T("規則の本", size=18, color=AMBER).next_to(manual, DOWN, buff=0.12)
        # NumberPlane は線が多くモーフが散らかるため、地図を退け部屋を描き起こす
        self.play(FadeOut(plane), Create(room), FadeIn(room_lab), run_time=1.0)
        self.remove(plane)
        self.play(FadeIn(person), FadeIn(manual), FadeIn(man_lab), run_time=0.8)
        self.wait(0.5)

        # outro.symbol : 記号が入り、規則で別の記号が出る
        sym_in = T("漢", size=34, color=RED).move_to(room.get_left() + LEFT * 1.6)
        sym_out = T("字", size=34, color=RED).move_to(room.get_right() + RIGHT * 1.6)
        in_arr = Arrow(sym_in.get_right(), room.get_left(), color=RED, stroke_width=3, buff=0.15)
        out_arr = Arrow(room.get_right(), sym_out.get_left(), color=RED, stroke_width=3, buff=0.15)
        self.play(FadeIn(sym_in, shift=RIGHT * 0.2), GrowArrow(in_arr), run_time=0.7)
        self.play(GrowArrow(out_arr), FadeIn(sym_out, shift=RIGHT * 0.2), run_time=0.7)
        outside = T("外からは「理解している」ように見える", size=22, color=INK).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(outside), run_time=0.5)
        self.wait(0.8)
        self.play(FadeOut(VGroup(sym_in, sym_out, in_arr, out_arr, outside)), run_time=0.5)

        # outro.human : 部屋の隣に人の頭。中には同じ意味の地図
        room_grp = VGroup(room, room_lab, person, manual, man_lab)
        self.play(room_grp.animate.scale(0.85).to_edge(LEFT, buff=0.7), run_time=0.8)
        h_head = Circle(radius=1.3, color=INDIGO, stroke_width=3).to_edge(RIGHT, buff=1.3)
        h_lab = T("人間", size=24, color=INDIGO).next_to(h_head, UP, buff=0.2)
        # 中の小さな地図
        mini = NumberPlane(
            x_range=[-2, 2, 1], y_range=[-2, 2, 1],
            background_line_style={"stroke_color": PALE, "stroke_width": 1, "stroke_opacity": 1},
            axis_config={"stroke_color": PALE, "stroke_width": 1, "include_ticks": False},
        ).scale(0.5).move_to(h_head.get_center())
        md = VGroup(Dot(h_head.get_center() + np.array([-0.4, 0.3, 0]), radius=0.06, color=INDIGO),
                    Dot(h_head.get_center() + np.array([0.3, -0.2, 0]), radius=0.06, color=INDIGO))
        self.play(Create(h_head), FadeIn(h_lab), run_time=0.7)
        self.play(FadeIn(mini), FadeIn(md), run_time=0.7)
        same = T("人も「周りの語」から意味を得た ── 同じ材料", size=22, color=INDIGO).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(same), run_time=0.5)
        self.wait(0.6)

        # outro.mirror / end : 境目が薄れ、問いがこちらへ
        self.play(Indicate(VGroup(mini, md), color=INDIGO, scale_factor=1.1), run_time=0.8)
        self.play(FadeOut(same), run_time=0.3)
        q = T("意味がわかるとは、本当は何なのか？", size=30, color=INK, weight=BOLD).move_to(DOWN * 2.6)
        self.play(Write(q), run_time=1.2)
        self.wait(1.2)
