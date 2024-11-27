import { Test, TestingModule } from '@nestjs/testing'
import { StreamsService } from '@app/streams/streams.service'
import { Streams } from '@domain/stream'
import { Channels } from '@domain/youtube/channel'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'
import { MainModule } from '../main.module'
import { MainScenario } from './main.scenario'

describe('MainScenario', () => {
  let scenario: MainScenario

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule]
    }).compile()
    module.useLogger(false)
    scenario = module.get<MainScenario>(MainScenario)
  })

  describe('execute()', () => {
    it('should return void 0', async () => {
      jest
        .spyOn(StreamsService.prototype, 'findAll')
        .mockResolvedValue(new Streams([]))
      jest
        .spyOn(ChannelsInfraService.prototype, 'list')
        .mockResolvedValue(new Channels([]))

      const result = await scenario.execute()
      expect(result).toEqual(void 0)
    })
  })
})