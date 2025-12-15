/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing'
import * as fc from 'fast-check'
import { GroupRegistrationsService } from '@app/group-registrations/group-registrations.service'
import { GroupId, GroupName, GroupIconSrc } from '@domain/group'
import {
  GroupRegistration,
  GroupRegistrationStatus,
  GroupRegistrationAppliedAt
} from '@domain/group-registration'
import { CreateGroupRegistrationDto } from './dto/CreateGroupRegistration.dto'
import { GetGroupRegistrationsDto } from './dto/GetGroupRegistrations.dto'
import { GroupRegistrationsController } from './group-registrations.controller'

/**
 * Feature: group-database-migration, Property 7: フォーム送信と API 連携
 * Validates: Requirements 4.4, 7.5
 */
describe('GroupRegistrationsController', () => {
  let controller: GroupRegistrationsController
  let service: GroupRegistrationsService

  const mockGroupRegistrationsService = {
    findAll: jest.fn(),
    create: jest.fn(),
    updateStatus: jest.fn()
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupRegistrationsController],
      providers: [
        {
          provide: GroupRegistrationsService,
          useValue: mockGroupRegistrationsService
        }
      ]
    }).compile()

    controller = module.get<GroupRegistrationsController>(
      GroupRegistrationsController
    )
    service = module.get<GroupRegistrationsService>(GroupRegistrationsService)
  })

  describe('Property-based tests', () => {
    it('should successfully create group registration for any valid input', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            groupId: fc
              .stringMatching(/^[a-z0-9-]+$/)
              .filter(s => s.length > 0 && s.length <= 50),
            name: fc.string({ minLength: 1, maxLength: 100 }),
            iconSrc: fc.webUrl()
          }),
          async validInput => {
            // Setup
            mockGroupRegistrationsService.create.mockResolvedValue(undefined)

            const dto = Object.assign(new CreateGroupRegistrationDto(), {
              groupId: validInput.groupId,
              name: validInput.name,
              iconSrc: validInput.iconSrc
            })

            // Execute
            const result = await controller.create(dto)

            // Verify
            expect(service.create).toHaveBeenCalledWith(
              expect.objectContaining({
                groupId: expect.any(GroupId),
                name: expect.any(GroupName),
                iconSrc: expect.any(GroupIconSrc),
                status: expect.any(GroupRegistrationStatus),
                appliedAt: expect.any(GroupRegistrationAppliedAt)
              })
            )

            // Verify the created registration has correct properties
            expect(result.groupId.get()).toBe(validInput.groupId)
            expect(result.name.get()).toBe(validInput.name)
            expect(result.iconSrc.get()).toBe(validInput.iconSrc)
            expect(result.status.get()).toBe('pending')
            expect(result.appliedAt.get()).toBeInstanceOf(Date)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should maintain audit trail for all group registration submissions', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            groupId: fc
              .stringMatching(/^[a-z0-9-]+$/)
              .filter(s => s.length > 0 && s.length <= 50),
            name: fc.string({ minLength: 1, maxLength: 100 }),
            iconSrc: fc.webUrl()
          }),
          async validInput => {
            // Setup
            mockGroupRegistrationsService.create.mockResolvedValue(undefined)

            const dto = Object.assign(new CreateGroupRegistrationDto(), {
              groupId: validInput.groupId,
              name: validInput.name,
              iconSrc: validInput.iconSrc
            })

            const beforeTime = new Date()

            // Execute
            const result = await controller.create(dto)

            const afterTime = new Date()

            // Verify audit trail properties
            expect(result.appliedAt.get()).toBeInstanceOf(Date)
            expect(result.appliedAt.get().getTime()).toBeGreaterThanOrEqual(
              beforeTime.getTime()
            )
            expect(result.appliedAt.get().getTime()).toBeLessThanOrEqual(
              afterTime.getTime()
            )
            expect(result.status.get()).toBe('pending')

            // Verify service was called with proper audit data
            expect(service.create).toHaveBeenCalledWith(
              expect.objectContaining({
                appliedAt: expect.any(GroupRegistrationAppliedAt),
                status: expect.objectContaining({
                  get: expect.any(Function)
                })
              })
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should properly convert DTO to domain objects for any valid input', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            groupId: fc
              .stringMatching(/^[a-z0-9-]+$/)
              .filter(s => s.length > 0 && s.length <= 50),
            name: fc.string({ minLength: 1, maxLength: 100 }),
            iconSrc: fc.webUrl()
          }),
          async validInput => {
            // Setup
            mockGroupRegistrationsService.create.mockResolvedValue(undefined)

            const dto = Object.assign(new CreateGroupRegistrationDto(), {
              groupId: validInput.groupId,
              name: validInput.name,
              iconSrc: validInput.iconSrc
            })

            // Execute
            await controller.create(dto)

            // Verify domain object conversion
            expect(service.create).toHaveBeenCalledWith(
              expect.objectContaining({
                groupId: expect.objectContaining({
                  get: expect.any(Function)
                }),
                name: expect.objectContaining({
                  get: expect.any(Function)
                }),
                iconSrc: expect.objectContaining({
                  get: expect.any(Function)
                }),
                status: expect.objectContaining({
                  get: expect.any(Function)
                }),
                appliedAt: expect.objectContaining({
                  get: expect.any(Function)
                })
              })
            )

            // Verify the actual values are preserved through conversion
            const calledWith = mockGroupRegistrationsService.create.mock.calls[
              mockGroupRegistrationsService.create.mock.calls.length - 1
            ][0] as GroupRegistration
            expect(calledWith.groupId.get()).toBe(validInput.groupId)
            expect(calledWith.name.get()).toBe(validInput.name)
            expect(calledWith.iconSrc.get()).toBe(validInput.iconSrc)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Unit tests for specific cases', () => {
    it('should create group registration with valid data', async () => {
      // Setup
      mockGroupRegistrationsService.create.mockResolvedValue(undefined)

      const dto = Object.assign(new CreateGroupRegistrationDto(), {
        groupId: 'test-group',
        name: 'Test Group',
        iconSrc: 'https://example.com/icon.png'
      })

      // Execute
      const result = await controller.create(dto)

      // Verify
      expect(service.create).toHaveBeenCalledTimes(1)
      expect(result.groupId.get()).toBe('test-group')
      expect(result.name.get()).toBe('Test Group')
      expect(result.iconSrc.get()).toBe('https://example.com/icon.png')
      expect(result.status.get()).toBe('pending')
    })

    it('should retrieve group registrations with default limit', async () => {
      // Setup
      const mockRegistrations: GroupRegistration[] = []
      mockGroupRegistrationsService.findAll.mockResolvedValue(mockRegistrations)

      const dto = Object.assign(new GetGroupRegistrationsDto(), {})

      // Execute
      const result = await controller.findAll(dto)

      // Verify
      expect(service.findAll).toHaveBeenCalledWith({ limit: 30 })
      expect(result).toBe(mockRegistrations)
    })
  })
})
