---
globs: web/**/*
---

# Server Components 優先の実装方針

このプロジェクトでは、Next.js App Router を使用し、原則として Server Components を優先して実装します。

## 実装ルール

### Server Components（推奨）

- **データフェッチ**: `async/await` を使用してコンポーネントのトップレベルで実行
- **API 呼び出し**: サーバーサイドで直接 `fetch` を使用
- **状態管理**: props によるデータの受け渡し
- **エラーハンドリング**: `error.tsx` と Suspense を活用

### Client Components（必要最小限）

以下の場合のみ `'use client'` を使用：

- フォーム送信やボタンクリックなどのイベントハンドリング
- `useState`, `useEffect` などの React Hooks が必要な場合
- ブラウザ API が必要な場合
- リアルタイムな状態更新が必要な場合

### 禁止事項

- `useEffect` を使用したデータフェッチ（Server Components で代替）
- 不要な `'use client'` の使用
- Client Component での API 呼び出し（Server Actions またはサーバーサイドで実行）

### データ更新パターン

- **作成/更新/削除後**: `revalidatePath` または `redirect` を使用
- **フォーム処理**: Server Actions を優先
- **キャッシュ管理**: Next.js の組み込みキャッシュ機能を活用

## Server → Client Component のシリアライズ制約

Server Component から Client Component に props でデータを渡す際、React はデータをシリアライズします。
**シリアライズできない値を渡すとエラーなく描画が失敗する**ため、注意が必要です。

### シリアライズ可能な型

- プリミティブ型: `string`, `number`, `boolean`, `null`, `undefined`
- 配列、プレーンオブジェクト（ネストされていても可）
- `Map`, `Set`（React 19+）

### シリアライズ不可の型

- **Date オブジェクト**: 渡せない。文字列（ISO 8601）で渡す
- 関数、クラスインスタンス
- `Symbol`

### Zod スキーマでの注意点

```typescript
// ❌ Date オブジェクトを生成するため Client Component に渡せない
const schema = z.object({
  date: z.coerce.date()
})

// ✅ 文字列のまま渡し、Client 側で必要に応じて Date に変換
const schema = z.object({
  date: z.string()  // ISO 8601 形式の文字列
})
```

### 日付の取り扱いパターン

```typescript
// Server Component: API レスポンスを文字列のまま渡す
const data = await fetchData() // { date: "2024-12-01", ... }
return <ClientChart data={data} />

// Client Component: 必要に応じて Date に変換
function ClientChart({ data }) {
  const formattedDate = new Date(data.date).toLocaleDateString('ja-JP')
  // ...
}
```
