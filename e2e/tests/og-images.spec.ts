import { test, expect } from '@playwright/test'

/**
 * OGP画像生成のテスト
 * 各エンドポイントが正常に画像を返すことを確認
 */

test.describe('OGP画像生成', () => {
  test.describe('週間ランキング OGP', () => {
    test('ホロライブ - 2025年第52週', async ({ request }) => {
      const response = await request.get(
        '/api/og/weekly-ranking?week=2025-W52&group=hololive'
      )

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toBe('image/png')

      const body = await response.body()
      expect(body.length).toBeGreaterThan(0)
    })

    test('にじさんじ - 女性のみ', async ({ request }) => {
      const response = await request.get(
        '/api/og/weekly-ranking?week=2025-W52&group=nijisanji&gender=female'
      )

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toBe('image/png')
    })
  })

  test.describe('月間ランキング OGP', () => {
    test('ホロライブ - 2025年12月', async ({ request }) => {
      const response = await request.get(
        '/api/og/monthly-ranking?month=2025-12&group=hololive'
      )

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toBe('image/png')

      const body = await response.body()
      expect(body.length).toBeGreaterThan(0)
    })

    test('にじさんじ - 男性のみ', async ({ request }) => {
      const response = await request.get(
        '/api/og/monthly-ranking?month=2025-12&group=nijisanji&gender=male'
      )

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toBe('image/png')
    })
  })

  test.describe('デイリーランキング OGP', () => {
    test('ホロライブ', async ({ request }) => {
      const response = await request.get(
        '/api/og/daily-ranking?group=hololive'
      )

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toBe('image/png')
    })
  })
})
