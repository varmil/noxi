import { Module } from '@nestjs/common'
import { MembershipSummaryRepositoryImpl } from '@infra/membership-summary/MembershipSummary.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    MembershipSummaryRepositoryImpl,
    {
      provide: 'MembershipSummaryRepository',
      useClass: MembershipSummaryRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    MembershipSummaryRepositoryImpl,
    {
      provide: 'MembershipSummaryRepository',
      useClass: MembershipSummaryRepositoryImpl
    }
  ]
})
export class MembershipSummaryInfraModule {}
