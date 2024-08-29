import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from 'apps/groups/update-channels/src/main.module'

describe('Groups > Update Channels (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})