「キャッシュを消す」ボタン、本当は何を消してる？画面の裏で動く8つの仕組み

スマホやブラウザで何気なく押している「キャッシュを消去」ボタン。実はあのボタンの裏では、CPU・OS・DNS・HTTP・Service Worker・CDN・「戻る」ボタン用・アプリ専用と、少なくとも8つの別物が同じ「キャッシュ」という名前で動いています。「消すと速くなる」は本当か、なぜiPhoneにはあのボタンが無いのか、そもそも何のために存在するのか。フランス語の語源から、Linuxカーネル公式の警告、Phil Karltonの有名な格言まで、ずんだもんとめたんが20分で解きほぐします。

{{TIMESTAMPS}}

【参考文献】
- Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*（メモリ階層の標準的定義）
- IETF RFC 9111: HTTP Caching (June 2022) https://www.rfc-editor.org/rfc/rfc9111.html
- IETF RFC 1945: HTTP/1.0 (1996) https://www.rfc-editor.org/rfc/rfc1945
- Linux Kernel Documentation: drop_caches https://docs.kernel.org/admin-guide/sysctl/vm.html
- Maurice Wilkes, "Slave Memories and Dynamic Storage Allocation," IEEE Trans. on Electronic Computers Vol.EC-14 (1965)
- MDN Web Docs: Cache-Control https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control
- MDN Web Docs: Storage quotas and eviction criteria https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN Web Docs: Service Worker API https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- web.dev: Back/forward cache https://web.dev/articles/bfcache
- web.dev: stale-while-revalidate https://web.dev/articles/stale-while-revalidate
- Chromium Project: Disk Cache https://www.chromium.org/developers/design-documents/network-stack/disk-cache/
- Google Chrome Help: Delete browsing data https://support.google.com/chrome/answer/2392709
- Mozilla Support: Clear cookies and site data https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox
- Android Developers: App-specific storage https://developer.android.com/training/data-storage/app-specific
- Apple File System Programming Guide
- Etymonline: cache https://www.etymonline.com/word/cache
- Martin Fowler, TwoHardThings (Phil Karlton 格言の正典化) https://martinfowler.com/bliki/TwoHardThings.html
- Wikipedia: IBM System/360 Model 85
- Wikipedia: Locality of reference

📘 このチャンネルについて
一次情報と研究データに基づきながら、難しいテーマをずんだもんとめたんの対話で楽しくわかりやすく解説するチャンネルです。

#キャッシュ #ブラウザ #技術解説 #ずんだもん #めたん
