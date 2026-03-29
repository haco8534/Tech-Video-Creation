import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="icon-cloud">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
    </div>
    <div className="content center-layout">
        <div className="title-large">最近のwebアプリ<br />重すぎ！</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">Webページサイズの推移</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">2010年</div>
                <div className="bar-track"><div className="bar-fill bar-fill-teal" style={{ '--w': '18%' } as React.CSSProperties}></div></div>
                <div className="bar-value">468KB</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">2015年</div>
                <div className="bar-track"><div className="bar-fill bar-fill-coral" style={{ '--w': '50%' } as React.CSSProperties}></div></div>
                <div className="bar-value">2,000KB</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">2020年</div>
                <div className="bar-track"><div className="bar-fill bar-fill-coral" style={{ '--w': '55%' } as React.CSSProperties}></div></div>
                <div className="bar-value">2,100KB</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">2024年</div>
                <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '70%' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-primary">2,600KB</div>
            </div>
        </div>
        <div className="source">出典: HTTP Archive State of the Web</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">1996年 vs 2024年</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="year-badge" style={{ background: 'var(--teal)' }}>1996</div>
                <div className="compare-title">Space Jam 公式サイト</div>
                <div className="compare-body accent-teal" style={{ fontSize: '48px', fontWeight: '900' }}>~2KB</div>
                <div className="compare-body">HTML + テーブルレイアウト</div>
            </div>
            <div className="compare-card border-primary">
                <div className="year-badge">2024</div>
                <div className="compare-title">平均的なWebページ</div>
                <div className="compare-body accent-primary" style={{ fontSize: '48px', fontWeight: '900' }}>~2,600KB</div>
                <div className="compare-body">約1,300倍</div>
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
        <div className="scene-title">JavaScript転送量（中央値）</div>
        <div className="metric-card">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="64" height="64" />
            <div className="metric-value accent-primary">560KB</div>
            <div className="metric-label">デスクトップ / gzip圧縮後</div>
            <div className="metric-sub">展開後は数倍に膨張</div>
        </div>
        <div className="source">出典: HTTP Archive 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">表示速度とユーザー離脱</div>
        <div className="big-statement">読み込み <span className="accent-primary">1秒→3秒</span> で<br />直帰率 <span className="accent-primary">+32%</span></div>
        <div className="big-statement" style={{ marginTop: '24px' }}>読み込み <span className="accent-primary">1秒→5秒</span> で<br />直帰率 <span className="accent-primary">+90%</span></div>
        <div className="source">出典: Google / Think with Google 2018</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">Webの進化</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">静的HTML</div>
                <div className="fc-node-sub">1990s</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">Ajax</div>
                <div className="fc-node-sub">2005</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <div className="fc-node-title">SPA時代</div>
                <div className="fc-node-sub">2013~</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">肥大化</div>
                <div className="fc-node-sub">現在</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">SPA（Single Page Application）</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="compare-title">従来のWebサイト</div>
                <div className="compare-body">クリックごとに<br />サーバーから新しいHTMLを取得</div>
            </div>
            <div className="compare-card border-primary">
                <div className="compare-title">SPA</div>
                <div className="compare-body">初回にJS全体を読み込み<br />以降はブラウザ内で画面遷移</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">肥大化の3大原因</div>
        <div className="num-list">
            <div className="num-item border-primary">
                <div className="num-circle">1</div>
                <div className="num-text">フレームワークの多層化</div>
            </div>
            <div className="num-item border-coral">
                <div className="num-circle" style={{ background: 'var(--coral)' }}>2</div>
                <div className="num-text">依存パッケージの爆発</div>
            </div>
            <div className="num-item border-amber">
                <div className="num-circle" style={{ background: 'var(--amber)' }}>3</div>
                <div className="num-text">サードパーティスクリプト</div>
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
        <div className="scene-title">フレームワーク本体サイズ（gzip後）</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">Angular</div>
                <div className="bar-track"><div className="bar-fill bar-fill-primary" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
                <div className="bar-value">~60KB</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">React 18</div>
                <div className="bar-track"><div className="bar-fill bar-fill-coral" style={{ '--w': '73%' } as React.CSSProperties}></div></div>
                <div className="bar-value">~44KB</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">Vue 3</div>
                <div className="bar-track"><div className="bar-fill bar-fill-teal" style={{ '--w': '55%' } as React.CSSProperties}></div></div>
                <div className="bar-value">~33KB</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">Svelte</div>
                <div className="bar-track"><div className="bar-fill bar-fill-amber" style={{ '--w': '3%' } as React.CSSProperties}></div></div>
                <div className="bar-value accent-teal">~2KB</div>
            </div>
        </div>
        <div className="source">出典: bundlephobia.com</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">node_modules問題</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" />
                <div className="card-title">200万+</div>
                <div className="card-body">npmパッケージ数</div>
            </div>
            <div className="arch-card border-coral">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <div className="card-title">~1,400</div>
                <div className="card-body">CRA初期パッケージ数</div>
            </div>
            <div className="arch-card border-amber">
                <div className="card-title">200MB+</div>
                <div className="card-body">Hello World時点の容量</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">left-pad事件（2016年）</div>
        <div className="big-statement">たった<span className="accent-primary">11行</span>のパッケージ削除で<br />React・Babelが<span className="accent-primary">ビルド不能</span>に</div>
        <div className="source">何千ものパッケージが間接依存していた</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="big-statement-lg">「本当にこのサイトに<br /><span className="accent-teal">SPA</span>が必要なのか？」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">軽量化の新アプローチ</div>
        <div className="three-col">
            <div className="arch-card border-teal">
                <div className="text-badge text-badge-teal">htmx</div>
                <div className="card-title">HTMX</div>
                <div className="card-body">14KB / HTML断片で部分更新</div>
            </div>
            <div className="arch-card border-coral">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" />
                <div className="card-title">Svelte</div>
                <div className="card-body">ランタイムほぼ0KB</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge text-badge-amber">Astro</div>
                <div className="card-title">Astro</div>
                <div className="card-body">デフォルトJS 0KB</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">適材適所の選択</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <div className="compare-title">SPA / React</div>
                <div className="compare-body">Notion、Figmaなど<br />複雑なWebアプリ向き</div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title">軽量アプローチ</div>
                <div className="compare-body">ブログ、企業サイトなど<br />コンテンツ中心のサイト向き</div>
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
        <div className="scene-title">まとめ</div>
        <div className="num-list">
            <div className="num-item border-primary">
                <div className="num-circle">1</div>
                <div className="num-text">15年で5倍以上に肥大化（特にJS）</div>
            </div>
            <div className="num-item border-coral">
                <div className="num-circle" style={{ background: 'var(--coral)' }}>2</div>
                <div className="num-text">SPA + 依存爆発 + 外部スクリプト</div>
            </div>
            <div className="num-item border-teal">
                <div className="num-circle" style={{ background: 'var(--teal)' }}>3</div>
                <div className="num-text">HTMX / Svelte / Astroなど軽量化の波</div>
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
        <div className="big-statement-lg">作るものに合った<br /><span className="accent-teal">技術を選ぶ</span></div>
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
