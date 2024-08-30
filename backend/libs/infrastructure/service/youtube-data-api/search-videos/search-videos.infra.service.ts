import { type youtube_v3, youtube } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import { CountryCode } from '@domain/country'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import {
  ChannelId,
  Q,
  RelevanceLanguage,
  VideoId,
  Videos
} from '@domain/youtube'
import { VideoTranslator } from '@infra/service/youtube-data-api/lib/VideoTranslator'

export interface SearchVideosParams {
  q: Q
  limit: number
  /**
   * date – リソースは作成日の新しい順に並べ替えられます。
   * rating – リソースは評価が高い順に並べられます。
   * relevance – リソースは、検索クエリとの関連性に基づいて並べ替えられます。このパラメータのデフォルト値です。
   * viewCount – リソースを表示回数の多い順に並べ替えます。ライブ配信の場合、ブロードキャストの進行中、動画は同時視聴者数で並べ替えられます。
   */
  order?: 'date' | 'rating' | 'relevance' | 'viewCount'
  publishedBefore?: Date
  publishedAfter?: Date
  channelId?: ChannelId
  regionCode?: CountryCode
  relevanceLanguage?: RelevanceLanguage
  pageToken?: string
}

const PER_PAGE = 50

/**
 * This class uses...
 * GET https://www.googleapis.com/youtube/v3/search
 * for videos in the channel
 *
 * and
 *
 * GET https://www.googleapis.com/youtube/v3/videos
 * for statistics
 */
@Injectable()
export class SearchVideosInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY
  private readonly client: youtube_v3.Youtube

  constructor() {
    this.client = youtube({ version: 'v3', auth: this.API_KEY })
  }

  async list(params: SearchVideosParams): Promise<PaginationResponse<Videos>> {
    const { nextPageToken, videos } = await this.getVideos(params)
    return {
      nextPageToken,
      items: new Videos(
        videos
          .map(v => new VideoTranslator(v).translate())
          .filter(e => e !== undefined)
      )
    }
  }

  private async getVideos(
    params: SearchVideosParams
  ): Promise<{ nextPageToken?: string; videos: youtube_v3.Schema$Video[] }> {
    const {
      q,
      order,
      publishedBefore,
      publishedAfter,
      channelId,
      regionCode,
      relevanceLanguage,
      limit,
      pageToken
    } = params

    let videos: youtube_v3.Schema$Video[] = []
    let nextPageToken = pageToken ?? undefined
    let count = 0

    do {
      const response = await this.client.search.list({
        part: ['id'],
        type: ['video'],
        q: q.get(),
        maxResults: PER_PAGE,
        order,
        publishedBefore: publishedBefore?.toISOString(),
        publishedAfter: publishedAfter?.toISOString(),
        channelId: channelId?.get(),
        regionCode: regionCode?.get(),
        relevanceLanguage: relevanceLanguage?.get(),
        pageToken: nextPageToken
      })

      const videoIds =
        response.data.items
          ?.map(item => item.id?.videoId)
          .filter(videoId => videoId !== undefined && videoId !== null)
          .map(videoId => new VideoId(videoId)) ?? []

      if (videoIds.length === 0) break

      const videoDetailsResponse = await this.client.videos.list({
        part: [
          'snippet',
          'contentDetails',
          'statistics',
          'liveStreamingDetails'
        ],
        id: videoIds.map(id => id.get())
      })

      videos = videos.concat(videoDetailsResponse.data.items ?? [])
      nextPageToken = response.data.nextPageToken ?? undefined
      count += videoDetailsResponse.data.items?.length ?? 0
    } while (nextPageToken && count < limit)

    return { nextPageToken, videos }
  }
}
