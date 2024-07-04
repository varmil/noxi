import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'

const FETCH_LIMIT = 50

@Injectable()
export class CloudSchedulersYoutubeScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly dataApiSearchInfraService: YoutubeDataApiSearchInfraService
  ) {}

  async saveChannels() {
    const channels = await this.dataApiSearchInfraService.getChannels({
      limit: FETCH_LIMIT
    })
    await Promise.all(
      channels.map(async channel => {
        await this.channelsService.save(channel)
      })
    )
  }

  async saveVideos() {
    // TODO: use channelId or something to find the appropriate channel
    const channels = await this.channelsService.findAll({
      limit: FETCH_LIMIT
    })
    await Promise.all(
      channels.map(async channel => {
        await this.channelsService.save(channel)
      })
    )
  }
}
