import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="title-large">なぜ動画形式は<br />こんなに多いのか</div>
        <div className="flow-chain" style={{ marginTop: '24px' }}>
            <div className="text-badge">MP4</div>
            <div className="text-badge teal">AVI</div>
            <div className="text-badge coral">MOV</div>
            <div className="text-badge amber">MKV</div>
            <div className="text-badge">WebM</div>
        </div>
        <div className="big-statement" style={{ marginTop: '16px' }}>「とりあえずMP4」は正解？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">MP4の中に入っているもの</div>
        <svg viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg">
            {/* MP4 outer box */}
            <rect x="40" y="20" width="700" height="200" rx="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
            <text x="390" y="55" textAnchor="middle" fontSize="26" fontWeight="900" fill="#2563eb">.MP4（コンテナ）</text>
            {/* Inner codec boxes */}
            <rect x="80" y="80" width="140" height="60" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="150" y="118" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">H.264</text>
            <rect x="250" y="80" width="140" height="60" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="320" y="118" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">H.265</text>
            <rect x="420" y="80" width="140" height="60" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="490" y="118" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">AV1</text>
            <rect x="590" y="80" width="140" height="60" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="660" y="118" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">VP9</text>
            <text x="390" y="185" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">…他にも10種類以上</text>
            {/* Warning */}
            <rect x="100" y="155" width="580" height="3" rx="2" fill="#ef4444" opacity="0.5"/>
        </svg>
        <div className="big-statement">同じ<span className="accent-primary">MP4</span>でも中身が違えば再生できない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">今日わかること</div>
        <svg viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg">
            {/* Question mark */}
            <circle cx="390" cy="90" r="70" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="12 6"/>
            <text x="390" y="105" textAnchor="middle" fontSize="56" fontWeight="900" fill="#2563eb">?</text>
            {/* Arrows radiating out */}
            <line x1="320" y1="70" x2="200" y2="40" stroke="#0d9488" strokeWidth="3" strokeLinecap="round"/>
            <text x="160" y="38" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0d9488">圧縮</text>
            <line x1="460" y1="70" x2="580" y2="40" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
            <text x="620" y="38" textAnchor="middle" fontSize="20" fontWeight="700" fill="#ef4444">特許</text>
            <line x1="320" y1="130" x2="200" y2="170" stroke="#d97706" strokeWidth="3" strokeLinecap="round"/>
            <text x="160" y="178" textAnchor="middle" fontSize="20" fontWeight="700" fill="#d97706">互換性</text>
            <line x1="460" y1="130" x2="580" y2="170" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
            <text x="620" y="178" textAnchor="middle" fontSize="20" fontWeight="700" fill="#2563eb">用途</text>
        </svg>
        <div className="big-statement">動画形式の<span className="accent-primary">多さの理由</span>を解き明かす</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">思考実験</div>
        <div className="big-statement">もし動画を一切<span className="accent-coral">圧縮できなかったら</span>？</div>
        <svg viewBox="0 0 780 180" xmlns="http://www.w3.org/2000/svg">
            {/* Film strip */}
            <rect x="90" y="30" width="600" height="120" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            {/* Frames */}
            <rect x="110" y="50" width="80" height="80" rx="4" fill="#dbeafe"/>
            <rect x="210" y="50" width="80" height="80" rx="4" fill="#dbeafe"/>
            <rect x="310" y="50" width="80" height="80" rx="4" fill="#dbeafe"/>
            <rect x="410" y="50" width="80" height="80" rx="4" fill="#dbeafe"/>
            <rect x="510" y="50" width="80" height="80" rx="4" fill="#dbeafe"/>
            {/* Frame labels */}
            <text x="150" y="95" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">1</text>
            <text x="250" y="95" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">2</text>
            <text x="350" y="95" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">3</text>
            <text x="450" y="95" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">…</text>
            <text x="550" y="95" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">30</text>
            <text x="390" y="170" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">1秒 = 30枚の画像</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">無圧縮1080p動画のデータ量</div>
        <div className="metric-grid">
            <div className="metric-card border-coral">
                <div className="metric-value accent-coral">187MB</div>
                <div className="metric-label">1秒あたり</div>
            </div>
            <div className="metric-card border-coral">
                <div className="metric-value accent-coral">11GB</div>
                <div className="metric-label">1分あたり</div>
            </div>
        </div>
        <div className="source">計算: 1920 × 1080 × 24bit × 30fps ÷ 8 ≒ 187MB/秒</div>
        <div className="big-statement">15分の動画で<span className="accent-coral">約165GB</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">動画圧縮の3つの基本アイデア</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <div className="card-title">フレーム間予測</div>
                <div className="card-body">前後フレームの差分だけ記録</div>
            </div>
            <div className="arch-card border-teal">
                <div className="card-title">空間圧縮</div>
                <div className="card-body">細かすぎる模様を省略</div>
            </div>
            <div className="arch-card border-amber">
                <div className="card-title">色の間引き</div>
                <div className="card-body">目が鈍感な色変化をカット</div>
            </div>
        </div>
        <div className="big-statement">この3つの組み合わせが<span className="accent-primary">コーデック</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">フレーム間予測</div>
        <svg viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg">
            {/* Frame 1 full */}
            <rect x="30" y="10" width="160" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="110" y="50" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2563eb">フレーム1</text>
            {/* Mountains background */}
            <path d="M 45 110 L 80 60 L 110 90 L 140 50 L 175 110 Z" fill="#0d9488" opacity="0.3"/>
            {/* Person */}
            <circle cx="80" cy="80" r="8" fill="#ef4444"/>
            <path d="M65 92 C65 83 95 83 95 92 L95 100 Q80 106 65 100 Z" fill="#ef4444"/>
            {/* Arrow */}
            <text x="220" y="78" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2563eb">→</text>
            {/* Frame 2 diff only */}
            <rect x="260" y="10" width="160" height="120" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6 4"/>
            <text x="340" y="50" textAnchor="middle" fontSize="16" fontWeight="700" fill="#d97706">差分のみ</text>
            {/* Person moved */}
            <circle cx="120" cy="80" r="8" fill="#ef4444" transform="translate(230, 0)"/>
            <path d="M335 92 C335 83 365 83 365 92 L365 100 Q350 106 335 100 Z" fill="#ef4444"/>
            {/* Result */}
            <text x="460" y="78" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0d9488">＝</text>
            {/* Data size comparison */}
            <rect x="500" y="20" width="260" height="40" rx="6" fill="#fee2e2"/>
            <rect x="500" y="20" width="260" height="40" rx="6" fill="none" stroke="#ef4444" strokeWidth="2"/>
            <text x="630" y="47" textAnchor="middle" fontSize="18" fontWeight="900" fill="#ef4444">全データ: 187MB</text>
            <rect x="500" y="75" width="60" height="40" rx="6" fill="#ccfbf1"/>
            <rect x="500" y="75" width="60" height="40" rx="6" fill="none" stroke="#0d9488" strokeWidth="2"/>
            <text x="630" y="102" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">差分のみ: 激減!</text>
            <text x="390" y="170" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">背景が動かない = 記録不要</text>
            <text x="390" y="210" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">変わった部分だけ記録する</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">人間の目をだます技術</div>
        <svg viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
            {/* Left: Fine detail */}
            <text x="195" y="28" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">原画</text>
            <rect x="50" y="40" width="290" height="140" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            {/* Detailed grass dots */}
            <circle cx="80" cy="150" r="3" fill="#0d9488"/><circle cx="90" cy="145" r="3" fill="#0d9488"/>
            <circle cx="100" cy="155" r="2" fill="#0d9488"/><circle cx="110" cy="148" r="3" fill="#0d9488"/>
            <circle cx="120" cy="152" r="2" fill="#0d9488"/><circle cx="130" cy="147" r="3" fill="#0d9488"/>
            <circle cx="140" cy="153" r="2" fill="#0d9488"/><circle cx="150" cy="149" r="3" fill="#0d9488"/>
            <circle cx="160" cy="154" r="2" fill="#0d9488"/><circle cx="170" cy="146" r="3" fill="#0d9488"/>
            <circle cx="180" cy="151" r="2" fill="#0d9488"/><circle cx="190" cy="148" r="3" fill="#0d9488"/>
            <circle cx="200" cy="155" r="2" fill="#0d9488"/><circle cx="210" cy="145" r="3" fill="#0d9488"/>
            <circle cx="220" cy="150" r="2" fill="#0d9488"/><circle cx="230" cy="147" r="3" fill="#0d9488"/>
            <circle cx="240" cy="153" r="2" fill="#0d9488"/><circle cx="250" cy="149" r="3" fill="#0d9488"/>
            <circle cx="260" cy="151" r="2" fill="#0d9488"/><circle cx="270" cy="146" r="3" fill="#0d9488"/>
            <circle cx="280" cy="150" r="2" fill="#0d9488"/><circle cx="290" cy="155" r="2" fill="#0d9488"/>
            <circle cx="300" cy="148" r="3" fill="#0d9488"/><circle cx="310" cy="152" r="2" fill="#0d9488"/>
            {/* Sky gradient approximation */}
            <rect x="55" y="45" width="280" height="60" rx="4" fill="#dbeafe" opacity="0.6"/>
            {/* Arrow */}
            <text x="390" y="120" textAnchor="middle" fontSize="28" fontWeight="900" fill="#d97706">→</text>
            {/* Right: Simplified */}
            <text x="585" y="28" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">圧縮後</text>
            <rect x="440" y="40" width="290" height="140" rx="8" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            {/* Simplified grass: single block */}
            <rect x="445" y="138" width="280" height="36" rx="4" fill="#ccfbf1"/>
            {/* Simplified sky */}
            <rect x="445" y="45" width="280" height="60" rx="4" fill="#dbeafe" opacity="0.4"/>
            <text x="585" y="115" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">見た目ほぼ同じ</text>
            <text x="390" y="210" textAnchor="middle" fontSize="22" fontWeight="900" fill="#d97706">187MB → 約5MB（40分の1以下）</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">弁当箱で理解する動画ファイル</div>
        <svg viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
            {/* Bento box 1 (round) */}
            <ellipse cx="160" cy="110" rx="110" ry="70" fill="#fef3c7" stroke="#d97706" strokeWidth="3"/>
            <text x="160" y="95" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">丸い箱</text>
            <text x="160" y="125" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">唐揚げ</text>
            {/* Bento box 2 (square) */}
            <rect x="310" y="50" width="170" height="120" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
            <text x="395" y="95" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">四角い箱</text>
            <text x="395" y="125" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">唐揚げ</text>
            {/* Bento box 3 (tall) */}
            <rect x="540" y="35" width="130" height="150" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="3"/>
            <text x="605" y="85" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">二段重ね</text>
            <text x="605" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">唐揚げ</text>
            <text x="390" y="215" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1a1d23">箱が変わっても中身は同じ</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">コンテナ（箱）とコーデック（中身）</div>
        <svg viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
            {/* Container layer */}
            <text x="100" y="30" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">コンテナ（箱）</text>
            <rect x="20" y="45" width="130" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="85" y="77" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">MP4</text>
            <rect x="170" y="45" width="130" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="235" y="77" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">MKV</text>
            <rect x="320" y="45" width="130" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="385" y="77" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">AVI</text>
            <rect x="470" y="45" width="130" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="535" y="77" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">WebM</text>
            <rect x="620" y="45" width="130" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="685" y="77" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">MOV</text>
            {/* Separator */}
            <line x1="40" y1="120" x2="740" y2="120" stroke="#d1d5db" strokeWidth="2" strokeDasharray="8 4"/>
            <text x="390" y="115" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">× 組み合わせ自由</text>
            {/* Codec layer */}
            <text x="100" y="155" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">コーデック（中身）</text>
            <rect x="20" y="170" width="140" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="90" y="202" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">H.264</text>
            <rect x="180" y="170" width="140" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="250" y="202" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">H.265</text>
            <rect x="340" y="170" width="120" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="400" y="202" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">AV1</text>
            <rect x="480" y="170" width="120" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="540" y="202" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">VP9</text>
            <rect x="620" y="170" width="140" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="690" y="202" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">ProRes</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">同じ「MP4」でも中身が違う</div>
        <svg viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
            {/* MP4 box with different contents */}
            <rect x="40" y="20" width="220" height="180" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
            <text x="150" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">.MP4</text>
            <rect x="65" y="70" width="170" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="150" y="102" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">H.264</text>
            <text x="150" y="160" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">再生OK</text>
            <circle cx="150" cy="185" r="12" fill="#0d9488"/><text x="150" y="191" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">✓</text>
            {/* MP4 box with H.265 */}
            <rect x="290" y="20" width="220" height="180" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
            <text x="400" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">.MP4</text>
            <rect x="315" y="70" width="170" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="400" y="102" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ef4444">H.265</text>
            <text x="400" y="160" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">再生NG？</text>
            <circle cx="400" cy="185" r="12" fill="#ef4444"/><text x="400" y="191" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">✗</text>
            {/* MP4 box with AV1 */}
            <rect x="540" y="20" width="220" height="180" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
            <text x="650" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">.MP4</text>
            <rect x="565" y="70" width="170" height="50" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="650" y="102" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">AV1</text>
            <text x="650" y="160" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">端末次第</text>
            <circle cx="650" cy="185" r="12" fill="#d97706"/><text x="650" y="191" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">?</text>
        </svg>
        <div className="big-statement">箱は開けても<span className="accent-coral">中身が食べられない</span>ことがある</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">組み合わせ爆発</div>
        <svg viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg">
            {/* Left: containers */}
            <text x="130" y="25" textAnchor="middle" fontSize="18" fontWeight="900" fill="#2563eb">コンテナ 5種</text>
            <rect x="60" y="35" width="140" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <rect x="60" y="70" width="140" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <rect x="60" y="105" width="140" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <rect x="60" y="140" width="140" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <rect x="60" y="175" width="140" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            {/* Multiplication sign */}
            <text x="280" y="120" textAnchor="middle" fontSize="48" fontWeight="900" fill="#1a1d23">×</text>
            {/* Right: codecs */}
            <text x="430" y="25" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">コーデック 5種</text>
            <rect x="360" y="35" width="140" height="30" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <rect x="360" y="70" width="140" height="30" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <rect x="360" y="105" width="140" height="30" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <rect x="360" y="140" width="140" height="30" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <rect x="360" y="175" width="140" height="30" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            {/* Equals */}
            <text x="570" y="120" textAnchor="middle" fontSize="48" fontWeight="900" fill="#1a1d23">＝</text>
            {/* Result */}
            <rect x="620" y="55" width="140" height="110" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="3"/>
            <text x="690" y="105" textAnchor="middle" fontSize="48" fontWeight="900" fill="#ef4444">25</text>
            <text x="690" y="140" textAnchor="middle" fontSize="20" fontWeight="700" fill="#ef4444">通り</text>
        </svg>
        <div className="big-statement">実際は各10種以上 → <span className="accent-coral">100通り以上</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">コンテナの変遷</div>
        <div className="flow-chain">
            <div className="fc-node border-amber">
                <div className="year-badge">1992</div>
                <img src="https://api.iconify.design/mdi/microsoft.svg?color=%230078D4&width=48&height=48" alt="Microsoft" />
                <div className="fc-node-title">AVI</div>
                <div className="fc-node-sub">2GB制限</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-teal">
                <div className="year-badge">2002</div>
                <div className="fc-node-title">MKV</div>
                <div className="fc-node-sub">OSS・何でも入る</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node border-primary">
                <div className="year-badge">2010</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" />
                <div className="fc-node-title">WebM</div>
                <div className="fc-node-sub">Web向け軽量</div>
            </div>
        </div>
        <div className="source">MP4は2001年にISO標準化、MOVはApple独自規格</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="big-statement">コーデックを巡って<br /><span className="accent-coral">壮絶な争い</span>があった</div>
        <svg viewBox="0 0 780 160" xmlns="http://www.w3.org/2000/svg">
            {/* Tension lines */}
            <line x1="200" y1="80" x2="350" y2="80" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
            <line x1="430" y1="80" x2="580" y2="80" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
            {/* Left group */}
            <rect x="70" y="50" width="130" height="60" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="135" y="87" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ef4444">特許</text>
            {/* Center */}
            <rect x="340" y="40" width="100" height="80" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
            <text x="390" y="70" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">vs</text>
            <text x="390" y="100" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">技術</text>
            {/* Right group */}
            <rect x="580" y="50" width="130" height="60" rx="10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="645" y="87" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">無料</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">H.264 ― 動画配信の王者</div>
        <div className="metric-card border-primary">
            <div className="year-badge">2003年 登場</div>
            <div className="metric-value accent-primary">80%</div>
            <div className="metric-label">2026年現在のストリーミングシェア</div>
        </div>
        <div className="flow-chain">
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/youtube/youtube-original.svg" alt="YouTube" />
                <div className="fc-node-title">YouTube</div>
            </div>
            <div className="fc-node">
                <div className="fc-node-title">Blu-ray</div>
            </div>
            <div className="fc-node">
                <div className="fc-node-title">スマホ動画</div>
            </div>
        </div>
        <div className="source">出典: Streaming Media Encoding Survey 2026</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">H.265の登場と特許料問題</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <div className="compare-title accent-primary">H.264</div>
                <div className="compare-body">MPEG-2比で<br />データ量 半分</div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">H.265</div>
                <div className="compare-body">H.264比で<br />さらに半分</div>
            </div>
        </div>
        <div className="big-statement">技術は進化した。でも普及しなかった</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">H.265の特許プール分裂</div>
        <svg viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg">
            {/* H.264: 1 pool */}
            <text x="195" y="28" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">H.264</text>
            <rect x="80" y="40" width="230" height="70" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="195" y="72" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">MPEG LA</text>
            <text x="195" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">$0.20/台</text>
            {/* H.265: 3 pools */}
            <text x="585" y="28" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ef4444">H.265</text>
            <rect x="440" y="40" width="140" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="510" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ef4444">MPEG LA</text>
            <rect x="600" y="40" width="160" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="680" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ef4444">HEVC Advance</text>
            <rect x="520" y="100" width="160" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="600" y="132" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ef4444">Velos Media</text>
            {/* Arrow comparison */}
            <text x="195" y="150" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a1d23">↓</text>
            <text x="195" y="185" textAnchor="middle" fontSize="24" fontWeight="900" fill="#2563eb">1団体</text>
            <text x="195" y="215" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">シンプル</text>
            <text x="585" y="175" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a1d23">↓</text>
            <text x="585" y="205" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ef4444">3団体 = 約10倍</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">AOMedia結成（2015年）</div>
        <div className="enterprise-grid">
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" />
                <div className="card-title">Google</div>
            </div>
            <div className="enterprise-card">
                <img src="https://api.iconify.design/simple-icons/netflix.svg?color=%23E50914&width=36&height=36" alt="Netflix" />
                <div className="card-title">Netflix</div>
            </div>
            <div className="enterprise-card">
                <img src="https://api.iconify.design/mdi/microsoft.svg?color=%230078D4&width=36&height=36" alt="Microsoft" />
                <div className="card-title">Microsoft</div>
            </div>
            <div className="enterprise-card">
                <img src="https://api.iconify.design/simple-icons/intel.svg?color=%230071C5&width=36&height=36" alt="Intel" />
                <div className="card-title">Intel</div>
            </div>
            <div className="enterprise-card">
                <img src="https://api.iconify.design/simple-icons/cisco.svg?color=%231BA0D7&width=36&height=36" alt="Cisco" />
                <div className="card-title">Cisco</div>
            </div>
        </div>
        <div className="big-statement">ライバルが団結 → <span className="accent-teal">特許料ゼロ</span>のコーデックを作る</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">AV1の実力（2018年リリース）</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">H.264</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '100%;background:var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-primary">100%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">H.265</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '50%;background:var(--coral)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-coral">50%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">AV1</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '35%;background:var(--teal)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-teal">35%</div>
            </div>
        </div>
        <div className="source">同画質に必要なデータ量の比較（H.264を100%とした場合）</div>
        <div className="big-statement"><span className="accent-teal">ロイヤリティフリー</span> + 高圧縮</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">ハードウェア対応の世代差</div>
        <svg viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg">
            {/* Timeline axis */}
            <line x1="60" y1="100" x2="720" y2="100" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
            {/* H.264 */}
            <rect x="60" y="40" width="180" height="45" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="150" y="68" textAnchor="middle" fontSize="18" fontWeight="900" fill="#2563eb">H.264</text>
            <circle cx="100" cy="100" r="6" fill="#2563eb"/>
            <text x="100" y="128" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">2005年〜</text>
            <text x="150" y="155" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0d9488">ほぼ全端末OK</text>
            {/* H.265 */}
            <rect x="300" y="40" width="160" height="45" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="380" y="68" textAnchor="middle" fontSize="18" fontWeight="900" fill="#ef4444">H.265</text>
            <circle cx="360" cy="100" r="6" fill="#ef4444"/>
            <text x="360" y="128" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">2015年〜</text>
            <text x="380" y="155" textAnchor="middle" fontSize="16" fontWeight="900" fill="#d97706">最近の端末</text>
            {/* AV1 */}
            <rect x="540" y="40" width="160" height="45" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="620" y="68" textAnchor="middle" fontSize="18" fontWeight="900" fill="#d97706">AV1</text>
            <circle cx="600" cy="100" r="6" fill="#d97706"/>
            <text x="600" y="128" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">2022年〜</text>
            <text x="620" y="155" textAnchor="middle" fontSize="16" fontWeight="900" fill="#ef4444">新しい端末のみ</text>
            <text x="390" y="200" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">優秀 ≠ すぐ全員が使える</text>
        </svg>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">4つのトレードオフ</div>
        <svg viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">
            {/* Center circle */}
            <circle cx="390" cy="115" r="50" fill="#f8f9fa" stroke="#d1d5db" strokeWidth="3"/>
            <text x="390" y="110" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1a1d23">動画</text>
            <text x="390" y="130" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1a1d23">形式</text>
            {/* 4 corners */}
            <line x1="350" y1="80" x2="200" y2="30" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/>
            <rect x="100" y="10" width="120" height="50" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="160" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">画質</text>
            <line x1="430" y1="80" x2="580" y2="30" stroke="#0d9488" strokeWidth="3" strokeLinecap="round"/>
            <rect x="550" y="10" width="160" height="50" rx="10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="630" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">ファイルサイズ</text>
            <line x1="350" y1="150" x2="200" y2="200" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
            <rect x="90" y="180" width="140" height="50" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="160" y="212" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ef4444">ライセンス</text>
            <line x1="430" y1="150" x2="580" y2="200" stroke="#d97706" strokeWidth="3" strokeLinecap="round"/>
            <rect x="550" y="180" width="140" height="50" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="620" y="212" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">互換性</text>
        </svg>
        <div className="big-statement">4つ全部を満たす形式は<span className="accent-coral">存在しない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">用途で最適解が変わる</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/youtube/youtube-original.svg" alt="YouTube" />
                <div className="card-title">配信向け</div>
                <div className="card-body">MP4 + H.264<br />互換性が最優先</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" alt="Apple" />
                <div className="card-title">編集向け</div>
                <div className="card-body">ProRes / DNxHR<br />画質が最優先</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge amber">AV1</div>
                <div className="card-title">次世代配信</div>
                <div className="card-body">AV1<br />圧縮率+無料</div>
            </div>
        </div>
        <div className="big-statement">176Mbps vs 5Mbps ― <span className="accent-amber">20〜35倍</span>の差</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="scene-title">地デジの例</div>
        <svg viewBox="0 0 780 200" xmlns="http://www.w3.org/2000/svg">
            {/* TV broadcast */}
            <rect x="60" y="20" width="300" height="160" rx="12" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="210" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">フルセグ</text>
            <rect x="90" y="70" width="240" height="40" rx="8" fill="#dbeafe"/>
            <text x="210" y="97" textAnchor="middle" fontSize="20" fontWeight="700" fill="#2563eb">MPEG-2</text>
            <text x="210" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">高画質・広帯域</text>
            <text x="210" y="165" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0d9488">安定性重視</text>
            {/* Mobile */}
            <rect x="420" y="20" width="300" height="160" rx="12" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
            <text x="570" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="#d97706">ワンセグ</text>
            <rect x="450" y="70" width="240" height="40" rx="8" fill="#fef3c7"/>
            <text x="570" y="97" textAnchor="middle" fontSize="20" fontWeight="700" fill="#d97706">H.264</text>
            <text x="570" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">低解像度・狭帯域</text>
            <text x="570" y="165" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ef4444">圧縮率重視</text>
        </svg>
        <div className="big-statement">同じ放送でも帯域制約で<span className="accent-amber">最適なコーデックが違う</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <div className="scene-title">終わらないサイクル</div>
        <svg viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg">
            {/* Cycle: New codec -> patent -> alternative -> repeat */}
            <rect x="50" y="30" width="180" height="60" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="140" y="67" textAnchor="middle" fontSize="18" fontWeight="900" fill="#2563eb">新コーデック誕生</text>
            <path d="M 230 60 Q 290 60 310 100" fill="none" stroke="#1a1d23" strokeWidth="3" markerEnd="url(#arrow)"/>
            <rect x="280" y="100" width="200" height="60" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="380" y="137" textAnchor="middle" fontSize="18" fontWeight="900" fill="#ef4444">特許で揉める</text>
            <path d="M 480 130 Q 540 130 560 90" fill="none" stroke="#1a1d23" strokeWidth="3" markerEnd="url(#arrow)"/>
            <rect x="520" y="30" width="210" height="60" rx="10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="625" y="67" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">対抗規格が誕生</text>
            {/* Loop arrow back */}
            <path d="M 625 90 Q 625 190 390 190 Q 140 190 140 90" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="8 4"/>
            <text x="390" y="210" textAnchor="middle" fontSize="18" fontWeight="900" fill="#d97706">繰り返し…</text>
            <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1d23"/></marker></defs>
        </svg>
        <div className="big-statement">「いつか1つに統一」は<span className="accent-coral">たぶん来ない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-24">
    <div className="content center-layout">
        <div className="scene-title">最初の問いに戻る</div>
        <svg viewBox="0 0 780 200" xmlns="http://www.w3.org/2000/svg">
            {/* Before */}
            <rect x="40" y="20" width="320" height="160" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
            <text x="200" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ef4444">以前の理解</text>
            <text x="200" y="90" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">「とりあえずMP4」</text>
            <text x="200" y="125" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">なぜ選ぶかは不明</text>
            <text x="200" y="155" textAnchor="middle" fontSize="18" fontWeight="700" fill="#ef4444">形式が多くて混乱</text>
            {/* Arrow */}
            <text x="390" y="110" textAnchor="middle" fontSize="36" fontWeight="900" fill="#2563eb">→</text>
            {/* After */}
            <rect x="420" y="20" width="320" height="160" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="580" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">今の理解</text>
            <text x="580" y="90" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1d23">「MP4はただの箱」</text>
            <text x="580" y="125" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">中身のコーデックが大事</text>
            <text x="580" y="155" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">用途で選べばいい</text>
        </svg>
        <div className="big-statement">形式が多いのは<span className="accent-primary">バグじゃなく仕様</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene25: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-25">
    <div className="content center-layout">
        <div className="scene-title">今日のまとめ</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-text">コンテナとコーデックの<span className="accent-primary">2層構造</span>がある</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--coral)' }}>2</div>
                <div className="num-text">画質・サイズ・互換性・ライセンスは<span className="accent-coral">同時に満たせない</span></div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--teal)' }}>3</div>
                <div className="num-text">だから用途に応じた<span className="accent-teal">「正解」が複数</span>存在する</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene26: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-26">
    <div className="content center-layout">
        <div className="title-large">ご視聴ありがとうございました</div>
        <div className="flow-chain" style={{ marginTop: '20px' }}>
            <div className="fc-node highlight">
                <div className="fc-node-title">MP4</div>
                <div className="fc-node-sub">コンテナ</div>
            </div>
            <div className="fc-arr">+</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">H.264</div>
                <div className="fc-node-sub">コーデック</div>
            </div>
            <div className="fc-arr">＝</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">最も互換性が高い</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '16px' }}>チャンネル登録お願いします！</div>
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
};

export const TOTAL_SCENE_COUNT = 27;
