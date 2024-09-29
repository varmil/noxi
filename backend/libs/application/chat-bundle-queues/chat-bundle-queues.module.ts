import { Module } from '@nestjs/common'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { ChatBundleQueueInfraModule } from '@infra/chat-bundle-queue/chat-bundle-queue.infra.module'

@Module({
  imports: [ChatBundleQueueInfraModule],
  providers: [ChatBundleQueuesService],
  exports: [ChatBundleQueuesService]
})
export class ChatBundleQueuesModule {}
