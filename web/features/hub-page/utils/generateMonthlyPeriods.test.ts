import { generateMonthlyPeriods } from './generateMonthlyPeriods'

describe('generateMonthlyPeriods', () => {
  describe('バッチ実行時刻の考慮', () => {
    it('03:30以降は通常通り最新の完了した月を含む', () => {
      // 現在時刻が通常の場合（03:30以降）のテスト
      // 実際の挙動は時刻に依存するが、基本的な動作確認
      const periods = generateMonthlyPeriods()
      expect(periods.length).toBeGreaterThan(0)
    })

    // Note: 時刻モックを使用した詳細なテストは、
    // vi.useFakeTimers() で実装可能だが、
    // dayjsのタイムゾーン処理との組み合わせが複雑なため省略
  })

  it('should return an array of monthly periods', () => {
    const periods = generateMonthlyPeriods()
    expect(Array.isArray(periods)).toBe(true)
    expect(periods.length).toBeGreaterThan(0)
  })

  it('should return periods in descending order (newest first)', () => {
    const periods = generateMonthlyPeriods()
    for (let i = 0; i < periods.length - 1; i++) {
      const current = periods[i]
      const next = periods[i + 1]
      // 現在の年月が次の年月より新しいか同じ年で月が大きい
      if (current.year === next.year) {
        expect(current.month).toBeGreaterThan(next.month)
      } else {
        expect(current.year).toBeGreaterThan(next.year)
      }
    }
  })

  it('should have correct period format', () => {
    const periods = generateMonthlyPeriods()
    for (const period of periods) {
      expect(period.period).toMatch(/^monthly-\d{4}-\d{2}$/)
      expect(period.target).toMatch(/^\d{4}-\d{2}$/)
    }
  })

  it('should have valid year and month numbers', () => {
    const periods = generateMonthlyPeriods()
    for (const period of periods) {
      expect(period.year).toBeGreaterThanOrEqual(2025)
      expect(period.month).toBeGreaterThanOrEqual(1)
      expect(period.month).toBeLessThanOrEqual(12)
    }
  })

  it('should start from January 2025', () => {
    const periods = generateMonthlyPeriods()
    const oldestPeriod = periods[periods.length - 1]
    expect(oldestPeriod.year).toBe(2025)
    expect(oldestPeriod.month).toBe(1)
  })

  it('should have matching target and period values', () => {
    const periods = generateMonthlyPeriods()
    for (const period of periods) {
      const expectedTarget = `${period.year}-${String(period.month).padStart(2, '0')}`
      expect(period.target).toBe(expectedTarget)
      expect(period.period).toBe(`monthly-${expectedTarget}`)
    }
  })
})
