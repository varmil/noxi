import { Test, TestingModule } from '@nestjs/testing'
import { CreateSupersSummariesService } from 'apps/summarize-channels/src/service/create-supers-summaries.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Channels } from '@domain/youtube/channel'
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
        .spyOn(CreateSupersSummariesService.prototype, 'execute')
        .mockResolvedValue(void 0)
      jest
        .spyOn(ChannelsService.prototype, 'findAll')
        .mockResolvedValue(new Channels([]))

      const result = await scenario.execute()
      expect(result).toEqual(void 0)
    })
  })
})