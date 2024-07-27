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
  limit: number
  q?: Q
  channelId?: ChannelId
  regionCode?: CountryCode
  relevanceLanguage?: RelevanceLanguage
  pageToken?: string
}

const PER_PAGE = 50 // 50

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
    this.client = youtube({
      version: 'v3',
      auth: this.API_KEY
    })
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
    const { channelId, q, regionCode, relevanceLanguage, limit, pageToken } =
      params

    let videos: youtube_v3.Schema$Video[] = []
    let nextPageToken = pageToken ?? undefined
    let count = 0

    do {
      const response = await this.client.search.list({
        part: ['id'],
        type: ['video'],
        channelId: channelId?.get(),
        q: q?.get(),
        maxResults: PER_PAGE,
        order: 'date',
        regionCode: regionCode?.get() || 'JP',
        relevanceLanguage: relevanceLanguage?.get() || '',
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
