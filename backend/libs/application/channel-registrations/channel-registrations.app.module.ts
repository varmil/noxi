import { Module } from '@nestjs/common'
import { ChannelRegistrationsService } from '@app/channel-registrations/channel-registrations.service'
import { ChannelRegistrationInfraModule } from '@infra/channel-registration/channel-registration.infra.module'

@Module({
  imports: [ChannelRegistrationInfraModule],
  providers: [ChannelRegistrationsService],
  exports: [ChannelRegistrationInfraModule, ChannelRegistrationsService]
})
export class ChannelRegistrationsAppModule {}
