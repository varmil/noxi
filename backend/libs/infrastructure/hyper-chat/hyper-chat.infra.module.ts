import { Module } from '@nestjs/common'
import { HyperChatRepositoryImpl } from '@infra/hyper-chat/HyperChat.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatRepositoryImpl,
    {
      provide: 'HyperChatRepository',
      useClass: HyperChatRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatRepositoryImpl,
    {
      provide: 'HyperChatRepository',
      useClass: HyperChatRepositoryImpl
    }
  ]
})
export class HyperChatInfraModule {}
