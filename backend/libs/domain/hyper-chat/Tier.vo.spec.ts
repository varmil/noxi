import { Tier, TIERS, TIER_CONFIG } from './Tier.vo'

describe('Tier Value Object', () => {
  describe('valid tiers', () => {
    it('should accept all valid tier values', () => {
      TIERS.forEach(tierValue => {
        expect(() => new Tier(tierValue)).not.toThrow()
        const tier = new Tier(tierValue)
        expect(tier.get()).toBe(tierValue)
      })
    })
  })

  describe('invalid tiers', () => {
    it('should reject invalid tier values', () => {
      const invalidTiers = ['basic', 'premium', 'ultra', 'LITE', 'Standard', '']

      invalidTiers.forEach(val => {
        expect(() => new Tier(val as 'lite')).toThrow()
      })
    })
  })

  describe('tier configuration accessors', () => {
    it('should return correct price for lite tier', () => {
      const tier = new Tier('lite')
      expect(tier.getPrice()).toBe(TIER_CONFIG.lite.price)
      expect(tier.getPrice()).toBe(300)
    })

    it('should return correct price for standard tier', () => {
      const tier = new Tier('standard')
      expect(tier.getPrice()).toBe(TIER_CONFIG.standard.price)
      expect(tier.getPrice()).toBe(1000)
    })

    it('should return correct price for max tier', () => {
      const tier = new Tier('max')
      expect(tier.getPrice()).toBe(TIER_CONFIG.max.price)
      expect(tier.getPrice()).toBe(10000)
    })

    it('should return correct maxChars for each tier', () => {
      expect(new Tier('lite').getMaxChars()).toBe(60)
      expect(new Tier('standard').getMaxChars()).toBe(140)
      expect(new Tier('max').getMaxChars()).toBe(300)
    })

    it('should return correct rotationSlots for each tier', () => {
      expect(new Tier('lite').getRotationSlots()).toBe(1)
      expect(new Tier('standard').getRotationSlots()).toBe(4)
      expect(new Tier('max').getRotationSlots()).toBe(60)
    })
  })

  describe('equality', () => {
    it('should be equal for same tier values', () => {
      const tier1 = new Tier('standard')
      const tier2 = new Tier('standard')
      expect(tier1.equals(tier2)).toBe(true)
    })

    it('should not be equal for different tier values', () => {
      const tier1 = new Tier('lite')
      const tier2 = new Tier('max')
      expect(tier1.equals(tier2)).toBe(false)
    })
  })
})
