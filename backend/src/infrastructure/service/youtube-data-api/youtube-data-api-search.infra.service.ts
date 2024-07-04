import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { Channel } from '@domain/youtube/channel/Channel.entity'
import { Channels } from '@domain/youtube/channel/Channels.collection'

interface SearchListItem {
  id: {
    channelId: string
  }
  snippet: {
    channelId: string
    channelTitle: string
    description: string

    title: string
    thumbnails: {
      (key: 'default' | 'medium' | 'high' | 'standard' | 'maxres'): {
        url: string
        width: number
        height: number
      }
    }

    publishedAt: Date
  }
}

// interface Channel {
//   id: SearchListItem['id']['channelId']
//   title: SearchListItem['snippet']['title']
//   description: SearchListItem['snippet']['description']
//   thumbnails: SearchListItem['snippet']['thumbnails']
//   publishedAt: SearchListItem['snippet']['publishedAt']
// }

const PER_PAGE = 50 // 50

@Injectable()
export class YoutubeDataApiSearchInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getChannels({ limit }: { limit: number }): Promise<Channels> {
    const channels = await this._getChannels('', Math.ceil(limit / PER_PAGE))
    return new Channels(channels)
  }

  private async _getChannels(
    pageToken = '',
    remainingTimes = 1
  ): Promise<Channel[]> {
    if (remainingTimes === 0) return []

    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            type: 'channel',
            q: 'FF14',
            maxResults: PER_PAGE,
            order: 'title',
            regionCode: 'JP',
            relevanceLanguage: 'ja',
            pageToken: pageToken,
            key: this.API_KEY
          }
        }
      )

      const channels: Channel[] = response.data.items.map(
        (item: SearchListItem): Channel => ({
          id: item.id.channelId,
          title: item.snippet.channelTitle,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails,
          publishedAt: new Date(item.snippet.publishedAt)
        })
      )
      console.log('Channels in JP: ', response.data.pageInfo.totalResults)

      // 次のページがある場合、再帰的に取得
      if (response.data.nextPageToken) {
        const nextPageChannelInfos = await this._getChannels(
          response.data.nextPageToken,
          remainingTimes - 1
        )
        return channels.concat(nextPageChannelInfos)
      }

      return channels
    } catch (error) {
      console.error('Error fetching channel IDs from YouTube API', error)
      return []
    }
  }
}
