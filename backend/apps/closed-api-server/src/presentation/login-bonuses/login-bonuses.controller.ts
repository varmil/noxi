import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { PostDailyLoginBonus } from '@presentation/login-bonuses/dto/PostDailyLoginBonus.dto'
import { LoginBonusesService } from '@app/login-bonuses/login-bonuses.service'

@Controller('login-bonuses')
@UseInterceptors(ClassSerializerInterceptor)
export class LoginBonusesController {
  constructor(private readonly loginBonusesService: LoginBonusesService) {}

  @Post('/daily')
  async claimDailyLoginBonus(
    @Body() dto: PostDailyLoginBonus
  ): Promise<boolean> {
    return await this.loginBonusesService.claimDailyIfEligible({
      userId: dto.toUserId()
    })
  }
}
