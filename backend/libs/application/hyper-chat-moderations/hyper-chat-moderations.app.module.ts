import { Module } from '@nestjs/common'
import { HyperChatModerationsService } from '@app/hyper-chat-moderations/hyper-chat-moderations.service'
import { HyperChatModerationInfraModule } from '@infra/hyper-chat-moderation/hyper-chat-moderation.infra.module'

@Module({
  imports: [HyperChatModerationInfraModule],
  providers: [HyperChatModerationsService],
  exports: [HyperChatModerationInfraModule, HyperChatModerationsService]
})
export class HyperChatModerationsAppModule {}
