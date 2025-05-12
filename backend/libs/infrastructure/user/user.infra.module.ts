import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { UserRepositoryImpl } from '@infra/user/User.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    UserRepositoryImpl,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    UserRepositoryImpl,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl
    }
  ]
})
export class UserInfraModule {}
