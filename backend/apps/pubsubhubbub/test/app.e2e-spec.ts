import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PubsubhubbubModule } from '../../../libs/application/youtube/pubsubhubbub/pubsubhubbub.module'

describe('PubsubhubbubController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PubsubhubbubModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})
