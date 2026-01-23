import { test, expect } from '@playwright/test'

/**
 * スパチャランキングインデックスページのテスト
 * URL: /ranking/super-chat/channels
 *
 * テストパターン:
 * - ページ基本表示
 * - グループフィルター動作
 * - 「もっと見る」ボタンによる遅延読み込み
 * - 各期間へのナビゲーション
 */

test.describe('スパチャランキングインデックスページ', () => {
  test.describe('基本表示', () => {
    test('ページが正常に表示される', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      await expect(page).toHaveTitle(/スパチャランキング/)
      await expect(page.locator('main')).toBeVisible()
    })

    test('注目のランキングセクションが表示される', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // 過去24時間、過去30日間、今年のリンクが表示される
      await expect(page.getByRole('link', { name: /過去24時間/ })).toBeVisible()
      await expect(page.getByRole('link', { name: /過去30日間/ })).toBeVisible()
      await expect(page.getByRole('link', { name: /今年/ })).toBeVisible()
    })

    test('月間アーカイブセクションが表示される', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      await expect(page.getByRole('heading', { name: /月間アーカイブ/ })).toBeVisible()
    })

    test('週間アーカイブセクションが表示される', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      await expect(page.getByRole('heading', { name: /週間アーカイブ/ })).toBeVisible()
    })

    test('英語版も正常に表示される', async ({ page }) => {
      await page.goto('/en/ranking/super-chat/channels')

      await expect(page).toHaveTitle(/Super Chat Ranking/)
      await expect(page.locator('main')).toBeVisible()
    })
  })

  test.describe('グループフィルター', () => {
    test('グループフィルターが表示される', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // グループフィルターが存在することを確認
      await expect(page.getByText(/すべてのグループ/)).toBeVisible()
    })

    test('グループを選択するとURLにクエリストリングが付与される', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // グループフィルターのセレクターをクリック
      const filterTrigger = page.getByRole('combobox')
      if (await filterTrigger.isVisible()) {
        await filterTrigger.click()

        // ホロライブを選択
        const hololiveOption = page.getByRole('option', { name: /ホロライブ/ })
        if (await hololiveOption.isVisible()) {
          await hololiveOption.click()

          // URLにgroup=hololiveが含まれることを確認
          await expect(page).toHaveURL(/group=hololive/)
        }
      }
    })
  })

  test.describe('もっと見るボタン', () => {
    test('週間セクションの「もっと見る」ボタンをクリックすると追加データが読み込まれる', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // 週間セクションを特定（週間データは十分な件数がある）
      const weeklySection = page.locator('section').filter({ hasText: /週間アーカイブ/ })

      // 初期表示件数を確認（12件）
      const initialCards = weeklySection.locator('a[href*="/weekly-"]')
      const initialCount = await initialCards.count()

      // もっと見るボタンをクリック
      const showMoreButton = weeklySection.getByRole('button', { name: /もっと見る/ })
      if (await showMoreButton.isVisible()) {
        await showMoreButton.click()

        // ローディング完了を待つ
        await expect(showMoreButton).not.toContainText('Loading')

        // カード数が増加していることを確認
        const newCount = await initialCards.count()
        expect(newCount).toBeGreaterThan(initialCount)
      }
    })

    test('カード数とトータル件数が表示される', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // 月間セクションのヘッダーにカウント表示があることを確認
      // h2要素内の "(12 / 12)" のような形式を確認
      const monthlyHeading = page.getByRole('heading', { name: /月間アーカイブ/ })
      await expect(monthlyHeading).toBeVisible()
      await expect(monthlyHeading).toContainText(/\(\d+ \/ \d+\)/)
    })
  })

  test.describe('ナビゲーション', () => {
    test('注目のランキングから詳細ページへ遷移できる', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // 過去24時間のリンクをクリック
      await page.getByRole('link', { name: /過去24時間/ }).click()

      // 詳細ページに遷移したことを確認
      await expect(page).toHaveURL(/\/ranking\/super-chat\/channels\/all\/last24Hours/)
    })

    test('月間カードから詳細ページへ遷移できる', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // 月間セクションの最初のカードをクリック
      const monthlySection = page.locator('section').filter({ hasText: /月間アーカイブ/ })
      const firstCard = monthlySection.locator('a[href*="/monthly-"]').first()

      if (await firstCard.isVisible()) {
        await firstCard.click()

        // 詳細ページに遷移したことを確認（URLにmonthly-が含まれる）
        await expect(page).toHaveURL(/\/ranking\/super-chat\/channels\/.*\/monthly-\d{4}-\d{2}/)
      }
    })

    test('週間カードから詳細ページへ遷移できる', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels')

      // 週間セクションの最初のカードをクリック
      const weeklySection = page.locator('section').filter({ hasText: /週間アーカイブ/ })
      const firstCard = weeklySection.locator('a[href*="/weekly-"]').first()

      if (await firstCard.isVisible()) {
        await firstCard.click()

        // 詳細ページに遷移したことを確認（URLにweekly-が含まれる）
        await expect(page).toHaveURL(/\/ranking\/super-chat\/channels\/.*\/weekly-\d{4}-W\d{2}/)
      }
    })
  })

  test.describe('詳細ページからの戻りリンク', () => {
    test('詳細ページのパンくずからインデックスページに戻れる', async ({ page }) => {
      // 詳細ページにアクセス
      await page.goto('/ja/ranking/super-chat/channels/all/last24Hours')

      // パンくずのスパチャランキングリンクをクリック
      const breadcrumb = page.getByRole('navigation', { name: /パンくず|breadcrumb/i })
      const hubLink = breadcrumb.getByRole('link', { name: /スパチャランキング/ })

      if (await hubLink.isVisible()) {
        await hubLink.click()

        // インデックスページに遷移したことを確認
        await expect(page).toHaveURL(/\/ranking\/super-chat\/channels$/)
      }
    })

    test('グループ指定時は詳細ページのパンくずにグループが引き継がれる', async ({ page }) => {
      // ホロライブの詳細ページにアクセス
      await page.goto('/ja/ranking/super-chat/channels/hololive/last24Hours')

      // パンくずのスパチャランキングリンクを確認
      const breadcrumb = page.getByRole('navigation', { name: /パンくず|breadcrumb/i })
      const hubLink = breadcrumb.getByRole('link', { name: /スパチャランキング/ })

      if (await hubLink.isVisible()) {
        const href = await hubLink.getAttribute('href')
        // hrefにgroup=hololiveが含まれることを確認
        expect(href).toContain('group=hololive')
      }
    })
  })
})
