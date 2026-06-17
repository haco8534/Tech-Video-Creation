import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame } from 'remotion';
import { SCRIPT, LINE_STARTS, TOTAL_FRAMES, eventFrame } from './scriptData';

export { TOTAL_FRAMES };

/* ============================================================
 * 基盤ヘルパー
 * ============================================================ */

const ease = Easing.bezier(0.4, 0, 0.2, 1);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
/** t0 から dur フレームかけて 0→1（イージング済み） */
const P = (f: number, t0: number, dur = 24) => ease(clamp01((f - t0) / dur));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** [frame, value] の列をイージング付き区分補間（保持は両端にストップを置く） */
const seq = (f: number, stops: [number, number][]): number => {
    if (f <= stops[0][0]) return stops[0][1];
    for (let i = 0; i < stops.length - 1; i++) {
        const [fa, va] = stops[i];
        const [fb, vb] = stops[i + 1];
        if (f >= fa && f <= fb) return va + (vb - va) * ease(clamp01((f - fa) / Math.max(1, fb - fa)));
    }
    return stops[stops.length - 1][1];
};
/** 一度きりの山型 0→1→0 */
const pulse = (f: number, t0: number, dur = 30) => Math.sin(Math.PI * clamp01((f - t0) / dur));

type XY = { x: number; y: number };
/** 放物アーチ飛行（札のジャンプ用） */
const flight = (t: number, a: XY, b: XY, lift = 120): XY => {
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - lift;
    const u = 1 - t;
    return {
        x: u * u * a.x + 2 * u * t * mx + t * t * b.x,
        y: u * u * a.y + 2 * u * t * my + t * t * b.y,
    };
};

const EV = eventFrame;

/* ============================================================
 * 語彙（色・帯・書体）
 * ============================================================ */

const C = {
    bg: '#f4f7fb',
    ink: '#243044',
    sub: '#7b8aa3',
    faint: '#cbd5e1',
    browser: '#3b82f6',
    browserFill: '#e9f1fe',
    server: '#64748b',
    serverFill: '#eef2f7',
    cookie: '#d97706',
    cookieFill: '#fef3c7',
    set: '#ef4444',
    setFill: '#fee2e2',
    safe: '#16a34a',
    safeFill: '#dcfce7',
    warn: '#f97316',
    danger: '#ef4444',
    purple: '#8b5cf6',
    purpleFill: '#ede9fe',
    teal: '#0d9488',
    pink: '#db2777',
    metan: '#d6336c',
    zunda: '#22c55e',
};
const SANS = '"Hiragino Maru Gothic ProN", "Yu Gothic", sans-serif';
const MONO = 'Consolas, "Courier New", monospace';

// テキスト帯（y レンジ）：見出し -540..-430 / 図 -420..300 / 字幕 318..540
const HEAD_Y = -476;

/* ============================================================
 * 共通図形
 * ============================================================ */

const T: React.FC<{
    x: number; y: number; s?: number; c?: string; w?: number; mono?: boolean;
    o?: number; anchor?: 'start' | 'middle' | 'end'; children: React.ReactNode;
}> = ({ x, y, s = 28, c = C.ink, w = 700, mono = false, o = 1, anchor = 'middle', children }) => (
    <text x={x} y={y} fontSize={s} fill={c} fontWeight={w} opacity={o} textAnchor={anchor}
        fontFamily={mono ? MONO : SANS} dominantBaseline="middle">{children}</text>
);

const Pill: React.FC<{
    x: number; y: number; w: number; h?: number; label: string; fill?: string;
    stroke?: string; tc?: string; fs?: number; o?: number; sw?: number; mono?: boolean; scale?: number;
}> = ({ x, y, w, h = 56, label, fill = '#fff', stroke = C.ink, tc = C.ink, fs = 26, o = 1, sw = 3, mono = false, scale = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={o}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} stroke={stroke} strokeWidth={sw} />
        <T x={0} y={2} s={fs} c={tc} mono={mono}>{label}</T>
    </g>
);

/** リクエスト/レスポンスの封筒 */
const Envelope: React.FC<{ x: number; y: number; s?: number; tint?: string; o?: number; children?: React.ReactNode }> =
    ({ x, y, s = 1, tint = C.ink, o = 1, children }) => (
        <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <rect x={-85} y={-55} width={170} height={110} rx={12} fill="#fff" stroke={tint} strokeWidth={4.5} />
            <path d="M -83 -47 L 0 12 L 83 -47" fill="none" stroke={tint} strokeWidth={4.5} strokeLinejoin="round" />
            {children}
        </g>
    );

/** Cookie札 */
const Tag: React.FC<{
    x: number; y: number; s?: number; label: string; fill?: string; stroke?: string;
    o?: number; fs?: number; rot?: number; sub?: string;
}> = ({ x, y, s = 1, label, fill = C.cookieFill, stroke = C.cookie, o = 1, fs = 24, rot = 0, sub }) => {
    const tw = Math.max(110, label.length * fs * 0.62 + 52);
    return (
        <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
            <rect x={-tw / 2} y={-27} width={tw} height={54} rx={13} fill={fill} stroke={stroke} strokeWidth={3.5} />
            <circle cx={-tw / 2 + 17} cy={0} r={5.5} fill="none" stroke={stroke} strokeWidth={3} />
            <T x={9} y={2} s={fs} mono c={C.ink}>{label}</T>
            {sub && (() => {
                const sw2 = Math.max(tw - 28, sub.length * 12.6 + 26);
                return (
                    <g>
                        <rect x={-sw2 / 2} y={27} width={sw2} height={36} rx={9} fill="#fff" stroke={stroke} strokeWidth={2.5} />
                        <T x={0} y={46} s={20} mono c={stroke}>{sub}</T>
                    </g>
                );
            })()}
        </g>
    );
};

/** ブラウザ枠 */
const Browser: React.FC<{ x: number; y: number; w: number; h: number; o?: number; children?: React.ReactNode }> =
    ({ x, y, w, h, o = 1, children }) => (
        <g transform={`translate(${x} ${y})`} opacity={o}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={20} fill="#fff" stroke={C.browser} strokeWidth={5} />
            <path d={`M ${-w / 2} ${-h / 2 + 52} H ${w / 2}`} stroke={C.browser} strokeWidth={3} />
            <circle cx={-w / 2 + 30} cy={-h / 2 + 27} r={7} fill={C.browserFill} stroke={C.browser} strokeWidth={2.5} />
            <circle cx={-w / 2 + 58} cy={-h / 2 + 27} r={7} fill={C.browserFill} stroke={C.browser} strokeWidth={2.5} />
            <circle cx={-w / 2 + 86} cy={-h / 2 + 27} r={7} fill={C.browserFill} stroke={C.browser} strokeWidth={2.5} />
            {children}
        </g>
    );

/** サーバーラック */
const Rack: React.FC<{ x: number; y: number; w?: number; h?: number; accent?: string; o?: number; label?: string; children?: React.ReactNode }> =
    ({ x, y, w = 250, h = 400, accent = C.server, o = 1, label, children }) => (
        <g transform={`translate(${x} ${y})`} opacity={o}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={C.serverFill} stroke={accent} strokeWidth={5} />
            {Array.from({ length: Math.min(3, Math.max(1, Math.floor((h - 60) / 64))) }, (_, i) => i).map((i) => (
                <g key={i}>
                    <rect x={-w / 2 + 22} y={-h / 2 + 26 + i * 64} width={w - 44} height={44} rx={9}
                        fill="#fff" stroke={accent} strokeWidth={3} />
                    <circle cx={w / 2 - 44} cy={-h / 2 + 48 + i * 64} r={6} fill={accent} />
                </g>
            ))}
            {label && <T x={0} y={h / 2 - 34} s={26} mono c={accent}>{label}</T>}
            {children}
        </g>
    );

/** Cookie jar（口の開いた保存箱） */
const JarBox: React.FC<{ x: number; y: number; s?: number; o?: number; accent?: string }> =
    ({ x, y, s = 1, o = 1, accent = C.cookie }) => (
        <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <path d="M -90 -40 L -78 60 Q -76 74 -62 74 L 62 74 Q 76 74 78 60 L 90 -40"
                fill="#fff" stroke={accent} strokeWidth={5} strokeLinejoin="round" />
            <ellipse cx={0} cy={-40} rx={90} ry={18} fill={C.cookieFill} stroke={accent} strokeWidth={5} />
        </g>
    );

const Lock: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number }> =
    ({ x, y, s = 1, c = C.safe, o = 1 }) => (
        <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <rect x={-17} y={-6} width={34} height={28} rx={7} fill={c} />
            <path d="M -10 -6 V -14 A 10 10 0 0 1 10 -14 V -6" fill="none" stroke={c} strokeWidth={6} />
        </g>
    );

const CheckMark: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number; p?: number }> =
    ({ x, y, s = 1, c = C.safe, o = 1, p = 1 }) => (
        <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <path d="M -18 2 L -5 15 L 20 -14" fill="none" stroke={c} strokeWidth={9}
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={60} strokeDashoffset={60 * (1 - p)} />
        </g>
    );

const CrossMark: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number }> =
    ({ x, y, s = 1, c = C.danger, o = 1 }) => (
        <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <path d="M -14 -14 L 14 14 M 14 -14 L -14 14" stroke={c} strokeWidth={8} strokeLinecap="round" />
        </g>
    );

const WarnTri: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
        <path d="M 0 -22 L 22 16 Q 25 22 18 22 L -18 22 Q -25 22 -22 16 Z"
            fill="#fff7ed" stroke={C.warn} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 0 -8 V 6" stroke={C.warn} strokeWidth={5} strokeLinecap="round" />
        <circle cx={0} cy={14} r={3} fill={C.warn} />
    </g>
);

/** 描き起こされる矢印（p: 0→1） */
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; c?: string; sw?: number; o?: number; dash?: boolean }> =
    ({ x1, y1, x2, y2, p = 1, c = C.ink, sw = 4.5, o = 1, dash = false }) => {
        if (p <= 0.01) return null;
        const ex = lerp(x1, x2, p);
        const ey = lerp(y1, y2, p);
        const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        return (
            <g opacity={o}>
                <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={c} strokeWidth={sw}
                    strokeLinecap="round" strokeDasharray={dash ? '3 14' : undefined} />
                <g transform={`translate(${ex} ${ey}) rotate(${ang})`}>
                    <path d="M -16 -11 L 2 0 L -16 11" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </g>
        );
    };

/* ============================================================
 * 画面切替・見出し
 * ============================================================ */

const SCENE_INS: number[] = [
    0,
    EV('scene.memory.in'),
    EV('scene.attributes.in'),
    EV('scene.security.in'),
    EV('scene.samesite.in'),
    EV('scene.third_party.in'),
    EV('scene.partitioned.in'),
    EV('scene.session.in'),
    EV('scene.consent.in'),
    EV('scene.outro.in'),
];

const sceneVis = (i: number, f: number): number => {
    const FD = 14;
    const tIn = SCENE_INS[i];
    const tOut = i + 1 < SCENE_INS.length ? SCENE_INS[i + 1] : Infinity;
    const a = i === 0 ? 1 : clamp01((f - tIn) / FD);
    const b = 1 - clamp01((f - tOut) / FD);
    return a * b;
};

const HEADINGS = [
    '保存より送信ルール', '返信つきメモ', '属性が効く', 'Secure と HttpOnly', 'SameSite',
    '第三者Cookie', 'Partitioned', 'セッション札', '同意は運用の層', 'まとめ',
];

const Heading: React.FC<{ i: number; f: number }> = ({ i, f }) => {
    const start = i === 0 ? EV('thesis.pin') : SCENE_INS[i];
    const o = sceneVis(i, f) * P(f, start, 14);
    if (o <= 0.01) return null;
    const label = HEADINGS[i];
    const w = label.length * 42 + 76;
    const y = HEAD_Y + (1 - P(f, start, 14)) * -18;
    return (
        <g opacity={o}>
            <rect x={-928} y={y - 44} width={w} height={88} rx={44} fill="#fff" stroke={C.ink} strokeWidth={4} />
            <T x={-928 + w / 2} y={y + 2} s={40} w={800}>{label}</T>
        </g>
    );
};

/* ============================================================
 * 対話字幕
 * ============================================================ */

const lineAt = (f: number): number => {
    let idx = -1;
    for (let i = 0; i < SCRIPT.length; i++) if (f >= LINE_STARTS[i]) idx = i;
    return idx;
};

const Subtitle: React.FC<{ f: number }> = ({ f }) => {
    const idx = lineAt(f);
    if (idx < 0) return null;
    const line = SCRIPT[idx];
    const color = line.speaker === 'ずんだもん' ? C.zunda : C.metan;
    const parts = line.text.split('`');
    return (
        <foreignObject x={-760} y={332} width={1520} height={200}>
            <div style={{
                width: '100%', height: '176px', marginTop: '20px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.96)', borderRadius: '26px',
                border: '2px solid rgba(36,48,68,0.08)', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '8px 60px', boxShadow: '0 14px 36px rgba(36,48,68,0.13)',
            }}>
                <div style={{
                    position: 'absolute', top: '-22px', left: line.speaker === 'めたん' ? '54px' : undefined,
                    right: line.speaker === 'ずんだもん' ? '54px' : undefined,
                    background: color, color: '#fff', borderRadius: '22px', padding: '7px 26px',
                    fontSize: '25px', fontWeight: 900, fontFamily: SANS,
                }}>{line.speaker}</div>
                <div style={{
                    color: C.ink, fontSize: '38px', fontWeight: 800, fontFamily: SANS,
                    textAlign: 'center', lineHeight: 1.32, paddingTop: '10px',
                }}>
                    {parts.map((p, i) => i % 2 === 1
                        ? <span key={i} style={{ fontFamily: MONO, background: '#eef2f7', borderRadius: '8px', padding: '0 8px' }}>{p}</span>
                        : <span key={i}>{p}</span>)}
                </div>
            </div>
        </foreignObject>
    );
};

/* ============================================================
 * 画面1: intro — 同意バナーを畳み、引き出しと自動添付へ
 * ============================================================ */

const SceneIntro: React.FC<{ f: number }> = ({ f }) => {
    const tFold = EV('consent.fold');
    const tNote = EV('note.appear');
    const tAuto = EV('auto.attach.preview');

    // 同意バナー：登場 → 紙のように畳まれる
    const bIn = P(f, 6, 16);
    const fold = P(f, tFold, 26);
    const bannerO = bIn * (1 - P(f, tFold + 22, 14));
    const bannerSy = lerp(1, 0.04, fold);
    const bannerY = lerp(-50, -300, fold);

    // 背後のブラウザと引き出し
    const brO = P(f, tFold + 10, 20);

    // Cookie札：引き出しへ落ちる →（コピーが）封筒へ飛び移り、封筒ごと右へ去る
    const noteO = P(f, tNote, 8);
    const dropY = seq(f, [[tNote, -430], [tNote + 26, 120], [tNote + 34, 96]]);

    const envIn = P(f, tAuto, 20);
    const envX0 = lerp(-1100, 180, envIn);
    const hop = P(f, tAuto + 22, 18);
    const ride = flight(hop, { x: -420, y: 96 }, { x: 180, y: -32 }, 170);
    const leave = P(f, tAuto + 58, 30);
    const envX = envX0 + leave * 1100;

    return (
        <g>
            {/* ブラウザ＋引き出し（バナーの背後に現れる） */}
            <Browser x={0} y={-30} w={1180} h={560} o={brO}>
                <T x={0} y={-180} s={30} c={C.faint} mono>about:blank</T>
                {/* 引き出し */}
                <g transform="translate(-420 130)">
                    <rect x={-150} y={-44} width={300} height={150} rx={14} fill="#fff" stroke={C.cookie} strokeWidth={5} />
                    <rect x={-150} y={-44} width={300} height={36} rx={14} fill={C.cookieFill} stroke={C.cookie} strokeWidth={5} />
                    <rect x={-34} y={28} width={68} height={12} rx={6} fill={C.cookie} />
                </g>
            </Browser>

            {/* Cookie札（保存された札は引き出しに残り続ける） */}
            {f >= tNote && (
                <Tag x={-420} y={dropY} label="name=value" o={noteO} rot={lerp(-10, 0, P(f, tNote + 20, 10))} />
            )}

            {/* リクエスト封筒（札のコピーが飛び乗って一緒に去る） */}
            {f >= tAuto && leave < 1 && (
                <Envelope x={envX} y={40} o={envIn * (1 - P(f, tAuto + 80, 8))} tint={C.browser}>
                    {hop >= 1 && <Tag x={0} y={-72} label="name=value" />}
                </Envelope>
            )}
            {hop > 0 && hop < 1 && <Tag x={ride.x} y={ride.y} label="name=value" rot={lerp(-14, 4, hop)} />}

            {/* 同意バナー（上端を支点に畳む） */}
            {bannerO > 0.01 && (
                <g opacity={bannerO} transform={`translate(0 ${bannerY})`}>
                    <g transform={`translate(0 -210) scale(1 ${bannerSy}) translate(0 210)`}>
                        <rect x={-370} y={-210} width={740} height={420} rx={26} fill="#fff" stroke={C.ink} strokeWidth={5} />
                        <circle cx={0} cy={-110} r={52} fill="#e7c08a" stroke="#b97f24" strokeWidth={4} />
                        {[[-18, -128], [16, -100], [-8, -92], [22, -132], [2, -114]].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r={6} fill="#8a5a16" />
                        ))}
                        <T x={0} y={-18} s={46} w={800}>Cookie</T>
                        <g transform="translate(-140 90)">
                            <rect x={-110} y={-34} width={220} height={68} rx={34} fill={C.browser} />
                            <T x={0} y={2} s={30} c="#fff" w={800}>許可する</T>
                        </g>
                        <g transform="translate(140 90)">
                            <rect x={-110} y={-34} width={220} height={68} rx={34} fill="#fff" stroke={C.faint} strokeWidth={4} />
                            <T x={0} y={2} s={30} c={C.sub} w={800}>拒否</T>
                        </g>
                    </g>
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * 画面2: memory — Set-Cookie / Cookie の往復とロッカー
 * ============================================================ */

const SceneMemory: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.memory.in');
    const tReset = EV('stateless.reset');
    const tSet = EV('set_cookie.out');
    const tJar = EV('jar.store');
    const tRet = EV('cookie.return');
    const tLock = EV('locker.id');
    const tGlow = EV('risk.glow');

    const inP = P(f, tIn, 22);
    const BRX = -620;
    const SVX = 650;
    const REQ_Y = -170;
    const RES_Y = 80;
    const jarY = 158;

    // 白紙封筒 1・2（互いに無関係）
    const e1 = P(f, tReset + 4, 40);
    const e2 = P(f, tReset + 56, 40);
    const envPathX = (p: number) => lerp(BRX + 310, SVX - 210, p);

    // Set-Cookie 札つきレスポンス
    const eS = P(f, tSet + 6, 44);
    const setX = lerp(SVX - 210, BRX + 310, eS);

    // jar.store: 赤札が jar に落ちて琥珀色になる
    const drop = P(f, tJar + 6, 26);
    const dropPos = flight(drop, { x: BRX + 310, y: RES_Y - 60 }, { x: BRX, y: jarY - 30 }, 110);

    // cookie.return: 新しい封筒に jar から札が飛び乗り、サーバーへ
    const e3 = seq(f, [[tRet + 4, 0], [tRet + 26, 0.32], [tRet + 44, 0.32], [tRet + 86, 1]]);
    const e3x = envPathX(e3);
    const hop3 = P(f, tRet + 26, 18);
    const hopPos = flight(hop3, { x: BRX, y: jarY - 30 }, { x: envPathX(0.32), y: REQ_Y - 38 }, 140);

    // ロッカー
    const lockP = P(f, tLock + 6, 24);
    const cellGlow = P(f, tLock + 30, 16);
    const glow = P(f, tGlow + 6, 20);

    return (
        <g>
            {/* ブラウザ（jar 内蔵）とサーバー：左右の役割固定 */}
            <g transform={`translate(${lerp(-140, 0, inP)} 0)`} opacity={inP}>
                <Browser x={BRX} y={-30} w={400} h={520}>
                    <JarBox x={0} y={jarY + 30} s={0.9} accent={C.cookie} />
                </Browser>
            </g>
            <g transform={`translate(${lerp(140, 0, inP)} 0)`} opacity={inP}>
                <Rack x={SVX} y={-30} h={520} label="server" />
            </g>

            {/* レーン */}
            <g opacity={inP * 0.6}>
                <line x1={BRX + 230} y1={REQ_Y} x2={SVX - 180} y2={REQ_Y} stroke={C.faint} strokeWidth={3} strokeDasharray="4 16" />
                <line x1={SVX - 180} y1={RES_Y} x2={BRX + 230} y2={RES_Y} stroke={C.faint} strokeWidth={3} strokeDasharray="4 16" />
            </g>

            {/* 白紙封筒 1・2 → サーバー側で「?」 */}
            {f >= tReset && e1 < 1.0 + 0.001 && (
                <Envelope x={envPathX(e1)} y={REQ_Y} tint={C.ink} o={P(f, tReset + 4, 8) * (1 - P(f, tReset + 48, 10))}>
                    <T x={0} y={-72} s={30} c={C.sub} w={800}>1</T>
                </Envelope>
            )}
            {f >= tReset + 52 && (
                <Envelope x={envPathX(e2)} y={REQ_Y} tint={C.ink} o={P(f, tReset + 56, 8) * (1 - P(f, tReset + 100, 10))}>
                    <T x={0} y={-72} s={30} c={C.sub} w={800}>2</T>
                </Envelope>
            )}
            <T x={SVX} y={-330} s={56} c={C.sub} w={800}
                o={Math.max(pulse(f, tReset + 40, 36), pulse(f, tReset + 92, 36))}>?</T>

            {/* Set-Cookie レスポンス */}
            {f >= tSet && drop <= 0 && (
                <Envelope x={setX} y={RES_Y} tint={C.server} o={P(f, tSet + 6, 8)}>
                    <Tag x={0} y={-60} s={0.92} label="Set-Cookie: session=abc123" fill={C.setFill} stroke={C.set} fs={21} />
                </Envelope>
            )}
            {drop > 0 && (
                <g>
                    <Envelope x={BRX + 310} y={RES_Y} tint={C.server} o={1 - P(f, tJar + 10, 14)} />
                    {/* 赤札 → 琥珀札へ（保存） */}
                    <Tag x={dropPos.x} y={dropPos.y} label="session=abc123" s={lerp(0.92, 0.84, drop)}
                        fill={drop < 0.6 ? C.setFill : C.cookieFill} stroke={drop < 0.6 ? C.set : C.cookie} fs={22}
                        o={1 - P(f, tRet + 26, 10) * 0} />
                </g>
            )}

            {/* cookie.return: jar から札が飛び乗る */}
            {f >= tRet && (
                <Envelope x={e3x} y={REQ_Y} tint={C.browser} o={P(f, tRet + 4, 8)}>
                    {hop3 >= 1 && <Tag x={0} y={-62} s={0.84} label="Cookie: session=abc123" fs={21} />}
                </Envelope>
            )}
            {hop3 > 0 && hop3 < 1 && (
                <Tag x={hopPos.x} y={hopPos.y} label="session=abc123" s={0.84} fs={22} rot={lerp(-12, 0, hop3)} />
            )}

            {/* サーバー内ロッカー（abc123 → ログイン状態の棚） */}
            {lockP > 0.01 && (
                <g transform={`translate(${SVX} 40)`} opacity={lockP}>
                    <g transform={`scale(${lerp(0.6, 1, lockP)})`}>
                        <rect x={-118} y={-86} width={236} height={172} rx={14} fill="#fff" stroke={C.server} strokeWidth={4} />
                        {[0, 1].map((r) => [0, 1, 2].map((c) => {
                            const hit = r === 1 && c === 1;
                            return (
                                <rect key={`${r}${c}`} x={-104 + c * 72} y={-72 + r * 80} width={64} height={72} rx={8}
                                    fill={hit ? lerp(0, 1, cellGlow) > 0.3 ? C.browserFill : '#fff' : '#fff'}
                                    stroke={hit && cellGlow > 0.3 ? C.browser : C.faint} strokeWidth={hit && cellGlow > 0.3 ? 4 : 3} />
                            );
                        }))}
                        <T x={4} y={48} s={19} mono c={C.browser} o={cellGlow}>abc123</T>
                    </g>
                </g>
            )}
            {/* 到着札とロッカーの対応線 */}
            <Arrow x1={SVX - 190} y1={REQ_Y - 30} x2={SVX - 50} y2={4} p={cellGlow} c={C.browser} dash o={0.9} />

            {/* risk.glow: 札が鍵のように光る */}
            {glow > 0.01 && (
                <g transform={`translate(${envPathX(1)} ${REQ_Y - 62})`}>
                    <circle r={lerp(40, 96, glow)} fill="none" stroke={C.cookie} strokeWidth={5} opacity={(1 - glow * 0.55) * 0.9} />
                    <circle r={lerp(20, 64, glow)} fill={C.cookie} opacity={0.14 * glow} />
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * 画面3: attributes — 値より属性（境界リングとデモ帯）
 * ============================================================ */

const SceneAttributes: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.attributes.in');
    const tOrb = EV('attrs.orbit');
    const tDom = EV('domain.expand');
    const tWarn = EV('domain.warning');
    const tLane = EV('path.lane');
    const tWall = EV('path.not_wall');
    const tClock = EV('lifetime.clock');
    const tConc = EV('attrs.conclusion');

    const inP = P(f, tIn + 4, 18);
    const conc = P(f, tConc + 6, 30);

    // 中央の値：結論で縮む
    const valS = lerp(1, 0.55, conc);
    const valY = lerp(-110, -150, conc);

    // 4属性ピル：値の後ろから四隅へ
    const ATTRS = [
        { label: 'Domain', cx: -430, cy: -290, hi: [tDom, tLane] as [number, number] },
        { label: 'Path', cx: 430, cy: -290, hi: [tLane, tClock] as [number, number] },
        { label: 'Expires', cx: -430, cy: 10, hi: [tClock, tConc] as [number, number] },
        { label: 'Max-Age', cx: 430, cy: 10, hi: [tClock, tConc] as [number, number] },
    ];

    // デモ帯（y 150..260）：Domain の範囲バー → Path レーン
    const barP = P(f, tDom + 6, 26);
    const warnP = P(f, tWarn + 6, 18);
    const laneP = P(f, tLane + 6, 22);
    const wallP = P(f, tWall + 6, 20);
    const hostBarO = P(f, tDom, 14) * (1 - laneP);
    const laneO = laneP * (1 - P(f, tClock + 14, 18));
    const HOSTS = ['www', 'shop', 'blog', 'ads'];
    const hostX = (i: number) => -390 + i * 260;
    const tagRun = P(f, tLane + 26, 30);

    // 寿命の時計
    const clkP = P(f, tClock + 6, 16);
    const hand = P(f, tClock + 16, 44);

    return (
        <g opacity={inP}>
            {/* 中央の値 */}
            <g transform={`translate(0 ${valY}) scale(${valS})`}>
                <T x={0} y={0} s={84} mono w={800}>session=abc123</T>
                {/* 寿命の時計（値＝札に付く） */}
                {clkP > 0.01 && (
                    <g transform={`translate(370 -58) scale(${clkP})`}>
                        <circle r={44} fill="#fff" stroke={C.ink} strokeWidth={5} />
                        {[0, 90, 180, 270].map((a) => (
                            <line key={a} x1={0} y1={-36} x2={0} y2={-28} stroke={C.ink} strokeWidth={4}
                                transform={`rotate(${a})`} />
                        ))}
                        <line x1={0} y1={6} x2={0} y2={-30} stroke={C.set} strokeWidth={6} strokeLinecap="round"
                            transform={`rotate(${lerp(-40, 250, hand)})`} />
                        <circle r={5} fill={C.ink} />
                    </g>
                )}
            </g>

            {/* 属性リング（結論で値より大きく） */}
            {ATTRS.map((a, i) => {
                const ap = P(f, tOrb + 6 + i * 8, 22);
                if (ap <= 0.01) return null;
                const hi = f >= a.hi[0] && f < a.hi[1];
                const x = lerp(60, a.cx * lerp(1, 0.82, conc), ap);
                const y = lerp(-110, a.cy * lerp(1, 1.0, conc) + conc * -10, ap);
                const s = lerp(0.6, 1, ap) * lerp(1, 1.3, conc);
                return (
                    <Pill key={a.label} x={x} y={y} w={a.label.length * 22 + 70} h={62} label={a.label}
                        fs={30} mono scale={s} o={ap}
                        fill={hi ? C.cookieFill : '#fff'} stroke={hi ? C.cookie : C.ink} sw={hi ? 5 : 3.5} />
                );
            })}

            {/* Domain: 送信範囲バー */}
            {hostBarO > 0.01 && (
                <g opacity={hostBarO} transform="translate(0 200)">
                    <rect x={-530} y={-40} width={1060} height={80} rx={40} fill="#fff" stroke={C.faint} strokeWidth={4} />
                    {/* 広がる送信範囲 */}
                    <rect x={-520} y={-30} width={lerp(250, 1040, barP)} height={60} rx={30}
                        fill={C.browserFill} stroke={C.browser} strokeWidth={3.5} />
                    {HOSTS.map((h, i) => (
                        <g key={h}>
                            <circle cx={hostX(i)} cy={0} r={9}
                                fill={i === 3 && warnP > 0.3 ? C.warn : C.browser} />
                            <T x={hostX(i)} y={56} s={24} mono
                                c={i === 3 && warnP > 0.3 ? C.warn : C.sub}>{`${h}.example.com`}</T>
                        </g>
                    ))}
                    {warnP > 0.01 && <WarnTri x={hostX(3)} y={-72} s={warnP} o={warnP} />}
                </g>
            )}

            {/* Path: レーン（強い防壁ではない → 点線化） */}
            {laneO > 0.01 && (
                <g opacity={laneO} transform="translate(0 200)">
                    {[{ p: '/app', y: -34, on: true }, { p: '/admin', y: 38, on: false }].map((ln) => (
                        <g key={ln.p} opacity={ln.on ? 1 : 0.75}>
                            <rect x={-530} y={ln.y - 26} width={1060} height={52} rx={26} fill={ln.on ? C.cookieFill : '#fff'}
                                stroke={wallP > 0.3 ? C.faint : C.cookie} strokeWidth={3.5}
                                strokeDasharray={wallP > 0.3 ? '8 12' : undefined}
                                opacity={wallP > 0.3 ? 0.55 : 1} />
                            <T x={-460} y={ln.y + 2} s={26} mono c={C.sub}>{ln.p}</T>
                        </g>
                    ))}
                    {/* 札は /app レーンだけを通る */}
                    <Tag x={lerp(-330, 430, tagRun)} y={-34} s={0.72} label="session=abc123" fs={22} />
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * 画面4: security — Secure は通信路 / HttpOnly は読む窓
 * ============================================================ */

const SceneSecurity: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.security.in');
    const tTun = EV('secure.tunnel');
    const tShut = EV('httponly.shutter');
    const tSplit = EV('split.read_send');
    const tHint = EV('csrf.hint');
    const tFalse = EV('false.safe');

    const inP = P(f, tIn + 4, 18);

    // 左：通信路デモ（HTTP では札が剥がれ、HTTPS では通る）
    const roadO = P(f, tTun, 18) * lerp(1, 0.3, P(f, tHint, 20));
    const LX = -420;
    const e1 = P(f, tTun + 10, 44);   // HTTP 封筒
    const peel = P(f, tTun + 26, 22); // 札が剥がれて戻る
    const e2 = P(f, tTun + 70, 48);   // HTTPS 封筒
    const roadX = (p: number) => lerp(LX - 330, LX + 330, p);
    const peelPos = flight(peel, { x: roadX(0.42), y: -160 - 58 }, { x: LX - 320, y: -310 }, 90);

    // 右：HttpOnly 窓とシャッター
    const winO = P(f, tShut, 16);
    const WX = 470;
    const shut = P(f, tShut + 14, 30);

    // 下：読めなくても送られるレーン
    const sendO = P(f, tSplit, 16);
    const e3 = P(f, tSplit + 14, 40);
    const hop = P(f, tSplit + 22, 16);
    const LANE_Y4 = 210;
    const sx = (p: number) => lerp(WX - 330, WX + 240, p);
    const hopPos = flight(hop, { x: WX - 280, y: LANE_Y4 }, { x: sx(0.5), y: 172 }, 80);

    // read / send の二列ラベル
    const hintP = P(f, tHint + 6, 18);
    // 「安全」への斜線
    const safeO = P(f, tFalse + 4, 14);
    const slash = P(f, tFalse + 18, 20);

    return (
        <g opacity={inP}>
            {/* 左：二本の道 */}
            {roadO > 0.01 && (
                <g opacity={roadO}>
                    <T x={LX - 350} y={-240} s={30} mono c={C.sub} anchor="start">HTTP</T>
                    <line x1={LX - 330} y1={-160} x2={LX + 330} y2={-160} stroke={C.sub} strokeWidth={4} />
                    {/* 盗み見の目 */}
                    <g transform={`translate(${LX} -228)`} opacity={0.85}>
                        <path d="M -30 0 Q 0 -24 30 0 Q 0 24 -30 0 Z" fill="#fff" stroke={C.danger} strokeWidth={3.5} />
                        <circle r={8} fill={C.danger} />
                    </g>

                    <T x={LX - 350} y={20} s={30} mono c={C.safe} anchor="start">HTTPS</T>
                    <rect x={LX - 330} y={66} width={660} height={68} rx={34} fill={C.safeFill} stroke={C.safe} strokeWidth={4} />
                    <Lock x={LX} y={36} s={1.1} />

                    {/* HTTP: 封筒は進むが札は入口で剥がれて戻る */}
                    {f >= tTun + 10 && (
                        <Envelope x={roadX(e1)} y={-160} s={0.8} tint={C.sub} o={P(f, tTun + 10, 8) * (1 - P(f, tTun + 58, 10))}>
                            {peel <= 0 && <Tag x={0} y={-58} s={0.66} label="session=abc123" fs={22} />}
                        </Envelope>
                    )}
                    {peel > 0 && (
                        <Tag x={peel < 1 ? peelPos.x : LX - 320} y={peel < 1 ? peelPos.y : -310}
                            s={0.66} label="session=abc123" fs={22} rot={lerp(0, -16, Math.min(1, peel))} />
                    )}

                    {/* HTTPS: 札ごと通る */}
                    {f >= tTun + 70 && (
                        <Envelope x={roadX(e2)} y={100} s={0.8} tint={C.safe} o={P(f, tTun + 70, 8) * (1 - P(f, tTun + 124, 10))}>
                            <Tag x={0} y={-58} s={0.66} label="session=abc123" fs={22} />
                        </Envelope>
                    )}
                </g>
            )}

            {/* 右：JS 窓とシャッター */}
            {winO > 0.01 && (
                <g opacity={winO}>
                    <g transform={`translate(${WX} -60)`}>
                        <rect x={-250} y={-160} width={500} height={320} rx={18} fill="#fff" stroke={C.ink} strokeWidth={5} />
                        <rect x={-250} y={-212} width={92} height={52} rx={14} fill={C.ink} />
                        <T x={-204} y={-186} s={26} mono c="#fff" w={800}>JS</T>
                        <T x={0} y={-10} s={34} mono c={C.ink}>document.cookie</T>
                        {/* シャッター */}
                        <g>
                            <rect x={-244} y={-154} width={488} height={lerp(0, 308, shut)} rx={14} fill="#dde4ee" opacity={0.96} />
                            {[0, 1, 2, 3, 4].map((i) => {
                                const yy = -154 + (i + 0.85) * 60;
                                return yy < -154 + lerp(0, 308, shut)
                                    ? <line key={i} x1={-244} y1={yy} x2={244} y2={yy} stroke="#b9c4d6" strokeWidth={4} />
                                    : null;
                            })}
                            {shut > 0.9 && <Lock x={0} y={120} s={1} c={C.ink} />}
                        </g>
                        {/* read 列ラベル */}
                        {hintP > 0.01 && (
                            <g opacity={hintP}>
                                <Pill x={0} y={-216} w={190} h={58} label="read" fs={28} mono fill={C.safeFill} stroke={C.safe} tc={C.safe} sw={4} />
                                <CheckMark x={130} y={-216} p={hintP} />
                            </g>
                        )}
                    </g>

                    {/* 下：送信レーンは生きている */}
                    {sendO > 0.01 && (
                        <g opacity={sendO}>
                            <line x1={WX - 330} y1={LANE_Y4} x2={WX + 260} y2={LANE_Y4} stroke={C.faint} strokeWidth={3} strokeDasharray="4 14" />
                            <JarBox x={WX - 300} y={LANE_Y4 + 16} s={0.5} />
                            {f >= tSplit + 14 && (
                                <Envelope x={sx(e3)} y={LANE_Y4} s={0.7} tint={C.browser}>
                                    {hop >= 1 && <Tag x={0} y={-54} s={0.6} label="session=abc123" fs={22} />}
                                </Envelope>
                            )}
                            {hop > 0 && hop < 1 && (
                                <Tag x={hopPos.x} y={hopPos.y} s={0.6} label="session=abc123" fs={22} />
                            )}
                            {hintP > 0.01 && (
                                <g opacity={hintP}>
                                    <Pill x={WX - 60} y={152} w={190} h={58} label="send" fs={28} mono fill="#fff7ed" stroke={C.warn} tc={C.warn} sw={4} />
                                    <WarnTri x={WX + 70} y={152} s={0.8} />
                                </g>
                            )}
                        </g>
                    )}
                </g>
            )}

            {/* 「安全」に斜線 */}
            {safeO > 0.01 && (
                <g transform={`translate(${LX} -40) scale(${lerp(0.7, 1, safeO)})`} opacity={safeO}>
                    <rect x={-150} y={-64} width={300} height={128} rx={28} fill="#fff" stroke={C.ink} strokeWidth={5} />
                    <T x={0} y={4} s={56} w={800}>安全</T>
                    <line x1={-150} y1={64} x2={lerp(-150, 150, slash)} y2={lerp(64, -64, slash)}
                        stroke={C.danger} strokeWidth={9} strokeLinecap="round" />
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * 画面5: samesite — どの文脈から来た封筒に札を貼るか
 * ============================================================ */

const SceneSameSite: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.samesite.in');
    const tCtx = EV('context.frame');
    const tTrap = EV('csrf.trap');
    const tStrict = EV('strict.block');
    const tLax = EV('lax.allow_nav');
    const tNone = EV('none.open');
    const tCombo = EV('combo.rules');

    const inP = P(f, tIn + 4, 20);
    const BX = -330;          // ブラウザ中心
    const GX = 330;           // ゲート
    const SX = 740;           // 銀行サーバー
    const LANE_Y = -40;
    const JARX = BX;
    const JARY = 196;

    const ctx = P(f, tCtx + 6, 20);

    // ベースライン：銀行タブから出た青封筒は札つきで通る（context.frame 中）
    const eBank = P(f, tCtx + 30, 56);
    const bankX = lerp(BX - 180, SX - 200, eBank);
    const hopB = P(f, tCtx + 44, 14);

    // 罠：赤封筒、札が貼られそうになる
    const eTrap = seq(f, [[tTrap + 6, 0], [tTrap + 40, 0.62], [tStrict + 40, 0.62], [tStrict + 80, 1]]);
    const trapX = lerp(BX + 160, SX - 200, eTrap);
    const tagRise = P(f, tTrap + 30, 22);  // jar から札が浮く
    const strictP = P(f, tStrict + 8, 16);
    const tagBack = P(f, tStrict + 16, 20); // Strict: 札が jar へ戻る
    const trapArrive = P(f, tStrict + 84, 12);

    // Lax: ナビゲーション封筒は細いレーンで札つき
    const eLax = P(f, tLax + 14, 56);
    const laxX = lerp(BX + 160, SX - 200, eLax);
    const laxP = P(f, tLax + 4, 14);
    const hopL = P(f, tLax + 30, 14);

    // None: 札つき＋ Secure 錠が必須
    const eNone = P(f, tNone + 12, 50);
    const noneX = lerp(BX + 160, SX - 200, eNone);
    const noneP = P(f, tNone + 4, 14);
    const lockSnap = P(f, tNone + 34, 16);

    // 条件パネル
    const combo = P(f, tCombo + 8, 24);
    const gateMode = f >= tNone ? 'None' : f >= tLax ? 'Lax' : f >= tStrict ? 'Strict' : '';

    const tagFly = (() => {
        if (tagBack > 0) {
            const t = 1 - tagBack;
            return { x: lerp(JARX, GX - 60, t), y: lerp(JARY - 40, LANE_Y - 90, t) };
        }
        return { x: lerp(JARX, GX - 60, tagRise), y: lerp(JARY - 40, LANE_Y - 90, tagRise) };
    })();

    return (
        <g opacity={inP}>
            {/* ブラウザ：銀行タブと罠タブ（文脈が封筒の色を決める） */}
            <Browser x={BX} y={-40} w={760} h={520}>
                <g transform="translate(-190 -90)">
                    <rect x={-160} y={-120} width={320} height={240} rx={14} fill="#fff"
                        stroke={C.browser} strokeWidth={ctx > 0.3 ? 6 : 4} />
                    <rect x={-160} y={-120} width={320} height={48} rx={14} fill={C.browserFill} stroke={C.browser} strokeWidth={4} />
                    <T x={0} y={-96} s={24} mono c={C.browser}>bank.example</T>
                    <Lock x={-120} y={30} s={0.9} c={C.browser} />
                    <T x={20} y={30} s={26} c={C.browser} o={0.7} mono>login</T>
                </g>
                <g transform="translate(190 -90)">
                    <rect x={-160} y={-120} width={320} height={240} rx={14} fill="#fff"
                        stroke={C.danger} strokeWidth={ctx > 0.3 ? 6 : 4} />
                    <rect x={-160} y={-120} width={320} height={48} rx={14} fill={C.setFill} stroke={C.danger} strokeWidth={4} />
                    <T x={0} y={-96} s={24} mono c={C.danger}>evil.example</T>
                    <rect x={-90} y={0} width={180} height={60} rx={30} fill={C.danger} opacity={0.9} />
                    <T x={0} y={32} s={30} c="#fff" w={800}>!</T>
                </g>
                <JarBox x={0} y={JARY - (-40) - 40} s={0.62} />
                {/* 銀行の札は jar に保存されたまま（飛ぶのはコピー） */}
                <Tag x={0} y={JARY - (-40) - 70} s={0.56} label="session=abc123" fs={22} />
            </Browser>

            {/* 銀行サーバーとレーン */}
            <Rack x={SX} y={-40} w={220} h={420} accent={C.browser} label="bank" />
            <line x1={BX + 390} y1={LANE_Y} x2={SX - 130} y2={LANE_Y} stroke={C.faint} strokeWidth={3}
                strokeDasharray="4 14" opacity={0.7} />

            {/* SameSite ゲート */}
            <g transform={`translate(${GX} ${LANE_Y})`}>
                <rect x={-14} y={-150} width={28} height={300} rx={14}
                    fill={strictP > 0 || laxP > 0 || noneP > 0 ? C.cookieFill : '#fff'}
                    stroke={C.cookie} strokeWidth={5} />
                {gateMode && (
                    <Pill x={0} y={-196} w={gateMode.length * 20 + 64} h={54} label={gateMode} fs={27} mono
                        fill={C.cookieFill} stroke={C.cookie} sw={4} />
                )}
                {/* Lax の細い通行レーン */}
                {laxP > 0.01 && f < tNone && (
                    <rect x={-14} y={-46} width={28} height={92} rx={12} fill="#fff" stroke={C.safe} strokeWidth={4} opacity={laxP} />
                )}
                {/* None は全開 */}
                {noneP > 0.01 && (
                    <rect x={-14} y={-130} width={28} height={260} rx={12} fill="#fff" stroke={C.warn} strokeWidth={4} opacity={noneP} />
                )}
            </g>

            {/* ベースライン：銀行文脈の封筒（青）は札つきで通過 */}
            {f >= tCtx + 30 && f < tTrap && (
                <Envelope x={bankX} y={LANE_Y} s={0.78} tint={C.browser} o={P(f, tCtx + 30, 8)}>
                    {hopB >= 1 && <Tag x={0} y={-56} s={0.62} label="session=abc123" fs={22} />}
                </Envelope>
            )}

            {/* 罠文脈の封筒（赤） */}
            {f >= tTrap + 6 && f < tLax && (
                <g>
                    <Envelope x={trapX} y={LANE_Y} s={0.78} tint={C.danger} o={P(f, tTrap + 6, 8)} />
                    {/* 札が浮いて、Strict で jar へ戻る */}
                    {(tagRise > 0 && (tagBack < 1)) && (
                        <Tag x={tagFly.x} y={tagFly.y} s={0.66} label="session=abc123" fs={22}
                            rot={lerp(0, -10, tagRise)} />
                    )}
                    {/* サーバー側は「?」（札なし＝本人扱いされない） */}
                    <T x={SX} y={-330} s={52} c={C.sub} w={800} o={pulse(f, tStrict + 86, 36)}>?</T>
                </g>
            )}

            {/* Lax: ナビゲーション封筒（矢印バッジ）だけ札つき */}
            {f >= tLax + 14 && f < tNone && (
                <Envelope x={laxX} y={LANE_Y} s={0.78} tint={C.danger} o={P(f, tLax + 14, 8)}>
                    <g transform="translate(-62 -38)">
                        <circle r={20} fill="#fff" stroke={C.safe} strokeWidth={3.5} />
                        <path d="M -7 5 L 7 -6 M 7 -6 H -2 M 7 -6 V 3" stroke={C.safe} strokeWidth={3.5}
                            strokeLinecap="round" fill="none" />
                    </g>
                    {hopL >= 1 && <Tag x={6} y={-58} s={0.62} label="session=abc123" fs={22} />}
                </Envelope>
            )}

            {/* None: 札つき＋ Secure 錠スタンプ */}
            {f >= tNone + 12 && (
                <Envelope x={noneX} y={LANE_Y} s={0.78} tint={C.danger} o={P(f, tNone + 12, 8)}>
                    <Tag x={0} y={-58} s={0.62} label="session=abc123" fs={22} />
                    {lockSnap > 0.01 && (
                        <g transform={`translate(106 -58) scale(${lerp(1.8, 1, lockSnap)})`} opacity={lockSnap}>
                            <circle r={24} fill="#fff" stroke={C.safe} strokeWidth={3.5} />
                            <Lock x={0} y={-4} s={0.8} />
                        </g>
                    )}
                </Envelope>
            )}

            {/* combo.rules: ゲートが条件パネルに育つ */}
            {combo > 0.01 && (
                <g transform={`translate(${GX} ${LANE_Y - 10})`} opacity={combo}>
                    <rect x={-150} y={-170} width={300} height={330} rx={20} fill="rgba(255,255,255,0.97)"
                        stroke={C.cookie} strokeWidth={5} />
                    {['SameSite', 'Secure', 'Domain'].map((s2, i) => (
                        <Pill key={s2} x={0} y={-104 + i * 96} w={236} h={64} label={s2} fs={28} mono
                            fill={C.cookieFill} stroke={C.cookie} sw={3.5}
                            scale={lerp(0.6, 1, P(f, tCombo + 12 + i * 9, 16))}
                            o={P(f, tCombo + 12 + i * 9, 16)} />
                    ))}
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * 画面6: third_party — 同じ札が3つのサイトを旅して点が線になる
 * ============================================================ */

const SceneThirdParty: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.third_party.in');
    const tEmbed = EV('embed.ad');
    const tMany = EV('same.ad.many');
    const tTravel = EV('id.travels');
    const tDots = EV('dots.to.line');
    const tMap = EV('tracking.not_content');

    const inP = P(f, tIn + 4, 18);
    const many = P(f, tMany + 8, 26);

    // サイト枠：1枚（大）→ 3枚（横並び）
    const SITES = [
        { name: 'news.example', accent: C.browser, x3: -600 },
        { name: 'blog.example', accent: C.teal, x3: 0 },
        { name: 'shop.example', accent: C.pink, x3: 600 },
    ];
    const newsX = lerp(-240, -600, many);
    const newsY = lerp(-60, 30, many);
    const newsS = lerp(1, 0.62, many);
    const ADX = 620;          // 広告サーバー（上）
    const ADY = -330;

    const embed = P(f, tEmbed + 8, 22);

    const siteFrame = (name: string, accent: string, x: number, y: number, s: number, o: number, adO: number) => (
        <g key={name} transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <rect x={-280} y={-200} width={560} height={400} rx={18} fill="#fff" stroke={accent} strokeWidth={5} />
            <rect x={-280} y={-200} width={560} height={56} rx={18} fill="#fff" stroke={accent} strokeWidth={5} />
            <T x={0} y={-172} s={28} mono c={accent}>{name}</T>
            <line x1={-220} y1={-80} x2={220} y2={-80} stroke={C.faint} strokeWidth={5} strokeLinecap="round" />
            <line x1={-220} y1={-20} x2={120} y2={-20} stroke={C.faint} strokeWidth={5} strokeLinecap="round" />
            {/* 広告部品（別ドメインの埋め込み） */}
            <g transform="translate(150 110)" opacity={adO}>
                <rect x={-110} y={-66} width={220} height={132} rx={12} fill={C.purpleFill} stroke={C.purple}
                    strokeWidth={4.5} strokeDasharray="10 8" />
                <T x={0} y={-30} s={24} mono c={C.purple}>ad.example</T>
                <circle cx={-50} cy={26} r={22} fill="#fff" stroke={C.purple} strokeWidth={3.5} />
                <line x1={-12} y1={14} x2={66} y2={14} stroke={C.purple} strokeWidth={5} strokeLinecap="round" />
                <line x1={-12} y1={40} x2={42} y2={40} stroke={C.purple} strokeWidth={5} strokeLinecap="round" />
            </g>
        </g>
    );

    // 3通の封筒が広告サーバーへ（同じ uid=777）
    const trips = [0, 1, 2].map((i) => P(f, tTravel + 10 + i * 22, 40));

    // 点 → 線 → 行動地図
    const dotsP = [0, 1, 2].map((i) => P(f, tDots + 8 + i * 10, 14));
    const lineP = P(f, tDots + 40, 26);
    const mapP = P(f, tMap + 10, 30);
    const TLY = -150;  // タイムライン y
    const dotX = (i: number) => -260 + i * 260;

    return (
        <g opacity={inP}>
            {/* 広告サーバー（上・紫） */}
            <g opacity={P(f, tEmbed, 16)}>
                <Rack x={ADX} y={ADY + 70} w={300} h={170} accent={C.purple} label="ad.example" />
            </g>

            {/* サイト枠 */}
            {siteFrame(SITES[0].name, SITES[0].accent, newsX, newsY, newsS, 1, embed)}
            {many > 0.01 && siteFrame(SITES[1].name, SITES[1].accent, lerp(900, 0, P(f, tMany + 14, 24)), 30, 0.62, P(f, tMany + 14, 24), 1)}
            {many > 0.01 && siteFrame(SITES[2].name, SITES[2].accent, lerp(1300, 600, P(f, tMany + 26, 24)), 30, 0.62, P(f, tMany + 26, 24), 1)}

            {/* embed: 部品が広告サーバーから飛んで来る線 */}
            <Arrow x1={ADX - 60} y1={ADY + 140} x2={newsX + 150 * newsS} y2={newsY + 60 * newsS}
                p={pulse(f, tEmbed + 6, 40)} c={C.purple} dash o={0.7} />

            {/* id.travels: 3通の封筒に同じ札 */}
            {trips.map((tp, i) => {
                if (tp <= 0.01 || f < tTravel) return null;
                const sx = SITES[i].x3 * 0.62 + (i === 0 ? newsX + 600 * 0 : 0); // 3枚配置後の ad 部品位置
                const start = { x: SITES[i].x3 + 93 * 1, y: 30 + 68 };
                const end = { x: ADX - 170 + (i - 1) * 44, y: ADY + 184 };
                const pos = flight(tp, start, end, 220);
                const o = tp < 1 ? 1 : 1 - P(f, tTravel + 56 + i * 22, 12);
                return (
                    <g key={i} opacity={o}>
                        <Envelope x={pos.x} y={pos.y} s={0.62} tint={SITES[i].accent}>
                            <Tag x={0} y={-52} s={0.62} label="uid=777" fill={C.purpleFill} stroke={C.purple} fs={24} />
                        </Envelope>
                    </g>
                );
            })}

            {/* dots.to.line: 訪問の点が一本の線に */}
            <g transform={`translate(0 ${TLY})`}>
                {lineP > 0.01 && (
                    <line x1={dotX(0)} y1={0} x2={lerp(dotX(0), dotX(2), lineP)} y2={0}
                        stroke={C.purple} strokeWidth={6} strokeLinecap="round" />
                )}
                {dotsP.map((dp, i) => dp > 0.01 ? (
                    <g key={i} transform={`translate(${dotX(i)} 0) scale(${lerp(1.6, 1, dp)})`} opacity={dp}>
                        <circle r={17} fill={SITES[i].accent} stroke="#fff" strokeWidth={4} />
                    </g>
                ) : null)}

                {/* tracking.not_content: 線が行動地図へ伸びる */}
                {mapP > 0.01 && (
                    <g opacity={mapP}>
                        <polyline
                            points="-260,0 -440,-26 -620,8 -760,-14"
                            fill="none" stroke={C.purple} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
                            strokeDasharray={700} strokeDashoffset={700 * (1 - mapP)} opacity={0.65} />
                        <polyline
                            points="260,0 400,-22 540,12 660,-8"
                            fill="none" stroke={C.purple} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
                            strokeDasharray={700} strokeDashoffset={700 * (1 - mapP)} opacity={0.65} />
                        {[-440, -620, -760, 400, 540, 660].map((x, i) => (
                            <circle key={i} cx={x} cy={[-26, 8, -14, -22, 12, -8][i]} r={10}
                                fill="#fff" stroke={C.purple} strokeWidth={4}
                                opacity={P(f, tMap + 18 + i * 6, 12)} />
                        ))}
                        {/* 中身はただの短い ID のまま */}
                        <Tag x={0} y={-78} s={0.86} label="uid=777" fill={C.purpleFill} stroke={C.purple} fs={26} />
                    </g>
                )}
            </g>
        </g>
    );
};

/* ============================================================
 * 画面7: partitioned — 第三者の札にトップサイト別の棚を作る
 * ============================================================ */

const ScenePartitioned: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.partitioned.in');
    const tPol = EV('policy.not_simple');
    const tShelf = EV('partition.shelves');
    const tChips = EV('chips.attr');
    const tSep = EV('separate.jars');
    const tTrade = EV('tradeoff');
    const tOther = EV('other.tracking');

    const inP = P(f, tIn + 4, 18);
    const SITES = [
        { name: 'news', accent: C.browser, x: -560 },
        { name: 'blog', accent: C.teal, x: 0 },
        { name: 'shop', accent: C.pink, x: 560 },
    ];
    const TLY = -120;

    const gate = P(f, tIn + 10, 20);
    const pol = P(f, tPol + 8, 22);
    const shelf = P(f, tShelf + 10, 26);
    const chips = P(f, tChips + 8, 20);
    const seps = [0, 1, 2].map((i) => P(f, tSep + 10 + i * 14, 20));
    const trade = P(f, tTrade + 8, 22);
    const others = [0, 1, 2, 3].map((i) => P(f, tOther + 8 + i * 9, 16));

    const UIDS = ['uid=777', 'uid=903', 'uid=152'];

    return (
        <g opacity={inP}>
            {/* 前画面の続き：3サイトのミニ枠と横断線（上段） */}
            <g transform="translate(0 -300)">
                {SITES.map((s2) => (
                    <g key={s2.name} transform={`translate(${s2.x} 0)`}>
                        <rect x={-170} y={-70} width={340} height={140} rx={14} fill="#fff" stroke={s2.accent} strokeWidth={4.5} />
                        <T x={0} y={-42} s={23} mono c={s2.accent}>{`${s2.name}.example`}</T>
                        <rect x={48} y={-6} width={104} height={58} rx={10} fill={C.purpleFill} stroke={C.purple}
                            strokeWidth={3.5} strokeDasharray="8 7" />
                        <T x={100} y={24} s={19} mono c={C.purple}>ad</T>
                    </g>
                ))}
            </g>
            {/* 横断線と遮断ゲート */}
            <g transform={`translate(0 ${TLY})`}>
                <line x1={-560} y1={0} x2={-60} y2={0} stroke={C.purple} strokeWidth={6} strokeLinecap="round"
                    opacity={lerp(0.8, 0.25, gate)} />
                <line x1={60} y1={0} x2={560} y2={0} stroke={C.purple} strokeWidth={6} strokeLinecap="round"
                    opacity={lerp(0.8, 0.25, gate)} />
                {[-560, 0, 560].map((x, i) => (
                    <circle key={i} cx={x} cy={0} r={14} fill={SITES[i].accent} stroke="#fff" strokeWidth={4} />
                ))}
                {gate > 0.01 && (
                    <g transform={`translate(0 0) scale(${lerp(1.6, 1, gate)})`} opacity={gate}>
                        <rect x={-20} y={-86} width={40} height={172} rx={18} fill="#fff" stroke={C.danger} strokeWidth={5} />
                        <CrossMark x={0} y={0} s={0.9} />
                    </g>
                )}
            </g>

            {/* ポリシーカード（ブラウザごとに違う・半透明の重なり） */}
            {pol > 0.01 && (
                <g transform="translate(660 -60)" opacity={pol * 0.92 * (1 - 0.75 * P(f, tShelf, 20))}>
                    {[{ r: -10, dx: -120, m: '◯' }, { r: 0, dx: 0, m: '△' }, { r: 10, dx: 120, m: '□' }].map((cd, i) => (
                        <g key={i} transform={`translate(${cd.dx} ${i * 10}) rotate(${cd.r})`} opacity={0.8}>
                            <rect x={-80} y={-104} width={160} height={208} rx={16} fill="#fff" stroke={C.server} strokeWidth={4} />
                            <T x={0} y={-58} s={40} c={C.server}>{cd.m}</T>
                            <line x1={-48} y1={0} x2={48} y2={0} stroke={C.faint} strokeWidth={5} strokeLinecap="round" />
                            <line x1={-48} y1={36} x2={28} y2={36} stroke={C.faint} strokeWidth={5} strokeLinecap="round" />
                        </g>
                    ))}
                </g>
            )}

            {/* Partitioned 棚：1つの jar が3区画に分かれる */}
            {shelf > 0.01 && (
                <g transform="translate(-130 128)" opacity={P(f, tShelf + 10, 14)}>
                    <rect x={lerp(-120, -420, shelf)} y={-90} width={lerp(240, 840, shelf)} height={200} rx={18}
                        fill="#fff" stroke={C.purple} strokeWidth={5} />
                    {/* 仕切り */}
                    {[1, 2].map((i) => (
                        <line key={i} x1={-420 + i * 280} y1={-86} x2={-420 + i * 280} y2={106}
                            stroke={C.purple} strokeWidth={4} opacity={shelf} />
                    ))}
                    {/* 区画ヘッダ＝トップサイト色 */}
                    {SITES.map((s2, i) => (
                        <g key={s2.name} opacity={shelf}>
                            <rect x={-412 + i * 280} y={-82} width={264} height={42} rx={10} fill={s2.accent} opacity={0.16} />
                            <circle cx={-392 + i * 280} cy={-61} r={10} fill={s2.accent} />
                            <T x={-372 + i * 280} y={-60} s={21} mono c={s2.accent} anchor="start">{`${s2.name}.example`}</T>
                        </g>
                    ))}
                    {/* 別々の ID 札が別々の棚へ */}
                    {seps.map((sp, i) => sp > 0.01 ? (
                        <Tag key={i} x={-280 + i * 280} y={lerp(-180, 36, sp)} s={0.74}
                            label={UIDS[i === 1 ? 1 : i === 0 ? 0 : 2]} fill={C.purpleFill} stroke={C.purple} fs={24}
                            o={sp} rot={lerp(-8, 0, sp)} />
                    ) : null)}
                </g>
            )}

            {/* chips.attr: 札に Partitioned; Secure の帯 */}
            {chips > 0.01 && (
                <g transform={`translate(540 110) scale(${lerp(0.7, 1, chips)})`} opacity={chips}>
                    <Tag x={0} y={-30} s={1.04} label="uid=777" fill={C.purpleFill} stroke={C.purple} fs={27}
                        sub="Partitioned; Secure" />
                </g>
            )}

            {/* tradeoff: 機能レーンは残し、横断だけ薄く */}
            {trade > 0.01 && (
                <g transform="translate(-620 20)" opacity={trade}>
                    <Arrow x1={-60} y1={-60} x2={-60} y2={40} p={trade} c={C.safe} sw={5} />
                    <g transform="translate(-60 96)">
                        <circle r={36} fill={C.safeFill} stroke={C.safe} strokeWidth={4} />
                        <path d="M -12 0 H 12 M 0 -12 V 12" stroke={C.safe} strokeWidth={5} strokeLinecap="round" />
                    </g>
                    <Pill x={64} y={96} w={130} h={54} label="機能" fs={26} fill={C.safeFill} stroke={C.safe} tc={C.safe} sw={3.5} />
                </g>
            )}

            {/* Cookie 以外の追跡材料 */}
            <g transform="translate(0 268)">
                {['連携', 'URL', '指紋', '突合'].map((s2, i) => others[i] > 0.01 ? (
                    <Pill key={s2} x={-310 + i * 205} y={0} w={150} h={56} label={s2} fs={25}
                        fill="#fff" stroke={C.sub} tc={C.sub} sw={3}
                        scale={lerp(0.6, 1, others[i])} o={others[i] * 0.92} />
                ) : null)}
            </g>
        </g>
    );
};

/* ============================================================
 * 画面8: session — 盗まれた通行証は「パスワード後」の世界に入る
 * ============================================================ */

const SceneSession: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.session.in');
    const tTicket = EV('ticket.appear');
    const tStolen = EV('stolen.ticket');
    const tMfa = EV('mfa.after');
    const tDef = EV('defense.stack');
    const tHost = EV('prefix.host');
    const tOld = EV('old.mechanism');

    const inP = P(f, tIn + 6, 18);
    const GX = 470;   // 認証済みゲート
    const GY = -60;

    const tk = P(f, tTicket + 8, 22);     // 札→通行証
    const stolen = P(f, tStolen + 10, 24); // コピーが生まれる
    const carry = P(f, tStolen + 40, 30);  // 闇の手がゲート前へ
    const mfa = P(f, tMfa + 8, 20);
    const bypass = P(f, tMfa + 34, 36);    // 裏口を通る
    const gateOpen = P(f, tMfa + 74, 16);
    const defs = [0, 1, 2, 3, 4, 5].map((i) => P(f, tDef + 10 + i * 9, 16));
    const host = P(f, tHost + 8, 20);
    const stamps = [0, 1, 2].map((i) => P(f, tHost + 26 + i * 12, 14));
    const olds = [0, 1].map((i) => P(f, tOld + 12 + i * 16, 18));

    const TX = -360;  // 元の通行証
    const TY = -40;

    const copyPos = (() => {
        const a = { x: TX + 70, y: TY + 90 };
        const b = { x: GX - 210, y: GY + 130 };
        const t0 = lerp(0, 1, carry);
        return { x: lerp(a.x, b.x, t0), y: lerp(a.y, b.y, t0) };
    })();

    const DEF_CHIPS = ['Secure', 'HttpOnly', 'SameSite'];

    return (
        <g opacity={inP}>
            {/* 認証済みゲート */}
            <g transform={`translate(${GX} ${GY})`}>
                <rect x={-150} y={-210} width={36} height={420} rx={16} fill="#fff" stroke={C.server} strokeWidth={5} />
                <rect x={114} y={-210} width={36} height={420} rx={16} fill="#fff" stroke={C.server} strokeWidth={5} />
                <rect x={-150} y={-242} width={300} height={52} rx={16} fill={C.serverFill} stroke={C.server} strokeWidth={5} />
                <T x={0} y={-216} s={26} w={800} c={C.server}>認証済</T>
                {/* バー：開閉 */}
                <line x1={-114} y1={60} x2={114} y2={60} stroke={C.server} strokeWidth={9} strokeLinecap="round"
                    transform={`rotate(${lerp(0, -56, gateOpen)} -114 60)`} />
                {/* 後付けの安全柵 */}
                {olds.map((op, i) => op > 0.01 ? (
                    <g key={i} transform={`translate(${i === 0 ? -132 : 132} ${-60 + i * 90}) scale(${lerp(1.7, 1, op)})`} opacity={op}>
                        <rect x={-34} y={-22} width={68} height={44} rx={10} fill={C.safeFill} stroke={C.safe} strokeWidth={4} />
                        <path d="M -14 0 H 14 M 0 -14 V 14" stroke={C.safe} strokeWidth={4.5} strokeLinecap="round" />
                    </g>
                ) : null)}
            </g>

            {/* 札 → 通行証 */}
            <g transform={`translate(${TX} ${TY})`}>
                <g transform={`scale(${lerp(0.9, 1.06, tk)})`}>
                    <rect x={-160} y={-66} width={320} height={132} rx={16} fill={C.cookieFill} stroke={C.cookie} strokeWidth={5} />
                    <line x1={-100} y1={-66} x2={-100} y2={66} stroke={C.cookie} strokeWidth={3.5} strokeDasharray="7 9" />
                    <circle cx={-130} cy={0} r={9} fill="none" stroke={C.cookie} strokeWidth={3.5} />
                    <T x={28} y={-22} s={24} mono>{host > 0.3 ? '__Host-session' : 'session=abc123'}</T>
                    {/* 認証済スタンプ */}
                    <g opacity={tk}>
                        <circle cx={28} cy={28} r={26} fill="none" stroke={C.safe} strokeWidth={4} />
                        <CheckMark x={28} y={28} s={0.7} p={tk} />
                    </g>
                </g>
                {/* __Host- の制約刻印 */}
                {['Secure', 'Path=/', 'Domain'].map((s2, i) => stamps[i] > 0.01 ? (
                    <g key={s2} transform={`translate(${-120 + i * 120} ${118}) scale(${lerp(1.6, 1, stamps[i])})`} opacity={stamps[i]}>
                        <rect x={-56} y={-24} width={112} height={48} rx={12} fill="#fff"
                            stroke={i === 2 ? C.danger : C.safe} strokeWidth={3.5} />
                        <T x={0} y={1} s={20} mono c={i === 2 ? C.danger : C.safe}>{s2}</T>
                        {i === 2 && <line x1={-40} y1={0} x2={40} y2={0} stroke={C.danger} strokeWidth={4} />}
                    </g>
                ) : null)}
                {/* 防御板の積層（プレフィックスの刻印が始まったらアイコン勢は退く） */}
                {defs.map((dp0, i) => {
                    const dp = dp0 * (i >= 3 ? 1 - 0.75 * P(f, tHost, 20) : 1);
                    if (dp <= 0.01) return null;
                    const ang = -90 + i * 60;
                    const r = 235;
                    const x = Math.cos((ang * Math.PI) / 180) * r * 1.25;
                    const y = Math.sin((ang * Math.PI) / 180) * r * 0.78;
                    return i < 3 ? (
                        <Pill key={i} x={x} y={y} w={DEF_CHIPS[i].length * 17 + 56} h={52} label={DEF_CHIPS[i]} fs={23} mono
                            fill={C.safeFill} stroke={C.safe} tc={C.safe} sw={3.5} scale={lerp(0.5, 1, dp)} o={dp} />
                    ) : (
                        <g key={i} transform={`translate(${x} ${y}) scale(${lerp(0.5, 1, dp)})`} opacity={dp}>
                            <circle r={30} fill={C.safeFill} stroke={C.safe} strokeWidth={3.5} />
                            {i === 3 && ( // 短い寿命＝時計
                                <g>
                                    <circle r={15} fill="none" stroke={C.safe} strokeWidth={3.5} />
                                    <path d="M 0 -8 V 0 H 7" fill="none" stroke={C.safe} strokeWidth={3.5} strokeLinecap="round" />
                                </g>
                            )}
                            {i === 4 && ( // 再認証＝循環矢印
                                <path d="M 10 -6 A 12 12 0 1 0 12 4 M 12 4 L 4 2 M 12 4 L 14 -4"
                                    fill="none" stroke={C.safe} strokeWidth={3.5} strokeLinecap="round" />
                            )}
                            {i === 5 && <CrossMark x={0} y={0} s={0.62} c={C.safe} />}
                        </g>
                    );
                })}
            </g>

            {/* 盗まれたコピー＋闇の手 */}
            {stolen > 0.01 && (
                <g opacity={Math.min(1, stolen * 1.2)}>
                    <g transform={`translate(${copyPos.x} ${copyPos.y}) rotate(${lerp(10, 0, carry)}) scale(${lerp(0.4, 0.78, stolen)})`}>
                        <rect x={-160} y={-66} width={320} height={132} rx={16} fill="#e2e6ee" stroke={C.ink} strokeWidth={5} />
                        <line x1={-100} y1={-66} x2={-100} y2={66} stroke={C.ink} strokeWidth={3.5} strokeDasharray="7 9" />
                        <T x={28} y={-22} s={24} mono c={C.ink}>session=abc123</T>
                        <circle cx={28} cy={28} r={26} fill="none" stroke={C.sub} strokeWidth={4} />
                    </g>
                    {/* 闇の手（正体不明の保持者） */}
                    <g transform={`translate(${copyPos.x + 90} ${copyPos.y + 74}) scale(${lerp(0.6, 1, stolen)})`}>
                        <circle r={44} fill={C.ink} opacity={0.85} />
                        <T x={0} y={2} s={36} c="#fff" w={800}>?</T>
                    </g>
                    {bypass > 0.01 && gateOpen > 0.3 && (
                        <T x={GX} y={GY - 300} s={48} c={C.warn} w={800} o={pulse(f, tMfa + 78, 40)}>!</T>
                    )}
                </g>
            )}

            {/* MFA ドアと裏口レーン */}
            {mfa > 0.01 && (
                <g opacity={mfa}>
                    <g transform="translate(-700 -110)">
                        <rect x={-110} y={-150} width={220} height={300} rx={16} fill="#fff" stroke={C.browser} strokeWidth={5} />
                        <T x={0} y={-110} s={26} mono c={C.browser} w={800}>2FA</T>
                        <Lock x={-40} y={-20} s={1} c={C.browser} />
                        <g transform="translate(44 -20)">
                            <rect x={-20} y={-30} width={40} height={60} rx={9} fill="#fff" stroke={C.browser} strokeWidth={4} />
                            <circle cx={0} cy={16} r={5} fill={C.browser} />
                        </g>
                        {/* 正面は破れない */}
                        <CrossMark x={0} y={84} s={1} />
                    </g>
                    {/* 裏口：セッション札だけで通る別入口 */}
                    <path d={`M -590 160 Q -100 250 ${GX - 220} ${GY + 150}`} fill="none" stroke={C.warn}
                        strokeWidth={5} strokeDasharray="14 12"
                        opacity={0.85} strokeDashoffset={900 * (1 - bypass)} pathLength={900} />
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * 画面9: consent — 技術の層と運用の層を分けて、技術へ戻る
 * ============================================================ */

const SceneConsent: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.consent.in');
    const tLayer = EV('layer.split');
    const tClass = EV('necessary.vs.ads');
    const tPurp = EV('purpose.arrow');
    const tInvis = EV('invisible.auto');
    const tRet = EV('tech.return');

    const inP = P(f, tIn + 4, 18);
    const layer = P(f, tLayer + 8, 24);
    const ret = P(f, tRet + 10, 28);

    // 上段（技術）：tech.return で中央へ拡大
    const techY = lerp(-200, lerp(-200, -60, ret), 1);
    const techS = lerp(1, 1.22, ret);

    // バナー：登場 → 下段（運用）へ移動
    const bx = lerp(0, -480, layer);
    const by = lerp(120, 160, layer);
    const bs = lerp(0.9, 0.7, layer);

    const cls = P(f, tClass + 10, 22);
    const purp = P(f, tPurp + 10, 24);

    // 自動添付の往復（2回だけ・薄く）
    const inv1 = P(f, tInvis + 8, 50);
    const inv2 = P(f, tInvis + 70, 50);
    const hopI1 = P(f, tInvis + 20, 14);
    const hopI2 = P(f, tInvis + 82, 14);

    const lower0 = layer * (1 - ret);

    const tagDrop = (i: number, t0: number) => P(f, t0 + i * 12, 18);

    return (
        <g opacity={inP}>
            {/* 層の分割線 */}
            {layer > 0.01 && (
                <g opacity={1 - ret}>
                    <line x1={lerp(0, -780, layer)} y1={20} x2={lerp(0, 780, layer)} y2={20}
                        stroke={C.ink} strokeWidth={4} strokeDasharray="18 14" opacity={0.55} />
                    <Pill x={-740} y={-44} w={150} h={56} label="技術" fs={27} o={layer} sw={3.5} />
                    <Pill x={-740} y={88} w={150} h={56} label="運用" fs={27} o={layer} sw={3.5}
                        fill="#fff" stroke={C.sub} tc={C.sub} />
                </g>
            )}

            {/* 上段：技術＝封筒に自動添付される往復 */}
            <g transform={`translate(0 ${techY}) scale(${techS})`}>
                <Browser x={-460} y={0} w={300} h={230} o={layer}>
                    <JarBox x={0} y={50} s={0.5} />
                </Browser>
                <Rack x={460} y={0} w={190} h={230} accent={C.server} o={layer} />
                <line x1={-280} y1={-20} x2={350} y2={-20} stroke={C.faint} strokeWidth={3} strokeDasharray="4 14" opacity={layer * 0.7} />
                {/* 自動添付（2回・薄め） */}
                {[{ p: inv1, hp: hopI1, t0: tInvis + 8 }, { p: inv2, hp: hopI2, t0: tInvis + 70 }].map((m, i) => (
                    m.p > 0.01 && m.p < 1 ? (
                        <g key={i} opacity={0.6}>
                            <Envelope x={lerp(-300, 330, m.p)} y={-20} s={0.62} tint={C.browser}>
                                {m.hp >= 1 && <Tag x={0} y={-50} s={0.55} label="name=value" fs={22} />}
                            </Envelope>
                            {m.hp > 0 && m.hp < 1 && (
                                <Tag x={lerp(-460, lerp(-300, 330, 0.35), m.hp)} y={lerp(40, -70, m.hp)}
                                    s={0.55} label="name=value" fs={22} />
                            )}
                        </g>
                    ) : null
                ))}
            </g>

            {/* バナー再登場（今度は運用の層の住人） */}
            <g transform={`translate(${bx} ${by}) scale(${bs})`} opacity={(1 - ret) * P(f, tIn + 8, 16)}>
                <rect x={-230} y={-130} width={460} height={260} rx={20} fill="#fff" stroke={C.ink} strokeWidth={4.5} />
                <circle cx={0} cy={-62} r={34} fill="#e7c08a" stroke="#b97f24" strokeWidth={3.5} />
                {[[-12, -74], [10, -56], [-4, -52]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={4.5} fill="#8a5a16" />)}
                <T x={0} y={8} s={30} w={800}>Cookie</T>
                <rect x={-150} y={48} width={140} height={48} rx={24} fill={C.browser} />
                <rect x={10} y={48} width={140} height={48} rx={24} fill="#fff" stroke={C.faint} strokeWidth={3.5} />
            </g>

            {/* 分類トレイ：必要 / 広告（運用の関心） */}
            {cls > 0.01 && lower0 > 0.01 && (
                <g opacity={cls * lower0}>
                    {/* 必要（緑） */}
                    <g transform="translate(-60 170)">
                        <rect x={-150} y={20} width={300} height={86} rx={16} fill={C.safeFill} stroke={C.safe} strokeWidth={4} />
                        <Pill x={0} y={-118} w={150} h={52} label="必要" fs={25} fill={C.safeFill} stroke={C.safe} tc={C.safe} sw={3.5} o={cls} />
                        {[0, 1].map((i) => (
                            <Tag key={i} x={-62 + i * 124} y={lerp(-80, 44, tagDrop(i, tClass + 12))} s={0.56}
                                label={i === 0 ? 'session' : 'cart'} fill={C.safeFill} stroke={C.safe} fs={24}
                                o={tagDrop(i, tClass + 12)} />
                        ))}
                    </g>
                    {/* 広告・解析（紫） */}
                    <g transform="translate(380 170)">
                        <rect x={-150} y={20} width={300} height={86} rx={16} fill={C.purpleFill} stroke={C.purple} strokeWidth={4} />
                        <Pill x={0} y={-118} w={150} h={52} label="広告" fs={25} fill={C.purpleFill} stroke={C.purple} tc={C.purple} sw={3.5} o={cls} />
                        {[0, 1].map((i) => (
                            <Tag key={i} x={-62 + i * 124} y={lerp(-80, 44, tagDrop(i, tClass + 36))} s={0.56}
                                label={i === 0 ? 'uid=777' : 'stats'} fill={C.purpleFill} stroke={C.purple} fs={24}
                                o={tagDrop(i, tClass + 36)} />
                        ))}
                    </g>
                </g>
            )}

            {/* 目的・宛先・寿命への矢印 */}
            {purp > 0.01 && lower0 > 0.01 && (
                <g opacity={purp * lower0}>
                    {['目的', '宛先', '寿命'].map((s2, i) => (
                        <g key={s2}>
                            <Arrow x1={500} y1={214} x2={660} y2={108 + i * 80} p={P(f, tPurp + 10 + i * 10, 18)} c={C.sub} sw={3.5} />
                            <Pill x={740} y={108 + i * 80} w={140} h={56} label={s2} fs={26}
                                o={P(f, tPurp + 14 + i * 10, 16)} sw={3} stroke={C.sub} tc={C.ink} />
                        </g>
                    ))}
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * 画面10: outro — メモが地図として再構成される
 * ============================================================ */

const SceneOutro: React.FC<{ f: number }> = ({ f }) => {
    const tIn = EV('scene.outro.in');
    const tFlow = EV('recap.flow');
    const tAttrs = EV('recap.attrs');
    const tRisks = EV('recap.risks');
    const tLens = EV('final.lens');

    const inP = P(f, tIn + 6, 20);
    const flow = P(f, tFlow + 8, 20);
    const lens = P(f, tLens + 8, 26);

    // 一筆書きの往復：server→browser（Set-Cookie）→jar→server（Cookie）
    const run = P(f, tFlow + 24, 110);
    const BX = -440;
    const SX = 440;
    const FY = -80;
    const pathPos = (t: number): XY => {
        // 区間1: サーバー→ブラウザ（上弧） 区間2: ブラウザ→jar 区間3: ブラウザ→サーバー（下弧）
        if (t < 0.42) return flight(t / 0.42, { x: SX - 110, y: FY - 40 }, { x: BX + 110, y: FY - 40 }, 110);
        if (t < 0.58) return { x: BX + lerp(110, 0, (t - 0.42) / 0.16), y: FY - 40 + ((t - 0.42) / 0.16) * 76 };
        return flight((t - 0.58) / 0.42, { x: BX, y: FY + 36 }, { x: SX - 110, y: FY + 60 }, -70);
    };
    const runPos = pathPos(run);
    const ATTR7 = ['Domain', 'Path', 'Expires', 'Secure', 'HttpOnly', 'SameSite', 'Partitioned'];
    const risks = P(f, tRisks + 10, 22);

    const memY = seq(f, [[tIn, -60], [tFlow, -60], [tFlow + 20, -210], [tLens, -210], [tLens + 26, -250]]);
    const memS = seq(f, [[tIn, 1.1], [tFlow + 20, 0.92], [tLens + 26, 1.0]]);

    return (
        <g opacity={inP}>
            {/* 最初の小さなメモ（背骨の原点） */}
            <Tag x={0} y={memY} s={memS} label="name=value" fs={28} />

            {/* 一筆書きの往復 */}
            {flow > 0.01 && (
                <g opacity={flow * lerp(1, 0.35, lens)}>
                    <Browser x={BX} y={FY} w={250} h={210}>
                        <JarBox x={0} y={42} s={0.42} />
                    </Browser>
                    <Rack x={SX} y={FY} w={170} h={210} accent={C.server} />
                    {/* 軌跡 */}
                    <path d={`M ${SX - 110} ${FY - 40} Q 0 ${FY - 150} ${BX + 110} ${FY - 40}`}
                        fill="none" stroke={C.set} strokeWidth={4} strokeDasharray={760} strokeDashoffset={760 * (1 - P(f, tFlow + 24, 46))} pathLength={760} opacity={0.7} />
                    <path d={`M ${BX} ${FY + 36} Q 0 ${FY + 130} ${SX - 110} ${FY + 60}`}
                        fill="none" stroke={C.cookie} strokeWidth={4} strokeDasharray={760} strokeDashoffset={760 * (1 - P(f, tFlow + 78, 56))} pathLength={760} opacity={0.7} />
                    {/* 走る札 */}
                    {run > 0.01 && run < 1 && (
                        <Tag x={runPos.x} y={runPos.y} s={0.6}
                            label={run < 0.42 ? 'Set-Cookie' : 'Cookie'}
                            fill={run < 0.42 ? C.setFill : C.cookieFill}
                            stroke={run < 0.42 ? C.set : C.cookie} fs={22} />
                    )}
                </g>
            )}

            {/* 7属性のアーチ */}
            <g opacity={lerp(1, 0.5, lens)}>
                {ATTR7.map((a, i) => {
                    const ap = P(f, tAttrs + 8 + i * 7, 16);
                    if (ap <= 0.01) return null;
                    const ang = -180 + (i / 6) * 180;
                    const x = Math.cos((ang * Math.PI) / 180) * 660;
                    const y = -240 + Math.sin((ang * Math.PI) / 180) * 130;
                    return (
                        <Pill key={a} x={x} y={y} w={a.length * 17 + 54} h={52} label={a} fs={22} mono
                            scale={lerp(0.5, 1, ap)} o={ap} sw={3} />
                    );
                })}
            </g>

            {/* 左：横断追跡 / 右：盗まれた通行証 */}
            {risks > 0.01 && (
                <g opacity={risks * lerp(1, 0.35, lens)}>
                    <g transform={`translate(${lerp(-880, -560, risks)} 170)`}>
                        <rect x={-200} y={-90} width={400} height={180} rx={18} fill="#fff" stroke={C.purple} strokeWidth={4} />
                        <polyline points="-140,20 -70,-16 0,12 70,-20 140,6" fill="none" stroke={C.purple}
                            strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                        {[-140, 0, 140].map((x, i) => (
                            <circle key={i} cx={x} cy={[20, 12, 6][i]} r={11} fill={[C.browser, C.teal, C.pink][i]}
                                stroke="#fff" strokeWidth={3.5} />
                        ))}
                        <Tag x={0} y={-52} s={0.5} label="uid=777" fill={C.purpleFill} stroke={C.purple} fs={22} />
                    </g>
                    <g transform={`translate(${lerp(880, 560, risks)} 170)`}>
                        <rect x={-200} y={-90} width={400} height={180} rx={18} fill="#fff" stroke={C.server} strokeWidth={4} />
                        <rect x={-110} y={-58} width={20} height={120} rx={9} fill="#fff" stroke={C.server} strokeWidth={4} />
                        <rect x={90} y={-58} width={20} height={120} rx={9} fill="#fff" stroke={C.server} strokeWidth={4} />
                        <circle cx={36} cy={6} r={26} fill={C.ink} opacity={0.85} />
                        <T x={36} y={8} s={24} c="#fff" w={800}>?</T>
                        <g transform="translate(-34 10) scale(0.5) rotate(8)">
                            <rect x={-160} y={-66} width={320} height={132} rx={16} fill="#e2e6ee" stroke={C.ink} strokeWidth={5} />
                            <line x1={-100} y1={-66} x2={-100} y2={66} stroke={C.ink} strokeWidth={3.5} strokeDasharray="7 9" />
                        </g>
                    </g>
                </g>
            )}

            {/* 最後のレンズ：3つのチェック */}
            {lens > 0.01 && (
                <g opacity={lens}>
                    {['文脈', '宛先', '自動添付'].map((s2, i) => {
                        const cp = P(f, tLens + 16 + i * 14, 18);
                        const w = s2.length * 46 + 120;
                        return (
                            <g key={s2} transform={`translate(${-420 + i * 420} 120) scale(${lerp(0.7, 1, cp)})`} opacity={cp}>
                                <rect x={-w / 2} y={-52} width={w} height={104} rx={24} fill="#fff" stroke={C.ink} strokeWidth={5} />
                                <CheckMark x={-w / 2 + 46} y={0} s={1.1} p={cp} />
                                <T x={26} y={3} s={40} w={800}>{s2}</T>
                            </g>
                        );
                    })}
                </g>
            )}
        </g>
    );
};

/* ============================================================
 * ルート
 * ============================================================ */

const SCENES: React.FC<{ f: number }>[] = [
    SceneIntro, SceneMemory, SceneAttributes, SceneSecurity, SceneSameSite,
    SceneThirdParty, ScenePartitioned, SceneSession, SceneConsent, SceneOutro,
];

export const Cookie: React.FC = () => {
    const f = useCurrentFrame();
    return (
        <AbsoluteFill style={{ backgroundColor: C.bg }}>
            <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
                {SCENES.map((S, i) => {
                    const vis = sceneVis(i, f);
                    if (vis <= 0.005) return null;
                    return (
                        <g key={i} opacity={vis}>
                            <S f={f} />
                            <Heading i={i} f={f} />
                        </g>
                    );
                })}
                <Subtitle f={f} />
            </svg>
        </AbsoluteFill>
    );
};
