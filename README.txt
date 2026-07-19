Commons Connect v1.0 Prototype

入口:
- index.html : 80インチ縦型サイネージ想定
- checkin.html : スマートフォン登録・チェックイン
- manager.html : 運営用ダッシュボード
- studio.html : 管理者用設定画面

使い方:
1. フォルダ内の index.html を開く
2. 各画面は上部メニューから移動
3. checkin.html で登録すると、index.html と manager.html に反映
4. データはブラウザの LocalStorage に保存

注意:
- 現在はサーバー・認証・本番DBを使わない試作品です
- 別端末間ではデータ共有されません
- 本番化時は社内サーバーまたはGMO ALTUS上のAPI/DBへ接続します
