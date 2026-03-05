import { Transform } from 'class-transformer'
import { GroupId, GroupName } from '@domain/group'
import { Diff, Rank } from '@domain/ranking'
import {
  ChannelId,
  ChannelTitle,
  ThumbnailUrl,
  ViewCount
} from '@domain/youtube/channel'

/** チャンネル再生数増加ランキング */
export class ChannelViewCountRanking {
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

  @Transform(({ value }: { value: Diff }) => value.get())
  public readonly diff: Diff

  @Transform(({ value }: { value: ViewCount }) => value.toString())
  public readonly viewCount: ViewCount

  constructor(args: {
    rank: Rank
    channelId: ChannelId
    channelTitle: ChannelTitle
    thumbnailUrl: ThumbnailUrl | null
    groupId: GroupId
    groupName: GroupName
    diff: Diff
    viewCount: ViewCount
  }) {
    this.rank = args.rank
    this.channelId = args.channelId
    this.channelTitle = args.channelTitle
    this.thumbnailUrl = args.thumbnailUrl
    this.groupId = args.groupId
    this.groupName = args.groupName
    this.diff = args.diff
    this.viewCount = args.viewCount
  }
}
