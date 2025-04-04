import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from 'apps/groups/update-channels/src/main.module'
import { MainScenario } from 'apps/groups/update-channels/src/scenario/main.scenario'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Channels } from '@domain/youtube/channel'
import { ChannelsInfraService } from '@infra/service/youtube-data-api'

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
        .spyOn(ChannelsService.prototype, 'findAll')
        .mockResolvedValue(new Channels([]))
      jest
        .spyOn(ChannelsInfraService.prototype, 'list')
        .mockResolvedValue(new Channels([]))

      const result = await scenario.execute()
      expect(result).toEqual(void 0)
    })
  })
})
