import { NestFactory } from '@nestjs/core'
import { PubsubhubbubService } from 'apps/pubsubhubbub/src/pubsubhubbub.service'
import { PubsubhubbubModule } from './pubsubhubbub.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(PubsubhubbubModule)
  const service = app.get(PubsubhubbubService)
  await service.subscribe()
  await app.close()
}

bootstrap().catch(reason => console.error(reason))
