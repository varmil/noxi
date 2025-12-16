import { Transform } from 'class-transformer'
import { GroupId } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency'
import { SupersCount } from '@domain/supers-bundle'
import {
  ActualEndTime,
  ActualStartTime,
  ChannelId,
  VideoId
} from '@domain/youtube'

export class SupersBundle {
  @Transform(({ value }: { value: VideoId }) => value.get())
  public readonly videoId: VideoId
  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId
  /** JPY */
  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly amountMicros: AmountMicros
  @Transform(({ value }: { value: SupersCount }) => value.get())
  public readonly count: SupersCount
  @Transform(({ value }: { value: ActualStartTime }) => value.get())
  public readonly actualStartTime: ActualStartTime
  /** ライブ中の場合はundefined, ライブ終了後の場合は終了時刻 */
  @Transform(({ value }: { value?: ActualEndTime }) => value?.get())
  public readonly actualEndTime?: ActualEndTime
  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly group: GroupId

  constructor(args: {
    videoId: VideoId
    channelId: ChannelId
    amountMicros: AmountMicros
    count: SupersCount
    actualStartTime: ActualStartTime
    actualEndTime?: ActualEndTime
    group: GroupId
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
