import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { useLogger } from '@app/lib/function/useLogger'
import { MainModule } from './main.module'
import { MainScenario } from './scenario/main.scenario'

/**
 * 1. Summaryを作成する
 * 2. Rankingを作成する
 *
 * Summaryを「全て」作り終わったあとでないと
 * Rankingを作れない（順位が確定しない）ので
 * 一番上位のここで手続きを制御する
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  useLogger(app)

  const scenario = app.select(MainModule).get(MainScenario)
  await scenario.executeSummaries()
  await scenario.executeRankings()

  await app.close()
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
