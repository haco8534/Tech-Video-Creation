import React from "react";
import { AbsoluteFill } from "remotion";
import "./slides.css";

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="opening-keywords">
            <span className="opening-tag tag-fade-1">Blockchain</span>
            <span className="opening-tag tag-fade-2">NFT</span>
            <span className="opening-tag tag-fade-3">DeFi</span>
            <span className="opening-tag tag-fade-4">DAO</span>
            <span className="opening-tag tag-fade-5">Metaverse</span>
        </div>
        <div className="title-large">web3って何だったの？</div>
        <div className="subtitle-text">ブームの熱狂と崩壊、そしてエンジニアの教訓</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">Webの進化</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">Web1</div>
                <div className="fc-node-sub">1990年代 / 読むだけ</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">Web2</div>
                <div className="fc-node-sub">2000年代〜 / 読み書き</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">Web3</div>
                <div className="fc-node-sub">2014年〜 / 読み書き+所有</div>
            </div>
        </div>
        <div className="big-statement">データの支配者を<span className="accent-primary">企業</span>から<span className="accent-teal">ユーザー</span>へ</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">Web3の始まり</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">現在のWebは少数の民間企業を<br />信頼しすぎている</div>
            <div className="quote-source">— Gavin Wood, 2014年「ĐApps: What Web 3.0 Looks Like」</div>
        </div>
        <div className="big-statement">Ethereum共同創設者が描いた<span className="accent-primary">分散型インターネット</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">Web3の技術スタック</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://www.thesvg.org/icons/ethereum/default.svg" />
                <div className="card-title">ブロックチェーン</div>
                <div className="card-body">分散型台帳技術</div>
            </div>
            <div className="arch-card border-teal">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg" />
                <div className="card-title">スマートコントラクト</div>
                <div className="card-body">自動実行される契約</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge">DeFi</div>
                <div className="card-title">分散型金融</div>
                <div className="card-body">銀行不要の金融サービス</div>
            </div>
        </div>
        <div className="flow-chain compact-row">
            <div className="fc-node">
                <div className="text-badge small-badge">NFT</div>
                <div className="fc-node-title">所有証明</div>
            </div>
            <div className="fc-node">
                <div className="text-badge small-badge">DAO</div>
                <div className="fc-node-title">分散型組織</div>
            </div>
            <div className="fc-node">
                <div className="text-badge small-badge">dApps</div>
                <div className="fc-node-title">分散型アプリ</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">NFTアートの衝撃</div>
        <div className="metric-card">
            <div className="metric-value accent-coral">$69.3M</div>
            <div className="metric-label">Beeple "Everydays" NFT落札額</div>
            <div className="metric-sub">2021年3月 / Christie's / 2,200万人が視聴</div>
        </div>
        <div className="source">出典: Christie's / Bloomberg (2021)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">投資マネーの急増</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">DeFi TVL 2020年初</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '1%', background: 'var(--teal)' } as React.CSSProperties}></div></div>
                <div className="bar-value">$10億</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">DeFi TVL 2021年末</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '100%', background: 'var(--teal)' } as React.CSSProperties}></div></div>
                <div className="bar-value">$3,038億</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">VC投資 2021年</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '70%', background: 'var(--amber)' } as React.CSSProperties}></div></div>
                <div className="bar-value">$330億</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">a16z Fund IV</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '15%', background: 'var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-value">$45億</div>
            </div>
        </div>
        <div className="source">出典: Statista / Blockworks / Crunchbase</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">メタバースの夢</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" />
                <div className="card-title">Facebook → Meta</div>
                <div className="card-body">2021年10月に社名変更</div>
            </div>
            <div className="arch-card border-coral">
                <div className="text-badge">VR</div>
                <div className="card-title">Reality Labs</div>
                <div className="card-body">累計損失 $700億超</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge">AI</div>
                <div className="card-title">ピボット</div>
                <div className="card-body">2024年にAIへ方向転換</div>
            </div>
        </div>
        <div className="source">出典: CNBC / Fortune (2023)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">Terra/LUNA暴落</div>
        <div className="metric-card">
            <div className="metric-value accent-coral">$400億+</div>
            <div className="metric-label">消失した資産規模</div>
            <div className="metric-sub">2022年5月 / 3日間で価格がほぼゼロに</div>
        </div>
        <div className="source">出典: Harvard Law School (2023)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="big-statement"><span className="accent-coral">FTX崩壊</span></div>
        <div className="big-statement">顧客資産<span className="accent-coral">$87億</span>が消失</div>
        <div className="big-statement">「信頼不要」の世界で<br /><span className="accent-primary">人を信頼した</span>結果</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">NFT市場の崩壊</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">取引量 2022年1月</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '100%', background: 'var(--primary)' } as React.CSSProperties}></div></div>
                <div className="bar-value">$170億</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">取引量 2022年9月</div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': '3%', background: 'var(--coral)' } as React.CSSProperties}></div></div>
                <div className="bar-value">$4.6億</div>
            </div>
        </div>
        <div className="metric-card">
            <div className="metric-value accent-coral">95%</div>
            <div className="metric-label">時価総額ゼロのNFTコレクション</div>
            <div className="metric-sub">73,257コレクション中 69,795が無価値</div>
        </div>
        <div className="source">出典: dappGambl (2023)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">スケーラビリティの壁</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <img src="https://www.thesvg.org/icons/ethereum/default.svg" />
                <div className="compare-title">Ethereum</div>
                <div className="compare-body">約15件/秒<br />ガス代 $100+</div>
            </div>
            <div className="compare-card border-teal">
                <div className="text-badge">Visa</div>
                <div className="compare-title">Visa</div>
                <div className="compare-body">65,000件/秒<br />手数料 数セント</div>
            </div>
        </div>
        <div className="big-statement"><span className="accent-coral">4,000倍</span>の性能差</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">Signal創設者の批判</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">「分散型」アプリの大半が<br />InfuraとAlchemyの2社に依存している</div>
            <div className="quote-source">— Moxie Marlinspike, 2022年「My first impressions of web3」</div>
        </div>
        <div className="big-statement">分散の<span className="accent-primary">理想</span>と中央集権の<span className="accent-coral">現実</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">分散化のトレードオフ</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-text">検閲耐性 ↔ 処理速度の犠牲（15件/秒 vs 65,000件/秒）</div>
            </div>
            <div className="num-item">
                <div className="num-circle">2</div>
                <div className="num-text">仲介者の排除 ↔ 完全な自己責任（シードフレーズ紛失=資産喪失）</div>
            </div>
            <div className="num-item">
                <div className="num-circle">3</div>
                <div className="num-text">取引の透明性 ↔ プライバシーの喪失（全取引が公開）</div>
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
        <div className="scene-title">最大の成功例</div>
        <div className="metric-card">
            <div className="metric-value accent-teal">$33兆</div>
            <div className="metric-label">ステーブルコイン年間取引量（2025年）</div>
            <div className="metric-sub">前年比72%増 / 金融インフラとして定着</div>
        </div>
        <div className="source">出典: Bloomberg (2026)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene14: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-14">
    <div className="content center-layout">
        <div className="scene-title">生き残った技術</div>
        <div className="three-col">
            <div className="arch-card border-teal">
                <div className="text-badge teal-badge">PoS</div>
                <div className="card-title">Ethereum Merge</div>
                <div className="card-body">電力消費99.9%削減</div>
            </div>
            <div className="arch-card border-primary">
                <div className="text-badge">ZKP</div>
                <div className="card-title">ゼロ知識証明</div>
                <div className="card-body">他分野でも応用拡大</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge amber-badge">RWA</div>
                <div className="card-title">資産トークン化</div>
                <div className="card-body">$230億規模で成長中</div>
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
        <div className="big-statement">この技術は<br /><span className="accent-primary">何の問題を解決するのか？</span></div>
        <div className="big-statement">VCの投資額は<br />技術の有用性とは<span className="accent-coral">無関係</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-16">
    <div className="content center-layout">
        <div className="scene-title">生き残りの条件</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">生き残った</div>
                <ul className="compare-list">
                    <li>ステーブルコイン（国際送金）</li>
                    <li>PoS移行（環境問題）</li>
                    <li>ZKP（プライバシー）</li>
                </ul>
            </div>
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">消えた</div>
                <ul className="compare-list">
                    <li>NFTアート（投機対象）</li>
                    <li>メタバース土地売買</li>
                    <li>Play-to-Earn</li>
                </ul>
            </div>
        </div>
        <div className="big-statement">基準は<span className="accent-primary">課題を解決しているか</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="title-large">それ、何の問題を<br />解決するの？</div>
        <div className="big-statement">最高の<span className="accent-primary">エンジニアリング思考</span></div>
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
