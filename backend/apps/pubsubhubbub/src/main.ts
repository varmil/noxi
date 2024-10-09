import { NestFactory } from '@nestjs/core'
import { useLogger } from '@app/lib/function/useLogger'
import { SubscribeService } from '@app/youtube/pubsubhubbub/subscribe.service'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  useLogger(app)
  const service = app.get(SubscribeService)
  await service.execute()
  await app.close()
}

bootstrap().catch(reason => console.error(reason))
