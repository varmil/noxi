import { Expose, Transform } from 'class-transformer'
import type { Group } from '@domain/group'
import { StreamStatus, StreamTimes, Metrics } from '@domain/stream'
import { VideoId, Duration, VideoSnippet, UpdatedAt } from '@domain/youtube'

export class Stream {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  public readonly snippet: VideoSnippet
  /**
   * Live中はP0D（０）固定
   */
  @Transform(({ value }: { value: Duration }) => value.get())
  public readonly duration?: Duration
  public readonly streamTimes: StreamTimes
  public readonly metrics: Metrics
  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group
  @Transform(({ value }: { value: UpdatedAt }) => value.get())
  public readonly updatedAt: UpdatedAt

  constructor(args: {
    videoId: VideoId
    snippet: VideoSnippet
    duration?: Duration
    streamTimes: StreamTimes
    metrics: Metrics
    group: Group
    updatedAt: UpdatedAt
  }) {
    this.videoId = args.videoId
    this.snippet = args.snippet
    this.duration = args.duration
    this.streamTimes = args.streamTimes
    this.metrics = args.metrics
    this.group = args.group
    this.updatedAt = args.updatedAt
  }

  @Expose()
  @Transform(({ value }: { value: StreamStatus }) => value.get())
  get status() {
    return this.streamTimes.streamStatus
  }

  /** 簡易的に
   * * viewsがundefined = メンバー限定
   * * タイトルに特定の文字列がある = メンバー限定
   */
  @Expose()
  get membersOnly() {
    if (this.metrics.membersOnly()) return true

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
