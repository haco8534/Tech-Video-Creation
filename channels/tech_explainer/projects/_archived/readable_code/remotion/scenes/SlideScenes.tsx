import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div className="icon-cloud">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />
        </div>
        <div className="title-large">「コードは読みやすく書け」は<br />本当に正しいのか？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">有名な格言</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">コードを読む時間は、<br />書く時間の<span className="accent-primary">10倍</span></div>
            <div className="quote-source">Robert C. Martin『Clean Code』(2008)</div>
        </div>
        <div className="big-statement" style={{ marginTop: '32px' }}>だから読みやすく書こう…<span className="accent-coral">本当に？</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">Clean Codeの代表的な教え</div>
        <div className="three-col">
            <div className="arch-card border-primary">
                <div className="card-title">関数は短く</div>
                <div className="card-body">1つの関数は<br />1つの責務だけ</div>
            </div>
            <div className="arch-card border-teal">
                <div className="card-title">名前で伝える</div>
                <div className="card-body">変数名・関数名で<br />意図を表現する</div>
            </div>
            <div className="arch-card border-coral">
                <div className="card-title">コメントより<br />コード</div>
                <div className="card-body">コード自体を<br />読みやすくする</div>
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
        <div className="scene-title">ソフトウェアの保守コスト</div>
        <div className="bar-chart">
            <div className="bar-row">
                <div className="bar-label">保守</div>
                <div className="bar-track">
                    <div className="bar-fill" style={{ '--w': '75%', background: 'var(--primary)' } as React.CSSProperties}></div>
                </div>
                <div className="bar-value accent-primary">60-80%</div>
            </div>
            <div className="bar-row">
                <div className="bar-label">新規開発</div>
                <div className="bar-track">
                    <div className="bar-fill" style={{ '--w': '25%', background: 'var(--teal)' } as React.CSSProperties}></div>
                </div>
                <div className="bar-value accent-teal">20-40%</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '32px' }}>読みやすさの功績は<span className="accent-primary">大きい</span></div>
        <div className="source">出典: 業界見積もり（条件により変動）</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">読みやすさ vs パフォーマンス</div>
        <div className="two-col">
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">Clean Code式</div>
                <div className="compare-body">ポリモーフィズムで分離<br />各クラスに単一責務<br />抽象化で拡張性を確保</div>
            </div>
            <div className="compare-card border-coral">
                <div className="compare-title accent-coral">switch文式</div>
                <div className="compare-body">1つの関数にまとめる<br />分岐で処理を振り分け<br />データの局所性を維持</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '24px' }}>場合により<span className="accent-coral">数十倍</span>の速度差</div>
        <div className="source">Casey Muratori "Clean Code, Horrible Performance" (2023)</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">なぜ「きれいなコード」が遅くなるのか</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">クラス分離</div>
                <div className="fc-node-sub">データが散らばる</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">仮想関数</div>
                <div className="fc-node-sub">間接呼び出し</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">分岐予測失敗</div>
                <div className="fc-node-sub">CPUパイプライン</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">キャッシュミス</div>
                <div className="fc-node-sub">大幅な速度低下</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '32px' }}>人間の整理 ≠ CPUの整理</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">パフォーマンス優先の現場</div>
        <div className="three-col">
            <div className="arch-card border-coral">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg" />
                <div className="card-title">ゲームエンジン</div>
                <div className="card-body">毎秒60フレーム<br />データ指向設計</div>
            </div>
            <div className="arch-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
                <div className="card-title">データベース</div>
                <div className="card-body">マイクロ秒単位<br />クエリ最適化</div>
            </div>
            <div className="arch-card border-amber">
                <div className="text-badge">暗号</div>
                <div className="card-title">暗号ライブラリ</div>
                <div className="card-body">定時間処理<br />セキュリティ優先</div>
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
        <div className="scene-title">「誰にとっての」読みやすさ？</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <div className="compare-title accent-primary">医師同士</div>
                <div className="compare-body">専門用語 + 略語<br />= 最も効率的</div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title accent-teal">患者向け</div>
                <div className="compare-body">平易な言葉で説明<br />= 理解しやすい</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '32px' }}>読み手が変われば<br /><span className="accent-primary">最適な書き方</span>も変わる</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">科学計算・シェーダーの世界</div>
        <div className="two-col">
            <div className="compare-card border-coral">
                <div className="compare-title">研究者にとって読みやすい</div>
                <div className="code-box">
                    <div className="code-body">a = b * c + d</div>
                </div>
            </div>
            <div className="compare-card border-teal">
                <div className="compare-title">Clean Code的に正しい</div>
                <div className="code-box">
                    <div className="code-body">result = multiplier<br />  * coefficient<br />  + offset</div>
                </div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '24px' }}>分野の常識 ≠ 教科書の常識</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">スキルで変わる「読みやすさ」</div>
        <div className="two-col">
            <div className="compare-card border-primary">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" />
                <div className="compare-title">NumPy</div>
                <div className="compare-body">短い変数名が慣習<br />論文の数式表記と一致</div>
            </div>
            <div className="compare-card border-amber">
                <div className="text-badge">/.*/</div>
                <div className="compare-title">正規表現</div>
                <div className="compare-body">熟練者には1行で明快<br />初心者にはif文20行の方が親切</div>
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
        <div className="scene-title">過剰な抽象化の罠</div>
        <div className="flow-chain">
            <div className="fc-node">
                <div className="fc-node-title">関数A</div>
                <div className="fc-node-sub">処理を委譲</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">関数B</div>
                <div className="fc-node-sub">さらに委譲</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node">
                <div className="fc-node-title">関数C</div>
                <div className="fc-node-sub">まだ委譲</div>
            </div>
            <div className="fc-arr">→</div>
            <div className="fc-node highlight">
                <div className="fc-node-title">実処理</div>
                <div className="fc-node-sub">たった1行</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '32px' }}>整理したはずが<span className="accent-coral">迷路</span>に</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">先人たちの声</div>
        <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-body">深い呼び出しの連鎖より、少し長くても<br />1つにまとまっている方が理解しやすい</div>
            <div className="quote-source">John Carmack（id Software創業者）</div>
        </div>
        <div className="quote-block" style={{ marginTop: '24px' }}>
            <div className="quote-mark">"</div>
            <div className="quote-body">Clean codeは<span className="accent-primary">目的</span>ではなく<span className="accent-teal">手段</span></div>
            <div className="quote-source">Dan Abramov（React開発者）</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title">コンテキストで使い分ける</div>
        <div className="three-col">
            <div className="arch-card border-teal">
                <div className="card-title">ビジネスロジック</div>
                <div className="card-body">読みやすさ最優先<br />変更頻度が高い</div>
            </div>
            <div className="arch-card border-coral">
                <div className="card-title">ホットパス</div>
                <div className="card-body">速度優先<br />コメントで補足</div>
            </div>
            <div className="arch-card border-amber">
                <div className="card-title">ライブラリAPI</div>
                <div className="card-body">使う側の<br />分かりやすさ</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '24px' }}><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" style={{ verticalAlign: 'middle' }} width="40" /> Googleの「Readability」認定制度</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">コードを書く前に問う3つ</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle">1</div>
                <div className="num-text">このコードを読むのは<span className="accent-primary">誰</span>か？</div>
            </div>
            <div className="num-item">
                <div className="num-circle">2</div>
                <div className="num-text">求められる<span className="accent-teal">性能</span>は何か？</div>
            </div>
            <div className="num-item">
                <div className="num-circle">3</div>
                <div className="num-text">この抽象化は理解を<span className="accent-coral">助けているか</span>？</div>
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
        <div className="big-statement">読みやすさは<span className="accent-primary">出発点</span>であって<br /><span className="accent-teal">ゴール</span>ではない</div>
        <div className="big-statement" style={{ marginTop: '32px' }}>何のために、<span className="accent-coral">誰のために</span>書くのか<br />問い続けよう</div>
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
