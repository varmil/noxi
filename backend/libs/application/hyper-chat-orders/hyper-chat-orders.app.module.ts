import { Module } from '@nestjs/common'
import { HyperChatOrdersService } from '@app/hyper-chat-orders/hyper-chat-orders.service'
import { HyperChatOrderInfraModule } from '@infra/hyper-chat-order/hyper-chat-order.infra.module'

@Module({
  imports: [HyperChatOrderInfraModule],
  providers: [HyperChatOrdersService],
  exports: [HyperChatOrderInfraModule, HyperChatOrdersService]
})
export class HyperChatOrdersAppModule {}
