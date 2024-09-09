import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'
import { MainScenario } from 'apps/update-streams/src/scenario/main.scenario'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const mainScenario = app.select(MainModule).get(MainScenario)
  await mainScenario.execute()
}

bootstrap().catch(reason => console.error(reason))
