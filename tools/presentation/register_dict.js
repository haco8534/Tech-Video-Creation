#!/usr/bin/env node
/**
 * VOICEVOX辞書一括登録スクリプト
 * 
 * 使い方: node register_dict.js <project_dir>
 * 
 * scene_map.json を解析し、英語・技術用語を自動検出してVOICEVOX辞書に登録する。
 * 既存エントリと同じ surface+pronunciation の場合はスキップする。
 * 
 * 登録は2段階:
 *   1. WELL_KNOWN_TERMS: 常に登録される頻出技術用語（言語名、企業名など）
 *   2. scene_map.json スキャン: テキスト内の英語トークンを検出し、未登録なら警告
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const projectDir = process.argv[2];
if (!projectDir) { console.error('Usage: node register_dict.js <project_dir>'); process.exit(1); }

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const sceneMapPath = path.join(ROOT_DIR, projectDir, 'slides', 'scene_map.json');
if (!fs.existsSync(sceneMapPath)) { console.error('scene_map.json not found: ' + sceneMapPath); process.exit(1); }

// ===== 頻出技術用語辞書（随時追加） =====
const WELL_KNOWN_TERMS = [
    // Programming Languages
    { surface: 'FORTRAN', pronunciation: 'フォートラン' },
    { surface: 'COBOL', pronunciation: 'コボル' },
    { surface: 'JavaScript', pronunciation: 'ジャバスクリプト' },
    { surface: 'Python', pronunciation: 'パイソン' },
    { surface: 'TypeScript', pronunciation: 'タイプスクリプト' },
    { surface: 'Objective-C', pronunciation: 'オブジェクティブシー' },
    { surface: 'Swift', pronunciation: 'スウィフト' },
    { surface: 'Kotlin', pronunciation: 'コトリン' },
    { surface: 'Haskell', pronunciation: 'ハスケル' },
    { surface: 'Erlang', pronunciation: 'アーラン' },
    { surface: 'Prolog', pronunciation: 'プロログ' },
    { surface: 'Ruby', pronunciation: 'ルビー' },
    { surface: 'Rust', pronunciation: 'ラスト' },
    { surface: 'Perl', pronunciation: 'パール' },
    { surface: 'Scala', pronunciation: 'スカラ' },
    { surface: 'Clojure', pronunciation: 'クロージャー' },
    { surface: 'Elixir', pronunciation: 'エリクサー' },
    { surface: 'Dart', pronunciation: 'ダート' },
    { surface: 'LiveScript', pronunciation: 'ライブスクリプト' },
    { surface: 'CoffeeScript', pronunciation: 'コーヒースクリプト' },
    { surface: 'C++', pronunciation: 'シープラスプラス' },
    { surface: 'C#', pronunciation: 'シーシャープ' },
    { surface: 'Go言語', pronunciation: 'ゴーゲンゴ' },
    { surface: 'Java', pronunciation: 'ジャバ' },
    // Frameworks / Tools
    { surface: 'Docker', pronunciation: 'ドッカー' },
    { surface: 'Kubernetes', pronunciation: 'クバネティス' },
    { surface: 'React', pronunciation: 'リアクト' },
    { surface: 'Angular', pronunciation: 'アンギュラー' },
    { surface: 'Vue', pronunciation: 'ビュー' },
    { surface: 'Node.js', pronunciation: 'ノードジェイエス' },
    { surface: 'npm', pronunciation: 'エヌピーエム' },
    { surface: 'Git', pronunciation: 'ギット' },
    { surface: 'GitHub', pronunciation: 'ギットハブ' },
    { surface: 'VSCode', pronunciation: 'ブイエスコード' },
    { surface: 'Linux', pronunciation: 'リナックス' },
    { surface: 'UNIX', pronunciation: 'ユニックス' },
    { surface: 'PostgreSQL', pronunciation: 'ポストグレスキューエル' },
    { surface: 'MongoDB', pronunciation: 'モンゴディービー' },
    { surface: 'Redis', pronunciation: 'レディス' },
    { surface: 'nginx', pronunciation: 'エンジンエックス' },
    { surface: 'Apache', pronunciation: 'アパッチ' },
    { surface: 'Webpack', pronunciation: 'ウェブパック' },
    { surface: 'Babel', pronunciation: 'バベル' },
    { surface: 'ESLint', pronunciation: 'イーエスリント' },
    { surface: 'GraphQL', pronunciation: 'グラフキューエル' },
    // Companies / Organizations
    { surface: 'JetBrains', pronunciation: 'ジェットブレインズ' },
    { surface: 'Microsoft', pronunciation: 'マイクロソフト' },
    { surface: 'Google', pronunciation: 'グーグル' },
    { surface: 'Apple', pronunciation: 'アップル' },
    { surface: 'IBM', pronunciation: 'アイビーエム' },
    { surface: 'Mozilla', pronunciation: 'モジラ' },
    { surface: 'Oracle', pronunciation: 'オラクル' },
    { surface: 'Amazon', pronunciation: 'アマゾン' },
    { surface: 'AWS', pronunciation: 'エーダブリューエス' },
    { surface: 'Netflix', pronunciation: 'ネットフリックス' },
    { surface: 'Netscape', pronunciation: 'ネットスケープ' },
    // Technical Terms
    { surface: 'typeof', pronunciation: 'タイプオブ' },
    { surface: 'null', pronunciation: 'ヌル' },
    { surface: 'object', pronunciation: 'オブジェクト' },
    { surface: 'DSL', pronunciation: 'ディーエスエル' },
    { surface: 'OOP', pronunciation: 'オーオーピー' },
    { surface: 'API', pronunciation: 'エーピーアイ' },
    { surface: 'SQL', pronunciation: 'エスキューエル' },
    { surface: 'HTML', pronunciation: 'エイチティーエムエル' },
    { surface: 'CSS', pronunciation: 'シーエスエス' },
    { surface: 'ECMAScript', pronunciation: 'エクマスクリプト' },
    { surface: 'Wikipedia', pronunciation: 'ウィキペディア' },
    { surface: 'OS', pronunciation: 'オーエス' },
    { surface: 'CPU', pronunciation: 'シーピーユー' },
    { surface: 'GPU', pronunciation: 'ジーピーユー' },
    { surface: 'RAM', pronunciation: 'ラム' },
    { surface: 'SSD', pronunciation: 'エスエスディー' },
    { surface: 'USB', pronunciation: 'ユーエスビー' },
    { surface: 'HTTPS', pronunciation: 'エイチティーティーピーエス' },
    { surface: 'URL', pronunciation: 'ユーアールエル' },
    { surface: 'JSON', pronunciation: 'ジェイソン' },
    { surface: 'YAML', pronunciation: 'ヤムル' },
    { surface: 'XML', pronunciation: 'エックスエムエル' },
    { surface: 'TCP', pronunciation: 'ティーシーピー' },
    { surface: 'UDP', pronunciation: 'ユーディーピー' },
    { surface: 'IP', pronunciation: 'アイピー' },
    { surface: 'DNS', pronunciation: 'ディーエヌエス' },
    { surface: 'SSH', pronunciation: 'エスエスエイチ' },
    { surface: 'CI', pronunciation: 'シーアイ' },
    { surface: 'CD', pronunciation: 'シーディー' },
    { surface: 'AI', pronunciation: 'エーアイ' },
    { surface: 'LLM', pronunciation: 'エルエルエム' },
    { surface: 'GPT', pronunciation: 'ジーピーティー' },
    { surface: 'IoT', pronunciation: 'アイオーティー' },
    { surface: 'VM', pronunciation: 'ブイエム' },
    { surface: 'GUI', pronunciation: 'ジーユーアイ' },
    { surface: 'CLI', pronunciation: 'シーエルアイ' },
    { surface: 'IDE', pronunciation: 'アイディーイー' },
    { surface: 'SDK', pronunciation: 'エスディーケー' },
    { surface: 'REST', pronunciation: 'レスト' },
    { surface: 'SOAP', pronunciation: 'ソープ' },
    { surface: 'OAuth', pronunciation: 'オーオース' },
    { surface: 'JWT', pronunciation: 'ジェイダブリューティー' },
    { surface: 'WebSocket', pronunciation: 'ウェブソケット' },
    { surface: 'DevOps', pronunciation: 'デブオプス' },
    { surface: 'SaaS', pronunciation: 'サース' },
    { surface: 'PaaS', pronunciation: 'パース' },
    { surface: 'IaaS', pronunciation: 'イアース' },
    { surface: 'Programmer', pronunciation: 'プログラマー' },
    { surface: 'Programmers', pronunciation: 'プログラマーズ' },
    { surface: 'ChatGPT', pronunciation: 'チャットジーピーティー' },
    { surface: 'OpenAI', pronunciation: 'オープンエーアイ' },
    { surface: 'vibe', pronunciation: 'バイブ' },
    { surface: 'vibe coding', pronunciation: 'バイブコーディング' },
    { surface: 'coding', pronunciation: 'コーディング' },
    { surface: 'Objective-C', pronunciation: 'オブジェクティブシー' },
    { surface: 'OK', pronunciation: 'オーケー' },
    { surface: 'FORTRAN', pronunciation: 'フォートラン' },
    { surface: 'Real', pronunciation: 'リアル' },
    { surface: 'Don\'t', pronunciation: 'ドント' },
    { surface: 'Use', pronunciation: 'ユーズ' },
    { surface: 'Pascal', pronunciation: 'パスカル' },
    { surface: 'METR', pronunciation: 'メター' },
    { surface: 'NumPy', pronunciation: 'ナムパイ' },
    { surface: 'numpy', pronunciation: 'ナムパイ' },
    { surface: 'Numpy', pronunciation: 'ナムパイ' },
    { surface: 'NUMPY', pronunciation: 'ナムパイ' },
    { surface: 'Num', pronunciation: 'ナム' },
    { surface: 'pandas', pronunciation: 'パンダス' },
    { surface: 'scikit-learn', pronunciation: 'サイキットラーン' },
    { surface: 'scikit', pronunciation: 'サイキット' },
    { surface: 'learn', pronunciation: 'ラーン' },
    { surface: 'PyTorch', pronunciation: 'パイトーチ' },
    { surface: 'TF', pronunciation: 'ティーエフ' },
    { surface: 'Guido', pronunciation: 'グイド' },
    { surface: 'van', pronunciation: 'バン' },
    { surface: 'Rossum', pronunciation: 'ロッサム' },
    { surface: 'TIOBE', pronunciation: 'ティオベ' },
    { surface: 'CS', pronunciation: 'シーエス' },
    { surface: 'MIT', pronunciation: 'エムアイティー' },
    { surface: 'UC', pronunciation: 'ユーシー' },
    { surface: 'PyPI', pronunciation: 'パイピーアイ' },
    { surface: 'Fortran', pronunciation: 'フォートラン' },
    { surface: 'fortran', pronunciation: 'フォートラン' },
    { surface: 'No', pronunciation: 'ナンバー' },
    { surface: 'SIMD', pronunciation: 'シムド' },
    { surface: 'CUDA', pronunciation: 'クーダ' },
    { surface: 'CUDA', pronunciation: 'クーダ' },
    { surface: 'PEP', pronunciation: 'ペップ' },
    { surface: 'Mojo', pronunciation: 'モジョ' },
    { surface: 'Julia', pronunciation: 'ジュリア' },
    { surface: 'Go', pronunciation: 'ゴー' },
    { surface: 'ATM', pronunciation: 'エーティーエム' },
    { surface: 'HPC', pronunciation: 'エイチピーシー' },
    { surface: 'PC', pronunciation: 'ピーシー' },
    { surface: 'Web', pronunciation: 'ウェブ' },
    { surface: 'Overflow', pronunciation: 'オーバーフロー' },
    // TypeScript video specific
    { surface: 'JSDoc', pronunciation: 'ジェイエスドック' },
    { surface: 'Flow', pronunciation: 'フロー' },
    { surface: 'TS', pronunciation: 'ティーエス' },
    { surface: 'Anders', pronunciation: 'アンダース' },
    { surface: 'Hejlsberg', pronunciation: 'ハイルズバーグ' },
    { surface: 'Svelte', pronunciation: 'スベルト' },
    { surface: 'any', pronunciation: 'エニー' },
    { surface: 'JSDoc', pronunciation: 'ジェイエスドック' },
    { surface: 'Copilot', pronunciation: 'コパイロット' },
    { surface: 'Ajax', pronunciation: 'エイジャックス' },
    { surface: 'Gmail', pronunciation: 'ジーメール' },
    { surface: 'Hello', pronunciation: 'ハロー' },
    { surface: 'World', pronunciation: 'ワールド' },
    { surface: 'Delphi', pronunciation: 'デルファイ' },
    { surface: 'Turbo', pronunciation: 'ターボ' },
    { surface: 'DHH', pronunciation: 'ディーエイチエイチ' },
    { surface: 'Rich', pronunciation: 'リッチ' },
    { surface: 'Harris', pronunciation: 'ハリス' },
    { surface: 'IntelliSense', pronunciation: 'インテリセンス' },
    { surface: 'SvelteKit', pronunciation: 'スベルトキット' },
    // Mac obsession video specific
    { surface: 'NeXTSTEP', pronunciation: 'ネクストステップ' },
    { surface: 'NeXT', pronunciation: 'ネクスト' },
    { surface: 'POSIX', pronunciation: 'ポジックス' },
    { surface: 'IEEE', pronunciation: 'アイトリプルイー' },
    { surface: 'Unix', pronunciation: 'ユニックス' },
    { surface: 'Mach', pronunciation: 'マーク' },
    { surface: 'BSD', pronunciation: 'ビーエスディー' },
    { surface: 'CERN', pronunciation: 'セルン' },
    { surface: 'Copland', pronunciation: 'コープランド' },
    { surface: 'Taligent', pronunciation: 'タリジェント' },
    { surface: 'Xcode', pronunciation: 'エックスコード' },
    { surface: 'macOS', pronunciation: 'マックオーエス' },
    { surface: 'iOS', pronunciation: 'アイオーエス' },
    { surface: 'iPadOS', pronunciation: 'アイパッドオーエス' },
    { surface: 'iPhone', pronunciation: 'アイフォーン' },
    { surface: 'MacBook', pronunciation: 'マックブック' },
    { surface: 'Mac', pronunciation: 'マック' },
    { surface: 'Homebrew', pronunciation: 'ホームブルー' },
    { surface: 'brew', pronunciation: 'ブリュー' },
    { surface: 'install', pronunciation: 'インストール' },
    { surface: 'update', pronunciation: 'アップデート' },
    { surface: 'node', pronunciation: 'ノード' },
    { surface: 'python', pronunciation: 'パイソン' },
    { surface: 'postgresql', pronunciation: 'ポストグレスキューエル' },
    { surface: 'WSL2', pronunciation: 'ダブリューエスエルツー' },
    { surface: 'WSL', pronunciation: 'ダブリューエスエル' },
    { surface: 'DirectX', pronunciation: 'ダイレクトエックス' },
    { surface: 'Rosetta', pronunciation: 'ロゼッタ' },
    { surface: 'ARM', pronunciation: 'アーム' },
    { surface: 'x86', pronunciation: 'エックスはちろく' },
    { surface: 'Silicon', pronunciation: 'シリコン' },
    { surface: 'Valley', pronunciation: 'バレー' },
    { surface: 'Qiita', pronunciation: 'キータ' },
    { surface: 'Zenn', pronunciation: 'ゼン' },
    { surface: 'CEO', pronunciation: 'シーイーオー' },
    { surface: 'IT', pronunciation: 'アイティー' },
    { surface: 'UI', pronunciation: 'ユーアイ' },
    { surface: 'EXE', pronunciation: 'エグゼ' },
    { surface: 'GCP', pronunciation: 'ジーシーピー' },
    { surface: 'Active', pronunciation: 'アクティブ' },
    { surface: 'Directory', pronunciation: 'ディレクトリ' },
    { surface: 'Subsystem', pronunciation: 'サブシステム' },
    { surface: 'for', pronunciation: 'フォー' },
    { surface: 'Desktop', pronunciation: 'デスクトップ' },
    { surface: 'Visual', pronunciation: 'ビジュアル' },
    { surface: 'Studio', pronunciation: 'スタジオ' },
    { surface: 'Store', pronunciation: 'ストア' },
    { surface: 'App', pronunciation: 'アップ' },
    { surface: 'Stack', pronunciation: 'スタック' },
    { surface: 'Developer', pronunciation: 'デベロッパー' },
    { surface: 'Survey', pronunciation: 'サーベイ' },
    { surface: 'Classic', pronunciation: 'クラシック' },
    { surface: 'Air', pronunciation: 'エアー' },
    { surface: 'Pro', pronunciation: 'プロ' },
    { surface: 'VS', pronunciation: 'ブイエス' },
    { surface: 'Code', pronunciation: 'コード' },
    { surface: 'ls', pronunciation: 'エルエス' },
    { surface: 'grep', pronunciation: 'グレップ' },
    { surface: 'sed', pronunciation: 'セド' },
    { surface: 'awk', pronunciation: 'オーク' },
    { surface: 'curl', pronunciation: 'カール' },
    { surface: 'cp', pronunciation: 'シーピー' },
    { surface: 'dir', pronunciation: 'ディレ' },
    { surface: 'copy', pronunciation: 'コピー' },
    { surface: 'ssh', pronunciation: 'エスエスエイチ' },
    { surface: 'findstr', pronunciation: 'ファインドストリング' },
    { surface: '.NET', pronunciation: 'ドットネット' },
    { surface: 'NET', pronunciation: 'ネット' },
    { surface: 'Windows', pronunciation: 'ウィンドウズ' },
    { surface: 'M系', pronunciation: 'エムケイ' },
    { surface: 'Obj-C', pronunciation: 'オブジェクティブシー' },
    { surface: 'SwiftUI', pronunciation: 'スウィフトユーアイ' },
    // rust_vs_cpp specific
    { surface: 'UnrealEngine', pronunciation: 'アンリアルエンジン' },
    { surface: 'Cloudflare', pronunciation: 'クラウドフレア' },
    { surface: 'Firecracker', pronunciation: 'ファイアクラッカー' },
    { surface: 'Pingora', pronunciation: 'ピンゴーラ' },
    { surface: 'Discord', pronunciation: 'ディスコード' },
    { surface: 'DARPA', pronunciation: 'ダルパ' },
    { surface: 'Android', pronunciation: 'アンドロイド' },
    { surface: 'CVE', pronunciation: 'シーブイイー' },
    { surface: 'Nginx', pronunciation: 'エンジンエックス' },
    { surface: 'FFI', pronunciation: 'エフエフアイ' },
    { surface: 'ONCD', pronunciation: 'オーエヌシーディー' },
    { surface: 'Dropbox', pronunciation: 'ドロップボックス' },
    { surface: 'WebAssembly', pronunciation: 'ウェブアセンブリ' },
];

function httpGet(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

function httpPost(url) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const req = http.request({ hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: 'POST' }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: data }));
        });
        req.on('error', reject);
        req.end();
    });
}

async function main() {
    // Read scene_map.json and collect all text
    const sceneMap = JSON.parse(fs.readFileSync(sceneMapPath, 'utf8'));
    const allTexts = [];
    sceneMap.scenes.forEach(s => s.lines.forEach(l => allTexts.push(l.text)));
    const fullText = allTexts.join(' ');

    // 1. Get existing dictionary
    const dict = await httpGet('http://localhost:50021/user_dict');
    const existing = new Map();
    for (const [uuid, entry] of Object.entries(dict)) {
        existing.set(entry.surface, { uuid, pronunciation: entry.pronunciation });
    }
    console.log(`\n📖 Existing VOICEVOX dictionary: ${existing.size} entries`);

    // 2. Filter WELL_KNOWN_TERMS to only those appearing in text
    const termsToRegister = WELL_KNOWN_TERMS.filter(t => fullText.includes(t.surface));
    console.log(`🔍 Terms found in scene_map.json: ${termsToRegister.length}`);

    // 3. Register
    let added = 0, skipped = 0;
    for (const term of termsToRegister) {
        const ex = existing.get(term.surface);
        if (ex && ex.pronunciation === term.pronunciation) {
            skipped++;
            continue;
        }
        const url = `http://localhost:50021/user_dict_word?surface=${encodeURIComponent(term.surface)}&pronunciation=${encodeURIComponent(term.pronunciation)}&accent_type=1`;
        const res = await httpPost(url);
        if (res.status === 200) {
            console.log(`  ✅ [registered] ${term.surface} → ${term.pronunciation}`);
            added++;
        } else {
            console.log(`  ❌ [error] ${term.surface}: ${res.status}`);
        }
    }

    // 4. Scan for unregistered English tokens (warning)
    // 大文字始まり・小文字始まり・全大文字を検出
    const englishPattern = /[a-zA-Z][a-zA-Z0-9.#+]{1,}/g;
    const foundTokens = new Set();
    let match;
    while ((match = englishPattern.exec(fullText)) !== null) {
        foundTokens.add(match[0]);
    }
    const registered = new Set(termsToRegister.map(t => t.surface));
    // Also check existing dict
    for (const [surface] of existing) registered.add(surface);
    
    const unregistered = [...foundTokens].filter(t => !registered.has(t) && t.length > 1);
    if (unregistered.length > 0) {
        console.log(`\n⚠️ Potentially unregistered English terms detected:`);
        unregistered.forEach(t => console.log(`  ⚠️ "${t}" — add to WELL_KNOWN_TERMS if mispronounced`));
    }

    console.log(`\n✅ Done! Added: ${added}, Skipped (already exists): ${skipped}`);
    if (unregistered.length > 0) {
        console.log(`⚠️ ${unregistered.length} potentially unregistered terms found (check above)`);
    }
}

main().catch(console.error);
