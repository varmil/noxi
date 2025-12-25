import { Test, TestingModule } from '@nestjs/testing'
import { StreamsService } from '@app/streams/streams.service'
import { Streams } from '@domain/stream'
import { MainModule } from '../main.module'
import { MainScenario } from './main.scenario'

describe('Update Streams > MainScenario', () => {
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
      jest.spyOn(StreamsService.prototype, 'findAll').mockResolvedValue(
        new Streams([])
      )

      const result = await scenario.execute()

      expect(result).toEqual(void 0)
    })
  })
})
