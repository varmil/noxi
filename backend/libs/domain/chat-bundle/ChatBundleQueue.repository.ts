import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'

export interface ChatBundleQueueRepository {
  findAll: (args: {
    limit: number
  }) => Promise<{ videoId: VideoId; status: QueueStatus }[]>

  save: (args: {
    where: { videoId: VideoId }
    data: { status: QueueStatus }
  }) => Promise<void>

  delete: (args: { where: { videoId: VideoId } }) => Promise<void>
}
