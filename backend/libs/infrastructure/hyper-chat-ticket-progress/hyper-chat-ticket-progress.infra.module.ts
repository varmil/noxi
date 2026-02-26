import { Module } from '@nestjs/common'
import { HyperChatTicketProgressRepositoryImpl } from '@infra/hyper-chat-ticket-progress/HyperChatTicketProgress.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatTicketProgressRepositoryImpl,
    {
      provide: 'HyperChatTicketProgressRepository',
      useClass: HyperChatTicketProgressRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatTicketProgressRepositoryImpl,
    {
      provide: 'HyperChatTicketProgressRepository',
      useClass: HyperChatTicketProgressRepositoryImpl
    }
  ]
})
export class HyperChatTicketProgressInfraModule {}
