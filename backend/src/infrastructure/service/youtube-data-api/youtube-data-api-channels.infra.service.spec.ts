import { Test, TestingModule } from '@nestjs/testing'
import { YoutubeDataApiChannelsInfraService } from './youtube-data-api-channels.infra.service'

describe('YoutubeDataApiChannelsInfraService', () => {
  let service: YoutubeDataApiChannelsInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeDataApiChannelsInfraService]
    }).compile()

    service = module.get<YoutubeDataApiChannelsInfraService>(
      YoutubeDataApiChannelsInfraService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
