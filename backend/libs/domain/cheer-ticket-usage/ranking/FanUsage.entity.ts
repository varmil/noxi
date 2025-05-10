import { Transform } from 'class-transformer'
import { UsedCount } from '@domain/cheer-ticket-usage'
import { UserId } from '@domain/user'

/** 応援した側の量を表す */
export class FanUsage {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  @Transform(({ value }: { value: UsedCount }) => value.get())
  public readonly usedCount: UsedCount

  constructor(args: { userId: UserId; usedCount: UsedCount }) {
    this.userId = args.userId
    this.usedCount = args.usedCount
  }
}
