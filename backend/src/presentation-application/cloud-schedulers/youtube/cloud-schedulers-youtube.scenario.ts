import { Injectable } from '@nestjs/common'
import { ChannelsService } from '@app/youtube/channels.service'
import { VideosService } from '@app/youtube/videos.service'
import { YoutubeDataApiSearchInfraService } from '@infra/service/youtube-data-api/youtube-data-api-search.infra.service'
import { YoutubeDataApiVideosInfraService } from '@infra/service/youtube-data-api/youtube-data-api-videos.infra.service'

const FETCH_LIMIT = 50

@Injectable()
export class CloudSchedulersYoutubeScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly videosService: VideosService,
    private readonly searchInfraService: YoutubeDataApiSearchInfraService,
    private readonly videosInfraService: YoutubeDataApiVideosInfraService
  ) {}

  async saveChannels() {
    const channels = await this.searchInfraService.getChannels({
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
      channels.take(10).map(async channel => {
        /**
         * NOTE:
         * VideosService.fetchAllWithDataAPI({
         *  where: { channelId }
         * })
         */
        {
          // TODO: fetch Videos from "Data API"
          // map()
          // TODO: fetch Video Details from "Data API"
        }

        const videos = await this.videosInfraService.getVideos(channel.id, {
          limit: FETCH_LIMIT
        })

        await Promise.all(
          videos.map(async video => {
            await this.videosService.save(video)
          })
        )
      })
    )
  }
}
