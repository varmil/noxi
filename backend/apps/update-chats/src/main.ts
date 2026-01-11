import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { useLogger } from '@app/lib/function/useLogger'
import { MainModule } from './main.module'
import { MainScenario } from './scenario/main.scenario'

/**
 * 実行時間
 * Cloud Scheduler は1時間間隔で起動。10分オーバーラップさせて
 * スパチャを取り逃がさないようにする。
 */
const DURATION_MS = 70 * 60 * 1000 // 70分
/**
 * 目標ループ間隔
 * 実行時間が5秒未満なら待機し、5秒以上かかったら即座に次へ。
 */
const TARGET_INTERVAL_MS = 5000

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
  const endTime = Date.now() + DURATION_MS
  let count = 0

  while (Date.now() < endTime) {
    const startTime = Date.now()
    count++

    console.time(`executeMain/count:${count}`)
    await main.execute()
    console.timeEnd(`executeMain/count:${count}`)

    const elapsed = Date.now() - startTime
    const waitTime = Math.max(0, TARGET_INTERVAL_MS - elapsed)
    if (waitTime > 0 && Date.now() + waitTime < endTime) {
      await delay(waitTime)
    }
  }
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
