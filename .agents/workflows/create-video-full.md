---
description: テーマ入力→台本→スライド+音声→Remotion→完成までの全自動動画生成ワークフロー
---

# 動画自動生成 マスターワークフロー

## 概要

ユーザーからの**テーマ入力のみ**で、YouTube解説動画のRemotionプロジェクトを自動生成する。レンダリング（mp4出力）はユーザーが手動で行う。

```
テーマ入力 → Phase A: 台本 → Phase B: スライド+音声 → Phase C: Remotion → Phase D: 整理 → ✅
```

---

## 変数定義

| 変数 | 値 |
|------|-----|
| `{テーマ名}` | ユーザー入力（日本語） |
| `{project_id}` | テーマの英語スネークケースID |
| `{ROOT}` | `d:\myfolder\動画生成\技術解説` |
| `{PROJECT_DIR}` | `{ROOT}\projects\{project_id}` |
| `{SCRIPT_DIR}` | `{PROJECT_DIR}\script` |
| `{SLIDES_DIR}` | `{PROJECT_DIR}\slides` |
| `{AUDIO_DIR}` | `{PROJECT_DIR}\audio` |
| `{REMOTION_DIR}` | `{PROJECT_DIR}\remotion` |
| `{DELIVERABLES_DIR}` | `{PROJECT_DIR}\deliverables` |
| `{ENGINE_DIR}` | `{ROOT}\engine` |

---

# Phase A: 台本作成

**作業ディレクトリ**: `{PROJECT_DIR}`

### 実行手順
1. `{PROJECT_DIR}` とサブフォルダ(`script`, `slides`, `audio`, `remotion/scenes`, `deliverables`)を作成
2. `meta.json` を作成: `{"id": "{project_id}", "title": "{テーマ名}", "status": "scripting"}`
3. テーマ設定＆核心メッセージ確定
4. マルチ視点リサーチ → `{SCRIPT_DIR}/research.md`
5. 構成設計 → セクション別台本執筆
6. 推敲・最終チェック → `{SCRIPT_DIR}/script.md`

### キャラクター設定（全フェーズ共通・厳守）

| 項目 | ずんだもん | めたん |
|------|-----------|--------|
| **一人称** | **ぼく**（「ずんだもんは」等と自称しないこと） | **わたくし** |
| **相手の呼び方** | **めたん** | **ずんだもん** |
| **語尾** | 〜なのだ、〜のだ | 〜ですわ、〜ですの |
| **役割** | 聞き手・素朴な疑問 | 解説役・丁寧に教える |

> 絶対禁止: ずんだもんが「私」「わたし」「俺」を使う / めたんが「私」「僕」を使う / 敬称付き呼称（「ずんだもんさん」等）

### セリフルール

> セリフ総文字数: 5,000〜6,000文字（全セリフの「：」以降の文字数合計。これを下回る台本は内容が薄すぎるため不可）

| ルール | 詳細 |
|--------|------|
| **総文字数 5,000〜6,000文字** | 全セリフの「：」右側を合算した値。音声生成後の尺は約15〜18分になる |
| **最大74文字/セリフ** | 字幕フッター（100px高、34px font）で2行が上限。超える場合は分割 |
| **SCENEマーカー形式** | `<!-- SCENE: ビジュアルパターン \| 短いタイトル -->` |
| **タイトルは15文字以内** | `\|` の右側は意味あるタイトル。映像指示文は書かない |
| **最初のSCENE** | 必ずオープニング用シーン |

### 完了条件
- `script.md` と `research.md` が存在、SCENE マーカーあり
- 最初のSCENE がオープニング用、全セリフ74文字以内、全タイトル15文字以内
- セリフ総文字数が5,000〜6,000文字の範囲内である

---

# Phase B: スライド+音声生成

**前提**: VOICEVOX起動中（`http://localhost:50021`）、ffmpegがPATH

### B0.5. デザインガイド定義（必須・B1の前に）

`{SLIDES_DIR}/design_guide.md` を作成し、カラーパレット・タイポグラフィ・deviconアイコン計画を定義する。SKILL.mdのカラートークン設計に従い、テーマに合わせたCSS変数を決定する。台本に登場する技術名を洗い出し、対応するdevicon名（`icons/{name}/{name}-original.svg`）を一覧化すること。

### B1. Webプレゼンテーション生成

**SKILL.md（`.agents/skills/presentation_generator/SKILL.md`）を参照して実行する。**

`{SCRIPT_DIR}/script.md` を読み込み、`{SLIDES_DIR}` に `index.html`, `style.css`, `script.js` を生成する。

### B1.5. プレゼン推敲（必須）

// turbo
**シーン対応検証**（MISMATCHがあればB2に進まない）:
```powershell
node -e "const fs=require('fs');const script=fs.readFileSync('{SCRIPT_DIR}/script.md','utf8');const html=fs.readFileSync('{SLIDES_DIR}/index.html','utf8');const scriptScenes=[];let cur=null;script.split('\n').forEach(l=>{if(/^\s*```/.test(l)&&l.includes('SCENE:'))return;const m=l.match(/<!-- SCENE: (.+?) -->/);if(m){if(cur)scriptScenes.push(cur);cur={title:m[1]};return;}});if(cur)scriptScenes.push(cur);const htmlCount=((html.match(/id=\"scene-\d+\"/g))||[]).length;console.log('台本:'+scriptScenes.length+' HTML:'+htmlCount);if(scriptScenes.length!==htmlCount){console.log('🚨 不一致!');process.exit(1);}console.log('✅ OK');"
```

追加チェック:
- 全シーンが `.scene` + 連番 `id="scene-N"` で定義されているか
- 全シーンが `<div class="content center-layout">` を使用しているか
- `.scene { width:100%; height:100vh }` で設計されているか（960×440は禁止）
- `.content { width:1540px; max-height:860px }` になっているか
- `.content` 直下要素が各シーン最大5つ以内か
- カード・グリッドが6枚以上並んでいないか
- テキスト見切れ・重なりがないか
- 配色がCSS変数で統一されているか
- 台本中の数値・統計データがHTMLに正確に反映されているか
- `<canvas>` 要素を使っていないか
- **技術ロゴはすべてdevicon CDN `<img>` で配置されているか（インラインSVGで再現していないか）**
- **複数技術を列挙するシーンで、各技術のロゴが並べて表示されているか**
- **inline styleが3プロパティ以上含まれていないか**
- **`.timeline`, `.tl-item`, `.tl-dot` クラスを使用していないか**（他プロジェクトからCSSリークが発生するため禁止。時系列は `.flow-chain` + `.fc-node` で表現）

### B2. 音声生成

// turbo
1. scene_map.json を自動生成:
```powershell
node -e "const fs=require('fs'),path=require('path');const SCRIPT_PATH=path.resolve('{SCRIPT_DIR}/script.md');const PROJECT_DIR=path.resolve('{SLIDES_DIR}');const HTML_PATH=path.join(PROJECT_DIR,'index.html');const OUT_PATH=path.join(PROJECT_DIR,'scene_map.json');const script=fs.readFileSync(SCRIPT_PATH,'utf8');const lines=script.split('\n');const allDialogue=lines.filter(l=>/^(ずんだもん|めたん)：/.test(l)).map(l=>{const [name,...rest]=l.split('：');return{speaker:name,text:rest.join('：')};});const sceneMarkers=[];let dialogueIdx=0,currentTitle=null,currentLines=[];lines.forEach(l=>{if(/^\s*```/.test(l)&&l.includes('SCENE:'))return;const sm=l.match(/<!-- SCENE: (.+?) -->/);if(sm){if(currentTitle!==null)sceneMarkers.push({title:currentTitle,lines:[...currentLines]});currentTitle=sm[1];currentLines=[];return;}if(/^(ずんだもん|めたん)：/.test(l)){dialogueIdx++;currentLines.push(dialogueIdx);}});if(currentTitle!==null)sceneMarkers.push({title:currentTitle,lines:[...currentLines]});const html=fs.readFileSync(HTML_PATH,'utf8');const htmlSceneCount=(html.match(/id=\"scene-\d+\"/g)||[]).length;function extractTitle(t){if(t.includes('|'))return t.split('|').slice(1).join('|').trim();const m=t.match(/[「](.+?)[」]/);return m?m[1]:t;}const scenes=sceneMarkers.map((s,i)=>({id:i,title:extractTitle(s.title),lines:s.lines.map(ln=>allDialogue[ln-1]).filter(Boolean)}));while(scenes.length<htmlSceneCount){scenes.push({id:scenes.length,title:'エンディング',hold_sec:3,lines:[]});}scenes.forEach(s=>{if(s.lines.length===0&&!s.hold_sec){s.hold_sec=3;console.log('⚠️ Scene '+s.id+' ('+s.title+'): hold_sec=3 自動付与');}});const map={voicevox_url:'http://localhost:50021',speakers:{'ずんだもん':3,'めたん':2},speed_scale:1.14,inter_line_silence:0.3,scene_end_padding:0.5,scenes};fs.writeFileSync(OUT_PATH,JSON.stringify(map,null,2),'utf8');console.log('scene_map: '+scenes.length+' scenes, '+dialogueIdx+' lines, HTML: '+htmlSceneCount);if(scenes.length!==htmlSceneCount)console.log('WARNING: mismatch!');"
```

// turbo
2. title検証:
```powershell
node -e "const fs=require('fs');const p='{SLIDES_DIR}/scene_map.json';const d=JSON.parse(fs.readFileSync(p,'utf8'));const bad=['タイトルカード','数値インパクト','フロー図','テキスト強調','比較対照','段階的リスト','引用カード','タイムライン','まとめ3ポイント','エンディング','SVG図解','コードビジュアル','まとめカード','アナロジー','思考実験','ビフォーアフター'];let errors=0;let truncated=0;d.scenes.forEach(s=>{const found=bad.filter(b=>s.title.startsWith(b));if(found.length>0){console.log('❌ Scene '+s.id+': \"'+s.title+'\" ← パターン名混入');errors++;}if(s.title.length>15){console.log('⚠️ Scene '+s.id+': \"'+s.title+'\" ('+s.title.length+'文字→15文字に切り詰め)');s.title=s.title.substring(0,15);truncated++;}else{console.log('✅ Scene '+s.id+': \"'+s.title+'\"');}});if(truncated>0){fs.writeFileSync(p,JSON.stringify(d,null,2),'utf8');console.log('\n✂️ '+truncated+'件自動切り詰め');}if(errors>0){console.log('\n🚨 '+errors+'件修正必要');process.exit(1);}else{console.log('\n✅ OK');}"
```

// turbo
3. VOICEVOX辞書登録:
```powershell
node {ROOT}/tools/presentation/register_dict.js {project_id}
```

// turbo
4. 読み付与（scene_map.jsonにreadingフィールド追加）:
```powershell
node {ROOT}/tools/presentation/add_readings.js {project_id}
```

> `add_readings.js` は台本内の全英語単語をカタカナ読みに変換して `reading` フィールドに設定。`generate_audio.js` は `line.reading || line.text` をVOICEVOXに送信するため、字幕表示は元のtext、音声はreadingで制御される。
> 新しいプロジェクトで未登録の英単語があれば `add_readings.js` のDICTに追加すること。

// turbo
5. 音声生成:
```powershell
node {ROOT}/tools/presentation/generate_audio.js {project_id}
```

6. 音声ファイルをaudio/にコピー:
```powershell
Copy-Item "{SLIDES_DIR}/audio/scene_*.wav" "{AUDIO_DIR}/"
```

// turbo
7. scene_durations.json を slides/ にコピー（`generate_audio.js` は `{ROOT}/tools/{project_id}/` に出力するが、`generate-subtitle-data.js` は `{SLIDES_DIR}/` を参照するため必須）:
```powershell
Copy-Item "{ROOT}/tools/{project_id}/scene_durations.json" "{SLIDES_DIR}/scene_durations.json"
```

### 完了条件
- `index.html`, `style.css`, `script.js`, `scene_map.json` が `{SLIDES_DIR}` に存在
- `{SLIDES_DIR}/scene_durations.json` が `{ROOT}/tools/{project_id}/scene_durations.json` と同一である
- `{AUDIO_DIR}/` に `scene_XX_YY.wav` が存在

---

# Phase C: Remotion仕上げ

**作業ディレクトリ**: `{ENGINE_DIR}`
**前提**: キャラ画像（`public/characters/`）、BGM（`public/bgm/Mineral.mp3`）、ffmpeg

### C1. HTML→TSX変換

// turbo
1. CSSコピー:
```powershell
New-Item -ItemType Directory -Force -Path "{REMOTION_DIR}/scenes"
Copy-Item "{SLIDES_DIR}/style.css" "{REMOTION_DIR}/scenes/slides.css"
```

2. **slides.css をRemotion用に調整**:
- `.scene` ブロックを以下に置換:
  ```css
  .scene {
      width: 960px; height: 440px;
      display: flex; align-items: center; justify-content: center;
      background: var(--bg); overflow: hidden;
      transform: scale(2); transform-origin: top left;
      opacity: 1;
  }
  ```
- `.scene.active { ... }` ルール → 削除
- **staggerInアニメーションはそのまま残す**
- `.bar-fill` 等の `width: 0` → `width: var(--w)`、`transition` → 削除
- **`.timeline` クラスが使用されていたら、`.timeline` `.tl-item` `.tl-dot` に対して `border: none !important`, `content: none !important` 等のリーク防止ルールを追加**

3. **HTML→TSX変換実行**:
// turbo
```powershell
node -e "const fs=require('fs'),path=require('path');const htmlPath=path.resolve('{SLIDES_DIR}/index.html');const outputPath=path.resolve('{REMOTION_DIR}/scenes/SlideScenes.tsx');const html=fs.readFileSync(htmlPath,'utf-8');const sceneRegex=/<!-- ===== Scene (\d+):.*?=====\s*-->\s*([\s\S]*?)(?=<!-- ===== Scene \d+:|<script|$)/g;const scenes=[];let match;while((match=sceneRegex.exec(html))!==null)scenes.push({id:parseInt(match[1]),html:match[2].trim()});console.log('Found '+scenes.length+' scenes');function htmlToJsx(h){let j=h;j=j.replace(/<canvas[^>]*><\/canvas>/g,'');j=j.replace(/<!--\s*(.*?)\s*-->/g,'{/* \$1 */}');j=j.replace(/\bclass=\"/g,'className=\"');j=j.replace(/<br\s*>/g,'<br />');j=j.replace(/<br\/>/g,'<br />');j=j.replace(/<img([^>]*)(?<!\/)>/g,'<img\$1 />');j=j.replace(/&rarr;/g,'→');j=j.replace(/&larr;/g,'←');j=j.replace(/&darr;/g,'↓');j=j.replace(/&uarr;/g,'↑');j=j.replace(/&times;/g,'×');j=j.replace(/&#10084;/g,'❤');j=j.replace(/&amp;/g,'&');j=j.replace(/style=\"--w:(\d+%)\"/g,\"style={{ '--w': '\$1' } as React.CSSProperties}\");j=j.replace(/style=\"margin-top:\s*([^\";]+);?\"/g,\"style={{ marginTop: '\$1' }}\");j=j.replace(/style=\"color:\s*var\(([^)]+)\);?\"/g,\"style={{ color: 'var(\$1)' }}\");j=j.replace(/stroke-width=\"/g,'strokeWidth=\"');j=j.replace(/stroke-dasharray=\"/g,'strokeDasharray=\"');j=j.replace(/stroke-dashoffset=\"/g,'strokeDashoffset=\"');j=j.replace(/stroke-linecap=\"/g,'strokeLinecap=\"');j=j.replace(/text-anchor=\"/g,'textAnchor=\"');j=j.replace(/font-weight=\"/g,'fontWeight=\"');j=j.replace(/font-size=\"/g,'fontSize=\"');j=j.replace(/fill-rule=\"/g,'fillRule=\"');j=j.replace(/clip-rule=\"/g,'clipRule=\"');j=j.replace(/^\s*\n/gm,'');return j;}let tsx=\`import React from 'react';\nimport { AbsoluteFill } from 'remotion';\nimport './slides.css';\n\n\`;for(const s of scenes){tsx+=\`export const Scene\${s.id}: React.FC = () => (\n    <AbsoluteFill>\n        \${htmlToJsx(s.html)}\n    </AbsoluteFill>\n);\n\n\`;}tsx+=\`export const SCENE_COMPONENTS: Record<number, React.FC> = {\n\${scenes.map(s=>'    '+s.id+': Scene'+s.id+',').join('\n')}\n};\n\nexport const TOTAL_SCENE_COUNT = \${scenes.length};\n\`;fs.writeFileSync(outputPath,tsx,'utf-8');console.log('Generated '+outputPath+' ('+scenes.length+' scenes)');"
```

// turbo
4. TypeScriptコンパイル確認:
```powershell
npx tsc --noEmit
```

> コンパイルエラー時: HTMLコメント→`{/* */}` 変換漏れ、inline style構文エラー、SVG属性のcamelCase変換漏れを手動修正

### C2. 音声コピー + データ生成

// turbo
1. 音声をengine/publicにコピー:
```powershell
New-Item -ItemType Directory -Force -Path "{ENGINE_DIR}/public/audio/{project_id}"
Copy-Item "{AUDIO_DIR}/scene_*.wav" "{ENGINE_DIR}/public/audio/{project_id}/"
```

// turbo
2. 字幕データ生成:
```powershell
node scripts/generate-subtitle-data.js "{SLIDES_DIR}" {project_id}
```

// turbo
3. 口パクデータ生成:
```powershell
node scripts/generate-lip-sync.js {project_id}
```

### C3. VideoWithSlides.tsx を作成

既存プロジェクトの `VideoWithSlides.tsx` をテンプレートとして `{REMOTION_DIR}/VideoWithSlides.tsx` を作成する。

**変更箇所**:
1. `import` パスの `{project_id}` を実際の値に
2. `headerTitle` のデフォルト値をテーマの日本語タイトルに
3. コンポーネントのimportは `@components/` エイリアスを使用:
   ```tsx
   import { MathLayout } from '@components/layouts/MathLayout';
   import { Subtitle } from '@components/ui/Subtitle';
   ```

**テンプレートに含まれる機能:**
- `SCENE_COMPONENTS` マップによるシーン切替 + `key={scene-${id}}` でCSS staggerInリトリガー
- キャラクター立ち絵（めたん左/反転、ずんだもん右。**めたんは `bottom: CHARACTER_BOTTOM - 70`** でスライドとの被りを防ぐ）
- 発話中のみ表情変化 + `lipSyncData.ts` による音量ベース口パク
- `MathLayout` + `Subtitle` コンポーネント
- セリフ音声: `SUBTITLE_DATA.map()` + `<Sequence>` + `<Audio>` で個別配置
- BGMループ + フェードアウト

### C4. Root.tsx 登録 + コンパイル確認

`{ENGINE_DIR}/src/Root.tsx` に Composition を追加:
```tsx
import { VideoWithSlides as XxxVideo, TOTAL_FRAMES as XXX_TOTAL_FRAMES } from "@projects/{project_id}/VideoWithSlides";

// <> 内に追加:
<Composition id="{project_id}-slides" component={XxxVideo}
  durationInFrames={XXX_TOTAL_FRAMES} fps={30} width={1920} height={1080} />
```

// turbo
```powershell
npx tsc --noEmit
```

### 完了条件
- `scenes/slides.css`, `scenes/SlideScenes.tsx`, `subtitleData.ts`, `lipSyncData.ts`, `VideoWithSlides.tsx` が `{REMOTION_DIR}` に存在
- `{ENGINE_DIR}/public/audio/{project_id}/` に音声ファイルが存在
- Root.tsx に Composition 登録済み、`npx tsc --noEmit` 正常終了

---

# Phase D: 完成品整理

// turbo
1. 台本コピー:
```powershell
Copy-Item "{SCRIPT_DIR}/script.md" "{DELIVERABLES_DIR}/台本.md"
```

// turbo
2. 概要欄コピー:
```powershell
Copy-Item "{SCRIPT_DIR}/description.md" "{DELIVERABLES_DIR}/概要欄.md"
```

// turbo
3. meta.json更新:
```powershell
node -e "const fs=require('fs');const p='{PROJECT_DIR}/meta.json';const m=JSON.parse(fs.readFileSync(p,'utf8'));m.status='rendering';fs.writeFileSync(p,JSON.stringify(m,null,2),'utf8');"
```

> レンダリングはユーザーが手動実行: `cd {ENGINE_DIR} && npx remotion render {project_id}-slides output/{project_id}.mp4 --codec h264`

---

## トラブルシューティング

| 問題 | 対処法 |
|------|--------|
| シーンと読み上げがズレる | B1.5のシーン対応検証を実行。HTMLとSCENEマーカーの1:1対応を修正 |
| TSXコンパイルエラー | HTMLコメント→`{/* */}` / inline style構文 / SVG camelCase を手動修正 |
| スライドが小さい/大きい | `slides.css` の `.scene` の `transform: scale(X)` を調整 |
| サイドバーのチャプター名が映像指示文 | SCENEマーカーの `\|` 右側を短いタイトルに修正→scene_map再生成 |
| 英語の読み間違い | `register_dict.js` の `WELL_KNOWN_TERMS` と `add_readings.js` の `DICT` に追加→音声再生成 |
| **タイムラインが崩れる・赤い線が出る** | **`.timeline` 禁止。`.flow-chain` + `.fc-node` に置換。CSSに `.timeline { border: none !important }` 追加** |
