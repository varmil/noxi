import { Module } from '@nestjs/common'
import { ChannelRegistrationsController } from '@presentation/channel-registrations/channel-registrations.controller'
import { ChannelRegistrationsAppModule } from '@app/channel-registrations/channel-registrations.app.module'

@Module({
  imports: [ChannelRegistrationsAppModule],
  controllers: [ChannelRegistrationsController],
  providers: []
})
export class ChannelRegistrationsPresentationModule {}
