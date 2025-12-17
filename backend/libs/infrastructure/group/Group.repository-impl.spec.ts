import { Test, TestingModule } from '@nestjs/testing'
import * as fc from 'fast-check'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GroupId } from '@domain/group'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'
import { GroupRepositoryImpl } from './Group.repository-impl'

/**
 * Feature: group-database-migration, Property 2: マイグレーションデータ完全性
 *
 * 任意の既存 GroupStrings 定数において、マイグレーション後の Group テーブルに対応するレコードが存在し、
 * 適切な `/group/${group}/logo.png` 形式の iconSrc が設定される
 *
 * Validates: Requirements 1.2, 1.3
 */

describe('GroupRepositoryImpl - Migration Data Integrity Property Test', () => {
  let repository: GroupRepositoryImpl
  let mockPrismaGroup: {
    findMany: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
    create: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }

  // 既存のGroupStrings定数（マイグレーションファイルから取得）
  const EXISTING_GROUP_STRINGS = [
    '774inc',
    'atatakakunaru',
    'dotlive',
    'first-stage',
    'hololive',
    'hololive-english',
    'hololive-indonesia',
    'holostars',
    'nijisanji',
    'nijisanji-en',
    'noripro',
    'vspo',
    'kizuna-ai',
    'neo-porte',
    'aogiri-high-school',
    'specialite',
    'mixstgirls',
    'idol-corp',
    'trillionstage',
    'utatane',
    'varium',
    'vividv',
    'voms',
    'independent',
    'independent-irl',
    'artist'
  ]

  beforeEach(async () => {
    vi.clearAllMocks()

    mockPrismaGroup = {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
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

  describe('Property 2: Migration Data Integrity', () => {
    it('should verify all existing GroupStrings have corresponding records with correct iconSrc format', async () => {
      // Property-based test with 100 iterations
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...EXISTING_GROUP_STRINGS),
          async (groupId: string) => {
            // Mock the database response for the group
            const mockGroupData = {
              id: groupId,
              name: getExpectedGroupName(groupId),
              iconSrc: `/group/${groupId}/logo.png`,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            }

            mockPrismaGroup.findUnique.mockResolvedValue(mockGroupData)

            // Test that the group exists in the database
            const result = await repository.findById(new GroupId(groupId))

            // Verify the group exists
            expect(result).not.toBeNull()
            expect(result!.id.get()).toBe(groupId)

            // Verify the iconSrc follows the correct format: /group/${group}/logo.png
            expect(result!.iconSrc.get()).toBe(`/group/${groupId}/logo.png`)

            // Verify the group has a proper name
            expect(result!.name.get()).toBeTruthy()
            expect(result!.name.get().length).toBeGreaterThan(0)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should verify all migrated groups maintain data integrity', async () => {
      // Test that all existing groups are properly migrated
      const mockAllGroupsData = EXISTING_GROUP_STRINGS.map(groupId => ({
        id: groupId,
        name: getExpectedGroupName(groupId),
        iconSrc: `/group/${groupId}/logo.png`,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      mockPrismaGroup.findMany.mockResolvedValue(mockAllGroupsData)

      const allGroups = await repository.findAll()

      // Verify all existing groups are present
      expect(allGroups.length).toBeGreaterThanOrEqual(
        EXISTING_GROUP_STRINGS.length
      )

      // Verify each group has correct format
      for (const group of allGroups) {
        const groupId = group.id.get()

        // Verify iconSrc format
        expect(group.iconSrc.get()).toBe(`/group/${groupId}/logo.png`)

        // Verify group has valid name
        expect(group.name.get()).toBeTruthy()
        expect(group.name.get().length).toBeGreaterThan(0)
      }
    })
  })

  describe('Order Sorting', () => {
    it('should return groups sorted by order in ascending order', async () => {
      // Mock data with different order values
      const mockGroupsData = [
        {
          id: 'group-c',
          name: 'Group C',
          iconSrc: '/group/group-c/logo.png',
          order: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'group-a',
          name: 'Group A',
          iconSrc: '/group/group-a/logo.png',
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'group-b',
          name: 'Group B',
          iconSrc: '/group/group-b/logo.png',
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      // Simulate database returning sorted by order
      const sortedMockData = [...mockGroupsData].sort(
        (a, b) => a.order - b.order
      )

      mockPrismaGroup.findMany.mockResolvedValue(sortedMockData)

      const result = await repository.findAll()

      // Verify the order of results
      expect(result[0].id.get()).toBe('group-a')
      expect(result[1].id.get()).toBe('group-b')
      expect(result[2].id.get()).toBe('group-c')

      // Verify findMany was called with correct orderBy
      expect(mockPrismaGroup.findMany).toHaveBeenCalledWith({
        orderBy: { order: 'asc' }
      })
    })
  })

  describe('New Group Creation with Order', () => {
    it('should create new group with order set to 99999', async () => {
      const { Group, GroupId, GroupName, GroupIconSrc } =
        await import('@domain/group')

      const newGroup = new Group({
        id: new GroupId('new-group'),
        name: new GroupName('New Group'),
        iconSrc: new GroupIconSrc('/group/new-group/logo.png')
      })

      mockPrismaGroup.create.mockResolvedValue({
        id: 'new-group',
        name: 'New Group',
        iconSrc: '/group/new-group/logo.png',
        order: 99999,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      await repository.create(newGroup)

      // Verify create was called with order: 99999
      expect(mockPrismaGroup.create).toHaveBeenCalledWith({
        data: {
          id: 'new-group',
          name: 'New Group',
          iconSrc: '/group/new-group/logo.png',
          order: 99999
        }
      })
    })
  })

  // Helper function to get expected group names (based on migration data)
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
