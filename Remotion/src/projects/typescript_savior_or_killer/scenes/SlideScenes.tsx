import React from 'react';
import { AbsoluteFill } from 'remotion';
import { loadFont } from '@remotion/google-fonts/ZenMaruGothic';
import './slides.css';

loadFont();

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene scene-opening" id="scene-0">
    <div className="content center-layout">
        <div className="icon-row stagger-item">
            <div className="ts-badge">TS</div>
            <span style={{ fontSize: '32px', fontWeight: '900', color: '#9ca3af' }}>vs</span>
            <div className="js-badge">JS</div>
        </div>
        <h2 className="title-large stagger-item">TypeScriptは<br /><span className="accent-primary">救世主</span>か、<span className="accent-coral">死神</span>か</h2>
        <div className="subtitle-text stagger-item">JavaScriptの自由は守られたのか</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-1">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">TypeScriptの現在地</h2>
        <div className="metric-grid stagger-item">
            <div className="metric-card"><svg viewBox="0 0 32 32" width="28" height="28" style={{margin:'0 auto 4px'}}><rect x="2" y="6" width="28" height="20" rx="3" fill="none" stroke="var(--primary)" strokeWidth="2"/><path d="M8 14h6M8 18h10M8 22h4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="24" cy="14" r="3" fill="var(--primary)" opacity=".5"/></svg><div className="metric-value accent-primary">89%</div><div className="metric-label">利用経験率</div></div>
            <div className="metric-card"><svg viewBox="0 0 32 32" width="28" height="28" style={{margin:'0 auto 4px'}}><circle cx="16" cy="16" r="13" fill="none" stroke="var(--primary)" strokeWidth="2"/><path d="M16 16V6M16 16L24 22" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/><circle cx="8" cy="22" r="2" fill="var(--primary)"/><circle cx="22" cy="10" r="2" fill="var(--primary)"/></svg><div className="metric-value accent-primary">3位</div><div className="metric-label">GitHub PR数</div></div>
            <div className="metric-card"><svg viewBox="0 0 32 32" width="28" height="28" style={{margin:'0 auto 4px'}}><path d="M16 4l3.5 7 7.5 1-5.5 5.3 1.3 7.7L16 21.5 9.2 25l1.3-7.7L5 12l7.5-1z" fill="var(--primary)" opacity=".8"/></svg><div className="metric-value accent-primary">4位</div><div className="metric-label">最も好きな言語</div></div>
        </div>
        <div className="subtitle-text stagger-item">もはや「使っていない方が珍しい」レベル</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">問いかけ</h2>
        <div className="big-statement stagger-item">TypeScriptは<br />JavaScriptを<span className="accent-primary">「救った」</span>のか、</div>
        <div className="big-statement stagger-item">それとも<span className="accent-coral">「殺した」</span>のか。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-3">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">TSが来る前の世界</h2>
        <div className="two-col stagger-item">
            <div className="arch-card card-js">
                <div className="card-badge badge-js">BEFORE</div>
                <div className="card-title"><div className="js-badge" style={{ margin: '0 auto 8px' }}>JS</div>魔法の自由さ</div>
                <div className="card-note">テキストエディタ + ブラウザ<br />それだけですぐ動く<br /><span className="accent-teal">学習コスト最小</span></div>
            </div>
            <div className="arch-card card-safe">
                <div className="card-badge badge-blue">AFTER</div>
                <div className="card-title"><div className="ts-badge" style={{ margin: '0 auto 8px' }}>TS</div>型の秩序</div>
                <div className="card-note">tsconfig.json + ビルド設定<br />環境構築が必要<br /><span className="accent-coral">手軽さは死んだ</span></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-4">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">粘土 vs レゴブロック</h2>
        <div className="two-col stagger-item">
            <div className="col-card">
                <svg viewBox="0 0 120 100" width="120" height="100">
                   <path d="M 20 80 Q 40 20 60 60 Q 80 30 100 80 Q 60 60 20 80" fill="#f7df1e" stroke="#b8860b" strokeWidth="3" strokeLinejoin="round" />
                </svg>
                <div className="col-label"><span className="accent-js">粘土</span> = JavaScript</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="col-card">
                <svg viewBox="0 0 120 100" width="120" height="100">
                   <rect x="25" y="40" width="50" height="40" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="2"/>
                   <rect x="35" y="25" width="10" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
                   <rect x="55" y="25" width="10" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
                   <rect x="75" y="50" width="30" height="30" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="2"/>
                </svg>
                <div className="col-label"><span className="accent-primary">レゴ</span> = TypeScript</div>
            </div>
        </div>
        <div className="subtitle-text stagger-item">型という「ジョイント」で正しく接続</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">粘土の魅力</h2>
        <div className="big-statement stagger-item">何にでも変えられる<span className="accent-amber">自由さ</span></div>
        <svg className="stagger-item" viewBox="0 0 400 80" width="400" height="80">
            <circle cx="60" cy="40" r="25" fill="#f7df1e" stroke="#b8860b" strokeWidth="2" />
            <text x="60" y="45" textAnchor="middle" fill="#1a1d23" fontSize="11" fontWeight="700">数値</text>
            <path d="M 95 40 L 125 40" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
            <rect x="135" y="18" width="50" height="44" rx="8" fill="#f7df1e" stroke="#b8860b" strokeWidth="2" />
            <text x="160" y="44" textAnchor="middle" fill="#1a1d23" fontSize="11" fontWeight="700">文字列</text>
            <path d="M 195 40 L 225 40" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
            <polygon points="250,18 280,40 250,62" fill="#f7df1e" stroke="#b8860b" strokeWidth="2" />
            <text x="260" y="44" textAnchor="middle" fill="#1a1d23" fontSize="11" fontWeight="700">配列</text>
            <path d="M 290 40 L 320 40" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
            <text x="360" y="46" textAnchor="middle" fill="#b8860b" fontSize="16" fontWeight="900">???</text>
        </svg>
        <div className="callout callout-info stagger-item">同じ変数にどんな型でも自由に代入できる</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-6">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">100人で粘土の城を作ると</h2>
        <div className="two-col stagger-item">
            <div className="danger-card"><svg viewBox="0 0 40 40" width="36" height="36" style={{margin:'0 auto 6px'}}><path d="M20 4L36 34H4Z" fill="none" stroke="var(--coral)" strokeWidth="2.5" strokeLinejoin="round"/><text x="20" y="28" textAnchor="middle" fill="var(--coral)" fontSize="16" fontWeight="900">!</text></svg><div className="card-badge badge-red">CHAOS</div><div className="card-title">構造が不明</div><div className="card-note">誰が何を作ったか分からない</div></div>
            <div className="danger-card"><svg viewBox="0 0 40 40" width="36" height="36" style={{margin:'0 auto 6px'}}><circle cx="20" cy="20" r="15" fill="none" stroke="var(--coral)" strokeWidth="2.5"/><line x1="10" y1="10" x2="30" y2="30" stroke="var(--coral)" strokeWidth="2.5"/><line x1="30" y1="10" x2="10" y2="30" stroke="var(--coral)" strokeWidth="2.5"/></svg><div className="card-badge badge-red">CRASH</div><div className="card-title">重みで崩壊</div><div className="card-note">型がないから結合時にバグ爆発</div></div>
        </div>
        <div className="subtitle-text stagger-item">大規模開発に粘土は耐えられない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">レゴの安心感</h2>
        <div className="stagger-item" style={{ margin: '12px 0' }}>
            <svg viewBox="0 0 300 80" width="300" height="80">
               <rect x="10" y="30" width="60" height="40" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="3"/>
               <rect x="20" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
               <rect x="38" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
               <rect x="80" y="30" width="60" height="40" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="3"/>
               <rect x="90" y="15" width="12" height="15" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
               <rect x="108" y="15" width="12" height="15" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
               <rect x="150" y="30" width="60" height="40" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="3"/>
               <rect x="160" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
               <rect x="178" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
               <text x="250" y="55" fill="#14b8a6" fontSize="22" fontWeight="900">✓</text>
            </svg>
        </div>
        <div className="big-statement stagger-item">ジョイントが合えば<span className="accent-teal">カチッと接続</span></div>
        <div className="subtitle-text stagger-item">型が一致すれば安全に結合できる</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-8">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">JSの肥大化の歴史</h2>
        <div className="flow-chain stagger-item" style={{gap:'6px',flexWrap:'nowrap'}}>
            <div className="fc-node" style={{borderColor:'var(--secondary)',minWidth:'80px',padding:'8px 10px'}}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{display:'block',margin:'0 auto 4px'}}><rect x="4" y="4" width="32" height="32" rx="4" fill="#f7df1e"/><text x="20" y="28" textAnchor="middle" fill="#1a1d23" fontSize="18" fontWeight="900">JS</text></svg>
                <div className="fc-year accent-amber">1995</div><div style={{fontSize:'11px',fontWeight:700}}>JS誕生</div><div style={{fontSize:'10px',color:'var(--text-light)'}}>10日で開発</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{minWidth:'80px',padding:'8px 10px'}}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{display:'block',margin:'0 auto 4px'}}><rect x="4" y="8" width="32" height="24" rx="3" fill="none" stroke="var(--coral)" strokeWidth="2"/><rect x="8" y="12" width="24" height="2" rx="1" fill="var(--coral)" opacity=".6"/><rect x="8" y="18" width="16" height="2" rx="1" fill="var(--coral)" opacity=".4"/><rect x="8" y="24" width="20" height="2" rx="1" fill="var(--coral)" opacity=".3"/></svg>
                <div className="fc-year accent-amber">2005</div><div style={{fontSize:'11px',fontWeight:700}}>Ajax革命</div><div style={{fontSize:'10px',color:'var(--text-light)'}}>Gmail登場</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{borderColor:'#68a063',minWidth:'80px',padding:'8px 10px'}}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{display:'block',margin:'0 auto 4px'}}><circle cx="20" cy="20" r="14" fill="#68a063"/><text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">Node</text></svg>
                <div className="fc-year accent-amber">2009</div><div style={{fontSize:'11px',fontWeight:700}}>Node.js</div><div style={{fontSize:'10px',color:'var(--text-light)'}}>サーバーへ</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{borderColor:'var(--primary)',background:'var(--primary-light)',minWidth:'80px',padding:'8px 10px'}}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{display:'block',margin:'0 auto 4px'}}><rect x="4" y="4" width="32" height="32" rx="4" fill="#3178c6"/><text x="20" y="28" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">TS</text></svg>
                <div className="fc-year accent-primary" style={{fontWeight:900}}>2012</div><div style={{fontSize:'11px',fontWeight:900,color:'var(--primary)'}}>TypeScript</div><div style={{fontSize:'10px',color:'var(--primary)'}}>型の登場</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{borderColor:'var(--primary)',background:'var(--primary-light)',minWidth:'80px',padding:'8px 10px'}}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{display:'block',margin:'0 auto 4px'}}><path d="M20 6l4 8 8 1.2-5.8 5.6 1.4 8L20 24.4 12.4 29l1.4-8L8 15.2l8-1.2z" fill="var(--primary)"/></svg>
                <div className="fc-year accent-primary" style={{fontWeight:900}}>2024</div><div style={{fontSize:'11px',fontWeight:900,color:'var(--primary)'}}>覇権</div><div style={{fontSize:'10px',color:'var(--primary)'}}>89%採用</div>
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
        <h2 className="scene-title stagger-item">Web開発の進化</h2>
        <div className="flow-chain stagger-item">
            <div className="fc-node"><svg viewBox="0 0 36 36" width="30" height="30" style={{display:'block',margin:'0 auto 4px'}}><rect x="3" y="3" width="30" height="26" rx="3" fill="none" stroke="var(--amber)" strokeWidth="2"/><rect x="3" y="3" width="30" height="6" rx="3" fill="var(--amber)" opacity=".3"/><circle cx="7" cy="6" r="1.5" fill="var(--amber)"/></svg><div className="fc-year accent-amber">1995</div><div>ボタンの色を変える<br /><strong>「飾り」</strong></div></div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><svg viewBox="0 0 36 36" width="30" height="30" style={{display:'block',margin:'0 auto 4px'}}><rect x="3" y="5" width="30" height="22" rx="2" fill="none" stroke="var(--amber)" strokeWidth="2"/><rect x="7" y="9" width="10" height="14" rx="1" fill="var(--amber)" opacity=".2"/><rect x="19" y="9" width="10" height="6" rx="1" fill="var(--amber)" opacity=".2"/><rect x="19" y="17" width="10" height="6" rx="1" fill="var(--amber)" opacity=".2"/></svg><div className="fc-year accent-amber">2005</div><div>Gmail・Google Maps<br /><strong>Webアプリ</strong></div></div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--coral)' }}><svg viewBox="0 0 36 36" width="30" height="30" style={{display:'block',margin:'0 auto 4px'}}><circle cx="18" cy="12" r="5" fill="none" stroke="var(--coral)" strokeWidth="1.5"/><circle cx="10" cy="22" r="4" fill="none" stroke="var(--coral)" strokeWidth="1.5"/><circle cx="26" cy="22" r="4" fill="none" stroke="var(--coral)" strokeWidth="1.5"/><circle cx="18" cy="30" r="3" fill="none" stroke="var(--coral)" strokeWidth="1.5"/><line x1="18" y1="17" x2="12" y2="19" stroke="var(--coral)" strokeWidth="1"/><line x1="18" y1="17" x2="24" y2="19" stroke="var(--coral)" strokeWidth="1"/></svg><div className="fc-year accent-coral">2024</div><div>数百人規模の開発<br /><strong className="accent-coral">型なしは地獄</strong></div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-10">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">JSの実行時エラー</h2>
        <div className="code-box stagger-item">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> app.js</div>
            <div className="code-body"><span className="kw">function</span> <span className="fn">getLength</span>(input) {'{'}{' '}{' '}<span className="kw">return</span> input.<span className="err">length</span>;  <span className="cm">{'// 動くまでエラー不明'}</span>{'}'}<span className="fn">getLength</span>(<span className="str">42</span>);  <span className="cm">{'// 💥 Runtime Error!'}</span></div>
        </div>
        <div className="callout callout-warn stagger-item">TypeError: Cannot read properties of undefined</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">TSのコンパイルエラー</h2>
        <div className="code-box stagger-item">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> app.ts</div>
            <div className="code-body"><span className="kw">function</span> <span className="fn">getLength</span>(input: <span className="tp">string</span>): <span className="tp">number</span> {'{'}{'\n'}  <span className="kw">return</span> input.length;{'\n'}{'}'}{'\n'}<span className="fn">getLength</span>(<span className="err">42</span>);{'\n'}<span className="cm">{'// ❌ Argument of type \'number\' is not'}</span>{'\n'}<span className="cm">{'//    assignable to parameter of type \'string\''}</span></div>
        </div>
        <div className="callout callout-info stagger-item">✅ 書いた瞬間にエラーが分かる → バグ激減</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-12">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">設計者の思想</h2>
        <div className="stagger-item" style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'12px'}}>
            <svg viewBox="0 0 40 40" width="32" height="32"><rect x="4" y="4" width="32" height="32" rx="4" fill="#68217a"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="900">C#</text></svg>
            <svg viewBox="0 0 40 40" width="32" height="32"><rect x="4" y="4" width="32" height="32" rx="4" fill="#ee1f35"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">Delphi</text></svg>
            <svg viewBox="0 0 40 40" width="32" height="32"><rect x="4" y="4" width="32" height="32" rx="4" fill="#3178c6"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="900">TS</text></svg>
        </div>
        <div className="quote-block stagger-item">
            <div className="quote-mark">"</div>
            <div className="quote-body">「JavaScriptを大規模<br />アプリケーション開発に<br />対応させる」</div>
            <div className="quote-attr">— Anders Hejlsberg<br />(C# / Turbo Pascal / Delphi 設計者)</div>
        </div>
        <div className="subtitle-text stagger-item">大規模言語設計のプロが弱点を知り尽くして設計</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-13">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">天才的な戦略</h2>
        <div className="layer-stack stagger-item">
            <div className="layer-row l-ts">TypeScript（型ルールを追加）<span style={{ fontSize: '12px' }}>新しい層</span></div>
            <div className="layer-row l-js">JavaScript（そのまま全部使える）<span style={{ fontSize: '12px' }}>ベース</span></div>
        </div>
        <div className="big-statement stagger-item" style={{ fontSize: '22px', marginTop: '16px' }}>既存のJSコードが<span className="accent-teal">そのままTSとして動く</span></div>
        <div className="subtitle-text stagger-item">スーパーセット戦略で移行の壁をゼロに</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="stagger-item" style={{ marginBottom: '16px', position:'relative', display:'inline-block' }}>
            <div className="ts-badge" style={{ width: '80px', height: '80px', fontSize: '32px' }}>TS</div>
            <svg viewBox="0 0 40 40" width="36" height="36" style={{position:'absolute',top:'-8px',right:'-16px'}}><circle cx="20" cy="20" r="16" fill="var(--coral)"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">⚠</text></svg>
        </div>
        <div className="big-statement stagger-item">しかし<span className="accent-coral">代償</span>がある</div>
        <div className="subtitle-text stagger-item">完璧に見えたTSの闇</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-15">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">TSが奪ったもの</h2>
        <div className="num-list">
            <div className="num-item stagger-item"><div className="num-circle" style={{ background: 'var(--coral)' }}>1</div><div><div className="num-title accent-coral">手軽さの喪失</div><div className="num-desc">Hello Worldですら環境構築が必要に</div></div></div>
            <div className="num-item stagger-item"><div className="num-circle" style={{ background: 'var(--coral)' }}>2</div><div><div className="num-title accent-coral">型パズル地獄</div><div className="num-desc">コードの半分が「型の呪文」になることも</div></div></div>
            <div className="num-item stagger-item"><div className="num-circle" style={{ background: 'var(--coral)' }}>3</div><div><div className="num-title accent-coral">見せかけの安全</div><div className="num-desc">any型で全てが無効化される矛盾</div></div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-16">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">型パズルの現実</h2>
        <div className="code-box stagger-item">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> types.ts</div>
            <div className="code-body"><span className="kw">type</span> <span className="tp">DeepPartial</span>{'<'}T{'>'} ={' '}T <span className="kw">extends</span> Function ? T :{' '}T <span className="kw">extends</span> Array{'<'}<span className="kw">infer</span> U{'>'}{' '}? _DeepPartialArray{'<'}U{'>'} :{' '}T <span className="kw">extends</span> <span className="tp">object</span>{' '}? _DeepPartialObject{'<'}T{'>'} :{' '}T | <span className="tp">undefined</span>;{' '}<span className="cm">{'// 😵 ロジックより型定義が長い...'}</span></div>
        </div>
        <div className="callout callout-warn stagger-item">型を通すこと自体が目的に（本末転倒）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">手軽さの死</h2>
        <div className="two-col stagger-item">
            <div className="arch-card card-js">
                <div className="card-badge badge-js">BEFORE</div>
                <div className="card-title">JS時代</div>
                <div className="card-note">テキストエディタで書く<br />F5を押す<br /><span className="accent-teal" style={{ fontSize: '16px', fontWeight: '900' }}>→ 即動く！</span></div>
            </div>
            <div className="arch-card card-danger">
                <div className="card-badge badge-red">AFTER</div>
                <div className="card-title">TS時代</div>
                <div className="card-note">tsconfig.json設定<br />ビルドツール導入<br /><span className="accent-coral" style={{ fontSize: '16px', fontWeight: '900' }}>→ 環境構築で1時間</span></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-18">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">any型の皮肉</h2>
        <div className="code-box stagger-item">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> danger.ts</div>
            <div className="code-body"><span className="kw">const</span> data: <span className="err">any</span> = fetchData();
data.<span className="fn">whatever</span>();  <span className="cm">// ✅ コンパイル通る</span>
<span className="cm">// 💥 でもランタイムで爆発</span>
<span className="cm">// any = 型チェック完全無効化</span></div>
        </div>
        <div className="big-statement stagger-item" style={{ fontSize: '22px', marginTop: '12px' }}><span className="accent-coral">any</span> を使った瞬間 = ただの<span className="accent-coral">JavaScript</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">脱TypeScript宣言</h2>
        <div className="flow-chain stagger-item">
            <div className="fc-node" style={{ borderColor: 'var(--coral)' }}><svg viewBox="0 0 40 40" width="32" height="32" style={{display:'block',margin:'0 auto 4px'}}><rect x="4" y="4" width="32" height="32" rx="6" fill="#ff3e00"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900">Sv</text></svg><div className="fc-year accent-coral">Svelte</div><div>Rich Harris<br /><strong>TS→JSDoc移行</strong></div></div>
            <div className="fc-arr">×</div>
            <div className="fc-node" style={{ borderColor: 'var(--coral)' }}><svg viewBox="0 0 40 40" width="32" height="32" style={{display:'block',margin:'0 auto 4px'}}><rect x="4" y="4" width="32" height="32" rx="6" fill="#1a1d23"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">Turbo</text></svg><div className="fc-year accent-coral">Turbo</div><div>DHH<br /><strong>TSを全面削除</strong></div></div>
        </div>
        <div className="callout callout-warn stagger-item" style={{ marginTop: '16px' }}>「型は欲しいが、ビルドステップは不要」という声</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-20">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">対立ではない</h2>
        <div className="pipe-row stagger-item">
            <div className="pipe-item"><div className="pipe-icon bg-js">JS</div><div className="pipe-name" style={{ color: '#b8860b', fontWeight: '900' }}>自由な表現</div></div>
            <div className="pipe-plus">+</div>
            <div className="pipe-item"><div className="pipe-icon bg-primary">型</div><div className="pipe-name" style={{ color: 'var(--primary)', fontWeight: '900' }}>秩序のフィルター</div></div>
            <div className="pipe-plus">=</div>
            <div className="pipe-item"><div className="pipe-icon bg-teal">✓</div><div className="pipe-name" style={{ color: 'var(--teal)', fontWeight: '900' }}>安全な実行</div></div>
        </div>
        <div className="subtitle-text stagger-item">JSの上に型のレイヤーを重ねた関係</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">トレードオフ</h2>
        <div className="hub-flow stagger-item">
            <div className="hub-node" style={{ borderColor: 'var(--secondary)' }}><div className="js-badge" style={{ width: '40px', height: '40px', fontSize: '16px', margin: '0 auto 6px' }}>JS</div>短期の手軽さ<br /><small>プロトタイプに最適</small></div>
            <div className="vs-badge">VS</div>
            <div className="hub-node" style={{ borderColor: 'var(--primary)' }}><div className="ts-badge" style={{ width: '40px', height: '40px', fontSize: '16px', margin: '0 auto 6px' }}>TS</div>長期の秩序<br /><small>チーム開発に最適</small></div>
        </div>
        <div className="subtitle-text stagger-item">目的に応じて道具を選ぶ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-22">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">決定的な追い風</h2>
        <div className="two-col stagger-item" style={{ alignItems: 'center' }}>
            <div className="arch-card" style={{ borderColor: 'var(--purple)', width: '200px' }}>
                <svg viewBox="0 0 48 48" width="40" height="40" style={{display:'block',margin:'0 auto 6px'}}><rect x="6" y="10" width="36" height="28" rx="4" fill="var(--purple)" opacity=".15" stroke="var(--purple)" strokeWidth="2"/><circle cx="18" cy="24" r="3" fill="var(--purple)"/><circle cx="30" cy="24" r="3" fill="var(--purple)"/><path d="M15 32 Q24 36 33 32" stroke="var(--purple)" strokeWidth="2" fill="none" strokeLinecap="round"/><rect x="18" y="4" width="12" height="8" rx="2" fill="var(--purple)" opacity=".3"/></svg>
                <div className="card-badge badge-purple">AI</div>
                <div className="card-title">Copilot</div>
                <div className="card-note">コード予測<br />自動補完</div>
            </div>
            <div style={{ fontSize: '60px', fontWeight: '900', color: 'var(--primary)' }}>×</div>
            <div className="arch-card card-safe" style={{ width: '200px' }}>
                <svg viewBox="0 0 48 48" width="40" height="40" style={{display:'block',margin:'0 auto 6px'}}><rect x="6" y="6" width="36" height="36" rx="6" fill="#3178c6"/><text x="24" y="32" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">TS</text></svg>
                <div className="card-badge badge-blue">TYPE</div>
                <div className="card-title">型ルール</div>
                <div className="card-note">明確なコンテキスト<br />高精度な推論</div>
            </div>
        </div>
        <div className="subtitle-text stagger-item">AI × 型 = 圧倒的な予測精度</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">型 = AIの道案内</h2>
        <svg className="stagger-item" viewBox="0 0 500 120" width="500" height="120">
            <rect x="10" y="20" width="140" height="80" rx="10" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
            <text x="80" y="50" textAnchor="middle" fill="var(--primary)" fontSize="14" fontWeight="900">型情報</text>
            <text x="80" y="72" textAnchor="middle" fill="var(--text)" fontSize="11">string | number</text>
            <path d="M 160 60 L 190 60" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)"/>
            <rect x="200" y="20" width="140" height="80" rx="10" fill="var(--purple-light)" stroke="var(--purple)" strokeWidth="2"/>
            <text x="270" y="50" textAnchor="middle" fill="var(--purple)" fontSize="14" fontWeight="900">AI推論</text>
            <text x="270" y="72" textAnchor="middle" fill="var(--text)" fontSize="11">高精度な予測</text>
            <path d="M 350 60 L 380 60" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)"/>
            <rect x="390" y="20" width="100" height="80" rx="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
            <text x="440" y="55" textAnchor="middle" fill="var(--teal)" fontSize="14" fontWeight="900">正確な</text>
            <text x="440" y="75" textAnchor="middle" fill="var(--teal)" fontSize="14" fontWeight="900">コード</text>
            <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8" fill="#9ca3af"/></marker></defs>
        </svg>
        <div className="big-statement stagger-item" style={{ fontSize: '20px' }}>型があるから<span className="accent-purple">AIも迷わない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-24">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">未来の姿</h2>
        <div className="stagger-item" style={{display:'flex',alignItems:'center',gap:'10px',justifyContent:'center'}}>
            <svg viewBox="0 0 44 44" width="36" height="36"><circle cx="22" cy="22" r="18" fill="none" stroke="var(--primary)" strokeWidth="2.5"/><text x="22" y="16" textAnchor="middle" fill="var(--primary)" fontSize="8" fontWeight="900">TC39</text><text x="22" y="30" textAnchor="middle" fill="var(--primary)" fontSize="8" fontWeight="700">ECMA</text></svg>
            <div className="big-statement">TC39 <span className="accent-primary">Type Annotations</span> 提案</div>
        </div>
        <div className="flow-row stagger-item">
            <div className="flow-chip chip-js"><svg viewBox="0 0 20 20" width="14" height="14" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px'}}><rect width="20" height="20" rx="3" fill="#f7df1e"/><text x="10" y="15" textAnchor="middle" fill="#1a1d23" fontSize="12" fontWeight="900">JS</text></svg>JavaScript</div>
            <div className="flow-connector">に</div>
            <div className="flow-chip chip-blue">型注釈</div>
            <div className="flow-connector">を</div>
            <div className="flow-chip chip-teal">標準搭載</div>
        </div>
        <div className="callout callout-info stagger-item" style={{ marginTop: '16px' }}>ビルド不要で型チェックできる未来が見えてきた</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene25: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-25">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">結論</h2>
        <div className="big-statement stagger-item">TSはJSの<span className="accent-amber">「魔法的な自由さ」</span>を<br /><span className="accent-coral">殺した</span>。</div>
        <div className="big-statement stagger-item" style={{ marginTop: '12px' }}>しかし<span className="accent-primary">「工業的な信頼性」</span>を<br /><span className="accent-teal">与えた</span>。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene26: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-26">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">粘土の小屋から高層ビルへ</h2>
        <div className="two-col stagger-item">
            <div className="col-card">
                <svg viewBox="0 0 100 80" width="100" height="80">
                    <path d="M 20 70 Q 30 30 50 50 Q 70 25 80 70 Z" fill="#f7df1e" stroke="#b8860b" strokeWidth="2"/>
                    <text x="50" y="90" textAnchor="middle" fill="#b8860b" fontSize="10" fontWeight="700">手作りの小屋</text>
                </svg>
            </div>
            <div className="col-arrow">→</div>
            <div className="col-card">
                <svg viewBox="0 0 100 80" width="100" height="80">
                    <rect x="25" y="10" width="50" height="60" fill="#3178c6" stroke="#1e5a9e" strokeWidth="2" rx="2"/>
                    <line x1="25" y1="25" x2="75" y2="25" stroke="#1e5a9e" strokeWidth="1"/>
                    <line x1="25" y1="40" x2="75" y2="40" stroke="#1e5a9e" strokeWidth="1"/>
                    <line x1="25" y1="55" x2="75" y2="55" stroke="#1e5a9e" strokeWidth="1"/>
                    <rect x="40" y="55" width="20" height="15" fill="#dbeafe" stroke="#1e5a9e" strokeWidth="1"/>
                    <text x="50" y="90" textAnchor="middle" fill="#3178c6" fontSize="10" fontWeight="700">高層ビル</text>
                </svg>
            </div>
        </div>
        <div className="subtitle-text stagger-item">大規模アプリに粘土は使えない。レゴが必要だった。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene27: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-27">
    <div className="content center-layout">
        <h2 className="scene-title stagger-item">3つの事実</h2>
        <div className="lesson-cards">
            <div className="lesson-card stagger-item" style={{ borderTop: '3px solid var(--coral)' }}><div className="lesson-num" style={{ color: 'var(--coral)' }}>1</div><div className="lesson-title">自由を殺した</div><div className="lesson-desc">即席で動く手軽さは確かに失われた</div></div>
            <div className="lesson-card stagger-item" style={{ borderTop: '3px solid var(--primary)' }}><div className="lesson-num">2</div><div className="lesson-title">信頼を与えた</div><div className="lesson-desc">企業開発の主力言語に引き上げた</div></div>
            <div className="lesson-card stagger-item" style={{ borderTop: '3px solid var(--purple)' }}><div className="lesson-num" style={{ color: 'var(--purple)' }}>3</div><div className="lesson-title">AIと融合中</div><div className="lesson-desc">型情報がAIの精度を決定的に高める</div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene28: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-28">
    <div className="content center-layout">
        <div className="icon-row stagger-item">
            <div className="js-badge" style={{ width: '60px', height: '60px', fontSize: '24px' }}>JS</div>
            <span style={{ fontSize: '20px', color: '#14b8a6', fontWeight: '900' }}>適材適所</span>
            <div className="ts-badge" style={{ width: '60px', height: '60px', fontSize: '24px' }}>TS</div>
        </div>
        <div className="big-statement stagger-item">手軽なスクリプトには<span className="accent-js">粘土</span>を<br />大規模アプリには<span className="accent-primary">レゴ</span>を</div>
        <div className="title-large stagger-item" style={{ fontSize: '40px', marginTop: '12px' }}>ご視聴ありがとうございました！</div>
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
};

export const TOTAL_SCENE_COUNT = 29;
