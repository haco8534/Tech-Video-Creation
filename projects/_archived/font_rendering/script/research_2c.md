# リサーチチェックポイント：背景・深掘り情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | 「フォント戦争」: 1980年代後半、AdobeがPostScript Type1の仕様を秘密にしてロイヤルティを要求。AppleがTrueTypeを開発して対抗、MicrosoftがTrueTypeをライセンスしてWindows 3.1に搭載。Adobeは対抗してType1の仕様を公開 | 🟢高 | Wikipedia (TrueType), Computer History Museum |
| 2 | AppleとMicrosoftがTrueTypeで連合したのは、Adobeの独占的なフォント技術支配への反発が理由 | 🟢高 | truetype-typography.com history, Microsoft Typography |
| 3 | フォント戦争の和解: 1997年にAdobeとMicrosoftが共同でOpenTypeを開発。TrueType輪郭もPostScript輪郭も格納可能な統一フォーマットとして設計 | 🟢高 | Microsoft OpenType spec, Wikipedia |
| 4 | PostScript Type1フォントはAdobeが2023年1月に公式サポート終了。約40年の歴史に幕 | 🟢高 | Adobe公式ブログ |
| 5 | 800x600ピクセルの画面は実際にはR/G/Bのサブピクセルが2400x600個並んでいる。ClearTypeはこの3倍の水平解像度を活用 | 🟢高 | Microsoft ClearType documentation |
| 6 | バリアブルフォントは2016年にMicrosoft・Google・Apple・Adobeの4社が共同発表。1つのファイルでフォントファミリー全体を表現し、ファイルサイズを大幅に削減 | 🟢高 | Microsoft OpenType spec, Google Fonts blog |
| 7 | Webフォントの普及でフォント読み込みがWebパフォーマンスに直接影響。バリアブルフォントによるファイルサイズ削減はWeb性能改善の文脈でも重要 | 🟡中 | web.dev, Google Fonts documentation |
| 8 | Unicode対応により現代のフォントは理論上65,536グリフを収録可能。日本語フォントはJIS第1水準だけで2,965字、漢字全体では数万字が必要で、フォントファイルが数十MBになることも | 🟡中 | JIS X 0208規格, Adobe-Japan1 |
| 9 | ベジェ曲線の名前はフランスの自動車エンジニア、ピエール・ベジェ（Renault）に由来。1960年代に自動車のボディ設計のために開発。ド・カステリョ（Citroën）も同時期に独立に同じ曲線を発見 | 🟢高 | Wikipedia (Bézier curve) |
| 10 | フォントの「.notdef」グリフ（豆腐□）は、対応するグリフがないときに表示される。Googleが「Noto」フォントファミリーを開発したのは「No more Tofu」（もう豆腐を出さない）という意味 | 🟢高 | Google Noto Fonts project page |
| 11 | FreeType（Linuxのフォントレンダリングエンジン）はHarfBuzzテキストシェーピングエンジンと組み合わせて使われる。HarfBuzzはアラビア語等の複雑なスクリプトのグリフ変形を処理 | 🟡中 | FreeType docs, HarfBuzz docs |
| 12 | ディスプレイの解像度向上の歴史: 初期PC(72-96 DPI) → 一般的なモニター(100-150 DPI) → Retina(220+ DPI) → 4K(180-280 DPI)。解像度が上がるほどヒンティング/サブピクセルの重要度は下がる | 🟡中 | Apple, various display specs |

## まとめ・所感

- フォント戦争（Adobe vs Apple+Microsoft）は企業間ドラマとして動画の導入に使える
- ベジェ曲線が自動車エンジニアの発明というのは意外性があり、アナロジーとして使える
- GoogleのNoto = No Tofuの由来は面白いトリビア
- 解像度向上とレンダリング技術の関係は「過去と現在」の対比として使える
