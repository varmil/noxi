import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SupersRankingRepositoryImpl } from '@infra/supers-ranking/SupersRanking.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SupersRankingRepositoryImpl,
    {
      provide: 'SupersRankingRepository',
      useClass: SupersRankingRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    SupersRankingRepositoryImpl,
    {
      provide: 'SupersRankingRepository',
      useClass: SupersRankingRepositoryImpl
    }
  ]
})
export class SupersRankingInfraModule {}
