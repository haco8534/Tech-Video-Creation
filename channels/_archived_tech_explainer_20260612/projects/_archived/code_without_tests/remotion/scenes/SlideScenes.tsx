import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
  <div className="content center-layout">
    <div className="title-card">
      <div style={{ marginBottom: '8px' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      </div>
      <div className="title-main">「テストを書かないコードは<br />ゴミ」ってまじ？</div>
      <div className="title-sub">ソフトウェアテストの光と影を徹底検証</div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
  <div className="content center-layout">
    <div className="quote-block" style={{ maxWidth: '640px' }}>
      <div style={{ fontSize: '32px', fontWeight: '700', fontStyle: 'normal' }}>"To me, legacy code is simply<br /><span className="text-primary fw-900">code without tests.</span>"</div>
      <div className="quote-author">— Michael Feathers『Working Effectively with Legacy Code』(2004)</div>
    </div>
    <div className="mt-16 body-text" style={{ maxWidth: '560px' }}>テストのないコードは<span className="fw-800 text-primary">書いた翌日でもレガシー</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
  <div className="content center-layout">
    <div className="heading mb-16">今日の3つの論点</div>
    <div className="grid-3col" style={{ maxWidth: '820px' }}>
      <div className="card card-accent stagger-item" style={{ padding: '20px', textAlign: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <div className="body-text fw-800">①</div>
        <div style={{ fontSize: '18px', marginTop: '4px' }}>テストがないと<br />何が起きるか</div>
      </div>
      <div className="card card-purple stagger-item" style={{ padding: '20px', textAlign: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#805ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        <div className="body-text fw-800">②</div>
        <div style={{ fontSize: '18px', marginTop: '4px' }}>テスト至上主義の<br />落とし穴</div>
      </div>
      <div className="card card-success stagger-item" style={{ padding: '20px', textAlign: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div className="body-text fw-800">③</div>
        <div style={{ fontSize: '18px', marginTop: '4px' }}>AI時代のテストの<br />意味</div>
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
    <div className="heading">テストのないコード＝巨大ジェンガ</div>
    <div className="mt-12" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '200px' }}>
      <div style={{ width: '60px', height: '180px', background: 'rgba(229,62,62,0.08)', border: '2px solid rgba(229,62,62,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>認証</div>
      <div style={{ width: '60px', height: '160px', background: 'rgba(229,62,62,0.08)', border: '2px solid rgba(229,62,62,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>DB</div>
      <div style={{ width: '60px', height: '200px', background: 'rgba(229,62,62,0.15)', border: '2px solid var(--color-primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'var(--color-primary)' } as React.CSSProperties}>ここ<br />直す</div>
      <div style={{ width: '60px', height: '140px', background: 'rgba(229,62,62,0.08)', border: '2px solid rgba(229,62,62,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>API</div>
      <div style={{ width: '60px', height: '170px', background: 'rgba(229,62,62,0.08)', border: '2px solid rgba(229,62,62,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>UI</div>
      <div style={{ width: '60px', height: '150px', background: 'rgba(229,62,62,0.08)', border: '2px solid rgba(229,62,62,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>決済</div>
    </div>
    <div className="mt-12 body-text">1箇所触ると<span className="text-primary fw-800">どこが崩れるかわからない</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
  <div className="content center-layout">
    <div className="heading mb-16">バグ修正コストの爆発</div>
    <div style={{ maxWidth: '640px', width: '100%' }}>
      <div className="bar-row stagger-item">
        <div className="bar-label">設計段階</div>
        <div className="bar-track"><div className="bar-fill bar-fill-secondary" style={{ '--w': '5%' } as React.CSSProperties}></div></div>
        <div className="bar-value text-secondary">×1</div>
      </div>
      <div className="bar-row stagger-item">
        <div className="bar-label">コーディング</div>
        <div className="bar-track"><div className="bar-fill bar-fill-accent" style={{ '--w': '15%' } as React.CSSProperties}></div></div>
        <div className="bar-value text-accent">×6.5</div>
      </div>
      <div className="bar-row stagger-item">
        <div className="bar-label">テスト段階</div>
        <div className="bar-track"><div className="bar-fill bar-fill-warning" style={{ '--w': '30%' } as React.CSSProperties}></div></div>
        <div className="bar-value text-warning">×15</div>
      </div>
      <div className="bar-row stagger-item">
        <div className="bar-label" style={{ color: 'var(--color-primary)' }}>本番運用後</div>
        <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
        <div className="bar-value text-primary fw-800">×100</div>
      </div>
    </div>
    <div className="mt-12 caption">出典: IBM Systems Sciences Institute / NIST</div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
  <div className="content center-layout">
    <div className="tag tag-danger mb-8">2012年8月1日 Knight Capital</div>
    <div className="heading" style={{ marginBottom: '8px' }}>45分間の悪夢</div>
    <div className="compare-grid" style={{ maxWidth: '600px' }}>
      <div className="compare-item compare-right" style={{ textAlign: 'center' }}>
        <div className="caption fw-800">原因</div>
        <div className="body-text mt-8">8台中<span className="fw-800 text-primary">1台だけ</span><br />古いコードが残存</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center', borderColor: 'rgba(229,62,62,0.4)' }}>
        <div className="caption fw-800">結果</div>
        <div className="loss-number mt-4">$440M</div>
        <div className="body-text mt-4">約<span className="fw-900 text-primary">550億円</span>の損失</div>
      </div>
    </div>
    <div className="mt-12 body-text">翌日に<span className="text-primary fw-800">事実上の経営破綻</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
  <div className="content center-layout">
    <div className="tag tag-danger mb-8">2024年7月19日 CrowdStrike</div>
    <div className="heading" style={{ marginBottom: '8px' }}>世界同時ブルースクリーン</div>
    <div className="grid-3col" style={{ maxWidth: '720px' }}>
      <div className="card card-accent stagger-item" style={{ padding: '16px', textAlign: 'center' }}>
        <div className="hero-number" style={{ fontSize: '42px' }}>850万</div>
        <div className="caption mt-4">台がクラッシュ</div>
      </div>
      <div className="card card-accent stagger-item" style={{ padding: '16px', textAlign: 'center' }}>
        <div className="hero-number" style={{ fontSize: '42px' }}>4,000+</div>
        <div className="caption mt-4">便が欠航</div>
      </div>
      <div className="card card-accent stagger-item" style={{ padding: '16px', textAlign: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '4px' }}><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
        <div className="body-text fw-800" style={{ fontSize: '20px' }}>病院・銀行</div>
        <div className="caption mt-4">が機能停止</div>
      </div>
    </div>
    <div className="mt-12 body-text">テンプレート検証テストが<span className="text-primary fw-800">バグを見逃した</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
  <div className="content center-layout">
    <div className="tag tag-danger mb-8">1985-1987年 Therac-25</div>
    <div className="heading" style={{ marginBottom: '12px' }}>ソフトウェアバグが奪った命</div>
    <div style={{ maxWidth: '580px' }}>
      <div className="quote-block" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: '700', fontStyle: 'normal' }}>放射線治療装置の<span className="text-primary">競合状態バグ</span>により</div>
        <div className="mt-8" style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'normal', color: 'var(--color-primary)' } as React.CSSProperties}>致死量の放射線が照射</div>
        <div className="mt-8" style={{ fontSize: '20px', fontStyle: 'normal' }}>6件の事故 / <span className="fw-800 text-primary">3名が死亡</span></div>
      </div>
    </div>
    <div className="mt-12 body-text">テストは<span className="text-secondary fw-800">贅沢品ではなく命綱</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
  <div className="content center-layout">
    <div className="heading">カバレッジ100%＝完璧？</div>
    <div className="mt-16 compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' }}>
        <div className="caption fw-800">直感</div>
        <div className="body-text mt-8">100%カバーすれば<br /><span className="fw-800 text-secondary">バグは出ない</span></div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' }}>
        <div className="caption fw-800">現実</div>
        <div className="body-text mt-8">テスト至上主義が<br /><span className="fw-800 text-primary">プロジェクトを殺す</span></div>
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
    <div className="quote-block-purple" style={{ maxWidth: '640px' }}>
      <div style={{ fontSize: '32px', fontWeight: '700', fontStyle: 'normal' }}>"TDD is Dead.<br /><span className="text-accent fw-900">Long Live Testing.</span>"</div>
      <div className="quote-author" style={{ color: 'var(--color-accent)' }}>— David Heinemeier Hansson (DHH), 2014<br />Ruby on Rails 作者</div>
    </div>
    <div className="mt-16 body-text" style={{ maxWidth: '540px' }}>批判対象は「テスト」ではなく<br /><span className="text-accent fw-800">テストのためにコードを歪めること</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
  <div className="content center-layout">
    <div className="heading mb-16">モック地獄</div>
    <div className="flow-horizontal" style={{ maxWidth: '700px' }}>
      <div className="flow-step stagger-item">
        <div className="fw-800">テスト可能に</div>
        <div className="caption mt-4">コードを分割</div>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-step stagger-item">
        <div className="fw-800">モック大量生成</div>
        <div className="caption mt-4">DB・API・入力…</div>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-step flow-step-highlight stagger-item">
        <div className="fw-800">偽物しかない</div>
        <div className="caption mt-4">本番で動かない</div>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-step stagger-item" style={{ borderColor: 'rgba(229,62,62,0.4)' }}>
        <div className="fw-800 text-primary">テストが負債に</div>
        <div className="caption mt-4">本体より長い</div>
      </div>
    </div>
    <div className="mt-16 body-text">「テストのためのテスト」＝<span className="text-primary fw-800">本末転倒</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
  <div className="content center-layout">
    <div className="heading mb-16">"Is TDD Dead?" 三者討論</div>
    <div className="grid-3col" style={{ maxWidth: '820px' }}>
      <div className="card card-purple stagger-item" style={{ padding: '16px', textAlign: 'center' }}>
        <div className="tag tag-accent mb-8">DHH</div>
        <div style={{ fontSize: '18px' }}>テスト駆動の<br /><span className="fw-800 text-accent">教条主義は害</span></div>
      </div>
      <div className="card card-success stagger-item" style={{ padding: '16px', textAlign: 'center' }}>
        <div className="tag tag-secondary mb-8">Kent Beck</div>
        <div style={{ fontSize: '18px' }}>TDDは自分の道具<br /><span className="fw-800 text-secondary">万人向けではない</span></div>
      </div>
      <div className="card card-accent stagger-item" style={{ padding: '16px', textAlign: 'center' }}>
        <div className="tag tag-primary mb-8">Martin Fowler</div>
        <div style={{ fontSize: '18px' }}>テストの価値は<br /><span className="fw-800 text-primary">コスト対効果で判断</span></div>
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
    <div className="tag tag-accent mb-8">Google社内研究 (2019)</div>
    <div className="heading" style={{ marginBottom: '12px' }}>カバレッジの最適値</div>
    <div style={{ maxWidth: '640px', width: '100%' }}>
      <div className="bar-row">
        <div className="bar-label" style={{ minWidth: '80px' }}>0-60%</div>
        <div className="bar-track"><div className="bar-fill bar-fill-warning" style={{ '--w': '60%' } as React.CSSProperties}></div></div>
        <div className="bar-value">効果↑</div>
      </div>
      <div className="bar-row">
        <div className="bar-label" style={{ minWidth: '80px', color: 'var(--color-secondary)', fontWeight: '800' } as React.CSSProperties}>60-80%</div>
        <div className="bar-track" style={{ background: 'rgba(56,161,105,0.12)' }}><div className="bar-fill bar-fill-secondary" style={{ '--w': '85%' } as React.CSSProperties}></div></div>
        <div className="bar-value text-secondary fw-800">最適</div>
      </div>
      <div className="bar-row">
        <div className="bar-label" style={{ minWidth: '80px', color: 'var(--color-primary)' } as React.CSSProperties}>80-100%</div>
        <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '30%' } as React.CSSProperties}></div></div>
        <div className="bar-value text-primary">収穫逓減</div>
      </div>
    </div>
    <div className="mt-12 body-text"><span className="fw-800 text-secondary">60-80%</span>で費用対効果が最大。100%追求は<span className="text-primary fw-800">コスト急増</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
  <div className="content center-layout">
    <div className="heading mb-16">AIが書くテストコード</div>
    <div style={{ maxWidth: '580px', background: '#1a1d23', borderRadius: 'var(--radius)', padding: '24px', fontFamily: "'Courier New', monospace", fontSize: '18px', color: '#e2e8f0', textAlign: 'left', lineHeight: '1.8' } as React.CSSProperties}>
      <div><span style={{ color: '#805ad5' }}>test</span>(<span style={{ color: '#38a169' }}>'calculate works'</span>, () ={'> {'}{'{'})</div>
      <div style={{ paddingLeft: '24px' }}><span style={{ color: '#805ad5' }}>const</span> result = calculate(10, 20);</div>
      <div style={{ paddingLeft: '24px', color: '#718096' }}>// 値の検証なし ← <span style={{ color: '#e53e3e', fontWeight: '800' }}>ここが問題</span></div>
      <div style={{ paddingLeft: '24px' }}><span style={{ color: '#805ad5' }}>expect</span>(result).<span style={{ color: '#38a169' }}>toBeDefined</span>();</div>
      <div>{'}'}); </div>
    </div>
    <div className="mt-12 body-text">エラーが出なければOK → <span className="text-primary fw-800">何も検証していない</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
  <div className="content center-layout">
    <div className="heading mb-16">偶発的カバレッジの正体</div>
    <div className="compare-grid" style={{ maxWidth: '600px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' }}>
        <div className="compare-label text-secondary">見かけ</div>
        <div className="hero-number mt-8" style={{ color: 'var(--color-secondary)' }}>100<span style={{ fontSize: '42px' }}>%</span></div>
        <div className="body-text mt-4">カバレッジ達成！</div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' }}>
        <div className="compare-label text-primary">実態</div>
        <div className="hero-number mt-8" style={{ fontSize: '56px' }}>0<span style={{ fontSize: '42px' }}>件</span></div>
        <div className="body-text mt-4">検出できるバグ</div>
      </div>
    </div>
    <div className="mt-12 body-text">数字は偉い人に喜ばれるが<span className="text-primary fw-800">中身はハリボテ</span></div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
  <div className="content center-layout">
    <div className="heading mb-12">ミューテーションテスト</div>
    <div className="flow-horizontal" style={{ maxWidth: '700px' }}>
      <div className="flow-step flow-step-green stagger-item">
        <div className="fw-800">正常なコード</div>
        <div className="caption mt-4">a + b</div>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-step flow-step-highlight stagger-item">
        <div className="fw-800">変異体を注入</div>
        <div className="caption mt-4">a <span className="text-primary fw-900">−</span> b</div>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-step stagger-item" style={{ borderColor: 'rgba(128,90,213,0.3)' }}>
        <div className="fw-800">テストは検出？</div>
        <div className="caption mt-4">FAIL = 良いテスト</div>
      </div>
    </div>
    <div className="mt-16 compare-grid" style={{ maxWidth: '560px' }}>
      <div className="compare-item compare-left" style={{ textAlign: 'center' }}>
        <div className="caption fw-800">良いテスト</div>
        <div className="body-text mt-4"><span className="fw-800 text-secondary">即座にFAIL</span></div>
      </div>
      <div className="compare-item compare-right" style={{ textAlign: 'center' }}>
        <div className="caption fw-800">ハリボテ</div>
        <div className="body-text mt-4"><span className="fw-800 text-primary">素通りPASS</span></div>
      </div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
  <div className="content center-layout">
    <div className="heading mb-16">テストの本当の価値</div>
    <div className="grid-3col" style={{ maxWidth: '820px' }}>
      <div className="card card-accent stagger-item" style={{ padding: '20px', textAlign: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        <div className="body-text fw-800 mt-4">安全ネット</div>
        <div style={{ fontSize: '16px', marginTop: '8px' }}>変更しても壊れないことを<br />保証する命綱</div>
      </div>
      <div className="card card-success stagger-item" style={{ padding: '20px', textAlign: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        <div className="body-text fw-800 mt-4">生きた仕様書</div>
        <div style={{ fontSize: '16px', marginTop: '8px' }}>実行できるから<br />絶対に嘘をつかない</div>
      </div>
      <div className="card card-purple stagger-item" style={{ padding: '20px', textAlign: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#805ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <div className="body-text fw-800 mt-4">設計の指標</div>
        <div style={{ fontSize: '16px', marginTop: '8px' }}>テストしにくい＝<br />設計が悪い証拠</div>
      </div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
  <div className="content center-layout">
    <div style={{ maxWidth: '620px' }}>
      <div className="card card-success" style={{ textAlign: 'center', padding: '32px' }}>
        <div style={{ fontSize: '24px', fontWeight: '700' }}>テストは「動くことの証明」ではない</div>
        <div className="mt-16" style={{ fontSize: '36px', fontWeight: '900', color: 'var(--color-secondary)', lineHeight: '1.3' } as React.CSSProperties}>
          「安全に変更する権利」を<br />手に入れるためのもの
        </div>
        <div className="mt-16" style={{ fontSize: '22px' }}>
          Software = <span className="fw-800 text-accent">"soft"</span> + "ware"<br />
          変更できなければ、それは<span className="fw-800 text-primary">ハードウェア</span>
        </div>
      </div>
    </div>
  </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
  <div className="content center-layout">
    <div className="title-card">
      <div className="title-main" style={{ fontSize: '40px' }}>量より質。教条主義より実用主義。</div>
      <div className="mt-16 body-text">テストがない地獄も、テストだらけの地獄も<br />どちらも知った上で「良いテスト」を書こう</div>
      <div className="mt-16" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <div className="tag tag-primary" style={{ fontSize: '18px', padding: '8px 20px' }}>👍 高評価</div>
        <div className="tag tag-secondary" style={{ fontSize: '18px', padding: '8px 20px' }}>🔔 チャンネル登録</div>
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
    13: Scene13,
    14: Scene14,
    15: Scene15,
    16: Scene16,
    17: Scene17,
    18: Scene18,
};

export const TOTAL_SCENE_COUNT = 19;
