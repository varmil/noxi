import { Module } from '@nestjs/common'
import { DayOfWeekDistributionRepositoryImpl } from '@infra/day-of-week-distribution/DayOfWeekDistribution.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    DayOfWeekDistributionRepositoryImpl,
    {
      provide: 'DayOfWeekDistributionRepository',
      useClass: DayOfWeekDistributionRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    DayOfWeekDistributionRepositoryImpl,
    {
      provide: 'DayOfWeekDistributionRepository',
      useClass: DayOfWeekDistributionRepositoryImpl
    }
  ]
})
export class DayOfWeekDistributionInfraModule {}
