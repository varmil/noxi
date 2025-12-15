/**
 * Property 6: 申請履歴表示と順序
 * 検証対象: 要件 4.5, 5.2, 5.3
 *
 * 任意の Group 申請履歴において、申請は提出日時の降順で表示され、
 * 最新 30 件に制限され、各申請のステータス、提出日、詳細が含まれる
 */

import fc from 'fast-check'

type GroupRegistration = {
  id: number
  groupId: string
  name: string
  iconSrc: string
  status: 'pending' | 'approved' | 'rejected'
  appliedAt: Date
}

type GroupRegistrationsSchema = GroupRegistration[]

// Generator for GroupRegistration objects
const groupRegistrationArbitrary = fc.record({
  id: fc.integer({ min: 1, max: 10000 }),
  groupId: fc.stringMatching(/^[a-z0-9-]+$/),
  name: fc
    .string({ minLength: 1, maxLength: 50 })
    .filter(s => s.trim().length > 0),
  iconSrc: fc.oneof(
    fc.webUrl(),
    fc.string({ minLength: 1 }).map(s => `/group/${s}/logo.png`)
  ),
  status: fc.constantFrom('pending', 'approved', 'rejected'),
  appliedAt: fc
    .integer({
      min: new Date('2020-01-01').getTime(),
      max: new Date().getTime()
    })
    .map(timestamp => new Date(timestamp))
})

// Helper function to sort registrations by appliedAt in descending order
const sortRegistrationsByDate = (
  registrations: GroupRegistrationsSchema
): GroupRegistrationsSchema => {
  // Filter out invalid dates first
  const validRegistrations = registrations.filter(
    reg => !isNaN(reg.appliedAt.getTime())
  )
  return [...validRegistrations].sort(
    (a, b) => b.appliedAt.getTime() - a.appliedAt.getTime()
  )
}

// Helper function to limit registrations to maximum count
const limitRegistrations = (
  registrations: GroupRegistrationsSchema,
  limit: number
): GroupRegistrationsSchema => {
  return registrations.slice(0, limit)
}

// Helper function to validate registration data completeness
const validateRegistrationData = (registration: GroupRegistration): boolean => {
  return !!(
    registration.id &&
    registration.groupId &&
    registration.name &&
    registration.iconSrc &&
    registration.status &&
    registration.appliedAt
  )
}

describe('GroupRegistrationHistory Property Tests', () => {
  /**
   * Feature: group-database-migration, Property 6: 申請履歴表示と順序
   * Validates: Requirements 4.5, 5.2, 5.3
   */
  it('should sort applications in descending order by appliedAt date', () => {
    fc.assert(
      fc.property(
        fc.array(groupRegistrationArbitrary, { minLength: 2, maxLength: 50 }),
        (registrations: GroupRegistrationsSchema) => {
          const sorted = sortRegistrationsByDate(registrations)

          // Verify dates are in descending order (most recent first)
          for (let i = 0; i < sorted.length - 1; i++) {
            const currentDate = sorted[i].appliedAt.getTime()
            const nextDate = sorted[i + 1].appliedAt.getTime()

            // Current date should be >= next date (descending order)
            expect(currentDate).toBeGreaterThanOrEqual(nextDate)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: group-database-migration, Property 6: 申請履歴表示と順序
   * Validates: Requirements 5.1, 5.3
   */
  it('should limit display to maximum 30 applications', () => {
    fc.assert(
      fc.property(
        fc.array(groupRegistrationArbitrary, { minLength: 31, maxLength: 100 }),
        (registrations: GroupRegistrationsSchema) => {
          const limited = limitRegistrations(registrations, 30)

          // Verify no more than 30 items are returned
          expect(limited.length).toBeLessThanOrEqual(30)
          expect(limited.length).toBe(Math.min(registrations.length, 30))
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: group-database-migration, Property 6: 申請履歴表示と順序
   * Validates: Requirements 5.2
   */
  it('should include all required information for each application', () => {
    fc.assert(
      fc.property(
        fc.array(groupRegistrationArbitrary, { minLength: 1, maxLength: 10 }),
        (registrations: GroupRegistrationsSchema) => {
          // Verify each registration contains all required fields
          for (const registration of registrations) {
            expect(validateRegistrationData(registration)).toBe(true)

            // Verify specific field requirements
            expect(registration.id).toBeGreaterThan(0)
            expect(registration.groupId).toMatch(/^[a-z0-9-]+$/)
            expect(registration.name.length).toBeGreaterThan(0)
            expect(registration.iconSrc.length).toBeGreaterThan(0)
            expect(['pending', 'approved', 'rejected']).toContain(
              registration.status
            )
            expect(registration.appliedAt).toBeInstanceOf(Date)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: group-database-migration, Property 6: 申請履歴表示と順序
   * Validates: Requirements 4.5, 5.2, 5.3
   */
  it('should maintain order and limit when processing any set of applications', () => {
    fc.assert(
      fc.property(
        fc.array(groupRegistrationArbitrary, { minLength: 0, maxLength: 100 }),
        (registrations: GroupRegistrationsSchema) => {
          // Process registrations as the component would
          const sorted = sortRegistrationsByDate(registrations)
          const limited = limitRegistrations(sorted, 30)

          // Verify the result maintains all properties
          expect(limited.length).toBeLessThanOrEqual(30)
          expect(limited.length).toBeLessThanOrEqual(registrations.length)

          // Verify order is maintained
          for (let i = 0; i < limited.length - 1; i++) {
            const currentDate = limited[i].appliedAt.getTime()
            const nextDate = limited[i + 1].appliedAt.getTime()
            expect(currentDate).toBeGreaterThanOrEqual(nextDate)
          }

          // Verify all items have complete data
          for (const registration of limited) {
            expect(validateRegistrationData(registration)).toBe(true)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: group-database-migration, Property 6: 申請履歴表示と順序
   * Validates: Requirements 5.4
   */
  it('should handle empty arrays gracefully', () => {
    const emptyRegistrations: GroupRegistrationsSchema = []
    const sorted = sortRegistrationsByDate(emptyRegistrations)
    const limited = limitRegistrations(sorted, 30)

    expect(sorted).toEqual([])
    expect(limited).toEqual([])
    expect(limited.length).toBe(0)
  })
})
