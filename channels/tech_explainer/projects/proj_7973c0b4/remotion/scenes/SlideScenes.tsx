import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-deco">
            <img src="https://api.iconify.design/mdi/usb.svg?color=%230891b2&width=72&height=72" alt="USB" />
        </div>
        <div className="title-large">充電ケーブルは<br />なぜすぐ壊れるのか</div>
        <div className="title-sub">物理法則 × デザイン × 急速充電のトレードオフ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">身近な消耗品の実態</div>
        <div className="metric-row">
            <div className="metric-card border-primary">
                <div className="metric-value accent-primary">約2年</div>
                <div className="metric-label">一般的なケーブル寿命</div>
            </div>
            <div className="metric-card border-amber">
                <div className="metric-value accent-amber">1,149億円</div>
                <div className="metric-label">バッテリー関連市場規模</div>
            </div>
        </div>
        <div className="source">出典: MM総研 スマートフォン関連市場調査</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">ケーブルの断面構造</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* 外被 (outermost) */}
                <ellipse cx="200" cy="120" rx="110" ry="110" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                <text x="200" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">外被（ゴム・ナイロン）</text>
                {/* 編組シールド */}
                <ellipse cx="200" cy="120" rx="82" ry="82" fill="#cbd5e1" stroke="#64748b" strokeWidth="2"/>
                <text x="200" y="58" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">編組シールド</text>
                {/* アルミ箔シールド */}
                <ellipse cx="200" cy="120" rx="58" ry="58" fill="#bae6fd" stroke="#0891b2" strokeWidth="2"/>
                {/* 絶縁＋銅導体 bundle */}
                <circle cx="175" cy="100" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <circle cx="175" cy="100" r="8" fill="#ea580c"/>
                <circle cx="225" cy="100" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <circle cx="225" cy="100" r="8" fill="#ea580c"/>
                <circle cx="175" cy="140" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <circle cx="175" cy="140" r="8" fill="#ea580c"/>
                <circle cx="225" cy="140" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <circle cx="225" cy="140" r="8" fill="#ea580c"/>
                {/* Labels right side */}
                <line x1="340" y1="120" x2="430" y2="30" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="440" y="34" fontSize="20" fontWeight="700" fill="#1a1d23">外被</text>
                <line x1="300" y1="120" x2="430" y2="70" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="440" y="74" fontSize="20" fontWeight="700" fill="#1a1d23">編組シールド</text>
                <line x1="270" y1="120" x2="430" y2="110" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="440" y="114" fontSize="20" fontWeight="700" fill="#0891b2">アルミ箔シールド</text>
                <line x1="243" y1="100" x2="430" y2="150" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="440" y="154" fontSize="20" fontWeight="700" fill="#d97706">絶縁被覆</text>
                <line x1="233" y1="100" x2="430" y2="190" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="440" y="194" fontSize="20" fontWeight="700" fill="#ea580c">銅導体</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">USB-Cコネクタの内部</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 230" width="780" height="230">
                {/* USB-C connector shape */}
                <rect x="190" y="30" width="400" height="80" rx="40" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="3"/>
                <rect x="220" y="45" width="340" height="50" rx="25" fill="#ffffff" stroke="#0891b2" strokeWidth="2"/>
                {/* 24 pins - top row */}
                <g fill="#ea580c">
                    <rect x="240" y="52" width="14" height="16" rx="2"/>
                    <rect x="262" y="52" width="14" height="16" rx="2"/>
                    <rect x="284" y="52" width="14" height="16" rx="2"/>
                    <rect x="306" y="52" width="14" height="16" rx="2"/>
                    <rect x="328" y="52" width="14" height="16" rx="2"/>
                    <rect x="350" y="52" width="14" height="16" rx="2"/>
                    <rect x="372" y="52" width="14" height="16" rx="2"/>
                    <rect x="394" y="52" width="14" height="16" rx="2"/>
                    <rect x="416" y="52" width="14" height="16" rx="2"/>
                    <rect x="438" y="52" width="14" height="16" rx="2"/>
                    <rect x="460" y="52" width="14" height="16" rx="2"/>
                    <rect x="482" y="52" width="14" height="16" rx="2"/>
                </g>
                {/* 24 pins - bottom row */}
                <g fill="#0891b2">
                    <rect x="240" y="74" width="14" height="16" rx="2"/>
                    <rect x="262" y="74" width="14" height="16" rx="2"/>
                    <rect x="284" y="74" width="14" height="16" rx="2"/>
                    <rect x="306" y="74" width="14" height="16" rx="2"/>
                    <rect x="328" y="74" width="14" height="16" rx="2"/>
                    <rect x="350" y="74" width="14" height="16" rx="2"/>
                    <rect x="372" y="74" width="14" height="16" rx="2"/>
                    <rect x="394" y="74" width="14" height="16" rx="2"/>
                    <rect x="416" y="74" width="14" height="16" rx="2"/>
                    <rect x="438" y="74" width="14" height="16" rx="2"/>
                    <rect x="460" y="74" width="14" height="16" rx="2"/>
                    <rect x="482" y="74" width="14" height="16" rx="2"/>
                </g>
                {/* Label */}
                <text x="390" y="140" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1a1d23">24ピン（上12 + 下12）</text>
                {/* Signal lines count */}
                <rect x="140" y="165" width="200" height="50" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="2"/>
                <text x="240" y="196" textAnchor="middle" fontSize="20" fontWeight="700" fill="#ea580c">電力供給</text>
                <rect x="370" y="165" width="200" height="50" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
                <text x="470" y="196" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0891b2">データ転送</text>
                <rect x="140" y="165" width="500" height="50" rx="10" fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4"/>
                {/* Right side info */}
                <text x="680" y="185" textAnchor="middle" fontSize="28" fontWeight="900" fill="#ea580c">最大16本</text>
                <text x="680" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">の信号線</text>
            </svg>
        </div>
        <div className="source">出典: USB-IF仕様 / All About Circuits</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">ゼムクリップで体験する「曲げ疲労」</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Stage 1: Normal clip */}
                <g>
                    <path d="M80 60 L80 160 Q80 180 100 180 L160 180 Q180 180 180 160 L180 80 Q180 60 160 60 L120 60 Q100 60 100 80 L100 150" fill="none" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round"/>
                    <text x="130" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">新品</text>
                </g>
                {/* Arrow */}
                <text x="240" y="120" textAnchor="middle" fontSize="28" fill="#ea580c">→</text>
                {/* Stage 2: Being bent */}
                <g>
                    <path d="M280 60 L280 120 Q285 140 300 150 L310 155 Q320 160 320 170 L320 180 Q320 190 340 180 L380 160 Q390 155 390 140 L390 80 Q390 60 370 60 L340 60 Q320 60 320 80 L320 130" fill="none" stroke="#d97706" strokeWidth="5" strokeLinecap="round"/>
                    <text x="340" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">曲げ中</text>
                    {/* Bend arrows */}
                    <path d="M295 105 Q270 120 295 135" fill="none" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <path d="M305 135 Q330 120 305 105" fill="none" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                </g>
                {/* Arrow */}
                <text x="450" y="120" textAnchor="middle" fontSize="28" fill="#ea580c">→</text>
                {/* Stage 3: Hardened */}
                <g>
                    <path d="M490 60 L490 130 Q490 140 500 145" fill="none" stroke="#ea580c" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M510 150 L560 180 Q580 190 580 170 L580 80 Q580 60 560 60 L530 60 Q510 60 510 80 L510 130" fill="none" stroke="#ea580c" strokeWidth="5" strokeLinecap="round"/>
                    {/* Crack mark */}
                    <path d="M498 142 L504 148 L502 145 L508 151" fill="none" stroke="#dc2626" strokeWidth="3"/>
                    <text x="540" y="210" textAnchor="middle" fontSize="18" fontWeight="900" fill="#dc2626">断裂！</text>
                </g>
                {/* Bottom label */}
                <text x="660" y="90" textAnchor="start" fontSize="20" fontWeight="700" fill="#1a1d23">加工硬化で</text>
                <text x="660" y="115" textAnchor="start" fontSize="20" fontWeight="700" fill="#1a1d23">脆くなり</text>
                <text x="660" y="140" textAnchor="start" fontSize="20" fontWeight="900" fill="#dc2626">突然折れる</text>
                <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <path d="M0 0 L8 3 L0 6" fill="#ea580c"/>
                    </marker>
                </defs>
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
        <div className="scene-title">なぜ「硬くなる」と「脆くなる」のか</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Stage 1: Aligned crystals */}
                <g>
                    <rect x="40" y="10" width="200" height="140" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
                    <text x="140" y="170" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0891b2">正常な結晶構造</text>
                    {/* Grid of circles - aligned */}
                    <g fill="#0891b2">
                        <circle cx="75" cy="40" r="10"/><circle cx="105" cy="40" r="10"/><circle cx="135" cy="40" r="10"/><circle cx="165" cy="40" r="10"/><circle cx="195" cy="40" r="10"/>
                        <circle cx="75" cy="70" r="10"/><circle cx="105" cy="70" r="10"/><circle cx="135" cy="70" r="10"/><circle cx="165" cy="70" r="10"/><circle cx="195" cy="70" r="10"/>
                        <circle cx="75" cy="100" r="10"/><circle cx="105" cy="100" r="10"/><circle cx="135" cy="100" r="10"/><circle cx="165" cy="100" r="10"/><circle cx="195" cy="100" r="10"/>
                        <circle cx="75" cy="130" r="10"/><circle cx="105" cy="130" r="10"/><circle cx="135" cy="130" r="10"/><circle cx="165" cy="130" r="10"/><circle cx="195" cy="130" r="10"/>
                    </g>
                    <text x="140" y="195" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">柔らかく曲がる</text>
                </g>
                {/* Arrow */}
                <text x="290" y="85" textAnchor="middle" fontSize="28" fill="#ea580c">→</text>
                {/* Stage 2: Displaced crystals */}
                <g>
                    <rect x="330" y="10" width="200" height="140" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="2"/>
                    <text x="430" y="170" textAnchor="middle" fontSize="18" fontWeight="900" fill="#d97706">ズレが蓄積</text>
                    <g fill="#d97706">
                        <circle cx="365" cy="40" r="10"/><circle cx="395" cy="40" r="10"/><circle cx="425" cy="40" r="10"/><circle cx="455" cy="40" r="10"/><circle cx="485" cy="40" r="10"/>
                        <circle cx="372" cy="70" r="10"/><circle cx="402" cy="70" r="10"/><circle cx="432" cy="70" r="10"/><circle cx="462" cy="70" r="10"/><circle cx="492" cy="70" r="10"/>
                        <circle cx="365" cy="100" r="10"/><circle cx="395" cy="100" r="10"/><circle cx="425" cy="100" r="10"/><circle cx="455" cy="100" r="10"/><circle cx="485" cy="100" r="10"/>
                        <circle cx="372" cy="130" r="10"/><circle cx="402" cy="130" r="10"/><circle cx="432" cy="130" r="10"/><circle cx="462" cy="130" r="10"/><circle cx="492" cy="130" r="10"/>
                    </g>
                    <text x="430" y="195" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">硬く脆くなる</text>
                </g>
                {/* Arrow */}
                <text x="580" y="85" textAnchor="middle" fontSize="28" fill="#dc2626">→</text>
                {/* Stage 3: Cracked */}
                <g>
                    <rect x="620" y="10" width="140" height="140" rx="8" fill="#ffffff" stroke="#dc2626" strokeWidth="2"/>
                    <text x="690" y="170" textAnchor="middle" fontSize="18" fontWeight="900" fill="#dc2626">亀裂発生</text>
                    <g fill="#dc2626">
                        <circle cx="650" cy="40" r="10"/><circle cx="680" cy="40" r="10"/><circle cx="715" cy="40" r="10"/><circle cx="745" cy="40" r="10"/>
                        <circle cx="656" cy="70" r="10"/><circle cx="686" cy="70" r="10"/>
                        <circle cx="650" cy="100" r="10"/><circle cx="680" cy="100" r="10"/><circle cx="718" cy="100" r="10"/><circle cx="748" cy="100" r="10"/>
                        <circle cx="653" cy="130" r="10"/><circle cx="683" cy="130" r="10"/><circle cx="720" cy="130" r="10"/><circle cx="750" cy="130" r="10"/>
                    </g>
                    {/* Crack line */}
                    <line x1="698" y1="55" x2="698" y2="135" stroke="#dc2626" strokeWidth="4" strokeDasharray="8,4"/>
                    <text x="690" y="195" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">突然折れる</text>
                </g>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">故障の90%はここで起きる</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 230" width="780" height="230">
                {/* Smartphone body */}
                <rect x="50" y="30" width="160" height="200" rx="16" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                <rect x="65" y="50" width="130" height="150" rx="4" fill="#ffffff"/>
                <circle cx="130" cy="215" r="8" fill="#9ca3af"/>
                {/* Cable coming out of phone bottom */}
                <rect x="115" y="228" width="30" height="25" rx="3" fill="#9ca3af"/>
                {/* Stress concentration zone (highlighted) */}
                <rect x="100" y="248" width="60" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" strokeDasharray="6"/>
                <text x="200" y="268" fontSize="20" fontWeight="900" fill="#dc2626">← 応力集中ゾーン</text>
                {/* Cable */}
                <path d="M130 278 Q130 300 180 330 Q260 375 350 380 Q500 388 600 360" fill="none" stroke="#ea580c" strokeWidth="8" strokeLinecap="round"/>
                {/* Force arrows at the bend */}
                <g>
                    <line x1="130" y1="290" x2="100" y2="320" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowRed)"/>
                    <line x1="145" y1="285" x2="175" y2="310" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowRed)"/>
                </g>
                {/* 90% label */}
                <rect x="430" y="50" width="300" height="100" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="580" y="92" textAnchor="middle" fontSize="48" fontWeight="900" fill="#dc2626">90%</text>
                <text x="580" y="130" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">の故障がコネクタ根元</text>
                {/* Usage scenario label */}
                <text x="580" y="200" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">最大の原因：</text>
                <text x="580" y="230" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ea580c">充電しながらスマホ操作</text>
                <defs>
                    <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <path d="M0 0 L8 3 L0 6" fill="#dc2626"/>
                    </marker>
                </defs>
            </svg>
        </div>
        <div className="source">出典: Epec / imfish</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">価格が高い＝丈夫？</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <img src="https://api.iconify.design/simple-icons/amazon.svg?color=%23ff9900&width=72&height=72" alt="Amazon" />
                <div className="compare-title accent-teal">Amazon Basics</div>
                <div className="compare-body">USB-Cケーブル<br />$6.55（約1,000円）</div>
            </div>
            <div className="compare-card border-coral">
                <img src="https://api.iconify.design/simple-icons/samsung.svg?color=%231428a0&width=72&height=72" alt="Samsung" />
                <div className="compare-title accent-coral">Samsung</div>
                <div className="compare-body">USB-Cケーブル<br />$14.99（約2,300円）</div>
            </div>
        </div>
        <div className="source">出典: Consumer Reports 屈曲テスト</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">Consumer Reports 屈曲テスト結果</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">Amazon Basics<br />（$6.55）</div>
                <div className="bar-track">
                    <div className="bar-fill bar-fill-teal" style={{ '--w': '95%' } as React.CSSProperties}></div>
                </div>
                <div className="bar-value accent-teal">11,500回+</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">Samsung<br />（$14.99）</div>
                <div className="bar-track">
                    <div className="bar-fill bar-fill-coral" style={{ '--w': '8%' } as React.CSSProperties}></div>
                </div>
                <div className="bar-value accent-coral">925回</div>
            </div>
        </div>
        <div className="source">出典: Consumer Reports USB-C Cable Flex Test</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">寿命を決める「ストレインリリーフ」</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 260" width="780" height="260">
                {/* ========== Bad design (left) ========== */}
                <text x="170" y="22" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">ストレインリリーフなし</text>
                <circle cx="285" cy="16" r="14" fill="#dc2626"/>
                <line x1="278" y1="9" x2="292" y2="23" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                <line x1="292" y1="9" x2="278" y2="23" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>

                {/* USB plug housing */}
                <rect x="140" y="36" width="60" height="44" rx="4" fill="#b0b0b0" stroke="#888" strokeWidth="1.5"/>
                <rect x="148" y="42" width="44" height="32" rx="2" fill="#d4d4d4"/>
                {/* Metal contacts inside plug */}
                <rect x="156" y="50" width="28" height="4" rx="1" fill="#fbbf24"/>
                <rect x="156" y="58" width="28" height="4" rx="1" fill="#fbbf24"/>
                {/* Cable exits directly from plug — no boot */}
                <path d="M170 80 L170 90 Q170 105 180 120 Q200 155 250 175 Q290 190 320 192" fill="none" stroke="#6b7280" strokeWidth="10" strokeLinecap="round"/>
                <path d="M170 80 L170 90 Q170 105 180 120 Q200 155 250 175 Q290 190 320 192" fill="none" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round"/>
                {/* Stress crack at exit point */}
                <path d="M160 82 L153 74 M180 82 L187 74" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M158 88 L148 85 M182 88 L192 85" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                {/* Crack lines on jacket */}
                <path d="M174 96 L180 92 M166 100 L160 96" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                {/* Danger callout */}
                <line x1="170" y1="105" x2="115" y2="135" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3"/>
                <text x="60" y="142" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">応力集中</text>

                <text x="170" y="245" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">急激な曲がり → 断線</text>

                {/* ========== Good design (right) ========== */}
                <text x="570" y="22" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0891b2">ストレインリリーフあり</text>
                <circle cx="685" cy="16" r="14" fill="#0891b2"/>
                <path d="M678 16 L683 21 L693 11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

                {/* USB plug housing */}
                <rect x="540" y="36" width="60" height="44" rx="4" fill="#b0b0b0" stroke="#888" strokeWidth="1.5"/>
                <rect x="548" y="42" width="44" height="32" rx="2" fill="#d4d4d4"/>
                {/* Metal contacts */}
                <rect x="556" y="50" width="28" height="4" rx="1" fill="#fbbf24"/>
                <rect x="556" y="58" width="28" height="4" rx="1" fill="#fbbf24"/>

                {/* Strain relief boot — tapered cone with ridges */}
                <path d="M544 80 Q544 88 542 96 Q538 112 540 128 Q542 140 555 148
                         L585 148
                         Q598 140 600 128 Q602 112 598 96 Q596 88 596 80 Z"
                      fill="#cffafe" opacity="0.7"/>
                <path d="M544 80 Q544 88 542 96 Q538 112 540 128 Q542 140 555 148 L555 148
                         M596 80 Q596 88 598 96 Q602 112 600 128 Q598 140 585 148 L585 148"
                      fill="none" stroke="#0891b2" strokeWidth="2"/>
                {/* Ridged rings on the boot */}
                <ellipse cx="570" cy="88" rx="25" ry="4" fill="none" stroke="#0891b2" strokeWidth="1.5" opacity="0.6"/>
                <ellipse cx="570" cy="100" rx="23" ry="3.5" fill="none" stroke="#0891b2" strokeWidth="1.5" opacity="0.55"/>
                <ellipse cx="570" cy="111" rx="21" ry="3" fill="none" stroke="#0891b2" strokeWidth="1.5" opacity="0.5"/>
                <ellipse cx="570" cy="121" rx="18" ry="2.5" fill="none" stroke="#0891b2" strokeWidth="1.4" opacity="0.45"/>
                <ellipse cx="570" cy="130" rx="15" ry="2" fill="none" stroke="#0891b2" strokeWidth="1.3" opacity="0.4"/>
                <ellipse cx="570" cy="138" rx="12" ry="1.8" fill="none" stroke="#0891b2" strokeWidth="1.2" opacity="0.35"/>

                {/* Cable exits gently from boot */}
                <path d="M570 148 Q570 165 585 180 Q610 205 660 218 Q700 228 730 230" fill="none" stroke="#6b7280" strokeWidth="10" strokeLinecap="round"/>
                <path d="M570 148 Q570 165 585 180 Q610 205 660 218 Q700 228 730 230" fill="none" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round"/>

                {/* Force distribution arrows */}
                <defs>
                    <marker id="arrowTeal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0 0 L6 3 L0 6" fill="none" stroke="#0891b2" strokeWidth="1.2"/>
                    </marker>
                </defs>
                <path d="M530 108 L520 100" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowTeal)"/>
                <path d="M530 124 L518 120" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowTeal)"/>
                <path d="M610 108 L620 100" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowTeal)"/>
                <path d="M610 124 L622 120" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowTeal)"/>
                <text x="480" y="116" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0891b2">力を分散</text>

                <text x="570" y="245" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0891b2">ゆるやかに分散 → 長寿命</text>
            </svg>
        </div>
        <div className="source">曲げ半径 = ケーブル直径の8〜10倍が設計基準（出典: Gore / Fictiv）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">Appleが辿ったトレードオフ</div>
        <div className="flow-chain">
            <div className="fc-node highlight-teal">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" alt="Apple" />
                <div className="fc-node-title">初期Lightning</div>
                <div className="fc-node-sub">しっかりした<br />ストレインリリーフ</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight-amber">
                <div className="fc-node-title">デザイン優先</div>
                <div className="fc-node-sub">薄く短く<br />美しく</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight-amber">
                <div className="fc-node-title">PVC廃止</div>
                <div className="fc-node-sub">環境対応で<br />ゴム素材へ</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight-coral">
                <div className="fc-node-title">壊れやすく</div>
                <div className="fc-node-sub">摩耗・紫外線に<br />弱い素材</div>
            </div>
        </div>
        <div className="source">出典: GIGAZINE / Core77</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">急速充電がケーブルに与える負荷</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Cable cross-section with heat */}
                <rect x="100" y="50" width="300" height="120" rx="60" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                {/* Inner conductors */}
                <circle cx="180" cy="110" r="20" fill="#ea580c"/>
                <circle cx="250" cy="110" r="20" fill="#ea580c"/>
                <circle cx="320" cy="110" r="20" fill="#ea580c"/>
                {/* Heat waves */}
                <path d="M165 70 Q155 55 165 40" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M180 65 Q170 50 180 35" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M195 70 Q185 55 195 40" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M235 70 Q225 55 235 40" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M250 65 Q240 50 250 35" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M265 70 Q255 55 265 40" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M305 70 Q295 55 305 40" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M320 65 Q310 50 320 35" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                <path d="M335 70 Q325 55 335 40" fill="none" stroke="#dc2626" strokeWidth="2.5"/>
                {/* Label */}
                <text x="250" y="200" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">大電流による発熱</text>
                {/* Power specs */}
                <rect x="480" y="30" width="260" height="80" rx="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="2"/>
                <text x="610" y="62" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ea580c">USB PD: 最大240W</text>
                <text x="610" y="92" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">48V × 5A</text>
                {/* Effect chain */}
                <text x="610" y="140" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">大電流 → 発熱</text>
                <text x="610" y="165" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">→ 被覆劣化</text>
                <text x="610" y="190" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">→ 曲げ疲労が加速</text>
            </svg>
        </div>
        <div className="source">出典: USB-IF USB PD Specification Rev 3.1</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">有線 vs 無線充電</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <img src="https://api.iconify.design/mdi/usb.svg?color=%230891b2&width=72&height=72" alt="USB" />
                <div className="compare-title accent-teal">有線充電</div>
                <div className="compare-body">バッテリー温度: 30℃<br />劣化率: 5.1%（2ヶ月）<br />エネルギー効率: 高い</div>
            </div>
            <div className="compare-card border-coral">
                <img src="https://api.iconify.design/mdi/cellphone-wireless.svg?color=%23dc2626&width=72&height=72" alt="Wireless" />
                <div className="compare-title accent-coral">無線充電（MagSafe）</div>
                <div className="compare-body">バッテリー温度: 40℃<br />劣化率: 8.3%（2ヶ月）<br />エネルギー消費: +24〜114%</div>
            </div>
        </div>
        <div className="source">出典: iFixit「Wireless vs. Wired Charging」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">USB-C統一への道</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">規格乱立</div>
                <div className="fc-node-sub">Lightning<br />Micro-USB<br />独自端子</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <img src="https://flagicons.lipis.dev/flags/4x3/eu.svg" alt="EU" style={{ verticalAlign: 'middle' }} />
                <div className="fc-node-title">EU義務化</div>
                <div className="fc-node-sub">2024年12月<br />USB-C統一</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight-teal">
                <img src="https://api.iconify.design/mdi/usb.svg?color=%230891b2&width=72&height=72" alt="USB-C" />
                <div className="fc-node-title">USB-C時代</div>
                <div className="fc-node-sub">挿抜10,000回<br />e-waste削減</div>
            </div>
        </div>
        <div className="source">出典: 欧州議会 共通充電器指令（2022/2380）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">ケーブルが壊れる3つの理由</div>
        <div className="num-list">
            <div className="num-item border-primary">
                <div className="num-circle">1</div>
                <div className="num-text"><span className="accent-primary">曲げ疲労</span> — 銅導体が加工硬化で脆くなる物理現象</div>
            </div>
            <div className="num-item border-amber">
                <div className="num-circle num-circle-amber">2</div>
                <div className="num-text"><span className="accent-amber">デザインのトレードオフ</span> — 薄さ・美しさ・環境対応の代償</div>
            </div>
            <div className="num-item border-coral">
                <div className="num-circle num-circle-coral">3</div>
                <div className="num-text"><span className="accent-coral">急速充電の発熱</span> — 大電流が被覆劣化を加速させる</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="icon-deco">
            <img src="https://api.iconify.design/mdi/usb.svg?color=%230891b2&width=72&height=72" alt="USB" />
        </div>
        <div className="big-statement">大事なのは<span className="accent-primary">価格</span>じゃなくて<br />根元の<span className="accent-teal">「ぷくっ」</span>の設計</div>
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
};

export const TOTAL_SCENE_COUNT = 16;
