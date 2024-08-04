import { Test, TestingModule } from '@nestjs/testing'
import { PlaylistItemsInfraService } from '@infra/service/youtube-data-api'

describe('PlaylistItemsInfraService', () => {
  let service: PlaylistItemsInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistItemsInfraService]
    }).compile()

    service = module.get<PlaylistItemsInfraService>(PlaylistItemsInfraService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
