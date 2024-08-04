import { Injectable } from '@nestjs/common'
import { ChannelsService } from 'apps/closed-api-server/src/application/youtube/channels/channels.service'
import { CountriesService } from 'apps/closed-api-server/src/application/youtube/countries/countries.service'
import { VideoAggregationsService } from 'apps/closed-api-server/src/application/youtube/video-aggregation.service'
import { VideosService } from 'apps/closed-api-server/src/application/youtube/videos/videos.service'
import { CountryCode } from '@domain/country'
import { ChannelId, ChannelSort } from '@domain/youtube'
import { VideoAggregation } from '@domain/youtube/video-aggregation/VideoAggregation.entity'

const CHANNEL_FETCH_LIMIT = 200
const VIDEO_FETCH_LIMIT = 50
const TAKE = 200

@Injectable()
export class SaveAggregationsByChannelScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly countriesService: CountriesService,
    private readonly aggregationsService: VideoAggregationsService,
    private readonly videosService: VideosService
  ) {}

  /**
   * batch
   *
   * 直近１ヶ月 x Max50本を取得して更新（差分更新に近い）
   */
  async execute() {
    // fetch all countries docs from youtube
    const countries = await this.countriesService.findAll()

    await Promise.all(
      countries.map(async code => {
        console.log('next: ', code.get())
        return await this.executeByCountry(code)
      })
    )
  }

  private async executeByCountry(country: CountryCode) {
    const channels = await this.channelsService.findAll({
      sort: new ChannelSort(),
      where: { country },
      limit: CHANNEL_FETCH_LIMIT
    })

    await Promise.all(
      channels.take(TAKE).map(async channel => {
        const { items } = await this.videosService.findAll({
          where: { channel },
          limit: VIDEO_FETCH_LIMIT
        })

        // TODO: daily, weekly, monthly それぞれで集計する
        const aggregation = VideoAggregation.fromVideos(items)

        await this.aggregationsService.save({
          where: {
            channelId: new ChannelId(channel.basicInfo.id),
            country
          },
          data: aggregation
        })
      })
    )
  }
}
