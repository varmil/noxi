import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from '../src/main.module'

describe('Update Streams (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
  })
})
