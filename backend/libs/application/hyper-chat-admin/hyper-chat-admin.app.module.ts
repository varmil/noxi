import { Module } from '@nestjs/common'
import { HyperChatAdminService } from '@app/hyper-chat-admin/hyper-chat-admin.service'
import { HyperChatAdminInfraModule } from '@infra/hyper-chat-admin/hyper-chat-admin.infra.module'

@Module({
  imports: [HyperChatAdminInfraModule],
  providers: [HyperChatAdminService],
  exports: [HyperChatAdminInfraModule, HyperChatAdminService]
})
export class HyperChatAdminAppModule {}
