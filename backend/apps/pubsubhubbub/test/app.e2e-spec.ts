import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from 'apps/pubsubhubbub/src/main.module'

describe('Pubsubhubbub (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})
