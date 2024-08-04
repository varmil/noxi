import { Test, TestingModule } from '@nestjs/testing'
import { SearchVideosInfraService } from './search-videos.infra.service'

describe('SearchVideosInfraService', () => {
  let service: SearchVideosInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchVideosInfraService]
    }).compile()

    service = module.get<SearchVideosInfraService>(SearchVideosInfraService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
