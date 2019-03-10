# Service Worker

- [Service Workerの紹介 / Google Developers](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja)
- [Service worker の使用 - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API/Using_Service_Workers)

2つのサイトでService Workerを学んだので、簡単にまとめます。

## Service Workerとは

Webページとは別にバックグラウンドで実行するスクリプト

## 特徴

- DOMに直接アクセスできない
  - postMessageインターフェースを使用して、DOMを操作する
- 必要になった時に起動される
- HTTPSが必要(例外として、localhostはhttpを使用できる)
  
## ライフライクル

「Service Worker の紹介」でライフサイクルの説明で使用されている画像です。

![Service Workerのライフサイクル](https://developers.google.com/web/fundamentals/primers/service-workers/images/sw-lifecycle.png?hl=ja)

## イベント

### install

Service Workerを登録すると発火

### fetch

他のページに遷移したり、更新すると発火

### activate

ページを制御すると発火

### その他のイベント

- message
- sync
- push

## 気をつけること

- Service Workerを登録よりページを表示することを優先する
- 開発はシークレットウィンドウを使用するといい