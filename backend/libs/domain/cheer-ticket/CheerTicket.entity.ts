import { Transform } from 'class-transformer'
import { LastClaimedAt, TotalCount } from '@domain/cheer-ticket'
import { UserId } from '@domain/user'

export class CheerTicket {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId
  @Transform(({ value }: { value: TotalCount }) => value.get())
  public readonly totalCount: TotalCount
  @Transform(({ value }: { value: LastClaimedAt }) => value.get())
  public readonly lastClaimedAt: LastClaimedAt

  constructor(args: {
    userId: UserId
    totalCount: TotalCount
    lastClaimedAt: LastClaimedAt
  }) {
    this.userId = args.userId
    this.totalCount = args.totalCount
    this.lastClaimedAt = args.lastClaimedAt
  }
}
