import { test, expect } from '@playwright/test'

/**
 * グループ一覧ページ (/groups) のテスト
 */

test.describe('グループ一覧ページ', () => {
  test('ページが正常に表示される', async ({ page }) => {
    await page.goto('/ja/groups')

    await expect(page).toHaveTitle(/グループ一覧/)
    await expect(page.locator('main')).toBeVisible()
    // 検索入力欄が表示される
    await expect(
      page.locator('main').getByPlaceholder('YouTubeチャンネル名を入力')
    ).toBeVisible()
  })

  test('YouTubeチャンネル検索 - 日本語', async ({ page }) => {
    await page.goto('/ja/groups')

    const searchInput = page
      .locator('main')
      .getByPlaceholder('YouTubeチャンネル名を入力')
    await searchInput.fill('さくら')

    // debounce + API 応答を待機
    await expect(page.getByText('検索結果')).toBeVisible({ timeout: 10000 })
  })

  test('YouTubeチャンネル検索 - 英語', async ({ page }) => {
    await page.goto('/ja/groups')

    const searchInput = page
      .locator('main')
      .getByPlaceholder('YouTubeチャンネル名を入力')
    await searchInput.fill('neko')

    // debounce + API 応答を待機
    await expect(page.getByText('検索結果')).toBeVisible({ timeout: 10000 })
  })
})
