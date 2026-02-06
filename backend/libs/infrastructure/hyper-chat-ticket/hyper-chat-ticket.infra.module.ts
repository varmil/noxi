import { Module } from '@nestjs/common'
import { HyperChatTicketRepositoryImpl } from '@infra/hyper-chat-ticket/HyperChatTicket.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatTicketRepositoryImpl,
    {
      provide: 'HyperChatTicketRepository',
      useClass: HyperChatTicketRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatTicketRepositoryImpl,
    {
      provide: 'HyperChatTicketRepository',
      useClass: HyperChatTicketRepositoryImpl
    }
  ]
})
export class HyperChatTicketInfraModule {}
