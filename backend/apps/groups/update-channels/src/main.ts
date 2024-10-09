import { NestFactory } from '@nestjs/core'
import { MainScenario } from 'apps/groups/update-channels/src/scenario/main.scenario'
import { useLogger } from '@app/lib/function/useLogger'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  useLogger(app)

  // チャンネル基本情報のUPSERT
  {
    const updateChannelsScenario = app.select(MainModule).get(MainScenario)
    await updateChannelsScenario.execute()
  }

  await app.close()
}
bootstrap().catch(reason => console.error(reason))
