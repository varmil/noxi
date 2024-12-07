import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { ChatCountRepositoryImpl } from '@infra/stream-stats/ChatCount.repository-impl'
import { StreamStatsRepositoryImpl } from '@infra/stream-stats/StreamStats.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChatCountRepositoryImpl,
    { provide: 'ChatCountRepository', useClass: ChatCountRepositoryImpl },
    StreamStatsRepositoryImpl,
    { provide: 'StreamStatsRepository', useClass: StreamStatsRepositoryImpl }
  ],
  exports: [
    PrismaInfraModule,

    ChatCountRepositoryImpl,
    { provide: 'ChatCountRepository', useClass: ChatCountRepositoryImpl },
    StreamStatsRepositoryImpl,
    { provide: 'StreamStatsRepository', useClass: StreamStatsRepositoryImpl }
  ]
})
export class StreamStatsInfraModule {}
