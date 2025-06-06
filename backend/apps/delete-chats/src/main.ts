import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { useLogger } from '@app/lib/function/useLogger'
import { MainModule } from './main.module'
import { MainScenario } from './scenario/main.scenario'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  useLogger(app)
  const main = app.select(MainModule).get(MainScenario)
  await main.execute()
  await main.cleanOldRecords()
  await app.close()
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
