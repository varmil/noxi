import { youtube, type youtube_v3 } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { PlaylistId, PlaylistItem, PlaylistItems } from '@domain/youtube'
import { PlaylistItemTranslator } from '@infra/service/youtube-data-api/playlist-items/PlaylistItemTranslator'

export interface PlaylistItemsParams {
  limit: number
  playlistId: PlaylistId
  pageToken?: string
}

const PER_PAGE = 50

/**
 * /v3/playlistItems を使って軽量なVideoID, ContentDetailsを返すサービス
 */
@Injectable()
export class PlaylistItemsInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY
  private readonly client: youtube_v3.Youtube

  constructor() {
    this.client = youtube({
      version: 'v3',
      auth: this.API_KEY
    })
  }

  async list(
    params: PlaylistItemsParams
  ): Promise<PaginationResponse<PlaylistItems>> {
    return await this.getItems(params)
  }

  private async getItems(
    params: PlaylistItemsParams
  ): Promise<PaginationResponse<PlaylistItems>> {
    const { limit, playlistId, pageToken } = params

    let results: PlaylistItem[] = []
    let nextPageToken = pageToken ?? undefined
    let count = 0

    do {
      const response = await this.client.playlistItems.list({
        part: ['contentDetails'],
        playlistId: playlistId.get(),
        maxResults: Math.min(limit, PER_PAGE),
        pageToken: nextPageToken
      })

      const playlistItems =
        response.data.items
          ?.map(item =>
            new PlaylistItemTranslator(playlistId, item).translate()
          )
          .filter(e => e !== undefined) ?? []

      if (playlistItems.length === 0) break

      results = results.concat(playlistItems)
      nextPageToken = response.data.nextPageToken ?? undefined
      count += playlistItems.length
    } while (nextPageToken && count < limit)

    return { nextPageToken, items: new PlaylistItems(results) }
  }
}
