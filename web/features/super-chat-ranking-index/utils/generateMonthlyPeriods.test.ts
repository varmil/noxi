import { generateMonthlyPeriods } from './generateMonthlyPeriods'

describe('generateMonthlyPeriods', () => {
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
