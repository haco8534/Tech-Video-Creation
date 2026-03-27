/**
 * add_readings.js
 * scene_map.json の英語技術用語を含むセリフに reading フィールドを追加する
 * Usage: node tools/add_readings.js <project_dir>
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) { console.error('Usage: node add_readings.js <project_dir>'); process.exit(1); }

const PRES_ROOT = path.resolve(__dirname, '..');
const PROJECT_DIR = path.resolve(PRES_ROOT, args[0]);
const MAP_FILE = path.join(PROJECT_DIR, 'scene_map.json');

// バックアップから復元（もしあれば）
const BAK_FILE = MAP_FILE + '.bak';
if (fs.existsSync(BAK_FILE)) {
  fs.copyFileSync(BAK_FILE, MAP_FILE);
  console.log('Restored from backup');
}

const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf-8'));

// プレースホルダ方式: 長いものから先に置換してプレースホルダに、最後に戻す
const DICT = [
  // 最長一致を優先（部分文字列の衝突を防ぐ）
  ['Stack Overflow Developer Survey', 'スタックオーバーフロー デベロッパーサーベイ'],
  ['Windows Subsystem for Linux', 'ウィンドウズ サブシステム フォー リナックス'],
  ['Classic Mac OS', 'クラシック マック オーエス'],
  ['Apple Silicon', 'アップルシリコン'],
  ['Active Directory', 'アクティブディレクトリ'],
  ['Microsoft365', 'マイクロソフトさんろくご'],
  ['Docker Desktop', 'ドッカーデスクトップ'],
  ['Visual Studio', 'ビジュアルスタジオ'],
  ['Silicon Valley', 'シリコンバレー'],
  ['Mac OS X', 'マック オーエス テン'],
  ['MacBook Pro', 'マックブックプロ'],
  ['MacBook Air', 'マックブックエアー'],
  ['brew install postgresql', 'ブリュー インストール ポストグレスキューエル'],
  ['brew install python', 'ブリュー インストール パイソン'],
  ['brew install node', 'ブリュー インストール ノード'],
  ['brew update', 'ブリュー アップデート'],
  ['iOS/macOS', 'アイオーエス、マックオーエス'],
  ['App Store', 'アップストア'],
  ['Rosetta 2', 'ロゼッタ ツー'],
  ['VS Code', 'ブイエスコード'],
  ['Node.js', 'ノードジェイエス'],
  ['NeXTSTEP', 'ネクストステップ'],
  ['Objective-C', 'オブジェクティブ シー'],
  ['Homebrew', 'ホームブルー'],
  ['DirectX', 'ダイレクトエックス'],
  ['MacBook', 'マックブック'],
  ['iPhone', 'アイフォーン'],
  ['iPadOS', 'アイパッドオーエス'],
  ['macOS', 'マックオーエス'],
  ['Copland', 'コープランド'],
  ['Taligent', 'タリジェント'],
  ['Python', 'パイソン'],
  ['WSL2', 'ダブリューエスエルツー'],
  ['POSIX', 'ポジックス'],
  ['Xcode', 'エックスコード'],
  ['Apple', 'アップル'],
  ['NeXT', 'ネクスト'],
  ['Mach', 'マーク'],        // Macより先！
  ['IEEE', 'アイトリプルイー'],
  ['CERN', 'セルン'],
  ['Microsoft', 'マイクロソフト'],
  ['Unix', 'ユニックス'],
  ['.NET', 'ドットネット'],
  ['Qiita', 'キータ'],
  ['Zenn', 'ゼン'],
  ['Linux', 'リナックス'],
  ['Windows', 'ウィンドウズ'],
  ['Mac', 'マック'],          // Machの後で
  ['iOS', 'アイオーエス'],
  ['Web', 'ウェブ'],
  ['CPU', 'シーピーユー'],
  ['GUI', 'ジーユーアイ'],
  ['CEO', 'シーイーオー'],
  ['EXE', 'エグゼ'],
  ['IoT', 'アイオーティー'],
  ['ARM', 'アーム'],
  ['BSD', 'ビーエスディー'],
  ['x86', 'エックスはちろく'],
  ['C#', 'シーシャープ'],
  ['UI', 'ユーアイ'],
  ['MIT', 'エムアイティー'],
  ['IT', 'アイティー'],
  ['M系', 'エムけい'],
  ['AWS', 'エーダブリューエス'],
  ['GCP', 'ジーシーピー'],
  ['OS', 'オーエス'],
  // python_dominance
  ['Global Interpreter Lock', 'グローバル インタープリター ロック'],
  ['Stack Overflow', 'スタックオーバーフロー'],
  ['scikit-learn', 'サイキットラーン'],
  ['TensorFlow', 'テンソルフロー'],
  ['Interpreter', 'インタープリター'],
  ['Fortran', 'フォートラン'],
  ['FORTRAN', 'フォートラン'],
  ['NumPy', 'ナムパイ'],
  ['numpy', 'ナムパイ'],
  ['PyTorch', 'パイトーチ'],
  ['pandas', 'パンダス'],
  ['COBOL', 'コボル'],
  ['TIOBE', 'ティオベ'],
  ['PyPI', 'パイピーアイ'],
  ['Rust', 'ラスト'],
  ['Mojo', 'モジョ'],
  ['Julia', 'ジュリア'],
  ['Java', 'ジャバ'],
  ['C++', 'シープラスプラス'],
  ['HPC', 'エイチピーシー'],
  ['ATM', 'エーティーエム'],
  ['PEP', 'ペップ'],
  ['GIL', 'ジル'],
  ['Google', 'グーグル'],  // Goより先！
  ['UC', 'ユーシー'],
  ['CS', 'シーエス'],
  ['Go', 'ゴー'],
  ['AI', 'エーアイ'],
  ['No', 'ナンバー'],
  ['import', 'インポート'],
  ['for', 'フォー'],
  ['PC', 'ピーシー'],
  ['SNS', 'エスエヌエス'],
  // rust_vs_cpp specific
  ['UnrealEngine', 'アンリアルエンジン'],
  ['Unreal Engine', 'アンリアルエンジン'],
  ['Cloudflare', 'クラウドフレア'],
  ['Firecracker', 'ファイアクラッカー'],
  ['Pingora', 'ピンゴーラ'],
  ['Discord', 'ディスコード'],
  ['DARPA', 'ダルパ'],
  ['Android', 'アンドロイド'],
  ['CVE', 'シーブイイー'],
  ['Nginx', 'エンジンエックス'],
  ['nginx', 'エンジンエックス'],
  ['FFI', 'エフエフアイ'],
  ['ONCD', 'オーエヌシーディー'],
  ['Dropbox', 'ドロップボックス'],
  ['WebAssembly', 'ウェブアセンブリ'],
  ['Stack Overflow', 'スタックオーバーフロー'],
  ['SIMD', 'シムド'],
  ['VM', 'ブイエム'],
];

// コマンド系は文脈依存なので正規表現で処理
const CMD_REGEX = [
  [/\bls\b/g, 'エルエス'],
  [/\bgrep\b/g, 'グレップ'],
  [/\bsed\b/g, 'セド'],
  [/\bawk\b/g, 'オーク'],
  [/\bcurl\b/g, 'カール'],
  [/\bcp\b/g, 'シーピー'],
  [/\bdir\b/g, 'ディレ'],
  [/\bcopy\b/g, 'コピー'],
  [/\bssh\b/g, 'エスエスエイチ'],
  [/\bfindstr\b/g, 'ファインドストリング'],
  [/\bC言語/g, 'シー言語'],
  [/\bCが/g, 'シーが'],
  [/\bCで/g, 'シーで'],
  [/\bCの/g, 'シーの'],
  [/\bCと/g, 'シーと'],
  [/\bCから/g, 'シーから'],
  [/\bCや/g, 'シーや'],
  [/\bC並み/g, 'シーなみ'],
  [/\bCって/g, 'シーって'],
  [/\bC？/g, 'シー？'],
  [/\bC、/g, 'シー、'],
  [/\bMIT/g, 'エムアイティー'],
];

function applyReading(text) {
  let r = text;

  // まずプレースホルダ置換（長い順に）
  const placeholders = [];
  for (let i = 0; i < DICT.length; i++) {
    const [search, replace] = DICT[i];
    const ph = `\x00${i}\x00`;
    if (r.includes(search)) {
      r = r.split(search).join(ph);
      placeholders.push([ph, replace]);
    }
  }
  // プレースホルダをカタカナに戻す
  for (const [ph, replace] of placeholders) {
    r = r.split(ph).join(replace);
  }

  // コマンド系（正規表現）
  for (const [re, replace] of CMD_REGEX) {
    r = r.replace(re, replace);
  }

  // 数値パーセント
  r = r.replace(/(\d+)%→(\d+)%/g, '$1パーセントから$2パーセント');
  r = r.replace(/(\d+)%/g, '$1パーセント');

  // → を「、」に
  r = r.replace(/→/g, '、');

  return r;
}

let modified = 0;
for (const scene of map.scenes) {
  for (const line of scene.lines) {
    // 既存のreadingを削除
    delete line.reading;

    const text = line.text;
    if (/[a-zA-Z]/.test(text) || /[%→]/.test(text)) {
      const reading = applyReading(text);
      if (reading !== text) {
        line.reading = reading;
        modified++;
      }
    }
  }
}

// バックアップ保存
if (!fs.existsSync(BAK_FILE)) {
  fs.copyFileSync(MAP_FILE, BAK_FILE);
}

fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2), 'utf-8');
console.log(`Done! ${modified} lines got "reading" field added.`);
