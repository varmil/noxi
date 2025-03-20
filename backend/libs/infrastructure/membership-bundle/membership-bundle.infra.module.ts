import { Module } from '@nestjs/common'
import { MembershipBundleRepositoryImpl } from '@infra/membership-bundle/MembershipBundle.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    MembershipBundleRepositoryImpl,
    {
      provide: 'MembershipBundleRepository',
      useClass: MembershipBundleRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    MembershipBundleRepositoryImpl,
    {
      provide: 'MembershipBundleRepository',
      useClass: MembershipBundleRepositoryImpl
    }
  ]
})
export class MembershipBundleInfraModule {}
