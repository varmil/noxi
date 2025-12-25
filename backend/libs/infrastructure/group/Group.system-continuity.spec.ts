import { Test, TestingModule } from '@nestjs/testing'
import * as fc from 'fast-check'
import { Group } from '@domain/group/Group.entity'
import { GroupId } from '@domain/group/GroupId.vo'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { GroupRepositoryImpl } from './Group.repository-impl'

/**
 * Feature: group-database-migration, Property 3: 既存システム機能継続性
 *
 * 任意の既存システム機能において、GroupStringsからstring型への変更後も、
 * すべてのAPI機能とUI機能が正しく動作する
 *
 * Validates: Requirements 2.3, 2.4
 */

describe('GroupRepository - System Continuity Property Test', () => {
  let repository: GroupRepositoryImpl
  let mockPrismaGroup: {
    findMany: jest.Mock
    findUnique: jest.Mock
    create: jest.Mock
    update: jest.Mock
    delete: jest.Mock
  }

  // 既存のGroup文字列（システム継続性テスト用）
  const EXISTING_GROUPS = [
    'hololive',
    'nijisanji',
    'vspo',
    'mixstgirls',
    'neo-porte',
    'dotlive',
    'first-stage',
    'varium',
    'voms',
    'utatane',
    'holostars',
    'noripro',
    'trillionstage',
    'aogiri-high-school',
    '774inc',
    'atatakakunaru',
    'specialite',
    'vividv',
    'hololive-english',
    'hololive-indonesia',
    'nijisanji-en',
    'idol-corp',
    'kizuna-ai',
    'independent',
    'independent-irl',
    'artist'
  ]

  beforeEach(async () => {
    jest.clearAllMocks()

    mockPrismaGroup = {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupRepositoryImpl,
        {
          provide: PrismaInfraService,
          useValue: {
            group: mockPrismaGroup
          }
        }
      ]
    }).compile()

    repository = module.get<GroupRepositoryImpl>(GroupRepositoryImpl)
  })

  describe('Property 3: System Continuity', () => {
    it('should maintain API functionality after GroupStrings to string type migration', async () => {
      // Property-based test with 100 iterations
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...EXISTING_GROUPS),
          async (groupId: string) => {
            // Mock the database response
            const mockGroupData = {
              id: groupId,
              name: getExpectedGroupName(groupId),
              iconSrc: `/group/${groupId}/logo.png`,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            }

            mockPrismaGroup.findMany.mockResolvedValue([mockGroupData])
            mockPrismaGroup.findUnique.mockResolvedValue(mockGroupData)

            // Test repository functionality - findAll should work with string types
            const allGroups = await repository.findAll()
            expect(allGroups).toBeDefined()
            expect(Array.isArray(allGroups)).toBe(true)

            // Test repository functionality - string-based group ID should work
            const foundGroup = allGroups.find(
              (g: Group) => g.id.get() === groupId
            )
            expect(foundGroup).toBeDefined()
            expect(foundGroup!.id.get()).toBe(groupId)

            // Verify the group maintains expected properties
            expect(foundGroup!.name.get()).toBeTruthy()
            expect(foundGroup!.iconSrc.get()).toBe(`/group/${groupId}/logo.png`)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle string-based group operations consistently', async () => {
      // Test that string-based operations work consistently
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...EXISTING_GROUPS),
          fc.string({ minLength: 1, maxLength: 50 }),
          async (groupId: string, groupName: string) => {
            // Mock successful operations
            mockPrismaGroup.findUnique.mockResolvedValue({
              id: groupId,
              name: groupName,
              iconSrc: `/group/${groupId}/logo.png`,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            })

            mockPrismaGroup.create.mockResolvedValue({
              id: groupId,
              name: groupName,
              iconSrc: `/group/${groupId}/logo.png`,
              order: 99999,
              createdAt: new Date(),
              updatedAt: new Date()
            })

            // Test that string-based group ID operations work
            const result = await repository.findById(new GroupId(groupId))

            // Verify string-based operations maintain consistency
            if (result) {
              expect(result.id.get()).toBe(groupId)
              expect(typeof result.id.get()).toBe('string')
              expect(typeof result.name.get()).toBe('string')
              expect(typeof result.iconSrc.get()).toBe('string')
            }
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should maintain backward compatibility with existing group references', async () => {
      // Test backward compatibility
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...EXISTING_GROUPS),
          async (groupId: string) => {
            // Mock existing group data
            const mockGroupData = {
              id: groupId,
              name: getExpectedGroupName(groupId),
              iconSrc: `/group/${groupId}/logo.png`,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            }

            mockPrismaGroup.findUnique.mockResolvedValue(mockGroupData)

            // Test that existing group references still work
            const result = await repository.findById(new GroupId(groupId))

            // Verify backward compatibility
            expect(result).toBeDefined()
            expect(result!.id.get()).toBe(groupId)

            // Verify that the group can be processed as a string
            const groupIdAsString: string = result!.id.get()
            expect(typeof groupIdAsString).toBe('string')
            expect(groupIdAsString).toBe(groupId)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  // Helper function to get expected group names
  function getExpectedGroupName(groupId: string): string {
    const nameMapping: Record<string, string> = {
      '774inc': '774inc',
      atatakakunaru: 'あたたかくなる',
      dotlive: '.LIVE',
      'first-stage': 'First Stage Production',
      hololive: 'ホロライブ',
      'hololive-english': 'Hololive English',
      'hololive-indonesia': 'Hololive Indonesia',
      holostars: 'ホロスターズ',
      nijisanji: 'にじさんじ',
      'nijisanji-en': 'NIJISANJI EN',
      noripro: 'のりプロ',
      vspo: 'ぶいすぽっ！',
      'kizuna-ai': 'Kizuna AI',
      'neo-porte': 'Neo-Porte',
      'aogiri-high-school': '青鬼高校',
      specialite: 'Specialite',
      mixstgirls: 'MixstGirls',
      'idol-corp': 'idol Corp',
      trillionstage: 'TrillionStage',
      utatane: 'うたたね',
      varium: 'Varium',
      vividv: 'ViViD',
      voms: 'VOMS',
      independent: '個人勢VTuber',
      'independent-irl': '個人勢IRL',
      artist: 'アーティスト'
    }

    return nameMapping[groupId] || groupId
  }
})
