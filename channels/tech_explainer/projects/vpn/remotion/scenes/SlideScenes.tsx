import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://api.iconify.design/mdi/shield-lock.svg?color=%236366f1&width=56&height=56" />
        </div>
        <div className="title-large">VPNの広告って<br />なんでこんなに多いの？</div>
        <div className="big-statement">ビジネスの裏側を解剖する</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">NordVPN スポンサー実績</div>
        <div className="two-col">
            <div className="metric-card">
                <div className="metric-value accent-primary">7,800+</div>
                <div className="metric-label">契約YouTuber数</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-teal">44,000+</div>
                <div className="metric-label">スポンサー動画本数</div>
            </div>
        </div>
        <div className="icon-row">
            <img src="https://api.iconify.design/simple-icons/nordvpn.svg?color=%236366f1&width=40&height=40" />
            <img src="https://api.iconify.design/mdi/youtube.svg?color=%23FF0000&width=40&height=40" />
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">世界のVPN利用率</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* 20人の人物アイコン 4x5グリッド: 5人中1人が紫 */}
                {/* Row 1 */}
                <circle cx="100" cy="40" r="14" fill="#d1d5db"/><path d="M80 58 C80 45 120 45 120 58 L120 68 Q100 76 80 68 Z" fill="#d1d5db"/>
                <circle cx="200" cy="40" r="14" fill="#d1d5db"/><path d="M180 58 C180 45 220 45 220 58 L220 68 Q200 76 180 68 Z" fill="#d1d5db"/>
                <circle cx="300" cy="40" r="14" fill="#d1d5db"/><path d="M280 58 C280 45 320 45 320 58 L320 68 Q300 76 280 68 Z" fill="#d1d5db"/>
                <circle cx="400" cy="40" r="14" fill="#6366f1"/><path d="M380 58 C380 45 420 45 420 58 L420 68 Q400 76 380 68 Z" fill="#6366f1"/>
                <circle cx="500" cy="40" r="14" fill="#d1d5db"/><path d="M480 58 C480 45 520 45 520 58 L520 68 Q500 76 480 68 Z" fill="#d1d5db"/>
                {/* Row 2 */}
                <circle cx="100" cy="120" r="14" fill="#d1d5db"/><path d="M80 138 C80 125 120 125 120 138 L120 148 Q100 156 80 148 Z" fill="#d1d5db"/>
                <circle cx="200" cy="120" r="14" fill="#d1d5db"/><path d="M180 138 C180 125 220 125 220 138 L220 148 Q200 156 180 148 Z" fill="#d1d5db"/>
                <circle cx="300" cy="120" r="14" fill="#6366f1"/><path d="M280 138 C280 125 320 125 320 138 L320 148 Q300 156 280 148 Z" fill="#6366f1"/>
                <circle cx="400" cy="120" r="14" fill="#d1d5db"/><path d="M380 138 C380 125 420 125 420 138 L420 148 Q400 156 380 148 Z" fill="#d1d5db"/>
                <circle cx="500" cy="120" r="14" fill="#d1d5db"/><path d="M480 138 C480 125 520 125 520 138 L520 148 Q500 156 480 148 Z" fill="#d1d5db"/>
                {/* Row 3 (partial) */}
                <circle cx="100" cy="200" r="14" fill="#d1d5db"/><path d="M80 218 C80 205 120 205 120 218 L120 228 Q100 236 80 228 Z" fill="#d1d5db"/>
                <circle cx="200" cy="200" r="14" fill="#d1d5db"/><path d="M180 218 C180 205 220 205 220 218 L220 228 Q200 236 180 228 Z" fill="#d1d5db"/>
                {/* Label */}
                <text x="640" y="80" fontSize="48" fontWeight="900" fill="#6366f1" textAnchor="middle">23%</text>
                <text x="640" y="120" fontSize="22" fontWeight="700" fill="#1a1d23" textAnchor="middle">4人に1人が利用</text>
            </svg>
        </div>
        <div className="source">出典: Statista 2024 VPN利用率調査</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="big-statement">なぜVPN会社は<br />こんなに<span className="accent-primary">広告費</span>を出せるのか？</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 120" width="780" height="120">
                <rect x="40" y="20" width="200" height="80" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                <text x="140" y="68" fontSize="20" fontWeight="900" fill="#6366f1" textAnchor="middle">お金の仕組み</text>
                <line x1="250" y1="60" x2="290" y2="60" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrowP)"/>
                <rect x="300" y="20" width="200" height="80" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                <text x="400" y="68" fontSize="20" fontWeight="900" fill="#0d9488" textAnchor="middle">守れるもの</text>
                <line x1="510" y1="60" x2="550" y2="60" stroke="#0d9488" strokeWidth="3"/>
                <rect x="560" y="20" width="200" height="80" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <text x="660" y="68" fontSize="20" fontWeight="900" fill="#ef4444" textAnchor="middle">守れないもの</text>
                <defs><marker id="arrowP" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6" fill="#6366f1"/></marker></defs>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">インターネット通信の経路</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* PC */}
                <rect x="20" y="70" width="100" height="80" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                <text x="70" y="100" fontSize="14" fontWeight="700" fill="#6366f1" textAnchor="middle">あなたの</text>
                <text x="70" y="120" fontSize="14" fontWeight="700" fill="#6366f1" textAnchor="middle">パソコン</text>
                {/* Arrow 1 */}
                <line x1="130" y1="110" x2="190" y2="110" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6 4"/>
                {/* ISP */}
                <rect x="200" y="70" width="100" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
                <text x="250" y="100" fontSize="14" fontWeight="700" fill="#f59e0b" textAnchor="middle">ISP</text>
                <text x="250" y="120" fontSize="12" fontWeight="700" fill="#1a1d23" textAnchor="middle">回線業者</text>
                {/* Arrow 2 */}
                <line x1="310" y1="110" x2="370" y2="110" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6 4"/>
                {/* Relay */}
                <rect x="380" y="70" width="100" height="80" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <text x="430" y="100" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">中継</text>
                <text x="430" y="120" fontSize="12" fontWeight="700" fill="#1a1d23" textAnchor="middle">サーバー</text>
                {/* Arrow 3 */}
                <line x1="490" y1="110" x2="550" y2="110" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6 4"/>
                {/* Web */}
                <rect x="560" y="70" width="100" height="80" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                <text x="610" y="100" fontSize="14" fontWeight="700" fill="#0d9488" textAnchor="middle">Webサイト</text>
                {/* Eye icon above dashed lines */}
                <text x="250" y="50" fontSize="24" textAnchor="middle">👁</text>
                <text x="430" y="50" fontSize="24" textAnchor="middle">👁</text>
                <text x="390" y="200" fontSize="18" fontWeight="700" fill="#ef4444" textAnchor="middle">途中で中身が見える = はがき状態</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">はがき vs 封筒</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">はがき（HTTP）</div>
                <div className="svg-diagram">
                    <svg viewBox="0 0 280 140" width="280" height="140">
                        <rect x="40" y="10" width="200" height="120" rx="6" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
                        <text x="140" y="50" fontSize="16" fontWeight="700" fill="#ef4444" textAnchor="middle">パスワード: 1234</text>
                        <text x="140" y="80" fontSize="14" fill="#1a1d23" textAnchor="middle">中身が丸見え</text>
                        <text x="140" y="115" fontSize="22" textAnchor="middle">👁</text>
                    </svg>
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">封筒（HTTPS）</div>
                <div className="svg-diagram">
                    <svg viewBox="0 0 280 140" width="280" height="140">
                        <rect x="40" y="10" width="200" height="120" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                        <rect x="60" y="30" width="160" height="60" rx="4" fill="#0d9488"/>
                        <text x="140" y="68" fontSize="16" fontWeight="900" fill="#fff" textAnchor="middle">暗号化済み</text>
                        <text x="140" y="115" fontSize="14" fill="#0d9488" textAnchor="middle">中身は読めない</text>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">VPNがやること</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* PC */}
                <rect x="20" y="70" width="90" height="70" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                <text x="65" y="110" fontSize="13" fontWeight="700" fill="#6366f1" textAnchor="middle">あなた</text>
                {/* Tunnel */}
                <rect x="140" y="50" width="380" height="110" rx="16" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="8 4"/>
                <text x="330" y="42" fontSize="14" fontWeight="900" fill="#6366f1" textAnchor="middle">暗号化トンネル</text>
                {/* VPN Server */}
                <rect x="340" y="70" width="120" height="70" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                <image href="https://api.iconify.design/mdi/shield-lock.svg?color=%236366f1&width=32&height=32" x="384" y="74" width="32" height="32"/>
                <text x="400" y="126" fontSize="13" fontWeight="700" fill="#6366f1" textAnchor="middle">VPNサーバー</text>
                {/* Arrow to web */}
                <line x1="470" y1="105" x2="560" y2="105" stroke="#0d9488" strokeWidth="2"/>
                {/* Web */}
                <rect x="570" y="70" width="90" height="70" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                <text x="615" y="110" fontSize="13" fontWeight="700" fill="#0d9488" textAnchor="middle">Webサイト</text>
                {/* Labels */}
                <text x="330" y="190" fontSize="16" fontWeight="700" fill="#6366f1" textAnchor="middle">IPアドレスが隠れる + 通信が暗号化</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">すでに95%が暗号化済み</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 200" width="780" height="200">
                {/* Big lock */}
                <rect x="310" y="60" width="160" height="100" rx="12" fill="#0d9488"/>
                <rect x="345" y="20" width="90" height="60" rx="45" fill="none" stroke="#0d9488" strokeWidth="8"/>
                <text x="390" y="120" fontSize="36" fontWeight="900" fill="#fff" textAnchor="middle">95%</text>
                <text x="390" y="148" fontSize="14" fontWeight="700" fill="#fff" textAnchor="middle">HTTPS対応</text>
                {/* Let's Encrypt logo */}
                <image href="https://api.iconify.design/simple-icons/letsencrypt.svg?color=%23003A70&width=40&height=40" x="100" y="90" width="40" height="40"/>
                <text x="120" y="148" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">Let's Encrypt</text>
                {/* Text */}
                <text x="390" y="188" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">VPNなしでも通信の中身は「封筒」に入っている</text>
            </svg>
        </div>
        <div className="source">出典: W3Techs / HTTP Archive 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">VPN市場の規模</div>
        <div className="metric-card">
            <div className="metric-value accent-primary">~500億ドル</div>
            <div className="metric-label">2023年 世界市場規模（約7兆円超）</div>
        </div>
        <div className="source">出典: ResearchAndMarkets 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">VPNビジネスの利益構造</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* Revenue bar */}
                <text x="100" y="40" fontSize="18" fontWeight="900" fill="#1a1d23" textAnchor="end">売上</text>
                <rect x="120" y="20" width="600" height="40" rx="6" fill="#6366f1"/>
                <text x="420" y="46" fontSize="16" fontWeight="900" fill="#fff" textAnchor="middle">100%</text>
                {/* Cost bar */}
                <text x="100" y="100" fontSize="18" fontWeight="900" fill="#1a1d23" textAnchor="end">コスト</text>
                <rect x="120" y="80" width="120" height="40" rx="6" fill="#ef4444"/>
                <text x="180" y="106" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle">10〜30%</text>
                <text x="260" y="106" fontSize="14" fontWeight="700" fill="#1a1d23">サーバー代 + 人件費</text>
                {/* Profit bar */}
                <text x="100" y="160" fontSize="18" fontWeight="900" fill="#1a1d23" textAnchor="end">利益</text>
                <rect x="120" y="140" width="480" height="40" rx="6" fill="#0d9488"/>
                <text x="360" y="166" fontSize="18" fontWeight="900" fill="#fff" textAnchor="middle">粗利益率 70〜90%超</text>
                {/* Label */}
                <text x="390" y="220" fontSize="16" fontWeight="700" fill="#6366f1" textAnchor="middle">ソフトウェアだから限界費用がほぼゼロ</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">VPNアフィリエイト報酬</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">月間プラン</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '100%', background: 'var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-primary">100%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">年間プラン</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '40%', background: 'var(--teal)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-teal">40%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">更新時</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '30%', background: 'var(--amber)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-amber">30%</div>
            </div>
        </div>
        <div className="icon-row">
            <img src="https://api.iconify.design/simple-icons/nordvpn.svg?color=%236366f1&width=32&height=32" />
        </div>
        <div className="source">出典: NordVPN Affiliate Program</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">LTV（顧客生涯価値）の威力</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Month 1: Red */}
                <rect x="40" y="40" width="100" height="130" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <text x="90" y="70" fontSize="14" fontWeight="900" fill="#ef4444" textAnchor="middle">初月</text>
                <text x="90" y="100" fontSize="22" fontWeight="900" fill="#ef4444" textAnchor="middle">-100%</text>
                <text x="90" y="125" fontSize="12" fontWeight="700" fill="#1a1d23" textAnchor="middle">赤字</text>
                {/* Month 2-12: Green */}
                <rect x="170" y="40" width="200" height="130" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                <text x="270" y="70" fontSize="14" fontWeight="900" fill="#0d9488" textAnchor="middle">2〜12ヶ月目</text>
                <text x="270" y="100" fontSize="22" fontWeight="900" fill="#0d9488" textAnchor="middle">+100%</text>
                <text x="270" y="125" fontSize="12" fontWeight="700" fill="#1a1d23" textAnchor="middle">丸儲け</text>
                {/* Year 2+: Big green */}
                <rect x="400" y="40" width="260" height="130" rx="8" fill="#0d9488"/>
                <text x="530" y="70" fontSize="14" fontWeight="900" fill="#fff" textAnchor="middle">2年目〜</text>
                <text x="530" y="105" fontSize="28" fontWeight="900" fill="#fff" textAnchor="middle">LTV拡大</text>
                <text x="530" y="135" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">初月の赤字を大きく回収</text>
                {/* Arrow */}
                <text x="390" y="210" fontSize="18" fontWeight="700" fill="#6366f1" textAnchor="middle">だから初月100%払っても採算が合う</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">恐怖 × シンプルな解決策</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 200" width="780" height="200">
                {/* Fear box */}
                <rect x="50" y="40" width="280" height="120" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <text x="190" y="80" fontSize="20" fontWeight="900" fill="#ef4444" textAnchor="middle">「ハッカーが</text>
                <text x="190" y="110" fontSize="20" fontWeight="900" fill="#ef4444" textAnchor="middle">あなたを狙っている」</text>
                <text x="190" y="140" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">恐怖訴求</text>
                {/* Arrow */}
                <path d="M340 100 L420 100" stroke="#6366f1" strokeWidth="3" className="draw-in"/>
                <polygon points="420,93 440,100 420,107" fill="#6366f1"/>
                {/* Solution box */}
                <rect x="450" y="40" width="280" height="120" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                <image href="https://api.iconify.design/mdi/shield-lock.svg?color=%236366f1&width=36&height=36" x="572" y="48" width="36" height="36"/>
                <text x="590" y="100" fontSize="20" fontWeight="900" fill="#6366f1" textAnchor="middle">「VPNを入れればOK」</text>
                <text x="590" y="130" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">30秒で伝わる価値提案</text>
            </svg>
        </div>
        <div className="source">出典: Akgul et al., IEEE S&P 2022（243本の広告分析）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="big-statement">VPN広告の主張を<br /><span className="accent-coral">検証</span>する</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 400 80" width="400" height="80">
                <rect x="0" y="10" width="400" height="60" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <text x="200" y="48" fontSize="20" fontWeight="900" fill="#ef4444" textAnchor="middle">「公衆Wi-Fiは危険」は本当か？</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">英国広告基準局の判断</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">NordVPNの「公衆Wi-Fiは危険」という広告主張は<span className="accent-coral">根拠が不十分</span></div>
            <div className="quote-source">ASA（英国広告基準局）2019年 行政指導</div>
        </div>
        <div className="icon-row">
            <img src="https://api.iconify.design/simple-icons/nordvpn.svg?color=%236366f1&width=32&height=32" />
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">HTTPS普及で「はがき」は過去の話</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 200" width="780" height="200">
                {/* Before */}
                <rect x="40" y="30" width="300" height="140" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <text x="190" y="60" fontSize="16" fontWeight="900" fill="#ef4444" textAnchor="middle">2010年代前半</text>
                <text x="190" y="95" fontSize="36" fontWeight="900" fill="#ef4444" textAnchor="middle">~30%</text>
                <text x="190" y="125" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">HTTPS対応率</text>
                <text x="190" y="155" fontSize="14" fontWeight="700" fill="#ef4444" textAnchor="middle">Wi-Fi盗聴リスク高</text>
                {/* Arrow */}
                <text x="390" y="110" fontSize="36" fontWeight="900" fill="#6366f1">→</text>
                {/* After */}
                <rect x="440" y="30" width="300" height="140" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                <text x="590" y="60" fontSize="16" fontWeight="900" fill="#0d9488" textAnchor="middle">2024年〜</text>
                <text x="590" y="95" fontSize="36" fontWeight="900" fill="#0d9488" textAnchor="middle">~95%</text>
                <text x="590" y="125" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">HTTPS対応率</text>
                <text x="590" y="155" fontSize="14" fontWeight="700" fill="#0d9488" textAnchor="middle">リスクは大幅に低下</text>
            </svg>
        </div>
        <div className="source">出典: W3Techs / HTTP Archive 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">VPNが<span className="accent-coral">防げない</span>もの</div>
        <div className="three-col">
            <div className="arch-card border-coral">
                <div className="card-title">フィッシング</div>
                <div className="card-body">偽サイトへの入力は防げない</div>
            </div>
            <div className="arch-card border-coral">
                <div className="card-title">マルウェア</div>
                <div className="card-body">ファイルの安全は保証しない</div>
            </div>
            <div className="arch-card border-coral">
                <div className="card-title">Cookie追跡</div>
                <div className="card-body">IPを隠してもCookieは別問題</div>
            </div>
        </div>
        <div className="big-statement">VPNは<span className="accent-primary">通信経路</span>を守るだけ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">ブラウザフィンガープリント</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Browser window */}
                <rect x="190" y="10" width="400" height="180" rx="10" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="190" y="10" width="400" height="30" rx="10" fill="#f3f4f6"/>
                <circle cx="210" cy="25" r="5" fill="#ef4444"/><circle cx="228" cy="25" r="5" fill="#f59e0b"/><circle cx="246" cy="25" r="5" fill="#0d9488"/>
                {/* Fingerprint items */}
                <text x="220" y="68" fontSize="14" fontWeight="700" fill="#1a1d23">画面解像度: 1920x1080</text>
                <text x="220" y="92" fontSize="14" fontWeight="700" fill="#1a1d23">OS: Windows 11</text>
                <text x="220" y="116" fontSize="14" fontWeight="700" fill="#1a1d23">フォント: 48種</text>
                <text x="220" y="140" fontSize="14" fontWeight="700" fill="#1a1d23">Canvas描画特性: 固有値</text>
                <text x="220" y="164" fontSize="14" fontWeight="700" fill="#1a1d23">WebGL: GPU型番…</text>
                {/* Result */}
                <text x="390" y="215" fontSize="20" fontWeight="900" fill="#ef4444" textAnchor="middle">IPに関係なく90%を特定可能</text>
            </svg>
        </div>
        <div className="source">出典: Fingerprint.com</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">ログインした瞬間に身元は判明</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 180" width="780" height="180">
                {/* VPN shield */}
                <rect x="60" y="30" width="200" height="100" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                <image href="https://api.iconify.design/mdi/shield-lock.svg?color=%236366f1&width=32&height=32" x="144" y="38" width="32" height="32"/>
                <text x="160" y="100" fontSize="16" fontWeight="700" fill="#6366f1" textAnchor="middle">VPNでIP隠蔽中</text>
                {/* Arrow */}
                <text x="310" y="90" fontSize="24" fontWeight="900" fill="#ef4444">→ ログイン →</text>
                {/* Google */}
                <rect x="480" y="30" width="240" height="100" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" x="584" y="38" width="32" height="32"/>
                <text x="600" y="100" fontSize="16" fontWeight="900" fill="#ef4444" textAnchor="middle">あなたと特定完了</text>
            </svg>
        </div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">広告追跡への対策としてVPNは<span className="accent-coral">無力</span></div>
            <div className="quote-source">Consumer Reports</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">VPN業界の寡占構造</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <div className="compare-title accent-primary">Nord Security</div>
                <div className="icon-row">
                    <img src="https://api.iconify.design/simple-icons/nordvpn.svg?color=%236366f1&width=28&height=28" />
                    <img src="https://api.iconify.design/simple-icons/surfshark.svg?color=%230d9488&width=28&height=28" />
                </div>
                <div className="compare-body">NordVPN<br />Surfshark<br />Atlas VPN</div>
            </div>
            <div className="compare-card border-amber">
                <div className="compare-title accent-amber">Kape Technologies</div>
                <div className="icon-row">
                    <img src="https://api.iconify.design/simple-icons/expressvpn.svg?color=%23ef4444&width=28&height=28" />
                </div>
                <div className="compare-body">ExpressVPN<br />CyberGhost<br />Private Internet Access</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">Kape Technologiesの正体</div>
        <div className="flow-chain">
            <div className="fc-node border-coral">
                <div className="fc-node-title">Crossrider</div>
                <div className="fc-node-sub">アドウェア会社</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">社名変更</div>
                <div className="fc-node-sub">2018年</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-amber">
                <div className="fc-node-title">Kape Tech</div>
                <div className="fc-node-sub">VPN企業</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">レビューサイト</div>
                <div className="fc-node-sub">vpnMentor等</div>
            </div>
        </div>
        <div className="big-statement">自社VPNを自社サイトが推薦する構造</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">「ノーログ」の嘘</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <div className="compare-title">PureVPN (2017)</div>
                <div className="compare-body">「ゼロログ」を謳いながらFBIにユーザーログを提供</div>
            </div>
            <div className="compare-card border-coral">
                <div className="compare-title">IPVanish (2016)</div>
                <div className="compare-body">「ノーログ」を謳いながら国土安全保障省にログを提供</div>
            </div>
        </div>
        <div className="big-statement">ノーログは技術的保証ではなく<span className="accent-coral">企業の「約束」</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="scene-title">無料VPNの危険性</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 200" width="780" height="200">
                {/* Hola box */}
                <rect x="60" y="20" width="280" height="140" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <text x="200" y="55" fontSize="20" fontWeight="900" fill="#ef4444" textAnchor="middle">Hola VPN (2015)</text>
                <text x="200" y="85" fontSize="16" fontWeight="700" fill="#1a1d23" textAnchor="middle">5,000万ユーザーの帯域幅を</text>
                <text x="200" y="110" fontSize="16" fontWeight="900" fill="#ef4444" textAnchor="middle">ボットネットとして販売</text>
                <text x="200" y="140" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">攻撃の踏み台に利用</text>
                {/* CSIRO box */}
                <rect x="400" y="20" width="320" height="140" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
                <text x="560" y="55" fontSize="20" fontWeight="900" fill="#f59e0b" textAnchor="middle">CSIRO調査 (2016)</text>
                <text x="560" y="85" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">Android無料VPN 283本を調査</text>
                <text x="560" y="120" fontSize="36" fontWeight="900" fill="#ef4444" textAnchor="middle">38%</text>
                <text x="560" y="145" fontSize="14" fontWeight="700" fill="#1a1d23" textAnchor="middle">にマルウェアが検出</text>
            </svg>
        </div>
        <div className="source">出典: PCWorld / CSIRO研究論文</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <div className="big-statement"><span className="accent-coral">万能</span>ではない。<br />でも<span className="accent-teal">無意味</span>でもない。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-24">
    <div className="content center-layout">
        <div className="scene-title">VPNが本当に役立つ場面</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-text">検閲がある国（中国・ロシア等）からのアクセス</div>
            </div>
            <div className="num-item">
                <div className="num-circle">2</div>
                <div className="num-text">ISP（回線業者）に閲覧履歴を隠したいとき</div>
            </div>
            <div className="num-item">
                <div className="num-circle">3</div>
                <div className="num-text">海外コンテンツへのアクセス（地域制限回避）</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene25: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-25">
    <div className="content center-layout">
        <div className="scene-title">セキュリティ対策の優先順位</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* Priority pyramid */}
                {/* Base */}
                <rect x="90" y="160" width="600" height="50" rx="8" fill="#0d9488"/>
                <text x="390" y="192" fontSize="18" fontWeight="900" fill="#fff" textAnchor="middle">パスワードマネージャー + 二段階認証</text>
                {/* Middle */}
                <rect x="190" y="100" width="400" height="50" rx="8" fill="#6366f1"/>
                <text x="390" y="132" fontSize="18" fontWeight="900" fill="#fff" textAnchor="middle">OS・アプリを最新に保つ</text>
                {/* Top */}
                <rect x="290" y="40" width="200" height="50" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                <text x="390" y="72" fontSize="18" fontWeight="900" fill="#6366f1" textAnchor="middle">VPN</text>
                {/* Labels */}
                <text x="60" y="192" fontSize="14" fontWeight="900" fill="#0d9488" textAnchor="end">最優先</text>
                <text x="160" y="132" fontSize="14" fontWeight="900" fill="#6366f1" textAnchor="end">重要</text>
                <text x="260" y="72" fontSize="14" fontWeight="700" fill="#6366f1" textAnchor="end">任意</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene26: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-26">
    <div className="content center-layout">
        <div className="big-statement">VPN広告が多い理由は<br /><span className="accent-primary">必要だから</span>じゃない。<br /><span className="accent-coral">儲かるから</span>だ。</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 600 60" width="600" height="60">
                <text x="300" y="40" fontSize="20" fontWeight="700" fill="#1a1d23" textAnchor="middle">広告の量 ≠ 必要性 　 広告の量 = 利益率</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene27: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-27">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://api.iconify.design/mdi/shield-lock.svg?color=%236366f1&width=56&height=56" />
        </div>
        <div className="title-large">VPNは道具であって<br />魔法のお守りじゃない</div>
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
};

export const TOTAL_SCENE_COUNT = 28;
