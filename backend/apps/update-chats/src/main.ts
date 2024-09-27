import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { MainModule } from 'apps/update-chats/src/main.module'
import { MainScenario } from 'apps/update-chats/src/scenario/main.scenario'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const main = app.select(MainModule).get(MainScenario)
  await executeMain(main)
  await app.close()
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/** 15秒間隔で4回実行 */
async function executeMain(main: MainScenario) {
  for (let i = 0; i < 4; i++) {
    await main.execute()
    if (i < 3) {
      // 15秒待つ（最後の実行後は待たない）
      await delay(15000)
    }
  }
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
