# リサーチチェックポイント：基本情報・仕組み・通説

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 現代のフォントは「アウトラインフォント」で、文字の形をベジェ曲線（ベクターデータ）で定義。拡大縮小してもギザギザにならない | 🟢高 | Wikipedia (Font rasterization), fontworks.co.jp |
| 2 | TrueTypeフォントは**2次ベジェ曲線**（制御点1つ）を使用。AppleがPostScriptに対抗して1991年に開発 | 🟢高 | Wikipedia (TrueType), Microsoft Typography docs |
| 3 | PostScript/OpenType(CFF)フォントは**3次ベジェ曲線**（制御点2つ）を使用。より少ない点で精密な曲線を表現可能 | 🟢高 | Adobe Typography, Wikipedia |
| 4 | フォントファイルの内部は「テーブル」の集合体。cmap（文字→グリフ対応）、glyf（輪郭データ）、head（ヘッダー）、hmtx（横幅メトリクス）等 | 🟢高 | Microsoft OpenType spec, Apple TrueType Reference |
| 5 | cmapテーブルがUnicodeのコードポイントを内部のグリフインデックスにマッピング。対応するグリフがなければインデックス0（.notdef＝豆腐□）が表示される | 🟢高 | Microsoft OpenType spec |
| 6 | ラスタライザがベクターの輪郭データをピクセルのグリッドに変換する。これが「ラスタライズ」 | 🟢高 | Wikipedia (Font rasterization) |
| 7 | アンチエイリアスは、文字の端にグレーの中間色ピクセルを配置して曲線を滑らかに見せる技術 | 🟢高 | Wikipedia, Smashing Magazine |
| 8 | サブピクセルレンダリング（ClearType）は、LCDの1ピクセルがR/G/Bの3サブピクセルで構成されていることを利用。水平解像度を実効3倍にする | 🟢高 | Microsoft ClearType docs |
| 9 | ヒンティングは、低解像度で文字を表示するとき輪郭をピクセルグリッドに合わせて調整する技術。TrueTypeはグリフごとに専用のヒントプログラム（スタックベースVM）を持つ | 🟢高 | truetype-typography.com, Microsoft Typography |
| 10 | OpenTypeフォントは最大65,536グリフを収録可能。TrueTypeの実用上限は約6,000グリフ | 🟢高 | Microsoft OpenType spec |
| 11 | GSUBテーブル（Glyph Substitution）がリガチャ・異体字・小型大文字等のグリフ置換を処理 | 🟢高 | Microsoft OpenType spec, FontForge docs |
| 12 | GPOSテーブル（Glyph Positioning）がカーニング・マーク配置等の位置調整を処理 | 🟢高 | Microsoft OpenType spec, FontForge docs |
| 13 | ビットマップフォントは1960年代後半（Rudolf Hellの「Digi Grotesk」1968年）から存在。各サイズごとに別ファイルが必要 | 🟢高 | fontfabric.com history, Wikipedia |
| 14 | PostScriptは1984年にAdobe Systems（John Warnock, Charles Geschke）が開発。Apple LaserWriterに搭載されDTP革命を起こした | 🟢高 | Computer History Museum, Wikipedia |
| 15 | バリアブルフォント（OpenType 1.8, 2016年）は1つのファイルで太さ・幅・傾きなどを連続的に変化可能。wght/wdth/ital/slnt/opsz等の軸を持つ | 🟢高 | Microsoft OpenType spec, Google Fonts |

## まとめ・所感

- フォントの核心は「ベジェ曲線 → ピクセルへの変換（ラスタライズ）」というパイプライン
- 2次ベジェ（TrueType）vs 3次ベジェ（PostScript/CFF）の違いは図解の核になる
- フォントファイルの内部構造（テーブル群）は「フォントファイルの中身」として面白いネタ
- サブピクセルレンダリングは「コンピュータが嘘をついて文字をきれいに見せる」として最も衝撃的なビジュアル
