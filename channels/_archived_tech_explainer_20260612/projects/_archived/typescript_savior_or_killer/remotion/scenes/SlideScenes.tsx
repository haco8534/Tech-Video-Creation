import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="56" height="56" />
            <span className="vs-text">vs</span>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="56" height="56" />
        </div>
        <h2 className="title-large">TypeScriptは<br /><span className="accent-primary">救世主</span>か、<span className="accent-coral">死神</span>か</h2>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-1">
    <div className="content center-layout">
        <h2 className="scene-title">TypeScriptの現在地</h2>
        <div className="metric-grid">
            <div className="metric-card"><div className="metric-value accent-primary">89%</div><div className="metric-label">利用経験率</div></div>
            <div className="metric-card"><div className="metric-value accent-primary">3位</div><div className="metric-label">GitHub PR数</div></div>
            <div className="metric-card"><div className="metric-value accent-primary">4位</div><div className="metric-label">最も好きな言語</div></div>
        </div>
        <div className="source">出典: State of JS 2024 / GitHub Octoverse 2024 / Stack Overflow Developer Survey 2024</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <h2 className="scene-title">問いかけ</h2>
        <div className="big-statement">TypeScriptは<br />JavaScriptを<span className="accent-primary">「救った」</span>のか、</div>
        <div className="big-statement">それとも<span className="accent-coral">「殺した」</span>のか。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-3">
    <div className="content center-layout">
        <h2 className="scene-title">TSが来る前の世界</h2>
        <div className="two-col">
            <div className="arch-card card-js">
                <div className="card-badge badge-js">BEFORE</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="48" height="48" />
                <div className="card-title">魔法の自由さ</div>
                <div className="card-note">テキストエディタ + ブラウザ<br />それだけですぐ動く<br /><strong className="accent-teal">学習コスト最小</strong></div>
            </div>
            <div className="arch-card card-safe">
                <div className="card-badge badge-blue">AFTER</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="48" height="48" />
                <div className="card-title">型の秩序</div>
                <div className="card-note">tsconfig.json + ビルド設定<br />環境構築が必要<br /><strong className="accent-coral">手軽さは死んだ</strong></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-4">
    <div className="content center-layout">
        <h2 className="scene-title">粘土 vs レゴブロック</h2>
        <div className="two-col">
            <div className="col-card">
                <svg viewBox="0 0 120 100" width="140" height="110">
                   <path d="M 20 80 Q 40 20 60 60 Q 80 30 100 80 Q 60 60 20 80" fill="#f7df1e" stroke="#b8860b" strokeWidth="3" stroke-linejoin="round" />
                </svg>
                <div className="col-label"><span className="accent-js">粘土</span> = JavaScript</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="col-card">
                <svg viewBox="0 0 120 100" width="140" height="110">
                   <rect x="25" y="40" width="50" height="40" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="2"/>
                   <rect x="35" y="25" width="10" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
                   <rect x="55" y="25" width="10" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
                   <rect x="75" y="50" width="30" height="30" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="2"/>
                </svg>
                <div className="col-label"><span className="accent-primary">レゴ</span> = TypeScript</div>
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
        <h2 className="scene-title">粘土の魅力</h2>
        <div className="big-statement">何にでも変えられる<span className="accent-amber">自由さ</span></div>
        <svg viewBox="0 0 400 80" width="480" height="90">
            <circle cx="60" cy="40" r="25" fill="#f7df1e" stroke="#b8860b" strokeWidth="2" />
            <text x="60" y="45" textAnchor="middle" fill="#1a1d23" fontSize="11" fontWeight="700">数値</text>
            <path d="M 95 40 L 125 40" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
            <rect x="135" y="18" width="50" height="44" rx="8" fill="#f7df1e" stroke="#b8860b" strokeWidth="2" />
            <text x="160" y="44" textAnchor="middle" fill="#1a1d23" fontSize="11" fontWeight="700">文字列</text>
            <path d="M 195 40 L 225 40" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
            <polygon points="250,18 280,40 250,62" fill="#f7df1e" stroke="#b8860b" strokeWidth="2" />
            <text x="260" y="44" textAnchor="middle" fill="#1a1d23" fontSize="11" fontWeight="700">配列</text>
            <path d="M 290 40 L 320 40" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
            <text x="360" y="46" textAnchor="middle" fill="#b8860b" fontSize="16" fontWeight="900">???</text>
        </svg>
        <div className="callout callout-info">同じ変数にどんな型でも自由に代入できる</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-6">
    <div className="content center-layout">
        <h2 className="scene-title">100人で粘土の城を作ると</h2>
        <div className="two-col">
            <div className="danger-card"><div className="card-badge badge-red">CHAOS</div><div className="card-title">構造が不明</div><div className="card-note">誰が何を作ったか分からない</div></div>
            <div className="danger-card"><div className="card-badge badge-red">CRASH</div><div className="card-title">重みで崩壊</div><div className="card-note">型がないから結合時にバグ爆発</div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <h2 className="scene-title">レゴの安心感</h2>
        <svg viewBox="0 0 300 80" width="360" height="90">
           <rect x="10" y="30" width="60" height="40" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="3"/>
           <rect x="20" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
           <rect x="38" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
           <rect x="80" y="30" width="60" height="40" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="3"/>
           <rect x="90" y="15" width="12" height="15" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
           <rect x="108" y="15" width="12" height="15" fill="#4a90d9" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
           <rect x="150" y="30" width="60" height="40" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="3"/>
           <rect x="160" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
           <rect x="178" y="15" width="12" height="15" fill="#3178c6" stroke="#1e5a9e" strokeWidth="3" rx="1"/>
           <text x="250" y="55" fill="#14b8a6" fontSize="22" fontWeight="900">OK</text>
        </svg>
        <div className="big-statement">ジョイントが合えば<span className="accent-teal">カチッと接続</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-8">
    <div className="content center-layout">
        <h2 className="scene-title">JSの肥大化の歴史</h2>
        <div className="flow-chain">
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="40" height="40" />
                <div className="fc-year accent-amber">1995</div>
                <div>JS誕生<br /><strong>10日で開発</strong></div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-year accent-amber">2005</div>
                <div>Ajax革命<br /><strong>Gmail登場</strong></div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="40" height="40" />
                <div className="fc-year accent-amber">2009</div>
                <div>Node.js<br /><strong>サーバーへ</strong></div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="40" height="40" />
                <div className="fc-year accent-primary">2012</div>
                <div><strong className="accent-primary">TypeScript</strong></div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-primary">
                <div className="fc-year accent-primary">2024</div>
                <div><strong className="accent-primary">覇権 89%</strong></div>
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
        <h2 className="scene-title">Web開発の進化</h2>
        <div className="flow-chain">
            <div className="fc-node"><div className="fc-year accent-amber">1995</div><div>ボタンの色を変える<br /><strong>「飾り」</strong></div></div>
            <div className="fc-arr">→</div>
            <div className="fc-node"><div className="fc-year accent-amber">2005</div><div>Gmail・Google Maps<br /><strong>Webアプリ</strong></div></div>
            <div className="fc-arr">→</div>
            <div className="fc-node fc-node-coral"><div className="fc-year accent-coral">2024</div><div>数百人規模の開発<br /><strong className="accent-coral">型なしは地獄</strong></div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-10">
    <div className="content center-layout">
        <h2 className="scene-title">JSの実行時エラー</h2>
        <div className="code-box">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> app.js</div>
            <div className="code-body" dangerouslySetInnerHTML={{__html: `<span class="kw">function</span> <span class="fn">getLength</span>(input) {\n  <span class="kw">return</span> input.<span class="err">length</span>;  <span class="cm">// 動くまでエラー不明</span>\n}\n<span class="fn">getLength</span>(<span class="str">42</span>);  <span class="cm">// Runtime Error!</span>`}} />
        </div>
        <div className="callout callout-warn">TypeError: Cannot read properties of undefined</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <h2 className="scene-title">TSのコンパイルエラー</h2>
        <div className="code-box">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> app.ts</div>
            <div className="code-body" dangerouslySetInnerHTML={{__html: `<span class="kw">function</span> <span class="fn">getLength</span>(input: <span class="tp">string</span>): <span class="tp">number</span> {\n  <span class="kw">return</span> input.length;\n}\n<span class="fn">getLength</span>(<span class="err">42</span>);\n<span class="cm">// Argument of type 'number' is not</span>\n<span class="cm">//    assignable to parameter of type 'string'</span>`}} />
        </div>
        <div className="callout callout-info">書いた瞬間にエラーが分かる → バグ激減</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-12">
    <div className="content center-layout">
        <h2 className="scene-title">設計者の思想</h2>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">「JavaScriptを大規模<br />アプリケーション開発に<br />対応させる」</div>
            <div className="quote-attr">— Anders Hejlsberg<br />(C# / Turbo Pascal / Delphi 設計者)</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-13">
    <div className="content center-layout">
        <h2 className="scene-title">天才的な戦略</h2>
        <div className="layer-stack">
            <div className="layer-row l-ts">TypeScript（型ルールを追加）<span className="fs-small">新しい層</span></div>
            <div className="layer-row l-js">JavaScript（そのまま全部使える）<span className="fs-small">ベース</span></div>
        </div>
        <div className="big-statement-sm">既存のJSコードが<span className="accent-teal">そのままTSとして動く</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="80" height="80" />
        </div>
        <div className="big-statement">しかし<span className="accent-coral">代償</span>がある</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-15">
    <div className="content center-layout">
        <h2 className="scene-title">TSが奪ったもの</h2>
        <div className="num-list">
            <div className="num-item"><div className="num-circle num-circle-coral">1</div><div><div className="num-title accent-coral">手軽さの喪失</div><div className="num-desc">Hello Worldですら環境構築が必要に</div></div></div>
            <div className="num-item"><div className="num-circle num-circle-coral">2</div><div><div className="num-title accent-coral">型パズル地獄</div><div className="num-desc">コードの半分が「型の呪文」になることも</div></div></div>
            <div className="num-item"><div className="num-circle num-circle-coral">3</div><div><div className="num-title accent-coral">見せかけの安全</div><div className="num-desc">any型で全てが無効化される矛盾</div></div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-16">
    <div className="content center-layout">
        <h2 className="scene-title">型パズルの現実</h2>
        <div className="code-box">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> types.ts</div>
            <div className="code-body" dangerouslySetInnerHTML={{__html: `<span class="kw">type</span> <span class="tp">DeepPartial</span>&lt;T&gt; =\n  T <span class="kw">extends</span> Function ? T :\n  T <span class="kw">extends</span> Array&lt;<span class="kw">infer</span> U&gt;\n    ? _DeepPartialArray&lt;U&gt; :\n  T <span class="kw">extends</span> <span class="tp">object</span>\n    ? _DeepPartialObject&lt;T&gt; :\n  T | <span class="tp">undefined</span>;`}} />
        </div>
        <div className="callout callout-warn">型を通すこと自体が目的に（本末転倒）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <h2 className="scene-title">手軽さの死</h2>
        <div className="two-col">
            <div className="arch-card card-js">
                <div className="card-badge badge-js">BEFORE</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="48" height="48" />
                <div className="card-title">JS時代</div>
                <div className="card-note">テキストエディタで書く<br />F5を押す<br /><strong className="accent-teal">→ 即動く！</strong></div>
            </div>
            <div className="arch-card card-danger">
                <div className="card-badge badge-red">AFTER</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="48" height="48" />
                <div className="card-title">TS時代</div>
                <div className="card-note">tsconfig.json設定<br />ビルドツール導入<br /><strong className="accent-coral">→ 環境構築で1時間</strong></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-18">
    <div className="content center-layout">
        <h2 className="scene-title">any型の皮肉</h2>
        <div className="code-box">
            <div className="code-head"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span> danger.ts</div>
            <div className="code-body" dangerouslySetInnerHTML={{__html: `<span class="kw">const</span> data: <span class="err">any</span> = fetchData();\ndata.<span class="fn">whatever</span>();  <span class="cm">// コンパイル通る</span>\n<span class="cm">// でもランタイムで爆発</span>\n<span class="cm">// any = 型チェック完全無効化</span>`}} />
        </div>
        <div className="big-statement-sm"><span className="accent-coral">any</span> を使った瞬間 = ただの<span className="accent-coral">JavaScript</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <h2 className="scene-title">脱TypeScript宣言</h2>
        <div className="flow-chain">
            <div className="fc-node fc-node-coral">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" width="40" height="40" />
                <div className="fc-year accent-coral">Svelte</div>
                <div>Rich Harris<br /><strong>TS→JSDoc移行</strong></div>
            </div>
            <div className="fc-arr">×</div>
            <div className="fc-node fc-node-coral">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rails/rails-plain.svg" width="40" height="40" />
                <div className="fc-year accent-coral">Turbo</div>
                <div>DHH<br /><strong>TSを全面削除</strong></div>
            </div>
        </div>
        <div className="callout callout-warn">「型は欲しいが、ビルドステップは不要」という声</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-20">
    <div className="content center-layout">
        <h2 className="scene-title">対立ではない</h2>
        <div className="pipe-row">
            <div className="pipe-item"><div className="pipe-icon bg-js">JS</div><div className="pipe-name accent-js">自由な表現</div></div>
            <div className="pipe-plus">+</div>
            <div className="pipe-item"><div className="pipe-icon bg-primary">型</div><div className="pipe-name accent-primary">秩序のフィルター</div></div>
            <div className="pipe-plus">=</div>
            <div className="pipe-item"><div className="pipe-icon bg-teal">OK</div><div className="pipe-name accent-teal">安全な実行</div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <h2 className="scene-title">トレードオフ</h2>
        <div className="hub-flow">
            <div className="hub-node hub-node-js">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="40" height="40" />
                <div>短期の手軽さ<br /><strong>プロトタイプに最適</strong></div>
            </div>
            <div className="vs-badge">VS</div>
            <div className="hub-node hub-node-ts">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="40" height="40" />
                <div>長期の秩序<br /><strong>チーム開発に最適</strong></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-22">
    <div className="content center-layout">
        <h2 className="scene-title">決定的な追い風</h2>
        <div className="two-col">
            <div className="arch-card card-purple">
                <div className="card-badge badge-purple">AI</div>
                <div className="card-title">Copilot</div>
                <div className="card-note">コード予測<br />自動補完</div>
            </div>
            <div className="col-arrow">×</div>
            <div className="arch-card card-safe">
                <div className="card-badge badge-blue">TYPE</div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="48" height="48" />
                <div className="card-note">型ルール<br />明確なコンテキスト</div>
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
        <h2 className="scene-title">型 = AIの道案内</h2>
        <svg viewBox="0 0 500 120" width="560" height="130">
            <rect x="10" y="20" width="140" height="80" rx="10" fill="#dbeafe" stroke="#3178c6" strokeWidth="2"/>
            <text x="80" y="50" textAnchor="middle" fill="#3178c6" fontSize="14" fontWeight="900">型情報</text>
            <text x="80" y="72" textAnchor="middle" fill="#1a1d23" fontSize="11">string | number</text>
            <path d="M 160 60 L 190 60" stroke="#9ca3af" strokeWidth="2" marker-end="url(#arrow)"/>
            <rect x="200" y="20" width="140" height="80" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="270" y="50" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="900">AI推論</text>
            <text x="270" y="72" textAnchor="middle" fill="#1a1d23" fontSize="11">高精度な予測</text>
            <path d="M 350 60 L 380 60" stroke="#9ca3af" strokeWidth="2" marker-end="url(#arrow)"/>
            <rect x="390" y="20" width="100" height="80" rx="10" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="2"/>
            <text x="440" y="55" textAnchor="middle" fill="#14b8a6" fontSize="14" fontWeight="900">正確な</text>
            <text x="440" y="75" textAnchor="middle" fill="#14b8a6" fontSize="14" fontWeight="900">コード</text>
            <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8" fill="#9ca3af"/></marker></defs>
        </svg>
        <div className="big-statement-sm">型があるから<span className="accent-purple">AIも迷わない</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-24">
    <div className="content center-layout">
        <h2 className="scene-title">未来の姿</h2>
        <div className="big-statement">TC39 <span className="accent-primary">Type Annotations</span> 提案</div>
        <div className="flow-row">
            <div className="flow-chip chip-js">JavaScript</div>
            <div className="flow-connector">に</div>
            <div className="flow-chip chip-blue">型注釈</div>
            <div className="flow-connector">を</div>
            <div className="flow-chip chip-teal">標準搭載</div>
        </div>
        <div className="callout callout-info">ビルド不要で型チェックできる未来が見えてきた</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene25: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-25">
    <div className="content center-layout">
        <h2 className="scene-title">結論</h2>
        <div className="big-statement">TSはJSの<span className="accent-amber">「魔法的な自由さ」</span>を<br /><span className="accent-coral">殺した</span>。</div>
        <div className="big-statement">しかし<span className="accent-primary">「工業的な信頼性」</span>を<br /><span className="accent-teal">与えた</span>。</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene26: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-26">
    <div className="content center-layout">
        <h2 className="scene-title">粘土の小屋から高層ビルへ</h2>
        <div className="two-col">
            <div className="col-card">
                <svg viewBox="0 0 100 80" width="120" height="90">
                    <path d="M 20 70 Q 30 30 50 50 Q 70 25 80 70 Z" fill="#f7df1e" stroke="#b8860b" strokeWidth="2"/>
                    <text x="50" y="90" textAnchor="middle" fill="#b8860b" fontSize="10" fontWeight="700">手作りの小屋</text>
                </svg>
            </div>
            <div className="col-arrow">→</div>
            <div className="col-card">
                <svg viewBox="0 0 100 80" width="120" height="90">
                    <rect x="25" y="10" width="50" height="60" fill="#3178c6" stroke="#1e5a9e" strokeWidth="2" rx="2"/>
                    <line x1="25" y1="25" x2="75" y2="25" stroke="#1e5a9e" strokeWidth="1"/>
                    <line x1="25" y1="40" x2="75" y2="40" stroke="#1e5a9e" strokeWidth="1"/>
                    <line x1="25" y1="55" x2="75" y2="55" stroke="#1e5a9e" strokeWidth="1"/>
                    <rect x="40" y="55" width="20" height="15" fill="#dbeafe" stroke="#1e5a9e" strokeWidth="1"/>
                    <text x="50" y="90" textAnchor="middle" fill="#3178c6" fontSize="10" fontWeight="700">高層ビル</text>
                </svg>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene27: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-27">
    <div className="content center-layout">
        <h2 className="scene-title">3つの事実</h2>
        <div className="lesson-cards">
            <div className="lesson-card lesson-card-coral"><div className="lesson-num lesson-num-coral">1</div><div className="lesson-title">自由を殺した</div><div className="lesson-desc">即席で動く手軽さは確かに失われた</div></div>
            <div className="lesson-card lesson-card-primary"><div className="lesson-num">2</div><div className="lesson-title">信頼を与えた</div><div className="lesson-desc">企業開発の主力言語に引き上げた</div></div>
            <div className="lesson-card lesson-card-purple"><div className="lesson-num lesson-num-purple">3</div><div className="lesson-title">AIと融合中</div><div className="lesson-desc">型情報がAIの精度を決定的に高める</div></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene28: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-28">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="64" height="64" />
            <span className="accent-teal" style={{ fontSize: '22px', fontWeight: 900 }}>適材適所</span>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="64" height="64" />
        </div>
        <div className="big-statement">手軽なスクリプトには<span className="accent-js">粘土</span>を<br />大規模アプリには<span className="accent-primary">レゴ</span>を</div>
        <div className="title-large">ご視聴ありがとうございました！</div>
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
    27: Scene27,
    28: Scene28,
};

export const TOTAL_SCENE_COUNT = 29;
