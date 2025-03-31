import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from 'apps/update-chats/src/main.module'
import { MainScenario } from 'apps/update-chats/src/scenario/main.scenario'
import { StreamsService } from '@app/streams/streams.service'

describe('Update Chats > MainScenario', () => {
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
        .spyOn(StreamsService.prototype, 'findAllLight')
        .mockResolvedValueOnce([])

      const result = await scenario.execute()

      expect(result).toEqual(void 0)
    })
  })
})
