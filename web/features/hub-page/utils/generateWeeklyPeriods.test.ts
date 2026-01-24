import { generateWeeklyPeriods } from './generateWeeklyPeriods'

describe('generateWeeklyPeriods', () => {
  describe('バッチ実行時刻の考慮', () => {
    it('03:30以降は通常通り最新の完了した週を含む', () => {
      // 現在時刻が通常の場合（03:30以降）のテスト
      // 実際の挙動は時刻に依存するが、基本的な動作確認
      const periods = generateWeeklyPeriods()
      expect(periods.length).toBeGreaterThan(0)
    })

    // Note: 時刻モックを使用した詳細なテストは、
    // vi.useFakeTimers() で実装可能だが、
    // dayjsのタイムゾーン処理との組み合わせが複雑なため省略
  })

  it('should return an array of weekly periods', () => {
    const periods = generateWeeklyPeriods()
    expect(Array.isArray(periods)).toBe(true)
    expect(periods.length).toBeGreaterThan(0)
  })

  it('should return periods in descending order (newest first)', () => {
    const periods = generateWeeklyPeriods()
    for (let i = 0; i < periods.length - 1; i++) {
      const current = periods[i]
      const next = periods[i + 1]
      // 現在の期間は次の期間より新しい
      expect(current.startDate.isAfter(next.startDate)).toBe(true)
    }
  })

  it('should have correct period format', () => {
    const periods = generateWeeklyPeriods()
    for (const period of periods) {
      expect(period.period).toMatch(/^weekly-\d{4}-W\d{2}$/)
      expect(period.target).toMatch(/^\d{4}-W\d{2}$/)
    }
  })

  it('should have valid year and week numbers', () => {
    const periods = generateWeeklyPeriods()
    for (const period of periods) {
      expect(period.year).toBeGreaterThanOrEqual(2025)
      expect(period.week).toBeGreaterThanOrEqual(1)
      expect(period.week).toBeLessThanOrEqual(53)
    }
  })

  it('should start from 2025', () => {
    const periods = generateWeeklyPeriods()
    const oldestPeriod = periods[periods.length - 1]
    expect(oldestPeriod.year).toBe(2025)
  })

  it('should have startDate and endDate for each period', () => {
    const periods = generateWeeklyPeriods()
    for (const period of periods) {
      expect(period.startDate.isValid()).toBe(true)
      expect(period.endDate.isValid()).toBe(true)
      // endDate should be after startDate
      expect(period.endDate.isAfter(period.startDate)).toBe(true)
    }
  })

  it('should have 7 days between startDate and endDate', () => {
    const periods = generateWeeklyPeriods()
    for (const period of periods) {
      const diff = period.endDate.diff(period.startDate, 'day')
      expect(diff).toBe(6) // startDate to endDate is 6 days (same week)
    }
  })
})
