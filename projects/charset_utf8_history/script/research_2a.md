# リサーチチェックポイント：基本情報・仕組み・通説

## 収集ファクト一覧

| # | ファクト | 信頼度 | 出典 |
|---|---------|--------|------|
| 1 | ASCII（American Standard Code for Information Interchange）は1963年にASA（現ANSI）が策定。7ビットで128文字を表現可能（95個の印字可能文字＋33個の制御文字） | 🟢高 | Wikipedia "ASCII" / ANSI標準 |
| 2 | ASCIIが7ビットである理由：(a) 通信帯域のコスト削減、(b) 英語圏に十分、(c) 8ビット目はパリティビット（エラー検出用）に使用 | 🟢高 | Wikipedia "ASCII" |
| 3 | 1968年3月11日、ジョンソン大統領が連邦政府の全コンピュータにASCII対応を義務付ける大統領令を発出 | 🟢高 | ascii-code.com / sparkfun.com |
| 4 | EBCDIC（Extended Binary Coded Decimal Interchange Code）はIBMが1964年にSystem/360向けに開発。パンチカードのBCD符号から派生した8ビットコード | 🟢高 | Wikipedia "EBCDIC" / IBM公式 |
| 5 | ISO 8859シリーズはシングルバイト（8ビット）で256文字まで対応。ISO-8859-1（Latin-1）は西欧言語向け、ISO-8859-5はキリル文字向けなど、地域別に15のパートが存在 | 🟢高 | Wikipedia "ISO/IEC 8859" |
| 6 | 日本語環境ではShift_JIS（1982年頃策定）、EUC-JP、ISO-2022-JPの3つが並立。Shift_JISはMicrosoft/ASCII社が策定し、PCで普及。EUC-JPはUnixで普及 | 🟢高 | Wikipedia "Shift_JIS" / "EUC-JP" |
| 7 | Unicode構想は1987年にXeroxのJoe Becker、AppleのLee Collins・Mark Davisによって開始。Beckerが「Unicode」という名称を考案 | 🟢高 | Wikipedia "Unicode" / unicode.org |
| 8 | Unicode 1.0は当初16ビット（65,536文字）で全世界の文字を収めようとした。CJK統合漢字に全体の32%を割り当て | 🟢高 | Wikipedia "Unicode" / "Han unification" |
| 9 | Unicodeコンソーシアムは1991年1月3日にカリフォルニアで法人化。Mark Davisが初代会長（2023年までCTO） | 🟢高 | unicode.org |
| 10 | UTF-8は1992年9月にBell LabsのKen ThompsonとRob Pikeが設計。ニュージャージー州New ProvidenceのCorner Caféで紙ナプキン（プレースマット）に設計を書いた | 🟢高 | Rob Pike本人の証言 / Wikipedia "UTF-8" |
| 11 | UTF-8はPlan 9 OS上に数日で実装。X/Open委員会がFSS-UTF仕様として採用。1993年のUSENIXカンファレンスで発表 | 🟢高 | Wikipedia "UTF-8" / cam.ac.uk |
| 12 | UTF-8のバイト構造：1バイト（0xxxxxxx）=ASCII互換、2バイト（110xxxxx 10xxxxxx）、3バイト（1110xxxx 10xxxxxx 10xxxxxx）、4バイト（11110xxx 10xxxxxx 10xxxxxx 10xxxxxx） | 🟢高 | RFC 3629 / Wikipedia "UTF-8" |
| 13 | UTF-8のWebシェア推移：2008年に26%→2010年に50%→2015年に85%→2026年3月現在で98.9%（W3Techs調査） | 🟢高 | W3Techs.com |
| 14 | 2007年にインターネット上でASCIIをUTF-8が逆転し、最も使用されるエンコーディングに | 🟢高 | W3Techs / Wikipedia |
| 15 | UnicodeはVersion 2.0（1996年）でサロゲートペア機構を導入し、16ビットの制約を突破。現行の21ビットで100万超のコードポイントをサポート | 🟢高 | Wikipedia "Unicode" |

## まとめ・所感

文字コードの歴史は「英語中心の設計→各国独自拡張→統一への模索→UTF-8の勝利」という明確なストーリーラインがある。特にASCIIの7ビット制約が全ての混乱の起点になっている点は、「制約から理解する」アプローチに最適。UTF-8の発明エピソード（ダイナーのプレースマット）はフックとして強力。Webシェアの推移データは「数値インパクト」として使える。
