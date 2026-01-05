import { test, expect } from '@playwright/test'

/**
 * チャンネルランキングページのテスト
 * URL: /ranking/[dimension]/channels/[group]/[period]
 *
 * テストパターン（代表的なケースに絞る）:
 * - dimension: super-chat, subscriber
 * - group: all, nijisanji, independent
 * - period: last24Hours, last30Days, wholePeriod(subscriber用)
 */

test.describe('チャンネルランキング', () => {
  test.describe('スパチャランキング (super-chat)', () => {
    test('全グループ - 過去24時間', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels/all/last24Hours')

      await expect(page).toHaveTitle(/スパチャランキング/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('にじさんじ - 過去30日間', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels/nijisanji/last30Days')

      await expect(page).toHaveTitle(/スパチャランキング/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('個人勢 - 過去30日間', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels/independent/last30Days')

      await expect(page).toHaveTitle(/スパチャランキング/)
      await expect(page.locator('main')).toBeVisible()
    })
  })

  test.describe('登録者数ランキング (subscriber)', () => {
    test('全グループ - 全期間', async ({ page }) => {
      await page.goto('/ja/ranking/subscriber/channels/all/wholePeriod')

      await expect(page).toHaveTitle(/登録者数ランキング/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('にじさんじ - 全期間', async ({ page }) => {
      await page.goto('/ja/ranking/subscriber/channels/nijisanji/wholePeriod')

      await expect(page).toHaveTitle(/登録者数ランキング/)
      await expect(page.locator('main')).toBeVisible()
    })
  })

  test.describe('週間スナップショットランキング (weekly)', () => {
    test('ホロライブ - 2025年第52週', async ({ page }) => {
      await page.goto(
        '/ja/ranking/super-chat/channels/hololive/weekly-2025-W52'
      )

      // タイトルに「2025年第52週」が含まれることを確認
      await expect(page).toHaveTitle(/2025年第52週/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('にじさんじ - 2025年第52週', async ({ page }) => {
      await page.goto(
        '/ja/ranking/super-chat/channels/nijisanji/weekly-2025-W52'
      )

      await expect(page).toHaveTitle(/2025年第52週/)
      await expect(page.locator('main')).toBeVisible()
    })
  })

  test.describe('月間スナップショットランキング (monthly)', () => {
    test('ホロライブ - 2025年12月', async ({ page }) => {
      await page.goto(
        '/ja/ranking/super-chat/channels/hololive/monthly-2025-12'
      )

      // タイトルに「2025年12月」が含まれることを確認
      await expect(page).toHaveTitle(/2025年12月/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('にじさんじ - 2025年12月', async ({ page }) => {
      await page.goto(
        '/ja/ranking/super-chat/channels/nijisanji/monthly-2025-12'
      )

      await expect(page).toHaveTitle(/2025年12月/)
      await expect(page.locator('main')).toBeVisible()
    })
  })
})
