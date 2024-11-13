import { QueueStatus } from '@domain/queue'
import { SupersBundles } from '@domain/supers-bundle'
import { VideoId } from '@domain/youtube'

export interface SupersBundleRepository {
  findAll: (args: { limit?: number }) => Promise<SupersBundles>

  save: (args: {
    where: { videoId: VideoId }
    data: { status: QueueStatus }
  }) => Promise<void>
}
