import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-deco">
            <img src="https://api.iconify.design/mdi/signal-5g.svg?color=%232563eb&width=72&height=72" />
        </div>
        <div className="title-large">5Gで世界は<br />変わった？</div>
        <div className="title-sub">理想と現実のギャップを検証する</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">5Gの理論値 vs 実測値</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 280" width="780" height="280">
                {/* 3本の信号強度バー */}
                {/* 理論値 20Gbps */}
                <rect x="80" y="30" width="620" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
                <rect x="80" y="30" width="620" height="60" rx="8" fill="#2563eb" opacity="0.15"/>
                <rect x="80" y="30" width="620" height="60" rx="8" fill="#2563eb"/>
                <text x="700" y="68" textAnchor="end" fontSize="28" fontWeight="900" fill="#ffffff">20Gbps</text>
                <text x="90" y="68" fontSize="22" fontWeight="700" fill="#ffffff">理論上の最大速度</text>
                {/* 実測平均 140Mbps */}
                <rect x="80" y="110" width="620" height="60" rx="8" fill="#dbeafe" stroke="#d97706" strokeWidth="2"/>
                <rect x="80" y="110" width="4.34" height="60" rx="4" fill="#d97706"/>
                <circle cx="88" cy="140" r="6" fill="#d97706"/>
                <text x="110" y="148" fontSize="22" fontWeight="700" fill="#d97706">140Mbps</text>
                <text x="240" y="148" fontSize="20" fontWeight="400" fill="#1a1d23">全国実測平均</text>
                {/* 山手線 47Mbps */}
                <rect x="80" y="190" width="620" height="60" rx="8" fill="#dbeafe" stroke="#dc2626" strokeWidth="2"/>
                <rect x="80" y="190" width="1.46" height="60" rx="2" fill="#dc2626"/>
                <circle cx="84" cy="220" r="6" fill="#dc2626"/>
                <text x="110" y="228" fontSize="22" fontWeight="700" fill="#dc2626">47Mbps</text>
                <text x="230" y="228" fontSize="20" fontWeight="400" fill="#1a1d23">山手線の駅間</text>
                {/* 倍率ラベル */}
                <text x="560" y="148" fontSize="18" fontWeight="700" fill="#d97706">理論値の1/140</text>
                <text x="560" y="228" fontSize="18" fontWeight="700" fill="#dc2626">理論値の1/425</text>
            </svg>
        </div>
        <div className="source">出典: ICT総研 2026年1月 5G通信速度実測調査</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">ガートナー ハイプサイクル</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 260" width="780" height="260">
                {/* ハイプサイクル曲線 */}
                <path d="M40 230 Q120 220 180 60 Q210 10 240 80 Q280 180 360 200 Q500 230 740 170"
                      fill="none" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
                {/* ピーク地点 */}
                <circle cx="190" cy="50" r="6" fill="#d1d5db"/>
                <text x="190" y="38" textAnchor="middle" fontSize="18" fill="#1a1d23" fontWeight="400">過度な期待</text>
                {/* 幻滅期マーカー */}
                <circle cx="310" cy="200" r="12" fill="#dc2626"/>
                <text x="310" y="205" textAnchor="middle" fontSize="14" fontWeight="900" fill="#ffffff">5G</text>
                <text x="310" y="240" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">幻滅期</text>
                {/* 生産性の安定期 */}
                <text x="650" y="160" textAnchor="middle" fontSize="18" fill="#1a1d23" fontWeight="400">生産性の安定期</text>
                {/* 軸ラベル */}
                <text x="400" y="256" textAnchor="middle" fontSize="18" fill="#1a1d23">時間</text>
            </svg>
        </div>
        <div className="big-statement">その<span className="accent-primary">「5G」</span>、<br />本当の5Gじゃないかもしれない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">Sub-6 vs ミリ波</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 280" width="780" height="280">
                {/* 周波数スペクトル帯 */}
                <rect x="40" y="20" width="700" height="30" rx="4" fill="#f3f4f6"/>
                {/* 4G帯域 */}
                <rect x="40" y="20" width="80" height="30" rx="4" fill="#d1d5db"/>
                <text x="80" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">4G</text>
                <text x="80" y="90" textAnchor="middle" fontSize="18" fill="#1a1d23">~3.5GHz</text>
                {/* Sub-6帯域 */}
                <rect x="140" y="20" width="120" height="30" rx="4" fill="#2563eb"/>
                <text x="200" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">Sub-6</text>
                <text x="200" y="90" textAnchor="middle" fontSize="18" fill="#2563eb">3.7~4.5GHz</text>
                {/* ミリ波帯域 */}
                <rect x="560" y="20" width="100" height="30" rx="4" fill="#0891b2"/>
                <text x="610" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0891b2">ミリ波</text>
                <text x="610" y="90" textAnchor="middle" fontSize="18" fill="#0891b2">28GHz</text>
                {/* Sub-6の電波イメージ: 広い波 */}
                <g transform="translate(100, 130)">
                    {/* 基地局タワー */}
                    <rect x="0" y="30" width="8" height="70" fill="#2563eb"/>
                    <polygon points="-8,30 4,10 16,30" fill="#2563eb"/>
                    {/* 電波 同心円 */}
                    <path d="M20 50 Q100 20 200 50" fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.6"/>
                    <path d="M20 50 Q100 0 250 50" fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.4"/>
                    <path d="M20 50 Q100 -20 300 50" fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.2"/>
                    <text x="160" y="90" textAnchor="middle" fontSize="20" fontWeight="700" fill="#2563eb">広範囲カバー</text>
                    <text x="160" y="115" textAnchor="middle" fontSize="18" fill="#1a1d23">障害物も回り込む</text>
                </g>
                {/* ミリ波の電波イメージ: 狭い直線 */}
                <g transform="translate(460, 130)">
                    {/* 基地局タワー */}
                    <rect x="0" y="30" width="8" height="70" fill="#0891b2"/>
                    <polygon points="-8,30 4,10 16,30" fill="#0891b2"/>
                    {/* 直進する電波 */}
                    <line x1="20" y1="40" x2="120" y2="40" stroke="#0891b2" strokeWidth="3"/>
                    <line x1="20" y1="50" x2="100" y2="50" stroke="#0891b2" strokeWidth="2" opacity="0.5"/>
                    <line x1="20" y1="60" x2="80" y2="60" stroke="#0891b2" strokeWidth="2" opacity="0.3"/>
                    <polygon points="120,35 130,40 120,45" fill="#0891b2"/>
                    <text x="140" y="90" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0891b2">超高速だが直進のみ</text>
                    <text x="140" y="115" textAnchor="middle" fontSize="18" fill="#1a1d23">1Gbps超の実力</text>
                </g>
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
        <div className="scene-title">ミリ波の物理的限界</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 260" width="780" height="260">
                {/* 基地局 */}
                <rect x="30" y="80" width="10" height="80" fill="#0891b2"/>
                <polygon points="22,80 35,55 48,80" fill="#0891b2"/>
                {/* 電波の矢印 */}
                <line x1="50" y1="100" x2="200" y2="100" stroke="#0891b2" strokeWidth="3" strokeDasharray="8,4"/>
                <polygon points="200,95 212,100 200,105" fill="#0891b2"/>
                {/* 到達距離: 500m */}
                <rect x="210" y="60" width="130" height="50" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
                <text x="275" y="82" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0891b2">到達距離</text>
                <text x="275" y="102" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0891b2">500m</text>
                {/* 壁で消失 */}
                <rect x="380" y="40" width="16" height="120" rx="2" fill="#d1d5db"/>
                <text x="388" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">壁</text>
                <line x1="350" y1="100" x2="376" y2="100" stroke="#dc2626" strokeWidth="3"/>
                <line x1="400" y1="100" x2="420" y2="100" stroke="#dc2626" strokeWidth="1" opacity="0.2"/>
                <text x="430" y="82" fontSize="18" fontWeight="700" fill="#dc2626">90~95%</text>
                <text x="430" y="105" fontSize="18" fontWeight="700" fill="#dc2626">消失</text>
                {/* 雨で減衰 */}
                <g transform="translate(560, 40)">
                    {/* 雲 */}
                    <ellipse cx="60" cy="20" rx="50" ry="18" fill="#d1d5db"/>
                    {/* 雨粒 */}
                    <line x1="40" y1="40" x2="36" y2="60" stroke="#2563eb" strokeWidth="2" opacity="0.5"/>
                    <line x1="55" y1="42" x2="51" y2="62" stroke="#2563eb" strokeWidth="2" opacity="0.5"/>
                    <line x1="70" y1="40" x2="66" y2="60" stroke="#2563eb" strokeWidth="2" opacity="0.5"/>
                    <line x1="85" y1="42" x2="81" y2="62" stroke="#2563eb" strokeWidth="2" opacity="0.5"/>
                    {/* 電波が弱まるイメージ */}
                    <line x1="20" y1="90" x2="100" y2="90" stroke="#0891b2" strokeWidth="2" opacity="0.3" strokeDasharray="4,4"/>
                    <text x="60" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">雨で更に減衰</text>
                </g>
                {/* 結論ライン */}
                <text x="390" y="210" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">全国カバーは物理的に非現実的</text>
                <text x="390" y="240" textAnchor="middle" fontSize="18" fill="#1a1d23">基地局を数百mおきに設置するコストが膨大</text>
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
        <div className="scene-title">「なんちゃって5G」の正体</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 280" width="780" height="280">
                {/* 左: 4G周波数帯 */}
                <rect x="40" y="40" width="200" height="80" rx="12" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
                <text x="140" y="72" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">4G周波数帯</text>
                <text x="140" y="100" textAnchor="middle" fontSize="18" fill="#1a1d23">700MHz / 900MHz</text>
                {/* 矢印: 転用 */}
                <line x1="260" y1="80" x2="340" y2="80" stroke="#d97706" strokeWidth="3"/>
                <polygon points="340,74 354,80 340,86" fill="#d97706"/>
                <text x="300" y="65" textAnchor="middle" fontSize="18" fontWeight="900" fill="#d97706">転用</text>
                {/* 右: 5G表示 */}
                <rect x="370" y="30" width="200" height="100" rx="12" fill="#ffffff" stroke="#d97706" strokeWidth="3"/>
                {/* スマホ画面風 */}
                <rect x="430" y="45" width="80" height="40" rx="6" fill="#fef3c7"/>
                <text x="470" y="74" textAnchor="middle" fontSize="24" fontWeight="900" fill="#d97706">5G</text>
                <text x="470" y="115" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">表示されるが...</text>
                {/* 速度は4G同等 */}
                <rect x="610" y="40" width="150" height="80" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="685" y="72" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">速度は</text>
                <text x="685" y="100" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">4G同等</text>
                {/* 下部: ドコモの経緯 */}
                <rect x="80" y="165" width="280" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
                <text x="220" y="196" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">ドコモ: 当初「優良誤認」と抵抗</text>
                <line x1="360" y1="190" x2="420" y2="190" stroke="#1a1d23" strokeWidth="2"/>
                <polygon points="420,185 432,190 420,195" fill="#1a1d23"/>
                <rect x="440" y="165" width="280" height="50" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <text x="580" y="196" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">2022年: 競争圧力で方針転換</text>
                {/* 結論 */}
                <text x="390" y="260" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1a1d23">期待と現実のギャップが不満を生む</text>
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
        <div className="scene-title">5Gカバー率の「数字」と「実態」</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">総務省発表<br />人口カバー率</div>
                <div className="bar-track">
                    <div className="bar-fill bar-fill-primary" style={{ '--w': '98.4%' } as React.CSSProperties}></div>
                </div>
                <div className="bar-value accent-primary">98.4%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">ICT総研<br />729地点の実測</div>
                <div className="bar-track">
                    <div className="bar-fill bar-fill-coral" style={{ '--w': '67.9%' } as React.CSSProperties}></div>
                </div>
                <div className="bar-value accent-coral">67.9%</div>
            </div>
        </div>
        <div className="source">出典: 総務省 5G人口カバー率 / ICT総研 2026年 729地点実測調査</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">通信世代とキラーアプリ</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">2G</div>
                <div className="fc-node-sub">SMS / iモード</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">3G</div>
                <div className="fc-node-sub">iPhone</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">4G</div>
                <div className="fc-node-sub">YouTube / Netflix</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight-coral">
                <div className="fc-node-title">5G</div>
                <div className="fc-node-sub">???</div>
            </div>
        </div>
        <div className="big-statement">5Gの<span className="accent-coral">キラーアプリ</span>はまだない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">道路はあるのに、車がない</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 260" width="780" height="260">
                {/* 3G時代: 道路 2001 */}
                <g transform="translate(40, 20)">
                    {/* 道路 */}
                    <rect x="0" y="80" width="300" height="50" rx="6" fill="#d1d5db"/>
                    <line x1="150" y1="80" x2="150" y2="130" stroke="#ffffff" strokeWidth="2" strokeDasharray="8,6"/>
                    {/* 基地局 */}
                    <rect x="20" y="40" width="6" height="40" fill="#2563eb"/>
                    <polygon points="14,40 23,25 32,40" fill="#2563eb"/>
                    <text x="23" y="20" textAnchor="middle" fontSize="18" fontWeight="900" fill="#2563eb">3G</text>
                    {/* 年 */}
                    <text x="150" y="160" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">2001年 道路完成</text>
                    {/* 車なし（空の道路） */}
                    <text x="150" y="185" textAnchor="middle" fontSize="18" fill="#dc2626">「3Gは失敗」の声</text>
                </g>
                {/* 矢印: 7年後 */}
                <text x="390" y="60" textAnchor="middle" fontSize="22" fontWeight="900" fill="#d97706">7年後</text>
                <line x1="370" y1="70" x2="370" y2="120" stroke="#d97706" strokeWidth="3"/>
                <polygon points="365,120 370,134 375,120" fill="#d97706"/>
                {/* iPhone登場 */}
                <g transform="translate(420, 20)">
                    {/* 道路 */}
                    <rect x="0" y="80" width="300" height="50" rx="6" fill="#d1d5db"/>
                    <line x1="150" y1="80" x2="150" y2="130" stroke="#ffffff" strokeWidth="2" strokeDasharray="8,6"/>
                    {/* 車たち */}
                    <rect x="40" y="90" width="36" height="22" rx="4" fill="#2563eb"/>
                    <rect x="100" y="92" width="36" height="22" rx="4" fill="#0891b2"/>
                    <rect x="170" y="90" width="36" height="22" rx="4" fill="#d97706"/>
                    <rect x="230" y="92" width="36" height="22" rx="4" fill="#dc2626"/>
                    {/* iPhone */}
                    <rect x="120" y="30" width="40" height="60" rx="6" fill="#1a1d23"/>
                    <rect x="124" y="38" width="32" height="42" rx="2" fill="#dbeafe"/>
                    <text x="140" y="64" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2563eb">iPhone</text>
                    <text x="150" y="160" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">2008年 車が走り出す</text>
                    <text x="150" y="185" textAnchor="middle" fontSize="18" fill="#2563eb">世界が一変</text>
                </g>
                {/* 下部メッセージ */}
                <text x="390" y="240" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1a1d23">5Gも同じパターンの途上にいる？</text>
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
        <div className="scene-title">5Gの約束された未来</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">遠隔手術</div>
                <div className="compare-body">2019年に大宣伝<br />2026年もまだ実証実験段階</div>
            </div>
            <div className="compare-card border-amber">
                <div className="compare-title accent-amber">自動運転</div>
                <div className="compare-body">2019年に大宣伝<br />2026年もまだ実証実験段階</div>
            </div>
        </div>
        <div className="big-statement">「5Gにして良かった」と<br />実感できるサービスが<span className="accent-coral">まだない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">韓国 ── 世界最速でも満足できない</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 240" width="780" height="240">
                {/* 韓国の速度バー */}
                <rect x="60" y="20" width="660" height="50" rx="8" fill="#dbeafe"/>
                <rect x="60" y="20" width="660" height="50" rx="8" fill="#2563eb"/>
                <text x="380" y="52" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ffffff">939Mbps（世界トップクラス）</text>
                {/* 日本の速度バー */}
                <rect x="60" y="85" width="98" height="40" rx="6" fill="#d1d5db"/>
                <text x="180" y="112" fontSize="18" fontWeight="700" fill="#1a1d23">日本: 140Mbps</text>
                {/* 満足度: 人物グリッド 10人中1.4人 */}
                <text x="390" y="150" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1a1d23">5Gに「満足」と答えた利用者</text>
                {/* 10人の人物アイコン */}
                {/* 満足: 1人 (赤) */}
                <g fill="#dc2626">
                    <circle cx="140" cy="180" r="10"/>
                    <path d="M125 198 C125 189 155 189 155 198 L155 208 Q140 214 125 208 Z"/>
                </g>
                {/* 不満足: 9人 (グレー) */}
                <g fill="#d1d5db">
                    <circle cx="210" cy="180" r="10"/>
                    <path d="M195 198 C195 189 225 189 225 198 L225 208 Q210 214 195 208 Z"/>
                </g>
                <g fill="#d1d5db">
                    <circle cx="280" cy="180" r="10"/>
                    <path d="M265 198 C265 189 295 189 295 198 L295 208 Q280 214 265 208 Z"/>
                </g>
                <g fill="#d1d5db">
                    <circle cx="350" cy="180" r="10"/>
                    <path d="M335 198 C335 189 365 189 365 198 L365 208 Q350 214 335 208 Z"/>
                </g>
                <g fill="#d1d5db">
                    <circle cx="420" cy="180" r="10"/>
                    <path d="M405 198 C405 189 435 189 435 198 L435 208 Q420 214 405 208 Z"/>
                </g>
                <g fill="#d1d5db">
                    <circle cx="490" cy="180" r="10"/>
                    <path d="M475 198 C475 189 505 189 505 198 L505 208 Q490 214 475 208 Z"/>
                </g>
                <g fill="#d1d5db">
                    <circle cx="560" cy="180" r="10"/>
                    <path d="M545 198 C545 189 575 189 575 198 L575 208 Q560 214 545 208 Z"/>
                </g>
                <g fill="#d1d5db">
                    <circle cx="630" cy="180" r="10"/>
                    <path d="M615 198 C615 189 645 189 645 198 L645 208 Q630 214 615 208 Z"/>
                </g>
                {/* 比率テキスト */}
                <text x="140" y="235" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">14%</text>
                <text x="420" y="235" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1a1d23">速くても「使い道」がない</text>
            </svg>
        </div>
        <div className="source">出典: 韓国通信委員会 2024年 5G利用者満足度調査</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">NSA vs SA ── 5Gの「仮の姿」と「本来の姿」</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 280" width="780" height="280">
                {/* 左: NSA方式 */}
                <text x="190" y="25" textAnchor="middle" fontSize="22" fontWeight="900" fill="#d97706">NSA（現在の主流）</text>
                {/* 4Gコア */}
                <rect x="60" y="140" width="260" height="60" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <text x="190" y="178" textAnchor="middle" fontSize="20" fontWeight="700" fill="#d97706">4G コアネットワーク</text>
                {/* 5G無線を上に載せる */}
                <rect x="100" y="50" width="180" height="60" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
                <text x="190" y="86" textAnchor="middle" fontSize="20" fontWeight="700" fill="#2563eb">5G 無線</text>
                {/* 接続線 */}
                <line x1="190" y1="110" x2="190" y2="140" stroke="#d1d5db" strokeWidth="2"/>
                {/* 制限バッジ */}
                <text x="190" y="230" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">低遅延・スライシング不可</text>
                <text x="190" y="255" textAnchor="middle" fontSize="18" fill="#1a1d23">世界の82.4%がこの方式</text>
                {/* 中央の仕切り線 */}
                <line x1="390" y1="15" x2="390" y2="270" stroke="#d1d5db" strokeWidth="1" strokeDasharray="6,4"/>
                {/* 右: SA方式 */}
                <text x="590" y="25" textAnchor="middle" fontSize="22" fontWeight="900" fill="#2563eb">SA（本来の5G）</text>
                {/* 5G専用コア */}
                <rect x="460" y="140" width="260" height="60" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
                <text x="590" y="178" textAnchor="middle" fontSize="20" fontWeight="900" fill="#2563eb">5G 専用コア</text>
                {/* 5G無線 */}
                <rect x="500" y="50" width="180" height="60" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
                <text x="590" y="86" textAnchor="middle" fontSize="20" fontWeight="700" fill="#2563eb">5G 無線</text>
                {/* 接続線 */}
                <line x1="590" y1="110" x2="590" y2="140" stroke="#2563eb" strokeWidth="2"/>
                {/* 機能バッジ */}
                <text x="590" y="230" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">低遅延+スライシング対応</text>
                <text x="590" y="255" textAnchor="middle" fontSize="18" fill="#1a1d23">DL速度1.7倍（Opensignal調査）</text>
            </svg>
        </div>
        <div className="source">出典: Opensignal 2024年 SA vs NSA比較レポート</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">ネットワークスライシング</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 280" width="780" height="280">
                {/* 上: 従来の1本道 */}
                <text x="100" y="25" fontSize="20" fontWeight="900" fill="#dc2626">従来: 全員が同じ道路</text>
                <rect x="40" y="35" width="700" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                {/* 車が混雑 */}
                <rect x="60" y="43" width="28" height="18" rx="3" fill="#dc2626"/>
                <rect x="100" y="45" width="28" height="18" rx="3" fill="#d97706"/>
                <rect x="135" y="43" width="28" height="18" rx="3" fill="#0891b2"/>
                <rect x="175" y="45" width="28" height="18" rx="3" fill="#2563eb"/>
                <rect x="210" y="43" width="28" height="18" rx="3" fill="#dc2626"/>
                <rect x="250" y="45" width="28" height="18" rx="3" fill="#d97706"/>
                <rect x="290" y="43" width="28" height="18" rx="3" fill="#0891b2"/>
                <rect x="340" y="45" width="28" height="18" rx="3" fill="#2563eb"/>
                <rect x="390" y="43" width="28" height="18" rx="3" fill="#dc2626"/>
                <rect x="440" y="45" width="28" height="18" rx="3" fill="#d97706"/>
                <text x="560" y="62" fontSize="18" fontWeight="700" fill="#dc2626">渋滞発生</text>
                {/* 下: スライシングで分割 */}
                <text x="100" y="110" fontSize="20" fontWeight="900" fill="#2563eb">スライシング: 用途別の専用レーン</text>
                {/* 動画レーン */}
                <rect x="40" y="125" width="700" height="36" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
                <text x="55" y="149" fontSize="18" fontWeight="700" fill="#2563eb">動画</text>
                <rect x="160" y="133" width="28" height="16" rx="3" fill="#2563eb"/>
                <rect x="260" y="133" width="28" height="16" rx="3" fill="#2563eb"/>
                <rect x="400" y="133" width="28" height="16" rx="3" fill="#2563eb"/>
                {/* IoTレーン */}
                <rect x="40" y="170" width="700" height="36" rx="4" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
                <text x="55" y="194" fontSize="18" fontWeight="700" fill="#0891b2">IoT</text>
                <rect x="200" y="178" width="20" height="14" rx="2" fill="#0891b2"/>
                <rect x="350" y="178" width="20" height="14" rx="2" fill="#0891b2"/>
                <rect x="500" y="178" width="20" height="14" rx="2" fill="#0891b2"/>
                {/* 医療レーン */}
                <rect x="40" y="215" width="700" height="36" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                <text x="55" y="239" fontSize="18" fontWeight="700" fill="#dc2626">医療</text>
                <rect x="300" y="223" width="24" height="16" rx="3" fill="#dc2626"/>
                {/* 優先表示 */}
                <text x="360" y="239" fontSize="18" fontWeight="700" fill="#dc2626">最優先・低遅延保証</text>
                {/* 実例 */}
                <text x="390" y="275" textAnchor="middle" fontSize="18" fill="#1a1d23">2023年 東京マラソン: 放送カメラ専用スライスで安定中継を実現</text>
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
        <div className="scene-title">ローカル5G ── 必要な場所に集中投資</div>
        <div className="two-col">
            <div className="arch-card border-primary">
                <img src="https://api.iconify.design/mdi/factory.svg?color=%232563eb&width=48&height=48" />
                <div className="card-title">工場</div>
                <div className="card-body">8Kカメラ + AI で<br />製品の傷を自動検出</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://api.iconify.design/mdi/stadium-variant.svg?color=%230891b2&width=48&height=48" />
                <div className="card-title">スタジアム</div>
                <div className="card-body">12台カメラで<br />360度映像をリアルタイム配信</div>
            </div>
        </div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 100" width="780" height="100">
                {/* 電力消費の警告 */}
                <rect x="120" y="10" width="540" height="70" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
                <text x="390" y="42" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">5G基地局の電力 = 4Gの3~4倍</text>
                <text x="390" y="68" textAnchor="middle" fontSize="18" fill="#1a1d23">1局で一般家庭73世帯分の電力消費</text>
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
        <div className="scene-title">5Gは「嘘」だったのか？</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-text">転用5G・NSA方式 ── まだ<span className="accent-primary">本気を出していない</span></div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle-teal">2</div>
                <div className="num-text">キラーアプリには<span className="accent-teal">タイムラグ</span>がある（3Gは7年かかった）</div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle-amber">3</div>
                <div className="num-text">真価は<span className="accent-amber">産業インフラ</span>にあるかもしれない</div>
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
        <div className="scene-title">5Gの恩恵は「見えない形」で届く</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 780 280" width="780" height="280">
                {/* 中央: 5Gコアの円 */}
                <circle cx="390" cy="140" r="60" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
                <text x="390" y="135" textAnchor="middle" fontSize="24" fontWeight="900" fill="#2563eb">5G</text>
                <text x="390" y="158" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">SA + スライシング</text>
                {/* 放射接続: 工場 */}
                <line x1="340" y1="100" x2="160" y2="40" stroke="#2563eb" strokeWidth="2"/>
                <rect x="80" y="15" width="160" height="50" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="2"/>
                <text x="160" y="46" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2563eb">工場の品質管理</text>
                {/* 放射接続: 医療 */}
                <line x1="440" y1="100" x2="620" y2="40" stroke="#dc2626" strokeWidth="2"/>
                <rect x="540" y="15" width="160" height="50" rx="8" fill="#ffffff" stroke="#dc2626" strokeWidth="2"/>
                <text x="620" y="46" textAnchor="middle" fontSize="18" fontWeight="700" fill="#dc2626">医療データ伝送</text>
                {/* 放射接続: 物流 */}
                <line x1="340" y1="180" x2="130" y2="240" stroke="#0891b2" strokeWidth="2"/>
                <rect x="40" y="218" width="180" height="50" rx="8" fill="#ffffff" stroke="#0891b2" strokeWidth="2"/>
                <text x="130" y="249" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0891b2">物流の自動化</text>
                {/* 放射接続: エンタメ */}
                <line x1="440" y1="180" x2="630" y2="240" stroke="#d97706" strokeWidth="2"/>
                <rect x="550" y="218" width="180" height="50" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="2"/>
                <text x="640" y="249" textAnchor="middle" fontSize="18" fontWeight="700" fill="#d97706">360度ライブ配信</text>
                {/* 消費者への矢印 */}
                <line x1="390" y1="200" x2="390" y2="250" stroke="#1a1d23" strokeWidth="2"/>
                <polygon points="385,250 390,264 395,250" fill="#1a1d23"/>
                {/* 消費者 (人物アイコン) */}
                <g fill="#1a1d23">
                    <circle cx="390" cy="264" r="10"/>
                    <path d="M375 282 C375 273 405 273 405 282 L405 292 Q390 298 375 292 Z"/>
                </g>
            </svg>
        </div>
        <div className="big-statement">スマホの速度ではなく<br /><span className="accent-primary">社会の裏側</span>から世界を変える</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="icon-deco">
            <img src="https://api.iconify.design/mdi/signal-5g.svg?color=%232563eb&width=72&height=72" />
        </div>
        <div className="title-large">5Gは嘘じゃなかった<br />まだ<span className="accent-teal">始まったばかり</span></div>
        <div className="title-sub">次に「5G」と表示されたとき、その裏側を想像してみてください</div>
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
};

export const TOTAL_SCENE_COUNT = 17;
