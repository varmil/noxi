import { Test, TestingModule } from '@nestjs/testing'
import { YoutubeDataApiVideosInfraService } from './youtube-data-api-videos.infra.service'

describe('YoutubeDataApiVideosInfraService', () => {
  let service: YoutubeDataApiVideosInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeDataApiVideosInfraService]
    }).compile()

    service = module.get<YoutubeDataApiVideosInfraService>(
      YoutubeDataApiVideosInfraService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
