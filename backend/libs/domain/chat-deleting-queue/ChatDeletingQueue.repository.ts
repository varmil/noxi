import { ChatDeletingQueues } from '@domain/chat-deleting-queue'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'

export interface ChatDeletingQueueRepository {
  findAll: (args: {
    where?: { createdAt?: { gte?: Date; lte: Date } }
    limit?: number
  }) => Promise<ChatDeletingQueues>

  save: (args: {
    where: { videoId: VideoId }
    data: { status: QueueStatus }
  }) => Promise<void>

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>
}
