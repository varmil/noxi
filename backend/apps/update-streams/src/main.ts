import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { MainScenario } from 'apps/update-streams/src/scenario/main.scenario'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const mainScenario = app.select(MainModule).get(MainScenario)
  await mainScenario.execute()
  await app.close()
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
