import { Test, TestingModule } from '@nestjs/testing'
import { YoutubeiLiveChatInfraService } from '@infra/service/youtubei/live_chat/youtubei-live-chat.infra.service'

describe('YoutubeiLiveChatInfraService', () => {
  let service: YoutubeiLiveChatInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeiLiveChatInfraService]
    }).compile()

    service = module.get<YoutubeiLiveChatInfraService>(
      YoutubeiLiveChatInfraService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
