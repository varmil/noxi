import { NestFactory } from '@nestjs/core'
import { UpdateStreamsModule } from './update-streams.module'

async function bootstrap() {
  const app = await NestFactory.create(UpdateStreamsModule)
  await app.listen(3000)
}
bootstrap().catch(reason => console.error(reason))
