import { formatSnapshotPeriod } from 'utils/period/snapshot-period'
import { formatWeeklyPeriodSplit } from './formatSnapshotPeriod'

describe('formatSnapshotPeriod', () => {
  describe('weekly periods', () => {
    it('should format weekly period for ja locale', () => {
      const result = formatSnapshotPeriod('weekly-2025-W01', 'ja')
      expect(result).toMatch(/2025年第1週/)
      expect(result).toMatch(/\d+\/\d+ ~ \d+\/\d+/)
    })

    it('should format weekly period for en locale', () => {
      const result = formatSnapshotPeriod('weekly-2025-W01', 'en')
      expect(result).toMatch(/Week 1, 2025/)
      expect(result).toMatch(/\d+\/\d+ ~ \d+\/\d+/)
    })

    it('should handle week 52', () => {
      const result = formatSnapshotPeriod('weekly-2025-W52', 'ja')
      expect(result).toMatch(/2025年第52週/)
    })
  })

  describe('monthly periods', () => {
    it('should format monthly period for ja locale', () => {
      const result = formatSnapshotPeriod('monthly-2025-07', 'ja')
      expect(result).toBe('2025年7月')
    })

    it('should format monthly period for en locale', () => {
      const result = formatSnapshotPeriod('monthly-2025-07', 'en')
      expect(result).toBe('July 2025')
    })

    it('should format December correctly', () => {
      expect(formatSnapshotPeriod('monthly-2025-12', 'ja')).toBe('2025年12月')
      expect(formatSnapshotPeriod('monthly-2025-12', 'en')).toBe('December 2025')
    })

    it('should format January correctly', () => {
      expect(formatSnapshotPeriod('monthly-2025-01', 'ja')).toBe('2025年1月')
      expect(formatSnapshotPeriod('monthly-2025-01', 'en')).toBe('January 2025')
    })
  })

  describe('non-snapshot periods', () => {
    it('should return undefined for non-snapshot periods', () => {
      expect(formatSnapshotPeriod('last24Hours', 'ja')).toBeUndefined()
      expect(formatSnapshotPeriod('last30Days', 'ja')).toBeUndefined()
      expect(formatSnapshotPeriod('thisYear', 'ja')).toBeUndefined()
    })
  })
})

describe('formatWeeklyPeriodSplit', () => {
  describe('weekly periods', () => {
    it('should split weekly period into title and subtitle for ja locale', () => {
      const result = formatWeeklyPeriodSplit('weekly-2025-W48', 'ja')
      expect(result).toBeDefined()
      expect(result?.title).toBe('2025年第48週')
      expect(result?.subtitle).toMatch(/\d+\/\d+ ~ \d+\/\d+/)
    })

    it('should split weekly period into title and subtitle for en locale', () => {
      const result = formatWeeklyPeriodSplit('weekly-2025-W48', 'en')
      expect(result).toBeDefined()
      expect(result?.title).toBe('Week 48, 2025')
      expect(result?.subtitle).toMatch(/\d+\/\d+ ~ \d+\/\d+/)
    })

    it('should return correct date range in subtitle', () => {
      // Week 1 of 2025 starts on Monday 2024-12-30 (ISO week)
      const result = formatWeeklyPeriodSplit('weekly-2025-W01', 'ja')
      expect(result).toBeDefined()
      // The date range should be 7 days
      expect(result?.subtitle).toMatch(/\d+\/\d+ ~ \d+\/\d+/)
    })
  })

  describe('non-weekly periods', () => {
    it('should return undefined for monthly periods', () => {
      const result = formatWeeklyPeriodSplit('monthly-2025-07', 'ja')
      expect(result).toBeUndefined()
    })

    it('should return undefined for non-snapshot periods', () => {
      expect(formatWeeklyPeriodSplit('last24Hours', 'ja')).toBeUndefined()
      expect(formatWeeklyPeriodSplit('last30Days', 'ja')).toBeUndefined()
    })
  })
})
