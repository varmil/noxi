import { test, expect } from '@playwright/test'

/**
 * ライブランキングページのテスト
 * URL: /ranking/[dimension]/live/[group]/[period]
 *
 * テストパターン（代表的なケースに絞る）:
 * - dimension: concurrent-viewer, super-chat
 * - group: all, nijisanji, independent
 * - period: realtime, last30Days
 */

test.describe('ライブランキング', () => {
  test.describe('同接数ランキング (concurrent-viewer)', () => {
    test('全グループ - リアルタイム', async ({ page }) => {
      await page.goto('/ja/ranking/concurrent-viewer/live/all/realtime')

      await expect(page).toHaveTitle(/同接ランキング/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('にじさんじ - 過去30日間', async ({ page }) => {
      await page.goto('/ja/ranking/concurrent-viewer/live/nijisanji/last30Days')

      await expect(page).toHaveTitle(/同接ランキング/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('個人勢 - リアルタイム', async ({ page }) => {
      await page.goto('/ja/ranking/concurrent-viewer/live/independent/realtime')

      await expect(page).toHaveTitle(/同接ランキング/)
      await expect(page.locator('main')).toBeVisible()
    })
  })

  test.describe('スパチャランキング (super-chat)', () => {
    test('全グループ - 過去30日間', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/live/all/last30Days')

      await expect(page).toHaveTitle(/スパチャランキング/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('にじさんじ - リアルタイム', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/live/nijisanji/realtime')

      await expect(page).toHaveTitle(/スパチャランキング/)
      await expect(page.locator('main')).toBeVisible()
    })
  })
})
