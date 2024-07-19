import { type youtube_v3, youtube } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import { ChannelIds } from '@domain/youtube'
import { BrandingSettings } from '@domain/youtube/channel/BrandingSettings'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelStatistics } from '@domain/youtube/channel/ChannelStatistics'
import { Channels } from '@domain/youtube/channel/Channels.collection'
import { Country } from '@domain/youtube/channel/branding-settings/Country'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'
import { ContentDetails } from '@domain/youtube/channel/content-details/ContentDetails'

// 一度にリクエストできる最大数
const maxResultsPerRequest = 50

@Injectable()
export class YoutubeDataApiChannelsInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY
  private readonly client: youtube_v3.Youtube

  constructor() {
    this.client = youtube({
      version: 'v3',
      auth: this.API_KEY
    })
  }

  async getChannels({
    where: { channelIds }
  }: {
    where: { channelIds: ChannelIds }
  }): Promise<Channels> {
    const channels = await this._getChannels(channelIds)
    return new Channels(
      channels
        .map(channel => {
          const { snippet, contentDetails, statistics, brandingSettings } =
            channel
          const { title, description, thumbnails, publishedAt } = snippet ?? {}
          const { viewCount, subscriberCount, videoCount } = statistics ?? {}
          const { keywords, country } = brandingSettings?.channel ?? {}

          if (
            !snippet ||
            !contentDetails ||
            !statistics ||
            !brandingSettings ||
            !brandingSettings.channel ||
            !channel.id ||
            !title ||
            !description ||
            !thumbnails ||
            !publishedAt ||
            !contentDetails.relatedPlaylists?.uploads ||
            !country
          ) {
            console.log(
              '[NULL] ChannelsInfraService.getChannels()',
              'contentDetails?.relatedPlaylists?.uploads',
              !!contentDetails?.relatedPlaylists?.uploads,
              'brandingSettings?.channel',
              !!brandingSettings?.channel,
              'channel.id',
              !!channel.id,
              'title',
              !!title,
              'description',
              !!description,
              'thumbnails',
              !!thumbnails,
              'publishedAt',
              !!publishedAt,
              'contentDetails',
              !!contentDetails,
              'country',
              !!country
            )
            return undefined
          }

          return new Channel({
            basicInfo: {
              id: channel.id,
              title,
              description,
              thumbnails,
              publishedAt: new Date(publishedAt)
            },
            contentDetails: new ContentDetails({
              relatedPlaylists: {
                uploads: contentDetails.relatedPlaylists.uploads
              }
            }),
            statistics: new ChannelStatistics({
              viewCount: Number(viewCount ?? 0),
              subscriberCount: Number(subscriberCount ?? 0),
              videoCount: Number(videoCount ?? 0)
            }),
            brandingSettings: new BrandingSettings({
              keywords: Keywords.fromString(keywords ?? ''),
              country: new Country(country)
            })
          })
        })
        .filter(e => e !== undefined)
    )
  }

  async _getChannels(channelIds: ChannelIds) {
    let results: youtube_v3.Schema$Channel[] = []

    for (let i = 0; i < channelIds.length; i += maxResultsPerRequest) {
      const batchIds = channelIds.slice(i, i + maxResultsPerRequest)

      const response = await this.client.channels.list({
        part: ['snippet', 'contentDetails', 'statistics', 'brandingSettings'],
        id: batchIds.map(id => id.get()),
        key: this.API_KEY
      })

      results = results.concat(response.data.items ?? [])
    }

    return results
  }
}
