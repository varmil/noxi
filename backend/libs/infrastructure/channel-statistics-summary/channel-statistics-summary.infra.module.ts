import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SupersSummaryRepositoryImpl } from '@infra/supers-summary/SupersSummary.repository-impl'
import { SupersMonthlySummaryRepositoryImpl } from '@infra/supers-summary/monthly/SupersMonthlySummary.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SupersMonthlySummaryRepositoryImpl,
    {
      provide: 'SupersMonthlySummaryRepository',
      useClass: SupersMonthlySummaryRepositoryImpl
    },
    SupersSummaryRepositoryImpl,
    {
      provide: 'SupersSummaryRepository',
      useClass: SupersSummaryRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    SupersMonthlySummaryRepositoryImpl,
    {
      provide: 'SupersMonthlySummaryRepository',
      useClass: SupersMonthlySummaryRepositoryImpl
    },

    SupersSummaryRepositoryImpl,
    {
      provide: 'SupersSummaryRepository',
      useClass: SupersSummaryRepositoryImpl
    }
  ]
})
export class SupersSummaryInfraModule {}
