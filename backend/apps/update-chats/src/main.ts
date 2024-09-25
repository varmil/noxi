import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { MainModule } from 'apps/update-chats/src/main.module'
import { MainScenario } from 'apps/update-chats/src/scenario/main.scenario'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const main = app.select(MainModule).get(MainScenario)
  await main.execute()
  await app.close()
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
