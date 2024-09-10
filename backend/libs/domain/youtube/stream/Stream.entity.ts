import { Expose, Transform } from 'class-transformer'
import { Group } from '@domain/group'
import { StreamStatus } from '@domain/stream'
import {
  VideoId,
  Duration,
  Snippet,
  StreamTimes,
  Metrics
} from '@domain/youtube'

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
}
