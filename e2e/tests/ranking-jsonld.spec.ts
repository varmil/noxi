import { test, expect, Page } from '@playwright/test'

/**
 * ランキングページの JSON-LD 構造化データテスト
 *
 * 検証対象:
 * - BreadcrumbList スキーマ
 * - ItemList スキーマ
 */

/** ページから JSON-LD スクリプトを取得してパースする */
async function getJsonLdScripts(page: Page): Promise<Record<string, unknown>[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').all()
  const results: Record<string, unknown>[] = []

  for (const script of scripts) {
    const content = await script.textContent()
    if (content) {
      try {
        results.push(JSON.parse(content))
      } catch {
        // パース失敗は無視
      }
    }
  }

  return results
}

/** 特定の @type を持つ JSON-LD を取得 */
function findJsonLdByType(
  jsonLdList: Record<string, unknown>[],
  type: string
): Record<string, unknown> | undefined {
  return jsonLdList.find(item => item['@type'] === type)
}

test.describe('チャンネルランキング JSON-LD', () => {
  test.describe('BreadcrumbList', () => {
    test('スパチャランキングに BreadcrumbList が含まれる', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels/all/last30Days')

      const jsonLdList = await getJsonLdScripts(page)
      const breadcrumb = findJsonLdByType(jsonLdList, 'BreadcrumbList')

      expect(breadcrumb).toBeDefined()
      expect(breadcrumb!['@context']).toBe('https://schema.org')

      const items = breadcrumb!['itemListElement'] as Record<string, unknown>[]
      expect(items).toHaveLength(3)

      // position 1: dimension
      expect(items[0]['position']).toBe(1)
      expect(items[0]['name']).toContain('スパチャランキング')

      // position 2: group
      expect(items[1]['position']).toBe(2)

      // position 3: period
      expect(items[2]['position']).toBe(3)
    })

    test('登録者数ランキングに BreadcrumbList が含まれる', async ({ page }) => {
      await page.goto('/ja/ranking/subscriber/channels/all/wholePeriod')

      const jsonLdList = await getJsonLdScripts(page)
      const breadcrumb = findJsonLdByType(jsonLdList, 'BreadcrumbList')

      expect(breadcrumb).toBeDefined()

      const items = breadcrumb!['itemListElement'] as Record<string, unknown>[]
      expect(items).toHaveLength(3)
      expect(items[0]['name']).toContain('登録者数ランキング')
    })
  })

  test.describe('ItemList', () => {
    test('スパチャランキングに ItemList が含まれる', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels/all/last30Days')

      const jsonLdList = await getJsonLdScripts(page)
      const itemList = findJsonLdByType(jsonLdList, 'ItemList')

      expect(itemList).toBeDefined()
      expect(itemList!['@context']).toBe('https://schema.org')
      expect(itemList!['itemListOrder']).toBe(
        'https://schema.org/ItemListOrderDescending'
      )
      expect(itemList!['numberOfItems']).toBeGreaterThan(0)

      const items = itemList!['itemListElement'] as Record<string, unknown>[]
      expect(items.length).toBeGreaterThan(0)
      expect(items.length).toBeLessThanOrEqual(20)

      // 最初のアイテムの構造を確認
      const firstItem = items[0]
      expect(firstItem['@type']).toBe('ListItem')
      expect(firstItem['position']).toBe(1)
      expect(firstItem['name']).toBeDefined()
      expect(firstItem['url']).toBeDefined()
    })

    test('2ページ目の position は 21 から始まる', async ({ page }) => {
      await page.goto('/ja/ranking/super-chat/channels/all/last30Days?page=2')

      const jsonLdList = await getJsonLdScripts(page)
      const itemList = findJsonLdByType(jsonLdList, 'ItemList')

      expect(itemList).toBeDefined()

      const items = itemList!['itemListElement'] as Record<string, unknown>[]
      if (items.length > 0) {
        expect(items[0]['position']).toBe(21)
      }
    })
  })
})

test.describe('ライブランキング JSON-LD', () => {
  test.describe('BreadcrumbList', () => {
    test('同接数ランキングに BreadcrumbList が含まれる', async ({ page }) => {
      await page.goto('/ja/ranking/concurrent-viewer/live/all/realtime')

      const jsonLdList = await getJsonLdScripts(page)
      const breadcrumb = findJsonLdByType(jsonLdList, 'BreadcrumbList')

      expect(breadcrumb).toBeDefined()
      expect(breadcrumb!['@context']).toBe('https://schema.org')

      const items = breadcrumb!['itemListElement'] as Record<string, unknown>[]
      expect(items).toHaveLength(3)

      // position 1: dimension (同接数ランキング)
      expect(items[0]['position']).toBe(1)
      expect(items[0]['name']).toContain('同接数ランキング')

      // position 2: group
      expect(items[1]['position']).toBe(2)

      // position 3: period
      expect(items[2]['position']).toBe(3)
    })

    test('ライブ別スパチャランキングに BreadcrumbList が含まれる', async ({
      page
    }) => {
      await page.goto('/ja/ranking/super-chat/live/all/last30Days')

      const jsonLdList = await getJsonLdScripts(page)
      const breadcrumb = findJsonLdByType(jsonLdList, 'BreadcrumbList')

      expect(breadcrumb).toBeDefined()

      const items = breadcrumb!['itemListElement'] as Record<string, unknown>[]
      expect(items).toHaveLength(3)

      // position 1: dimension (【ライブ別】スパチャランキング)
      expect(items[0]['name']).toContain('ライブ別')
    })
  })

  test.describe('ItemList', () => {
    test('同接数ランキングに ItemList が含まれる', async ({ page }) => {
      await page.goto('/ja/ranking/concurrent-viewer/live/all/last30Days')

      const jsonLdList = await getJsonLdScripts(page)
      const itemList = findJsonLdByType(jsonLdList, 'ItemList')

      expect(itemList).toBeDefined()
      expect(itemList!['@context']).toBe('https://schema.org')
      expect(itemList!['itemListOrder']).toBe(
        'https://schema.org/ItemListOrderDescending'
      )

      const items = itemList!['itemListElement'] as Record<string, unknown>[]
      expect(items.length).toBeLessThanOrEqual(20)

      // アイテムが存在する場合、構造を確認
      if (items.length > 0) {
        const firstItem = items[0]
        expect(firstItem['@type']).toBe('ListItem')
        expect(firstItem['position']).toBe(1)
        expect(firstItem['name']).toBeDefined()
        expect(firstItem['url']).toContain('/youtube/live/')
      }
    })
  })
})
