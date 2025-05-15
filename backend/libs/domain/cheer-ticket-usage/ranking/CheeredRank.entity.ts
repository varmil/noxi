import { Exclude, Transform } from 'class-transformer'
import { Rank, UsedCount } from '@domain/cheer-ticket-usage'
import { ChannelId } from '@domain/youtube'

/** 応援された側の順位 */
export class CheeredRank {
  @Exclude()
  public readonly channelId: ChannelId

  @Transform(({ value }: { value: Rank }) => value.get())
  public readonly rank: Rank

  @Transform(({ value }: { value: UsedCount }) => value.get())
  public readonly usedCount: UsedCount

  constructor(args: {
    channelId: ChannelId
    rank: Rank
    usedCount: UsedCount
  }) {
    this.channelId = args.channelId
    this.rank = args.rank
    this.usedCount = args.usedCount
  }
}
