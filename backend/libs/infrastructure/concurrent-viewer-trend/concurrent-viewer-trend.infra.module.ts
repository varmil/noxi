import { Module } from '@nestjs/common'
import { ConcurrentViewerTrendRepositoryImpl } from '@infra/concurrent-viewer-trend/ConcurrentViewerTrend.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ConcurrentViewerTrendRepositoryImpl,
    {
      provide: 'ConcurrentViewerTrendRepository',
      useClass: ConcurrentViewerTrendRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    ConcurrentViewerTrendRepositoryImpl,
    {
      provide: 'ConcurrentViewerTrendRepository',
      useClass: ConcurrentViewerTrendRepositoryImpl
    }
  ]
})
export class ConcurrentViewerTrendInfraModule {}
