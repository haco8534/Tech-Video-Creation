import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

/**
 * Auto-generated: HTML → TSX conversion
 * Source: why_vscode/index.html (29 scenes)
 */

// Scene 0
export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene active" id="scene-0">
    <div className="content center-layout">
        <div className="emphasis-text-large stagger-item"><span className="accent-primary">76</span><span className="num-unit">%</span></div>
        <div className="emphasis-sub stagger-item">2025年 世界のエンジニアが使うエディタ</div>
        <div className="source-badge stagger-item">Stack Overflow Developer Survey 2025 / 65,000+ respondents</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 1
export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">開発環境の利用率</h2>
        <div className="source-badge stagger-item">Stack Overflow Developer Survey 2025</div>
        <div className="bar-comparison stagger-item">
            <div className="bar-row">
                <div className="bar-label">VS Code</div>
                <div className="bar-track"><div className="bar-fill bar-primary-fill" style={{ '--w': '76%' } as React.CSSProperties}><span className="bar-value">75.9%</span></div></div>
            </div>
            <div className="bar-row">
                <div className="bar-label">Visual Studio</div>
                <div className="bar-track"><div className="bar-fill bar-teal-fill" style={{ '--w': '28%' } as React.CSSProperties}><span className="bar-value">28%</span></div></div>
            </div>
            <div className="bar-row">
                <div className="bar-label">IntelliJ</div>
                <div className="bar-track"><div className="bar-fill bar-amber-fill" style={{ '--w': '22%' } as React.CSSProperties}><span className="bar-value">22%</span></div></div>
            </div>
            <div className="bar-row">
                <div className="bar-label">Vim / Neovim</div>
                <div className="bar-track"><div className="bar-fill bar-coral-fill" style={{ '--w': '18%' } as React.CSSProperties}><span className="bar-value">18%</span></div></div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">2位の倍以上の差をつける圧倒的シェア</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 2
export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">VSCodeの誕生</h2>
        <div className="flow-chain stagger-item">
            <div className="flow-node">
                <div className="flow-year">2015</div>
                <div className="flow-text"><span className="flow-name">VSCode発表</span><br />Microsoft Build<br /><span className="flow-sub">影も形もなかった</span></div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">2016</div>
                <div className="flow-text"><span className="flow-name">7%</span><br />Stack Overflow<br /><span className="flow-sub">13位スタート</span></div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">2018</div>
                <div className="flow-text"><span className="flow-name accent-primary">35%で1位</span><br />わずか3年で<br /><span className="flow-sub">首位に</span></div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">2025</div>
                <div className="flow-text"><span className="flow-name accent-primary">76%</span><br />4年連続1位<br /><span className="flow-sub">5000万MAU</span></div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">たった10年でゼロから76%へ駆け上がった</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 3
export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">エディタ vs IDE</h2>
        <div className="vs-container stagger-item">
            <div className="vs-card vs-left">
                <div className="vs-badge safe-badge">軽量</div>
                <div className="vs-title">テキストエディタ</div>
                <div className="vs-desc">テキストを素早く編集</div>
                <div className="vs-detail">数十MBのメモリ</div>
                <div className="vs-detail">瞬時に起動</div>
            </div>
            <div className="vs-divider">vs</div>
            <div className="vs-card vs-right">
                <div className="vs-badge danger-badge">重厚</div>
                <div className="vs-title">IDE</div>
                <div className="vs-desc">開発を1つに統合</div>
                <div className="vs-detail">数GBのメモリ</div>
                <div className="vs-detail">起動に数十秒</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">「速さ」と「賢さ」──相反する2つの哲学</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 4
export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">エディタ50年の系譜</h2>
        <div className="flow-chain stagger-item">
            <div className="flow-node">
                <div className="flow-year">1976</div>
                <div className="flow-text"><span className="flow-name">vi</span><br />モーダル編集</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">1976</div>
                <div className="flow-text"><span className="flow-name">Emacs</span><br />Lisp拡張</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">1991</div>
                <div className="flow-text"><span className="flow-name">Vim</span><br />Vi IMproved</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">2008</div>
                <div className="flow-text"><span className="flow-name">Sublime</span><br />C++ / ネイティブ</div>
            </div>
        </div>
        <div className="footnote stagger-item">50年間「コードをどう書くか」を追求し続けた歴史がある</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 5
export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">思考実験</h2>
        <div className="vs-container stagger-item">
            <div className="vs-card vs-left">
                <div className="vs-badge safe-badge">エディタ</div>
                <div className="vs-icon-text">Sports Car</div>
                <div className="vs-desc">速いけど荷物は積めない</div>
            </div>
            <div className="vs-divider">+</div>
            <div className="vs-card vs-right">
                <div className="vs-badge danger-badge">IDE</div>
                <div className="vs-icon-text">Camper Van</div>
                <div className="vs-desc">全部入りだけど重い</div>
            </div>
        </div>
        <div className="emphasis-text stagger-item">両方の良さを<span className="accent-primary">同時に</span>持てたら？</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 6
export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">伝説的な設計者</h2>
        <div className="person-card stagger-item">
            <div className="person-name">Erich Gamma</div>
            <div className="person-achievements">
                <div className="achievement-tag achievement-primary">Gang of Four</div>
                <div className="achievement-tag achievement-teal">Design Patterns (1994)</div>
                <div className="achievement-tag achievement-amber">Eclipse JDT Lead</div>
                <div className="achievement-tag achievement-coral">VSCode Architect</div>
            </div>
        </div>
        <div className="flow-chain stagger-item" style={{ marginTop: '1.5rem' }}>
            <div className="flow-node"><div className="flow-year">1994</div><div className="flow-text"><span className="flow-name">設計パターン</span><br />GoF本出版</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-node"><div className="flow-year">2001</div><div className="flow-text"><span className="flow-name">Eclipse JDT</span><br />Javaの標準IDE</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-node"><div className="flow-year">2011</div><div className="flow-text"><span className="flow-name">Microsoft入社</span><br />Monacoプロジェクト</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-node"><div className="flow-year">2015</div><div className="flow-text"><span className="flow-name accent-primary">VSCode</span><br />公開</div></div>
        </div>
        <div className="emphasis-sub stagger-item">「拡張可能なソフトウェア」を作り続けた人物</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 7
export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">エディタ戦争 2008-2015</h2>
        <div className="era-timeline stagger-item">
            <div className="era-block era-sublime">
                <div className="era-label">Sublime Text 全盛</div>
                <div className="era-years">2008-2014</div>
                <div className="era-detail">C++ / 有料$99 / 超高速</div>
            </div>
            <div className="era-arrow">→</div>
            <div className="era-block era-atom">
                <div className="era-label">Atom 挑戦</div>
                <div className="era-years">2014</div>
                <div className="era-detail">GitHub / 無料OSS / Electron</div>
            </div>
            <div className="era-arrow">→</div>
            <div className="era-block era-vscode">
                <div className="era-label accent-primary">VSCode 登場</div>
                <div className="era-years">2015</div>
                <div className="era-detail">Microsoft / 無料OSS / Electron</div>
            </div>
        </div>
        <div className="comparison-note stagger-item">Sublime Textの更新停滞（2013-2017）が門戸を開いた</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 8
export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">2大エディタの比較</h2>
        <div className="vs-container stagger-item">
            <div className="vs-card vs-left">
                <div className="vs-badge safe-badge">王者</div>
                <div className="vs-title">Sublime Text</div>
                <div className="vs-desc">C++ / ネイティブ</div>
                <div className="vs-detail">有料 $99</div>
                <div className="vs-detail">2013年〜更新停滞</div>
            </div>
            <div className="vs-divider">vs</div>
            <div className="vs-card vs-right">
                <div className="vs-badge warning-badge">挑戦者</div>
                <div className="vs-title">Atom</div>
                <div className="vs-desc">Electron / Web技術</div>
                <div className="vs-detail">無料 / OSS</div>
                <div className="vs-detail">「A hackable text editor」</div>
            </div>
        </div>
        <div className="footnote stagger-item">Atomの登場がエディタ市場に地殻変動を起こした</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 9
export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">Atomの設計哲学</h2>
        <div className="atom-arch stagger-item">
            <div className="atom-core">Core</div>
            <div className="atom-ring">
                <div className="atom-ext ext-1">Tabs</div>
                <div className="atom-ext ext-2">Tree</div>
                <div className="atom-ext ext-3">Search</div>
                <div className="atom-ext ext-4">Git</div>
                <div className="atom-ext ext-5">Syntax</div>
                <div className="atom-ext ext-6">Autocomplete</div>
            </div>
        </div>
        <div className="emphasis-text stagger-item"><span className="accent-coral">すべて</span>が拡張機能</div>
        <div className="emphasis-sub stagger-item">タブも、ファイルツリーも、検索も、全部プラグイン</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 10
export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">「すべてが拡張」の代償</h2>
        <div className="perf-comparison stagger-item">
            <div className="perf-bar">
                <div className="perf-label">拡張 0個</div>
                <div className="perf-track"><div className="perf-fill perf-fast" style={{ '--w': '20%' } as React.CSSProperties}></div></div>
                <div className="perf-time">~2秒</div>
            </div>
            <div className="perf-bar">
                <div className="perf-label">拡張 20個</div>
                <div className="perf-track"><div className="perf-fill perf-mid" style={{ '--w': '50%' } as React.CSSProperties}></div></div>
                <div className="perf-time">~5秒</div>
            </div>
            <div className="perf-bar">
                <div className="perf-label">拡張 50個</div>
                <div className="perf-track"><div className="perf-fill perf-slow" style={{ '--w': '90%' } as React.CSSProperties}></div></div>
                <div className="perf-time">~10秒+</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">拡張が増えるほど起動が遅くなる悪循環</div>
        <div className="comparison-note stagger-item">「Atomを開くのにAtomより速いエディタが要る」</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 11
export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="transform-visual stagger-item">
            <div className="transform-from">Atom Shell</div>
            <div className="transform-arrow">→</div>
            <div className="transform-to accent-primary">Electron</div>
        </div>
        <div className="emphasis-sub stagger-item">Atomのために GitHubが開発したフレームワーク</div>
        <div className="emphasis-text stagger-item">HTML / CSS / JS で<br />デスクトップアプリを作れる革命</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 12
export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">同じElectron、違う設計</h2>
        <div className="vs-container stagger-item">
            <div className="vs-card vs-left">
                <div className="vs-badge danger-badge">敗者</div>
                <div className="vs-title">Atom</div>
                <div className="vs-desc">すべてが拡張→重い</div>
                <div className="vs-detail">最適化不足</div>
                <div className="vs-detail">2022年 開発終了</div>
            </div>
            <div className="vs-divider">vs</div>
            <div className="vs-card vs-right">
                <div className="vs-badge safe-badge">勝者</div>
                <div className="vs-title accent-primary">VSCode</div>
                <div className="vs-desc">最適化の鬼→軽い</div>
                <div className="vs-detail">バンドラー/遅延ロード</div>
                <div className="vs-detail">プロセス分離設計</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">同じ素材でも設計が違えば結果は全く変わる</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 13
export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">思考実験：言語 x エディタ</h2>
        <div className="matrix-grid stagger-item">
            <div className="matrix-corner"></div>
            <div className="matrix-header">Vim</div>
            <div className="matrix-header">Emacs</div>
            <div className="matrix-header">Sublime</div>
            <div className="matrix-header">Atom</div>
            <div className="matrix-header">VSCode</div>
            <div className="matrix-lang">Python</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div>
            <div className="matrix-lang">JavaScript</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div>
            <div className="matrix-lang">Rust</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div>
            <div className="matrix-lang">Go</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div>
            <div className="matrix-lang">Java</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div><div className="matrix-cell">impl</div>
        </div>
        <div className="emphasis-sub stagger-item">各マスに専用の実装が必要</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 14
export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="formula-container stagger-item">
            <div className="formula-part">5 言語</div>
            <div className="formula-op">×</div>
            <div className="formula-part">5 エディタ</div>
            <div className="formula-eq">=</div>
            <div className="formula-result accent-coral">25 通り</div>
        </div>
        <div className="emphasis-sub stagger-item">言語10 x エディタ10 なら 100通り</div>
        <div className="comparison-note stagger-item">これが「M x N問題」──開発ツール業界の長年の課題</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 15
export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">M x N問題の可視化</h2>
        <svg className="mxn-svg stagger-item" viewBox="0 0 800 400">
            {/* 左: 言語 */}
            <rect x="30" y="40" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="64" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Python</text>
            <rect x="30" y="100" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="124" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">JavaScript</text>
            <rect x="30" y="160" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="184" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Rust</text>
            <rect x="30" y="220" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="244" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Go</text>
            <rect x="30" y="280" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="304" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Java</text>
            {/* 右: エディタ */}
            <rect x="650" y="40" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="64" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Vim</text>
            <rect x="650" y="100" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="124" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Emacs</text>
            <rect x="650" y="160" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="184" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Sublime</text>
            <rect x="650" y="220" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="244" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Atom</text>
            <rect x="650" y="280" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="304" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">VSCode</text>
            {/* 接続線 (25本) */}
            <g className="mxn-lines" stroke="#ef4444" strokeWidth="1" opacity="0.3">
                <line x1="150" y1="58" x2="650" y2="58"/><line x1="150" y1="58" x2="650" y2="118"/><line x1="150" y1="58" x2="650" y2="178"/><line x1="150" y1="58" x2="650" y2="238"/><line x1="150" y1="58" x2="650" y2="298"/>
                <line x1="150" y1="118" x2="650" y2="58"/><line x1="150" y1="118" x2="650" y2="118"/><line x1="150" y1="118" x2="650" y2="178"/><line x1="150" y1="118" x2="650" y2="238"/><line x1="150" y1="118" x2="650" y2="298"/>
                <line x1="150" y1="178" x2="650" y2="58"/><line x1="150" y1="178" x2="650" y2="118"/><line x1="150" y1="178" x2="650" y2="178"/><line x1="150" y1="178" x2="650" y2="238"/><line x1="150" y1="178" x2="650" y2="298"/>
                <line x1="150" y1="238" x2="650" y2="58"/><line x1="150" y1="238" x2="650" y2="118"/><line x1="150" y1="238" x2="650" y2="178"/><line x1="150" y1="238" x2="650" y2="238"/><line x1="150" y1="238" x2="650" y2="298"/>
                <line x1="150" y1="298" x2="650" y2="58"/><line x1="150" y1="298" x2="650" y2="118"/><line x1="150" y1="298" x2="650" y2="178"/><line x1="150" y1="298" x2="650" y2="238"/><line x1="150" y1="298" x2="650" y2="298"/>
            </g>
            <text x="400" y="370" textAnchor="middle" fill="#ef4444" fontWeight="700" fontSize="20">25本の個別実装が必要</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 16
export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">Language Server Protocol</h2>
        <svg className="lsp-svg stagger-item" viewBox="0 0 800 350">
            {/* 左: 言語 */}
            <rect x="30" y="40" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="64" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Python</text>
            <rect x="30" y="100" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="124" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">JavaScript</text>
            <rect x="30" y="160" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="184" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Rust</text>
            <rect x="30" y="220" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="244" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Go</text>
            <rect x="30" y="280" width="120" height="36" rx="8" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="2"/>
            <text x="90" y="304" textAnchor="middle" fill="#4f46e5" fontWeight="700" fontSize="16">Java</text>
            {/* 中央: LSP */}
            <rect x="320" y="100" width="160" height="150" rx="16" fill="rgba(79,70,229,0.06)" stroke="#4f46e5" strokeWidth="3"/>
            <text x="400" y="185" textAnchor="middle" fill="#4f46e5" fontWeight="900" fontSize="28">LSP</text>
            <text x="400" y="215" textAnchor="middle" fill="#9ca3af" fontSize="12">JSON-RPC 2.0</text>
            {/* 右: エディタ */}
            <rect x="650" y="40" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="64" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Vim</text>
            <rect x="650" y="100" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="124" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Emacs</text>
            <rect x="650" y="160" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="184" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Sublime</text>
            <rect x="650" y="220" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="244" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">Atom</text>
            <rect x="650" y="280" width="120" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#0d9488" strokeWidth="2"/>
            <text x="710" y="304" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="16">VSCode</text>
            {/* 接続線 (5+5=10本) */}
            <g stroke="#4f46e5" strokeWidth="2" opacity="0.5">
                <line x1="150" y1="58" x2="320" y2="155"/><line x1="150" y1="118" x2="320" y2="165"/><line x1="150" y1="178" x2="320" y2="175"/><line x1="150" y1="238" x2="320" y2="185"/><line x1="150" y1="298" x2="320" y2="195"/>
            </g>
            <g stroke="#0d9488" strokeWidth="2" opacity="0.5">
                <line x1="480" y1="155" x2="650" y2="58"/><line x1="480" y1="165" x2="650" y2="118"/><line x1="480" y1="175" x2="650" y2="178"/><line x1="480" y1="185" x2="650" y2="238"/><line x1="480" y1="195" x2="650" y2="298"/>
            </g>
            <text x="400" y="330" textAnchor="middle" fill="#0d9488" fontWeight="700" fontSize="20">5 + 5 = 10通りに激減</text>
        </svg>
        <div className="emphasis-sub stagger-item">M x N → M + N ──共通プロトコルによる革命</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 17
export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">LSP = 「共通語」</h2>
        <div className="pipeline stagger-item">
            <div className="pipe-stage">
                <div className="pipe-icon accent-bg-primary">Server</div>
                <div className="pipe-label">Language Server</div>
                <div className="pipe-desc">言語の「賢さ」を提供</div>
            </div>
            <div className="pipe-arrow">JSON-RPC</div>
            <div className="pipe-stage">
                <div className="pipe-icon accent-bg-teal">Client</div>
                <div className="pipe-label">Language Client</div>
                <div className="pipe-desc">エディタの「UI」を提供</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">1つのPython Language Serverを作れば、全エディタで動く</div>
        <div className="footnote stagger-item">LSPはVSCodeチームが開発し、オープンな標準仕様として公開された</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 18
export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">VSCodeの3層アーキテクチャ</h2>
        <div className="arch-stack stagger-item">
            <div className="arch-layer arch-layer-top">
                <div className="arch-label">UI プロセス</div>
                <div className="arch-desc">画面描画・ユーザー操作</div>
            </div>
            <div className="arch-arrow">↓</div>
            <div className="arch-layer arch-layer-mid">
                <div className="arch-label">拡張ホスト（別プロセス）</div>
                <div className="arch-desc">拡張機能を安全に実行</div>
            </div>
            <div className="arch-arrow">↓</div>
            <div className="arch-layer arch-layer-base">
                <div className="arch-label">Language Server（別プロセス）</div>
                <div className="arch-desc">言語固有の賢さを提供</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">言語サーバーがフリーズしてもエディタ本体は落ちない</div>
        <div className="footnote stagger-item">各層が独立したプロセスで動作する安定設計</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 19
export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">プロセス設計の違い</h2>
        <div className="vs-container stagger-item">
            <div className="vs-card vs-left">
                <div className="vs-badge danger-badge">Atom方式</div>
                <div className="vs-title">単一プロセス</div>
                <div className="process-visual process-single">
                    <div className="process-item">UI</div>
                    <div className="process-item">拡張1</div>
                    <div className="process-item process-crash">拡張2</div>
                    <div className="process-item">LS</div>
                </div>
                <div className="vs-desc accent-coral">1つ壊れると全部壊れる</div>
            </div>
            <div className="vs-divider">vs</div>
            <div className="vs-card vs-right">
                <div className="vs-badge safe-badge">VSCode方式</div>
                <div className="vs-title">プロセス分離</div>
                <div className="process-visual process-separate">
                    <div className="process-item process-safe">UI</div>
                    <div className="process-separator">|</div>
                    <div className="process-item process-safe">拡張</div>
                    <div className="process-separator">|</div>
                    <div className="process-item process-crash">LS</div>
                </div>
                <div className="vs-desc accent-primary">壊れても本体は無事</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 20
export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene dark-scene" id="scene-20">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">2001年</h2>
        <div className="quote-card quote-warning stagger-item">
            <div className="quote-mark">"</div>
            <div className="quote-text">Linux is a <span className="accent-coral">cancer</span></div>
            <div className="quote-source">Steve Ballmer, CEO of Microsoft (2001)</div>
        </div>
        <div className="emphasis-sub stagger-item">当時のMicrosoftは「オープンソースの敵」だった</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 21
export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">Microsoftの大転換</h2>
        <div className="flow-chain stagger-item">
            <div className="flow-node flow-node-dark">
                <div className="flow-year" style={{ color: 'var(--coral)' }}>2001</div>
                <div className="flow-text"><span className="flow-name accent-coral">Linux is cancer</span><br />Steve Ballmer</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">2014</div>
                <div className="flow-text"><span className="flow-name">ナデラCEO就任</span><br />路線転換</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">2015</div>
                <div className="flow-text"><span className="flow-name accent-primary">VSCode OSS</span><br />MIT License</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">
                <div className="flow-year">2018</div>
                <div className="flow-text"><span className="flow-name accent-primary">GitHub買収</span><br />$7.5B</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">「Linuxはcancer」から「Microsoft loves Linux」への180度転換</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 22
export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="emphasis-text-large stagger-item">Microsoft <span className="accent-coral heart-pulse">❤</span> Open Source</div>
        <div className="numbered-list stagger-item" style={{ marginTop: '2rem' }}>
            <div className="numbered-item">
                <div className="number-circle">1</div>
                <div className="numbered-text">.NET Core <span className="accent-primary">オープンソース化</span></div>
            </div>
            <div className="numbered-item">
                <div className="number-circle">2</div>
                <div className="numbered-text">VSCode <span className="accent-primary">MIT License公開</span></div>
            </div>
            <div className="numbered-item">
                <div className="number-circle">3</div>
                <div className="numbered-text">GitHub買収 <span className="accent-primary">独立性を維持</span></div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">言葉だけでなく行動で信頼を勝ち取った</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 23
export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">VSCode = プラットフォーム</h2>
        <div className="platform-visual stagger-item">
            <div className="platform-satellite platform-top">Extension Marketplace<br /><span className="platform-stat">60,000+</span></div>
            <div className="platform-satellite platform-left">LSP<br /><span className="platform-stat">言語エコシステム</span></div>
            <div className="platform-core">VSCode<br />Core</div>
            <div className="platform-satellite platform-right">Remote Dev<br /><span className="platform-stat">SSH / Container</span></div>
            <div className="platform-satellite platform-bottom">GitHub Codespaces<br /><span className="platform-stat">ブラウザ開発</span></div>
        </div>
        <div className="emphasis-sub stagger-item">単なる「エディタ」ではなく、開発者ツールの土台</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 24
export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-24">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">プラットフォーム戦略の類似構造</h2>
        <div className="vs-container stagger-item">
            <div className="vs-card vs-left">
                <div className="vs-badge safe-badge">モバイル</div>
                <div className="vs-title">iPhone</div>
                <div className="vs-desc">ハードウェア = 土台</div>
                <div className="vs-detail">App Store で価値を拡張</div>
                <div className="vs-detail">ネットワーク効果で独占</div>
            </div>
            <div className="vs-divider">=</div>
            <div className="vs-card vs-right">
                <div className="vs-badge safe-badge">エディタ</div>
                <div className="vs-title accent-primary">VSCode</div>
                <div className="vs-desc">エディタ本体 = 土台</div>
                <div className="vs-detail">Marketplace で価値を拡張</div>
                <div className="vs-detail">ネットワーク効果で独占</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">33億インストール、60,000拡張──アプリストア経済圏</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 25
export const Scene25: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-25">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">VSCodeが76%を取った3つの理由</h2>
        <div className="triple-card stagger-item">
            <div className="factor-card">
                <div className="factor-icon accent-bg-primary">1</div>
                <div className="factor-name">LSPの発明</div>
                <div className="factor-desc">言語サポートを「エコシステム」に変えた</div>
            </div>
            <div className="factor-card">
                <div className="factor-icon accent-bg-teal">2</div>
                <div className="factor-name">プラットフォーム戦略</div>
                <div className="factor-desc">エディタを「拡張機能の土台」に設計</div>
            </div>
            <div className="factor-card">
                <div className="factor-icon accent-bg-amber">3</div>
                <div className="factor-name">オープンソースと信頼</div>
                <div className="factor-desc">行動でMSの変化を証明した</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">どれか1つが欠けても今のVSCodeはなかった</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 26
export const Scene26: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-26">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">カテゴリの再定義</h2>
        <div className="pipeline stagger-item">
            <div className="pipe-stage">
                <div className="pipe-icon accent-bg-primary">軽</div>
                <div className="pipe-label">エディタ</div>
                <div className="pipe-desc">テキスト編集特化</div>
            </div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-stage">
                <div className="pipe-icon accent-bg-coral">重</div>
                <div className="pipe-label">IDE</div>
                <div className="pipe-desc">全部入り統合環境</div>
            </div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-stage pipe-result">
                <div className="pipe-icon accent-bg-teal">中</div>
                <div className="pipe-label">VSCode</div>
                <div className="pipe-desc">中間を再定義</div>
            </div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-stage">
                <div className="pipe-icon accent-bg-purple">PF</div>
                <div className="pipe-label">プラットフォーム</div>
                <div className="pipe-desc">拡張で無限に成長</div>
            </div>
        </div>
        <div className="emphasis-sub stagger-item">「便利だから」は結果──原因は3つの設計にあった</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 27
export const Scene27: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-27">
    <div className="content card-layout">
        <h2 className="scene-title stagger-item">エディタ50年史</h2>
        <div className="era-timeline stagger-item">
            <div className="era-block era-classic"><div className="era-label">vi</div><div className="era-years">1976</div></div>
            <div className="era-arrow">→</div>
            <div className="era-block era-classic"><div className="era-label">Emacs</div><div className="era-years">1976</div></div>
            <div className="era-arrow">→</div>
            <div className="era-block era-classic"><div className="era-label">Vim</div><div className="era-years">1991</div></div>
            <div className="era-arrow">→</div>
            <div className="era-block era-sublime"><div className="era-label">Sublime</div><div className="era-years">2008</div></div>
            <div className="era-arrow">→</div>
            <div className="era-block era-atom"><div className="era-label">Atom</div><div className="era-years">2014</div></div>
            <div className="era-arrow">→</div>
            <div className="era-block era-vscode era-highlight"><div className="era-label">VSCode</div><div className="era-years">2015→76%</div></div>
        </div>
        <div className="emphasis-sub stagger-item">VSCodeは突然現れた天才ではない──50年の試行錯誤の上に立っている</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene 28
export const Scene28: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-28">
    <div className="content center-layout">
        <div className="emphasis-text stagger-item">次にVSCodeを開くとき</div>
        <div className="emphasis-text-large stagger-item">あなたは<span className="accent-primary">50年の歴史</span>を開いている</div>
        <div className="emphasis-sub stagger-item">Ctrl+Spaceの裏でLSPが動き、6万の拡張が待機し、<br />vi以来50年の「もっと良くコードを書きたい」が詰まっている</div>
    </div>
</div>
    </AbsoluteFill>
);

// Scene component map
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
    25: Scene25,
    26: Scene26,
    27: Scene27,
    28: Scene28,
};

export const TOTAL_SCENE_COUNT = 29;
