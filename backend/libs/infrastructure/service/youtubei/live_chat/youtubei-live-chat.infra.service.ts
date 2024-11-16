import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { z } from 'zod'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'
import { YoutubeiLiveChatTranslator } from '@infra/service/youtubei/live_chat'
import { youtubeiLiveChatAPISchema } from '@infra/service/youtubei/live_chat/YoutubeiLiveChatAPISchema'

export interface LiveChatMessagesParams {
  continuation: string
}

// INNERTUBE_API_KEY をここに設定
const API_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'

// YouTube API リクエスト用のペイロードを作成
function createPayload(continuation: string) {
  return {
    context: {
      gl: 'US',
      hl: 'en',
      client: {
        clientName: 'WEB',
        clientVersion: '2.20241113.07.00' // 適宜変更
      }
    },
    continuation
  }
}

/**
 * https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${API_KEY}
 */
@Injectable()
export class YoutubeiLiveChatInfraService {
  private readonly headers = {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/130.0.0.0 Safari/537.36'
  }

  constructor() {}

  async list(
    params: LiveChatMessagesParams
  ): Promise<{ nextContinuation?: string; items: LiveChatMessages }> {
    return await this.getLiveChat(params.continuation)
  }

  private async getLiveChat(continuation: string) {
    // const response = await fetch(
    //   `https://www.youtube.com/youtubei/v1/live_chat/get_live_chat?key=${API_KEY}`,
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(createPayload(continuation))
    //   }
    // )
    // if (!response.ok) {
    //   throw new Error(
    //     `Failed to fetch data: ${response.statusText} ${await response.text()}`
    //   )
    // }

    const response = await axios.post(
      `https://www.youtube.com/youtubei/v1/live_chat/get_live_chat`,
      createPayload(continuation),
      { headers: this.headers, params: { key: API_KEY, prettyPrint: 'false' } }
    )

    const data = this.parse(response.data)

    const results =
      data.continuationContents?.liveChatContinuation.actions
        ?.map(action =>
          new YoutubeiLiveChatTranslator(
            action.addChatItemAction?.item
          ).translate()
        )
        .filter(e => e !== undefined) ?? []

    return {
      nextContinuation: this.nextContinuation(data),
      items: new LiveChatMessages(results)
    }
  }

  private parse(data: unknown) {
    try {
      return youtubeiLiveChatAPISchema.parse(data)
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new TypeError(err.issues.toString())
      } else {
        throw err
      }
    }
  }

  private nextContinuation(data: z.infer<typeof youtubeiLiveChatAPISchema>) {
    return data?.continuationContents?.liveChatContinuation?.continuations?.[0]
      ?.invalidationContinuationData?.continuation
  }
}
