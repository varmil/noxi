import { youtube, type youtube_v3 } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import {
  ChannelId,
  ChannelIds,
  Q,
  RegionCode,
  RelevanceLanguage
} from '@domain/youtube'

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
  private readonly client: youtube_v3.Youtube

  constructor() {
    this.client = youtube({
      version: 'v3',
      auth: this.API_KEY
    })
  }

  async listIds(params: Params): Promise<PaginationResponse<ChannelIds>> {
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
      const response = await this.client.search.list({
        part: ['id'],
        type: ['channel'],
        q: q.get(),
        maxResults: PER_PAGE,
        order: 'relevance',
        regionCode: regionCode?.get() || 'JP',
        relevanceLanguage: relevanceLanguage?.get() || '',
        pageToken: nextPageToken
      })

      const channelIds =
        response.data.items
          ?.map(item => item.id?.channelId)
          .filter(channelId => channelId !== undefined && channelId !== null)
          .map(channelId => new ChannelId(channelId)) ?? []

      if (channelIds.length === 0) break

      console.log(
        'Channels count: ',
        response.data.pageInfo?.totalResults,
        'current count: ',
        count
      )

      results = results.concat(channelIds)
      nextPageToken = response.data.nextPageToken ?? undefined
      count += channelIds.length
    } while (nextPageToken && count < limit)

    return { nextPageToken, items: new ChannelIds(results) }
  }
}
