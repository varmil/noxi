## BACKEND APPS

### example

#### dev

```shell
npm run app -- pubsubhubbub dev
npm run app -- groups/update-channels dev
```

#### build

```shell
npm run app -- pubsubhubbub build
npm run app -- groups/update-channels build
```

#### prod

```shell
npm run app -- pubsubhubbub prod
npm run app -- groups/update-channels prod
```

### CREATE NEW APPS

```shell
cd backend
npx nest generate app my-app-name
```

## STRIPE

### Webhook ローカルテスト

```shell
# 1. Stripe CLI にログイン（初回のみ）
stripe login

# 2. Webhook をローカルに転送
stripe listen --forward-to localhost:15000/api/webhooks/stripe
```

表示される `whsec_...` を `backend/.env` の `STRIPE_WEBHOOK_SECRET` に設定。

```shell
# テストイベント送信
stripe trigger payment_intent.succeeded
```

## 実機モバイルデバッグ

1. `ipconfig` でローカルIPアドレス(A)取得
2. Windows "private" ファイアウォールをOFF
3. `http://A:3000` をスマホブラウザで閲覧
