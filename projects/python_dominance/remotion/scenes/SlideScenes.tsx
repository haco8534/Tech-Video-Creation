import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene scene-opening" id="scene-0">
    <div className="icon-cloud">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
    </div>
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="80" height="80" />
        </div>
        <div className="title-large">Pythonの天下は<br /><span className="accent-primary">いつまで続くのか</span></div>
        <div className="opening-sub">もし1つだけ選ぶなら、本当にPythonでいい？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">プログラミング言語人気ランキング</div>
        <div className="hero-number">25.35%</div>
        <div className="body-bold mt-8">TIOBE Index 2025 ── <span className="accent-primary">2001年以降の最高値</span></div>
        <div className="bar-chart mt-24">
            <div className="bar-row"><div className="bar-label">Python</div><div className="bar-track"><div className="bar-fill bf-primary" style={{ '--w': '85%' } as React.CSSProperties}></div></div><div className="bar-val">25.4%</div></div>
            <div className="bar-row"><div className="bar-label">C++</div><div className="bar-track"><div className="bar-fill bf-amber" style={{ '--w': '35%' } as React.CSSProperties}></div></div><div className="bar-val">10.4%</div></div>
            <div className="bar-row"><div className="bar-label">Java</div><div className="bar-track"><div className="bar-fill bf-coral" style={{ '--w': '30%' } as React.CSSProperties}></div></div><div className="bar-val">9.0%</div></div>
            <div className="bar-row"><div className="bar-label">C</div><div className="bar-track"><div className="bar-fill bf-teal" style={{ '--w': '25%' } as React.CSSProperties}></div></div><div className="bar-val">7.2%</div></div>
            <div className="bar-row"><div className="bar-label">JavaScript</div><div className="bar-track"><div className="bar-fill bf-yellow" style={{ '--w': '12%' } as React.CSSProperties}></div></div><div className="bar-val">3.6%</div></div>
        </div>
        <div className="source">出典: TIOBE Index 2025年5月</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">Pythonが支配する3つの領域</div>
        <div className="metric-grid mt-8">
            <div className="metric-card" style={{ borderTop: '3px solid var(--primary)' }}><div className="metric-value accent-primary">75%</div><div className="metric-label">米トップ大学CS学科<br />入門コース採用率</div></div>
            <div className="metric-card" style={{ borderTop: '3px solid var(--yellow)' }}><div className="metric-value accent-yellow">75万+</div><div className="metric-label">PyPIパッケージ数<br />月間DL数十億回</div></div>
            <div className="metric-card" style={{ borderTop: '3px solid var(--teal)' }}><div className="metric-value accent-teal">51%</div><div className="metric-label">Stack Overflow<br />開発者使用率</div></div>
        </div>
        <div className="tag-row mt-20">
            <div className="tag tag-primary">MIT</div>
            <div className="tag tag-primary">Stanford</div>
            <div className="tag tag-primary">UC Berkeley</div>
            <div className="tag tag-yellow">NumPy</div>
            <div className="tag tag-yellow">pandas</div>
            <div className="tag tag-yellow">PyTorch</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">Pythonの誕生</div>
        <div className="flow-chain">
            <div className="fc-node"><div className="fc-year">1989</div>開発開始<br />クリスマスの趣味</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">1991</div>v0.9リリース<br />初版公開</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">2000</div>Python 2.0<br />リスト内包表記</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">2008</div>Python 3.0<br />大型刷新</div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary"><div className="fc-year">2018~</div>王座へ<br />TIOBE 1位</div>
        </div>
        <div className="body-bold mt-20"><span className="accent-primary">Guido van Rossum</span> ── 「読みやすく、誰でも使える言語を」</div>
        <div className="caption-text mt-8">名前の由来: モンティ・パイソン（コメディ番組）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">Pythonの致命的な弱点</div>
        <div className="two-col mt-8">
            <div className="arch-card" style={{ borderColor: 'var(--teal)' }}>
                <div className="card-badge badge-blue">コンパイル言語</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
                <div className="card-title">C言語</div>
                <div className="speed-large accent-teal">1秒</div>
                <div className="card-note">ある計算の実行時間</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="arch-card" style={{ borderColor: 'var(--coral)' }}>
                <div className="card-badge badge-red">インタプリタ言語</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                <div className="card-title">Python</div>
                <div className="speed-large accent-coral">1分以上</div>
                <div className="card-note">同じ計算の実行時間</div>
            </div>
        </div>
        <div className="body-bold mt-20 accent-coral">10倍〜100倍遅い</div>
        <div className="caption-text mt-8">100倍遅い言語が、なぜ人気No.1なのか？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">なぜ「遅い」のに勝てるのか</div>
        <div className="two-col mt-8">
            <div className="arch-card">
                <div className="card-title">一流シェフの店</div>
                <div className="speed-xl accent-coral">3品</div>
                <div className="card-note">腕は超一流<br />でもメニューが少ない</div>
            </div>
            <div className="col-arrow">VS</div>
            <div className="arch-card" style={{ borderColor: 'var(--primary)' }}>
                <div className="card-title">メガチェーン店</div>
                <div className="speed-xl accent-primary">1000品</div>
                <div className="card-note">味はそこそこ<br />でも出前もしてくれる</div>
            </div>
        </div>
        <div className="body-bold mt-20">Pythonは<span className="accent-coral">料理の腕</span>では負けている。<br />でも<span className="accent-primary">メニューの数</span>で圧倒している。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">エコシステム × タイミング</div>
        <div className="flow-chain mt-8">
            <div className="fc-node"><div className="fc-year">2010年代</div>データサイエンス<br />ブーム</div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary"><div className="fc-year accent-primary">NumPy / pandas</div>すでにPythonに<br />存在していた</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">2017年〜</div>ディープラーニング<br />ブーム</div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary"><div className="fc-year accent-primary">PyTorch / TF</div>Pythonファースト<br />で設計</div>
        </div>
        <div className="caption-bold mt-24">技術的に最強だから勝ったのではない。<span className="accent-primary">タイミングとエコシステム</span>で勝った。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">思考実験</div>
        <div className="two-col mt-16">
            <div className="arch-card" style={{ borderColor: 'var(--primary)' }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                <div className="card-title">Python + NumPy</div>
                <div className="caption-bold accent-primary mb-8">AI研究の王者</div>
                <div className="card-note">行列演算が高速<br />ディープラーニングが可能</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="arch-card" style={{ borderColor: 'var(--coral)' }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                <div className="card-title">Python − NumPy</div>
                <div className="caption-bold accent-coral mb-8">まともに動かない</div>
                <div className="card-note">forループで行列演算<br />→ 遅すぎて実用不可</div>
            </div>
        </div>
        <div className="body-bold mt-20">PythonのAI王者の座を支えているのは<br /><span className="accent-coral">Python自身の速さではない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">import numpyの裏側</div>
        <div className="layer-stack mt-16">
            <div className="layer-row l-python"><span>Pythonコード</span><span>import numpy; a.sum()</span></div>
            <div className="layer-row l-api"><span>Python API</span><span>インターフェース</span></div>
            <div className="layer-row l-c"><span>C/Fortran エンジン</span><span>実際の計算処理</span></div>
            <div className="layer-row l-cpu"><span>CPU / SIMD</span><span>ハードウェア最適化</span></div>
        </div>
        <div className="two-col mt-20">
            <div>
                <div className="speed-large accent-coral">数秒</div>
                <div className="caption-text">純Python forループ<br />100万個の足し算</div>
            </div>
            <div className="col-arrow">→</div>
            <div>
                <div className="speed-large accent-primary">一瞬</div>
                <div className="caption-text">NumPy（C実装）<br />同じ100万個の足し算</div>
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
        <div className="scene-title">指揮者と楽団</div>
        <div className="mt-12">
            <svg width="500" height="200" viewBox="0 0 500 200">
                <rect x="180" y="10" width="140" height="60" rx="10" fill="#dce8f4" stroke="#306998" strokeWidth="2"/>
                <text x="250" y="36" textAnchor="middle" fontSize="14" fontWeight="900" fill="#306998">Python</text>
                <text x="250" y="54" textAnchor="middle" fontSize="11" fill="#306998">指揮者</text>
                <line x1="200" y1="70" x2="80" y2="120" stroke="#d1d5db" strokeWidth="1.5"/>
                <line x1="250" y1="70" x2="250" y2="120" stroke="#d1d5db" strokeWidth="1.5"/>
                <line x1="300" y1="70" x2="420" y2="120" stroke="#d1d5db" strokeWidth="1.5"/>
                <rect x="30" y="120" width="100" height="55" rx="8" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
                <text x="80" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1d23">C / Fortran</text>
                <text x="80" y="163" textAnchor="middle" fontSize="10" fill="#1a1d23">NumPy</text>
                <rect x="200" y="120" width="100" height="55" rx="8" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
                <text x="250" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1d23">C++ / CUDA</text>
                <text x="250" y="163" textAnchor="middle" fontSize="10" fill="#1a1d23">PyTorch</text>
                <rect x="370" y="120" width="100" height="55" rx="8" fill="#fde8e4" stroke="#CE422B" strokeWidth="1.5"/>
                <text x="420" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#CE422B">Rust</text>
                <text x="420" y="163" textAnchor="middle" fontSize="10" fill="#CE422B">新しい楽団員</text>
            </svg>
        </div>
        <div className="body-bold mt-8">指揮者に<span className="accent-coral">足の速さ</span>は必要ない。<br />求められるのは<span className="accent-primary">楽団を統率する力</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">「2言語問題」の解決</div>
        <div className="two-col mt-12">
            <div className="arch-card" style={{ borderColor: 'var(--coral)' }}>
                <div className="card-badge badge-red">従来のアプローチ</div>
                <div className="card-title">二度手間</div>
                <div className="flow-row mt-8">
                    <div className="flow-chip chip-blue">Pythonで<br />プロトタイプ</div>
                    <div className="flow-connector">→</div>
                    <div className="flow-chip chip-red">Cで<br />書き直し</div>
                </div>
            </div>
            <div className="col-arrow">VS</div>
            <div className="arch-card" style={{ borderColor: 'var(--primary)' }}>
                <div className="card-badge badge-blue">Pythonの解決策</div>
                <div className="card-title">書き直し不要</div>
                <div className="flow-row mt-8">
                    <div className="flow-chip chip-blue">Pythonだけ<br />書けばOK</div>
                </div>
                <div className="card-note mt-8">NumPy/PyTorchが<br />書き直しを済ませてくれている</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">速さ vs 生産性</div>
        <div className="two-col mt-12">
            <div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" width="48" height="48" />
                <div className="speed-xl accent-coral mt-8">10時間</div>
                <div className="caption-text">コードを書く時間</div>
            </div>
            <div className="col-arrow">→</div>
            <div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="48" height="48" />
                <div className="speed-xl accent-primary mt-8">1時間</div>
                <div className="caption-text">コードを書く時間</div>
            </div>
        </div>
        <div className="body-bold mt-20">しかも実行速度は<span className="accent-primary">NumPyのおかげでほぼ同じ</span></div>
        <div className="callout callout-blue">開発者の時給を考えると、Pythonのほうがトータルコストは安い</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">GIL ── Pythonの最大の弱点</div>
        <div className="mt-12">
            <svg width="480" height="180" viewBox="0 0 480 180">
                <rect x="160" y="50" width="160" height="40" rx="6" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                <text x="240" y="75" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1a1d23">一車線の橋（GIL）</text>
                <rect x="10" y="40" width="60" height="25" rx="4" fill="#dce8f4" stroke="#306998" strokeWidth="1.5"/>
                <text x="40" y="57" textAnchor="middle" fontSize="10" fill="#306998">Thread 1</text>
                <rect x="10" y="70" width="60" height="25" rx="4" fill="#fdecea" stroke="#E74C3C" strokeWidth="1.5"/>
                <text x="40" y="87" textAnchor="middle" fontSize="10" fill="#E74C3C">Thread 2</text>
                <rect x="10" y="100" width="60" height="25" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
                <text x="40" y="117" textAnchor="middle" fontSize="10" fill="#b45309">Thread 3</text>
                <text x="330" y="75" fontSize="18" fill="#1a1d23">→</text>
                <rect x="370" y="55" width="100" height="30" rx="6" fill="#dce8f4" stroke="#306998" strokeWidth="1.5"/>
                <text x="420" y="75" textAnchor="middle" fontSize="11" fill="#306998">1台ずつ通過</text>
                <text x="240" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill="#E74C3C">マルチコアCPUの恩恵を受けられない</text>
                <text x="240" y="155" textAnchor="middle" fontSize="11" fill="#1a1d23">4コア・8コアがあっても、Pythonは1コア分しか使えない</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">なぜGILは生まれたのか</div>
        <div className="two-col mt-16">
            <div className="arch-card" style={{ borderColor: 'var(--teal)' }}>
                <div className="card-badge" style={{ background: 'var(--teal-light)', color: '#0d9488' }}>1989年</div>
                <div className="card-title">CPUは1コア</div>
                <div className="card-note">一車線の橋で十分<br />渋滞する車がいない<br />メモリ管理がシンプルに</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="arch-card" style={{ borderColor: 'var(--coral)' }}>
                <div className="card-badge badge-red">2020年代</div>
                <div className="card-title">CPUは8〜16コア</div>
                <div className="card-note">一車線では大渋滞<br />30年前の正解が<br />今の足かせに</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">PEP 703 ── GILをオプションに</div>
        <div className="flow-chain mt-12">
            <div className="fc-node"><div className="fc-year">2023</div>PEP 703承認<br />GILオプション化の提案</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">3.13</div>実験導入<br />ペナルティ40%</div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary"><div className="fc-year">3.14</div>公式サポート<br />ペナルティ5-10%</div>
        </div>
        <div className="metric-grid mt-16">
            <div className="metric-card" style={{ borderTop: '3px solid var(--primary)' }}><div className="metric-value accent-primary">5-10%</div><div className="metric-label">シングルスレッド<br />速度低下（のみ）</div></div>
            <div className="metric-card" style={{ borderTop: '3px solid var(--teal)' }}><div className="metric-value accent-teal">3〜3.5x</div><div className="metric-label">マルチコア<br />高速化</div></div>
        </div>
        <div className="caption-bold mt-12">橋を<span className="accent-primary">多車線に拡張</span>する大工事が完了しつつある</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">挑戦者たち</div>
        <div className="lesson-cards mt-12">
            <div className="lesson-card" style={{ borderTop: '3px solid var(--rust)' }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="36" height="36" />
                <div className="lesson-title accent-rust">Rust</div>
                <div className="lesson-desc">メモリ安全 + 速度<br />「最も称賛」8年連続1位</div>
            </div>
            <div className="lesson-card" style={{ borderTop: '3px solid var(--julia)' }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/julia/julia-original.svg" width="36" height="36" />
                <div className="lesson-title accent-julia">Julia</div>
                <div className="lesson-desc">科学計算特化<br />数値計算で圧倒的</div>
            </div>
            <div className="lesson-card" style={{ borderTop: '3px solid var(--go)' }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" width="36" height="36" />
                <div className="lesson-title accent-go">Go</div>
                <div className="lesson-desc">Googleが設計<br />クラウドインフラで台頭</div>
            </div>
        </div>
        <div className="caption-bold mt-16">Mojo（Python互換 + C並み速度）にも注目</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">挑戦者は「敵」ではない</div>
        <div className="mt-12">
            <svg width="500" height="200" viewBox="0 0 500 200">
                <rect x="175" y="10" width="150" height="50" rx="10" fill="#dce8f4" stroke="#306998" strokeWidth="2.5"/>
                <text x="250" y="32" textAnchor="middle" fontSize="14" fontWeight="900" fill="#306998">Python</text>
                <text x="250" y="48" textAnchor="middle" fontSize="10" fill="#306998">指揮者（変わらない）</text>
                <line x1="200" y1="60" x2="80" y2="100" stroke="#d1d5db" strokeWidth="1.5"/>
                <line x1="250" y1="60" x2="250" y2="100" stroke="#d1d5db" strokeWidth="1.5"/>
                <line x1="300" y1="60" x2="420" y2="100" stroke="#d1d5db" strokeWidth="1.5"/>
                <rect x="20" y="100" width="120" height="40" rx="6" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="80" y="118" textAnchor="middle" fontSize="11" fill="#9ca3af">C/Fortran</text>
                <text x="80" y="132" textAnchor="middle" fontSize="9" fill="#9ca3af">（退役中）</text>
                <rect x="190" y="100" width="120" height="40" rx="6" fill="#fde8e4" stroke="#CE422B" strokeWidth="2"/>
                <text x="250" y="118" textAnchor="middle" fontSize="11" fontWeight="700" fill="#CE422B">Rust</text>
                <text x="250" y="132" textAnchor="middle" fontSize="9" fill="#CE422B">新しい楽団員</text>
                <rect x="360" y="100" width="120" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
                <text x="420" y="118" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b45309">Mojo</text>
                <text x="420" y="132" textAnchor="middle" fontSize="9" fill="#b45309">Python互換</text>
                <text x="250" y="170" textAnchor="middle" fontSize="13" fontWeight="700" fill="#306998">楽団員が入れ替わっても、指揮者はPython</text>
            </svg>
        </div>
        <div className="caption-bold mt-8">PyPIの<span className="accent-rust">新しいネイティブコード</span>でRustの採用率が増加中</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="big-statement">挑戦者たちは<br />「<span className="accent-coral">Pythonを倒す</span>」のではなく<br />「<span className="accent-primary">Pythonと一緒に進化する</span>」</div>
        <div className="tag-row mt-24">
            <div className="tag tag-rust">Rust → PyPIの裏側</div>
            <div className="tag tag-amber">Mojo → Python互換</div>
            <div className="tag tag-julia">Julia → Python連携</div>
        </div>
        <div className="caption-text mt-20">しかし歴史を見ると──永遠に続いた天下は<span className="accent-coral">1つもない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">王座交代の歴史</div>
        <div className="flow-chain mt-12">
            <div className="fc-node"><div className="fc-year">1957</div>Fortran<br />科学計算の王者</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">1959</div>COBOL<br />ビジネスの王者</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">1972</div>C<br />OS・システム</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">1995</div>Java<br />エンタープライズ</div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary"><div className="fc-year">2018~</div>Python<br />AI時代の王者</div>
        </div>
        <div className="caption-bold mt-16">各時代のパラダイムシフトが<span className="accent-primary">新しい王者</span>を生み出してきた</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">COBOLは「死んで」いない</div>
        <div className="hero-number mt-8">2000億<span className="caption-text">行</span></div>
        <div className="body-bold mt-8">1959年生まれのCOBOLコード ── 今も現役</div>
        <div className="metric-grid mt-16">
            <div className="metric-card" style={{ borderTop: '3px solid var(--primary)' }}><div className="metric-value accent-primary">95%</div><div className="metric-label">ATM取引</div></div>
            <div className="metric-card" style={{ borderTop: '3px solid var(--amber)' }}><div className="metric-value accent-amber">43%</div><div className="metric-label">銀行システム</div></div>
            <div className="metric-card" style={{ borderTop: '3px solid var(--teal)' }}><div className="metric-value accent-teal">65年</div><div className="metric-label">現役期間</div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">衰退 ≠ 滅亡</div>
        <div className="bar-chart mt-16">
            <div className="bar-row"><div className="bar-label">Fortran (HPC)</div><div className="bar-track"><div className="bar-fill bf-teal" style={{ '--w': '70%' } as React.CSSProperties}></div></div><div className="bar-val">CPUの70%</div></div>
            <div className="bar-row"><div className="bar-label">COBOL (ATM)</div><div className="bar-track"><div className="bar-fill bf-primary" style={{ '--w': '95%' } as React.CSSProperties}></div></div><div className="bar-val">取引の95%</div></div>
            <div className="bar-row"><div className="bar-label">Java (企業)</div><div className="bar-track"><div className="bar-fill bf-coral" style={{ '--w': '50%' } as React.CSSProperties}></div></div><div className="bar-val">依然現役</div></div>
        </div>
        <div className="body-bold mt-20">どの言語も<span className="accent-coral">「滅びた」のではない</span>。<br /><span className="accent-primary">主役の座を譲った</span>だけ。</div>
        <div className="caption-text mt-8">Fortranは2024年にTIOBE Top10に20年ぶりに復帰</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">次の王者は誰か？</div>
        <div className="flow-chain mt-12">
            <div className="fc-node"><div className="fc-year">メインフレーム</div>COBOL</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">PC時代</div>C / C++</div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year">Web時代</div>Java</div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary"><div className="fc-year accent-primary">AI時代</div>Python</div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ border: '2px dashed var(--amber)' }}><div className="fc-year accent-amber">次の時代</div>？</div>
        </div>
        <div className="body-bold mt-24">新しい時代に<span className="accent-primary">「ちょうどいい場所」</span>にいる言語が<br />次の主役になる</div>
        <div className="tag-row mt-12">
            <div className="tag tag-yellow">量子コンピューティング？</div>
            <div className="tag tag-teal">エッジAI？</div>
            <div className="tag tag-coral">まだ見ぬ何か？</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="scene-title">今日わかったこと</div>
        <div className="num-list mt-12">
            <div className="num-item"><div className="num-circle">1</div><div><div className="num-title">Pythonが王座にいるのは「言語の実力」ではない</div><div className="num-desc">エコシステム × タイミング × 教育の複合要因</div></div></div>
            <div className="num-item"><div className="num-circle">2</div><div><div className="num-title">「遅い」は致命傷ではない</div><div className="num-desc">指揮者に速さは不要。楽団（C/Rust）が計算する</div></div></div>
            <div className="num-item"><div className="num-circle">3</div><div><div className="num-title">天下は必ず入れ替わる。でも「滅亡」とは違う</div><div className="num-desc">COBOLは65年、Fortranは67年──今日も現役</div></div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-23">
    <div className="content center-layout">
        <div className="scene-title">Pythonは進化し続ける</div>
        <div className="flow-chain mt-12">
            <div className="fc-node fc-node-coral"><div className="fc-year accent-coral">弱点</div>C比100倍遅い<br />GIL</div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary"><div className="fc-year accent-primary">進化</div>グルー言語戦略<br />PEP703</div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--teal)' }}><div className="fc-year accent-teal">共存</div>楽団員がRustに<br />挑戦者は味方に</div>
        </div>
        <div className="body-bold mt-20">天下を維持するのは「<span className="accent-coral">最強だから</span>」ではなく<br />「<span className="accent-primary">進化し続けるから</span>」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-24">
    <div className="content center-layout">
        <div className="caption-text mb-12">最初の問い</div>
        <div className="big-statement" style={{ textDecoration: 'line-through' }}>「本当にPythonでいいのか？」</div>
        <div className="speed-xl mt-16">↓</div>
        <div className="caption-text accent-primary mb-8">本当の問い</div>
        <div className="big-statement accent-primary">「Pythonで何を作りたいか」</div>
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
    24: Scene24,
};

export const TOTAL_SCENE_COUNT = 25;
