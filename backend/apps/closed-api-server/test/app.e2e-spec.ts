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
    const dto =
      '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\n<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns="http://www.w3.org/2005/Atom"><link rel="hub" href="https://pubsubhubbub.appspot.com"/><link rel="self" href="https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCCzUftO8KOVkV4wQG1vkUvg"/><title>YouTube video feed</title><updated>2024-08-11T13:19:00.617888181+00:00</updated><entry>\n  <id>yt:video:WG3FIk8edh8</id>\n  <yt:videoId>WG3FIk8edh8</yt:videoId>\n  <yt:channelId>UCCzUftO8KOVkV4wQG1vkUvg</yt:channelId>\n  <title>【新衣装お披露目】告知あり！！初のユニット衣装！！3期生お披露目リレー！！！【ホロライブ/宝鐘マリン】</title>\n  <link rel="alternate" href="https://www.youtube.com/watch?v=WG3FIk8edh8"/>\n  <author>\n   <name>Marine Ch. 宝鐘マリン</name>\n   <uri>https://www.youtube.com/channel/UCCzUftO8KOVkV4wQG1vkUvg</uri>\n  </author>\n  <published>2024-08-11T13:18:30+00:00</published>\n  <updated>2024-08-11T13:19:00.617888181+00:00</updated>\n </entry></feed>\n'

    return request(app.getHttpServer())
      .post('/api/youtube/pubsubhubbub/callback')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', 'sha1=f666cc500eb650b774ae3088603111e151751d04')
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
