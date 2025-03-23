import { ChatEventsBundleQueues } from '@domain/chat-events-bundle-queue'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'

export interface ChatEventsBundleQueueRepository {
  findAll: (args: { limit?: number }) => Promise<ChatEventsBundleQueues>

  save: (args: {
    where: { videoId: VideoId }
    data: { status: QueueStatus }
  }) => Promise<void>

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>
}
