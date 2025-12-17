import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { SubscribeService } from '@app/youtube/pubsubhubbub/subscribe.service'
import { Channels } from '@domain/youtube'

describe('SubscribeService', () => {
  let service: SubscribeService
  let mockChannelsService: { findAll: ReturnType<typeof vi.fn> }

  beforeEach(async () => {
    vi.clearAllMocks()

    mockChannelsService = { findAll: vi.fn() }

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
      vi.spyOn(service, 'sleep').mockResolvedValue(Promise.resolve())

      const result = await service.execute()
      expect(result).toEqual(void 0)
    })
  })
})
