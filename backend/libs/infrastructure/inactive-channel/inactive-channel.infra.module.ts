import { Module } from '@nestjs/common'
import { InactiveChannelRepositoryImpl } from '@infra/inactive-channel/InactiveChannel.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    InactiveChannelRepositoryImpl,
    {
      provide: 'InactiveChannelRepository',
      useClass: InactiveChannelRepositoryImpl
    }
  ],
  exports: [
    InactiveChannelRepositoryImpl,
    {
      provide: 'InactiveChannelRepository',
      useClass: InactiveChannelRepositoryImpl
    }
  ]
})
export class InactiveChannelInfraModule {}
