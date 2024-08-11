import { NestFactory } from '@nestjs/core'
import { SubscribeService } from '@app/youtube/pubsubhubbub/subscribe.service'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const service = app.get(SubscribeService)
  await service.subscribe()
  await app.close()
}

bootstrap().catch(reason => console.error(reason))
