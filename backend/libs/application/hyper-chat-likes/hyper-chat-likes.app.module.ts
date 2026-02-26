import { Module } from '@nestjs/common'
import { HyperChatLikesService } from '@app/hyper-chat-likes/hyper-chat-likes.service'
import { HyperChatLikeInfraModule } from '@infra/hyper-chat-like/hyper-chat-like.infra.module'

@Module({
  imports: [HyperChatLikeInfraModule],
  providers: [HyperChatLikesService],
  exports: [HyperChatLikeInfraModule, HyperChatLikesService]
})
export class HyperChatLikesAppModule {}
