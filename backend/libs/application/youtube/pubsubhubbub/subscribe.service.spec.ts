import { Test, TestingModule } from '@nestjs/testing'
import { LibAppModule } from '@app/lib/lib.app.module'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { PubsubhubbubAppModule } from '@app/youtube/pubsubhubbub/pubsubhubbub.app.module'
import { SubscribeService } from '@app/youtube/pubsubhubbub/subscribe.service'
import { Channels } from '@domain/youtube'

describe('SubscribeService', () => {
  let service: SubscribeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LibAppModule, PubsubhubbubAppModule]
    }).compile()

    service = module.get<SubscribeService>(SubscribeService)
  })

  describe('execute()', () => {
    it('should return void 0', async () => {
      jest
        .spyOn(ChannelsService.prototype, 'findAll')
        .mockResolvedValueOnce(new Channels([]))
      jest
        .spyOn(SubscribeService.prototype, 'sleep')
        .mockResolvedValue(Promise.resolve())

      const result = await service.execute()
      expect(result).toEqual(void 0)
    })
  })
})
