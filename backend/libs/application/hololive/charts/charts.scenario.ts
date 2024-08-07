import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { ChannelRepository } from '@domain/youtube'

@Injectable()
export class ChartsScenario {
  constructor(private readonly channelsService: ChannelsService) {}

  /**
   * Channels チャート
   */
  async getChartOfChannels(
    args: Parameters<ChannelRepository['prismaFindAll']>[0]
  ) {
    return await this.channelsService.prismaFindAll(args)
  }
}
