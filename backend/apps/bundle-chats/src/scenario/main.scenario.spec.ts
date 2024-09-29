import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from 'apps/bundle-chats/src/main.module'
import { MainScenario } from 'apps/bundle-chats/src/scenario/main.scenario'
import { StreamsService } from '@app/streams/streams.service'
import { Streams } from '@domain/stream'

describe('MainScenario', () => {
  let scenario: MainScenario

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule]
    }).compile()

    scenario = module.get<MainScenario>(MainScenario)
  })

  it('should be defined', () => {
    expect(scenario).toBeDefined()
  })

  describe('execute()', () => {
    it('should return void 0', async () => {
      jest
        .spyOn(StreamsService.prototype, 'findAll')
        .mockResolvedValueOnce(new Streams([]))

      const result = await scenario.execute()

      expect(result).toEqual(void 0)
    })
  })
})
