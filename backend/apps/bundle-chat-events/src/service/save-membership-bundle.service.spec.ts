import { Test, TestingModule } from '@nestjs/testing'
import { MembershipBundlesAppModule } from '@app/membership-bundles/membership-bundles.module'
import { MembershipPricesAppModule } from '@app/membership-prices/membership-prices.app.module'
import { MembershipPricesService } from '@app/membership-prices/membership-prices.service'
import { MembershipsModule } from '@app/memberships/memberships.module'
import { MembershipsService } from '@app/memberships/memberships.service'
import { Memberships } from '@domain/membership'
import { MembershipPrice, PriceMicros } from '@domain/membership-price'
import { ChannelId, VideoId } from '@domain/youtube'
import { SaveMembershipBundleService } from './save-membership-bundle.service'

describe('SaveMembershipBundleService', () => {
  let service: SaveMembershipBundleService
  let membershipPricesService: MembershipPricesService
  let membershipsService: MembershipsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MembershipBundlesAppModule,
        MembershipPricesAppModule,
        MembershipsModule
      ],
      providers: [SaveMembershipBundleService]
    }).compile()

    service = module.get<SaveMembershipBundleService>(
      SaveMembershipBundleService
    )
    membershipPricesService = module.get(MembershipPricesService)
    membershipsService = module.get(MembershipsService)
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

      jest
        .spyOn(membershipsService, 'findAll')
        .mockResolvedValue(mockMemberships)
      jest
        .spyOn(membershipPricesService, 'findById')
        .mockResolvedValue(mockChannelPrice)

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

      jest
        .spyOn(membershipsService, 'findAll')
        .mockResolvedValue(mockMemberships)
      jest.spyOn(membershipPricesService, 'findById').mockResolvedValue(null)

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

      jest
        .spyOn(membershipsService, 'findAll')
        .mockResolvedValue(mockMemberships)
      jest.spyOn(membershipPricesService, 'findById').mockResolvedValue(null)

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
