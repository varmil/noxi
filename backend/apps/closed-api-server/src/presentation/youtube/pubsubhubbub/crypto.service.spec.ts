import { Test, TestingModule } from '@nestjs/testing'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'

const KEY = 'my_little_secret'

describe('CryptoService', () => {
  let service: CryptoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService]
    }).compile()

    service = module.get<CryptoService>(CryptoService)
  })

  it('should be true when Buffer is passed', () => {
    const body = { aaa: 111 }
    expect(
      service.digest({
        key: KEY,
        data: Buffer.from(JSON.stringify(body)),
        signature: 'sha1=f41d3df96637236e3d5f678e0e7a374724f1b6ea'
      })
    ).toEqual(true)
  })

  it('should be true when Object is passed', () => {
    const body = { aaa: 111 }
    expect(
      service.digest({
        key: KEY,
        data: body,
        signature: 'sha1=f41d3df96637236e3d5f678e0e7a374724f1b6ea'
      })
    ).toEqual(true)
  })

  it('should be true when String is passed', () => {
    const body = '{ aaa: 111 }'
    expect(
      service.digest({
        key: KEY,
        data: body,
        signature: 'sha1=3b48072c2f4721ce05a8250d2bee2034257d30d8'
      })
    ).toEqual(true)
  })
})
