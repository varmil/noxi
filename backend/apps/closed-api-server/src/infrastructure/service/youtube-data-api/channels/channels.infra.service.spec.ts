import { Test, TestingModule } from '@nestjs/testing'
import { ChannelsInfraService } from './channels.infra.service'

describe('ChannelsInfraService', () => {
  let service: ChannelsInfraService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsInfraService]
    }).compile()

    service = module.get<ChannelsInfraService>(ChannelsInfraService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
