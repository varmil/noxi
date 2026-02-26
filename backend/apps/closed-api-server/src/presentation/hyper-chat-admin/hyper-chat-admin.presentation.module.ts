import { Module } from '@nestjs/common'
import { HyperChatAdminController } from '@presentation/hyper-chat-admin/hyper-chat-admin.controller'
import { AuthModule } from '@presentation/nestjs/guard/auth/auth.module'
import { HyperChatAdminAppModule } from '@app/hyper-chat-admin/hyper-chat-admin.app.module'

@Module({
  imports: [AuthModule, HyperChatAdminAppModule],
  controllers: [HyperChatAdminController]
})
export class HyperChatAdminPresentationModule {}
