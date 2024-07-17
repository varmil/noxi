import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import {
  ChannelId,
  ChannelIds,
  Q,
  RegionCode,
  RelevanceLanguage
} from '@domain/youtube'

interface SearchListItem {
  id: {
    channelId: string
  }
}

export interface Params {
  limit: number
  q: Q
  regionCode?: RegionCode
  relevanceLanguage?: RelevanceLanguage
  pageToken?: string
}

const PER_PAGE = 50 // 50

/**
 * /v3/search を使って軽量なIDのみ返すサービス
 */
@Injectable()
export class SearchChannelsInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getChannelIds(params: Params): Promise<PaginationResponse<ChannelIds>> {
    return await this.getIds(params)
  }

  private async getIds(
    params: Params
  ): Promise<PaginationResponse<ChannelIds>> {
    const { q, regionCode, relevanceLanguage, limit, pageToken } = params

    let results: ChannelId[] = []
    let nextPageToken = pageToken ?? undefined
    let count = 0

    do {
      const response = await axios.get<{
        items: SearchListItem[]
        pageInfo: { totalResults: number; resultsPerPage: number }
        nextPageToken?: string
      }>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'id',
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

      const channelIds: ChannelId[] = response.data.items.map(
        (item: SearchListItem): ChannelId => new ChannelId(item.id.channelId)
      )
      if (channelIds.length === 0) break

      console.log('Channels count: ', response.data.pageInfo.totalResults)

      results = results.concat(channelIds)
      nextPageToken = response.data.nextPageToken
      count += channelIds.length
    } while (nextPageToken && count < limit)

    return { nextPageToken, items: new ChannelIds(results) }
  }
}
