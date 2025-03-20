import { Transform } from 'class-transformer'
import { Group } from '@domain/group'
import { Count } from '@domain/membership'
import { AmountMicros } from '@domain/supers/base'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'

export class MembershipBundle {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  /** JPY */
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros
  @Transform(({ value }: { value: Count }) => value.get())
  public readonly count: Count
  @Transform(({ value }: { value: ActualStartTime }) => value.get())
  public readonly actualStartTime: ActualStartTime
  /** ライブ中の場合はundefined, ライブ終了後の場合は終了時刻 */
  @Transform(({ value }: { value?: ActualEndTime }) => value?.get())
  public readonly actualEndTime?: ActualEndTime
  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group

  constructor(args: {
    videoId: VideoId
    channelId: ChannelId
    amountMicros: AmountMicros
    count: Count
    actualStartTime: ActualStartTime
    actualEndTime?: ActualEndTime
    group: Group
  }) {
    this.videoId = args.videoId
    this.channelId = args.channelId
    this.amountMicros = args.amountMicros
    this.count = args.count
    this.actualStartTime = args.actualStartTime
    this.actualEndTime = args.actualEndTime
    this.group = args.group
  }
}
