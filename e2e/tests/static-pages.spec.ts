import { test, expect } from '@playwright/test'

/**
 * 静的ページのテスト
 * フォーム、法的情報、申請ページなど
 */

test.describe('静的ページ', () => {
  test('お問い合わせ (/contact)', async ({ page }) => {
    await page.goto('/ja/contact')

    await expect(page).toHaveTitle(/お問い合わせ/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('チャンネル登録申請 (/channels/add)', async ({ page }) => {
    await page.goto('/ja/channels/add')

    await expect(page).toHaveTitle(/チャンネル/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('グループ登録申請 (/groups/add)', async ({ page }) => {
    await page.goto('/ja/groups/add')

    await expect(page).toHaveTitle(/Group登録/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('データ算出方法と免責事項 (/data-methodology-and-disclaimer)', async ({
    page
  }) => {
    await page.goto('/ja/data-methodology-and-disclaimer')

    await expect(page).toHaveTitle(/データ算出方法/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('利用規約とプライバシーポリシー (/terms-of-use-and-privacy-policy)', async ({
    page
  }) => {
    await page.goto('/ja/terms-of-use-and-privacy-policy')

    await expect(page).toHaveTitle(/Terms of Use|Privacy Policy/)
    await expect(page.locator('main')).toBeVisible()
  })
})
