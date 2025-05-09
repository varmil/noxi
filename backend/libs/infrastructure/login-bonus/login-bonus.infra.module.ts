import { Module } from '@nestjs/common'
import { LoginBonusRepositoryImpl } from '@infra/login-bonus/LoginBonus.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    LoginBonusRepositoryImpl,
    {
      provide: 'LoginBonusRepository',
      useClass: LoginBonusRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    LoginBonusRepositoryImpl,
    {
      provide: 'LoginBonusRepository',
      useClass: LoginBonusRepositoryImpl
    }
  ]
})
export class LoginBonusInfraModule {}
