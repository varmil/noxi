import { Test, TestingModule } from '@nestjs/testing'
import { MembershipBundlesService } from '@app/membership-bundles/membership-bundles.service'
import { MembershipPricesService } from '@app/membership-prices/membership-prices.service'
import { MembershipsService } from '@app/memberships/memberships.service'
import { Memberships } from '@domain/membership'
import { MembershipPrice, PriceMicros } from '@domain/membership-price'
import { ChannelId, VideoId } from '@domain/youtube'
import { SaveMembershipBundleService } from './save-membership-bundle.service'

describe('SaveMembershipBundleService', () => {
  let service: SaveMembershipBundleService
  let mockMembershipPricesService: { findById: jest.Mock }
  let mockMembershipsService: { findAll: jest.Mock }

  beforeEach(async () => {
    jest.clearAllMocks()

    mockMembershipPricesService = { findById: jest.fn() }
    mockMembershipsService = { findAll: jest.fn() }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveMembershipBundleService,
        {
          provide: MembershipBundlesService,
          useValue: { save: jest.fn() }
        },
        {
          provide: MembershipPricesService,
          useValue: mockMembershipPricesService
        },
        {
          provide: MembershipsService,
          useValue: mockMembershipsService
        }
      ]
    }).compile()

    service = module.get<SaveMembershipBundleService>(
      SaveMembershipBundleService
    )
  })

  describe('calculateTotalInJPY', () => {
    const mockVideoId = new VideoId('video123')
    const mockChannelId = new ChannelId('channel456')

    it('should calculate total with specific channel price', async () => {
      // Arrange
      const mockMemberships = new Memberships([])
      mockMemberships.countAll = jest.fn().mockReturnValue({ get: () => 5 })
      const mockChannelPrice = new MembershipPrice({
        channelId: mockChannelId,
        priceMicros: new PriceMicros(1000 * 1_000_000)
      })

      mockMembershipsService.findAll.mockResolvedValue(mockMemberships)
      mockMembershipPricesService.findById.mockResolvedValue(mockChannelPrice)

      // Act
      const result = await service['calculateTotalInJPY']({
        videoId: mockVideoId,
        channelId: mockChannelId
      })

      // Assert
      expect(result.count.get()).toBe(5)
      expect(result.amountMicros.toBigInt()).toBe(BigInt(1000 * 1_000_000 * 5))
      expect(result.amountMicros.get().toNumber()).toBe(1000 * 1_000_000 * 5)
    })

    it('should use default price when no channel price exists', async () => {
      // Arrange
      const mockMemberships = new Memberships([])
      mockMemberships.countAll = jest.fn().mockReturnValue({ get: () => 3 })

      mockMembershipsService.findAll.mockResolvedValue(mockMemberships)
      mockMembershipPricesService.findById.mockResolvedValue(null)

      // Act
      const result = await service['calculateTotalInJPY']({
        videoId: mockVideoId,
        channelId: mockChannelId
      })

      // Assert
      expect(result.count.get()).toBe(3)
      expect(result.amountMicros.toBigInt()).toBe(BigInt(490 * 1_000_000 * 3))
      expect(result.amountMicros.get().toNumber()).toBe(490 * 1_000_000 * 3)
    })

    it('should handle zero membership count', async () => {
      // Arrange
      const mockMemberships = new Memberships([])
      mockMemberships.countAll = jest.fn().mockReturnValue({ get: () => 0 })

      mockMembershipsService.findAll.mockResolvedValue(mockMemberships)
      mockMembershipPricesService.findById.mockResolvedValue(null)

      // Act
      const result = await service['calculateTotalInJPY']({
        videoId: mockVideoId,
        channelId: mockChannelId
      })

      // Assert
      expect(result.count.get()).toBe(0)
      expect(result.amountMicros.toBigInt()).toBe(BigInt(0))
      expect(result.amountMicros.get().toNumber()).toBe(0)
    })
  })
})
