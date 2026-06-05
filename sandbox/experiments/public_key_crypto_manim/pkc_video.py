# 公開鍵暗号の仕組み ── manim 実装（図のみ・無音）
# 設計: ../public_key_crypto/design_overall.md / design_spec.md
# 思想: 概念にラベルを貼らず、錠前・鍵・箱という実体の道具を動かして仕組みを見せる。
#       画面内は連続変化、画面の切り替わりだけがリセット点。ループ運動は禁止。
from manim import *
import numpy as np

config.background_color = "#F5F7FA"

# ── 色言語（design_overall §1）─────────────────────────────
INK    = "#243044"  # 主文字・基本線
BORDER = "#C4CEDD"  # 枠・補助線
PANEL  = "#FFFFFF"  # 面
GREY   = "#8A97A8"  # 通信路・退いた要素
TEAL   = "#2F8FB3"  # 公開＝配ってよいもの（錠前・公開鍵）
AMBER  = "#D99A2B"  # 秘密＝隠すもの（鍵・秘密鍵・合言葉）
CORAL  = "#D9543C"  # 盗み見・危険
GREEN  = "#3F9D57"  # 安全・確認OK・署名
METAL  = "#9AA6B6"  # 錠前の金属

JP = "Yu Gothic"


# ── テキスト ──────────────────────────────────────────────
def T(text, size=30, color=INK, weight=NORMAL):
    return Text(text, font=JP, color=color, weight=weight, font_size=size)

def section_header(num, title):
    """左上の小さなセクション見出し（ナビ補助）。"""
    g = VGroup(
        T(num, size=24, color=TEAL, weight=BOLD),
        T(title, size=24, color=INK),
    ).arrange(RIGHT, buff=0.22)
    return g.to_corner(UL, buff=0.4)


# ── 錠前（南京錠）──────────────────────────────────────────
class Padlock(VGroup):
    """U字のつる＋本体。つるの開閉で施錠を表す。color で本体色を塗る。"""
    def __init__(self, color=METAL, sw=4, **kwargs):
        super().__init__(**kwargs)
        body = RoundedRectangle(corner_radius=0.1, width=0.72, height=0.62,
                                stroke_color=INK, stroke_width=sw,
                                fill_color=color, fill_opacity=1.0)
        # 鍵穴
        hole = Circle(radius=0.07, stroke_width=0, fill_color=INK, fill_opacity=1.0)
        slot = Triangle(stroke_width=0, fill_color=INK, fill_opacity=1.0).scale(0.07).rotate(PI)
        slot.next_to(hole, DOWN, buff=0.0)
        keyhole = VGroup(hole, slot).move_to(body.get_center() + DOWN * 0.02)
        # つる（⊓）：上半円＋左右の脚。閉じた状態で本体上辺に座る。
        r = 0.2
        top = Arc(radius=r, start_angle=0, angle=PI, stroke_color=INK, stroke_width=sw + 1)
        left_leg = Line([-r, 0, 0], [-r, -0.22, 0], stroke_color=INK, stroke_width=sw + 1)
        right_leg = Line([r, 0, 0], [r, -0.22, 0], stroke_color=INK, stroke_width=sw + 1)
        shackle = VGroup(top, left_leg, right_leg)
        shackle.next_to(body.get_top(), UP, buff=-0.04)
        self.add(shackle, body, keyhole)
        self.body, self.keyhole, self.shackle = body, keyhole, shackle
        self.left_leg = left_leg  # 回転ピボット＝左脚の根元（呼び出し時に現在位置から取る）

    def _pivot(self):
        return self.left_leg.get_end()

    def opened(self):
        """初期状態を「開」にする（つるを跳ね上げる）。"""
        self.shackle.rotate(48 * DEGREES, about_point=self._pivot())
        return self

    def snap_close(self):
        """パチンと閉じる Rotate アニメ。"""
        return Rotate(self.shackle, -48 * DEGREES, about_point=self._pivot(), run_time=0.5)

    def snap_open(self):
        return Rotate(self.shackle, 48 * DEGREES, about_point=self._pivot(), run_time=0.5)


# ── 鍵 ────────────────────────────────────────────────────
class Key(VGroup):
    """持ち手の輪＋軸＋歯。秘密鍵はアンバー。"""
    def __init__(self, color=AMBER, sw=5, **kwargs):
        super().__init__(**kwargs)
        ring = Annulus(inner_radius=0.1, outer_radius=0.2, stroke_width=0,
                       fill_color=color, fill_opacity=1.0)
        shaft = Line([0.2, 0, 0], [0.78, 0, 0], stroke_color=color, stroke_width=sw)
        t1 = Line([0.62, 0, 0], [0.62, -0.16, 0], stroke_color=color, stroke_width=sw)
        t2 = Line([0.78, 0, 0], [0.78, -0.16, 0], stroke_color=color, stroke_width=sw)
        self.add(ring, shaft, t1, t2)
        self.color_main = color


# ── のぞき見る目 ───────────────────────────────────────────
class Eye(VGroup):
    """通信路の上に浮かぶ一つの目。視線が通るものへ向く。"""
    def __init__(self, color=INK, **kwargs):
        super().__init__(**kwargs)
        L, R = np.array([-0.5, 0, 0]), np.array([0.5, 0, 0])
        top = ArcBetweenPoints(L, R, angle=-1.1, stroke_color=color, stroke_width=4)
        bot = ArcBetweenPoints(L, R, angle=1.1, stroke_color=color, stroke_width=4)
        iris = Circle(radius=0.2, stroke_width=0, fill_color=color, fill_opacity=0.25)
        pupil = Dot(radius=0.1, color=color)
        self.add(top, bot, iris, pupil)
        self.iris, self.pupil, self.lids = iris, pupil, VGroup(top, bot)


# ── 箱（ふた付き・中に手紙）────────────────────────────────
class Box(VGroup):
    """施錠度0＝ふた開・中身見える／1＝錠前で固く閉じる。"""
    LID_ANGLE = 100 * DEGREES

    def __init__(self, lid_open=False, **kwargs):
        super().__init__(**kwargs)
        body = RoundedRectangle(corner_radius=0.08, width=1.5, height=0.95,
                                stroke_color=INK, stroke_width=4,
                                fill_color="#EFE7D6", fill_opacity=1.0)
        body.shift(DOWN * 0.1)
        # 手紙（中身）
        sheet = Rectangle(width=0.74, height=0.56, stroke_color=GREY, stroke_width=2,
                          fill_color=PANEL, fill_opacity=1.0).move_to(body.get_center())
        lines = VGroup(*[
            Line([-0.24, y, 0], [0.24, y, 0], stroke_color=GREY, stroke_width=2)
            for y in (0.12, 0.0, -0.12)
        ]).move_to(sheet.get_center())
        letter = VGroup(sheet, lines)
        # ふた（後ろの蝶番で立ち上がる）
        lid = RoundedRectangle(corner_radius=0.08, width=1.5, height=0.24,
                               stroke_color=INK, stroke_width=4,
                               fill_color="#D8CDB6", fill_opacity=1.0)
        lid.next_to(body.get_top(), UP, buff=-0.02)
        self.add(body, letter, lid)
        self.body, self.letter, self.lid = body, letter, lid
        self.sheet, self.lines = sheet, lines
        self.lock = None
        if lid_open:
            self.lid.rotate(self.LID_ANGLE, about_point=self._hinge())
        else:
            self.letter.set_opacity(0.0)

    def _hinge(self):
        # 本体の左上角＝蝶番。本体は回らないので移動後も正しい軸になる
        return self.body.get_corner(UL)

    def open_lid(self):
        return AnimationGroup(
            Rotate(self.lid, self.LID_ANGLE, about_point=self._hinge()),
            self.letter.animate.set_opacity(1.0),
            run_time=0.7,
        )

    def close_lid(self):
        return AnimationGroup(
            Rotate(self.lid, -self.LID_ANGLE, about_point=self._hinge()),
            self.letter.animate.set_opacity(0.0),
            run_time=0.7,
        )


# ── 通信路 ────────────────────────────────────────────────
def make_channel(y=0.3):
    """白い舞台を横切る一本の道。左に送り手・右に受け手の台。"""
    band = Rectangle(width=13.4, height=0.62, stroke_width=0,
                     fill_color="#E5EBF3", fill_opacity=1.0).move_to(UP * y)
    mid = DashedLine([-6.6, y, 0], [6.6, y, 0], stroke_color=BORDER,
                     stroke_width=3, dash_length=0.18)
    def platform(x, label):
        slab = RoundedRectangle(corner_radius=0.06, width=1.25, height=0.7,
                                stroke_color=INK, stroke_width=3,
                                fill_color=PANEL, fill_opacity=1.0).move_to([x, y, 0])
        cap = T(label, size=22, color=GREY).next_to(slab, DOWN, buff=0.16)
        g = VGroup(slab, cap)
        g.slab = slab
        return g
    sender = platform(-5.9, "送り手")
    receiver = platform(5.9, "受け手")
    g = VGroup(band, mid, sender, receiver)
    g.band, g.mid, g.sender, g.receiver, g.y = band, mid, sender, receiver, y
    return g


# ── 小道具 ────────────────────────────────────────────────
def check_mark(color=GREEN, s=1.0):
    m = VMobject(stroke_color=color, stroke_width=8)
    m.set_points_as_corners([np.array(p) for p in
                             ([-0.2, 0.02, 0], [-0.05, -0.18, 0], [0.24, 0.26, 0])])
    return m.scale(s)

def cross_mark(color=CORAL, s=1.0):
    a = Line([-0.18, 0.18, 0], [0.18, -0.18, 0], stroke_color=color, stroke_width=8)
    b = Line([-0.18, -0.18, 0], [0.18, 0.18, 0], stroke_color=color, stroke_width=8)
    return VGroup(a, b).scale(s)

def num_tile(text, color=INK, fill=PANEL, size=30, w=None):
    label = T(text, size=size, color=color)
    box = RoundedRectangle(corner_radius=0.08, width=(w or label.width + 0.4),
                           height=label.height + 0.32, stroke_color=color,
                           stroke_width=3, fill_color=fill, fill_opacity=1.0)
    g = VGroup(box, label)
    g.box, g.label = box, label
    return g

def person(color=INK):
    head = Circle(radius=0.2, stroke_color=color, stroke_width=3,
                  fill_color=PANEL, fill_opacity=1.0).shift(UP * 0.28)
    shoulders = ArcBetweenPoints([-0.32, -0.2, 0], [0.32, -0.2, 0], angle=-PI,
                                 stroke_color=color, stroke_width=3)
    return VGroup(shoulders, head)

def hourglass(color=GREY, s=1.0):
    top = Polygon([-0.18, 0.3, 0], [0.18, 0.3, 0], [0, 0, 0],
                  stroke_color=color, stroke_width=3, fill_color=color, fill_opacity=0.18)
    bot = Polygon([-0.18, -0.3, 0], [0.18, -0.3, 0], [0, 0, 0],
                  stroke_color=color, stroke_width=3, fill_color=color, fill_opacity=0.18)
    capt = Line([-0.22, 0.3, 0], [0.22, 0.3, 0], stroke_color=color, stroke_width=3)
    capb = Line([-0.22, -0.3, 0], [0.22, -0.3, 0], stroke_color=color, stroke_width=3)
    return VGroup(top, bot, capt, capb).scale(s)

def gaze(eye, target, color):
    """目から対象へ伸びる視線。"""
    return Line(eye.get_bottom(), target.get_top(), stroke_color=color,
                stroke_width=3).set_opacity(0.85)


# ════════════════════════════════════════════════════════════
# 画面1：序論 「人目のある通信路 — 鍵を渡す段で破れる」
# ════════════════════════════════════════════════════════════
class S1Intro(Scene):
    def construct(self):
        ch = make_channel()
        head = section_header("01", "人目のある通信路")
        self.play(FadeIn(ch), FadeIn(head), run_time=0.9)

        # intro.channel：目が現れ、開いた箱が道を進み、中の手紙が読まれる
        eye = Eye().scale(0.85).move_to([0, 2.3, 0])
        self.play(FadeIn(eye, shift=DOWN * 0.2), run_time=0.6)
        box = Box(lid_open=True).scale(0.8).move_to(ch.sender.slab.get_center())
        self.play(FadeIn(box), run_time=0.5)
        self.play(box.animate.move_to([0, ch.y, 0]), run_time=1.2)
        g1 = gaze(eye, box, CORAL)
        self.play(Create(g1), box.lines.animate.set_color(CORAL), run_time=0.7)
        self.wait(0.4)

        # intro.naive：素朴な錠前と鍵が現れ、箱を閉じて施錠
        nlock = Padlock(color=METAL).opened().scale(0.6).next_to(box, UP, buff=0.5).shift(LEFT * 0.5)
        nkey = Key(color=AMBER).scale(0.8).next_to(box, UP, buff=0.5).shift(RIGHT * 0.6)
        self.play(FadeOut(g1), box.lines.animate.set_color(GREY), run_time=0.4)
        self.play(LaggedStart(FadeIn(nlock, shift=DOWN * 0.2), FadeIn(nkey, shift=DOWN * 0.2), lag_ratio=0.4), run_time=0.9)
        self.play(box.close_lid(), run_time=0.6)
        self.play(nlock.animate.scale(0.85).move_to(box.body.get_center()), run_time=0.6)
        self.play(nlock.snap_close())
        self.wait(0.3)
        # 閉じた箱は読まれない：視線は届くが中身は変わらない
        g2 = gaze(eye, box, GREY)
        self.play(Create(g2), run_time=0.5)
        self.wait(0.3)
        self.play(FadeOut(g2), run_time=0.3)

        # intro.keyleak：鍵が道を進む→目に捕まる→漏れた鍵で箱が開く（✗）
        self.play(nkey.animate.move_to([2.6, ch.y, 0]), run_time=1.0)
        g3 = gaze(eye, nkey, CORAL)
        self.play(Create(g3), nkey.animate.set_color(CORAL), run_time=0.6)
        self.wait(0.3)
        self.play(nlock.snap_open(), nkey.animate.next_to(box, RIGHT, buff=0.2))
        self.play(box.open_lid(), box.lines.animate.set_color(CORAL), run_time=0.6)
        xmark = cross_mark(CORAL, s=1.2).next_to(box, UP, buff=0.3)
        self.play(FadeIn(xmark, scale=0.5), run_time=0.5)
        self.wait(0.5)

        # intro.name：堂々めぐりに名前がつく
        self.play(FadeOut(xmark), FadeOut(nkey), FadeOut(g3), run_time=0.4)
        self.play(box.close_lid(), run_time=0.5)
        self.play(nlock.snap_close())
        title = T("公開鍵暗号", size=46, color=INK, weight=BOLD).move_to([0, -1.7, 0])
        sub = T("鍵を渡さずに、秘密を送れるか？", size=26, color=GREY).next_to(title, DOWN, buff=0.25)
        self.play(FadeIn(title, shift=UP * 0.2), run_time=0.8)
        self.play(FadeIn(sub), run_time=0.6)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面2：ボディ1 「錠前と鍵を、別々のものにする」
# ════════════════════════════════════════════════════════════
class S2Body1(Scene):
    def construct(self):
        ch = make_channel()
        head = section_header("02", "錠前と鍵を、別々に")
        self.play(FadeIn(ch), FadeIn(head), run_time=0.8)

        # scene.in：中央に大きな開いた南京錠
        lock = Padlock(color=TEAL).opened().scale(1.8).move_to([0, 1.7, 0])
        self.play(FadeIn(lock, shift=DOWN * 0.2), run_time=0.7)

        # b1.snap：押しこむとパチンと閉じる（鍵は使われない）
        arrow = Arrow(lock.shackle.get_top() + UP * 0.6, lock.shackle.get_top() + UP * 0.05,
                      color=INK, buff=0, stroke_width=5, max_tip_length_to_length_ratio=0.4)
        self.play(GrowArrow(arrow), run_time=0.4)
        self.play(lock.snap_close(), FadeOut(arrow), run_time=0.5)
        self.wait(0.3)
        # 鍵は閉めには使われない、と示す（鍵に✗）
        nokey = Key(color=GREY).scale(0.9).next_to(lock, RIGHT, buff=0.7)
        nox = cross_mark(GREY, s=0.7).move_to(nokey.get_center())
        self.play(FadeIn(nokey), run_time=0.4)
        self.play(Create(nox), run_time=0.4)
        self.wait(0.4)
        self.play(FadeOut(nokey), FadeOut(nox), run_time=0.4)

        # b1.pair：受け手が鍵を持つ（秘密鍵＝アンバー、手元へ）
        skey = Key(color=AMBER).scale(1.1).next_to(lock, RIGHT, buff=0.8)
        self.play(FadeIn(skey, shift=LEFT * 0.2), run_time=0.6)
        hand = RoundedRectangle(corner_radius=0.1, width=1.5, height=1.0, stroke_color=AMBER,
                                stroke_width=2.5, fill_color=AMBER, fill_opacity=0.06).move_to([5.6, -1.7, 0])
        hlab = T("受け手の手元", size=20, color=AMBER).next_to(hand, DOWN, buff=0.15)
        self.play(FadeIn(hand), FadeIn(hlab), run_time=0.5)
        skey_lab = T("秘密鍵", size=22, color=AMBER)
        self.play(skey.animate.scale(0.9).move_to(hand.get_center()), run_time=0.9)
        skey_lab.next_to(hand, UP, buff=0.15)
        self.play(FadeIn(skey_lab), run_time=0.4)
        self.wait(0.3)

        # b1.publish：中央錠を開いて流れの先頭に降ろし、複製を道に流す（公開＝ティール）
        plate = T("公開鍵（配ってよい）", size=22, color=TEAL).move_to([0, 2.6, 0])
        self.play(lock.snap_open(), FadeIn(plate), run_time=0.5)
        self.play(lock.animate.scale(0.25).move_to([4.8, ch.y, 0]), run_time=0.8)
        extra = VGroup(*[Padlock(color=TEAL).opened().scale(0.45).move_to([4.8 - i * 2.4, ch.y, 0])
                         for i in (1, 2, 3)])
        self.play(LaggedStart(*[FadeIn(c, shift=LEFT * 0.3) for c in extra], lag_ratio=0.3), run_time=1.0)
        stream = [lock, *extra]  # 4.8 / 2.4 / 0.0 / -2.4
        eye = Eye().scale(0.7).move_to([0, 2.0, 0])
        self.play(FadeIn(eye), run_time=0.4)
        g = gaze(eye, stream[2], TEAL)
        self.play(Create(g), run_time=0.5)
        self.wait(0.3)
        self.play(FadeOut(g), FadeOut(plate), run_time=0.4)

        # b1.lock：送り手が一つ取り、箱を閉じて送る。残りは流れ去る
        box = Box(lid_open=True).scale(0.7).move_to(ch.sender.slab.get_center())
        self.play(FadeIn(box), run_time=0.4)
        takelock = stream[3]  # 送り手に一番近い一つ
        self.play(FadeOut(stream[0]), FadeOut(stream[1]), FadeOut(stream[2]),
                  takelock.animate.move_to(box.body.get_center()), run_time=0.8)
        self.remove(stream[0], stream[1], stream[2])
        self.play(box.close_lid(), run_time=0.5)
        self.play(takelock.snap_close())
        self.wait(0.2)
        # 箱が右へ。目は見るが、閉じた錠前は開かない
        self.play(box.animate.move_to([0.4, ch.y, 0]), takelock.animate.move_to([0.4, ch.y - 0.02, 0]), run_time=1.0)
        gb = gaze(eye, box, GREY)
        self.play(Create(gb), run_time=0.5)
        self.wait(0.3)
        self.play(FadeOut(gb), run_time=0.3)
        self.play(box.animate.move_to([3.7, ch.y, 0]), takelock.animate.move_to([3.7, ch.y - 0.02, 0]), run_time=0.9)

        # b1.open：手元の鍵で開く（鍵は道を一度も通っていない）→ ✓
        self.play(skey.animate.scale(1.1).next_to(takelock, RIGHT, buff=0.08), run_time=0.8)
        self.play(takelock.snap_open(), run_time=0.4)
        self.play(box.open_lid(), run_time=0.6)
        ok = check_mark(GREEN, s=1.3).next_to(box, UP, buff=0.3)
        self.play(Create(ok), run_time=0.5)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面3：ボディ2 「閉める計算と、開ける計算（片道）」
# ════════════════════════════════════════════════════════════
class S3Body2(Scene):
    def construct(self):
        head = section_header("03", "片道の計算と、落とし戸")
        self.play(FadeIn(head), run_time=0.5)

        # scene.in：大きな南京錠
        shell_l = RoundedRectangle(corner_radius=0.12, width=1.4, height=2.4, stroke_color=INK,
                                   stroke_width=4, fill_color=METAL, fill_opacity=1.0).move_to([-0.7, 0, 0])
        shell_r = RoundedRectangle(corner_radius=0.12, width=1.4, height=2.4, stroke_color=INK,
                                   stroke_width=4, fill_color=METAL, fill_opacity=1.0).move_to([0.7, 0, 0])
        shackle = VGroup(
            Arc(radius=0.55, start_angle=0, angle=PI, stroke_color=INK, stroke_width=7),
            Line([-0.55, 0, 0], [-0.55, -0.5, 0], stroke_color=INK, stroke_width=7),
            Line([0.55, 0, 0], [0.55, -0.5, 0], stroke_color=INK, stroke_width=7),
        ).next_to(VGroup(shell_l, shell_r).get_top(), UP, buff=-0.1)
        lock = VGroup(shell_l, shell_r, shackle).move_to([0, 0.4, 0])
        self.play(FadeIn(lock, shift=DOWN * 0.2), run_time=0.7)
        self.wait(0.2)

        # b2.inside：殻が左右に開いて計算盤があらわになる
        board = RoundedRectangle(corner_radius=0.1, width=9.0, height=3.0, stroke_color=BORDER,
                                 stroke_width=3, fill_color=PANEL, fill_opacity=1.0).move_to([0, 0.2, 0])
        board.set_opacity(0)
        self.add(board)
        self.play(
            shell_l.animate.shift(LEFT * 3.8), shell_r.animate.shift(RIGHT * 3.8),
            FadeOut(shackle, shift=UP * 0.5),
            board.animate.set_opacity(1.0), run_time=0.9,
        )
        self.play(FadeOut(shell_l), FadeOut(shell_r), run_time=0.4)
        self.remove(shell_l, shell_r, shackle)

        # b2.forward：素数2つを掛けて積に（行き＝やさしい・上のレーン）
        p1 = num_tile("61", color=TEAL, size=32).move_to([-3.4, 0.55, 0])
        p2 = num_tile("53", color=TEAL, size=32).move_to([-3.4, -0.35, 0])
        prime_lab = T("二つの素数", size=20, color=TEAL).next_to(VGroup(p1, p2), UP, buff=0.18)
        self.play(FadeIn(p1), FadeIn(p2), FadeIn(prime_lab), run_time=0.6)
        fwd = Arrow([-2.2, 1.0, 0], [2.2, 1.0, 0], color=GREEN, buff=0, stroke_width=6)
        fwd_lab = T("掛ける（やさしい）", size=22, color=GREEN).next_to(fwd, UP, buff=0.08)
        prod = num_tile("3233", color=INK, size=32).move_to([3.4, 0.1, 0])
        prod_lab = T("積", size=20, color=INK).next_to(prod, UP, buff=0.18)
        self.play(GrowArrow(fwd), FadeIn(fwd_lab), run_time=0.6)
        self.play(GrowFromPoint(prod, [0, 1.0, 0]), FadeIn(prod_lab), run_time=0.7)
        self.wait(0.3)

        # b2.backward：戻り＝険しい壁（下のレーン）。総当たりが×
        wall_pts = [[(-0.16 if i % 2 else 0.16), -1.12 + 0.19 * i, 0] for i in range(8)]
        wall = VMobject(stroke_color=CORAL, stroke_width=6)
        wall.set_points_as_corners([np.array(p) for p in wall_pts]).move_to([0, -0.45, 0])
        bck = Arrow([2.4, -0.45, 0], [0.55, -0.45, 0], color=CORAL, buff=0, stroke_width=6)
        back_lab = T("素因数に戻す（険しい）", size=22, color=CORAL).move_to([2.6, -1.5, 0])
        self.play(GrowArrow(bck), Create(wall), FadeIn(back_lab), run_time=0.8)
        tries = VGroup(num_tile("3 × ?", color=CORAL, size=22), num_tile("7 × ?", color=CORAL, size=22),
                       num_tile("11 × ?", color=CORAL, size=22)).arrange(DOWN, buff=0.16).move_to([1.5, -0.45, 0])
        self.play(LaggedStart(*[FadeIn(t) for t in tries], lag_ratio=0.25), run_time=0.7)
        xs = VGroup(*[cross_mark(CORAL, s=0.4).move_to(t.box.get_right() + RIGHT * 0.28) for t in tries])
        self.play(LaggedStart(*[Create(x) for x in xs], lag_ratio=0.25), run_time=0.6)
        self.wait(0.4)
        self.play(FadeOut(tries), FadeOut(xs), FadeOut(bck), FadeOut(back_lab), run_time=0.4)

        # b2.trapdoor：壁に落とし戸。秘密の数で近道が開く
        door = Square(side_length=0.58, stroke_color=AMBER, stroke_width=4,
                      fill_color=AMBER, fill_opacity=0.15).move_to([0, -0.85, 0])
        door_lab = T("落とし戸", size=20, color=AMBER).next_to(wall, UP, buff=0.12)
        secret = num_tile("秘密の数", color=AMBER, size=22).move_to([0, -2.4, 0])
        self.play(Create(door), FadeIn(door_lab), FadeIn(secret), run_time=0.7)
        self.play(secret.animate.move_to(door.get_center()).scale(0.6), run_time=0.7)
        shortcut = Arrow([2.4, -0.85, 0], [-2.4, -0.85, 0], color=AMBER, buff=0, stroke_width=6)
        sc_lab = T("秘密鍵＝近道", size=22, color=AMBER).move_to([-2.7, -1.5, 0])
        self.play(GrowArrow(shortcut), FadeIn(sc_lab), run_time=0.8)
        self.wait(0.4)

        # b2.caveat：砂時計＝「絶対」でなく「現実的な時間では」
        hg = hourglass(GREY, s=0.85).move_to([4.1, -2.4, 0])
        hg_lab = T("「現実的な時間では」", size=20, color=GREY).next_to(hg, LEFT, buff=0.25)
        self.play(FadeIn(hg), FadeIn(hg_lab), run_time=0.6)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面4：ボディ3 「同じ鍵で、送り主を確かめる（署名）」
# ════════════════════════════════════════════════════════════
class S4Body3(Scene):
    def construct(self):
        ch = make_channel()
        head = section_header("04", "鍵で閉めて、錠前で開く")
        self.play(FadeIn(ch), FadeIn(head), run_time=0.8)

        # scene.in：受け手側に錠前と鍵の対、箱
        skey = Key(color=AMBER).scale(1.1).move_to([5.3, -1.6, 0])
        skey_lab = T("秘密鍵", size=22, color=AMBER).next_to(skey, DOWN, buff=0.15)
        box = Box(lid_open=True).scale(0.75).move_to([4.3, ch.y, 0])
        self.play(FadeIn(skey), FadeIn(skey_lab), FadeIn(box), run_time=0.7)

        # b3.reverse：受け手が秘密鍵で箱を閉じる（錠前でなく鍵で閉める＝逆）
        moving_key = skey.copy()
        self.add(moving_key)
        self.play(moving_key.animate.next_to(box, UP, buff=0.2).scale(0.9), run_time=0.7)
        self.play(box.close_lid(), run_time=0.6)
        seal = Padlock(color=AMBER).scale(0.5).move_to(box.body.get_center())
        self.play(FadeIn(seal, scale=0.6), moving_key.animate.move_to(box.body.get_center() + UP * 0.0).set_opacity(0), run_time=0.5)
        self.play(seal.snap_close())
        self.remove(moving_key)
        rev_lab = T("秘密鍵で閉める", size=22, color=AMBER).next_to(box, UP, buff=0.35)
        self.play(FadeIn(rev_lab), run_time=0.4)
        self.wait(0.4)
        self.play(FadeOut(rev_lab), run_time=0.3)

        # b3.anyopen：配られた公開鍵を持つ人々なら誰でも開ける
        people = VGroup(*[VGroup(person(INK).scale(0.8),
                                 Padlock(color=TEAL).scale(0.32).next_to(person(INK).scale(0.8), UP, buff=0.05))
                          for _ in range(3)])
        for i, pp in enumerate(people):
            pp.move_to([-5.4 + i * 1.0, ch.y + 1.4, 0])
        self.play(LaggedStart(*[FadeIn(pp, shift=DOWN * 0.2) for pp in people], lag_ratio=0.25), run_time=0.9)
        self.play(box.animate.move_to([-3.6, ch.y, 0]), seal.animate.move_to([-3.6, ch.y - 0.05, 0]), run_time=1.2)
        self.play(seal.snap_open(), run_time=0.4)
        self.play(box.open_lid(), run_time=0.6)
        self.wait(0.3)

        # b3.sign：開いた事実に署名の印。印から秘密鍵へ線が結ばれる
        sign = check_mark(GREEN, s=1.4).next_to(box, UP, buff=0.3)
        sign_lab = T("署名", size=24, color=GREEN).next_to(sign, UP, buff=0.12)
        self.play(Create(sign), FadeIn(sign_lab), run_time=0.6)
        link = DashedLine(sign.get_center(), skey.get_center(), stroke_color=GREEN,
                          stroke_width=3, dash_length=0.15)
        link_lab = T("閉じられたのは秘密鍵の持ち主だけ", size=22, color=GREEN).move_to([0.3, -2.7, 0])
        self.play(Create(link), run_time=0.8)
        self.play(FadeIn(link_lab), run_time=0.5)
        self.wait(1.0)


# ════════════════════════════════════════════════════════════
# 画面5：結論 「鍵を渡さずに、秘密を送る」
# ════════════════════════════════════════════════════════════
class S5Outro(Scene):
    def construct(self):
        ch = make_channel(y=-0.2)
        head = section_header("05", "鍵を渡さずに、秘密を送る")
        self.play(FadeIn(ch), FadeIn(head), run_time=0.8)

        # scene.in：上に空の工程アイコン帯、中央に箱
        def slot(icon, label):
            frame = RoundedRectangle(corner_radius=0.12, width=2.7, height=1.7, stroke_color=BORDER,
                                     stroke_width=3, fill_color=PANEL, fill_opacity=1.0)
            ic = icon.scale_to_fit_height(0.7).move_to(frame.get_center() + UP * 0.25)
            lb = T(label, size=20, color=GREY).next_to(frame.get_bottom(), UP, buff=0.18)
            g = VGroup(frame, ic, lb)
            g.frame, g.ic, g.lb = frame, ic, lb
            return g

        icon_eye = Eye()
        icon_split = VGroup(Padlock(color=TEAL).scale(0.7), Key(color=AMBER).scale(0.7)).arrange(RIGHT, buff=0.15)
        icon_oneway = VGroup(Arrow([-0.4, 0.12, 0], [0.4, 0.12, 0], color=GREEN, buff=0, stroke_width=4),
                             Arrow([0.4, -0.12, 0], [-0.4, -0.12, 0], color=CORAL, buff=0, stroke_width=4))
        icon_sign = check_mark(GREEN, s=1.0)
        slots = VGroup(slot(icon_eye, "人目の道"), slot(icon_split, "鍵を分ける"),
                       slot(icon_oneway, "片道の計算"), slot(icon_sign, "署名"))
        slots.arrange(RIGHT, buff=0.35).move_to([0, 2.4, 0])
        for s in slots:
            s.set_opacity(0.25)
        box = Box(lid_open=True).scale(0.7).move_to(ch.sender.slab.get_center())
        self.play(FadeIn(slots), FadeIn(box), run_time=0.8)

        # outro.recap：工程が順に灯り、箱が全工程を早送りでなぞる
        lock = Padlock(color=TEAL).scale(0.4)
        for i, s in enumerate(slots):
            self.play(s.animate.set_opacity(1.0), run_time=0.4)
            if i == 0:
                self.play(box.animate.move_to([-2.2, ch.y, 0]), run_time=0.5)
            elif i == 1:
                lock.move_to(box.body.get_center())
                self.play(box.close_lid(), FadeIn(lock), run_time=0.5)
            elif i == 2:
                self.play(box.animate.move_to([2.2, ch.y, 0]), lock.animate.move_to([2.2, ch.y - 0.05, 0]), run_time=0.6)
            elif i == 3:
                self.play(box.open_lid(), FadeOut(lock), run_time=0.5)
        self.remove(lock)
        self.wait(0.4)

        # outro.loopback：序論の不思議に回帰（錠前のかかった箱・目・？を中央に）
        self.play(box.animate.move_to([0, ch.y, 0]), run_time=0.5)
        self.play(box.close_lid(), run_time=0.4)
        lock2 = Padlock(color=TEAL).scale(0.5).move_to(box.body.get_center())
        self.play(FadeIn(lock2), run_time=0.3)
        self.play(lock2.snap_close())
        eye = Eye().scale(0.7).move_to(box.get_center() + UP * 1.6)
        q = T("？", size=44, color=GREY, weight=BOLD).next_to(box, RIGHT, buff=0.7)
        self.play(FadeIn(eye), FadeIn(q), run_time=0.6)
        self.wait(0.5)

        # outro.end：手元の鍵だけが光り、道に「鍵の通った跡」が無い→箱が開く
        self.play(FadeOut(eye), FadeOut(q), run_time=0.4)
        skey = Key(color=AMBER).scale(1.0).move_to([5.4, ch.y - 1.4, 0])
        skey_lab = T("手元の鍵だけ", size=22, color=AMBER).next_to(skey, DOWN, buff=0.15)
        self.play(FadeIn(skey), FadeIn(skey_lab), run_time=0.5)
        notrace = T("通信路に鍵の通った跡は無い", size=22, color=GREY).move_to([0, ch.y + 0.9, 0])
        self.play(FadeIn(notrace), Flash(skey, color=AMBER, flash_radius=0.6), run_time=0.7)
        self.wait(0.3)
        self.play(lock2.snap_open(), run_time=0.4)
        self.play(box.open_lid(), run_time=0.5)
        ok = check_mark(GREEN, s=1.2).next_to(box, RIGHT, buff=0.35)
        self.play(Create(ok), run_time=0.4)
        self.play(FadeOut(notrace), run_time=0.3)
        end_line = T("閉める錠前は配り、開ける鍵だけを隠す。", size=30, color=INK, weight=BOLD).move_to([0, -2.9, 0])
        self.play(FadeIn(end_line, shift=UP * 0.2), run_time=0.9)
        self.wait(1.2)
