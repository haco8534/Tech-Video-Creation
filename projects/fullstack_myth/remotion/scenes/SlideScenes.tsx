import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-cloud">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
        </div>
        <div className="title-large">「フルスタック」は<br />本当に存在するのか？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">2010年の「フルスタック」</div>
        <div className="year-badge">2010</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
                <div className="card-title">HTML / CSS</div>
                <div className="card-body">フロントエンド</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />
                <div className="card-title">PHP</div>
                <div className="card-body">バックエンド</div>
            </div>
            <div className="arch-card border-amber">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" />
                <div className="card-title">MySQL</div>
                <div className="card-body">データベース</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '24px' }}>数年で習得できる範囲</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">2025年の「スタック」</div>
        <div className="num-list">
            <div className="num-item">
                <div className="icon-row">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" />
                </div>
                <div className="num-text">フロントエンド</div>
            </div>
            <div className="num-item">
                <div className="icon-row">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
                </div>
                <div className="num-text">バックエンド + API</div>
            </div>
            <div className="num-item">
                <div className="icon-row">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
                </div>
                <div className="num-text">インフラ + クラウド + セキュリティ + AI</div>
            </div>
        </div>
        <div className="big-statement accent-coral">2010年の100倍の広さ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">React共同作者の告白</div>
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
        </div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">Docker、Kubernetes、Python、TypeScript、<br />CSS Grid、データベース操作…<br />ぼくはこれらを知らない</div>
            <div className="quote-source">Dan Abramov — "Things I Don't Know as of 2018"</div>
        </div>
        <div className="big-statement">専門家でも<span className="accent-primary">フルスタック</span>にはほど遠い</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">広さ vs 深さ</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">Jack of all trades,<br />master of none</div>
                <div className="compare-body">何でもできるが<br />何も極めていない</div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">…but oftentimes better<br />than a master of one</div>
                <div className="compare-body">一つしか極めていない人より<br />優れていることが多い</div>
            </div>
        </div>
        <div className="source">後半部分は後世に追加されたとする説もある</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">DHHの「One Person Framework」</div>
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rails/rails-plain.svg" />
        </div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">フレームワークが複雑さを吸収すれば、<br />一人でも本格的なアプリを作れる</div>
            <div className="quote-source">DHH — Rails World 2022 "The One Person Framework"</div>
        </div>
        <div className="big-statement"><span className="accent-teal">概念の圧縮</span>で一人の可能性を広げる</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">スタートアップが求める人材</div>
        <div className="metric-grid">
            <div className="metric-card border-primary">
                <div className="metric-value accent-primary">60%</div>
                <div className="metric-label">最初の技術者にフルスタックを採用</div>
                <div className="metric-sub">2020年: 38% → 2024年: 60%</div>
            </div>
        </div>
        <div className="source">出典: LinkedIn Global Talent Trends Report 2024</div>
        <div className="big-statement">全技術のエキスパートではなく<br /><span className="accent-primary">どの部分でも動ける人</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">開発者の役割分布</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label accent-primary">フルスタック</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '100%', background: 'var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-primary">30.7%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">バックエンド</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '54%', background: 'var(--teal)' } as React.CSSProperties}></div></div>
                <div className="bar-value">16.7%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">フロントエンド</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '18%', background: 'var(--amber)' } as React.CSSProperties}></div></div>
                <div className="bar-value">5.6%</div>
            </div>
        </div>
        <div className="source">出典: Stack Overflow Developer Survey 2024（65,000人以上回答）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">大手テック企業のアプローチ</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />
                <div className="compare-title">Google</div>
                <div className="compare-body">「Software Engineer」<br />単一の肩書き<br />全員ジェネラリスト</div>
            </div>
            <div className="compare-card border-teal">
                <div className="text-badge">Spotify</div>
                <div className="compare-title" style={{ marginTop: '12px' }}>Spotify</div>
                <div className="compare-body">スクワッド（6〜12人）<br />チームでフルスタック<br />個人は専門分野を保持</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">スキルの形</div>
        <div className="svg-diagram">
            <svg viewBox="0 0 1200 400" width="1200" height="400">
                {/* I型 */}
                <rect x="60" y="40" width="20" height="300" rx="4" fill="#d1d5db" />
                <text x="70" y="380" textAnchor="middle" fontWeight="900" fontSize="24" fill="#1a1d23">I型</text>
                {/* T型 */}
                <rect x="260" y="40" width="200" height="20" rx="4" fill="#2563eb" />
                <rect x="350" y="40" width="20" height="300" rx="4" fill="#2563eb" />
                <text x="360" y="380" textAnchor="middle" fontWeight="900" fontSize="24" fill="#2563eb">T型</text>
                {/* π型 */}
                <rect x="560" y="40" width="200" height="20" rx="4" fill="#0d9488" />
                <rect x="610" y="40" width="20" height="300" rx="4" fill="#0d9488" />
                <rect x="710" y="40" width="20" height="300" rx="4" fill="#0d9488" />
                <text x="660" y="380" textAnchor="middle" fontWeight="900" fontSize="24" fill="#0d9488">π型</text>
                {/* ラベル */}
                <text x="960" y="60" fontWeight="700" fontSize="20" fill="#1a1d23">横棒 = 幅広い基礎知識</text>
                <text x="960" y="200" fontWeight="700" fontSize="20" fill="#1a1d23">縦棒 = 深い専門性</text>
            </svg>
        </div>
        <div className="big-statement">軸足を持ちつつ<span className="accent-teal">広く見渡せる人材</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">AI時代のフルスタック</div>
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
        </div>
        <div className="big-statement">AIコーディングツールで<br />一人の<span className="accent-primary">カバー範囲</span>が拡大</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">何をAIに任せ、何を自分で深く理解すべきか<br />その判断力こそが問われる時代</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">フルスタックの再定義</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">幻想</div>
                <div className="compare-body">全技術のエキスパート<br />一人で全てをマスター</div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">現実</div>
                <div className="compare-body">スタックの境界を越えて働ける<br />T字型 / π字型の専門性</div>
            </div>
        </div>
        <div className="big-statement">「何でもできる」ではなく<br />「<span className="accent-primary">どこでも動ける</span>」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="big-statement">広く知ることと深く極めること<br />これは<span className="accent-primary">対立ではなく両立できる</span></div>
        <div className="big-statement" style={{ marginTop: '24px' }}>好奇心を忘れなければ<br />自然と<span className="accent-teal">T字型</span>に育っていく</div>
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
};

export const TOTAL_SCENE_COUNT = 13;
