import { Module } from '@nestjs/common'
import { HyperChatOrderRepositoryImpl } from '@infra/hyper-chat-order/HyperChatOrder.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatOrderRepositoryImpl,
    {
      provide: 'HyperChatOrderRepository',
      useClass: HyperChatOrderRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatOrderRepositoryImpl,
    {
      provide: 'HyperChatOrderRepository',
      useClass: HyperChatOrderRepositoryImpl
    }
  ]
})
export class HyperChatOrderInfraModule {}
