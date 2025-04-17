import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { StreamStatsRepositoryImpl } from '@infra/stream-stats/StreamStats.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    StreamStatsRepositoryImpl,
    { provide: 'StreamStatsRepository', useClass: StreamStatsRepositoryImpl }
  ],
  exports: [
    PrismaInfraModule,

    StreamStatsRepositoryImpl,
    { provide: 'StreamStatsRepository', useClass: StreamStatsRepositoryImpl }
  ]
})
export class StreamStatsInfraModule {}
