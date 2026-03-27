# リサーチチェックポイント：背景・深掘り情報

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | ASCIIの7ビット設計は1960年代の通信インフラの制約を反映。当時は1ビットでもコスト削減が重要で、8ビット目はパリティビット（エラー検出）に使うのが一般的だった | 🟢高 | Wikipedia "ASCII" |
| 2 | IBMがEBCDICを選んだ理由：System/360の出荷に間に合うASCII対応の周辺機器（パンチカードマシンなど）が開発できなかったため。既存のパンチカード互換性を優先 | 🟢高 | Wikipedia "EBCDIC" / edwardbosworth.com |
| 3 | 「コードページ」方式の問題：8ビット目を使って256文字に拡張する際、各国・各社が独自にコードページを定義。同じバイト値が国によって異なる文字を表す混乱が発生 | 🟢高 | Wikipedia "Code page" |
| 4 | 日本の文字コード3すくみ：Shift_JIS（PC/Microsoft）、EUC-JP（Unix）、ISO-2022-JP（メール/RFC 1468）。同じ日本語テキストが3つの異なるバイト列になり、90年代のネット文化で文字化けが日常茶飯事に | 🟡中 | 各種日本語技術解説 |
| 5 | UTF-8の設計が「天才的」と言われる5つの特性：(a) ASCII完全互換（ASCIIテキストはそのままUTF-8）、(b) 自己同期（任意のバイト位置から文字境界を特定可能）、(c) エンディアン非依存（BOM不要）、(d) NULL文字が埋め込まれない（Cの文字列関数で安全）、(e) ソートした場合にUnicodeコードポイント順と一致 | 🟢高 | RFC 3629 / Rob Pike解説 |
| 6 | UTF-8発明のきっかけ：X/Open委員会からFSS-UTF設計のレビュー依頼電話が来た。PikeとThompsonは既存案に不満を感じ、ディナーに行く途中で新しい設計を考案。翌日にはPlan 9 OS全体が新エンコーディングに移行 | 🟢高 | Rob Pike本人のメール / cam.ac.uk |
| 7 | Windows-1252とISO-8859-1の微妙な違い：0x80-0x9F範囲でWindows-1252は独自の文字（€、スマートクォートなど）を割り当て。ISO-8859-1では制御文字。WebブラウザはISO-8859-1と宣言されたページをWindows-1252として解釈するのが事実上の標準になった | 🟡中 | WHATWG仕様 / WordPress Trac |
| 8 | UTF-8の勝利の背景にはWebの爆発的成長がある。HTML5仕様はUTF-8を推奨し、WHATWGは事実上UTF-8を必須と位置づけた | 🟢高 | WHATWG Encoding Standard |
| 9 | Googleが2010年代にGmailやGoogle Docsで全面UTF-8化を推進。Microsoftも2019年にWindows 10でUTF-8をプロセスのデフォルトコードページに設定可能にした | 🟡中 | Google公式ブログ / Microsoft Docs |
| 10 | 「UTF-8 Everywhere」マニフェスト（utf8everywhere.org）：C++/Windows開発者に対してUTF-16からUTF-8への移行を訴えるドキュメント。UTF-16の「最悪の」設計を詳細に批判 | 🟡中 | utf8everywhere.org |
| 11 | 絵文字（Emoji）のUnicode追加は2010年のVersion 6.0から。日本の携帯電話各社が独自の絵文字コードを使っていたのをGoogleとAppleがUnicodeへの統合を提案 | 🟢高 | Wikipedia "Emoji" / unicode.org |
| 12 | Ken ThompsonはUnixの開発者（Dennis Ritchieと共同）、Go言語の共同開発者。Rob PikeもUnix/Plan 9/Go言語の開発者。UTF-8の設計者はコンピュータサイエンス史上の巨人 | 🟢高 | Wikipedia |

## まとめ・所感

UTF-8の設計特性（5つの天才的特性）を丁寧に説明することで、「なぜ勝ったか」への答えが自然に導かれる。特に「自己同期」性は、思考実験（「もし途中のバイトが壊れたらどうなる？」）で説明可能。絵文字の話は現代の視聴者にとって身近で、文字コードの話が「今も進行中の物語」であることを示す良いエンディング素材。
