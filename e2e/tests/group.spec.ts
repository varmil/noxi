import { test, expect } from '@playwright/test'

/**
 * グループページのテスト
 * URL: /[group]
 *
 * テストパターン（代表的なケースに絞る）:
 * - group: nijisanji, independent
 */

test.describe('グループページ', () => {
  test('にじさんじ', async ({ page }) => {
    await page.goto('/ja/nijisanji')

    await expect(page).toHaveTitle(/にじさんじ/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('個人勢', async ({ page }) => {
    await page.goto('/ja/independent')

    await expect(page).toHaveTitle(/個人勢/)
    await expect(page.locator('main')).toBeVisible()
  })
})

test.describe('グループ配下ページ - にじさんじ', () => {
  test('チャンネル一覧 (charts/channels)', async ({ page }) => {
    await page.goto('/ja/nijisanji/charts/channels')

    await expect(page).toHaveTitle(/にじさんじ/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('配信中 (live)', async ({ page }) => {
    await page.goto('/ja/nijisanji/live')

    await expect(page).toHaveTitle(/にじさんじ/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('配信スケジュール (scheduled)', async ({ page }) => {
    await page.goto('/ja/nijisanji/scheduled')

    await expect(page).toHaveTitle(/にじさんじ/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('過去のライブ (ended)', async ({ page }) => {
    await page.goto('/ja/nijisanji/ended')

    await expect(page).toHaveTitle(/にじさんじ/)
    await expect(page.locator('main')).toBeVisible()
  })
})
