import * as fc from 'fast-check'
import { GroupId } from './GroupId.vo'

/**
 * Feature: group-database-migration, Property 1: Group ID 一意性と形式検証
 * Validates: Requirements 1.5, 3.2, 3.3, 4.2
 */
describe('GroupId Value Object', () => {
  describe('Property-based tests', () => {
    it('should accept valid group IDs (lowercase alphanumeric and hyphens)', () => {
      fc.assert(
        fc.property(fc.stringMatching(/^[a-z0-9-]+$/), validId => {
          fc.pre(validId.length > 0) // Ensure non-empty string
          expect(() => new GroupId(validId)).not.toThrow()
          const groupId = new GroupId(validId)
          expect(groupId.get()).toBe(validId)
        }),
        { numRuns: 100 }
      )
    })

    it('should reject invalid group IDs (containing uppercase, special chars, or empty)', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            // Empty string
            fc.constant(''),
            // Contains uppercase letters
            fc.stringMatching(/.*[A-Z].*/),
            // Contains special characters (not hyphen)
            fc.stringMatching(/.*[^a-z0-9-].*/),
            // Contains spaces
            fc.stringMatching(/.* .*/),
            // Contains underscores
            fc.stringMatching(/.*_.*/),
            // Contains dots
            fc.stringMatching(/.*\..*/)
          ),
          invalidId => {
            expect(() => new GroupId(invalidId)).toThrow()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should maintain equality for same values', () => {
      fc.assert(
        fc.property(
          fc.stringMatching(/^[a-z0-9-]+$/).filter(s => s.length > 0),
          validId => {
            const groupId1 = new GroupId(validId)
            const groupId2 = new GroupId(validId)
            expect(groupId1.equals(groupId2)).toBe(true)
            expect(groupId1.get()).toBe(groupId2.get())
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should not be equal for different values', () => {
      fc.assert(
        fc.property(
          fc
            .tuple(
              fc.stringMatching(/^[a-z0-9-]+$/).filter(s => s.length > 0),
              fc.stringMatching(/^[a-z0-9-]+$/).filter(s => s.length > 0)
            )
            .filter(([id1, id2]) => id1 !== id2),
          ([id1, id2]) => {
            const groupId1 = new GroupId(id1)
            const groupId2 = new GroupId(id2)
            expect(groupId1.equals(groupId2)).toBe(false)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Unit tests for specific cases', () => {
    it('should accept valid examples', () => {
      const validIds = [
        'hololive',
        'nijisanji',
        'vspo',
        'test-group',
        'group123',
        'a',
        '1',
        'a-b-c-1-2-3'
      ]

      validIds.forEach(id => {
        expect(() => new GroupId(id)).not.toThrow()
        const groupId = new GroupId(id)
        expect(groupId.get()).toBe(id)
      })
    })

    it('should reject invalid examples', () => {
      const invalidIds = [
        '', // empty
        'Hololive', // uppercase
        'holo live', // space
        'holo_live', // underscore
        'holo.live', // dot
        'holo@live', // special char
        'ホロライブ', // non-ascii
        '123!', // exclamation
        'test#group' // hash
      ]

      invalidIds.forEach(id => {
        expect(() => new GroupId(id)).toThrow()
      })
    })
  })
})
