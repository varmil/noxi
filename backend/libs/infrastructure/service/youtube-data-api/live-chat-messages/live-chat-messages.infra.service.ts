import { type youtube_v3, youtube } from '@googleapis/youtube'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@domain/lib/PaginationResponse'
import { NextPageToken } from '@domain/youtube'
import { LiveChatId, LiveChatMessages } from '@domain/youtube/live-chat-message'
import { LiveChatMessageTranslator } from '@infra/service/youtube-data-api/live-chat-messages/LiveChatMessageTranslator'

export interface LiveChatMessagesParams {
  liveChatId: LiveChatId
  pageToken?: NextPageToken
}

/**
 * /v3/liveChat/messages
 */
@Injectable()
export class LiveChatMessagesInfraService {
  private readonly API_KEY = process.env.YOUTUBE_DATA_API_KEY
  private readonly client: youtube_v3.Youtube

  constructor() {
    this.client = youtube({
      version: 'v3',
      auth: this.API_KEY
    })
  }

  async list(
    params: LiveChatMessagesParams
  ): Promise<PaginationResponse<LiveChatMessages>> {
    return await this.getMessages(params)
  }

  private async getMessages(
    params: LiveChatMessagesParams
  ): Promise<PaginationResponse<LiveChatMessages>> {
    const { liveChatId, pageToken } = params

    const response = await this.client.liveChatMessages.list({
      liveChatId: liveChatId.get(),
      part: ['id', 'snippet', 'authorDetails'],
      maxResults: 2000,
      pageToken: pageToken?.get()
    })

    const results =
      response.data.items
        ?.map(item => new LiveChatMessageTranslator(item).translate())
        .filter(e => e !== undefined) ?? []

    return {
      nextPageToken: response.data.nextPageToken ?? undefined,
      items: new LiveChatMessages(results)
    }
  }
}
