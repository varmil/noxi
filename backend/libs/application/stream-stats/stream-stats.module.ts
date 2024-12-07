import { Module } from '@nestjs/common'
import { ChatCountsService } from '@app/stream-stats/chat-counts.service'
import { StreamStatsService } from '@app/stream-stats/stream-stats.service'
import { StreamStatsInfraModule } from '@infra/stream-stats/stream-stats.infra.module'

@Module({
  imports: [StreamStatsInfraModule],
  providers: [ChatCountsService, StreamStatsService],
  exports: [StreamStatsInfraModule, ChatCountsService, StreamStatsService]
})
export class StreamStatsModule {}
