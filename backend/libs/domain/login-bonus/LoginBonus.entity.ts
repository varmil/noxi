import { Exclude, Transform } from 'class-transformer'
import { LastClaimedAt } from '@domain/login-bonus/LastClaimedAt.vo'
import { UserId } from '@domain/user'

export class LoginBonus {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId
  @Transform(({ value }: { value: LastClaimedAt }) => value.get())
  public readonly lastClaimedAt: LastClaimedAt

  constructor(args: { userId: UserId; lastClaimedAt: LastClaimedAt }) {
    this.userId = args.userId
    this.lastClaimedAt = args.lastClaimedAt
  }

  /** 20時間経っていればtrue */
  @Exclude()
  canClaimDaily(): boolean {
    const hoursSinceLastClaim =
      (new Date().getTime() - this.lastClaimedAt.get().getTime()) /
      1000 /
      60 /
      60
    return hoursSinceLastClaim >= 20
  }
}
