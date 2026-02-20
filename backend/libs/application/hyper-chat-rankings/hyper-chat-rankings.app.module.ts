import { Module } from '@nestjs/common'
import { HyperChatRankingInfraModule } from '@infra/hyper-chat-ranking/hyper-chat-ranking.infra.module'
import { HyperChatRankingsService } from './hyper-chat-rankings.service'

@Module({
  imports: [HyperChatRankingInfraModule],
  providers: [HyperChatRankingsService],
  exports: [HyperChatRankingInfraModule, HyperChatRankingsService]
})
export class HyperChatRankingsAppModule {}
