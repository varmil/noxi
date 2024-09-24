import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { MainModule } from 'apps/update-chats/src/main.module'
import { MainService } from 'apps/update-chats/src/main.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const main = app.select(MainModule).get(MainService)
  console.error('hello this is console.error')
  throw new Error('hello this is THROW new Error')
  await main.getHello()
  await app.close()
}

bootstrap().catch(reason => {
  // console.error(reason)
  exit(1)
})
