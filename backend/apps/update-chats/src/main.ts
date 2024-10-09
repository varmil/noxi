import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { useLogger } from '@app/lib/function/useLogger'
import { MainModule } from './main.module'
import { MainScenario } from './scenario/main.scenario'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  useLogger(app)
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
    console.time(`executeMain/count:${i + 1}`)
    await main.execute()
    console.timeEnd(`executeMain/count:${i + 1}`)
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
