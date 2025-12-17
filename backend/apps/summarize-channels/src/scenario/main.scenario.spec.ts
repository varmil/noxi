import { Test, TestingModule } from '@nestjs/testing'
import { vi } from 'vitest'
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
      vi.spyOn(
        CreateSupersSummariesService.prototype,
        'execute'
      ).mockResolvedValue(void 0)
      vi.spyOn(ChannelsService.prototype, 'findAll').mockResolvedValue(
        new Channels([])
      )

      const result = await scenario.executeSupersSummaries()
      expect(result).toEqual(void 0)
    })
  })

  describe('executeRankings()', () => {
    it('should return void 0', async () => {
      vi.spyOn(
        CreateSupersSummariesService.prototype,
        'execute'
      ).mockResolvedValue(void 0)
      vi.spyOn(ChannelsService.prototype, 'findAll').mockResolvedValue(
        new Channels([])
      )

      const result = await scenario.executeRankings()
      expect(result).toEqual(void 0)
    })
  })

  describe('executeMembershipSummaries()', () => {
    it('should return void 0', async () => {
      vi.spyOn(
        CreateMembershipSummariesService.prototype,
        'execute'
      ).mockResolvedValue(void 0)
      vi.spyOn(ChannelsService.prototype, 'findAll').mockResolvedValue(
        new Channels([])
      )

      const result = await scenario.executeMembershipSummaries()
      expect(result).toEqual(void 0)
    })
  })
})
