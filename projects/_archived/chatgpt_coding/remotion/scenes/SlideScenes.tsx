import React from 'react';
import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import './slides.css';

const { fontFamily } = loadFont();

export const Scene0: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-0">
  <div className="content center-layout">
    <div className="title-card">
      <div style={{ marginBottom: '8px' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="#6366f1" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
      </div>
      <div className="title-main">ChatGPTにコードを<br />書かせるのはプログラミングか？</div>
      <div className="title-sub">プログラミングの本質を70年の歴史から考える</div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-1">
  <div className="content center-layout">
    <div className="caption mb-8">Stack Overflow Developer Survey 2025</div>
    <div className="hero-number">84<span style={{ fontSize: '48px' }}>%</span></div>
    <div className="heading mt-8">開発者がAIツールを使用中</div>
    <div className="body-text mt-12" style={{ maxWidth: '600px' }}>半数以上が毎日使用。コード全体の約3割がAI生成。</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-2">
  <div className="content center-layout">
    <div className="quote-block" style={{ maxWidth: '640px' }}>
      <div style={{ fontSize: '36px', fontWeight: '800', fontStyle: 'normal', color: 'var(--color-text)' }}>「ChatGPTにコードを書かせるのは、<br /><span className="text-primary">プログラミングとは呼べない</span>」</div>
      <div className="mt-16 caption" style={{ fontStyle: 'normal' }}>——この意見をどう思いますか？</div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-3">
  <div className="content center-layout">
    <div className="quote-block" style={{ maxWidth: '640px' }}>
      <div style={{ fontSize: '32px', fontWeight: '700', fontStyle: 'normal' }}>"The hottest new programming language is <span className="text-primary fw-900">English</span>."</div>
      <div className="quote-author">— Andrej Karpathy（OpenAI共同創業者）, 2023</div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-4">
  <div className="content center-layout">
    <div className="heading mb-16">Vibe Coding のフロー</div>
    <div className="flow-horizontal">
      <div className="flow-step"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><br />自然言語<br /><span className="caption">やりたいことを<br />言葉で伝える</span></div>
      <div className="flow-arrow">→</div>
      <div className="flow-step flow-step-highlight"><svg width="28" height="28" viewBox="0 0 24 24" fill="#6366f1" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z"/></svg><br />AI<br /><span className="caption">コードを<br />自動生成</span></div>
      <div className="flow-arrow">→</div>
      <div className="flow-step"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg><br />アプリ<br /><span className="caption">動けばOK<br />コードは見ない</span></div>
    </div>
    <div className="mt-16 caption">「コードの存在を忘れよう」— Karpathy</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-5">
  <div className="content center-layout">
    <div className="tag tag-primary mb-8">Collins English Dictionary 2025</div>
    <div className="heading">"Vibe Coding"</div>
    <div className="hero-number mt-8" style={{ color: 'var(--color-secondary)' }}>2,400<span style={{ fontSize: '42px' }}>%</span></div>
    <div className="body-text mt-8">検索量が爆増 → <span className="fw-800">今年の言葉</span>に選出</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-6">
  <div className="content center-layout">
    <div className="heading mb-16">プロの開発者は？</div>
    <div className="bar-row">
      <div className="bar-label">不使用</div>
      <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '77%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-primary">77%</div>
    </div>
    <div className="bar-row">
      <div className="bar-label">使用中</div>
      <div className="bar-track"><div className="bar-fill bar-fill-secondary" style={{ '--w': '23%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-secondary">23%</div>
    </div>
    <div className="mt-16 body-text">業務では<span className="fw-800 text-primary">77%</span>がvibe codingを使っていない</div>
    <div className="caption mt-8">Stack Overflow Developer Survey 2025</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-7">
  <div className="content center-layout">
    <div className="tag tag-accent mb-8">1950年代</div>
    <div className="heading">パンチカードの時代</div>
    <div className="mt-16 body-text" style={{ maxWidth: '560px' }}>0と1の列——機械語を直接指定して<br />1行ずつプログラムを作っていた</div>
    <div className="mt-16" style={{ fontSize: '24px', letterSpacing: '4px', color: 'var(--color-accent)', fontWeight: '700' }}>01001000 01100101 01101100 01101100</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-8">
  <div className="content center-layout">
    <div className="compare-grid" style={{ maxWidth: '640px' }}>
      <div className="compare-item compare-left">
        <div className="compare-label text-primary">Before: 機械語</div>
        <div style={{ fontFamily: 'monospace', fontSize: '18px', marginTop: '8px' }}>01001000 01100101<br />01101100 01101100<br />01101111 00100000</div>
      </div>
      <div className="compare-item compare-right">
        <div className="compare-label" style={{ color: '#b45309' }}>After: FORTRAN (1957)</div>
        <div style={{ fontFamily: 'monospace', fontSize: '18px', marginTop: '8px' }}>PRINT *, 'HELLO'<br />X = 3.14 * R**2<br />IF (X .GT. 0) ...</div>
      </div>
    </div>
    <div className="mt-16 caption">人間が読める言葉でプログラムが書ける革命</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-9">
  <div className="content center-layout">
    <div className="heading mb-16">FORTRANへの猛反発</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', maxWidth: '820px' }}>
      <div className="card card-warning" style={{ padding: '16px', textAlign: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        <div style={{ fontSize: '18px' }}>「機械のレベルを<br />理解すべきだ」</div>
      </div>
      <div className="card card-warning" style={{ padding: '16px', textAlign: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        <div style={{ fontSize: '18px' }}>「コンパイラの<br />コードは非効率」</div>
      </div>
      <div className="card card-warning" style={{ padding: '16px', textAlign: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        <div style={{ fontSize: '18px' }}>「余計なバグが<br />入る」</div>
      </div>
    </div>
    <div className="mt-12 caption">→ 2025年のAIコーディング批判と<span className="fw-800">同じ論理構造</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-10">
  <div className="content center-layout">
    <div className="heading" style={{ marginBottom: '8px' }}>抽象化の梯子</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', fontWeight: '600', textAlign: 'center', minWidth: '80px' }}>機械語</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700' }}>→</div>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', fontWeight: '600', textAlign: 'center', minWidth: '80px' }}>FORTRAN</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700' }}>→</div>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', fontWeight: '600', textAlign: 'center', minWidth: '80px' }}>OOP</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700' }}>→</div>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', fontWeight: '600', textAlign: 'center', minWidth: '80px' }}>FW</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700' }}>→</div>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', fontWeight: '600', textAlign: 'center', minWidth: '90px' }}>ノーコード</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700' }}>→</div>
      <div style={{ background: 'rgba(99,102,241,0.12)', border: '2px solid var(--color-primary)', borderRadius: '10px', padding: '8px 12px', fontSize: '15px', fontWeight: '800', textAlign: 'center', color: 'var(--color-primary)', minWidth: '80px' }}>AI <span className="tag tag-primary" style={{ fontSize: '12px' }}>NOW</span></div>
    </div>
    <div className="caption mt-8">新しい抽象化が生まれるたびに「本物じゃない」と批判される</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-11">
  <div className="content center-layout">
    <div className="quote-block" style={{ maxWidth: '600px' }}>
      <div style={{ fontSize: '28px', fontWeight: '700', fontStyle: 'normal' }}>"FORTRAN — the infantile disorder"</div>
      <div className="quote-author">— Edsger Dijkstra, 1975</div>
    </div>
    <div className="mt-24 body-text" style={{ maxWidth: '540px' }}>梯子を一段登るたびに<br />「<span className="text-primary fw-800">そんなのは本物のプログラミングじゃない</span>」<br />という声が上がる</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-12">
  <div className="content center-layout">
    <div className="heading mb-16">プログラミングのプロセス</div>
    <div className="process-steps">
      <div className="process-step"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg><br />問題の<br />分析</div>
      <div className="process-step"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg><br />解決策の<br />設計</div>
      <div className="process-step"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7.5.7.7 1.4 1.4 2 2.3V21h2v-2.2c.6-.9 1.3-1.6 2-2.3 2-2 4-4.5 4-7.5a7 7 0 0 0-7-7z"></path><line x1="10" y1="21" x2="14" y2="21"></line></svg><br />アルゴリズム<br />考案</div>
      <div className="process-step process-step-highlight"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg><br />コーディング</div>
      <div className="process-step"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg><br />テスト</div>
      <div className="process-step"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><br />デバッグ</div>
    </div>
    <div className="mt-16 body-text">「コーディング」は全体の<span className="text-primary fw-900">ほんの一部</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-13">
  <div className="content center-layout">
    <div className="tag tag-secondary mb-8">1972年</div>
    <div className="heading">科学電卓の登場</div>
    <div className="mt-16 compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' as const }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="8.01" y2="10"></line><line x1="12" y1="10" x2="12.01" y2="10"></line><line x1="16" y1="10" x2="16.01" y2="10"></line><line x1="8" y1="14" x2="8.01" y2="14"></line><line x1="12" y1="14" x2="12.01" y2="14"></line><line x1="16" y1="14" x2="16.01" y2="14"></line><line x1="8" y1="18" x2="8.01" y2="18"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="16" y1="18" x2="16.01" y2="18"></line></svg>
        <div className="mt-8 body-text fw-800">暗算</div>
        <div className="caption mt-8">従来の計算方法</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' as const }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><circle cx="9" cy="11" r="1" fill="#b45309"></circle><circle cx="15" cy="11" r="1" fill="#b45309"></circle><circle cx="9" cy="16" r="1" fill="#b45309"></circle><circle cx="15" cy="16" r="1" fill="#b45309"></circle><circle cx="12" cy="16" r="1" fill="#b45309"></circle></svg>
        <div className="mt-8 body-text fw-800">電卓</div>
        <div className="caption mt-8">新しいツール</div>
      </div>
    </div>
    <div className="mt-12 caption">「暗算する力が失われる！」と教育者が大騒ぎ</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-14">
  <div className="content center-layout">
    <div className="heading mb-16">電卓の研究結果（1980年代）</div>
    <div className="compare-grid" style={{ maxWidth: '640px' }}>
      <div className="compare-item compare-right">
        <div className="compare-label" style={{ color: '#b45309' }}>❌ 依存した生徒</div>
        <div className="body-text mt-8">推定力・数の感覚が<br /><span className="fw-800 text-danger">弱くなった</span></div>
      </div>
      <div className="compare-item compare-left">
        <div className="compare-label text-primary">✅ 道具として使った生徒</div>
        <div className="body-text mt-8">より高度な問題に<br /><span className="fw-800 text-primary">挑戦できるように</span></div>
      </div>
    </div>
    <div className="mt-16 body-text">ポイントは「<span className="text-primary fw-900">依存か、活用か</span>」</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-15">
  <div className="content center-layout">
    <div className="heading">プログラミングの本質</div>
    <div className="mt-16 compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-right" style={{ textAlign: 'center' as const }}>
        <div className="caption fw-800">算数の本質は</div>
        <div className="body-text mt-8" style={{ textDecoration: 'line-through', color: '#999' }}>九九を暗唱すること</div>
        <div className="body-text mt-8 text-primary fw-800">数の関係を理解すること</div>
      </div>
      <div className="compare-item compare-left" style={{ textAlign: 'center' as const }}>
        <div className="caption fw-800">PGの本質は</div>
        <div className="body-text mt-8" style={{ textDecoration: 'line-through', color: '#999' }}>コードの文字列を打つこと</div>
        <div className="body-text mt-8 text-primary fw-800">問題を構造化する思考力</div>
      </div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-16">
  <div className="content center-layout">
    <div className="heading mb-16">電卓のたとえの限界</div>
    <div className="compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' as const }}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><circle cx="9" cy="11" r="1" fill="#10b981"></circle><circle cx="15" cy="11" r="1" fill="#10b981"></circle><circle cx="12" cy="16" r="1" fill="#10b981"></circle></svg>
        <div className="body-text mt-8 fw-800">電卓</div>
        <div className="mt-8 tag tag-accent">常に正しい答え</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' as const }}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#6366f1"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z"/></svg>
        <div className="body-text mt-8 fw-800">AI</div>
        <div className="mt-8 tag tag-danger">堂々と間違える</div>
      </div>
    </div>
    <div className="mt-16 body-text">AIの場合は「任せて思考に集中」では<span className="text-danger fw-800">済まない</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-17">
  <div className="content center-layout">
    <div className="tag tag-danger mb-8">METR RCT 2025</div>
    <div className="heading">AIで速くなった？</div>
    <div className="mt-16 compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' as const }}>
        <div className="caption fw-800">開発者の予想</div>
        <div className="hero-number mt-8" style={{ color: 'var(--color-accent)' }}>+24%</div>
        <div className="caption mt-8">速くなるはず</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' as const }}>
        <div className="caption fw-800">実際の計測結果</div>
        <div className="hero-number mt-8" style={{ color: '#ef4444' }}>-19%</div>
        <div className="caption mt-8">遅くなっていた</div>
      </div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-18">
  <div className="content center-layout">
    <div className="heading mb-16">知覚ギャップ</div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '100px' }}>事前の予想</div>
      <div className="bar-track"><div className="bar-fill bar-fill-accent" style={{ '--w': '62%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-accent">+24%</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '100px' }}>使用後の体感</div>
      <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '55%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-primary">+20%</div>
    </div>
    <div className="bar-row">
      <div className="bar-label" style={{ minWidth: '100px' }}>実際の速度</div>
      <div className="bar-track"><div className="bar-fill bar-fill-danger" style={{ '--w': '48%' } as React.CSSProperties}></div></div>
      <div className="bar-value text-danger">−19%</div>
    </div>
    <div className="mt-16 body-text">本人は速くなったと<span className="fw-800">思い込んでいた</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-19">
  <div className="content center-layout">
    <div className="heading" style={{ marginBottom: '12px' }}>AIコーディングの落とし穴</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', maxWidth: '820px' }}>
      <div className="card card-warning" style={{ padding: '16px', textAlign: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <div className="text-secondary fw-800" style={{ fontSize: '20px' }}>①</div>
        <div style={{ fontSize: '17px', marginTop: '4px' }}>プロンプト→待ち<br />→確認の<span className="fw-800">時間コスト</span></div>
      </div>
      <div className="card card-warning" style={{ padding: '16px', textAlign: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <div className="text-secondary fw-800" style={{ fontSize: '20px' }}>②</div>
        <div style={{ fontSize: '17px', marginTop: '4px' }}>66%が「微妙に違う」<br />に<span className="fw-800">苛立ち</span></div>
      </div>
      <div className="card card-warning" style={{ padding: '16px', textAlign: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '6px' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        <div className="text-secondary fw-800" style={{ fontSize: '20px' }}>③</div>
        <div style={{ fontSize: '17px', marginTop: '4px' }}>コードチャーン<br />が<span className="fw-800">倍増</span></div>
      </div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-20">
  <div className="content center-layout">
    <div className="heading mb-16">タスク遂行 vs スキル獲得</div>
    <div className="compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' as const }}>
        <div className="caption fw-800">タスクの完了</div>
        <div className="mt-8"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
        <div className="body-text mt-8">アプリは動く</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' as const }}>
        <div className="caption fw-800">概念の理解度</div>
        <div className="mt-8"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="23" y1="6" x2="17" y2="12"></line><polyline points="17 6 23 6 23 12"></polyline><path d="M1 20l6-6 4 4 5-5"></path></svg></div>
        <div className="body-text mt-8">スコアが低い</div>
      </div>
    </div>
    <div className="mt-16 body-text">仕事はできるが、<span className="text-danger fw-800">力はついていない</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-21">
  <div className="content center-layout">
    <div className="heading mb-16">同じ構造の繰り返し</div>
    <div className="compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' as const }}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><circle cx="12" cy="13" r="1" fill="#6366f1"></circle></svg>
        <div className="body-text mt-8 fw-800">電卓に依存</div>
        <div className="caption mt-8">→ 数の感覚を失う</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' as const }}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#ef4444"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z"/></svg>
        <div className="body-text mt-8 fw-800">AIに依存</div>
        <div className="caption mt-8">→ 思考力を失う</div>
      </div>
    </div>
    <div className="mt-16 body-text">しかも、<span className="text-danger fw-800">自分が依存していることにすら気づけない</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-22">
  <div className="content center-layout">
    <div className="heading" style={{ marginBottom: '8px' }}>最初の問いに戻ろう</div>
    <div className="body-text" style={{ marginBottom: '16px' }}>「ChatGPTにコードを書かせるのはプログラミングか？」</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '10px 16px', fontSize: '17px', fontWeight: '600', textAlign: 'center' }}>機械語</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '20px' }}>→</div>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '10px 16px', fontSize: '17px', fontWeight: '600', textAlign: 'center' }}>高水準言語</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '20px' }}>→</div>
      <div style={{ background: 'rgba(16,185,129,0.06)', border: '2px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '10px 16px', fontSize: '17px', fontWeight: '600', textAlign: 'center' }}>ノーコード</div>
      <div style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '20px' }}>→</div>
      <div style={{ background: 'rgba(99,102,241,0.12)', border: '2px solid var(--color-primary)', borderRadius: '10px', padding: '10px 16px', fontSize: '17px', fontWeight: '800', color: 'var(--color-primary)', textAlign: 'center' }}>AI <span className="tag tag-primary" style={{ fontSize: '12px' }}>←ここ</span></div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-23">
  <div className="content center-layout">
    <div className="heading" style={{ fontSize: '36px' }}>プログラミングの本質は</div>
    <div className="mt-16" style={{ fontSize: '42px', fontWeight: '900', color: 'var(--color-primary)', lineHeight: '1.4' }}>
      問題を分解し<br />解決策を構造化する<br />思考力
    </div>
    <div className="mt-24 body-text">その思考を伴うなら、<span className="fw-800">AIに指示を出してもプログラミング</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill style={{ fontFamily }}>
        <div className="scene" id="scene-24">
  <div className="content center-layout">
    <div style={{ maxWidth: '580px' }}>
      <div className="card card-accent" style={{ textAlign: 'center', padding: '32px' }}>
        <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--color-primary)', lineHeight: '1.4' }}>
          AIはプログラミングを殺さない。
        </div>
        <div className="mt-16" style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.4' }}>
          でも「考えること」をやめたら<br />自分のなかの<span className="text-danger">プログラマーは死ぬ</span>
        </div>
      </div>
      <div className="mt-16 body-text" style={{ textAlign: 'center' as const }}>道具は進化する。頭を使うのをやめたら、道具に使われるだけ。</div>
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
    24: Scene24,
};

export const TOTAL_SCENE_COUNT = 25;
