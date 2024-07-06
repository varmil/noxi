import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { ChannelBasicInfo } from '@domain/youtube/channel/ChannelBasicInfo.entity'
import { ChannelBasicInfos } from '@domain/youtube/channel/ChannelBasicInfos.collection'
import { Thumbnails } from '@domain/youtube/image/Thumbnail'

interface SearchListItem {
  id: {
    channelId: string
  }
  snippet: {
    channelId: string
    channelTitle: string
    description: string

    title: string
    thumbnails: Thumbnails

    publishedAt: string // ISO 8601
  }
}

const PER_PAGE = 50 // 50

@Injectable()
export class YoutubeDataApiSearchInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getChannelBasicInfos({
    limit
  }: {
    limit: number
  }): Promise<ChannelBasicInfos> {
    const basicInfos = await this._getBasicInfos(
      '',
      Math.ceil(limit / PER_PAGE)
    )
    return new ChannelBasicInfos(basicInfos)
  }

  private async _getBasicInfos(
    pageToken = '',
    remainingTimes = 1
  ): Promise<ChannelBasicInfo[]> {
    if (remainingTimes === 0) return []

    try {
      const response = await axios.get<{
        items: SearchListItem[]
        pageInfo: { totalResults: number; resultsPerPage: number }
        nextPageToken: string
      }>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'channel',
          q: 'ホロライブ',
          maxResults: PER_PAGE,
          order: 'title',
          regionCode: 'JP',
          relevanceLanguage: 'ja',
          pageToken: pageToken,
          key: this.API_KEY
        }
      })

      const basicInfos: ChannelBasicInfo[] = response.data.items.map(
        (item: SearchListItem): ChannelBasicInfo => ({
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
        const nextPageChannelInfos = await this._getBasicInfos(
          response.data.nextPageToken,
          remainingTimes - 1
        )
        return basicInfos.concat(nextPageChannelInfos)
      }

      return basicInfos
    } catch (error) {
      console.error('Error fetching channel IDs from YouTube API', error)
      return []
    }
  }
}
