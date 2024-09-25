import { Test, TestingModule } from '@nestjs/testing'
import { LiveChatMessagesInfraService } from '@infra/service/youtube-data-api'

describe('LiveChatMessagesInfraService', () => {
  let service: LiveChatMessagesInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveChatMessagesInfraService]
    }).compile()

    service = module.get<LiveChatMessagesInfraService>(
      LiveChatMessagesInfraService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
