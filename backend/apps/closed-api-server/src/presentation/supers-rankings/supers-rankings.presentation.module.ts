import { Module } from '@nestjs/common'
import { SupersRankingsController } from '@presentation/supers-rankings/supers-rankings.controller'
import { SupersRankingsScenario } from '@presentation/supers-rankings/supers-rankings.scenario'
import { SupersRankingsAppModule } from '@app/supers-rankings/supers-rankings.module'

@Module({
  imports: [SupersRankingsAppModule],
  controllers: [SupersRankingsController],
  providers: [SupersRankingsScenario]
})
export class SupersRankingsPresentationModule {}
