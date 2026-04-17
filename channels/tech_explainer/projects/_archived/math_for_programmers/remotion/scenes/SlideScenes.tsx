import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="title-large">プログラマーに<br /><span className="accent-primary">数学</span>は必要か</div>
        <div className="big-statement" style={{ fontSize: '28px' }}>意見が真っ二つに割れるこの問い、本当の答えは？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">「数学」って聞いて何を思い浮かべる？</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <rect x="20" y="20" width="220" height="240" rx="16" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="130" y="80" textAnchor="middle" fontSize="40" fontWeight="900" fill="#6366f1">∫ dx</text>
            <text x="130" y="130" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">微積分</text>
            <rect x="280" y="20" width="220" height="240" rx="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="390" y="75" textAnchor="middle" fontSize="32" fontWeight="900" fill="#f59e0b">[a b]</text>
            <text x="390" y="110" textAnchor="middle" fontSize="32" fontWeight="900" fill="#f59e0b">[c d]</text>
            <text x="390" y="150" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">行列</text>
            <rect x="540" y="20" width="220" height="240" rx="16" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="650" y="80" textAnchor="middle" fontSize="36" fontWeight="900" fill="#0d9488">sin cos</text>
            <text x="650" y="130" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">三角関数</text>
            <text x="130" y="220" textAnchor="middle" fontSize="18" fill="#1a1d23">高校で必死に覚えた</text>
            <text x="390" y="220" textAnchor="middle" fontSize="18" fill="#1a1d23">大学で挫折した</text>
            <text x="650" y="220" textAnchor="middle" fontSize="18" fill="#1a1d23">テスト前だけ覚えた</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '28px' }}>でも「数学＝数式」というイメージ自体が<span className="accent-coral">罠</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">微積分を使う職種は…</div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-coral">5%</div>
                <div className="metric-label">微積分を使う職種</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-primary">99.5%</div>
                <div className="metric-label">離散数学が必修のCS学位</div>
            </div>
        </div>
        <div className="source">出典: Northeastern大学 Handel研究 / ACM 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">数学から数式を取り除くと…</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <rect x="40" y="20" width="300" height="240" rx="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" strokeDasharray="8,4"/>
            <line x1="100" y1="80" x2="280" y2="80" stroke="#ef4444" strokeWidth="3"/>
            <line x1="70" y1="80" x2="310" y2="80" stroke="#ef4444" strokeWidth="3" strokeDasharray="0" opacity="0.3"/>
            <text x="190" y="75" textAnchor="middle" fontSize="28" fontWeight="700" fill="#ef4444" textDecoration="line-through">∫ sin cos x²</text>
            <text x="190" y="120" textAnchor="middle" fontSize="20" fill="#1a1d23">微積分・方程式</text>
            <text x="190" y="160" textAnchor="middle" fontSize="48" fill="#ef4444">✕</text>
            <text x="390" y="145" fontSize="48" fill="#6366f1" fontWeight="900">→</text>
            <rect x="440" y="20" width="300" height="240" rx="16" fill="#e0e7ff" stroke="#6366f1" strokeWidth="3"/>
            <text x="590" y="80" textAnchor="middle" fontSize="28" fontWeight="900" fill="#6366f1">A ならば B</text>
            <text x="590" y="120" textAnchor="middle" fontSize="28" fontWeight="900" fill="#6366f1">A かつ B</text>
            <text x="590" y="160" textAnchor="middle" fontSize="28" fontWeight="900" fill="#6366f1">A でない</text>
            <text x="590" y="210" textAnchor="middle" fontSize="24" fontWeight="700" fill="#1a1d23">論 理</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '28px' }}>残るのは推論の<span className="accent-primary">骨組み</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">ジョージ・ブール（1854年）</div>
        <svg viewBox="0 0 780 300" width="780" height="300">
            <rect x="20" y="10" width="230" height="130" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="135" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#6366f1">AND</text>
            <text x="135" y="80" textAnchor="middle" fontSize="18" fill="#1a1d23">1 AND 1 = 1</text>
            <text x="135" y="105" textAnchor="middle" fontSize="18" fill="#1a1d23">1 AND 0 = 0</text>
            <rect x="275" y="10" width="230" height="130" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="390" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">OR</text>
            <text x="390" y="80" textAnchor="middle" fontSize="18" fill="#1a1d23">1 OR 0 = 1</text>
            <text x="390" y="105" textAnchor="middle" fontSize="18" fill="#1a1d23">0 OR 0 = 0</text>
            <rect x="530" y="10" width="230" height="130" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="645" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ef4444">NOT</text>
            <text x="645" y="80" textAnchor="middle" fontSize="18" fill="#1a1d23">NOT 1 = 0</text>
            <text x="645" y="105" textAnchor="middle" fontSize="18" fill="#1a1d23">NOT 0 = 1</text>
            <text x="390" y="180" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">「正しい」か「正しくない」か ── 1と0だけで論理を組み立てる</text>
            <rect x="140" y="210" width="500" height="70" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="390" y="255" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">当時は純粋な数学。実用的な使い道は誰も知らなかった</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">80年後、数学が回路になった</div>
        <div className="flow-chain">
            <div className="fc-node" style={{ borderColor: 'var(--primary)' }}>
                <div className="node-title">ブール代数</div>
                <div className="node-sub">1854年</div>
                <div className="node-sub">1 と 0 の論理</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--amber)' }}>
                <div className="node-title">シャノンの論文</div>
                <div className="node-sub">1937年</div>
                <div className="node-sub">MIT修士論文</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--teal)' }}>
                <div className="node-title">デジタル回路</div>
                <div className="node-sub">ON / OFF</div>
                <div className="node-sub">= 1 / 0</div>
            </div>
        </div>
        <div className="big-statement" style={{ fontSize: '24px' }}>「20世紀で最も重要な修士論文」と評される</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">if文の正体</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <rect x="20" y="10" width="340" height="260" rx="16" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="190" y="45" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6366f1">ブール代数</text>
            <text x="190" y="90" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">A AND B → 1</text>
            <text x="190" y="130" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">A OR B → 1</text>
            <text x="190" y="170" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">NOT A → 0</text>
            <text x="190" y="240" textAnchor="middle" fontSize="16" fill="#1a1d23">1854年</text>
            <text x="390" y="145" fontSize="48" fill="#f59e0b" fontWeight="900">=</text>
            <rect x="420" y="10" width="340" height="260" rx="16" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="590" y="45" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">プログラミング</text>
            <text x="590" y="90" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">if (a && b)</text>
            <text x="590" y="130" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">if (a || b)</text>
            <text x="590" y="170" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">if (!a)</text>
            <text x="590" y="240" textAnchor="middle" fontSize="16" fill="#1a1d23">現代</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '24px' }}>if文を書くたびに、あなたは<span className="accent-primary">数学をやっている</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">溶け込みすぎて気づかない</div>
        <svg viewBox="0 0 780 260" width="780" height="260">
            <rect x="40" y="20" width="700" height="220" rx="20" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <circle cx="200" cy="130" r="80" fill="#e0e7ff" opacity="0.6"/>
            <text x="200" y="125" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6366f1">数学</text>
            <text x="200" y="150" textAnchor="middle" fontSize="14" fill="#6366f1">論理・ブール代数</text>
            <circle cx="580" cy="130" r="80" fill="#ccfbf1" opacity="0.6"/>
            <text x="580" y="125" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">コード</text>
            <text x="580" y="150" textAnchor="middle" fontSize="14" fill="#0d9488">if / && / || / !</text>
            <line x1="280" y1="130" x2="500" y2="130" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8,4"/>
            <text x="390" y="120" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f59e0b">同じもの</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '26px' }}>でも「論理＝数学」だと何でも数学になる？<br />→ 分野別に見てみよう</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">分野による数学の必要度</div>
        <svg viewBox="0 0 780 240" width="780" height="240">
            <defs>
                <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ccfbf1"/>
                    <stop offset="50%" stopColor="#fef3c7"/>
                    <stop offset="100%" stopColor="#fee2e2"/>
                </linearGradient>
            </defs>
            <rect x="40" y="60" width="700" height="50" rx="25" fill="url(#specGrad)" stroke="#d1d5db" strokeWidth="2"/>
            <text x="40" y="45" fontSize="16" fontWeight="700" fill="#0d9488">ほぼゼロ</text>
            <text x="700" y="45" textAnchor="end" fontSize="16" fontWeight="700" fill="#ef4444">ガチで必要</text>
            <circle cx="120" cy="85" r="14" fill="#0d9488"/>
            <text x="120" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">Web開発</text>
            <text x="120" y="160" textAnchor="middle" fontSize="14" fill="#1a1d23">四則演算</text>
            <circle cx="340" cy="85" r="14" fill="#f59e0b"/>
            <text x="340" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">ゲーム開発</text>
            <text x="340" y="160" textAnchor="middle" fontSize="14" fill="#1a1d23">三角関数・行列</text>
            <circle cx="540" cy="85" r="14" fill="#ef4444"/>
            <text x="540" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">AI / ML</text>
            <text x="540" y="160" textAnchor="middle" fontSize="14" fill="#1a1d23">線形代数・微積分</text>
            <circle cx="680" cy="85" r="14" fill="#ef4444"/>
            <text x="680" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">暗号技術</text>
            <text x="680" y="160" textAnchor="middle" fontSize="14" fill="#1a1d23">整数論</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '24px' }}>「必要か？」ではなく「<span className="accent-primary">どこで何が必要か</span>」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">Web開発の数学</div>
        <div className="three-col">
            <div className="arch-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
                <div className="card-title">JavaScript</div>
                <div className="card-body">四則演算<br />条件分岐</div>
            </div>
            <div className="arch-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <div className="card-title">React</div>
                <div className="card-body">状態管理<br />イベント処理</div>
            </div>
            <div className="arch-card" style={{ borderColor: 'var(--teal)' }}>
                <div className="text-badge text-badge-block">SQL</div>
                <div className="card-title">データベース</div>
                <div className="card-body">集合演算<br />JOIN / WHERE</div>
            </div>
        </div>
        <div className="big-statement" style={{ fontSize: '24px' }}>約<span className="accent-teal">90%</span>のWeb開発者は基本的な代数以上を必要としない</div>
        <div className="source">出典: Web Dev Simplified（実感ベースの推定）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">ゲーム開発の数学</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <rect x="20" y="10" width="240" height="200" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="140" y="45" textAnchor="middle" fontSize="18" fontWeight="900" fill="#f59e0b">3D回転</text>
            <text x="140" y="80" textAnchor="middle" fontSize="16" fill="#1a1d23">回転行列</text>
            <rect x="60" y="100" width="60" height="60" rx="4" fill="none" stroke="#6366f1" strokeWidth="2" transform="rotate(25,90,130)"/>
            <text x="140" y="190" textAnchor="middle" fontSize="14" fill="#1a1d23">行列 × ベクトル</text>
            <rect x="280" y="10" width="220" height="200" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="390" y="45" textAnchor="middle" fontSize="18" fontWeight="900" fill="#6366f1">光の反射</text>
            <text x="390" y="80" textAnchor="middle" fontSize="16" fill="#1a1d23">三角関数</text>
            <line x1="310" y1="140" x2="380" y2="110" stroke="#f59e0b" strokeWidth="2"/>
            <line x1="380" y1="110" x2="450" y2="140" stroke="#6366f1" strokeWidth="2"/>
            <line x1="380" y1="110" x2="380" y2="170" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4,4"/>
            <text x="390" y="190" textAnchor="middle" fontSize="14" fill="#1a1d23">sin / cos / tan</text>
            <rect x="520" y="10" width="240" height="200" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="640" y="45" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">物理演算</text>
            <text x="640" y="80" textAnchor="middle" fontSize="16" fill="#1a1d23">微分方程式</text>
            <path d="M560,130 Q600,90 640,130 Q680,170 720,130" fill="none" stroke="#0d9488" strokeWidth="2"/>
            <circle cx="640" cy="130" r="8" fill="#0d9488"/>
            <text x="640" y="190" textAnchor="middle" fontSize="14" fill="#1a1d23">放物線・衝突判定</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '22px' }}>エンジンの裏側には<span className="accent-amber">数学がびっしり</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">AI / 機械学習の数学</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <rect x="20" y="20" width="240" height="180" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="140" y="55" textAnchor="middle" fontSize="18" fontWeight="900" fill="#6366f1">線形代数</text>
            <text x="80" y="100" fontSize="20" fill="#1a1d23">[w₁ w₂]</text>
            <text x="80" y="130" fontSize="20" fill="#1a1d23">[w₃ w₄]</text>
            <text x="140" y="175" textAnchor="middle" fontSize="14" fill="#1a1d23">重み行列の計算</text>
            <rect x="280" y="20" width="220" height="180" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="390" y="55" textAnchor="middle" fontSize="18" fontWeight="900" fill="#ef4444">微積分</text>
            <path d="M310,120 Q350,70 390,110 Q430,150 470,90" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <circle cx="430" cy="135" r="6" fill="#ef4444"/>
            <line x1="430" y1="135" x2="430" y2="95" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4"/>
            <text x="390" y="175" textAnchor="middle" fontSize="14" fill="#1a1d23">勾配降下法</text>
            <rect x="520" y="20" width="240" height="180" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="640" y="55" textAnchor="middle" fontSize="18" fontWeight="900" fill="#f59e0b">確率統計</text>
            <rect x="560" y="80" width="20" height="50" fill="#f59e0b" opacity="0.6"/>
            <rect x="590" y="65" width="20" height="65" fill="#f59e0b" opacity="0.7"/>
            <rect x="620" y="90" width="20" height="40" fill="#f59e0b" opacity="0.8"/>
            <rect x="650" y="70" width="20" height="60" fill="#f59e0b" opacity="0.9"/>
            <rect x="680" y="95" width="20" height="35" fill="#f59e0b"/>
            <text x="640" y="175" textAnchor="middle" fontSize="14" fill="#1a1d23">ベイズ推定・分布</text>
            <text x="390" y="240" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">AI/MLの三本柱</text>
        </svg>
        <div className="source">出典: edX / Coursera 公式ガイド</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">暗号技術の数学</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <rect x="30" y="30" width="160" height="100" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="110" y="70" textAnchor="middle" fontSize="28" fontWeight="900" fill="#6366f1">p</text>
            <text x="110" y="105" textAnchor="middle" fontSize="16" fill="#1a1d23">大きな素数</text>
            <text x="220" y="85" fontSize="32" fontWeight="900" fill="#1a1d23">×</text>
            <rect x="250" y="30" width="160" height="100" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="330" y="70" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0d9488">q</text>
            <text x="330" y="105" textAnchor="middle" fontSize="16" fill="#1a1d23">大きな素数</text>
            <text x="440" y="85" fontSize="32" fontWeight="900" fill="#1a1d23">=</text>
            <rect x="470" y="30" width="280" height="100" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="610" y="70" textAnchor="middle" fontSize="28" fontWeight="900" fill="#f59e0b">N = p × q</text>
            <text x="610" y="105" textAnchor="middle" fontSize="16" fill="#1a1d23">公開鍵</text>
            <path d="M390,160 L250,200" stroke="#0d9488" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
            <path d="M390,160 L530,200" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
            <defs>
                <marker id="arrowGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0d9488"/></marker>
                <marker id="arrowRed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ef4444"/></marker>
            </defs>
            <rect x="110" y="210" width="260" height="55" rx="10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="240" y="243" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">掛け算 → 一瞬</text>
            <rect x="410" y="210" width="260" height="55" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="540" y="243" textAnchor="middle" fontSize="18" fontWeight="700" fill="#ef4444">素因数分解 → 天文学的</text>
        </svg>
        <div className="source">出典: Cornell大学 RSA解説</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">料理に火は必要か？</div>
        <svg viewBox="0 0 780 260" width="780" height="260">
            <rect x="40" y="20" width="330" height="220" rx="16" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="205" y="60" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">サラダ</text>
            <text x="205" y="100" textAnchor="middle" fontSize="48">🥗</text>
            <text x="205" y="155" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">火は不要</text>
            <text x="205" y="185" textAnchor="middle" fontSize="16" fill="#1a1d23">= Web開発に微積分は不要</text>
            <rect x="410" y="20" width="330" height="220" rx="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="575" y="60" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ef4444">ステーキ</text>
            <text x="575" y="100" textAnchor="middle" fontSize="48">🥩</text>
            <text x="575" y="155" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">火は必須</text>
            <text x="575" y="185" textAnchor="middle" fontSize="16" fill="#1a1d23">= AI開発に線形代数は必須</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '24px' }}>分野によって答えが変わる。でも本当に<span className="accent-primary">ゼロ</span>でいい？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">驚きの研究結果</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">プログラミング学習速度を最もよく予測するのは<span className="accent-primary">言語適性</span>であり、数的能力の説明力はわずか<span className="accent-coral">2%</span>にすぎない</div>
            <div className="quote-source">ワシントン大学 (2020) — Nature Scientific Reports</div>
        </div>
        <div className="big-statement" style={{ fontSize: '24px' }}>プログラミングの習得は「第二言語の習得」に近い</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">何がプログラミング力を予測する？</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <text x="40" y="40" fontSize="16" fontWeight="700" fill="#1a1d23">Python学習速度の予測因子</text>
            <rect x="40" y="60" width="540" height="44" rx="6" fill="#6366f1"/>
            <text x="50" y="87" fontSize="18" fontWeight="700" fill="#ffffff">言語適性</text>
            <text x="590" y="87" fontSize="18" fontWeight="900" fill="#6366f1">最大</text>
            <rect x="40" y="120" width="350" height="44" rx="6" fill="#0d9488"/>
            <text x="50" y="147" fontSize="18" fontWeight="700" fill="#ffffff">推論力・問題解決</text>
            <text x="400" y="147" fontSize="18" fontWeight="900" fill="#0d9488">中</text>
            <rect x="40" y="180" width="80" height="44" rx="6" fill="#ef4444"/>
            <text x="130" y="207" fontSize="18" fontWeight="700" fill="#ef4444">数的能力</text>
            <text x="260" y="207" fontSize="18" fontWeight="900" fill="#ef4444">2%</text>
            <text x="390" y="260" textAnchor="middle" fontSize="16" fill="#1a1d23">でもこれで「数学不要」と結論づけるのは早い…</text>
        </svg>
        <div className="source">出典: Nature Scientific Reports (2020)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">もう一つの研究</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <text x="390" y="35" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">計算論的思考(CT)との相関</text>
            <rect x="80" y="60" width="280" height="180" rx="16" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="220" y="100" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6366f1">数学の成績</text>
            <text x="220" y="160" textAnchor="middle" fontSize="64" fontWeight="900" fill="#6366f1">0.74</text>
            <text x="220" y="210" textAnchor="middle" fontSize="16" fill="#1a1d23">非常に強い相関</text>
            <rect x="420" y="60" width="280" height="180" rx="16" fill="var(--card-bg)" stroke="#d1d5db" strokeWidth="2"/>
            <text x="560" y="100" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d1d5db">歴史の成績</text>
            <text x="560" y="160" textAnchor="middle" fontSize="64" fontWeight="900" fill="#d1d5db">0.17</text>
            <text x="560" y="210" textAnchor="middle" fontSize="16" fill="#d1d5db">弱い相関</text>
        </svg>
        <div className="source">出典: ScienceDirect メタ分析</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">「知識」と「思考」は別物</div>
        <svg viewBox="0 0 780 300" width="780" height="300">
            <rect x="40" y="20" width="330" height="250" rx="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="205" y="60" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ef4444">数学の知識</text>
            <text x="205" y="100" textAnchor="middle" fontSize="18" fill="#1a1d23">微積分の公式</text>
            <text x="205" y="130" textAnchor="middle" fontSize="18" fill="#1a1d23">連立方程式の解法</text>
            <text x="205" y="160" textAnchor="middle" fontSize="18" fill="#1a1d23">行列の固有値</text>
            <line x1="100" y1="190" x2="310" y2="190" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4"/>
            <text x="205" y="220" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ef4444">プログラミングとの</text>
            <text x="205" y="245" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ef4444">相関: ほぼなし</text>
            <rect x="410" y="20" width="330" height="250" rx="16" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="575" y="60" textAnchor="middle" fontSize="22" fontWeight="900" fill="#6366f1">数学的思考</text>
            <text x="575" y="100" textAnchor="middle" fontSize="18" fill="#1a1d23">問題を分解する</text>
            <text x="575" y="130" textAnchor="middle" fontSize="18" fill="#1a1d23">パターンを見抜く</text>
            <text x="575" y="160" textAnchor="middle" fontSize="18" fill="#1a1d23">抽象化して考える</text>
            <line x1="470" y1="190" x2="680" y2="190" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,4"/>
            <text x="575" y="220" textAnchor="middle" fontSize="16" fontWeight="700" fill="#6366f1">プログラミングとの</text>
            <text x="575" y="245" textAnchor="middle" fontSize="16" fontWeight="700" fill="#6366f1">相関: 非常に強い</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">コーディングでも鍛えられる</div>
        <svg viewBox="0 0 780 260" width="780" height="260">
            <rect x="40" y="30" width="700" height="80" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="80" y="65" fontSize="18" fontWeight="700" fill="#1a1d23">for i in range(n):</text>
            <text x="100" y="92" fontSize="18" fontWeight="700" fill="#1a1d23">  for j in range(n):  →  O(n²)</text>
            <path d="M390,110 L390,140" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
            <defs>
                <marker id="arrowPurple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#6366f1"/></marker>
            </defs>
            <rect x="140" y="150" width="500" height="80" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="390" y="185" textAnchor="middle" fontSize="20" fontWeight="700" fill="#6366f1">「データが増えたら急に遅くなった」</text>
            <text x="390" y="215" textAnchor="middle" fontSize="18" fill="#1a1d23">= Big O記法と同じ直感を使っている</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '24px' }}>テストの点数じゃなく、考え方の<span className="accent-primary">筋トレ</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">同じ根っこの2本の木</div>
        <svg viewBox="0 0 780 300" width="780" height="300">
            {/* 根（論理的思考） */}
            <rect x="310" y="240" width="160" height="50" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
            <text x="390" y="272" textAnchor="middle" fontSize="18" fontWeight="900" fill="#f59e0b">論理的思考</text>
            {/* 幹：根→左右の大きなノード */}
            <line x1="350" y1="240" x2="200" y2="175" stroke="#6366f1" strokeWidth="3"/>
            <line x1="430" y1="240" x2="580" y2="175" stroke="#0d9488" strokeWidth="3"/>
            {/* 左：数学ノード */}
            <circle cx="200" cy="135" r="50" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="200" y="130" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6366f1">数学</text>
            <text x="200" y="152" textAnchor="middle" fontSize="14" fill="#6366f1">公式・証明</text>
            {/* 右：コードノード */}
            <circle cx="580" cy="135" r="50" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="580" y="130" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">コード</text>
            <text x="580" y="152" textAnchor="middle" fontSize="14" fill="#0d9488">実装・設計</text>
            {/* 左の葉ノード：大円の左上外側 */}
            <line x1="165" y1="95" x2="80" y2="40" stroke="#6366f1" strokeWidth="1.5"/>
            <circle cx="80" cy="28" r="22" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5"/>
            <text x="80" y="33" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6366f1">抽象</text>
            <line x1="175" y1="90" x2="175" y2="30" stroke="#6366f1" strokeWidth="1.5"/>
            <circle cx="175" cy="18" r="22" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5"/>
            <text x="175" y="23" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6366f1">分解</text>
            {/* 右の葉ノード：大円の右上外側 */}
            <line x1="605" y1="90" x2="605" y2="30" stroke="#0d9488" strokeWidth="1.5"/>
            <circle cx="605" cy="18" r="22" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5"/>
            <text x="605" y="23" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0d9488">設計</text>
            <line x1="615" y1="95" x2="700" y2="40" stroke="#0d9488" strokeWidth="1.5"/>
            <circle cx="700" cy="28" r="22" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5"/>
            <text x="700" y="33" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0d9488">最適</text>
            {/* 両者をつなぐ破線アーチ＋ラベル（葉ノードより手前に描画） */}
            <path d="M255,120 Q390,55 525,120" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4"/>
            <rect x="240" y="62" width="300" height="24" rx="4" fill="#f8f9fa" opacity="0.85"/>
            <text x="390" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#f59e0b">片方を鍛えると、もう片方にも効く</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">AIツールが数学を抽象化する時代</div>
        <div className="two-col">
            <div className="compare-card" style={{ borderColor: 'var(--teal)' }}>
                <div className="card-title accent-teal">フレームワークの恩恵</div>
                <div className="card-body">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" className="icon-inline" /> TensorFlow<br />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" className="icon-inline" /> PyTorch<br /><br />
                    勾配降下法を自分で実装する必要なし
                </div>
            </div>
            <div className="compare-card" style={{ borderColor: 'var(--coral)' }}>
                <div className="card-title accent-coral">落とし穴</div>
                <div className="card-body">ライブラリの挙動を理解してデバッグするには基礎知識が要る<br /><br />「使うだけ」と「理解して使う」は全然違う</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">「使うだけ」vs「理解して使う」</div>
        <svg viewBox="0 0 780 260" width="780" height="260">
            <rect x="40" y="20" width="700" height="220" rx="16" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <rect x="80" y="50" width="280" height="160" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="220" y="85" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">普段の開発</text>
            <text x="220" y="120" textAnchor="middle" fontSize="16" fill="#1a1d23">ライブラリを呼ぶだけ</text>
            <text x="220" y="150" textAnchor="middle" fontSize="16" fill="#1a1d23">数学は隠れている</text>
            <text x="220" y="185" textAnchor="middle" fontSize="32" fill="#0d9488">😊</text>
            <text x="405" y="140" fontSize="32" fontWeight="900" fill="#ef4444">→</text>
            <rect x="440" y="50" width="280" height="160" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="580" y="85" textAnchor="middle" fontSize="18" fontWeight="900" fill="#ef4444">限界に到達</text>
            <text x="580" y="120" textAnchor="middle" fontSize="16" fill="#1a1d23">バグの原因がわからない</text>
            <text x="580" y="150" textAnchor="middle" fontSize="16" fill="#1a1d23">数学の理解が必要に</text>
            <text x="580" y="185" textAnchor="middle" fontSize="32" fill="#ef4444">😰</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '22px' }}>ORM使っててもSQL知らないと<span className="accent-coral">ハマる</span>のと同じ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="scene-title">日本の教育も変化中</div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderColor: 'var(--primary)' }}>
                <div className="metric-value accent-primary" style={{ fontSize: '56px' }}>2025年</div>
                <div className="metric-label">共通テスト「情報I」開始</div>
            </div>
            <div className="metric-card" style={{ borderColor: 'var(--amber)' }}>
                <div className="metric-value accent-amber" style={{ fontSize: '56px' }}>3〜5割</div>
                <div className="metric-label">IT企業の文系出身者</div>
            </div>
        </div>
        <div className="big-statement" style={{ fontSize: '24px' }}>数学とプログラミング、<span className="accent-primary">両方学ぶ</span>時代へ</div>
        <div className="source">出典: 文部科学省 / BOLD Engineer Club</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <div className="scene-title">数学は壁じゃなく鍵</div>
        <svg viewBox="0 0 780 280" width="780" height="280">
            <rect x="100" y="30" width="580" height="230" rx="16" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <rect x="140" y="60" width="200" height="170" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="240" y="105" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">数学なし</text>
            <text x="240" y="140" textAnchor="middle" fontSize="16" fill="#1a1d23">Web開発</text>
            <text x="240" y="165" textAnchor="middle" fontSize="16" fill="#1a1d23">CRUDアプリ</text>
            <text x="240" y="200" textAnchor="middle" fontSize="14" fill="#0d9488">十分やれる!</text>
            <rect x="380" y="60" width="260" height="170" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="510" y="105" textAnchor="middle" fontSize="18" fontWeight="900" fill="#6366f1">数学あり</text>
            <text x="510" y="135" textAnchor="middle" fontSize="16" fill="#1a1d23">+ AI / ML</text>
            <text x="510" y="160" textAnchor="middle" fontSize="16" fill="#1a1d23">+ ゲーム開発</text>
            <text x="510" y="185" textAnchor="middle" fontSize="16" fill="#1a1d23">+ 暗号技術</text>
            <text x="510" y="210" textAnchor="middle" fontSize="14" fill="#6366f1">ドアが増える!</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '24px' }}>なくても仕事はできる。あると<span className="accent-primary">行ける場所</span>が広がる</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-24">
    <div className="content center-layout">
        <div className="scene-title">問いを書き換えよう</div>
        <svg viewBox="0 0 780 240" width="780" height="240">
            <rect x="60" y="20" width="660" height="80" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="100" y="55" fontSize="20" fontWeight="700" fill="#ef4444">Before:</text>
            <text x="240" y="55" fontSize="22" fontWeight="700" fill="#1a1d23">「プログラマーに数学は必要か？」</text>
            <text x="390" y="80" textAnchor="middle" fontSize="14" fill="#ef4444">→ 答えようがない問い</text>
            <path d="M390,100 L390,130" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrowPurple)"/>
            <rect x="60" y="140" width="660" height="80" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
            <text x="100" y="175" fontSize="20" fontWeight="700" fill="#6366f1">After:</text>
            <text x="240" y="175" fontSize="22" fontWeight="700" fill="#1a1d23">「自分はどの世界を覗きたいか？」</text>
            <text x="390" y="200" textAnchor="middle" fontSize="14" fill="#6366f1">→ 必要になった時に学べばいい</text>
        </svg>
        <div className="big-statement" style={{ fontSize: '24px' }}>最初から<span className="accent-coral">ドアを閉めない</span>ことが大事</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene25: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-25">
    <div className="content center-layout">
        <div className="title-large">プログラミングを続けるだけで<br /><span className="accent-primary">数学的思考</span>は育っている</div>
        <div className="big-statement" style={{ fontSize: '28px' }}>あなたはもう入り口に立っている</div>
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
};

export const TOTAL_SCENE_COUNT = 26;
