import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-cloud">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" />
        </div>
        <div className="title-large">CSSはプログラミング言語か？</div>
        <div className="big-statement">30年の進化と終わらない論争</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">CSSの存在感</div>
        <div className="two-col">
            <div className="metric-card border-primary">
                <div className="metric-value accent-primary">95%+</div>
                <div className="metric-label">全Webサイトが使用</div>
            </div>
            <div className="metric-card border-teal">
                <div className="metric-value accent-teal">52%</div>
                <div className="metric-label">開発者の使用率（第2位）</div>
            </div>
        </div>
        <div className="source">出典: W3Techs 2025 / Stack Overflow Developer Survey 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">「プログラミング言語」の3つの基準</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <div className="card-title">チューリング完全</div>
                <div className="card-body">条件分岐・繰り返し・<br />メモリ読み書きが可能</div>
            </div>
            <div className="arch-card border-teal">
                <div className="card-title">コンピュータへの指示</div>
                <div className="card-body">機械に対する命令を<br />記述する言語</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge" style={{ background: 'var(--amber)' }}>DSL</div>
                <div className="card-title">ドメイン固有言語</div>
                <div className="card-body">特定領域に特化した<br />プログラミング言語</div>
            </div>
        </div>
        <div className="big-statement">統一された定義は<span className="accent-coral">存在しない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">CSSの30年</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="year-badge">1996</div>
                <div className="fc-node-title">CSS1</div>
                <div className="fc-node-sub">色・フォント</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="year-badge">2012</div>
                <div className="fc-node-title">calc()</div>
                <div className="fc-node-sub">四則演算</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="year-badge">2017</div>
                <div className="fc-node-title">CSS変数</div>
                <div className="fc-node-sub">Custom Properties</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="year-badge">2022</div>
                <div className="fc-node-title">:has()</div>
                <div className="fc-node-sub">条件分岐</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="year-badge">2023</div>
                <div className="fc-node-title">Nesting</div>
                <div className="fc-node-sub">ネスト構文</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">:has() ― CSSの条件分岐</div>
        <div className="code-box">
            <div className="code-head">CSS</div>
            <div className="code-body"><span className="code-comment">/* フォーム内にエラーがあれば枠を赤く */</span>{'\n'}<span className="code-selector">.form:has(input:invalid)</span> {'{'}{'\n'}{'    '}<span className="code-property">border-color</span>: <span className="code-value">red</span>;{'\n'}{'}'}{'\n\n'}<span className="code-comment">/* 画像を含むカードだけレイアウト変更 */</span>{'\n'}<span className="code-selector">.card:has(img)</span> {'{'}{'\n'}{'    '}<span className="code-property">grid-template-rows</span>: <span className="code-value">auto 1fr</span>;{'\n'}{'}'}</div>
        </div>
        <div className="big-statement">JavaScript無しで<span className="accent-primary">条件分岐</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">CSSの「プログラミング的」能力</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <div className="card-title">演算</div>
                <div className="card-body">calc / min / max / clamp</div>
            </div>
            <div className="arch-card border-teal">
                <div className="card-title">変数</div>
                <div className="card-body">Custom Properties</div>
            </div>
            <div className="arch-card border-amber">
                <div className="card-title">条件分岐</div>
                <div className="card-body">@media / :has() / Container Queries</div>
            </div>
        </div>
        <div className="two-col">
            <div className="arch-card border-coral">
                <div className="card-title">繰り返し</div>
                <div className="card-body">nth-child / counter</div>
            </div>
            <div className="arch-card border-primary">
                <div className="card-title">状態管理</div>
                <div className="card-body">:hover / :checked / :focus</div>
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
        <div className="scene-title">CSSにできないこと</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">できる</div>
                <ul className="compare-list">
                    <li>演算・変数・条件分岐</li>
                    <li>繰り返しパターン</li>
                    <li>ビジュアルの状態管理</li>
                </ul>
            </div>
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">できない</div>
                <ul className="compare-list">
                    <li>汎用アルゴリズム</li>
                    <li>関数の定義・再利用</li>
                    <li>ファイル / ネットワーク I/O</li>
                </ul>
            </div>
        </div>
        <div className="big-statement">ビジュアル制御に<span className="accent-primary">特化</span>した言語</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">CSS + HTMLでチューリング完全？</div>
        <div className="svg-diagram">
            <svg width="900" height="260" viewBox="0 0 900 260">
                <rect x="20" y="20" width="250" height="220" rx="12" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" />
                <text x="145" y="70" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="22" fontWeight="900" fill="#1a1d23">CSS + HTML</text>
                <rect x="60" y="100" width="40" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                <rect x="110" y="100" width="40" height="40" rx="6" fill="#2563eb" />
                <rect x="160" y="100" width="40" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                <text x="145" y="175" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="16" fontWeight="700" fill="#1a1d23">チェックボックス</text>
                <text x="145" y="200" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="16" fontWeight="700" fill="#1a1d23">+ :checked</text>
                <text x="370" y="135" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="36" fontWeight="900" fill="#2563eb">→</text>
                <rect x="460" y="20" width="200" height="220" rx="12" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" />
                <text x="560" y="70" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="22" fontWeight="900" fill="#1a1d23">Rule 110</text>
                <text x="560" y="110" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="16" fontWeight="700" fill="#0891b2">セル・オートマトン</text>
                <text x="560" y="145" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="16" fontWeight="700" fill="#1a1d23">チューリング完全</text>
                <text x="560" y="180" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="14" fill="#1a1d23">(Cook, 2004)</text>
                <text x="750" y="135" textAnchor="middle" fontFamily="Zen Maru Gothic" fontSize="18" fontWeight="700" fill="#dc2626">ただしユーザー入力が必要</text>
            </svg>
        </div>
        <div className="big-statement">条件付きで<span className="accent-teal">Yes</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">命令型 vs 宣言型</div>
        <div className="two-col">
            <div className="compare-card border-amber">
                <div className="compare-title accent-amber">命令型（How）</div>
                <div className="compare-body">「どうやるか」を一歩ずつ記述</div>
                <div className="icon-row">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">宣言型（What）</div>
                <div className="compare-body">「何が欲しいか」を記述</div>
                <div className="icon-row">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
                    <div className="text-badge" style={{ background: 'var(--teal)' }}>SQL</div>
                </div>
            </div>
        </div>
        <div className="big-statement"><span className="accent-teal">SQL</span>は宣言型だがプログラミング言語</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">文化的な背景</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">CSSはプログラミング言語じゃない<br />＝ フロントエンドは本物のプログラミングじゃない</div>
            <div className="quote-source">2010年代に見られた風潮</div>
        </div>
        <div className="big-statement">技術の議論と<span className="accent-coral">人の価値</span>を混同しない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">プログラミング言語のスペクトラム</div>
        <div className="flow-chain">
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
                <div className="fc-node-title">HTML</div>
                <div className="fc-node-sub">マークアップ</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
                <div className="fc-node-title">CSS</div>
                <div className="fc-node-sub">宣言的スタイリング</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="text-badge" style={{ background: 'var(--teal)' }}>SQL</div>
                <div className="fc-node-title">SQL</div>
                <div className="fc-node-sub">宣言型DSL</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                <div className="fc-node-title">Python</div>
                <div className="fc-node-sub">汎用言語</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
                <div className="fc-node-title">C</div>
                <div className="fc-node-sub">汎用言語</div>
            </div>
        </div>
        <div className="big-statement">白黒ではなく<span className="accent-primary">グラデーション</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">本当に大切なこと</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-text">「プログラミング言語」に唯一の正解の定義はない</div>
            </div>
            <div className="num-item">
                <div className="num-circle">2</div>
                <div className="num-text">CSSは30年で劇的に進化した ― 変数・演算・条件分岐</div>
            </div>
            <div className="num-item">
                <div className="num-circle">3</div>
                <div className="num-text">大切なのは「何と呼ぶか」ではなく「何ができるか」</div>
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
};

export const TOTAL_SCENE_COUNT = 12;
