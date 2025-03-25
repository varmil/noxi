import { exit } from 'process'
import { NestFactory } from '@nestjs/core'
import { useLogger } from '@app/lib/function/useLogger'
import { MainModule } from './main.module'
import { MainScenario } from './scenario/main.scenario'

/**
 * 1. Supers Summaryを作成する
 * 2. Rankingを作成する
 * 3. Membership Summaryを作成する
 *
 * SupersSummaryを「全て」作り終わったあとでないと
 * Rankingを作れない（順位が確定しない）ので
 * 一番上位のここで手続きを制御する
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)
  useLogger(app)

  const scenario = app.select(MainModule).get(MainScenario)
  await scenario.executeSupersSummaries()
  await scenario.executeRankings()
  await scenario.executeMembershipSummaries()

  await app.close()
}

bootstrap().catch(reason => {
  console.error(reason)
  exit(1)
})
