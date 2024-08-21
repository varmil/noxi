import { Module } from '@nestjs/common'
import { StreamStatsService } from '@app/youtube/stream-stats/stream-stats.service'

@Module({
  imports: [],
  providers: [StreamStatsService],
  exports: [StreamStatsService]
})
export class StreamStatsModule {}
