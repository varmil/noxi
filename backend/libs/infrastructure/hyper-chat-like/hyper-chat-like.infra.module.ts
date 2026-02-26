import { Module } from '@nestjs/common'
import { HyperChatLikeRepositoryImpl } from '@infra/hyper-chat-like/HyperChatLike.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatLikeRepositoryImpl,
    {
      provide: 'HyperChatLikeRepository',
      useClass: HyperChatLikeRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatLikeRepositoryImpl,
    {
      provide: 'HyperChatLikeRepository',
      useClass: HyperChatLikeRepositoryImpl
    }
  ]
})
export class HyperChatLikeInfraModule {}
