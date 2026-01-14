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
  test('BreadcrumbList が含まれる', async ({ page }) => {
    await page.goto('/ja/ranking/super-chat/channels/all/last30Days')

    const jsonLdList = await getJsonLdScripts(page)
    const breadcrumb = findJsonLdByType(jsonLdList, 'BreadcrumbList')

    expect(breadcrumb).toBeDefined()
    expect(breadcrumb!['@context']).toBe('https://schema.org')

    const items = breadcrumb!['itemListElement'] as Record<string, unknown>[]
    expect(items.length).toBeGreaterThanOrEqual(1)
    expect(items[0]['@type']).toBe('ListItem')
    expect(items[0]['position']).toBe(1)
    expect(items[0]['name']).toBeDefined()
    expect(items[0]['item']).toBeDefined()
  })

  test('ItemList が含まれる', async ({ page }) => {
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
})

test.describe('ライブランキング JSON-LD', () => {
  test('BreadcrumbList が含まれる', async ({ page }) => {
    await page.goto('/ja/ranking/concurrent-viewer/live/all/realtime')

    const jsonLdList = await getJsonLdScripts(page)
    const breadcrumb = findJsonLdByType(jsonLdList, 'BreadcrumbList')

    expect(breadcrumb).toBeDefined()
    expect(breadcrumb!['@context']).toBe('https://schema.org')

    const items = breadcrumb!['itemListElement'] as Record<string, unknown>[]
    expect(items.length).toBeGreaterThanOrEqual(1)
    expect(items[0]['@type']).toBe('ListItem')
    expect(items[0]['position']).toBe(1)
    expect(items[0]['name']).toBeDefined()
  })

  test('ItemList に VideoObject + author 構造が含まれる', async ({ page }) => {
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

    // アイテムが存在する場合、VideoObject + author 構造を確認
    if (items.length > 0) {
      const firstItem = items[0]
      expect(firstItem['@type']).toBe('ListItem')
      expect(firstItem['position']).toBe(1)

      // item プロパティに VideoObject がネストされている
      const videoObject = firstItem['item'] as Record<string, unknown>
      expect(videoObject).toBeDefined()
      expect(videoObject['@type']).toBe('VideoObject')
      expect(videoObject['name']).toBeDefined()
      expect(videoObject['url']).toContain('/youtube/live/')
      expect(videoObject['thumbnailUrl']).toBeDefined()

      // author に Person（チャンネル情報）が含まれる
      const author = videoObject['author'] as Record<string, unknown>
      if (author) {
        expect(author['@type']).toBe('Person')
        expect(author['name']).toBeDefined()
        expect(author['url']).toContain('/channels/')
      }
    }
  })
})
