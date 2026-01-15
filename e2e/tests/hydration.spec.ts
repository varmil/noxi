import { test, expect, ConsoleMessage } from '@playwright/test'

/**
 * ハイドレーションエラーのテスト
 *
 * React のハイドレーションエラーはコンソールに出力されるので、
 * ページを開いてコンソールエラーを監視することで検出する。
 */

/** ハイドレーションエラーを示すキーワード */
const HYDRATION_ERROR_PATTERNS = [
  'Hydration failed',
  'Text content does not match',
  'There was an error while hydrating',
  'Hydration mismatch'
]

/** コンソールメッセージがハイドレーションエラーかどうか判定 */
function isHydrationError(msg: ConsoleMessage): boolean {
  if (msg.type() !== 'error') return false
  const text = msg.text()
  return HYDRATION_ERROR_PATTERNS.some(pattern => text.includes(pattern))
}

test.describe('ハイドレーションエラーがないこと', () => {
  test.describe('チャンネルランキング - 期間別', () => {
    const periods = [
      'last24Hours',
      'last7Days',
      'last30Days',
      'thisWeek',
      'thisMonth',
      'thisYear'
    ]

    for (const period of periods) {
      test(`スパチャランキング - ${period}`, async ({ page }) => {
        const errors: string[] = []

        page.on('console', msg => {
          if (isHydrationError(msg)) {
            errors.push(msg.text())
          }
        })

        await page.goto(`/ja/ranking/super-chat/channels/all/${period}`)
        await expect(page.locator('main')).toBeVisible()

        // ハイドレーション完了を待つ
        await page.waitForTimeout(1000)

        expect(errors, `ハイドレーションエラーが発生: ${errors.join('\n')}`).toHaveLength(0)
      })
    }
  })
})
