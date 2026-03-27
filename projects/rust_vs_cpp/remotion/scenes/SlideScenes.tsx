import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene scene-opening" id="scene-0">
    <div className="icon-cloud">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
    </div>
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="72" height="72" />
            <span className="vs-label">vs</span>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" width="72" height="72" />
        </div>
        <div className="title-large">Rustは本当に<br /><span className="accent-cpp">C++</span>を置き換えるのか？</div>
        <div className="title-sub">データと事実で徹底検証</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title"><span className="accent-cpp">C++</span>が支える世界</div>
        <div className="three-col">
            <div className="arch-card border-cpp">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg" width="48" height="48" />
                <div className="card-title accent-cpp">ゲームエンジン</div>
                <div className="card-note">Unreal Engine / Unity</div>
            </div>
            <div className="arch-card border-cpp">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" width="48" height="48" />
                <div className="card-title accent-cpp">OS</div>
                <div className="card-note">Windows / Linux カーネル</div>
            </div>
            <div className="arch-card border-cpp">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/embeddedc/embeddedc-original.svg" width="48" height="48" />
                <div className="card-title accent-cpp">組み込み</div>
                <div className="card-note">車載制御 / 航空システム</div>
            </div>
        </div>
        <div className="source-badge">40年以上の実績 — 社会インフラの根幹</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">セキュリティ脆弱性の正体</div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderTop: '4px solid var(--coral)' }}>
                <div className="metric-value accent-coral">70%</div>
                <div className="metric-label">Microsoft<br />メモリ起因の脆弱性</div>
            </div>
            <div className="metric-card" style={{ borderTop: '4px solid var(--coral)' }}>
                <div className="metric-value accent-coral">66%</div>
                <div className="metric-label">Linux カーネル<br />メモリ起因の脆弱性</div>
            </div>
        </div>
        <div className="bar-chart">
            <div className="bar-row"><div className="bar-label">メモリ安全性</div><div className="bar-track"><div className="bar-fill bf-coral" style={{ '--w': '70%' } as React.CSSProperties}></div></div><div className="bar-val">70%</div></div>
            <div className="bar-row"><div className="bar-label">その他</div><div className="bar-track"><div className="bar-fill bf-gray" style={{ '--w': '30%' } as React.CSSProperties}></div></div><div className="bar-val">30%</div></div>
        </div>
        <div className="source-badge">出典: Microsoft Security Response Center / Linux Kernel CVE</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title"><span className="accent-rust">Rust</span>の所有権システム</div>
        <div className="ownership-diagram">
            <div className="ownership-side">
                <h3 className="accent-cpp">C++ — 複数参照</h3>
                <svg viewBox="0 0 300 160" width="300" height="160">
                    <rect x="110" y="6" width="80" height="36" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
                    <text x="150" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1d23">メモリ領域</text>
                    <rect x="20" y="70" width="72" height="32" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
                    <text x="56" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1a1d23">変数A</text>
                    <rect x="114" y="70" width="72" height="32" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
                    <text x="150" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1a1d23">変数B</text>
                    <rect x="208" y="70" width="72" height="32" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
                    <text x="244" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1a1d23">変数C</text>
                    <line x1="56" y1="70" x2="130" y2="42" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4"/>
                    <line x1="150" y1="70" x2="150" y2="42" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4"/>
                    <line x1="244" y1="70" x2="170" y2="42" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4"/>
                    <rect x="60" y="120" width="180" height="32" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                    <text x="150" y="141" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ef4444">解放後アクセス = 危険</text>
                </svg>
            </div>
            <div className="ownership-side">
                <h3 className="accent-rust">Rust — 所有者は1つ</h3>
                <svg viewBox="0 0 300 160" width="300" height="160">
                    <rect x="110" y="6" width="80" height="36" rx="6" fill="#fde8e4" stroke="#ce4120" strokeWidth="2"/>
                    <text x="150" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1d23">メモリ領域</text>
                    <rect x="114" y="70" width="72" height="32" rx="6" fill="#fff" stroke="#ce4120" strokeWidth="2"/>
                    <text x="150" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1a1d23">所有者</text>
                    <line x1="150" y1="70" x2="150" y2="42" stroke="#ce4120" strokeWidth="2.5"/>
                    <circle cx="150" cy="46" r="4" fill="#ce4120"/>
                    <rect x="60" y="120" width="180" height="32" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
                    <text x="150" y="141" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">スコープ終了 = 自動解放</text>
                </svg>
            </div>
        </div>
        <div className="source-badge">ゼロコスト抽象化 — 実行時オーバーヘッドなし</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">性能比較：<span className="accent-rust">Rust</span> vs <span className="accent-cpp">C++</span></div>
        <div className="two-col">
            <div className="compare-card border-rust">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="40" height="40" />
                <h3 className="accent-rust">Rust が得意</h3>
                <div className="check-item"><span className="check-mark">✓</span> 並行処理 +10〜20%</div>
                <div className="check-item"><span className="check-mark">✓</span> 非同期I/O</div>
                <div className="check-item"><span className="check-mark">✓</span> メモリ安全性</div>
            </div>
            <div className="compare-card border-cpp">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" width="40" height="40" />
                <h3 className="accent-cpp">C++ が得意</h3>
                <div className="check-item"><span className="check-mark" style={{ color: 'var(--cpp)' }}>✓</span> SIMD / HPC最適化</div>
                <div className="check-item"><span className="check-mark" style={{ color: 'var(--cpp)' }}>✓</span> 40年分のライブラリ</div>
                <div className="check-item"><span className="check-mark" style={{ color: 'var(--cpp)' }}>✓</span> 超低レベル制御</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '16px' }}>CPUバウンド処理 = <span className="accent-teal">ほぼ同等</span></div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" width="32" height="32" style={{ verticalAlign: 'middle' }} /> Android — Rust導入効果</div>
        <div className="metric-grid">
            <div className="metric-card" style={{ borderTop: '4px solid var(--coral)' }}>
                <div className="caption">導入前</div>
                <div className="metric-value accent-coral">76%</div>
                <div className="metric-label">メモリ脆弱性の割合</div>
            </div>
            <div className="metric-card" style={{ borderTop: '4px solid var(--teal)' }}>
                <div className="caption">導入後</div>
                <div className="metric-value accent-teal">24%</div>
                <div className="metric-label">メモリ脆弱性の割合</div>
            </div>
        </div>
        <div className="bar-chart">
            <div className="bar-row"><div className="bar-label">脆弱性件数（前）</div><div className="bar-track"><div className="bar-fill bf-coral" style={{ '--w': '89%' } as React.CSSProperties}></div></div><div className="bar-val">223件/年</div></div>
            <div className="bar-row"><div className="bar-label">脆弱性件数（後）</div><div className="bar-track"><div className="bar-fill bf-teal" style={{ '--w': '20%' } as React.CSSProperties}></div></div><div className="bar-val">50件以下</div></div>
        </div>
        <div className="source-badge">出典: Google Android Security Report</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">エンタープライズの<span className="accent-rust">Rust</span>採用</div>
        <div className="enterprise-grid">
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" width="40" height="40" />
                <h4>Microsoft</h4>
                <p>Windowsカーネル導入</p>
            </div>
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" width="40" height="40" />
                <h4>Linux</h4>
                <p>カーネル永続的統合</p>
            </div>
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" width="40" height="40" />
                <h4>Cloudflare</h4>
                <p>Nginx → Pingora移行</p>
            </div>
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" width="40" height="40" />
                <h4>AWS</h4>
                <p>Firecracker マイクロVM</p>
            </div>
            <div className="enterprise-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" width="40" height="40" />
                <h4>Discord</h4>
                <p>Go → Rust移行</p>
            </div>
        </div>
        <div className="source-badge">2024年: 45%の企業がRustを本番環境で利用</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">国家が動いた</div>
        <svg viewBox="0 0 64 52" width="56" height="48" style={{ marginBottom: '12px' }}>
            <rect x="8" y="18" width="48" height="30" rx="2" fill="none" stroke="#1a1d23" strokeWidth="2.5"/>
            <polygon points="32,4 8,18 56,18" fill="none" stroke="#1a1d23" strokeWidth="2.5" strokeLinejoin="round"/>
            <rect x="16" y="28" width="10" height="14" rx="1" fill="#1a1d23" opacity=".12"/>
            <rect x="38" y="28" width="10" height="14" rx="1" fill="#1a1d23" opacity=".12"/>
        </svg>
        <div className="big-statement">米国ホワイトハウスが<br /><span className="accent-rust">C/C++からの移行</span>を公式推奨</div>
        <div className="two-col" style={{ marginTop: '20px' }}>
            <div className="arch-card">
                <div className="card-title">DARPA</div>
                <div className="card-note">C/C++→Rust AI自動変換に投資</div>
            </div>
            <div className="arch-card">
                <div className="card-title">CISA</div>
                <div className="card-note">メモリ安全な言語の採用を推奨</div>
            </div>
        </div>
        <div className="source-badge">2024年 国家サイバー長官室 / 2026年までに移行ロードマップ策定を要求</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">それでも<span className="accent-cpp">C++</span>は死なない</div>
        <div className="fortress-grid">
            <div className="fortress-card border-cpp">
                <h4 className="accent-cpp">天文学的コード量</h4>
                <p>全書き換えは物理的に不可能</p>
            </div>
            <div className="fortress-card">
                <h4 className="accent-amber">学習コスト</h4>
                <p>所有権とライフタイムの壁</p>
            </div>
            <div className="fortress-card">
                <h4>エコシステム格差</h4>
                <p>40年分のライブラリ資産</p>
            </div>
            <div className="fortress-card border-cpp">
                <h4 className="accent-cpp">C++も進化中</h4>
                <p>スマートポインタ / C++26</p>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene9: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-9">
    <div className="content center-layout">
        <div className="scene-title">現実解：段階的共存</div>
        <div className="flow-chain">
            <div className="fc-node border-cpp">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" width="40" height="40" />
                <div className="fc-node-title">既存コード</div>
                <div className="fc-node-desc">維持・保守</div>
            </div>
            <span className="fc-arr">→</span>
            <div className="fc-node border-teal">
                <div className="fc-node-title" style={{ fontSize: '24px', marginBottom: '4px' }}>FFI</div>
                <div className="fc-node-desc">シームレス接続</div>
            </div>
            <span className="fc-arr">→</span>
            <div className="fc-node border-rust">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="40" height="40" />
                <div className="fc-node-title">新規コード</div>
                <div className="fc-node-desc">Rustで開発</div>
            </div>
        </div>
        <div className="big-statement" style={{ marginTop: '24px' }}>「全置き換え」ではなく「<span className="accent-teal">大事なところからRustを入れる</span>」</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">まとめ</div>
        <div className="num-list">
            <div className="num-item">
                <div className="num-circle num-circle--rust">1</div>
                <div>
                    <div className="num-title">性能同等 + メモリ安全</div>
                    <div className="num-desc">所有権システムで70%の脆弱性をコンパイル時に根絶</div>
                </div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle--cpp">2</div>
                <div>
                    <div className="num-title">採用が国家レベルに拡大</div>
                    <div className="num-desc">Google・Microsoft・Linux・ホワイトハウスが推進</div>
                </div>
            </div>
            <div className="num-item">
                <div className="num-circle num-circle--teal">3</div>
                <div>
                    <div className="num-title">現実は段階的共存</div>
                    <div className="num-desc">C++一強から「C++ + Rust」のパラダイムシフトへ</div>
                </div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene scene-opening" id="scene-11">
    <div className="content center-layout">
        <div className="icon-row">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" width="56" height="56" />
            <span className="vs-label" style={{ color: 'var(--teal)' }}>+</span>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" width="56" height="56" />
        </div>
        <div className="title-large">新時代の幕開け</div>
        <div className="title-sub">コメント・チャンネル登録お願いします</div>
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
};

export const TOTAL_SCENE_COUNT = 12;
