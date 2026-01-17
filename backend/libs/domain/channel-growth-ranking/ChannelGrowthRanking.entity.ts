import { Transform } from 'class-transformer'
import { GroupId, GroupName } from '@domain/group'
import {
  ChannelId,
  ChannelTitle,
  SubscriberCount,
  ThumbnailUrl
} from '@domain/youtube/channel'
import { Diff } from './Diff.vo'
import { Rank } from './Rank.vo'
import { Rate } from './Rate.vo'

/** チャンネル登録者数増加ランキング */
export class ChannelGrowthRanking {
  @Transform(({ value }: { value: Rank }) => value.get())
  public readonly rank: Rank

  @Transform(({ value }: { value: ChannelId }) => value.get())
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: ChannelTitle }) => value.get())
  public readonly channelTitle: ChannelTitle

  @Transform(({ value }: { value: ThumbnailUrl | null }) => value?.get() ?? null)
  public readonly thumbnailUrl: ThumbnailUrl | null

  @Transform(({ value }: { value: GroupId }) => value.get())
  public readonly groupId: GroupId

  @Transform(({ value }: { value: GroupName }) => value.get())
  public readonly groupName: GroupName

  @Transform(({ value }: { value: Diff }) => value.get())
  public readonly diff: Diff

  @Transform(({ value }: { value: Rate }) => value.get())
  public readonly rate: Rate

  @Transform(({ value }: { value: SubscriberCount }) => value.get())
  public readonly subscriberCount: SubscriberCount

  constructor(args: {
    rank: Rank
    channelId: ChannelId
    channelTitle: ChannelTitle
    thumbnailUrl: ThumbnailUrl | null
    groupId: GroupId
    groupName: GroupName
    diff: Diff
    rate: Rate
    subscriberCount: SubscriberCount
  }) {
    this.rank = args.rank
    this.channelId = args.channelId
    this.channelTitle = args.channelTitle
    this.thumbnailUrl = args.thumbnailUrl
    this.groupId = args.groupId
    this.groupName = args.groupName
    this.diff = args.diff
    this.rate = args.rate
    this.subscriberCount = args.subscriberCount
  }
}
