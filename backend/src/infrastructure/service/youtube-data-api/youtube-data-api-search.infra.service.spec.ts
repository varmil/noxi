import { Test, TestingModule } from '@nestjs/testing'
import { YoutubeDataApiSearchInfraService } from './youtube-data-api-search.infra.service'

describe('YoutubeDataApiSearchInfraService', () => {
  let service: YoutubeDataApiSearchInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeDataApiSearchInfraService]
    }).compile()

    service = module.get<YoutubeDataApiSearchInfraService>(
      YoutubeDataApiSearchInfraService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
