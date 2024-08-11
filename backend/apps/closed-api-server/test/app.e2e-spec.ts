import { NestExpressApplication } from '@nestjs/platform-express'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { ClosedApiServerModule } from '../src/closed-api-server.module'
import { registerGlobals } from '../src/registerGlobals'

describe('AppController (e2e)', () => {
  let app: NestExpressApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClosedApiServerModule]
    }).compile()

    app = moduleFixture.createNestApplication<NestExpressApplication>()
    registerGlobals(app)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/api/youtube/pubsubhubbub/callback (POST)', () => {
    const dto = `<entry>
    <id>yt:video:1qmpGt2wTv0</id>
    <yt:videoId>1qmpGt2wTv0</yt:videoId>
    <yt:channelId>UC1DCedRgGHBdm81E1llLhOQ</yt:channelId>
    <title>【FGO】9周年福袋＆ディスティニーオーダー、水着エレちゃんPUガチャ引くぞおおおおおおおおおおおおおおおおおおおおおおおおおおぺこ！【ホロライブ/兎田ぺこら】</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=1qmpGt2wTv0"/>
    <author>
     <name>Pekora Ch. 兎田ぺこら</name>
     <uri>https://www.youtube.com/channel/UC1DCedRgGHBdm81E1llLhOQ</uri>
    </author>
    <published>2024-08-10T16:20:46+00:00</published>
    <updated>2024-08-10T16:21:22.220666866+00:00</updated>
   </entry>`

    return request(app.getHttpServer())
      .post('/api/youtube/pubsubhubbub/callback')
      .set('Content-Type', 'application/atom+xml')
      .send(dto)
      .expect(202)
  })

  it('/api/health (GET)', () => {
    return request(app.getHttpServer()).get('/api/health').expect(200)
  })

  it('/api/youtube/channels (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/youtube/channels/UCdn5BQ06XqgXoAxIhbqw5Rg')
      .expect(200)
  })
})
