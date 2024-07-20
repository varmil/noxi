import { Test, TestingModule } from '@nestjs/testing'
import { SearchChannelsInfraService } from '@infra/service/youtube-data-api'

describe('SearchChannelsInfraService', () => {
  let service: SearchChannelsInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchChannelsInfraService]
    }).compile()

    service = module.get<SearchChannelsInfraService>(SearchChannelsInfraService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
