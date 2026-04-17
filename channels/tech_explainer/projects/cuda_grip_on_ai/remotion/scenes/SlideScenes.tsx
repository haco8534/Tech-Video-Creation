import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nvidia.svg" width="100" height="100" alt="NVIDIA" />
        <div className="title-large">CUDAが握る<br /><span className="accent-primary">AIの首根っこ</span></div>
        <div className="big-statement">ハードウェアの覇者が築いた<span className="accent-primary">ソフトウェア帝国</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">AIチップの<span className="accent-primary">支配者</span></div>
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nvidia.svg" width="80" height="80" alt="NVIDIA" />
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-primary">~90%</div>
                <div className="metric-label">AIチップ市場シェア</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-amber">$4兆</div>
                <div className="metric-label">時価総額（約600兆円）</div>
            </div>
        </div>
        <div className="source">出典: TechInsights / Bloomberg 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">CPUとGPUの<span className="accent-teal">発想の違い</span></div>
        <svg viewBox="0 0 900 280" className="svg-container" width="900" height="280">
            {/* Left: CPU = 天才1人 */}
            <text x="180" y="30" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0891b2">CPU：天才1人</text>
            {/* Large person icon (head + shoulders) */}
            <circle cx="180" cy="100" r="35" fill="#0891b2"/>
            <path d="M180 135 C140 135 110 165 110 195 L110 220 L250 220 L250 195 C250 165 220 135 180 135Z" fill="#0891b2"/>
            <text x="180" y="260" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">複雑な処理を高速に</text>
            {/* Arrow */}
            <text x="390" y="140" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1a1d23">vs</text>
            {/* Right: GPU = 数千人 */}
            <text x="660" y="30" textAnchor="middle" fontSize="26" fontWeight="900" fill="#76B900">GPU：数千人の作業員</text>
            {/* Grid of small person icons (head + shoulders) */}
            <g>
                {/* Row 1 */}
                <circle cx="510" cy="65" r="8" fill="#76B900"/><path d="M510 73 C502 73 496 79 496 85 L496 92 L524 92 L524 85 C524 79 518 73 510 73Z" fill="#76B900"/>
                <circle cx="545" cy="65" r="8" fill="#76B900"/><path d="M545 73 C537 73 531 79 531 85 L531 92 L559 92 L559 85 C559 79 553 73 545 73Z" fill="#76B900"/>
                <circle cx="580" cy="65" r="8" fill="#76B900"/><path d="M580 73 C572 73 566 79 566 85 L566 92 L594 92 L594 85 C594 79 588 73 580 73Z" fill="#76B900"/>
                <circle cx="615" cy="65" r="8" fill="#76B900"/><path d="M615 73 C607 73 601 79 601 85 L601 92 L629 92 L629 85 C629 79 623 73 615 73Z" fill="#76B900"/>
                <circle cx="650" cy="65" r="8" fill="#76B900"/><path d="M650 73 C642 73 636 79 636 85 L636 92 L664 92 L664 85 C664 79 658 73 650 73Z" fill="#76B900"/>
                <circle cx="685" cy="65" r="8" fill="#76B900"/><path d="M685 73 C677 73 671 79 671 85 L671 92 L699 92 L699 85 C699 79 693 73 685 73Z" fill="#76B900"/>
                <circle cx="720" cy="65" r="8" fill="#76B900"/><path d="M720 73 C712 73 706 79 706 85 L706 92 L734 92 L734 85 C734 79 728 73 720 73Z" fill="#76B900"/>
                <circle cx="755" cy="65" r="8" fill="#76B900"/><path d="M755 73 C747 73 741 79 741 85 L741 92 L769 92 L769 85 C769 79 763 73 755 73Z" fill="#76B900"/>
                <circle cx="790" cy="65" r="8" fill="#76B900"/><path d="M790 73 C782 73 776 79 776 85 L776 92 L804 92 L804 85 C804 79 798 73 790 73Z" fill="#76B900"/>
                {/* Row 2 */}
                <circle cx="510" cy="110" r="8" fill="#76B900"/><path d="M510 118 C502 118 496 124 496 130 L496 137 L524 137 L524 130 C524 124 518 118 510 118Z" fill="#76B900"/>
                <circle cx="545" cy="110" r="8" fill="#76B900"/><path d="M545 118 C537 118 531 124 531 130 L531 137 L559 137 L559 130 C559 124 553 118 545 118Z" fill="#76B900"/>
                <circle cx="580" cy="110" r="8" fill="#76B900"/><path d="M580 118 C572 118 566 124 566 130 L566 137 L594 137 L594 130 C594 124 588 118 580 118Z" fill="#76B900"/>
                <circle cx="615" cy="110" r="8" fill="#76B900"/><path d="M615 118 C607 118 601 124 601 130 L601 137 L629 137 L629 130 C629 124 623 118 615 118Z" fill="#76B900"/>
                <circle cx="650" cy="110" r="8" fill="#76B900"/><path d="M650 118 C642 118 636 124 636 130 L636 137 L664 137 L664 130 C664 124 658 118 650 118Z" fill="#76B900"/>
                <circle cx="685" cy="110" r="8" fill="#76B900"/><path d="M685 118 C677 118 671 124 671 130 L671 137 L699 137 L699 130 C699 124 693 118 685 118Z" fill="#76B900"/>
                <circle cx="720" cy="110" r="8" fill="#76B900"/><path d="M720 118 C712 118 706 124 706 130 L706 137 L734 137 L734 130 C734 124 728 118 720 118Z" fill="#76B900"/>
                <circle cx="755" cy="110" r="8" fill="#76B900"/><path d="M755 118 C747 118 741 124 741 130 L741 137 L769 137 L769 130 C769 124 763 118 755 118Z" fill="#76B900"/>
                <circle cx="790" cy="110" r="8" fill="#76B900"/><path d="M790 118 C782 118 776 124 776 130 L776 137 L804 137 L804 130 C804 124 798 118 790 118Z" fill="#76B900"/>
                {/* Row 3 */}
                <circle cx="510" cy="155" r="8" fill="#76B900"/><path d="M510 163 C502 163 496 169 496 175 L496 182 L524 182 L524 175 C524 169 518 163 510 163Z" fill="#76B900"/>
                <circle cx="545" cy="155" r="8" fill="#76B900"/><path d="M545 163 C537 163 531 169 531 175 L531 182 L559 182 L559 175 C559 169 553 163 545 163Z" fill="#76B900"/>
                <circle cx="580" cy="155" r="8" fill="#76B900"/><path d="M580 163 C572 163 566 169 566 175 L566 182 L594 182 L594 175 C594 169 588 163 580 163Z" fill="#76B900"/>
                <circle cx="615" cy="155" r="8" fill="#76B900"/><path d="M615 163 C607 163 601 169 601 175 L601 182 L629 182 L629 175 C629 169 623 163 615 163Z" fill="#76B900"/>
                <circle cx="650" cy="155" r="8" fill="#76B900"/><path d="M650 163 C642 163 636 169 636 175 L636 182 L664 182 L664 175 C664 169 658 163 650 163Z" fill="#76B900"/>
                <circle cx="685" cy="155" r="8" fill="#76B900"/><path d="M685 163 C677 163 671 169 671 175 L671 182 L699 182 L699 175 C699 169 693 163 685 163Z" fill="#76B900"/>
                <circle cx="720" cy="155" r="8" fill="#76B900"/><path d="M720 163 C712 163 706 169 706 175 L706 182 L734 182 L734 175 C734 169 728 163 720 163Z" fill="#76B900"/>
                <circle cx="755" cy="155" r="8" fill="#76B900"/><path d="M755 163 C747 163 741 169 741 175 L741 182 L769 182 L769 175 C769 169 763 163 755 163Z" fill="#76B900"/>
                <circle cx="790" cy="155" r="8" fill="#76B900"/><path d="M790 163 C782 163 776 169 776 175 L776 182 L804 182 L804 175 C804 169 798 163 790 163Z" fill="#76B900"/>
                {/* Row 4 */}
                <circle cx="510" cy="200" r="8" fill="#76B900"/><path d="M510 208 C502 208 496 214 496 220 L496 227 L524 227 L524 220 C524 214 518 208 510 208Z" fill="#76B900"/>
                <circle cx="545" cy="200" r="8" fill="#76B900"/><path d="M545 208 C537 208 531 214 531 220 L531 227 L559 227 L559 220 C559 214 553 208 545 208Z" fill="#76B900"/>
                <circle cx="580" cy="200" r="8" fill="#76B900"/><path d="M580 208 C572 208 566 214 566 220 L566 227 L594 227 L594 220 C594 214 588 208 580 208Z" fill="#76B900"/>
                <circle cx="615" cy="200" r="8" fill="#76B900"/><path d="M615 208 C607 208 601 214 601 220 L601 227 L629 227 L629 220 C629 214 623 208 615 208Z" fill="#76B900"/>
                <circle cx="650" cy="200" r="8" fill="#76B900"/><path d="M650 208 C642 208 636 214 636 220 L636 227 L664 227 L664 220 C664 214 658 208 650 208Z" fill="#76B900"/>
                <circle cx="685" cy="200" r="8" fill="#76B900"/><path d="M685 208 C677 208 671 214 671 220 L671 227 L699 227 L699 220 C699 214 693 208 685 208Z" fill="#76B900"/>
                <circle cx="720" cy="200" r="8" fill="#76B900"/><path d="M720 208 C712 208 706 214 706 220 L706 227 L734 227 L734 220 C734 214 728 208 720 208Z" fill="#76B900"/>
                <circle cx="755" cy="200" r="8" fill="#76B900"/><path d="M755 208 C747 208 741 214 741 220 L741 227 L769 227 L769 220 C769 214 763 208 755 208Z" fill="#76B900"/>
                <circle cx="790" cy="200" r="8" fill="#76B900"/><path d="M790 208 C782 208 776 214 776 220 L776 227 L804 227 L804 220 C804 214 798 208 790 208Z" fill="#76B900"/>
            </g>
            <text x="660" y="260" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">単純な計算を超並列で</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">CPUとGPUの<span className="accent-teal">コア構造</span></div>
        <svg viewBox="0 0 900 240" className="svg-container" width="900" height="240">
            {/* CPU side */}
            <text x="180" y="24" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0891b2">CPU</text>
            <rect x="40" y="35" width="280" height="160" rx="12" fill="none" stroke="#0891b2" strokeWidth="3"/>
            {/* 8 large cores */}
            <rect x="60" y="55" width="50" height="50" rx="6" fill="#0891b2"/>
            <rect x="125" y="55" width="50" height="50" rx="6" fill="#0891b2"/>
            <rect x="190" y="55" width="50" height="50" rx="6" fill="#0891b2"/>
            <rect x="255" y="55" width="50" height="50" rx="6" fill="#0891b2"/>
            <rect x="60" y="120" width="50" height="50" rx="6" fill="#0891b2"/>
            <rect x="125" y="120" width="50" height="50" rx="6" fill="#0891b2"/>
            <rect x="190" y="120" width="50" height="50" rx="6" fill="#0891b2"/>
            <rect x="255" y="120" width="50" height="50" rx="6" fill="#0891b2"/>
            <text x="180" y="218" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0891b2">8コア（大きく強力）</text>
            {/* VS */}
            <text x="420" y="120" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a1d23">vs</text>
            {/* GPU side */}
            <text x="680" y="24" textAnchor="middle" fontSize="24" fontWeight="900" fill="#76B900">GPU</text>
            <rect x="500" y="35" width="360" height="160" rx="12" fill="none" stroke="#76B900" strokeWidth="3"/>
            {/* Many small cores (grid of tiny squares) */}
            <g fill="#76B900">
                {/* 16 columns x 8 rows = 128 tiny squares */}
                <rect x="515" y="48" width="12" height="12" rx="1"/><rect x="533" y="48" width="12" height="12" rx="1"/><rect x="551" y="48" width="12" height="12" rx="1"/><rect x="569" y="48" width="12" height="12" rx="1"/><rect x="587" y="48" width="12" height="12" rx="1"/><rect x="605" y="48" width="12" height="12" rx="1"/><rect x="623" y="48" width="12" height="12" rx="1"/><rect x="641" y="48" width="12" height="12" rx="1"/><rect x="659" y="48" width="12" height="12" rx="1"/><rect x="677" y="48" width="12" height="12" rx="1"/><rect x="695" y="48" width="12" height="12" rx="1"/><rect x="713" y="48" width="12" height="12" rx="1"/><rect x="731" y="48" width="12" height="12" rx="1"/><rect x="749" y="48" width="12" height="12" rx="1"/><rect x="767" y="48" width="12" height="12" rx="1"/><rect x="785" y="48" width="12" height="12" rx="1"/>
                <rect x="515" y="66" width="12" height="12" rx="1"/><rect x="533" y="66" width="12" height="12" rx="1"/><rect x="551" y="66" width="12" height="12" rx="1"/><rect x="569" y="66" width="12" height="12" rx="1"/><rect x="587" y="66" width="12" height="12" rx="1"/><rect x="605" y="66" width="12" height="12" rx="1"/><rect x="623" y="66" width="12" height="12" rx="1"/><rect x="641" y="66" width="12" height="12" rx="1"/><rect x="659" y="66" width="12" height="12" rx="1"/><rect x="677" y="66" width="12" height="12" rx="1"/><rect x="695" y="66" width="12" height="12" rx="1"/><rect x="713" y="66" width="12" height="12" rx="1"/><rect x="731" y="66" width="12" height="12" rx="1"/><rect x="749" y="66" width="12" height="12" rx="1"/><rect x="767" y="66" width="12" height="12" rx="1"/><rect x="785" y="66" width="12" height="12" rx="1"/>
                <rect x="515" y="84" width="12" height="12" rx="1"/><rect x="533" y="84" width="12" height="12" rx="1"/><rect x="551" y="84" width="12" height="12" rx="1"/><rect x="569" y="84" width="12" height="12" rx="1"/><rect x="587" y="84" width="12" height="12" rx="1"/><rect x="605" y="84" width="12" height="12" rx="1"/><rect x="623" y="84" width="12" height="12" rx="1"/><rect x="641" y="84" width="12" height="12" rx="1"/><rect x="659" y="84" width="12" height="12" rx="1"/><rect x="677" y="84" width="12" height="12" rx="1"/><rect x="695" y="84" width="12" height="12" rx="1"/><rect x="713" y="84" width="12" height="12" rx="1"/><rect x="731" y="84" width="12" height="12" rx="1"/><rect x="749" y="84" width="12" height="12" rx="1"/><rect x="767" y="84" width="12" height="12" rx="1"/><rect x="785" y="84" width="12" height="12" rx="1"/>
                <rect x="515" y="102" width="12" height="12" rx="1"/><rect x="533" y="102" width="12" height="12" rx="1"/><rect x="551" y="102" width="12" height="12" rx="1"/><rect x="569" y="102" width="12" height="12" rx="1"/><rect x="587" y="102" width="12" height="12" rx="1"/><rect x="605" y="102" width="12" height="12" rx="1"/><rect x="623" y="102" width="12" height="12" rx="1"/><rect x="641" y="102" width="12" height="12" rx="1"/><rect x="659" y="102" width="12" height="12" rx="1"/><rect x="677" y="102" width="12" height="12" rx="1"/><rect x="695" y="102" width="12" height="12" rx="1"/><rect x="713" y="102" width="12" height="12" rx="1"/><rect x="731" y="102" width="12" height="12" rx="1"/><rect x="749" y="102" width="12" height="12" rx="1"/><rect x="767" y="102" width="12" height="12" rx="1"/><rect x="785" y="102" width="12" height="12" rx="1"/>
                <rect x="515" y="120" width="12" height="12" rx="1"/><rect x="533" y="120" width="12" height="12" rx="1"/><rect x="551" y="120" width="12" height="12" rx="1"/><rect x="569" y="120" width="12" height="12" rx="1"/><rect x="587" y="120" width="12" height="12" rx="1"/><rect x="605" y="120" width="12" height="12" rx="1"/><rect x="623" y="120" width="12" height="12" rx="1"/><rect x="641" y="120" width="12" height="12" rx="1"/><rect x="659" y="120" width="12" height="12" rx="1"/><rect x="677" y="120" width="12" height="12" rx="1"/><rect x="695" y="120" width="12" height="12" rx="1"/><rect x="713" y="120" width="12" height="12" rx="1"/><rect x="731" y="120" width="12" height="12" rx="1"/><rect x="749" y="120" width="12" height="12" rx="1"/><rect x="767" y="120" width="12" height="12" rx="1"/><rect x="785" y="120" width="12" height="12" rx="1"/>
                <rect x="515" y="138" width="12" height="12" rx="1"/><rect x="533" y="138" width="12" height="12" rx="1"/><rect x="551" y="138" width="12" height="12" rx="1"/><rect x="569" y="138" width="12" height="12" rx="1"/><rect x="587" y="138" width="12" height="12" rx="1"/><rect x="605" y="138" width="12" height="12" rx="1"/><rect x="623" y="138" width="12" height="12" rx="1"/><rect x="641" y="138" width="12" height="12" rx="1"/><rect x="659" y="138" width="12" height="12" rx="1"/><rect x="677" y="138" width="12" height="12" rx="1"/><rect x="695" y="138" width="12" height="12" rx="1"/><rect x="713" y="138" width="12" height="12" rx="1"/><rect x="731" y="138" width="12" height="12" rx="1"/><rect x="749" y="138" width="12" height="12" rx="1"/><rect x="767" y="138" width="12" height="12" rx="1"/><rect x="785" y="138" width="12" height="12" rx="1"/>
                <rect x="515" y="156" width="12" height="12" rx="1"/><rect x="533" y="156" width="12" height="12" rx="1"/><rect x="551" y="156" width="12" height="12" rx="1"/><rect x="569" y="156" width="12" height="12" rx="1"/><rect x="587" y="156" width="12" height="12" rx="1"/><rect x="605" y="156" width="12" height="12" rx="1"/><rect x="623" y="156" width="12" height="12" rx="1"/><rect x="641" y="156" width="12" height="12" rx="1"/><rect x="659" y="156" width="12" height="12" rx="1"/><rect x="677" y="156" width="12" height="12" rx="1"/><rect x="695" y="156" width="12" height="12" rx="1"/><rect x="713" y="156" width="12" height="12" rx="1"/><rect x="731" y="156" width="12" height="12" rx="1"/><rect x="749" y="156" width="12" height="12" rx="1"/><rect x="767" y="156" width="12" height="12" rx="1"/><rect x="785" y="156" width="12" height="12" rx="1"/>
                <rect x="515" y="174" width="12" height="12" rx="1"/><rect x="533" y="174" width="12" height="12" rx="1"/><rect x="551" y="174" width="12" height="12" rx="1"/><rect x="569" y="174" width="12" height="12" rx="1"/><rect x="587" y="174" width="12" height="12" rx="1"/><rect x="605" y="174" width="12" height="12" rx="1"/><rect x="623" y="174" width="12" height="12" rx="1"/><rect x="641" y="174" width="12" height="12" rx="1"/><rect x="659" y="174" width="12" height="12" rx="1"/><rect x="677" y="174" width="12" height="12" rx="1"/><rect x="695" y="174" width="12" height="12" rx="1"/><rect x="713" y="174" width="12" height="12" rx="1"/><rect x="731" y="174" width="12" height="12" rx="1"/><rect x="749" y="174" width="12" height="12" rx="1"/><rect x="767" y="174" width="12" height="12" rx="1"/><rect x="785" y="174" width="12" height="12" rx="1"/>
            </g>
            <text x="680" y="218" textAnchor="middle" fontSize="20" fontWeight="700" fill="#76B900">数千コア（小さく大量）</text>
        </svg>
        <div className="source">H100: 16,896 CUDAコア / Ryzen 9: 16コア</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">なぜGPUが<span className="accent-primary">AI</span>に最適なのか</div>
        <div className="big-statement">ディープラーニングの正体は<br /><span className="accent-primary">巨大な行列の掛け算</span></div>
        <svg viewBox="0 0 700 180" className="svg-container" width="700" height="180">
            {/* Matrix A */}
            <rect x="30" y="20" width="160" height="140" rx="6" fill="none" stroke="#76B900" strokeWidth="3"/>
            <text x="55" y="55" fontSize="20" fontWeight="700" fill="#1a1d23">0.3</text>
            <text x="115" y="55" fontSize="20" fontWeight="700" fill="#1a1d23">1.2</text>
            <text x="55" y="90" fontSize="20" fontWeight="700" fill="#1a1d23">0.7</text>
            <text x="115" y="90" fontSize="20" fontWeight="700" fill="#1a1d23">0.1</text>
            <text x="55" y="125" fontSize="20" fontWeight="700" fill="#1a1d23">2.1</text>
            <text x="115" y="125" fontSize="20" fontWeight="700" fill="#1a1d23">0.8</text>
            <text x="80" y="165" fontSize="14" fill="#76B900" fontWeight="700">... x 数十億パラメータ</text>
            {/* Multiply */}
            <text x="225" y="100" fontSize="36" fontWeight="900" fill="#76B900">x</text>
            {/* Matrix B */}
            <rect x="260" y="20" width="160" height="140" rx="6" fill="none" stroke="#0891b2" strokeWidth="3"/>
            <text x="285" y="55" fontSize="20" fontWeight="700" fill="#1a1d23">0.5</text>
            <text x="345" y="55" fontSize="20" fontWeight="700" fill="#1a1d23">0.9</text>
            <text x="285" y="90" fontSize="20" fontWeight="700" fill="#1a1d23">1.1</text>
            <text x="345" y="90" fontSize="20" fontWeight="700" fill="#1a1d23">0.4</text>
            <text x="285" y="125" fontSize="20" fontWeight="700" fill="#1a1d23">0.6</text>
            <text x="345" y="125" fontSize="20" fontWeight="700" fill="#1a1d23">1.3</text>
            {/* Equals */}
            <text x="455" y="100" fontSize="36" fontWeight="900" fill="#1a1d23">=</text>
            {/* Result highlight */}
            <rect x="490" y="40" width="180" height="100" rx="12" fill="#e8f5d0" stroke="#76B900" strokeWidth="3"/>
            <text x="580" y="80" textAnchor="middle" fontSize="22" fontWeight="900" fill="#76B900">GPUなら</text>
            <text x="580" y="110" textAnchor="middle" fontSize="22" fontWeight="900" fill="#76B900">10倍以上高速</text>
        </svg>
        <div className="source">出典: IBM Research / GPUコンピューティング白書</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">CUDAの<span className="accent-primary">誕生</span></div>
        <div className="flow-chain">
            <div className="fc-node">
                <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--teal)' } as React.CSSProperties}>2003</div>
                <div style={{ fontSize: '20px', fontWeight: '700' } as React.CSSProperties}>Stanford大学</div>
                <div style={{ fontSize: '18px' } as React.CSSProperties}>BrookGPU研究</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--teal)' } as React.CSSProperties}>2004</div>
                <div style={{ fontSize: '20px', fontWeight: '700' } as React.CSSProperties}>Ian Buck</div>
                <div style={{ fontSize: '18px' } as React.CSSProperties}>NVIDIA入社</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node" style={{ borderColor: 'var(--primary)', borderWidth: '3px' } as React.CSSProperties}>
                <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--primary)' } as React.CSSProperties}>2006</div>
                <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--primary)' } as React.CSSProperties}>CUDA誕生</div>
                <div style={{ fontSize: '18px' } as React.CSSProperties}>GPUで汎用計算</div>
            </div>
        </div>
        <div className="big-statement">GPUを<span className="accent-primary">「ゲーム専用」</span>から<span className="accent-teal">「万能計算機」</span>に</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">Jensen Huangの<span className="accent-coral">賭け</span></div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">すべてのGeForceにCUDAを載せる。<br />たとえGPUのコストが<span className="accent-coral">50%上がっても</span></div>
            <div className="quote-source">— Jensen Huang, NVIDIA CEO</div>
        </div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-coral">+50%</div>
                <div className="metric-label">GPU製造コスト増</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-amber">35%</div>
                <div className="metric-label">当時の粗利益率</div>
            </div>
        </div>
        <div className="source">出典: NVIDIA社史 / Jensen Huang講演</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title"><span className="year-badge" style={{ background: 'var(--primary)', color: '#fff', padding: '4px 16px', borderRadius: '8px' } as React.CSSProperties}>2012</span> AlexNetの<span className="accent-primary">衝撃</span></div>
        <svg viewBox="0 0 700 180" className="svg-container" width="700" height="180">
            {/* Trophy icon */}
            <path d="M350 15 L330 15 L325 60 C325 80 340 95 350 95 C360 95 375 80 375 60 L370 15Z" fill="#d97706" stroke="#d97706" strokeWidth="2"/>
            <rect x="335" y="95" width="30" height="10" rx="3" fill="#d97706"/>
            <rect x="325" y="105" width="50" height="8" rx="3" fill="#d97706"/>
            {/* Left handle */}
            <path d="M325 25 C305 25 295 45 310 60" fill="none" stroke="#d97706" strokeWidth="3"/>
            {/* Right handle */}
            <path d="M375 25 C395 25 405 45 390 60" fill="none" stroke="#d97706" strokeWidth="3"/>
            <text x="350" y="140" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1a1d23">ImageNet画像認識コンペ</text>
            <text x="350" y="170" textAnchor="middle" fontSize="20" fontWeight="700" fill="#76B900">2位に10.8ポイント差で圧勝</text>
        </svg>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-primary">2基</div>
                <div className="metric-label">GTX 580 GPU</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-teal">≒ 2,000</div>
                <div className="metric-label">CPU換算台数</div>
            </div>
        </div>
        <div className="source">出典: Krizhevsky et al. (2012) / NVIDIA blog</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">CUDAエコシステムの<span className="accent-primary">好循環</span></div>
        <svg viewBox="0 0 800 200" className="svg-container" width="800" height="200">
            {/* Circular ecosystem */}
            <rect x="20" y="60" width="140" height="60" rx="10" fill="#e8f5d0" stroke="#76B900" strokeWidth="2"/>
            <text x="90" y="95" textAnchor="middle" fontSize="20" fontWeight="900" fill="#76B900">cuDNN</text>
            <text x="175" y="95" fontSize="24" fontWeight="900" fill="#76B900">→</text>
            <rect x="195" y="60" width="140" height="60" rx="10" fill="#e8f5d0" stroke="#76B900" strokeWidth="2"/>
            <text x="265" y="95" textAnchor="middle" fontSize="20" fontWeight="900" fill="#76B900">TensorRT</text>
            <text x="350" y="95" fontSize="24" fontWeight="900" fill="#76B900">→</text>
            <rect x="370" y="60" width="140" height="60" rx="10" fill="#e8f5d0" stroke="#76B900" strokeWidth="2"/>
            <text x="440" y="95" textAnchor="middle" fontSize="20" fontWeight="900" fill="#76B900">NCCL</text>
            <text x="525" y="95" fontSize="24" fontWeight="900" fill="#76B900">→</text>
            <rect x="545" y="60" width="220" height="60" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
            <text x="655" y="90" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0891b2">PyTorch / TensorFlow</text>
            <text x="655" y="110" textAnchor="middle" fontSize="16" fill="#0891b2">にCUDA組み込み</text>
            {/* Stats */}
            <rect x="150" y="145" width="220" height="45" rx="8" fill="#76B900"/>
            <text x="260" y="174" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">450万人+の開発者</text>
            <rect x="420" y="145" width="240" height="45" rx="8" fill="#0891b2"/>
            <text x="540" y="174" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">450以上の大学で採用</text>
        </svg>
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" alt="PyTorch" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" />
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nvidia.svg" alt="NVIDIA" />
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">スペック比較の<span className="accent-coral">罠</span></div>
        <div className="two-col">
            <div className="compare-card" style={{ borderColor: 'var(--primary)' } as React.CSSProperties}>
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nvidia.svg" width="48" height="48" alt="NVIDIA" style={{ display: 'block', margin: '0 auto 8px' } as React.CSSProperties} />
                <div className="card-title accent-primary">NVIDIA H100</div>
                <div className="card-desc" style={{ textAlign: 'left' } as React.CSSProperties}>
                    メモリ: 80GB<br />
                    帯域幅: 3.35TB/s<br />
                    <span style={{ fontWeight: '700', color: 'var(--primary)' } as React.CSSProperties}>実戦のAI学習: 圧勝</span>
                </div>
            </div>
            <div className="compare-card" style={{ borderColor: 'var(--coral)' } as React.CSSProperties}>
                <img src="https://cdn.simpleicons.org/amd" width="48" height="48" alt="AMD" style={{ display: 'block', margin: '0 auto 8px' } as React.CSSProperties} />
                <div className="card-title accent-coral">AMD MI300X</div>
                <div className="card-desc" style={{ textAlign: 'left' } as React.CSSProperties}>
                    メモリ: 192GB <span className="accent-coral">(2.4倍)</span><br />
                    帯域幅: 5.3TB/s <span className="accent-coral">(1.6倍)</span><br />
                    <span style={{ fontWeight: '700', color: 'var(--coral)' } as React.CSSProperties}>紙の上では勝利</span>
                </div>
            </div>
        </div>
        <div className="big-statement">カタログでは負けて、<span className="accent-primary">現場では勝つ</span></div>
        <div className="source">出典: MLPerf Benchmark / SemiAnalysis 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">ソフトウェアの<span className="accent-primary">堀（moat）</span></div>
        <svg viewBox="0 0 900 240" className="svg-container" width="900" height="240">
            {/* CUDA side: full bookshelf */}
            <text x="220" y="24" textAnchor="middle" fontSize="22" fontWeight="900" fill="#76B900">CUDA ＝ 英語</text>
            <rect x="40" y="35" width="360" height="180" rx="10" fill="#f0fdf4" stroke="#76B900" strokeWidth="2"/>
            {/* Shelves */}
            <line x1="55" y1="85" x2="385" y2="85" stroke="#76B900" strokeWidth="2"/>
            <line x1="55" y1="140" x2="385" y2="140" stroke="#76B900" strokeWidth="2"/>
            <line x1="55" y1="195" x2="385" y2="195" stroke="#76B900" strokeWidth="2"/>
            {/* Books row 1 */}
            <rect x="60" y="45" width="30" height="38" rx="2" fill="#76B900"/><rect x="95" y="50" width="28" height="33" rx="2" fill="#0891b2"/><rect x="128" y="47" width="32" height="36" rx="2" fill="#d97706"/><rect x="165" y="45" width="26" height="38" rx="2" fill="#76B900"/><rect x="196" y="48" width="30" height="35" rx="2" fill="#dc2626"/><rect x="231" y="45" width="28" height="38" rx="2" fill="#0891b2"/><rect x="264" y="50" width="32" height="33" rx="2" fill="#76B900"/><rect x="301" y="46" width="26" height="37" rx="2" fill="#d97706"/><rect x="332" y="45" width="30" height="38" rx="2" fill="#76B900"/>
            {/* Books row 2 */}
            <rect x="60" y="92" width="28" height="45" rx="2" fill="#0891b2"/><rect x="93" y="95" width="32" height="42" rx="2" fill="#76B900"/><rect x="130" y="92" width="26" height="45" rx="2" fill="#d97706"/><rect x="161" y="94" width="30" height="43" rx="2" fill="#76B900"/><rect x="196" y="92" width="28" height="45" rx="2" fill="#dc2626"/><rect x="229" y="95" width="32" height="42" rx="2" fill="#0891b2"/><rect x="266" y="92" width="26" height="45" rx="2" fill="#76B900"/><rect x="297" y="94" width="30" height="43" rx="2" fill="#d97706"/><rect x="332" y="92" width="30" height="45" rx="2" fill="#76B900"/>
            {/* Books row 3 */}
            <rect x="60" y="147" width="30" height="45" rx="2" fill="#76B900"/><rect x="95" y="150" width="28" height="42" rx="2" fill="#0891b2"/><rect x="128" y="147" width="32" height="45" rx="2" fill="#d97706"/><rect x="165" y="149" width="26" height="43" rx="2" fill="#76B900"/><rect x="196" y="147" width="30" height="45" rx="2" fill="#dc2626"/><rect x="231" y="150" width="28" height="42" rx="2" fill="#0891b2"/><rect x="264" y="147" width="32" height="45" rx="2" fill="#76B900"/><rect x="301" y="149" width="26" height="43" rx="2" fill="#d97706"/><rect x="332" y="147" width="30" height="45" rx="2" fill="#76B900"/>
            {/* Labels */}
            <text x="220" y="230" textAnchor="middle" fontSize="16" fontWeight="700" fill="#76B900">cuDNN / TensorRT / NCCL / Thrust ...</text>
            {/* VS */}
            <text x="450" y="130" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a1d23">vs</text>
            {/* ROCm side: sparse bookshelf */}
            <text x="680" y="24" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">ROCm ＝ エスペラント語</text>
            <rect x="500" y="35" width="360" height="180" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            {/* Shelves */}
            <line x1="515" y1="85" x2="845" y2="85" stroke="#dc2626" strokeWidth="2"/>
            <line x1="515" y1="140" x2="845" y2="140" stroke="#dc2626" strokeWidth="2"/>
            <line x1="515" y1="195" x2="845" y2="195" stroke="#dc2626" strokeWidth="2"/>
            {/* Sparse books row 1 */}
            <rect x="520" y="50" width="28" height="33" rx="2" fill="#dc2626"/><rect x="560" y="47" width="30" height="36" rx="2" fill="#dc2626" opacity="0.6"/>
            {/* Sparse books row 2 */}
            <rect x="520" y="97" width="32" height="40" rx="2" fill="#dc2626" opacity="0.6"/>
            {/* Empty otherwise */}
            <text x="680" y="175" textAnchor="middle" fontSize="20" fill="#dc2626" opacity="0.5">（ほとんど空...）</text>
            <text x="680" y="230" textAnchor="middle" fontSize="16" fontWeight="700" fill="#dc2626">ライブラリ数・成熟度で大差</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">移行コストは<span className="accent-coral">足し算ではなく掛け算</span></div>
        <svg viewBox="0 0 800 230" className="svg-container" width="800" height="230">
            {/* Layer 1 */}
            <rect x="50" y="10" width="200" height="60" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="150" y="46" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">コード書き換え</text>
            {/* Multiply sign */}
            <text x="300" y="50" textAnchor="middle" fontSize="36" fontWeight="900" fill="#dc2626">x</text>
            {/* Layer 2 */}
            <rect x="350" y="10" width="200" height="60" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="450" y="46" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">ライブラリ移行</text>
            {/* Multiply sign */}
            <text x="600" y="50" textAnchor="middle" fontSize="36" fontWeight="900" fill="#dc2626">x</text>
            {/* Layer 3 */}
            <rect x="640" y="10" width="140" height="60" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
            <text x="710" y="40" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0891b2">マルチGPU</text>
            <text x="710" y="60" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0891b2">再設計</text>
            {/* Result arrow */}
            <path d="M400 85 L400 110" stroke="#dc2626" strokeWidth="3" marker-end="url(#arrowRed)"/>
            <defs><marker id="arrowRed" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#dc2626"/></marker></defs>
            {/* Lock icon */}
            <rect x="330" y="120" width="140" height="90" rx="10" fill="#dc2626"/>
            <rect x="370" y="100" width="60" height="40" rx="20" fill="none" stroke="#dc2626" strokeWidth="5"/>
            <circle cx="400" cy="160" r="8" fill="#fff"/>
            <rect x="396" y="160" width="8" height="18" rx="2" fill="#fff"/>
            <text x="400" y="195" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">LOCK-IN</text>
        </svg>
        <div className="big-statement">一つ変えると<span className="accent-coral">全てが連鎖的に壊れる</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">もはや<span className="accent-primary">産業インフラ</span></div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderColor: 'var(--primary)' } as React.CSSProperties}>
                <div className="metric-value accent-primary">~92%</div>
                <div className="metric-label">CUDAフレームワーク<br />市場シェア</div>
            </div>
        </div>
        <div className="big-statement">ハードウェアが<span className="accent-primary">+20%</span>優れていても<br />エコシステムが<span className="accent-coral">-20%</span>では勝てない</div>
        <div className="source">出典: SemiAnalysis / MLPerf 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">巨大テック企業の<span className="accent-teal">反撃</span></div>
        <div className="enterprise-grid">
            <div className="enterprise-card" style={{ borderColor: 'var(--teal)' } as React.CSSProperties}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" width="40" height="40" alt="Google" style={{ display: 'block', margin: '0 auto 8px' } as React.CSSProperties} />
                <div className="card-title accent-teal">Google TPU v6e</div>
                <div className="card-desc">コスト効率<br /><span style={{ fontWeight: '900', fontSize: '24px', color: 'var(--teal)' } as React.CSSProperties}>4.7倍</span></div>
            </div>
            <div className="enterprise-card" style={{ borderColor: 'var(--amber)' } as React.CSSProperties}>
                <img src="https://api.iconify.design/mdi/aws.svg?color=%23d97706&width=40&height=40" width="40" height="40" alt="AWS" style={{ display: 'block', margin: '0 auto 8px' } as React.CSSProperties} />
                <div className="card-title accent-amber">AWS Trainium2</div>
                <div className="card-desc">H100比コスト<br /><span style={{ fontWeight: '900', fontSize: '24px', color: 'var(--amber)' } as React.CSSProperties}>約25%</span></div>
            </div>
            <div className="enterprise-card" style={{ borderColor: 'var(--coral)' } as React.CSSProperties}>
                <img src="https://api.iconify.design/logos/meta-icon.svg?width=40&height=40" width="40" height="40" alt="Meta" style={{ display: 'block', margin: '0 auto 8px' } as React.CSSProperties} />
                <div className="card-title accent-coral">Meta MTIA</div>
                <div className="card-desc">推論特化<br /><span style={{ fontWeight: '900', fontSize: '24px', color: 'var(--coral)' } as React.CSSProperties}>自社設計</span></div>
            </div>
        </div>
        <div className="big-statement">「<span className="accent-teal">自前で作ったほうが安い</span>」という反乱</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">抽象化レイヤーという<span className="accent-teal">武器</span></div>
        <svg viewBox="0 0 860 230" className="svg-container" width="860" height="230">
            {/* Top layer: Application */}
            <rect x="180" y="5" width="500" height="50" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
            <text x="430" y="37" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0891b2">PyTorch / vLLM / DeepSpeed</text>
            {/* Arrow down */}
            <path d="M430 55 L430 75" stroke="#1a1d23" strokeWidth="2"/>
            {/* Middle layer: Abstraction */}
            <rect x="130" y="75" width="600" height="55" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="3"/>
            <text x="430" y="108" textAnchor="middle" fontSize="22" fontWeight="900" fill="#d97706">Triton (OpenAI) / Mojo (Modular)</text>
            {/* Arrows down */}
            <path d="M250 130 L250 155" stroke="#1a1d23" strokeWidth="2"/>
            <path d="M430 130 L430 155" stroke="#1a1d23" strokeWidth="2"/>
            <path d="M610 130 L610 155" stroke="#1a1d23" strokeWidth="2"/>
            {/* Bottom layer: Hardware */}
            <rect x="100" y="155" width="200" height="55" rx="10" fill="#e8f5d0" stroke="#76B900" strokeWidth="2"/>
            <text x="200" y="188" textAnchor="middle" fontSize="18" fontWeight="900" fill="#76B900">NVIDIA GPU</text>
            <rect x="330" y="155" width="200" height="55" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="430" y="188" textAnchor="middle" fontSize="18" fontWeight="900" fill="#dc2626">AMD GPU</text>
            <rect x="560" y="155" width="200" height="55" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
            <text x="660" y="188" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0891b2">Google TPU</text>
            {/* Key message */}
            <text x="430" y="228" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">CUDAロックインを迂回する抽象化層</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">推論という<span className="accent-teal">突破口</span></div>
        <div className="two-col">
            <div className="compare-card" style={{ borderColor: 'var(--primary)' } as React.CSSProperties}>
                <div className="card-title accent-primary">学習（Training）</div>
                <div className="card-desc" style={{ textAlign: 'left' } as React.CSSProperties}>
                    巨大モデルの訓練<br />
                    <span style={{ fontWeight: '900', color: 'var(--primary)' } as React.CSSProperties}>NVIDIA独壇場</span><br />
                    CUDA依存が最も深い
                </div>
            </div>
            <div className="compare-card" style={{ borderColor: 'var(--teal)' } as React.CSSProperties}>
                <div className="card-title accent-teal">推論（Inference）</div>
                <div className="card-desc" style={{ textAlign: 'left' } as React.CSSProperties}>
                    学習済みモデルの実行<br />
                    <span style={{ fontWeight: '900', color: 'var(--teal)' } as React.CSSProperties}>競合チップの好機</span><br />
                    カスタムチップシェア: 37%
                </div>
            </div>
        </div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">2020年</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '15%', background: 'var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-val">$10B</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">2025年</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '95%', background: 'var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-val">$130B+</div>
            </div>
        </div>
        <div className="source">出典: Omdia / Bloomberg Intelligence 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">CUDAが握る<span className="accent-primary">3つの首根っこ</span></div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-title accent-primary">人の層</div>
                <div className="card-desc">450万人の開発者<br />数千のライブラリ</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--teal)' } as React.CSSProperties}>2</div>
                <div className="num-title accent-teal">コードの層</div>
                <div className="card-desc">PyTorch・TensorFlowに<br />深く組み込み</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--amber)' } as React.CSSProperties}>3</div>
                <div className="num-title accent-amber">慣れの層</div>
                <div className="card-desc">20年の蓄積<br />「CUDAでいいや」の慣性</div>
            </div>
        </div>
        <div className="big-statement">技術ではなく<span className="accent-primary">エコシステム</span>が最大の壁</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nvidia.svg" width="80" height="80" alt="NVIDIA" />
        <svg viewBox="0 0 700 120" className="svg-container" width="700" height="120">
            {/* Revenue transformation arrow */}
            <rect x="30" y="20" width="200" height="70" rx="10" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
            <text x="130" y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">ゲーミング企業</text>
            <text x="130" y="75" textAnchor="middle" fontSize="16" fill="#1a1d23">旧NVIDIAの姿</text>
            <path d="M240 55 L310 55" stroke="#76B900" strokeWidth="4" marker-end="url(#arrowGreen)"/>
            <defs><marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#76B900"/></marker></defs>
            <rect x="320" y="20" width="250" height="70" rx="10" fill="#e8f5d0" stroke="#76B900" strokeWidth="3"/>
            <text x="445" y="50" textAnchor="middle" fontSize="18" fontWeight="900" fill="#76B900">データセンター 88%</text>
            <text x="445" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#76B900">AI時代の最重要企業</text>
        </svg>
        <div className="big-statement">CUDAという<span className="accent-primary">見えない鎖</span>と<br /><span className="accent-teal">自由を求める力</span>の綱引きは続く</div>
        <div className="source">出典: NVIDIA FY2025 Annual Report</div>
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
};

export const TOTAL_SCENE_COUNT = 18;
