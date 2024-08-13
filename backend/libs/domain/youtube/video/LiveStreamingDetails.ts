import { StreamTimes } from '@domain/youtube'

/**
 * liveStreamingDetails オブジェクトには、動画のライブ配信に関するメタデータが含まれます。
 * 動画が今後のライブ配信、ライブ配信中、または完了したライブ配信の場合にのみ、
 * このオブジェクトが video リソースに含まれます。
 */
export class LiveStreamingDetails {
  public readonly streamTimes: StreamTimes
  public readonly concurrentViewers?: number

  constructor(args: { streamTimes: StreamTimes; concurrentViewers?: number }) {
    this.streamTimes = args.streamTimes
    this.concurrentViewers = args.concurrentViewers
  }
}
