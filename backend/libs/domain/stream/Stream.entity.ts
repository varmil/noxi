import { Exclude, Expose, Transform } from 'class-transformer'
import { Group } from '@domain/group'
import { StreamStatus, StreamTimes, Metrics } from '@domain/stream'
import { VideoId, Duration, Snippet } from '@domain/youtube'

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
  public readonly metrics: Metrics

  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group

  constructor(args: {
    videoId: VideoId
    snippet: Snippet
    duration?: Duration
    streamTimes: StreamTimes
    metrics: Metrics
    group: Group
  }) {
    this.videoId = args.videoId
    this.snippet = args.snippet
    this.duration = args.duration
    this.streamTimes = args.streamTimes
    this.metrics = args.metrics
    this.group = args.group
  }

  @Expose()
  @Transform(({ value }: { value: StreamStatus }) => value.get())
  get status() {
    return this.streamTimes.streamStatus
  }

  /** 簡易的にタイトルに特定の文字列があるかどうかで判定 */
  @Exclude()
  get membersOnly() {
    const TITLES = [
      'members only',
      'member stream',
      'membership',
      'メンバー限定',
      'メン限'
    ]
    return TITLES.some(title =>
      this.snippet.title.toLowerCase().replaceAll('-', ' ').includes(title)
    )
  }
}
