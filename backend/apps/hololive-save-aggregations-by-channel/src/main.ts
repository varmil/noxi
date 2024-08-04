import { NestFactory } from '@nestjs/core'
import { HololiveSaveAggregationsByChannelModule } from './hololive-save-aggregations-by-channel.module'

async function bootstrap() {
  const app = await NestFactory.create(HololiveSaveAggregationsByChannelModule)
  await app.listen(3000)
}
bootstrap().catch(reason => console.error(reason))
