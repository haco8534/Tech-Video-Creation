# リサーチ: 最近のwebアプリ重すぎ！

## 1. Webページサイズの推移

- **2010年**: 中央値 約468KB (HTTP Archive)
- **2015年**: 中央値 約2,000KB (2MB突破が話題に)
- **2020年**: 中央値 約2,080KB
- **2024年**: デスクトップ中央値 約2,600KB、モバイル中央値 約2,400KB (HTTP Archive State of the Web)
- **JavaScriptの転送量**: デスクトップ中央値 約560KB、モバイル中央値 約510KB (HTTP Archive 2024)
- 2010年から2024年で約5倍以上に増加

## 2. フレームワークのバンドルサイズ比較 (minified + gzipped)

| フレームワーク | バンドルサイズ |
|--------------|-------------|
| React 18 + ReactDOM | ~44KB |
| Vue 3 | ~33KB |
| Angular 17 | ~60KB |
| Svelte 4 (コンパイル後) | ~2KB (ランタイムほぼなし) |
| HTMX | ~14KB |
| Preact | ~4KB |
| Alpine.js | ~15KB |

※ これはフレームワーク本体のみ。実アプリではルーター、状態管理、UIライブラリ等で数百KBに膨れ上がる。

## 3. node_modules問題

- 一般的なReactプロジェクト: 直接依存 30〜80パッケージ → 間接依存含めると1,000〜1,500パッケージ
- `create-react-app` の初期状態で約1,400パッケージ、約200MB超
- **left-pad事件 (2016年3月)**: たった11行のnpmパッケージが削除され、React, Babel等の主要プロジェクトがビルド不能に
- npmレジストリ: 2024年時点で200万パッケージ超
- 「node_modulesは宇宙で最も重い物体」ミーム

## 4. ページ表示速度とユーザー行動

- **Googleの調査 (2018)**: モバイルページの読み込みが1秒→3秒で直帰率が32%増加、1秒→5秒で90%増加
- **Akamai調査**: ページ読み込みが100ミリ秒遅れるとコンバージョンが7%低下
- **Core Web Vitals**: LCP (Largest Contentful Paint)、FID/INP (Interaction to Next Paint)、CLS (Cumulative Layout Shift)
- 2024年のCrUXデータで、Core Web Vitalsの3指標すべてに合格しているサイトは約40%

## 5. Webの歴史的変遷

- **1991年**: 最初のWebページ (Tim Berners-Lee)、テキストのみ、数KB
- **1996年**: Space Jamの公式サイト、約2KB (今も閲覧可能)
- **2005年**: Ajax (Asynchronous JavaScript and XML) が命名される。Gmail, Google Mapsが先駆け。ページ全体をリロードせずに部分更新
- **2010年**: Backbone.js登場、SPA (Single Page Application) 時代の幕開け
- **2013年**: React登場 (Facebook)、仮想DOMによるUI構築
- **2014年**: Vue.js登場
- **2016年**: Angular 2リリース、SPAフレームワーク戦国時代
- **2020年代**: Next.js, Nuxt等のメタフレームワーク全盛。SSR/SSG/ISRの使い分け

## 6. なぜ重くなったのか

1. **SPA (Single Page Application) の普及**: 画面遷移ごとにHTMLを返すのではなく、初回にアプリ全体のJSを読み込む
2. **フレームワークの層の厚さ**: React + React Router + Redux + Material UI + ... で数百KB〜1MB超
3. **サードパーティスクリプト**: 広告、アナリティクス、A/Bテスト、チャットウィジェット等。平均的なサイトで20〜30の外部スクリプト
4. **過剰な抽象化**: 小さな機能にも大きなライブラリを導入する傾向
5. **画像の肥大化**: 高解像度ディスプレイ対応で画像サイズ増大 (ただしWebP/AVIFで改善傾向)
6. **ポリフィル・互換性コード**: 古いブラウザ対応のための余分なコード

## 7. 解決策・反動の動き

- **Astro**: アイランドアーキテクチャ。デフォルトでJS 0KB、必要な部分だけハイドレーション
- **HTMX**: サーバーサイドレンダリング回帰。HTMLレスポンスで部分更新。14KB
- **Qwik**: Resumability。ハイドレーション不要、必要なJSだけ遅延ロード
- **React Server Components**: サーバーでレンダリング、クライアントにJSを送らない
- **Partial Hydration / Islands Architecture**: ページの一部だけをインタラクティブに
- **Edge Computing**: CDNエッジでSSR (Cloudflare Workers, Vercel Edge)
- **Vite**: 高速なビルドツール。ESMベースの開発サーバー
- **Bun**: Node.js代替の高速ランタイム

## 8. 具体例

- **Space Jam (1996)**: 約2KB → 同等のモダンサイトなら数MB
- **Notion Web**: 初回ロードで約10MB超のJS
- **Slack Web**: 数MBのJS
- **VS Code Web (vscode.dev)**: 数MBだがWASM活用で高性能
- **2024年の平均的なWebアプリ**: JSだけで500KB〜2MB (gzip後)

## 9. 補足: 重さの意味の多面性

「重い」には複数の意味がある:
- **転送サイズ**: ダウンロードするデータ量
- **パース・コンパイル時間**: JSエンジンがコードを解析する時間
- **実行時メモリ使用量**: Chromeのタブ1つで数百MB消費
- **CPU使用率**: アイドル状態でもバックグラウンド処理
- **Time to Interactive**: 表示されてから操作可能になるまでの時間
