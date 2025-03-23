import { Module } from '@nestjs/common'
import { ChatEventsBundleQueueRepositoryImpl } from '@infra/chat-events-bundle-queue/ChatEventsBundleQueue.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChatEventsBundleQueueRepositoryImpl,
    {
      provide: 'ChatEventsBundleQueueRepository',
      useClass: ChatEventsBundleQueueRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    ChatEventsBundleQueueRepositoryImpl,
    {
      provide: 'ChatEventsBundleQueueRepository',
      useClass: ChatEventsBundleQueueRepositoryImpl
    }
  ]
})
export class ChatEventsBundleQueueInfraModule {}
