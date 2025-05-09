import { UserId } from '@domain/user'

export interface LoginBonusRepository {
  claimDailyIfEligible: (args: { userId: UserId }) => Promise<boolean>
}
