import { Module } from '@nestjs/common'
import { StreamStatsController } from '@presentation/youtube/stream-stats/stream-stats.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [YoutubeAppModule],
  controllers: [StreamStatsController],
  providers: []
})
export class StreamStatsPresentationModule {}
