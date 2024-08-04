import { VideoId } from '@domain/youtube/video'

export class ContentDetails {
  public readonly videoId: VideoId
  public readonly videoPublishedAt: Date

  constructor(args: { videoId: VideoId; videoPublishedAt: Date }) {
    this.videoId = args.videoId
    this.videoPublishedAt = args.videoPublishedAt
  }
}
