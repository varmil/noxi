import { Milestone } from './Milestone.vo'

describe('Milestone', () => {
  describe('calculateAchieved', () => {
    it('0人 → 空', () => {
      const result = Milestone.calculateAchieved(0)
      expect([...result]).toHaveLength(0)
    })

    it('9999人 → 空', () => {
      const result = Milestone.calculateAchieved(9999)
      expect([...result]).toHaveLength(0)
    })

    it('10000人 → [10000]', () => {
      const result = Milestone.calculateAchieved(10000)
      const values = [...result].map(m => m.get())
      expect(values).toEqual([10000])
    })

    it('55000人 → [10000, 20000, 30000, 40000, 50000]', () => {
      const result = Milestone.calculateAchieved(55000)
      const values = [...result].map(m => m.get())
      expect(values).toEqual([10000, 20000, 30000, 40000, 50000])
    })

    it('100000人 → 10件（10000〜100000）', () => {
      const result = Milestone.calculateAchieved(100000)
      const values = [...result].map(m => m.get())
      expect(values).toHaveLength(10)
      expect(values[0]).toBe(10000)
      expect(values[9]).toBe(100000)
    })

    it('150000人 → 10件（200000未到達なので10万まで）', () => {
      const result = Milestone.calculateAchieved(150000)
      const values = [...result].map(m => m.get())
      expect(values).toHaveLength(10)
      expect(values[values.length - 1]).toBe(100000)
    })

    it('300000人 → 12件（10000〜100000 + 200000, 300000）', () => {
      const result = Milestone.calculateAchieved(300000)
      const values = [...result].map(m => m.get())
      expect(values).toHaveLength(12)
      expect(values).toEqual([
        10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
        200000, 300000
      ])
    })
  })

  describe('format', () => {
    it('数値をカンマ区切りでフォーマット', () => {
      const milestone = new Milestone(100000)
      expect(milestone.format()).toBe('100,000')
    })
  })
})
