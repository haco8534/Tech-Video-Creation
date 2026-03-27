import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0" >
    <div className="content center-layout bg-dots">
        <h2 className="title-large">プログラマ<br /><span className="accent-primary">Mac</span>好きすぎない？</h2>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: '700', marginTop: '16px' }}>なぜ開発者だけMac率が異常に高いのか</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1" >
    <div className="content">
        <h2 className="scene-title">開発者のMac使用率は<span className="accent-primary">一般の2倍</span></h2>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--text)' }}>16%</div>
                <div className="metric-label">一般PCユーザー</div>
            </div>
            <div className="metric-card" style={{ borderColor: 'var(--primary)' }}>
                <div className="metric-value accent-primary">30%+</div>
                <div className="metric-label">プログラマ</div>
            </div>
        </div>
        <span className="source-badge">Stack Overflow Developer Survey 2023</span>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2" >
    <div className="content center-layout">
        <h2 className="big-statement">「<span className="accent-primary">オシャレだから</span>」<br />で説明できる？</h2>
        <p style={{ fontSize: 'var(--fs-body)', marginTop: '24px', fontWeight: '700' }}>デザインだけでは説明できない<br />技術的・歴史的な理由がある</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3" >
    <div className="content">
        <h2 className="scene-title">パソコン選びで一番大事なこと</h2>
        <svg viewBox="0 0 800 320" style={{ width: '100%', maxHeight: '340px' }}>
            <rect x="40" y="20" width="320" height="280" rx="16" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="2"/>
            <text x="200" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--text)">スペック</text>
            <rect x="80" y="80" width="240" height="40" rx="8" fill="var(--primary-light)"/>
            <text x="200" y="106" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--primary)">CPU・メモリ・ストレージ</text>
            <text x="200" y="160" textAnchor="middle" fontSize="14" fill="var(--text)">多くの人が注目</text>
            <rect x="440" y="20" width="320" height="280" rx="16" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="3"/>
            <text x="600" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--primary)">OSの中身</text>
            <rect x="480" y="80" width="240" height="40" rx="8" fill="var(--primary)" opacity="0.15"/>
            <text x="600" y="106" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--primary)">コマンド体系・カーネル</text>
            <text x="600" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--primary)">プログラマが本当に重視</text>
            <text x="600" y="200" textAnchor="middle" fontSize="28" fontWeight="900" fill="var(--primary)">脳の言語</text>
            <line x1="360" y1="160" x2="440" y2="160" stroke="var(--primary)" strokeWidth="3" strokeDasharray="8,4"/>
            <polygon points="435,155 445,160 435,165" fill="var(--primary)"/>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4" >
    <div className="content">
        <h2 className="scene-title">レシピアプリ vs 包丁</h2>
        <div className="two-col">
            <div className="arch-card">
                <h3 style={{ color: 'var(--text)' }}>一般ユーザー</h3>
                <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '120px' }}>
                    <rect x="30" y="10" width="140" height="80" rx="12" fill="#e5e7eb" stroke="var(--border)" strokeWidth="2"/>
                    <rect x="50" y="30" width="100" height="40" rx="8" fill="var(--primary-light)"/>
                    <text x="100" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--primary)">タップ</text>
                    <text x="100" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text)">GUIのボタンで操作</text>
                </svg>
            </div>
            <div className="arch-card card-primary">
                <h3 style={{ color: 'var(--primary)' }}>プログラマ</h3>
                <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '120px' }}>
                    <rect x="20" y="10" width="160" height="80" rx="4" fill="#1e1e2e"/>
                    <text x="30" y="40" fontSize="12" fill="#f9e2af" fontFamily="monospace">$</text>
                    <text x="45" y="40" fontSize="12" fill="#89b4fa" fontFamily="monospace">grep</text>
                    <text x="85" y="40" fontSize="12" fill="#a6e3a1" fontFamily="monospace">"error"</text>
                    <text x="30" y="60" fontSize="12" fill="#f9e2af" fontFamily="monospace">$</text>
                    <text x="45" y="60" fontSize="12" fill="#89b4fa" fontFamily="monospace">curl</text>
                    <text x="80" y="60" fontSize="12" fill="#a6e3a1" fontFamily="monospace">api.example</text>
                    <text x="100" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primary)">コマンドで直接操作</text>
                </svg>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5" >
    <div className="content">
        <h2 className="scene-title">ターミナル = プログラマの主戦場</h2>
        <div className="code-box">
            <div className="code-head">
                <span className="code-dot red"></span>
                <span className="code-dot yellow"></span>
                <span className="code-dot green"></span>
                Terminal
            </div>
            <div className="code-body">
                <span className="prompt">$</span> <span className="cmd">ls</span> <span className="comment"># ファイル一覧</span><br />
                <span className="prompt">$</span> <span className="cmd">grep</span> <span className="str">"error"</span> log.txt <span className="comment"># 文字列検索</span><br />
                <span className="prompt">$</span> <span className="cmd">curl</span> https://api.example.com <span className="comment"># Web通信</span><br />
                <span className="prompt">$</span> <span className="cmd">ssh</span> user@server <span className="comment"># サーバー接続</span>
            </div>
        </div>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: '700', marginTop: '16px', textAlign: 'center' }}>この命令体系の源流 = <span className="accent-teal">Unix</span>（1969年〜）</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6" >
    <div className="content">
        <h2 className="scene-title">macOS = POSIX認定された<span className="accent-primary">本物のUnix</span></h2>
        <div className="flow-chain">
            <div className="fc-node" style={{ borderColor: 'var(--teal)' }}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}><rect x="4" y="4" width="32" height="32" rx="4" fill="var(--teal)"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900">Unix</text></svg>
                1969年 誕生
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--amber)' }}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}><rect x="4" y="4" width="32" height="32" rx="4" fill="var(--amber)"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">POSIX</text></svg>
                1988年 規格化
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--primary)' }}>
                <svg viewBox="0 0 40 40" width="32" height="32" style={{ display: 'block', margin: '0 auto 4px' }}><circle cx="20" cy="20" r="16" fill="var(--primary)"/><text x="20" y="15" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">Mac</text><text x="20" y="25" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">OS X</text></svg>
                2001年 登場
            </div>
        </div>
        <div className="two-col" style={{ marginTop: '16px' }}>
            <div className="arch-card card-primary">
                <h3 style={{ color: 'var(--primary)' }}>macOS</h3>
                <p>POSIX認定 =「血統書付き」Unix</p>
            </div>
            <div className="arch-card">
                <h3>Linux</h3>
                <p>Unix互換だがPOSIX認定なし</p>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7" >
    <div className="content">
        <h2 className="scene-title">開発環境と本番が<span className="accent-teal">同じ言葉</span>を喋る</h2>
        <div className="flow-chain">
            <div className="fc-node" style={{ borderColor: 'var(--primary)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <div style={{ marginTop: '4px' }}>Mac (Unix)</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--teal)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="var(--teal)"/><circle cx="6" cy="18" r="1" fill="var(--teal)"/></svg>
                <div style={{ marginTop: '4px' }}>サーバー (Linux)</div>
            </div>
        </div>
        <div className="two-col" style={{ marginTop: '20px' }}>
            <div className="arch-card card-safe">
                <h3>Unix系（Mac/Linux）</h3>
                <p style={{ fontFamily: 'monospace', fontSize: '16px' }}>cp / ls / grep / sed</p>
            </div>
            <div className="arch-card card-danger">
                <h3>Windows</h3>
                <p style={{ fontFamily: 'monospace', fontSize: '16px' }}>copy / dir / findstr</p>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8" >
    <div className="content">
        <h2 className="scene-title">追放された男の逆襲</h2>
        <div className="flow-chain">
            <div className="fc-node" style={{ borderColor: 'var(--primary)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><circle cx="20" cy="20" r="16" fill="var(--primary)"/><text x="20" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900">Apple</text></svg>
                1976年<br />共同設立
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--coral)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><circle cx="20" cy="20" r="15" fill="none" stroke="var(--coral)" strokeWidth="2.5"/><line x1="10" y1="10" x2="30" y2="30" stroke="var(--coral)" strokeWidth="2.5"/></svg>
                1985年<br />追放
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--amber)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><rect x="4" y="4" width="32" height="32" rx="4" fill="var(--amber)"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900">NeXT</text></svg>
                1985年<br />設立
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--teal)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><rect x="4" y="4" width="32" height="32" rx="4" fill="var(--teal)"/><text x="20" y="18" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700">NeXT</text><text x="20" y="28" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="900">STEP</text></svg>
                1989年<br />リリース
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9" >
    <div className="content">
        <h2 className="scene-title">NeXTSTEP — 時代を先取りしたOS</h2>
        <div className="layer-stack">
            <div className="layer-row" style={{ background: 'var(--amber-light)', color: 'var(--amber)', fontSize: '20px' }}>オブジェクト指向 開発環境</div>
            <div className="layer-row" style={{ background: 'var(--teal-light)', color: 'var(--teal)', fontSize: '20px' }}>BSD Unix ユーザーランド</div>
            <div className="layer-row" style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '20px' }}>Mach マイクロカーネル</div>
        </div>
        <div className="metric-grid" style={{ marginTop: '20px' }}>
            <div className="metric-card" style={{ borderColor: 'var(--amber)' }}>
                <div className="metric-value accent-amber">90%→10%</div>
                <div className="metric-label">UI開発時間の短縮</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10" >
    <div className="content">
        <h2 className="scene-title">NeXTSTEP上で<span className="accent-teal">Web</span>が生まれた</h2>
        <div className="quote-block" style={{ borderLeftColor: 'var(--teal)' }}>
            <div className="quote-mark" style={{ color: 'var(--teal)' }}>"</div>
            <div className="quote-body">世界初のWebブラウザは<br />NeXTコンピュータの上で開発された</div>
            <div className="quote-author">— ティム・バーナーズ＝リー @ CERN（1990年）</div>
        </div>
        <p style={{ marginTop: '16px', fontSize: 'var(--fs-caption)', fontWeight: '700', textAlign: 'center' }}>追放された男の技術が、インターネットの歴史を変えた</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11" >
    <div className="content">
        <h2 className="scene-title">AppleがNeXTを<span className="accent-amber">4億ドル</span>で買収</h2>
        <svg viewBox="0 0 800 250" style={{ width: '100%', maxHeight: '250px' }}>
            <rect x="20" y="30" width="240" height="180" rx="16" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
            <text x="140" y="70" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">Classic Mac OS</text>
            <text x="140" y="100" textAnchor="middle" fontSize="13" fill="var(--text)">メモリ保護なし</text>
            <text x="140" y="120" textAnchor="middle" fontSize="13" fill="var(--text)">マルチタスク不完全</text>
            <text x="140" y="150" textAnchor="middle" fontSize="13" fill="var(--text)">次世代OS開発 →失敗</text>
            <text x="140" y="190" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--coral)">限界</text>
            <text x="400" y="130" textAnchor="middle" fontSize="32" fontWeight="900" fill="var(--amber)">+</text>
            <rect x="540" y="30" width="240" height="180" rx="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
            <text x="660" y="70" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">NeXTSTEP</text>
            <text x="660" y="100" textAnchor="middle" fontSize="13" fill="var(--text)">Unix基盤</text>
            <text x="660" y="120" textAnchor="middle" fontSize="13" fill="var(--text)">オブジェクト指向</text>
            <text x="660" y="150" textAnchor="middle" fontSize="13" fill="var(--text)">堅牢・高性能</text>
            <text x="660" y="190" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--teal)">1996年 4億ドル</text>
            <line x1="280" y1="120" x2="520" y2="120" stroke="var(--amber)" strokeWidth="3" strokeDasharray="8,4"/>
        </svg>
        <p style={{ textAlign: 'center', fontSize: 'var(--fs-caption)', fontWeight: '700', marginTop: '8px' }}>→ 2001年 <span className="accent-primary">Mac OS X</span> 誕生 → 今のmacOS / iOS の基盤</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12" >
    <div className="content">
        <h2 className="scene-title">ロックインの連鎖</h2>
        <div className="pipe-row">
            <div className="pipe-item" style={{ borderColor: 'var(--primary)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><rect x="4" y="4" width="32" height="32" rx="4" fill="var(--primary)"/><text x="20" y="26" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900">Unix</text></svg>
                <div className="pipe-label" style={{ color: 'var(--primary)' }}>Unix基盤</div>
            </div>
            <div className="pipe-arr">→</div>
            <div className="pipe-item" style={{ borderColor: 'var(--teal)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><rect x="4" y="4" width="32" height="32" rx="6" fill="var(--teal)"/><text x="20" y="18" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700">X</text><text x="20" y="28" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="900">code</text></svg>
                <div className="pipe-label" style={{ color: 'var(--teal)' }}>Xcode独占</div>
            </div>
            <div className="pipe-arr">→</div>
            <div className="pipe-item" style={{ borderColor: 'var(--amber)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><rect x="4" y="4" width="32" height="32" rx="4" fill="var(--amber)"/><text x="20" y="18" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700">Home</text><text x="20" y="28" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="900">brew</text></svg>
                <div className="pipe-label" style={{ color: 'var(--amber)' }}>Homebrew</div>
            </div>
            <div className="pipe-arr">→</div>
            <div className="pipe-item" style={{ borderColor: 'var(--coral)' }}>
                <svg viewBox="0 0 40 40" width="28" height="28" style={{ display: 'block', margin: '0 auto 4px' }}><circle cx="20" cy="20" r="15" fill="var(--coral)" opacity=".15"/><path d="M12 20l6 6 12-12" stroke="var(--coral)" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                <div className="pipe-label" style={{ color: 'var(--coral)' }}>ネットワーク効果</div>
            </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 'var(--fs-body)', fontWeight: '700', marginTop: '24px' }}>技術だけじゃない。抜け出せない構造</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13" >
    <div className="content">
        <h2 className="scene-title">iPhoneアプリ開発 = <span className="accent-primary">Mac必須</span></h2>
        <svg viewBox="0 0 800 280" style={{ width: '100%', maxHeight: '280px' }}>
            <rect x="20" y="60" width="180" height="160" rx="16" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="2"/>
            <rect x="90" y="72" width="40" height="65" rx="6" fill="none" stroke="var(--primary)" strokeWidth="2.5"/>
            <rect x="97" y="80" width="26" height="40" rx="2" fill="var(--primary)" opacity="0.12"/>
            <circle cx="110" cy="130" r="3.5" fill="var(--primary)"/>
            <text x="110" y="150" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">iPhoneアプリ</text>
            <text x="110" y="200" textAnchor="middle" fontSize="13" fill="var(--text)">数百万の開発者</text>
            <line x1="220" y1="140" x2="290" y2="140" stroke="var(--primary)" strokeWidth="3"/>
            <polygon points="285,135 295,140 285,145" fill="var(--primary)"/>
            <rect x="300" y="60" width="200" height="160" rx="16" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="3"/>
            <text x="400" y="110" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--primary)">Xcode</text>
            <text x="400" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--primary)">Apple唯一の開発環境</text>
            <text x="400" y="170" textAnchor="middle" fontSize="14" fill="var(--text)">Swift / Obj-C / SwiftUI</text>
            <text x="400" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--coral)">Mac専用</text>
            <line x1="520" y1="140" x2="590" y2="140" stroke="var(--primary)" strokeWidth="3"/>
            <polygon points="585,135 595,140 585,145" fill="var(--primary)"/>
            <rect x="600" y="60" width="180" height="160" rx="16" fill="var(--card-bg)" stroke="var(--primary)" strokeWidth="2"/>
            <rect x="665" y="78" width="50" height="35" rx="3" fill="none" stroke="var(--primary)" strokeWidth="2.5"/>
            <rect x="670" y="83" width="40" height="25" rx="1" fill="var(--primary)" opacity="0.12"/>
            <rect x="655" y="115" width="70" height="5" rx="2" fill="var(--primary)" opacity="0.3"/>
            <text x="690" y="150" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--primary)">Mac必須</text>
            <text x="690" y="180" textAnchor="middle" fontSize="13" fill="var(--text)">選択肢なし</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14" >
    <div className="content">
        <h2 className="scene-title">Homebrew — 開発者の<span className="accent-teal">魔法のコマンド</span></h2>
        <div className="code-box">
            <div className="code-head">
                <span className="code-dot red"></span><span className="code-dot yellow"></span><span className="code-dot green"></span>
                Terminal
            </div>
            <div className="code-body">
                <span className="prompt">$</span> <span className="cmd">brew install</span> <span className="str">node</span> <span className="comment"># Node.js</span><br />
                <span className="prompt">$</span> <span className="cmd">brew install</span> <span className="str">python</span> <span className="comment"># Python</span><br />
                <span className="prompt">$</span> <span className="cmd">brew install</span> <span className="str">postgresql</span> <span className="comment"># DB</span><br />
                <span className="prompt">$</span> <span className="cmd">brew update</span> <span className="comment"># 全部一括更新</span>
            </div>
        </div>
        <p style={{ fontSize: 'var(--fs-caption)', fontWeight: '700', marginTop: '16px', textAlign: 'center' }}>一度味わったら戻れない快適さ → <span className="accent-coral">それ自体がロックイン</span></p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15" >
    <div className="content">
        <h2 className="scene-title">ネットワーク効果の正の循環</h2>
        <div className="hub-flow">
            <div className="hub-spokes">
                <div className="hub-node">先輩がMac使用</div>
                <div className="hub-node">技術記事がMac前提</div>
            </div>
            <div className="hub-center" style={{ fontSize: '14px', lineHeight: '1.3' }}>ネットワーク<br />効果</div>
            <div className="hub-spokes">
                <div className="hub-node">新人もMac選択</div>
                <div className="hub-node">さらに記事が増加</div>
            </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 'var(--fs-caption)', fontWeight: '700', marginTop: '16px' }}>使う人が増える → 価値が上がる → さらに増える</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16" >
    <div className="content">
        <h2 className="scene-title">技術 × 文化 の二重構造</h2>
        <div className="two-col">
            <div className="arch-card card-primary">
                <h3 style={{ color: 'var(--primary)' }}>技術的合理性</h3>
                <p>Unix環境 / Homebrew / Xcode</p>
                <p style={{ marginTop: '8px' }}>開発効率の客観的な差</p>
            </div>
            <div className="arch-card card-amber">
                <h3 style={{ color: 'var(--amber)' }}>文化的同調</h3>
                <p>スタートアップ文化 / 仲間の証</p>
                <p style={{ marginTop: '8px' }}>Silicon Valleyの暗黙の了解</p>
            </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 'var(--fs-caption)', fontWeight: '700', marginTop: '16px' }}>合理性と非合理性が混ざっている</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17" >
    <div className="content center-layout">
        <h2 className="big-statement">でも今<br />Macの優位性は<br /><span className="accent-coral">揺らいでいる</span></h2>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18" >
    <div className="content">
        <h2 className="scene-title">WSL2 — Windows内の<span className="accent-teal">Linux</span></h2>
        <svg viewBox="0 0 800 280" style={{ width: '100%', maxHeight: '280px' }}>
            <rect x="100" y="10" width="600" height="250" rx="16" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
            <text x="400" y="45" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">Windows</text>
            <rect x="140" y="60" width="520" height="180" rx="12" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
            <text x="400" y="90" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--teal)">WSL2 (Linuxカーネル)</text>
            <rect x="180" y="110" width="140" height="50" rx="8" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="1"/>
            <text x="250" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--teal)">Ubuntu</text>
            <rect x="340" y="110" width="140" height="50" rx="8" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="1"/>
            <text x="410" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--teal)">Docker</text>
            <rect x="500" y="110" width="140" height="50" rx="8" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="1"/>
            <text x="570" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--teal)">VS Code連携</text>
            <text x="400" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">ネイティブに近い速度 / GUI対応</text>
        </svg>
        <p style={{ textAlign: 'center', fontSize: 'var(--fs-caption)', fontWeight: '700', marginTop: '8px' }}><span className="accent-coral">Macの「Unix環境」の優位性</span> が Windows でも実現可能に</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19" >
    <div className="content">
        <h2 className="scene-title">3つのOSを冷静に比較</h2>
        <table className="comp-table">
            <tr><th>開発分野</th><th>最適OS</th><th>理由</th></tr>
            <tr><td>iOS / macOS開発</td><td style={{ color: 'var(--primary)', fontWeight: '900' }}>Mac</td><td>Xcode必須</td></tr>
            <tr><td>ゲーム開発</td><td style={{ color: 'var(--coral)', fontWeight: '900' }}>Windows</td><td>DirectX / GPU</td></tr>
            <tr><td>.NET / C#</td><td style={{ color: 'var(--coral)', fontWeight: '900' }}>Windows</td><td>Visual Studio</td></tr>
            <tr><td>サーバー / インフラ</td><td style={{ color: 'var(--teal)', fontWeight: '900' }}>Linux</td><td>本番と同一環境</td></tr>
            <tr><td>Web バックエンド</td><td style={{ fontWeight: '700' }}>どれでもOK</td><td>WSL2で差が縮小</td></tr>
        </table>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20" >
    <div className="content">
        <h2 className="scene-title">日本のITエンジニアの選択</h2>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label" style={{ color: 'var(--coral)' }}>Windows</div>
                <div className="bar-track"><div className="bar-fill fill-coral" style={{ '--w': '90%' } as React.CSSProperties}></div></div>
                <div className="bar-val" style={{ color: 'var(--coral)' }}>90%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label" style={{ color: 'var(--primary)' }}>Mac</div>
                <div className="bar-track"><div className="bar-fill fill-primary" style={{ '--w': '10%' } as React.CSSProperties}></div></div>
                <div className="bar-val" style={{ color: 'var(--primary)' }}>10%</div>
            </div>
        </div>
        <span className="source-badge" style={{ marginTop: '16px' }}>TECH Street 2021</span>
        <p style={{ fontSize: 'var(--fs-caption)', fontWeight: '700', marginTop: '12px', textAlign: 'center' }}>「プログラマ＝Mac」は<span className="accent-primary">Web系スタートアップ</span>の話</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21" >
    <div className="content">
        <h2 className="scene-title">Apple Silicon — 光と影</h2>
        <div className="two-col">
            <div className="arch-card card-safe">
                <h3 style={{ color: 'var(--teal)' }}>光</h3>
                <div className="num-list" style={{ gap: '10px' }}>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--teal)', width: '28px', height: '28px', fontSize: '14px' }}>✓</div><div className="num-text" style={{ fontSize: '16px' }}>ファンレスで高性能コンパイル</div></div>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--teal)', width: '28px', height: '28px', fontSize: '14px' }}>✓</div><div className="num-text" style={{ fontSize: '16px' }}>バッテリー20時間超</div></div>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--teal)', width: '28px', height: '28px', fontSize: '14px' }}>✓</div><div className="num-text" style={{ fontSize: '16px' }}>ARM効率の革命</div></div>
                </div>
            </div>
            <div className="arch-card card-danger">
                <h3 style={{ color: 'var(--coral)' }}>影</h3>
                <div className="num-list" style={{ gap: '10px' }}>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--coral)', width: '28px', height: '28px', fontSize: '14px' }}>!</div><div className="num-text" style={{ fontSize: '16px' }}>x86ソフトはRosetta 2変換</div></div>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--coral)', width: '28px', height: '28px', fontSize: '14px' }}>!</div><div className="num-text" style={{ fontSize: '16px' }}>一部ライブラリ非互換</div></div>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--coral)', width: '28px', height: '28px', fontSize: '14px' }}>!</div><div className="num-text" style={{ fontSize: '16px' }}>価格がWindows比 2〜3倍</div></div>
                </div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22" >
    <div className="content">
        <h2 className="scene-title">なぜMacが選ばれたのか — 全体像</h2>
        <div className="flow-chain">
            <div className="fc-node" style={{ borderColor: 'var(--teal)' }}>Unix<br />(1969)</div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--amber)' }}>NeXTSTEP<br />(1989)</div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--primary)' }}>Mac OS X<br />(2001)</div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--primary)' }}>iPhone<br />Xcode</div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--teal)' }}>Homebrew<br />効果</div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 'var(--fs-body)', fontWeight: '700', marginTop: '24px' }}>30年の歴史 × 技術 × 文化 の連鎖反応</p>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23" >
    <div className="content center-layout">
        <h2 className="big-statement">「何を<span className="accent-primary">作りたい</span>か」で<br />道具は変わる</h2>
        <p style={{ fontSize: 'var(--fs-body)', fontWeight: '700', marginTop: '24px' }}>OSは手段であって目的じゃない</p>
        <p style={{ fontSize: 'var(--fs-caption)', marginTop: '8px', fontWeight: '400' }}>道具に振り回されるんじゃなくて、道具を使いこなす</p>
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
};

export const TOTAL_SCENE_COUNT = 24;
