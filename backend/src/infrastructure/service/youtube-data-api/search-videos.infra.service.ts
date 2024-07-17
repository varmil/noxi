import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import {
  VideoId,
  VideoIds,
  Q,
  RegionCode,
  RelevanceLanguage,
  ChannelId
} from '@domain/youtube'

interface SearchListItem {
  id: { videoId: string }
}

interface Params {
  limit: number
  q?: Q
  channelId?: ChannelId
  regionCode?: RegionCode
  relevanceLanguage?: RelevanceLanguage
  pageToken?: string
}

const PER_PAGE = 50 // 50

/**
 * 使わないかも？
 */
@Injectable()
export class SearchVideosInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  constructor() {}

  async getVideoIds(params: Params): Promise<PaginationResponse<VideoIds>> {
    return await this.getIds(params)
  }

  private async getIds(params: Params): Promise<PaginationResponse<VideoIds>> {
    const { channelId, q, regionCode, relevanceLanguage, limit, pageToken } =
      params

    let results: VideoId[] = []
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
          type: 'video',
          channelId: channelId?.get(),
          q: q?.get(),
          maxResults: PER_PAGE,
          order: 'date',
          regionCode: regionCode?.get() || 'JP',
          relevanceLanguage: relevanceLanguage?.get() || '',
          pageToken: nextPageToken,
          key: this.API_KEY
        }
      })

      const videoIds: VideoId[] = response.data.items.map(
        (item: SearchListItem): VideoId => new VideoId(item.id.videoId)
      )
      if (videoIds.length === 0) break

      console.log('Videos count: ', response.data.pageInfo.totalResults)

      results = results.concat(videoIds)
      nextPageToken = response.data.nextPageToken
      count += videoIds.length
    } while (nextPageToken && count < limit)

    return { nextPageToken, items: new VideoIds(results) }
  }
}
