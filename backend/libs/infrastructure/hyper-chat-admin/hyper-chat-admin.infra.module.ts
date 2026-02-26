import { Module } from '@nestjs/common'
import { HyperChatAdminRepositoryImpl } from '@infra/hyper-chat-admin/HyperChatAdmin.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    HyperChatAdminRepositoryImpl,
    {
      provide: 'HyperChatAdminRepository',
      useClass: HyperChatAdminRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,
    HyperChatAdminRepositoryImpl,
    {
      provide: 'HyperChatAdminRepository',
      useClass: HyperChatAdminRepositoryImpl
    }
  ]
})
export class HyperChatAdminInfraModule {}
