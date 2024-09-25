import { Exclude } from 'class-transformer'
import { StreamTimes } from '@domain/youtube'
import { LiveChatId } from '@domain/youtube/live-chat-message'

/**
 * liveStreamingDetails オブジェクトには、動画のライブ配信に関するメタデータが含まれます。
 * 動画が今後のライブ配信、ライブ配信中、または完了したライブ配信の場合にのみ、
 * このオブジェクトが video リソースに含まれます。
 */
export class LiveStreamingDetails {
  public readonly streamTimes: StreamTimes
  public readonly concurrentViewers?: number
  @Exclude()
  public readonly activeLiveChatId: LiveChatId

  constructor(args: {
    streamTimes: StreamTimes
    concurrentViewers?: number
    activeLiveChatId: LiveChatId
  }) {
    this.streamTimes = args.streamTimes
    this.concurrentViewers = args.concurrentViewers
    this.activeLiveChatId = args.activeLiveChatId
  }
}
