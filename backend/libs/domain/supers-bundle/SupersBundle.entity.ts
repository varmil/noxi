import { Transform } from 'class-transformer'
import { Group } from '@domain/group'
import { AmountMicros } from '@domain/supers/base'
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
  @Transform(({ value }: { value: ActualEndTime }) => value.get())
  public readonly actualEndTime: ActualEndTime
  @Transform(({ value }: { value: Group }) => value.get())
  public readonly group: Group

  constructor(args: { videoId: VideoId }) {
    this.videoId = args.videoId
  }
}
