import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { StreamVolumeTrendRepositoryImpl } from '@infra/stream-volume-trend/StreamVolumeTrend.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    StreamVolumeTrendRepositoryImpl,
    {
      provide: 'StreamVolumeTrendRepository',
      useClass: StreamVolumeTrendRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    StreamVolumeTrendRepositoryImpl,
    {
      provide: 'StreamVolumeTrendRepository',
      useClass: StreamVolumeTrendRepositoryImpl
    }
  ]
})
export class StreamVolumeTrendInfraModule {}
