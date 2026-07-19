Commons Connect Firebase v2

【今回の目的】
スマホの checkin.html で登録した内容を、別端末の index.html にリアルタイム反映します。

【GitHubでの更新方法】
1. このZIPを展開します。
2. GitHubのCommonsConnectリポジトリを開きます。
3. 現在のファイルを削除するか、同名ファイルを新しい一式で上書きします。
4. 次の構成がリポジトリ直下にある状態にします。

index.html
checkin.html
manager.html
assets/
  css/style.css
  js/config.js
  js/firebase.js
  js/utils.js
  js/signage.js
  js/checkin.js
  js/manager.js

5. Commit changes を押します。
6. 1～3分待ってGitHub Pagesを再読み込みします。

【動作確認】
A. PCで index.html を開いたままにします。
B. スマホで checkin.html を開き、必ずダミー名で登録します。
C. PCのサイネージへ数秒以内に表示されれば成功です。
D. manager.htmlから表示切替や削除を確認できます。

【重要】
Firestoreをテストモードで作成した状態では、URLを知る第三者がデータを読み書きできる可能性があります。
実験中は本名、所属、個人情報を入力しないでください。
テストモードの期限までに、Firebase Authenticationと適切なFirestore Security Rulesを設定してください。

【Firebase SDK】
ソフトのインストールを避けるため、Firebase JavaScript SDKをCDNから読み込んでいます。