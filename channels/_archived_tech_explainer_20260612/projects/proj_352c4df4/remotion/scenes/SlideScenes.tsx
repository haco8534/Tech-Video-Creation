import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://api.iconify.design/mdi/image-multiple.svg?color=%236d28d9&width=72&height=72" alt="photos" />
        </div>
        <div className="title-large">ネットに一度上げた写真は<br />なぜ完全に消せないのか</div>
        <div className="title-sub">削除ボタンの裏側で起きている5つの壁</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">消せない構造を想像する</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/* 中央: あなた */}
                <circle cx="390" cy="120" r="30" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="3"/>
                <circle cx="390" cy="105" r="14" fill="var(--primary)"/>
                <path d="M370 123 C370 112 410 112 410 123 L410 135 Q390 143 370 135 Z" fill="var(--primary)"/>
                <text x="390" y="175" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--primary)">あなた</text>
                {/* 放射状の手紙コピー */}
                <g fill="var(--teal)" opacity="0.8">
                    <rect x="60" y="30" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="85" y="53" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">Copy</text>
                    <rect x="170" y="10" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="195" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">Copy</text>
                    <rect x="560" y="10" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="585" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">Copy</text>
                    <rect x="670" y="30" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="695" y="53" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">Copy</text>
                    <rect x="30" y="120" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="55" y="143" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">Copy</text>
                    <rect x="700" y="120" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="725" y="143" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">Copy</text>
                    <rect x="100" y="195" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="2"/>
                    <text x="125" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--coral)">転載</text>
                    <rect x="630" y="195" width="50" height="36" rx="4" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="2"/>
                    <text x="655" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--coral)">転載</text>
                </g>
                {/* 放射線 */}
                <line x1="360" y1="110" x2="110" y2="48" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="365" y1="105" x2="220" y2="28" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="415" y1="105" x2="560" y2="28" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="420" y1="110" x2="670" y2="48" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="360" y1="125" x2="80" y2="138" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="420" y1="125" x2="700" y2="138" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                {/* 転載の矢印(コピーのコピー) */}
                <line x1="85" y1="56" x2="125" y2="195" stroke="var(--coral)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="695" y1="56" x2="655" y2="195" stroke="var(--coral)" strokeWidth="1.5" strokeDasharray="4 3"/>
            </svg>
        </div>
        <div className="big-statement">100人に配った手紙のコピーを<span className="accent-coral">全部回収できるか？</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">インターネットの設計思想</div>
        <div className="photo-text-row">
            <figure className="photo-frame">
                <img src={staticFile("images/paul_baran.jpg")} alt="ポール・バラン" />
            </figure>
            <div className="photo-text-side">
                <div className="svg-diagram">
                    <svg width="460" height="220" viewBox="0 0 460 220">
                        {/* 左: 中央集権ネットワーク */}
                        <text x="100" y="20" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">中央集権型</text>
                        {/* center hub */}
                        <circle cx="100" cy="110" r="18" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="3"/>
                        <text x="100" y="115" textAnchor="middle" fontSize="11" fontWeight="900" fill="var(--coral)">HUB</text>
                        {/* spokes */}
                        <circle cx="40" cy="55" r="10" fill="var(--border)"/><line x1="48" y1="62" x2="85" y2="97" stroke="var(--border)" strokeWidth="2"/>
                        <circle cx="160" cy="55" r="10" fill="var(--border)"/><line x1="152" y1="62" x2="115" y2="97" stroke="var(--border)" strokeWidth="2"/>
                        <circle cx="40" cy="165" r="10" fill="var(--border)"/><line x1="48" y1="158" x2="85" y2="123" stroke="var(--border)" strokeWidth="2"/>
                        <circle cx="160" cy="165" r="10" fill="var(--border)"/><line x1="152" y1="158" x2="115" y2="123" stroke="var(--border)" strokeWidth="2"/>
                        <circle cx="100" cy="190" r="10" fill="var(--border)"/><line x1="100" y1="180" x2="100" y2="128" stroke="var(--border)" strokeWidth="2"/>
                        {/* X mark */}
                        <line x1="88" y1="98" x2="112" y2="122" stroke="var(--coral)" strokeWidth="4" strokeLinecap="round"/>
                        <line x1="112" y1="98" x2="88" y2="122" stroke="var(--coral)" strokeWidth="4" strokeLinecap="round"/>
                        <text x="100" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--coral)">1点が壊れたら全滅</text>
                        {/* 右: 分散ネットワーク */}
                        <text x="360" y="20" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">分散型（ARPANET）</text>
                        {/* メッシュノード */}
                        <circle cx="300" cy="60" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="360" cy="45" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="420" cy="60" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="280" cy="110" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="340" cy="110" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="400" cy="110" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="300" cy="160" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="360" cy="175" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        <circle cx="420" cy="160" r="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                        {/* メッシュ接続線 */}
                        <g stroke="var(--teal)" strokeWidth="1.5" opacity="0.5">
                            <line x1="300" y1="60" x2="360" y2="45"/><line x1="360" y1="45" x2="420" y2="60"/>
                            <line x1="300" y1="60" x2="280" y2="110"/><line x1="300" y1="60" x2="340" y2="110"/>
                            <line x1="360" y1="45" x2="340" y2="110"/><line x1="360" y1="45" x2="400" y2="110"/>
                            <line x1="420" y1="60" x2="400" y2="110"/>
                            <line x1="280" y1="110" x2="340" y2="110"/><line x1="340" y1="110" x2="400" y2="110"/>
                            <line x1="280" y1="110" x2="300" y2="160"/><line x1="340" y1="110" x2="360" y2="175"/>
                            <line x1="400" y1="110" x2="420" y2="160"/><line x1="340" y1="110" x2="300" y2="160"/>
                            <line x1="300" y1="160" x2="360" y2="175"/><line x1="360" y1="175" x2="420" y2="160"/>
                            <line x1="400" y1="110" x2="360" y2="175"/>
                        </g>
                        <text x="360" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--teal)">一部が壊れても生存</text>
                        {/* 矢印 */}
                        <text x="230" y="115" textAnchor="middle" fontSize="28" fontWeight="900" fill="var(--primary)">→</text>
                    </svg>
                </div>
            </div>
        </div>
        <div className="big-statement">「壊れにくい」は<span className="accent-coral">「消しにくい」</span>と表裏一体</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">HTTP DELETEの現実</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* User */}
                <circle cx="80" cy="75" r="14" fill="var(--primary)"/>
                <path d="M60 93 C60 82 100 82 100 93 L100 105 Q80 113 60 105 Z" fill="var(--primary)"/>
                <text x="80" y="135" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--primary)">あなた</text>
                {/* DELETE request arrow */}
                <line x1="120" y1="85" x2="260" y2="85" stroke="var(--coral)" strokeWidth="3" markerEnd="url(#arrowR)"/>
                <text x="190" y="75" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--coral)">DELETE</text>
                <defs><marker id="arrowR" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="var(--coral)"/></marker></defs>
                {/* Server A (target) */}
                <rect x="270" y="55" width="100" height="60" rx="8" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="3"/>
                <text x="320" y="82" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--teal)">Server A</text>
                <text x="320" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">応じるかは任意</text>
                {/* 他サーバー（コピーが残る） */}
                <rect x="480" y="15" width="90" height="50" rx="8" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="2"/>
                <text x="525" y="35" textAnchor="middle" fontSize="13" fontWeight="900" fill="var(--text)">Server B</text>
                <text x="525" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--coral)">コピー残存</text>
                <rect x="480" y="80" width="90" height="50" rx="8" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="2"/>
                <text x="525" y="100" textAnchor="middle" fontSize="13" fontWeight="900" fill="var(--text)">Server C</text>
                <text x="525" y="117" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--coral)">コピー残存</text>
                <rect x="480" y="145" width="90" height="50" rx="8" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="2"/>
                <text x="525" y="165" textAnchor="middle" fontSize="13" fontWeight="900" fill="var(--text)">Server D</text>
                <text x="525" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--coral)">コピー残存</text>
                {/* X marks on dashed lines */}
                <line x1="370" y1="75" x2="480" y2="40" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="370" y1="85" x2="480" y2="105" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="370" y1="95" x2="480" y2="170" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4"/>
                {/* X marks */}
                <text x="420" y="52" fontSize="24" fontWeight="900" fill="var(--coral)">×</text>
                <text x="420" y="100" fontSize="24" fontWeight="900" fill="var(--coral)">×</text>
                <text x="420" y="145" fontSize="24" fontWeight="900" fill="var(--coral)">×</text>
                {/* Label */}
                <text x="650" y="110" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">DELETEは</text>
                <text x="650" y="135" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">届かない</text>
            </svg>
        </div>
        <div className="big-statement">1つのサーバーへの<span className="accent-coral">「お願い」</span>に過ぎない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">「削除」= 参照の解除</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/* 本のメタファー */}
                {/* 目次ページ(左) */}
                <rect x="40" y="20" width="200" height="200" rx="8" fill="var(--card-bg)" stroke="var(--primary)" strokeWidth="3"/>
                <text x="140" y="50" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--primary)">目次</text>
                <line x1="60" y1="60" x2="220" y2="60" stroke="var(--border)" strokeWidth="1"/>
                <text x="70" y="82" fontSize="14" fontWeight="700" fill="var(--text)">写真A .... p.12</text>
                {/* 取り消し線 */}
                <line x1="65" y1="79" x2="215" y2="79" stroke="var(--coral)" strokeWidth="3"/>
                <text x="70" y="106" fontSize="14" fontWeight="700" fill="var(--text)">写真B .... p.34</text>
                <text x="70" y="130" fontSize="14" fontWeight="700" fill="var(--text)">写真C .... p.56</text>
                <text x="140" y="175" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">目次から消した</text>
                {/* 矢印 */}
                <text x="310" y="120" fontSize="36" fontWeight="900" fill="var(--primary)">→</text>
                {/* データページ(右) */}
                <rect x="370" y="20" width="200" height="200" rx="8" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="3"/>
                <text x="470" y="50" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">ディスク上</text>
                <line x1="390" y1="60" x2="550" y2="60" stroke="var(--border)" strokeWidth="1"/>
                {/* 写真のイメージ(小さな正方形) */}
                <rect x="395" y="70" width="45" height="45" rx="4" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                <text x="417" y="98" textAnchor="middle" fontSize="11" fontWeight="900" fill="var(--teal)">A</text>
                <rect x="448" y="70" width="45" height="45" rx="4" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="470" y="98" textAnchor="middle" fontSize="11" fontWeight="900" fill="var(--primary)">B</text>
                <rect x="501" y="70" width="45" height="45" rx="4" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="2"/>
                <text x="523" y="98" textAnchor="middle" fontSize="11" fontWeight="900" fill="var(--amber)">C</text>
                <text x="470" y="150" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--teal)">データは</text>
                <text x="470" y="175" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--teal)">そのまま残存</text>
                {/* = */}
                <text x="640" y="120" fontSize="36" fontWeight="900" fill="var(--text)">=</text>
                {/* 結論ボックス */}
                <rect x="680" y="70" width="90" height="90" rx="12" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="3"/>
                <text x="725" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--coral)">復元</text>
                <text x="725" y="130" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--coral)">可能</text>
            </svg>
        </div>
        <div className="big-statement">ファイルシステムもHTTPも、<span className="accent-primary">同じ構造</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">CDNが作る自動コピーの網</div>
        <div className="svg-diagram">
            <svg width="780" height="240" viewBox="0 0 780 240">
                {/* 簡略世界地図（大陸のシルエット的な配置） */}
                {/* Origin server */}
                <rect x="340" y="85" width="100" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="3"/>
                <text x="390" y="108" textAnchor="middle" fontSize="13" fontWeight="900" fill="var(--primary)">元サーバー</text>
                <text x="390" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--primary)">削除実行</text>
                {/* CDN nodes worldwide */}
                <g>
                    {/* 北米 */}
                    <circle cx="120" cy="60" r="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="120" y="65" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--teal)">NA</text>
                    {/* 欧州 */}
                    <circle cx="420" cy="30" r="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="420" y="35" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--teal)">EU</text>
                    {/* アジア */}
                    <circle cx="650" cy="55" r="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="650" y="60" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--teal)">AS</text>
                    {/* 南米 */}
                    <circle cx="180" cy="180" r="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="180" y="185" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--teal)">SA</text>
                    {/* アフリカ */}
                    <circle cx="430" cy="190" r="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="430" y="195" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--teal)">AF</text>
                    {/* オセアニア */}
                    <circle cx="680" cy="190" r="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="2"/>
                    <text x="680" y="195" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--teal)">OC</text>
                </g>
                {/* 接続線 (origin → CDN nodes) */}
                <g stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5">
                    <line x1="340" y1="105" x2="136" y2="65"/>
                    <line x1="390" y1="85" x2="415" y2="46"/>
                    <line x1="440" y1="100" x2="634" y2="60"/>
                    <line x1="370" y1="135" x2="190" y2="170"/>
                    <line x1="410" y1="135" x2="430" y2="174"/>
                    <line x1="440" y1="125" x2="670" y2="178"/>
                </g>
                {/* キャッシュラベル */}
                <text x="120" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">cache</text>
                <text x="420" y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">cache</text>
                <text x="650" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">cache</text>
                <text x="180" y="215" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">cache</text>
                <text x="430" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">cache</text>
                <text x="680" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">cache</text>
                {/* Cloudflare badge */}
                <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" x="45" y="130" width="40" height="40"/>
                <text x="65" y="185" textAnchor="middle" fontSize="13" fontWeight="900" fill="var(--text)">330都市+</text>
            </svg>
        </div>
        <div className="big-statement">1枚の写真が<span className="accent-teal">世界中に自動コピー</span>される</div>
        <div className="source">出典: Cloudflare Network Map 2025</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">SNSの写真の規模</div>
        <div className="metric-row">
            <div className="metric-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" style={{ width: '40px', height: '40px', margin: '0 auto 8px' }} />
                <div className="metric-value accent-primary">2400億枚</div>
                <div className="metric-label">Metaの保存写真</div>
            </div>
            <div className="metric-card border-coral">
                <div className="metric-value accent-coral">+3.5億/日</div>
                <div className="metric-label">毎日の増加量</div>
            </div>
        </div>
        <div className="big-statement">ストレージは<span className="accent-amber">エクサバイト</span>規模（ギガの10億倍）</div>
        <div className="source">出典: Meta Engineering Blog</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">アナログホール</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* スマホ画面 */}
                <rect x="60" y="20" width="120" height="180" rx="16" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="3"/>
                <rect x="72" y="40" width="96" height="130" rx="4" fill="var(--primary-light)"/>
                {/* 画像プレースホルダ */}
                <rect x="82" y="55" width="76" height="60" rx="4" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="1.5"/>
                <text x="120" y="90" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--teal)">写真</text>
                <text x="120" y="145" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text)">画面に表示</text>
                {/* 矢印1: 画面→目 */}
                <line x1="190" y1="100" x2="270" y2="100" stroke="var(--primary)" strokeWidth="3" markerEnd="url(#arrowR2)"/>
                <text x="230" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--primary)">光</text>
                <defs><marker id="arrowR2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="var(--primary)"/></marker></defs>
                {/* 目 */}
                <ellipse cx="310" cy="100" rx="30" ry="20" fill="var(--card-bg)" stroke="var(--text)" strokeWidth="3"/>
                <circle cx="310" cy="100" r="10" fill="var(--primary)"/>
                <circle cx="310" cy="100" r="4" fill="var(--text)"/>
                <text x="310" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">人間の目</text>
                {/* 矢印2: 目→スクショ */}
                <line x1="350" y1="100" x2="430" y2="100" stroke="var(--coral)" strokeWidth="3" markerEnd="url(#arrowR3)"/>
                <text x="390" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">判断</text>
                <defs><marker id="arrowR3" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="var(--coral)"/></marker></defs>
                {/* スクショ操作 */}
                <rect x="440" y="50" width="120" height="100" rx="12" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="3"/>
                <text x="500" y="90" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--coral)">スクショ</text>
                <text x="500" y="115" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--coral)">保存・共有</text>
                {/* 拡散 */}
                <line x1="560" y1="80" x2="640" y2="50" stroke="var(--coral)" strokeWidth="2" strokeDasharray="5 3"/>
                <line x1="560" y1="100" x2="640" y2="100" stroke="var(--coral)" strokeWidth="2" strokeDasharray="5 3"/>
                <line x1="560" y1="120" x2="640" y2="150" stroke="var(--coral)" strokeWidth="2" strokeDasharray="5 3"/>
                <rect x="640" y="30" width="80" height="36" rx="6" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="680" y="53" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">まとめサイト</text>
                <rect x="640" y="82" width="80" height="36" rx="6" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="680" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">SNS拡散</text>
                <rect x="640" y="134" width="80" height="36" rx="6" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="680" y="157" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--coral)">保存済み</text>
                {/* ラベル */}
                <text x="390" y="195" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">見えた時点で制御不能</text>
            </svg>
        </div>
        <div className="big-statement">どんな技術でも<span className="accent-coral">「目に見えた瞬間」</span>は防げない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">組織的アーカイブ</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* Wayback Machine (大きなサーバー群) */}
                <rect x="80" y="20" width="280" height="180" rx="12" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="3"/>
                <image href="https://api.iconify.design/mdi/archive.svg?color=%236d28d9&width=40&height=40" x="95" y="30" width="40" height="40"/>
                <text x="220" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--primary)">Wayback Machine</text>
                {/* 数値 */}
                <text x="220" y="90" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--text)">1兆ページ以上</text>
                <text x="220" y="115" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">99ペタバイト保存</text>
                <text x="220" y="145" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--teal)">+150TB / 日</text>
                <text x="220" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text)">出典: Internet Archive 2025</text>
                {/* 日本のアーカイブ文化 */}
                <rect x="430" y="20" width="280" height="180" rx="12" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="3"/>
                <text x="570" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--coral)">日本の「魚拓」文化</text>
                {/* 人物シルエット群 (小型) */}
                <g>
                    <circle cx="480" cy="100" r="10" fill="var(--coral)"/>
                    <path d="M465 118 C465 109 495 109 495 118 L495 126 Q480 132 465 126 Z" fill="var(--coral)"/>
                    <circle cx="530" cy="100" r="10" fill="var(--coral)"/>
                    <path d="M515 118 C515 109 545 109 545 118 L545 126 Q530 132 515 126 Z" fill="var(--coral)"/>
                    <circle cx="580" cy="100" r="10" fill="var(--coral)"/>
                    <path d="M565 118 C565 109 595 109 595 118 L595 126 Q580 132 565 126 Z" fill="var(--coral)"/>
                    <circle cx="630" cy="100" r="10" fill="var(--coral)"/>
                    <path d="M615 118 C615 109 645 109 645 118 L645 126 Q630 132 615 126 Z" fill="var(--coral)"/>
                    <circle cx="680" cy="100" r="10" fill="var(--coral)"/>
                    <path d="M665 118 C665 109 695 109 695 118 L695 126 Q680 132 665 126 Z" fill="var(--coral)"/>
                </g>
                <text x="570" y="160" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--coral)">炎上 → 瞬時に保存</text>
                <text x="570" y="185" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--coral)">消す前に誰かが保存</text>
            </svg>
        </div>
        <div className="big-statement">削除依頼は可能、しかし<span className="accent-coral">ダウンロード済みは取り戻せない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">ストライサンド効果（2003年）</div>
        <div className="photo-text-row">
            <figure className="photo-frame">
                <img src={staticFile("images/barbra_streisand.jpg")} alt="バーブラ・ストライサンド" />
            </figure>
            <div className="photo-text-side">
                <div className="streisand-compare">
                    <div className="streisand-num">
                        <div className="streisand-val accent-teal">6回</div>
                        <div className="streisand-label">訴訟前の閲覧数</div>
                        <div className="streisand-label">（うち2回は弁護士）</div>
                    </div>
                    <div className="streisand-arrow">→</div>
                    <div className="streisand-num">
                        <div className="streisand-val accent-coral">42万+</div>
                        <div className="streisand-label">訴訟後の閲覧数</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="big-statement">消そうとする行為が<span className="accent-coral">注目を集め拡散を加速</span>させる</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">GDPR「忘れられる権利」の現実</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* 左: 検索結果 (見かけ上の削除) */}
                <rect x="50" y="20" width="300" height="180" rx="10" fill="var(--card-bg)" stroke="var(--teal)" strokeWidth="3"/>
                <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" x="65" y="30" width="30" height="30"/>
                <text x="200" y="52" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">Google検索結果</text>
                <line x1="70" y1="65" x2="330" y2="65" stroke="var(--border)" strokeWidth="1"/>
                {/* 検索結果行（取り消し線あり） */}
                <rect x="70" y="75" width="260" height="24" rx="4" fill="var(--teal-light)"/>
                <text x="200" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal)">example.com/photo.jpg</text>
                <line x1="80" y1="87" x2="320" y2="87" stroke="var(--coral)" strokeWidth="2.5"/>
                <text x="200" y="120" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--teal)">リンク非表示</text>
                {/* 承認率ゲージ */}
                <text x="200" y="150" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">承認率</text>
                <rect x="100" y="158" width="200" height="16" rx="4" fill="var(--primary-light)"/>
                <rect x="100" y="158" width="112" height="16" rx="4" fill="var(--primary)"/>
                <text x="200" y="192" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--primary)">約56%</text>
                {/* 矢印 */}
                <text x="400" y="115" fontSize="36" fontWeight="900" fill="var(--text)">≠</text>
                {/* 右: 元サーバー (データ残存) */}
                <rect x="440" y="20" width="300" height="180" rx="10" fill="var(--card-bg)" stroke="var(--coral)" strokeWidth="3"/>
                <text x="590" y="52" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--coral)">元サーバー上のデータ</text>
                <line x1="460" y1="65" x2="720" y2="65" stroke="var(--border)" strokeWidth="1"/>
                {/* データブロック */}
                <rect x="490" y="80" width="200" height="70" rx="8" fill="var(--coral-light)" stroke="var(--coral)" strokeWidth="2"/>
                <text x="590" y="108" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--coral)">photo.jpg</text>
                <text x="590" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--coral)">削除されていない</text>
                <text x="590" y="180" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--coral)">また「参照を消す」だけ</text>
            </svg>
        </div>
        <div className="source">出典: Google Transparency Report</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">国ごとに異なる法的対応</div>
        <div className="three-col">
            <div className="arch-card border-teal">
                <img src="https://flagicons.lipis.dev/flags/4x3/eu.svg" alt="EU" />
                <div className="card-title">EU</div>
                <div className="card-body">GDPR第17条で<br />削除請求権を保障</div>
            </div>
            <div className="arch-card border-coral">
                <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" alt="US" />
                <div className="card-title">アメリカ</div>
                <div className="card-body">表現の自由が優先<br />忘れられる権利なし</div>
            </div>
            <div className="arch-card border-amber">
                <img src="https://flagicons.lipis.dev/flags/4x3/jp.svg" alt="JP" />
                <div className="card-title">日本</div>
                <div className="card-body">包括制度なし<br />個別判例のみ</div>
            </div>
        </div>
        <div className="big-statement">「消せない」と<span className="accent-coral">「消さない」</span>は全く別の問題</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">暗号シュレッディング</div>
        <div className="svg-diagram">
            <svg width="780" height="220" viewBox="0 0 780 220">
                {/* 左: 暗号化データ */}
                <rect x="30" y="30" width="180" height="140" rx="10" fill="var(--primary-light)" stroke="var(--primary)" strokeWidth="3"/>
                <text x="120" y="60" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--primary)">暗号化データ</text>
                {/* 暗号化された写真イメージ */}
                <rect x="55" y="72" width="50" height="40" rx="4" fill="var(--card-bg)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="80" y="97" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--primary)">X#k9</text>
                <rect x="115" y="72" width="50" height="40" rx="4" fill="var(--card-bg)" stroke="var(--primary)" strokeWidth="2"/>
                <text x="140" y="97" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--primary)">j&2m</text>
                <text x="120" y="145" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--primary)">世界中に残存</text>
                <text x="120" y="163" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--primary)">しかし読めない</text>
                {/* 中央: 鍵 */}
                <g>
                    {/* 鍵のシルエット(南京錠) */}
                    <rect x="330" y="50" width="120" height="80" rx="10" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="3"/>
                    <text x="390" y="80" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--amber)">復号キー</text>
                    <text x="390" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--amber)">別の場所で管理</text>
                </g>
                {/* 矢印: 鍵を破壊 */}
                <line x1="390" y1="135" x2="390" y2="170" stroke="var(--coral)" strokeWidth="3"/>
                {/* X mark on key */}
                <line x1="370" y1="170" x2="410" y2="200" stroke="var(--coral)" strokeWidth="5" strokeLinecap="round"/>
                <line x1="410" y1="170" x2="370" y2="200" stroke="var(--coral)" strokeWidth="5" strokeLinecap="round"/>
                <text x="390" y="220" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--coral)">鍵を破棄</text>
                {/* 右: 結果 */}
                <rect x="560" y="30" width="190" height="140" rx="10" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="3"/>
                <text x="655" y="60" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--teal)">結果</text>
                <text x="655" y="90" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">データは物理的に</text>
                <text x="655" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">残っていても</text>
                <text x="655" y="145" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--teal)">実質的に消滅</text>
                {/* 接続矢印 */}
                <line x1="210" y1="100" x2="325" y2="85" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 4"/>
                <line x1="455" y1="85" x2="555" y2="95" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 4"/>
            </svg>
        </div>
        <div className="big-statement">ただし暗号化<span className="accent-amber">前</span>のコピーやスクショには効かない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">写真が消せない5つの層</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--primary)' }}>1</div>
                <div className="num-text">インターネットは「壊れにくさ」最優先の設計</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--teal)' }}>2</div>
                <div className="num-text">CDN・バックアップで世界中に自動コピー</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--amber)' }}>3</div>
                <div className="num-text">「削除」は目次を消すだけ。データ本体は残存</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--coral)' }}>4</div>
                <div className="num-text">スクショ・アーカイブは技術で止められない</div>
            </div>
            <div className="num-item">
                <div className="num-circle" style={{ background: 'var(--primary)' }}>5</div>
                <div className="num-text">法律は国ごとにバラバラ。完全削除を保証不可</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">最大の防御策</div>
        <div className="big-statement">
            削除ボタンで消えるのは<br />
            <span className="accent-coral">「あなたの画面から」</span>だけ
        </div>
        <div className="big-statement">
            仕組みを知ることが<br />
            <span className="accent-primary">最大の防御策</span>
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
};

export const TOTAL_SCENE_COUNT = 15;
