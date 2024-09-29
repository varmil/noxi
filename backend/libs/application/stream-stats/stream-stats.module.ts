import { Module } from '@nestjs/common'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamStatsInfraModule } from '@infra/stream-stats/stream-stats.infra.module'

@Module({
  imports: [StreamStatsInfraModule],
  providers: [StreamStatsService],
  exports: [StreamStatsService]
})
export class StreamStatsModule {}
