import { LoginBonusResult } from '@domain/login-bonus'
import { UserId } from '@domain/user'

export interface LoginBonusRepository {
  claimDailyIfEligible: (args: { userId: UserId }) => Promise<LoginBonusResult>
}
