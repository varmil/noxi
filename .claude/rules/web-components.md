---
globs: web/**/*
---

# UI コンポーネント実装ルール

## 基本方針

- 極力標準的な shadcn で提供されているコンポーネントを使用する

## 画像コンポーネント

- **next/image は使わない**
- 代わりに `components/styles/Image.tsx` を使用

```tsx
import Image from 'components/styles/Image'
```

## v0 活用ルール

### 新規 UI 作成時は v0 を優先活用

以下の場合は **v0 MCP を使用** して UI 作成を行う：

- **新規コンポーネント作成**: 既存コンポーネントがない場合
- **複雑なレイアウト**: フォーム、ダッシュボード、カード一覧など
- **デザインシステム**: 統一感のある UI 要素が必要な場合

### v0 使用手順

1. **要件整理**: 機能要件とデザイン要件を明確化
2. **v0 生成**: `mcp_v0_createChat` で UI 生成を依頼
3. **コード取得**: 生成されたコードを取得・適用
4. **カスタマイズ**: プロジェクト固有の要件に合わせて調整

### v0 活用のメリット

- **高品質**: デザインシステムに準拠した UI
- **効率性**: 手動実装より高速
- **一貫性**: プロジェクト全体での UI 統一

## Suspense + Skeleton パターン

### 基本構造

非同期データを取得するコンポーネントには Suspense + Skeleton パターンを適用する：

```tsx
// IndexTemplate.tsx
<Suspense fallback={<MyComponentSkeleton />}>
  <MyComponent />
</Suspense>
```

### スケルトンと実コンポーネントの高さ一致

スケルトンと実コンポーネントの高さが一致しないと、ローディング完了時にレイアウトシフト（ガタつき）が発生する。これを防ぐため、以下のフローで実装する：

#### 1. data-testid を付与

```tsx
// 実コンポーネント
<Card data-testid="my-component-item">...</Card>

// スケルトン
<Card data-testid="my-component-skeleton-item">...</Card>
```

#### 2. E2E テストで高さを検証

`e2e/tests/skeleton-height.spec.ts` にテストケースを追加：

```typescript
test('MyComponent - アイテムの高さが一致', async ({ page }) => {
  // API遅延を注入してスケルトンをキャプチャ
  await page.route('**/api/my-endpoint**', async route => {
    await new Promise(resolve => setTimeout(resolve, 500))
    await route.continue()
  })

  await page.goto('/path/to/page')

  // スケルトンの高さを取得
  const skeletonItem = page.locator(
    '[data-testid="my-component-skeleton-item"]'
  )
  await expect(skeletonItem.first()).toBeVisible({ timeout: 5000 })
  const skeletonBox = await skeletonItem.first().boundingBox()

  // 実コンポーネントの高さを取得
  const actualItem = page.locator('[data-testid="my-component-item"]')
  await expect(actualItem.first()).toBeVisible({ timeout: 30000 })
  const actualBox = await actualItem.first().boundingBox()

  // 高さの差が2px以内であることを確認
  if (skeletonBox && actualBox) {
    const heightDiff = Math.abs(skeletonBox.height - actualBox.height)
    expect(heightDiff).toBeLessThanOrEqual(2)
  }
})
```

#### 3. テスト実行で差異を検出・修正

```bash
cd e2e && npx playwright test skeleton-height.spec.ts
```

テストが失敗した場合、エラーメッセージに具体的な高さの差が表示されるので、スケルトンのスタイルを調整する。

### 既存のテストファイル

- `e2e/tests/skeleton-height.spec.ts` - スケルトン高さ検証テスト
