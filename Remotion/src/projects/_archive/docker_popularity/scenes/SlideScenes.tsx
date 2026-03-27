import React from 'react';
import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import './slides.css';

loadFont();

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene scene-opening" id="scene-0">
    <div className="content center-layout">
        <div className="icon-row stagger-item"><svg viewBox="0 0 24 24" width="80" height="80" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg></div>
        <h2 className="title-large stagger-item">Dockerはなぜこんなに<br /><span className="accent-primary">流行ったのか</span></h2>
        <div className="subtitle-text stagger-item">コンテナ技術の革命と、その光と影</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-1">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">環境依存問題</h2>
        <div className="quote-block stagger-item">
            <div className="quote-mark">"</div>
            <div className="quote-body">It works on <span className="accent-coral">my machine</span></div>
            <div className="quote-attr">エンジニアの間で最も恐れられるフレーズ</div>
        </div>
        <div className="tag-row stagger-item">
            <span className="tag tag-coral">OSバージョン</span>
            <span className="tag tag-amber">ライブラリ</span>
            <span className="tag tag-purple">設定ファイル</span>
            <span className="tag tag-teal">環境変数</span>
            <span className="tag tag-primary">インストール順</span>
        </div>
        <div className="subtitle-text stagger-item">同じコードでも、環境が違えば動かない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-2">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">依存性の地獄</h2>
        <svg className="stagger-item" viewBox="0 0 600 250" width="600" height="250">
            <rect x="220" y="5" width="160" height="44" rx="10" fill="#fff" stroke="#9ca3af" strokeWidth="2"/>
            <text x="300" y="33" textAnchor="middle" fill="#1a1d23" fontSize="16" fontWeight="700">App v2.1</text>
            <line x1="260" y1="49" x2="120" y2="90" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6"/>
            <line x1="300" y1="49" x2="300" y2="90" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6"/>
            <line x1="340" y1="49" x2="480" y2="90" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6"/>
            <rect x="40" y="90" width="160" height="40" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5"/>
            <text x="120" y="115" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="600">Lib A v3.2</text>
            <rect x="220" y="90" width="160" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="300" y="115" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="600">Lib B v1.8</text>
            <rect x="400" y="90" width="160" height="40" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5"/>
            <text x="480" y="115" textAnchor="middle" fill="#7c3aed" fontSize="14" fontWeight="600">Lib C v5.0</text>
            <line x1="120" y1="130" x2="70" y2="165" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4"/>
            <line x1="120" y1="130" x2="170" y2="165" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4"/>
            <line x1="480" y1="130" x2="430" y2="165" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4"/>
            <line x1="480" y1="130" x2="530" y2="165" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4"/>
            <rect x="20" y="165" width="100" height="32" rx="6" fill="#fef2f2"/><text x="70" y="186" textAnchor="middle" fill="#b91c1c" fontSize="12">Sub X v2.0</text>
            <rect x="140" y="165" width="100" height="32" rx="6" fill="#fef2f2"/><text x="190" y="186" textAnchor="middle" fill="#b91c1c" fontSize="12">Sub Y v1.3</text>
            <rect x="380" y="165" width="100" height="32" rx="6" fill="#ede9fe"/><text x="430" y="186" textAnchor="middle" fill="#6d28d9" fontSize="12">Sub Z v4.1</text>
            <rect x="500" y="165" width="100" height="32" rx="6" fill="#ede9fe"/><text x="550" y="186" textAnchor="middle" fill="#6d28d9" fontSize="12">Sub W v2.7</text>
            <text x="300" y="230" textAnchor="middle" fill="#ef4444" fontSize="15" fontWeight="700">DLL Hell / Dependency Hell</text>
        </svg>
        <div className="footnote stagger-item">原因の候補が100通り以上 — 1つずつ潰す「地獄」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">2013年、転機が訪れた</h2>
        <div className="big-statement stagger-item">Dockerが<span className="accent-coral">「発明」</span>したもの</div>
        <div className="big-number stagger-item"><span className="accent-primary">＝ ゼロ</span></div>
        <div className="subtitle-text stagger-item">Dockerの革命は「発明」ではなかった</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-4">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">引っ越しのたとえ</h2>
        <div className="two-col stagger-item">
            <div className="col-card">
                <svg viewBox="0 0 120 110" width="120" height="110">
                    <rect x="10" y="30" width="100" height="70" rx="6" fill="#fff" stroke="#6b7280" strokeWidth="2"/>
                    <polygon points="60,5 10,35 110,35" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2"/>
                    <rect x="40" y="55" width="40" height="45" rx="3" fill="#dbeafe" stroke="#2496ed" strokeWidth="1.5"/>
                </svg>
                <div className="col-label">家ごと運ぶ = VM</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="col-card">
                <svg viewBox="0 0 120 110" width="120" height="110">
                    <rect x="15" y="25" width="90" height="70" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
                    <line x1="60" y1="25" x2="60" y2="95" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
                    <line x1="15" y1="60" x2="105" y2="60" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
                    <rect x="22" y="32" width="30" height="22" rx="3" fill="#fff" stroke="#d97706" strokeWidth="1"/>
                    <rect x="68" y="32" width="30" height="22" rx="3" fill="#fff" stroke="#d97706" strokeWidth="1"/>
                    <rect x="22" y="67" width="30" height="22" rx="3" fill="#fff" stroke="#d97706" strokeWidth="1"/>
                </svg>
                <div className="col-label">荷物だけ運ぶ = コンテナ</div>
            </div>
        </div>
        <div className="subtitle-text stagger-item">環境ごと持ち運ぶ、2つの方法</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">VMの仕組み</h2>
        <div className="two-col stagger-item">
            <div className="arch-card card-danger">
                <div className="card-badge badge-red">HEAVY</div>
                <div className="card-title">仮想マシン (VM)</div>
                <div className="stack-layers">
                    <div className="layer l-app">App</div>
                    <div className="layer l-guest">Guest OS 丸ごと</div>
                    <div className="layer l-hyper">Hypervisor</div>
                    <div className="layer l-hw">Hardware</div>
                </div>
                <div className="card-note">OS丸ごと = 家ごと引っ越し</div>
            </div>
            <div className="arch-card card-safe">
                <div className="card-badge badge-blue">LIGHT</div>
                <div className="card-title">コンテナ</div>
                <div className="stack-layers">
                    <div className="layer l-app">App</div>
                    <div className="layer l-engine">Container Engine</div>
                    <div className="layer l-host">Host OS (共有)</div>
                    <div className="layer l-hw">Hardware</div>
                </div>
                <div className="card-note">カーネル共有 = 段ボール引っ越し</div>
            </div>
        </div>
        <div className="footnote stagger-item">VMware (1999) がサーバー仮想化を実現</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-6">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">VMの重さ</h2>
        <div className="metric-grid stagger-item">
            <div className="metric-card"><div className="metric-value accent-coral">数GB</div><div className="metric-label">メモリ / 台</div></div>
            <div className="metric-card"><div className="metric-value accent-coral">数分</div><div className="metric-label">起動時間</div></div>
            <div className="metric-card"><div className="metric-value accent-amber">10〜15台</div><div className="metric-label">密度上限</div></div>
            <div className="metric-card"><div className="metric-value accent-coral">個別</div><div className="metric-label">パッチ管理</div></div>
        </div>
        <div className="callout callout-warn stagger-item">VM10台 = パッチ<span className="accent-coral">10回</span> — 管理コストが台数に比例</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">問い</h2>
        <div className="big-statement stagger-item">もっと<span className="accent-primary">軽く</span><br />環境を持ち運べないか？</div>
        <div className="flow-row stagger-item">
            <div className="flow-chip chip-red">VM (重い)</div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-blue">??? (軽い)</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-8">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">段ボール引っ越し = コンテナ</h2>
        <div className="pipe-row stagger-item">
            <div className="pipe-item"><div className="pipe-icon bg-primary">App</div><div className="pipe-name">アプリ</div></div>
            <div className="pipe-plus">+</div>
            <div className="pipe-item"><div className="pipe-icon bg-teal">Lib</div><div className="pipe-name">ライブラリ</div></div>
            <div className="pipe-plus">=</div>
            <div className="pipe-item"><svg viewBox="0 0 24 24" width="80" height="80" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg><div className="pipe-name" style={{ color: '#2496ed', fontWeight: '900' }}>コンテナ</div></div>
        </div>
        <div className="subtitle-text stagger-item">OSは共有、荷物（App+Lib）だけを持ち運ぶ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">コンテナの構造</h2>
        <svg className="stagger-item" viewBox="0 0 600 260" width="600" height="260">
            <rect x="30" y="200" width="540" height="45" rx="6" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5"/>
            <text x="300" y="228" textAnchor="middle" fill="#1a1d23" fontSize="15" fontWeight="700">Hardware</text>
            <rect x="30" y="148" width="540" height="45" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5"/>
            <text x="300" y="176" textAnchor="middle" fill="#4f46e5" fontSize="15" fontWeight="700"><svg viewBox="0 0 24 24" width="32" height="32" fill="#4f46e5" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/></svg> Host OS Kernel (共有)</text>
            <rect x="30" y="96" width="540" height="45" rx="6" fill="#dbeafe" stroke="#2496ed" strokeWidth="1.5"/>
            <text x="300" y="124" textAnchor="middle" fill="#2496ed" fontSize="15" fontWeight="700"><svg viewBox="0 0 24 24" width="32" height="32" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Container Runtime</text>
            <rect x="40" y="20" width="160" height="65" rx="6" fill="#f0f9ff" stroke="#2496ed" strokeWidth="1.5"/>
            <text x="120" y="48" textAnchor="middle" fill="#2496ed" fontSize="13" fontWeight="700">Container A</text>
            <text x="120" y="68" textAnchor="middle" fill="#1a1d23" fontSize="11">App + Libs</text>
            <rect x="220" y="20" width="160" height="65" rx="6" fill="#f0f9ff" stroke="#2496ed" strokeWidth="1.5"/>
            <text x="300" y="48" textAnchor="middle" fill="#2496ed" fontSize="13" fontWeight="700">Container B</text>
            <text x="300" y="68" textAnchor="middle" fill="#1a1d23" fontSize="11">App + Libs</text>
            <rect x="400" y="20" width="160" height="65" rx="6" fill="#f0f9ff" stroke="#2496ed" strokeWidth="1.5"/>
            <text x="480" y="48" textAnchor="middle" fill="#2496ed" fontSize="13" fontWeight="700">Container C</text>
            <text x="480" y="68" textAnchor="middle" fill="#1a1d23" fontSize="11">App + Libs</text>
        </svg>
        <div className="subtitle-text stagger-item">カーネルが同じなら、アプリから見た世界の「ルール」は同じ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-10">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">壁がない世界</h2>
        <div className="big-statement stagger-item">もし仕切りの<span className="accent-coral">壁</span>がなかったら？</div>
        <div className="two-col stagger-item" style={{ marginTop: '16px' }}>
            <div className="danger-card"><div className="card-badge badge-red">DANGER</div><div className="card-title">隣のデータが丸見え</div><div className="card-note">プロセス・ファイル・ネットワーク共有</div></div>
            <div className="danger-card"><div className="card-badge badge-red">DANGER</div><div className="card-title">リソース独占</div><div className="card-note">1つのアプリがCPU/メモリを食い尽くす</div></div>
        </div>
        <div className="subtitle-text stagger-item">だから「壁」が<span className="accent-primary">2種類</span>必要</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-11">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">壁① namespace</h2>
        <div className="big-statement stagger-item" style={{ fontSize: '22px' }}>「見える世界」を<span className="accent-primary">区切る</span>壁</div>
        <div className="ns-grid stagger-item">
            <div className="ns-chip"><strong>PID</strong><br />プロセス隔離</div>
            <div className="ns-chip"><strong>NET</strong><br />ネットワーク</div>
            <div className="ns-chip"><strong>MNT</strong><br />ファイルシステム</div>
            <div className="ns-chip"><strong>UTS</strong><br />ホスト名</div>
            <div className="ns-chip"><strong>IPC</strong><br />プロセス間通信</div>
            <div className="ns-chip"><strong>USER</strong><br />ユーザーID</div>
        </div>
        <div className="footnote stagger-item">シェアハウスだが各部屋に壁と鍵がある</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">壁② cgroups</h2>
        <div className="big-statement stagger-item" style={{ fontSize: '22px' }}>「使えるもの」の<span className="accent-amber">上限</span>を決める壁</div>
        <div className="metric-grid stagger-item">
            <div className="metric-card"><div className="metric-value accent-primary">CPU</div><div className="metric-label">最大 200%</div></div>
            <div className="metric-card"><div className="metric-value accent-coral">Memory</div><div className="metric-label">最大 512MB</div></div>
            <div className="metric-card"><div className="metric-value accent-teal">Disk I/O</div><div className="metric-label">制限付き</div></div>
        </div>
        <div className="source stagger-item">Google (2006) 開発 → Linux に寄贈</div>
        <div className="footnote stagger-item">ブレーカーのように、1部屋の電気使いすぎを防ぐ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-13">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">VM vs コンテナ — 数値比較</h2>
        <table className="comp-table stagger-item">
            <tr className="comp-header"><th>指標</th><th>仮想マシン</th><th>コンテナ</th></tr>
            <tr><td>起動時間</td><td className="accent-coral">数分</td><td className="accent-primary">数秒〜ミリ秒</td></tr>
            <tr><td>サイズ</td><td className="accent-coral">GB単位</td><td className="accent-primary">MB単位</td></tr>
            <tr><td>密度</td><td className="accent-coral">10〜15台</td><td className="accent-primary">数百台</td></tr>
            <tr><td>オーバーヘッド</td><td className="accent-coral">大きい</td><td className="accent-primary">5%未満</td></tr>
        </table>
        <div className="subtitle-text stagger-item">ほぼネイティブの速度で、桁違いの密度を実現</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">衝撃の事実</h2>
        <div className="big-statement stagger-item">プロセス隔離技術は<br /><span className="accent-coral">1979年</span>から存在していた</div>
        <div className="big-number stagger-item"><span className="accent-coral" style={{ fontSize: '72px' }}>45</span><span style={{ fontSize: '28px', color: '#1a1d23' }}>年以上前</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-15">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">技術の系譜</h2>
        <div className="timeline stagger-item">
            <div className="tl-item"><div className="tl-year">1979</div><div className="tl-dot"></div><div className="tl-name">chroot</div><div className="tl-desc">FS隔離</div></div>
            <div className="tl-item"><div className="tl-year">2000</div><div className="tl-dot"></div><div className="tl-name">FreeBSD Jails</div><div className="tl-desc">本格隔離</div></div>
            <div className="tl-item"><div className="tl-year">2004</div><div className="tl-dot"></div><div className="tl-name">Solaris Zones</div><div className="tl-desc">OS仮想化</div></div>
            <div className="tl-item"><div className="tl-year">2006</div><div className="tl-dot"></div><div className="tl-name">cgroups</div><div className="tl-desc">Google開発</div></div>
            <div className="tl-item"><div className="tl-year">2008</div><div className="tl-dot"></div><div className="tl-name">LXC</div><div className="tl-desc">Linuxコンテナ</div></div>
            <div className="tl-item"><div className="tl-year">2013</div><div className="tl-dot dot-hl"></div><div className="tl-name" style={{ color: '#2496ed', fontSize: '16px' }}><svg viewBox="0 0 24 24" width="32" height="32" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Docker</div><div className="tl-desc">民主化の始まり</div></div>
        </div>
        <div className="footnote stagger-item">Docker登場の5年前、ほぼ同じ技術がすでに存在した</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-16">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">驚くべき事実</h2>
        <div className="big-statement stagger-item">Dockerは<br />コンテナ技術を<br /><span className="accent-coral">発明していない</span></div>
        <div className="tag-row stagger-item" style={{ marginTop: '16px' }}>
            <span className="tag tag-muted">chroot (1979)</span>
            <span className="tag tag-muted">FreeBSD Jails (2000)</span>
            <span className="tag tag-muted">Solaris Zones (2004)</span>
            <span className="tag tag-muted">cgroups (2006)</span>
            <span className="tag tag-muted">LXC (2008)</span>
        </div>
        <div className="subtitle-text stagger-item">全部もうあった。なぜDockerだけが流行った？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item"><svg viewBox="0 0 24 24" width="40" height="40" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Dockerの核心</h2>
        <div className="big-statement stagger-item" style={{ fontSize: '22px' }}>「発明」ではなく</div>
        <div className="big-number stagger-item"><span className="accent-primary" style={{ fontSize: '52px' }}>「民主化」</span></div>
        <div className="subtitle-text stagger-item">専門家だけの秘密兵器を、誰でも使えるツールにした</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-18">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">LXC vs Docker</h2>
        <div className="two-col stagger-item">
            <div className="arch-card card-danger">
                <div className="card-badge badge-red">BEFORE</div>
                <div className="card-title">LXC</div>
                <div className="code-box"><div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> config</div><div className="code-body">lxc.utsname = mycontainer
lxc.network.type = veth
lxc.network.flags = up
lxc.rootfs = /var/lib/lxc/...
<span className="code-dim"># + 数十行の設定...</span></div></div>
                <div className="card-note">Linuxカーネル知識が必須</div>
            </div>
            <div className="arch-card card-safe">
                <div className="card-badge badge-blue">AFTER</div>
                <div className="card-title"><svg viewBox="0 0 24 24" width="44" height="44" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Docker</div>
                <div className="code-box"><div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> Dockerfile</div><div className="code-body"><span className="kw">FROM</span> python:3.10
<span className="kw">COPY</span> . /app
<span className="kw">RUN</span> pip install -r req.txt
<span className="kw">CMD</span> ["python", "app.py"]
<span className="code-dim"># たった4行で完了!</span></div></div>
                <div className="card-note">誰でも書ける簡潔さ</div>
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
        <h2 className="scene-title stagger-item">3つのイノベーション</h2>
        <div className="num-list">
            <div className="num-item stagger-item"><div className="num-circle">1</div><div><div className="num-title accent-primary">Dockerfile</div><div className="num-desc">テキストに手順を書くだけで同じ環境を再現</div></div></div>
            <div className="num-item stagger-item"><div className="num-circle bg-teal">2</div><div><div className="num-title accent-teal">Docker Hub</div><div className="num-desc">イメージを共有するGitHub的プラットフォーム</div></div></div>
            <div className="num-item stagger-item"><div className="num-circle bg-amber">3</div><div><div className="num-title accent-amber">レイヤードイメージ</div><div className="num-desc">変更のあった層だけ転送、ダウンロード高速化</div></div></div>
        </div>
        <div className="footnote stagger-item">同じ材料・同じ手順 = 同じ結果（料理のレシピ）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-20">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item"><svg viewBox="0 0 24 24" width="44" height="44" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Docker Hub</h2>
        <div className="hub-flow stagger-item">
            <div className="hub-node">Developer A<br /><small>イメージ作成</small></div>
            <div className="hub-arr">→ push →</div>
            <div className="hub-center"><svg viewBox="0 0 24 24" width="44" height="44" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg><br /><strong>Docker Hub</strong><br /><small>中央リポジトリ</small></div>
            <div className="hub-arr">→ pull →</div>
            <div className="hub-node">Developer B<br /><small>同じ環境を取得</small></div>
        </div>
        <div className="subtitle-text stagger-item">「Ubuntu + Python 3.10 + TensorFlow」をDLするだけ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">レイヤードイメージ</h2>
        <div className="layer-stack stagger-item">
            <div className="layer-row l4">App Code (自分のコード)<span className="layer-sz">5 MB</span></div>
            <div className="layer-row l3">Dependencies (pip install)<span className="layer-sz">120 MB</span></div>
            <div className="layer-row l2">Python 3.10 Runtime<span className="layer-sz">45 MB</span></div>
            <div className="layer-row l1">Base OS (Ubuntu slim)<span className="layer-sz">80 MB</span></div>
        </div>
        <div className="flow-row stagger-item" style={{ marginTop: '12px' }}>
            <div className="flow-chip chip-teal">共通レイヤー = 使い回し</div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-blue">変更分だけ転送</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-22">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">民主化の構造</h2>
        <div className="two-col stagger-item">
            <div className="arch-card" style={{ borderColor: '#f59e0b' }}>
                <div className="card-badge badge-amber">ANALOGY</div>
                <div className="card-title">iPhone</div>
                <div className="card-note">タッチスクリーン・GPS・カメラ<br />全部前からあった技術を<br /><span className="accent-amber">統合して誰でも使えるように</span></div>
            </div>
            <div className="eq-sign">=</div>
            <div className="arch-card card-safe">
                <div className="card-badge badge-blue">SAME</div>
                <div className="card-title"><svg viewBox="0 0 24 24" width="44" height="44" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Docker</div>
                <div className="card-note">namespace・cgroups・UnionFS<br />全部前からあった技術を<br /><span className="accent-primary">統合して誰でも使えるように</span></div>
            </div>
        </div>
        <div className="source stagger-item">dotCloud社（パリ）→ 2013年3月 PyCon US</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">もう1つの物語</h2>
        <div className="big-statement stagger-item" style={{ border: '2px solid #ef4444', borderRadius: '12px', padding: '24px', background: '#fef2f2' }}>技術の<span className="accent-primary">大成功</span>は<br />企業の<span className="accent-coral">大成功</span>を<br />意味するのか？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-24">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item"><svg viewBox="0 0 24 24" width="44" height="44" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Docker Inc. の軌跡</h2>
        <svg className="stagger-item" viewBox="0 0 600 240" width="600" height="240">
            <line x1="50" y1="200" x2="580" y2="200" stroke="#9ca3af" strokeWidth="1.5"/>
            <line x1="50" y1="30" x2="50" y2="200" stroke="#9ca3af" strokeWidth="1.5"/>
            <text x="110" y="218" textAnchor="middle" fill="#1a1d23" fontSize="12">2013</text>
            <text x="220" y="218" textAnchor="middle" fill="#1a1d23" fontSize="12">2015</text>
            <text x="330" y="218" textAnchor="middle" fill="#1a1d23" fontSize="12">2017</text>
            <text x="440" y="218" textAnchor="middle" fill="#1a1d23" fontSize="12">2019</text>
            <text x="550" y="218" textAnchor="middle" fill="#1a1d23" fontSize="12">2021</text>
            <path d="M110,190 L170,160 L220,110 L275,70 L330,45" fill="none" stroke="#2496ed" strokeWidth="2.5"/>
            <path d="M330,45 L385,55 L440,150" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6"/>
            <path d="M440,150 L495,140 L550,125" fill="none" stroke="#14b8a6" strokeWidth="2.5"/>
            <circle cx="330" cy="45" r="5" fill="#2496ed"/><text x="330" y="35" textAnchor="middle" fill="#2496ed" fontSize="11" fontWeight="700">$1B超</text>
            <circle cx="440" cy="150" r="5" fill="#ef4444"/><text x="440" y="168" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="700">事業売却</text>
            <circle cx="550" cy="125" r="5" fill="#14b8a6"/><text x="550" y="115" textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="700">復活中</text>
        </svg>
        <div className="subtitle-text stagger-item">累計$270M+調達 → ユニコーン → 事業売却 → 再出発</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene25: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-25">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">オーケストレーション問題</h2>
        <div className="big-statement stagger-item" style={{ fontSize: '20px' }}>何百〜何千のコンテナを<span className="accent-coral">どう管理する？</span></div>
        <div className="metric-grid stagger-item" style={{ marginTop: '12px' }}>
            <div className="metric-card"><div className="metric-value" style={{ fontSize: '18px' }}>配置</div><div className="metric-label">どのサーバーで</div></div>
            <div className="metric-card"><div className="metric-value" style={{ fontSize: '18px' }}>復旧</div><div className="metric-label">壊れたら再起動</div></div>
            <div className="metric-card"><div className="metric-value" style={{ fontSize: '18px' }}>拡張</div><div className="metric-label">負荷に応じて増減</div></div>
        </div>
        <div className="footnote stagger-item">オーケストラの指揮者のように全体をまとめる存在</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene26: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-26">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">Swarm vs Kubernetes</h2>
        <div className="two-col stagger-item">
            <div className="arch-card card-danger">
                <div className="card-badge badge-red">LOSER</div>
                <div className="card-title"><svg viewBox="0 0 24 24" width="32" height="32" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Docker Swarm</div>
                <div className="card-note">Docker Inc. 自社製品<br />シンプルだが機能面で劣る<br /><strong>1社の製品</strong></div>
            </div>
            <div className="arch-card card-safe">
                <div className="card-badge badge-blue">WINNER</div>
                <div className="card-title"><svg viewBox="0 0 24 24" width="32" height="32" fill="#326ce5" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 01-2.075-2.597l2.578-.437.004.005a.44.44 0 01.484.606zm-.833-2.129a.44.44 0 00.173-.756l.002-.011L7.585 9.7a5.143 5.143 0 00-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 00.699-.337l.01-.005.15-2.62a5.144 5.144 0 00-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 00.7.336l.008.003 2.134-1.513a5.188 5.188 0 00-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 01-1.248.594l-9.261.003a1.6 1.6 0 01-1.247-.596l-5.776-7.18a1.583 1.583 0 01-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 011.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 00-.105-2.332 6.465 6.465 0 00-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 00-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 01-.162.258l-.012.211a6.424 6.424 0 00-4.166 2.003 8.373 8.373 0 01-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 00-.348-.132.481.481 0 00-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 00-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 002.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 004.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 002.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 00.173.757l.003.01 2.526.728a5.199 5.199 0 00-.108-1.674A5.208 5.208 0 0016.4 9.7zm-4.013 5.325a.437.437 0 00-.404-.232.44.44 0 00-.372.233h-.002l-1.268 2.292a5.164 5.164 0 003.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 00-.27.036.44.44 0 00-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 002.081-2.615l-2.6-.44-.004.005z"/></svg> Kubernetes</div>
                <div className="card-note">Google社内10年の実績<br />CNCF中立財団に寄贈<br /><strong>業界全体の標準</strong></div>
            </div>
        </div>
        <div className="source stagger-item">K8s: 2014年発表 → 2015年 CNCF寄贈 → AWS/Azure/GCP全採用</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene27: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-27">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item"><svg viewBox="0 0 24 24" width="44" height="44" fill="#326ce5" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 01-2.075-2.597l2.578-.437.004.005a.44.44 0 01.484.606zm-.833-2.129a.44.44 0 00.173-.756l.002-.011L7.585 9.7a5.143 5.143 0 00-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 00.699-.337l.01-.005.15-2.62a5.144 5.144 0 00-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 00.7.336l.008.003 2.134-1.513a5.188 5.188 0 00-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 01-1.248.594l-9.261.003a1.6 1.6 0 01-1.247-.596l-5.776-7.18a1.583 1.583 0 01-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 011.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 00-.105-2.332 6.465 6.465 0 00-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 00-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 01-.162.258l-.012.211a6.424 6.424 0 00-4.166 2.003 8.373 8.373 0 01-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 00-.348-.132.481.481 0 00-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 00-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 002.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 004.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 002.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 00.173.757l.003.01 2.526.728a5.199 5.199 0 00-.108-1.674A5.208 5.208 0 0016.4 9.7zm-4.013 5.325a.437.437 0 00-.404-.232.44.44 0 00-.372.233h-.002l-1.268 2.292a5.164 5.164 0 003.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 00-.27.036.44.44 0 00-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 002.081-2.615l-2.6-.44-.004.005z"/></svg> Kubernetesの圧倒的普及</h2>
        <div className="bar-chart stagger-item">
            <div className="bar-row"><div className="bar-label">Kubernetes</div><div className="bar-track"><div className="bar-fill bf-primary" style={{ '--w': '92%' } as React.CSSProperties}></div></div><div className="bar-val">92%</div></div>
            <div className="bar-row"><div className="bar-label">Swarm</div><div className="bar-track"><div className="bar-fill bf-coral" style={{ '--w': '8%' } as React.CSSProperties}></div></div><div className="bar-val">5%</div></div>
            <div className="bar-row"><div className="bar-label">Nomad</div><div className="bar-track"><div className="bar-fill bf-amber" style={{ '--w': '5%' } as React.CSSProperties}></div></div><div className="bar-val">3%</div></div>
        </div>
        <div className="source stagger-item">コンテナオーケストレーション市場シェア</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene28: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-28">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">転落と再起</h2>
        <div className="flow-chain stagger-item">
            <div className="fc-node"><div className="fc-year accent-coral">2019</div><div>エンタープライズ部門<br /><strong className="accent-coral">Mirantisに売却</strong></div></div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year accent-coral">削減</div><div>従業員<br /><strong className="accent-coral">大幅削減</strong></div></div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year accent-amber">再出発</div><div>$35M調達<br /><strong className="accent-amber">やり直し</strong></div></div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: '#14b8a6' }}><div className="fc-year accent-teal">現在</div><div>Desktop + Hub<br /><strong className="accent-teal">復活中</strong></div></div>
        </div>
        <div className="footnote stagger-item">「技術を作った会社」≠「技術で儲ける会社」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene29: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-29">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">振り返り</h2>
        <div className="big-statement stagger-item">自分のパソコンでは動くのに<br />別のパソコンだと<span className="accent-coral">動かない</span></div>
        <div className="quote-block stagger-item" style={{ marginTop: '16px' }}>
            <div className="quote-mark">"</div>
            <div className="quote-body">It works on <span className="accent-primary">my machine</span></div>
            <div className="quote-attr">この問題に対する答えがDockerだった</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene30: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-30">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">解決の道筋</h2>
        <div className="pipe-row stagger-item">
            <div className="pipe-item"><div className="pipe-icon bg-coral">VM</div><div className="pipe-name">家ごと引っ越し</div></div>
            <div className="pipe-plus">→</div>
            <div className="pipe-item"><div className="pipe-icon bg-amber">ns</div><div className="pipe-name">見えるものを区切る</div></div>
            <div className="pipe-plus">+</div>
            <div className="pipe-item"><div className="pipe-icon bg-teal">cg</div><div className="pipe-name">使えるものを制限</div></div>
            <div className="pipe-plus">→</div>
            <div className="pipe-item"><svg viewBox="0 0 24 24" width="40" height="40" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg><div className="pipe-name" style={{ color: '#2496ed', fontWeight: '900' }}>Docker 民主化</div></div>
        </div>
        <div className="subtitle-text stagger-item">1979年のchrootから始まった技術をDockerが「使えるもの」にした</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene31: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-31">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">3つの教訓</h2>
        <div className="lesson-cards">
            <div className="lesson-card stagger-item" style={{ borderTop: '3px solid var(--primary)' }}><div className="lesson-num">1</div><div className="lesson-title">イノベーション ≠ 発明</div><div className="lesson-desc">「使いやすくすること」も偉大</div></div>
            <div className="lesson-card stagger-item" style={{ borderTop: '3px solid #ef4444' }}><div className="lesson-num" style={{ color: '#ef4444' }}>2</div><div className="lesson-title">技術の成功 ≠ 企業の成功</div><div className="lesson-desc">Docker Inc. vs Kubernetes</div></div>
            <div className="lesson-card stagger-item" style={{ borderTop: '3px solid #14b8a6' }}><div className="lesson-num" style={{ color: '#14b8a6' }}>3</div><div className="lesson-title">道を切り開いた功績</div><div className="lesson-desc">クラウドネイティブの世界はDockerが作った</div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene32: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-32">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">結論</h2>
        <div className="quote-block stagger-item">
            <div className="quote-mark">"</div>
            <div className="quote-body">動かないって言われたら<br /><span className="accent-primary">Dockerで送ればいい</span></div>
            <div className="quote-attr">段ボールごと送れば、環境の違いは関係ない</div>
        </div>
        <div className="stagger-item" style={{ marginTop: '20px' }}><svg viewBox="0 0 24 24" width="80" height="80" fill="#2496ed" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg></div>
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
    25: Scene25,
    26: Scene26,
    27: Scene27,
    28: Scene28,
    29: Scene29,
    30: Scene30,
    31: Scene31,
    32: Scene32,
};

export const TOTAL_SCENE_COUNT = 33;
