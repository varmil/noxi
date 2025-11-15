# プロジェクト構造ガイドライン

## ディレクトリ構造

原則ルート階層は用いず web, backend ディレクトリ配下に実装します。
web, backend でコードが多少重複する場合でもこの原則を適用します。

### 全体の俯瞰

```
root
|
+-- backend          # Nestjsを用いたAPIサーバの実装
+-- web              # Nextjsを用いたフロントエンドの実装
```

## lint や test

ルート階層は用いず `web/` `backend/` それぞれに lint, test を実装します。
