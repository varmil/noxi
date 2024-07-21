import { Test, TestingModule } from '@nestjs/testing'
import { VideosInfraService } from './videos.infra.service'

describe('VideosInfraService', () => {
  let service: VideosInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosInfraService]
    }).compile()

    service = module.get<VideosInfraService>(VideosInfraService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
