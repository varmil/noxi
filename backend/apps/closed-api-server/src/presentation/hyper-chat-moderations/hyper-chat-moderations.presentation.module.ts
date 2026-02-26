import { Module } from '@nestjs/common'
import { HyperChatModerationsController } from '@presentation/hyper-chat-moderations/hyper-chat-moderations.controller'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { HyperChatModerationsAppModule } from '@app/hyper-chat-moderations/hyper-chat-moderations.app.module'

@Module({
  imports: [AuthModule, HyperChatModerationsAppModule],
  controllers: [HyperChatModerationsController]
})
export class HyperChatModerationsPresentationModule {}
