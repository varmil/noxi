import { Test, TestingModule } from '@nestjs/testing'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { SubscribeService } from '@app/youtube/pubsubhubbub/subscribe.service'
import { Channels } from '@domain/youtube'

describe('SubscribeService', () => {
  let service: SubscribeService
  let mockChannelsService: { findAll: jest.Mock }

  beforeEach(async () => {
    jest.clearAllMocks()

    mockChannelsService = { findAll: jest.fn() }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscribeService,
        {
          provide: ChannelsService,
          useValue: mockChannelsService
        }
      ]
    }).compile()

    service = module.get<SubscribeService>(SubscribeService)
  })

  describe('execute()', () => {
    it('should return void 0', async () => {
      mockChannelsService.findAll.mockResolvedValue(new Channels([]))
      jest.spyOn(service, 'sleep').mockResolvedValue(Promise.resolve())

      const result = await service.execute()
      expect(result).toEqual(void 0)
    })
  })
})
