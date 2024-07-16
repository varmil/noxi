import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { ChannelBasicInfos } from '@domain/youtube/channel/basic-info/ChannelBasicInfos.collection'
import { Thumbnails } from '@domain/youtube/image/Thumbnail'
import { Q } from '@domain/youtube/search/Q.vo'
import { RegionCode } from '@domain/youtube/search/RegionCode.vo'
import { RelevanceLanguage } from '@domain/youtube/search/RelevanceLanguage.vo'

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

interface Params {
  limit: number
  q: Q
  regionCode?: RegionCode
  relevanceLanguage?: RelevanceLanguage
}

const PER_PAGE = 50 // 50

/**
 * TODO:
 *
 * - [ ]
 * Search Channels
 * Search Videos
 * でサービスを更に分ける。このファイルは前者用にする
 *
 * - [ ] 再帰呼び出しを辞める
 * - [ ] snippetを消して id だけ取得する
 *
 * - [ ] search-channels.infra.service.ts にリネーム
 * - [ ] search-videos.infra.service.ts にリネーム
 */
@Injectable()
export class SearchChannelsInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getChannelBasicInfos({
    limit,
    ...params
  }: Params): Promise<ChannelBasicInfos> {
    const basicInfos = await this._getBasicInfos(
      '',
      Math.ceil(limit / PER_PAGE),
      params
    )
    return new ChannelBasicInfos(basicInfos)
  }

  private async _getBasicInfos(
    pageToken = '',
    remainingTimes = 1,
    params: Omit<Params, 'limit'>
  ): Promise<ChannelBasicInfo[]> {
    if (remainingTimes === 0) return []

    const { q, regionCode, relevanceLanguage } = params

    try {
      const response = await axios.get<{
        items: SearchListItem[]
        pageInfo: { totalResults: number; resultsPerPage: number }
        nextPageToken: string
      }>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'channel',
          q: q.get(),
          maxResults: PER_PAGE,
          order: 'relevance',
          regionCode: regionCode?.get() || 'JP',
          relevanceLanguage: relevanceLanguage?.get() || '',
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
          remainingTimes - 1,
          params
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
