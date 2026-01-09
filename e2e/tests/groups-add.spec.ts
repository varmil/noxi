import { test, expect } from '@playwright/test'

/**
 * グループ追加ページ (/groups/add) のテスト
 * ImagePreview コンポーネントのデバッグ用
 */

test.describe('グループ追加ページ - ImagePreview', () => {
  test('URLを入力すると画像プレビューが表示される', async ({ page }) => {
    await page.goto('/ja/groups/add')

    // ページが表示されることを確認
    await expect(page.locator('main')).toBeVisible()

    // アイコンURL入力欄を取得
    const iconSrcInput = page.getByPlaceholder('https://example.com/icon.png')
    await expect(iconSrcInput).toBeVisible()

    // 有効な画像URLを入力（GitHub のロゴを使用）
    const testImageUrl =
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    await iconSrcInput.fill(testImageUrl)

    // ローディングスピナーが表示されることを確認
    const spinner = page.locator('.animate-spin')
    await expect(spinner).toBeVisible({ timeout: 3000 })

    // 画像が読み込まれ、ローディングスピナーが消えることを確認
    await expect(spinner).not.toBeVisible({ timeout: 10000 })

    // 画像が表示されていることを確認
    const previewImage = page.locator('img[alt="Group icon"]')
    await expect(previewImage).toBeVisible()
  })

  test('URLを変更すると新しい画像が読み込まれる', async ({ page }) => {
    await page.goto('/ja/groups/add')

    const iconSrcInput = page.getByPlaceholder('https://example.com/icon.png')

    // 最初の画像URL
    await iconSrcInput.fill(
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    )
    const spinner = page.locator('.animate-spin')
    await expect(spinner).not.toBeVisible({ timeout: 10000 })

    // 別のURLに変更
    await iconSrcInput.clear()
    await iconSrcInput.fill(
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    )

    // 再度ローディングが始まり、完了することを確認
    await expect(spinner).not.toBeVisible({ timeout: 10000 })

    // 画像が表示されていることを確認
    const previewImage = page.locator('img[alt="Group icon"]')
    await expect(previewImage).toBeVisible()
  })
})
