import { Module } from '@nestjs/common'
import { InactiveChannelsController } from '@presentation/inactive-channels/inactive-channels.controller'
import { InactiveChannelsScenario } from '@presentation/inactive-channels/inactive-channels.scenario'
import { InactiveChannelsAppModule } from '@app/inactive-channels/inactive-channels.app.module'

@Module({
  imports: [InactiveChannelsAppModule],
  controllers: [InactiveChannelsController],
  providers: [InactiveChannelsScenario]
})
export class InactiveChannelsPresentationModule {}
