import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { BrandingSettings } from '@domain/youtube/channel/BrandingSettings'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { ChannelStatistics } from '@domain/youtube/channel/ChannelStatistics'
import { Channels } from '@domain/youtube/channel/Channels.collection'
import { Country } from '@domain/youtube/channel/branding-settings/Country'
import { Keywords } from '@domain/youtube/channel/branding-settings/Keywords'
import { Thumbnails } from '@domain/youtube/image/Thumbnail'

interface ChannelListItem {
  id: string // channel id
  snippet: {
    title: string
    description: string
    customUrl: string
    publishedAt: string // ISO8601
    thumbnails: Thumbnails
    localized: {
      title: string
      description: string
    }
  }
  statistics: {
    viewCount?: string
    subscriberCount?: string
    hiddenSubscriberCount: boolean
    videoCount?: string
  }
  brandingSettings: {
    channel: {
      title: string
      description: string
      keywords?: string
      unsubscribedTrailer: string
      country: string
    }
  }
}

// 一度にリクエストできる最大数
const maxResultsPerRequest = 50

@Injectable()
export class YoutubeDataApiChannelsInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getChannels({
    where: { channelIds }
  }: {
    where: { channelIds: string[] }
  }): Promise<Channels> {
    const channels = await this._getChannels(channelIds)
    return new Channels(
      channels.map(channel => {
        const {
          snippet: { title, description, thumbnails, publishedAt },
          statistics: { viewCount, subscriberCount, videoCount },
          brandingSettings
        } = channel

        const { keywords, country } = brandingSettings.channel

        return new Channel({
          basicInfo: {
            id: channel.id,
            title,
            description,
            thumbnails,
            publishedAt: new Date(publishedAt)
          },
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
    )
  }

  // call /v3/channels
  async _getChannels(channelIds: string[]): Promise<ChannelListItem[]> {
    let results: ChannelListItem[] = []

    for (let i = 0; i < channelIds.length; i += maxResultsPerRequest) {
      const batchIds = channelIds.slice(i, i + maxResultsPerRequest)
      const response = await axios.get<{
        items: ChannelListItem[]
        nextPageToken: string
      }>('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet,statistics,brandingSettings',
          id: batchIds.join(','),
          key: this.API_KEY
        }
      })
      results = results.concat(response.data.items)
    }

    return results
  }
}
