import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene active" id="scene-0">
    <div className="content center-layout">
        <div className="title-large">無料アプリの<br /><span className="accent-primary">「本当の値段」</span></div>
        <div className="big-statement">あなたは何で<span className="accent-coral">支払って</span>いる？</div>
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" />
            <img src="https://api.iconify.design/simple-icons/line.svg?color=%230d9488&width=56&height=56" alt="LINE" />
            <img src="https://api.iconify.design/mdi/instagram.svg?color=%236C3FC5&width=56&height=56" alt="Instagram" />
            <img src="https://api.iconify.design/mdi/youtube.svg?color=%23e11d48&width=56&height=56" alt="YouTube" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" alt="Facebook" />
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">アプリストアの実態</div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-primary">97<span style={{ fontSize: '36px' }}>%</span></div>
                <div className="metric-label">Google Play 無料率</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-teal">95<span style={{ fontSize: '36px' }}>%</span></div>
                <div className="metric-label">App Store 無料率</div>
            </div>
        </div>
        <div className="body-text">有料アプリはほんの<span className="accent-coral">一握り</span></div>
        <div className="source">出典: Statista, 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">矛盾する収益構造</div>
        <div className="big-statement">アプリ収益全体の<span className="accent-coral">98%</span>が<br />無料アプリから発生</div>
        <div className="body-text">「無料」は慈善事業ではなく<br /><span className="accent-primary">最も稼げるビジネスモデル</span></div>
        <div className="source">出典: Statista App Revenue Report</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">思考実験：もし全部有料だったら</div>
        <svg viewBox="0 0 900 240" className="svg-container" width="900" height="240">
            {/* スマホ群 */}
            <rect x="30" y="10" width="90" height="160" rx="12" fill="none" stroke="#6C3FC5" strokeWidth="2.5"/>
            <image href="https://api.iconify.design/simple-icons/line.svg?color=%230d9488&width=40&height=40" x="55" y="25" width="40" height="40"/>
            <text x="75" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">LINE</text>
            <text x="75" y="115" textAnchor="middle" fontSize="18" fill="#e11d48" fontWeight="900">¥300/月</text>
            <rect x="160" y="10" width="90" height="160" rx="12" fill="none" stroke="#6C3FC5" strokeWidth="2.5"/>
            <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" x="185" y="25" width="40" height="40"/>
            <text x="205" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">検索</text>
            <text x="205" y="115" textAnchor="middle" fontSize="18" fill="#e11d48" fontWeight="900">¥500/月</text>
            <rect x="290" y="10" width="90" height="160" rx="12" fill="none" stroke="#6C3FC5" strokeWidth="2.5"/>
            <image href="https://api.iconify.design/mdi/instagram.svg?color=%236C3FC5&width=40&height=40" x="315" y="25" width="40" height="40"/>
            <text x="335" y="90" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">Instagram</text>
            <text x="335" y="115" textAnchor="middle" fontSize="18" fill="#e11d48" fontWeight="900">¥800/月</text>
            <rect x="420" y="10" width="90" height="160" rx="12" fill="none" stroke="#6C3FC5" strokeWidth="2.5"/>
            <image href="https://api.iconify.design/mdi/youtube.svg?color=%23e11d48&width=40&height=40" x="445" y="25" width="40" height="40"/>
            <text x="465" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">YouTube</text>
            <text x="465" y="115" textAnchor="middle" fontSize="18" fill="#e11d48" fontWeight="900">¥1,280/月</text>
            <rect x="550" y="10" width="90" height="160" rx="12" fill="none" stroke="#6C3FC5" strokeWidth="2.5"/>
            <image href="https://api.iconify.design/mdi/google-maps.svg?color=%230d9488&width=40&height=40" x="575" y="25" width="40" height="40"/>
            <text x="595" y="90" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1a1d23">Googleマップ</text>
            <text x="595" y="115" textAnchor="middle" fontSize="18" fill="#e11d48" fontWeight="900">¥400/月</text>
            <rect x="680" y="10" width="90" height="160" rx="12" fill="none" stroke="#6C3FC5" strokeWidth="2.5"/>
            <image href="https://api.iconify.design/mdi/gmail.svg?color=%23e11d48&width=40&height=40" x="705" y="25" width="40" height="40"/>
            <text x="725" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">Gmail</text>
            <text x="725" y="115" textAnchor="middle" fontSize="18" fill="#e11d48" fontWeight="900">¥200/月</text>
            {/* 合計バー */}
            <rect x="200" y="188" width="500" height="44" rx="10" fill="#e11d48"/>
            <text x="450" y="217" textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff">合計 月5,000円超？</text>
        </svg>
        <div className="body-text">一つひとつは小さくても<span className="accent-coral">積み重なると大きな額</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">見えない請求書</div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-primary">$460</div>
                <div className="metric-label">Google</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" style={{ width: '40px', height: '40px' }} />
            </div>
            <div className="metric-card">
                <div className="metric-value accent-teal">$217</div>
                <div className="metric-label">Meta</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" alt="Meta" style={{ width: '40px', height: '40px' }} />
            </div>
            <div className="metric-card" style={{ borderColor: '#e11d48' }}>
                <div className="metric-value accent-coral">$700<span style={{ fontSize: '28px' }}>+</span></div>
                <div className="metric-label">合計/年</div>
                <div className="metric-sub">≒ 約10万円超</div>
            </div>
        </div>
        <div className="source">出典: Proton, 推計値（算出方法により変動）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">あなたが支払う<span className="accent-primary">3つの通貨</span></div>
        <svg viewBox="0 0 960 240" className="svg-container" width="960" height="240">
            {/* 通貨1: データ */}
            <circle cx="160" cy="70" r="50" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="2.5"/>
            <text x="160" y="60" textAnchor="middle" fontSize="28" fill="#6C3FC5">&#x1F4BE;</text>
            <text x="160" y="85" textAnchor="middle" fontSize="18" fontWeight="900" fill="#6C3FC5">DATA</text>
            <text x="160" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">データ</text>
            <text x="160" y="165" textAnchor="middle" fontSize="18" fill="#374151">検索履歴</text>
            <text x="160" y="188" textAnchor="middle" fontSize="18" fill="#374151">位置情報</text>
            <text x="160" y="211" textAnchor="middle" fontSize="18" fill="#374151">購買履歴</text>
            {/* 通貨2: 注意力 */}
            <circle cx="480" cy="70" r="50" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5"/>
            <text x="480" y="60" textAnchor="middle" fontSize="28" fill="#0d9488">&#x1F441;</text>
            <text x="480" y="85" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">TIME</text>
            <text x="480" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">注意力</text>
            <text x="480" y="165" textAnchor="middle" fontSize="18" fill="#374151">1日4.5時間</text>
            <text x="480" y="188" textAnchor="middle" fontSize="18" fill="#374151">Z世代は9時間超</text>
            <text x="480" y="211" textAnchor="middle" fontSize="18" fill="#374151">広告の「在庫」</text>
            {/* 通貨3: 行動変容 */}
            <circle cx="800" cy="70" r="50" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.5"/>
            <text x="800" y="60" textAnchor="middle" fontSize="28" fill="#e11d48">&#x1F9E0;</text>
            <text x="800" y="85" textAnchor="middle" fontSize="18" fontWeight="900" fill="#e11d48">MIND</text>
            <text x="800" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1d23">行動変容</text>
            <text x="800" y="165" textAnchor="middle" fontSize="18" fill="#374151">意思決定の変化</text>
            <text x="800" y="188" textAnchor="middle" fontSize="18" fill="#374151">購買行動の誘導</text>
            <text x="800" y="211" textAnchor="middle" fontSize="18" fill="#374151">無意識の影響</text>
            {/* 接続線 */}
            <line x1="210" y1="70" x2="430" y2="70" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6,4"/>
            <line x1="530" y1="70" x2="750" y2="70" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6,4"/>
        </svg>
        <div className="body-text">お金の代わりに<span className="accent-primary">データ</span>と<span className="accent-teal">注意力</span>と<span className="accent-coral">行動</span>で支払っている</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">広告モデルの進化</div>
        <div className="two-col">
            <div className="compare-card">
                <div className="card-title accent-teal">昔の広告</div>
                <div className="card-desc">「この<span className="accent-teal">サイト</span>に広告を出す」<br /><br />場所ベースの配信</div>
            </div>
            <div className="compare-card" style={{ borderColor: '#6C3FC5' }}>
                <div className="card-title accent-primary">今の広告</div>
                <div className="card-desc">「この<span className="accent-primary">人</span>に広告を出す」<br /><br />個人ターゲティング配信</div>
            </div>
        </div>
        <div className="body-text">広告の対象が<span className="accent-teal">場所</span>から<span className="accent-primary">ヒト</span>に変わった</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">世界の広告市場</div>
        <div className="big-statement">2025年、世界の広告支出が史上初<br /><span className="accent-coral">1兆ドル</span>突破</div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-primary">$2,000<span style={{ fontSize: '24px' }}>億</span></div>
                <div className="metric-label">Google</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-teal">$1,421<span style={{ fontSize: '24px' }}>億</span></div>
                <div className="metric-label">Meta</div>
            </div>
        </div>
        <div className="body-text">Google + Meta + Amazon の<span className="accent-coral">3社で世界の55%</span></div>
        <div className="source">出典: GroupM / 各社Annual Report, 2025</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">リアルタイム入札（RTB）の仕組み</div>
        <svg viewBox="0 0 960 230" className="svg-container" width="960" height="230">
            {/* Step 1: ユーザー */}
            <rect x="10" y="30" width="160" height="80" rx="10" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="2"/>
            <circle cx="60" cy="56" r="14" fill="#6C3FC5"/>
            <path d="M40 74 C40 61 80 61 80 74 L80 84 Q60 92 40 84 Z" fill="#6C3FC5"/>
            <text x="110" y="65" fontSize="18" fontWeight="700" fill="#6C3FC5">ユーザー</text>
            <text x="90" y="100" textAnchor="middle" fontSize="18" fill="#374151">アプリを開く</text>
            {/* Arrow 1 */}
            <polygon points="180,70 200,60 200,64 220,64 220,76 200,76 200,80" fill="#6C3FC5"/>
            <text x="200" y="15" textAnchor="middle" fontSize="18" fill="#6C3FC5">データ送信</text>
            {/* Step 2: 広告取引所 */}
            <rect x="230" y="20" width="180" height="100" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="320" y="55" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">広告取引所</text>
            <text x="320" y="80" textAnchor="middle" fontSize="18" fill="#374151">位置・履歴・年齢</text>
            <text x="320" y="100" textAnchor="middle" fontSize="18" fill="#374151">を公開</text>
            {/* Arrow 2 */}
            <polygon points="420,70 440,60 440,64 460,64 460,76 440,76 440,80" fill="#d97706"/>
            <text x="440" y="15" textAnchor="middle" fontSize="18" fill="#d97706">入札開始</text>
            {/* Step 3: オークション */}
            <rect x="470" y="20" width="180" height="100" rx="10" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2"/>
            <text x="560" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#e11d48">オークション</text>
            <text x="560" y="75" textAnchor="middle" fontSize="18" fill="#374151">広告主A: $0.02</text>
            <text x="560" y="98" textAnchor="middle" fontSize="18" fill="#374151">広告主B: $0.05</text>
            {/* Arrow 3 */}
            <polygon points="660,70 680,60 680,64 700,64 700,76 680,76 680,80" fill="#e11d48"/>
            <text x="680" y="15" textAnchor="middle" fontSize="18" fill="#e11d48">落札!</text>
            {/* Step 4: 広告表示 */}
            <rect x="710" y="30" width="160" height="80" rx="10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="790" y="65" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">広告表示</text>
            <text x="790" y="90" textAnchor="middle" fontSize="18" fill="#374151">あなたの画面に</text>
            {/* 時間表示 */}
            <rect x="320" y="150" width="320" height="50" rx="25" fill="#6C3FC5"/>
            <text x="480" y="182" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff">所要時間：40〜120ミリ秒</text>
        </svg>
        <div className="body-text">あなたの情報に広告主が<span className="accent-coral">リアルタイムで値段をつけている</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">40ミリ秒の世界</div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-coral">40<span style={{ fontSize: '28px' }}>ms</span></div>
                <div className="metric-label">最速の入札完了</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-amber">300<span style={{ fontSize: '28px' }}>ms</span></div>
                <div className="metric-label">まばたき1回</div>
            </div>
        </div>
        <div className="big-statement">ページを読む前に<span className="accent-coral">競売は終わっている</span></div>
        <div className="body-text">デジタルディスプレイ広告の<span className="accent-primary">90%以上</span>がRTBで配信</div>
        <div className="source">出典: IAB / eMarketer, 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">バナー広告の30年</div>
        <svg viewBox="0 0 960 220" className="svg-container" width="960" height="220">
            {/* 1994年側 */}
            <rect x="30" y="10" width="400" height="200" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="230" y="45" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">1994年</text>
            {/* ブラウザウィンドウ */}
            <rect x="80" y="60" width="300" height="60" rx="6" fill="#fff" stroke="#0d9488" strokeWidth="1.5"/>
            <text x="230" y="90" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">AT&T バナー広告</text>
            <text x="230" y="108" textAnchor="middle" fontSize="18" fill="#374151">サイトの読者向け</text>
            <text x="230" y="150" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0d9488">CTR: 44%</text>
            <text x="230" y="180" textAnchor="middle" fontSize="18" fill="#374151">「このサイトに出す」</text>
            {/* VS */}
            <text x="480" y="120" textAnchor="middle" fontSize="28" fontWeight="900" fill="#d1d5db">VS</text>
            {/* 現在側 */}
            <rect x="530" y="10" width="400" height="200" rx="12" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="2"/>
            <text x="730" y="45" textAnchor="middle" fontSize="22" fontWeight="900" fill="#6C3FC5">現在</text>
            {/* ターゲティング図 */}
            <circle cx="680" cy="95" r="14" fill="#6C3FC5"/>
            <path d="M660 113 C660 100 700 100 700 113 L700 123 Q680 131 660 123 Z" fill="#6C3FC5"/>
            <circle cx="780" cy="95" r="14" fill="#6C3FC5" opacity="0.3"/>
            <path d="M760 113 C760 100 800 100 800 113 L800 123 Q780 131 760 123 Z" fill="#6C3FC5" opacity="0.3"/>
            <circle cx="630" cy="95" r="14" fill="#6C3FC5" opacity="0.3"/>
            <path d="M610 113 C610 100 650 100 650 113 L650 123 Q630 131 610 123 Z" fill="#6C3FC5" opacity="0.3"/>
            {/* ターゲット円 */}
            <circle cx="680" cy="107" r="35" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="6,3"/>
            <text x="730" y="160" textAnchor="middle" fontSize="24" fontWeight="900" fill="#6C3FC5">CTR: ~1%</text>
            <text x="730" y="190" textAnchor="middle" fontSize="18" fill="#374151">「この人のこの瞬間に出す」</text>
        </svg>
        <div className="body-text">30年かけて広告は<span className="accent-teal">場所</span>から<span className="accent-primary">ヒト</span>に変わった</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">50年前の予言</div>
        <div className="person-card">
            <img src="images/herbert_simon.jpg" alt="ハーバート・サイモン" />
            <div className="person-info">
                <div className="person-name">ハーバート・サイモン</div>
                <div className="person-title">ノーベル経済学賞受賞者（1978年）</div>
            </div>
        </div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">情報の豊富さは、注意の貧困を生み出す</div>
            <div className="quote-source">— Herbert A. Simon, 1971</div>
        </div>
        <div className="body-text">希少なものに値段がつく。情報過多の時代に<br />最も希少なのは<span className="accent-primary">注意力</span> = アテンションエコノミーの始まり</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">あなたは「商品」ではなく<span className="accent-coral">「原材料」</span></div>
        <svg viewBox="0 0 960 230" className="svg-container" width="960" height="230">
            {/* 原材料（ユーザー） */}
            <rect x="20" y="30" width="200" height="170" rx="12" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="2"/>
            <text x="120" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6C3FC5">原材料</text>
            {/* 人物群 */}
            <circle cx="70" cy="100" r="14" fill="#6C3FC5"/>
            <path d="M50 118 C50 105 90 105 90 118 L90 128 Q70 136 50 128 Z" fill="#6C3FC5"/>
            <circle cx="120" cy="100" r="14" fill="#6C3FC5" opacity="0.7"/>
            <path d="M100 118 C100 105 140 105 140 118 L140 128 Q120 136 100 128 Z" fill="#6C3FC5" opacity="0.7"/>
            <circle cx="170" cy="100" r="14" fill="#6C3FC5" opacity="0.4"/>
            <path d="M150 118 C150 105 190 105 190 118 L190 128 Q170 136 150 128 Z" fill="#6C3FC5" opacity="0.4"/>
            <text x="120" y="170" textAnchor="middle" fontSize="18" fill="#374151">行動データ</text>
            <text x="120" y="192" textAnchor="middle" fontSize="18" fill="#374151">（無料で回収）</text>
            {/* 矢印1 */}
            <polygon points="230,115 260,105 260,110 280,110 280,120 260,120 260,125" fill="#6C3FC5"/>
            {/* 加工 */}
            <rect x="290" y="30" width="200" height="170" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="390" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">加工ライン</text>
            {/* 歯車アイコン */}
            <circle cx="350" cy="110" r="20" fill="none" stroke="#d97706" strokeWidth="3"/>
            <circle cx="350" cy="110" r="6" fill="#d97706"/>
            <circle cx="430" cy="110" r="16" fill="none" stroke="#d97706" strokeWidth="3"/>
            <circle cx="430" cy="110" r="5" fill="#d97706"/>
            <text x="390" y="160" textAnchor="middle" fontSize="18" fill="#374151">行動分析</text>
            <text x="390" y="182" textAnchor="middle" fontSize="18" fill="#374151">アルゴリズム</text>
            {/* 矢印2 */}
            <polygon points="500,115 530,105 530,110 550,110 550,120 530,120 530,125" fill="#d97706"/>
            {/* 完成品 */}
            <rect x="560" y="30" width="200" height="170" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2"/>
            <text x="660" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="#e11d48">完成品</text>
            <rect x="600" y="80" width="120" height="50" rx="8" fill="#e11d48"/>
            <text x="660" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">行動予測</text>
            <text x="660" y="160" textAnchor="middle" fontSize="18" fill="#374151">「次に何をするか」</text>
            <text x="660" y="182" textAnchor="middle" fontSize="18" fill="#374151">を広告主に販売</text>
            {/* 販売先 */}
            <polygon points="770,115 800,105 800,110 820,110 820,120 800,120 800,125" fill="#e11d48"/>
            <rect x="830" y="80" width="110" height="70" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="885" y="110" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0d9488">広告主</text>
            <text x="885" y="135" textAnchor="middle" fontSize="18" fill="#0d9488">$$</text>
        </svg>
        <div className="body-text">ショシャナ・ズボフ教授（ハーバード大学）の分析</div>
        <div className="source">出典: 『監視資本主義の時代』(2019)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">監視資本主義のループ</div>
        <svg viewBox="0 0 960 240" className="svg-container" width="960" height="240">
            {/* 中央の循環 */}
            {/* ユーザー体験 */}
            <rect x="350" y="10" width="260" height="55" rx="10" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="2"/>
            <text x="480" y="45" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6C3FC5">ユーザーの体験・行動</text>
            {/* 下矢印 */}
            <polygon points="480,75 470,65 475,65 475,55 485,55 485,65 490,65" fill="#6C3FC5" transform="rotate(180,480,65)"/>
            {/* データ回収 */}
            <rect x="100" y="90" width="220" height="55" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="210" y="125" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">データ回収・分析</text>
            {/* 行動予測 */}
            <rect x="370" y="90" width="220" height="55" rx="10" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2"/>
            <text x="480" y="125" textAnchor="middle" fontSize="20" fontWeight="900" fill="#e11d48">行動予測の生成</text>
            {/* 広告販売 */}
            <rect x="640" y="90" width="220" height="55" rx="10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="750" y="125" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">広告主に販売</text>
            {/* 横矢印 */}
            <polygon points="330,117 340,110 340,113 360,113 360,121 340,121 340,124" fill="#d97706"/>
            <polygon points="600,117 610,110 610,113 630,113 630,121 610,121 610,124" fill="#e11d48"/>
            {/* もっとデータが必要ループ */}
            <path d="M750 155 L750 190 Q750 210 730 210 L230 210 Q210 210 210 190 L210 155" fill="none" stroke="#6C3FC5" strokeWidth="2.5" strokeDasharray="8,4"/>
            <polygon points="210,160 200,160 210,145 220,160" fill="#6C3FC5"/>
            <rect x="370" y="195" width="220" height="36" rx="18" fill="#6C3FC5"/>
            <text x="480" y="219" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">精度向上にはもっとデータが必要</text>
            {/* 引き留め */}
            <text x="480" y="175" textAnchor="middle" fontSize="18" fontWeight="700" fill="#e11d48">→ アプリがユーザーを引き留める理由</text>
        </svg>
        <div className="body-text">原材料の供給を止めたくないからこそ<br />あなたを<span className="accent-coral">できるだけ長く引き留めようとする</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">ダークパターン：<span className="accent-coral">つい続けてしまう</span>設計</div>
        <div className="step-list" style={{ maxWidth: '620px' }}>
            <div className="step-item">
                <div className="step-num">1</div>
                <div className="step-text">解約を<span className="accent-coral">わざと何ページも経由</span>させる（例：Amazon Prime）</div>
            </div>
            <div className="step-item">
                <div className="step-num">2</div>
                <div className="step-text"><span className="accent-coral">不安を煽って</span>課金を促す</div>
            </div>
            <div className="step-item">
                <div className="step-num">3</div>
                <div className="step-text">スマホを置こうとした瞬間に<span className="accent-coral">通知のタイミングを計算</span>して鳴らす</div>
            </div>
        </div>
        <div className="body-text">トップモバイルアプリの最大<span className="accent-coral">95%</span>に何らかのダークパターンが存在</div>
        <div className="source">出典: arXiv, 2024（64種類に分類）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">Meta ARPU推移（ユーザー1人あたり収益）</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">2011年</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '9%', background: '#6C3FC5' } as React.CSSProperties}></div></div>
                <div className="bar-val accent-primary">$5</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">2018年</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '44%', background: '#0d9488' } as React.CSSProperties}></div></div>
                <div className="bar-val accent-teal">$25</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">2025年</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '100%', background: '#e11d48' } as React.CSSProperties}></div></div>
                <div className="bar-val accent-coral">$57</div>
            </div>
        </div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-primary">$68</div>
                <div className="metric-label">アメリカ</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-teal">$5.5</div>
                <div className="metric-label">アジア太平洋</div>
            </div>
        </div>
        <div className="source">出典: Meta Investor Relations</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">「嫌なら使うな」が通じない理由</div>
        <svg viewBox="0 0 960 240" className="svg-container" width="960" height="240">
            {/* ネットワーク効果の可視化 */}
            {/* 中央のプラットフォーム */}
            <circle cx="480" cy="120" r="45" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="3"/>
            <image href="https://api.iconify.design/simple-icons/line.svg?color=%236C3FC5&width=40&height=40" x="460" y="100" width="40" height="40"/>
            {/* 周囲のユーザー群（接続済み） */}
            <circle cx="320" cy="60" r="14" fill="#6C3FC5"/>
            <path d="M300 78 C300 65 340 65 340 78 L340 88 Q320 96 300 88 Z" fill="#6C3FC5"/>
            <line x1="340" y1="75" x2="440" y2="105" stroke="#6C3FC5" strokeWidth="2"/>
            <circle cx="360" cy="200" r="14" fill="#6C3FC5"/>
            <path d="M340 218 C340 205 380 205 380 218 L380 228 Q360 236 340 228 Z" fill="#6C3FC5"/>
            <line x1="375" y1="200" x2="445" y2="145" stroke="#6C3FC5" strokeWidth="2"/>
            <circle cx="480" cy="10" r="14" fill="#6C3FC5"/>
            <path d="M460 28 C460 15 500 15 500 28 L500 38 Q480 46 460 38 Z" fill="#6C3FC5"/>
            <line x1="480" y1="40" x2="480" y2="75" stroke="#6C3FC5" strokeWidth="2"/>
            <circle cx="600" cy="200" r="14" fill="#6C3FC5"/>
            <path d="M580 218 C580 205 620 205 620 218 L620 228 Q600 236 580 228 Z" fill="#6C3FC5"/>
            <line x1="585" y1="200" x2="515" y2="145" stroke="#6C3FC5" strokeWidth="2"/>
            <circle cx="640" cy="60" r="14" fill="#6C3FC5"/>
            <path d="M620 78 C620 65 660 65 660 78 L660 88 Q640 96 620 88 Z" fill="#6C3FC5"/>
            <line x1="620" y1="75" x2="520" y2="105" stroke="#6C3FC5" strokeWidth="2"/>
            {/* 離脱しようとするユーザー（赤） */}
            <circle cx="200" cy="140" r="14" fill="#e11d48"/>
            <path d="M180 158 C180 145 220 145 220 158 L220 168 Q200 176 180 168 Z" fill="#e11d48"/>
            <line x1="220" y1="145" x2="320" y2="60" stroke="#e11d48" strokeWidth="2" strokeDasharray="5,3"/>
            <line x1="220" y1="145" x2="345" y2="200" stroke="#e11d48" strokeWidth="2" strokeDasharray="5,3"/>
            {/* X印 */}
            <text x="170" y="145" fontSize="22" fontWeight="900" fill="#e11d48">✕</text>
            <text x="130" y="195" fontSize="18" fontWeight="700" fill="#e11d48">離脱 = 孤立</text>
            {/* ループ矢印テキスト */}
            <text x="780" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6C3FC5">みんなが使う</text>
            <text x="780" y="85" textAnchor="middle" fontSize="18" fill="#6C3FC5">↓</text>
            <text x="780" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6C3FC5">自分も使う</text>
            <text x="780" y="135" textAnchor="middle" fontSize="18" fill="#6C3FC5">↓</text>
            <text x="780" y="160" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6C3FC5">人が集まる</text>
            <text x="780" y="185" textAnchor="middle" fontSize="18" fill="#6C3FC5">↓</text>
            <text x="780" y="210" textAnchor="middle" fontSize="18" fontWeight="900" fill="#e11d48">抜けられない</text>
        </svg>
        <div className="body-text"><span className="accent-primary">ネットワーク効果</span>が「抜けられない」状況を作り<br />データ供給を止められない構造になっている</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title">プライバシーパラドックス</div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-coral">81<span style={{ fontSize: '36px' }}>%</span></div>
                <div className="metric-label">企業のデータ利用に<br />懸念を持つ</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-amber">61<span style={{ fontSize: '36px' }}>%</span></div>
                <div className="metric-label">「何をしても<br />意味がない」と感じる</div>
            </div>
        </div>
        <div className="body-text">個人の怠慢ではなく<span className="accent-coral">構造的な問題</span><br />オプトアウトの手順がわざと複雑に設計されている</div>
        <div className="source">出典: Pew Research Center, 2023</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">100年変わらない基本構造</div>
        <svg viewBox="0 0 960 220" className="svg-container" width="960" height="220">
            {/* ラジオ 1920s */}
            <rect x="20" y="20" width="180" height="120" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="110" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">1920年代</text>
            {/* ラジオアイコン */}
            <rect x="75" y="60" width="70" height="40" rx="8" fill="#0d9488"/>
            <circle cx="100" cy="80" r="10" fill="#ccfbf1"/>
            <rect x="120" y="72" width="15" height="16" rx="3" fill="#ccfbf1"/>
            <text x="110" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#374151">ラジオ</text>
            {/* 矢印 */}
            <text x="220" y="85" fontSize="28" fontWeight="900" fill="#d1d5db">→</text>
            {/* テレビ 1950s */}
            <rect x="250" y="20" width="180" height="120" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="340" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">1950年代</text>
            {/* TVアイコン */}
            <rect x="305" y="58" width="70" height="50" rx="6" fill="#d97706"/>
            <rect x="315" y="65" width="50" height="34" rx="3" fill="#fef3c7"/>
            <text x="340" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#374151">テレビ</text>
            {/* 矢印 */}
            <text x="450" y="85" fontSize="28" fontWeight="900" fill="#d1d5db">→</text>
            {/* Web 1990s */}
            <rect x="480" y="20" width="180" height="120" rx="12" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="2"/>
            <text x="570" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6C3FC5">1990年代</text>
            {/* ブラウザアイコン */}
            <rect x="535" y="58" width="70" height="50" rx="6" fill="#6C3FC5"/>
            <text x="570" y="90" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="700">WWW</text>
            <text x="570" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#374151">Web広告</text>
            {/* 矢印 */}
            <text x="680" y="85" fontSize="28" fontWeight="900" fill="#d1d5db">→</text>
            {/* アプリ 2010s */}
            <rect x="710" y="20" width="180" height="120" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2"/>
            <text x="800" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#e11d48">2010年代〜</text>
            {/* スマホアイコン */}
            <rect x="770" y="58" width="40" height="60" rx="6" fill="#e11d48"/>
            <rect x="775" y="64" width="30" height="42" rx="2" fill="#ffe4e6"/>
            <circle cx="790" cy="112" r="3" fill="#ffe4e6"/>
            <text x="800" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#374151" dy="15">アプリ</text>
            {/* 下の統一構造 */}
            <rect x="180" y="160" width="600" height="50" rx="25" fill="#6C3FC5"/>
            <text x="480" y="192" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">共通構造：無料コンテンツ → 注意力を広告主に販売</text>
        </svg>
        <div className="body-text">変わったのは<span className="accent-coral">精度と速度</span>だけ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title">構造の強さ：Cookie廃止撤回</div>
        <div className="two-col">
            <div className="compare-card">
                <div className="card-title accent-teal">Googleの計画</div>
                <div className="card-desc">サードパーティCookieを廃止して<br />プライバシーを改善する</div>
                <div className="card-desc" style={{ marginTop: '12px' }}>
                    <img src="https://api.iconify.design/mdi/cookie.svg?color=%236C3FC5&width=40&height=40" alt="Cookie" style={{ verticalAlign: 'middle' }} />
                    <span className="accent-coral" style={{ fontWeight: 900 }}> → 廃止</span>
                </div>
            </div>
            <div className="compare-card" style={{ borderColor: '#e11d48' }}>
                <div className="card-title accent-coral">現実</div>
                <div className="card-desc"><span className="accent-coral">4回延期</span>して結局<span className="accent-coral">撤回</span></div>
                <div className="card-desc" style={{ marginTop: '12px' }}>テスト時に広告収益が<br /><span className="accent-coral" style={{ fontWeight: 900 }}>34%減少</span>したため</div>
            </div>
        </div>
        <div className="body-text">100年かけて築いた構造を<span className="accent-coral">簡単には壊せない</span></div>
        <div className="source">出典: Google Privacy Sandbox Blog</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">すべてが悪ではない</div>
        <svg viewBox="0 0 960 220" className="svg-container" width="960" height="220">
            {/* 左側：広告モデル */}
            <rect x="30" y="15" width="400" height="190" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2"/>
            <text x="230" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#e11d48">広告・データ収集モデル</text>
            <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" x="100" y="65" width="40" height="40"/>
            <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" x="160" y="65" width="40" height="40"/>
            <image href="https://api.iconify.design/mdi/instagram.svg?color=%236C3FC5&width=40&height=40" x="220" y="65" width="40" height="40"/>
            <image href="https://api.iconify.design/mdi/youtube.svg?color=%23e11d48&width=40&height=40" x="280" y="65" width="40" height="40"/>
            <text x="230" y="130" textAnchor="middle" fontSize="18" fill="#374151">無料だがデータで「支払い」</text>
            <text x="230" y="155" textAnchor="middle" fontSize="18" fill="#374151">行動追跡・ターゲティング広告</text>
            <text x="230" y="185" textAnchor="middle" fontSize="18" fontWeight="700" fill="#e11d48">裏の仕組みを知る必要あり</text>
            {/* VS */}
            <text x="480" y="115" textAnchor="middle" fontSize="28" fontWeight="900" fill="#d1d5db">VS</text>
            {/* 右側：寄付モデル */}
            <rect x="530" y="15" width="400" height="190" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <text x="730" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d9488">寄付・非営利モデル</text>
            <image href="https://api.iconify.design/simple-icons/signal.svg?color=%230d9488&width=40&height=40" x="650" y="65" width="40" height="40"/>
            <image href="https://api.iconify.design/simple-icons/wikipedia.svg?color=%231a1d23&width=40&height=40" x="720" y="65" width="40" height="40"/>
            <image href="https://api.iconify.design/simple-icons/whatsapp.svg?color=%2310B981&width=40&height=40" x="790" y="65" width="40" height="40"/>
            <text x="730" y="130" textAnchor="middle" fontSize="18" fill="#374151">完全無料・広告ゼロ</text>
            <text x="730" y="155" textAnchor="middle" fontSize="18" fill="#374151">データ収集ゼロ</text>
            <text x="730" y="185" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">寄付で運営が成立</text>
        </svg>
        <div className="body-text">同じ「無料」でも裏の仕組みは<span className="accent-primary">まったく違う</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">Wikipediaモデル</div>
        <div className="icon-row">
            <img src="https://api.iconify.design/simple-icons/wikipedia.svg?color=%231a1d23&width=72&height=72" alt="Wikipedia" />
        </div>
        <div className="metric-grid">
            <div className="metric-card">
                <div className="metric-value accent-teal">$2<span style={{ fontSize: '28px' }}>億+</span></div>
                <div className="metric-label">年間運営費</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-primary">800<span style={{ fontSize: '28px' }}>万人+</span></div>
                <div className="metric-label">寄付者数</div>
            </div>
            <div className="metric-card">
                <div className="metric-value accent-emerald">$10</div>
                <div className="metric-label">平均寄付額</div>
            </div>
        </div>
        <div className="body-text">広告なし・追跡なし。<span className="accent-teal">20年以上</span>これで成立している</div>
        <div className="source">出典: Wikimedia Foundation Annual Report</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-22">
    <div className="content center-layout">
        <div className="scene-title">有料でも安心じゃない</div>
        <div className="two-col">
            <div className="compare-card">
                <div className="card-title accent-coral">有料アプリの現実</div>
                <div className="card-desc">有料iOSアプリの<span className="accent-coral" style={{ fontWeight: 900 }}>87%</span>が<br />データ収集の有無を<br />申告すらしていない</div>
            </div>
            <div className="compare-card">
                <div className="card-title accent-amber">つまり</div>
                <div className="card-desc">お金<span className="accent-coral">も</span>取られて<br />データ<span className="accent-coral">も</span>取られる<br />ダブルコスト</div>
            </div>
        </div>
        <div className="body-text">「お金を払えば安全」も「無料は全部危険」も<br />どちらも<span className="accent-coral">単純化しすぎ</span> — グラデーションで捉える</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <div className="scene-title">値札を読む<span className="accent-primary">3つの力</span></div>
        <svg viewBox="0 0 960 200" className="svg-container" width="960" height="200">
            {/* ポイント1 */}
            <rect x="20" y="10" width="280" height="180" rx="12" fill="#ede9fe" stroke="#6C3FC5" strokeWidth="2"/>
            <circle cx="160" cy="50" r="22" fill="#6C3FC5"/>
            <text x="160" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff">1</text>
            <text x="160" y="90" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6C3FC5">問いを持つ</text>
            <text x="160" y="120" textAnchor="middle" fontSize="18" fill="#374151">「なぜこのアプリは</text>
            <text x="160" y="145" textAnchor="middle" fontSize="18" fill="#374151">無料なのか？」</text>
            <text x="160" y="175" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6C3FC5">習慣にする</text>
            {/* ポイント2 */}
            <rect x="340" y="10" width="280" height="180" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2"/>
            <circle cx="480" cy="50" r="22" fill="#0d9488"/>
            <text x="480" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff">2</text>
            <text x="480" y="90" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0d9488">設定を確認</text>
            <text x="480" y="120" textAnchor="middle" fontSize="18" fill="#374151">プライバシー設定を</text>
            <text x="480" y="145" textAnchor="middle" fontSize="18" fill="#374151">一度は確認する</text>
            <text x="480" y="175" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0d9488">面倒＝見る価値あり</text>
            {/* ポイント3 */}
            <rect x="660" y="10" width="280" height="180" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <circle cx="800" cy="50" r="22" fill="#d97706"/>
            <text x="800" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff">3</text>
            <text x="800" y="90" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706">選択肢を知る</text>
            {/* 代替アプリアイコン */}
            <image href="https://api.iconify.design/simple-icons/signal.svg?color=%230d9488&width=28&height=28" x="740" y="107" width="28" height="28"/>
            <image href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firefox/firefox-original.svg" x="786" y="107" width="28" height="28"/>
            <image href="https://api.iconify.design/simple-icons/duckduckgo.svg?color=%23e11d48&width=28&height=28" x="832" y="107" width="28" height="28"/>
            <text x="800" y="160" textAnchor="middle" fontSize="18" fill="#374151">Signal / Firefox</text>
            <text x="800" y="182" textAnchor="middle" fontSize="18" fill="#374151">DuckDuckGo</text>
        </svg>
        <div className="big-statement">見えない値札が読めれば<br />払うかどうかを<span className="accent-primary">自分で選べる</span></div>
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
