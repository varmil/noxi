import { Module } from '@nestjs/common'
import { HyperChatRankingsController } from '@presentation/hyper-chat-rankings/hyper-chat-rankings.controller'
import { HyperChatRankingsAppModule } from '@app/hyper-chat-rankings/hyper-chat-rankings.app.module'

@Module({
  imports: [HyperChatRankingsAppModule],
  controllers: [HyperChatRankingsController]
})
export class HyperChatRankingsPresentationModule {}
