import { Module } from '@nestjs/common'
import { ChatDeletingQueuesService } from '@app/chat-deleting-queues/chat-deleting-queues.service'
import { ChatDeletingQueueInfraModule } from '@infra/chat-deleting-queue/chat-deleting-queue.infra.module'
import { StreamInfraModule } from '@infra/stream/stream.infra.module'

@Module({
  imports: [ChatDeletingQueueInfraModule, StreamInfraModule],
  providers: [ChatDeletingQueuesService],
  exports: [
    ChatDeletingQueueInfraModule,
    StreamInfraModule,
    ChatDeletingQueuesService
  ]
})
export class ChatDeletingQueuesModule {}
