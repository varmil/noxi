import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import HololiveList from '@domain/hololive/list'
import { ChannelId, ChannelIds } from '@domain/youtube'
import {
  SearchChannelsInfraService,
  ChannelsInfraService,
  PlaylistItemsInfraService
} from '@infra/service/youtube-data-api'

@Injectable()
export class MainScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly searchInfraService: SearchChannelsInfraService,
    private readonly channelsInfraService: ChannelsInfraService,
    private readonly playlistItemsInfraService: PlaylistItemsInfraService
  ) {}

  async execute(): Promise<void> {
    const channels = await this.channelsInfraService.list({
      where: {
        channelIds: new ChannelIds(HololiveList.map(e => new ChannelId(e.id)))
      }
    })

    await this.channelsService.bulkSave(channels)

    return
  }
}
