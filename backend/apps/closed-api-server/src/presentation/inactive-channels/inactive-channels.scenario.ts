import { Injectable } from '@nestjs/common'
import { InactiveChannelsService } from '@app/inactive-channels/inactive-channels.service'
import { InactiveChannels } from '@domain/inactive-channel'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class InactiveChannelsScenario {
  constructor(private readonly service: InactiveChannelsService) {}

  async findInactiveChannels(args: {
    inactiveMonths: number
  }): Promise<InactiveChannels> {
    return await this.service.findInactiveChannels(args)
  }

  async deleteChannelCompletely(channelId: ChannelId): Promise<void> {
    await this.service.deleteChannelCompletely(channelId)
  }
}
