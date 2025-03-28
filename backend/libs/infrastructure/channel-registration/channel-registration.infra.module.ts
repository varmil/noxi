import { Module } from '@nestjs/common'
import { ChannelRegistrationRepositoryImpl } from '@infra/channel-registration/ChannelRegistration.repository-impl'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'

@Module({
  imports: [PrismaInfraModule],
  providers: [
    ChannelRegistrationRepositoryImpl,
    {
      provide: 'ChannelRegistrationRepository',
      useClass: ChannelRegistrationRepositoryImpl
    }
  ],
  exports: [
    PrismaInfraModule,

    ChannelRegistrationRepositoryImpl,
    {
      provide: 'ChannelRegistrationRepository',
      useClass: ChannelRegistrationRepositoryImpl
    }
  ]
})
export class ChannelRegistrationInfraModule {}
