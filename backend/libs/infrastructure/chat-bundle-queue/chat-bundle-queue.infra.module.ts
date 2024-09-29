import { Module } from '@nestjs/common'
import { ChatBundleQueueRepositoryImpl } from '@infra/chat-bundle-queue/ChatBundleQueue.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChatBundleQueueRepositoryImpl,
    {
      provide: 'ChatBundleQueueRepository',
      useClass: ChatBundleQueueRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    ChatBundleQueueRepositoryImpl,
    {
      provide: 'ChatBundleQueueRepository',
      useClass: ChatBundleQueueRepositoryImpl
    }
  ]
})
export class ChatBundleQueueInfraModule {}
