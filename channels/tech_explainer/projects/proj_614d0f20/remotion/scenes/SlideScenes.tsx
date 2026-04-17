import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import "./slides.css";

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="svg-diagram">
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/*  */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="var(--primary)" strokeWidth="4"/>
                <circle cx="100" cy="100" r="42" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                {/*  */}
                <g fill="var(--primary)">
                    <rect x="94" y="30" width="12" height="18" rx="3"/>
                    <rect x="94" y="152" width="12" height="18" rx="3"/>
                    <rect x="30" y="94" width="18" height="12" rx="3"/>
                    <rect x="152" y="94" width="18" height="12" rx="3"/>
                    <rect x="48" y="48" width="14" height="12" rx="3" transform="rotate(-45 55 54)"/>
                    <rect x="138" y="48" width="14" height="12" rx="3" transform="rotate(45 145 54)"/>
                    <rect x="48" y="140" width="14" height="12" rx="3" transform="rotate(45 55 146)"/>
                    <rect x="138" y="140" width="14" height="12" rx="3" transform="rotate(-45 145 146)"/>
                </g>
                {/*  */}
                <polyline points="80,105 95,120 125,85" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className="title-large">「アルゴリズム」って<br />結局なんなのか</div>
        <div className="title-sub">手順じゃない。「保証」だ。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">料理のレシピはアルゴリズムか？</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/*  */}
                <rect x="240" y="10" width="300" height="180" rx="12" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="2"/>
                <text x="390" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">レシピ</text>
                <line x1="270" y1="62" x2="510" y2="62" stroke="var(--border)" strokeWidth="1"/>
                <text x="290" y="90" fontSize="18" fontWeight="700" fill="var(--text)">1. 材料を切る</text>
                <text x="290" y="118" fontSize="18" fontWeight="700" fill="var(--text)">2. 塩を<tspan fill="var(--coral)" fontWeight="900">少々</tspan>加える</text>
                <text x="290" y="146" fontSize="18" fontWeight="700" fill="var(--text)">3. <tspan fill="var(--coral)" fontWeight="900">柔らかくなるまで</tspan>煮る</text>
                <text x="290" y="174" fontSize="18" fontWeight="700" fill="var(--text)">4. 盛り付ける</text>
                {/*  */}
                <text x="620" y="120" fontSize="80" fontWeight="900" fill="var(--amber)" opacity="0.6">?</text>
                {/*  */}
                <ellipse cx="130" cy="100" rx="35" ry="22" fill="none" stroke="var(--teal)" strokeWidth="3"/>
                <line x1="130" y1="122" x2="130" y2="200" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round"/>
                <text x="130" y="90" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">塩</text>
                <text x="130" y="110" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">少々?</text>
            </svg>
        </div>
        <div className="big-statement">「手順が書いてあるから<span className="accent-primary">アルゴリズム</span>」<br />...本当にそうだろうか？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">レシピが抱える2つの致命的欠陥</div>
        <div className="svg-diagram">
            <svg width="780" height="230" viewBox="0 0 780 230">
                {/*  */}
                <rect x="30" y="20" width="340" height="190" rx="12" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="200" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">曖昧な指示</text>
                {/*  */}
                <circle cx="120" cy="140" r="40" fill="none" stroke="var(--coral)" strokeWidth="3"/>
                <circle cx="120" cy="140" r="3" fill="var(--coral)"/>
                <line x1="120" y1="140" x2="120" y2="110" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round"/>
                <line x1="120" y1="140" x2="140" y2="150" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round"/>
                <text x="120" y="200" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">いつ終わる?</text>
                {/*  */}
                <text x="280" y="100" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">「塩少々」</text>
                <text x="280" y="130" textAnchor="middle" fontSize="40" fontWeight="900" fill="var(--coral)">???</text>
                <text x="280" y="170" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">何グラム?</text>
                {/*  */}
                <rect x="410" y="20" width="340" height="190" rx="12" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="580" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--teal)">明確な指示</text>
                {/*  */}
                <circle cx="500" cy="140" r="40" fill="none" stroke="var(--teal)" strokeWidth="3"/>
                <circle cx="500" cy="140" r="3" fill="var(--teal)"/>
                <line x1="500" y1="140" x2="500" y2="110" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round"/>
                <line x1="500" y1="140" x2="520" y2="150" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round"/>
                <text x="500" y="200" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">10分間</text>
                {/*  */}
                <text x="660" y="100" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--teal)">「塩3g」</text>
                <text x="660" y="140" textAnchor="middle" fontSize="36" fontWeight="900" fill="var(--teal)">3g</text>
                <text x="660" y="170" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">明確!</text>
            </svg>
        </div>
        <div className="big-statement"><span className="accent-coral">「いつ終わるか分からない」</span>と<span className="accent-coral">「人によって違う」</span><br />この2点がレシピとアルゴリズムを分ける壁</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="photo-text-row">
            <figure className="photo-frame">
                <img src={staticFile("images/proj_614d0f20/knuth.jpg")} alt="ドナルド・クヌース" />
            </figure>
            <div className="photo-text-side">
                <div className="scene-title">クヌースの5条件</div>
                <div className="svg-diagram">
                    <svg width="520" height="240" viewBox="0 0 520 240">
                        {/*  */}
                        <g>
                            <rect x="10" y="5" width="500" height="40" rx="6" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                            <circle cx="35" cy="25" r="12" fill="var(--primary)"/>
                            <text x="35" y="30" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">1</text>
                            <text x="60" y="30" fontSize="18" fontWeight="900" fill="var(--text)">有限性 ─ 必ず有限回で終了する</text>
                        </g>
                        <g>
                            <rect x="10" y="52" width="500" height="40" rx="6" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                            <circle cx="35" cy="72" r="12" fill="var(--primary)"/>
                            <text x="35" y="77" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">2</text>
                            <text x="60" y="77" fontSize="18" fontWeight="900" fill="var(--text)">明確性 ─ 各ステップが曖昧さなく定義</text>
                        </g>
                        <g>
                            <rect x="10" y="99" width="500" height="40" rx="6" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                            <circle cx="35" cy="119" r="12" fill="var(--teal)"/>
                            <text x="35" y="124" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">3</text>
                            <text x="60" y="124" fontSize="18" fontWeight="900" fill="var(--text)">入力 ─ 0個以上の入力を受け取る</text>
                        </g>
                        <g>
                            <rect x="10" y="146" width="500" height="40" rx="6" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                            <circle cx="35" cy="166" r="12" fill="var(--teal)"/>
                            <text x="35" y="171" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">4</text>
                            <text x="60" y="171" fontSize="18" fontWeight="900" fill="var(--text)">出力 ─ 1個以上の結果を返す</text>
                        </g>
                        <g>
                            <rect x="10" y="193" width="500" height="40" rx="6" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="2"/>
                            <circle cx="35" cy="213" r="12" fill="var(--amber)"/>
                            <text x="35" y="218" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">5</text>
                            <text x="60" y="218" fontSize="18" fontWeight="900" fill="var(--text)">有効性 ─ 紙と鉛筆で実行可能</text>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <div className="source">出典: Donald Knuth『The Art of Computer Programming』Vol.1（累計100万部超）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">明確性と有効性</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">レシピの例</div>
                <div className="compare-body">
                    「<span className="accent-coral">塩少々</span>加える」<br />
                    → 人によって量が変わる<br /><br />
                    「<span className="accent-coral">柔らかくなるまで</span>煮る」<br />
                    → 終了条件が不明確
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">アルゴリズムなら</div>
                <div className="compare-body">
                    「<span className="accent-teal">塩を3g</span>加える」<br />
                    → 誰がやっても同じ<br /><br />
                    「<span className="accent-teal">10分間</span>加熱する」<br />
                    → 必ず終了する
                </div>
            </div>
        </div>
        <div className="big-statement">アルゴリズムは<span className="accent-primary">コンピュータのためのもの</span>ではない<br />紙と鉛筆で人間にも実行できることが条件</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">道案内で考えるアルゴリズム</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/*  */}
                <text x="190" y="25" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">曖昧な道案内</text>
                {/*  */}
                <rect x="50" y="50" width="80" height="40" rx="6" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="90" y="75" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">駅</text>
                {/*  */}
                <path d="M135 70 C200 70 180 120 240 100 S280 140 320 130" fill="none" stroke="var(--coral)" strokeWidth="3" strokeDasharray="8 4"/>
                <text x="230" y="90" fontSize="18" fontWeight="700" fill="var(--coral)">なんとなく右…</text>
                {/*  */}
                <circle cx="340" cy="130" r="14" fill="var(--coral)"/>
                <path d="M320 148 C320 137 360 137 360 148 L360 160 Q340 168 320 160 Z" fill="var(--coral)"/>
                <text x="340" y="195" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">迷子!</text>
                {/*  */}
                <text x="590" y="25" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--teal)">明確な道案内</text>
                {/*  */}
                <rect x="440" y="50" width="80" height="40" rx="6" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="480" y="75" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">北口</text>
                {/*  */}
                <line x1="525" y1="70" x2="580" y2="70" stroke="var(--teal)" strokeWidth="3"/>
                <text x="553" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--teal)">右50m</text>
                <line x1="585" y1="70" x2="585" y2="130" stroke="var(--teal)" strokeWidth="3"/>
                {/*  */}
                <circle cx="585" cy="70" r="4" fill="var(--teal)"/>
                <text x="610" y="105" fontSize="18" fontWeight="700" fill="var(--teal)">3つ目</text>
                <line x1="585" y1="135" x2="680" y2="135" stroke="var(--teal)" strokeWidth="3"/>
                <text x="630" y="125" fontSize="18" fontWeight="700" fill="var(--teal)">左折</text>
                {/*  */}
                <rect x="685" y="115" width="70" height="40" rx="6" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="720" y="140" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">到着!</text>
                {/*  */}
                <line x1="720" y1="160" x2="720" y2="200" stroke="var(--teal)" strokeWidth="2"/>
                <polygon points="720,160 750,170 720,180" fill="var(--teal)"/>
            </svg>
        </div>
        <div className="big-statement">アルゴリズムの本質は「手順」ではなく<span className="accent-primary">「保証」</span><br />ステップが有限・指示が明確・<span className="accent-teal">必ず目的地に着く</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">100万件を並べ替える</div>
        <div className="big-statement">素朴な方法「<span className="accent-coral">バブルソート</span>」</div>
        <div className="svg-diagram">
            <svg width="780" height="180" viewBox="0 0 780 180">
                {/*  */}
                <g>
                    <rect x="60" y="30" width="60" height="60" rx="8" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                    <text x="90" y="68" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--coral)">8</text>
                    <rect x="140" y="30" width="60" height="60" rx="8" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                    <text x="170" y="68" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--coral)">3</text>
                    {/*  */}
                    <path d="M100 95 C100 115 160 115 160 95" fill="none" stroke="var(--coral)" strokeWidth="2" marker-end="url(#arrCoral)"/>
                    <path d="M160 95 C160 115 100 115 100 95" fill="none" stroke="var(--coral)" strokeWidth="2" marker-start="url(#arrCoralL)"/>
                    <text x="130" y="135" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">交換!</text>
                </g>
                <defs>
                    <marker id="arrCoral" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--coral)"/></marker>
                    <marker id="arrCoralL" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M10 0L0 5L10 10Z" fill="var(--coral)"/></marker>
                </defs>
                {/*  */}
                <rect x="220" y="30" width="60" height="60" rx="8" fill="var(--primary-light)" stroke="var(--border)" strokeWidth="2"/>
                <text x="250" y="68" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--text)">5</text>
                <rect x="300" y="30" width="60" height="60" rx="8" fill="var(--primary-light)" stroke="var(--border)" strokeWidth="2"/>
                <text x="330" y="68" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--text)">1</text>
                <rect x="380" y="30" width="60" height="60" rx="8" fill="var(--primary-light)" stroke="var(--border)" strokeWidth="2"/>
                <text x="410" y="68" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--text)">7</text>
                {/*  */}
                <text x="490" y="68" fontSize="30" fontWeight="900" fill="var(--border)">...</text>
                {/*  */}
                <rect x="560" y="20" width="180" height="140" rx="8" fill="none" stroke="var(--amber)" strokeWidth="2"/>
                <text x="650" y="55" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--amber)">本棚の整理</text>
                <rect x="580" y="70" width="20" height="70" rx="2" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="1"/>
                <rect x="608" y="80" width="20" height="60" rx="2" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="1"/>
                <rect x="636" y="60" width="20" height="80" rx="2" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="1"/>
                <rect x="664" y="75" width="20" height="65" rx="2" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="1"/>
                <rect x="692" y="90" width="20" height="50" rx="2" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="1"/>
                <text x="650" y="165" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--amber)">行ったり来たり...</text>
            </svg>
        </div>
        <div className="big-statement">隣同士を比べて大きい方を後ろへ送る<br /><span className="accent-coral">力ずくの全チェック</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">同じ問題、違うアルゴリズム</div>
        <div className="svg-diagram">
            <svg width="860" height="340" viewBox="0 0 860 340">
                {/* バブルソート側 */}
                <rect x="20" y="20" width="350" height="200" rx="16" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2.5"/>
                <text x="195" y="58" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--coral)">バブルソート</text>
                <text x="195" y="110" textAnchor="middle" fontSize="56" fontWeight="900" fill="var(--coral)">1兆回</text>
                <text x="195" y="148" textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--coral)" opacity="0.8">O(n²) の比較回数</text>
                {/* バー（長い） */}
                <rect x="40" y="170" width="310" height="28" rx="14" fill="var(--coral)" opacity="0.35"/>
                <rect x="40" y="170" width="310" height="28" rx="14" fill="var(--coral)" opacity="0.7"/>

                {/* VS */}
                <text x="430" y="135" textAnchor="middle" fontSize="40" fontWeight="900" fill="var(--text)" opacity="0.5">VS</text>

                {/* クイックソート側 */}
                <rect x="490" y="20" width="350" height="200" rx="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2.5"/>
                <text x="665" y="58" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--teal)">クイックソート</text>
                <text x="665" y="110" textAnchor="middle" fontSize="56" fontWeight="900" fill="var(--teal)">2000万回</text>
                <text x="665" y="148" textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--teal)" opacity="0.8">O(n log n) の比較回数</text>
                {/* バー（短い＝速い） */}
                <rect x="510" y="170" width="310" height="28" rx="14" fill="var(--teal)" opacity="0.15"/>
                <rect x="510" y="170" width="6" height="28" rx="3" fill="var(--teal)" opacity="0.9"/>

                {/* 差分ハイライト */}
                <rect x="220" y="250" width="420" height="72" rx="16" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="2.5"/>
                <text x="430" y="280" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">100万件のデータで</text>
                <text x="430" y="310" textAnchor="middle" fontSize="32" fontWeight="900" fill="var(--amber)">約 50,000 倍の差</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">ハードウェア vs アルゴリズム</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/*  */}
                <rect x="30" y="30" width="320" height="180" rx="12" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="190" y="65" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">世界最速スパコン</text>
                {/*  */}
                <rect x="80" y="80" width="80" height="100" rx="4" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="2"/>
                <line x1="85" y1="100" x2="155" y2="100" stroke="var(--coral)" strokeWidth="1"/>
                <line x1="85" y1="120" x2="155" y2="120" stroke="var(--coral)" strokeWidth="1"/>
                <line x1="85" y1="140" x2="155" y2="140" stroke="var(--coral)" strokeWidth="1"/>
                <line x1="85" y1="160" x2="155" y2="160" stroke="var(--coral)" strokeWidth="1"/>
                <circle cx="100" cy="90" r="3" fill="var(--coral)"/>
                <circle cx="100" cy="110" r="3" fill="var(--coral)"/>
                <circle cx="100" cy="130" r="3" fill="var(--coral)"/>
                <circle cx="100" cy="150" r="3" fill="var(--coral)"/>
                <circle cx="100" cy="170" r="3" fill="var(--coral)"/>
                <text x="250" y="115" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">バブルソート</text>
                <text x="250" y="145" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">O(n&sup2;)</text>
                <text x="250" y="175" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">遅い...</text>
                {/*  */}
                <text x="390" y="135" textAnchor="middle" fontSize="36" fontWeight="900" fill="var(--primary)">VS</text>
                {/*  */}
                <rect x="430" y="30" width="320" height="180" rx="12" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="590" y="65" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--teal)">普通のノートPC</text>
                {/*  */}
                <rect x="480" y="85" width="80" height="55" rx="4" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="2"/>
                <rect x="470" y="145" width="100" height="8" rx="4" fill="var(--teal)" opacity="0.5"/>
                <text x="650" y="115" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--teal)">クイックソート</text>
                <text x="650" y="145" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">O(n log n)</text>
                <text x="650" y="175" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">勝利!</text>
            </svg>
        </div>
        <div className="big-statement"><span className="accent-teal">ノートPC</span>が<span className="accent-coral">スパコン</span>に勝つ ── 「<span className="accent-primary">どう計算するか</span>」が鍵</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">O記法 ── 計算量の増え方</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/*  */}
                <line x1="80" y1="220" x2="740" y2="220" stroke="var(--text)" strokeWidth="2"/>
                <line x1="80" y1="220" x2="80" y2="20" stroke="var(--text)" strokeWidth="2"/>
                <text x="420" y="240" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">データ量 n</text>
                <text x="40" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)" transform="rotate(-90 40 120)">計算量</text>
                {/*  */}
                <path d="M80 220 Q200 215 300 180 Q400 120 480 40" fill="none" stroke="var(--coral)" strokeWidth="4"/>
                <text x="490" y="38" fontSize="20" fontWeight="900" fill="var(--coral)">O(n&sup2;)</text>
                <text x="490" y="60" fontSize="18" fontWeight="700" fill="var(--coral)">10倍 → 100倍</text>
                {/*  */}
                <path d="M80 220 Q200 210 350 185 Q500 165 700 140" fill="none" stroke="var(--teal)" strokeWidth="4"/>
                <text x="710" y="138" fontSize="20" fontWeight="900" fill="var(--teal)">O(n log n)</text>
                <text x="710" y="160" fontSize="18" fontWeight="700" fill="var(--teal)">10倍 → 13倍</text>
                {/*  */}
                <path d="M300 180 Q400 120 480 40 L700 140 Q500 165 350 185 Z" fill="var(--amber)" opacity="0.1"/>
                <text x="500" y="110" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--amber)">差は拡大し続ける</text>
            </svg>
        </div>
        <div className="big-statement">データが増えるほど<span className="accent-coral">アルゴリズムの差</span>がハードの差を飲み込む</div>
        <div className="source">注: O記法は定数倍を無視する。データが少ないときはバブルソートが速い場合もある（ノーフリーランチ定理）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">アルゴリズム 4000年の歴史</div>
        <div className="flow-chain">
            <div className="fc-node highlight border-amber">
                <div className="fc-node-title"><span className="year-badge">BC 1600</span></div>
                <div className="fc-node-sub">バビロニア<br />平方根の手順</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-amber">
                <div className="fc-node-title"><span className="year-badge">BC 300</span></div>
                <div className="fc-node-sub">ユークリッド<br />互除法</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-amber">
                <div className="fc-node-title"><span className="year-badge">9世紀</span></div>
                <div className="fc-node-sub">アル＝フワーリズミー<br />語源の人</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-primary">
                <div className="fc-node-title"><span className="year-badge">1936</span></div>
                <div className="fc-node-sub">チューリング<br />数学的定義</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-teal">
                <div className="fc-node-title"><span className="year-badge">現代</span></div>
                <div className="fc-node-sub">AI・検索・暗号<br />あらゆる場所に</div>
            </div>
        </div>
        <div className="big-statement">アルゴリズムは<span className="accent-amber">コンピュータより遥かに古い</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">古代のアルゴリズム</div>
        <div className="two-col">
            <div className="compare-card border-amber">
                <div className="compare-title accent-amber">バビロニアの粘土板</div>
                <div className="svg-diagram">
                    <svg width="200" height="140" viewBox="0 0 200 140">
                        {/*  */}
                        <rect x="20" y="10" width="160" height="120" rx="8" fill="#e8dcc8" stroke="var(--amber)" strokeWidth="2"/>
                        {/*  */}
                        <g fill="var(--amber)" opacity="0.8">
                            <polygon points="50,30 60,35 50,40"/>
                            <polygon points="70,30 80,35 70,40"/>
                            <polygon points="90,30 100,35 90,40"/>
                            <line x1="110" y1="30" x2="130" y2="40" stroke="var(--amber)" strokeWidth="2"/>
                            <polygon points="50,55 60,60 50,65"/>
                            <polygon points="70,55 80,60 70,65"/>
                            <line x1="90" y1="55" x2="110" y2="65" stroke="var(--amber)" strokeWidth="2"/>
                            <polygon points="50,80 60,85 50,90"/>
                            <line x1="70" y1="80" x2="90" y2="90" stroke="var(--amber)" strokeWidth="2"/>
                            <polygon points="100,80 110,85 100,90"/>
                        </g>
                        <text x="100" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--amber)">&#8730; 平方根</text>
                    </svg>
                </div>
                <div className="compare-body">
                    紀元前1600年<br />
                    60進法・小数点以下6桁<br />
                    手のひらサイズ
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">ユークリッドの互除法</div>
                <div className="svg-diagram">
                    <svg width="200" height="140" viewBox="0 0 200 140">
                        {/*  */}
                        <text x="100" y="30" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">GCD(48, 18)</text>
                        <text x="100" y="55" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">48 = 18 × 2 + 12</text>
                        <text x="100" y="78" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">18 = 12 × 1 + 6</text>
                        <text x="100" y="101" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">12 = 6 × 2 + 0</text>
                        <text x="100" y="130" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--teal)">答え: 6</text>
                    </svg>
                </div>
                <div className="compare-body">
                    紀元前300年<br />
                    「全アルゴリズムの祖父」<br />
                    現代の暗号技術の基礎
                </div>
            </div>
        </div>
        <div className="source">出典: Knuth "The Art of Computer Programming" Vol.1 / YBC 7289（イェール大学蔵）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="photo-text-row">
            <figure className="photo-frame">
                <img src={staticFile("images/proj_614d0f20/khwarizmi.jpg")} alt="アル＝フワーリズミー像" />
            </figure>
            <div className="photo-text-side">
                <div className="scene-title" style={{whiteSpace:'nowrap'}}><span className="year-badge">9世紀</span> アル＝フワーリズミー</div>
                <div className="big-statement">
                    ラテン語名 <span className="accent-primary">Algoritmi</span> が<br />
                    「アルゴリズム」の語源
                </div>
                <div className="tag-row">
                    <span className="tag"><span className="accent-primary">Algorithm</span> の語源</span>
                    <span className="tag"><span className="accent-amber">Algebra</span> の語源</span>
                </div>
            </div>
        </div>
        <div className="source">当時のイスラム圏の数学文化全体の成果でもある</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="photo-text-row">
            <figure className="photo-frame">
                <img src={staticFile("images/proj_614d0f20/turing.jpg")} alt="アラン・チューリング" />
            </figure>
            <div className="photo-text-side">
                <div className="scene-title">1936年 ── 最大の転換点</div>
                <div className="big-statement">
                    アラン・チューリングが<br />
                    「<span className="accent-primary">アルゴリズムとは何か</span>」を<br />
                    数学的に厳密に定義した
                </div>
            </div>
        </div>
        <div className="svg-diagram">
            <svg width="780" height="140" viewBox="0 0 780 140">
                {/*  */}
                {/*  */}
                <rect x="40" y="20" width="700" height="50" rx="4" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                {/*  */}
                <line x1="140" y1="20" x2="140" y2="70" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
                <line x1="240" y1="20" x2="240" y2="70" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
                <line x1="340" y1="20" x2="340" y2="70" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
                <line x1="440" y1="20" x2="440" y2="70" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
                <line x1="540" y1="20" x2="540" y2="70" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
                <line x1="640" y1="20" x2="640" y2="70" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
                {/*  */}
                <text x="90" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">0</text>
                <text x="190" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">1</text>
                <text x="290" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">1</text>
                <text x="390" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--coral)">0</text>
                <text x="490" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">1</text>
                <text x="590" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">0</text>
                <text x="690" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">...</text>
                {/*  */}
                <text x="20" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--primary)">...</text>
                {/*  */}
                <polygon points="370,75 390,95 410,75" fill="var(--coral)"/>
                <rect x="360" y="95" width="60" height="35" rx="6" fill="var(--coral)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="390" y="118" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff">HEAD</text>
            </svg>
        </div>
        <div className="source">Turing, A. M. (1936). On Computable Numbers</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">チューリングが証明した衝撃の事実</div>
        <div className="big-statement">
            「どんなアルゴリズムでも<br />
            <span className="accent-coral">絶対に解けない問題</span>が存在する」
        </div>
        <div className="metric-card border-coral">
            <div className="metric-label">停止問題（Halting Problem）</div>
            <div className="metric-value accent-coral">解けない</div>
            <div className="metric-sub">あるプログラムが終了するか永遠に動き続けるかを判定する問題</div>
        </div>
        <div className="big-statement">コンピュータの性能が上がっても<br /><span className="accent-coral">原理的に不可能</span> ── 数学的証明</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">停止問題の構造</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/*  */}
                <rect x="40" y="60" width="140" height="60" rx="10" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="3"/>
                <text x="110" y="85" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--primary)">プログラムP</text>
                <text x="110" y="108" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">+ 入力</text>
                {/*  */}
                <line x1="185" y1="90" x2="270" y2="90" stroke="var(--primary)" strokeWidth="3" marker-end="url(#arrBlue)"/>
                <defs><marker id="arrBlue" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--primary)"/></marker></defs>
                {/*  */}
                <rect x="275" y="50" width="180" height="80" rx="10" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="3"/>
                <text x="365" y="80" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--amber)">判定器 H</text>
                <text x="365" y="105" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--amber)">（存在すると仮定）</text>
                {/*  */}
                <line x1="460" y1="70" x2="560" y2="40" stroke="var(--teal)" strokeWidth="3" marker-end="url(#arrTeal)"/>
                <line x1="460" y1="110" x2="560" y2="160" stroke="var(--coral)" strokeWidth="3" marker-end="url(#arrRed)"/>
                <defs>
                    <marker id="arrTeal" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--teal)"/></marker>
                    <marker id="arrRed" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--coral)"/></marker>
                </defs>
                {/*  */}
                <rect x="565" y="15" width="120" height="50" rx="8" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="625" y="45" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--teal)">停止する</text>
                {/*  */}
                <rect x="565" y="140" width="140" height="50" rx="8" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="635" y="170" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">停止しない</text>
                {/*  */}
                <path d="M625 65 L625 105 C625 130 700 130 700 105 L700 65" fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 3"/>
                <text x="665" y="100" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">∞?</text>
                {/*  */}
                <text x="390" y="180" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--coral)">事前に判定できるか?</text>
                <text x="390" y="215" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--text)">→ 原理的に不可能</text>
            </svg>
        </div>
        <div className="big-statement">無限ループしないか<span className="accent-coral">事前に判定する方法</span>は存在しない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">背理法による証明</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/*  */}
                <rect x="280" y="5" width="220" height="40" rx="8" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="2"/>
                <text x="390" y="30" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--amber)">仮定: H が存在する</text>
                {/*  */}
                <line x1="390" y1="48" x2="390" y2="65" stroke="var(--text)" strokeWidth="2" marker-end="url(#arrBlk)"/>
                <defs><marker id="arrBlk" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--text)"/></marker></defs>
                {/*  */}
                <rect x="280" y="68" width="220" height="40" rx="8" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="390" y="93" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--primary)">D = H を使ったプログラム</text>
                {/*  */}
                <line x1="310" y1="112" x2="180" y2="145" stroke="var(--teal)" strokeWidth="2" marker-end="url(#arrTeal2)"/>
                <line x1="470" y1="112" x2="600" y2="145" stroke="var(--coral)" strokeWidth="2" marker-end="url(#arrRed2)"/>
                <defs>
                    <marker id="arrTeal2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--teal)"/></marker>
                    <marker id="arrRed2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--coral)"/></marker>
                </defs>
                {/*  */}
                <rect x="60" y="148" width="240" height="35" rx="6" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="180" y="171" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--teal)">H「停止する」と判定</text>
                <line x1="180" y1="186" x2="180" y2="205" stroke="var(--teal)" strokeWidth="2" marker-end="url(#arrTeal2)"/>
                <rect x="80" y="208" width="200" height="30" rx="6" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="180" y="228" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">D → 無限ループ!</text>
                {/*  */}
                <rect x="480" y="148" width="240" height="35" rx="6" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="600" y="171" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--coral)">H「停止しない」と判定</text>
                <line x1="600" y1="186" x2="600" y2="205" stroke="var(--coral)" strokeWidth="2" marker-end="url(#arrRed2)"/>
                <rect x="490" y="208" width="220" height="30" rx="6" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="600" y="228" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">D → 即座に停止!</text>
                {/*  */}
                <text x="390" y="175" textAnchor="middle" fontSize="28" fontWeight="900" fill="var(--coral)">矛盾!</text>
            </svg>
        </div>
        <div className="big-statement">どちらの場合もHの判定と<span className="accent-coral">矛盾</span>する<br />→ <span className="accent-primary">H は存在できない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">P ≠ NP 問題</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">P（簡単に解ける）</div>
                <div className="compare-body">
                    答えを<span className="accent-teal">見つける</span>のも<br />
                    確認するのも簡単
                </div>
            </div>
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">NP（確認は簡単）</div>
                <div className="compare-body">
                    答えが正しいか<span className="accent-teal">確認</span>は簡単<br />
                    でも見つけるのは<span className="accent-coral">激ムズ</span>
                </div>
            </div>
        </div>
        <div className="metric-card border-amber">
            <div className="metric-label">クレイ数学研究所 ミレニアム懸賞問題</div>
            <div className="metric-value accent-amber">$1,000,000</div>
            <div className="metric-sub">証明できれば100万ドルの懸賞金</div>
        </div>
        <div className="source">研究者の88%がP≠NPだと信じているが、誰も証明できていない（Gasarch 2019 調査）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">限界があるからこそ価値がある</div>
        <div className="big-statement">
            「解けないこと」を<span className="accent-teal">逆手に取る</span>発想
        </div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <div className="compare-title accent-primary">RSA暗号</div>
                <div className="compare-body">
                    素因数分解の<span className="accent-coral">困難さ</span>で<br />
                    <span className="accent-teal">安全性を確保</span>
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">限界を知ること</div>
                <div className="compare-body">
                    解けない範囲を知れば<br />
                    <span className="accent-primary">できることの輪郭</span>が見える
                </div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">毎日アルゴリズムに囲まれている</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" />
                <div className="card-title">Google検索</div>
                <div className="card-body">PageRankアルゴリズムで<br />最適な検索結果を表示</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://api.iconify.design/mdi/map-marker-path.svg?color=%230d9488&width=48&height=48" alt="GPS" />
                <div className="card-title">GPSナビ</div>
                <div className="card-body">ダイクストラ法で<br />最短経路を計算</div>
            </div>
            <div className="arch-card border-amber">
                <img src="https://api.iconify.design/mdi/video-outline.svg?color=%23d97706&width=48&height=48" alt="動画" />
                <div className="card-title">動画のおすすめ</div>
                <div className="card-body">推薦アルゴリズムで<br />次に見る動画を提案</div>
            </div>
            <div className="arch-card border-coral">
                <img src="https://api.iconify.design/mdi/lock-outline.svg?color=%23dc2626&width=48&height=48" alt="暗号" />
                <div className="card-title">暗号・セキュリティ</div>
                <div className="card-body">RSA・AESなど<br />通信を守るアルゴリズム</div>
            </div>
        </div>
        <div className="big-statement">スマホを開くたびに<span className="accent-primary">アルゴリズム</span>のお世話になっている</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">アルゴリズムの光と影</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">光</div>
                <div className="compare-body">
                    医療診断の精度向上<br />
                    渋滞の最適化<br />
                    科学研究の加速
                </div>
            </div>
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">影</div>
                <div className="compare-body">
                    犯罪予測AIが人種で偏った判定<br /><br />
                    <span className="accent-coral">データに偏り</span>があると<br />
                    差別的な結果を生む
                </div>
            </div>
        </div>
        <div className="big-statement">仕組みを理解せず<span className="accent-coral">ブラックボックスのまま使うのは危険</span></div>
        <div className="source">出典: ProPublica "Machine Bias" (2016) - COMPAS 再犯予測アルゴリズムの偏り報告</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">最初の問いに戻る</div>
        <div className="big-statement">
            料理のレシピはアルゴリズムか？ → <span className="accent-coral">No</span>
        </div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">
                アルゴリズムとはただの手順ではない。<br />
                <span className="accent-primary">「保証」</span>こそがアルゴリズムの本質。
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="photo-text-row">
            <figure className="photo-frame">
                <img src={staticFile("images/proj_614d0f20/dijkstra.jpg")} alt="ダイクストラ" />
            </figure>
            <div className="photo-text-side">
                <div className="scene-title">アルゴリズムを学ぶ意味</div>
                <div className="quote-block">
                    <div className="quote-mark">"</div>
                    <div className="quote-body">
                        単純さは偉大な美徳だが、<br />
                        それを達成するには<span className="accent-primary">努力</span>が必要だ
                    </div>
                    <div className="quote-source">── エドガー・ダイクストラ</div>
                </div>
            </div>
        </div>
        <div className="big-statement">
            アルゴリズム的思考は<span className="accent-primary">専門家だけのもの</span>ではなくなった
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <div className="svg-diagram">
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="60" fill="none" stroke="var(--primary)" strokeWidth="4"/>
                <circle cx="100" cy="100" r="42" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <g fill="var(--primary)">
                    <rect x="94" y="30" width="12" height="18" rx="3"/>
                    <rect x="94" y="152" width="12" height="18" rx="3"/>
                    <rect x="30" y="94" width="18" height="12" rx="3"/>
                    <rect x="152" y="94" width="18" height="12" rx="3"/>
                </g>
                <polyline points="80,105 95,120 125,85" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className="title-large">ご視聴ありがとうございました</div>
        <div className="enterprise-grid">
            <div className="enterprise-card border-primary">
                <div className="card-title">チャンネル登録</div>
                <div className="card-body">次回もお楽しみに</div>
            </div>
            <div className="enterprise-card border-teal">
                <div className="card-title">高評価</div>
                <div className="card-body">励みになります</div>
            </div>
            <div className="enterprise-card border-amber">
                <div className="card-title">コメント</div>
                <div className="card-body">感想お待ちしています</div>
            </div>
            <div className="enterprise-card border-coral">
                <div className="card-title">共有</div>
                <div className="card-body">友達にもシェア</div>
            </div>
        </div>
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
    22: Scene22,
    23: Scene23,
};

export const TOTAL_SCENE_COUNT = 24;
