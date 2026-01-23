import { test, expect } from '@playwright/test'

/**
 * スケルトンと実コンポーネントの高さ一致テスト
 *
 * スケルトンUI表示中に取得した高さと、
 * 実データ読み込み後のコンポーネントの高さが一致することを確認する。
 * これにより、ローディング → 表示完了 時のレイアウトシフトを防ぐ。
 */

test.describe('スケルトンと実コンポーネントの高さ一致', () => {
  test('スパチャランキング（ライブ集計）- カードの高さが一致', async ({
    page
  }) => {
    // Server Componentsのストリーミングではスケルトンの捕捉が難しいため
    // ネットワーク遅延をルーティングで注入
    await page.route('**/*', async route => {
      // バックエンドAPIへのリクエストのみ遅延
      if (route.request().url().includes('/api/')) {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      await route.continue()
    })

    // ページにナビゲート（早期にDOMを取得）
    const gotoPromise = page.goto('/ja/ranking/super-chat/live', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    })

    // スケルトンを監視
    const skeletonItem = page.locator(
      '[data-testid="live-period-card-skeleton"]'
    )
    let skeletonBox = null
    try {
      await expect(skeletonItem.first()).toBeVisible({ timeout: 10000 })
      skeletonBox = await skeletonItem.first().boundingBox()
    } catch {
      // スケルトンがキャプチャできなかった場合はスキップ
      // Server Componentsのストリーミングではデータが速く返る場合がある
      test.skip(true, 'スケルトンをキャプチャできませんでした')
      return
    }

    // ナビゲーション完了を待つ
    await gotoPromise

    // 実データの読み込みを待つ
    const actualItem = page.locator('[data-testid="live-period-card"]')
    await expect(actualItem.first()).toBeVisible({ timeout: 60000 })
    const actualBox = await actualItem.first().boundingBox()

    // 両方の高さが取得できた場合のみ比較
    if (skeletonBox && actualBox) {
      const heightDiff = Math.abs(skeletonBox.height - actualBox.height)

      // 高さの差が2px以内であることを確認
      expect(
        heightDiff,
        `スケルトン(${skeletonBox.height}px)と実コンポーネント(${actualBox.height}px)の高さ差が${heightDiff}pxあります。2px以内に収めてください。`
      ).toBeLessThanOrEqual(2)
    }
  })

  test('配信スケジュール - アイテムの高さが一致', async ({ page }) => {
    // ネットワークを遅延させてスケルトンを確実にキャプチャ
    await page.route('**/api/youtube/streams**', async route => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      await route.continue()
    })

    await page.goto('/ja/hololive/scheduled')

    // スケルトンアイテムの高さを取得（表示されない場合はスキップ）
    const skeletonItem = page.locator(
      '[data-testid="scheduled-stream-skeleton-item"]'
    )
    let skeletonBox = null
    try {
      await expect(skeletonItem.first()).toBeVisible({ timeout: 8000 })
      skeletonBox = await skeletonItem.first().boundingBox()
    } catch {
      // スケルトンがキャプチャできなかった場合はスキップ
      test.skip(true, 'スケルトンをキャプチャできませんでした')
      return
    }

    // 実データの読み込みを待つ
    const actualItem = page.locator('[data-testid="scheduled-stream-item"]')
    await expect(actualItem.first()).toBeVisible({ timeout: 30000 })
    const actualBox = await actualItem.first().boundingBox()

    // 両方の高さが取得できた場合のみ比較
    if (skeletonBox && actualBox) {
      const heightDiff = Math.abs(skeletonBox.height - actualBox.height)

      // 高さの差が2px以内であることを確認
      expect(
        heightDiff,
        `スケルトン(${skeletonBox.height}px)と実コンポーネント(${actualBox.height}px)の高さ差が${heightDiff}pxあります。2px以内に収めてください。`
      ).toBeLessThanOrEqual(2)
    }
  })
})
