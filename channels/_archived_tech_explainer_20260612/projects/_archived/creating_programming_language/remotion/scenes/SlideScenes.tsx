import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="icon-cloud">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" />
    </div>
    <div className="content center-layout">
        <div className="title-large">新しいプログラミング言語を<br />作るってどうやるの？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">世界のプログラミング言語</div>
        <div className="metric-card">
            <div className="metric-value">8,945<span style={{ fontSize: '48px' }}>+</span></div>
            <div className="metric-label">HOPLデータベース登録言語数</div>
            <div className="metric-sub">実用されているのは上位50言語程度</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">コンパイルパイプライン</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">ソースコード</div>
                <div className="fc-node-sub">テキスト</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">字句解析</div>
                <div className="fc-node-sub">Lexer</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">構文解析</div>
                <div className="fc-node-sub">Parser</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">意味解析</div>
                <div className="fc-node-sub">型チェック</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">コード生成</div>
                <div className="fc-node-sub">機械語</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">字句解析（Lexer）</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 720 300" width="720" height="300">
                <rect x="160" y="20" width="400" height="56" rx="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
                <text x="360" y="56" textAnchor="middle" fontSize="26" fontWeight="700" fill="#1a1d23">x = 10 + 20</text>
                <text x="360" y="112" textAnchor="middle" fontSize="22" fill="#4f46e5" fontWeight="700">↓ トークンに分解</text>
                <rect x="10" y="150" width="120" height="50" rx="8" fill="#ffffff" stroke="#4f46e5" strokeWidth="2"/>
                <text x="70" y="182" textAnchor="middle" fontSize="18" fontWeight="700" fill="#4f46e5">変数: x</text>
                <rect x="150" y="150" width="120" height="50" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="2"/>
                <text x="210" y="182" textAnchor="middle" fontSize="18" fontWeight="700" fill="#059669">演算: =</text>
                <rect x="290" y="150" width="120" height="50" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="2"/>
                <text x="350" y="182" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">数値: 10</text>
                <rect x="430" y="150" width="120" height="50" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="2"/>
                <text x="490" y="182" textAnchor="middle" fontSize="18" fontWeight="700" fill="#059669">演算: +</text>
                <rect x="570" y="150" width="120" height="50" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="2"/>
                <text x="630" y="182" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">数値: 20</text>
                <text x="360" y="260" textAnchor="middle" fontSize="16" fill="#1a1d23" fontWeight="700">空白やコメントはこの段階で除去される</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">抽象構文木（AST）</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 800 380" width="800" height="380">
                <line x1="400" y1="60" x2="200" y2="160" stroke="#d1d5db" strokeWidth="3"/>
                <line x1="400" y1="60" x2="600" y2="160" stroke="#d1d5db" strokeWidth="3"/>
                <line x1="600" y1="190" x2="480" y2="290" stroke="#d1d5db" strokeWidth="3"/>
                <line x1="600" y1="190" x2="720" y2="290" stroke="#d1d5db" strokeWidth="3"/>
                <rect x="330" y="20" width="140" height="56" rx="12" fill="#4f46e5"/>
                <text x="400" y="56" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ffffff">代入 =</text>
                <rect x="130" y="140" width="140" height="56" rx="12" fill="#059669"/>
                <text x="200" y="176" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ffffff">変数 x</text>
                <rect x="530" y="140" width="140" height="56" rx="12" fill="#d97706"/>
                <text x="600" y="176" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ffffff">加算 +</text>
                <rect x="410" y="270" width="140" height="56" rx="12" fill="#ffffff" stroke="#d97706" strokeWidth="2"/>
                <text x="480" y="306" textAnchor="middle" fontSize="24" fontWeight="700" fill="#d97706">10</text>
                <rect x="650" y="270" width="140" height="56" rx="12" fill="#ffffff" stroke="#d97706" strokeWidth="2"/>
                <text x="720" y="306" textAnchor="middle" fontSize="24" fontWeight="700" fill="#d97706">20</text>
            </svg>
        </div>
        <div className="big-statement" style={{ fontSize: '24px' }}>プログラムの論理構造を木の形で表現する</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">コンパイラ vs インタプリタ</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <div className="compare-title accent-primary">コンパイラ = 翻訳者</div>
                <ul className="compare-list">
                    <li>プログラム全体を事前に変換</li>
                    <li>実行速度が高速</li>
                    <li>変換に時間がかかる</li>
                </ul>
                <div className="icon-row" style={{ marginTop: '16px' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" width="36" height="36" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="36" height="36" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" width="36" height="36" />
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">インタプリタ = 同時通訳者</div>
                <ul className="compare-list">
                    <li>1行ずつその場で実行</li>
                    <li>すぐに実行できる</li>
                    <li>毎回通訳するため低速</li>
                </ul>
                <div className="icon-row" style={{ marginTop: '16px' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="36" height="36" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg" width="36" height="36" />
                </div>
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
        <div className="scene-title">現代のハイブリッド方式</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
                <div className="card-title">バイトコード+VM</div>
                <div className="card-body">中間コードに変換して<br />仮想マシンで実行</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
                <div className="card-title">JITコンパイル</div>
                <div className="card-body">実行中に頻出部分を<br />機械語に変換</div>
            </div>
            <div className="arch-card border-amber">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
                <div className="card-title">トランスパイル</div>
                <div className="card-body">ある言語を<br />別の言語に変換</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">言語設計の3大決断</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <div className="card-title">型システム</div>
                <div className="card-body">データの種類を<br />いつチェックするか</div>
            </div>
            <div className="arch-card border-teal">
                <div className="card-title">パラダイム</div>
                <div className="card-body">プログラムの<br />書き方の流儀</div>
            </div>
            <div className="arch-card border-amber">
                <div className="card-title">メモリ管理</div>
                <div className="card-body">使い終わったメモリの<br />後片付け方式</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">型システム</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <div className="compare-title accent-primary">静的型付け</div>
                <div className="compare-body">実行前に型をチェック<br />バグを事前に防げる</div>
                <div className="icon-row" style={{ marginTop: '16px' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" width="36" height="36" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="36" height="36" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" width="36" height="36" />
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">動的型付け</div>
                <div className="compare-body">実行中に型をチェック<br />気軽に書ける</div>
                <div className="icon-row" style={{ marginTop: '16px' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="36" height="36" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg" width="36" height="36" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="36" height="36" />
                </div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">メモリ管理方式</div>
        <div className="three-col">
            <div className="arch-card border-coral">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
                <div className="card-title">手動管理</div>
                <div className="card-body">速いけど危険<br />malloc / free</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
                <div className="card-title">ガベージコレクション</div>
                <div className="card-body">安全だけど<br />一時停止あり</div>
            </div>
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
                <div className="card-title">所有権システム</div>
                <div className="card-body">安全かつ高速<br />コンパイル時に追跡</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="72" height="72" />
        </div>
        <div className="year-badge">1989年</div>
        <div className="big-statement">クリスマス休暇の<br /><span className="accent-primary">暇つぶし</span>から始まった</div>
        <div className="quote-block" style={{ marginTop: '10px' }}>
            <div className="quote-mark">"</div>
            <div className="quote-body">ABC言語での3年半の経験を活かして<br />「もっと良い言語を」と思い立った</div>
            <div className="quote-source">Guido van Rossum</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">言語に込められた思い</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg" width="56" height="56" />
                <div className="compare-title accent-coral">Ruby（1993年）</div>
                <div className="compare-body">「プログラマの幸福に<br />最適化された言語」<br /><br />まつもとゆきひろ</div>
            </div>
            <div className="compare-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" width="56" height="56" />
                <div className="compare-title accent-primary">Go（2007年）</div>
                <div className="compare-body">「C++のコンパイルが<br />遅すぎる！」<br /><br />Rob Pike / Ken Thompson</div>
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
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="72" height="72" />
        </div>
        <div className="year-badge">2006年</div>
        <div className="big-statement"><span className="accent-coral">エレベーター故障</span>への怒りが<br />Rustを生んだ</div>
        <div className="quote-block" style={{ marginTop: '10px' }}>
            <div className="quote-mark">"</div>
            <div className="quote-body">クラッシュしないエレベーターすら<br />作れないなんて馬鹿げている</div>
            <div className="quote-source">Graydon Hoare</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">LLVM — 万能翻訳エンジン</div>
        <div className="flow-chain">
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
                <div className="fc-node-title">Rust</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="text-badge" style={{ marginBottom: '6px' }}>LLVM</div>
                <div className="fc-node-title">LLVM IR</div>
                <div className="fc-node-sub">共通の中間言語</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">x86 / ARM</div>
                <div className="fc-node-sub">機械語</div>
            </div>
        </div>
        <div className="enterprise-grid" style={{ marginTop: '10px' }}>
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" />
                <div className="card-title">Swift</div>
            </div>
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/julia/julia-original.svg" />
                <div className="card-title">Julia</div>
            </div>
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" />
                <div className="card-title">Kotlin Native</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">言語を作るためのツール</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <div className="text-badge" style={{ marginBottom: '10px' }}>ANTLR</div>
                <div className="card-title">パーサー自動生成</div>
                <div className="card-body">文法定義から<br />10言語に対応</div>
            </div>
            <div className="arch-card border-teal">
                <div className="text-badge" style={{ marginBottom: '10px', background: 'var(--teal)' }}>BNF</div>
                <div className="card-title">文法の形式定義</div>
                <div className="card-body">言語のルールを<br />厳密に記述</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge" style={{ marginBottom: '10px', background: 'var(--amber)' }}>CI</div>
                <div className="card-title">Crafting Interpreters</div>
                <div className="card-body">無料の名著<br />ゼロから学べる</div>
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
        <div className="scene-title">言語づくりの3ステップ</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-text">言語の目的と設計を決める</div>
            </div>
            <div className="num-item">
                <div className="num-circle">2</div>
                <div className="num-text">字句解析と構文解析を実装する</div>
            </div>
            <div className="num-item">
                <div className="num-circle">3</div>
                <div className="num-text">コンパイラかインタプリタを実装する</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="icon-cloud">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
    </div>
    <div className="content center-layout">
        <div className="big-statement">すべての言語は<br />1人の<span className="accent-primary">「作りたい」</span>から始まった</div>
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
};

export const TOTAL_SCENE_COUNT = 17;
