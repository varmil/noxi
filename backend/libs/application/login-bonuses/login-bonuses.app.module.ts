import { Module } from '@nestjs/common'
import { LoginBonusesService } from '@app/login-bonuses/login-bonuses.service'
import { LoginBonusInfraModule } from '@infra/login-bonus/login-bonus.infra.module'

@Module({
  imports: [LoginBonusInfraModule],
  providers: [LoginBonusesService],
  exports: [LoginBonusInfraModule, LoginBonusesService]
})
export class LoginBonusesAppModule {}
