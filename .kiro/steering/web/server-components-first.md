このステアリングは `/web` 配下のファイルに適用してください

# Server Components 優先の実装方針

### 基本方針

このプロジェクトでは、Next.js App Router を使用し、原則として Server Components を優先して実装します。

### 実装ルール

#### Server Components（推奨）

- **データフェッチ**: `async/await`を使用してコンポーネントのトップレベルで実行
- **API 呼び出し**: サーバーサイドで直接`fetch`を使用
- **状態管理**: props によるデータの受け渡し
- **エラーハンドリング**: error.tsx と Suspense を活用

#### Client Components（必要最小限）

以下の場合のみ`'use client'`を使用：

- フォーム送信やボタンクリックなどのイベントハンドリング
- `useState`, `useEffect`などの React Hooks が必要な場合
- ブラウザ API が必要な場合
- リアルタイムな状態更新が必要な場合

#### 禁止事項

- `useEffect`を使用したデータフェッチ（Server Components で代替）
- 不要な`'use client'`の使用
- Client Component での API 呼び出し（Server Actions またはサーバーサイドで実行）

#### データ更新パターン

- **作成/更新/削除後**: `revalidatePath`または`redirect`を使用
- **フォーム処理**: Server Actions を優先
- **キャッシュ管理**: Next.js の組み込みキャッシュ機能を活用
