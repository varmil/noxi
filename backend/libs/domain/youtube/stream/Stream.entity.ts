import { Expose } from 'class-transformer'
import { VideoId, Duration, Snippet, StreamTimes } from '@domain/youtube'

export class Stream {
  public readonly videoId: VideoId
  public readonly snippet: Snippet
  /**
   * Live中はP0D（０）固定
   */
  public readonly duration?: Duration
  public readonly streamTimes: StreamTimes

  public readonly maxViewerCount: number
  public readonly chatCount: number
  public readonly likeCount: number

  constructor(args: {
    videoId: VideoId
    snippet: Snippet
    duration?: Duration
    streamTimes: StreamTimes

    maxViewerCount: number
    chatCount: number
    likeCount: number
  }) {
    this.videoId = args.videoId
    this.snippet = args.snippet
    this.duration = args.duration
    this.streamTimes = args.streamTimes

    this.maxViewerCount = args.maxViewerCount
    this.chatCount = args.chatCount
    this.likeCount = args.likeCount
  }

  @Expose()
  get status() {
    return this.streamTimes.streamStatus
  }
}
