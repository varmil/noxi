import { type youtube_v3 } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { LiveChatId, LiveChatMessages } from '@domain/youtube/live-chat-message'
import { LiveChatMessageTranslator } from '@infra/service/youtube-data-api/live-chat-messages/LiveChatMessageTranslator'

export interface LiveChatMessagesParams {
  liveChatId: LiveChatId
  pageToken?: string
}

/**
 * /v3/liveChat/messages
 */
@Injectable()
export class LiveChatMessagesInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY

  async list(
    params: LiveChatMessagesParams
  ): Promise<PaginationResponse<LiveChatMessages>> {
    return await this.getMessages(params)
  }

  private async getMessages(
    params: LiveChatMessagesParams
  ): Promise<PaginationResponse<LiveChatMessages>> {
    const { liveChatId, pageToken } = params
    let nextPageToken = pageToken ?? undefined

    // const YOUTUBE_API_URL =
    //   'https://www.googleapis.com/youtube/v3/liveChat/messages'
    const YOUTUBE_API_URL = 'https://yt.lemnoslife.com/noKey/liveChat/messages'
    const response =
      await axios.get<youtube_v3.Schema$LiveChatMessageListResponse>(
        YOUTUBE_API_URL,
        {
          params: {
            liveChatId: liveChatId.get(),
            part: 'id,snippet,authorDetails',
            maxResults: 2000,
            pageToken: nextPageToken
            // key: this.API_KEY
          }
        }
      )

    const results =
      response.data.items
        ?.map(item => new LiveChatMessageTranslator(item).translate())
        .filter(e => e !== undefined) ?? []

    nextPageToken = response.data.nextPageToken ?? undefined

    return { nextPageToken, items: new LiveChatMessages(results) }
  }
}
