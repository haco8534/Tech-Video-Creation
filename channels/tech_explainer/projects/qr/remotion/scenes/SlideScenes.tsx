import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="svg-diagram">
            <svg viewBox="0 0 780 300" width="780" height="300">
                {/* QR code stylized structure */}
                <rect x="220" y="20" width="340" height="260" rx="12" fill="#fff" stroke="#1e40af" strokeWidth="3"/>
                {/* Finder patterns */}
                <rect x="240" y="40" width="70" height="70" rx="4" fill="#1a1d23"/>
                <rect x="248" y="48" width="54" height="54" rx="3" fill="#fff"/>
                <rect x="258" y="58" width="34" height="34" rx="2" fill="#1a1d23"/>
                <rect x="470" y="40" width="70" height="70" rx="4" fill="#1a1d23"/>
                <rect x="478" y="48" width="54" height="54" rx="3" fill="#fff"/>
                <rect x="488" y="58" width="34" height="34" rx="2" fill="#1a1d23"/>
                <rect x="240" y="190" width="70" height="70" rx="4" fill="#1a1d23"/>
                <rect x="248" y="198" width="54" height="54" rx="3" fill="#fff"/>
                <rect x="258" y="208" width="34" height="34" rx="2" fill="#1a1d23"/>
                {/* Data dots */}
                <rect x="335" y="45" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="355" y="45" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="395" y="45" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="335" y="65" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="375" y="65" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="415" y="65" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="345" y="85" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="385" y="85" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="345" y="130" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="365" y="130" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="405" y="130" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="425" y="150" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="335" y="150" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="375" y="170" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="415" y="170" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="335" y="200" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="375" y="200" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="395" y="220" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="445" y="200" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="465" y="220" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="485" y="200" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="505" y="180" width="12" height="12" fill="#1a1d23" rx="1"/>
                <rect x="505" y="220" width="12" height="12" fill="#1a1d23" rx="1"/>
            </svg>
        </div>
        <div className="title-large">QRコードはなぜあの模様で<br />読み取れるのか</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">QRコードの利用者数</div>
        <div className="metric-card">
            <div className="metric-value accent-primary">22<span style={{ fontSize: '48px' }}>億人+</span></div>
            <div className="metric-label">世界の日常的QRコード利用者</div>
            <div className="metric-sub">全スマホユーザーの約29%が日常利用</div>
        </div>
        <div className="source">出典: QR Code Chimp Statistics 2025</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">思考実験</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 260" width="780" height="260">
                {/* Left: damaged QR */}
                <text x="150" y="28" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">30%破損</text>
                <rect x="30" y="40" width="240" height="210" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="2"/>
                <rect x="48" y="58" width="50" height="50" rx="3" fill="#1a1d23"/>
                <rect x="54" y="64" width="38" height="38" rx="2" fill="#fff"/>
                <rect x="62" y="72" width="22" height="22" rx="1" fill="#1a1d23"/>
                <rect x="202" y="58" width="50" height="50" rx="3" fill="#1a1d23"/>
                <rect x="208" y="64" width="38" height="38" rx="2" fill="#fff"/>
                <rect x="216" y="72" width="22" height="22" rx="1" fill="#1a1d23"/>
                <rect x="48" y="182" width="50" height="50" rx="3" fill="#1a1d23"/>
                <rect x="54" y="188" width="38" height="38" rx="2" fill="#fff"/>
                <rect x="62" y="196" width="22" height="22" rx="1" fill="#1a1d23"/>
                {/* Damage overlay */}
                <rect x="90" y="100" width="120" height="100" rx="6" fill="#dc2626" opacity="0.7"/>
                <text x="150" y="158" textAnchor="middle" fontSize="28" fontWeight="900" fill="#fff">×</text>
                {/* Arrow */}
                <text x="340" y="165" textAnchor="middle" fontSize="40" fontWeight="900" fill="#0d9488">→</text>
                {/* Right: still readable */}
                <text x="550" y="28" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0d9488">読み取り成功！</text>
                <rect x="430" y="40" width="240" height="210" rx="8" fill="#fff" stroke="#0d9488" strokeWidth="2"/>
                <rect x="448" y="58" width="50" height="50" rx="3" fill="#1a1d23"/>
                <rect x="454" y="64" width="38" height="38" rx="2" fill="#fff"/>
                <rect x="462" y="72" width="22" height="22" rx="1" fill="#1a1d23"/>
                <rect x="602" y="58" width="50" height="50" rx="3" fill="#1a1d23"/>
                <rect x="608" y="64" width="38" height="38" rx="2" fill="#fff"/>
                <rect x="616" y="72" width="22" height="22" rx="1" fill="#1a1d23"/>
                <rect x="448" y="182" width="50" height="50" rx="3" fill="#1a1d23"/>
                <rect x="454" y="188" width="38" height="38" rx="2" fill="#fff"/>
                <rect x="462" y="196" width="22" height="22" rx="1" fill="#1a1d23"/>
                <text x="550" y="155" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">https://...</text>
            </svg>
        </div>
        <div className="big-statement"><span className="accent-primary">見つける</span> × <span className="accent-teal">直す</span> × <span className="accent-amber">読む</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">バーコード vs QRコード</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Barcode */}
                <text x="180" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1a1d23">1Dバーコード</text>
                <rect x="40" y="40" width="280" height="120" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="60" y="55" width="3" height="90" fill="#1a1d23"/>
                <rect x="68" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="76" y="55" width="4" height="90" fill="#1a1d23"/>
                <rect x="86" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="94" y="55" width="3" height="90" fill="#1a1d23"/>
                <rect x="104" y="55" width="5" height="90" fill="#1a1d23"/>
                <rect x="116" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="124" y="55" width="3" height="90" fill="#1a1d23"/>
                <rect x="134" y="55" width="4" height="90" fill="#1a1d23"/>
                <rect x="144" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="152" y="55" width="3" height="90" fill="#1a1d23"/>
                <rect x="162" y="55" width="5" height="90" fill="#1a1d23"/>
                <rect x="174" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="182" y="55" width="3" height="90" fill="#1a1d23"/>
                <rect x="192" y="55" width="4" height="90" fill="#1a1d23"/>
                <rect x="202" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="210" y="55" width="5" height="90" fill="#1a1d23"/>
                <rect x="222" y="55" width="3" height="90" fill="#1a1d23"/>
                <rect x="232" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="240" y="55" width="4" height="90" fill="#1a1d23"/>
                <rect x="252" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="260" y="55" width="3" height="90" fill="#1a1d23"/>
                <rect x="270" y="55" width="5" height="90" fill="#1a1d23"/>
                <rect x="282" y="55" width="2" height="90" fill="#1a1d23"/>
                <rect x="290" y="55" width="3" height="90" fill="#1a1d23"/>
                <text x="180" y="180" textAnchor="middle" fontSize="20" fontWeight="700" fill="#dc2626">最大20文字</text>
                <text x="180" y="208" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">一方向スキャン</text>
                {/* QR */}
                <text x="580" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1a1d23">2D QRコード</text>
                <rect x="480" y="40" width="200" height="120" rx="6" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                <rect x="494" y="54" width="36" height="36" rx="2" fill="#1a1d23"/>
                <rect x="498" y="58" width="28" height="28" rx="1" fill="#fff"/>
                <rect x="504" y="64" width="16" height="16" fill="#1a1d23"/>
                <rect x="630" y="54" width="36" height="36" rx="2" fill="#1a1d23"/>
                <rect x="634" y="58" width="28" height="28" rx="1" fill="#fff"/>
                <rect x="640" y="64" width="16" height="16" fill="#1a1d23"/>
                <rect x="494" y="110" width="36" height="36" rx="2" fill="#1a1d23"/>
                <rect x="498" y="114" width="28" height="28" rx="1" fill="#fff"/>
                <rect x="504" y="120" width="16" height="16" fill="#1a1d23"/>
                <rect x="545" y="58" width="8" height="8" fill="#1a1d23"/>
                <rect x="561" y="58" width="8" height="8" fill="#1a1d23"/>
                <rect x="553" y="74" width="8" height="8" fill="#1a1d23"/>
                <rect x="569" y="90" width="8" height="8" fill="#1a1d23"/>
                <rect x="545" y="106" width="8" height="8" fill="#1a1d23"/>
                <rect x="569" y="106" width="8" height="8" fill="#1a1d23"/>
                <rect x="553" y="122" width="8" height="8" fill="#1a1d23"/>
                <rect x="553" y="138" width="8" height="8" fill="#1a1d23"/>
                <rect x="637" y="106" width="8" height="8" fill="#1a1d23"/>
                <rect x="653" y="106" width="8" height="8" fill="#1a1d23"/>
                <rect x="645" y="122" width="8" height="8" fill="#1a1d23"/>
                <text x="580" y="180" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0d9488">最大7,089桁</text>
                <text x="580" y="208" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">360度 + 誤り訂正</text>
            </svg>
        </div>
        <div className="big-statement">情報量 <span className="accent-primary">約350倍</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">1次元 → 2次元</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* 1D bookshelf: single row */}
                <text x="180" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">棚1段の本棚</text>
                <rect x="40" y="40" width="280" height="70" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="55" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="80" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="105" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="130" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="155" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="180" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="205" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="230" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="255" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <rect x="280" y="50" width="18" height="50" rx="2" fill="#dbeafe"/>
                <text x="180" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">= バーコード（横一列）</text>
                {/* Arrow */}
                <text x="390" y="90" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1e40af">→</text>
                {/* 2D bookshelf: grid */}
                <text x="590" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">多段の本棚</text>
                <rect x="460" y="40" width="260" height="170" rx="6" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                <rect x="475" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="496" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="517" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="538" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="559" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="580" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="601" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="622" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="643" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="664" y="50" width="16" height="40" rx="2" fill="#dbeafe"/>
                <rect x="475" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="496" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="517" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="538" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="559" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="580" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="601" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="622" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="643" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="664" y="98" width="16" height="40" rx="2" fill="#ccfbf1"/>
                <rect x="475" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="496" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="517" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="538" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="559" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="580" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="601" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="622" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="643" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <rect x="664" y="146" width="16" height="40" rx="2" fill="#fef3c7"/>
                <text x="590" y="220" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">= QRコード（縦横に展開）</text>
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
        <div className="scene-title">QRコードの誕生</div>
        <div className="photo-text-row">
            <figure className="photo-frame">
                <img src={staticFile("images/masahiro_hara.jpg")} alt="原昌宏" />
            </figure>
            <div className="photo-text-side">
                <div className="quote-block">
                    <div className="quote-mark">"</div>
                    <div className="quote-body">昼休みに打っていた囲碁の<br />白と黒の石から着想を得た</div>
                    <div className="quote-source">原昌宏氏（1994年・デンソーウェーブ）</div>
                </div>
            </div>
        </div>
        <div className="source">出典: IEEE Spectrum 2020 / デンソーウェーブ公式</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">QRコードの構造</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 300" width="780" height="300">
                {/* QR code base */}
                <rect x="220" y="10" width="280" height="280" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
                {/* Finder patterns with labels */}
                <rect x="236" y="26" width="60" height="60" rx="3" fill="#1e40af"/>
                <rect x="242" y="32" width="48" height="48" rx="2" fill="#fff"/>
                <rect x="250" y="40" width="32" height="32" rx="1" fill="#1e40af"/>
                <rect x="424" y="26" width="60" height="60" rx="3" fill="#1e40af"/>
                <rect x="430" y="32" width="48" height="48" rx="2" fill="#fff"/>
                <rect x="438" y="40" width="32" height="32" rx="1" fill="#1e40af"/>
                <rect x="236" y="214" width="60" height="60" rx="3" fill="#1e40af"/>
                <rect x="242" y="220" width="48" height="48" rx="2" fill="#fff"/>
                <rect x="250" y="228" width="32" height="32" rx="1" fill="#1e40af"/>
                {/* Timing pattern */}
                <rect x="302" y="42" width="8" height="8" fill="#0d9488"/>
                <rect x="318" y="42" width="8" height="8" fill="#0d9488"/>
                <rect x="334" y="42" width="8" height="8" fill="#0d9488"/>
                <rect x="350" y="42" width="8" height="8" fill="#0d9488"/>
                <rect x="366" y="42" width="8" height="8" fill="#0d9488"/>
                <rect x="382" y="42" width="8" height="8" fill="#0d9488"/>
                <rect x="398" y="42" width="8" height="8" fill="#0d9488"/>
                <rect x="414" y="42" width="8" height="8" fill="#0d9488"/>
                {/* Vertical timing */}
                <rect x="250" y="92" width="8" height="8" fill="#0d9488"/>
                <rect x="250" y="108" width="8" height="8" fill="#0d9488"/>
                <rect x="250" y="124" width="8" height="8" fill="#0d9488"/>
                <rect x="250" y="140" width="8" height="8" fill="#0d9488"/>
                <rect x="250" y="156" width="8" height="8" fill="#0d9488"/>
                <rect x="250" y="172" width="8" height="8" fill="#0d9488"/>
                <rect x="250" y="188" width="8" height="8" fill="#0d9488"/>
                <rect x="250" y="204" width="8" height="8" fill="#0d9488"/>
                {/* Alignment pattern */}
                <rect x="434" y="218" width="22" height="22" rx="2" fill="#d97706"/>
                <rect x="438" y="222" width="14" height="14" rx="1" fill="#fff"/>
                <rect x="441" y="225" width="8" height="8" fill="#d97706"/>
                {/* Data area dots */}
                <rect x="320" y="100" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="340" y="110" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="360" y="100" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="380" y="120" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="400" y="110" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="320" y="140" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="360" y="140" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="400" y="140" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="340" y="160" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="380" y="160" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="320" y="180" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="360" y="180" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                <rect x="400" y="180" width="10" height="10" fill="#1a1d23" opacity="0.3"/>
                {/* Labels */}
                <line x1="170" y1="56" x2="232" y2="56" stroke="#1e40af" strokeWidth="2"/>
                <text x="40" y="52" fontSize="18" fontWeight="700" fill="#1e40af">ファインダー</text>
                <text x="40" y="72" fontSize="18" fontWeight="700" fill="#1e40af">パターン</text>
                <line x1="550" y1="46" x2="510" y2="46" stroke="#0d9488" strokeWidth="2"/>
                <text x="560" y="42" fontSize="18" fontWeight="700" fill="#0d9488">タイミング</text>
                <text x="560" y="62" fontSize="18" fontWeight="700" fill="#0d9488">パターン</text>
                <line x1="550" y1="230" x2="460" y2="230" stroke="#d97706" strokeWidth="2"/>
                <text x="560" y="226" fontSize="18" fontWeight="700" fill="#d97706">アライメント</text>
                <text x="560" y="246" fontSize="18" fontWeight="700" fill="#d97706">パターン</text>
                <text x="560" y="150" fontSize="18" fontWeight="700" fill="#1a1d23">データ +</text>
                <text x="560" y="170" fontSize="18" fontWeight="700" fill="#1a1d23">誤り訂正</text>
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
        <div className="scene-title">ファインダーパターンの役割</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* Camera view with QR code among other stuff */}
                <rect x="40" y="10" width="300" height="220" rx="8" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                <text x="52" y="40" fontSize="16" fontWeight="700" fill="#1a1d23">カメラの映像</text>
                {/* Random text/noise in background */}
                <text x="60" y="70" fontSize="14" fill="#9ca3af">Menu Price</text>
                <text x="60" y="90" fontSize="14" fill="#9ca3af">コーヒー ¥500</text>
                {/* Small QR code */}
                <rect x="120" y="110" width="100" height="100" rx="3" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                <rect x="128" y="118" width="24" height="24" rx="2" fill="#1e40af"/>
                <rect x="131" y="121" width="18" height="18" fill="#fff"/>
                <rect x="135" y="125" width="10" height="10" fill="#1e40af"/>
                <rect x="188" y="118" width="24" height="24" rx="2" fill="#1e40af"/>
                <rect x="191" y="121" width="18" height="18" fill="#fff"/>
                <rect x="195" y="125" width="10" height="10" fill="#1e40af"/>
                <rect x="128" y="178" width="24" height="24" rx="2" fill="#1e40af"/>
                <rect x="131" y="181" width="18" height="18" fill="#fff"/>
                <rect x="135" y="185" width="10" height="10" fill="#1e40af"/>
                <text x="240" y="180" fontSize="14" fill="#9ca3af">Table 5</text>
                {/* Arrow */}
                <text x="400" y="130" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1e40af">→</text>
                {/* Detected: 3 points define position */}
                <rect x="460" y="30" width="280" height="200" rx="8" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                <text x="600" y="22" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1e40af">位置・大きさ・傾きを特定</text>
                <rect x="488" y="54" width="40" height="40" rx="3" fill="#1e40af"/>
                <rect x="493" y="59" width="30" height="30" fill="#fff"/>
                <rect x="499" y="65" width="18" height="18" fill="#1e40af"/>
                <rect x="668" y="54" width="40" height="40" rx="3" fill="#1e40af"/>
                <rect x="673" y="59" width="30" height="30" fill="#fff"/>
                <rect x="679" y="65" width="18" height="18" fill="#1e40af"/>
                <rect x="488" y="166" width="40" height="40" rx="3" fill="#1e40af"/>
                <rect x="493" y="171" width="30" height="30" fill="#fff"/>
                <rect x="499" y="177" width="18" height="18" fill="#1e40af"/>
                {/* Connecting lines */}
                <line x1="508" y1="94" x2="688" y2="94" stroke="#dc2626" strokeWidth="2" strokeDasharray="6"/>
                <line x1="508" y1="94" x2="508" y2="206" stroke="#dc2626" strokeWidth="2" strokeDasharray="6"/>
                <line x1="508" y1="206" x2="688" y2="94" stroke="#dc2626" strokeWidth="2" strokeDasharray="6"/>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">1:1:3:1:1 の秘密</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 260" width="780" height="260">
                {/* Finder pattern zoomed in */}
                <rect x="200" y="10" width="180" height="180" rx="4" fill="#1a1d23"/>
                <rect x="220" y="30" width="140" height="140" fill="#fff"/>
                <rect x="250" y="60" width="80" height="80" fill="#1a1d23"/>
                {/* Scan line */}
                <line x1="170" y1="100" x2="410" y2="100" stroke="#dc2626" strokeWidth="3"/>
                <polygon points="410,95 420,100 410,105" fill="#dc2626"/>
                {/* Ratio markers below */}
                <rect x="200" y="200" width="20" height="30" fill="#1a1d23"/>
                <rect x="220" y="200" width="20" height="30" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <rect x="240" y="200" width="60" height="30" fill="#1a1d23"/>
                <rect x="300" y="200" width="20" height="30" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <rect x="320" y="200" width="20" height="30" fill="#1a1d23"/>
                <text x="210" y="252" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af">1</text>
                <text x="230" y="252" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af">1</text>
                <text x="270" y="252" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af">3</text>
                <text x="310" y="252" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af">1</text>
                <text x="330" y="252" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af">1</text>
                {/* Right side: explanation */}
                <text x="500" y="60" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1a1d23">膨大な印刷物を調査</text>
                <text x="500" y="100" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">チラシ・雑誌・段ボール…</text>
                <text x="500" y="160" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e40af">「最も出現しない比率」</text>
                <text x="500" y="200" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e40af">を発見</text>
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
        <div className="scene-title">他の模様と絶対に間違えない</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 200" width="780" height="200">
                {/* Characters that DON'T have this ratio */}
                <text x="100" y="50" textAnchor="middle" fontSize="56" fill="#d1d5db">漢</text>
                <text x="220" y="50" textAnchor="middle" fontSize="56" fill="#d1d5db">A</text>
                <text x="340" y="50" textAnchor="middle" fontSize="56" fill="#d1d5db">한</text>
                <text x="460" y="50" textAnchor="middle" fontSize="56" fill="#d1d5db">9</text>
                <text x="580" y="50" textAnchor="middle" fontSize="56" fill="#d1d5db">@</text>
                <text x="700" y="50" textAnchor="middle" fontSize="56" fill="#d1d5db">%</text>
                {/* X marks */}
                <text x="100" y="90" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">×</text>
                <text x="220" y="90" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">×</text>
                <text x="340" y="90" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">×</text>
                <text x="460" y="90" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">×</text>
                <text x="580" y="90" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">×</text>
                <text x="700" y="90" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">×</text>
                {/* The ratio itself */}
                <rect x="240" y="120" width="30" height="40" fill="#1a1d23"/>
                <rect x="270" y="120" width="30" height="40" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <rect x="300" y="120" width="90" height="40" fill="#1a1d23"/>
                <rect x="390" y="120" width="30" height="40" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <rect x="420" y="120" width="30" height="40" fill="#1a1d23"/>
                <text x="390" y="190" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0d9488">→ 誤検出ゼロ</text>
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
        <div className="scene-title">360度どこからでも読める</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 260" width="780" height="260">
                {/* Center: finder pattern */}
                <rect x="310" y="60" width="160" height="160" rx="4" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                <rect x="324" y="74" width="40" height="40" rx="3" fill="#1e40af"/>
                <rect x="329" y="79" width="30" height="30" fill="#fff"/>
                <rect x="335" y="85" width="18" height="18" fill="#1e40af"/>
                {/* Scan arrows from all directions */}
                <line x1="390" y1="10" x2="390" y2="55" stroke="#dc2626" strokeWidth="3"/>
                <polygon points="385,55 395,55 390,65" fill="#dc2626"/>
                <text x="390" y="8" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">↓</text>
                <line x1="520" y1="80" x2="475" y2="100" stroke="#dc2626" strokeWidth="3"/>
                <line x1="260" y1="200" x2="305" y2="180" stroke="#dc2626" strokeWidth="3"/>
                <line x1="390" y1="260" x2="390" y2="225" stroke="#dc2626" strokeWidth="3"/>
                <line x1="260" y1="80" x2="305" y2="100" stroke="#dc2626" strokeWidth="3"/>
                <line x1="520" y1="200" x2="475" y2="180" stroke="#dc2626" strokeWidth="3"/>
                {/* Labels for each direction */}
                <text x="390" y="256" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">↑</text>
                <text x="240" y="78" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">↗</text>
                <text x="540" y="78" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">↙</text>
                <text x="240" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">↗</text>
                <text x="540" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">↙</text>
                {/* Ratio readouts */}
                <text x="160" y="140" textAnchor="end" fontSize="20" fontWeight="900" fill="#1e40af">1:1:3:1:1</text>
                <text x="620" y="140" fontSize="20" fontWeight="900" fill="#1e40af">1:1:3:1:1</text>
                <text x="390" y="30" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af">1:1:3:1:1</text>
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
        <div className="scene-title">静寂ゾーン（Quiet Zone）</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* Left: no quiet zone (bad) */}
                <text x="180" y="24" textAnchor="middle" fontSize="20" fontWeight="700" fill="#dc2626">余白なし → 読取失敗</text>
                <text x="60" y="70" fontSize="18" fill="#1a1d23">TEXT</text>
                <rect x="100" y="45" width="160" height="160" rx="4" fill="#fff" stroke="#dc2626" strokeWidth="2"/>
                <rect x="110" y="55" width="30" height="30" rx="2" fill="#1a1d23"/>
                <rect x="114" y="59" width="22" height="22" fill="#fff"/>
                <rect x="118" y="63" width="14" height="14" fill="#1a1d23"/>
                <rect x="220" y="55" width="30" height="30" rx="2" fill="#1a1d23"/>
                <rect x="224" y="59" width="22" height="22" fill="#fff"/>
                <rect x="228" y="63" width="14" height="14" fill="#1a1d23"/>
                <rect x="110" y="165" width="30" height="30" rx="2" fill="#1a1d23"/>
                <rect x="114" y="169" width="22" height="22" fill="#fff"/>
                <rect x="118" y="173" width="14" height="14" fill="#1a1d23"/>
                <text x="270" y="160" fontSize="18" fill="#1a1d23">ABC</text>
                {/* Arrow */}
                <text x="390" y="130" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a1d23">vs</text>
                {/* Right: with quiet zone (good) */}
                <text x="580" y="24" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0d9488">余白4セル → 読取成功</text>
                <rect x="450" y="35" width="200" height="200" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeDasharray="6"/>
                <rect x="470" y="55" width="160" height="160" rx="4" fill="#fff" stroke="#0d9488" strokeWidth="2"/>
                <rect x="480" y="65" width="30" height="30" rx="2" fill="#1a1d23"/>
                <rect x="484" y="69" width="22" height="22" fill="#fff"/>
                <rect x="488" y="73" width="14" height="14" fill="#1a1d23"/>
                <rect x="590" y="65" width="30" height="30" rx="2" fill="#1a1d23"/>
                <rect x="594" y="69" width="22" height="22" fill="#fff"/>
                <rect x="598" y="73" width="14" height="14" fill="#1a1d23"/>
                <rect x="480" y="175" width="30" height="30" rx="2" fill="#1a1d23"/>
                <rect x="484" y="179" width="22" height="22" fill="#fff"/>
                <rect x="488" y="183" width="14" height="14" fill="#1a1d23"/>
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
        <div className="scene-title">もし誤り訂正がなかったら？</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Factory scene with oil stain */}
                <rect x="40" y="20" width="300" height="180" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
                <text x="190" y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">工場の部品ラベル</text>
                {/* QR on a part */}
                <rect x="120" y="70" width="80" height="80" rx="4" fill="#fff" stroke="#1a1d23" strokeWidth="1"/>
                <rect x="128" y="78" width="16" height="16" fill="#1a1d23"/>
                <rect x="176" y="78" width="16" height="16" fill="#1a1d23"/>
                <rect x="128" y="126" width="16" height="16" fill="#1a1d23"/>
                {/* Oil stain over QR */}
                <ellipse cx="165" cy="115" rx="35" ry="25" fill="#92400e" opacity="0.6"/>
                <text x="165" y="120" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">油汚れ</text>
                {/* Result */}
                <text x="190" y="175" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">読取不能！</text>
                {/* Arrow */}
                <text x="390" y="120" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a1d23">→</text>
                {/* With error correction */}
                <rect x="440" y="20" width="300" height="180" rx="8" fill="#fff" stroke="#0d9488" strokeWidth="2"/>
                <text x="590" y="50" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">誤り訂正ありなら</text>
                <rect x="520" y="70" width="80" height="80" rx="4" fill="#fff" stroke="#0d9488" strokeWidth="1"/>
                <rect x="528" y="78" width="16" height="16" fill="#1a1d23"/>
                <rect x="576" y="78" width="16" height="16" fill="#1a1d23"/>
                <rect x="528" y="126" width="16" height="16" fill="#1a1d23"/>
                <ellipse cx="565" cy="115" rx="35" ry="25" fill="#92400e" opacity="0.3"/>
                <text x="590" y="175" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">復元成功！</text>
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
        <div className="scene-title">リード・ソロモン符号の直感</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Number sequence: 1, 3, ?, 7 */}
                <text x="390" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">規則があれば欠損を復元できる</text>
                {/* Original sequence */}
                <text x="100" y="80" textAnchor="end" fontSize="18" fontWeight="700" fill="#1a1d23">元データ:</text>
                <rect x="130" y="55" width="60" height="40" rx="6" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="160" y="82" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af">1</text>
                <rect x="210" y="55" width="60" height="40" rx="6" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="240" y="82" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af">3</text>
                <rect x="290" y="55" width="60" height="40" rx="6" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="320" y="82" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af">5</text>
                <rect x="370" y="55" width="60" height="40" rx="6" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="400" y="82" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af">7</text>
                {/* Rule indicator */}
                <text x="520" y="82" fontSize="20" fontWeight="700" fill="#0d9488">← +2ずつ増える規則</text>
                {/* Damaged sequence */}
                <text x="100" y="150" textAnchor="end" fontSize="18" fontWeight="700" fill="#1a1d23">壊れた:</text>
                <rect x="130" y="125" width="60" height="40" rx="6" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="160" y="152" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af">1</text>
                <rect x="210" y="125" width="60" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="240" y="152" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">?</text>
                <rect x="290" y="125" width="60" height="40" rx="6" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="320" y="152" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af">5</text>
                <rect x="370" y="125" width="60" height="40" rx="6" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="400" y="152" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e40af">7</text>
                {/* Recovery */}
                <text x="520" y="152" fontSize="20" fontWeight="900" fill="#0d9488">→ ?=3 と復元！</text>
                {/* Bottom note */}
                <text x="390" y="200" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">QRコードもデータに数学的な規則を付け足している</text>
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
        <div className="scene-title">同じ数学、異なる世界</div>
        <div className="three-col">
            <div className="arch-card border-teal">
                <div className="svg-diagram">
                    <svg viewBox="0 0 80 80" width="60" height="60">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="#0d9488" strokeWidth="3"/>
                        <circle cx="40" cy="40" r="14" fill="none" stroke="#0d9488" strokeWidth="2"/>
                        <circle cx="40" cy="40" r="4" fill="#0d9488"/>
                    </svg>
                </div>
                <div className="card-title">CD / DVD</div>
                <div className="card-body">傷がついても<br />音が飛ばない</div>
            </div>
            <div className="arch-card border-primary">
                <div className="svg-diagram">
                    <svg viewBox="0 0 80 80" width="60" height="60">
                        <rect x="8" y="8" width="64" height="64" rx="4" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                        <rect x="14" y="14" width="18" height="18" rx="2" fill="#1e40af"/>
                        <rect x="48" y="14" width="18" height="18" rx="2" fill="#1e40af"/>
                        <rect x="14" y="48" width="18" height="18" rx="2" fill="#1e40af"/>
                    </svg>
                </div>
                <div className="card-title">QRコード</div>
                <div className="card-body">汚れても<br />データを復元</div>
            </div>
            <div className="arch-card border-amber">
                <img src="https://api.iconify.design/simple-icons/nasa.svg?color=%23E03C31&width=72&height=72" alt="NASA" />
                <div className="card-title">ボイジャー</div>
                <div className="card-body">何十億km先から<br />信号を復元</div>
            </div>
        </div>
        <div className="big-statement">すべて<span className="accent-primary">リード・ソロモン符号</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">インターリーブ（交互配置）</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* Without interleave */}
                <text x="190" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">順番に配置（危険）</text>
                <rect x="40" y="35" width="80" height="35" rx="4" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="80" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">A A A A</text>
                <rect x="130" y="35" width="80" height="35" rx="4" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                <text x="170" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0d9488">B B B B</text>
                <rect x="220" y="35" width="80" height="35" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <text x="260" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706">C C C C</text>
                {/* Damage over block A */}
                <rect x="40" y="35" width="80" height="35" rx="4" fill="#dc2626" opacity="0.5"/>
                <text x="80" y="58" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">全滅</text>
                <text x="190" y="95" textAnchor="middle" fontSize="16" fontWeight="700" fill="#dc2626">→ ブロックA復元不能</text>
                {/* With interleave */}
                <text x="580" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">交互に配置（安全）</text>
                <rect x="430" y="35" width="26" height="35" rx="3" fill="#dbeafe" stroke="#1e40af" strokeWidth="1"/>
                <text x="443" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">A</text>
                <rect x="460" y="35" width="26" height="35" rx="3" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1"/>
                <text x="473" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0d9488">B</text>
                <rect x="490" y="35" width="26" height="35" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
                <text x="503" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">C</text>
                <rect x="520" y="35" width="26" height="35" rx="3" fill="#dbeafe" stroke="#1e40af" strokeWidth="1"/>
                <text x="533" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">A</text>
                <rect x="550" y="35" width="26" height="35" rx="3" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1"/>
                <text x="563" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0d9488">B</text>
                <rect x="580" y="35" width="26" height="35" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
                <text x="593" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">C</text>
                <rect x="610" y="35" width="26" height="35" rx="3" fill="#dbeafe" stroke="#1e40af" strokeWidth="1"/>
                <text x="623" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">A</text>
                <rect x="640" y="35" width="26" height="35" rx="3" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1"/>
                <text x="653" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0d9488">B</text>
                <rect x="670" y="35" width="26" height="35" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
                <text x="683" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">C</text>
                <rect x="700" y="35" width="26" height="35" rx="3" fill="#dbeafe" stroke="#1e40af" strokeWidth="1"/>
                <text x="713" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">A</text>
                {/* Damage spread across blocks */}
                <rect x="430" y="35" width="86" height="35" rx="3" fill="#dc2626" opacity="0.4"/>
                <text x="580" y="95" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0d9488">→ 各ブロック少量の損傷 → 全復元可能</text>
                {/* Bottom: visual comparison */}
                <text x="190" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">コーヒーをこぼした場面</text>
                <rect x="60" y="155" width="260" height="60" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <ellipse cx="120" cy="185" rx="50" ry="20" fill="#92400e" opacity="0.4"/>
                <text x="190" y="230" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">被害が1ブロックに集中</text>
                <text x="580" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">同じコーヒーのシミでも</text>
                <rect x="450" y="155" width="260" height="60" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <ellipse cx="510" cy="185" rx="50" ry="20" fill="#92400e" opacity="0.4"/>
                <text x="580" y="230" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0d9488">被害が3ブロックに分散 → 復元OK</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">ロゴ入りQRコードの秘密</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* Error correction levels */}
                <text x="390" y="24" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">誤り訂正レベル</text>
                {/* Level bars */}
                <text x="130" y="62" textAnchor="end" fontSize="18" fontWeight="700" fill="#1a1d23">L</text>
                <rect x="140" y="45" width="400" height="24" rx="4" fill="#e5e7eb"/>
                <rect x="140" y="45" width="28" height="24" rx="4" fill="#dbeafe"/>
                <text x="180" y="62" fontSize="14" fontWeight="700" fill="#1e40af">7%</text>
                <text x="130" y="96" textAnchor="end" fontSize="18" fontWeight="700" fill="#1a1d23">M</text>
                <rect x="140" y="79" width="400" height="24" rx="4" fill="#e5e7eb"/>
                <rect x="140" y="79" width="60" height="24" rx="4" fill="#ccfbf1"/>
                <text x="210" y="96" fontSize="14" fontWeight="700" fill="#0d9488">15%</text>
                <text x="130" y="130" textAnchor="end" fontSize="18" fontWeight="700" fill="#1a1d23">Q</text>
                <rect x="140" y="113" width="400" height="24" rx="4" fill="#e5e7eb"/>
                <rect x="140" y="113" width="100" height="24" rx="4" fill="#fef3c7"/>
                <text x="250" y="130" fontSize="14" fontWeight="700" fill="#d97706">25%</text>
                <text x="130" y="164" textAnchor="end" fontSize="18" fontWeight="900" fill="#1e40af">H</text>
                <rect x="140" y="147" width="400" height="24" rx="4" fill="#e5e7eb"/>
                <rect x="140" y="147" width="120" height="24" rx="4" fill="#1e40af"/>
                <text x="270" y="164" fontSize="14" fontWeight="900" fill="#1e40af">30%</text>
                {/* Design QR illustration */}
                <rect x="600" y="50" width="140" height="140" rx="6" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                <rect x="612" y="62" width="28" height="28" rx="2" fill="#1a1d23"/>
                <rect x="616" y="66" width="20" height="20" fill="#fff"/>
                <rect x="620" y="70" width="12" height="12" fill="#1a1d23"/>
                <rect x="700" y="62" width="28" height="28" rx="2" fill="#1a1d23"/>
                <rect x="704" y="66" width="20" height="20" fill="#fff"/>
                <rect x="708" y="70" width="12" height="12" fill="#1a1d23"/>
                <rect x="612" y="150" width="28" height="28" rx="2" fill="#1a1d23"/>
                <rect x="616" y="154" width="20" height="20" fill="#fff"/>
                <rect x="620" y="158" width="12" height="12" fill="#1a1d23"/>
                {/* Logo in center */}
                <rect x="646" y="96" width="48" height="48" rx="8" fill="#1e40af"/>
                <text x="670" y="128" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">LOGO</text>
                {/* Bottom */}
                <text x="390" y="218" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">レベルH: 30%壊しても読める → ロゴを置ける</text>
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
        <div className="scene-title">読み取りの6ステップ</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">撮影</div>
                <div className="fc-node-sub">カメラ画像</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">二値化</div>
                <div className="fc-node-sub">白黒変換</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">位置検出</div>
                <div className="fc-node-sub">1:1:3:1:1</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">座標特定</div>
                <div className="fc-node-sub">タイミング</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">データ復号</div>
                <div className="fc-node-sub">0と1を読む</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">誤り訂正</div>
                <div className="fc-node-sub">RS符号</div>
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
        <div className="scene-title">4つのエンコードモード</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 220" width="780" height="220">
                {/* Mode cards */}
                <rect x="20" y="20" width="170" height="120" rx="8" fill="#fff" stroke="#1e40af" strokeWidth="2"/>
                <text x="105" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e40af">数字</text>
                <text x="105" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">0-9</text>
                <text x="105" y="115" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0d9488">10bit / 3桁</text>
                <text x="105" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1d23">電話番号など</text>
                <rect x="210" y="20" width="170" height="120" rx="8" fill="#fff" stroke="#0d9488" strokeWidth="2"/>
                <text x="295" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">英数字</text>
                <text x="295" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">A-Z, 0-9, 記号</text>
                <text x="295" y="115" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0d9488">11bit / 2文字</text>
                <text x="295" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1d23">URLなど</text>
                <rect x="400" y="20" width="170" height="120" rx="8" fill="#fff" stroke="#d97706" strokeWidth="2"/>
                <text x="485" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">バイト</text>
                <text x="485" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">ISO 8859-1</text>
                <text x="485" y="115" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0d9488">8bit / 1文字</text>
                <text x="485" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1d23">バイナリデータ</text>
                <rect x="590" y="20" width="170" height="120" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="2"/>
                <text x="675" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">漢字</text>
                <text x="675" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">Shift JIS</text>
                <text x="675" y="115" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0d9488">13bit / 1文字</text>
                <text x="675" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1d23">日本語テキスト</text>
                {/* Bottom */}
                <text x="390" y="200" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">内容に応じて最も効率的なモードを自動選択</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">マスクパターン</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* Before mask: biased */}
                <text x="170" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">マスク前（偏りあり）</text>
                {/* Grid with heavy black concentration */}
                <rect x="60" y="35" width="220" height="160" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <rect x="70" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="92" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="114" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="136" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="158" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="70" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="92" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="114" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="136" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="158" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="70" y="89" width="18" height="18" fill="#1a1d23"/>
                <rect x="92" y="89" width="18" height="18" fill="#1a1d23"/>
                <rect x="114" y="89" width="18" height="18" fill="#1a1d23"/>
                <rect x="180" y="111" width="18" height="18" fill="#1a1d23"/>
                <rect x="202" y="111" width="18" height="18" fill="#1a1d23"/>
                <rect x="224" y="111" width="18" height="18" fill="#1a1d23"/>
                <rect x="246" y="111" width="18" height="18" fill="#1a1d23"/>
                {/* Arrow */}
                <text x="390" y="110" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1e40af">XOR</text>
                <text x="390" y="135" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">マスク適用</text>
                {/* After mask: balanced */}
                <text x="610" y="24" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">マスク後（バランス良）</text>
                <rect x="500" y="35" width="220" height="160" rx="6" fill="#fff" stroke="#0d9488" strokeWidth="1"/>
                {/* Checker-like balanced pattern */}
                <rect x="510" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="554" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="598" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="642" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="686" y="45" width="18" height="18" fill="#1a1d23"/>
                <rect x="532" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="576" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="620" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="664" y="67" width="18" height="18" fill="#1a1d23"/>
                <rect x="510" y="89" width="18" height="18" fill="#1a1d23"/>
                <rect x="554" y="89" width="18" height="18" fill="#1a1d23"/>
                <rect x="598" y="89" width="18" height="18" fill="#1a1d23"/>
                <rect x="642" y="89" width="18" height="18" fill="#1a1d23"/>
                <rect x="532" y="111" width="18" height="18" fill="#1a1d23"/>
                <rect x="576" y="111" width="18" height="18" fill="#1a1d23"/>
                <rect x="620" y="111" width="18" height="18" fill="#1a1d23"/>
                <rect x="664" y="111" width="18" height="18" fill="#1a1d23"/>
                <rect x="510" y="133" width="18" height="18" fill="#1a1d23"/>
                <rect x="554" y="133" width="18" height="18" fill="#1a1d23"/>
                <rect x="598" y="133" width="18" height="18" fill="#1a1d23"/>
                <rect x="642" y="133" width="18" height="18" fill="#1a1d23"/>
                <rect x="686" y="133" width="18" height="18" fill="#1a1d23"/>
                <rect x="532" y="155" width="18" height="18" fill="#1a1d23"/>
                <rect x="576" y="155" width="18" height="18" fill="#1a1d23"/>
                <rect x="620" y="155" width="18" height="18" fill="#1a1d23"/>
                <rect x="664" y="155" width="18" height="18" fill="#1a1d23"/>
                {/* Bottom */}
                <text x="390" y="220" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">8種類から最もバランスが良いパターンを自動選択</text>
            </svg>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">読み取り速度</div>
        <div className="metric-card">
            <div className="metric-value accent-primary">32<span style={{ fontSize: '48px' }}>ms</span></div>
            <div className="metric-label">英数字100文字以下の読み取り時間</div>
            <div className="metric-sub">まばたき（約300ms）の10分の1</div>
        </div>
        <div className="big-statement"><span className="accent-primary">Quick Response</span> は伊達じゃない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">オープン・クローズ戦略</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="text-badge" style={{ background: 'var(--teal)' }}>OPEN</div>
                <div className="compare-title">QRコード仕様</div>
                <div className="compare-body">誰でも無料で使える<br />→ 爆発的普及</div>
            </div>
            <div className="compare-card border-coral">
                <div className="text-badge" style={{ background: 'var(--coral)' }}>CLOSE</div>
                <div className="compare-title">読取装置の特許</div>
                <div className="compare-body">デンソーウェーブが保持<br />→ 収益化</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="scene-title">普及の3つの波</div>
        <div className="flow-chain">
            <div className="fc-node border-primary">
                <div className="year-badge">2002年〜</div>
                <div className="fc-node-title">日本</div>
                <div className="fc-node-sub">携帯電話にQRリーダー搭載</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-teal">
                <div className="year-badge">2010年代</div>
                <div className="fc-node-title">中国</div>
                <div className="fc-node-sub">
                    <img src="https://api.iconify.design/simple-icons/alipay.svg?color=%231677FF&width=72&height=72" style={{ verticalAlign: 'middle' }} alt="Alipay" />
                    <img src="https://api.iconify.design/simple-icons/wechat.svg?color=%2307C160&width=72&height=72" style={{ verticalAlign: 'middle' }} alt="WeChat" />
                </div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-amber">
                <div className="year-badge">2020年〜</div>
                <div className="fc-node-title">欧米</div>
                <div className="fc-node-sub">コロナ禍で非接触ニーズ</div>
            </div>
        </div>
        <div className="source">出典: デンソーウェーブ公式 / 日経ビジネス</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <div className="svg-diagram">
            <svg viewBox="0 0 780 200" width="780" height="200">
                {/* Three pillars */}
                <rect x="60" y="30" width="200" height="80" rx="8" fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
                <text x="160" y="62" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e40af">見つける</text>
                <text x="160" y="92" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">1:1:3:1:1</text>
                <rect x="290" y="30" width="200" height="80" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
                <text x="390" y="62" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">直す</text>
                <text x="390" y="92" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">リード・ソロモン</text>
                <rect x="520" y="30" width="200" height="80" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <text x="620" y="62" textAnchor="middle" fontSize="22" fontWeight="900" fill="#d97706">読む</text>
                <text x="620" y="92" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">4モード + マスク</text>
                {/* Connecting arrows down to QR */}
                <line x1="160" y1="110" x2="390" y2="150" stroke="#d1d5db" strokeWidth="2"/>
                <line x1="390" y1="110" x2="390" y2="150" stroke="#d1d5db" strokeWidth="2"/>
                <line x1="620" y1="110" x2="390" y2="150" stroke="#d1d5db" strokeWidth="2"/>
                {/* Small QR icon */}
                <rect x="370" y="150" width="40" height="40" rx="4" fill="#fff" stroke="#1a1d23" strokeWidth="2"/>
                <rect x="376" y="156" width="10" height="10" fill="#1a1d23"/>
                <rect x="394" y="156" width="10" height="10" fill="#1a1d23"/>
                <rect x="376" y="174" width="10" height="10" fill="#1a1d23"/>
            </svg>
        </div>
        <div className="big-statement">1ドットも無駄のない<span className="accent-primary">精緻な設計図</span></div>
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
