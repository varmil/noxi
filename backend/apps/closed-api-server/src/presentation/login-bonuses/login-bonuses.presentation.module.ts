import { Module } from '@nestjs/common'
import { LoginBonusesController } from '@presentation/login-bonuses/login-bonuses.controller'
import { LoginBonusesAppModule } from '@app/login-bonuses/login-bonuses.app.module'

@Module({
  imports: [LoginBonusesAppModule],
  controllers: [LoginBonusesController],
  providers: []
})
export class LoginBonusesPresentationModule {}
