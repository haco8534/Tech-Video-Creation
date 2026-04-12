import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <svg viewBox="0 0 64 64" width="56" height="56" style={{ marginBottom: '12px' }}>
            <rect x="6" y="6" width="52" height="52" rx="10" fill="#4338ca" opacity=".08"/>
            <path d="M22 20v24M42 20v24M18 32h28" stroke="#4338ca" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="32" cy="32" r="6" fill="#4338ca" opacity=".3"/>
        </svg>
        <div className="title-large">「独学エンジニア」は<br />本当に<span className="accent-primary">通用する</span>のか？</div>
        <div className="title-sub">データで検証する、独学の真実</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">独学プログラミング学習者</div>
        <div className="hero-number accent-coral">90%</div>
        <div className="big-statement accent-coral">が挫折する</div>
        <div className="bar-chart">
            <div className="bar-row"><div className="bar-label">独学</div><div className="bar-track"><div className="bar-fill bf-coral" style={{ '--w': '90%' } as React.CSSProperties}></div></div><div className="bar-val">90%</div></div>
            <div className="bar-row"><div className="bar-label">スクール</div><div className="bar-track"><div className="bar-fill bf-gray" style={{ '--w': '30%' } as React.CSSProperties}></div></div><div className="bar-val">30%</div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">しかし、生き残った独学者は——</div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderTop: '4px solid var(--teal)' }}>
                <div className="metric-value accent-teal">+26%</div>
                <div className="metric-label">長期キャリアでの年収<br />（CS学位保有者比）</div>
            </div>
            <div className="metric-card" style={{ borderTop: '4px solid var(--teal)' }}>
                <div className="metric-value accent-teal">14ヶ月</div>
                <div className="metric-label">シニア到達が早い<br />（平均比）</div>
            </div>
        </div>
        <div className="source-badge">「独学は通用しない」——この常識が、データで覆されている</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">独学者が陥る<span className="accent-coral">3つの挫折</span></div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle num-circle--coral">1</div>
                <div><div className="num-title">チュートリアル地獄</div><div className="num-desc">動画やテキストを消費するだけで、自分では何も作れない</div></div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle--coral">2</div>
                <div><div className="num-title">ロードマップ迷子</div><div className="num-desc">あちこち手を出して、どれも中途半端に</div></div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle--coral">3</div>
                <div><div className="num-title">環境構築の壁</div><div className="num-desc">コードを書く以前に、開発環境が動かず心が折れる</div></div>
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
        <div className="scene-title">独学 vs スクール</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <h3 className="accent-primary">独学</h3>
                <div className="check-item"><span className="check-coral">✗</span> 挫折率90%</div>
                <div className="check-item"><span className="check-teal">✓</span> 自走力が鍛えられる</div>
                <div className="check-item"><span className="check-teal">✓</span> 長期キャリアで優位</div>
            </div>
            <div className="compare-card">
                <h3>スクール</h3>
                <div className="check-item"><span className="check-teal">✓</span> 挫折率30%</div>
                <div className="check-item"><span className="check-coral">✗</span> 実務スキル不足の傾向</div>
                <div className="check-item"><span className="check-coral">✗</span> 修了証だけでは不十分</div>
            </div>
        </div>
        <div className="source-badge">企業が求めるのは「自分で課題を見つけ、自分で解決できる力」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">独学の「つらさ」が武器になる</div>
        <svg viewBox="0 0 400 120" width="400" height="120">
            <rect x="10" y="30" width="110" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="65" y="65" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">エラーと格闘</text>
            <path d="M125 60 L165 60" stroke="#4338ca" strokeWidth="2.5" fill="none"/>
            <polygon points="163,54 175,60 163,66" fill="#4338ca"/>
            <rect x="180" y="30" width="110" height="60" rx="8" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2"/>
            <text x="235" y="65" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4338ca">自力で解決</text>
            <path d="M295 60 L335 60" stroke="#059669" strokeWidth="2.5" fill="none"/>
            <polygon points="333,54 345,60 333,66" fill="#059669"/>
            <rect x="350" y="20" width="40" height="80" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
            <text x="370" y="55" textAnchor="middle" fontSize="11" fontWeight="900" fill="#059669">自走</text>
            <text x="370" y="70" textAnchor="middle" fontSize="11" fontWeight="900" fill="#059669">力</text>
        </svg>
        <div className="big-statement">現場のエンジニアが毎日やっていることそのもの</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">Stack Overflow 2024 調査</div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <div className="metric-value accent-primary">66%</div>
                <div className="metric-label">学士・修士を保有</div>
            </div>
            <div className="metric-card" style={{ borderTop: '4px solid var(--amber)' }}>
                <div className="metric-value accent-amber">49%</div>
                <div className="metric-label">学校でコーディングを<br />学んだ割合</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '16px' }}>学位を持っていても、<span className="accent-primary">半分近くは独学</span>で覚えている</div>
        <div className="source-badge">出典: Stack Overflow Developer Survey 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">キャリア年数と年収差</div>
        <svg viewBox="0 0 520 200" width="520" height="200">
            <line x1="60" y1="10" x2="60" y2="180" stroke="#d1d5db" strokeWidth="1.5"/>
            <line x1="60" y1="180" x2="500" y2="180" stroke="#d1d5db" strokeWidth="1.5"/>
            <text x="55" y="185" textAnchor="end" fontSize="11" fill="#1a1d23">0</text>
            <text x="140" y="195" textAnchor="middle" fontSize="11" fill="#1a1d23">1年</text>
            <text x="230" y="195" textAnchor="middle" fontSize="11" fill="#1a1d23">2-3年</text>
            <text x="330" y="195" textAnchor="middle" fontSize="11" fill="#1a1d23">4-5年</text>
            <text x="450" y="195" textAnchor="middle" fontSize="11" fill="#1a1d23">16年+</text>
            <polyline points="140,60 230,80 330,90 450,100" fill="none" stroke="#4338ca" strokeWidth="2.5" strokeDasharray="6"/>
            <polyline points="140,120 230,84 330,86 450,60" fill="none" stroke="#059669" strokeWidth="2.5"/>
            <circle cx="140" cy="120" r="5" fill="#059669"/>
            <circle cx="230" cy="84" r="5" fill="#059669"/>
            <circle cx="330" cy="86" r="5" fill="#059669"/>
            <circle cx="450" cy="60" r="5" fill="#059669"/>
            <text x="140" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">-31%</text>
            <text x="230" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a1d23">-3%</text>
            <text x="330" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">+3%</text>
            <text x="450" y="50" textAnchor="middle" fontSize="13" fontWeight="900" fill="#059669">+26%</text>
            <rect x="100" y="4" width="12" height="12" rx="2" fill="#4338ca"/>
            <text x="118" y="14" fontSize="11" fontWeight="700" fill="#1a1d23">CS学位</text>
            <rect x="180" y="4" width="12" height="12" rx="2" fill="#059669"/>
            <text x="198" y="14" fontSize="11" fontWeight="700" fill="#1a1d23">独学</text>
        </svg>
        <div className="source-badge">長期キャリアで独学者がCS卒を逆転する</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">独学出身エンジニアの<span className="accent-teal">人事評価</span></div>
        <div className="bar-chart">
            <div className="bar-row"><div className="bar-label">「期待以上」評価</div><div className="bar-track"><div className="bar-fill bf-teal" style={{ '--w': '74%' } as React.CSSProperties}></div></div><div className="bar-val">+37%</div></div>
            <div className="bar-row"><div className="bar-label">昇進スピード</div><div className="bar-track"><div className="bar-fill bf-teal" style={{ '--w': '52%' } as React.CSSProperties}></div></div><div className="bar-val">+16%</div></div>
            <div className="bar-row"><div className="bar-label">コード修正回数</div><div className="bar-track"><div className="bar-fill bf-primary" style={{ '--w': '58%' } as React.CSSProperties}></div></div><div className="bar-val">-29%</div></div>
            <div className="bar-row"><div className="bar-label">新技術への適応</div><div className="bar-track"><div className="bar-fill bf-teal" style={{ '--w': '70%' } as React.CSSProperties}></div></div><div className="bar-val">+30-40%</div></div>
        </div>
        <div className="source-badge">「自走サイクル」が長期的に巨大な差を生む</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">採用市場の変化</div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <div className="metric-value accent-primary">72%</div>
                <div className="metric-label">雇用主がブートキャンプ卒を<br />学位と同等に評価</div>
            </div>
            <div className="metric-card" style={{ borderTop: '4px solid var(--teal)' }}>
                <div className="metric-value accent-teal">+43%</div>
                <div className="metric-label">ブラインド審査での<br />独学者の合格率増加</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '16px' }}>学歴を隠すと、<span className="accent-teal">独学者の方が受かる</span></div>
        <div className="source-badge">出典: Indeed 2025 / CS卒はわずか+8%</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">独学者の弱点</div>
        <div className="quote-block">
            <div className="quote-body">「動くものは作れる。<br />でも<span className="accent-coral">基礎がない</span>。」</div>
            <div className="quote-source">データ構造、アルゴリズム、OS、ネットワーク<br />CS学部で4年かけて学ぶ内容をスキップしがち</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">知識の穴が生む<span className="accent-coral">技術的負債</span></div>
        <div className="flow-chain">
            <div className="fc-node border-coral">
                <div className="fc-node-title">基礎の欠如</div>
                <div className="fc-node-desc">体系的学習なし</div>
            </div>
            <span className="fc-arr">→</span>
            <div className="fc-node border-amber">
                <div className="fc-node-title">非効率な設計</div>
                <div className="fc-node-desc">動くけど最適でない</div>
            </div>
            <span className="fc-arr">→</span>
            <div className="fc-node border-coral">
                <div className="fc-node-title">技術的負債</div>
                <div className="fc-node-desc">作業時間の23%を浪費</div>
            </div>
        </div>
        <div className="source-badge">25%のケースで既存負債が新しい負債を生む「伝染性負債」が発生</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">インポスター症候群</div>
        <svg viewBox="0 0 400 140" width="400" height="140">
            <rect x="20" y="20" width="160" height="100" rx="10" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2"/>
            <text x="100" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4338ca">実際の能力</text>
            <rect x="50" y="65" width="100" height="40" rx="6" fill="#4338ca" opacity=".15"/>
            <text x="100" y="90" textAnchor="middle" fontSize="12" fontWeight="900" fill="#4338ca">高い</text>
            <rect x="220" y="20" width="160" height="100" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="300" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">自己認識</text>
            <rect x="250" y="65" width="100" height="40" rx="6" fill="#dc2626" opacity=".15"/>
            <text x="300" y="90" textAnchor="middle" fontSize="12" fontWeight="900" fill="#dc2626">「自分は偽物」</text>
        </svg>
        <div className="big-statement">能力はあるのに、<span className="accent-coral">自分を信じられない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">独学に向いている人</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <h3 className="accent-teal">向いている</h3>
                <div className="check-item"><span className="check-teal">✓</span> 「わからない」に耐えられる</div>
                <div className="check-item"><span className="check-teal">✓</span> 弱点を認められる</div>
                <div className="check-item"><span className="check-teal">✓</span> 学ぶこと自体を楽しめる</div>
            </div>
            <div className="compare-card border-coral">
                <h3 className="accent-coral">向いていない</h3>
                <div className="check-item"><span className="check-coral">✗</span> 正解を教えてほしい</div>
                <div className="check-item"><span className="check-coral">✗</span> 一人だとモチベが続かない</div>
                <div className="check-item"><span className="check-coral">✗</span> エラーで心が折れる</div>
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
        <div className="scene-title">日本のIT人材不足</div>
        <div className="hero-number accent-coral">79万人</div>
        <div className="big-statement">2030年に不足すると予測</div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderTop: '4px solid var(--teal)' }}>
                <div className="metric-value accent-teal">4割</div>
                <div className="metric-label">すでに未経験者を採用</div>
            </div>
            <div className="metric-card" style={{ borderTop: '4px solid var(--teal)' }}>
                <div className="metric-value accent-teal">7割+</div>
                <div className="metric-label">検討中を含む</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">独学→転職のリアル</div>
        <div className="flow-chain">
            <div className="fc-node border-primary">
                <div className="fc-node-title">独学開始</div>
            </div>
            <span className="fc-arr">→</span>
            <div className="fc-node border-amber">
                <div className="fc-node-title">90%が脱落</div>
            </div>
            <span className="fc-arr">→</span>
            <div className="fc-node border-teal">
                <div className="fc-node-title">生存者の9割</div>
                <div className="fc-node-desc">目標の半分以上を達成</div>
            </div>
        </div>
        <div className="bar-chart">
            <div className="bar-row"><div className="bar-label">年収アップ実感</div><div className="bar-track"><div className="bar-fill bf-teal" style={{ '--w': '50%' } as React.CSSProperties}></div></div><div className="bar-val">約50%</div></div>
        </div>
        <div className="source-badge">2024年上半期: 非IT→IT転職 約3万人</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">最重要：ポートフォリオ</div>
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" width="48" height="48" />
        </div>
        <div className="big-statement">履歴書の文字より、<br /><span className="accent-primary">動くコード</span>の方が何倍も雄弁</div>
        <div className="source-badge">企業が独学者に求めるのは「学歴の代わりの証拠」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">独学エンジニアは通用するか？</div>
        <svg viewBox="0 0 480 140" width="480" height="140">
            <rect x="10" y="10" width="140" height="120" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="80" y="45" textAnchor="middle" fontSize="14" fontWeight="900" fill="#dc2626">90%が挫折</text>
            <text x="80" y="70" textAnchor="middle" fontSize="12" fill="#1a1d23">知識の穴</text>
            <text x="80" y="90" textAnchor="middle" fontSize="12" fill="#1a1d23">孤独との戦い</text>
            <text x="80" y="110" textAnchor="middle" fontSize="12" fill="#1a1d23">インポスター症候群</text>
            <path d="M155 70 L195 70" stroke="#4338ca" strokeWidth="2.5"/>
            <polygon points="193,64 205,70 193,76" fill="#4338ca"/>
            <rect x="210" y="10" width="60" height="120" rx="10" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2"/>
            <text x="240" y="55" textAnchor="middle" fontSize="13" fontWeight="900" fill="#4338ca">壁を</text>
            <text x="240" y="75" textAnchor="middle" fontSize="13" fontWeight="900" fill="#4338ca">越える</text>
            <path d="M275 70 L315 70" stroke="#059669" strokeWidth="2.5"/>
            <polygon points="313,64 325,70 313,76" fill="#059669"/>
            <rect x="330" y="10" width="140" height="120" rx="10" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
            <text x="400" y="45" textAnchor="middle" fontSize="14" fontWeight="900" fill="#059669">自走力</text>
            <text x="400" y="70" textAnchor="middle" fontSize="12" fill="#1a1d23">年収+26%</text>
            <text x="400" y="90" textAnchor="middle" fontSize="12" fill="#1a1d23">昇進+16%</text>
            <text x="400" y="110" textAnchor="middle" fontSize="12" fill="#1a1d23">適応力+30-40%</text>
        </svg>
        <div className="big-statement">通用する。ただし<span className="accent-primary">条件つき</span>。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">3つの条件</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle num-circle--coral">1</div>
                <div><div className="num-title">90%の壁を越える覚悟</div><div className="num-desc">チュートリアルではなく、自分で手を動かし続ける</div></div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle--primary">2</div>
                <div><div className="num-title">知識の穴を埋め続ける</div><div className="num-desc">動くコードだけでは不十分。基礎を学び直す謙虚さ</div></div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle--teal">3</div>
                <div><div className="num-title">作ったものを世に出す</div><div className="num-desc">ポートフォリオが最強の武器</div></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">独学は最もハードモード</div>
        <div className="big-statement">だからこそ、歩ききった人は<span className="accent-teal">強い</span></div>
        <svg viewBox="0 0 400 80" width="400" height="80" style={{ marginTop: '12px' }}>
            <rect x="10" y="15" width="120" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="70" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">挫折率90%</text>
            <path d="M135 40 L175 40" stroke="#4338ca" strokeWidth="2.5"/>
            <polygon points="173,34 185,40 173,46" fill="#4338ca"/>
            <rect x="190" y="15" width="100" height="50" rx="8" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2"/>
            <text x="240" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4338ca">自走力</text>
            <path d="M295 40 L335 40" stroke="#059669" strokeWidth="2.5"/>
            <polygon points="333,34 345,40 333,46" fill="#059669"/>
            <rect x="350" y="10" width="40" height="60" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
            <text x="370" y="45" textAnchor="middle" fontSize="13" fontWeight="900" fill="#059669">強</text>
        </svg>
        <div className="title-sub">チャンネル登録・コメントお願いします</div>
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
};

export const TOTAL_SCENE_COUNT = 20;
