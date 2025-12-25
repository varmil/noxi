import {
  
  Controller,
  Post,
  Req,
  UseGuards,
  
} from '@nestjs/common'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { LoginBonusesService } from '@app/login-bonuses/login-bonuses.service'
import type { LoginBonusResult } from '@domain/login-bonus'
import { User } from '@domain/user'

@Controller('login-bonuses')
export class LoginBonusesController {
  constructor(private readonly loginBonusesService: LoginBonusesService) {}

  @Post('/daily')
  @UseGuards(JwtAuthGuard)
  async claimDailyLoginBonus(
    @Req() req: { user: User }
  ): Promise<LoginBonusResult> {
    return this.loginBonusesService.claimDailyIfEligible({
      userId: req.user.id
    })
  }
}
