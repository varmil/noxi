import { Inject, Injectable } from '@nestjs/common'
import {
  InactiveChannelRepository,
  InactiveChannels
} from '@domain/inactive-channel'
import { ChannelId } from '@domain/youtube'

@Injectable()
export class InactiveChannelsService {
  constructor(
    @Inject('InactiveChannelRepository')
    private readonly repository: InactiveChannelRepository
  ) {}

  async findInactiveChannels(args: {
    inactiveMonths: number
  }): Promise<InactiveChannels> {
    return await this.repository.findInactiveChannels(args)
  }

  async deleteChannelCompletely(channelId: ChannelId): Promise<void> {
    await this.repository.deleteChannelCompletely(channelId)
  }
}
