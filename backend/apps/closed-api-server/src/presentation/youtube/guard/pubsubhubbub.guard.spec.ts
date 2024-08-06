import { Test, TestingModule } from '@nestjs/testing'
import { PubsubhubbubGuard } from '@presentation/youtube/guard/pubsubhubbub.guard'

describe('PubsubhubbubGuard', () => {
  let guard: PubsubhubbubGuard

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubsubhubbubGuard]
    }).compile()

    guard = module.get<PubsubhubbubGuard>(PubsubhubbubGuard)
  })

  it('should be defined', () => {
    expect(guard).toBeDefined()
  })

  it('should be true', () => {
    expect(
      guard.verify({ key: 'xxx', data: 'yyy', signature: 'zzz' })
    ).toBeDefined()
  })
})
