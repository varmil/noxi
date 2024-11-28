import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SupersSummaryRepositoryImpl } from '@infra/supers-summary/SupersSummary.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SupersSummaryRepositoryImpl,
    {
      provide: 'SupersSummaryRepository',
      useClass: SupersSummaryRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    SupersSummaryRepositoryImpl,
    {
      provide: 'SupersSummaryRepository',
      useClass: SupersSummaryRepositoryImpl
    }
  ]
})
export class SupersSummaryInfraModule {}
