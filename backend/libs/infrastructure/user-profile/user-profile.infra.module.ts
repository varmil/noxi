import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { UserProfileRepositoryImpl } from '@infra/user-profile/UserProfile.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    UserProfileRepositoryImpl,
    {
      provide: 'UserProfileRepository',
      useClass: UserProfileRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    UserProfileRepositoryImpl,
    {
      provide: 'UserProfileRepository',
      useClass: UserProfileRepositoryImpl
    }
  ]
})
export class UserProfileInfraModule {}
