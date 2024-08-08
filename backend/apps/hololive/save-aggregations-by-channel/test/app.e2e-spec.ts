import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { HololiveSaveAggregationsByChannelModule } from 'apps/hololive/save-aggregations-by-channel/src/save-aggregations-by-channel.module'

describe('HololiveSaveAggregationsByChannelController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HololiveSaveAggregationsByChannelModule]
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
