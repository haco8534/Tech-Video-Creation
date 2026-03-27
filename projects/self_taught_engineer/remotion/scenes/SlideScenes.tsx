import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
  <div className="content center-layout">
    <div className="title-card">
      <div style={{ marginBottom: '8px' }}>
        <svg viewBox="0 0 80 80" width="64" height="64">
          <rect x="8" y="8" width="64" height="64" rx="12" fill="#4338ca" opacity=".08"/>
          <path d="M40 18v10M40 52v10M18 40h10M52 40h10" stroke="#4338ca" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="40" cy="40" r="12" fill="none" stroke="#4338ca" strokeWidth="3"/>
          <circle cx="40" cy="40" r="4" fill="#4338ca"/>
          <path d="M28 28l6 6M52 28l-6 6M28 52l6-6M52 52l-6-6" stroke="#4338ca" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="title-main">「独学エンジニア」は<br />本当に通用するのか？</div>
      <div className="title-sub">データで検証する、独学の真実</div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
  <div className="content center-layout">
    <div className="caption mb-8">独学プログラミング学習者</div>
    <div className="hero-number" style={{ color: 'var(--color-danger)' }}>90<span style={{ fontSize: '48px' }}>%</span></div>
    <div className="heading mt-8" style={{ color: 'var(--color-danger)' }}>が挫折する</div>
    <div className="body-text mt-12" style={{ maxWidth: '600px' }}>スクールの挫折率は約30%。独学はその<span className="fw-900 text-danger">3倍</span>の厳しさ。</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
  <div className="content center-layout">
    <div className="heading mb-16">しかし、生き残った独学者は——</div>
    <div className="compare-grid" style={{ maxWidth: '640px' }}>
      <div className="compare-item compare-success" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="15" fill="#059669" opacity=".15"/>
          <path d="M12 20l6 6 12-12" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
        <div className="metric-value" style={{ color: 'var(--color-accent)' }}>+26%</div>
        <div className="metric-label">年収がCS学位より高い</div>
        <div className="caption mt-4">16年以上のキャリア</div>
      </div>
      <div className="compare-item compare-success" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="15" fill="#059669" opacity=".15"/>
          <path d="M20 28V14M14 20l6-6 6 6" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="metric-value" style={{ color: 'var(--color-accent)' }}>14ヶ月</div>
        <div className="metric-label">早くシニアに到達</div>
        <div className="caption mt-4">平均との比較</div>
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
    <div className="heading" style={{ marginBottom: '12px' }}>独学者が陥る3つの罠</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', maxWidth: '820px' }}>
      <div className="card card-danger" style={{ padding: '16px', textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 6px' }}>
          <rect x="4" y="10" width="32" height="22" rx="3" fill="none" stroke="var(--color-danger)" strokeWidth="2.5"/>
          <path d="M14 18h12M14 24h8" stroke="var(--color-danger)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M11 10V7h18v3" stroke="var(--color-danger)" strokeWidth="2" fill="none"/>
        </svg>
        <div className="text-danger fw-800" style={{ fontSize: '20px' }}>①</div>
        <div style={{ fontSize: '17px', marginTop: '4px' }}>チュートリアル地獄<br /><span className="fw-800">見るだけ</span>で終わる</div>
      </div>
      <div className="card card-danger" style={{ padding: '16px', textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 6px' }}>
          <circle cx="20" cy="20" r="14" fill="none" stroke="var(--color-danger)" strokeWidth="2.5"/>
          <path d="M20 12v8l5 5" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <div className="text-danger fw-800" style={{ fontSize: '20px' }}>②</div>
        <div style={{ fontSize: '17px', marginTop: '4px' }}>ロードマップ迷子<br /><span className="fw-800">どれも中途半端</span></div>
      </div>
      <div className="card card-danger" style={{ padding: '16px', textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 6px' }}>
          <path d="M20 4L36 34H4Z" fill="none" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinejoin="round"/>
          <text x="20" y="28" textAnchor="middle" fill="var(--color-danger)" fontSize="16" fontWeight="900">!</text>
        </svg>
        <div className="text-danger fw-800" style={{ fontSize: '20px' }}>③</div>
        <div style={{ fontSize: '17px', marginTop: '4px' }}>環境構築の壁<br /><span className="fw-800">動かすだけ</span>で挫折</div>
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
    <div className="heading mb-16">独学 vs スクール</div>
    <div className="compare-grid" style={{ maxWidth: '640px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="16" r="8" fill="none" stroke="var(--color-primary)" strokeWidth="2.5"/>
          <path d="M8 36c0-8 5-12 12-12s12 4 12 12" stroke="var(--color-primary)" strokeWidth="2.5" fill="none"/>
        </svg>
        <div className="fw-800" style={{ fontSize: '20px' }}>独学</div>
        <div className="mt-4" style={{ fontSize: '17px' }}>挫折率 <span className="text-danger fw-900">90%</span></div>
        <div className="mt-4 caption">自走力が身につく</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="6" y="8" width="28" height="20" rx="3" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5"/>
          <path d="M6 14h28" stroke="var(--color-secondary)" strokeWidth="2"/>
          <circle cx="12" cy="11" r="1.5" fill="var(--color-secondary)"/>
        </svg>
        <div className="fw-800" style={{ fontSize: '20px' }}>スクール</div>
        <div className="mt-4" style={{ fontSize: '17px' }}>挫折率 <span className="text-accent fw-900">30%</span></div>
        <div className="mt-4 caption">実務スキルが不足しがち</div>
      </div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
  <div className="content center-layout">
    <div className="heading">独学の真の武器</div>
    <div className="mt-16" style={{ fontSize: '52px', fontWeight: '900', color: 'var(--color-primary)', lineHeight: '1.3' }}>自走力</div>
    <div className="mt-12 body-text" style={{ maxWidth: '560px' }}>
      自分で問題を見つけ<br />自分で調べ<br />自分で解決する力
    </div>
    <div className="mt-12 caption">= 現場でエンジニアに最も求められる能力</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
  <div className="content center-layout">
    <div className="tag tag-primary mb-8">Stack Overflow Developer Survey 2024</div>
    <div className="heading">開発者はどこで学んだか？</div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '120px' }}>学位保有者</div>
      <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '66%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-primary">66%</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '120px' }}>学校でコーディング</div>
      <div className="bar-track"><div className="bar-fill bar-fill-secondary" style={{ '--w': '49%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-secondary">49%</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '120px' }}>完全独学</div>
      <div className="bar-track"><div className="bar-fill bar-fill-accent" style={{ '--w': '27%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-accent">27%+</div>
    </div>
    <div className="mt-8 caption">半数近くが独学でコーディングを習得</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
  <div className="content center-layout">
    <div className="heading mb-8">年収推移：独学 vs CS学位</div>
    <svg viewBox="0 0 720 240" width="700" height="230">
      {/* Grid */}
      <line x1="60" y1="30" x2="60" y2="200" stroke="#d1d5db" strokeWidth="1"/>
      <line x1="60" y1="200" x2="700" y2="200" stroke="#d1d5db" strokeWidth="1"/>
      <line x1="60" y1="100" x2="700" y2="100" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="4"/>
      <line x1="60" y1="150" x2="700" y2="150" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="4"/>
      {/* X labels */}
      <text x="140" y="220" textAnchor="middle" fill="#1a1d23" fontSize="13" fontWeight="600">0-1年</text>
      <text x="280" y="220" textAnchor="middle" fill="#1a1d23" fontSize="13" fontWeight="600">2-3年</text>
      <text x="420" y="220" textAnchor="middle" fill="#1a1d23" fontSize="13" fontWeight="600">4-5年</text>
      <text x="600" y="220" textAnchor="middle" fill="#1a1d23" fontSize="13" fontWeight="600">16年+</text>
      {/* CS degree line */}
      <polyline points="140,130 280,135 420,120 600,110" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="140" cy="130" r="5" fill="#d97706"/>
      <circle cx="280" cy="135" r="5" fill="#d97706"/>
      <circle cx="420" cy="120" r="5" fill="#d97706"/>
      <circle cx="600" cy="110" r="5" fill="#d97706"/>
      {/* Self-taught line */}
      <polyline points="140,170 280,138 420,117 600,75" fill="none" stroke="#4338ca" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="140" cy="170" r="5" fill="#4338ca"/>
      <circle cx="280" cy="138" r="5" fill="#4338ca"/>
      <circle cx="420" cy="117" r="5" fill="#4338ca"/>
      <circle cx="600" cy="75" r="6" fill="#4338ca"/>
      {/* Labels */}
      <text x="620" y="108" fill="#d97706" fontSize="14" fontWeight="700">CS学位</text>
      <text x="620" y="73" fill="#4338ca" fontSize="14" fontWeight="700">独学 +26%</text>
      {/* Crossover arrow */}
      <text x="400" y="105" fill="#4338ca" fontSize="12" fontWeight="700">逆転!</text>
    </svg>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
  <div className="content center-layout">
    <div className="heading" style={{ marginBottom: '8px' }}>独学出身エンジニアの社内評価</div>
    <div className="metric-grid">
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <path d="M16 4l3.5 7 7.5 1-5.5 5.3 1.3 7.7L16 21.5 9.2 25l1.3-7.7L5 12l7.5-1z" fill="var(--color-accent)" opacity=".8" transform="translate(4,2)"/>
        </svg>
        <div className="metric-value" style={{ color: 'var(--color-accent)' }}>+37%</div>
        <div className="metric-label">「期待以上」評価</div>
      </div>
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="15" fill="var(--color-accent)" opacity=".15"/>
          <path d="M20 28V14M14 20l6-6 6 6" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="metric-value" style={{ color: 'var(--color-accent)' }}>+16%</div>
        <div className="metric-label">昇進スピード</div>
      </div>
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <polyline points="8,28 16,20 24,24 32,12" stroke="var(--color-primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="12" r="3" fill="var(--color-primary)"/>
        </svg>
        <div className="metric-value">-29%</div>
        <div className="metric-label">コード修正回数</div>
      </div>
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="6" y="6" width="28" height="28" rx="6" fill="var(--color-primary)" opacity=".1"/>
          <path d="M14 20h12M20 14v12" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <div className="metric-value">+40%</div>
        <div className="metric-label">新技術への適応速度</div>
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
    <div className="heading mb-16">ブラインド技術評価の結果</div>
    <div className="compare-grid" style={{ maxWidth: '640px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="16" r="8" fill="none" stroke="var(--color-primary)" strokeWidth="2.5"/>
          <path d="M8 36c0-8 5-12 12-12s12 4 12 12" stroke="var(--color-primary)" strokeWidth="2.5" fill="none"/>
        </svg>
        <div className="fw-800" style={{ fontSize: '20px' }}>独学者</div>
        <div className="hero-number mt-4" style={{ fontSize: '52px', color: 'var(--color-primary)' }}>+43%</div>
        <div className="caption mt-4">合格率の増加</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <path d="M12 8l16 6-16 6z" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinejoin="round"/>
          <line x1="12" y1="14" x2="12" y2="32" stroke="var(--color-secondary)" strokeWidth="2.5"/>
        </svg>
        <div className="fw-800" style={{ fontSize: '20px' }}>CS学位</div>
        <div className="hero-number mt-4" style={{ fontSize: '52px', color: 'var(--color-secondary)' }}>+8%</div>
        <div className="caption mt-4">合格率の増加</div>
      </div>
    </div>
    <div className="mt-8 caption">学歴を隠すと、独学者の実力が浮き彫りになる</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
  <div className="content center-layout">
    <div className="heading mb-8">独学者の弱点：知識の穴</div>
    <div className="quote-block" style={{ maxWidth: '640px' }}>
      <div style={{ fontSize: '28px', fontWeight: '700', fontStyle: 'normal' }}>CS学部で4年かけて体系的に学ぶ内容を<br /><span className="text-danger fw-900">スキップしがち</span></div>
    </div>
    <div className="mt-12 flow-chain">
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="6" y="6" width="28" height="28" rx="4" fill="#4338ca"/>
          <text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900">DS</text>
        </svg>
        データ構造
      </div>
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="6" y="6" width="28" height="28" rx="4" fill="#4338ca"/>
          <text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">Algo</text>
        </svg>
        アルゴリズム
      </div>
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="6" y="6" width="28" height="28" rx="4" fill="#4338ca"/>
          <text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900">OS</text>
        </svg>
        OS基礎
      </div>
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="6" y="6" width="28" height="28" rx="4" fill="#4338ca"/>
          <text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">Net</text>
        </svg>
        ネットワーク
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
    <div className="heading mb-8">知識の穴が生む負債</div>
    <div className="flow-chain">
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <path d="M20 4L36 34H4Z" fill="none" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinejoin="round"/>
          <text x="20" y="28" textAnchor="middle" fill="var(--color-danger)" fontSize="16" fontWeight="900">!</text>
        </svg>
        基礎の欠如
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <polyline points="8,28 16,20 24,24 32,12" stroke="var(--color-danger)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
        非効率な設計
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node fc-node-highlight" style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)', background: 'rgba(220,38,38,0.08)' }}>
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="15" fill="none" stroke="var(--color-danger)" strokeWidth="2.5"/>
          <line x1="10" y1="10" x2="30" y2="30" stroke="var(--color-danger)" strokeWidth="2.5"/>
        </svg>
        技術的負債
      </div>
    </div>
    <div className="mt-12 compare-grid" style={{ maxWidth: '540px' }}>
      <div className="compare-item compare-danger" style={{ textAlign: 'center' }}>
        <div className="metric-value" style={{ color: 'var(--color-danger)' }}>23%</div>
        <div className="caption">作業時間を負債処理に消費</div>
      </div>
      <div className="compare-item compare-danger" style={{ textAlign: 'center' }}>
        <div className="metric-value" style={{ color: 'var(--color-danger)' }}>25%</div>
        <div className="caption">既存の負債が新しい負債を生む</div>
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
    <div className="heading mb-16">インポスター症候群</div>
    <svg viewBox="0 0 600 200" width="580" height="190">
      {/* Person icon */}
      <circle cx="300" cy="70" r="24" fill="none" stroke="#4338ca" strokeWidth="3"/>
      <path d="M270 130c0-18 13-30 30-30s30 12 30 30" stroke="#4338ca" strokeWidth="3" fill="none"/>
      {/* Thought bubbles */}
      <rect x="40" y="30" width="160" height="50" rx="10" fill="rgba(220,38,38,0.08)" stroke="var(--color-danger)" strokeWidth="2"/>
      <text x="120" y="62" textAnchor="middle" fill="var(--color-danger)" fontSize="15" fontWeight="700">「基礎が足りない」</text>
      <rect x="400" y="30" width="160" height="50" rx="10" fill="rgba(220,38,38,0.08)" stroke="var(--color-danger)" strokeWidth="2"/>
      <text x="480" y="62" textAnchor="middle" fill="var(--color-danger)" fontSize="15" fontWeight="700">「いつかバレる」</text>
      <rect x="170" y="140" width="260" height="50" rx="10" fill="rgba(220,38,38,0.08)" stroke="var(--color-danger)" strokeWidth="2"/>
      <text x="300" y="172" textAnchor="middle" fill="var(--color-danger)" fontSize="15" fontWeight="700">「自分は偽物なのでは？」</text>
    </svg>
    <div className="caption">独学者は正規教育出身者より顕著に出る傾向あり</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
  <div className="content center-layout">
    <div className="heading" style={{ marginBottom: '8px' }}>独学に向いている人</div>
    <div className="num-list">
      <div className="num-item">
        <div className="num-circle" style={{ background: 'var(--color-accent)' }}>1</div>
        <div className="num-text">「わからない」に耐えられる人</div>
      </div>
      <div className="num-item">
        <div className="num-circle" style={{ background: 'var(--color-accent)' }}>2</div>
        <div className="num-text">自分の弱点を認められる人</div>
      </div>
      <div className="num-item">
        <div className="num-circle" style={{ background: 'var(--color-accent)' }}>3</div>
        <div className="num-text">学ぶこと自体を楽しめる人</div>
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
    <div className="tag tag-danger mb-8">経済産業省 予測</div>
    <div className="heading">2030年のIT人材不足</div>
    <div className="hero-number" style={{ color: 'var(--color-danger)' }}>79<span style={{ fontSize: '42px' }}>万人</span></div>
    <div className="mt-12 bar-row">
      <div className="bar-label" style={{ minWidth: '130px' }}>未経験者を採用</div>
      <div className="bar-track"><div className="bar-fill bar-fill-accent" style={{ '--w': '40%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-accent">40%</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '130px' }}>検討中を含む</div>
      <div className="bar-track"><div className="bar-fill bar-fill-accent" style={{ '--w': '70%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-accent">70%+</div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
  <div className="content center-layout">
    <div className="heading mb-8">独学者の転職成功データ</div>
    <div className="flow-chain">
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="16" r="8" fill="none" stroke="var(--color-primary)" strokeWidth="2"/>
          <path d="M8 36c0-8 5-12 12-12s12 4 12 12" stroke="var(--color-primary)" strokeWidth="2" fill="none"/>
        </svg>
        独学開始
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <polyline points="8,28 20,12 32,28" stroke="var(--color-accent)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
        半年以内<br /><span style={{ fontSize: '14px' }}>40%が目標達成</span>
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node fc-node-highlight">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="15" fill="var(--color-accent)" opacity=".15"/>
          <path d="M12 20l6 6 12-12" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
        目標の半分以上を達成<br /><span style={{ fontSize: '14px' }}>成功者の<span className="fw-900">90%</span></span>
      </div>
    </div>
    <div className="mt-8 caption" style={{ color: 'var(--color-secondary)' }}>※ この成功率は挫折しなかった10%の中での割合</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
  <div className="content center-layout">
    <div className="heading mb-16">最強の武器 = ポートフォリオ</div>
    <div className="flow-chain">
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <polyline points="8,6 20,6 20,18 8,18 8,6" stroke="var(--color-primary)" strokeWidth="2" fill="none"/>
          <polyline points="12,18 12,34 28,34 28,18 20,18" stroke="var(--color-primary)" strokeWidth="2" fill="none"/>
        </svg>
        自分でアプリを<br />作る
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="14" fill="#24292e"/>
          <path d="M20 10c-6 0-10 5-10 10 0 4.4 2.8 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10z" fill="#fff"/>
        </svg>
        GitHubに公開
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node fc-node-highlight">
        <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="15" fill="var(--color-accent)" opacity=".15"/>
          <path d="M12 20l6 6 12-12" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
        採用で評価される
      </div>
    </div>
    <div className="mt-16 body-text">履歴書の文字より、<span className="fw-900 text-primary">動くコード</span>の方が雄弁</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
  <div className="content center-layout">
    <div className="heading mb-8">独学エンジニアは通用するか？</div>
    <svg viewBox="0 0 700 220" width="680" height="210">
      {/* Scale beam */}
      <line x1="150" y1="40" x2="550" y2="40" stroke="#d1d5db" strokeWidth="2"/>
      <polygon points="350,30 340,20 360,20" fill="#4338ca"/>
      {/* Left: difficulties */}
      <rect x="80" y="60" width="200" height="140" rx="12" fill="rgba(220,38,38,0.06)" stroke="var(--color-danger)" strokeWidth="2"/>
      <text x="180" y="85" textAnchor="middle" fill="var(--color-danger)" fontSize="16" fontWeight="800">壁</text>
      <text x="180" y="110" textAnchor="middle" fill="#1a1d23" fontSize="13">挫折率 90%</text>
      <text x="180" y="132" textAnchor="middle" fill="#1a1d23" fontSize="13">知識の穴</text>
      <text x="180" y="154" textAnchor="middle" fill="#1a1d23" fontSize="13">インポスター症候群</text>
      <text x="180" y="176" textAnchor="middle" fill="#1a1d23" fontSize="13">技術的負債</text>
      {/* Right: strengths */}
      <rect x="420" y="60" width="200" height="140" rx="12" fill="rgba(5,150,105,0.06)" stroke="var(--color-accent)" strokeWidth="2"/>
      <text x="520" y="85" textAnchor="middle" fill="var(--color-accent)" fontSize="16" fontWeight="800">武器</text>
      <text x="520" y="110" textAnchor="middle" fill="#1a1d23" fontSize="13">自走力</text>
      <text x="520" y="132" textAnchor="middle" fill="#1a1d23" fontSize="13">年収 +26%（長期）</text>
      <text x="520" y="154" textAnchor="middle" fill="#1a1d23" fontSize="13">新技術適応 +40%</text>
      <text x="520" y="176" textAnchor="middle" fill="#1a1d23" fontSize="13">高い業績評価</text>
      {/* Center label */}
      <text x="350" y="145" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="800">条件つきで通用する</text>
    </svg>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
  <div className="content center-layout">
    <div className="heading" style={{ marginBottom: '8px' }}>通用するための3条件</div>
    <div className="num-list">
      <div className="num-item">
        <div className="num-circle">1</div>
        <div className="num-text">90%の壁を越える覚悟 — <span className="text-primary">手を動かし続ける</span></div>
      </div>
      <div className="num-item">
        <div className="num-circle">2</div>
        <div className="num-text">知識の穴を埋め続ける — <span className="text-primary">基礎に戻る謙虚さ</span></div>
      </div>
      <div className="num-item">
        <div className="num-circle">3</div>
        <div className="num-text">作ったものを世に出す — <span className="text-primary">ポートフォリオが武器</span></div>
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
    <div style={{ maxWidth: '600px' }}>
      <div className="card card-accent" style={{ textAlign: 'center', padding: '32px' }}>
        <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--color-primary)', lineHeight: '1.4' }}>
          独学は最もハードモード。
        </div>
        <div className="mt-16" style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.4' }}>
          だからこそ、<br />歩ききった人は<span className="text-accent">強い</span>。
        </div>
      </div>
      <div className="mt-16 body-text" style={{ textAlign: 'center' }}>学歴ではなくスキルで評価される時代が、<span className="fw-800">すでに始まっている。</span></div>
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
};

export const TOTAL_SCENE_COUNT = 20;
