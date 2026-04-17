import React from "react";
import { AbsoluteFill } from "remotion";
import "./slides.css";

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
<div className="content center-layout">
<div className="icon-deco">
    <img src="https://api.iconify.design/mdi/wifi.svg?color=%232563eb&width=72&height=72" alt="Wi-Fi" />
    <img src="https://api.iconify.design/mdi/router-wireless.svg?color=%232563eb&width=72&height=72" alt="Router" />
</div>
<p className="title-large">Wi-Fiはなぜ壁を越えると<br />弱くなるのか</p>
<p className="title-sub">電波と建材の物理学をやさしく解説</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
<div className="content center-layout">
<p className="scene-title">コンクリート壁1枚の衝撃</p>
<div className="metric-card">
    <span className="metric-value accent-coral">1/100</span>
    <span className="metric-label">コンクリート壁1枚 = 20dB減衰</span>
</div>
<div className="bar-chart">
    <div className="bar-row">
        <span className="bar-label">10dB</span>
        <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '25%' } as React.CSSProperties}></div></div>
        <span className="bar-value">1/10</span>
    </div>
    <div className="bar-row">
        <span className="bar-label">20dB</span>
        <div className="bar-track"><div className="bar-fill bar-fill-coral" style={{ '--w': '50%' } as React.CSSProperties}></div></div>
        <span className="bar-value">1/100</span>
    </div>
    <div className="bar-row">
        <span className="bar-label">30dB</span>
        <div className="bar-track"><div className="bar-fill bar-fill-amber" style={{ '--w': '75%' } as React.CSSProperties}></div></div>
        <span className="bar-value">1/1,000</span>
    </div>
    <div className="bar-row">
        <span className="bar-label">40dB</span>
        <div className="bar-track"><div className="bar-fill bar-fill-teal" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
        <span className="bar-value">1/10,000</span>
    </div>
</div>
<div className="source">出典: NIST Building Penetration Loss Measurements</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
<div className="content center-layout">
<p className="scene-title">素材で変わる電波の減衰量</p>
<div className="bar-chart">
    <div className="bar-row">
        <span className="bar-label">石膏ボード</span>
        <div className="bar-track"><div className="bar-fill bar-fill-teal" style={{ '--w': '2%' } as React.CSSProperties}></div></div>
        <span className="bar-value accent-teal">≈ 0 dB</span>
    </div>
    <div className="bar-row">
        <span className="bar-label">木材</span>
        <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '6%' } as React.CSSProperties}></div></div>
        <span className="bar-value accent-primary">≈ 3 dB</span>
    </div>
    <div className="bar-row">
        <span className="bar-label">レンガ</span>
        <div className="bar-track"><div className="bar-fill bar-fill-amber" style={{ '--w': '28%' } as React.CSSProperties}></div></div>
        <span className="bar-value accent-amber">≈ 15 dB</span>
    </div>
    <div className="bar-row">
        <span className="bar-label">コンクリート</span>
        <div className="bar-track"><div className="bar-fill bar-fill-coral" style={{ '--w': '48%' } as React.CSSProperties}></div></div>
        <span className="bar-value accent-coral">≈ 26 dB</span>
    </div>
    <div className="bar-row">
        <span className="bar-label">鉄筋コンクリート</span>
        <div className="bar-track"><div className="bar-fill bar-fill-coral" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
        <span className="bar-value accent-coral">≈ 54 dB</span>
    </div>
</div>
<div className="source">出典: NIST / Eye Networks 実測データ (2.4GHz帯)</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
<div className="content center-layout">
<p className="scene-title">電磁波スペクトルとWi-Fiの位置</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg">
    {/* Spectrum bar */}
    <defs>
        <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb"/>
            <stop offset="18%" stopColor="#0891b2"/>
            <stop offset="35%" stopColor="#dc2626"/>
            <stop offset="50%" stopColor="#d97706"/>
            <stop offset="65%" stopColor="#eab308"/>
            <stop offset="75%" stopColor="#22c55e"/>
            <stop offset="85%" stopColor="#6366f1"/>
            <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
    </defs>
    <rect x="20" y="70" width="740" height="40" rx="8" fill="url(#spectrum)" opacity="0.85"/>
    {/* Labels */}
    <text x="55" y="55" fontSize="18" fontWeight="700" fill="#2563eb" textAnchor="middle">ラジオ波</text>
    <text x="170" y="55" fontSize="18" fontWeight="700" fill="#0891b2" textAnchor="middle">マイクロ波</text>
    <text x="310" y="55" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">赤外線</text>
    <text x="445" y="55" fontSize="18" fontWeight="700" fill="#d97706" textAnchor="middle">可視光</text>
    <text x="570" y="55" fontSize="18" fontWeight="700" fill="#22c55e" textAnchor="middle">紫外線</text>
    <text x="700" y="55" fontSize="18" fontWeight="700" fill="#6366f1" textAnchor="middle">X線</text>
    {/* Wi-Fi marker */}
    <line x1="150" y1="115" x2="150" y2="155" stroke="#2563eb" strokeWidth="3"/>
    <circle cx="150" cy="160" r="8" fill="#2563eb"/>
    <text x="150" y="185" fontSize="20" fontWeight="900" fill="#2563eb" textAnchor="middle">Wi-Fi ここ!</text>
    <text x="150" y="208" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">2.4 GHz</text>
    {/* Wavelength scale */}
    <text x="55" y="138" fontSize="18" fontWeight="400" fill="#1a1d23" textAnchor="middle">km</text>
    <line x1="20" y1="125" x2="760" y2="125" stroke="#1a1d23" strokeWidth="1" strokeDasharray="4"/>
    <text x="700" y="138" fontSize="18" fontWeight="400" fill="#1a1d23" textAnchor="middle">pm</text>
    <text x="390" y="230" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">← 波長が長い　　　　　　波長が短い →</text>
</svg>
</div>
<p className="title-sub">Wi-Fiはマイクロ波の仲間 ― 電子レンジと同じ周波数帯</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
<div className="content center-layout">
<p className="scene-title">波長が10万倍違う</p>
<div className="metric-card">
    <span className="metric-value">100,000<span className="accent-coral">x</span></span>
    <span className="metric-label">可視光とWi-Fiの波長の差</span>
</div>
<div className="two-col">
    <div className="compare-card border-amber">
        <p className="compare-title accent-amber">可視光</p>
        <p className="compare-body">波長 ≈ 500 nm<br />壁を通れない</p>
    </div>
    <div className="compare-card border-primary">
        <p className="compare-title accent-primary">Wi-Fi (2.4GHz)</p>
        <p className="compare-body">波長 = 12.5 cm<br />壁をある程度通れる</p>
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
<p className="scene-title">プールの波で考える</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg">
    {/* Pool background */}
    <rect x="20" y="20" width="340" height="240" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
    <rect x="420" y="20" width="340" height="240" rx="12" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
    {/* Left pool: short waves reflect */}
    <text x="190" y="18" fontSize="20" fontWeight="900" fill="#2563eb" textAnchor="middle">さざ波（短い波長）</text>
    {/* Barrier */}
    <rect x="170" y="80" width="12" height="120" rx="3" fill="#1a1d23"/>
    {/* Small ripples hitting barrier */}
    <path d="M80,100 Q95,95 110,100 Q125,105 140,100" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
    <path d="M80,120 Q95,115 110,120 Q125,125 140,120" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
    <path d="M80,140 Q95,135 110,140 Q125,145 140,140" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
    <path d="M80,160 Q95,155 110,160 Q125,165 140,160" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
    {/* Reflected arrows */}
    <path d="M155,130 L135,110" stroke="#dc2626" strokeWidth="2.5" fill="none" marker-end="url(#arrowRed)"/>
    <path d="M155,150 L135,170" stroke="#dc2626" strokeWidth="2.5" fill="none" marker-end="url(#arrowRed)"/>
    <text x="100" y="220" fontSize="20" fontWeight="700" fill="#dc2626" textAnchor="middle">反射!</text>
    {/* Right pool: long waves diffract */}
    <text x="590" y="18" fontSize="20" fontWeight="900" fill="#0891b2" textAnchor="middle">うねり（長い波長）</text>
    <rect x="560" y="80" width="12" height="90" rx="3" fill="#1a1d23"/>
    {/* Large wave crests */}
    <path d="M460,90 Q490,70 520,90 Q550,110 560,90" stroke="#0891b2" strokeWidth="3" fill="none"/>
    <path d="M460,140 Q490,120 520,140 Q550,160 560,140" stroke="#0891b2" strokeWidth="3" fill="none"/>
    {/* Diffracted waves curving around edge */}
    <path d="M572,170 Q600,180 620,200 Q640,220 630,240" stroke="#0891b2" strokeWidth="3" fill="none"/>
    <path d="M572,170 Q590,150 620,140 Q660,130 700,140" stroke="#0891b2" strokeWidth="3" fill="none"/>
    <path d="M572,170 Q595,165 630,170 Q670,178 710,180" stroke="#0891b2" strokeWidth="3" fill="none"/>
    <circle cx="572" cy="170" r="5" fill="#0891b2"/>
    <text x="650" y="220" fontSize="20" fontWeight="700" fill="#0891b2" textAnchor="middle">回折!</text>
    {/* Arrow markers */}
    <defs>
        <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#dc2626"/>
        </marker>
    </defs>
</svg>
</div>
<p className="title-sub">波長が短い波は障害物で反射し、長い波は回り込む</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
<div className="content center-layout">
<div className="icon-deco">
    <img src="https://api.iconify.design/mdi/signal-cellular-3.svg?color=%232563eb&width=72&height=72" alt="Signal" />
</div>
<p className="big-statement">波長が<span className="accent-primary">10万倍</span>違うだけで<br />壁を<span className="accent-coral">通れるか通れないか</span>が決まる</p>
<p className="title-sub">Wi-Fiの波長12.5cmは「壁を通れるギリギリ」のサイズ</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
<div className="content center-layout">
<p className="scene-title">電波が壁に出会うと起きる3つのこと</p>
<div className="flow-chain">
    <div className="fc-node highlight-amber">
        <img src="https://api.iconify.design/mdi/reflect-horizontal.svg?color=%23d97706&width=40&height=40" alt="反射" />
        <span className="fc-node-title">反射</span>
        <span className="fc-node-sub">表面で跳ね返る</span>
    </div>
    <span className="fc-arr">→</span>
    <div className="fc-node highlight-coral">
        <img src="https://api.iconify.design/mdi/fire.svg?color=%23dc2626&width=40&height=40" alt="吸収" />
        <span className="fc-node-title">吸収</span>
        <span className="fc-node-sub">熱エネルギーに変換</span>
    </div>
    <span className="fc-arr">→</span>
    <div className="fc-node highlight-teal">
        <img src="https://api.iconify.design/mdi/waves.svg?color=%230891b2&width=40&height=40" alt="回折" />
        <span className="fc-node-title">回折</span>
        <span className="fc-node-sub">端で回り込む</span>
    </div>
</div>
<p className="title-sub">この3つが同時に起き、信号強度が減少する</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
<div className="content center-layout">
<p className="scene-title">反射 ― 壁の表面で跳ね返る</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <marker id="arrBlue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <path d="M0,0 L10,3.5 L0,7" fill="#2563eb"/>
        </marker>
        <marker id="arrGray" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <path d="M0,0 L10,3.5 L0,7" fill="#9ca3af"/>
        </marker>
        <marker id="arrAmber" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <path d="M0,0 L10,3.5 L0,7" fill="#d97706"/>
        </marker>
    </defs>
    {/* Wall */}
    <rect x="360" y="20" width="60" height="240" rx="4" fill="#d1d5db"/>
    <text x="390" y="150" fontSize="20" fontWeight="700" fill="#1a1d23" textAnchor="middle" transform="rotate(-90,390,150)">壁</text>
    {/* Incident wave (strong) */}
    <path d="M60,60 Q120,50 180,60 Q240,70 300,60" stroke="#2563eb" strokeWidth="4" fill="none"/>
    <path d="M60,100 Q120,90 180,100 Q240,110 300,100" stroke="#2563eb" strokeWidth="4" fill="none"/>
    <path d="M60,140 Q120,130 180,140 Q240,150 300,140" stroke="#2563eb" strokeWidth="4" fill="none"/>
    <line x1="180" y1="40" x2="350" y2="100" stroke="#2563eb" strokeWidth="3" marker-end="url(#arrBlue)"/>
    <text x="200" y="38" fontSize="20" fontWeight="700" fill="#2563eb">入射波</text>
    {/* Reflected wave */}
    <line x1="350" y1="100" x2="180" y2="200" stroke="#d97706" strokeWidth="3" marker-end="url(#arrAmber)"/>
    <text x="200" y="230" fontSize="20" fontWeight="700" fill="#d97706">反射波</text>
    {/* Angle indicators */}
    <path d="M340,80 A20,20 0 0,1 340,120" stroke="#1a1d23" strokeWidth="1.5" fill="none"/>
    <text x="320" y="105" fontSize="18" fontWeight="400" fill="#1a1d23">θ</text>
    {/* Transmitted wave (weak) */}
    <line x1="430" y1="110" x2="650" y2="160" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6" marker-end="url(#arrGray)"/>
    <path d="M500,130 Q540,125 580,130 Q620,135 660,130" stroke="#9ca3af" strokeWidth="2" fill="none" opacity="0.5"/>
    <path d="M500,160 Q540,155 580,160 Q620,165 660,160" stroke="#9ca3af" strokeWidth="2" fill="none" opacity="0.5"/>
    <text x="580" y="200" fontSize="20" fontWeight="700" fill="#9ca3af">透過波（弱い）</text>
    {/* Angle label */}
    <text x="390" y="278" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">入射角 = 反射角（スネルの法則）</text>
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
<p className="scene-title">吸収 ― 壁の内部で熱に変わる</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <marker id="arrBlue2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <path d="M0,0 L10,3.5 L0,7" fill="#2563eb"/>
        </marker>
        <marker id="arrFade" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <path d="M0,0 L10,3.5 L0,7" fill="#d1d5db"/>
        </marker>
    </defs>
    {/* Wall (thicker to show absorption) */}
    <rect x="300" y="20" width="180" height="220" rx="6" fill="#e5e7eb"/>
    <rect x="300" y="20" width="180" height="220" rx="6" fill="none" stroke="#d1d5db" strokeWidth="2"/>
    <text x="390" y="245" fontSize="20" fontWeight="700" fill="#1a1d23" textAnchor="middle">壁の内部</text>
    {/* Strong incoming wave */}
    <line x1="40" y1="130" x2="290" y2="130" stroke="#2563eb" strokeWidth="5" marker-end="url(#arrBlue2)"/>
    <path d="M50,90 Q80,80 110,90 Q140,100 170,90 Q200,80 230,90 Q260,100 280,90" stroke="#2563eb" strokeWidth="3" fill="none"/>
    <path d="M50,170 Q80,160 110,170 Q140,180 170,170 Q200,160 230,170 Q260,180 280,170" stroke="#2563eb" strokeWidth="3" fill="none"/>
    <text x="160" y="75" fontSize="20" fontWeight="900" fill="#2563eb" textAnchor="middle">強い電波</text>
    {/* Arrow getting thinner through wall */}
    <line x1="310" y1="130" x2="390" y2="130" stroke="#6b7280" strokeWidth="3.5"/>
    <line x1="390" y1="130" x2="470" y2="130" stroke="#9ca3af" strokeWidth="2"/>
    {/* Heat symbols rising from wall */}
    <path d="M340,18 Q345,5 350,18" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
    <path d="M370,15 Q375,0 380,15" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
    <path d="M400,18 Q405,5 410,18" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
    <path d="M430,15 Q435,0 440,15" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
    <text x="390" y="275" fontSize="20" fontWeight="700" fill="#dc2626" textAnchor="middle">電波エネルギー → 熱エネルギー</text>
    {/* Weak outgoing wave */}
    <line x1="490" y1="130" x2="740" y2="130" stroke="#d1d5db" strokeWidth="2" strokeDasharray="8" marker-end="url(#arrFade)"/>
    <path d="M510,110 Q530,105 550,110 Q570,115 590,110" stroke="#d1d5db" strokeWidth="1.5" fill="none"/>
    <path d="M510,150 Q530,145 550,150 Q570,155 590,150" stroke="#d1d5db" strokeWidth="1.5" fill="none"/>
    <text x="620" y="100" fontSize="20" fontWeight="900" fill="#9ca3af" textAnchor="middle">弱い電波</text>
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
<p className="scene-title">回折 ― 壁の端で波が回り込む</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg">
    {/* Wall (partial, with edge) */}
    <rect x="350" y="0" width="30" height="150" rx="2" fill="#d1d5db"/>
    <circle cx="365" cy="155" r="5" fill="#0891b2"/>
    <text x="365" y="178" fontSize="18" fontWeight="700" fill="#0891b2" textAnchor="middle">回折点</text>
    {/* Incoming plane waves */}
    <line x1="60" y1="30" x2="60" y2="260" stroke="#2563eb" strokeWidth="2.5"/>
    <line x1="120" y1="30" x2="120" y2="260" stroke="#2563eb" strokeWidth="2.5"/>
    <line x1="180" y1="30" x2="180" y2="260" stroke="#2563eb" strokeWidth="2.5"/>
    <line x1="240" y1="30" x2="240" y2="260" stroke="#2563eb" strokeWidth="2.5"/>
    <line x1="300" y1="30" x2="300" y2="260" stroke="#2563eb" strokeWidth="2.5"/>
    <text x="180" y="25" fontSize="18" fontWeight="700" fill="#2563eb" textAnchor="middle">入射平面波</text>
    {/* Blocked region (shadow) */}
    <rect x="390" y="0" width="390" height="100" rx="0" fill="#f3f4f6" opacity="0.5"/>
    <text x="580" y="50" fontSize="20" fontWeight="700" fill="#9ca3af" textAnchor="middle">影の領域</text>
    {/* Diffracted wavefronts (circular arcs from edge) */}
    <path d="M365,155 A60,60 0 0,1 425,155" stroke="#0891b2" strokeWidth="2.5" fill="none"/>
    <path d="M365,155 A60,60 0 0,1 415,105" stroke="#0891b2" strokeWidth="2.5" fill="none"/>
    <path d="M365,155 A120,120 0 0,1 485,155" stroke="#0891b2" strokeWidth="2" fill="none"/>
    <path d="M365,155 A120,120 0 0,1 465,55" stroke="#0891b2" strokeWidth="2" fill="none"/>
    <path d="M365,155 A180,180 0 0,1 545,155" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
    <path d="M365,155 A180,180 0 0,1 510,20" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
    {/* Waves continuing below wall */}
    <line x1="390" y1="160" x2="700" y2="160" stroke="#2563eb" strokeWidth="2"/>
    <line x1="390" y1="200" x2="700" y2="200" stroke="#2563eb" strokeWidth="2"/>
    <line x1="390" y1="240" x2="700" y2="240" stroke="#2563eb" strokeWidth="2"/>
    {/* Labels */}
    <text x="600" y="220" fontSize="18" fontWeight="700" fill="#2563eb" textAnchor="middle">直進する波</text>
    <text x="550" y="130" fontSize="18" fontWeight="700" fill="#0891b2" textAnchor="middle">回折波</text>
    <text x="390" y="275" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">波は障害物の端で曲がり、影の領域にも届く</text>
</svg>
</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
<div className="content center-layout">
<p className="scene-title">3つのメカニズムの複合効果</p>
<div className="three-col">
    <div className="arch-card border-amber">
        <p className="card-title accent-amber">反射</p>
        <p className="card-body">壁表面で電波が<br />跳ね返る<br /><br />金属壁で最大<br />ほぼ100%反射</p>
    </div>
    <div className="arch-card border-coral">
        <p className="card-title accent-coral">吸収</p>
        <p className="card-body">壁内部で電波が<br />熱に変換される<br /><br />コンクリートで<br />約99%が熱に</p>
    </div>
    <div className="arch-card border-teal">
        <p className="card-title accent-teal">回折</p>
        <p className="card-body">壁の端で波が<br />回り込む<br /><br />唯一のプラス要素<br />だが微弱</p>
    </div>
</div>
<p className="title-sub">反射+吸収が大きなマイナス、回折のわずかなプラスでは補えない</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
<div className="content center-layout">
<p className="scene-title">フレネルゾーン ― 見えない電波の通り道</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg">
    {/* Router icon (left) */}
    <rect x="30" y="100" width="50" height="40" rx="6" fill="#2563eb"/>
    <line x1="45" y1="100" x2="45" y2="80" stroke="#2563eb" strokeWidth="2"/>
    <line x1="65" y1="100" x2="65" y2="85" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="45" cy="76" r="4" fill="#2563eb"/>
    <circle cx="65" cy="81" r="4" fill="#2563eb"/>
    <text x="55" y="160" fontSize="18" fontWeight="700" fill="#2563eb" textAnchor="middle">ルーター</text>
    {/* Smartphone (right) */}
    <rect x="700" y="95" width="30" height="50" rx="4" fill="#1a1d23"/>
    <rect x="704" y="100" width="22" height="36" rx="2" fill="#dbeafe"/>
    <text x="715" y="165" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">スマホ</text>
    {/* Direct line */}
    <line x1="85" y1="120" x2="695" y2="120" stroke="#1a1d23" strokeWidth="1.5" strokeDasharray="5"/>
    {/* Fresnel zone (ellipse) */}
    <ellipse cx="390" cy="120" rx="300" ry="65" fill="#2563eb" fill-opacity="0.08" stroke="#2563eb" strokeWidth="2" strokeDasharray="6"/>
    {/* 60% zone */}
    <ellipse cx="390" cy="120" rx="240" ry="40" fill="#2563eb" fill-opacity="0.12" stroke="#2563eb" strokeWidth="2"/>
    <text x="390" y="78" fontSize="18" fontWeight="700" fill="#2563eb" textAnchor="middle">第1フレネルゾーン</text>
    <text x="640" y="90" fontSize="18" fontWeight="400" fill="#2563eb">60%確保が理想</text>
    {/* Obstacle intruding */}
    <rect x="340" y="140" width="60" height="50" rx="4" fill="#d97706" opacity="0.6"/>
    <text x="370" y="210" fontSize="18" fontWeight="700" fill="#d97706" textAnchor="middle">障害物</text>
    <text x="390" y="235" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">ゾーンに物体が侵入すると信号が劣化する</text>
</svg>
</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
<div className="content center-layout">
<p className="scene-title">思考実験: 壁ギリギリの棚</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg">
    {/* Router */}
    <rect x="40" y="110" width="45" height="35" rx="5" fill="#2563eb"/>
    <line x1="52" y1="110" x2="52" y2="92" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="52" cy="88" r="3.5" fill="#2563eb"/>
    <line x1="72" y1="110" x2="72" y2="96" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="72" cy="92" r="3.5" fill="#2563eb"/>
    <text x="62" y="165" fontSize="18" fontWeight="700" fill="#2563eb" textAnchor="middle">ルーター</text>
    {/* Smartphone */}
    <rect x="710" y="105" width="28" height="45" rx="4" fill="#1a1d23"/>
    <rect x="714" y="110" width="20" height="32" rx="2" fill="#dbeafe"/>
    <text x="724" y="170" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">スマホ</text>
    {/* Direct path line */}
    <line x1="90" y1="128" x2="705" y2="128" stroke="#2563eb" strokeWidth="1" strokeDasharray="4"/>
    {/* Fresnel zone */}
    <ellipse cx="400" cy="128" rx="280" ry="55" fill="#2563eb" fill-opacity="0.06" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5"/>
    {/* Bookshelf intruding from below */}
    <rect x="330" y="155" width="100" height="80" rx="4" fill="#92400e" opacity="0.7"/>
    {/* Shelf boards */}
    <line x1="332" y1="175" x2="428" y2="175" stroke="#78350f" strokeWidth="2"/>
    <line x1="332" y1="195" x2="428" y2="195" stroke="#78350f" strokeWidth="2"/>
    <line x1="332" y1="215" x2="428" y2="215" stroke="#78350f" strokeWidth="2"/>
    {/* Books on shelf */}
    <rect x="336" y="156" width="12" height="18" rx="1" fill="#dc2626"/>
    <rect x="350" y="158" width="10" height="16" rx="1" fill="#2563eb"/>
    <rect x="362" y="156" width="14" height="18" rx="1" fill="#0891b2"/>
    <rect x="378" y="157" width="11" height="17" rx="1" fill="#d97706"/>
    <text x="380" y="250" fontSize="18" fontWeight="700" fill="#92400e" textAnchor="middle">本棚</text>
    {/* Warning */}
    <text x="380" y="278" fontSize="20" fontWeight="900" fill="#dc2626" textAnchor="middle">直線は通っていても、フレネルゾーンが遮られている!</text>
    {/* Annotation arrow */}
    <path d="M510,80 L445,148" stroke="#dc2626" strokeWidth="2" fill="none" marker-end="url(#arrRed2)"/>
    <text x="540" y="75" fontSize="18" fontWeight="700" fill="#dc2626">侵入領域</text>
    <defs>
        <marker id="arrRed2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#dc2626"/>
        </marker>
    </defs>
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
<p className="scene-title">水分子と2.4GHz ― 電子レンジと同じ原理</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg">
    {/* Water molecule (large) */}
    <circle cx="200" cy="110" r="45" fill="#2563eb" opacity="0.15" stroke="#2563eb" strokeWidth="2"/>
    <text x="200" y="115" fontSize="22" fontWeight="900" fill="#2563eb" textAnchor="middle">O</text>
    <circle cx="150" cy="160" r="28" fill="#0891b2" opacity="0.15" stroke="#0891b2" strokeWidth="2"/>
    <text x="150" y="165" fontSize="20" fontWeight="900" fill="#0891b2" textAnchor="middle">H</text>
    <circle cx="250" cy="160" r="28" fill="#0891b2" opacity="0.15" stroke="#0891b2" strokeWidth="2"/>
    <text x="250" y="165" fontSize="20" fontWeight="900" fill="#0891b2" textAnchor="middle">H</text>
    <line x1="178" y1="140" x2="162" y2="148" stroke="#1a1d23" strokeWidth="3"/>
    <line x1="222" y1="140" x2="238" y2="148" stroke="#1a1d23" strokeWidth="3"/>
    {/* Dipole arrows */}
    <text x="130" y="205" fontSize="18" fontWeight="700" fill="#0891b2" textAnchor="middle">δ+</text>
    <text x="270" y="205" fontSize="18" fontWeight="700" fill="#0891b2" textAnchor="middle">δ+</text>
    <text x="200" y="60" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">δ-</text>
    {/* Rotation arrows (vibration) */}
    <path d="M120,90 A90,90 0 0,1 280,90" stroke="#dc2626" strokeWidth="2" fill="none" strokeDasharray="5"/>
    <path d="M280,175 A90,90 0 0,1 120,175" stroke="#dc2626" strokeWidth="2" fill="none" strokeDasharray="5"/>
    <text x="200" y="235" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">H₂O 双極子</text>
    {/* Wave hitting molecule */}
    <path d="M380,80 Q410,65 440,80 Q470,95 500,80 Q530,65 560,80" stroke="#2563eb" strokeWidth="3" fill="none"/>
    <path d="M380,130 Q410,115 440,130 Q470,145 500,130 Q530,115 560,130" stroke="#2563eb" strokeWidth="3" fill="none"/>
    <text x="470" y="60" fontSize="20" fontWeight="900" fill="#2563eb" textAnchor="middle">2.4 GHz 電波</text>
    {/* Microwave icon area */}
    <rect x="620" y="60" width="120" height="90" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
    <text x="680" y="100" fontSize="18" fontWeight="900" fill="#dc2626" textAnchor="middle">電子レンジ</text>
    <text x="680" y="125" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">2.45 GHz</text>
    {/* Energy absorption arrow */}
    <path d="M560,105 L610,95" stroke="#dc2626" strokeWidth="2.5" fill="none" marker-end="url(#arrRedM)"/>
    <text x="680" y="175" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">ISMバンド 1947</text>
    <text x="470" y="195" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">水分子の回転振動と共鳴して吸収される</text>
    <defs>
        <marker id="arrRedM" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#dc2626"/>
        </marker>
    </defs>
</svg>
</div>
<img src="https://api.iconify.design/mdi/microwave.svg?color=%23dc2626&width=72&height=72" alt="Microwave" style={{ marginTop: '8px' }} />
</div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
<div className="content center-layout">
<div className="icon-deco">
    <img src="https://api.iconify.design/mdi/microwave.svg?color=%23dc2626&width=72&height=72" alt="Microwave" />
    <img src="https://api.iconify.design/mdi/cellphone.svg?color=%231a1d23&width=72&height=72" alt="Phone" />
</div>
<p className="big-statement"><span className="accent-coral">電子レンジ</span>・<span className="accent-primary">満員電車</span>・<span className="accent-teal">湿気の日</span><br />→ すべて「<span className="accent-coral">水</span>」が原因</p>
<p className="title-sub">人体は60%が水 ― 満員電車では乗客全員がWi-Fi吸収体になる</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
<div className="content center-layout">
<p className="scene-title">2.4GHz vs 5GHz ― 壁への強さの違い</p>
<div className="two-col">
    <div className="compare-card border-primary">
        <p className="compare-title accent-primary">2.4 GHz</p>
        <p className="compare-body">波長: 12.5 cm<br />壁の減衰: 約23 dB<br />速度: △<br />到達距離: ◎</p>
    </div>
    <div className="compare-card border-coral">
        <p className="compare-title accent-coral">5 GHz</p>
        <p className="compare-body">波長: 6 cm<br />壁の減衰: 約45 dB<br />速度: ◎<br />到達距離: △</p>
    </div>
</div>
<div className="source">出典: iBwave Building Material Attenuation Database</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
<div className="content center-layout">
<p className="scene-title">壁を通る電波の周波数差</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg">
    {/* Wall */}
    <rect x="340" y="10" width="100" height="260" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
    <text x="390" y="145" fontSize="20" fontWeight="700" fill="#1a1d23" textAnchor="middle" transform="rotate(-90,390,145)">コンクリート壁</text>
    {/* 2.4GHz wave (top) - long wavelength, moderate loss */}
    <text x="160" y="30" fontSize="20" fontWeight="900" fill="#2563eb" textAnchor="middle">2.4 GHz（波長 12.5cm）</text>
    <path d="M40,70 Q80,40 120,70 Q160,100 200,70 Q240,40 280,70 Q310,95 330,70" stroke="#2563eb" strokeWidth="4" fill="none"/>
    {/* Through wall - moderate attenuation */}
    <path d="M345,70 Q365,55 385,70 Q405,85 425,70" stroke="#2563eb" strokeWidth="2.5" fill="none" opacity="0.5"/>
    {/* Out the other side - weakened */}
    <path d="M450,70 Q490,50 530,70 Q570,90 610,70 Q650,50 690,70" stroke="#2563eb" strokeWidth="2" fill="none" opacity="0.4"/>
    <text x="580" y="45" fontSize="18" fontWeight="700" fill="#2563eb" textAnchor="middle">減衰するが届く</text>
    {/* 5GHz wave (bottom) - short wavelength, heavy loss */}
    <text x="160" y="175" fontSize="20" fontWeight="900" fill="#dc2626" textAnchor="middle">5 GHz（波長 6cm）</text>
    <path d="M40,210 Q60,190 80,210 Q100,230 120,210 Q140,190 160,210 Q180,230 200,210 Q220,190 240,210 Q260,230 280,210 Q300,190 320,210 Q330,220 335,210" stroke="#dc2626" strokeWidth="4" fill="none"/>
    {/* Through wall - heavy attenuation */}
    <path d="M345,210 Q355,203 365,210 Q375,217 385,210 Q395,203 405,210 Q415,217 425,210" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.25"/>
    {/* Out the other side - very weak */}
    <path d="M450,210 Q460,205 470,210 Q480,215 490,210" stroke="#dc2626" strokeWidth="1" fill="none" opacity="0.15"/>
    <text x="580" y="200" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">ほぼ届かない</text>
    {/* X mark */}
    <line x1="520" y1="200" x2="540" y2="220" stroke="#dc2626" strokeWidth="3"/>
    <line x1="540" y1="200" x2="520" y2="220" stroke="#dc2626" strokeWidth="3"/>
    <text x="390" y="278" fontSize="18" fontWeight="700" fill="#1a1d23" textAnchor="middle">周波数が高いほど壁での減衰が大きい</text>
</svg>
</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
<div className="content center-layout">
<p className="scene-title">同じ部屋なら逆転する</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 280" xmlns="http://www.w3.org/2000/svg">
    {/* Room outline */}
    <rect x="200" y="30" width="380" height="200" rx="4" fill="none" stroke="#1a1d23" strokeWidth="4"/>
    <text x="390" y="25" fontSize="20" fontWeight="900" fill="#1a1d23" textAnchor="middle">密閉された部屋</text>
    {/* Router in center */}
    <rect x="370" y="110" width="40" height="30" rx="4" fill="#2563eb"/>
    <line x1="382" y1="110" x2="382" y2="96" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="382" cy="92" r="3" fill="#2563eb"/>
    <line x1="398" y1="110" x2="398" y2="100" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="398" cy="96" r="3" fill="#2563eb"/>
    {/* 5GHz waves bouncing inside (blue arrows) */}
    <path d="M415,125 L540,70" stroke="#0891b2" strokeWidth="2.5" fill="none"/>
    <path d="M540,70 L540,180" stroke="#0891b2" strokeWidth="2.5" fill="none"/>
    <path d="M540,180 L300,180" stroke="#0891b2" strokeWidth="2.5" fill="none"/>
    <circle cx="540" cy="70" r="4" fill="#0891b2"/>
    <circle cx="540" cy="180" r="4" fill="#0891b2"/>
    <text x="500" y="248" fontSize="18" fontWeight="700" fill="#0891b2" textAnchor="middle">5GHz: 部屋の中で反射して高速</text>
    {/* 2.4GHz waves leaking through walls (red arrows going outside) */}
    <path d="M365,125 L210,60" stroke="#dc2626" strokeWidth="2" strokeDasharray="5"/>
    <path d="M210,60 L140,40" stroke="#dc2626" strokeWidth="2" marker-end="url(#arrRedRoom)"/>
    <path d="M365,135 L210,180" stroke="#dc2626" strokeWidth="2" strokeDasharray="5"/>
    <path d="M210,180 L130,210" stroke="#dc2626" strokeWidth="2" marker-end="url(#arrRedRoom)"/>
    <path d="M405,135 L560,200" stroke="#dc2626" strokeWidth="2" strokeDasharray="5"/>
    <path d="M560,200 L650,230" stroke="#dc2626" strokeWidth="2" marker-end="url(#arrRedRoom)"/>
    <text x="100" y="135" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">漏れる</text>
    <text x="670" y="215" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">漏れる</text>
    <text x="280" y="268" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">2.4GHz: 壁を透過して外へ漏れる</text>
    <defs>
        <marker id="arrRedRoom" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#dc2626"/>
        </marker>
    </defs>
</svg>
</div>
<p className="title-sub">壁がないなら5GHzの「速度」が活きる</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
<div className="content center-layout">
<div className="icon-deco">
    <img src="https://api.iconify.design/mdi/wifi.svg?color=%232563eb&width=72&height=72" alt="Wi-Fi" />
</div>
<p className="big-statement">万能な<span className="accent-coral">正解</span>はない</p>
<p className="title-sub" style={{ marginTop: '24px' }}><span className="accent-primary">素材</span> x <span className="accent-amber">構造</span> x <span className="accent-teal">距離</span> で最適解が変わる</p>
</div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
<div className="content center-layout">
<p className="scene-title">ルーター配置の意外な科学</p>
<div className="num-list">
    <div className="num-item">
        <div className="num-circle">1</div>
        <span className="num-text">高性能ルーターでも壁の減衰量は変わらない ― 物理法則は覆せない</span>
    </div>
    <div className="num-item">
        <div className="num-circle num-circle-teal">2</div>
        <span className="num-text">電波法で出力上限あり ― 日本では10mW/MHz（EIRP）が上限</span>
    </div>
    <div className="num-item">
        <div className="num-circle num-circle-amber">3</div>
        <span className="num-text">スマホ側（15mW）がボトルネック ― 上りの弱さが体感速度を決める</span>
    </div>
</div>
<img src="https://api.iconify.design/mdi/cellphone.svg?color=%231a1d23&width=72&height=72" alt="Phone" style={{ marginTop: '16px' }} />
</div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
<div className="content center-layout">
<p className="scene-title">最適配置の原則</p>
<div className="svg-diagram">
<svg viewBox="0 0 780 300" xmlns="http://www.w3.org/2000/svg">
    {/* Apartment top-down view */}
    <rect x="120" y="20" width="540" height="260" rx="6" fill="none" stroke="#1a1d23" strokeWidth="3"/>
    {/* Room dividers */}
    <line x1="340" y1="20" x2="340" y2="180" stroke="#1a1d23" strokeWidth="3"/>
    <line x1="340" y1="180" x2="660" y2="180" stroke="#1a1d23" strokeWidth="3"/>
    <line x1="480" y1="20" x2="480" y2="180" stroke="#1a1d23" strokeWidth="3"/>
    {/* Room labels */}
    <text x="230" y="150" fontSize="18" fontWeight="400" fill="#9ca3af" textAnchor="middle">リビング</text>
    <text x="410" y="110" fontSize="18" fontWeight="400" fill="#9ca3af" textAnchor="middle">寝室</text>
    <text x="570" y="110" fontSize="18" fontWeight="400" fill="#9ca3af" textAnchor="middle">書斎</text>
    <text x="500" y="240" fontSize="18" fontWeight="400" fill="#9ca3af" textAnchor="middle">キッチン</text>
    {/* BAD placement (corner, floor) */}
    <rect x="130" y="250" width="30" height="20" rx="3" fill="#dc2626" opacity="0.5"/>
    <line x1="140" y1="250" x2="140" y2="242" stroke="#dc2626" strokeWidth="1.5"/>
    <circle cx="140" cy="240" r="2.5" fill="#dc2626"/>
    <line x1="152" y1="250" x2="152" y2="244" stroke="#dc2626" strokeWidth="1.5"/>
    <circle cx="152" cy="242" r="2.5" fill="#dc2626"/>
    <line x1="125" y1="258" x2="165" y2="258" stroke="#dc2626" strokeWidth="2"/>
    <line x1="125" y1="262" x2="165" y2="262" stroke="#dc2626" strokeWidth="2"/>
    <text x="145" y="290" fontSize="18" fontWeight="700" fill="#dc2626" textAnchor="middle">NG: 隅・床置き</text>
    {/* GOOD placement (center, elevated) */}
    <rect x="315" y="52" width="30" height="20" rx="3" fill="#2563eb"/>
    <line x1="325" y1="52" x2="325" y2="40" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="325" cy="37" r="3" fill="#2563eb"/>
    <line x1="337" y1="52" x2="337" y2="44" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="337" cy="41" r="3" fill="#2563eb"/>
    {/* Signal circles from good placement */}
    <circle cx="330" cy="62" r="50" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="330" cy="62" r="100" fill="none" stroke="#2563eb" strokeWidth="1.2" opacity="0.35"/>
    <circle cx="330" cy="62" r="160" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.2"/>
    <text x="330" y="35" fontSize="18" fontWeight="900" fill="#2563eb" textAnchor="middle">GOOD: 中央・高い位置</text>
    {/* Legend */}
    <text x="50" y="60" fontSize="18" fontWeight="700" fill="#1a1d23">俯瞰図</text>
</svg>
</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
<div className="content center-layout">
<p className="scene-title">シーン別・周波数の使い分け</p>
<div className="two-col">
    <div className="compare-card border-primary">
        <img src="https://api.iconify.design/mdi/router-wireless.svg?color=%232563eb&width=72&height=72" alt="Router" />
        <p className="compare-title accent-primary">同じ部屋 → 5GHz</p>
        <p className="compare-body">壁の減衰なし<br />高速通信を活かす<br />速度重視</p>
    </div>
    <div className="compare-card border-amber">
        <img src="https://api.iconify.design/mdi/wifi.svg?color=%23d97706&width=72&height=72" alt="Wi-Fi" />
        <p className="compare-title accent-amber">壁越え → 2.4GHz</p>
        <p className="compare-body">壁の減衰に強い<br />長い波長で回折しやすい<br />到達重視</p>
    </div>
</div>
</div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
<div className="content center-layout">
<div className="icon-deco">
    <img src="https://api.iconify.design/mdi/wifi.svg?color=%232563eb&width=72&height=72" alt="Wi-Fi" />
    <img src="https://api.iconify.design/mdi/signal-cellular-3.svg?color=%232563eb&width=72&height=72" alt="Signal" />
</div>
<p className="scene-title">まとめ ― 3つのポイント</p>
<div className="num-list">
    <div className="num-item">
        <div className="num-circle">1</div>
        <span className="num-text">反射・吸収・回折の3メカニズムが壁での減衰を生む</span>
    </div>
    <div className="num-item">
        <div className="num-circle num-circle-teal">2</div>
        <span className="num-text">フレネルゾーンの確保と水の吸収に注意する</span>
    </div>
    <div className="num-item">
        <div className="num-circle num-circle-amber">3</div>
        <span className="num-text">配置と周波数の使い分けで体感速度は大きく変わる</span>
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
    19: Scene19,
    20: Scene20,
    21: Scene21,
    22: Scene22,
    23: Scene23,
};

export const TOTAL_SCENE_COUNT = 24;
