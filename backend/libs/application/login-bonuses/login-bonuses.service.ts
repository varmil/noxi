import { Inject, Injectable } from '@nestjs/common'
import { LoginBonusRepository } from '@domain/login-bonus'

@Injectable()
export class LoginBonusesService {
  constructor(
    @Inject('LoginBonusRepository')
    private readonly loginBonusRepository: LoginBonusRepository
  ) {}

  async claimDailyIfEligible(
    args: Parameters<LoginBonusRepository['claimDailyIfEligible']>[0]
  ) {
    return await this.loginBonusRepository.claimDailyIfEligible(args)
  }
}
