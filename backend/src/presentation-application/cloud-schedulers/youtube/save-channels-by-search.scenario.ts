import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { CountryCode } from '@domain/country'
import { Channel, PlaylistId } from '@domain/youtube'
import { Q } from '@domain/youtube/search/Q.vo'
import { RelevanceLanguage } from '@domain/youtube/search/RelevanceLanguage.vo'
import {
  ChannelsInfraService,
  PlaylistItemsInfraService,
  SearchChannelsInfraService,
  type Params as SearchChannelsParams
} from '@infra/service/youtube-data-api'

const TOTAL_LIMIT = 50
const FETCH_LIMIT = 50
const MIN_N = 3

@Injectable()
export class SaveChannelsBySearchScenario {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly searchInfraService: SearchChannelsInfraService,
    private readonly channelsInfraService: ChannelsInfraService,
    private readonly playlistItemsInfraService: PlaylistItemsInfraService
  ) {}

  /**
   * batch
   *
   * qを使う場合、全部舐めたりIdがわからない場合に用いる
   *
   * MIN_N本以上Videosがある && １年以内にVideo uploadしてる
   * チャンネルのみ保存
   */
  async execute() {
    const params: SearchChannelsParams = {
      limit: FETCH_LIMIT,
      // q: new Q('ホロライブ'),
      // regionCode: new RegionCode('JP'),
      // relevanceLanguage: new RelevanceLanguage('ja')
      q: new Q('travel vlog english'),
      regionCode: new CountryCode('US'),
      relevanceLanguage: new RelevanceLanguage('en')
    }

    let nextPageToken: string | undefined
    let count = 0

    do {
      nextPageToken = await this.saveChannelsInChunkOf50({
        ...params,
        pageToken: nextPageToken
      })
      count += FETCH_LIMIT
    } while (nextPageToken && count < TOTAL_LIMIT)
  }

  private async saveChannelsInChunkOf50(params: SearchChannelsParams) {
    const { nextPageToken, items } =
      await this.searchInfraService.listIds(params)

    const channels = await this.channelsInfraService.list({
      where: { channelIds: items }
    })

    const filtered = (
      await Promise.all(
        channels
          // N本以上アップロードしている
          .selectWithAtLeastNVideos(MIN_N)
          // 1年以内にVideoアップロードしている
          .map(async channel => {
            const publishedAtOfLatestVideo =
              await this.getPublishedAtOfLatestVideo(channel)

            const ok = dayjs(publishedAtOfLatestVideo)
              .add(1, 'year')
              .isAfter(dayjs())

            if (!ok) {
              console.log(
                'no video found within 1 year: ',
                channel.basicInfo.title,
                'id: ',
                channel.basicInfo.id
              )
            }

            return ok ? channel : undefined
          })
      )
    ).filter(e => e !== undefined)

    await Promise.all(
      filtered.map(async channel => {
        await this.channelsService.save(channel)
      })
    )

    return nextPageToken
  }

  private async getPublishedAtOfLatestVideo(channel: Channel): Promise<Date> {
    const { items } = await this.playlistItemsInfraService.list({
      limit: 1,
      playlistId: new PlaylistId(channel.contentDetails.uploadsPlaylistId)
    })

    return items.first().publishedAt
  }
}
