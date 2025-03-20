import { Module } from '@nestjs/common'
import { ChatEventsBundleQueuesService } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.service'
import { ChatEventsBundleQueueInfraModule } from '@infra/chat-events-bundle-queue/chat-events-bundle-queue.infra.module'
import { StreamInfraModule } from '@infra/stream/stream.infra.module'

@Module({
  imports: [ChatEventsBundleQueueInfraModule, StreamInfraModule],
  providers: [ChatEventsBundleQueuesService],
  exports: [
    ChatEventsBundleQueueInfraModule,
    StreamInfraModule,
    ChatEventsBundleQueuesService
  ]
})
export class ChatEventsBundleQueuesModule {}
