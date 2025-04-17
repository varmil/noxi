import { Module } from '@nestjs/common'
import { ChatDeletingQueueRepositoryImpl } from '@infra/chat-deleting-queue/ChatDeletingQueue.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChatDeletingQueueRepositoryImpl,
    {
      provide: 'ChatDeletingQueueRepository',
      useClass: ChatDeletingQueueRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    ChatDeletingQueueRepositoryImpl,
    {
      provide: 'ChatDeletingQueueRepository',
      useClass: ChatDeletingQueueRepositoryImpl
    }
  ]
})
export class ChatDeletingQueueInfraModule {}
