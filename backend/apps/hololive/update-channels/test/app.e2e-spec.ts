import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { UpdateChannelsModule } from 'apps/hololive/update-channels/src/update-channels.module'

describe('HololiveSaveAggregationsByChannelController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UpdateChannelsModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer() as App)
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
