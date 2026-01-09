import { test, expect } from '@playwright/test'

test.describe('ヘッダー検索バー', () => {
  test('デスクトップ(1280px)で検索バーが表示される', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/ja')

    const searchInput = page.getByPlaceholder('YouTubeチャンネル名を入力...')
    await expect(searchInput).toBeVisible()

    // 検索バーの幅を確認（flex-1が効いて300px以上あること）
    const searchBox = searchInput.locator(
      'xpath=ancestor::div[contains(@class, "rounded-lg")]'
    )
    const box = await searchBox.boundingBox()
    expect(box?.width).toBeGreaterThan(300)
  })

  test('検索時に検索ボックスの位置が変わらない', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/ja')

    const searchInput = page.getByPlaceholder('YouTubeチャンネル名を入力...')
    await expect(searchInput).toBeVisible()

    // 検索前の位置を記録
    const boxBefore = await searchInput.boundingBox()

    // 検索を実行
    await searchInput.fill('さくら')

    // 検索結果が表示されるまで待機
    await page.waitForTimeout(1500)

    // 検索結果が表示されていることを確認
    await expect(page.getByText('検索結果')).toBeVisible()

    // 検索後の位置を確認
    const boxAfter = await searchInput.boundingBox()

    // 位置が変わっていないことを確認（Y座標が同じ）
    expect(boxAfter?.y).toBe(boxBefore?.y)
  })

  test('タブレット(768px)で検索バーが表示される', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/ja')

    const searchInput = page.getByPlaceholder('YouTubeチャンネル名を入力...')
    await expect(searchInput).toBeVisible()
  })

  test('モバイル(375px)では検索バーが非表示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/ja')

    const searchInput = page.getByPlaceholder('YouTubeチャンネル名を入力...')
    await expect(searchInput).not.toBeVisible()
  })
})
