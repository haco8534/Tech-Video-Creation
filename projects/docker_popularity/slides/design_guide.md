# デザインガイド: Dockerはなぜこんなに流行ったのか

## コンセプト
Dockerのテーマカラーであるブルー（Docker Blue）をプライマリに、インフラストラクチャ/クラウド感を出すクリーンなライトテーマ。コンテナの「軽量さ」「積み重ね」を視覚的に表現する。

## カラーパレット
- Primary: #2496ed （Docker Blue — Dockerのロゴ色）
- Primary-light: #e3f2fd
- Secondary: #0db7ed （Docker Light Blue）
- Background: #f6f8fb （白系ベース）
- Card: rgba(255,255,255,0.8) （カード背景）
- Text: #1a1d23 （本文テキスト）
- Text-light: #6b7280 （補足テキスト）
- Teal: #06b6d4 （コンテナ/軽量さ）
- Teal-light: #cffafe
- Coral: #ef4444 （警告/問題）
- Coral-light: #fee2e2
- Amber: #f59e0b （注目/転換）
- Amber-light: #fef3c7
- Purple: #8b5cf6 （歴史/革新）
- Purple-light: #ede9fe

## タイポグラフィ（CSS変数）
- --fs-hero: 72px （数値インパクト用）
- --fs-heading: 42px （スライド見出し）
- --fs-body: 28px （本文）
- --fs-caption: 20px （補足・ラベル）
- --fs-small: 16px （最小テキスト）

## セーフエリア制約
- コンテンツ領域: 1540px × 860px
- 上部マージン: 100px（チャプターヘッダー領域）
- 下部マージン: 120px（字幕領域）
- 右マージン: 380px（Remotionサイドバー領域）

## カスタムビジュアル計画（最低8個）
1. **引っ越しアナロジー** — SVGで家と段ボールのイラスト（VMは家ごと、コンテナは段ボール）
2. **VMアーキテクチャ図** — スタック構造（ハードウェア → Hypervisor → Guest OS → App）
3. **コンテナアーキテクチャ図** — スタック構造（ハードウェア → Host OS → Docker Engine → App）
4. **namespace壁の図解** — 6種類のnamespace（PID, NET, MNT, UTS, IPC, USER）を仕切り壁として表現
5. **cgroups制約図** — CPU/メモリ/I/Oの制限をブレーカー/ゲージで表現
6. **コンテナ技術タイムライン** — chroot(1979) → FreeBSD Jails(2000) → Solaris Zones(2004) → cgroups(2006) → LXC(2008) → Docker(2013)
7. **Dockerレイヤードイメージ** — 層ごとに色分けした積み重ね図（Base OS → Python → Dependencies → App Code）
8. **Docker Hub概念図** — Upload/Download の中央リポジトリ構成
9. **Kubernetes vs Swarm シェアチャート** — バーチャートでKubernetesの圧倒的シェアを表現
10. **Docker Inc.資金調達推移** — 折れ線グラフ（急成長→停滞→売却→復活）
