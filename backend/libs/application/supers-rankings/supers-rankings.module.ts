import { Module } from '@nestjs/common'
import { SupersRankingsService } from '@app/supers-rankings/supers-rankings.service'
import { SupersRankingInfraModule } from '@infra/supers-ranking/supers-ranking.infra.module'

@Module({
  imports: [SupersRankingInfraModule],
  providers: [SupersRankingsService],
  exports: [SupersRankingInfraModule, SupersRankingsService]
})
export class SupersRankingsAppModule {}
