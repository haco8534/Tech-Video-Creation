import React from 'react';
import { AbsoluteFill } from 'remotion';
import './slides.css';

export const Scene0: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-0">
    <div className="content center-layout">
        <div style={{ marginBottom: '16px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
        </div>
        <div className="title-large">USBはなぜ形が<br /><span className="accent-primary">統一されない</span>のか</div>
        <div style={{ fontSize: '16px', color: 'var(--text-light)', marginTop: '12px' }}>── 30年の進化と統一の物語 ──</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene1: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-1">
    <div className="content center-layout">
        <div className="scene-title">USBコネクタの種類</div>
        <div className="connector-row" style={{ marginTop: '12px' }}>
            <div className="connector-item stagger-item">
                <svg width="60" height="70" viewBox="0 0 60 70"><rect x="5" y="10" width="50" height="24" rx="3" fill="none" stroke="#0891b2" strokeWidth="2"/><rect x="15" y="16" width="30" height="12" rx="1" fill="#e0f7fa"/><line x1="22" y1="20" x2="22" y2="24" stroke="#0891b2" strokeWidth="2"/><line x1="30" y1="20" x2="30" y2="24" stroke="#0891b2" strokeWidth="2"/><line x1="38" y1="20" x2="38" y2="24" stroke="#0891b2" strokeWidth="2"/><line x1="46" y1="20" x2="46" y2="24" stroke="#0891b2" strokeWidth="2"/></svg>
                <div className="connector-label">USB-A</div>
                <div className="connector-pin">4ピン</div>
            </div>
            <div className="connector-item stagger-item">
                <svg width="50" height="70" viewBox="0 0 50 70"><path d="M10 10 L40 10 L45 20 L45 34 L5 34 L5 20 Z" fill="none" stroke="#f59e0b" strokeWidth="2"/><rect x="12" y="16" width="26" height="12" rx="1" fill="#fef3c7"/></svg>
                <div className="connector-label">Mini-B</div>
                <div className="connector-pin">5ピン</div>
            </div>
            <div className="connector-item stagger-item">
                <svg width="50" height="70" viewBox="0 0 50 70"><path d="M8 14 L42 14 L46 20 L46 28 L4 28 L4 20 Z" fill="none" stroke="#ef4444" strokeWidth="2"/><rect x="12" y="18" width="26" height="6" rx="1" fill="#fee2e2"/></svg>
                <div className="connector-label">Micro-B</div>
                <div className="connector-pin">5ピン</div>
            </div>
            <div className="connector-item stagger-item">
                <svg width="50" height="70" viewBox="0 0 50 70"><rect x="8" y="14" width="34" height="16" rx="8" fill="none" stroke="#7c3aed" strokeWidth="2"/><rect x="14" y="18" width="22" height="8" rx="4" fill="#ede9fe"/></svg>
                <div className="connector-label">USB-C</div>
                <div className="connector-pin accent-purple" style={{ fontWeight: '900' }}>24ピン</div>
            </div>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-light)', marginTop: '16px' }}>全部「USB」なのに、なぜ形が違う？</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene2: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-2">
    <div className="content center-layout">
        <div className="scene-title">もし<span className="accent-coral">USB</span>がなかったら？</div>
        <div className="flow-row" style={{ marginTop: '16px', flexWrap: 'wrap' }}>
            <div className="flow-chip chip-coral stagger-item">シリアル 9pin</div>
            <div className="flow-chip chip-coral stagger-item">パラレル 25pin</div>
            <div className="flow-chip chip-amber stagger-item">PS/2 ×2</div>
            <div className="flow-chip chip-coral stagger-item">SCSI 50pin</div>
            <div className="flow-chip chip-amber stagger-item">ゲームポート</div>
            <div className="flow-chip chip-coral stagger-item">VGA 15pin</div>
        </div>
        <div className="big-statement" style={{ marginTop: '20px' }}>
            <span className="accent-coral">機器ごとに全部違うケーブル</span>が必要
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene3: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-3">
    <div className="content center-layout">
        <div className="scene-title">1995年のPC背面</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
            <div className="card stagger-item" style={{ width: '130px' }}>
                <div className="card-badge badge-coral">シリアル</div>
                <div className="card-title" style={{ fontSize: '14px' }}>9ピン / 25ピン</div>
                <div className="card-note">マウス・モデム</div>
            </div>
            <div className="card stagger-item" style={{ width: '130px' }}>
                <div className="card-badge badge-coral">パラレル</div>
                <div className="card-title" style={{ fontSize: '14px' }}>25ピン</div>
                <div className="card-note">プリンタ</div>
            </div>
            <div className="card stagger-item" style={{ width: '130px' }}>
                <div className="card-badge badge-amber">PS/2</div>
                <div className="card-title" style={{ fontSize: '14px' }}>6ピン ×2</div>
                <div className="card-note">キーボード・マウス</div>
            </div>
            <div className="card stagger-item" style={{ width: '130px' }}>
                <div className="card-badge badge-amber">VGA</div>
                <div className="card-title" style={{ fontSize: '14px' }}>15ピン</div>
                <div className="card-note">モニター</div>
            </div>
            <div className="card stagger-item" style={{ width: '130px' }}>
                <div className="card-badge badge-coral">ゲーム</div>
                <div className="card-title" style={{ fontSize: '14px' }}>15ピン</div>
                <div className="card-note">ジョイスティック</div>
            </div>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text)', marginTop: '14px', fontWeight: '700' }}>全部形もサイズも違う = ケーブル地獄</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene4: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-4">
    <div className="content center-layout">
        <div className="scene-title">コンセントが全部違う家</div>
        <div className="two-col" style={{ marginTop: '12px' }}>
            <div className="card card-coral stagger-item" style={{ width: '200px' }}>
                <div className="card-badge badge-coral">家電の世界</div>
                <div style={{ fontSize: '46px', margin: '8px 0' }}>🏠</div>
                <div className="card-note">冷蔵庫・テレビ・ドライヤー<br />全部同じコンセント</div>
                <div className="tag-row"><span className="tag tag-emerald">✓ 統一済み</span></div>
            </div>
            <div className="vs-divider">VS</div>
            <div className="card card-coral stagger-item" style={{ width: '200px' }}>
                <div className="card-badge badge-coral">1995年のPC</div>
                <div style={{ fontSize: '46px', margin: '8px 0' }}>💻</div>
                <div className="card-note">マウス・プリンタ・モデム<br />全部違うポート</div>
                <div className="tag-row"><span className="tag tag-coral">✗ バラバラ</span></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene5: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-5">
    <div className="content center-layout">
        <div className="scene-title">USBの誕生</div>
        <div className="timeline" style={{ marginTop: '10px' }}>
            <div className="tl-item stagger-item">
                <div className="tl-year">1994</div>
                <div className="tl-dot dot-hl"></div>
                <div className="tl-name">Ajay Bhatt</div>
                <div className="tl-desc">Intelで提案</div>
            </div>
            <div className="tl-item stagger-item">
                <div className="tl-year">1995</div>
                <div className="tl-dot"></div>
                <div className="tl-name">7社連合</div>
                <div className="tl-desc">Intel, MS,<br />IBM, NEC…</div>
            </div>
            <div className="tl-item stagger-item">
                <div className="tl-year">1996</div>
                <div className="tl-dot dot-hl"></div>
                <div className="tl-name">USB 1.0</div>
                <div className="tl-desc">12 Mbps</div>
            </div>
            <div className="tl-item stagger-item">
                <div className="tl-year">2000</div>
                <div className="tl-dot"></div>
                <div className="tl-name">USB 2.0</div>
                <div className="tl-desc">480 Mbps</div>
            </div>
        </div>
        <div className="card card-primary stagger-item" style={{ marginTop: '14px', maxWidth: '420px' }}>
            <div className="card-note" style={{ fontSize: '15px' }}><strong>特許はロイヤリティフリー</strong>で公開 → 爆発的普及の原動力に</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene6: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-6">
    <div className="content center-layout">
        <div className="scene-title">なぜ<span className="accent-emerald">A</span>と<span className="accent-primary">B</span>で形が違う？</div>
        <div className="two-col" style={{ marginTop: '12px' }}>
            <div className="card card-emerald stagger-item" style={{ width: '200px' }}>
                <div className="card-badge badge-emerald">Type-A</div>
                <svg width="100" height="50" viewBox="0 0 100 50"><rect x="10" y="10" width="80" height="30" rx="3" fill="none" stroke="#10b981" strokeWidth="2"/><rect x="20" y="16" width="60" height="18" rx="1" fill="#d1fae5"/></svg>
                <div className="card-title" style={{ fontSize: '14px' }}>ホスト（PC側）</div>
                <div className="card-note">電気を<strong>送る</strong>側</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="60" height="40" viewBox="0 0 60 40"><path d="M5 20 L45 20" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4"/><polygon points="45,14 55,20 45,26" fill="#ef4444"/><text x="30" y="12" fontSize="9" fill="#ef4444" textAnchor="middle" fontWeight="700">電流</text></svg>
            </div>
            <div className="card card-primary stagger-item" style={{ width: '200px' }}>
                <div className="card-badge badge-primary">Type-B</div>
                <svg width="80" height="50" viewBox="0 0 80 50"><path d="M15 10 L65 10 L70 18 L70 40 L10 40 L10 18 Z" fill="none" stroke="#0891b2" strokeWidth="2"/><rect x="22" y="18" width="36" height="16" rx="1" fill="#e0f7fa"/></svg>
                <div className="card-title" style={{ fontSize: '14px' }}>デバイス（周辺機器）</div>
                <div className="card-note">電気を<strong>受ける</strong>側</div>
            </div>
        </div>
        <div className="card card-coral stagger-item" style={{ marginTop: '14px', maxWidth: '420px' }}>
            <div className="card-note" style={{ fontSize: '14px' }}>⚠️ 両端が同じ形だと<strong>PC同士を接続→ショート</strong>の危険！<br />形を変えて<strong>物理的に防いだ</strong>＝安全装置</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene7: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-7">
    <div className="content center-layout">
        <div className="scene-title">小さくする戦い</div>
        <div className="three-col" style={{ marginTop: '12px' }}>
            <div className="card stagger-item" style={{ width: '150px' }}>
                <div className="card-badge badge-primary">Type-B</div>
                <svg width="80" height="60" viewBox="0 0 80 60"><path d="M10 5 L70 5 L75 15 L75 55 L5 55 L5 15 Z" fill="none" stroke="#0891b2" strokeWidth="2"/></svg>
                <div className="card-title" style={{ fontSize: '13px' }}>大型</div>
                <div className="card-note">1996年〜<br />プリンタ等</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="card stagger-item" style={{ width: '150px' }}>
                <div className="card-badge badge-amber">Mini-B</div>
                <svg width="60" height="50" viewBox="0 0 60 50"><path d="M10 5 L50 5 L55 15 L55 35 L5 35 L5 15 Z" fill="none" stroke="#f59e0b" strokeWidth="2"/></svg>
                <div className="card-title" style={{ fontSize: '13px' }}>小型</div>
                <div className="card-note">2000年〜<br />デジカメ等</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="card stagger-item" style={{ width: '150px' }}>
                <div className="card-badge badge-coral">Micro-B</div>
                <svg width="60" height="40" viewBox="0 0 60 40"><path d="M8 5 L52 5 L56 12 L56 25 L4 25 L4 12 Z" fill="none" stroke="#ef4444" strokeWidth="2"/></svg>
                <div className="card-title" style={{ fontSize: '13px' }}>超薄型</div>
                <div className="card-note">2007年〜<br />スマホ等</div>
            </div>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text)', marginTop: '12px' }}>デバイスが小さくなる → コネクタも小さくするしかない</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene8: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-8">
    <div className="content center-layout">
        <div className="scene-title">Type-Bは携帯に入らない</div>
        <div className="two-col" style={{ marginTop: '10px' }}>
            <div className="card card-coral stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-coral">Type-B → 携帯</div>
                <svg width="180" height="120" viewBox="0 0 180 120"><rect x="40" y="10" width="100" height="100" rx="10" fill="none" stroke="#d1d5db" strokeWidth="2"/><rect x="55" y="25" width="70" height="50" rx="2" fill="#f3f4f6"/><text x="90" y="55" fontSize="10" fill="#6b7280" textAnchor="middle">基板</text><rect x="60" y="80" width="60" height="15" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/><text x="90" y="91" fontSize="8" fill="#b45309" textAnchor="middle">バッテリー</text><rect x="140" y="35" width="35" height="40" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/><text x="157" y="58" fontSize="7" fill="#ef4444" textAnchor="middle">Type-B</text><text x="157" y="68" fontSize="16" fill="#ef4444" textAnchor="middle">✗</text></svg>
                <div className="card-note" style={{ color: 'var(--coral)' }}>物理的に収まらない！</div>
            </div>
            <div className="col-arrow">→</div>
            <div className="card card-emerald stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-emerald">Mini-B → 携帯</div>
                <svg width="180" height="120" viewBox="0 0 180 120"><rect x="40" y="10" width="100" height="100" rx="10" fill="none" stroke="#d1d5db" strokeWidth="2"/><rect x="55" y="25" width="70" height="50" rx="2" fill="#f3f4f6"/><text x="90" y="55" fontSize="10" fill="#6b7280" textAnchor="middle">基板</text><rect x="60" y="80" width="60" height="15" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/><text x="90" y="91" fontSize="8" fill="#b45309" textAnchor="middle">バッテリー</text><rect x="140" y="45" width="20" height="20" rx="2" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/><text x="150" y="58" fontSize="7" fill="#10b981" textAnchor="middle">Mini</text><text x="150" y="72" fontSize="14" fill="#10b981" textAnchor="middle">✓</text></svg>
                <div className="card-note" style={{ color: 'var(--emerald)' }}>小型化で解決！</div>
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
        <div className="scene-title">耐久性の<span className="accent-coral">問題</span></div>
        <div className="two-col" style={{ marginTop: '14px' }}>
            <div className="card card-coral stagger-item" style={{ width: '200px' }}>
                <div className="card-badge badge-coral">Mini-USB</div>
                <div style={{ fontSize: 'var(--fs-hero)', fontWeight: '900', color: 'var(--coral)' }}>5,000</div>
                <div className="card-note">回の挿抜で寿命</div>
                <div style={{ fontSize: '12px', color: 'var(--coral)', marginTop: '6px' }}>初期設計は約1,000回</div>
            </div>
            <div className="vs-divider">VS</div>
            <div className="card card-emerald stagger-item" style={{ width: '200px' }}>
                <div className="card-badge badge-emerald">Micro-USB</div>
                <div style={{ fontSize: 'var(--fs-hero)', fontWeight: '900', color: 'var(--emerald)' }}>10,000</div>
                <div className="card-note">回の挿抜で寿命</div>
                <div style={{ fontSize: '12px', color: 'var(--emerald)', marginTop: '6px' }}>耐久性2倍！</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene10: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-10">
    <div className="content center-layout">
        <div className="scene-title">壊れるなら<span className="accent-emerald">安い方</span>で</div>
        <div className="two-col" style={{ marginTop: '14px' }}>
            <div className="card card-emerald stagger-item" style={{ width: '220px' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔌</div>
                <div className="card-title">ケーブルが壊れた</div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--emerald)', margin: '4px 0' }}>¥500</div>
                <div className="card-note">で交換</div>
            </div>
            <div className="vs-divider">VS</div>
            <div className="card card-coral stagger-item" style={{ width: '220px' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>📱</div>
                <div className="card-title">端末のポートが壊れた</div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--coral)', margin: '4px 0' }}>¥10,000</div>
                <div className="card-note">の修理費</div>
            </div>
        </div>
        <div className="card card-primary stagger-item" style={{ marginTop: '14px', maxWidth: '440px' }}>
            <div className="card-note" style={{ fontSize: '14px' }}>Micro-USBは<strong>摩耗しやすいバネ部品をケーブル側に移動</strong><br />→ 壊れるなら安いケーブル側で壊れる設計</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene11: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-11">
    <div className="content center-layout">
        <div className="scene-title">コネクタ進化の系譜</div>
        <div className="flow-row" style={{ marginTop: '12px' }}>
            <div className="flow-chip chip-primary stagger-item">Type-B<br /><span style={{ fontSize: '10px' }}>1996</span></div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-amber stagger-item">Mini-B<br /><span style={{ fontSize: '10px' }}>2000</span></div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-coral stagger-item">Micro-B<br /><span style={{ fontSize: '10px' }}>2007</span></div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-emerald stagger-item" style={{ borderWidth: '2px' }}>GSMA統一<br /><span style={{ fontSize: '10px' }}>2009</span></div>
        </div>
        <div className="tag-row" style={{ marginTop: '14px' }}>
            <span className="tag tag-primary stagger-item">小型化 -60%</span>
            <span className="tag tag-emerald stagger-item">耐久性 ×2</span>
            <span className="tag tag-amber stagger-item">Mini-A 非推奨化</span>
            <span className="tag tag-primary stagger-item">14社がMoU署名</span>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene12: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-12">
    <div className="content center-layout">
        <div className="scene-title accent-purple">USB-C登場</div>
        <div style={{ margin: '12px 0' }}>
            <svg width="200" height="60" viewBox="0 0 200 60"><rect x="30" y="10" width="140" height="40" rx="20" fill="none" stroke="#7c3aed" strokeWidth="3"/><rect x="50" y="18" width="100" height="24" rx="12" fill="#ede9fe"/><text x="100" y="35" fontSize="14" fill="#7c3aed" textAnchor="middle" fontWeight="900">USB-C</text></svg>
        </div>
        <div style={{ fontSize: '24px', fontWeight: '900' }}>2014年 —— リバーシブル革命</div>
        <div className="tag-row" style={{ marginTop: '12px' }}>
            <span className="tag tag-purple stagger-item">上下どちらでも挿せる</span>
            <span className="tag tag-purple stagger-item">24ピン</span>
            <span className="tag tag-purple stagger-item">最大240W給電</span>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene13: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-13">
    <div className="content center-layout">
        <div className="scene-title">リバーシブル設計</div>
        <div className="two-col" style={{ marginTop: '12px' }}>
            <div className="card card-coral stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-coral">USB-A</div>
                <div style={{ fontSize: '14px', textAlign: 'left', lineHeight: '2' }}>
                    <div>1回目：入らない ✗</div>
                    <div>裏返し：入らない ✗</div>
                    <div>もう一度：入った ✓</div>
                </div>
                <div className="card-note" style={{ marginTop: '6px', color: 'var(--coral)' }}>量子力学的コネクタ</div>
            </div>
            <div className="vs-divider">VS</div>
            <div className="card card-purple stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-purple">USB-C</div>
                <div style={{ fontSize: '14px', textAlign: 'left', lineHeight: '2' }}>
                    <div>どちら向きでも ✓</div>
                    <div>一発で挿さる ✓</div>
                    <div>ストレスゼロ ✓</div>
                </div>
                <div className="card-note" style={{ marginTop: '6px', color: 'var(--purple)' }}>上下対称デザイン</div>
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
        <div className="scene-title">同じ形、<span className="accent-coral">違う性能</span></div>
        <div className="three-col" style={{ marginTop: '12px' }}>
            <div className="card stagger-item" style={{ width: '160px' }}>
                <div className="card-badge badge-amber">ケーブル①</div>
                <svg width="60" height="30" viewBox="0 0 60 30"><rect x="5" y="5" width="50" height="20" rx="10" fill="none" stroke="#7c3aed" strokeWidth="2"/></svg>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--amber)' }}>480 Mbps</div>
                <div className="card-note">USB 2.0</div>
            </div>
            <div className="card stagger-item" style={{ width: '160px' }}>
                <div className="card-badge badge-primary">ケーブル②</div>
                <svg width="60" height="30" viewBox="0 0 60 30"><rect x="5" y="5" width="50" height="20" rx="10" fill="none" stroke="#7c3aed" strokeWidth="2"/></svg>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)' }}>10 Gbps</div>
                <div className="card-note">USB 3.2</div>
            </div>
            <div className="card stagger-item" style={{ width: '160px' }}>
                <div className="card-badge badge-purple">ケーブル③</div>
                <svg width="60" height="30" viewBox="0 0 60 30"><rect x="5" y="5" width="50" height="20" rx="10" fill="none" stroke="#7c3aed" strokeWidth="2"/></svg>
                <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--purple)' }}>40 Gbps</div>
                <div className="card-note">Thunderbolt 4</div>
            </div>
        </div>
        <div style={{ fontSize: '16px', fontWeight: '900', color: 'var(--coral)', marginTop: '14px' }}>⚠️ 全部同じ USB-C の形なのに<span style={{ fontSize: '20px' }}>80倍</span>の性能差</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene15: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-15">
    <div className="content center-layout">
        <div className="scene-title">名前が<span className="accent-coral">カオス</span></div>
        <div style={{ marginTop: '12px' }}>
            <div className="flow-row">
                <div className="flow-chip chip-primary stagger-item" style={{ textDecoration: 'line-through', opacity: '0.6' }}>USB 3.0</div>
                <div className="flow-connector">→</div>
                <div className="flow-chip chip-amber stagger-item" style={{ textDecoration: 'line-through', opacity: '0.6' }}>USB 3.1 Gen 1</div>
                <div className="flow-connector">→</div>
                <div className="flow-chip chip-coral stagger-item" style={{ textDecoration: 'line-through', opacity: '0.6' }}>USB 3.2 Gen 1</div>
                <div className="flow-connector">→</div>
                <div className="flow-chip chip-emerald stagger-item" style={{ borderWidth: '2.5px' }}>USB 5Gbps ✓</div>
            </div>
        </div>
        <div className="card card-coral stagger-item" style={{ marginTop: '16px', maxWidth: '440px' }}>
            <div className="card-note" style={{ fontSize: '15px' }}><strong>全部同じ5Gbps</strong>なのに名前が4回変わった<br /><span style={{ fontSize: '12px' }}>USB-IFの言い分：「仕様書を整理しやすくするため」</span></div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene16: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-16">
    <div className="content center-layout">
        <div style={{ fontSize: '42px', fontWeight: '900', color: 'var(--text)' }}>形の統一 <span className="accent-coral">≠</span> 中身の統一</div>
        <div className="two-col" style={{ marginTop: '20px' }}>
            <div className="card stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-amber">USB以前</div>
                <div className="card-title" style={{ fontSize: '15px' }}>形がバラバラ</div>
                <div className="card-note">正しいケーブルを選べば<br /><strong style={{ color: 'var(--emerald)' }}>確実に動く</strong></div>
            </div>
            <div className="vs-divider">VS</div>
            <div className="card stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-coral">USB-C以降</div>
                <div className="card-title" style={{ fontSize: '15px' }}>形は同じ</div>
                <div className="card-note">正しいケーブルが<br /><strong style={{ color: 'var(--coral)' }}>どれかわからない</strong></div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene17: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-17">
    <div className="content center-layout">
        <div className="scene-title"><span className="accent-primary">4</span>ピン vs <span className="accent-purple">24</span>ピン</div>
        <div className="two-col" style={{ marginTop: '12px' }}>
            <div className="card card-primary stagger-item" style={{ width: '200px' }}>
                <div className="card-badge badge-primary">USB-A (1996)</div>
                <div className="num-list" style={{ marginTop: '8px' }}>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--coral)', width: '24px', height: '24px', fontSize: '11px' }}>V</div><div><div className="num-title" style={{ fontSize: '12px' }}>VBUS (電源)</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--emerald)', width: '24px', height: '24px', fontSize: '11px' }}>D</div><div><div className="num-title" style={{ fontSize: '12px' }}>D- (データ)</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ background: 'var(--emerald)', width: '24px', height: '24px', fontSize: '11px' }}>D</div><div><div className="num-title" style={{ fontSize: '12px' }}>D+ (データ)</div></div></div>
                    <div className="num-item"><div className="num-circle" style={{ background: '#6b7280', width: '24px', height: '24px', fontSize: '11px' }}>G</div><div><div className="num-title" style={{ fontSize: '12px' }}>GND</div></div></div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '6px' }}>5V × 500mA = 2.5W</div>
            </div>
            <div className="col-arrow" style={{ fontSize: '32px' }}>→</div>
            <div className="card card-purple stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-purple">USB-C (2014)</div>
                <div className="tag-row" style={{ marginTop: '8px' }}>
                    <span className="tag" style={{ background: '#fee2e2', color: '#ef4444', borderColor: '#ef4444' }}>VBUS ×4</span>
                    <span className="tag" style={{ background: '#e0f7fa', color: '#0891b2', borderColor: '#0891b2' }}>SS TX/RX ×8</span>
                    <span className="tag" style={{ background: '#d1fae5', color: '#10b981', borderColor: '#10b981' }}>D+/D- ×2</span>
                    <span className="tag" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#f59e0b' }}>CC ×2</span>
                    <span className="tag" style={{ background: '#ede9fe', color: '#7c3aed', borderColor: '#7c3aed' }}>SBU ×2</span>
                    <span className="tag" style={{ background: '#e5e7eb', color: '#374151', borderColor: '#6b7280' }}>GND ×4</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '6px' }}>最大 48V × 5A = 240W</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene18: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-18">
    <div className="content center-layout">
        <div className="scene-title">USB-C 24ピン配置</div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-light)' }}>上下対称 → どちら向きでも挿せる</div>
        <div style={{ marginTop: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-light)' }}>A列（上面）</div>
            <div className="pin-grid">
                <div className="pin pin-gnd stagger-item">GND</div>
                <div className="pin pin-data stagger-item">TX1+</div>
                <div className="pin pin-data stagger-item">TX1-</div>
                <div className="pin pin-power stagger-item">VB</div>
                <div className="pin pin-cc stagger-item">CC1</div>
                <div className="pin pin-usb2 stagger-item">D+</div>
                <div className="pin pin-usb2 stagger-item">D-</div>
                <div className="pin pin-sbu stagger-item">SBU1</div>
                <div className="pin pin-power stagger-item">VB</div>
                <div className="pin pin-data stagger-item">RX2-</div>
                <div className="pin pin-data stagger-item">RX2+</div>
                <div className="pin pin-gnd stagger-item">GND</div>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', margin: '6px 0 4px', color: 'var(--text-light)' }}>B列（下面）</div>
            <div className="pin-grid">
                <div className="pin pin-gnd stagger-item">GND</div>
                <div className="pin pin-data stagger-item">RX1+</div>
                <div className="pin pin-data stagger-item">RX1-</div>
                <div className="pin pin-power stagger-item">VB</div>
                <div className="pin pin-sbu stagger-item">SBU2</div>
                <div className="pin pin-usb2 stagger-item">D-</div>
                <div className="pin pin-usb2 stagger-item">D+</div>
                <div className="pin pin-cc stagger-item">CC2</div>
                <div className="pin pin-power stagger-item">VB</div>
                <div className="pin pin-data stagger-item">TX2-</div>
                <div className="pin pin-data stagger-item">TX2+</div>
                <div className="pin pin-gnd stagger-item">GND</div>
            </div>
        </div>
        <div className="tag-row" style={{ marginTop: '10px' }}>
            <span className="tag" style={{ background: '#fee2e2', color: '#ef4444', borderColor: '#ef4444' }}>電源</span>
            <span className="tag" style={{ background: '#e0f7fa', color: '#0891b2', borderColor: '#0891b2' }}>SuperSpeed</span>
            <span className="tag" style={{ background: '#d1fae5', color: '#10b981', borderColor: '#10b981' }}>USB 2.0</span>
            <span className="tag" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#f59e0b' }}>CC</span>
            <span className="tag" style={{ background: '#ede9fe', color: '#7c3aed', borderColor: '#7c3aed' }}>SBU</span>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene19: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-19">
    <div className="content center-layout">
        <div className="scene-title"><span className="accent-amber">CC</span>ピンの仕事</div>
        <div className="flow-row" style={{ marginTop: '14px' }}>
            <div className="flow-chip chip-primary stagger-item">ケーブル挿入</div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-amber stagger-item">向き検知</div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-amber stagger-item">電力交渉</div>
            <div className="flow-connector">→</div>
            <div className="flow-chip chip-emerald stagger-item">接続確立</div>
        </div>
        <div className="two-col" style={{ marginTop: '14px' }}>
            <div className="card card-primary stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-amber">仕事①</div>
                <div className="card-title" style={{ fontSize: '15px' }}>ケーブルの向きを<br />自動検知</div>
                <div className="card-note">CC1とCC2のどちらに<br />信号が来たかで判定</div>
            </div>
            <div className="card card-primary stagger-item" style={{ width: '220px' }}>
                <div className="card-badge badge-amber">仕事②</div>
                <div className="card-title" style={{ fontSize: '15px' }}>電力供給能力を<br />ネゴシエーション</div>
                <div className="card-note">5V → 9V → 20V → 48V<br />安全に段階交渉</div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene20: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-20">
    <div className="content center-layout">
        <div className="scene-title">1本で<span className="accent-purple">全部</span>こなす</div>
        <div style={{ position: 'relative', marginTop: '12px' }}>
            <svg width="400" height="100" viewBox="0 0 400 100">
                <rect x="160" y="30" width="80" height="40" rx="20" fill="none" stroke="#7c3aed" strokeWidth="2"/>
                <text x="200" y="55" fontSize="12" fill="#7c3aed" textAnchor="middle" fontWeight="900">USB-C</text>
                <line x1="80" y1="35" x2="160" y2="45" stroke="#ef4444" strokeWidth="2"/>
                <text x="70" y="30" fontSize="11" fill="#ef4444" textAnchor="end" fontWeight="700">電力 (240W)</text>
                <line x1="80" y1="50" x2="160" y2="50" stroke="#0891b2" strokeWidth="2"/>
                <text x="70" y="54" fontSize="11" fill="#0891b2" textAnchor="end" fontWeight="700">データ (40Gbps)</text>
                <line x1="80" y1="65" x2="160" y2="55" stroke="#7c3aed" strokeWidth="2"/>
                <text x="70" y="70" fontSize="11" fill="#7c3aed" textAnchor="end" fontWeight="700">映像 (DisplayPort)</text>
                <line x1="240" y1="50" x2="340" y2="50" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4"/>
                <text x="350" y="54" fontSize="11" fill="#6b7280" fontWeight="700">デバイスへ</text>
            </svg>
        </div>
        <div className="card card-purple stagger-item" style={{ marginTop: '10px', maxWidth: '420px' }}>
            <div className="card-note" style={{ fontSize: '14px' }}><strong>SBUピン</strong>がAlternate Modeを切り替え<br />→ USB以外のプロトコル（DisplayPort, HDMI等）も伝送可能</div>
        </div>
        <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '10px' }}>4ピンの時代にこれは<span className="accent-coral">絶対不可能</span>だった</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene21: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-21">
    <div className="content center-layout">
        <div className="scene-title">EU共通充電器指令</div>
        <div style={{ fontSize: '18px', color: 'var(--text-light)', marginBottom: '12px' }}>2024年12月 施行</div>
        <div className="two-col" style={{ marginTop: '8px' }}>
            <div className="card card-coral stagger-item" style={{ width: '200px' }}>
                <div style={{ fontSize: '40px', fontWeight: '900', color: 'var(--coral)' }}>11,000</div>
                <div className="card-note" style={{ fontSize: '14px' }}>トン／年の<br />電子ゴミ削減</div>
            </div>
            <div className="card card-emerald stagger-item" style={{ width: '200px' }}>
                <div style={{ fontSize: '40px', fontWeight: '900', color: 'var(--emerald)' }}>2.5億€</div>
                <div className="card-note" style={{ fontSize: '14px' }}>≒ 300億円以上<br />消費者の年間節約</div>
            </div>
        </div>
        <div className="card stagger-item" style={{ marginTop: '14px', maxWidth: '440px' }}>
            <div className="card-note" style={{ fontSize: '14px' }}>技術だけでは統一は完成しなかった<br />→ <strong>法の力</strong>で「全デバイスにUSB-C」を強制</div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene22: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-grid" id="scene-22">
    <div className="content center-layout">
        <div className="scene-title">30年の進化</div>
        <div className="timeline" style={{ marginTop: '10px' }}>
            <div className="tl-item stagger-item">
                <div className="tl-year">1996</div>
                <div className="tl-dot dot-hl"></div>
                <div className="tl-name">USB-A</div>
                <div className="tl-desc">4ピン<br />12Mbps</div>
            </div>
            <div className="tl-item stagger-item">
                <div className="tl-year">2000</div>
                <div className="tl-dot"></div>
                <div className="tl-name">Mini</div>
                <div className="tl-desc">5ピン<br />小型化</div>
            </div>
            <div className="tl-item stagger-item">
                <div className="tl-year">2007</div>
                <div className="tl-dot"></div>
                <div className="tl-name">Micro</div>
                <div className="tl-desc">5ピン<br />耐久×2</div>
            </div>
            <div className="tl-item stagger-item">
                <div className="tl-year">2014</div>
                <div className="tl-dot dot-hl"></div>
                <div className="tl-name">USB-C</div>
                <div className="tl-desc">24ピン<br />リバーシブル</div>
            </div>
            <div className="tl-item stagger-item">
                <div className="tl-year">2024</div>
                <div className="tl-dot dot-hl"></div>
                <div className="tl-name">EU法制化</div>
                <div className="tl-desc">USB-C<br />義務化</div>
            </div>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text)', marginTop: '12px', fontWeight: '700' }}>各世代は、その時代の最善を積み重ねた結果</div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene23: React.FC = () => (
    <AbsoluteFill>
        <div className="scene" id="scene-23">
    <div className="content center-layout">
        <div className="scene-title">まとめ</div>
        <div className="num-list" style={{ marginTop: '12px' }}>
            <div className="num-item stagger-item">
                <div className="num-circle">1</div>
                <div>
                    <div className="num-title">形が違うのは安全と技術的制約の結果</div>
                    <div className="num-desc">ホスト/デバイスの区別、小型化、耐久性向上</div>
                </div>
            </div>
            <div className="num-item stagger-item">
                <div className="num-circle" style={{ background: 'var(--coral)' }}>2</div>
                <div>
                    <div className="num-title">形の統一 ≠ 中身の統一</div>
                    <div className="num-desc">USB-Cでも規格・速度・機能はバラバラ</div>
                </div>
            </div>
            <div className="num-item stagger-item">
                <div className="num-circle" style={{ background: 'var(--purple)' }}>3</div>
                <div>
                    <div className="num-title">技術 + 政治で初めて真の統一が可能に</div>
                    <div className="num-desc">EU法規制 + 24ピンの技術革新の組み合わせ</div>
                </div>
            </div>
        </div>
    </div>
</div>
    </AbsoluteFill>
);

export const Scene24: React.FC = () => (
    <AbsoluteFill>
        <div className="scene bg-dots" id="scene-24">
    <div className="content center-layout">
        <div style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-1px' }}>
            <span className="accent-primary">U</span>niversal
        </div>
        <div style={{ fontSize: '18px', marginTop: '16px', color: 'var(--text-light)', lineHeight: '1.8' }}>
            形の統一 + 中身の統一 + 法の統一<br />
            = 本当の <span style={{ color: 'var(--primary)', fontWeight: '900' }}>Universal</span>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-light)', marginTop: '20px' }}>
            ケーブルの引き出しのカオスは、30年の進化の痕跡
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
};

export const TOTAL_SCENE_COUNT = 25;
