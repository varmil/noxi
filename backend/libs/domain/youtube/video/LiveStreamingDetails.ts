import {
  StreamStatusEnded,
  StreamStatusLive,
  StreamStatusScheduled
} from '@domain/stream'

/**
 * liveStreamingDetails オブジェクトには、動画のライブ配信に関するメタデータが含まれます。
 * 動画が今後のライブ配信、ライブ配信中、または完了したライブ配信の場合にのみ、
 * このオブジェクトが video リソースに含まれます。
 */
export class LiveStreamingDetails {
  public readonly scheduledStartTime: Date
  public readonly actualStartTime?: Date
  public readonly actualEndTime?: Date
  public readonly concurrentViewers?: number

  constructor(args: {
    scheduledStartTime: Date
    actualStartTime?: Date
    actualEndTime?: Date
    concurrentViewers?: number
  }) {
    this.scheduledStartTime = args.scheduledStartTime
    this.actualStartTime = args.actualStartTime
    this.actualEndTime = args.actualEndTime
    this.concurrentViewers = args.concurrentViewers
  }

  get streamStatus() {
    if (this.actualEndTime) {
      return StreamStatusEnded
    }
    if (this.actualStartTime) {
      return StreamStatusLive
    }
    return StreamStatusScheduled
  }
}
