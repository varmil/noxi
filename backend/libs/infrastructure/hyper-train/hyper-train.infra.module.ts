import { Module } from '@nestjs/common'
import { HyperTrainRepositoryImpl } from '@infra/hyper-train/HyperTrain.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperTrainRepositoryImpl,
    {
      provide: 'HyperTrainRepository',
      useClass: HyperTrainRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperTrainRepositoryImpl,
    {
      provide: 'HyperTrainRepository',
      useClass: HyperTrainRepositoryImpl
    }
  ]
})
export class HyperTrainInfraModule {}
