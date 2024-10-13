import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { SuperChatRepositoryImpl } from './SuperChat.repository-impl'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    SuperChatRepositoryImpl,
    { provide: 'SuperChatRepository', useClass: SuperChatRepositoryImpl }
  ],
  exports: [
    PrismaInfraModule,

    SuperChatRepositoryImpl,
    { provide: 'SuperChatRepository', useClass: SuperChatRepositoryImpl }
  ]
})
export class SuperChatInfraModule {}
