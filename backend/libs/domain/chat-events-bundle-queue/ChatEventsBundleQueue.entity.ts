import { Exclude } from 'class-transformer'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'

export class ChatEventsBundleQueue {
  @Exclude()
  public readonly status: QueueStatus
  @Exclude()
  public readonly videoId: VideoId
  @Exclude()
  public readonly createdAt: Date

  constructor(args: {
    status: QueueStatus
    videoId: VideoId
    createdAt: Date
  }) {
    this.status = args.status
    this.videoId = args.videoId
    this.createdAt = args.createdAt
  }
}
