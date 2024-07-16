import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { Q, RegionCode, RelevanceLanguage, Thumbnails } from '@domain/youtube'
import { ChannelBasicInfo } from '@domain/youtube/channel/basic-info/ChannelBasicInfo.entity'
import { ChannelBasicInfos } from '@domain/youtube/channel/basic-info/ChannelBasicInfos.collection'

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
  pageToken?: string
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
 * - [ ] snippetを消して id だけ取得する
 * - [ ] search-videos.infra.service.ts にリネーム
 */
@Injectable()
export class SearchVideosInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getChannelBasicInfos(params: Params): Promise<ChannelBasicInfos> {
    const basicInfos = await this._getBasicInfos(params)
    return new ChannelBasicInfos(basicInfos)
  }

  private async _getBasicInfos(params: Params): Promise<ChannelBasicInfo[]> {
    const { q, regionCode, relevanceLanguage, limit, pageToken } = params

    let results: ChannelBasicInfo[] = []
    let nextPageToken = pageToken ?? ''
    let count = 0

    do {
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
          pageToken: nextPageToken,
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
      if (basicInfos.length === 0) break

      console.log('Channels in JP: ', response.data.pageInfo.totalResults)

      results = results.concat(basicInfos)
      nextPageToken = response.data.nextPageToken
      count += basicInfos.length
    } while (nextPageToken && count < limit)

    return results
  }
}
