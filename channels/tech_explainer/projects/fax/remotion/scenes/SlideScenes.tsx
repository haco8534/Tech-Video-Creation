import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="title-large">なぜ日本だけ<br /><span className="accent-coral">FAX</span>が生き残っているのか</div>
        <div className="svg-diagram">
            <svg width="780" height="200" viewBox="0 0 780 200">
                {/* FAX machine silhouette */}
                <rect x="270" y="60" width="240" height="120" rx="8" fill="#1d4ed8" opacity="0.12"/>
                <rect x="290" y="30" width="200" height="40" rx="4" fill="#1d4ed8" opacity="0.08"/>
                {/* Paper tray top */}
                <rect x="310" y="10" width="160" height="28" rx="3" fill="var(--border)" stroke="var(--primary)" strokeWidth="2"/>
                <line x1="330" y1="20" x2="450" y2="20" stroke="var(--primary)" strokeWidth="1.5" opacity="0.4"/>
                <line x1="330" y1="28" x2="430" y2="28" stroke="var(--primary)" strokeWidth="1.5" opacity="0.4"/>
                {/* Body */}
                <rect x="280" y="65" width="220" height="110" rx="6" fill="var(--card-bg)" stroke="var(--primary)" strokeWidth="2.5"/>
                {/* Display */}
                <rect x="300" y="78" width="80" height="30" rx="3" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="1.5"/>
                <text x="340" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--primary)">READY</text>
                {/* Keypad dots */}
                <circle cx="420" cy="85" r="6" fill="var(--primary)" opacity="0.3"/>
                <circle cx="440" cy="85" r="6" fill="var(--primary)" opacity="0.3"/>
                <circle cx="460" cy="85" r="6" fill="var(--primary)" opacity="0.3"/>
                <circle cx="420" cy="105" r="6" fill="var(--primary)" opacity="0.3"/>
                <circle cx="440" cy="105" r="6" fill="var(--primary)" opacity="0.3"/>
                <circle cx="460" cy="105" r="6" fill="var(--primary)" opacity="0.3"/>
                {/* Paper output slot */}
                <rect x="300" y="145" width="180" height="6" rx="3" fill="var(--primary)" opacity="0.2"/>
                {/* Outgoing paper */}
                <rect x="330" y="148" width="120" height="44" rx="2" fill="#fff" stroke="var(--border)" strokeWidth="1.5"/>
                <line x1="345" y1="160" x2="435" y2="160" stroke="var(--primary)" strokeWidth="1" opacity="0.3"/>
                <line x1="345" y1="170" x2="420" y2="170" stroke="var(--primary)" strokeWidth="1" opacity="0.3"/>
                <line x1="345" y1="180" x2="430" y2="180" stroke="var(--primary)" strokeWidth="1" opacity="0.3"/>
                {/* Phone handset */}
                <rect x="500" y="75" width="12" height="50" rx="6" fill="var(--primary)" opacity="0.5"/>
                <rect x="496" y="70" width="20" height="12" rx="4" fill="var(--primary)" opacity="0.5"/>
                <rect x="496" y="118" width="20" height="12" rx="4" fill="var(--primary)" opacity="0.5"/>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">2020年 東京都の保健所</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* Stacked papers representing lost reports */}
                <g>
                    {/* Paper stack */}
                    <rect x="80" y="60" width="140" height="150" rx="3" fill="#fff" stroke="var(--border)" strokeWidth="1.5" transform="rotate(-3 150 135)"/>
                    <rect x="85" y="55" width="140" height="150" rx="3" fill="#fff" stroke="var(--border)" strokeWidth="1.5" transform="rotate(2 155 130)"/>
                    <rect x="90" y="50" width="140" height="150" rx="3" fill="#fff" stroke="var(--border)" strokeWidth="1.5"/>
                    <line x1="105" y1="75" x2="210" y2="75" stroke="var(--coral)" strokeWidth="1.5" opacity="0.4"/>
                    <line x1="105" y1="90" x2="200" y2="90" stroke="var(--text)" strokeWidth="1" opacity="0.2"/>
                    <line x1="105" y1="105" x2="195" y2="105" stroke="var(--text)" strokeWidth="1" opacity="0.2"/>
                    <line x1="105" y1="120" x2="205" y2="120" stroke="var(--text)" strokeWidth="1" opacity="0.2"/>
                    <line x1="105" y1="135" x2="190" y2="135" stroke="var(--text)" strokeWidth="1" opacity="0.2"/>
                </g>
                {/* Arrow */}
                <path d="M260 130 L320 130" stroke="var(--coral)" strokeWidth="3" fill="none" markerEnd="url(#arrowRed1)"/>
                <defs><marker id="arrowRed1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="var(--coral)"/></marker></defs>
                {/* FAX machine mini */}
                <rect x="340" y="100" width="100" height="60" rx="5" fill="var(--card-bg)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="390" y="136" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--primary)">FAX</text>
                {/* Arrow */}
                <path d="M460 130 L520 130" stroke="var(--coral)" strokeWidth="3" fill="none" markerEnd="url(#arrowRed1)"/>
                {/* Lost data icon */}
                <rect x="540" y="80" width="160" height="100" rx="8" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="620" y="120" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">計上漏れ</text>
                <text x="620" y="155" textAnchor="middle" fontSize="28" fontWeight="900" fill="var(--coral)">4,065人</text>
            </svg>
        </div>
        <div className="source">出典: 東京都福祉保健局 2020年報告</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">素朴な疑問</div>
        <div className="big-statement">2020年にもなって<br />なんで日本はまだ<span className="accent-coral">FAX</span>なんか<br />使ってるんだ？</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://flagicons.lipis.dev/flags/4x3/jp.svg" alt="日本" />
                <div className="card-title">日本</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" alt="アメリカ" />
                <div className="card-title">アメリカ</div>
            </div>
            <div className="arch-card border-amber">
                <img src="https://flagicons.lipis.dev/flags/4x3/de.svg" alt="ドイツ" />
                <div className="card-title">ドイツ</div>
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
        <div className="scene-title">FAXは電話より古い</div>
        <div className="flow-chain">
            <div className="fc-node highlight">
                <div className="fc-node-title">1843年</div>
                <div className="fc-node-sub">FAX原型の特許</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">33年後</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">1876年</div>
                <div className="fc-node-sub">電話の特許</div>
            </div>
        </div>
        <div className="big-statement">画像を送る発想は<br /><span className="accent-primary">声を送るより先</span>に生まれた</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">漢字という壁</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* Left: Alphabet 26 letters */}
                <rect x="30" y="20" width="330" height="180" rx="8" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="195" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--teal)">英語: 26文字</text>
                <text x="195" y="85" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)">A B C D E F G</text>
                <text x="195" y="115" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)">H I J K L M N</text>
                <text x="195" y="145" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)">O P Q R S T U</text>
                <text x="195" y="175" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)">V W X Y Z</text>
                {/* Right: Kanji density */}
                <rect x="420" y="20" width="330" height="180" rx="8" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="585" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">日本語: 数千文字</text>
                <text x="585" y="82" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">会 議 怪 奇 機 械 規 格</text>
                <text x="585" y="106" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">経 済 計 画 決 定 検 査</text>
                <text x="585" y="130" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">構 造 工 場 合 理 国 際</text>
                <text x="585" y="154" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">産 業 資 料 社 会 主 義</text>
                <text x="585" y="178" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">制 度 政 策 組 織 通 信</text>
                {/* VS */}
                <circle cx="390" cy="110" r="24" fill="var(--primary)" opacity="0.9"/>
                <text x="390" y="117" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff">VS</text>
            </svg>
        </div>
        <div className="big-statement">当時のPC変換精度では<span className="accent-coral">仕事にならなかった</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">日本のFAX世帯保有率（ピーク時）</div>
        <div className="svg-diagram">
            <svg width="400" height="220" viewBox="0 0 400 220">
                {/* Gauge: 同一の半円パスで重ねる (r=140, 弧長≈439.8, 57%≈250.7) */}
                <path d="M60 180 A140 140 0 0 1 340 180" fill="none" stroke="var(--primary-light)" strokeWidth="28" strokeLinecap="round"/>
                <path d="M60 180 A140 140 0 0 1 340 180" fill="none" stroke="var(--primary)" strokeWidth="28" strokeLinecap="round" strokeDasharray="250.7 439.8"/>
                {/* Center text */}
                <text x="200" y="155" textAnchor="middle" fontSize="56" fontWeight="900" fill="var(--primary)">57%</text>
                <text x="200" y="190" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--text)">2軒に1軒以上</text>
            </svg>
        </div>
        <div className="big-statement">漢字文化圏における<span className="accent-primary">最適解</span>だった</div>
        <div className="source">出典: 総務省 通信利用動向調査</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">ネットワーク外部性</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/* Network of connected companies */}
                {/* Center node (self) */}
                <circle cx="390" cy="120" r="32" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2.5"/>
                <text x="390" y="116" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--coral)">自社</text>
                <text x="390" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--coral)">メール化</text>
                {/* Surrounding nodes (trading partners with FAX) */}
                <circle cx="200" cy="60" r="28" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="200" y="56" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--primary)">取引先A</text>
                <text x="200" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">FAX</text>
                <circle cx="580" cy="60" r="28" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="580" y="56" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--primary)">取引先B</text>
                <text x="580" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">FAX</text>
                <circle cx="160" cy="180" r="28" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="160" y="176" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--primary)">取引先C</text>
                <text x="160" y="190" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">FAX</text>
                <circle cx="620" cy="180" r="28" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="620" y="176" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--primary)">取引先D</text>
                <text x="620" y="190" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">FAX</text>
                <circle cx="390" cy="230" r="28" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="390" y="226" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--primary)">取引先E</text>
                <text x="390" y="240" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">FAX</text>
                {/* Connections (dashed = broken) */}
                <line x1="362" y1="100" x2="224" y2="76" stroke="var(--coral)" strokeWidth="2" strokeDasharray="6 4"/>
                <line x1="418" y1="100" x2="556" y2="76" stroke="var(--coral)" strokeWidth="2" strokeDasharray="6 4"/>
                <line x1="365" y1="140" x2="184" y2="164" stroke="var(--coral)" strokeWidth="2" strokeDasharray="6 4"/>
                <line x1="415" y1="140" x2="596" y2="164" stroke="var(--coral)" strokeWidth="2" strokeDasharray="6 4"/>
                <line x1="390" y1="152" x2="390" y2="202" stroke="var(--coral)" strokeWidth="2" strokeDasharray="6 4"/>
                {/* X marks on broken connections */}
                <text x="300" y="82" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">✕</text>
                <text x="480" y="82" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">✕</text>
                <text x="270" y="156" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">✕</text>
                <text x="510" y="156" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">✕</text>
            </svg>
        </div>
        <div className="big-statement">一社だけ変えても<span className="accent-coral">意味がない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">FAXをやめられない理由</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">個社の現実</div>
                <ul className="compare-list">
                    <li>取引先100社に交渉が必要</li>
                    <li>番号→送信の手軽さ</li>
                    <li>IT担当者がいない</li>
                </ul>
            </div>
            <div className="compare-card border-primary">
                <div className="compare-title accent-primary">業界の構造</div>
                <ul className="compare-list">
                    <li>全員が同時に切替が必要</li>
                    <li>新システム導入コスト</li>
                    <li>教育・研修の負担</li>
                </ul>
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
        <div className="scene-title">FAXが残る三重の壁</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* Three interlocking rings */}
                <ellipse cx="280" cy="120" rx="140" ry="80" fill="none" stroke="var(--coral)" strokeWidth="3" opacity="0.6"/>
                <ellipse cx="390" cy="120" rx="140" ry="80" fill="none" stroke="var(--primary)" strokeWidth="3" opacity="0.6"/>
                <ellipse cx="500" cy="120" rx="140" ry="80" fill="none" stroke="var(--amber)" strokeWidth="3" opacity="0.6"/>
                {/* Labels */}
                <text x="210" y="100" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--coral)">ハンコ</text>
                <text x="210" y="128" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">1997年</text>
                <text x="210" y="148" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">署名3.5万人で</text>
                <text x="210" y="166" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">ペーパーレス頓挫</text>
                <text x="390" y="100" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--primary)">法制度</text>
                <text x="390" y="128" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">電子帳簿保存法</text>
                <text x="390" y="148" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">要件が厳しすぎた</text>
                <text x="570" y="100" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--amber)">高齢化</text>
                <text x="570" y="128" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">60代以上30%超</text>
                <text x="570" y="148" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">唯一の通信手段</text>
                {/* Center: FAX */}
                <text x="390" y="195" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--text)">運命共同体 = 紙 + ハンコ + FAX</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">法制度の壁</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">1998年</div>
                <div className="fc-node-sub">電子帳簿保存法</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">要件が厳格</div>
                <div className="fc-node-sub">改ざん防止・検索機能</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">現場の判断</div>
                <div className="fc-node-sub">紙の方が楽で確実</div>
            </div>
        </div>
        <div className="big-statement">制度が現場の実態に<span className="accent-primary">追いつかなかった</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">世代別FAX世帯保有率</div>
        <div className="svg-diagram">
            <svg width="680" height="220" viewBox="0 0 680 220">
                {/* Bars */}
                <text x="100" y="42" textAnchor="end" fontSize="18" fontWeight="700" fill="var(--text)">20代</text>
                <rect x="110" y="24" width="400" height="28" rx="4" fill="var(--primary-light)"/>
                <rect x="110" y="24" width="4" height="28" rx="4" fill="var(--teal)"/>
                <text x="124" y="44" fontSize="18" fontWeight="900" fill="var(--teal)">0.9%</text>
                <text x="100" y="87" textAnchor="end" fontSize="18" fontWeight="700" fill="var(--text)">40代</text>
                <rect x="110" y="69" width="400" height="28" rx="4" fill="var(--primary-light)"/>
                <rect x="110" y="69" width="80" height="28" rx="4" fill="var(--primary)"/>
                <text x="200" y="89" fontSize="18" fontWeight="900" fill="var(--primary)">20%</text>
                <text x="100" y="132" textAnchor="end" fontSize="18" fontWeight="700" fill="var(--text)">60代以上</text>
                <rect x="110" y="114" width="400" height="28" rx="4" fill="var(--primary-light)"/>
                <rect x="110" y="114" width="128" height="28" rx="4" fill="var(--coral)"/>
                <text x="248" y="134" fontSize="18" fontWeight="900" fill="var(--coral)">30%超</text>
                {/* Divider line */}
                <line x1="110" y1="160" x2="510" y2="160" stroke="var(--border)" strokeWidth="1"/>
                {/* Additional stat */}
                <text x="310" y="185" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">80代以上のネット利用率: </text>
                <text x="490" y="185" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--coral)">36%</text>
                <text x="310" y="210" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">スマホ不要と感じる高齢者: 52%</text>
            </svg>
        </div>
        <div className="source">出典: 総務省 令和5年通信利用動向調査</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">ここからが本当に面白い</div>
        <div className="big-statement">業務でFAXを一番使っている国は<br /><span className="accent-primary">日本</span>？ <span className="accent-teal">アメリカ</span>？ <span className="accent-amber">ドイツ</span>？</div>
        <div className="icon-row">
            <img src="https://flagicons.lipis.dev/flags/4x3/jp.svg" alt="日本" />
            <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" alt="アメリカ" />
            <img src="https://flagicons.lipis.dev/flags/4x3/de.svg" alt="ドイツ" />
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">業務FAX利用率（2024年）</div>
        <div className="svg-diagram">
            <svg width="680" height="200" viewBox="0 0 680 200">
                {/* Japan */}
                <image href="https://flagicons.lipis.dev/flags/4x3/jp.svg" x="20" y="16" width="36" height="27"/>
                <text x="70" y="40" fontSize="18" fontWeight="700" fill="var(--text)">日本</text>
                <rect x="130" y="18" width="420" height="32" rx="4" fill="var(--primary-light)"/>
                <rect x="130" y="18" width="168" height="32" rx="4" fill="var(--primary)"/>
                <text x="310" y="40" fontSize="20" fontWeight="900" fill="var(--primary)">40.1%</text>
                {/* Germany */}
                <image href="https://flagicons.lipis.dev/flags/4x3/de.svg" x="20" y="76" width="36" height="27"/>
                <text x="70" y="100" fontSize="18" fontWeight="700" fill="var(--text)">ドイツ</text>
                <rect x="130" y="78" width="420" height="32" rx="4" fill="var(--amber-light)"/>
                <rect x="130" y="78" width="213" height="32" rx="4" fill="var(--amber)"/>
                <text x="356" y="100" fontSize="20" fontWeight="900" fill="var(--amber)">50.7%</text>
                {/* USA */}
                <image href="https://flagicons.lipis.dev/flags/4x3/us.svg" x="20" y="136" width="36" height="27"/>
                <text x="70" y="160" fontSize="18" fontWeight="700" fill="var(--text)">アメリカ</text>
                <rect x="130" y="138" width="420" height="32" rx="4" fill="var(--coral-light)"/>
                <rect x="130" y="138" width="290" height="32" rx="4" fill="var(--coral)"/>
                <text x="432" y="160" fontSize="20" fontWeight="900" fill="var(--coral)">69.0%</text>
            </svg>
        </div>
        <div className="big-statement">日本が<span className="accent-primary">一番低い</span></div>
        <div className="source">出典: CIAJ ファクシミリ利用実態調査 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">世界のFAX事情</div>
        <div className="three-col">
            <div className="arch-card border-teal">
                <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" alt="アメリカ" />
                <div className="card-title">アメリカ</div>
                <div className="card-body">医療業界が最大ユーザー<br />HIPAA法で準拠手段</div>
            </div>
            <div className="arch-card border-amber">
                <img src="https://flagicons.lipis.dev/flags/4x3/de.svg" alt="ドイツ" />
                <div className="card-title">ドイツ</div>
                <div className="card-body">病院間の患者情報<br />メールよりFAXが安全</div>
            </div>
            <div className="arch-card border-primary">
                <div className="card-title">世界全体</div>
                <div className="card-body">約4,300万台が稼働中<br />購入台数1位はアメリカ</div>
            </div>
        </div>
        <div className="source">出典: CIAJ ファクシミリ利用実態調査 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">なぜ「日本だけ」と言われるのか</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* Left: Home ownership */}
                <rect x="40" y="20" width="320" height="180" rx="10" fill="var(--card-bg)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="200" y="52" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--primary)">家庭の保有率</text>
                {/* Japan home */}
                <image href="https://flagicons.lipis.dev/flags/4x3/jp.svg" x="70" y="70" width="30" height="22"/>
                <text x="115" y="88" fontSize="18" fontWeight="700" fill="var(--text)">日本</text>
                <rect x="165" y="72" width="170" height="22" rx="3" fill="var(--primary-light)"/>
                <rect x="165" y="72" width="72" height="22" rx="3" fill="var(--primary)"/>
                <text x="250" y="88" fontSize="16" fontWeight="900" fill="var(--primary)">24.6%</text>
                {/* US home */}
                <image href="https://flagicons.lipis.dev/flags/4x3/us.svg" x="70" y="108" width="30" height="22"/>
                <text x="115" y="126" fontSize="18" fontWeight="700" fill="var(--text)">米国</text>
                <rect x="165" y="110" width="170" height="22" rx="3" fill="var(--teal-light)"/>
                <rect x="165" y="110" width="14" height="22" rx="3" fill="var(--teal)"/>
                <text x="190" y="126" fontSize="16" fontWeight="900" fill="var(--teal)">~5%</text>
                <text x="200" y="170" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">家にFAXがある＝珍しい</text>
                {/* Right: Triple set */}
                <rect x="420" y="20" width="320" height="180" rx="10" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="580" y="52" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">日本の三点セット</text>
                {/* Three items */}
                <rect x="450" y="70" width="120" height="36" rx="6" fill="var(--coral-light)"/>
                <text x="510" y="94" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">FAX</text>
                <rect x="590" y="70" width="120" height="36" rx="6" fill="var(--amber-light)"/>
                <text x="650" y="94" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--amber)">ハンコ</text>
                <rect x="520" y="120" width="120" height="36" rx="6" fill="var(--primary-light)"/>
                <text x="580" y="144" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--primary)">紙文化</text>
                <text x="580" y="180" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">この組み合わせが「絵になる」</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">レガシー技術は日本だけではない</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <img src="https://flagicons.lipis.dev/flags/4x3/jp.svg" alt="日本" />
                <div className="compare-title accent-coral">日本のFAX</div>
                <ul className="compare-list">
                    <li>取引先がFAXだから自社もFAX</li>
                    <li>社会インフラとして定着</li>
                </ul>
            </div>
            <div className="compare-card border-teal">
                <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" alt="アメリカ" />
                <div className="compare-title accent-teal">アメリカの小切手</div>
                <ul className="compare-list">
                    <li>手書きサインで不正防止</li>
                    <li>カード手数料がかからない</li>
                </ul>
            </div>
        </div>
        <div className="big-statement">どちらも<span className="accent-primary">合理的な理由</span>で残っている</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">合理性の罠</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* Circular trap diagram */}
                {/* Three rational decisions arranged in a cycle */}
                <rect x="260" y="10" width="260" height="50" rx="8" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="390" y="42" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">取引先がFAXだから自社も</text>
                <rect x="510" y="110" width="250" height="50" rx="8" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="635" y="142" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">紙保存の方が法的に安全</text>
                <rect x="20" y="110" width="260" height="50" rx="8" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="150" y="142" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">高齢者にスマホは非現実的</text>
                {/* Arrows forming cycle */}
                <path d="M520 55 Q600 70 540 110" fill="none" stroke="var(--primary)" strokeWidth="2.5" markerEnd="url(#arrowBlue16)"/>
                <path d="M510 150 Q400 190 280 150" fill="none" stroke="var(--primary)" strokeWidth="2.5" markerEnd="url(#arrowBlue16)"/>
                <path d="M150 110 Q180 70 260 40" fill="none" stroke="var(--primary)" strokeWidth="2.5" markerEnd="url(#arrowBlue16)"/>
                <defs><marker id="arrowBlue16" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="var(--primary)"/></marker></defs>
                {/* Center label */}
                <text x="390" y="200" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--coral)">個々は合理的 → 全体は非合理</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">FAX全廃に必要なもの</div>
        <div className="num-list">
            <div className="num-item border-primary">
                <div className="num-circle" style={{ background: 'var(--primary)' }}>1</div>
                <div className="num-text">全取引先への通知と代替手段の合意</div>
            </div>
            <div className="num-item border-teal">
                <div className="num-circle" style={{ background: 'var(--teal)' }}>2</div>
                <div className="num-text">暗号化・二要素認証などセキュリティ基盤</div>
            </div>
            <div className="num-item border-amber">
                <div className="num-circle" style={{ background: 'var(--amber)' }}>3</div>
                <div className="num-text">高齢者・小規模事業者への教育と支援</div>
            </div>
        </div>
        <div className="big-statement">技術導入だけでは足りない。<span className="accent-primary">社会全体の仕組み</span>を変える必要がある</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">霞が関FAX全廃の成果</div>
        <div className="svg-diagram">
            <svg width="480" height="280" viewBox="0 0 480 280">
                {/* Gauge: 同一の半円パスで背景とフィルを重ねる (r=180, 弧長≈565.5) */}
                <path d="M60 220 A180 180 0 0 1 420 220" fill="none" stroke="var(--primary-light)" strokeWidth="32" strokeLinecap="round"/>
                <path d="M60 220 A180 180 0 0 1 420 220" fill="none" stroke="var(--teal)" strokeWidth="32" strokeLinecap="round" strokeDasharray="480.7 565.5"/>
                {/* Center text */}
                <text x="240" y="185" textAnchor="middle" fontSize="72" fontWeight="900" fill="var(--teal)">85%</text>
                <text x="240" y="225" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)">廃止済み or 廃止予定</text>
            </svg>
        </div>
        <div className="big-statement">400件の反論があっても<span className="accent-teal">動き出せば進む</span></div>
        <div className="source">出典: 河野太郎公式サイト 2022年12月</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">変化は確実に起きている</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">2021年</div>
                <div className="fc-node-sub">FAX未経験 33%</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">2024年</div>
                <div className="fc-node-sub">FAX未経験 41%</div>
            </div>
        </div>
        <div className="big-statement">20代のFAX保有率は<span className="accent-primary">0.9%</span><br />この世代が社会の中心になれば<span className="accent-teal">自然と変わる</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">FAXが教えてくれること</div>
        <div className="big-statement">技術を変えるということは<br /><span className="accent-primary">社会の仕組みそのもの</span>を変えること</div>
        <div className="big-statement">漢字文化・法制度・商慣行・高齢化<br />それぞれに<span className="accent-teal">合理的な理由</span>があった</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="title-large">ご視聴ありがとう<br />ございました</div>
        <div className="big-statement">チャンネル登録・コメントお待ちしています</div>
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
};

export const TOTAL_SCENE_COUNT = 22;
