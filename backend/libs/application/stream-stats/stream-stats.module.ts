import { Module } from '@nestjs/common'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'

@Module({
  imports: [],
  providers: [StreamStatsService],
  exports: [StreamStatsService]
})
export class StreamStatsModule {}
