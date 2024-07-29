import { type youtube_v3, youtube } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import { CountryCode } from '@domain/country'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { VideoIds, Videos } from '@domain/youtube'
import { VideoTranslator } from '@infra/service/youtube-data-api/lib/VideoTranslator'

const maxResultsPerRequest = 50

interface Params {
  hl?: CountryCode
  limit: number
  videoIds: VideoIds
  pageToken?: string
}

@Injectable()
export class VideosInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY
  private readonly client: youtube_v3.Youtube

  constructor() {
    this.client = youtube({
      version: 'v3',
      auth: this.API_KEY
    })
  }

  async list(params: Params): Promise<PaginationResponse<Videos>> {
    return await this.getVideos(params)
  }

  private async getVideos(params: Params): Promise<PaginationResponse<Videos>> {
    const { hl, videoIds, limit, pageToken } = params
    let results: youtube_v3.Schema$Video[] = []
    const nextPageToken = pageToken ?? undefined

    for (let i = 0; i < videoIds.length; i += maxResultsPerRequest) {
      const batchIds = videoIds.slice(i, i + maxResultsPerRequest)

      const response = await this.client.videos.list({
        part: [
          'snippet',
          'contentDetails',
          'statistics',
          'liveStreamingDetails'
        ],
        id: batchIds.map(id => id.get())
      })

      results = results.concat(response.data.items ?? [])
    }

    return {
      nextPageToken,
      items: new Videos(
        results
          .map(video => new VideoTranslator(video).translate())
          .filter(e => e !== undefined)
      )
    }
  }
}
