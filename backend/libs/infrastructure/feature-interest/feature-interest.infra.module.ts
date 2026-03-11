import { Module } from '@nestjs/common'
import { FeatureInterestRepositoryImpl } from '@infra/feature-interest/FeatureInterest.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    FeatureInterestRepositoryImpl,
    {
      provide: 'FeatureInterestRepository',
      useClass: FeatureInterestRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    FeatureInterestRepositoryImpl,
    {
      provide: 'FeatureInterestRepository',
      useClass: FeatureInterestRepositoryImpl
    }
  ]
})
export class FeatureInterestInfraModule {}
