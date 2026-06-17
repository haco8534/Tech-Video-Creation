# セリフ単位スペック - Cookieってなんなの？？

`design_overall.md` の骨格（透明なブラウザ郵便局で、Cookie札がリクエスト封筒に自動で貼られていく）を event に分解して `script.md` のセリフへ紐付ける。

## 画面 1: intro

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.intro.in | めたん: Cookieってさ、サイトに出てくる「許可しますか？」のやつでしょ？ | 画面中央に大きな同意バナー風パネルが出る。 |
| consent.fold | ずんだもん: それはCookieそのものじゃなくて、Cookieを使う前の確認画面なのだ。 | バナーが紙のように折り畳まれ、背後にブラウザの透明な引き出しが見える。 |
| note.appear | ずんだもん: サイトがブラウザに預ける小さなメモなのだ。 | `name=value` と書かれた小さなCookie札が引き出しに入る。 |
| auto.attach.preview | 重要なのは「そのメモをブラウザがいつ、どこへ、自動で持っていくか」なのだ。 | 引き出しから札が飛び出し、リクエスト封筒へ自動で貼り付く。 |
| thesis.pin | Cookieは、保存箱の話ではなく、リクエストに勝手に添付される札の話なのだ。 | 画面上部に「保存より送信ルール」と短い見出しを固定する。 |

## 画面 2: memory

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.memory.in | HTTPはかなり忘れっぽい仕組みなのだ。 | サーバーとブラウザの間に、毎回リセットされる空の封筒が流れる。 |
| stateless.reset | ページを一回取りに行く。次のページを取りに行く。 | 1通目、2通目の封筒が互いに無関係な白紙として表示される。 |
| set_cookie.out | サーバーは返事の中で、`Set-Cookie: session=abc123` みたいな札を渡すのだ。 | サーバーから戻る封筒に `Set-Cookie` の赤い札が乗る。 |
| jar.store | ブラウザはそれを保存する。 | 札がブラウザ内のCookie jarに格納される。 |
| cookie.return | 次に同じ条件のリクエストを送る時、`Cookie: session=abc123` として勝手に付けて返すのだ。 | 次の送信封筒に `Cookie` ヘッダーとして同じ札が貼られる。 |
| locker.id | 本当のログイン状態はサーバー側にある。 | サーバー側にロッカー棚が現れ、`abc123` がログイン状態の棚へ対応する。 |
| risk.glow | そのロッカー番号を持っているだけで本人扱いされる場面がある。 | ロッカー番号の札が鍵のように発光し、次画面へつながる。 |

## 画面 3: attributes

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.attributes.in | 多くの説明は `name=value` で止まるのだ。 | `session=abc123` だけが中央に大きく表示される。 |
| attrs.orbit | 実務で効いてくるのは、その後ろにつく属性なのだ。 | `Domain`、`Path`、`Expires`、`Max-Age` のラベルが周囲を回り始める。 |
| domain.expand | `Domain` は、どのホストに送るかを広げる指定なのだ。 | `www.example.com` から `*.example.com` へ送信範囲が広がる。 |
| domain.warning | 広げすぎると別のサブドメインから影響を受けやすくなる。 | 広がった範囲の端に警告色のサブドメインが点灯する。 |
| path.lane | `Path` はURLのどの道筋に送るかを決める目印なのだ。 | URLパスが道路になり、Cookie札が特定レーンだけを通る。 |
| path.not_wall | ただし、これは強いセキュリティ境界ではないのだ。 | レーンの線が薄い点線になり、防壁ではないことを示す。 |
| lifetime.clock | `Expires` や `Max-Age` は寿命を決める。 | Cookie札に小さな時計が付き、針が進む。 |
| attrs.conclusion | Cookieは「何を保存したか」より「どのリクエストに乗るか」で意味が変わるのだ。 | 値の文字が縮み、属性リングが大きく残る。 |

## 画面 4: security

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.security.in | `Secure` とか `HttpOnly` とか。 | Cookie札の左右に二つの保護アイコンが立つ。 |
| secure.tunnel | `Secure` は、HTTPSの通信でだけCookieを送る指定なのだ。 | 封筒が暗いHTTP道では止まり、鍵付きHTTPSトンネルだけを通る。 |
| httponly.shutter | `HttpOnly` があるCookieは、`document.cookie` から読みにくくなる。 | JavaScript窓の前にシャッターが降りる。 |
| split.read_send | Cookieを読めなくても、ブラウザはそのCookieを付けてリクエストを送る。 | シャッターは閉じたまま、別レーンで封筒にCookie札が貼られる。 |
| csrf.hint | 「盗まれないこと」と「悪用されないこと」は違う。 | 画面が「read」防御と「send」防御の二列に分かれる。 |
| false.safe | 「HttpOnlyだから安全」と雑に言ってしまうのだ。 | `安全` の大きなラベルに斜線が入り、次のSameSiteへ送信レーンが残る。 |

## 画面 5: samesite

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.samesite.in | 次は `SameSite` なのだ。 | 上部にトップレベルサイトの枠、下部にリクエスト封筒の流路が出る。 |
| context.frame | ここでの「サイト」は、単なるURL文字列ではなく、登録可能ドメインやスキームを含む文脈で考えるのだ。 | `https://shop.example` のような文脈枠が封筒の背景色を決める。 |
| csrf.trap | 別サイトの罠ボタンを押したら、ログイン中の銀行サイトへリクエストが飛ぶ。 | 罠サイトから銀行サーバーへ封筒が飛び、Cookieが貼られそうになる。 |
| strict.block | `Strict` はかなり絞る。 | `Strict` ゲートがクロスサイト封筒を止める。 |
| lax.allow_nav | `Lax` は外から来た普通の移動には少し許す。 | 通常ナビゲーションの封筒だけが細いレーンを通る。 |
| none.open | `None` はクロスサイトでも送る。 | 第三者部品への封筒にもCookie札が貼られ、`Secure` 鍵が必須表示される。 |
| combo.rules | Cookieは一つのスイッチではなく、小さな境界条件の集合なのだ。 | `SameSite`、`Secure`、`Domain` が重なった条件パネルになる。 |

## 画面 6: third_party

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.third_party.in | 今見ているページのサイトを第一者と呼ぶのだ。 | 大きなニュースサイト枠が第一者として表示される。 |
| embed.ad | そこに広告や解析の部品が埋め込まれていて、別ドメインへリクエストが飛ぶ。 | ニュースサイト内に小さな広告iframe風部品がはめ込まれる。 |
| same.ad.many | 同じ広告ドメインが、ニュースサイトにも、ブログにも、通販サイトにも埋まっている。 | 3つのサイト枠に同じ広告ドメイン部品が並ぶ。 |
| id.travels | その広告ドメインへのリクエストに同じCookieを付ける可能性がある。 | 同じID札が3つの封筒に貼られる。 |
| dots.to.line | 同じブラウザが別々のサイトを移動しているように見える。 | 3つの訪問点が一本の線で結ばれる。 |
| tracking.not_content | Cookie自体はただのIDなのに、置かれる場所が増えると行動履歴になる。 | Cookie札の中身は短いIDのまま、背後に行動地図が伸びる。 |

## 画面 7: partitioned

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.partitioned.in | 最近は第三者Cookieがブロックされるって聞くわ。 | 前画面の横断線に遮断ゲートが置かれる。 |
| policy.not_simple | 単純に「全部なくなる」と言い切る話ではなくなっているのだ。 | ブラウザごとに違うポリシーカードが半透明で重なる。 |
| partition.shelves | 代表的な考え方の一つが、Cookieを分割することなのだ。 | 広告ドメインのCookie jarが、トップレベルサイト別の棚に分かれる。 |
| chips.attr | `Partitioned` という属性がある。 | Cookie札に `Partitioned; Secure` のラベルが付く。 |
| separate.jars | ニュースサイトの中にいる時と、通販サイトの中にいる時で別の棚になる。 | 同じ第三者部品のCookieが、ニュース棚と通販棚で別IDとして保存される。 |
| tradeoff | 部品としてのログインやウィジェットは動かしたい。でも横断追跡は弱めたい。 | ウィジェットの機能レーンは残し、横断追跡レーンだけ薄くする。 |
| other.tracking | Cookie以外にも、ログイン連携、URLのパラメータ、指紋採取、サーバー側の突合など、追跡の材料はいろいろある。 | Cookieの外側に複数の追跡材料アイコンが小さく出る。 |

## 画面 8: session

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.session.in | ログイン後のCookieは、サーバーに「このブラウザは認証済み」と思わせる札になる。 | Cookie札が認証済みゲートの通行証に変わる。 |
| stolen.ticket | それが盗まれたら、パスワードを知らなくても入れる？ | 通行証のコピーが暗い手に渡り、ゲート前へ移動する。 |
| mfa.after | 二段階認証はログイン時を強くする。でもログイン後のセッション札が盗まれると。 | MFAゲートの後ろ側に、セッション札だけで通る別入口が表示される。 |
| defense.stack | 対策は一つではない。`Secure`、`HttpOnly`、`SameSite`、短い寿命、再認証、失効。 | 複数の防御板が通行証の周囲に積み重なる。 |
| prefix.host | `__Host-` のような名前にすると、対応ブラウザでは制約を強制できるのだ。 | `__Host-session` 札に `Secure`、`Path=/`、`No Domain` の刻印が入る。 |
| old.mechanism | Cookieは古い仕組みだから、後から安全柵を足してきた歴史があるのだ。 | 古い郵便局に新しい安全ゲートが後付けされる。 |

## 画面 9: consent

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.consent.in | Cookie同意バナーは何なの？ | 最初のバナーが再登場するが、今度は画面下の運用レイヤーに置かれる。 |
| layer.split | 技術としてのCookieと、法律やプライバシー運用としての同意は別の層なのだ。 | 画面が上段「技術」、下段「目的・同意・説明」に分かれる。 |
| necessary.vs.ads | ログイン維持やカートのように必要なCookieもある。一方で、広告や解析のように同意や説明が重要になる使い方もある。 | 必要Cookieと広告解析Cookieが別の色の札として分類される。 |
| purpose.arrow | 何のために、誰に、どこまで送るか。 | Cookie札から目的、送信先、寿命へ矢印が伸びる。 |
| invisible.auto | Cookieは自動で送られるから、ユーザーが意識しにくい。 | 封筒に札が自動で貼られる動きが薄く繰り返される。 |
| tech.return | 「ブラウザが条件を見て、リクエストに自動添付する通行札」と見るのだ。 | 運用レイヤーが畳まれ、技術の封筒レイヤーへ戻る。 |

## 画面 10: outro

| event | 紐付くセリフ（抜粋） | 何が起きるか |
|---|---|---|
| scene.outro.in | 答えは、小さなメモなのだ。ただし、それだけでは浅い。 | 最初の小さなメモが中央に戻る。 |
| recap.flow | ブラウザが保存し、条件が合うリクエストへ自動で添付する札なのだ。 | `Set-Cookie`、保存、`Cookie` 送信の一連の流れが一筆書きで再生される。 |
| recap.attrs | その条件を決めるのが、Domain、Path、Expires、Secure、HttpOnly、SameSite、Partitioned。 | 各属性ラベルが一つずつCookie札の周囲に並ぶ。 |
| recap.risks | 同じ札がサイトをまたぐと追跡になり、ログイン札が盗まれると認証後のなりすましになる。 | 左に横断追跡地図、右に認証ゲートが並ぶ。 |
| final.lens | 中身より先に、どの文脈で、どこへ、勝手に運ばれるのかを見るのだ。 | 画面全体が「文脈」「宛先」「自動添付」の3つのチェック項目に収束する。 |

## 各オブジェクトの誕生と死

| オブジェクト | 誕生 | 死 |
|---|---|---|
| Cookie同意バナー | scene.intro.in | consent.fold で退場、scene.consent.in で運用レイヤーとして再登場 |
| Cookie札 `name=value` | note.appear | final.lens まで形を変えながら継続 |
| リクエスト封筒 | auto.attach.preview | 全画面を貫通し、outro の recap.flow で統合 |
| Cookie jar | jar.store | partition.shelves で分割棚へ変形 |
| サーバー側ロッカー | locker.id | session 画面で認証済みゲートへ変形 |
| 属性リング | attrs.orbit | recap.attrs で最終一覧へ統合 |
| HTTPSトンネル | secure.tunnel | scene.samesite.in で文脈フレームへ吸収 |
| JavaScript窓シャッター | httponly.shutter | false.safe の後に退場 |
| SameSiteゲート | strict.block | combo.rules で条件パネルへ統合 |
| 第三者広告部品 | embed.ad | partition.shelves でサイト別棚へ吸収 |
| 横断追跡線 | dots.to.line | partition.shelves で薄くなるが、other.tracking で残存リスクとして分岐 |
| Partitioned棚 | partition.shelves | tech.return まで背景構造として残る |
| 認証済み通行証 | scene.session.in | defense.stack で防御板に囲まれ、outro の recap.risks で再登場 |
| `__Host-session` 札 | prefix.host | final.lens で属性リングに統合 |

同時表示の最大は、画面5の「トップレベルサイト枠、封筒、SameSiteゲート、Cookie札」の4要素、画面8の「通行証、MFAゲート、盗難コピー、防御板」の4要素までに抑える。
