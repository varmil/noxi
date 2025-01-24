import { Module } from '@nestjs/common'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { ChatBundleQueueInfraModule } from '@infra/chat-bundle-queue/chat-bundle-queue.infra.module'
import { StreamInfraModule } from '@infra/stream/stream.infra.module'

@Module({
  imports: [ChatBundleQueueInfraModule, StreamInfraModule],
  providers: [ChatBundleQueuesService],
  exports: [
    ChatBundleQueueInfraModule,
    StreamInfraModule,
    ChatBundleQueuesService
  ]
})
export class ChatBundleQueuesModule {}
