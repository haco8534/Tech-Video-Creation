---
description: テーマ入力→台本→音声→Remotion図解動画→完成までの生成ワークフロー
---

# 動画自動生成 ワークフロー

ユーザーからのテーマ入力で、YouTube解説動画のRemotionプロジェクトを生成する。レンダリング（mp4出力）はユーザーが手動で行う。

```
テーマ入力 → Phase A: 台本 → Phase B: 音声 → Phase C: Remotion図解 → Phase D: 整理
```

## 変数定義

| 変数 | 値 |
|------|-----|
| `{テーマ名}` | ユーザー入力（日本語） |
| `{project_id}` | テーマの英語スネークケースID |
| `{ROOT}` | `d:\myfolder\動画生成\技術解説` |
| `{CHANNEL_DIR}` | `{ROOT}\channels\tech_explainer` |
| `{PROJECT_DIR}` | `{CHANNEL_DIR}\projects\{project_id}` |
| `{SCRIPT_DIR}` | `{PROJECT_DIR}\script` |
| `{SLIDES_DIR}` | `{PROJECT_DIR}\slides` |
| `{AUDIO_DIR}` | `{PROJECT_DIR}\audio` |
| `{REMOTION_DIR}` | `{PROJECT_DIR}\remotion` |
| `{DELIVERABLES_DIR}` | `{PROJECT_DIR}\deliverables` |
| `{ENGINE_DIR}` | `{ROOT}\engine` |

---

# Phase A: 台本作成

**作業ディレクトリ**: `{PROJECT_DIR}`

1. `{PROJECT_DIR}` とサブフォルダ (`script`, `slides`, `audio`, `remotion/scenes`, `deliverables`) を作成
2. `meta.json` 作成: `{"id": "{project_id}", "title": "{テーマ名}", "status": "scripting"}`
3. `channels/tech_explainer/workflows/script_creation.md` を参照して実行。出力先 `{SCRIPT_DIR}/`

### キャラクター設定（厳守）

| 項目 | ずんだもん | めたん |
|------|-----------|--------|
| 一人称 | **ぼく** | **わたくし** |
| 相手の呼び方 | めたん | ずんだもん |
| 語尾 | 〜なのだ、〜のだ | 〜ですわ、〜ですの |
| 役割 | 解説役・丁寧に教える | 聞き手・素朴な疑問 |

禁止: ずんだもんが「私／わたし／俺」、めたんが「私／僕」、敬称付き呼称。

### トーン

| 原則 | 内容 |
|------|------|
| 対等な会話 | めたんは「上から教える先生」ではなく「一緒に考える詳しい友人」 |
| 一般化へのヘッジ | 「大きく分けると」「教科書的には」で唯一の正解でないことを示す |
| 反例・例外 | 二項対立を語る際はグラデーションがあることに触れる |
| 数値の出典意識 | 定義や条件で変動しうることに触れる |
| 万能解の否定 | 特定技術を持ち上げすぎない |

### セリフルール

- 総文字数 5,000〜6,000文字（「：」以降の合計）。下回る台本は不可
- 1セリフ最大74文字（字幕2行が上限）
- SCENEマーカー形式: `<!-- SCENE: 短いタイトル -->`（15文字以内、映像指示文NG）
- 最初のSCENEはオープニング用

### 完了条件

- `script.md`, `research.md` 存在、SCENEマーカーあり
- 全セリフ74文字以内、全タイトル15文字以内
- 総文字数 5,000〜6,000

---

# Phase B: 音声生成

**前提**: VOICEVOX起動中 (`http://localhost:50021`)、ffmpeg PATH通り

### B1. scene_map.json 生成

// turbo
```powershell
node -e "const fs=require('fs');const src=fs.readFileSync('{SCRIPT_DIR}/script.md','utf8');const scenes=[];let cur=null;src.split('\n').forEach(l=>{if(/^\s*```/.test(l)&&l.includes('SCENE:'))return;const m=l.match(/<!-- SCENE: (.+?) -->/);if(m){if(cur)scenes.push(cur);cur={title:m[1].trim(),lines:[]};return;}const d=l.match(/^(ずんだもん|めたん)：(.+)$/);if(d&&cur)cur.lines.push({speaker:d[1],text:d[2]});});if(cur)scenes.push(cur);scenes.forEach((s,i)=>{s.id=i;if(s.lines.length===0)s.hold_sec=3;});const map={voicevox_url:'http://localhost:50021',speakers:{'ずんだもん':3,'めたん':2},speed_scale:1.14,inter_line_silence:0.3,scene_end_padding:0.5,scenes};fs.writeFileSync('{SLIDES_DIR}/scene_map.json',JSON.stringify(map,null,2));console.log(scenes.length+' scenes, '+scenes.reduce((a,s)=>a+s.lines.length,0)+' lines');"
```

### B2. タイトル検証

// turbo
```powershell
node -e "const fs=require('fs');const p='{SLIDES_DIR}/scene_map.json';const d=JSON.parse(fs.readFileSync(p,'utf8'));const bad=['タイトルカード','数値インパクト','フロー図','テキスト強調','比較対照','段階的リスト','引用カード','タイムライン','まとめ3ポイント','エンディング','SVG図解','コードビジュアル','まとめカード','アナロジー','思考実験','ビフォーアフター'];let errors=0,truncated=0;d.scenes.forEach(s=>{if(bad.some(b=>s.title.startsWith(b))){console.log('❌ Scene '+s.id+': \"'+s.title+'\" パターン名混入');errors++;}if(s.title.length>15){console.log('⚠️ Scene '+s.id+': '+s.title.length+'文字→15文字に切り詰め');s.title=s.title.substring(0,15);truncated++;}else{console.log('✅ Scene '+s.id+': \"'+s.title+'\"');}});if(truncated)fs.writeFileSync(p,JSON.stringify(d,null,2));if(errors)process.exit(1);console.log('\n✅ OK');"
```

### B3. VOICEVOX辞書登録

// turbo
```powershell
node {ROOT}/tools/presentation/register_dict.js channels/tech_explainer/projects/{project_id}
```

### B4. 英単語DICT監査（読み間違いゼロ保証）

`{SLIDES_DIR}/scene_map.json` の全セリフから `[A-Za-z][A-Za-z0-9.#+\-]*` にマッチするトークンを抽出し、`add_readings.js` のDICTに全て登録されているか確認する。

- 複合語（例: "Crafting Interpreters"）は先に、単独語は後に登録（部分一致による誤マッチ防止）
- 未登録があれば正しいカタカナ読みをDICTに追加してから次へ

> 🚨 未登録の英単語が1つでもある状態で次に進まない。VOICEVOXはローマ字読みで発音してしまう。

### B5. 読み付与

// turbo
```powershell
node {ROOT}/tools/presentation/add_readings.js channels/tech_explainer/projects/{project_id}/slides
```

### B6. 音声生成

// turbo
```powershell
node {ROOT}/tools/presentation/generate_audio.js channels/tech_explainer/projects/{project_id}/slides
```

### B7. 音声コピーと scene_durations 同期

// turbo
```powershell
Copy-Item "{SLIDES_DIR}/audio/scene_*.wav" "{AUDIO_DIR}/"
Copy-Item "{PROJECT_DIR}/tools/scene_durations.json" "{SLIDES_DIR}/scene_durations.json"
```

### 完了条件

- `{SLIDES_DIR}/scene_map.json`, `scene_durations.json` 存在
- `{AUDIO_DIR}/scene_XX_YY.wav` 存在

---

# Phase C: Remotion 図解

**作業ディレクトリ**: `{ENGINE_DIR}`
**前提**: `public/characters/`、`public/bgm/Mineral.mp3`、ffmpeg

### C1. 音声・字幕データ生成

// turbo
```powershell
New-Item -ItemType Directory -Force -Path "{ENGINE_DIR}/public/audio/{project_id}"
Copy-Item "{AUDIO_DIR}/scene_*.wav" "{ENGINE_DIR}/public/audio/{project_id}/"
node scripts/generate-subtitle-data.js "{SLIDES_DIR}" {project_id} "{REMOTION_DIR}"
node scripts/generate-lip-sync.js {project_id} "{REMOTION_DIR}"
```

### C2. VideoWithSlides.tsx（薄いラッパー）

`{REMOTION_DIR}/VideoWithSlides.tsx` に以下をそのまま作成:

```tsx
import React from 'react';
import { FigureLayout } from '@components/layouts/FigureLayout';
import { SUBTITLE_DATA, TOTAL_FRAMES } from './subtitleData';
import { isMouthOpen } from './lipSyncData';
import { SCENE_COMPONENTS, SCENE_TITLES } from './scenes/SlideScenes';

export const VideoWithSlides: React.FC = () => (
    <FigureLayout
        subtitleData={SUBTITLE_DATA}
        totalFrames={TOTAL_FRAMES}
        sceneComponents={SCENE_COMPONENTS}
        sceneTitles={SCENE_TITLES}
        isMouthOpen={isMouthOpen}
    />
);

export { TOTAL_FRAMES };
```

`FigureLayout` が背景・ヘッダー・キャラ立ち絵（リップシンク）・字幕帯・BGMフェード・音声シーケンスをすべて提供する。プロジェクト側で上書き不要。

### C3. SlideScenes.tsx（図解設計 — メイン作業）

`{REMOTION_DIR}/scenes/SlideScenes.tsx` に、台本の各シーンを React + SVG で図解する。これが創作の本丸。

**雛形**:

```tsx
import React from 'react';
import { interpolate } from 'remotion';
import { SceneProps } from '@components/layouts/FigureLayout';
import { BASE_COLORS } from '@components/theme';

export type { SceneProps };

const PALETTE = {
    ...BASE_COLORS,
    primary: '#XXXXXX',        // テーマのメインカラー
    primaryDeep: '#XXXXXX',
    primaryGlow: 'rgba(x,x,x,0.28)',
    accent: '#XXXXXX',
    warm: '#XXXXXX',
    amber: '#XXXXXX',
};

const fade = (f: number, from: number, to = from + 18) =>
    interpolate(f, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const riseY = (f: number, from: number, to = from + 18, dist = 16) =>
    interpolate(f, [from, to], [dist, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Stage: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div style={{
        position: 'absolute', inset: 0,
        paddingTop: 150, paddingBottom: 260,
        paddingLeft: 80, paddingRight: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</div>
);

const Scene0: React.FC<SceneProps> = ({ localFrame: f }) => (
    <Stage>
        {/* 図解の中身 */}
    </Stage>
);
// ... 各シーン

export const SCENE_COMPONENTS: React.FC<SceneProps>[] = [Scene0, /* ... */];
export const SCENE_TITLES: string[] = ['オープニング', /* ... */];
```

**設計原則**:

- 各シーンで台本の核を1つの図に落とす。情報は厳選
- 図の配置は `Stage` 内（上 150px / 下 260px / 左右 80px がキャラ・ヘッダー・字幕で埋まる安全外余白）
- アニメは `localFrame` ベース。fade + slide/rise のみ（派手な変形は AI 感）
- **粒度は要素数で変える**:
  - 少要素（3〜5のカード並列など）: 15〜20f 間隔でゆっくり fade-in（fade 自体は 14〜18f）
  - 多要素（SVG構成図・フロー図・ブロック図など10+パーツ）: **6〜10f 間隔でポポポポンと連続 fade-in**。軸 → ノード → ラベル → 矢印 → 注釈 の順に**組み立て感**を出す。fade 自体も 8〜12f に短縮
  - 1シーン全体のアニメ占有率は `sceneLength` の 50〜70% が目安。残りは読ませる静止時間
- カラー数は抑える。PALETTE から逸脱しない
- **AI 感回避**: 同形カードの均等並列だけで1シーンを構成しない／対称対称した配置で埋めない（余白・重心の偏りを許容）／汎用絵文字・濃グラデ多用禁止

**図解パターンの引き出し**:

| パターン | 向いている題材 |
|---------|---------------|
| ドーナツ | シェア・割合・進捗 |
| 対面バーチャート | A vs B の比較 |
| タイムライン | 時系列イベント |
| スタック／レイヤー | 階層・エコシステム・依存関係 |
| 綱引き | 対立する2陣営 |
| グリッド並列 | 1対N の量的対比（例: CPU 1 vs GPU 数千） |
| 行列／格子 | 演算・セル単位の並列性 |
| カード並列 | 3〜4項目の並列紹介 |
| 数値強調 | 巨大な1つの数字 |
| 指数カーブ | 線形 vs 非線形のコスト・成長 |
| **ブランドロゴ配置** | 企業・サービス・技術の登場／エコシステム関係図（thesvg 参照） |

#### ブランドアイコン（thesvg.org）

企業名・サービス名・クラウドサービスが登場するシーンでは、テキストで済ませず公式ロゴSVGを図の一部として置く。`thesvg` は 4,000+ ブランド + AWS/Azure/GCP の architecture icons を含むオープンライブラリで、無償・無帰属で使える。

**ダウンロード** (シーン設計中に必要なブランド slug を列挙 → 一括取得):

// turbo
```powershell
$slugs = @('youtube','google','netflix','microsoft','amazon','apple','ffmpeg','chrome','firefox','zoom')
$dir = "{ENGINE_DIR}/public/brand-icons"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
foreach ($s in $slugs) {
  $url = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/$s/default.svg"
  try { Invoke-WebRequest -Uri $url -OutFile "$dir/$s.svg" -ErrorAction Stop; Write-Host "OK  $s" }
  catch { Write-Host "NG  $s (slug要確認 — thesvg.org で検索)" }
}
```

**参照**:
```tsx
import { Img, staticFile } from 'remotion';
<Img src={staticFile('brand-icons/youtube.svg')} style={{ width: 120, height: 'auto' }} />
```

**variants**: `default`（カラー公式）／`mono`（単色）。色トーンを揃えたい場合は `mono` を使い CSS の `filter` で色付け。URL は `.../icons/{slug}/mono.svg`。

**カバー範囲**: 大手外資サービス・IT企業・主要言語/ライブラリ・クラウドサービス。ブランドでない技術規格（H.264, TCP/IP 等）は SVG 手描きで対応。slug が不明なら `https://www.thesvg.org/` で検索。

### C4. Root.tsx 登録

`{ENGINE_DIR}/src/Root.tsx` に Composition を追加:

```tsx
import { VideoWithSlides as XxxVideo, TOTAL_FRAMES as XXX_TOTAL_FRAMES }
    from "@channels/tech_explainer/projects/{project_id}/remotion/VideoWithSlides";

<Composition
    id="{project_id}-slides"     // project_id を kebab-case に変換
    component={XxxVideo}
    durationInFrames={XXX_TOTAL_FRAMES}
    fps={30} width={1920} height={1080}
/>
```

// turbo
```powershell
cd {ENGINE_DIR}; npx tsc --noEmit
```

### 完了条件

- `{REMOTION_DIR}/` に `subtitleData.ts`, `lipSyncData.ts`, `VideoWithSlides.tsx`, `scenes/SlideScenes.tsx`
- `{ENGINE_DIR}/public/audio/{project_id}/*.wav`
- Root.tsx に Composition 追加、`npx tsc --noEmit` 正常終了

---

# Phase D: 成果物整理

// turbo
1. 台本コピー:
```powershell
Copy-Item "{SCRIPT_DIR}/script.md" "{DELIVERABLES_DIR}/台本.md"
```

2. 概要欄生成（タイムスタンプを実時間から計算）:

// turbo 2a. 全シーンの開始時刻を出力:
```powershell
node -e "const fs=require('fs');const d=JSON.parse(fs.readFileSync('{SLIDES_DIR}/scene_durations.json','utf8'));let t=0;d.forEach(s=>{const m=Math.floor(t/60);const sec=Math.floor(t%60);console.log(String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')+' [Scene '+s.id+'] '+s.title);t+=s.duration;});console.log('\n総尺: '+Math.floor(t/60)+'分'+Math.floor(t%60)+'秒');"
```

2b. `{SCRIPT_DIR}/description.md` の `{{TIMESTAMPS}}` を実タイムスタンプで置換して `{DELIVERABLES_DIR}/概要欄.md` に出力。

**タイムスタンプ選定**:
- script.md の **Block境界** (`## 【Block N：...】`) に対応するシーンのみ
- 1動画あたり 6〜10個
- 先頭は `00:00 オープニング`
- ラベルは視聴者が内容を想像できる短い表現に

// turbo
3. meta.json 更新:
```powershell
node -e "const fs=require('fs');const p='{PROJECT_DIR}/meta.json';const m=JSON.parse(fs.readFileSync(p,'utf8'));m.status='rendering';fs.writeFileSync(p,JSON.stringify(m,null,2),'utf8');"
```

> レンダリング: `cd {ENGINE_DIR} && npx remotion render {project_id_kebab}-slides output/{project_id}.mp4 --codec h264`

---

## トラブルシューティング

| 問題 | 対処 |
|------|------|
| シーンと読み上げがズレる | SCENEマーカー数と scene_map.json のシーン数一致を確認 |
| TSXコンパイルエラー | `tsc --noEmit` でエラー位置特定。SVG属性のcamelCase、JSX構文を確認 |
| 英単語の読み間違い | `register_dict.js` の `WELL_KNOWN_TERMS` と `add_readings.js` の DICT に追加→音声再生成 |
| 図解がキャラ・ヘッダー・字幕に被る | `Stage` 内の padding (上 150 / 下 260 / 左右 80) を超えていないか |
| 1シーンに要素が多すぎる | カード/項目は最大5。超えそうなら分割・削減 |
