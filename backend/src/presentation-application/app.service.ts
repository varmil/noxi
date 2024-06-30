import { Injectable } from '@nestjs/common'
import axios from 'axios'

const apiKey = process.env.YOUTUBE_DATA_API_KEY

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

interface Channel {
  id: SearchListItem['id']['channelId']
  title: SearchListItem['snippet']['title']
  description: SearchListItem['snippet']['description']
  thumbnails: SearchListItem['snippet']['thumbnails']
  publishedAt: SearchListItem['snippet']['publishedAt']
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! v1.1.0'
  }

  getFoo(): string {
    return 'FOOOOO!'
  }

  getBar(): string {
    return 'BARRRRR!'
  }

  async getChannels(pageToken = '', callCount = 1): Promise<Channel[]> {
    if (callCount >= 2) return []

    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            type: 'channel',
            q: 'FF14',
            maxResults: 5, // 50,
            order: 'title',
            regionCode: 'JP',
            relevanceLanguage: 'ja',
            pageToken: pageToken,
            key: apiKey
          }
        }
      )

      const channelInfos: Channel[] = response.data.items.map(
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
        const nextPageChannelInfos = await this.getChannels(
          response.data.nextPageToken,
          callCount + 1
        )
        return channelInfos.concat(nextPageChannelInfos)
      }

      return channelInfos
    } catch (error) {
      console.error('Error fetching channel IDs from YouTube API', error)
      return []
    }
  }

  async getTopYouTubers(): Promise<string> {
    try {
      const channels = await this.getChannels()
      return JSON.stringify(channels)
    } catch (error) {
      console.error('Error fetching data from YouTube API', error)
    }
  }
}
