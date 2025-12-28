import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { useLogger } from '@app/lib/function/useLogger'
import { MainModule } from './main.module'
import { MainScenario } from './scenario/main.scenario'

/**
 * 実行間隔
 */
const INTERVAL_MS = 3000
/**
 * 1時間、INTERVAL_MS間隔で実行する
 * Cloud Schedulerは1時間間隔。ここに「処理時間」が加わるので実際には
 * 10分程度の被り（マージン）がある。
 */
const EXECUTE_COUNT = (3600 * 1000) / INTERVAL_MS

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

async function executeMain(main: MainScenario) {
  for (let i = 0; i < EXECUTE_COUNT; i++) {
    console.time(`executeMain/count:${i + 1}`)
    await main.execute()
    console.timeEnd(`executeMain/count:${i + 1}`)

    // 待つ（最後の実行後は待たない）
    if (i < EXECUTE_COUNT) {
      await delay(INTERVAL_MS)
    }
  }
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
