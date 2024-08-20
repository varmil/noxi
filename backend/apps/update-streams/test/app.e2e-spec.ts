import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateStreamsModule } from './../src/update-streams.module'

describe('UpdateStreamsController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UpdateStreamsModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})
