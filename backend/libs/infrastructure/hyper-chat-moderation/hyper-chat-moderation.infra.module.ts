import { Module } from '@nestjs/common'
import { HyperChatModerationRepositoryImpl } from '@infra/hyper-chat-moderation/HyperChatModeration.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatModerationRepositoryImpl,
    {
      provide: 'HyperChatModerationRepository',
      useClass: HyperChatModerationRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatModerationRepositoryImpl,
    {
      provide: 'HyperChatModerationRepository',
      useClass: HyperChatModerationRepositoryImpl
    }
  ]
})
export class HyperChatModerationInfraModule {}
