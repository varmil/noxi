import { Module } from '@nestjs/common'
import { HyperChatRankingRepositoryImpl } from '@infra/hyper-chat-ranking/HyperChatRanking.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatRankingRepositoryImpl,
    {
      provide: 'HyperChatRankingRepository',
      useClass: HyperChatRankingRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatRankingRepositoryImpl,
    {
      provide: 'HyperChatRankingRepository',
      useClass: HyperChatRankingRepositoryImpl
    }
  ]
})
export class HyperChatRankingInfraModule {}
