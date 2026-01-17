import { Module } from '@nestjs/common'
import { InactiveChannelsService } from '@app/inactive-channels/inactive-channels.service'
import { InactiveChannelInfraModule } from '@infra/inactive-channel/inactive-channel.infra.module'

@Module({
  imports: [InactiveChannelInfraModule],
  providers: [InactiveChannelsService],
  exports: [InactiveChannelsService]
})
export class InactiveChannelsAppModule {}
