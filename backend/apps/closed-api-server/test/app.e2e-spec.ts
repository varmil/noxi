import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { ClosedApiServerModule } from '../src/closed-api-server.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClosedApiServerModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/health (GET)', () => {
    return request(app.getHttpServer() as App)
      .get('/health')
      .expect(200)
      .expect('ok')
  })
})
