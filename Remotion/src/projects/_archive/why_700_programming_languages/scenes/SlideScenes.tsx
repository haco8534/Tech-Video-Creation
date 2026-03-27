import React from 'react';
import { AbsoluteFill, Img } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import './slides.css';

loadFont();

// ===== Devicon CDN icons (MIT License, https://devicon.dev) =====
const DI: React.FC<{ name: string; s?: number; variant?: string; style?: React.CSSProperties }> = ({ name, s = 36, variant = 'original', style }) => (
    <Img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`}
        width={s} height={s} style={{ flexShrink: 0, ...style }} />
);


const LANG_ICONS = [
    'javascript', 'python', 'typescript', 'java', 'c', 'cplusplus', 'go', 'rust',
    'swift', 'kotlin', 'ruby', 'php', 'csharp', 'perl', 'r', 'scala',
    'haskell', 'lua', 'dart', 'elixir', 'clojure', 'erlang', 'julia', 'fortran',
    'mysql', 'coffeescript', 'groovy', 'ocaml', 'fsharp', 'zig',
    'html5', 'css3', 'react', 'nodejs', 'angular', 'svelte',
];

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene scene-opening bg-dots" id="scene-0">
            <div className="content center-layout" style={{ "position": "relative" }}>
                {/* Icon cloud background */}
                <div style={{
                    "display": "flex", "flexWrap": "wrap", "justifyContent": "center", "alignItems": "center",
                    "gap": "6px", "position": "absolute", "top": "0", "left": "0", "right": "0", "bottom": "0",
                    "padding": "10px", "overflow": "hidden", "pointerEvents": "none"
                }}>
                    {LANG_ICONS.concat(LANG_ICONS).concat(LANG_ICONS).map((name, i) => (
                        <DI key={i} name={name} s={28} style={{ opacity: 0.2 }} />
                    ))}
                </div>
                {/* Main title */}
                <div style={{ "position": "relative", "zIndex": 1 }}>
                    <div style={{ "display": "flex", "justifyContent": "center", "gap": "6px", "marginBottom": "16px", "flexWrap": "wrap" }}>
                        <DI name="python" s={36} /><DI name="javascript" s={36} /><DI name="java" s={36} />
                        <DI name="c" s={36} /><DI name="cplusplus" s={36} /><DI name="go" s={36} />
                        <DI name="rust" s={36} /><DI name="swift" s={36} /><DI name="kotlin" s={36} />
                        <DI name="typescript" s={36} /><DI name="ruby" s={36} /><DI name="php" s={36} />
                        <DI name="csharp" s={36} /><DI name="haskell" s={36} /><DI name="scala" s={36} />
                    </div>
                    <div className="title-large">プログラミング言語は<br />なぜ<span className="accent-primary">700種類以上</span>あるのか</div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);


export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-1">
            <div className="content center-layout">
                <div className="scene-title">プログラミング言語の数</div>
                <div className="metric-grid">
                    <div className="metric-card stagger-item"><div className="metric-value accent-primary">700+</div><div className="metric-label">Wikipedia掲載</div></div>
                    <div className="metric-card stagger-item"><div className="metric-value accent-orange">8,000+</div><div className="metric-label">歴史上の総数</div></div>
                    <div className="metric-card stagger-item"><div className="metric-value accent-emerald">50〜100</div><div className="metric-label">実用されている数</div></div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
            <div className="content center-layout">
                <div className="big-statement">もしプログラミング言語が<br /><span className="accent-coral">世界に1つ</span>しかなかったら？</div>
                <div style={{ "marginTop": "28px" }}>
                    <div className="analogy-row">
                        <div className="analogy-card stagger-item">
                            <div style={{ "fontSize": "48px" }}>🔨</div>
                            <div className="card-title" style={{ "marginTop": "8px" }}>ハンマー1本の<br />工具箱</div>
                            <div className="card-note">ドライバーもノコギリもなし</div>
                        </div>
                        <div className="analogy-eq">=</div>
                        <div className="analogy-card stagger-item">
                            <div style={{ "fontSize": "48px" }}>💻</div>
                            <div className="card-title" style={{ "marginTop": "8px" }}>言語が1つだけの<br />プログラミング</div>
                            <div className="card-note">全領域を1つでカバー？</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-3">
            <div className="content center-layout">
                <div className="scene-title">コンピュータの言葉 = 0と1</div>
                <div className="two-col" style={{ "marginTop": "16px" }}>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--coral)" }}>
                        <div className="card-badge badge-coral">機械語</div>
                        <div style={{ "fontFamily": "monospace", "fontSize": "18px", "lineHeight": "1.8", "color": "var(--coral)" }}>
                            00110000 00000101<br />
                            00000100 00000011<br />
                            11110100 00000000
                        </div>
                        <div className="card-note" style={{ "marginTop": "8px" }}>人間には「暗号」</div>
                    </div>
                    <div className="col-arrow">→</div>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--primary)" }}>
                        <div className="card-badge badge-indigo">高水準言語</div>
                        <div style={{ "fontFamily": "monospace", "fontSize": "22px", "fontWeight": "700", "color": "var(--primary)", "marginTop": "12px" }}>
                            X = 5 + 3
                        </div>
                        <div className="card-note" style={{ "marginTop": "8px" }}>人間の言葉に近い</div>
                    </div>
                </div>
                <div className="big-statement" style={{ "fontSize": "22px", "marginTop": "20px" }}>「機械との白兵戦」からの解放</div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
            <div className="content center-layout">
                <div className="scene-title">世界初の高水準言語</div>
                <div className="timeline" style={{ "marginTop": "20px" }}>
                    <div className="tl-item stagger-item"><div className="tl-year">1950s</div><div className="tl-dot"></div><div className="tl-name">機械語</div><div className="tl-desc">0と1の白兵戦</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">1957</div><div className="tl-dot dot-hl"></div><div className="tl-name" style={{ "color": "var(--primary)" }}>FORTRAN</div><div className="tl-desc">数式の翻訳</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">IBM</div><div className="tl-dot"></div><div className="tl-name">J.バッカス</div><div className="tl-desc">最適化コンパイラ</div></div>
                </div>
                <div className="quote-block stagger-item" style={{ "marginTop": "24px" }}>
                    <div className="quote-mark">"</div>
                    <div className="quote-body">手書きの機械語とほぼ同じ速度で動く</div>
                    <div className="quote-attr">── 世界初の最適化コンパイラで証明</div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-5">
            <div className="content center-layout">
                <div className="scene-title">たった5年で「1つじゃ足りない」</div>
                <div className="two-col" style={{ "marginTop": "20px" }}>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--primary)" }}>
                        <div className="card-badge badge-indigo">FORTRAN (1957)</div>
                        <div className="card-title">科学技術計算</div>
                        <div style={{ "fontSize": "40px", "margin": "8px 0" }}>📐</div>
                        <div className="card-note">複雑な数式を<br />大量に処理する</div>
                    </div>
                    <div className="col-arrow">≠</div>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--orange)" }}>
                        <div className="card-badge badge-orange">COBOL (1959)</div>
                        <div className="card-title">事務処理</div>
                        <div style={{ "fontSize": "40px", "margin": "8px 0" }}>📋</div>
                        <div className="card-note">給与計算・在庫管理<br />帳票出力</div>
                    </div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
            <div className="content center-layout">
                <div className="scene-title">工具箱の法則</div>
                <div className="analogy-row" style={{ "marginTop": "20px" }}>
                    <div className="analogy-card stagger-item">
                        <div style={{ "fontSize": "44px" }}>🔨🔩🪚</div>
                        <div className="card-title" style={{ "marginTop": "8px" }}>工具の種類</div>
                        <div className="card-note">ハンマー / ドライバー / ノコギリ<br />やる作業が違う</div>
                    </div>
                    <div className="analogy-eq">=</div>
                    <div className="analogy-card stagger-item">
                        <div style={{ "display": "flex", "gap": "8px", "justifyContent": "center", "alignItems": "center" }}>
                            <DI name="javascript" s={32} /><DI name="python" s={32} /><DI name="c" s={32} />
                        </div>
                        <div className="card-title" style={{ "marginTop": "8px" }}>言語の種類</div>
                        <div className="card-note">JS / Python / C / SQL<br />解く問題が違う</div>
                    </div>
                </div>
                <div className="big-statement" style={{ "fontSize": "22px", "marginTop": "20px" }}>万能工具では家は建てられない</div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-7">
            <div className="content center-layout">
                <div className="scene-title">適材適所のプログラミング言語</div>
                <div className="num-list stagger-item" style={{ "marginTop": "16px" }}>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="javascript" s={28} /></div><div><div className="num-title">JavaScript</div><div className="num-desc">インタラクティブなWebサイト</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="python" s={28} /></div><div><div className="num-title">Python</div><div className="num-desc">AI・機械学習のライブラリが充実</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="c" s={28} /></div><div><div className="num-title">C / Rust</div><div className="num-desc">ロケット制御・1ミリ秒のズレが命取り</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ "background": "var(--emerald)" }}>金融</div><div><div className="num-title">COBOL</div><div className="num-desc">銀行基幹システム・50年安定稼働</div></div></div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
            <div className="content center-layout">
                <div className="scene-title">DSL ── 領域特化言語</div>
                <div className="lesson-cards stagger-item" style={{ "marginTop": "20px" }}>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--sky)" }}><div className="lesson-num" style={{ "color": "var(--sky)" }}>SQL</div><div className="lesson-title">データベース</div><div className="lesson-desc">データの検索・操作だけ</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--orange)" }}><div className="lesson-num" style={{ "color": "var(--orange)" }}>HTML</div><div className="lesson-title">Webの骨組み</div><div className="lesson-desc">ページ構造を定義するだけ</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--purple)" }}><div className="lesson-num" style={{ "color": "var(--purple)" }}>CSS</div><div className="lesson-title">見た目</div><div className="lesson-desc">色やレイアウトを整えるだけ</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--emerald)" }}><div className="lesson-num" style={{ "color": "var(--emerald)" }}>正規表現</div><div className="lesson-title">パターン検索</div><div className="lesson-desc">テキストの検索・置換だけ</div></div>
                </div>
                <div className="big-statement" style={{ "fontSize": "20px", "marginTop": "20px" }}>特化 → 圧倒的な生産性</div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-9">
            <div className="content center-layout">
                <div className="scene-title">不満が新しい言語を生む</div>
                <div className="flow-row stagger-item" style={{ "marginTop": "24px" }}>
                    <div className="flow-chip chip-indigo">既存の言語を使う</div>
                    <div className="flow-connector">→</div>
                    <div className="flow-chip chip-coral">不満が溜まる</div>
                    <div className="flow-connector">→</div>
                    <div className="flow-chip chip-orange">新しい言語を作る</div>
                    <div className="flow-connector">→</div>
                    <div className="flow-chip chip-emerald">普及する</div>
                </div>
                <div className="big-statement" style={{ "fontSize": "22px", "marginTop": "28px" }}>このサイクルが<span className="accent-coral">永遠に</span>繰り返される</div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
            <div className="content center-layout">
                <div className="scene-title">不満の連鎖 ── 進化の歴史</div>
                <div className="timeline" style={{ "marginTop": "20px" }}>
                    <div className="tl-item stagger-item"><div className="tl-year">1972</div><div className="tl-dot dot-hl" style={{ "background": "var(--emerald)!important", "borderColor": "var(--emerald-light)" }}></div><div className="tl-name" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "4px" }}><DI name="c" s={20} />C</div><div className="tl-desc">UNIX開発用</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">不満</div><div className="tl-dot" style={{ "background": "var(--coral)" }}></div><div className="tl-name" style={{ "fontSize": "11px", "color": "var(--coral)" }}>構造化不足</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">1983</div><div className="tl-dot dot-hl" style={{ "background": "var(--primary)!important", "borderColor": "var(--primary-light)" }}></div><div className="tl-name" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "4px" }}><DI name="cplusplus" s={20} />C++</div><div className="tl-desc">OOP追加</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">不満</div><div className="tl-dot" style={{ "background": "var(--coral)" }}></div><div className="tl-name" style={{ "fontSize": "11px", "color": "var(--coral)" }}>複雑すぎる</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">2009</div><div className="tl-dot dot-hl" style={{ "background": "var(--sky)!important", "borderColor": "var(--sky-light)" }}></div><div className="tl-name" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "4px" }}><DI name="go" s={20} />Go</div><div className="tl-desc">シンプル＆高速</div></div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-11">
            <div className="content center-layout">
                <div className="scene-title">Go言語 ── コンパイル待ちの怒り</div>
                <div className="two-col" style={{ "marginTop": "18px" }}>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--coral)" }}>
                        <div className="card-badge badge-coral">2007年 Google社内</div>
                        <div className="big-number accent-coral" style={{ "fontSize": "56px" }}>45分</div>
                        <div className="card-note" style={{ "marginTop": "8px" }}>C++のコンパイル待ち時間</div>
                    </div>
                    <div className="col-arrow">→</div>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--sky)" }}>
                        <div className="card-badge badge-sky">2009年 Go誕生</div>
                        <DI name="go" s={48} />
                        <div style={{ "fontSize": "16px", "fontWeight": "700", "marginTop": "8px" }}>Rob Pike &amp; Ken Thompson</div>
                        <div className="card-note" style={{ "marginTop": "8px" }}>「もう自分たちで作ろう」</div>
                    </div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
            <div className="content center-layout">
                <div className="scene-title">不満が生んだ言語たち</div>
                <div className="num-list stagger-item" style={{ "marginTop": "16px" }}>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="swift" s={28} /></div><div><div className="num-title">Objective-C → <span className="accent-orange">Swift</span> (2014)</div><div className="num-desc">Apple：古い構文を一新</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="kotlin" s={28} /></div><div><div className="num-title">Java → <span className="accent-purple">Kotlin</span> (2011)</div><div className="num-desc">JetBrains：冗長性を排除</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="typescript" s={28} /></div><div><div className="num-title">JavaScript → <span className="accent-sky">TypeScript</span> (2012)</div><div className="num-desc">Microsoft：型安全性を追加</div></div></div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-13">
            <div className="content center-layout">
                <div className="big-statement">同じ問題でも<br /><span className="accent-primary">考え方</span>が違えば<br />言葉も違う</div>
                <div style={{ "marginTop": "20px", "fontSize": "var(--fs-body)", "fontWeight": "700" }}>パラダイム ＝ 問題への取り組み方のフレームワーク</div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-14">
            <div className="content center-layout">
                <div className="scene-title">同じ問題、違うアプローチ</div>
                <div style={{ "marginBottom": "8px", "fontSize": "var(--fs-caption)", "fontWeight": "700" }}>問題：1から10までの合計 = <span className="accent-primary">55</span></div>
                <div className="two-col" style={{ "marginTop": "16px" }}>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--orange)" }}>
                        <div className="card-badge badge-orange">手続き型</div>
                        <div style={{ "fontFamily": "monospace", "fontSize": "16px", "textAlign": "left", "lineHeight": "1.8", "marginTop": "8px", "color": "var(--text)" }}>
                            sum = 0<br />
                            for i = 1 to 10:<br />
                            &nbsp;&nbsp;sum = sum + i<br />
                            <span style={{ "color": "var(--text-light)" }}># 10ステップかかる</span>
                        </div>
                    </div>
                    <div className="col-arrow">vs</div>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--emerald)" }}>
                        <div className="card-badge badge-emerald">関数型</div>
                        <div style={{ "fontFamily": "monospace", "fontSize": "16px", "textAlign": "left", "lineHeight": "1.8", "marginTop": "8px", "color": "var(--text)" }}>
                            sum([1..10])<br /><br />
                            <span style={{ "color": "var(--text-light)" }}># たった1行</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
            <div className="content center-layout">
                <div className="scene-title">4つのパラダイム ── 4つの哲学</div>
                <div className="lesson-cards stagger-item" style={{ "marginTop": "18px" }}>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--orange)" }}><DI name="c" s={32} /><div className="lesson-title">手続き型</div><div className="lesson-desc">C / FORTRAN<br />レシピ通りに手順を書く</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--primary)" }}><DI name="java" s={32} /><div className="lesson-title">オブジェクト指向</div><div className="lesson-desc">Java / C++<br />「モノ」で世界を表現</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--emerald)" }}><DI name="haskell" s={32} /><div className="lesson-title">関数型</div><div className="lesson-desc">Haskell / Erlang<br />数学の関数を組み合わせる</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--purple)" }}><div className="lesson-num" style={{ "color": "var(--purple)" }}>🧠</div><div className="lesson-title">論理型</div><div className="lesson-desc">Prolog<br />事実とルールから推論</div></div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-16">
            <div className="content center-layout">
                <div className="scene-title">言語の裏にある「人生哲学」</div>
                <div className="num-list stagger-item" style={{ "marginTop": "16px" }}>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="python" s={28} /></div><div><div className="num-title">Python ── 統一派</div><div className="num-desc">「やり方は1つだけであるべき」</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="perl" s={28} /></div><div><div className="num-title">Perl ── 自由派</div><div className="num-desc">「やり方は何通りもあっていい」</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ "background": "transparent", "border": "none" }}><DI name="ruby" s={28} /></div><div><div className="num-title">Ruby ── 幸福派 🇯🇵</div><div className="num-desc">「プログラマが幸せになる言語を作りたい」── まつもとゆきひろ</div></div></div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
            <div className="content center-layout">
                <div className="scene-title">世界を支配した言語は──</div>
                <div className="two-col" style={{ "marginTop": "20px" }}>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--amber)", "width": "240px" }}>
                        <div className="big-number accent-amber" style={{ "fontSize": "64px" }}>98%</div>
                        <div className="card-note" style={{ "marginTop": "8px" }}>のWebサイトが使用</div>
                    </div>
                    <div className="arch-card stagger-item" style={{ "borderColor": "var(--coral)", "width": "240px" }}>
                        <div className="big-number accent-coral" style={{ "fontSize": "64px" }}>10日</div>
                        <div className="card-note" style={{ "marginTop": "8px" }}>で作られた</div>
                    </div>
                </div>
                <div className="big-statement" style={{ "fontSize": "28px", "marginTop": "20px" }}>その名は <span className="accent-amber">JavaScript</span></div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-18">
            <div className="content center-layout">
                <div className="scene-title">JavaScript ── 10日の突貫工事</div>
                <div className="timeline" style={{ "marginTop": "20px" }}>
                    <div className="tl-item stagger-item"><div className="tl-year">1995</div><div className="tl-dot dot-hl" style={{ "background": "var(--amber)!important", "borderColor": "var(--amber-light)" }}></div><div className="tl-name">LiveScript</div><div className="tl-desc">元の名前</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">改名</div><div className="tl-dot" style={{ "background": "var(--coral)" }}></div><div className="tl-name" style={{ "fontSize": "11px", "color": "var(--coral)" }}>Java人気に便乗</div></div>
                    <div className="tl-item stagger-item"><div className="tl-year">→</div><div className="tl-dot dot-hl" style={{ "background": "var(--amber)!important", "borderColor": "var(--amber-light)" }}></div><div className="tl-name">JavaScript</div><div className="tl-desc">Javaとは別物</div></div>
                </div>
                <div className="quote-block stagger-item" style={{ "marginTop": "20px", "borderLeftColor": "var(--coral)" }}>
                    <div className="quote-body" style={{ "fontSize": "20px" }}><code>typeof null === "object"</code></div>
                    <div className="quote-attr">── 10日で作ったバグ。互換性のため永遠に直せない</div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
            <div className="content center-layout">
                <div className="scene-title">「タイミング」が言語を決める</div>
                <div className="flow-row stagger-item" style={{ "marginTop": "20px" }}>
                    <div className="flow-chip chip-indigo">ブラウザに最初に搭載</div>
                    <div className="flow-connector">→</div>
                    <div className="flow-chip chip-orange">インフラに組み込まれる</div>
                    <div className="flow-connector">→</div>
                    <div className="flow-chip chip-coral">置き換え不可能に</div>
                </div>
                <div className="big-statement" style={{ "fontSize": "22px", "marginTop": "24px" }}>完璧でなくても<br />最初に<span className="accent-primary">場所を確保した者</span>が勝つ</div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-20">
            <div className="content center-layout">
                <div className="scene-title">なぜ700種類以上あるのか？</div>
                <div className="lesson-cards stagger-item" style={{ "marginTop": "20px" }}>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--primary)" }}><div className="lesson-num">①</div><div className="lesson-title">問題の多様性</div><div className="lesson-desc">ハンマー1本では<br />家は建たない</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--coral)" }}><div className="lesson-num" style={{ "color": "var(--coral)" }}>②</div><div className="lesson-title">不満→改良</div><div className="lesson-desc">「もっと良い道具」<br />を求め続ける</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--emerald)" }}><div className="lesson-num" style={{ "color": "var(--emerald)" }}>③</div><div className="lesson-title">パラダイム</div><div className="lesson-desc">問題の見方は<br />1つじゃない</div></div>
                    <div className="lesson-card" style={{ "borderTop": "3px solid var(--amber)" }}><div className="lesson-num" style={{ "color": "var(--amber)" }}>④</div><div className="lesson-title">タイミング</div><div className="lesson-desc">根付いた言語は<br />消えない</div></div>
                </div>
            </div>
        </div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
            <div className="content center-layout">
                <div className="big-statement">700種類は「混乱」ではない<br /><span className="accent-primary">多様性</span>であり<br /><span className="accent-emerald">進化の証</span>である</div>
            </div>
        </div>
    </AbsoluteFill>
);

export const SCENE_COMPONENTS: Record<number, React.FC> = {
    0: Scene0,
    1: Scene1,
    2: Scene2,
    3: Scene3,
    4: Scene4,
    5: Scene5,
    6: Scene6,
    7: Scene7,
    8: Scene8,
    9: Scene9,
    10: Scene10,
    11: Scene11,
    12: Scene12,
    13: Scene13,
    14: Scene14,
    15: Scene15,
    16: Scene16,
    17: Scene17,
    18: Scene18,
    19: Scene19,
    20: Scene20,
    21: Scene21,
};

export const TOTAL_SCENE_COUNT = 22;
