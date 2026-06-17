import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="title-large">あなたのパスワードは<br />何秒で破られるか</div>
        <svg viewBox="0 0 780 100" width="780" height="100">
            {/* 南京錠アイコン */}
            <g transform="translate(340,5)">
                <path d="M30 40 C30 20 70 20 70 40" fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round"/>
                <rect x="20" y="40" width="60" height="45" rx="8" fill="#dc2626"/>
                <circle cx="50" cy="60" r="8" fill="#fff"/>
                <rect x="47" y="60" width="6" height="14" rx="2" fill="#fff"/>
            </g>
        </svg>
        <div className="big-statement" style={{ fontSize: '28px' }}>8文字の数字パスワードは<span className="accent-coral">たった15分</span>で突破される</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">8文字・数字のみのパスワード</div>
        <div className="two-col">
            <div className="metric-card" style={{ borderTop: '4px solid var(--coral)' } as React.CSSProperties}>
                <div className="metric-value accent-coral">15分</div>
                <div className="metric-label">解読時間</div>
            </div>
            <div className="metric-card" style={{ borderTop: '4px solid var(--primary)' } as React.CSSProperties}>
                <div className="metric-value accent-primary">12台</div>
                <div className="metric-label">RTX 5090</div>
            </div>
        </div>
        <div className="source">出典: Hive Systems 2025 (bcrypt cost 10基準)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">文字数で激変する解読時間</div>
        <svg viewBox="0 0 780 240" width="780" height="240">
            <defs>
                <marker id="arr1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#2563eb"/></marker>
            </defs>
            {/* 横軸 */}
            <line x1="80" y1="200" x2="740" y2="200" stroke="#d1d5db" strokeWidth="2"/>
            {/* 8文字バー */}
            <rect x="120" y="170" width="120" height="30" rx="6" fill="#dc2626"/>
            <text x="180" y="164" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">164年</text>
            <text x="180" y="220" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">8文字</text>
            {/* 12文字バー */}
            <rect x="320" y="100" width="120" height="100" rx="6" fill="#d97706"/>
            <text x="380" y="90" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">3,000年</text>
            <text x="380" y="220" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">12文字</text>
            {/* 13文字バー */}
            <rect x="520" y="30" width="120" height="170" rx="6" fill="#059669"/>
            <text x="580" y="22" textAnchor="middle" fontSize="20" fontWeight="900" fill="#059669">560億年</text>
            <text x="580" y="220" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">13文字</text>
            {/* 注釈 */}
            <text x="700" y="220" textAnchor="end" fontSize="18" fill="#1a1d23">大小英数記号</text>
        </svg>
        <div className="source">出典: Hive Systems 2025 (12x RTX 5090, bcrypt cost 10)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">世界で最も使われるパスワード</div>
        <svg viewBox="0 0 780 220" width="780" height="220">
            {/* 南京錠 開いた状態 */}
            <g transform="translate(50,20)">
                <path d="M30 60 C30 30 70 30 70 40" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round"/>
                <rect x="20" y="60" width="60" height="40" rx="8" fill="#dc2626" opacity="0.15"/>
                <rect x="20" y="60" width="60" height="40" rx="8" fill="none" stroke="#dc2626" strokeWidth="2"/>
            </g>
            {/* 1位 */}
            <text x="180" y="60" fontSize="20" fontWeight="700" fill="#1a1d23">1位</text>
            <text x="250" y="62" fontSize="36" fontWeight="900" fill="#dc2626" fontFamily="monospace">123456</text>
            <text x="500" y="62" fontSize="20" fill="#dc2626" fontWeight="700">1秒未満で解読</text>
            {/* 2位 */}
            <text x="180" y="110" fontSize="20" fontWeight="700" fill="#1a1d23">2位</text>
            <text x="250" y="112" fontSize="30" fontWeight="900" fill="#d97706" fontFamily="monospace">123456789</text>
            {/* 3位 */}
            <text x="180" y="155" fontSize="20" fontWeight="700" fill="#1a1d23">3位</text>
            <text x="250" y="157" fontSize="30" fontWeight="900" fill="#d97706" fontFamily="monospace">12345678</text>
            {/* 統計 */}
            <rect x="160" y="180" width="460" height="36" rx="8" fill="#fee2e2"/>
            <text x="390" y="204" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">最頻出パスワードの78%が1秒未満で解読可能</text>
        </svg>
        <div className="source">出典: NordPass 2025</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">パスワード漏洩の規模</div>
        <svg viewBox="0 0 780 230" width="780" height="230">
            {/* 人物アイコングリッド: 120億件を表現 */}
            <text x="390" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">Have I Been Pwnedの登録レコード数</text>
            {/* 大きな数字 */}
            <text x="390" y="90" textAnchor="middle" fontSize="56" fontWeight="900" fill="#dc2626">120億件超</text>
            {/* 人物シルエット群 (12体で120億を象徴) */}
            <g transform="translate(140,110)">
                <g fill="#dc2626"><circle cx="0" cy="0" r="10"/><path d="M-15 18 C-15 9 15 9 15 18 L15 26 Q0 32 -15 26 Z"/></g>
                <g fill="#dc2626"><circle cx="50" cy="0" r="10"/><path d="M35 18 C35 9 65 9 65 18 L65 26 Q50 32 35 26 Z"/></g>
                <g fill="#dc2626"><circle cx="100" cy="0" r="10"/><path d="M85 18 C85 9 115 9 115 18 L115 26 Q100 32 85 26 Z"/></g>
                <g fill="#dc2626"><circle cx="150" cy="0" r="10"/><path d="M135 18 C135 9 165 9 165 18 L165 26 Q150 32 135 26 Z"/></g>
                <g fill="#dc2626"><circle cx="200" cy="0" r="10"/><path d="M185 18 C185 9 215 9 215 18 L215 26 Q200 32 185 26 Z"/></g>
                <g fill="#dc2626"><circle cx="250" cy="0" r="10"/><path d="M235 18 C235 9 265 9 265 18 L265 26 Q250 32 235 26 Z"/></g>
                <g fill="#dc2626"><circle cx="300" cy="0" r="10"/><path d="M285 18 C285 9 315 9 315 18 L315 26 Q300 32 285 26 Z"/></g>
                <g fill="#dc2626"><circle cx="350" cy="0" r="10"/><path d="M335 18 C335 9 365 9 365 18 L365 26 Q350 32 335 26 Z"/></g>
                <g fill="#dc2626"><circle cx="400" cy="0" r="10"/><path d="M385 18 C385 9 415 9 415 18 L415 26 Q400 32 385 26 Z"/></g>
                <g fill="#dc2626"><circle cx="450" cy="0" r="10"/><path d="M435 18 C435 9 465 9 465 18 L465 26 Q450 32 435 26 Z"/></g>
                <g fill="#d97706"><circle cx="500" cy="0" r="10"/><path d="M485 18 C485 9 515 9 515 18 L515 26 Q500 32 485 26 Z"/></g>
            </g>
            {/* 漏洩事件リスト */}
            <g transform="translate(100,170)">
                <rect x="0" y="0" width="180" height="50" rx="8" fill="#fee2e2"/>
                <text x="90" y="20" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">LinkedIn</text>
                <text x="90" y="40" textAnchor="middle" fontSize="18" fill="#1a1d23">1.17億件</text>
            </g>
            <g transform="translate(210,170)">
                <rect x="0" y="0" width="180" height="50" rx="8" fill="#fee2e2"/>
                <text x="90" y="20" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">Yahoo!</text>
                <text x="90" y="40" textAnchor="middle" fontSize="18" fill="#1a1d23">30億件</text>
            </g>
            <g transform="translate(420,170)">
                <rect x="0" y="0" width="240" height="50" rx="8" fill="#fee2e2"/>
                <text x="120" y="20" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">Collection #1-5</text>
                <text x="120" y="40" textAnchor="middle" fontSize="18" fill="#1a1d23">250億件</text>
            </g>
        </svg>
        <div className="source">出典: Have I Been Pwned / Verizon DBIR 2025</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">パスワード保存の仕組み</div>
        <svg viewBox="0 0 780 240" width="780" height="240">
            <defs>
                <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#2563eb"/></marker>
                <marker id="arr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#dc2626"/></marker>
            </defs>
            {/* ユーザー */}
            <g transform="translate(40,40)">
                <circle cx="50" cy="20" r="18" fill="#2563eb"/>
                <path d="M20 44 C20 28 80 28 80 44 L80 58 Q50 68 20 58 Z" fill="#2563eb"/>
                <text x="50" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">ユーザー</text>
            </g>
            {/* パスワード入力 */}
            <rect x="150" y="30" width="160" height="50" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="230" y="60" textAnchor="middle" fontSize="20" fontFamily="monospace" fill="#1a1d23">P@ss1234</text>
            {/* 矢印 */}
            <line x1="320" y1="55" x2="380" y2="55" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arr2)"/>
            {/* ハッシュ関数 */}
            <rect x="390" y="20" width="140" height="70" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="460" y="50" textAnchor="middle" fontSize="18" fontWeight="900" fill="#2563eb">ハッシュ関数</text>
            <text x="460" y="72" textAnchor="middle" fontSize="18" fill="#2563eb">一方向変換</text>
            {/* 矢印 */}
            <line x1="540" y1="55" x2="600" y2="55" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arr2)"/>
            {/* ハッシュ値 */}
            <rect x="610" y="25" width="160" height="60" rx="8" fill="#059669" opacity="0.15" stroke="#059669" strokeWidth="2"/>
            <text x="690" y="50" textAnchor="middle" fontSize="18" fontFamily="monospace" fill="#059669" fontWeight="700">a1b2c3d4...</text>
            <text x="690" y="70" textAnchor="middle" fontSize="18" fill="#059669" fontWeight="700">サーバー保存</text>
            {/* 攻撃者のルート */}
            <g transform="translate(40,150)">
                <circle cx="50" cy="20" r="18" fill="#dc2626"/>
                <path d="M20 44 C20 28 80 28 80 44 L80 58 Q50 68 20 58 Z" fill="#dc2626"/>
                <text x="50" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">攻撃者</text>
            </g>
            <rect x="150" y="140" width="160" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="230" y="162" textAnchor="middle" fontSize="18" fontFamily="monospace" fill="#dc2626">aaaaaa?</text>
            <text x="230" y="182" textAnchor="middle" fontSize="18" fill="#dc2626">総当たり</text>
            <line x1="320" y1="165" x2="380" y2="165" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arr3)"/>
            <rect x="390" y="130" width="140" height="70" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="460" y="160" textAnchor="middle" fontSize="18" fontWeight="900" fill="#dc2626">同じハッシュ</text>
            <text x="460" y="182" textAnchor="middle" fontSize="18" fill="#dc2626">一致するか？</text>
            <line x1="540" y1="165" x2="600" y2="100" stroke="#dc2626" strokeWidth="2" strokeDasharray="6" markerEnd="url(#arr3)"/>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">エントロピー = 金庫のダイヤル</div>
        <svg viewBox="0 0 780 240" width="780" height="240">
            {/* 1桁の金庫 */}
            <g transform="translate(60,20)">
                <rect x="0" y="0" width="120" height="140" rx="10" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                <circle cx="60" cy="60" r="35" fill="#fff" stroke="#2563eb" strokeWidth="3"/>
                <text x="60" y="68" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2563eb">3</text>
                <line x1="60" y1="28" x2="60" y2="35" stroke="#2563eb" strokeWidth="2"/>
                <text x="60" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">1桁</text>
                <text x="60" y="160" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">10通り</text>
                <text x="60" y="185" textAnchor="middle" fontSize="18" fill="#1a1d23">3.3bit</text>
            </g>
            {/* 4桁の金庫 */}
            <g transform="translate(240,20)">
                <rect x="0" y="0" width="140" height="140" rx="10" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                <g transform="translate(14,40)">
                    <circle cx="0" cy="0" r="20" fill="#fff" stroke="#d97706" strokeWidth="2.5"/>
                    <text x="0" y="7" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">1</text>
                    <circle cx="38" cy="0" r="20" fill="#fff" stroke="#d97706" strokeWidth="2.5"/>
                    <text x="38" y="7" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">9</text>
                    <circle cx="76" cy="0" r="20" fill="#fff" stroke="#d97706" strokeWidth="2.5"/>
                    <text x="76" y="7" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">8</text>
                    <circle cx="114" cy="0" r="20" fill="#fff" stroke="#d97706" strokeWidth="2.5"/>
                    <text x="114" y="7" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">4</text>
                </g>
                <text x="70" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">4桁</text>
                <text x="70" y="160" textAnchor="middle" fontSize="22" fontWeight="900" fill="#d97706">10,000通り</text>
                <text x="70" y="185" textAnchor="middle" fontSize="18" fill="#1a1d23">13.3bit</text>
            </g>
            {/* 8桁の金庫 */}
            <g transform="translate(460,20)">
                <rect x="0" y="0" width="160" height="140" rx="10" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                <text x="80" y="50" textAnchor="middle" fontSize="24" fontFamily="monospace" fontWeight="900" fill="#059669">* * * * * * * *</text>
                <text x="80" y="80" textAnchor="middle" fontSize="18" fill="#059669" fontWeight="700">英数記号95種</text>
                <text x="80" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">8桁</text>
                <text x="80" y="160" textAnchor="middle" fontSize="22" fontWeight="900" fill="#059669">6.6兆通り</text>
                <text x="80" y="185" textAnchor="middle" fontSize="18" fill="#1a1d23">52.4bit</text>
            </g>
            {/* 補足 */}
            <text x="390" y="230" textAnchor="middle" fontSize="20" fontWeight="700" fill="#2563eb">桁が1つ増えるたびに組み合わせは文字種の数だけ倍増する</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">エントロピーの計算</div>
        <svg viewBox="0 0 780 220" width="780" height="220">
            {/* 公式 */}
            <rect x="140" y="10" width="500" height="60" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="390" y="50" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2563eb">E = L x log2(R) ビット</text>
            {/* 凡例 */}
            <text x="200" y="100" fontSize="20" fill="#1a1d23">L = 文字数</text>
            <text x="480" y="100" fontSize="20" fill="#1a1d23">R = 文字種の数</text>
            {/* 比較表 */}
            <g transform="translate(60,120)">
                <rect x="0" y="0" width="300" height="85" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="150" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#dc2626">数字のみ 8文字</text>
                <text x="150" y="55" textAnchor="middle" fontSize="22" fill="#1a1d23">8 x 3.32 = 26.6bit</text>
                <text x="150" y="78" textAnchor="middle" fontSize="18" fill="#dc2626" fontWeight="700">15分で解読</text>
            </g>
            <g transform="translate(420,120)">
                <rect x="0" y="0" width="300" height="85" rx="10" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
                <text x="150" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#059669">英数記号 12文字</text>
                <text x="150" y="55" textAnchor="middle" fontSize="22" fill="#1a1d23">12 x 6.57 = 78.8bit</text>
                <text x="150" y="78" textAnchor="middle" fontSize="18" fill="#059669" fontWeight="700">3,000年</text>
            </g>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">文字種 vs 文字数</div>
        <svg viewBox="0 0 780 230" width="780" height="230">
            {/* P@ss1234 */}
            <g transform="translate(40,10)">
                <rect x="0" y="0" width="340" height="80" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="20" y="35" fontSize="26" fontFamily="monospace" fontWeight="900" fill="#dc2626">P@ss1234</text>
                <text x="20" y="65" fontSize="20" fill="#1a1d23">8文字・記号あり → <tspan fontWeight="900" fill="#dc2626">52.4bit</tspan></text>
            </g>
            {/* mycatlikestuna */}
            <g transform="translate(400,10)">
                <rect x="0" y="0" width="340" height="80" rx="10" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
                <text x="20" y="35" fontSize="22" fontFamily="monospace" fontWeight="900" fill="#059669">mycatlikestuna</text>
                <text x="20" y="65" fontSize="20" fill="#1a1d23">15文字・小文字 → <tspan fontWeight="900" fill="#059669">70.5bit</tspan></text>
            </g>
            {/* ゲージ比較 */}
            <g transform="translate(40,110)">
                <text x="0" y="20" fontSize="20" fontWeight="700" fill="#1a1d23">エントロピー比較</text>
                <rect x="0" y="35" width="700" height="24" rx="12" fill="#e5e7eb"/>
                <rect x="0" y="35" width="370" height="24" rx="12" fill="#dc2626"/>
                <text x="380" y="53" fontSize="18" fontWeight="700" fill="#dc2626">52.4bit</text>
                <rect x="0" y="75" width="700" height="24" rx="12" fill="#e5e7eb"/>
                <rect x="0" y="75" width="497" height="24" rx="12" fill="#059669"/>
                <text x="507" y="93" fontSize="18" fontWeight="700" fill="#059669">70.5bit</text>
            </g>
            {/* 注意書き */}
            <rect x="40" y="180" width="700" height="40" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
            <text x="390" y="206" textAnchor="middle" fontSize="20" fontWeight="700" fill="#d97706">ただし辞書攻撃には弱い：実効エントロピーは理論値より低下する</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">ハッシュ関数で変わる解読速度</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">MD5</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '100%', background: 'var(--coral)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-coral">1,641億/秒</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">SHA-256</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '13%', background: 'var(--amber)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-amber">220億/秒</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">bcrypt</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '0.01%', background: 'var(--teal)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-teal">18.4万/秒</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">Argon2id</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '0.001%', background: 'var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-primary">1,000/秒</div>
            </div>
        </div>
        <div className="source">出典: Hashcat RTX 4090 ベンチマーク (Chick3nman)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">「意図的な遅さ」という設計思想</div>
        <svg viewBox="0 0 780 240" width="780" height="240">
            {/* ログインユーザー側 */}
            <g transform="translate(40,20)">
                <circle cx="50" cy="20" r="18" fill="#059669"/>
                <path d="M20 44 C20 28 80 28 80 44 L80 58 Q50 68 20 58 Z" fill="#059669"/>
                <text x="50" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">ユーザー</text>
                <text x="50" y="115" textAnchor="middle" fontSize="26" fontWeight="900" fill="#059669">1回</text>
                <text x="50" y="140" textAnchor="middle" fontSize="18" fill="#059669">= 0.1秒</text>
            </g>
            {/* 中央の壁 bcrypt */}
            <g transform="translate(260,10)">
                <rect x="0" y="0" width="260" height="220" rx="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
                <text x="130" y="40" textAnchor="middle" fontSize="24" fontWeight="900" fill="#2563eb">bcrypt</text>
                {/* 歯車メタファー */}
                <circle cx="90" cy="110" r="40" fill="none" stroke="#2563eb" strokeWidth="3"/>
                <circle cx="90" cy="110" r="15" fill="#2563eb"/>
                <circle cx="170" cy="120" r="30" fill="none" stroke="#2563eb" strokeWidth="2.5"/>
                <circle cx="170" cy="120" r="10" fill="#2563eb"/>
                <text x="130" y="190" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">わざと重い計算</text>
            </g>
            {/* 攻撃者側 */}
            <g transform="translate(600,20)">
                <circle cx="50" cy="20" r="18" fill="#dc2626"/>
                <path d="M20 44 C20 28 80 28 80 44 L80 58 Q50 68 20 58 Z" fill="#dc2626"/>
                <text x="50" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">攻撃者</text>
                <text x="50" y="115" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">数十億回</text>
                <text x="50" y="140" textAnchor="middle" fontSize="18" fill="#dc2626">= 数年</text>
            </g>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">同じパスワードでも運命が違う</div>
        <svg viewBox="0 0 780 220" width="780" height="220">
            {/* パスワード */}
            <rect x="240" y="10" width="300" height="50" rx="10" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="390" y="42" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="700" fill="#1a1d23">Password123</text>
            {/* 分岐矢印 */}
            <line x1="300" y1="60" x2="180" y2="100" stroke="#dc2626" strokeWidth="2.5"/>
            <line x1="480" y1="60" x2="600" y2="100" stroke="#059669" strokeWidth="2.5"/>
            {/* MD5 */}
            <g transform="translate(60,100)">
                <rect x="0" y="0" width="240" height="110" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                {/* 南京錠 開 */}
                <g transform="translate(20,15)">
                    <path d="M10 25 C10 10 40 10 40 20" fill="none" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="5" y="25" width="40" height="30" rx="5" fill="#dc2626"/>
                </g>
                <text x="150" y="35" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">MD5</text>
                <text x="120" y="65" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">数秒で解読</text>
                <text x="120" y="92" textAnchor="middle" fontSize="18" fill="#1a1d23">1,641億回/秒</text>
            </g>
            {/* Argon2 */}
            <g transform="translate(480,100)">
                <rect x="0" y="0" width="240" height="110" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
                {/* 南京錠 閉 */}
                <g transform="translate(20,15)">
                    <path d="M10 25 C10 10 40 10 40 25" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="5" y="25" width="40" height="30" rx="5" fill="#059669"/>
                </g>
                <text x="150" y="35" textAnchor="middle" fontSize="22" fontWeight="900" fill="#059669">Argon2id</text>
                <text x="120" y="65" textAnchor="middle" fontSize="22" fontWeight="900" fill="#059669">数年かかる</text>
                <text x="120" y="92" textAnchor="middle" fontSize="18" fill="#1a1d23">1,000回/秒</text>
            </g>
        </svg>
        <div className="big-statement" style={{ fontSize: '24px' }}>サービスの実装はユーザーからは<span className="accent-coral">見えない</span>。だから<span className="accent-primary">使い回しをしない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">NISTが「定期変更」を否定</div>
        <svg viewBox="0 0 780 220" width="780" height="220">
            {/* バツ印付き定期変更 */}
            <g transform="translate(60,20)">
                <rect x="0" y="0" width="300" height="80" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="150" y="35" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">90日ごとにパスワード変更</text>
                <text x="150" y="60" textAnchor="middle" fontSize="18" fill="#dc2626">人間は末尾の数字だけ変える</text>
                {/* バツ */}
                <line x1="260" y1="10" x2="300" y2="50" stroke="#dc2626" strokeWidth="6" strokeLinecap="round"/>
                <line x1="300" y1="10" x2="260" y2="50" stroke="#dc2626" strokeWidth="6" strokeLinecap="round"/>
            </g>
            {/* NIST SP 800-63B */}
            <g transform="translate(420,20)">
                <rect x="0" y="0" width="300" height="80" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
                <text x="150" y="30" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">NIST SP 800-63B Rev.4</text>
                <text x="150" y="58" textAnchor="middle" fontSize="28" fontWeight="900" fill="#dc2626">SHALL NOT</text>
                <text x="150" y="76" textAnchor="middle" fontSize="18" fill="#1a1d23">してはならない</text>
            </g>
            {/* Bill Burr */}
            <g transform="translate(140,130)">
                <rect x="0" y="0" width="500" height="70" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <circle cx="40" cy="35" r="18" fill="#d97706"/>
                <path d="M15 58 C15 45 65 45 65 58 L65 65 Q40 72 15 65 Z" fill="#d97706"/>
                <text x="280" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">初版著者 Bill Burr</text>
                <text x="280" y="56" textAnchor="middle" fontSize="20" fill="#d97706" fontWeight="700">「あのルールは間違いだった」</text>
            </g>
        </svg>
        <div className="source">出典: NIST SP 800-63B Rev.4 (2024) / Enzoic</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">パスワードの新常識</div>
        <div className="two-col">
            <div className="compare-card" style={{ borderTop: '4px solid var(--coral)' } as React.CSSProperties}>
                <div className="card-title accent-coral">旧常識</div>
                <div className="card-body">8文字以上<br />大文字・記号必須<br />90日ごとに変更<br />複雑にすれば安全</div>
            </div>
            <div className="compare-card" style={{ borderTop: '4px solid var(--teal)' } as React.CSSProperties}>
                <div className="card-title accent-teal">NIST推奨</div>
                <div className="card-body">最低15文字<br />複雑性ルール強制しない<br />変更は侵害時のみ<br />漏洩リスト照合必須</div>
            </div>
        </div>
        <div className="source">出典: NIST SP 800-63B Rev.4 (2024)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">LastPass 2022年の教訓</div>
        <svg viewBox="0 0 780 220" width="780" height="220">
            {/* Vault */}
            <g transform="translate(40,20)">
                <rect x="0" y="0" width="180" height="160" rx="14" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                {/* 金庫のドア風 */}
                <circle cx="90" cy="70" r="40" fill="none" stroke="#2563eb" strokeWidth="3"/>
                <circle cx="90" cy="70" r="10" fill="#2563eb"/>
                <text x="90" y="130" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">暗号化Vault</text>
                <text x="90" y="150" textAnchor="middle" fontSize="18" fill="#2563eb">全パスワード格納</text>
            </g>
            {/* 矢印: 盗難 */}
            <g transform="translate(230,60)">
                <line x1="0" y1="30" x2="80" y2="30" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arr3)"/>
                <text x="40" y="18" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">盗難</text>
            </g>
            {/* 攻撃者 */}
            <g transform="translate(330,20)">
                <rect x="0" y="0" width="200" height="160" rx="14" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <circle cx="100" cy="40" r="18" fill="#dc2626"/>
                <path d="M70 64 C70 48 130 48 130 64 L130 78 Q100 88 70 78 Z" fill="#dc2626"/>
                <text x="100" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">弱いマスターPW</text>
                <text x="100" y="132" textAnchor="middle" fontSize="18" fill="#dc2626">を総当たり</text>
                <text x="100" y="155" textAnchor="middle" fontSize="18" fill="#1a1d23">PBKDF2 5,000回</text>
            </g>
            {/* 結果 */}
            <g transform="translate(560,30)">
                <rect x="0" y="0" width="200" height="140" rx="14" fill="#dc2626"/>
                <text x="100" y="40" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">被害額</text>
                <text x="100" y="80" textAnchor="middle" fontSize="36" fontWeight="900" fill="#fff">$150M+</text>
                <text x="100" y="110" textAnchor="middle" fontSize="18" fill="#fff">暗号通貨盗難</text>
                <text x="100" y="130" textAnchor="middle" fontSize="18" fill="#fff">(2025年末時点)</text>
            </g>
        </svg>
        <div className="source">出典: Krebs on Security (2025/03)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">MFAも突破される</div>
        <svg viewBox="0 0 780 220" width="780" height="220">
            {/* MFA盾に亀裂 */}
            <g transform="translate(40,10)">
                {/* 盾 */}
                <path d="M80 10 L140 30 L140 110 Q140 160 80 180 Q20 160 20 110 L20 30 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
                <text x="80" y="80" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">MFA</text>
                <text x="80" y="110" textAnchor="middle" fontSize="18" fill="#2563eb">多要素認証</text>
                {/* 亀裂 */}
                <path d="M90 40 L85 70 L95 90 L80 130" fill="none" stroke="#dc2626" strokeWidth="3"/>
            </g>
            {/* 突破手法 */}
            <g transform="translate(200,20)">
                <rect x="0" y="0" width="540" height="60" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
                <text x="270" y="26" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">BEC事案の79%でMFA突破済み</text>
                <text x="270" y="50" textAnchor="middle" fontSize="18" fill="#1a1d23">FRSecure / Noorstream (2024-2025)</text>
            </g>
            <g transform="translate(200,100)">
                <rect x="0" y="0" width="170" height="55" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="1.5"/>
                <text x="85" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">SIMスワップ</text>
                <text x="85" y="46" textAnchor="middle" fontSize="18" fill="#1a1d23">番号乗っ取り</text>
            </g>
            <g transform="translate(390,100)">
                <rect x="0" y="0" width="170" height="55" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="1.5"/>
                <text x="85" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">AiTM攻撃</text>
                <text x="85" y="46" textAnchor="middle" fontSize="18" fill="#1a1d23">セッション窃取</text>
            </g>
            <g transform="translate(580,100)">
                <rect x="0" y="0" width="170" height="55" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="1.5"/>
                <text x="85" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">MFA疲労</text>
                <text x="85" y="46" textAnchor="middle" fontSize="18" fill="#1a1d23">大量プッシュ</text>
            </g>
            {/* フィッシング耐性 */}
            <g transform="translate(200,175)">
                <rect x="0" y="0" width="540" height="40" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
                <text x="270" y="27" textAnchor="middle" fontSize="20" fontWeight="700" fill="#059669">フィッシング耐性があるのはFIDO2(パスキー)のみ</text>
            </g>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">パスキーの仕組み</div>
        <svg viewBox="0 0 780 240" width="780" height="240">
            <defs>
                <marker id="arr4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#059669"/></marker>
            </defs>
            {/* デバイス */}
            <g transform="translate(30,30)">
                <rect x="0" y="0" width="200" height="180" rx="14" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="20" y="20" width="160" height="100" rx="6" fill="#dbeafe"/>
                {/* 鍵アイコン */}
                <circle cx="80" cy="55" r="18" fill="none" stroke="#2563eb" strokeWidth="3"/>
                <rect x="76" y="70" width="8" height="25" rx="2" fill="#2563eb"/>
                <circle cx="120" cy="55" r="4" fill="#2563eb"/>
                <rect x="120" y="55" width="20" height="4" rx="2" fill="#2563eb"/>
                <text x="100" y="140" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">秘密鍵</text>
                <text x="100" y="165" textAnchor="middle" fontSize="18" fill="#1a1d23">デバイスに保管</text>
            </g>
            {/* Apple + Google ロゴ */}
            <g transform="translate(90,215)">
                <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" x="0" y="0" width="28" height="28"/>
                <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" x="36" y="0" width="28" height="28"/>
            </g>
            {/* 矢印: チャレンジ */}
            <g transform="translate(250,80)">
                <line x1="0" y1="0" x2="120" y2="0" stroke="#059669" strokeWidth="2.5" strokeDasharray="6" markerEnd="url(#arr4)"/>
                <text x="60" y="-10" textAnchor="middle" fontSize="18" fill="#059669" fontWeight="700">チャレンジ</text>
            </g>
            {/* 矢印: 署名 */}
            <g transform="translate(250,140)">
                <line x1="120" y1="0" x2="0" y2="0" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arr2)"/>
                <text x="60" y="-10" textAnchor="middle" fontSize="18" fill="#2563eb" fontWeight="700">署名で応答</text>
            </g>
            {/* サーバー */}
            <g transform="translate(400,30)">
                <rect x="0" y="0" width="200" height="180" rx="14" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="20" y="20" width="160" height="100" rx="6" fill="#d1fae5"/>
                {/* 公開鍵 */}
                <circle cx="100" cy="55" r="18" fill="none" stroke="#059669" strokeWidth="3"/>
                <rect x="96" y="70" width="8" height="25" rx="2" fill="#059669"/>
                <text x="100" y="140" textAnchor="middle" fontSize="20" fontWeight="900" fill="#059669">公開鍵</text>
                <text x="100" y="165" textAnchor="middle" fontSize="18" fill="#1a1d23">サーバーに保管</text>
            </g>
            {/* メリット */}
            <g transform="translate(630,50)">
                <rect x="0" y="0" width="140" height="150" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
                <text x="70" y="30" textAnchor="middle" fontSize="18" fontWeight="900" fill="#059669">メリット</text>
                <text x="70" y="60" textAnchor="middle" fontSize="18" fill="#1a1d23">PW送信不要</text>
                <text x="70" y="85" textAnchor="middle" fontSize="18" fill="#1a1d23">漏洩しても</text>
                <text x="70" y="105" textAnchor="middle" fontSize="18" fill="#1a1d23">秘密鍵は</text>
                <text x="70" y="125" textAnchor="middle" fontSize="18" fontWeight="700" fill="#059669">安全</text>
            </g>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">パスキーの普及状況</div>
        <svg viewBox="0 0 780 220" width="780" height="220">
            {/* 保有率 69% ゲージ */}
            <g transform="translate(40,20)">
                <text x="0" y="20" fontSize="20" fontWeight="700" fill="#1a1d23">パスキー保有率</text>
                <rect x="0" y="35" width="700" height="32" rx="16" fill="#e5e7eb"/>
                <rect x="0" y="35" width="483" height="32" rx="16" fill="#059669"/>
                <text x="495" y="57" fontSize="22" fontWeight="900" fill="#059669">69%</text>
            </g>
            {/* 利用率 26% ゲージ */}
            <g transform="translate(40,90)">
                <text x="0" y="20" fontSize="20" fontWeight="700" fill="#1a1d23">実際のログイン利用率</text>
                <rect x="0" y="35" width="700" height="32" rx="16" fill="#e5e7eb"/>
                <rect x="0" y="35" width="182" height="32" rx="16" fill="#d97706"/>
                <text x="194" y="57" fontSize="22" fontWeight="900" fill="#d97706">26%</text>
            </g>
            {/* 成功率比較 */}
            <g transform="translate(40,160)">
                <rect x="0" y="0" width="330" height="55" rx="10" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
                <text x="165" y="24" textAnchor="middle" fontSize="20" fontWeight="700" fill="#059669">パスキー成功率</text>
                <text x="165" y="48" textAnchor="middle" fontSize="24" fontWeight="900" fill="#059669">98%</text>
            </g>
            <g transform="translate(400,160)">
                <rect x="0" y="0" width="330" height="55" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="165" y="24" textAnchor="middle" fontSize="20" fontWeight="700" fill="#dc2626">パスワード+MFA</text>
                <text x="165" y="48" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">32%</text>
            </g>
        </svg>
        <div className="source">出典: FIDO Alliance Passkey Index 2025</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">今日のまとめ</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--primary)' }}>1</div>
                <div className="num-text"><strong>エントロピーが全て。</strong>文字種より文字数が指数関数的に効く</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--coral)' }}>2</div>
                <div className="num-text"><strong>ハッシュ方式で89万倍の差。</strong>使い回しは絶対NG</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--teal)' }}>3</div>
                <div className="num-text"><strong>NISTは定期変更を否定。</strong>長く・ランダム・固有に</div>
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
        <div className="title-large">パスワードは<br />「複雑さの呪い」から<br />「長さの数学」へ</div>
        <svg viewBox="0 0 780 80" width="780" height="80">
            {/* 閉じた南京錠 */}
            <g transform="translate(340,5)">
                <path d="M30 35 C30 15 70 15 70 35" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round"/>
                <rect x="20" y="35" width="60" height="40" rx="8" fill="#059669"/>
                <circle cx="50" cy="52" r="7" fill="#fff"/>
                <rect x="47" y="52" width="6" height="12" rx="2" fill="#fff"/>
            </g>
        </svg>
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
