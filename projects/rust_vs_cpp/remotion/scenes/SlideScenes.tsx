import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
  <div className="content center-layout bg-dots">
    <div className="title-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <svg viewBox="0 0 56 56" width="52" height="52">
          <rect x="4" y="4" width="48" height="48" rx="10" fill="#ce4120"/>
          <text x="28" y="38" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900" fontFamily="Arial">R</text>
        </svg>
        <span style={{ fontSize: '32px', fontWeight: 900, color: '#1a1d23' }}>VS</span>
        <svg viewBox="0 0 56 56" width="52" height="52">
          <rect x="4" y="4" width="48" height="48" rx="10" fill="#2563eb"/>
          <text x="28" y="36" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900" fontFamily="Arial">C++</text>
        </svg>
      </div>
      <div className="title-main">Rustは本当に<br />C++を<span className="text-primary">置き換える</span>のか？</div>
      <div className="title-sub">システムプログラミングの未来を探る</div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
  <div className="content center-layout">
    <div className="heading mb-8">C++が支える世界</div>
    <div className="metric-grid">
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#1a1a2e"/>
          <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900">UE5</text>
        </svg>
        <div className="metric-label">ゲームエンジン</div>
      </div>
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#0078d4"/>
          <rect x="8" y="8" width="10" height="10" rx="1" fill="#fff"/>
          <rect x="22" y="8" width="10" height="10" rx="1" fill="#fff"/>
          <rect x="8" y="22" width="10" height="10" rx="1" fill="#fff"/>
          <rect x="22" y="22" width="10" height="10" rx="1" fill="#fff"/>
        </svg>
        <div className="metric-label">OS・カーネル</div>
      </div>
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#555"/>
          <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">MCU</text>
        </svg>
        <div className="metric-label">組み込み・車載</div>
      </div>
    </div>
    <div className="mt-12 caption">40年以上の歴史を持つシステムプログラミングの王者</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
  <div className="content center-layout">
    <div className="tag tag-danger mb-8">Microsoft 調査・Linux Security Report</div>
    <div className="heading">メモリ安全性の脆弱性</div>
    <div className="compare-grid" style={{ maxWidth: '540px' }}>
      <div className="compare-item compare-danger" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#0078d4"/>
          <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">MSFT</text>
        </svg>
        <div className="hero-number" style={{ fontSize: '52px', color: 'var(--color-danger)' }}>70%</div>
        <div className="caption">CVEの約70%が<br />メモリ安全性の問題</div>
      </div>
      <div className="compare-item compare-danger" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <path d="M20 4L36 34H4Z" fill="none" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinejoin="round"/>
          <text x="20" y="28" textAnchor="middle" fill="var(--color-danger)" fontSize="16" fontWeight="900">!</text>
        </svg>
        <div className="hero-number" style={{ fontSize: '52px', color: 'var(--color-danger)' }}>2/3</div>
        <div className="caption">Linuxカーネル脆弱性の<br />約3分の2がメモリ起因</div>
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
    <div className="heading mb-8">所有権システム</div>
    <svg viewBox="0 0 700 200" width="680" height="190">
      {/* C++ side */}
      <rect x="20" y="20" width="280" height="160" rx="12" fill="rgba(37,99,235,0.06)" stroke="#2563eb" strokeWidth="2"/>
      <text x="160" y="50" textAnchor="middle" fill="#2563eb" fontSize="16" fontWeight="800">C++ の世界</text>
      <rect x="40" y="65" width="240" height="28" rx="6" fill="#f1f5f9"/>
      <text x="160" y="84" textAnchor="middle" fill="#1a1d23" fontSize="13" fontWeight="700">変数A → データ</text>
      <rect x="40" y="100" width="240" height="28" rx="6" fill="#f1f5f9"/>
      <text x="160" y="119" textAnchor="middle" fill="#1a1d23" fontSize="13" fontWeight="700">変数B → データ</text>
      <rect x="40" y="135" width="240" height="28" rx="6" fill="rgba(239,68,68,0.1)"/>
      <text x="160" y="154" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="700">変数C → ???（ダングリング）</text>
      {/* Arrow */}
      <path d="M320 100 H380" stroke="#ce4120" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M370 90 L380 100 L370 110" stroke="#ce4120" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Rust side */}
      <rect x="400" y="20" width="280" height="160" rx="12" fill="rgba(206,65,32,0.06)" stroke="#ce4120" strokeWidth="2"/>
      <text x="540" y="50" textAnchor="middle" fill="#ce4120" fontSize="16" fontWeight="800">Rust の世界</text>
      <rect x="420" y="65" width="240" height="28" rx="6" fill="rgba(5,150,105,0.1)"/>
      <text x="540" y="84" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="700">所有者 → データ（1:1）</text>
      <rect x="420" y="100" width="240" height="28" rx="6" fill="rgba(5,150,105,0.1)"/>
      <text x="540" y="119" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="700">スコープ離脱 → 自動解放</text>
      <rect x="420" y="135" width="240" height="28" rx="6" fill="rgba(5,150,105,0.15)"/>
      <text x="540" y="154" textAnchor="middle" fill="#059669" fontSize="13" fontWeight="800">GC不要 + 実行時コストゼロ</text>
    </svg>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
  <div className="content center-layout">
    <div className="heading mb-8">パフォーマンス比較</div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '110px' }}>CPU処理速度</div>
      <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '96%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-primary">Rust 96</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '110px' }}></div>
      <div className="bar-track"><div className="bar-fill bar-fill-secondary" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-secondary">C++ 100</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '110px' }}>並行処理</div>
      <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-primary">Rust +20%</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '110px' }}>メモリ安全</div>
      <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-primary">Rust ◎</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '110px' }}></div>
      <div className="bar-track"><div className="bar-fill bar-fill-secondary" style={{ '--w': '20%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-secondary">C++ △</div>
    </div>
    <div className="mt-8" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
      <span className="tag tag-primary">
        <svg viewBox="0 0 12 12" width="10" height="10" style={{ verticalAlign: 'middle' }}><rect width="12" height="12" rx="2" fill="#ce4120"/></svg>
        Rust
      </span>
      <span className="tag tag-secondary">
        <svg viewBox="0 0 12 12" width="10" height="10" style={{ verticalAlign: 'middle' }}><rect width="12" height="12" rx="2" fill="#2563eb"/></svg>
        C++
      </span>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
  <div className="content center-layout">
    <div className="tag tag-accent mb-8">Google Android Security Report 2024</div>
    <div className="heading">Rust導入の成果</div>
    <div className="compare-grid" style={{ maxWidth: '540px' }}>
      <div className="compare-item compare-danger" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="14" fill="#4285f4"/>
          <circle cx="14" cy="14" r="4" fill="#ea4335"/>
          <circle cx="26" cy="14" r="4" fill="#fbbc04"/>
          <circle cx="14" cy="26" r="4" fill="#34a853"/>
          <circle cx="26" cy="26" r="4" fill="#4285f4"/>
        </svg>
        <div className="hero-number" style={{ fontSize: '48px', color: 'var(--color-danger)' }}>76%</div>
        <div className="caption">2019年 脆弱性比率</div>
      </div>
      <div className="compare-item compare-success" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="36" height="36" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="20" r="15" fill="var(--color-accent)" opacity=".15"/>
          <path d="M12 20l6 6 12-12" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
        <div className="hero-number" style={{ fontSize: '48px', color: 'var(--color-accent)' }}>24%</div>
        <div className="caption">2024年（Rust移行後）</div>
      </div>
    </div>
    <div className="mt-8 caption">脆弱性件数: 223件 → 50件以下（5年間で激減）</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
  <div className="content center-layout">
    <div className="heading mb-8">主要インフラで採用が加速</div>
    <div className="compare-grid" style={{ maxWidth: '640px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#0078d4"/>
          <rect x="8" y="8" width="10" height="10" rx="1" fill="#fff"/>
          <rect x="22" y="8" width="10" height="10" rx="1" fill="#fff"/>
          <rect x="8" y="22" width="10" height="10" rx="1" fill="#fff"/>
          <rect x="22" y="22" width="10" height="10" rx="1" fill="#fff"/>
        </svg>
        <div className="fw-800" style={{ fontSize: '18px' }}>Microsoft</div>
        <div className="caption mt-4">Windowsカーネルに導入<br />AI変換で10億行移行へ</div>
      </div>
      <div className="compare-item compare-left" style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <circle cx="20" cy="14" r="8" fill="#f5f5f5" stroke="#333" strokeWidth="2"/>
          <ellipse cx="20" cy="26" rx="14" ry="6" fill="#f5f5f5" stroke="#333" strokeWidth="2"/>
          <ellipse cx="20" cy="14" rx="4" ry="6" fill="#333"/>
          <circle cx="17" cy="12" r="1.5" fill="#fff"/>
          <circle cx="23" cy="12" r="1.5" fill="#fff"/>
        </svg>
        <div className="fw-800" style={{ fontSize: '18px' }}>Linux</div>
        <div className="caption mt-4">カーネルにRust永続統合<br />2025年メンテナーサミット</div>
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
    <div className="heading mb-8">クラウド企業のRust採用</div>
    <div className="metric-grid">
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#f38020"/>
          <ellipse cx="20" cy="22" rx="10" ry="6" fill="#fff" opacity=".8"/>
          <ellipse cx="20" cy="18" rx="6" ry="4" fill="#fff" opacity=".6"/>
        </svg>
        <div className="fw-800">Cloudflare</div>
        <div className="caption mt-4">C++→Rustに<br />完全移行</div>
      </div>
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#ff9900"/>
          <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900">AWS</text>
        </svg>
        <div className="fw-800">AWS</div>
        <div className="caption mt-4">Firecracker<br />完全Rust製</div>
      </div>
      <div className="metric-card">
        <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="4" width="32" height="32" rx="4" fill="#5865f2"/>
          <text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">DC</text>
        </svg>
        <div className="fw-800">Discord</div>
        <div className="caption mt-4">サービス一部を<br />Rust化で高速化</div>
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
    <svg viewBox="0 0 60 60" width="52" height="52" style={{ display: 'block', margin: '0 auto 8px' }}>
      <rect x="5" y="30" width="50" height="22" rx="4" fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="2"/>
      <rect x="15" y="22" width="30" height="12" rx="3" fill="rgba(124,58,237,0.2)" stroke="#7c3aed" strokeWidth="2"/>
      <polygon points="30,5 50,22 10,22" fill="rgba(124,58,237,0.3)" stroke="#7c3aed" strokeWidth="2"/>
    </svg>
    <div style={{ fontSize: '36px', fontWeight: 900, color: '#7c3aed', lineHeight: '1.3' }}>ホワイトハウスが<br />Rust移行を勧告</div>
    <div className="mt-12 flow-chain">
      <div className="fc-node">
        <div className="fw-800 text-primary">ONCD 2024</div>
        <div className="caption">C/C++→安全な言語へ</div>
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node">
        <div className="fw-800 text-primary">DARPA</div>
        <div className="caption">自動変換AIに投資</div>
      </div>
      <div className="fc-arr">→</div>
      <div className="fc-node fc-node-highlight">
        <div className="fw-800">2026年</div>
        <div className="caption">移行ロードマップ策定</div>
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
    <svg viewBox="0 0 60 60" width="48" height="48" style={{ display: 'block', margin: '0 auto 8px' }}>
      <rect x="4" y="4" width="52" height="52" rx="10" fill="#dbeafe"/>
      <text x="30" y="40" textAnchor="middle" fill="#2563eb" fontSize="28" fontWeight="900" fontFamily="Arial">C++</text>
    </svg>
    <div style={{ fontSize: '36px', fontWeight: 900, lineHeight: '1.3' }}>でもC++は<span className="text-secondary">死なない</span></div>
    <div className="mt-12 flow-chain">
      <div className="fc-node">
        <svg viewBox="0 0 32 32" width="24" height="24" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="2" y="2" width="28" height="28" rx="4" fill="#1a1a2e"/>
          <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">UE5</text>
        </svg>
        ゲーム
      </div>
      <div className="fc-node">
        <svg viewBox="0 0 32 32" width="24" height="24" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="2" y="2" width="28" height="28" rx="4" fill="#555"/>
          <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">MCU</text>
        </svg>
        車載・IoT
      </div>
      <div className="fc-node">
        <svg viewBox="0 0 32 32" width="24" height="24" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="2" y="2" width="28" height="28" rx="4" fill="#6b21a8"/>
          <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">HPC</text>
        </svg>
        科学計算
      </div>
    </div>
    <div className="mt-8 caption">天文学的な量のC++コードが既存インフラに存在</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
  <div className="content center-layout">
    <div className="heading mb-8">現実的な移行シナリオ</div>
    <div className="flow-chain">
      <div className="fc-node" style={{ borderColor: '#2563eb' }}>
        <svg viewBox="0 0 36 36" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="2" y="2" width="32" height="32" rx="5" fill="#2563eb"/>
          <text x="18" y="24" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="900" fontFamily="Arial">C++</text>
        </svg>
        既存C++<br /><span className="caption">維持・継続</span>
      </div>
      <div className="fc-arr">+</div>
      <div className="fc-node" style={{ borderStyle: 'dashed' }}>
        <svg viewBox="0 0 36 36" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="4" y="8" width="12" height="16" rx="2" fill="#2563eb" opacity=".6"/>
          <rect x="20" y="8" width="12" height="16" rx="2" fill="#ce4120" opacity=".6"/>
          <path d="M16 18 H20" stroke="#333" strokeWidth="2" strokeDasharray="2,1"/>
        </svg>
        C FFI<br /><span className="caption">連携ブリッジ</span>
      </div>
      <div className="fc-arr">+</div>
      <div className="fc-node fc-node-highlight">
        <svg viewBox="0 0 36 36" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}>
          <rect x="2" y="2" width="32" height="32" rx="5" fill="#ce4120"/>
          <text x="18" y="24" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900" fontFamily="Arial">R</text>
        </svg>
        新規Rust<br /><span className="caption">段階的移行</span>
      </div>
    </div>
    <div className="mt-12 caption">「全置き換え」ではなく「段階的共存」が現実解</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
  <div className="content center-layout">
    <div className="heading" style={{ marginBottom: '8px' }}>まとめ：3つのポイント</div>
    <div className="num-list">
      <div className="num-item">
        <div className="num-circle">1</div>
        <div className="num-text">性能はC++と同等、安全性はRustが<span className="text-primary fw-900">圧勝</span></div>
      </div>
      <div className="num-item">
        <div className="num-circle">2</div>
        <div className="num-text">
          <span className="tag tag-secondary">Google</span>
          <span className="tag tag-secondary">MSFT</span>
          <span className="tag tag-secondary">Linux</span>
          <span className="tag tag-secondary">AWS</span>
          <span className="tag tag-secondary">CF</span>
          で採用加速
        </div>
      </div>
      <div className="num-item">
        <div className="num-circle">3</div>
        <div className="num-text">C++との<span className="text-primary fw-900">共存・段階的移行</span>の時代へ</div>
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
    <div style={{ maxWidth: '600px' }}>
      <div className="card card-accent" style={{ textAlign: 'center', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <svg viewBox="0 0 48 48" width="40" height="40">
            <rect x="4" y="4" width="40" height="40" rx="8" fill="#ce4120"/>
            <text x="24" y="32" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900" fontFamily="Arial">R</text>
          </svg>
          <svg viewBox="0 0 48 48" width="40" height="40">
            <rect x="4" y="4" width="40" height="40" rx="8" fill="#2563eb"/>
            <text x="24" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900" fontFamily="Arial">C++</text>
          </svg>
        </div>
        <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-primary)', lineHeight: '1.4' }}>
          ご視聴ありがとうございました
        </div>
        <div className="mt-16 body-text">チャンネル登録・コメントで応援お願いします</div>
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
};

export const TOTAL_SCENE_COUNT = 13;
