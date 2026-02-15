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
      const invalidTiers = ['basic', 'max', 'ultra', 'LITE', 'Standard', '']

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

    it('should return correct price for premium tier', () => {
      const tier = new Tier('premium')
      expect(tier.getPrice()).toBe(TIER_CONFIG.premium.price)
      expect(tier.getPrice()).toBe(3000)
    })

    it('should return correct price for special tier', () => {
      const tier = new Tier('special')
      expect(tier.getPrice()).toBe(TIER_CONFIG.special.price)
      expect(tier.getPrice()).toBe(10000)
    })

    it('should return correct maxChars for each tier', () => {
      expect(new Tier('lite').getMaxChars()).toBe(60)
      expect(new Tier('standard').getMaxChars()).toBe(140)
      expect(new Tier('premium').getMaxChars()).toBe(200)
      expect(new Tier('special').getMaxChars()).toBe(300)
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
      const tier2 = new Tier('special')
      expect(tier1.equals(tier2)).toBe(false)
    })
  })
})
