import { Test, TestingModule } from '@nestjs/testing'
import { LibAppModule } from '@app/lib/lib.app.module'
import { StreamsService } from '@app/streams/streams.service'
import { PubsubhubbubModule } from '@app/youtube/pubsubhubbub/pubsubhubbub.module'
import { SubscribeService } from '@app/youtube/pubsubhubbub/subscribe.service'
import { Streams } from '@domain/stream'

describe('SubscribeService', () => {
  let service: SubscribeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LibAppModule, PubsubhubbubModule]
    }).compile()

    service = module.get<SubscribeService>(SubscribeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('execute()', () => {
    it('should return void 0', async () => {
      jest
        .spyOn(StreamsService.prototype, 'findAll')
        .mockResolvedValueOnce(new Streams([]))
      jest
        .spyOn(SubscribeService.prototype, 'sleep')
        .mockResolvedValue(Promise.resolve())

      const result = await service.execute()
      expect(result).toEqual(void 0)
    })
  })
})
