import { QueueStatus } from '@domain/queue'
import { SupersBundleQueues } from '@domain/supers-bundle-queue'
import { VideoId } from '@domain/youtube'

export interface SupersBundleQueueRepository {
  findAll: (args: { limit?: number }) => Promise<SupersBundleQueues>

  save: (args: {
    where: { videoId: VideoId }
    data: { status: QueueStatus }
  }) => Promise<void>

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>
}
