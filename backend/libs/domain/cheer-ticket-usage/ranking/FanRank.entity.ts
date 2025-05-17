import { Exclude, Transform } from 'class-transformer'
import { Rank, UsedCount } from '@domain/cheer-ticket-usage'
import { UserId } from '@domain/user'

/** 応援した側の順位 */
export class FanRank {
  @Exclude()
  public readonly userId: UserId

  @Transform(({ value }: { value: Rank }) => value.get())
  public readonly rank: Rank

  @Transform(({ value }: { value: UsedCount }) => value.get())
  public readonly usedCount: UsedCount

  constructor(args: { userId: UserId; rank: Rank; usedCount: UsedCount }) {
    this.userId = args.userId
    this.rank = args.rank
    this.usedCount = args.usedCount
  }
}
