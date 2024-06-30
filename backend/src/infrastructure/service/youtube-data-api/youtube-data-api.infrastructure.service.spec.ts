import { Test, TestingModule } from '@nestjs/testing'
import { YoutubeDataApiInfrastructureService } from './youtube-data-api.infrastructure.service'

describe('YoutubeDataApiInfrastructureService', () => {
  let service: YoutubeDataApiInfrastructureService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeDataApiInfrastructureService]
    }).compile()

    service = module.get<YoutubeDataApiInfrastructureService>(
      YoutubeDataApiInfrastructureService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
