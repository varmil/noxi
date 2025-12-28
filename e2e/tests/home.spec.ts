import { test, expect } from '@playwright/test'

test.describe('トップページ', () => {
  test('ページが正常に表示される', async ({ page }) => {
    await page.goto('/ja')

    // タイトルに VCharts が含まれることを確認
    await expect(page).toHaveTitle(/VCharts/)
  })

  test('ヘッダーのロゴが表示される', async ({ page }) => {
    await page.goto('/ja')

    // ヘッダーに VCharts ロゴが存在することを確認
    await expect(
      page.locator('header').getByText('VCharts').first()
    ).toBeVisible()
  })

  test('ナビゲーションメニューが表示される', async ({ page }) => {
    await page.goto('/ja')

    // ナビゲーションリンクが存在することを確認
    await expect(page.getByRole('link', { name: '同接数' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'スパチャ金額' })).toBeVisible()
  })

  test('ライブ統計が表示される', async ({ page }) => {
    await page.goto('/ja')

    // ライブ統計セクションが表示されることを確認
    await expect(page.getByText('ライブ中')).toBeVisible()
    await expect(page.getByText('現在の総同接数')).toBeVisible()
  })
})
