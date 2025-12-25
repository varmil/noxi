import { Test, TestingModule } from '@nestjs/testing'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { Channels } from '@domain/youtube/channel'
import { MainModule } from '../main.module'
import { CreateMembershipSummariesService } from '../service/create-membership-summaries.service'
import { CreateSupersSummariesService } from '../service/create-supers-summaries.service'
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

  describe('executeSupersSummaries()', () => {
    it('should return void 0', async () => {
      jest.spyOn(
        CreateSupersSummariesService.prototype,
        'execute'
      ).mockResolvedValue(void 0)
      jest.spyOn(ChannelsService.prototype, 'findAll').mockResolvedValue(
        new Channels([])
      )

      const result = await scenario.executeSupersSummaries()
      expect(result).toEqual(void 0)
    })
  })

  describe('executeRankings()', () => {
    it('should return void 0', async () => {
      jest.spyOn(
        CreateSupersSummariesService.prototype,
        'execute'
      ).mockResolvedValue(void 0)
      jest.spyOn(ChannelsService.prototype, 'findAll').mockResolvedValue(
        new Channels([])
      )

      const result = await scenario.executeRankings()
      expect(result).toEqual(void 0)
    })
  })

  describe('executeMembershipSummaries()', () => {
    it('should return void 0', async () => {
      jest.spyOn(
        CreateMembershipSummariesService.prototype,
        'execute'
      ).mockResolvedValue(void 0)
      jest.spyOn(ChannelsService.prototype, 'findAll').mockResolvedValue(
        new Channels([])
      )

      const result = await scenario.executeMembershipSummaries()
      expect(result).toEqual(void 0)
    })
  })
})
