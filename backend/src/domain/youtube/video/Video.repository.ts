import { Video } from '@domain/youtube/video/Video.entity'
import { Videos } from '@domain/youtube/video/Videos.collection'

export interface VideoRepository {
  findAll: (args: {
    where: { channelId: string }
    limit?: number
  }) => Promise<Videos>
  save: (video: Video) => Promise<void>
}
