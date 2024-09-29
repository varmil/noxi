import { Module } from '@nestjs/common'
import { StreamStatsController } from '@presentation/youtube/stream-stats/stream-stats.controller'
import { StreamStatsModule } from '@app/stream-stats/stream-stats.module'

@Module({
  imports: [StreamStatsModule],
  controllers: [StreamStatsController],
  providers: []
})
export class StreamStatsPresentationModule {}
