import { StripePaymentId } from './StripePaymentId.vo'

describe('StripePaymentId Value Object', () => {
  describe('valid payment IDs', () => {
    it('should accept valid Stripe payment intent IDs starting with pi_', () => {
      const validIds = [
        'pi_1234567890',
        'pi_abcdefghij',
        'pi_1MtGwLBN4NHcwlcOqGd2',
        'pi_3NkCLpLkdIwHxrKY0Vj2XjPt'
      ]

      validIds.forEach(id => {
        expect(() => new StripePaymentId(id)).not.toThrow()
        const paymentId = new StripePaymentId(id)
        expect(paymentId.get()).toBe(id)
      })
    })
  })

  describe('invalid payment IDs', () => {
    it('should reject empty string', () => {
      expect(() => new StripePaymentId('')).toThrow()
    })

    it('should reject IDs not starting with pi_', () => {
      const invalidIds = [
        'cs_test_1234', // checkout session
        'sub_1234', // subscription
        'ch_1234', // charge
        'in_1234', // invoice
        'pm_1234', // payment method
        '1234567890', // no prefix
        'PI_1234', // uppercase
        'payment_intent_1234' // wrong prefix
      ]

      invalidIds.forEach(id => {
        expect(() => new StripePaymentId(id)).toThrow()
      })
    })
  })

  describe('equality', () => {
    it('should be equal for same values', () => {
      const id1 = new StripePaymentId('pi_test123')
      const id2 = new StripePaymentId('pi_test123')
      expect(id1.equals(id2)).toBe(true)
    })

    it('should not be equal for different values', () => {
      const id1 = new StripePaymentId('pi_test123')
      const id2 = new StripePaymentId('pi_test456')
      expect(id1.equals(id2)).toBe(false)
    })
  })
})
