import { Expose, Transform } from 'class-transformer'
import { StreamStatus } from '@domain/stream'
import { VideoId, Duration, Snippet, StreamTimes } from '@domain/youtube'

export class Stream {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  public readonly snippet: Snippet
  /**
   * Live中はP0D（０）固定
   */
  @Transform(({ value }: { value: Duration }) => value.get())
  public readonly duration?: Duration
  public readonly streamTimes: StreamTimes

  /** 最大同時視聴者数: ライブ配信を同時に視聴した視聴者数の最大値です。 */
  public readonly maxViewerCount: number
  /** 平均同時視聴者数: ライブ配信を同時に視聴した視聴者数の平均値です。 */
  public readonly avgConcurrentViewers: number
  /** チャットメッセージ数: ライブ配信中に視聴者が送信したチャットメッセージの件数 */
  public readonly chatCount: number
  /** 視聴回数: ライブ配信が配信中に視聴された合計回数です。 */
  public readonly views: number
  public readonly likeCount: number

  constructor(args: {
    videoId: VideoId
    snippet: Snippet
    duration?: Duration
    streamTimes: StreamTimes

    maxViewerCount: number
    avgConcurrentViewers: number
    chatCount: number
    views: number
    likeCount: number
  }) {
    this.videoId = args.videoId
    this.snippet = args.snippet
    this.duration = args.duration
    this.streamTimes = args.streamTimes

    this.maxViewerCount = args.maxViewerCount
    this.avgConcurrentViewers = args.avgConcurrentViewers
    this.chatCount = args.chatCount
    this.views = args.views
    this.likeCount = args.likeCount
  }

  @Expose()
  @Transform(({ value }: { value: StreamStatus }) => value.get())
  get status() {
    return this.streamTimes.streamStatus
  }
}
