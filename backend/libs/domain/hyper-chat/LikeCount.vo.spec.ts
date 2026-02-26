import { LikeCount } from './LikeCount.vo'

describe('LikeCount Value Object', () => {
  describe('valid like counts', () => {
    it('should accept zero', () => {
      const count = new LikeCount(0)
      expect(count.get()).toBe(0)
    })

    it('should accept positive integers', () => {
      const validCounts = [1, 10, 100, 1000, 999999]

      validCounts.forEach(val => {
        expect(() => new LikeCount(val)).not.toThrow()
        const count = new LikeCount(val)
        expect(count.get()).toBe(val)
      })
    })
  })

  describe('invalid like counts', () => {
    it('should reject negative numbers', () => {
      const invalidCounts = [-1, -10, -100]

      invalidCounts.forEach(val => {
        expect(() => new LikeCount(val)).toThrow()
      })
    })

    it('should reject non-integer values', () => {
      const invalidCounts = [0.5, 1.5, 10.1]

      invalidCounts.forEach(val => {
        expect(() => new LikeCount(val)).toThrow()
      })
    })
  })

  describe('equality', () => {
    it('should be equal for same values', () => {
      const count1 = new LikeCount(5)
      const count2 = new LikeCount(5)
      expect(count1.equals(count2)).toBe(true)
    })

    it('should not be equal for different values', () => {
      const count1 = new LikeCount(5)
      const count2 = new LikeCount(10)
      expect(count1.equals(count2)).toBe(false)
    })
  })
})
