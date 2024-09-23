import { NestFactory } from '@nestjs/core'
import { MainModule } from 'apps/update-chats/src/main.module'
import { MainService } from 'apps/update-chats/src/main.service'
import { exit } from 'process'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const main = app.select(MainModule).get(MainService)
  await main.getHello()
  await app.close()
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
