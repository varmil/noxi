import { Transform } from 'class-transformer'
import { GroupId, GroupName } from '@domain/group'
import { AmountMicros } from '@domain/lib/currency/AmountMicros.vo'
import { Rank } from '@domain/ranking'
import {
  ChannelId,
  ChannelTitle,
  ThumbnailUrl
} from '@domain/youtube/channel'

/** チャンネルスパチャ金額ランキング */
export class ChannelSupersRanking {
  @Transform(({ value }: { value: Rank }) => value.get())
  public readonly rank: Rank

  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: ChannelTitle }) => value.get())
  public readonly channelTitle: ChannelTitle

  @Transform(
    ({ value }: { value: ThumbnailUrl | null }) => value?.get() ?? null
  )
  public readonly thumbnailUrl: ThumbnailUrl | null

  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly groupId: GroupId

  @Transform(({ value }: { value: GroupName }) => value.get())
  public readonly groupName: GroupName

  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly currentAmount: AmountMicros

  @Transform(({ value }: { value: AmountMicros }) => value.toString())
  public readonly previousAmount: AmountMicros

  constructor(args: {
    rank: Rank
    channelId: ChannelId
    channelTitle: ChannelTitle
    thumbnailUrl: ThumbnailUrl | null
    groupId: GroupId
    groupName: GroupName
    currentAmount: AmountMicros
    previousAmount: AmountMicros
  }) {
    this.rank = args.rank
    this.channelId = args.channelId
    this.channelTitle = args.channelTitle
    this.thumbnailUrl = args.thumbnailUrl
    this.groupId = args.groupId
    this.groupName = args.groupName
    this.currentAmount = args.currentAmount
    this.previousAmount = args.previousAmount
  }
}
