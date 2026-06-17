# デザインガイド: 正確な乱数はどうして必要なのか

## カラーパレット

乱数・暗号・セキュリティのテーマに合わせ、深い紺青をプライマリに、警告のコーラルと安全のティールで対比を表現する。

```css
:root {
    --bg: #f8f9fa;
    --text: #1a1d23;
    --text-light: #1a1d23;
    --primary: #3b5998;         /* ネイビーブルー：信頼・暗号 */
    --primary-light: #dce4f2;
    --teal: #0d9488;            /* ティール：安全・正解 */
    --teal-light: #ccfbf1;
    --coral: #dc2626;           /* レッド：危険・脆弱性 */
    --coral-light: #fee2e2;
    --amber: #d97706;           /* アンバー：警告・注意 */
    --amber-light: #fef3c7;
    --card-bg: #ffffff;
    --border: #d1d5db;
}
```

## タイポグラフィ
- フォント: Zen Maru Gothic (400, 700, 900)
- hero: 72px / heading: 36px / body: 24px / caption: 18px

## deviconアイコン計画

台本に登場する技術名と対応するdevicon:

| 技術名 | devicon name | 用途場面 |
|--------|-------------|---------|
| Python | `python` | Block 3: メルセンヌ・ツイスタ採用言語 |
| Ruby | `ruby` | Block 3: メルセンヌ・ツイスタ採用言語 |
| R | `r` | Block 3: メルセンヌ・ツイスタ採用言語 |
| Linux | `linux` | Block 4: Debian事件, Block 5: /dev/random |
| Chrome | `chrome` | Block 3: xorshift128+, Math.random() |
| Node.js | `nodejs` | Block 3: xorshift128+, Math.random() |

## theSVGアイコン計画

| ブランド | slug | 用途場面 |
|---------|------|---------|
| Intel | (deviconなし→テキストバッジ) | Block 5: RDRAND |
| Samsung | (deviconなし→テキストバッジ) | Block 5: 量子乱数チップ |
| Bitcoin | `bitcoin` | Block 4: Android盗難事件 |

## SVG図解の計画

| シーン | SVG図解内容 |
|--------|-----------|
| サイコロvs計算機 | サイコロのシルエット + CPU/歯車 のイメージ |
| 決定論マシン | 入力→歯車→出力の決定論フロー |
| 0101の思考実験 | 0と1が交互に並ぶパターン図 |
| LCGの仕組み | X(n+1) = (A*X + B) mod M のフロー |
| RANDUの15平面 | 3D空間に点が平面状に並ぶ図（平行平面を強調） |
| メルセンヌ・ツイスタ | 内部状態624個 → twist → tempering のフロー |
| モンテカルロ誤差 | 分子シミュレーションの正解vs誤差の比率バー |
| MT624個で予測 | 624個の出力→内部状態復元→予測の流れ |
| 偏りvs予測不能性 | 2つの軸（偏り/予測可能性）の2x2マトリクス |
| Debian事件 | 鍵空間の劇的縮小（広い空間→32,767の点） |
| PS3署名破り | 署名フロー：ランダムk→固定k の対比 |
| TRNGの仕組み | 物理ノイズ源（熱雑音・放射線）→ビット列 |
| ラバランプ壁 | ラバランプ群→カメラ→エントロピー→暗号鍵 |
| RDRAND信頼問題 | CPUチップ + 鍵アイコン + 疑問符 |
| 量子乱数 | 光子→ビームスプリッタ→0/1の分岐 |
| 乱数の階層まとめ | PRNG→CSPRNG→TRNG/QRNGの3層ピラミッド |
